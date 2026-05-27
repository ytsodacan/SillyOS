var _SYSTEM_PATHS = ["C:/Windows/System32/kernel32.dll", "/var/www/html/cine-os/", "https://cine-os.local/api/v1/auth"];
var _devBuildVer = "3.0.1";

var APPS = {
    'minecraft': {title: 'Minecraft', path: 'script/Apps/Minecraft/index.html', icon: 'script/Apps/Minecraft/icon.png', pinned: true, windowed: true, openMode: "iframe"   // or "newtab" or "redirect"
},
    'games': {title: 'Game Library', path: 'script/Apps/Games/index.html', icon: 'script/Apps/Games/icon.png', pinned: true, openMode: "iframe"},   // or "newtab" or "redirect"},
    'web': {title: 'Browser', path: 'script/Apps/Web/index.html', icon: 'script/Apps/Web/IMG_3473.png', pinned: true, openMode: "iframe"   // or "newtab" or "redirect"
},
    'spotify': {title: 'Spotify', path: 'script/Apps/Spotify/index.html', icon: 'script/Apps/Spotify/IMG_3472.png', pinned: true, openMode: "iframe"   // or "newtab" or "redirect"
},
    'settings': {title: 'Settings', internal: true, icon: 'script/Apps/IMG_3469.png', pinned: true, openMode: "iframe"   // or "newtab" or "redirect"
},
};

var savedPins = localStorage.getItem('silly_pins_v5');
if(savedPins) {
    let p = JSON.parse(savedPins);
    for(let k in p) {
        if(APPS[k]) APPS[k].pinned = p[k];
    }
}

function syncPins() {
    let obj = {};
    for(let k in APPS) obj[k] = APPS[k].pinned;
    localStorage.setItem('silly_pins_v5', JSON.stringify(obj));
}

var wallpaperRegistry = {
    "Default": {id: "Default", name: "Snake Skeleton", url: "Videos/default.mp4", locked: false},
    "green": {id: "green", name: "Green Anime", url: "Videos/green.mp4", locked: false},
    "33A56": {id: "hunt_trait", name: "Hunt Showdown", url: "Videos/33A56.mp4", locked: true},
    "45E33": {id: "45E33", name: "45E33", url: "Videos/45E33.mp4", locked: false},
    "55Cine": {id: "55Cine", name: "Cine 55", url: "Videos/55Cine.PNG", locked: false},
    "99Med": {id: "99Med", name: "99 Med", url: "Videos/99Med.mp4", locked: false},
    "Brother": {id: "Brother", name: "Brother", url: "Videos/Brother.mp4", locked: false},
    "F-1": {id: "F-1", name: "F-1 Formula", url: "Videos/F-1.mp4", locked: false},
    "Gojo-Sukuna": {id: "Gojo-Sukuna", name: "Gojo vs Sukuna", url: "Videos/Gojo-Sukuna.mp4", locked: false},
    "Hunt": {id: "Hunt", name: "Hunt Showdown 2", url: "Videos/Hunt.mp4", locked: false},
    "Minecraft01": {id: "Minecraft01", name: "Minecraft 01", url: "Videos/Minecraft01.mp4", locked: false},
    "Minecraft02": {id: "Minecraft02", name: "Minecraft 02", url: "Videos/Minecraft02.mp4", locked: false},
    "Minecraft03": {id: "Minecraft03", name: "Minecraft 03", url: "Videos/Minecraft03.mp4", locked: false},
    "Monkey": {id: "Monkey", name: "Monkey", url: "Videos/Monkey.mp4", locked: false},
    "Skello": {id: "Skello", name: "Skello", url: "Videos/Skello.MP4", locked: false},
    "SnowFox": {id: "SnowFox", name: "Snow Fox", url: "Videos/SnowFox.mp4", locked: false},
    "Supra": {id: "Supra", name: "Supra Drift", url: "Videos/Supra.PNG", locked: false},
    "Yuji52": {id: "Yuji52", name: "Yuji 52", url: "Videos/Yuji52.mp4", locked: false},
    "sukuna-fire": {id: "sukuna-fire", name: "Sukuna Fire", url: "Videos/sukuna-fire.mp4", locked: false},
    "CozyFox": {id: "CozyFox", name: "Cozy Fox", url: "Videos/CozyFox.mp4", locked: false},
    "RainyCity": {id: "RainyCity", name: "Rainy City", url: "Videos/RainyCity.mp4", locked: false},
    "Gojo": {id: "Gojo", name: "Gojo", url: "Videos/Gojo.mp4", locked: false},
    "BlackHole": {id: "BlackHole", name: "Black Hole", url: "Videos/BlackHole.mp4", locked: false},
    "Yuta": {id: "Yuta", name: "Yuta", url: "Videos/Yuta.mp4", locked: false},
    "Desktop": {id: "Desktop", name: "Desktop Lines", url: "Videos/Desktop.mp4", locked: false}
};

var sysConfig = JSON.parse(localStorage.getItem('silly_sys_config')) || {};
if(sysConfig.optBg === undefined) sysConfig.optBg = false;
if(sysConfig.shortBoot === undefined) sysConfig.shortBoot = true;
if(sysConfig.wpLoop === undefined) sysConfig.wpLoop = false;
if(sysConfig.idleLock === undefined) sysConfig.idleLock = false; 
if(sysConfig.redirectConfirm === undefined) sysConfig.redirectConfirm = false; 
if(!sysConfig.panicKey) sysConfig.panicKey = '`';
if(!sysConfig.homeWallpaper) sysConfig.homeWallpaper = 'Default';
if(!sysConfig.lockWallpaper) sysConfig.lockWallpaper = 'green';
if(!sysConfig.cloak) sysConfig.cloak = 'none';

window.updateSysSetting = function(key, value) {
    sysConfig[key] = value;
    localStorage.setItem('silly_sys_config', JSON.stringify(sysConfig));
    if(key === 'optBg') applySystemSettings();
    if(key === 'wpLoop') updateWallpaperLoop();
};

