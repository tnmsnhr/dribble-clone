import React from 'react';
import {FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon} from 'react-share';
import Backdrop from '../Backdrop/Backdrop';

const Share = (props) => {
    return (
        <>
        <div className="social__share-content">
            <Backdrop show clicked={props.clicked}/>
            <div className="social__share-popup">
                <div className="header__area"></div>
                <div className="image__area">
                    <img src={props.url} />
                </div>
                <div className="content__area">
                    <div className="row">
                        <h2>Share this with your social Community</h2>
                    </div>
                    <div className="share__area">
                        <FacebookShareButton  quote="demo share" url={props.url}>
                            <FacebookIcon size={"2rem"} round/>
                        </FacebookShareButton>
                        &nbsp;
                        <PinterestShareButton  quote="demo share" media={props.url} url={props.url}>
                            <PinterestIcon size={"2rem"} round/>
                        </PinterestShareButton>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Share;
