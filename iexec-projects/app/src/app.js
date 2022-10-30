"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/jssha/dist/sha.js
var require_sha = __commonJS({
  "node_modules/jssha/dist/sha.js"(exports, module2) {
    !function(n, r) {
      "object" == typeof exports && "undefined" != typeof module2 ? module2.exports = r() : "function" == typeof define && define.amd ? define(r) : (n = "undefined" != typeof globalThis ? globalThis : n || self).jsSHA = r();
    }(exports, function() {
      "use strict";
      var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = "ARRAYBUFFER not supported by this environment", t = "UINT8ARRAY not supported by this environment";
      function e(n2, r2, t2, e2) {
        var i2, o2, u2, f2 = r2 || [0], w2 = (t2 = t2 || 0) >>> 3, s2 = -1 === e2 ? 3 : 0;
        for (i2 = 0; i2 < n2.length; i2 += 1)
          o2 = (u2 = i2 + w2) >>> 2, f2.length <= o2 && f2.push(0), f2[o2] |= n2[i2] << 8 * (s2 + e2 * (u2 % 4));
        return { value: f2, binLen: 8 * n2.length + t2 };
      }
      function i(i2, o2, u2) {
        switch (o2) {
          case "UTF8":
          case "UTF16BE":
          case "UTF16LE":
            break;
          default:
            throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
        }
        switch (i2) {
          case "HEX":
            return function(n2, r2, t2) {
              return function(n3, r3, t3, e2) {
                var i3, o3, u3, f2;
                if (0 != n3.length % 2)
                  throw new Error("String of HEX type must be in byte increments");
                var w2 = r3 || [0], s2 = (t3 = t3 || 0) >>> 3, a2 = -1 === e2 ? 3 : 0;
                for (i3 = 0; i3 < n3.length; i3 += 2) {
                  if (o3 = parseInt(n3.substr(i3, 2), 16), isNaN(o3))
                    throw new Error("String of HEX type contains invalid characters");
                  for (u3 = (f2 = (i3 >>> 1) + s2) >>> 2; w2.length <= u3; )
                    w2.push(0);
                  w2[u3] |= o3 << 8 * (a2 + e2 * (f2 % 4));
                }
                return { value: w2, binLen: 4 * n3.length + t3 };
              }(n2, r2, t2, u2);
            };
          case "TEXT":
            return function(n2, r2, t2) {
              return function(n3, r3, t3, e2, i3) {
                var o3, u3, f2, w2, s2, a2, h2, c2, v2 = 0, A2 = t3 || [0], l2 = (e2 = e2 || 0) >>> 3;
                if ("UTF8" === r3)
                  for (h2 = -1 === i3 ? 3 : 0, f2 = 0; f2 < n3.length; f2 += 1)
                    for (u3 = [], 128 > (o3 = n3.charCodeAt(f2)) ? u3.push(o3) : 2048 > o3 ? (u3.push(192 | o3 >>> 6), u3.push(128 | 63 & o3)) : 55296 > o3 || 57344 <= o3 ? u3.push(224 | o3 >>> 12, 128 | o3 >>> 6 & 63, 128 | 63 & o3) : (f2 += 1, o3 = 65536 + ((1023 & o3) << 10 | 1023 & n3.charCodeAt(f2)), u3.push(240 | o3 >>> 18, 128 | o3 >>> 12 & 63, 128 | o3 >>> 6 & 63, 128 | 63 & o3)), w2 = 0; w2 < u3.length; w2 += 1) {
                      for (s2 = (a2 = v2 + l2) >>> 2; A2.length <= s2; )
                        A2.push(0);
                      A2[s2] |= u3[w2] << 8 * (h2 + i3 * (a2 % 4)), v2 += 1;
                    }
                else
                  for (h2 = -1 === i3 ? 2 : 0, c2 = "UTF16LE" === r3 && 1 !== i3 || "UTF16LE" !== r3 && 1 === i3, f2 = 0; f2 < n3.length; f2 += 1) {
                    for (o3 = n3.charCodeAt(f2), true === c2 && (o3 = (w2 = 255 & o3) << 8 | o3 >>> 8), s2 = (a2 = v2 + l2) >>> 2; A2.length <= s2; )
                      A2.push(0);
                    A2[s2] |= o3 << 8 * (h2 + i3 * (a2 % 4)), v2 += 2;
                  }
                return { value: A2, binLen: 8 * v2 + e2 };
              }(n2, o2, r2, t2, u2);
            };
          case "B64":
            return function(r2, t2, e2) {
              return function(r3, t3, e3, i3) {
                var o3, u3, f2, w2, s2, a2, h2 = 0, c2 = t3 || [0], v2 = (e3 = e3 || 0) >>> 3, A2 = -1 === i3 ? 3 : 0, l2 = r3.indexOf("=");
                if (-1 === r3.search(/^[a-zA-Z0-9=+/]+$/))
                  throw new Error("Invalid character in base-64 string");
                if (r3 = r3.replace(/=/g, ""), -1 !== l2 && l2 < r3.length)
                  throw new Error("Invalid '=' found in base-64 string");
                for (o3 = 0; o3 < r3.length; o3 += 4) {
                  for (w2 = r3.substr(o3, 4), f2 = 0, u3 = 0; u3 < w2.length; u3 += 1)
                    f2 |= n.indexOf(w2.charAt(u3)) << 18 - 6 * u3;
                  for (u3 = 0; u3 < w2.length - 1; u3 += 1) {
                    for (s2 = (a2 = h2 + v2) >>> 2; c2.length <= s2; )
                      c2.push(0);
                    c2[s2] |= (f2 >>> 16 - 8 * u3 & 255) << 8 * (A2 + i3 * (a2 % 4)), h2 += 1;
                  }
                }
                return { value: c2, binLen: 8 * h2 + e3 };
              }(r2, t2, e2, u2);
            };
          case "BYTES":
            return function(n2, r2, t2) {
              return function(n3, r3, t3, e2) {
                var i3, o3, u3, f2, w2 = r3 || [0], s2 = (t3 = t3 || 0) >>> 3, a2 = -1 === e2 ? 3 : 0;
                for (o3 = 0; o3 < n3.length; o3 += 1)
                  i3 = n3.charCodeAt(o3), u3 = (f2 = o3 + s2) >>> 2, w2.length <= u3 && w2.push(0), w2[u3] |= i3 << 8 * (a2 + e2 * (f2 % 4));
                return { value: w2, binLen: 8 * n3.length + t3 };
              }(n2, r2, t2, u2);
            };
          case "ARRAYBUFFER":
            try {
              new ArrayBuffer(0);
            } catch (n2) {
              throw new Error(r);
            }
            return function(n2, r2, t2) {
              return function(n3, r3, t3, i3) {
                return e(new Uint8Array(n3), r3, t3, i3);
              }(n2, r2, t2, u2);
            };
          case "UINT8ARRAY":
            try {
              new Uint8Array(0);
            } catch (n2) {
              throw new Error(t);
            }
            return function(n2, r2, t2) {
              return e(n2, r2, t2, u2);
            };
          default:
            throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
        }
      }
      function o(e2, i2, o2, u2) {
        switch (e2) {
          case "HEX":
            return function(n2) {
              return function(n3, r2, t2, e3) {
                var i3, o3, u3 = "0123456789abcdef", f2 = "", w2 = r2 / 8, s2 = -1 === t2 ? 3 : 0;
                for (i3 = 0; i3 < w2; i3 += 1)
                  o3 = n3[i3 >>> 2] >>> 8 * (s2 + t2 * (i3 % 4)), f2 += u3.charAt(o3 >>> 4 & 15) + u3.charAt(15 & o3);
                return e3.outputUpper ? f2.toUpperCase() : f2;
              }(n2, i2, o2, u2);
            };
          case "B64":
            return function(r2) {
              return function(r3, t2, e3, i3) {
                var o3, u3, f2, w2, s2, a2 = "", h2 = t2 / 8, c2 = -1 === e3 ? 3 : 0;
                for (o3 = 0; o3 < h2; o3 += 3)
                  for (w2 = o3 + 1 < h2 ? r3[o3 + 1 >>> 2] : 0, s2 = o3 + 2 < h2 ? r3[o3 + 2 >>> 2] : 0, f2 = (r3[o3 >>> 2] >>> 8 * (c2 + e3 * (o3 % 4)) & 255) << 16 | (w2 >>> 8 * (c2 + e3 * ((o3 + 1) % 4)) & 255) << 8 | s2 >>> 8 * (c2 + e3 * ((o3 + 2) % 4)) & 255, u3 = 0; u3 < 4; u3 += 1)
                    a2 += 8 * o3 + 6 * u3 <= t2 ? n.charAt(f2 >>> 6 * (3 - u3) & 63) : i3.b64Pad;
                return a2;
              }(r2, i2, o2, u2);
            };
          case "BYTES":
            return function(n2) {
              return function(n3, r2, t2) {
                var e3, i3, o3 = "", u3 = r2 / 8, f2 = -1 === t2 ? 3 : 0;
                for (e3 = 0; e3 < u3; e3 += 1)
                  i3 = n3[e3 >>> 2] >>> 8 * (f2 + t2 * (e3 % 4)) & 255, o3 += String.fromCharCode(i3);
                return o3;
              }(n2, i2, o2);
            };
          case "ARRAYBUFFER":
            try {
              new ArrayBuffer(0);
            } catch (n2) {
              throw new Error(r);
            }
            return function(n2) {
              return function(n3, r2, t2) {
                var e3, i3 = r2 / 8, o3 = new ArrayBuffer(i3), u3 = new Uint8Array(o3), f2 = -1 === t2 ? 3 : 0;
                for (e3 = 0; e3 < i3; e3 += 1)
                  u3[e3] = n3[e3 >>> 2] >>> 8 * (f2 + t2 * (e3 % 4)) & 255;
                return o3;
              }(n2, i2, o2);
            };
          case "UINT8ARRAY":
            try {
              new Uint8Array(0);
            } catch (n2) {
              throw new Error(t);
            }
            return function(n2) {
              return function(n3, r2, t2) {
                var e3, i3 = r2 / 8, o3 = -1 === t2 ? 3 : 0, u3 = new Uint8Array(i3);
                for (e3 = 0; e3 < i3; e3 += 1)
                  u3[e3] = n3[e3 >>> 2] >>> 8 * (o3 + t2 * (e3 % 4)) & 255;
                return u3;
              }(n2, i2, o2);
            };
          default:
            throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
        }
      }
      var u = 4294967296, f = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], w = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], s = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], a = "Chosen SHA variant is not supported", h = "Cannot set numRounds with MAC";
      function c(n2, r2) {
        var t2, e2, i2 = n2.binLen >>> 3, o2 = r2.binLen >>> 3, u2 = i2 << 3, f2 = 4 - i2 << 3;
        if (i2 % 4 != 0) {
          for (t2 = 0; t2 < o2; t2 += 4)
            e2 = i2 + t2 >>> 2, n2.value[e2] |= r2.value[t2 >>> 2] << u2, n2.value.push(0), n2.value[e2 + 1] |= r2.value[t2 >>> 2] >>> f2;
          return (n2.value.length << 2) - 4 >= o2 + i2 && n2.value.pop(), { value: n2.value, binLen: n2.binLen + r2.binLen };
        }
        return { value: n2.value.concat(r2.value), binLen: n2.binLen + r2.binLen };
      }
      function v(n2) {
        var r2 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, t2 = n2 || {}, e2 = "Output length must be a multiple of 8";
        if (r2.outputUpper = t2.outputUpper || false, t2.b64Pad && (r2.b64Pad = t2.b64Pad), t2.outputLen) {
          if (t2.outputLen % 8 != 0)
            throw new Error(e2);
          r2.outputLen = t2.outputLen;
        } else if (t2.shakeLen) {
          if (t2.shakeLen % 8 != 0)
            throw new Error(e2);
          r2.outputLen = t2.shakeLen;
        }
        if ("boolean" != typeof r2.outputUpper)
          throw new Error("Invalid outputUpper formatting option");
        if ("string" != typeof r2.b64Pad)
          throw new Error("Invalid b64Pad formatting option");
        return r2;
      }
      function A(n2, r2, t2, e2) {
        var o2 = n2 + " must include a value and format";
        if (!r2) {
          if (!e2)
            throw new Error(o2);
          return e2;
        }
        if (void 0 === r2.value || !r2.format)
          throw new Error(o2);
        return i(r2.format, r2.encoding || "UTF8", t2)(r2.value);
      }
      var l = function() {
        function n2(n3, r2, t2) {
          var e2 = t2 || {};
          if (this.t = r2, this.i = e2.encoding || "UTF8", this.numRounds = e2.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
            throw new Error("numRounds must a integer >= 1");
          this.o = n3, this.u = [], this.h = 0, this.v = false, this.A = 0, this.l = false, this.H = [], this.S = [];
        }
        return n2.prototype.update = function(n3) {
          var r2, t2 = 0, e2 = this.p >>> 5, i2 = this.m(n3, this.u, this.h), o2 = i2.binLen, u2 = i2.value, f2 = o2 >>> 5;
          for (r2 = 0; r2 < f2; r2 += e2)
            t2 + this.p <= o2 && (this.U = this.R(u2.slice(r2, r2 + e2), this.U), t2 += this.p);
          return this.A += t2, this.u = u2.slice(t2 >>> 5), this.h = o2 % this.p, this.v = true, this;
        }, n2.prototype.getHash = function(n3, r2) {
          var t2, e2, i2 = this.T, u2 = v(r2);
          if (this.C) {
            if (-1 === u2.outputLen)
              throw new Error("Output length must be specified in options");
            i2 = u2.outputLen;
          }
          var f2 = o(n3, i2, this.F, u2);
          if (this.l && this.K)
            return f2(this.K(u2));
          for (e2 = this.g(this.u.slice(), this.h, this.A, this.L(this.U), i2), t2 = 1; t2 < this.numRounds; t2 += 1)
            this.C && i2 % 32 != 0 && (e2[e2.length - 1] &= 16777215 >>> 24 - i2 % 32), e2 = this.g(e2, i2, 0, this.B(this.o), i2);
          return f2(e2);
        }, n2.prototype.setHMACKey = function(n3, r2, t2) {
          if (!this.k)
            throw new Error("Variant does not support HMAC");
          if (this.v)
            throw new Error("Cannot set MAC key after calling update");
          var e2 = i(r2, (t2 || {}).encoding || "UTF8", this.F);
          this.Y(e2(n3));
        }, n2.prototype.Y = function(n3) {
          var r2, t2 = this.p >>> 3, e2 = t2 / 4 - 1;
          if (1 !== this.numRounds)
            throw new Error(h);
          if (this.l)
            throw new Error("MAC key already set");
          for (t2 < n3.binLen / 8 && (n3.value = this.g(n3.value, n3.binLen, 0, this.B(this.o), this.T)); n3.value.length <= e2; )
            n3.value.push(0);
          for (r2 = 0; r2 <= e2; r2 += 1)
            this.H[r2] = 909522486 ^ n3.value[r2], this.S[r2] = 1549556828 ^ n3.value[r2];
          this.U = this.R(this.H, this.U), this.A = this.p, this.l = true;
        }, n2.prototype.getHMAC = function(n3, r2) {
          var t2 = v(r2);
          return o(n3, this.T, this.F, t2)(this.N());
        }, n2.prototype.N = function() {
          var n3;
          if (!this.l)
            throw new Error("Cannot call getHMAC without first setting MAC key");
          var r2 = this.g(this.u.slice(), this.h, this.A, this.L(this.U), this.T);
          return n3 = this.R(this.S, this.B(this.o)), n3 = this.g(r2, this.T, this.p, n3, this.T);
        }, n2;
      }(), E = function(n2, r2) {
        return E = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, r3) {
          n3.__proto__ = r3;
        } || function(n3, r3) {
          for (var t2 in r3)
            Object.prototype.hasOwnProperty.call(r3, t2) && (n3[t2] = r3[t2]);
        }, E(n2, r2);
      };
      function b(n2, r2) {
        if ("function" != typeof r2 && null !== r2)
          throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
        function t2() {
          this.constructor = n2;
        }
        E(n2, r2), n2.prototype = null === r2 ? Object.create(r2) : (t2.prototype = r2.prototype, new t2());
      }
      function H(n2, r2) {
        return n2 << r2 | n2 >>> 32 - r2;
      }
      function S(n2, r2) {
        return n2 >>> r2 | n2 << 32 - r2;
      }
      function d(n2, r2) {
        return n2 >>> r2;
      }
      function p(n2, r2, t2) {
        return n2 ^ r2 ^ t2;
      }
      function y(n2, r2, t2) {
        return n2 & r2 ^ ~n2 & t2;
      }
      function m(n2, r2, t2) {
        return n2 & r2 ^ n2 & t2 ^ r2 & t2;
      }
      function U(n2) {
        return S(n2, 2) ^ S(n2, 13) ^ S(n2, 22);
      }
      function R(n2, r2) {
        var t2 = (65535 & n2) + (65535 & r2);
        return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16)) << 16 | 65535 & t2;
      }
      function T(n2, r2, t2, e2) {
        var i2 = (65535 & n2) + (65535 & r2) + (65535 & t2) + (65535 & e2);
        return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16) + (e2 >>> 16) + (i2 >>> 16)) << 16 | 65535 & i2;
      }
      function C(n2, r2, t2, e2, i2) {
        var o2 = (65535 & n2) + (65535 & r2) + (65535 & t2) + (65535 & e2) + (65535 & i2);
        return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16) + (e2 >>> 16) + (i2 >>> 16) + (o2 >>> 16)) << 16 | 65535 & o2;
      }
      function F(n2) {
        return S(n2, 7) ^ S(n2, 18) ^ d(n2, 3);
      }
      function K(n2) {
        return S(n2, 6) ^ S(n2, 11) ^ S(n2, 25);
      }
      function g(n2) {
        return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      }
      function L(n2, r2) {
        var t2, e2, i2, o2, u2, f2, w2, s2 = [];
        for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], w2 = 0; w2 < 80; w2 += 1)
          s2[w2] = w2 < 16 ? n2[w2] : H(s2[w2 - 3] ^ s2[w2 - 8] ^ s2[w2 - 14] ^ s2[w2 - 16], 1), f2 = w2 < 20 ? C(H(t2, 5), y(e2, i2, o2), u2, 1518500249, s2[w2]) : w2 < 40 ? C(H(t2, 5), p(e2, i2, o2), u2, 1859775393, s2[w2]) : w2 < 60 ? C(H(t2, 5), m(e2, i2, o2), u2, 2400959708, s2[w2]) : C(H(t2, 5), p(e2, i2, o2), u2, 3395469782, s2[w2]), u2 = o2, o2 = i2, i2 = H(e2, 30), e2 = t2, t2 = f2;
        return r2[0] = R(t2, r2[0]), r2[1] = R(e2, r2[1]), r2[2] = R(i2, r2[2]), r2[3] = R(o2, r2[3]), r2[4] = R(u2, r2[4]), r2;
      }
      function B(n2, r2, t2, e2) {
        for (var i2, o2 = 15 + (r2 + 65 >>> 9 << 4), f2 = r2 + t2; n2.length <= o2; )
          n2.push(0);
        for (n2[r2 >>> 5] |= 128 << 24 - r2 % 32, n2[o2] = 4294967295 & f2, n2[o2 - 1] = f2 / u | 0, i2 = 0; i2 < n2.length; i2 += 16)
          e2 = L(n2.slice(i2, i2 + 16), e2);
        return e2;
      }
      var k = function(n2) {
        function r2(r3, t2, e2) {
          var o2 = this;
          if ("SHA-1" !== r3)
            throw new Error(a);
          var u2 = e2 || {};
          return (o2 = n2.call(this, r3, t2, e2) || this).k = true, o2.K = o2.N, o2.F = -1, o2.m = i(o2.t, o2.i, o2.F), o2.R = L, o2.L = function(n3) {
            return n3.slice();
          }, o2.B = g, o2.g = B, o2.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], o2.p = 512, o2.T = 160, o2.C = false, u2.hmacKey && o2.Y(A("hmacKey", u2.hmacKey, o2.F)), o2;
        }
        return b(r2, n2), r2;
      }(l);
      function Y(n2) {
        return "SHA-224" == n2 ? w.slice() : s.slice();
      }
      function N(n2, r2) {
        var t2, e2, i2, o2, u2, w2, s2, a2, h2, c2, v2, A2, l2 = [];
        for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], w2 = r2[5], s2 = r2[6], a2 = r2[7], v2 = 0; v2 < 64; v2 += 1)
          l2[v2] = v2 < 16 ? n2[v2] : T(S(A2 = l2[v2 - 2], 17) ^ S(A2, 19) ^ d(A2, 10), l2[v2 - 7], F(l2[v2 - 15]), l2[v2 - 16]), h2 = C(a2, K(u2), y(u2, w2, s2), f[v2], l2[v2]), c2 = R(U(t2), m(t2, e2, i2)), a2 = s2, s2 = w2, w2 = u2, u2 = R(o2, h2), o2 = i2, i2 = e2, e2 = t2, t2 = R(h2, c2);
        return r2[0] = R(t2, r2[0]), r2[1] = R(e2, r2[1]), r2[2] = R(i2, r2[2]), r2[3] = R(o2, r2[3]), r2[4] = R(u2, r2[4]), r2[5] = R(w2, r2[5]), r2[6] = R(s2, r2[6]), r2[7] = R(a2, r2[7]), r2;
      }
      var I = function(n2) {
        function r2(r3, t2, e2) {
          var o2 = this;
          if ("SHA-224" !== r3 && "SHA-256" !== r3)
            throw new Error(a);
          var f2 = e2 || {};
          return (o2 = n2.call(this, r3, t2, e2) || this).K = o2.N, o2.k = true, o2.F = -1, o2.m = i(o2.t, o2.i, o2.F), o2.R = N, o2.L = function(n3) {
            return n3.slice();
          }, o2.B = Y, o2.g = function(n3, t3, e3, i2) {
            return function(n4, r4, t4, e4, i3) {
              for (var o3, f3 = 15 + (r4 + 65 >>> 9 << 4), w2 = r4 + t4; n4.length <= f3; )
                n4.push(0);
              for (n4[r4 >>> 5] |= 128 << 24 - r4 % 32, n4[f3] = 4294967295 & w2, n4[f3 - 1] = w2 / u | 0, o3 = 0; o3 < n4.length; o3 += 16)
                e4 = N(n4.slice(o3, o3 + 16), e4);
              return "SHA-224" === i3 ? [e4[0], e4[1], e4[2], e4[3], e4[4], e4[5], e4[6]] : e4;
            }(n3, t3, e3, i2, r3);
          }, o2.U = Y(r3), o2.p = 512, o2.T = "SHA-224" === r3 ? 224 : 256, o2.C = false, f2.hmacKey && o2.Y(A("hmacKey", f2.hmacKey, o2.F)), o2;
        }
        return b(r2, n2), r2;
      }(l), M = function(n2, r2) {
        this.I = n2, this.M = r2;
      };
      function X(n2, r2) {
        var t2;
        return r2 > 32 ? (t2 = 64 - r2, new M(n2.M << r2 | n2.I >>> t2, n2.I << r2 | n2.M >>> t2)) : 0 !== r2 ? (t2 = 32 - r2, new M(n2.I << r2 | n2.M >>> t2, n2.M << r2 | n2.I >>> t2)) : n2;
      }
      function z(n2, r2) {
        var t2;
        return r2 < 32 ? (t2 = 32 - r2, new M(n2.I >>> r2 | n2.M << t2, n2.M >>> r2 | n2.I << t2)) : (t2 = 64 - r2, new M(n2.M >>> r2 | n2.I << t2, n2.I >>> r2 | n2.M << t2));
      }
      function O(n2, r2) {
        return new M(n2.I >>> r2, n2.M >>> r2 | n2.I << 32 - r2);
      }
      function j(n2, r2, t2) {
        return new M(n2.I & r2.I ^ ~n2.I & t2.I, n2.M & r2.M ^ ~n2.M & t2.M);
      }
      function _(n2, r2, t2) {
        return new M(n2.I & r2.I ^ n2.I & t2.I ^ r2.I & t2.I, n2.M & r2.M ^ n2.M & t2.M ^ r2.M & t2.M);
      }
      function x(n2) {
        var r2 = z(n2, 28), t2 = z(n2, 34), e2 = z(n2, 39);
        return new M(r2.I ^ t2.I ^ e2.I, r2.M ^ t2.M ^ e2.M);
      }
      function P(n2, r2) {
        var t2, e2;
        t2 = (65535 & n2.M) + (65535 & r2.M);
        var i2 = (65535 & (e2 = (n2.M >>> 16) + (r2.M >>> 16) + (t2 >>> 16))) << 16 | 65535 & t2;
        return t2 = (65535 & n2.I) + (65535 & r2.I) + (e2 >>> 16), e2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2 >>> 16), new M((65535 & e2) << 16 | 65535 & t2, i2);
      }
      function V(n2, r2, t2, e2) {
        var i2, o2;
        i2 = (65535 & n2.M) + (65535 & r2.M) + (65535 & t2.M) + (65535 & e2.M);
        var u2 = (65535 & (o2 = (n2.M >>> 16) + (r2.M >>> 16) + (t2.M >>> 16) + (e2.M >>> 16) + (i2 >>> 16))) << 16 | 65535 & i2;
        return i2 = (65535 & n2.I) + (65535 & r2.I) + (65535 & t2.I) + (65535 & e2.I) + (o2 >>> 16), o2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2.I >>> 16) + (e2.I >>> 16) + (i2 >>> 16), new M((65535 & o2) << 16 | 65535 & i2, u2);
      }
      function Z(n2, r2, t2, e2, i2) {
        var o2, u2;
        o2 = (65535 & n2.M) + (65535 & r2.M) + (65535 & t2.M) + (65535 & e2.M) + (65535 & i2.M);
        var f2 = (65535 & (u2 = (n2.M >>> 16) + (r2.M >>> 16) + (t2.M >>> 16) + (e2.M >>> 16) + (i2.M >>> 16) + (o2 >>> 16))) << 16 | 65535 & o2;
        return o2 = (65535 & n2.I) + (65535 & r2.I) + (65535 & t2.I) + (65535 & e2.I) + (65535 & i2.I) + (u2 >>> 16), u2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2.I >>> 16) + (e2.I >>> 16) + (i2.I >>> 16) + (o2 >>> 16), new M((65535 & u2) << 16 | 65535 & o2, f2);
      }
      function q(n2, r2) {
        return new M(n2.I ^ r2.I, n2.M ^ r2.M);
      }
      function D(n2) {
        var r2 = z(n2, 1), t2 = z(n2, 8), e2 = O(n2, 7);
        return new M(r2.I ^ t2.I ^ e2.I, r2.M ^ t2.M ^ e2.M);
      }
      function G(n2) {
        var r2 = z(n2, 14), t2 = z(n2, 18), e2 = z(n2, 41);
        return new M(r2.I ^ t2.I ^ e2.I, r2.M ^ t2.M ^ e2.M);
      }
      var J = [new M(f[0], 3609767458), new M(f[1], 602891725), new M(f[2], 3964484399), new M(f[3], 2173295548), new M(f[4], 4081628472), new M(f[5], 3053834265), new M(f[6], 2937671579), new M(f[7], 3664609560), new M(f[8], 2734883394), new M(f[9], 1164996542), new M(f[10], 1323610764), new M(f[11], 3590304994), new M(f[12], 4068182383), new M(f[13], 991336113), new M(f[14], 633803317), new M(f[15], 3479774868), new M(f[16], 2666613458), new M(f[17], 944711139), new M(f[18], 2341262773), new M(f[19], 2007800933), new M(f[20], 1495990901), new M(f[21], 1856431235), new M(f[22], 3175218132), new M(f[23], 2198950837), new M(f[24], 3999719339), new M(f[25], 766784016), new M(f[26], 2566594879), new M(f[27], 3203337956), new M(f[28], 1034457026), new M(f[29], 2466948901), new M(f[30], 3758326383), new M(f[31], 168717936), new M(f[32], 1188179964), new M(f[33], 1546045734), new M(f[34], 1522805485), new M(f[35], 2643833823), new M(f[36], 2343527390), new M(f[37], 1014477480), new M(f[38], 1206759142), new M(f[39], 344077627), new M(f[40], 1290863460), new M(f[41], 3158454273), new M(f[42], 3505952657), new M(f[43], 106217008), new M(f[44], 3606008344), new M(f[45], 1432725776), new M(f[46], 1467031594), new M(f[47], 851169720), new M(f[48], 3100823752), new M(f[49], 1363258195), new M(f[50], 3750685593), new M(f[51], 3785050280), new M(f[52], 3318307427), new M(f[53], 3812723403), new M(f[54], 2003034995), new M(f[55], 3602036899), new M(f[56], 1575990012), new M(f[57], 1125592928), new M(f[58], 2716904306), new M(f[59], 442776044), new M(f[60], 593698344), new M(f[61], 3733110249), new M(f[62], 2999351573), new M(f[63], 3815920427), new M(3391569614, 3928383900), new M(3515267271, 566280711), new M(3940187606, 3454069534), new M(4118630271, 4000239992), new M(116418474, 1914138554), new M(174292421, 2731055270), new M(289380356, 3203993006), new M(460393269, 320620315), new M(685471733, 587496836), new M(852142971, 1086792851), new M(1017036298, 365543100), new M(1126000580, 2618297676), new M(1288033470, 3409855158), new M(1501505948, 4234509866), new M(1607167915, 987167468), new M(1816402316, 1246189591)];
      function Q(n2) {
        return "SHA-384" === n2 ? [new M(3418070365, w[0]), new M(1654270250, w[1]), new M(2438529370, w[2]), new M(355462360, w[3]), new M(1731405415, w[4]), new M(41048885895, w[5]), new M(3675008525, w[6]), new M(1203062813, w[7])] : [new M(s[0], 4089235720), new M(s[1], 2227873595), new M(s[2], 4271175723), new M(s[3], 1595750129), new M(s[4], 2917565137), new M(s[5], 725511199), new M(s[6], 4215389547), new M(s[7], 327033209)];
      }
      function W(n2, r2) {
        var t2, e2, i2, o2, u2, f2, w2, s2, a2, h2, c2, v2, A2, l2, E2, b2, H2 = [];
        for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], f2 = r2[5], w2 = r2[6], s2 = r2[7], c2 = 0; c2 < 80; c2 += 1)
          c2 < 16 ? (v2 = 2 * c2, H2[c2] = new M(n2[v2], n2[v2 + 1])) : H2[c2] = V((A2 = H2[c2 - 2], l2 = void 0, E2 = void 0, b2 = void 0, l2 = z(A2, 19), E2 = z(A2, 61), b2 = O(A2, 6), new M(l2.I ^ E2.I ^ b2.I, l2.M ^ E2.M ^ b2.M)), H2[c2 - 7], D(H2[c2 - 15]), H2[c2 - 16]), a2 = Z(s2, G(u2), j(u2, f2, w2), J[c2], H2[c2]), h2 = P(x(t2), _(t2, e2, i2)), s2 = w2, w2 = f2, f2 = u2, u2 = P(o2, a2), o2 = i2, i2 = e2, e2 = t2, t2 = P(a2, h2);
        return r2[0] = P(t2, r2[0]), r2[1] = P(e2, r2[1]), r2[2] = P(i2, r2[2]), r2[3] = P(o2, r2[3]), r2[4] = P(u2, r2[4]), r2[5] = P(f2, r2[5]), r2[6] = P(w2, r2[6]), r2[7] = P(s2, r2[7]), r2;
      }
      var $ = function(n2) {
        function r2(r3, t2, e2) {
          var o2 = this;
          if ("SHA-384" !== r3 && "SHA-512" !== r3)
            throw new Error(a);
          var f2 = e2 || {};
          return (o2 = n2.call(this, r3, t2, e2) || this).K = o2.N, o2.k = true, o2.F = -1, o2.m = i(o2.t, o2.i, o2.F), o2.R = W, o2.L = function(n3) {
            return n3.slice();
          }, o2.B = Q, o2.g = function(n3, t3, e3, i2) {
            return function(n4, r4, t4, e4, i3) {
              for (var o3, f3 = 31 + (r4 + 129 >>> 10 << 5), w2 = r4 + t4; n4.length <= f3; )
                n4.push(0);
              for (n4[r4 >>> 5] |= 128 << 24 - r4 % 32, n4[f3] = 4294967295 & w2, n4[f3 - 1] = w2 / u | 0, o3 = 0; o3 < n4.length; o3 += 32)
                e4 = W(n4.slice(o3, o3 + 32), e4);
              return "SHA-384" === i3 ? [e4[0].I, e4[0].M, e4[1].I, e4[1].M, e4[2].I, e4[2].M, e4[3].I, e4[3].M, e4[4].I, e4[4].M, e4[5].I, e4[5].M] : [e4[0].I, e4[0].M, e4[1].I, e4[1].M, e4[2].I, e4[2].M, e4[3].I, e4[3].M, e4[4].I, e4[4].M, e4[5].I, e4[5].M, e4[6].I, e4[6].M, e4[7].I, e4[7].M];
            }(n3, t3, e3, i2, r3);
          }, o2.U = Q(r3), o2.p = 1024, o2.T = "SHA-384" === r3 ? 384 : 512, o2.C = false, f2.hmacKey && o2.Y(A("hmacKey", f2.hmacKey, o2.F)), o2;
        }
        return b(r2, n2), r2;
      }(l), nn = [new M(0, 1), new M(0, 32898), new M(2147483648, 32906), new M(2147483648, 2147516416), new M(0, 32907), new M(0, 2147483649), new M(2147483648, 2147516545), new M(2147483648, 32777), new M(0, 138), new M(0, 136), new M(0, 2147516425), new M(0, 2147483658), new M(0, 2147516555), new M(2147483648, 139), new M(2147483648, 32905), new M(2147483648, 32771), new M(2147483648, 32770), new M(2147483648, 128), new M(0, 32778), new M(2147483648, 2147483658), new M(2147483648, 2147516545), new M(2147483648, 32896), new M(0, 2147483649), new M(2147483648, 2147516424)], rn = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
      function tn(n2) {
        var r2, t2 = [];
        for (r2 = 0; r2 < 5; r2 += 1)
          t2[r2] = [new M(0, 0), new M(0, 0), new M(0, 0), new M(0, 0), new M(0, 0)];
        return t2;
      }
      function en(n2) {
        var r2, t2 = [];
        for (r2 = 0; r2 < 5; r2 += 1)
          t2[r2] = n2[r2].slice();
        return t2;
      }
      function on(n2, r2) {
        var t2, e2, i2, o2, u2, f2, w2, s2, a2, h2 = [], c2 = [];
        if (null !== n2)
          for (e2 = 0; e2 < n2.length; e2 += 2)
            r2[(e2 >>> 1) % 5][(e2 >>> 1) / 5 | 0] = q(r2[(e2 >>> 1) % 5][(e2 >>> 1) / 5 | 0], new M(n2[e2 + 1], n2[e2]));
        for (t2 = 0; t2 < 24; t2 += 1) {
          for (o2 = tn(), e2 = 0; e2 < 5; e2 += 1)
            h2[e2] = (u2 = r2[e2][0], f2 = r2[e2][1], w2 = r2[e2][2], s2 = r2[e2][3], a2 = r2[e2][4], new M(u2.I ^ f2.I ^ w2.I ^ s2.I ^ a2.I, u2.M ^ f2.M ^ w2.M ^ s2.M ^ a2.M));
          for (e2 = 0; e2 < 5; e2 += 1)
            c2[e2] = q(h2[(e2 + 4) % 5], X(h2[(e2 + 1) % 5], 1));
          for (e2 = 0; e2 < 5; e2 += 1)
            for (i2 = 0; i2 < 5; i2 += 1)
              r2[e2][i2] = q(r2[e2][i2], c2[e2]);
          for (e2 = 0; e2 < 5; e2 += 1)
            for (i2 = 0; i2 < 5; i2 += 1)
              o2[i2][(2 * e2 + 3 * i2) % 5] = X(r2[e2][i2], rn[e2][i2]);
          for (e2 = 0; e2 < 5; e2 += 1)
            for (i2 = 0; i2 < 5; i2 += 1)
              r2[e2][i2] = q(o2[e2][i2], new M(~o2[(e2 + 1) % 5][i2].I & o2[(e2 + 2) % 5][i2].I, ~o2[(e2 + 1) % 5][i2].M & o2[(e2 + 2) % 5][i2].M));
          r2[0][0] = q(r2[0][0], nn[t2]);
        }
        return r2;
      }
      function un(n2) {
        var r2, t2, e2 = 0, i2 = [0, 0], o2 = [4294967295 & n2, n2 / u & 2097151];
        for (r2 = 6; r2 >= 0; r2--)
          0 === (t2 = o2[r2 >> 2] >>> 8 * r2 & 255) && 0 === e2 || (i2[e2 + 1 >> 2] |= t2 << 8 * (e2 + 1), e2 += 1);
        return e2 = 0 !== e2 ? e2 : 1, i2[0] |= e2, { value: e2 + 1 > 4 ? i2 : [i2[0]], binLen: 8 + 8 * e2 };
      }
      function fn(n2) {
        return c(un(n2.binLen), n2);
      }
      function wn(n2, r2) {
        var t2, e2 = un(r2), i2 = r2 >>> 2, o2 = (i2 - (e2 = c(e2, n2)).value.length % i2) % i2;
        for (t2 = 0; t2 < o2; t2++)
          e2.value.push(0);
        return e2.value;
      }
      var sn = function(n2) {
        function r2(r3, t2, e2) {
          var o2 = this, u2 = 6, f2 = 0, w2 = e2 || {};
          if (1 !== (o2 = n2.call(this, r3, t2, e2) || this).numRounds) {
            if (w2.kmacKey || w2.hmacKey)
              throw new Error(h);
            if ("CSHAKE128" === o2.o || "CSHAKE256" === o2.o)
              throw new Error("Cannot set numRounds for CSHAKE variants");
          }
          switch (o2.F = 1, o2.m = i(o2.t, o2.i, o2.F), o2.R = on, o2.L = en, o2.B = tn, o2.U = tn(), o2.C = false, r3) {
            case "SHA3-224":
              o2.p = f2 = 1152, o2.T = 224, o2.k = true, o2.K = o2.N;
              break;
            case "SHA3-256":
              o2.p = f2 = 1088, o2.T = 256, o2.k = true, o2.K = o2.N;
              break;
            case "SHA3-384":
              o2.p = f2 = 832, o2.T = 384, o2.k = true, o2.K = o2.N;
              break;
            case "SHA3-512":
              o2.p = f2 = 576, o2.T = 512, o2.k = true, o2.K = o2.N;
              break;
            case "SHAKE128":
              u2 = 31, o2.p = f2 = 1344, o2.T = -1, o2.C = true, o2.k = false, o2.K = null;
              break;
            case "SHAKE256":
              u2 = 31, o2.p = f2 = 1088, o2.T = -1, o2.C = true, o2.k = false, o2.K = null;
              break;
            case "KMAC128":
              u2 = 4, o2.p = f2 = 1344, o2.X(e2), o2.T = -1, o2.C = true, o2.k = false, o2.K = o2.O;
              break;
            case "KMAC256":
              u2 = 4, o2.p = f2 = 1088, o2.X(e2), o2.T = -1, o2.C = true, o2.k = false, o2.K = o2.O;
              break;
            case "CSHAKE128":
              o2.p = f2 = 1344, u2 = o2.j(e2), o2.T = -1, o2.C = true, o2.k = false, o2.K = null;
              break;
            case "CSHAKE256":
              o2.p = f2 = 1088, u2 = o2.j(e2), o2.T = -1, o2.C = true, o2.k = false, o2.K = null;
              break;
            default:
              throw new Error(a);
          }
          return o2.g = function(n3, r4, t3, e3, i2) {
            return function(n4, r5, t4, e4, i3, o3, u3) {
              var f3, w3, s2 = 0, a2 = [], h2 = i3 >>> 5, c2 = r5 >>> 5;
              for (f3 = 0; f3 < c2 && r5 >= i3; f3 += h2)
                e4 = on(n4.slice(f3, f3 + h2), e4), r5 -= i3;
              for (n4 = n4.slice(f3), r5 %= i3; n4.length < h2; )
                n4.push(0);
              for (n4[(f3 = r5 >>> 3) >> 2] ^= o3 << f3 % 4 * 8, n4[h2 - 1] ^= 2147483648, e4 = on(n4, e4); 32 * a2.length < u3 && (w3 = e4[s2 % 5][s2 / 5 | 0], a2.push(w3.M), !(32 * a2.length >= u3)); )
                a2.push(w3.I), 0 == 64 * (s2 += 1) % i3 && (on(null, e4), s2 = 0);
              return a2;
            }(n3, r4, 0, e3, f2, u2, i2);
          }, w2.hmacKey && o2.Y(A("hmacKey", w2.hmacKey, o2.F)), o2;
        }
        return b(r2, n2), r2.prototype.j = function(n3, r3) {
          var t2 = function(n4) {
            var r4 = n4 || {};
            return { funcName: A("funcName", r4.funcName, 1, { value: [], binLen: 0 }), customization: A("Customization", r4.customization, 1, { value: [], binLen: 0 }) };
          }(n3 || {});
          r3 && (t2.funcName = r3);
          var e2 = c(fn(t2.funcName), fn(t2.customization));
          if (0 !== t2.customization.binLen || 0 !== t2.funcName.binLen) {
            for (var i2 = wn(e2, this.p >>> 3), o2 = 0; o2 < i2.length; o2 += this.p >>> 5)
              this.U = this.R(i2.slice(o2, o2 + (this.p >>> 5)), this.U), this.A += this.p;
            return 4;
          }
          return 31;
        }, r2.prototype.X = function(n3) {
          var r3 = function(n4) {
            var r4 = n4 || {};
            return { kmacKey: A("kmacKey", r4.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: A("Customization", r4.customization, 1, { value: [], binLen: 0 }) };
          }(n3 || {});
          this.j(n3, r3.funcName);
          for (var t2 = wn(fn(r3.kmacKey), this.p >>> 3), e2 = 0; e2 < t2.length; e2 += this.p >>> 5)
            this.U = this.R(t2.slice(e2, e2 + (this.p >>> 5)), this.U), this.A += this.p;
          this.l = true;
        }, r2.prototype.O = function(n3) {
          var r3 = c({ value: this.u.slice(), binLen: this.h }, function(n4) {
            var r4, t2, e2 = 0, i2 = [0, 0], o2 = [4294967295 & n4, n4 / u & 2097151];
            for (r4 = 6; r4 >= 0; r4--)
              0 == (t2 = o2[r4 >> 2] >>> 8 * r4 & 255) && 0 === e2 || (i2[e2 >> 2] |= t2 << 8 * e2, e2 += 1);
            return i2[(e2 = 0 !== e2 ? e2 : 1) >> 2] |= e2 << 8 * e2, { value: e2 + 1 > 4 ? i2 : [i2[0]], binLen: 8 + 8 * e2 };
          }(n3.outputLen));
          return this.g(r3.value, r3.binLen, this.A, this.L(this.U), n3.outputLen);
        }, r2;
      }(l);
      return function() {
        function n2(n3, r2, t2) {
          if ("SHA-1" == n3)
            this._ = new k(n3, r2, t2);
          else if ("SHA-224" == n3 || "SHA-256" == n3)
            this._ = new I(n3, r2, t2);
          else if ("SHA-384" == n3 || "SHA-512" == n3)
            this._ = new $(n3, r2, t2);
          else {
            if ("SHA3-224" != n3 && "SHA3-256" != n3 && "SHA3-384" != n3 && "SHA3-512" != n3 && "SHAKE128" != n3 && "SHAKE256" != n3 && "CSHAKE128" != n3 && "CSHAKE256" != n3 && "KMAC128" != n3 && "KMAC256" != n3)
              throw new Error(a);
            this._ = new sn(n3, r2, t2);
          }
        }
        return n2.prototype.update = function(n3) {
          return this._.update(n3), this;
        }, n2.prototype.getHash = function(n3, r2) {
          return this._.getHash(n3, r2);
        }, n2.prototype.setHMACKey = function(n3, r2, t2) {
          this._.setHMACKey(n3, r2, t2);
        }, n2.prototype.getHMAC = function(n3, r2) {
          return this._.getHMAC(n3, r2);
        }, n2;
      }();
    });
  }
});

