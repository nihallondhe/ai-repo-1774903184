// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Dark/light mode toggle
const modeToggle = document.createElement('button');
modeToggle.id = 'modeToggle';
modeToggle.textContent = '🌙';
modeToggle.style.position = 'fixed';
modeToggle.style.top = '20px';
modeToggle.style.right = '20px';
modeToggle.style.zIndex = '1000';
modeToggle.style.padding = '10px';
modeToggle.style.borderRadius = '50%';
modeToggle.style.border = 'none';
modeToggle.style.cursor = 'pointer';
modeToggle.style.fontSize = '1.5rem';
modeToggle.style.background = 'var(--bg-color, #f0f0f0)';
modeToggle.style.color = 'var(--text-color, #333)';

document.body.appendChild(modeToggle);

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleButton(savedTheme);

// Toggle function
modeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
});

function updateToggleButton(theme) {
    modeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    modeToggle.style.background = theme === 'light' ? '#f0f0f0' : '#333';
    modeToggle.style.color = theme === 'light' ? '#333' : '#f0f0f0';
}

// Add basic CSS variables for theming
const style = document.createElement('style');
style.textContent = `
    :root {
        --bg-color: #ffffff;
        --text-color: #333333;
        --transition-speed: 0.3s;
    }

    [data-theme="dark"] {
        --bg-color: #121212;
        --text-color: #f0f0f0;
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-color);
        transition: background-color var(--transition-speed), color var(--transition-speed);
        margin: 0;
        padding: 20px;
        min-height: 200vh; /* For scroll demonstration */
        font-family: sans-serif;
    }

    section {
        margin: 100px 0;
        padding: 50px;
        border: 1px solid #ccc;
    }

    [data-theme="dark"] section {
        border-color: #444;
    }
`;
document.head.appendChild(style);