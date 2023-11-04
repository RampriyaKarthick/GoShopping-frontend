import React, { Fragment, useEffect, useState } from "react";
import Metadata from "../MetaData";
import { getProducts } from "../../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Product from "./Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

function ProductSearch() {
  const dispatch = useDispatch();
  

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const {keyword} = useParams();

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
    dispatch(getProducts(pageNo)); // Fetch products for the selected page.
  }

  useEffect(() => {
    if (error) {
      return toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
    }

   
    dispatch(getProducts(keyword, currentPage));
  }, [error, dispatch, currentPage, keyword]);

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <div>
          <Metadata title={"Buy best products"} />
          <h1 id="products_heading">Search Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
            <div className="col-6 col-md-3 mb-5 mt-5">
            <div className="px-5">
<Slider
  range={true}
  marks={
    {
      1:"$1",
      1000:"$1000"
    }
  }
  min={1}
  max={1000}
  defaultValue={[1,1000]}
  handleRender={
    renderProps =>{
return (
  <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
    <div {...renderProps.props}> </div>
  </Tooltip>
)
    }
    }
/>


            </div>

            </div>
            <div className="col-6 col-md-9">
              <div>
              </div>
              {products && products.map((product) => (
                <Product col={4} key={product._id} product={product} />
              ))}
            </div>
              </div>
           
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText="Next"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          ) : null}
        </div>
      )}
    </Fragment>
  );
}

export default ProductSearch;
