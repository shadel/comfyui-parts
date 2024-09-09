import { IDataService } from '../dataServiceInterfaces';

export class MockDataService implements IDataService {
  async readFile(filePath: string | File): Promise<string> {
    return '{"key": "value"}'; // Mock JSON data
  }

  async fetchDbData(): Promise<any> {
    return { dbKey: "dbValue" }; // Mock DB data
  }
}
