import React from "react"


const ContentError = () => {
    return (
        <div className="content-error">
            <div className="content-error__title">Error occured while loading data 😕</div>
            <div className="content-error__text">Please try again later</div>
            <div className="content-error__img">
                <img src="img/content/error.jpg" alt="" />
            </div>
        </div>
    )

}

export default ContentError