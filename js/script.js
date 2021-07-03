class Producto{
    constructor(id, marca, modelo, descripcion, precio, categoria, urlFoto){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.urlFoto = urlFoto;
    }
}

class LineaProducto{ //representa una entidad que incluye una referencia al producto y su cantidad
    constructor(idProducto, cantidad){
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }
}

///Array hardcodeado que se guarda en local storage 
let arrProductosAux = [
    new Producto(1,"Intel", "i3 10100", "Microprocesador de 4 núcleo y 8 hilos", 14999, "cpu", "media/productos/procesadores/intel-i3-10th.jpg"),         
    new Producto(2, "Intel", "i5 10400", "Microprocesador de 6 núcleo y 12 hilos", 22999, "cpu", "media/productos/procesadores/intel-i5-10th.jpg"),
    new Producto(3, "AMD", "Ryzen 5 3600", "Microprocesador de 6 núcleo y 12 hilos", 31999, "cpu", "media/productos/procesadores/ryzen-5.jpg"),      
    new Producto(4, "AMD", "Ryzen 7 3700", "Microprocesador de 8 núcleo y 12 hilos", 43999, "cpu", "media/productos/procesadores/ryzen-7.jpg"),      
    new Producto(5, "MSI", "A320m", "Motherboard compatible con los procesadores de AMD de 1era, 2da y 3ra generación", 8499, "mobo", "media/productos/mobos/amd-a320.jpg"),
    new Producto(6, "MSI", "X570", "Motherboard compatible con los procesadores de AMD de 2da, 3ra y 4ta generación", 25399, "mobo", "media/productos/mobos/amd-x570.png"),
    new Producto(7, "Asus", "H410m", "Motherboard compatible con los procesadores de Intel de 10va y 11va generación", 7999, "mobo", "media/productos/mobos/intel-h410.jpg"),
    new Producto(8, "Gigabyte", "b460m", "Motherboard compatible con los procesadores de Intel de 10va y 11va generación", 14999, "mobo", "media/productos/mobos/intel-b460.jpg"),
    new Producto(10, "Gigabyte", "RTX 2060", "Placa de video con 6GB de VRAM GDDR6", 39999, "gpu", "media/productos/gpus/rtx-2060.jpg"),
    new Producto(11, "Asus", "RTX 3080", "Placa de video con 12GB de VRAM GDDR6X", 125999, "gpu", "media/productos/gpus/rtx-3080.png"),
    new Producto(12, "Gigabyte", "RX 5700 XT", "Placa de video con 8GB de VRAM GDDR6", 99999, "gpu", "media/productos/gpus/rx-5700-xt.png")
];

///Guardo el array hardcodeado con los productos en local storage para despues recuperarla (simulando traerme la info de una API o una BD) 
localStorage.setItem("productos", JSON.stringify(arrProductosAux));
const arrProductos = JSON.parse(localStorage.getItem("productos"));

///intento cargar al carrito con la info almacenada en local storage
let carrito;
const infoCarritoExistente = JSON.parse(localStorage.getItem("productosCarrito"));
if(infoCarritoExistente === null){
    carrito = []; ///Se crea un array vacio
}
else{
    carrito = infoCarritoExistente; ///El carrito se carga con lo que se cargó previamente en local storage
}
actualizarCarrito(); ///intento dibujar el carrito


//Creacion de articulos iterando el array de productos
arrProductos.forEach((producto) => {
    const listadoProductosRow = document.querySelector("#listadoProductos");
    const divCard = document.createElement("div");
    let mensajeBoton;
    ///en la primera carga de la pagina busco a cada producto en el carrito y cambio el mensaje del botón dependiendo de si lo encontró o no
    if(carrito.find(lineaProd => lineaProd.idProducto == producto.id) === undefined){
        mensajeBoton = "Agregar al carrito";
    }
    else{
        mensajeBoton = "Agregar más";
    }
    divCard.classList.add("col", "mb-4");
    divCard.innerHTML =     `<div class="card h-100 producto">
                                <img src="${producto.urlFoto}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="precio">$${producto.precio}</h5>
                                    <h5 class="card-title">${producto.marca} ${producto.modelo}</h5>
                                    <p class="card-text">${producto.descripcion}</p>
                                    <div class="inputCantidadContainer">
                                        <label for="cantidad1">Cantidad</label>
                                        <input type="number" class="form-control my-2" value="1" min="1">
                                    </div>
                                    <button class="btn btn-primary btn-lg btn-block" type="button" idproducto="${producto.id}">${mensajeBoton}</button>
                                </div>
                            </div>`
    listadoProductosRow.appendChild(divCard)
    //agrego evento al boton de añadir producto / actualizar cantidad
    $(`.card-body button[idproducto='${producto.id}']`).on("click", agregarAlCarrito);
})

