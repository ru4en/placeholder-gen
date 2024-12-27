const cache = new Map();

// const defaultPlaceholderSettings = {
//     width: 100,
//     height: 100,
//     bgColor: '#f0f0f0',
//     fgColor: '#000000',
//     text: 'Placeholder Image',
//     fontSize: 16,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     fontFamily: 'Arial',
//     fontColor: '#000000',
//     iconUrl: "https://rubenlopes.uk/logo-small.png",
//     iconSize: 100
// };

function generateCacheKey(settings) {
    return JSON.stringify(settings);
}

function createCanvas(settings) {
    const canvas = document.createElement('canvas');
    canvas.width = settings.width;
    canvas.height = settings.height;
    return canvas;
}

async function drawIcon(ctx, settings) {
    if (!settings.iconUrl) return;

    const icon = new Image();
    icon.crossOrigin = 'Anonymous';
    icon.src = settings.iconUrl;

    await new Promise((resolve, reject) => {
        icon.onload = () => {
            const aspectRatio = icon.width / icon.height;
            const [drawWidth, drawHeight] = aspectRatio > 1
                ? [settings.iconSize, settings.iconSize / aspectRatio]
                : [settings.iconSize * aspectRatio, settings.iconSize];

            ctx.drawImage(
                icon,
                settings.width / 2 - drawWidth / 2,
                settings.height / 2 - drawHeight / 2,
                drawWidth,
                drawHeight
            );
            resolve();
        };
        icon.onerror = () => reject(new Error('Icon failed to load'));
    });
}

async function generatePlaceholder(settings) {
    const cacheKey = generateCacheKey(settings);
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const canvas = createCanvas(settings);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = settings.bgColor;
    ctx.fillRect(0, 0, settings.width, settings.height);

    // Icon
    await drawIcon(ctx, settings);

    // Text
    ctx.fillStyle = settings.fgColor;
    ctx.font = `${settings.fontWeight} ${settings.fontStyle} ${settings.fontSize}px ${settings.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textOffset = settings.iconUrl ? settings.iconSize / 3 : 0;
    ctx.fillText(settings.text, settings.width / 2, settings.height / 2 + textOffset);

    const dataUrl = canvas.toDataURL('image/png');
    cache.set(cacheKey, dataUrl);
    return dataUrl;
}

async function applyPlaceholder(img) {
    const settings = {
        ...defaultPlaceholderSettings,
        width: img.width || defaultPlaceholderSettings.width,
        height: img.height || defaultPlaceholderSettings.height,
        bgColor: img.dataset.bgColor || defaultPlaceholderSettings.bgColor,
        fgColor: img.dataset.fgColor || defaultPlaceholderSettings.fgColor,
        fontSize: Number(img.dataset.fontSize) || defaultPlaceholderSettings.fontSize,
        fontWeight: img.dataset.fontWeight || defaultPlaceholderSettings.fontWeight,
        fontStyle: img.dataset.fontStyle || defaultPlaceholderSettings.fontStyle,
        fontFamily: img.dataset.fontFamily || defaultPlaceholderSettings.fontFamily,
        iconUrl: img.dataset.iconUrl || defaultPlaceholderSettings.iconUrl,
        iconSize: Number(img.dataset.iconSize) || defaultPlaceholderSettings.iconSize
    };

    img.src = await generatePlaceholder(settings);
}

async function loadPlaceholders() {
    const images = document.querySelectorAll('img');
    const tasks = Array.from(images).map(async (img) => {
        if (!img.complete || img.naturalWidth === 0) {
            await applyPlaceholder(img);
        }
    });
    await Promise.all(tasks);
}

function setupErrorHandlers() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = () => applyPlaceholder(img);
    });
}

window.onload = () => {
    loadPlaceholders().then(setupErrorHandlers);
};
