import type { ReactNode } from "react";

export const Input = ({
  id,
  label,
  children,
}: {
  id?: string;
  label?: string;
  children: ReactNode;
}) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
};
