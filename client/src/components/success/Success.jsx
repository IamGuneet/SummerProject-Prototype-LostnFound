
export default function Success() {
  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center p-3">
     <h1 className="display-3">Successful Request</h1>
     <div className="container d-flex justify-content-center ">
    <a href="/addObject" className="btn btn-secondary m-1">Add Items</a>
    <a href="/deleteObject" className="btn btn-danger m-1">Delete Items</a>
     </div>
    </div>
    </div>
  )
}
