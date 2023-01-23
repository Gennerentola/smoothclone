export interface Athlete {
  nome: string,
  cognome: string,
  team: string,
  genere: string,
  email: string,
  annoDiNascita: number
}

export interface LoginAthlete {
  email: string,
  password: string
}

export interface AuthAthlete {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  displayName?: string,
  registered?: boolean
}
