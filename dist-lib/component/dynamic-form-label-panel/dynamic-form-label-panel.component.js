"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DynamicFormLabelPanelComponent = /** @class */ (function () {
    function DynamicFormLabelPanelComponent() {
    }
    DynamicFormLabelPanelComponent.prototype.ngOnInit = function () {
    };
    DynamicFormLabelPanelComponent.prototype.getLabelDisplay = function () {
        if (typeof (this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
            return "dp2hide";
        }
        else if (this.option.labelAlign == "left") {
            return "singleLine";
        }
        else {
            return "";
        }
    };
    __decorate([
        core_1.Input()
    ], DynamicFormLabelPanelComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], DynamicFormLabelPanelComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], DynamicFormLabelPanelComponent.prototype, "width");
    DynamicFormLabelPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-form-label-panel',
            templateUrl: './dynamic-form-label-panel.component.html'
        })
    ], DynamicFormLabelPanelComponent);
    return DynamicFormLabelPanelComponent;
}());
exports.DynamicFormLabelPanelComponent = DynamicFormLabelPanelComponent;
