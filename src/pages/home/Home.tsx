import { useDispatch, useSelector } from "react-redux";

import { FilterProducts } from "../../components/FilterProducts";
import { searchProduct } from "../../redux/slices/productSlice";
import { ProductsCards } from "./ProductsCards";
import { AppDispatch, RootState } from "../../redux/store";
import { Footer } from "./Footer";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.productsReducer
  const hendleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(e.target.value))
  }

  return (
    <>
      <div className="hero">
        <div className="hero-section">
          <h1>CanvasBags</h1>
          <h2>Our Products</h2>
          <p>you can find what you are looking for</p>

          {products.isLoading && <h3> Loading products...</h3>}
          <div className="search-input-container">
            <input
              className="search-input"
              type="text"
              name="search"
              placeholder="search"
              value={products.searchTerm}
              onChange={hendleSearch}
            />
            <FilterProducts />
          </div>
        </div>
      </div>
      <ProductsCards />
      <Footer />
    </>
  )
};