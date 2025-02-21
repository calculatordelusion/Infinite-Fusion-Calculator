"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationClientProps {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export default function PaginationClient({
  currentPage,
  totalPages,
  limit,
}: PaginationClientProps) {
  const router = useRouter();
  const pathname = usePathname() || ""; // Ensure pathname is never null
  const searchParams = useSearchParams(); // Original readonly searchParams

  const [maxVisiblePages, setMaxVisiblePages] = useState(3); // Default to 3

  useEffect(() => {
    const handleResize = () => {
      setMaxVisiblePages(window.innerWidth > 768 ? 7 : 3);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString()); // Convert to mutable URLSearchParams
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    if (limit !== 100) {
      params.set("limit", limit.toString());
    } else {
      params.delete("limit");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString()); // Convert to mutable URLSearchParams
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    if (limit !== 100) {
      params.set("limit", limit.toString());
    } else {
      params.delete("limit");
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={getPageUrl(i)}
              onClick={(e) => handlePageChange(e, i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      const leftSide = Math.max(
        currentPage - Math.floor(maxVisiblePages / 2),
        1,
      );
      const rightSide = Math.min(leftSide + maxVisiblePages - 1, totalPages);

      if (leftSide > 1) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink
              href={getPageUrl(1)}
              onClick={(e) => handlePageChange(e, 1)}
            >
              1
            </PaginationLink>
          </PaginationItem>,
        );
        if (leftSide > 2) {
          pageNumbers.push(<PaginationEllipsis key="leftEllipsis" />);
        }
      }

      for (let i = leftSide; i <= rightSide; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={getPageUrl(i)}
              onClick={(e) => handlePageChange(e, i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (rightSide < totalPages) {
        if (rightSide < totalPages - 1) {
          pageNumbers.push(<PaginationEllipsis key="rightEllipsis" />);
        }
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={getPageUrl(totalPages)}
              onClick={(e) => handlePageChange(e, totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Pagination className="my-4">
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem className="md:inline-flex hidden">
            <PaginationPrevious
              href={getPageUrl(Math.max(1, currentPage - 1))}
              onClick={(e) => handlePageChange(e, Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
        )}
        {renderPageNumbers()}
        {currentPage !== totalPages && (
          <PaginationItem className="md:inline-flex hidden">
            <PaginationNext
              href={getPageUrl(Math.min(totalPages, currentPage + 1))}
              onClick={(e) =>
                handlePageChange(e, Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
