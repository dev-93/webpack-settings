import "./app.css";
import axios from "axios";
import nyancat from "./nyancat.jpeg";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get('/api/users');
  console.log(res.data);
  console.log("hello");
  
  document.body.innerHTML = res.data.map(user => {
    return `<div>${user.id}: ${user.name}</div>`
  }).join('');
});
