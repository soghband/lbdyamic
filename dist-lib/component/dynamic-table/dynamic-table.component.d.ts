import { EventEmitter, OnInit } from '@angular/core';
import { TableComponent } from './table/table.component';
export declare class DynamicTableComponent implements OnInit {
    tableRef: TableComponent;
    tableCreation: any;
    callBack: EventEmitter<{}>;
    currentPage: number;
    sortData: string;
    constructor();
    ngOnInit(): void;
    processCallBack(data: any): void;
    getTotalPage(): number;
    getPageRank(): {
        begin: number;
        end: any;
    };
    processPagingCallBack(data: any): void;
    getCheckedList(): any[];
    clearCheckedList(): void;
}
