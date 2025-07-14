import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const model = 'gemini-2.5-flash';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { cityName, question, context } = req.body;
  if (!cityName || !question) {
    return res.status(400).json({ error: 'cityName and question are required' });
  }

  // context는 선택적으로 받음
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
${context || ''}
---

# 최종 산출물
위 규칙에 따라 생성된, 전문가의 상세하고 친절한 답변:
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });
    res.status(200).json({ result: response.text });
  } catch (error) {
    res.status(500).json({ error: 'AI 응답 생성 중 오류가 발생했습니다.' });
  }
} 