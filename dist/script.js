"use strict";
(() => {
    let isYear = true;
    const elements = {
        loanAmountEl: null,
        interestRateEl: null,
        interestSlider: null,
        loanTenureEl: null,
        startDateEl: null,
        emiOutput: null,
        interestOutput: null,
        paymentOutput: null,
        yearBtn: null,
        monthBtn: null,
        lightBtn: null,
        darkBtn: null,
        calculateBtn: null,
        clearBtn: null,
        loanTypeRadios: null
    };
    function calculateEMI() {
        if (!elements.loanAmountEl || !elements.interestRateEl || !elements.loanTenureEl ||
            !elements.emiOutput || !elements.interestOutput || !elements.paymentOutput)
            return;
        const P = parseFloat(elements.loanAmountEl.value);
        const annualRate = parseFloat(elements.interestRateEl.value);
        const R = annualRate / 12 / 100;
        let N = parseInt(elements.loanTenureEl.value);
        N = isYear ? N * 12 : N;
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalPayment = emi * N;
        const totalInterest = totalPayment - P;
        elements.emiOutput.textContent = Math.round(emi).toLocaleString('en-IN');
        elements.interestOutput.textContent = Math.round(totalInterest).toLocaleString('en-IN');
        elements.paymentOutput.textContent = Math.round(totalPayment).toLocaleString('en-IN');
    }
    function clearFields() {
        if (!elements.loanAmountEl || !elements.interestRateEl || !elements.interestSlider ||
            !elements.loanTenureEl || !elements.startDateEl || !elements.emiOutput ||
            !elements.interestOutput || !elements.paymentOutput)
            return;
        elements.loanAmountEl.value = '';
        elements.interestRateEl.value = '';
        elements.interestSlider.value = '9';
        elements.loanTenureEl.value = '';
        elements.startDateEl.value = '';
        elements.emiOutput.textContent = '-';
        elements.interestOutput.textContent = '-';
        elements.paymentOutput.textContent = '-';
    }
    function toggleTheme(mode) {
        if (typeof document !== 'undefined') {
            document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
        }
    }
    function setupElements() {
        if (typeof document !== 'undefined') {
            elements.loanAmountEl = document.getElementById('loanAmount');
            elements.interestRateEl = document.getElementById('interestRate');
            elements.interestSlider = document.getElementById('interestRateSlider');
            elements.loanTenureEl = document.getElementById('loanTenure');
            elements.startDateEl = document.getElementById('startDate');
            elements.emiOutput = document.getElementById('emiOutput');
            elements.interestOutput = document.getElementById('interestOutput');
            elements.paymentOutput = document.getElementById('paymentOutput');
            elements.yearBtn = document.getElementById('yearBtn');
            elements.monthBtn = document.getElementById('monthBtn');
            elements.lightBtn = document.getElementById('lightBtn');
            elements.darkBtn = document.getElementById('darkBtn');
            elements.calculateBtn = document.getElementById('calculateBtn');
            elements.clearBtn = document.getElementById('clearBtn');
            elements.loanTypeRadios = document.querySelectorAll('input[name="loanType"]');
        }
    }
    function setupEvents() {
        if (!elements.calculateBtn || !elements.clearBtn || !elements.yearBtn ||
            !elements.monthBtn || !elements.lightBtn || !elements.darkBtn ||
            !elements.interestSlider || !elements.interestRateEl || !elements.loanTypeRadios)
            return;
        elements.calculateBtn.addEventListener('click', calculateEMI);
        elements.clearBtn.addEventListener('click', clearFields);
        elements.yearBtn.addEventListener('click', () => {
            var _a, _b;
            isYear = true;
            (_a = elements.yearBtn) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            (_b = elements.monthBtn) === null || _b === void 0 ? void 0 : _b.classList.remove('active');
        });
        elements.monthBtn.addEventListener('click', () => {
            var _a, _b;
            isYear = false;
            (_a = elements.monthBtn) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            (_b = elements.yearBtn) === null || _b === void 0 ? void 0 : _b.classList.remove('active');
        });
        elements.lightBtn.addEventListener('click', () => toggleTheme('light'));
        elements.darkBtn.addEventListener('click', () => toggleTheme('dark'));
        elements.interestSlider.addEventListener('input', () => {
            if (elements.interestRateEl && elements.interestSlider) {
                elements.interestRateEl.value = elements.interestSlider.value;
            }
        });
        elements.interestRateEl.addEventListener('input', () => {
            if (elements.interestSlider && elements.interestRateEl) {
                elements.interestSlider.value = elements.interestRateEl.value;
            }
        });
        elements.loanTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (!elements.loanAmountEl || !elements.interestRateEl || !elements.interestSlider || !elements.loanTenureEl)
                    return;
                if (radio.value === 'home') {
                    elements.loanAmountEl.value = '5000000';
                    elements.interestRateEl.value = '9';
                    elements.interestSlider.value = '9';
                    elements.loanTenureEl.value = '20';
                }
                else {
                    elements.loanAmountEl.value = '200000';
                    elements.interestRateEl.value = '12';
                    elements.interestSlider.value = '12';
                    elements.loanTenureEl.value = '3';
                }
            });
        });
    }
    function init() {
        setupElements();
        setupEvents();
    }
    if (typeof window !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        }
        else {
            init();
        }
        window.calculateEMI = calculateEMI;
        window.clearFields = clearFields;
        window.toggleTheme = toggleTheme;
    }
})();
