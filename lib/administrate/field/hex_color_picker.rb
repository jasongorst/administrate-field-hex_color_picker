require "administrate/field/base"
require_relative "hex_color_picker/version"
require_relative "hex_color_picker/engine"

module Administrate
  module Field
    class HexColorPicker < Base
      VERSION = ::VERSION

      def to_s
        data
      end
    end
  end
end
