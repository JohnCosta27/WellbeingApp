import { FC, ReactNode } from "react";

interface TableProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export const Table: FC<TableProps> = ({ header, body, footer }) => (
  <div className="w-full h-full overflow-x-auto">
    <table className="table w-full">
      <thead>{header}</thead>
      <tbody>{body}</tbody>
      <tfoot>{footer}</tfoot>
    </table>
  </div>
);
