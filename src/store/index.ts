import { createStore } from 'vuex'
import zipcodeCrud from './zipcode-crud/zipcode-crud';

export default createStore({
    modules: {
        zipcodeCrud
    }
});