require "administrate/engine"

module Administrate
  module Field
    class HexColorPicker < Base
      class Engine < ::Rails::Engine
        Administrate::Engine.add_javascript 'administrate-field-hex_color_picker/application'
        Administrate::Engine.add_stylesheet 'administrate-field-hex_color_picker/application'
      end
    end
  end
end
