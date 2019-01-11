import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class LabelComponent extends DynamicBehaviorComponent implements OnInit {
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
    constructor();
    ngOnInit(): void;
    processCall(data: any): void;
    processPanelCallBack(): void;
}
