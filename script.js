// === DOM元素缓存管理 ===
class DOMCache {
    constructor() {
        this.elements = {};
        this.init();
    }

    init() {
        // 主要功能元素
        this.elements.dropArea = document.getElementById('dropArea');
        this.elements.fileInput = document.getElementById('fileInput');
        this.elements.selectImageBtn = document.getElementById('selectImageBtn');
        this.elements.generateHairBtn = document.getElementById('generateHairBtn');
        this.elements.animeConvertBtn = document.getElementById('animeConvertBtn');
        this.elements.downloadBtn = document.getElementById('downloadBtn');
        this.elements.hairstyleDIYBtn = document.getElementById('hairstyleDIYBtn');
        this.elements.cancelBtn = document.getElementById('cancelBtn');
        this.elements.mainResultBox = document.getElementById('mainResultBox');
        
        // 文本模态框元素
        this.elements.textModal = document.getElementById('textModal');
        this.elements.textModalContent = document.getElementById('textModalContent');
        this.elements.downloadTextBtn = document.getElementById('downloadTextBtn');
        this.elements.textCloseBtn = document.querySelector('.text-close');
        
        // 创意输入元素
        this.elements.ideaInput = document.getElementById('ideaInput');
        this.elements.ideaDropArea = document.getElementById('ideaDropArea');
        this.elements.ideaPreviewContainer = document.getElementById('ideaPreviewContainer');
        this.elements.removeIdeaBtn = document.getElementById('removeIdeaBtn');
        
        // 发型图片上传元素
        this.elements.hairstyleDropArea = document.getElementById('hairstyleDropArea');
        this.elements.hairstyleFileInput = document.getElementById('hairstyleFileInput');
        this.elements.selectHairstyleImageBtn = document.getElementById('selectHairstyleImageBtn');
        this.elements.removeHairstyleImageBtn = document.getElementById('removeHairstyleImageBtn');
        this.elements.hairstylePreviewContainer = document.getElementById('hairstylePreviewContainer');
        this.elements.hairstylePreviewImage = document.getElementById('hairstylePreviewImage');
        this.elements.hairstyleFileName = document.getElementById('hairstyleFileName');
        
        // 图片预览元素
        this.elements.previewContainer = document.getElementById('previewContainer');
        this.elements.previewImage = document.getElementById('previewImage');
        this.elements.fileName = document.getElementById('fileName');
        this.elements.removeImageBtn = document.getElementById('removeImageBtn');
        
        // 图片库和筛选元素
        this.elements.hairstyleGallery = document.getElementById('hairstyleGallery');
        this.elements.filterButtons = document.querySelectorAll('.filter-btn');
        
        // 图片模态框元素
        this.elements.modal = document.getElementById('imageModal');
        this.elements.modalImage = document.getElementById('modalImage');
        this.elements.closeModal = document.querySelector('.close');
        
        // 购买模态框元素
        this.elements.purchaseModal = document.getElementById('purchaseModal');
        this.elements.purchaseCloseBtn = document.querySelector('.purchase-close');
        this.elements.purchaseUsageBtn = document.getElementById('purchaseUsageBtn');
        this.elements.purchaseOptions = document.querySelectorAll('.purchase-option');
        
        // 咨询顾问模态框元素
        this.elements.consultantModal = document.getElementById('consultantModal');
        this.elements.consultantCloseBtn = document.querySelector('.consultant-close');
        this.elements.consultantCloseFooterBtn = document.querySelector('.consultant-close-btn');
        this.elements.consultantBtn = document.getElementById('consultantBtn');
        
        // 帮助中心模态框元素
        this.elements.helpModal = document.getElementById('helpModal');
        this.elements.helpCloseBtn = document.querySelector('.help-close');
        this.elements.helpCloseFooterBtn = document.querySelector('.help-close-btn');
        this.elements.helpCenterBtn = document.getElementById('helpCenterBtn');
        this.elements.helpTabs = document.querySelectorAll('.help-tab');
        this.elements.helpTabContents = document.querySelectorAll('.help-tab-content');
    }

    get(id) {
        return this.elements[id];
    }
}

// 创建全局DOM缓存实例
const domCache = new DOMCache();

// 为了保持向后兼容，创建一些常用的快捷引用
const dropArea = domCache.get('dropArea');
const fileInput = domCache.get('fileInput');
const selectImageBtn = domCache.get('selectImageBtn');
const generateHairBtn = domCache.get('generateHairBtn');
const animeConvertBtn = domCache.get('animeConvertBtn');
const downloadBtn = domCache.get('downloadBtn');
const hairstyleDIYBtn = domCache.get('hairstyleDIYBtn');
const textModal = domCache.get('textModal');
const textModalContent = domCache.get('textModalContent');
const downloadTextBtn = domCache.get('downloadTextBtn');
const textCloseBtn = domCache.get('textCloseBtn');
const ideaInput = domCache.get('ideaInput');
const hairstyleGallery = domCache.get('hairstyleGallery');
const filterButtons = domCache.get('filterButtons');
const modal = domCache.get('modal');
const modalImage = domCache.get('modalImage');
const closeModal = domCache.get('closeModal');
const removeImageBtn = domCache.get('removeImageBtn');
const previewContainer = domCache.get('previewContainer');
const previewImage = domCache.get('previewImage');
const fileName = domCache.get('fileName');
const cancelBtn = domCache.get('cancelBtn');
const mainResultBox = domCache.get('mainResultBox');

// 新增的DOM元素
const hairstyleDropArea = domCache.get('hairstyleDropArea');
const hairstyleFileInput = domCache.get('hairstyleFileInput');
const selectHairstyleImageBtn = domCache.get('selectHairstyleImageBtn');
const removeHairstyleImageBtn = domCache.get('removeHairstyleImageBtn');
const hairstylePreviewContainer = domCache.get('hairstylePreviewContainer');
const hairstylePreviewImage = domCache.get('hairstylePreviewImage');
const hairstyleFileName = domCache.get('hairstyleFileName');

// 创意想法框相关元素
const ideaDropArea = domCache.get('ideaDropArea');
const ideaPreviewContainer = domCache.get('ideaPreviewContainer');
const removeIdeaBtn = domCache.get('removeIdeaBtn');

// 新增状态变量
let hairstyleFile = null;
let ideaText = null;

// === 常量定义 ===
const WEBHOOK_URL = 'https://aimusicmo-n8n.hf.space/webhook-test/8a97d418-4dee-4e84-bbda-d8aa0ed5ce1f';
const TASK_TYPES = {
    GENERATE_BY_IDEA: '按创意生成',
    GENERATE_BY_HAIRSTYLE: '按发型生成'
};

