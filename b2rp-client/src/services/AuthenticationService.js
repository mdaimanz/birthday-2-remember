import Api from '@/services/Api'

export default {
    register(credentials){
        return Api().post('register', credentials)
    },
    login(credentials){
        return Api().post('login', credentials)
    },
    getName(userId){
        return Api().get('getName/'+userId)
    },
    getUserInfo(userId){
        return Api().get('getUserInfo/'+userId)
    },
    editProfile(userId, info){
        return Api().post('editProfile/'+userId, info)
    },
    changePassword(userId, pass){
        return Api().post('changePassword/'+userId, pass)
    },
}