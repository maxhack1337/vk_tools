var e, t;
(e = this),
  (t = function (e) {
    "use strict";
    var t,
      n,
      r,
      o,
      i,
      a,
      c,
      s,
      u,
      l,
      h,
      f,
      d,
      p,
      v,
      m,
      y,
      g,
      b,
      E = (function () {
        var e;
        function t() {
          var e, n, r;
          (function (e, t) {
            if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
          })(this, t),
            (n = "events"),
            (e = e || Object.create(null)),
            (r = {
              on: function (t, n) {
                (e[t] || (e[t] = [])).push(n);
              },
              off: function (t, n) {
                e[t] && e[t].splice(e[t].indexOf(n) >>> 0, 1);
              },
              emit: function (t, n) {
                (e[t] || []).slice().map(function (e) {
                  e(n);
                }),
                  (e["*"] || []).slice().map(function (e) {
                    e(t, n);
                  });
              },
            }),
            n in this ? Object.defineProperty(this, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (this[n] = r);
        }
        return (
          (e = [
            {
              key: "on",
              value: function (e, t) {
                return this.events.on(e, t), this;
              },
            },
            {
              key: "off",
              value: function (e, t) {
                return this.events.off(e, t), this;
              },
            },
          ]),
          (function (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          })(t.prototype, e),
          t
        );
      })();
    function S(e) {
      if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function O(e, t, n) {
      return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
    }
    function T(e) {
      return (T = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function w(e, t) {
      return (w =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    ((t = f || (f = {})).MESSAGE = "message"), (t.UNSUPPORTED_MESSAGE = "unsupported_message");
    var C = "vk-sak-sdk",
      R = (function (e) {
        !(function (e, t) {
          if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function");
          (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })), t && w(e, t);
        })(o, e);
        var t,
          n,
          r =
            ((t = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                n = T(o);
              return (e = t ? Reflect.construct(n, arguments, T(this).constructor) : n.apply(this, arguments)), e && ("object" == (e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e) || "function" == typeof e) ? e : S(this);
            });
        function o(e) {
          var t;
          return (
            (function (e, t) {
              if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
            })(this, o),
            O(S((t = r.call(this))), "config", void 0),
            (t.config = e),
            (t.handleMessage = t.handleMessage.bind(S(t))),
            window.addEventListener("message", t.handleMessage),
            t
          );
        }
        return (
          (n = [
            {
              key: "destroy",
              value: function () {
                delete this.config, window.removeEventListener("message", this.handleMessage);
              },
            },
            {
              key: "sendMessage",
              value: function (e) {
                var t;
                null === (t = this.config.iframe.contentWindow) ||
                  void 0 === t ||
                  t.postMessage(
                    (function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {},
                          r = Object.keys(n);
                        "function" == typeof Object.getOwnPropertySymbols &&
                          (r = r.concat(
                            Object.getOwnPropertySymbols(n).filter(function (e) {
                              return Object.getOwnPropertyDescriptor(n, e).enumerable;
                            })
                          )),
                          r.forEach(function (t) {
                            O(e, t, n[t]);
                          });
                      }
                      return e;
                    })({ type: C }, e),
                    this.config.origin
                  );
              },
            },
            {
              key: "handleMessage",
              value: function (e) {
                var t;
                if (!this.config.origin || e.origin !== this.config.origin || e.source !== this.config.iframe.contentWindow || (null === (t = e.data) || void 0 === t ? void 0 : t.type) !== C) {
                  this.events.emit(f.UNSUPPORTED_MESSAGE, e.data);
                  return;
                }
                this.events.emit(f.MESSAGE, e.data);
              },
            },
          ]),
          (function (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          })(o.prototype, n),
          o
        );
      })(E);
    function L(e, t, n) {
      return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
    }
    var k = (function () {
      var e;
      function t() {
        (function (e, t) {
          if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
        })(this, t),
          L(this, "store", {});
      }
      return (
        (e = [
          {
            key: "init",
            value: function (e) {
              return this.set(e), this;
            },
          },
          {
            key: "update",
            value: function (e) {
              return this.set(e);
            },
          },
          {
            key: "set",
            value: function (e) {
              return (
                (this.store = (function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {},
                      r = Object.keys(n);
                    "function" == typeof Object.getOwnPropertySymbols &&
                      (r = r.concat(
                        Object.getOwnPropertySymbols(n).filter(function (e) {
                          return Object.getOwnPropertyDescriptor(n, e).enumerable;
                        })
                      )),
                      r.forEach(function (t) {
                        L(e, t, n[t]);
                      });
                  }
                  return e;
                })({}, this.store, e)),
                this
              );
            },
          },
          {
            key: "get",
            value: function () {
              return this.store;
            },
          },
        ]),
        (function (e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        })(t.prototype, e),
        t
      );
    })();
    (e.CaptchaLanguages = void 0),
      ((n = e.CaptchaLanguages || (e.CaptchaLanguages = {})).RUS = "0"),
      (n.UKR = "1"),
      (n.ENG = "3"),
      (n.SPA = "4"),
      (n.GERMAN = "6"),
      (n.POL = "15"),
      (n.FRA = "16"),
      (n.UZB = "65"),
      (n.TURKEY = "82"),
      (n.KAZ = "97"),
      (n.BEL = "114"),
      (e.CaptchaColorScheme = void 0),
      ((r = e.CaptchaColorScheme || (e.CaptchaColorScheme = {})).LIGHT = "light"),
      (r.DARK = "dark"),
      (e.CaptchaViewMode = void 0),
      ((o = e.CaptchaViewMode || (e.CaptchaViewMode = {})).POPUP = "popup"),
      (o.BLOCK = "block"),
      ((i = d || (d = {})).CURSOR = "cursor"),
      (i.TAPS = "taps");
    var M = (
      (e, t = 21) =>
      (n = t) => {
        let r = "",
          o = n;
        for (; o--; ) r += e[(Math.random() * e.length) | 0];
        return r;
      }
    )("qazwsxedcrfvtgbyhnujmikol", 6);
    function _(e, t, n) {
      return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
    }
    ((a = p || (p = {})).LOADING = "loading"),
      (a.LOADED = "loaded"),
      (a.NOT_LOADED = "not_loaded"),
      ((c = v || (v = {}))[(c.TimeoutExceeded = 0)] = "TimeoutExceeded"),
      (c[(c.InternalError = 1)] = "InternalError"),
      (c[(c.AuthError = 2)] = "AuthError"),
      ((s = m || (m = {})).INIT = "init"),
      (s.MOUSE_CHANGE = "mouseChange"),
      (s.TOUCH_CHANGE = "touchChange");
    var P = (_((y = {}), v.TimeoutExceeded, "timeout"), _(y, v.InternalError, "internal error"), _(y, v.AuthError, "auth error"), y);
    ((u = g || (g = {})).START_LOAD = "common: start load"),
      (u.LOAD = "common: load"),
      (u.SHOW = "common: show"),
      (u.HIDE = "common: hide"),
      (u.CLOSE = "common: close"),
      (u.ERROR = "common: error"),
      (u.RESIZE = "common: resize"),
      ((l = b || (b = {})).GET_RESULT = "VKCaptchaGetResult"),
      (l.CLOSE = "VKCaptchaCloseCaptcha"),
      (l.SENSORS_START = "VKCaptchaListenSensorsStart"),
      (l.SEND_SENSORS = "VKCaptchaListenSensorsChanged"),
      (l.SEND_WEB_SENSORS = "VKCaptchaListenSensorsWebChanged"),
      (l.SENSORS_STOP = "VKCaptchaListenSensorsStop"),
      (l.USER_CLOSE = "VKCaptchaUserClose");
    var A = function (t, n) {
      return '\n<div id="'
        .concat(t, '" data-test-id="captcha-widget">\n  <style>\n    #')
        .concat(t, " {")
        .concat(n === e.CaptchaViewMode.POPUP ? "\n      position: fixed;\n      top: 0;\n      left: 0;\n      z-index: 9999;" : "", "\n      width: 100%;\n      height: 100%;\n      max-width: 100%;\n      max-height: 100%;\n    }\n\n    #")
        .concat(t, " iframe {\n      border: none;\n      color-scheme: auto;\n    }\n\n    #")
        .concat(t, " .loader,\n    #")
        .concat(t, ' .error {\n      display: none;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n    }\n  </style>\n  <div class="loader"></div>\n  <div class="error"></div>\n  <iframe width="100%" height="100%"></iframe>\n</div>\n  ');
    };
    function j(e) {
      if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function N(e, t, n) {
      return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
    }
    function D(e) {
      return (D = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function U(e, t) {
      return (U =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var I = (function (e) {
      !(function (e, t) {
        if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function");
        (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })), t && U(e, t);
      })(o, e);
      var t,
        n,
        r =
          ((t = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              n = D(o);
            return (e = t ? Reflect.construct(n, arguments, D(this).constructor) : n.apply(this, arguments)), e && ("object" == (e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e) || "function" == typeof e) ? e : j(this);
          });
      function o() {
        var e,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return (
          (function (e, t) {
            if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
          })(this, o),
          N(j((e = r.call(this))), "id", M()),
          N(j(e), "scheme", void 0),
          N(j(e), "lang", void 0),
          N(j(e), "config", void 0),
          N(j(e), "timeoutTimer", void 0),
          N(j(e), "bridge", void 0),
          N(j(e), "container", void 0),
          N(j(e), "iframeSrc", void 0),
          N(j(e), "view", void 0),
          N(j(e), "hitman", void 0),
          N(j(e), "onClose", void 0),
          N(j(e), "templateRenderer", A),
          N(j(e), "promise", void 0),
          N(j(e), "promiseResolve", void 0),
          N(j(e), "promiseReject", void 0),
          N(j(e), "elements", void 0),
          N(j(e), "getIframeCoords", function () {
            var t = e.elements.iframe.getBoundingClientRect(),
              n = t.left,
              r = t.top;
            return { left: n + window.scrollX, top: r + window.scrollY };
          }),
          N(j(e), "sendSensorsData", function (t) {
            var n = t.eventType,
              r = t.data;
            e.bridge.sendMessage({ handler: b.SEND_WEB_SENSORS, params: { eventType: n, data: r, coords: e.getIframeCoords() } });
          }),
          N(j(e), "handleMouseMove", function (t) {
            var n = t.pageX,
              r = t.pageY;
            e.sendSensorsData({ eventType: m.MOUSE_CHANGE, data: { pageX: n, pageY: r } });
          }),
          N(j(e), "handleTouchMove", function (t) {
            var n = t.touches[0];
            if (n) {
              var r = n.pageX,
                o = n.pageY;
              e.sendSensorsData({ eventType: m.TOUCH_CHANGE, data: { pageX: r, pageY: o } });
            }
          }),
          (e.config = new k().init(t)),
          e
        );
      }
      return (
        (n = [
          {
            key: "update",
            value: function (e) {
              return this.config.update(e);
            },
          },
          {
            key: "show",
            value: function (e) {
              var t = this,
                n = e.container,
                r = e.iframeSrc,
                o = e.view,
                i = e.scheme,
                a = e.lang,
                c = e.hitman,
                s = e.onClose;
              return (
                (this.promise = new Promise(function (e, n) {
                  (t.promiseResolve = e), (t.promiseReject = n);
                })),
                (this.container = n),
                (this.iframeSrc = r),
                (this.view = o),
                (this.iframeSrc = r),
                (this.scheme = i),
                (this.lang = a),
                (this.hitman = null != c && c),
                (this.onClose = s),
                this.renderTemplate(),
                this.registerElements(),
                this.loadWidgetFrame(),
                this.promise
              );
            },
          },
          {
            key: "close",
            value: function () {
              var e, t, n, r, o;
              clearTimeout(this.timeoutTimer),
                this.removeAnalyticsMouseListeners(),
                this.removeAnalyticsTouchListeners(),
                null === (t = this.elements) || void 0 === t || null === (e = t.root) || void 0 === e || e.remove(),
                null === (n = this.bridge) || void 0 === n || n.destroy(),
                this.events.emit(g.CLOSE),
                null === (r = this.promiseReject) || void 0 === r || r.call(this, "close"),
                null === (o = this.onClose) || void 0 === o || o.call(this);
            },
          },
          {
            key: "addAnalyticsMouseListeners",
            value: function () {
              document.addEventListener("mouseenter", this.handleMouseMove), document.addEventListener("mouseleave", this.handleMouseMove), document.addEventListener("mousemove", this.handleMouseMove);
            },
          },
          {
            key: "removeAnalyticsMouseListeners",
            value: function () {
              document.removeEventListener("mouseenter", this.handleMouseMove), document.removeEventListener("mouseleave", this.handleMouseMove), document.removeEventListener("mousemove", this.handleMouseMove);
            },
          },
          {
            key: "addAnalyticsTouchListeners",
            value: function () {
              document.addEventListener("touchstart", this.handleTouchMove), document.addEventListener("touchend", this.handleTouchMove), document.addEventListener("touchmove", this.handleTouchMove);
            },
          },
          {
            key: "removeAnalyticsTouchListeners",
            value: function () {
              document.removeEventListener("touchstart", this.handleTouchMove), document.removeEventListener("touchend", this.handleTouchMove), document.removeEventListener("touchmove", this.handleTouchMove);
            },
          },
          {
            key: "onLoadHandler",
            value: function () {
              var e = this;
              clearTimeout(this.timeoutTimer),
                setTimeout(function () {
                  e.setState(p.LOADED);
                }, 300),
                this.events.emit(g.LOAD);
            },
          },
          {
            key: "onErrorHandler",
            value: function (e) {
              var t, n, r;
              clearTimeout(this.timeoutTimer), this.setState(p.NOT_LOADED), this.events.emit(g.ERROR, e), null === (n = this.elements) || void 0 === n || null === (t = n.iframe) || void 0 === t || t.remove(), null === (r = this.promiseReject) || void 0 === r || r.call(this, e.text);
            },
          },
          {
            key: "onBridgeMessageHandler",
            value: function (e) {
              switch (e.handler) {
                case g.LOAD:
                  this.onLoadHandler();
                  break;
                case b.CLOSE:
                case g.CLOSE:
                  this.close();
                  break;
                case g.ERROR:
                  this.onErrorHandler({ code: v.InternalError, text: P[v.InternalError], details: e.params });
                  break;
                case g.RESIZE:
                  this.elements.root.style.height = "".concat(e.params.height, "px");
                  break;
                case b.GET_RESULT:
                  var t = e.params.token;
                  this.promiseResolve(t);
                  break;
                case b.SENSORS_START:
                  var n = e.params.bridge_sensors_list,
                    r = n.includes(d.CURSOR),
                    o = n.includes(d.TAPS);
                  (r || o) && this.sendSensorsData({ eventType: m.INIT }), r && this.addAnalyticsMouseListeners(), o && this.addAnalyticsTouchListeners();
                  break;
                case b.SENSORS_STOP:
                  this.removeAnalyticsMouseListeners(), this.removeAnalyticsTouchListeners();
              }
            },
          },
          {
            key: "renderTemplate",
            value: function () {
              this.container.insertAdjacentHTML("beforeend", this.templateRenderer(this.id, this.view));
            },
          },
          {
            key: "loadWidgetFrame",
            value: function () {
              var e = this,
                t = new URL(this.iframeSrc);
              (this.bridge = new R({ iframe: this.elements.iframe, origin: t.origin })),
                this.bridge.on(f.MESSAGE, function (t) {
                  return e.onBridgeMessageHandler(t);
                });
              var n = new URLSearchParams(t.search);
              switch (!0) {
                case !!this.scheme:
                  n.set("scheme", this.scheme);
                case !!this.lang:
                  n.set("lang_id", this.lang);
                default:
                  var r = location.protocol + "//" + location.hostname;
                  n.set("origin", r), this.hitman || n.set("variant", this.view);
              }
              (t = new URL("".concat(t.origin).concat(t.pathname, "?").concat(n))), (this.elements.iframe.src = t.href);
            },
          },
          {
            key: "setState",
            value: function (e) {
              this.elements.root.setAttribute("data-state", e);
            },
          },
          {
            key: "registerElements",
            value: function () {
              var e = document.getElementById(this.id);
              this.elements = { root: e, iframe: e.querySelector("iframe") };
            },
          },
        ]),
        (function (e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        })(o.prototype, n),
        o
      );
    })(E);
    (e.CheckCaptchaType = void 0), ((h = e.CheckCaptchaType || (e.CheckCaptchaType = {})).HITMAN = "hitman"), (h.VKID = "vkid"), (h.UNKNOWN = "unknown");
    var x = function (e) {
      var t = new URL(e).hostname,
        n = t.split(".");
      return n.length > 2 ? (n.shift(), n.join(".")) : t;
    };
    function H(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {},
          r = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols &&
          (r = r.concat(
            Object.getOwnPropertySymbols(n).filter(function (e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            })
          )),
          r.forEach(function (t) {
            var r;
            (r = n[t]), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r);
          });
      }
      return e;
    }
    var K = function (t) {
      var n = t.responseHeaders,
        r = t.url,
        o = t.responseError,
        i = t.withWidget,
        a = t.widgetConfig,
        c = "required" === n.get("X-Challenge"),
        s = n.get("X-Challenge-Url"),
        u = c && !!s,
        l = o && "error_code" in o && 14 === o.error_code,
        h = o && "type" in o && "captcha" === o.type,
        f = (l || h) && !!o.redirect_uri,
        d = (l || h) && !o.redirect_uri;
      if (u && !i) return { captchaType: e.CheckCaptchaType.HITMAN };
      if (u && i) {
        var p = new I(a);
        return {
          captchaType: e.CheckCaptchaType.HITMAN,
          captchaWidget: {
            show: function (e) {
              return p.show(H({ iframeSrc: "https://".concat(x(r)).concat(s), hitman: !0 }, e));
            },
            close: function () {
              return p.close();
            },
            update: function (e) {
              return p.update(e);
            },
          },
        };
      }
      if (f && !i) return { captchaType: e.CheckCaptchaType.VKID };
      if (f && i) {
        var v = new I(a);
        return {
          captchaType: e.CheckCaptchaType.VKID,
          captchaWidget: {
            show: function (e) {
              return v.show(H({ iframeSrc: o.redirect_uri || "" }, e));
            },
            close: function () {
              return v.close();
            },
            update: function (e) {
              return v.update(e);
            },
          },
        };
      }
      return d ? { captchaType: e.CheckCaptchaType.UNKNOWN } : { captchaType: null };
    };
    (window._vkidCaptchaWidget = I), (window._vkidCaptchaCheckError = K), (e.CaptchaWidget = I), (e.checkCaptchaError = K);
  }),
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(((e = "undefined" != typeof globalThis ? globalThis : e || self).CaptchaSDK = {}));
