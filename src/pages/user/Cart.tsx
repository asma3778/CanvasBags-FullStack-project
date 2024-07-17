import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { AppDispatch, RootState } from '../../redux/store'
import { deleteItemCart, deletetAllCart } from '../../redux/slices/productSlice'

export const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { cart } = useSelector((state: RootState) => state.productsReducer)

  const handleDeleteCart = (id: string) => {
    const deletedItem = cart.find((item) => item._id === id)

    if (deletedItem) {
      const updatedCart = cart.filter((product) => product._id != deletedItem._id)
      dispatch(deleteItemCart(updatedCart))
    }
  }

  const handelRemoveAllCart = () => {
    dispatch(deletetAllCart())
  }

  const cartTotal = () => {
    let totalAmount = 0
    cart.length > 0 &&
      cart.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
    return totalAmount
  }

  return (
    <div className='cart'>
      <h1>cart</h1>
      <div className='cart-amount'>
        <label className="product p-3">Total: {cartTotal()}</label>
        <Button onClick={() => { handelRemoveAllCart() }}>Delete All Cart items</Button>
      </div>
      <div>
        {cart.length > 0 && (
          <div className="product-in-cart">

            {cart.map(({ _id, image, title, description, quantity, price }) => (

              <Card sx={{ maxWidth: 250 }} key={_id}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={image}
                  title={title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}<br />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {price} $
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                    handleDeleteCart(_id)
                  }}>Delete</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}