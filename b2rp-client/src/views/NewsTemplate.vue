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
          to="/news"
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
      <v-row justify="center" class="pa-10">
      </v-row>

      <v-row justify="center" class="pa-4">
        <v-card
          class="mx-auto"
          max-width="800"
        >
          <v-img
            :src="news_item.image_path"
            height="200px"
          ></v-img>
          <v-row justify="center" class="pt-4">
          <v-card-title>
            {{news_item.news_title}}
          </v-card-title>
          </v-row>
          <v-row justify="center" class="pt-0">
          <v-card-subtitle>
            {{news_item.post_date}}
          </v-card-subtitle>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-card-text justify="center" class="pa-5 ma-5">
              {{news_item.news_content}}
            </v-card-text>
          </v-row>

        </v-card>
      </v-row>

    </v-main>


    <v-footer app bottom padless  class="mt-10">
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
       news_item:[]
     }
   },

   async mounted (){
        const response = (await NewsService.getNewsContent(this.$route.params.newsId))
        this.news_item = response.data[0]
        //console.log(response.data[0])
        // this.news_items = response.data
    },
   
   methods:{
     
   }
 }
    
</script>
