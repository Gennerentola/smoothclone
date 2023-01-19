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
  loggato: boolean = false;

  subscriptions:Subscription[] = [];

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.loggato = true;
    }
  }

  logout() {
    this.authSrv.logout()
  }

}
