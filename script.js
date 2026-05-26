/* ============================================================
   SillyOS v4.0 — script.js
   - Netflix / third-party apps removed
   - Minecraft preserved
   - Games app added
   - Dynamic widget system
   - All windows have working title bars
   ============================================================ */

'use strict';

/* ── APPS REGISTRY ─────────────────────────────────────────── */
var APPS = {
  'minecraft': {
    title: 'Minecraft',
    path: 'script/Apps/Minecraft/index.html',
    icon: 'script/Apps/Minecraft/icon.png',
    pinned: true,
    windowed: true
  },
  'games': {
    title: 'Games',
    path: 'script/Apps/Games/index.html',
    icon: 'https://cdn-icons-png.flaticon.com/512/3408/3408517.png',
    pinned: true
  },
  'web': {
    title: 'Browser',
    path: 'script/Apps/Web/index.html',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png',
    pinned: true
  },
  'discord': {
    title: 'Discord',
    path: 'script/Apps/Discord/index.html',
    icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
    pinned: true
  },
  'settings': {
    title: 'Settings',
    internal: true,
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png',
    pinned: true
  },
  'ciri': {
    title: 'Ciri AI',
    internal: 'ciri',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkLXhvns5Rrdf-XBNlWcPIRh0hlJfWnEtBWg&s',
    pinned: false
  }
};

/* Restore pin states */
(function() {
  var saved = localStorage.getItem('silly_pins_v4');
  if (saved) {
    var p = JSON.parse(saved);
    for (var k in p) { if (APPS[k]) APPS[k].pinned = p[k]; }
  }
})();

function syncPins() {
  var obj = {};
  for (var k in APPS) obj[k] = APPS[k].pinned;
  localStorage.setItem('silly_pins_v4', JSON.stringify(obj));
}

/* ── WALLPAPERS ─────────────────────────────────────────────── */
var wallpaperRegistry = {
  'Default':     {name:'Snake Skeleton',   url:'Videos/default.mp4',      locked:false},
  'green':       {name:'Green Anime',      url:'Videos/green.mp4',        locked:false},
  'CozyFox':     {name:'Cozy Fox',         url:'Videos/CozyFox.mp4',      locked:false},
  'RainyCity':   {name:'Rainy City',       url:'Videos/RainyCity.mp4',    locked:false},
  'Minecraft01': {name:'Minecraft 01',     url:'Videos/Minecraft01.mp4',  locked:false},
  'Minecraft02': {name:'Minecraft 02',     url:'Videos/Minecraft02.mp4',  locked:false},
  'Minecraft03': {name:'Minecraft 03',     url:'Videos/Minecraft03.mp4',  locked:false},
  'Gojo':        {name:'Gojo',             url:'Videos/Gojo.mp4',         locked:false},
  'BlackHole':   {name:'Black Hole',       url:'Videos/BlackHole.mp4',    locked:false},
  'Desktop':     {name:'Desktop Lines',    url:'Videos/Desktop.mp4',      locked:false},
  'F-1':         {name:'F-1 Formula',      url:'Videos/F-1.mp4',          locked:false},
  'SnowFox':     {name:'Snow Fox',         url:'Videos/SnowFox.mp4',      locked:false},
  'Supra':       {name:'Supra Drift',      url:'Videos/Supra.PNG',        locked:false},
  '55Cine':      {name:'Cine 55',          url:'Videos/55Cine.PNG',       locked:false},
  'Skello':      {name:'Skello',           url:'Videos/Skello.MP4',       locked:true},
  'Gojo-Sukuna': {name:'Gojo vs Sukuna',   url:'Videos/Gojo-Sukuna.mp4',  locked:true},
  'sukuna-fire': {name:'Sukuna Fire',      url:'Videos/sukuna-fire.mp4',  locked:true},
  '33A56':       {name:'Hunt Showdown',    url:'Videos/33A56.mp4',        locked:true},
  'Yuji52':      {name:'Yuji 52',          url:'Videos/Yuji52.mp4',       locked:true}
};

/* ── SYSTEM CONFIG ──────────────────────────────────────────── */
var sysConfig = JSON.parse(localStorage.getItem('silly_sys_config')) || {};
if (sysConfig.optBg === undefined)         sysConfig.optBg = false;
if (sysConfig.shortBoot === undefined)     sysConfig.shortBoot = true;
if (sysConfig.wpLoop === undefined)        sysConfig.wpLoop = false;
if (sysConfig.idleLock === undefined)      sysConfig.idleLock = false;
if (sysConfig.redirectConfirm === undefined) sysConfig.redirectConfirm = false;
if (!sysConfig.panicKey)                   sysConfig.panicKey = '`';
if (!sysConfig.homeWallpaper)              sysConfig.homeWallpaper = 'Default';
if (!sysConfig.lockWallpaper)             sysConfig.lockWallpaper = 'green';
if (!sysConfig.cloak)                      sysConfig.cloak = 'none';

function saveSysConfig() {
  localStorage.setItem('silly_sys_config', JSON.stringify(sysConfig));
}

window.updateSysSetting = function(key, value) {
  sysConfig[key] = value;
  saveSysConfig();
  if (key === 'optBg') applySystemSettings();
};

/* ── CLOAKING ───────────────────────────────────────────────── */
var cloaks = {
  none:      {title:'SillyOS',                  icon:''},
  google:    {title:'Google',                   icon:'https://www.google.com/favicon.ico'},
  drive:     {title:'My Drive - Google Drive',  icon:'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'},
  canvas:    {title:'Dashboard',                icon:'https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e10d657a73.ico'},
  classroom: {title:'Classes',                  icon:'https://ssl.gstatic.com/classroom/favicon.png'}
};

function applyCloak() {
  var k = sysConfig.cloak || 'none';
  var sel = cloaks[k];
  document.querySelectorAll("link[rel*='icon']").forEach(function(l){l.remove();});
  if (sel && k !== 'none') {
    document.title = sel.title;
    var lnk = document.createElement('link');
    lnk.type = 'image/x-icon'; lnk.rel = 'shortcut icon'; lnk.href = sel.icon;
    document.head.appendChild(lnk);
  } else { document.title = 'SillyOS'; }
}
window.updateCloak = function(key) { sysConfig.cloak = key; saveSysConfig(); applyCloak(); };
setInterval(applyCloak, 2000);

/* ── STATE ──────────────────────────────────────────────────── */
var isDesktopActive = false;
var bootActive = true;
var enterCount = 0;
var highestZ = 500;
var activeWindowId = null;
var window_wpMode = 'both';
window.wpMode = 'both';

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var activeCtxId = null;
var desktopLayout = JSON.parse(localStorage.getItem('silly_desktop_v4')) || [];

function saveDesktop() { localStorage.setItem('silly_desktop_v4', JSON.stringify(desktopLayout)); loadDesktop(); }

/* ── WIDGETS STATE ──────────────────────────────────────────── */
var widgetInstances = JSON.parse(localStorage.getItem('silly_widgets_v4')) || [];

function saveWidgets() { localStorage.setItem('silly_widgets_v4', JSON.stringify(widgetInstances)); }

