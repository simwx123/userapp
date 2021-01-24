import * as actionTypes from "./actionTypes"

export function getUsers() {
  return function(dispatch: DispatchType) {
    fetch('https://jsonplaceholder.typicode.com/users', {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
      })
      .then(response => response.json())
      .then(response => {
        dispatch({
            type: actionTypes.GET_USERS,
            user:response,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}