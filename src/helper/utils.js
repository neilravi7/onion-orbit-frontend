export function getUserAccess(){
    return JSON.parse(window.localStorage.getItem('access'));
}

export function getUserAccessRefresh(){
    return JSON.parse(window.localStorage.getItem('access'));
}

export function isUserAuthenticated(){
    return window.localStorage.getItem('access') ? true : false;
}

export function hasUser(){
    return window.localStorage.getItem('userInfo') ? true : false;
}

export function getUserDetails(){
    if(hasUser()){
        return JSON.parse(window.localStorage.getItem('userInfo'));
    }else{
        return {}
    }
}

export function getUserId(){
    const token = window.localStorage.getItem('access');
    if(token){
        const [, payload] = token.split(".");
        const decoded = window.atob(payload);
        return JSON.parse(decoded).user_id
    }else{
        return null
    }
}


export function getUserRole(){
    const user = getUserDetails();
    return user?.user_role
}




