import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
	selector: 'app-dynamic-tab',
	templateUrl: './dynamic-tab.component.html'
})
export class DynamicTabComponent implements OnInit {
	@Input() tabCreation;
	@Input() lockTab = false;
	@Output() callBack = new EventEmitter();
	objKeys = Object.keys;
	currentTab = 0;


	constructor() {
	}

	ngOnInit() {
	}

	processCallBack(data) {
		this.currentTab = data.tabNum;
		this.callBack.emit(data);
	}
	getCssStatus(tabNumber) {
		if (!this.lockTab) {
			if (!isNaN(parseFloat(tabNumber)) && isFinite(tabNumber)) {
				if (tabNumber == this.currentTab) {
					return "p2DShowTab"
				}
				return "p2DHideTab"
			} else {
				if (this.tabCreation.tabList.indexOf(tabNumber) == this.currentTab) {
					return "p2DShowTab"
				}
				return "p2DHideTab";
			}
		}
	}
}
