import axios from 'axios'
import RaeClient from 'rae-lite'

const rae = new RaeClient()

rae.create().search('casa').then(console.log)

const RAE_HOST = 'https://dle.rae.es/srv/search?w=palabra'

const __HEADERS = {
  // 'Authorization': 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0',
  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  // 'Cache-Control': 'no-cache',
  // 'Accept-Encoding': 'gzip, deflate, br',
  // 'Accept': '*/*',
  // 'Connection': 'keep-alive',
  // 'Origin': 'https://dle.rae.es'
}

export class RaeApi {

  static searchWords() {
    // const url = `${RAE_HOST}/${query}?m=31`
    const url = RAE_HOST

    // const req = new XMLHttpRequest()
    // req.open('GET', url, true)
    // // req.setRequestHeader('Authorization', 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0')
    // req.setRequestHeader('Access-Control-Allow-Origin', '*')
    // // req.withCredentials = true
    // req.onreadystatechange = function (aEvt) {
    //   if (req.readyState == 4) {
    //     if(req.status == 200)
    //       console.log(req.responseText)
    //     else
    //       console.log("Error loading page\n")
    //   }
    // }
    // req.send() 


    fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      headers: __HEADERS
    })
      .then(response => response)
      .then(result => console.log(result))
      .catch(error => console.log('error', error))

    // axios(url, {
    //   method: 'GET',
    //   // mode: 'no-cors',
    //   headers: __HEADERS,
    //   // withCredentials: true,
    //   // credentials: 'same-origin',
    // })
    // .then(response => response)
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error))
  }
}