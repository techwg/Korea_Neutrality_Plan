
import { ReportData, TypeData } from './types.ts';

export const reportData: ReportData = {
    '여수시': { type: '산업도시형', emissions: 46263, reduction: 16935, rate: 36.6, vision: "지속가능한 자원순환으로 시민과 함께하는 2050 탄소중립도시 여수", sectors: {'산업': 95.9, '건물': 1.6, '수송': 1.8, '기타': 0.7}, finance: {total: 98171, city: 7656, external: 90515} },
    '광양시': { type: '산업도시형', emissions: 29208, reduction: 9638, rate: 33.0, vision: "지속가능한 미래성장, 스마트 그린도시 광양", sectors: {'산업': 95.2, '건물': 1.4, '수송': 2.1, '기타': 1.3}, finance: {total: 49880, city: 6389, external: 43491} },
    '순천시': { type: '도농복합형', emissions: 2829, reduction: 1273, rate: 45.0, vision: "시민과 함께 만드는 대한민국 생태수도, 2050 탄소중립", sectors: {'산업': 35.8, '건물': 20.5, '수송': 20.1, '농업': 18.5, '폐기물': 5.1}, finance: {total: 18340, city: 4243, external: 14097} },
    '나주시': { type: '농업중심형', emissions: 2752, reduction: 1238, rate: 45.0, vision: "시민과 함께 만들어 가는 에너지수도 나주, 2050 탄소중립 실현", sectors: {'농업': 58.7, '산업': 15.3, '건물': 9.8, '수송': 12.1, '폐기물': 4.1}, finance: {total: 16881, city: 3658, external: 13223} },
    '해남군': { type: '농업중심형', emissions: 2056, reduction: 925, rate: 45.0, vision: "땅끝에서 시작하는 청정 해남, 2050 탄소중립", sectors: {'농업': 70.1, '산업': 10.5, '수송': 10.9, '건물': 6.8, '폐기물': 1.7}, finance: {total: 7842, city: 2352, external: 5490} },
    '영암군': { type: '농업중심형', emissions: 1846, reduction: 831, rate: 45.0, vision: "월출산의 청정에너지로 실현하는 2050 탄소중립 영암", sectors: {'농업': 62.3, '산업': 15.8, '수송': 14.2, '건물': 6.2, '폐기물': 1.5}, finance: {total: 6523, city: 1879, external: 4644} },
    '목포시': { type: '도농복합형', emissions: 1489, reduction: 596, rate: 40.0, vision: "시민과 함께 만드는 지속가능한 미래, 탄소중립 선도도시 목포", sectors: {'건물': 38.2, '수송': 34.5, '산업': 17.5, '폐기물': 9.8}, finance: {total: 11041, city: 3159, external: 7882} },
    '무안군': { type: '농업중심형', emissions: 1440, reduction: 648, rate: 45.0, vision: "군민과 함께 여는 새로운 시대, 희망무안", sectors: {'농업': 55.4, '수송': 18.2, '건물': 14.3, '산업': 9.5, '폐기물': 2.6}, finance: {total: 5880, city: 1764, external: 4116} },
    '영광군': { type: '해양·생태형', emissions: 1417, reduction: 638, rate: 45.0, vision: "에너지 신산업을 선도하는 탄소중립 영광", sectors: {'농업': 41.2, '산업': 35.1, '수송': 13.5, '건물': 8.1, '폐기물': 2.1}, finance: {total: 10250, city: 3075, external: 7175} },
    '고흥군': { type: '농업중심형', emissions: 1327, reduction: 597, rate: 45.0, vision: "지붕없는 미술관, 10년 후 고흥", sectors: {'농업': 65.2, '수송': 13.8, '건물': 9.1, '산업': 9.8, '폐기물': 2.1}, finance: {total: 4521, city: 1356, external: 3165} },
    '화순군': { type: '도농복합형', emissions: 1275, reduction: 574, rate: 45.0, vision: "모두가 누리는 지속가능한 화순", sectors: {'산업': 38.2, '농업': 25.4, '수송': 19.8, '건물': 12.5, '폐기물': 4.1}, finance: {total: 6254, city: 1876, external: 4378} },
    '함평군': { type: '농업중심형', emissions: 988, reduction: 445, rate: 45.0, vision: "군민과 함께 만드는 지속가능한 함평", sectors: {'농업': 72.3, '수송': 11.5, '건물': 7.5, '산업': 6.8, '폐기물': 1.9}, finance: {total: 3678, city: 1103, external: 2575} },
    '강진군': { type: '농업중심형', emissions: 891, reduction: 401, rate: 45.0, vision: "소통·연결·창조의 신 강진", sectors: {'농업': 68.1, '수송': 13.2, '건물': 8.5, '산업': 8.2, '폐기물': 2.0}, finance: {total: 3321, city: 996, external: 2325} },
    '장흥군': { type: '농업중심형', emissions: 818, reduction: 368, rate: 45.0, vision: "어머니 품 같은 따뜻한 탄소중립 장흥", sectors: {'농업': 67.5, '수송': 14.1, '건물': 8.9, '산업': 7.5, '폐기물': 2.0}, finance: {total: 2987, city: 896, external: 2091} },
    '담양군': { type: '해양·생태형', emissions: 805, reduction: 362, rate: 45.0, vision: "군민과 자연이 함께하는 지속가능한 담양", sectors: {'농업': 52.8, '수송': 18.9, '건물': 13.5, '산업': 11.2, '폐기물': 3.6}, finance: {total: 3125, city: 938, external: 2187} },
    '장성군': { type: '해양·생태형', emissions: 772, reduction: 347, rate: 45.0, vision: "새로운 장성, 군민과 함께", sectors: {'농업': 51.5, '산업': 18.5, '수송': 15.8, '건물': 11.1, '폐기물': 3.1}, finance: {total: 2899, city: 870, external: 2029} },
    '보성군': { type: '농업중심형', emissions: 761, reduction: 342, rate: 45.0, vision: "꿈과 행복이 넘치는 희망찬 보성", sectors: {'농업': 69.2, '수송': 12.8, '건물': 8.3, '산업': 7.8, '폐기물': 1.9}, finance: {total: 2765, city: 830, external: 1935} },
    '완도군': { type: '해양·생태형', emissions: 647, reduction: 291, rate: 45.0, vision: "해양치유와 블루카본을 선도하는 탄소중립 완도", sectors: {'수송': 27.4, '농업': 34.0, '건물': 18.4, '산업': 17.5, '폐기물': 2.7}, finance: {total: 2543, city: 763, external: 1780} },
    '곡성군': { type: '해양·생태형', emissions: 565, reduction: 254, rate: 45.0, vision: "군민이 행복하고 안전한 기후 안심도시 곡성", sectors: {'농업': 54.1, '수송': 18.2, '건물': 12.8, '산업': 11.8, '폐기물': 3.1}, finance: {total: 1987, city: 596, external: 1391} },
    '진도군': { type: '농업중심형', emissions: 506, reduction: 228, rate: 45.0, vision: "군민과 함께 만드는 활기찬 진도", sectors: {'농업': 63.5, '수송': 16.5, '건물': 9.8, '산업': 8.5, '폐기물': 1.7}, finance: {total: 1898, city: 569, external: 1329} },
    '신안군': { type: '해양·생태형', emissions: 510, reduction: 229, rate: 45.0, vision: "세계 최고의 갯벌과 함께하는 탄소중립의 섬 신안", sectors: {'수송': 33.1, '산업': 25.2, '농업': 18.9, '건물': 15.8, '폐기물': 7.0}, finance: {total: 22500, city: 675, external: 21825} },
    '구례군': { type: '해양·생태형', emissions: 338, reduction: 152, rate: 45.0, vision: "자연이 살아있는 기후 안심도시 구례", sectors: {'농업': 48.2, '수송': 20.1, '건물': 15.1, '산업': 13.5, '폐기물': 3.1}, finance: {total: 1987, city: 596, external: 1391} }
};

