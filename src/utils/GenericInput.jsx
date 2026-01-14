import { Col, Form } from "react-bootstrap";

const GenericInput = ({label, type, value, onChange, name, errors, placeholder, span, options}) => {
	return (
		<>
			<Form.Group md={span} as={Col} className="mb-3" controlId={name}>
				<Form.Label> {label} </Form.Label>
				{(type ==='textarea') ?
					<Form.Control 
						as={type}
						value={value}
						onChange={onChange}
						name={name}
						placeholder={placeholder}
						rows={2}
					/>
				: (type ==='select') ?
				<Form.Select aria-label="No" onChange={onChange} name={name}>
					<option>--Select--</option>
					{options?.map((item) => (
						<option key={item} value={item} className="text-capitalize">{item}</option>
					))}
					
				</Form.Select>
				: 
				<Form.Control 
					type={type}
					value={value}
					onChange={onChange}
					name={name}
					placeholder={placeholder}
				/>
				}
				
				{errors && errors[name] && (
					<p className="error">{errors[name]}</p>
				)}
			</Form.Group>
		</>
	);
};

export default GenericInput;
