import fs from "fs/promises";
import path from "path";
import { IDataService } from "../dataServiceInterfaces";
import { DataType, IComfyUIManagerCustomNodeList, IComfyUIManagerExtensionNodeMap, IComfyUIManagerModelList, IDataModelList } from "./IDatatype";

export class NodeDataService implements IDataService {
  private _db:
    | DataType
    | undefined;
  async readFile(filePath: string): Promise<string> {
    console.log("readFile", filePath);
    const resolvedPath = path.resolve(filePath);
    return fs.readFile(resolvedPath, "utf-8");
  }

  async fetchDbData() {
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
    return this;
  }

  async fetchDbFromFile<T>(fileUri: string): Promise<T> {
    const dbPath = path.resolve(fileUri);
    return fs.readFile(dbPath, "utf-8").then(JSON.parse);
  }
}
