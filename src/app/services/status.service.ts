import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StatusService {

  constructor() { }

  access_token = new Subject();

  set token(value) {
    console.log('Setting access token ' + value);
    this.access_token.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('access_token', value);
  }

  get token() {
    return localStorage.getItem('access_token');
  }

}
