import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventiService {

  url = "https://smoothclone-51d89-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  postPersona(data: Event) {
    return this.http.post(this.url + 'eventi.json',data);
  }
}
