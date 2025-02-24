import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'

const FlowDeleteDialogue = ({showDialogue,setShowDialogue,onDelete,flowForDel}) => {
    return (
        <Dialog.Root className="relative z-50" open={showDialogue} onOpenChange={(e) => setShowDialogue(e.open)}>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Positioner className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-10 z-50">
            <Dialog.Content className="bg-white p-6 rounded-lg shadow-lg w-96">
              <Dialog.Title className="text-xl font-semibold">Delete {flowForDel}?</Dialog.Title>
              <Dialog.Description className="text-gray-700 mt-2">Are you sure you want to delete this research flow?</Dialog.Description>
              <div className="mt-4 flex flex-col gap-6">
                <button
                  onClick={(e) => {e.stopPropagation(); onDelete()}}
                  className="bg-gray-100 text-black rounded hover:bg-gray-200 w-40"
                >
                  Delete Research Flow
                </button>
                <Dialog.CloseTrigger className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">
                  Cancel
                </Dialog.CloseTrigger>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>      
  )}

  export default FlowDeleteDialogue;