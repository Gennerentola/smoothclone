import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, IscrizioniAtleta } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventiService {

  url = "https://smoothclone-51d89-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  postEvento(data: Event) {
    return this.http.post(this.url + 'eventi.json',data);
  }

  getEventi() {
    return this.http.get(this.url + 'eventi.json');
  }

  postIscrizione(data: IscrizioniAtleta) {
    return this.http.post(this.url + 'iscrizioni.json', data);
  }

  getIscrizioni() {
    return this.http.get(this.url + 'iscrizioni.json');
  }

  deleteIscrizione(id: string) {
    return this.http.delete(`${this.url}iscrizioni/${id}.json`);
  }

}
