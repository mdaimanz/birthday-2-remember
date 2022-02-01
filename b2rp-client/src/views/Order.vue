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

      <v-toolbar-title>Reminder</v-toolbar-title>

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
    :items="reminders_items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Order</v-toolbar-title>
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
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                      :rules="rules"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                      :rules="rules"
                    ></v-text-field>
                </v-row>
                
                <v-row>
                    <v-text-field
                      v-model="editedItem.remind_date"
                      label="Remind Date"
                      :rules="rules"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                      v-model="editedItem.remind_time"
                      label="Remind Time"
                      :rules="rules"
                    ></v-text-field>
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
       success_msg: '',
       error_msg: '',
       dialog: false,
       dialogDelete: false,
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shop' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/newsandpromo' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
        ],
        reminders_items:[],
        headers: [
          {
            text: 'Reminder ID',
            align: 'start',
            sortable: true,
            value: 'remind_id',
          },
          { text: 'Title', value: 'title' ,sortable: false },
          { text: 'Description', value: 'description', sortable: false },
          { text: 'Remind Date', value: 'remind_date', sortable: false },
          { text: 'Remind Time', value: 'remind_time', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false },
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
        
        
        
     }
   },
   async mounted (){
        // const response = (await ReminderService.getAllReminder(this.$store.state.user.id))
        // this.reminders_items = response.data
        // console.log(response.data)
        // this.news_items = response.data
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
       async initialize (){
          //  const response = (await ReminderService.getAllReminder(this.$store.state.user.id))
          //  this.reminders_items = response.data
          //  console.log(this.reminders_items)
       },
       editItem (item) {
        // let remind_id = item.remind_id
        // console.log(remind_id)
        this.editedIndex = this.reminders_items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.reminders_items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        let remind_id = this.reminders_items[this.editedIndex].remind_id
        let user_id = this.$store.state.user.id
        console.log(remind_id)
        try{
            const response = (await ReminderService.deleteReminder(user_id,remind_id))
            console.log(response.data)
            if(response.status==200){
                this.success_msg = response.data.message
            }
            this.reminders_items.splice(this.editedIndex, 1)
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
            let remind_id = this.reminders_items[this.editedIndex].remind_id
            console.log("Index: "+this.editedIndex)
            console.log("Remind ID: "+remind_id)
            try{
                const response = (await ReminderService.editReminder(this.$store.state.user.id,remind_id,this.editedItem))
                console.log(response.data)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                Object.assign(this.reminders_items[this.editedIndex], this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = error.response.data.error
            }
          
        } else {
            try{
                const response = (await ReminderService.addReminder(this.$store.state.user.id,this.editedItem))
                console.log(response.data)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                this.reminders_items.push(this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = "Database error"
            }
        }
        this.close()
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
