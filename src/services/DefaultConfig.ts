import { IDataLoaderConfig } from "./IDataLoaderConfig";

export const DEFAULT_CONFIG: IDataLoaderConfig = {
    ComfyUIManager: {
        customNodeList: "datas/ComfyUI-Manager/custom-node-list.json",
        extensionNodeMap: "datas/ComfyUI-Manager/extension-node-map.json",
        modelList: "datas/ComfyUI-Manager/model-list.json"
    },
    models: {
        civit_model_weights: "datas/models/civit_model_weights.json",
        extra_comfy_weights: "datas/models/extra_comfy_weights.json",
        huggingface_weights: "datas/models/huggingface_weights.json",
        replicate_model_weights: "datas/models/replicate_model_weights.json",
        model_node_ignore: "datas/models/model_node_ignore.json"
    }
};
