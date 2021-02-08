import React from "react";
import Portal from "Ts/components/portal";
import FooterElement from "./element";

const Footer: React.FC = () => {
    return (
        // <div className="footer"></div>
        <div className="footer">
            <a
                href="https://www.instagram.com/fablab_spb/"
                title="Instagram"
                target="_blank"
            >
                <img src="/assets/img/footer/instagram.svg" alt="" />
            </a>

            <a
                title="Телефон"
                href="tel:+79500444633"
                rel="noopener noreferrer"
            >
                <img src="/assets/img/footer/phone.svg" alt="" />
            </a>
            <a
                href="mailto: lpm-format@mail.ru"
                title="Почта"
                rel="noopener noreferrer"
            >
                <img src="/assets/img/footer/mail.svg" alt="" />
            </a>
            <a
                href="https://vk.com/fablab_spb"
                target="_blank"
                rel="noopener noreferrer"
                title="ВКонтакте"
            >
                <img src="/assets/img/footer/vk.svg" alt="" />
            </a>
            <a
                title="WhatsApp"
                href="https://wa.me/79500444633"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/assets/img/footer/whatsapp.svg" alt="" />
            </a>

            <a
                href="http://youtube.com"
                target="_blank"
                title="YouTube"
                rel="noopener noreferrer"
            >
                <img src="/assets/img/footer/youtube.svg" alt="" />
            </a>
            <a
                title="Facebook"
                href="http://facebook.com/fablabspb"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/assets/img/footer/facebook.svg" alt="" />
            </a>
            <a href="https://3dstudio.spb.ru/" title="3D Studio" target="_blank" rel="noopener noreferrer">
                <img src="/assets/img/footer/logo.png" alt="" />
            </a>
            <a href="https://lpmtech.ru/" title="Ленполиграфмаш"target="_blank" rel="noopener noreferrer">
                <img src="/assets/img/footer/lpm.svg" alt="" />
            </a>
        </div>
    );
};

export default Footer;
