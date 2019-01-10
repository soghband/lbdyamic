import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {ZXingScannerComponent} from './zxing-scanner/zxing-scanner.component';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html'
})
export class QrCodeComponent extends DynamicBehaviorComponent implements OnInit {
    @Input() data;
    @Input() option;
    @Input() fieldCreation;
    @Input() inputIndex;
    @Input() rowIndex;
    @Output() callBack = new EventEmitter();
    @Output() panelCallBack = new EventEmitter();
    @ViewChild("qrScanner") scanner : ZXingScannerComponent;
    columnCalculate = "";
    objKeys = Object.keys;
    tempValue;
    selectedDevice:MediaDeviceInfo;
    availableDevices;
    scannerEnabled = false;
    enableScannerString = "Scanner Off";
    hideCamera = true;
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
        if (this.data[this.fieldCreation.fieldName].length > 0) {
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
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)){
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                return true;
            } else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }

    }
    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
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
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }

        return true;
    }
    processCall(data) {

    }
    processPanelCallBack() {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
    displayCameras(cameras: MediaDeviceInfo[]) {
        console.log(cameras)
        this.availableDevices = cameras;
        this.selectedDevice = this.scanner.getDeviceById(this.availableDevices[0].deviceId);
    }
    handleQrCodeResult(data) {
        if (this.fieldCreation.multiValue) {
            this.data[this.fieldCreation.fieldName].push(data)
        } else {
            if (this.data[this.fieldCreation.fieldName].length >= 1) {
                this.data[this.fieldCreation.fieldName][0] = data
            } else if (this.data[this.fieldCreation.fieldName].length == 0) {
                this.data[this.fieldCreation.fieldName].push(data)
            }
        }
    }

    toggleScanner() {
        if (this.scannerEnabled) {
            this.hideCamera = true;
            this.scannerEnabled = false;
            this.enableScannerString = "Scanner Off";
        } else {
            this.hideCamera = false;
            this.scannerEnabled = true;
            this.enableScannerString = "Scanner On";
        }
    }
}
