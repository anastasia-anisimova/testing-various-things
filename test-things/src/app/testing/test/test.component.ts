import { Component, OnInit } from '@angular/core';
import {PastebinService} from "../pastebin.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  text = '';

  constructor(private pastebinService: PastebinService) { }

  ngOnInit(): void {
    this.text = this.pastebinService.commonText;
  }

  setText(newText: string) {
    this.text = newText;
  }

}
