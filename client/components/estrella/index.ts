export function initEstrella() {
  class Estrella extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      const resultado = this.getAttribute("resultado");
      const style = document.createElement("style");
      style.textContent = `
            #estrella{
                Margin-top: 30px;
                width: 1px;
                height: 1px;
                border-bottom: 225px solid var(--estrella-${resultado});
                border-left: 134px solid transparent;
                border-right: 151px solid transparent;
            }
            
            #estrella:before{
                content: "";
                display: block;
                width: 1px;
                height: 1px;
                border-top: 228px solid var(--estrella-${resultado});
                border-left: 144px solid transparent;
                border-right: 141px solid transparent;
                position: relative;
                bottom: -74px/*30%*/;
                left: -139px/*55%*/;
            }
            @media (max-width: 370px){
              #estrella{
                Margin-top: 15px;
                border-bottom: 187px solid var(--estrella-${resultado});
                border-left: 138px solid transparent;
                border-right: 144px solid transparent;
              }
            }
            @media (max-width: 370px){
              #estrella:before{
                  Margin-top: 15px;
                  border-top: 193px solid var(--estrella-${resultado});
                  border-left: 125px solid transparent;
                  border-right: 144px solid transparent;
                  position: relative;
                  bottom: -53px/*30%*/;
                  left: -129px/*55%*/;
              }
            }

            .resultado{
                position: absolute;
                top: 19%;
                left: 33%;
                color: white; 
                transform: rotate(-25deg);
              }
              @media (max-width: 370px){
                .resultado{
                  top: 16%;
                  left: 29%;
                }
              }

              @media (min-width: 600px){
                .resultado{
                  top: 17%;
                  left: 45%;
                }
              }

        `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const resultado = this.getAttribute("resultado");
      const rootEl = document.createElement("div");
      rootEl.innerHTML = `
            <div id="estrella" ></div>
            <h1 class="resultado">${resultado}</h1>  
      `;
      this.shadow.appendChild(rootEl);
    }
  }
  customElements.define("estrella-el", Estrella);
}
