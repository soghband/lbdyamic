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
var FileUploadComponent = /** @class */ (function (_super) {
    __extends(FileUploadComponent, _super);
    function FileUploadComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        return _this;
    }
    FileUploadComponent.prototype.ngOnInit = function () {
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
        this.data[this.fieldCreation.fieldName] = Object.assign({}, {
            currentFile: [],
            selectFile: function_1.any
        });
    };
    FileUploadComponent.prototype.handleFileSelect = function (evt) {
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
        }
    };
    FileUploadComponent.prototype.processCall = function (data) {
    };
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], FileUploadComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], FileUploadComponent.prototype, "panelCallBack");
    FileUploadComponent = __decorate([
        core_1.Component({
            templateUrl: './file-upload.component.html'
        })
    ], FileUploadComponent);
    return FileUploadComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.FileUploadComponent = FileUploadComponent;
