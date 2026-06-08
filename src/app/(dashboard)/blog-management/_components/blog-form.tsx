"use client";

import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CloudUpload, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import BlogRichTextEditor from "./blog-rich-text-editor";

type BlogFormMode = "add" | "edit";

type BlogFormProps = {
  mode: BlogFormMode;
  initialTitle?: string;
  initialDescription?: string;
  initialImage?: string | null;
};

const isHtmlContentEmpty = (html: string) => {
  const textContent = html
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  return textContent.length === 0 && !/<img\b/i.test(html);
};

const BlogForm = ({
  mode,
  initialTitle = "",
  initialDescription = "",
  initialImage = null,
}: BlogFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [coverPreview, setCoverPreview] = useState<string | null>(initialImage);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const updateCoverPreview = (file?: File) => {
    if (!file) {
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setCoverFile(file);
    setCoverPreview(objectUrl);
  };

  const handleFileSelect = (file?: File) => {
    if (!file) {
      return;
    }

    updateCoverPreview(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Please add a blog title.");
      return;
    }

    if (isHtmlContentEmpty(description)) {
      toast.error("Please add blog content.");
      return;
    }

    toast.success(
      mode === "add"
        ? "Blog draft is ready for API integration."
        : "Blog changes are ready for API integration.",
    );

    console.log("Blog form payload", {
      mode,
      title,
      description,
      coverFile,
    });
  };

  const handleCancel = () => {
    router.push("/blog-management");
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.75fr)_minmax(320px,1fr)]">
        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#D9D9D9] bg-white p-4">
            <label className="mb-2 block text-sm font-medium text-[#343A40]">
              Title
            </label>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Write Here"
              className="h-10 rounded-[6px] border-[#D9D9D9] text-sm text-[#343A40] placeholder:text-[#9CA3AF] focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="rounded-[8px] border border-[#D9D9D9] bg-white p-4">
            <label className="mb-2 block text-sm font-medium text-[#343A40]">
              Description
            </label>
            <BlogRichTextEditor
              initialValue={description}
              placeholder="Description here"
              onChange={setDescription}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#D9D9D9] bg-white p-4">
            <p className="mb-3 text-sm font-medium text-[#343A40]">
              Upload Photo
            </p>

            <div
              className={cn(
                "relative flex min-h-[310px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] border border-dashed border-[#D9D9D9] bg-[#FAFAFA] p-4 text-center transition-colors",
                isDragging && "border-primary bg-[#E6F2FD]",
              )}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={() => setIsDragging(true)}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {coverPreview ? (
                <div className="relative h-[260px] w-full overflow-hidden rounded-[8px]">
                  <Image
                    src={coverPreview}
                    alt="Blog preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex max-w-[240px] flex-col items-center gap-3 text-[#9CA3AF]">
                  <CloudUpload className="h-8 w-8 text-[#9CA3AF]" />
                  <p className="text-xs leading-6">
                    Browse and choose the files you want to upload from your
                    computer
                  </p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-primary text-white">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFileSelect(event.target.files?.[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="h-10 rounded-[8px] border-[#FF5A5F] text-sm font-medium text-[#FF5A5F] hover:bg-[#FFF5F5] hover:text-[#FF5A5F]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 rounded-[8px] bg-primary text-sm font-medium text-white hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
