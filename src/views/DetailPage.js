import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import useFetchOne from '../hooks/useFetchOne'

import './DetailPage.css'

import Spinner from '../components/Spinner'
import { requestDetail } from '../store/actions'

export default function DetailPage(props) {
  const dispatch = useDispatch()
  const { id } = useParams()

  let history = useHistory()

  // let { detail, isLoading } = useFetchOne(id)

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    dispatch(requestDetail('anime', id))
  }, [])

  const detail = useSelector((state) => state.anime.fetchedDetail)
  const isLoading = useSelector((state) => state.loading.isLoading)

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    )
  } else {
    return (
      <>
        {detail.trailer_url ? (
          <div className='mt-5'>
            <iframe
              title={detail.title}
              frameBorder='0'
              className='trailer'
              src={detail.trailer_url}
            />
          </div>
        ) : (
          ''
        )}

        <div className='container my-5'>
          <button className='btn btn-info mb-3' onClick={goBack}>
            back
          </button>
          <div className='card d-flex flex-row'>
            <img
              src={detail.image_url}
              className='synopsis-img m-3'
              alt={detail.title}
            />
            <div className='my-3 mr-3'>
              <p className='h3'>{detail.title}</p>
              <p>{detail.synopsis}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}
