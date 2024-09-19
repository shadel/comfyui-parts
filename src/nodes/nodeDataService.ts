import fs from "fs/promises";
import path from "path";
import { IDataService } from "../dataServiceInterfaces";
import {
  DataType,
  IComfyUIManagerCustomNode,
  IComfyUIManagerCustomNodeList,
  IComfyUIManagerExtensionNodeMap,
  IComfyUIManagerModel,
  IComfyUIManagerModelList,
  IDataModelList,
} from "./IDatatype";

export class NodeDataService implements IDataService {
  private _db: DataType | undefined;
  private _idxNodeMap: Map<string, string>;
  private _idxNodeList: { nodename_pattern: string; url: string }[];
  private _idxModelList: Map<string, IComfyUIManagerModel[]>;

  constructor() {
    this._idxNodeMap = new Map();
    this._idxNodeList = [];
    this._idxModelList = new Map();
  }

  async fetchDbData(): Promise<IDataService> {
    if (!this._db) {
      this._db = {
        "ComfyUI-Manager": {
          "custom-node-list":
            await this.fetchDbFromFile<IComfyUIManagerCustomNodeList>(
              "datas/ComfyUI-Manager/custom-node-list.json"
            ),
          "extension-node-map":
            await this.fetchDbFromFile<IComfyUIManagerExtensionNodeMap>(
              "datas/ComfyUI-Manager/extension-node-map.json"
            ),
          "model-list": await this.fetchDbFromFile<IComfyUIManagerModelList>(
            "datas/ComfyUI-Manager/model-list.json"
          ),
        },
        models: {
          civit_model_weights: await this.fetchDbFromFile<IDataModelList>(
            "datas/models/civit_model_weights.json"
          ),
          extra_comfy_weights:
            await this.fetchDbFromFile<IComfyUIManagerModelList>(
              "datas/models/extra_comfy_weights.json"
            ),
          huggingface_weights: await this.fetchDbFromFile<IDataModelList>(
            "datas/models/huggingface_weights.json"
          ),
          replicate_model_weights: await this.fetchDbFromFile<IDataModelList>(
            "datas/models/replicate_model_weights.json"
          ),
          model_node_ignore: await this.fetchDbFromFile<string[]>(
            "datas/models/model_node_ignore.json"
          ),
        },
      };
    }

    this._idxNodeMap = this.indexNodeMap();
    this._idxNodeList = this.indexNodeList();
    this._idxModelList = this.indexModelListMap()
    return this;
  }

  indexNodeMap() {
    const nodeMap =
      this._db?.["ComfyUI-Manager"]["extension-node-map"] ||
      ({} as IComfyUIManagerExtensionNodeMap);

    const nodeMapIndex = Object.keys(nodeMap).reduce((obj, key) => {
      const values = nodeMap[key][0];

      values.forEach((name) => {
        obj.set(name, key);
      });
      return obj;
    }, new Map<string, string>());

    return nodeMapIndex;
  }

  indexNodeList() {
    const nodeMap =
      this._db?.["ComfyUI-Manager"]["custom-node-list"].custom_nodes || [];

    const nodeListIdx = nodeMap.reduce((res, value) => {
      if (value.nodename_pattern) {
        return [
          ...res,
          { nodename_pattern: value.nodename_pattern, url: value.files[0] },
        ];
      }
      return res;
    }, [] as Array<{ nodename_pattern: string; url: string }>);

    return nodeListIdx;
  }

  getFilename(url: string): string {
    const fragmentRemoved = url.split("#")[0]; // keep to the left of first #
    const queryStringRemoved = fragmentRemoved.split("?")[0];
    const schemeRemoved = queryStringRemoved.split("://").pop()?.split(":").pop() || "";

    if (schemeRemoved.indexOf("/") === -1) {
        return "";
    }

    return schemeRemoved.split("/").pop() || "";
}

