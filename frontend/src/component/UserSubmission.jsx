import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const UserSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
    uploadedImages: null,
  });

  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const maxSize = 50 * 1024 * 1024;
    const files = Array.from(e.target.files);

    const oversizedFiles = files.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert("One or more files exceed the 5MB size limit.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      uploadedImages: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(async () => {
      try {
        if (!formData.name || !formData.socialMediaHandle) {
          throw new Error("Please fill in all required fields");
        }

        const submissionData = new FormData();
        submissionData.append("name", formData.name);
        submissionData.append("socialMediaHandle", formData.socialMediaHandle);

        if (formData.uploadedImages) {
          Array.from(formData.uploadedImages).forEach((file) => {
            submissionData.append(`image`, file);
          });
        }
        const response = await fetch(
          "https://social-media-task-01ws.onrender.com/api/user/create",
          {
            method: "POST",
            body: submissionData,
          }
        );

        if (!response.ok) {
          throw new Error(`Submitted failed: ${response.statusText}`);
        }

        setFormData({
          name: "",
          socialMediaHandle: "",
          uploadedImages: null,
        });

        const fileInput = document.getElementById("uploadedImages");
        if (fileInput) fileInput.value = "";

        alert("Images uploaded");
      } catch (error) {
        setIsError(error.message || "An error occurred during submission");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  return (
    <>
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle>User Submission Form</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <Alert variant="success" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Loading...</AlertDescription>
            </Alert>
          )}
          {isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{isError}</AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialMediaHandle">Social Media Handle:</Label>
              <Input
                id="socialMediaHandle"
                name="socialMediaHandle"
                value={formData.socialMediaHandle}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uploadedImages">Upload Images:</Label>
              <Input
                id="uploadedImages"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="w-full"
                accept="image/*"
                multiple
              />
            </div>

            <Button type="submit" className="w-32">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UserSubmissionForm;
