import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Create a new blog
export const POST = async (req) => {
  try {
    const body = await req.json();
    const blogsCollection = await dbConnect("blogs");

    const result = await blogsCollection.insertOne({
      title: body.title,
      category: body.category,
      coverImage: body.coverImage || "",
      summary: body.summary,
      sections: body.sections || [], 
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Blog created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog Create Error:", error);
    return NextResponse.json(
      { error: "Failed to create blog", details: error.message },
      { status: 500 }
    );
  }
};

//  Get all blogs
export const GET = async () => {
  try {
    const blogsCollection = await dbConnect("blogs");
    const blogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 }) 
      .toArray();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
};
