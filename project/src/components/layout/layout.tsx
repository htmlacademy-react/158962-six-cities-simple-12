import { Outlet } from 'react-router-dom';
import {ReactNode} from 'react';
import Header from '../header/header';

type LayoutProps = {
  className: string;
  children: ReactNode;
}

const Layout = ({children, className}: LayoutProps): JSX.Element => (
  <div className={`page ${className}`}>
    <Header />
    {children}
    <Outlet />
  </div>
);

export default Layout;
