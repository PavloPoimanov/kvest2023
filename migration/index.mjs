import "./firebase.js";
import "./create/create.js"
import {createNames, createNumbers, createPlaces, createQuotes, createTexts} from "./create/create.js";
import {parseText} from "./parse/text.js";
import {migrateData, namesMigration, numbersMigration, placesMigration, quotesMigration} from "./update/update.js";
console.log('starting...')

// createTexts(parseText())
// createNames()
// createNumbers()
// createPlaces()
// createQuotes()

await migrateData('names', namesMigration)()
await migrateData('places', placesMigration)()
await migrateData('numbers', numbersMigration)()
await migrateData('quotes', quotesMigration)()
console.log('all done')
