"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { Eye, PencilLine, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ClaudePagination from "@/components/ui/claude-pagination";
import DeleteModal from "@/components/modals/delete-modal";
import NotFound from "@/components/shared/NotFound/NotFound";

import blogImage from "../../../../../public/assets/images/blog.png"

import type { BlogPost } from "./blog-data-type";

const ITEMS_PER_PAGE = 5;

const mockBlogPosts: BlogPost[] = Array.from({ length: 12 }, (_, index) => ({
  _id: `blog-${index + 1}`,
  title: "Why the Media Harbour?",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi...",
  createdAt: "2026-03-02T00:00:00.000Z",
  thumbnail: "/assets/images/blog.png",
}));

const BlogContainer = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState(mockBlogPosts);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const totalPages = Math.max(1, Math.ceil(blogs.length / ITEMS_PER_PAGE));


  

  useEffect(() => {
    if (blogs.length === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [blogs.length, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const showingStart = blogs.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(startIndex + ITEMS_PER_PAGE, blogs.length);

  const handleAddBlog = () => {
    router.push("/blog-management/add-blog");
  };

  const handleViewBlog = (blog: BlogPost) => {
    toast.info(`Preview for "${blog.title}" will be added later.`);
  };

  const handleEditBlog = (blog: BlogPost) => {
    router.push(`/blog-management/edit-blog/${blog._id}`);
  };

  const handleDeleteBlog = () => {
    if (!selectedBlog) {
      return;
    }

    setBlogs((currentBlogs) =>
      currentBlogs.filter((blog) => blog._id !== selectedBlog._id),
    );
    toast.success("Blog removed from the list.");
    setDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="px-3 md:px-6 pb-6 space-y-5">
      <div className="flex justify-end pt-6">
        <Button
          type="button"
          onClick={handleAddBlog}
          className="h-10 rounded-[8px] bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Blog
        </Button>
      </div>

      {blogs.length === 0 ? (
        <NotFound message="No blog posts available yet." />
      ) : (
        <div className="overflow-hidden rounded-[12px] border border-[#E6E7E6] bg-white">
          <Table className="w-full border-separate border-spacing-0">
            <TableHeader className="bg-[#E6F2FD]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40%] py-4 pl-6 text-sm font-normal leading-[150%] text-[#343A40]">
                  Title
                </TableHead>
                <TableHead className="w-[35%] py-4 text-left text-sm font-normal leading-[150%] text-[#343A40]">
                  Description
                </TableHead>
                <TableHead className="w-[15%] py-4 text-center text-sm font-normal leading-[150%] text-[#343A40]">
                  Created On
                </TableHead>
                <TableHead className="w-[10%] py-4 text-center text-sm font-normal leading-[150%] text-[#343A40]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBlogs.map((blog, index) => (
                <TableRow
                  key={blog._id}
                  className={
                    index !== paginatedBlogs.length - 1
                      ? "border-b border-[#E6E7E6]"
                      : ""
                  }
                >
                  <TableCell className="py-3 pl-6 align-middle">
                    <div className="flex items-center gap-3">
                      <Image
                        src={blogImage}
                        alt={blog.title}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-[6px] object-cover"
                      />
                      <span className="text-base font-medium leading-[150%] text-[#343A40] line-clamp-1">
                        {blog.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 align-middle text-left text-base font-normal leading-[150%] text-[#68706A]">
                    <span className="line-clamp-1">{blog.description}</span>
                  </TableCell>
                  <TableCell className="py-3 text-center align-middle text-base font-normal leading-[150%] text-[#68706A]">
                    {moment(blog.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell className="py-3 align-middle">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleViewBlog(blog)}
                        className="text-[#343A40] transition-colors hover:text-primary"
                        aria-label={`View ${blog.title}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditBlog(blog)}
                        className="text-[#1E6CFF] transition-colors hover:text-[#1558d6]"
                        aria-label={`Edit ${blog.title}`}
                      >
                        <PencilLine className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setDeleteModalOpen(true);
                        }}
                        className="text-[#FF3B30] transition-colors hover:text-[#e0281f]"
                        aria-label={`Delete ${blog.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {blogs.length > 0 && (
        <div className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-normal leading-[150%] text-[#68706A]">
            Showing {showingStart} to {showingEnd} of {blogs.length} results
          </p>
          <div>
            <ClaudePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}

      {deleteModalOpen && selectedBlog && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedBlog(null);
          }}
          onConfirm={handleDeleteBlog}
          title="Delete this blog?"
          desc="This will remove the blog from the current list. API integration can be connected later."
        />
      )}
    </div>
  );
};

export default BlogContainer;
