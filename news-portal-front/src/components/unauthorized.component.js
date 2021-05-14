import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Unauthorized = () => {
    const { t } = useTranslation();
    return (
        <div className='container'>

            <div class="message">
                <h1>{t("403 - You Shall Not Pass")}</h1>
                <p>{t("Maybe you have a typo")}</p>
            </div>
            <p><Link to='/'>{t("Back to Home")}</Link></p>
        </div>
    )
}

export default Unauthorized;
