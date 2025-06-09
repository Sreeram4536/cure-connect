import React from 'react'
import Header from '../../components/users/Header'
import SpecialityMenu from '../../components/users/SpecialityMenu'
import TopDoctors from '../../components/users/TopDoctors'
import Banner from '../../components/users/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
      
    </div>
  )
}

export default Home
