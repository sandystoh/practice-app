import { Injectable } from '@angular/core';
import { AppDb } from './app-db';

@Injectable()
export class DexieService {

    db: any;

    constructor() {
        this.db = new AppDb();
    }

    getAll() {
        return this.db.users.toArray();
      }

    getUsers(firstName, lastName) {
        return this.db.users.where({firstName, lastName}).reverse().sortBy('id');
    }

    add(data) {
    return this.db.users.add(data);
    }

    update(id, data) {
    return this.db.users.update(id, data);
    }

    remove(id) {
    return this.db.users.delete(id);
    }
  }


