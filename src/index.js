import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { setRerender } from './Redux/State.js';
import store from './Redux/redux-store';    // redux
import { Provider } from 'react-redux';     // react-redux context
import StoreContext from './StoreContext';  // react context


// function rerender() {
//   console.log("rerender");
  ReactDOM.render(
    // <StoreContext.Provider value={store}>
    // <Provider store={store}>
    //   <React.StrictMode>
        <App />,
    //   </React.StrictMode>
    // </Provider>,
    /* </StoreContext.Provider>, */
    document.getElementById('root')
  );
// }

// store.subscribe(rerender);

// setRerender(rerender);
// rerender();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals();
