import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() text: string;

  @Output() sendMessage = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  send() {
    this.sendMessage.emit('new');
  }

}