// === 状态变量 ===
let selectedFile = null;

// === 用户次数管理系统 ===
const USER_USAGE_KEY = 'hair_ai_user_usage';
const DAILY_FREE_KEY = 'hair_ai_daily_free';

// 获取用户使用次数
function getUserUsage() {
    const usage = localStorage.getItem(USER_USAGE_KEY);
    return usage ? JSON.parse(usage) : { totalUsage: 0, purchasedUsage: 0 };
}

// 保存用户使用次数
function saveUserUsage(usage) {
    localStorage.setItem(USER_USAGE_KEY, JSON.stringify(usage));
}

// 获取今日免费使用状态
function getDailyFreeStatus() {
    const dailyData = localStorage.getItem(DAILY_FREE_KEY);
    if (!dailyData) {
        return { freeUsed: 0, totalFree: 2, date: new Date().toDateString() };
    }
    
    const data = JSON.parse(dailyData);
    const today = new Date().toDateString();
    
    // 如果是新的一天，重置状态（每天登录获得2次免费机会）
    if (data.date !== today) {
        return { freeUsed: 0, totalFree: 2, date: today };
    }
    
    return data;
}

// 保存今日免费使用状态
function saveDailyFreeStatus(status) {
    localStorage.setItem(DAILY_FREE_KEY, JSON.stringify(status));
}

// 获取可用次数
function getAvailableCount() {
    const usage = getUserUsage();
    const dailyStatus = getDailyFreeStatus();
    
    // 计算剩余免费次数
    const remainingFree = Math.max(0, dailyStatus.totalFree - dailyStatus.freeUsed);
    
    // 总可用次数 = 购买次数 + 剩余免费次数
    return usage.purchasedUsage + remainingFree;
}

// 使用一次（减少次数）
function useGeneration() {
    const usage = getUserUsage();
    const dailyStatus = getDailyFreeStatus();
    
    // 首先使用免费次数
    const remainingFree = Math.max(0, dailyStatus.totalFree - dailyStatus.freeUsed);
    if (remainingFree > 0) {
        dailyStatus.freeUsed++;
        saveDailyFreeStatus(dailyStatus);
        return true;
    }
    
    // 如果没有免费次数，使用购买次数
    if (usage.purchasedUsage > 0) {
        usage.purchasedUsage--;
        usage.totalUsage++;
        saveUserUsage(usage);
        return true;
    }
    
    return false; // 没有可用次数
}

// 购买次数
function purchaseUsage(count) {
    const usage = getUserUsage();
    usage.purchasedUsage += count;
    usage.totalUsage += count;
    saveUserUsage(usage);
    return usage.purchasedUsage;
}

// 获取按钮提示文本
function getButtonTooltip(type) {
    const dailyStatus = getDailyFreeStatus();
    const availableCount = getAvailableCount();
    
    if (availableCount > 0) {
        return `可用次数为${availableCount}`;
    } else {
        return "可用次数为0";
    }
}

// === 事件管理器 ===
class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    on(element, event, handler, options = {}) {
        const key = `${element.constructor.name}-${event}`;
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        
        const listenerInfo = { element, event, handler, options };
        this.listeners.get(key).push(listenerInfo);
        
        element.addEventListener(event, handler, options);
        return listenerInfo;
    }

    off(element, event, handler) {
        const key = `${element.constructor.name}-${event}`;
        const listeners = this.listeners.get(key);
        
        if (listeners) {
            const index = listeners.findIndex(l => l.element === element && l.handler === handler);
            if (index > -1) {
                listeners.splice(index, 1);
                element.removeEventListener(event, handler);
            }
        }
    }

    removeAll() {
        this.listeners.forEach((listeners) => {
            listeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
        });
        this.listeners.clear();
    }
}

// 创建全局事件管理器实例
const eventManager = new EventManager();

