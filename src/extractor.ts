import { ExtractorService } from "./extractorService";
import { FileMemoryDataService } from "./nodes/FileMemoryDataService";
import { RemoteMemoryDataService } from "./browsers/RemoteMemoryDataService";
import { DataProcessor } from "./dataProcessor";
import { IDataLoaderConfig } from "./services/IDataLoaderConfig";
import { IDataService } from "./dataServiceInterfaces";
import { IDataProcessor } from "./interfaces";

const isNode = typeof window === "undefined";
export enum ExtractType {
  FILE = "file",
  REMOTE = "remote"
}
export function createExtractorAdvance(dataService: IDataService, dataProcessor?: IDataProcessor) {
  return new ExtractorService(
    dataService,
    dataProcessor || new DataProcessor()
  );
}
export function createExtractor(config?: IDataLoaderConfig, type?: ExtractType) {
  const isFile = (isNode && ExtractType.FILE === type);
  let dataService: IDataService;
  if (isFile) {
    dataService = new FileMemoryDataService(config);
  } else if (!config) {
    throw new Error(`Remote type required config`);
  } else {
    dataService = new RemoteMemoryDataService(config);
  }

  const dataProcessor = new DataProcessor();

  const extractorService = new ExtractorService(
    dataService,
    dataProcessor
  );

  return extractorService;

}
