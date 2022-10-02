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
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .header {
          padding:24px 20px 0px 20px;
          display: flex;
          justify-content: space-between;
          width:100%;
        }
        .player{
          display: flex;
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
        .nombre1{
          min-width:130px;
          text-align: center;

        }
        .nombre2,
        .score2 {
          font-family: "American Typewriter";
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 100%;
          color: #ff6442;
        }
        .nombre2{
          min-width:130px;
          text-align: center;

        }
        .sala {
          margin: 0px;
          font-family: "American Typewriter";
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 108.5%;
          text-align: right;
          color: #000000;
        }
        .numero-sala {
          margin: 0px;
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
          padding: 70px 27px 0px 27px;
          }
        }

        .codigo{
          font-style: normal;
          font-weight: 700;
          font-size: 48px;
          line-height: 100%;
          text-align: center;
          color: #000000;
        }


        .container-figuras{
          position: absolute;
          left: 15%;
          top: 80%;
        }
        @media (max-width: 370px){
          .container-figuras{
            left: 7%;
          }
        }
        
        @media (min-width: 600px){
          .container-figuras{
            left: 40%;
            top: 80%;
          }
        }


        
    `;

  div.innerHTML = `
  <div class="container">
    <div class="container-page">
      <div class="header">
        <div class="score">
          <div class="player">
            <div class="nombre1">
              <span class="">${localData.nombre}:</span>
            </div>
            <span class="score1">${localData.score}</span>
          </div>
          <div class="player">
            <div class="nombre2">
              <span class="">${localData.nombreRival}:</span>
            </div>
            <span class="score2">${localData.scoreRival}</span>
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
        
      </div>
       <div class="container-figuras">      
        <piedra-papel-tijera></piedra-papel-tijera>
      </div>

    </div>
  </div>
  `;

  div.append(style);

  state.subscribe(() => {
    const cs = state.getState();

    if (cs.players == 2) {
      params.goTo("/instructions");
    }
  });
  return div;
}
