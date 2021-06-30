import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImg from "./components/ListadoImg";
import Error from "./components/Error";


const App = () => {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [peticionVacia, setPeticionVacia] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(()=>{
    setPaginaActual(1)
  }, [busqueda])

  useEffect(()=>{
    // evitar la peticion de api por default
    const consultarApi = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '22226357-7b45355267a02d3d9f0391331';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      if(resultado.total === 0){
        setPeticionVacia(true);
        return;
      }
      setPeticionVacia(false);
      setImagenes(resultado.hits);

      // calculo tot de pag

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas)

      // mover la ppantalla al inicio

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});

    }
    consultarApi();
  }, [busqueda, paginaActual])

  // ir a la pag anterior

  const paginaAnterior =()=>{
    const nuevaPaginaActual = paginaActual - 1;
    //cuando el user vaya hacia atras no pase del 0
    if(nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  // ir a la pag siguiente

  const paginaSiguiente =()=>{
    const nuevaPaginaSiguiente = paginaActual + 1;
    //cuando el user vaya hacia adelante no pase de la ultima pagina
    if(nuevaPaginaSiguiente > totalPaginas) return;

    setPaginaActual(nuevaPaginaSiguiente);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>
        <Formulario 
        setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
      {peticionVacia && <Error mensaje="No hay datos para mostrar"/>}
        <ListadoImg
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null : (
          <button 
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
          >
            &laquo; Anterior 
          </button>
        )}
        
        {(paginaActual !== totalPaginas) && (
          <button 
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo; 
          </button>
        )}
       
      </div>
    </div>
  );
}

export default App;
