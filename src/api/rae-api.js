const __HOST = 'https://dle.rae.es/data'
// const __HOST = 'https://google.com'

const __HEADERS = {
  'Authorization': 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0',
  'credentials': 'include',
  'host': 'pasapalabra.js',
  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  // 'Cache-Control': 'no-cache',
  // 'Accept-Encoding': 'gzip, deflate, br',
  // 'Accept': '*/*',
  // 'Connection': 'keep-alive',
  // 'Origin': 'pasapalabra.js'
}

export class RaeApi {

  static searchWords({
    query
  }) {
    const url = // __HOST
      `${__HOST}/search?w=${query}&m=31&f=1&t=200`


    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.setRequestHeader('Authorization', 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0')
    // req.setRequestHeader('Access-Control-Allow-Origin', '*')
    // req.setRequestHeader('Origin', 'pasapalabra.js')
    req.withCredentials = true
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if (req.status == 200)
          console.log(req.responseText)
        else
          console.log("Error loading page\n")
      }
    }
    req.send()


    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
        headers: __HEADERS
      })
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => console.log(data.contents));

    // fetch(url, {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     credentials: "same-origin",
    //     headers: __HEADERS
    //   })
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error))

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0");
    myHeaders.append("Cookie", "TS0188ec7e=017ccc203caea648ea8c32e14b0ca55ce851bf8d1bd45416681e1c6eda5abbda1d8703d6034f307a222d320d6a02a1237f0f1cea81; __cflb=0H28uu4LW7gyBBnNGSSpSxx1a8En16bFSGijvfPM8xj");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://dle.rae.es/data/search?w=ji&m=31&f=1&t=200", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "https://dle.rae.es/data/search?w=ji&m=31&f=1&t=200");
    xhr.setRequestHeader("Authorization", "Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0");
    xhr.setRequestHeader("Cookie", "TS0188ec7e=017ccc203caea648ea8c32e14b0ca55ce851bf8d1bd45416681e1c6eda5abbda1d8703d6034f307a222d320d6a02a1237f0f1cea81; __cflb=0H28uu4LW7gyBBnNGSSpSxx1a8En16bFSGijvfPM8xj");

    xhr.send();
  }


}