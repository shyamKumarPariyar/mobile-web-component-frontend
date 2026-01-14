import { useState } from "react";

const ReadMoreText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={expanded ? "" : "multi-line-cell"}>
        {text}
      </div>
      {text.length > 150 && (
        <button
          className="btn btn-link p-0"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
};

export default ReadMoreText;
