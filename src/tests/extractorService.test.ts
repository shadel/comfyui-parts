import { ExtractorService } from '../extractorService';
import { MockDataService } from '../__mocks__/dataService';
import { MockFileSaver } from '../__mocks__/fileSaver';
import { MockDataProcessor } from '../__mocks__/dataProcessor';

// Create instances of mocks
const mockDataService = new MockDataService();
const mockFileSaver = new MockFileSaver();
const mockDataProcessor = new MockDataProcessor();

// Create instance of service to be tested
const extractorService = new ExtractorService(mockDataService, mockDataProcessor, mockFileSaver);

describe('ExtractorService', () => {
  it('should extract data and save it correctly', async () => {
    const inputFile = 'dummyInputFile.json'; // Adjust based on your mock data
    const outputFile = 'dummyOutputFile.json';

    // Spy on fileSaver.save to verify it gets called
    const saveSpy = jest.spyOn(mockFileSaver, 'save');

    // Call the method
    await extractorService.extractComfyuiParts(inputFile, outputFile);

    // Assertions
    expect(saveSpy).toHaveBeenCalledWith({ processed: true }, outputFile);
  });

  // Add more tests as needed
});
