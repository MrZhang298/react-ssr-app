import React from 'react';
import './About.less';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h1>关于我们</h1>
        <div className="about-section">
          <h2>项目介绍</h2>
          <p>
            这是一个完整的React服务端渲染(SSR)应用示例。该项目展示了如何构建一个
            现代化的React应用，支持服务端渲染以提供更好的性能和SEO优化。
          </p>
        </div>

        <div className="about-section">
          <h2>技术栈</h2>
          <ul className="tech-list">
            <li>React 18 - 用户界面库</li>
            <li>React Router - 客户端路由</li>
            <li>Express.js - Node.js服务器框架</li>
            <li>Webpack - 模块打包工具</li>
            <li>Babel - JavaScript编译器</li>
            <li>TypeScript - 静态类型检查</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>特性</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>服务端渲染</h3>
              <p>提供更快的首屏加载速度和更好的SEO支持</p>
            </div>
            <div className="feature-item">
              <h3>同构应用</h3>
              <p>客户端和服务端共享相同的React组件代码</p>
            </div>
            <div className="feature-item">
              <h3>热重载</h3>
              <p>开发环境支持热重载，提高开发效率</p>
            </div>
            <div className="feature-item">
              <h3>现代化构建</h3>
              <p>使用最新的构建工具和优化策略</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
