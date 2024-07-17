import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Paper, TextField, Typography, TableBody, TableCell, TableHead, TableRow, Table } from '@mui/material'
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/types'
import { AdminSidebar } from './AdminSidebar'
import {
  createProduct,
  deleteProduct,
  fetchProductsAdmin,
  updateProduct,
} from '../../redux/slices/productSlice'
import { fetchCategories } from '../../redux/slices/categorySlice';

const initialValue: Product = {
  _id: '',
  title: '',
  slug: '',
  image: '',
  description: '',
  categories: [],
  sold: 0,
  quantity: 0,
  shipping: 0,
  price: 0
}

export const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsAdmin = useSelector((state: RootState) => state.productsReducer)
  const categories = useSelector((state: RootState) => state.categoryReducer)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [productForm, setproductForm] = useState(initialValue)

  useEffect(() => {
    dispatch(fetchProductsAdmin())
  }, [])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleDelete = async (slug: string) => {
    try {
      await deleteProduct(slug)
      dispatch(fetchProductsAdmin())
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditing = (slug: string, title: string) => {
    setProductId(slug)
    setIsEditing(!isEditing)
    setProductName(title)
    const existingProduct = productsAdmin.products.find((product) => product.slug === slug)
    if (existingProduct) {
      setproductForm({
        ...existingProduct,
        title: existingProduct.title,
        price: existingProduct.price
      })
    }
  }

  const onChaneHandleItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.type === 'file') {
      const fileInput = (e.target as HTMLInputElement) || ''
      setproductForm((prevProducts) => {
        return { ...prevProducts, [e.target.name]: fileInput.files?.[0] }
      })
    } else {
      const { name, value } = e.target

      const isList = name === 'categories' || name === 'variants' || name === 'sizes'
      if (isList) {
        setproductForm({
          ...productForm,
          [name]: value.split(',')
        })
        return
      }

      setproductForm({
        ...productForm,
        [name]: value
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', productForm.title)
    formData.append('description', productForm.description)
    formData.append('categories', String(productForm.categories))
    formData.append('image', productForm.image)
    formData.append('price', String(productForm.price))
    formData.append('quantity', String(productForm.quantity))
    formData.append('shipping', String(productForm.shipping))
    formData.append('sold', String(productForm.sold))

    if (productForm.slug) {
      dispatch(updateProduct(productForm))

    } else {
      // setproductForm({
      //   ...productForm,
      //   slug: productsAdmin.products[productsAdmin.products.length - 1].slug + 1
      // })

      dispatch(createProduct(formData))
      dispatch(fetchProductsAdmin())
    }

  }

  return (
    <>
      <div>
        <AdminSidebar />
        <div className="main-content">
          {productsAdmin.isLoading && <h3> Loading Products...</h3>}
        </div>
        <div className='general-content-product' >
          <Button type="submit" onClick={handleFormOpen}>{productForm._id ? 'edit' : 'add'}</Button>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Container component="main" maxWidth="xs">
              {isFormOpen &&
                <Paper
                  elevation={3}
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h1" variant="h5">
                  </Typography>
                  <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      label="Name of Prouct"
                      name="title"
                      autoComplete="title"
                      value={productForm.title}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="description"
                      label="Description"
                      type="description"
                      id="description"
                      autoComplete="description"
                      value={productForm.description}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="categories"
                      label="Category"
                      type="categories"
                      id="categories"
                      autoComplete="categories"
                      value={productForm.categories}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="image"
                      type="file"
                      // accept= "image/*"
                      id="image"
                      autoComplete="image"
                      // value={productForm.image}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="price"
                      label="price"
                      type="price"
                      id="price"
                      autoComplete="price"
                      value={productForm.price}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="quantity"
                      label="quantity"
                      type="quantity"
                      id="quantity"
                      autoComplete="quantity"
                      value={productForm.quantity}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="shipping"
                      label="shipping"
                      type="shipping"
                      id="shipping"
                      autoComplete="shipping"
                      value={productForm.shipping}
                      onChange={onChaneHandleItem}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="sold"
                      label="sold"
                      type="sold"
                      id="sold"
                      autoComplete="sold"
                      value={productForm.sold}
                      onChange={onChaneHandleItem}
                    />

                    <Button type='submit'>{productForm._id ? 'edit' : 'add'}</Button>
                  </form>
                </Paper>
              }
            </Container>
          </Box>
        </div>
        <div className='general-content-product'>

          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }} >
            <Table className="table-product" >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Product id</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  {/* <TableCell align="left">Product Image</TableCell>
            <TableCell align="left">Category</TableCell> */}
                  <TableCell align="left">Delete</TableCell>
                  <TableCell align="left">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {productsAdmin.products.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {product._id}
                    </TableCell>
                    <TableCell align="left">{product.title}</TableCell>
                    <TableCell align="left">
                      <DeleteRoundedIcon onClick={() => handleDelete(product.slug)} />
                    </TableCell>
                    <TableCell align="left">
                      <ModeEditRoundedIcon onClick={() => handleEditing(product.slug, product.title)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </div>
      </div>
    </>
  )
}