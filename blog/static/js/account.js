document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('.form-tab')];
  const forms = {
    login: document.querySelector('#login-panel'),
    register: document.querySelector('#register-panel'),
  };
  const tabsWrap = document.querySelector('.form-tabs');
  const heading = document.querySelector('#form-heading');
  const eyebrow = document.querySelector('#form-eyebrow');
  const intro = document.querySelector('#form-intro');
  const message = document.querySelector('#form-message');

  function showMode(mode, announce = false) {
    const isRegister = mode === 'register';
    tabsWrap.classList.toggle('is-register', isRegister);
    tabs.forEach(tab => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    forms.login.hidden = isRegister;
    forms.register.hidden = !isRegister;
    heading.innerHTML = isRegister ? 'Create your <em>account.</em>' : 'Sign in to <em>Fieldnotes.</em>';
    eyebrow.textContent = isRegister ? 'Make yourself at home' : 'Welcome back';
    intro.textContent = isRegister ? 'A few details and you’re in.' : 'Pick up where you left off.';
    if (message) message.hidden = true;
    if (announce) {
      const firstInput = forms[mode].querySelector('input:not([type="hidden"]):not([type="checkbox"])');
      if (firstInput) firstInput.focus();
    }
  }

  tabs.forEach(tab => tab.addEventListener('click', () => showMode(tab.dataset.mode)));
  document.querySelectorAll('[data-switch]').forEach(button => button.addEventListener('click', () => showMode(button.dataset.switch, true)));
  tabsWrap.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const mode = event.key === 'ArrowRight' ? 'register' : 'login';
      showMode(mode, true);
    }
  });

  document.querySelectorAll('[data-password-target]').forEach(button => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.passwordTarget);
    if (!input) return;
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    button.textContent = reveal ? 'Hide' : 'Show';
    button.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
  }));

  forms.register.addEventListener('submit', event => {
    const password = forms.register.querySelector('#register-password');
    const confirmation = forms.register.querySelector('#register-confirm');
    if (password.value !== confirmation.value) {
      event.preventDefault();
      confirmation.setCustomValidity('These passwords do not match.');
      confirmation.reportValidity();
      confirmation.addEventListener('input', () => confirmation.setCustomValidity(''), { once: true });
    }
  });

  document.querySelectorAll('[data-placeholder-link]').forEach(link => link.addEventListener('click', event => event.preventDefault()));
});
