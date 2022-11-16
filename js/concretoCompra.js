const carrito = []
let mensaje = ""
let iconoMsg = ""
const mensajeCarrito = (mensaje, iconoMsg) =>{
    Swal.fire({
        position: 'center',
        toast: true,
        icon: iconoMsg,
        title: mensaje,
        showConfirmButton: false,
        timer: 2000
    })
}
// verifico si hay info en el carrito
const revisoCarrito = () =>{
    if (localStorage.getItem("carrito")){
        let carritoExistente = JSON.parse(localStorage.getItem("carrito"))
        carritoExistente.forEach(producto => carrito.push(producto))
    }
    if (carrito.length === 0){
        mensaje = "El carrito está vacío!"
        iconoMsg = "warning"
        mensajeCarrito(mensaje, iconoMsg)
    }
}
revisoCarrito()
// descargo en el HTML la información del carrito, calculo el total de la compra y habilito la financiación
const cargarProductos = () =>{
    let muestroInfo = ""
    const carritoInfo = document.querySelector("section.contenedorCarrito")
    carritoInfo.innerHTML=""
    carrito.forEach(producto => {
        muestroInfo += `<article class=" row gridCarrito">
                            <div class="compraImg">
                                <img  class="prodImgTam" src="../imagenes/productos/${producto.imagen}">
                            </div>
                            <div class="compraCod">
                                <p class="tituloCod">Código</p>
                                <p>${producto.idProducto}</p>
                            </div>
                            <div class="compraDescri">
                                <p class="tituloDescri">Descripción</p>
                                <p>${producto.titulo}</p>
                            </div>
                            <div class="compraColor">
                                <p class="tituloColor">Color</p>
                                <p class="colores">${producto.color}</p>
                            </div>
                            <div class="compraPrecio">
                                <p class="tituloPrecio">Precio unitario</p>
                                <p>${producto.precio}</p>
                            </div>
                            <div class="compraCanti">
                                <p class="tituloCanti">Cantidad</p>
                                <p class="cantidad">${producto.cantidad}</p>
                            </div>
                            <div class="compraPrecioF">
                                <p class="tituloPrecioF">Subtotal</p>
                                <p>${producto.subtotal}</p>
                            </div>
                            <div class="compraBaja">
                                <a class="btn btn-secondary btnBaja" id="${producto.idProducto}">Eliminar</a>
                            </div>
                        </article>`
    })
    carritoInfo.innerHTML = muestroInfo
    let totalCompra = carrito.reduce((acc, producto)=> acc + producto.subtotal, 0)
    carritoInfo.innerHTML += `<div class="totalCompra">
                                <p>Total de la compra IVA incluído: $ ${totalCompra}</p>
                            </div>
                            <section class="pago">
                            <p>Financiación</p>
                            <select class="cuotas">
                                <option value="0">.</option>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="12">12</option>
                            </select>
                        </section>`
}
cargarProductos()
// activo los botones eliminar
const botonesEliminar = () =>{
    const eliminar = document.querySelectorAll("a.btnBaja")
    eliminar.forEach(btn => btn.addEventListener("click", (e) => {
        let indiceProducto = carrito.findIndex(producto => producto.idProducto === e.target.id)
        carrito.splice(indiceProducto,1)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        cargarProductos()
        formaPago()
        botonesEliminar()
    }))
}
botonesEliminar()
//calculo el pago en cuotas según lo que seleccione el cliente
const formaPago = () =>{
    const pago = document.querySelector("select.cuotas")
    let pagoFinal = (carrito.reduce((acc, producto)=> acc + producto.subtotal, 0)).toFixed(2)
    let cuotas = 1
    pago.addEventListener("change", ()=> {
        if (pago.value !== "0"){
            let cuotas = parseInt(pago.value)
            let pagoFinal = parseFloat(carrito.reduce((acc, producto)=> acc + producto.subtotal / cuotas, 0)).toFixed(2)
            const carritoInfo2 = document.querySelector("section.financiacion")
            carritoInfo2.innerHTML =  `<p">Pago en ${cuotas} cuotas: $ ${pagoFinal}</p>`
        }
    })
    const carritoInfo2 = document.querySelector("section.financiacion")
    carritoInfo2.innerHTML =  `<p">Pago ${cuotas} cuota/s: $ ${pagoFinal}</p>`
}
formaPago()
/* si no existen productos en el carrito envío mensaje tipo "warning"
    si existen productos en el carrito envío mensaje de agradecimiento y vacío el carrito*/
const finalizoCompra = () =>{
    const btnCompro = document.querySelector("a.btnCompro")
    btnCompro.addEventListener("click", ()=> {
        if (carrito.length === 0){
            mensaje = "El carrito está vacío!"
            iconoMsg = "warning"
            mensajeCarrito(mensaje, iconoMsg)
        }else{
            localStorage.removeItem("carrito")
            const carritoInfo = document.querySelector("section.contenedorCarrito")
            carritoInfo.innerHTML=""
            const carritoInfo2 = document.querySelector("section.financiacion")
            carritoInfo2.innerHTML =  `<p"></p>`
            Swal.fire({
                position: 'center',
                toast: true,
                icon: "success",
                title: "Gracias por confiar en nosotros!",
                showConfirmButton: false,
                timer: 20000
            })
            
        }
        location.href ="../pages/productos.html"
    })        
}
finalizoCompra()