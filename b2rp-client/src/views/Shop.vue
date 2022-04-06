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
          :key="item.title+'a'"
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
      
      <div class="row mb-5" justify="center">
        <div class="display-1">Recommended</div>
        <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="recommended[0].image_path"
    ></v-img>

    <v-card-title>{{recommended[0].product_name}}</v-card-title>
    <v-card-text>
    <div class="text-subtitle-1">
        RM{{recommended[0].product_price}}
      </div>

      <div>{{recommended[0].product_desc}}</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="goToProductPage(recommended[0].product_id)"
      >
        Buy
      </v-btn>
    </v-card-actions>
  </v-card>
      </div>
      
      <div class="row">
        <div
         class="col-md-2 col-sm-3 col-xs-12"
        >
          <v-card outlined>
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <template>
              <div class="" :key="item.product_category" v-for="item in items">
                <v-btn text @click="filtered(item.product_category)">
                  {{item.product_category}}
                </v-btn>
              </div>
            </template>
            <!-- <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col> 
            </v-row> -->
            <v-divider></v-divider>
            <!-- <v-card-title class="pb-0">Customer Rating</v-card-title>
            <v-container class="pt-0"  fluid>
              <v-checkbox append-icon="mdi-star" label="4 & above" hide-details dense></v-checkbox>
              <v-checkbox append-icon="mdi-star" label="3 & above" hide-details dense></v-checkbox>
              <v-checkbox append-icon="mdi-star" label="2 & above" hide-details dense></v-checkbox>
              <v-checkbox append-icon="mdi-star" label="1 & above" hide-details dense></v-checkbox>
            </v-container>             -->
          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >
        
          <v-row>
            
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6" class="">
              <v-text-field
              v-model="searchQuery"
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              class="hidden-sm-and-down mb-5"
            />
              <!-- <small>Showing 1-12 of 200 products</small> -->
            </v-col>
            <v-col cols="12" sm="2" class="">
            </v-col>
            <v-col cols="12" sm="4">
              <v-select class="" @click="printSelect()" v-model="select" :items="options" style="" outlined dense></v-select>
            </v-col>
          </v-row>
          

          <v-divider></v-divider>

          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.product_id" v-for="pro in sortedArray">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="pro.image_path"
                  >
                    <!-- <v-card-title>{{pro.type}} </v-card-title> -->
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn v-if="hover" @click="goToProductPage(pro.product_id)" class="" outlined>VIEW</v-btn>
                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div><a href="/product" style="text-decoration: none">{{pro.product_name}}</a></div>
                    <div>RM{{pro.product_price}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <!-- <div class="text-center mt-12">
            <v-pagination
              v-model="page"
              :length="6"
            ></v-pagination>
          </div> -->
        </div>
      </div>
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
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
<script>
import ShopService from '@/services/ShopService'
 export default {
   data(){
     return{
        
        dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shop', icon: 'mdi-shopping', path: '/shop' },
          { title: 'Cart', icon: 'mdi-cart', path: '/cart' },
          { title: 'Order', icon: 'mdi-bookmark', path: '/custorder' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
        ],
        product_items: [],
        range: [0, 10000],
        select:'Default',
        options: [
            'Default',
            'Price: Low to High',
            'Price: High to Low',
        ],
        page:1,
        min:0,
        max:10000,
        items: [],
        searchQuery: null,
        sortedProduct: [],
        filterKey:'',
        recommended:[]
        

     }
   },
   async mounted (){
        const response = (await ShopService.getAllProduct())
        this.product_items = response.data
        // console.log(response.data)
        const response2 = (await ShopService.getItemCategory())
        // this.items = response2.data
        for(let i=0; i<response2.data.length; i++){
          this.items.push(response2.data[i])
          // console.log(response2.data[i])
        }
        const response3 = (await ShopService.getUserRecommendation(this.$store.state.user.id))
        this.recommended = response3.data
        console.log(response3.data)
        
  },
   computed:{
     sortedArray(){
       if(this.searchQuery){
      return this.product_items.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.product_name.toLowerCase().includes(v))
      })
      }else if(this.select=="Price: Low to High"){
        return this.product_items.filter(() => true).sort((a, b) => a.product_price - b.product_price );
      }else if(this.select=="Price: High to Low"){
        return this.product_items.filter(() => true).sort((a, b) => b.product_price - a.product_price );
      }else if(this.select=="Price: High to Low"){
        return this.product_items;
      }else if(this.filterKey){
        const result = this.product_items.filter((item)=>item.product_category.toLowerCase() == this.filterKey.toLowerCase())
        console.log(result)
        return this.product_items.filter((item)=> item.product_category.toLowerCase() == this.filterKey.toLowerCase())
      }else{
        return this.product_items;
      }
     }
    },
    
   watch:{
     
   },
   //sample method
   methods:{

     stringToNumber(number){
       let num = parseInt(number)
       return num
     },

     printSelect(){
       console.log(this.select)
     },
     
     goToProductPage(productID){
      let product_path = '/product/'+productID
      this.$router.push({ path: product_path})
    },

    filtered(category){
      this.filterKey =category
      console.log(this.filterKey)
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
