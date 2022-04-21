import React from 'react';
import ReactDOM from 'react-dom';
import Products from "./components/Product/Products.js";
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
// import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
//import Login from '../components/Login';
const mockStore = configureStore({});
const initState={}

it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = mockStore(initState);
    ReactDOM.render(<Provider store={store}>
                      <Router>
                        <Products/>
                      </Router>
                    </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });