import Api from '@/services/Api'

export default{
    getNews(){
        return Api().get('getNews')
    },
    getNewsContent(news_id){
        return Api().get('getNewsContent/'+news_id)
    }

}