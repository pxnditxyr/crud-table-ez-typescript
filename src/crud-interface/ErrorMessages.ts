
const generateErrorMessage = ( error: string ) => {
  const errorMessage = `
    <h1 class="crud-error-message">${ error }</h1>
  `
  return errorMessage
}

export const renderErrorMessages = async ( messageContainerElement: HTMLElement, errors : string[] | string ) => {
  const errorMessages = Array.isArray( errors ) ? errors.map( error => generateErrorMessage( error ) ).join( '' ) : generateErrorMessage( errors )
  messageContainerElement.innerHTML = errorMessages
}
