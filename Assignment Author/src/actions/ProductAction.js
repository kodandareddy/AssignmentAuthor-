/**
 * 
 * @description: All Product Action api are called here.
 * @exports : action defined for api call.
 * @memberof: ProductAction.js 
 * 
 */

import * as types from "./actions";
import APIUtil from "../config/APIUtil";
import UrlConstants from "../config/UrlConstants";




/**
 * @description:getting the mocky data from Api
 * @let : (url) for setting the url  for Api 
 * @returns mockyResponse from response of Api
 */

export function actionGetResponse() {
  
  let url = UrlConstants.SiteUrl;
  return function (dispatch) {
   
     return APIUtil.getMethod(url,true).then(response => {

      if (response.status === 200) {
        dispatch({
          type: types.NEWS,
          mockyResponse: response.data
        })
      } else {
        dispatch({
          type: types.NEWS,
          mockyResponse: []
        });
      } 
    })
  };
}


export const addAuther = auther => dispatch =>
 dispatch({ type: types.ADDAUTHER, auther:auther });
