let productos = []
const carrito = []
const URL = "https://636ef841bb9cf402c80cd069.mockapi.io/productos"
const filaCard = document.querySelector("div.filaCard")
//cargo las cards en profuctos.html
const cargarCards = async () => {
    let armoCard = ""
    let btnAgregar = true
    try {
        const response = await fetch(URL)
        productos = await response.json()
        productos.forEach(producto => armoCard += armarCard(producto))
    } catch (error) {
        armoCard = mensageError()
        btnAgregar = false
    }finally{
        filaCard.innerHTML = armoCard
        btnAgregar && activoBotonesCard()
    }
}
cargarCards()
//escucho el evento click del botón
const activoBotonesCard = () => {
    const agregar = document.querySelectorAll("a.agregar")   
    agregar.forEach(boton => boton.addEventListener("click", (e) => agregarProducto(e))) 
}
//filtro productos por categoría seleccionada
const filtroProductos =()=>{
    const opcionElegida = document.querySelector(".opciones")
    opcionElegida.addEventListener("change", (e)=>{
        filaCard.innerHTML = ""
        if (opcionElegida.value === "todas"){
            productos.forEach(producto => filaCard.innerHTML += armarCard(producto))
        }else{
            let seleccion = productos.filter(producto => producto.categoria.includes(opcionElegida.value))
            seleccion.forEach(sele => filaCard.innerHTML += armarCard(sele))
        }
        activoBotonesCard()
    })
}
filtroProductos()
//agrego el producto seleccionado al array carrito
const agregarProducto = (e) =>{
    let mensaje=""
    let iconoMsg=""
    let eleccion = productos.find(producto => producto.idProducto === e.target.id)
    if (eleccion !== undefined){ //verifico que el producto existe en el array productos
        let elegido = carrito.find(carr => carr.idProducto === eleccion.idProducto)
        if (elegido === undefined){ //verifico que el producto no existe en el array carrito
            //me conecto con los selects color y cantidad del producto seleccionado para obtener sus valores
            const colorAuxi = document.getElementById("color"+`${eleccion.idProducto}`)
            const cantiAuxi = document.getElementById("canti"+`${eleccion.idProducto}`)
            let subtotal = eleccion.precio * parseInt(cantiAuxi.value)
            //agrego datos al carrito instanciando la clase Carrito
            carrito.push(new Carrito(eleccion.idProducto, eleccion.imagen, eleccion.titulo, colorAuxi.value, eleccion.precio, cantiAuxi.value, subtotal))
            guardarProducto(carrito)
            mensaje = "Se agregó un producto al carrito"
            iconoMsg = "success"
        }else{
            mensaje = "Ya seleccionó ese producto, para ver opciones de compra vaya al Carrito"
            iconoMsg = "info"
        }
    }else{
        mensaje = "Lo sentimos mucho, ya no exite ese producto"
        iconoMsg = "error"
    }
    mensajeCarrito(mensaje, iconoMsg)
}
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
//guardo el producto seleccionado en localstorage
const guardarProducto = () =>{
    carrito.length > 0 && localStorage.setItem("carrito", JSON.stringify(carrito))
}