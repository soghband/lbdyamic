import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DynamicContainerComponent} from './component/dynamic-container/dynamic-container.component';
import {DynamicFormComponent} from './component/dynamic-form/dynamic-form.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {DynamicInputComponent} from './component/dynamic-input/dynamic-input.component';
import {LabelComponent} from './component/dynamic-input/label/label.component';
import {TextBoxComponent} from './component/dynamic-input/textbox/textbox.component';
import {InputComponent} from './component/inputComponent.component';
import {CheckBoxComponent} from './component/dynamic-input/check-box/check-box.component';
import {TextAreaComponent} from './component/dynamic-input/text-area/text-area.component';
import {SelectBoxComponent} from './component/dynamic-input/select-box/select-box.component';
import {HiddenComponent} from './component/dynamic-input/hidden/hidden.component';
import {FileUploadComponent} from './component/dynamic-input/file-upload/file-upload.component';
import {ImageComponent} from './component/dynamic-input/image/image.component';
import {AutoCompleteComponent} from './component/dynamic-input/auto-complete/auto-complete.component';
import {DynamicTableComponent} from './component/dynamic-table/dynamic-table.component';
import {TableComponent} from './component/dynamic-table/table/table.component';
import {PagingComponent} from './component/dynamic-table/paging/paging.component';
import {DynamicBehaviorComponent} from './component/dynamic-behavior/dynamic-behavior.component';
import {ErrorMsgBubbleComponent} from './component/error-msg-bubble/error-msg-bubble.component';
import {ButtonComponent} from './component/dynamic-input/button/button.component';
import {DynamicTabComponent} from './component/dynamic-tab/dynamic-tab.component';
import {DynamicPopupComponent} from './component/dynamic-popup/dynamic-popup.component';
import {SwappingBoxComponent} from './component/dynamic-input/swapping-box/swapping-box.component';
import {MalihuScrollbarModule, MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {MapValueComponent} from './component/dynamic-input/map-value/map-value.component';
import {QrCodeComponent} from './component/dynamic-input/qrcode/qrcode.component';
import {ZXingScannerModule} from './component/dynamic-input/qrcode/zxing-scanner/zxing-scanner.module';
import {RadioComponent} from './component/dynamic-input/radio/radio.component';
import {P2PanelComponent} from './component/p2-panel/p2-panel.component';
import {DynamicFormFrameComponent} from './component/dynamic-form-frame/dynamic-form-frame.component';
import {DateComponent} from './component/dynamic-input/date/date.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePickerComponent} from './component/dynamic-input/date/date-picker/date-picker.component';
import {NgxDateComponent} from './component/dynamic-input/ngx-date/ngx-date.component';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {DynamicContainerTableComponent} from './component/dynamic-container-table/dynamic-container-table.component';
import {DynamicFormLabelPanelComponent} from './component/dynamic-form-label-panel/dynamic-form-label-panel.component';
import {DynamicFormRowComponent} from './component/dynamic-form-row/dynamic-form-row.component';
import {LockScreenServiceP2} from './service/lock-screen.service';
import {PanelMainComponent} from './component/panel/panel-main/panel-main.component';
import { PanelChildComponent } from './component/panel/panel-child/panel-child.component';
import { ButtonIconComponent } from './component/dynamic-input/button-icon/button-icon.component';
@NgModule({
imports: [
	CommonModule,
	FormsModule,
	HttpClientModule,
	HttpModule,
	MalihuScrollbarModule,
	ZXingScannerModule,
	MatDatepickerModule,
	NgxMyDatePickerModule.forRoot(),
],
declarations: [
	DynamicInputComponent,
	LabelComponent,
	TextBoxComponent,
	InputComponent,
	DynamicFormComponent,
	CheckBoxComponent,
	TextAreaComponent,
	SelectBoxComponent,
	DynamicContainerComponent,
	HiddenComponent,
	FileUploadComponent,
	ImageComponent,
	AutoCompleteComponent,
	DynamicTableComponent,
	TableComponent,
	PagingComponent,
	DynamicBehaviorComponent,
	ErrorMsgBubbleComponent,
	ButtonComponent,
	ButtonIconComponent,
	DynamicTabComponent,
	DynamicPopupComponent,
	SwappingBoxComponent,
	MapValueComponent,
	QrCodeComponent,
	RadioComponent,
	P2PanelComponent,
	DynamicFormFrameComponent,
	DateComponent,
	DatePickerComponent,
	NgxDateComponent,
	DynamicContainerTableComponent,
	DynamicFormLabelPanelComponent,
	DynamicFormRowComponent,
	PanelMainComponent,
	PanelChildComponent,
	ButtonIconComponent,
],
exports: [
	DynamicInputComponent,
	LabelComponent,
	TextBoxComponent,
	InputComponent,
	DynamicFormComponent,
	CheckBoxComponent,
	TextAreaComponent,
	SelectBoxComponent,
	DynamicContainerComponent,
	HiddenComponent,
	FileUploadComponent,
	ImageComponent,
	AutoCompleteComponent,
	DynamicTableComponent,
	TableComponent,
	PagingComponent,
	DynamicBehaviorComponent,
	ErrorMsgBubbleComponent,
	ButtonComponent,
	ButtonIconComponent,
	DynamicTabComponent,
	DynamicPopupComponent,
	SwappingBoxComponent,
	MapValueComponent,
	QrCodeComponent,
	RadioComponent,
	P2PanelComponent,
	DynamicFormFrameComponent,
	DateComponent,
	DatePickerComponent,
	NgxDateComponent,
	DynamicContainerTableComponent,
	DynamicFormLabelPanelComponent,
	DynamicFormRowComponent,
	PanelMainComponent,
	PanelChildComponent
],
schemas: [
	CUSTOM_ELEMENTS_SCHEMA,
	NO_ERRORS_SCHEMA
],
providers: []
})
export class LightBreakDynamicFormModule {
	static forRoot() {
		return {
			ngModule: LightBreakDynamicFormModule,
			providers: [ LockScreenServiceP2,MalihuScrollbarService]
		}
	}
}
