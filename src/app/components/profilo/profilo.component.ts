import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/security/auth.service';
import { Event } from 'src/app/interfaces/event.interface';

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
  user: any;
  subscriptions:Subscription[] = [];
  iscrizioni: Event[] = [];

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('atleta')!);
    this.nome = this.user!.nome.charAt(0).toUpperCase() + this.user!.nome.slice(1);
    this.cognome = this.user!.cognome.charAt(0).toUpperCase() + this.user!.cognome.slice(1);
    this.team = this.user!.team;
    this.genere = this.user!.genere.charAt(0).toUpperCase() + this.user!.genere.slice(1);
    this.email = this.user!.email;
    let oggi = new Date;
    this.eta = (oggi.getFullYear() - Number(this.user!.annoDiNascita))
  }

}

