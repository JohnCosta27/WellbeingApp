import { FC, ReactNode } from "react";
import { Dialog as UIDialog } from "@headlessui/react";
import clsx from "clsx";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  width?: string;

  children: ReactNode;
}

export const Dialog: FC<DialogProps> = ({
  open,
  setOpen,
  title,
  width,
  children,
}) => (
  <UIDialog as="div" open={open} onClose={() => setOpen(false)}>
    {/** Backdrop */}
    <div className="fixed inset-0 bg-black/30 z-20" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-32 z-20">
      <div
        className={clsx(
          "h-[90vh] flex items-center justify-center bg-white rounded-xl shadow-lg",
          width ?? "w-3/4"
        )}
      >
        <UIDialog.Panel className="w-full h-full p-8 z-20">
          <UIDialog.Title as="h3" className="text-2xl font-bold">
            {title}
          </UIDialog.Title>
          <div className="w-full h-full py-4 overflow-y-auto">{children}</div>
        </UIDialog.Panel>
      </div>
    </div>
  </UIDialog>
);
