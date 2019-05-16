import {ajax} from "./ajax"

export const actualizarTarea = (uri, data) => {
  const request = {
    method: 'POST',
    url: uri,
    data: JSON.stringify(data)
  }
  
  ajax(request)
  // .then(res => {

  // })
}