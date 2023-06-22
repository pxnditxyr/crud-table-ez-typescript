import { ApiManager } from '../api/connectionConfig'
import { renderTable } from './Table'

export const generateAddForm = ( { keys, names } : IStructureForm ) => {
  const form = `
    <form id="add-form" class="form">
      ${ keys.map( ( key, index ) => {
          return `
            <div class="form-field" #form-field>
              <label for="${ key }">${ names[ index ] }</label>
              <input type="text" id="${ key }" name="${ key }" />
            </div>
          `
        } ).join( '' )
      }
      <button class="add-new-button" id="add-new-button"> Agregar </button>
    </form>
  `
  return form
}


export const renderAddForm = async ( addButtonElement : HTMLElement, formContainerElement : HTMLElement, structureForm : IStructureForm, apiManager : ApiManager, messageContainerElement : HTMLElement ) => {
  const generatedForm = generateAddForm( structureForm )
  formContainerElement.innerHTML = generatedForm
  addButtonElement.addEventListener( 'click', () => {
    messageContainerElement.style.visibility = 'hidden'
    formContainerElement.style.visibility = 'visible'
    const addFormElement = document.getElementById( 'add-form' ) as HTMLFormElement
    addFormElement.addEventListener( 'submit', async ( event ) => {
      event.preventDefault()
      const formData = new FormData( addFormElement )
      const data = {} as any
      for ( const [ key, value ] of formData.entries() ) {
        data[ key ] = value
      }
      console.log( data )
      const response = await apiManager.post( data )
      if ( response.message ) {
        messageContainerElement.innerHTML = response.message
        messageContainerElement.style.visibility = 'visible'
      }
      formContainerElement.style.visibility = 'hidden'
      const tableContainer = document.getElementById( 'table-container' ) as HTMLElement
      renderTable( tableContainer, structureForm, apiManager, messageContainerElement )
    } )
  } )
}
