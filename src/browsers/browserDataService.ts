import { IDataService } from '../dataServiceInterfaces';

export class BrowserDataService implements IDataService {
  async readFile(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async fetchDbData(): Promise<any> {
    const response = await fetch('path/to/db.json'); // Adjust path accordingly
    return response.json();
  }
}
