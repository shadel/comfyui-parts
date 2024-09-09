import { ExtractorService } from "./extractorService";
import { NodeDataService } from "./nodes/nodeDataService";
import { BrowserDataService } from "./browsers/browserDataService";
import { NodeFileSaver } from "./nodes/nodeFileSaver";
import { BrowserFileSaver } from "./browsers/browserFileSaver";
import { DataProcessor } from "./dataProcessor";

const isNode = typeof window === "undefined";

const dataService = isNode ? new NodeDataService() : new BrowserDataService();
const fileSaver = isNode ? new NodeFileSaver() : new BrowserFileSaver();
const dataProcessor = new DataProcessor();

const extractorService = new ExtractorService(
  dataService,
  dataProcessor,
  fileSaver
);
export { extractorService };
