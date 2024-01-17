import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

interface CloseEditorDialogProps {
  onDismiss: () => void;
}

function CloseEditorDialog({ onDismiss }: CloseEditorDialogProps) {
  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onDismiss}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/35" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Close editor
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure? All unsaved data will be lost.
                  </p>
                </div>

                <div className="mt-4 flex flex-row justify-between">
                  <button
                    type="button"
                    className="rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    onClick={onDismiss}
                  >
                    Cancel
                  </button>

                  <Link
                    className="justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    to="/"
                  >
                    Confirm
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CloseEditorDialog;
