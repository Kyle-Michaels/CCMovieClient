import { useRef, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

export const UploadForm = ({ token }) => {
  const [file, setFile] = useState("");
  const inputRef = useRef(null);

  const handleChange = async (event) => {
    event.preventDefault()
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch("http://a2-alb-1528498025.us-west-1.elb.amazonaws.com/images", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("File uploaded successfully!");
          setFile("");
          inputRef.current.value = null;
        }
      })
      .catch((err) => {
        alert('Error: ' + err)
      })
  }

  return (
    <Col>
      <Form onSubmit={handleSubmit}>
        <input
          name='image'
          type='file'
          onChange={handleChange}
          ref={inputRef}
        />
        <Button type='submit'>Upload</Button>
      </Form>
    </Col>
  )
}