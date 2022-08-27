import Navbar from '../Navbar/Navbar';
import Profile from '../Profile.js';
import PanelAccounts from '../PanelAccounts';
import Login from '../Login.js'
import AccountDetail from '../AccountDetail';
import OpportunityList from '../OpportunityList';
import OpportunityDetail from '../OpportunityDetail';
import Contact from '../Contact';
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Auth from '../../services/ServiceAuth'
import { Main, Page } from './styles'
import Sidebar from '../Sidebar'
import Parametrizable from '../Parametrizable';
import PresupuestoIndex from '../Presupuesto-ye';
function Home () {


  const [toggleOpen, setToggleOpen] = useState(false)
  const[loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('token')
     
  }, [])

  
  const logout = () => {
    
    Auth.logout()
    setLoggedIn(false)
    navigate('/login')

  }

  
  function onProfileClick() {
    
    toggleOpen ? navigate('/') : navigate('/profile')
    setToggleOpen(!toggleOpen)
    
  }  


    return (
    <Page>
      <Navbar
        onProfileClick={()=>onProfileClick()}
        loggedIn={loggedIn}
      />

      <Sidebar/>

      <Main>
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
          <Route path="/profile" element={<Profile logout={logout} onProfileClick={onProfileClick}/>}/>
          <Route path="/" element={<PanelAccounts/>}/>
          <Route path="/account-detail/:id" element={<AccountDetail />}/>
          <Route path="/opportunity-detail/:id" element={<OpportunityDetail />}/>
          <Route path="/opportunity" element={<OpportunityList />}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/parametrizable" element={<Parametrizable />}/>
          <Route path="/presupuesto" element={<PresupuestoIndex />}/>

        </Routes>


      </Main>
      


    </Page>

    )
}


export default Home;
