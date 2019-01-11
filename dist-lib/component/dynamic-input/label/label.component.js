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
var LabelComponent = /** @class */ (function (_super) {
    __extends(LabelComponent, _super);
    function LabelComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.modeDisplay = "";
        _this.objKeys = Object.keys;
        return _this;
    }
    LabelComponent.prototype.ngOnInit = function () {
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
    };
    LabelComponent.prototype.processCall = function (data) {
    };
    LabelComponent.prototype.processPanelCallBack = function () {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    };
    __decorate([
        core_1.Input()
    ], LabelComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], LabelComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], LabelComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], LabelComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], LabelComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], LabelComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], LabelComponent.prototype, "panelCallBack");
    LabelComponent = __decorate([
        core_1.Component({
            templateUrl: './label.component.html'
        })
    ], LabelComponent);
    return LabelComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.LabelComponent = LabelComponent;
