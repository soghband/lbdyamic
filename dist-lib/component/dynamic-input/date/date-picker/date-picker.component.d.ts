import { OnInit } from '@angular/core';
export declare class DatePickerComponent implements OnInit {
    monthListLong: string[];
    monthListShort: string[];
    objKeys: (o: {}) => string[];
    month: number;
    year: number;
    yearListGen: number;
    dateList: any[];
    yearList: any[];
    showDate: boolean;
    showYear: boolean;
    showMonth: boolean;
    constructor();
    ngOnInit(): void;
    generateDateList(): void;
    actionPrev(): void;
    actionNext(): void;
    generateYearList(): void;
    actionPrevYear(): void;
    actionNextYear(): void;
    actionYearSelect(): void;
    selectYear(year: any): void;
    selectMonth(month: any): void;
}
