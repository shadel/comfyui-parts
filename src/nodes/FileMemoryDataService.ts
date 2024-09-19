import { DataLoaderFromFile } from "../services/DataLoaderFromFile";
import { IDataLoaderConfig } from "../services/IDataLoaderConfig";
import { MemoryDataService } from "../services/MemoryDataService";

export class FileMemoryDataService extends MemoryDataService {

  constructor(config?: IDataLoaderConfig) {
    super(new DataLoaderFromFile(config))
  }

}
