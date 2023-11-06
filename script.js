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
        generateMsg(message, status){
            const newMsg = {
                date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                message,
                status
            };
            this.activeContact.messages.push(newMsg);
        },
        newMessage(){
            if(this.message){
                this.generateMsg(this.message,'sent');
                this.message = '';
                setTimeout(()=>{
                    this.generateMsg(this.resp,'received');
                }, 1000)
            }
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



        // filterContacts(id){
        //     this.filteredContacts = this.contacts.filter((contact, index)=>{
        //         return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
        //     });
        //     this.contacts = filteredContacts;
        // }
    }
}).mount('#app');