import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../utils/useAuth";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-router-dom";
import { updateProjectStatus } from "../../service/project.service";

const StatusBadge = ({GetProjects, changeStatus, status, _id }) => {
    const {user} = useAuth()
    const {id} = jwtDecode(user)
    const [projStatus, setProjStatus] = useState(status)
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!changeStatus) return;
        setShow(true);
    }

    const statusMap = {
        APPROVED: "success",
        COMPLETED: "success",
        DELIVERED: "success",
        PLANNED: "info",
        ACTIVE: "success",
        PENDING: "warning",
        HOLD: "warning",
        AMENDMENT_REQUIRED: "danger",
        ORIGINAL: "primary",
        AMMENDED: "dark"
    };

    const updateStatusValue = async () => {
        const formData = {
            updatedBy: id,
            status: projStatus
        }
        await updateProjectStatus(_id, formData)
        .then(() => {
            GetProjects()
            setShow(false)
        })
        .catch((err) => console.error(err))

    }

    return (
        <>
            <span onClick={handleShow} style={{ cursor: changeStatus ? "pointer" : "not-allowed" }} className={`badge p-2 bg-${statusMap[status] || "secondary"}`}>
                {status?.replaceAll("_", " ")}
            </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Project Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="projStatus" className="form-label">
                        Status
                    </label>
                        <select
                        className="form-control"
                        value={projStatus}
                        onChange={(e) => setProjStatus(e.target.value)}
                        required
                        >
                            <option value="PLANNED">Planned</option>
                            <option value="PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="HOLD">On Hold</option>
                            <option value="AMENDMENT_REQUIRED">Amendment Required</option>
                            <option value="AMENDED">Amended</option>
                            <option value="DELIVERED">Delivered</option>
                        </select>

                    <div className="mt-3 d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                        Cancel
                        </Button>
                        <Button type="submit" onClick={updateStatusValue} variant="primary" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default StatusBadge;
