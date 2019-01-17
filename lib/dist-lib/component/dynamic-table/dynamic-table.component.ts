import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableComponent} from './table/table.component';

@Component({
	selector: 'app-dynamic-table',
	templateUrl: './dynamic-table.component.html'
})
export class DynamicTableComponent implements OnInit {
	@ViewChild("tableID") tableRef: TableComponent;
	@Input() tableCreation;
	@Output() callBack = new EventEmitter();
	currentPage = 1;
	sortData = "";
	constructor() {

	}
	ngOnInit() {

	}
	processCallBack(data) {
		this.callBack.emit(data);
		this.sortData = data.sortValue;
	}
	getTotalPage() {
		return Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum);
	}

	getPageRank() {
		let beginRecord	= (((this.currentPage-1)*parseInt(this.tableCreation.data.pageRowNum))+1);
		let endRecode = (((this.currentPage-1)*parseInt(this.tableCreation.data.pageRowNum)) + this.tableCreation.data.data.length);
		return {
			begin:beginRecord,
			end:endRecode
		}
	}

	processPagingCallBack(data) {
		this.currentPage = data;
		this.callBack.emit({
				action: "page",
				pageNumber: data
			}
		)
	}
	getCheckedList() {
		return this.tableRef.getCheckedList();
	}
	clearCheckedList() {
		this.tableRef.clearCheckList();
	}
}
