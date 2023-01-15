import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-creazione-evento',
  templateUrl: './creazione-evento.component.html',
  styleUrls: ['./creazione-evento.component.scss']
})
export class CreazioneEventoComponent implements OnInit {

  eventForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      sport: new FormControl(null, Validators.required),
      genere: new FormControl(null, Validators.required),
      regole: new FormControl(null, Validators.required),
      luogo: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required),
      descrizione: new FormControl(null, [Validators.required, Validators.minLength(120)])
    })
  }

  onSubmit() {
    console.log(this.eventForm)
  }

}
