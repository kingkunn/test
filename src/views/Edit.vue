<template>
  <div class="container">
    <div class="title">
      <h3>Edit Contact</h3>
      <i @click="$router.go(-1)" class="material-icons dp48 close">close</i>
    </div>

    <form @submit.prevent="editContact($event)">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="name" v-model="name" @input="enterName" ref="nameInputError" type="text">
          <label for="name">{{ name ? '' : 'Full Name' }}</label>
          <span ref="nameError" class="error"></span>
        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">mail</i>          
          <input id="email" v-model="email" @input="enterEmail" ref="emailInputError" type="email">
          <label for="email">{{ email ? '' : 'Email' }}</label>
          <span ref="emailError" class="error"></span>          
        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">mode_edit</i>
          <textarea v-model="message" id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">{{ message ? '' : 'Message' }}</label>
        </div>

        <div class="input-field col s12">
        <button class="btn waves-effect waves-light" type="submit" name="action" style="width: 100%;">Update
          <i class="material-icons right">send</i>
        </button></div>

      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data(){
    return{
      name: '',
      email: '',
      message: '',
      contactData: [],
      index: null
    }
  },
  methods:{
    validateEmail(email){
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    },
    checkIfEmailExists(email){
      let contactData = JSON.parse(localStorage.getItem('contacts') || '[]')
      contactData = contactData.filter(key => key.email == email)
      let index = contactData.findIndex(key => key.id == Number(this.$route.params.id))

      return contactData.length>0 && contactData[0].id!=Number(this.$route.params.id) ? true : false;
    },
    enterName(){
      if(this.$refs.nameError.textContent != '' && this.name){
        this.$refs.nameError.textContent = ''   
        this.$refs.nameInputError.style.borderBottom = ''
      }
    },
    enterEmail(){
      if(this.$refs.emailError.textContent != '' && this.email){
        this.$refs.emailError.textContent = ''   
        this.$refs.emailInputError.style.borderBottom = ''
      }
    },
    editContact(event){
      if(this.name && this.email){
        this.$refs.nameError.textContent = ''        
        this.$refs.emailError.textContent = ''   

        let validate = this.validateEmail(this.email)
        let verify = this.checkIfEmailExists(this.email)

        if(validate && !verify){
          this.$refs.emailError.textContent = ''
          this.$refs.emailInputError.style.borderBottom = ''

          let userData = {
            id: Number(this.$route.params.id),
            name: this.name,
            email: this.email,
            message: this.message,
            timestamp: Date.now()
          }

          let contactData = JSON.parse(localStorage.getItem('contacts') || '[]')
          contactData[this.index] = userData
          localStorage.setItem('contacts', JSON.stringify(contactData))
          Swal.fire({
            title:  `Contact has been edited!`,
            type: 'success'
          })
          this.$router.go(-1);
        }
        else if(verify){
          this.$refs.emailError.textContent = 'This email address exists in the database'
          this.$refs.emailInputError.style.borderBottom = '2px solid red'
        }
        else{
          this.$refs.emailError.textContent = 'Please enter a valid email address' 
          this.$refs.emailInputError.style.borderBottom = '2px solid red'          
        }
      }
      else{
        if(!this.name){
          this.$refs.nameError.textContent = 'Please enter your name'
          this.$refs.nameInputError.style.borderBottom = '2px solid red'          
        }
        if(!this.email){
          this.$refs.emailError.textContent = 'Please enter your email address'
        }
      }
    }
  },
  mounted(){
    if(this.$route.params.id){
      let contactData = JSON.parse(localStorage.getItem('contacts') || '[]')
      let data = contactData.filter(key => key.id == Number(this.$route.params.id))
      this.index = contactData.findIndex(key => key.id == Number(this.$route.params.id))
      
      if(data.length>0){
        data = data[0];
        this.name = data.name;
        this.email = data.email;
        this.message = data.message;
      }else{
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
.container{
  padding: 30px 0;
}

.title{
  display: flex;
  justify-content: space-between;
}

.close{
  color: red;
  position: relative;
  top: 30px;
  cursor: pointer;
}

.error{
  color: red;
  position: relative;
  left: 5%;
}

</style>

