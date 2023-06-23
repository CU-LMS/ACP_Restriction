import React, { useContext } from 'react'
import styled from 'styled-components'
import CuLogo from '../assets/cu-logo.png'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
const Container = styled.div`
    width: 100%;
    height: 80px;
    /* background-color: yellow; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-right: 20px;
`
const Button = styled.button`
    padding: 7px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 14px;
    background-color: #e22c2c;
    cursor:  ${props => props.disabled? "not-allowed": "pointer"};
    margin-left: 10px;
`
const Logo = styled.img`
    width: 200px;
    height: 60px;
    margin: 10px;
    margin-left: 20px;
`
const Navbar = () => {
    const {user,loading,dispatch} = useContext(AuthContext);
    const handleLogout=()=>{
        dispatch({type: "LOGOUT"})
      }
    return (
        <Container>
            <Logo src={CuLogo} />
            <InnerContainer>
                <Button>
                    <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                        Home
                    </Link>
                </Button>
              { user && <Button>
                    <Link to="/upload" style={{ textDecoration: "none", color: 'inherit'}}>
                        Upload
                    </Link>
                </Button>}
                <Button disabled={loading} onClick={user?handleLogout:<Navigate to="/login"/>}>
                    <Link to="/login" style={{ textDecoration: "none", color: 'inherit'}}>
                    {user?"Logout":"Login"}
                    </Link>
                    
                </Button>
            </InnerContainer>
        </Container>
    )
}

export default Navbar