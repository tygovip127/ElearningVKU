import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../api/axiosInstance';
// import {getUser} from '../../api/Common';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const GET_USER = 'GET_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const login = fcmToken => async dispatch => {
  try {
    console.log('loginToken: ', fcmToken);
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userAuth = await auth().signInWithCredential(googleCredential);
    // console.log(idToken);
    const response = await axios.post(`${BASE_URL}/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        enctype: 'multipart/form-data',
      },
      data: {
        idToken: idToken,
        fcmToken: fcmToken,
      },
    });
    const responseData = await response.data;
    const bearerToken = await responseData.token;
    dispatch({
      type: LOGIN,
      payload: bearerToken,
    });
  } catch (error) {
    console.log('Login error: ' + error.message); 
  }
};

export const getUser = token => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.data;
    dispatch({
      type: GET_USER,
      payload: user,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const autoLogin = token => dispatch => {
  dispatch({
    type: AUTO_LOGIN,
    payload: token,
  });
};

export const logout = token => async dispatch => {
  try {
    await axios.get(`${BASE_URL}/logout`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await GoogleSignin.signOut();
    const fcmToken = await AsyncStorage.removeItem('FCMTOKEN');
    console.log('remove: ', fcmToken);
    dispatch({
      type: LOGOUT,
      payload: '',
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const updateProfile = (token, phone) => async dispatch => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/null`,
      {
        data: {
          phone: phone,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    let user = response.data;
    dispatch({
      type: UPDATE_PROFILE,
      payload: user,
    });
  } catch (error) {
    console.error(error);
  }
};
