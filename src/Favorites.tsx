import React from 'react'
import useLocalStorageState from './utils/useLocalStorageState'
import {Row, Col} from 'antd'
import {FavoriteCard} from './components/FavoriteCard'
interface favorite {
  date: string
  explanation: string
  media_type: 'image' | 'video'
  service_version: string
  title: string
  url: string
  hdurl?: string
  copyright?: string
}

export const Favorites = () => {
  let [favorites] = useLocalStorageState(
    'favorites',
    () => localStorage.getItem('favorites') || [],
  )
  let [selectedFavorites, setSelectedFavorites] = React.useState({})

  let selectCard = (date: any, data: favorite) => {
    if (
      Object.keys(selectedFavorites).filter(item => item === date).length === 0
    ) {
      setSelectedFavorites({
        ...selectedFavorites,
        [date]: data,
      })
    } else {
      let newFavorite = Object.keys(selectedFavorites).reduce((obj, key) => {
        if (key === date) {
          return {
            ...obj,
          }
        }

        return {
          ...obj,
          [key]: data,
        }
      }, {})
      setSelectedFavorites(newFavorite)
    }
  }

  let isSelected = (date: string) => {
    if (
      Object.keys(selectedFavorites).filter(item => item === date).length > 0
    ) {
      return true
    }
    return false
  }
  return (
    <Row gutter={[16, 16]} justify="center">
      {favorites.map((favorite: favorite) => {
        return (
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <FavoriteCard
              favorite={favorite}
              isSelected={isSelected}
              selectCard={selectCard}
            />
          </Col>
        )
      })}
    </Row>
  )
}
