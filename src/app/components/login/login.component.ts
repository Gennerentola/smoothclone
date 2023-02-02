import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { LoginAthlete } from 'src/app/interfaces/athlete.interface';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  err?: string;
  loading: boolean = false;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.loginForm = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl(null, Validators.required)
    })
    this.loading = false;
  }

  onSubmit() {
    this.loading = true;
    let data: LoginAthlete = {
      email: this.loginForm.value.email.toLowerCase(),
      password: this.loginForm.value.password
    }
    this.authSrv.login(data).pipe(catchError(err => {
      if (err.error.error.message == "EMAIL_NOT_FOUND") {
        this.loading = false;
        alert("Utente non registrato")
      } else if (err.error.error.message == "INVALID_PASSWORD") {
        this.loading = false;
        alert("Password errata")
      }
      throw err
    })).subscribe(() => {
      this.authSrv.recuperoAnagrafica(this.loginForm.value.email.toLowerCase());
      setTimeout(() => {
        this.loading = false;
        window.location.href = 'http://localhost:4200';
      }, 500)
    })

  }

}
