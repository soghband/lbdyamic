import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";

@Component({
  templateUrl: './swapping-box.component.html',
})
export class SwappingBoxComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	columnCalculate;
	modeDisplay = "";
	objKeys = Object.keys;
    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
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
			this.modeDisplay = "dp2hide"
		} else {
			this.modeDisplay = "";
		}
	}
	processCall(data) {

	}
	processPanelCallBack() {
		this.panelCallBack.emit({
			feildName: this.fieldCreation.fieldName
		});
	}

    checkDestData(valueList) {
		let checkValue = valueList.value;
        let foundFlag = false;
        for (let dataRow of this.data[this.fieldCreation.fieldName]) {
            if (dataRow.value == checkValue) {
                foundFlag = true;
                break;
            }
        }
		if (foundFlag == true) {
			return false;
		}
		return true;
    }

    transferData(valueIndex) {
        if (this.fieldCreation.readonly != true) {
            let value = this.fieldCreation.valueList[valueIndex].value;
            let foundFlag = false;
            for (let dataRow of this.data[this.fieldCreation.fieldName]) {
                if (dataRow.value == value) {
                    foundFlag = true;
                    break;
                }
            }
            if (foundFlag == false) {
                if (typeof(this.data[this.fieldCreation.fieldName]) == "undefined") {
                    this.data[this.fieldCreation.fieldName] = [];
                }
                this.data[this.fieldCreation.fieldName].push(this.fieldCreation.valueList[valueIndex])
            }
            let valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "add",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            })
        }
    }
    removeData(dataIndex) {
		if (this.fieldCreation.readonly != true) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
			let valueObj = Object.assign([],this.data[this.fieldCreation.fieldName]);
			this.callBack.emit({
				action:"remove",
				valueObj:valueObj,
				fieldName:this.fieldCreation.fieldName
			})
		}
	}
}
