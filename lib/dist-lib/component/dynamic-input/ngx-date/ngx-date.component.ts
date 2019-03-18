import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {months} from 'moment';

@Component({
    templateUrl: './ngx-date.component.html',
})
export class NgxDateComponent extends DynamicBehaviorComponent implements OnInit {
    @Input() data;
    @Input() option;
    @Input() fieldCreation;
    @Input() inputIndex;
    @Input() rowIndex;
    @Output() callBack = new EventEmitter();
    @Output() panelCallBack = new EventEmitter();
    columnCalculate = '';
    objKeys = Object.keys;
    tempValue;
    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };

    constructor() {
        super();
    }

    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1 :
                this.columnCalculate = 'dp2Col1';
                break;
            case 2 :
                this.columnCalculate = 'dp2Col2';
                break;
            case 3 :
                this.columnCalculate = 'dp2Col3';
                break;
            case 4 :
                this.columnCalculate = 'dp2Col4';
                break;
            default :
                this.columnCalculate = '';
        }
        if (this.option.mode == 'add') {
            if (typeof(this.fieldCreation.default) != 'undefined') {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                } else if (typeof(this.fieldCreation.default) == 'string') {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            } else {
                this.data[this.fieldCreation.fieldName] = [''];
            }
        }
    }

    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push('');
    }

    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }

    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        this.validateDateFormat(event ,dataIndex);
    }

    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    }

    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            let combineValue = this.tempValue + key;
            if (String(key).match(/[0-9/]/)) {
                return true;
            }
            return false;
        }

        return true;
    }

    processBlur(event, action, dataIndex) {
        let validate = true;
        this.validateDateFormat(event ,dataIndex);
        if (this.data[this.fieldCreation.fieldName][dataIndex] == null && event.target.value != '') {
            event.srcElement.focus();
            validate = false;
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName
        });
    }

    processCall(data) {

    }

    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }

    onDateChanged(event, dataIndex) {
        this.callBack.emit({
            event: event,
            action: 'dateChange',
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    }

    validateDateFormat(event,dataIndex) {
        let dateString = event.target.value;
        let eventType = event.type;
        let dateSplit = dateString.split('/');
        let currentDate = new Date();
        let yearAdjust;
        let monthAdjust;
        let dayAdjust;
        if (dateSplit.length == 3 && dateSplit[2].length == 4 && (eventType == "blur" || eventType == "keyup" && event.target.selectionEnd > 5)) {
            if (parseInt(dateSplit[2]) > (currentDate.getFullYear() + 50) || parseInt(dateSplit[2]) < (currentDate.getFullYear() - 50)) {
                yearAdjust = currentDate.getFullYear();
            } else {
                yearAdjust = parseInt(dateSplit[2]);
            }
            if (parseInt(dateSplit[1]) > 12) {
                monthAdjust = 12;
            } else {
                monthAdjust = parseInt(dateSplit[1]);
            }
            let dateCalculate = new Date(yearAdjust, monthAdjust, 0);
            let lastDayOfMont = dateCalculate.getDate();
            if (parseInt(dateSplit[0]) > lastDayOfMont) {
                dayAdjust = lastDayOfMont;
            } else {
                dayAdjust = parseInt(dateSplit[0]);
            }
            this.data[this.fieldCreation.fieldName][dataIndex] = {
                jsdate: new Date(yearAdjust,monthAdjust-1,dayAdjust),
                formatted: dayAdjust +"/" + monthAdjust+"/" + yearAdjust
            }
        }
    }

    disableToggle() {

    }
}



