import { IDataService } from '../dataServiceInterfaces';
import { IComfyUIManagerCustomNode } from '../nodes/IDatatype';

export class MockDataService implements IDataService {
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
  async readFile(filePath: string | File): Promise<string> {
    return '{"key": "value"}'; // Mock JSON data
  }

  async fetchDbData(): Promise<any> {
    return { dbKey: "dbValue" }; // Mock DB data
  }
}
