/* ==========================================================================
   GREEN CITY PHARMACY - AD CREATOR JAVASCRIPT LOGIC
   Features: Drag & Drop Shelves, Perspective Skewing, Auto-Keyframe Motion Tracking,
             Vector Package Renderer, Clinical Filters, Canvas-MediaRecorder Video Exporter
   ========================================================================== */

// 1. ALLOPATHIC MEDICINE DATABASE FOR SIDEBAR
const ALLOPATHIC_MEDICINES = [
    { id: 'para', name: 'Paracetamol 500mg', label: 'Antipyretic / Analgesic', category: 'otc', gradient: 'lib-grad-otc', icon: '💊', color: '#3b82f6', altColor: '#1d4ed8' },
    { id: 'cet', name: 'Cetirizine HCl 10mg', label: 'Anti-Histamine / Allergy', category: 'otc', gradient: 'lib-grad-allergy', icon: '💧', color: '#06b6d4', altColor: '#0891b2' },
    { id: 'ibup', name: 'Ibuprofen 400mg', label: 'Pain & Inflammation', category: 'otc', gradient: 'lib-grad-diabetes', icon: '⚡', color: '#f59e0b', altColor: '#b45309' },
    { id: 'amox', name: 'Amoxicillin 500mg', label: 'Antibiotic Penicillin', category: 'rx', gradient: 'lib-grad-antibiotic', icon: '🧬', color: '#10b981', altColor: '#047857' },
    { id: 'ator', name: 'Atorvastatin 10mg', label: 'Cardio Lipid Care', category: 'rx', gradient: 'lib-grad-cardio', icon: '❤️', color: '#f43f5e', altColor: '#be123c' },
    { id: 'metf', name: 'Metformin HCl 500mg', label: 'Diabetes Glucose Control', category: 'rx', gradient: 'lib-grad-diabetes', icon: '🍭', color: '#f59e0b', altColor: '#b45309' },
    { id: 'pant', name: 'Pantoprazole 40mg', label: 'Acidity / Gastric Relief', category: 'otc', gradient: 'lib-grad-vitamins', icon: '🔥', color: '#a855f7', altColor: '#6b21a8' },
    { id: 'azith', name: 'Azithromycin 500mg', label: 'Broad Spectrum Antibiotic', category: 'rx', gradient: 'lib-grad-antibiotic', icon: '🛡️', color: '#10b981', altColor: '#047857' }
];

// 2. STATE VARIABLES
let activeShelves = [];        // Array of shelf objects: { id, medicineId, count, spacing, skewY, keyframes: [{time, x, y, width, height}] }
let selectedShelfId = null;    // Active selected shelf
let isPlaying = false;
let isRecording = false;
let animationFrameId = null;
let currentDemoTime = 0;       // For simulated shop pan background
let isDemoMode = false;
let demoVideoDuration = 10;    // Default duration for demo in seconds
let originalVideoWidth = 1280;
let originalVideoHeight = 720;

// Dragging state variables
let dragMode = null;           // 'move', 'resize', or null
let dragStartMouseX = 0;
let dragStartMouseY = 0;
let dragStartObjectState = null;

// 3. SELECTIONS
const uploadOverlay = document.getElementById('upload-overlay');
const videoFrame = document.getElementById('video-frame');
const videoUploader = document.getElementById('video-uploader');
const editorVideo = document.getElementById('editor-video');
const editorCanvas = document.getElementById('editor-canvas');
const ctx = editorCanvas.getContext('2d');

const btnLoadDemo = document.getElementById('btn-load-demo');
const btnLoadDemoOverlay = document.getElementById('btn-load-demo-overlay');
const btnExportAd = document.getElementById('btn-export-ad');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnAddKeyframe = document.getElementById('btn-add-keyframe');
const btnClearKeyframes = document.getElementById('btn-clear-keyframes');

const timeDisplay = document.getElementById('time-display');
const scrubber = document.getElementById('scrubber');
const keyframeMarkersContainer = document.getElementById('keyframe-markers-container');

// Sidebar Options Controls
const libSearch = document.getElementById('lib-search');
const libraryGrid = document.getElementById('catalog-library-grid');
const shelfEditorControls = document.getElementById('shelf-editor-controls');
const shelfNoSelection = document.getElementById('shelf-no-selection');
const shelfMultiplier = document.getElementById('shelf-multiplier');
const shelfMultiplierVal = document.getElementById('shelf-multiplier-val');
const shelfSpacing = document.getElementById('shelf-spacing');
const shelfSkewY = document.getElementById('shelf-skew-y');
const shelfSkewVal = document.getElementById('shelf-skew-val');
const btnDuplicateShelf = document.getElementById('btn-duplicate-shelf');
const btnDeleteShelf = document.getElementById('btn-delete-shelf');

// Overlays Controls
const chkShowLogo = document.getElementById('chk-show-logo');
const chkShowLowerThird = document.getElementById('chk-show-lowerthird');
const chkShowCross = document.getElementById('chk-show-cross');
const brandingSlogan = document.getElementById('branding-slogan');
const brandingPhone = document.getElementById('branding-phone');
const lowerPharmacistName = document.getElementById('lower-pharmacist-name');
const lowerPharmacistLic = document.getElementById('lower-pharmacist-lic');
const clinicalFilter = document.getElementById('clinical-filter');
const bgAudioSelect = document.getElementById('bg-audio-select');

