
/* ---Desafio anterior---


function calcularImporteTotal(){
    let precioProducto,
        cantidad,
        importeTotal = 0;
    
    precioProducto = parseFloat(prompt("Ingrese el precio del producto: (escriba un numero menor o igual a cero para terminar)"));
    while(precioProducto > 0){
        cantidad = parseInt(prompt("Ingrese la cantidad de unidades: "));
        importeTotal += sumarProducto(precioProducto, cantidad);
        precioProducto = parseFloat(prompt("Ingrese el precio de otro producto: (escriba 0 para terminar)"));
    }
    return importeTotal;
}

function sumarProducto(precio, cantidad){
    return precio * cantidad;
}

//Invocacion de funciones:
let importeTotal = calcularImporteTotal();
alert("El importe total es: " + importeTotal);
*/

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
            alert(atributo + ": " + this[atributo]);
        }
    }
    cargar(){
        this.id = parseInt(prompt("Ingrese el ID del producto"));
        this.marca = prompt("Ingrese la marca");
        this.modelo = prompt("Ingrese el modelo");
        this.descripcion = prompt("Ingrese la descripcion");
        this.precio = parseInt(prompt("Ingrese el precio"));
        this.categoria = prompt("Ingrese la categoria");
    }
}

const producto = new Producto(1, "intel", "i5 10400", "6 cores", 9000, "cpu");
//producto.mostrar();
producto.cargar();
producto.mostrar();
