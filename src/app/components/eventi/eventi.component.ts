import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventiService } from 'src/app/services/eventi.service';
import { Event } from 'src/app/interfaces/event.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent implements OnInit {

  eventi: Event[] = [];
  dettagliEvento!: boolean;
  indice!: number;

  constructor(private eventiSrv: EventiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventiSrv.getEventi().subscribe((data: any) => {
      Object.keys(data).map((key) => {
        this.eventi.push(data[key])
      })
      if (this.route.snapshot.paramMap.get('id')) {
        this.indice = Number(this.route.snapshot.paramMap.get('id'))
        this.dettagliEvento = true;
      } else {
        this.dettagliEvento = false;
      }
    })
  }

}
