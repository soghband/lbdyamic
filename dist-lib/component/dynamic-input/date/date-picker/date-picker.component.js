"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
        this.monthListLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthListShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.objKeys = Object.keys;
        this.month = 9;
        this.year = 2018;
        this.yearListGen = 0;
        this.dateList = [];
        this.yearList = [];
        this.showDate = true;
        this.showYear = false;
        this.showMonth = false;
    }
    DatePickerComponent.prototype.ngOnInit = function () {
        this.generateDateList();
        this.generateYearList();
    };
    DatePickerComponent.prototype.generateDateList = function () {
        this.dateList = [];
        var firstDateOfMonth = new Date(this.year, this.month, 1);
        var lastDateOfMonth = new Date(this.year, this.month + 1, 0);
        var dayOfWeek = firstDateOfMonth.getDay();
        var startDate = firstDateOfMonth.getDate();
        var endDate = lastDateOfMonth.getDate();
        var dateRow = [];
        var dayCount = dayOfWeek;
        for (var i = startDate; i <= endDate; i++) {
            dateRow.push({
                day: i,
                month: this.month,
                year: this.year
            });
            if (dayCount == 6 || i == endDate || (this.dateList.length < 5 && i == endDate && dateRow.length == 7)) {
                if (this.dateList.length < 5 && i == endDate && dateRow.length == 7) {
                    this.dateList.push(dateRow);
                    dateRow = [];
                }
                if (i == endDate && dateRow.length < 7) {
                    var nextMonthDate = new Date(this.year, this.month, endDate + 1);
                    var nextDate = nextMonthDate.getDate();
                    var nextMonth = nextMonthDate.getMonth();
                    var nextYear = nextMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.push({
                            day: nextDate,
                            month: nextMonth,
                            year: nextYear
                        });
                        if (dateRow.length == 7 && this.dateList.length < 5) {
                            this.dateList.push(dateRow);
                            dateRow = [];
                        }
                        nextDate++;
                    }
                }
                if (this.dateList.length == 0 && dateRow.length < 7) {
                    var prevMonthDate = new Date(this.year, this.month, 0);
                    var prevDate = prevMonthDate.getDate();
                    var prevMonth = prevMonthDate.getMonth();
                    var prevYear = prevMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.unshift({
                            day: prevDate,
                            month: prevMonth,
                            year: prevYear
                        });
                        prevDate--;
                    }
                }
                this.dateList.push(dateRow);
                dateRow = [];
                dayCount = 0;
            }
            else {
                dayCount++;
            }
        }
    };
    DatePickerComponent.prototype.actionPrev = function () {
        if (this.month == 0) {
            this.year--;
            this.month = 11;
        }
        else {
            this.month--;
        }
        this.generateDateList();
    };
    DatePickerComponent.prototype.actionNext = function () {
        if (this.month == 11) {
            this.year++;
            this.month = 0;
        }
        else {
            this.month++;
        }
        this.generateDateList();
    };
    DatePickerComponent.prototype.generateYearList = function () {
        if (this.yearListGen == 0) {
            this.yearListGen = this.year;
        }
        var startYear = this.yearListGen - 10;
        var endYear = this.yearListGen + 10;
        this.yearList = [];
        for (var i = startYear; i <= endYear; i++) {
            this.yearList.push(i);
        }
    };
    DatePickerComponent.prototype.actionPrevYear = function () {
        this.yearListGen = this.yearListGen - 20;
        this.generateYearList();
    };
    DatePickerComponent.prototype.actionNextYear = function () {
        this.yearListGen = this.yearListGen + 20;
        this.generateYearList();
    };
    DatePickerComponent.prototype.actionYearSelect = function () {
        this.showDate = false;
        this.showMonth = false;
        this.showYear = true;
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        this.year = year;
        this.showYear = false;
        this.showMonth = true;
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        this.month = month;
        this.generateDateList();
        this.showMonth = false;
        this.showDate = true;
    };
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "monthListLong");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "monthListShort");
    DatePickerComponent = __decorate([
        core_1.Component({
            selector: 'app-date-picker',
            templateUrl: './date-picker.component.html'
        })
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
