import style from "./Filters.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import HopPassionClient from "../../utils/NetworkingUtils";
import { setFilters } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();
  const [configuration, setConfiguration] = useState({});

  const selectedCountry = useSelector((state) => state.filters.country);
  const selectedOrder = useSelector((state) => state.filters.order);
  const selectedCategory = useSelector((state) => state.filters.category);

  useEffect(() => {
    HopPassionClient.get("/filters/configuration")
      .then((result) => {
        setConfiguration(result.data);
      })
      .catch((error) => {});
  }, []);

  function handleCountry(country) {
    dispatch(
      setFilters({ country, order: selectedOrder, category: selectedCategory })
    );
  }

  function handleOrder(order) {
    dispatch(
      setFilters({
        country: selectedCountry,
        order,
        category: selectedCategory,
      })
    );
  }

  function handleCategory(category) {
    dispatch(
      setFilters({ country: selectedCountry, order: selectedOrder, category })
    );
  }

  return (
    <>
      <Navbar className={style.container}>
        <Container className={style.content}>
          <NavDropdown
            title={selectedCountry ?? "País de origen"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => handleCountry(null)}>
              Todos
            </NavDropdown.Item>
            {(configuration.countries ?? []).map((country) => {
              return (
                <NavDropdown.Item
                  key={country}
                  onClick={() => handleCountry(country)}
                >
                  {country} {selectedCountry === country && "✔️"}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>

          <NavDropdown
            title={selectedCategory ? selectedCategory.name : "Categoría"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => handleCategory(null)}>
              Todas
            </NavDropdown.Item>
            {(configuration.categories ?? []).map((category) => {
              return (
                <NavDropdown.Item
                  key={category.id}
                  onClick={() => handleCategory(category)}
                >
                  {category.name} {selectedCategory === category && "✔️"}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>

          <NavDropdown
            title={selectedOrder ? selectedOrder.name : "Ordenar por"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => handleOrder(null)}>
              Defecto
            </NavDropdown.Item>
            {(configuration.order ?? []).map((item) => {
              return (
                <NavDropdown.Item
                  key={item.id}
                  onClick={() => handleOrder(item)}
                >
                  {item.name}{" "}
                  {selectedOrder ? selectedOrder.id === item.id && "✔️" : <></>}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
}
