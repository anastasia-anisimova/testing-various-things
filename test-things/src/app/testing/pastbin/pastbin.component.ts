import { Component, OnInit } from '@angular/core';
import {PastebinService} from "../pastebin.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pastbin',
  templateUrl: './pastbin.component.html',
  styleUrls: ['./pastbin.component.scss']
})
export class PastbinComponent implements OnInit {

  title = 'Pastbin';
  pastebins: any

  constructor(private readonly ps: PastebinService) { }

  ngOnInit(): void {
    this.ps.getPastebin().then(v => this.pastebins = v);
  }

}
