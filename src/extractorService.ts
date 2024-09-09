import { IDataService } from './dataServiceInterfaces';
import { IDataProcessor, IFileSaver } from './interfaces';

export class ExtractorService {
  constructor(
    private dataService: IDataService,
    private dataProcessor: IDataProcessor,
    private fileSaver: IFileSaver
  ) {}

  async extractComfyuiParts(inputFile: string | File, outputFile: string): Promise<void> {
    const inputData = await this.dataService.readFile(inputFile);
    const dbData = await this.dataService.fetchDbData();
    const extractedData = this.dataProcessor.process(JSON.parse(inputData), dbData);
    await this.fileSaver.save(extractedData, outputFile);
  }
}