export const typeData: TypeData = {
    '산업도시형': { cities: ['여수시', '광양시'], description: '국가산업단지가 입지하여 산업 부문 배출량이 90% 이상을 차지하는 절대적 편중 구조입니다. 전라남도 탄소중립의 성패를 좌우하는 핵심 지역입니다.', challenges: ['대규모 장치산업의 저탄소 공정 전환', 'CCUS 등 신기술 도입 및 막대한 투자 재원 확보', '에너지 다소비 구조 개선'], sectors: {'산업': 95.5, '기타': 4.5} },
    '농업중심형': { cities: ['나주시', '해남군', '영암군', '고흥군', '무안군', '강진군', '함평군', '장흥군', '보성군', '진도군'], description: '농업 부문(벼 재배, 축산 등)의 온실가스 배출 비중이 50%를 초과하는 유형입니다. 저탄소 농업기술 보급과 가축분뇨의 자원화가 핵심 과제입니다.', challenges: ['영세·고령 농가의 저탄소 농법 참여 유도', '가축분뇨 처리시설의 경제성 및 주민수용성 확보', '기후변화에 따른 작물 재배 영향'], sectors: {'농업': 65, '산업': 12, '수송': 13, '건물': 8, '폐기물': 2} },
    '도농복합형': { cities: ['순천시', '목포시', '화순군'], description: '도시와 농촌의 특성이 혼재하여 건물, 수송, 농업 등 여러 부문에서 배출량이 비교적 고르게 분포합니다. 다방면에 걸친 균형 잡힌 정책이 필요합니다.', challenges: ['노후 건물의 에너지 효율 개선', '대중교통 시스템의 효율화', '다양한 배출원에 대한 통합 관리'], sectors: {'산업': 30, '건물': 25, '수송': 25, '농업': 15, '폐기물': 5} },
    '해양·생태형': { cities: ['영광군', '담양군', '장성군', '완도군', '곡성군', '신안군', '구례군'], description: '총배출량은 적으나, 풍부한 산림·갯벌 등 탄소흡수원 잠재력이 매우 큰 유형입니다. 블루카본, 그린카본 확충이 핵심 전략이며, 신재생에너지의 중심지이기도 합니다.', challenges: ['블루카본 흡수량 산정 방법론 및 제도 부재', '재생에너지 발전의 주민수용성 및 이익공유', '생태자원의 보전과 활용의 조화'], sectors: {'농업': 40, '산업': 20, '수송': 20, '건물': 15, '폐기물': 5} }
};

export const cityNames = Object.keys(reportData);

export const SECTOR_COLORS = ['#ff6b6b', '#ff9800', '#4ecdc4', '#2196f3', '#7e57c2', '#fbc02d'];
export const FINANCE_COLORS = { '시·군비': '#1a535c', '국비': '#4ecdc4', '도비': '#a8dadc', '민자 등': '#ff6b6b' };
