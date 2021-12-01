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

      <v-toolbar-title>Home</v-toolbar-title>

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
          <v-card
          class="mx-auto"
          width="900"
          outlined
          >
    <v-tabs
      v-model="tab"
      background-color="cyan darken-1 white--text"
      fixed-tabs
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab_1">
        Account Information
        <v-icon background-color="cyan lighten-3">mdi-account-wrench</v-icon>
      </v-tab>

      <v-tab href="#tab_2">
        Change password
        <v-icon>mdi-key-change</v-icon>
      </v-tab>

      <v-tab href="#tab_3">
        Reminder options
        <v-icon>mdi-bell-ring</v-icon>
      </v-tab>

      <v-tab href="#tab_4">
        Delete account
        <v-icon>mdi-account-alert</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">

      <v-tab-item :key="1" value="tab_1">
        <v-card>
          <div class="pa-10">
            <v-row justify="center">
              <v-avatar 
                color="cyan"
                size="100"
              >
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-row>

            <v-row justify="center" class="pt-1">
              <v-col>
                <v-card-text>
                  <div class="title">
                    <p>User ID: <span class="blue-grey lighten-5 ma-5 rounded-r-xl">{{id_num}}</span></p>
                  </div>
                </v-card-text>
              </v-col>
              
            </v-row>

            <v-row justify="center" class="ma-0">
               
            </v-row>

            <v-row justify="center" class="ma-0">
              <v-col>
                <v-card-text>
                  <div class="title">
                    <p>Full Name</p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p>{{name}}</p>
                  </div>
                </v-card-text>
              </v-col>

              <v-col>
                <v-card-text>
                  <div class="title">
                    <p>Email Address</p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p>{{email}}</p>
                  </div>
                </v-card-text>
              </v-col>

            </v-row>

            <v-row justify="center" class="ma-0">
              <v-col>
              <v-card-text>
                  <div class="title">
                    <p>Phone Number</p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p>{{phone_num}}</p>
                  </div>
                </v-card-text>
              </v-col>

              <v-col>
              <v-card-text>
                  <div class="title">
                    <p></p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p></p>
                  </div>
                </v-card-text>
              </v-col>


            </v-row>

            <v-row justify="center" class="ma-0">
              <v-card-actions>
                <v-btn
                  color="cyan darken-1 white--text"
                  @click="EditProfile()"
                >
                  Edit Profile
                </v-btn>
              </v-card-actions>
            </v-row>
          
          
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :key="2" value="tab_2">
        <v-row justify="center" class="mt-5">
            <v-card-text>
                  <div class="subtitle-1">
                    <p>Click button below to change your password</p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p></p>
                  </div>
                </v-card-text>  
         </v-row>
        <v-row justify="center" class="mb-5">
              <v-card-actions>
                <v-btn
                  color="cyan darken-1 white--text"
                  @click="ChangePassword()"
                >
                  Change Password
                </v-btn>
              </v-card-actions>
            </v-row>
      </v-tab-item>

      <v-tab-item :key="3" value="tab_3">
        <v-row justify="center" class="ma-10">
          <div class="subtitle-1">
           <p>Tick the checkbox to enable the chosen medium to receive the reminder or untick to disable them. Please click the 'Save Changes' button to save your changes.</p>
          </div>
        </v-row>
        <v-row justify="center" class="ma-6" >
        <v-card>
            <v-row>
              <v-col>
                <v-checkbox
                  class="ma-6"
                  v-model="checkbox1"
                  :label="`Whatsapp`"
                ></v-checkbox>
                <v-checkbox
                class="ma-6"
                  v-model="checkbox2"
                  :label="`SMS`"
                ></v-checkbox>
              </v-col>

              <v-col>
                <v-checkbox
                  class="ma-6"
                  v-model="checkbox3"
                  :label="`Email`"
                ></v-checkbox>
              </v-col>
            </v-row>
        </v-card>
        </v-row>
        <v-row justify="center" class="mb-5">
              <v-card-actions>
                <v-btn
                  color="cyan darken-1 white--text"
                  @click="SaveChangesNotification()"
                >
                  Save changes
                </v-btn>
              </v-card-actions>
            </v-row>

      </v-tab-item>

      <v-tab-item :key="4" value="tab_4">
        <v-row justify="center" class="mt-5">
            <v-card-text>
                  <div class="subtitle-1">
                    <p>Click button below to proceed to delete your account.</p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p></p>
                  </div>
                </v-card-text>  
         </v-row>
        <v-row justify="center" class="mb-5">
              <v-card-actions>
                <v-btn
                  color="red darken-1 white--text"
                  @click="DeleteAccount()"
                >
                  Delete Account
                </v-btn>
              </v-card-actions>
            </v-row>
      </v-tab-item>

    </v-tabs-items>
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
       tab: "tab_1",
       id_num: "01",
       email: "johndoe@gmail.com",
       name: "John Doe",
       phone_num: "012-44445062",

       checkbox1: true,
       checkbox2: false,
       checkbox3: false,

       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shopping' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/newsandpromo' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          { title: 'Logout', icon: 'mdi-logout', path: '/logout' },
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
