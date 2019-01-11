"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var util_1 = require("util");
var TableComponent = /** @class */ (function () {
    function TableComponent() {
        this.callBack = new core_1.EventEmitter();
        this.objKeys = Object.keys;
        this.sortField = "";
        this.sortType = "ASC";
        this.checkData = [];
        this.checkDataTemp = [];
        this.radioData = "";
        this.checkSelectAll = false;
    }
    Object.defineProperty(TableComponent.prototype, "pageNumber", {
        get: function () {
            return this._pageNumber;
        },
        set: function (val) {
            this._pageNumber = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TableComponent.prototype, "sortData", {
        get: function () {
            return this._sortData;
        },
        set: function (val) {
            this._sortData = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    TableComponent.prototype.ngOnInit = function () {
        this.sortField = this.tableCreation.fieldList[0].fieldName;
    };
    TableComponent.prototype.ngOnChanges = function (changes) {
        this.processCheckSelectAll();
    };
    TableComponent.prototype.processCheckSelectAll = function () {
        var checkStatusSelectAll = true;
        for (var rowIndex in this.tableCreation.data.data) {
            var primaryKey = this.getPrimary(rowIndex);
            if ((typeof (this.checkData[primaryKey]) == "undefined" || this.checkData[primaryKey] == false) && !this.checkIgnore(rowIndex)) {
                checkStatusSelectAll = false;
                break;
            }
        }
        if (checkStatusSelectAll == true) {
            this.checkSelectAll = true;
        }
        else {
            this.checkSelectAll = false;
        }
    };
    TableComponent.prototype.getData = function (fieldData, row) {
        var dataRow = this.tableCreation.data.data[row];
        var strData = "";
        if (fieldData.fieldName.length > 1) {
            if (fieldData.multiType == "join") {
                var dataAll = [];
                for (var _i = 0, _a = fieldData.fieldName; _i < _a.length; _i++) {
                    var fieldName = _a[_i];
                    if (dataRow[fieldName] != null && dataRow[fieldName] != "") {
                        dataAll.push(dataRow[fieldName]);
                    }
                }
                strData = dataAll.join(fieldData.joinChar);
            }
            else if (fieldData.multiType == "oneFromLast") {
                var dataAll = [];
                for (var _b = 0, _c = fieldData.fieldName; _b < _c.length; _b++) {
                    var fieldName = _c[_b];
                    dataAll.push(dataRow[fieldName]);
                }
                while (dataAll.length > 0 && (strData == null || strData == "")) {
                    strData = dataAll.pop();
                }
            }
            else if (fieldData.multiType == "oneFromFirst") {
                var dataAll = [];
                for (var _d = 0, _e = fieldData.fieldName; _d < _e.length; _d++) {
                    var fieldName = _e[_d];
                    dataAll.push(dataRow[fieldName]);
                }
                while (dataAll.length > 0 && (strData == null || strData == "")) {
                    strData = dataAll.shift();
                }
            }
        }
        else {
            strData = dataRow[fieldData.fieldName];
        }
        return strData;
    };
    TableComponent.prototype.getFieldId = function (fieldData) {
        var fieldArray = [];
        for (var _i = 0, fieldData_1 = fieldData; _i < fieldData_1.length; _i++) {
            var fieldName = fieldData_1[_i];
            fieldArray.push(fieldName);
        }
        var fieldId = fieldArray.join("_");
        return fieldId;
    };
    TableComponent.prototype.editRow = function (row) {
        this.callBack.emit({
            action: 'edit',
            rowIndex: row,
            rowData: this.tableCreation.data.data[row]
        });
    };
    TableComponent.prototype.deleteRow = function (row) {
        this.callBack.emit({
            action: 'delete',
            rowIndex: row,
            rowData: this.tableCreation.data.data[row]
        });
    };
    TableComponent.prototype.sortBy = function (dataIndex) {
        if (this.tableCreation.sorting == true && this.tableCreation.fieldList[dataIndex].sorting != false) {
            var sortField = void 0;
            if (typeof (this.tableCreation.fieldList[dataIndex].fieldNameDb) != "undefined") {
                sortField = this.tableCreation.fieldList[dataIndex].fieldNameDb;
            }
            else {
                sortField = this.tableCreation.fieldList[dataIndex].fieldName;
            }
            var fieldName = sortField.join(",");
            if (this.sortField == fieldName) {
                if (this.sortType == "DESC") {
                    this.sortType = "ASC";
                }
                else {
                    this.sortType = "DESC";
                }
            }
            else {
                this.sortField = fieldName;
                this.sortType = "ASC";
            }
            // console.log('function sortBy sortType = ',this.sortType)
            var sort = this.sortField + " " + this.sortType;
            this.callBack.emit({
                action: "sort",
                sortValue: sort
            });
        }
    };
    TableComponent.prototype.dataAction = function (rowNum, fieldName) {
        this.callBack.emit({
            action: "click_data",
            fieldName: fieldName.join(','),
            data: this.tableCreation.data.data[rowNum]
        });
    };
    TableComponent.prototype.checkAction = function (rowIndex) {
        var checkStatus = "";
        var primaryKey = this.getPrimary(rowIndex);
        if (this.checkData[primaryKey] == true) {
            checkStatus = "check";
            this.checkDataTemp[primaryKey] = Object.assign({}, this.tableCreation.data.data[rowIndex]);
        }
        else {
            checkStatus = "unCheck";
            delete this.checkDataTemp[primaryKey];
        }
        this.processCheckSelectAll();
        this.callBack.emit({
            type: "checkBox",
            action: checkStatus,
            primaryKey: primaryKey,
            data: this.tableCreation.data.data[rowIndex]
        });
    };
    TableComponent.prototype.radioAction = function (rowIndex) {
        this.callBack.emit({
            type: "radio",
            action: "change",
            primaryKey: this.getPrimary(rowIndex),
            data: this.tableCreation.data.data[rowIndex]
        });
    };
    TableComponent.prototype.getPrimary = function (rowIndex) {
        var primaryField = this.tableCreation.primaryField;
        var dataRow = this.tableCreation.data.data[rowIndex];
        var primaryKey = [];
        if (Array.isArray(primaryField)) {
            for (var _i = 0, primaryField_1 = primaryField; _i < primaryField_1.length; _i++) {
                var primaryListRow = primaryField_1[_i];
                if (typeof (dataRow[primaryListRow]) != "undefined") {
                    primaryKey.push(dataRow[primaryListRow]);
                }
            }
        }
        else {
            if (typeof (dataRow[primaryField]) != "undefined") {
                primaryKey.push(dataRow[primaryField]);
            }
        }
        return primaryKey.join("_");
    };
    TableComponent.prototype.getCheckedList = function () {
        var checkList = [];
        for (var checkedRowIndex in this.checkDataTemp) {
            checkList.push(this.checkDataTemp[checkedRowIndex]);
        }
        return checkList;
    };
    TableComponent.prototype.clearCheckList = function () {
        this.checkData = [];
        this.checkDataTemp = [];
        this.checkSelectAll = false;
    };
    TableComponent.prototype.checkActionAll = function () {
        if (this.checkSelectAll == true) {
            for (var rowIndex in this.tableCreation.data.data) {
                if (!this.checkIgnore(rowIndex)) {
                    var primaryKey = this.getPrimary(rowIndex);
                    this.checkData[primaryKey] = true;
                    this.checkDataTemp[primaryKey] = Object.assign({}, this.tableCreation.data.data[rowIndex]);
                }
            }
        }
        else {
            for (var rowIndex in this.tableCreation.data.data) {
                var primaryKey = this.getPrimary(rowIndex);
                this.checkData[primaryKey] = false;
                delete this.checkDataTemp[primaryKey];
            }
        }
    };
    TableComponent.prototype.checkIgnore = function (rowIndex) {
        if (typeof (this.tableCreation.ignoreSelect) != "undefined") {
            var dataSplitCheck = this.tableCreation.ignoreSelect.split(":");
            var dataField = this.tableCreation.data.data[rowIndex][dataSplitCheck[0]];
            if (typeof (dataField) != "undefined") {
                if (util_1.isBoolean(dataField)) {
                    return dataField;
                }
                else if (dataSplitCheck.length == 2) {
                    if (this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
        }
        return false;
    };
    __decorate([
        core_1.Input()
    ], TableComponent.prototype, "pageNumber");
    __decorate([
        core_1.Input()
    ], TableComponent.prototype, "sortData");
    __decorate([
        core_1.Input()
    ], TableComponent.prototype, "tableCreation");
    __decorate([
        core_1.Output()
    ], TableComponent.prototype, "callBack");
    TableComponent = __decorate([
        core_1.Component({
            selector: 'app-table',
            templateUrl: './table.component.html'
        })
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
