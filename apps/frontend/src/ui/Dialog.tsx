import { FC, ReactNode } from "react";
import { Dialog as UIDialog } from "@headlessui/react";
import clsx from "clsx";
import { AiOutlineClose } from "react-icons/ai";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  className?: string;

  children: ReactNode;
}

export const Dialog: FC<DialogProps> = ({
  open,
  setOpen,
  title,
  className,
  children,
}) => (
  <UIDialog as="div" open={open} onClose={() => setOpen(false)}>
    {/** Backdrop */}
    <div className="fixed inset-0 bg-black/30 z-20" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4 z-20">
      <div
        className={clsx(
          "h-[90vh] flex items-center justify-center bg-white rounded-xl shadow-lg w-3/4",
          className !== undefined && className
        )}
      >
        <UIDialog.Panel className="w-full h-full p-8 z-20">
          <UIDialog.Title
            as="h3"
            className="text-2xl font-bold flex justify-between items-center"
          >
            {title}
            <button
              type="button"
              className="grid items-center pointer"
              onClick={() => setOpen(false)}
            >
              <AiOutlineClose />
            </button>
          </UIDialog.Title>

          <div className="w-full h-full py-4 overflow-y-auto">{children}</div>
        </UIDialog.Panel>
      </div>
    </div>
  </UIDialog>
);
