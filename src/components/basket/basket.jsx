import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import deliveryImg from '../../images/delivery.svg';
import dispatch from '../../store/dispatch';
import cl from './basket.module.scss';

export const Basket = () => {
  const [isOpenBasket, setIsOpenBasket] = useState(false);
  const products = useSelector(state => state.basket.basket);
  const idLastProd = useSelector(state => state.basket.idOfTheLastAddedProduct);
  const basketList = useRef();
  const { category } = useParams();
  const navigate = useNavigate();

  const { totalPrice, totalQuantity } = (() => {
    const infoProds = { totalPrice: 0, totalQuantity: 0 };

    products.forEach(prod => {
      infoProds.totalPrice += prod.price * prod.count;
      infoProds.totalQuantity += prod.count;
    });

    return infoProds;
  })();

  const openBasket = e => {
    if (window.innerWidth >= 1000 || !totalQuantity) return;
    console.log('open');
    setIsOpenBasket(true);
    const basket = basketList.current.closest(`.${cl.basket}`);
    const heightBasketList = {
      1: '250px',
      2: '324px',
      3: '399px',
    };
    basket.style.height =
      heightBasketList[basketList.current.children.length] ||
      heightBasketList['3'];

    basket.classList.add(cl['basket_active']);
  };
  const closeBasket = e => {
    e?.stopPropagation();
    console.log('close');

    setIsOpenBasket(false);
    const basket = basketList.current.closest(`.${cl.basket}`);
    basket.style.height = '45px';
    basket.classList.remove(cl['basket_active']);
  };

  const openModalDelivery = () => {
    navigate(`/menu/${category}/delivery`);
  };
  const openModalProductInfo = e => {
    navigate(`menu/${e.target.closest('li').id}`);
  };

  const updateProductQuantity = e => {
    e.stopPropagation();
    const action = e.target?.dataset?.action;
    action && dispatch[`${action}Product`](e.target.closest('li').id);
  };

  useEffect(() => {
    console.log('useEffect');
    isOpenBasket && openBasket();
    !totalQuantity && isOpenBasket && closeBasket();
    if (basketList.current) {
      const indexForArray = products.findIndex(p => p.id === idLastProd),
        productCardHeight = window.innerWidth < 1000 ? 75 : 84,
        positionY = basketList.current.scrollTop,
        indexForBasket = positionY / productCardHeight,
        isNotVisible =
          indexForBasket - indexForArray > 0.3 ||
          indexForArray - indexForBasket > 2.3;

      if (products[indexForArray] && isNotVisible) {
        basketList.current.scrollTo({
          top: indexForArray * productCardHeight,
          behavior: 'smooth',
        });
      }
    }
    document
      .getElementById(idLastProd)
      ?.querySelector(`.${cl['basket__counter']}`)
      ?.classList.add(cl['basket__counter_increment']);
    //! KOCTUL KOCTUL KOCTUL KOCTUL KOCTUL KOCTUL KOCTUL KOCTUL KOCTUL KOCTUL
  }, [products, idLastProd, isOpenBasket]);

  return (
    <div onClick={openBasket} className={cl['basket-wrap']}>
      <div className={cl.basket}>
        <div className={cl['basket__header']}>
          <h2 className={cl['basket__header-title']}>Корзина</h2>
          <span className={cl['basket__header-quantity']}>{totalQuantity}</span>
        </div>
        <ul
          className={cl['basket__products']}
          ref={basketList}
          onClick={openModalProductInfo}
        >
          {products.map(product => {
            const { name, weight, url, price, id, count } = product;
            return (
              <li className={cl['basket__products-product']} id={id} key={id}>
                <img
                  className={cl['basket__products-product-image']}
                  src={url}
                  alt={name}
                />
                <div className={cl['basket__products-product-info']}>
                  {name && (
                    <span className={cl['basket__products-product-info-name']}>
                      {name}
                    </span>
                  )}
                  {weight && (
                    <span
                      className={cl['basket__products-product-info-weight']}
                    >
                      {weight}г
                    </span>
                  )}
                  {price && <span>{price}р</span>}
                </div>
                <div
                  onAnimationEnd={e => {
                    e.target.classList.remove(cl['basket__counter_increment']);
                  }}
                  onClick={updateProductQuantity}
                  className={
                    id === idLastProd
                      ? `${cl['basket__products-product-counter']} ${cl['basket__products-product-counter_increment']}`
                      : cl['basket__products-product-counter']
                  }
                >
                  <button data-action="decrement">-</button>
                  <span>{count}</span>
                  <button data-action="increment">+</button>
                </div>
              </li>
            );
          })}
        </ul>
        {totalQuantity ? (
          <>
            <div className={cl['basket__result']}>
              <div>Итого</div>
              <div>{totalPrice}</div>
            </div>
            <button
              onClick={openModalDelivery}
              className={cl['basket__delivery-btn']}
            >
              Оформить заказ
            </button>
            <div className={cl['basket__footer']}>
              <div
                style={totalPrice >= 599 ? {} : { opacity: 0 }}
                className={cl['basket__footer-notice']}
              >
                <img src={deliveryImg} />
                <span>Бесплатная доставка</span>
              </div>
              <button
                className={cl['basket__footer-close-btn']}
                onClick={closeBasket}
              >
                свернуть
              </button>
            </div>
          </>
        ) : (
          <span>Тут пока пусто :(</span>
        )}
      </div>
    </div>
  );
};