// Export Modal Selections
const exportModal = document.getElementById('export-modal');
const exportProgress = document.getElementById('export-progress');
const exportPercent = document.getElementById('export-percent');
const exportTitle = document.getElementById('export-title');
const exportDesc = document.getElementById('export-desc');

// 4. APP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initCatalogSidebar();
    setupEventListeners();
    resizeCanvas();
    loadDefaultPharmacyVideo();
});

// Resizes canvas display resolution based on actual rendering dimensions
function resizeCanvas() {
    editorCanvas.width = originalVideoWidth;
    editorCanvas.height = originalVideoHeight;
}

// Attempts to auto-load vdf.mp4 on startup if present in assets
function loadDefaultPharmacyVideo() {
    isDemoMode = false;
    editorVideo.src = 'assets/vdf.mp4';
    
    editorVideo.onloadedmetadata = () => {
        originalVideoWidth = editorVideo.videoWidth;
        originalVideoHeight = editorVideo.videoHeight;
        resizeCanvas();
        
        // Hide overlay and show editor frame
        uploadOverlay.style.display = 'none';
        videoFrame.style.display = 'block';
        btnPlayPause.disabled = false;
        scrubber.disabled = false;
        btnExportAd.disabled = false;
        btnAddKeyframe.disabled = false;
        btnClearKeyframes.disabled = false;
        
        editorVideo.currentTime = 0;
        updateTimeDisplay();
        setTimeout(() => requestAnimationFrameDraw(), 150);
        showToastNotification('Pharmacy video vdf.mp4 auto-loaded successfully!', 'fa-solid fa-file-video');
    };
    
    editorVideo.onerror = () => {
        // Fallback silently to waiting for upload if vdf.mp4 doesn't load
        console.log('No default video found or failed to load. Awaiting user upload.');
        editorVideo.onerror = null;
    };
}

// 5. SIDEBAR INITIALIZATION & FILTERING
function initCatalogSidebar(filterQuery = '') {
    libraryGrid.innerHTML = '';
    const query = filterQuery.toLowerCase();
    
    const filtered = ALLOPATHIC_MEDICINES.filter(med => 
        med.name.toLowerCase().includes(query) || 
        med.label.toLowerCase().includes(query)
    );
    
    filtered.forEach(med => {
        const item = document.createElement('div');
        item.className = 'library-item';
        item.setAttribute('data-id', med.id);
        
        item.innerHTML = `
            <div class="library-item-icon-box ${med.gradient}">
                <span>${med.icon}</span>
            </div>
            <h3 class="library-item-name">${med.name}</h3>
            <span class="library-item-dosage">${med.label}</h3>
        `;
        
        // Drag start and click support
        item.addEventListener('click', () => {
            addNewVirtualShelf(med.id);
        });
        
        libraryGrid.appendChild(item);
    });
}

// 6. EVENT LISTENERS SETUP
function setupEventListeners() {
    // Search input
    libSearch.addEventListener('input', (e) => {
        initCatalogSidebar(e.target.value);
    });
    
    // Drag & drop handlers on dropzone
    uploadOverlay.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadOverlay.classList.add('dragover');
    });
    
    uploadOverlay.addEventListener('dragleave', () => {
        uploadOverlay.classList.remove('dragover');
    });
    
    uploadOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadOverlay.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleUploadedVideo(e.dataTransfer.files[0]);
        }
    });
    
    videoUploader.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleUploadedVideo(e.target.files[0]);
        }
    });
    
    // Demo load triggers
    btnLoadDemo.addEventListener('click', loadDemoStoreMode);
    btnLoadDemoOverlay.addEventListener('click', loadDemoStoreMode);
    
    // Playback buttons
    btnPlayPause.addEventListener('click', togglePlayback);
    
    // Scrubber interaction
    scrubber.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (isDemoMode) {
            currentDemoTime = (value / 100) * demoVideoDuration;
        } else {
            editorVideo.currentTime = (value / 100) * editorVideo.duration;
        }
        updateTimeDisplay();
        requestAnimationFrameDraw();
    });
    
    // Keyframing controllers
    btnAddKeyframe.addEventListener('click', addKeyframeAtCurrentTime);
    btnClearKeyframes.addEventListener('click', clearActiveKeyframes);
    
    // Video updates trigger canvas repaint
    editorVideo.addEventListener('seeked', () => {
        requestAnimationFrameDraw();
    });
    editorVideo.addEventListener('timeupdate', () => {
        if (!isPlaying) {
            updateScrubberFromVideo();
            updateTimeDisplay();
        }
    });

    // Customizer input event binds
    shelfMultiplier.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        shelfMultiplierVal.textContent = `${val} Box${val > 1 ? 'es' : ''}`;
        updateActiveShelfProperty('count', val);
    });

    shelfSpacing.addEventListener('input', (e) => {
        updateActiveShelfProperty('spacing', parseInt(e.target.value));
    });

    shelfSkewY.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        shelfSkewVal.textContent = `${val}°`;
        updateActiveShelfProperty('skewY', val);
    });

    btnDuplicateShelf.addEventListener('click', duplicateActiveShelf);
    btnDeleteShelf.addEventListener('click', deleteActiveShelf);

    // Audio select handlers
    bgAudioSelect.addEventListener('change', handleAudioChange);

    // Export handler
    btnExportAd.addEventListener('click', startRecordingAd);

    // Window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Canvas Mouse listeners for dragging, resizing, selecting
    editorCanvas.addEventListener('mousedown', handleCanvasMouseDown);
    window.addEventListener('mousemove', handleCanvasMouseMove);
    window.addEventListener('mouseup', handleCanvasMouseUp);
}

