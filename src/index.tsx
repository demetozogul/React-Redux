import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './ReduxStore';

//import pages
import App from './App';
import { Context, defaultData } from './DataContext';



const router = 
<Provider store={store}>

 <Router>
  <Routes>
    <Route path="" element={ <Context.Provider value={defaultData.user1}><App /></Context.Provider> } ></Route>
  </Routes>
</Router>
</Provider>

ReactDOM.render(router,document.getElementById('root'));


reportWebVitals();
