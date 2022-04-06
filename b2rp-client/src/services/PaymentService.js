import Api from '@/services/Api'

export default{
    createPaymentIntent(userId){
        return Api().post('createPaymentIntent/'+userId)
    },
    savePaymentRecord(userId, billingDetails){
        return Api().post('savePaymentRecord/'+userId, billingDetails)
    },
    applyPromotionCode(userId,code){
        return Api().post('applyPromotionCode/'+userId, code)
    },

    addToOrder(userId){
        return Api().post('addToOrder/'+userId)
    },
    deleteFromCart(userId){
        return Api().post('deleteFromCart/'+userId)
    },

    
}