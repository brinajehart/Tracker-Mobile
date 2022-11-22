// import axios from "axios";

const API_URI = 'http://localhost:5055';


function generateFormData(jsonData) {
    const form_data = new FormData();
    for (const key in jsonData) {
        form_data.append(key, jsonData[key]);
    }

    return form_data;
}

class Requests {

    static async GET(route, token) {
        const response = await fetch(`${API_URI}/api/v1/${route}`, {
            method: 'GET',
            headers: { 'Authorization': token }
        });
        
        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json]; 
    }

    static async login({email, password}) {
        const response = await fetch(`${API_URI}/api/v1/login`, {
            method: 'POST',
            body: generateFormData({ email, password }),
        });

        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }

    static async register({fullname, email, password}) {
        const response = await fetch(`${API_URI}/api/v1/register`, {
            method: 'POST',
            body: generateFormData({ fullname, email, password }),
        });

        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }

    static async deleteShoppingItem(item_id, token) {
        const response = await fetch(`${API_URI}/api/v1/shopping-item?id=${item_id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        });
        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }

    static async addShoppingItem(token, name, group_id) {
        const response = await fetch(`${API_URI}/api/v1/shopping-item/create`, {
            method: 'POST',
            headers: { 'Authorization': token },
            body: generateFormData({ name, group_id })
        });

        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }

    static async potentialMembers(group_id) {
        const response = await fetch(`${API_URI}/api/v1/group/potential-members?id=${group_id}`);
        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }

    static async addMember(token, user_id, group_id) {
        const response = await fetch(`${API_URI}/api/v1/group/add-user?id=${group_id}`, {
            method: 'POST',
            headers: { 'Authorization': token },
            body: generateFormData({ user_id }),
        });

        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }
}

export default Requests;