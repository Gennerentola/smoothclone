import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreazioneEventoComponent } from './components/creazione-evento/creazione-evento.component';
import { RegolamentiComponent } from './components/regolamenti/regolamenti.component';
import { EventiComponent } from './components/eventi/eventi.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  {
    path: "createEvent",
    component: CreazioneEventoComponent
  },
  {
    path: "rules",
    component: RegolamentiComponent
  },
  {
    path: "events",
    component: EventiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
