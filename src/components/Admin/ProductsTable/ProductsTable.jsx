import React, { useEffect, useState } from "react";
import style from "./ProductsTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getNextProductPage,
} from "../../../redux/actions/actions";
import Filters from "../../Filters/Filters";
import EditProduct from "./EditProduct";
import Borrado from "./borrado";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Loading/Loading";
import { createSelector } from "reselect";

export default function ProductsTable({ setEditing }) {
  const dispatch = useDispatch();
  const [editProductId, setEditProductId] = useState(null);
  const selectProducts = (state) =>
    state.products ? state.products.products : [];

  const getMemoizedProducts = createSelector([selectProducts], (products) => {
    return products;
  });

  const products = useSelector(getMemoizedProducts);

  const selectPage = (state) =>
    state.products ? state.products.page : { page: 1, hasMore: true };
  const filters = useSelector((state) => state.filters);
  const searchQuery = useSelector((state) => state.query);

  // Aplica memoización al selector usando createSelector
  const getPageInfo = createSelector([selectPage], (page) => {
    if (page) {
      return page;
    }
    return { page: 1, hasMore: true };
  });

  // Luego, usa getPageInfo en tu componente
  const page = useSelector(getPageInfo);

  useEffect(() => {
    dispatch(getProducts(filters, searchQuery));
  }, [filters, searchQuery]);

  function handleNextPage() {
    dispatch(getNextProductPage(filters, searchQuery, page.page));
  }

  const handleEditProduct = (productId) => {
    if (editProductId) {
      setEditProductId(productId);
    } else {
      setEditProductId(true);
    }
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
  };

  return (
    <div className={style.container}>
      <Filters />
      <div className={style.contpagination}>
        <div className={style.barraDatos}>
          <h6>Producto</h6>
          <h6>Graduación</h6>
          <h6>Precio Unitario</h6>
          <h6>Stock</h6>
        </div>
        <div className={style.pagination}></div>
      </div>
      <div className={style.gridContainer}>
        <InfiniteScroll
          dataLength={products?.length}
          next={handleNextPage}
          hasMore={page.hasMore}
          loader={<Loading />}
          style={{ overflow: "hidden" }}
        >
          {products.map((product) => {
            return (
              <div className={style.productStyle} key={product.id}>
                <ul className={style.contentProduct}>
                  <li className={style.productInfo}>
                    <div className={style.product}>
                      <span>{product.name}</span>
                      <span>% {product.alcoholContent}</span>
                      <span>$ {product.price}</span>
                      <span>{product.stock}</span>
                    </div>
                    <div className={style.buttons}>
                      <button
                        className={style.buttonEdit}
                        onClick={() => handleEditProduct(product.id)}
                      >
                        Editar
                      </button>
                      {/*  <button className={style.buttonDesactivar}>Desactivar</button> */}
                      <Borrado id={product.id} />{" "}
                      {/* Pasa el id del producto aquí */}
                    </div>
                  </li>
                  {editProductId === product.id && (
                    <li className={style.productInfo}>
                      <EditProduct
                        id={product.id}
                        setEditing={setEditProductId}
                        onCancel={handleCancelEdit}
                      />
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
