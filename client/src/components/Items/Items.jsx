import  { useEffect, useState } from 'react';
import axios from 'axios';
import './items.css'

const Items = () => {
  const [srcUrl,setSrcUrl] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {  
    const fetchData = async ()=>{
      try{
       await axios.get('http://localhost:8080/items').then((response)=>{
         setData(response.data.dbData);
         setSrcUrl(response.data.urlList)
         console.log(response);
         console.log(srcUrl);
        })
      }catch(e){
        console.log(e);
      }
    }
    
    fetchData()
  }, []);

    return (
    <div className='item-container p-3'>
    {/* <div className='d-flex justify-content-center align-items-center flex-wrap'> */}
    <h1 className="display-3 mb-4">Lost Items</h1>
    <div className='card-deck flex-wrap justify-content-center align-items-center'>
      {  data.reverse().map((item,index) =>( 
      <>
      <div className='card m-4' >
      <div className='card-header'>
      <h2 key={item._id} className='card-title'>
        {item.title}
      </h2>
      </div>    
              <img className='card-Img mx-auto ' src={srcUrl[index]} alt='img' key={index} style={{height:'280px',width:'280px'}}/>
            <div className='card-body'>

          <div className='card-text'>Lost Location: {item.foundAt}</div>  
          <p className='card-text'>Description: {item.description}</p>  
            </div>
            <div className='card-footer'>
          <p>Contact: {item.contact}</p>  
            </div>
      </div>
      </>
     ) ) }
    </div>
    </div>
  )
}

export default Items
