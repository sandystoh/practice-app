import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../services/app-db';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input()
  user: IUser;

  constructor() { }

  ngOnInit() {
  }

}
