//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito =[]

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso precionando "Agregar al carrito"
    listaCurso.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // resetamos el arreglo

        limpiarHTML(); // eliminamos todo el html
    })
}


//Funciones
function agregarCurso (e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
    }
}

//eliminar curso del carrito
function eliminarCurso (e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo de articuloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //itera sobre el carrito y muestra en el HTML
    }
}

//lee el contendo del html al que le diste click y extrae la informacioon del curso
 function leerDatosCurso (curso) {
    //console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++; //retorna el objeto actualizado
                return curso;
            }else{
                return curso; //retorna los objetos que no son actualizados 
            }
        });
        articulosCarrito = [...cursos]
    }else{
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito);

    carritoHTML();
 }

 //muestra el carrito de compras en el html

function carritoHTML(){
    //limpiar el html
    limpiarHTML();
    
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td> ${titulo} </td>    
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </>    
        `;
        
        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//elimina los curso del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}