"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dynamic_container_component_1 = require("./component/dynamic-container/dynamic-container.component");
var dynamic_form_component_1 = require("./component/dynamic-form/dynamic-form.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var dynamic_input_component_1 = require("./component/dynamic-input/dynamic-input.component");
var label_component_1 = require("./component/dynamic-input/label/label.component");
var textbox_component_1 = require("./component/dynamic-input/textbox/textbox.component");
var inputComponent_component_1 = require("./component/inputComponent.component");
var check_box_component_1 = require("./component/dynamic-input/check-box/check-box.component");
var text_area_component_1 = require("./component/dynamic-input/text-area/text-area.component");
var select_box_component_1 = require("./component/dynamic-input/select-box/select-box.component");
var hidden_component_1 = require("./component/dynamic-input/hidden/hidden.component");
var file_upload_component_1 = require("./component/dynamic-input/file-upload/file-upload.component");
var image_component_1 = require("./component/dynamic-input/image/image.component");
var auto_complete_component_1 = require("./component/dynamic-input/auto-complete/auto-complete.component");
var dynamic_table_component_1 = require("./component/dynamic-table/dynamic-table.component");
var table_component_1 = require("./component/dynamic-table/table/table.component");
var paging_component_1 = require("./component/dynamic-table/paging/paging.component");
var dynamic_behavior_component_1 = require("./component/dynamic-behavior/dynamic-behavior.component");
var error_msg_bubble_component_1 = require("./component/error-msg-bubble/error-msg-bubble.component");
var button_component_1 = require("./component/dynamic-input/button/button.component");
var dynamic_tab_component_1 = require("./component/dynamic-tab/dynamic-tab.component");
var dynamic_popup_component_1 = require("./component/dynamic-popup/dynamic-popup.component");
var swapping_box_component_1 = require("./component/dynamic-input/swapping-box/swapping-box.component");
var ngx_malihu_scrollbar_1 = require("ngx-malihu-scrollbar");
var map_value_component_1 = require("./component/dynamic-input/map-value/map-value.component");
var qrcode_component_1 = require("./component/dynamic-input/qrcode/qrcode.component");
var zxing_scanner_module_1 = require("./component/dynamic-input/qrcode/zxing-scanner/zxing-scanner.module");
var radio_component_1 = require("./component/dynamic-input/radio/radio.component");
var p2_panel_component_1 = require("./component/p2-panel/p2-panel.component");
var dynamic_form_frame_component_1 = require("./component/dynamic-form-frame/dynamic-form-frame.component");
var date_component_1 = require("./component/dynamic-input/date/date.component");
var datepicker_1 = require("@angular/material/datepicker");
var date_picker_component_1 = require("./component/dynamic-input/date/date-picker/date-picker.component");
var ngx_date_component_1 = require("./component/dynamic-input/ngx-date/ngx-date.component");
var ngx_mydatepicker_1 = require("ngx-mydatepicker");
var dynamic_container_table_component_1 = require("./component/dynamic-container-table/dynamic-container-table.component");
var dynamic_form_label_panel_component_1 = require("./component/dynamic-form-label-panel/dynamic-form-label-panel.component");
var dynamic_form_row_component_1 = require("./component/dynamic-form-row/dynamic-form-row.component");
var lock_screen_service_1 = require("./service/lock-screen.service");
var LightBreakDynamicFormModule = /** @class */ (function () {
    function LightBreakDynamicFormModule() {
    }
    LightBreakDynamicFormModule_1 = LightBreakDynamicFormModule;
    LightBreakDynamicFormModule.forRoot = function () {
        return {
            ngModule: LightBreakDynamicFormModule_1,
            providers: [lock_screen_service_1.LockScreenServiceP2]
        };
    };
    LightBreakDynamicFormModule = LightBreakDynamicFormModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_2.HttpClientModule,
                http_1.HttpModule,
                ngx_malihu_scrollbar_1.MalihuScrollbarModule,
                zxing_scanner_module_1.ZXingScannerModule,
                datepicker_1.MatDatepickerModule,
                ngx_mydatepicker_1.NgxMyDatePickerModule.forRoot()
            ],
            declarations: [
                dynamic_input_component_1.DynamicInputComponent,
                label_component_1.LabelComponent,
                textbox_component_1.TextBoxComponent,
                inputComponent_component_1.InputComponent,
                dynamic_form_component_1.DynamicFormComponent,
                check_box_component_1.CheckBoxComponent,
                text_area_component_1.TextAreaComponent,
                select_box_component_1.SelectBoxComponent,
                dynamic_container_component_1.DynamicContainerComponent,
                hidden_component_1.HiddenComponent,
                file_upload_component_1.FileUploadComponent,
                image_component_1.ImageComponent,
                auto_complete_component_1.AutoCompleteComponent,
                dynamic_table_component_1.DynamicTableComponent,
                table_component_1.TableComponent,
                paging_component_1.PagingComponent,
                dynamic_behavior_component_1.DynamicBehaviorComponent,
                error_msg_bubble_component_1.ErrorMsgBubbleComponent,
                button_component_1.ButtonComponent,
                dynamic_tab_component_1.DynamicTabComponent,
                dynamic_popup_component_1.DynamicPopupComponent,
                swapping_box_component_1.SwappingBoxComponent,
                map_value_component_1.MapValueComponent,
                qrcode_component_1.QrCodeComponent,
                radio_component_1.RadioComponent,
                p2_panel_component_1.P2PanelComponent,
                dynamic_form_frame_component_1.DynamicFormFrameComponent,
                date_component_1.DateComponent,
                date_picker_component_1.DatePickerComponent,
                ngx_date_component_1.NgxDateComponent,
                dynamic_container_table_component_1.DynamicContainerTableComponent,
                dynamic_form_label_panel_component_1.DynamicFormLabelPanelComponent,
                dynamic_form_row_component_1.DynamicFormRowComponent,
            ],
            exports: [
                dynamic_input_component_1.DynamicInputComponent,
                label_component_1.LabelComponent,
                textbox_component_1.TextBoxComponent,
                inputComponent_component_1.InputComponent,
                dynamic_form_component_1.DynamicFormComponent,
                check_box_component_1.CheckBoxComponent,
                text_area_component_1.TextAreaComponent,
                select_box_component_1.SelectBoxComponent,
                dynamic_container_component_1.DynamicContainerComponent,
                hidden_component_1.HiddenComponent,
                file_upload_component_1.FileUploadComponent,
                image_component_1.ImageComponent,
                auto_complete_component_1.AutoCompleteComponent,
                dynamic_table_component_1.DynamicTableComponent,
                table_component_1.TableComponent,
                paging_component_1.PagingComponent,
                dynamic_behavior_component_1.DynamicBehaviorComponent,
                error_msg_bubble_component_1.ErrorMsgBubbleComponent,
                button_component_1.ButtonComponent,
                dynamic_tab_component_1.DynamicTabComponent,
                dynamic_popup_component_1.DynamicPopupComponent,
                swapping_box_component_1.SwappingBoxComponent,
                map_value_component_1.MapValueComponent,
                qrcode_component_1.QrCodeComponent,
                radio_component_1.RadioComponent,
                p2_panel_component_1.P2PanelComponent,
                dynamic_form_frame_component_1.DynamicFormFrameComponent,
                date_component_1.DateComponent,
                date_picker_component_1.DatePickerComponent,
                ngx_date_component_1.NgxDateComponent,
                dynamic_container_table_component_1.DynamicContainerTableComponent,
                dynamic_form_label_panel_component_1.DynamicFormLabelPanelComponent,
                dynamic_form_row_component_1.DynamicFormRowComponent,
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA,
                core_1.NO_ERRORS_SCHEMA
            ],
            providers: []
        })
    ], LightBreakDynamicFormModule);
    return LightBreakDynamicFormModule;
    var LightBreakDynamicFormModule_1;
}());
exports.LightBreakDynamicFormModule = LightBreakDynamicFormModule;
