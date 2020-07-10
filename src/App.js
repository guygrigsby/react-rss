import React, { useState } from 'react';
import Navbar from './components/Nav.js';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Saved from './pages/Saved.js';
import './App.scss';

const App = () => {
  const [feedURL, setFeedURL] = useState(
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  );
  const [feed, setFeed] = useState();

  const navFormClick = (url) => {
    console.log('setting feed', url);
    setFeedURL(url);
  };

  return (
    <div className="App">
      <Navbar
        title="RSS Reader"
        feedURL={feedURL}
        setFeedURL={setFeedURL}
        submitFeed={() => navFormClick(feedURL)}
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
        <Route path="/saved" render={() => <Saved />} />

        <Route
          exact
          path="/"
          render={() => (
            <Home
              feedURL={feedURL}
              setFeedContents={setFeed}
              feedContents={feed}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
