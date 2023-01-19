import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventiService } from 'src/app/services/eventi.service';
import { Event, IscrizioniAtleta } from 'src/app/interfaces/event.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent implements OnInit {

  eventi: Event[] = [];
  dettagliEvento!: boolean;
  dettaglio!: Event;

  constructor(private eventiSrv: EventiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventiSrv.getEventi().subscribe((data: any) => {
      Object.keys(data).map((key) => {
        data[key]['id'] = key;
        this.eventi.push(data[key])
      })
      console.log(this.eventi)
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

}