// 7. VIDEO FILE HANDLERS
function handleUploadedVideo(file) {
    const url = URL.createObjectURL(file);
    editorVideo.src = url;
    isDemoMode = false;
    
    editorVideo.onloadedmetadata = () => {
        originalVideoWidth = editorVideo.videoWidth;
        originalVideoHeight = editorVideo.videoHeight;
        resizeCanvas();
        
        // Update states
        uploadOverlay.style.display = 'none';
        videoFrame.style.display = 'block';
        btnPlayPause.disabled = false;
        scrubber.disabled = false;
        btnExportAd.disabled = false;
        btnAddKeyframe.disabled = false;
        btnClearKeyframes.disabled = false;
        
        // Initial draw
        editorVideo.currentTime = 0;
        updateTimeDisplay();
        setTimeout(() => requestAnimationFrameDraw(), 150);
    };
}

// Loads a simulated 3D store pan video as a fallback to test without upload
function loadDemoStoreMode() {
    isDemoMode = true;
    currentDemoTime = 0;
    originalVideoWidth = 1280;
    originalVideoHeight = 720;
    resizeCanvas();
    
    uploadOverlay.style.display = 'none';
    videoFrame.style.display = 'block';
    btnPlayPause.disabled = false;
    scrubber.disabled = false;
    btnExportAd.disabled = false;
    btnAddKeyframe.disabled = false;
    btnClearKeyframes.disabled = false;
    
    // Populate demo template shelves automatically so it shows a pre-made virtual setup!
    setupDemoShelvesTemplate();
    
    updateTimeDisplay();
    requestAnimationFrameDraw();
}

function setupDemoShelvesTemplate() {
    activeShelves = [
        {
            id: 'demo-shelf-1',
            medicineId: 'para',
            count: 7,
            spacing: 6,
            skewY: -4,
            keyframes: [
                { time: 0, x: 200, y: 150, width: 280, height: 60 },
                { time: 10, x: 100, y: 170, width: 260, height: 55 }
            ]
        },
        {
            id: 'demo-shelf-2',
            medicineId: 'amox',
            count: 5,
            spacing: 12,
            skewY: 0,
            keyframes: [
                { time: 0, x: 550, y: 320, width: 320, height: 75 },
                { time: 10, x: 450, y: 330, width: 310, height: 72 }
            ]
        },
        {
            id: 'demo-shelf-3',
            medicineId: 'ator',
            count: 6,
            spacing: 8,
            skewY: 6,
            keyframes: [
                { time: 0, x: 100, y: 460, width: 240, height: 65 },
                { time: 10, x: 40, y: 470, width: 230, height: 60 }
            ]
        }
    ];
    selectedShelfId = 'demo-shelf-1';
    updateOptionFieldsForSelected();
    updateKeyframeTimelineMarkers();
}

// 8. PLAYBACK & LOOP
function togglePlayback() {
    if (isPlaying) {
        pauseEditor();
    } else {
        playEditor();
    }
}

function playEditor() {
    isPlaying = true;
    btnPlayPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    
    // Start Audio if configured
    playBackgroundAudio();
    
    if (isDemoMode) {
        lastFrameTime = performance.now();
        demoLoop();
    } else {
        editorVideo.play();
        videoLoop();
    }
}

function pauseEditor() {
    isPlaying = false;
    btnPlayPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
    
    // Pause Audio
    pauseBackgroundAudio();
    
    if (!isDemoMode) {
        editorVideo.pause();
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

let lastFrameTime = 0;
function demoLoop() {
    if (!isPlaying) return;
    
    const now = performance.now();
    const dt = (now - lastFrameTime) / 1000;
    lastFrameTime = now;
    
    currentDemoTime += dt;
    if (currentDemoTime >= demoVideoDuration) {
        currentDemoTime = 0; // Loop
    }
    
    // Sync timeline elements
    scrubber.value = (currentDemoTime / demoVideoDuration) * 100;
    updateTimeDisplay();
    
    // Paint frame
    renderAdFrame();
    
    animationFrameId = requestAnimationFrame(demoLoop);
}

function videoLoop() {
    if (!isPlaying) return;
    
    updateScrubberFromVideo();
    updateTimeDisplay();
    
    renderAdFrame();
    
    animationFrameId = requestAnimationFrame(videoLoop);
}

function requestAnimationFrameDraw() {
    if (!isPlaying) {
        requestAnimationFrame(() => renderAdFrame());
    }
}

// 9. TIMELINE SYNCS
function updateTimeDisplay() {
    let current = 0;
    let total = 0;
    
    if (isDemoMode) {
        current = currentDemoTime;
        total = demoVideoDuration;
    } else {
        current = editorVideo.currentTime || 0;
        total = editorVideo.duration || 0;
    }
    
    timeDisplay.textContent = `${formatTime(current)} / ${formatTime(total)}`;
}

function updateScrubberFromVideo() {
    if (editorVideo.duration) {
        scrubber.value = (editorVideo.currentTime / editorVideo.duration) * 100;
    }
}

function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 100);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// 10. BACKGROUND SOUND HANDLING
function playBackgroundAudio() {
    const audioId = `audio-${bgAudioSelect.value}`;
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.currentTime = isDemoMode ? currentDemoTime % audio.duration : editorVideo.currentTime % audio.duration;
        audio.play().catch(e => console.log('Audio autoplay blocked', e));
    }
}

