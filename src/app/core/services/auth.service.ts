import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.mode';
import { apiEndpoint } from '../constants/constants';
import { map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

}
