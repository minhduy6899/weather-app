import {
  CHANGE_PAGE_PAGINATION,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_PENDING
} from "../constants/pagination";

export function changePagePagination(value) {
  return {
    type: CHANGE_PAGE_PAGINATION,
    payload: value
  };
}

export const getProductsAction = (dataFilter) => async dispatch => {
  const { limit, productName, promotionPrice, productCategories } = dataFilter
  const minPrice = dataFilter.promotionPrice[0]
  const maxPrice = dataFilter.promotionPrice[1]
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  try {
    const response = await fetch(
      `http://localhost:8002/products?limit=${limit}&productName=${productName}&minPrice=${minPrice}&maxPrice=${maxPrice}&productCategories=${productCategories}`, requestOptions
    );

    const data = await response.json();
    return dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      data: data.products
    });
  } catch (err) {
    alert(err);
  }

}


//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   }

//   await dispatch({
//     type: FETCH_PRODUCTS_PENDING
//   });

//   try {
//     const response = await fetch(
//       "http://localhost:8002/products?limit=${limit}&productName=${productName}&minPrice=${minPrice}&maxPrice=${maxPrice}", requestOptions
//     );

//     const data = await response.json();

//     return dispatch({
//       type: FETCH_PRODUCTS_SUCCESS,
//       data: data
//     });
//   } catch (err) {
//     return dispatch({
//       type: FETCH_PRODUCTS_ERROR,
//       error: err
//     });
//   }
// };