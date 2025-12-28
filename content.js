// Texts to search for in section headers to hide them
// النصوص التي نريد البحث عنها في عناوين الأقسام لإخفائها
// Add English and Arabic to ensure it works in either language
// نضيف الإنجليزية والعربية لضمان عملها بأي لغة
const targetPhrases = [
    "People You May Know",
    "أشخاص قد تعرفهم",
    "Show Recommendations",
    "See recommendations",
    "عرض التوصيات"
];

function hidePYMKSections() {
    // Facebook sometimes uses h2 or span tags for headers, or buttons with aria-label
    // فيسبوك يستخدم أحياناً وسوم h2 أو span للعناوين، أو أزرار مع aria-label
    // Search for all elements that might contain the text
    // نبحث عن كل العناصر التي قد تحتوي على النص
    const potentialHeaders = document.querySelectorAll('h2 span, span[dir="auto"], [role="button"][aria-label]');

    potentialHeaders.forEach(element => {
        // Get the text content inside the element or its aria-label
        // للحصول على النص الموجود داخل العنصر أو النص البديل
        const textContent = element.getAttribute('aria-label') || element.innerText || element.textContent;

        // Check if the text contains any of the target phrases
        // التحقق مما إذا كان النص يحتوي على إحدى العبارات المستهدفة
        // Use some to check for any of the phrases in the array
        // نستخدم some للتحقق من وجود أي من العبارات في المصفوفة
        const isMatch = targetPhrases.some(phrase => textContent && textContent.includes(phrase));

        if (isMatch) {
            // CRITICAL FIX: Ignore if the element is inside a user post (article) or button (unless it IS the button we want)
            // إصلاح هام: تجاهل العنصر إذا كان داخل منشور مستخدم (article)

            // If the element ITSELF is the button we found via aria-label, we proceed.
            // But if we found text INSIDE a button, we need to be careful.
            // However, our selector `[role="button"][aria-label]` finds the button itself.
            // `h2 span` finds text.

            // We should still ignore matches inside ARTICLES (posts).
            if (element.closest('[role="article"]') || element.isContentEditable) {
                return;
            }

            // If the element is a button found by aria-label, it's valid to hide it.
            // But if it's text inside a generic button (like "Like" button text), we might want to skip?
            // "Show Recommendations" is specific enough.

            // Check if this is a direct button match (like the Profile "See recommendations" button)
            // التحقق مما إذا كان هذا زر مباشر (مثل زر "عرض التوصيات" في الصفحة الشخصية)
            if (element.getAttribute('role') === 'button' && element.getAttribute('aria-label')) {
                // This is a button with aria-label that matches our target - hide it directly
                // هذا زر مع aria-label يطابق هدفنا - أخفه مباشرة
                if (element.style.display !== 'none') {
                    element.style.display = 'none';
                    // Also try to hide the wrapper div if it exists (the xdwrcjd container)
                    // أخفِ أيضاً حاوية الغلاف إذا كانت موجودة
                    const wrapper = element.closest('.xdwrcjd');
                    if (wrapper && wrapper.style.display !== 'none') {
                        wrapper.style.display = 'none';
                    }
                    console.log('Hidden button with aria-label:', element.getAttribute('aria-label'));
                    return; // Skip the card container logic since we already hid the button
                }
            }

            // Header found! Now find the full "card" containing it
            // لقد وجدنا العنوان! الآن نحتاج العثور على "البطاقة" الكاملة التي تحتويه
            // Based on HTML structure, the main card container has a style with border-radius
            // بناءً على كود HTML، الحاوية الرئيسية للبطاقة تمتلك خاصية style تتضمن border-radius
            // Use closest to search up the DOM for the nearest parent with this property
            // نستخدم closest للبحث صعوداً في الهيكل عن أقرب أب يمتلك هذه الخاصية
            const cardContainer = element.closest('div[style*="border-radius"]');

            if (cardContainer) {
                // To avoid "long line" or empty space, we need to hide the parent container as well if it's a wrapper
                // لتجنب ظهور "خط طويل" أو مساحة فارغة، نحتاج لإخفاء الحاوية الأب أيضاً إذا كانت مجرد غلاف

                // Let's look for a higher-level container. Usually 2-3 levels up from the card is the main Feed Unit
                // عادةً ما تكون وحدة التغذية الرئيسية أعلى بمستويين أو ثلاثة من البطاقة

                // Traverse up to find the main feed unit wrapper
                // نصعد للأعلى للعثور على غلاف وحدة التغذية الرئيسي
                // We'll try to find a parent that looks like a structural wrapper
                let containerToHide = cardContainer;

                // Try to go up 2 levels to find the main wrapper (div.x1exxf4d...)
                // نحاول الصعود مستويين للأعلى للعثور على الغلاف الرئيسي
                if (cardContainer.parentElement && cardContainer.parentElement.parentElement) {
                    const grandParent = cardContainer.parentElement.parentElement;
                    // Check if it looks like a generic wrapper (sanity check) and NOT an article
                    // التحقق من أنه غلاف عام وليس منشور
                    if (grandParent.tagName === 'DIV' && grandParent.getAttribute('role') !== 'article') {
                        containerToHide = grandParent;
                    }
                }

                if (containerToHide.style.display !== 'none') {
                    containerToHide.style.display = 'none';
                    // Mark the element to identify it
                    containerToHide.setAttribute('data-pymk-hidden', 'true');
                    console.log('Hidden "People You May Know" section and its container.');
                    console.log('تم إخفاء قسم "أشخاص قد تعرفهم" وحاويته.');
                }
            } else if (element.getAttribute('role') === 'button') {
                // Enhanced fallback: If no card container found, but it's a button match, hide it more thoroughly
                // حالة احتياطية محسّنة: إذا لم يتم العثور على حاوية بطاقة، لكنه زر مطابق، أخفِه بشكل أشمل
                if (element.style.display !== 'none') {
                    element.style.display = 'none';
                    // Try to hide multiple parent levels for profile buttons
                    // محاولة إخفاء مستويات أب متعددة لأزرار الصفحة الشخصية
                    let currentElement = element.parentElement;
                    let levels = 0;
                    while (currentElement && levels < 3) {
                        if (currentElement.childElementCount === 1 && currentElement.style.display !== 'none') {
                            currentElement.style.display = 'none';
                        }
                        currentElement = currentElement.parentElement;
                        levels++;
                    }
                    // Also try to hide the specific wrapper class if found
                    // أيضاً محاولة إخفاء فئة الغلاف المحددة إذا تم العثور عليها
                    const specificWrapper = element.closest('.xdwrcjd');
                    if (specificWrapper && specificWrapper.style.display !== 'none') {
                        specificWrapper.style.display = 'none';
                    }
                    console.log('Hidden "Show Recommendations" button and wrappers.');
                }
            }
        }
    });
}

