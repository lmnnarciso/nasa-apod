import React from 'react'
import {Card} from 'antd'
import {CheckCircleTwoTone} from '@ant-design/icons'

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
  isSelected: Function
}
export const FavoriteCard = ({selectCard, favorite, isSelected}: IProps) => {
  return (
    <Card
      className={`selectable-card`}
      style={{minHeight: '100%'}}
      onClick={e => {
        selectCard(favorite.date, favorite)
      }}
      title={
        <>
          {isSelected(favorite.date) && (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          )}
          {favorite.title}
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
