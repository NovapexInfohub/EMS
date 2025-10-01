import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare prompt with context (frontend data)
    const prompt = `
      You are an ERP Assistant. Use the following company data to answer user queries.

      Company Data:
      ${JSON.stringify(context, null, 2)}

      User Question:
      ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
