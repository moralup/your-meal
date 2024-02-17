import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { products } from '../../data/products';
import dispatch from '../../store/dispatch';
import cl from './card-modal.module.scss';
import logo from '../../images/burger2.svg';

const MainContent = ({ ingredients, description }) => {
  const [active, setActive] = useState(
      (ingredients && 'ing') || (description && 'des') || undefined,
    ),
    sectionTitles = [];

  ingredients && sectionTitles.push({ title: 'Состав', abbreviation: 'ing' });
  description && sectionTitles.push({ title: 'Описание', abbreviation: 'des' });

  const paragraph = content => (
    <div className={cl['details__description']}>{content}</div>
  );

  const ingEl = (
    <ul className={cl['details__description-ing']}>
      {ingredients.map(ing => (
        <li key={ing}>{ing}</li>
      ))}
    </ul>
  );
  const section = content => (
    <>
      <ul className={cl['details__titles']}>
        {sectionTitles.map(({ title, abbreviation }) => (
          <li
            id={abbreviation}
            key={abbreviation}
            onClick={e => setActive(e.target.id)}
            className={
              active === abbreviation
                ? `${cl['details__titles-title']} ${cl['details__titles-title_active']}`
                : cl['details__titles-title']
            }
          >
            {title}
          </li>
        ))}
      </ul>
      {paragraph(content)}
    </>
  );
  switch (true) {
    case !active:
      return paragraph('описания нет :(');
    case window.innerWidth >= 660:
      return paragraph(
        <>
          {description && (
            <p className={cl['details__description-text']}> {description}</p>
          )}
          {ingredients && (
            <>
              <h3 className={cl['details__description-title-ing']}>Состав:</h3>
              {ingEl}
            </>
          )}
        </>,
      );
    case active === 'des':
      return section(description);
    case active === 'ing':
      return section(ingEl);
  }
};

export const CardModal = () => {
  const { id, category } = useParams(),
    basket = useSelector(state => state.basket.basket),
    navigate = useNavigate(),
    { addToBasket } = dispatch;

  const {
    ingredients,
    name,
    url,
    calories,
    description,
    weight,
    price,
    notFound,
  } = products?.[category]?.[id - 1] || {
    name: `${category} №${id} not found`,
    url: 'https://i.gifer.com/embedded/download/G2TW.gif',
    notFound: true,
  };

  const goBack = e => {
    e.target
      .closest(`.${cl['card-wrap']}`)
      .classList.add(cl['animation-close']);
  };

  const noImage = e => {
    e.target.src = logo;
    e.target.style.objectFit = 'fill';
  };

  const quantityProduct = basket.find(
    prod => prod.id === `${category}/${id}`,
  )?.count;

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
  const updateProductQuantity = e => {
    e.stopPropagation();
    const action = e.target?.dataset?.action;
    action &&
      quantityProduct &&
      dispatch[`${action}Product`](`${category}/${id}`);
  };
  return (
    <div
      onAnimationEnd={e => {
        switch (e.animationName) {
          case cl.delete:
            navigate(`/menu/${category}`);
            break;
          case cl.open:
            e.target.classList.remove(cl['animation-open']);
            break;
        }
      }}
      className={`${cl['card-wrap']} ${cl['animation-open']}`}
    >
      <div
        className={notFound ? `${cl.card} ${cl['card_not-found']}` : cl.card}
      >
        <div className={cl['header']}>
          <h2 className={cl['header__title']}>{name}</h2>
          <button onClick={goBack} className={cl['header__close']} />
        </div>
        <div className={cl['main']}>
          <div className={cl['main__box']}>
            <img
              src={url}
              alt={name}
              onError={noImage}
              className={cl['main__box-image']}
            />
            {price && <div className={cl['main__box-price']}>{price}₽</div>}
          </div>
          <div className={cl['details']}>
            <MainContent ingredients={ingredients} description={description} />
            {weight && <span className={cl['details__diet']}>{weight}г,</span>}
            {calories && (
              <span className={cl['details__diet']}>{calories}ккал</span>
            )}
          </div>
        </div>
        <div className={cl['footer']}>
          <button
            onClick={onClickAddToBasket(category, id, url, weight, name, price)}
            className={
              quantityProduct
                ? `${cl['footer__add']} ${cl['footer__add_added']} `
                : cl['footer__add']
            }
          >
            Добавить
          </button>
          <div
            onClick={updateProductQuantity}
            className={cl['footer__counter']}
          >
            <button data-action="decrement">-</button>
            <div>{quantityProduct || 0}</div>
            <button data-action="increment">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};
