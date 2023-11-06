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
            msgIndex: null,
            showChat: false
        }
    },
    methods:{
        filterMy(){
            this.contacts.forEach(element=>{
                if(!element.name.includes(this.searchText)){
                    element.visible = false
                } else{
                    element.visible = true
                }
            })
        },
        selectContact(id){
            const index = this.contacts.findIndex((contact)=> contact.id === id);
            if(index !== -1){
                this.activeContactIndex = index;
            }
            this.showChat = true;
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
            this.$nextTick(() => {
                this.$refs.messages[this.$refs.messages.length -1].scrollIntoView({behavior: 'smooth'});
            });
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
        dropDownOption(i){
            if(this.msgIndex != i){
                this.msgIndex = i;
            } else{
                this.msgIndex = null;
            }
        },
        deleteMsg(index){
            this.activeContact.messages.splice(index,1);
            this.msgIndex = null;
        }
    },
    computed:{
        filteredContact(){
            return this.contacts.filter((contact) => contact.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
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
        }
    },
    mounted(){
        console.log(this.$refs.messages[this.$refs.messages.length -1]);
    }
}).mount('#app');