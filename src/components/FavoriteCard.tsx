import React from 'react'
import {Card, Col, Row} from 'antd'
import {CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons'

let {Meta} = Card

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

interface IProps {
  selectCard: Function
  favorite: favorite
  removeFavorite: Function
  isSelected: Function
}
export const FavoriteCard = ({
  selectCard,
  favorite,
  isSelected,
  removeFavorite,
}: IProps) => {
  return (
    <Card
      className={`selectable-card`}
      key={favorite.date}
      style={{minHeight: '100%'}}
      onClick={e => {
        selectCard(favorite.date, favorite)
      }}
      title={
        <>
          <Row justify="space-between">
            <Col>
              {isSelected(favorite.date) && (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              )}
              {favorite.title}
            </Col>
          </Row>
        </>
      }
      cover={
        favorite.media_type === 'video' ? (
          <iframe
            width="100%"
            src={favorite.url}
            title={`${favorite.date} - ${favorite.title}`}
          ></iframe>
        ) : (
          <img
            width="100%"
            height={300}
            src={favorite.url}
            alt={`${favorite.date} - ${favorite.title}`}
          />
        )
      }
    >
      <Meta description={favorite.explanation} />
    </Card>
  )
}
