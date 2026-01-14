import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ActionButtons = ({id, openEdit, row, setDeleteId, setShowDeleteModal}) => {
    return (
        <>
            <div className="d-flex gap-2">
                <FontAwesomeIcon icon={faEdit} onClick={() => openEdit(row)} title='Edit'  style={{ cursor: "pointer" }} />
                <FontAwesomeIcon icon={faTrashCan} title='Delete' className='text-danger' style={{ cursor: "pointer" }} onClick={() => {
                        setDeleteId(id);
                        setShowDeleteModal(true);
                    }} />
            </div>
        </>
    )
}

export default ActionButtons;