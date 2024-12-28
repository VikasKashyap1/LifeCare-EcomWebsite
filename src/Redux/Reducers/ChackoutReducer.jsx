import { ADD_CHACKOUT_RED, DELETE_CHACKOUT_RED, GET_CHACKOUT_RED, UPDATE_CHACKOUT_RED } from "../Constants";

export default function chackoutReducer(state = [], action) {
     let newState, index
     switch (action.type) {
          case ADD_CHACKOUT_RED:
               newState = [...state]
               newState.push(action.payload)
               return newState

          case GET_CHACKOUT_RED:
               return action.payload

          case UPDATE_CHACKOUT_RED:
               index = state.findIndex((x) => x.id === action.payload.id)
               state[index].order = action.payload.order
               state[index].paymentMode = action.payload.paymentMode
               state[index].paymentStatus = action.payload.paymentStatus
               state[index].rppid = action.payload.rppid
               state[index].address = action.payload.address
               return state

          case DELETE_CHACKOUT_RED:
               return state.filter((x) => x.id !== action.payload.id)
          default:
               return state


     }

}
