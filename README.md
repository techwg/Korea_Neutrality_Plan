# 전라남도 탄소중립기본계획 대시보드

환경재단의 전라남도 22개 시·군 탄소중립기본계획 비교분석 대시보드입니다.

## 🚀 Vercel 배포 방법

### 1. GitHub에 코드 푸시
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel에서 프로젝트 연결
1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. Framework Preset: "Vite" 선택
5. Build Command: `npm run build` (기본값)
6. Output Directory: `dist` (기본값)

### 3. 배포
"Deploy" 버튼을 클릭하여 배포를 시작합니다.

**참고**: Gemini API 키가 이미 `vite.config.ts`에 설정되어 있어 별도의 환경 변수 설정이 필요하지 않습니다.

## 🔧 로컬 개발

```bash
npm install
npm run dev
```

## 📁 프로젝트 구조

- `App.tsx`: 메인 애플리케이션 컴포넌트
- `components/Charts.tsx`: 차트 컴포넌트들
- `services/geminiService.ts`: AI 서비스
- `constants.ts`: 데이터 상수
- `types.ts`: TypeScript 타입 정의

## 🐛 문제 해결

### 화면이 하얗게 나오는 경우
1. 브라우저 개발자 도구에서 콘솔 오류 확인
2. 네트워크 탭에서 API 호출 오류 확인
3. Vercel 로그에서 빌드 오류 확인

### 빌드 오류
1. `npm install`로 의존성 재설치
2. TypeScript 오류 확인: `npm run type-check`
3. Vercel 로그에서 빌드 오류 확인

## 🔑 API 키 설정

Gemini API 키가 이미 `vite.config.ts` 파일에 설정되어 있습니다. 로컬 개발 시에는 별도의 환경 변수 설정이 필요하지 않습니다.
