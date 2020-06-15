/**
 *
 * @description Redux reducer : all the cases of redux used in the entier project is defined here.
 */

import * as types from "../actions/actions";

/**
 * @description Initial state / default state value
 * @memberof: reducers
 * @constant products for the products in the application
 * @constant totalProduct for shwoing the initaial value
 * @constant createCustomer for customer detail initaily kept as an empty object.
 */
const initialState = {
  Data: [],
  auther:""
};

const reducer = (state, action) => {
  console.log("reducer -> action", action)
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    //set state data to initial state and return to action

    case types.NEWS:
      return Object.assign({}, state, {
        newsInformation: action.mockyResponse,
      });


    case types.ADDAUTHER: 
      return Object.assign({}, state, {
        auther: action.auther,
      });
    default:
      // need this for default case
      return state;
  }
};
export default reducer;
