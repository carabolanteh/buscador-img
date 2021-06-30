import React from 'react';

const Imagen = ({imagen}) => {
    const {largeImageURL, likes, previewURL, tags, views} = imagen;
    return (
        <div className="col-12 col-ms-6 col-md-4 col-lg-3">
           <div className="card mt-5">
                <img 
                    src={previewURL} 
                    alt={tags} 
                    className="card-img-top imagen"
                />
                <div className="card-body">
                    <p className="card-text">
                        {likes} Likes ❤
                    </p>
                    <p className="card-text">
                        {views} Views 👁
                    </p>
                </div>
                <div className="card-footer">
                    <a href={largeImageURL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary btn-block"
                    >Ver Imagen</a>
                </div>
           </div>
        </div>
    );
};

export default Imagen;