// === 自定义提示框函数（优化版） ===
function showCustomAlert(title, message, icon = 'fa-exclamation-circle') {
    // 移除已存在的提示框
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // 创建提示框元素
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="alert-title">${title}</div>
        <div class="alert-message">${message}</div>
        <button class="alert-btn" type="button">确定</button>
    `;

    // 添加到页面
    document.body.appendChild(alertDiv);

    // 获取按钮
    const alertBtn = alertDiv.querySelector('.alert-btn');
    
    // 使用事件管理器绑定事件
    const closeAlert = () => {
        alertDiv.remove();
        eventManager.off(alertBtn, 'click', closeAlert);
        document.removeEventListener('keydown', escHandler);
    };
    
    eventManager.on(alertBtn, 'click', closeAlert);

    // ESC键关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeAlert();
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // 自动关闭（可选）
    const autoCloseTimer = setTimeout(() => {
        if (document.body.contains(alertDiv)) {
            closeAlert();
        }
    }, 10000); // 10秒后自动关闭
    
    // 鼠标悬停时取消自动关闭
    eventManager.on(alertDiv, 'mouseenter', () => {
        clearTimeout(autoCloseTimer);
    });
}

// 图片上传功能
selectImageBtn.addEventListener('click', () => {
    fileInput.click();
});

// 拖拽上传功能
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

// 处理文件拖拽
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// 处理文件选择
fileInput.addEventListener('change', function() {
    handleFiles(this.files);
});

// 移除图片按钮功能
removeImageBtn.addEventListener('click', function() {
    previewContainer.style.display = 'none';
    fileInput.value = '';
    selectedFile = null;
    dropArea.querySelector('.upload-content').style.display = 'block';
});

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        
        // 使用新的验证器
        if (!Validator.validateFile(file)) {
            return;
        }
        
        selectedFile = file;

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            fileName.textContent = `${file.name} (${Utils.formatFileSize(file.size)})`;
            previewContainer.style.display = 'flex';
            dropArea.querySelector('.upload-content').style.display = 'none';
            console.log('图片已准备好上传:', file.name, '大小:', Utils.formatFileSize(file.size));
        }
        reader.readAsDataURL(file);
    }
}

// 发型图片上传功能
selectHairstyleImageBtn.addEventListener('click', () => {
    hairstyleFileInput.click();
});

// 拖拽上传功能 - 发型图片
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    hairstyleDropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    hairstyleDropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    hairstyleDropArea.addEventListener(eventName, unhighlight, false);
});

// 处理发型图片拖拽
hairstyleDropArea.addEventListener('drop', handleHairstyleDrop, false);

function handleHairstyleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleHairstyleFiles(files);
}

// 处理发型文件选择
hairstyleFileInput.addEventListener('change', function() {
    handleHairstyleFiles(this.files);
});

// 移除发型图片按钮功能
removeHairstyleImageBtn.addEventListener('click', function() {
    hairstylePreviewContainer.style.display = 'none';
    hairstyleFileInput.value = '';
    hairstyleFile = null;
    hairstyleDropArea.querySelector('.upload-content-small').style.display = 'block';
});

function handleHairstyleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        
        // 使用新的验证器
        if (!Validator.validateFile(file)) {
            return;
        }
        
        hairstyleFile = file;

        const reader = new FileReader();
        reader.onload = function(e) {
            hairstylePreviewImage.src = e.target.result;
            hairstyleFileName.textContent = `${file.name} (${Utils.formatFileSize(file.size)})`;
            hairstylePreviewContainer.style.display = 'flex';
            hairstyleDropArea.querySelector('.upload-content-small').style.display = 'none';
            console.log('发型图片已准备好上传:', file.name, '大小:', Utils.formatFileSize(file.size));
        }
        reader.readAsDataURL(file);
    }
}

// === 状态变量 ===
let currentTask = null;
let progressInterval = null;
let generatedImageUrl = null;
let generatedImageBlob = null;
let currentAbortController = null; // 用于中止fetch请求
let startTime = null; // 记录开始时间
let timerInterval = null; // 计时器间隔

// === 新增:重置主结果框的函数 ===
function resetMainResultBox() {
    const mainResultBox = document.getElementById('mainResultBox');
    mainResultBox.innerHTML = `
        <div class="placeholder">
            <i class="fas fa-spinner"></i>
            <p>生成的效果将显示在这里</p>
        </div>
        <div class="timer-container" style="display: none;">
            <div class="timer-message">生成需要时间，请耐心等待~</div>
            <div class="timer-display">00:00</div>
        </div>
    `;
}

// === 工具函数集合 ===
const Utils = {
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // 深拷贝
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    // 验证邮箱格式
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // 验证图片文件类型
    isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        return validTypes.includes(file.type);
    },

    // 压缩图片（简单实现）
    async compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                let { width, height } = img;
                
                // 计算新尺寸
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // 绘制压缩后的图片
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }
};

// === 验证器类 ===
class Validator {
    static validateInput() {
        if (currentTask) {
            showCustomAlert('任务进行中', '请先完成当前任务或点击"取消"', 'fa-clock');
            return false;
        }

        const idea = ideaInput.value.trim();
        if (!selectedFile) {
            showCustomAlert('缺少图片', '请先上传图片', 'fa-image');
            return false;
        }

        if (!idea) {
            showCustomAlert('缺少创意', '请输入您的创意想法', 'fa-lightbulb');
            return false;
        }

        return { idea };
    }

    static validateHairstyleInput() {
        if (currentTask) {
            showCustomAlert('任务进行中', '请先完成当前任务或点击"取消"', 'fa-clock');
            return false;
        }

        if (!selectedFile) {
            showCustomAlert('缺少正面照', '请先上传你的正面照', 'fa-user');
            return false;
        }

        if (!hairstyleFile) {
            showCustomAlert('缺少参考图片', '请上传发型图片作为参考', 'fa-cut');
            return false;
        }

        return true;
    }

    static validateFile(file) {
        if (!file) {
            showCustomAlert('文件错误', '请选择有效的文件', 'fa-file');
            return false;
        }

        if (!Utils.isValidImageFile(file)) {
            showCustomAlert('文件格式错误', '请选择图片文件(JPG或PNG格式)', 'fa-file-image');
            return false;
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            showCustomAlert('文件过大', `文件大小不能超过${Utils.formatFileSize(maxSize)}`, 'fa-file');
            return false;
        }

        return true;
    }
}

// 为了保持向后兼容，保留原有的函数名
function validateInput() {
    return Validator.validateInput();
}

function validateHairstyleInput() {
    return Validator.validateHairstyleInput();
}

// === 工具函数:显示计时器 ===
function showProgress() {
    const placeholder = mainResultBox.querySelector('.placeholder');
    const timerContainer = mainResultBox.querySelector('.timer-container');
    
    placeholder.style.display = 'none';
    timerContainer.style.display = 'flex';
    
    // 开始计时
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// === 工具函数:更新计时器 ===
function updateTimer() {
    if (!startTime) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const timerDisplay = mainResultBox.querySelector('.timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = formattedTime;
    }
}

// === 工具函数:停止计时器 ===
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// === 工具函数:更新按钮状态 ===
function updateButtonStates(cancelDisabled, downloadDisabled, isGenerating = false) {
    cancelBtn.disabled = cancelDisabled;
    downloadBtn.disabled = downloadDisabled;
    
    // 更新发型DIY按钮状态
    // 生成时禁用，只有当有生成的图片且不在生成状态时才启用
    const shouldEnableDIYBtn = !isGenerating && generatedImageBlob;
    hairstyleDIYBtn.disabled = !shouldEnableDIYBtn;
    
    // 根据状态添加或移除禁用样式
    if (!shouldEnableDIYBtn) {
        hairstyleDIYBtn.classList.add('btn-disabled');
        hairstyleDIYBtn.classList.remove('btn-gold');
    } else {
        hairstyleDIYBtn.classList.remove('btn-disabled');
        hairstyleDIYBtn.classList.add('btn-gold');
    }
}

// === 工具函数:发送取消请求到N8N ===
function sendCancelRequestToN8N() {
    // 创建取消请求的FormData
    const cancelFormData = new FormData();
    cancelFormData.append('type', 'cancel_task');
    cancelFormData.append('user_id', 'demo_user');
    cancelFormData.append('task_type', currentTask);
    
    // 发送取消请求到N8N
    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: cancelFormData
    })
    .then(response => {
        if (response.ok) {
            console.log('N8N任务取消请求发送成功');
        } else {
            console.log('N8N任务取消请求可能失败，但前端已取消');
        }
    })
    .catch(error => {
        console.log('发送取消请求失败:', error);
    });
}

// === 工具函数:处理N8N错误响应 ===
function handleN8NError(errorText, taskType) {
    console.error('N8N错误响应:', errorText);
    console.error('错误文本长度:', errorText ? errorText.length : 'null');
    console.error('任务类型:', taskType);
    
    // 停止计时器
    stopTimer();
    
    let alertTitle = '生成失败';
    let alertMessage = '';
    let alertIcon = 'fa-exclamation-triangle';
    
    // 确保errorText是字符串
    const errorStr = errorText ? String(errorText).trim() : '';
    
    if (!errorStr) {
        alertTitle = '生成失败';
        alertMessage = '服务器返回空错误信息，请稍后重试';
        alertIcon = 'fa-exclamation-triangle';
    } else if (errorStr.includes('内容违规') || errorStr.includes('content violation') || errorStr.includes('内容审核不通过') || errorStr.includes('Porn')) {
        alertTitle = '内容违规';
        alertMessage = '您提交的内容包含违规信息，请修改后重试';
        alertIcon = 'fa-exclamation-triangle';
    } else if (errorStr.includes('图片格式') || errorStr.includes('image format') || errorStr.includes('不支持的格式')) {
        alertTitle = '图片格式错误';
        alertMessage = '上传的图片格式不支持，请使用JPG或PNG格式的图片';
        alertIcon = 'fa-file-image';
    } else if (errorStr.includes('图片过大') || errorStr.includes('image too large') || errorStr.includes('文件过大')) {
        alertTitle = '文件过大';
        alertMessage = '上传的图片文件过大，请压缩后重新上传';
        alertIcon = 'fa-file';
    } else if (errorStr.includes('网络错误') || errorStr.includes('network error') || errorStr.includes('连接失败')) {
        alertTitle = '网络错误';
        alertMessage = '网络连接出现问题，请检查网络后重试';
        alertIcon = 'fa-wifi';
    } else if (errorStr.includes('服务器') || errorStr.includes('server') || errorStr.includes('内部错误')) {
        alertTitle = '服务器错误';
        alertMessage = '服务器暂时出现问题，请稍后重试';
        alertIcon = 'fa-server';
    } else if (errorStr.includes('余额不足') || errorStr.includes('insufficient') || errorStr.includes('次数不足')) {
        alertTitle = '次数不足';
        alertMessage = '您的可用次数不足，请购买次数后重试';
        alertIcon = 'fa-coins';
    } else {
        // 通用错误处理
        alertTitle = '生成失败';
        alertMessage = errorStr.length > 0 ? errorStr : '生成过程中出现未知错误，请重试';
        alertIcon = 'fa-exclamation-triangle';
    }
    
    console.log('准备显示提示框:', { alertTitle, alertMessage, alertIcon });
    
    // 显示错误提示
    showCustomAlert(alertTitle, alertMessage, alertIcon);
    
    // 重置界面状态
    resetMainResultBox();
    updateButtonStates(true, true);
    currentTask = null;
    startTime = null;
    
    // 注意：这里不扣减使用次数，因为生成失败了
}

// === 工具函数:验证图片Blob ===
function isValidImageBlob(blob) {
    if (!blob) return false;
    
    // 检查MIME类型
    if (blob.type && !blob.type.startsWith('image/')) {
        console.error('Blob类型不是图片:', blob.type);
        return false;
    }
    
    // 检查大小
    if (blob.size === 0) {
        console.error('Blob大小为0');
        return false;
    }
    
    // 检查是否为有效的图片数据（简单检查）
    return blob.size > 100; // 至少100字节
}

// === 工具函数:处理网络错误 ===
function handleNetworkError(error, taskType) {
    // 停止计时器
    stopTimer();
    
    console.error('网络请求失败:', error);
    
    // 如果是AbortError，说明是用户主动取消
    if (error.name === 'AbortError') {
        console.log('请求已被用户取消');
        return;
    }
    
    // 如果是已经处理的N8N业务错误，不再重复处理
    if (error.message && error.message.includes('N8N业务错误已处理')) {
        console.log('N8N业务错误已处理，跳过网络错误处理');
        return;
    }
    
    let alertTitle = '网络错误';
    let alertMessage = '网络连接出现问题，请检查网络后重试';
    let alertIcon = 'fa-wifi';
    
    showCustomAlert(alertTitle, alertMessage, alertIcon);
    resetMainResultBox();
    updateButtonStates(true, true);
    currentTask = null;
    startTime = null;
    
    // 注意：网络错误也不扣减使用次数
}

// === 通用图片生成处理函数(按创意生成) ===
function handleImageGeneration(taskType) {
    const validation = validateInput();
    if (!validation) return;

    const { idea } = validation;
    
    // 重置主结果框
    resetMainResultBox();
    
    // 设置当前任务
    currentTask = taskType;
    
    // 显示进度条
    showProgress();
    
    // 更新按钮状态 - 生成时禁用DIY按钮
    updateButtonStates(false, true, true);

    // 创建AbortController
    currentAbortController = new AbortController();

    // 发送请求
    const formData = new FormData();
    formData.append('type', taskType);
    formData.append('idea', idea);
    formData.append('image', selectedFile, selectedFile.name);
    formData.append('user_id', 'demo_user');

    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
        signal: currentAbortController.signal
    })
    .then(response => {
        console.log('响应状态:', response.status, response.ok);
        console.log('响应头:', response.headers);
        
        if (!response.ok) {
            return response.text().then(text => {
                // 使用新的错误处理函数
                handleN8NError(text, taskType);
                return Promise.reject(new Error('N8N错误'));
            });
        }
        
        // 检查响应内容类型
        const contentType = response.headers.get('content-type');
        console.log('响应内容类型:', contentType);
        
        if (!contentType || !contentType.includes('image')) {
            // 如果不是图片类型，读取为文本处理
            return response.text().then(text => {
                console.log('非图片响应内容:', text);
                // 调用handleN8NError处理错误
                handleN8NError(text || '服务器返回非图片数据', taskType);
                // 返回一个特殊的rejected promise，避免进入后续的then处理
                throw new Error('N8N业务错误已处理');
            });
        }
        
        return response.blob();
    })
    .then(blob => {
        console.log('收到Blob，大小:', blob.size, '类型:', blob.type);
        
        // 验证blob是否为有效图片
        if (!isValidImageBlob(blob)) {
            // 尝试读取blob内容作为错误信息
            return blob.text().then(text => {
                console.log('无效图片Blob内容:', text);
                handleN8NError(text || '返回的数据不是有效图片', taskType);
                return Promise.reject(new Error('无效图片数据'));
            }).catch(() => {
                // 如果无法读取为文本，使用通用错误
                handleN8NError('返回的数据不是有效图片格式', taskType);
                return Promise.reject(new Error('无效图片数据'));
            });
        }
        
        console.log('从 N8N 收到有效图片 Blob');
        const imageUrl = URL.createObjectURL(blob);
        showGeneratedImage(imageUrl, blob, taskType);
    })
    .catch(error => {
        // 使用新的网络错误处理函数
        handleNetworkError(error, taskType);
    })
    .finally(() => {
        currentAbortController = null;
    });
}

// === 处理按发型生成的函数 ===
function handleHairstyleImageGeneration() {
    if (!validateHairstyleInput()) return;
    
    // 重置主结果框
    resetMainResultBox();
    
    // 设置当前任务
    currentTask = TASK_TYPES.GENERATE_BY_HAIRSTYLE;
    
    // 显示进度条
    showProgress();
    
    // 更新按钮状态 - 生成时禁用DIY按钮
    updateButtonStates(false, true, true);

    // 创建AbortController
    currentAbortController = new AbortController();

    // 发送请求 - 使用发型图片作为参考
    const formData = new FormData();
    formData.append('type', TASK_TYPES.GENERATE_BY_HAIRSTYLE);
    formData.append('idea', '参考发型图片进行设计'); // 使用默认创意
    formData.append('image', selectedFile, selectedFile.name); // 用户的正面照
    formData.append('reference_image', hairstyleFile, hairstyleFile.name); // 发型参考图片
    formData.append('user_id', 'demo_user');

    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
        signal: currentAbortController.signal
    })
    .then(response => {
        console.log('发型生成响应状态:', response.status, response.ok);
        console.log('发型生成响应头:', response.headers);
        
        if (!response.ok) {
            return response.text().then(text => {
                // 使用新的错误处理函数
                handleN8NError(text, TASK_TYPES.GENERATE_BY_HAIRSTYLE);
                return Promise.reject(new Error('N8N错误'));
            });
        }
        
        // 检查响应内容类型
        const contentType = response.headers.get('content-type');
        console.log('发型生成响应内容类型:', contentType);
        
        if (!contentType || !contentType.includes('image')) {
            // 如果不是图片类型，读取为文本处理
            return response.text().then(text => {
                console.log('发型生成非图片响应内容:', text);
                handleN8NError(text || '服务器返回非图片数据', TASK_TYPES.GENERATE_BY_HAIRSTYLE);
                // 返回一个特殊的rejected promise，避免进入后续的then处理
                throw new Error('N8N业务错误已处理');
            });
        }
        
        return response.blob();
    })
    .then(blob => {
        console.log('发型生成收到Blob，大小:', blob.size, '类型:', blob.type);
        
        // 验证blob是否为有效图片
        if (!isValidImageBlob(blob)) {
            // 尝试读取blob内容作为错误信息
            return blob.text().then(text => {
                console.log('发型生成无效图片Blob内容:', text);
                handleN8NError(text || '返回的数据不是有效图片', TASK_TYPES.GENERATE_BY_HAIRSTYLE);
                return Promise.reject(new Error('无效图片数据'));
            }).catch(() => {
                // 如果无法读取为文本，使用通用错误
                handleN8NError('返回的数据不是有效图片格式', TASK_TYPES.GENERATE_BY_HAIRSTYLE);
                return Promise.reject(new Error('无效图片数据'));
            });
        }
        
        console.log('从 N8N 收到有效发型图片 Blob');
        const imageUrl = URL.createObjectURL(blob);
        showGeneratedImage(imageUrl, blob, TASK_TYPES.GENERATE_BY_HAIRSTYLE);
    })
    .catch(error => {
        // 使用新的网络错误处理函数
        handleNetworkError(error, TASK_TYPES.GENERATE_BY_HAIRSTYLE);
    })
    .finally(() => {
        currentAbortController = null;
    });
}

// === 新增:显示生成结果的函数 ===
function showGeneratedImage(imageUrl, blob, taskType) {
    // 停止计时器
    stopTimer();
    
    // 计算总用时
    const totalTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // 清空并显示图片
    mainResultBox.innerHTML = '';
    
    // 创建图片容器
    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    imageContainer.style.maxWidth = '100%';
    imageContainer.style.marginTop = '10px';
    
    // 创建图片
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    img.style.display = 'block';
    
    // 创建时间显示
    const timeDisplay = document.createElement('div');
    timeDisplay.style.position = 'absolute';
    timeDisplay.style.bottom = '10px';
    timeDisplay.style.right = '10px';
    timeDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    timeDisplay.style.color = 'white';
    timeDisplay.style.padding = '5px 10px';
    timeDisplay.style.borderRadius = '4px';
    timeDisplay.style.fontSize = '12px';
    timeDisplay.style.fontFamily = 'monospace';
    timeDisplay.textContent = `运行时长${formattedTime}`;
    
    // 组装元素
    imageContainer.appendChild(img);
    imageContainer.appendChild(timeDisplay);
    mainResultBox.appendChild(imageContainer);
    
    // 存储图片数据
    generatedImageBlob = blob;
    generatedImageUrl = imageUrl;
    
    // 成功生成图片后扣减次数
    if (!useGeneration()) {
        console.error('扣减次数失败，但图片已生成');
        // 即使扣减失败，也不影响图片显示，因为图片已经成功生成
    } else {
        console.log('成功扣减次数');
    }
    
    // 更新按钮提示
    updateButtonTooltips();
    
    // 更新按钮状态
    updateButtonStates(true, false);
    
    // 清除当前任务状态
    currentTask = null;
    startTime = null;
}

// === 购买模态框功能 ===
const purchaseModal = document.getElementById('purchaseModal');
const purchaseCloseBtn = document.querySelector('.purchase-close');
const purchaseUsageBtn = document.getElementById('purchaseUsageBtn');
const purchaseOptions = document.querySelectorAll('.purchase-option');

// 打开购买模态框
function openPurchaseModal() {
    purchaseModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭购买模态框
function closePurchaseModal() {
    purchaseModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 购买按钮点击事件
purchaseUsageBtn.addEventListener('click', openPurchaseModal);

// 关闭按钮点击事件
purchaseCloseBtn.addEventListener('click', closePurchaseModal);

// 点击模态框外部关闭
purchaseModal.addEventListener('click', (e) => {
    if (e.target === purchaseModal) {
        closePurchaseModal();
    }
});

// ESC键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && purchaseModal.style.display === 'block') {
        closePurchaseModal();
    }
});

// 购买选项点击事件
purchaseOptions.forEach(option => {
    option.addEventListener('click', function() {
        const price = this.getAttribute('data-price');
        const count = this.getAttribute('data-count');
        
        // 移除其他选项的选中状态
        purchaseOptions.forEach(opt => opt.classList.remove('selected'));
        // 添加当前选项的选中状态
        this.classList.add('selected');
        
        // 显示扫码提示，不直接增加次数
        showCustomAlert('扫码支付', `请扫描二维码支付${price}元，支付成功后次数将自动添加到您的账户`, 'fa-qrcode');
    });
});

// 模拟扫码成功支付函数（实际应用中应该由后端推送或轮询支付状态）
function simulatePaymentSuccess(price, count) {
    const newCount = purchaseUsage(parseInt(count));
    showCustomAlert('支付成功', `成功购买${count}次使用，当前可用次数：${newCount}`, 'fa-check-circle');
    closePurchaseModal();
    
    // 更新按钮提示
    updateButtonTooltips();
}

// 为测试添加手动触发支付成功的函数（实际应用中删除）
window.testPaymentSuccess = function(price, count) {
    simulatePaymentSuccess(price, count);
};

// 为测试添加手动触发N8N错误的函数（实际应用中删除）
window.testN8NError = function(errorText) {
    console.log('测试N8N错误:', errorText);
    handleN8NError(errorText, '按创意生成');
};

// 为测试添加手动触发网络错误的函数（实际应用中删除）
window.testNetworkError = function() {
    console.log('测试网络错误');
    handleNetworkError(new Error('模拟网络错误'), '按创意生成');
};

// === 按钮提示功能 ===
function updateButtonTooltips() {
    const ideaTooltip = getButtonTooltip('idea');
    const hairstyleTooltip = getButtonTooltip('hairstyle');
    
    // 更新现有的提示框内容
    const ideaTooltipElement = document.querySelector('#ideaTooltip');
    const hairstyleTooltipElement = document.querySelector('#hairstyleTooltip');
    
    if (ideaTooltipElement) {
        ideaTooltipElement.textContent = ideaTooltip;
    }
    if (hairstyleTooltipElement) {
        hairstyleTooltipElement.textContent = hairstyleTooltip;
    }
}

// === 创建按钮提示框 ===
function createButtonTooltip(buttonId, tooltipId) {
    const button = document.getElementById(buttonId);
    const container = button.closest('.generate-btn-container');
    
    // 创建提示框元素
    const tooltip = document.createElement('div');
    tooltip.className = 'button-tooltip';
    tooltip.id = tooltipId;
    tooltip.textContent = getButtonTooltip(buttonId === 'generateHairBtn' ? 'idea' : 'hairstyle');
    
    // 添加到容器中
    container.appendChild(tooltip);
    
    // 鼠标悬停显示提示框
    button.addEventListener('mouseenter', function() {
        // 更新提示内容
        tooltip.textContent = getButtonTooltip(buttonId === 'generateHairBtn' ? 'idea' : 'hairstyle');
        tooltip.classList.add('show');
    });
    
    // 鼠标离开隐藏提示框
    button.addEventListener('mouseleave', function() {
        tooltip.classList.remove('show');
    });
}

// === 检查次数并显示购买提示 ===
function checkUsageAndShowPurchase(type) {
    const availableCount = getAvailableCount();
    
    if (availableCount <= 0) {
        showCustomAlert('当前可用次数为0，请左下角购买次数', '当前可用次数为0，请左下角购买次数', 'fa-coins');
        
        return false;
    }
    
    return true;
}

// === 1. "按创意生成"按钮 ===
generateHairBtn.addEventListener('click', () => {
    if (!checkUsageAndShowPurchase('idea')) return;
    
    handleImageGeneration(TASK_TYPES.GENERATE_BY_IDEA);
});

// === 2. "按图片生成"按钮 ===
animeConvertBtn.addEventListener('click', () => {
    if (!checkUsageAndShowPurchase('hairstyle')) return;
    
    handleHairstyleImageGeneration();
});

// === 3. "取消"按钮 ===
cancelBtn.addEventListener('click', () => {
    if (!currentTask) {
        showCustomAlert('无任务', '当前无任务可取消', 'fa-info-circle');
        return;
    }

    // 停止计时器
    stopTimer();

    // 中止正在进行的fetch请求
    if (currentAbortController) {
        currentAbortController.abort();
        currentAbortController = null;
    }

    // 发送取消请求到N8N端
    sendCancelRequestToN8N();

    // 重置主结果框
    resetMainResultBox();

    // 更新按钮状态
    updateButtonStates(true, true);

    // 清除状态
    currentTask = null;
    generatedImageUrl = null;
    generatedImageBlob = null;
    startTime = null;

    showCustomAlert('任务取消', '任务已取消', 'fa-check-circle');
});

// === 4. "下载"按钮 ===
downloadBtn.disabled = true;
downloadBtn.addEventListener('click', () => {
    if (!generatedImageBlob) {
        showCustomAlert('无图片', '暂无图片可供下载', 'fa-download');
        return;
    }

    const link = document.createElement('a');
    link.href = URL.createObjectURL(generatedImageBlob);
    link.download = 'AI设计_' + Date.now() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// === 5. "发型DIY呈现方法"按钮 ===
hairstyleDIYBtn.addEventListener('click', () => {
    handleHairstyleDIYGeneration();
});

// === 处理发型DIY文字生成的函数 ===
function handleHairstyleDIYGeneration() {
    // 检查是否有生成的图片
    if (!generatedImageBlob) {
        showCustomAlert('提示', '请先生成图片', 'fa-info-circle');
        return;
    }
    
    // 检查是否有用户上传的正面照
    if (!selectedFile) {
        showCustomAlert('提示', '请先上传正面照', 'fa-user');
        return;
    }
    
    // 显示加载状态
    textModalContent.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">正在生成发型DIY呈现方法，请稍候...</div>';
    textModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 创建AbortController
    const diyAbortController = new AbortController();

    // 发送请求 - 同时发送用户上传的正面照和生成的图片
    const formData = new FormData();
    formData.append('type', '发型DIY呈现方法');
    formData.append('idea', '请基于用户上传的正面照和生成的发型图片，提供详细的DIY呈现方法和步骤说明'); // 特殊的创意文字
    formData.append('image', selectedFile, selectedFile.name); // 用户上传的正面照
    formData.append('generated_image', generatedImageBlob, 'generated_hairstyle.png'); // 生成的图片
    formData.append('user_id', 'demo_user');
    formData.append('response_type', 'text'); // 指定返回文字类型

    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
        signal: diyAbortController.signal
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                console.error('N8N Error Response:', text);
                throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
        }
        
        // 尝试获取响应类型
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else if (contentType && contentType.includes('text')) {
            return response.text();
        } else {
            // 如果是图片类型，转换为文字
            return response.blob().then(blob => {
                // 这里可以添加OCR或其他图片转文字的逻辑
                // 暂时返回默认文字
                return '发型DIY呈现方法已生成，但由于返回的是图片格式，无法直接显示文字内容。请联系技术支持获取详细的文字说明。';
            });
        }
    })
    .then(data => {
        console.log('从 N8N 收到DIY文字响应:', data);
        
        let displayText = '';
        if (typeof data === 'string') {
            displayText = data;
        } else if (data.text) {
            displayText = data.text;
        } else if (data.content) {
            displayText = data.content;
        } else {
            displayText = JSON.stringify(data, null, 2);
        }
        
        // 显示结果在模态框中
        textModalContent.innerHTML = `
            <div style="white-space: pre-wrap; line-height: 1.8;">${displayText}</div>
            <div style="margin-top: 15px; font-size: 12px; color: #666; text-align: right;">
                生成时间: ${new Date().toLocaleString()}
            </div>
        `;
    })
    .catch(error => {
        // 如果是手动取消的请求，不显示错误提示
        if (error.name === 'AbortError') {
            console.log('DIY请求已被用户取消');
            return;
        }
        
        console.error('DIY请求失败:', error);
        textModalContent.innerHTML = `
            <div style="color: #e74c3c; text-align: center; padding: 20px;">
                ❌ 生成失败: ${error.message}
            </div>
        `;
    })
    .finally(() => {
        // 清理
        diyAbortController = null;
    });
}

// 发型风格筛选功能
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterType = button.textContent;
        console.log('筛选类型:' + filterType);
    });
});

// 图片库点击功能
hairstyleGallery.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const imgSrc = galleryItem.querySelector('img').src;
        openModal(imgSrc);
    }
});

// 打开模态框
function openModal(src) {
    modalImage.src = src;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 关闭文字模态框
textCloseBtn.addEventListener('click', () => {
    textModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 移除点击文字模态框外部关闭功能 - 只能通过右上角X关闭
// textModal.addEventListener('click', (e) => {
//     if (e.target === textModal) {
//         textModal.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     }
// });

// 文字转图片下载功能
downloadTextBtn.addEventListener('click', () => {
    downloadTextAsImage();
});

// 菜单导航功能
const menuLinks = document.querySelectorAll('.main-nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        menuLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const menuText = this.textContent.trim();
        console.log('切换到:' + menuText);
    });
});

// 初始化功能
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成');
    
    // 初始化发型DIY按钮状态 - 页面加载时应该是禁用的
    updateButtonStates(true, true);
    
    // 创建按钮提示框
    createButtonTooltip('generateHairBtn', 'ideaTooltip');
    createButtonTooltip('animeConvertBtn', 'hairstyleTooltip');
    
    // 初始化按钮提示
    updateButtonTooltips();
});

// 创意想法框交互功能
ideaDropArea.addEventListener('click', function() {
    // 显示textarea和移除按钮
    document.querySelector('.upload-content-small.idea-content').style.display = 'none';
    ideaPreviewContainer.style.display = 'flex';
    ideaInput.focus(); // 自动聚焦到textarea
});

// 移除创意内容按钮功能
removeIdeaBtn.addEventListener('click', function() {
    ideaInput.value = '';
    ideaPreviewContainer.style.display = 'none';
    document.querySelector('.upload-content-small.idea-content').style.display = 'flex';
});

// 按钮波纹效果
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 300);
}

// === 文字转图片下载功能 ===
function downloadTextAsImage() {
    // 获取文字内容
    const textContent = textModalContent.innerText;
    if (!textContent || textContent.includes('正在生成') || textContent.includes('生成失败')) {
        showCustomAlert('提示', '暂无可下载的文字内容', 'fa-info-circle');
        return;
    }

    // 创建canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas参数
    const padding = 50;
    const lineHeight = 28;
    const maxWidth = 800;
    const fontSize = 16;
    const titleHeight = 60;
    const timestampHeight = 40;
    
    // 先设置字体以便正确测量文字宽度
    ctx.font = `${fontSize}px 'Microsoft YaHei', 'Segoe UI', sans-serif`;
    
    // 智能文字换行处理
    function wrapText(text, maxWidth) {
        const lines = [];
        const paragraphs = text.split('\n');
        
        paragraphs.forEach(paragraph => {
            if (paragraph.trim() === '') {
                lines.push('');
                return;
            }
            
            // 处理每个段落
            const words = paragraph.split('');
            let currentLine = '';
            
            for (let i = 0; i < words.length; i++) {
                const char = words[i];
                const testLine = currentLine + char;
                const metrics = ctx.measureText(testLine);
                
                if (metrics.width > maxWidth && currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = char;
                } else {
                    currentLine = testLine;
                }
            }
            
            if (currentLine) {
                lines.push(currentLine);
            }
        });
        
        return lines;
    }
    
    // 生成文字行
    const lines = wrapText(textContent, maxWidth - padding * 2);
    
    // 计算canvas高度 - 确保有足够空间
    const textHeight = lines.length * lineHeight;
    const canvasHeight = Math.max(400, textHeight + titleHeight + timestampHeight + padding * 2);
    
    // 设置canvas尺寸
    canvas.width = maxWidth;
    canvas.height = canvasHeight;
    
    // 重新设置字体（canvas尺寸改变后需要重新设置）
    ctx.font = `${fontSize}px 'Microsoft YaHei', 'Segoe UI', sans-serif`;
    ctx.textBaseline = 'top';
    
    // 绘制背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制装饰性边框
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
    
    // 绘制内边框
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // 绘制标题背景
    const gradient = ctx.createLinearGradient(0, 30, 0, 70);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(30, 30, canvas.width - 60, 40);
    
    // 绘制标题
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 24px \'Microsoft YaHei\', \'Segoe UI\', sans-serif';
    ctx.fillText('🎨 发型DIY呈现方法', padding, 50);
    
    // 绘制主文字内容
    ctx.fillStyle = '#333333';
    ctx.font = `${fontSize}px 'Microsoft YaHei', 'Segoe UI', sans-serif`;
    
    let currentY = titleHeight + padding;
    lines.forEach((line, index) => {
        if (line.trim() === '') {
            currentY += lineHeight / 2; // 空行间距小一些
        } else {
            ctx.fillText(line, padding, currentY);
            currentY += lineHeight;
        }
    });
    
    // 绘制底部时间戳背景
    const bottomGradient = ctx.createLinearGradient(0, canvasHeight - 50, 0, canvasHeight - 20);
    bottomGradient.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
    bottomGradient.addColorStop(1, 'rgba(212, 175, 55, 0.1)');
    ctx.fillStyle = bottomGradient;
    ctx.fillRect(30, canvasHeight - 50, canvas.width - 60, 30);
    
    // 绘制时间戳
    ctx.fillStyle = '#666666';
    ctx.font = '12px \'Microsoft YaHei\', \'Segoe UI\', sans-serif';
    const timestamp = new Date().toLocaleString();
    ctx.fillText(`生成时间: ${timestamp}`, padding, canvasHeight - 30);
    
    // 添加装饰性元素
    ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.font = '48px Arial';
    ctx.globalAlpha = 0.1;
    ctx.fillText('HAIR', canvas.width - 100, canvasHeight - 60);
    ctx.globalAlpha = 1.0;
    
    // 转换为图片并下载
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `发型DIY呈现方法_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showCustomAlert('下载成功', '文字图片已成功下载', 'fa-check-circle');
    }, 'image/png');
}

