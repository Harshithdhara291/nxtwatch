import styled from 'styled-components'
import {FaMoon, FaSun} from 'react-icons/fa'

export const FMoon = styled(FaMoon)`
  height: 40px;
  width: 40px;
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
  background-color: ${props => (props.color ? '#0f0f0f' : '#f9f9f9')};
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
