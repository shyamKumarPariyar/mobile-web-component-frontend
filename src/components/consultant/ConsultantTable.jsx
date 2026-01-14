import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import StatusBadge from "../common/StatusBatch";
import SearchBox from "../common/SearchBox";
import { useHeader } from "../common/HeaderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear} from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "../admin/ActionButtons";
import AddButton from "../common/AddButton";
import { useForm } from "react-hook-form";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CommonModal from "../common/CommonModal";
import { displayToaster } from "../../hooks/DisplayToaster";
import { consultantCreate, getConsultants } from "../../service/consultant.service";

const defaultValues = {
    id: null,
    email:"",
    password: "",
    expertise: "",
    experience: ''
};


const ConsultantTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const { setTitle, setHeader } = useHeader()

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [consultants, setConsultants] = useState([]);

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
        setConsultants(prev =>
            prev.map(c => (c.id === data.id ? data : c))
        );

    } else {

        await consultantCreate(data)
            .then(() => {
                // console.log("Results:", res.data)
                GetConsultants()
                displayToaster("Consultant Added Successfully.", 'success')
                setShowModal(false)
                
            })
            .catch((err) => console.error("Error on adding consultant", err))
        
        }
    };

    /**
     * Delete
     */
    const confirmDelete = () => {
        setConsultants(prev => prev.filter(c => c.id !== deleteId));
        setShowDeleteModal(false);
    };

    const GetConsultants = async() => {
        await getConsultants()
        .then((res) => {
            const {data} = res.data
            console.log(data)
            setConsultants(data)
        })
        .catch((err) => console.error("Error on getting data", err))
    }

    const filtered = consultants?.filter(c =>
        c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.expertise[0]?.toLowerCase().includes(search.toLowerCase()) ||
        c.experience?.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "SN.",
            cell: (row, index) => index + 1 + (currentPage - 1) * rowsPerPage,
            width: "60px"
        },
        { 
            name: "Name", 
            selector: row => row.user?.name, 
            sortable: true 
        },
        { 
            name: "Contact Email",
            selector: row => row?.user?.email,
            sortable: true
        },
        { 
            name: "Expertise",
            selector: row => row.expertise,
            sortable: true
        },
        { 
            name: "Experience",
            selector: row => row.experience,
            sortable: true
        },
        {
            name: "Status",
            cell: row => <StatusBadge status={row.status} />,
            selector: row => row.status,
            sortable: true
        },
        {
            name: <FontAwesomeIcon icon={faGear} />,
            cell: row => <ActionButtons id={row._id} row={row} openEdit={openEdit} setShowDeleteModal={setShowDeleteModal} setDeleteId={setDeleteId} />,
            right: true,
            width: "5%"
        }
    ];

    useEffect(() => {
        setTitle("DKN SYSTEM | Consultant");
        setHeader("Manage Consultant");
    }, [setTitle, setHeader]); 

    useEffect(() => {
        GetConsultants()
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
                        <AddButton openAdd={openAdd} />
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
                    <label className="form-label"> Name</label>
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
                

                {/* Experience Dropdown */}
                <div className="col-md-6">
                    <label className="form-label">Experience</label>
                    <select
                    className={`form-select ${errors.experience ? "is-invalid" : ""}`}
                    {...register("experience", { required: "Experience is required" })}
                    >
                    <option value="">Select Experience</option>
                    <option value="NEW">New</option>
                    <option value="SENIOR">Senior</option>
                    <option value="GENERAL">General</option>
                    </select>
                    <div className="invalid-feedback">
                    {errors.experience?.message}
                    </div>
                </div>

                 {/* Expertise Dropdown */}
                <div className="col-md-6 mt-3">
                    <label className="form-label">Expertise</label>
                    <select
                    className={`form-select ${errors.expertise ? "is-invalid" : ""}`}
                    {...register("expertise", { required: "Expertise is required" })}
                    >
                    <option value="">Select expertise</option>
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="BACKEND">BACKEND</option>
                    <option value="FULLSTACK">FULLSTACK</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="CONTENT_CREATER">CONTENT_CREATER</option>
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
                    {errors.expertise?.message}
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address"
                        }
                    })}
                    />
                    <div className="invalid-feedback">
                    {errors.email?.message}
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        {...register("password", {
                        required: !defaultValues.id ? "Password is required" : false,
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                        })}
                        placeholder={defaultValues.id ? "Leave blank to keep current password" : ""}
                    />
                    <div className="invalid-feedback">
                        {errors.password?.message}
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

export default ConsultantTable;
