"use client";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";

const ShareButtons = ({ property }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
    return (<>
      <h3 className="text-xl font-bold text-center pt-2">Share This Property:</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}>
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl} title={property.name} separator="::">
          <WhatsappIcon round={true} size={40} />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
        <EmailShareButton url={shareUrl} subject={property.name} body={`Checkout this property listing: ${shareUrl}`}>
          <EmailIcon round={true} size={40} />
        </EmailShareButton>
      </div>
    </>);
};

export default ShareButtons;