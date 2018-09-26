export function getRedirectPath({type, avatar}) {
    //根据用户信息，返回不同的重定位路径
    let path = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar) {
        path += '-info';
    }
    return path;
}
export function getCookie(name){
    const cookieName = encodeURIComponent(name) + "=";
    let cookieValue = '';
    let locStart = document.cookie.indexOf(cookieName);
    if(locStart > -1){
        let locEnd = document.cookie.indexOf(';', locStart);
        if(locEnd === -1){
            locEnd = document.cookie.length;// 最后一个键值对
        }
        cookieValue = decodeURIComponent(document.cookie.substring(locStart + cookieName.length, locEnd));
        // 后端使用了cookie-paerser后，会有'j:'前缀: j:"5ba32ad5c27da41d58bbcd27"
        cookieValue = fixedCookieValue(cookieValue);
    }
    return cookieValue;
}
function fixedCookieValue(cookieValue){
    // 后端使用了cookie-paerser后，会有'j:'前缀: j:"5ba32ad5c27da41d58bbcd27"
    let locStart = cookieValue.indexOf('j:"');
    if(locStart > -1){
        cookieValue = cookieValue.substring(3, cookieValue.length - 1);
    }
    return cookieValue;
}