// === 发型咨询顾问功能 ===
const consultantModal = document.getElementById('consultantModal');
const consultantCloseBtn = document.querySelector('.consultant-close');
const consultantCloseFooterBtn = document.querySelector('.consultant-close-btn');
const consultantContactBtn = document.querySelector('.consultant-contact-btn');
const consultantBtn = document.getElementById('consultantBtn');

// 打开发型咨询顾问模态框
consultantBtn.addEventListener('click', function() {
    consultantModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('打开发型咨询顾问模态框');
});

// 关闭发型咨询顾问模态框 - 多种关闭方式
function closeConsultantModal() {
    consultantModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('关闭发型咨询顾问模态框');
}

// 点击关闭按钮
consultantCloseBtn.addEventListener('click', closeConsultantModal);

// 点击底部关闭按钮
consultantCloseFooterBtn.addEventListener('click', closeConsultantModal);

// 点击模态框外部关闭
consultantModal.addEventListener('click', function(e) {
    if (e.target === consultantModal) {
        closeConsultantModal();
    }
});

// ESC键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && consultantModal.style.display === 'block') {
        closeConsultantModal();
    }
});

// 移除添加顾问微信按钮的事件监听器（按钮已从HTML中移除）

// 为发型咨询顾问按钮添加菜单导航功能
consultantBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // 移除其他菜单项的active状态
    const menuLinks = document.querySelectorAll('.main-nav a');
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // 添加当前按钮的active状态
    this.classList.add('active');
    
    console.log('切换到: 发型咨询顾问');
});

