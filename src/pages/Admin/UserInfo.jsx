
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userLogo from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios'
import { setUser } from '@/redux/userSlice'
import { toast } from 'react-toastify'




const UserInfo = () => {
  const [updateUser, setUpdateUser] = useState(null);
  const serverUrl = `${import.meta.env.VITE_URL}`;

  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  // const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const params = useParams()
  const userId = params.id


  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile), // preview only
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      // use FormData for text + file
      const formData = new FormData();

      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      // axios/fetch request here
      if (file) {
        formData.append("file", file); // image file for backend multer
      }

      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data"
          },
        }
      );
      console.log(res)
      if (res.data.success) {
        // dispatch(setUser(res.data.user));
        toast.success("updated profile")
        navigate("/dashboard/users")
      }


    } catch (error) {
      console.log(error.response?.data);

    }



  };


  const getUserDetails = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/user/findone/${userId}`)
      console.log(res.data.data)
      if (res.data.success) {
        setUpdateUser(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])


  return (
    <div className="pt-5 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="flex justify-between gap-10">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft /> Back
            </Button>
            <h1 className="font-bold md:text-2xl text-gray-800">
              Update Profile
            </h1>
          </div>

          <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={
                  updateUser?.profilePic
                    ? updateUser.profilePic.startsWith("blob:")
                      ? updateUser.profilePic
                      : `${serverUrl}${updateUser?.profilePic}`
                    : userLogo
                }
                onError={(e) => {
                  e.target.src = userLogo;
                }}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
              />


              <label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label >
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-1 shadow-lg p-5 rounded-lg bg-white mb-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label >
                  <input
                    type="text"
                    placeholder='Gaurav'
                    name="firstName"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={updateUser?.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Last Name
                  </label >
                  <input
                    type="text"
                    placeholder='Mehra'
                    name="lastName"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={updateUser?.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Email
                </label >
                <input
                  type="email"
                  name="email"
                  disabled
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                  value={updateUser?.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label >
                <input
                  type="text"
                  placeholder='Enter your Contact Number'
                  name="phoneNo"
                  className="w-full border rounded-lg px-3 py-2 mt-1 "
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Address
                </label >
                <input
                  type="text"
                  placeholder='Enter your Address'
                  name="address"
                  className="w-full border rounded-lg px-3 py-2 mt-1 "
                  value={updateUser?.address}
                  onChange={handleChange}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className="block text-sm font-medium">
                    City
                  </label >
                  <input
                    type="text"
                    placeholder='Enter your City'
                    name="city"
                    className="w-full border rounded-lg px-3 py-2 mt-1 "
                    value={updateUser?.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Zip Code
                  </label >
                  <input
                    type="text"
                    placeholder='Enter Zip-Code'
                    name="zipCode"
                    className="w-full border rounded-lg px-3 py-2 mt-1 "
                    value={updateUser?.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Label className="block text-sm font-medium">Role :</Label>

                <RadioGroup
                  value={updateUser?.role}
                  onValueChange={(value) =>
                    setUpdateUser({ ...updateUser, role: value })
                  }
                  className="flex items-center"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit"
                className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg">
                Update Profile
              </Button>
            </form>
          </div>



        </div>
      </div>
    </div>
  )
}

export default UserInfo
