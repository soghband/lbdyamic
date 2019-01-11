"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var InputComponent = /** @class */ (function () {
    function InputComponent(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    InputComponent.prototype.processCall = function (data) {
        console.log(1, data);
    };
    ;
    __decorate([
        core_1.Input()
    ], InputComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], InputComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], InputComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], InputComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], InputComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], InputComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], InputComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], InputComponent.prototype, "panelCallBack");
    InputComponent = __decorate([
        core_1.Component({
            selector: 'app-input',
            template: ''
        })
    ], InputComponent);
    return InputComponent;
}());
exports.InputComponent = InputComponent;
