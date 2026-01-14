const StatusBadge = ({ status }) => {
    const statusMap = {
        APPROVED: "success",
        PENDING: "warning",
        AMENDMENT_REQUIRED: "danger"
    };

    return (
        <span className={`badge p-2 bg-${statusMap[status] || "secondary"}`}>
        {status?.replaceAll("_", " ")}
        </span>
    );
};

export default StatusBadge;
