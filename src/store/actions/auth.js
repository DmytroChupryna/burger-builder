import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};
export const auth = (email, password, isSingup) => {
  return despatch => {
    despatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let authKey = 'AIzaSyC8tdJkGdvBg9cUcvtjtu-0pL0TFJ5EPAQ';
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${authKey}`

    if (!isSingup) { 
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${authKey}`;
    }

    axios.post(url, authData)
      .then(res => { 
        console.log(res);
        despatch(authSuccess(res.data))
      })
      .catch(err => { 
        console.log(err);
        despatch(authFail(err))        
      })

  }
};
