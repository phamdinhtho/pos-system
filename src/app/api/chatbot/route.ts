import { NextRequest, NextResponse } from "next/server";
import { chatWithOpenAI } from "@/services/chatbot.service";
import { chatbotSchema } from "@/schemas/chatbot.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = chatbotSchema.parse(body);

    const aiResponse = await chatWithOpenAI(parsed.messages);

    return NextResponse.json({ result: aiResponse });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
