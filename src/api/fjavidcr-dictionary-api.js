const __HOST = 'https://fjavidcr-dictionary-api.herokuapp.com/api/v1'
const __HEADERS = {
}

export class DictionaryApi {

  static searchWord(query = 'palabra') {
    const url = `${__HOST}/word/search/${query}`

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

  static getAllWords() {
    const url = `${__HOST}/word/random/letter/all`
    return new Promise ((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: __HEADERS
      })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({error}))
    })

  }

  static getWordByLetter(letter) {
    const url = `${__HOST}/word/random/letter/${letter}`
    return new Promise ((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: __HEADERS
      })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({error}))
    })

  }
}