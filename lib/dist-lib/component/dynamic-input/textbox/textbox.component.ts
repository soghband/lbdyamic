import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";


@Component({
	templateUrl: './textbox.component.html'
})
export class TextBoxComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
 	@Input() fieldCreation;
 	@Input() inputIndex;
 	@Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	columnCalculate = "";
	objKeys = Object.keys;
	tempValue;
    allowTempData: boolean;
	constructor() {
		super();

	}
	ngOnInit() {
		switch (this.fieldCreation.columnPerLine) {
			case 1 :
				this.columnCalculate = "dp2Col1";
				break;
			case 2 :
				this.columnCalculate = "dp2Col2";
				break;
			case 3 :
				this.columnCalculate = "dp2Col3";
				break;
			case 4 :
				this.columnCalculate = "dp2Col4";
				break;
			default :
				this.columnCalculate = "";
		}
		if (this.option.mode == "add") {
			if (typeof(this.fieldCreation.default) != "undefined") {
				if (Array.isArray(this.fieldCreation.default)) {
					this.data[this.fieldCreation.fieldName] = Object.assign([],this.fieldCreation.default);
				} else if(typeof( this.fieldCreation.default) == "string") {
					this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
				}
			} else {
				this.data[this.fieldCreation.fieldName] = [""];
			}
		}
	}
	addMultiVal() {
		this.data[this.fieldCreation.fieldName].push("");
	}

	deleteMultiVal(dataIndex) {
		if (this.data[this.fieldCreation.fieldName].length > 1) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
		}
	}
	processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
        this.allowTempData = true;
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)){
			console.log(this.data[this.fieldCreation.fieldName][dataIndex]);
			if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)
				&& String(event.target.value).match(this.fieldCreation.valuePattern)) {
				return true;
			} else {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
				return false;
			}
		}

	}
	processKeyDown(event, action, dataIndex) {
		if (this.allowTempData == true) {
			this.allowTempData = false;
			this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
		}
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
	}
	processCallBackKeyPress(event, action, dataIndex) {
		this.callBack.emit({
			event:event,
			action:action,
			dataIndex:dataIndex,
			fieldName:this.fieldCreation.fieldName
		});
		if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true){
			let key = event.key;
			let combineValue = this.tempValue + key;
			let check = true;
			if (typeof(this.fieldCreation.inputPattern) != "undefined") {
				if (!String(key).match(this.fieldCreation.inputPattern)) {
                	check = false;
				}
			}
            if (typeof(this.fieldCreation.validateWhileKeyPress) != "undefined"
                && typeof(this.fieldCreation.valuePattern) != "undefined"
                && this.fieldCreation.validateWhileKeyPress) {
                if (!String(combineValue).match(this.fieldCreation.valuePattern)) {
                    check = false;
                }
            }
            if (check == false) {
				return false
			}
		}
		return true;
	}
	processBlur(event, action, dataIndex) {
		let validate = true;
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)
			&& this.getDisable() == false) {
        	event.srcElement.focus();
            validate = false;
		}
        if (this.fieldCreation.type == "number") {
			if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] < parseFloat(this.fieldCreation.min)) {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.min;
			}
			if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] > parseFloat(this.fieldCreation.max)) {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.max;
			}
		}
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
			validateStatus:validate,
            fieldName:this.fieldCreation.fieldName
        });
        return validate;
	}
	processCall(data) {

	}
	processPanelCallBack() {
		this.panelCallBack.emit({
			feildName: this.fieldCreation.fieldName
		});
	}

}
