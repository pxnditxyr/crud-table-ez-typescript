import { ApiManager } from '../api/connectionConfig'
import { renderAddForm } from './AddForm'
import { renderTable } from './Table'
import { renderTitle } from './Title'


export const CrudGenerator = ( apiAnimals : ApiManager ) => {
  const titleContainerElement = document.getElementById( 'title-container' ) as HTMLDivElement
  const tableContainerElement = document.getElementById( 'table-container' ) as HTMLDivElement
  const formContainerElement = document.getElementById( 'form-container' ) as HTMLDivElement
  const messageContainerElement = document.getElementById( 'error-message-container' ) as HTMLDivElement

  const addButtonElement = document.getElementById( 'add-button' ) as HTMLButtonElement


  const structureAnimals = {
    keys: [ 'name', 'description' ],
    names: [ 'Nombre', 'Edad', 'Raza' ]
  }

  renderTitle( titleContainerElement, 'Animales' )
  renderTable( tableContainerElement, structureAnimals, apiAnimals, messageContainerElement )
  renderAddForm( addButtonElement, formContainerElement, structureAnimals, apiAnimals, messageContainerElement )
}
