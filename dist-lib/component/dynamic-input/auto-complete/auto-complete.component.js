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
var AutoCompleteComponent = /** @class */ (function (_super) {
    __extends(AutoCompleteComponent, _super);
    function AutoCompleteComponent() {
        var _this = _super.call(this) || this;
        _this.callBack = new core_1.EventEmitter();
        _this.panelCallBack = new core_1.EventEmitter();
        _this.columnCalculate = "";
        _this.objKeys = Object.keys;
        _this.autoCompleteFilterList = [];
        _this.displayAutoComplete = [];
        _this.setOnList = [];
        _this.maxShowData = 20;
        _this.selectIndex = 0;
        _this.tempValue = [];
        _this.tempValueValidate = {};
        _this.tempFilter = [];
        _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        _this.displayIndex = [];
        return _this;
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
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
                this.data[this.fieldCreation.fieldName] = [{
                        display: "",
                        value: ""
                    }];
                if (Array.isArray(this.fieldCreation["default"]) && this.checkDefault()) {
                    var newDefault = [];
                    for (var _i = 0, _a = this.fieldCreation["default"]; _i < _a.length; _i++) {
                        var defaultDataRow = _a[_i];
                        newDefault.push(Object.assign({}, defaultDataRow));
                    }
                    this.data[this.fieldCreation.fieldName] = newDefault;
                }
                else if (typeof (this.fieldCreation["default"]) == "object" && this.checkDefault()) {
                    this.data[this.fieldCreation.fieldName] = [Object.assign({}, this.fieldCreation["default"])];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [{
                        display: "",
                        value: ""
                    }];
            }
        }
        if (typeof (this.fieldCreation.maxShowData) != "undefined" && parseInt(this.fieldCreation.maxShowData) > 0) {
            this.maxShowData = parseInt(this.fieldCreation.maxShowData);
        }
        for (var dataIndex in this.data[this.fieldCreation.fieldName]) {
            this.autoCompleteFilterList[dataIndex] = [];
            this.displayAutoComplete[dataIndex] = "autoCompleteHide";
            this.setOnList[dataIndex] = false;
            this.tempValue[dataIndex] = Object.assign({}, this.data[this.fieldCreation.fieldName][dataIndex]);
        }
        // for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
        // 	this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
        // }
    };
    AutoCompleteComponent.prototype.addMultiVal = function () {
        var dataLastIndex = this.data[this.fieldCreation.fieldName].length;
        this.autoCompleteFilterList[dataLastIndex] = [];
        this.displayAutoComplete[dataLastIndex] = "autoCompleteHide";
        this.setOnList[dataLastIndex] = false;
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    };
    AutoCompleteComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    AutoCompleteComponent.prototype.processFocus = function (event, action, dataIndex) {
        if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly != undefined && this.fieldCreation.readonly == false))
            && this.option.mode != "view"
            && (this.option.enableRowIndex == undefined || (this.option.enableRowIndex != undefined && (this.option.enableRowIndex[this.rowIndex] == undefined || this.option.enableRowIndex[this.rowIndex] == true)))) {
            this.selectIndex = 0;
            this.filterAutoComplete(dataIndex);
            this.displayAutoComplete[dataIndex] = "autoCompleteShow";
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    AutoCompleteComponent.prototype.hideList = function (dataIndex) {
        if (this.setOnList[dataIndex] == false) {
            this.displayAutoComplete[dataIndex] = "autoCompleteHide";
        }
    };
    AutoCompleteComponent.prototype.setOverList = function (dataIndex) {
        this.setOnList[dataIndex] = true;
    };
    AutoCompleteComponent.prototype.setOutList = function (dataIndex) {
        this.setOnList[dataIndex] = false;
    };
    AutoCompleteComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        this.allowTempData = true;
        if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly != undefined && this.fieldCreation.readonly == false))
            && this.option.mode != "view"
            && (this.option.enableRowIndex == undefined || (this.option.enableRowIndex != undefined && (this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)))) {
            if (this.fieldCreation.valueList.length > 0) {
                if (typeof (this.data[this.fieldCreation.fieldName][dataIndex]) == "undefined" || typeof (this.data[this.fieldCreation.fieldName][dataIndex].display) == "undefined") {
                    this.data[this.fieldCreation.fieldName][dataIndex] = {
                        display: "",
                        value: ""
                    };
                }
                if (this.displayAutoComplete[dataIndex] != "autoCompleteShow") {
                    this.displayAutoComplete[dataIndex] = "autoCompleteShow";
                }
                this.filterAutoComplete(dataIndex);
            }
            if (event.keyCode == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != "undefined") {
                this.hideList(dataIndex);
            }
            else if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                    return true;
                }
                else {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                    return false;
                }
            }
            if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                for (var _i = 0, _a = this.fieldCreation.valueList; _i < _a.length; _i++) {
                    var valueListRow = _a[_i];
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueListRow.display) {
                        this.data[this.fieldCreation.fieldName][dataIndex].value = valueListRow.value;
                        break;
                    }
                    else {
                        this.data[this.fieldCreation.fieldName][dataIndex].value = "";
                    }
                }
            }
        }
    };
    AutoCompleteComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        if (this.allowTempData == true) {
            this.tempValueValidate = this.data[this.fieldCreation.fieldName][dataIndex].display;
        }
        if (event.keyCode == 38 && this.selectIndex > 0) {
            this.selectIndex--;
        }
        else if (event.keyCode == 40 && this.selectIndex < (this.autoCompleteFilterList[dataIndex].length - 1)) {
            this.selectIndex++;
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    AutoCompleteComponent.prototype.processCall = function (data) {
        if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly != undefined && this.fieldCreation.readonly == false))
            && this.option.mode != "view"
            && (this.option.enableRowIndex == undefined || (this.option.enableRowIndex != undefined && (this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)))) {
            if (data.process == "processList") {
                var dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
                if (this.fieldCreation.valueList.length > 0) {
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                        var pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, "gi");
                        for (var _i = 0, _a = this.fieldCreation.valueList; _i < _a.length; _i++) {
                            var i = _a[_i];
                            if (String(i.display).match(pattern)) {
                                if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                                    this.autoCompleteFilterList[dataIndex].push(i);
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
                this.displayAutoComplete[dataIndex] = "autoCompleteShow";
            }
            else if (data.process == "clearFilter") {
                var dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
            }
        }
    };
    AutoCompleteComponent.prototype.assignData = function (event, dataIndex, data) {
        this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, data);
        this.tempValue[dataIndex] = Object.assign({}, data);
        this.displayAutoComplete[dataIndex] = "autoCompleteHide";
        this.setOnList[dataIndex] = false;
        this.callBack.emit({
            event: event,
            action: 'assignData',
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            assignData: data
        });
    };
    AutoCompleteComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode == 32 || event.keyCode > 46) {
            var key = event.key;
            if (!String(key).match(this.fieldCreation.inputPattern)) {
                return false;
            }
        }
        if (event.keyCode == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != "undefined") {
            this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
            this.selectIndex = 0;
        }
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            var combineValue = void 0;
            if (typeof (this.tempValueValidate) != "undefined") {
                combineValue = this.tempValueValidate + key;
            }
            else {
                combineValue = key;
            }
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
        return true;
    };
    AutoCompleteComponent.prototype.processBlur = function (event, action, dataIndex) {
        var validate = true;
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(this.fieldCreation.valuePattern)) {
            event.srcElement.focus();
            validate = false;
        }
        if (typeof (this.fieldCreation.fixedValue) != "undefined" && this.fieldCreation.fixedValue == true) {
            if (this.data[this.fieldCreation.fieldName][dataIndex].display != this.tempValue[dataIndex].display) {
                for (var _i = 0, _a = this.fieldCreation.valueList; _i < _a.length; _i++) {
                    var valueList = _a[_i];
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueList.display) {
                        this.tempValue[dataIndex] = Object.assign({}, valueList);
                        break;
                    }
                }
            }
            this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.tempValue[dataIndex]);
        }
        this.hideList(dataIndex);
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName
        });
    };
    AutoCompleteComponent.prototype.mouseOverChangeIndex = function (filterIndex) {
        this.selectIndex = filterIndex;
    };
    AutoCompleteComponent.prototype.filterAutoComplete = function (dataIndex) {
        this.refineValueList();
        if (((this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0 && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display) || this.fieldCreation.showAllData) && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display) {
            this.autoCompleteFilterList[dataIndex] = [];
            // let filterList = this.autoCompleteFilterList[dataIndex];
            this.tempFilter[dataIndex] = this.data[this.fieldCreation.fieldName][dataIndex].display;
            var resetSelectIndex = false;
            var pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, "gi");
            for (var _i = 0, _a = this.fieldCreation.valueList; _i < _a.length; _i++) {
                var i = _a[_i];
                if (String(i.display).match(pattern)) {
                    if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                        this.autoCompleteFilterList[dataIndex].push(i);
                        resetSelectIndex = true;
                    }
                    else {
                        break;
                    }
                }
            }
            if (resetSelectIndex == true) {
                this.selectIndex = 0;
            }
        }
    };
    AutoCompleteComponent.prototype.refineValueList = function () {
        var newValueList = [];
        for (var listIndex in this.fieldCreation.valueList) {
            if (this.fieldCreation.valueList[listIndex].display != "" && this.fieldCreation.valueList[listIndex].value != "") {
                newValueList.push({
                    display: this.fieldCreation.valueList[listIndex].display,
                    value: this.fieldCreation.valueList[listIndex].value
                });
            }
            if (this.fieldCreation.valueList[listIndex].display == "" && this.fieldCreation.valueList[listIndex].value != "") {
                newValueList.push({
                    display: this.fieldCreation.valueList[listIndex].value,
                    value: this.fieldCreation.valueList[listIndex].value
                });
            }
            if (this.fieldCreation.valueList[listIndex].value == "" && this.fieldCreation.valueList[listIndex].display != "") {
                newValueList.push({
                    display: this.fieldCreation.valueList[listIndex].display,
                    value: this.fieldCreation.valueList[listIndex].display
                });
            }
        }
        this.fieldCreation.valueList = newValueList;
    };
    AutoCompleteComponent.prototype.checkDefault = function () {
        var check = true;
        if (Array.isArray(this.fieldCreation["default"])) {
            for (var _i = 0, _a = this.fieldCreation["default"]; _i < _a.length; _i++) {
                var dataRow = _a[_i];
                if (typeof (dataRow.display) == "undefined" || dataRow.value == "undefined") {
                    check = false;
                }
            }
        }
        else {
            var dataRow = this.fieldCreation["default"];
            if (typeof (dataRow.display) == "undefined" || dataRow.value == "undefined") {
                check = false;
            }
        }
        return check;
    };
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "panelCallBack");
    AutoCompleteComponent = __decorate([
        core_1.Component({
            templateUrl: './auto-complete.component.html'
        })
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}(dynamic_behavior_component_1.DynamicBehaviorComponent));
exports.AutoCompleteComponent = AutoCompleteComponent;
