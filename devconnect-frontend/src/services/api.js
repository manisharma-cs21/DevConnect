import axios from "axios";

const api=axios.create({
    // baseURL:"https://devconnect-fqaf.onrender.com",
     baseURL:import.meta.env.VITE_API_URL,
});


export default api;