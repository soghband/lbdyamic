"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DynamicTableComponent = /** @class */ (function () {
    function DynamicTableComponent() {
        this.callBack = new core_1.EventEmitter();
        this.currentPage = 1;
        this.sortData = "";
    }
    DynamicTableComponent.prototype.ngOnInit = function () {
    };
    DynamicTableComponent.prototype.processCallBack = function (data) {
        this.callBack.emit(data);
        this.sortData = data.sortValue;
    };
    DynamicTableComponent.prototype.getTotalPage = function () {
        return Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum);
    };
    DynamicTableComponent.prototype.getPageRank = function () {
        var beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + 1);
        var endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + this.tableCreation.data.data.length);
        return {
            begin: beginRecord,
            end: endRecode
        };
    };
    DynamicTableComponent.prototype.processPagingCallBack = function (data) {
        this.currentPage = data;
        this.callBack.emit({
            action: "page",
            pageNumber: data
        });
    };
    DynamicTableComponent.prototype.getCheckedList = function () {
        return this.tableRef.getCheckedList();
    };
    DynamicTableComponent.prototype.clearCheckedList = function () {
        this.tableRef.clearCheckList();
    };
    __decorate([
        core_1.ViewChild("tableID")
    ], DynamicTableComponent.prototype, "tableRef");
    __decorate([
        core_1.Input()
    ], DynamicTableComponent.prototype, "tableCreation");
    __decorate([
        core_1.Output()
    ], DynamicTableComponent.prototype, "callBack");
    DynamicTableComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-table',
            templateUrl: './dynamic-table.component.html'
        })
    ], DynamicTableComponent);
    return DynamicTableComponent;
}());
exports.DynamicTableComponent = DynamicTableComponent;
