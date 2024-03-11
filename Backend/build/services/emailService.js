"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require("dotenv").config();
var sendSimpleEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataSend) {
    var transporter, info;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          _context.next = 3;
          return transporter.sendMail({
            from: '"Booking Clinic 👻" <trantheduy@gmail.com>',
            // sender address
            to: dataSend.reciverEmail,
            // list of receivers
            subject: "Thông tin đặt lịch khám bệnh",
            // Subject line

            html: getBodyHTMLEmail(dataSend)
          });
        case 3:
          info = _context.sent;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendSimpleEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getBodyHTMLEmail = function getBodyHTMLEmail(dataSend) {
  var result = "";
  if (dataSend.language === "vi") {
    result = "\n \n   <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;\">\n  <h3 style=\"color: #007bff; text-align: center; margin-bottom: 20px;\">Xin cha\u0300o ".concat(dataSend.patientName, ",</h3>\n  <p style=\"color: #555; text-align: justify;\">B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c Email n\xE0y v\xEC \u0111\xE3 \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh Online tr\xEAn Booking Clinic.</p>\n  <div style=\"background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;\">\n    <p style=\"color: #333; margin: 0;\"><b>Th\u1EDDi gian:</b> ").concat(dataSend.time, "</p>\n    <p style=\"color: #333; margin: 0;\"><b>B\xE1c s\u0129:</b> ").concat(dataSend.doctorName, "</p>\n  </div>\n  <p style=\"color: #555; text-align: justify; margin-top: 20px;\">N\u1EBFu c\xE1c th\xF4ng tin tr\xEAn l\xE0 \u0111\xFAng s\u1EF1 th\u1EADt, vui l\xF2ng click v\xE0o \u0111\u01B0\u1EDDng link b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\xE1c nh\u1EADn v\xE0 ho\xE0n t\u1EA5t l\u1ECBch kh\xE1m b\u1EC7nh.</p>\n  <div style=\"text-align: center; margin-top: 20px;\">\n    <a href=\"").concat(dataSend.redireactLink, "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">X\xE1c nh\u1EADn l\u1ECBch h\u1EB9n</a>\n  </div>\n  <p style=\"color: #555; text-align: center; margin-top: 20px;\">Xin ch\xE2n th\xE0nh c\u1EA3m \u01A1n !!!</p>\n</div>\n");
  }
  if (dataSend.language === "en") {
    result = "\n \n    <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;\">\n  <h3 style=\"color: #007bff; text-align: center; margin-bottom: 20px;\">Hello ".concat(dataSend.patientName, ",</h3>\n  <p style=\"color: #555; text-align: justify;\">You have received this email because you have booked an online appointment at Booking Clinic.</p>\n  <div style=\"background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;\">\n    <p style=\"color: #333; margin: 0;\"><b>Appointment Time:</b> ").concat(dataSend.time, "</p>\n    <p style=\"color: #333; margin: 0;\"><b>Doctor:</b> ").concat(dataSend.doctorName, "</p>\n  </div>\n  <p style=\"color: #555; text-align: justify; margin-top: 20px;\">If the above information is correct, please click on the link below to confirm and complete your appointment.</p>\n  <div style=\"text-align: center; margin-top: 20px;\">\n    <a href=\"").concat(dataSend.redireactLink, "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">Confirm Appointment</a>\n  </div>\n  <p style=\"color: #555; text-align: center; margin-top: 20px;\">Thank you very much !!!</p>\n</div>\n\n  \n");
  }
  return result;
};
var sendAttachment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dataSend) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
              var transporter, info;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    transporter = _nodemailer["default"].createTransport({
                      host: "smtp.gmail.com",
                      port: 465,
                      secure: true,
                      auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: process.env.EMAIL_APP,
                        pass: process.env.EMAIL_PASSWORD
                      }
                    });
                    _context2.next = 4;
                    return transporter.sendMail({
                      from: '"Booking Clinic 👻" <trantheduy@gmail.com>',
                      // sender address
                      to: dataSend.email,
                      // list of receivers
                      subject: "Kết quả đặt lịch khám bệnh",
                      // Subject line
                      html: getBodyHTMLRemedy(dataSend),
                      attachments: [{
                        filename: "anh.png",
                        content: dataSend.imgBase64.split(",")[1],
                        encoding: "base64"
                      }]
                    });
                  case 4:
                    info = _context2.sent;
                    console.log("check infor send email");
                    console.log(info);
                    resolve();
                    _context2.next = 13;
                    break;
                  case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2["catch"](0);
                    reject(_context2.t0);
                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[0, 10]]);
            }));
            return function (_x3, _x4) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function sendAttachment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getBodyHTMLRemedy = function getBodyHTMLRemedy(dataSend) {
  var result = "";
  if (dataSend.language === "vi") {
    result = "\n \n   <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;\">\n  <h3 style=\"color: #007bff; text-align: center; margin-bottom: 20px;\">Xin cha\u0300o ".concat(dataSend.patientName, "</h3>\n  <p style=\"color: #555; text-align: justify;\">B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c Email n\xE0y v\xEC \u0111\xE3 \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh Online tr\xEAn Booking Clinic.</p>\n  <div style=\"background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;\">\n\n    <p style=\"color: #333; margin: 0;\"> Th\xF4ng tin gia\u0301 kha\u0301m/ \u0111\u01A1n thu\xF4\u0301c \u0111\u01B0\u01A1\u0323c g\u01B0\u0309i trong file \u0111i\u0301nh ke\u0300m </p>\n  </div>\n  <p style=\"color: #555; text-align: justify; margin-top: 20px;\">N\u1EBFu c\xE1c th\xF4ng tin tr\xEAn l\xE0 \u0111\xFAng s\u1EF1 th\u1EADt, vui l\xF2ng click v\xE0o \u0111\u01B0\u1EDDng link b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\xE1c nh\u1EADn v\xE0 ho\xE0n t\u1EA5t l\u1ECBch kh\xE1m b\u1EC7nh.</p>\n \n  <p style=\"color: #555; text-align: center; margin-top: 20px;\">Xin ch\xE2n th\xE0nh c\u1EA3m \u01A1n !!!</p>\n</div>\n");
  }
  if (dataSend.language === "en") {
    result = "\n \n    <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;\">\n  <h3 style=\"color: #007bff; text-align: center; margin-bottom: 20px;\">Hello ".concat(dataSend.patientName, "</h3>\n  <p style=\"color: #555; text-align: justify;\">You are receiving this email because you have booked an online medical appointment on Booking Clinic.</p>\n  <div style=\"background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;\">\n    <p style=\"color: #333; margin: 0;\">The information about the examination fee/prescription is sent in the attached file.</p>\n  </div>\n \n \n  <p style=\"color: #555; text-align: center; margin-top: 20px;\">Thank you very much !!!</p>\n</div>\n  \n");
  }
  return result;
};
var sendEmailtoPatient = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dataSend) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
              var transporter, info;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    transporter = _nodemailer["default"].createTransport({
                      host: "smtp.gmail.com",
                      port: 465,
                      secure: true,
                      auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: process.env.EMAIL_APP,
                        pass: process.env.EMAIL_PASSWORD
                      }
                    });
                    _context4.next = 4;
                    return transporter.sendMail({
                      from: '"Booking Clinic 👻" <trantheduy@gmail.com>',
                      // sender address
                      to: dataSend.email,
                      // list of receivers
                      subject: "Đăng ký email thành công đặt lịch khám bệnh",
                      // Subject line
                      html: getBodyHTMLSendEmail(dataSend)
                    });
                  case 4:
                    info = _context4.sent;
                    console.log("check infor send email");
                    console.log(info);
                    resolve();
                    _context4.next = 13;
                    break;
                  case 10:
                    _context4.prev = 10;
                    _context4.t0 = _context4["catch"](0);
                    reject(_context4.t0);
                  case 13:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[0, 10]]);
            }));
            return function (_x6, _x7) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function sendEmailtoPatient(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getBodyHTMLSendEmail = function getBodyHTMLSendEmail(dataSend) {
  var result = "";
  if (dataSend.language === "vi") {
    result = "\n \n   <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;\">\n  <h3 style=\"color: #007bff; text-align: center; margin-bottom: 20px;\">Xin cha\u0300o ".concat(dataSend.email, " </h3>\n  <p style=\"color: #555; text-align: justify;\">B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c Email n\xE0y v\xEC \u0111\u0103ng ky\u0301 Email kh\xE1m b\u1EC7nh Online tr\xEAn Booking Clinic.</p>\n  <div style=\"background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;\">\n\n    <p style=\"color: #333; margin: 0;\"> Th\xF4ng tin gia\u0301 kha\u0301m/ \u0111\u01A1n thu\xF4\u0301c \u0111\u01B0\u01A1\u0323c g\u01B0\u0309i trong file \u0111i\u0301nh ke\u0300m </p>\n  </div>\n \n \n  <p style=\"color: #555; text-align: center; margin-top: 20px;\">Xin ch\xE2n th\xE0nh c\u1EA3m \u01A1n !!!</p>\n</div>\n");
  }
  if (dataSend.language === "en") {
    result = "\n \n    <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;\">\n  <h3 style=\"color: #007bff; text-align: center; margin-bottom: 20px;\">Hello ".concat(dataSend.email, "</h3>\n  <p style=\"color: #555; text-align: justify;\">You are receiving this email because you have booked an online medical appointment on Booking Clinic.</p>\n  <div style=\"background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;\">\n    <p style=\"color: #333; margin: 0;\">The information about the examination fee/prescription is sent in the attached file.</p>\n  </div>\n \n \n  <p style=\"color: #555; text-align: center; margin-top: 20px;\">Thank you very much !!!</p>\n</div>\n  \n");
  }
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
  sendEmailtoPatient: sendEmailtoPatient
};