import axios from "axios"
import {
  GET_CURRENT_USER_API_URL,
  UPDATE_USER_PROFILE_API_URL,
  USER_API_URL,
  USER_COUNT_API_URL,
} from "../constants"

export const fetchUsersApi = async () =>
  axios.get(USER_API_URL, { withCredentials: true }).then((res) => res.data)

export const fetchCurrentUserApi = async () =>
  axios.get(`${GET_CURRENT_USER_API_URL}`, {
    withCredentials: true,
  })

export const deleteUserApi = async (userId) =>
  axios
    .delete(`${USER_API_URL}/${userId}`, { withCredentials: true })
    .then((res) => res.data)

export const createUserApi = async (userData) =>
  axios
    .post(USER_API_URL, userData, { withCredentials: true })
    .then((res) => res.data)

export const updateUserProfileApi = async (userData) =>
  axios
    .patch(UPDATE_USER_PROFILE_API_URL, userData, { withCredentials: true })
    .then((res) => res.data)

export const userCountApi = () =>
  axios
    .get(USER_COUNT_API_URL, { withCredentials: true })
    .then((res) => res.data)
