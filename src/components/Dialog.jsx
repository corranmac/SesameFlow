import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import React from 'react';

const StyledDialog = ({
  title = 'Dialog Title',
  closeText = 'Close',
  contentClassName = '',
  backdropClassName = '',
  submitButton= null,
  isOpen = false,
  setIsOpen = () => {},
  children
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      
      <Portal>
        {/* Backdrop styling */}
        <Dialog.Backdrop className={`fixed inset-0 bg-black opacity-20 ${backdropClassName}`} />
        
        <Dialog.Positioner className="fixed inset-0 flex justify-center items-center">
          {/* Dialog Content */}
          <Dialog.Content
            className={`bg-white p-6 rounded-lg shadow-xl w-96 ${contentClassName}`}
          >
            {/* Dialog Title */}
            <Dialog.Title className="!text-xl font-semibold text-gray-800">{title}</Dialog.Title>
            
            {/* Dialog Content */}
            {children}
            <Dialog.Description></Dialog.Description>

            <div className="mt-4 flex justify-between items-center">
              {/* Close button */}
              <Dialog.CloseTrigger className="cancel-button">
                {closeText}
              </Dialog.CloseTrigger>

              {/* Custom submit button */}
              {children && (
                <div>
                  {submitButton}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default StyledDialog;
