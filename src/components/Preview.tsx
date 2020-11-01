import React from 'react'

interface IProps {
  url?: string
  previewType: string
  preview: any
}
export const Preview = ({url, previewType, preview}: IProps) => {
  // const [previewData] = React.useState(() => {
  //   let localData = localStorage.getItem(previewType)
  //   if (localData !== null) {
  //     return JSON.parse(localData)
  //   }
  //   return null
  // })

  if (!preview[previewType]) {
    return (
      <div key={null}>
        <img src={''} width="100" height="100" alt={'Error data'} />
      </div>
    )
  }

  if (preview[previewType].media_type === 'video') {
    return (
      <div key={preview[previewType].date}>
        <iframe
          width="100"
          height="100"
          title={preview[previewType].title}
          src={preview[previewType].url}
        ></iframe>
      </div>
    )
  }
  return (
    <div key={preview[previewType].date}>
      <img
        src={preview[previewType].url}
        width="100"
        height="100"
        alt={`${preview[previewType].date} - ${preview[previewType].title}`}
      />
    </div>
  )
}
