import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-child',
  templateUrl: './panel-child.component.html',
  styleUrls: ['./panel-child.component.css']
})
export class PanelChildComponent implements OnInit {
  @Input() id = 'not-assign';
  @Input() showCloseBtn = false;
  @Input() header = 'not-assign';
  @Input() margin = true;
  constructor() { }

  ngOnInit() {
  }

}
