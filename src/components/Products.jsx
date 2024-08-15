import React, { useEffect, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

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
  align-items: center; /* Horizontale Zentrierung */
  justify-content: center; /* Vertikale Zentrierung */
  text-align: center; /* Textzentrierung */

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

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px; 
  object-fit: contain;
  border-bottom: 1px solid #444;
`;

const ProductDetails = styled.div`
  padding: 15px;
`;

const ProductTitle = styled.h2`
  font-size: 1.5em;
  margin: 0;
  color: #f0f0f0;
  text-align: center; /* Textzentrierung */
`;

const ProductDescription = styled.p`
  margin: 10px 0;
  color: #b0b0b0;
  text-align: center; /* Textzentrierung */
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #f0f0f0;
  text-align: center; /* Textzentrierung */
`;

const SpecificationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #b0b0b0;
  text-align: center; /* Textzentrierung */
`;

const SpecificationItem = styled.li`
  margin-bottom: 5px;
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

const Products = ({ currentLanguage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/output.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
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

  return (
    <>
      <GlobalProductsStyle /> {/* Füge die globalen Styles nur in dieser Komponente hinzu */}
      <ProductsContainer>
        {products.map((product) => {
          const productText = product.content.text[currentLanguage];

          if (!productText) {
            return null;
          }

          return (
            <ProductCard key={product.filename}>
              {product.content.images.length > 0 && (
                <ProductImage
                  src={product.content.images[0].url}
                  alt={product.filename}
                />
              )}
              <ProductDetails>
                <ProductTitle>{productText.model}</ProductTitle>
                <ProductDescription>{productText.description}</ProductDescription>
                <ProductPrice>
                  <strong>{currentLanguage === "hu" ? "Ár:" : "Price:"}</strong>{" "}
                  {productText.price}
                </ProductPrice>
                <SpecificationsList>
                  
                 
                  <SpecificationItem>
                    <strong>
                      {currentLanguage === "hu" ? "Méretek:" : "Dimensions:"}
                    </strong>{" "}
                    {productText.specifications.dimensions}
                  </SpecificationItem>
                  <SpecificationItem>
                    <strong>
                      {currentLanguage === "hu" ? "Súly:" : "Weight:"}
                    </strong>{" "}
                    {productText.specifications.weight}
                  </SpecificationItem>
                </SpecificationsList>
              </ProductDetails>
            </ProductCard>
          );
        })}
      </ProductsContainer>
    </>
  );
};

export default Products;
