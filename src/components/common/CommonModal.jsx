// components/CommonModal.jsx
import { Modal, Button } from "react-bootstrap";

const CommonModal = ({
    show,
    title,
    children,
    onClose,
    onSubmit,
    submitText = "Save"
    }) => {
    return (
        <Modal
        show={show}
        onHide={onClose}
        centered
        backdrop="static"   // 👈 prevents accidental close
        keyboard={false}
        size="lg"
        >
        <form onSubmit={onSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{children}</Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Cancel
            </Button>
            <Button type="submit" variant="primary">
                {submitText}
            </Button>
            </Modal.Footer>
        </form>
        </Modal>
    );
};

export default CommonModal;
