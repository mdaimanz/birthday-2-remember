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

      <v-toolbar-title>Setting</v-toolbar-title>

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

    <v-main>
      <v-container fluid class="mx-auto">
        <v-row justify="center">
            <v-alert
            dense
            text
            class="ma-5"
            type="success"
            v-if="success_msg"
            >
            {{success_msg}}
            </v-alert>
        </v-row>
        <v-row justify="center">
            <!-- error alert -->
            <v-alert
            dense
            outlined
            class="ma-5"
            type="error"
            v-if="error_msg"
            >
            {{error_msg}}
            </v-alert>
        </v-row>
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

      <!-- <v-tab href="#tab_3">
        Reminder options
        <v-icon>mdi-bell-ring</v-icon>
      </v-tab> -->

      <!-- <v-tab href="#tab_4">
        Delete account
        <v-icon>mdi-account-alert</v-icon>
      </v-tab> -->
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
                    <p>User ID: <span class="lighten-5 ma-5 rounded-r-xl">{{user_info[0].id}}</span></p>
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
                    <p>{{user_info[0].name}}</p>
                  </div>
                </v-card-text>
              </v-col>

              <v-col>
                <v-card-text>
                  <div class="title">
                    <p>Email Address</p>
                  </div>
                  <div class="subtitle-1 blue-grey lighten-5 rounded-lg">
                    <p>{{user_info[0].email}}</p>
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
                    <p>{{user_info[0].phone_num}}</p>
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
                  @click="openEditProfile"
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
                  @click="openChangePassword"
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

        <v-row justify="center">
    <v-dialog
      v-model="dialogProfile"
      persistent
      max-width="600px"
    >
    <validation-observer
              ref="observer"
              v-slot="{ invalid }"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Information</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
            <v-row>
              
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Full Name"
                  rules="required"
                >
                <v-text-field
                 :error-messages="errors"
                  v-model="user_info[0].name"
                  label="Full Name*"
                  required
                ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Phone number"
                  :rules="{
                    required: true,
                    regex: '^(60)'
                  }"
                >
                <v-text-field
                  v-model="user_info[0].phone_num"
                  :error-messages="errors"
                  label="Phone Number*"
                  required
                ></v-text-field>
                </validation-provider>
              </v-col>
              
            </v-row>
          
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogProfile = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="invalid"
            @click="submitEditProfile"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>

  <v-row justify="center">
    <v-dialog
      v-model="dialogPassword"
      persistent
      max-width="600px"
    >
    <validation-observer
              ref="observer"
              v-slot="{ invalid }"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Change password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
            <v-row>
              
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                <v-text-field
                 :error-messages="errors"
                  v-model="password.oldPassword"
                  label="Old Password*"
                  type="password"
                  required
                ></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="New Password"
                  rules="required"
                >
                <v-text-field
                 :error-messages="errors"
                  v-model="password.newPassword"
                  label="New Password*"
                  type="password"
                  required
                ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogPassword = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="invalid"
            @click="submitChangePassword"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </validation-observer>
    </v-dialog>
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
import AuthenticationService from '@/services/AuthenticationService'
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} format is wrong. (Please use this format: 60-xxxxx xxxx)',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })
 export default {
   components: {
      ValidationProvider,
      ValidationObserver,
    },
   data(){
     return{
       success_msg: '',
       error_msg: '',
       tab: "tab_1",
       dialogProfile: false,
       dialogPassword: false,
       password:{
         newPassword: null,
         oldPassword: null,
       },   
       user_info: [],
       checkbox1: true,
       checkbox2: false,
       checkbox3: false,

       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shop', icon: 'mdi-shopping', path: '/shop' },
          { title: 'Cart', icon: 'mdi-cart', path: '/cart' },
          { title: 'Order', icon: 'mdi-bookmark', path: '/custorder' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
        ],
     }
   },
   async mounted (){
        const response = (await AuthenticationService.getUserInfo(this.$store.state.user.id))
        this.user_info = response.data
        console.log("user_info: ",this.user_info[0])
      },
   //sample method
   methods:{
     async initialize (){
           const response2 = (await AuthenticationService.getUserInfo(this.$store.state.user.id))
           this.user_info = response2.data
      },
     openEditProfile(){
       this.dialogProfile= true;
     },
     async submitEditProfile(){
      //  console.log("user_info: ",this.user_info[0])
       const response3 = (await AuthenticationService.editProfile(this.$store.state.user.id, this.password))
       console.log(response3)
       if(response3.status==200){
         this.success_msg = response3.data.message
       }else{
         this.error_msg = "Database error"
       }
       this.dialogProfile = false
     },
     openChangePassword(){
       this.dialogPassword= true;
     },

     async submitChangePassword(){
        console.log("oldPassword", this.password.oldPassword)
       console.log("newPassword", this.password.newPassword)
       const response4 = (await AuthenticationService.changePassword(this.$store.state.user.id, this.password))
       if(response4.status==200){
         this.success_msg = response4.data.message
         this.dialogPassword= false;
       }else{
         this.error_msg = response4.data.error
         this.dialogPassword= false;
       }
      
       
     },

     logout(){
       console.log("Logout")
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Home'})
     },
     
     
   }
 }
    
</script>
