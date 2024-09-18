import { IDataService } from './dataServiceInterfaces';
import { IDataProcessor } from './interfaces';
import { IComfyWorkflowAPIItem, IIComfyWorkflowAPI } from './IWorkflowAPI';

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
  async process(workflowData: IIComfyWorkflowAPI, dbService: IDataService): Promise<any> {
    const customNodes: ICustomNode[] = [];
    const models: IModel[] =[];
    const files: IFile[] = [];

    const {nodes, missingNodes} = await this.processCustomNodes({workflowData, dbService});
    // Combine or process workflowData and dbData as needed
    return {
      nodes, missingNodes
    };
  }

  processEachNode(props: {workflowDataItem: IComfyWorkflowAPIItem, dbService: IDataService, customNodes: ICustomNode[], models: IModel[], files: IFile[]}) {
    this.processCustomNode(props);
    this.processModel(props);
    this.processFile(props);
  }

  async processCustomNodes({workflowData, ...props}: {workflowData: IIComfyWorkflowAPI, dbService: IDataService}) {
    const nodeUrls: string[] = [];
    const missingNodes = [];

    const wfiKeys = Object.keys(workflowData);

    for (const key of wfiKeys) {
      const url = await this.processCustomNode({workflowDataItem: workflowData[key], ...props});
      if (url) {
        nodeUrls.push(url);
      } else {
        missingNodes.push(workflowData[key]);
      }
    }

    const nodeUrlsNotDupcate = nodeUrls.filter((item, idx) => nodeUrls.indexOf(item) == idx);

    const nodes = await props.dbService.getNodesByUrls(nodeUrlsNotDupcate);

    return {nodes, missingNodes}
  }
  async processCustomNode(props: {workflowDataItem: IComfyWorkflowAPIItem, dbService: IDataService}) {

    const {workflowDataItem: item} = props;

    if (item.class_type.startsWith("workflow/")) {
      return;
    }

    return props.dbService.findNodeByClassType(item.class_type);

  }

  processModel(props: {workflowDataItem: IComfyWorkflowAPIItem, dbService: IDataService, customNodes: ICustomNode[], models: IModel[], files: IFile[]}) {

  }

  processFile(props: {workflowDataItem: IComfyWorkflowAPIItem, dbService: IDataService, customNodes: ICustomNode[], models: IModel[], files: IFile[]}) {

  }
}
