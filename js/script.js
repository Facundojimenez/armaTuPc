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