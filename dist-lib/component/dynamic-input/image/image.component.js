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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var dynamic_behavior_component_1 = require("../../dynamic-behavior/dynamic-behavior.component");
var function_1 = require("codelyzer/util/function");
var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.base64textString = [];
        _this.objKeys = Object.keys;
        _this.modeDisplay = "";
        _this.errorMsg = "";
        return _this;
    }
    ImageComponent.prototype.ngOnInit = function () {
        console.log(this.base64textString);
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            this.modeDisplay = "dp2hide";
        }
        else {
            this.modeDisplay = "";
        }
        this.data[this.fieldCreation.fieldName] = Object.assign({}, {
            currentFile: [],
            selectFile: function_1.any
        });
    };
    ImageComponent.prototype.handleFileSelect = function (evt) {
        this.base64textString = [];
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
            var files = evt.target.files;
            var validate = this.validateFileExtension();
            if (validate == true) {
                for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                    var file = files[fileIndex];
                    if (files && file) {
                        var reader = new FileReader();
                        reader.onload = this._handleReaderLoaded.bind(this);
                        reader.readAsBinaryString(file);
                    }
                }
            }
        }
    };
    ImageComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString.push("url(data:image/png;base64," + btoa(binaryString) + ")");
    };
    ImageComponent.prototype.getNasImageUrl = function (file) {
        if (file != null && file.length > 0) {
            return "url('" + file + "')";
        }
        return "";
    };
    ImageComponent.prototype.processCall = function (data) {
    };
    ImageComponent.prototype.getType = function (data) {
        return typeof (data);
    };
    ImageComponent.prototype.validateFileExtension = function () {
        this.errorMsg = "";
        if (typeof (this.fieldCreation.fileType) != "undefined") {
            var fileData = this.data[this.fieldCreation.fieldName].selectFile;
            var validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
            var validatePattern = new RegExp(validateExtensionString, "i");
            for (var fileDataIndex = 0; fileDataIndex < fileData.length; fileDataIndex++) {
                var fileName = fileData[fileDataIndex].name;
                var fileNameSplit = fileName.split(".");
                var extension = fileNameSplit.pop();
                if (!validatePattern.test(extension)) {
                    this.errorMsg = "File type mismatch.";
                    return false;
                }
            }
            return true;
        }
        else {
            return true;
        }
    };
    __decorate([
        core_1.Input()
    ], ImageComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], ImageComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], ImageComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], ImageComponent.prototype, "inputIndex");
    __decorate([
        core_1.Output()
    ], ImageComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], ImageComponent.prototype, "panelCallBack");
    ImageComponent = __decorate([
        core_1.Component({
            templateUrl: './image.component.html'
        })
    ], ImageComponent);
    return ImageComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.ImageComponent = ImageComponent;