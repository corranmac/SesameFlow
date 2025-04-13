import { Dialog } from "@sesameflow";
import { useCallback } from "react";

export const NodeMenu = ({ nodeMenuVisible, setNodeMenuVisible }) => {
  return (
    <Dialog
      isOpen={nodeMenuVisible}
      setIsOpen={setNodeMenuVisible}
      closeText="Close"
      title="Add Node"
    >
      <div className="flex flex-col mt-2 gap-2"></div>
    </Dialog>
  );
};
