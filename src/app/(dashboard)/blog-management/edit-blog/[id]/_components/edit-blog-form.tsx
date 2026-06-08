"use client";

import BlogForm from "../../../_components/blog-form";

import blogImage from "../../../../../../../public/assets/images/blog.png"


const EditBlogForm = () => {
  return (
    <BlogForm
      mode="edit"
      initialTitle="Why the Media Harbour?"
      initialDescription="<h2>Why the Media Harbour?</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Insert headings, colors, links, and images directly in this editor.</p>"
      initialImage={blogImage as unknown as string}
    />
  );
};

export default EditBlogForm;
