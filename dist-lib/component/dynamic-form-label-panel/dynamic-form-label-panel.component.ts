import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-dynamic-form-label-panel',
    templateUrl: './dynamic-form-label-panel.component.html'
})
export class DynamicFormLabelPanelComponent implements OnInit {
    @Input() fieldCreation;
    @Input() option;
    @Input() width;
    constructor() {
    }

    ngOnInit() {
    }

    getLabelDisplay() {
        if (typeof(this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
            return "dp2hide";
        } else if (this.option.labelAlign == "left") {
            return "singleLine"
        } else {
            return "";
        }
    }
}
