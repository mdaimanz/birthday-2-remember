import Api from '@/services/Api'

export default {
    register(credentials){
        return Api().post('register', credentials)
    },
    login(credentials){
        return Api().post('login', credentials)
    },
    logout(){
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Home'})
    }
}