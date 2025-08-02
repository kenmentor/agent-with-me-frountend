"use client"
import UploadWizard from "@/components/Upload1";
import axios from "axios";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    axios.post("http://localhost:800/v1/auth/logout")
  }, ["e"])
  return (
    <div>
      <UploadWizard />
    </div>
  );
};

