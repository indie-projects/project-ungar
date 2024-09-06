import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import CartContext from '../CartContext';

// Globale Stile für die Produkte-Komponente
const GlobalProductsStyle = createGlobalStyle`
  body {
    overflow: visible; /* Ermöglicht das Scrollen bei Bedarf */
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  animation: ${fadeIn} 1s ease-in-out;
  margin-bottom: 2rem;
`;

const ProductCard = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
  margin: 15px;
  width: calc(33% - 30px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 1200px) {
    width: calc(50% - 30px);
  }

  @media (max-width: 768px) {
    width: calc(100% - 30px);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #333;
  border-bottom: 1px solid #444;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductDetails = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductTitle = styled.h2`
  font-size: 1.5em;
  margin: 0;
  color: #f0f0f0;
`;

const ProductDescription = styled.p`
  margin: 10px 0;
  color: #b0b0b0;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #f0f0f0;
  margin: 10px 0;
`;

const SpecificationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #b0b0b0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SpecificationItem = styled.li`
  margin-bottom: 10px;
  font-size: 0.9em;

  strong {
    color: #f0f0f0;
  }
`;

const LoadingMessage = styled.div`
  color: #f0f0f0;
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  text-align: center;
  padding: 20px;
`;

const AddToCartButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

function Products({ currentLanguage }) {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/output.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  const renderProduct = (product) => {
    const description = product.description[currentLanguage] || product.description.en;
    const price = `${product.rental.price.amount} ${product.rental.price.currency}`;

    const handleAddToCart = () => {
      addToCart({
        id: product.id,
        name: `${product.brand} ${product.model}`,
        price: product.rental.price.amount,
        image: product.image
      });
    };

    return (
      <ProductCard key={product.id}>
        <ProductImageContainer>
          <ProductImage src={product.image} alt={`${product.brand} ${product.model}`} />
        </ProductImageContainer>
        <ProductDetails>
          <ProductTitle>{`${product.brand} ${product.model}`}</ProductTitle>
          <ProductDescription>{description}</ProductDescription>
          <ProductPrice>{price}</ProductPrice>
          <SpecificationsList>
            {product.specifications.dimensions && (
              <SpecificationItem>
                <strong>Dimensions:</strong> {`${product.specifications.dimensions.width} x ${product.specifications.dimensions.height} x ${product.specifications.dimensions.depth} ${product.specifications.dimensions.unit}`}
              </SpecificationItem>
            )}
            {product.specifications.weight && (
              <SpecificationItem>
                <strong>Weight:</strong> {`${product.specifications.weight.value} ${product.specifications.weight.unit}`}
              </SpecificationItem>
            )}
          </SpecificationsList>
          <AddToCartButton onClick={handleAddToCart}>
            {currentLanguage === "de" ? "In den Warenkorb" : "Add to Cart"}
          </AddToCartButton>
        </ProductDetails>
      </ProductCard>
    );
  };

  return (
    <>
      <GlobalProductsStyle />
      <ProductsContainer>
        {Object.values(products).flat().map(renderProduct)}
      </ProductsContainer>
    </>
  );
}

export default Products;