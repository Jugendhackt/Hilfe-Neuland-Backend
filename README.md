# Hilfe, Neuland!

Eine Anlaufstelle für medial-hilfsbedürftigte Lehrer*innen.

## Setup

Mit `npm`:

```bash
$ git clone https://github.com/Jugendhackt/Hilfe-Neuland-Backend.git
$ cd Hilfe-Neuland-Backend
$ npm install
$ npm run dev
```

Mit `yarn`:

```bash
$ git clone https://github.com/Jugendhackt/Hilfe-Neuland-Backend.git
$ cd Hilfe-Neuland-Backend
$ yarn install
$ yarn dev
```

Die MongoDB URI muss als Umgebungsvariable `DB_CONNECTION_STRING` gespeichert werden.

Unter Linux:

```bash
export DB_CONNECTION_STRING="mongodb://user:password@localhost/database"
```

Unter Windows (PowerShell):
```powershell
$env:DB_CONNECTION_STRING="mongodb://user:password@localhost/database"
```

Die Datenbankdateien aus dem Release müssen in die Collections `issues` und `symptoms` mit `mongoimport` importiert werden.