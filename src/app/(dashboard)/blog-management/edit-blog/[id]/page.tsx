import React from "react";
import EditBlogForm from "./_components/edit-blog-form";
import DashboardHeader from "@/components/ui/dashboard-header";

const EditBlogPage = () => {
  return (
    <div>
      <DashboardHeader
        title="Edit Blog"
        desc="Keep track of all your apartment, update details, and stay organized."
      />
      <EditBlogForm />
    </div>
  );
};

export default EditBlogPage;
