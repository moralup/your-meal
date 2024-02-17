import { ProductList } from '../product-list';
import { Nav } from '../nav';
import { Routes, Route, Navigate } from 'react-router-dom';
import cl from './main.module.scss';

export const Main = () => {
  return (
    <main className={cl.main}>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Navigate to="/menu/burger" />} />
          {[
            { path: 'menu/:category/*', Element: <ProductList /> },
            { path: '*', Element: <Navigate to="/menu/burger" replace /> },
          ].map(({ path, Element }) => (
            <Route key={path} path={path} element={Element} />
          ))}
        </Route>
      </Routes>
    </main>
  );
};
