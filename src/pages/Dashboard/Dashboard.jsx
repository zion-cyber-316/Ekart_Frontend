import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    // <div className='flex'>
    //   <Sidebar/>
    //   <div className='flex-1'>
        
    //     <Outlet/>

    //   </div> 
    // </div>

    <div className="flex min-h-screen w-full overflow-x-hidden">
  <Sidebar />

  <main className="flex-1 min-w-0 w-full">
    <Outlet />
  </main>
</div>
  )
}

export default Dashboard
