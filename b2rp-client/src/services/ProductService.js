import Api from '@/services/Api'

export default{
    getAllProduct(user_id){
        return Api().get('getAllProduct/'+user_id)
    },

    deleteProduct(user_id, product_id){
        return Api().post('deleteProduct/'+user_id+'/'+product_id)
    },

    getProduct(product_id){
        return Api().get('getProduct/'+product_id)
    },

    editProduct(user_id, product_id, product){
        return Api().post('editProduct/'+user_id+'/'+product_id, product)
    },

    addProduct(user_id, product){
        return Api().post('addProduct/'+user_id, product)
    },
}