
export interface IComfyUIManagerCustomNodeList {
  custom_nodes: IComfyUIManagerCustomNode[];
}

export interface IComfyUIManagerCustomNode {
  author: string;
  title: string;
  id?: string;
  reference: string;
  files: string[];
  install_type: InstallType;
  description: string;
  pip?: string[];
  preemptions?: string[];
  nodename_pattern?: string;
  apt_dependency?: string[];
  js_path?: string;
}

export type InstallType = "git-clone" | "copy" | "unzip";

export interface IComfyUIManagerExtensionNodeMapClass {
  title_aux: string;
  author?: string;
  description?: string;
  nickname?: string;
  title?: string;
  nodename_pattern?: string;
  preemptions?: string[];
}

export type IComfyUIManagerExtensionNodeMap = {
  [k: string]: [string[], IComfyUIManagerExtensionNodeMapClass];
};

export interface IComfyUIManagerModelList {
  models: IComfyUIManagerModel[];
}

export interface IComfyUIManagerModel {
  name: string;
  type: string;
  base: string;
  save_path: string;
  description: string;
  reference: string;
  filename: string;
  url: string;
  size: string;
}

export interface IDataModel {
  url: string;
  dest: string;
}
export interface IDataModelResult {
  url: string;
  dest: string;
  filename: string;
}

export interface IMissingModelByNode {
  filename: string;
  key: string;
  class_type: string;
}

export type IDataModelList = {
  [k: string]: IDataModel;
};

export type DataType = {
  "ComfyUI-Manager": {
    "custom-node-list": IComfyUIManagerCustomNodeList;
    "extension-node-map": IComfyUIManagerExtensionNodeMap;
    "model-list": IComfyUIManagerModelList;
  };
  models: {
    civit_model_weights: IDataModelList;
    extra_comfy_weights: IComfyUIManagerModelList;
    huggingface_weights: IDataModelList;
    replicate_model_weights: IDataModelList;
    model_node_ignore: string[];
  };
}