export async function recordData(collection, payload) {

     let response = await fetch(`http://localhost:8000/${collection}`, {
          method: "POST",
          headers: {
               "content-type": "application/json"
          },
          //body: payload
          body: JSON.stringify(payload)
     })
     return await response.json()



}
export async function recordMultipartData(collection,payload) {
     let response = await fetch(`http://localhost:8000/${collection}`, {
          method: "POST",
          headers: {

          },
          body: payload
     })
     return await response.json()
}


export async function getData(collection, payload) {
     try {
               let response = await fetch(`http://localhost:8000/${collection}`, {
          method: "GET",
          headers: {
               "content-type": "application/json"
          },
          // body: payload
     })
     // console.log(response);
     return await response.json()

     } catch (error) {
          console.error('getData:', error);
     }
}
export async function updateData(collection, payload) {
     let response = await fetch(`http://localhost:8000/${collection}/${payload.id}`, {
          method: "PUT",
          headers: {
               "content-type": "application/json"
          },//
          body: JSON.stringify(payload)
     })
     return await response.json()
}
export async function updateMultipartData(collection, payload) {
     let response = await fetch(`http://localhost:8000/${collection}/${payload.id}`, {
          method: "PUT",
          headers: {
               // "content-type": "application/json"
          },
          body: payload
     })
     return await response.json()
}
export async function deleteData(collection, payload) {
     let response = await fetch(`http://localhost:8000/${collection}/${payload.id}`, {

          
         method: "DELETE",
         headers: {
             "content-type": "application/json"
         }
     }) 
     return await response.json()
 }

