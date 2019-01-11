import { ViewContainerRef, EventEmitter } from '@angular/core';
export declare class InputComponent {
    viewContainerRef: ViewContainerRef;
    constructor(viewContainerRef: ViewContainerRef);
    data: any;
    type: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    processCall(data: any): void;
}
