import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddButton = ({openAdd}) => {
  return (
    <>
      <button className="btn rounded-1 btn-sm btn-secondary mb-3 mx-2" onClick={openAdd}>Add New <FontAwesomeIcon icon={faPlus} /></button>
    </>
  )
}

export default AddButton
    