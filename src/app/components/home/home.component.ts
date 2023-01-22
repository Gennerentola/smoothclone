import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';

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
  subscriptions:Subscription[] = [];

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('atleta')) {
      this.loggato = true;
      this.user = JSON.parse(localStorage.getItem('atleta')!)
      this.nome = this.user!.nome.charAt(0).toUpperCase() + this.user!.nome.slice(1);
      this.genere = this.user!.genere;
    }
  }

}
