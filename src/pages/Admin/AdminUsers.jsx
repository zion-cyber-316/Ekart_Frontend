
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userLogo from '../../assets/user.png'
import { Edit, Eye, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {
  const serverUrl =`${import.meta.env.VITE_URL}`;
  const [users, setUsers] = useState([])
  const [searchTerm , setSearchTerm] = useState("")
  const nevigate = useNavigate()

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken")
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/user/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(res.data.data)
      if (res.data.success) {
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filteredUsers = users.filter(user =>
  (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
)


  useEffect(() => {
    getAllUsers()

  }, [])




  return (
    <div className='pl-[350px] py-20 pr-20 mx-auto px-4'>
      <h1 className='font-bold text-2xl'>User Management</h1>
      <p>View and manage registered users</p>

      <div className='flex relative w-[300px] mt-6'>
        <Search className='absolute left-2 top-1 text-gray-600 w-5' />
        <Input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='pl-10' placeholder='Search Users...' />
      </div>

      <div className='grid grid-cols-3 gap-7 mt-7'>
        {
          filteredUsers.map((user, index) => {
            return (
              <div key={index} className='bg-pink-100 p-5 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <img
                    src={`${serverUrl}${user?.profilePic}` || userLogo}
                    alt=''
                    className='rounded-full w-16 aspect-square object-cover border border-pink-600'/>
                    <div>
                      <h1 className='font-semibold'> {user?.firstName} {user?.lastName}</h1>
                      <h3>{user?.email}</h3>

                    </div>
                </div>
<div className='flex gap-3 mt-3'>
  <Button onClick={()=>nevigate(`/dashboard/users/${user._id}`)} variant='outline'><Edit/> Edit</Button>
  <Button onClick={()=>nevigate(`/dashboard/users/orders/${user._id}`)}><Eye/>Show Order</Button>

</div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AdminUsers