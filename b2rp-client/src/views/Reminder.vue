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

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      
    </v-app-bar>

    <v-main>
      <v-container fluid class="mx-auto">
    <v-row class="text-center" justify="center">
    <v-list
      flat class="pa-3"
    >
    <v-card
      class="mx-auto"
      width="900"
      outlined
    >
    <v-data-table
    :headers="headers"
    :items="reminders"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.date"
                      label="Date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.remind_date"
                      label="Remind Date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.remind_time"
                      label="Remind Time"
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
    
    </v-card>

    </v-list>
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
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shopping' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/news' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
          { title: 'Logout', icon: 'mdi-logout', path: '/logout' },
        ],
        right: null,
        carousell_items: [
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
          }
          
        ],
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'Title',
            align: 'start',
            sortable: false,
            value: 'title',
          },
          { text: 'Date', value: 'date' },
          { text: 'Description', value: 'description', sortable: false},
          { text: 'Remind Date', value: 'remind_date' },
          { text: 'Remind Time', value: 'remind_time', sortable: false},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        reminders: [],
        editedIndex: -1,
        editedItem: {
          title: '',
          desription: '',
          remind_date: '',
          remind_time: '',
        },
        defaultItem: {
          title: '',
          desription: '',
          remind_date: '',
          remind_time: '',
        },
     }
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

    created () {
      this.initialize()
    },
   
   methods:{
     initialize(){
       this.reminders=[
         {title: "Dad's birthday", description:"59th Birthday", date: '06/07/1976',remind_date: '05/07/2021', remind_time: '12.00 a.m.',},
         {title: "Mom's birthday", description:"46th Birthday", date: '13/12/1976',remind_date: '12/12/2021', remind_time: '12.00 a.m.',},
       ]
       
     },
     editItem (item) {
        this.editedIndex = this.reminders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.reminders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.reminders.splice(this.editedIndex, 1)
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.reminders[this.editedIndex], this.editedItem)
        } else {
          this.reminders.push(this.editedItem)
        }
        this.close()
      },
     
     
   }
 }
    
</script>
