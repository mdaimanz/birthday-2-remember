<template>
  <div class="">
    <v-app>
    
    <v-navigation-drawer app expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Birthday2Remember
          </v-list-item-title>
          <v-list-item-subtitle>
            Hi user!
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

      <v-toolbar-title>News and Promo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-badge
        content="6"
        color="green"
        overlap
      >
        <v-icon>
          mdi-bell
        </v-icon>
      </v-badge>

      </v-btn>
      

      <v-btn icon>
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>

       

      
    </v-app-bar>

    <v-main>
      <v-container fluid class="mx-auto">
        <v-row class="text-center">
            
        </v-row>


        <v-row justify="center" class="pa-10">
        
        <div class="display-1">
          Latest Promotion
        </div>
      </v-row>
        <v-row justify="center" class="pt-1">
        
        
        <v-col v-for="item in promo_items"
          :key="item.promo_id"> 
          <v-card
          class="mx-auto"
          max-width="344"
          >
            <v-img
              :src="item.picture_path"
              height="200px"
            ></v-img>

            <v-card-title>
              {{item.title}}
            </v-card-title>

            <v-card-subtitle>
              {{item.description}}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="cyan lighten-2"
                text
                to="item."
              >
                Learn more
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>   
    </v-row>

    <v-row justify="center" class="pa-10">
        
        <div class="display-1">
          Latest News
        </div>
    </v-row>

  <v-row v-for="item in news_items"
          :key="item.news_id">
  <v-card
    class="mx-auto mb-2"
    width="1080"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{item.news_date}}
        </div>
            <v-list-item-title class="text-h4 mb-1">
              {{item.headline}}
            </v-list-item-title>
            <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-img       
              :src="item.picture_path"
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
            to=""
          >
            Read 
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-row>


      </v-container>
    </v-main>
      <v-footer padless app class="mt-10">
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
 export default {
   data(){
     return{
       promo_items: [
         { promo_id: '1',
           title: 'Membership Promotion', 
           description: 'Not registered as member yet? Register now and enjoy our membership promotion', 
           picture_path: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
           path: '/promo1'
         },
         { promo_id: '2',
           title: 'Christmas Sale', 
           description: 'Merry Christmas', 
           picture_path: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
           path: '/promo1'
         },
         { promo_id: '3',
           title: 'Christmas Sale', 
           description: 'Merry Christmas', 
           picture_path: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
           path: '/promo1'
         },
       ],
       news_items:[
         {
           news_id:'1',
           news_date: '7/2/2020',
           headline: 'New Branch Launches in Kuala Lumpur',
           description: 'Introducing to you our new branch ',
           picture_path: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
         },
         {
           news_id:'2',
           news_date: '8/2/2020',
           headline: 'New Branch',
           description: 'Introducing to you our new branch ',
           picture_path: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
         }

       ],
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shopping' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/news' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          { title: 'Logout', icon: 'mdi-logout', path: '/logout' },
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
        
     }
   },
   //sample method
   methods:{
     addTask(){
       let newTask = {
         id: Date.now(),
         title: this.newTaskTitle,
         done: false
       }
       this.tasks.push(newTask);
       this.newTaskTitle = ''
     },
     
     
   }
 }
    
</script>
