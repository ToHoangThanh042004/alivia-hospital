/**
 * ALIVIA INTERNATIONAL HOSPITAL — MASTER JAVASCRIPT LOGIC
 * Implements: Form Validation, Appointment Scheduling, Interactive Tabs, Accordions, Modal UX
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initDatePicker();
  initSpecialtyAndDoctorPreselection();
  initSymptomNavigator();
  initSecondOpinionAction();
  initInsurancePreCheck();
  initFacilityTabs();
  initFaqAccordion();
  initAppointmentBookingForm();
  initScrollEffects();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION & DRAWER
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-book-btn');

  if (!mobileMenuBtn || !mobileDrawer) return;

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', openDrawer);
  
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeDrawer);
  }

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('open') && 
        !mobileDrawer.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close when clicking any nav link inside drawer
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   2. DATE PICKER SETUP (PREVENT PAST DATES)
   -------------------------------------------------------------------------- */
function initDatePicker() {
  const dateInput = document.getElementById('appointmentDate');
  if (!dateInput) return;

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  dateInput.min = minDateStr;
  dateInput.value = minDateStr;
}

/* --------------------------------------------------------------------------
   3. PRE-SELECT SPECIALTY, DOCTOR & PACKAGE ON CTA CLICKS
   -------------------------------------------------------------------------- */
function initSpecialtyAndDoctorPreselection() {
  const specialtySelect = document.getElementById('specialtySelect');
  const doctorSelect = document.getElementById('doctorSelect');
  const patientNotes = document.getElementById('patientNotes');
  const patientNameInput = document.getElementById('patientName');

  // Pre-select specialty buttons (from Specialty cards & Center spotlight)
  const specialtyButtons = document.querySelectorAll('.btn-select-specialty');
  specialtyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const spec = btn.getAttribute('data-specialty');
      if (spec && specialtySelect) {
        for (let i = 0; i < specialtySelect.options.length; i++) {
          if (specialtySelect.options[i].value.includes(spec) || spec.includes(specialtySelect.options[i].value)) {
            specialtySelect.selectedIndex = i;
            break;
          }
        }
      }
      smoothScrollToBooking();
    });
  });

  // Pre-select doctor buttons (from Doctor profiles)
  const doctorButtons = document.querySelectorAll('.btn-book-doctor');
  doctorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docName = btn.getAttribute('data-doctor');
      const docSpec = btn.getAttribute('data-specialty');

      if (doctorSelect && docName) {
        for (let i = 0; i < doctorSelect.options.length; i++) {
          if (doctorSelect.options[i].value.includes(docName)) {
            doctorSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (specialtySelect && docSpec) {
        for (let i = 0; i < specialtySelect.options.length; i++) {
          if (specialtySelect.options[i].value.includes(docSpec) || docSpec.includes(specialtySelect.options[i].value)) {
            specialtySelect.selectedIndex = i;
            break;
          }
        }
      }

      smoothScrollToBooking();
    });
  });

  // Pre-select package buttons (from Checkup Packages)
  const packageButtons = document.querySelectorAll('.btn-select-package');
  packageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgName = btn.getAttribute('data-package');
      if (specialtySelect) {
        specialtySelect.value = 'Khám tổng quát & Tầm soát';
      }
      if (patientNotes && pkgName) {
        patientNotes.value = `Đăng ký quan tâm: ${pkgName}`;
      }
      smoothScrollToBooking();
    });
  });

  function smoothScrollToBooking() {
    const bookingSection = document.getElementById('dat-lich');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (patientNameInput) patientNameInput.focus();
      }, 500);
    }
  }
}

/* --------------------------------------------------------------------------
   3B. GUIDED SYMPTOM NAVIGATOR
   -------------------------------------------------------------------------- */
