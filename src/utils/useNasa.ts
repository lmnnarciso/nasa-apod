import React from 'react'
import {addDate} from './addDate'
import {fetchApod} from './fetchApod'
import {NasaAPOD} from '../types/nasaApod'
import {message} from 'antd'
export const useNasa = () => {
  let [nasa, setNasa] = React.useState<NasaAPOD>({
    copyright: 'Dennis Simmons',
    date: '2020-10-30',
    explanation:
      "On Halloween fear and dread will stalk your night skies, also known as Phobos and Deimos the moons of Mars. The 2020 opposition of Mars was on October 13, so the Red Planet will still rise shortly after sunset. Near Halloween's Full Moon on the sky, its strange yellowish glow will outshine other stars throughout the night. But the two tiny Martian moons are very faint and in close orbits, making them hard to spot, even with a small telescope. You can find them in this carefully annotated composite view though. The overexposed planet's glare is reduced and orbital paths for inner moon Phobos and outer moon Deimos are overlayed on digitally combined images captured on October 6. The diminutive moons of Mars were discovered in August of 1877 by astronomer Asaph Hall at the US Naval Observatory using the Great Equatorial 26-inch Alvan Clark refractor",
    hdurl:
      'https://apod.nasa.gov/apod/image/2010/PhobosDeimosOrbitTimesAnnotatedcopy.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Fear and Dread: The Moons of Mars',
    url:
      'https://apod.nasa.gov/apod/image/2010/PhobosDeimosOrbitTimesAnnotatedcopy.jpg',
  })
  let [date, setDate] = React.useState(() => new Date().toISOString())
  let [currentDate, setCurrentDate] = React.useState(true)
  let [status, setStatus] = React.useState('')

  let [preview, setPreview] = React.useState({
    nextPreview: currentDate ? null : '',
    previousPreview: null,
    loading: null,
  })
  let nextDay = () => {
    message.destroy()
    let dt = addDate(new Date(date), 1, 'days')
    if (dt === undefined) {
      return
    }
    if (dt >= new Date()) {
      return
    }
    setDate(dt.toString())
  }

  let onChangeDate = (dateString: string) => {
    message.destroy()
    setDate(dateString)
  }

  let previousDay = () => {
    message.destroy()
    let newDate = addDate(new Date(date), -1, 'days')

    if (newDate === undefined) {
      return
    }
    setDate(newDate.toString())
  }

  let fetchPreview = React.useCallback((previewVal: string) => {
    if (previewVal === 'next') {
      let dt = addDate(new Date(date), 1, 'days')
      console.log("next", dt)
      fetchApod(dt?.toString())
        .then(async res => {
          let data = await res.json()
          localStorage.removeItem("nextPreview")
          localStorage.setItem("nextPreview", JSON.stringify(data))
          setPreview({
            ...preview,
            nextPreview: data
          })
        })
        .catch(err => {
          // message.error('Error fetching APOD Preview')

          console.error("Error:", err)
          // throw new Error(err)
        })
    } else {
      let dt = addDate(new Date(date), -1, 'days')
      console.log("previous", dt)
      fetchApod(dt?.toString())
        .then(async res => {
          let data = await res.json()
          localStorage.removeItem("previousPreview")
          localStorage.setItem("previousPreview", JSON.stringify(data))
          setPreview({
            ...preview,
            previousPreview: data
          })
        })
        .catch(err => {
          // message.error('Error fetching APOD Data Preview')

          console.error("Error:", err)
          // throw new Error(err)
        })

    }
    //ignore
  }, [date])

  React.useEffect(() => {
    setStatus('loading')
    fetchApod(date)
      .then(async res => {
        let data = await res.json()
        if(data.code === 400){
          message.error(`${data.msg}`)
          setStatus('error')
        }
        else if((data.url === null || data.url === undefined) && data.code !== 400){
          message.error("Error! No image found.")
          setStatus('error')
        }
        else {
          message.success('Success')
          setStatus('success')
        }
        setNasa(data)
      })
      .catch(err => {
        message.error('Error fetching APOD Data')
        setNasa({
          ...nasa,
          url: 'error',
        })
        console.error("Error:", err)
        setStatus('error')
        // throw new Error(err)
      })

    return () => {
      setStatus('')
      setNasa({
        ...nasa,
        url: 'error',
      })
    }

  }, [date])

  React.useEffect(() => {
    let dt = addDate(new Date(date), 1, 'days')
    if (dt === undefined) {
      setCurrentDate(false)
      return
    }

    if (dt >= new Date()) {
      setCurrentDate(true)
    } else {
      setCurrentDate(false)
    }
  }, [date,])

  React.useEffect(() => {
    let dt = addDate(new Date(date), 1, 'days')

    if (dt === undefined) {
      setCurrentDate(false)
      fetchPreview("next")
      fetchPreview("previous")
      return
    }

    if (dt >= new Date()) {
      localStorage.removeItem("nextPreview")
      setCurrentDate(true)
      fetchPreview("previous")
    } else {
      setCurrentDate(false)
      fetchPreview("next")
      fetchPreview("previous")
    }

  }, [date,])

  return {
    data: nasa,
    previousDay,
    nextDay,
    date,
    currentDate,
    onChangeDate,
    status,
    preview
  }
}
