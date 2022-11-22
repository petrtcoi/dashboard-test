import React from 'react'

import { MenuItems } from './MenuItems'
import { SubheaderLeftBlock } from './SubheaderLeftBlock'
import {WorkTitle} from './WorkTitle'

import './Header.styles.scss'


type HeaderProps = {}

const Header: React.FC<HeaderProps> = (_props) => {

  return (
    <header className='navbar'>
      <nav className='header__row' data-testid='header'>
        <div className='header__menu-button icon-menu' />
        <div className='header__back-button icon-back' />
        <MenuItems />
      </nav>

      <div className='subheader__row' data-testid='subheader'>
        <SubheaderLeftBlock />
        <WorkTitle />
      </div>

    </header>
  )

}

export { Header }