import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Create Event</h1>
      </div>
    </ProtectedRoute>
  );
};

export default page;
