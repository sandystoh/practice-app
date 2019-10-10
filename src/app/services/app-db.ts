import Dexie from 'dexie';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    password: string;
}

export class AppDb extends Dexie {
    notes: Dexie.Table<IUser, string>;  // Type of Object and Primary Key

    constructor() {
      super('Users'); // Name of Database
      this.version(1).stores({
        users: 'id++,firstName,lastName,email,country,password'
      });
    }
  }
