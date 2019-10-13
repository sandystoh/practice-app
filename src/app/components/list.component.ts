import { Component, OnInit } from '@angular/core';
import { DexieService } from '../services/dexie.service';
import { IUser } from '../services/app-db';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
  }
  return (a, b) => {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  };
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: IUser[] = [];

  constructor(private dexieSvc: DexieService,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dexieSvc.getAll().then(result => this.users = result.sort(dynamicSort('lastName')));
  }

  delete(id) {
    const user = this.users.find(x => x.id === id);
    this.dexieSvc.remove(id)
    .then( res => {
      console.log(res);
      this.snackBar.open('User ' + user.firstName + ' ' + user.lastName +
       ' has been deleted', 'OK', { duration: 2000});
      this.getUsers();
    })
    .catch(err => console.log(err));
  }

}
