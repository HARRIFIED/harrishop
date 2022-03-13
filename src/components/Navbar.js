import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';


const Container = styled.div`
    height: 60px;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: white !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    ${mobile({ height: "50px" })}
    
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    padding: 6px; 
    outline: none;
    ${mobile({ width: "50px" })}
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuListing = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}

`

const Navbar = () => {
    return (
        <Container>
           <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <FontAwesomeIcon icon = "search" style={{
                            margin: "10px",
                            color: "gray",
                            fontSize: "16px",
                        }} />
                    </SearchContainer>
                </Left>
                <Center><Logo>Shop@Harris.</Logo></Center>
                <Right>
                    <Link to = "/login"><MenuListing>SIGN IN</MenuListing></Link>
                    <Link to="/register"><MenuListing>REGISTER</MenuListing></Link>
                    <MenuListing>
                         <Badge badgeContent={4} color="primary">
                            <Link to = "/cart">
                                <ShoppingCartOutlined/>
                            </Link>
                        </Badge>
                    </MenuListing>
                </Right>
           </Wrapper>
        </Container>
    )
}

export default Navbar