function pauseBackgroundAudio() {
    document.querySelectorAll('audio').forEach(audio => audio.pause());
}

function handleAudioChange() {
    pauseBackgroundAudio();
    if (isPlaying) {
        playBackgroundAudio();
    }
}

// 11. KEYFRAME SYSTEM (MOTION INTERPOLATION)
function addKeyframeAtCurrentTime() {
    if (!selectedShelfId) return;
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    const time = getCurrentTime();
    
    // Interpolate current pos to write a keyframe
    const currentPos = getInterpolatedShelfPosition(shelf, time);
    
    // Remove if duplicate time keyframe exists
    shelf.keyframes = shelf.keyframes.filter(kf => Math.abs(kf.time - time) > 0.05);
    
    shelf.keyframes.push({
        time: time,
        x: currentPos.x,
        y: currentPos.y,
        width: currentPos.width,
        height: currentPos.height
    });
    
    // Sort keyframes by time
    shelf.keyframes.sort((a, b) => a.time - b.time);
    
    updateKeyframeTimelineMarkers();
    showToastNotification('Keyframe added!');
    requestAnimationFrameDraw();
}

function clearActiveKeyframes() {
    if (!selectedShelfId) return;
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    const time = getCurrentTime();
    const currentPos = getInterpolatedShelfPosition(shelf, time);
    
    // Strip down to just 1 static keyframe representing the current shape
    shelf.keyframes = [
        { time: 0, x: currentPos.x, y: currentPos.y, width: currentPos.width, height: currentPos.height }
    ];
    
    updateKeyframeTimelineMarkers();
    showToastNotification('Cleared motion path.');
    requestAnimationFrameDraw();
}

function updateKeyframeTimelineMarkers() {
    keyframeMarkersContainer.innerHTML = '';
    if (!selectedShelfId) return;
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    const totalTime = isDemoMode ? demoVideoDuration : (editorVideo.duration || 1);
    
    shelf.keyframes.forEach(kf => {
        const pct = (kf.time / totalTime) * 100;
        if (pct < 0 || pct > 100) return;
        
        const marker = document.createElement('div');
        marker.className = 'keyframe-indicator';
        marker.style.left = `calc(${pct}% - 5px)`;
        keyframeMarkersContainer.appendChild(marker);
    });
}

function getCurrentTime() {
    return isDemoMode ? currentDemoTime : (editorVideo.currentTime || 0);
}

// Retrieves positioning variables (X, Y, Width, Height) by interpolating keyframes
function getInterpolatedShelfPosition(shelf, time) {
    if (shelf.keyframes.length === 0) {
        return { x: 100, y: 100, width: 200, height: 60 };
    }
    
    // If only one keyframe, it stays static
    if (shelf.keyframes.length === 1) {
        return {
            x: shelf.keyframes[0].x,
            y: shelf.keyframes[0].y,
            width: shelf.keyframes[0].width,
            height: shelf.keyframes[0].height
        };
    }
    
    // Clamp to boundaries if time is out of range
    if (time <= shelf.keyframes[0].time) {
        return {
            x: shelf.keyframes[0].x,
            y: shelf.keyframes[0].y,
            width: shelf.keyframes[0].width,
            height: shelf.keyframes[0].height
        };
    }
    
    const lastKfIndex = shelf.keyframes.length - 1;
    if (time >= shelf.keyframes[lastKfIndex].time) {
        return {
            x: shelf.keyframes[lastKfIndex].x,
            y: shelf.keyframes[lastKfIndex].y,
            width: shelf.keyframes[lastKfIndex].width,
            height: shelf.keyframes[lastKfIndex].height
        };
    }
    
    // Find enclosing keyframe interval
    for (let i = 0; i < lastKfIndex; i++) {
        const kfStart = shelf.keyframes[i];
        const kfEnd = shelf.keyframes[i + 1];
        
        if (time >= kfStart.time && time <= kfEnd.time) {
            // Linear interpolation coefficient
            const factor = (time - kfStart.time) / (kfEnd.time - kfStart.time);
            
            return {
                x: kfStart.x + (kfEnd.x - kfStart.x) * factor,
                y: kfStart.y + (kfEnd.y - kfStart.y) * factor,
                width: kfStart.width + (kfEnd.width - kfStart.width) * factor,
                height: kfStart.height + (kfEnd.height - kfStart.height) * factor
            };
        }
    }
    
    return shelf.keyframes[0];
}

// 12. ADDING/EDITING VIRTUAL SHELVES
function addNewVirtualShelf(medicineId) {
    const time = getCurrentTime();
    const newId = 'shelf-' + Date.now();
    
    const newShelf = {
        id: newId,
        medicineId: medicineId,
        count: 5,
        spacing: 10,
        skewY: 0,
        keyframes: [
            { time: time, x: 400, y: 200, width: 250, height: 60 }
        ]
    };
    
    activeShelves.push(newShelf);
    selectedShelfId = newId;
    
    updateOptionFieldsForSelected();
    updateKeyframeTimelineMarkers();
    showToastNotification('Shelf added to workspace.');
    requestAnimationFrameDraw();
}

