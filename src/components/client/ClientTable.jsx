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
import { clientCreate, getClients } from "../../service/client.service";
import { displayToaster } from "../../hooks/DisplayToaster";

const defaultValues = {
    id: null,
    email:"",
    password: ""
};


const ClientTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const { setTitle, setHeader } = useHeader()

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clients, setClients] = useState([]);

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
        setClients(prev =>
            prev.map(c => (c.id === data.id ? data : c))
        );

    } else {

        await clientCreate(data)
            .then(() => {
                // console.log("Results:", res.data)
                GetClients()
                displayToaster("Client Added Successfully.", 'success')
                setShowModal(false)
                
            })
            .catch((err) => console.error("Error on adding client", err))
        
        }
    };

    /**
     * Delete
     */
    const confirmDelete = () => {
        setClients(prev => prev.filter(c => c.id !== deleteId));
        setShowDeleteModal(false);
    };

    const GetClients = async() => {
        await getClients()
        .then((res) => {
            const {data} = res.data
            // console.log(data)
            setClients(data)
            setClients({email: data.user.email})
        })
        .catch((err) => console.error("Error on getting data", err))
    }

    const filtered = clients?.filter(c =>
        c.companyName.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.email.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "SN.",
            cell: (row, index) => index + 1 + (currentPage - 1) * rowsPerPage,
            width: "60px"
        },
        { 
            name: "Company", 
            selector: row => row.companyName, 
            sortable: true 
        },
        { 
            name: "Contact Email",
            selector: row => row.user.email,
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
        setTitle("DKN SYSTEM | Client");
        setHeader("Manage Client");
    }, [setTitle, setHeader]); 

    useEffect(() => {
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
                            placeholder="Search clients..."
                        />
                        <AddButton openAdd={openAdd} />
                    </div>
                }
            />

            <CommonModal
                show={showModal}
                title={isEdit ? "Update Client" : "Add Client"}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                    className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                    {...register("companyName", {
                        required: "Company name is required"
                    })}
                    />
                    <div className="invalid-feedback">
                    {errors.companyName?.message}
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

export default ClientTable;
