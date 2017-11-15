
import Axios from 'axios';

// Handles the calls to the API
export function getAll() {
    return Axios.get('http://localhost:4000/list/');    
}

export function createItem(item){
    return Axios.post('http://localhost:4000/list/', {item});
}

export function deleteRecord(id){
    return Axios.delete(`http://localhost:4000/list/${id}`);
}