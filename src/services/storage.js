import RSS from './rss.js'
const storageKey = 'reactRssFaves'
const feedsKey = 'rssreactRssFeeds'

export const saveFeeds = (feeds) => {
  localStorage.setItem(feedsKey, JSON.stringify(feeds))
}
export const getFeeds = () => {
  return JSON.parse(localStorage.getItem(feedsKey))
}

export const saveFaves = (faves) => {
  const toSave = JSON.stringify(
    Array.from(faves).map(([key, item]) => {
      const xml = item.outerHTML

      return { key: key, item: xml }
    }),
  )

  localStorage.setItem(storageKey, toSave)
}

export const getFaves = () => {
  let m
  const l = JSON.parse(localStorage.getItem(storageKey))
  try {
    const m = new Map(
      l.reduce((map, obj) => {
        const doc = RSS.convertXML(obj.item)
        const xml = doc.querySelector('item')
        map.set(obj.key, xml)
        return map
      }, new Map()),
    )
    return m
  } catch (e) {
    console.log('no faves saved')
  }
  return m
}
