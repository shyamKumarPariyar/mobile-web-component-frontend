import { useState } from "react";
import { userLogin } from '../service/user.service';
import { handleApiError } from '../service/error.service';
import { jwtDecode } from 'jwt-decode'
import { useAuth } from "../utils/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../index.css'

const Login = () => {
	const {user, login} = useAuth()
	const navigate = useNavigate()
    const [inputs, setInputs] = useState({
		email: "",
		password: "",
    });
	const [errors, setErrors] = useState({})
	const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
		const { name, value } = e.target;

		setInputs((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: '',
		}));
		setServerError('');
    };

	const validate = () => {
		let newErrors = {};

		if (!inputs.email) {
			newErrors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
			newErrors.email = 'Invalid email format';
		}

		if (!inputs.password) {
			newErrors.password = 'Password is required';
		} else if (inputs.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};


    const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;

		await userLogin(inputs)
		.then((result) => {
			const {data} = result
			login(data?.token)
			
			setServerError('')
		})
		.catch((err) => {
			setServerError(handleApiError(err));

		})
    };

	useEffect(() => {
		if (user) {
			const { role } = jwtDecode(user);
			if(role && (role === 'superadmin' || role === 'admin')){
				navigate('/admin/dashboard', {replace: true})
			} else if(role && (role === 'newconsultant' || role === 'seniorconsultant' || role === 'generalconsultant')) {
				navigate('/consultant/dashboard', {replace: true})
			} else if(role &&  role === 'client'){
				navigate('/client/dashboard', {replace: true})
			}
		}
	}, []);

    return (
		<div className="main-login">
			<div className="container">
				<div className="d-flex justify-content-center h-100">
					<div className="card p-5 p-sm-2">
						<div className="text-white text-center py-3">
							<h1 className="fw-bold display-5">DKN System</h1>	
						</div>
						<div className="card-header text-white text-center">
							<h4>Sign In</h4>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-user"></i></span>
									</div>
									<input type="text" name='email' value={inputs.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="username" />
									{errors.email && <div className="invalid-feedback">{errors.email}</div>}
								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-key"></i></span>
									</div>
									<input type="password" name='password' value={inputs.password} onChange={handleChange} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="password" />
									{errors.password && <div className="invalid-feedback">{errors.password}</div>}
								</div>
								{serverError && (
									<div className="alert alert-danger text-center">
										{serverError}
									</div>
								)}
								{/* <div className="row align-items-center remember">
									<input type="checkbox" />Remember Me
								</div> */}
								<div className="form-group">
									<input type="submit" value="Login" className="btn float-right login_btn" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
}

export default Login