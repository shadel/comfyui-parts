

export interface IDataLoaderConfig {
  ComfyUIManager: {
    customNodeList: string;
    extensionNodeMap: string;
    modelList: string;
  };
  models: {
    civit_model_weights: string;
    extra_comfy_weights: string;
    huggingface_weights: string;
    replicate_model_weights: string;
    model_node_ignore: string;
  };
}
