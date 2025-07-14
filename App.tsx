
import React, { useState, useCallback } from 'react';
import { cityNames, reportData, typeData } from './constants.ts';
import { CityData, CityType, SectionID, ChatMessage } from './types.ts';
import { getAiChatResponse, generateCitizenActionPlan } from './services/geminiService.ts';
import { EmissionsChart, FinanceChart, TypeDistributionChart, CitySectorsChart } from './components/Charts.tsx';

// --- UI Helper Components ---

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const HighlightCard: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="bg-white border-l-4 border-teal-500 p-6 rounded-lg shadow-sm">
    {children}
  </div>
);

const Tag: React.FC<{ type: CityType }> = ({ type }) => {
    const typeStyles = {
        '산업도시형': 'bg-red-100 text-red-700',
        '농업중심형': 'bg-green-100 text-green-700',
        '도농복합형': 'bg-orange-100 text-orange-700',
        '해양·생태형': 'bg-blue-100 text-blue-700',
    };
    return <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${typeStyles[type]}`}>{type}</span>
}

const Loader: React.FC = () => (
    <div className="flex justify-center items-center h-full p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
    </div>
);

// --- Main Sections ---

const IntroSection: React.FC = () => (
    <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">전라남도 탄소중립, 무엇이 핵심인가?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
            본 대시보드는 2025년 전라남도 22개 모든 시·군이 수립한 '제1차 탄소중립 녹색성장 기본계획'을 종합 분석한 환경재단과 후즈굿의 연구보고서의 핵심 내용을 시각화한 것입니다. 2050 탄소중립이라는 국가적 목표 달성을 위해, 전라남도의 역할은 매우 중요합니다. 전남은 광활한 농경지와 갯벌, 풍부한 재생에너지 잠재력을 가진 기회의 땅이지만, 동시에 특정 산업에 치우친 온실가스 배출 구조라는 거대한 과제를 안고 있습니다.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <HighlightCard>
                <h3 className="font-bold text-lg text-gray-700 mb-2">보고서의 핵심 질문</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>시·군 계획은 지역 특성을 잘 반영하고 있는가?</li>
                    <li>계획들의 우수사례와 공통된 한계는 무엇인가?</li>
                    <li>계획의 성공을 위해 어떤 외부 지원이 필요한가?</li>
                </ul>
            </HighlightCard>
            <HighlightCard>
                <h3 className="font-bold text-lg text-gray-700 mb-2">핵심 발견</h3>
                <p className="text-gray-600">
                   전남의 탄소중립은 여수·광양 국가산단의 성패에 달려 있으며, 대부분의 시·군 계획은 외부 재원에 대한 의존도가 매우 높고 '구체적인 실행 방안이 부족'한 실정입니다. 하지만 '블루카본(해양탄소흡수원)'과 같은 전남만의 강력한 잠재력 또한 확인되었습니다.
                </p>
            </HighlightCard>
        </div>
        <p className="mt-8 text-sm text-center text-gray-500">상단 메뉴를 클릭하여 전라남도의 탄소중립 현황을 다각도로 탐색해보세요. 탑재한 AI는 22개 시군 탄소중립 기본계획의 모든 내용을 기초로 질문에 따라 추론하여 답변하도록 구성되었습니다.</p>
    </Card>
);

const OverviewSection: React.FC = () => (
    <div className="space-y-8">
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">전남의 현주소: 압도적 편중과 도전</h2>
            <p className="text-gray-600 mb-6">전라남도 전체 배출량의 81%가 단 두 개의 산업도시, 여수와 광양에서 발생합니다. 이는 전남의 탄소중립이 특정 지역, 특정 산업의 문제와 직결되어 있음을 의미합니다. 아래 차트는 이러한 극심한 편중 구조를 명확히 보여줍니다.</p>
            <div className="h-[600px] w-full">
                <EmissionsChart />
            </div>
            <p className="mt-4 text-sm text-center text-gray-500">차트의 막대에 마우스를 올리면 상세 정보를 확인할 수 있습니다.</p>
        </Card>
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">계획의 실현 가능성: 재정 투자 계획의 한계</h2>
            <p className="text-gray-600 mb-6">22개 시·군의 총 투자 계획 약 23.7조 원 중 시·군 자체 예산은 19.2%에 불과합니다. 특히 불확실성이 큰 민간 투자와 국비 의존도가 높아, 계획의 안정적인 이행을 위한 재원 조달 방안 마련이 시급한 과제입니다.</p>
            <div className="h-[150px] w-full">
                 <FinanceChart />
            </div>
        </Card>
    </div>
);

const TypesSection: React.FC = () => {
    const [activeType, setActiveType] = useState<CityType>('산업도시형');
    const typeInfo = typeData[activeType];

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">유형별 심층 분석: 다른 과제, 다른 해법</h2>
            <p className="text-gray-600 mb-6">22개 시·군을 배출 특성에 따라 4가지 유형으로 분류했습니다. 각 유형별로 직면한 과제와 필요한 해법이 다릅니다. 아래 버튼을 클릭하여 유형별 특징을 살펴보세요.</p>
            <div className="flex flex-wrap gap-2 md:gap-4 mb-6 justify-center">
                {(Object.keys(typeData) as CityType[]).map(type => (
                    <button key={type} onClick={() => setActiveType(type)} className={`px-4 py-2 rounded-full font-semibold transition ${activeType === type ? 'bg-[#1a535c] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                        {type === '산업도시형' ? '🏭' : type === '농업중심형' ? '🌾' : type === '도농복합형' ? '🏙️' : '🌊'} {type}
                    </button>
                ))}
            </div>
            <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-2 h-72">
                    <TypeDistributionChart cityType={activeType}/>
                </div>
                <div className="md:col-span-3">
                     <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2">{activeType} <Tag type={activeType}/></h3>
                     <p className="text-gray-600 mb-4">{typeInfo.description}</p>
                     <h4 className="font-semibold text-gray-700 mb-2">주요 과제:</h4>
                     <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
                        {typeInfo.challenges.map(c => <li key={c}>{c}</li>)}
                     </ul>
                     <h4 className="font-semibold text-gray-700 mb-2">해당 시·군:</h4>
                     <div className="flex flex-wrap gap-2">
                        {typeInfo.cities.map(c => <span key={c} className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">{c}</span>)}
                     </div>
                </div>
            </div>
        </Card>
    );
};

