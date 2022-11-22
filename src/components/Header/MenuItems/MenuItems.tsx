import React from 'react'
import './MenuItems.styles.scss'

type MenuItemsProps = {}

const MenuItems: React.FC<MenuItemsProps> = (_props) => {
  return (
    <ul className="menu-items-list" data-testid='header-menu-items' >
      <li className='menu-items__item' data-active={ "true" }>
        Просмотр
      </li>
      <li className='menu-items__item'>
        Управление
      </li>
    </ul>
  )
}

export { MenuItems }
