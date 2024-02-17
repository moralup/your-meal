import logo from '../../images/logo-footer.svg';
import tg from '../../images/tg.svg';
import vk from '../../images/vk.svg';
import cl from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={cl.footer}>
      <div className={cl['footer__content']}>
        <img src={logo} className={cl['footer__logo']} alt="your meal" />
        <div className={cl['footer__contacts']}>
          <div className={`${cl['footer__contacts-cont']} ${cl.order}`}>
            <span>Номер для заказа </span>
            <a href="tel:+79308333811">+7(930) 833-38-11</a>
          </div>
          <div className={cl['footer__contacts-cont']}>
            <span>Мы в соцсетях</span>
            <div>
              {[
                { href: 'https://vk.com/moraldown', src: vk, alt: 'vk' },
                { href: 'https://t.me/moraldown', src: tg, alt: 'telegram' },
              ].map(({ href, src, alt }) => (
                <a key={alt} target="_blank" rel="noreferrer" href={href}>
                  <img src={src} alt={alt} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
