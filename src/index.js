import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker'
//import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBM_RN1zTbJwg12n4RDbGnWLoHyxE_GUzs",
	authDomain: "financeiro-238020.firebaseapp.com",
	databaseURL: "https://financeiro-238020.firebaseio.com",
	projectId: "financeiro-238020",
	storageBucket: "financeiro-238020.appspot.com",
	messagingSenderId: "459879150044"
};
//firebase.initializeApp(config);

//const logger = store => next => action => {
//	console.group(action.type)
//	console.info('despachando', action)
//	let resultado = next(action)
//	console.log('proximo', store.getState())
//	console.groupEnd(action.type)
//	return resultado
//}

//const store = createStore(rootReducer, applyMiddleware(logger, thunk))
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>
	, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
