(() => {
  "use strict";

  const page = document.body.dataset.page;
  const rootUrl = new URL(`${document.body.dataset.root || "."}/`, document.baseURI);
  const eventGroups = {
    "SAP Inside Track": ["İstanbul", "Ankara"],
    "SAP CodeJam": ["İstanbul", "Ankara", "İzmir"],
    Meetup: ["İstanbul"]
  };
  const interfaceCopy = {
    en: {
      skipToContent: "Skip to content",
      home: "Home",
      events: "Events",
      whoWeAre: "Who We Are?",
      whatsappCommunity: "WhatsApp Community",
      stayConnected: "Stay connected",
      newsHeading: "News & Announcements",
      whatIsNext: "What is next",
      upcomingHeading: "Upcoming Events",
      ourArchive: "Our archive",
      pastHeading: "Past Events",
      browseLocalEvents: "Browse Local Events",
      ourCommunity: "Our community",
      whatBringsUsTogether: "What brings us together",
      findASession: "Find a session",
      chooseAGroup: "Choose a group",
      eventType: "Event type",
      city: "City",
      theDayAtAGlance: "The day at a glance",
      agenda: "Agenda",
      backToLocalEvents: "Back to Local Events",
      loadingCommunity: "Loading community content...",
      loadingCommunityInfo: "Loading community information...",
      loadingEventInfo: "Loading event...",
      loadingLocalEvents: "Loading local events...",
      communityUnavailable: "Community content is temporarily unavailable. Please try again later.",
      communityInfoUnavailable: "Community information is not available yet.",
      eventNotFound: "This event could not be found.",
      agendaUnavailable: "The agenda is not available yet.",
      dateToBeAnnounced: "Date to be announced",
      timeToBeAnnounced: "Time to be announced",
      communityUpdate: "Community update",
      readAnnouncement: "Read announcement ->",
      nothingNews: "Nothing here yet. Check back soon for community news.",
      nothingUpcoming: "Nothing here yet. New events will appear here soon.",
      nothingGroup: "Nothing here yet for this event type and city.",
      nothingHere: "Nothing here yet.",
      eventCountOne: "event",
      eventCountMany: "events",
      inThisGroup: "in this group",
      presentation: "Presentation",
      presentationNumber: "Presentation",
      date: "Date",
      location: "Location",
      presenters: "Presenters",
      eventTypes: eventGroups
    },
    tr: {
      skipToContent: "İçeriğe geç",
      home: "Ana Sayfa",
      events: "Etkinlikler",
      whoWeAre: "Biz Kimiz?",
      whatsappCommunity: "WhatsApp Topluluğu",
      stayConnected: "Bağlantıda kalın",
      newsHeading: "Haberler ve Duyurular",
      whatIsNext: "Sırada ne var",
      upcomingHeading: "Yaklaşan Etkinlikler",
      ourArchive: "Arşivimiz",
      pastHeading: "Geçmiş Etkinlikler",
      browseLocalEvents: "Yerel Etkinliklere Göz Atın",
      ourCommunity: "Topluluğumuz",
      whatBringsUsTogether: "Bizi bir araya getirenler",
      findASession: "Bir oturum bulun",
      chooseAGroup: "Bir grup seçin",
      eventType: "Etkinlik türü",
      city: "Şehir",
      theDayAtAGlance: "Günün akışı",
      agenda: "Program",
      backToLocalEvents: "Yerel Etkinliklere geri dön",
      loadingCommunity: "Topluluk içeriği yükleniyor...",
      loadingCommunityInfo: "Topluluk bilgileri yükleniyor...",
      loadingEventInfo: "Etkinlik yükleniyor...",
      loadingLocalEvents: "Yerel etkinlikler yükleniyor...",
      communityUnavailable: "Topluluk içeriğine şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyin.",
      communityInfoUnavailable: "Topluluk bilgileri henüz mevcut değil.",
      eventNotFound: "Bu etkinlik bulunamadı.",
      agendaUnavailable: "Program henüz mevcut değil.",
      dateToBeAnnounced: "Tarih daha sonra duyurulacak",
      timeToBeAnnounced: "Saat daha sonra duyurulacak",
      communityUpdate: "Topluluk güncellemesi",
      readAnnouncement: "Duyuruyu okuyun ->",
      nothingNews: "Henüz bir haber yok. Topluluk haberleri için yakında tekrar kontrol edin.",
      nothingUpcoming: "Henüz bir etkinlik yok. Yeni etkinlikler yakında burada görünecek.",
      nothingGroup: "Bu etkinlik türü ve şehir için henüz etkinlik yok.",
      nothingHere: "Henüz bir içerik yok.",
      eventCountOne: "etkinlik",
      eventCountMany: "etkinlik",
      inThisGroup: "bu grupta",
      presentation: "Sunum",
      presentationNumber: "Sunum",
      date: "Tarih",
      location: "Konum",
      presenters: "Konuşmacılar"
    }
  };
  const localeStorageKey = "sap-community-locale";
  let currentLocale = "tr";
  let translations = {};
  let contentData;

  try {
    currentLocale = localStorage.getItem(localeStorageKey) === "en" ? "en" : "tr";
  } catch (error) {
    currentLocale = "tr";
  }

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const htmlElement = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.innerHTML = html || "";
    return node;
  };

  const copy = (key) => interfaceCopy[currentLocale][key] || interfaceCopy.en[key] || "";

  const localizedRecord = (kind, record) => {
    if (currentLocale !== "tr" || !record) return record;
    return { ...record, ...(translations[kind]?.[record.id] || {}) };
  };

  const localizedSite = (site) => {
    if (currentLocale !== "tr") return site || {};
    const translation = translations.site || {};
    return {
      ...(site || {}),
      ...translation,
      eventDescriptions: translation.eventDescriptions || site?.eventDescriptions,
      whoWeAre: translation.whoWeAre || site?.whoWeAre
    };
  };

  const localizedEvent = (event) => {
    const result = localizedRecord("events", event);
    if (!result || !Array.isArray(result.agenda)) return result;
    const agendaTranslations = translations.events?.[event.id]?.agenda || [];
    return {
      ...result,
      agenda: result.agenda.map((item, index) => ({ ...item, ...(currentLocale === "tr" ? agendaTranslations[index] || {} : {}) }))
    };
  };

  const eventTypeLabel = (type) => currentLocale === "tr" ? translations.ui?.eventTypes?.[type] || type : type;

  const applyInterfaceCopy = () => {
    document.documentElement.lang = currentLocale;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = copy(node.dataset.i18n);
    });
  };

  const localUrl = (path) => new URL(path, rootUrl).href;
  const localHref = (path) => {
    const url = new URL(path, rootUrl);
    return `${url.pathname}${url.search}${url.hash}`;
  };

  const setState = (target, message, hidden = false) => {
    if (!target) return;
    target.textContent = message;
    target.hidden = hidden;
  };

  const formatDate = (value) => {
    if (!value) return copy("dateToBeAnnounced");
    if (value === "To Be Announced") return copy("dateToBeAnnounced");
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(currentLocale === "tr" ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };

  const addImage = (slot, source, alt, className) => {
    if (!slot || !source) return;
    const image = element("img", className);
    image.src = localUrl(source);
    image.alt = alt || "";
    image.addEventListener("error", () => {
      slot.hidden = true;
      slot.replaceChildren();
    });
    slot.append(image);
    slot.hidden = false;
  };

  const addLink = (parent, href, label, className = "text-link") => {
    if (!href) return;
    const link = element("a", className, label);
    link.href = href;
    parent.append(link);
  };

  const emptyState = (message) => element("p", "empty-state", message);

  const eventHref = (id) => localHref(`event.html?id=${encodeURIComponent(id)}`);

  const localEventsHref = (type, city) => localHref(`events/?type=${encodeURIComponent(type)}&city=${encodeURIComponent(city)}`);

  const renderLanguageSwitcher = () => {
    const target = document.getElementById("language-switcher");
    if (!target) return;
    target.replaceChildren();
    target.setAttribute("aria-label", currentLocale === "tr" ? "Dil seçimi" : "Language selection");
    [
      ["en", "🇬🇧", "English"],
      ["tr", "🇹🇷", "Türkçe"]
    ].forEach(([locale, flag, label]) => {
      const button = element("button", "language-button");
      button.type = "button";
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-pressed", String(currentLocale === locale));
      button.title = label;
      button.append(element("span", "language-flag", flag), element("span", "language-code", locale.toUpperCase()));
      button.addEventListener("click", () => {
        if (currentLocale === locale) return;
        currentLocale = locale;
        try {
          localStorage.setItem(localeStorageKey, locale);
        } catch (error) {
        }
        window.location.reload();
      });
      target.append(button);
    });
  };

  const activeNavigationId = () => {
    if (page === "landing") return "home";
    if (page === "who-we-are") return "who-we-are";
    if (page === "event-detail") return "events";
    if (page === "local-events") {
      const type = new URLSearchParams(window.location.search).get("type");
      return type === "SAP Inside Track" ? "sap-inside-track" : type === "SAP CodeJam" ? "sap-codejam" : type === "Meetup" ? "meetup" : "events";
    }
    return "";
  };

  const renderNavigation = (site) => {
    const target = document.getElementById("site-nav");
    if (!target) return;
    target.replaceChildren();
    const items = Array.isArray(site?.navigation) ? site.navigation : [];
    const activeId = activeNavigationId();
    items.forEach((item) => {
      if (!item || !item.label || !item.href) return;
      const isExternal = /^https?:\/\//.test(item.href);
      const label = currentLocale === "tr" ? translations.navigation?.[item.id] || item.label : item.label;
      const link = element("a", item.icon ? "site-nav__icon-link" : null, item.icon ? "" : label);
      link.href = isExternal ? item.href : localHref(item.href);
      if (isExternal) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      if (item.icon) {
        link.setAttribute("aria-label", label);
        link.title = label;
        const icon = element("img", "site-nav__icon");
        icon.src = localUrl(item.icon);
        icon.alt = "";
        link.append(icon);
      }
      if (item.id === activeId) link.setAttribute("aria-current", "page");
      target.append(link);
    });
  };

  const eventCard = (event) => {
    const localized = localizedEvent(event);
    const article = element("article", "content-card event-card");
    const type = element("p", "eyebrow", eventTypeLabel(event.type));
    const title = element("h3");
    const link = element("a", "card-link", localized.title);
    link.href = eventHref(event.id);
    title.append(link);
    const details = element("p", "card-meta", `${formatDate(event.date)} · ${event.city}`);
    const location = element("p", "card-copy", localized.location);
    article.append(type, title, details, location);
    if (Array.isArray(localized.speakers) && localized.speakers.length) {
      article.append(element("p", "card-copy", `${copy("presenters")}: ${localized.speakers.join(" · ")}`));
    }
    return article;
  };

  const renderNews = (news) => {
    const target = document.getElementById("news-list");
    if (!target) return;
    target.replaceChildren();
    const records = Array.isArray(news) ? [...news] : [];
    records.sort((first, second) => (second.date || "").localeCompare(first.date || ""));
    if (!records.length) {
      target.append(emptyState(copy("nothingNews")));
      return;
    }
    records.forEach((item) => {
      if (!item || !item.title || !item.description) return;
      const localized = localizedRecord("news", item);
      const article = element("article", "content-card");
      if (item.image) {
        const imageSlot = element("div", "card-image");
        addImage(imageSlot, item.image, localized.imageAlt || localized.title, "responsive-image");
        article.append(imageSlot);
      }
      article.append(element("p", "eyebrow", item.date ? formatDate(item.date) : copy("communityUpdate")));
      article.append(element("h3", null, localized.title));
      article.append(htmlElement("div", "card-copy", localized.description));
      if (item.externalLink) addLink(article, item.externalLink, localized.externalLinkText || copy("readAnnouncement"));
      target.append(article);
    });
    if (!target.children.length) target.append(emptyState(copy("nothingNews")));
  };

  const renderEventList = (targetId, events, emptyMessage) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.replaceChildren();
    const records = Array.isArray(events) ? events.filter(Boolean) : [];
    records.sort((first, second) => {
      const firstStatus = first.status === "upcoming" ? 0 : 1;
      const secondStatus = second.status === "upcoming" ? 0 : 1;
      if (firstStatus !== secondStatus) return firstStatus - secondStatus;
      const firstHasDate = /^\d{4}-\d{2}-\d{2}$/.test(first.date || "");
      const secondHasDate = /^\d{4}-\d{2}-\d{2}$/.test(second.date || "");
      if (firstHasDate !== secondHasDate) return firstHasDate ? -1 : 1;
      return firstStatus === 0
        ? (first.date || "").localeCompare(second.date || "")
        : (second.date || "").localeCompare(first.date || "");
    });
    if (!records.length) {
      target.append(emptyState(emptyMessage));
      return;
    }
    records.forEach((event) => target.append(eventCard(event)));
  };

  const renderPastGroups = (events) => {
    const target = document.getElementById("past-groups");
    if (!target) return;
    target.replaceChildren();
    Object.entries({
      "SAP Inside Track": ["İstanbul", "Ankara"],
      "SAP CodeJam": ["İstanbul", "Ankara", "İzmir"],
      Meetup: ["İstanbul", "Ankara", "İzmir"]
    }).forEach(([type, cities]) => {
      const group = element("section", "event-group");
      group.append(element("h3", null, eventTypeLabel(type)));
      cities.forEach((city) => {
        const cityGroup = element("div", "city-group");
        cityGroup.append(element("h4", null, city));
        const matches = (events || []).filter((event) => event.status === "past" && event.type === type && event.city === city);
        if (matches.length) {
          const list = element("div", "group-list");
          matches.sort((first, second) => (second.date || "").localeCompare(first.date || ""));
          matches.slice(0, 3).forEach((event) => list.append(eventCard(event)));
          cityGroup.append(list);
          if (matches.length > 3) {
            const moreLink = element("a", "more-link", currentLocale === "tr" ? "Daha fazla" : "More");
            moreLink.href = localEventsHref(type, city);
            moreLink.setAttribute("aria-label", `${currentLocale === "tr" ? "Daha fazla" : "More"} ${eventTypeLabel(type)} ${currentLocale === "tr" ? "etkinliği" : "events"} ${city}`);
            cityGroup.append(moreLink);
          }
        } else {
          cityGroup.append(emptyState(copy("nothingHere")));
        }
        group.append(cityGroup);
      });
      target.append(group);
    });
  };

  const renderLanding = ({ site, news, events }) => {
    const overview = localizedSite(site);
    document.title = overview.title || "SAP Community Türkiye";
    const title = document.getElementById("site-title");
    const name = document.getElementById("site-name");
    const description = document.getElementById("site-description");
    if (title) title.textContent = overview.title || "SAP Community Türkiye";
    if (name) name.textContent = overview.title || "SAP Community Türkiye";
    if (description) description.innerHTML = overview.description || "";
    addImage(document.getElementById("logo-slot"), overview.logo, overview.logoAlt, "site-logo");
    setState(document.getElementById("landing-state"), "", true);
    renderNews(news);
    renderEventList("upcoming-list", (events || []).filter((event) => event && event.status === "upcoming"), copy("nothingUpcoming"));
    renderPastGroups(events);
  };

  const renderLocalEvents = (events, site) => {
    const typeSelect = document.getElementById("event-type");
    const citySelect = document.getElementById("event-city");
    const results = document.getElementById("event-results");
    const state = document.getElementById("events-state");
    if (!typeSelect || !citySelect || !results) return;
    typeSelect.replaceChildren();
    ["Events", ...Object.keys(eventGroups)].forEach((type) => {
      const option = element("option", null, eventTypeLabel(type));
      option.value = type;
      typeSelect.append(option);
    });
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("type");
    let requestedCity = params.get("city");
    const selectedType = eventGroups[requestedType] ? requestedType : "Events";
    if (eventGroups[requestedType]) typeSelect.value = requestedType;
    const pageTitle = document.getElementById("page-title");
    const pageDescription = document.getElementById("page-description");
    const descriptions = localizedSite(site).eventDescriptions || {};
    if (pageTitle) pageTitle.textContent = selectedType === "Events" ? copy("events") : eventTypeLabel(selectedType);
    if (pageDescription) pageDescription.innerHTML = descriptions[selectedType] || "";
    document.title = `${selectedType === "Events" ? copy("events") : eventTypeLabel(selectedType)} | SAP Community Türkiye`;
    const updateCities = () => {
      citySelect.replaceChildren();
      const cities = typeSelect.value === "Events" ? ["İstanbul", "Ankara", "İzmir"] : eventGroups[typeSelect.value] || [];
      cities.forEach((city) => citySelect.append(element("option", null, city)));
      if (requestedCity && cities.includes(requestedCity)) citySelect.value = requestedCity;
      requestedCity = "";
      renderResults();
    };
    const renderResults = () => {
      const matches = (events || []).filter((event) => event && (typeSelect.value === "Events" || event.type === typeSelect.value) && event.city === citySelect.value);
      renderEventList("event-results", matches, copy("nothingGroup"));
      const countLabel = copy(matches.length === 1 ? "eventCountOne" : "eventCountMany");
      const countMessage = currentLocale === "tr"
        ? `${matches.length} ${countLabel} ${citySelect.value || "bu grupta"}.`
        : `${matches.length} ${countLabel} in ${citySelect.value || copy("inThisGroup")}.`;
      setState(state, countMessage, false);
    };
    typeSelect.addEventListener("change", updateCities);
    citySelect.addEventListener("change", renderResults);
    updateCities();
  };

  const addMeta = (target, label, value) => {
    if (!value) return;
    target.append(element("dt", null, label), element("dd", null, value));
  };

  const renderAgendaItem = (item) => {
    const listItem = element("li", "agenda-item");
    const time = element("div", "agenda-time");
    time.append(element("time", null, item.startTime || copy("timeToBeAnnounced")));
    time.append(element("span", "time-divider", "-") , element("time", null, item.endTime || copy("timeToBeAnnounced")));
    const body = element("div", "agenda-body");
    body.append(element("h3", null, item.title));
    if (Array.isArray(item.speakers) && item.speakers.length) {
      const speakers = element("p", "speaker-list");
      item.speakers.forEach((speaker, index) => {
        const href = Array.isArray(item.speakerLinks) ? item.speakerLinks[index] : "";
        if (href) addLink(speakers, href, speaker, "speaker-link");
        else speakers.append(element("span", null, speaker));
        if (index < item.speakers.length - 1) speakers.append(document.createTextNode(" · "));
      });
      body.append(speakers);
    }
    const presentations = Array.isArray(item.presentationLinks) ? item.presentationLinks : item.presentationLink ? [item.presentationLink] : [];
    if (presentations.length) {
      const links = element("div", "presentation-links");
      presentations.forEach((path, index) => {
        const link = element("a", "presentation-link");
        link.href = localUrl(path);
        link.target = "_blank";
        link.rel = "noopener";
        const icon = element("img", "presentation-icon");
        icon.src = localUrl("resources/pdf.png");
        icon.alt = "";
        link.append(icon, element("span", null, presentations.length > 1 ? `${copy("presentationNumber")} ${index + 1}` : copy("presentation")));
        links.append(link);
      });
      body.append(links);
    }
    listItem.append(time, body);
    return listItem;
  };

  const renderDetail = (events) => {
    const state = document.getElementById("event-state");
    const content = document.getElementById("event-content");
    const id = new URLSearchParams(window.location.search).get("id");
    const event = (events || []).find((item) => item && item.id === id);
    if (!event) {
      setState(state, copy("eventNotFound"), false);
      return;
    }
    const localized = localizedEvent(event);
    document.title = `${localized.title} | SAP Community Türkiye`;
    document.getElementById("event-type").textContent = eventTypeLabel(event.type);
    document.getElementById("event-title").textContent = localized.title;
    const meta = document.getElementById("event-meta");
    addMeta(meta, copy("date"), formatDate(event.date));
    addMeta(meta, copy("location"), `${localized.location} · ${event.city}`);
    addMeta(meta, copy("presenters"), Array.isArray(localized.speakers) ? localized.speakers.join(" · ") : "");
    addImage(document.getElementById("event-image-slot"), event.image, localized.imageAlt || localized.title, "event-image");
    const agenda = document.getElementById("agenda-list");
    agenda.replaceChildren();
    if (Array.isArray(localized.agenda) && localized.agenda.length) localized.agenda.forEach((item) => agenda.append(renderAgendaItem(item)));
    else agenda.append(emptyState(copy("agendaUnavailable")));
    content.hidden = false;
    setState(state, "", true);
  };

  const renderWhoWeAre = (site) => {
    const content = localizedSite(site).whoWeAre || {};
    const title = document.getElementById("who-title");
    const description = document.getElementById("who-description");
    const target = document.getElementById("who-highlights");
    const state = document.getElementById("who-state");
    document.title = `${content.title || copy("whoWeAre")} | SAP Community Türkiye`;
    if (title) title.textContent = content.title || "";
    if (description) description.innerHTML = content.description || "";
    if (!target) return;
    target.replaceChildren();
    const highlights = Array.isArray(content.highlights) ? content.highlights : [];
    highlights.forEach((item) => {
      if (!item || !item.title || !item.description) return;
      const card = element("article", "content-card");
      card.append(element("h3", null, item.title), htmlElement("div", "card-copy", item.description));
      target.append(card);
    });
    if (target.children.length) setState(state, "", true);
    else setState(state, copy("communityInfoUnavailable"), false);
  };

  const renderPage = () => {
    applyInterfaceCopy();
    renderLanguageSwitcher();
    renderNavigation(contentData.site);
    if (page === "landing") renderLanding(contentData);
    if (page === "local-events") renderLocalEvents(contentData.events, contentData.site);
    if (page === "event-detail") renderDetail(contentData.events);
    if (page === "who-we-are") renderWhoWeAre(contentData.site);
  };

  const load = async () => {
    const contentFiles = currentLocale === "tr"
      ? ["content/site_tr.json", "content/news_tr.json", "content/events_tr.json"]
      : ["content/site.json", "content/news.json", "content/events.json"];
    const [site, news, events] = await Promise.all(contentFiles.map((file) =>
      fetch(localUrl(file)).then((response) => response.json())
    ));
    contentData = {
      site,
      news: Array.isArray(news) ? news : [],
      events: Array.isArray(events) ? events : []
    };
    renderPage();
  };

  load().catch(() => {
    const stateId = page === "landing" ? "landing-state" : page === "local-events" ? "events-state" : page === "who-we-are" ? "who-state" : "event-state";
    setState(document.getElementById(stateId), copy("communityUnavailable"), false);
  });
})();
