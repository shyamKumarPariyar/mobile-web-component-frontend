import { NavLink } from "react-router-dom";
import { BASE_URL } from "../constraints/constant";
import { Card } from "react-bootstrap";

const 
Cards = ({ data }) => {

	return (
		data && (
			<Card className="font-fam asset-grids" >
				<Card.Body className=" align-self-start">
					{(data?.logo && data?.logo !==null) ? 
						<img
							className="company-list-card-img"
							src={`${BASE_URL}/media/${data.subdomain}/images/logo/${data.logo}`}
							alt="..."
							position="top"
						/>
					:
						<img
							className="company-list-card-img"
							src="/assets/images/default-logo.png"
							alt="..."
							position="top"
						/>
					}
					<Card.Title title={data.name} className="company-list-card-title modern-truncate" >
						{data.name}
					</Card.Title>
					{/* <Card.Subtitle className="company-list-card-subtitle text-decoration-none">
						{(data?.orgNewURL && data?.orgNewURL !== null) ?
						<Card.Link href={`https://${data?.orgNewURL}`} title={data?.orgNewURL} target="_blank" className="d-flex text-decoration-none"> {data.orgNewURL} <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="px-1 nav-icon-anchor" /> </Card.Link>
						: 
						<Card.Link href="#" className="text-primary cursor-not-allowed text-decoration-none" >New Link Pending.... </Card.Link>
						}
					</Card.Subtitle> */}
					<Card.Text className="mt-2 comp-members">
						Total Members: {data.numberOfUser} People
					</Card.Text>
					<Card.Subtitle className="company-list-card-subtitle">
						<NavLink to={`/super-admin/company/manage/${data._id}`} className=" text-decoration-none">
						Manage Company
						<img
							alt="right-arrow"
							src="/assets/utils/right-arrow.svg"
							className="mx-3"
						/>{" "}
						</NavLink>
					</Card.Subtitle>
				</Card.Body>
			</Card>
		)
	);
};

export default Cards;
