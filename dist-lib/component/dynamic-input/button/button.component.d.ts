import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class ButtonComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    objKeys: (o: {}) => string[];
    columnCalculate: any;
    constructor();
    ngOnInit(): void;
    processClick(event: any, action: any, dataIndex: any, valueList: any): void;
}
