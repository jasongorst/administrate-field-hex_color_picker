(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@claviska/jquery-minicolors/jquery.minicolors.js
  var require_jquery_minicolors = __commonJS({
    "node_modules/@claviska/jquery-minicolors/jquery.minicolors.js"(exports, module) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define(["jquery"], factory);
        } else if (typeof exports === "object") {
          module.exports = factory(__require("jquery"));
        } else {
          factory(jQuery);
        }
      })(function($) {
        "use strict";
        $.minicolors = {
          defaults: {
            animationSpeed: 50,
            animationEasing: "swing",
            change: null,
            changeDelay: 0,
            control: "hue",
            defaultValue: "",
            format: "hex",
            hide: null,
            hideSpeed: 100,
            inline: false,
            keywords: "",
            letterCase: "lowercase",
            opacity: false,
            position: "bottom",
            show: null,
            showSpeed: 100,
            theme: "default",
            swatches: []
          }
        };
        $.extend($.fn, {
          minicolors: function(method, data) {
            switch (method) {
              case "destroy":
                $(this).each(function() {
                  destroy($(this));
                });
                return $(this);
              case "hide":
                hide();
                return $(this);
              case "opacity":
                if (data === void 0) {
                  return $(this).attr("data-opacity");
                } else {
                  $(this).each(function() {
                    updateFromInput($(this).attr("data-opacity", data));
                  });
                }
                return $(this);
              case "rgbObject":
                return rgbObject($(this), method === "rgbaObject");
              case "rgbString":
              case "rgbaString":
                return rgbString($(this), method === "rgbaString");
              case "settings":
                if (data === void 0) {
                  return $(this).data("minicolors-settings");
                } else {
                  $(this).each(function() {
                    var settings = $(this).data("minicolors-settings") || {};
                    destroy($(this));
                    $(this).minicolors($.extend(true, settings, data));
                  });
                }
                return $(this);
              case "show":
                show($(this).eq(0));
                return $(this);
              case "value":
                if (data === void 0) {
                  return $(this).val();
                } else {
                  $(this).each(function() {
                    if (typeof data === "object" && data !== null) {
                      if (data.opacity !== void 0) {
                        $(this).attr("data-opacity", keepWithin(data.opacity, 0, 1));
                      }
                      if (data.color) {
                        $(this).val(data.color);
                      }
                    } else {
                      $(this).val(data);
                    }
                    updateFromInput($(this));
                  });
                }
                return $(this);
              default:
                if (method !== "create")
                  data = method;
                $(this).each(function() {
                  init($(this), data);
                });
                return $(this);
            }
          }
        });
        function init(input, settings) {
          var minicolors = $('<div class="minicolors" />');
          var defaults = $.minicolors.defaults;
          var name;
          var size;
          var swatches;
          var swatch;
          var swatchString;
          var panel;
          var i;
          if (input.data("minicolors-initialized"))
            return;
          settings = $.extend(true, {}, defaults, settings);
          minicolors.addClass("minicolors-theme-" + settings.theme).toggleClass("minicolors-with-opacity", settings.opacity);
          if (settings.position !== void 0) {
            $.each(settings.position.split(" "), function() {
              minicolors.addClass("minicolors-position-" + this);
            });
          }
          if (settings.format === "rgb") {
            size = settings.opacity ? "25" : "20";
          } else {
            size = settings.keywords ? "11" : "7";
          }
          input.addClass("minicolors-input").data("minicolors-initialized", false).data("minicolors-settings", settings).prop("size", size).wrap(minicolors).after(
            '<div class="minicolors-panel minicolors-slider-' + settings.control + '"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>'
          );
          if (!settings.inline) {
            input.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>');
            input.next(".minicolors-input-swatch").on("click", function(event) {
              event.preventDefault();
              input.trigger("focus");
            });
          }
          panel = input.parent().find(".minicolors-panel");
          panel.on("selectstart", function() {
            return false;
          }).end();
          if (settings.swatches && settings.swatches.length !== 0) {
            panel.addClass("minicolors-with-swatches");
            swatches = $('<ul class="minicolors-swatches"></ul>').appendTo(panel);
            for (i = 0; i < settings.swatches.length; ++i) {
              if (typeof settings.swatches[i] === "object") {
                name = settings.swatches[i].name;
                swatch = settings.swatches[i].color;
              } else {
                name = "";
                swatch = settings.swatches[i];
              }
              swatchString = swatch;
              swatch = isRgb(swatch) ? parseRgb(swatch, true) : hex2rgb(parseHex(swatch, true));
              $('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>').attr("title", name).appendTo(swatches).data("swatch-color", swatchString).find(".minicolors-swatch-color").css({
                backgroundColor: swatchString !== "transparent" ? rgb2hex(swatch) : "transparent",
                opacity: String(swatch.a)
              });
              settings.swatches[i] = swatch;
            }
          }
          if (settings.inline)
            input.parent().addClass("minicolors-inline");
          updateFromInput(input, false);
          input.data("minicolors-initialized", true);
        }
        function destroy(input) {
          var minicolors = input.parent();
          input.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input");
          minicolors.before(input).remove();
        }
        function show(input) {
          var minicolors = input.parent();
          var panel = minicolors.find(".minicolors-panel");
          var settings = input.data("minicolors-settings");
          if (!input.data("minicolors-initialized") || input.prop("disabled") || minicolors.hasClass("minicolors-inline") || minicolors.hasClass("minicolors-focus"))
            return;
          hide();
          minicolors.addClass("minicolors-focus");
          if (panel.animate) {
            panel.stop(true, true).fadeIn(settings.showSpeed, function() {
              if (settings.show)
                settings.show.call(input.get(0));
            });
          } else {
            panel.show();
            if (settings.show)
              settings.show.call(input.get(0));
          }
        }
        function hide() {
          $(".minicolors-focus").each(function() {
            var minicolors = $(this);
            var input = minicolors.find(".minicolors-input");
            var panel = minicolors.find(".minicolors-panel");
            var settings = input.data("minicolors-settings");
            if (panel.animate) {
              panel.fadeOut(settings.hideSpeed, function() {
                if (settings.hide)
                  settings.hide.call(input.get(0));
                minicolors.removeClass("minicolors-focus");
              });
            } else {
              panel.hide();
              if (settings.hide)
                settings.hide.call(input.get(0));
              minicolors.removeClass("minicolors-focus");
            }
          });
        }
        function move(target, event, animate) {
          var input = target.parents(".minicolors").find(".minicolors-input");
          var settings = input.data("minicolors-settings");
          var picker = target.find("[class$=-picker]");
          var offsetX = target.offset().left;
          var offsetY = target.offset().top;
          var x = Math.round(event.pageX - offsetX);
          var y = Math.round(event.pageY - offsetY);
          var duration = animate ? settings.animationSpeed : 0;
          var wx, wy, r, phi, styles;
          if (event.originalEvent.changedTouches) {
            x = event.originalEvent.changedTouches[0].pageX - offsetX;
            y = event.originalEvent.changedTouches[0].pageY - offsetY;
          }
          if (x < 0)
            x = 0;
          if (y < 0)
            y = 0;
          if (x > target.width())
            x = target.width();
          if (y > target.height())
            y = target.height();
          if (target.parent().is(".minicolors-slider-wheel") && picker.parent().is(".minicolors-grid")) {
            wx = 75 - x;
            wy = 75 - y;
            r = Math.sqrt(wx * wx + wy * wy);
            phi = Math.atan2(wy, wx);
            if (phi < 0)
              phi += Math.PI * 2;
            if (r > 75) {
              r = 75;
              x = 75 - 75 * Math.cos(phi);
              y = 75 - 75 * Math.sin(phi);
            }
            x = Math.round(x);
            y = Math.round(y);
          }
          styles = {
            top: y + "px"
          };
          if (target.is(".minicolors-grid")) {
            styles.left = x + "px";
          }
          if (picker.animate) {
            picker.stop(true).animate(styles, duration, settings.animationEasing, function() {
              updateFromControl(input, target);
            });
          } else {
            picker.css(styles);
            updateFromControl(input, target);
          }
        }
        function updateFromControl(input, target) {
          function getCoords(picker, container) {
            var left, top;
            if (!picker.length || !container)
              return null;
            left = picker.offset().left;
            top = picker.offset().top;
            return {
              x: left - container.offset().left + picker.outerWidth() / 2,
              y: top - container.offset().top + picker.outerHeight() / 2
            };
          }
          var hue, saturation, brightness, x, y, r, phi;
          var hex = input.val();
          var opacity = input.attr("data-opacity");
          var minicolors = input.parent();
          var settings = input.data("minicolors-settings");
          var swatch = minicolors.find(".minicolors-input-swatch");
          var grid = minicolors.find(".minicolors-grid");
          var slider = minicolors.find(".minicolors-slider");
          var opacitySlider = minicolors.find(".minicolors-opacity-slider");
          var gridPicker = grid.find("[class$=-picker]");
          var sliderPicker = slider.find("[class$=-picker]");
          var opacityPicker = opacitySlider.find("[class$=-picker]");
          var gridPos = getCoords(gridPicker, grid);
          var sliderPos = getCoords(sliderPicker, slider);
          var opacityPos = getCoords(opacityPicker, opacitySlider);
          if (target.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")) {
            switch (settings.control) {
              case "wheel":
                x = grid.width() / 2 - gridPos.x;
                y = grid.height() / 2 - gridPos.y;
                r = Math.sqrt(x * x + y * y);
                phi = Math.atan2(y, x);
                if (phi < 0)
                  phi += Math.PI * 2;
                if (r > 75) {
                  r = 75;
                  gridPos.x = 69 - 75 * Math.cos(phi);
                  gridPos.y = 69 - 75 * Math.sin(phi);
                }
                saturation = keepWithin(r / 0.75, 0, 100);
                hue = keepWithin(phi * 180 / Math.PI, 0, 360);
                brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                hex = hsb2hex({
                  h: hue,
                  s: saturation,
                  b: brightness
                });
                slider.css("backgroundColor", hsb2hex({ h: hue, s: saturation, b: 100 }));
                break;
              case "saturation":
                hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
                saturation = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                hex = hsb2hex({
                  h: hue,
                  s: saturation,
                  b: brightness
                });
                slider.css("backgroundColor", hsb2hex({ h: hue, s: 100, b: brightness }));
                minicolors.find(".minicolors-grid-inner").css("opacity", saturation / 100);
                break;
              case "brightness":
                hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
                saturation = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                hex = hsb2hex({
                  h: hue,
                  s: saturation,
                  b: brightness
                });
                slider.css("backgroundColor", hsb2hex({ h: hue, s: saturation, b: 100 }));
                minicolors.find(".minicolors-grid-inner").css("opacity", 1 - brightness / 100);
                break;
              default:
                hue = keepWithin(360 - parseInt(sliderPos.y * (360 / slider.height()), 10), 0, 360);
                saturation = keepWithin(Math.floor(gridPos.x * (100 / grid.width())), 0, 100);
                brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                hex = hsb2hex({
                  h: hue,
                  s: saturation,
                  b: brightness
                });
                grid.css("backgroundColor", hsb2hex({ h: hue, s: 100, b: 100 }));
                break;
            }
            if (settings.opacity) {
              opacity = parseFloat(1 - opacityPos.y / opacitySlider.height()).toFixed(2);
            } else {
              opacity = 1;
            }
            updateInput(input, hex, opacity);
          } else {
            swatch.find("span").css({
              backgroundColor: hex,
              opacity: String(opacity)
            });
            doChange(input, hex, opacity);
          }
        }
        function updateInput(input, value, opacity) {
          var rgb;
          var minicolors = input.parent();
          var settings = input.data("minicolors-settings");
          var swatch = minicolors.find(".minicolors-input-swatch");
          if (settings.opacity)
            input.attr("data-opacity", opacity);
          if (settings.format === "rgb") {
            if (isRgb(value)) {
              rgb = parseRgb(value, true);
            } else {
              rgb = hex2rgb(parseHex(value, true));
            }
            opacity = input.attr("data-opacity") === "" ? 1 : keepWithin(parseFloat(input.attr("data-opacity")).toFixed(2), 0, 1);
            if (isNaN(opacity) || !settings.opacity)
              opacity = 1;
            if (input.minicolors("rgbObject").a <= 1 && rgb && settings.opacity) {
              value = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + parseFloat(opacity) + ")";
            } else {
              value = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
            }
          } else {
            if (isRgb(value)) {
              value = rgbString2hex(value);
            }
            value = convertCase(value, settings.letterCase);
          }
          input.val(value);
          swatch.find("span").css({
            backgroundColor: value,
            opacity: String(opacity)
          });
          doChange(input, value, opacity);
        }
        function updateFromInput(input, preserveInputValue) {
          var hex, hsb, opacity, keywords, alpha, value, x, y, r, phi;
          var minicolors = input.parent();
          var settings = input.data("minicolors-settings");
          var swatch = minicolors.find(".minicolors-input-swatch");
          var grid = minicolors.find(".minicolors-grid");
          var slider = minicolors.find(".minicolors-slider");
          var opacitySlider = minicolors.find(".minicolors-opacity-slider");
          var gridPicker = grid.find("[class$=-picker]");
          var sliderPicker = slider.find("[class$=-picker]");
          var opacityPicker = opacitySlider.find("[class$=-picker]");
          if (isRgb(input.val())) {
            hex = rgbString2hex(input.val());
            alpha = keepWithin(parseFloat(getAlpha(input.val())).toFixed(2), 0, 1);
            if (alpha) {
              input.attr("data-opacity", alpha);
            }
          } else {
            hex = convertCase(parseHex(input.val(), true), settings.letterCase);
          }
          if (!hex) {
            hex = convertCase(parseInput(settings.defaultValue, true), settings.letterCase);
          }
          hsb = hex2hsb(hex);
          keywords = !settings.keywords ? [] : $.map(settings.keywords.split(","), function(a) {
            return a.toLowerCase().trim();
          });
          if (input.val() !== "" && $.inArray(input.val().toLowerCase(), keywords) > -1) {
            value = convertCase(input.val());
          } else {
            value = isRgb(input.val()) ? parseRgb(input.val()) : hex;
          }
          if (!preserveInputValue)
            input.val(value);
          if (settings.opacity) {
            opacity = input.attr("data-opacity") === "" ? 1 : keepWithin(parseFloat(input.attr("data-opacity")).toFixed(2), 0, 1);
            if (isNaN(opacity))
              opacity = 1;
            input.attr("data-opacity", opacity);
            swatch.find("span").css("opacity", String(opacity));
            y = keepWithin(opacitySlider.height() - opacitySlider.height() * opacity, 0, opacitySlider.height());
            opacityPicker.css("top", y + "px");
          }
          if (input.val().toLowerCase() === "transparent") {
            swatch.find("span").css("opacity", String(0));
          }
          swatch.find("span").css("backgroundColor", hex);
          switch (settings.control) {
            case "wheel":
              r = keepWithin(Math.ceil(hsb.s * 0.75), 0, grid.height() / 2);
              phi = hsb.h * Math.PI / 180;
              x = keepWithin(75 - Math.cos(phi) * r, 0, grid.width());
              y = keepWithin(75 - Math.sin(phi) * r, 0, grid.height());
              gridPicker.css({
                top: y + "px",
                left: x + "px"
              });
              y = 150 - hsb.b / (100 / grid.height());
              if (hex === "")
                y = 0;
              sliderPicker.css("top", y + "px");
              slider.css("backgroundColor", hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
              break;
            case "saturation":
              x = keepWithin(5 * hsb.h / 12, 0, 150);
              y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
              gridPicker.css({
                top: y + "px",
                left: x + "px"
              });
              y = keepWithin(slider.height() - hsb.s * (slider.height() / 100), 0, slider.height());
              sliderPicker.css("top", y + "px");
              slider.css("backgroundColor", hsb2hex({ h: hsb.h, s: 100, b: hsb.b }));
              minicolors.find(".minicolors-grid-inner").css("opacity", hsb.s / 100);
              break;
            case "brightness":
              x = keepWithin(5 * hsb.h / 12, 0, 150);
              y = keepWithin(grid.height() - Math.ceil(hsb.s / (100 / grid.height())), 0, grid.height());
              gridPicker.css({
                top: y + "px",
                left: x + "px"
              });
              y = keepWithin(slider.height() - hsb.b * (slider.height() / 100), 0, slider.height());
              sliderPicker.css("top", y + "px");
              slider.css("backgroundColor", hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
              minicolors.find(".minicolors-grid-inner").css("opacity", 1 - hsb.b / 100);
              break;
            default:
              x = keepWithin(Math.ceil(hsb.s / (100 / grid.width())), 0, grid.width());
              y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
              gridPicker.css({
                top: y + "px",
                left: x + "px"
              });
              y = keepWithin(slider.height() - hsb.h / (360 / slider.height()), 0, slider.height());
              sliderPicker.css("top", y + "px");
              grid.css("backgroundColor", hsb2hex({ h: hsb.h, s: 100, b: 100 }));
              break;
          }
          if (input.data("minicolors-initialized")) {
            doChange(input, value, opacity);
          }
        }
        function doChange(input, value, opacity) {
          var settings = input.data("minicolors-settings");
          var lastChange = input.data("minicolors-lastChange");
          var obj, sel, i;
          if (!lastChange || lastChange.value !== value || lastChange.opacity !== opacity) {
            input.data("minicolors-lastChange", {
              value,
              opacity
            });
            if (settings.swatches && settings.swatches.length !== 0) {
              if (!isRgb(value)) {
                obj = hex2rgb(value);
              } else {
                obj = parseRgb(value, true);
              }
              sel = -1;
              for (i = 0; i < settings.swatches.length; ++i) {
                if (obj.r === settings.swatches[i].r && obj.g === settings.swatches[i].g && obj.b === settings.swatches[i].b && obj.a === settings.swatches[i].a) {
                  sel = i;
                  break;
                }
              }
              input.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected");
              if (sel !== -1) {
                input.parent().find(".minicolors-swatches .minicolors-swatch").eq(i).addClass("selected");
              }
            }
            if (settings.change) {
              if (settings.changeDelay) {
                clearTimeout(input.data("minicolors-changeTimeout"));
                input.data("minicolors-changeTimeout", setTimeout(function() {
                  settings.change.call(input.get(0), value, opacity);
                }, settings.changeDelay));
              } else {
                settings.change.call(input.get(0), value, opacity);
              }
            }
            input.trigger("change").trigger("input");
          }
        }
        function rgbObject(input) {
          var rgb, opacity = $(input).attr("data-opacity");
          if (isRgb($(input).val())) {
            rgb = parseRgb($(input).val(), true);
          } else {
            var hex = parseHex($(input).val(), true);
            rgb = hex2rgb(hex);
          }
          if (!rgb)
            return null;
          if (opacity !== void 0)
            $.extend(rgb, { a: parseFloat(opacity) });
          return rgb;
        }
        function rgbString(input, alpha) {
          var rgb, opacity = $(input).attr("data-opacity");
          if (isRgb($(input).val())) {
            rgb = parseRgb($(input).val(), true);
          } else {
            var hex = parseHex($(input).val(), true);
            rgb = hex2rgb(hex);
          }
          if (!rgb)
            return null;
          if (opacity === void 0)
            opacity = 1;
          if (alpha) {
            return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + parseFloat(opacity) + ")";
          } else {
            return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
          }
        }
        function convertCase(string, letterCase) {
          return letterCase === "uppercase" ? string.toUpperCase() : string.toLowerCase();
        }
        function parseHex(string, expand) {
          string = string.replace(/^#/g, "");
          if (!string.match(/^[A-F0-9]{3,6}/ig))
            return "";
          if (string.length !== 3 && string.length !== 6)
            return "";
          if (string.length === 3 && expand) {
            string = string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
          }
          return "#" + string;
        }
        function parseRgb(string, obj) {
          var values = string.replace(/[^\d,.]/g, "");
          var rgba = values.split(",");
          rgba[0] = keepWithin(parseInt(rgba[0], 10), 0, 255);
          rgba[1] = keepWithin(parseInt(rgba[1], 10), 0, 255);
          rgba[2] = keepWithin(parseInt(rgba[2], 10), 0, 255);
          if (rgba[3] !== void 0) {
            rgba[3] = keepWithin(parseFloat(rgba[3], 10), 0, 1);
          }
          if (obj) {
            if (rgba[3] !== void 0) {
              return {
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3]
              };
            } else {
              return {
                r: rgba[0],
                g: rgba[1],
                b: rgba[2]
              };
            }
          }
          if (typeof rgba[3] !== "undefined" && rgba[3] <= 1) {
            return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
          } else {
            return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
          }
        }
        function parseInput(string, expand) {
          if (isRgb(string)) {
            return parseRgb(string);
          } else {
            return parseHex(string, expand);
          }
        }
        function keepWithin(value, min, max) {
          if (value < min)
            value = min;
          if (value > max)
            value = max;
          return value;
        }
        function isRgb(string) {
          var rgb = string.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
          return rgb && rgb.length === 4 ? true : false;
        }
        function getAlpha(rgba) {
          rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i);
          return rgba && rgba.length === 6 ? rgba[4] : "1";
        }
        function hsb2rgb(hsb) {
          var rgb = {};
          var h = Math.round(hsb.h);
          var s = Math.round(hsb.s * 255 / 100);
          var v = Math.round(hsb.b * 255 / 100);
          if (s === 0) {
            rgb.r = rgb.g = rgb.b = v;
          } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h === 360)
              h = 0;
            if (h < 60) {
              rgb.r = t1;
              rgb.b = t2;
              rgb.g = t2 + t3;
            } else if (h < 120) {
              rgb.g = t1;
              rgb.b = t2;
              rgb.r = t1 - t3;
            } else if (h < 180) {
              rgb.g = t1;
              rgb.r = t2;
              rgb.b = t2 + t3;
            } else if (h < 240) {
              rgb.b = t1;
              rgb.r = t2;
              rgb.g = t1 - t3;
            } else if (h < 300) {
              rgb.b = t1;
              rgb.g = t2;
              rgb.r = t2 + t3;
            } else if (h < 360) {
              rgb.r = t1;
              rgb.g = t2;
              rgb.b = t1 - t3;
            } else {
              rgb.r = 0;
              rgb.g = 0;
              rgb.b = 0;
            }
          }
          return {
            r: Math.round(rgb.r),
            g: Math.round(rgb.g),
            b: Math.round(rgb.b)
          };
        }
        function rgbString2hex(rgb) {
          rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
          return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : "";
        }
        function rgb2hex(rgb) {
          var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
          ];
          $.each(hex, function(nr, val) {
            if (val.length === 1)
              hex[nr] = "0" + val;
          });
          return "#" + hex.join("");
        }
        function hsb2hex(hsb) {
          return rgb2hex(hsb2rgb(hsb));
        }
        function hex2hsb(hex) {
          var hsb = rgb2hsb(hex2rgb(hex));
          if (hsb.s === 0)
            hsb.h = 360;
          return hsb;
        }
        function rgb2hsb(rgb) {
          var hsb = { h: 0, s: 0, b: 0 };
          var min = Math.min(rgb.r, rgb.g, rgb.b);
          var max = Math.max(rgb.r, rgb.g, rgb.b);
          var delta = max - min;
          hsb.b = max;
          hsb.s = max !== 0 ? 255 * delta / max : 0;
          if (hsb.s !== 0) {
            if (rgb.r === max) {
              hsb.h = (rgb.g - rgb.b) / delta;
            } else if (rgb.g === max) {
              hsb.h = 2 + (rgb.b - rgb.r) / delta;
            } else {
              hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
          } else {
            hsb.h = -1;
          }
          hsb.h *= 60;
          if (hsb.h < 0) {
            hsb.h += 360;
          }
          hsb.s *= 100 / 255;
          hsb.b *= 100 / 255;
          return hsb;
        }
        function hex2rgb(hex) {
          hex = parseInt(hex.indexOf("#") > -1 ? hex.substring(1) : hex, 16);
          return {
            r: hex >> 16,
            g: (hex & 65280) >> 8,
            b: hex & 255
          };
        }
        $([document]).on("mousedown.minicolors touchstart.minicolors", function(event) {
          if (!$(event.target).parents().add(event.target).hasClass("minicolors")) {
            hide();
          }
        }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider", function(event) {
          var target = $(this);
          event.preventDefault();
          $(event.delegateTarget).data("minicolors-target", target);
          move(target, event, true);
        }).on("mousemove.minicolors touchmove.minicolors", function(event) {
          var target = $(event.delegateTarget).data("minicolors-target");
          if (target)
            move(target, event);
        }).on("mouseup.minicolors touchend.minicolors", function() {
          $(this).removeData("minicolors-target");
        }).on("click.minicolors", ".minicolors-swatches li", function(event) {
          event.preventDefault();
          var target = $(this), input = target.parents(".minicolors").find(".minicolors-input"), color = target.data("swatch-color");
          updateInput(input, color, getAlpha(color));
          updateFromInput(input);
        }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-input-swatch", function(event) {
          var input = $(this).parent().find(".minicolors-input");
          event.preventDefault();
          show(input);
        }).on("focus.minicolors", ".minicolors-input", function() {
          var input = $(this);
          if (!input.data("minicolors-initialized"))
            return;
          show(input);
        }).on("blur.minicolors", ".minicolors-input", function() {
          var input = $(this);
          var settings = input.data("minicolors-settings");
          var keywords;
          var hex;
          var rgba;
          var swatchOpacity;
          var value;
          if (!input.data("minicolors-initialized"))
            return;
          keywords = !settings.keywords ? [] : $.map(settings.keywords.split(","), function(a) {
            return a.toLowerCase().trim();
          });
          if (input.val() !== "" && $.inArray(input.val().toLowerCase(), keywords) > -1) {
            value = input.val();
          } else {
            if (isRgb(input.val())) {
              rgba = parseRgb(input.val(), true);
            } else {
              hex = parseHex(input.val(), true);
              rgba = hex ? hex2rgb(hex) : null;
            }
            if (rgba === null) {
              value = settings.defaultValue;
            } else if (settings.format === "rgb") {
              value = settings.opacity ? parseRgb("rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + input.attr("data-opacity") + ")") : parseRgb("rgb(" + rgba.r + "," + rgba.g + "," + rgba.b + ")");
            } else {
              value = rgb2hex(rgba);
            }
          }
          swatchOpacity = settings.opacity ? input.attr("data-opacity") : 1;
          if (value.toLowerCase() === "transparent")
            swatchOpacity = 0;
          input.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity", String(swatchOpacity));
          input.val(value);
          if (input.val() === "")
            input.val(parseInput(settings.defaultValue, true));
          input.val(convertCase(input.val(), settings.letterCase));
        }).on("keydown.minicolors", ".minicolors-input", function(event) {
          var input = $(this);
          if (!input.data("minicolors-initialized"))
            return;
          switch (event.which) {
            case 9:
              hide();
              break;
            case 13:
            case 27:
              hide();
              input.blur();
              break;
          }
        }).on("keyup.minicolors", ".minicolors-input", function() {
          var input = $(this);
          if (!input.data("minicolors-initialized"))
            return;
          updateFromInput(input, true);
        }).on("paste.minicolors", ".minicolors-input", function() {
          var input = $(this);
          if (!input.data("minicolors-initialized"))
            return;
          setTimeout(function() {
            updateFromInput(input, true);
          }, 1);
        });
      });
    }
  });

  // app/assets/javascripts/administrate-field-hex_color_picker/application.js
  var import_jquery = __toESM(__require("jquery"));
  var import_jquery2 = __toESM(require_jquery_minicolors());
  window.$ = import_jquery.default;
  window.$(function() {
    window.$(".minicolors").minicolors();
  });
})();
//# sourceMappingURL=/assets/administrate-field-hex_color_picker/application.js.map
