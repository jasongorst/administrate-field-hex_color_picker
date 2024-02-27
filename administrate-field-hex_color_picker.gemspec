# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require "administrate/field/hex_color_picker/version"

GEM_NAME = 'hex_color_picker'
GEM_NAME_CLASS = GEM_NAME.split('_').map(&:capitalize).join
FULL_GEM_NAME = "administrate-field-#{GEM_NAME}"

Gem::Specification.new do |gem|
  gem.name          = FULL_GEM_NAME
  gem.version       = ::VERSION
  gem.authors       = ['Jon Kinney']
  gem.email         = ['jon@headway.io']

  gem.summary       = %(Custom Administrate field #{GEM_NAME})
  gem.description   = gem.summary
  gem.homepage      = "http://github.com/headwayio/#{FULL_GEM_NAME}"
  gem.license       = 'MIT'

  gem.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  gem.bindir        = 'exe'
  gem.executables   = gem.files.grep(%r{^exe/}) { |f| File.basename(f) }
  gem.require_paths = ['lib']

  gem.add_development_dependency 'bundler', '~> 2.4.20'
  gem.add_development_dependency 'rake', '~> 13.0'
  gem.add_development_dependency 'rspec', '~> 3.12'
  gem.add_dependency 'administrate', '~> 0.18'
  gem.add_dependency 'rails', '~> 7.0'
  gem.add_dependency 'jquery-minicolors-rails', '~> 2.2'
  gem.add_dependency 'jquery-rails', '~> 4.5'
end
