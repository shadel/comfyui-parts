import { IDataService } from './dataServiceInterfaces';
import { IDataProcessor } from './interfaces';

export class DataProcessor implements IDataProcessor {
  process(workflowData: any, dbService: IDataService): any {
    // Combine or process workflowData and dbData as needed
    return {
      workflow: workflowData.steps || [],
      db: dbService
    };
  }
}
