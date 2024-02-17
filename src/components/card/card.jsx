import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dispatch from '../../store/dispatch';
import { menu3 } from '../../data/products';
import cl from './card.module.scss';
import logo from '../../images/burger2.svg';

export const Card = ({ id, url, weight, name, price }) => {
  const navigate = useNavigate(),
    { addToBasket } = dispatch,
    { basket } = useSelector(state => state.basket),
    { category } = useParams(),
    isAdded = basket.find(prod => prod.id === `${category}/${id}`);

  const onClickAddToBasket = (category, id, url, weight, name, price) => {
    return e => {
      e.stopPropagation();
      addToBasket({
        id: `${category}/${id}`,
        url,
        weight,
        name,
        price,
        count: 1,
      });
    };
  };

  const openModalProductInfo = (category, id) => {
    return () => navigate(`/menu/${category}/${id}`);
  };

  const noImage = e => {
    e.target.src = logo;
    e.target.style.objectFit = 'fill';
  };

  return (
    <li
      onClick={openModalProductInfo(category, id)}
      id={`${category}/${id}`}
      className={cl.product}
    >
      <img
        className={cl['product__image']}
        onError={noImage}
        src={url}
        alt={menu3[category]}
      />
      {price ? (
        <span className={cl['product__price']}>{price}₽</span>
      ) : (
        <span className={`${cl['product__price']} ${cl['product__price_min']}`}>
          уточняте при заказе
        </span>
      )}
      <span
        className={
          weight
            ? cl['product__name']
            : `${cl['product__name']} ${cl['product__name_increased']}`
        }
      >
        {name || `${menu3[category]} номер ${id}`}
      </span>
      {weight && <span className={cl['product__weight']}>{weight}г</span>}
      <button
        onClick={onClickAddToBasket(category, id, url, weight, name, price)}
        className={
          isAdded
            ? `${cl['product__add-btn']} ${cl['product__add-btn_added']}`
            : cl['product__add-btn']
        }
      >
        Добавить
      </button>
    </li>
  );
};
