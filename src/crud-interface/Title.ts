
export const generateTitle = ( name : string ) => {
  const title = `
    <h1 class="crud-title">${ name }</h1>
  `
  return title
}

export const renderTitle = ( titleContainerElement : HTMLElement, name : string ) => {
  const title = generateTitle( name )
  titleContainerElement.innerHTML = title
}
