import {ADD_COURSES, GET_COURSES, GET_COURSE_OF_USER} from '../actions/courseActions';

const initialState = {
  courses: [],
};
const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_OF_USER:
      return {
        ...state,
        courses: action.payload,
      };
    default:
      return state;
  }
};

export default coursesReducer;
