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
var TextBoxComponent = /** @class */ (function (_super) {
    __extends(TextBoxComponent, _super);
    function TextBoxComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.columnCalculate = "";
        _this.objKeys = Object.keys;
        return _this;
    }
    TextBoxComponent.prototype.ngOnInit = function () {
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
    TextBoxComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push("");
    };
    TextBoxComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    TextBoxComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        this.allowTempData = true;
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            console.log(this.data[this.fieldCreation.fieldName][dataIndex]);
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)
                && String(event.target.value).match(this.fieldCreation.valuePattern)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    };
    TextBoxComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        if (this.allowTempData == true) {
            this.allowTempData = false;
            this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    TextBoxComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            var combineValue = this.tempValue + key;
            var check = true;
            if (typeof (this.fieldCreation.inputPattern) != "undefined") {
                if (!String(key).match(this.fieldCreation.inputPattern)) {
                    check = false;
                }
            }
            if (typeof (this.fieldCreation.validateWhileKeyPress) != "undefined"
                && typeof (this.fieldCreation.valuePattern) != "undefined"
                && this.fieldCreation.validateWhileKeyPress) {
                if (!String(combineValue).match(this.fieldCreation.valuePattern)) {
                    check = false;
                }
            }
            if (check == false) {
                return false;
            }
        }
        return true;
    };
    TextBoxComponent.prototype.processBlur = function (event, action, dataIndex) {
        var validate = true;
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
            event.srcElement.focus();
            validate = false;
        }
        if (this.fieldCreation.type == "number") {
            if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] < parseFloat(this.fieldCreation.min)) {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.min;
            }
            if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] > parseFloat(this.fieldCreation.max)) {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.max;
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName
        });
        return validate;
    };
    TextBoxComponent.prototype.processCall = function (data) {
    };
    TextBoxComponent.prototype.processPanelCallBack = function () {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    };
    __decorate([
        core_1.Input()
    ], TextBoxComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], TextBoxComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], TextBoxComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], TextBoxComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], TextBoxComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], TextBoxComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], TextBoxComponent.prototype, "panelCallBack");
    TextBoxComponent = __decorate([
        core_1.Component({
            templateUrl: './textbox.component.html'
        })
    ], TextBoxComponent);
    return TextBoxComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.TextBoxComponent = TextBoxComponent;
