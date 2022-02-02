import Api from '@/services/Api'

export default{
    getAllSales(user_id){
        return Api().get('getAllSales/'+user_id)
    },

    deleteSales(user_id, sales_id){
        return Api().post('deleteSales/'+user_id+'/'+sales_id)
    },

    getSales(sales_id){
        return Api().get('getSales/'+sales_id)
    },

    editSales(user_id, sales_id, sales){
        return Api().post('editSales/'+user_id+'/'+sales_id, sales)
    },

    addSales(user_id, sales){
        return Api().post('addSales/'+user_id, sales)
    }
}