import React, { useState } from 'react'
import Navbar from './components/Nav.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Saved from './pages/Saved.js'
import './App.scss'
const App = () => {
  const [feedURL, setFeedURL] = useState(
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  )
  const [items, setItems] = useState()
  const [faves, setFaves] = useState(new Map())

  const toggleFave = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    const itemID = item.querySelector('guid').innerHTML

    const f = faves
    if (f.has(itemID)) {
      f.delete(itemID)
      console.log('fave removed', item)
    } else {
      f.set(itemID, item)
      console.log('fave added', item)
    }
    console.log('faves', faves)
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
