import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';
import cl from './app.module.scss';

export const App = () => {
  return (
    <div className={cl.app}>
      <Header />
      <div className={cl['app__main']}>
        <Main />
      </div>
      <Footer />
    </div>
  );
};