/* ── WIDGET CATALOG DEFINITION ──────────────────────────────── */
var WIDGET_CATALOG = [
  {type:'clock',    name:'Clock',         desc:'Live digital clock', icon:'🕐', color:'#6c8fff'},
  {type:'calendar', name:'Calendar',      desc:'Monthly calendar view', icon:'📅', color:'#a78bfa'},
  {type:'sysmon',   name:'System Monitor',desc:'CPU & RAM usage bars', icon:'📊', color:'#28c840'},
  {type:'notes',    name:'Quick Notes',   desc:'Sticky note for reminders', icon:'📝', color:'#febc2e'},
  {type:'weather',  name:'Weather',       desc:'Current conditions', icon:'⛅', color:'#38bdf8'}
];

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  applyCloak();
  if (isMobile) {
    var mw = document.getElementById('mobile-warning');
    if (mw) { if (mw.showModal) mw.showModal(); else mw.style.display = 'flex'; }
    var lastTap = 0;
    document.addEventListener('touchstart', function(e) {
      var t = Date.now(), tl = t - lastTap;
      if (tl < 500 && tl > 0) { if (mw && mw.close) mw.close(); else if (mw) mw.style.display = 'none'; }
      lastTap = t;
    });
  }
  renderUI();
  initWallpapers();
  setupAppContextMenu();
  initFPS();
  initClock();
  document.getElementById('boot-layer').style.display = 'flex';
  loadDesktop();
  renderWidgets();
  updateWidgetPanel();
  DragSystem.init();
  initMediaPlayer();
});

window.onbeforeunload = function(e) {
  if (sysConfig.redirectConfirm) {
    var m = 'Leave SillyOS?';
    e.returnValue = m; return m;
  }
};

