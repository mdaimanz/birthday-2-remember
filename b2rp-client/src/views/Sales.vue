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

      <v-toolbar-title>Sales</v-toolbar-title>

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
        <v-row class="text-center" justify="center">

    <v-data-table
    :headers="headers"
    :items="sales"
    sort-by="sales_date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Sales List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="800px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Sale
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.sales_date"
                      label="Date"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.modal"
                      label="Modal"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.product"
                      label="Product"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price_per_product"
                      label="Price Per Product"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.quantity_sold"
                      label="Quantity Sold"
                      
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
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
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
import SalesService from '@/services/SalesService'

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
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shopping' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/newsandpromo' },
          { title: 'Sales', icon: 'mdi-sale', path: '/sales' },
          { title: 'Product', icon: 'mdi-package-variant', path: '/product' },
          { title: 'Promotion', icon: 'mdi-ticket-percent', path: '/promotion' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          { title: 'Logout', icon: 'mdi-logout', path: '/logout' },
        ],
        
        sales: [],
        headers: [
          {text: 'Date', value: 'sales_date',},
          { text: 'Modal', value: 'modal', sortable: false},
          { text: 'Product', value: 'product', sortable: false},
          { text: 'Price Per Product', value: 'price_per_product', sortable: false},
          { text: 'Quantity Sold', value: 'quantity_sold', sortable: false},
          { text: 'Actions', value: 'actions', sortable: false },
        ],

        editedIndex: -1,
        editedItem: {
          sales_date: '',
          modal: '',
          product: '',
          price_per_product: '',
          quantity_sold: ''
        },
     }
   },

    async mounted (){
        const response = (await SalesService.getAllSales(this.$store.state.user.id))
        this.sales = response.data
        console.log(response.data)
        console.log(this.$store.state.user.id)
    },
   computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Sales' : 'Edit Sales'
      },
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
     async initialize(){
       const response = (await SalesService.getAllSales(this.$store.state.user.id))
        this.sales = response.data
     },
     editItem (item) {
        this.editedIndex = this.sales.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.sales.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        let sales_id = this.sales[this.editedIndex].sales_id
        let vendor_id = 1
        console.log(sales_id)
        try{
            const response = (await SalesService.deleteSales(vendor_id,sales_id))
            console.log(response.data)
            if(response.status==200){
                this.success_msg = response.data.message
            }
            this.sales.splice(this.editedIndex, 1)
            this.initialize()
        }catch(error){
            console.log(error.response.data.error)
            this.error_msg = error.response.data.error
        }
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
            let sales_id = this.sales[this.editedIndex].sales_id
            console.log("Index: "+this.editedIndex)
            console.log("Sales ID: "+sales_id)
            try{
                const response = (await SalesService.editSales(this.$store.state.user.id,sales_id,this.editedItem))
                console.log(response.data)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                Object.assign(this.sales[this.editedIndex], this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = error.response.data.error
            }
          
        } else {
            try{
                const response = (await SalesService.addSales(this.$store.state.user.id,this.editedItem))
                console.log(response.data)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                this.sales.push(this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = "Database error"
            }
        }
        this.close()
      },          
   }
 }
    
</script>
