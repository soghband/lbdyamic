import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {any} from "codelyzer/util/function";

@Component({
	templateUrl: './image.component.html'
})
export class ImageComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	columnCalculate;
	base64textString = [];
	objKeys = Object.keys;
	modeDisplay = "";
	errorMsg = "";

	constructor() {
		super();
	}

	ngOnInit() {
		console.log(this.base64textString);
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
		this.data[this.fieldCreation.fieldName] = Object.assign({}, {
			currentFile: [],
			selectFile: any,
		})
	}

	handleFileSelect(evt) {
		this.base64textString = [];
		if (typeof(evt.target) != "undefined") {
			this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
			var files = evt.target.files;
			let validate = this.validateFileExtension();
			if (validate == true) {
				for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
					var file = files[fileIndex];
					if (files && file) {
						var reader = new FileReader();
						reader.onload = this._handleReaderLoaded.bind(this);
						reader.readAsBinaryString(file);
					}
				}
			}
		}
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString.push("url(data:image/png;base64," + btoa(binaryString) + ")");
	}

	getNasImageUrl(file) {
		if (file != null && file.length > 0) {
			return "url('" + file + "')";
		}
		return "";
	}

	processCall(data) {

	}

	getType(data) {
		return typeof(data);
	}

	validateFileExtension() {
		this.errorMsg = "";
		if (typeof(this.fieldCreation.fileType) != "undefined") {
			let fileData = this.data[this.fieldCreation.fieldName].selectFile;
			let validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
			let validatePattern = new RegExp(validateExtensionString, "i");
			for (let fileDataIndex = 0;fileDataIndex < fileData.length;fileDataIndex++) {
				let fileName = fileData[fileDataIndex].name;
				let fileNameSplit = fileName.split(".");
				let extension = fileNameSplit.pop();
				if (!validatePattern.test(extension)) {
					this.errorMsg = "File type mismatch.";
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	}
}
