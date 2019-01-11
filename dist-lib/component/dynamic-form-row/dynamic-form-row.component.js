"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var dynamic_container_component_1 = require("../dynamic-container/dynamic-container.component");
var DynamicFormRowComponent = /** @class */ (function () {
    function DynamicFormRowComponent() {
        this.callBack = new core_1.EventEmitter();
        this.panelCallBack = new core_1.EventEmitter();
        this.objKey = Object.keys;
    }
    DynamicFormRowComponent.prototype.ngOnInit = function () {
    };
    DynamicFormRowComponent.prototype.processCallBack = function (event) {
        this.callBack.emit(event);
    };
    DynamicFormRowComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit(event);
    };
    __decorate([
        core_1.ViewChildren(dynamic_container_component_1.DynamicContainerComponent)
    ], DynamicFormRowComponent.prototype, "containerListRef");
    __decorate([
        core_1.Input()
    ], DynamicFormRowComponent.prototype, "containerList");
    __decorate([
        core_1.Input()
    ], DynamicFormRowComponent.prototype, "_reRenderFieldList");
    __decorate([
        core_1.Input()
    ], DynamicFormRowComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], DynamicFormRowComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], DynamicFormRowComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], DynamicFormRowComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], DynamicFormRowComponent.prototype, "panelCallBack");
    DynamicFormRowComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-form-row',
            templateUrl: './dynamic-form-row.component.html'
        })
    ], DynamicFormRowComponent);
    return DynamicFormRowComponent;
}());
exports.DynamicFormRowComponent = DynamicFormRowComponent;
