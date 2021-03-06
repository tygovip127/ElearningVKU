import axios from "axios";
import { BASE_URL, BASE_URL_HEROKU, getToken } from "./Common";
import {
  ToastAndroid,
} from 'react-native'

export const getAllCategories = (setCategories) => {
  axios.get(`${BASE_URL_HEROKU}category`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    console.log(response.data)
    setCategories(response.data)
  }).catch(error => {
    console.error(error.message);
  })
}
export const createCourse = async (categoryID, courseName) => {
  const token = await getToken();
  axios.post(`${BASE_URL_HEROKU}course`, {
    categoryID: categoryID,
    courseName: courseName
  }, {
    "headers": {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  ).then(response => {
    ToastAndroid.showWithGravity("Tạo lớp học thành công!", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }).catch(error => {
    console.error(error.code)

  })
}

export const getCourses = async (setCourses) => {
  const token = await getToken();
  axios.get(`${BASE_URL}get-course-of-user`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    console.log("get courses: ", response.data);
    setCourses(response.data)
  }).catch(error => {
    console.error(error.message);
  })
}
export const getCourse = (id, setCourse, setTopics) => {
  // get course detail
  axios.get(`${BASE_URL}course/${id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    console.log(response.data)
    setCourse(response.data)
    setTopics(response.data.topics)
  }).catch(error => {
    console.error(error.message);
  })
}