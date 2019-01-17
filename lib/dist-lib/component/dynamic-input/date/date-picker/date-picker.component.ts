import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
    @Input() monthListLong = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    @Input() monthListShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    objKeys = Object.keys;
    month = 9;
    year = 2018;
    yearListGen = 0;
    dateList = [];
    yearList = [];
    showDate = true;
    showYear = false;
    showMonth = false;

    constructor() {
    }

    ngOnInit() {
        this.generateDateList();
        this.generateYearList();
    }
    generateDateList() {
        this.dateList = [];
        let firstDateOfMonth = new Date(this.year, this.month, 1);
        let lastDateOfMonth = new Date(this.year, this.month + 1, 0);

        let dayOfWeek = firstDateOfMonth.getDay();
        let startDate = firstDateOfMonth.getDate();
        let endDate = lastDateOfMonth.getDate();
        let dateRow = [];
        let dayCount = dayOfWeek;
        for (let i = startDate; i <= endDate; i++) {
            dateRow.push({
                day:i,
                month:this.month,
                year:this.year
            });
            if (dayCount == 6 || i == endDate || (this.dateList.length < 5 && i == endDate && dateRow.length == 7)) {
                if (this.dateList.length < 5 && i == endDate && dateRow.length == 7) {
                    this.dateList.push(dateRow);
                    dateRow = [];
                }
                if (i == endDate && dateRow.length < 7) {
                    let nextMonthDate = new Date(this.year,this.month,endDate+1);
                    let nextDate = nextMonthDate.getDate();
                    let nextMonth = nextMonthDate.getMonth();
                    let nextYear = nextMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.push({
                                day:nextDate,
                                month:nextMonth,
                                year:nextYear
                            }
                        );
                        if (dateRow.length == 7 && this.dateList.length < 5) {
                            this.dateList.push(dateRow);
                            dateRow = [];
                        }
                        nextDate++;
                    }
                }
                if (this.dateList.length == 0 && dateRow.length < 7) {
                    let prevMonthDate = new Date(this.year,this.month,0);
                    let prevDate = prevMonthDate.getDate();
                    let prevMonth = prevMonthDate.getMonth();
                    let prevYear = prevMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.unshift({
                            day:prevDate,
                            month:prevMonth,
                            year:prevYear
                        });
                        prevDate--;
                    }
                }
                this.dateList.push(dateRow);
                dateRow = [];
                dayCount = 0;
            } else {
                dayCount++;
            }
        }
    }
    actionPrev() {
        if (this.month == 0) {
            this.year--;
            this.month = 11;
        } else {
            this.month--;
        }
        this.generateDateList();
    }
    actionNext() {
        if (this.month == 11) {
            this.year++;
            this.month = 0;
        } else {
            this.month++;
        }
        this.generateDateList();
    }

    generateYearList() {
        if (this.yearListGen == 0) {
            this.yearListGen = this.year;
        }
        let startYear = this.yearListGen - 10;
        let endYear = this.yearListGen + 10;
        this.yearList = [];
        for (let i = startYear;i<=endYear;i++) {
            this.yearList.push(i);
        }
    }
    actionPrevYear() {
        this.yearListGen = this.yearListGen - 20;
        this.generateYearList();
    }
    actionNextYear() {
        this.yearListGen = this.yearListGen + 20;
        this.generateYearList();
    }
    actionYearSelect() {
        this.showDate = false;
        this.showMonth = false;
        this.showYear = true;
    }
    selectYear(year) {
        this.year = year;
        this.showYear = false;
        this.showMonth = true;
    }
    selectMonth(month) {
        this.month = month;
        this.generateDateList();
        this.showMonth = false;
        this.showDate = true;
    }

}
