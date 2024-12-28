import { ADD_CHACKOUT, DELETE_CHACKOUT, GET_CHACKOUT, UPDATE_CHACKOUT } from "../Constants";

export function createChackout(data) {
     return {
          type: ADD_CHACKOUT,
          payload: data
     }
}

export function getChackout() {
     return {
          type: GET_CHACKOUT,

     }
}
export function updateChackout(data) {
     return {
          type: UPDATE_CHACKOUT,
          payload: data

     }
}
export function deleteChackout(data) {
     return {
          type: DELETE_CHACKOUT,
          payload: data
     }
}