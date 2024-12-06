import { createReadStream } from "fs";
import { resolve } from "path";
import { NextResponse } from "next/server";

// Define the GET handler
export async function GET(): Promise<NextResponse> {
  const filePath = resolve("./src/app/api/prostock.apk");
  try {
    // Set headers for downloading the APK file
    const headers = new Headers({
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": "attachment; filename=prostock.apk",
    });

    // Create a stream for the file
    const fileStream = createReadStream(filePath);

    // Return a streaming response
    return new NextResponse(fileStream as unknown as ReadableStream, {
      headers,
    });
  } catch (error) {
    console.error("Error serving the APK file:", error);

    // Handle errors and return a 500 status
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