// === 帮助中心功能 ===
const helpModal = document.getElementById('helpModal');
const helpCloseBtn = document.querySelector('.help-close');
const helpCloseFooterBtn = document.querySelector('.help-close-btn');
const helpCenterBtn = document.getElementById('helpCenterBtn');
const helpTabs = document.querySelectorAll('.help-tab');
const helpTabContents = document.querySelectorAll('.help-tab-content');

// 打开帮助中心模态框
helpCenterBtn.addEventListener('click', function() {
    helpModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('打开帮助中心模态框');
});

// 关闭帮助中心模态框 - 多种关闭方式
function closeHelpModal() {
    helpModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('关闭帮助中心模态框');
}

// 点击关闭按钮
helpCloseBtn.addEventListener('click', closeHelpModal);

// 点击底部关闭按钮
helpCloseFooterBtn.addEventListener('click', closeHelpModal);

// 点击模态框外部关闭
helpModal.addEventListener('click', function(e) {
    if (e.target === helpModal) {
        closeHelpModal();
    }
});

// ESC键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && helpModal.style.display === 'block') {
        closeHelpModal();
    }
});

// 帮助标签页切换功能
helpTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // 移除所有标签的active状态
        helpTabs.forEach(t => t.classList.remove('active'));
        helpTabContents.forEach(content => content.classList.remove('active'));
        
        // 添加当前标签的active状态
        this.classList.add('active');
        
        // 显示对应的内容
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        console.log('切换到帮助标签页:', targetTab);
    });
});

