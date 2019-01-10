import {Component, EventEmitter, Input, NgModule, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {LabelComponent} from '../dynamic-input/label/label.component';
import {TextBoxComponent} from '../dynamic-input/textbox/textbox.component';
import {TextAreaComponent} from '../dynamic-input/text-area/text-area.component';
import {CheckBoxComponent} from '../dynamic-input/check-box/check-box.component';
import {SelectBoxComponent} from '../dynamic-input/select-box/select-box.component';
import {HiddenComponent} from '../dynamic-input/hidden/hidden.component';
import {FileUploadComponent} from '../dynamic-input/file-upload/file-upload.component';
import {ImageComponent} from '../dynamic-input/image/image.component';
import {AutoCompleteComponent} from '../dynamic-input/auto-complete/auto-complete.component';
import {ButtonComponent} from '../dynamic-input/button/button.component';
import {isArray, isNumber, isString} from 'util';
import {SwappingBoxComponent} from '../dynamic-input/swapping-box/swapping-box.component';
import {MapValueComponent} from '../dynamic-input/map-value/map-value.component';
import {QrCodeComponent} from '../dynamic-input/qrcode/qrcode.component';
import {RadioComponent} from '../dynamic-input/radio/radio.component';
import {DateComponent} from '../dynamic-input/date/date.component';
import {NgxDateComponent} from '../dynamic-input/ngx-date/ngx-date.component';
import {DynamicFormRowComponent} from '../dynamic-form-row/dynamic-form-row.component';
import {DynamicContainerTableComponent} from '../dynamic-container-table/dynamic-container-table.component';
import {Subscription} from 'rxjs/src/Subscription';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    entryComponents: [
        LabelComponent,
        TextBoxComponent,
        TextAreaComponent,
        CheckBoxComponent,
        SelectBoxComponent,
        HiddenComponent,
        FileUploadComponent,
        ImageComponent,
        AutoCompleteComponent,
        ButtonComponent,
        SwappingBoxComponent,
        MapValueComponent,
        QrCodeComponent,
        RadioComponent,
        DateComponent,
        NgxDateComponent
    ]
})
export class DynamicFormComponent implements OnInit {
    @ViewChildren(DynamicFormRowComponent) formRow: QueryList<DynamicFormRowComponent>;
    @ViewChildren(DynamicContainerTableComponent) formTableRow: QueryList<DynamicContainerTableComponent>;
    @Input() formCreation;
    @Input() actionDataIndex = 0;
    @Input() defaultData = {};
    @Input() showForm = false;
    @Input() option = {};
    @Output() callBack = new EventEmitter();
    @Output() panelCallBack = new EventEmitter();
    frameHeader = [];
    objKey = Object.keys;
    fieldLabelList = [];
    _reRenderFieldList = [];
    refinedContainerTableMode = [];
    tempDeleteData = [];
    onDeleteProcess = false;
    deleteDataTimer:any;
    tempAddData = [];
    onAddProcess = false;
    addDataTimer:any;
    setDataQueue = [];
    duplicateQueue = [];
    private startMilliseconds: number = null;

    constructor() {

    }

    ngOnInit() {
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
    }
    verifyField() {
        let fieldList = this.getFieldList();
        let check = true;
        for (let fieldName of fieldList) {
            for (let dataIndex in this.formCreation.data) {
                if (this.formCreation.data[dataIndex][fieldName] == undefined) {
                    check = false;
                    console.error("Dynamic form error field data not exists: "+fieldName + " data row: "+dataIndex);
                }
            }
        }
        if (check == true) {
            this.showForm = true;
        }
    }

    generateFrameHeader() {
        this.frameHeader = [];
        if (typeof (this.formCreation.form.option.frameName) != 'undefined'
            && Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            this.frameHeader = this.formCreation.form.option.frameName;
        } else if (typeof (this.formCreation.form.option.frameName) != 'undefined'
            && !Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.data.length == 1) {
            this.frameHeader[0] = this.formCreation.form.option.frameName;
        } else if (typeof (this.formCreation.form.option.frameName) != 'undefined'
            && !Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.data.length > 1) {
            let count = 0;
            for (let dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = String(this.formCreation.form.option.frameName) + String(count);
            }
            //return this.formCreation.form.option.frameName + (parseInt(rowIndex)+1);
        } else {
            let count = 0;
            for (let dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = 'Form ' + String(count);
            }
            //return "Form " +(parseInt(rowIndex)+1);
        }
    }

