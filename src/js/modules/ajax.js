export const ajax = request => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(request.method, request.url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", e => {
      resolve(e.target);
    });
    // xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
    xhr.send(request.data);
  });
};

