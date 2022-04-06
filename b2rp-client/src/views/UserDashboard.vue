<template>
  <div class="">
    <v-app>
    
    <v-navigation-drawer app expand-on-hover v-if="$store.state.isUserLoggedIn">
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

      <v-toolbar-title>Home</v-toolbar-title>

      <v-spacer></v-spacer>      
      <!-- copy these bruh -->
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

    <v-main>
      <v-container fluid class="mx-auto">
        <v-row class="text-center">
            
        </v-row>

        <v-row justify="center" class="pa-4">
        <v-responsive justify="center" max-width="1300" max-height="">
          <v-card-text>
            <v-carousel cycle hide-delimiters 
            class="rounded-xl">
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-responsive>
        
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
      </v-container>
    </v-main>
      <v-footer bottom padless app class="mt-10">
    <v-col
      class="cyan lighten-3 white--text text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Birthday 2 Remember Platform</strong>
    </v-col>
  </v-footer>
    </v-app>
 
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
        items: [
          {
            src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1089&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1586985289906-406988974504?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
          },
        ],
        right: null,
        carousell_items: [
          {
            src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1089&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1586985289906-406988974504?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
          }
          
        ],
        news_items:[],
        
     }
   },
   async mounted (){
        const response = (await NewsService.getNews())
        this.news_items = response.data
        // console.log(response.data)
        // this.news_items = response.data
      },
   //sample method
   methods:{
     logout(){
       console.log("Logout")
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Home'})
     },
     goToNewsPage(newsId){
      let news_path = '/newsuser/'+newsId
      this.$router.push({ path: news_path})
    }
    
   }
 }
    
</script>
