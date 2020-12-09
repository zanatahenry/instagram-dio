import React from 'react'
import { Image } from 'react-native'

import Logo from '../../assets/logo.png'

import { Container } from './style'

export default function Header(){
  return(
    <Container>
      <Image source={Logo} />
    </Container>
  )
}