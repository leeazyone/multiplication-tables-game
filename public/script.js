let currentProblem = null

async function fetchProblem() {
  const response = await fetch('/generate-problem')
  const problem = await response.json()
  document.getElementById(
    'problem'
  ).innerText = `${problem.multiplicand} x ${problem.multiplier}`
  currentProblem = problem
}

async function submitAnswer() {
  const answer = document.getElementById('answer').value
  if (!currentProblem) {
    document.getElementById('feedback').innerText =
      '문제를 가져오는 중입니다. 잠시 후 다시 시도하세요.'
    return
  }

  const response = await fetch('/check-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      multiplicand: currentProblem.multiplicand,
      multiplier: currentProblem.multiplier,
      answer: answer,
    }),
  })

  const result = await response.json()
  document.getElementById('feedback').innerText = result.correct
    ? '정답입니다!'
    : '틀렸습니다. 다시 시도하세요.'
  document.getElementById('answer').value = ''
  fetchProblem() // 새로운 문제 가져오기
}

// 페이지 로드 시 첫 문제 가져오기
fetchProblem()
