import { useDispatch } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { filterProducts, sortProducts } from '../redux/slices/productSlice'

export const FilterProducts = () => {

  const dispatch: AppDispatch = useDispatch()
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterProducts(event.target.value))
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue = e.target.value
    dispatch(sortProducts(sortValue))
  }

  return (
    <div className='sort-section'>
      <label className='label-search' htmlFor="sort">
        Sort by:  </label>
      <select name="sort" className="sort-btn" id="sort" onChange={handleOptionChange}>
        <option value="price" defaultValue="price">
          price
        </option>
        <option value="name">name</option>
      </select>
    </div>
  )
}
