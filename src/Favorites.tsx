import React from 'react'
import useLocalStorageState from './utils/useLocalStorageState'
import {Row, Col, Button, Space, Typography} from 'antd'
import {FavoriteCard} from './components/FavoriteCard'

const {Text} = Typography
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
interface GenericObject {
  [key: string]: any
}

export const Favorites = () => {
  let [favorites, setFavorites] = useLocalStorageState(
    'favorites',
    () => localStorage.getItem('favorites') || [],
  )
  let [selectedFavorites, setSelectedFavorites] = React.useState<GenericObject>(
    {},
  )

  let selectCard = (date: any, data: favorite) => {
    if (selectedFavorites[date] === undefined) {
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

    let newFavorite = Object.keys(selectedFavorites).reduce((obj, key) => {
      if (selectedFavoritesKeys.includes(key)) {
        return {
          ...obj,
        }
      }

      return {
        ...obj,
        [key]: selectedFavorites[key],
      }
    }, {})
    setSelectedFavorites(newFavorite)
  }

  let removeAll = () => {
    setFavorites([])
    setSelectedFavorites({})
  }
  return (
    <>
      <Row justify="start" style={{marginTop: '.5rem', marginBottom: '.5rem'}}>
        <Button
          size="large"
          type="primary"
          disabled={favorites.length === 0}
          onClick={() => {
            removeAll()
          }}
          style={{marginRight: '1rem'}}
        >
          Remove all
        </Button>
        <Space size="middle" />
        {Object.keys(selectedFavorites).length > 0 && (
          <Button
            size="large"
            type="primary"
            onClick={() => {
              removeSelectedFavorites()
            }}
          >
            Remove all selected favorites
          </Button>
        )}
      </Row>
      <Row justify="start" style={{marginTop: '.5rem', marginBottom: '.5rem'}}>
        {Object.keys(selectedFavorites).length > 0 && (
          <Text type="danger">
            Selected favorites: {Object.keys(selectedFavorites).length}
          </Text>
        )}
      </Row>
      <Row gutter={[16, 16]} justify="center">
        {favorites.map((favorite: favorite) => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <FavoriteCard
                favorite={favorite}
                isSelected={isSelected}
                selectCard={selectCard}
                removeFavorite={removeFavorite}
              />
            </Col>
          )
        })}
      </Row>
    </>
  )
}
