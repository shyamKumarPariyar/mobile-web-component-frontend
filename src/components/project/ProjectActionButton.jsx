import { faEdit, faTrashCan, faUpload, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../../utils/useAuth'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { getConsultants } from '../../service/consultant.service'
import { updateProject } from '../../service/project.service'

const ProjectActionButtons = ({GetProjects, id, openEdit, row, setDeleteId, setShowDeleteModal}) => {
     const {user} = useAuth()
    const {role} = jwtDecode(user)
    const [consultants, setConsultants] = useState()
        
    const [consultantProject, setConsultantProject] = useState(status)
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
        
        const [showEdit, setShowEdit] = useState(false)
        const [showDelete, setShowDelete] = useState(false)
        const [showUpload, setShowUpload] = useState(false)
        const [showAssignCounselor, setShowAssignCounselor] = useState(false)
    
        useEffect(() => {
            switch (role) {
            case 'admin':
                setShowEdit(true)
                setShowDelete(true)
                setShowUpload(true)
                setShowAssignCounselor(true)
                break;
    
            case 'client':
                setShowEdit(true)
                setShowDelete(true)
                setShowUpload(true)
                break;
    
            case 'newconsultant':
                setShowUpload(true)
                break;
            
            case 'seniorconsultant':
                setShowEdit(true)
                setShowUpload(true)
                setShowAssignCounselor(true)
                break;
    
            case 'generalconsultant':
                setShowUpload(true)
                setShowAssignCounselor(true)
                break;
    
            case 'external':
                setShowUpload(true)
                break;
        
            default:
                break;
        }
        },[role])

        const assignConsultant = async () => {
            const formData = {
                consultants: consultantProject
            }

            console.log("data", formData)
            await updateProject(id, formData)
            .then(() => {
                GetProjects()
                setShow(false)
            })
            .catch((err) => console.error(err))
        }

        const GetConsultantList = async () => {
            await getConsultants()
            .then((res) => {
                const {data} = res.data
                setConsultants(data)
            })
            .catch((err) => console.error(err))
        }

        useEffect(() => {
            GetConsultantList()
        },[])
    return (
        <>
            <div className="d-flex gap-2">
                {showUpload && 
                    <FontAwesomeIcon icon={faUpload} title='Upload Content'  style={{ cursor: "pointer", color: 'gray' }} />
                }
                {showAssignCounselor && 
                    <FontAwesomeIcon icon={faUserGear} onClick={handleShow} title='Assign Consultant'  style={{ cursor: "pointer", color: 'green' }} />
                }
                {showEdit && 
                    <FontAwesomeIcon icon={faEdit} onClick={() => openEdit(row)} title='Edit'  style={{ cursor: "pointer" }} />
                }
                {showDelete && 
                    <FontAwesomeIcon icon={faTrashCan} title='Delete' className='text-danger' style={{ cursor: "pointer" }} onClick={() => {
                        setDeleteId(id);
                        setShowDeleteModal(true);
                    }} />
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Consultant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="consultantProject" className="form-label">
                        Consultants
                    </label>
                        <select
                        className="form-control"
                        value={consultantProject}
                        onChange={(e) => setConsultantProject(e.target.value)}
                        required
                        >
                            <option value="">Select Consultant</option>
                            {consultants?.map(consultant => (
                            <option key={consultant._id} value={consultant._id}>
                                {consultant.user.name}
                            </option>
                            ))}
                        </select>

                    <div className="mt-3 d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                        Cancel
                        </Button>
                        <Button type="submit" onClick={assignConsultant} variant="primary" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectActionButtons;