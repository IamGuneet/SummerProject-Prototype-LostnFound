import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css'
import Navbar from './components/navbar/Navbar'
import Homepage from "./components/Homepage/Homepage";
import Items from "./components/Items/Items";
import Login from "./components/login/Login";
import AddObject from "./components/addObject/AddObject"
import Error from "./components/error/Error";
import Success from "./components/success/Success";
import Delete from "./components/delete/Delete";
import Footer from "./components/footer/Footer";

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/items' element={<Items/>}/> 
          <Route path='/login' element={<Login/>}/> 
          <Route path='/addObject' element={<AddObject/>}/> 
          <Route path='/addObject/success' element={<Success/>}/> 
          <Route path='/deleteObject' element={<Delete/>}/> 
          <Route path="*" element={<Error/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
