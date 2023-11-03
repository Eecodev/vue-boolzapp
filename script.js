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

    },
    computed:{
        
    }
}).mount('#app');