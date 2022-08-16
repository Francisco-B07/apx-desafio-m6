export function initTijera() {
  class Tijera extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
        .imagen{
          Width: 100%;
          Height: 100%;
        }
      `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const imageURL = require("url:../../img/tijera.svg");
      div.classList.add("container");
      div.innerHTML = `
        <img class="imagen" src=${imageURL}>
      `;
      this.shadow.appendChild(div);
    }
  }
  customElements.define("tijera-el", Tijera);
}
