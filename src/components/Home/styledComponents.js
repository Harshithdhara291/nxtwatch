import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {FaMoon, FaSun, FaSearch} from 'react-icons/fa'

export const Linked = styled(Link)`
  text-decoration: none;
`
export const Contact = styled.div`
  max-width: 300px;
  padding: 15px;
`
export const ListItem = styled.li`
  list-style-type: none;
  text-decoration: none;
  padding: 13px;
  border-radius: 7px;
  margin: 10px;
`

export const FMoon = styled(FaMoon)`
  height: 40px;
  width: 40px;
`

export const FSun = styled(FaSun)`
  height: 40px;
  width: 40px;
  color: white;
`
export const FSearch = styled(FaSearch)`
  height: 20px;
  width: 20px;
  color: black;
`

export const Navheader = styled.nav`
  display: flex;
  align-items: center;
  padding: 15px;
  max-width: 100vw;
  background-color: ${props => props.color};
`
export const IconBtn = styled.button`
  background-color: transparent;
  border: 0px;
  margin-left: 500px;
`
export const LogoutBtn = styled.button`
  color: white;
  background-color: blue;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 6px;
`

export const Navcontainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`
export const LogoImg = styled.img`
  width: 200px;
  height: 35px;
  margin-right: 200px;
  margin-left: 10px;
`
export const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
`

export const MainCont = styled.div`
  display: flex;
  min-height: 85vh;
  max-width: 100vw;
  background-color: ${props => props.color};
`
export const UnList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
`
export const ContOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20vw;
  padding: 15px;
`
export const ContTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`

export const Images = styled.img`
  height: 50px;
  width: 50px;
  margin: 5px;
`
export const SearchCont = styled.div`
  padding: 30px;
`

export const SearchContTwo = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`

export const SearchImage = styled.img`
  height: 500px;
  width: 500px;
  margin: 5px;
`

export const PopupCont = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 30px;
`
export const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'search',
})`
  background: none;
  border-radius: 0px;
  height: 35px;
  border: 1px solid black;
  box-shadow: 0px;
  width: 400px;
  outline: none;
`
export const SearchBtn = styled.button`
  padding: 5px;
  border: 1px solid black;
  background-color: transparent;
`
export const Head = styled.h1`
  font-size: 15px;
  font-weight: 500;
  color: black;
  background-color: white;
  & hover {
    color: white;
    background-color: grey;
  }
`
