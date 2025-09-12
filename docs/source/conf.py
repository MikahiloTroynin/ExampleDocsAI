# Configuration file for the Sphinx documentation builder.

# -- Project information

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

# Додаємо кастомний CSS та JS для приховування реклами та версії
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
    'display_version': False,  # ЗМІНЕНО: приховуємо відображення версії
    'prev_next_buttons_location': None,  # Прибираємо кнопки Previous/Next
    'style_external_links': False,
    'style_nav_header_background': '#2980B9',
    # Ключові налаштування для контролю навігації
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 1,  # Показувати лише перший рівень
    'includehidden': True,
    'titles_only': True     # Показувати лише заголовки документів
}

# ============= ДОДАТКОВІ НАЛАШТУВАННЯ ДЛЯ ПРИХОВУВАННЯ ПІДВАЛА =============

# Прибираємо copyright з підвала
html_show_copyright = False

# Прибираємо посилання на Sphinx в підвалі
html_show_sphinx = False

# -- Options for EPUB output
epub_show_urls = 'footnote'

# ============= НАЛАШТУВАННЯ ДЛЯ READTHEDOCS =============

# Контекст для ReadTheDocs - приховуємо версійні елементи
html_context = {
    'display_github': False,
    'display_bitbucket': False,
    'display_gitlab': False,
    'conf_py_path': '/docs/source/',
    'github_user': '',
    'github_repo': '',
    'github_version': '',
    'commit': False,
    'show_related': False,
    'rtd_language': 'en',
    'programming_language': 'python',
    # Приховуємо версійний селектор ReadTheDocs
    'versions': [],
    'downloads': [],
}
