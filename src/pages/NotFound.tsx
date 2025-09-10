import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.less';

const NotFound: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>页面未找到</h1>
        <p>抱歉，您访问的页面不存在或已被移除。</p>
        <div className="actions">
          <Link to="/" className="home-link">
            返回首页
          </Link>
          <button onClick={handleGoBack} className="back-btn">
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
