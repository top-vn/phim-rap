const APP_CONFIG = {
    apkUrl: "https://github.com/top-vn/phim-rap/releases/download/1.3.4/phimchieurap-STABLE-1.3.4.apk",
    adsUrl: "https://omg10.com/4/10620537", // monetag.js
};


function openPlayStoreArticle(t, i, asPlay) {

    if (t == null || i == null) {
        const params = new URLSearchParams(window.location.search);
        if (t == null) { t = params.get("t"); } 
        if (i == null) { i = params.get("id"); }
    }

    let playStoreDeepLink = "shortdramas://videoinfo";
    const query = new URLSearchParams();
    if (t) { query.set("t", t); }
    if (i) { query.set("id", i); }
    if (query.toString()) {
        playStoreDeepLink += "?" + query.toString();
    }
    var playStoreWeb = APP_CONFIG.apkUrl;
    var playAdsWeb = APP_CONFIG.adsUrl;

    var ua = navigator.userAgent || navigator.vendor || window.opera;

    // Detect Android
    if (/android/i.test(ua)) {
        window.location.href = playStoreDeepLink;

        // fallback
        setTimeout(function() {
            window.location.href = playStoreWeb;
        }, 1500);

    } else {
        // non-android → open web
        if (asPlay) {
            window.location.href = playAdsWeb;
        } else {
            window.location.href = playStoreWeb;
        }
    }
};

function openPlayStore() {

    const params = new URLSearchParams(window.location.search);
    const t = params.get("t");
    const i = params.get("id");

    let playStoreDeepLink = "shortdramas://videoinfo";
    const query = new URLSearchParams();
    if (t) { query.set("t", t); }
    if (i) { query.set("id", i); }
    if (query.toString()) {
        playStoreDeepLink += "?" + query.toString();
    }
    var playStoreWeb = APP_CONFIG.apkUrl;

    var ua = navigator.userAgent || navigator.vendor || window.opera;

    // var isAndroid = /android/i.test(ua);

    // Detect Android
    if (/android/i.test(ua)) {
        window.location.href = playStoreDeepLink;

        // fallback
        setTimeout(function(){
            window.location.href = playStoreWeb;
        }, 1500);

    } else {
        // non-android → open web
        window.location.href = playStoreWeb;
    }
};

function downloadApk() {

    var playStoreWeb = APP_CONFIG.apkUrl;

    window.location.href = playStoreWeb;
};

function joinTelegram() {
    var teleUrl = "https://t.me/xemnaynee";

    window.location.href = teleUrl;
};

function openSongHyLamNguy(asPlay) {
    var s = true;
    if (asPlay == null) {
        s = true;
    } else {
        s = asPlay;
    }
    openPlayStoreArticle('g', 'song-hy-lam-nguy', s);
};