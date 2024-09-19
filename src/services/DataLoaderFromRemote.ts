
import { IDataLoader } from "../interfaces";
import { IDataLoaderConfig } from "./IDataLoaderConfig";
import { DataType, IComfyUIManagerCustomNodeList, IComfyUIManagerExtensionNodeMap, IComfyUIManagerModelList, IDataModelList } from "./IDatatype";


export class DataLoaderFromRemote implements IDataLoader {

  constructor(private config: IDataLoaderConfig) {
    
  }

    async load(): Promise<DataType> {
        return {
            "ComfyUI-Manager": {
              "custom-node-list":
                await this.fetchFileWithUrl<IComfyUIManagerCustomNodeList>(
                  this.config.ComfyUIManager.customNodeList
                ),
              "extension-node-map":
                await this.fetchFileWithUrl<IComfyUIManagerExtensionNodeMap>(
                  this.config.ComfyUIManager.extensionNodeMap
                ),
              "model-list": await this.fetchFileWithUrl<IComfyUIManagerModelList>(
                this.config.ComfyUIManager.modelList
              ),
            },
            models: {
              civit_model_weights: await this.fetchFileWithUrl<IDataModelList>(
                "datas/models/civit_model_weights.json"
              ),
              extra_comfy_weights:
                await this.fetchFileWithUrl<IComfyUIManagerModelList>(
                  this.config.models.extra_comfy_weights
                ),
              huggingface_weights: await this.fetchFileWithUrl<IDataModelList>(
                this.config.models.huggingface_weights
              ),
              replicate_model_weights: await this.fetchFileWithUrl<IDataModelList>(
                this.config.models.replicate_model_weights
              ),
              model_node_ignore: await this.fetchFileWithUrl<string[]>(
                this.config.models.model_node_ignore
              ),
            },
          }
    }
    protected async fetchFileWithUrl<T>(fileUrl: string): Promise<T> {
      const response = await fetch(fileUrl); // Adjust path accordingly
      return response.json();
    }

}