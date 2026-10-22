// Tab Switching
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Update tabs state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update pane state
      panes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // Filter Schedule Table (Tab 1)
  const filterChips = document.querySelectorAll('.filter-chip');
  const scheduleRows = document.querySelectorAll('#table-schedule tbody tr');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      scheduleRows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else if (filter === 'platinum') {
          row.style.display = row.getAttribute('data-tier') === 'platinum' ? '' : 'none';
        } else if (filter === 'gold') {
          row.style.display = row.getAttribute('data-tier') === 'gold' ? '' : 'none';
        } else if (filter === 'silver') {
          row.style.display = row.getAttribute('data-tier') === 'silver' ? '' : 'none';
        } else if (filter === 'brandday') {
          row.style.display = row.getAttribute('data-tier') === 'brandday' ? '' : 'none';
        } else if (filter === 'event') {
          row.style.display = row.getAttribute('data-tier') === 'event' ? '' : 'none';
        }
      });
    });
  });

  // Search SKU Table (Tab 3)
  const skuSearch = document.getElementById('sku-search');
  const skuRows = document.querySelectorAll('#table-skus tbody tr');

  if (skuSearch) {
    skuSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      skuRows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Live Countdown Clock
  startCountdown();
});

// Countdown Timer logic target Nov 1st
function startCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const targetDate = new Date('2026-11-01T00:00:00+01:00').getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minutesEl.textContent = String(m).padStart(2, '0');
      secondsEl.textContent = String(s).padStart(2, '0');
    }
  }

  update();
  setInterval(update, 1000);
}

// Clipboard Helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function copySku(sku) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(sku).then(() => {
      showToast(`SKU ${sku} copied!`);
    });
  } else {
    showToast(`SKU ${sku} copied!`);
  }
}

function copyAll(skus) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(skus).then(() => {
      showToast(`SKUs copied: ${skus}`);
    });
  } else {
    showToast(`SKUs copied: ${skus}`);
  }
}
