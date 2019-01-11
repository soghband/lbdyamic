import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
export declare class MapValueComponent extends DynamicBehaviorComponent implements OnInit {
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
    constructor();
    ngOnInit(): void;
    addMultiVal(): void;
    deleteMultiVal(dataIndex: any): void;
    processKeyUp(event: any, action: any, dataIndex: any): boolean;
    processKeyDown(event: any, action: any, dataIndex: any): void;
    processCallBackKeyPress(event: any, action: any, dataIndex: any): boolean;
}
