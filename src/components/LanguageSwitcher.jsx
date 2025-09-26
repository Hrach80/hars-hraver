import React from 'react';

const LanguageSwitcher = ({ setLanguage }) => {
    return (
        <div className="language-switcher">
            <button onClick={() => setLanguage('am')}>AM</button>
            <button onClick={() => setLanguage('ru')}>RU</button>
            <button onClick={() => setLanguage('en')}>EN</button>
        </div>
    );
};

export default LanguageSwitcher;