/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Location from "@/modals/Location";

// Handle GET request to fetch all users
export async function GET() {
  await dbConnect();

  try {
    const locations = await Location.find({});
    return NextResponse.json({ success: true, data: locations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Handle POST request to create a new user
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const ipAddress = getClientIp(req);

  try {
    const location = new Location({
      ip: ipAddress,
      geo: JSON.stringify(body.geo),
    });
    await location.save();
    return NextResponse.json({ success: true, data: location }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : null;

  return ip || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || null;
}
