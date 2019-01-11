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
var NgxDateComponent = /** @class */ (function (_super) {
    __extends(NgxDateComponent, _super);
    function NgxDateComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.columnCalculate = '';
        _this.objKeys = Object.keys;
        _this.myOptions = {
            // other options...
            dateFormat: 'dd/mm/yyyy'
        };
        return _this;
    }
    NgxDateComponent.prototype.ngOnInit = function () {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = 'dp2Col1';
                break;
            case 2:
                this.columnCalculate = 'dp2Col2';
                break;
            case 3:
                this.columnCalculate = 'dp2Col3';
                break;
            case 4:
                this.columnCalculate = 'dp2Col4';
                break;
            default:
                this.columnCalculate = '';
        }
        if (this.option.mode == 'add') {
            if (typeof (this.fieldCreation["default"]) != 'undefined') {
                if (Array.isArray(this.fieldCreation["default"])) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation["default"]);
                }
                else if (typeof (this.fieldCreation["default"]) == 'string') {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation["default"]];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [''];
            }
        }
    };
    NgxDateComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push('');
    };
    NgxDateComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    NgxDateComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        this.validateDateFormat(event, dataIndex);
    };
    NgxDateComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    NgxDateComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            var combineValue = this.tempValue + key;
            if (String(key).match(/[0-9/]/)) {
                return true;
            }
            return false;
        }
        return true;
    };
    NgxDateComponent.prototype.processBlur = function (event, action, dataIndex) {
        var validate = true;
        this.validateDateFormat(event, dataIndex);
        if (this.data[this.fieldCreation.fieldName][dataIndex] == null && event.target.value != '') {
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
    NgxDateComponent.prototype.processCall = function (data) {
    };
    NgxDateComponent.prototype.processPanelCallBack = function () {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    };
    NgxDateComponent.prototype.onDateChanged = function (event, dataIndex) {
        this.callBack.emit({
            event: event,
            action: 'dateChange',
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    NgxDateComponent.prototype.validateDateFormat = function (event, dataIndex) {
        var dateString = event.target.value;
        var eventType = event.type;
        var dateSplit = dateString.split('/');
        var currentDate = new Date();
        var yearAdjust;
        var monthAdjust;
        var dayAdjust;
        if (dateSplit.length == 3 && dateSplit[2].length == 4 && (eventType == "blur" || eventType == "keyup" && event.target.selectionEnd > 5)) {
            if (parseInt(dateSplit[2]) > (currentDate.getFullYear() + 50) || parseInt(dateSplit[2]) < (currentDate.getFullYear() - 50)) {
                yearAdjust = currentDate.getFullYear();
            }
            else {
                yearAdjust = parseInt(dateSplit[2]);
            }
            if (parseInt(dateSplit[1]) > 12) {
                monthAdjust = 12;
            }
            else {
                monthAdjust = parseInt(dateSplit[1]);
            }
            var dateCalculate = new Date(yearAdjust, monthAdjust, 0);
            var lastDayOfMont = dateCalculate.getDate();
            if (parseInt(dateSplit[0]) > lastDayOfMont) {
                dayAdjust = lastDayOfMont;
            }
            else {
                dayAdjust = parseInt(dateSplit[0]);
            }
            this.data[this.fieldCreation.fieldName][dataIndex] = {
                jsdate: new Date(yearAdjust, monthAdjust - 1, dayAdjust),
                formatted: dayAdjust + "/" + monthAdjust + "/" + yearAdjust
            };
        }
    };
    NgxDateComponent.prototype.disableToggle = function () {
    };
    __decorate([
        core_1.Input()
    ], NgxDateComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], NgxDateComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], NgxDateComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], NgxDateComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], NgxDateComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], NgxDateComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], NgxDateComponent.prototype, "panelCallBack");
    NgxDateComponent = __decorate([
        core_1.Component({
            templateUrl: './ngx-date.component.html'
        })
    ], NgxDateComponent);
    return NgxDateComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.NgxDateComponent = NgxDateComponent;
