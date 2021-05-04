//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
//https://scholar.google.es/scholar?q=source%3A"  String  "+sphero
//var term;

//Este fue el script que use para buscar por parte del cliente
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('input').addEventListener('change', leerArchivo, false);
  document.querySelector("#termino").addEventListener("change", function() {
    var term = document.querySelector("#termino").textContent;
  });
});
function leerArchivo(e) {
  let term = document.getElementById('termino').textContent;
  console.log(term);
    //agarras el file
  let archivo = e.target.files[0];
  //Si el archivo esta definido
  if (!archivo) {
    return;
  }
  //declaras un objeto que leera el archivo
  let lector = new FileReader();
  //lees el archivo
  lector.readAsText(archivo);
  //evento cuando se termine de leer el archivo
  lector.onload = function(e) {
    let contenido = e.target.result;
    let arr = contenido.split("\n");
    //for(line in arr) {
     // if(line == 0)
       // line++;
      console.log(arr[1]);
    	mostrarContenido(arr[1], term);
    //}
  };
}

  
function mostrarContenido(contenido, term) {
  let elemento = document.getElementById('contenido');
  let string = elemento.textContent;
  //se filtra el string
  elemento.innerHTML = string+"\n"+filtrarContenido(contenido, term);
}

function filtrarContenido(str, term){
  let patt = new RegExp("^([0-9]+)\;[0-9]+\;\"(.*)\"\;[a-z]+");
  let arr = str.match(patt);
  let index = arr[1];
  let nombre = arr[2];
  console.log(index);
  console.log(nombre);
  let result = index + " " + nombre; 
  
  buscar(nombre, term);
  return result; 
}

function buscar(nombre, term){
  //busque en google
  nombre = nombre.replace(/ /g, "+");
  const url = "https://scholar.google.es/scholar?q=source%3A\"" + nombre +"\" sphero";
  //https://scholar.google.es/scholar?q=source%3A"Review+of+Educational+Research"+sphero
  //https://scholar.google.es/scholar?q=Sphero+and+"Computational+thinking"+and+%28school+or+college+or+schoolhouse%29
  
  console.log(url);
  fetch(url).then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
      }
    );
  //se espera obtener un html del url ingresado
  //buscar clase gs_ab_mdw, entonces coger el texto que buscamos
  //obtener el numero por medio de expresiones regulares o retornar 0 si esta vacio
  //unirlo a la cadena vacia "" y volver a buscar
  //una vez todo buscado
  //imprimirlo o si fuera posible generar un nuevo archivo
}
