import Api from '@/services/Api'

export default{
    createPaymentIntent(userId){
        return Api().post('createPaymentIntent/'+userId)
    },

    addToOrder(userId){
        return Api().post('addToOrder/'+userId)
    },
    deleteFromCart(userId){
        return Api().post('deleteFromCart/'+userId)
    },

}