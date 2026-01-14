import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ActionButtons = ({id, openEdit, row, setDeleteId, setShowDeleteModal}) => {
    return (
        <>
            {/* <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' title='Edit'/> */}
            <div className="d-flex gap-2">
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openEdit(row)}
                >
                    Edit
                </button>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                        setDeleteId(id);
                        setShowDeleteModal(true);
                    }}
                >
                    Delete
                </button>
            </div>
        </>
    )
}

export default ActionButtons;