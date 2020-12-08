import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';

//reducers
import genresReducer from "./reducers/genresReducer" //SET_GENRES (must match function*: getGenresSaga)
import moviesReducer from "./reducers/moviesReducer" //SET_MOVIES (must match functions*: getMoviesSaga)
import postNewMoviesReducer from "./reducers/postNewMoviesReducer" //POST_MOVIE (must match functions*: postNewMoviesSaga)
import detailsReducer from "./reducers/detailsReducer" //SELECTED_MOVIE (must match function*: detailsSaga)

//SAGA
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('REFRESH_MOVIES', getMoviesSaga);
    yield takeEvery('FETCH_GENRES', getGenresSaga);
    yield takeEvery ('DETAILS', detailsSaga);
    yield takeEvery('REFRESH_DETAILS', getMoviesSaga);
    yield takeEvery('ADD_MOVIE', postNewMoviesSaga);

}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


function* getMoviesSaga(action) {
    console.log('GETMoviesSaga with', action);
    let response = yield axios({
        method: "GET",
        url: '/api/movie/'
    });
    console.log('getMoviesSaga in index.js', response.data);
    yield put({
        type: "SET_MOVIES",
        payload: response.data
    });
}

function* postNewMoviesSaga(action) {
    console.log('POST newMoviesSaga with', action);
    yield axios({
        method: "POST",
        url: '/api/movie/',
        data: action.payload
    });
    yield put({
        type: "REFRESH_MOVIES" //get latest data
    });
}


function* detailsSaga(action) {
    console.log('DETAILSSaga with', action.payload);
    let response = yield axios({
        method: "GET",
        url: `/api/movie/details/${action.payload.id}`
    })
    yield put({
        type: "SELECTED_MOVIE",
        url: `/api/movie/details/${action.payload.id}`,
        payload: response.data
    });
}

function* getGenresSaga(action) {
    console.log('GETGenresSaga with', action);
    let response = yield axios({
        method: "GET",
        url: '/api/genre'
    });
    console.log('getGenresSaga in index.js', response.data);
    yield put({
        type: "SET_GENRES",
        payload: response.data
    });
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        moviesReducer,
        genresReducer,
        detailsReducer,
        postNewMoviesReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={storeInstance}>
            <App/>
       </Provider>, 
    document.getElementById('root')
    );
registerServiceWorker();
