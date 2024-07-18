import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Stack, Pagination } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { addItemCart, fetchProducts } from "../../redux/slices/productSlice";
import { Product } from "../../types/types";

export const ProductsCards = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const { products, error, searchTerm, pagination } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const productsVistor = useSelector((state: RootState) => state.productsReducer)

  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const [selectCategory, setSelectCategory] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const fetchData = async () => {
    await dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }))
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, itemsPerPage])

  const searchedProducts = searchTerm
    ? products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
    : products

  const handleAddingCart = (slug: string) => {
    const itemToCart = productsVistor.products.find((product) => product.slug === slug)
    if (itemToCart) {
      dispatch(addItemCart(itemToCart))
    }
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value
    setSelectCategory(selectedCategory === '' ? '' : Number(selectedCategory))
  }

  const filterProductsByCategory = (products: Product[], category: number | '') => {
    if (category === '') {
      return products
    }
    return products.filter((product) => product.categories.includes(String(category)))
  }

  const filteredProducts = filterProductsByCategory(searchedProducts, selectCategory)

  const buttonElements = []
  for (let i = 2; i <= pagination.totalPages - 1; i++) {
    buttonElements.push(
      <Button
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </Button>
    )
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <div className="cards">
        <ul>
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <Card sx={{ maxWidth: 250 }} key={product._id}>
                <CardMedia
                  sx={{ height: 250 }}
                  image={product.image}
                  title={product.title}
                  key={product.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" key={product.title}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary"key={product.description}>
                    {product.description}<br />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" key={product.price}>
                    {product.price} $
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleAddingCart(product.slug)}>Add To Cart</Button>
                  <Link to={`/products/${product.slug}`} >
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
        </ul>
      </div>
      <div className="pagenation">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        {buttonElements}
        <Button onClick={handleNextPage} disabled={currentPage === pagination.totalPages}>
          Next
        </Button>
      </div>
    </>
  )
};