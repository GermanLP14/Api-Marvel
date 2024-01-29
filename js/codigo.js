$( document ).ready(function() {
    mostrarPersonajes();
    personaje();  
    buscar();
});

let url = 'https://gateway.marvel.com/v1/public/characters?ts=3000&apikey=b1752776229552f224e32528827becde&hash=aa7338f8f143cd8c0c657687b290a31e';

function mostrarPersonajes(){
    
    $('#listado').empty();
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json ',
        success: function (data) {

            console.log(data);
            let listado = $('#listado');
            data.data.results.forEach(element => {
                let url = element.thumbnail.path
                let tipoImagen = element.thumbnail.extension
                let imagenCompleta = url+"."+tipoImagen
                listado.append(`<img onClick="mostrarDetalles(${element.id})" id="carta" src="${imagenCompleta}"class="col-3 p-2" style="width: 300px; height:300px; object-fit: cover">`)
                localStorage.setItem('idChar',element.id);
            });
        },
        error: function (e1, e2, e3) {
            console.log('Error...', e1, e2, e3);
        },
        complete: function () {
            console.log('Fin!');
        },
    });
}

function buscar() {

    let x = document.getElementById("mostrando");
    let y = document.getElementById("listado");

    let busqueda = $('#buscar').val();
    
    $('#listado').empty();
    $.ajax({
        url: url,
        type: 'GET',
        data: {
            nameStartsWith: busqueda            
        },
        dataType: 'json ',
        success: function (data) {            
            console.log(data);
            let listado = $('#listado');
            data.data.results.forEach(element => {
                let url = element.thumbnail.path
                let tipoImagen = element.thumbnail.extension
                let imagenCompleta = url+"."+tipoImagen
                listado.append(`<a href="personaje.html" onclick="mostrarDetalles(${element.id})"><img src="${imagenCompleta}"class="col-3 p-2" style="width: 300px; height:300px; object-fit: cover"></a>`)
                return element.id;
            });
            if (data != null) {                
                x.style.display = "none";
                y.style.display = "block";
            } else {
                x.style.display = "block";
                y.style.display = "none";
            }

        },
        error: function (e1, e2, e3) {
            console.log('Error...', e1, e2, e3);
        },
        complete: function () {
            console.log('Fin!');
        }, 
    });
}  

function mostrarDetalles(id){
    localStorage.setItem('idChar', id);
    window.location = "personaje.html";
}

function personaje() {

    let x = document.getElementById("listado");

    $.ajax({
        url: `https://gateway.marvel.com/v1/public/characters/${localStorage.getItem('idChar')}?apikey=b1752776229552f224e32528827becde&hash=aa7338f8f143cd8c0c657687b290a31e&ts=3000`,
        type: 'GET',
        dataType: 'json ',
        success: function (data) {
            data.data.results.forEach(element => {
                let url = element.thumbnail.path
                let tipoImagen = element.thumbnail.extension
                let imagenCompleta = url+"."+tipoImagen

                titulo.append(`${element.name}`);

                var img = document.createElement("img");
                img.src = imagenCompleta;
                var src = document.getElementById("personaje");
                src.appendChild(img);

                const comics = document.getElementById("comics");

                element.comics.items.forEach(com => {

                    let li = document.createElement("li");
                    let nombre = document.createTextNode(com.name);
                    li.appendChild(nombre);
                    comics.appendChild(li);
                    console.log(com.name);
                })
            });

            if (data != null) {                
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }

        },
        error: function (e1, e2, e3) {
            console.log('Error...', e1, e2, e3);
        },
        complete: function () {
            console.log('Finito!');
        },
    }); 
}