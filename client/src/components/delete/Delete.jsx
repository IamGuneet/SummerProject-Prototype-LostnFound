import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Delete() {
  const [srcUrl,setSrcUrl] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        await axios.get('http://localhost:8080/items')
        .then((response)=>{
          setData(response.data.dbData)
          setSrcUrl(response.data.urlList)
          console.log("response:",response.data);
        }).catch((e)=>{
          console.log(e);
        })
        
      }catch(e){
        console.log(e);
      }
      
    }

    fetchData()
  }, [])

  const handleDelete = (itemId) => {
    const id = itemId
    axios.delete('http://localhost:8080/deleteItem', {
      headers: {
        'Content-Type': 'application/json',
        'Id-Data': JSON.stringify({ 'id': id }),
      }
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      if (error.response && error.response.data) {
        // Error response from the server
        console.log(error);
      } else {
        // Other error occurred
        console.log(error.message);
      }
    })
    window.location.href = 'http://127.0.0.1:5173/addObject/success'

  }


  return (
    <div className="container p-3 d-flex justify-content-center flex-column align-items-center">
      <h1 className="display-3 mb-4 ">Delete Items</h1>
      <div className='card-deck flex-wrap justify-content-center align-items-center'>
        {data.reverse().map((item,index) => (
          <>
            <div className='card m-4' >
              <div className='card-header'>
                <h2 key={item._id} className='card-title'>
                  {item.title}
                </h2>
              </div>
              {/* rendering images */}
              <img className='card-Img mx-auto ' src={srcUrl[index]} alt='img' key={index} style={{height:'280px',width:'300px'}}/>
              <div className='card-body'>

                <div className='card-text'>Lost Location: {item.foundAt}</div>
                <p className='card-text'>Description: {item.description}</p>
              </div>
              <div className='card-footer d-flex align-items-center justify-content-center'>
                <p>Contact: {item.contact}</p>  <button className='btn btn-danger m-2' onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </>
        ))}
        <div className='d-flex justify-content-center'>
          <button className='btn btn-secondary w-auto m-1'><a href='/addObject' className='text-reset ' >Add Items</a></button>
        </div>
      </div>
    </div>
  )
}
