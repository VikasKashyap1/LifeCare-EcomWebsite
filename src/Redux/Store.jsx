import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./Reducers/RootReducer"
import RootSaga from "./Sagas/Service/RootSaga"
import createSagamiddleware from 'redux-saga'

const saga = createSagamiddleware()
const Store = configureStore({
     reducer: RootReducer,
     middleware: () => [saga]
})
export default Store
saga.run(RootSaga)

