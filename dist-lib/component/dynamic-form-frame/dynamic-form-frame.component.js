"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DynamicFormFrameComponent = /** @class */ (function () {
    function DynamicFormFrameComponent() {
        this.showDeleteRow = false;
        this.callback = new core_1.EventEmitter();
    }
    DynamicFormFrameComponent.prototype.ngOnInit = function () {
    };
    DynamicFormFrameComponent.prototype.deleteRowProcess = function () {
        this.callback.emit({
            action: "deleteRow",
            rowIndex: this.rowIndex
        });
    };
    __decorate([
        core_1.Input()
    ], DynamicFormFrameComponent.prototype, "header");
    __decorate([
        core_1.Input()
    ], DynamicFormFrameComponent.prototype, "showDeleteRow");
    __decorate([
        core_1.Input()
    ], DynamicFormFrameComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], DynamicFormFrameComponent.prototype, "callback");
    DynamicFormFrameComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-form-frame',
            templateUrl: './dynamic-form-frame.component.html'
        })
    ], DynamicFormFrameComponent);
    return DynamicFormFrameComponent;
}());
exports.DynamicFormFrameComponent = DynamicFormFrameComponent;
