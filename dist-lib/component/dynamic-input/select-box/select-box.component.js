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
var SelectBoxComponent = /** @class */ (function (_super) {
    __extends(SelectBoxComponent, _super);
    function SelectBoxComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.objKeys = Object.keys;
        return _this;
    }
    SelectBoxComponent.prototype.ngOnInit = function () {
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
                if (typeof (this.fieldCreation.valueList[0]) != "undefined") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.valueList[0].value];
                }
            }
        }
    };
    SelectBoxComponent.prototype.processCall = function (data) {
    };
    SelectBoxComponent.prototype.processChange = function (event, action, dataIndex) {
        var valueObj = [];
        for (var dataIndexRaw in this.data[this.fieldCreation.fieldName]) {
            var value = this.data[this.fieldCreation.fieldName][dataIndexRaw];
            for (var _i = 0, _a = this.fieldCreation.valueList; _i < _a.length; _i++) {
                var valueListRow = _a[_i];
                if (valueListRow.value == value) {
                    valueObj.push(valueListRow);
                }
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            valueObj: valueObj,
            fieldName: this.fieldCreation.fieldName
        });
    };
    SelectBoxComponent.prototype.checkValueList = function (valueList) {
        if (valueList != undefined) {
            return true;
        }
        return false;
    };
    __decorate([
        core_1.Input()
    ], SelectBoxComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], SelectBoxComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], SelectBoxComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], SelectBoxComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], SelectBoxComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], SelectBoxComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], SelectBoxComponent.prototype, "panelCallBack");
    SelectBoxComponent = __decorate([
        core_1.Component({
            templateUrl: './select-box.component.html'
        })
    ], SelectBoxComponent);
    return SelectBoxComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.SelectBoxComponent = SelectBoxComponent;
