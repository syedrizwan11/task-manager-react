import axios from "axios"
import {
  LOGIN_API_URL,
  LOGOUT_API_URL,
  SIGNUP_API_URL,
  TOKEN_DECODE_API_URL,
} from "../constants"

export const loginApi = (userData) =>
  axios
    .post(LOGIN_API_URL, userData, { withCredentials: true })
    .then((res) => res.data)

export const logoutApi = () =>
  axios
    .post(LOGOUT_API_URL, {}, { withCredentials: true })
    .then((res) => res.data)

export const signupApi = (userData) =>
  axios
    .post(SIGNUP_API_URL, userData, { withCredentials: true })
    .then((res) => res.data)

export const decodeTokenApi = () =>
  axios
    .get(TOKEN_DECODE_API_URL, { withCredentials: true })
    .then((res) => res.data)
