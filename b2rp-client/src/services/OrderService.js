import Api from '@/services/Api'

export default{
    getOrder(userId){
        return Api().get('getOrder/'+userId)
    },
    addReview(userId, review){
        return Api().post('addReview/'+userId, review)
    },
    updateStatusToRated(orderId){
        return Api().post('updateStatusToRated/'+orderId)
    },
}