const storageKey = 'reactRssFaves'
export const saveFaves = (faves) => {
  const toSave = JSON.stringify(
    Array.from(faves).map(([key, item]) => {
      const xml = item.outerHTML

      return { key: key, item: xml }
    }),
  )

  localStorage.setItem(storageKey, toSave)
}

const storage = [saveFaves]

export default storage
