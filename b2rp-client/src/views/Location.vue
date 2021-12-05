<template>
  <div class="">
    <v-toolbar  elevation="10">
      <img class="mr-3 my-5" :src="require('../assets/Untitled-1.png')" height="60" width="180" />
      <v-toolbar-title></v-toolbar-title>
      <v-col class="text-left my-5">
        <v-btn
        class=""
        plain
        color="cyan"
        to="/"
        >
          Home
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
        >
          Shop
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
          to="/news"
        >
          News
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
          to="/location"
        >
          Location
        </v-btn>
        
        <v-btn
          class=""
          plain
          color="cyan"
        >
          About Us
        </v-btn>
      </v-col>
    

    <v-col class="text-right my-5">
      <v-btn
      class="mr-2 white--text"
      color="cyan"
      to="/login"
    >
      Login
    </v-btn>
    <v-btn
      class="mr-5"
      outlined
      color="cyan"
      to="/register"
    >
      Register
    </v-btn>
    </v-col>
    </v-toolbar> 
    <v-main class="pt-3">
      
      <v-row justify="center" class="pa-4">
        
      </v-row>
      
      <v-row justify="center" class="pa-10">
        
        <div class="display-1">
          Location
        </div>
      </v-row>
      <v-row v-for="item in location_items"
          :key="item.location_id">
  <v-card
    class="mx-auto mb-2"
    width="1080"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        
            <v-list-item-title class="text-h4 mb-1">
              {{item.title}}
            </v-list-item-title>
            <v-list-item-subtitle>{{item.address_1}} {{item.address_2}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-img       
              :src="item.picture_path"
              max-height="200px"
              max-width="300px"
        ></v-img>
        </v-list-item>

        <v-card-actions>
          <v-btn
            class="cyan lighten-2 white--text"
            outlined
            rounded
            text
            to=""
          >
            {{item.status}} 
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
      


    </v-main>


    <v-footer padless class="mt-10">
    <v-col
      class="cyan lighten-3 white--text text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Birthday 2 Remember Platform</strong>
    </v-col>
  </v-footer>
  </div>
</template>

<script>
 export default {
   data(){
     return{
       items: [
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
          },
        ],
        location_items:[
         {
           location_id:'1',
           title: 'Haji Bakery Sdn Bhd, Bandar Tasik Puteri',
           address_1: 'No 11-G, Green Valley Park, Jalan Hijau 5/1,',
           address_2: 'Bandar Tasik Puteri, 48000 Rawang, Selangor',
           status: 'Open',
           picture_path: 'https://lh5.googleusercontent.com/p/AF1QipM4QgvJzhX9pMs-17_TXTSmjAtIPLk5gEPaAKfc=w1080-k-no',
         },
         {
           location_id:'2',
           title: 'Haji Bakery Sdn Bhd, Bandar Country Home',
           address_1: 'No 20, Jalan Desa 1/1,',
           address_2: 'Bandar Country Homes, 48000 Rawang, Selangor',
           status: 'Open',
           picture_path: 'https://lh5.googleusercontent.com/p/AF1QipMAObX2ioh1mnGNh9dP0u_jXpWD4PhyTYOvN7gc=w1080-k-no',
         },
         {
           location_id:'3',
           title: 'Haji Bakery Sdn Bhd, Rawang',
           address_1: 'No 55-G, Seksyen BB5, Jalan Adenium 2g/6,',
           address_2: '48300 Rawang, Selangor',
           status: 'Open',
           picture_path: 'https://cdn1.my.orstatic.com/userphoto/doorphoto/2/1LV/00BFLO8342C270683ACDC6px.jpg',
         },
         
         ]

     }
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
     doneTask(id){
       let task = this.tasks.filter(task => task.id === id)[0]
       task.done = !task.done
     },
     deleteTask(id){
       this.tasks = this.tasks.filter(task => task.id !== id)
     }
   }
 }
    
</script>
