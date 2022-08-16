export function initInstructions(params) {
  const div = document.createElement("div");
  const imageURL = require("url:../../img/fondo.svg");

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
      <div class="instrucciones">    
        <text-el tag="p"> Presioná jugar
        y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-el>
        </div>
        <div class="container-boton">
          <button-el >¡Jugar!</button-el>
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
    params.goTo("/play");
  });

  return div;
}
