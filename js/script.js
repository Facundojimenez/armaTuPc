class Producto{
    constructor(id, marca, modelo, descripcion, precio, categoria){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
    }
    mostrar(){
        for(const atributo in this){
            alert(atributo + ": " + this[atributo] + "");
        }
    }
    mostrarConsole(){
        for(const atributo in this){
            console.log(atributo + ": " + this[atributo]);
        }
        console.log("\n\n");
    }
    cargar(){
        this.id = parseInt(prompt("Ingrese el ID del producto"));
        this.marca = prompt("Ingrese la marca");
        this.modelo = prompt("Ingrese el modelo");
        this.descripcion = prompt("Ingrese la descripcion");
        this.precio = parseInt(prompt("Ingrese el precio"));
        this.categoria = prompt("Ingrese la categoria");
    }
    toString(){
        return this.id + " " + this.marca + " " + this.modelo + " " + this.descripcion + " " + this.precio + " " + this.categoria;
    }
}

class LineaProducto{
    constructor(id, producto, cantidad){
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
    }
    mostrarConsole(){
        console.log("id: " + this.id);
        console.log("producto: " + this.producto.toString());
        console.log("cantidad: " + this.cantidad);
    }
}

// let producto1 = new Producto(1, "Intel", "i7 10700", "8 cores", 40000, "cpus");
// let linea1 = new LineaProducto(1, producto1, 3);
// producto1.precio = 50000;
// linea1.mostrarConsole();


/*El usuario ingresa el id del producto a comprar, luego ese ID se utiliza para buscar al producto en el array  obtener su info
Luego se solicita la cantidad y se hace la cuenta de precio*cantidad
Por ultimo se pregunta por alert() si se desea comprar otro producto. Como resultado la suma de precio y cantidad de todos los productos.
(se valida el ingreso del ID y de la cantidad con 'while')
*/

function simularCompra(){
    let arrProductos = [new Producto(1,"Intel", "i3 10100", "4 cores", 14999, "cpu"),
                    new Producto(5, "AMD", "Ryzen 5 3600", "6 cores", 31999, "cpu"),
                    new Producto(2, "Intel", "i7 10700F", "8 cores", 40000, "cpu"),
                    new Producto(20, "AMD", "Ryzen 3 1200", "4 cores", 10000, "cpu")];
    let idIngresado,
        cantidadIngresada,
        stringProductos = "",
        importeTotal = 0,
        productoEncontrado;
    
    ///Concateno en una string el array de productos
    for(producto of arrProductos){
        stringProductos += producto.toString() + "\n";
    }

    ///Ingreso de productos y cantidad
    do{
        idIngresado = parseInt(prompt("Nuestros productos son: \n" + stringProductos + "\nIngrese el id del producto que desea comprar"));
        productoEncontrado = arrProductos.find((producto) => producto.id === idIngresado);
        while(productoEncontrado === undefined){
            idIngresado = parseInt(prompt("No se encontró el producto ingresado, escriba un ID válido"));
            productoEncontrado = arrProductos.find((producto) => producto.id === idIngresado);
        }

        cantidadIngresada = parseInt(prompt("Ingrese la cantidad de unidades a comprar de ese producto"));
        while(cantidadIngresada < 0){
            cantidadIngresada = parseInt(prompt("La cantidad tiene que ser mayor o igual a cero, ingrese un número valido"));
        }
        importeTotal += productoEncontrado.precio * cantidadIngresada;
    }while(prompt("¿Desea comprar otro producto? (s/n): ").toUpperCase() === 'S');
    
    alert("El importe total es: " + importeTotal);
}

// simularCompra();

// Practica de clase 8: DOM


// let listadoProductos = document.getElementById("listadoProductos");

// let nuevoProducto = document.createElement("p");
// nuevoProducto.classList.add("col", "mb-4");
// nuevoProducto.innerHTML =   `<div class="card h-100 intel">
//                             <img src="media/productos/procesadores/intel-i3-10th.jpg" class="card-img-top" alt="...">
//                                 <div class="card-body">
//                                     <h5 class="precio">$14999</h5>
//                                     <h5 class="card-title">Intel i3 10100</h5>
//                                     <p class="card-text">Microprocesador de 4 núcleo y 8 hilos</p>
//                                     <button type="button" class="btn btn-primary btn-lg btn-block">Agregar al carrito</button>
//                                 </div>
//                             </div>`
// listadoProductos.appendChild(nuevoProducto);    

