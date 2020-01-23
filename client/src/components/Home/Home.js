import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/userFetch';
import Card from './Card';

const Home = () => {
  const [productsBySold, setProductBySold] = useState([]);
  const [productsByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProductsBySold = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProductBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  const showError = () => error && <h2>Fail to load!</h2>;

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="text-center m-3">
      {showError()}
      <h2 className="mb-4">New Arrivals</h2>
      {showLoading()}
      <div className="row">
        {productsByArrival.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      {showLoading()}
      <div className="row">
        {productsBySold.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;