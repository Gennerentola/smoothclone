import { Component, OnInit } from '@angular/core';
import { AuthAthlete } from 'src/app/interfaces/athlete.interface';
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
  user: AuthAthlete | null | undefined;
  subscriptions:Subscription[] = [];

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.loggato = true;
      this.subscriptions.push(this.authSrv.user$.subscribe(data => this.user = data));
      this.nome = this.user!.user.nome.charAt(0).toUpperCase() + this.user!.user.nome.slice(1);
    }
  }

}
