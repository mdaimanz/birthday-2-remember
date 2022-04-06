<template>
  <div class="">
    <v-app>
    
    <v-navigation-drawer app expand-on-hover class="">
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

      <v-toolbar-title>Order</v-toolbar-title>

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
        <v-row justify="center">
        <v-col :cols="12" md="10" sm="12" justify="center" style="box-shadow: 5px 5px 10px #d9d9d9">
          <v-simple-table light>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">PRODUCT</th>
                <th class="text-left">QUANTITY</th>
                <th class="text-left">STATUS</th>
                <th class="text-left">DATE SUBMITTED</th>
                <th class="text-left">DATE RECEIVED</th>
                <th class="text-left">ACTION</th>
                <th class="text-left"></th>
              </tr>
              </thead>
              <tbody>
              <template>
                <tr v-for ="item in order_items" :key="item.order_id">
                  <td>
                    <v-list-item
                    key="1"
                    
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.image_path"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title >{{item.product_name}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.product_category}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item></td>
                  <td>{{item.quantity}}</td>
                  <td>
                    <v-chip
                      v-if="item.status === 'Completed'"
                      class="ma-2"
                      color="green"
                      outlined
                    >
                      {{item.status}}
                    </v-chip>
                    <v-chip
                      v-if="item.status === 'Order submitted'"
                      class="ma-2"
                      color="primary"
                      outlined
                    >
                      {{item.status}}
                    </v-chip>
                    <v-chip
                      v-if="item.status === 'Received'"
                      class="ma-2"
                      color="orange"
                      outlined
                    >
                      {{item.status}}
                    </v-chip>
                    <v-chip
                      v-if="item.status === 'In progress'"
                      class="ma-2"
                      color="secondary"
                      outlined
                    >
                      {{item.status}}
                    </v-chip>
                    <v-chip
                      v-if="item.status === 'Rated'"
                      class="ma-2"
                      color="pink"
                      outlined
                    >
                      {{item.status}}
                    </v-chip>
                  </td>
                  <td>{{item.date_created}}</td>
                  <td>{{item.date_received}}</td>
                  <td>
                    <!-- <v-btn color="error" outlined v-if="item.status === 'Order submitted'" @click="requestCancel(item)">Cancel</v-btn> -->
                    <div name="status" class="green--text" v-if="item.status === 'Completed'">Take your order at our bakery.</div>
                    <v-btn color="primary" outlined v-if="item.status === 'Received'" @click="giveReview(item)">Rate</v-btn>
                  </td>
                  
                </tr>
              </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        </v-row>

        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Rate our {{this.selectedItem.product_name}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row justify="center">
                     <v-col class="text-center">
                      <v-rating
                        v-model="review_obj.product_rating"
                        color="yellow darken-3"
                        icon-label="custom icon label text {0} of {1}"
                      ></v-rating>
                    </v-col>  
                    <v-col cols="12">
                      <v-text-field
                        v-model="review_obj.user_review"
                        label="Review"
                        required
                      ></v-text-field>
                    </v-col>
                   
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="addReview"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
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
import OrderService from '@/services/OrderService'

export default {
   data(){
     return{
       success_msg: '',
       error_msg: '',
       dialog: false,
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shop', icon: 'mdi-shopping', path: '/shop' },
          { title: 'Cart', icon: 'mdi-cart', path: '/cart' },
          { title: 'Order', icon: 'mdi-bookmark', path: '/custorder' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          
        ],
        
        order_items:[],
        product_rating: 0,
        user_review: null,
        selectedItem:{
          product_name: null,
          product_id: null,
          order_id: null,
        },
        review_obj:{
          product_id: null,
          user_review: null,
          product_rating: null
        }
        
        
     }
   },
   async mounted (){
        const response = (await OrderService.getOrder(this.$store.state.user.id))
        this.order_items = response.data
        console.log(this.order_items)
    },

    computed: {
      
    },

    watch: {
     
    },

   methods:{
       async initialize (){
           const response = (await OrderService.getOrder(this.$store.state.user.id))
           this.order_items = response.data
       },

       requestCancel(item){
         console.log(item)
       },
       async giveReview(item){
         
         this.selectedItem.product_name=item.product_name
         this.review_obj.product_id=item.product_id
         this.selectedItem.order_id=item.order_id
         
         this.dialog = true
         this.initialize()
       },

       async addReview(){
         console.log(this.review_obj)
         try{
           const response = (await OrderService.addReview(this.$store.state.user.id, this.review_obj))
           console.log(response.data)
           if(response.status==200){
                const response2 = (await OrderService.updateStatusToRated(this.selectedItem.order_id))
                console.log(response2.data)
          }
         }catch(error){
           console.log(error.response.data.error)
         }
         
         this.dialog = false
         this.initialize()
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
