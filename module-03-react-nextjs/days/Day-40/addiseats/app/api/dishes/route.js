import { NextResponse } from 'next/server'
import { dishes, getImageUrl } from '../../../lib/data'

export async function GET() {
  return NextResponse.json({ dishes: dishes.map((dish) => ({ ...dish, image:getImageUrl(dish.image) })) })
}
