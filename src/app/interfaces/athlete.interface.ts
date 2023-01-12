export interface Athlete {
  nome: string,
  cognome: string,
  team: string,
  genere: string,
  email: string,
  password: string,
  annoDiNascita: number
}

export interface LoginAthlete {
  email: string,
  password: string
}

export interface AuthAthlete {
  accessToken: string,
  user: {
    id: number,
    nome: string,
    cognome: string,
    team: string,
    genere: string,
    annoDiNascita: string,
    email: string
  }
}
