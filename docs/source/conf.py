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
    'prev_next_buttons_location': 'bottom',
    'style_external_links': False,
    'style_nav_header_background': '#2980B9',
    # Важливі налаштування для контролю контенту
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False
}

# -- Options for EPUB output
epub_show_urls = 'footnote'