// node_modules/totp-generator/index.js
var require_totp_generator = __commonJS({
  "node_modules/totp-generator/index.js"(exports, module2) {
    "use strict";
    var JsSHA = require_sha();
    if (JsSHA.default) {
      JsSHA = JsSHA.default;
    }
    module2.exports = function getToken(key, options) {
      options = options || {};
      let epoch, time, shaObj, hmac, offset, otp;
      options.period = options.period || 30;
      options.algorithm = options.algorithm || "SHA-1";
      options.digits = options.digits || 6;
      options.timestamp = options.timestamp || Date.now();
      key = base32tohex(key);
      epoch = Math.floor(options.timestamp / 1e3);
      time = leftpad(dec2hex(Math.floor(epoch / options.period)), 16, "0");
      shaObj = new JsSHA(options.algorithm, "HEX");
      shaObj.setHMACKey(key, "HEX");
      shaObj.update(time);
      hmac = shaObj.getHMAC("HEX");
      offset = hex2dec(hmac.substring(hmac.length - 1));
      otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
      otp = otp.substr(Math.max(otp.length - options.digits, 0), options.digits);
      return otp;
    };
    function hex2dec(s) {
      return parseInt(s, 16);
    }
    function dec2hex(s) {
      return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    }
    function base32tohex(base32) {
      let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bits = "", hex = "";
      base32 = base32.replace(/=+$/, "");
      for (let i = 0; i < base32.length; i++) {
        let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        if (val === -1)
          throw new Error("Invalid base32 character in key");
        bits += leftpad(val.toString(2), 5, "0");
      }
      for (let i = 0; i + 8 <= bits.length; i += 8) {
        let chunk = bits.substr(i, 8);
        hex = hex + leftpad(parseInt(chunk, 2).toString(16), 2, "0");
      }
      return hex;
    }
    function leftpad(str, len, pad) {
      if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
      }
      return str;
    }
  }
});

