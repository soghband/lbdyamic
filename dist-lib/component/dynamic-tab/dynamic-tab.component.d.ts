import { EventEmitter, OnInit } from '@angular/core';
export declare class DynamicTabComponent implements OnInit {
    tabCreation: any;
    lockTab: boolean;
    callBack: EventEmitter<{}>;
    objKeys: (o: {}) => string[];
    currentTab: number;
    constructor();
    ngOnInit(): void;
    processCallBack(data: any): void;
    getCssStatus(tabNumber: any): "p2DShowTab" | "p2DHideTab";
}
