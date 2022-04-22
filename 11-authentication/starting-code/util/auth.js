import axios from 'axios';

const API_KEY = 'AIzaSyDkb8dP8u7uQlWoJ44TY68TH2X7StYtEFU';

async function authenticate(mode, email, password) {
   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

   const response = axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
   });
   // .then((res) => console.log(res))
   // .catch((error) => {
   //    if (error.response) {
   //       // The request was made and the server responded with a status code
   //       // that falls out of the range of 2xx
   //       console.log(error.response.data);
   //    } else if (error.request) {
   //       console.log(error.request);
   //    } else {
   //       console.log('Error', error.message);
   //    }
   // });
}

export async function createUser(email, password) {
   await authenticate('signUp', email, password);
}

export async function login(email, password) {
   await authenticate('signInWithPassword', email, password);
}
