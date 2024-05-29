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
            { console.log(image.Key, image.ETag) }
            <Col>
              {/* <a
                onClick={async (event) => {
                  event.preventDefault();
                  const response =
                    await fetch(`http://ec2-54-219-122-97.us-west-1.compute.amazonaws.com/image?file=${image.Key}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                  const file = window.URL.createObjectURL(response);
                  window.open(file, "_blank");
                }}
                key={image.ETag}
              > */}
              <Image
                src={`https://a2-image-bucket.s3.us-west-1.amazonaws.com/${image.Key}`}
              />
              {/* </a> */}
            </Col>
          })}
        </Col>
      </Row>
    </>
  )
}