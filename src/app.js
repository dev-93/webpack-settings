import "./app.css";
import nyancat from "./nyancat.jpeg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
        <img src="${nyancat}" />
    `;
});
