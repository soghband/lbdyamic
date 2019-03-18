import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-over-all-example',
    templateUrl: './over-all-example.component.html',
    styleUrls: ['./over-all-example.component.css']
})
export class OverAllExampleComponent implements OnInit {
    tabCreation = {
        option: {},
        tabList: ["User Interface Editor","Test Component","Function Manual"]
    };

    constructor() {
    }

    ngOnInit() {
    }

}
