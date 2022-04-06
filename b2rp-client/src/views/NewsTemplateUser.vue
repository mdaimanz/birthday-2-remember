<template>
  <div class="">
    <v-navigation-drawer app expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Birthday2Remember
          </v-list-item-title>
          <v-list-item-subtitle>
            Hi {{$store.state.user.name}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
        
          v-for="item in dashboard_items"
          :key="item.title"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar app class="cyan lighten-3 white--text">

      <v-toolbar-title>News</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="$store.state.isUserLoggedIn" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn
      v-if="!$store.state.isUserLoggedIn"
      class="mr-2 cyan--text"
      color="white"
      to="/login"
      >
      Login
      </v-btn>

  
    </v-app-bar>
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
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shop', icon: 'mdi-shopping', path: '/shop' },
          { title: 'Cart', icon: 'mdi-cart', path: '/cart' },
          { title: 'Order', icon: 'mdi-bookmark', path: '/custorder' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          
        ],
       news_item:[],
       loggedIn: false,
     }
   },

   async mounted (){
        const response = (await NewsService.getNewsContent(this.$route.params.newsId))
        this.news_item = response.data[0]
        //console.log(response.data[0])
        // this.news_items = response.data
    },
   
   methods:{
     logout(){
       console.log("Logout")
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Home'})
     },
   }
 }
    
</script>
