import { IDataService } from "./dataServiceInterfaces";
import { IDataProcessor } from "./interfaces";
import { IComfyWorkflowAPIItem, IIComfyWorkflowAPI } from "./IWorkflowAPI";
import { IDataModelResult, IMissingModelByNode } from "./services/IDatatype";
const OPTIONAL_MODELS = ["stmfnet.pth"];

const MODEL_FILETYPES = [
  ".ckpt",
  ".safetensors",
  ".pt",
  ".pth",
  ".bin",
  ".onnx",
  ".torchscript",
  ".patch",
  ".gguf",
  ".ggml",
  ".sft",
];
export interface ICustomNode {
  url: string;
}

export interface IModel {
  url: string;
  dist: string;
  filename: string;
}

export interface IFile {
  url: string;
  dist: string;
  filename: string;
}

export class DataProcessor implements IDataProcessor {
  async process(
    workflowData: IIComfyWorkflowAPI,
    dbService: IDataService
  ) {
    const { nodes, missingNodes } = await this.processCustomNodes({
      workflowData,
      dbService,
    });

    const { models, missingModels } = await this.processModels({
      workflowData,
      dbService,
    });
    // Combine or process workflowData and dbData as needed
    return {
      nodes,
      missingNodes,
      models,
      missingModels,
    };
  }

  async processCustomNodes({
    workflowData,
    ...props
  }: {
    workflowData: IIComfyWorkflowAPI;
    dbService: IDataService;
  }) {
    const nodeUrls: string[] = [];
    const missingNodes = [];

    const wfiKeys = Object.keys(workflowData);

    for (const key of wfiKeys) {
      const url = await this.processCustomNode({
        workflowDataItem: workflowData[key],
        ...props,
      });
      if (url) {
        nodeUrls.push(url);
      } else {
        missingNodes.push(workflowData[key]);
      }
    }

    const nodeUrlsNotDupcate = nodeUrls.filter(
      (item, idx) => nodeUrls.indexOf(item) == idx
    );

    const nodes = await props.dbService.getNodesByUrls(nodeUrlsNotDupcate);

    return { nodes, missingNodes };
  }
  async processCustomNode(props: {
    workflowDataItem: IComfyWorkflowAPIItem;
    dbService: IDataService;
  }) {
    const { workflowDataItem: item } = props;

    if (item.class_type.startsWith("workflow/")) {
      return;
    }

    return props.dbService.findNodeByClassType(item.class_type);
  }

  async processModels({
    workflowData,
    ...props
  }: {
    workflowData: IIComfyWorkflowAPI;
    dbService: IDataService;
  }) {
    let models: IDataModelResult[] = [];
    let missingModels: IMissingModelByNode[] = [];

    const wfiKeys = Object.keys(workflowData);

    for (const key of wfiKeys) {
      const { models: modelsByNode, missingModels: missingModelsByNode } =
        await this.processModel({
          workflowDataItem: workflowData[key],
          ...props,
        });
      models = models.concat(modelsByNode);
      missingModels = missingModels.concat(missingModelsByNode);
    }

    return { models, missingModels };
  }

  async processModel(props: {
    workflowDataItem: IComfyWorkflowAPIItem;
    dbService: IDataService;
  }) {
    const nodeItem = props.workflowDataItem;
    const missingModels: { filename: string, key: string, class_type: string }[] = [];
    let models: IDataModelResult[] = [];

    const isIgnored = await props.dbService.checkModelNodeIgnore(nodeItem.class_type);
    if (isIgnored) {
      return { models, missingModels }
    }

    const modelsToDownload: { filename: string, key: string, class_type: string }[] = [];

    if (nodeItem.hasOwnProperty("inputs")) {
      Object.entries(nodeItem.inputs).forEach(([key, input],) => {
        if (
          typeof input === "string" &&
          MODEL_FILETYPES.some((ft) => input.endsWith(ft)) &&
          !OPTIONAL_MODELS.some((m) => input.endsWith(m))
        ) {
          modelsToDownload.push({ filename: input, key: key, class_type: nodeItem.class_type });
        }
      });
    }


    for (const item of modelsToDownload) {
      let base: string, modelName: string;
      if (item.filename.includes("/")) {
        const parts = item.filename.split("/");
        base = parts[0];
        modelName = parts[parts.length - 1];
      } else {
        base = "";
        modelName = item.filename;
      }

      const modelsByName = await props.dbService.getModelsByName(modelName);
      if (modelsByName.length) {
        models = models.concat(modelsByName);
      } else {
        missingModels.push(item);
      }
    }

    return { models, missingModels };
  }

  processFile(props: {
    workflowDataItem: IComfyWorkflowAPIItem;
    dbService: IDataService;
    customNodes: ICustomNode[];
    models: IModel[];
    files: IFile[];
  }) { }
}
