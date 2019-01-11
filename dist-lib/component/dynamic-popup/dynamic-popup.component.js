"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var function_1 = require("codelyzer/util/function");
var Observable_1 = require("rxjs/Observable");
var DynamicPopupComponent = /** @class */ (function () {
    function DynamicPopupComponent() {
        this.callback = new core_1.EventEmitter();
        this.confirmStatus = false;
        this.showStatus = false;
        this.queue = false;
        this.statusPopup = 'hidePopup';
        this.popupProperties = {
            header: 'popupHeader',
            type: 'info',
            icon: 'glyphicon-info-sign',
            colorClass: '',
            eventCode: '',
            data: function_1.any,
            message: 'Informations'
        };
        this.tempData = {
            header: 'popupHeader',
            type: 'info',
            icon: 'glyphicon-info-sign',
            colorClass: '',
            eventCode: '',
            data: function_1.any,
            message: 'Informations'
        };
    }
    DynamicPopupComponent.prototype.ngOnInit = function () {
    };
    DynamicPopupComponent.prototype.set = function (type, message, eventCode, data) {
        if (eventCode === void 0) { eventCode = '000'; }
        if (data === void 0) { data = function_1.any; }
        switch (type) {
            case 'error':
                this.tempData = {
                    header: 'Error',
                    type: 'error',
                    icon: 'glyphicon-remove-sign',
                    colorClass: 'cError',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'warning':
                this.tempData = {
                    header: 'Warning',
                    type: 'warning',
                    icon: 'glyphicon-alert',
                    colorClass: 'cWarning',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'success':
                this.tempData = {
                    header: 'Success',
                    type: 'success',
                    icon: 'glyphicon-ok-sign',
                    colorClass: 'cSuccess',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'confirm':
                this.confirmStatus = false;
                this.tempData = {
                    header: 'Confirm',
                    type: 'confirm',
                    icon: 'glyphicon-question-sign',
                    colorClass: 'cConfirm',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'info':
                this.tempData = {
                    header: 'Informations',
                    type: 'info',
                    icon: 'glyphicon-info-sign',
                    colorClass: 'cInfo',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
        }
        this.showModel();
    };
    DynamicPopupComponent.prototype.showModel = function () {
        var _this = this;
        this.checkModalOpening();
        if (this.showStatus == false) {
            // $('#dynamicPopup').modal('show');
            this.popupProperties = this.tempData;
            this.statusPopup = 'showPopup';
            this.showStatus = true;
            this.queue = true;
        }
        else {
            this.hideModal();
            Observable_1.Observable.interval(500)
                .takeWhile(function () {
                return _this.queue == true;
            })
                .subscribe(function () {
                if (_this.showStatus == false) {
                    // $('#dynamicPopup').modal('show');
                    _this.popupProperties = _this.tempData;
                    _this.statusPopup = 'showPopup';
                    _this.showStatus = true;
                    _this.queue = false;
                }
            });
        }
    };
    DynamicPopupComponent.prototype.hideModal = function () {
        var _this = this;
        this.statusPopup = 'hidePopup';
        Observable_1.Observable.interval(500)
            .takeWhile(function () {
            return _this.showStatus == true;
        })
            .subscribe(function () {
            if (_this.showStatus == true) {
                _this.showStatus = false;
            }
        });
    };
    DynamicPopupComponent.prototype.checkModalOpening = function () {
        var _this = this;
        Observable_1.Observable.interval(500)
            .takeWhile(function () {
            return _this.showStatus == true;
        })
            .subscribe(function () {
            // if (this.showStatus == true && $('#dynamicPopup').css("display") == "none") {
            if (_this.showStatus == true && _this.statusPopup == '') {
                _this.showStatus = false;
            }
        });
    };
    DynamicPopupComponent.prototype.confirm = function () {
        this.confirmStatus = true;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
            data: this.popupProperties.data
        });
        this.hideModal();
    };
    DynamicPopupComponent.prototype.close = function () {
        this.confirmStatus = false;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode
        });
        this.hideModal();
    };
    __decorate([
        core_1.Output()
    ], DynamicPopupComponent.prototype, "callback");
    DynamicPopupComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-popup',
            templateUrl: './dynamic-popup.component.html'
        })
    ], DynamicPopupComponent);
    return DynamicPopupComponent;
}());
exports.DynamicPopupComponent = DynamicPopupComponent;
