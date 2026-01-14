import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import StatusBadge from "../common/StatusBatch";
import SearchBox from "../common/SearchBox";
import { useHeader } from "../common/HeaderContext";

const ContentTable = () => {
    const [contents, setContents] = useState([]);
    const [search, setSearch] = useState("");
    const { setTitle, setHeader } = useHeader()

    useEffect(() => {
        axios.get("/api/contents")
        .then(res => setContents(res.data.data));
    }, []);

    const filtered = contents?.filter(c =>
        c.filename.toLowerCase().includes(search.toLowerCase()) ||
        c.project?.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { name: "File Name", selector: row => row.filename },
        { name: "Project", selector: row => row.project?.name },
        {
        name: "Status",
        cell: row => <StatusBadge status={row.status} />
        },
        {
        name: "Action",
        cell: row => (
            <a
            href={`/${row.filepath}`}
            className="btn btn-sm btn-outline-primary"
            target="_blank"
            rel="noreferrer"
            >
            View
            </a>
        )
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
                            placeholder="Search contents..."
                        />
                    </div>
                }
            />
        </>
    );
};

export default ContentTable;
