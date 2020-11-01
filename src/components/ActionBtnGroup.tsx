import {Button, Col, Row} from 'antd'
import React from 'react'
import {DatePickerComponent} from './DatePicker'

interface IProps {
  btnDisplay: Function
  addFavorite: Function
  isFavoriteDisabled: Function
  onChangeDate: Function
  date: string
}

export const ActionBtnGroup = ({
  btnDisplay,
  addFavorite,
  isFavoriteDisabled,
  date,
  onChangeDate,
}: IProps) => {
  return (
    <Row align="stretch">
      <Col xs={{span: 24}} md={{span: 8}}>
        <Button onClick={() => addFavorite()} disabled={isFavoriteDisabled()}>
          {btnDisplay()}
        </Button>
      </Col>
      <Col xs={{span: 24}} md={{span: 8, offset: 8}}>
        <DatePickerComponent date={date} onChangeProps={onChangeDate} />
      </Col>
    </Row>
  )
}
