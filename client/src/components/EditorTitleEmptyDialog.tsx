import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface EditorTitleEmptyDialogProps {
  onDismiss: () => void;
}
const EditorTitleEmptyDialog = ({ onDismiss }: EditorTitleEmptyDialogProps) => {
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
                  Publish blog post
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You can't publish a blog post with an empty title.
                  </p>
                </div>

                <div className="mt-4 flex flex-row justify-center">
                  <button
                    type="button"
                    className="w-20 rounded-md border border-transparent bg-gray-200 px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    onClick={onDismiss}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditorTitleEmptyDialog;
