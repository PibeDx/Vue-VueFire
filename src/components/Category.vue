<template>
  <div>
    <h2>Categoria</h2>
    
    <div v-if="add">
      <input type="text" placeholder="categoria" v-model="description">
      <button @click="addCategory">Agregar</button>
    </div>
    <div v-if="update">
      <input type="text" placeholder="categoria" v-model="categoryUpdated.description">
      <button @click="updateCategory">Guardar</button>
      <button @click="cancel">X</button>
    </div>
    
    
    <ul>
      <li v-for="category in categorys">
        <p>
          <button @click="removeCategory(category)">x</button> 
          <button @click="selectCategory(category)">u</button> 
          <span>{{ category.description }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>


<script>
import firebase from '../config/firebaseInit'

const db = firebase.database()
const categoryRef = db.ref('category')

export default {
  name: 'category',
  data() {
    return {
      description: '',
      add: true,
      update: false,
      categoryUpdated: null
    }
  },
  firebase: {
    categorys: categoryRef
  },
  methods: {
  	addCategory: function() {
    	if(this.description) {
      	var _id_category = categoryRef.push().key
        var category = {
        	_id_category: _id_category,
          description: this.description,
          created_at: firebase.database.ServerValue.TIMESTAMP
        }
        categoryRef.child(_id_category).set(category) 
        this.description = ''
      }
    },
    removeCategory: function(todo) {
    	categoryRef.child(todo['.key']).remove()
    },
    selectCategory: function(todo) {
    	var self = this
    	categoryRef.child(todo['.key']).once('value', function (snapshot) {
      	//self.description = snapshot.val().description
        self.update = true
        self.add = false
        self.categoryUpdated = snapshot.val()
      })
    },
    
    updateCategory: function() {
      if(this.categoryUpdated.description) {
      	var _id_category = this.categoryUpdated._id_category
        this.categoryUpdated.updated_at = firebase.database.ServerValue.TIMESTAMP
        categoryRef.child(_id_category).set(this.categoryUpdated) 
        this.cancel()
      }
    },
    
    cancel: function() {
    	this.update = false
      this.add = true
      this.description = ''
      this.categoryUpdated = null
    }
  }
}
</script>
<style scoped>

</style>
