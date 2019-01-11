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
var MapValueComponent = /** @class */ (function (_super) {
    __extends(MapValueComponent, _super);
    function MapValueComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.columnCalculate = "";
        _this.objKeys = Object.keys;
        return _this;
    }
    MapValueComponent.prototype.ngOnInit = function () {
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
    };
    MapValueComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    };
    MapValueComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    MapValueComponent.prototype.processKeyUp = function (event, action, dataIndex) {
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
    MapValueComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    MapValueComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
        return true;
    };
    __decorate([
        core_1.Input()
    ], MapValueComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], MapValueComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], MapValueComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], MapValueComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], MapValueComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], MapValueComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], MapValueComponent.prototype, "panelCallBack");
    MapValueComponent = __decorate([
        core_1.Component({
            templateUrl: './map-value.component.html'
        })
    ], MapValueComponent);
    return MapValueComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.MapValueComponent = MapValueComponent;