// 帮助中心内容搜索功能（可选增强）
function searchHelpContent(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        // 如果搜索词为空，显示所有内容
        helpTabContents.forEach(content => {
            const items = content.querySelectorAll('.help-item, .help-card, .tip-item');
            items.forEach(item => {
                item.style.display = '';
                item.style.opacity = '1';
            });
        });
        return;
    }
    
    const term = searchTerm.toLowerCase();
    
    helpTabContents.forEach(content => {
        const items = content.querySelectorAll('.help-item, .help-card, .tip-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(term)) {
                item.style.display = '';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0.3';
            }
        });
    });
}

// 为帮助中心添加键盘导航功能
document.addEventListener('keydown', function(e) {
    if (helpModal.style.display !== 'block') return;
    
    // 左右箭头键切换标签页
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.help-tab.active');
        const tabs = Array.from(helpTabs);
        const currentIndex = tabs.indexOf(activeTab);
        
        let nextIndex;
        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
            nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }
        
        tabs[nextIndex].click();
        e.preventDefault();
    }
    
    // Ctrl+F 快速搜索
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchTerm = prompt('在帮助中心搜索:');
        if (searchTerm !== null) {
            searchHelpContent(searchTerm);
        }
    }
});

// 帮助中心内容展开/收起功能（可选增强）
function toggleHelpSection(sectionElement) {
    const content = sectionElement.querySelector('.help-section-content');
    const toggle = sectionElement.querySelector('.help-section-toggle');
    
    if (content && toggle) {
        const isExpanded = content.style.display !== 'none';
        content.style.display = isExpanded ? 'none' : 'block';
        toggle.textContent = isExpanded ? '展开' : '收起';
        toggle.classList.toggle('expanded', !isExpanded);
    }
}

