import React, { useState, useEffect } from 'react';
import './App.css';
import { translations } from './translations';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import emailjs from '@emailjs/browser';


function App() {
  const [language, setLanguage] = useState('am');
  const [content, setContent] = useState(translations.am);

  useEffect(() => {
    setContent(translations[language]);
  }, [language]);

  const weddingDate = new Date('November 22, 2025 18:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const [formData, setFormData] = useState({ name: '', isAttending: 'yes' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const SERVICE_ID = 'service_gi1449t';
    const TEMPLATE_ID = 'template_1lb5xit';
    const PUBLIC_KEY = 'ZrEJakpavJhqIg7t5';
    const translatedFormData = {
      name: formData.name,
      isAttending: formData.isAttending === 'yes' ? content.rsvpYes : content.rsvpNo,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, translatedFormData, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormSubmitted(true);
      }, (err) => {
        console.log('FAILED...', err);
        alert('Նամակն ուղարկել չհաջողվեց։ Խնդրում ենք փորձել կրկին։');
      });
  };

  const coupleMainImageUrl = 'https://cdn-st3.vigbo.com/u5628/5912/blog/6185570/5800271/76537486/1000-Maria_Aksionova-48cd24df9e853c05d03914bd7e4133da.jpg';
  const coupleImg1Url = 'https://gurutest.ru/uploads/ckeditor/2019/03/08/uechrl.jpeg';
  const coupleImg2Url = 'https://i.pinimg.com/originals/41/0d/cf/410dcf3b6d10630ed1353a200e1738ce.jpg';
  const coupleImg3Url = 'https://i.pinimg.com/originals/8e/c6/7a/8ec67a4c690e7ffaeac03e355089d19b.jpg';

  const churchMapsUrl = "https://maps.app.goo.gl/cSJPdGeYnwxUsbT28";
  const restaurantMapsUrl = "https://maps.app.goo.gl/x4eJXjVyxJQUmXiS6";

  // Ավելացված է Inline Style-ը ամենաբարձր գերակայությունն ապահովելու համար


  return (
    <div className="container">
      <LanguageSwitcher setLanguage={setLanguage} />

      <section className="hero-section">
        <div className="main-image-container">
          <img src={coupleMainImageUrl} alt="Couple" className="couple-main-img" />
        </div>
        <div className="neomorphic-card neon-effect">
          <h1 className="glxavorhamar subtitle" >{content.heroTitle}</h1>
          <p className="subtitle">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="countdown-section">
        <div className="neomorphic-card">
          <h2 className="glxavor subtitle">{content.countdownTitle}</h2>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span key={timeLeft.days} className="countdown-number">{timeLeft.days}</span>
              <br />
              {content.countdownDays}
            </div>
            <div className="countdown-item">
              <span key={timeLeft.hours} className="countdown-number">{timeLeft.hours}</span>
              <br />
              {content.countdownHours}
            </div>
            <div className="countdown-item">
              <span key={timeLeft.minutes} className="countdown-number">{timeLeft.minutes}</span>
              <br />
              {content.countdownMinutes}
            </div>
            <div className="countdown-item">
              <span key={timeLeft.seconds} className="countdown-number">{timeLeft.seconds}</span>
              <br />
              {content.countdownSeconds}
            </div>
          </div>
        </div>
      </section> 

      <section className="details-section">
        <div className="neomorphic-card">
        
          <div className="location-item"> 
            <h2 className="glxavor subtitle">{content.churchTitle}</h2>
            <p className="subtitle">{content.churchAddress}</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Surb_Sargis_church_%2813%29.JPG/960px-Surb_Sargis_church_%2813%29.JPG" alt="Church Image" className="location-img" />
            <a href={churchMapsUrl} target="_blank" rel="noopener noreferrer">
              <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <span>{content.churchLocation}</span>
            </a>
          </div>
          <div className="location-item">
            <h3 className="glxavor subtitle">{content.restaurantTitle}</h3>
            <p className='subtitle' >{content.restaurantAddress}</p>
            <img src="https://hyurservice.com/images/hotel/1/16849254458362/hqdefault.webp" alt="Restaurant Image" className="location-img" />
            <a href={restaurantMapsUrl} target="_blank" rel="noopener noreferrer">
              <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <span>{content.restaurantLocation}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="rsvp-section">
        <div className="neomorphic-card">
          <h2 className="glxavor subtitle">{content.rsvpTitle}</h2>
          {!formSubmitted ? (
            <form onSubmit={handleSubmit}>
              <label className='subtitle' htmlFor="name">{content.rsvpName}</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              <label className='subtitle' htmlFor="isAttending">{content.rsvpAttending}</label>
              <select className='subtitl'  id="isAttending" name="isAttending" value={formData.isAttending} onChange={handleChange}>
                <option className='opnmek' value="yes">{content.rsvpYes}</option>
                <option className='opnerk' value="no">{content.rsvpNo}</option>
              </select>
              <button className='subtitle' type="submit">{content.rsvpButton}</button>
            </form>
          ) : (
            <p className="success-message ">{content.rsvpThanks}</p>
          )}
        </div>
      </section>

      <section className="gallery-section">
        <div className="neomorphic-card neon-effect">
          <h2 className="glxavor subtitle">{content.galleryTitle}</h2>
          <div className="image-grid">
            <img src={coupleImg1Url} alt="Couple 1" className="gallery-img" />
            <img src={coupleImg2Url} alt="Couple 2" className="gallery-img" />
            <img src={coupleImg3Url} alt="Couple 3" className="gallery-img" />
          </div>
        </div>
      </section>

      <p className="copyright">{content.copyright}</p>
    </div>
  );
}

export default App;