// JavaScript для видалення рекламних блоків та версійних елементів ReadTheDocs

(function() {
    'use strict';

    // Функція для видалення елементів за селектором
    function removeElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // НЕ видаляємо заголовок проекту та пошукове поле
            if (el && el.parentNode && 
                !el.classList.contains('wy-side-nav-search') &&
                !el.closest('.wy-side-nav-search')) {
                el.parentNode.removeChild(el);
            }
        });
    }

    // Функція для видалення елементів що містять певний текст
    function removeElementsWithText(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.textContent && el.textContent.includes(text)) {
                // НЕ видаляємо заголовок проекту
                if (el && el.parentNode && 
                    !el.classList.contains('wy-side-nav-search') &&
                    !el.closest('.wy-side-nav-search')) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }

    // Функція для приховування елементів
    function hideElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // НЕ приховуємо заголовок проекту та пошукове поле
            if (!el.classList.contains('wy-side-nav-search') &&
                !el.closest('.wy-side-nav-search')) {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.height = '0';
                el.style.width = '0';
                el.style.margin = '0';
                el.style.padding = '0';
            }
        });
    }

    // Основна функція видалення реклами та версійних елементів
    function removeAdsAndVersions() {
        // Список селекторів для видалення реклами
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

        // Список селекторів для видалення версійних елементів
        const versionSelectors = [
            '.rst-versions',
            '.rst-other-versions', 
            '.rst-current-version',
            '.wy-nav-top',
            '.wy-side-nav-search .version',  // Більш специфічний селектор
            '.version-info',
            'div[data-toggle="rst-versions"]',
            '.rst-versions.rst-badge',
            '.theme-switcher',
            '.rst-versions div[class*="version"]',  // Більш специфічний
            '.rst-versions span[class*="version"]',  // Більш специфічний
            '.badge',
            '.label-version'
        ];

        // Видаляємо рекламні елементи
        adSelectors.forEach(selector => {
            removeElements(selector);
        });

        // Видаляємо версійні елементи
        versionSelectors.forEach(selector => {
            removeElements(selector);
        });

        // Видаляємо елементи що містять рекламний текст
        removeElementsWithText('div', 'Ad by EthicalAds');
        removeElementsWithText('div', 'Advertisement');
        removeElementsWithText('div', 'Sponsored');

        // Видаляємо елементи що містять версійний текст - але НЕ заголовок проекту
        const versionTextSelectors = ['.rst-versions', '.version', '.badge'];
        versionTextSelectors.forEach(selector => {
            removeElementsWithText(selector, 'latest');
        });

        // Перевіряємо бокову панель на наявність реклами та версійних елементів
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
                } else if (!child.classList.contains('wy-side-nav-search') && 
                          (child.style.background || 
                          child.style.backgroundColor ||
                          child.getAttribute('style')?.includes('background'))) {
                    // Видаляємо div з фоновими стилями (часто реклама)
                    child.remove();
                }
            }
        }

        // Видаляємо ReadTheDocs floating badge
        const readTheDocsBadge = document.querySelector('.rst-versions.rst-badge');
        if (readTheDocsBadge) {
            readTheDocsBadge.remove();
        }

        // Компенсуємо відсутність верхньої панелі
        const contentWrap = document.querySelector('.wy-nav-content-wrap');
        if (contentWrap) {
            contentWrap.style.marginTop = '0';
        }

        const sideNavElement = document.querySelector('.wy-nav-side');
        if (sideNavElement) {
            sideNavElement.style.top = '0';
        }

        // Забезпечуємо видимість заголовка проекту
        const searchBox = document.querySelector('.wy-side-nav-search');
        if (searchBox) {
            searchBox.style.display = 'block';
            searchBox.style.visibility = 'visible';
        }

        const searchLink = document.querySelector('.wy-side-nav-search > a');
        if (searchLink) {
            searchLink.style.display = 'flex';
            searchLink.style.visibility = 'visible';
        }

        console.log('ReadTheDocs ads and version removal script executed');
    }

    // MutationObserver для відстеження динамічно додаваних елементів
    function setupMutationObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Не видаляємо елементи з пошукового блоку
                            if (node.closest('.wy-side-nav-search')) {
                                return;
                            }
                            
                            // Перевіряємо чи новий елемент - реклама або версійний елемент
                            const isAdOrVersion = node.classList && (
                                node.classList.contains('ethical-ads') ||
                                node.classList.contains('carbonads') ||
                                node.classList.contains('rst-versions') ||
                                node.classList.contains('version')
                            );
                            
                            if (isAdOrVersion) {
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
            removeAdsAndVersions();
            setupMutationObserver();
            
            // Повторно запускаємо через певні інтервали для динамічно завантажуваних елементів
            setTimeout(removeAdsAndVersions, 1000);
            setTimeout(removeAdsAndVersions, 3000);
            setTimeout(removeAdsAndVersions, 5000);
        });
    } else {
        removeAdsAndVersions();
        setupMutationObserver();
        setTimeout(removeAdsAndVersions, 1000);
        setTimeout(removeAdsAndVersions, 3000);
    }

    // Додаємо обробник для зміни хешу (навігація)
    window.addEventListener('hashchange', function() {
        setTimeout(removeAdsAndVersions, 500);
    });

    // Додаємо обробник для зміни історії браузера
    window.addEventListener('popstate', function() {
        setTimeout(removeAdsAndVersions, 500);
    });

})();
