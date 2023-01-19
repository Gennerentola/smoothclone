import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthAthlete } from 'src/app/interfaces/athlete.interface';
import { Event } from 'src/app/interfaces/event.interface';
import { AuthService } from 'src/app/security/auth.service';
import { EventiService } from 'src/app/services/eventi.service';

@Component({
  selector: 'app-creazione-evento',
  templateUrl: './creazione-evento.component.html',
  styleUrls: ['./creazione-evento.component.scss']
})
export class CreazioneEventoComponent implements OnInit {

  subscriptions:Subscription[] = [];
  eventForm!: FormGroup;
  user: AuthAthlete | null | undefined;
  nome!: string;
  cognome!: string;
  team!: string;
  id!: number;
  email!: string;


  constructor(private eventiSrv: EventiService, private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      sport: new FormControl(null, Validators.required),
      genere: new FormControl(null, Validators.required),
      regole: new FormControl(null, Validators.required),
      luogo: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required),
      descrizione: new FormControl(null, [Validators.required, Validators.minLength(120)])
    })
    this.subscriptions.push(this.authSrv.user$.subscribe(data => this.user = data));
    this.nome = this.user!.user.nome.charAt(0).toUpperCase() + this.user!.user.nome.slice(1);
    this.cognome = this.user!.user.cognome.charAt(0).toUpperCase() + this.user!.user.cognome.slice(1);
    this.team = this.user!.user.team;
    this.id = Number(this.user!.user.team);
    this.email = this.user!.user.email;
  }

  onSubmit() {
    console.log(this.eventForm)
    let data: Event = {
      nome: this.eventForm.value.nome,
      sport: this.eventForm.value.sport,
      genere: this.eventForm.value.genere,
      luogo: this.eventForm.value.luogo,
      regole: this.eventForm.value.regole,
      data: this.eventForm.value.data,
      descrizione: this.eventForm.value.descrizione,
      organizzatore: {
        nome: this.nome,
        cognome: this.cognome,
        team: this.team,
        idOrganizzatore: this.id,
        email: this.email
      },
      iscritti: undefined
    }
    this.eventiSrv.postEvento(data).subscribe(data => {
      console.log(data)
    })
    setTimeout(()=>{this.router.navigate(['/events'])}, 3000)
  }

}
