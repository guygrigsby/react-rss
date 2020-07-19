import React, { useState } from 'react'
import Navbar from './components/Nav.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Saved from './pages/Saved.js'
import { saveFaves, saveFeeds, getFaves, getFeeds } from './services/storage.js'
import Feeds from './pages/Feeds.js'
import Modal from './Modals/Modal.js'
import './App.scss'

const initialFaveState = () => {
  const saved = getFaves()
  return saved ? saved : new Map()
}

const initialFeedState = () => {
  const saved = getFeeds()
  console.log('getting feeds', saved)
  return saved ? saved : []
}

const App = () => {
  const [feeds, setF] = useState(initialFeedState())
  const [items, setItems] = useState([])
  const [faves, setFaves] = useState(initialFaveState())
  const [modal, setModal] = useState(null)
  const setFeeds = (feeds) => {
    setF(feeds)
    saveFeeds(feeds)
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
      {modal !== null ? (
        <Modal
          title={modal.title}
          msg={modal.msg}
          buttons={modal.buttons}
          closeModal={() => setModal(null)}
        />
      ) : (
        ''
      )}
      <Navbar
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
              setFeeds={setFeeds}
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
