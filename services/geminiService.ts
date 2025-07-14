
import { GoogleGenAI } from "@google/genai";
import { reportData } from '../constants.ts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const model = 'gemini-2.5-flash';

/**
 * Generates an AI response based on a city's data and a user's question.
 * This simulates a RAG pipeline by providing context from the report data.
 */
export async function getAiChatResponse(cityName: string, question: string, context?: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cityName, question, context })
  });
  const data = await res.json();
  if (data.result) return data.result;
  return data.error || 'AI 응답 생성 중 오류가 발생했습니다.';
}


/**
 * Generates a citizen action plan for a specific city.
 */
export async function generateCitizenActionPlan(cityName: string): Promise<string> {
    const cityData = reportData[cityName];
    if (!cityData) {
        return `죄송합니다. '${cityName}'에 대한 데이터를 찾을 수 없습니다.`;
    }

    const context = `
    - 도시명: ${cityName}
    - 도시 유형: ${cityData.type}
    - 주요 배출 부문: ${Object.keys(cityData.sectors).sort((a,b) => cityData.sectors[b] - cityData.sectors[a]).join(', ')}
    - 탄소중립 비전: "${cityData.vision}"
    `;

    return getAiChatResponse(cityName, '이 도시의 시민 실천방안을 제안해줘', context);
}