function initSymptomNavigator() {
  const symptomPills = document.querySelectorAll('.symptom-pill');
  const specialtySelect = document.getElementById('specialtySelect');
  const doctorSelect = document.getElementById('doctorSelect');
  const patientNotes = document.getElementById('patientNotes');
  const patientNameInput = document.getElementById('patientName');

  symptomPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const spec = pill.getAttribute('data-specialty');
      const doc = pill.getAttribute('data-doctor');
      const note = pill.getAttribute('data-note');

      if (spec && specialtySelect) {
        for (let i = 0; i < specialtySelect.options.length; i++) {
          if (specialtySelect.options[i].value.includes(spec) || spec.includes(specialtySelect.options[i].value)) {
            specialtySelect.selectedIndex = i;
            break;
          }
        }
      }

      if (doc && doctorSelect) {
        for (let i = 0; i < doctorSelect.options.length; i++) {
          if (doctorSelect.options[i].value.includes(doc)) {
            doctorSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (note && patientNotes) {
        patientNotes.value = `Triệu chứng ghi nhận: ${note}`;
      }

      const bookingSection = document.getElementById('dat-lich');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (patientNameInput) patientNameInput.focus();
        }, 500);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3C. SECOND OPINION CONCIERGE ACTION
   -------------------------------------------------------------------------- */
function initSecondOpinionAction() {
  const secondOpinionBtn = document.getElementById('btnSecondOpinion');
  const patientNotes = document.getElementById('patientNotes');
  const patientNameInput = document.getElementById('patientName');

  if (!secondOpinionBtn) return;

  secondOpinionBtn.addEventListener('click', () => {
    // Select Telehealth / Second Opinion consultation mode
    const telehealthRadio = document.querySelector('input[name="consultationMode"][value*="Telehealth"]');
    if (telehealthRadio) {
      telehealthRadio.checked = true;
    }

    if (patientNotes) {
      patientNotes.value = 'Yêu cầu Hội đồng Ý kiến Y khoa Thứ hai (Second Opinion) — Cần thẩm định lại hồ sơ bệnh án cũ và phim chụp từ bệnh viện tuyến trước.';
    }

    const bookingSection = document.getElementById('dat-lich');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (patientNameInput) patientNameInput.focus();
      }, 500);
    }
  });
}

/* --------------------------------------------------------------------------
   3D. INTERACTIVE INSURANCE PRE-CHECK TOOL
   -------------------------------------------------------------------------- */
function initInsurancePreCheck() {
  const insuranceSelect = document.getElementById('insuranceCompanySelect');
  const resultBox = document.getElementById('insuranceResultBox');
  const companyNameEl = document.getElementById('insuranceCompanyName');
  const guaranteeTextEl = document.getElementById('insuranceGuaranteeText');
  const insuranceCheckbox = document.getElementById('insuranceSupport');

  if (!insuranceSelect || !resultBox) return;

  insuranceSelect.addEventListener('change', () => {
    const selectedOption = insuranceSelect.options[insuranceSelect.selectedIndex];
    const val = insuranceSelect.value;

    if (val && selectedOption) {
      const guarantee = selectedOption.getAttribute('data-guarantee') || 'Được bảo lãnh viện phí trực tiếp tại quầy thu ngân Alivia.';
      companyNameEl.textContent = val;
      guaranteeTextEl.textContent = guarantee;
      resultBox.hidden = false;
      resultBox.removeAttribute('hidden');

      // Auto-check in the booking form
      if (insuranceCheckbox) {
        insuranceCheckbox.checked = true;
      }
    } else {
      resultBox.hidden = true;
      resultBox.setAttribute('hidden', '');
    }
  });
}

/* --------------------------------------------------------------------------
   4. FACILITY INTERACTIVE TABS
   -------------------------------------------------------------------------- */
function initFacilityTabs() {
  const tabs = document.querySelectorAll('.facility-tab');
  const panels = document.querySelectorAll('.facility-tab-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      const targetPanelId = tab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.hidden = false;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other accordions for clean editorial feel
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.accordion-trigger');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.hidden = true;
        }
      });

      // Toggle current
      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.hidden = true;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.hidden = false;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. APPOINTMENT BOOKING FORM VALIDATION & MODAL
   -------------------------------------------------------------------------- */
