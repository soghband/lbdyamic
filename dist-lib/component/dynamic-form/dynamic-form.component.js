"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var label_component_1 = require("../dynamic-input/label/label.component");
var textbox_component_1 = require("../dynamic-input/textbox/textbox.component");
var text_area_component_1 = require("../dynamic-input/text-area/text-area.component");
var check_box_component_1 = require("../dynamic-input/check-box/check-box.component");
var select_box_component_1 = require("../dynamic-input/select-box/select-box.component");
var hidden_component_1 = require("../dynamic-input/hidden/hidden.component");
var file_upload_component_1 = require("../dynamic-input/file-upload/file-upload.component");
var image_component_1 = require("../dynamic-input/image/image.component");
var auto_complete_component_1 = require("../dynamic-input/auto-complete/auto-complete.component");
var button_component_1 = require("../dynamic-input/button/button.component");
var util_1 = require("util");
var swapping_box_component_1 = require("../dynamic-input/swapping-box/swapping-box.component");
var map_value_component_1 = require("../dynamic-input/map-value/map-value.component");
var qrcode_component_1 = require("../dynamic-input/qrcode/qrcode.component");
var radio_component_1 = require("../dynamic-input/radio/radio.component");
var date_component_1 = require("../dynamic-input/date/date.component");
var ngx_date_component_1 = require("../dynamic-input/ngx-date/ngx-date.component");
var dynamic_form_row_component_1 = require("../dynamic-form-row/dynamic-form-row.component");
var dynamic_container_table_component_1 = require("../dynamic-container-table/dynamic-container-table.component");
var Rx_1 = require("rxjs/Rx");
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent() {
        this.actionDataIndex = 0;
        this.defaultData = {};
        this.showForm = false;
        this.option = {};
        this.callBack = new core_1.EventEmitter();
        this.panelCallBack = new core_1.EventEmitter();
        this.frameHeader = [];
        this.objKey = Object.keys;
        this.fieldLabelList = [];
        this._reRenderFieldList = [];
        this.refinedContainerTableMode = [];
        this.tempDeleteData = [];
        this.onDeleteProcess = false;
        this.tempAddData = [];
        this.onAddProcess = false;
        this.setDataQueue = [];
        this.duplicateQueue = [];
        this.startMilliseconds = null;
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.verifyField();
        // console.log("form>>",this.formCreation);
        this.formCreation.form.option = Object.assign(this.option, this.formCreation.form.option);
        this.getDefault();
        if (this.formCreation.form.option.frame == true) {
            this.generateFrameHeader();
        }
        this.getFieldLabel();
        if (this.formCreation.form.option.displayMode == "table") {
            this.refineContainerTableMode();
        }
    };
    DynamicFormComponent.prototype.verifyField = function () {
        var fieldList = this.getFieldList();
        var check = true;
        for (var _i = 0, fieldList_1 = fieldList; _i < fieldList_1.length; _i++) {
            var fieldName = fieldList_1[_i];
            for (var dataIndex in this.formCreation.data) {
                if (this.formCreation.data[dataIndex][fieldName] == undefined) {
                    check = false;
                    console.error("Dynamic form error field data not exists: " + fieldName + " data row: " + dataIndex);
                }
            }
        }
        if (check == true) {
            this.showForm = true;
        }
    };
    DynamicFormComponent.prototype.generateFrameHeader = function () {
        this.frameHeader = [];
        if (typeof (this.formCreation.form.option.frameName) != 'undefined'
            && Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            this.frameHeader = this.formCreation.form.option.frameName;
        }
        else if (typeof (this.formCreation.form.option.frameName) != 'undefined'
            && !Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.data.length == 1) {
            this.frameHeader[0] = this.formCreation.form.option.frameName;
        }
        else if (typeof (this.formCreation.form.option.frameName) != 'undefined'
            && !Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.data.length > 1) {
            var count = 0;
            for (var dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = String(this.formCreation.form.option.frameName) + String(count);
            }
            //return this.formCreation.form.option.frameName + (parseInt(rowIndex)+1);
        }
        else {
            var count = 0;
            for (var dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = 'Form ' + String(count);
            }
            //return "Form " +(parseInt(rowIndex)+1);
        }
    };
    DynamicFormComponent.prototype.processCallBack = function (event) {
        if (event.action == "deleteRow") {
            this.deleteRow(event.rowIndex);
        }
        else {
            this.callBack.emit(event);
        }
    };
    DynamicFormComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit(event);
    };
    DynamicFormComponent.prototype.getDefault = function () {
        var setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            for (var _i = 0, _a = this.formCreation.form.containerList; _i < _a.length; _i++) {
                var container = _a[_i];
                for (var _b = 0, _c = container.fieldList; _b < _c.length; _b++) {
                    var fieldCreation = _c[_b];
                    if (fieldCreation.type != 'checkBox') {
                        if (typeof (fieldCreation["default"]) != 'undefined') {
                            if (Array.isArray(fieldCreation["default"])) {
                                this.defaultData[fieldCreation.fieldName] = Object.assign([], fieldCreation["default"]);
                            }
                            else if (typeof (fieldCreation["default"]) == 'string') {
                                this.defaultData[fieldCreation.fieldName] = Object.assign([], [fieldCreation["default"]]);
                            }
                        }
                        else {
                            if (setValueType.indexOf(fieldCreation.type) > -1) {
                                this.defaultData[fieldCreation.fieldName] = [{
                                        display: "",
                                        value: ""
                                    }];
                            }
                            else {
                                this.defaultData[fieldCreation.fieldName] = [''];
                            }
                        }
                    }
                    else {
                        if (typeof (fieldCreation["default"]) == 'object') {
                            this.defaultData[fieldCreation.fieldName] = Object.assign({}, fieldCreation["default"]);
                        }
                        else {
                            var defaultVal = {};
                            for (var _d = 0, _e = fieldCreation.valueList; _d < _e.length; _d++) {
                                var valueListData = _e[_d];
                                defaultVal[valueListData.value] = false;
                            }
                            this.defaultData[fieldCreation.fieldName] = Object.assign({}, defaultVal);
                        }
                    }
                }
            }
        }
        return this.defaultData;
    };
    DynamicFormComponent.prototype.reRenderForm = function () {
        var _this = this;
        this.refineContainerTableMode();
        this.showForm = false;
        Rx_1.Observable.interval(100)
            .takeWhile(function () { return !_this.showForm; })
            .subscribe(function () {
            _this.showForm = true;
            // console.log(this.formCreation);
        });
    };
    DynamicFormComponent.prototype.reRenderField = function (fieldArray, rowIndex) {
        var _this = this;
        if (rowIndex === void 0) { rowIndex = 0; }
        if (!Array.isArray(fieldArray)) {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, [fieldArray]);
        }
        else {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, fieldArray);
        }
        Rx_1.Observable.interval(100)
            .takeWhile(function () { return _this._reRenderFieldList != null; })
            .subscribe(function () {
            // console.log("check");
            var checkFlag = true;
            for (var _i = 0, _a = _this._reRenderFieldList; _i < _a.length; _i++) {
                var fieldName = _a[_i];
                var getFieldElement = _this.getDynamicInput(fieldName, rowIndex);
                if (getFieldElement != null) {
                    // console.log("Still Found: "+fieldName,getFieldElement);
                    checkFlag = false;
                }
            }
            if (checkFlag) {
                _this._reRenderFieldList = [];
            }
            // console.log(this.formCreation);
        });
    };
    DynamicFormComponent.prototype.setFieldAttribute = function (fieldName, attributeName, attributeValue) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName] = attributeValue;
                }
            }
        }
    };
    DynamicFormComponent.prototype.getFieldAttribute = function (fieldName, attributeName) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName];
                }
            }
        }
    };
    DynamicFormComponent.prototype.setDataValue = function (fieldName, rowIndex, value, multi) {
        var _this = this;
        if (multi === void 0) { multi = false; }
        if (this.formCreation.data[rowIndex] != undefined) {
            this.setDataProcess(fieldName, rowIndex, value, multi);
        }
        else {
            this.setDataQueue.push({
                fieldName: fieldName,
                rowIndex: rowIndex,
                value: value,
                multi: multi
            });
            this.onFormReady(rowIndex + 1).subscribe(function (data) {
                if (data.status == "ready") {
                    while (_this.setDataQueue.length > 0) {
                        var setDataSet = _this.setDataQueue.shift();
                        _this.setDataProcess(setDataSet.fieldName, setDataSet.rowIndex, setDataSet.value, setDataSet.multi);
                    }
                }
                else {
                    console.error("Dynamic form row number " + rowIndex + " didn't create. Can't set data.");
                }
            });
        }
    };
    DynamicFormComponent.prototype.setDataProcess = function (fieldName, rowIndex, value, multi) {
        if (multi === void 0) { multi = false; }
        var fieldType = this.getFieldType(fieldName);
        if (multi == false && fieldType != 'checkBox' && fieldType != 'fileUpload' && fieldType != 'image') {
            if (Array.isArray(value)) {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
            }
            else {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], [value]);
            }
        }
        else {
            if (Array.isArray(value)) {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
            }
            else {
                this.formCreation.data[rowIndex][fieldName] = Object.assign({}, value);
            }
        }
    };
    DynamicFormComponent.prototype.getFieldType = function (fieldName) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex].type;
                }
            }
        }
    };
    DynamicFormComponent.prototype.getDataValue = function (fieldName, rowIndex, dataIndex) {
        if (dataIndex === void 0) { dataIndex = null; }
        if (typeof (this.formCreation) != 'undefined') {
            if (typeof (this.formCreation.data[rowIndex]) == 'undefined') {
                return 'Row index not exits.';
            }
            if (typeof (this.formCreation.data[rowIndex][fieldName]) == 'undefined') {
                return 'Field name not exits: ' + fieldName;
            }
            if (dataIndex == null) {
                var dataType = void 0;
                if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                    dataType = [];
                }
                else {
                    dataType = {};
                }
                var dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                return dataClone;
            }
            else if (this.formCreation.data[rowIndex][fieldName]) {
                if (typeof (this.formCreation.data[rowIndex][fieldName][dataIndex]) == 'undefined') {
                    return 'Date index not exits in field ' + fieldName + ': ' + dataIndex;
                }
                else {
                    var dataType = void 0;
                    if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                        dataType = [];
                    }
                    else {
                        dataType = {};
                    }
                    var dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                    return dataClone[dataIndex];
                }
            }
        }
    };
    DynamicFormComponent.prototype.getDynamicInput = function (fieldName, rowIndex) {
        if (rowIndex === void 0) { rowIndex = 0; }
        var formRowRef = null;
        var containerListRef = null;
        if (this.formCreation.form.option.displayMode == "table") {
            formRowRef = this.formTableRow.toArray();
            containerListRef = formRowRef[rowIndex];
        }
        else {
            formRowRef = this.formRow.toArray();
            containerListRef = formRowRef[rowIndex].containerListRef;
        }
        var _loop_1 = function (containerIndex) {
            var containerData = this_1.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    var container = null;
                    if (this_1.formCreation.form.option.displayMode == "table") {
                        container = containerListRef;
                    }
                    else {
                        container = containerListRef.find(function (instantContainer) { return instantContainer.containerIndex == containerIndex; });
                    }
                    if (container != undefined) {
                        var input = container.getDynamicInput(fieldIndex);
                        return { value: input };
                    }
                    return { value: null };
                }
            }
        };
        var this_1 = this;
        for (var containerIndex in this.formCreation.form.containerList) {
            var state_1 = _loop_1(containerIndex);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    DynamicFormComponent.prototype.mapSetAttribute = function (attributeObject) {
        for (var fieldName in attributeObject) {
            for (var attribute in attributeObject[fieldName]) {
                this.setFieldAttribute(fieldName, attribute, attributeObject[fieldName][attribute]);
            }
        }
    };
    DynamicFormComponent.prototype.mapSetValue = function (valueObject, rowIndex) {
        for (var fieldName in valueObject) {
            this.setDataValue(fieldName, rowIndex, (valueObject[fieldName] == null || valueObject[fieldName] == '' ? '' : valueObject[fieldName]));
        }
    };
    DynamicFormComponent.prototype.mapGetValue = function (valueObject, rowIndex) {
        var mapValue = Object.assign({}, valueObject);
        for (var mapFieldName in mapValue) {
            if (typeof (mapValue[mapFieldName]) == 'string') {
                var dataTypeSplit = mapValue[mapFieldName].split(':');
                var dataType = (typeof (dataTypeSplit[1]) != 'undefined' ? dataTypeSplit[1] : '');
                var dataFieldDetail = dataTypeSplit[0].split('.');
                var fieldName = dataFieldDetail.shift();
                var type = this.getFieldAttribute(fieldName, 'type');
                var normalType = [
                    'textBox',
                    'textArea',
                    'label',
                    'hidden',
                    'number'
                ];
                var dropDownType = [
                    'selectBox',
                    'radio'
                ];
                var setValueType = [
                    'autoComplete',
                    'swappingBox',
                    'mapValue'
                ];
                var fileValueType = [
                    'fileUpload',
                    'image'
                ];
                var checkBoxValueType = [
                    'checkBox'
                ];
                var dateValueType = [
                    'date'
                ];
                if (normalType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                    }
                    else if (data.length > 1) {
                        mapValue[mapFieldName] = data;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (dropDownType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    var setType = dataFieldDetail.pop();
                    if (data.length == 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                        }
                        else {
                            var value = data.shift();
                            var valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            for (var _i = 0, valueListAttribute_1 = valueListAttribute; _i < valueListAttribute_1.length; _i++) {
                                var valueListRow = valueListAttribute_1[_i];
                                if (valueListRow.value == value) {
                                    mapValue[mapFieldName] = valueListRow.display;
                                    break;
                                }
                            }
                        }
                    }
                    else if (data.length > 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = data;
                        }
                        else {
                            var displayList = [];
                            var valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                                var dataRow = data_1[_a];
                                var value = dataRow;
                                for (var _b = 0, valueListAttribute_2 = valueListAttribute; _b < valueListAttribute_2.length; _b++) {
                                    var valueListRow = valueListAttribute_2[_b];
                                    if (valueListRow.value == value) {
                                        displayList.push(valueListRow.display);
                                        break;
                                    }
                                }
                            }
                            mapValue[mapFieldName] = displayList;
                        }
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (setValueType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    var setType = dataFieldDetail.pop();
                    if (setType != 'value' && setType != 'display' && setType != 'all') {
                        setType = 'value';
                    }
                    if (data.length == 1) {
                        var dataShift = data.shift();
                        if (setType != 'all') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, dataShift[setType]);
                        }
                        else {
                            mapValue[mapFieldName] = {
                                display: dataShift["display"],
                                value: dataShift["value"]
                            };
                        }
                    }
                    else if (data.length > 1) {
                        var dataArray = [];
                        for (var dataIndex in data) {
                            if (setType != "all") {
                                dataArray.push(data[dataIndex][setType]);
                            }
                            else {
                                dataArray.push({
                                    display: data[dataIndex]["display"],
                                    value: data[dataIndex]["value"]
                                });
                            }
                        }
                        mapValue[mapFieldName] = dataArray;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (fileValueType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    var fileArray = [];
                    for (var i = 0; i < data.selectFile.length; i++) {
                        fileArray.push(data.selectFile[i]);
                    }
                    if (fileArray.length == 1) {
                        mapValue[mapFieldName] = this.convertDataType(dataType, fileArray[0]);
                    }
                    else if (fileArray.length > 1) {
                        mapValue[mapFieldName] = fileArray;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (checkBoxValueType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    var valueList = this.getFieldAttribute(fieldName, 'valueList');
                    var setType = dataFieldDetail.pop();
                    if (Object.keys(data).length > 0) {
                        if (setType != 'value' && setType != 'display' && setType != 'all') {
                            mapValue[mapFieldName] = data;
                        }
                        else if (setType == 'display') {
                            var returnValue = [];
                            for (var _c = 0, valueList_1 = valueList; _c < valueList_1.length; _c++) {
                                var valueListRow = valueList_1[_c];
                                if (data[valueListRow.value] == true) {
                                    returnValue.push(valueListRow.display);
                                }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            }
                            else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else if (setType == 'value') {
                            var returnValue = [];
                            for (var _d = 0, valueList_2 = valueList; _d < valueList_2.length; _d++) {
                                var valueListRow = valueList_2[_d];
                                if (data[valueListRow.value] == true) {
                                    returnValue.push(valueListRow.value);
                                }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            }
                            else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else if (setType == 'all') {
                            var returnValue = [];
                            for (var _e = 0, valueList_3 = valueList; _e < valueList_3.length; _e++) {
                                var valueListRow = valueList_3[_e];
                                if (data[valueListRow.value] == true) {
                                    returnValue.push({
                                        display: valueListRow.display,
                                        value: valueListRow.value,
                                        checked: true
                                    });
                                }
                                else {
                                    returnValue.push({
                                        display: valueListRow.display,
                                        value: valueListRow.value,
                                        checked: false
                                    });
                                }
                            }
                            mapValue[mapFieldName] = returnValue;
                        }
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (dateValueType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    // console.log(data);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = this.convertDateStringToDB(data.shift().formatted);
                    }
                    else if (data.length > 1) {
                        var dateList = [];
                        for (var _f = 0, data_2 = data; _f < data_2.length; _f++) {
                            var dataValue = data_2[_f];
                            dateList.push(this.convertDateStringToDB(dataValue.formatted));
                        }
                        mapValue[mapFieldName] = dateList;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
            }
        }
        return mapValue;
    };
    DynamicFormComponent.prototype.convertDateStringToDB = function (dateString) {
        var dateSplit = String(dateString).split('/');
        return dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0];
    };
    DynamicFormComponent.prototype.convertDataType = function (dataType, data) {
        if (dataType == 'string' && !util_1.isString(data)) {
            return data.toString();
        }
        else if (dataType == 'int' && !util_1.isNumber(data)) {
            var returnData = parseInt(data);
            return (isNaN(returnData) ? 0 : returnData);
        }
        else if (dataType == 'float' && !util_1.isNumber(data)) {
            var returnData = parseFloat(data);
            return (isNaN(returnData) ? 0 : returnData);
        }
        else {
            return data;
        }
    };
    DynamicFormComponent.prototype.checkRequireField = function (rowIndex) {
        var setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        var fieldList = this.getFieldList();
        var requireStatus = true;
        for (var _i = 0, fieldList_2 = fieldList; _i < fieldList_2.length; _i++) {
            var fieldName = fieldList_2[_i];
            var fieldRequireAttribute = this.getFieldAttribute(fieldName, 'require');
            var fieldType = this.getFieldAttribute(fieldName, 'type');
            if (typeof (fieldRequireAttribute) != 'undefined' && fieldRequireAttribute == true) {
                var fieldData = this.getDataValue(fieldName, rowIndex);
                if (util_1.isArray(fieldData)) {
                    if (setValueType.indexOf(fieldType) > -1) {
                        for (var fieldDataRow in fieldData) {
                            if ((fieldData[fieldDataRow].value == null || fieldData[fieldDataRow].value == '')
                                && (fieldData[fieldDataRow].display == null || fieldData[fieldDataRow].display == '')) {
                                requireStatus = false;
                                break;
                            }
                        }
                    }
                    else {
                        for (var fieldDataRow in fieldData) {
                            if (fieldData[fieldDataRow] == null || fieldData[fieldDataRow] == '') {
                                requireStatus = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (setValueType.indexOf(fieldType) > -1) {
                        if ((fieldData.value == null || fieldData.value == '')
                            && (fieldData.display == null || fieldData.display == '')) {
                            requireStatus = false;
                        }
                    }
                    else if (fieldType == 'checkBox') {
                        var haveChecked = false;
                        for (var dataKey in fieldData) {
                            if (fieldData[dataKey] == true) {
                                haveChecked = true;
                                break;
                            }
                        }
                        if (haveChecked == false) {
                            requireStatus = false;
                        }
                    }
                    else {
                        if (fieldData == null || fieldData == '') {
                            requireStatus = false;
                        }
                    }
                }
                if (requireStatus == false) {
                    break;
                }
            }
        }
        return requireStatus;
    };
    DynamicFormComponent.prototype.checkValidateField = function (roleIndex) {
        var fieldList = this.getFieldList();
        var checkPatternStatus = true;
        for (var _i = 0, fieldList_3 = fieldList; _i < fieldList_3.length; _i++) {
            var fieldName = fieldList_3[_i];
            var fieldValuePattern = this.getFieldAttribute(fieldName, 'valuePattern');
            var fieldType = this.getFieldAttribute(fieldName, 'type');
            if (typeof (fieldValuePattern) != 'undefined') {
                var fieldData = this.getDataValue(fieldName, roleIndex);
                if (util_1.isArray(fieldData)) {
                    if (fieldType == 'autoComplete') {
                        for (var fieldDataRow in fieldData) {
                            if (!String(fieldData[fieldDataRow].display).match(fieldValuePattern)) {
                                checkPatternStatus = false;
                                break;
                            }
                        }
                    }
                    else {
                        for (var fieldDataRow in fieldData) {
                            if (!String(fieldData[fieldDataRow]).match(fieldValuePattern)) {
                                checkPatternStatus = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (fieldType == 'autoComplete') {
                        if (!String(fieldData.value).match(fieldValuePattern)) {
                            checkPatternStatus = false;
                        }
                    }
                    else {
                        if (!String(fieldData).match(fieldValuePattern)) {
                            checkPatternStatus = false;
                        }
                    }
                }
                if (checkPatternStatus == false) {
                    break;
                }
            }
        }
        return checkPatternStatus;
    };
    DynamicFormComponent.prototype.getFieldList = function () {
        var fieldList = [];
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                fieldList.push(containerData.fieldList[fieldIndex].fieldName);
            }
        }
        return fieldList;
    };
    DynamicFormComponent.prototype.getFieldLabel = function () {
        var fieldLabel = [];
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].type != "hidden") {
                    fieldLabel.push(containerData.fieldList[fieldIndex].label);
                }
            }
        }
        this.fieldLabelList = fieldLabel;
    };
    DynamicFormComponent.prototype.getFrameHeader = function (rowIndex) {
        if (typeof (this.formCreation.form.option.frameName) != 'undefined' && Array.isArray(this.formCreation.form.option.frameName) && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            return this.formCreation.form.option.frameName[rowIndex];
        }
        else if (typeof (this.formCreation.form.option.frameName) != 'undefined' && typeof (this.formCreation.form.option.frameName) != 'undefined' && !Array.isArray(this.formCreation.form.option.frameName)) {
            return this.formCreation.form.option.frameName + (parseInt(rowIndex) + 1);
        }
        else {
            return 'Form ' + (parseInt(rowIndex) + 1);
        }
    };
    DynamicFormComponent.prototype.getFormRow = function () {
        if (this.onAddProcess) {
            return this.tempAddData.length;
        }
        else if (this.onDeleteProcess) {
            return this.tempDeleteData.length;
        }
        return this.formCreation.data.length;
    };
    DynamicFormComponent.prototype.addRow = function (rowIndex) {
        var _this = this;
        if (rowIndex === void 0) { rowIndex = null; }
        var rowCount = this.getFormRow();
        var _rowIndex = rowIndex;
        if (rowIndex == null) {
            _rowIndex = this.formCreation.data.length;
        }
        var defaultValue = Object.assign({}, this.getDefault());
        if (!this.onAddProcess) {
            this.tempAddData = this.formCreation.data;
            this.onAddProcess = true;
        }
        this.tempAddData.splice(_rowIndex, 0, defaultValue);
        var tempData = [];
        for (var dataRowIndex in this.tempAddData) {
            if (dataRowIndex < _rowIndex) {
                tempData[dataRowIndex] = this.tempAddData[dataRowIndex];
            }
            else if (dataRowIndex >= _rowIndex) {
                tempData[dataRowIndex + rowCount] = this.tempAddData[dataRowIndex];
            }
        }
        this.formCreation.data = tempData;
        if (this.addDataTimer != null) {
            this.addDataTimer.unsubscribe();
        }
        this.addDataTimer = Rx_1.Observable.timer(200).subscribe(function () {
            _this.formCreation.data = Object.assign([], _this.tempAddData);
            _this.onAddProcess = false;
        });
        this.generateFrameHeader();
        this.callBack.emit({
            action: 'addRow',
            rowIndex: _rowIndex
        });
    };
    DynamicFormComponent.prototype.deleteRow = function (rowIndex) {
        var _this = this;
        if (this.formCreation.data[rowIndex] != undefined) {
            var rowCount = this.getFormRow();
            var tempRowList = [];
            for (var dataRowIndex in this.formCreation.data) {
                if (dataRowIndex < rowIndex) {
                    tempRowList.push(this.formCreation.data[dataRowIndex]);
                }
                else if (dataRowIndex > rowIndex) {
                    tempRowList[dataRowIndex + rowCount] = this.formCreation.data[dataRowIndex];
                }
            }
            if (!this.onDeleteProcess) {
                this.tempDeleteData = Object.assign([], this.formCreation.data);
            }
            this.tempDeleteData.splice(rowIndex, 1);
            this.formCreation.data = tempRowList;
            if (this.deleteDataTimer != null) {
                this.deleteDataTimer;
            }
            this.deleteDataTimer = Rx_1.Observable.timer(200).subscribe(function () {
                _this.formCreation.data = Object.assign([], _this.tempDeleteData);
                _this.onDeleteProcess = false;
            });
        }
        this.generateFrameHeader();
        // this.reRenderForm();
        // Observable.timer(400).subscribe(() => {
        //     let fieldList = this.getFieldList();
        //     for (let fieldName of fieldList) {
        //         let tempData = Object.assign([],this.formCreation.data[rowIndex][fieldName]);
        //         console.log(tempData);
        //         this.formCreation.data[rowIndex][fieldName] = Object.assign([],this.defaultData[fieldName]);
        //         this.formCreation.data[rowIndex][fieldName] = Object.assign([],tempData);
        //     }
        // });
        this.callBack.emit({
            action: 'deleteRow',
            rowIndex: rowIndex
        });
    };
    DynamicFormComponent.prototype.callBackFrame = function (event) {
        if (event.action == 'deleteRow') {
            this.deleteRow(event.rowIndex);
        }
    };
    DynamicFormComponent.prototype.enableRow = function (rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = true;
    };
    DynamicFormComponent.prototype.disableRow = function (rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = false;
    };
    DynamicFormComponent.prototype.enableDeleteRow = function (rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = false;
    };
    DynamicFormComponent.prototype.disableDeleteRow = function (rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = true;
    };
    DynamicFormComponent.prototype.reFilter = function (rowIndex) {
        var fieldList = this.getFieldList;
        for (var _i = 0, fieldList_4 = fieldList; _i < fieldList_4.length; _i++) {
            var fieldName = fieldList_4[_i];
            var fieldType = this.getFieldAttribute(fieldName, 'type');
            if (fieldType == 'autoComplete') {
                var dynamicInput = this.getDynamicInput(fieldName);
                dynamicInput.filterAutoComplete(0);
            }
        }
    };
    DynamicFormComponent.prototype.onFormReady = function (rowNum, data, timeout) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (timeout === void 0) { timeout = 15000; }
        if (this.startMilliseconds == null) {
            var dateStart = new Date();
            this.startMilliseconds = dateStart.getTime();
        }
        var readyStatus = null;
        var response = new Rx_1.Observable(function (observable) {
            Rx_1.Observable.interval(200)
                .takeWhile(function () { return readyStatus != true && _this.startMilliseconds != null; })
                .subscribe(function () {
                var dateCurrent = new Date();
                var currentMilliseconds = dateCurrent.getTime();
                var diffTime = currentMilliseconds - _this.startMilliseconds;
                var fieldList = _this.getFieldList();
                var checkField = [];
                for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
                    for (var _i = 0, fieldList_5 = fieldList; _i < fieldList_5.length; _i++) {
                        var fieldName = fieldList_5[_i];
                        var dynamicInput = _this.getDynamicInput(fieldName, rowIndex);
                        checkField.push(dynamicInput);
                    }
                }
                if (checkField.indexOf(null) > -1) {
                    readyStatus = false;
                }
                else {
                    readyStatus = true;
                }
                if (readyStatus == true || diffTime > timeout) {
                    _this.startMilliseconds = null;
                    if (readyStatus == true) {
                        observable.next({
                            status: "ready",
                            data: data
                        });
                    }
                    else {
                        observable.next({
                            status: "timeout",
                            data: data
                        });
                    }
                    observable.complete();
                }
            });
        });
        return response;
    };
    DynamicFormComponent.prototype.refineContainerTableMode = function () {
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            var fieldList = [];
            for (var _i = 0, _a = this.formCreation.form.containerList; _i < _a.length; _i++) {
                var container = _a[_i];
                for (var _b = 0, _c = container.fieldList; _b < _c.length; _b++) {
                    var fieldCreation = _c[_b];
                    fieldList.push(fieldCreation);
                }
            }
            this.refinedContainerTableMode = [];
            this.refinedContainerTableMode.push({
                fieldList: fieldList
            });
        }
    };
    DynamicFormComponent.prototype.duplicateDataRow = function (sourceRow, destinationRow, actionOnFromReady) {
        var _this = this;
        if (actionOnFromReady === void 0) { actionOnFromReady = true; }
        if (this.formCreation.data[sourceRow] != undefined && this.formCreation.data[destinationRow] != undefined) {
            this.duplicateRowProcess(sourceRow, destinationRow);
        }
        else if (actionOnFromReady) {
            this.duplicateQueue.push({
                sourceRow: sourceRow,
                destinationRow: destinationRow
            });
            this.onFormReady(destinationRow + 1).subscribe(function (readyStatus) {
                if (readyStatus.status == "ready") {
                    while (_this.duplicateQueue.length > 0) {
                        var duplicateData = _this.duplicateQueue.shift();
                        _this.duplicateRowProcess(duplicateData.sourceRow, duplicateData.destinationRow);
                    }
                }
                else {
                    console.error("Dynamic form row number " + destinationRow + " didn't create. Can't duplicate data");
                }
            });
        }
        else {
            console.error("Data index incorrect. Can't duplicate data.");
        }
    };
    DynamicFormComponent.prototype.duplicateRowProcess = function (sourceRow, destinationRow) {
        var fieldList = this.getFieldList();
        var objGet = {};
        for (var _i = 0, fieldList_6 = fieldList; _i < fieldList_6.length; _i++) {
            var fieldName = fieldList_6[_i];
            objGet[fieldName] = fieldName + ".all";
        }
        var sourceData = this.mapGetValue(objGet, sourceRow);
        for (var fieldName in sourceData) {
            var type = this.getFieldAttribute(fieldName, "type");
            if (type == "checkBox") {
                var value = {};
                for (var _a = 0, _b = sourceData[fieldName]; _a < _b.length; _a++) {
                    var valueData = _b[_a];
                    value[valueData.value] = valueData.checked;
                }
                sourceData[fieldName] = value;
            }
        }
        this.mapSetValue(sourceData, destinationRow);
    };
    DynamicFormComponent.prototype.checkDuplicate = function (fieldArray, regEx, regExIndex) {
        if (regEx === void 0) { regEx = /(.*)/; }
        if (regExIndex === void 0) { regExIndex = 0; }
        var tempDataCheck = [];
        var mapGet = {};
        var check = true;
        for (var _i = 0, fieldArray_1 = fieldArray; _i < fieldArray_1.length; _i++) {
            var fieldList = fieldArray_1[_i];
            mapGet[fieldList] = fieldList;
        }
        var formRow = this.getFormRow();
        for (var i = 0; i < formRow; i++) {
            var data = this.mapGetValue(mapGet, i);
            for (var dataKey in data) {
                var match = regEx.exec(data[dataKey]);
                if (tempDataCheck.indexOf(match[regExIndex]) > -1) {
                    check = false;
                    break;
                }
                else {
                    tempDataCheck.push(match[regExIndex]);
                }
            }
            if (check == false) {
                break;
            }
        }
        return check;
    };
    DynamicFormComponent.prototype.checkRequireAll = function () {
        var check = true;
        var formRow = this.getFormRow();
        for (var i = 0; i < formRow; i++) {
            if (!this.checkRequireField(i)) {
                check = false;
                break;
            }
        }
        return check;
    };
    DynamicFormComponent.prototype.checkValidateAll = function () {
        var check = true;
        var formRow = this.getFormRow();
        for (var i = 0; i < formRow; i++) {
            if (!this.checkValidateField(i)) {
                check = false;
                break;
            }
        }
        return check;
    };
    __decorate([
        core_1.ViewChildren(dynamic_form_row_component_1.DynamicFormRowComponent)
    ], DynamicFormComponent.prototype, "formRow");
    __decorate([
        core_1.ViewChildren(dynamic_container_table_component_1.DynamicContainerTableComponent)
    ], DynamicFormComponent.prototype, "formTableRow");
    __decorate([
        core_1.Input()
    ], DynamicFormComponent.prototype, "formCreation");
    __decorate([
        core_1.Input()
    ], DynamicFormComponent.prototype, "actionDataIndex");
    __decorate([
        core_1.Input()
    ], DynamicFormComponent.prototype, "defaultData");
    __decorate([
        core_1.Input()
    ], DynamicFormComponent.prototype, "showForm");
    __decorate([
        core_1.Input()
    ], DynamicFormComponent.prototype, "option");
    __decorate([
        core_1.Output()
    ], DynamicFormComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], DynamicFormComponent.prototype, "panelCallBack");
    DynamicFormComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-form',
            templateUrl: './dynamic-form.component.html',
            entryComponents: [
                label_component_1.LabelComponent,
                textbox_component_1.TextBoxComponent,
                text_area_component_1.TextAreaComponent,
                check_box_component_1.CheckBoxComponent,
                select_box_component_1.SelectBoxComponent,
                hidden_component_1.HiddenComponent,
                file_upload_component_1.FileUploadComponent,
                image_component_1.ImageComponent,
                auto_complete_component_1.AutoCompleteComponent,
                button_component_1.ButtonComponent,
                swapping_box_component_1.SwappingBoxComponent,
                map_value_component_1.MapValueComponent,
                qrcode_component_1.QrCodeComponent,
                radio_component_1.RadioComponent,
                date_component_1.DateComponent,
                ngx_date_component_1.NgxDateComponent
            ]
        })
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());
exports.DynamicFormComponent = DynamicFormComponent;
