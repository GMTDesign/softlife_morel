const armarCard = (producto) => {
  return `<article class="col-sm-12 col-xl-2 mb-3 d-flex justify-content-center">
            <div class="card" style="width: 18rem;">
                <img class="card-img" src="../imagenes/productos/${producto.imagen}" alt=${producto.titulo}>
              <div class="card-body">
                <h5 class="card-title">${producto.titulo} ${producto.color1}</h5>
              </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Colores: ${producto.color1}-${producto.color2}</li>
                  <li class="list-group-item">Precio unitario: $${producto.precio}</li>  
              </ul>
              <div class="btnAgrega" >
                <a class="btn btn-secondary agregar" id=${producto.idProducto} >Agregar al carrito</a>
              </div>  
            </div>
          </article>`
}