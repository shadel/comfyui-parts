import { IDataProcessor } from '../interfaces';

export class MockDataProcessor implements IDataProcessor {
  async process(inputData: any, dbData: any) {
    return { nodes: [], missingNodes: [], models: [], missingModels: [] }; // Mock processing
  }
}
