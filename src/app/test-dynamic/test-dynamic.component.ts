import {Component, OnInit, ViewChild} from '@angular/core';
import {any} from "codelyzer/util/function";
import {ErrorMsgBubbleComponent} from "../dynamic/component/error-msg-bubble/error-msg-bubble.component";
import {DynamicFormComponent} from "../dynamic/component/dynamic-form/dynamic-form.component";
import {Observable} from "rxjs/Observable";
import {DynamicTabComponent} from "../dynamic/component/dynamic-tab/dynamic-tab.component";
import {DynamicPopupComponent} from "../dynamic/component/dynamic-popup/dynamic-popup.component";
import {DynamicTableComponent} from '../dynamic/component/dynamic-table/dynamic-table.component';
import {LockScreenServiceP2} from '../dynamic';

@Component({
	selector: 'app-test-dynamic',
	templateUrl: './test-dynamic.component.html',
	// styleUrls: ['./test-dynamic.component.css'],
})
export class TestDynamicComponent implements OnInit {
	@ViewChild('errorBubble') errorComp : ErrorMsgBubbleComponent;
	@ViewChild('dynamicForm') dynamicForm : DynamicFormComponent;
	@ViewChild('dynamicFormTable') dynamicFormTable : DynamicFormComponent;
	@ViewChild('tabListRefId') tabListRef : DynamicTabComponent;
	@ViewChild('p2popup') popupRef : DynamicPopupComponent;
	@ViewChild('tableId') tableRef : DynamicTableComponent;

