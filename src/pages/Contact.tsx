import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Contact.less';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 这里可以添加表单提交逻辑
    alert('感谢您的留言！我们会尽快回复您。');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="contact-content">
        <h1>联系我们</h1>

        <div className="contact-info">
          <div className="info-section">
            <h2>联系方式</h2>
            <div className="contact-methods">
              <div className="contact-method">
                <h3>📧 邮箱</h3>
                <p>contact@reactssr.com</p>
              </div>
              <div className="contact-method">
                <h3>📱 电话</h3>
                <p>+86 138-0000-0000</p>
              </div>
              <div className="contact-method">
                <h3>📍 地址</h3>
                <p>北京市朝阳区某某大厦</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>发送消息</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">消息</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
