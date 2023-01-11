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

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    let data: LoginAthlete = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authSrv.login(data).pipe(catchError(err => {
      if (err.error == "Cannot find user") {
        alert("Utente non registrato")
      } else if (err.error == "Incorrect password") {
        alert("Password errata")
      } else if (err.error == "Email format is invalid") {
        alert("Formato email errato")
      }
      throw err
    })).subscribe(res => {
      this.router.navigate(['/'])
    })
  }

}
