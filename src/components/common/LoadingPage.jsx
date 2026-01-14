import { Spinner } from 'react-bootstrap'

const LoadingPage = () => {
    return (
		<>
			<div className=" text-center popuped-center">
				<Spinner animation="border" role="status" variant='primary'>
					<Spinner animation="grow" role="status" variant='success' size='sm'>
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</Spinner>
			</div>
		</>
    )
}

export default LoadingPage