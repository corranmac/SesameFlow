import clsx from "clsx"; // Optional: Helps manage class merging

const Tag = ({ value,className = "" }) => {
    return (
      <div className={clsx("bg-white p-1 rounded-lg shadow-md justify-center align-center", className)}>
        {/* Content */}
        <div className="px-1">{value}</div>
      </div>
    );
  };
  
  export default Tag;