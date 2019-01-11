import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
export declare class ImageComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    columnCalculate: any;
    base64textString: any[];
    objKeys: (o: {}) => string[];
    modeDisplay: string;
    errorMsg: string;
    constructor();
    ngOnInit(): void;
    handleFileSelect(evt: any): void;
    _handleReaderLoaded(readerEvt: any): void;
    getNasImageUrl(file: any): string;
    processCall(data: any): void;
    getType(data: any): "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function";
    validateFileExtension(): boolean;
}
