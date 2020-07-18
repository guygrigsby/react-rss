import React, { useState } from 'react'
import Navbar from './components/Nav.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Saved from './pages/Saved.js'
import RSS from './services/rss.js'
import './App.scss'

const storageKey = 'reactRssFaves'

const initialFaveState = () => {
  let m
  const l = JSON.parse(localStorage.getItem(storageKey))
  try {
    const m = new Map(
      l.reduce((map, obj) => {
        const doc = RSS.convertXML(obj.item)
        console.log('doc', doc)

        //const xml = doc.querySelector('item')
        map.set(obj.key, doc)
        return map
      }, new Map()),
    )
    console.log('read from local storage', l, m)
    return m
  } catch (e) {
    console.log('failed to read from local storage', l, e)
    m = new Map()
  }
  return m
}

const App = () => {
  const [feedURL, setFeedURL] = useState(
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  )
  const [items, setItems] = useState()
  const [faves, setFaves] = useState(initialFaveState())
  const saveFaves = (faves) => {
    const toSave = JSON.stringify(
      Array.from(faves).map(([key, item]) => {
        const xml = item.outerHTML
        console.log('saving xml', xml)
        const doc = RSS.convertXML(xml)
        console.log('testing  xml parse. doc is ', doc)

        return { key: key, item: xml }
      }),
    )

    console.log('save collection', toSave)
    localStorage.setItem(storageKey, toSave)
  }

  const toggleFave = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    const itemID = item.querySelector('guid').innerHTML

    const f = faves
    if (f.has(itemID)) {
      f.delete(itemID)
    } else {
      f.set(itemID, item)
    }
    const m = new Map(f)
    setFaves(m)
    saveFaves(m)
  }

  return (
    <div className="App">
      <Navbar
        title="RSS Reader"
        feedURL={feedURL}
        setFeedURL={setFeedURL}
        menuItems={[
          {
            name: 'Home',
            icon: <i className="fas fa-home"></i>,
            link: '/',
          },
          {
            name: 'Saved',
            icon: <i className="fas fa-bookmark"></i>,
            link: '/saved',
          },
        ]}
      />
      <Switch>
        <Route
          path="/saved"
          render={() => <Saved toggleFave={toggleFave} faves={faves} />}
        />

        <Route
          exact
          path="/"
          render={() => (
            <Home
              feedURL={feedURL}
              setItems={setItems}
              items={items}
              faves={faves}
              toggleFave={toggleFave}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
