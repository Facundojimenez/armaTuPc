///Definiciones de clases
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

///Busca los productos desde un JSON y luego los muestra en pantalla. Tambien dibuja el carrito
async function getProductos(){
    arrProductos = await (await fetch("https://raw.githubusercontent.com/Facundojimenez/armaTuPc/main/productos.json")).json();
    
    //Creacion de articulos iterando el array de productos
    arrProductos.forEach((producto) => {
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
                                </div>`;
        $("#listadoProductos").append(divCard);
        //agrego evento al boton de añadir producto / actualizar cantidad
        $(`.card-body button[idproducto='${producto.id}']`).on("click", agregarAlCarrito);
    })
    actualizarCarrito();
}

//--- FUNCIONES DE CARRITO ---

function agregarAlCarrito(evento) {
    const idProductoLlamador = parseInt(evento.target.getAttribute("idproducto"));
    const cantidadUnidades = parseInt(evento.target.parentNode.querySelector(".inputCantidadContainer input").value);

    const existe = carrito.some(producto => producto.idProducto == idProductoLlamador);
    if (existe) {
        const productos = carrito.map(producto => {
            if (producto.idProducto === idProductoLlamador) {
                producto.cantidad = producto.cantidad + cantidadUnidades;
            }
            return producto; // retorna el objeto que no esta aún en el carrito 
        });
        carrito = [...productos];
    } else {
        carrito.push(new LineaProducto(idProductoLlamador, cantidadUnidades));
    }
    evento.target.innerHTML = "Agregar más";
    actualizarCarrito();
}

//Eliminacion de elemento en el carrito (botón Quitar)

function eliminarDelCarrito(evento){
    const idProductoLlamador = parseInt(evento.target.getAttribute("idproducto"));
    const lineaProductoEncontrada = carrito.find(lineaProd => lineaProd.idProducto == idProductoLlamador);
    const indiceLinea = carrito.indexOf(lineaProductoEncontrada);
    carrito.splice(indiceLinea, 1);
    actualizarCarrito();

    ///ahora reseteo el texto de "actualizar cantidad" a "agregar al carrito"
    $(`#listadoProductos [idproducto='${idProductoLlamador}']`).text("Agregar al carrito");
}

//Vuelve a dibujar el carrito y a actualizar los importes totales y demás detalles.

function actualizarCarrito(){
    let subtotal = 0;
    $("#listadoCarrito").empty();

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
        $("#listadoCarrito").append(elementoLista);
        ///agrego evento al boton de quitar
        $(`.productoCarrito button[idproducto='${productoAsociado.id}']`).on("click", eliminarDelCarrito);
        subtotal += productoAsociado.precio * linea.cantidad;
    });

    ///si el carrito está vacio, entonces muestro un mensaje con un h5
    if(carrito.length === 0){
        $("#listadoCarrito").append(`<h5>Todavia no agregaste productos a tu carrito</h5>`)
    }
    
    //Actualizo el HTML de los detalles
    arrayDetalles = document.querySelectorAll(".resumenDetalles .col");
    arrayDetalles[0].innerHTML = "$" + subtotal;
    arrayDetalles[1].innerHTML = "$" + parseInt(subtotal * 0.21);
    arrayDetalles[2].innerHTML = "$" + parseInt(subtotal * 1.21);
}

///Cargo el carrito con la info en local storage
const infoCarritoExistente = JSON.parse(localStorage.getItem("productosCarrito"));
let carrito = infoCarritoExistente;
if(infoCarritoExistente == null){
    carrito = [];
}
carrito = JSON.parse(localStorage.getItem("productosCarrito"));
 
let arrProductos = getProductos();


///animación para agrandar y achicar la letra en el botón de "confirmar pedido"
$(".resumenDetalles button").on("click", () => {
    $(".resumenDetalles button").animate({fontSize: "1.3rem"})
                                .animate({fontSize: "1.2rem"});
});

$(() => {
    $(".bannerBienvenida h4").slideDown(500);
})

