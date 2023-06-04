import './addObject.css'
import { useState } from 'react'
import axios from 'axios';



const AddObject = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [img, setImg] = useState('')
  
  
  const handleTitleChange = (e) => { setTitle(e.target.value) }
  
  const handleLOcationChange = (e) => { setLocation(e.target.value) }
  
  const handleDescriptionChange = (e) => { setDescription(e.target.value) }

  const handleContactChange = (e) => { setContact(e.target.value) }
  
  const handleImgChange = (e) => {
   const imgInfo = e.target.files[0]
   setImg(imgInfo)
  }
  

  
  const handleSubmit = async (e) =>{
     let status = false;
      //prevent page from reloading on submission  
    e.preventDefault()
    

        const formData = new FormData()
        formData.append('title',title)
        formData.append('location',location)
        formData.append('description',description)
        formData.append('contact',contact)
        formData.append('file',img)
          // making post request 
          try{
                 axios.post('http://localhost:8080/login/addItem', formData,{
                headers:{
               "Content-Type":'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res),
          window.location.href = 'http://127.0.0.1:5173/addObject/success'
        }
        )
      }catch(error){
        console.log(error)
      }
      status = true
      if(status === false){
        window.location.href = 'http://127.0.0.1:5173/error'
      } 
  
  }



  return (
    <div className='add-obj container p-3'>
      <h1 className='display-3'>Add Item</h1>

      <form onSubmit={handleSubmit}  encType="multipart/form-data" className='form' >
    
      <div className='row d-flex justify-content-center align-items-center p-3'>

<div className='col-md-8 p-1 '>

        <div className='form-title form-element form-group'>
          <label className='col-form-label w-25' htmlFor='title'>Title</label>
          <input
            onChange={handleTitleChange}
            value={title}
            required
            className='form-control  '
            placeholder='Bottle,Headphones,etc..'
            type='text'
            id='title'
          />
        </div>
</div>

<div className='col-md-8 p-1'>
        <div className='form-found form-element form-group '>
          <label htmlFor='location' className='col-form-label w-25'>Location</label>
          <input
            onChange={handleLOcationChange}
            placeholder='A block, H block,...'
            type='text'
            value={location}
            id='location'
            className='form-control '
          />
</div>
        </div>

        <div className='col-md-8 p-1'>

        <div className='form-description form-element form-group '>
          <label  className='col-form-label w-25' htmlFor='description'>Details</label>
          <textarea
            onChange={handleDescriptionChange}
            required
            placeholder='Description of the item'
            type="text"
            value={description}
            id='description'
            className='form-control '
          />
        </div>
        </div>

        <div className='col-md-8 p-1'>

        <div className='form-description form-element form-group col'>
          <label  className='col-form-label w-25' htmlFor='description'>Insta id:</label>
          <input
            onChange={handleContactChange}
            required
            placeholder='Contact info'
            type="text"
            value={contact}
            id='contact'
            className='form-control '
          />
        </div>
        </div>

          <ImgInput onChange={handleImgChange}/>
          
        <div className='p-2 form-element d-flex justify-content-center align-items-center'>
          <button type='submit' className='btn btn-primary'> Upload </button>
          <button className='btn btn-danger w-auto'><a href='/deleteObject' className='text-reset'>Delete Items</a></button>
        </div>

      </div>
      </form>
    </div>
  )
}

// img element separated and added to avoid DOMEception error
function ImgInput({onChange}){
  return(
<div className='col-md-8 p-1'>

    <div className='form-imginput form-element form-group col '>
    <label htmlFor='img'  className='col-form-label w-25'>Add Image</label>
    <input
      name='uploadedImage'
      required
      onChange={onChange}
      // value={img}
      accept='image/*'
      type='file'
      id='img'
      className='form-control'
    />
  </div>
</div>
  )
}

export default AddObject
