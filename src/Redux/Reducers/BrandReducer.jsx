import { ADD_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED } from "../Constants";

export default function brandReducer(state = [], action) {
     let newState, index
     switch (action.type) {
          case ADD_BRAND_RED:
               newState = [...state]
               newState.push(action.payload)
               return newState

          case GET_BRAND_RED:
               return action.payload

          case UPDATE_BRAND_RED:
               index = state.findIndex((x) => x.id === action.payload.id)
               state[index].name = action.payload.name
               return state

          case DELETE_BRAND_RED:
               return state.filter((x) => x.id !== action.payload.id)
          default:
               return state


     }

}
