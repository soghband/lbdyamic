import { BrowserCodeReader } from './browser-code-reader';
import MultiFormatReader from "@soghband/zxing-library-4ng4/esm5/core/MultiFormatReader";

export class BrowserQRCodeReader extends BrowserCodeReader {
    public constructor(timeBetweenScansMillis: number = 500) {
        super(new MultiFormatReader(), timeBetweenScansMillis);
    }
}
