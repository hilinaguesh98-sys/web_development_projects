import { cookies } from 'next/headers';
export async function requireUser(){
 const store=await cookies();
 const user=store.get('addis_eats_user')?.value;
 if(!user) throw new Error('Unauthorized');
 return user;
}
export async function getUser(){return (await cookies()).get('addis_eats_user')?.value || null}
