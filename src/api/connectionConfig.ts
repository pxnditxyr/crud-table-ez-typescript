
export class ApiManager {
  constructor (
    private readonly apiUrl : string,
    private readonly path : string
  ) {}

  public async get () {
    const response = await fetch( `${ this.apiUrl }/${ this.path }` )
    const data = await response.json()
    return data
  }

  public async post ( body : any ) {
    const response = await fetch( `${ this.apiUrl }/${ this.path }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    } )
    return await response.json()
  }

  public async patch ( id : string, body : any ) {
    const response = await fetch( `${ this.apiUrl }/${ this.path }/${ id }`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    } )
    return await response.json()
  }

  public async delete ( id : string ) {
    await fetch( `${ this.apiUrl }/${ this.path }/${ id }`, {
      method: 'DELETE'
    } )
  }
}

