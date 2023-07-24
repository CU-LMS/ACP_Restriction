import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { FALLBACK_URL, publicRequest,PRODUCTION_FALLBACK_URL } from '../../requestMethods'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 13vw;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    background-color: #f3e1e1;
  }
  height: 32vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(0.96)
  } 
`
const Image = styled.img`
  width: 50%;
  height: 50%;  
  border-radius: 5px 5px 0 0;
`
const InnerContainer = styled.div`
  padding: 2px 16px;
  /* width: 100%;  */
  /* word-wrap: 'break-word';
  word-break: 'break-word';
  white-space: 'pre-wrap' */
  overflow: 'hidden';
`
const Para = styled.p`
  font-size: 12px;
  text-overflow: 'hidden';
`
const assetUrl = `${PRODUCTION_FALLBACK_URL}/upload`
const getFallbackUrl = (mimetype)=>{
  let url=''
  switch (mimetype) {
    case "image/jpeg":
        url = "jpeg_ref.png"
      break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        url = "doc_ref.png"
      break;
      case "video/mp4":
        url = "mp4_ref.png"
      break;
      case "image/png":
        url = "png_ref.png"
      break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        url = "ppt_ref.png"
      break;
      case "application/pdf":
        url = "pdf_ref.png"
      break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        url = "xls_ref.png"
    default:
      break;
  }
  return url
}
const Card = ({fileInfo}) => {
  const url = getFallbackUrl(fileInfo.mimetype)
  const navigate = useNavigate()
  const handleCardClick = ()=>{
    navigate("/view",{state: fileInfo})
  }
  return (
    <Container onClick={()=>handleCardClick()}>
      <Image src={`${assetUrl}/fallback/${url}`} alt='Avatar' crossOrigin=''/>
      <InnerContainer>
      <Para>{fileInfo?.originalname}</Para>
      </InnerContainer>
    </Container>
  )
}

export default Card