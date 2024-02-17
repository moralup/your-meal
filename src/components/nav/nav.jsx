import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { icons } from '../../images/icons-menu/icons';
import { menu } from '../../data/products';
import cl from './nav.module.scss';
import { Basket } from '../basket';
export const Nav = () => {
  return (
    <>
      <nav className={cl.nav}>
        <ul className={cl.categories}>
          {menu.map(product => (
            <li key={product.id}>
              <NavLink
                to={`/menu/${product.id}`}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: '#ffab08' } : {}
                }
              >
                <img src={icons[product.id]} />
                {product.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={cl['main__content']}>
        <Basket />
        <Outlet />
      </div>
    </>
  );
};
