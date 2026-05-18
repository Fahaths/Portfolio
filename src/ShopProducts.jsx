import React, { useState } from 'react';

const dummyProducts = [
  {
    id: 1,
    name: 'Travel Backpack',
    category: 'bags',
    image: 'https://source.unsplash.com/400x400/?bag',
    discount: 'Save 25%'
  },
  {
    id: 2,
    name: 'Leather Satchel',
    category: 'bags',
    image: 'https://source.unsplash.com/400x400/?bag',
    discount: 'Save 15%'
  },
  {
    id: 3,
    name: 'Canvas Duffel',
    category: 'bags',
    image: 'https://source.unsplash.com/400x400/?bag',
    discount: 'Save 20%'
  },
  {
    id: 4,
    name: 'Running Sneakers',
    category: 'footwear',
    image: 'https://source.unsplash.com/400x400/?shoes',
    discount: 'Save 30%'
  },
  {
    id: 5,
    name: 'Casual Loafers',
    category: 'footwear',
    image: 'https://source.unsplash.com/400x400/?shoes',
    discount: 'Save 10%'
  },
  {
    id: 6,
    name: 'High‑Top Trainers',
    category: 'footwear',
    image: 'https://source.unsplash.com/400x400/?shoes',
    discount: 'Save 20%'
  },
  {
    id: 7,
    name: 'Vintage Tote',
    category: 'bags',
    image: 'https://source.unsplash.com/400x400/?bag',
    discount: 'Save 18%'
  },
  {
    id: 8,
    name: 'Sport Sandals',
    category: 'footwear',
    image: 'https://source.unsplash.com/400x400/?shoes',
    discount: 'Save 22%'
  }
];

export default function ShopProducts() {
  const [activeTab, setActiveTab] = useState('bestseller');

  const filteredProducts = dummyProducts.filter(p =>
    activeTab === 'bestseller' ? p.id % 2 === 0 : p.id % 2 !== 0
  );

  return (
    <section className="shop-section reveal" id="shop">
      <div className="shop-header">
        <h2 className="shop-title">SHOP PRODUCTS</h2>
        <p className="shop-subtitle">Explore our curated collection</p>
        <a href="#" className="shop-cta btn-filled">SHOP NOW</a>
      </div>
      <div className="shop-tabs">
        <button
          className={`shop-tab ${activeTab === 'bestseller' ? 'active' : ''}`}
          onClick={() => setActiveTab('bestseller')}
        >
          Bestseller
        </button>
        <button
          className={`shop-tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          What’s New
        </button>
      </div>
      <div className="shop-content">
        <div className="shop-banner">
          <img
            src="https://source.unsplash.com/800x600/?fashion"
            alt="Shop Banner"
            className="shop-banner-img"
          />
        </div>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <span className="discount-tag">{product.discount}</span>
              </div>
              <h3 className="product-name">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
