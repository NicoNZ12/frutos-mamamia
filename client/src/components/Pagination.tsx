import { Pagination } from "@mui/material";
import React from "react";

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        size="medium"
      />
    </div>
  )
}