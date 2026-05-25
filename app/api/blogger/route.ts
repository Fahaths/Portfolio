import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("https://marketingonmyway.blogspot.com/feeds/posts/default?alt=json", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch Blogger feed: ${res.statusText}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Blogger Proxy Error:", error);
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 });
  }
}