function updateActiveShelfProperty(prop, value) {
    if (!selectedShelfId) return;
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    shelf[prop] = value;
    requestAnimationFrameDraw();
}

function duplicateActiveShelf() {
    if (!selectedShelfId) return;
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    const time = getCurrentTime();
    const currentPos = getInterpolatedShelfPosition(shelf, time);
    const newId = 'shelf-' + Date.now();
    
    // Deep clone keyframes
    const duplicatedKfs = shelf.keyframes.map(kf => ({ ...kf, x: kf.x + 30, y: kf.y + 30 }));
    
    const newShelf = {
        ...shelf,
        id: newId,
        keyframes: duplicatedKfs
    };
    
    activeShelves.push(newShelf);
    selectedShelfId = newId;
    updateOptionFieldsForSelected();
    updateKeyframeTimelineMarkers();
    showToastNotification('Duplicated virtual shelf.');
    requestAnimationFrameDraw();
}

function deleteActiveShelf() {
    if (!selectedShelfId) return;
    activeShelves = activeShelves.filter(s => s.id !== selectedShelfId);
    selectedShelfId = null;
    updateOptionFieldsForSelected();
    updateKeyframeTimelineMarkers();
    showToastNotification('Deleted virtual shelf.');
    requestAnimationFrameDraw();
}

function updateOptionFieldsForSelected() {
    if (!selectedShelfId) {
        shelfEditorControls.style.display = 'none';
        shelfNoSelection.style.display = 'block';
        return;
    }
    
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    shelfEditorControls.style.display = 'block';
    shelfNoSelection.style.display = 'none';
    
    shelfMultiplier.value = shelf.count;
    shelfMultiplierVal.textContent = `${shelf.count} Box${shelf.count > 1 ? 'es' : ''}`;
    shelfSpacing.value = shelf.spacing;
    shelfSkewY.value = shelf.skewY;
    shelfSkewVal.textContent = `${shelf.skewY}°`;
}

// 13. MOUSE INTERACTION ON CANVAS (MOVE & RESIZE)
function handleCanvasMouseDown(e) {
    const mousePos = getCanvasMousePosition(e);
    const time = getCurrentTime();
    
    // Check if clicked resize handle of selected shelf
    if (selectedShelfId) {
        const shelf = activeShelves.find(s => s.id === selectedShelfId);
        if (shelf) {
            const pos = getInterpolatedShelfPosition(shelf, time);
            const handleSize = 12;
            const rx = pos.x + pos.width - handleSize;
            const ry = pos.y + pos.height - handleSize;
            
            if (mousePos.x >= rx && mousePos.x <= pos.x + pos.width &&
                mousePos.y >= ry && mousePos.y <= pos.y + pos.height) {
                dragMode = 'resize';
                dragStartMouseX = mousePos.x;
                dragStartMouseY = mousePos.y;
                dragStartObjectState = { ...pos };
                return;
            }
        }
    }
    
    // Hit test shelf rectangles from front-to-back (reverse loop)
    for (let i = activeShelves.length - 1; i >= 0; i--) {
        const shelf = activeShelves[i];
        const pos = getInterpolatedShelfPosition(shelf, time);
        
        // Check if inside bounding box
        if (mousePos.x >= pos.x && mousePos.x <= pos.x + pos.width &&
            mousePos.y >= pos.y && mousePos.y <= pos.y + pos.height) {
            selectedShelfId = shelf.id;
            updateOptionFieldsForSelected();
            updateKeyframeTimelineMarkers();
            
            dragMode = 'move';
            dragStartMouseX = mousePos.x;
            dragStartMouseY = mousePos.y;
            dragStartObjectState = { ...pos };
            
            requestAnimationFrameDraw();
            return;
        }
    }
    
    // Deselect if clicked empty canvas area
    selectedShelfId = null;
    updateOptionFieldsForSelected();
    updateKeyframeTimelineMarkers();
    requestAnimationFrameDraw();
}

function handleCanvasMouseMove(e) {
    if (!dragMode || !selectedShelfId) return;
    const mousePos = getCanvasMousePosition(e);
    const shelf = activeShelves.find(s => s.id === selectedShelfId);
    if (!shelf) return;
    
    const time = getCurrentTime();
    const dx = mousePos.x - dragStartMouseX;
    const dy = mousePos.y - dragStartMouseY;
    
    let nextX = dragStartObjectState.x;
    let nextY = dragStartObjectState.y;
    let nextWidth = dragStartObjectState.width;
    let nextHeight = dragStartObjectState.height;
    
    if (dragMode === 'move') {
        nextX = dragStartObjectState.x + dx;
        nextY = dragStartObjectState.y + dy;
    } else if (dragMode === 'resize') {
        nextWidth = Math.max(80, dragStartObjectState.width + dx);
        nextHeight = Math.max(30, dragStartObjectState.height + dy);
    }
    
    // Auto-update or insert keyframe at current time point
    const activeKf = shelf.keyframes.find(kf => Math.abs(kf.time - time) < 0.05);
    if (activeKf) {
        activeKf.x = nextX;
        activeKf.y = nextY;
        activeKf.width = nextWidth;
        activeKf.height = nextHeight;
    } else {
        // Create keyframe at current frame so motion interpolates here
        shelf.keyframes.push({
            time: time,
            x: nextX,
            y: nextY,
            width: nextWidth,
            height: nextHeight
        });
        shelf.keyframes.sort((a, b) => a.time - b.time);
        updateKeyframeTimelineMarkers();
    }
    
    requestAnimationFrameDraw();
}