    processCallBack(event) {
        if (event.action == "deleteRow") {
            this.deleteRow(event.rowIndex);
        } else {
            this.callBack.emit(event);
        }
    }

    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }

    getDefault() {
        let setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            for (let container of this.formCreation.form.containerList) {
                for (let fieldCreation of container.fieldList) {
                    if (fieldCreation.type != 'checkBox') {
                        if (typeof (fieldCreation.default) != 'undefined') {
                            if (Array.isArray(fieldCreation.default)) {
                                this.defaultData[fieldCreation.fieldName] = Object.assign([], fieldCreation.default);
                            } else if (typeof (fieldCreation.default) == 'string') {
                                this.defaultData[fieldCreation.fieldName] = Object.assign([], [fieldCreation.default]);
                            }
                        } else {
                            if (setValueType.indexOf(fieldCreation.type) > -1) {
                                this.defaultData[fieldCreation.fieldName] = [{
                                    display:"",
                                    value:""
                                }]
                            } else {
                                this.defaultData[fieldCreation.fieldName] = [''];
                            }
                        }
                    } else {
                        if (typeof (fieldCreation.default) == 'object') {
                            this.defaultData[fieldCreation.fieldName] = Object.assign({}, fieldCreation.default);
                        } else {
                            let defaultVal = {};
                            for (let valueListData of fieldCreation.valueList) {
                                defaultVal[valueListData.value] = false;
                            }
                            this.defaultData[fieldCreation.fieldName] = Object.assign({}, defaultVal);
                        }
                    }
                }
            }
        }
        return this.defaultData;
    }

    reRenderForm() {
        this.refineContainerTableMode();
        this.showForm = false;
        Observable.interval(100)
            .takeWhile(() => !this.showForm)
            .subscribe(() => {
                this.showForm = true;
                // console.log(this.formCreation);
            });
    }

    reRenderField(fieldArray, rowIndex = 0) {
        if (!Array.isArray(fieldArray)) {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, [fieldArray]);
        } else {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, fieldArray);
        }
        Observable.interval(100)
            .takeWhile(() => this._reRenderFieldList != null)
            .subscribe(() => {
                // console.log("check");
                let checkFlag = true;
                for (let fieldName of this._reRenderFieldList) {
                    let getFieldElement = this.getDynamicInput(fieldName, rowIndex);
                    if (getFieldElement != null) {
                        // console.log("Still Found: "+fieldName,getFieldElement);
                        checkFlag = false;
                    }
                }
                if (checkFlag) {
                    this._reRenderFieldList = [];
                }
                // console.log(this.formCreation);
            });
    }

    setFieldAttribute(fieldName, attributeName, attributeValue) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName] = attributeValue;
                }
            }
        }
    }

    getFieldAttribute(fieldName, attributeName) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName];
                }
            }
        }
    }

    setDataValue(fieldName, rowIndex, value, multi = false) {
        if ( this.formCreation.data[rowIndex] != undefined) {
            this.setDataProcess(fieldName, rowIndex, value, multi);
        } else {
            this.setDataQueue.push({
                fieldName:fieldName,
                rowIndex:rowIndex,
                value:value,
                multi:multi
            });
            this.onFormReady(rowIndex+1).subscribe((data:any) => {
                if (data.status == "ready") {
                    while(this.setDataQueue.length > 0) {
                        let setDataSet = this.setDataQueue.shift();
                        this.setDataProcess(setDataSet.fieldName, setDataSet.rowIndex, setDataSet.value, setDataSet.multi);
                    }
                } else {
                    console.error("Dynamic form row number "+rowIndex+" didn't create. Can't set data.");
                }
            })
        }


    }
    setDataProcess (fieldName, rowIndex, value, multi = false) {
        let fieldType = this.getFieldType(fieldName);
        if (multi == false && fieldType != 'checkBox' && fieldType != 'fileUpload' && fieldType != 'image') {
            if (Array.isArray(value)) {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
            } else {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], [value]);
            }
        } else {
            if (Array.isArray(value)) {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
            } else {
                this.formCreation.data[rowIndex][fieldName] = Object.assign({}, value);
            }
        }
    }

    getFieldType(fieldName) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex].type;
                }
            }
        }
    }

    getDataValue(fieldName, rowIndex, dataIndex = null) {
        if (typeof (this.formCreation) != 'undefined') {
            if (typeof (this.formCreation.data[rowIndex]) == 'undefined') {
                return 'Row index not exits.';
            }
            if (typeof (this.formCreation.data[rowIndex][fieldName]) == 'undefined') {
                return 'Field name not exits: ' + fieldName;
            }
            if (dataIndex == null) {
                let dataType;
                if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                    dataType = [];
                } else {
                    dataType = {};
                }
                let dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                return dataClone;
            } else if (this.formCreation.data[rowIndex][fieldName]) {
                if (typeof (this.formCreation.data[rowIndex][fieldName][dataIndex]) == 'undefined') {
                    return 'Date index not exits in field ' + fieldName + ': ' + dataIndex;
                } else {
                    let dataType;
                    if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                        dataType = [];
                    } else {
                        dataType = {};
                    }
                    let dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                    return dataClone[dataIndex];
                }
            }
        }
    }

    getDynamicInput(fieldName, rowIndex = 0) {
        let formRowRef = null
        let containerListRef =  null;
        if (this.formCreation.form.option.displayMode == "table") {
            formRowRef = this.formTableRow.toArray();
            containerListRef = formRowRef[rowIndex];
        } else {
            formRowRef = this.formRow.toArray();
            containerListRef = formRowRef[rowIndex].containerListRef;
        }
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    let container = null;
                    if (this.formCreation.form.option.displayMode == "table") {
                        container = containerListRef;
                    } else {
                        container = containerListRef.find(instantContainer => instantContainer.containerIndex == containerIndex);
                    }
                    if (container != undefined) {
                        let input = container.getDynamicInput(fieldIndex);
                        return input;
                    }
                    return null;
                }
            }
        }
    }

    mapSetAttribute(attributeObject) {
        for (let fieldName in attributeObject) {
            for (let attribute in attributeObject[fieldName]) {
                this.setFieldAttribute(fieldName, attribute, attributeObject[fieldName][attribute]);
            }
        }
    }

    mapSetValue(valueObject, rowIndex) {
        for (let fieldName in valueObject) {
            this.setDataValue(fieldName, rowIndex, (valueObject[fieldName] == null || valueObject[fieldName] == '' ? '' : valueObject[fieldName]));
        }
    }

    mapGetValue(valueObject, rowIndex) {
        var mapValue = Object.assign({}, valueObject);
        for (let mapFieldName in mapValue) {
            if (typeof (mapValue[mapFieldName]) == 'string') {
                let dataTypeSplit = mapValue[mapFieldName].split(':');
                let dataType = (typeof (dataTypeSplit[1]) != 'undefined' ? dataTypeSplit[1] : '');
                let dataFieldDetail = dataTypeSplit[0].split('.');
                let fieldName = dataFieldDetail.shift();
                let type = this.getFieldAttribute(fieldName, 'type');
                let normalType = [
                    'textBox',
                    'textArea',
                    'label',
                    'hidden',
                    'number'];
                let dropDownType = [
                    'selectBox',
                    'radio'
                ];
                let setValueType = [
                    'autoComplete',
                    'swappingBox',
                    'mapValue'
                ];
                let fileValueType = [
                    'fileUpload',
                    'image'
                ];
                let checkBoxValueType = [
                    'checkBox'
                ];
                let dateValueType = [
                    'date'
                ];
                if (normalType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                    } else if (data.length > 1) {
                        mapValue[mapFieldName] = data;
                    } else {
                        mapValue[mapFieldName] = null;
                    }
                } else if (dropDownType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let setType = dataFieldDetail.pop();
                    if (data.length == 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                        } else {
                            let value = data.shift();
                            let valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            for (let valueListRow of valueListAttribute) {
                                if (valueListRow.value == value) {
                                    mapValue[mapFieldName] = valueListRow.display;
                                    break;
                                }
                            }
                        }
                    } else if (data.length > 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = data;
                        } else {
                            let displayList = [];
                            let valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            for (let dataRow of data) {
                                let value = dataRow;
                                for (let valueListRow of valueListAttribute) {
                                    if (valueListRow.value == value) {
                                        displayList.push(valueListRow.display);
                                        break;
                                    }
                                }
                            }
                            mapValue[mapFieldName] = displayList;
                        }
                    } else {
                        mapValue[mapFieldName] = null;
                    }
                } else if (setValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let setType = dataFieldDetail.pop();
                    if (setType != 'value' && setType != 'display' && setType != 'all') {
                        setType = 'value';
                    }
                    if (data.length == 1) {
                        let dataShift = data.shift();
                        if (setType != 'all') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, dataShift[setType]);
                        } else {
                            mapValue[mapFieldName] = {
                                display : dataShift["display"],
                                value: dataShift["value"]
                            };
                        }
                    } else if (data.length > 1) {
                        let dataArray = [];
                        for (let dataIndex in data) {
                            if (setType != "all") {
                                dataArray.push(data[dataIndex][setType]);
                            } else {
                                dataArray.push({
                                    display:data[dataIndex]["display"],
                                    value:data[dataIndex]["value"],
                                })
                            }
                        }
                        mapValue[mapFieldName] = dataArray;
                    } else {
                        mapValue[mapFieldName] = null;
                    }
                } else if (fileValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let fileArray = [];
                    for (let i = 0; i < data.selectFile.length; i++) {
                        fileArray.push(data.selectFile[i]);
                    }
                    if (fileArray.length == 1) {
                        mapValue[mapFieldName] = this.convertDataType(dataType, fileArray[0]);
                    } else if (fileArray.length > 1) {
                        mapValue[mapFieldName] = fileArray;
                    } else {
                        mapValue[mapFieldName] = null;
                    }
                } else if (checkBoxValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let valueList = this.getFieldAttribute(fieldName, 'valueList');
                    let setType = dataFieldDetail.pop();
                    if (Object.keys(data).length > 0) {
                        if (setType != 'value' && setType != 'display' && setType != 'all') {
                            mapValue[mapFieldName] = data;
                        } else if (setType == 'display') {
                            let returnValue = [];
                            for (let valueListRow of valueList) {
                                if (data[valueListRow.value] == true) {
                                    returnValue.push(valueListRow.display);
                                }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            } else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        } else if (setType == 'value') {
                            let returnValue = [];
                            for (let valueListRow of valueList) {
                                if (data[valueListRow.value] == true) {
                                    returnValue.push(valueListRow.value);
                                }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            } else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        } else if (setType == 'all') {
                            let returnValue = [];
                            for (let valueListRow of valueList) {
                                if (data[valueListRow.value] == true) {
                                    returnValue.push({
                                        display: valueListRow.display,
                                        value: valueListRow.value,
                                        checked: true
                                    });
                                } else {
                                    returnValue.push({
                                        display: valueListRow.display,
                                        value: valueListRow.value,
                                        checked: false
                                    });
                                }
                            }
                            mapValue[mapFieldName] = returnValue;
                        }
                    } else {
                        mapValue[mapFieldName] = null;
                    }
                } else if (dateValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    // console.log(data);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = this.convertDateStringToDB(data.shift().formatted);
                    } else if (data.length > 1) {
                        let dateList = [];
                        for (let dataValue of data) {
                            dateList.push(this.convertDateStringToDB(dataValue.formatted));
                        }
                        mapValue[mapFieldName] = dateList;
                    } else {
                        mapValue[mapFieldName] = null;
                    }
                }
            }
        }
        return mapValue;
    }

    convertDateStringToDB(dateString) {
        let dateSplit = String(dateString).split('/');
        return dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0];
    }

    convertDataType(dataType, data) {
        if (dataType == 'string' && !isString(data)) {
            return data.toString();
        } else if (dataType == 'int' && !isNumber(data)) {
            let returnData = parseInt(data);
            return (isNaN(returnData) ? 0 : returnData);
        } else if (dataType == 'float' && !isNumber(data)) {
            let returnData = parseFloat(data);
            return (isNaN(returnData) ? 0 : returnData);
        } else {
            return data;
        }
    }

    checkRequireField(rowIndex) {

        let setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        let fieldList = this.getFieldList();
        let requireStatus = true;
        for (let fieldName of fieldList) {
            let fieldRequireAttribute = this.getFieldAttribute(fieldName, 'require');
            let fieldType = this.getFieldAttribute(fieldName, 'type');
            if (typeof (fieldRequireAttribute) != 'undefined' && fieldRequireAttribute == true) {
                let fieldData = this.getDataValue(fieldName, rowIndex);
                if (isArray(fieldData)) {
                    if (setValueType.indexOf(fieldType) > -1) {
                        for (let fieldDataRow in fieldData) {
                            if ((fieldData[fieldDataRow].value == null || fieldData[fieldDataRow].value == '')
                                && (fieldData[fieldDataRow].display == null || fieldData[fieldDataRow].display == '')) {
                                requireStatus = false;
                                break;
                            }
                        }
                    } else {
                        for (let fieldDataRow in fieldData) {
                            if (fieldData[fieldDataRow] == null || fieldData[fieldDataRow] == '') {
                                requireStatus = false;
                                break;
                            }
                        }
                    }
                } else {
                    if (setValueType.indexOf(fieldType) > -1) {
                        if ((fieldData.value == null || fieldData.value == '')
                            && (fieldData.display == null || fieldData.display == '')) {
                            requireStatus = false;
                        }
                    } else if (fieldType == 'checkBox') {
                        let haveChecked = false;
                        for (let dataKey in fieldData) {
                            if (fieldData[dataKey] == true) {
                                haveChecked = true;
                                break;
                            }
                        }
                        if (haveChecked == false) {
                            requireStatus = false;
                        }
                    } else {
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
    }

    checkValidateField(roleIndex) {
        let fieldList = this.getFieldList();
        let checkPatternStatus = true;
        for (let fieldName of fieldList) {
            let fieldValuePattern = this.getFieldAttribute(fieldName, 'valuePattern');
            let fieldType = this.getFieldAttribute(fieldName, 'type');
            if (typeof (fieldValuePattern) != 'undefined') {
                let fieldData = this.getDataValue(fieldName, roleIndex);
                if (isArray(fieldData)) {
                    if (fieldType == 'autoComplete') {
                        for (let fieldDataRow in fieldData) {
                            if (!String(fieldData[fieldDataRow].display).match(fieldValuePattern)) {
                                checkPatternStatus = false;
                                break;
                            }
                        }
                    } else {
                        for (let fieldDataRow in fieldData) {
                            if (!String(fieldData[fieldDataRow]).match(fieldValuePattern)) {
                                checkPatternStatus = false;
                                break;
                            }
                        }
                    }
                } else {
                    if (fieldType == 'autoComplete') {
                        if (!String(fieldData.value).match(fieldValuePattern)) {
                            checkPatternStatus = false;
                        }
                    } else {
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
    }

    getFieldList() {
        let fieldList = [];
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                fieldList.push(containerData.fieldList[fieldIndex].fieldName);
            }
        }
        return fieldList;
    }

    getFieldLabel() {
        let fieldLabel = [];
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].type != "hidden") {
                    fieldLabel.push(containerData.fieldList[fieldIndex].label);
                }
            }
        }
        this.fieldLabelList = fieldLabel;
    }

    getFrameHeader(rowIndex) {
        if (typeof (this.formCreation.form.option.frameName) != 'undefined' && Array.isArray(this.formCreation.form.option.frameName) && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            return this.formCreation.form.option.frameName[rowIndex];
        } else if (typeof (this.formCreation.form.option.frameName) != 'undefined' && typeof (this.formCreation.form.option.frameName) != 'undefined' && !Array.isArray(this.formCreation.form.option.frameName)) {
            return this.formCreation.form.option.frameName + (parseInt(rowIndex) + 1);
        } else {
            return 'Form ' + (parseInt(rowIndex) + 1);
        }
    }

    getFormRow() {
        if (this.onAddProcess) {
            return this.tempAddData.length;
        } else if (this.onDeleteProcess) {
            return this.tempDeleteData.length
        }
        return this.formCreation.data.length;
    }

    addRow(rowIndex = null) {
        let rowCount = this.getFormRow();
        let _rowIndex = rowIndex;
        if (rowIndex == null) {
            _rowIndex = this.formCreation.data.length
        }
        let defaultValue = Object.assign({}, this.getDefault());
        if (!this.onAddProcess) {
            this.tempAddData = this.formCreation.data
            this.onAddProcess = true;
        }
        this.tempAddData.splice(_rowIndex,0,defaultValue);
        let tempData = [];
        for (let dataRowIndex in this.tempAddData) {
            if (dataRowIndex < _rowIndex) {
                tempData[dataRowIndex] = this.tempAddData[dataRowIndex]
            } else if (dataRowIndex >= _rowIndex) {
                tempData[dataRowIndex+rowCount] = this.tempAddData[dataRowIndex]
            }
        }
        this.formCreation.data = tempData;
        if (this.addDataTimer != null) {
            this.addDataTimer.unsubscribe();
        }
        this.addDataTimer = Observable.timer(200).subscribe(()=>{
            this.formCreation.data = Object.assign([],this.tempAddData);
            this.onAddProcess = false;
        });
        this.generateFrameHeader();
        this.callBack.emit({
            action: 'addRow',
            rowIndex: _rowIndex
        });
    }

    deleteRow(rowIndex) {
        if (this.formCreation.data[rowIndex] != undefined) {
            let rowCount = this.getFormRow();
            let tempRowList = [];
            for (let dataRowIndex in this.formCreation.data) {
                if (dataRowIndex < rowIndex) {
                    tempRowList.push(this.formCreation.data[dataRowIndex])
                } else if (dataRowIndex > rowIndex) {
                    tempRowList[dataRowIndex+rowCount] = this.formCreation.data[dataRowIndex];
                }
            }
            if (!this.onDeleteProcess) {
                this.tempDeleteData = Object.assign([], this.formCreation.data);
            }
            this.tempDeleteData.splice(rowIndex, 1);
            this.formCreation.data = tempRowList;
            if (this.deleteDataTimer != null) {
                this.deleteDataTimer
            }
            this.deleteDataTimer = Observable.timer(200).subscribe(()=>{
                this.formCreation.data = Object.assign([],this.tempDeleteData);
                this.onDeleteProcess = false;
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
    }

    callBackFrame(event) {
        if (event.action == 'deleteRow') {
            this.deleteRow(event.rowIndex);
        }
    }

    enableRow(rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = true;
    }

    disableRow(rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = false;
    }
    enableDeleteRow(rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = false;
    }
    disableDeleteRow(rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = true;
    }

    reFilter(rowIndex) {
        let fieldList: any = this.getFieldList;
        for (let fieldName of fieldList) {
            let fieldType = this.getFieldAttribute(fieldName, 'type');
            if (fieldType == 'autoComplete') {
                let dynamicInput: any = this.getDynamicInput(fieldName);
                dynamicInput.filterAutoComplete(0);
            }
        }
    }

    onFormReady(rowNum,data=null,timeout = 15000) {
        if (this.startMilliseconds == null) {
            let dateStart = new Date();
            this.startMilliseconds = dateStart.getTime();
        }
        let readyStatus = null;
        let response = new Observable((observable) => {
            Observable.interval(200)
                .takeWhile(() =>{ return readyStatus != true && this.startMilliseconds != null})
                .subscribe(() => {
                        let dateCurrent = new Date();
                        let currentMilliseconds = dateCurrent.getTime();
                        let diffTime = currentMilliseconds - this.startMilliseconds;
                        let fieldList = this.getFieldList();
                        let checkField = [];
                        for (let rowIndex = 0;rowIndex<rowNum;rowIndex ++) {
                            for (let fieldName of fieldList) {
                                let dynamicInput = this.getDynamicInput(fieldName,rowIndex);
                                checkField.push(dynamicInput);
                            }
                        }
                        if (checkField.indexOf(null) > -1) {
                            readyStatus = false;
                        } else {
                            readyStatus = true;
                        }
                        if (readyStatus == true || diffTime > timeout) {
                            this.startMilliseconds = null;
                            if (readyStatus == true) {
                                observable.next({
                                    status:"ready",
                                    data:data
                                });
                            } else {
                                observable.next({
                                    status:"timeout",
                                    data:data
                                });
                            }
                            observable.complete();
                        }
                    }
                );
        });
        return response;
    }
    refineContainerTableMode() {
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            let fieldList = [];
            for (let container of this.formCreation.form.containerList) {
                for (let fieldCreation of container.fieldList) {
                    fieldList.push(fieldCreation);
                }
            }
            this.refinedContainerTableMode = [];
            this.refinedContainerTableMode.push({
                fieldList:fieldList
            });
        }
    }
    duplicateDataRow(sourceRow,destinationRow,actionOnFromReady = true) {
        if (this.formCreation.data[sourceRow] != undefined && this.formCreation.data[destinationRow] != undefined) {
            this.duplicateRowProcess(sourceRow,destinationRow);
        } else if (actionOnFromReady) {
            this.duplicateQueue.push({
                sourceRow:sourceRow,
                destinationRow:destinationRow
            })
            this.onFormReady(destinationRow+1).subscribe((readyStatus:any) => {
                if (readyStatus.status == "ready") {
                    while (this.duplicateQueue.length > 0) {
                        let duplicateData = this.duplicateQueue.shift();
                        this.duplicateRowProcess(duplicateData.sourceRow,duplicateData.destinationRow);
                    }
                } else {
                    console.error("Dynamic form row number "+destinationRow+" didn't create. Can't duplicate data");
                }
            })
        } else {
            console.error("Data index incorrect. Can't duplicate data.")
        }
    }
    duplicateRowProcess(sourceRow,destinationRow) {
        let fieldList = this.getFieldList();
        let objGet = {};
        for (let fieldName of fieldList) {
            objGet[fieldName] = fieldName+".all";
        }
        let sourceData = this.mapGetValue(objGet,sourceRow);
        for (let fieldName in sourceData) {
            let type = this.getFieldAttribute(fieldName,"type");
            if (type == "checkBox") {
                let value = {};
                for (let valueData of sourceData[fieldName]) {
                    value[valueData.value] = valueData.checked

                }
                sourceData[fieldName] = value;
            }
        }
        this.mapSetValue(sourceData,destinationRow);
    }

    checkDuplicate(fieldArray,regEx=/(.*)/,regExIndex=0){
        let tempDataCheck = [];
        let mapGet = {};
        let check = true;
        for (let fieldList of fieldArray) {
            mapGet[fieldList] = fieldList;
        }
        let formRow = this.getFormRow();
        for (let i = 0;i<formRow;i++) {
            let data = this.mapGetValue(mapGet,i)
            for (let dataKey in data) {
                let match = regEx.exec(data[dataKey]);
                if (tempDataCheck.indexOf(match[regExIndex]) > -1) {
                    check = false;
                    break;
                } else {
                    tempDataCheck.push(match[regExIndex])
                }
            }
            if (check == false) {
                break;
            }
        }
        return check;
    }

    checkRequireAll() {
        let check = true;
        let formRow = this.getFormRow();
        for (let i =0;i<formRow;i++) {
            if (!this.checkRequireField(i)) {
                check = false;
                break;
            }
        }
        return check;
    }

    checkValidateAll() {
        let check = true;
        let formRow = this.getFormRow();
        for (let i =0;i<formRow;i++) {
            if (!this.checkValidateField(i)) {
                check = false;
                break;
            }
        }
        return check;
    }
}
