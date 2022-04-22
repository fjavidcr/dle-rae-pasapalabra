const __HOST = 'https://www.diccionarios.com/diccionario/espanol'


export class DictionaryApi {

  static searchWord(word = 'palabra') {
    return new Promise ((resolve, reject) => {
      const url = `${__HOST}/${word}`
      const req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.onreadystatechange = (aEvt) => {
        if (req.readyState == 4) {
          if (req.status == 200) {
            let responseBody = [...JSON.parse(req.responseText)?.body]
            resolve(responseBody)
          } else
            reject( new Error('Error getting words...'))
        }
      }
      req.send()
    })
    
  }
}