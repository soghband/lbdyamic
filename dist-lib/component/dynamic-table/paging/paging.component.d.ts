import { EventEmitter, OnInit } from '@angular/core';
export declare class PagingComponent implements OnInit {
    currentPage: any;
    totalPage: any;
    totalRecord: any;
    dataRank: any;
    customClass: any;
    pagingProcess: EventEmitter<{}>;
    inputWidth: any;
    tempValue: any;
    constructor();
    ngOnInit(): void;
    checkInput(event: any): boolean;
    goFirst(): void;
    goLast(): void;
    goPrev(): void;
    goNext(): void;
    keepValue(): void;
    checkValue(): void;
    getTotalRecordStr(): string;
    processPaging(): void;
    checkTotalPage(): any;
}
