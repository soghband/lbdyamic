import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-function-maual',
    templateUrl: './function-maual.component.html',
    styleUrls: ['./function-maual.component.css']
})
export class FunctionMaualComponent implements OnInit {
    constructor() {
    }

    objKey = Object.keys;
    lang = 'th';
    explanationText = {
        verifyField: {
            th: 'ตรวจสอบการคั้งค่าของฟอร์มและข้อมูลว่าตรงกันหรือไม่',
            en: 'Check form config and data is match.',
            detail: 'Return: Boolean\n' +
                'Example: \n' +
                'this.formViewChild.verifyField();'
        },
        generateFrameHeader: {
            th: 'สร้าง Header ของเฟรม',
            en: 'Create frame header.',
            detail: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.generateFrameHeader();'
        },
        getDefault: {
            th: 'ดึงค่าเริ่มต้นจากการตั้งค่า',
            en: 'Get default from setting.',
            detail: 'Return: Object\n' +
                'Example: \n' +
                'this.formViewChild.getDefault();'
        },
        reRenderForm: {
            th: 'ทำการแสดงฟอร์มใหม่ ใช้เมื่อมีการเปลี่ยนแปลงการตั้งค่าของฟิลด์หลายฟิลด์',
            en: 'Re-render from, use when change form setting',
            detail: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.reRenderForm();'
        },
        reRenderField: {
            th: 'ทำการแสดงฟิลด์ใหม่ ใช้เมื่อมีการเปลี่ยนแปลงการตั้งค่าของฟิลด์บางฟิลด์',
            en: 'Re-render field, use when change field setting',
            detail: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.reRenderField(["fieldName1","fieldName2"]);'
        },
        setFieldAttribute: {
            th: 'ตั้งค่าคุณสมบัติของฟิลด์',
            en: 'Set field attribute.',
            detail: 'Return: Void\n' +
                'Example: \n' +
                'this.formViewChild.setFieldAttribute("fieldName","type","textBox");'
        },
        getFieldAttribute: {
            th: 'ดึงค่าคุณสมบัติของฟิลด์',
            en: 'Get field attribute.',
            detail: 'Return: String\n' +
                'Example: \n' +
                'this.formViewChild.getFieldAttribute("fieldName","type");'
        },
        setDataValue: {
            th: '',
            en: 'Get field attribute.',
            detail: 'Return: String\n' +
                'Example: \n' +
                'this.formViewChild.setFieldAttribute("fieldName","type","textBox");'},
        getFieldType: {},
        getDataValue: {},
        getDynamicInput: {},
        mapSetAttribute: {},
        mapSetValue: {},
        mapGetValue: {},
        checkRequireField: {},
        checkValidateField: {},
        getFieldList: {},
        getFieldLabel: {},
        getFrameHeader: {},
        getFormRow: {},
        addRow: {},
        deleteRow: {},
        enableRow: {},
        disableRow: {},
        disableField: {},
        enableField: {},
        enableDeleteRow: {},
        disableDeleteRow: {},
        reFilter: {},
        onFormReady: {},
        duplicateDataRow: {},
        duplicateToNewRow: {},
        checkDuplicate: {},
        checkRequireAll: {},
        checkValidateAll: {},
        setMode: {},
        enableAdd: {},
        disableAdd: {},
        enableDelete: {},
        disableDelete: {},
    };

    ngOnInit() {
    }

    changeLng(lang) {
        this.lang = lang
    }
}
