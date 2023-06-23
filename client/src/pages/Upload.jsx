import React, { useState } from 'react'
import axios from 'axios'
import { styled } from 'styled-components'
import Sucess from '../utils/Sucess'
import { Spin, message } from 'antd'
import { userRequest } from '../../requestMethods'

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
    justify-content: center;

`
const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const Label = styled.label`
   cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  background-color: #4245a8;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);  
`
const SVG = styled.svg`
  height: 16px;
  margin-right: 4px;
`
const Button = styled.button`
  border:none;
  margin-top: 12px;
  background-color: ${props=>props.show != null? '#e22c2c': "grey"};
  padding: 7px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 14px;
    cursor: ${props => props.show != null? "pointer": "not-allowed"};

`

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [messageApi, contextHolder] = message.useMessage();
  const [uploading,setUploading] = useState(false)
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    const formData = new FormData()
    formData.append("upload", selectedFile)
    try {
      // const res = await axios.post("/files/upload/aws", formData)
      const res = await userRequest.post("/files/upload/aws", formData)
      if(res.data){
        setUploading(false)
        setSelectedFile(null)
        
        success()
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const success = () => {
    messageApi.open({
        content: <Sucess/>,
        style: {
            marginTop: "5vh",
        },
        duration: 2,
    });
};
  return (
    <Spin spinning={uploading} tip="uploading..." size='large'>
    <Container>
      {contextHolder}
      <Form>
        <Input type='file' onChange={handleFileChange} id='file-input' />
        <Label for="file-input">
          <SVG
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="upload"
            class="svg-inline--fa fa-upload fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
            ></path>
          </SVG>
          <span>Choose File</span></Label>
        <Button onClick={handleFormSubmit} show={selectedFile}>Upload</Button>
      </Form>
    </Container>
    </Spin>
  )
}

export default Upload