import fs from 'fs/promises';
import path from 'path';
import { IDataService } from '../dataServiceInterfaces';

export class NodeDataService implements IDataService {
  async readFile(filePath: string): Promise<string> {
    console.log("readFile", filePath)
    const resolvedPath = path.resolve(filePath);
    return fs.readFile(resolvedPath, 'utf-8');
  }

  async fetchDbData(): Promise<any> {
    const dbPath = path.resolve('db.json');
    return fs.readFile(dbPath, 'utf-8').then(JSON.parse);
  }
}
