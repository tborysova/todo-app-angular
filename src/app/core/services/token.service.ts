import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  setToken(token: string) {
    this.updateToken(true);
  }

}
