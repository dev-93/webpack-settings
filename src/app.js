import "./app.css";
import form from "./form";
import result from "./result";

let resultEl;
let formEl;

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get('/api/users');
  console.log(res.data);
  console.log("hello");
  
  document.body.innerHTML = res.data.map(user => {
    return `<div>${user.id}: ${user.name}</div>`
  }).join('');
});

if (module.hot) {
  module.hot.accept('./result.js', async function() {
    console.log("result 모듈 변경")
    resultEl.innerHTML = await result.render();
    // printMe();
  })

  module.hot.accept('./form.js', async function() {
    console.log("form 모듈 변경")
    formEl.innerHTML = form.render();
  })
}