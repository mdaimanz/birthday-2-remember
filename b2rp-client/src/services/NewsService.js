import Api from '@/services/Api'

export default{
    getNews(){
        return Api().get('getNews')
    },
    getNewsContent(news_id){
        return Api().get('getNewsContent/'+news_id)
    },
    addNews(news){
        return Api().post('addNews', news)
    },
    deleteNews(news_id){
        return Api().post('deleteNews/'+news_id)
    },
    editNews(news_id,news){
        return Api().post('editNews/'+news_id, news)
    }


}