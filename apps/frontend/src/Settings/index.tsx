import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDeleteAccountMutation } from "@wellbeing/graphql-types";
import { Card } from "../ui";

export const Settings = () => {
  const [deleteAccount] = useDeleteAccountMutation();

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  return (
    <Card title="Settings">
      <button
        type="button"
        className="btn btn-error"
        onClick={() => setShowDeleteAccountModal(true)}
      >
        Delete Account
      </button>
      <Transition show={showDeleteAccountModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setShowDeleteAccountModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">
                    <div className="flex justify-center">
                      <h3 className="font-bold text-lg flex-1">
                        Add a new place
                      </h3>
                      <button
                        className="m-auto"
                        type="button"
                        onClick={() => setShowDeleteAccountModal(false)}
                      >
                        <AiOutlineCloseCircle className="h-8 w-8 m-auto" />
                      </button>
                    </div>
                  </Dialog.Title>

                  <p>
                    Are you sure you want to delete your account?
                    <br /> This action is irreversible.
                  </p>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn btn-error w-full"
                      type="submit"
                      onClick={() =>
                        deleteAccount().then(() =>
                          window.location.replace("/logout")
                        )
                      }
                    >
                      Delete Account
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Card>
  );
};
