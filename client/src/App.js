import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AddNewVacation from './components/AddNewVacation'
import Login from './components/Login'
import Page404 from './components/Page404'
import Register from './components/Register'
import VacationsList from './components/VacationsList'
import Statistics from './components/Statistics'
export default function App() {
  return (
    <BrowserRouter>
    <div className='app-container'>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/vacations' element={<VacationsList/>}/>
      <Route path='/addnewvacation' element={<AddNewVacation/>}/>
      <Route path='/statistics' element={<Statistics/>}/>
      <Route path='*'  element={<Page404/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}
