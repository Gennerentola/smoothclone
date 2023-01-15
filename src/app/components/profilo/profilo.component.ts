import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthAthlete } from 'src/app/interfaces/athlete.interface';
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
  user: AuthAthlete | null | undefined;
  subscriptions:Subscription[] = [];
  iscrizioni: Event[] = [];

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authSrv.user$.subscribe(data => this.user = data));
    this.nome = this.user!.user.nome.charAt(0).toUpperCase() + this.user!.user.nome.slice(1);
    this.cognome = this.user!.user.cognome.charAt(0).toUpperCase() + this.user!.user.cognome.slice(1);
    this.team = this.user!.user.team;
    this.genere = this.user!.user.genere.charAt(0).toUpperCase() + this.user!.user.genere.slice(1);
    this.email = this.user!.user.email;
    let oggi = new Date;
    this.eta = (oggi.getFullYear() - Number(this.user!.user.annoDiNascita))
  }

}

