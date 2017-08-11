/**
 * Created by wuyunqiang on 2017/6/12.
 */

import {DeviceEventEmitter} from 'react-native';


const HOST = 'http://172.28.111.198:887/api.php';

function toParameterString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                if (!val2) val2 = "";
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        if (!val) val = "";
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

export default class HttpRequest {
    constructor() {
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleResponse(response) {

        console.log('response',response);
        const resJson = JSON.parse(response.body);
        if(resJson.status !== '000000'&&resJson.status !== 200){
            return false;
        }
        if (response.err)
            throw response.err;
        return resJson;
    }



    async GET(url) {
        let result = await fetch(HOST + url , {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Cookie':'PHPSESSID=2psj93stkrg339qnkdj1qgjok7',
                'Accept': 'application/json',
                // 'Content-Type': 'application/json;charset=UTF-8'
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(this.handleResponse).catch((error) => {
            console.log(error)
        });

        return result;
    }

    async POST(url, params,headers) {
        let result = await fetch(HOST + url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Cookie':'PHPSESSID=2psj93stkrg339qnkdj1qgjok7',
                'Accept': 'application/json',
                // 'Content-Type': 'application/json;charset=UTF-8'
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        }).then(this.handleResponse).catch((error) => {
            Log(error);
        });
        return result;
    }

    async POSTBODY(url, pars, headers, security) {

        let result = await fetch(HOST + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                // ...HEADERS,
                ...headers,
            },
            body: JSON.stringify(pars)
        }).then(this.handleResponse).catch((error) => {
            Log(error);
        });
        return result;
    }

    // type : 'image/png'  'image/jpeg'
    // async POSTIMAGE(imageSource, type, headers, security) {
    //
    //     let formData = new FormData();
    //     let file = {uri: imageSource, type: type, name: 'jpg'};
    //     formData.append('file', file);
    //
    //     let HEADERS = {
    //         'Content-Type': 'multipart/form-data'
    //     };
    //     let result = await fetch(HOST + imageURL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             ...HEADERS,
    //             ...headers,
    //         },
    //         body: formData
    //     }).then((response) => response.json()).catch((error) => {
    //         Log(error);
    //     });
    //
    //     return result;
    // }
}

global.HttpUtil = new HttpRequest();

