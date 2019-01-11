import { EventEmitter } from '@angular/core';
export declare class DynamicBehaviorComponent {
    fieldCreation: any;
    option: any;
    data: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    getLabelWidth(): string;
    getInputWidth(): string;
    processCallBack(event: any, action: any, dataIndex: any): void;
    getCustomClass(): any;
    checkRequire(index: any): "" | "require";
    getDisableIf(): boolean;
}
