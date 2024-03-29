import React, { useState, FC, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { postApt, updateApt } from '../../utils/ApiCalls'
import { useMutation, useQueryClient } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AptType, AptFormErrors } from 'utils/types'


// Define props
interface AptFormProps {
  aptForm?: AptType,
  formId: string,
  forNewApt?: boolean
}


const AptForm: FC<AptFormProps> = ({ formId, aptForm, forNewApt = true }: AptFormProps) => {

  const { t } = useTranslation('apts')

  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    title: (aptForm?.title || ''),
    price: (aptForm?.price || 0),
    short_description: (aptForm?.short_description || ''),
    sq_mt: (aptForm?.sq_mt || 0),
    rooms: (aptForm?.rooms || 0),
    floor: (aptForm?.floor || 0),
    lat: (aptForm?.lat || 0),
    long: (aptForm?.long || 0),
  })


  const queryClient = useQueryClient()

  const postAptMutation = useMutation(postApt, {
    onSuccess: (data) => {
      const newApt = data;
      queryClient.invalidateQueries('apts')
      queryClient.setQueryData(['apts', newApt._id], newApt)
    }
  })

  const putAptMutation = useMutation(updateApt, {
    onSuccess: (data) => {
      const updatedApt = data;
      queryClient.invalidateQueries('apts')
      queryClient.setQueryData(['apts', updatedApt._id], updatedApt)
    }
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: AptType) => {
    let id: string;
    if (router.query.id) {
      if (typeof router.query.id === 'string') {
        id = router.query.id
      } else {
        id = router.query.id[0]
      }

      try {
        if (form.floor) {
          putAptMutation.mutate({ form, id })
        } else {
          const noFloorForm = form;
          delete noFloorForm.floor;
          putAptMutation.mutate({ form: noFloorForm, id })

        }


        // Throw error with status code in case Fetch API req failed
        if (putAptMutation.isError) {
          console.log('some error')
          if (putAptMutation.error instanceof Error) {
            throw new Error(putAptMutation.error.message)
          }
        }

        console.log('about to reroute')

        router.push('/')
      } catch (error) {
        setMessage('Failed to update apt')
      }
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: AptType) => {
    try {

      postAptMutation.mutate(form)


      // Throw error with status code in case Fetch API req failed
      if (postAptMutation.isError) {
        if (postAptMutation.error instanceof Error) {
          throw new Error(postAptMutation.error.message)
        }
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add apt')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: AptFormErrors = {};
    if (!form.title) err.title = 'title is missing'
    if (!form.price) err.price = 'price is missing'
    if (!form.short_description) err.short_description = 'description is missing'
    if (!form.sq_mt) err.sq_mt = 'area is missing'
    if (!form.rooms) err.rooms = 'rooms is missing'
    if (aptForm?.floor && !form.floor) err.floor = 'floor is missing'
    if (!form.lat) err.lat = 'latitude is missing'
    if (!form.long) err.long = 'longitude is missing'
    return err
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewApt ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('title')}</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength={40}
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('price')}</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            maxLength={10}
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="short_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('short description')}</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength={50}
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-between gap-4'>
          <div className="mb-6 w-full ">
            <label htmlFor="sq_mt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('area')}</label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              type="number"
              name="sq_mt"
              value={form.sq_mt}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="rooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('rooms')}</label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              type="number"
              name="rooms"
              value={form.rooms}
              onChange={handleChange}
            />
          </div>
          {(form.floor || forNewApt) && <div className="mb-6 w-full">
            <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('floor')}</label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="floor"
              type="number"
              value={form.floor}
              onChange={handleChange}
            />
          </div>}
        </div>
        <div className='flex justify-between gap-4'>
        <div className="mb-6 w-full">
          <label htmlFor="lat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('latitude')}</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="lat"
            type="number"
            value={form.lat}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6 w-full">
          <label htmlFor="long" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('longitude')}</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="long"
            type="number"
            value={form.long}
            onChange={handleChange}
          />
        </div>
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          {t('submit')}
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default AptForm
