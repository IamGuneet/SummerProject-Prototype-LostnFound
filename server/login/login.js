function checkUser(loginCred,username,password){
    if(loginCred.username === username && loginCred.password === password){
        return true
    }else{
        return false
    }
}

module.exports = checkUser