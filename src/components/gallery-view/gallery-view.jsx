import { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UploadForm } from '../upload-form/upload-form';

export const GalleryView = () => {
  const { token } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);


  useEffect(() => {
    console.log('Loading images')
    fetch("http://a2-alb-1528498025.us-west-1.elb.amazonaws.com/images", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const imagesFromApi = data.map((image) => {
          return {
            Key: image.Key,
            ETag: image.ETag
          }
        });
        imagesFromApi.shift();
        setImages(imagesFromApi)
        console.log('Successfully loaded images')
      })
      .catch((err) => {
        alert("Failed to load images")
        console.log("Error: " + err)
      });
  }, [images]);




  return (
    <>
      <Row md={8}>
        <Col>
          <h1>Gallery</h1>
          <hr />
          <h2>Upload an Image</h2>
          <UploadForm token={token} />
          <br />
          <Row md={8}>
            {images.map((image) => {
              return <Col key={image.ETag} className='mb-4 d-flex justify-content-center'>
                <a
                  onClick={async (event) => {
                    event.preventDefault();
                    const resizedImageUrl = `https://a2-image-bucket.s3.us-west-1.amazonaws.com/${image.Key}`
                    const originalImageUrl = resizedImageUrl.replace("resized-images/", "original-images/");
                    const image_window = window.open("", "_blank")
                    image_window.document.write(`
                    <html>
                      <head>
                      </head>
                      <body>
                        <img src="${originalImageUrl}" alt="Original">
                      </body>
                    </html>
                  `);
                  }}
                >
                  <Image
                    src={`https://a2-image-bucket.s3.us-west-1.amazonaws.com/${image.Key}`}
                  />
                </a>
              </Col>
            })}
          </Row>
        </Col>
      </Row>
    </>
  )
}