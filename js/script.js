"use strict";
// script.ts
// Hành vi tương tác cho trang blog: chia sẻ mạng xã hội, sao chép liên kết,
// và thanh tiến trình đọc. Biên dịch ra script.js bằng `tsc`.
function getPageMeta() {
    const canonical = document.querySelector('link[rel="canonical"]');
    const description = document.querySelector('meta[name="description"]');
    return {
        url: canonical?.href ?? window.location.href,
        title: document.title,
        description: description?.content ?? "",
    };
}
function buildShareUrl(platform, meta) {
    const url = encodeURIComponent(meta.url);
    const text = encodeURIComponent(meta.title);
    switch (platform) {
        case "x":
            return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case "threads":
            return `https://www.threads.net/intent/post?text=${text}%20${url}`;
    }
}
function openSharePopup(href) {
    const width = 600;
    const height = 640;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(href, "share", `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`);
}
function initShareButtons() {
    const buttons = document.querySelectorAll("[data-share-platform]");
    const meta = getPageMeta();
    buttons.forEach((button) => {
        const platform = button.dataset.sharePlatform;
        if (!platform)
            return;
        button.addEventListener("click", () => {
            const href = buildShareUrl(platform, meta);
            openSharePopup(href);
        });
    });
}
function initCopyLink() {
    const button = document.querySelector("[data-copy-link]");
    const label = button?.querySelector("[data-copy-label]");
    if (!button || !label)
        return;
    const defaultText = label.textContent ?? "Sao chép liên kết";
    let resetTimer;
    button.addEventListener("click", async () => {
        const meta = getPageMeta();
        try {
            await navigator.clipboard.writeText(meta.url);
        }
        catch {
            // Phương án dự phòng cho trình duyệt không hỗ trợ Clipboard API.
            const input = document.createElement("input");
            input.value = meta.url;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
        }
        label.textContent = "Copied!";
        button.setAttribute("data-copied", "true");
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
            label.textContent = defaultText;
            button.removeAttribute("data-copied");
        }, 2000);
    });
}
function initReadingProgress() {
    const bar = document.querySelector("[data-reading-progress]");
    const article = document.querySelector("article");
    if (!bar || !article)
        return;
    const update = () => {
        const { top, height } = article.getBoundingClientRect();
        const viewport = window.innerHeight;
        const total = height - viewport;
        const scrolled = Math.min(Math.max(-top, 0), Math.max(total, 1));
        const percent = total > 0 ? (scrolled / total) * 100 : 0;
        bar.style.width = `${percent}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
}

function initPublishedDate() {
    const timeEl = document.querySelector("[data-published-date]");
    if (!timeEl)
        return;
    const now = new Date();
    // Định dạng máy đọc được cho thuộc tính datetime, vd. "2026-09-22".
    const isoDate = now.toISOString().slice(0, 10);
    // Định dạng hiển thị cho người đọc, vd. "September 22, 2026".
    const displayDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);
    timeEl.setAttribute("datetime", isoDate);
    timeEl.textContent = displayDate;
}

document.addEventListener("DOMContentLoaded", () => {
    initShareButtons();
    initCopyLink();
    initReadingProgress();
    initPublishedDate();
});
