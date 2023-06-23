import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { styled } from 'styled-components'
import axios from 'axios'
import Card from '../components/Card'
import { publicRequest } from '../../requestMethods'
const Container = styled.div`
    display: flex;
    margin: 20px;
    /* justify-content: flex-start; */
    /* align-self: center; */
    flex-wrap: wrap;
`
const Home = () => {
    const [fileList,setFileList] = useState([])
    const getFiles= async()=>{
        try {
            const res  = await publicRequest.get("/files")
            console.log(res.data?.files?.data)
            setFileList(res.data.files.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getFiles()
    },[])

    return (
        <Container>
            {fileList.map((item)=>{
               return <Card key={item?.etag} fileInfo={item}/>
            })}
        </Container>
    )
}

export default Home