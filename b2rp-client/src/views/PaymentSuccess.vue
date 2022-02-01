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

      <v-toolbar-title>Checkout</v-toolbar-title>

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

      <v-btn icon v-if="$store.state.isUserLoggedIn" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

  
    </v-app-bar>

    <v-main>
      <v-container fluid class="mx-auto">
        
        <v-row>
        <v-text class="display-1 mb-2">
          Payment Successful
        </v-text>
        </v-row>

        <v-row>
        <v-text class="subtitle-1 mb-5">
          Your order has been submitted
        </v-text>
        </v-row>

        <v-row>
          <v-btn
            depressed
            color="primary"
            @click="redirectToShop"
          >
            Continue Shopping
          </v-btn>
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

 export default {
   data(){
     return{
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shop' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/newsandpromo' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          
        ],
        
     }
   },
   //sample method
   methods:{

     logout(){
       console.log("Logout")
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Home'})
     },
     
     redirectToShop(){
       this.$router.push({name: 'Shop'})
     },
     
     
   }
 }
    
</script>
