import axios from "axios";

const API_URI = 'http://localhost:5000/api/';


function generateFormData(jsonData) {
    const form_data = new FormData();
    for (const key in jsonData) {
        form_data.append(key, jsonData[key]);
    }

    return form_data;
}

class Requests {

    static async login(email, password) {
        const response = await fetch(`${API_URI}/api/v1/login`, {
            method: 'POST',
            body: generateFormData({ email, password }),
        });

        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }

    static async register(fullname, email, password) {
        const response = await fetch(`${API_URI}/api/v1/register`, {
            method: 'POST',
            body: generateFormData({ fullname, email, password }),
        });

        if (response.status !== 200) return [response.status, null];
        const json = await response.json();
        return [response.status, json];
    }
}

export default Requests;