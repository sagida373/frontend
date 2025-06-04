// js/reviews.js

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card-body').forEach(function(cardBody) {
    const randomRating = (Math.random() * 2 + 3).toFixed(1);
    
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating';
    ratingDiv.textContent = `⭐ ${randomRating}/5`;
    cardBody.appendChild(ratingDiv);
    
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.textContent = '👍 0';
    cardBody.appendChild(likeBtn);
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('like-btn')) {
      const count = parseInt(e.target.textContent.replace('👍 ', '')) || 0;
      e.target.textContent = `👍 ${count + 1}`;
    }
  });

  document.querySelectorAll('.row > div').forEach(function(card, index) {
    card.dataset.index = index;
  });

  document.getElementById('filter-reviews').addEventListener('change', function() {
    const value = this.value;
    const cards = Array.from(document.querySelectorAll('.row > div'));
    
    switch(value) {
      case 'new':
        cards.sort((a, b) => b.dataset.index - a.dataset.index);
        break;
      case 'old':
        cards.sort((a, b) => a.dataset.index - b.dataset.index);
        break;
      case 'popular':
        cards.sort((a, b) => {
          const likesA = parseInt(a.querySelector('.like-btn').textContent.replace('👍 ', '')) || 0;
          const likesB = parseInt(b.querySelector('.like-btn').textContent.replace('👍 ', '')) || 0;
          return likesB - likesA;
        });
        break;
    }
    
    const row = document.querySelector('.row');
    row.innerHTML = '';
    cards.forEach(card => row.appendChild(card));
  });
});
