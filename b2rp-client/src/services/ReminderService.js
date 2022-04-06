import Api from '@/services/Api'

export default{
    getAllReminder(user_id){
        return Api().get('getAllReminder/'+user_id)
    },

    deleteReminder(user_id, remind_id){
        return Api().post('deleteReminder/'+user_id+'/'+remind_id)
    },

    getReminder(remind_id){
        return Api().get('getReminder/'+remind_id)
    },

    editReminder(user_id, remind_id, reminder){
        return Api().post('editReminder/'+user_id+'/'+remind_id, reminder)
    },

    addReminder(user_id, reminder){
        return Api().post('addReminder/'+user_id, reminder)
    }
}


