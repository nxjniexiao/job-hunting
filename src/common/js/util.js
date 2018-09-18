export function getRedirectPath({type, avatar}) {
    //根据用户信息，返回不同的重定位路径
    let path = type==='boss'? '/boss' : '/genius';
    if(!avatar) {
        path += '-info';
    }
    return path;
}