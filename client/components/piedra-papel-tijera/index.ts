export function initPiedraPapelTijera() {
  class PiedraPapelTijera extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
              .container{
                  Width: 280px;
                  display:flex;
                  justify-content: space-between;
              }
              .imagen{
                  Width: 56px;
                  Height: 128px;

              }
            `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const imageURLPiedra = require("url:../../img/piedra.svg");
      const imageURLPapel = require("url:../../img/papel.svg");
      const imageURLTijera = require("url:../../img/tijera.svg");
      div.classList.add("container");
      div.innerHTML = `
              <img class = "imagen" src=${imageURLTijera}>
              <img class = "imagen" src=${imageURLPiedra}>
              <img class = "imagen" src=${imageURLPapel}>
     `;
      this.shadow.appendChild(div);
    }
  }
  customElements.define("piedra-papel-tijera", PiedraPapelTijera);
}
