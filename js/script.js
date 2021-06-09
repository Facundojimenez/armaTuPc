
/* ---Desafio anterior (clase 4)---


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
}
/* Invocacion de funciones para el desafio de la clase 5

const producto = new Producto(1, "intel", "i5 10400", "6 cores", 9000, "cpu");
//producto.mostrar();
producto.cargar();
producto.mostrar();
*/

/*
let arrNumeros = [1,2,3,4,5],
    arrMenorA3 = arrNumeros.filter((elemento) => elemento < 3);
    arrNumerosDoble = arrNumeros.map((elemento) => elemento * 2);

console.log(arrNumeros.toString());
console.log(arrMenorA3.toString());
console.log(arrNumerosDoble.toString());
*/


//Desafio Complementario Clase 6: Ordenar array de productos (con bubble sort)

function bubbleSort(arr, funcComparacion){
    let i,
        j;
    for(i = 0; i < arr.length - 1; i++){
        for(j = 0; j < arr.length - 1 - i; j++){
            if(funcComparacion(arr[j], arr[j + 1]) > 0){
                intercambiarElemArr(arr, j, j + 1);
            }
        }
    }
}

function buscarMenor(arr){
    let menor = arr[0],
        i;
    for(i = 1; i < arr.length; i++){
        if(arr[i] < menor){
            menor = arr[i];
        }
    }
    return menor;
}

function intercambiarElemArr(arr, posA, posB){
    let aux = arr[posA];
    arr[posA] = arr[posB];
    arr[posB] = aux;
}

// funciones de comparacion (aunque puedo usar arrow functions)

function compararEnterosAsc(a, b){
    return a - b;
}

function compararEnterosDesc(a, b){
    return b - a;
}

function compararProductosIdAsc(prod1, prod2){
    return prod1.id - prod2.id;
}

function compararProductosMarcaAsc(prod1, prod2){
    if(prod1.marca > prod2.marca){
        return 1;
    }
    if(prod1.marca < prod2.marca){
        return -1;
    }
    return 0;
}

// Llamado a las funciones, primero cargo un array con productos --> lo muestro -> Lo ordeno por marca --> lo muestro --> Lo ordeno por ID --> lo muestro
/*
let arrProductos = [new Producto(1,"Intel", "i3 10100"), new Producto(5, "AMD", "Ryzen 5 3600"), new Producto(2, "Intel", "i7 10700F"), new Producto(20, "AMD", "Ryzen 3 1200")];

console.log("\n\n--------Array de productos original--------\n\n");
for(producto of arrProductos){
    producto.mostrarConsole();
}

bubbleSort(arrProductos, compararProductosMarcaAsc);
console.log("\n\n--------Ahora lo muestro ordenado por marca ASC--------\n\n");
for(producto of arrProductos){
    producto.mostrarConsole();
}


bubbleSort(arrProductos, compararProductosIdAsc);
console.log("\n\n--------Ahora lo muestro ordenado por id ASC-------\n\n");
for(producto of arrProductos){
    producto.mostrarConsole();
}
*/

// Desafío obligatorio de la clase 6:



let arrProductos = [new Producto(1,"Intel", "i3 10100", "4 cores", 14999, "cpu"),
                    new Producto(5, "AMD", "Ryzen 5 3600", "6 cores", 31999, "cpu"),
                    new Producto(2, "Intel", "i7 10700F", "8 cores", 40000, "cpu"),
                    new Producto(20, "AMD", "Ryzen 3 1200", "4 cores", 10000, "cpu")];

console.log("Mostrando array original con los productos");
for(producto of arrProductos){
    producto.mostrarConsole();
 }



let arrProductosPrecioMasDe30000 = arrProductos.filter((producto) => producto.precio > 30000);

console.log("\n\nMostrando array con los productos que tienen un precio mayor a 30000$");
for(producto of arrProductosPrecioMasDe30000){
    producto.mostrarConsole();
}