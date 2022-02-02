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

      <v-toolbar-title>News Dashboard</v-toolbar-title>

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
    :items="news_items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>News List</v-toolbar-title>
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
                      v-model="editedItem.image_path"
                      label="Image Path"
                      :rules="rules"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                      v-model="editedItem.news_title"
                      label="Title"
                      :rules="rules"
                    ></v-text-field>
                </v-row>
                
                <v-row>
                    <v-text-field
                      v-model="editedItem.news_content"
                      label="Content"
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
import NewsService from '@/services/NewsService'

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
        news_items:[],
        headers: [
          {
            text: 'News Title',
            align: 'start',
            sortable: false,
            value: 'news_title',
          },
          { text: 'Post Date', value: 'post_date', sortable: true },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            news_title: '',
            news_content: '',
            image_path: ''
        },
        rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        
        
        
     }
   },
   async mounted (){
        const response = (await NewsService.getNews())
        this.news_items = response.data
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
           const response = (await NewsService.getNews())
           this.news_items = response.data
        //    console.log(response.data)
       },
       editItem (item) {
        // let news_id = item.news_id
        // console.log(news_id)
        this.editedIndex = this.news_items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.news_items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        let news_id = this.news_items[this.editedIndex].news_id
        console.log(news_id)
        try{
            const response = (await NewsService.deleteNews(news_id))
            console.log(response.data)
            if(response.status==200){
                this.success_msg = response.data.message
            }
            this.news_items.splice(this.editedIndex, 1)
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
            let news_id = this.news_items[this.editedIndex].news_id
            console.log(news_id)
            try{
                const response = (await NewsService.editNews(news_id, this.editedItem))
                console.log(response.data)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                Object.assign(this.news_items[this.editedIndex], this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = error.response.data.error
            }
          
        } else {
            try{
                const response = (await NewsService.addNews(this.editedItem))
                console.log(response.data)
                if(response.status==200){
                    this.success_msg = response.data.message
                }
                this.news_items.push(this.editedItem)
                this.initialize()
            }catch(error){
                console.log(error.response.data.error)
                this.error_msg = error.response.data.error
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
