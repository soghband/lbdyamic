import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
export declare class NgxDateComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    columnCalculate: string;
    objKeys: (o: {}) => string[];
    tempValue: any;
    myOptions: INgxMyDpOptions;
    constructor();
    ngOnInit(): void;
    addMultiVal(): void;
    deleteMultiVal(dataIndex: any): void;
    processKeyUp(event: any, action: any, dataIndex: any): void;
    processKeyDown(event: any, action: any, dataIndex: any): void;
    processCallBackKeyPress(event: any, action: any, dataIndex: any): boolean;
    processBlur(event: any, action: any, dataIndex: any): void;
    processCall(data: any): void;
    processPanelCallBack(): void;
    onDateChanged(event: any, dataIndex: any): void;
    validateDateFormat(event: any, dataIndex: any): void;
    disableToggle(): void;
}
