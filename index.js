const csv = require("csvtojson"); // https://github.com/Keyang/node-csvtojson
let scholar = require('google-scholar')
const path = require('path')

const converter = csv({
  delimiter: ";"
})
converter.
  fromFile(path.resolve(__dirname, 'priv/revistas.csv')).
  then(async (articles) => { //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await

    for(idx in articles){
      let title = articles[idx].Title
      let query = `source:"${title}" sphero`

      await scholar.search(query).then(res => {
        let msg = `${idx + 1}. ${title} incidencias con: sphero -> ${res.count}`
        console.log(msg)
      });
    }
   })
