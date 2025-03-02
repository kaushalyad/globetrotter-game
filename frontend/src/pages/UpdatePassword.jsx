import React from "react";
import UpdatePasswordForm from "../components/UpdatePassword";

const UpdatePasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Update Password</h1>
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdatePasswordPage;