const __HOST = 'https://palabras-aleatorias-public-api.herokuapp.com'


export class PalabarasAleatoriasApi {

  static searchWords() {
    return new Promise ((resolve, reject) => {
      const url = `${__HOST}/multiple-random`
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