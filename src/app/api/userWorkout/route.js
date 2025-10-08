import dbConnect from "@/lib/dbConnect";
import { json } from "express";

export async function POST(req) {
	try {
		const data = await req.json();
			

		if (!data.email) {
			return new Response(JSON.stringify({ error: "Email is required" }), {
				status: 400,
			});
		}

		const db = await dbConnect("userWorkout");

		const result = await db.updateOne(
			{ email: data.email }, // find document by email
			{
				$set: data,
				$setOnInsert: { createdAt: new Date() },
			},
			{ upsert: true }
		);

		return new Response(JSON.stringify({ status: 200 }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}

export async function GET(req) {
	try {
		// Get the email from the URL query parameters
		const { searchParams } = new URL(req.url);
		const email = searchParams.get("email");

		if (!email) {
			return new Response(JSON.stringify({ error: "Email is required" }), {
				status: 400,
			});
		}

		const db = await dbConnect("userWorkout");

		const result = await db.findOne({ email });

		if (!result) {
			return new Response(JSON.stringify({ error: "No record found" }), {
				status: 404,
			});
		}

		
		return new Response(JSON.stringify(result), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}

export async function PUT(req) {
	try {
		const data = await req.json();
		const filter = { email: data?.email };

		const result = await dbConnect("userWorkout").findOne(filter);
		return new Response(JSON.stringify(result), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}


// file: /app/api/userWorkout/progress/route.js



export async function PATCH(req) {
  try {
    const { email, day, exerciseName, completed } = await req.json();
    const db = await dbConnect("userWorkout");

    const result = await db.updateOne(
      { email, "data.day": day, "data.exercises.name": exerciseName },
      {
        $set: {
          "data.$[dayIndex].exercises.$[exIndex].completed": completed,
        },
      },
      {
        arrayFilters: [
          { "dayIndex.day": day },
          { "exIndex.name": exerciseName },
        ],
      }
    );

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
