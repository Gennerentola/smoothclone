import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { catchError } from 'rxjs';
import { Athlete } from 'src/app/interfaces/athlete.interface';
import { TimeScale } from 'chart.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  err?: string;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cognome: new FormControl(null, Validators.required),
      team: new FormControl(null, Validators.required),
      genere: new FormControl(null, Validators.required),
      anno: new FormControl(null, Validators.required),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
          this.passwordObserver('confermaPassword', true)
        ]),
      confermaPassword: new FormControl(null,
        [
          Validators.required,
          this.passwordObserver('password')
        ],)
    })
  }

  onSubmit() {
    console.log(this.registerForm)
    let data: Athlete = {
      nome: this.registerForm.value.nome,
      email: this.registerForm.value.email.toLowerCase(),
      password: this.registerForm.value.password,
      cognome: this.registerForm.value.cognome,
      team: this.registerForm.value.team,
      genere: this.registerForm.value.genere,
      annoDiNascita: this.registerForm.value.anno
    }
    console.log(data)
    this.authSrv.signUp(data).pipe(catchError(err => {
      if (err.error == "Email already exists") {
        alert('Email già esistente');
      }
      throw err
    })).subscribe(res => {
      this.err = undefined
      this.router.navigate(['/'])
    })
  }

  passwordObserver(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      if (control.parent && reverse) {
        const match = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (match) {
          match.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value ===
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }

}
