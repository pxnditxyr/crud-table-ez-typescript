import { ApiManager } from './api/connectionConfig'
import { CrudGenerator } from './crud-interface/CrudGenerator'

import './styles/styles.css'

document.querySelector<HTMLDivElement>( '#app' )!.innerHTML = `
  <main>
    <h1 class="title"> Tabla CRUD </h1>
    <div id="crud">
      <div id="title-container"></div>
      <div id="table-container"></div>
      <div id="form-container" class="form-container"></div>
      <div id="error-message-container"></div>
      <button id="add-button" class="add-form-button"> Agregar </button>
    </div>
  </main>
`


const apiAnimals = new ApiManager( import.meta.env.VITE_API_URL, 'cars' )
CrudGenerator( apiAnimals )


