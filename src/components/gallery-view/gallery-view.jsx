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
            Etag: image.ETag
          }
        });
        setImages(imagesFromApi)
      });
  }, []);
  console.log(images);


  const Key = 'resized-images/test.jpg'
  const ETag = 'b01471573889bf9c85b699aa1f28bb42'



  return (
    <>
      <Row md={8}>
        <Col>
          <h1>Gallery</h1>
          <hr />
          <h2>Upload an Image</h2>
          <UploadForm token={token} />
          <Col>
            <a
              onClick={async (event) => {
                event.preventDefault();
                const response =
                  await fetch(`http://ec2-54-219-122-97.us-west-1.compute.amazonaws.com/images/${Key}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                const file = window.URL.createObjectURL(response);
                window.open(file, "_blank");
              }}
              key={ETag}
            >
              <Image
                src={`https://a2-image-bucket.s3.us-west-1.amazonaws.com/${Key}`}
              />
            </a>
          </Col>
        </Col>
      </Row>
    </>
  )
}