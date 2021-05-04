/*
npm install google-scholar --save
npm install express
require the module let scholar = require('google-scholar')
get searching!*/
let scholar = require('google-scholar')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
app.use(express.static('pub'))

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
});

/*app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'))
})*/

app.get('/', (request, response) => {
	fs.readFile(path.resolve(__dirname, 'priv/revistas.csv'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
            let arr = data.split("\n"); //se divide el string por \n y se mete en un arreglo
            busqueda(arr, 1);
		})
})

function filtrarContenido(str){
    let patt = new RegExp("^[0-9]+\;[0-9]+\;\"(.*)\"\;[a-z]+");
    let arr = str.match(patt);
    let nombre = arr[1];
    console.log(nombre);
    return nombre; 
}

function busqueda(arr, idx){
    if(arr[idx] === "") { //caso base de la recursion
        console.log(arr[idx] + "esta es una cadena vacia");
        return
    } else {
        //Por medio de una expresion regular se extrae el nombre del journal
        let query = filtrarContenido(arr[idx]);
        let idx = idx + 1;
        let busqueda = scholar.search(`source:"${query}" sphero`);
        busqueda.then (resultsObj => {
            //por el momento se imprime en consola luego se mejorara para imprimirlo en un archivo .html
            console.log((idx - 1) + ". " + query + " incidencias con: sphero -> " + resultsObj.count);
            busqueda(arr, idx);
        });
    }
}
