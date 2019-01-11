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
var DateComponent = /** @class */ (function (_super) {
    __extends(DateComponent, _super);
    function DateComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.columnCalculate = "";
        _this.objKeys = Object.keys;
        return _this;
    }
    DateComponent.prototype.ngOnInit = function () {
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
            if (typeof (this.fieldCreation["default"]) != "undefined") {
                if (Array.isArray(this.fieldCreation["default"])) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation["default"]);
                }
                else if (typeof (this.fieldCreation["default"]) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation["default"]];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [""];
            }
        }
    };
    DateComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push("");
    };
    DateComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    DateComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    };
    DateComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    DateComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            var combineValue = this.tempValue + key;
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
        return true;
    };
    DateComponent.prototype.processBlur = function (event, action, dataIndex) {
        var validate = true;
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
            event.srcElement.focus();
            validate = false;
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName
        });
    };
    DateComponent.prototype.processCall = function (data) {
    };
    DateComponent.prototype.processPanelCallBack = function () {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    };
    __decorate([
        core_1.Input()
    ], DateComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], DateComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], DateComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], DateComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], DateComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], DateComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], DateComponent.prototype, "panelCallBack");
    DateComponent = __decorate([
        core_1.Component({
            templateUrl: './date.component.html'
        })
    ], DateComponent);
    return DateComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.DateComponent = DateComponent;
