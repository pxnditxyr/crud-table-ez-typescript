import { ApiManager } from '../api/connectionConfig'

interface ITable {
  [ key : string ]: string | number | boolean
}

const generateTable = async ( table : ITable[] ) => {
  if ( table.length === 0 ) {
    return `
      <div class="empty-table">
        <p> No hay elementos en la tabla </p>
      </div>
    `
  }
  const keys = Object.keys( table[ 0 ] )
  const values = table.map( ( element ) => {
    const values = keys.map( key => element[ key ] )
    return values
  } )

  const theadPrepared = keys.map( key => `<th>${ key }</th>` ).join( '' )
  const tbodyPrepared = values.map( ( value ) => {
    let tdPrepared = value.map( ( element ) => `<td>${ element }</td>` ).join( '' )
    tdPrepared += `
      <td>
        <button class="edit-button" id="${ value[ 0 ] }"> Editar </button>
        <button class="delete-button" id="${ value[ 0 ] }"> Eliminar </button>
      </td>
    `
    return `<tr>${ tdPrepared }</tr>`
  } ).join( '' )


  const tableELement = `
    <table class="crud-table">
      <thead class="crud-table-head">
        <tr class="crud-table-row">
          ${ theadPrepared }
          <th> Acciones </th>
        </tr>
      </thead>
      <tbody class="crud-table-body">
        ${ tbodyPrepared }
      </tbody>
    </table>
    <div id="edit-form-container"></div>
  `.trim()
  return tableELement
}

const generateEditForm = ( table : ITable[], id : string, structureForm : IStructureForm ) => {

  const idObject = table.find( element => {
    console.log({ element, id } )
    return element.id === id
  } ) as ITable

  const prepareDivFields = structureForm.keys.map( ( key, index ) => {
    if ( structureForm.keys.includes( key ) ) {
      console.log( table )
      return `
        <div class="form-field">
          <label for="${ key }">${ structureForm.names[ index ] }</label>
          <input type="text" id="${ key }" name="${ key }" value="${ idObject[ key ] }" />
        </div>
      `
    }
  } ).join( '' )
    

  const form = `
    <form id="edit-form" class="form">
      ${ prepareDivFields }
      <button> Editar </button>
    </form>
  `
  return form
}

export const renderTable = async ( element : HTMLElement, structureForm : IStructureForm, apiManager : ApiManager, messageContainer : HTMLElement ) => {
  const tableData = await apiManager.get() as ITable[]
  console.log( tableData )
  element.innerHTML = await generateTable( tableData )
  const editFormContainerElement = document.getElementById( 'edit-form-container' ) as HTMLElement
  const editButtonElements = document.getElementsByClassName( 'edit-button' )


  for ( const editButtonElement of editButtonElements ) {
    editButtonElement.addEventListener( 'click', async ( event ) => {
      messageContainer.style.visibility = 'hidden'
      editFormContainerElement.style.visibility = 'visible'
      const id = ( event.target as HTMLElement ).id
      editFormContainerElement.innerHTML = generateEditForm( tableData, id, structureForm )
      const editFormElement = document.getElementById( 'edit-form' ) as HTMLFormElement
      editFormElement.addEventListener( 'submit', async ( event ) => {
        event.preventDefault()
        const formData = new FormData( editFormElement )
        const data = {} as any
        for ( const [ key, value ] of formData.entries() ) {
          data[ key ] = value
        }
        const response = await apiManager.patch( id, data )
        if ( response.message ) {
          messageContainer.innerHTML = JSON.stringify( response.message )
          messageContainer.style.visibility = 'visible'
        }
        renderTable( element, structureForm, apiManager, messageContainer )
        editFormContainerElement.style.visibility = 'hidden'
      } )
    } )
  }

  const deleteButtonElements = document.getElementsByClassName( 'delete-button' )
  for ( const deleteButtonElement of deleteButtonElements ) {
    deleteButtonElement.addEventListener( 'click', async ( event ) => {
      const id = ( event.target as HTMLElement ).id
      await apiManager.delete( id )
      renderTable( element, structureForm, apiManager, messageContainer )
    } )
  }
}
