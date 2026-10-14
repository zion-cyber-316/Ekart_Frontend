import React, { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from '../assets/user.png'
import axios from 'axios'
import { setUser } from '@/redux/userSlice'
import MyOrder from './MyOrder'
import { toast } from 'react-toastify'





const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch()

const params = useParams();
const userId = params.id
const nevigate = useNavigate()

const [updateUser, setUpdateUser] = useState({
  firstName: user?.firstName,
  lastName: user?.lastName,
  email: user?.email,
  phoneNo: user?.phoneNo,
  address: user?.address,
  city: user?.city,
  zipCode: user?.zipCode,
  profilePic: user?.profilePic,
  role: user?.role,
});

const [file, setFile] = useState(null);
const serverUrl = `${import.meta.env.VITE_URL}`;

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
  `${serverUrl}/api/user/update/${userId}`,
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
  dispatch(setUser(res.data.user));
  toast.success("update profile")
  nevigate("/")
  
}


} catch (error) {
    console.log(error.response?.data);
 
}
 

  
};



  return (

 <div className="pt-20 bg-gray-100 min-h-screen px-4 sm:px-6 md:px-8 pb-10">

  <Tabs
    defaultValue="Profile"
    className="max-w-7xl mx-auto w-full"
  >

    {/* Tabs */}
    <div className="flex justify-center mb-6">
      <TabsList className="w-full sm:w-auto justify-center">

        <TabsTrigger
          value="Profile"
          className="flex-1 sm:flex-none"
        >
          Profile
        </TabsTrigger>

        <TabsTrigger
          value="Orders"
          className="flex-1 sm:flex-none"
        >
          Orders
        </TabsTrigger>

      </TabsList>
    </div>


    {/* ================= PROFILE ================= */}

    <TabsContent value="Profile">

      <div className="flex flex-col justify-center items-center">

        <h1 className="font-bold mb-5 text-xl sm:text-2xl text-gray-800">
          Update Profile
        </h1>


        {/* Profile + Form */}

        <div
          className="
            w-full
            max-w-4xl
            flex
            flex-col
            lg:flex-row
            gap-6
            lg:gap-10
            justify-center
            items-center
            lg:items-start
          "
        >

          {/* ================= PROFILE PICTURE ================= */}

          <div
            className="
              flex
              flex-col
              items-center
              w-full
              lg:w-auto
              shrink-0
            "
          >

            <img
              src={
                updateUser?.profilePic
                  ? updateUser.profilePic.startsWith("blob:")
                    ? updateUser.profilePic
                    : `${serverUrl}${updateUser.profilePic}`
                  : userLogo
              }

              onError={(e) => {
                e.target.src = userLogo;
              }}

              alt="profile"

              className="
                w-28
                h-28
                sm:w-32
                sm:h-32
                rounded-full
                object-cover
                border-4
                border-pink-800
              "
            />


            <label
              className="
                mt-4
                cursor-pointer
                bg-pink-600
                hover:bg-pink-700
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
                sm:text-base
                transition
              "
            >
              Change Picture

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

            </label>

          </div>


          {/* ================= PROFILE FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="
              w-full
              max-w-xl
              space-y-1
              shadow-lg
              p-4
              sm:p-5
              rounded-lg
              bg-white
              mb-5
            "
          >

            {/* First Name + Last Name */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm font-medium">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="Gaurav"
                  name="firstName"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={updateUser.firstName}
                  onChange={handleChange}
                />

              </div>


              <div>

                <label className="block text-sm font-medium">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Mehra"
                  name="lastName"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={updateUser.lastName}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                disabled
                className="
                  w-full
                  border
                  rounded-lg
                  px-3
                  py-2
                  mt-1
                  bg-gray-100
                  cursor-not-allowed
                "
                value={updateUser.email}
                onChange={handleChange}
              />

            </div>


            {/* Phone */}

            <div>

              <label className="block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter your Contact Number"
                name="phoneNo"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={updateUser.phoneNo}
                onChange={handleChange}
              />

            </div>


            {/* Address */}

            <div>

              <label className="block text-sm font-medium">
                Address
              </label>

              <input
                type="text"
                placeholder="Enter your Address"
                name="address"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={updateUser.address}
                onChange={handleChange}
              />

            </div>


            {/* City + Zip Code */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm font-medium">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Enter your City"
                  name="city"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={updateUser.city}
                  onChange={handleChange}
                />

              </div>


              <div>

                <label className="block text-sm font-medium">
                  Zip Code
                </label>

                <input
                  type="text"
                  placeholder="Enter Zip-Code"
                  name="zipCode"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={updateUser.zipCode}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Update Button */}

            <Button
              type="submit"
              className="
                w-full
                mt-4
                bg-pink-600
                hover:bg-pink-700
                text-white
                font-semibold
                py-2
                rounded-lg
              "
            >
              Update Profile
            </Button>

          </form>

        </div>

      </div>

    </TabsContent>


    {/* ================= ORDERS ================= */}

    <TabsContent value="Orders">
      <MyOrder />
    </TabsContent>

  </Tabs>

</div>
   
  )
}

export default Profile