	tabCreation = {
		option: {
		},
		tabList: ["Form Table","Form","Table","Popup","Error","Lock Screen"]
	};
	formCreation = {
		form: {
			option: {
				mode: "edit",
				className: "defaultDynamicForm",
				labelAlign: "left"
			},
			containerList : [
				{
					containerName: "container1",
					customClass: "testCustomContainer",
					columnSpan: "1/3",
					fieldList: [
						{
							fieldName: "testTextBox",
							type: "textBox",
							label: "Test TextBox",
							inputPattern: /[0-1]/,
							valuePattern: /^100$/,
							columnPerLine: 1,
							labelWidth: "150",
							multiValue: true,
							require: true,
                            readonly: false,
							default: [""],
						},
						{
							fieldName: "testAutoComplete",
							type: "autoComplete",
							label: "Test Auto Complete",
							inputPattern: /.*/,
                            valuePattern: /.{3}.*/,
							columnPerLine: 1,
							valueList: [
								{
									display:"aaaaa",
									value:"AAA"
								},
								{
									display:"aaaab",
									value:"BBB"
								},
								{
									display:"aaaac",
									value:"CCC"
								},
								{
									display:"aaaadd",
									value:"DDD"
								},
								{
									display:"aaaaee",
									value:"EEE"
								}
							],
							labelWidth: "150",
							multiValue: true,
							default: [""],
						},
						{
							fieldName: "testImage",
							type: "image",
							label: "Test Images",
							columnPerLine: 1,
							multiValue: true
						},
						{
							fieldName: "testUpload",
							type: "fileUpload",
							label: "Test Upload",
							columnPerLine: 1,
							multiValue: true,
							note:"CSV abc xyz"
						},
                        {
                            fieldName: "testMapValue",
                            type: "mapValue",
                            label: "Test Map Value",
                            columnPerLine: 1,
							default : [
                                {
                                    display: "Popular",
                                    value: "pop"
                                }, {
                                    display: "Not Popular",
                                    value: "notPop"
                                }
							]
                        },
                        {
                            fieldName: "testQrCode",
                            type: "qrCode",
                            label: "test QR Code Reader",
                            columnPerLine: 1,
                            multiValue: true
                        }
					]
				},
				{
					containerName: "Test Container",
					columnSpan: "2/3",
					fieldList : [
						{
							fieldName: "testTextArea",
							type: "textArea",
							label: "Test TextArea",
							inputPattern: /.*/,
							validateInput: /.*/,
							columnPerLine: 2,
							labelWidth: "150",
							default: [""]
						},
						{
							fieldName: "testLabel",
							type: "label",
							label: "Test Label",
							columnPerLine: 2,
							labelWidth: 120,
							default: [""]
						},
						{
							fieldName: "testCheckBox",
							type: "checkBox",
							label: "Test Label",
							valueList: [
								{
									display:"Popular",
									value:"pop"
								}
								,{
									display:"Not Popular",
									value:"notPop"
								}
							],
							columnPerLine: 2,
							showSelectAll: true,
							displaySingleLine: false,
							// default: {
							// 	pop: true,
							// 	notPop: true
							// }
						},
						{
							fieldName: "testRadio",
							type: "radio",
							label: "Test Radio",
							valueList: [
								{
									display:"Display1",
									value:"d1"
								}
								,{
									display:"Display2",
									value:"d2"
								},
								{
									display:"Display3",
									value:"d3"
								}
								,{
									display:"Display4",
									value:"d4"
								}
							],
							columnPerLine: 2,
							showSelectAll: true,
							displaySingleLine: true,
							// default: {
							// 	pop: true,
							// 	notPop: true
							// }
						},
						{
							fieldName: "testSelectBox",
							type: "selectBox",
							label: "Test SelectBox",
							columnPerLine: 2,
							valueType: "multi/single",
							require: true,
							readonly: true,
							valueList: [
								{
									display: "---Please Select---",
									value: ""
								},
								{
									display: "Active",
									value: "active"
								},
								{
									display: "Inactive aaaaaaa a a a a aaaaaaaaaaaaaaa a aaaaaaaaaaaaaaaa aaaaaaaa",
									value: "inactive"
								},
							],
							default: ["inactive"]
						},
						{
							fieldName: "testTextBox2",
							type: "textBox",
							label: "Test TextBox",
							inputPattern: /.*/,
							validateInput: /.*/,
							columnPerLine: 1,
							default: ["test Default2"]
						},
						{
							fieldName: "testTextArea2",
							type: "textArea",
							label: "Test TextArea 2",
							inputPattern: /.*/,
							validateInput: /.*/,
							columnPerLine: 2,
							default: ["test Default3"]
						},
						{
							fieldName: "testButton",
							type: "button",
							label: "Test Button 2",
							columnPerLine: 2,
							valueList: [{
								display: "<span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> <span>Template</span>",
								value: "test1"
							}],
						},
						{
							fieldName: "testCustomStyle",
							type: "textBox",
							label: "Test TextBox",
							customClass: "testCustomClass",
							inputPattern: /[a-zA-Z]/,
							validateInput: /.*/,
							columnPerLine: 1,
							labelWidth: "150",
							multiValue: true,
							default: ["Custom Style Default"],
						},{
							fieldName: "testSwapping",
							type: "swappingBox",
							label: "Test swapping box",
							columnPerLine: 1,
							labelWidth: 150,
							readonly: false,
							valueList: [
								{
									display: "aaa",
									value: "aa"
								},
								{
									display: "bbb",
									value: "bb"
								},
								{
									display: "ccc",
									value: "cc"
								},
								{
									display: "ddd",
									value: "dd"
								},
								{
									display: "eee",
									value: "ee"
								},
								{
									display: "fff",
									value: "ff"
								},
								{
									display: "ggg",
									value: "gg"
								},
								{
									display: "fff",
									value: "ff"
								},
							],
							default: [{
								display: "fff",
								value: "ff"
							}]
						},
                        {
                            fieldName: "testDate",
                            type: "date",
                            label: "Test TextBox",
                            columnPerLine: 1,
                            labelWidth: "150",
                            multiValue: true,
                            require: true,
                            readonly: false,
                            default: ["2018-05-12"],
                        },
					]
				},
			],
		},
		data:[
			{
				testTextBox: [""],
				testAutoComplete: [
					{
						display:"1",
						value:"ID1"
					}
				],
				testTextBox2: ["testInput1Val2"],
				testTextArea: ["testAreaInput1Val"],
				testTextArea2: ["testAreaInput1Val2"],
				testLabel: ["testLabelVal"],
				testCheckBox: {
					pop:true
				},
				testRadio : ["d1","d2"],
				testSelectBox:[
					"inactive",
					"active"
				],
				testImage: {
					currentFile: [""],
					selectFile: any,
				},
				testUpload: {
					currentFile: [],
					selectFile: any,
				},
				testButton: [""],
				testCustomStyle: ["testCustomStyle"],
				testSwapping: [
					{
						display:"fff",
						value:"ff"
					}
				],
                testMapValue: [
					{
						display: "testD1",
						value: "testV1"
					}
				],
                testQrCode: [],
                testDate: [""]
			}
		]
	};
    formCreationTable = {
        form: {
            option: {
            	formId: "table01",
            	displayMode: "table",
                mode: "edit",
                className: "defaultDynamicForm",
                labelAlign: "left",
				enableRowIndex: [true]
            },
            containerList : [
                {
                    containerName: "container1",
                    customClass: "testCustomContainer",
                    columnSpan: "1/1",
                    fieldList: [
                        {
                            fieldName: "testTextBox",
                            type: "textBox",
                            label: "Test TextBox",
                            inputPattern: /[0-1]/,
                            valuePattern: /^100$/,
                            multiValue: true,
                            require: true,
                            readonly: false,
                            default: [""],
                        },
                        {
                            fieldName: "testCheckBox",
                            type: "checkBox",
                            label: "Test Label",
							width:"150px",
                            valueList: [
                                {
                                    display:"Popular",
                                    value:"pop"
                                }
                                ,{
                                    display:"Not Popular",
                                    value:"notPop"
                                }
                                ,{
                                    display:"a",
                                    value:"a"
                                }
                                ,{
                                    display:"b",
                                    value:"b"
                                }
                                ,{
                                    display:"c",
                                    value:"c"
                                }
                                ,{
                                    display:"d",
                                    value:"d"
                                }
                                ,{
                                    display:"e",
                                    value:"e"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                                ,{
                                    display:"f",
                                    value:"f"
                                }
                            ],
                            columnPerLine: 2,
                            showSelectAll: true,
                            displaySingleLine: true,
                            // default: {
                            // 	pop: true,
                            // 	notPop: true
                            // }
                        },
                        {
                            fieldName: "testAutoComplete",
                            type: "autoComplete",
                            label: "Test Auto Complete",
                            inputPattern: /.*/,
                            valuePattern: /.{3}.*/,
                            valueList: [
                                {
                                    display:"aaaaa",
                                    value:"AAA"
                                },
                                {
                                    display:"aaaab",
                                    value:"BBB"
                                },
                                {
                                    display:"aaaac",
                                    value:"CCC"
                                },
                                {
                                    display:"aaaadd",
                                    value:"DDD"
                                },
                                {
                                    display:"aaaaee",
                                    value:"EEE"
                                }
                            ],
                            multiValue: true,
                            default: [""],
                        },
                        {
                            fieldName: "testImage",
                            type: "image",
                            label: "Test Images",
                            multiValue: true,
							width: "200px"
                        },
                        {
                            fieldName: "testUpload",
                            type: "fileUpload",
                            label: "Test Upload",
                            multiValue: true,
                            note:"CSV abc xyz",
                            width: "200px"
                        },
                        {
                            fieldName: "testMapValue",
                            type: "mapValue",
                            label: "Test Map Value",
                            default : [
                                {
                                    display: "Popular",
                                    value: "pop"
                                }, {
                                    display: "Not Popular",
                                    value: "notPop"
                                }
                            ]
                        },
                        {
                            fieldName: "testQrCode",
                            type: "qrCode",
                            label: "test QR Code Reader",
                            multiValue: true
                        },
                        {
                            fieldName: "testTextArea",
                            type: "textArea",
                            label: "Test TextArea",
                            inputPattern: /.*/,
                            validateInput: /.*/,
                            default: [""]
                        },
                        {
                            fieldName: "testLabel",
                            type: "label",
                            label: "Test Label",
                            default: [""]
                        }
                    ]
                },
            ],
        },
        data:[
            {
                testTextBox: [""],
                testAutoComplete: [
                    {
                        display:"1",
                        value:"ID1"
                    }
                ],
                testTextBox2: ["testInput1Val2"],
                testTextArea: ["testAreaInput1Val"],
                testTextArea2: ["testAreaInput1Val2"],
                testLabel: ["testLabelVal"],
                testCheckBox: {
                    pop:true
                },
                testRadio : ["d1","d2"],
                testSelectBox:[
                    "inactive",
                    "active"
                ],
                testImage: {
                    currentFile: [""],
                    selectFile: any,
                },
                testUpload: {
                    currentFile: [],
                    selectFile: any,
                },
                testButton: [""],
                testCustomStyle: ["testCustomStyle"],
                testSwapping: [
                    {
                        display:"fff",
                        value:"ff"
                    }
                ],
                testMapValue: [
                    {
                        display: "testD1",
                        value: "testV1"
                    }
                ],
                testQrCode: [],
                testDate: [""]
            },{
                testTextBox: [""],
                testAutoComplete: [
                    {
                        display:"1",
                        value:"ID1"
                    }
                ],
                testTextBox2: ["testInput1Val2"],
                testTextArea: ["testAreaInput1Val"],
                testTextArea2: ["testAreaInput1Val2"],
                testLabel: ["testLabelVal"],
                testCheckBox: {
                    pop:true
                },
                testRadio : ["d1","d2"],
                testSelectBox:[
                    "inactive",
                    "active"
                ],
                testImage: {
                    currentFile: [""],
                    selectFile: any,
                },
                testUpload: {
                    currentFile: [],
                    selectFile: any,
                },
                testButton: [""],
                testCustomStyle: ["testCustomStyle"],
                testSwapping: [
                    {
                        display:"fff",
                        value:"ff"
                    }
                ],
                testMapValue: [
                    {
                        display: "testD1",
                        value: "testV1"
                    }
                ],
                testQrCode: [],
                testDate: [""]
            }
        ]
    };
	tableCreation = {
		header: "IMIE List",
		tableId: "imieTable",
		primaryField : ["imei"],
        showSelect : "checkBox",
		ignoreSelect : "check:Y",
		showEdit : true,
		showDelete : true,
		showPaging: true,
		sorting: true,
		customClass: "testCustomClassTable",
		customClassPaging: "testCustomPaging",
		fieldList:[
			{
				fieldName:["imei"],
				fieldNameDb:["imei"],
				displayHeader: "IMIE",
				width: "200px",
				align: "left",
				action: false,
				sorting: false
			},
			{
				fieldName:["brandName"],
				fieldNameDb:["brand_name"],
				displayHeader: "Brand Name",
				width: "200px",
				align: "left",
				action: true,
				relateField: ["brandId"],
			},
			{
				fieldName:["modelName"],
				fieldNameDb:["model_name"],
				displayHeader: "Model Name",
				width: "200px",
				align: "left",
				action: true,
			},
			{
				fieldName:["technicalName1","technicalName2"],
				fieldNameDb:["technical_name1","technical_name2"],
				displayHeader: "Technical Name 1-2-3-4",
				multiType:"join",
				joinChar:",",
				width: "200px",
				align: "left",
				action: false,
				headerSpan: 2
			},
			{
				fieldName:["technicalName3","technicalName4"],
				fieldNameDb:["technical_name3","technical_name4"],
				displayHeader: "Technical Name 3-4",
				multiType:"join",
				joinChar:",",
				width: "200px",
				align: "left",
				action: false,
				hideHeader: true
			},
			{
				fieldName:["createDate","updateDate"],
				fieldNameDb:["create_date","update_date"],
				multiType:"oneFromLast",
				displayHeader: "Last Update",
				width: "200px",
				align: "left",
				action: false,
			},
		],
		data: {
			"data":    [
				{
					"imei": "12345679",
					"brandId": 265,
					"brandName": "APPLE MOBILE",
					"modelId": 1,
					"modelName": "Iphone5",
					"technicalName1": "Iphone5",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "a",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null,
					"check": true
				},
				{
					"imei": "12345678",
					"brandId": 265,
					"brandName": "APPLE MOBILE",
					"modelId": 1,
					"modelName": "Iphone5",
					"technicalName1": "Iphone5",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 7, 2018 12:00:00 AM",
					"createBy": "vutthipp",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null,
                    "check": false
				},
				{
					"imei": "11111111",
					"brandId": 6800,
					"brandName": "test_by_som_1",
					"modelId": 3,
					"modelName": "Som_Test_1",
					"technicalName1": "Som_Test_1",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "mingks49",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null,
                    "check": "Y"
				},
				{
					"imei": "22222222",
					"brandId": 6800,
					"brandName": "test_by_som_1",
					"modelId": 4,
					"modelName": "Som_Test_2",
					"technicalName1": "Som_Test_2",
					"technicalName2": "333",
					"technicalName3": "222",
					"technicalName4": "111",
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "mingks49",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null
				},
				{
					"imei": "33333333",
					"brandId": 6801,
					"brandName": "test_by_som_2",
					"modelId": 5,
					"modelName": "Som_Test_3",
					"technicalName1": "Som_Test_3",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "mingks49",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null
				},
				{
					"imei": "44444444",
					"brandId": 6801,
					"brandName": "test_by_som_2",
					"modelId": 6,
					"modelName": "Som_Test_4",
					"technicalName1": "Som_Test_4",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "mingks49",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null
				},
				{
					"imei": "55555555",
					"brandId": 6802,
					"brandName": "test_by_som_3",
					"modelId": 7,
					"modelName": "Som_Test_5",
					"technicalName1": "Som_Test_5",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "mingks49",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null
				},
				{
					"imei": "66666666",
					"brandId": 6802,
					"brandName": "test_by_som_3",
					"modelId": 8,
					"modelName": "Som_Test_6",
					"technicalName1": "Som_Test_6",
					"technicalName2": null,
					"technicalName3": null,
					"technicalName4": null,
					"createDate": "Jun 12, 2018 12:00:00 AM",
					"createBy": "mingks49",
					"updateDate": null,
					"updateBy": null,
					"createDateToString": null,
					"updateDateToString": null
				}
			],
			"statusCode": "000",
			"statusMessage": "Success",
			"totalRecord": 8,
			"pageRowNum": 2
		}
	};
	errorIndex = 0;
	constructor(private lockScreen : LockScreenServiceP2) {
	}

	ngOnInit() {
		this.dynamicForm.onFormReady(1).subscribe((status) => {
			console.log(status);
		})
	}
	checkData() {
		console.log(this.formCreation.data);
	}
	processCallBack(data) {
		console.log(data);
		if (data.action == 'page' && data.pageNumber == 2) {
			let p2Data = {
                "data": [
                    {
                        "imei": "7777777777",
                        "brandId": 265,
                        "brandName": "APPLE MOBILE",
                        "modelId": 1,
                        "modelName": "Iphone5",
                        "technicalName1": "Iphone5",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "a",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "88888888888",
                        "brandId": 265,
                        "brandName": "APPLE MOBILE",
                        "modelId": 1,
                        "modelName": "Iphone5",
                        "technicalName1": "Iphone5",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 7, 2018 12:00:00 AM",
                        "createBy": "vutthipp",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "9999999999",
                        "brandId": 6800,
                        "brandName": "test_by_som_1",
                        "modelId": 3,
                        "modelName": "Som_Test_1",
                        "technicalName1": "Som_Test_1",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "1010101010",
                        "brandId": 6800,
                        "brandName": "test_by_som_1",
                        "modelId": 4,
                        "modelName": "Som_Test_2",
                        "technicalName1": "Som_Test_2",
                        "technicalName2": "333",
                        "technicalName3": "222",
                        "technicalName4": "111",
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "10111111111",
                        "brandId": 6801,
                        "brandName": "test_by_som_2",
                        "modelId": 5,
                        "modelName": "Som_Test_3",
                        "technicalName1": "Som_Test_3",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "1022222222222",
                        "brandId": 6801,
                        "brandName": "test_by_som_2",
                        "modelId": 6,
                        "modelName": "Som_Test_4",
                        "technicalName1": "Som_Test_4",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "10333333333",
                        "brandId": 6802,
                        "brandName": "test_by_som_3",
                        "modelId": 7,
                        "modelName": "Som_Test_5",
                        "technicalName1": "Som_Test_5",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "1044444444",
                        "brandId": 6802,
                        "brandName": "test_by_som_3",
                        "modelId": 8,
                        "modelName": "Som_Test_6",
                        "technicalName1": "Som_Test_6",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    }
                ],
                "statusCode": "000",
                "statusMessage": "Success",
                "totalRecord": 8,
                "pageRowNum": 2
            }
            this.tableCreation.data = p2Data;
		} else if (data.action == 'page' && data.pageNumber == 1) {
			let p1Data = {
                "data":    [
                    {
                        "imei": "12345679",
                        "brandId": 265,
                        "brandName": "APPLE MOBILE",
                        "modelId": 1,
                        "modelName": "Iphone5",
                        "technicalName1": "Iphone5",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "a",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null,
                        "check": true
                    },
                    {
                        "imei": "12345678",
                        "brandId": 265,
                        "brandName": "APPLE MOBILE",
                        "modelId": 1,
                        "modelName": "Iphone5",
                        "technicalName1": "Iphone5",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 7, 2018 12:00:00 AM",
                        "createBy": "vutthipp",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null,
                        "check": false
                    },
                    {
                        "imei": "11111111",
                        "brandId": 6800,
                        "brandName": "test_by_som_1",
                        "modelId": 3,
                        "modelName": "Som_Test_1",
                        "technicalName1": "Som_Test_1",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null,
                        "check": "Y"
                    },
                    {
                        "imei": "22222222",
                        "brandId": 6800,
                        "brandName": "test_by_som_1",
                        "modelId": 4,
                        "modelName": "Som_Test_2",
                        "technicalName1": "Som_Test_2",
                        "technicalName2": "333",
                        "technicalName3": "222",
                        "technicalName4": "111",
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "33333333",
                        "brandId": 6801,
                        "brandName": "test_by_som_2",
                        "modelId": 5,
                        "modelName": "Som_Test_3",
                        "technicalName1": "Som_Test_3",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "44444444",
                        "brandId": 6801,
                        "brandName": "test_by_som_2",
                        "modelId": 6,
                        "modelName": "Som_Test_4",
                        "technicalName1": "Som_Test_4",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "55555555",
                        "brandId": 6802,
                        "brandName": "test_by_som_3",
                        "modelId": 7,
                        "modelName": "Som_Test_5",
                        "technicalName1": "Som_Test_5",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    },
                    {
                        "imei": "66666666",
                        "brandId": 6802,
                        "brandName": "test_by_som_3",
                        "modelId": 8,
                        "modelName": "Som_Test_6",
                        "technicalName1": "Som_Test_6",
                        "technicalName2": null,
                        "technicalName3": null,
                        "technicalName4": null,
                        "createDate": "Jun 12, 2018 12:00:00 AM",
                        "createBy": "mingks49",
                        "updateDate": null,
                        "updateBy": null,
                        "createDateToString": null,
                        "updateDateToString": null
                    }
                ],
                "statusCode": "000",
                "statusMessage": "Success",
                "totalRecord": 8,
                "pageRowNum": 2
            };
            this.tableCreation.data = p1Data;
		}
	}
	addError() {
		this.errorIndex ++;
		this.errorComp.addError("test"+this.errorIndex,"testMsg"+this.errorIndex);
	}
	clearError() {
		this.errorComp.clearError();
	}
	testSetAttribute() {
		this.dynamicForm.setFieldAttribute("testAutoComplete","label","Test set attribute success");
	}
	testGetAttribute() {
		let attribute = this.dynamicForm.getFieldAttribute("testTextBox","label");
		console.log(attribute);
	}
	testSetValue() {
		this.dynamicForm.setDataValue("testTextArea2",0,"test assign value");
	}
	testGetValue() {
		let value = this.dynamicForm.getDataValue("testRadio",0);
		console.log(value);
	}
	testGetInput() {
		let input = this.dynamicForm.getDynamicInput("testAutoComplete");
		console.log(input);
		input.processCall(0);
	}
	testLockScreen() {
		this.lockScreen.lockScreen();
		Observable.interval(5000)
			.take(1)
			.subscribe(() => {
				//this.lockScreen.unLockScreen();
			});
		Observable.interval(3000)
			.take(1)
			.subscribe(() => {
				//this.lockScreen.unLockScreen();
			});
	}

	testReRenderField() {
		let fieldType = this.dynamicForm.getFieldAttribute("testSwapping","type");
		if (fieldType == "hidden") {
			this.dynamicForm.setFieldAttribute("testSwapping","type","swappingBox")
		} else {
			this.dynamicForm.setFieldAttribute("testSwapping","type","hidden")
		}
		this.dynamicForm.reRenderField(["testSwapping"]);
	}

	popupError() {
		this.popupRef.set('error','test Error');
	}
	popupInfo() {
		this.popupRef.set('info','test Informations');
	}
	popupSuccess() {
		this.popupRef.set('success','test Success');
	}
	popupWarning() {
		this.popupRef.set('warning','test Warning');
	}
	popupConfirm() {
		this.popupRef.set('confirm','test Confirm');
	}
	popupCallback(event) {
		console.log(event)
	}

	testMapSetAttribute() {
		let setAttribute = {
			testTextBox : {
				type: "textArea",
				label: "test Map Attribute",
				inputPattern: /[0-9]/,
				columnPerLine: 1,
			}
		}
		this.dynamicForm.mapSetAttribute(setAttribute);
		this.dynamicForm.reRenderForm();
	}
	testMapSetValue() {
		let valueSet = {
			testTextBox : "aaaa >> Test Map set",
			testTextArea : "bbbb >> Test Map set",
			testLabel : "cccc >> Test Map set",
			testSelectBox : ["active","inactive"],
		};
		this.dynamicForm.mapSetValue(valueSet,0);
	}
	testMapGetValue() {
		let valueGet = {
			a1:"testTextBox",
			a2:"testTextArea",
			a3:"testSelectBox.display",
			b1:"testAutoComplete",
			b2:"testImage",
			b3:"testUpload",
			b4:"testSwapping.display",
			b5:"testMapValue.display",
			c1:"testCheckBox.all",
			c2:"testCheckBox.display",
			c3:"testCheckBox.value",
			c4:"testCheckBox",
			r1:"testRadio",
			r2:"testRadio.display",
			r3:"testRadio.value",
			d1:"testDate",
		};
		let returnData = this.dynamicForm.mapGetValue(valueGet,0);
		console.log(returnData);
	}

	testGetRequire() {
		let checkRequire = this.dynamicForm.checkRequireField(0);
		console.log(checkRequire);
	}

    getTableCheckList() {
		console.log(this.tableRef.getCheckedList());
    }

    clearTableCheckList() {
		this.tableRef.clearCheckedList();
    }

    testGetValidate() {
        let checkValidate = this.dynamicForm.checkValidateField(0);
        console.log(checkValidate);
	}

    testEnableFormRow() {
		this.dynamicFormTable.enableRow(0);
    }

    testDisableFormRow() {
        this.dynamicFormTable.disableRow(0);
    }

    testAddRow() {
        this.dynamicFormTable.addRow();
    }

    testFormTableGetInput() {
		let input = this.dynamicFormTable.getDynamicInput("testTextBox");
		console.log(input);
	}
}
