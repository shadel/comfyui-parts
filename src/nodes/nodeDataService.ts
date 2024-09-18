import fs from "fs/promises";
import path from "path";
import { IDataService } from "../dataServiceInterfaces";
import {
  DataType,
  IComfyUIManagerCustomNode,
  IComfyUIManagerCustomNodeList,
  IComfyUIManagerExtensionNodeMap,
  IComfyUIManagerModelList,
  IDataModelList,
} from "./IDatatype";

export class NodeDataService implements IDataService {
  private _db: DataType | undefined;
  private _idxNodeMap: Map<string, string>;
  private _idxNodeList: { nodename_pattern: string; url: string }[];

  constructor() {
    this._idxNodeMap = new Map();
    this._idxNodeList = [];
  }
  async readFile(filePath: string): Promise<string> {
    const resolvedPath = path.resolve(filePath);
    return fs.readFile(resolvedPath, "utf-8");
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
        },
      };
    }

    this._idxNodeMap = this.indexNodeMap();
    this._idxNodeList = this.indexNodeList();
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
}
