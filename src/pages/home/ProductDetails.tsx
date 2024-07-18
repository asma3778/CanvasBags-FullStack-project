import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { addItemCart, fetchProductsAdmin, findProductBySlug } from "../../redux/slices/productSlice";

export const ProductDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.productsReducer)
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const productsVistor = useSelector((state: RootState) => state.productsReducer)

  useEffect(() => {
    dispatch(findProductBySlug(slug))
    fetchProductsAdmin()
  }, [])

  const handleAddingCart = (slug: string) => {
    const itemToCart = productsVistor.products.find((product) => product.slug === slug)
    if (itemToCart) {
      dispatch(addItemCart(itemToCart))
    }
  }
  // if (isLoading) {
  //   return <h2>Loading...</h2>
  // }
  // if (error) {
  //   return <h3>{error}</h3>
  // }

  // const getCategoryNameById = (categoryId: string) => {
  //   const category = categories.find((category) => category._id === categoryId);
  //   return category ? category.title + ', ' : 'Category not found'
  // }

  return (
    <div className="product-details-card">
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 400 }}
          image={singleProduct.image}
          title={singleProduct.title}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {singleProduct.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleProduct.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleProduct.categories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleProduct.price} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleProduct.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleProduct.shipping}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {
            navigate('/')
          }}>
            Back To Shoppinge</Button>
            <Button size="small" onClick={() => handleAddingCart(singleProduct.slug)}>Add To Cart</Button>
        </CardActions>
      </Card>
    </div>
  )
};