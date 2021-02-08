import React from "react";

interface Props {}

const ContactsMap: React.FC<Props> = () => {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.607666785598!2d30.314183302000178!3d59.96865634490445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46963159ecfb2891%3A0x2880a9106fea83f4!2sFAB%20LAB!5e0!3m2!1sru!2sru!4v1582877248815!5m2!1sru!2sru"
            style={{
                width: "680px",
                height: "500px",
                filter: "contrast(81%) hue-rotate(178deg) invert(100%)",
                border: 0,
                padding: "10px"
            }}
            frameBorder=""
        />
    );
};

export default ContactsMap;
