import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-main',
  templateUrl: './panel-main.component.html',
  styleUrls: ['./panel-main.component.css']
})
export class PanelMainComponent implements OnInit {
  @Input() id = 'not-assign';
  @Input() showCloseBtn = false;
  @Input() header = 'not-assign';
  @Input() margin = false;
  constructor() { }

  ngOnInit() {
  }

}
