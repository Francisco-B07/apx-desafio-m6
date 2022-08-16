export function initWelcome(params) {
  const div = document.createElement("div");

  const imageURL = require("url:../../img/fondo.svg");

  var style = document.createElement("style");
  style.textContent = `
        span{
          color: #91CCAF;
          font-size: 80px;
          font-weight: bold;
          display: inline;
        }
        @media (max-width: 370px){
          span{
            font-size: 60px;
        }
        }

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

        .titulo{
          padding: 115px 34px 74px 34px;          
        }
        @media (max-width: 370px){
          .titulo{
            padding: 80px 25px 74px 25px;          
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
      <div class="titulo">    
        <text-el tag="h1"> Piedra Papel </text-el>
        <span>ó</span> 
        <text-el tag="h1">Tijera</text-el>
      </div>
      <div class="container-boton">
          <button-el >Empezar</button-el>
      </div>
      <div class="container-figuras">      
        <piedra-papel-tijera></piedra-papel-tijera>
      </div>
    </div>
  </div>
  `;

  div.append(style);
  var botonEl = div.querySelector(".container-boton");

  botonEl.addEventListener("click", () => {
    params.goTo("/instructions");
  });

  return div;
}
