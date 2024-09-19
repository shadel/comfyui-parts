import { ExtractorService } from '../extractorService';
import { NodeDataService } from '../nodes/nodeDataService';
import { NodeFileSaver } from '../nodes/nodeFileSaver';
import { DataProcessor } from '../dataProcessor';
import fs from "fs/promises";
import path from "path";

async function readFile(filePath: string): Promise<string> {
  const resolvedPath = path.resolve(filePath);
  return fs.readFile(resolvedPath, "utf-8");
}
// Create instances of mocks
const mockDataService = new NodeDataService();
const mockDataProcessor = new DataProcessor();

// Create instance of service to be tested
const extractorService = new ExtractorService(mockDataService, mockDataProcessor);

describe('ExtractorService', () => {
  it('should extract data and save it correctly', async () => {
    const inputFile = 'examples/01-wf.json'; // Adjust based on your mock data

    const data = await readFile(inputFile);

    // Spy on fileSaver.save to verify it gets called

    // Call the method
    const output = await extractorService.extractComfyuiParts(data);

    // Assertions
    console.log(output);
    expect(output.missingModels.length).toEqual(0);
    expect(output.missingNodes.length).toEqual(0);
  });

  // Add more tests as needed
});
