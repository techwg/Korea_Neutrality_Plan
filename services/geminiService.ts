
const API_ENDPOINT = '/api/gemini';

async function callApi(body: object): Promise<string> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("API Error:", data.error, data.details);
        return `API 요청 중 오류가 발생했습니다: ${data.error || response.statusText}`;
    }

    return data.text;
  } catch (error) {
    console.error("Fetch Error:", error);
    return `AI 응답을 가져오는 중 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`;
  }
}

export async function getAiChatResponse(cityName: string, question: string): Promise<string> {
    if (!cityName || !question.trim()) {
        return "도시를 선택하고 질문을 입력해주세요.";
    }
    return callApi({
        action: 'chat',
        cityName,
        question,
    });
}

export async function generateCitizenActionPlan(cityName: string): Promise<string> {
    if (!cityName) {
        return "도시를 선택해주세요.";
    }
    return callApi({
        action: 'plan',
        cityName,
    });
}