function handleCanvasMouseUp() {
    dragMode = null;
    dragStartObjectState = null;
}

function getCanvasMousePosition(e) {
    const rect = editorCanvas.getBoundingClientRect();
    
    // Scale mapping coordinates from CSS dimensions to actual backing canvas size
    const x = ((e.clientX - rect.left) / rect.width) * editorCanvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * editorCanvas.height;
    
    return { x, y };
}

// 14. CANVAS COMPOSITING & GRAPHICS RENDERING
function renderAdFrame() {
    // A. CLEAR CANVAS
    ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
    
    // B. DRAW BACKGROUND (VIDEO FRAME OR DEMO PAN BACKGROUND)
    if (isDemoMode) {
        drawSimulatedStoreBackground();
    } else {
        ctx.drawImage(editorVideo, 0, 0, editorCanvas.width, editorCanvas.height);
    }
    
    // C. RENDER PLACED SHELVES WITH ALLOPATHIC PRODUCTS
    const time = getCurrentTime();
    activeShelves.forEach(shelf => {
        drawVirtualShelf(shelf, time);
    });
    
    // D. DRAW USER-SELECTION BOUNDING BOXES (ONLY IF NOT COMPILING/EXPORTING)
    if (selectedShelfId && !isRecording) {
        const shelf = activeShelves.find(s => s.id === selectedShelfId);
        if (shelf) {
            const pos = getInterpolatedShelfPosition(shelf, time);
            drawActiveShelfBoundingBox(pos);
        }
    }
    
    // E. BRANDING LOGO WATERMARK
    if (chkShowLogo.checked) {
        drawBrandingWatermark();
    }
    
    // F. LOWER THIRD BANNERS
    if (chkShowLowerThird.checked) {
        drawLowerThirdBanner();
    }
    
    // G. Slogan / WhatsApp sliding banners
    drawPromotionalBannerTexts();
    
    // H. Glow green cross indicator
    if (chkShowCross.checked) {
        drawGreenCross();
    }

    // I. APPLY LIGHTING/COLOR CLINICAL FILTERS
    applyCinematicFilters();
}

// Draws a simulated 3D shop panning background using canvas lines
function drawSimulatedStoreBackground() {
    // We base the pan displacement on current pan loop time
    // Pans 300px left to right and repeats
    const panOffset = Math.sin((currentDemoTime / demoVideoDuration) * Math.PI * 2) * 150;
    
    // Soft slate-dark background grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, editorCanvas.width, editorCanvas.height);
    
    // Grid background
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = panOffset % gridSize; x < editorCanvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, editorCanvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < editorCanvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(editorCanvas.width, y);
        ctx.stroke();
    }
    
    // Draw empty shop shelves layout in perspective
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    
    // Shelf 1 (Left background wall)
    ctx.beginPath();
    ctx.moveTo(100 + panOffset, 100);
    ctx.lineTo(500 + panOffset, 100);
    ctx.moveTo(100 + panOffset, 220);
    ctx.lineTo(500 + panOffset, 220);
    ctx.stroke();
    
    // Draw wood panel backing
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(100 + panOffset, 104, 400, 112);
    
    // Shelf 2 (Center wall)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(500 + panOffset, 280, 500, 150);
    ctx.beginPath();
    ctx.moveTo(500 + panOffset, 280);
    ctx.lineTo(1000 + panOffset, 280);
    ctx.moveTo(500 + panOffset, 400);
    ctx.lineTo(1000 + panOffset, 400);
    ctx.stroke();
    
    // Shelf 3 (Right wall lower)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(50 + panOffset, 450, 400, 150);
    ctx.beginPath();
    ctx.moveTo(50 + panOffset, 450);
    ctx.lineTo(450 + panOffset, 450);
    ctx.moveTo(50 + panOffset, 600);
    ctx.lineTo(450 + panOffset, 600);
    ctx.stroke();

    // Decorative labels
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.fillRect(150 + panOffset, 60, 120, 24);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px Inter';
    ctx.fillText('ALLOPATHIC A1', 170 + panOffset, 76);
}

// Renders dynamic 3D virtual medicines on shelf lines
function drawVirtualShelf(shelf, time) {
    const pos = getInterpolatedShelfPosition(shelf, time);
    const med = ALLOPATHIC_MEDICINES.find(m => m.id === shelf.medicineId) || ALLOPATHIC_MEDICINES[0];
    
    const count = shelf.count;
    const spacing = shelf.spacing;
    const skewY = (shelf.skewY * Math.PI) / 180;
    
    // Calculated size of single product box
    const totalSpacingWidth = spacing * (count - 1);
    const boxWidth = (pos.width - totalSpacingWidth) / count;
    const boxHeight = pos.height;
    
    // Save state for perspective skew transforms
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.transform(1, Math.tan(skewY), 0, 1, 0, 0); // Y-skew matrix translation
    
    // Draw background wooden/glass shelf bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.fillRect(0, boxHeight - 6, pos.width, 6);
    ctx.strokeRect(0, boxHeight - 6, pos.width, 6);
    
    // Draw medicines next to each other
    for (let i = 0; i < count; i++) {
        const bx = i * (boxWidth + spacing);
        const by = 0;
        
        draw3DMedicineBox(bx, by, boxWidth, boxHeight - 6, med);
    }
    
    ctx.restore();
}

