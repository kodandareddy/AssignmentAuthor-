/**
 * @description Class with functions with post, put, get, delete method api call
 */
import Axios from "axios";
import UrlConstants from './UrlConstants'


class APIUtil {

    /**
     * 
     * @description action to call get api with/without auth token
     * @param {*} url - API URL
     * @memberof APIUtil
     */
    getMethod(url,auth) {
       
            var headersSet = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            return Axios({
                method: 'get',
                url: url,
                headers: headersSet
            }).then(response => response).catch(error =>{ 
               console.log('ERROR',error)
            });
        }

    



}
export default  (new APIUtil());