import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class TextBoxComponent extends DynamicBehaviorComponent implements OnInit {
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
    allowTempData: boolean;
    constructor();
    ngOnInit(): void;
    addMultiVal(): void;
    deleteMultiVal(dataIndex: any): void;
    processKeyUp(event: any, action: any, dataIndex: any): boolean;
    processKeyDown(event: any, action: any, dataIndex: any): void;
    processCallBackKeyPress(event: any, action: any, dataIndex: any): boolean;
    processBlur(event: any, action: any, dataIndex: any): boolean;
    processCall(data: any): void;
    processPanelCallBack(): void;
}