// Initial run
// تشغيل أولي
hidePYMKSections();

// Also run on DOMContentLoaded to catch elements loaded during initial parsing
// تشغيل عند اكتمال تحميل هيكل الصفحة
window.addEventListener('DOMContentLoaded', hidePYMKSections);

// Facebook loads content dynamically on scroll (Infinite Scroll)
// فيسبوك يقوم بتحميل المحتوى ديناميكياً عند التمرير
// So we need a MutationObserver to watch for page changes and run the hiding code again
// لذلك نحتاج لمراقب (MutationObserver) لمراقبة أي تغييرات في الصفحة وتشغيل كود الإخفاء مجدداً
const observer = new MutationObserver((mutations) => {
    // Run hiding logic on every mutation to be aggressive and fast
    // تشغيل كود الإخفاء مع كل تغيير ليكون سريعاً وفعالاً
    let shouldRun = false;
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            shouldRun = true;
            break;
        }
    }
    if (shouldRun) {
        hidePYMKSections();
    }
});

// Start observing the entire document
// بدء المراقبة على جسم الصفحة بالكامل أو العنصر الجذري
// We use document.documentElement to ensure we catch changes from the very beginning (document_start)
// نستخدم document.documentElement لضمان التقاط التغييرات منذ البداية
const targetNode = document.documentElement;

observer.observe(targetNode, {
    childList: true,
    subtree: true
});
