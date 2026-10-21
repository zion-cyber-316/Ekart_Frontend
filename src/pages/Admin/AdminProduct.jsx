import { Input } from '@/components/ui/input'
import { Edit, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"

import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ui/ImageUpload'
import { toast } from 'react-toastify'
import { setProducts } from '@/redux/productSlice'
import axios from 'axios'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"





const AdminProduct = () => {
  const { products } = useSelector((store) => store.product)
  const serverUrl = `${import.meta.env.VITE_URL}`;
  const [editProduct, setEditProduct] = useState(null)
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const [searchTerm ,setSearchTerm] = useState("")
  const [sortOrder , setSortOrder] = useState("")
 
const [editDialogOpen, setEditDialogOpen] = useState(false)




  let filteredProducts = products.filter((product) =>
  product?.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product?.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product?.category.toLowerCase().includes(searchTerm.toLowerCase())
);

if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
        (a, b) => a.productPrice - b.productPrice
    );
}

if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
        (a, b) => b.productPrice - a.productPrice
    );
}

  const handleChange = (e) => {
    const { name, value } = e.target

    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("productName", editProduct.productName)
    formData.append("productDesc", editProduct.productDesc)
    formData.append("productPrice", editProduct.productPrice)
    formData.append("category", editProduct.category)
    formData.append("brand", editProduct.brand)
    

    // Add existing images public_ids
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id)

    formData.append("existingImages", JSON.stringify(existingImages))

    // Add new files
    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file)
      })

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/product/update/${editProduct._id}`,
        formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      )

      console.log(res)

      if (res.data.success) {
        toast.success("Product updated successfully");

        const updatedProducts = products.map((p) =>
          p?._id === editProduct._id ? res.data.data: p
        );

        dispatch(setProducts(updatedProducts));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId
      );

      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };



  
  return (
    <div className='pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex justify-between'>
        <div className='relative bg-white rounded-lg'>
          <Input
          value = {searchTerm}
          onChange = {(e)=>setSearchTerm(e.target.value)}
            type='text'
            placeholder='Search Product...'
            className='w-[400px] items-center'
          />
          <Search className='absolute right-3 top-1 text-gray-500' />
        </div>
        <Select onValueChange={(value)=>setSortOrder(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="lowToHigh">Price : Low To High</SelectItem>
            <SelectItem value="highToLow">Price : High To Low</SelectItem>

          </SelectContent>
        </Select>
      </div>

      {
        filteredProducts.map((product, index) => {
          return (
            <Card key={index} className="px-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <img src={`${serverUrl}${product.productImg[0].url}`} alt="" className="w-25 h-25" />
                  <h1 className="font-bold w-96 text-gray-700">{product.productName}</h1>
                </div>

                <h1 className="font-semibold text-gray-800">{product.productPrice}</h1>

                <div className="flex gap-3">
                  {/* <Dialog>

                    <DialogTrigger render={<Edit onClick={() => setEditProduct(product)} className="text-green-500 cursor-pointer" />} />
                    <DialogContent className="sm:max-w-[625px] max-h-[640px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Make changes to your product here. Click save when you&apos;re
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-2">
                        <div className="grid gap-2">
                          <Label>Product Name</Label>
                          <Input value={editProduct?.productName} onChange={handleChange} type="text" name="productName" placeholder="EX-Iphone" required />
                        </div>

                        <div className="grid gap-2">
                          <Label>Price</Label>
                          <Input value={editProduct?.productPrice} onChange={handleChange} type="number" name="productPrice" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Brand</Label>
                            <Input value={editProduct?.brand} onChange={handleChange} type="text" name="brand" placeholder="Ex-apple" required />
                          </div>

                          <div className="grid gap-2">
                            <Label>Category</Label>
                            <Input value={editProduct?.category} onChange={handleChange} type="text" name="category" placeholder="Ex-mobile" required />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label>Description</Label>
                          </div>
                          <Textarea value={editProduct?.productDesc} onChange={handleChange} name="productDesc" placeholder="Enter Breife description of product" />
                        </div>
                        <ImageUpload productData={editProduct} setProductData={setEditProduct} />
                      </div>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button onClick={handleSave} type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>

                  </Dialog> */}
                  <Dialog
  open={editDialogOpen}
  onOpenChange={setEditDialogOpen}
>
  <DialogTrigger
    render={
      <Edit
        onClick={() => {
          setEditProduct(product)
          setEditDialogOpen(true)
        }}
        className="text-green-500 cursor-pointer"
      />
    }
  />

  <DialogContent className="w-[95%] sm:max-w-[625px] max-h-[90vh] overflow-y-auto">

    <DialogHeader>
      <DialogTitle>
        Edit Product
      </DialogTitle>

      <DialogDescription>
        Make changes to your product here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>


    <div className="flex flex-col gap-2">

      <div className="grid gap-2">
        <Label>Product Name</Label>

        <Input
          value={editProduct?.productName || ""}
          onChange={handleChange}
          type="text"
          name="productName"
          placeholder="EX-Iphone"
          required
        />
      </div>


      <div className="grid gap-2">
        <Label>Price</Label>

        <Input
          value={editProduct?.productPrice || ""}
          onChange={handleChange}
          type="number"
          name="productPrice"
          required
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="grid gap-2">
          <Label>Brand</Label>

          <Input
            value={editProduct?.brand || ""}
            onChange={handleChange}
            type="text"
            name="brand"
            placeholder="Ex-apple"
            required
          />
        </div>


        <div className="grid gap-2">
          <Label>Category</Label>

          <Input
            value={editProduct?.category || ""}
            onChange={handleChange}
            type="text"
            name="category"
            placeholder="Ex-mobile"
            required
          />
        </div>

      </div>


      <div className="grid gap-2">

        <Label>Description</Label>

        <Textarea
          value={editProduct?.productDesc || ""}
          onChange={handleChange}
          name="productDesc"
          placeholder="Enter Brief description of product"
        />

      </div>


      <ImageUpload
        productData={editProduct}
        setProductData={setEditProduct}
      />

    </div>


    <DialogFooter>

      <DialogClose asChild>
        <Button variant="outline">
          Cancel
        </Button>
      </DialogClose>

      <Button
        onClick={handleSave}
        type="button"
      >
        Save changes
      </Button>

    </DialogFooter>

  </DialogContent>
</Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger render={<Trash2 className="text-red-500 cursor-pointer" />}>
                      Show Dialog
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>deleteProductHandler(product._id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          );
        })
      }
    </div>
  )
}

export default AdminProduct
