export function initText() {
  class Text extends HTMLElement {
    shadow: ShadowRoot;
    tags: string[] = ["h1", "h2", "p"];
    tag: string = "p";
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });

      if (this.tags.includes(this.getAttribute("tag"))) {
        this.tag = this.getAttribute("tag");
      }

      const style = document.createElement("style");
      style.textContent = `
        .h1{
            color: #009048;
            font-size: 70px;
            display:inline;
        }
        @media (max-width: 370px){
          .h1{
            font-size: 60px;
        }
        }
        .h2{
            font-size: 50px;
            text-align: center;
            color: #000000;
            font-weight: normal;

        }
        .p{
            font-weight: normal;
            font-size: 40px;
            text-align: center;
            color: #000000;
        }
        @media (max-width: 370px){
          .p{
            font-size: 35px;
        }
        }
      `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const rootEl = document.createElement(this.tag);
      rootEl.textContent = this.textContent;

      rootEl.classList.add(this.tag);
      this.shadow.appendChild(rootEl);
    }
  }
  customElements.define("text-el", Text);
}
