console.log('UA Kozaki CS2 site loaded');

// Показуємо інформацію про користувача після логіну
window.onload = function() {
    const userInfo = document.getElementById('user-info');
    if (window.user) {
        userInfo.innerHTML = `<h2>Привіт, ${user.displayName}</h2>
                              <img src="${user.photos[0].value}" alt="avatar">`;
    }
};
