import { Card } from '../card';
import { CardModal } from '../card-modal';
import { DeliveryModal } from '../delivery-modal';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { products, menu2 } from '../../data/products';
import cl from './product-list.module.scss';

export const ProductList = () => {
  const { category } = useParams();
  if (!products?.[category]) {
    return <Navigate to="/menu/burger" replace />;
  }
  return (
    <>
      <div className={cl['product-list']}>
        <h2 className={cl['product-list__title']}>{menu2[category]}</h2>
        <ul>
          {products[category].map(product => (
            <Card key={product.id} {...product} />
          ))}
        </ul>
      </div>
      <Routes>
        <Route path="delivery" element={<DeliveryModal />} />
        <Route path=":id" element={<CardModal />} />
      </Routes>
    </>
  );
};
