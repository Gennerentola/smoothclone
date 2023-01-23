import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smoothclone';
  loggato: boolean = false;
  loading: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('atleta')) {
      this.loggato = true;
    }
  }

  logout() {
    this.loading = true;
    this.authSrv.logout()
    this.loading = false;
  }

}
