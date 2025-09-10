import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.less';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/">React SSR App</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/contact">联系</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 React SSR App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
