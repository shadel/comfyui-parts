import fs from 'fs/promises';
import path from 'path';
import { IFileSaver } from '../interfaces';

export class NodeFileSaver implements IFileSaver {
  async save(data: any, filePath: string): Promise<void> {
    const resolvedPath = path.resolve(filePath);
    await fs.writeFile(resolvedPath, JSON.stringify(data, null, 2));
  }
}
