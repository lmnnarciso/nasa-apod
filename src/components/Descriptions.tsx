import React, {ReactChild} from 'react'

interface IProps {
  content: string
  children?: ReactChild
}
export const Description = ({children}: IProps) => {
  return <div>{children}</div>
}
