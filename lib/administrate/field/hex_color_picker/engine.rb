require "administrate/field/base"

module Administrate
  module Field
    class HexColorPicker < Base
      class Engine < ::Rails::Engine
        initializer "administrate-field-hex_color_picker.assets.precompile" do |app|
          app.config.assets.precompile += [
            "administrate-field-hex_color_picker/application.js",
            "administrate-field-hex_color_picker/application.css",
          ]
        end
      end
    end
  end
end
