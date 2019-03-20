import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicTabComponent} from "../../dynamic/component/dynamic-tab/dynamic-tab.component";
import {DynamicFormComponent} from '../../dynamic/component/dynamic-form/dynamic-form.component';
import {isArray, isNumber} from 'util';

@Component({
	selector: 'app-p2-ui-editor',
	templateUrl: './p2-ui-editor.component.html',
	styleUrls: ['./p2-ui-editor.component.css'],
})

export class P2UiEditorComponent implements OnInit {
	@ViewChild('tabRef') tabRef: DynamicTabComponent;
	@ViewChild('formEditRef') formEditVC: DynamicFormComponent;
	@ViewChild('componentEditRef') componentEditVC: DynamicFormComponent;
	@ViewChild('containerEditRef') containerEditVC: DynamicFormComponent;
	@ViewChild('exampleRef') exampleVC: DynamicFormComponent;
	importData = {
		data: "[{\"a\":\"1\",\"b\":\"2\",\"c\":\"3\"},{\"d\":\"4\",\"e\":\"5\",\"f\":\"6\"}]"
	};
    exportData = {
		data: ""
	};
	formCreation = {
		form: {
			option: {
				mode: "edit",
				customClass: "hoverField",
				labelAlign: "left"
			},
			containerList: []
		},
		data:[]
	};
	formPropertiesForm = {
		form: {
			option: {
				mode: "edit",
				className: "defaultDynamicForm",
				labelAlign: "top"
			},
			containerList: [
				{
					containerName: "container1",
					columnSpan: "1/1",
					fieldList: [
						{
							fieldName: "formId",
							type: "textBox",
							label: "Form ID",
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: ["defaultDynamicForm"],
						},
						{
							fieldName: "mode",
							type: "selectBox",
							label: "Mode",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Add",
									value: "add"
								},
								{
									display: "Edit",
									value: "edit"
								},
								{
									display: "View",
									value: "view"
								}
							],
							default: ["view"]
						},
						{
							fieldName: "displayMode",
							type: "selectBox",
							label: "Display Mode",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Form",
									value: "form"
								},
								{
									display: "Table",
									value: "table"
								}
							],
							default: ["top"]
						},
						{
							fieldName: "customClass",
							type: "textBox",
							label: "Custom Class",
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 2,
							multiValue: false,
							default: ["defaultDynamicForm"],
						},{
							fieldName: "labelAlign",
							type: "selectBox",
							label: "Label Align",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Top",
									value: "top"
								},
								{
									display: "Left",
									value: "left"
								}
							],
							default: ["top"]
						},{
							fieldName: "multiForm",
							type: "selectBox",
							label: "Multi Form",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Yes",
									value: true
								},
								{
									display: "No",
									value: false
								}
							],
							default: ["No"]
						},{
							fieldName: "frame",
							type: "selectBox",
							label: "Frame",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Yes",
									value: true
								},
								{
									display: "No",
									value: false
								}
							],
							default: ["No"]
						},{
							fieldName: "frameName",
							type: "textBox",
							label: "Frame Name",
							columnPerLine: 1,
							multiValue: true,
							default: ["No"]
						},{
							fieldName: "addRow",
							type: "selectBox",
							label: "Add Row",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Yes",
									value: true
								},
								{
									display: "No",
									value: false
								}
							],
							default: ["No"]
						},{
							fieldName: "deleteRow",
							type: "selectBox",
							label: "Delete Row",
							columnPerLine: 2,
							multiValue: false,
							valueList: [
								{
									display: "Yes",
									value: true
								},
								{
									display: "No",
									value: false
								}
							],
							default: ["No"]
						},{
							fieldName: "addRowText",
							type: "textBox",
							label: "Add Row Text",
							columnPerLine: 1,
							multiValue: false,
							default: ["Add New"]
						},
					]
				}
			]
		},
		data:[{
			formId: ["dynamicFormExample"],
			mode: ["edit"],
			customClass: ["defaultDynamicForm"],
			displayMode: ['form'],
			labelAlign: ["top"],
			multiForm: [false],
			frame: [false],
			frameName: [""],
			addRow: [false],
			addRowText: ["Add New"],
			deleteRow: [false],
			// disableList: [""],
		}]
	};
	containerPropertiesForm = {
		form: {
			option: {
				mode: "edit",
				className: "defaultDynamicForm",
				labelAlign: "top"
			},
			containerList: [
				{
					containerName: "container1",
					columnSpan: "1/1",
					fieldList: [
						{
							fieldName: "containerName",
							type: "textBox",
							label: "Container Name",
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "customClass",
							type: "textBox",
							label: "Custom Class",
							inputPattern: /[a-zA-Z0-9]/,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "columnSize",
							type: "textBox",
							label: "Column Size",
							inputPattern: /[0-9]/,
							valuePattern: /.*/,
							columnPerLine: 2,
							multiValue: false,
							default: ["1"],
						},
						{
							fieldName: "columnSizeOf",
							type: "textBox",
							label: "Of",
							inputPattern: /[0-9]/,
							valuePattern: /.*/,
							columnPerLine: 2,
							multiValue: false,
							default: ["1"],
						}
					]
				}
			]
		},
		data:[{
			containerName:[""],
			customClass:[""],
			columnSize:["1"],
			columnSizeOf:["1"],
		}]
	};
	componentPropertiesForm = {
		form: {
			option: {
				mode: "edit",
				className: "defaultDynamicForm",
				labelAlign: "top"
			},
			containerList: [
				{
					containerName: "container1",
					columnSpan: "1/1",
					fieldList: [
						{
							fieldName: "fieldName",
							type: "textBox",
							label: "Field Name",
							inputPattern: /[a-zA-Z0-9]/,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "label",
							type: "textBox",
							label: "Display Label",
							inputPattern: /./,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "type",
							type: "selectBox",
							label: "Input Type",
							columnPerLine: 1,
							multiValue: false,
							valueList: [{
									display: "Number",
									value:"number"
								},{
									display: "Text Box",
									value:"textBox"
								},{
									display: "Text Area",
									value:"textArea"
								},{
									display: "Label",
									value:"label"

								},{
									display: "Check Box",
									value:"checkBox"
								},{
									display: "Select Box",
									value:"selectBox"
								},{
									display: "Hidden",
									value:"hidden"
								},{
									display: "File Upload",
									value:"fileUpload"
								},{
									display: "Image",
									value:"image"

								},{
									display: "Auto Complete",
									value:"autoComplete"
								},{
									display: "Button",
									value:"button"
								},{
									display: "Button Icon",
									value:"buttonIcon"
								},{
									display: "Swapping Box",
									value:"swappingBox"
								},{
									display: "Map Value",
									value:"mapValue"
								},{
									display: "QRCode",
									value:"qrCode"
								},{
									display: "Radio",
									value:"radio"
								},{
									display: "Date",
									value:"date"
								}],
							default: ["textBox"]
						},
						{
							fieldName: "inputPattern",
							type: "textBox",
							label: "Input Pattern",
							inputPattern: /./,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "valuePattern",
							type: "textBox",
							label: "Value Pattern",
							inputPattern: /./,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "validateWhileKeyPress",
							type: "selectBox",
							label: "Validate On Keypress",
							columnPerLine: 1,
							multiValue: false,
							valueList: [{
								display: "Yes",
								value:true
							},{
								display: "No",
								value:false
							}],
							default: [false]
						},
						{
							fieldName: "columnPerLine",
							type: "selectBox",
							label: "Column Per Line",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "1",
								value:"1"
							},{
								display: "2",
								value:"2"
							},{
								display: "3",
								value:"3"
							},{
								display: "4",
								value:"4"
							}],
							default: ["1"]
						},
						{
							fieldName: "smallButton",
							type: "selectBox",
							label: "Small Button",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "Yes",
								value:true
							},{
								display: "No",
								value:false
							}],
							default: [false]
						},
						{
							fieldName: "labelWidth",
							type: "textBox",
							label: "Label Width",
							inputPattern: /^[0-9]$/,
							valuePattern: /^\d*$/,
							columnPerLine: 1,
							multiValue: false,
							default: ["120"],
						},
						{
							fieldName: "note",
							type: "textBox",
							label: "Note",
							inputPattern: /./,
							valuePattern: /^.*$/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
						{
							fieldName: "multiValue",
							type: "selectBox",
							label: "Value Type",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "Single",
								value:false
							},{
								display: "Multi",
								value:true
							}],
							default: [true]
						},
						{
							fieldName: "require",
							type: "selectBox",
							label: "Require",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
                                display: "Yes",
                                value:true
                            },{
								display: "No",
								value:false
							}],
							default: [false]
						},
						{
							fieldName: "readonly",
							type: "selectBox",
							label: "Read Only",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "Yes",
								value:true
							},{
								display: "No",
								value:false
							}],
							default: [false]
						},
						{
							fieldName: "fixedValue",
							type: "selectBox",
							label: "Fixed Value",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "Yes",
								value:false
							},{
								display: "No",
								value:true
							}],
							default: [true]
						},
						{
							fieldName: "showSelectAll",
							type: "selectBox",
							label: "Select All",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "Yes",
								value:true
							},{
								display: "No",
								value:false
							}],
							default: [true]
						},
						{
							fieldName: "displaySingleLine",
							type: "selectBox",
							label: "Single Line",
							columnPerLine: 2,
							multiValue: false,
							valueList: [{
								display: "Yes",
								value:false
							},{
								display: "No",
								value:true
							}],
							default: [true]
						},
                        {
                            fieldName: "valueList",
                            type: "mapValue",
                            label: "Display Value",
                            inputPattern: /./,
                            valuePattern: /.*/,
                            columnPerLine: 1,
                            multiValue: false,
                            default: [""],
                        },
						{
							fieldName: "maxLength",
							type: "number",
							label: "Max Length",
							inputPattern: /^[0-9]$/,
							valuePattern: /^\d*$/,
							columnPerLine: 1,
							multiValue: false,
							default: ["120"],
						},
						{
							fieldName: "min",
							type: "number",
							label: "Min",
							inputPattern: /^[0-9]$/,
							valuePattern: /^\d*$/,
							columnPerLine: 2,
							multiValue: false,
							default: ["1"],
						},
						{
							fieldName: "max",
							type: "number",
							label: "Max",
							inputPattern: /^[0-9]$/,
							valuePattern: /^\d*$/,
							columnPerLine: 2,
							multiValue: false,
							default: ["999"],
						},
						{
							fieldName: "default",
							type: "textBox",
							label: "Default",
							inputPattern: /./,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: [""],
						},
					]
				}
			]
		},
		data:[{
			fieldName:[""],
			type:["textBox"],
			label:[""],
			inputPattern:[""],
			valuePattern:[""],
			columnPerLine:["1"],
			smallButton:[false],
			validateWhileKeyPress:[false],
			labelWidth:["120"],
			note:[""],
			customClass: [""],
			multiValue:[false],
			default:[""],
			defaultSelect:[""],
			fixedValue: [true],
			readonly: [false],
			require: [false],
			showSelectAll: [true],
			valueList: [{
				display:"",
				value:""
			}],
			maxLength: [255],
			min:[1],
			max:[999],
			displaySingleLine: [true],
		}]
	};
	propertiesTab = {
		option:{},
		tabList:["Form","Container","Component"]
	};
	defaultTypeField = {
		columnPerLine: "selectBox",
		smallButton: "selectBox",
		default: "textBox",
		displaySingleLine: "selectBox", //checkBox
		fieldName: "textBox",
		fixedValue: "selectBox", //AutoComplete
		validateWhileKeyPress: "selectBox", //AutoComplete
		inputPattern: "textBox",
		label: "textBox",
		labelWidth: "textBox",
		valueList: "mapValue",
		multiValue: "selectBox",
		note: "textBox",
		readonly: "selectBox",
		require: "selectBox",
		showSelectAll: "selectBox",
		type: "selectBox",
		valuePattern: "textBox",
		maxLength: "number",
		min: "number",
		max: "number"
	};
	componentEditFieldList= [
		"columnPerLine",
		"smallButton",
		"default",
		"displaySingleLine",
		"fieldName",
		"fixedValue",
		"inputPattern",
		"label",
		"labelWidth",
		"valueList",
		"multiValue",
		"note",
		"readonly",
		"require",
		"showSelectAll",
		"type",
		"valuePattern",
		"validateWhileKeyPress",
		"maxLength",
		"min",
		"max"
	];
	showFieldByType = {
		label: [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"default"
		],
		textBox: [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"default",
			"inputPattern",
			"valuePattern",
			"validateWhileKeyPress",
			"multiValue",
			"note",
			"readonly",
			"require",
			"maxLength"
		],
		number : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"default",
			"inputPattern",
			"valuePattern",
			"multiValue",
			"note",
			"readonly",
			"require",
			"maxLength",
			"min",
			"max"
		],
		textArea : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",,
			"require",
			"default"
		],
		checkBox : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",,
			"require",
			"default",
			"displaySingleLine",
			"valueList",
			"showSelectAll"
		],
		selectBox : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"multiValue",
			"readonly",
			"require",
			"default",
			"valueList"
		],
		hidden : [
			"fieldName",
			"type",
		],
		fileUpload : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",,
			"require",
			"multiValue",
		],
		image : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",,
			"require",
			"multiValue",
		],
		autoComplete : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",,
			"require",
			"fixedValue",
			"default",
			"inputPattern",
			"valuePattern",
			"multiValue",
			"valueList",
			"maxLength"
		],
		button : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",,
			"require",
			"default",
			"valueList",
			"smallButton",
		],
		buttonIcon : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",
			"require",
			"default",
			"valueList",
		],
		swappingBox : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",
			"require",
			"default",
			"valueList"
		],
		mapValue : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",
			"require",
			"default",
			"valueList"
		],
		qrCode : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",
			"require",
			"default"
		],
		radio : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",
			"default",
			"displaySingleLine",
			"require",
			"valueList"
		],
		date : [
			"fieldName",
			"label",
			"labelWidth",
			"columnPerLine",
			"type",
			"note",
			"readonly",
			"multiValue",
			"require",
			"default",
		],
	};
	selectedContainer = 0;
	selectedFieldIndex = 0;
	selectedFieldName = "";
	tempFieldType = "";
	fieldSelected = false;
	containerSelected = false;
	importFlag = false;
	public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
	constructor() {

	}

	ngOnInit() {
	}
	processGenerate() {
		let continueGenerate = false;
		let json;
		try {
			json = JSON.parse(this.importData.data);
			continueGenerate = true;
		} catch (err) {
			alert("Json format mismatch.");
		}
		if (continueGenerate == true) {
            this.importFlag = true
			let data = {};
			let containerList = [];
			// let disableFieldValue = [];
			for(let containerIndex in json) {
				// if (typeof(this.formCreation.form.containerList) == "undefined") {
				// 	//this.formCreation.form.containerList = [];
				//
				// }
				let container = {
					containerName: "Container"+containerIndex,
					customClass: "",
					columnSpan: "1/1",
					fieldList: []
				};
				for (let fieldIndex in json[containerIndex]) {
					// disableFieldValue.push({
					// 	display:fieldIndex,
					// 	value:fieldIndex,
					// })
					let newFieldSet = {
						fieldName: fieldIndex,
						label: "Label Name "+fieldIndex,
						type:"label",
						columnPerLine: 2,
						labelWidth: 120,
						default: [""]
					};
					container.fieldList.push(newFieldSet);
					data[fieldIndex] = [json[containerIndex][fieldIndex]];
				}
				containerList.push(container);

			}
			// let mapSet = {
			// 	disableList : {
			// 		valueList: disableFieldValue
			// 	}
			// };
			// this.formEditVC.mapSetAttribute(mapSet);
			this.formCreation.form.containerList = containerList;
			this.formCreation.data = [];
			this.formCreation.data.push(data);
		}
	}
	processPanelCallBack(event) {
		console.log(event);
		let componentType = this.exampleVC.getFieldAttribute(event.feildName,"type");
		this.selectedContainer = event.containerIndex;
		this.selectedFieldIndex = event.fieldIndex;
		this.selectedFieldName = event.fieldName;
		this.containerSelected = true;
		if (event.feildName != null) {
			this.fieldSelected = true;
			this.setComponentEditAbleField(event.feildName,componentType);
		} else {
			this.fieldSelected = false;
		}
		this.setContainerEdit(event.containerIndex);
	}

	precessTabCallBack(event) {
		console.log(event)
	}
	setComponentEditAbleField(exFieldName,type) {
		let fieldShowList = this.showFieldByType[type];
		let mapSetChangeType = {}
		let attributeValue = {}

		for (let fieldName of this.componentEditFieldList) {
			let type = "hidden";
			if (fieldShowList.indexOf(fieldName) > -1) {
				type = this.defaultTypeField[fieldName]
			}
			if (type != "hidden") {
				let getValue = this.exampleVC.getFieldAttribute(exFieldName,fieldName);
				attributeValue[fieldName] = this.valueConvertToValue(getValue,fieldName);
			}
			mapSetChangeType[fieldName] = {
				type:type
			}
		}
		this.componentEditVC.mapSetAttribute(mapSetChangeType);
		this.componentEditVC.mapSetValue(attributeValue,0);
		if (this.tempFieldType != type) {
			this.componentEditVC.reRenderForm();
			this.tempFieldType = type;
		}
	}
	processSetField() {
		if (this.fieldSelected) {
			let newFieldName = this.componentEditVC.getDataValue("fieldName",0,0);
			let type = this.componentEditVC.getDataValue("type",0,0);
			this.formCreation.data[0][newFieldName] = this.processAssignValueByType(type);
			let setFieldOption = {};
			let fieldAttributeList = this.showFieldByType[type]
			for (let attribute of fieldAttributeList) {
				let value;
				if (attribute == "valueList") {
					value = this.componentEditVC.getDataValue(attribute,0);
				} else {
					value = this.componentEditVC.getDataValue(attribute,0,0);
				}
				setFieldOption[attribute] = this.valueConvertForForm(value, attribute);
			}
			this.formCreation.form.containerList[this.selectedContainer].fieldList[this.selectedFieldIndex] = setFieldOption;
			if (this.selectedFieldName != newFieldName) {
				delete this.formCreation.data[0][this.selectedFieldName]
				this.selectedFieldName = newFieldName;
			}
			this.exampleVC.reRenderForm();
			this.setComponentEditAbleField(this.selectedFieldName ,type);
		}
	}
	processAssignValueByType(type) {
		if (type == "autoComplete") {
			return [{
				display:"",
				value:""
			}]
		} else {
			return [""];
		}
	}

	private valueConvertForForm(value,fieldType) {
		if (value == "true" || value == "false"){
			return value == "true";
		} else if (fieldType == "inputPattern" || fieldType == "valuePattern") {
			return new RegExp(value);
		}
		return value;
	}
	private valueConvertToValue(value,fieldType) {
		if (fieldType == "inputPattern" || fieldType == "valuePattern") {
			let valueGet = value.toString();
			let returnValue = valueGet.replace(/(^\/|\/$)/g, "");
			return returnValue;
		} else if (fieldType == "valueList") {
			if (value != undefined) {
				return value;
			}
			return [{
				display: "",
				value: ""
			}]
		} else if (!isNumber(value)) {
			let returnData = "";
			if (value != undefined) {
				returnData = String(value);
			}
			return returnData;
		}
		return value;
	}

	processExport() {
	    if (this.importFlag == true) {
            let exportData = Object.assign({},this.formCreation);
            for (let containerRow in exportData.form.containerList) {
                for (let fieldAttrRow in exportData.form.containerList[containerRow].fieldList) {
                    for (let attribute in exportData.form.containerList[containerRow].fieldList[fieldAttrRow]){
                        if (attribute == "inputPattern" || attribute == "valuePattern") {
                            let val = String(exportData.form.containerList[containerRow].fieldList[fieldAttrRow][attribute]);
                            exportData.form.containerList[containerRow].fieldList[fieldAttrRow][attribute] = val;
                        }
                    }
                }
            }
            let exportJson = JSON.stringify(exportData, null, "\t");
            let match = exportJson.match(/"\w*":/gm);
            for (let matchRow of match) {
                let search = matchRow;
                let replace = matchRow.replace(/"/g,"");
                exportJson = exportJson.replace(search,replace);
            }
			let match2 = exportJson.match(/"\/.*\/"/gm);
			if (match2 != null) {
				for (let match2Row of match2) {
					let search = match2Row;
					let replace = match2Row.replace(/(^"|"$)/g,"");
					exportJson = exportJson.replace(search,replace);
				}
			}
			let search = "hoverField";
			let replace = "";
			exportJson = exportJson.replace(search,replace);

            this.exportData.data = exportJson;

        }
	}

	setContainerEdit(containerIndex) {
		if (this.formCreation.form.containerList[containerIndex] != undefined) {
			this.selectedContainer = containerIndex;
			let containerName = this.formCreation.form.containerList[containerIndex].containerName;
			let columnSpan = String(this.formCreation.form.containerList[containerIndex].columnSpan);
			let customClass = this.formCreation.form.containerList[containerIndex].customClass;
			let conSpanSplit = columnSpan.split("/");
			let colSize = conSpanSplit[0];
			let colSizeOf = conSpanSplit[1];
			let mapValue = {
				containerName: containerName,
				customClass: customClass,
				columnSize: colSize,
				columnSizeOf: colSizeOf
			};
			this.containerEditVC.mapSetValue(mapValue,0);
		}
	}
	processSetContainer() {
		if (this.containerSelected) {
			let mapGetValue = {
				containerName: "containerName:string",
				customClass: "customClass:string",
				columnSize: "columnSize:string",
				columnSizeOf: "columnSizeOf:string"
			};
			let getValue = this.containerEditVC.mapGetValue(mapGetValue,0);
			this.formCreation.form.containerList[this.selectedContainer].containerName = getValue.containerName;
			this.formCreation.form.containerList[this.selectedContainer].customClass = getValue.customClass;
			this.formCreation.form.containerList[this.selectedContainer].columnSpan = getValue.columnSize+"/"+getValue.columnSizeOf;
			this.exampleVC.reRenderForm();
		}
	}
	processSetFormOption() {
		let mapGetFormOption = {
			formId:"formId",
			mode:"mode.value",
			customClass:"customClass",
			displayMode:"displayMode.value",
			labelAlign:"labelAlign",
			multiForm:"multiForm.value:bool",
			frame:"frame.value:bool",
			frameName:"frameName",
			addRow:"addRow.value:bool",
			addRowText:"addRowText",
			deleteRow:"deleteRow.value:bool"
		}
		let formOptionData = this.formEditVC.mapGetValue(mapGetFormOption,0);
		console.log(formOptionData);
		this.formCreation.form.option = formOptionData;
		this.exampleVC.reRenderForm();
	}
}

