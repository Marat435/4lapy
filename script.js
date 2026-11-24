document.addEventListener("DOMContentLoaded", () => {
  const GEMINI_API_KEY = "AQ.Ab8RN6KsIeDOjh4XUDwCeAgVEA5XQZy6pLv7DF-279RSTQSv0g";
  const GEMINI_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash"
  ];

  const STORAGE_PETS = "chetyrelapy_pets_v7";
  const STORAGE_REQS = "chetyrelapy_reqs_v7";
  const STORAGE_PROVERB = "chetyrelapy_proverb_v7";
  const STORAGE_USERS = "chetyrelapy_users_v7";

  const DEV_LOGIN = "marat";
  const DEV_PASS = "1234";

  const makeAnimalArtwork = (name, category) => {
    const isCat = category === "Мысық";
    const isRabbit = category === "Басқа";

    const ears = isRabbit
      ? `<ellipse cx="368" cy="118" rx="18" ry="62" transform="rotate(-12 368 118)" fill="#fdfbf7" stroke="#3f5632" stroke-width="4"/>
         <ellipse cx="432" cy="118" rx="18" ry="62" transform="rotate(12 432 118)" fill="#fdfbf7" stroke="#3f5632" stroke-width="4"/>`
      : isCat
      ? `<polygon points="325,180 352,115 385,168" fill="#d97236"/>
         <polygon points="475,180 448,115 415,168" fill="#d97236"/>`
      : `<ellipse cx="328" cy="172" rx="22" ry="42" transform="rotate(24 328 172)" fill="#2c3e24"/>
         <ellipse cx="472" cy="172" rx="22" ry="42" transform="rotate(-24 472 172)" fill="#2c3e24"/>`;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#efe6d5"/>
        <circle cx="400" cy="210" r="115" fill="#e8eed9"/>
        ${ears}
        <circle cx="400" cy="212" r="72" fill="#fdfbf7" stroke="#3f5632" stroke-width="4"/>
        <circle cx="375" cy="202" r="7" fill="#252b22"/>
        <circle cx="425" cy="202" r="7" fill="#252b22"/>
        <polygon points="392,218 408,218 400,229" fill="#d97236"/>
        <path d="M382 238 Q400 250 418 238" fill="none" stroke="#252b22" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="150" y="340" width="500" height="96" rx="18" fill="#2c3e24"/>
        <text x="400" y="381" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="30" font-weight="bold">${name}</text>
        <text x="400" y="415" text-anchor="middle" fill="#e8eed9" font-family="sans-serif" font-size="16">${category} · Семей · 24/7</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const resolveImage = (imgEl, rawPath, petName, category) => {
    if (!imgEl) return;
    if (!rawPath || rawPath.startsWith("data:image")) {
      imgEl.src = rawPath || makeAnimalArtwork(petName, category);
      return;
    }
    const clean = rawPath.trim().replace(/^\/+/, "");
    const baseName = clean.replace(/^images\/?/i, "");
    const candidates = [clean, `images/${baseName}`, `images${baseName}`, baseName].filter(
      (v, i, arr) => Boolean(v) && arr.indexOf(v) === i
    );
    let idx = 0;
    const tryNext = () => {
      if (idx < candidates.length) {
        imgEl.src = candidates[idx++];
      } else {
        imgEl.onerror = null;
        imgEl.src = makeAnimalArtwork(petName, category);
      }
    };
    imgEl.onerror = tryNext;
    tryNext();
  };

  resolveImage(document.getElementById("authBossImg"), "boss.jpg", "Четырелапы · Семей", "Ит");
  resolveImage(document.getElementById("heroBossImg"), "boss.jpg", "Четырелапы · Семей", "Ит");

  const defaultPets = [
    {
      id: "aktos",
      name: "Ақтөс",
      category: "Ит",
      image: "aktos.jpg",
      desc: "Ақылды әрі мейірімді ит. Серуендегенді жақсы көреді, адамға тез бауыр басады.",
      medical: {
        age: "1 жас 4 ай",
        weight: "14.5 кг",
        vaccines: "Кешенді екпе + Құтыруға қарсы (жарамды)",
        sterilized: "Кастрацияланған · Чип №KZ-9001",
        lastCheck: "15.11.2026",
        vetNotes: "Дені сау, белсенді"
      }
    },
    {
      id: "miyau",
      name: "Мияу",
      category: "Мысық",
      image: "miyau.jpg",
      desc: "Тыныш мінезді, тазалыққа үйретілген сүйкімді мысық. Жылы әрі жайлы үйді қалайды.",
      medical: {
        age: "9 ай",
        weight: "3.4 кг",
        vaccines: "FVRCP + Құтыруға қарсы екпе салынған",
        sterilized: "Стерилизацияланған · Паспорт бар",
        lastCheck: "18.11.2026",
        vetNotes: "Дені сау, тазалыққа үйретілген"
      }
    },
    {
      id: "barsik",
      name: "Барсик",
      category: "Ит",
      image: "barsik.jpg",
      desc: "Сергек әрі адал ит. Аула қорғауға және серуендеуге өте жақсы серік.",
      medical: {
        age: "2 жас",
        weight: "11.2 кг",
        vaccines: "Толық вакцинацияланған",
        sterilized: "Кастрацияланған · Чип №KZ-9004",
        lastCheck: "10.11.2026",
        vetNotes: "Дені сау, сергек"
      }
    },
    {
      id: "boris",
      name: "Борис",
      category: "Мысық",
      image: "boris.jpg",
      desc: "Салмақты, жұмсақ жүнді мысық. Үй ішіндегі жылылық пен тыныштықты жақсы көреді.",
      medical: {
        age: "1 жас 8 ай",
        weight: "4.6 кг",
        vaccines: "Екпелері уақытылы салынған",
        sterilized: "Кастрацияланған · Төлқұжаты бар",
        lastCheck: "20.11.2026",
        vetNotes: "Дені сау, тыныш мінезді"
      }
    },
    {
      id: "ulpek",
      name: "Үлпек",
      category: "Басқа",
      image: "ulpek.jpg",
      desc: "Нәзік әрі сүйкімді үй қояны. Көкөніс пен пішенді жақсы көреді.",
      medical: {
        age: "1 жас",
        weight: "1.9 кг",
        vaccines: "Тексерілген, екпесі бар",
        sterilized: "Бақылауда · Ветеринар картасы ашық",
        lastCheck: "12.11.2026",
        vetNotes: "Тәбеті жақсы, сау"
      }
    }
  ];

  const loadStorage = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  let pets = loadStorage(STORAGE_PETS, defaultPets);
  let requests = loadStorage(STORAGE_REQS, [
    {
      id: "req-1",
      name: "Ақжол",
      category: "Ит",
      image: "aktos.jpg",
      desc: "Көңілді күшік, тез үйренеді, екпесі бар."
    }
  ]);
  let proverbData = loadStorage(STORAGE_PROVERB, {
    text: "«Адамгершіліктің өлшемі — әлсіз жаратылыс иелеріне жасаған қамқорлығың.»",
    author: "— Жануарларға қамқорлық туралы нақыл сөз"
  });
  let registeredUsers = loadStorage(STORAGE_USERS, []);

  let currentSession = null;
  let activeFilter = "all";
  let selectedModalPet = null;

  // =========================================================
  // 0. ЛОГИН / ПАРОЛЬМЕН НАҚТЫ КІРУ ЖӘНЕ ТІРКЕЛУ
  // =========================================================
  const authGate = document.getElementById("authGate");
  const appShell = document.getElementById("appShell");
  const loginGateForm = document.getElementById("loginGateForm");
  const registerGateForm = document.getElementById("registerGateForm");
  const devGateForm = document.getElementById("devGateForm");
  const currentRoleBadge = document.getElementById("currentRoleBadge");
  const devNavItem = document.getElementById("devNavItem");
  const userReqNavItem = document.getElementById("userReqNavItem");

  const setAuthMode = (mode) => {
    document.querySelectorAll(".auth-role-tab").forEach((t) => {
      t.classList.toggle("is-active", t.dataset.authMode === mode);
    });
    loginGateForm.hidden = mode !== "login";
    registerGateForm.hidden = mode !== "register";
    devGateForm.hidden = mode !== "dev";
    document.getElementById("loginGateError").textContent = "";
    document.getElementById("registerGateError").textContent = "";
    document.getElementById("devGateError").textContent = "";
    authGate.hidden = false;
    appShell.hidden = true;
  };

  document.querySelectorAll(".auth-role-tab").forEach((tab) => {
    tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode));
  });

  const syncGuestRequestWall = () => {
    const isGuest = !currentSession || currentSession.role === "guest";
    document.getElementById("guestRegisterWall").hidden = !isGuest;
    document.getElementById("requestFormWrap").hidden = isGuest;
  };

  const enterApp = (role, name) => {
    currentSession = { role, name };
    authGate.hidden = true;
    appShell.hidden = false;

    if (role === "dev") {
      currentRoleBadge.textContent = `Әзірлеуші: ${name}`;
      devNavItem.hidden = false;
      userReqNavItem.hidden = true;
      renderDevRequests();
      renderDevPetsManager();
      switchTab("dev");
    } else if (role === "user") {
      currentRoleBadge.textContent = name;
      devNavItem.hidden = true;
      userReqNavItem.hidden = false;
      switchTab("home");
    } else {
      currentRoleBadge.textContent = "Қонақ";
      devNavItem.hidden = true;
      userReqNavItem.hidden = false;
      switchTab("home");
    }

    syncGuestRequestWall();
    renderAnalytics();
  };

  loginGateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginVal = document.getElementById("loginNameInput").value.trim();
    const passVal = document.getElementById("loginPassInput").value.trim();
    const errEl = document.getElementById("loginGateError");

    if (!loginVal || !passVal || passVal.length < 3) {
      errEl.textContent = "Логин немесе пароль қате.";
      return;
    }

    const foundUser = registeredUsers.find(
      (u) => u.login.toLowerCase() === loginVal.toLowerCase()
    );

    if (foundUser && foundUser.password !== passVal) {
      errEl.textContent = "Логин немесе пароль қате.";
      return;
    }

    errEl.textContent = "";
    enterApp("user", loginVal);
  });

  registerGateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginVal = document.getElementById("regNameInput").value.trim();
    const phoneVal = document.getElementById("regPhoneInput").value.trim();
    const passVal = document.getElementById("regPassInput").value.trim();
    const errEl = document.getElementById("registerGateError");

    if (loginVal.length < 2 || passVal.length < 4) {
      errEl.textContent = "Логин немесе пароль қате (пароль кемі 4 таңба болуы керек).";
      return;
    }

    const exists = registeredUsers.some(
      (u) => u.login.toLowerCase() === loginVal.toLowerCase()
    );
    if (exists) {
      errEl.textContent = "Бұл логинмен тіркелген қолданушы бар.";
      return;
    }

    registeredUsers.push({
      id: `u-${Date.now()}`,
      login: loginVal,
      phone: phoneVal,
      password: passVal
    });
    saveStorage(STORAGE_USERS, registeredUsers);
    registerGateForm.reset();
    errEl.textContent = "";
    enterApp("user", loginVal);
  });

  document.getElementById("quickGuestBtn").addEventListener("click", () => {
    enterApp("guest", "Қонақ");
  });

  const devGateLogin = document.getElementById("devGateLogin");
  const devGatePass = document.getElementById("devGatePass");
  const toggleGatePass = document.getElementById("toggleGatePass");

  toggleGatePass.addEventListener("click", () => {
    const isPwd = devGatePass.type === "password";
    devGatePass.type = isPwd ? "text" : "password";
    toggleGatePass.textContent = isPwd ? "Жасыру" : "Көрсету";
  });

  devGateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const errEl = document.getElementById("devGateError");
    if (devGateLogin.value.trim() === DEV_LOGIN && devGatePass.value.trim() === DEV_PASS) {
      errEl.textContent = "";
      devGateForm.reset();
      enterApp("dev", DEV_LOGIN);
    } else {
      errEl.textContent = "Логин немесе пароль қате.";
    }
  });

  document.getElementById("openRegisterFromWallBtn").addEventListener("click", () => {
    setAuthMode("register");
  });

  document.getElementById("logoutAppBtn").addEventListener("click", () => {
    currentSession = null;
    appShell.hidden = true;
    authGate.hidden = false;
    setAuthMode("login");
  });

  // =========================================================
  // 1. ВКЛАДКАЛАР
  // =========================================================
  const burgerBtn = document.getElementById("burgerBtn");
  const mainNav = document.getElementById("mainNav");

  const switchTab = (tabName) => {
    if (tabName === "dev" && currentSession?.role !== "dev") {
      tabName = "home";
    }
    if (tabName === "request" && currentSession?.role === "dev") {
      tabName = "dev";
    }
    document.querySelectorAll(".tab-view").forEach((view) => {
      view.classList.toggle("is-active", view.id === `view-${tabName}`);
    });
    document.querySelectorAll(".nav__tab").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tabName);
    });
    mainNav.classList.remove("is-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    if (tabName === "request") syncGuestRequestWall();
    if (tabName === "analytics") renderAnalytics();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  document.querySelectorAll("[data-tab-link]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab(btn.dataset.tabLink);
    });
  });

  burgerBtn.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    burgerBtn.setAttribute("aria-expanded", String(open));
  });

  // =========================================================
  // 2. НАҚЫЛ СӨЗ, АНАЛИТИКА ЖӘНЕ ЖАНУАРЛАР
  // =========================================================
  const renderProverb = () => {
    document.getElementById("proverbText").textContent = proverbData.text;
    document.getElementById("proverbAuthor").textContent = proverbData.author;
  };

  const parseWeightKg = (weightStr) => {
    if (!weightStr) return 0;
    const match = String(weightStr).replace(",", ".").match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const renderAnalytics = () => {
    const totalPets = pets.length;
    const dogsCount = pets.filter((p) => p.category === "Ит").length;
    const catsCount = pets.filter((p) => p.category === "Мысық").length;
    const othersCount = pets.filter((p) => p.category !== "Ит" && p.category !== "Мысық").length;

    const pctDogs = totalPets ? Math.round((dogsCount / totalPets) * 100) : 0;
    const pctCats = totalPets ? Math.round((catsCount / totalPets) * 100) : 0;
    const pctOthers = totalPets ? Math.max(0, 100 - pctDogs - pctCats) : 0;

    const weights = pets.map((p) => parseWeightKg(p.medical?.weight)).filter((w) => w > 0);
    const avgWeight = weights.length
      ? (weights.reduce((acc, w) => acc + w, 0) / weights.length).toFixed(1)
      : "0.0";

    document.getElementById("kpiActivePets").textContent = String(totalPets);
    document.getElementById("kpiPendingReqs").textContent = String(requests.length);
    document.getElementById("kpiRegisteredUsers").textContent = String(registeredUsers.length);
    document.getElementById("kpiAvgWeight").textContent = `${avgWeight} кг`;

    document.getElementById("labelDogs").textContent = `Иттер: ${dogsCount} (${pctDogs}%)`;
    document.getElementById("labelCats").textContent = `Мысықтар: ${catsCount} (${pctCats}%)`;
    document.getElementById("labelOthers").textContent = `Басқа жануарлар: ${othersCount} (${pctOthers}%)`;

    document.getElementById("barDogs").style.width = `${pctDogs}%`;
    document.getElementById("barCats").style.width = `${pctCats}%`;
    document.getElementById("barOthers").style.width = `${pctOthers}%`;

    document.getElementById("analyticsDynamicInsights").innerHTML = `
      <li>Сайтта қазір <strong>${totalPets} жануар</strong> бар (${dogsCount} ит, ${catsCount} мысық, ${othersCount} басқа).</li>
      <li>Әзірлеуші қарайтын өтінімдер саны: <strong>${requests.length}</strong>.</li>
      <li>Жануарлардың орташа салмағы: <strong>${avgWeight} кг</strong>.</li>
    `;
  };

  const modal = document.getElementById("petModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalDesc = document.getElementById("modalDesc");
  const modalPhotoFile = document.getElementById("modalPhotoFile");
  const modalPhotoInput = document.getElementById("modalPhotoInput");
  const saveModalChangesBtn = document.getElementById("saveModalChangesBtn");
  const modalSaveStatus = document.getElementById("modalSaveStatus");

  const readFileAsDataUrl = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });

  const openPetCardModal = (pet) => {
    selectedModalPet = pet;
    const med = pet.medical || {
      age: "1 жас",
      weight: "5 кг",
      vaccines: "Екпесі салынған",
      sterilized: "Тіркелген",
      lastCheck: "2026",
      vetNotes: "Дені сау"
    };

    modalSaveStatus.textContent = "";
    modalTitle.textContent = pet.name;
    modalMeta.textContent = `${pet.category} · Салмағы: ${med.weight} · 24/7`;
    modalDesc.textContent = pet.desc;
    modalPhotoInput.value = pet.image.startsWith("data:image") ? "" : pet.image;
    resolveImage(modalImg, pet.image, pet.name, pet.category);

    document.getElementById("medAge").textContent = med.age;
    document.getElementById("medWeight").textContent = med.weight;
    document.getElementById("medVaccines").textContent = med.vaccines;
    document.getElementById("medSterilized").textContent = med.sterilized;
    document.getElementById("medLastCheck").textContent = med.lastCheck;
    document.getElementById("medVetNotes").textContent = med.vetNotes;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closePetCardModal = () => {
    selectedModalPet = null;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  modalClose.addEventListener("click", closePetCardModal);
  modalBackdrop.addEventListener("click", closePetCardModal);

  modalPhotoFile.addEventListener("change", async () => {
    if (!selectedModalPet || !modalPhotoFile.files?.[0]) return;
    const dataUrl = await readFileAsDataUrl(modalPhotoFile.files[0]);
    if (dataUrl) {
      selectedModalPet.image = dataUrl;
      resolveImage(modalImg, selectedModalPet.image, selectedModalPet.name, selectedModalPet.category);
      saveStorage(STORAGE_PETS, pets);
      renderPets();
      if (currentSession?.role === "dev") renderDevPetsManager();
      modalSaveStatus.textContent = "Сурет жаңартылды!";
    }
  });

  saveModalChangesBtn.addEventListener("click", () => {
    if (!selectedModalPet) return;
    const customImg = modalPhotoInput.value.trim();
    if (customImg) selectedModalPet.image = customImg;
    resolveImage(modalImg, selectedModalPet.image, selectedModalPet.name, selectedModalPet.category);
    saveStorage(STORAGE_PETS, pets);
    renderPets();
    if (currentSession?.role === "dev") renderDevPetsManager();
    modalSaveStatus.textContent = "Өзгеріс сақталды!";
  });

  const petsGrid = document.getElementById("petsGrid");
  const renderPets = () => {
    if (!petsGrid) return;
    const filtered = activeFilter === "all" ? pets : pets.filter((p) => p.category === activeFilter);
    petsGrid.innerHTML = "";

    filtered.forEach((pet) => {
      const w = pet.medical?.weight || "";
      const card = document.createElement("article");
      card.className = "pet-card";
      card.innerHTML = `
        <div class="pet-card__image">
          <img alt="${pet.name} — ${pet.category}">
        </div>
        <div class="pet-card__body">
          <div class="pet-card__tags">
            <span class="badge">Мед. карта бар</span>
            <span class="badge badge--type">${pet.category}${w ? ` · ${w}` : ""}</span>
          </div>
          <h3>${pet.name}</h3>
          <p>${pet.desc}</p>
          <button type="button" class="btn btn--secondary pet-card__btn">Мед. карта және толығырақ</button>
        </div>
      `;

      resolveImage(card.querySelector("img"), pet.image, pet.name, pet.category);
      card.addEventListener("click", () => openPetCardModal(pet));
      petsGrid.appendChild(card);
    });

    renderAnalytics();
  };

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeFilter = btn.dataset.filter;
      renderPets();
    });
  });

  const petRequestForm = document.getElementById("petRequestForm");
  const requestStatus = document.getElementById("requestStatus");

  petRequestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentSession || currentSession.role === "guest") {
      syncGuestRequestWall();
      return;
    }

    const name = document.getElementById("petNameInput").value.trim();
    const category = document.getElementById("petCategoryInput").value;
    const desc = document.getElementById("petDescInput").value.trim();
    const urlVal = document.getElementById("petPhotoUrl").value.trim();
    const fileInput = document.getElementById("petPhotoFile");

    let imgSrc = urlVal || "aktos.jpg";
    if (fileInput.files?.[0]) {
      const up = await readFileAsDataUrl(fileInput.files[0]);
      if (up) imgSrc = up;
    }

    requests.unshift({
      id: `req-${Date.now()}`,
      name,
      category,
      image: imgSrc,
      desc
    });
    saveStorage(STORAGE_REQS, requests);
    renderAnalytics();

    petRequestForm.reset();
    requestStatus.textContent = `«${name}» бойынша өтінім жіберілді! Әзірлеуші қарап, қабылдайды.`;
  });

  // =========================================================
  // 3. ӘЗІРЛЕУШІ ПАНЕЛІ
  // =========================================================
  const devAddPetForm = document.getElementById("devAddPetForm");
  const devAddStatus = document.getElementById("devAddStatus");

  devAddPetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("newPetName").value.trim();
    const category = document.getElementById("newPetCat").value;
    const age = document.getElementById("newPetAge").value.trim() || "1 жас";
    const weight = document.getElementById("newPetWeight").value.trim() || "5 кг";
    const vaccines = document.getElementById("newPetVaccines").value.trim() || "Екпе салынған";
    const vetNotes = document.getElementById("newPetVetNotes").value.trim() || "Дені сау";
    const desc = document.getElementById("newPetDesc").value.trim();
    const photoFile = document.getElementById("newPetPhotoFile");
    const photoName = document.getElementById("newPetPhotoName").value.trim();

    let imgSrc = photoName || "aktos.jpg";
    if (photoFile.files?.[0]) {
      const up = await readFileAsDataUrl(photoFile.files[0]);
      if (up) imgSrc = up;
    }

    pets.unshift({
      id: `pet-${Date.now()}`,
      name,
      category,
      image: imgSrc,
      desc,
      medical: {
        age,
        weight,
        vaccines,
        sterilized: "Тіркелген",
        lastCheck: "2026",
        vetNotes
      }
    });

    saveStorage(STORAGE_PETS, pets);
    renderPets();
    renderDevPetsManager();
    devAddPetForm.reset();
    devAddStatus.textContent = `«${name}» сайтқа қосылды!`;
  });

  const renderDevRequests = () => {
    const listEl = document.getElementById("requestsList");
    if (!listEl) return;
    listEl.innerHTML = "";

    if (!requests.length) {
      listEl.innerHTML = '<p class="request-item__desc">Жаңа өтінімдер жоқ.</p>';
      return;
    }

    requests.forEach((req) => {
      const row = document.createElement("div");
      row.className = "request-item";
      row.innerHTML = `
        <div class="request-item__head">
          <strong>${req.name}</strong>
          <span class="badge badge--type">${req.category}</span>
        </div>
        <p class="request-item__desc">${req.desc}</p>
        <div class="request-item__actions">
          <button type="button" class="btn btn--primary btn--sm approve-btn">Өтінімді қабылдау</button>
          <button type="button" class="btn btn--danger btn--sm reject-btn">Өшіру</button>
        </div>
      `;

      row.querySelector(".approve-btn").addEventListener("click", () => {
        pets.unshift({
          id: `pet-${Date.now()}`,
          name: req.name,
          category: req.category,
          image: req.image,
          desc: req.desc,
          medical: {
            age: "1 жас",
            weight: "6 кг",
            vaccines: "Тексеруде",
            sterilized: "Тіркелген",
            lastCheck: "2026",
            vetNotes: "Дені сау"
          }
        });
        saveStorage(STORAGE_PETS, pets);
        requests = requests.filter((r) => r.id !== req.id);
        saveStorage(STORAGE_REQS, requests);
        renderPets();
        renderDevRequests();
        renderDevPetsManager();
      });

      row.querySelector(".reject-btn").addEventListener("click", () => {
        requests = requests.filter((r) => r.id !== req.id);
        saveStorage(STORAGE_REQS, requests);
        renderAnalytics();
        renderDevRequests();
      });

      listEl.appendChild(row);
    });
  };

  const renderDevPetsManager = () => {
    const manager = document.getElementById("devPetsManager");
    if (!manager) return;
    manager.innerHTML = "";

    pets.forEach((pet) => {
      const med = pet.medical || {};
      const box = document.createElement("div");
      box.className = "dev-pet-row";
      box.innerHTML = `
        <div class="dev-pet-row__grid">
          <div class="form-group">
            <label>Есімі</label>
            <input type="text" class="edit-name" value="${pet.name}">
          </div>
          <div class="form-group">
            <label>Санаты</label>
            <select class="edit-cat">
              <option value="Ит" ${pet.category === "Ит" ? "selected" : ""}>Ит</option>
              <option value="Мысық" ${pet.category === "Мысық" ? "selected" : ""}>Мысық</option>
              <option value="Басқа" ${pet.category === "Басқа" ? "selected" : ""}>Басқа</option>
            </select>
          </div>
          <div class="form-group">
            <label>Салмағы</label>
            <input type="text" class="edit-weight" value="${med.weight || "5 кг"}">
          </div>
        </div>
        <div class="dev-pet-row__grid">
          <div class="form-group">
            <label>Жасы</label>
            <input type="text" class="edit-age" value="${med.age || "1 жас"}">
          </div>
          <div class="form-group">
            <label>Сурет атауы</label>
            <input type="text" class="edit-img" value="${pet.image.startsWith("data:image") ? "uploaded-photo" : pet.image}">
          </div>
          <div class="form-group">
            <label>Екпелері</label>
            <input type="text" class="edit-vaccines" value="${med.vaccines || "Екпе бар"}">
          </div>
        </div>
        <div class="form-group">
          <label>Сипаттамасы</label>
          <textarea class="edit-desc" rows="2">${pet.desc}</textarea>
        </div>
        <div class="request-item__actions">
          <button type="button" class="btn btn--primary btn--sm save-pet-btn">Сақтау</button>
          <button type="button" class="btn btn--danger btn--sm remove-pet-btn">Өшіру</button>
        </div>
      `;

      box.querySelector(".save-pet-btn").addEventListener("click", () => {
        pet.name = box.querySelector(".edit-name").value.trim() || pet.name;
        pet.category = box.querySelector(".edit-cat").value;
        const imgVal = box.querySelector(".edit-img").value.trim();
        if (imgVal && imgVal !== "uploaded-photo") pet.image = imgVal;
        pet.desc = box.querySelector(".edit-desc").value.trim() || pet.desc;
        pet.medical = {
          age: box.querySelector(".edit-age").value.trim() || med.age || "1 жас",
          weight: box.querySelector(".edit-weight").value.trim() || med.weight || "5 кг",
          vaccines: box.querySelector(".edit-vaccines").value.trim() || med.vaccines || "Екпе бар",
          sterilized: med.sterilized || "Тіркелген",
          lastCheck: med.lastCheck || "2026",
          vetNotes: med.vetNotes || "Дені сау"
        };
        saveStorage(STORAGE_PETS, pets);
        renderPets();
        renderDevPetsManager();
      });

      box.querySelector(".remove-pet-btn").addEventListener("click", () => {
        pets = pets.filter((p) => p.id !== pet.id);
        saveStorage(STORAGE_PETS, pets);
        renderPets();
        renderDevPetsManager();
      });

      manager.appendChild(box);
    });
  };

  const devSettingsForm = document.getElementById("devSettingsForm");
  const editProverbInput = document.getElementById("editProverbInput");
  const editProverbAuthorInput = document.getElementById("editProverbAuthorInput");
  const devSettingsStatus = document.getElementById("devSettingsStatus");

  editProverbInput.value = proverbData.text;
  editProverbAuthorInput.value = proverbData.author;

  devSettingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    proverbData = {
      text: editProverbInput.value.trim(),
      author: editProverbAuthorInput.value.trim()
    };
    saveStorage(STORAGE_PROVERB, proverbData);
    renderProverb();
    devSettingsStatus.textContent = "Нақыл сөз жаңартылды!";
  });

  // =========================================================
  // 4. ОНЛАЙН ИИ-АССИСТЕНТ (Кез келген сөзге/сұраққа ақылды жауап)
  // =========================================================
  const fab = document.getElementById("floatingAiFab");
  const popover = document.getElementById("floatingAiPopover");
  const closeAiBtn = document.getElementById("floatingAiClose");
  const aiChatForm = document.getElementById("floatingAiForm");
  const aiChatInput = document.getElementById("floatingAiInput");
  const aiMessages = document.getElementById("floatingAiMessages");
  const chatHistory = [];

  const togglePopover = (open) => {
    const next = typeof open === "boolean" ? open : popover.hidden;
    popover.hidden = !next;
    fab.setAttribute("aria-expanded", String(next));
    if (next) aiChatInput.focus();
  };

  fab.addEventListener("click", () => togglePopover());
  closeAiBtn.addEventListener("click", () => togglePopover(false));

  const formatPetLine = (p) => {
    const age = p.medical?.age || "жасы көрсетілмеген";
    const weight = p.medical?.weight || "салмағы көрсетілмеген";
    return `• <strong>${p.name}</strong> (${p.category}, ${age}, ${weight}) — ${p.desc}`;
  };

  const buildSmartLocalReply = (raw) => {
    const q = raw.toLowerCase().trim();

    // 0. Нақты жануардың есімін іздесе
    const matchedPet = pets.find((p) => q.includes(p.name.toLowerCase()));
    if (matchedPet && !q.includes("сипат")) {
      const m = matchedPet.medical || {};
      return {
        text: `<strong>${matchedPet.name}</strong> (${matchedPet.category}) туралы мәлімет:<br>• Сипаттамасы: ${matchedPet.desc}<br>• Жасы: ${m.age || "-"}<br>• Салмағы: ${m.weight || "-"}<br>• Екпелері: ${m.vaccines || "-"}<br>• Ветеринар қорытындысы: ${m.vetNotes || "-"}`,
        copyable: null
      };
    }

    // 1. Сәлемдесу және хал-жағдай
    if (/^(сәлем|салем|сәлемет|привет|hello|hi|ассалаумағалейкум|қайырлы)/.test(q)) {
      return {
        text: `Сәлем! Мен Семейдегі <strong>«Четырелапы»</strong> (24/7) панаханасының көмекшісімін. Мысық немесе ит таңдауға, панахана туралы сұрақтарға немесе жануарды сипаттауға көмектесе аламын. Не білгіңіз келеді?`,
        copyable: null
      };
    }

    if (q.includes("қалайсың") || q.includes("хал қалай") || q.includes("не істеп жатырсың")) {
      return {
        text: `Рақмет, жақсымын! 24/7 онлайн режимінде сізге көмектесуге дайынмын. Жануар іздеп жүрсіз бе, әлде панахана бойынша сұрағыңыз бар ма?`,
        copyable: null
      };
    }

    // 2. Алғыс / қоштасу
    if (q.includes("рахмет") || q.includes("рақмет") || q.includes("спасибо") || q.includes("көп рақмет")) {
      return {
        text: `Әрқашан қуаныштымын! Тағы сұрақтарыңыз болса, жаза беріңіз.`,
        copyable: null
      };
    }

    if (q.includes("сау бол") || q.includes("пока") || q.includes("көріскенше")) {
      return {
        text: `Сау болыңыз! Жануарларға көрсеткен қамқорлығыңызға рақмет.`,
        copyable: null
      };
    }

    // 3. Мысық іздеу / ұсыну
    if (q.includes("мысық") || q.includes("кош") || q.includes("марғау")) {
      const cats = pets.filter((p) => p.category === "Мысық");
      if (!cats.length) {
        return {
          text: `Қазір сайтта мысықтар тізімі бос. Жаңа жануар тіркеу үшін «Өтінім беру» бөлімін қолдана аласыз.`,
          copyable: null
        };
      }
      const calm = q.includes("тыныш") || q.includes("жуас") || q.includes("үй")
        ? cats.filter((c) => /тыныш|салмақ|тазалық|үй/i.test(c.desc))
        : cats;
      const list = (calm.length ? calm : cats).map(formatPetLine).join("<br>");
      return {
        text: `Мысық іздесеңіз, мына нұсқаларды ұсынамын:<br>${list}<br><br>Толығырақ қарау үшін «Жануарлар» бөліміне өтіңіз.`,
        copyable: null
      };
    }

    // 4. Ит іздеу / ұсыну
    if (q.includes("ит") || q.includes("күшік") || q.includes("соб") || q.includes("төбет")) {
      const dogs = pets.filter((p) => p.category === "Ит");
      if (!dogs.length) {
        return {
          text: `Қазір сайтта иттер тізімі бос.`,
          copyable: null
        };
      }
      return {
        text: `Ит іздесеңіз, біздегі достар:<br>${dogs.map(formatPetLine).join("<br>")}<br><br>Әрқайсысының мед. картасын карточкасын басып көруге болады.`,
        copyable: null
      };
    }

    // 5. Басқа жануарлар (қоян т.б.)
    if (q.includes("қоян") || q.includes("басқа")) {
      const others = pets.filter((p) => p.category !== "Ит" && p.category !== "Мысық");
      return {
        text: others.length
          ? `Басқа жануарлардан мына нұсқа бар:<br>${others.map(formatPetLine).join("<br>")}`
          : `Басқа жануарлар тізімін «Жануарлар» бөлімінен қараңыз.`,
        copyable: null
      };
    }

    // 6. Барлық жануарлар саны / тізімі
    if (q.includes("қанша жануар") || q.includes("барлық жануар") || q.includes("кімдер бар") || q.includes("тізім")) {
      return {
        text: `Сайтта қазір <strong>${pets.length} жануар</strong> бар:<br>${pets.map(formatPetLine).join("<br>")}`,
        copyable: null
      };
    }

    // 7. Жұмыс кестесі / қала / байланыс / көмек
    if (q.includes("жұмыс") || q.includes("кесте") || q.includes("24/7") || q.includes("қашан") || q.includes("уақыт")) {
      return {
        text: `«Четырелапы» панаханасы <strong>Семей қаласында 24/7 (тәулік бойы)</strong> жұмыс істейді.`,
        copyable: null
      };
    }

    if (q.includes("қала") || q.includes("қайда") || q.includes("мекен") || q.includes("адрес")) {
      return {
        text: `Баспана <strong>Семей қаласында</strong> орналасқан. Нақты бағыт пен кездесу уақытын «Көмектесу» бөліміндегі WhatsApp арқылы келісуге болады.`,
        copyable: null
      };
    }

    if (q.includes("көмек") || q.includes("kaspi") || q.includes("whatsapp") || q.includes("ақша") || q.includes("тамақ") || q.includes("ерікті")) {
      return {
        text: `Панаханаға көмектесу үшін <strong>«Көмектесу»</strong> вкладкасына өтіп, WhatsApp немесе Kaspi батырмаларын басыңыз. Тамақ, төсеніш, екпе/дәрі және ерікті ретінде көмек қабылданады.`,
        copyable: null
      };
    }

    // 8. Асырап алу / құжат / ақысы
    if (q.includes("асырап") || q.includes("алу") || q.includes("қалай аламын") || q.includes("тегін") || q.includes("ақы") || q.includes("құжат")) {
      return {
        text: `Жануарды асырап алу үшін алдымен «Жануарлар» бөлімінен өзіңізге ұнаған жануарды таңдап, мед. картасын қараңыз. Содан кейін «Көмектесу» бөліміндегі WhatsApp арқылы байланысып, кездесуді келісіңіз.`,
        copyable: null
      };
    }

    // 9. Тамақтандыру және күтім кеңесі
    if (q.includes("тамақтан") || q.includes("не жейді") || q.includes("күтім") || q.includes("екпе") || q.includes("ветеринар")) {
      return {
        text: `Жануарларды жасы мен түріне сай сапалы азықпен тамақтандырып, таза су мен жылы орын қамтамасыз еткен жөн. Сайттағы әр жануардың жасы, салмағы, екпелері және ветеринар қорытындысы мед. карточкасында көрсетілген.`,
        copyable: null
      };
    }

    // 10. Жануарды сипаттау сұранысы
    if (q.includes("сипат") || raw.includes(",")) {
      const cleaned = raw.replace(/сипаттап бер|сипаттама жаз|сипатта/gi, "").trim();
      const parts = cleaned.split(",");
      const petName = parts[0].trim() || "Жануар";
      const traits = parts.slice(1).join(",").trim() || "мейірімді, ақылды әрі адамға тез бауыр басады";
      const desc = `${petName} — ${traits} қасиеттері бар сүйкімді жануар. Семейдегі «Четырелапы» баспанасында 24/7 қамқорлық алып, өзінің жылы әрі адал отбасын күтіп жүр.`;
      return {
        text: `Дайын сипаттама:<br>${desc}`,
        copyable: { name: petName, desc }
      };
    }

    // 11. Кез келген басқа сөз/сұраққа пайдалы және түсінікті жауап
    return {
      text: `«${raw}» бойынша сұрағыңызды түсіндім. Мен Семейдегі <strong>«Четырелапы» (24/7)</strong> баспанасына көмектесемін: мысалы, <em>«мысық керек»</em>, <em>«ит керек»</em>, <em>«жұмыс кестесі»</em>, <em>«қалай көмектесуге болады»</em> немесе <em>«Ақтөс, мейірімді»</em> деп жазып көріңіз.`,
      copyable: null
    };
  };

  const askGeminiAi = async (raw) => {
    const catalogText = pets
      .map(
        (p) =>
          `${p.name} [түрі: ${p.category}, жасы: ${p.medical?.age || "-"}, салмағы: ${p.medical?.weight || "-"}, екпесі: ${p.medical?.vaccines || "-"}]: ${p.desc}`
      )
      .join(" | ");

    const systemInstruction = [
      "Сен Семей қаласындағы «Четырелапы» жануарлар панаханасының (жұмыс кестесі 24/7) онлайн ИИ-ассистентісің.",
      "Әрқашан қазақ тілінде нақты, сыпайы әрі түсінікті жауап бер.",
      "Егер қолданушы мысық, ит немесе басқа жануар сұраса, сайттағы нақты жануарлар тізімінен ең жақсы варианттарды ұсын.",
      "Егер қолданушы жануарды сипаттап беруді сұраса, әдемі сипаттама жазып бер.",
      "Кез келген басқа панахана, күтім, ветеринария немесе жалпы сұраққа да дұрыс әрі пайдалы жауап бер.",
      `Сайттағы жануарлар: ${catalogText}`
    ].join(" ");

    chatHistory.push({ role: "user", parts: [{ text: raw }] });
    if (chatHistory.length > 8) chatHistory.splice(0, chatHistory.length - 8);

    for (const modelName of GEMINI_MODELS) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 6000);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: chatHistory,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 500
            }
          })
        });
        clearTimeout(timer);

        if (!res.ok) continue;
        const data = await res.json();
        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (content) {
          chatHistory.push({ role: "model", parts: [{ text: content }] });
          const hasDescIntent = raw.toLowerCase().includes("сипат") || raw.includes(",");
          const petNameGuess = raw.split(",")[0].trim();
          return {
            text: content.replace(/\n/g, "<br>"),
            copyable: hasDescIntent ? { name: petNameGuess, desc: content } : null
          };
        }
      } catch {
        // Келесі модельге өту
      }
    }

    return buildSmartLocalReply(raw);
  };

  aiChatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const raw = aiChatInput.value.trim();
    if (!raw) return;

    const uMsg = document.createElement("div");
    uMsg.className = "ai-msg ai-msg--user";
    uMsg.textContent = raw;
    aiMessages.appendChild(uMsg);
    aiChatInput.value = "";

    const thinkingEl = document.createElement("div");
    thinkingEl.className = "ai-msg ai-msg--bot";
    thinkingEl.textContent = "Жауап дайындалуда...";
    aiMessages.appendChild(thinkingEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;

    const reply = await askGeminiAi(raw);
    thinkingEl.innerHTML = `<div>${reply.text}</div>`;

    if (reply.copyable) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ai-copy-btn";
      btn.textContent = "Өтінімге көшіру";
      btn.addEventListener("click", () => {
        if (!currentSession || currentSession.role === "guest") {
          togglePopover(false);
          switchTab("request");
          syncGuestRequestWall();
          return;
        }
        document.getElementById("petNameInput").value = reply.copyable.name;
        document.getElementById("petDescInput").value = reply.copyable.desc;
        togglePopover(false);
        switchTab("request");
      });
      thinkingEl.appendChild(btn);
    }

    aiMessages.scrollTop = aiMessages.scrollHeight;
  });

  // CSV жүктеу
  document.getElementById("downloadCsvBtn").addEventListener("click", () => {
    const rows = [
      "id,name,category,weight,schedule,city",
      ...pets.map((p, i) => `${i + 1},"${p.name}","${p.category}","${p.medical?.weight || ""}","24/7","Семей"`)
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chetyrelapy_semey_24_7.csv";
    a.click();
    URL.revokeObjectURL(url);
  });

  renderProverb();
  renderPets();
  renderAnalytics();
});