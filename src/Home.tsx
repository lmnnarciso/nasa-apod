import React, {useEffect} from 'react'
import {Row, Col, Button, Spin, Popover, message, Space} from 'antd'

import {useNasa} from './utils/useNasa'
import {ImageDisplay} from './components/ImageDisplay'
import useLocalStorageState from './utils/useLocalStorageState'
import {NasaAPOD} from './types/nasaApod'
import {Preview} from './components/Preview'
import {ActionBtnGroup} from './components/ActionBtnGroup'
import './App.css'

const Home = () => {
  let [favorites, setFavorites] = useLocalStorageState('favorites', () => {
    let localFavorites = localStorage.getItem('favorites')

    if (localFavorites !== null) {
      return JSON.parse(localStorage.getItem('favorites') || '[]')
    }

    return []
  })
  // let [cache, setCache] = useLocalStorageState('cache', () => {})
  const {
    data: nasa,
    previousDay,
    nextDay,
    currentDate,
    date,
    onChangeDate,
    status,
    preview,
  } = useNasa()

  useEffect(() => {
    if (nasa.url === null || nasa.url === undefined) {
      message.error('Nasa APOD request dont contain an image URL')
    }
  }, [nasa])
  let addFavorite = () => {
    if (
      favorites.filter((favorite: NasaAPOD) => favorite.date === nasa.date)
        .length === 0
    ) {
      setFavorites([...favorites, nasa])
    }
  }
  let isFavoriteDisabled = () => {
    return (
      favorites.filter((favorite: NasaAPOD) => favorite.date === nasa.date)
        .length !== 0
    )
  }

  let btnDisplay = () => {
    if (
      favorites.filter((favorite: NasaAPOD) => favorite.date === nasa.date)
        .length !== 0
    ) {
      return 'Already added as favorite'
    } else if (
      favorites.filter((favorite: NasaAPOD) => favorite.date === nasa.date)
        .length === 0
    ) {
      return 'Add to favorites'
    }
  }
  return (
    <Row
      align="middle"
      justify="center"
      style={{minHeight: 'calc(100vh-64px)', margin: 'auto'}}
    >
      <Col xs={{span: 12, order: 1}}>
        <Popover
          content={() => (
            <Preview preview={preview} previewType={'previousPreview'} />
          )}
          placement="topLeft"
        >
          <Button
            className="btn full-width"
            size="large"
            onClick={e => {
              previousDay()
            }}
          >
            Previous
          </Button>
        </Popover>
      </Col>
      <Col xs={{span: 24, order: 0}}>
        {status === 'loading' && (
          <Spin tip="Loading...">
            <ImageDisplay
              urlString={nasa.url}
              title={nasa.title}
              explanation={nasa.explanation}
              date={nasa.date}
              mediaType={nasa.media_type}
            />
          </Spin>
        )}
        {status === 'success' && nasa.media_type === 'image' && (
          <ImageDisplay
            urlString={nasa.url}
            title={nasa.title}
            explanation={nasa.explanation}
            date={nasa.date}
            mediaType={nasa.media_type}
          >
            <>
              <Space size="large" direction="vertical" />
              <ActionBtnGroup
                addFavorite={addFavorite}
                date={date}
                onChangeDate={onChangeDate}
                isFavoriteDisabled={isFavoriteDisabled}
                btnDisplay={btnDisplay}
              />
            </>
          </ImageDisplay>
        )}
        {status === 'success' && nasa.media_type === 'video' && (
          <ImageDisplay
            urlString={nasa.url}
            title={nasa.title}
            explanation={nasa.explanation}
            date={nasa.date}
            mediaType={nasa.media_type}
          >
            <ActionBtnGroup
              addFavorite={addFavorite}
              date={date}
              onChangeDate={onChangeDate}
              isFavoriteDisabled={isFavoriteDisabled}
              btnDisplay={btnDisplay}
            />
          </ImageDisplay>
        )}
        {status === 'error' && nasa?.code === 400 && (
          <ImageDisplay
            urlString={'error'}
            title={'No data fetch due to API requests failed'}
            explanation={'Error'}
            date={nasa.date}
            mediaType={nasa.media_type}
          >
            <ActionBtnGroup
              addFavorite={addFavorite}
              date={date}
              onChangeDate={onChangeDate}
              isFavoriteDisabled={isFavoriteDisabled}
              btnDisplay={btnDisplay}
            />
          </ImageDisplay>
        )}
      </Col>
      <Col xs={{span: 12, order: 2}}>
        <Popover
          content={() => (
            <Preview preview={preview} previewType={'nextPreview'} />
          )}
          placement="topLeft"
        >
          <Button
            className="btn full-width"
            style={{width: '100%'}}
            size="large"
            disabled={currentDate}
            onClick={e => {
              nextDay()
            }}
          >
            Next
          </Button>
        </Popover>
      </Col>
    </Row>
  )
}

export default Home
