import {contactList} from './data.js';

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts: contactList,
            activeContactIndex: 0,
            searchText: '',
            message: '',
            resp: 'ok',
            filteredContacts: []
        }
    },
    methods:{
        selectContact(id){
            const index = this.contacts.findIndex((contact)=> contact.id === id);
            if(index !== -1){
                this.activeContactIndex = index;
            }
        },
        getLastMessage(id){
            const contact = this.contacts.find((contact)=> contact.id === id);
            const len = contact.messages.length;
            if(len > 0){
                return contact.messages[len - 1].message;
            } else{
                return 'Non ci sono messaggi';
            }
        },
        getLastAccess(id){
            const contact = this.contacts.find((contact)=> contact.id === id);
            const len = contact.messages.length;
            if(len > 0){
                return contact.messages[len -1].date;
            } else{
                return 'Unknown';
            }
        },
        newMessage(){
            const newMsg = {
                date:new Date(),
                message: this.message,
                status: 'sent'
            };
            this.activeContact.messages.push(newMsg);
            this.message = '';
            setTimeout(()=>{
                const newMsg = {
                    date: new Date(),
                    message: this.resp,
                    status: 'received'
                };
                this.activeContact.messages.push(newMsg);
            }, 1000)
        },
    },
    computed:{
        activeContact(){
            return this.contacts[this.activeContactIndex];
        },
        lastDate(){
            const len = this.activeContact.messages.length;
            if(len > 0){
                return this.activeContact.messages[len - 1].date;
            } else{
                return 'Unknown';
            }
        },
        filterContacts(id){
            this.filteredContacts = this.contacts.filter((contact, index)=>{
                return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
            this.contacts = filteredContacts;
        }
    }
}).mount('#app');