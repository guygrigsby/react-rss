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

const p = (res) => {
  console.log('service logger', res)
  return res
}

export const convertXML = (xml) => {
  return new window.DOMParser().parseFromString(xml, 'text/xml')
}

export const getFeed = async (allItems, feed) => {
  try {
    const items = await fetchCurrent(feed)
    console.log('got items', items)
    allItems.concat([...items])
  } catch (e) {
    try {
      console.log('trying with cors proxy')
      const items = await fetchCurrent(
        `https://cors-anywhere.herokuapp.com/${feed}`,
      )
      console.log('got items vias proxy', items)
      allItems.concat([...items])
    } catch (e2) {
      console.log('caught exception', e, 'in Homepage')
    }
  }
}
const head = (url) => {
  return fetch(url, {
    method: 'HEAD',
  })
    .then(p)
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
const elemTxt = (tree, sel) => {
  return tree.querySelector(sel).innerHTML
}
/* 
 <channel>
  <title>ISS On-Orbit Status Report</title>
  <atom:link href="https://blogs.nasa.gov/stationreport/feed/" rel="self" type="application/rss+xml" />
  <link>https://blogs.nasa.gov/stationreport</link>
  <description></description>
  <lastBuildDate>Thu, 16 Jul 2020 15:23:41 +0000</lastBuildDate>
  <language>en-US</language>
  <sy:updatePeriod>hourly</sy:updatePeriod>
  <sy:updateFrequency>1</sy:updateFrequency>
  */

const fetchChannelInfo = (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then(convertXML)
    .then((data) => {
      return {
        title: elemTxt(data, 'title'),
        description: elemTxt(data, 'description'),
      }
    })
}
const RSS = {
  fetchCurrent,
  fetchChannelInfo,
  head,
  convertXML,
  getFeed,
}

export default RSS
