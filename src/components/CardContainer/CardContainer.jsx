import { useEffect } from "react";
import style from "../CardContainer/CardContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getNextProductPage } from "../../redux/actions/actions";
import Card from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading/Loading";
import { createSelector } from "reselect";
import { useNavigate } from "react-router";

export default function CardContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      {products.length === 0 ? (
        <div className={style.noProductsMessage}>
          No se encontraron productos con ese nombre.
        </div>
      ) : (
        <div>
          <h2 className={style.subtitle}>Selección de las mejores cervezas</h2>
          <InfiniteScroll
            dataLength={products?.length}
            next={handleNextPage}
            hasMore={page.hasMore}
            loader={<Loading />}
            style={{ overflow: "hidden" }}
          >
            <div className={style.gridContainer}>
              {products.map((product) => {
                return (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.image}
                    stock={product.stock}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}
