import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Blogs from './components/blogs'
import CreateBlogs from './components/createBlogs'

function App() {
  

  return (
   <Routes>
    <Route path="/" element={<Blogs/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/create-blog" element={<CreateBlogs/>}></Route>
    <Route path="*" element={<h1>Hello what are you doing</h1>}></Route>
   </Routes>
  )
}

export default App
