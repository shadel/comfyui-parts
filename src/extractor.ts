import { ExtractorService } from "./extractorService";
import { DataProcessor } from "./dataProcessor";
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