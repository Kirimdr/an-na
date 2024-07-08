const canvas = document.getElementById('futuristic-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let hue = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 300;  // Durée de vie augmentée
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        if (this.size > 0.1) this.size -= 0.05;  // Diminution de la taille plus lente
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function addParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle(x, y));
    }
}

function handleParticles() {
    for (let i = particlesArray.length - 1; i >= 0; i--) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i - 1; j >= 0; j--) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.hypot(dx, dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].life <= 0) {
            particlesArray.splice(i, 1);
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue = (hue + 1) % 360;
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', (event) => {
    addParticles(event.x, event.y, 5);
});

canvas.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    addParticles(touch.clientX, touch.clientY, 5);
});

function triggerConfetti() {
    for (let i = 0; i < 300; i++) {
        addParticles(Math.random() * canvas.width, Math.random() * canvas.height, 1);
    }
}

const hintBtn = document.getElementById('hint-btn');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const cakeBtn = document.getElementById('cake-btn');
const finalBtn = document.getElementById('final-btn');
const question = document.getElementById('question');

hintBtn.addEventListener('click', () => {
    question.textContent = "Bah c'est moi, tape Kiri";
});

submitBtn.addEventListener('click', () => {
    if (answerInput.value.toLowerCase() === 'kiri') {
        triggerConfetti();
        setTimeout(() => {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
            hintBtn.style.display = 'none';
            answerInput.style.display = 'none';
            question.textContent = "Joyeux Anniversaire Milan Anna!";
        }, 3000);
    }
});

nextBtn.addEventListener('click', () => {
    cakeBtn.style.display = 'block';
    nextBtn.style.display = 'none';
});

cakeBtn.addEventListener('click', () => {
    question.textContent = "Le gâteau arrive, patience !";
    triggerConfetti();
    setTimeout(() => {
        finalBtn.style.display = 'block';
        cakeBtn.style.display = 'none';
    }, 2000);
});

finalBtn.addEventListener('click', () => {
    question.textContent = "Bon anniversaire, profite bien ! Ça grandit maintenant, t'es devenu un vrai mama mdrr";
    finalBtn.style.display = 'none';
    triggerConfetti();
});

animate();
