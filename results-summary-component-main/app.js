new Vue({
    el: '#app',
    data() {
      return {
        testResults: [
          { category: 'Reaction', score: 80, icon: './assets/images/icon-reaction.svg' },
          { category: 'Memory', score: 92, icon: './assets/images/icon-memory.svg' },
          { category: 'Verbal', score: 61, icon: './assets/images/icon-verbal.svg' },
          { category: 'Visual', score: 72, icon: './assets/images/icon-visual.svg' }
        ]
      };
    },
    computed: {
      totalScore() {
        const total = this.testResults.reduce((acc, test) => acc + test.score, 0);
        return Math.floor(total / this.testResults.length);
      },
      resultMessage() {
        const score = this.totalScore;
        if (score >= 85) return 'Excellent';
        if (score >= 70) return 'Great';
        if (score >= 50) return 'Good';
        return 'Keep Trying';
      }
    }
  });
  