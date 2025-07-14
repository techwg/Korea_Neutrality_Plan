
import { GoogleGenAI } from "@google/genai";
import { reportData } from '../constants.ts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const model = 'gemini-2.5-flash';

/**
 * Generates an AI response based on a city's data and a user's question.
 * This simulates a RAG pipeline by providing context from the report data.
 */
export async function getAiChatResponse(cityName: string, question: string): Promise<string> {
  const cityData = reportData[cityName];
  if (!cityData) {
    return `죄송합니다. '${cityName}'에 대한 데이터를 찾을 수 없습니다.`;
  }

  // Construct a detailed context from the available data
  const context = `
    - 비전: ${cityData.vision}
    - 2018년 배출량: ${cityData.emissions.toLocaleString()} 천톤CO₂eq
    - 2030년 감축 목표율: ${cityData.rate}%
    - 2030년 감축 목표량: ${cityData.reduction.toLocaleString()} 천톤CO₂eq
    - 부문별 배출 비중: ${JSON.stringify(cityData.sectors)}
    - 10년간 재정 투자 계획: 총 ${cityData.finance.total.toLocaleString()}억원 (자체 예산: ${cityData.finance.city.toLocaleString()}억원, 외부 재원: ${cityData.finance.external.toLocaleString()}억원)
    - 도시 유형: ${cityData.type}
  `;

  const prompt = `
# 페르소나
당신은 전라남도 '${cityName}'의 탄소중립 계획을 깊이 있게 이해하고, 핵심을 꿰뚫어 설명하는 최고 수준의 정책 분석 전문가입니다. 당신의 답변은 항상 친절하고, 명확하며, 사용자가 추가 질문을 할 필요가 없을 정도로 상세해야 합니다.

# 핵심 지시
주어진 '${cityName} 보고서 발췌 내용'을 전문가의 시각으로 분석하고, 사용자의 질문에 대해 '추론적 요약(Inferential Summary)' 방식으로 답변을 생성하세요.

## 추론적 요약의 규칙
1. **근거 기반 추론:** 답변의 모든 내용은 반드시 '보고서 발췌 내용'에 근거해야 합니다. 하지만 단순히 내용을 복사/붙여넣기 하지 마세요. 흩어져 있는 정보들을 논리적으로 연결하고 종합하여 질문의 의도에 맞는 새로운 통찰을 제공해야 합니다.
2. **맥락적 설명:** 정보가 부족하더라도 "정보가 없습니다"라고 단정적으로 말하지 마세요. 대신, "보고서에서는 주로 목표와 방향성을 제시하고 있으며, 이를 통해 유추해 볼 때 구체적인 실천 전략은 향후 다음과 같은 방향으로 수립될 것으로 보입니다..." 와 같이, 현재까지의 정보를 바탕으로 전문가적인 예측이나 해석을 덧붙여 설명해주세요.
3. **긍정적이고 적극적인 어조:** "알 수 없습니다", "제시되어 있지 않습니다" 와 같은 수동적이고 부정적인 표현 사용을 금지합니다. 대신 "보고서의 내용을 종합해 보면 다음과 같이 이해할 수 있습니다", "이 부분을 더 자세히 살펴보면..." 과 같이 능동적이고 자신감 있는 어조를 사용하세요.
4. **구조적 답변:** 답변은 항상 서론, 본론, 결론의 명확한 구조를 가지도록 구성하여 사용자의 이해를 도와주세요. Markdown을 활용하여 제목, 목록, 굵은 글씨 등으로 가독성을 높여주세요.

# 사용자 질문
"${question}"

# ${cityName} 보고서 발췌 내용
---
${context}
---

# 최종 산출물
위 규칙에 따라 생성된, 전문가의 상세하고 친절한 답변:
`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `AI 응답 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`;
  }
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

    const prompt = `
# 페르소나
당신은 지역 커뮤니티 전문가이자 환경 운동가입니다. 당신의 목표는 '${cityName}' 시민들이 일상 생활에서 탄소 중립을 실천할 수 있도록, 쉽고 구체적이며, 해당 지역의 특성을 완벽하게 반영한 '시민 실천 방안'을 제안하는 것입니다.

# 핵심 지시
주어진 '${cityName}의 핵심 정보'를 바탕으로, 해당 도시의 특성(예: ${cityData.type})에 맞는 시민 실천 방안을 다음 3가지 카테고리로 나누어 제안하세요. 각 카테고리별로 2-3개의 구체적인 행동을 제시해야 합니다.

1.  **🏡 가정에서 바로 시작하기:** 에너지 절약, 올바른 분리배출, 현명한 소비 등 집에서 할 수 있는 구체적인 행동.
2.  **🌳 우리 동네와 함께하기:** 지역 사회 활동, 대중교통 이용, 로컬푸드 소비 등 공동체와 함께 할 수 있는 행동.
3.  **📢 목소리 내기:** 지역의 탄소중립 정책에 대한 관심, 관련 캠페인 참여, 좋은 아이디어 제안 등 시민으로서 영향력을 발휘할 수 있는 행동.

# ${cityName}의 핵심 정보
---
${context}
---

# 최종 산출물
위 규칙에 따라 생성된, '${cityName}' 시민들을 위한 맞춤형 실천 방안 (반드시 Markdown 목록 형태로 명료하게 정리):
`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return `시민 실천 방안 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`;
    }
}
