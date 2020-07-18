export const handleError = (response) => {
  if (response instanceof Response) {
    if (!response.ok) {
      console.log('ERROR')
    }
    console.log('got respnse object: TODO parse it')
  }
  console.log('default')
  return response
}

export const convertXML = (xml) => {
  return new window.DOMParser().parseFromString(xml, 'text/xml')
}

const fetchCurrent = (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then(convertXML)
    .then((data) => {
      const items = data.querySelectorAll('item')
      let arr = []
      items.forEach((item) => {
        arr.push(item)
      })
      return arr
    })
}

const RSS = {
  fetchCurrent,
  convertXML,
}

export default RSS
