import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {current} from 'codelyzer/util/syntaxKind';

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
		if (!this.lockTab) {
			this.currentTab = parseInt(data.tabNum);
			this.callBack.emit(data);
		}
	}
	nextTab() {
		if (this.currentTab < this.tabCreation.tabList.length-1){
			console.log(this.currentTab);
			this.currentTab = this.currentTab+1;
			console.log(this.currentTab);
			this.callBack.emit({
				action: "nextTab",
				fromTab: this.currentTab - 1,
				toTab: this.currentTab
			});
		}
	}
	toogleLockTab() {
		if (this.lockTab) {
			this.lockTab = false;
		} else {
			this.lockTab = true;
		}
	}
	getCssStatus(tabNumber) {
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
