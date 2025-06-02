const questions = [
  { q: "파일 탐색기 열기 (VSCode)", a: "Ctrl + Shift + E" },
  { q: "명령 팔레트 열기 (VSCode)", a: "Ctrl + Shift + P" },
  { q: "파일 찾기 (VSCode)", a: "Ctrl + P" },
  { q: "코드 자동 정렬 (VSCode)", a: "Shift + Alt + F" },
  { q: "터미널 열기 (VSCode)", a: "Ctrl + `" },
  { q: "주석 처리 (VSCode)", a: "Ctrl + /" },
  { q: "한 줄 삭제 (VSCode)", a: "Ctrl + Shift + K" },
  { q: "정의로 이동 (VSCode)", a: "F12" },
  { q: "변수 이름 바꾸기 (VSCode)", a: "F2" },
  { q: "모두 선택 (VSCode)", a: "Ctrl + A" },

  { q: "컴포넌트 만들기 (Figma)", a: "Ctrl + Alt + K" },
  { q: "그리드 보기 (Figma)", a: "Ctrl + G" },
  { q: "프레임 생성 (Figma)", a: "F" },
  { q: "그룹 만들기 (Figma)", a: "Ctrl + G" },
  { q: "정렬 가운데 (Figma)", a: "Shift + A" },

  { q: "현재 날짜 입력 (Excel)", a: "Ctrl + ;" },
  { q: "현재 시간 입력 (Excel)", a: "Ctrl + Shift + ;" },
  { q: "새 워크북 만들기 (Excel)", a: "Ctrl + N" },
  { q: "셀 복사 (Excel)", a: "Ctrl + C" },
  { q: "셀 붙여넣기 (Excel)", a: "Ctrl + V" },

  { q: "저장 (공통)", a: "Ctrl + S" },
  { q: "되돌리기 (공통)", a: "Ctrl + Z" },
  { q: "다시 실행 (공통)", a: "Ctrl + Y" },
  { q: "새 문서 만들기 (공통)", a: "Ctrl + N" },
  { q: "찾기 (공통)", a: "Ctrl + F" },

  { q: "브라우저 새 탭 열기 (Chrome)", a: "Ctrl + T" },
  { q: "탭 닫기 (Chrome)", a: "Ctrl + W" },
  { q: "닫은 탭 다시 열기 (Chrome)", a: "Ctrl + Shift + T" },
  { q: "전체화면 (Chrome)", a: "F11" },
  { q: "페이지 새로고침 (Chrome)", a: "F5" }
];

let currentIndex = 0;
let currentQuestion = {};
let usedIndexes = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (usedIndexes.length === questions.length) {
    document.getElementById("question").innerText = "🎉 퀴즈 완료!";
    document.querySelector(".choices").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  do {
    currentIndex = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.includes(currentIndex));

  usedIndexes.push(currentIndex);
  currentQuestion = questions[currentIndex];
  document.getElementById("question").innerText = "❓ " + currentQuestion.q;

  const allAnswers = questions.map(q => q.a);
  const choices = shuffle([
    currentQuestion.a,
    ...shuffle(allAnswers.filter(a => a !== currentQuestion.a)).slice(0, 3)
  ]);

  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach((btn, i) => {
    btn.innerText = choices[i];
    btn.disabled = false;
    btn.style.background = "#383856";
  });

  document.getElementById("feedback").innerText = "";
}

function checkAnswer(button) {
  const isCorrect = button.innerText === currentQuestion.a;
  document.getElementById("feedback").innerText = isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다!";
  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach(btn => btn.disabled = true);
  if (!isCorrect) {
    button.style.background = "#aa3d3d";
    buttons.forEach(btn => {
      if (btn.innerText === currentQuestion.a) {
        btn.style.background = "#2d804f";
      }
    });
  } else {
    button.style.background = "#2d804f";
  }
}

function nextQuestion() {
  loadQuestion();
}

window.onload = loadQuestion;
