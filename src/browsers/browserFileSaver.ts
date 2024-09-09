import { IFileSaver } from "../interfaces";

export class BrowserFileSaver implements IFileSaver {
    async save(data: any, filePath: string): Promise<void> {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filePath;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }
  