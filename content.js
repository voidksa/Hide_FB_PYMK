// Texts to search for in section headers to hide them
// النصوص التي نريد البحث عنها في عناوين الأقسام لإخفائها
// Add English and Arabic to ensure it works in either language
// نضيف الإنجليزية والعربية لضمان عملها بأي لغة
const targetPhrases = [
    "People You May Know",
    "أشخاص قد تعرفهم"
];

function hidePYMKSections() {
    // Facebook sometimes uses h2 or span tags for headers
    // فيسبوك يستخدم أحياناً وسوم h2 أو span للعناوين
    // Search for all elements that might contain the text
    // نبحث عن كل العناصر التي قد تحتوي على النص
    const potentialHeaders = document.querySelectorAll('h2 span, span[dir="auto"]');

    potentialHeaders.forEach(element => {
        // Get the text content inside the element
        // للحصول على النص الموجود داخل العنصر
        const textContent = element.innerText || element.textContent;

        // Check if the text contains any of the target phrases
        // التحقق مما إذا كان النص يحتوي على إحدى العبارات المستهدفة
        // Use some to check for any of the phrases in the array
        // نستخدم some للتحقق من وجود أي من العبارات في المصفوفة
        const isMatch = targetPhrases.some(phrase => textContent && textContent.includes(phrase));

        if (isMatch) {
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
                    // Check if it looks like a generic wrapper (sanity check)
                    if (grandParent.tagName === 'DIV') {
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
