import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import useHasFocus from '../hooks/useHasFocus'
import { Spin } from 'antd'
import { BASE_URL, FALLBACK_URL } from '../../requestMethods'

const getAssetUrlNew = (mimetype, url) => {
  let appendUrl = ''
  switch (mimetype) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      appendUrl = `https://docs.google.com/viewer?url=${url}&embedded=true`
      break;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      appendUrl = `https://docs.google.com/viewer?url=${url}&embedded=true`
      break;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      appendUrl = `https://docs.google.com/viewer?url=${url}&embedded=true`
      break;
    case "application/pdf":
      appendUrl = `https://docs.google.com/viewer?url=${url}&embedded=true`
      break;
    default:
      appendUrl = url
      break;
  }
  return appendUrl
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  width: 55%;
  height: 85vh;
  /* display: relative; */
  &:focus {
        filter: ${props => props.isfocus ? "blur(14px)" : "blur(0)"};
     }
     filter: ${props => props.isfocus ? "blur(14px)" : "blur(0)"};
`
const Frame = styled.iframe`
    width: 100%;
    height: 100%;
`
const Video = styled.video`
  width: 100%;
  height: 100%;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
`
const Blocker = styled.img`
  width: 60px;
  height: 80px;
  /* background-color: black; */
  position: absolute;
  margin-left: calc(100% - 70px);
  margin-top: 10px;
`

const View = () => {
  const [srcForIframe, setSrcForIframe] = useState({})
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [frameRefCurrent, setFrameRefCurrent] = useState(null)
  const fileInfo = useLocation().state
  let iframeRef = useRef(null)
  const focus = useHasFocus()

  const handleLoadcompleteIframe = () => {
    setLoading(false)
    const frame = iframeRef.current
    setFrameRefCurrent(iframeRef.current)
  }
  const handleLoadYetAnother = ()=>{
    setLoading(false)
  }
  useEffect(() => {
    setUrl(getAssetUrlNew(fileInfo.mimetype, fileInfo.location))
  }, [])

  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  const handleDragStart = (event) => {
    event.preventDefault(); // Prevent the default dragging behavior
  };

  if (fileInfo.mimetype == 'video/mp4') {
    return (
      <Spin tip="loading..." spinning={loading} size='large'>
        <Container >
          <Wrapper isfocus={!focus} >
            <Video controls controlsList='nodownload nofullscreen' autoPlay onLoadedData={handleLoadYetAnother} >
              <source src={fileInfo.location}  />
            </Video>
          </Wrapper>
        </Container>
      </Spin>
    )
  }
  else if (fileInfo.mimetype == 'image/jpeg' || fileInfo.mimetype == 'image/png' || fileInfo.mimetype == 'image/jpg') {
    return (
      <Spin tip="loading..." spinning={loading} size='large'>
        <Container >
          <Wrapper isfocus={!focus} >
            <Blocker src={`${FALLBACK_URL}/upload/assets/cu-logo-vertical.png`} onDragStart={handleDragStart} crossOrigin=''/>
            <Image src={fileInfo.location} onDragStart={handleDragStart} onLoad={handleLoadYetAnother}/>
          </Wrapper>
        </Container>
      </Spin>
    )
  }else{
    return (
      <Spin tip="loading..." spinning={loading} size='large'>
        <Container >
          <Wrapper isfocus={!focus} >
            <Blocker src={`${FALLBACK_URL}/upload/assets/cu-logo-vertical.png`} onDragStart={handleDragStart} crossOrigin=''/>
            <Frame src={url} id='iframeji' ref={iframeRef} onLoad={handleLoadcompleteIframe} />
          </Wrapper>
        </Container>
      </Spin>
    )
  }
}

export default View