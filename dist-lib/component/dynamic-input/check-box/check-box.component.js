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
var CheckBoxComponent = /** @class */ (function (_super) {
    __extends(CheckBoxComponent, _super);
    function CheckBoxComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.objKey = Object.keys;
        _this.showSelectAll = "dp2hide";
        _this.selectAll = false;
        _this.singleLine = "";
        _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        _this.checkboxDisplay = "checkboxHide";
        return _this;
    }
    CheckBoxComponent.prototype.ngOnInit = function () {
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
            if (typeof (this.fieldCreation["default"]) == "object") {
                this.data[this.fieldCreation.fieldName] = Object.assign({}, this.fieldCreation["default"]);
            }
            else {
                var defaultVal = {};
                for (var valueIndex in this.fieldCreation.valueList) {
                    defaultVal[this.fieldCreation.valueList[valueIndex].value] = false;
                }
                this.data[this.fieldCreation.fieldName] = defaultVal;
            }
        }
        if (this.fieldCreation.showSelectAll == true) {
            this.showSelectAll = "";
        }
        if (this.fieldCreation.displaySingleLine == true || this.option.displayMode == "table") {
            this.singleLine = "singlePerLine";
        }
        else {
            this.singleLine = "multiplePerLine";
        }
        if (this.option.displayMode != 'table') {
            this.checkboxDisplay = "checkboxShow";
        }
    };
    CheckBoxComponent.prototype.toggleSelectAll = function () {
        if (this.selectAll == true) {
            for (var dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = true;
            }
        }
        else {
            for (var dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = false;
            }
        }
        this.callBack.emit({
            action: 'selectAll',
            value: this.selectAll,
            fieldName: this.fieldCreation.fieldName
        });
    };
    CheckBoxComponent.prototype.processCall = function (data) {
    };
    CheckBoxComponent.prototype.processChange = function (event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    };
    CheckBoxComponent.prototype.toggleShowCheckBox = function () {
        if (this.checkboxDisplay == "checkboxHide") {
            this.checkboxDisplay = "checkboxShow";
        }
        else {
            this.checkboxDisplay = "checkboxHide";
        }
    };
    CheckBoxComponent.prototype.haveChecked = function () {
        var haveChecked = false;
        for (var valueName in this.data[this.fieldCreation.fieldName]) {
            if (this.data[this.fieldCreation.fieldName][valueName] == true) {
                haveChecked = true;
                break;
            }
        }
        return haveChecked;
    };
    __decorate([
        core_1.Input()
    ], CheckBoxComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], CheckBoxComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], CheckBoxComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], CheckBoxComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], CheckBoxComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], CheckBoxComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], CheckBoxComponent.prototype, "panelCallBack");
    CheckBoxComponent = __decorate([
        core_1.Component({
            templateUrl: './check-box.component.html'
        })
    ], CheckBoxComponent);
    return CheckBoxComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.CheckBoxComponent = CheckBoxComponent;
