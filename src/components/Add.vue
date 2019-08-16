<template>
  <div class="container-form">
    <div class="title">
      <h3>Add Contact</h3>
      <i @click="closeForm($event)" class="material-icons dp48 close">close</i>
    </div>

    <form @submit.prevent="addContact($event)">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="name" ref="nameInputError" @input="enterName" v-model="name" type="text">
          <label for="name">Full Name</label>
          <span ref="nameError" class="error"></span>
        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">mail</i>          
          <input id="email" ref="emailInputError" @input="enterEmail" v-model="email" type="email">
          <label for="email">Email</label>
          <span ref="emailError" class="error"></span>          
        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">mode_edit</i>
          <textarea v-model="message" id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Message</label>
        </div>

        <div class="input-field col s12">
        <button class="btn waves-effect waves-light" type="submit" name="action" style="width: 100%;">Submit
          <i class="material-icons right">send</i>
        </button></div>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: '',
      email: '',
      message: '',
    }
  },
  methods:{
    closeForm(event){
      this.$emit('closeForm', true)
    },
    validateEmail(email){
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    },
    checkIfEmailExists(email){
      let contactData = JSON.parse(localStorage.getItem('contacts') || '[]')
      contactData = contactData.filter(key => key.email == email)

      return contactData.length>0 ? true : false;
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
    addContact(event){
      if(this.name && this.email){
        this.$refs.nameError.textContent = ''        
        this.$refs.nameInputError.style.borderBottom = ''

        this.$refs.emailError.textContent = ''   
        this.$refs.emailInputError.style.borderBottom = ''

        let validate = this.validateEmail(this.email)
        let verify = this.checkIfEmailExists(this.email)

        if(validate && !verify){
          this.$refs.emailError.textContent = ''     
          this.$refs.emailInputError.style.borderBottom = ''             
          
          let userData = {
            id: Math.random(),
            name: this.name,
            email: this.email,
            message: this.message,
            timestamp: Date.now()
          }

          this.$emit('userData', userData);
          this.closeForm(event);
        }else if(verify){
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
          this.$refs.emailInputError.style.borderBottom = '2px solid red'          
        }
      }
    }
  }
}
</script>

<style scoped>
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


