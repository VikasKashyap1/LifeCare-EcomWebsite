// 1. Saga
     // Redux-Saga is a library that helps manage side effects (such as data fetching, caching, 
     // or browser navigation) in your Redux application. 
     // It is a Redux middleware, which means it is code that runs between dispatching an action and 
     // the reducer handling the action.

     // Example:
     // javascript
     // import { call, put, takeEvery } from 'redux-saga/effects';
     // import axios from 'axios';

     // // Worker Saga
     // function* fetchData(action) {
     //     try {
     //         const response = yield call(axios.get, 'https://api.example.com/data');
     //         yield put({ type: 'FETCH_SUCCEEDED', payload: response.data });
     //     } catch (error) {
     //         yield put({ type: 'FETCH_FAILED', error });
     //     }
     // }

     // // Watcher Saga
     // function* watchFetchData() {
     //     yield takeEvery('FETCH_REQUESTED', fetchData);
     // }

     // export default watchFetchData;
// 2. Reducer
     // A reducer is a pure function that takes the current state and an action as input and returns a new state. 
     // It determines how the state should change in response to an action.

     // Example:
     // javascript
     
     // const initialState = {
     //     count: 0
     // };

     // function counterReducer(state = initialState, action) {
     //     switch (action.type) {
     //         case 'INCREMENT':
     //             return { ...state, count: state.count + 1 };
     //         case 'DECREMENT':
     //             return { ...state, count: state.count - 1 };
     //         default:
     //             return state;
     //     }
     // }
// 3. Action Creator
     // An action creator is a function that creates and returns an action object. An action 
     //  object typically has at least a type property that indicates the type of action being performed.

     // Example:
     // javascript
     // Copy code
     // // Action Types
     // const INCREMENT = 'INCREMENT';
     // const DECREMENT = 'DECREMENT';

     // // Action Creators
     // function increment() {
     //     return {
     //         type: INCREMENT
     //     };
     // }

     // function decrement() {
     //     return {
     //         type: DECREMENT
     //     };
     // }
     // Usage in Redux Flow
     // Action: An action creator is called as a result of user interaction or some other event, which returns an action object.
     // Reducer: The action object is passed to the reducer, which creates a new state based on the current state and the action.
     // Saga: If side effects need to be managed, the saga intercepts the action, handles the necessary side effects, and dispatches new actions as a result.
     // These three main components work together to make state management in Redux easier and more organized.








