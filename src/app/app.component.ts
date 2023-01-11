import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';
import { AuthAthlete } from './interfaces/athlete.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smoothclone';
  nome: string = '';
  loggato: boolean = false;
  atleta: AuthAthlete | null = null;

  subscriptions:Subscription[] = [];

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authSrv.athlete$.subscribe(data => this.atleta = data));
    this.nome = this.atleta!.athlete.nome.charAt(0).toUpperCase() + this.atleta!.athlete.nome.slice(1);
    this.loggato= localStorage.getItem('atleta')!== undefined || localStorage.getItem('atleta')!== null;
  }

  logout() {
    this.authSrv.logout()
  }

}
