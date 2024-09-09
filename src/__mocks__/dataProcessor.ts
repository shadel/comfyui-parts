import { IDataProcessor } from '../interfaces';

export class MockDataProcessor implements IDataProcessor {
  process(inputData: any, dbData: any): any {
    return { processed: true }; // Mock processing
  }
}
