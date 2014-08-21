source 'https://rubygems.org'

# Set Ruby version *recommended 2.0.0 for Heroku
ruby '2.0.0'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.4'
# Use postgresql as the database for Active Record
gem 'pg'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc
# For API calls
gem 'httparty'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'
# For storing images in database
gem 'paperclip', '~> 4.2'
# For Javascript Templating
gem 'handlebars_assets'
# Generate seed data
gem 'faker'

group :production do
  gem 'unicorn'
  gem 'rails_12factor'
end

group :development do
  gem 'spring'
  gem 'rails_db_info'
  gem 'binding_of_caller'
  gem "pry"
end

group :development, :test do
  gem 'rspec-rails', '~>2.14'
  gem 'factory_girl_rails'
  gem 'dotenv-rails'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'database_cleaner'
  gem 'shoulda-matchers'
end

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