function initAppointmentBookingForm() {
  const form = document.getElementById('appointmentForm');
  const submitBtn = document.getElementById('btnSubmitBooking');
  const successModal = document.getElementById('bookingSuccessModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const summaryContainer = document.getElementById('modalBookingSummary');

  if (!form) return;

  const nameInput = document.getElementById('patientName');
  const phoneInput = document.getElementById('patientPhone');
  const emailInput = document.getElementById('patientEmail');
  const specialtySelect = document.getElementById('specialtySelect');
  const dateInput = document.getElementById('appointmentDate');

  // Remove invalid state on user input
  [nameInput, phoneInput, emailInput, specialtySelect, dateInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalid = null;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('invalid');
      isValid = false;
      if (!firstInvalid) firstInvalid = nameInput;
    } else {
      nameInput.classList.remove('invalid');
    }

    // Validate Phone (Vietnamese phone regex: 10 digits starting with 03, 05, 07, 08, 09 or +84)
    const phoneVal = phoneInput.value.replace(/[\s.-]/g, '');
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(phoneVal)) {
      phoneInput.classList.add('invalid');
      isValid = false;
      if (!firstInvalid) firstInvalid = phoneInput;
    } else {
      phoneInput.classList.remove('invalid');
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      emailInput.classList.add('invalid');
      isValid = false;
      if (!firstInvalid) firstInvalid = emailInput;
    } else {
      emailInput.classList.remove('invalid');
    }

    // Validate Specialty
    if (!specialtySelect.value) {
      specialtySelect.classList.add('invalid');
      isValid = false;
      if (!firstInvalid) firstInvalid = specialtySelect;
    } else {
      specialtySelect.classList.remove('invalid');
    }

    // Validate Date
    if (!dateInput.value) {
      dateInput.classList.add('invalid');
      isValid = false;
      if (!firstInvalid) firstInvalid = dateInput;
    } else {
      dateInput.classList.remove('invalid');
    }

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Realistic Loading State
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Extract Form Data for Confirmation Modal
      const doctorInput = document.getElementById('doctorSelect');
      const timeSlotInput = form.querySelector('input[name="timeSlot"]:checked');
      const modeInput = form.querySelector('input[name="consultationMode"]:checked');
      const insuranceCheckbox = document.getElementById('insuranceSupport');

      const bookingRefCode = 'ALV-' + Math.floor(100000 + Math.random() * 900000);
      const bookingData = {
        refCode: bookingRefCode,
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailVal,
        specialty: specialtySelect.options[specialtySelect.selectedIndex].text,
        doctor: doctorInput ? doctorInput.value : 'Bác sĩ chuyên khoa Alivia',
        consultationMode: modeInput ? modeInput.value : 'Khám trực tiếp tại Bệnh viện (Campus Sala)',
        date: formatDateVN(dateInput.value),
        timeSlot: timeSlotInput ? timeSlotInput.value : 'Buổi sáng',
        insurance: insuranceCheckbox && insuranceCheckbox.checked ? 'Bảo lãnh viện phí trực tiếp' : 'Thanh toán trực tiếp'
      };

      // Populate Summary
      if (summaryContainer) {
        summaryContainer.innerHTML = `
          <div class="summary-row">
            <span class="summary-lbl">Mã phiếu tiếp nhận:</span>
            <span class="summary-val ref-code">${bookingData.refCode}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Hình thức khám:</span>
            <span class="summary-val">${bookingData.consultationMode}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Người thăm khám:</span>
            <span class="summary-val">${bookingData.name}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Số điện thoại:</span>
            <span class="summary-val">${bookingData.phone}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Chuyên khoa:</span>
            <span class="summary-val">${bookingData.specialty}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Bác sĩ phụ trách:</span>
            <span class="summary-val">${bookingData.doctor}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Ngày & Buổi hẹn:</span>
            <span class="summary-val">${bookingData.date} — ${bookingData.timeSlot}</span>
          </div>
          <div class="summary-row">
            <span class="summary-lbl">Bảo lãnh bảo hiểm:</span>
            <span class="summary-val">${bookingData.insurance}</span>
          </div>
        `;
      }

      // Show Modal
      if (successModal) {
        successModal.hidden = false;
        successModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }

      // Reset form
      form.reset();
      initDatePicker();
    }, 600);
  });

  // Modal Closing handlers
  function closeModal() {
    if (successModal) {
      successModal.hidden = true;
      successModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeModal);

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal && !successModal.hidden) {
      closeModal();
    }
  });
}

function formatDateVN(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

/* --------------------------------------------------------------------------
   7. SCROLL EFFECTS (STICKY HEADER ELEVATION & FLOATING DOCK)
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const siteHeader = document.getElementById('site-header');
  const floatingActions = document.getElementById('floatingActions');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header elevation
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.style.boxShadow = '0 4px 20px rgba(14, 30, 46, 0.08)';
      } else {
        siteHeader.style.boxShadow = 'var(--shadow-subtle)';
      }
    }

    // Floating controls dock visibility
    if (floatingActions) {
      if (scrollY > 350) {
        floatingActions.classList.add('visible');
      } else {
        floatingActions.classList.remove('visible');
      }
    }

    // Scroll to top button visibility inside dock
    if (scrollTopBtn) {
      if (scrollY > 600) {
        scrollTopBtn.hidden = false;
        scrollTopBtn.removeAttribute('hidden');
      } else {
        scrollTopBtn.hidden = true;
        scrollTopBtn.setAttribute('hidden', '');
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
