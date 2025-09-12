# Configuration file for the Sphinx documentation builder.

# -- Project information
# Configuration file for the Sphinx documentation builder.

# -- Project information

project = 'Portfolio Troynin Mikhailo'
# Видаляємо copyright або залишаємо порожнім
copyright = ''  # Або можна повністю видалити цей рядок
author = 'Graziella'

release = '0.1'
# version = '0.1.0'

# -- General configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
]

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']

# Приховуємо посилання на джерело сторінки
html_show_sourcelink = False

# -- Options for HTML output

html_theme = 'sphinx_rtd_theme'

# Додаємо кастомний CSS та JS для приховування реклами
html_static_path = ['_static']
html_css_files = [
    'custom.css',
]
html_js_files = [
    'remove-ads.js',
]

# Додаткові опції для теми RTD
html_theme_options = {
    'analytics_id': '',  # Власний Google Analytics ID (опціонально)
    'analytics_anonymize_ip': False,
    'logo_only': False,
    'display_version': True,
    'prev_next_buttons_location': None,  # Прибираємо кнопки Previous/Next
    'style_external_links': False,
    'style_nav_header_background': '#2980B9',
    # Ключові налаштування для контролю навігації
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 1,  # Змінено з 4 на 1 - показувати лише перший рівень
    'includehidden': True,
    'titles_only': True     # Змінено з False на True - показувати лише заголовки документів
}

# -- Options for EPUB output
epub_show_urls = 'footnote'

# ============= ДОДАТКОВІ НАЛАШТУВАННЯ ДЛЯ ПРИХОВУВАННЯ ПІДВАЛА =============

# Прибираємо copyright з підвала
html_show_copyright = False

# Прибираємо посилання на Sphinx в підвалі
html_show_sphinx = False

# Можна також додати власний підвал (якщо потрібно)
# html_last_updated_fmt = ''
project = 'Portfolio Troynin Mikhailo'
copyright = '2021, Graziella'
author = 'Graziella'

release = '0.1'
# version = '0.1.0'

# -- General configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
]

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']

# Приховуємо посилання на джерело сторінки
html_show_sourcelink = False

# -- Options for HTML output

html_theme = 'sphinx_rtd_theme'

# Додаємо кастомний CSS та JS для приховування реклами
html_static_path = ['_static']
html_css_files = [
    'custom.css',
]
html_js_files = [
    'remove-ads.js',
]

# Додаткові опції для теми RTD
html_theme_options = {
    'analytics_id': '',  # Власний Google Analytics ID (опціонально)
    'analytics_anonymize_ip': False,
    'logo_only': False,
    'display_version': True,
    'prev_next_buttons_location': None,  # Прибираємо кнопки Previous/Next
    'style_external_links': False,
    'style_nav_header_background': '#2980B9',
    # Ключові налаштування для контролю навігації
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 1,  # Змінено з 4 на 1 - показувати лише перший рівень
    'includehidden': True,
    'titles_only': True     # Змінено з False на True - показувати лише заголовки документів
}

# -- Options for EPUB output
epub_show_urls = 'footnote'