  indexModelListMap() {
    const nodeMap =
      [...this._db?.["ComfyUI-Manager"]["model-list"].models ||
      ([] as IComfyUIManagerModel[]), ...this._db?.models.extra_comfy_weights.models || []];

    const nodeMapIndex =nodeMap.reduce((obj, model) => {
      const currentModels = obj.get(model.filename) || [];
      
      obj.set(model.filename, [...currentModels, model]);

      const urlName = this.getFilename(model.url);
      if (urlName !== model.filename) {
        const urlModels = obj.get(urlName) || [];
        obj.set(urlName, [...urlModels, model]);
      }

      return obj;
    }, new Map<string, IComfyUIManagerModel[]>());

    return nodeMapIndex;
  }

  async fetchDbFromFile<T>(fileUri: string): Promise<T> {
    const dbPath = path.resolve(fileUri);
    return fs.readFile(dbPath, "utf-8").then(JSON.parse);
  }

  async findNodeByClassType(classType: string) {
    const nodeUrl = await this.findNodeByName(classType);

    if (nodeUrl) {
      return nodeUrl;
    }

    return await this.findNodeByRegex(classType);
  }
  async findNodeByName(classType: string) {
    return this._idxNodeMap.get(classType) || null;
  }
  async findNodeByRegex(classType: string) {
    return (
      this._idxNodeList.find((item) => {
        return classType.match(item.nodename_pattern);
      })?.url || null
    );
  }

  async getNodesByUrls(urls: string[]): Promise<IComfyUIManagerCustomNode[]> {
    return (
      this._db?.["ComfyUI-Manager"]["custom-node-list"].custom_nodes.filter(
        (node) => {
          return node.files && node.files.some((file) => urls.includes(file));
        }
      ) || []
    );
  }

  async findModelOnCivitai(modelName: string) {
    return this._db?.models.civit_model_weights[modelName]
  }

  async findModelOnHuggingface(modelName: string) {
    return this._db?.models.huggingface_weights[modelName]
  }

  async findModelOnReplicate(modelName: string) {
    return this._db?.models.replicate_model_weights[modelName]
  }

  getSavePath(modelType: string, savepath: string) {
    if (!savepath || savepath === "default") {
      return this.getDefaultSavePath(modelType);
    }

    return savepath;
  }

  getDefaultSavePath(modelType: string): string {
    let baseModel = "etc";

    switch (modelType) {
        case "checkpoints":
        case "checkpoint":
        case "unclip":
            baseModel = "checkpoints";
            break;
        case "VAE":
            baseModel = "vae";
            break;
        case "lora":
            baseModel = "loras";
            break;
        case "T2I-Adapter":
        case "T2I-Style":
        case "controlnet":
            baseModel = "controlnet";
            break;
        case "clip_vision":
            baseModel = "clip_vision";
            break;
        case "gligen":
            baseModel = "gligen";
            break;
        case "upscale":
            baseModel = "upscale_models";
            break;
        case "embeddings":
            baseModel = "embeddings";
            break;
        case "diffusion_model":
            baseModel = "unet";
            break;
        case "clip":
            baseModel = "clip";
            break;
    }

    return baseModel;
}
  async findModelOnManager(modelName: string, type?: string) {
    return this._idxModelList.get(modelName)?.filter(item => {
      if (type) {
        return item.type === type
      }
      return true;
    }).map(item => ({
      filename: item.filename,
      dest: this.getSavePath(item.type, item.save_path),
      url: item.url
    }))
  }

  async checkModelNodeIgnore(classType: string) {
    return this._db?.models.model_node_ignore.includes(classType) || false;
  }

  async getModelsByName(modelName: string, type?: string) {
    let model = await this.findModelOnCivitai(modelName);
    if (model) return [{...model, filename: modelName}];

    model = await this.findModelOnHuggingface(modelName);
    if (model) return [{...model, filename: modelName}];

    model = await this.findModelOnReplicate(modelName);
    if (model) return [{...model, filename: modelName}];

    return await this.findModelOnManager(modelName, type) || [];
  }
}
