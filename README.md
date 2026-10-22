# SION.JIN — Red Orange Portfolio (Case Study edition)

VS Code에서 `index.html`을 Live Server로 열면 됩니다. 별도의 빌드 도구 없이 GitHub Pages에서 배포할 수 있습니다.

## 이번 수정

- 사용자 제공 레퍼런스 이미지에서 추출한 근사 컬러를 적용했습니다: `#F33800` (Red Orange), `#F5F5F5` (Off-white), `#1E130C` (Deep Brown-Black), `#080808` (Near Black).
- SUIT 웹폰트와 첫 번째 아이보리 포트폴리오의 타이포/히어로 구성을 유지했습니다.
- 대표 프로젝트를 THE CLASS → ONYOURFIT → AMS WEBSITES → SAOGONGAM 순서로 한 줄에 하나씩 배치했습니다.
- 기존 프로젝트 요약 팝업을 삭제하고, 카드 클릭 시 `projects/`의 네 개 상세 HTML 페이지로 이동합니다.
- 이미지 자동 슬라이더, 모바일 메뉴, 스크롤 효과를 유지했습니다.
- AI PRODUCT VISUAL 독립 프로젝트는 사용자 요청에 따라 목록에서 삭제하고, AI 이미지 경험은 ONYOURFIT 안에 포함시켰습니다.

## 프로젝트 이미지

`assets/images/`의 작업물은 사용자가 제공한 포트폴리오 PDF에서 추출한 실제 작업물입니다. ONYOURFIT의 최신 작업 이미지 및 AMS 세 도메인 실제 사이트 캡처는 제공되지 않아 임시 이미지로 위장하지 않았습니다. 추후 각 HTML의 자리표시자를 실제 고해상도 이미지로 교체해 주세요.

AMS 상세 페이지에는 실제 도메인 링크가 있습니다.
- https://ams-diecasting.com/
- https://amsmagnet.co.kr/
- https://ams-tape.com/

## 수정 장소

- `index.html` — 메인 화면/프로젝트 소개
- `css/theme-orange.css` — 새 팔레트, 프로젝트 카드, 상세 페이지 스타일
- `projects/theclass.html`, `onyourfit.html`, `ams.html`, `saogongam.html` — 각각의 케이스 스터디
- `js/main.js` — 자동 슬라이더, 반응형 메뉴, 스크롤

## 게시 전 체크

- 실제 원본/고해상도 작업 이미지로 교체
- 본인의 프로젝트 기여 범위 및 내용 최종 확인
- 더클래스 이탈률 자료 원본 확인 후 사용 수치 확정
- 회사 작업물 외부 공개 허가 확인
- 연락처/이력서 PDF 링크 및 개인정보 공개 범위 확인
- 배포 도메인 확정 후 og:image, canonical 및 og:url 추가

SUIT 폰트는 CDN으로 불러오며 폰트 파일은 포함하지 않습니다.
