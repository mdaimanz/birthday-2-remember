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

      <v-toolbar-title>Shop</v-toolbar-title>

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
    
      <v-flex d-flex flex-wrap>
          <v-flex d-flex md4 v-for="item in product_items" :key="item.product_items">
            <v-card 
            :loading="loading"
            class="ma-5"
            max-width="374"
            >
            <v-button v-on:click="goToProduct(item.productID)">            
              <v-img
                height="250"
                :src="item.productPicture"
              ></v-img>
            </v-button>

              <v-card-title>{{item.productName}}</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="item.productRating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ms-4">
                  {{item.productRating}}
                  </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                  {{item.productCategory}}
                </div>

                <div>{{item.productDesc}}</div>
              </v-card-text>
            </v-card>
          </v-flex>
      </v-flex>

      <v-data-iterator
      :items="product_items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="product_items">
        <v-row>
          <v-col
            v-for="item in product_items.items"
            :key="item.productID"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-button v-on:click="goToProduct(item.productID)">            
              <v-img
                height="250"
                :src="item.productPicture"
              ></v-img>
            </v-button>
              <v-card-title class="subheading font-weight-bold">
                {{ item.productName }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>

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
 export default {
   data(){
     return{
        
        dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shopping', icon: 'mdi-shopping', path: '/shop' },
          { title: 'News and Promotion', icon: 'mdi-newspaper', path: '/newsandpromo' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
        ],
        product_items: [
          { 
            productID: '1',
            productPrice: '50',
            productName: 'Chocolate Cake',
            productDesc: 'Chocolate cake covered with chocolate cream',
            productRating: '4',
            productCategory: 'Cake',
            productPicture: 'https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900'
          },
          { 
            productID: '2',
            productPrice: '50',
            productName: 'Vanilla Cake',
            productDesc: 'Chocolate cake covered with ',
            productRating: '4',
            productCategory: 'Cake',
            productPicture: 'https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900'
          },
          { 
            productID: '3',
            productPrice: '50',
            productName: 'Chocolate Cake',
            productDesc: 'Chocolate cake covered with ',
            productRating: '4',
            productCategory: 'Cake',
            productPicture: 'https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900'
          },
          { 
            productID: '4',
            productPrice: '50',
            productName: 'Chocolate Cake',
            productDesc: 'Chocolate cake covered with ',
            productRating: '4',
            productCategory: 'Cake',
            productPicture: 'https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900'
          },
          { 
            productID: '1',
            productPrice: '50',
            productName: 'Chocolate Cake',
            productDesc: 'Chocolate cake covered with ',
            productRating: '4',
            productCategory: 'Cake',
            productPicture: 'https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900'
          },
        ],
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'Name',
        keys: [
          'Name',
          'Price',
          'Rating',
          'Category'
        ],

     }
   },
   computed:{
     numberOfPages () {
        return Math.ceil(this.product_items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
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
     goToProduct(id){
       console.log("You clicked on" + id)
     },

     nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
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
