import {contactList} from './data.js';

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts: contactList,
            activeContactIndex: 0,
            searchText: '',
            message: ''
        }
    },
    methods:{
        selectContact(id){
            const index = this.contacts.findIndex((contact)=> contact.id === id);
            if(index !== -1){
                this.activeContactIndex = index;
            }
        }
    },
    computed:{
        activeContact(){
            return this.contacts[this.activeContactIndex];
        }
    }
}).mount('#app');