import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class CheckBoxComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    objKey: (o: {}) => string[];
    columnCalculate: any;
    showSelectAll: string;
    selectAll: boolean;
    singleLine: string;
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    checkboxDisplay: string;
    constructor();
    ngOnInit(): void;
    toggleSelectAll(): void;
    processCall(data: any): void;
    processChange(event: any, s: any, valueList: any): void;
    toggleShowCheckBox(): void;
    haveChecked(): boolean;
}
