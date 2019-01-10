import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicTabComponent} from "../../dynamic/component/dynamic-tab/dynamic-tab.component";

@Component({
	selector: 'app-p2-ui-editor',
	templateUrl: './p2-ui-editor.component.html',
	styleUrls: ['./p2-ui-editor.component.css'],
})

export class P2UiEditorComponent implements OnInit {
	@ViewChild('tabRef') tabRef: DynamicTabComponent;

	importData = {
		data: "[{\"a\":\"1\",\"b\":\"2\",\"c\":\"3\"},{\"d\":\"4\",\"e\":\"5\",\"f\":\"6\"}]"
	};
	formCreation = {
		form: {
			option: {
				mode: "edit",
				className: "defaultDynamicForm",
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
							fieldName: "mode",
							type: "selectBox",
							label: "Mode",
							columnPerLine: 1,
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
							fieldName: "className",
							type: "textBox",
							label: "Container Name",
							inputPattern: /.*/,
							valuePattern: /.*/,
							columnPerLine: 1,
							multiValue: false,
							default: ["defaultDynamicForm"],
						},{
							fieldName: "labelAlign",
							type: "selectBox",
							label: "Label Align",
							columnPerLine: 1,
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
							default: ["view"]
						}
					]
				}
			]
		},
		data:[{
			mode: ["edit"],
			className: ["defaultDynamicForm"],
			labelAlign: ["top"]
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
							fieldName: "columnSpan",
							type: "selectBox",
							label: "Column Size",
							columnPerLine: 1,
							multiValue: false,
							valueList: [
								{
									display: "1/1",
									value: "1/1"
								},
								{
									display: "1/2",
									value: "1/2"
								},
								{
									display: "1/3",
									value: "1/3"
								},
								{
									display: "1/4",
									value: "1/4"
								},
								{
									display: "1/5",
									value: "1/5"
								},
								{
									display: "1/6",
									value: "1/6"
								},
							],
							default: ["1/1"]
						}
					]
				}
			]
		},
		data:[{
			containerName:[""],
			customClass:[""],
			columnSpan:["1/1"]
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
							fieldName: "columnPerLine",
							type: "selectBox",
							label: "Column Per Line",
							columnPerLine: 1,
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
								value:false
							},{
								display: "No",
								value:true
							}],
							default: [true]
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
								value:false
							},{
								display: "No",
								value:true
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
                            fieldName: "mapValue",
                            type: "mapValue",
                            label: "Display Value",
                            inputPattern: /./,
                            valuePattern: /.*/,
                            columnPerLine: 1,
                            multiValue: false,
                            default: [""],
                        },
						{
							fieldName: "defaultText",
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
			labelWidth:["120"],
			note:[""],
			customClass: [""],
			multiValue:[false],
			defaultText:[""],
			defaultSelect:[""],
			fixedValue: [true],
			readonly: [true],
			require: [false],
			showSelectAll: [true],
            mapValue: [{
				display:"",
				value:""
			}],
			displaySingleLine: [true],
		}]
	};
	propertiesTab = {
		option:{},
		tabList:["Form","Container","Component"]
	};
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
			let data = {};
			let containerList = [];
			for(let containerIndex in json) {
				// if (typeof(this.formCreation.form.containerList) == "undefined") {
				// 	//this.formCreation.form.containerList = [];
				//
				// }
				let container = {
					containerName: "Container"+containerIndex,
					columnSpan: "1/1",
					fieldList: []
				};
				for (let fieldIndex in json[containerIndex]) {
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
			this.formCreation.form.containerList = containerList;
			this.formCreation.data.push(data);
		}
	}
	processPanelCallBack(event) {
		console.log(event);
	}

	precessTabCallBack(event) {
		console.log(event)
	}
}
