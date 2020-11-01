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
  let [favorites, setFavorites] = useLocalStorageState(
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

  let removeFavorite = (date: string) => {
    setFavorites(
      favorites.filter((favorite: favorite) => favorite.date !== date),
    )
  }

  let removeSelectedFavorites = () => {
    let selectedFavoritesKeys = Object.keys(selectedFavorites).map(item => item)

    setFavorites(
      favorites.filter(
        (favorite: favorite) => !selectedFavoritesKeys.includes(favorite.date),
      ),
    )
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
