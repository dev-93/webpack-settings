import "./app.css";
import form from "./form";
import result from "./result";

let resultEl;
let formEl;

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement('div');
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);
  
  resultEl = document.createElement('div');
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
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