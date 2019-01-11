"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var dynamic_input_component_1 = require("../dynamic-input/dynamic-input.component");
var DynamicContainerTableComponent = /** @class */ (function () {
    function DynamicContainerTableComponent() {
        this.reRenderField = [];
        this.callBack = new core_1.EventEmitter();
        this.panelCallBack = new core_1.EventEmitter();
        this.objKey = Object.keys;
    }
    DynamicContainerTableComponent.prototype.ngOnInit = function () {
        if (typeof (this.containerCreation.columnSpan) != "undefined") {
            var calculateString = this.containerCreation.columnSpan.split("/");
            var size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
            if (calculateString[1] == 1) {
                this.widthCalculator = size + "%";
            }
            else {
                this.widthCalculator = "calc(" + size + "% - 2px)";
            }
        }
        else {
            this.widthCalculator = "100%";
        }
    };
    DynamicContainerTableComponent.prototype.processCallBack = function (event) {
        event.rowIndex = this.actionDataIndex;
        this.callBack.emit(event);
    };
    DynamicContainerTableComponent.prototype.processPanelCallBack = function (event) {
        var dataEvent = Object.assign(event, {
            containerIndex: this.containerIndex
        });
        this.panelCallBack.emit(dataEvent);
    };
    DynamicContainerTableComponent.prototype.getDynamicInput = function (inputIndex) {
        var inputComponent = this.inputChild.find(function (instantInput) { return instantInput.inputIndex == inputIndex; });
        return inputComponent;
    };
    DynamicContainerTableComponent.prototype.checkReRender = function (fieldName) {
        if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
            return false;
        }
        return true;
    };
    DynamicContainerTableComponent.prototype.deleteRow = function (actionDataIndex) {
        this.callBack.emit({
            action: "deleteRow",
            rowIndex: actionDataIndex
        });
    };
    __decorate([
        core_1.ViewChildren(dynamic_input_component_1.DynamicInputComponent)
    ], DynamicContainerTableComponent.prototype, "inputChild");
    __decorate([
        core_1.Input()
    ], DynamicContainerTableComponent.prototype, "containerCreation");
    __decorate([
        core_1.Input()
    ], DynamicContainerTableComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], DynamicContainerTableComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], DynamicContainerTableComponent.prototype, "actionDataIndex");
    __decorate([
        core_1.Input()
    ], DynamicContainerTableComponent.prototype, "containerIndex");
    __decorate([
        core_1.Input()
    ], DynamicContainerTableComponent.prototype, "reRenderField");
    __decorate([
        core_1.Output()
    ], DynamicContainerTableComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], DynamicContainerTableComponent.prototype, "panelCallBack");
    DynamicContainerTableComponent = __decorate([
        core_1.Component({
            selector: '[app-dynamic-container-table]',
            templateUrl: './dynamic-container-table.component.html'
        })
    ], DynamicContainerTableComponent);
    return DynamicContainerTableComponent;
}());
exports.DynamicContainerTableComponent = DynamicContainerTableComponent;
