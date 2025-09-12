// JavaScript для видалення рекламних блоків ReadTheDocs

(function() {
    'use strict';

    // Функція для видалення елементів за селектором
    function removeElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }

    // Функція для видалення елементів що містять певний текст
    function removeElementsWithText(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.textContent && el.textContent.includes(text)) {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }

    // Функція для приховування елементів
    function hideElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.height = '0';
            el.style.width = '0';
            el.style.margin = '0';
            el.style.padding = '0';
        });
    }

    // Основна функція видалення реклами
    function removeAds() {
        // Список селекторів для видалення
        const adSelectors = [
            '.ethical-ads',
            '.ethical-ads-container',
            '.carbonads',
            '.carbon-ads',
            '[data-ea-publisher]',
            '[data-ea-type]',
            '.ea-content',
            '.ea-callout',
            '.ea-placement',
            'div[class*="ethical" i]',
            'div[id*="ethical" i]',
            'div[class*="carbon" i]',
            'div[id*="carbon" i]',
            'iframe[src*="ads"]',
            'iframe[src*="carbon"]',
            'iframe[src*="ethical"]'
        ];

        // Видаляємо елементи за селекторами
        adSelectors.forEach(selector => {
            removeElements(selector);
        });

        // Видаляємо елементи що містять рекламний текст
        removeElementsWithText('div', 'Ad by EthicalAds');
        removeElementsWithText('div', 'Advertisement');
        removeElementsWithText('div', 'Sponsored');

        // Перевіряємо бокову панель на наявність реклами
        const sideNav = document.querySelector('.wy-nav-side');
        if (sideNav) {
            const children = sideNav.children;
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i];
                
                // Пропускаємо важливі елементи навігації
                if (child.classList.contains('wy-side-nav-search') || 
                    child.classList.contains('wy-menu') ||
                    child.classList.contains('wy-menu-vertical')) {
                    continue;
                }
                
                // Видаляємо підозрілі елементи
                if (child.textContent && (
                    child.textContent.includes('Ad by') ||
                    child.textContent.includes('Advertisement') ||
                    child.textContent.includes('Sponsored') ||
                    child.textContent.includes('EthicalAds')
                )) {
                    child.remove();
                } else if (child.style.background || 
                          child.style.backgroundColor ||
                          child.getAttribute('style')?.includes('background')) {
                    // Видаляємо div з фоновими стилями (часто реклама)
                    child.remove();
                }
            }
        }

        console.log('ReadTheDocs ads removal script executed');
    }

    // MutationObserver для відстеження динамічно додаваних елементів
    function setupMutationObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Перевіряємо чи новий елемент - реклама
                            const isAd = node.classList && (
                                node.classList.contains('ethical-ads') ||
                                node.classList.contains('carbonads') ||
                                node.textContent?.includes('Ad by')
                            );
                            
                            if (isAd) {
                                node.remove();
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Запускаємо після завантаження DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            removeAds();
            setupMutationObserver();
            
            // Повторно запускаємо через 1 секунду для динамічно завантажуваної реклами
            setTimeout(removeAds, 1000);
            setTimeout(removeAds, 3000);
        });
    } else {
        removeAds();
        setupMutationObserver();
        setTimeout(removeAds, 1000);
    }

    // Додаємо обробник для зміни хешу (навігація)
    window.addEventListener('hashchange', function() {
        setTimeout(removeAds, 500);
    });

})();
