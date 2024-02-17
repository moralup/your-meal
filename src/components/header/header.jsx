import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import cl from './header.module.scss';
// export const Header = () => {
//   return (
//     <div className={cl.header}>
//       <div className={cl['header__circle']} />
//       <img src={logo} alt="logo" className={cl['header__logo']} />
//       <div className={cl['header__content']}>
//         <img className={cl['header__burger']} src={burger} alt="burger" />
//         <div className={cl['header__info']}>
//           <h1 className={cl['header__slogan']}>
//             Только самые
//             <br /> <Link to="/burger">сочные бургеры!</Link>
//           </h1>
//           <p className={cl['header__action']}>Бесплатная доставка от 599₽</p>
//         </div>
//       </div>
//     </div>
//   );
// };

export const Header = () => {
  return (
    <div className={cl.header}>
      <div className={cl['header__circle']} />
      <img src={logo} alt="logo" className={cl['header__logo']} />
      <div className={cl.content}>
        <img className={cl['content__burger']} src={burger} alt="burger" />
        <div>
          <span className={cl['content__slogan']}>
            Только самые
            <br /> <Link to="/menu/burger">сочные бургеры!</Link>
          </span>
          <span className={cl['content__action']}>
            Бесплатная доставка от 599₽
          </span>
        </div>
      </div>
    </div>
  );
};
