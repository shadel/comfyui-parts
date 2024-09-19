import { RemoteMemoryDataService } from "./browsers/RemoteMemoryDataService";
import { getDefaultConfig, getDefaultRemoteConfig, getRemoteConfigWithHostUrl } from "./config";
import { DataProcessor } from "./dataProcessor";
import { IDataService } from "./dataServiceInterfaces";
import {
  createExtractor,
  createExtractorAdvance,
  ExtractType,
} from "./extractor";
import { IDataLoader, IDataProcessor } from "./interfaces";
import { FileMemoryDataService } from "./nodes/FileMemoryDataService";
import { DataLoaderFromFile } from "./services/DataLoaderFromFile";
import { DataLoaderFromRemote } from "./services/DataLoaderFromRemote";
import { IDataLoaderConfig } from "./services/IDataLoaderConfig";
import { MemoryDataService } from "./services/MemoryDataService";

function createDefaultRemoteExtractor() {
  const config = getDefaultRemoteConfig();
  return createExtractor(config, ExtractType.REMOTE);
}

export {
  createExtractor,
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
  RemoteMemoryDataService,
  FileMemoryDataService,
  DataLoaderFromFile,
  DataLoaderFromRemote,
  IDataLoaderConfig
};
