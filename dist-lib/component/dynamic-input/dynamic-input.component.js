"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var inputComponent_component_1 = require("../inputComponent.component");
var textbox_component_1 = require("./textbox/textbox.component");
var label_component_1 = require("./label/label.component");
var check_box_component_1 = require("./check-box/check-box.component");
var text_area_component_1 = require("./text-area/text-area.component");
var select_box_component_1 = require("./select-box/select-box.component");
var hidden_component_1 = require("./hidden/hidden.component");
var file_upload_component_1 = require("./file-upload/file-upload.component");
var image_component_1 = require("./image/image.component");
var auto_complete_component_1 = require("./auto-complete/auto-complete.component");
var button_component_1 = require("./button/button.component");
var swapping_box_component_1 = require("./swapping-box/swapping-box.component");
var map_value_component_1 = require("./map-value/map-value.component");
var qrcode_component_1 = require("./qrcode/qrcode.component");
var radio_component_1 = require("./radio/radio.component");
var ngx_date_component_1 = require("./ngx-date/ngx-date.component");
var DynamicInputComponent = /** @class */ (function () {
    function DynamicInputComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.callBack = new core_1.EventEmitter();
        this.panelCallBack = new core_1.EventEmitter();
        this.componentTypes = {
            "textBox": textbox_component_1.TextBoxComponent,
            "textArea": text_area_component_1.TextAreaComponent,
            "label": label_component_1.LabelComponent,
            "checkBox": check_box_component_1.CheckBoxComponent,
            "selectBox": select_box_component_1.SelectBoxComponent,
            "hidden": hidden_component_1.HiddenComponent,
            "fileUpload": file_upload_component_1.FileUploadComponent,
            "image": image_component_1.ImageComponent,
            "autoComplete": auto_complete_component_1.AutoCompleteComponent,
            "button": button_component_1.ButtonComponent,
            "swappingBox": swapping_box_component_1.SwappingBoxComponent,
            "mapValue": map_value_component_1.MapValueComponent,
            "qrCode": qrcode_component_1.QrCodeComponent,
            "radio": radio_component_1.RadioComponent,
            "date": ngx_date_component_1.NgxDateComponent,
            "number": textbox_component_1.TextBoxComponent
        };
    }
    DynamicInputComponent.prototype.ngOnInit = function () {
        this.createComponent();
    };
    DynamicInputComponent.prototype.createComponent = function () {
        var component;
        if (typeof (this.type) == "undefined" || typeof (this.componentTypes[this.type]) == "undefined") {
            component = label_component_1.LabelComponent;
        }
        else {
            component = this.componentTypes[this.type];
        }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var componentRef = this.inputComp.viewContainerRef.createComponent(componentFactory);
        this.instantInput = componentRef.instance;
        this.instantInput.data = this.data;
        this.instantInput.type = this.type;
        this.instantInput.rowIndex = this.rowIndex;
        this.instantInput.option = this.option;
        this.instantInput.fieldCreation = this.fieldCreation;
        var callBack = this.callBack;
        this.instantInput.callBack.subscribe(function (input) {
            callBack.emit(input);
        });
        var panelCallBack = this.panelCallBack;
        var inputIndex = this.inputIndex;
        this.instantInput.panelCallBack.subscribe(function (input) {
            var eventData = Object.assign(input, {
                fieldIndex: inputIndex
            });
            panelCallBack.emit(eventData);
        });
    };
    DynamicInputComponent.prototype.processCall = function (data) {
        this.instantInput.processCall(data);
    };
    __decorate([
        core_1.ViewChild(inputComponent_component_1.InputComponent)
    ], DynamicInputComponent.prototype, "inputComp");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "option");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "fieldCreation");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "inputIndex");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "rowIndex");
    __decorate([
        core_1.Output()
    ], DynamicInputComponent.prototype, "callBack");
    __decorate([
        core_1.Output()
    ], DynamicInputComponent.prototype, "panelCallBack");
    DynamicInputComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-input',
            templateUrl: './dynamic-input.component.html'
        })
    ], DynamicInputComponent);
    return DynamicInputComponent;
}());
exports.DynamicInputComponent = DynamicInputComponent;
