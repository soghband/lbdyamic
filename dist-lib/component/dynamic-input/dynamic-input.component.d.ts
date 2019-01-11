import { ComponentFactoryResolver, OnInit, EventEmitter } from '@angular/core';
import { InputComponent } from "../inputComponent.component";
import { TextBoxComponent } from "./textbox/textbox.component";
import { LabelComponent } from "./label/label.component";
import { CheckBoxComponent } from "./check-box/check-box.component";
import { TextAreaComponent } from "./text-area/text-area.component";
import { SelectBoxComponent } from "./select-box/select-box.component";
import { HiddenComponent } from "./hidden/hidden.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { ImageComponent } from "./image/image.component";
import { AutoCompleteComponent } from "./auto-complete/auto-complete.component";
import { ButtonComponent } from "./button/button.component";
import { SwappingBoxComponent } from "./swapping-box/swapping-box.component";
import { MapValueComponent } from './map-value/map-value.component';
import { QrCodeComponent } from './qrcode/qrcode.component';
import { RadioComponent } from "./radio/radio.component";
import { NgxDateComponent } from './ngx-date/ngx-date.component';
export declare class DynamicInputComponent implements OnInit {
    private componentFactoryResolver;
    inputComp: InputComponent;
    data: Object;
    type: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<{}>;
    panelCallBack: EventEmitter<{}>;
    instantInput: InputComponent;
    componentTypes: {
        "textBox": typeof TextBoxComponent;
        "textArea": typeof TextAreaComponent;
        "label": typeof LabelComponent;
        "checkBox": typeof CheckBoxComponent;
        "selectBox": typeof SelectBoxComponent;
        "hidden": typeof HiddenComponent;
        "fileUpload": typeof FileUploadComponent;
        "image": typeof ImageComponent;
        "autoComplete": typeof AutoCompleteComponent;
        "button": typeof ButtonComponent;
        "swappingBox": typeof SwappingBoxComponent;
        "mapValue": typeof MapValueComponent;
        "qrCode": typeof QrCodeComponent;
        "radio": typeof RadioComponent;
        "date": typeof NgxDateComponent;
        "number": typeof TextBoxComponent;
    };
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    createComponent(): void;
    processCall(data: any): void;
}