import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import StatusBadge from "../common/StatusBatch";
import SearchBox from "../common/SearchBox";
import { useHeader } from "../common/HeaderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUpload} from "@fortawesome/free-solid-svg-icons";
import AddButton from "../common/AddButton";
import { useForm } from "react-hook-form";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CommonModal from "../common/CommonModal";
import { displayToaster } from "../../hooks/DisplayToaster";
import { getProjects, projectCreate } from "../../service/project.service";
import { getClients } from "../../service/client.service";
import ReadMoreText from "../common/ReadMoreText";
import { dateFormatter } from "../../utils/DateFormatter";
import ProjectActionButtons from "./ProjectActionButton";
import { useAuth } from "../../utils/useAuth";
import { jwtDecode } from "jwt-decode";

const defaultValues = {
    id: null,
    name:"",
    description: "",
    client: "",
    startDate: "",
    reqExpertise: [],
    endDate: ""

};


const ProjecttTable = () => {
    const {user} = useAuth()
    const {role} = jwtDecode(user)
    
    const [changeStatus, setChangeStatus] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    
    useEffect(() => {
        switch (role) {
        case 'admin':
            setShowAdd(true)
            setChangeStatus(true)
            break;

        case 'client':
            setShowAdd(true)
            break;

        case 'newconsultant':
            setChangeStatus(true)
            break;
        
        case 'seniorconsultant':
            setShowAdd(true)
            setChangeStatus(true)
            break;

        case 'generalconsultant':
            setChangeStatus(true)
            break;

        case 'external':
            setChangeStatus(true)
            break;
    
        default:
            break;
    }
    },[role])

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const { setTitle, setHeader } = useHeader()

    const [clients, setClients] = useState()

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projects, setProjects] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues
    });

    const openAdd = () => {
        reset(defaultValues);
        setIsEdit(false);
        setShowModal(true);
    };

    const openEdit = (row) => {
        reset(row); // 👈 preload form
        setIsEdit(true);
        setShowModal(true);
    };

    /**
     * 
     * @param {*} data 
     * CREATE / UPDATE
     */
    const onSubmit = async (data) => {
        if (isEdit) {
        setProjects(prev =>
            prev.map(c => (c.id === data.id ? data : c))
        );

    } else {

        await projectCreate(data)
            .then((res) => {
                console.log("Results:", res.data)
                GetProjects()
                displayToaster("Project Added Successfully.", 'success')
                setShowModal(false)
                
            })
            .catch((err) => console.error("Error on adding project", err))
        
        }
    };

    /**
     * Delete
     */
    const confirmDelete = () => {
        setProjects(prev => prev.filter(c => c.id !== deleteId));
        setShowDeleteModal(false);
    };

    const GetProjects = async() => {
        await getProjects()
        .then((res) => {
            const {data} = res.data
            console.log('Projects', data)
            setProjects(data)
        })
        .catch((err) => console.error("Error on getting data", err))
    }

    const GetClients = async () => {
        await getClients()
        .then((res) => {
            const {data} = res.data
            console.log("Clients List", data)
            setClients(data)
        })
        .catch((err) => console.error("Error on getting data", err))

    }

    const filtered = projects?.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
    );

    const uploadContent = async () => {

    }

    const columns = [
        {
            name: "SN.",
            cell: (row, index) => index + 1 + (currentPage - 1) * rowsPerPage,
            width: "60px"
        },
        { 
            name: "Name", 
            selector: row => <span className="text-capitalize" > {row.name} </span>, 
            maxWidth: '150px',
            sortable: true 
        },
        { 
            name: "Description",
            selector: row => <ReadMoreText text={row.description} />,
            wrap: true,
            minWidth: "250px",
            maxWidth: "400px",
            sortable: true
        },
        { 
            name: "Client",
            selector: row => <span className="text-capitalize" > {row?.client?.companyName} </span>,
            maxWidth: '150px',
            sortable: true
        },
        { 
            name: "Expertise",
            selector: row => <span className="text-capitalize">{row?.reqExpertise[0]?.replaceAll("_", " ")}</span> ,
            sortable: true,
        },
        { 
            name: "Project Date",
            selector: row => <span className="text-muted">
                                Start: {dateFormatter(row?.startDate)} <br /> End: {dateFormatter(row?.endDate)}
                            </span>,

            sortable: true
        },
        {
            name: "Status",
            cell: row => <StatusBadge GetProjects={GetProjects} changeStatus={changeStatus} status={row.status} _id={row._id} />,
            selector: row => row.status,
            sortable: true
        },
        {
            name: <FontAwesomeIcon icon={faGear} />,
            cell: row => <ProjectActionButtons GetProjects={GetProjects} id={row._id} row={row} openEdit={openEdit} setShowDeleteModal={setShowDeleteModal} setDeleteId={setDeleteId} />,
            right: true,
            width: "5%"
        }
    ];

    useEffect(() => {
        setTitle("DKN SYSTEM | Project");
        setHeader("Manage Project");
    }, [setTitle, setHeader]); 

    useEffect(() => {
        GetProjects()
        GetClients()
    },[])

    return (
        <>

            <DataTable
                columns={columns}
                data={filtered}
                pagination
                paginationPerPage={5} 
                paginationRowsPerPageOptions={[5, 20, 50, 100]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Rows per page:',
                    rangeSeparatorText: 'of'
                }}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
                highlightOnHover
                responsive
                subHeader
                subHeaderComponent={
                    <div className="d-flex justify-content-end pt-4 w-100">
                    <SearchBox
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search consultants..."
                        />
                        {showAdd && 
                            <AddButton openAdd={openAdd} />
                        }
                        
                    </div>
                }
            />

            <CommonModal
                show={showModal}
                title={isEdit ? "Update Consultant" : "Add Consultant"}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label"> Name </label>
                        <input
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", {
                            required: "Name is required"
                        })}
                        />
                        <div className="invalid-feedback">
                        {errors.name?.message}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <textarea
                            rows="2"
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                            {...register("description", {
                            required: "Description is required"
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.description?.message}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Client</label>
                        <select
                            className={`form-select ${errors.client ? "is-invalid" : ""}`}
                            {...register("client", {
                            required: "Client is required"
                            })}
                        >
                            <option value="">Select Client</option>
                            {clients?.map(client => (
                            <option key={client._id} value={client._id}>
                                {client.user.name}
                            </option>
                            ))}
                        </select>

                        <div className="invalid-feedback">
                            {errors.client?.message}
                        </div>
                    </div>

                    <div className="col-md-6 mt-3">
                        <label className="form-label">Required Expertise</label>
                        <select
                        className={`form-select ${errors.expertise ? "is-invalid" : ""}`}
                        {...register("reqExpertise", { required: "Req Expertise is required" })}
                        >
                        <option value="">Select required expertise</option>
                        <option value="FRONTEND">FRONTEND</option>
                        <option value="BACKEND">BACKEND</option>
                        <option value="FULLSTACK">FULLSTACK</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="CONTENT_CREATER">CONTENT CREATER</option>
                        <option value="DESIGN">DESIGN</option>
                        <option value="PROTOTYPE">PROTOTYPE</option>
                        <option value="REACT">REACT</option>
                        <option value="REACTJS">REACTJS</option>
                        <option value="LARAVEL">LARAVEL</option>
                        <option value="NEXTJS">NEXTJS</option>
                        <option value="JAVA">JAVA</option>
                        <option value="PYTHON">PYTHON</option>
                        <option value="ML">ML</option>
                        <option value="AI">AI</option>
                        <option value="THREEJS">THREEJS</option>
                        <option value="WORDPRESS">WORDPRESS</option>
                        </select>
                        <div className="invalid-feedback">
                        {errors.reqExpertise?.message}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                            {...register("startDate", {
                            required: "Start date is required"
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.startDate?.message}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                            {...register("endDate", {
                            required: "End date is required",
                            validate: (value, formValues) =>
                                !formValues.startDate || value >= formValues.startDate
                                || "End date must be after start date"
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.endDate?.message}
                        </div>
                    </div>
                </div>
            </CommonModal>

            {showDeleteModal && (
                <ConfirmDeleteModal
                id="deleteClient"
                show={showDeleteModal}
                onConfirm={confirmDelete}
                onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
};

export default ProjecttTable;
