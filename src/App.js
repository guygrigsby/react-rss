import React, { useState } from 'react'
import Navbar from './components/Nav.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Saved from './pages/Saved.js'
import './App.scss'

const storageKey = 'reactRssFaves'

const initialFaveState = () => {
  let m
  try {
    m = new Map(JSON.parse(localStorage.getItem(storageKey)))
    console.log('getting local storage', m)
  } catch (e) {
    m = new Map()
    console.log('no local storage using empty map')
  }
  return m
}

const App = () => {
  const [feedURL, setFeedURL] = useState(
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  )
  const [items, setItems] = useState()
  const [faves, setFaves] = useState(initialFaveState())

  React.useEffect(() => {
    let m
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(Array.from(faves.entries())),
      )
    } catch (e) {
      console.log('Error getting local faves', e, 'faves', m)
    }
  }, [faves])

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
    setFaves(new Map(f))
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
