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

      <v-toolbar-title>Promotions</v-toolbar-title>

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
    :items="promotion"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Promotion List</v-toolbar-title>
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
            New Promotion
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
                      v-model="editedItem.promo_name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.promo_description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.promo_code"
                      label="Promotion Code"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.promo_rate"
                      label="Rate"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.start_date"
                      label="Start Date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.end_date"
                      label="End Date"
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
import PromotionService from '@/services/PromotionService'

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

        promotion: [],
        headers: [
          {text: 'Name', align: 'start', value: 'promo_name',},
          { text: 'Description', value: 'promo_description', sortable: false},
          { text: 'Promotion Code', value: 'promo_code', sortable: false},
          { text: 'Rate', value: 'promo_rate', sortable: false},
          { text: 'Start Date', value: 'start_date', sortable: false},
          { text: 'End Date', value: 'end_date', sortable: false},
          { text: 'Actions', value: 'actions', sortable: false },
        ],

        editedIndex: -1,
        editedItem: {
          promo_name: '',
          promo_description: '',
          promo_code: '',
          promo_rate: '',
          start_date: '',
          end_date:''
        },
     }
   },
   async mounted (){
        const response = (await PromotionService.getAllPromotion(this.$store.state.user.id))
        this.promotion = response.data
        console.log(response.data)
        console.log(this.$store.state.user.id)
    },
   computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Promotion' : 'Edit Promotion'
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
       const response = (await PromotionService.getAllPromotion(this.$store.state.user.id))
        this.promotion = response.data
     },
     editItem (item) {
        this.editedIndex = this.promotion.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.promotion.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        let promo_id = this.promotion[this.editedIndex].promo_id
        let vendor_id = 1
        console.log(promo_id)
        try{
            const response = (await PromotionService.deletePromotion(vendor_id,promo_id))
            console.log(response.data)
            if(response.status==200){
                this.success_msg = response.data.message
            }
            this.promotion.splice(this.editedIndex, 1)
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
            let promo_id = this.promotion[this.editedIndex].promo_id
            console.log("Index: "+this.editedIndex)
            console.log("Promo ID: "+promo_id)
            try{
                const response = (await PromotionService.editPromotion(this.$store.state.user.id,promo_id,this.editedItem))
                console.log(response)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                Object.assign(this.promotion[this.editedIndex], this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = error.response.data.error
            }
          
        } else {
            try{
                const response = (await PromotionService.addPromotion(this.$store.state.user.id,this.editedItem))
                console.log(this.editedItem)
                console.log("acap",response)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                this.promotion.push(this.editedItem)
                this.initialize()
            }catch(error){
              console.log(error)
                // console.log(error.response.data.error)
                this.error_msg = "Database error"
            }
        }
        this.close()
      },     
   }
 }
    
</script>
