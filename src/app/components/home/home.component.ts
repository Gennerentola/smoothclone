import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/security/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggato: boolean = false;
  nome?: string;
  genere?: string;
  user: any;
  subscriptions: Subscription[] = [];
  loading: boolean = false;

  constructor(private navGuard: AuthGuard) { }

  ngOnInit(): void {
    this.loading = true;
    if (localStorage.getItem('atleta')) {
      this.loggato = true;
      this.user = JSON.parse(localStorage.getItem('atleta')!)
      this.nome = this.user!.nome.charAt(0).toUpperCase() + this.user!.nome.slice(1);
      this.genere = this.user!.genere;
    }
    this.loading = false;
  }

  naviga(link: string) {
    this.navGuard.controlloCustom(link)
  }

}
