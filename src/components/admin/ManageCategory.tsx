import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Paper, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import { Table } from "react-bootstrap";

import { AppDispatch, RootState } from "../../redux/store";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "../../redux/slices/categorySlice";
import { AdminSidebar } from "./AdminSidebar";

export const ManageCategory = () => {
  const { categories, isLoading } = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [isEdit, setisEdit] = useState(false)
  const [categorySlug, setCategorySlug] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleDelete = async (slug: string) => {
    try {
      const response = await deleteCategory(slug)
      dispatch(fetchCategories())
    } catch (error) {
      console.log(error)
    }
  }


  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!isEdit) {
      dispatch(createCategory(categoryName))

    } else {
      dispatch(updateCategory({ slug: categorySlug, title: categoryName }))

    }
    dispatch(fetchCategories())

    setCategoryName('')
  }
  const handelEdit = (slug: string, title: string | undefined) => {
    setCategorySlug(slug)
    setisEdit(!isEdit)
    setCategoryName(title)
  }

  return (
    <>
      <div>
        <AdminSidebar />
        <div className="main-content" >
          {isLoading && <h3> Loading Categories...</h3>}
        </div>
        {/* <div style={{overflowY: 'scroll'}}> */}
        <div className='general-content-category'>
          <Button type="submit" onClick={handleFormOpen}>{isEdit ? 'edit' : 'add'}</Button>
          <Box display="flex" justifyContent="center" alignItems="center" >
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
                      id="categoryName"
                      label="Name of Category"
                      name="categoryName"
                      autoComplete="categoryName"
                      value={categoryName}
                      onChange={handelChange}
                    />
                    <Button type='submit'>{isEdit ? 'edit' : 'add'}</Button>
                  </form>

                </Paper>
              }
            </Container>
          </Box>
        </div>
        <div className='general-content-category'>

          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table className="table-category">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Category id</TableCell>
                  <TableCell align="left">Category Name</TableCell>
                  <TableCell align="left">Delete</TableCell>
                  <TableCell align="left">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow
                    key={category._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {category._id}
                    </TableCell>
                    <TableCell align="left">{category.title}</TableCell>
                    <TableCell align="left">
                      <DeleteRoundedIcon onClick={() => handleDelete(category.slug)} />
                    </TableCell>
                    <TableCell align="left">
                      <Button onClick={() => handelEdit(category.slug, category.title)}> edit </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}