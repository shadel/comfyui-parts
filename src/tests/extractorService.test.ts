import { ExtractorService } from '../extractorService';
import { MockDataService } from '../__mocks__/dataService';
import { MockFileSaver } from '../__mocks__/fileSaver';
import { MockDataProcessor } from '../__mocks__/dataProcessor';

async function readFile(filePath: string | File): Promise<string> {
  return `{"2": {
    "inputs": {
      "ckpt_name": "majicmixRealistic_betterV2V25.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  }}`; // Mock JSON data
}
// Create instances of mocks
const mockDataService = new MockDataService();
const mockDataProcessor = new MockDataProcessor();

// Create instance of service to be tested
const extractorService = new ExtractorService(mockDataService, mockDataProcessor);

describe('ExtractorService', () => {
  it('should extract data and save it correctly', async () => {
    const inputFile = 'dummyInputFile.json'; // Adjust based on your mock data

    const data = await readFile(inputFile);


    // Call the method
    const output = await extractorService.extractComfyuiParts(data);

    // Assertions
    expect(output.missingModels.length).toEqual(0);
    expect(output.missingNodes.length).toEqual(0);
  });

  // Add more tests as needed
});
