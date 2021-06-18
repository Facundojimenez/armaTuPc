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

// Practica de clase 8: DOM

let arrProductos = [
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


let listadoProductosRow = document.querySelector("#listadoProductos");
console.log(listadoProductosRow);

arrProductos.forEach((producto) => {
    let divCard = document.createElement("div");
    divCard.classList.add("col", "mb-4");
    divCard.innerHTML =     `<div class="card h-100 producto">
                                <img src="${producto.urlFoto}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="precio">$${producto.precio}</h5>
                                    <h5 class="card-title">${producto.marca} ${producto.modelo}</h5>
                                    <p class="card-text">${producto.descripcion}</p>
                                    <div class="inputCantidadContainer">
                                        <label for="cantidad1">Cantidad</label>
                                        <input type="number" class="form-control my-2" id="cantidad1" value="1" min="1">
                                    </div>
                                    <button id="agregarProducto" type="button" class="btn btn-primary btn-lg btn-block">Agregar al carrito</button>
                                </div>
                            </div>`
    listadoProductosRow.appendChild(divCard)
    console.log(divCard);
})