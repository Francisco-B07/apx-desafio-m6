// console.log("hola");

fetch("/env")
  .then((res) => res.json)
  .then(
    (data) =>
      (document.querySelector(".root").textContent = JSON.stringify(data))
  );
