import { IDataService } from './dataServiceInterfaces';
import { IDataProcessor, IFileSaver } from './interfaces';

export class ExtractorService {
  constructor(
    private dataService: IDataService,
    private dataProcessor: IDataProcessor,
  ) {}

  async extractComfyuiParts(inputData: string) {
    const dbData = await this.dataService.fetchDbData();
    const extractedData = await this.dataProcessor.process(JSON.parse(inputData), dbData);
    return extractedData;
  }
}
