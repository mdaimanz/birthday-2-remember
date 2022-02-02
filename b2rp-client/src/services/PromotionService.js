import Api from '@/services/Api'

export default{
    getAllPromotion(user_id){
        return Api().get('getAllPromotion/'+user_id)
    },

    deletePromotion(user_id, promo_id){
        return Api().post('deletePromotion/'+user_id+'/'+promo_id)
    },

    getPromotion(promo_id){
        return Api().get('getPromotion/'+promo_id)
    },

    editPromotion(user_id, promo_id, promotion){
        return Api().post('editPromotion/'+user_id+'/'+promo_id, promotion)
    },

    addPromotion(user_id, promotion){
        return Api().post('addPromotion/'+user_id, promotion)
    }
}