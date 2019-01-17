import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
	templateUrl: './auto-complete.component.html'
})
export class AutoCompleteComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	columnCalculate = "";
	objKeys = Object.keys;
	autoCompleteFilterList = [];
	displayAutoComplete = [];
	setOnList = [];
	maxShowData = 20;
	selectIndex = 0;
	tempValue = [];
	tempValueValidate = {};
	tempFilter = [];
	scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
	displayIndex = [];
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
				this.data[this.fieldCreation.fieldName] = [{
					display:"",
					value:""
				}];
				if (Array.isArray(this.fieldCreation.default) && this.checkDefault()) {
					let newDefault = [];
					for (let defaultDataRow of this.fieldCreation.default) {
						newDefault.push(Object.assign({},defaultDataRow));
					}
					this.data[this.fieldCreation.fieldName] = newDefault;
				} else if(typeof( this.fieldCreation.default) == "object" && this.checkDefault()) {
					this.data[this.fieldCreation.fieldName] = [Object.assign({},this.fieldCreation.default)];
				}
			} else {
				this.data[this.fieldCreation.fieldName] = [{
					display:"",
					value:""
				}];
			}
		}
		if (typeof(this.fieldCreation.maxShowData) != "undefined" && parseInt(this.fieldCreation.maxShowData) > 0) {
			this.maxShowData = parseInt(this.fieldCreation.maxShowData);
		}
		for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
			this.autoCompleteFilterList[dataIndex] = [];
			this.displayAutoComplete[dataIndex] = "autoCompleteHide";
			this.setOnList[dataIndex] = false;
            this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
        }
		// for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
		// 	this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
		// }
	}
	addMultiVal() {
		let dataLastIndex = this.data[this.fieldCreation.fieldName].length;
		this.autoCompleteFilterList[dataLastIndex] = [];
		this.displayAutoComplete[dataLastIndex] = "autoCompleteHide";
		this.setOnList[dataLastIndex] = false;
		this.data[this.fieldCreation.fieldName].push({
			display:"",
			value:""
		});
	}
	deleteMultiVal(dataIndex) {
		if (this.data[this.fieldCreation.fieldName].length > 1) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
		}
	}
	processFocus(event, action, dataIndex) {
		if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly != undefined && this.fieldCreation.readonly == false))
			&& this.option.mode != "view"
			&& !this.getDisableIf()
			&& (this.option.enableRowIndex == undefined || (this.option.enableRowIndex != undefined && (this.option.enableRowIndex[this.rowIndex] == undefined || this.option.enableRowIndex[this.rowIndex] == true)))) {
			this.selectIndex = 0;
			this.filterAutoComplete(dataIndex);
			this.displayAutoComplete[dataIndex] = "autoCompleteShow";
		}
		this.callBack.emit({
			event:event,
			action:action,
			dataIndex:dataIndex,
			fieldName:this.fieldCreation.fieldName
		});
	}
	hideList(dataIndex) {
		if (this.setOnList[dataIndex] == false) {
			this.displayAutoComplete[dataIndex] = "autoCompleteHide";
		}
	}
	setOverList(dataIndex) {
		this.setOnList[dataIndex] = true;
	}
	setOutList(dataIndex) {
		this.setOnList[dataIndex] = false;
	}
	processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
        this.allowTempData = true;
        if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly != undefined && this.fieldCreation.readonly == false))
			&& this.option.mode != "view"
			&& (this.option.enableRowIndex == undefined || (this.option.enableRowIndex != undefined && (this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)))) {
            if (this.fieldCreation.valueList.length > 0) {
                if (typeof(this.data[this.fieldCreation.fieldName][dataIndex]) == "undefined" || typeof(this.data[this.fieldCreation.fieldName][dataIndex].display) == "undefined") {
                    this.data[this.fieldCreation.fieldName][dataIndex] = {
                        display: "",
                        value: ""
                    }
                }
                if (this.displayAutoComplete[dataIndex] != "autoCompleteShow") {
                    this.displayAutoComplete[dataIndex] = "autoCompleteShow";
                }
                this.filterAutoComplete(dataIndex);
            }
            if (event.keyCode == 13 && typeof(this.autoCompleteFilterList[dataIndex][this.selectIndex]) != "undefined") {
                this.hideList(dataIndex);
            } else if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                    return true;
                } else {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                    return false;
                }
            }
            if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
            	for (let valueListRow of this.fieldCreation.valueList) {
            		if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueListRow.display) {
                        this.data[this.fieldCreation.fieldName][dataIndex].value = valueListRow.value;
            			break;
					} else {
                        this.data[this.fieldCreation.fieldName][dataIndex].value = "";
					}
				}
			}
        }
	}
	processKeyDown(event,action,dataIndex) {
		if (this.allowTempData == true) {
        	this.tempValueValidate = this.data[this.fieldCreation.fieldName][dataIndex].display;
		}
        if (event.keyCode == 38 && this.selectIndex > 0) {
            this.selectIndex--;
        } else if (event.keyCode == 40 && this.selectIndex < (this.autoCompleteFilterList[dataIndex].length-1)) {
            this.selectIndex++;
        }
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
	}
	processCall(data) {
        if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly != undefined && this.fieldCreation.readonly == false))
			&& this.option.mode != "view"
			&& (this.option.enableRowIndex == undefined || (this.option.enableRowIndex != undefined && (this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)))) {
            if (data.process == "processList") {
                let dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
                if (this.fieldCreation.valueList.length > 0) {
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                        let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, "gi");
                        for (let i of this.fieldCreation.valueList) {
                            if (String(i.display).match(pattern)) {
                                if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                                    this.autoCompleteFilterList[dataIndex].push(i);
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
                this.displayAutoComplete[dataIndex] = "autoCompleteShow";
            } else if (data.process == "clearFilter") {
                let dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
            }
        }
	}
	assignData(event,dataIndex,data) {
		this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({},data);
		this.tempValue[dataIndex] = Object.assign({},data);
		this.displayAutoComplete[dataIndex] = "autoCompleteHide";
		this.setOnList[dataIndex] = false;
		this.callBack.emit({
			event:event,
			action:'assignData',
			dataIndex:dataIndex,
			fieldName:this.fieldCreation.fieldName,
			assignData:data
		});
	}
	processCallBackKeyPress(event, action, dataIndex) {
		this.callBack.emit({
			event:event,
			action:action,
			dataIndex:dataIndex,
			fieldName:this.fieldCreation.fieldName
		});
		if (event.keyCode == 32 || event.keyCode > 46){
			let key = event.key;
			if (!String(key).match(this.fieldCreation.inputPattern)) {
				return false;
			}
		}
		if (event.keyCode == 13 && typeof(this.autoCompleteFilterList[dataIndex][this.selectIndex]) != "undefined") {
			this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({} , this.autoCompleteFilterList[dataIndex][this.selectIndex]);
			this.selectIndex = 0;
		}

        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true){
            let key = event.key;
            let combineValue;
            if (typeof(this.tempValueValidate) != "undefined") {
            	combineValue = this.tempValueValidate + key;
            } else {
                combineValue = key;
			}
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
		return true;
	}

	processBlur(event, action, dataIndex) {
        let validate = true;
		if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(this.fieldCreation.valuePattern)) {
            event.srcElement.focus();
            validate = false
        }
		if (typeof(this.fieldCreation.fixedValue) != "undefined" && this.fieldCreation.fixedValue == true) {
			if (this.data[this.fieldCreation.fieldName][dataIndex].display != this.tempValue[dataIndex].display) {
				for (let valueList of this.fieldCreation.valueList) {
					if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueList.display) {
						this.tempValue[dataIndex] = Object.assign({},valueList);
						break;
					}
				}
			}
			this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({},this.tempValue[dataIndex]);
		}
        this.hideList(dataIndex);
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            validateStatus:validate,
            fieldName:this.fieldCreation.fieldName
        });
	}

	mouseOverChangeIndex(filterIndex) {
		this.selectIndex = filterIndex;
	}

    filterAutoComplete(dataIndex) {
		this.refineValueList();
        if (((this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0 && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display) || this.fieldCreation.showAllData) && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display) {
            this.autoCompleteFilterList[dataIndex] = [];
            // let filterList = this.autoCompleteFilterList[dataIndex];
            this.tempFilter[dataIndex] = this.data[this.fieldCreation.fieldName][dataIndex].display;
            let resetSelectIndex = false;
            let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, "gi");
            for (let i of this.fieldCreation.valueList) {
                if (String(i.display).match(pattern)) {
                    if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                        this.autoCompleteFilterList[dataIndex].push(i);
                        resetSelectIndex = true;
                    } else {
                        break;
                    }
                }
            }
            if (resetSelectIndex == true) {
                this.selectIndex = 0;
            }
        }
    }
    refineValueList() {
		let newValueList = [];
		for (let listIndex in this.fieldCreation.valueList) {
			if (this.fieldCreation.disableRefined == undefined || this.fieldCreation.disableRefined == false) {
				if (this.fieldCreation.valueList[listIndex].display != "" && this.fieldCreation.valueList[listIndex].value != "") {
					newValueList.push({
						display:this.fieldCreation.valueList[listIndex].display,
						value:this.fieldCreation.valueList[listIndex].value
					});
				}
				if (this.fieldCreation.valueList[listIndex].display == "" && this.fieldCreation.valueList[listIndex].value != "") {
					newValueList.push({
						display:this.fieldCreation.valueList[listIndex].value,
						value:this.fieldCreation.valueList[listIndex].value
					});
				}
				if (this.fieldCreation.valueList[listIndex].value == "" && this.fieldCreation.valueList[listIndex].display != "") {
					newValueList.push({
						display:this.fieldCreation.valueList[listIndex].display,
						value:this.fieldCreation.valueList[listIndex].display
					});
				}
			} else {
				newValueList.push({
					display:this.fieldCreation.valueList[listIndex].display,
					value:this.fieldCreation.valueList[listIndex].value
				});
			}
		}
		this.fieldCreation.valueList = newValueList;
    }
    checkDefault() {
		let check = true;
		if (Array.isArray(this.fieldCreation.default)) {
			for (let dataRow of this.fieldCreation.default) {
				if (typeof(dataRow.display) == "undefined" || dataRow.value == "undefined") {
                    check = false;
				}
			}
		} else {
			let dataRow = this.fieldCreation.default;
            if (typeof(dataRow.display) == "undefined" || dataRow.value == "undefined") {
                check = false;
            }
		}
		return check;
	}
}
