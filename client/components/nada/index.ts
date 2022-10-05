export function initNada() {
  class Nada extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
          .imagen{
            Width: 100%;
            Height: 100%;
           
            font-size:36px;
            color:  #D8FCFC;
          }
        `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const div = document.createElement("div");
      div.classList.add("container");
      div.innerHTML = `
          <p><b>-</b></p>
        `;
      this.shadow.appendChild(div);
    }
  }
  customElements.define("nada-el", Nada);
}
