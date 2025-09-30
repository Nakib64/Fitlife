import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
	try {
		const data =await req.json();
		console.log(data);
		const response = await dbConnect("userWorkout").insertOne(data);
		console.log(response);
		return new Response(JSON.stringify(response), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}

export async function GET(req) {
	try {
		const result = await dbConnect("userWorkout").findOne({ email: "nafiz2282@gmail.com" });
		console.log(result);
		return new Response(JSON.stringify(result), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}

export async function PUT(req) {
	try {
		const data =await req.json();
		const filter = { email: data?.email };

		const result = await dbConnect("userWorkout").findOne(filter);
		return new Response(JSON.stringify(result), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}
