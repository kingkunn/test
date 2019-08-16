<template>
  <div class="container">
    <div class="row">
      <div class="col s12" v-if="contactList">
        <div class="title">
          <h3>Contacts List</h3>
          <a class="waves-effect waves-light btn-small add" v-if="contactList" @click.prevent="contactList=false"><i class="material-icons dp48">person_add</i> Add User</a>
        </div>

        <table class="striped highlight responsive-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th colspan="2">Actions</th>
            </tr>
          </thead>

          <tbody v-if="contactData.length">
            <tr v-for="(contact, i) in contactData" :key="i">
              <td style="font-weight: 600">{{i+1}}.</td>
              <td>{{contact.name}}</td>
              <td>{{contact.email}}</td>
              <td><p>{{contact.message}}</p></td>
              <td style="width: 15%;">{{Date(contact.timestamp).substring(0, 15).substring(4)}}</td>
              <td style="width: 5%;"><i :title="'Edit '+contact.name" @click="$router.push('edit/'+contact.id)" class="material-icons dp48 edit">edit</i></td>                  
              <td style="width: 5%;"><i :title="'Delete '+contact.name" @click="deleteUser(contact.id)" class="material-icons dp48 delete">delete</i></td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="7" style="text-align: center; font-size: 23px">No Data Available</td>
            </tr>
          </tbody>
          <tfoot v-if="contactData.length">
            <tr>
              <td colspan="7" style="color: red">Note: All email addresses are unique</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="col s12" v-else>
        <addContact @closeForm="showContactList" @userData="saveUserData"></addContact>
      </div>
    </div>
  </div>
</template>

<script>
import addContact from "@/components/Add.vue";
import Swal from 'sweetalert2';

export default {
  name: "home",
  components: {
    addContact
  },
  data(){
    return{
      contactData: [],
      contactList: true,
    }
  },
  methods: {
    deleteUser(id){
      //confirm
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.contactData = this.contactData.filter(key => key.id !== id)
          localStorage.setItem('contacts', JSON.stringify(this.contactData))

          Swal.fire(
            'Deleted!',
            'This contact has been deleted.',
            'success'
          )
        }
      })
    },
    showContactList(value){
      this.contactList = value
    },
    saveUserData(data){
      this.contactData.push(data)
      localStorage.setItem('contacts', JSON.stringify(this.contactData)) 
      Swal.fire({
        title: 'Added new contact!',
        type: 'success'
      })
    }
  },
  mounted(){
    this.contactData = JSON.parse(localStorage.getItem('contacts') || '[]')
  }
};
</script>

<style scoped>
.container{
  padding: 30px 0;
}

.edit, .delete{
  color: red;
  cursor: pointer;
}

.edit{
  color: #ff9800;
}

.title{
  display: flex;
  justify-content: space-between;
}

.add{
  background-color: #29b6f6;
  position: relative;
  /* font-size: 15px; */
  font-weight: 600;
  top: 30px;
}
</style>
