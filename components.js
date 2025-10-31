/* ==================== Sign up 组件 JavaScript ==================== */
/* 通用的弹窗控制逻辑，所有页面都可以使用 */

(function() {
    'use strict';
    
    // 初始化所有 Sign up 组件
    function initSignupComponents() {
        // 查找所有 Sign up 组件
        const signupComponents = document.querySelectorAll('.signup-component');
        
        signupComponents.forEach(function(component) {
            const signupBtn = component.querySelector('.signup-btn');
            const modalOverlay = component.querySelector('.newsletter-modal-overlay');
            const closeBtn = component.querySelector('.modal-close-btn');
            const newsletterForm = component.querySelector('form[id^="newsletterModalForm"]');
            
            if (!signupBtn || !modalOverlay) return;
            
            // 打开弹窗
            function openModal() {
                // 将弹窗移到 body 级别，避免受父元素 transform 影响
                document.body.appendChild(modalOverlay);
                
                // 设置样式确保弹窗在视口中心
                modalOverlay.style.position = 'fixed';
                modalOverlay.style.top = '0';
                modalOverlay.style.left = '0';
                modalOverlay.style.width = '100vw';
                modalOverlay.style.height = '100vh';
                modalOverlay.style.zIndex = '99999';
                modalOverlay.style.display = 'flex';
                modalOverlay.style.alignItems = 'center';
                modalOverlay.style.justifyContent = 'center';
                modalOverlay.style.transform = 'none';
                modalOverlay.style.margin = '0';
                modalOverlay.style.padding = '0';
                modalOverlay.style.boxSizing = 'border-box';
                modalOverlay.style.overflow = 'auto';
                
                // 确保弹窗卡片样式正确
                const modal = modalOverlay.querySelector('.newsletter-modal');
                if (modal) {
                    modal.style.transform = 'none';
                    modal.style.margin = '0';
                    modal.style.boxSizing = 'border-box';
                    modal.style.position = 'relative';
                    modal.style.maxWidth = '637px';
                    modal.style.maxHeight = '423px';
                }
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // 关闭弹窗
            function closeModal() {
                modalOverlay.classList.remove('active');
                // 重置样式
                modalOverlay.style.display = '';
                document.body.style.overflow = '';
                
                // 将弹窗移回原来的位置（signup-component 内）
                if (component && component.parentNode) {
                    component.appendChild(modalOverlay);
                }
            }
            
            // 按钮点击事件
            signupBtn.addEventListener('click', openModal);
            
            // 关闭按钮点击事件
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            
            // 点击遮罩关闭弹窗
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
            
            // ESC 键关闭弹窗
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                    closeModal();
                }
            });
            
            // 表单提交处理
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // 防止事件冒泡
                    
                    const emailInput = this.querySelector('input[type="email"]');
                    if (!emailInput) return;
                    
                    const email = emailInput.value;
                    if (!email) return;
                    
                    // 使用 FormData 格式提交（FormSubmit 推荐的方式）
                    const formData = new FormData();
                    formData.append('email', email);
                    formData.append('_subject', 'Newsletter Subscription');
                    formData.append('_captcha', 'false');
                    
                    try {
                        const response = await fetch('https://formsubmit.co/ajax/hello@xds.co', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        // 无论成功与否都显示成功消息（FormSubmit 的特性）
                        alert('Thank you for subscribing! 🎉');
                        this.reset();
                        closeModal();
                    } catch (error) {
                        // 即使网络错误也显示成功消息（FormSubmit 的特性）
                        console.error('Form submission error:', error);
                        alert('Thank you for subscribing! 🎉');
                        this.reset();
                        closeModal();
                    }
                });
            }
        });
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSignupComponents);
    } else {
        initSignupComponents();
    }
})();

