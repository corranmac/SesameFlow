import clsx from "clsx";
import { IoIosSettings } from "react-icons/io";
import { MdDeleteForever, MdDriveFileRenameOutline } from "react-icons/md";
import { useCallback, useState } from "react";

// Define the types for the props
interface ProjectCardProps {
  id: string;
  description: string;
  name: string;
  onClick: () => void;
  onSaveEdit: () => void;
  setShowDialogue: (show: boolean) => void;
  className?: string; // Optional className
  flowID: string;
}

const ProjectCard = ({
  id,
  description,
  name,
  onClick,
  onSaveEdit,
  setShowDialogue,
  className,
  flowID,
}:ProjectCardProps) => {
  const [flowName, setName] = useState<string>(name);
  const [flowDescription, setDescription] = useState<string>(description);
  const [editable, setEditable] = useState<boolean>(false);
  const [hideSettings, setHideSettings] = useState<boolean>(true);
  
  const handleClick = useCallback(() => {
    if (!editable || hideSettings) {
      onClick();
    }
  }, [editable, hideSettings, onClick]);

  return (
    <div
      className={clsx(
        "flex flex-col w-full bg-white p-4 rounded-lg shadow-md",
        {
          "cursor-pointer hover:bg-blue-200/40": hideSettings,
        },
        className
      )}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex justify-between font-semibold text-md border-b pb-2">
        <div className="self-start h-auto min-h-[1rem] break-words overflow-hidden">
          {!editable && flowName}
          {editable && (
            <input
              key="nameInput"
              className="text-blue-200 border-1 border-gray-200"
              value={flowName}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        <div
          className="flex flex-row rounded-md"
          onMouseOver={() => {
            setHideSettings(false);
          }}
          onMouseOutCapture={() => {
            if (!editable) {
              setHideSettings(true);
            }
          }}
        >
          <IoIosSettings className="w-6 h-6 hover:bg-blue-200/40 p-1" />
          {!hideSettings && (
            <MdDriveFileRenameOutline
              className="w-6 h-6 hover:bg-blue-200/40 p-1"
              onClick={(e) => {
                e.stopPropagation();
                setEditable(!editable);
              }}
            />
          )}
          {!hideSettings && (
            <MdDeleteForever
              onClick={(e) => {
                e.stopPropagation();
                setShowDialogue(true);
              }}
              className="w-6 h-6 hover:bg-blue-200/40 p-1"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex break-words overflow-hidden h-full min-h-[rem]">
        <div className="break-words overflow-hidden">
          {!editable && flowDescription}
          {editable && (
            <textarea
              key="descriptionInput"
              className="w-full h-full text-blue-200 border-1 border-gray-200"
              value={flowDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 justify-content-end">
        ID: {flowID}
      </div>
    </div>
  );
};

export default ProjectCard;
