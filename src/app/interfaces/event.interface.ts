export interface Event {
  nome: string,
  sport: string,
  genere: string,
  luogo: string,
  regole: string,
  data: string,
  descrizione: string,
  organizzatore: {
    nome: string,
    cognome: string,
    team: string,
    idOrganizzatore: number,
    email: string
  }
  iscritti?: [
    {
      nome: string,
      cognome: string,
      team: string,
      idIscrito: number
    }
  ]
}

export interface IscrizioniAtleta {
  idAtleta: string,
  evento: Event
}
