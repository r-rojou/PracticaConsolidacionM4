let asignarEventos = ()=>{
    let botonPagar = document.getElementById('botonPagar');
    botonPagar.addEventListener('click', function(){
        objCarrito.calcularTotalCompra();
        objCarrito.finalizarCompra();


        let mensaje = `Productos en el carrito: \n`;

        objCarrito.productos.forEach(producto => {
            mensaje += `${producto.nombre}: ${producto.precio}. Cantidad: ${producto.cantidad} \n`;
        });

        let total = objCarrito.valorFinalAPagar;
        mensaje += `\n Total a pagar: ${total}. \n Será transferido a la página de pagos. Gracias por su compra.`;

        alert(mensaje);
    });


}



class Producto{
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    verPrecioProducto(){
        console.log(`El precio de ${this.nombre} es de ${this.precio}`)
    }
}



class Carrito{
    constructor(productos, valorFinalAPagar){
        this.productos = productos;
        this.valorFinalAPagar = valorFinalAPagar;

    }

    agregarProductos(unProducto){
        // Busca en el array si existe el producto en el carrito para agregarlo o sumarle uno
        let productoExistente = this.productos.find(prod => prod.nombre === unProducto.nombre);
        if(productoExistente){
            productoExistente.cantidad += unProducto.cantidad;
        }
        else{
        this.productos.push(unProducto);
        }
    }

    quitarProductos(unProducto){
        // Busca en el array el producto que se quiere quitar y se crea un array diferente sin el producto que se excluye del carrito
        let productoExistente = this.productos.find(prod => prod.nombre === unProducto.nombre);
        if(productoExistente && productoExistente.cantidad > 0){
            productoExistente.cantidad -= unProducto.cantidad;
            if(productoExistente.cantidad <= 0){
                this.productos = this.productos.filter(prod => prod.nombre !== unProducto.nombre);
            }

        }

    }

    calcularTotalCompra(){
        this.valorFinalAPagar = 0;
        for(const producto of this.productos){
            this.valorFinalAPagar += producto.precio * producto.cantidad; 

        }
    }

    finalizarCompra(){
        let elValorFinalApagar = document.getElementById('txtValorFinalAPagar');
        if(elValorFinalApagar){
            elValorFinalApagar.innerText = this.valorFinalAPagar;
        }
        else{
            console.log('txtValorFinalApagar no encontrado');
        }
       

    }
}

let objCarrito = new Carrito([], 0); 

let agregarProducto = (nombreProducto, precioProducto)=>{

    let nuevoProducto = new Producto(nombreProducto, precioProducto, 1);

    objCarrito.agregarProductos(nuevoProducto); // Agrega producto o aumenta si ya existe
    let cantidadSpan = document.getElementById(`cantidad${nombreProducto}`);
    cantidadSpan.innerText = parseInt(cantidadSpan.innerText) + 1;

    // Al dejarlas activas, cada vez que se presiona agregar un producto se suma a la caja del valor total automaticamente
    // objCarrito.calcularTotalCompra();
    // objCarrito.finalizarCompra();
}

let quitarProducto = (nombreProducto, precioProducto)=>{

    let quitar = new Producto(nombreProducto, precioProducto, 1);
    objCarrito.quitarProductos(quitar);
    let cantidadSpan = document.getElementById(`cantidad${nombreProducto}`);
    let nuevaCantidad = parseInt(cantidadSpan.innerText) - 1;

    if(nuevaCantidad >= 0){
        cantidadSpan.innerText = nuevaCantidad;
    }

    // Al dejarlas activas, cada vez que se presiona quitar un producto se resta a la caja del valor total automaticamente
    // objCarrito.calcularTotalCompra();
    // objCarrito.finalizarCompra();
}

let atraparDatos = ()=>{

    // Proceso
    objCarrito.calcularTotalCompra();

    // Salida

    objCarrito.finalizarCompra();

    return objCarrito;
}

let integracion = ()=>{
    let elCarritoCompras = atraparDatos();
    console.log(elCarritoCompras)

}



