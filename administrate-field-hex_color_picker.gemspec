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

  gem.files = Dir["{app,lib}/**/*", "LICENSE.txt", "Rakefile"]

  # gem.files         = `git ls-files -z`.split("\x0").reject do |f|
  #   f.match(%r{^(test|spec|features)/})
  # end

  # gem.require_paths = ['lib']

  gem.add_dependency 'administrate', '~> 1.0.0.beta1'
end
