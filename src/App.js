import React, { useState } from 'react'
import Navbar from './components/Nav.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Saved from './pages/Saved.js'
import RSS from './services/rss.js'
import Storage from './services/storage.js'
import Feeds from './pages/Feeds.js'
import Modal from './Modals/Modal.js'
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
  const [items, setItems] = useState([])
  const [faves, setFaves] = useState(initialFaveState())
  const [modal, setModal] = useState(null)

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
    Storage.saveFaves(m)
  }
  return (
    <div className="App">
      {modal !== null ? (
        <Modal
          title={modal.title}
          msg={modal.msg}
          closeModal={() => setModal(null)}
        />
      ) : (
        ''
      )}
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
          render={() => (
            <Saved setModal={setModal} toggleFave={toggleFave} faves={faves} />
          )}
        />
        <Route
          path="/feeds"
          render={() => (
            <Feeds setModal={setModal} setFeeds={setFeeds} feeds={feeds} />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <Home
              setItems={setItems}
              items={items}
              feeds={feeds}
              faves={faves}
              toggleFave={toggleFave}
              setModal={setModal}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