const DetailsSection: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>(cityNames[0]);
    const cityData = reportData[selectedCity];

    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: `이곳에 AI의 답변이 표시됩니다. 예: "${selectedCity}의 농업부문 주요 감축 전략은 무엇인가요?"` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading) return;
        const userMessage: ChatMessage = { sender: 'user', text: input };
        const loadingMessage: ChatMessage = { sender: 'loading', text: '' };
        
        setMessages(prev => [...prev, userMessage, loadingMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await getAiChatResponse(selectedCity, input);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev.slice(0, -1), aiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'ai', text: "오류가 발생했습니다. 다시 시도해주세요." };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, selectedCity]);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCity = e.target.value;
        setSelectedCity(newCity);
        setMessages([{ sender: 'ai', text: `"${newCity}"에 대해 무엇이든 물어보세요.` }]);
    }

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">시·군별 상세 분석</h2>
            <p className="text-gray-600 mb-6">관심 있는 시·군을 선택하여 해당 지역의 탄소중립 비전, 감축 목표, 배출 특성 등을 자세히 확인해보세요.</p>
            
            <div className="mb-6">
                <select id="citySelector" value={selectedCity} onChange={handleCityChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-[#1a535c] focus:border-[#1a535c]">
                    {cityNames.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">{selectedCity} <Tag type={cityData.type} /></h3>
                    <p className="text-gray-500 italic">"{cityData.vision}"</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">2018년 배출량</p><p className="text-2xl font-bold text-[#ff6b6b]">{cityData.emissions.toLocaleString()} <span className="text-sm font-normal">천톤</span></p></div>
                        <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">2030년 감축 목표</p><p className="text-2xl font-bold text-[#4ecdc4]">{cityData.rate}% <span className="text-sm font-normal">({cityData.reduction.toLocaleString()}천톤)</span></p></div>
                    </div>
                </div>
                <div className="h-64">
                    <h4 className="font-semibold text-center mb-2">부문별 배출구조</h4>
                    <CitySectorsChart cityData={cityData} />
                </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">✨ AI에게 무엇이든 물어보세요</h3>
                <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto mb-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AI</div>}
                            <div className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-white'}`}>
                                {msg.sender === 'loading' ? <Loader /> : <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a535c] focus:border-[#1a535c]" placeholder="선택된 시·군에 대해 질문해보세요..." disabled={isLoading}/>
                    <button onClick={handleSendMessage} disabled={isLoading} className="bg-[#1a535c] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#2c7a7b] transition-colors duration-300 disabled:bg-gray-400">
                        {isLoading ? '생각중...' : '전송'}
                    </button>
                </div>
            </div>
        </Card>
    );
};

const RecommendationsSection: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(cityNames[0]);

    const handleGenerateClick = async () => {
        setModalTitle(`✨ ${selectedCity} 시민 실천방안`);
        setModalOpen(true);
        setIsLoading(true);
        const content = await generateCitizenActionPlan(selectedCity);
        setModalContent(content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
        setIsLoading(false);
    };

    const PolicyCard: React.FC<{title: string, text:string}> = ({title, text}) => (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{text}</p>
        </div>
    );
    
    return (
        <Card>
            {modalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setModalOpen(false)}>
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-bold text-gray-800">{modalTitle}</h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto prose">
                            {isLoading ? <Loader /> : <div dangerouslySetInnerHTML={{ __html: modalContent }} />}
                        </div>
                    </div>
                </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">핵심 정책 제언: '선언'을 넘어 '실행'으로</h2>
            <div className="mb-8 p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
                <h3 className="font-bold text-lg text-teal-800 mb-2">✨ 우리 동네 시민 실천방안 AI 생성기</h3>
                <p className="text-teal-700 mb-3">아래에서 시·군을 선택하고 버튼을 누르면, Gemini AI가 해당 지역의 특성에 맞는 시민 실천 방안을 생성해줍니다.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                     <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="flex-grow p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                        {cityNames.map(name => <option key={name} value={name}>{name}</option>)}
                     </select>
                     <button onClick={handleGenerateClick} disabled={isLoading} className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:bg-gray-400">
                        {isLoading ? '생성중...' : '실천방안 생성'}
                    </button>
                </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#1a535c] mb-4 border-b-2 border-[#4ecdc4] pb-2">중앙정부 및 전라남도</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <PolicyCard title="광양만권 '탄소중립 산업 특구' 지정" text="R&D, 재정, 세제 혜택을 패키지로 집중 지원하여 국가산단의 저탄소 전환을 가속화해야 합니다." />
                  <PolicyCard title="'K-블루카본' 인증 및 거래제 구축" text="갯벌·해조류의 탄소흡수량을 공식 감축 실적으로 인정하고 거래할 수 있는 제도를 조속히 마련해야 합니다." />
                  <PolicyCard title="'전남형 저탄소 농업' 인센티브 지원" text="저탄소 농법 실천 농가에 대한 직불금 지급, 저탄소 인증 농산물 판로 개척 등 실질적 혜택을 제공해야 합니다." />
                </div>
              </div>
            </div>
        </Card>
    );
};


// --- App Component ---

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionID>('intro');

  const renderSection = () => {
    switch (activeSection) {
      case 'intro': return <IntroSection />;
      case 'overview': return <OverviewSection />;
      case 'types': return <TypesSection />;
      case 'details': return <DetailsSection />;
      case 'recommendations': return <RecommendationsSection />;
      default: return <IntroSection />;
    }
  };

  const NavButton: React.FC<{id: SectionID, children: React.ReactNode}> = ({ id, children }) => (
      <button 
          onClick={() => setActiveSection(id)} 
          className={`nav-btn py-3 px-2 md:px-4 font-semibold text-gray-500 hover:text-gray-800 transition-all duration-300 border-b-4 ${activeSection === id ? 'text-[#1a535c] border-[#1a535c]' : 'border-transparent'}`}
      >
          {children}
      </button>
  );

  return (
    <div className="text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">환경재단의 전라남도 22개 시·군 탄소중립기본계획 비교분석 대시보드(베타버전)</h1>
          <p className="text-gray-500 mt-1">22개 시·군 기본계획 종합 비교분석 (✨생성형AI 챗봇 탑재)</p>
        </div>
        <nav className="container mx-auto px-4 border-b border-gray-200">
          <div className="flex space-x-4 md:space-x-8 -mb-px">
            <NavButton id="intro">인트로</NavButton>
            <NavButton id="overview">전남의 현주소</NavButton>
            <NavButton id="types">유형별 분석</NavButton>
            <NavButton id="details">시·군별 상세</NavButton>
            <NavButton id="recommendations">정책 제언</NavButton>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {renderSection()}
      </main>

      <footer className="text-center py-6 bg-white mt-8 border-t">
        <p className="text-gray-500 text-sm">본 대시보드는 2025년 5월 공개된 탄소중립 기본계획을 기반으로 제작된 환경재단과 후즈굿의 인터랙티브 시각화 자료입니다.</p>
      </footer>
    </div>
  );
}