// Renders a vector-style pharmaceutical box with light source shadow
function draw3DMedicineBox(x, y, w, h, med) {
    const depth = Math.min(15, w * 0.25); // 3D side width
    
    // Draw soft drop shadow beneath package
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.moveTo(x + 2, y + h + 2);
    ctx.lineTo(x + w + 2, y + h + 2);
    ctx.lineTo(x + w + depth + 2, y + h - depth + 2);
    ctx.lineTo(x + depth + 2, y + h - depth + 2);
    ctx.closePath();
    ctx.fill();

    // A. DRAW FRONT FACE
    const frontGrad = ctx.createLinearGradient(x, y, x, y + h);
    frontGrad.addColorStop(0, med.color);
    frontGrad.addColorStop(1, med.altColor);
    ctx.fillStyle = frontGrad;
    ctx.fillRect(x, y, w - depth, h);
    
    // White clinical stripe layout on box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillRect(x + 4, y + (h * 0.45), w - depth - 8, h * 0.2);
    
    // Draw medicine name text inside box front
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${Math.max(7, h * 0.14)}px Arial`;
    const textName = med.name.split(' ')[0];
    ctx.fillText(textName, x + 6, y + (h * 0.58));
    
    // Red prescription badge/cross in top corner
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + w - depth - 12, y + 4, 8, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + w - depth - 10, y + 7, 4, 2);
    ctx.fillRect(x + w - depth - 9, y + 6, 2, 4);

    // B. DRAW 3D SIDE FACE (Deeper dark shade for lighting perspective)
    ctx.fillStyle = adjustColorBrightness(med.altColor, -25); // Darken side
    ctx.beginPath();
    ctx.moveTo(x + w - depth, y);
    ctx.lineTo(x + w, y - depth);
    ctx.lineTo(x + w, y + h - depth);
    ctx.lineTo(x + w - depth, y + h);
    ctx.closePath();
    ctx.fill();
    
    // Draw top fold shadow
    ctx.fillStyle = adjustColorBrightness(med.color, 15); // Lighter top
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + depth, y - depth);
    ctx.lineTo(x + w, y - depth);
    ctx.lineTo(x + w - depth, y);
    ctx.closePath();
    ctx.fill();
    
    // Border highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w - depth, h);
}

function drawActiveShelfBoundingBox(pos) {
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(pos.x, pos.y, pos.width, pos.height);
    ctx.setLineDash([]);
    
    // Draw corner resize handle
    ctx.fillStyle = '#10b981';
    const handleSize = 12;
    ctx.fillRect(pos.x + pos.width - handleSize / 2, pos.y + pos.height - handleSize / 2, handleSize, handleSize);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pos.x + pos.width - handleSize / 2, pos.y + pos.height - handleSize / 2, handleSize, handleSize);
}

// Draws branding logo watermark in the corner
function drawBrandingWatermark() {
    ctx.save();
    // Glassmorphic backing card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 2;
    ctx.fillRect(40, 40, 240, 64);
    ctx.strokeRect(40, 40, 240, 64);
    
    // Draw Logo Icon
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(72, 72, 18, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px "Font Awesome 6 Free"';
    ctx.fillText('☘', 63, 79);
    
    // Label texts
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('GREEN CITY PHARMACY', 104, 68);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 9px Inter';
    ctx.fillText('100% GENUINE MEDICINES', 104, 86);
    ctx.restore();
}

// Draws pharmacist info card overlay at bottom-center
function drawLowerThirdBanner() {
    ctx.save();
    // Rounded dark banner at bottom center
    const w = 600;
    const h = 75;
    const x = (editorCanvas.width - w) / 2;
    const y = editorCanvas.height - 130;
    
    // Draw glass card
    ctx.fillStyle = 'rgba(6, 78, 59, 0.85)'; // Emerald Deep Accent
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    
    // Pharmacist text details
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(lowerPharmacistName.value, x + 24, y + 32);
    
    ctx.fillStyle = '#a7f3d0';
    ctx.font = '500 12px Inter';
    ctx.fillText(lowerPharmacistLic.value, x + 24, y + 54);
    
    // Professional registered pharmacist badge block
    ctx.fillStyle = '#10b981';
    ctx.fillRect(x + w - 100, y + 16, 80, 42);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px Inter';
    ctx.fillText('REGISTERED', x + w - 93, y + 33);
    ctx.fillText('PHARMACIST', x + w - 93, y + 48);
    
    ctx.restore();
}

// Top scroll slogan text ad overlay
function drawPromotionalBannerTexts() {
    ctx.save();
    
    // Top banner backdrop
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, 0, editorCanvas.width, 36);
    
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, 34, editorCanvas.width, 2);
    
    // Draw active text segments
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px Inter';
    ctx.fillText(brandingSlogan.value, 40, 23);
    
    // WhatsApp badge on right side
    const phoneText = brandingPhone.value;
    ctx.fillStyle = '#25d366'; // WhatsApp color
    ctx.fillRect(editorCanvas.width - 280, 6, 260, 24);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.fillText(phoneText, editorCanvas.width - 264, 22);
    
    ctx.restore();
}

function drawGreenCross() {
    ctx.save();
    // Pulsing green clinical cross in top right corner
    const panOffset = isDemoMode ? Math.sin(currentDemoTime) * 3 : 0;
    const x = editorCanvas.width - 80;
    const y = 80;
    
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.beginPath();
    ctx.arc(x, y, 24 + panOffset, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#10b981';
    ctx.fillRect(x - 5, y - 16, 10, 32);
    ctx.fillRect(x - 16, y - 5, 32, 10);
    ctx.restore();
}

// 15. POST PROCESSING FILTERS
function applyCinematicFilters() {
    const filter = clinicalFilter.value;
    if (filter === 'none') return;
    
    const imgData = ctx.getImageData(0, 0, editorCanvas.width, editorCanvas.height);
    const data = imgData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        
        if (filter === 'clinical-fresh') {
            // Brighten slightly, add warm tint
            r = Math.min(255, r * 1.05);
            g = Math.min(255, g * 1.08); // Green priority
            b = Math.min(255, b * 0.98); // Warm yellow
        } else if (filter === 'emerald-glow') {
            // Cool deep tones with emerald accents
            r = r * 0.9;
            g = Math.min(255, g * 1.12);
            b = Math.min(255, b * 1.02);
        } else if (filter === 'pharmacy-clean') {
            // High contrast, crisp whites
            const contrast = 25; // Contrast factor
            const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            r = Math.min(255, Math.max(0, factor * (r - 128) + 128));
            g = Math.min(255, Math.max(0, factor * (g - 128) + 128));
            b = Math.min(255, Math.max(0, factor * (b - 128) + 128));
        }
        
        data[i] = r;
        data[i+1] = g;
        data[i+2] = b;
    }
    
    ctx.putImageData(imgData, 0, 0);
}

// 16. CANVAS RECORDING & VIDEO EXPORT
function startRecordingAd() {
    if (isRecording) return;
    
    // Pause workspace playback
    pauseEditor();
    
    isRecording = true;
    exportModal.style.display = 'flex';
    updateExportProgress(0);
    
    // Reset scrubber to start
    if (isDemoMode) {
        currentDemoTime = 0;
    } else {
        editorVideo.currentTime = 0;
    }
    
    updateScrubberFromVideo();
    updateTimeDisplay();
    renderAdFrame();
    
    // Get duration
    const totalDuration = isDemoMode ? demoVideoDuration : (editorVideo.duration || 5);
    
    // Setup capture stream
    const canvasStream = editorCanvas.captureStream(30); // 30 FPS Capture
    
    // Blend Audio Stream if selected
    const audioId = `audio-${bgAudioSelect.value}`;
    const audioEl = document.getElementById(audioId);
    let finalStream = canvasStream;
    
    if (audioEl && bgAudioSelect.value !== 'none') {
        try {
            audioEl.currentTime = 0;
            audioEl.volume = 0.5; // Background volume level
            
            // Capture audio nodes from element
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const sourceNode = audioCtx.createMediaElementSource(audioEl);
            const destNode = audioCtx.createMediaStreamDestination();
            
            sourceNode.connect(destNode);
            sourceNode.connect(audioCtx.destination); // Play locally too
            
            const audioTrack = destNode.stream.getAudioTracks()[0];
            finalStream.addTrack(audioTrack);
            
            audioEl.play();
        } catch (e) {
            console.warn('Audio capture stream setup failed or already routed:', e);
        }
    }
    
    // Choose appropriate mimeType (webm/vp8 is highly compatible client-side)
    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    let recorder;
    try {
        recorder = new MediaRecorder(finalStream, options);
    } catch (e) {
        console.warn('VP9 recording not supported, falling back to basic webm');
        recorder = new MediaRecorder(finalStream);
    }
    
    const chunks = [];
    recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
    };
    
    recorder.onstop = () => {
        // Stop audio tracks
        pauseBackgroundAudio();
        
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `Green_City_Pharmacy_Ad_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Clean modal states
            exportModal.style.display = 'none';
            isRecording = false;
            showToastNotification('Video advertisement exported successfully!', 'fa-solid fa-square-check');
            requestAnimationFrameDraw();
        }, 1000);
    };
    
    recorder.start();
    
    // Frame-by-frame ticking loop
    const frameRateMs = 33; // ~30 FPS
    let tickTime = 0;
    
    function recordTick() {
        if (!isRecording) return;
        
        tickTime += frameRateMs / 1000;
        const pct = (tickTime / totalDuration) * 100;
        updateExportProgress(pct);
        
        if (isDemoMode) {
            currentDemoTime = tickTime;
        } else {
            editorVideo.currentTime = tickTime;
        }
        
        renderAdFrame();
        
        if (tickTime >= totalDuration) {
            recorder.stop();
        } else {
            setTimeout(recordTick, frameRateMs);
        }
    }
    
    setTimeout(recordTick, 200);
}

function updateExportProgress(pct) {
    const rounded = Math.min(100, Math.floor(pct));
    exportProgress.style.width = `${rounded}%`;
    exportPercent.textContent = `${rounded}% Completed`;
}

// 17. UTILITY FUNCTIONS
function adjustColorBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
}

// Simple browser-based toast alerts
function showToastNotification(msg, icon = 'fa-solid fa-circle-info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background-color: #1e293b;
        color: #f8fafc;
        padding: 12px 24px;
        border-radius: 8px;
        border: 1px solid var(--studio-accent);
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.85rem;
        font-weight: 600;
        z-index: 200;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    toast.innerHTML = `<i class="${icon}" style="color: #10b981;"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);
    
    // animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 2500);
}
