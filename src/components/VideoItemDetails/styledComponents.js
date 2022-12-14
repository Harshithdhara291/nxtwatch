import styled from 'styled-components'
import {FaMoon, FaSun, FaSearch} from 'react-icons/fa'

export const FMoon = styled(FaMoon)`
  height: 40px;
  width: 40px;
`

export const Para = styled.p`
  font-size: 8px;
  color: grey;
  text-decoration: none;
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

export const Navcontainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`
export const LogoImg = styled.img`
  width: 280px;
  height: 50px;
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
  max-width: 300px;
  padding: 15px;
`

export const Contact = styled.div`
  max-width: 300px;
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

export const SearchImage = styled.img`
  height: 500px;
  width: 500px;
  margin: 5px;
`

export const ListItem = styled.li`
  list-style-type: none;
  text-decoration: none;
  color: black;
  margin: 10px;
`

export const BtnCont = styled.button`
  border: 0px;
  background-color: transparent;
  color: ${props => props.color};
  margin: 5px;
`

export const SaveBtn = styled.button`
  border: 0px;
  background-color: transparent;
  color: ${props => props.color};
  margin: 5px;
`
