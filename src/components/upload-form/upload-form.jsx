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
    formData.append('file', file);
    formData.append('fileName', file.name);
    const response = await fetch("http://ec2-54-219-122-97.us-west-1.compute.amazonaws.com/images", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        console.log(res.data);
      });
    if (response.ok) {
      alert("File uploaded successfully!");
      setFile("");
      inputRef.current.value = null;
    }
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