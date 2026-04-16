import axios from "axios";

const api=axios.create({
    baseURL:"https://devconnect-fqaf.onrender.com",
});


export default api;