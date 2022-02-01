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
      
      <v-row justify="center" class="pt-15 pb-5">
        <div class="display-1">
          About us
        </div>
      </v-row>

      <v-row justify="center" class="pa-10">
        
         <v-img
         max-height="300"
         max-width="400"
         src="https://lh5.googleusercontent.com/p/AF1QipMAObX2ioh1mnGNh9dP0u_jXpWD4PhyTYOvN7gc=w1080-k-no">
         </v-img>

         <v-card class="ma-10" width="500">
          <p class="text-h4 ma-5">History</p>
          <div class="text--primary ma-5">
            With humble beginning in 2005, we started out as a small bakery shop, expanded into a proudly and professionally run business. Hajji Bakery has grown to over 2 outlets (and counting) and established to a 6,000 sqft of factory located in Rawang. 
          </div>

         </v-card>

      </v-row>

    </v-main>


    <v-footer padless bottom class="mt-10">
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

