const carrito = []
const filaCard = document.querySelector("div.filaCard")
//escucho el evento click del botón
const activoBotonesAgregar = () => {
    const agregar = document.querySelectorAll("a.agregar")   
    agregar.forEach(boton => boton.addEventListener("click", (e)=> agregarProducto(e))) 
}
//cargo las cards en profuctos.html
const cargarCards = () => {
    filaCard.innerHTML = ""
    if (productos.length > 0){
        productos.forEach(producto => filaCard.innerHTML += armarCard(producto))
    }
    activoBotonesAgregar()
}
cargarCards()
//agrego el producto seleccionado al array carrito
const agregarProducto = (e) =>{
    let eleccion = productos.find(producto => producto.idProducto === e.target.id)
    if (eleccion !== undefined){
        carrito.push(eleccion)
        guardarProducto(carrito)
        alert("Se agregó un producto al carrito 👌")
    }
}
//guardo el producto seleccionado en localstorage
const guardarProducto = () =>{
    if (carrito.length > 0){
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}
//me fijo si el carrito tiene datos
const revisoCarrito = () => {
    if (localStorage.getItem("carrito")){
        let carritoExistente = JSON.parse(localStorage.getItem("carrito"))
        carritoExistente.forEach(producto => carrito.push(producto))
    }
}
revisoCarrito()