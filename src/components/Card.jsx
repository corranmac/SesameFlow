import clsx from "clsx"; // Optional: Helps manage class merging

const Card = ({ title, children, footer,onClick,className = "" }) => {
    return (
      <div onClickCapture={onClick} className={clsx("h-50 w-100 bg-white p-4 rounded-lg shadow-md flex flex-col", className)}>
        {/* Header */}
        <div className="font-semibold text-lg border-b pb-2">{title}</div>
        
        {/* Content */}
        <div className="flex-1 flex py-4">{children}</div>
        
        {/* Footer */}
        {footer && <div className="border-t pt-2 text-sm text-gray-600">{footer}</div>}
      </div>
    );
  };
  
  export default Card;