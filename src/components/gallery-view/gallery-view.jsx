import { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UploadForm } from '../upload-form/upload-form';

export const GalleryView = () => {
  const { token } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);


  useEffect(() => {
    fetch("http://ec2-54-219-122-97.us-west-1.compute.amazonaws.com/images", {
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
        ////////////////// filter out folder
        setImages(imagesFromApi)
      });
  }, []);
  console.log(images);




  return (
    <>
      <Row md={8}>
        <Col>
          <h1>Gallery</h1>
          <hr />
          <h2>Upload an Image</h2>
          <UploadForm token={token} />
          {images.map((image) => {
            return <Col>
              <a
                onClick={async (event) => {
                  event.preventDefault();
                  const resizedImageUrl = `https://a2-image-bucket.s3.us-west-1.amazonaws.com/${image.Key}`
                  const originalImageUrl = resizedImageUrl.replace("resized-images/", "");
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
                key={image.ETag}
              >
                <Image
                  src={`https://a2-image-bucket.s3.us-west-1.amazonaws.com/${image.Key}`}
                />
              </a>
            </Col>
          })}
        </Col>
      </Row>
    </>
  )
}