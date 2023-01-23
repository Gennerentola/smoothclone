import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Athlete, AuthAthlete, LoginAthlete } from '../interfaces/athlete.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = new JwtHelperService()
  private authSubj = new BehaviorSubject<null | Athlete | AuthAthlete>(null);
  private tokenSubj = new BehaviorSubject<AuthAthlete | null>(null);
  user$ = this.authSubj.asObservable();
  userForInterceptor$ = this.tokenSubj.asObservable();
  urlRegistrazione = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9XWzq3oNtmwAkM8UrpZhx9FXUEinpYoI";
  urlAccesso = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9XWzq3oNtmwAkM8UrpZhx9FXUEinpYoI";
  urlAnagrafica = "https://smoothclone-51d89-default-rtdb.europe-west1.firebasedatabase.app/utenti.json";
  atletiIscritti: Athlete[] = [];


  timeoutLogout: any


  constructor(private http: HttpClient, private router: Router) {
    this.restore()
  }

  signUpCredenziali(data: LoginAthlete) {
    return this.http.post<AuthAthlete>(this.urlRegistrazione, data).pipe(tap((res) => {
      this.authSubj.next(res);
      localStorage.setItem('user', JSON.stringify(res))
    }))
  }

  signUpAnagrafica(data: Athlete) {
    return this.http.post<Athlete>(this.urlAnagrafica, data).pipe(tap((res) => {
      this.authSubj.next(res);
    }))
  }

  login(data: LoginAthlete) {
    return this.http.post<AuthAthlete>(this.urlAccesso, data).pipe(catchError(err => {
      throw err
    }), tap((res) => {
      this.authSubj.next(res);
      localStorage.setItem('user', JSON.stringify(res))
    }))
  }

  recuperoAnagrafica(email: string) {
    this.http.get(this.urlAnagrafica).pipe(catchError(err => {
      if (err.error.error.code == 404) {
        this.router.navigate(['ERROR404'])
      }
      throw err
    })).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        this.atletiIscritti.push(data[key])
      })
      let atletaLoggato = this.atletiIscritti.find((e) => {
        return e.email.indexOf(email) > -1;
      })
      localStorage.setItem('atleta', JSON.stringify(atletaLoggato))
    })
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user')
    localStorage.removeItem('atleta')
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
    window.location.href = 'http://localhost:4200';
  }

  autoLogout(data: AuthAthlete) {
    const exDate = this.jwtHelper.getTokenExpirationDate(data.idToken) as Date
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
    if (this.jwtHelper.isTokenExpired(userdata.idToken)) {
      return
    }
    this.authSubj.next(userdata)
    this.autoLogout(userdata)
  }
}
