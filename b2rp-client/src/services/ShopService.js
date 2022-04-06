import Api from '@/services/Api'

export default{
    getAllProduct(){
        return Api().get('getAllProduct')
    },

    getItemCategory(){
        return Api().get('getItemCategory')
    },

    getProduct(productId){
        return Api().get('getProduct/'+productId)
    },

    getUserRecommendation(userId){
        return Api().get('getUserRecommendation/'+userId)
    },
    
    getReview(productId){
        return Api().get('getReview/'+productId)
    },

    getUserCart(userId){
        return Api().get('getUserCart/'+userId)
    },

    deleteCartItem(userId, productId){
        return Api().post('deleteCartItem/'+userId+'/'+productId)
    },

    addToCart(userId, productId, item){
        return Api().post('addToCart/'+userId+'/'+productId, item)
    },

    editProductQuantity(userId, productId, quantity){
        return Api().post('editProductQuantity/'+userId+'/'+productId, quantity)
    },

    

    



    
}