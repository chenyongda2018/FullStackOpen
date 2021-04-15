import axios from 'axios';

const baseUrl = "/api/persons/";

const getAll = () => {
    return axios.get(baseUrl);
}

const addNewPhone = (newObject) => {
    return axios.post(baseUrl,newObject);
}

const updatePhone = (id,newObject) => {
    return axios.put(baseUrl.concat(id),newObject);
}

const deletePhone = (id) => {
    return axios.delete(baseUrl.concat(id));
}


export default {getAll,addNewPhone,deletePhone,updatePhone}