var cloaks = {
    none: {title: "SillyOS", icon: ""},
    google: {title: "Google", icon: "https://www.google.com/favicon.ico"},
    drive: {title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"},
    canvas: {title: "Dashboard", icon: "https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e10d657a73.ico"},
    classroom: {title: "Classes", icon: "https://ssl.gstatic.com/classroom/favicon.png"}
};

window.updateCloak = function(key) {
    sysConfig.cloak = key;
    localStorage.setItem('silly_sys_config', JSON.stringify(sysConfig));
    applyCloak();
};

function applyCloak() {
    var k = sysConfig.cloak || 'none';
    var sel = cloaks[k];
    var icons = document.querySelectorAll("link[rel*='icon']");
    for(var i=0; i<icons.length; i++) icons[i].remove();
    
    if(sel && k !== 'none') {
        document.title = sel.title;
        let n = document.createElement('link');
        n.type = 'image/x-icon';
        n.rel = 'shortcut icon';
        n.href = sel.icon;
        document.getElementsByTagName('head')[0].appendChild(n);
    } else {
        document.title = "SillyOS";
    }
}
setInterval(applyCloak, 2000);

var isDesktopActive = false;
var bootActive = true;
var enterCount = 0;
var highestZ = 500;
var activeWindowId = null;
var isMediaPlaying = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var activeCtxId = null;

if(isMobile) {
    var mobWarn = document.getElementById('mobile-warning');
    if(mobWarn && mobWarn.showModal) mobWarn.showModal();
    else if(mobWarn) mobWarn.style.display = 'flex';
    
    var lastTap = 0;
    document.addEventListener('touchstart', function(e) {
        let t = new Date().getTime();
        let tl = t - lastTap;
        if(tl < 500 && tl > 0) {
            if(mobWarn && mobWarn.close) mobWarn.close();
            else if(mobWarn) mobWarn.style.display = 'none';
        }
        lastTap = t;
    });
}

async function loadDynamicResources() {
    renderUI();
    initWallpapers();
    setupAppContextMenu();
}

window.onbeforeunload = function(e) {
    if(sysConfig.redirectConfirm) {
        let msg = "Are you sure you want to leave? This helps block GoGuardian redirects.";
        e.returnValue = msg;
        return msg;
    }
};

document.addEventListener("DOMContentLoaded", function() {
    applyCloak();
    loadDynamicResources();
    document.getElementById('boot-layer').style.display = 'block';
    // Clear old Cine desktop layout so no stale icons remain
    if(!localStorage.getItem('silly_desktop_v2')) {
        localStorage.removeItem('cine_desktop_v2');
    }
    loadDesktop();
    updateSidebarData();
    injectWidgetEditor();
});

function renderUI() {
    let dock = document.getElementById('dock-container');
    let dHTML = '<div class="dock-item" onclick="toggleStartMenu()"><img src="https://missionsupport.archden.org/wp-content/uploads/2022/02/windows11-icon.png"></div><div class="dock-sep"></div><div class="dock-item" onclick="toggleAppDrawer()"><svg width="24" height="24" viewBox="0 0 24 24" fill="#aaa"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg></div><div class="dock-sep"></div>';
    
    let pGrid = document.getElementById('pinned-grid');
    let pHTML = '';
    
    for(let id in APPS) {
        if(APPS[id].pinned) {
            dHTML += '<div class="dock-item" data-id="'+id+'" onmousedown="DragSystem.start(event,this,\'dock\',\''+id+'\')" onclick="toggleApp(\''+id+'\')" oncontextmenu="openDockCtx(event, \''+id+'\')"><img src="'+APPS[id].icon+'"></div>';
            pHTML += '<div class="pinned-item" onclick="toggleApp(\''+id+'\')"><img src="'+APPS[id].icon+'"><span>'+APPS[id].title+'</span></div>';
        }
    }
    
    dock.innerHTML = dHTML;
    pGrid.innerHTML = pHTML;
    populateDrawer();
}

function openDockCtx(e, id) {
    e.preventDefault(); e.stopPropagation();
    hideAllCtx();
    activeCtxId = id;
    let m = document.getElementById('dock-ctx-menu');
    if(m) {
        m.style.display = 'block';
        m.style.left = e.pageX + 'px';
        m.style.top = e.pageY + 'px';
    }
}

function openDrawerCtx(e, id) {
    e.preventDefault(); 
  e.stopPropagation();
    hideAllCtx();
    activeCtxId = id;
    let m = document.getElementById('drawer-ctx-menu');
    if(m) {
        m.style.display = 'block';
        m.style.left = e.pageX + 'px';
        m.style.top = e.pageY + 'px';
    }
}

document.getElementById('ctx-pin-app').onclick = function() {
    if(activeCtxId && APPS[activeCtxId]) {
        APPS[activeCtxId].pinned = true;
        syncPins();
        renderUI();
    }
    hideAllCtx();
}

document.getElementById('ctx-unpin-app').onclick = function() {
    if(activeCtxId && APPS[activeCtxId]) {
        APPS[activeCtxId].pinned = false;
        syncPins();
        renderUI();
    }
    hideAllCtx();
}

function hideAllCtx() {
    let menus = ['app-context-menu','desktop-context-menu','drawer-ctx-menu','dock-ctx-menu'];
    for(let i=0; i<menus.length; i++) {
        let m = document.getElementById(menus[i]);
        if(m) m.style.display = 'none';
    }
}
document.addEventListener('click', hideAllCtx);

document.addEventListener('keydown', function(e) {
    if(bootActive && e.key === 'Enter' && document.getElementById('boot-layer').style.display !== 'none') {
        enterCount++;
        if(enterCount >= 2) skipBootSequence();
        setTimeout(function(){ enterCount = 0; }, 500);
    }
    if(e.key && sysConfig.panicKey && e.key.toLowerCase() === sysConfig.panicKey.toLowerCase()) {
        window.location.href = "https://google.com";
    }
});

function startBootSequence() {
    let cb = document.getElementById('boot-content');
    let bv = document.getElementById('boot-video');
    cb.style.display = 'none';
    bv.style.display = 'block';
    bv.muted = false;
    bv.volume = 1.0;
    
    if(sysConfig.shortBoot) {
        bv.src = "Videos/QuickBoot.mp4";
        bv.load();
    }
    
    let p = bv.play();
    if(p !== undefined) {
        p.catch(function() {
            bv.muted = true;
            bv.play();
        });
    }
    bv.onended = function() {
        if(bootActive) skipBootSequence();
    };
}

function skipBootSequence() {
    if(!bootActive) return;
    bootActive = false;
    let lay = document.getElementById('boot-layer');
    let bv = document.getElementById('boot-video');
    if(bv) bv.pause();
    
    if(lay) {
        lay.style.opacity = '0';
        document.getElementById('lock-screen').classList.add('active');
        
        let lv = document.getElementById('lock-video');
        if(lv.style.display !== 'none') {
            lv.play().catch(function(e) {});
        }
        
        setTimeout(function() { lay.style.display = 'none'; }, 600);
        updateClock();
    }
}

function showNotification(title, msg) {
    let c = document.getElementById('toast-container');
    let t = document.createElement('div');
    t.className = 'toast-notification';
    t.innerHTML = '<div class="toast-header"><div class="toast-app-info"><div class="toast-icon"><i class="fas fa-bell"></i></div><span>System</span></div><i class="fas fa-times toast-close"></i></div><div class="toast-title">' + title + '</div><div class="toast-body">' + msg + '</div>';
    c.appendChild(t);
    
    setTimeout(function(){ t.classList.add('show'); }, 100);
    t.onclick = function() {
        t.classList.remove('show');
        setTimeout(function(){ t.remove(); }, 400);
    };
    setTimeout(t.onclick, 6000);
}

var welcomeShown = false;
window.unlockSystem = function() {
    let scr = document.getElementById('lock-screen');
    scr.classList.add('slide-up');
    setTimeout(function() {
        scr.classList.remove('active');
        isDesktopActive = true;
        document.getElementById('lock-video').pause();
        
        if(!sysConfig.optBg) {
            let bV = document.getElementById('bg-video');
            if(bV.style.display !== 'none') bV.play().catch(function(e){});
        }
        if(!welcomeShown) {
            showNotification("Welcome To SillyOS", "Checkout Settings for FAQ!");
            welcomeShown = true;
        }
    }, 600);
    resetIdle();
};

function applyMediaToElements(url, vidEl, imgEl, isBg) {
    if(!url) return;
    let isImg = url.match(/\.(png|jpg|jpeg|gif)$/i);
    if(isImg) {
        vidEl.style.display = 'none';
        vidEl.pause();
        imgEl.style.display = 'block';
        imgEl.src = url;
    } else {
        imgEl.style.display = 'none';
        vidEl.style.display = 'block';
        vidEl.src = url;
        vidEl.load();
        if(isBg && isDesktopActive && !sysConfig.optBg) vidEl.play().catch(function(e){});
        if(!isBg && document.getElementById('lock-screen').classList.contains('active')) vidEl.play().catch(function(e){});
    }
}

function initWallpapers() {
    let bV = document.getElementById('bg-video');
    let bI = document.getElementById('bg-img');
    let lV = document.getElementById('lock-video');
    let lI = document.getElementById('lock-img');
    
    if(wallpaperRegistry[sysConfig.homeWallpaper]) {
        applyMediaToElements(wallpaperRegistry[sysConfig.homeWallpaper].url, bV, bI, true);
    }
    if(wallpaperRegistry[sysConfig.lockWallpaper]) {
        applyMediaToElements(wallpaperRegistry[sysConfig.lockWallpaper].url, lV, lI, false);
    } else {
        applyMediaToElements("Videos/green.mp4", lV, lI, false);
    }
    
    updateWallpaperLoop();
    let wChk = document.getElementById('wp-loop-chk');
    if(wChk) wChk.checked = sysConfig.wpLoop;
}

function updateWallpaperLoop() {
    let bV = document.getElementById('bg-video');
    let lV = document.getElementById('lock-video');
    if(bV) bV.loop = sysConfig.wpLoop;
    if(lV) lV.loop = sysConfig.wpLoop;
    if(!sysConfig.optBg && isDesktopActive && bV && bV.paused && bV.style.display !== 'none') {
        bV.play().catch(function(e){});
    }
}

function updateClock() {
    let n = new Date();
    let dArr = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
    let mArr = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    
    let hrs = n.getHours().toString().padStart(2, '0');
    let min = n.getMinutes().toString().padStart(2, '0');
    let dNum = n.getDate().toString().padStart(2, '0');
    let dName = dArr[n.getDay()];
    let yr = n.getFullYear();
    
    let lDay = document.getElementById('lock-day-large');
    let lDat = document.getElementById('lock-date');
    let lTim = document.getElementById('lock-time');
    let hDay = document.getElementById('lbl-day');
    
    if(lDay) lDay.innerText = dName;
    if(hDay) hDay.innerText = dName;
    if(lDat) lDat.innerText = dNum + ' ' + mArr[n.getMonth()] + ', ' + yr + '.';
    if(lTim) lTim.innerText = '- ' + hrs + ':' + min + ' -';
}
setInterval(updateClock, 1000);

var idleTime = 0;
function resetIdle() { idleTime = 0; }
document.addEventListener('mousemove', resetIdle);
document.addEventListener('keypress', resetIdle);

setInterval(function() {
    idleTime++;
    let scr = document.getElementById('lock-screen');
    if(sysConfig.idleLock && idleTime >= 180 && !scr.classList.contains('active') && !bootActive) {
        if(isMediaPlaying) {
            idleTime = 0; 
        } else {
            isDesktopActive = false;
            scr.classList.remove('slide-up');
            scr.classList.add('active');
            document.getElementById('bg-video').pause();
            let lv = document.getElementById('lock-video');
            if(lv.style.display !== 'none') lv.play().catch(function(e){});
        }
    }
}, 1000);

window.launchLastPlayed = function() {
    let last = localStorage.getItem('silly_last_app');
    if(last && APPS[last]) toggleApp(last);
};
window.resumeSpotify = function() {};
window.openUpdateLog = function() {
    let u = document.getElementById('update-modal');
    if(u && u.showModal) u.showModal();
    else if(u) u.style.display = 'flex';
};

function updateSidebarData() {
    try {
        let last = localStorage.getItem('silly_last_app');
        if(last && APPS[last]) {
            let el = document.getElementById('last-game-name');
            let ic = document.getElementById('last-game-icon');
            if(el) el.innerText = APPS[last].title;
            if(ic) ic.src = APPS[last].icon;
        }
    } catch(e) {}
}
setInterval(updateSidebarData, 5000);

function populateDrawer() {
    let g = document.getElementById('drawer-grid');
    g.innerHTML = '';
    for(let key in APPS) {
        let a = APPS[key];
        let d = document.createElement('div');
        d.className = 'drawer-item';
        d.dataset.id = key;
        d.innerHTML = '<img src="' + a.icon + '" style="pointer-events:none;"><span>' + a.title + '</span>';
        
        d.onmousedown = function(e) { DragSystem.start(e, this, 'drawer', this.dataset.id); };
        d.onclick = function(e) {
            if(!DragSystem.isDragMove) {
                toggleApp(this.dataset.id);
                toggleAppDrawer();
            }
        };
        d.oncontextmenu = function(e) { openDrawerCtx(e, this.dataset.id); }
        g.appendChild(d);
    }
}

function filterDrawer(val) {
    let items = document.querySelectorAll('.drawer-item');
    let q = val.toLowerCase();
    for(let i=0; i<items.length; i++) {
        let txt = items[i].innerText.toLowerCase();
        if(txt.includes(q)) items[i].style.display = 'flex';
        else items[i].style.display = 'none';
    }
}

function toggleAppDrawer() {
    let d = document.getElementById('app-drawer');
    if(d.classList.contains('open')) {
        d.classList.remove('open');
        setTimeout(function(){ d.style.display='none'; }, 300);
    } else {
        d.style.display = 'block';
        setTimeout(function(){ d.classList.add('open'); }, 10);
    }
}

function toggleApp(id) {
    let w = document.getElementById('win-' + id);
    if(w) {
        if(w.classList.contains('minimized')) {
            w.classList.remove('minimized');
            w.classList.add('active');
            w.style.zIndex = ++highestZ;
            activeWindowId = id;
            startImmersiveMode(w);
        } else if(activeWindowId === id) {
            minimizeWindow(id);
        } else {
            w.style.zIndex = ++highestZ;
            activeWindowId = id;
            startImmersiveMode(w);
        }
    } else {
        openWindow(id);
    }
}

function openWindow(id) {
    let m = document.getElementById('start-menu');
    if(m) {
        m.classList.remove('open');
        setTimeout(function(){ m.style.display='none'; }, 300);
    }

    let layer = document.getElementById('windows-layer');
    let win = document.getElementById('win-' + id);

    if(!win) {
        let dat = APPS[id] || {title: 'APP', path: 'about:blank'};
        // Allow apps to bypass iframe
if (dat.openMode === "redirect") {
    window.location.href = dat.path;
    return;
}

if (dat.openMode === "newtab") {
    window.open(dat.path, "_blank");
    return;
}

        win = document.createElement('div');
        win.id = 'win-' + id;
        win.className = 'window active';
        win.style.zIndex = ++highestZ;

        // Size and center with cascade offset
        var openCount = document.querySelectorAll('.window').length;
        var cascade = (openCount % 6) * 28;
        var ww = Math.min(960, window.innerWidth * 0.92);
        var wh = Math.min(660, window.innerHeight * 0.88);
        var lft = Math.max(0, (window.innerWidth - ww) / 2 + cascade);
        var top = Math.max(0, (window.innerHeight - wh) / 2 + cascade);
        win.style.width  = ww + 'px';
        win.style.height = wh + 'px';
        win.style.left   = lft + 'px';
        win.style.top    = top + 'px';

        var iconHtml = dat.icon ? '<img class="win-icon" src="' + dat.icon + '" alt="">' : '';
        var iframeStr = dat.internal ? '<iframe id="frame-' + id + '"></iframe>' : '<iframe id="frame-' + id + '" src="' + dat.path + '" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals allow-downloads"></iframe>';

        win.innerHTML =
            '<div class="win-header" onmousedown="DragSystem.startWinDrag(event,\'' + id + '\')" ondblclick="toggleMaximizeWindow(\'' + id + '\')">' +
                '<div class="win-title-row">' + iconHtml + '<span class="win-title">' + dat.title + '</span></div>' +
                '<div class="win-controls">' +
                    '<div class="win-btn btn-min" onclick="event.stopPropagation();minimizeWindow(\'' + id + '\')" title="Minimize"></div>' +
                    '<div class="win-btn btn-max" onclick="event.stopPropagation();toggleMaximizeWindow(\'' + id + '\')" title="Maximize / Restore"></div>' +
                    '<div class="win-btn btn-close" onclick="event.stopPropagation();closeWindow(\'' + id + '\')" title="Close"></div>' +
                '</div>' +
            '</div>' +
            '<div class="win-body">' + iframeStr + '</div>' +
            '<div class="win-resize-handle" onmousedown="DragSystem.startWinResize(event,\'' + id + '\')" title="Resize">' +
                '<svg viewBox="0 0 10 10"><path d="M2 10 L10 10 L10 2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' +
            '</div>';
        
        layer.appendChild(win);
        
        if(dat.internal && id === 'settings') {
            let f = document.getElementById('frame-' + id);
            if(f) {
                let html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
                    <style>
                        body { background: #000; color: #fff; font-family: 'Rajdhani', sans-serif; padding: 25px; margin: 0; outline: none; }
                        * { outline: none; -webkit-tap-highlight-color: transparent; }
                        h2 { border-bottom: 2px solid #333; padding-bottom: 10px; font-weight: 700; letter-spacing: 1px; }
                        .setting-card { background: #111; border: 1px solid #333; padding: 15px; border-radius: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
                        .setting-text { display: flex; flex-direction: column; }
                        .setting-text b { color: #fff; font-size: 15px; }
                        .setting-text small { color: #888; font-size: 13px; }
                        .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
                        .switch input { opacity: 0; width: 0; height: 0; }
                        .slider { position: absolute; cursor: pointer; inset: 0; background-color: #444; transition: .3s; border-radius: 34px; }
                        .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: #fff; transition: .3s; border-radius: 50%; }
                        input:checked + .slider { background-color: #fff; }
                        input:checked + .slider:before { transform: translateX(20px); background-color: #000; }
                        input[type="text"], select { background: #222; color: #fff; border: 1px solid #444; padding: 6px; border-radius: 6px; }
                        input:focus, select:focus { border-color: #888; }
                    </style>
                </head>
                <body>
                    <h2>SYSTEM CONFIGURATION</h2>
                    <div class="setting-card">
                        <div class="setting-text"><b>Optimized Background</b><small>Disables video background</small></div>
                        <label class="switch"><input type="checkbox" id="chk-bg" onchange="window.parent.updateSysSetting('optBg',this.checked)"><span class="slider"></span></label>
                    </div>
                    <div class="setting-card">
                        <div class="setting-text"><b>Fast Boot</b><small>Skips the startup sequence</small></div>
                        <label class="switch"><input type="checkbox" id="chk-boot" onchange="window.parent.updateSysSetting('shortBoot',this.checked)"><span class="slider"></span></label>
                    </div>
                    <div class="setting-card">
                        <div class="setting-text"><b>Idle Lock Screen</b><small>Locks system when away for 3 minutes</small></div>
                        <label class="switch"><input type="checkbox" id="chk-idle" onchange="window.parent.updateSysSetting('idleLock',this.checked)"><span class="slider"></span></label>
                    </div>
                    <div class="setting-card">
                        <div class="setting-text"><b>Redirect Confirmation</b><small>Helps Protect Against GoGuardian tracking!</small></div>
                        <label class="switch"><input type="checkbox" id="chk-redir" onchange="window.parent.updateSysSetting('redirectConfirm',this.checked)"><span class="slider"></span></label>
                    </div>
                    <div class="setting-card">
                        <div class="setting-text"><b>Tab Cloaking</b><small>Disguises OS as another site</small></div>
                        <select id="cloak-select" onchange="window.parent.updateCloak(this.value)">
                            <option value="none">None (SillyOS)</option>
                            <option value="google">Google</option>
                            <option value="drive">Google Drive</option>
                            <option value="canvas">Canvas</option>
                        </select>
                    </div>
                    <div class="setting-card">
                        <div class="setting-text"><b>Panic Key</b><small>Instant site redirection shortcut</small></div>
                        <input type="text" id="panic-input" maxlength="1" style="width:40px; text-align:center; font-weight:bold; font-size:16px;" onkeyup="window.parent.updateSysSetting('panicKey',this.value)">
                    </div>
                    <script>
                        var prefs = window.parent.sysConfig;
                        document.getElementById('chk-bg').checked = prefs.optBg;
                        document.getElementById('chk-boot').checked = prefs.shortBoot;
                        document.getElementById('chk-idle').checked = prefs.idleLock;
                        document.getElementById('chk-redir').checked = prefs.redirectConfirm;
                        document.getElementById('cloak-select').value = prefs.cloak;
                        document.getElementById('panic-input').value = prefs.panicKey;
                    <\/script>
                </body>
                </html>`;
                f.srcdoc = html;
            }
        }
    } else {
        win.classList.remove('minimized');
        win.classList.add('active');
        win.style.zIndex = ++highestZ;
    }
    
    activeWindowId = id;
}

function closeWindow(id) {
    let w = document.getElementById('win-' + id);
    if(w) w.remove();
    if(activeWindowId === id) activeWindowId = null;
    endImmersiveMode();
}

function toggleMaximizeWindow(id) {
    var win = document.getElementById('win-' + id);
    if(!win) return;
    if(win.classList.contains('maximized')) {
        win.classList.remove('maximized');
        // Restore saved size/position
        if(win._savedRect) {
            win.style.left   = win._savedRect.left;
            win.style.top    = win._savedRect.top;
            win.style.width  = win._savedRect.width;
            win.style.height = win._savedRect.height;
        }
    } else {
        // Save current size/position
        win._savedRect = { left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height };
        win.classList.add('maximized');
    }
}

function minimizeWindow(id) {
    let w = document.getElementById('win-' + id);
    if(w) {
        w.classList.add('minimized');
        w.classList.remove('active');
        if(activeWindowId === id) activeWindowId = null;
    }
    endImmersiveMode();
}

function startImmersiveMode(win) {
    // Dock auto-hides when a window is active; header stays visible
    document.getElementById('dock-container').classList.add('dock-hidden');
}

function endImmersiveMode() {
    let aw = document.querySelectorAll('.window.active:not(.minimized)');
    if(aw.length === 0) {
        document.getElementById('dock-container').classList.remove('dock-hidden');
        activeWindowId = null;
    } else {
        let t = aw[aw.length - 1];
        activeWindowId = t.id.replace('win-', '');
        t.style.zIndex = ++highestZ;
        startImmersiveMode(t);
    }
}

var dockTimer;
var dEl = document.getElementById('dock-container');
document.getElementById('bottom-trigger').addEventListener('mouseenter', function() {
    dEl.classList.remove('dock-hidden');
    clearTimeout(dockTimer);
});
dEl.addEventListener('mouseleave', function() {
    let aw = document.querySelectorAll('.window.active:not(.minimized)');
    if(aw.length > 0) {
        dockTimer = setTimeout(function() { dEl.classList.add('dock-hidden'); }, 1000);
    }
});
dEl.addEventListener('mouseenter', function() { clearTimeout(dockTimer); });

// Header is always visible — immersive mouseover removed

var desktopLayout = JSON.parse(localStorage.getItem('silly_desktop_v3')) || [];

function saveDesktop() {
    localStorage.setItem('silly_desktop_v3', JSON.stringify(desktopLayout));
    loadDesktop();
}

function loadDesktop() {
    let c = document.getElementById('desktop-area');
    let ex = document.querySelectorAll('.desktop-app');
    for(let j=0; j<ex.length; j++) ex[j].remove();
    
    desktopLayout.forEach(function(item, idx) {
        let d = document.createElement('div');
        d.className = 'desktop-app';
        d.style.left = item.x + 'px';
        d.style.top = item.y + 'px';
        d.setAttribute('data-idx', idx);
        
        if(item.type === 'folder') {
            let gHTML = '<div class="d-folder-grid">';
            let mx = item.apps.slice(0, 4);
            mx.forEach(function(a) {
                if(APPS[a]) gHTML += '<img src="' + APPS[a].icon + '">';
            });
            gHTML += '</div>';
            if(!item.hideName) gHTML += '<div class="d-label">' + (item.customName || 'Folder') + '</div>';
            
            d.innerHTML = gHTML;
            d.onclick = function(ev) {
                if(DragSystem.isDragMove) return;
                ev.stopPropagation();
                if(!this.classList.contains('expanded-folder')) {
                    closeAllFolders();
                    expandFolder(this, item, idx);
                }
            };
        } else {
            let a = APPS[item.id];
            if(a) {
                let iSrc = item.customIcon || a.icon;
                let lbl = item.customName || a.title;
                let h = '<img src="' + iSrc + '" class="d-icon">';
                if(!item.hideName) h += '<div class="d-label">' + lbl + '</div>';
                d.innerHTML = h;
                d.ondblclick = function(ev) { ev.stopPropagation(); toggleApp(item.id); };
            }
        }
        
        d.onmousedown = function(ev) {
            ev.stopPropagation();
            if(ev.button === 0) DragSystem.start(ev, d, 'desktop', idx);
        };
        
        d.oncontextmenu = function(ev) {
            ev.preventDefault(); ev.stopPropagation();
            hideAllCtx();
            let m = document.getElementById('app-context-menu');
            if(m) {
                m.style.display = 'block';
                m.style.left = ev.pageX + 'px';
                m.style.top = ev.pageY + 'px';
                m.setAttribute('data-target-idx', idx);
            }
        };
        
        c.appendChild(d);
    });
}

function expandFolder(el, dat, idx) {
    el.classList.add('expanded-folder');
    
    let h = '<div class="folder-header">' + (dat.customName || 'Folder') + ' <i class="fas fa-times" onclick="closeAllFolders(event)"></i></div>';
    h += '<div class="folder-grid-expanded">';
    for(let k=0; k<dat.apps.length; k++) {
        let aId = dat.apps[k];
        let info = APPS[aId];
        if(info) {
            h += '<div class="f-app" onclick="event.stopPropagation(); toggleApp(\'' + aId + '\')"><img src="' + info.icon + '"><span>' + info.title + '</span></div>';
        }
    }
    h += '</div>';
    el.innerHTML = h;
    
    setTimeout(function() {
        let rect = el.getBoundingClientRect();
        let sibs = document.querySelectorAll('.desktop-app:not(.expanded-folder)');
        for(let s=0; s<sibs.length; s++) {
            let sib = sibs[s];
            let sr = sib.getBoundingClientRect();
            if(!(rect.right < sr.left || rect.left > sr.right || rect.bottom < sr.top || rect.top > sr.bottom)) {
                let push = (rect.bottom - sr.top) + 20;
                sib.style.transform = 'translateY(' + push + 'px)';
                sib.setAttribute('data-pushed', 'true');
            }
        }
    }, 50);
}

function closeAllFolders(ev) {
    if(ev) ev.stopPropagation();
    let op = document.querySelectorAll('.expanded-folder');
    if(op.length === 0) return;
    
    for(let i=0; i<op.length; i++) op[i].classList.remove('expanded-folder');
    
    let push = document.querySelectorAll('.desktop-app[data-pushed="true"]');
    for(let j=0; j<push.length; j++) {
        push[j].style.transform = '';
        push[j].removeAttribute('data-pushed');
    }
    setTimeout(loadDesktop, 250);
}

function setupAppContextMenu() {
    let m = document.getElementById('app-context-menu');
    if(!m) return;
    m.innerHTML = `
        <li class="ctx-item" id="ctx-rename" role="menuitem" tabindex="0"><i class="fas fa-edit fa-fw" aria-hidden="true"></i> Rename</li>
        <li class="ctx-item" id="ctx-hidename" role="menuitem" tabindex="0"><i class="fas fa-eye-slash fa-fw" aria-hidden="true"></i> Toggle Name</li>
        <li class="ctx-item" id="ctx-changeicon" role="menuitem" tabindex="0"><i class="fas fa-image fa-fw" aria-hidden="true"></i> Change Icon</li>
        <li class="ctx-separator" role="separator"></li>
        <li class="ctx-item" id="ctx-delete" role="menuitem" tabindex="0"><i class="fas fa-trash fa-fw" style="color:#aaa;" aria-hidden="true"></i> Remove</li>
    `;
    
    document.getElementById('ctx-rename').onclick = function() {
        let i = m.getAttribute('data-target-idx');
        let nm = prompt("Enter new name:", desktopLayout[i].customName || "");
        if(nm !== null) {
            desktopLayout[i].customName = nm.trim() === "" ? "App" : nm;
            saveDesktop();
        }
        m.style.display = 'none';
    };
    
    document.getElementById('ctx-hidename').onclick = function() {
        let i = m.getAttribute('data-target-idx');
        desktopLayout[i].hideName = !desktopLayout[i].hideName;
        saveDesktop();
        m.style.display = 'none';
    };
    
    document.getElementById('ctx-changeicon').onclick = function() {
        let i = m.getAttribute('data-target-idx');
        let url = prompt("Enter image URL for custom icon:");
        if(url) {
            desktopLayout[i].customIcon = url;
            saveDesktop();
        }
        m.style.display = 'none';
    };
    
    document.getElementById('ctx-delete').onclick = function() {
        let i = m.getAttribute('data-target-idx');
        desktopLayout.splice(i, 1);
        saveDesktop();
        m.style.display = 'none';
    };
}

document.addEventListener('contextmenu', function(e) {
    let ids = ['desktop-area', 'windows-layer', 'bg-video', 'bg-img', 'snow-fx', 'right-sidebar'];
    if(ids.includes(e.target.id) || e.target.tagName === 'BODY' || e.target.closest('#right-sidebar')) {
        e.preventDefault();
        hideAllCtx();
        let m = document.getElementById('desktop-context-menu');
        if(m) {
            m.style.display = 'block';
            let x = e.pageX, y = e.pageY;
            if(x + 200 > window.innerWidth) x = window.innerWidth - 200;
            if(y + 100 > window.innerHeight) y = window.innerHeight - 100;
            m.style.left = x + 'px';
            m.style.top = y + 'px';
        }
    }
});

var DragSystem = {
    dragging: false, startPos: {x:0,y:0}, sourceType: null, sourceEl: null,
    idx: null, appId: null, proxy: document.getElementById('drag-proxy'),
    pImg: document.getElementById('proxy-img'), badge: document.getElementById('folder-badge'),
    
    init: function() {
        window.addEventListener('mousemove', e => this.move(e));
        window.addEventListener('mouseup', e => this.end(e));
    },
    
    start: function(e, el, type, id) {
        this.startPos = {x: e.clientX, y: e.clientY};
        this.sourceType = type; this.sourceEl = el; this.isDragMove = false;
        if(type === 'drawer' || type === 'dock') this.appId = id;
        else if(type === 'desktop') { this.idx = id; this.sourceEl.style.opacity = '0.5'; }
    },
    
    startWinDrag: function(e, id) {
        var win = document.getElementById('win-' + id);
        if(!win || win.classList.contains('maximized')) return;
        e.preventDefault();
        this.startPos = {x: e.clientX, y: e.clientY};
        this.sourceType = 'window';
        this.sourceEl = win;
        this.winStartLeft = parseFloat(win.style.left) || 0;
        this.winStartTop  = parseFloat(win.style.top)  || 0;
        this.isDragMove = false;
        // Bring to front
        win.style.zIndex = ++highestZ;
        activeWindowId = id;
    },
    
    move: function(e) {
        if(!this.sourceEl) return;
        let dx = Math.abs(e.clientX - this.startPos.x);
        let dy = Math.abs(e.clientY - this.startPos.y);
        
        if(dx > 3 || dy > 3) {
            this.dragging = true; this.isDragMove = true;
            if(this.resizing) {
                var nw = Math.max(300, this.resizeStartW + (e.clientX - this.resizeStartX));
                var nh = Math.max(200, this.resizeStartH + (e.clientY - this.resizeStartY));
                this.resizeEl.style.width  = nw + 'px';
                this.resizeEl.style.height = nh + 'px';
                return;
            }
            if(this.sourceType === 'window') {
                var newLeft = this.winStartLeft + (e.clientX - this.startPos.x);
                var newTop  = Math.max(0, this.winStartTop  + (e.clientY - this.startPos.y));
                this.sourceEl.style.left = newLeft + 'px';
                this.sourceEl.style.top  = newTop  + 'px';
            } else if(this.sourceType === 'desktop' || this.sourceType === 'drawer' || this.sourceType === 'dock') {
                if(this.sourceType === 'drawer') toggleAppDrawer();
                this.proxy.style.display = 'block';
                this.proxy.style.left = (e.clientX - 25) + 'px';
                this.proxy.style.top = (e.clientY - 25) + 'px';
                
                if(this.sourceType === 'drawer' || this.sourceType === 'dock') {
                    if(APPS[this.appId]) this.pImg.src = APPS[this.appId].icon;
                } else {
                    let itm = desktopLayout[this.idx];
                    if(itm.type === 'app') {
                        if(APPS[itm.id]) this.pImg.src = APPS[itm.id].icon;
                    } else {
                        this.pImg.src = '';
                        this.badge.style.display = 'flex';
                        this.badge.innerText = itm.apps.length;
                    }
                }
            }
        }
    },
    
    startWinResize: function(e, id) {
        var win = document.getElementById('win-' + id);
        if(!win || win.classList.contains('maximized')) return;
        e.preventDefault(); e.stopPropagation();
        this.resizing = true;
        this.resizeId = id;
        this.resizeEl = win;
        this.resizeStartX = e.clientX;
        this.resizeStartY = e.clientY;
        this.resizeStartW = win.offsetWidth;
        this.resizeStartH = win.offsetHeight;
        win.style.zIndex = ++highestZ;
    },

    end: function(e) {
        if(this.resizing) {
            this.resizing = false; this.resizeEl = null;
        }
        if(!this.sourceEl) return;
        if(!this.isDragMove && this.sourceType === 'desktop') { this.reset(); return; }
        if(!this.dragging) { this.reset(); return; }
        
        if(this.sourceType === 'desktop' || this.sourceType === 'drawer' || this.sourceType === 'dock') {
            let nx = Math.round((e.clientX - 40) / 90) * 90;
            let ny = Math.round((e.clientY - 40) / 100) * 100;
            
            if(e.clientY > window.innerHeight - 80) {
                if(this.sourceType === 'desktop') desktopLayout.splice(this.idx, 1);
            } else {
                let tIdx = -1;
                let aAll = document.querySelectorAll('.desktop-app');
                for(let i=0; i<aAll.length; i++) {
                    if(aAll[i] !== this.sourceEl) {
                        let r = aAll[i].getBoundingClientRect();
                        if(e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) tIdx = aAll[i].dataset.idx;
                    }
                }
                
                if(tIdx > -1) {
                    let targ = desktopLayout[tIdx];
                    let drp = (this.sourceType === 'drawer' || this.sourceType === 'dock') ? [this.appId] : (desktopLayout[this.idx].type === 'app' ? [desktopLayout[this.idx].id] : desktopLayout[this.idx].apps);
                    
                    if(targ.type === 'app') {
                        targ.type = 'folder';
                        targ.apps = [targ.id].concat(drp);
                        delete targ.id;
                    } else {
                        targ.apps.push.apply(targ.apps, drp);
                    }
                    if(this.sourceType === 'desktop') desktopLayout.splice(this.idx, 1);
                } else {
                    if(this.sourceType === 'drawer' || this.sourceType === 'dock') {
                        desktopLayout.push({type: 'app', id: this.appId, x: nx, y: ny});
                    } else {
                        desktopLayout[this.idx].x = nx;
                        desktopLayout[this.idx].y = ny;
                    }
                }
            }
            saveDesktop();
        }
        this.reset();
    },
    
    reset: function() {
        this.dragging = false;
        if(this.sourceEl) this.sourceEl.style.opacity = '1';
        this.sourceEl = null;
        this.proxy.style.display = 'none';
        this.badge.style.display = 'none';
    }
};
DragSystem.init();

window.toggleDesktopSize = function(l) {
    if(l) document.getElementById('desktop-area').classList.add('desktop-large-mode');
    else document.getElementById('desktop-area').classList.remove('desktop-large-mode');
    document.getElementById('desktop-context-menu').style.display = 'none';
};

var unlockedWallpapers = JSON.parse(localStorage.getItem('silly_unlocked_wp')) || ['default'];
window.wpMode = 'both';

function setWallpaper(k, noti=false) {
    let d = wallpaperRegistry[k];
    if(!d) return;
    
    if(noti && d.locked && !unlockedWallpapers.includes(d.id)) {
        unlockedWallpapers.push(d.id);
        localStorage.setItem('silly_unlocked_wp', JSON.stringify(unlockedWallpapers));
        alert("Wallpaper: [ " + d.name + " ] Unlocked.");
    }
    
    if(window.wpMode === 'home' || window.wpMode === 'both') {
        let bV = document.getElementById('bg-video');
        let bI = document.getElementById('bg-img');
        applyMediaToElements(d.url, bV, bI, true);
        updateSysSetting('homeWallpaper', k);
    }
    
    if(window.wpMode === 'lock' || window.wpMode === 'both') {
        let lV = document.getElementById('lock-video');
        let lI = document.getElementById('lock-img');
        applyMediaToElements(d.url, lV, lI, false);
        updateSysSetting('lockWallpaper', k);
    }
    
    updateWallpaperLoop();
    openWallpaperMenu();
}

function openWallpaperMenu() {
    let m = document.getElementById('wallpaper-menu');
    let gu = document.getElementById('wp-grid-unlocked');
    let gl = document.getElementById('wp-grid-locked');
    if(!m) return;
    
    if(m.showModal) m.showModal();
    else m.style.display = 'flex';
    m.classList.add('open');
    
    gu.innerHTML = '';
    gl.innerHTML = '';
    
    for(let k in wallpaperRegistry) {
        let d = wallpaperRegistry[k];
        let ul = !d.locked || unlockedWallpapers.includes(d.id);
        let c = document.createElement('div');
        c.className = "wp-card " + (ul ? "" : "wp-locked");
        
        if(ul) {
            let mHtml = "";
            if(d.url.match(/\.(png|jpg|jpeg|gif)$/i)) mHtml = '<img src="' + d.url + '" alt="wp">';
            else mHtml = '<video src="' + d.url + '" preload="auto" playsinline muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>';
            
            c.innerHTML = mHtml + '<div class="wp-info">' + d.name + '</div>';
            c.setAttribute('data-key', k);
            c.onclick = function() {
                setWallpaper(this.getAttribute('data-key'));
                let crds = document.querySelectorAll('.wp-card');
                for(let j=0; j<crds.length; j++) crds[j].classList.remove('active-wp');
                this.classList.add('active-wp');
            };
            gu.appendChild(c);
        } else {
            c.innerHTML = '<div class="wp-info"><i class="fas fa-lock"></i></div>';
            gl.appendChild(c);
        }
    }
    
    let chk = document.getElementById('wp-loop-chk');
    if(chk) {
        chk.checked = sysConfig.wpLoop;
        chk.onchange = e => updateSysSetting('wpLoop', e.target.checked);
    }
}

var sInp = document.getElementById('start-search-input');
if(sInp) {
    sInp.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            let q = this.value.trim();
            if(wallpaperRegistry[q]) {
                setWallpaper(q, true);
                this.value = "";
                this.blur();
            }
        }
    });
}

function toggleStartMenu() {
    let sm = document.getElementById('start-menu');
    if(sm.classList.contains('open')) {
        sm.classList.remove('open');
        setTimeout(function(){ sm.style.display='none'; }, 300);
    } else {
        sm.style.display = 'flex';
        setTimeout(function(){ sm.classList.add('open'); }, 10);
    }
}

document.addEventListener('click', function(e) {
    let sm = document.getElementById('start-menu');
    if(sm && !sm.contains(e.target) && !e.target.closest('.dock-item')) {
        sm.classList.remove('open');
        setTimeout(function(){ sm.style.display='none'; }, 300);
    }
});

var cvsSnow = document.getElementById('snow-fx');
if(cvsSnow) {
    var ctxSnow = cvsSnow.getContext('2d');
    var sW = window.innerWidth, sH = window.innerHeight;
    cvsSnow.width = sW; cvsSnow.height = sH;
    
    var flakes = [];
    for(var f=0; f<30; f++) flakes.push({x: Math.random()*sW, y: Math.random()*sH, r: Math.random()*2, s: Math.random()+0.5});
    
    function drawSnow() {
        if(isDesktopActive) {
            ctxSnow.clearRect(0, 0, sW, sH);
            ctxSnow.fillStyle = "rgba(255,255,255,0.3)";
            for(let i=0; i<flakes.length; i++) {
                let fl = flakes[i];
                ctxSnow.beginPath();
                ctxSnow.arc(fl.x, fl.y, fl.r, 0, Math.PI * 2);
                ctxSnow.fill();
                fl.y += fl.s;
                if(fl.y > sH) fl.y = 0;
            }
        }
        requestAnimationFrame(drawSnow);
    }
    drawSnow();
}

var MODES = ['FAST', 'THINKING', 'LIVE'];
var cMode = 0;
var isCiriActive = false;
var holdTimer = null;
var hasBootCiri = false;
var expectKey = false;
var sStream = null;
var cImgB64 = null;
var cImgMime = null;

function checkApiKey() {
    let st = document.getElementById('status-text');
    let si = document.getElementById('status-icon');
    if(!st) return;
    if(localStorage.getItem('ciri_key')) {
        st.textContent = "Secure"; st.className = "secure";
        si.innerHTML = '<svg class="secure-svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>';
    } else {
        st.textContent = "Unstable"; st.className = "unstable";
        si.innerHTML = '<svg class="unstable-svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    }
}
checkApiKey();

window.autoGrow = function(el) { el.style.height = "5px"; el.style.height = (el.scrollHeight) + "px"; };

window.addEventListener('keydown', function(e) {
    if(e.altKey && (e.code === 'KeyS' || e.key.toLowerCase() === 's')) {
        if(!holdTimer && !isCiriActive) {
            holdTimer = setTimeout(function() {
                document.body.classList.add('ciri-active');
                isCiriActive = true;
                let cInp = document.getElementById('chat-input');
                if(!hasBootCiri) {
                    let bs = document.getElementById('ciri-boot-screen');
                    if(bs) bs.style.display = 'flex';
                    setTimeout(function(){ document.getElementById('boot-ciri-text').classList.add('typing'); }, 300);
                    setTimeout(function(){ document.getElementById('boot-sub-text').classList.add('show'); }, 1100);
                    setTimeout(function() {
                        document.getElementById('boot-loader').style.opacity = '1';
                        setTimeout(function() {
                            document.getElementById('boot-status-text').textContent = "Connection Established.";
                            document.getElementById('boot-spinner').style.display = 'none';
                            setTimeout(function() {
                                bs.style.filter = 'blur(10px)'; bs.style.opacity = '0';
                                setTimeout(function() {
                                    bs.style.display = 'none';
                                    hasBootCiri = true;
                                    if(cInp) cInp.focus();
                                }, 800);
                            }, 1800);
                        }, 1000);
                    }, 2200);
                } else {
                    setTimeout(function(){ if(cInp) cInp.focus(); }, 100);
                }
            }, 2000);
        }
    } else if(e.code === 'Escape' && isCiriActive) {
        closeCiri();
    }
});

window.addEventListener('keyup', function(e) {
    if(e.code === 'KeyS' || e.key.toLowerCase() === 's' || e.key === 'Alt') {
        clearTimeout(holdTimer); holdTimer = null;
    }
});

window.closeCiri = function() {
    document.body.classList.remove('ciri-active');
    isCiriActive = false;
};

var aMedia = null;
var nHide;
var cNoti = document.getElementById('cine-noti');

function showNoti() {
    if(!cNoti) return;
    cNoti.classList.add('active'); cNoti.classList.remove('minimized');
    let rb = document.getElementById('restore-btn');
    if(rb) rb.classList.remove('visible');
    resetNH();
}

function hideNoti() {
    if(!cNoti) return;
    cNoti.classList.remove('active'); cNoti.classList.remove('minimized');
    let rb = document.getElementById('restore-btn');
    if(rb) rb.classList.remove('visible');
    clearTimeout(nHide);
}

function resetNH() {
    clearTimeout(nHide);
    if(cNoti && cNoti.classList.contains('active') && !cNoti.classList.contains('minimized')) {
        nHide = setTimeout(function() {
            cNoti.classList.add('minimized');
            setTimeout(function(){ let rb = document.getElementById('restore-btn'); if(rb) rb.classList.add('visible'); }, 300);
        }, 5000);
    }
}

if(cNoti) {
    cNoti.addEventListener('mouseenter', function(){ clearTimeout(nHide); });
    cNoti.addEventListener('mouseleave', resetNH);
    let mn = document.getElementById('minimize-noti-btn');
    if(mn) mn.onclick = function() {
        cNoti.classList.add('minimized');
        setTimeout(function(){ let rb = document.getElementById('restore-btn'); if(rb) rb.classList.add('visible'); }, 300);
    };
    let rbtn = document.getElementById('restore-btn');
    if(rbtn) rbtn.onclick = function() {
        this.classList.remove('visible');
        cNoti.classList.remove('minimized');
        resetNH();
    };
    let clbtn = document.getElementById('close-noti-btn');
    if(clbtn) clbtn.onclick = function() {
        if(aMedia) aMedia.pause();
        hideNoti();
    };
}

setInterval(function() {
    let fnd = null;
    let md = document.querySelectorAll('audio, video');
    for(let i=0; i<md.length; i++) {
        let m = md[i];
        if(!m.paused && !m.muted && m.volume > 0 && !['bg-video', 'lock-video', 'boot-video'].includes(m.id)) fnd = m;
    }
    
    let ifr = document.querySelectorAll('iframe');
    for(let j=0; j<ifr.length; j++) {
        try {
            let idc = ifr[j].contentDocument || ifr[j].contentWindow.document;
            if(idc) {
                let imd = idc.querySelectorAll('audio, video');
                for(let k=0; k<imd.length; k++) {
                    if(!imd[k].paused && !imd[k].muted && imd[k].volume > 0) fnd = imd[k];
                }
            }
        } catch(e) {}
    }
    
    isMediaPlaying = !!fnd;
    if(fnd !== aMedia) {
        if(fnd) { aMedia = fnd; setupM(); showNoti(); }
        else { aMedia = null; hideNoti(); }
    }
    
    if(aMedia) {
        let ct = document.getElementById('current-time');
        if(ct) ct.textContent = fmtT(aMedia.currentTime);
        if(isFinite(aMedia.duration) && aMedia.duration > 0) {
            let pf = document.getElementById('progress-fill');
            if(pf) pf.style.width = ((aMedia.currentTime / aMedia.duration) * 100) + "%";
            let tt = document.getElementById('total-time');
            if(tt) tt.textContent = fmtT(aMedia.duration);
        }
    }
}, 1000);

function setupM() {
    if(!aMedia) return;
    let nt = document.getElementById('noti-title');
    if(nt) nt.innerText = aMedia.title || "Web Media Playing";
    
    let pp = document.getElementById('play-pause');
    if(pp) pp.onclick = function() { aMedia.paused ? aMedia.play() : aMedia.pause(); resetNH(); };
    
    aMedia.addEventListener('play', function() {
        let iPl = document.getElementById('icon-play');
        let iPa = document.getElementById('icon-pause');
        if(iPl) iPl.classList.add('hidden-svg');
        if(iPa) iPa.classList.add('visible-svg');
        showNoti();
    });
    
    aMedia.addEventListener('pause', function() {
        let iPl = document.getElementById('icon-play');
        let iPa = document.getElementById('icon-pause');
        if(iPl) { iPl.classList.remove('hidden-svg'); iPl.classList.add('visible-svg'); }
        if(iPa) { iPa.classList.remove('visible-svg'); iPa.classList.add('hidden-svg'); }
    });
    
    let sb = document.getElementById('skip-back');
    if(sb) sb.onclick = function() { if(isFinite(aMedia.currentTime)) aMedia.currentTime = Math.max(0, aMedia.currentTime - 15); resetNH(); };
    
    let sf = document.getElementById('skip-forward');
    if(sf) sf.onclick = function() { if(isFinite(aMedia.duration) && aMedia.duration > 0) aMedia.currentTime = Math.min(aMedia.duration, aMedia.currentTime + 15); resetNH(); };
    
    let pha = document.getElementById('progress-hit-area');
    if(pha) pha.onclick = function(e) {
        if(isFinite(aMedia.duration) && aMedia.duration > 0) {
            let r = this.getBoundingClientRect();
            let p = (e.clientX - r.left) / r.width;
            aMedia.currentTime = p * aMedia.duration;
        }
        resetNH();
    };
}

function fmtT(s) {
    if(isNaN(s) || !isFinite(s)) return "0:00";
    let m = Math.floor(s / 60);
    let se = Math.floor(s % 60);
    return m + ":" + se.toString().padStart(2, '0');
}

function drawFV() {
    requestAnimationFrame(drawFV);
    let cv = document.getElementById('visualizer');
    if(!cv) return;
    let cx = cv.getContext('2d');
    
    cv.width = cv.parentElement.clientWidth;
    cv.height = 14;
    
    let bL = 32;
    cx.clearRect(0, 0, cv.width, cv.height);
    let bW = (cv.width / bL) * 2;
    let xP = 0;
    
    for(let i=0; i<bL; i++) {
        let bH = aMedia && !aMedia.paused ? (Math.random() * cv.height) : 2;
        cx.fillStyle = "#fff";
        cx.beginPath();
        cx.roundRect(xP, cv.height - bH, bW - 1.5, bH, 2);
        cx.fill();
        xP += bW;
    }
}
drawFV();

var fLT = performance.now();
var fFr = 0;
var fLC = 0;

function chkFps() {
    let nw = performance.now();
    fFr++;
    if(nw - fLT >= 1000) {
        let cFps = fFr;
        let fv = document.getElementById('fps-val');
        if(fv) fv.innerText = cFps;

        if(cFps <= 20) {
            fLC++;
            if(fLC >= 5 && !sysConfig.optBg) {
                sysConfig.optBg = true;
                localStorage.setItem('silly_sys_config', JSON.stringify(sysConfig));
                let bv = document.getElementById('bg-video');
                let lv = document.getElementById('lock-video');
                if(bv) bv.pause();
                if(lv) lv.pause();
                showNotification("System Optimized", "Low FPS detected. Backgrounds paused.");
            }
        } else {
            fLC = 0;
        }
        
        fFr = 0;
        fLT = nw;
    }
    requestAnimationFrame(chkFps);
}
requestAnimationFrame(chkFps);

/* ============================================================
   SILLY-OS WIDGET SYSTEM
   - Widgets v2: draggable, resizable, configurable
   - More widget types, weather with location
   - Window resize handles
   ============================================================ */

var _widgetInstances = JSON.parse(localStorage.getItem('silly_widgets_v2')) || [];

function _saveWidgets() {
    localStorage.setItem('silly_widgets_v2', JSON.stringify(_widgetInstances));
    // Update sidebar counters
    var wc = document.getElementById('sb-wgtcount');
    var wl = document.getElementById('sb-wgtcount-label');
    if(wc) wc.textContent = _widgetInstances.length;
    if(wl) wl.textContent = _widgetInstances.length + ' active';
}

var WIDGET_DEFS = [
    {type:'clock',      label:'Clock',          desc:'Live digital clock',             emoji:'🕐', bg:'#4f67d8'},
    {type:'calendar',   label:'Calendar',        desc:'This month at a glance',         emoji:'📅', bg:'#7c5cbf'},
    {type:'weather',    label:'Weather',         desc:'Live weather — set your city',    emoji:'⛅', bg:'#1a7ba0'},
    {type:'sysmon',     label:'System Monitor',  desc:'CPU & memory meters',            emoji:'📊', bg:'#2a7d4f'},
    {type:'notes',      label:'Quick Notes',     desc:'Sticky note on your desktop',    emoji:'📝', bg:'#b07a1a'},
    {type:'quicklinks', label:'Quick Links',     desc:'Saved website shortcuts',        emoji:'🔗', bg:'#c0392b'},
    {type:'countdown',  label:'Countdown',       desc:'Count down to any date',         emoji:'⏳', bg:'#8e44ad'},
    {type:'search',     label:'Web Search',      desc:'Search Google from desktop',     emoji:'🔍', bg:'#2c3e50'},
    {type:'quote',      label:'Daily Quote',     desc:'Inspiring quote of the day',     emoji:'💬', bg:'#16a085'},
    {type:'stocks',     label:'Crypto Ticker',   desc:'Live BTC/ETH prices',            emoji:'📈', bg:'#1a5276'},
];

/* ── Widget Editor Injection ──────────────────────────────── */
function injectWidgetEditor() {
    var style = document.createElement('style');
    style.textContent = `
    /* ── Backdrop / panel ─────────────────────────────── */
    #silly-widget-panel-backdrop {
        display:none; position:fixed; inset:0; z-index:8000;
        background:rgba(0,0,0,0.6); backdrop-filter:blur(8px);
        align-items:center; justify-content:center;
    }
    #silly-widget-panel-backdrop.open { display:flex; }
    #silly-widget-panel {
        background:#0f1120; border:1px solid rgba(255,255,255,0.13);
        border-radius:18px; box-shadow:0 30px 80px rgba(0,0,0,0.8);
        width:min(600px,96vw); max-height:85vh; display:flex; flex-direction:column;
        overflow:hidden; font-family:'Rajdhani',sans-serif; color:#e8eaf6;
    }
    #silly-widget-panel header {
        display:flex; align-items:center; justify-content:space-between;
        padding:18px 24px; border-bottom:1px solid rgba(255,255,255,0.08); flex-shrink:0;
    }
    #silly-widget-panel header h2 { font-size:18px; font-weight:700; margin:0; gap:10px; display:flex; align-items:center; }
    #silly-widget-panel header h2 span { color:#6c8fff; }
    #swp-close { background:transparent; border:1px solid rgba(255,255,255,0.15); color:#aaa;
        width:32px; height:32px; border-radius:50%; cursor:pointer; font-size:16px;
        display:flex; align-items:center; justify-content:center; transition:.2s; }
    #swp-close:hover { color:#ff5f57; border-color:#ff5f57; }
    #silly-widget-panel .swp-body { overflow-y:auto; padding:20px 24px; flex:1; display:flex; flex-direction:column; gap:20px; }
    #silly-widget-panel .swp-body::-webkit-scrollbar { width:5px; }
    #silly-widget-panel .swp-body::-webkit-scrollbar-thumb { background:rgba(108,143,255,0.3); border-radius:5px; }
    .swp-section-title { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(232,234,246,0.4); font-weight:600; margin-bottom:10px; }
    .swp-catalog { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
    .swp-catalog-item { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
        border-radius:12px; padding:13px; display:flex; align-items:flex-start; gap:12px;
        cursor:pointer; transition:.2s; }
    .swp-catalog-item:hover { background:rgba(108,143,255,0.12); border-color:rgba(108,143,255,0.35); transform:translateY(-2px); }
    .swp-cat-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
    .swp-cat-info strong { display:block; font-size:14px; font-weight:600; }
    .swp-cat-info small { color:rgba(232,234,246,0.4); font-size:11px; }
    .swp-active-list { display:flex; flex-direction:column; gap:8px; }
    .swp-active-row { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
        border-radius:10px; padding:11px 14px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .swp-active-row .swp-row-name { font-size:14px; display:flex; align-items:center; gap:8px; }
    .swp-row-btns { display:flex; gap:8px; }
    .swp-cfg-btn { background:transparent; border:1px solid rgba(108,143,255,0.4); color:#6c8fff;
        padding:4px 12px; border-radius:7px; cursor:pointer; font-size:12px; font-family:inherit; transition:.2s; }
    .swp-cfg-btn:hover { background:rgba(108,143,255,0.15); }
    .swp-remove-btn { background:transparent; border:1px solid rgba(255,95,87,0.4); color:#ff5f57;
        padding:4px 12px; border-radius:7px; cursor:pointer; font-size:12px; font-family:inherit; transition:.2s; }
    .swp-remove-btn:hover { background:rgba(255,95,87,0.15); }
    .swp-empty { color:rgba(232,234,246,0.3); font-size:13px; text-align:center; padding:20px 0; }

    /* ── Desktop widget shell ──────────────────────────── */
    .silly-desk-widget { position:fixed; z-index:80; user-select:none;
        border-radius:14px; overflow:visible;
        box-shadow:0 8px 32px rgba(0,0,0,0.6);
        animation:sillywgtIn .25s cubic-bezier(.34,1.56,.64,1); }
    @keyframes sillywgtIn { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
    .swgt-shell { border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.09);
        cursor:grab; }
    .swgt-shell:active { cursor:grabbing; }
    .swgt-body { background:rgba(10,12,24,0.9); backdrop-filter:blur(20px); }

    /* Resize handle */
    .swgt-resize { position:absolute; bottom:0; right:0; width:18px; height:18px;
        cursor:se-resize; z-index:10; display:flex; align-items:flex-end; justify-content:flex-end; padding:3px; }
    .swgt-resize svg { width:10px; height:10px; opacity:0.3; transition:opacity .15s; }
    .silly-desk-widget:hover .swgt-resize svg { opacity:0.7; }

    /* ── Per-widget config popover ─────────────────────── */
    .swgt-cfg-popover { position:absolute; top:32px; right:0; z-index:500;
        background:rgba(10,12,24,0.97); border:1px solid rgba(255,255,255,0.12);
        border-radius:12px; box-shadow:0 12px 32px rgba(0,0,0,0.7);
        padding:14px 16px; min-width:220px; display:none; flex-direction:column; gap:10px;
        font-family:'Rajdhani',sans-serif; color:#e8eaf6; }
    .swgt-cfg-popover.open { display:flex; }
    .swgt-cfg-row { display:flex; flex-direction:column; gap:4px; }
    .swgt-cfg-lbl { font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
        color:rgba(232,234,246,0.4); }
    .swgt-cfg-input { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12);
        color:#e8eaf6; padding:7px 10px; border-radius:8px; font-size:13px;
        font-family:'Rajdhani',sans-serif; outline:none; width:100%; }
    .swgt-cfg-input:focus { border-color:rgba(108,143,255,0.5); background:rgba(108,143,255,0.07); }
    .swgt-cfg-btn-apply { background:#6c8fff; border:none; color:#fff;
        padding:7px 14px; border-radius:8px; cursor:pointer; font-size:13px;
        font-family:'Rajdhani',sans-serif; font-weight:600; transition:.2s; width:100%; }
    .swgt-cfg-btn-apply:hover { background:#8aa3ff; }
    .swgt-cfg-select { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12);
        color:#e8eaf6; padding:7px 10px; border-radius:8px; font-size:13px;
        font-family:'Rajdhani',sans-serif; outline:none; width:100%; }

    /* ── Individual widget body styles ─────────────────── */
    .swgt-clock .swgt-body { padding:16px 22px; text-align:center; }
    .swgt-clock-time { font-family:'Orbitron',monospace; font-size:32px; font-weight:700; color:#e8eaf6; letter-spacing:3px; }
    .swgt-clock-secs { font-family:'Orbitron',monospace; font-size:18px; color:rgba(232,234,246,0.35); }
    .swgt-clock-date { font-size:11px; color:rgba(232,234,246,0.4); margin-top:6px; letter-spacing:2px; text-transform:uppercase; }

    .swgt-calendar .swgt-body { padding:12px 14px; }
    .swgt-cal-month { font-size:13px; font-weight:700; color:#e8eaf6; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; }
    .swgt-cal-nav { background:transparent; border:none; color:rgba(232,234,246,0.4); cursor:pointer; font-size:14px; transition:.15s; }
    .swgt-cal-nav:hover { color:#e8eaf6; }
    .swgt-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
    .swgt-cal-grid span { text-align:center; font-size:10px; padding:4px 2px; border-radius:4px;
        color:rgba(232,234,246,0.4); font-family:'Rajdhani',sans-serif; }
    .swgt-cal-grid span.swgt-cal-hd { color:#6c8fff; font-weight:700; }
    .swgt-cal-grid span.swgt-cal-today { background:#6c8fff; color:#fff !important; border-radius:50%; font-weight:700; }
    .swgt-cal-grid span.swgt-cal-other { opacity:0.3; }

    .swgt-weather .swgt-body { padding:16px 20px; }
    .swgt-weather-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .swgt-weather-icon { font-size:42px; }
    .swgt-weather-right { text-align:right; }
    .swgt-weather-temp { font-family:'Orbitron',monospace; font-size:34px; font-weight:700; color:#e8eaf6; }
    .swgt-weather-unit { font-size:16px; color:rgba(232,234,246,0.4); }
    .swgt-weather-cond { font-size:12px; color:rgba(232,234,246,0.5); margin-top:2px; }
    .swgt-weather-loc { font-size:11px; color:rgba(232,234,246,0.35); letter-spacing:1px; text-transform:uppercase; margin-top:8px; }
    .swgt-weather-details { display:flex; gap:12px; margin-top:8px; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px; }
    .swgt-weather-detail { display:flex; flex-direction:column; align-items:center; flex:1; }
    .swgt-weather-detail span:first-child { font-size:10px; color:rgba(232,234,246,0.35); letter-spacing:1px; }
    .swgt-weather-detail span:last-child { font-size:13px; color:#e8eaf6; font-weight:600; }

    .swgt-sysmon .swgt-body { padding:12px 16px; display:flex; flex-direction:column; gap:10px; }
    .swgt-mon-row { display:flex; flex-direction:column; gap:4px; }
    .swgt-mon-hd { display:flex; justify-content:space-between; align-items:center; }
    .swgt-mon-lbl { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(232,234,246,0.4); font-family:'Rajdhani',sans-serif; }
    .swgt-mon-pct { font-size:10px; color:rgba(232,234,246,0.5); }
    .swgt-mon-bar { height:5px; background:rgba(255,255,255,0.07); border-radius:4px; overflow:hidden; }
    .swgt-mon-fill { height:100%; border-radius:4px; background:#6c8fff; transition:width 1s ease; }
    .swgt-mon-fill.warn { background:#febc2e; } .swgt-mon-fill.crit { background:#ff5f57; }

    .swgt-notes .swgt-body { }
    .swgt-notes textarea { width:100%; background:transparent; border:none; outline:none;
        color:#e8eaf6; font-size:13px; font-family:'Rajdhani',sans-serif; line-height:1.6;
        padding:12px; resize:none; user-select:text; -webkit-user-select:text;
        display:block; box-sizing:border-box; }

    .swgt-quicklinks .swgt-body { padding:10px; }
    .swgt-ql-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:6px; }
    .swgt-ql-link { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
        border-radius:8px; padding:8px 10px; cursor:pointer; transition:.2s;
        display:flex; align-items:center; gap:8px; font-size:12px; color:#e8eaf6;
        white-space:nowrap; overflow:hidden; }
    .swgt-ql-link:hover { background:rgba(108,143,255,0.15); border-color:rgba(108,143,255,0.3); }
    .swgt-ql-link img { width:16px; height:16px; border-radius:3px; flex-shrink:0; }

    .swgt-countdown .swgt-body { padding:14px 18px; text-align:center; }
    .swgt-cd-label { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(232,234,246,0.35); margin-bottom:10px; }
    .swgt-cd-grid { display:flex; gap:8px; justify-content:center; }
    .swgt-cd-unit { display:flex; flex-direction:column; align-items:center; gap:2px; }
    .swgt-cd-num { font-family:'Orbitron',monospace; font-size:24px; font-weight:700; color:#e8eaf6; line-height:1; }
    .swgt-cd-lbl { font-size:9px; letter-spacing:1px; text-transform:uppercase; color:rgba(232,234,246,0.35); }
    .swgt-cd-sep { font-family:'Orbitron',monospace; font-size:24px; color:rgba(232,234,246,0.2); line-height:1; align-self:flex-start; padding-top:2px; }
    .swgt-cd-done { font-size:14px; color:#27c93f; padding:10px 0; }

    .swgt-search .swgt-body { padding:12px; }
    .swgt-search-form { display:flex; gap:8px; }
    .swgt-search-input { flex:1; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12);
        color:#e8eaf6; padding:9px 12px; border-radius:8px; font-size:13px;
        font-family:'Rajdhani',sans-serif; outline:none; }
    .swgt-search-input:focus { border-color:rgba(108,143,255,0.5); background:rgba(108,143,255,0.08); }
    .swgt-search-btn { background:#6c8fff; border:none; color:#fff; padding:9px 14px;
        border-radius:8px; cursor:pointer; font-size:14px; transition:.15s; }
    .swgt-search-btn:hover { background:#8aa3ff; }
    .swgt-search-engines { display:flex; gap:6px; margin-top:8px; flex-wrap:wrap; }
    .swgt-search-eng { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
        color:rgba(232,234,246,0.5); padding:4px 10px; border-radius:6px; font-size:11px;
        cursor:pointer; font-family:'Rajdhani',sans-serif; transition:.15s; }
    .swgt-search-eng:hover, .swgt-search-eng.active { background:rgba(108,143,255,0.15); color:#e8eaf6; border-color:rgba(108,143,255,0.3); }

    .swgt-quote .swgt-body { padding:16px 18px; }
    .swgt-quote-text { font-size:14px; color:#e8eaf6; line-height:1.6; font-style:italic; margin-bottom:10px; }
    .swgt-quote-author { font-size:11px; color:rgba(232,234,246,0.4); letter-spacing:1px; text-align:right; }
    .swgt-quote-refresh { background:transparent; border:1px solid rgba(255,255,255,0.1); color:rgba(232,234,246,0.4);
        padding:5px 10px; border-radius:6px; cursor:pointer; font-size:11px; margin-top:8px;
        font-family:'Rajdhani',sans-serif; transition:.15s; }
    .swgt-quote-refresh:hover { color:#e8eaf6; border-color:rgba(255,255,255,0.25); }

    .swgt-stocks .swgt-body { padding:10px 14px; display:flex; flex-direction:column; gap:8px; }
    .swgt-ticker-row { display:flex; justify-content:space-between; align-items:center;
        padding:6px 8px; background:rgba(255,255,255,0.04); border-radius:6px; }
    .swgt-ticker-sym { font-family:'Orbitron',monospace; font-size:11px; color:#e8eaf6; font-weight:700; }
    .swgt-ticker-price { font-size:14px; color:#e8eaf6; font-weight:600; }
    .swgt-ticker-chg { font-size:11px; } .swgt-up { color:#27c93f; } .swgt-dn { color:#ff5f57; }

    /* ── Window resize handle ──────────────────────────── */
    .win-resize-handle {
        position:absolute; bottom:0; right:0; width:20px; height:20px;
        cursor:se-resize; z-index:10; display:flex; align-items:flex-end; justify-content:flex-end; padding:4px;
    }
    .win-resize-handle svg { width:10px; height:10px; fill:rgba(255,255,255,0.2); }
    .window:hover .win-resize-handle svg { fill:rgba(255,255,255,0.45); }
    .window.maximized .win-resize-handle { display:none; }

    /* ── Sidebar stat rows ─────────────────────────────── */
    .sidebar__icon-box { width:36px; height:36px; background:rgba(108,143,255,0.15); border-radius:8px;
        display:flex; align-items:center; justify-content:center; color:#6c8fff; font-size:16px; flex-shrink:0; }
    .sidebar__stat-row { display:flex; justify-content:space-between; align-items:center;
        padding:6px 2px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:12px; }
    .sidebar__stat-row:last-child { border-bottom:none; }
    .sidebar__stat-label { color:rgba(232,234,246,0.4); }
    .sidebar__stat-val { color:#e8eaf6; font-weight:600; font-family:'Orbitron',monospace; font-size:11px; }
    `;
    document.head.appendChild(style);

    /* Panel HTML */
    var bd = document.createElement('div');
    bd.id = 'silly-widget-panel-backdrop';
    bd.innerHTML = `
    <div id="silly-widget-panel">
        <header>
            <h2><span>⊞</span> Widget Editor</h2>
            <button id="swp-close">✕</button>
        </header>
        <div class="swp-body">
            <div>
                <div class="swp-section-title">Add a Widget</div>
                <div class="swp-catalog" id="swp-catalog"></div>
            </div>
            <div>
                <div class="swp-section-title">Active Widgets</div>
                <div class="swp-active-list" id="swp-active"></div>
            </div>
        </div>
    </div>`;
    document.body.appendChild(bd);
    bd.addEventListener('click', function(e){ if(e.target===bd) closeWidgetEditor(); });
    document.getElementById('swp-close').addEventListener('click', closeWidgetEditor);

    renderWidgets();
    _refreshWidgetPanel();
    _startSidebarStats();
}

function openWidgetEditor() {
    _refreshWidgetPanel();
    document.getElementById('silly-widget-panel-backdrop').classList.add('open');
}
function closeWidgetEditor() {
    document.getElementById('silly-widget-panel-backdrop').classList.remove('open');
}
window.openWidgetEditor = openWidgetEditor;

function _refreshWidgetPanel() {
    var cat = document.getElementById('swp-catalog');
    var active = document.getElementById('swp-active');
    if(!cat || !active) return;

    cat.innerHTML = '';
    WIDGET_DEFS.forEach(function(def) {
        var div = document.createElement('div');
        div.className = 'swp-catalog-item';
        div.innerHTML = '<div class="swp-cat-icon" style="background:'+def.bg+'" >'+def.emoji+'</div>' +
            '<div class="swp-cat-info"><strong>'+def.label+'</strong><small>'+def.desc+'</small></div>';
        div.onclick = function(){ _addWidget(def.type); };
        cat.appendChild(div);
    });

    active.innerHTML = '';
    if(!_widgetInstances.length) {
        active.innerHTML = '<div class="swp-empty">No widgets active — click one above to add it.</div>';
        return;
    }
    _widgetInstances.forEach(function(wi, idx) {
        var def = WIDGET_DEFS.find(function(d){return d.type===wi.type;}) || {label:wi.type, emoji:'📦'};
        var row = document.createElement('div');
        row.className = 'swp-active-row';
        row.innerHTML = '<span class="swp-row-name">'+def.emoji+' '+def.label+'</span>' +
            '<div class="swp-row-btns">' +
            '<button class="swp-cfg-btn" onclick="_openWidgetCfgById(\''+wi.id+'\')">⚙ Config</button>' +
            '<button class="swp-remove-btn" onclick="_removeWidget('+idx+')">Remove</button>' +
            '</div>';
        active.appendChild(row);
    });
}

function _addWidget(type) {
    var id = 'w' + Date.now();
    var offset = (_widgetInstances.length % 8) * 24;
    var cfg = {};
    if(type==='weather') cfg.location = 'London';
    if(type==='countdown') { cfg.label='New Year'; cfg.date='2026-01-01'; }
    if(type==='quicklinks') cfg.links = [{label:'Google',url:'https://google.com'},{label:'YouTube',url:'https://youtube.com'},{label:'GitHub',url:'https://github.com'},{label:'Reddit',url:'https://reddit.com'}];
    if(type==='search') cfg.engine = 'google';
    if(type==='notes') cfg.fontSize = 13;
    if(type==='clock') cfg.use24 = false;
    _widgetInstances.push({type:type, id:id, x:140+offset, y:120+offset, w:null, h:null, cfg:cfg});
    _saveWidgets();
    renderWidgets();
    _refreshWidgetPanel();
    closeWidgetEditor();
}

function _removeWidget(idx) {
    var wi = _widgetInstances[idx];
    if(wi) { var el = document.getElementById('swgt-'+wi.id); if(el) el.remove(); }
    _widgetInstances.splice(idx,1);
    _saveWidgets();
    _refreshWidgetPanel();
}
window._removeWidget = _removeWidget;

window._removeWidgetById = function(id) {
    var idx = _widgetInstances.findIndex(function(w){return w.id===id;});
    if(idx>-1) _removeWidget(idx);
};

window._openWidgetCfgById = function(id) {
    var el = document.getElementById('swgt-'+id);
    if(!el) return;
    var pop = el.querySelector('.swgt-cfg-popover');
    if(pop) { pop.classList.toggle('open'); }
    closeWidgetEditor();
};

function renderWidgets() {
    document.querySelectorAll('.silly-desk-widget').forEach(function(w){w.remove();});
    _widgetInstances.forEach(function(wi){ _createWidget(wi); });
}

function _createWidget(wi) {
    var def = WIDGET_DEFS.find(function(d){return d.type===wi.type;}) || {label:wi.type, emoji:'📦'};
    var el = document.createElement('div');
    el.className = 'silly-desk-widget swgt-' + wi.type;
    el.id = 'swgt-' + wi.id;
    el.style.left = (wi.x||140)+'px';
    el.style.top  = (wi.y||120)+'px';
    if(wi.w) el.style.width  = wi.w+'px';
    if(wi.h) el.style.height = wi.h+'px';

    var cfg = wi.cfg || {};
    var bodyHTML = _buildWidgetBody(wi);
    var cfgHTML  = _buildWidgetCfg(wi);

    el.innerHTML =
        '<div class="swgt-shell" onmousedown="_widgetDragStart(event,\''+wi.id+'\')" oncontextmenu="_widgetCtx(event,\''+wi.id+'\')">' +
        '<div class="swgt-body">'+bodyHTML+'</div>'+
        '</div>'+
        cfgHTML +
        '<div class="swgt-resize" onmousedown="_widgetResizeStart(event,\''+wi.id+'\')" title="Resize">'+
            '<svg viewBox="0 0 10 10"><path d="M2 10 L10 10 L10 2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'+
        '</div>';

    document.body.appendChild(el);

    // Init per-type behaviour
    if(wi.type==='clock')   _startClockWidget(wi);
    if(wi.type==='sysmon')  _startSysmon(wi.id);
    if(wi.type==='weather') _fetchWeather(wi);
    if(wi.type==='countdown') _startCountdown(wi);
    if(wi.type==='stocks')  _fetchStocks(wi.id);
    if(wi.type==='quote')   _fetchQuote(wi.id);
    if(wi.type==='notes') {
        var ta = el.querySelector('textarea');
        if(ta) {
            ta.value = wi.cfg && wi.cfg.notes ? wi.cfg.notes : (localStorage.getItem('silly_note_'+wi.id)||'');
            ta.style.fontSize = ((wi.cfg&&wi.cfg.fontSize)||13)+'px';
            ta.style.height = (wi.h ? wi.h-30-20 : 100)+'px';
            ta.addEventListener('input', function(){
                localStorage.setItem('silly_note_'+wi.id, ta.value);
                var w = _widgetInstances.find(function(w){return w.id===wi.id;});
                if(w){ if(!w.cfg) w.cfg={}; w.cfg.notes=ta.value; _saveWidgets(); }
            });
            ta.addEventListener('mousedown', function(e){e.stopPropagation();});
        }
    }
    if(wi.type==='search') {
        var inp = el.querySelector('.swgt-search-input');
        if(inp) inp.addEventListener('mousedown',function(e){e.stopPropagation();});
        // mark active engine
        var eng = (wi.cfg&&wi.cfg.engine)||'google';
        el.querySelectorAll('.swgt-search-eng').forEach(function(b){
            if(b.dataset.eng===eng) b.classList.add('active');
        });
    }
    if(wi.type==='quicklinks') _renderQuickLinks(wi);
}

window._toggleWgtCfg = function(btn) {
    var shell = btn.closest('.silly-desk-widget');
    if(!shell) return;
    var pop = shell.querySelector('.swgt-cfg-popover');
    if(pop) pop.classList.toggle('open');
};

/* ── Widget right-click context menu ─────────────────────── */
(function() {
    var menu = document.createElement('div');
    menu.id = 'swgt-ctx-menu';
    menu.style.cssText = 'display:none;position:fixed;z-index:9700;background:rgba(10,12,24,0.97);' +
        'border:1px solid rgba(255,255,255,0.12);border-radius:10px;' +
        'box-shadow:0 12px 32px rgba(0,0,0,0.7);padding:6px;min-width:170px;';
    menu.innerHTML =
        '<div id="swgt-ctx-label" style="padding:8px 12px 6px;font-size:10px;letter-spacing:2px;' +
            'text-transform:uppercase;color:rgba(232,234,246,0.35);font-family:Rajdhani,sans-serif;border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:4px;"></div>' +
        '<button id="swgt-ctx-cfg"    style="' + _wgtCtxBtnStyle() + '">⚙  Settings</button>' +
        '<button id="swgt-ctx-remove" style="' + _wgtCtxBtnStyle('#ff5f57') + '">✕  Remove Widget</button>';
    document.body.appendChild(menu);

    var _ctxId = null;

    window._widgetCtx = function(e, id) {
        e.preventDefault(); e.stopPropagation();
        _ctxId = id;
        var wi = _widgetInstances.find(function(w){ return w.id === id; });
        var def = wi ? (WIDGET_DEFS.find(function(d){ return d.type === wi.type; }) || {label: wi.type, emoji:'📦'}) : {label:'Widget',emoji:'📦'};
        document.getElementById('swgt-ctx-label').textContent = def.emoji + '  ' + def.label;
        menu.style.display = 'block';
        // Position near cursor, keep on screen
        var mx = Math.min(e.clientX, window.innerWidth  - 180);
        var my = Math.min(e.clientY, window.innerHeight - 100);
        menu.style.left = mx + 'px';
        menu.style.top  = my + 'px';
    };

    document.getElementById('swgt-ctx-cfg').onclick = function() {
        if(!_ctxId) return;
        var el = document.getElementById('swgt-' + _ctxId);
        if(el) { var pop = el.querySelector('.swgt-cfg-popover'); if(pop) pop.classList.toggle('open'); }
        menu.style.display = 'none';
    };
    document.getElementById('swgt-ctx-remove').onclick = function() {
        if(_ctxId) _removeWidgetById(_ctxId);
        menu.style.display = 'none';
    };

    document.addEventListener('click', function() { menu.style.display = 'none'; });
    document.addEventListener('keydown', function(e) { if(e.key==='Escape') menu.style.display='none'; });
})();

function _wgtCtxBtnStyle(color) {
    return 'display:block;width:100%;background:transparent;border:none;padding:9px 14px;' +
        'border-radius:6px;cursor:pointer;font-size:13px;color:' + (color||'rgba(232,234,246,0.75)') + ';' +
        'font-family:Rajdhani,sans-serif;text-align:left;transition:background .15s;';
}

/* close all cfg popovers on outside click */
document.addEventListener('click', function(e){
    if(!e.target.closest('.swgt-cfg-popover') && !e.target.matches('.swgt-icon-btn')) {
        document.querySelectorAll('.swgt-cfg-popover.open').forEach(function(p){ p.classList.remove('open'); });
    }
});

/* ── Widget body builders ────────────────────────────────── */
function _buildWidgetBody(wi) {
    var cfg = wi.cfg || {};
    var id  = wi.id;
    if(wi.type==='clock') {
        return '<div style="padding:16px 22px;text-align:center">'+
            '<div style="display:flex;align-items:baseline;justify-content:center;gap:2px">'+
            '<span class="swgt-clock-time" id="swgt-ct-'+id+'">--:--</span>'+
            '<span class="swgt-clock-secs" id="swgt-cs-'+id+'">:--</span>'+
            '</div>'+
            '<div class="swgt-clock-date" id="swgt-cd-'+id+'">---</div></div>';
    }
    if(wi.type==='calendar') {
        return _buildCalBody(id);
    }
    if(wi.type==='weather') {
        return '<div style="padding:16px 20px">'+
            '<div class="swgt-weather-top">'+
            '<div class="swgt-weather-icon" id="swgt-wi-'+id+'">⛅</div>'+
            '<div class="swgt-weather-right">'+
            '<div><span class="swgt-weather-temp" id="swgt-wt-'+id+'">--</span><span class="swgt-weather-unit">°</span></div>'+
            '<div class="swgt-weather-cond" id="swgt-wc-'+id+'">Loading...</div></div></div>'+
            '<div class="swgt-weather-loc" id="swgt-wl-'+id+'">'+((cfg.location)||'London').toUpperCase()+'</div>'+
            '<div class="swgt-weather-details">'+
            '<div class="swgt-weather-detail"><span>WIND</span><span id="swgt-ww-'+id+'">--</span></div>'+
            '<div class="swgt-weather-detail"><span>HUM</span><span id="swgt-wh-'+id+'">--</span></div>'+
            '<div class="swgt-weather-detail"><span>FEELS</span><span id="swgt-wf-'+id+'">--</span></div>'+
            '</div></div>';
    }
    if(wi.type==='sysmon') {
        return '<div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px">'+
            ['CPU','RAM','NET'].map(function(lbl,i){
                var fid=['swgt-cpu-','swgt-ram-','swgt-net-'][i]+id;
                var pid=['swgt-cpup-','swgt-ramp-','swgt-netp-'][i]+id;
                var cls=i===1?'warn':'';
                var w=i===0?'30':i===1?'55':'75';
                return '<div class="swgt-mon-row">'+
                    '<div class="swgt-mon-hd"><span class="swgt-mon-lbl">'+lbl+'</span><span class="swgt-mon-pct" id="'+pid+'">'+w+'%</span></div>'+
                    '<div class="swgt-mon-bar"><div class="swgt-mon-fill '+cls+'" id="'+fid+'" style="width:'+w+'%"></div></div></div>';
            }).join('')+'</div>';
    }
    if(wi.type==='notes') {
        return '<textarea placeholder="Type a note..."></textarea>';
    }
    if(wi.type==='quicklinks') {
        return '<div style="padding:10px"><div class="swgt-ql-grid" id="swgt-ql-'+id+'"></div></div>';
    }
    if(wi.type==='countdown') {
        return '<div style="padding:14px 18px;text-align:center">'+
            '<div class="swgt-cd-label" id="swgt-cdlbl-'+id+'">'+((cfg.label)||'Countdown')+'</div>'+
            '<div class="swgt-cd-grid" id="swgt-cd-'+id+'">' +
            ['D','H','M','S'].map(function(u,i){ return '<div class="swgt-cd-unit"><div class="swgt-cd-num" id="swgt-cd'+u+'-'+id+'">--</div><div class="swgt-cd-lbl">'+['DAYS','HRS','MIN','SEC'][i]+'</div></div>'+(i<3?'<div class="swgt-cd-sep">:</div>':''); }).join('')+
            '</div></div>';
    }
    if(wi.type==='search') {
        var engines = {google:'Google',bing:'Bing',ddg:'DuckDuckGo'};
        return '<div style="padding:12px">'+
            '<div class="swgt-search-form">'+
            '<input class="swgt-search-input" placeholder="Search..." id="swgt-si-'+id+'" onkeydown="_wgtSearchKey(event,\''+id+'\')" />'+
            '<button class="swgt-search-btn" onclick="_wgtSearch(\''+id+'\')" title="Search">🔍</button>'+
            '</div>'+
            '<div class="swgt-search-engines">'+
            Object.keys(engines).map(function(k){ return '<span class="swgt-search-eng" data-eng="'+k+'" onclick="_wgtSetEngine(this,\''+id+'\')" >'+engines[k]+'</span>'; }).join('')+
            '</div></div>';
    }
    if(wi.type==='quote') {
        return '<div style="padding:16px 18px">'+
            '<div class="swgt-quote-text" id="swgt-qt-'+id+'">Loading quote...</div>'+
            '<div class="swgt-quote-author" id="swgt-qa-'+id+'"></div>'+
            '<button class="swgt-quote-refresh" onclick="_fetchQuote(\''+id+'\')">↻ New Quote</button>'+
            '</div>';
    }
    if(wi.type==='stocks') {
        return '<div style="padding:10px 14px;display:flex;flex-direction:column;gap:8px" id="swgt-tck-'+id+'">'+
            '<div style="color:rgba(232,234,246,0.35);font-size:12px;text-align:center">Loading...</div></div>';
    }
    return '';
}

function _buildCalBody(id) {
    var now=new Date(), y=now.getFullYear(), m=now.getMonth();
    return _renderCalMonth(id, y, m);
}
function _renderCalMonth(id, y, m) {
    var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var today=new Date(), ty=today.getFullYear(), tm=today.getMonth(), td=today.getDate();
    var first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
    var lastDays=new Date(y,m,0).getDate();
    var g='<div style="padding:12px 14px">'+
        '<div class="swgt-cal-month">'+
        '<button class="swgt-cal-nav" onclick="_calNav(\''+id+'\',-1)">‹</button>'+
        MONTHS[m]+' '+y+
        '<button class="swgt-cal-nav" onclick="_calNav(\''+id+'\',1)">›</button>'+
        '</div><div class="swgt-cal-grid">';
    ['S','M','T','W','T','F','S'].forEach(function(d){g+='<span class="swgt-cal-hd">'+d+'</span>';});
    for(var i=0;i<first;i++) g+='<span class="swgt-cal-other">'+(lastDays-first+1+i)+'</span>';
    for(var d=1;d<=days;d++) {
        var isToday=(d===td&&m===tm&&y===ty);
        g+='<span'+(isToday?' class="swgt-cal-today"':'')+'>'+d+'</span>';
    }
    var trailing=42-(first+days);
    for(var t=1;t<=trailing;t++) g+='<span class="swgt-cal-other">'+t+'</span>';
    return g+'</div></div>';
}
window._calNav = function(id, dir) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return;
    if(!wi._calY) { var now=new Date(); wi._calY=now.getFullYear(); wi._calM=now.getMonth(); }
    wi._calM += dir;
    if(wi._calM<0){wi._calM=11;wi._calY--;}
    if(wi._calM>11){wi._calM=0;wi._calY++;}
    var body = document.querySelector('#swgt-'+id+' .swgt-body');
    if(body) body.innerHTML = _renderCalMonth(id, wi._calY, wi._calM);
};

/* ── Per-widget config panels ────────────────────────────── */
function _buildWidgetCfg(wi) {
    var cfg = wi.cfg || {};
    var id  = wi.id;
    var rows = '';
    if(wi.type==='weather') {
        rows = '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">City / Location</label>'+
            '<input class="swgt-cfg-input" id="swgt-cfgi-'+id+'" value="'+(cfg.location||'London')+'" placeholder="e.g. New York">'+
            '</div><div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Units</label>'+
            '<select class="swgt-cfg-select" id="swgt-cfgu-'+id+'">'+
            '<option value="celsius" '+(cfg.units==='celsius'?'selected':'')+'>Celsius (°C)</option>'+
            '<option value="fahrenheit" '+(cfg.units==='fahrenheit'?'selected':'')+'>Fahrenheit (°F)</option>'+
            '</select></div>'+
            '<button class="swgt-cfg-btn-apply" onclick="_applyWeatherCfg(\''+id+'\')">Apply</button>';
    } else if(wi.type==='clock') {
        rows = '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Format</label>'+
            '<select class="swgt-cfg-select" id="swgt-cfgi-'+id+'">'+
            '<option value="12" '+(cfg.use24?'':'selected')+'>12-hour (AM/PM)</option>'+
            '<option value="24" '+(cfg.use24?'selected':'')+'>24-hour</option>'+
            '</select></div>'+
            '<button class="swgt-cfg-btn-apply" onclick="_applyClockCfg(\''+id+'\')">Apply</button>';
    } else if(wi.type==='countdown') {
        rows = '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Label</label>'+
            '<input class="swgt-cfg-input" id="swgt-cfgl-'+id+'" value="'+(cfg.label||'Countdown')+'"></div>'+
            '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Target Date</label>'+
            '<input class="swgt-cfg-input" type="date" id="swgt-cfgi-'+id+'" value="'+(cfg.date||'')+'"></div>'+
            '<button class="swgt-cfg-btn-apply" onclick="_applyCdCfg(\''+id+'\')">Apply</button>';
    } else if(wi.type==='notes') {
        rows = '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Font Size</label>'+
            '<input class="swgt-cfg-input" type="number" id="swgt-cfgi-'+id+'" value="'+(cfg.fontSize||13)+'" min="10" max="22">'+
            '</div>'+
            '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Background</label>'+
            '<input class="swgt-cfg-input" id="swgt-cfgb-'+id+'" value="'+(cfg.bg||'rgba(10,12,24,0.9)')+'" placeholder="CSS color"></div>'+
            '<button class="swgt-cfg-btn-apply" onclick="_applyNotesCfg(\''+id+'\')">Apply</button>';
    } else if(wi.type==='quicklinks') {
        rows = '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Links (label|url, one per line)</label>'+
            '<textarea class="swgt-cfg-input" id="swgt-cfgi-'+id+'" rows="5" style="height:auto;resize:vertical" onmousedown="event.stopPropagation()">'+
            (cfg.links||[]).map(function(l){return l.label+'|'+l.url;}).join('\
')+
            '</textarea></div>'+
            '<button class="swgt-cfg-btn-apply" onclick="_applyLinksCfg(\''+id+'\')">Apply</button>';
    } else if(wi.type==='search') {
        rows = '<div class="swgt-cfg-row"><label class="swgt-cfg-lbl">Default Engine</label>'+
            '<select class="swgt-cfg-select" id="swgt-cfgi-'+id+'">'+
            '<option value="google">Google</option><option value="bing">Bing</option><option value="ddg">DuckDuckGo</option>'+
            '</select></div>'+
            '<button class="swgt-cfg-btn-apply" onclick="_applySearchCfg(\''+id+'\')">Apply</button>';
    } else {
        rows = '<div style="color:rgba(232,234,246,0.35);font-size:12px">No settings for this widget.</div>';
    }
    return '<div class="swgt-cfg-popover" onmousedown="event.stopPropagation()">'+rows+'</div>';
}

/* ── Config apply handlers ───────────────────────────────── */
window._applyWeatherCfg = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return;
    if(!wi.cfg) wi.cfg={};
    var inp = document.getElementById('swgt-cfgi-'+id);
    var unit = document.getElementById('swgt-cfgu-'+id);
    if(inp) wi.cfg.location = inp.value.trim() || 'London';
    if(unit) wi.cfg.units = unit.value;
    _saveWidgets();
    _fetchWeather(wi);
    var loc = document.getElementById('swgt-wl-'+id);
    if(loc) loc.textContent = wi.cfg.location.toUpperCase();
    document.querySelector('#swgt-'+id+' .swgt-cfg-popover').classList.remove('open');
};
window._applyClockCfg = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return;
    if(!wi.cfg) wi.cfg={};
    var sel = document.getElementById('swgt-cfgi-'+id);
    if(sel) wi.cfg.use24 = sel.value==='24';
    _saveWidgets();
    document.querySelector('#swgt-'+id+' .swgt-cfg-popover').classList.remove('open');
};
window._applyCdCfg = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return; if(!wi.cfg) wi.cfg={};
    var lbl=document.getElementById('swgt-cfgl-'+id);
    var inp=document.getElementById('swgt-cfgi-'+id);
    if(lbl) wi.cfg.label=lbl.value;
    if(inp) wi.cfg.date=inp.value;
    _saveWidgets();
    var lb=document.getElementById('swgt-cdlbl-'+id); if(lb) lb.textContent=wi.cfg.label;
    document.querySelector('#swgt-'+id+' .swgt-cfg-popover').classList.remove('open');
};
window._applyNotesCfg = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return; if(!wi.cfg) wi.cfg={};
    var fz=document.getElementById('swgt-cfgi-'+id);
    var bg=document.getElementById('swgt-cfgb-'+id);
    if(fz) wi.cfg.fontSize=parseInt(fz.value)||13;
    if(bg) wi.cfg.bg=bg.value;
    _saveWidgets();
    var ta=document.querySelector('#swgt-'+id+' textarea'); if(ta) ta.style.fontSize=wi.cfg.fontSize+'px';
    var body=document.querySelector('#swgt-'+id+' .swgt-body'); if(body&&wi.cfg.bg) body.style.background=wi.cfg.bg;
    document.querySelector('#swgt-'+id+' .swgt-cfg-popover').classList.remove('open');
};
window._applyLinksCfg = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return; if(!wi.cfg) wi.cfg={};
    var ta=document.getElementById('swgt-cfgi-'+id);
    if(!ta) return;
    wi.cfg.links = ta.value.split('\
').filter(Boolean).map(function(l){
        var p=l.split('|'); return {label:p[0]||'Link', url:p[1]||'https://'};
    });
    _saveWidgets();
    _renderQuickLinks(wi);
    document.querySelector('#swgt-'+id+' .swgt-cfg-popover').classList.remove('open');
};
window._applySearchCfg = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return; if(!wi.cfg) wi.cfg={};
    var sel=document.getElementById('swgt-cfgi-'+id);
    if(sel) wi.cfg.engine=sel.value;
    _saveWidgets();
    document.querySelector('#swgt-'+id+' .swgt-cfg-popover').classList.remove('open');
};

/* ── Quick links ─────────────────────────────────────────── */
function _renderQuickLinks(wi) {
    var grid = document.getElementById('swgt-ql-'+wi.id);
    if(!grid) return;
    var links = (wi.cfg&&wi.cfg.links)||[];
    if(!links.length) { grid.innerHTML='<div style="color:rgba(232,234,246,0.3);font-size:12px;text-align:center;padding:8px">Open ⚙ to add links</div>'; return; }
    grid.innerHTML = links.map(function(l){
        var domain = l.url.replace(/https?:\\/\\//,'').split('/')[0];
        var icon = 'https://www.google.com/s2/favicons?domain='+domain+'&sz=32';
        return '<div class="swgt-ql-link" onclick="_wgtOpenLink(\''+l.url+'\')"><img src="'+icon+'" onerror="this.style.display=\'none\'"><span>'+l.label+'</span></div>';
    }).join('');
}
window._wgtOpenLink = function(url) {
    if(typeof toggleApp==='function' && APPS && APPS.web) { toggleApp('web'); } else { window.open(url,'_blank'); }
};

/* ── Search widget ───────────────────────────────────────── */
window._wgtSearchKey = function(e,id) { if(e.key==='Enter') _wgtSearch(id); };
window._wgtSearch = function(id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    var eng = (wi&&wi.cfg&&wi.cfg.engine)||'google';
    var q = document.getElementById('swgt-si-'+id);
    if(!q||!q.value.trim()) return;
    var urls = {
        google: 'https://google.com/search?q=',
        bing:   'https://bing.com/search?q=',
        ddg:    'https://duckduckgo.com/?q='
    };
    var url = (urls[eng]||urls.google) + encodeURIComponent(q.value);
    _wgtOpenLink(url);
};
window._wgtSetEngine = function(btn,id) {
    var wi = _widgetInstances.find(function(w){return w.id===id;});
    if(!wi) return; if(!wi.cfg) wi.cfg={};
    wi.cfg.engine = btn.dataset.eng;
    _saveWidgets();
    btn.closest('.swgt-search-engines').querySelectorAll('.swgt-search-eng').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
};

/* ── Clock tick ──────────────────────────────────────────── */
function _startClockWidget(wi) {
    var id = wi.id;
    function tick() {
        var t=document.getElementById('swgt-ct-'+id);
        var s=document.getElementById('swgt-cs-'+id);
        var d=document.getElementById('swgt-cd-'+id);
        if(!t) return;
        var now=new Date();
        var wii=_widgetInstances.find(function(w){return w.id===id;});
        var use24=wii&&wii.cfg&&wii.cfg.use24;
        var h=now.getHours(), min=now.getMinutes(), sec=now.getSeconds();
        var disp=use24?h:(h%12||12);
        var ampm=use24?'':(h>=12?' PM':' AM');
        t.textContent = disp+':'+(min<10?'0'+min:min)+ampm;
        if(s) s.textContent = ':'+(sec<10?'0'+sec:sec);
        if(d) {
            var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var MONS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            d.textContent = DAYS[now.getDay()]+', '+MONS[now.getMonth()]+' '+now.getDate()+' '+now.getFullYear();
        }
    }
    tick(); setInterval(tick,1000);
}

/* ── Sysmon ticks ────────────────────────────────────────── */
function _startSysmon(id) {
    function update() {
        var cv=Math.round(15+Math.random()*70), rv=Math.round(40+Math.random()*45), nv=Math.round(5+Math.random()*90);
        ['cpu','ram','net'].forEach(function(k,i){
            var v=[cv,rv,nv][i];
            var bar=document.getElementById('swgt-'+k+'-'+id);
            var pct=document.getElementById('swgt-'+k+'p-'+id);
            if(bar){ bar.style.width=v+'%'; bar.className='swgt-mon-fill'+(v>80?' crit':v>60?' warn':''); }
            if(pct) pct.textContent=v+'%';
        });
    }
    update(); setInterval(update,2000);
}

/* ── Weather fetch ───────────────────────────────────────── */
function _fetchWeather(wi) {
    var id=wi.id, cfg=wi.cfg||{}, loc=cfg.location||'London', units=cfg.units||'celsius';
    var wthrEl=document.getElementById('swgt-wc-'+id);
    if(wthrEl) wthrEl.textContent='Loading...';
    fetch('https://wttr.in/'+encodeURIComponent(loc)+'?format=j1')
        .then(function(r){return r.json();})
        .then(function(d){
            var cc=d.current_condition&&d.current_condition[0];
            if(!cc) return;
            var temp = units==='fahrenheit' ? cc.temp_F+'°F' : cc.temp_C+'°C';
            var icon = _weatherEmoji(parseInt(cc.weatherCode||0));
            var cond = cc.weatherDesc&&cc.weatherDesc[0]&&cc.weatherDesc[0].value||'—';
            var wind = cc.windspeedKmph+'km/h';
            var hum  = cc.humidity+'%';
            var feel = units==='fahrenheit' ? cc.FeelsLikeF+'°F' : cc.FeelsLikeC+'°C';
            var t=document.getElementById('swgt-wt-'+id); if(t) t.textContent=(units==='fahrenheit'?cc.temp_F:cc.temp_C);
            var u=document.getElementById('swgt-wt-'+id); // unit shown in HTML
            var ic=document.getElementById('swgt-wi-'+id); if(ic) ic.textContent=icon;
            var c=document.getElementById('swgt-wc-'+id); if(c) c.textContent=cond;
            var w=document.getElementById('swgt-ww-'+id); if(w) w.textContent=wind;
            var h=document.getElementById('swgt-wh-'+id); if(h) h.textContent=hum;
            var f=document.getElementById('swgt-wf-'+id); if(f) f.textContent=feel;
            // Update unit symbol
            var el=document.querySelector('#swgt-'+id+' .swgt-weather-unit');
            if(el) el.textContent=units==='fahrenheit'?'°F':'°C';
        })
        .catch(function(){
            var c=document.getElementById('swgt-wc-'+id); if(c) c.textContent='Check location';
        });
}
function _weatherEmoji(code) {
    if(code<=113) return '☀️';
    if(code<=176) return '⛅';
    if(code<=260) return '🌫️';
    if(code<=296) return '🌦️';
    if(code<=395) return '🌧️';
    return '⛅';
}

/* ── Countdown ───────────────────────────────────────────── */
function _startCountdown(wi) {
    var id=wi.id;
    function tick() {
        var cfg=wi.cfg||{};
        var target=cfg.date?new Date(cfg.date):new Date(new Date().getFullYear()+1,0,1);
        var now=new Date();
        var diff=target-now;
        if(diff<=0) {
            var done=document.getElementById('swgt-cd-'+id);
            if(done) done.innerHTML='<div class="swgt-cd-done">🎉 Done!</div>';
            return;
        }
        var d=Math.floor(diff/864e5), h=Math.floor(diff%864e5/36e5);
        var m=Math.floor(diff%36e5/6e4), s=Math.floor(diff%6e4/1e3);
        [['D',d],['H',h],['M',m],['S',s]].forEach(function(pair){
            var el=document.getElementById('swgt-cd'+pair[0]+'-'+id);
            if(el) el.textContent=String(pair[1]).padStart(2,'0');
        });
    }
    tick(); setInterval(tick,1000);
}

/* ── Quotes ──────────────────────────────────────────────── */
var _QUOTES = [
    {q:'The only way to do great work is to love what you do.',a:'Steve Jobs'},
    {q:'Innovation distinguishes between a leader and a follower.',a:'Steve Jobs'},
    {q:'Stay hungry, stay foolish.',a:'Steve Jobs'},
    {q:'The future belongs to those who believe in the beauty of their dreams.',a:'Eleanor Roosevelt'},
    {q:'It does not matter how slowly you go, as long as you do not stop.',a:'Confucius'},
    {q:'Life is what happens to you while you\'re busy making other plans.',a:'John Lennon'},
    {q:'The way to get started is to quit talking and begin doing.',a:'Walt Disney'},
    {q:'If you are not willing to risk the usual, you will have to settle for the ordinary.',a:'Jim Rohn'},
    {q:'Whether you think you can or you think you can\'t, you are right.',a:'Henry Ford'},
    {q:'Believe you can and you\'re halfway there.',a:'Theodore Roosevelt'},
    {q:'Act as if what you do makes a difference. It does.',a:'William James'},
    {q:'Success is not final, failure is not fatal: it is the courage to continue that counts.',a:'Winston Churchill'},
    {q:'Do what you can, with what you have, where you are.',a:'Theodore Roosevelt'},
    {q:'The secret of getting ahead is getting started.',a:'Mark Twain'},
];
window._fetchQuote = function(id) {
    var q=_QUOTES[Math.floor(Math.random()*_QUOTES.length)];
    var qt=document.getElementById('swgt-qt-'+id); if(qt) qt.textContent='\''+q.q+'\''; 
    var qa=document.getElementById('swgt-qa-'+id); if(qa) qa.textContent='— '+q.a;
};

/* ── Crypto ticker ───────────────────────────────────────── */
function _fetchStocks(id) {
    var container=document.getElementById('swgt-tck-'+id);
    var coins=[{sym:'BTC',name:'Bitcoin'},{sym:'ETH',name:'Ethereum'},{sym:'SOL',name:'Solana'}];
    function mockPrice(base,volatility){ return (base+(Math.random()-0.5)*volatility).toFixed(2); }
    function mockChg(){ return ((Math.random()-0.45)*8).toFixed(2); }
    function render() {
        if(!container) return;
        var prices={BTC:mockPrice(95000,3000),ETH:mockPrice(3200,200),SOL:mockPrice(170,15)};
        container.innerHTML = coins.map(function(c){
            var p=prices[c.sym], chg=mockChg(), up=chg>=0;
            return '<div class="swgt-ticker-row">'+
                '<span class="swgt-ticker-sym">'+c.sym+'</span>'+
                '<div><span class="swgt-ticker-price">$'+parseFloat(p).toLocaleString()+'</span> '+
                '<span class="swgt-ticker-chg '+(up?'swgt-up':'swgt-dn')+'">'+(up?'+':'')+chg+'%</span></div>'+
                '</div>';
        }).join('');
    }
    render(); setInterval(render,10000);
}

/* ── Widget dragging ─────────────────────────────────────── */
var _wgtDrag=null;
function _widgetDragStart(e,id) {
    if(e.target.matches('input,textarea,select,button,.swgt-resize')) return;
    if(e.target.closest('.swgt-cfg-popover')) return;
    e.preventDefault();
    var el=document.getElementById('swgt-'+id);
    if(!el) return;
    _wgtDrag={id:id,el:el,sx:e.clientX,sy:e.clientY,
        ox:parseFloat(el.style.left)||0,oy:parseFloat(el.style.top)||0};
    el.style.zIndex=300;
    // close any open popovers
    document.querySelectorAll('.swgt-cfg-popover.open').forEach(function(p){p.classList.remove('open');});
}
document.addEventListener('mousemove',function(e){
    if(_wgtDrag){
        _wgtDrag.el.style.left=(_wgtDrag.ox+e.clientX-_wgtDrag.sx)+'px';
        _wgtDrag.el.style.top =(_wgtDrag.oy+e.clientY-_wgtDrag.sy)+'px';
    }
    if(_wgtResize){
        var nw=Math.max(180,_wgtResize.sw+(e.clientX-_wgtResize.sx));
        var nh=Math.max(80, _wgtResize.sh+(e.clientY-_wgtResize.sy));
        _wgtResize.el.style.width =nw+'px';
        _wgtResize.el.style.height=nh+'px';
        // Resize textarea inside notes widget
        var ta=_wgtResize.el.querySelector('textarea');
        if(ta) ta.style.height=(nh-30-20)+'px';
    }
});
document.addEventListener('mouseup',function(){
    if(_wgtDrag){
        var wi=_widgetInstances.find(function(w){return w.id===_wgtDrag.id;});
        if(wi){wi.x=parseFloat(_wgtDrag.el.style.left)||0;wi.y=parseFloat(_wgtDrag.el.style.top)||0;_saveWidgets();}
        _wgtDrag.el.style.zIndex=80; _wgtDrag=null;
    }
    if(_wgtResize){
        var wi=_widgetInstances.find(function(w){return w.id===_wgtResize.id;});
        if(wi){wi.w=parseFloat(_wgtResize.el.style.width)||null;wi.h=parseFloat(_wgtResize.el.style.height)||null;_saveWidgets();}
        _wgtResize=null;
    }
});

/* ── Widget resizing ─────────────────────────────────────── */
var _wgtResize=null;
window._widgetResizeStart=function(e,id){
    e.preventDefault(); e.stopPropagation();
    var el=document.getElementById('swgt-'+id);
    if(!el) return;
    _wgtResize={id:id,el:el,sx:e.clientX,sy:e.clientY,
        sw:el.offsetWidth,sh:el.offsetHeight};
};

/* ── Sidebar stats updater ───────────────────────────────── */
function _startSidebarStats() {
    var startTime=Date.now();
    setInterval(function(){
        var upEl=document.getElementById('sb-uptime');
        if(upEl){
            var min=Math.floor((Date.now()-startTime)/60000);
            upEl.textContent=min<60?min+'m':Math.floor(min/60)+'h '+min%60+'m';
        }
        var wc=document.getElementById('sb-wincount');
        if(wc) wc.textContent=document.querySelectorAll('.window.active:not(.minimized)').length;
        var wgt=document.getElementById('sb-wgtcount');
        if(wgt) wgt.textContent=_widgetInstances.length;
        var lbl=document.getElementById('sb-wgtcount-label');
        if(lbl) lbl.textContent=_widgetInstances.length+' active';
    },5000);
}

/* ── FULLSCREEN MESSAGE HANDLER ─────────────────────────────
   Minecraft (and any app) can postMessage to request fullscreen
   on its iframe, bypassing nested-iframe restrictions.
   ─────────────────────────────────────────────────────────── */
window.addEventListener('message', function(e) {
    if (!e.data || e.data.action !== 'sillyos_fullscreen') return;
    var id = e.data.id || '';
    var frame = document.getElementById('frame-' + id);
    if (!frame) return;
    try {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            var req = frame.requestFullscreen || frame.webkitRequestFullscreen || frame.mozRequestFullScreen;
            if (req) req.call(frame);
        } else {
            var ex = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
            if (ex) ex.call(document);
        }
    } catch(err) { console.warn('SillyOS fullscreen error:', err); }
});
