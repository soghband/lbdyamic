"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var browser_code_reader_1 = require("./browser-code-reader");
var MultiFormatReader_1 = require("@soghband/zxing-library-4ng4/esm5/core/MultiFormatReader");
var BrowserQRCodeReader = /** @class */ (function (_super) {
    __extends(BrowserQRCodeReader, _super);
    function BrowserQRCodeReader(timeBetweenScansMillis) {
        if (timeBetweenScansMillis === void 0) { timeBetweenScansMillis = 500; }
        return _super.call(this, new MultiFormatReader_1["default"](), timeBetweenScansMillis) || this;
    }
    return BrowserQRCodeReader;
}(browser_code_reader_1.BrowserCodeReader));
exports.BrowserQRCodeReader = BrowserQRCodeReader;
