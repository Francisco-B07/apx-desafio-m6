import { state } from "../../state";
export function initCompartiCodigo(params) {
  const div = document.createElement("div");
  const imageURL = require("url:../../img/fondo.svg");
  const cs = state.getState();
  const currentState = localStorage.getItem("state");
  const localData = currentState ? JSON.parse(currentState) : "";

  var style = document.createElement("style");
  style.textContent = `
        .container{
          background-image: url(${imageURL});
          width:100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container-page{
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
        }
        .nombre1,
        .score1 {
          font-family: "American Typewriter";
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 100%;
          color: #000000;
        }
        .nombre1,
        .score1 {
          font-family: "American Typewriter";
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 100%;
          color: #ff6442;
        }
        .sala {
          font-family: "American Typewriter";
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 108.5%;
          text-align: right;
          color: #000000;
        }
        .numero-sala {
          font-family: "American Typewriter";
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 108.5%;
          text-align: right;
          color: #000000;
        }
        
        .instrucciones{
          padding: 70px 27px 0px 27px;
          text-align: center;
        }

        @media (max-width: 370px){
          .instrucciones{
          padding: 50px 27px 0px 27px;
        }
        }

        .container-boton{
          width: 322px;
        }
        @media (max-width: 370px){
          .container-boton{
            width: 290px;
          }
        }

        .container-figuras{
          position: absolute;
          left: 15%;
          top: 87%;
        }
        @media (max-width: 370px){
          .container-figuras{
            left: 7%;
          }
        }
        
        @media (min-width: 600px){
          .container-figuras{
            left: 40%;
            top: 87%;
          }
        }


        
    `;

  div.innerHTML = `
  <div class="container">
    <div class="container-page">
    <div class="header">
    <div class="score">
      <div class="player1">
        <span class="nombre1">${localData.nombre}:</span>
        <span class="score1"></span>
      </div>
      <div class="player2">
        <span class="nombre2">${localData.nombreRival}:</span>
        <span class="score2"></span>
      </div>
    </div>
    <div class="sala">
      <p class="sala">Sala</p>
      <p class="numero-sala">${localData.roomId}</p>
    </div>
  </div>
      <div class="instrucciones">    
        <text-el tag="p"> Compartí el código:</text-el>
        <span class="codigo">${localData.roomId}</span>
        <text-el tag="p"> Con tu contrincante</text-el>
        
       
        <div class="container-figuras">      
        <piedra-papel-tijera></piedra-papel-tijera>
        </div>
    </div>
  </div>
  `;

  div.append(style);

  return div;
}
