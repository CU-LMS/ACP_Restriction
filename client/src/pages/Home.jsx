import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { styled } from 'styled-components'
import axios from 'axios'
import Card from '../components/Card'
import { publicRequest, userRequest } from '../../requestMethods'
import { LoadingOutlined } from '@ant-design/icons'
const Container = styled.div`
    display: flex;
    margin: 20px;
    /* justify-content: flex-start; */
    /* align-self: center; */
    flex-wrap: wrap;
`
const Home = () => {
    const [fileList,setFileList] = useState([])
    const [loading,setLoading] = useState(false)
    const getFiles= async()=>{
        setLoading(true)
        try {
            const res  = await publicRequest.get("/files")
            console.log(res.data?.files?.data)
            setFileList(res.data.files.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getFiles()
    },[])
    const handleDelete = async(fileInfo)=>{
        try {
          const res = await userRequest.post("/files/aws/delete", {bucket: fileInfo?.bucket, key: fileInfo?.key})
          console.log(res.data)
          getFiles()
        } catch (error) {
          console.log(error.message)
        }
      }
    return (
         <Container>
            {loading && <LoadingOutlined spin style={{fontSize: '70px', margin: 'auto auto'}}/>}
            {!loading && fileList.map((item)=>{
               return <Card key={item?.etag} fileInfo={item} handleDelete={handleDelete}/>
            })}
        </Container>
    )
}

export default Home