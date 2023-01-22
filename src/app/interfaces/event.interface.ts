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
  },
  id?: string
}

export interface IscrizioniAtleta {
  emailAtleta: string,
  evento: Event,
  id?: string
}
