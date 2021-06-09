//Desafio Complementario Clase 6: Ordenar array de productos (con bubble sort)
/*
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
}*/

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

simularCompra();