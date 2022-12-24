import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {FaMoon, FaSun} from 'react-icons/fa'

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
export const SearchImage = styled.img`
  height: 500px;
  width: 500px;
  margin: 5px;
`

export const FSun = styled(FaSun)`
  height: 40px;
  width: 40px;
  color: white;
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

export const ContOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 300px;
  padding: 15px;
`

export const ContTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`

export const Images = styled.img`
  height: 50px;
  width: 50px;
  margin: 5px;
`