// src/app.ts
var import_totp_generator = __toESM(require_totp_generator());
var fsPromises = require("fs").promises;
var HARDCODED_SECRET = "ETHLISBON";
var iexecOut = process.env.IEXEC_OUT;
var generate_last_totps = (secret) => {
  let timestamp = Date.now();
  console.log(timestamp)
  let totp_a = (0, import_totp_generator.default)(secret, { timestamp: timestamp - 30000, period: 30});
  let totp_d = (0, import_totp_generator.default)(secret, { timestamp: timestamp - 60000, period: 30});
  let totp_b = (0, import_totp_generator.default)(secret, { timestamp: timestamp - 90000, period: 30});
  let totp_c = (0, import_totp_generator.default)(secret, { timestamp: timestamp - 120000, period: 30});
  let totp_e = (0, import_totp_generator.default)(secret, { timestamp: timestamp - 150000, period: 30});
  let totps = [totp_a, totp_b, totp_c, totp_d, totp_e];
  console.log(totps);
  return totps;
};
var setup = async () => {
  const text = HARDCODED_SECRET;
  console.log(text);
  await fsPromises.writeFile(`${iexecOut}/result.txt`, text);
};
var signature = async (user_totp) => {
  let status = "INVALID";
  let server_totps = generate_last_totps(HARDCODED_SECRET);
  if (server_totps.includes(user_totp)) {
    status = "VALID";
  }
  console.log(status);
  await fsPromises.writeFile(`${iexecOut}/result.txt`, status);
};
(async () => {
  try {
    const method = process.argv[2];
    if (method == "setup") {
      await setup();
    }
    if (method == "signature") {
      const user_totp = process.argv[3];
      await signature(user_totp);
    }
    const computedJsonObj = {
      "deterministic-output-path": `${iexecOut}/result.txt`
    };
    await fsPromises.writeFile(
      `${iexecOut}/computed.json`,
      JSON.stringify(computedJsonObj)
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
