import { ajax } from "./ajax";

export const crearTarea = (uri, data) => {
  const request = {
    method: 'POST',
    url: uri,
    data: JSON.stringify(data)
  }

  ajax(request)
  .then(res => {
    console.log(res.responseText)
  })
}


