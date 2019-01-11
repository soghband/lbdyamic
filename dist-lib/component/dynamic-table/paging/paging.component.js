"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var PagingComponent = /** @class */ (function () {
    function PagingComponent() {
        this.pagingProcess = new core_1.EventEmitter();
    }
    PagingComponent.prototype.ngOnInit = function () {
        this.inputWidth = ((String(this.totalPage).length * 15) + 27) + "px";
    };
    PagingComponent.prototype.checkInput = function (event) {
        var modValue = parseInt(String(event.target.value) + event.key);
        if ((event.key.match(/^([0-9])$/)
            || (event.ctrlKey == true && (event.code == "KeyV" || event.code == "KeyC"))
            || event.code == "Backspace"
            || event.code == "ArrowUp"
            || event.code == "ArrowDown"
            || event.code == "ArrowLeft"
            || event.code == "ArrowRight"
            || event.code == "Tab") && modValue <= this.totalPage) {
            return true;
        }
        if (event.code == "NumpadEnter" || event.key == "Enter" || event.code == "Enter") {
            this.checkValue();
        }
        return false;
    };
    PagingComponent.prototype.goFirst = function () {
        if (this.currentPage != 1) {
            this.currentPage = 1;
            this.processPaging();
        }
    };
    PagingComponent.prototype.goLast = function () {
        if (this.currentPage != this.totalPage) {
            this.currentPage = this.totalPage;
            this.processPaging();
        }
    };
    PagingComponent.prototype.goPrev = function () {
        if (this.currentPage != 1) {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.processPaging();
        }
    };
    PagingComponent.prototype.goNext = function () {
        if (this.currentPage != this.totalPage) {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            }
            this.processPaging();
        }
    };
    PagingComponent.prototype.keepValue = function () {
        this.tempValue = this.currentPage;
    };
    PagingComponent.prototype.checkValue = function () {
        if (this.currentPage == 0 || this.currentPage == null) {
            this.currentPage = this.tempValue;
        }
        if (this.currentPage != this.tempValue) {
            this.processPaging();
        }
    };
    PagingComponent.prototype.getTotalRecordStr = function () {
        var str = "";
        if (typeof (this.dataRank) != "undefined") {
            str = "Showing " + this.dataRank.begin + " to " + this.dataRank.end + " of " + this.totalRecord;
        }
        return str;
    };
    PagingComponent.prototype.processPaging = function () {
        this.pagingProcess.emit(this.currentPage);
    };
    PagingComponent.prototype.checkTotalPage = function () {
        var _this = this;
        if (this.currentPage > this.totalPage) {
            Observable_1.Observable.interval(100)
                .take(1)
                .subscribe(function () {
                _this.currentPage = 1;
                _this.pagingProcess.emit(_this.currentPage);
            });
        }
        return this.totalPage;
    };
    __decorate([
        core_1.Input()
    ], PagingComponent.prototype, "currentPage");
    __decorate([
        core_1.Input()
    ], PagingComponent.prototype, "totalPage");
    __decorate([
        core_1.Input()
    ], PagingComponent.prototype, "totalRecord");
    __decorate([
        core_1.Input()
    ], PagingComponent.prototype, "dataRank");
    __decorate([
        core_1.Input()
    ], PagingComponent.prototype, "customClass");
    __decorate([
        core_1.Output()
    ], PagingComponent.prototype, "pagingProcess");
    PagingComponent = __decorate([
        core_1.Component({
            selector: 'app-paging',
            templateUrl: './paging.component.html'
        })
    ], PagingComponent);
    return PagingComponent;
}());
exports.PagingComponent = PagingComponent;
