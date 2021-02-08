import React from "react";
import ContactLinks from "./links";
import ContactsMap from "./map";

interface Props {}

const ContactsPage: React.FC<Props> = () => {
    return (
        <div className="section events">
            <div className="title title-home">
                Контакты <img src="/assets/img/icons/dash.svg" alt="" />
            </div>
            <div className="contacts">
                <ContactLinks />
                <ContactsMap />
            </div>
        </div>
    );
};

export default ContactsPage;
