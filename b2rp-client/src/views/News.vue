<template>
  <div class="">
    <v-toolbar  elevation="10">
      <img class="mr-3 my-5" :src="require('../assets/Untitled-1.png')" height="60" width="180" />
      <v-toolbar-title></v-toolbar-title>
      <v-col class="text-left my-5">
        <v-btn
        class=""
        plain
        color="cyan"
        to="/"
        >
          Home
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
        >
          Shop
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
        >
          News
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
          to="/location"
        >
          Location
        </v-btn>
        
        <v-btn
          class=""
          plain
          color="cyan"
        >
          About Us
        </v-btn>
      </v-col>
    

    <v-col class="text-right my-5">
      <v-btn
      class="mr-2 white--text"
      color="cyan"
      to="/login"
    >
      Login
    </v-btn>
    <v-btn
      class="mr-5"
      outlined
      color="cyan"
      to="/register"
    >
      Register
    </v-btn>
    </v-col>
    </v-toolbar> 
    <v-main class="pt-3">
      
      <v-row justify="center" class="pa-4">
        
      </v-row>
      
      <v-row justify="center" class="pa-10">
        
        <div class="display-1">
          News
        </div>
      </v-row>

      <v-row v-for="item in news_items"
          :key="item.news_items">
        <v-card
          class="mx-auto mb-5"
          width="1080"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{item.post_date}}
              </div>
                  <v-list-item-title class="text-h4 mb-1">
                    {{item.news_title}}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{item.news_content}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-img       
                    :src="item.image_path"
                    max-height="200px"
                    max-width="300px"
              ></v-img>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  class="cyan lighten-2 white--text"
                  outlined
                  rounded
                  text
                  @click="goToNewsPage(item.news_id)"
                >
                  Read
                </v-btn>
              </v-card-actions>
         </v-card>
    </v-row>


    </v-main>


    <v-footer bottom padless class="mt-10">
    <v-col
      class="cyan lighten-3 white--text text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Birthday 2 Remember Platform</strong>
    </v-col>
  </v-footer>
  </div>
</template>

<script>
import NewsService from '@/services/NewsService'
 export default {
   data(){
     return{
        news_items:[]

     }
   },
   computed:{
      
  },
   async mounted (){
        const response = (await NewsService.getNews())
        this.news_items = response.data
        console.log(response.data)
        // this.news_items = response.data
      },
   //sample method
   methods:{
    goToNewsPage(newsId){
      let news_path = '/news/'+newsId
      this.$router.push({ path: news_path})
    }
     
   }
 }
    
</script>
