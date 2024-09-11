new Vue({
  el: '#app', // Assurez-vous que l'ID 'app' est correct dans l'HTML
  data: {
    totalScore: 76,
    resultMessage: 'Great',
    testResults: [
      { category: 'Reaction', score: 80, icon: './assets/images/icon-reaction.svg' },
      { category: 'Memory', score: 92, icon: './assets/images/icon-memory.svg' },
      { category: 'Verbal', score: 61, icon: './assets/images/icon-verbal.svg' },
      { category: 'Visual', score: 72, icon: './assets/images/icon-visual.svg' }
    ]
  }
});
