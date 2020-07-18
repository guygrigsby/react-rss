import React, { useState } from 'react'
import Navbar from './components/Nav.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Saved from './pages/Saved.js'
import RSS from './services/rss.js'
import Feeds from './pages/Feeds.js'
import './App.scss'

const storageKey = 'reactRssFaves'

const initialFaveState = () => {
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
    m = new Map()
  }
  return m
}

const App = () => {
  const [feeds, setFeeds] = useState([
    'http://blogs.nasa.gov/stationreport/feed/',
    'https://hnrss.org/frontpage',
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  ])
  const [items, setItems] = useState()
  const [faves, setFaves] = useState(initialFaveState())
  const saveFaves = (faves) => {
    const toSave = JSON.stringify(
      Array.from(faves).map(([key, item]) => {
        const xml = item.outerHTML

        return { key: key, item: xml }
      }),
    )

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
        setFeeds={setFeeds}
        feeds={feeds}
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
          {
            name: 'Feeds',
            icon: <i className="fa fa-rss"></i>,
            link: '/feeds',
          },
        ]}
      />
      <Switch>
        <Route
          path="/saved"
          render={() => <Saved toggleFave={toggleFave} faves={faves} />}
        />
        <Route
          path="/feeds"
          render={() => <Feeds setFeeds={setFeeds} feeds={feeds} />}
        />

        <Route
          exact
          path="/"
          render={() => (
            <Home
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
