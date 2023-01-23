import { Component, OnInit } from '@angular/core';
import { EventiService } from 'src/app/services/eventi.service';
import { Event, IscrizioniAtleta } from 'src/app/interfaces/event.interface';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Athlete } from 'src/app/interfaces/athlete.interface';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent implements OnInit {

  eventi: Event[] = [];
  dettagliEvento!: boolean;
  dettaglio!: Event;
  user?: Athlete;
  email?: string;
  genere?: string;
  err?: string;
  iscrizioni: IscrizioniAtleta[] = [];
  matchIscrizione: any;

  constructor(private eventiSrv: EventiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventiSrv.getEventi().pipe(catchError(err => {
      if (err.error.error.code == 404) {
        this.router.navigate(['ERROR404'])
      }
      throw err
    })).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        data[key]['id'] = key;
        this.eventi.push(data[key])
      })
      if (this.route.snapshot.paramMap.get('id')) {
        this.dettaglio = this.eventi.find((e) => {
          return e.id!.indexOf(this.route.snapshot.paramMap.get('id')!) > -1;
        })!;
        this.dettagliEvento = true;
      } else {
        this.dettagliEvento = false;
      }
    })
  }

  iscriviti(infoEvento: Event) {
    // VERIFICA ISCRIZIONE
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
      this.user = JSON.parse(localStorage.getItem('atleta')!);
      this.email = this.user!.email;
      this.iscrizioni = this.iscrizioni.filter((e) => { return e.emailAtleta == this.email })
      if ((this.matchIscrizione = this.iscrizioni.filter((e) => { return e.evento == infoEvento })).length > 0) {
        alert('Sei già iscritto a quest\'evento, consulta la pagina \'user\' per gestire le tue iscrizioni');
      } else {
        // ISCRIZIONE
        let iscrizione: IscrizioniAtleta = {
          emailAtleta: this.email,
          evento: infoEvento
        }
        this.genere = this.user!.genere;
        if (((this.dettaglio.genere == 'maschile' && this.genere == 'maschio') || (this.dettaglio.genere == 'femminile' && this.genere == 'femmina'))) {
          this.eventiSrv.postIscrizione(iscrizione).pipe(catchError(err => {
            if (err.error.error.code == 404) {
              this.router.navigate(['ERROR404'])
            }
            throw err
          })).subscribe(() => {
            this.err = undefined;
            window.location.href = 'http://localhost:4200/user'
          })
        } else {
          alert('Mi dispiace, la competizione è riservata agli atleti del sesso opposto')
        }
      }
    })

  }

}
