activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :livereload
activate :syntax

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'

configure :build do
  activate :minify_css
  activate :minify_javascript
end

activate :external_pipeline,
         name: :webpack,
         command: build? ? "npm run build" : "npm run start",
         source: "build",
         latency: 1
