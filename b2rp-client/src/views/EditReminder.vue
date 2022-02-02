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

      <v-toolbar-title>Edit Reminder</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="$store.state.isUserLoggedIn">
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
      

      <v-btn icon v-if="$store.state.isUserLoggedIn">
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>

      <v-btn icon v-if="$store.state.isUserLoggedIn" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn
      class="mr-2 cyan--text"
      color="white"
      v-if="!$store.state.isUserLoggedIn"
      to="/login"
      >
      Login
      </v-btn>

  
    </v-app-bar>

    <v-main>
      <!-- error alert -->
      <v-alert
      dense
      outlined
      class="ma-5"
      type="error"
      v-if="error"
    >
    {{error}}
    </v-alert>
      <v-container fluid class="mx-auto">
        <v-row class="text-center">
            <v-card
              class="mx-auto my-12"
              width="800"
            >
            <v-row class="px-5">
             <v-card-title class="display-1 pt-10">
                Edit Reminder
            </v-card-title>
            </v-row>
            <form class="pa-10">
               <v-row>
                  <v-text-field
                    v-model="reminder.title"
                    label="Title"
                    required
                  ></v-text-field>
                 
               </v-row>
               <v-row>
                  <v-text-field
                    v-model="reminder.description"
                    
                    label="Description"
                    required
                  ></v-text-field>
               </v-row>
               <v-row>
                 <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="reminder.remind_date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="reminder.remind_date"
                        label="Remind Date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reminder.remind_date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(reminder.remind_date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
              </v-row>
              <v-row>
                    <v-menu
                      ref="menu_time"
                      v-model="menu_time"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="reminder.remind_time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="reminder.remind_time"
                          label="Remind Time"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu_time"
                        v-model="reminder.remind_time"
                        full-width
                        @click:minute="$refs.menu_time.save(reminder.remind_time)"
                      ></v-time-picker>
                    </v-menu>
                </v-row>
                <v-row class="mt-10" justify="center">
                  <v-btn
                  
                  class="mr-4 white--text"
                  type="submit"
                  color="cyan"
                  @click="saveReminder"
                >
                  save
                </v-btn>
                <v-btn @click="clear">
                  clear
                </v-btn>
                </v-row>
            </form>
            
            </v-card>
        </v-row>

        <v-row justify="center" class="pa-4">  
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
import ReminderService from '@/services/ReminderService'

 export default {
   
   data(){
     return{
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shop' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/newsandpromo' },
          { title: 'Sales', icon: 'mdi-sale', path: '/sales' },
          { title: 'Product', icon: 'mdi-package-variant', path: '/product' },
          { title: 'Promotion', icon: 'mdi-ticket-percent', path: '/promotion' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          
        ],
        error:'',
        right: null,
        reminder: [],        
        menu_time: false,
        modal_time: false,
        menu: false,
        modal_date: false,
        menu2: false,
       
     }
   },
   mounted:{
     async getReminder(){
       console.log("Params: "+this.$route.params.remindId.toString())
       this.reminder = (await ReminderService.getReminder(this.$route.params.remindId)).data
       console.log(this.reminder)
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
     clear () {
        this.remind_id = ''
        this.title = ''
        this.description = ''
        this.remind_date = ''
        this.remind_time = ''
        this.$refs.observer.reset()
     },

     saveReminder(){
       console.log(this.title)
       console.log(this.description)
       console.log(this.remind_date)
       console.log(this.remind_time)
     }

     
     
   }
 }
    
</script>
