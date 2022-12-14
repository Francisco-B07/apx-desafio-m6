import { state } from "../../state";
import { Router } from "@vaadin/router";

class Result extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    this.render();

    var botonEl = this.shadow.querySelector(".container-boton");
    botonEl?.addEventListener("click", () => {
      state.setChoice("");
      state.setStart(false);
      state.pushJugada((err) => {
        if (err) console.error("Hubo un error en pushJugada de result");

        Router.go("/instructions");
      });
    });
  }
  render() {
    const cs = state.getState();

    const div = document.createElement("div");
    var style = document.createElement("style");
    style.textContent = `
          .container{
            width:100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--fondo-${cs.resultado});          
          }
  
          .container-score{
            margin-top: 100px;
            width: 259px;
            height: 200px;
            background-color: #FFFFFF;
            border: 10px solid #000000;
            border-radius: 10px; 
          }
          @media (max-width: 370px){
            .container-score{
              margin-top: 65px;
          }
          }
          .titulo-score{
            text-align:center;
            font-size: 30px;
            margin-bottom: 30px;
          }
          .container-boton{
            width: 322px;
            margin-top: 30px;
          }
          @media (max-width: 370px){
            .container-boton{
              width: 290px;
              margin-top: 20px;
  
            }
          }
          .puntajes{
            text-align: end;
            margin-right: 20px;
            font-size: 20px;
          }
          .img-fondo-arriba{
            position: absolute;
            bottom: 62%;
            Width: 158px;
            Height: 375px;
            transform: rotate(180deg);
            left: 30%;          
          }        
  
      `;

    div.innerHTML = `
    <div class="container">
      <estrella-el resultado="${cs.resultado}"></estrella-el> 
      <div class="container-score">
        <h2 tag="h2" class="titulo-score">Puntaje</h2>
        <p class="puntajes" tag="p">${cs.currentGame.nombre}: ${cs.currentGame.score}</p>
        <p class="puntajes" tag="p">${cs.oponente.nombre}: ${cs.oponente.score}</p>    
      </div>
      <div class="container-boton">
          <button-el >Volver a Jugar</button-el>
      </div>      
    </div>
    `;
    this.shadow.firstChild?.remove();

    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("result-component", Result);
