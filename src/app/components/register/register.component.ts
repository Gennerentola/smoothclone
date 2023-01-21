import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { catchError } from 'rxjs';
import { Athlete, LoginAthlete } from 'src/app/interfaces/athlete.interface';

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
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
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
    let anagrafica: Athlete = {
      nome: this.registerForm.value.nome,
      email: this.registerForm.value.email.toLowerCase(),
      cognome: this.registerForm.value.cognome,
      team: this.registerForm.value.team,
      genere: this.registerForm.value.genere,
      annoDiNascita: this.registerForm.value.anno
    }
    let credenziali: LoginAthlete = {
      email: this.registerForm.value.email.toLowerCase(),
      password: this.registerForm.value.password,
    }
    // ISCRIZIONE DATI D'ACCESSO
    this.authSrv.signUpCredenziali(credenziali).pipe(catchError(err => {
      if (err.error.error.code == 400) {
        alert('Email già esistente');
      }
      throw err
    })).subscribe(() => {
      this.err = undefined
      // ISCRIZIONE DATI ANAGRAFICI
      this.authSrv.signUpAnagrafica(anagrafica).pipe(catchError(err => {
        if (err.error.error.code == 404) {
          alert('Siamo spiacenti ma abbiamo un problema, riprova più tardi!')
        }
        throw err
      })).subscribe(res => {
        this.err = undefined
        this.authSrv.recuperoAnagrafica(this.registerForm.value.email.toLowerCase())
      });
      // RECUPERO DATI ANAGRAFICI
      setTimeout(() => { window.location.href = 'http://localhost:4200'; }, 500)
    });

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
