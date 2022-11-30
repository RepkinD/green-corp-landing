const INCREASE_NUMBER_ANIMATION_SPEED = 50;
let animationInited = false;

function increaseNumberAnimationStep(i, element, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      element.innerText = i + '+';
    } else {
      element.innerText = i;
    }

    i += 100;

    setTimeout(function () {
      increaseNumberAnimationStep(i, element, endNumber);
    }, INCREASE_NUMBER_ANIMATION_SPEED);
  }
}

function initIncreaseNumberAnimation() {
  const element = document.querySelector('.features__clients-count');

  increaseNumberAnimationStep(0, element, 5000);
}

/*добавление класса header__scrolled в header при скролле*/
function updateScroll() {
  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('header__scrolled');
  } else {
    document.querySelector('header').classList.remove(
      'header__scrolled'
    );
  }

  // Запуск анимации увеличения числа
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector(
    '.features__clients-count'
  ).offsetTop;

  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }
}

window.addEventListener('scroll', updateScroll);


/*добавление поля input для form перед button при клике Другое в select*/
document.querySelector('#budget').addEventListener('change',
  function handleSelectChange(event) {
    if (event.target.value === 'other') {
      const formContainer = document.createElement('div');
      formContainer.classList.add('form__group');
      formContainer.classList.add('form__other-input');

      const input = document.createElement('input');
      input.classList.add('form_input');
      input.type = "text";
      input.placeholder = "Введите ваш вариант";

      formContainer.appendChild(input);
      document.querySelector('.form_form').insertBefore(formContainer,
        document.querySelector('.form__submit')
      );
    }

    const otherInput = document.querySelector('.form__other-input');
    if (event.target.value !== 'other' && otherInput) {
      document.querySelector('.form_form').removeChild(otherInput);
    }
  });


/*плавный скролл при нажатии на разделы Контакты и Узнать подробнее*/
function addSmoothScroll(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  addSmoothScroll(anchor);
});

addSmoothScroll(document.querySelector('.more-button'));

function onLinkClick(event) {
  event.preventDefault();

  document.querySelector(event.target.getAttribute('href'))
    .scrollIntoView({ behavior: 'smooth' });
}