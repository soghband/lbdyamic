import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class SwappingBoxComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    columnCalculate: any;
    modeDisplay: string;
    objKeys: (o: {}) => string[];
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    constructor();
    ngOnInit(): void;
    processCall(data: any): void;
    processPanelCallBack(): void;
    checkDestData(valueList: any): boolean;
    transferData(valueIndex: any): void;
    removeData(dataIndex: any): void;
}
