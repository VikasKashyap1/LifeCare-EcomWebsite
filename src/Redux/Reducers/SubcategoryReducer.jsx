import { ADD_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED } from "../Constants";

export default function subcategoryReducer(state = [], action) {
     let newState, index
     switch (action.type) {
          case ADD_SUBCATEGORY_RED:
               newState = [...state]
               newState.push(action.payload)
               return newState

          case GET_SUBCATEGORY_RED:
               return action.payload

          case UPDATE_SUBCATEGORY_RED:
               index = state.findIndex((x) => x.id === action.payload.id)
               state[index].name = action.payload.name
               return state

          case DELETE_SUBCATEGORY_RED:
               return state.filter((x) => x.id !== action.payload.id)
          default:
               return state


     }

}
