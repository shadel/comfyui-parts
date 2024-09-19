import { RemoteMemoryDataService } from "./browsers/RemoteMemoryDataService";
import { getDefaultRemoteConfig, getRemoteConfigWithHostUrl } from "./config";
import {
  createExtractorAdvance,
} from "./extractor";
import { DataLoaderFromRemote } from "./services/DataLoaderFromRemote";

function createDefaultRemoteExtractor() {
  const config = getDefaultRemoteConfig();
  const dataService = new RemoteMemoryDataService(config);
  return createExtractorAdvance(dataService);
}

export {
  getDefaultRemoteConfig,
  createDefaultRemoteExtractor,
  getRemoteConfigWithHostUrl,
  RemoteMemoryDataService,
  DataLoaderFromRemote
};
