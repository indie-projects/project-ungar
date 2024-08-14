import React, { useState, useEffect } from 'react';
import pdfData from '../data/output.json';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(pdfData);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.filename}</h3>

          <h4>Beschreibung:</h4>
          <p>{product.content?.text?.description}</p>

          <h4>Preis:</h4>
          <p>{product.content?.text?.price}</p>

          <h4>Modell:</h4>
          <p>{product.content?.text?.model}</p>

          {product.content?.text?.specifications && (
            <>
              <h4>Spezifikationen:</h4>
              <ul>
                <li>Leistung: {product.content.text.specifications?.power}</li>
                <li>Schalldruckpegel: {product.content.text.specifications?.sound_pressure}</li>
                <li>Abmessungen: {product.content.text.specifications?.dimensions}</li>
                <li>Gewicht: {product.content.text.specifications?.weight}</li>
              </ul>
            </>
          )}

          <h4>Bilder:</h4>
          {product.content?.images?.map((image, imageIndex) => (
            <div key={imageIndex}>
              <p>{image.filename}</p>
              <img 
                src={`data:image/png;base64,${image.data}`} 
                alt={image.filename} 
                style={{ maxWidth: '300px', maxHeight: '300px' }} 
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Products;
