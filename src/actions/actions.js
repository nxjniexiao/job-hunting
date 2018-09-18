import axios from "axios";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

//注册成功
function registerSuccess(info) {
    return {
        type: REGISTER_SUCCESS,
        info: info
    }
}
// Thunk(返回一个函数)
export function register({username, pwd, type}) {
    return dispatch => {
        axios.post('/user/register', {username, pwd, type})
            .then((res) => {
                console.log(res);// res.data：返回的json
                if (res.status === 200 && res.data.code === 0) {
                    // 注册成功
                    dispatch(registerSuccess(res.data.info));
                }
                if (res.status === 200 && res.data.code === 1) {
                    // 注册失败
                }
            });
    }
}