//--- FUNCIONES DE CARRITO ---

function agregarAlCarrito(evento) {
    let idProductoLlamador = parseInt(evento.target.getAttribute("idproducto"));
    let cantidadUnidades = parseInt(evento.target.parentNode.querySelector(".inputCantidadContainer input").value);

    const existe = carrito.some(producto => producto.idProducto == idProductoLlamador);
    if (existe) {
        const productos = carrito.map(producto => {
            if (producto.idProducto === idProductoLlamador) {
                producto.cantidad = producto.cantidad + cantidadUnidades;
            }
            return producto; // retorna el objeto que no esta aún en el carrito 
        });
        carrito = [...productos];
        console.log(carrito)
    } else {
        carrito.push(new LineaProducto(idProductoLlamador, cantidadUnidades));
        console.log(carrito)
    }
    evento.target.innerHTML = "Agregar más";
    actualizarCarrito();
}

//Eliminacion de elemento en el carrito (botón Quitar)

function eliminarDelCarrito(evento){
    let idProductoLlamador = parseInt(evento.target.getAttribute("idproducto"));
    let lineaProductoEncontrada = carrito.find(lineaProd => lineaProd.idProducto == idProductoLlamador);
    let indiceLinea = carrito.indexOf(lineaProductoEncontrada);
    carrito.splice(indiceLinea, 1);
    actualizarCarrito();

    ///ahora reseteo el texto de "actualizar cantidad" a "agregar al carrito"
    const productoListado = document.querySelector(`#listadoProductos [idproducto='${idProductoLlamador}']`);
    productoListado.innerText = "Agregar al carrito";
}

//Vuelve a dibujar el carrito y a actualizar los importes totales y demás detalles.

function actualizarCarrito(){
    let subtotal = 0;
    const listadoCarrito = document.getElementById("listadoCarrito");

    listadoCarrito.innerHTML = ""; 
    
    ///actualizo la info del local storage
    localStorage.setItem("productosCarrito", JSON.stringify(carrito));

    carrito.forEach((linea) => {
        productoAsociado = arrProductos.find(producto => producto.id === linea.idProducto);
        elementoLista = document.createElement("li");
        elementoLista.classList.add("media", "productoCarrito", "row","my-2", "py-2");
        elementoLista.innerHTML =  `<img class="mr-1 col-3 col-md-3 p-0" src="${productoAsociado.urlFoto}">
                                    <div class="media-body col-6 col-md-7">
                                        <h5 class="mt-0 mb-1">${productoAsociado.marca} ${productoAsociado.modelo}</h5>
                                        <h6>x${linea.cantidad} unidad/es</h6>
                                    </div>
                                    <div class="col-3 col-md-2 text-right">
                                        <h6 class="my-1">$${productoAsociado.precio}</h6>
                                        <button class="btn btn-sm btn-danger" type="button" idproducto="${productoAsociado.id}">Quitar</button>
                                    </div>`
        listadoCarrito.appendChild(elementoLista);
        ///agrego evento al boton de quitar
        $(`.productoCarrito button[idproducto='${productoAsociado.id}']`).on("click", eliminarDelCarrito);
        subtotal += productoAsociado.precio * linea.cantidad;
    });

    ///si el carrito está vacio, entonces muestro un mensaje con un h5
    if(carrito.length === 0){
        const mensajeCarritoVacio = document.createElement("h5");
        mensajeCarritoVacio.innerText = "Todavia no agregaste productos a tu carrito";
        listadoCarrito.appendChild(mensajeCarritoVacio);
    }
    
    //Actualizo el HTML de los detalles
    arrayDetalles = document.querySelectorAll(".resumenDetalles .col");
    arrayDetalles[0].innerHTML = "$" + subtotal;
    arrayDetalles[1].innerHTML = "$" + parseInt(subtotal * 0.21);
    arrayDetalles[2].innerHTML = "$" + parseInt(subtotal * 1.21);
}