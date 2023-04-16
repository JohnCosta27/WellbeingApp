import { FC, ReactNode } from "react";
import { Dialog as UIDialog } from "@headlessui/react";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;

  children: ReactNode;
}

export const Dialog: FC<DialogProps> = ({ open, setOpen, title, children }) => (
  <UIDialog as="div" open={open} onClose={() => setOpen(false)}>
    {/** Backdrop */}
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-32">
      <div className="w-full h-[90vh] flex items-center justify-center bg-white rounded-xl shadow-lg">
        <UIDialog.Panel className="w-full h-full p-8">
          <UIDialog.Title as="h3" className="text-2xl font-bold">
            {title}
          </UIDialog.Title>
          <div className="w-full h-full py-4">{children}</div>
        </UIDialog.Panel>
      </div>
    </div>
  </UIDialog>
);
