import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./EditProduct.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validation, isButtonDisabled } from "../../Create/validation";
import { getCategories, updateProduct } from "../../../redux/actions/actions";
import CountryList from "react-select-country-list";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";

const EditProduct = ({id, setEditing}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const countryoptions = useMemo(() => CountryList().getData(), []);
  const categoryOptions = useMemo(() => {
    return (
      categories.data?.map((category) => ({
        value: category.id,
        label: category.name,
      })) || []
    );
  }, [categories.data]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [productData, setProductData] = useState({
    name: "",
    image: "",
    description: "",
    country: "",
    category: "",
    price: "",
    stock: "",
    amountMl: "",
    alcoholContent: "",
  });
  const [errors, setErrors] = useState(validation(productData));

  const handleChange = (field, value) => {
    let fieldValue = value;

    // Extract the country name if the value is an object
    if (typeof value === "object" && value.label) {
      fieldValue = value.label;
    }

    setProductData({
      ...productData,
      [field]: fieldValue,
    });

    setErrors(
      validation({
        ...productData,
        [field]: fieldValue,
      })
    );
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Your Cloudinary upload preset

      // Make a POST request to Cloudinary to upload the image
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkwvnp3ut/image/upload", // Cloudinary upload API URL
        formData
      );

      if (response.data.secure_url) {
        // Set the Cloudinary image URL in the productData state
        setProductData({
          ...productData,
          image: response.data.secure_url,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = (event) => {
    if (!productData.image) {
      productData.image =
        "https://res.cloudinary.com/dkwvnp3ut/image/upload/v1696480032/imageProduct_pk7rwy.png";
    }
    event.preventDefault();
    Swal.fire({
      title: "Modificar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar el producto!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the createProduct function
        console.log(`producto a editar: ${id}`);
        dispatch(updateProduct(id, productData))
          .then(() => {
            // Show a success alert if the product is created successfully
            Swal.fire("Modificado!", "El producto ha sido modificado.", "success");
            setProductData({
              name: "",
              image: "",
              description: "",
              country: "",
              category: "",
              price: "",
              stock: "",
              amountMl: "",
              alcoholContent: "",
            });
          })
          .then(() => {
            setEditing(false);
          })
          .catch((error) => {
            // Handle errors if the product creation fails
            Swal.fire(
              "Error!",
              "An error occurred while editing the product.",
              "error"
            );

            // You can log or handle the error as needed
            console.error(error);
          });
      }
    });
  };
  const handleCancel = () => {
    setEditing(false);
  }

  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={productData.name}
              onChange={(event) => {
                handleChange("name", event.target.value);
              }}
              isInvalid={errors.name}
              isValid={productData.name && !errors.name}
            />
            <Form.Control.Feedback type="invalid">
              <div>
                El nombre debe tener al menos dos letras y no puede incluir
                números.
              </div>
            </Form.Control.Feedback>
            </Form.Group>
          <div className={style.catePrecPais}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoría</Form.Label>
              <Select
                options={categoryOptions}
                value={categoryOptions.find(
                  (category) => category.value === productData.category
                )}
                onChange={(selectedOption) =>
                  handleChange("category", selectedOption?.label || "")
                }
                name="category"
              />
              <Form.Control.Feedback type="invalid">
                <div>Seleccione una categoría</div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={productData.price}
                onChange={(event) => {
                  handleChange("price", event.target.value);
                }}
                isInvalid={errors.price}
                isValid={productData.price && !errors.price}
              />
              <Form.Control.Feedback type="invalid">
                <div>El precio debe ser un numero mayor a cero</div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>País de origen</Form.Label>
              <Select
                options={countryoptions}
                placeholder="Selecciona el país que corresponde"
                value={{ value: productData.country, label: productData.country }}
                onChange={(value) => handleChange("country", value)}
                name="country"
              />
              <Form.Control.Feedback type="invalid">
                <div>Ingrese un país válido</div>
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </Form.Group>
          <div className={style.volGraStock}>
            <Form.Group className="mb-3" controlId="amountMl">
              <Form.Label>Volumen</Form.Label>
              <Form.Control
                type="text"
                value={productData.amountMl}
                onChange={(event) => {
                  handleChange("amountMl", event.target.value);
                }}
                isInvalid={errors.amountMl}
                isValid={productData.amountMl && !errors.amountMl}
              />
              <Form.Control.Feedback type="invalid">
                <div>La cantidad deber ser un número entre 1 y 10000 ml.</div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="alcoholContent">
              <Form.Label>Graduación Alcohólica</Form.Label>
              <Form.Control
                type="text"
                value={productData.alcoholContent}
                onChange={(event) => {
                  handleChange("alcoholContent", event.target.value);
                }}
                isInvalid={errors.alcoholContent}
                isValid={productData.alcoholContent && !errors.alcoholContent}
              />
              <Form.Control.Feedback type="invalid">
                <div>Debe ser un número entre 1 y 20.</div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                value={productData.stock}
                onChange={(event) => {
                  handleChange("stock", event.target.value);
                }}
                isInvalid={errors.stock}
                isValid={productData.stock && !errors.stock}
              />
              <Form.Control.Feedback type="invalid">
                <div>El stock debe ser mayor a cero y menor o igual que mil.</div>
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={productData.description}
              onChange={(event) => {
                handleChange("description", event.target.value);
              }}
              isInvalid={errors.description}
              isValid={productData.description && !errors.description}
            />
            <Form.Control.Feedback type="invalid">
              <div>La descripción debe tener entre 12 y 256 caracteres.</div>
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className={style.button}
            variant="primary"
            type="submit"
            disabled={isButtonDisabled(errors, productData)}
          >
            Modificar
          </Button>
          <Button className={style.buttonDanger} variant="danger" onClick={handleCancel}>Cancelar</Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
