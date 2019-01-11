import { EventEmitter, OnInit, QueryList } from '@angular/core';
import { DynamicFormRowComponent } from '../dynamic-form-row/dynamic-form-row.component';
import { DynamicContainerTableComponent } from '../dynamic-container-table/dynamic-container-table.component';
import { Observable } from 'rxjs/Rx';
export declare class DynamicFormComponent implements OnInit {
    formRow: QueryList<DynamicFormRowComponent>;
    formTableRow: QueryList<DynamicContainerTableComponent>;
    formCreation: any;
    actionDataIndex: number;
    defaultData: {};
    showForm: boolean;
    option: {};
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    frameHeader: any[];
    objKey: (o: {}) => string[];
    fieldLabelList: any[];
    _reRenderFieldList: any[];
    refinedContainerTableMode: any[];
    tempDeleteData: any[];
    onDeleteProcess: boolean;
    deleteDataTimer: any;
    tempAddData: any[];
    onAddProcess: boolean;
    addDataTimer: any;
    setDataQueue: any[];
    duplicateQueue: any[];
    private startMilliseconds;
    constructor();
    ngOnInit(): void;
    verifyField(): void;
    generateFrameHeader(): void;
    processCallBack(event: any): void;
    processPanelCallBack(event: any): void;
    getDefault(): {};
    reRenderForm(): void;
    reRenderField(fieldArray: any, rowIndex?: number): void;
    setFieldAttribute(fieldName: any, attributeName: any, attributeValue: any): void;
    getFieldAttribute(fieldName: any, attributeName: any): any;
    setDataValue(fieldName: any, rowIndex: any, value: any, multi?: boolean): void;
    setDataProcess(fieldName: any, rowIndex: any, value: any, multi?: boolean): void;
    getFieldType(fieldName: any): any;
    getDataValue(fieldName: any, rowIndex: any, dataIndex?: any): any;
    getDynamicInput(fieldName: any, rowIndex?: number): any;
    mapSetAttribute(attributeObject: any): void;
    mapSetValue(valueObject: any, rowIndex: any): void;
    mapGetValue(valueObject: any, rowIndex: any): any;
    convertDateStringToDB(dateString: any): string;
    convertDataType(dataType: any, data: any): any;
    checkRequireField(rowIndex: any): boolean;
    checkValidateField(roleIndex: any): boolean;
    getFieldList(): any[];
    getFieldLabel(): void;
    getFrameHeader(rowIndex: any): any;
    getFormRow(): any;
    addRow(rowIndex?: any): void;
    deleteRow(rowIndex: any): void;
    callBackFrame(event: any): void;
    enableRow(rowIndex: any): void;
    disableRow(rowIndex: any): void;
    enableDeleteRow(rowIndex: any): void;
    disableDeleteRow(rowIndex: any): void;
    reFilter(rowIndex: any): void;
    onFormReady(rowNum: any, data?: any, timeout?: number): Observable<{}>;
    refineContainerTableMode(): void;
    duplicateDataRow(sourceRow: any, destinationRow: any, actionOnFromReady?: boolean): void;
    duplicateRowProcess(sourceRow: any, destinationRow: any): void;
    checkDuplicate(fieldArray: any, regEx?: RegExp, regExIndex?: number): boolean;
    checkRequireAll(): boolean;
    checkValidateAll(): boolean;
}