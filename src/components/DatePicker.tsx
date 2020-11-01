import React from 'react'
import moment from 'moment'
import {DatePicker} from 'antd'

interface IProps {
  onChangeProps?: Function
  date: string
}

export const DatePickerComponent = ({
  onChangeProps = () => {},
  date,
}: IProps) => {
  function onChange(value: any, dateString: any) {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
    onChangeProps(dateString)
  }

  function onOk(value: any) {
    console.log('onOk: ', value)
  }

  function disabledDate(current: any) {
    return current > moment().endOf('day')
  }

  return (
    <DatePicker
      className="full-width"
      onChange={onChange}
      onOk={onOk}
      disabledDate={disabledDate}
      defaultValue={moment(date)}
      value={moment(date)}
      clearIcon={false}
    />
  )
}
