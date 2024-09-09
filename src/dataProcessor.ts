import { IDataProcessor } from './interfaces';

export class DataProcessor implements IDataProcessor {
  process(workflowData: any, dbData: any): any {
    // Combine or process workflowData and dbData as needed
    return {
      workflow: workflowData.steps || [],
      db: dbData
    };
  }
}
