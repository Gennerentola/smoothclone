# Smoothclone :wrestling:

Progetto generato con [Angular CLI](https://github.com/angular/angular-cli) versione 14.2.10 e MDB Angular versione 3.0.1.

## Development server

Fai partire `ng serve` sul terminale e naviga su `http://localhost:4200/`. (Puoi anche far partire `ng serve -o` per aprire la pagina in automatico sul tuo browser predefinito)

## Ulteriori informazioni

Per ulteriori info su Angular CLI usa `ng help` o vai sulla pagina [Angular CLI Overview and Command Reference](https://angular.io/cli).

## Gestione API

Il progetto si serve di Firebase versione 9.16.0 per la gestione dell'autenticazione dell'utente, la creazione degli eventi e l'iscrizione agli eventi stessi.

# Funzionalità del sito al demo day :1st_place_medal:

Il sito presenta l'opportunità di iscriversi e di creare eventi da zero, oppure partecipare ad eventi creati da altri utenti. La lista degli eventi attualmente creati è navigabile anche ad un visitatore non loggato, in modo da invogliare l'utente ad iscriversi al sito o a condividere un evento con un suo conoscente.

## Regstrazione e accesso :punch:

Tramite il bottone "Accedi" in alto a destra o col bottone "Unisciti a noi" si accede alla sezione di login e registrazione. La registrazione avviene tramite la raccolta di un'anagrafica e dei dati d'accesso, questi ultimi da usare successivamente nel form di login per accedere.

## Gestione degli eventi :punch:

Tramite il bottone "Eventi disponibili" nella barra di navigazione si ha accesso agli eventi attualmente disponibili sul database. Tramite il bottone "Dettagli" presente sulla card di ogni evento si accederà alla pagina del dettaglio dell'evento, da cui è possibile iscriversi tramite il bottone "Iscriviti" oppure semplicemente vedere ulteriori informazioni, come i contatti dell'organizzatore. È possibile creare un evento tramite il bottone "Crea un evento", dove si avrà accesso ad un form. ATTENZIONE: gli eventi creati non sono attualmente modificabili, presta attenzione durante la compilazione del form!
La gestione delle iscrizioni avviene sulla pagina "user".

## Profilo utente :punch:

Accessibile dopo aver effettuato il login, il bottone con l'icona dell'utente (o in alternativa il bottone "Vai al tuo profilo" in home) permettono di raggiungere la pagina "user". Da qui è possibile vedere i propri dati anagrafici e, se ci si è iscritti ad almeno un evento, una tabella con gli eventi a cui si è preso parte, con un bottone "Dettagli evento" che fungerà da shortcut per la pagina di dettaglio di quel preciso evento e un bottone "Cancella iscrizione" che invece permetterà di cancellarsi dall'evento.
