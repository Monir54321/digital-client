// export const uploadFile = async (file, fieldName) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "digital-smart-sheba");
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/dpglin62r/raw/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       const url = data.url;
//       const pdfUrl = `${url}?attachment=true`;
//       console.log("data?.url", url);
//       console.log("pdf url", pdfUrl);
//       const imageUrl = data.secure_url;
//       return {
//         imageUrl,
//         error: null,
//         success: true,
//         fieldName,
//       };
//     }
//   } catch (error) {
//     console.log("upload error", error);
//     return {
//       imageUrl: null,
//       error: "Failed to upload file",
//       success: false,
//       fieldName,
//     };
//   }
// };


export const uploadFile = async (file, fieldName) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "digital-smart-sheba");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dpglin62r/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.secure_url;

      console.log("Uploaded URL:", imageUrl);

      // Optional: If you want to force download
      const pdfUrl = `${imageUrl}?attachment=true`;
      console.log("PDF URL (with attachment):", pdfUrl);

      return {
        imageUrl,
        error: null,
        success: true,
        fieldName,
      };
    } else {
      // Handle non-200 responses
      console.error("Failed to upload file: ", response.statusText);
      return {
        imageUrl: null,
        error: "Failed to upload file",
        success: false,
        fieldName,
      };
    }
  } catch (error) {
    console.error("Upload error:", error);
    return {
      imageUrl: null,
      error: "An error occurred while uploading the file",
      success: false,
      fieldName,
    };
  }
};
