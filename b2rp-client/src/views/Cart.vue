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

      <v-toolbar-title>Cart</v-toolbar-title>

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

      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      
    </v-app-bar>

    <v-main>
      <v-row class="pa-2">
        <v-col :cols="12" md="7" sm="12" style="box-shadow: 5px 5px 10px #d9d9d9">
          <v-simple-table light>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">ITEM</th>
                <th class="text-left">PRICE</th>
                <th class="text-left">QUANTITY</th>
                <th class="text-left">TOTAL</th>
                <th class="text-left"></th>
              </tr>
              </thead>
              <tbody>
              <template>
                <tr v-for ="item in cart_items " :key="item.product_id">
                  <td>
                    <v-list-item
                    key="1"
                    @click="testClick(item)"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.image_path"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title >{{item.product_name}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.product_category}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item></td>
                  <td>RM{{item.product_price}}</td>
                  <td>
                    <v-text-field
                      v-model="item.quantity"
                      class="pt-10"
                      label="Outlined"
                      style="width: 80px;"
                      single-line
                      outlined
                      :value="item.quantity"
                      type="number"
                      @click="editProductQuantity(item)"
                    ></v-text-field>
                  </td>
                  <td>RM {{item.total_price}}</td>
                  <td><v-btn color="error" outlined @click="deleteItem(item)"><v-icon>mdi-delete</v-icon></v-btn></td>
                </tr>
              </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="1" sm="12">
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="max-length: 30px; border-left: 2px">
          <p class="headline text-center">Order Summary</p>
          
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Order Subtotal</td>
                <td class="text-right" style="width: 50px;">RM{{total}}</td>
              </tr>
              <!-- <tr>
                <td>Shipping Charges</td>
                <td class="text-right" style="width: 50px;">$10.00</td>
              </tr> -->
              <!-- <tr>
                <td>Tax</td>
                <td class="text-right" style="width: 50px;">$5.00</td>
              </tr> -->
              <tr>
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>RM{{total}}</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" @click="makePayment" outlined>PROCEED TO PAY</v-btn>
          </div>
        </v-col>
      </v-row>
  
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
import ShopService from '@/services/ShopService'

export default {
   data(){
     return{
       success_msg: '',
       error_msg: '',
       dialog: false,
       dialogDelete: false,
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
        
        editedIndex: -1,
        editedItem: {
            title: '',
            description: '',
            remind_date: '',
            remind_time: ''
        },
        rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        cart_items:[],
     }
   },
   async mounted (){
        const response = (await ShopService.getUserCart("1"))
           this.cart_items = response.data
          //  console.log(this.cart_items)
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      total: function(){

        let total = [];

        Object.entries(this.cart_items).forEach((key) => {
            // console.log(key[1])
            // console.log(key[1].price)
            total.push(parseFloat(key[1].product_price)*key[1].quantity) // the value of the current key.
        });

        return total.reduce(function(total, num){ return total + num }, 0);

      }
      
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      
    },

   methods:{
       
       makePayment(){
         this.$router.push({name: 'Checkout'})
       },
       getTotalPrice(price, quantity){
         return price*quantity
      },
       
       async initialize (){
           const response = (await ShopService.getUserCart("1"))
           this.cart_items = response.data
       },
      
      async deleteItem (item) {
        this.editedIndex = this.cart_items.indexOf(item)
        // console.log(this.editedIndex)
        
        let productid = this.cart_items[this.editedIndex].product_id
        let user_id = "1"
        try{
          const response = (await ShopService.deleteCartItem(user_id,productid))
          // console.log(response.data)
          if(response.status==200){
            this.success_msg =response.data.message
          }
          this.initialize()
        }catch(error){
          // console.log(error.response.data.error)
          this.error_msg = error.response.data.error
        }
      },

      async editProductQuantity(item){
        this.editedIndex = this.cart_items.indexOf(item)
        let productid = this.cart_items[this.editedIndex].product_id
        let user_id = "1"
        const response = (await ShopService.editProductQuantity(user_id, productid, item))
        console.log(response.data)
        this.initialize()
      },

      testClick(item){
        console.log(item)
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
