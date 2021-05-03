# Let's build a REST API with express.js

Zuerst noch einmal danke für deine Teilnahme!

## Bitte gut durchlesen

Bitte beachte während bzw. nach der Entwicklung der API folgende Punkte:

* Miss die komplette Zeit, die du benötigst, um die API zu entwickeln
* Notiere dir die Anzahl an zusätzlich verwendeten npm packages

## Aufgabe

Deine Aufgabe ist es eine kleine REST API rund um die Ressource 
[`Book`](https://github.com/matthyk/rest-with-express/blob/main/src/book/book.model.ts) zu schreiben. Damit die Aufgabe
nicht zu lange dauert, sollen nicht alle `CRUD`-Operationen implementiert werden, sondern nur `CREATE` und `READ`.
Dazu müssen 3 verschiedene "Endpunkte" implementiert werden. Diese sollen hier kurz beschrieben werden.

### POST /books

* Media Type `application/vnd.book+json`
* eingehende Daten sollen validiert werden
* Nur erlaubt, wenn gültiger API Key mit gesendet wird `(x-api-key: s3cr3t)`
* View/ DTO:
```typescript
class CreateBookView {
  
  title: string
  
  description: string
}
```

### GET /books/:id

* 2 verschiedene Views(=Media Types): `application/vnd.book+json` und `application/vnd.book-admin+json`
* Die Admin View kann nur zurückgegeben werden, wenn valider API Key mit gesendet wird
* Link zu `GET /books` soll immer in Antwort enthalten sein
* Links zu `PUT /books/:id` und `DELETE /books/:id` sollen nur in Antwort enthalten sein, wenn valider API Key mit 
  gesendet wurde
* Views:
```typescript
class BookView {
  id: string
  
  title: string
  
  self: Link
}
```
```typescript
class AdminBookView {
  id: string
  
  title: string
  
  description: string
  
  self: Link
}
```

### GET /books

* Media Type `application/vnd.book+json`
* `Books` müssen mit `title` gefiltert werden
* Wenn `title` nicht als Query Parameter gegeben ist &#8594; `400 Bad Request`
* Offset-Size Pagination mit default werden `size = 10` und `offset = 0`
* Link um zu ` POST /books` soll in Antwort enthalten sein
* Header `x-totalnumberofresults` enthält Anzahl an gesamten `Books`
* Header `x-numberofresults` enthält Anzahl an zurückgegeben `Books`
