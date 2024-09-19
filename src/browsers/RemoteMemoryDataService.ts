import { DataLoaderFromRemote } from '../services/DataLoaderFromRemote';
import { IDataLoaderConfig } from '../services/IDataLoaderConfig';
import { MemoryDataService } from '../services/MemoryDataService';

export class RemoteMemoryDataService extends MemoryDataService {
  constructor(config: IDataLoaderConfig) {
    super(new DataLoaderFromRemote(config))
  }
}