// 为帮助中心添加打印功能
function printHelpContent() {
    const activeTab = document.querySelector('.help-tab.active');
    const activeContent = document.querySelector('.help-tab-content.active');
    
    if (!activeContent) return;
    
    // 创建打印窗口
    const printWindow = window.open('', '_blank');
    const tabTitle = activeTab ? activeTab.textContent : '帮助中心';
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${tabTitle} - 森林AI发型设计帮助中心</title>
            <style>
                body { font-family: 'Microsoft YaHei', sans-serif; line-height: 1.6; margin: 20px; }
                h1, h2, h3, h4 { color: #10b981; }
                .help-item { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .help-number { display: inline-block; width: 30px; height: 30px; background: #10b981; color: white; text-align: center; line-height: 30px; border-radius: 50%; margin-right: 10px; }
                .help-card { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .tip-item { margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-radius: 5px; }
                @media print { body { margin: 10px; } }
            </style>
        </head>
        <body>
            <h1>${tabTitle}</h1>
            ${activeContent.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// 为帮助中心添加快捷键提示
function showHelpShortcuts() {
    const shortcuts = [
        'ESC - 关闭帮助中心',
        '← → - 切换标签页',
        'Ctrl+F - 搜索内容',
        'Ctrl+P - 打印当前页面'
    ];
    
    showCustomAlert('快捷键帮助', shortcuts.join('\n'), 'fa-keyboard');
}

// 在帮助中心加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为帮助中心添加初始化逻辑
    console.log('帮助中心功能已加载');
    
    // 可以在这里添加更多初始化代码
    // 例如：记录帮助中心使用统计、个性化推荐等
});
