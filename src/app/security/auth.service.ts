import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Athlete, AuthAthlete, LoginAthlete } from '../interfaces/athlete.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = new JwtHelperService()
  private authSubj = new BehaviorSubject<null | AuthAthlete>(null);
  user$ = this.authSubj.asObservable();



  timeoutLogout: any


  constructor(private http: HttpClient, private router: Router) {
    this.restore()
  }

  signUp(data: Athlete) {
    return this.http.post<AuthAthlete>('http://localhost:4201/register', data).pipe(tap((res) => {
        this.authSubj.next(res);
        localStorage.setItem('user', JSON.stringify(res))
        window.location.href= 'http://localhost:4200';
      }))
  }

  login(data: LoginAthlete) {
    return this.http.post<AuthAthlete>('http://localhost:4201/login', data).pipe(catchError(err => {
      throw err
    }), tap((res) => {
      this.authSubj.next(res);
      localStorage.setItem('user', JSON.stringify(res))
      window.location.href= 'http://localhost:4200';
    }))
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user')
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
    window.location.href= 'http://localhost:4200';
  }

  autoLogout(data: AuthAthlete) {
    const exDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
    const exMs = exDate.getTime() - new Date().getTime()
    this.timeoutLogout = setTimeout(() => {
      this.logout()
    }, exMs);
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: AuthAthlete = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
      return
    }
    this.authSubj.next(userdata)
    this.autoLogout(userdata)
  }
}
