import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import useFlowStore, { selector } from "@flowstate/store";
import Workspace from "@flow/Workspace";
import { Card, Dialog } from "@sesameflow";
import { ProjectCard, FlowDeleteDialogue } from "@/layout";
import { useShallow } from "zustand/react/shallow";
import { nanoid } from "nanoid";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Types for context and flow manager
interface FlowManagerContextType {
  isParent: boolean;
  loadFlow: (flowID: string) => void;
  createFlow: (metadata: { name: string; description: string }) => void;
  deleteFlow: (flowID: string) => void;
  updateFlowMetadata: (metadata: { name: string; description: string }) => void;
  currentFlow: null | string;
  flowVisible: boolean;
  flowMetadata: Record<string, { name: string; description: string }>;
}

const FlowManagerContext = createContext<FlowManagerContextType>({
  isParent: false,
  loadFlow: () => {},
  createFlow: () => {},
  deleteFlow: () => {},
  updateFlowMetadata: () => {},
  currentFlow: null,
  flowVisible: false,
  flowMetadata: {},
});

const initialNodes = [
  {
    id: "0",
    type: "OpenAlex-base_term",
    position: { x: 1091, y: 150 },
    data: {},
  },
];

interface FlowCreateDialogProps {
  useCreateFlow: (metadata: { name: string; description: string }) => void;
  showAddDialogue: boolean;
  setShowAddDialogue: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlowCreateDialog = ({
  useCreateFlow,
  showAddDialogue,
  setShowAddDialogue,
}:FlowCreateDialogProps) => {
  const [flowName, setFlowName] = useState<string>("");
  const [flowDescription, setFlowDescription] = useState<string>("");

  const handleCreate = useCallback(
    (name: string, description: string) => {
      let metadata = { name: name, description: description };
      useCreateFlow(metadata);
      setFlowName("");
      setFlowDescription("");
      setShowAddDialogue(false);
    },
    [useCreateFlow]
  );

  return (
    <Dialog
      isOpen={showAddDialogue}
      setIsOpen={setShowAddDialogue}
      closeText="Cancel"
      title="Create New Flow"
      submitButton={
        <button
          onClick={() => handleCreate(flowName, flowDescription)}
          disabled={flowName === ""}
          className="submit-button"
        >
          Create
        </button>
      }
    >
      <div className="flex flex-col mt-2 gap-2">
        <div>
          <label htmlFor="flowName">
            <span className="text-red-400">*</span> Name:
          </label>
          <input
            name="flowName"
            className="standard-input"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
          ></input>
          {flowName === "" && (
            <span className="text-sm text-red-400 italic">
              {" "}
              * A name for your flow is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="flowDescription"> Description:</label>
          <input
            name="flowDescription"
            className="standard-input"
            value={flowDescription}
            onChange={(e) => setFlowDescription(e.target.value)}
          ></input>
        </div>
      </div>
    </Dialog>
  );
};

interface WorkSpaceEditorProps {
  useCreateFlow: (metadata: { name: string; description: string }) => void;
  useDeleteFlow: (flowID: string) => void;
  loadFlow: (flowID: string) => void;
  flowMetadata: Record<string, { name: string; description: string }>;
}

const WorkSpaceEditor = ({
  useCreateFlow,
  useDeleteFlow,
  loadFlow,
  flowMetadata,
}:WorkSpaceEditorProps) => {
  const [showDelDialogue, setShowDelDialogue] = useState<boolean>(false);
  const [showAddDialogue, setShowAddDialogue] = useState<boolean>(false);
  const [flowForDel, setFlowForDel] = useState<string>("");

  const handleShowDelDialog = useCallback((flowId: string) => {
    setFlowForDel(flowId);
    setShowDelDialogue(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 m-5 ">
      <h2 className="text-4xl p-4 ">Research Flows</h2>
      <FlowDeleteDialogue
        showDialogue={showDelDialogue}
        setShowDialogue={setShowDelDialogue}
        flowForDel={flowForDel}
        onDelete={() => {
          useDeleteFlow(flowForDel);
          console.log("deleting");
          setShowDelDialogue(false);
        }}
      />
      <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-md h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-6 overflow-y-auto p-2">
          <Card
            onClick={() => setShowAddDialogue(true)}
            className="w-full items-center !bg-blue-200/20 cursor-pointer hover:!bg-blue-200"
            key="newNode"
            title=""
          >
            <div className="text-8xl">+</div>
          </Card>
          {flowMetadata !== undefined &&
            Object.entries(flowMetadata).map(([flowID, flow]) => (
              <ProjectCard
                setShowDialogue={() => handleShowDelDialog(flowID)}
                onClick={() => loadFlow(flowID)}
                key={flowID}
                name={flow?.name || ""}
                description={flow?.description || ""}
                flowID={flowID}
              >
                {flowID}
              </ProjectCard>
            ))}
        </div>
      </div>
      <FlowCreateDialog
        useCreateFlow={useCreateFlow}
        showAddDialogue={showAddDialogue}
        setShowAddDialogue={setShowAddDialogue}
      />
    </div>
  );
};

export const FlowWorkspace = React.memo(() => {
  const [flowVisible, setFlowVisible] = useState<boolean>(false);

  const {
    flows,
    flowMetadata,
    updateFlowMetadata,
    currentFlowId,
    createFlow,
    deleteFlow,
    setCurrentFlow,
    renameCurrentFlow,
    currentFlow,
  } = useFlowStore(useShallow(selector));

  const nodes = useMemo(
    () => flows[currentFlowId]?.nodes ?? [],
    [flows, currentFlowId]
  );

  const edges = useMemo(
    () => flows[currentFlowId]?.edges ?? [],
    [flows, currentFlowId]
  );

  const currentFlowMetadata = useMemo(
    () => flowMetadata[currentFlowId],
    [flowMetadata, currentFlowId]
  );

  const loadFlow = (flowID: string) => {
    setCurrentFlow(flowID);
    navigate("/flow/" + flowID);
  };

  const useCreateFlow = (metadata: { name: string; description: string }) => {
    let flowID = nanoid();
    createFlow(flowID, metadata, initialNodes, []);
  };

  const useDeleteFlow = (flowID: string) => {
    deleteFlow(flowID);
  };

  const navigate = useNavigate();
  const { routeFlowId } = useParams<{ routeFlowId: string }>();

  useEffect(() => {
    if (routeFlowId) {
      setCurrentFlow(routeFlowId);
      setFlowVisible(true);
    } else {
      setCurrentFlow(null);
      setFlowVisible(false);
    }
  }, [routeFlowId]);

  return (
    <div className="flex flex-col px-0 py-2 mb-20 gap-2 overflow-y-hidden">
      {!flowVisible && (
        <WorkSpaceEditor
          useCreateFlow={useCreateFlow}
          useDeleteFlow={useDeleteFlow}
          loadFlow={loadFlow}
          flowMetadata={flowMetadata}
        />
      )}
      <FlowManagerContext.Provider value={{ isParent: true }}>
        {flowVisible && (
          <Workspace nodes={nodes} edges={edges} currentFlowMetadata={currentFlowMetadata} />
        )}
      </FlowManagerContext.Provider>
    </div>
  );
});

// Custom hook to access the context
export const useFlowManagerContext = () => {
  return useContext(FlowManagerContext);
};
