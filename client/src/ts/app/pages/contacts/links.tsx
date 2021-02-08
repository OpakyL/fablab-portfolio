import React, { useState } from "react";
import Button from "Ts/components/button";
import Portal from "Ts/components/portal";
import Modal from "Ts/components/modal";

interface Props {}

const ContactLinks: React.FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="contact-links">
            <Portal>
                <Modal show={showModal} setShow={setShowModal} />
            </Portal>
            <div className="links">
                <div className="link-wrapper">
                    <a
                        className="link"
                        href="https://www.instagram.com/fablab_spb/"
                        target="_blank"
                    >
                        <div className="ico">
                            <img src="/assets/img/footer/instagram.svg" />
                        </div>
                        <div className="href">Мы в Instagram</div>
                    </a>
                </div>
                <div className="link-wrapper">
                    <a className="link" href="tel:+79500444633">
                        <div className="ico">
                            <img src="/assets/img/footer/phone.svg" />
                        </div>
                        <div className="href">8 950 044 46 33</div>
                    </a>
                </div>
                <div className="link-wrapper">
                    <a className="link" href="mailto: lpm-format@mail.ru">
                        <div className="ico">
                            <img src="/assets/img/footer/mail.svg" />
                        </div>
                        <div className="href">lpm-format@mail.ru</div>
                    </a>
                </div>
                <div className="link-wrapper">
                    <a
                        className="link"
                        href="https://vk.com/fablab_spb"
                        target="_blank"
                    >
                        <div className="ico">
                            <img src="/assets/img/footer/vk.svg" />
                        </div>
                        <div className="href">Мы в VK</div>
                    </a>
                </div>
                <div className="link-wrapper">
                    <a
                        className="link"
                        href="https://wa.me/79500444633"
                        target="_blank"
                    >
                        <div className="ico">
                            <img src="/assets/img/footer/whatsapp.svg" />
                        </div>
                        <div className="href">WhatsApp</div>
                    </a>
                </div>
                <div className="link-wrapper">
                    <a
                        className="link"
                        href="https://youtube.com/"
                        target="_blank"
                    >
                        <div className="ico">
                            <img src="/assets/img/footer/youtube.svg" />
                        </div>
                        <div className="href">YouTube</div>
                    </a>
                </div>
                <Button
                    className="button-contacts"
                    onClick={() => setShowModal(!showModal)}
                >
                    Обратная связь
                </Button>
            </div>
        </div>
    );
};

export default ContactLinks;
