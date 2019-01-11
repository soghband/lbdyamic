import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class RadioComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    objKey: (o: {}) => string[];
    columnCalculate: any;
    selectAll: boolean;
    singleLine: string;
    constructor();
    ngOnInit(): void;
    processCall(data: any): void;
    processChange($event: any, s: any, valueList: any): void;
}
