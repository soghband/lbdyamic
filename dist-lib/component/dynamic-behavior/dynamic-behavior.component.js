"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DynamicBehaviorComponent = /** @class */ (function () {
    function DynamicBehaviorComponent() {
        this.callBack = new core_1.EventEmitter();
    }
    DynamicBehaviorComponent.prototype.getLabelWidth = function () {
        var width = "";
        if (typeof (this.fieldCreation.labelWidth) != "undefined") {
            width = this.fieldCreation.labelWidth + "px";
        }
        return width;
    };
    DynamicBehaviorComponent.prototype.getInputWidth = function () {
        var width = "";
        if (typeof (this.fieldCreation.labelWidth) != "undefined") {
            width = "calc(100% - " + (parseInt(this.fieldCreation.labelWidth) + 6) + "px)";
        }
        return width;
    };
    DynamicBehaviorComponent.prototype.processCallBack = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    DynamicBehaviorComponent.prototype.getCustomClass = function () {
        if (typeof (this.fieldCreation.customClass) != "undefined") {
            return this.fieldCreation.customClass;
        }
        else {
            return "";
        }
    };
    DynamicBehaviorComponent.prototype.checkRequire = function (index) {
        if (typeof (this.data[this.fieldCreation.fieldName][index]) != "undefined" && this.fieldCreation.require == true && this.data[this.fieldCreation.fieldName][index] == "") {
            return "require";
        }
        return "";
    };
    DynamicBehaviorComponent.prototype.getDisableIf = function () {
        var normalType = [
            'textBox',
            'textArea',
            'label',
            'hidden',
            'number',
            'selectBox',
            'radio'
        ];
        for (var fieldName in this.option.disableIf) {
            if (normalType.indexOf(this.fieldCreation.type) > -1) {
                var data = this.data[fieldName][0];
                if (String(data).match(this.option.disableIf[fieldName])) {
                    return true;
                }
            }
        }
        return false;
    };
    __decorate([
        core_1.Input()
    ], DynamicBehaviorComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], DynamicBehaviorComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], DynamicBehaviorComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], DynamicBehaviorComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], DynamicBehaviorComponent.prototype, "callBack");
    DynamicBehaviorComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], DynamicBehaviorComponent);
    return DynamicBehaviorComponent;
}());
exports.DynamicBehaviorComponent = DynamicBehaviorComponent;
