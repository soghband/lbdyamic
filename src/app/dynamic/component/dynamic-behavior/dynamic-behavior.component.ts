import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  template: ''
})
export class DynamicBehaviorComponent {
    @Input() fieldCreation;
    @Input() option;
    @Input() data;
    @Input() rowIndex;
    @Output() callBack = new EventEmitter();
	getLabelWidth() {
		let width = "";
		if (typeof(this.fieldCreation.labelWidth) != "undefined") {
			width = this.fieldCreation.labelWidth + "px";
		}
		return width;
	}
	getInputWidth() {
		let width = "";
		if (typeof(this.fieldCreation.labelWidth) != "undefined") {
			width = "calc(100% - "+(parseInt(this.fieldCreation.labelWidth)+6)+"px)"
		}
		return width;
	}
	processCallBack(event,action,dataIndex) {
		this.callBack.emit({
			event:event,
			action:action,
			dataIndex:dataIndex,
			fieldName:this.fieldCreation.fieldName
		})
	}
	getCustomClass() {
		if (typeof(this.fieldCreation.customClass) != "undefined") {
			return this.fieldCreation.customClass;
		} else {
			return "";
		}
	}
	checkRequire(index) {
		if (typeof(this.data[this.fieldCreation.fieldName][index]) != "undefined" && this.fieldCreation.require == true && this.data[this.fieldCreation.fieldName][index] == "") {
			return "require";
		}
		return "";
	}
	getDisableIf() {
		let normalType = [
			'textBox',
			'textArea',
			'label',
			'hidden',
			'number',
			'selectBox',
			'radio'];
		for (let fieldName in this.option.disableIf) {
			if (normalType.indexOf(this.fieldCreation.type) > -1) {
				let data = this.data[fieldName][0];
				if (String(data).match(this.option.disableIf[fieldName])) {
					return true;
				}
			}
		}
		return false;
	}
}
