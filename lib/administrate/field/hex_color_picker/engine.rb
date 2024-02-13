require "administrate/engine"

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

        Administrate::Engine.add_javascript 'administrate-field-hex_color_picker/application'
        Administrate::Engine.add_stylesheet 'administrate-field-hex_color_picker/application'
      end
    end
  end
end
