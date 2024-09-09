import { IFileSaver } from '../interfaces';

export class MockFileSaver implements IFileSaver {
  async save(data: any, outputFile: string): Promise<void> {
    // Mock save implementation
  }
}
