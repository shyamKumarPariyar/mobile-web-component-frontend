import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import StatusBadge from "../common/StatusBatch";
import SearchBox from "../common/SearchBox";
import { useHeader } from "../common/HeaderContext";

const ProjectTable = () => {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const { setTitle, setHeader } = useHeader()

    useEffect(() => {
        axios.get("/api/projects")
        .then(res => setProjects(res.data.data));
    }, []);

    const filtered = projects?.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client?.companyName.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { name: "Project Name", selector: row => row.name, sortable: true },
        { name: "Client", selector: row => row.client?.companyName },
        {
        name: "Status",
        cell: row => <StatusBadge status={row.status} />
        }
    ];
    useEffect(() => {
        setTitle("DKN SYSTEM | Content");
        setHeader("Manage Content");
    }, [setTitle, setHeader]); 

    return (
        <>
            <DataTable
                columns={columns}
                data={filtered}
                pagination
                highlightOnHover
                responsive
                subHeader
                subHeaderComponent={
                    <div className="d-flex justify-content-end w-100">
                        <SearchBox
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search projects..."
                        />
                    </div>
                }
            />
        </>
    );
};

export default ProjectTable;
