import { RemoteMemoryDataService } from "./browsers/RemoteMemoryDataService";
import { getDefaultConfig, getDefaultRemoteConfig, getRemoteConfigWithHostUrl } from "./config";
import { DataProcessor } from "./dataProcessor";
import { IDataService } from "./dataServiceInterfaces";
import {
  createExtractorAdvance,
} from "./extractor";
import { IDataLoader, IDataProcessor } from "./interfaces";
import { IDataLoaderConfig } from "./services/IDataLoaderConfig";
import { MemoryDataService } from "./services/MemoryDataService";

function createDefaultRemoteExtractor() {
  const config = getDefaultRemoteConfig();
  const dataService = new RemoteMemoryDataService(config);
  return createExtractorAdvance(dataService);
}

export {
  createExtractorAdvance,
  getDefaultRemoteConfig,
  createDefaultRemoteExtractor,
  getRemoteConfigWithHostUrl,
  getDefaultConfig,
  IDataProcessor,
  IDataService,
  IDataLoader,
  DataProcessor,
  MemoryDataService,
  IDataLoaderConfig
};
