import {NextResponse} from 'next/server';import {cookies} from 'next/headers';
export async function POST(req){const body=await req.json().catch(()=>null);if(!body?.name)return NextResponse.json({error:'Name is required'},{status:400});(await cookies()).set('addis_eats_user',String(body.name).slice(0,80),{httpOnly:true,sameSite:'lax',path:'/'});return NextResponse.json({ok:true});}