/* ── FPS COUNTER ────────────────────────────────────────────── */
function initFPS() {
  var last = performance.now(), frames = 0;
  var el = document.getElementById('fps-val');
  function loop(now) {
    frames++;
    if (now - last >= 1000) {
      if (el) el.textContent = frames;
      frames = 0; last = now;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* ── CLOCK ──────────────────────────────────────────────────── */
var DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var MONTHS_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function initClock() { updateClock(); setInterval(updateClock, 1000); }

function updateClock() {
  var now = new Date();
  var day = DAYS[now.getDay()];
  var h = now.getHours(), m = now.getMinutes();
  var ampm = h >= 12 ? 'PM' : 'AM';
  var h12 = h % 12 || 12;
  var mStr = m < 10 ? '0' + m : m;
  var timeStr = h12 + ':' + mStr + ' ' + ampm;
  var dateStr = now.getDate() + ' ' + MONTHS_SHORT[now.getMonth()] + ', ' + now.getFullYear() + '.';

  var el;
  el = document.getElementById('lbl-day'); if (el) el.textContent = day;
  el = document.getElementById('hud-clock'); if (el) el.textContent = timeStr;
  el = document.getElementById('lock-day-large'); if (el) el.textContent = day;
  el = document.getElementById('lock-date'); if (el) el.textContent = dateStr;
  el = document.getElementById('lock-time'); if (el) el.textContent = '– ' + timeStr + ' –';

  /* Update clock widgets */
  document.querySelectorAll('.widget-clock-time').forEach(function(w){ w.textContent = timeStr; });
  document.querySelectorAll('.widget-clock-date').forEach(function(w){ w.textContent = dateStr; });
}

/* ── BOOT ───────────────────────────────────────────────────── */
function startBootSequence() {
  var cb = document.getElementById('boot-content');
  var bv = document.getElementById('boot-video');
  cb.style.display = 'none';
  bv.style.display = 'block';
  bv.muted = false; bv.volume = 1.0;
  if (sysConfig.shortBoot) { bv.src = 'Videos/QuickBoot.mp4'; bv.load(); }
  var p = bv.play();
  if (p) p.catch(function(){ bv.muted = true; bv.play(); });
  bv.onended = function() { if (bootActive) skipBootSequence(); };
}

function skipBootSequence() {
  if (!bootActive) return;
  bootActive = false;
  var lay = document.getElementById('boot-layer');
  var bv = document.getElementById('boot-video');
  if (bv) bv.pause();
  if (lay) { lay.style.opacity = '0'; setTimeout(function(){ lay.style.display = 'none'; }, 600); }
  var ls = document.getElementById('lock-screen');
  ls.classList.add('active');
  var lv = document.getElementById('lock-video');
  if (lv && lv.style.display !== 'none') lv.play().catch(function(){});
}

document.addEventListener('keydown', function(e) {
  if (bootActive && e.key === 'Enter') {
    enterCount++;
    if (enterCount >= 2) skipBootSequence();
    setTimeout(function(){ enterCount = 0; }, 500);
  }
  if (e.key && sysConfig.panicKey && e.key.toLowerCase() === sysConfig.panicKey.toLowerCase()) {
    window.location.href = 'https://google.com';
  }
});

/* ── LOCK SCREEN ────────────────────────────────────────────── */
function unlockSystem() {
  var ls = document.getElementById('lock-screen');
  ls.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s';
  ls.style.transform = 'translateY(-100%)';
  ls.style.opacity = '0';
  setTimeout(function() { ls.classList.remove('active'); ls.style.transform = ''; ls.style.opacity = ''; }, 500);
  if (!isDesktopActive) { isDesktopActive = true; applySystemSettings(); }
}

/* ── WALLPAPERS ─────────────────────────────────────────────── */
function applySystemSettings() {
  var bgV = document.getElementById('bg-video');
  var bgI = document.getElementById('bg-img');
  if (sysConfig.optBg) { bgV.pause(); bgV.style.display = 'none'; bgI.style.display = 'none'; return; }
  var wp = wallpaperRegistry[sysConfig.homeWallpaper] || wallpaperRegistry['Default'];
  setMedia(bgV, bgI, wp.url);
}

function setMedia(vid, img, url) {
  var isImg = /\.(png|jpg|jpeg|gif|webp)$/i.test(url);
  if (isImg) {
    vid.style.display = 'none'; img.style.display = 'block'; img.src = url;
  } else {
    img.style.display = 'none'; vid.style.display = 'block';
    if (vid.getAttribute('data-src') !== url) {
      vid.setAttribute('data-src', url);
      vid.src = url; vid.load(); vid.play().catch(function(){});
    }
  }
}

function initWallpapers() {
  /* Lock screen */
  var lv = document.getElementById('lock-video');
  var li = document.getElementById('lock-img');
  var lw = wallpaperRegistry[sysConfig.lockWallpaper] || wallpaperRegistry['green'];
  setMedia(lv, li, lw.url);

  /* Home */
  applySystemSettings();
  populateWpGrid();

  var loopChk = document.getElementById('wp-loop-chk');
  if (loopChk) {
    loopChk.checked = sysConfig.wpLoop;
    loopChk.onchange = function() { sysConfig.wpLoop = this.checked; saveSysConfig(); updateWallpaperLoop(); };
  }
}

function updateWallpaperLoop() {
  var bv = document.getElementById('bg-video');
  if (bv) bv.loop = sysConfig.wpLoop;
}

function populateWpGrid() {
  var ul = document.getElementById('wp-grid-unlocked');
  var ll = document.getElementById('wp-grid-locked');
  if (!ul || !ll) return;
  ul.innerHTML = ''; ll.innerHTML = '';
  for (var id in wallpaperRegistry) {
    (function(wid) {
      var wp = wallpaperRegistry[wid];
      var div = document.createElement('div');
      div.className = 'wp-thumb';
      var isImg = /\.(png|jpg|jpeg|gif|webp)$/i.test(wp.url);
      div.innerHTML = (isImg ? '<img src="' + wp.url + '">' : '<video src="' + wp.url + '" muted loop autoplay></video>') +
        '<div class="wp-name">' + wp.name + '</div>' +
        (wp.locked ? '<i class="fas fa-lock wp-lock"></i>' : '');
      div.onclick = function() {
        var mode = window.wpMode || 'both';
        if (mode === 'both' || mode === 'home') { sysConfig.homeWallpaper = wid; saveSysConfig(); applySystemSettings(); }
        if (mode === 'both' || mode === 'lock') { sysConfig.lockWallpaper = wid; saveSysConfig(); var lv=document.getElementById('lock-video'),li=document.getElementById('lock-img'); setMedia(lv,li,wp.url); }
        showNotification('Wallpaper', 'Applied: ' + wp.name);
      };
      (wp.locked ? ll : ul).appendChild(div);
    })(id);
  }
}

function openWallpaperMenu() {
  var m = document.getElementById('wallpaper-menu');
  if (m) { m.classList.add('open'); if (m.showModal) try { m.showModal(); } catch(e) {} }
}

/* ── RENDER UI (DOCK + START MENU) ─────────────────────────── */
function renderUI() {
  var dock = document.getElementById('dock-container');
  var pGrid = document.getElementById('pinned-grid');
  if (!dock) return;

  var dHTML = '';
  /* Start menu button */
  dHTML += '<div class="dock-item" data-label="Start" onclick="toggleStartMenu()" title="Start Menu">' +
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="#aaa"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>';
  dHTML += '<div class="dock-sep"></div>';
  /* App drawer */
  dHTML += '<div class="dock-item" data-label="All Apps" onclick="toggleAppDrawer()" title="All Apps">' +
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="#aaa"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg></div>';
  dHTML += '<div class="dock-sep"></div>';

  var pHTML = '';
  for (var id in APPS) {
    if (!APPS[id].pinned) continue;
    var app = APPS[id];
    dHTML += '<div class="dock-item" data-id="' + id + '" data-label="' + app.title + '" ' +
      'onmousedown="DragSystem.start(event,this,\'dock\',\'' + id + '\')" ' +
      'onclick="toggleApp(\'' + id + '\')" ' +
      'oncontextmenu="openDockCtx(event,\'' + id + '\')" ' +
      'title="' + app.title + '">' +
      '<img src="' + app.icon + '" alt="' + app.title + '"></div>';
    pHTML += '<div class="pinned-item" onclick="toggleApp(\'' + id + '\')">' +
      '<img src="' + app.icon + '" alt="' + app.title + '"><span>' + app.title + '</span></div>';
  }

  dock.innerHTML = dHTML;
  if (pGrid) pGrid.innerHTML = pHTML;
  populateDrawer();
  setupDockHandlers();
}

function setupDockHandlers() {
  var ctxPin = document.getElementById('ctx-pin-app');
  var ctxUnpin = document.getElementById('ctx-unpin-app');
  if (ctxPin) ctxPin.onclick = function() {
    if (activeCtxId && APPS[activeCtxId]) { APPS[activeCtxId].pinned = true; syncPins(); renderUI(); }
    hideAllCtx();
  };
  if (ctxUnpin) ctxUnpin.onclick = function() {
    if (activeCtxId && APPS[activeCtxId]) { APPS[activeCtxId].pinned = false; syncPins(); renderUI(); }
    hideAllCtx();
  };
}

function populateDrawer() {
  var grid = document.getElementById('drawer-grid');
  if (!grid) return;
  var html = '';
  for (var id in APPS) {
    var app = APPS[id];
    html += '<div class="drawer-item" oncontextmenu="openDrawerCtx(event,\'' + id + '\')" ' +
      'onmousedown="DragSystem.start(event,this,\'drawer\',\'' + id + '\')" ' +
      'ondblclick="toggleApp(\'' + id + '\');toggleAppDrawer()">' +
      '<img src="' + app.icon + '" alt="' + app.title + '"><span>' + app.title + '</span></div>';
  }
  grid.innerHTML = html;
}

function filterDrawer(query) {
  var q = query.toLowerCase();
  var items = document.querySelectorAll('.drawer-item');
  items.forEach(function(item) {
    var name = item.querySelector('span') ? item.querySelector('span').textContent.toLowerCase() : '';
    item.style.display = name.includes(q) ? '' : 'none';
  });
}

/* ── CONTEXT MENUS ──────────────────────────────────────────── */
function openDockCtx(e, id) { e.preventDefault(); e.stopPropagation(); hideAllCtx(); activeCtxId = id; showCtx('dock-ctx-menu', e.pageX, e.pageY); }
function openDrawerCtx(e, id) { e.preventDefault(); e.stopPropagation(); hideAllCtx(); activeCtxId = id; showCtx('drawer-ctx-menu', e.pageX, e.pageY); }

function showCtx(menuId, x, y) {
  var m = document.getElementById(menuId);
  if (!m) return;
  m.style.display = 'block';
  m.style.left = Math.min(x, window.innerWidth - m.offsetWidth - 10) + 'px';
  m.style.top = Math.min(y, window.innerHeight - 150) + 'px';
}

function hideAllCtx() {
  ['app-context-menu','desktop-context-menu','drawer-ctx-menu','dock-ctx-menu'].forEach(function(id) {
    var m = document.getElementById(id);
    if (m) m.style.display = 'none';
  });
}
document.addEventListener('click', hideAllCtx);

document.addEventListener('contextmenu', function(e) {
  var desktop_ids = ['desktop-area','windows-layer','bg-video','bg-img','snow-fx'];
  if (desktop_ids.includes(e.target.id) || e.target.tagName === 'BODY') {
    e.preventDefault(); hideAllCtx(); showCtx('desktop-context-menu', e.pageX, e.pageY);
  }
});

/* ── TOGGLE MENUS ───────────────────────────────────────────── */
function toggleStartMenu() {
  var m = document.getElementById('start-menu');
  if (!m) return;
  if (m.classList.contains('open')) { m.classList.remove('open'); setTimeout(function(){ m.style.display='none'; }, 250); }
  else { m.style.display = 'flex'; requestAnimationFrame(function(){ m.classList.add('open'); }); }
}

function toggleAppDrawer() {
  var d = document.getElementById('app-drawer');
  if (!d) return;
  if (d.open) { if (d.close) d.close(); else d.style.display='none'; }
  else { if (d.showModal) d.showModal(); else d.style.display='block'; }
}

/* ── TOGGLE APP ─────────────────────────────────────────────── */
function launchLastPlayed() {
  var last = localStorage.getItem('silly_last_app');
  if (last && APPS[last]) toggleApp(last);
}

function toggleApp(id) {
  var app = APPS[id];
  if (!app) return;

  /* Ciri special case */
  if (app.internal === 'ciri') { toggleCiri(); return; }

  /* Close start menu */
  var sm = document.getElementById('start-menu');
  if (sm) { sm.classList.remove('open'); sm.style.display = 'none'; }

  var win = document.getElementById('win-' + id);
  if (win) {
    if (win.classList.contains('minimized')) {
      win.classList.remove('minimized'); win.classList.add('active'); win.style.zIndex = ++highestZ;
    } else if (win.style.zIndex == highestZ) {
      minimizeWindow(id);
    } else {
      win.style.zIndex = ++highestZ; activeWindowId = id;
    }
  } else {
    openWindow(id);
  }

  /* Track last played */
  localStorage.setItem('silly_last_app', id);
  var lgn = document.getElementById('last-game-name');
  var lgi = document.getElementById('last-game-icon');
  if (lgn) lgn.textContent = app.title;
  if (lgi) lgi.src = app.icon;
}

function openWindow(id) {
  var dat = APPS[id] || {title:'App', path:'about:blank'};
  var layer = document.getElementById('windows-layer');
  var win = document.createElement('div');
  win.id = 'win-' + id;
  win.className = 'window active';
  win.style.zIndex = ++highestZ;

  /* Cascaded positioning */
  var openCount = document.querySelectorAll('.window').length;
  var cascade = (openCount % 6) * 28;
  var ww = Math.min(960, window.innerWidth * 0.88);
  var wh = Math.min(660, window.innerHeight * 0.84);
  var lft = Math.max(60, (window.innerWidth - ww) / 2 + cascade);
  var top = Math.max(50, (window.innerHeight - wh) / 2 + cascade);
  win.style.width = ww + 'px'; win.style.height = wh + 'px';
  win.style.left = lft + 'px'; win.style.top = top + 'px';

  var iconHtml = dat.icon ? '<img class="win-icon" src="' + dat.icon + '" alt="">' : '';
  var bodyContent = dat.internal
    ? '<iframe id="frame-' + id + '"></iframe>'
    : '<iframe id="frame-' + id + '" src="' + dat.path + '" allowfullscreen allow="autoplay;fullscreen;gamepad;microphone;camera;pointer-lock;clipboard-read;clipboard-write" referrerpolicy="no-referrer"></iframe>';

  win.innerHTML =
    '<div class="win-header" onmousedown="DragSystem.startWinDrag(event,\'' + id + '\')" ondblclick="toggleMaximizeWindow(\'' + id + '\')">' +
      '<div class="win-title-row">' + iconHtml + '<span class="win-title">' + dat.title + '</span></div>' +
      '<div class="win-controls">' +
        '<div class="win-btn btn-close" onclick="event.stopPropagation();closeWindow(\'' + id + '\')" title="Close"></div>' +
        '<div class="win-btn btn-min" onclick="event.stopPropagation();minimizeWindow(\'' + id + '\')" title="Minimize"></div>' +
        '<div class="win-btn btn-max" onclick="event.stopPropagation();toggleMaximizeWindow(\'' + id + '\')" title="Maximize"></div>' +
      '</div>' +
    '</div>' +
    '<div class="win-body">' + bodyContent + '</div>' +
    '<div class="win-resize" onmousedown="DragSystem.startResize(event,\'' + id + '\')"></div>';

  win.addEventListener('mousedown', function() {
    win.style.zIndex = ++highestZ;
    activeWindowId = id;
    document.querySelectorAll('.window').forEach(function(w){ w.classList.remove('active'); });
    win.classList.add('active');
  });

  layer.appendChild(win);
  activeWindowId = id;

  /* Settings internal */
  if (dat.internal && id === 'settings') {
    var f = document.getElementById('frame-' + id);
    if (f) f.srcdoc = buildSettingsHTML();
  }
}

function closeWindow(id) {
  var w = document.getElementById('win-' + id);
  if (w) { w.style.animation = 'none'; w.style.opacity = '0'; w.style.transform = 'scale(0.95)'; w.style.transition = 'opacity 0.15s,transform 0.15s'; setTimeout(function(){ w.remove(); }, 150); }
  if (activeWindowId === id) activeWindowId = null;
}

function minimizeWindow(id) {
  var w = document.getElementById('win-' + id);
  if (w) { w.classList.add('minimized'); w.classList.remove('active'); }
  if (activeWindowId === id) activeWindowId = null;
}

function toggleMaximizeWindow(id) {
  var win = document.getElementById('win-' + id);
  if (!win) return;
  if (win.classList.contains('maximized')) {
    win.classList.remove('maximized');
    if (win._savedRect) { win.style.left=win._savedRect.left; win.style.top=win._savedRect.top; win.style.width=win._savedRect.width; win.style.height=win._savedRect.height; }
  } else {
    win._savedRect = {left:win.style.left,top:win.style.top,width:win.style.width,height:win.style.height};
    win.classList.add('maximized');
  }
}

/* ── SETTINGS HTML ──────────────────────────────────────────── */
function buildSettingsHTML() {
  return `<!DOCTYPE html><html><head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0d0e14;color:#e8eaf6;font-family:'Inter',sans-serif;padding:24px;min-height:100vh;outline:none}
    h2{font-size:20px;font-weight:700;margin-bottom:20px;color:#fff}
    .section{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6c8fff;margin:20px 0 10px;font-weight:600}
    .card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:14px 16px;border-radius:10px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;gap:16px}
    .info strong{display:block;font-size:14px;font-weight:600;color:#fff}
    .info small{color:rgba(232,234,246,0.5);font-size:12px}
    .switch{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0}
    .switch input{opacity:0;width:0;height:0}
    .slider{position:absolute;cursor:pointer;inset:0;background:rgba(255,255,255,0.15);transition:.3s;border-radius:34px;border:1px solid rgba(255,255,255,0.1)}
    .slider:before{position:absolute;content:"";height:16px;width:16px;left:2px;bottom:2px;background:#fff;transition:.3s;border-radius:50%}
    input:checked+.slider{background:#6c8fff;border-color:#6c8fff}
    input:checked+.slider:before{transform:translateX(18px)}
    select,input[type=text]{background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:7px 10px;border-radius:8px;font-family:inherit;font-size:13px;outline:none}
    .clickable{cursor:pointer;transition:background .2s}
    .clickable:hover{background:rgba(255,255,255,0.08)}
    .i{margin-right:6px;color:#6c8fff;width:16px;text-align:center}
  </style>
  </head><body>
  <h2>System Configuration</h2>
  <div class="section">Performance</div>
  <div class="card"><div class="info"><strong><i class="fas fa-film i"></i>Optimized Background</strong><small>Disable video wallpaper to save resources</small></div><label class="switch"><input type="checkbox" id="chk-bg" onchange="window.parent.updateSysSetting('optBg',this.checked)"><span class="slider"></span></label></div>
  <div class="card"><div class="info"><strong><i class="fas fa-bolt i"></i>Fast Boot</strong><small>Skip the startup sequence</small></div><label class="switch"><input type="checkbox" id="chk-boot" onchange="window.parent.updateSysSetting('shortBoot',this.checked)"><span class="slider"></span></label></div>
  <div class="card"><div class="info"><strong><i class="fas fa-lock i"></i>Idle Lock Screen</strong><small>Auto-lock after 3 minutes of inactivity</small></div><label class="switch"><input type="checkbox" id="chk-idle" onchange="window.parent.updateSysSetting('idleLock',this.checked)"><span class="slider"></span></label></div>
  <div class="card"><div class="info"><strong><i class="fas fa-shield-alt i"></i>Redirect Confirmation</strong><small>Prompt before leaving the OS</small></div><label class="switch"><input type="checkbox" id="chk-redir" onchange="window.parent.updateSysSetting('redirectConfirm',this.checked)"><span class="slider"></span></label></div>
  <div class="section">Cloaking & Stealth</div>
  <div class="card"><div class="info"><strong><i class="fas fa-mask i"></i>Tab Cloak</strong><small>Disguise the OS tab name and icon</small></div><select id="cloak-select" onchange="window.parent.updateCloak(this.value)"><option value="none">None (SillyOS)</option><option value="google">Google</option><option value="drive">Google Drive</option><option value="canvas">Canvas</option><option value="classroom">Google Classroom</option></select></div>
  <div class="card"><div class="info"><strong><i class="fas fa-keyboard i"></i>Panic Key</strong><small>Instantly redirects to Google</small></div><input type="text" id="panic-input" maxlength="1" style="width:44px;text-align:center;font-weight:700;font-size:18px" onkeyup="window.parent.updateSysSetting('panicKey',this.value)"></div>
  <div class="section">Community</div>
  <div class="card clickable" onclick="window.open('https://discord.gg/bQCRJgtC74','_blank')"><div class="info"><strong><i class="fab fa-discord i"></i>Join Discord</strong><small>Official SillyOS Community</small></div><i class="fas fa-external-link-alt" style="color:rgba(232,234,246,0.4)"></i></div>
  <script>
    var p=window.parent.sysConfig;
    document.getElementById('chk-bg').checked=p.optBg;
    document.getElementById('chk-boot').checked=p.shortBoot;
    document.getElementById('chk-idle').checked=p.idleLock;
    document.getElementById('chk-redir').checked=p.redirectConfirm;
    document.getElementById('cloak-select').value=p.cloak;
    document.getElementById('panic-input').value=p.panicKey;
  <\/script></body></html>`;
}

/* ── DESKTOP APPS ───────────────────────────────────────────── */
function loadDesktop() {
  var c = document.getElementById('desktop-area');
  document.querySelectorAll('.desktop-app').forEach(function(e){ e.remove(); });

  desktopLayout.forEach(function(item, idx) {
    var d = document.createElement('div');
    d.className = 'desktop-app';
    d.style.left = item.x + 'px'; d.style.top = item.y + 'px';
    d.setAttribute('data-idx', idx);

    if (item.type === 'folder') {
      var gHTML = '<div class="d-folder-grid">';
      item.apps.slice(0,4).forEach(function(a){ if (APPS[a]) gHTML += '<img src="' + APPS[a].icon + '">'; });
      gHTML += '</div>';
      if (!item.hideName) gHTML += '<div class="d-label">' + (item.customName||'Folder') + '</div>';
      d.innerHTML = gHTML;
      d.onclick = function(ev) {
        if (DragSystem.isDragMove) return;
        ev.stopPropagation();
        if (!this.classList.contains('expanded-folder')) { closeAllFolders(); expandFolder(this, item, idx); }
      };
    } else {
      var a = APPS[item.id];
      if (a) {
        var iSrc = item.customIcon || a.icon;
        var lbl = item.customName || a.title;
        d.innerHTML = '<img src="' + iSrc + '" class="d-icon">' + (!item.hideName ? '<div class="d-label">'+lbl+'</div>' : '');
        d.ondblclick = function(ev) { ev.stopPropagation(); toggleApp(item.id); };
      }
    }

    d.onmousedown = function(ev) { ev.stopPropagation(); if (ev.button === 0) DragSystem.start(ev, d, 'desktop', idx); };
    d.oncontextmenu = function(ev) {
      ev.preventDefault(); ev.stopPropagation(); hideAllCtx();
      var m = document.getElementById('app-context-menu');
      if (m) { m.style.display='block'; m.style.left=ev.pageX+'px'; m.style.top=ev.pageY+'px'; m.setAttribute('data-target-idx', idx); }
    };
    c.appendChild(d);
  });
}

function expandFolder(el, dat, idx) {
  el.classList.add('expanded-folder');
  var h = '<div class="folder-header">' + (dat.customName||'Folder') + ' <i class="fas fa-times" onclick="closeAllFolders(event)"></i></div><div class="folder-grid-expanded">';
  for (var k=0; k<dat.apps.length; k++) {
    var aId = dat.apps[k], info = APPS[aId];
    if (info) h += '<div class="f-app" onclick="event.stopPropagation();toggleApp(\''+aId+'\')"><img src="'+info.icon+'"><span>'+info.title+'</span></div>';
  }
  h += '</div>'; el.innerHTML = h;
  setTimeout(function() {
    var rect = el.getBoundingClientRect();
    document.querySelectorAll('.desktop-app:not(.expanded-folder)').forEach(function(sib) {
      var sr = sib.getBoundingClientRect();
      if (!(rect.right<sr.left||rect.left>sr.right||rect.bottom<sr.top||rect.top>sr.bottom)) {
        sib.style.transform = 'translateY('+(rect.bottom-sr.top+20)+'px)';
        sib.setAttribute('data-pushed','true');
      }
    });
  }, 50);
}

function closeAllFolders(ev) {
  if (ev) ev.stopPropagation();
  var op = document.querySelectorAll('.expanded-folder');
  if (!op.length) return;
  op.forEach(function(e){ e.classList.remove('expanded-folder'); });
  document.querySelectorAll('.desktop-app[data-pushed]').forEach(function(e){ e.style.transform=''; e.removeAttribute('data-pushed'); });
  setTimeout(loadDesktop, 250);
}

function setupAppContextMenu() {
  var m = document.getElementById('app-context-menu');
  if (!m) return;
  m.innerHTML = `
    <li class="ctx-item" id="ctx-rename" role="menuitem" tabindex="0"><i class="fas fa-edit fa-fw"></i> Rename</li>
    <li class="ctx-item" id="ctx-hidename" role="menuitem" tabindex="0"><i class="fas fa-eye-slash fa-fw"></i> Toggle Name</li>
    <li class="ctx-item" id="ctx-changeicon" role="menuitem" tabindex="0"><i class="fas fa-image fa-fw"></i> Change Icon</li>
    <li class="ctx-separator" role="separator"></li>
    <li class="ctx-item" id="ctx-delete" role="menuitem" tabindex="0" style="color:#ff5f57"><i class="fas fa-trash fa-fw"></i> Remove</li>`;

  document.getElementById('ctx-rename').onclick = function() {
    var i = m.getAttribute('data-target-idx'), nm = prompt('New name:', desktopLayout[i].customName||'');
    if (nm !== null) { desktopLayout[i].customName = nm.trim()||'App'; saveDesktop(); }
    m.style.display='none';
  };
  document.getElementById('ctx-hidename').onclick = function() {
    var i = m.getAttribute('data-target-idx');
    desktopLayout[i].hideName = !desktopLayout[i].hideName; saveDesktop(); m.style.display='none';
  };
  document.getElementById('ctx-changeicon').onclick = function() {
    var i = m.getAttribute('data-target-idx'), url = prompt('Image URL for icon:');
    if (url) { desktopLayout[i].customIcon = url; saveDesktop(); } m.style.display='none';
  };
  document.getElementById('ctx-delete').onclick = function() {
    var i = m.getAttribute('data-target-idx');
    desktopLayout.splice(i, 1); saveDesktop(); m.style.display='none';
  };
}

function toggleDesktopSize(large) {
  document.body.classList.toggle('desktop-large', large);
}

/* ── WIDGET SYSTEM ──────────────────────────────────────────── */
function openWidgetPanel() {
  var p = document.getElementById('widget-panel');
  if (p) { updateWidgetPanel(); if (p.showModal) p.showModal(); else p.style.display='block'; }
}

function closeWidgetPanel() {
  var p = document.getElementById('widget-panel');
  if (p) { if (p.close) p.close(); else p.style.display='none'; }
}

function updateWidgetPanel() {
  var cat = document.getElementById('widget-catalog');
  var active = document.getElementById('active-widgets-list');
  if (!cat) return;

  cat.innerHTML = '';
  WIDGET_CATALOG.forEach(function(wdef) {
    var div = document.createElement('div');
    div.className = 'widget-catalog-item';
    div.innerHTML = '<div class="wci-icon" style="background:' + wdef.color + '">' + wdef.icon + '</div>' +
      '<div class="wci-info"><strong>' + wdef.name + '</strong><small>' + wdef.desc + '</small></div>';
    div.onclick = function() { addWidget(wdef.type); closeWidgetPanel(); };
    cat.appendChild(div);
  });

  if (!active) return;
  active.innerHTML = '';
  if (widgetInstances.length === 0) {
    active.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:20px">No widgets active. Add one above!</p>';
    return;
  }
  widgetInstances.forEach(function(wi, idx) {
    var def = WIDGET_CATALOG.find(function(d){ return d.type===wi.type; }) || {name:wi.type, icon:'📦'};
    var row = document.createElement('div');
    row.className = 'active-widget-row';
    row.innerHTML = '<span>' + def.icon + ' ' + def.name + '</span><button onclick="removeWidget(' + idx + ')">Remove</button>';
    active.appendChild(row);
  });
}

function addWidget(type) {
  var wdata = {type:type, x:120 + widgetInstances.length * 20, y:100 + widgetInstances.length * 20, id:'w_'+Date.now()};
  widgetInstances.push(wdata); saveWidgets(); renderWidgets(); updateWidgetPanel();
  showNotification('Widgets', 'Widget added to desktop!');
}

function removeWidget(idx) {
  widgetInstances.splice(idx, 1); saveWidgets(); renderWidgets(); updateWidgetPanel();
}

function renderWidgets() {
  document.querySelectorAll('.desk-widget').forEach(function(w){ w.remove(); });
  widgetInstances.forEach(function(wi, idx) { createWidgetEl(wi, idx); });
}

function createWidgetEl(wi, idx) {
  var el = document.createElement('div');
  el.className = 'desk-widget widget-' + wi.type;
  el.id = 'widget-' + wi.id;
  el.style.left = wi.x + 'px'; el.style.top = wi.y + 'px';

  var bar = '<div class="widget-drag-bar" onmousedown="DragSystem.startWidgetDrag(event,\'' + wi.id + '\','+idx+')">' +
    '<span>' + (WIDGET_CATALOG.find(function(d){return d.type===wi.type;})||{icon:'📦'}).icon + ' ' +
    (WIDGET_CATALOG.find(function(d){return d.type===wi.type;})||{name:wi.type}).name + '</span>' +
    '<button class="widget-close" onclick="removeWidget('+idx+')">✕</button></div>';

  var body = '';
  if (wi.type === 'clock') {
    body = '<div class="wgt-body"><div class="wgt-time widget-clock-time">--:-- --</div><div class="wgt-date widget-clock-date">Loading...</div></div>';
  } else if (wi.type === 'calendar') {
    body = '<div class="wgt-body">' + buildCalendarHTML() + '</div>';
  } else if (wi.type === 'sysmon') {
    body = '<div class="wgt-body"><div class="sysmon-row"><label>CPU USAGE</label><div class="sysmon-bar"><div class="sysmon-fill" id="cpu-bar-'+wi.id+'" style="width:35%"></div></div></div>' +
      '<div class="sysmon-row"><label>RAM USAGE</label><div class="sysmon-bar"><div class="sysmon-fill warn" id="ram-bar-'+wi.id+'" style="width:62%"></div></div></div>' +
      '<div class="sysmon-row"><label>NET STATUS</label><div class="sysmon-bar"><div class="sysmon-fill" id="net-bar-'+wi.id+'" style="width:80%"></div></div></div></div>';
    setTimeout(function(){ animateSysMon(wi.id); }, 100);
  } else if (wi.type === 'notes') {
    var saved = localStorage.getItem('silly_note_'+wi.id) || '';
    body = '<div class="wgt-body"><textarea placeholder="Type a note..." oninput="localStorage.setItem(\'silly_note_'+wi.id+'\',this.value)">' + saved + '</textarea></div>';
  } else if (wi.type === 'weather') {
    body = '<div class="wgt-body"><div class="wgt-icon">⛅</div><div class="wgt-temp">72°F</div><div class="wgt-cond">Partly Cloudy</div></div>';
  }

  el.innerHTML = bar + body;
  document.getElementById('desktop-area').appendChild(el);
  updateClock();
}

function buildCalendarHTML() {
  var now = new Date(), year = now.getFullYear(), month = now.getMonth(), today = now.getDate();
  var first = new Date(year, month, 1).getDay();
  var days = new Date(year, month+1, 0).getDate();
  var html = '<div class="cal-header"><span class="cal-month">' + MONTHS[month] + ' ' + year + '</span></div>';
  html += '<div class="cal-grid">';
  ['S','M','T','W','T','F','S'].forEach(function(d){ html += '<span class="header">'+d+'</span>'; });
  for (var i=0; i<first; i++) html += '<span></span>';
  for (var d=1; d<=days; d++) html += '<span' + (d===today?' class="today"':'') + '>'+d+'</span>';
  return html + '</div>';
}

function animateSysMon(id) {
  setInterval(function() {
    var cpu = 20 + Math.random() * 60, ram = 50 + Math.random() * 30, net = 60 + Math.random() * 35;
    var cb = document.getElementById('cpu-bar-'+id); if (cb) cb.style.width = cpu + '%';
    var rb = document.getElementById('ram-bar-'+id); if (rb) rb.style.width = ram + '%';
    var nb = document.getElementById('net-bar-'+id); if (nb) nb.style.width = net + '%';
  }, 2000);
}

/* ── DRAG SYSTEM ────────────────────────────────────────────── */
var DragSystem = {
  dragging: false, startPos:{x:0,y:0}, sourceType:null, sourceEl:null,
  idx:null, appId:null, isDragMove:false,
  proxy: null, pImg:null, badge:null,
  winStartLeft:0, winStartTop:0,
  widgetId:null, widgetIdx:null, widgetStartX:0, widgetStartY:0, widgetEl:null,
  resizeWin:null, resizeStartW:0, resizeStartH:0, resizeStartX:0, resizeStartY:0,

  init: function() {
    this.proxy = document.getElementById('drag-proxy');
    this.pImg = document.getElementById('proxy-img');
    this.badge = document.getElementById('folder-badge');
    window.addEventListener('mousemove', function(e){ DragSystem.move(e); });
    window.addEventListener('mouseup', function(e){ DragSystem.end(e); });
  },

  start: function(e, el, type, id) {
    this.startPos = {x:e.clientX, y:e.clientY};
    this.sourceType = type; this.sourceEl = el; this.isDragMove = false;
    if (type === 'drawer' || type === 'dock') this.appId = id;
    else if (type === 'desktop') { this.idx = id; el.style.opacity='0.5'; }
  },

  startWinDrag: function(e, id) {
    var win = document.getElementById('win-' + id);
    if (!win || win.classList.contains('maximized')) return;
    e.preventDefault();
    this.startPos = {x:e.clientX, y:e.clientY};
    this.sourceType = 'window'; this.sourceEl = win; this.isDragMove = false;
    this.winStartLeft = parseFloat(win.style.left)||0;
    this.winStartTop = parseFloat(win.style.top)||0;
    win.style.zIndex = ++highestZ; activeWindowId = id;
  },

  startWidgetDrag: function(e, wid, idx) {
    var el = document.getElementById('widget-' + wid);
    if (!el) return;
    e.preventDefault();
    this.startPos = {x:e.clientX, y:e.clientY};
    this.sourceType = 'widget'; this.widgetId = wid; this.widgetIdx = idx;
    this.widgetEl = el; this.isDragMove = false;
    this.widgetStartX = parseFloat(el.style.left)||0;
    this.widgetStartY = parseFloat(el.style.top)||0;
    el.style.zIndex = 200;
  },

  startResize: function(e, id) {
    var win = document.getElementById('win-' + id);
    if (!win || win.classList.contains('maximized')) return;
    e.preventDefault(); e.stopPropagation();
    this.sourceType = 'resize'; this.resizeWin = win;
    this.resizeStartW = win.offsetWidth; this.resizeStartH = win.offsetHeight;
    this.startPos = {x:e.clientX, y:e.clientY};
  },

  move: function(e) {
    if (!this.sourceType) return;
    var dx = e.clientX - this.startPos.x, dy = e.clientY - this.startPos.y;
    if (Math.abs(dx)>3 || Math.abs(dy)>3) { this.dragging=true; this.isDragMove=true; }
    if (!this.isDragMove) return;

    if (this.sourceType === 'window') {
      this.sourceEl.style.left = (this.winStartLeft + dx) + 'px';
      this.sourceEl.style.top = Math.max(0, this.winStartTop + dy) + 'px';
    } else if (this.sourceType === 'widget') {
      this.widgetEl.style.left = (this.widgetStartX + dx) + 'px';
      this.widgetEl.style.top = (this.widgetStartY + dy) + 'px';
    } else if (this.sourceType === 'resize') {
      var nw = Math.max(300, this.resizeStartW + dx), nh = Math.max(200, this.resizeStartH + dy);
      this.resizeWin.style.width = nw + 'px'; this.resizeWin.style.height = nh + 'px';
    } else if (this.sourceType === 'desktop' || this.sourceType === 'drawer' || this.sourceType === 'dock') {
      if (this.sourceType === 'drawer') toggleAppDrawer();
      if (this.proxy) { this.proxy.style.display='block'; this.proxy.style.left=(e.clientX-28)+'px'; this.proxy.style.top=(e.clientY-28)+'px'; }
      if (this.pImg) {
        if (this.sourceType === 'drawer' || this.sourceType === 'dock') { if (APPS[this.appId]) this.pImg.src=APPS[this.appId].icon; }
        else { var itm=desktopLayout[this.idx]; if (itm&&itm.type==='app'&&APPS[itm.id]) this.pImg.src=APPS[itm.id].icon; }
      }
    }
  },

  end: function(e) {
    if (this.sourceType === 'widget' && this.isDragMove && this.widgetEl) {
      var wid = this.widgetId, idx = this.widgetIdx;
      widgetInstances[idx].x = parseFloat(this.widgetEl.style.left)||0;
      widgetInstances[idx].y = parseFloat(this.widgetEl.style.top)||0;
      saveWidgets();
    } else if ((this.sourceType === 'desktop' || this.sourceType === 'drawer' || this.sourceType === 'dock') && this.isDragMove) {
      var nx = Math.round((e.clientX-40)/90)*90, ny = Math.round((e.clientY-40)/100)*100;
      if (e.clientY > window.innerHeight - 80) {
        if (this.sourceType === 'desktop') desktopLayout.splice(this.idx, 1);
      } else {
        var tIdx = -1;
        document.querySelectorAll('.desktop-app').forEach(function(ap) {
          if (ap !== DragSystem.sourceEl) {
            var r = ap.getBoundingClientRect();
            if (e.clientX>r.left && e.clientX<r.right && e.clientY>r.top && e.clientY<r.bottom) tIdx = ap.dataset.idx;
          }
        });
        if (tIdx > -1) {
          var targ = desktopLayout[tIdx];
          var drp = (this.sourceType==='drawer'||this.sourceType==='dock') ? [this.appId] : (desktopLayout[this.idx].type==='app'?[desktopLayout[this.idx].id]:desktopLayout[this.idx].apps);
          if (targ.type==='app') { targ.type='folder'; targ.apps=[targ.id].concat(drp); delete targ.id; }
          else { targ.apps = targ.apps.concat(drp); }
          if (this.sourceType==='desktop') desktopLayout.splice(this.idx,1);
        } else {
          if (this.sourceType==='drawer'||this.sourceType==='dock') { desktopLayout.push({type:'app',id:this.appId,x:nx,y:ny}); }
          else { desktopLayout[this.idx].x=nx; desktopLayout[this.idx].y=ny; }
        }
      }
      saveDesktop();
    }
    this.reset();
  },

  reset: function() {
    this.dragging=false; this.isDragMove=false;
    if (this.sourceEl) this.sourceEl.style.opacity='1';
    this.sourceEl=null; this.sourceType=null;
    this.widgetEl=null; this.widgetId=null; this.widgetIdx=null;
    this.resizeWin=null;
    if (this.proxy) this.proxy.style.display='none';
    if (this.badge) this.badge.style.display='none';
  }
};

/* ── SIDEBAR TOGGLE ─────────────────────────────────────────── */
var sidebarVisible = false;
function toggleSidebar() {
  sidebarVisible = !sidebarVisible;
  var sb = document.getElementById('right-sidebar');
  if (sb) sb.classList.toggle('visible', sidebarVisible);
}

/* ── DOCK AUTOHIDE ──────────────────────────────────────────── */
(function() {
  var dEl, dockTimer;
  document.addEventListener('DOMContentLoaded', function() {
    dEl = document.getElementById('dock-container');
    var bt = document.getElementById('bottom-trigger');
    if (!dEl || !bt) return;
    bt.addEventListener('mouseenter', function() {
      if (dEl) { dEl.classList.remove('dock-hidden'); clearTimeout(dockTimer); }
    });
    dEl.addEventListener('mouseleave', function() {
      var aw = document.querySelectorAll('.window.active:not(.minimized)');
      if (aw.length > 0) { dockTimer = setTimeout(function(){ if (dEl) dEl.classList.add('dock-hidden'); }, 1000); }
    });
  });
})();

/* ── NOTIFICATIONS ──────────────────────────────────────────── */
function showNotification(title, msg) {
  var c = document.getElementById('toast-container');
  var t = document.createElement('div');
  t.className = 'toast-notification';
  t.innerHTML = '<div class="toast-header"><div class="toast-app-info"><div class="toast-icon"><i class="fas fa-bell"></i></div><span>System</span></div></div><div class="toast-title">' + title + '</div><div class="toast-body">' + msg + '</div>';
  c.appendChild(t);
  setTimeout(function(){ t.classList.add('show'); }, 50);
  t.onclick = function() { t.classList.remove('show'); setTimeout(function(){ t.remove(); }, 300); };
  setTimeout(function() { t.classList.remove('show'); setTimeout(function(){ t.remove(); }, 300); }, 4000);
}

/* ── UPDATE LOG ─────────────────────────────────────────────── */
function openUpdateLog() {
  var m = document.getElementById('update-modal');
  if (m) { if (m.showModal) m.showModal(); else m.style.display='flex'; }
}

/* ── CIRI AI ─────────────────────────────────────────────────── */
var ciriOpen = false;
var ciriBooted = false;
var ciriMode = 'FAST';

function toggleCiri() {
  ciriOpen = !ciriOpen;
  var bd = document.getElementById('ciri-backdrop');
  var cw = document.getElementById('ciri-window');
  if (ciriOpen) {
    bd.style.display='block'; cw.style.display='flex'; requestAnimationFrame(function(){ cw.classList.add('open'); });
    if (!ciriBooted) bootCiri();
  } else {
    cw.classList.remove('open');
    setTimeout(function(){ bd.style.display='none'; cw.style.display='none'; }, 300);
  }
}
function closeCiri() { ciriOpen=false; var bd=document.getElementById('ciri-backdrop'),cw=document.getElementById('ciri-window'); cw.classList.remove('open'); setTimeout(function(){ bd.style.display='none'; cw.style.display='none'; }, 300); }

function bootCiri() {
  var bs = document.getElementById('ciri-boot-screen');
  setTimeout(function() { if (bs) { bs.style.opacity='0'; bs.style.transition='opacity 0.4s'; setTimeout(function(){ bs.style.display='none'; }, 400); } ciriBooted=true; }, 2200);
}

function cycleMode() {
  var modes=['FAST','SMART','CREATIVE'];
  ciriMode = modes[(modes.indexOf(ciriMode)+1)%3];
  var el = document.getElementById('mode-toggle');
  if (el) el.textContent = ciriMode;
}

function autoGrow(el) { el.style.height='auto'; el.style.height=(el.scrollHeight)+'px'; }

function handleSend() {
  var inp = document.getElementById('chat-input');
  if (!inp || !inp.value.trim()) return;
  var text = inp.value.trim(); inp.value=''; inp.style.height='auto';
  addChatMsg(text, 'user');
  /* Placeholder response */
  setTimeout(function() { addChatMsg('Hello! I\'m Ciri. I\'m running in SillyOS v4.0. How can I help you today?', 'ai'); }, 800);
}

function addChatMsg(text, role) {
  var hist = document.getElementById('chat-history');
  var m = document.createElement('div');
  m.className = 'msg ' + role; m.textContent = text;
  hist.appendChild(m); hist.scrollTop = hist.scrollHeight;
}

var uploadedImg = null;
function handleFileUpload(e) {
  var file = e.target.files[0]; if (!file) return;
  var r = new FileReader(); r.onload=function(ev){ uploadedImg=ev.target.result; var p=document.getElementById('img-preview'); if(p){p.src=ev.target.result;} var b=document.getElementById('img-preview-box'); if(b)b.style.display='flex'; }; r.readAsDataURL(file);
}
function clearImage() { uploadedImg=null; var b=document.getElementById('img-preview-box'); if(b)b.style.display='none'; var p=document.getElementById('img-preview'); if(p)p.src=''; }

/* ── MEDIA PLAYER ───────────────────────────────────────────── */
function initMediaPlayer() {
  var minBtn = document.getElementById('minimize-noti-btn');
  var closeBtn = document.getElementById('close-noti-btn');
  var restoreBtn = document.getElementById('restore-btn');
  var player = document.getElementById('cine-noti');
  if (!minBtn || !closeBtn || !player) return;
  minBtn.onclick = function() { player.style.display='none'; if(restoreBtn)restoreBtn.style.display='flex'; };
  closeBtn.onclick = function() { player.style.display='none'; if(restoreBtn)restoreBtn.style.display='none'; };
  if (restoreBtn) restoreBtn.onclick = function() { player.style.display='block'; restoreBtn.style.display='none'; };
}

/* ── IDLE LOCK ───────────────────────────────────────────────── */
(function() {
  var idleTimer;
  function resetIdle() {
    clearTimeout(idleTimer);
    if (sysConfig.idleLock && isDesktopActive) {
      idleTimer = setTimeout(function() {
        var ls = document.getElementById('lock-screen');
        if (ls) { ls.style.transform=''; ls.style.opacity=''; ls.classList.add('active'); isDesktopActive=false; }
      }, 180000);
    }
  }
  ['mousemove','keydown','click','touchstart'].forEach(function(ev){ document.addEventListener(ev, resetIdle); });
})();

/* ── START SEARCH ────────────────────────────────────────────── */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var inp = document.getElementById('start-search-input');
    if (!inp) return;
    inp.addEventListener('keyup', function(e) {
      var q = this.value.toLowerCase();
      var grid = document.getElementById('pinned-grid');
      if (!grid) return;
      grid.querySelectorAll('.pinned-item').forEach(function(item) {
        var name = item.querySelector('span') ? item.querySelector('span').textContent.toLowerCase() : '';
        item.style.display = name.includes(q) ? '' : 'none';
      });
    });
  });
})();

