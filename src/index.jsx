import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// React-Redux

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

const store = createStore(moviesApp, devToolsEnhancer());


//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MySkullifyApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element 
ReactDOM.render(React.createElement(MySkullifyApplication), container);