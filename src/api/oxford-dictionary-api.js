const __HOST = 'https://fjavidcr-dictionary-api.herokuapp.com/api/v1/oxford'
const __HEADERS = {
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