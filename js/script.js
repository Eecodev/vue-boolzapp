import {contactList} from './data.js';

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts: contactList,
            lastId: 8,
        }
    },
    methods:{

    },
    computed:{
        
    }
}).mount('#app');