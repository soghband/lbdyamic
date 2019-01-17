import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Component({
	selector: 'app-paging',
	templateUrl: './paging.component.html'
})
export class PagingComponent implements OnInit {
	@Input() currentPage;
	@Input() totalPage;
	@Input() totalRecord;
	@Input() dataRank;
	@Input() customClass;
	@Output() pagingProcess = new EventEmitter();
	inputWidth;
	tempValue;
	constructor() {
	}
	ngOnInit() {
		this.inputWidth = ((String(this.totalPage).length * 15)+27)+"px";
	}

	checkInput(event) {
		let modValue = parseInt(String(event.target.value)+event.key);
		if ((event.key.match(/^([0-9])$/)
			|| (event.ctrlKey == true && (event.code == "KeyV" || event.code == "KeyC"))
			|| event.code == "Backspace"
			|| event.code == "ArrowUp"
			|| event.code == "ArrowDown"
			|| event.code == "ArrowLeft"
			|| event.code == "ArrowRight"
			|| event.code == "Tab") && modValue <= this.totalPage) {
      return true;
		}
    if(event.code == "NumpadEnter" || event.key == "Enter" || event.code == "Enter"){
      this.checkValue()
    }
		return false;
	}
	goFirst() {
		if (this.currentPage != 1) {
			this.currentPage = 1;
			this.processPaging()
		}
	}
	goLast() {
		if (this.currentPage != this.totalPage) {
			this.currentPage = this.totalPage;
			this.processPaging()
		}
	}
	goPrev() {
		if (this.currentPage != 1) {
			if (this.currentPage > 1) {
				this.currentPage --;
			}
			this.processPaging()
		}
	}
	goNext() {
		if (this.currentPage != this.totalPage) {
			if (this.currentPage < this.totalPage) {
				this.currentPage ++;
			}
			this.processPaging()
		}
	}
	keepValue() {
		this.tempValue = this.currentPage;
	}
	checkValue() {
		if (this.currentPage == 0 || this.currentPage == null) {
			this.currentPage = this.tempValue;
		}
		if (this.currentPage != this.tempValue) {
			this.processPaging()
		}
	}
	getTotalRecordStr() {
		let str = "";
		if (typeof(this.dataRank) != "undefined") {
			str ="Showing "+this.dataRank.begin + " to "+this.dataRank.end+" of "+this.totalRecord;
		}
		return str;
	}
	processPaging() {
        this.pagingProcess.emit(this.currentPage);
	}

	checkTotalPage() {
		if (this.currentPage > this.totalPage) {
			Observable.interval(100)
				.take(1)
				.subscribe(() => {
					this.currentPage = 1;
					this.pagingProcess.emit(this.currentPage);
				});
		}
		return this.totalPage;
	}
}
