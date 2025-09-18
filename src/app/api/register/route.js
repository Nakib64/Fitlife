const { findUserByEmail, createUser } = require("@/lib/user");
const { NextResponse } = require("next/server");

export const POST = async(req) =>{
    try{
        const {name, email, password} = await req.json();
        const existingUser = await findUserByEmail(email);
        if(existingUser){
            return NextResponse.json({error: 'User Already exist'}, {status: 400})
        }

        await createUser({name, email, password});
        return NextResponse.json({message: 'User created successfully'}, {status: 500})
    }
    catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}
