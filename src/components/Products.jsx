import React, { useState, useEffect } from 'react';
import pdfData from '../data/products.json'; // Pfad zur JSON-Datei

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simuliere den Ladevorgang der JSON-Daten
    setProducts(pdfData);
  }, []);

  return (
    <div>
      <h2>PDF Inhalte</h2>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.filename}</h3>
          
          <h4>Text:</h4>
          {product.content.text.map((text, textIndex) => (
            <p key={textIndex}>{text}</p>
          ))}

          <h4>Bilder:</h4>
          {product.content.images.map((image, imageIndex) => (
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
