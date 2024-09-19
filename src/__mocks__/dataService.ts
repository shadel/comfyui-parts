import { IDataService } from '../dataServiceInterfaces';
import { IComfyUIManagerCustomNode, IDataModelResult } from '../nodes/IDatatype';

export class MockDataService implements IDataService {
  getModelsByName(modelName: string): Promise<IDataModelResult[]> {
    throw new Error('Method not implemented.');
  }
  checkModelNodeIgnore(classType: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findNodeByClassType(classType: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  findNodeByName(classType: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  findNodeByRegex(classType: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  getNodesByUrls(urls: string[]): Promise<IComfyUIManagerCustomNode[]> {
    throw new Error('Method not implemented.');
  }


  async fetchDbData(): Promise<any> {
    return { dbKey: "dbValue" }; // Mock DB data
  }
}
