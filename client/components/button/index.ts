export function initButton() {
  class Button extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
        .root{
            background-color: #006CFC;
            border: 10px solid #001997;
            border-radius: 10px;
            width:100%;
            font-size: 40px;
            text-align: center;
            color: #D8FCFC;
        }
        @media (max-width: 400px){
          .root{
            font-size: 30px;
          }

        }
      `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const boton = document.createElement("button");
      boton.textContent = this.textContent;
      boton.classList.add("root");
      this.shadow.appendChild(boton);
    }
  }
  customElements.define("button-el", Button);
}
