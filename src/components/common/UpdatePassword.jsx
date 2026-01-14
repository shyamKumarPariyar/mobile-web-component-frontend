import { useEffect, useState } from "react"
import { Button, Card, CloseButton, Col, Form, InputGroup } from "react-bootstrap"
import { updateUserPassword } from "../../service/user.service";
import { displayToaster } from "../../hooks/DisplayToaster";
import { useAuth } from "../../utils/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const UpdatePassword = ({userId, handleClose}) => {
    const {logout} = useAuth()
    const [id, setId] = useState(userId)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passIcon, setPassIcon] = useState(faEyeSlash)
    const [confirmPassIcon, setConfirmPassIcon] = useState(faEyeSlash)
    const [formInput, setFormInput] = useState({
        password: "",
        confirmPassword: "",
    });

    const hideShowIcon = (field) => {
        if(field === 'password'){
            if(showPassword){
                setPassIcon(faEyeSlash)
            } else {
                setPassIcon(faEye)
            }
            setShowPassword(!showPassword)
        } else {
            if(showConfirmPassword){
                setConfirmPassIcon(faEyeSlash)
            } else {
                setConfirmPassIcon(faEye)
            }
            setShowConfirmPassword(!showConfirmPassword)
        }
    }

    const [formError, setFormError] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };
    
    const validateFormInput = async (event) => {
        event.preventDefault();
        let inputError = {
          password: "",
          confirmPassword: "",
        };
    
        if (!formInput.password) {
          setFormError({
            ...inputError,
            password: "Password should not be empty",
          });
          return
        }

        if (!formInput.confirmPassword) {
            setFormError({
              ...inputError,
              confirmPassword: "Confirm Password should not be empty",
            });
            return
          }

    
        if (formInput.confirmPassword !== formInput.password) {
          setFormError({
            ...inputError,
            confirmPassword: "Password and confirm password should be same",
          });
          return;
        }

        setFormError(inputError)

        await updateUserPassword(id, formInput)
        .then(() => {
            displayToaster("Password changed successfully.", "success")
            handleClose()
        })
        .catch(() => {
            // console.error("Error:- ", err)
            displayToaster('Something error happened. Please try again.', 'error')
        })
     
    }

    useEffect(() => {
        if(userId){
            setId(userId)
        }
    },[])
    return (
        <>
            <Card className="font-fam">
                <Card.Header className='fw-bold py-2 py-md-3' > 
                    <span> Update Password: </span>
                    <CloseButton onClick={handleClose} className=' float-end' />
                </Card.Header>
                <form onSubmit={validateFormInput}>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="password" md="12" as={Col}>
                            <Form.Label>Password</Form.Label> 
                            
                            <InputGroup  className="mb-3">
                                <Form.Control
                                    value={formInput.password || ''} 
                                    onChange={({ target }) => {
                                        handleUserInput(target.name, target.value);
                                    }}
                                    // required
                                    name="password"
                                    type={(showPassword) ? 'text' : 'password' }
                                    placeholder="password"
                                />
                            <Button className="btn-sm btn-secondary border-0 ">
                                <FontAwesomeIcon icon={passIcon} onClick={() => hideShowIcon('password')}/>
                            </Button>
                            </InputGroup>
                            <p className="text-danger">{formError.password}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword" md="12" as={Col}>
                            <Form.Label> Confirm Password</Form.Label>
                            <InputGroup  className="mb-3">
                                <Form.Control
                                    value={formInput.confirmPassword || ''} 
                                    onChange={({ target }) => {
                                        handleUserInput(target.name, target.value);
                                    }}
                                    name="confirmPassword"
                                    type={(showConfirmPassword) ? 'text' : 'password' }
                                    placeholder="Confirm Password"
                                />

                            <Button className="btn-sm btn-secondary border-0 ">
                                <FontAwesomeIcon icon={confirmPassIcon} onClick={() => hideShowIcon('confirmPassword')}/>
                            </Button>
                            </InputGroup>
                            <p className="text-danger">{formError.confirmPassword}</p>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="">
                        <Col className=' float-end p-1 p-md-2'>
                            <Button type="submit" className="btn btn-sm btn-primary" value="Submit" >Save</Button>
                            <Button variant="outline-secondary" onClick={handleClose} className='mx-2 border-0 btn btn-sm float-start'>Cancel</Button>
                        </Col>
                    </Card.Footer>
                </form>
            </Card>
            
        </>
    )
}

export default UpdatePassword