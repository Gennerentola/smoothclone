import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Athlete } from 'src/app/interfaces/athlete.interface';
import { EventiService } from 'src/app/services/eventi.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { IscrizioniAtleta } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {

  nome?: string;
  cognome?: string;
  team?: string;
  genere?: string;
  email?: string;
  eta?: number;
  user?: Athlete;
  subscriptions: Subscription[] = [];
  iscrizioni: IscrizioniAtleta[] = [];
  loading: boolean = false;

  constructor(private eventiSrv: EventiService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem('atleta')!);
    this.nome = this.user!.nome.charAt(0).toUpperCase() + this.user!.nome.slice(1);
    this.cognome = this.user!.cognome.charAt(0).toUpperCase() + this.user!.cognome.slice(1);
    this.team = this.user!.team;
    this.genere = this.user!.genere.charAt(0).toUpperCase() + this.user!.genere.slice(1);
    this.email = this.user!.email;
    let oggi = new Date;
    this.eta = (oggi.getFullYear() - Number(this.user!.annoDiNascita))
    // ISCRIZIONI UTENTE
    this.eventiSrv.getIscrizioni().pipe(catchError(err => {
      if (err.error.error.code == 404) {
        this.router.navigate(['ERROR404'])
      }
      throw err
    })).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        data[key]['id'] = key;
        this.iscrizioni.push(data[key])
      })
      this.iscrizioni = this.iscrizioni.filter((e) => { return e.emailAtleta == this.email })
      this.loading = false;
    })
  }

  cancellaIscrizione(id: any) {
    this.loading = true;
    this.eventiSrv.deleteIscrizione(id).subscribe(() => {
      this.loading = false;
      window.location.href = 'https://smoothclone-51d89.web.app//user'
    })
  }
}

