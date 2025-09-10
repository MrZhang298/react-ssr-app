import React from 'react';
import './Home.less';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>欢迎来到 React SSR 应用</h1>
        <p>这是一个使用服务端渲染的React应用示例</p>
        <div className="features">
          <div className="feature">
            <h3>🚀 服务端渲染</h3>
            <p>更快的首屏加载速度和更好的SEO优化</p>
          </div>
          <div className="feature">
            <h3>🎯 React Router</h3>
            <p>完整的客户端和服务端路由支持</p>
          </div>
          <div className="feature">
            <h3>⚡ 现代化构建</h3>
            <p>使用Webpack和Babel的现代化构建流程</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
