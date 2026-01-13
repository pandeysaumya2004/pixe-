// import { NextResponse } from "next/server";
// import ImageKit from "imagekit";
// import { auth } from "@clerk/nextjs/server";

// // Initialize ImageKit
// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
// });

// export async function POST(request) {
//   try {
//     // Verify authentication
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Get form data
//     const formData = await request.formData();
//     const file = formData.get("file");
//     const fileName = formData.get("fileName");

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Generate unique filename
//     const timestamp = Date.now();
//     const sanitizedFileName =
//       fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
//     const uniqueFileName = `${userId}/${timestamp}_${sanitizedFileName}`;

//     // Upload to ImageKit - Simple server-side upload
//     const uploadResponse = await imagekit.upload({
//       file: buffer,
//       fileName: uniqueFileName,
//       folder: "/projects",
//     });

//     // Generate thumbnail URL using ImageKit transformations
//     const thumbnailUrl = imagekit.url({
//       src: uploadResponse.url,
//       transformation: [
//         {
//           width: 400,
//           height: 300,
//           cropMode: "maintain_ar",
//           quality: 80,
//         },
//       ],
//     });

//     // Return upload data
//     return NextResponse.json({
//       success: true,
//       url: uploadResponse.url,
//       thumbnailUrl: thumbnailUrl,
//       fileId: uploadResponse.fileId,
//       width: uploadResponse.width,
//       height: uploadResponse.height,
//       size: uploadResponse.size,
//       name: uploadResponse.name,
//     });
//   } catch (error) {
//     console.error("ImageKit upload error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to upload image",
//         details: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1. Validate environment variables
    if (
      !process.env.IMAGEKIT_PUBLIC_KEY ||
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.IMAGEKIT_URL_ENDPOINT
    ) {
      throw new Error("ImageKit env variables missing");
    }

    // 2. Initialize ImageKit (inside handler to avoid build crash)
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    // 3. Read form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fileName = formData.get("fileName") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 4. Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Create unique filename
    const timestamp = Date.now();
    const safeFileName =
      fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";

    const uniqueFileName = `${timestamp}_${safeFileName}`;

    // 6. Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: uniqueFileName,
      folder: "/uploads",
    });

    // 7. Return response
    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      width: uploadResponse.width,
      height: uploadResponse.height,
      size: uploadResponse.size,
      name: uploadResponse.name,
    });
  } catch (error: any) {
    console.error("ImageKit upload error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Image upload failed",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
