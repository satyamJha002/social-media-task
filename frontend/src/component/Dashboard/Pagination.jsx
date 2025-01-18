import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };
  return (
    <div className="flex justify-center items-center gap-2 mt-11">
      <Button onClick={() => handlePageChange(currentPage - 1)}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm text-gray-500">
        {currentPage} / {totalPages}
      </span>
      <Button onClick={() => handlePageChange(currentPage + 1)}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;
