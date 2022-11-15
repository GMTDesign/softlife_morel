const armarCard = ({idProducto, imagen, titulo, color1, color2, precio}) => {
  return `<article class="col-sm-12 col-xl-2 mb-3 d-flex justify-content-center">
            <div class="card" style="width: 18rem;">
              <img class="card-img" src="../imagenes/productos/${imagen}" alt=${titulo}>
              <div class="card-body">
                <p class="card-title">${titulo}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <p>Colores disponibles</p>
                    <select id="color${idProducto}">
                      <option value="${color1}">${color1}</option>
                      <option value="${color2}">${color2}</option>
                    </select>
                </li>
                <li class="list-group-item">Precio: $${precio}</li>
                <li class="list-group-item">
                  <p>Cantidad</p>
                  <select id="canti${idProducto}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </li>
              </ul>
              <div class="btnAgrega">
                <a class="btn btn-secondary agregar" id=${idProducto}>Agregar al carrito</a>
              </div>
            </div>
          </article>`
}

const mensageError = () => {
  return `<article class="col-sm-12 col-xl-4 mb-3 container-fluid">
            <div class="card card-error" style="width: 18 rem;">
              <img class="errorImg" src="../imagenes/error.png" alt="error">
              <div class="card-body">
                <p class="card-title">Lo sentimos mucho, ha ocurrido un error. Inténtalo nuevamente</p>
              </div>
            </div>
          </article>`
}