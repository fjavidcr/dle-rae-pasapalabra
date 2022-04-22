// import axios from 'axios'

const __HOST = 'https://fjavidcr-dictionary-api.herokuapp.com/oxford'

const __HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Origin': 'pasapalabra.js'
}

export class OxfordDictionaryApi {

  static searchWord(query = 'palabra') {
    const url = `${__HOST}/word/${query}`

    fetch(url, {
        method: 'GET',
        headers: __HEADERS
      })
      .then(response => response.json())
      .then(result => console.log({
        result
      }))
      .catch(error => console.log('error', error))
  }
}