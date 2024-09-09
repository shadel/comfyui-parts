import { ExtractorService } from '../extractorService';
import { NodeDataService } from '../nodes/nodeDataService';
import { NodeFileSaver } from '../nodes/nodeFileSaver';
import { DataProcessor } from '../dataProcessor';

// Create instances of mocks
const mockDataService = new NodeDataService();
const mockFileSaver = new NodeFileSaver();
const mockDataProcessor = new DataProcessor();

// Create instance of service to be tested
const extractorService = new ExtractorService(mockDataService, mockDataProcessor, mockFileSaver);

describe('ExtractorService', () => {
  it('should extract data and save it correctly', async () => {
    const inputFile = 'examples/01-wf.json'; // Adjust based on your mock data
    const outputFile = 'examples/01-rs.json';

    // Spy on fileSaver.save to verify it gets called
    const saveSpy = jest.spyOn(mockFileSaver, 'save');

    // Call the method
    await extractorService.extractComfyuiParts(inputFile, outputFile);

    // Assertions
    expect(saveSpy).toHaveBeenCalledWith({ processed: true }, outputFile);
  });

  // Add more tests as needed
});
