
import fs from "fs/promises";
import path from "path";
import { IDataLoader } from "../interfaces";
import { DEFAULT_CONFIG } from "./DefaultConfig";
import { IDataLoaderConfig } from "./IDataLoaderConfig";
import { DataType, IComfyUIManagerCustomNodeList, IComfyUIManagerExtensionNodeMap, IComfyUIManagerModelList, IDataModelList } from "./IDatatype";

export class DataLoaderFromFile implements IDataLoader {
    constructor(private config: IDataLoaderConfig = DEFAULT_CONFIG) {
    }
    async load(): Promise<DataType> {
        return {
            "ComfyUI-Manager": {
              "custom-node-list":
                await this.fetchDbFromFile<IComfyUIManagerCustomNodeList>(
                    this.config.ComfyUIManager.customNodeList
                ),
              "extension-node-map":
                await this.fetchDbFromFile<IComfyUIManagerExtensionNodeMap>(
                    this.config.ComfyUIManager.extensionNodeMap
                ),
              "model-list": await this.fetchDbFromFile<IComfyUIManagerModelList>(
                this.config.ComfyUIManager.modelList
              ),
            },
            models: {
              civit_model_weights: await this.fetchDbFromFile<IDataModelList>(
                this.config.models.civit_model_weights
              ),
              extra_comfy_weights:
                await this.fetchDbFromFile<IComfyUIManagerModelList>(
                    this.config.models.extra_comfy_weights
                ),
              huggingface_weights: await this.fetchDbFromFile<IDataModelList>(
                this.config.models.huggingface_weights
              ),
              replicate_model_weights: await this.fetchDbFromFile<IDataModelList>(
                this.config.models.replicate_model_weights
              ),
              model_node_ignore: await this.fetchDbFromFile<string[]>(
                this.config.models.model_node_ignore
              ),
            },
          }
    }
    private async fetchDbFromFile<T>(fileUri: string): Promise<T> {
      const dbPath = path.resolve(fileUri);
      return fs.readFile(dbPath, "utf-8").then(JSON.parse);
    }
  

}