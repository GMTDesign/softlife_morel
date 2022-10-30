const carrito = []
const IVA = 1.21
const btnCompra = document.querySelector("a.btnCompro")
const revisoCarrito = () =>{
    if (localStorage.getItem("carrito")){
        let carritoExistente = JSON.parse(localStorage.getItem("carrito"))
        carritoExistente.forEach(producto => carrito.push(producto))
    }
}
const cargarProductos = () =>{
    let muestroInfo = ""
    const carritoInfo = document.querySelector("section.contenedorProductos")
    carritoInfo.innerHTML=""
    carrito.forEach(producto => {
        muestroInfo += `<div class="row">
                            <article class="col-9 mb-3 d-flex justify-content-around filaProducto">
                                <div>
                                    <p id="${producto.idProducto}"></p>
                                </div> 
                                <div class="productoImg">
                                    <img class="prodImgTam" src="../imagenes/productos/${producto.imagen}" alt=${producto.titulo}">
                                </div>
                                <div class="descriProducto">
                                    <p>${producto.titulo}</p>
                                </div>
                                <div class="color">
                                    <select name="Color" id="colorProd">
                                        <option>${producto.color1}</option>
                                        <option>${producto.color2}</option>
                                    </select>
                                </div>
                                <div class="precio">
                                    <p>${producto.precio}</p>
                                </div>
                            </article>
                        </div>`
        carritoInfo.innerHTML = muestroInfo
        let totalCompra = carrito.reduce((acc, producto)=> acc + producto.precio * IVA, 0)
        carritoInfo.innerHTML += `<div class="totalCompra">
                                    <p>Total de la compra IVA incluído: $ ${totalCompra}</p>
                                </div>`
    })
}
btnCompra.addEventListener("click", ()=>{
    if (carrito.length === 0){
        alert("No seleccionó ningún producto! ⛔")
    }else{
        alert("Gracias por confiar en nosotros! 🧏‍♀️")
        localStorage.removeItem("carrito")
        location.href = "../index.html"
    }
})

revisoCarrito()
cargarProductos()
