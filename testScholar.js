let scholar = require('google-scholar')

scholar.search('chairmouse')
  .then(resultsObj => {
    console.log(resultsObj)
  })
