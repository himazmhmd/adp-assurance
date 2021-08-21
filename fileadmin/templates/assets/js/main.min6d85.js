function demandeDeRappelPageDevis() {
    (new Image(1, 1).src = "//www.googleadservices.com/pagead/conversion/1043876378/?label=XpVBCMWy3VoQmpTh8QM&guid=ON&script=0"),
        window.ga && ga.loaded && ga("send", "event", "demande-de-rappel", "demande-de-rappel", "demande-de-rappel-page-devis");
}
function updateStickyBottomBarPos() {
    var a = $cookieConsent.is(":visible") ? $cookieConsent.outerHeight() : 0;
    $("#sticky-bottom-bar").css("bottom", a + "px");
}
function preselectSingleOption(a, b) {
    a.find("option[value=" + value + "]").prop("selected", !0);
}
function enableContactSubmit() {
    $(".contact-page #contactSubmitBtn").prop("disabled", !1);
}
function NextStepButton(a, b) {
    (this.$step = b),
        (this.$btnNextStep = a),
        (this.$requiredElt = null),
        (this.count = 0),
        (this._init = function () {
            this.update();
        }),
        (this.update = function () {
            var a = this;
            (this.$requiredElt = this.$step.find("input[required], select[required]")),
                this.$requiredElt.length &&
                    (this.$btnNextStep.addClass("is-disabled"),
                    (this.count = 0),
                    this.checkRequiredEltValues(),
                    this.$requiredElt.on("input change", function () {
                        (a.count = 0), a.checkRequiredEltValues();
                    }));
        }),
        (this.checkRequiredEltValues = function () {
            var a = this;
            this.$requiredElt.each(function () {
                if ("radio" === $(this).attr("type") || "checkbox" === $(this).attr("type")) {
                    var b = $(this).attr("name");
                    a.$step.find('input[name="' + b + '"]:checked').length && a.count++;
                } else $(this).val() && a.count++;
                a.count === a.$requiredElt.length && a.$btnNextStep.removeClass("is-disabled");
            });
        }),
        this._init();
}
function RefundLevels(a, b) {
    (this.$elt = a),
        (this.refundLevelData = b),
        (this.$btnNextStep = null),
        (this.$guaranteeRadio = null),
        (this.$refundLevel = null),
        (this.hiddenInputValues = []),
        (this.savedInputValues = []),
        (this.savedGuaranteeType = ""),
        (this._init = function () {
            (this.$refundLevel = this.$elt.find(".js-refund-level")), (this.$guaranteeRadio = this.$elt.find('input[name*="[guarantee]"]')), (this.$btnNextStep = this.$elt.parents("#s-needs").find(".btn-next-step") || null);
            for (var a = 0; a < this.$refundLevel.length; a++) for (var b = $(this.$refundLevel[a]).find(".val"), c = $(this.$refundLevel[a]).attr("data-name"), d = 0; d < b.length; d++) $(b[d]).html(this.refundLevelData[c][d]);
            (this.savedGuaranteeType = this.$elt.find('input[name*="[guarantee]"]:checked').val()), this._addEvents();
        }),
        (this._addEvents = function () {
            var a = this;
            this.$guaranteeRadio.on("change", function (b) {
                a.onGuaranteeTypeChange(this.value);
            }),
                this.$refundLevel.each(function (b, c) {
                    var d = $(c),
                        e = null,
                        f = d.find('input.fakeHiddenInput,input[type="hidden"]'),
                        g = "";
                    a.savedInputValues.push(f.val()),
                        d.on("click", ".js-refund-level__item", function (b) {
                            console.log(a.$btnNextStep), a.$btnNextStep.length && $("html, body").animate({ scrollTop: $(a.$btnNextStep).offset().top - (window.innerHeight - 64) }, 500);
                            var c = $(b.currentTarget);
                            c.parents(".refund-level").removeClass("error"),
                                c.parents(".refund-level__values").find(".is-selected").removeClass("is-selected"),
                                c.addClass("is-selected"),
                                (e = c),
                                (g = c.data("val")),
                                f.val(g).trigger("change");
                        });
                });
        }),
        (this.setRadioActive = function (a) {
            this.$guaranteeRadio
                .filter("[value=" + a + "]")
                .prop("checked", !0)
                .trigger("change");
        }),
        (this.setValues = function (a) {
            for (var b = 0; b < this.$refundLevel.length; b++)
                $(this.$refundLevel[b]).find(".js-refund-level__item").removeClass("is-selected"),
                    $(this.$refundLevel[b])
                        .find('.js-refund-level__item[data-val="' + a[b] + '"]')
                        .addClass("is-selected"),
                    $(this.$refundLevel[b]).find("input.fakeHiddenInput").val(a[b]).trigger("change");
        }),
        (this.setPrevValues = function () {
            this.setRadioActive(this.savedGuaranteeType), this.setValues(this.savedInputValues);
        }),
        (this.saveValues = function () {
            (this.savedGuaranteeType = this.$elt.find('input[name*="[guarantee]"]:checked').val()), (this.savedInputValues = []);
            for (var a = 0; a < this.$refundLevel.length; a++) this.savedInputValues.push($(this.$refundLevel[a]).find("input[type=hidden]").val());
            formFunnel.steps[formFunnel.stepsId.NEEDS].refundLevels.setRadioActive(this.savedGuaranteeType), formFunnel.steps[formFunnel.stepsId.NEEDS].refundLevels.setValues(this.savedInputValues);
        }),
        (this.updateValidationRules = function () {
            "hospi" === this.$elt.find('input[name*="[guarantee]"]:checked').val()
                ? (this.$refundLevel.find("input.fakeHiddenInput").each(function () {
                      $(this).removeAttr("required"), $(this).rules("remove");
                  }),
                  this.$refundLevel
                      .find("#refund-level-hospi")
                      .prop("required", !0)
                      .rules("add", { required: !0, adplevel: !0, messages: { required: "Niveau obligatoire" } }))
                : this.$refundLevel.find("input.fakeHiddenInput").each(function () {
                      $(this)
                          .prop("required", !0)
                          .rules("add", { required: !0, adplevel: !0, messages: { required: "Niveau obligatoire" } });
                  }),
                formFunnel.steps[this.$elt.parents(".step").attr("id")].nextStepButton &&
                    (formFunnel.steps[this.$elt.parents(".step").attr("id")].nextStepButton.update(),
                    this.$refundLevel.find("input.fakeHiddenInput[required]").each(function () {
                        $(this).trigger("change");
                    }));
        }),
        (this.onGuaranteeTypeChange = function (a) {
            if ("hospi" === a) {
                $("body").addClass("is-hospi");
                for (var b = 0; b < this.$refundLevel.length; b++)
                    if ("hospi" !== $(this.$refundLevel[b]).attr("data-name")) {
                        var c = $(this.$refundLevel[b]).find("input.fakeHiddenInput");
                        this.hiddenInputValues.push(c.val()), c.val(""), $(this.$refundLevel[b]).addClass("is-disabled");
                    }
            } else {
                $("body").removeClass("is-hospi");
                for (var b = 1; b < this.$refundLevel.length; b++)
                    $(this.$refundLevel[b]).removeClass("is-disabled"),
                        $(this.$refundLevel[b])
                            .find('.js-refund-level__item[data-val="' + this.hiddenInputValues[b - 1] + '"]')
                            .addClass("is-selected"),
                        $(this.$refundLevel[b])
                            .find("input.fakeHiddenInput")
                            .val(this.hiddenInputValues[b - 1]);
                this.hiddenInputValues = [];
            }
            this.updateValidationRules();
        }),
        this._init();
}
!(function (a, b, c) {
    function d(a, b) {
        return typeof a === b;
    }
    function e() {
        var a, b, c, e, f, g, h;
        for (var i in u)
            if (u.hasOwnProperty(i)) {
                if (((a = []), (b = u[i]), b.name && (a.push(b.name.toLowerCase()), b.options && b.options.aliases && b.options.aliases.length))) for (c = 0; c < b.options.aliases.length; c++) a.push(b.options.aliases[c].toLowerCase());
                for (e = d(b.fn, "function") ? b.fn() : b.fn, f = 0; f < a.length; f++)
                    (g = a[f]), (h = g.split(".")), 1 === h.length ? (w[h[0]] = e) : (!w[h[0]] || w[h[0]] instanceof Boolean || (w[h[0]] = new Boolean(w[h[0]])), (w[h[0]][h[1]] = e)), t.push((e ? "" : "no-") + h.join("-"));
            }
    }
    function f(a) {
        var b = x.className,
            c = w._config.classPrefix || "";
        if ((y && (b = b.baseVal), w._config.enableJSClass)) {
            var d = new RegExp("(^|\\s)" + c + "no-js(\\s|$)");
            b = b.replace(d, "$1" + c + "js$2");
        }
        w._config.enableClasses && ((b += " " + c + a.join(" " + c)), y ? (x.className.baseVal = b) : (x.className = b));
    }
    function g() {
        return "function" != typeof b.createElement ? b.createElement(arguments[0]) : y ? b.createElementNS.call(b, "http://www.w3.org/2000/svg", arguments[0]) : b.createElement.apply(b, arguments);
    }
    function h(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function i(a) {
        return a
            .replace(/([a-z])-([a-z])/g, function (a, b, c) {
                return b + c.toUpperCase();
            })
            .replace(/^-/, "");
    }
    function j(a, b) {
        return function () {
            return a.apply(b, arguments);
        };
    }
    function k(a, b, c) {
        var e;
        for (var f in a) if (a[f] in b) return !1 === c ? a[f] : ((e = b[a[f]]), d(e, "function") ? j(e, c || b) : e);
        return !1;
    }
    function l(a) {
        return a
            .replace(/([A-Z])/g, function (a, b) {
                return "-" + b.toLowerCase();
            })
            .replace(/^ms-/, "-ms-");
    }
    function m(b, c, d) {
        var e;
        if ("getComputedStyle" in a) {
            e = getComputedStyle.call(a, b, c);
            var f = a.console;
            if (null !== e) d && (e = e.getPropertyValue(d));
            else if (f) {
                var g = f.error ? "error" : "log";
                f[g].call(f, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
            }
        } else e = !c && b.currentStyle && b.currentStyle[d];
        return e;
    }
    function n() {
        var a = b.body;
        return a || ((a = g(y ? "svg" : "body")), (a.fake = !0)), a;
    }
    function o(a, c, d, e) {
        var f,
            h,
            i,
            j,
            k = "modernizr",
            l = g("div"),
            m = n();
        if (parseInt(d, 10)) for (; d--; ) (i = g("div")), (i.id = e ? e[d] : k + (d + 1)), l.appendChild(i);
        return (
            (f = g("style")),
            (f.type = "text/css"),
            (f.id = "s" + k),
            (m.fake ? m : l).appendChild(f),
            m.appendChild(l),
            f.styleSheet ? (f.styleSheet.cssText = a) : f.appendChild(b.createTextNode(a)),
            (l.id = k),
            m.fake && ((m.style.background = ""), (m.style.overflow = "hidden"), (j = x.style.overflow), (x.style.overflow = "hidden"), x.appendChild(m)),
            (h = c(l, a)),
            m.fake ? (m.parentNode.removeChild(m), (x.style.overflow = j), x.offsetHeight) : l.parentNode.removeChild(l),
            !!h
        );
    }
    function p(b, d) {
        var e = b.length;
        if ("CSS" in a && "supports" in a.CSS) {
            for (; e--; ) if (a.CSS.supports(l(b[e]), d)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in a) {
            for (var f = []; e--; ) f.push("(" + l(b[e]) + ":" + d + ")");
            return (
                (f = f.join(" or ")),
                o("@supports (" + f + ") { #modernizr { position: absolute; } }", function (a) {
                    return "absolute" == m(a, null, "position");
                })
            );
        }
        return c;
    }
    function q(a, b, e, f) {
        function j() {
            l && (delete D.style, delete D.modElem);
        }
        if (((f = !d(f, "undefined") && f), !d(e, "undefined"))) {
            var k = p(a, e);
            if (!d(k, "undefined")) return k;
        }
        for (var l, m, n, o, q, r = ["modernizr", "tspan", "samp"]; !D.style && r.length; ) (l = !0), (D.modElem = g(r.shift())), (D.style = D.modElem.style);
        for (n = a.length, m = 0; n > m; m++)
            if (((o = a[m]), (q = D.style[o]), h(o, "-") && (o = i(o)), D.style[o] !== c)) {
                if (f || d(e, "undefined")) return j(), "pfx" != b || o;
                try {
                    D.style[o] = e;
                } catch (a) {}
                if (D.style[o] != q) return j(), "pfx" != b || o;
            }
        return j(), !1;
    }
    function r(a, b, c, e, f) {
        var g = a.charAt(0).toUpperCase() + a.slice(1),
            h = (a + " " + A.join(g + " ") + g).split(" ");
        return d(b, "string") || d(b, "undefined") ? q(h, b, e, f) : ((h = (a + " " + B.join(g + " ") + g).split(" ")), k(h, b, c));
    }
    function s(a, b, d) {
        return r(a, c, c, b, d);
    }
    var t = [],
        u = [],
        v = {
            _version: "3.5.0",
            _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function (a, b) {
                var c = this;
                setTimeout(function () {
                    b(c[a]);
                }, 0);
            },
            addTest: function (a, b, c) {
                u.push({ name: a, fn: b, options: c });
            },
            addAsyncTest: function (a) {
                u.push({ name: null, fn: a });
            },
        },
        w = function () {};
    (w.prototype = v), (w = new w());
    var x = b.documentElement,
        y = "svg" === x.nodeName.toLowerCase();
    w.addTest("canvas", function () {
        var a = g("canvas");
        return !(!a.getContext || !a.getContext("2d"));
    });
    var z = "Moz O ms Webkit",
        A = v._config.usePrefixes ? z.split(" ") : [];
    v._cssomPrefixes = A;
    var B = v._config.usePrefixes ? z.toLowerCase().split(" ") : [];
    v._domPrefixes = B;
    var C = { elem: g("modernizr") };
    w._q.push(function () {
        delete C.elem;
    });
    var D = { style: C.elem.style };
    w._q.unshift(function () {
        delete D.style;
    }),
        (v.testAllProps = r),
        (v.testAllProps = s),
        (function () {
            w.addTest("csscolumns", function () {
                var a = !1,
                    b = s("columnCount");
                try {
                    (a = !!b) && (a = new Boolean(a));
                } catch (a) {}
                return a;
            });
            for (var a, b, c = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], d = 0; d < c.length; d++)
                (a = c[d].toLowerCase()), (b = s("column" + c[d])), ("breakbefore" === a || "breakafter" === a || "breakinside" == a) && (b = b || s(c[d])), w.addTest("csscolumns." + a, b);
        })(),
        w.addTest("flexbox", s("flexBasis", "1px", !0)),
        w.addTest("flexboxlegacy", s("boxDirection", "reverse", !0)),
        w.addTest("flexboxtweener", s("flexAlign", "end", !0));
    var E = v._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    (v._prefixes = E),
        w.addTest("cssgradients", function () {
            for (var a, b = "background-image:", c = "gradient(linear,left top,right bottom,from(#9f9),to(white));", d = "", e = 0, f = E.length - 1; f > e; e++)
                (a = 0 === e ? "to " : ""), (d += b + E[e] + "linear-gradient(" + a + "left top, #9f9, white);");
            w._config.usePrefixes && (d += b + "-webkit-" + c);
            var h = g("a"),
                i = h.style;
            return (i.cssText = d), ("" + i.backgroundImage).indexOf("gradient") > -1;
        }),
        e(),
        f(t),
        delete v.addTest,
        delete v.addAsyncTest;
    for (var F = 0; F < w._q.length; F++) w._q[F]();
    a.Modernizr = w;
})(window, document),
    (function (a, b) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = a.document
                  ? b(a, !0)
                  : function (a) {
                        if (!a.document) throw new Error("jQuery requires a window with a document");
                        return b(a);
                    })
            : b(a);
    })("undefined" != typeof window ? window : this, function (a, b) {
        "use strict";
        function c(a, b) {
            b = b || ba;
            var c = b.createElement("script");
            (c.text = a), b.head.appendChild(c).parentNode.removeChild(c);
        }
        function d(a) {
            var b = !!a && "length" in a && a.length,
                c = oa.type(a);
            return "function" !== c && !oa.isWindow(a) && ("array" === c || 0 === b || ("number" == typeof b && b > 0 && b - 1 in a));
        }
        function e(a, b, c) {
            return oa.isFunction(b)
                ? oa.grep(a, function (a, d) {
                      return !!b.call(a, d, a) !== c;
                  })
                : b.nodeType
                ? oa.grep(a, function (a) {
                      return (a === b) !== c;
                  })
                : "string" != typeof b
                ? oa.grep(a, function (a) {
                      return ga.call(b, a) > -1 !== c;
                  })
                : ya.test(b)
                ? oa.filter(b, a, c)
                : ((b = oa.filter(b, a)),
                  oa.grep(a, function (a) {
                      return ga.call(b, a) > -1 !== c && 1 === a.nodeType;
                  }));
        }
        function f(a, b) {
            for (; (a = a[b]) && 1 !== a.nodeType; );
            return a;
        }
        function g(a) {
            var b = {};
            return (
                oa.each(a.match(Da) || [], function (a, c) {
                    b[c] = !0;
                }),
                b
            );
        }
        function h(a) {
            return a;
        }
        function i(a) {
            throw a;
        }
        function j(a, b, c) {
            var d;
            try {
                a && oa.isFunction((d = a.promise)) ? d.call(a).done(b).fail(c) : a && oa.isFunction((d = a.then)) ? d.call(a, b, c) : b.call(void 0, a);
            } catch (a) {
                c.call(void 0, a);
            }
        }
        function k() {
            ba.removeEventListener("DOMContentLoaded", k), a.removeEventListener("load", k), oa.ready();
        }
        function l() {
            this.expando = oa.expando + l.uid++;
        }
        function m(a) {
            return "true" === a || ("false" !== a && ("null" === a ? null : a === +a + "" ? +a : Ka.test(a) ? JSON.parse(a) : a));
        }
        function n(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType)
                if (((d = "data-" + b.replace(La, "-$&").toLowerCase()), "string" == typeof (c = a.getAttribute(d)))) {
                    try {
                        c = m(c);
                    } catch (a) {}
                    Ja.set(a, b, c);
                } else c = void 0;
            return c;
        }
        function o(a, b, c, d) {
            var e,
                f = 1,
                g = 20,
                h = d
                    ? function () {
                          return d.cur();
                      }
                    : function () {
                          return oa.css(a, b, "");
                      },
                i = h(),
                j = (c && c[3]) || (oa.cssNumber[b] ? "" : "px"),
                k = (oa.cssNumber[b] || ("px" !== j && +i)) && Na.exec(oa.css(a, b));
            if (k && k[3] !== j) {
                (j = j || k[3]), (c = c || []), (k = +i || 1);
                do {
                    (f = f || ".5"), (k /= f), oa.style(a, b, k + j);
                } while (f !== (f = h() / i) && 1 !== f && --g);
            }
            return c && ((k = +k || +i || 0), (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]), d && ((d.unit = j), (d.start = k), (d.end = e))), e;
        }
        function p(a) {
            var b,
                c = a.ownerDocument,
                d = a.nodeName,
                e = Ra[d];
            return e || ((b = c.body.appendChild(c.createElement(d))), (e = oa.css(b, "display")), b.parentNode.removeChild(b), "none" === e && (e = "block"), (Ra[d] = e), e);
        }
        function q(a, b) {
            for (var c, d, e = [], f = 0, g = a.length; f < g; f++)
                (d = a[f]),
                    d.style &&
                        ((c = d.style.display),
                        b ? ("none" === c && ((e[f] = Ia.get(d, "display") || null), e[f] || (d.style.display = "")), "" === d.style.display && Pa(d) && (e[f] = p(d))) : "none" !== c && ((e[f] = "none"), Ia.set(d, "display", c)));
            for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
            return a;
        }
        function r(a, b) {
            var c;
            return (c = void 0 !== a.getElementsByTagName ? a.getElementsByTagName(b || "*") : void 0 !== a.querySelectorAll ? a.querySelectorAll(b || "*") : []), void 0 === b || (b && oa.nodeName(a, b)) ? oa.merge([a], c) : c;
        }
        function s(a, b) {
            for (var c = 0, d = a.length; c < d; c++) Ia.set(a[c], "globalEval", !b || Ia.get(b[c], "globalEval"));
        }
        function t(a, b, c, d, e) {
            for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++)
                if ((f = a[n]) || 0 === f)
                    if ("object" === oa.type(f)) oa.merge(m, f.nodeType ? [f] : f);
                    else if (Wa.test(f)) {
                        for (g = g || l.appendChild(b.createElement("div")), h = (Ta.exec(f) || ["", ""])[1].toLowerCase(), i = Va[h] || Va._default, g.innerHTML = i[1] + oa.htmlPrefilter(f) + i[2], k = i[0]; k--; ) g = g.lastChild;
                        oa.merge(m, g.childNodes), (g = l.firstChild), (g.textContent = "");
                    } else m.push(b.createTextNode(f));
            for (l.textContent = "", n = 0; (f = m[n++]); )
                if (d && oa.inArray(f, d) > -1) e && e.push(f);
                else if (((j = oa.contains(f.ownerDocument, f)), (g = r(l.appendChild(f), "script")), j && s(g), c)) for (k = 0; (f = g[k++]); ) Ua.test(f.type || "") && c.push(f);
            return l;
        }
        function u() {
            return !0;
        }
        function v() {
            return !1;
        }
        function w() {
            try {
                return ba.activeElement;
            } catch (a) {}
        }
        function x(a, b, c, d, e, f) {
            var g, h;
            if ("object" == typeof b) {
                "string" != typeof c && ((d = d || c), (c = void 0));
                for (h in b) x(a, h, c, d, b[h], f);
                return a;
            }
            if ((null == d && null == e ? ((e = c), (d = c = void 0)) : null == e && ("string" == typeof c ? ((e = d), (d = void 0)) : ((e = d), (d = c), (c = void 0))), !1 === e)) e = v;
            else if (!e) return a;
            return (
                1 === f &&
                    ((g = e),
                    (e = function (a) {
                        return oa().off(a), g.apply(this, arguments);
                    }),
                    (e.guid = g.guid || (g.guid = oa.guid++))),
                a.each(function () {
                    oa.event.add(this, b, e, d, c);
                })
            );
        }
        function y(a, b) {
            return oa.nodeName(a, "table") && oa.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a;
        }
        function z(a) {
            return (a.type = (null !== a.getAttribute("type")) + "/" + a.type), a;
        }
        function A(a) {
            var b = cb.exec(a.type);
            return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
        }
        function B(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (Ia.hasData(a) && ((f = Ia.access(a)), (g = Ia.set(b, f)), (j = f.events))) {
                    delete g.handle, (g.events = {});
                    for (e in j) for (c = 0, d = j[e].length; c < d; c++) oa.event.add(b, e, j[e][c]);
                }
                Ja.hasData(a) && ((h = Ja.access(a)), (i = oa.extend({}, h)), Ja.set(b, i));
            }
        }
        function C(a, b) {
            var c = b.nodeName.toLowerCase();
            "input" === c && Sa.test(a.type) ? (b.checked = a.checked) : ("input" !== c && "textarea" !== c) || (b.defaultValue = a.defaultValue);
        }
        function D(a, b, d, e) {
            b = ea.apply([], b);
            var f,
                g,
                h,
                i,
                j,
                k,
                l = 0,
                m = a.length,
                n = m - 1,
                o = b[0],
                p = oa.isFunction(o);
            if (p || (m > 1 && "string" == typeof o && !ma.checkClone && bb.test(o)))
                return a.each(function (c) {
                    var f = a.eq(c);
                    p && (b[0] = o.call(this, c, f.html())), D(f, b, d, e);
                });
            if (m && ((f = t(b, a[0].ownerDocument, !1, a, e)), (g = f.firstChild), 1 === f.childNodes.length && (f = g), g || e)) {
                for (h = oa.map(r(f, "script"), z), i = h.length; l < m; l++) (j = f), l !== n && ((j = oa.clone(j, !0, !0)), i && oa.merge(h, r(j, "script"))), d.call(a[l], j, l);
                if (i)
                    for (k = h[h.length - 1].ownerDocument, oa.map(h, A), l = 0; l < i; l++)
                        (j = h[l]), Ua.test(j.type || "") && !Ia.access(j, "globalEval") && oa.contains(k, j) && (j.src ? oa._evalUrl && oa._evalUrl(j.src) : c(j.textContent.replace(db, ""), k));
            }
            return a;
        }
        function E(a, b, c) {
            for (var d, e = b ? oa.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || oa.cleanData(r(d)), d.parentNode && (c && oa.contains(d.ownerDocument, d) && s(r(d, "script")), d.parentNode.removeChild(d));
            return a;
        }
        function F(a, b, c) {
            var d,
                e,
                f,
                g,
                h = a.style;
            return (
                (c = c || gb(a)),
                c &&
                    ((g = c.getPropertyValue(b) || c[b]),
                    "" !== g || oa.contains(a.ownerDocument, a) || (g = oa.style(a, b)),
                    !ma.pixelMarginRight() && fb.test(g) && eb.test(b) && ((d = h.width), (e = h.minWidth), (f = h.maxWidth), (h.minWidth = h.maxWidth = h.width = g), (g = c.width), (h.width = d), (h.minWidth = e), (h.maxWidth = f))),
                void 0 !== g ? g + "" : g
            );
        }
        function G(a, b) {
            return {
                get: function () {
                    return a() ? void delete this.get : (this.get = b).apply(this, arguments);
                },
            };
        }
        function H(a) {
            if (a in lb) return a;
            for (var b = a[0].toUpperCase() + a.slice(1), c = kb.length; c--; ) if ((a = kb[c] + b) in lb) return a;
        }
        function I(a, b, c) {
            var d = Na.exec(b);
            return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
        }
        function J(a, b, c, d, e) {
            var f,
                g = 0;
            for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2)
                "margin" === c && (g += oa.css(a, c + Oa[f], !0, e)),
                    d
                        ? ("content" === c && (g -= oa.css(a, "padding" + Oa[f], !0, e)), "margin" !== c && (g -= oa.css(a, "border" + Oa[f] + "Width", !0, e)))
                        : ((g += oa.css(a, "padding" + Oa[f], !0, e)), "padding" !== c && (g += oa.css(a, "border" + Oa[f] + "Width", !0, e)));
            return g;
        }
        function K(a, b, c) {
            var d,
                e = !0,
                f = gb(a),
                g = "border-box" === oa.css(a, "boxSizing", !1, f);
            if ((a.getClientRects().length && (d = a.getBoundingClientRect()[b]), d <= 0 || null == d)) {
                if (((d = F(a, b, f)), (d < 0 || null == d) && (d = a.style[b]), fb.test(d))) return d;
                (e = g && (ma.boxSizingReliable() || d === a.style[b])), (d = parseFloat(d) || 0);
            }
            return d + J(a, b, c || (g ? "border" : "content"), e, f) + "px";
        }
        function L(a, b, c, d, e) {
            return new L.prototype.init(a, b, c, d, e);
        }
        function M() {
            nb && (a.requestAnimationFrame(M), oa.fx.tick());
        }
        function N() {
            return (
                a.setTimeout(function () {
                    mb = void 0;
                }),
                (mb = oa.now())
            );
        }
        function O(a, b) {
            var c,
                d = 0,
                e = { height: a };
            for (b = b ? 1 : 0; d < 4; d += 2 - b) (c = Oa[d]), (e["margin" + c] = e["padding" + c] = a);
            return b && (e.opacity = e.width = a), e;
        }
        function P(a, b, c) {
            for (var d, e = (S.tweeners[b] || []).concat(S.tweeners["*"]), f = 0, g = e.length; f < g; f++) if ((d = e[f].call(c, b, a))) return d;
        }
        function Q(a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l = "width" in b || "height" in b,
                m = this,
                n = {},
                o = a.style,
                p = a.nodeType && Pa(a),
                r = Ia.get(a, "fxshow");
            c.queue ||
                ((g = oa._queueHooks(a, "fx")),
                null == g.unqueued &&
                    ((g.unqueued = 0),
                    (h = g.empty.fire),
                    (g.empty.fire = function () {
                        g.unqueued || h();
                    })),
                g.unqueued++,
                m.always(function () {
                    m.always(function () {
                        g.unqueued--, oa.queue(a, "fx").length || g.empty.fire();
                    });
                }));
            for (d in b)
                if (((e = b[d]), ob.test(e))) {
                    if ((delete b[d], (f = f || "toggle" === e), e === (p ? "hide" : "show"))) {
                        if ("show" !== e || !r || void 0 === r[d]) continue;
                        p = !0;
                    }
                    n[d] = (r && r[d]) || oa.style(a, d);
                }
            if ((i = !oa.isEmptyObject(b)) || !oa.isEmptyObject(n)) {
                l &&
                    1 === a.nodeType &&
                    ((c.overflow = [o.overflow, o.overflowX, o.overflowY]),
                    (j = r && r.display),
                    null == j && (j = Ia.get(a, "display")),
                    (k = oa.css(a, "display")),
                    "none" === k && (j ? (k = j) : (q([a], !0), (j = a.style.display || j), (k = oa.css(a, "display")), q([a]))),
                    ("inline" === k || ("inline-block" === k && null != j)) &&
                        "none" === oa.css(a, "float") &&
                        (i ||
                            (m.done(function () {
                                o.display = j;
                            }),
                            null == j && ((k = o.display), (j = "none" === k ? "" : k))),
                        (o.display = "inline-block"))),
                    c.overflow &&
                        ((o.overflow = "hidden"),
                        m.always(function () {
                            (o.overflow = c.overflow[0]), (o.overflowX = c.overflow[1]), (o.overflowY = c.overflow[2]);
                        })),
                    (i = !1);
                for (d in n)
                    i ||
                        (r ? "hidden" in r && (p = r.hidden) : (r = Ia.access(a, "fxshow", { display: j })),
                        f && (r.hidden = !p),
                        p && q([a], !0),
                        m.done(function () {
                            p || q([a]), Ia.remove(a, "fxshow");
                            for (d in n) oa.style(a, d, n[d]);
                        })),
                        (i = P(p ? r[d] : 0, d, m)),
                        d in r || ((r[d] = i.start), p && ((i.end = i.start), (i.start = 0)));
            }
        }
        function R(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (((d = oa.camelCase(c)), (e = b[d]), (f = a[c]), oa.isArray(f) && ((e = f[1]), (f = a[c] = f[0])), c !== d && ((a[d] = f), delete a[c]), (g = oa.cssHooks[d]) && "expand" in g)) {
                    (f = g.expand(f)), delete a[d];
                    for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
                } else b[d] = e;
        }
        function S(a, b, c) {
            var d,
                e,
                f = 0,
                g = S.prefilters.length,
                h = oa.Deferred().always(function () {
                    delete i.elem;
                }),
                i = function () {
                    if (e) return !1;
                    for (var b = mb || N(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1);
                },
                j = h.promise({
                    elem: a,
                    props: oa.extend({}, b),
                    opts: oa.extend(!0, { specialEasing: {}, easing: oa.easing._default }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: mb || N(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function (b, c) {
                        var d = oa.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d;
                    },
                    stop: function (b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; c < d; c++) j.tweens[c].run(1);
                        return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
                    },
                }),
                k = j.props;
            for (R(k, j.opts.specialEasing); f < g; f++) if ((d = S.prefilters[f].call(j, a, k, j.opts))) return oa.isFunction(d.stop) && (oa._queueHooks(j.elem, j.opts.queue).stop = oa.proxy(d.stop, d)), d;
            return (
                oa.map(k, P, j),
                oa.isFunction(j.opts.start) && j.opts.start.call(a, j),
                oa.fx.timer(oa.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
                j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
            );
        }
        function T(a) {
            return (a.match(Da) || []).join(" ");
        }
        function U(a) {
            return (a.getAttribute && a.getAttribute("class")) || "";
        }
        function V(a, b, c, d) {
            var e;
            if (oa.isArray(b))
                oa.each(b, function (b, e) {
                    c || zb.test(a) ? d(a, e) : V(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d);
                });
            else if (c || "object" !== oa.type(b)) d(a, b);
            else for (e in b) V(a + "[" + e + "]", b[e], c, d);
        }
        function W(a) {
            return function (b, c) {
                "string" != typeof b && ((c = b), (b = "*"));
                var d,
                    e = 0,
                    f = b.toLowerCase().match(Da) || [];
                if (oa.isFunction(c)) for (; (d = f[e++]); ) "+" === d[0] ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
            };
        }
        function X(a, b, c, d) {
            function e(h) {
                var i;
                return (
                    (f[h] = !0),
                    oa.each(a[h] || [], function (a, h) {
                        var j = h(b, c, d);
                        return "string" != typeof j || g || f[j] ? (g ? !(i = j) : void 0) : (b.dataTypes.unshift(j), e(j), !1);
                    }),
                    i
                );
            }
            var f = {},
                g = a === Lb;
            return e(b.dataTypes[0]) || (!f["*"] && e("*"));
        }
        function Y(a, b) {
            var c,
                d,
                e = oa.ajaxSettings.flatOptions || {};
            for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
            return d && oa.extend(!0, a, d), a;
        }
        function Z(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d)
                for (e in h)
                    if (h[e] && h[e].test(d)) {
                        i.unshift(e);
                        break;
                    }
            if (i[0] in c) f = i[0];
            else {
                for (e in c) {
                    if (!i[0] || a.converters[e + " " + i[0]]) {
                        f = e;
                        break;
                    }
                    g || (g = e);
                }
                f = f || g;
            }
            if (f) return f !== i[0] && i.unshift(f), c[f];
        }
        function $(a, b, c, d) {
            var e,
                f,
                g,
                h,
                i,
                j = {},
                k = a.dataTypes.slice();
            if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f; )
                if ((a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), (i = f), (f = k.shift())))
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                        if (!(g = j[i + " " + f] || j["* " + f]))
                            for (e in j)
                                if (((h = e.split(" ")), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))) {
                                    !0 === g ? (g = j[e]) : !0 !== j[e] && ((f = h[0]), k.unshift(h[1]));
                                    break;
                                }
                        if (!0 !== g)
                            if (g && a.throws) b = g(b);
                            else
                                try {
                                    b = g(b);
                                } catch (a) {
                                    return { state: "parsererror", error: g ? a : "No conversion from " + i + " to " + f };
                                }
                    }
            return { state: "success", data: b };
        }
        function _(a) {
            return oa.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
        }
        var aa = [],
            ba = a.document,
            ca = Object.getPrototypeOf,
            da = aa.slice,
            ea = aa.concat,
            fa = aa.push,
            ga = aa.indexOf,
            ha = {},
            ia = ha.toString,
            ja = ha.hasOwnProperty,
            ka = ja.toString,
            la = ka.call(Object),
            ma = {},
            na = "3.1.1",
            oa = function (a, b) {
                return new oa.fn.init(a, b);
            },
            pa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            qa = /^-ms-/,
            ra = /-([a-z])/g,
            sa = function (a, b) {
                return b.toUpperCase();
            };
        (oa.fn = oa.prototype = {
            jquery: na,
            constructor: oa,
            length: 0,
            toArray: function () {
                return da.call(this);
            },
            get: function (a) {
                return null == a ? da.call(this) : a < 0 ? this[a + this.length] : this[a];
            },
            pushStack: function (a) {
                var b = oa.merge(this.constructor(), a);
                return (b.prevObject = this), b;
            },
            each: function (a) {
                return oa.each(this, a);
            },
            map: function (a) {
                return this.pushStack(
                    oa.map(this, function (b, c) {
                        return a.call(b, c, b);
                    })
                );
            },
            slice: function () {
                return this.pushStack(da.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (a) {
                var b = this.length,
                    c = +a + (a < 0 ? b : 0);
                return this.pushStack(c >= 0 && c < b ? [this[c]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: fa,
            sort: aa.sort,
            splice: aa.splice,
        }),
            (oa.extend = oa.fn.extend = function () {
                var a,
                    b,
                    c,
                    d,
                    e,
                    f,
                    g = arguments[0] || {},
                    h = 1,
                    i = arguments.length,
                    j = !1;
                for ("boolean" == typeof g && ((j = g), (g = arguments[h] || {}), h++), "object" == typeof g || oa.isFunction(g) || (g = {}), h === i && ((g = this), h--); h < i; h++)
                    if (null != (a = arguments[h]))
                        for (b in a)
                            (c = g[b]),
                                (d = a[b]),
                                g !== d &&
                                    (j && d && (oa.isPlainObject(d) || (e = oa.isArray(d)))
                                        ? (e ? ((e = !1), (f = c && oa.isArray(c) ? c : [])) : (f = c && oa.isPlainObject(c) ? c : {}), (g[b] = oa.extend(j, f, d)))
                                        : void 0 !== d && (g[b] = d));
                return g;
            }),
            oa.extend({
                expando: "jQuery" + (na + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (a) {
                    throw new Error(a);
                },
                noop: function () {},
                isFunction: function (a) {
                    return "function" === oa.type(a);
                },
                isArray: Array.isArray,
                isWindow: function (a) {
                    return null != a && a === a.window;
                },
                isNumeric: function (a) {
                    var b = oa.type(a);
                    return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
                },
                isPlainObject: function (a) {
                    var b, c;
                    return !(!a || "[object Object]" !== ia.call(a) || ((b = ca(a)) && ("function" != typeof (c = ja.call(b, "constructor") && b.constructor) || ka.call(c) !== la)));
                },
                isEmptyObject: function (a) {
                    var b;
                    for (b in a) return !1;
                    return !0;
                },
                type: function (a) {
                    return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ha[ia.call(a)] || "object" : typeof a;
                },
                globalEval: function (a) {
                    c(a);
                },
                camelCase: function (a) {
                    return a.replace(qa, "ms-").replace(ra, sa);
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
                },
                each: function (a, b) {
                    var c,
                        e = 0;
                    if (d(a)) for (c = a.length; e < c && !1 !== b.call(a[e], e, a[e]); e++);
                    else for (e in a) if (!1 === b.call(a[e], e, a[e])) break;
                    return a;
                },
                trim: function (a) {
                    return null == a ? "" : (a + "").replace(pa, "");
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    return null != a && (d(Object(a)) ? oa.merge(c, "string" == typeof a ? [a] : a) : fa.call(c, a)), c;
                },
                inArray: function (a, b, c) {
                    return null == b ? -1 : ga.call(b, a, c);
                },
                merge: function (a, b) {
                    for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
                    return (a.length = e), a;
                },
                grep: function (a, b, c) {
                    for (var d = [], e = 0, f = a.length, g = !c; e < f; e++) !b(a[e], e) !== g && d.push(a[e]);
                    return d;
                },
                map: function (a, b, c) {
                    var e,
                        f,
                        g = 0,
                        h = [];
                    if (d(a)) for (e = a.length; g < e; g++) null != (f = b(a[g], g, c)) && h.push(f);
                    else for (g in a) null != (f = b(a[g], g, c)) && h.push(f);
                    return ea.apply([], h);
                },
                guid: 1,
                proxy: function (a, b) {
                    var c, d, e;
                    if (("string" == typeof b && ((c = a[b]), (b = a), (a = c)), oa.isFunction(a)))
                        return (
                            (d = da.call(arguments, 2)),
                            (e = function () {
                                return a.apply(b || this, d.concat(da.call(arguments)));
                            }),
                            (e.guid = a.guid = a.guid || oa.guid++),
                            e
                        );
                },
                now: Date.now,
                support: ma,
            }),
            "function" == typeof Symbol && (oa.fn[Symbol.iterator] = aa[Symbol.iterator]),
            oa.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
                ha["[object " + b + "]"] = b.toLowerCase();
            });
        var ta = (function (a) {
            function b(a, b, c, d) {
                var e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    m = b && b.ownerDocument,
                    o = b ? b.nodeType : 9;
                if (((c = c || []), "string" != typeof a || !a || (1 !== o && 9 !== o && 11 !== o))) return c;
                if (!d && ((b ? b.ownerDocument || b : P) !== H && G(b), (b = b || H), J)) {
                    if (11 !== o && (i = ra.exec(a)))
                        if ((e = i[1])) {
                            if (9 === o) {
                                if (!(g = b.getElementById(e))) return c;
                                if (g.id === e) return c.push(g), c;
                            } else if (m && (g = m.getElementById(e)) && N(b, g) && g.id === e) return c.push(g), c;
                        } else {
                            if (i[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                            if ((e = i[3]) && w.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c;
                        }
                    if (w.qsa && !U[a + " "] && (!K || !K.test(a))) {
                        if (1 !== o) (m = b), (k = a);
                        else if ("object" !== b.nodeName.toLowerCase()) {
                            for ((h = b.getAttribute("id")) ? (h = h.replace(va, wa)) : b.setAttribute("id", (h = O)), j = A(a), f = j.length; f--; ) j[f] = "#" + h + " " + n(j[f]);
                            (k = j.join(",")), (m = (sa.test(a) && l(b.parentNode)) || b);
                        }
                        if (k)
                            try {
                                return $.apply(c, m.querySelectorAll(k)), c;
                            } catch (a) {
                            } finally {
                                h === O && b.removeAttribute("id");
                            }
                    }
                }
                return C(a.replace(ha, "$1"), b, c, d);
            }
            function c() {
                function a(c, d) {
                    return b.push(c + " ") > x.cacheLength && delete a[b.shift()], (a[c + " "] = d);
                }
                var b = [];
                return a;
            }
            function d(a) {
                return (a[O] = !0), a;
            }
            function e(a) {
                var b = H.createElement("fieldset");
                try {
                    return !!a(b);
                } catch (a) {
                    return !1;
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), (b = null);
                }
            }
            function f(a, b) {
                for (var c = a.split("|"), d = c.length; d--; ) x.attrHandle[c[d]] = b;
            }
            function g(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (d) return d;
                if (c) for (; (c = c.nextSibling); ) if (c === b) return -1;
                return a ? 1 : -1;
            }
            function h(a) {
                return function (b) {
                    return "input" === b.nodeName.toLowerCase() && b.type === a;
                };
            }
            function i(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a;
                };
            }
            function j(a) {
                return function (b) {
                    return "form" in b
                        ? b.parentNode && !1 === b.disabled
                            ? "label" in b
                                ? "label" in b.parentNode
                                    ? b.parentNode.disabled === a
                                    : b.disabled === a
                                : b.isDisabled === a || (b.isDisabled !== !a && ya(b) === a)
                            : b.disabled === a
                        : "label" in b && b.disabled === a;
                };
            }
            function k(a) {
                return d(function (b) {
                    return (
                        (b = +b),
                        d(function (c, d) {
                            for (var e, f = a([], c.length, b), g = f.length; g--; ) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
                        })
                    );
                });
            }
            function l(a) {
                return a && void 0 !== a.getElementsByTagName && a;
            }
            function m() {}
            function n(a) {
                for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                return d;
            }
            function o(a, b, c) {
                var d = b.dir,
                    e = b.next,
                    f = e || d,
                    g = c && "parentNode" === f,
                    h = R++;
                return b.first
                    ? function (b, c, e) {
                          for (; (b = b[d]); ) if (1 === b.nodeType || g) return a(b, c, e);
                          return !1;
                      }
                    : function (b, c, i) {
                          var j,
                              k,
                              l,
                              m = [Q, h];
                          if (i) {
                              for (; (b = b[d]); ) if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
                          } else
                              for (; (b = b[d]); )
                                  if (1 === b.nodeType || g)
                                      if (((l = b[O] || (b[O] = {})), (k = l[b.uniqueID] || (l[b.uniqueID] = {})), e && e === b.nodeName.toLowerCase())) b = b[d] || b;
                                      else {
                                          if ((j = k[f]) && j[0] === Q && j[1] === h) return (m[2] = j[2]);
                                          if (((k[f] = m), (m[2] = a(b, c, i)))) return !0;
                                      }
                          return !1;
                      };
            }
            function p(a) {
                return a.length > 1
                    ? function (b, c, d) {
                          for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                          return !0;
                      }
                    : a[0];
            }
            function q(a, c, d) {
                for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
                return d;
            }
            function r(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) (f = a[h]) && ((c && !c(f, d, e)) || (g.push(f), j && b.push(h)));
                return g;
            }
            function s(a, b, c, e, f, g) {
                return (
                    e && !e[O] && (e = s(e)),
                    f && !f[O] && (f = s(f, g)),
                    d(function (d, g, h, i) {
                        var j,
                            k,
                            l,
                            m = [],
                            n = [],
                            o = g.length,
                            p = d || q(b || "*", h.nodeType ? [h] : h, []),
                            s = !a || (!d && b) ? p : r(p, m, a, h, i),
                            t = c ? (f || (d ? a : o || e) ? [] : g) : s;
                        if ((c && c(s, t, h, i), e)) for (j = r(t, n), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                        if (d) {
                            if (f || a) {
                                if (f) {
                                    for (j = [], k = t.length; k--; ) (l = t[k]) && j.push((s[k] = l));
                                    f(null, (t = []), j, i);
                                }
                                for (k = t.length; k--; ) (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                            }
                        } else (t = r(t === g ? t.splice(o, t.length) : t)), f ? f(null, g, t, i) : $.apply(g, t);
                    })
                );
            }
            function t(a) {
                for (
                    var b,
                        c,
                        d,
                        e = a.length,
                        f = x.relative[a[0].type],
                        g = f || x.relative[" "],
                        h = f ? 1 : 0,
                        i = o(
                            function (a) {
                                return a === b;
                            },
                            g,
                            !0
                        ),
                        j = o(
                            function (a) {
                                return aa(b, a) > -1;
                            },
                            g,
                            !0
                        ),
                        k = [
                            function (a, c, d) {
                                var e = (!f && (d || c !== D)) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                                return (b = null), e;
                            },
                        ];
                    h < e;
                    h++
                )
                    if ((c = x.relative[a[h].type])) k = [o(p(k), c)];
                    else {
                        if (((c = x.filter[a[h].type].apply(null, a[h].matches)), c[O])) {
                            for (d = ++h; d < e && !x.relative[a[d].type]; d++);
                            return s(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({ value: " " === a[h - 2].type ? "*" : "" })).replace(ha, "$1"), c, h < d && t(a.slice(h, d)), d < e && t((a = a.slice(d))), d < e && n(a));
                        }
                        k.push(c);
                    }
                return p(k);
            }
            function u(a, c) {
                var e = c.length > 0,
                    f = a.length > 0,
                    g = function (d, g, h, i, j) {
                        var k,
                            l,
                            m,
                            n = 0,
                            o = "0",
                            p = d && [],
                            q = [],
                            s = D,
                            t = d || (f && x.find.TAG("*", j)),
                            u = (Q += null == s ? 1 : Math.random() || 0.1),
                            v = t.length;
                        for (j && (D = g === H || g || j); o !== v && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0, g || k.ownerDocument === H || (G(k), (h = !J)); (m = a[l++]); )
                                    if (m(k, g || H, h)) {
                                        i.push(k);
                                        break;
                                    }
                                j && (Q = u);
                            }
                            e && ((k = !m && k) && n--, d && p.push(k));
                        }
                        if (((n += o), e && o !== n)) {
                            for (l = 0; (m = c[l++]); ) m(p, q, g, h);
                            if (d) {
                                if (n > 0) for (; o--; ) p[o] || q[o] || (q[o] = Y.call(i));
                                q = r(q);
                            }
                            $.apply(i, q), j && !d && q.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                        }
                        return j && ((Q = u), (D = s)), p;
                    };
                return e ? d(g) : g;
            }
            var v,
                w,
                x,
                y,
                z,
                A,
                B,
                C,
                D,
                E,
                F,
                G,
                H,
                I,
                J,
                K,
                L,
                M,
                N,
                O = "sizzle" + 1 * new Date(),
                P = a.document,
                Q = 0,
                R = 0,
                S = c(),
                T = c(),
                U = c(),
                V = function (a, b) {
                    return a === b && (F = !0), 0;
                },
                W = {}.hasOwnProperty,
                X = [],
                Y = X.pop,
                Z = X.push,
                $ = X.push,
                _ = X.slice,
                aa = function (a, b) {
                    for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
                    return -1;
                },
                ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ca = "[\\x20\\t\\r\\n\\f]",
                da = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]",
                fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
                ga = new RegExp(ca + "+", "g"),
                ha = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
                ia = new RegExp("^" + ca + "*," + ca + "*"),
                ja = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
                ka = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
                la = new RegExp(fa),
                ma = new RegExp("^" + da + "$"),
                na = {
                    ID: new RegExp("^#(" + da + ")"),
                    CLASS: new RegExp("^\\.(" + da + ")"),
                    TAG: new RegExp("^(" + da + "|[*])"),
                    ATTR: new RegExp("^" + ea),
                    PSEUDO: new RegExp("^" + fa),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + ba + ")$", "i"),
                    needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i"),
                },
                oa = /^(?:input|select|textarea|button)$/i,
                pa = /^h\d$/i,
                qa = /^[^{]+\{\s*\[native \w/,
                ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                sa = /[+~]/,
                ta = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
                ua = function (a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
                },
                va = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                wa = function (a, b) {
                    return b ? ("\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " ") : "\\" + a;
                },
                xa = function () {
                    G();
                },
                ya = o(
                    function (a) {
                        return !0 === a.disabled && ("form" in a || "label" in a);
                    },
                    { dir: "parentNode", next: "legend" }
                );
            try {
                $.apply((X = _.call(P.childNodes)), P.childNodes), X[P.childNodes.length].nodeType;
            } catch (a) {
                $ = {
                    apply: X.length
                        ? function (a, b) {
                              Z.apply(a, _.call(b));
                          }
                        : function (a, b) {
                              for (var c = a.length, d = 0; (a[c++] = b[d++]); );
                              a.length = c - 1;
                          },
                };
            }
            (w = b.support = {}),
                (z = b.isXML = function (a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return !!b && "HTML" !== b.nodeName;
                }),
                (G = b.setDocument = function (a) {
                    var b,
                        c,
                        d = a ? a.ownerDocument || a : P;
                    return d !== H && 9 === d.nodeType && d.documentElement
                        ? ((H = d),
                          (I = H.documentElement),
                          (J = !z(H)),
                          P !== H && (c = H.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)),
                          (w.attributes = e(function (a) {
                              return (a.className = "i"), !a.getAttribute("className");
                          })),
                          (w.getElementsByTagName = e(function (a) {
                              return a.appendChild(H.createComment("")), !a.getElementsByTagName("*").length;
                          })),
                          (w.getElementsByClassName = qa.test(H.getElementsByClassName)),
                          (w.getById = e(function (a) {
                              return (I.appendChild(a).id = O), !H.getElementsByName || !H.getElementsByName(O).length;
                          })),
                          w.getById
                              ? ((x.filter.ID = function (a) {
                                    var b = a.replace(ta, ua);
                                    return function (a) {
                                        return a.getAttribute("id") === b;
                                    };
                                }),
                                (x.find.ID = function (a, b) {
                                    if (void 0 !== b.getElementById && J) {
                                        var c = b.getElementById(a);
                                        return c ? [c] : [];
                                    }
                                }))
                              : ((x.filter.ID = function (a) {
                                    var b = a.replace(ta, ua);
                                    return function (a) {
                                        var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                                        return c && c.value === b;
                                    };
                                }),
                                (x.find.ID = function (a, b) {
                                    if (void 0 !== b.getElementById && J) {
                                        var c,
                                            d,
                                            e,
                                            f = b.getElementById(a);
                                        if (f) {
                                            if ((c = f.getAttributeNode("id")) && c.value === a) return [f];
                                            for (e = b.getElementsByName(a), d = 0; (f = e[d++]); ) if ((c = f.getAttributeNode("id")) && c.value === a) return [f];
                                        }
                                        return [];
                                    }
                                })),
                          (x.find.TAG = w.getElementsByTagName
                              ? function (a, b) {
                                    return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : w.qsa ? b.querySelectorAll(a) : void 0;
                                }
                              : function (a, b) {
                                    var c,
                                        d = [],
                                        e = 0,
                                        f = b.getElementsByTagName(a);
                                    if ("*" === a) {
                                        for (; (c = f[e++]); ) 1 === c.nodeType && d.push(c);
                                        return d;
                                    }
                                    return f;
                                }),
                          (x.find.CLASS =
                              w.getElementsByClassName &&
                              function (a, b) {
                                  if (void 0 !== b.getElementsByClassName && J) return b.getElementsByClassName(a);
                              }),
                          (L = []),
                          (K = []),
                          (w.qsa = qa.test(H.querySelectorAll)) &&
                              (e(function (a) {
                                  (I.appendChild(a).innerHTML = "<a id='" + O + "'></a><select id='" + O + "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                      a.querySelectorAll("[msallowcapture^='']").length && K.push("[*^$]=" + ca + "*(?:''|\"\")"),
                                      a.querySelectorAll("[selected]").length || K.push("\\[" + ca + "*(?:value|" + ba + ")"),
                                      a.querySelectorAll("[id~=" + O + "-]").length || K.push("~="),
                                      a.querySelectorAll(":checked").length || K.push(":checked"),
                                      a.querySelectorAll("a#" + O + "+*").length || K.push(".#.+[+~]");
                              }),
                              e(function (a) {
                                  a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                  var b = H.createElement("input");
                                  b.setAttribute("type", "hidden"),
                                      a.appendChild(b).setAttribute("name", "D"),
                                      a.querySelectorAll("[name=d]").length && K.push("name" + ca + "*[*^$|!~]?="),
                                      2 !== a.querySelectorAll(":enabled").length && K.push(":enabled", ":disabled"),
                                      (I.appendChild(a).disabled = !0),
                                      2 !== a.querySelectorAll(":disabled").length && K.push(":enabled", ":disabled"),
                                      a.querySelectorAll("*,:x"),
                                      K.push(",.*:");
                              })),
                          (w.matchesSelector = qa.test((M = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector))) &&
                              e(function (a) {
                                  (w.disconnectedMatch = M.call(a, "*")), M.call(a, "[s!='']:x"), L.push("!=", fa);
                              }),
                          (K = K.length && new RegExp(K.join("|"))),
                          (L = L.length && new RegExp(L.join("|"))),
                          (b = qa.test(I.compareDocumentPosition)),
                          (N =
                              b || qa.test(I.contains)
                                  ? function (a, b) {
                                        var c = 9 === a.nodeType ? a.documentElement : a,
                                            d = b && b.parentNode;
                                        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
                                    }
                                  : function (a, b) {
                                        if (b) for (; (b = b.parentNode); ) if (b === a) return !0;
                                        return !1;
                                    }),
                          (V = b
                              ? function (a, b) {
                                    if (a === b) return (F = !0), 0;
                                    var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                    return (
                                        c ||
                                        ((c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1),
                                        1 & c || (!w.sortDetached && b.compareDocumentPosition(a) === c)
                                            ? a === H || (a.ownerDocument === P && N(P, a))
                                                ? -1
                                                : b === H || (b.ownerDocument === P && N(P, b))
                                                ? 1
                                                : E
                                                ? aa(E, a) - aa(E, b)
                                                : 0
                                            : 4 & c
                                            ? -1
                                            : 1)
                                    );
                                }
                              : function (a, b) {
                                    if (a === b) return (F = !0), 0;
                                    var c,
                                        d = 0,
                                        e = a.parentNode,
                                        f = b.parentNode,
                                        h = [a],
                                        i = [b];
                                    if (!e || !f) return a === H ? -1 : b === H ? 1 : e ? -1 : f ? 1 : E ? aa(E, a) - aa(E, b) : 0;
                                    if (e === f) return g(a, b);
                                    for (c = a; (c = c.parentNode); ) h.unshift(c);
                                    for (c = b; (c = c.parentNode); ) i.unshift(c);
                                    for (; h[d] === i[d]; ) d++;
                                    return d ? g(h[d], i[d]) : h[d] === P ? -1 : i[d] === P ? 1 : 0;
                                }),
                          H)
                        : H;
                }),
                (b.matches = function (a, c) {
                    return b(a, null, null, c);
                }),
                (b.matchesSelector = function (a, c) {
                    if (((a.ownerDocument || a) !== H && G(a), (c = c.replace(ka, "='$1']")), w.matchesSelector && J && !U[c + " "] && (!L || !L.test(c)) && (!K || !K.test(c))))
                        try {
                            var d = M.call(a, c);
                            if (d || w.disconnectedMatch || (a.document && 11 !== a.document.nodeType)) return d;
                        } catch (a) {}
                    return b(c, H, null, [a]).length > 0;
                }),
                (b.contains = function (a, b) {
                    return (a.ownerDocument || a) !== H && G(a), N(a, b);
                }),
                (b.attr = function (a, b) {
                    (a.ownerDocument || a) !== H && G(a);
                    var c = x.attrHandle[b.toLowerCase()],
                        d = c && W.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !J) : void 0;
                    return void 0 !== d ? d : w.attributes || !J ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
                }),
                (b.escape = function (a) {
                    return (a + "").replace(va, wa);
                }),
                (b.error = function (a) {
                    throw new Error("Syntax error, unrecognized expression: " + a);
                }),
                (b.uniqueSort = function (a) {
                    var b,
                        c = [],
                        d = 0,
                        e = 0;
                    if (((F = !w.detectDuplicates), (E = !w.sortStable && a.slice(0)), a.sort(V), F)) {
                        for (; (b = a[e++]); ) b === a[e] && (d = c.push(e));
                        for (; d--; ) a.splice(c[d], 1);
                    }
                    return (E = null), a;
                }),
                (y = b.getText = function (a) {
                    var b,
                        c = "",
                        d = 0,
                        e = a.nodeType;
                    if (e) {
                        if (1 === e || 9 === e || 11 === e) {
                            if ("string" == typeof a.textContent) return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling) c += y(a);
                        } else if (3 === e || 4 === e) return a.nodeValue;
                    } else for (; (b = a[d++]); ) c += y(b);
                    return c;
                }),
                (x = b.selectors = {
                    cacheLength: 50,
                    createPseudo: d,
                    match: na,
                    attrHandle: {},
                    find: {},
                    relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                    preFilter: {
                        ATTR: function (a) {
                            return (a[1] = a[1].replace(ta, ua)), (a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua)), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                        },
                        CHILD: function (a) {
                            return (
                                (a[1] = a[1].toLowerCase()),
                                "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), (a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3]))), (a[5] = +(a[7] + a[8] || "odd" === a[3]))) : a[3] && b.error(a[0]),
                                a
                            );
                        },
                        PSEUDO: function (a) {
                            var b,
                                c = !a[6] && a[2];
                            return na.CHILD.test(a[0])
                                ? null
                                : (a[3] ? (a[2] = a[4] || a[5] || "") : c && la.test(c) && (b = A(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))), a.slice(0, 3));
                        },
                    },
                    filter: {
                        TAG: function (a) {
                            var b = a.replace(ta, ua).toLowerCase();
                            return "*" === a
                                ? function () {
                                      return !0;
                                  }
                                : function (a) {
                                      return a.nodeName && a.nodeName.toLowerCase() === b;
                                  };
                        },
                        CLASS: function (a) {
                            var b = S[a + " "];
                            return (
                                b ||
                                ((b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) &&
                                    S(a, function (a) {
                                        return b.test(("string" == typeof a.className && a.className) || (void 0 !== a.getAttribute && a.getAttribute("class")) || "");
                                    }))
                            );
                        },
                        ATTR: function (a, c, d) {
                            return function (e) {
                                var f = b.attr(e, a);
                                return null == f
                                    ? "!=" === c
                                    : !c ||
                                          ((f += ""),
                                          "=" === c
                                              ? f === d
                                              : "!=" === c
                                              ? f !== d
                                              : "^=" === c
                                              ? d && 0 === f.indexOf(d)
                                              : "*=" === c
                                              ? d && f.indexOf(d) > -1
                                              : "$=" === c
                                              ? d && f.slice(-d.length) === d
                                              : "~=" === c
                                              ? (" " + f.replace(ga, " ") + " ").indexOf(d) > -1
                                              : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"));
                            };
                        },
                        CHILD: function (a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3),
                                g = "last" !== a.slice(-4),
                                h = "of-type" === b;
                            return 1 === d && 0 === e
                                ? function (a) {
                                      return !!a.parentNode;
                                  }
                                : function (b, c, i) {
                                      var j,
                                          k,
                                          l,
                                          m,
                                          n,
                                          o,
                                          p = f !== g ? "nextSibling" : "previousSibling",
                                          q = b.parentNode,
                                          r = h && b.nodeName.toLowerCase(),
                                          s = !i && !h,
                                          t = !1;
                                      if (q) {
                                          if (f) {
                                              for (; p; ) {
                                                  for (m = b; (m = m[p]); ) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                                  o = p = "only" === a && !o && "nextSibling";
                                              }
                                              return !0;
                                          }
                                          if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                                              for (
                                                  m = q, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n && j[2], m = n && q.childNodes[n];
                                                  (m = (++n && m && m[p]) || (t = n = 0) || o.pop());

                                              )
                                                  if (1 === m.nodeType && ++t && m === b) {
                                                      k[a] = [Q, n, t];
                                                      break;
                                                  }
                                          } else if ((s && ((m = b), (l = m[O] || (m[O] = {})), (k = l[m.uniqueID] || (l[m.uniqueID] = {})), (j = k[a] || []), (n = j[0] === Q && j[1]), (t = n)), !1 === t))
                                              for (
                                                  ;
                                                  (m = (++n && m && m[p]) || (t = n = 0) || o.pop()) &&
                                                  ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && ((l = m[O] || (m[O] = {})), (k = l[m.uniqueID] || (l[m.uniqueID] = {})), (k[a] = [Q, t])), m !== b));

                                              );
                                          return (t -= e) === d || (t % d == 0 && t / d >= 0);
                                      }
                                  };
                        },
                        PSEUDO: function (a, c) {
                            var e,
                                f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                            return f[O]
                                ? f(c)
                                : f.length > 1
                                ? ((e = [a, a, "", c]),
                                  x.setFilters.hasOwnProperty(a.toLowerCase())
                                      ? d(function (a, b) {
                                            for (var d, e = f(a, c), g = e.length; g--; ) (d = aa(a, e[g])), (a[d] = !(b[d] = e[g]));
                                        })
                                      : function (a) {
                                            return f(a, 0, e);
                                        })
                                : f;
                        },
                    },
                    pseudos: {
                        not: d(function (a) {
                            var b = [],
                                c = [],
                                e = B(a.replace(ha, "$1"));
                            return e[O]
                                ? d(function (a, b, c, d) {
                                      for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                                  })
                                : function (a, d, f) {
                                      return (b[0] = a), e(b, null, f, c), (b[0] = null), !c.pop();
                                  };
                        }),
                        has: d(function (a) {
                            return function (c) {
                                return b(a, c).length > 0;
                            };
                        }),
                        contains: d(function (a) {
                            return (
                                (a = a.replace(ta, ua)),
                                function (b) {
                                    return (b.textContent || b.innerText || y(b)).indexOf(a) > -1;
                                }
                            );
                        }),
                        lang: d(function (a) {
                            return (
                                ma.test(a || "") || b.error("unsupported lang: " + a),
                                (a = a.replace(ta, ua).toLowerCase()),
                                function (b) {
                                    var c;
                                    do {
                                        if ((c = J ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-");
                                    } while ((b = b.parentNode) && 1 === b.nodeType);
                                    return !1;
                                }
                            );
                        }),
                        target: function (b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id;
                        },
                        root: function (a) {
                            return a === I;
                        },
                        focus: function (a) {
                            return a === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                        },
                        enabled: j(!1),
                        disabled: j(!0),
                        checked: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return ("input" === b && !!a.checked) || ("option" === b && !!a.selected);
                        },
                        selected: function (a) {
                            return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected;
                        },
                        empty: function (a) {
                            for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function (a) {
                            return !x.pseudos.empty(a);
                        },
                        header: function (a) {
                            return pa.test(a.nodeName);
                        },
                        input: function (a) {
                            return oa.test(a.nodeName);
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return ("input" === b && "button" === a.type) || "button" === b;
                        },
                        text: function (a) {
                            var b;
                            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                        },
                        first: k(function () {
                            return [0];
                        }),
                        last: k(function (a, b) {
                            return [b - 1];
                        }),
                        eq: k(function (a, b, c) {
                            return [c < 0 ? c + b : c];
                        }),
                        even: k(function (a, b) {
                            for (var c = 0; c < b; c += 2) a.push(c);
                            return a;
                        }),
                        odd: k(function (a, b) {
                            for (var c = 1; c < b; c += 2) a.push(c);
                            return a;
                        }),
                        lt: k(function (a, b, c) {
                            for (var d = c < 0 ? c + b : c; --d >= 0; ) a.push(d);
                            return a;
                        }),
                        gt: k(function (a, b, c) {
                            for (var d = c < 0 ? c + b : c; ++d < b; ) a.push(d);
                            return a;
                        }),
                    },
                }),
                (x.pseudos.nth = x.pseudos.eq);
            for (v in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) x.pseudos[v] = h(v);
            for (v in { submit: !0, reset: !0 }) x.pseudos[v] = i(v);
            return (
                (m.prototype = x.filters = x.pseudos),
                (x.setFilters = new m()),
                (A = b.tokenize = function (a, c) {
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k = T[a + " "];
                    if (k) return c ? 0 : k.slice(0);
                    for (h = a, i = [], j = x.preFilter; h; ) {
                        (d && !(e = ia.exec(h))) || (e && (h = h.slice(e[0].length) || h), i.push((f = []))), (d = !1), (e = ja.exec(h)) && ((d = e.shift()), f.push({ value: d, type: e[0].replace(ha, " ") }), (h = h.slice(d.length)));
                        for (g in x.filter) !(e = na[g].exec(h)) || (j[g] && !(e = j[g](e))) || ((d = e.shift()), f.push({ value: d, type: g, matches: e }), (h = h.slice(d.length)));
                        if (!d) break;
                    }
                    return c ? h.length : h ? b.error(a) : T(a, i).slice(0);
                }),
                (B = b.compile = function (a, b) {
                    var c,
                        d = [],
                        e = [],
                        f = U[a + " "];
                    if (!f) {
                        for (b || (b = A(a)), c = b.length; c--; ) (f = t(b[c])), f[O] ? d.push(f) : e.push(f);
                        (f = U(a, u(e, d))), (f.selector = a);
                    }
                    return f;
                }),
                (C = b.select = function (a, b, c, d) {
                    var e,
                        f,
                        g,
                        h,
                        i,
                        j = "function" == typeof a && a,
                        k = !d && A((a = j.selector || a));
                    if (((c = c || []), 1 === k.length)) {
                        if (((f = k[0] = k[0].slice(0)), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && J && x.relative[f[1].type])) {
                            if (!(b = (x.find.ID(g.matches[0].replace(ta, ua), b) || [])[0])) return c;
                            j && (b = b.parentNode), (a = a.slice(f.shift().value.length));
                        }
                        for (e = na.needsContext.test(a) ? 0 : f.length; e-- && ((g = f[e]), !x.relative[(h = g.type)]); )
                            if ((i = x.find[h]) && (d = i(g.matches[0].replace(ta, ua), (sa.test(f[0].type) && l(b.parentNode)) || b))) {
                                if ((f.splice(e, 1), !(a = d.length && n(f)))) return $.apply(c, d), c;
                                break;
                            }
                    }
                    return (j || B(a, k))(d, b, !J, c, !b || (sa.test(a) && l(b.parentNode)) || b), c;
                }),
                (w.sortStable = O.split("").sort(V).join("") === O),
                (w.detectDuplicates = !!F),
                G(),
                (w.sortDetached = e(function (a) {
                    return 1 & a.compareDocumentPosition(H.createElement("fieldset"));
                })),
                e(function (a) {
                    return (a.innerHTML = "<a href='#'></a>"), "#" === a.firstChild.getAttribute("href");
                }) ||
                    f("type|href|height|width", function (a, b, c) {
                        if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
                    }),
                (w.attributes &&
                    e(function (a) {
                        return (a.innerHTML = "<input/>"), a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
                    })) ||
                    f("value", function (a, b, c) {
                        if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
                    }),
                e(function (a) {
                    return null == a.getAttribute("disabled");
                }) ||
                    f(ba, function (a, b, c) {
                        var d;
                        if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
                    }),
                b
            );
        })(a);
        (oa.find = ta), (oa.expr = ta.selectors), (oa.expr[":"] = oa.expr.pseudos), (oa.uniqueSort = oa.unique = ta.uniqueSort), (oa.text = ta.getText), (oa.isXMLDoc = ta.isXML), (oa.contains = ta.contains), (oa.escapeSelector = ta.escape);
        var ua = function (a, b, c) {
                for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType; )
                    if (1 === a.nodeType) {
                        if (e && oa(a).is(c)) break;
                        d.push(a);
                    }
                return d;
            },
            va = function (a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c;
            },
            wa = oa.expr.match.needsContext,
            xa = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            ya = /^.[^:#\[\.,]*$/;
        (oa.filter = function (a, b, c) {
            var d = b[0];
            return (
                c && (a = ":not(" + a + ")"),
                1 === b.length && 1 === d.nodeType
                    ? oa.find.matchesSelector(d, a)
                        ? [d]
                        : []
                    : oa.find.matches(
                          a,
                          oa.grep(b, function (a) {
                              return 1 === a.nodeType;
                          })
                      )
            );
        }),
            oa.fn.extend({
                find: function (a) {
                    var b,
                        c,
                        d = this.length,
                        e = this;
                    if ("string" != typeof a)
                        return this.pushStack(
                            oa(a).filter(function () {
                                for (b = 0; b < d; b++) if (oa.contains(e[b], this)) return !0;
                            })
                        );
                    for (c = this.pushStack([]), b = 0; b < d; b++) oa.find(a, e[b], c);
                    return d > 1 ? oa.uniqueSort(c) : c;
                },
                filter: function (a) {
                    return this.pushStack(e(this, a || [], !1));
                },
                not: function (a) {
                    return this.pushStack(e(this, a || [], !0));
                },
                is: function (a) {
                    return !!e(this, "string" == typeof a && wa.test(a) ? oa(a) : a || [], !1).length;
                },
            });
        var za,
            Aa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((oa.fn.init = function (a, b, c) {
            var d, e;
            if (!a) return this;
            if (((c = c || za), "string" == typeof a)) {
                if (!(d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : Aa.exec(a)) || (!d[1] && b)) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (d[1]) {
                    if (((b = b instanceof oa ? b[0] : b), oa.merge(this, oa.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : ba, !0)), xa.test(d[1]) && oa.isPlainObject(b)))
                        for (d in b) oa.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                    return this;
                }
                return (e = ba.getElementById(d[2])), e && ((this[0] = e), (this.length = 1)), this;
            }
            return a.nodeType ? ((this[0] = a), (this.length = 1), this) : oa.isFunction(a) ? (void 0 !== c.ready ? c.ready(a) : a(oa)) : oa.makeArray(a, this);
        }).prototype = oa.fn),
            (za = oa(ba));
        var Ba = /^(?:parents|prev(?:Until|All))/,
            Ca = { children: !0, contents: !0, next: !0, prev: !0 };
        oa.fn.extend({
            has: function (a) {
                var b = oa(a, this),
                    c = b.length;
                return this.filter(function () {
                    for (var a = 0; a < c; a++) if (oa.contains(this, b[a])) return !0;
                });
            },
            closest: function (a, b) {
                var c,
                    d = 0,
                    e = this.length,
                    f = [],
                    g = "string" != typeof a && oa(a);
                if (!wa.test(a))
                    for (; d < e; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && oa.find.matchesSelector(c, a))) {
                                f.push(c);
                                break;
                            }
                return this.pushStack(f.length > 1 ? oa.uniqueSort(f) : f);
            },
            index: function (a) {
                return a ? ("string" == typeof a ? ga.call(oa(a), this[0]) : ga.call(this, a.jquery ? a[0] : a)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (a, b) {
                return this.pushStack(oa.uniqueSort(oa.merge(this.get(), oa(a, b))));
            },
            addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
            },
        }),
            oa.each(
                {
                    parent: function (a) {
                        var b = a.parentNode;
                        return b && 11 !== b.nodeType ? b : null;
                    },
                    parents: function (a) {
                        return ua(a, "parentNode");
                    },
                    parentsUntil: function (a, b, c) {
                        return ua(a, "parentNode", c);
                    },
                    next: function (a) {
                        return f(a, "nextSibling");
                    },
                    prev: function (a) {
                        return f(a, "previousSibling");
                    },
                    nextAll: function (a) {
                        return ua(a, "nextSibling");
                    },
                    prevAll: function (a) {
                        return ua(a, "previousSibling");
                    },
                    nextUntil: function (a, b, c) {
                        return ua(a, "nextSibling", c);
                    },
                    prevUntil: function (a, b, c) {
                        return ua(a, "previousSibling", c);
                    },
                    siblings: function (a) {
                        return va((a.parentNode || {}).firstChild, a);
                    },
                    children: function (a) {
                        return va(a.firstChild);
                    },
                    contents: function (a) {
                        return a.contentDocument || oa.merge([], a.childNodes);
                    },
                },
                function (a, b) {
                    oa.fn[a] = function (c, d) {
                        var e = oa.map(this, b, c);
                        return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = oa.filter(d, e)), this.length > 1 && (Ca[a] || oa.uniqueSort(e), Ba.test(a) && e.reverse()), this.pushStack(e);
                    };
                }
            );
        var Da = /[^\x20\t\r\n\f]+/g;
        (oa.Callbacks = function (a) {
            a = "string" == typeof a ? g(a) : oa.extend({}, a);
            var b,
                c,
                d,
                e,
                f = [],
                h = [],
                i = -1,
                j = function () {
                    for (e = a.once, d = b = !0; h.length; i = -1) for (c = h.shift(); ++i < f.length; ) !1 === f[i].apply(c[0], c[1]) && a.stopOnFalse && ((i = f.length), (c = !1));
                    a.memory || (c = !1), (b = !1), e && (f = c ? [] : "");
                },
                k = {
                    add: function () {
                        return (
                            f &&
                                (c && !b && ((i = f.length - 1), h.push(c)),
                                (function b(c) {
                                    oa.each(c, function (c, d) {
                                        oa.isFunction(d) ? (a.unique && k.has(d)) || f.push(d) : d && d.length && "string" !== oa.type(d) && b(d);
                                    });
                                })(arguments),
                                c && !b && j()),
                            this
                        );
                    },
                    remove: function () {
                        return (
                            oa.each(arguments, function (a, b) {
                                for (var c; (c = oa.inArray(b, f, c)) > -1; ) f.splice(c, 1), c <= i && i--;
                            }),
                            this
                        );
                    },
                    has: function (a) {
                        return a ? oa.inArray(a, f) > -1 : f.length > 0;
                    },
                    empty: function () {
                        return f && (f = []), this;
                    },
                    disable: function () {
                        return (e = h = []), (f = c = ""), this;
                    },
                    disabled: function () {
                        return !f;
                    },
                    lock: function () {
                        return (e = h = []), c || b || (f = c = ""), this;
                    },
                    locked: function () {
                        return !!e;
                    },
                    fireWith: function (a, c) {
                        return e || ((c = c || []), (c = [a, c.slice ? c.slice() : c]), h.push(c), b || j()), this;
                    },
                    fire: function () {
                        return k.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!d;
                    },
                };
            return k;
        }),
            oa.extend({
                Deferred: function (b) {
                    var c = [
                            ["notify", "progress", oa.Callbacks("memory"), oa.Callbacks("memory"), 2],
                            ["resolve", "done", oa.Callbacks("once memory"), oa.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", oa.Callbacks("once memory"), oa.Callbacks("once memory"), 1, "rejected"],
                        ],
                        d = "pending",
                        e = {
                            state: function () {
                                return d;
                            },
                            always: function () {
                                return f.done(arguments).fail(arguments), this;
                            },
                            catch: function (a) {
                                return e.then(null, a);
                            },
                            pipe: function () {
                                var a = arguments;
                                return oa
                                    .Deferred(function (b) {
                                        oa.each(c, function (c, d) {
                                            var e = oa.isFunction(a[d[4]]) && a[d[4]];
                                            f[d[1]](function () {
                                                var a = e && e.apply(this, arguments);
                                                a && oa.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments);
                                            });
                                        }),
                                            (a = null);
                                    })
                                    .promise();
                            },
                            then: function (b, d, e) {
                                function f(b, c, d, e) {
                                    return function () {
                                        var j = this,
                                            k = arguments,
                                            l = function () {
                                                var a, l;
                                                if (!(b < g)) {
                                                    if ((a = d.apply(j, k)) === c.promise()) throw new TypeError("Thenable self-resolution");
                                                    (l = a && ("object" == typeof a || "function" == typeof a) && a.then),
                                                        oa.isFunction(l)
                                                            ? e
                                                                ? l.call(a, f(g, c, h, e), f(g, c, i, e))
                                                                : (g++, l.call(a, f(g, c, h, e), f(g, c, i, e), f(g, c, h, c.notifyWith)))
                                                            : (d !== h && ((j = void 0), (k = [a])), (e || c.resolveWith)(j, k));
                                                }
                                            },
                                            m = e
                                                ? l
                                                : function () {
                                                      try {
                                                          l();
                                                      } catch (a) {
                                                          oa.Deferred.exceptionHook && oa.Deferred.exceptionHook(a, m.stackTrace), b + 1 >= g && (d !== i && ((j = void 0), (k = [a])), c.rejectWith(j, k));
                                                      }
                                                  };
                                        b ? m() : (oa.Deferred.getStackHook && (m.stackTrace = oa.Deferred.getStackHook()), a.setTimeout(m));
                                    };
                                }
                                var g = 0;
                                return oa
                                    .Deferred(function (a) {
                                        c[0][3].add(f(0, a, oa.isFunction(e) ? e : h, a.notifyWith)), c[1][3].add(f(0, a, oa.isFunction(b) ? b : h)), c[2][3].add(f(0, a, oa.isFunction(d) ? d : i));
                                    })
                                    .promise();
                            },
                            promise: function (a) {
                                return null != a ? oa.extend(a, e) : e;
                            },
                        },
                        f = {};
                    return (
                        oa.each(c, function (a, b) {
                            var g = b[2],
                                h = b[5];
                            (e[b[1]] = g.add),
                                h &&
                                    g.add(
                                        function () {
                                            d = h;
                                        },
                                        c[3 - a][2].disable,
                                        c[0][2].lock
                                    ),
                                g.add(b[3].fire),
                                (f[b[0]] = function () {
                                    return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
                                }),
                                (f[b[0] + "With"] = g.fireWith);
                        }),
                        e.promise(f),
                        b && b.call(f, f),
                        f
                    );
                },
                when: function (a) {
                    var b = arguments.length,
                        c = b,
                        d = Array(c),
                        e = da.call(arguments),
                        f = oa.Deferred(),
                        g = function (a) {
                            return function (c) {
                                (d[a] = this), (e[a] = arguments.length > 1 ? da.call(arguments) : c), --b || f.resolveWith(d, e);
                            };
                        };
                    if (b <= 1 && (j(a, f.done(g(c)).resolve, f.reject), "pending" === f.state() || oa.isFunction(e[c] && e[c].then))) return f.then();
                    for (; c--; ) j(e[c], g(c), f.reject);
                    return f.promise();
                },
            });
        var Ea = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (oa.Deferred.exceptionHook = function (b, c) {
            a.console && a.console.warn && b && Ea.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
        }),
            (oa.readyException = function (b) {
                a.setTimeout(function () {
                    throw b;
                });
            });
        var Fa = oa.Deferred();
        (oa.fn.ready = function (a) {
            return (
                Fa.then(a).catch(function (a) {
                    oa.readyException(a);
                }),
                this
            );
        }),
            oa.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? oa.readyWait++ : oa.ready(!0);
                },
                ready: function (a) {
                    (!0 === a ? --oa.readyWait : oa.isReady) || ((oa.isReady = !0), (!0 !== a && --oa.readyWait > 0) || Fa.resolveWith(ba, [oa]));
                },
            }),
            (oa.ready.then = Fa.then),
            "complete" === ba.readyState || ("loading" !== ba.readyState && !ba.documentElement.doScroll) ? a.setTimeout(oa.ready) : (ba.addEventListener("DOMContentLoaded", k), a.addEventListener("load", k));
        var Ga = function (a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === oa.type(c)) {
                    e = !0;
                    for (h in c) Ga(a, b, h, c[h], !0, f, g);
                } else if (
                    void 0 !== d &&
                    ((e = !0),
                    oa.isFunction(d) || (g = !0),
                    j &&
                        (g
                            ? (b.call(a, d), (b = null))
                            : ((j = b),
                              (b = function (a, b, c) {
                                  return j.call(oa(a), c);
                              }))),
                    b)
                )
                    for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
            },
            Ha = function (a) {
                return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
            };
        (l.uid = 1),
            (l.prototype = {
                cache: function (a) {
                    var b = a[this.expando];
                    return b || ((b = {}), Ha(a) && (a.nodeType ? (a[this.expando] = b) : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b;
                },
                set: function (a, b, c) {
                    var d,
                        e = this.cache(a);
                    if ("string" == typeof b) e[oa.camelCase(b)] = c;
                    else for (d in b) e[oa.camelCase(d)] = b[d];
                    return e;
                },
                get: function (a, b) {
                    return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][oa.camelCase(b)];
                },
                access: function (a, b, c) {
                    return void 0 === b || (b && "string" == typeof b && void 0 === c) ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b);
                },
                remove: function (a, b) {
                    var c,
                        d = a[this.expando];
                    if (void 0 !== d) {
                        if (void 0 !== b) {
                            oa.isArray(b) ? (b = b.map(oa.camelCase)) : ((b = oa.camelCase(b)), (b = b in d ? [b] : b.match(Da) || [])), (c = b.length);
                            for (; c--; ) delete d[b[c]];
                        }
                        (void 0 === b || oa.isEmptyObject(d)) && (a.nodeType ? (a[this.expando] = void 0) : delete a[this.expando]);
                    }
                },
                hasData: function (a) {
                    var b = a[this.expando];
                    return void 0 !== b && !oa.isEmptyObject(b);
                },
            });
        var Ia = new l(),
            Ja = new l(),
            Ka = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            La = /[A-Z]/g;
        oa.extend({
            hasData: function (a) {
                return Ja.hasData(a) || Ia.hasData(a);
            },
            data: function (a, b, c) {
                return Ja.access(a, b, c);
            },
            removeData: function (a, b) {
                Ja.remove(a, b);
            },
            _data: function (a, b, c) {
                return Ia.access(a, b, c);
            },
            _removeData: function (a, b) {
                Ia.remove(a, b);
            },
        }),
            oa.fn.extend({
                data: function (a, b) {
                    var c,
                        d,
                        e,
                        f = this[0],
                        g = f && f.attributes;
                    if (void 0 === a) {
                        if (this.length && ((e = Ja.get(f)), 1 === f.nodeType && !Ia.get(f, "hasDataAttrs"))) {
                            for (c = g.length; c--; ) g[c] && ((d = g[c].name), 0 === d.indexOf("data-") && ((d = oa.camelCase(d.slice(5))), n(f, d, e[d])));
                            Ia.set(f, "hasDataAttrs", !0);
                        }
                        return e;
                    }
                    return "object" == typeof a
                        ? this.each(function () {
                              Ja.set(this, a);
                          })
                        : Ga(
                              this,
                              function (b) {
                                  var c;
                                  if (f && void 0 === b) {
                                      if (void 0 !== (c = Ja.get(f, a))) return c;
                                      if (void 0 !== (c = n(f, a))) return c;
                                  } else
                                      this.each(function () {
                                          Ja.set(this, a, b);
                                      });
                              },
                              null,
                              b,
                              arguments.length > 1,
                              null,
                              !0
                          );
                },
                removeData: function (a) {
                    return this.each(function () {
                        Ja.remove(this, a);
                    });
                },
            }),
            oa.extend({
                queue: function (a, b, c) {
                    var d;
                    if (a) return (b = (b || "fx") + "queue"), (d = Ia.get(a, b)), c && (!d || oa.isArray(c) ? (d = Ia.access(a, b, oa.makeArray(c))) : d.push(c)), d || [];
                },
                dequeue: function (a, b) {
                    b = b || "fx";
                    var c = oa.queue(a, b),
                        d = c.length,
                        e = c.shift(),
                        f = oa._queueHooks(a, b),
                        g = function () {
                            oa.dequeue(a, b);
                        };
                    "inprogress" === e && ((e = c.shift()), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
                },
                _queueHooks: function (a, b) {
                    var c = b + "queueHooks";
                    return (
                        Ia.get(a, c) ||
                        Ia.access(a, c, {
                            empty: oa.Callbacks("once memory").add(function () {
                                Ia.remove(a, [b + "queue", c]);
                            }),
                        })
                    );
                },
            }),
            oa.fn.extend({
                queue: function (a, b) {
                    var c = 2;
                    return (
                        "string" != typeof a && ((b = a), (a = "fx"), c--),
                        arguments.length < c
                            ? oa.queue(this[0], a)
                            : void 0 === b
                            ? this
                            : this.each(function () {
                                  var c = oa.queue(this, a, b);
                                  oa._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && oa.dequeue(this, a);
                              })
                    );
                },
                dequeue: function (a) {
                    return this.each(function () {
                        oa.dequeue(this, a);
                    });
                },
                clearQueue: function (a) {
                    return this.queue(a || "fx", []);
                },
                promise: function (a, b) {
                    var c,
                        d = 1,
                        e = oa.Deferred(),
                        f = this,
                        g = this.length,
                        h = function () {
                            --d || e.resolveWith(f, [f]);
                        };
                    for ("string" != typeof a && ((b = a), (a = void 0)), a = a || "fx"; g--; ) (c = Ia.get(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
                    return h(), e.promise(b);
                },
            });
        var Ma = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Na = new RegExp("^(?:([+-])=|)(" + Ma + ")([a-z%]*)$", "i"),
            Oa = ["Top", "Right", "Bottom", "Left"],
            Pa = function (a, b) {
                return (a = b || a), "none" === a.style.display || ("" === a.style.display && oa.contains(a.ownerDocument, a) && "none" === oa.css(a, "display"));
            },
            Qa = function (a, b, c, d) {
                var e,
                    f,
                    g = {};
                for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e;
            },
            Ra = {};
        oa.fn.extend({
            show: function () {
                return q(this, !0);
            },
            hide: function () {
                return q(this);
            },
            toggle: function (a) {
                return "boolean" == typeof a
                    ? a
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          Pa(this) ? oa(this).show() : oa(this).hide();
                      });
            },
        });
        var Sa = /^(?:checkbox|radio)$/i,
            Ta = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Ua = /^$|\/(?:java|ecma)script/i,
            Va = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""],
            };
        (Va.optgroup = Va.option), (Va.tbody = Va.tfoot = Va.colgroup = Va.caption = Va.thead), (Va.th = Va.td);
        var Wa = /<|&#?\w+;/;
        !(function () {
            var a = ba.createDocumentFragment(),
                b = a.appendChild(ba.createElement("div")),
                c = ba.createElement("input");
            c.setAttribute("type", "radio"),
                c.setAttribute("checked", "checked"),
                c.setAttribute("name", "t"),
                b.appendChild(c),
                (ma.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked),
                (b.innerHTML = "<textarea>x</textarea>"),
                (ma.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue);
        })();
        var Xa = ba.documentElement,
            Ya = /^key/,
            Za = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            $a = /^([^.]*)(?:\.(.+)|)/;
        (oa.event = {
            global: {},
            add: function (a, b, c, d, e) {
                var f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q = Ia.get(a);
                if (q)
                    for (
                        c.handler && ((f = c), (c = f.handler), (e = f.selector)),
                            e && oa.find.matchesSelector(Xa, e),
                            c.guid || (c.guid = oa.guid++),
                            (i = q.events) || (i = q.events = {}),
                            (g = q.handle) ||
                                (g = q.handle = function (b) {
                                    return void 0 !== oa && oa.event.triggered !== b.type ? oa.event.dispatch.apply(a, arguments) : void 0;
                                }),
                            b = (b || "").match(Da) || [""],
                            j = b.length;
                        j--;

                    )
                        (h = $a.exec(b[j]) || []),
                            (n = p = h[1]),
                            (o = (h[2] || "").split(".").sort()),
                            n &&
                                ((l = oa.event.special[n] || {}),
                                (n = (e ? l.delegateType : l.bindType) || n),
                                (l = oa.event.special[n] || {}),
                                (k = oa.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && oa.expr.match.needsContext.test(e), namespace: o.join(".") }, f)),
                                (m = i[n]) || ((m = i[n] = []), (m.delegateCount = 0), (l.setup && !1 !== l.setup.call(a, d, o, g)) || (a.addEventListener && a.addEventListener(n, g))),
                                l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)),
                                e ? m.splice(m.delegateCount++, 0, k) : m.push(k),
                                (oa.event.global[n] = !0));
            },
            remove: function (a, b, c, d, e) {
                var f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q = Ia.hasData(a) && Ia.get(a);
                if (q && (i = q.events)) {
                    for (b = (b || "").match(Da) || [""], j = b.length; j--; )
                        if (((h = $a.exec(b[j]) || []), (n = p = h[1]), (o = (h[2] || "").split(".").sort()), n)) {
                            for (l = oa.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--; )
                                (k = m[f]),
                                    (!e && p !== k.origType) ||
                                        (c && c.guid !== k.guid) ||
                                        (h && !h.test(k.namespace)) ||
                                        (d && d !== k.selector && ("**" !== d || !k.selector)) ||
                                        (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                            g && !m.length && ((l.teardown && !1 !== l.teardown.call(a, o, q.handle)) || oa.removeEvent(a, n, q.handle), delete i[n]);
                        } else for (n in i) oa.event.remove(a, n + b[j], c, d, !0);
                    oa.isEmptyObject(i) && Ia.remove(a, "handle events");
                }
            },
            dispatch: function (a) {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g,
                    h = oa.event.fix(a),
                    i = new Array(arguments.length),
                    j = (Ia.get(this, "events") || {})[h.type] || [],
                    k = oa.event.special[h.type] || {};
                for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
                if (((h.delegateTarget = this), !k.preDispatch || !1 !== k.preDispatch.call(this, h))) {
                    for (g = oa.event.handlers.call(this, h, j), b = 0; (e = g[b++]) && !h.isPropagationStopped(); )
                        for (h.currentTarget = e.elem, c = 0; (f = e.handlers[c++]) && !h.isImmediatePropagationStopped(); )
                            (h.rnamespace && !h.rnamespace.test(f.namespace)) ||
                                ((h.handleObj = f), (h.data = f.data), void 0 !== (d = ((oa.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i)) && !1 === (h.result = d) && (h.preventDefault(), h.stopPropagation()));
                    return k.postDispatch && k.postDispatch.call(this, h), h.result;
                }
            },
            handlers: function (a, b) {
                var c,
                    d,
                    e,
                    f,
                    g,
                    h = [],
                    i = b.delegateCount,
                    j = a.target;
                if (i && j.nodeType && !("click" === a.type && a.button >= 1))
                    for (; j !== this; j = j.parentNode || this)
                        if (1 === j.nodeType && ("click" !== a.type || !0 !== j.disabled)) {
                            for (f = [], g = {}, c = 0; c < i; c++) (d = b[c]), (e = d.selector + " "), void 0 === g[e] && (g[e] = d.needsContext ? oa(e, this).index(j) > -1 : oa.find(e, this, null, [j]).length), g[e] && f.push(d);
                            f.length && h.push({ elem: j, handlers: f });
                        }
                return (j = this), i < b.length && h.push({ elem: j, handlers: b.slice(i) }), h;
            },
            addProp: function (a, b) {
                Object.defineProperty(oa.Event.prototype, a, {
                    enumerable: !0,
                    configurable: !0,
                    get: oa.isFunction(b)
                        ? function () {
                              if (this.originalEvent) return b(this.originalEvent);
                          }
                        : function () {
                              if (this.originalEvent) return this.originalEvent[a];
                          },
                    set: function (b) {
                        Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b });
                    },
                });
            },
            fix: function (a) {
                return a[oa.expando] ? a : new oa.Event(a);
            },
            special: {
                load: { noBubble: !0 },
                focus: {
                    trigger: function () {
                        if (this !== w() && this.focus) return this.focus(), !1;
                    },
                    delegateType: "focusin",
                },
                blur: {
                    trigger: function () {
                        if (this === w() && this.blur) return this.blur(), !1;
                    },
                    delegateType: "focusout",
                },
                click: {
                    trigger: function () {
                        if ("checkbox" === this.type && this.click && oa.nodeName(this, "input")) return this.click(), !1;
                    },
                    _default: function (a) {
                        return oa.nodeName(a.target, "a");
                    },
                },
                beforeunload: {
                    postDispatch: function (a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                    },
                },
            },
        }),
            (oa.removeEvent = function (a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c);
            }),
            (oa.Event = function (a, b) {
                return this instanceof oa.Event
                    ? (a && a.type
                          ? ((this.originalEvent = a),
                            (this.type = a.type),
                            (this.isDefaultPrevented = a.defaultPrevented || (void 0 === a.defaultPrevented && !1 === a.returnValue) ? u : v),
                            (this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target),
                            (this.currentTarget = a.currentTarget),
                            (this.relatedTarget = a.relatedTarget))
                          : (this.type = a),
                      b && oa.extend(this, b),
                      (this.timeStamp = (a && a.timeStamp) || oa.now()),
                      void (this[oa.expando] = !0))
                    : new oa.Event(a, b);
            }),
            (oa.Event.prototype = {
                constructor: oa.Event,
                isDefaultPrevented: v,
                isPropagationStopped: v,
                isImmediatePropagationStopped: v,
                isSimulated: !1,
                preventDefault: function () {
                    var a = this.originalEvent;
                    (this.isDefaultPrevented = u), a && !this.isSimulated && a.preventDefault();
                },
                stopPropagation: function () {
                    var a = this.originalEvent;
                    (this.isPropagationStopped = u), a && !this.isSimulated && a.stopPropagation();
                },
                stopImmediatePropagation: function () {
                    var a = this.originalEvent;
                    (this.isImmediatePropagationStopped = u), a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
                },
            }),
            oa.each(
                {
                    altKey: !0,
                    bubbles: !0,
                    cancelable: !0,
                    changedTouches: !0,
                    ctrlKey: !0,
                    detail: !0,
                    eventPhase: !0,
                    metaKey: !0,
                    pageX: !0,
                    pageY: !0,
                    shiftKey: !0,
                    view: !0,
                    char: !0,
                    charCode: !0,
                    key: !0,
                    keyCode: !0,
                    button: !0,
                    buttons: !0,
                    clientX: !0,
                    clientY: !0,
                    offsetX: !0,
                    offsetY: !0,
                    pointerId: !0,
                    pointerType: !0,
                    screenX: !0,
                    screenY: !0,
                    targetTouches: !0,
                    toElement: !0,
                    touches: !0,
                    which: function (a) {
                        var b = a.button;
                        return null == a.which && Ya.test(a.type) ? (null != a.charCode ? a.charCode : a.keyCode) : !a.which && void 0 !== b && Za.test(a.type) ? (1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0) : a.which;
                    },
                },
                oa.event.addProp
            ),
            oa.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
                oa.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function (a) {
                        var c,
                            d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return (e && (e === d || oa.contains(d, e))) || ((a.type = f.origType), (c = f.handler.apply(this, arguments)), (a.type = b)), c;
                    },
                };
            }),
            oa.fn.extend({
                on: function (a, b, c, d) {
                    return x(this, a, b, c, d);
                },
                one: function (a, b, c, d) {
                    return x(this, a, b, c, d, 1);
                },
                off: function (a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj) return (d = a.handleObj), oa(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                    if ("object" == typeof a) {
                        for (e in a) this.off(e, b, a[e]);
                        return this;
                    }
                    return (
                        (!1 !== b && "function" != typeof b) || ((c = b), (b = void 0)),
                        !1 === c && (c = v),
                        this.each(function () {
                            oa.event.remove(this, a, c, b);
                        })
                    );
                },
            });
        var _a = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            ab = /<script|<style|<link/i,
            bb = /checked\s*(?:[^=]|=\s*.checked.)/i,
            cb = /^true\/(.*)/,
            db = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        oa.extend({
            htmlPrefilter: function (a) {
                return a.replace(_a, "<$1></$2>");
            },
            clone: function (a, b, c) {
                var d,
                    e,
                    f,
                    g,
                    h = a.cloneNode(!0),
                    i = oa.contains(a.ownerDocument, a);
                if (!(ma.noCloneChecked || (1 !== a.nodeType && 11 !== a.nodeType) || oa.isXMLDoc(a))) for (g = r(h), f = r(a), d = 0, e = f.length; d < e; d++) C(f[d], g[d]);
                if (b)
                    if (c) for (f = f || r(a), g = g || r(h), d = 0, e = f.length; d < e; d++) B(f[d], g[d]);
                    else B(a, h);
                return (g = r(h, "script")), g.length > 0 && s(g, !i && r(a, "script")), h;
            },
            cleanData: function (a) {
                for (var b, c, d, e = oa.event.special, f = 0; void 0 !== (c = a[f]); f++)
                    if (Ha(c)) {
                        if ((b = c[Ia.expando])) {
                            if (b.events) for (d in b.events) e[d] ? oa.event.remove(c, d) : oa.removeEvent(c, d, b.handle);
                            c[Ia.expando] = void 0;
                        }
                        c[Ja.expando] && (c[Ja.expando] = void 0);
                    }
            },
        }),
            oa.fn.extend({
                detach: function (a) {
                    return E(this, a, !0);
                },
                remove: function (a) {
                    return E(this, a);
                },
                text: function (a) {
                    return Ga(
                        this,
                        function (a) {
                            return void 0 === a
                                ? oa.text(this)
                                : this.empty().each(function () {
                                      (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = a);
                                  });
                        },
                        null,
                        a,
                        arguments.length
                    );
                },
                append: function () {
                    return D(this, arguments, function (a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            y(this, a).appendChild(a);
                        }
                    });
                },
                prepend: function () {
                    return D(this, arguments, function (a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = y(this, a);
                            b.insertBefore(a, b.firstChild);
                        }
                    });
                },
                before: function () {
                    return D(this, arguments, function (a) {
                        this.parentNode && this.parentNode.insertBefore(a, this);
                    });
                },
                after: function () {
                    return D(this, arguments, function (a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
                    });
                },
                empty: function () {
                    for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (oa.cleanData(r(a, !1)), (a.textContent = ""));
                    return this;
                },
                clone: function (a, b) {
                    return (
                        (a = null != a && a),
                        (b = null == b ? a : b),
                        this.map(function () {
                            return oa.clone(this, a, b);
                        })
                    );
                },
                html: function (a) {
                    return Ga(
                        this,
                        function (a) {
                            var b = this[0] || {},
                                c = 0,
                                d = this.length;
                            if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                            if ("string" == typeof a && !ab.test(a) && !Va[(Ta.exec(a) || ["", ""])[1].toLowerCase()]) {
                                a = oa.htmlPrefilter(a);
                                try {
                                    for (; c < d; c++) (b = this[c] || {}), 1 === b.nodeType && (oa.cleanData(r(b, !1)), (b.innerHTML = a));
                                    b = 0;
                                } catch (a) {}
                            }
                            b && this.empty().append(a);
                        },
                        null,
                        a,
                        arguments.length
                    );
                },
                replaceWith: function () {
                    var a = [];
                    return D(
                        this,
                        arguments,
                        function (b) {
                            var c = this.parentNode;
                            oa.inArray(this, a) < 0 && (oa.cleanData(r(this)), c && c.replaceChild(b, this));
                        },
                        a
                    );
                },
            }),
            oa.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
                oa.fn[a] = function (a) {
                    for (var c, d = [], e = oa(a), f = e.length - 1, g = 0; g <= f; g++) (c = g === f ? this : this.clone(!0)), oa(e[g])[b](c), fa.apply(d, c.get());
                    return this.pushStack(d);
                };
            });
        var eb = /^margin/,
            fb = new RegExp("^(" + Ma + ")(?!px)[a-z%]+$", "i"),
            gb = function (b) {
                var c = b.ownerDocument.defaultView;
                return (c && c.opener) || (c = a), c.getComputedStyle(b);
            };
        !(function () {
            function b() {
                if (h) {
                    (h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"), (h.innerHTML = ""), Xa.appendChild(g);
                    var b = a.getComputedStyle(h);
                    (c = "1%" !== b.top), (f = "2px" === b.marginLeft), (d = "4px" === b.width), (h.style.marginRight = "50%"), (e = "4px" === b.marginRight), Xa.removeChild(g), (h = null);
                }
            }
            var c,
                d,
                e,
                f,
                g = ba.createElement("div"),
                h = ba.createElement("div");
            h.style &&
                ((h.style.backgroundClip = "content-box"),
                (h.cloneNode(!0).style.backgroundClip = ""),
                (ma.clearCloneStyle = "content-box" === h.style.backgroundClip),
                (g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                g.appendChild(h),
                oa.extend(ma, {
                    pixelPosition: function () {
                        return b(), c;
                    },
                    boxSizingReliable: function () {
                        return b(), d;
                    },
                    pixelMarginRight: function () {
                        return b(), e;
                    },
                    reliableMarginLeft: function () {
                        return b(), f;
                    },
                }));
        })();
        var hb = /^(none|table(?!-c[ea]).+)/,
            ib = { position: "absolute", visibility: "hidden", display: "block" },
            jb = { letterSpacing: "0", fontWeight: "400" },
            kb = ["Webkit", "Moz", "ms"],
            lb = ba.createElement("div").style;
        oa.extend({
            cssHooks: {
                opacity: {
                    get: function (a, b) {
                        if (b) {
                            var c = F(a, "opacity");
                            return "" === c ? "1" : c;
                        }
                    },
                },
            },
            cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { float: "cssFloat" },
            style: function (a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e,
                        f,
                        g,
                        h = oa.camelCase(b),
                        i = a.style;
                    return (
                        (b = oa.cssProps[h] || (oa.cssProps[h] = H(h) || h)),
                        (g = oa.cssHooks[b] || oa.cssHooks[h]),
                        void 0 === c
                            ? g && "get" in g && void 0 !== (e = g.get(a, !1, d))
                                ? e
                                : i[b]
                            : ((f = typeof c),
                              "string" === f && (e = Na.exec(c)) && e[1] && ((c = o(a, b, e)), (f = "number")),
                              void (
                                  null != c &&
                                  c === c &&
                                  ("number" === f && (c += (e && e[3]) || (oa.cssNumber[h] ? "" : "px")),
                                  ma.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"),
                                  (g && "set" in g && void 0 === (c = g.set(a, c, d))) || (i[b] = c))
                              ))
                    );
                }
            },
            css: function (a, b, c, d) {
                var e,
                    f,
                    g,
                    h = oa.camelCase(b);
                return (
                    (b = oa.cssProps[h] || (oa.cssProps[h] = H(h) || h)),
                    (g = oa.cssHooks[b] || oa.cssHooks[h]),
                    g && "get" in g && (e = g.get(a, !0, c)),
                    void 0 === e && (e = F(a, b, d)),
                    "normal" === e && b in jb && (e = jb[b]),
                    "" === c || c ? ((f = parseFloat(e)), !0 === c || isFinite(f) ? f || 0 : e) : e
                );
            },
        }),
            oa.each(["height", "width"], function (a, b) {
                oa.cssHooks[b] = {
                    get: function (a, c, d) {
                        if (c)
                            return !hb.test(oa.css(a, "display")) || (a.getClientRects().length && a.getBoundingClientRect().width)
                                ? K(a, b, d)
                                : Qa(a, ib, function () {
                                      return K(a, b, d);
                                  });
                    },
                    set: function (a, c, d) {
                        var e,
                            f = d && gb(a),
                            g = d && J(a, b, d, "border-box" === oa.css(a, "boxSizing", !1, f), f);
                        return g && (e = Na.exec(c)) && "px" !== (e[3] || "px") && ((a.style[b] = c), (c = oa.css(a, b))), I(a, c, g);
                    },
                };
            }),
            (oa.cssHooks.marginLeft = G(ma.reliableMarginLeft, function (a, b) {
                if (b)
                    return (
                        (parseFloat(F(a, "marginLeft")) ||
                            a.getBoundingClientRect().left -
                                Qa(a, { marginLeft: 0 }, function () {
                                    return a.getBoundingClientRect().left;
                                })) + "px"
                    );
            })),
            oa.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
                (oa.cssHooks[a + b] = {
                    expand: function (c) {
                        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + Oa[d] + b] = f[d] || f[d - 2] || f[0];
                        return e;
                    },
                }),
                    eb.test(a) || (oa.cssHooks[a + b].set = I);
            }),
            oa.fn.extend({
                css: function (a, b) {
                    return Ga(
                        this,
                        function (a, b, c) {
                            var d,
                                e,
                                f = {},
                                g = 0;
                            if (oa.isArray(b)) {
                                for (d = gb(a), e = b.length; g < e; g++) f[b[g]] = oa.css(a, b[g], !1, d);
                                return f;
                            }
                            return void 0 !== c ? oa.style(a, b, c) : oa.css(a, b);
                        },
                        a,
                        b,
                        arguments.length > 1
                    );
                },
            }),
            (oa.Tween = L),
            (L.prototype = {
                constructor: L,
                init: function (a, b, c, d, e, f) {
                    (this.elem = a), (this.prop = c), (this.easing = e || oa.easing._default), (this.options = b), (this.start = this.now = this.cur()), (this.end = d), (this.unit = f || (oa.cssNumber[c] ? "" : "px"));
                },
                cur: function () {
                    var a = L.propHooks[this.prop];
                    return a && a.get ? a.get(this) : L.propHooks._default.get(this);
                },
                run: function (a) {
                    var b,
                        c = L.propHooks[this.prop];
                    return (
                        this.options.duration ? (this.pos = b = oa.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration)) : (this.pos = b = a),
                        (this.now = (this.end - this.start) * b + this.start),
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        c && c.set ? c.set(this) : L.propHooks._default.set(this),
                        this
                    );
                },
            }),
            (L.prototype.init.prototype = L.prototype),
            (L.propHooks = {
                _default: {
                    get: function (a) {
                        var b;
                        return 1 !== a.elem.nodeType || (null != a.elem[a.prop] && null == a.elem.style[a.prop]) ? a.elem[a.prop] : ((b = oa.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0);
                    },
                    set: function (a) {
                        oa.fx.step[a.prop] ? oa.fx.step[a.prop](a) : 1 !== a.elem.nodeType || (null == a.elem.style[oa.cssProps[a.prop]] && !oa.cssHooks[a.prop]) ? (a.elem[a.prop] = a.now) : oa.style(a.elem, a.prop, a.now + a.unit);
                    },
                },
            }),
            (L.propHooks.scrollTop = L.propHooks.scrollLeft = {
                set: function (a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
                },
            }),
            (oa.easing = {
                linear: function (a) {
                    return a;
                },
                swing: function (a) {
                    return 0.5 - Math.cos(a * Math.PI) / 2;
                },
                _default: "swing",
            }),
            (oa.fx = L.prototype.init),
            (oa.fx.step = {});
        var mb,
            nb,
            ob = /^(?:toggle|show|hide)$/,
            pb = /queueHooks$/;
        (oa.Animation = oa.extend(S, {
            tweeners: {
                "*": [
                    function (a, b) {
                        var c = this.createTween(a, b);
                        return o(c.elem, a, Na.exec(b), c), c;
                    },
                ],
            },
            tweener: function (a, b) {
                oa.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.match(Da));
                for (var c, d = 0, e = a.length; d < e; d++) (c = a[d]), (S.tweeners[c] = S.tweeners[c] || []), S.tweeners[c].unshift(b);
            },
            prefilters: [Q],
            prefilter: function (a, b) {
                b ? S.prefilters.unshift(a) : S.prefilters.push(a);
            },
        })),
            (oa.speed = function (a, b, c) {
                var d = a && "object" == typeof a ? oa.extend({}, a) : { complete: c || (!c && b) || (oa.isFunction(a) && a), duration: a, easing: (c && b) || (b && !oa.isFunction(b) && b) };
                return (
                    oa.fx.off || ba.hidden ? (d.duration = 0) : "number" != typeof d.duration && (d.duration in oa.fx.speeds ? (d.duration = oa.fx.speeds[d.duration]) : (d.duration = oa.fx.speeds._default)),
                    (null != d.queue && !0 !== d.queue) || (d.queue = "fx"),
                    (d.old = d.complete),
                    (d.complete = function () {
                        oa.isFunction(d.old) && d.old.call(this), d.queue && oa.dequeue(this, d.queue);
                    }),
                    d
                );
            }),
            oa.fn.extend({
                fadeTo: function (a, b, c, d) {
                    return this.filter(Pa).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
                },
                animate: function (a, b, c, d) {
                    var e = oa.isEmptyObject(a),
                        f = oa.speed(b, c, d),
                        g = function () {
                            var b = S(this, oa.extend({}, a), f);
                            (e || Ia.get(this, "finish")) && b.stop(!0);
                        };
                    return (g.finish = g), e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g);
                },
                stop: function (a, b, c) {
                    var d = function (a) {
                        var b = a.stop;
                        delete a.stop, b(c);
                    };
                    return (
                        "string" != typeof a && ((c = b), (b = a), (a = void 0)),
                        b && !1 !== a && this.queue(a || "fx", []),
                        this.each(function () {
                            var b = !0,
                                e = null != a && a + "queueHooks",
                                f = oa.timers,
                                g = Ia.get(this);
                            if (e) g[e] && g[e].stop && d(g[e]);
                            else for (e in g) g[e] && g[e].stop && pb.test(e) && d(g[e]);
                            for (e = f.length; e--; ) f[e].elem !== this || (null != a && f[e].queue !== a) || (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
                            (!b && c) || oa.dequeue(this, a);
                        })
                    );
                },
                finish: function (a) {
                    return (
                        !1 !== a && (a = a || "fx"),
                        this.each(function () {
                            var b,
                                c = Ia.get(this),
                                d = c[a + "queue"],
                                e = c[a + "queueHooks"],
                                f = oa.timers,
                                g = d ? d.length : 0;
                            for (c.finish = !0, oa.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                            for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                            delete c.finish;
                        })
                    );
                },
            }),
            oa.each(["toggle", "show", "hide"], function (a, b) {
                var c = oa.fn[b];
                oa.fn[b] = function (a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(O(b, !0), a, d, e);
                };
            }),
            oa.each({ slideDown: O("show"), slideUp: O("hide"), slideToggle: O("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
                oa.fn[a] = function (a, c, d) {
                    return this.animate(b, a, c, d);
                };
            }),
            (oa.timers = []),
            (oa.fx.tick = function () {
                var a,
                    b = 0,
                    c = oa.timers;
                for (mb = oa.now(); b < c.length; b++) (a = c[b])() || c[b] !== a || c.splice(b--, 1);
                c.length || oa.fx.stop(), (mb = void 0);
            }),
            (oa.fx.timer = function (a) {
                oa.timers.push(a), a() ? oa.fx.start() : oa.timers.pop();
            }),
            (oa.fx.interval = 13),
            (oa.fx.start = function () {
                nb || (nb = a.requestAnimationFrame ? a.requestAnimationFrame(M) : a.setInterval(oa.fx.tick, oa.fx.interval));
            }),
            (oa.fx.stop = function () {
                a.cancelAnimationFrame ? a.cancelAnimationFrame(nb) : a.clearInterval(nb), (nb = null);
            }),
            (oa.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (oa.fn.delay = function (b, c) {
                return (
                    (b = oa.fx ? oa.fx.speeds[b] || b : b),
                    (c = c || "fx"),
                    this.queue(c, function (c, d) {
                        var e = a.setTimeout(c, b);
                        d.stop = function () {
                            a.clearTimeout(e);
                        };
                    })
                );
            }),
            (function () {
                var a = ba.createElement("input"),
                    b = ba.createElement("select"),
                    c = b.appendChild(ba.createElement("option"));
                (a.type = "checkbox"), (ma.checkOn = "" !== a.value), (ma.optSelected = c.selected), (a = ba.createElement("input")), (a.value = "t"), (a.type = "radio"), (ma.radioValue = "t" === a.value);
            })();
        var qb,
            rb = oa.expr.attrHandle;
        oa.fn.extend({
            attr: function (a, b) {
                return Ga(this, oa.attr, a, b, arguments.length > 1);
            },
            removeAttr: function (a) {
                return this.each(function () {
                    oa.removeAttr(this, a);
                });
            },
        }),
            oa.extend({
                attr: function (a, b, c) {
                    var d,
                        e,
                        f = a.nodeType;
                    if (3 !== f && 8 !== f && 2 !== f)
                        return void 0 === a.getAttribute
                            ? oa.prop(a, b, c)
                            : ((1 === f && oa.isXMLDoc(a)) || (e = oa.attrHooks[b.toLowerCase()] || (oa.expr.match.bool.test(b) ? qb : void 0)),
                              void 0 !== c
                                  ? null === c
                                      ? void oa.removeAttr(a, b)
                                      : e && "set" in e && void 0 !== (d = e.set(a, c, b))
                                      ? d
                                      : (a.setAttribute(b, c + ""), c)
                                  : e && "get" in e && null !== (d = e.get(a, b))
                                  ? d
                                  : ((d = oa.find.attr(a, b)), null == d ? void 0 : d));
                },
                attrHooks: {
                    type: {
                        set: function (a, b) {
                            if (!ma.radioValue && "radio" === b && oa.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b), c && (a.value = c), b;
                            }
                        },
                    },
                },
                removeAttr: function (a, b) {
                    var c,
                        d = 0,
                        e = b && b.match(Da);
                    if (e && 1 === a.nodeType) for (; (c = e[d++]); ) a.removeAttribute(c);
                },
            }),
            (qb = {
                set: function (a, b, c) {
                    return !1 === b ? oa.removeAttr(a, c) : a.setAttribute(c, c), c;
                },
            }),
            oa.each(oa.expr.match.bool.source.match(/\w+/g), function (a, b) {
                var c = rb[b] || oa.find.attr;
                rb[b] = function (a, b, d) {
                    var e,
                        f,
                        g = b.toLowerCase();
                    return d || ((f = rb[g]), (rb[g] = e), (e = null != c(a, b, d) ? g : null), (rb[g] = f)), e;
                };
            });
        var sb = /^(?:input|select|textarea|button)$/i,
            tb = /^(?:a|area)$/i;
        oa.fn.extend({
            prop: function (a, b) {
                return Ga(this, oa.prop, a, b, arguments.length > 1);
            },
            removeProp: function (a) {
                return this.each(function () {
                    delete this[oa.propFix[a] || a];
                });
            },
        }),
            oa.extend({
                prop: function (a, b, c) {
                    var d,
                        e,
                        f = a.nodeType;
                    if (3 !== f && 8 !== f && 2 !== f)
                        return (
                            (1 === f && oa.isXMLDoc(a)) || ((b = oa.propFix[b] || b), (e = oa.propHooks[b])),
                            void 0 !== c ? (e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a[b] = c)) : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                        );
                },
                propHooks: {
                    tabIndex: {
                        get: function (a) {
                            var b = oa.find.attr(a, "tabindex");
                            return b ? parseInt(b, 10) : sb.test(a.nodeName) || (tb.test(a.nodeName) && a.href) ? 0 : -1;
                        },
                    },
                },
                propFix: { for: "htmlFor", class: "className" },
            }),
            ma.optSelected ||
                (oa.propHooks.selected = {
                    get: function (a) {
                        var b = a.parentNode;
                        return b && b.parentNode && b.parentNode.selectedIndex, null;
                    },
                    set: function (a) {
                        var b = a.parentNode;
                        b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
                    },
                }),
            oa.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                oa.propFix[this.toLowerCase()] = this;
            }),
            oa.fn.extend({
                addClass: function (a) {
                    var b,
                        c,
                        d,
                        e,
                        f,
                        g,
                        h,
                        i = 0;
                    if (oa.isFunction(a))
                        return this.each(function (b) {
                            oa(this).addClass(a.call(this, b, U(this)));
                        });
                    if ("string" == typeof a && a)
                        for (b = a.match(Da) || []; (c = this[i++]); )
                            if (((e = U(c)), (d = 1 === c.nodeType && " " + T(e) + " "))) {
                                for (g = 0; (f = b[g++]); ) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                                (h = T(d)), e !== h && c.setAttribute("class", h);
                            }
                    return this;
                },
                removeClass: function (a) {
                    var b,
                        c,
                        d,
                        e,
                        f,
                        g,
                        h,
                        i = 0;
                    if (oa.isFunction(a))
                        return this.each(function (b) {
                            oa(this).removeClass(a.call(this, b, U(this)));
                        });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof a && a)
                        for (b = a.match(Da) || []; (c = this[i++]); )
                            if (((e = U(c)), (d = 1 === c.nodeType && " " + T(e) + " "))) {
                                for (g = 0; (f = b[g++]); ) for (; d.indexOf(" " + f + " ") > -1; ) d = d.replace(" " + f + " ", " ");
                                (h = T(d)), e !== h && c.setAttribute("class", h);
                            }
                    return this;
                },
                toggleClass: function (a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c
                        ? b
                            ? this.addClass(a)
                            : this.removeClass(a)
                        : oa.isFunction(a)
                        ? this.each(function (c) {
                              oa(this).toggleClass(a.call(this, c, U(this), b), b);
                          })
                        : this.each(function () {
                              var b, d, e, f;
                              if ("string" === c) for (d = 0, e = oa(this), f = a.match(Da) || []; (b = f[d++]); ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                              else (void 0 !== a && "boolean" !== c) || ((b = U(this)), b && Ia.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || !1 === a ? "" : Ia.get(this, "__className__") || ""));
                          });
                },
                hasClass: function (a) {
                    var b,
                        c,
                        d = 0;
                    for (b = " " + a + " "; (c = this[d++]); ) if (1 === c.nodeType && (" " + T(U(c)) + " ").indexOf(b) > -1) return !0;
                    return !1;
                },
            });
        var ub = /\r/g;
        oa.fn.extend({
            val: function (a) {
                var b,
                    c,
                    d,
                    e = this[0];
                return arguments.length
                    ? ((d = oa.isFunction(a)),
                      this.each(function (c) {
                          var e;
                          1 === this.nodeType &&
                              ((e = d ? a.call(this, c, oa(this).val()) : a),
                              null == e
                                  ? (e = "")
                                  : "number" == typeof e
                                  ? (e += "")
                                  : oa.isArray(e) &&
                                    (e = oa.map(e, function (a) {
                                        return null == a ? "" : a + "";
                                    })),
                              ((b = oa.valHooks[this.type] || oa.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value")) || (this.value = e));
                      }))
                    : e
                    ? ((b = oa.valHooks[e.type] || oa.valHooks[e.nodeName.toLowerCase()]), b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : ((c = e.value), "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c))
                    : void 0;
            },
        }),
            oa.extend({
                valHooks: {
                    option: {
                        get: function (a) {
                            var b = oa.find.attr(a, "value");
                            return null != b ? b : T(oa.text(a));
                        },
                    },
                    select: {
                        get: function (a) {
                            var b,
                                c,
                                d,
                                e = a.options,
                                f = a.selectedIndex,
                                g = "select-one" === a.type,
                                h = g ? null : [],
                                i = g ? f + 1 : e.length;
                            for (d = f < 0 ? i : g ? f : 0; d < i; d++)
                                if (((c = e[d]), (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !oa.nodeName(c.parentNode, "optgroup")))) {
                                    if (((b = oa(c).val()), g)) return b;
                                    h.push(b);
                                }
                            return h;
                        },
                        set: function (a, b) {
                            for (var c, d, e = a.options, f = oa.makeArray(b), g = e.length; g--; ) (d = e[g]), (d.selected = oa.inArray(oa.valHooks.option.get(d), f) > -1) && (c = !0);
                            return c || (a.selectedIndex = -1), f;
                        },
                    },
                },
            }),
            oa.each(["radio", "checkbox"], function () {
                (oa.valHooks[this] = {
                    set: function (a, b) {
                        if (oa.isArray(b)) return (a.checked = oa.inArray(oa(a).val(), b) > -1);
                    },
                }),
                    ma.checkOn ||
                        (oa.valHooks[this].get = function (a) {
                            return null === a.getAttribute("value") ? "on" : a.value;
                        });
            });
        var vb = /^(?:focusinfocus|focusoutblur)$/;
        oa.extend(oa.event, {
            trigger: function (b, c, d, e) {
                var f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m = [d || ba],
                    n = ja.call(b, "type") ? b.type : b,
                    o = ja.call(b, "namespace") ? b.namespace.split(".") : [];
                if (
                    ((g = h = d = d || ba),
                    3 !== d.nodeType &&
                        8 !== d.nodeType &&
                        !vb.test(n + oa.event.triggered) &&
                        (n.indexOf(".") > -1 && ((o = n.split(".")), (n = o.shift()), o.sort()),
                        (j = n.indexOf(":") < 0 && "on" + n),
                        (b = b[oa.expando] ? b : new oa.Event(n, "object" == typeof b && b)),
                        (b.isTrigger = e ? 2 : 3),
                        (b.namespace = o.join(".")),
                        (b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                        (b.result = void 0),
                        b.target || (b.target = d),
                        (c = null == c ? [b] : oa.makeArray(c, [b])),
                        (l = oa.event.special[n] || {}),
                        e || !l.trigger || !1 !== l.trigger.apply(d, c)))
                ) {
                    if (!e && !l.noBubble && !oa.isWindow(d)) {
                        for (i = l.delegateType || n, vb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), (h = g);
                        h === (d.ownerDocument || ba) && m.push(h.defaultView || h.parentWindow || a);
                    }
                    for (f = 0; (g = m[f++]) && !b.isPropagationStopped(); )
                        (b.type = f > 1 ? i : l.bindType || n),
                            (k = (Ia.get(g, "events") || {})[b.type] && Ia.get(g, "handle")),
                            k && k.apply(g, c),
                            (k = j && g[j]) && k.apply && Ha(g) && ((b.result = k.apply(g, c)), !1 === b.result && b.preventDefault());
                    return (
                        (b.type = n),
                        e ||
                            b.isDefaultPrevented() ||
                            (l._default && !1 !== l._default.apply(m.pop(), c)) ||
                            !Ha(d) ||
                            (j && oa.isFunction(d[n]) && !oa.isWindow(d) && ((h = d[j]), h && (d[j] = null), (oa.event.triggered = n), d[n](), (oa.event.triggered = void 0), h && (d[j] = h))),
                        b.result
                    );
                }
            },
            simulate: function (a, b, c) {
                var d = oa.extend(new oa.Event(), c, { type: a, isSimulated: !0 });
                oa.event.trigger(d, null, b);
            },
        }),
            oa.fn.extend({
                trigger: function (a, b) {
                    return this.each(function () {
                        oa.event.trigger(a, b, this);
                    });
                },
                triggerHandler: function (a, b) {
                    var c = this[0];
                    if (c) return oa.event.trigger(a, b, c, !0);
                },
            }),
            oa.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
                oa.fn[b] = function (a, c) {
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
                };
            }),
            oa.fn.extend({
                hover: function (a, b) {
                    return this.mouseenter(a).mouseleave(b || a);
                },
            }),
            (ma.focusin = "onfocusin" in a),
            ma.focusin ||
                oa.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
                    var c = function (a) {
                        oa.event.simulate(b, a.target, oa.event.fix(a));
                    };
                    oa.event.special[b] = {
                        setup: function () {
                            var d = this.ownerDocument || this,
                                e = Ia.access(d, b);
                            e || d.addEventListener(a, c, !0), Ia.access(d, b, (e || 0) + 1);
                        },
                        teardown: function () {
                            var d = this.ownerDocument || this,
                                e = Ia.access(d, b) - 1;
                            e ? Ia.access(d, b, e) : (d.removeEventListener(a, c, !0), Ia.remove(d, b));
                        },
                    };
                });
        var wb = a.location,
            xb = oa.now(),
            yb = /\?/;
        oa.parseXML = function (b) {
            var c;
            if (!b || "string" != typeof b) return null;
            try {
                c = new a.DOMParser().parseFromString(b, "text/xml");
            } catch (a) {
                c = void 0;
            }
            return (c && !c.getElementsByTagName("parsererror").length) || oa.error("Invalid XML: " + b), c;
        };
        var zb = /\[\]$/,
            Ab = /\r?\n/g,
            Bb = /^(?:submit|button|image|reset|file)$/i,
            Cb = /^(?:input|select|textarea|keygen)/i;
        (oa.param = function (a, b) {
            var c,
                d = [],
                e = function (a, b) {
                    var c = oa.isFunction(b) ? b() : b;
                    d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
                };
            if (oa.isArray(a) || (a.jquery && !oa.isPlainObject(a)))
                oa.each(a, function () {
                    e(this.name, this.value);
                });
            else for (c in a) V(c, a[c], b, e);
            return d.join("&");
        }),
            oa.fn.extend({
                serialize: function () {
                    return oa.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var a = oa.prop(this, "elements");
                        return a ? oa.makeArray(a) : this;
                    })
                        .filter(function () {
                            var a = this.type;
                            return this.name && !oa(this).is(":disabled") && Cb.test(this.nodeName) && !Bb.test(a) && (this.checked || !Sa.test(a));
                        })
                        .map(function (a, b) {
                            var c = oa(this).val();
                            return null == c
                                ? null
                                : oa.isArray(c)
                                ? oa.map(c, function (a) {
                                      return { name: b.name, value: a.replace(Ab, "\r\n") };
                                  })
                                : { name: b.name, value: c.replace(Ab, "\r\n") };
                        })
                        .get();
                },
            });
        var Db = /%20/g,
            Eb = /#.*$/,
            Fb = /([?&])_=[^&]*/,
            Gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Ib = /^(?:GET|HEAD)$/,
            Jb = /^\/\//,
            Kb = {},
            Lb = {},
            Mb = "*/".concat("*"),
            Nb = ba.createElement("a");
        (Nb.href = wb.href),
            oa.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: wb.href,
                    type: "GET",
                    isLocal: Hb.test(wb.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: { "*": Mb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                    contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                    responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                    converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": oa.parseXML },
                    flatOptions: { url: !0, context: !0 },
                },
                ajaxSetup: function (a, b) {
                    return b ? Y(Y(a, oa.ajaxSettings), b) : Y(oa.ajaxSettings, a);
                },
                ajaxPrefilter: W(Kb),
                ajaxTransport: W(Lb),
                ajax: function (b, c) {
                    function d(b, c, d, h) {
                        var j,
                            m,
                            n,
                            u,
                            v,
                            w = c;
                        k ||
                            ((k = !0),
                            i && a.clearTimeout(i),
                            (e = void 0),
                            (g = h || ""),
                            (x.readyState = b > 0 ? 4 : 0),
                            (j = (b >= 200 && b < 300) || 304 === b),
                            d && (u = Z(o, x, d)),
                            (u = $(o, u, x, j)),
                            j
                                ? (o.ifModified && ((v = x.getResponseHeader("Last-Modified")), v && (oa.lastModified[f] = v), (v = x.getResponseHeader("etag")) && (oa.etag[f] = v)),
                                  204 === b || "HEAD" === o.type ? (w = "nocontent") : 304 === b ? (w = "notmodified") : ((w = u.state), (m = u.data), (n = u.error), (j = !n)))
                                : ((n = w), (!b && w) || ((w = "error"), b < 0 && (b = 0))),
                            (x.status = b),
                            (x.statusText = (c || w) + ""),
                            j ? r.resolveWith(p, [m, w, x]) : r.rejectWith(p, [x, w, n]),
                            x.statusCode(t),
                            (t = void 0),
                            l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [x, o, j ? m : n]),
                            s.fireWith(p, [x, w]),
                            l && (q.trigger("ajaxComplete", [x, o]), --oa.active || oa.event.trigger("ajaxStop")));
                    }
                    "object" == typeof b && ((c = b), (b = void 0)), (c = c || {});
                    var e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o = oa.ajaxSetup({}, c),
                        p = o.context || o,
                        q = o.context && (p.nodeType || p.jquery) ? oa(p) : oa.event,
                        r = oa.Deferred(),
                        s = oa.Callbacks("once memory"),
                        t = o.statusCode || {},
                        u = {},
                        v = {},
                        w = "canceled",
                        x = {
                            readyState: 0,
                            getResponseHeader: function (a) {
                                var b;
                                if (k) {
                                    if (!h) for (h = {}; (b = Gb.exec(g)); ) h[b[1].toLowerCase()] = b[2];
                                    b = h[a.toLowerCase()];
                                }
                                return null == b ? null : b;
                            },
                            getAllResponseHeaders: function () {
                                return k ? g : null;
                            },
                            setRequestHeader: function (a, b) {
                                return null == k && ((a = v[a.toLowerCase()] = v[a.toLowerCase()] || a), (u[a] = b)), this;
                            },
                            overrideMimeType: function (a) {
                                return null == k && (o.mimeType = a), this;
                            },
                            statusCode: function (a) {
                                var b;
                                if (a)
                                    if (k) x.always(a[x.status]);
                                    else for (b in a) t[b] = [t[b], a[b]];
                                return this;
                            },
                            abort: function (a) {
                                var b = a || w;
                                return e && e.abort(b), d(0, b), this;
                            },
                        };
                    if (
                        (r.promise(x),
                        (o.url = ((b || o.url || wb.href) + "").replace(Jb, wb.protocol + "//")),
                        (o.type = c.method || c.type || o.method || o.type),
                        (o.dataTypes = (o.dataType || "*").toLowerCase().match(Da) || [""]),
                        null == o.crossDomain)
                    ) {
                        j = ba.createElement("a");
                        try {
                            (j.href = o.url), (j.href = j.href), (o.crossDomain = Nb.protocol + "//" + Nb.host != j.protocol + "//" + j.host);
                        } catch (a) {
                            o.crossDomain = !0;
                        }
                    }
                    if ((o.data && o.processData && "string" != typeof o.data && (o.data = oa.param(o.data, o.traditional)), X(Kb, o, c, x), k)) return x;
                    (l = oa.event && o.global),
                        l && 0 == oa.active++ && oa.event.trigger("ajaxStart"),
                        (o.type = o.type.toUpperCase()),
                        (o.hasContent = !Ib.test(o.type)),
                        (f = o.url.replace(Eb, "")),
                        o.hasContent
                            ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Db, "+"))
                            : ((n = o.url.slice(f.length)),
                              o.data && ((f += (yb.test(f) ? "&" : "?") + o.data), delete o.data),
                              !1 === o.cache && ((f = f.replace(Fb, "$1")), (n = (yb.test(f) ? "&" : "?") + "_=" + xb++ + n)),
                              (o.url = f + n)),
                        o.ifModified && (oa.lastModified[f] && x.setRequestHeader("If-Modified-Since", oa.lastModified[f]), oa.etag[f] && x.setRequestHeader("If-None-Match", oa.etag[f])),
                        ((o.data && o.hasContent && !1 !== o.contentType) || c.contentType) && x.setRequestHeader("Content-Type", o.contentType),
                        x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Mb + "; q=0.01" : "") : o.accepts["*"]);
                    for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
                    if (o.beforeSend && (!1 === o.beforeSend.call(p, x, o) || k)) return x.abort();
                    if (((w = "abort"), s.add(o.complete), x.done(o.success), x.fail(o.error), (e = X(Lb, o, c, x)))) {
                        if (((x.readyState = 1), l && q.trigger("ajaxSend", [x, o]), k)) return x;
                        o.async &&
                            o.timeout > 0 &&
                            (i = a.setTimeout(function () {
                                x.abort("timeout");
                            }, o.timeout));
                        try {
                            (k = !1), e.send(u, d);
                        } catch (a) {
                            if (k) throw a;
                            d(-1, a);
                        }
                    } else d(-1, "No Transport");
                    return x;
                },
                getJSON: function (a, b, c) {
                    return oa.get(a, b, c, "json");
                },
                getScript: function (a, b) {
                    return oa.get(a, void 0, b, "script");
                },
            }),
            oa.each(["get", "post"], function (a, b) {
                oa[b] = function (a, c, d, e) {
                    return oa.isFunction(c) && ((e = e || d), (d = c), (c = void 0)), oa.ajax(oa.extend({ url: a, type: b, dataType: e, data: c, success: d }, oa.isPlainObject(a) && a));
                };
            }),
            (oa._evalUrl = function (a) {
                return oa.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0 });
            }),
            oa.fn.extend({
                wrapAll: function (a) {
                    var b;
                    return (
                        this[0] &&
                            (oa.isFunction(a) && (a = a.call(this[0])),
                            (b = oa(a, this[0].ownerDocument).eq(0).clone(!0)),
                            this[0].parentNode && b.insertBefore(this[0]),
                            b
                                .map(function () {
                                    for (var a = this; a.firstElementChild; ) a = a.firstElementChild;
                                    return a;
                                })
                                .append(this)),
                        this
                    );
                },
                wrapInner: function (a) {
                    return oa.isFunction(a)
                        ? this.each(function (b) {
                              oa(this).wrapInner(a.call(this, b));
                          })
                        : this.each(function () {
                              var b = oa(this),
                                  c = b.contents();
                              c.length ? c.wrapAll(a) : b.append(a);
                          });
                },
                wrap: function (a) {
                    var b = oa.isFunction(a);
                    return this.each(function (c) {
                        oa(this).wrapAll(b ? a.call(this, c) : a);
                    });
                },
                unwrap: function (a) {
                    return (
                        this.parent(a)
                            .not("body")
                            .each(function () {
                                oa(this).replaceWith(this.childNodes);
                            }),
                        this
                    );
                },
            }),
            (oa.expr.pseudos.hidden = function (a) {
                return !oa.expr.pseudos.visible(a);
            }),
            (oa.expr.pseudos.visible = function (a) {
                return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
            }),
            (oa.ajaxSettings.xhr = function () {
                try {
                    return new a.XMLHttpRequest();
                } catch (a) {}
            });
        var Ob = { 0: 200, 1223: 204 },
            Pb = oa.ajaxSettings.xhr();
        (ma.cors = !!Pb && "withCredentials" in Pb),
            (ma.ajax = Pb = !!Pb),
            oa.ajaxTransport(function (b) {
                var c, d;
                if (ma.cors || (Pb && !b.crossDomain))
                    return {
                        send: function (e, f) {
                            var g,
                                h = b.xhr();
                            if ((h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)) for (g in b.xhrFields) h[g] = b.xhrFields[g];
                            b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                            for (g in e) h.setRequestHeader(g, e[g]);
                            (c = function (a) {
                                return function () {
                                    c &&
                                        ((c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null),
                                        "abort" === a
                                            ? h.abort()
                                            : "error" === a
                                            ? "number" != typeof h.status
                                                ? f(0, "error")
                                                : f(h.status, h.statusText)
                                            : f(
                                                  Ob[h.status] || h.status,
                                                  h.statusText,
                                                  "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText },
                                                  h.getAllResponseHeaders()
                                              ));
                                };
                            }),
                                (h.onload = c()),
                                (d = h.onerror = c("error")),
                                void 0 !== h.onabort
                                    ? (h.onabort = d)
                                    : (h.onreadystatechange = function () {
                                          4 === h.readyState &&
                                              a.setTimeout(function () {
                                                  c && d();
                                              });
                                      }),
                                (c = c("abort"));
                            try {
                                h.send((b.hasContent && b.data) || null);
                            } catch (a) {
                                if (c) throw a;
                            }
                        },
                        abort: function () {
                            c && c();
                        },
                    };
            }),
            oa.ajaxPrefilter(function (a) {
                a.crossDomain && (a.contents.script = !1);
            }),
            oa.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    "text script": function (a) {
                        return oa.globalEval(a), a;
                    },
                },
            }),
            oa.ajaxPrefilter("script", function (a) {
                void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
            }),
            oa.ajaxTransport("script", function (a) {
                if (a.crossDomain) {
                    var b, c;
                    return {
                        send: function (d, e) {
                            (b = oa("<script>")
                                .prop({ charset: a.scriptCharset, src: a.url })
                                .on(
                                    "load error",
                                    (c = function (a) {
                                        b.remove(), (c = null), a && e("error" === a.type ? 404 : 200, a.type);
                                    })
                                )),
                                ba.head.appendChild(b[0]);
                        },
                        abort: function () {
                            c && c();
                        },
                    };
                }
            });
        var Qb = [],
            Rb = /(=)\?(?=&|$)|\?\?/;
        oa.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var a = Qb.pop() || oa.expando + "_" + xb++;
                return (this[a] = !0), a;
            },
        }),
            oa.ajaxPrefilter("json jsonp", function (b, c, d) {
                var e,
                    f,
                    g,
                    h = !1 !== b.jsonp && (Rb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Rb.test(b.data) && "data");
                if (h || "jsonp" === b.dataTypes[0])
                    return (
                        (e = b.jsonpCallback = oa.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback),
                        h ? (b[h] = b[h].replace(Rb, "$1" + e)) : !1 !== b.jsonp && (b.url += (yb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                        (b.converters["script json"] = function () {
                            return g || oa.error(e + " was not called"), g[0];
                        }),
                        (b.dataTypes[0] = "json"),
                        (f = a[e]),
                        (a[e] = function () {
                            g = arguments;
                        }),
                        d.always(function () {
                            void 0 === f ? oa(a).removeProp(e) : (a[e] = f), b[e] && ((b.jsonpCallback = c.jsonpCallback), Qb.push(e)), g && oa.isFunction(f) && f(g[0]), (g = f = void 0);
                        }),
                        "script"
                    );
            }),
            (ma.createHTMLDocument = (function () {
                var a = ba.implementation.createHTMLDocument("").body;
                return (a.innerHTML = "<form></form><form></form>"), 2 === a.childNodes.length;
            })()),
            (oa.parseHTML = function (a, b, c) {
                if ("string" != typeof a) return [];
                "boolean" == typeof b && ((c = b), (b = !1));
                var d, e, f;
                return (
                    b || (ma.createHTMLDocument ? ((b = ba.implementation.createHTMLDocument("")), (d = b.createElement("base")), (d.href = ba.location.href), b.head.appendChild(d)) : (b = ba)),
                    (e = xa.exec(a)),
                    (f = !c && []),
                    e ? [b.createElement(e[1])] : ((e = t([a], b, f)), f && f.length && oa(f).remove(), oa.merge([], e.childNodes))
                );
            }),
            (oa.fn.load = function (a, b, c) {
                var d,
                    e,
                    f,
                    g = this,
                    h = a.indexOf(" ");
                return (
                    h > -1 && ((d = T(a.slice(h))), (a = a.slice(0, h))),
                    oa.isFunction(b) ? ((c = b), (b = void 0)) : b && "object" == typeof b && (e = "POST"),
                    g.length > 0 &&
                        oa
                            .ajax({ url: a, type: e || "GET", dataType: "html", data: b })
                            .done(function (a) {
                                (f = arguments), g.html(d ? oa("<div>").append(oa.parseHTML(a)).find(d) : a);
                            })
                            .always(
                                c &&
                                    function (a, b) {
                                        g.each(function () {
                                            c.apply(this, f || [a.responseText, b, a]);
                                        });
                                    }
                            ),
                    this
                );
            }),
            oa.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
                oa.fn[b] = function (a) {
                    return this.on(b, a);
                };
            }),
            (oa.expr.pseudos.animated = function (a) {
                return oa.grep(oa.timers, function (b) {
                    return a === b.elem;
                }).length;
            }),
            (oa.offset = {
                setOffset: function (a, b, c) {
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k = oa.css(a, "position"),
                        l = oa(a),
                        m = {};
                    "static" === k && (a.style.position = "relative"),
                        (h = l.offset()),
                        (f = oa.css(a, "top")),
                        (i = oa.css(a, "left")),
                        (j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1),
                        j ? ((d = l.position()), (g = d.top), (e = d.left)) : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
                        oa.isFunction(b) && (b = b.call(a, c, oa.extend({}, h))),
                        null != b.top && (m.top = b.top - h.top + g),
                        null != b.left && (m.left = b.left - h.left + e),
                        "using" in b ? b.using.call(a, m) : l.css(m);
                },
            }),
            oa.fn.extend({
                offset: function (a) {
                    if (arguments.length)
                        return void 0 === a
                            ? this
                            : this.each(function (b) {
                                  oa.offset.setOffset(this, a, b);
                              });
                    var b,
                        c,
                        d,
                        e,
                        f = this[0];
                    return f
                        ? f.getClientRects().length
                            ? ((d = f.getBoundingClientRect()),
                              d.width || d.height ? ((e = f.ownerDocument), (c = _(e)), (b = e.documentElement), { top: d.top + c.pageYOffset - b.clientTop, left: d.left + c.pageXOffset - b.clientLeft }) : d)
                            : { top: 0, left: 0 }
                        : void 0;
                },
                position: function () {
                    if (this[0]) {
                        var a,
                            b,
                            c = this[0],
                            d = { top: 0, left: 0 };
                        return (
                            "fixed" === oa.css(c, "position")
                                ? (b = c.getBoundingClientRect())
                                : ((a = this.offsetParent()),
                                  (b = this.offset()),
                                  oa.nodeName(a[0], "html") || (d = a.offset()),
                                  (d = { top: d.top + oa.css(a[0], "borderTopWidth", !0), left: d.left + oa.css(a[0], "borderLeftWidth", !0) })),
                            { top: b.top - d.top - oa.css(c, "marginTop", !0), left: b.left - d.left - oa.css(c, "marginLeft", !0) }
                        );
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var a = this.offsetParent; a && "static" === oa.css(a, "position"); ) a = a.offsetParent;
                        return a || Xa;
                    });
                },
            }),
            oa.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
                var c = "pageYOffset" === b;
                oa.fn[a] = function (d) {
                    return Ga(
                        this,
                        function (a, d, e) {
                            var f = _(a);
                            return void 0 === e ? (f ? f[b] : a[d]) : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : (a[d] = e));
                        },
                        a,
                        d,
                        arguments.length
                    );
                };
            }),
            oa.each(["top", "left"], function (a, b) {
                oa.cssHooks[b] = G(ma.pixelPosition, function (a, c) {
                    if (c) return (c = F(a, b)), fb.test(c) ? oa(a).position()[b] + "px" : c;
                });
            }),
            oa.each({ Height: "height", Width: "width" }, function (a, b) {
                oa.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
                    oa.fn[d] = function (e, f) {
                        var g = arguments.length && (c || "boolean" != typeof e),
                            h = c || (!0 === e || !0 === f ? "margin" : "border");
                        return Ga(
                            this,
                            function (b, c, e) {
                                var f;
                                return oa.isWindow(b)
                                    ? 0 === d.indexOf("outer")
                                        ? b["inner" + a]
                                        : b.document.documentElement["client" + a]
                                    : 9 === b.nodeType
                                    ? ((f = b.documentElement), Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a]))
                                    : void 0 === e
                                    ? oa.css(b, c, h)
                                    : oa.style(b, c, e, h);
                            },
                            b,
                            g ? e : void 0,
                            g
                        );
                    };
                });
            }),
            oa.fn.extend({
                bind: function (a, b, c) {
                    return this.on(a, null, b, c);
                },
                unbind: function (a, b) {
                    return this.off(a, null, b);
                },
                delegate: function (a, b, c, d) {
                    return this.on(b, a, c, d);
                },
                undelegate: function (a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
                },
            }),
            (oa.parseJSON = JSON.parse),
            "function" == typeof define &&
                define.amd &&
                define("jquery", [], function () {
                    return oa;
                });
        var Sb = a.jQuery,
            Tb = a.$;
        return (
            (oa.noConflict = function (b) {
                return a.$ === oa && (a.$ = Tb), b && a.jQuery === oa && (a.jQuery = Sb), oa;
            }),
            b || (a.jQuery = a.$ = oa),
            oa
        );
    }),
    (function (a, b) {
        "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? (module.exports = b()) : (a.Blazy = b());
    })(this, function () {
        function a(a) {
            var c = a._util;
            (c.elements = i(a.options)),
                (c.count = c.elements.length),
                c.destroyed &&
                    ((c.destroyed = !1),
                    a.options.container &&
                        m(a.options.container, function (a) {
                            k(a, "scroll", c.validateT);
                        }),
                    k(window, "resize", c.saveViewportOffsetT),
                    k(window, "resize", c.validateT),
                    k(window, "scroll", c.validateT)),
                b(a);
        }
        function b(a) {
            for (var b = a._util, d = 0; d < b.count; d++) {
                var e,
                    f = b.elements[d],
                    h = f;
                e = a.options;
                var i = h.getBoundingClientRect();
                e.container && r && (h = h.closest(e.containerClass))
                    ? ((h = h.getBoundingClientRect()), (e = !!c(h, p) && c(i, { top: h.top - e.offset, right: h.right + e.offset, bottom: h.bottom + e.offset, left: h.left - e.offset })))
                    : (e = c(i, p)),
                    (e || g(f, a.options.successClass)) && (a.load(f), b.elements.splice(d, 1), b.count--, d--);
            }
            0 === b.count && a.destroy();
        }
        function c(a, b) {
            return a.right >= b.left && a.bottom >= b.top && a.left <= b.right && a.top <= b.bottom;
        }
        function d(a, b, c) {
            if (!g(a, c.successClass) && (b || c.loadInvisible || (0 < a.offsetWidth && 0 < a.offsetHeight)))
                if ((b = a.getAttribute(o) || a.getAttribute(c.src))) {
                    b = b.split(c.separator);
                    var d = b[q && 1 < b.length ? 1 : 0],
                        i = a.getAttribute(c.srcset),
                        j = "img" === a.nodeName.toLowerCase(),
                        n = (b = a.parentNode) && "picture" === b.nodeName.toLowerCase();
                    if (j || void 0 === a.src) {
                        var p = new Image(),
                            r = function () {
                                c.error && c.error(a, "invalid"), h(a, c.errorClass), l(p, "error", r), l(p, "load", s);
                            },
                            s = function () {
                                j ? n || f(a, d, i) : (a.style.backgroundImage = 'url("' + d + '")'), e(a, c), l(p, "load", s), l(p, "error", r);
                            };
                        n &&
                            ((p = a),
                            m(b.getElementsByTagName("source"), function (a) {
                                var b = c.srcset,
                                    d = a.getAttribute(b);
                                d && (a.setAttribute("srcset", d), a.removeAttribute(b));
                            })),
                            k(p, "error", r),
                            k(p, "load", s),
                            f(p, d, i);
                    } else (a.src = d), e(a, c);
                } else
                    "video" === a.nodeName.toLowerCase()
                        ? (m(a.getElementsByTagName("source"), function (a) {
                              var b = c.src,
                                  d = a.getAttribute(b);
                              d && (a.setAttribute("src", d), a.removeAttribute(b));
                          }),
                          a.load(),
                          e(a, c))
                        : (c.error && c.error(a, "missing"), h(a, c.errorClass));
        }
        function e(a, b) {
            h(a, b.successClass),
                b.success && b.success(a),
                a.removeAttribute(b.src),
                a.removeAttribute(b.srcset),
                m(b.breakpoints, function (b) {
                    a.removeAttribute(b.src);
                });
        }
        function f(a, b, c) {
            c && a.setAttribute("srcset", c), (a.src = b);
        }
        function g(a, b) {
            return -1 !== (" " + a.className + " ").indexOf(" " + b + " ");
        }
        function h(a, b) {
            g(a, b) || (a.className += " " + b);
        }
        function i(a) {
            var b = [];
            a = a.root.querySelectorAll(a.selector);
            for (var c = a.length; c--; b.unshift(a[c]));
            return b;
        }
        function j(a) {
            (p.bottom = (window.innerHeight || document.documentElement.clientHeight) + a), (p.right = (window.innerWidth || document.documentElement.clientWidth) + a);
        }
        function k(a, b, c) {
            a.attachEvent ? a.attachEvent && a.attachEvent("on" + b, c) : a.addEventListener(b, c, { capture: !1, passive: !0 });
        }
        function l(a, b, c) {
            a.detachEvent ? a.detachEvent && a.detachEvent("on" + b, c) : a.removeEventListener(b, c, { capture: !1, passive: !0 });
        }
        function m(a, b) {
            if (a && b) for (var c = a.length, d = 0; d < c && !1 !== b(a[d], d); d++);
        }
        function n(a, b, c) {
            var d = 0;
            return function () {
                var e = +new Date();
                e - d < b || ((d = e), a.apply(c, arguments));
            };
        }
        var o, p, q, r;
        return function (c) {
            if (!document.querySelectorAll) {
                var e = document.createStyleSheet();
                document.querySelectorAll = function (a, b, c, d, f) {
                    for (f = document.all, b = [], a = a.replace(/\[for\b/gi, "[htmlFor").split(","), c = a.length; c--; ) {
                        for (e.addRule(a[c], "k:v"), d = f.length; d--; ) f[d].currentStyle.k && b.push(f[d]);
                        e.removeRule(0);
                    }
                    return b;
                };
            }
            var f = this,
                g = (f._util = {});
            (g.elements = []),
                (g.destroyed = !0),
                (f.options = c || {}),
                (f.options.error = f.options.error || !1),
                (f.options.offset = f.options.offset || 100),
                (f.options.root = f.options.root || document),
                (f.options.success = f.options.success || !1),
                (f.options.selector = f.options.selector || ".b-lazy"),
                (f.options.separator = f.options.separator || "|"),
                (f.options.containerClass = f.options.container),
                (f.options.container = !!f.options.containerClass && document.querySelectorAll(f.options.containerClass)),
                (f.options.errorClass = f.options.errorClass || "b-error"),
                (f.options.breakpoints = f.options.breakpoints || !1),
                (f.options.loadInvisible = f.options.loadInvisible || !1),
                (f.options.successClass = f.options.successClass || "b-loaded"),
                (f.options.validateDelay = f.options.validateDelay || 25),
                (f.options.saveViewportOffsetDelay = f.options.saveViewportOffsetDelay || 50),
                (f.options.srcset = f.options.srcset || "data-srcset"),
                (f.options.src = o = f.options.src || "data-src"),
                (r = Element.prototype.closest),
                (q = 1 < window.devicePixelRatio),
                (p = {}),
                (p.top = 0 - f.options.offset),
                (p.left = 0 - f.options.offset),
                (f.revalidate = function () {
                    a(f);
                }),
                (f.load = function (a, b) {
                    var c = this.options;
                    void 0 === a.length
                        ? d(a, b, c)
                        : m(a, function (a) {
                              d(a, b, c);
                          });
                }),
                (f.destroy = function () {
                    var a = this._util;
                    this.options.container &&
                        m(this.options.container, function (b) {
                            l(b, "scroll", a.validateT);
                        }),
                        l(window, "scroll", a.validateT),
                        l(window, "resize", a.validateT),
                        l(window, "resize", a.saveViewportOffsetT),
                        (a.count = 0),
                        (a.elements.length = 0),
                        (a.destroyed = !0);
                }),
                (g.validateT = n(
                    function () {
                        b(f);
                    },
                    f.options.validateDelay,
                    f
                )),
                (g.saveViewportOffsetT = n(
                    function () {
                        j(f.options.offset);
                    },
                    f.options.saveViewportOffsetDelay,
                    f
                )),
                j(f.options.offset),
                m(f.options.breakpoints, function (a) {
                    if (a.width >= window.screen.width) return (o = a.src), !1;
                }),
                setTimeout(function () {
                    a(f);
                });
        };
    }),
    (function (a) {
        "use strict";
        var b = {
            init: function (c) {
                var d = this;
                return (
                    (d.data("jqv") && null != d.data("jqv")) ||
                        ((c = b._saveOptions(d, c)),
                        a(document).on("click", ".formError", function () {
                            a(this).fadeOut(150, function () {
                                a(this).parent(".formErrorOuter").remove(), a(this).remove();
                            });
                        })),
                    this
                );
            },
            attach: function (c) {
                var d,
                    e = this;
                return (
                    (d = c ? b._saveOptions(e, c) : e.data("jqv")),
                    (d.validateAttribute = e.find("[data-validation-engine*=validate]").length ? "data-validation-engine" : "class"),
                    d.binded &&
                        (e.on(d.validationEventTrigger, "[" + d.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", b._onFieldEvent),
                        e.on("click", "[" + d.validateAttribute + "*=validate][type=checkbox],[" + d.validateAttribute + "*=validate][type=radio]", b._onFieldEvent),
                        e.on(d.validationEventTrigger, "[" + d.validateAttribute + "*=validate][class*=datepicker]", { delay: 300 }, b._onFieldEvent)),
                    d.autoPositionUpdate && a(window).bind("resize", { noAnimation: !0, formElem: e }, b.updatePromptsPosition),
                    e.on(
                        "click",
                        "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']",
                        b._submitButtonClick
                    ),
                    e.removeData("jqv_submitButton"),
                    e.on("submit", b._onSubmitEvent),
                    this
                );
            },
            detach: function () {
                var c = this,
                    d = c.data("jqv");
                return (
                    c
                        .find("[" + d.validateAttribute + "*=validate]")
                        .not("[type=checkbox]")
                        .off(d.validationEventTrigger, b._onFieldEvent),
                    c.find("[" + d.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", b._onFieldEvent),
                    c.off("submit", b._onSubmitEvent),
                    c.removeData("jqv"),
                    c.off(
                        "click",
                        "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']",
                        b._submitButtonClick
                    ),
                    c.removeData("jqv_submitButton"),
                    d.autoPositionUpdate && a(window).off("resize", b.updatePromptsPosition),
                    this
                );
            },
            validate: function () {
                var c = a(this),
                    d = null;
                if (c.is("form") || c.hasClass("validationEngineContainer")) {
                    if (c.hasClass("validating")) return !1;
                    c.addClass("validating");
                    var e = c.data("jqv"),
                        d = b._validateFields(this);
                    setTimeout(function () {
                        c.removeClass("validating");
                    }, 100),
                        d && e.onSuccess ? e.onSuccess() : !d && e.onFailure && e.onFailure();
                } else {
                    if (!c.is("form") && !c.hasClass("validationEngineContainer")) {
                        var f = c.closest("form, .validationEngineContainer"),
                            e = f.data("jqv") ? f.data("jqv") : a.validationEngine.defaults,
                            d = b._validateField(c, e);
                        return d && e.onFieldSuccess ? e.onFieldSuccess() : e.onFieldFailure && e.InvalidFields.length > 0 && e.onFieldFailure(), d;
                    }
                    c.removeClass("validating");
                }
                return e.onValidationComplete ? !!e.onValidationComplete(f, d) : d;
            },
            updatePromptsPosition: function (c) {
                if (c && this == window)
                    var d = c.data.formElem,
                        e = c.data.noAnimation;
                else var d = a(this.closest("form, .validationEngineContainer"));
                var f = d.data("jqv");
                return (
                    d
                        .find("[" + f.validateAttribute + "*=validate]")
                        .not(":disabled")
                        .each(function () {
                            var c = a(this);
                            f.prettySelect && c.is(":hidden") && (c = d.find("#" + f.usePrefix + c.attr("id") + f.useSuffix));
                            var g = b._getPrompt(c),
                                h = a(g).find(".formErrorContent").html();
                            g && b._updatePrompt(c, a(g), h, void 0, !1, f, e);
                        }),
                    this
                );
            },
            showPrompt: function (a, c, d, e) {
                var f = this.closest("form, .validationEngineContainer"),
                    g = f.data("jqv");
                return g || (g = b._saveOptions(this, g)), d && (g.promptPosition = d), (g.showArrow = 1 == e), b._showPrompt(this, a, c, !1, g), this;
            },
            hide: function () {
                var c,
                    d = a(this).closest("form, .validationEngineContainer"),
                    e = d.data("jqv"),
                    f = e && e.fadeDuration ? e.fadeDuration : 0.3;
                return (
                    (c = a(this).is("form") || a(this).hasClass("validationEngineContainer") ? "parentForm" + b._getClassName(a(this).attr("id")) : b._getClassName(a(this).attr("id")) + "formError"),
                    a("." + c).fadeTo(f, 0.3, function () {
                        a(this).parent(".formErrorOuter").remove(), a(this).remove();
                    }),
                    this
                );
            },
            hideAll: function () {
                var b = this,
                    c = b.data("jqv"),
                    d = c ? c.fadeDuration : 300;
                return (
                    a(".formError").fadeTo(d, 300, function () {
                        a(this).parent(".formErrorOuter").remove(), a(this).remove();
                    }),
                    this
                );
            },
            _onFieldEvent: function (c) {
                var d = a(this),
                    e = d.closest("form, .validationEngineContainer"),
                    f = e.data("jqv");
                (f.eventTrigger = "field"),
                    window.setTimeout(
                        function () {
                            b._validateField(d, f), 0 == f.InvalidFields.length && f.onFieldSuccess ? f.onFieldSuccess() : f.InvalidFields.length > 0 && f.onFieldFailure && f.onFieldFailure();
                        },
                        c.data ? c.data.delay : 0
                    );
            },
            _onSubmitEvent: function () {
                var c = a(this),
                    d = c.data("jqv");
                if (c.data("jqv_submitButton")) {
                    var e = a("#" + c.data("jqv_submitButton"));
                    if (e && e.length > 0 && (e.hasClass("validate-skip") || "true" == e.attr("data-validation-engine-skip"))) return !0;
                }
                d.eventTrigger = "submit";
                var f = b._validateFields(c);
                return f && d.ajaxFormValidation ? (b._validateFormWithAjax(c, d), !1) : d.onValidationComplete ? !!d.onValidationComplete(c, f) : f;
            },
            _checkAjaxStatus: function (b) {
                var c = !0;
                return (
                    a.each(b.ajaxValidCache, function (a, b) {
                        return b ? void 0 : ((c = !1), !1);
                    }),
                    c
                );
            },
            _checkAjaxFieldStatus: function (a, b) {
                return 1 == b.ajaxValidCache[a];
            },
            _validateFields: function (c) {
                var d = c.data("jqv"),
                    e = !1;
                c.trigger("jqv.form.validating");
                var f = null;
                if (
                    (c
                        .find("[" + d.validateAttribute + "*=validate]")
                        .not(":disabled")
                        .each(function () {
                            var g = a(this),
                                h = [];
                            if (a.inArray(g.attr("name"), h) < 0) {
                                if (
                                    ((e |= b._validateField(g, d)),
                                    e &&
                                        null == f &&
                                        (g.is(":hidden") && d.prettySelect
                                            ? (f = g = c.find("#" + d.usePrefix + b._jqSelector(g.attr("id")) + d.useSuffix))
                                            : (g.data("jqv-prompt-at") instanceof jQuery ? (g = g.data("jqv-prompt-at")) : g.data("jqv-prompt-at") && (g = a(g.data("jqv-prompt-at"))), (f = g))),
                                    d.doNotShowAllErrosOnSubmit)
                                )
                                    return !1;
                                if ((h.push(g.attr("name")), 1 == d.showOneMessage && e)) return !1;
                            }
                        }),
                    c.trigger("jqv.form.result", [e]),
                    e)
                ) {
                    if (d.scroll) {
                        var g = f.offset().top,
                            h = f.offset().left,
                            i = d.promptPosition;
                        if (("string" == typeof i && -1 != i.indexOf(":") && (i = i.substring(0, i.indexOf(":"))), "bottomRight" != i && "bottomLeft" != i)) {
                            var j = b._getPrompt(f);
                            j && (g = j.offset().top);
                        }
                        if ((d.scrollOffset && (g -= d.scrollOffset), d.isOverflown)) {
                            var k = a(d.overflownDIV);
                            if (!k.length) return !1;
                            g += k.scrollTop() + -parseInt(k.offset().top) - 5;
                            a(d.overflownDIV + ":not(:animated)").animate({ scrollTop: g }, 1100, function () {
                                d.focusFirstField && f.focus();
                            });
                        } else
                            a("html, body").animate({ scrollTop: g }, 1100, function () {
                                d.focusFirstField && f.focus();
                            }),
                                a("html, body").animate({ scrollLeft: h }, 1100);
                    } else d.focusFirstField && f.focus();
                    return !1;
                }
                return !0;
            },
            _validateFormWithAjax: function (c, d) {
                var e = c.serialize(),
                    f = d.ajaxFormValidationMethod ? d.ajaxFormValidationMethod : "GET",
                    g = d.ajaxFormValidationURL ? d.ajaxFormValidationURL : c.attr("action"),
                    h = d.dataType ? d.dataType : "json";
                a.ajax({
                    type: f,
                    url: g,
                    cache: !1,
                    dataType: h,
                    data: e,
                    form: c,
                    methods: b,
                    options: d,
                    beforeSend: function () {
                        return d.onBeforeAjaxFormValidation(c, d);
                    },
                    error: function (a, c) {
                        b._ajaxError(a, c);
                    },
                    success: function (e) {
                        if ("json" == h && !0 !== e) {
                            for (var f = !1, g = 0; g < e.length; g++) {
                                var i = e[g],
                                    j = i[0],
                                    k = a(a("#" + j)[0]);
                                if (1 == k.length) {
                                    var l = i[2];
                                    if (1 == i[1])
                                        if ("" != l && l) {
                                            if (d.allrules[l]) {
                                                var m = d.allrules[l].alertTextOk;
                                                m && (l = m);
                                            }
                                            d.showPrompts && b._showPrompt(k, l, "pass", !1, d, !0);
                                        } else b._closePrompt(k);
                                    else {
                                        if (((f |= !0), d.allrules[l])) {
                                            var m = d.allrules[l].alertText;
                                            m && (l = m);
                                        }
                                        d.showPrompts && b._showPrompt(k, l, "", !1, d, !0);
                                    }
                                }
                            }
                            d.onAjaxFormComplete(!f, c, e, d);
                        } else d.onAjaxFormComplete(!0, c, e, d);
                    },
                });
            },
            _validateField: function (c, d, e) {
                if (
                    (c.attr("id") || (c.attr("id", "form-validation-field-" + a.validationEngine.fieldIdCounter), ++a.validationEngine.fieldIdCounter),
                    !d.validateNonVisibleFields && ((c.is(":hidden") && !d.prettySelect) || c.parent().is(":hidden")))
                )
                    return !1;
                var f = c.attr(d.validateAttribute),
                    g = /validate\[(.*)\]/.exec(f);
                if (!g) return !1;
                var h = g[1],
                    i = h.split(/\[|,|\]/),
                    j = !1,
                    k = c.attr("name"),
                    l = "",
                    m = "",
                    n = !1,
                    o = !1;
                (d.isError = !1), (d.showArrow = !0), d.maxErrorsPerField > 0 && (o = !0);
                for (var p = a(c.closest("form, .validationEngineContainer")), q = 0; q < i.length; q++) (i[q] = i[q].replace(" ", "")), "" === i[q] && delete i[q];
                for (var q = 0, r = 0; q < i.length; q++) {
                    if (o && r >= d.maxErrorsPerField) {
                        if (!n) {
                            var s = a.inArray("required", i);
                            n = -1 != s && s >= q;
                        }
                        break;
                    }
                    var t = void 0;
                    switch (i[q]) {
                        case "required":
                            (n = !0), (t = b._getErrorMessage(p, c, i[q], i, q, d, b._required));
                            break;
                        case "custom":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._custom);
                            break;
                        case "groupRequired":
                            var u = "[" + d.validateAttribute + "*=" + i[q + 1] + "]",
                                v = p.find(u).eq(0);
                            v[0] != c[0] && (b._validateField(v, d, e), (d.showArrow = !0)), (t = b._getErrorMessage(p, c, i[q], i, q, d, b._groupRequired)), t && (n = !0), (d.showArrow = !1);
                            break;
                        case "ajax":
                            (t = b._ajax(c, i, q, d)) && (m = "load");
                            break;
                        case "minSize":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._minSize);
                            break;
                        case "maxSize":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._maxSize);
                            break;
                        case "min":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._min);
                            break;
                        case "max":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._max);
                            break;
                        case "past":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._past);
                            break;
                        case "future":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._future);
                            break;
                        case "dateRange":
                            var u = "[" + d.validateAttribute + "*=" + i[q + 1] + "]";
                            (d.firstOfGroup = p.find(u).eq(0)),
                                (d.secondOfGroup = p.find(u).eq(1)),
                                (d.firstOfGroup[0].value || d.secondOfGroup[0].value) && (t = b._getErrorMessage(p, c, i[q], i, q, d, b._dateRange)),
                                t && (n = !0),
                                (d.showArrow = !1);
                            break;
                        case "dateTimeRange":
                            var u = "[" + d.validateAttribute + "*=" + i[q + 1] + "]";
                            (d.firstOfGroup = p.find(u).eq(0)),
                                (d.secondOfGroup = p.find(u).eq(1)),
                                (d.firstOfGroup[0].value || d.secondOfGroup[0].value) && (t = b._getErrorMessage(p, c, i[q], i, q, d, b._dateTimeRange)),
                                t && (n = !0),
                                (d.showArrow = !1);
                            break;
                        case "maxCheckbox":
                            (c = a(p.find("input[name='" + k + "']"))), (t = b._getErrorMessage(p, c, i[q], i, q, d, b._maxCheckbox));
                            break;
                        case "minCheckbox":
                            (c = a(p.find("input[name='" + k + "']"))), (t = b._getErrorMessage(p, c, i[q], i, q, d, b._minCheckbox));
                            break;
                        case "equals":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._equals);
                            break;
                        case "funcCall":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._funcCall);
                            break;
                        case "creditCard":
                            t = b._getErrorMessage(p, c, i[q], i, q, d, b._creditCard);
                            break;
                        case "condRequired":
                            void 0 !== (t = b._getErrorMessage(p, c, i[q], i, q, d, b._condRequired)) && (n = !0);
                    }
                    var w = !1;
                    if ("object" == typeof t)
                        switch (t.status) {
                            case "_break":
                                w = !0;
                                break;
                            case "_error":
                                t = t.message;
                                break;
                            case "_error_no_prompt":
                                return !0;
                        }
                    if (w) break;
                    "string" == typeof t && ((l += t + "<br/>"), (d.isError = !0), r++);
                }
                !n && !c.val() && c.val().length < 1 && (d.isError = !1);
                var x = c.prop("type"),
                    y = c.data("promptPosition") || d.promptPosition;
                ("radio" == x || "checkbox" == x) &&
                    p.find("input[name='" + k + "']").size() > 1 &&
                    ((c = a("inline" === y ? p.find("input[name='" + k + "'][type!=hidden]:last") : p.find("input[name='" + k + "'][type!=hidden]:first"))), (d.showArrow = !1)),
                    c.is(":hidden") && d.prettySelect && (c = p.find("#" + d.usePrefix + b._jqSelector(c.attr("id")) + d.useSuffix)),
                    d.isError && d.showPrompts ? b._showPrompt(c, l, m, !1, d) : j || b._closePrompt(c),
                    j || c.trigger("jqv.field.result", [c, d.isError, l]);
                var z = a.inArray(c[0], d.InvalidFields);
                return (
                    -1 == z ? d.isError && d.InvalidFields.push(c[0]) : d.isError || d.InvalidFields.splice(z, 1),
                    b._handleStatusCssClasses(c, d),
                    d.isError && d.onFieldFailure && d.onFieldFailure(c, d.isError, l),
                    !d.isError && d.onFieldSuccess && d.onFieldSuccess(c),
                    d.isError
                );
            },
            _handleStatusCssClasses: function (a, b) {
                b.addSuccessCssClassToField && a.removeClass(b.addSuccessCssClassToField),
                    b.addFailureCssClassToField && a.removeClass(b.addFailureCssClassToField),
                    b.addSuccessCssClassToField && !b.isError && a.addClass(b.addSuccessCssClassToField),
                    b.addFailureCssClassToField && b.isError && a.addClass(b.addFailureCssClassToField);
            },
            _getErrorMessage: function (c, d, e, f, g, h, i) {
                var j = jQuery.inArray(e, f);
                if ("custom" === e || "funcCall" === e) {
                    (e = e + "[" + f[j + 1] + "]"), delete f[j];
                }
                var k,
                    l = e,
                    m = d.attr(d.attr("data-validation-engine") ? "data-validation-engine" : "class"),
                    n = m.split(" ");
                if (void 0 != (k = "future" == e || "past" == e || "maxCheckbox" == e || "minCheckbox" == e ? i(c, d, f, g, h) : i(d, f, g, h))) {
                    var o = b._getCustomErrorMessage(a(d), n, l, h);
                    o && (k = o);
                }
                return k;
            },
            _getCustomErrorMessage: function (a, c, d, e) {
                var f = !1,
                    g = /^custom\[.*\]$/.test(d) ? b._validityProp.custom : b._validityProp[d];
                if (void 0 != g && void 0 != (f = a.attr("data-errormessage-" + g))) return f;
                if (void 0 != (f = a.attr("data-errormessage"))) return f;
                var h = "#" + a.attr("id");
                if (void 0 !== e.custom_error_messages[h] && void 0 !== e.custom_error_messages[h][d]) f = e.custom_error_messages[h][d].message;
                else if (c.length > 0)
                    for (var i = 0; i < c.length && c.length > 0; i++) {
                        var j = "." + c[i];
                        if (void 0 !== e.custom_error_messages[j] && void 0 !== e.custom_error_messages[j][d]) {
                            f = e.custom_error_messages[j][d].message;
                            break;
                        }
                    }
                return f || void 0 === e.custom_error_messages[d] || void 0 === e.custom_error_messages[d].message || (f = e.custom_error_messages[d].message), f;
            },
            _validityProp: {
                required: "value-missing",
                custom: "custom-error",
                groupRequired: "value-missing",
                ajax: "custom-error",
                minSize: "range-underflow",
                maxSize: "range-overflow",
                min: "range-underflow",
                max: "range-overflow",
                past: "type-mismatch",
                future: "type-mismatch",
                dateRange: "type-mismatch",
                dateTimeRange: "type-mismatch",
                maxCheckbox: "range-overflow",
                minCheckbox: "range-underflow",
                equals: "pattern-mismatch",
                funcCall: "custom-error",
                creditCard: "pattern-mismatch",
                condRequired: "value-missing",
            },
            _required: function (b, c, d, e, f) {
                switch (b.prop("type")) {
                    case "text":
                    case "password":
                    case "textarea":
                    case "file":
                    case "select-one":
                    case "select-multiple":
                    default:
                        var g = a.trim(b.val()),
                            h = a.trim(b.attr("data-validation-placeholder")),
                            i = a.trim(b.attr("placeholder"));
                        if (!g || (h && g == h) || (i && g == i)) return e.allrules[c[d]].alertText;
                        break;
                    case "radio":
                    case "checkbox":
                        if (f) {
                            if (!b.attr("checked")) return e.allrules[c[d]].alertTextCheckboxMultiple;
                            break;
                        }
                        var j = b.closest("form, .validationEngineContainer"),
                            k = b.attr("name");
                        if (0 == j.find("input[name='" + k + "']:checked").size()) return 1 == j.find("input[name='" + k + "']:visible").size() ? e.allrules[c[d]].alertTextCheckboxe : e.allrules[c[d]].alertTextCheckboxMultiple;
                }
            },
            _groupRequired: function (c, d, e, f) {
                var g = "[" + f.validateAttribute + "*=" + d[e + 1] + "]",
                    h = !1;
                return (
                    c
                        .closest("form, .validationEngineContainer")
                        .find(g)
                        .each(function () {
                            return b._required(a(this), d, e, f) ? void 0 : ((h = !0), !1);
                        }),
                    h ? void 0 : f.allrules[d[e]].alertText
                );
            },
            _custom: function (a, b, c, d) {
                var e,
                    f = b[c + 1],
                    g = d.allrules[f];
                if (!g) return void alert("jqv:custom rule not found - " + f);
                if (g.regex) {
                    var h = g.regex;
                    if (!h) return void alert("jqv:custom regex not found - " + f);
                    if (!new RegExp(h).test(a.val())) return d.allrules[f].alertText;
                } else {
                    if (!g.func) return void alert("jqv:custom type not allowed " + f);
                    if ("function" != typeof (e = g.func)) return void alert("jqv:custom parameter 'function' is no function - " + f);
                    if (!e(a, b, c, d)) return d.allrules[f].alertText;
                }
            },
            _funcCall: function (a, b, c, d) {
                var e,
                    f = b[c + 1];
                if (f.indexOf(".") > -1) {
                    for (var g = f.split("."), h = window; g.length; ) h = h[g.shift()];
                    e = h;
                } else e = window[f] || d.customFunctions[f];
                return "function" == typeof e ? e(a, b, c, d) : void 0;
            },
            _equals: function (b, c, d, e) {
                var f = c[d + 1];
                return b.val() != a("#" + f).val() ? e.allrules.equals.alertText : void 0;
            },
            _maxSize: function (a, b, c, d) {
                var e = b[c + 1];
                if (a.val().length > e) {
                    var f = d.allrules.maxSize;
                    return f.alertText + e + f.alertText2;
                }
            },
            _minSize: function (a, b, c, d) {
                var e = b[c + 1];
                if (e > a.val().length) {
                    var f = d.allrules.minSize;
                    return f.alertText + e + f.alertText2;
                }
            },
            _min: function (a, b, c, d) {
                var e = parseFloat(b[c + 1]);
                if (e > parseFloat(a.val())) {
                    var f = d.allrules.min;
                    return f.alertText2 ? f.alertText + e + f.alertText2 : f.alertText + e;
                }
            },
            _max: function (a, b, c, d) {
                var e = parseFloat(b[c + 1]);
                if (parseFloat(a.val()) > e) {
                    var f = d.allrules.max;
                    return f.alertText2 ? f.alertText + e + f.alertText2 : f.alertText + e;
                }
            },
            _past: function (c, d, e, f, g) {
                var h,
                    i = e[f + 1],
                    j = a(c.find("input[name='" + i.replace(/^#+/, "") + "']"));
                if ("now" == i.toLowerCase()) h = new Date();
                else if (void 0 != j.val()) {
                    if (j.is(":disabled")) return;
                    h = b._parseDate(j.val());
                } else h = b._parseDate(i);
                if (b._parseDate(d.val()) > h) {
                    var k = g.allrules.past;
                    return k.alertText2 ? k.alertText + b._dateToString(h) + k.alertText2 : k.alertText + b._dateToString(h);
                }
            },
            _future: function (c, d, e, f, g) {
                var h,
                    i = e[f + 1],
                    j = a(c.find("input[name='" + i.replace(/^#+/, "") + "']"));
                if ("now" == i.toLowerCase()) h = new Date();
                else if (void 0 != j.val()) {
                    if (j.is(":disabled")) return;
                    h = b._parseDate(j.val());
                } else h = b._parseDate(i);
                if (h > b._parseDate(d.val())) {
                    var k = g.allrules.future;
                    return k.alertText2 ? k.alertText + b._dateToString(h) + k.alertText2 : k.alertText + b._dateToString(h);
                }
            },
            _isDate: function (a) {
                return new RegExp(
                    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/
                ).test(a);
            },
            _isDateTime: function (a) {
                return new RegExp(
                    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/
                ).test(a);
            },
            _dateCompare: function (a, b) {
                return new Date(a.toString()) < new Date(b.toString());
            },
            _dateRange: function (a, c, d, e) {
                return (!e.firstOfGroup[0].value && e.secondOfGroup[0].value) || (e.firstOfGroup[0].value && !e.secondOfGroup[0].value)
                    ? e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2
                    : b._isDate(e.firstOfGroup[0].value) && b._isDate(e.secondOfGroup[0].value) && b._dateCompare(e.firstOfGroup[0].value, e.secondOfGroup[0].value)
                    ? void 0
                    : e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2;
            },
            _dateTimeRange: function (a, c, d, e) {
                return (!e.firstOfGroup[0].value && e.secondOfGroup[0].value) || (e.firstOfGroup[0].value && !e.secondOfGroup[0].value)
                    ? e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2
                    : b._isDateTime(e.firstOfGroup[0].value) && b._isDateTime(e.secondOfGroup[0].value) && b._dateCompare(e.firstOfGroup[0].value, e.secondOfGroup[0].value)
                    ? void 0
                    : e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2;
            },
            _maxCheckbox: function (a, b, c, d, e) {
                var f = c[d + 1],
                    g = b.attr("name");
                return a.find("input[name='" + g + "']:checked").size() > f
                    ? ((e.showArrow = !1), e.allrules.maxCheckbox.alertText2 ? e.allrules.maxCheckbox.alertText + " " + f + " " + e.allrules.maxCheckbox.alertText2 : e.allrules.maxCheckbox.alertText)
                    : void 0;
            },
            _minCheckbox: function (a, b, c, d, e) {
                var f = c[d + 1],
                    g = b.attr("name");
                return f > a.find("input[name='" + g + "']:checked").size() ? ((e.showArrow = !1), e.allrules.minCheckbox.alertText + " " + f + " " + e.allrules.minCheckbox.alertText2) : void 0;
            },
            _creditCard: function (a, b, c, d) {
                var e = !1,
                    f = a.val().replace(/ +/g, "").replace(/-+/g, ""),
                    g = f.length;
                if (g >= 14 && 16 >= g && parseInt(f) > 0) {
                    var h,
                        i = 0,
                        c = g - 1,
                        j = 1,
                        k = new String();
                    do {
                        (h = parseInt(f.charAt(c))), (k += j++ % 2 == 0 ? 2 * h : h);
                    } while (--c >= 0);
                    for (c = 0; c < k.length; c++) i += parseInt(k.charAt(c));
                    e = i % 10 == 0;
                }
                return e ? void 0 : d.allrules.creditCard.alertText;
            },
            _ajax: function (c, d, e, f) {
                var g = d[e + 1],
                    h = f.allrules[g],
                    i = h.extraData,
                    j = h.extraDataDynamic,
                    k = { fieldId: c.attr("id"), fieldValue: c.val() };
                if ("object" == typeof i) a.extend(k, i);
                else if ("string" == typeof i)
                    for (var l = i.split("&"), e = 0; e < l.length; e++) {
                        var m = l[e].split("=");
                        m[0] && m[0] && (k[m[0]] = m[1]);
                    }
                if (j)
                    for (var n = String(j).split(","), e = 0; e < n.length; e++) {
                        var o = n[e];
                        if (a(o).length) {
                            var p = c.closest("form, .validationEngineContainer").find(o).val();
                            o.replace("#", ""), escape(p), (k[o.replace("#", "")] = p);
                        }
                    }
                return (
                    "field" == f.eventTrigger && delete f.ajaxValidCache[c.attr("id")],
                    f.isError || b._checkAjaxFieldStatus(c.attr("id"), f)
                        ? void 0
                        : (a.ajax({
                              type: f.ajaxFormValidationMethod,
                              url: h.url,
                              cache: !1,
                              dataType: "json",
                              data: k,
                              field: c,
                              rule: h,
                              methods: b,
                              options: f,
                              beforeSend: function () {},
                              error: function (a, c) {
                                  b._ajaxError(a, c);
                              },
                              success: function (d) {
                                  var e = d[0],
                                      g = a("#" + e).eq(0);
                                  if (1 == g.length) {
                                      var i = d[1],
                                          j = d[2];
                                      if (i) {
                                          if (((f.ajaxValidCache[e] = !0), j)) {
                                              if (f.allrules[j]) {
                                                  var k = f.allrules[j].alertTextOk;
                                                  k && (j = k);
                                              }
                                          } else j = h.alertTextOk;
                                          f.showPrompts && (j ? b._showPrompt(g, j, "pass", !0, f) : b._closePrompt(g)), "submit" == f.eventTrigger && c.closest("form").submit();
                                      } else {
                                          if (((f.ajaxValidCache[e] = !1), (f.isError = !0), j)) {
                                              if (f.allrules[j]) {
                                                  var k = f.allrules[j].alertText;
                                                  k && (j = k);
                                              }
                                          } else j = h.alertText;
                                          f.showPrompts && b._showPrompt(g, j, "", !0, f);
                                      }
                                  }
                                  g.trigger("jqv.field.result", [g, f.isError, j]);
                              },
                          }),
                          h.alertTextLoad)
                );
            },
            _ajaxError: function (a, b) {
                0 == a.status && null == b ? alert("The page is not served from a server! ajax call failed") : "undefined" != typeof console && console.log("Ajax error: " + a.status + " " + b);
            },
            _dateToString: function (a) {
                return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
            },
            _parseDate: function (a) {
                var b = a.split("-");
                return b == a && (b = a.split("/")), b == a ? ((b = a.split(".")), new Date(b[2], b[1] - 1, b[0])) : new Date(b[0], b[1] - 1, b[2]);
            },
            _showPrompt: function (c, d, e, f, g, h) {
                c.data("jqv-prompt-at") instanceof jQuery ? (c = c.data("jqv-prompt-at")) : c.data("jqv-prompt-at") && (c = a(c.data("jqv-prompt-at")));
                var i = b._getPrompt(c);
                h && (i = !1), a.trim(d) && (i ? b._updatePrompt(c, i, d, e, f, g) : b._buildPrompt(c, d, e, f, g));
            },
            _buildPrompt: function (c, d, e, f, g) {
                var h = a("<div>");
                switch ((h.addClass(b._getClassName(c.attr("id")) + "formError"), h.addClass("parentForm" + b._getClassName(c.closest("form, .validationEngineContainer").attr("id"))), h.addClass("formError"), e)) {
                    case "pass":
                        h.addClass("greenPopup");
                        break;
                    case "load":
                        h.addClass("blackPopup");
                }
                f && h.addClass("ajaxed");
                var i = (a("<div>").addClass("formErrorContent").html(d).appendTo(h), c.data("promptPosition") || g.promptPosition);
                if (g.showArrow) {
                    var j = a("<div>").addClass("formErrorArrow");
                    if ("string" == typeof i) {
                        var k = i.indexOf(":");
                        -1 != k && (i = i.substring(0, k));
                    }
                    switch (i) {
                        case "bottomLeft":
                        case "bottomRight":
                            h.find(".formErrorContent").before(j),
                                j
                                    .addClass("formErrorArrowBottom")
                                    .html(
                                        '<div class="line1">\x3c!-- --\x3e</div><div class="line2">\x3c!-- --\x3e</div><div class="line3">\x3c!-- --\x3e</div><div class="line4">\x3c!-- --\x3e</div><div class="line5">\x3c!-- --\x3e</div><div class="line6">\x3c!-- --\x3e</div><div class="line7">\x3c!-- --\x3e</div><div class="line8">\x3c!-- --\x3e</div><div class="line9">\x3c!-- --\x3e</div><div class="line10">\x3c!-- --\x3e</div>'
                                    );
                            break;
                        case "topLeft":
                        case "topRight":
                            j.html(
                                '<div class="line10">\x3c!-- --\x3e</div><div class="line9">\x3c!-- --\x3e</div><div class="line8">\x3c!-- --\x3e</div><div class="line7">\x3c!-- --\x3e</div><div class="line6">\x3c!-- --\x3e</div><div class="line5">\x3c!-- --\x3e</div><div class="line4">\x3c!-- --\x3e</div><div class="line3">\x3c!-- --\x3e</div><div class="line2">\x3c!-- --\x3e</div><div class="line1">\x3c!-- --\x3e</div>'
                            ),
                                h.append(j);
                    }
                }
                g.addPromptClass && h.addClass(g.addPromptClass);
                var l = c.attr("data-required-class");
                if (void 0 !== l) h.addClass(l);
                else if (
                    g.prettySelect &&
                    a("#" + c.attr("id"))
                        .next()
                        .is("select")
                ) {
                    var m = a("#" + c.attr("id").substr(g.usePrefix.length).substring(g.useSuffix.length)).attr("data-required-class");
                    void 0 !== m && h.addClass(m);
                }
                h.css({ opacity: 0 }),
                    "inline" === i ? (h.addClass("inline"), void 0 !== c.attr("data-prompt-target") && a("#" + c.attr("data-prompt-target")).length > 0 ? h.appendTo(a("#" + c.attr("data-prompt-target"))) : c.after(h)) : c.before(h);
                var k = b._calculatePosition(c, h, g);
                return (
                    h.css({ position: "inline" === i ? "relative" : "absolute", top: k.callerTopPosition, left: k.callerleftPosition, marginTop: k.marginTopSize, opacity: 0 }).data("callerField", c),
                    g.autoHidePrompt &&
                        setTimeout(function () {
                            h.animate({ opacity: 0 }, function () {
                                h.closest(".formErrorOuter").remove(), h.remove();
                            });
                        }, g.autoHideDelay),
                    h.animate({ opacity: 0.87 })
                );
            },
            _updatePrompt: function (a, c, d, e, f, g, h) {
                if (c) {
                    void 0 !== e && ("pass" == e ? c.addClass("greenPopup") : c.removeClass("greenPopup"), "load" == e ? c.addClass("blackPopup") : c.removeClass("blackPopup")),
                        f ? c.addClass("ajaxed") : c.removeClass("ajaxed"),
                        c.find(".formErrorContent").html(d);
                    var i = b._calculatePosition(a, c, g),
                        j = { top: i.callerTopPosition, left: i.callerleftPosition, marginTop: i.marginTopSize };
                    h ? c.css(j) : c.animate(j);
                }
            },
            _closePrompt: function (a) {
                var c = b._getPrompt(a);
                c &&
                    c.fadeTo("fast", 0, function () {
                        c.parent(".formErrorOuter").remove(), c.remove();
                    });
            },
            closePrompt: function (a) {
                return b._closePrompt(a);
            },
            _getPrompt: function (c) {
                var d = a(c).closest("form, .validationEngineContainer").attr("id"),
                    e = b._getClassName(c.attr("id")) + "formError",
                    f = a("." + b._escapeExpression(e) + ".parentForm" + b._getClassName(d))[0];
                return f ? a(f) : void 0;
            },
            _escapeExpression: function (a) {
                return a.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
            },
            isRTL: function (b) {
                var c = a(document),
                    d = a("body"),
                    e =
                        (b && b.hasClass("rtl")) ||
                        (b && "rtl" === (b.attr("dir") || "").toLowerCase()) ||
                        c.hasClass("rtl") ||
                        "rtl" === (c.attr("dir") || "").toLowerCase() ||
                        d.hasClass("rtl") ||
                        "rtl" === (d.attr("dir") || "").toLowerCase();
                return Boolean(e);
            },
            _calculatePosition: function (a, b, c) {
                var d,
                    e,
                    f,
                    g = a.width(),
                    h = a.position().left,
                    i = a.position().top,
                    j = (a.height(), b.height());
                (d = e = 0), (f = -j);
                var k = a.data("promptPosition") || c.promptPosition,
                    l = "",
                    m = "",
                    n = 0,
                    o = 0;
                switch (
                    ("string" == typeof k &&
                        -1 != k.indexOf(":") &&
                        ((l = k.substring(k.indexOf(":") + 1)),
                        (k = k.substring(0, k.indexOf(":"))),
                        -1 != l.indexOf(",") && ((m = l.substring(l.indexOf(",") + 1)), (l = l.substring(0, l.indexOf(","))), (o = parseInt(m)), isNaN(o) && (o = 0)),
                        (n = parseInt(l)),
                        isNaN(l) && (l = 0)),
                    k)
                ) {
                    default:
                    case "topRight":
                        (e += h + g - 30), (d += i);
                        break;
                    case "topLeft":
                        (d += i), (e += h);
                        break;
                    case "centerRight":
                        (d = i + 4), (f = 0), (e = h + a.outerWidth(!0) + 5);
                        break;
                    case "centerLeft":
                        (e = h - (b.width() + 2)), (d = i + 4), (f = 0);
                        break;
                    case "bottomLeft":
                        (d = i + a.height() + 5), (f = 0), (e = h);
                        break;
                    case "bottomRight":
                        (e = h + g - 30), (d = i + a.height() + 5), (f = 0);
                        break;
                    case "inline":
                        (e = 0), (d = 0), (f = 0);
                }
                return (e += n), (d += o), { callerTopPosition: d + "px", callerleftPosition: e + "px", marginTopSize: f + "px" };
            },
            _saveOptions: function (b, c) {
                if (a.validationEngineLanguage) var d = a.validationEngineLanguage.allRules;
                else a.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
                a.validationEngine.defaults.allrules = d;
                var e = a.extend(!0, {}, a.validationEngine.defaults, c);
                return b.data("jqv", e), e;
            },
            _getClassName: function (a) {
                return a ? a.replace(/:/g, "_").replace(/\./g, "_") : void 0;
            },
            _jqSelector: function (a) {
                return a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1");
            },
            _condRequired: function (a, c, d, e) {
                var f, g;
                for (f = d + 1; f < c.length; f++) if (((g = jQuery("#" + c[f]).first()), g.length && void 0 == b._required(g, ["required"], 0, e, !0))) return b._required(a, ["required"], 0, e);
            },
            _submitButtonClick: function () {
                var b = a(this);
                b.closest("form, .validationEngineContainer").data("jqv_submitButton", b.attr("id"));
            },
        };
        (a.fn.validationEngine = function (c) {
            var d = a(this);
            return d[0]
                ? "string" == typeof c && "_" != c.charAt(0) && b[c]
                    ? ("showPrompt" != c && "hide" != c && "hideAll" != c && b.init.apply(d), b[c].apply(d, Array.prototype.slice.call(arguments, 1)))
                    : "object" != typeof c && c
                    ? void a.error("Method " + c + " does not exist in jQuery.validationEngine")
                    : (b.init.apply(d, arguments), b.attach.apply(d))
                : d;
        }),
            (a.validationEngine = {
                fieldIdCounter: 0,
                defaults: {
                    validationEventTrigger: "blur",
                    scroll: !0,
                    focusFirstField: !0,
                    showPrompts: !0,
                    validateNonVisibleFields: !1,
                    promptPosition: "topRight",
                    bindMethod: "bind",
                    inlineAjax: !1,
                    ajaxFormValidation: !1,
                    ajaxFormValidationURL: !1,
                    ajaxFormValidationMethod: "get",
                    onAjaxFormComplete: a.noop,
                    onBeforeAjaxFormValidation: a.noop,
                    onValidationComplete: !1,
                    doNotShowAllErrosOnSubmit: !1,
                    custom_error_messages: {},
                    binded: !0,
                    showArrow: !0,
                    isError: !1,
                    maxErrorsPerField: !1,
                    ajaxValidCache: {},
                    autoPositionUpdate: !1,
                    InvalidFields: [],
                    onFieldSuccess: !1,
                    onFieldFailure: !1,
                    onSuccess: !1,
                    onFailure: !1,
                    validateAttribute: "class",
                    addSuccessCssClassToField: "",
                    addFailureCssClassToField: "",
                    autoHidePrompt: !1,
                    autoHideDelay: 1e4,
                    fadeDuration: 0.3,
                    prettySelect: !1,
                    addPromptClass: "",
                    usePrefix: "",
                    useSuffix: "",
                    showOneMessage: !1,
                },
            }),
            a(function () {
                a.validationEngine.defaults.promptPosition = b.isRTL() ? "topLeft" : "topRight";
            });
    })(jQuery),
    (function (a) {
        (a.fn.validationEngineLanguage = function () {}),
            (a.validationEngineLanguage = {
                newLang: function () {
                    a.validationEngineLanguage.allRules = {
                        required: { regex: "none", alertText: "* Ce champ est requis", alertTextCheckboxMultiple: "* Choisir une option", alertTextCheckboxe: "* Vous devez cocher cette case pour valider votre demande" },
                        requiredInFunction: {
                            func: function (a, b, c, d) {
                                return "test" == a.val();
                            },
                            alertText: "* Field must equal test",
                        },
                        minSize: { regex: "none", alertText: "", alertText2: " caractères minimum" },
                        groupRequired: { regex: "none", alertText: "* Vous devez remplir un des champs suivant" },
                        preciseSize: {
                            func: function (a, b, c, d) {
                                var e = b[c + 2];
                                if (e == a.val().length) return !0;
                                var f = d.allrules.preciseSize;
                                return (f.alertText = f.alertText1 + e + f.alertText2), !1;
                            },
                            alertText1: "* ",
                            alertText2: " caractères requis",
                        },
                        maxSize: { regex: "none", alertText: "", alertText2: " caractères maximum" },
                        min: { regex: "none", alertText: "* Valeur minimum requise " },
                        max: { regex: "none", alertText: "* Valeur maximum requise " },
                        past: { regex: "none", alertText: "* Date antérieure au " },
                        future: { regex: "none", alertText: "* Date postérieure au " },
                        maxCheckbox: { regex: "none", alertText: "* Nombre max de choix excédé" },
                        minCheckbox: { regex: "none", alertText: "* Veuillez choisir ", alertText2: " options" },
                        equals: { regex: "none", alertText: "* Votre champ n'est pas identique" },
                        creditCard: { regex: "none", alertText: "* Numéro de carte bancaire valide" },
                        phone: { regex: /^\d{2}[. ]?\d{2}[. ]?\d{2}[. ]?\d{2}[. ]?\d{2}$/, alertText: "* Numéro de téléphone invalide, format xx xx xx xx xx attendu" },
                        email: {
                            regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                            alertText: "* Adresse email invalide",
                        },
                        integer: { regex: /^[\-\+]?\d+$/, alertText: "* Nombre entier invalide" },
                        ss: { regex: /^\d{1}[ ]?\d{2}[ ]?\d{2}[ ]?(\d{2}|2a|2b)[ ]?\d{3}[ ]?\d{3}[ ]?$/i, alertText: "* Numéro de sécurité social incorrect" },
                        ss_monaco: { regex: /^\d{6}$/i, alertText: "* Numéro de matricule incorrect" },
                        ss_checksum: {
                            func: function (b, c, d, e) {
                                var f = b.val().toLowerCase();
                                f = f.replace(/ /g, "").replace("2a", "19").replace("2b", "18").replace("2A", "19").replace("2B", "18");
                                var g = 97 - (parseInt(f) % 97),
                                    h = a("#" + c[d + 2]);
                                return parseInt(h.val()) === g;
                            },
                            alertText: "* la clef ne vérifie pas le n° de sécurité social",
                        },
                        ss_key: {
                            func: function (b, c, d, e) {
                                if (/^\d{2}$/.test(b.val())) return !a("#" + c[d + 2]).validationEngine("validate");
                                return !1;
                            },
                            alertText: "* Clef incorrecte",
                        },
                        bic: { regex: /^[0-9a-zA-Z]{8,11}$/, alertText: "* Code BIC invalide" },
                        iban: { regex: /^[0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{3}$/, alertText: "* IBAN invalide" },
                        iban3: { regex: /^[0-9a-zA-Z]{3}$/, alertText: "* invalide" },
                        iban4: { regex: /^[0-9a-zA-Z]{4}$/, alertText: "* invalide" },
                        rib_key: { regex: /^\d{2}$/, alertText: "* la clef est invalide" },
                        number: { regex: /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/, alertText: "* Nombre flottant invalide" },
                        centuary: {
                            func: function (a, b, c, d) {
                                var e = a.val().split("/");
                                if (3 == e.length) {
                                    var f = new Date().getFullYear(),
                                        g = f - e[2];
                                    if (f - e[2] > 100 || g <= 16) return !1;
                                }
                                return !0;
                            },
                            alertText: "* Age invalide: min. 16, maximum: 100",
                        },
                        minor: {
                            func: function (a, b, c, d) {
                                var e = a.val().split("/");
                                if (3 == e.length) {
                                    var f = new Date(e[2], e[1] - 1, e[0]),
                                        g = Date.now() - f.getTime(),
                                        h = new Date(g);
                                    if (Math.abs(h.getUTCFullYear() - 1970) >= 18) return !1;
                                }
                                return !0;
                            },
                            alertText: "* Seulement les mineurs",
                        },
                        date: { regex: /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/, alertText: "* Date invalide, format JJ/MM/AAAA attendu" },
                        cp: { regex: /^\d{5}$/, alertText: "* Code postal invalide" },
                        ipv4: { regex: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/, alertText: "* Adresse IP invalide" },
                        url: {
                            regex: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                            alertText: "* URL invalide",
                        },
                        onlyNumberSp: { regex: /^[0-9\ ]+$/, alertText: "* Seuls les chiffres sont acceptés" },
                        onlyLetterSp: { regex: /^[a-zA-Z\u00C0-\u00D6\u00D9-\u00F6\u00F9-\u00FD\ \']+$/, alertText: "* Seules les lettres sont acceptées" },
                        onlyLetterNumber: { regex: /^[0-9a-zA-Z\u00C0-\u00D6\u00D9-\u00F6\u00F9-\u00FD]+$/, alertText: "* Aucun caractère spécial n'est accepté" },
                        ajaxUserCall: { url: "ajaxValidateFieldUser", extraData: "name=eric", alertTextLoad: "* Chargement, veuillez attendre", alertText: "* Ce nom est déjà pris" },
                        ajaxNameCall: { url: "ajaxValidateFieldName", alertText: "* Ce nom est déjà pris", alertTextOk: "*Ce nom est disponible", alertTextLoad: "* Chargement, veuillez attendre" },
                        validate2fields: { alertText: "Veuillez taper le mot HELLO" },
                    };
                },
            }),
            a.validationEngineLanguage.newLang();
    })(jQuery),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? (module.exports = a(require("jquery"))) : a(jQuery);
    })(function (a) {
        a.extend(a.fn, {
            validate: function (b) {
                if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var c = a.data(this[0], "validator");
                return (
                    c ||
                    (this.attr("novalidate", "novalidate"),
                    (c = new a.validator(b, this[0])),
                    a.data(this[0], "validator", c),
                    c.settings.onsubmit &&
                        (this.on("click.validate", ":submit", function (b) {
                            (c.submitButton = b.currentTarget), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
                        }),
                        this.on("submit.validate", function (b) {
                            function d() {
                                var d, e;
                                return (
                                    c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),
                                    !(c.settings.submitHandler && !c.settings.debug) || ((e = c.settings.submitHandler.call(c, c.currentForm, b)), d && d.remove(), void 0 !== e && e)
                                );
                            }
                            return c.settings.debug && b.preventDefault(), c.cancelSubmit ? ((c.cancelSubmit = !1), d()) : c.form() ? (c.pendingRequest ? ((c.formSubmitted = !0), !1) : d()) : (c.focusInvalid(), !1);
                        })),
                    c)
                );
            },
            valid: function () {
                var b, c, d;
                return (
                    a(this[0]).is("form")
                        ? (b = this.validate().form())
                        : ((d = []),
                          (b = !0),
                          (c = a(this[0].form).validate()),
                          this.each(function () {
                              (b = c.element(this) && b) || (d = d.concat(c.errorList));
                          }),
                          (c.errorList = d)),
                    b
                );
            },
            rules: function (b, c) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j = this[0],
                    k = void 0 !== this.attr("contenteditable") && "false" !== this.attr("contenteditable");
                if (null != j && (!j.form && k && ((j.form = this.closest("form")[0]), (j.name = this.attr("name"))), null != j.form)) {
                    if (b)
                        switch (((d = a.data(j.form, "validator").settings), (e = d.rules), (f = a.validator.staticRules(j)), b)) {
                            case "add":
                                a.extend(f, a.validator.normalizeRule(c)), delete f.messages, (e[j.name] = f), c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                                break;
                            case "remove":
                                return c
                                    ? ((i = {}),
                                      a.each(c.split(/\s/), function (a, b) {
                                          (i[b] = f[b]), delete f[b];
                                      }),
                                      i)
                                    : (delete e[j.name], f);
                        }
                    return (
                        (g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j)),
                        g.required && ((h = g.required), delete g.required, (g = a.extend({ required: h }, g))),
                        g.remote && ((h = g.remote), delete g.remote, (g = a.extend(g, { remote: h }))),
                        g
                    );
                }
            },
        }),
            a.extend(a.expr.pseudos || a.expr[":"], {
                blank: function (b) {
                    return !a.trim("" + a(b).val());
                },
                filled: function (b) {
                    var c = a(b).val();
                    return null !== c && !!a.trim("" + c);
                },
                unchecked: function (b) {
                    return !a(b).prop("checked");
                },
            }),
            (a.validator = function (b, c) {
                (this.settings = a.extend(!0, {}, a.validator.defaults, b)), (this.currentForm = c), this.init();
            }),
            (a.validator.format = function (b, c) {
                return 1 === arguments.length
                    ? function () {
                          var c = a.makeArray(arguments);
                          return c.unshift(b), a.validator.format.apply(this, c);
                      }
                    : void 0 === c
                    ? b
                    : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)),
                      c.constructor !== Array && (c = [c]),
                      a.each(c, function (a, c) {
                          b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                              return c;
                          });
                      }),
                      b);
            }),
            a.extend(a.validator, {
                defaults: {
                    messages: {},
                    groups: {},
                    rules: {},
                    errorClass: "error",
                    pendingClass: "pending",
                    validClass: "valid",
                    errorElement: "label",
                    focusCleanup: !1,
                    focusInvalid: !0,
                    errorContainer: a([]),
                    errorLabelContainer: a([]),
                    onsubmit: !0,
                    ignore: ":hidden",
                    ignoreTitle: !1,
                    onfocusin: function (a) {
                        (this.lastActive = a), this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
                    },
                    onfocusout: function (a) {
                        this.checkable(a) || (!(a.name in this.submitted) && this.optional(a)) || this.element(a);
                    },
                    onkeyup: function (b, c) {
                        var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                        (9 === c.which && "" === this.elementValue(b)) || -1 !== a.inArray(c.keyCode, d) || ((b.name in this.submitted || b.name in this.invalid) && this.element(b));
                    },
                    onclick: function (a) {
                        a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
                    },
                    highlight: function (b, c, d) {
                        "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
                    },
                    unhighlight: function (b, c, d) {
                        "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
                    },
                },
                setDefaults: function (b) {
                    a.extend(a.validator.defaults, b);
                },
                messages: {
                    required: "This field is required.",
                    remote: "Please fix this field.",
                    email: "Please enter a valid email address.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date (ISO).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    equalTo: "Please enter the same value again.",
                    maxlength: a.validator.format("Please enter no more than {0} characters."),
                    minlength: a.validator.format("Please enter at least {0} characters."),
                    rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: a.validator.format("Please enter a value between {0} and {1}."),
                    max: a.validator.format("Please enter a value less than or equal to {0}."),
                    min: a.validator.format("Please enter a value greater than or equal to {0}."),
                    step: a.validator.format("Please enter a multiple of {0}."),
                },
                autoCreateRanges: !1,
                prototype: {
                    init: function () {
                        function b(b) {
                            var c = void 0 !== a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                            if ((!this.form && c && ((this.form = a(this).closest("form")[0]), (this.name = a(this).attr("name"))), d === this.form)) {
                                var e = a.data(this.form, "validator"),
                                    f = "on" + b.type.replace(/^validate/, ""),
                                    g = e.settings;
                                g[f] && !a(this).is(g.ignore) && g[f].call(e, this, b);
                            }
                        }
                        (this.labelContainer = a(this.settings.errorLabelContainer)),
                            (this.errorContext = (this.labelContainer.length && this.labelContainer) || a(this.currentForm)),
                            (this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer)),
                            (this.submitted = {}),
                            (this.valueCache = {}),
                            (this.pendingRequest = 0),
                            (this.pending = {}),
                            (this.invalid = {}),
                            this.reset();
                        var c,
                            d = this.currentForm,
                            e = (this.groups = {});
                        a.each(this.settings.groups, function (b, c) {
                            "string" == typeof c && (c = c.split(/\s/)),
                                a.each(c, function (a, c) {
                                    e[c] = b;
                                });
                        }),
                            (c = this.settings.rules),
                            a.each(c, function (b, d) {
                                c[b] = a.validator.normalizeRule(d);
                            }),
                            a(this.currentForm)
                                .on(
                                    "focusin.validate focusout.validate keyup.validate",
                                    ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",
                                    b
                                )
                                .on("click.validate", "select, option, [type='radio'], [type='checkbox']", b),
                            this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                    },
                    form: function () {
                        return (
                            this.checkForm(), a.extend(this.submitted, this.errorMap), (this.invalid = a.extend({}, this.errorMap)), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                        );
                    },
                    checkForm: function () {
                        this.prepareForm();
                        for (var a = 0, b = (this.currentElements = this.elements()); b[a]; a++) this.check(b[a]);
                        return this.valid();
                    },
                    element: function (b) {
                        var c,
                            d,
                            e = this.clean(b),
                            f = this.validationTargetFor(e),
                            g = this,
                            h = !0;
                        return (
                            void 0 === f
                                ? delete this.invalid[e.name]
                                : (this.prepareElement(f),
                                  (this.currentElements = a(f)),
                                  (d = this.groups[f.name]),
                                  d &&
                                      a.each(this.groups, function (a, b) {
                                          b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a)))) && e.name in g.invalid && (g.currentElements.push(e), (h = g.check(e) && h));
                                      }),
                                  (c = !1 !== this.check(f)),
                                  (h = h && c),
                                  (this.invalid[f.name] = !c),
                                  this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                                  this.showErrors(),
                                  a(b).attr("aria-invalid", !c)),
                            h
                        );
                    },
                    showErrors: function (b) {
                        if (b) {
                            var c = this;
                            a.extend(this.errorMap, b),
                                (this.errorList = a.map(this.errorMap, function (a, b) {
                                    return { message: a, element: c.findByName(b)[0] };
                                })),
                                (this.successList = a.grep(this.successList, function (a) {
                                    return !(a.name in b);
                                }));
                        }
                        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
                    },
                    resetForm: function () {
                        a.fn.resetForm && a(this.currentForm).resetForm(), (this.invalid = {}), (this.submitted = {}), this.prepareForm(), this.hideErrors();
                        var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                        this.resetElements(b);
                    },
                    resetElements: function (a) {
                        var b;
                        if (this.settings.unhighlight) for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                        else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
                    },
                    numberOfInvalids: function () {
                        return this.objectLength(this.invalid);
                    },
                    objectLength: function (a) {
                        var b,
                            c = 0;
                        for (b in a) void 0 !== a[b] && null !== a[b] && !1 !== a[b] && c++;
                        return c;
                    },
                    hideErrors: function () {
                        this.hideThese(this.toHide);
                    },
                    hideThese: function (a) {
                        a.not(this.containers).text(""), this.addWrapper(a).hide();
                    },
                    valid: function () {
                        return 0 === this.size();
                    },
                    size: function () {
                        return this.errorList.length;
                    },
                    focusInvalid: function () {
                        if (this.settings.focusInvalid)
                            try {
                                a(this.findLastActive() || (this.errorList.length && this.errorList[0].element) || [])
                                    .filter(":visible")
                                    .focus()
                                    .trigger("focusin");
                            } catch (a) {}
                    },
                    findLastActive: function () {
                        var b = this.lastActive;
                        return (
                            b &&
                            1 ===
                                a.grep(this.errorList, function (a) {
                                    return a.element.name === b.name;
                                }).length &&
                            b
                        );
                    },
                    elements: function () {
                        var b = this,
                            c = {};
                        return a(this.currentForm)
                            .find("input, select, textarea, [contenteditable]")
                            .not(":submit, :reset, :image, :disabled")
                            .not(this.settings.ignore)
                            .filter(function () {
                                var d = this.name || a(this).attr("name"),
                                    e = void 0 !== a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                                return (
                                    !d && b.settings.debug && window.console && console.error("%o has no name assigned", this),
                                    e && ((this.form = a(this).closest("form")[0]), (this.name = d)),
                                    this.form === b.currentForm && !(d in c || !b.objectLength(a(this).rules())) && ((c[d] = !0), !0)
                                );
                            });
                    },
                    clean: function (b) {
                        return a(b)[0];
                    },
                    errors: function () {
                        var b = this.settings.errorClass.split(" ").join(".");
                        return a(this.settings.errorElement + "." + b, this.errorContext);
                    },
                    resetInternals: function () {
                        (this.successList = []), (this.errorList = []), (this.errorMap = {}), (this.toShow = a([])), (this.toHide = a([]));
                    },
                    reset: function () {
                        this.resetInternals(), (this.currentElements = a([]));
                    },
                    prepareForm: function () {
                        this.reset(), (this.toHide = this.errors().add(this.containers));
                    },
                    prepareElement: function (a) {
                        this.reset(), (this.toHide = this.errorsFor(a));
                    },
                    elementValue: function (b) {
                        var c,
                            d,
                            e = a(b),
                            f = b.type,
                            g = void 0 !== e.attr("contenteditable") && "false" !== e.attr("contenteditable");
                        return "radio" === f || "checkbox" === f
                            ? this.findByName(b.name).filter(":checked").val()
                            : "number" === f && void 0 !== b.validity
                            ? b.validity.badInput
                                ? "NaN"
                                : e.val()
                            : ((c = g ? e.text() : e.val()),
                              "file" === f
                                  ? "C:\\fakepath\\" === c.substr(0, 12)
                                      ? c.substr(12)
                                      : (d = c.lastIndexOf("/")) >= 0
                                      ? c.substr(d + 1)
                                      : ((d = c.lastIndexOf("\\")), d >= 0 ? c.substr(d + 1) : c)
                                  : "string" == typeof c
                                  ? c.replace(/\r/g, "")
                                  : c);
                    },
                    check: function (b) {
                        b = this.validationTargetFor(this.clean(b));
                        var c,
                            d,
                            e,
                            f,
                            g = a(b).rules(),
                            h = a.map(g, function (a, b) {
                                return b;
                            }).length,
                            i = !1,
                            j = this.elementValue(b);
                        "function" == typeof g.normalizer ? (f = g.normalizer) : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f && ((j = f.call(b, j)), delete g.normalizer);
                        for (d in g) {
                            e = { method: d, parameters: g[d] };
                            try {
                                if ("dependency-mismatch" === (c = a.validator.methods[d].call(this, j, b, e.parameters)) && 1 === h) {
                                    i = !0;
                                    continue;
                                }
                                if (((i = !1), "pending" === c)) return void (this.toHide = this.toHide.not(this.errorsFor(b)));
                                if (!c) return this.formatAndAdd(b, e), !1;
                            } catch (a) {
                                throw (
                                    (this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", a),
                                    a instanceof TypeError && (a.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."),
                                    a)
                                );
                            }
                        }
                        if (!i) return this.objectLength(g) && this.successList.push(b), !0;
                    },
                    customDataMessage: function (b, c) {
                        return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
                    },
                    customMessage: function (a, b) {
                        var c = this.settings.messages[a];
                        return c && (c.constructor === String ? c : c[b]);
                    },
                    findDefined: function () {
                        for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a];
                    },
                    defaultMessage: function (b, c) {
                        "string" == typeof c && (c = { method: c });
                        var d = this.findDefined(
                                this.customMessage(b.name, c.method),
                                this.customDataMessage(b, c.method),
                                (!this.settings.ignoreTitle && b.title) || void 0,
                                a.validator.messages[c.method],
                                "<strong>Warning: No message defined for " + b.name + "</strong>"
                            ),
                            e = /\$?\{(\d+)\}/g;
                        return "function" == typeof d ? (d = d.call(this, c.parameters, b)) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d;
                    },
                    formatAndAdd: function (a, b) {
                        var c = this.defaultMessage(a, b);
                        this.errorList.push({ message: c, element: a, method: b.method }), (this.errorMap[a.name] = c), (this.submitted[a.name] = c);
                    },
                    addWrapper: function (a) {
                        return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
                    },
                    defaultShowErrors: function () {
                        var a, b, c;
                        for (a = 0; this.errorList[a]; a++)
                            (c = this.errorList[a]), this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                        if ((this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                        if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                        (this.toHide = this.toHide.not(this.toShow)), this.hideErrors(), this.addWrapper(this.toShow).show();
                    },
                    validElements: function () {
                        return this.currentElements.not(this.invalidElements());
                    },
                    invalidElements: function () {
                        return a(this.errorList).map(function () {
                            return this.element;
                        });
                    },
                    showLabel: function (b, c) {
                        var d,
                            e,
                            f,
                            g,
                            h = this.errorsFor(b),
                            i = this.idOrName(b),
                            j = a(b).attr("aria-describedby");
                        h.length
                            ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c))
                            : ((h = a("<" + this.settings.errorElement + ">")
                                  .attr("id", i + "-error")
                                  .addClass(this.settings.errorClass)
                                  .html(c || "")),
                              (d = h),
                              this.settings.wrapper &&
                                  (d = h
                                      .hide()
                                      .show()
                                      .wrap("<" + this.settings.wrapper + "/>")
                                      .parent()),
                              this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b),
                              h.is("label")
                                  ? h.attr("for", i)
                                  : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length &&
                                    ((f = h.attr("id")),
                                    j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : (j = f),
                                    a(b).attr("aria-describedby", j),
                                    (e = this.groups[b.name]) &&
                                        ((g = this),
                                        a.each(g.groups, function (b, c) {
                                            c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"));
                                        })))),
                            !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)),
                            (this.toShow = this.toShow.add(h));
                    },
                    errorsFor: function (b) {
                        var c = this.escapeCssMeta(this.idOrName(b)),
                            d = a(b).attr("aria-describedby"),
                            e = "label[for='" + c + "'], label[for='" + c + "'] *";
                        return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e);
                    },
                    escapeCssMeta: function (a) {
                        return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1");
                    },
                    idOrName: function (a) {
                        return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
                    },
                    validationTargetFor: function (b) {
                        return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
                    },
                    checkable: function (a) {
                        return /radio|checkbox/i.test(a.type);
                    },
                    findByName: function (b) {
                        return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']");
                    },
                    getLength: function (b, c) {
                        switch (c.nodeName.toLowerCase()) {
                            case "select":
                                return a("option:selected", c).length;
                            case "input":
                                if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;
                        }
                        return b.length;
                    },
                    depend: function (a, b) {
                        return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b);
                    },
                    dependTypes: {
                        boolean: function (a) {
                            return a;
                        },
                        string: function (b, c) {
                            return !!a(b, c.form).length;
                        },
                        function: function (a, b) {
                            return a(b);
                        },
                    },
                    optional: function (b) {
                        var c = this.elementValue(b);
                        return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
                    },
                    startRequest: function (b) {
                        this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), (this.pending[b.name] = !0));
                    },
                    stopRequest: function (b, c) {
                        this.pendingRequest--,
                            this.pendingRequest < 0 && (this.pendingRequest = 0),
                            delete this.pending[b.name],
                            a(b).removeClass(this.settings.pendingClass),
                            c && 0 === this.pendingRequest && this.formSubmitted && this.form()
                                ? (a(this.currentForm).submit(), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), (this.formSubmitted = !1))
                                : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), (this.formSubmitted = !1));
                    },
                    previousValue: function (b, c) {
                        return (c = ("string" == typeof c && c) || "remote"), a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) });
                    },
                    destroy: function () {
                        this.resetForm(),
                            a(this.currentForm)
                                .off(".validate")
                                .removeData("validator")
                                .find(".validate-equalTo-blur")
                                .off(".validate-equalTo")
                                .removeClass("validate-equalTo-blur")
                                .find(".validate-lessThan-blur")
                                .off(".validate-lessThan")
                                .removeClass("validate-lessThan-blur")
                                .find(".validate-lessThanEqual-blur")
                                .off(".validate-lessThanEqual")
                                .removeClass("validate-lessThanEqual-blur")
                                .find(".validate-greaterThanEqual-blur")
                                .off(".validate-greaterThanEqual")
                                .removeClass("validate-greaterThanEqual-blur")
                                .find(".validate-greaterThan-blur")
                                .off(".validate-greaterThan")
                                .removeClass("validate-greaterThan-blur");
                    },
                },
                classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
                addClassRules: function (b, c) {
                    b.constructor === String ? (this.classRuleSettings[b] = c) : a.extend(this.classRuleSettings, b);
                },
                classRules: function (b) {
                    var c = {},
                        d = a(b).attr("class");
                    return (
                        d &&
                            a.each(d.split(" "), function () {
                                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
                            }),
                        c
                    );
                },
                normalizeAttributeRule: function (a, b, c, d) {
                    /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && ((d = Number(d)), isNaN(d) && (d = void 0)), d || 0 === d ? (a[c] = d) : b === c && "range" !== b && (a[c] = !0);
                },
                attributeRules: function (b) {
                    var c,
                        d,
                        e = {},
                        f = a(b),
                        g = b.getAttribute("type");
                    for (c in a.validator.methods) "required" === c ? ((d = b.getAttribute(c)), "" === d && (d = !0), (d = !!d)) : (d = f.attr(c)), this.normalizeAttributeRule(e, g, c, d);
                    return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
                },
                dataRules: function (b) {
                    var c,
                        d,
                        e = {},
                        f = a(b),
                        g = b.getAttribute("type");
                    for (c in a.validator.methods) (d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase())), "" === d && (d = !0), this.normalizeAttributeRule(e, g, c, d);
                    return e;
                },
                staticRules: function (b) {
                    var c = {},
                        d = a.data(b.form, "validator");
                    return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
                },
                normalizeRules: function (b, c) {
                    return (
                        a.each(b, function (d, e) {
                            if (!1 === e) return void delete b[d];
                            if (e.param || e.depends) {
                                var f = !0;
                                switch (typeof e.depends) {
                                    case "string":
                                        f = !!a(e.depends, c.form).length;
                                        break;
                                    case "function":
                                        f = e.depends.call(c, c);
                                }
                                f ? (b[d] = void 0 === e.param || e.param) : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]);
                            }
                        }),
                        a.each(b, function (d, e) {
                            b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e;
                        }),
                        a.each(["minlength", "maxlength"], function () {
                            b[this] && (b[this] = Number(b[this]));
                        }),
                        a.each(["rangelength", "range"], function () {
                            var c;
                            b[this] &&
                                (a.isArray(b[this]) ? (b[this] = [Number(b[this][0]), Number(b[this][1])]) : "string" == typeof b[this] && ((c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/)), (b[this] = [Number(c[0]), Number(c[1])])));
                        }),
                        a.validator.autoCreateRanges &&
                            (null != b.min && null != b.max && ((b.range = [b.min, b.max]), delete b.min, delete b.max),
                            null != b.minlength && null != b.maxlength && ((b.rangelength = [b.minlength, b.maxlength]), delete b.minlength, delete b.maxlength)),
                        b
                    );
                },
                normalizeRule: function (b) {
                    if ("string" == typeof b) {
                        var c = {};
                        a.each(b.split(/\s/), function () {
                            c[this] = !0;
                        }),
                            (b = c);
                    }
                    return b;
                },
                addMethod: function (b, c, d) {
                    (a.validator.methods[b] = c), (a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b]), c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
                },
                methods: {
                    required: function (b, c, d) {
                        if (!this.depend(d, c)) return "dependency-mismatch";
                        if ("select" === c.nodeName.toLowerCase()) {
                            var e = a(c).val();
                            return e && e.length > 0;
                        }
                        return this.checkable(c) ? this.getLength(b, c) > 0 : void 0 !== b && null !== b && b.length > 0;
                    },
                    email: function (a, b) {
                        return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
                    },
                    url: function (a, b) {
                        return (
                            this.optional(b) ||
                            /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(
                                a
                            )
                        );
                    },
                    date: (function () {
                        var a = !1;
                        return function (b, c) {
                            return (
                                a ||
                                    ((a = !0),
                                    this.settings.debug &&
                                        window.console &&
                                        console.warn(
                                            "The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`."
                                        )),
                                this.optional(c) || !/Invalid|NaN/.test(new Date(b).toString())
                            );
                        };
                    })(),
                    dateISO: function (a, b) {
                        return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
                    },
                    number: function (a, b) {
                        return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
                    },
                    digits: function (a, b) {
                        return this.optional(b) || /^\d+$/.test(a);
                    },
                    minlength: function (b, c, d) {
                        var e = a.isArray(b) ? b.length : this.getLength(b, c);
                        return this.optional(c) || e >= d;
                    },
                    maxlength: function (b, c, d) {
                        var e = a.isArray(b) ? b.length : this.getLength(b, c);
                        return this.optional(c) || e <= d;
                    },
                    rangelength: function (b, c, d) {
                        var e = a.isArray(b) ? b.length : this.getLength(b, c);
                        return this.optional(c) || (e >= d[0] && e <= d[1]);
                    },
                    min: function (a, b, c) {
                        return this.optional(b) || a >= c;
                    },
                    max: function (a, b, c) {
                        return this.optional(b) || a <= c;
                    },
                    range: function (a, b, c) {
                        return this.optional(b) || (a >= c[0] && a <= c[1]);
                    },
                    step: function (b, c, d) {
                        var e,
                            f = a(c).attr("type"),
                            g = "Step attribute on input type " + f + " is not supported.",
                            h = ["text", "number", "range"],
                            i = new RegExp("\\b" + f + "\\b"),
                            j = f && !i.test(h.join()),
                            k = function (a) {
                                var b = ("" + a).match(/(?:\.(\d+))?$/);
                                return b && b[1] ? b[1].length : 0;
                            },
                            l = function (a) {
                                return Math.round(a * Math.pow(10, e));
                            },
                            m = !0;
                        if (j) throw new Error(g);
                        return (e = k(d)), (k(b) > e || l(b) % l(d) != 0) && (m = !1), this.optional(c) || m;
                    },
                    equalTo: function (b, c, d) {
                        var e = a(d);
                        return (
                            this.settings.onfocusout &&
                                e.not(".validate-equalTo-blur").length &&
                                e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                                    a(c).valid();
                                }),
                            b === e.val()
                        );
                    },
                    remote: function (b, c, d, e) {
                        if (this.optional(c)) return "dependency-mismatch";
                        e = ("string" == typeof e && e) || "remote";
                        var f,
                            g,
                            h,
                            i = this.previousValue(c, e);
                        return (
                            this.settings.messages[c.name] || (this.settings.messages[c.name] = {}),
                            (i.originalMessage = i.originalMessage || this.settings.messages[c.name][e]),
                            (this.settings.messages[c.name][e] = i.message),
                            (d = ("string" == typeof d && { url: d }) || d),
                            (h = a.param(a.extend({ data: b }, d.data))),
                            i.old === h
                                ? i.valid
                                : ((i.old = h),
                                  (f = this),
                                  this.startRequest(c),
                                  (g = {}),
                                  (g[c.name] = b),
                                  a.ajax(
                                      a.extend(
                                          !0,
                                          {
                                              mode: "abort",
                                              port: "validate" + c.name,
                                              dataType: "json",
                                              data: g,
                                              context: f.currentForm,
                                              success: function (a) {
                                                  var d,
                                                      g,
                                                      h,
                                                      j = !0 === a || "true" === a;
                                                  (f.settings.messages[c.name][e] = i.originalMessage),
                                                      j
                                                          ? ((h = f.formSubmitted), f.resetInternals(), (f.toHide = f.errorsFor(c)), (f.formSubmitted = h), f.successList.push(c), (f.invalid[c.name] = !1), f.showErrors())
                                                          : ((d = {}), (g = a || f.defaultMessage(c, { method: e, parameters: b })), (d[c.name] = i.message = g), (f.invalid[c.name] = !0), f.showErrors(d)),
                                                      (i.valid = j),
                                                      f.stopRequest(c, j);
                                              },
                                          },
                                          d
                                      )
                                  ),
                                  "pending")
                        );
                    },
                },
            });
        var b,
            c = {};
        return (
            a.ajaxPrefilter
                ? a.ajaxPrefilter(function (a, b, d) {
                      var e = a.port;
                      "abort" === a.mode && (c[e] && c[e].abort(), (c[e] = d));
                  })
                : ((b = a.ajax),
                  (a.ajax = function (d) {
                      var e = ("mode" in d ? d : a.ajaxSettings).mode,
                          f = ("port" in d ? d : a.ajaxSettings).port;
                      return "abort" === e ? (c[f] && c[f].abort(), (c[f] = b.apply(this, arguments)), c[f]) : b.apply(this, arguments);
                  })),
            a
        );
    }),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery", "../jquery.validate"], a) : "object" == typeof module && module.exports ? (module.exports = a(require("jquery"))) : a(jQuery);
    })(function (a) {
        return (
            a.extend(a.validator.messages, {
                required: "Ce champ est obligatoire.",
                remote: "Veuillez corriger ce champ.",
                email: "Veuillez fournir une adresse électronique valide.",
                url: "Veuillez fournir une adresse URL valide.",
                date: "Veuillez fournir une date valide.",
                dateISO: "Veuillez fournir une date valide (ISO).",
                number: "Veuillez fournir un numéro valide.",
                digits: "Veuillez fournir seulement des chiffres.",
                creditcard: "Veuillez fournir un numéro de carte de crédit valide.",
                equalTo: "Veuillez fournir encore la même valeur.",
                notEqualTo: "Veuillez fournir une valeur différente, les valeurs ne doivent pas être identiques.",
                extension: "Veuillez fournir une valeur avec une extension valide.",
                maxlength: a.validator.format("Veuillez fournir au plus {0} caractères."),
                minlength: a.validator.format("Veuillez fournir au moins {0} caractères."),
                rangelength: a.validator.format("Veuillez fournir une valeur qui contient entre {0} et {1} caractères."),
                range: a.validator.format("Veuillez fournir une valeur entre {0} et {1}."),
                max: a.validator.format("Veuillez fournir une valeur inférieure ou égale à {0}."),
                min: a.validator.format("Veuillez fournir une valeur supérieure ou égale à {0}."),
                step: a.validator.format("Veuillez fournir une valeur multiple de {0}."),
                maxWords: a.validator.format("Veuillez fournir au plus {0} mots."),
                minWords: a.validator.format("Veuillez fournir au moins {0} mots."),
                rangeWords: a.validator.format("Veuillez fournir entre {0} et {1} mots."),
                letterswithbasicpunc: "Veuillez fournir seulement des lettres et des signes de ponctuation.",
                alphanumeric: "Veuillez fournir seulement des lettres, nombres, espaces et soulignages.",
                lettersonly: "Veuillez fournir seulement des lettres.",
                nowhitespace: "Veuillez ne pas inscrire d'espaces blancs.",
                ziprange: "Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",
                integer: "Veuillez fournir un nombre non décimal qui est positif ou négatif.",
                vinUS: "Veuillez fournir un numéro d'identification du véhicule (VIN).",
                dateITA: "Veuillez fournir une date valide.",
                time: "Veuillez fournir une heure valide entre 00:00 et 23:59.",
                phoneUS: "Veuillez fournir un numéro de téléphone valide.",
                phoneUK: "Veuillez fournir un numéro de téléphone valide.",
                mobileUK: "Veuillez fournir un numéro de téléphone mobile valide.",
                strippedminlength: a.validator.format("Veuillez fournir au moins {0} caractères."),
                email2: "Veuillez fournir une adresse électronique valide.",
                url2: "Veuillez fournir une adresse URL valide.",
                creditcardtypes: "Veuillez fournir un numéro de carte de crédit valide.",
                ipv4: "Veuillez fournir une adresse IP v4 valide.",
                ipv6: "Veuillez fournir une adresse IP v6 valide.",
                require_from_group: a.validator.format("Veuillez fournir au moins {0} de ces champs."),
                nifES: "Veuillez fournir un numéro NIF valide.",
                nieES: "Veuillez fournir un numéro NIE valide.",
                cifES: "Veuillez fournir un numéro CIF valide.",
                postalCodeCA: "Veuillez fournir un code postal valide.",
            }),
            a
        );
    }),
    $(document).ready(function (a) {
        var b = 0;
        $(".tx-adp-webservice-remote").on("click", ".subscribe a", function (a) {
            return window.ga && ga.loaded && ga("send", "event", "clic-souscrire", "clic-souscrire", "clic-souscrire"), !0;
        }),
            $(".header-contact--comparateur").length > 0 &&
                $("#rappel").on("change", "select", function (a) {
                    a.preventDefault(), $(this).css("display", "none"), $("#rappel").find(".step-2").css("display", "inline-block"), $("#input_recall").before($("<span></span>").html($(this).find("option:selected").text()));
                }),
            $("#additional-data").on("click", ".additional-data-header a", function (a) {
                a.preventDefault();
                var b = $(this).attr("id").replace("handle_", "body_");
                if ("block" == $("#" + b).css("display"))
                    $("#additional-data")
                        .find(".bodies")
                        .first()
                        .animate(
                            { height: 0 },
                            {
                                complete: function () {
                                    $("#" + b).css("display", "none"), $(this).css("display", "none");
                                },
                            }
                        );
                else {
                    $("#additional-data").find(".additional-data-body").css("display", "none"), $("#additional-data").find(".bodies").first().css("display", "block");
                    var c = $("#" + b)
                        .css("display", "block")
                        .outerHeight(!0);
                    $("#additional-data").find(".bodies").first().animate({ height: c }, {});
                }
            }),
            $("#additional-data").on("click", ".additional-data-close", function (a) {
                a.preventDefault(),
                    $("#additional-data")
                        .find(".bodies")
                        .first()
                        .animate({ height: 0 }, function () {
                            $(this).css("display", "none");
                        });
            }),
            $("#helpform").on("submit", function (a) {
                return (
                    a.preventDefault(),
                    $.ajax({
                        url: $(this).attr("action"),
                        type: $(this).attr("method"),
                        data: $(this).serialize(),
                        dataType: "json",
                        success: function (a) {
                            if (a.success) {
                                var b = $('<div class="success"></div>').html(a.msg);
                                $("#helpform").empty().append(b);
                                var c = $("#helpform").parents(".additional-data-body").first().outerHeight(!0);
                                $("#additional-data").find(".bodies").first().animate({ height: c }, {});
                            } else {
                                var d = { html: a.msg, innerWidth: 350 };
                                (d.className = "js-submit js-submit-failure"), $.colorbox(d);
                            }
                        },
                    }),
                    !1
                );
            }),
            $("#helpform").on("change", "select", function (a) {
                if (!$(this).hasClass("select-slave")) {
                    var b = $(this).next("select").empty();
                    b.append('<option value="0">Préciser</option>'),
                        $.each(helpJson.slave[$(this).val()], function (a, c) {
                            b.append('<option value="' + c[0] + '">' + c[1] + "</option>");
                        }),
                        0 == $(this).val() ? b.attr("disabled", "disabled") : b.removeAttr("disabled");
                }
            }),
            $("#helpform").on("click", ".del-besoin", function (a) {
                a.preventDefault();
                var b = $(this).parents(".additional-data-body").first();
                $(this).parent().remove(),
                    $("#additional-data")
                        .find(".bodies")
                        .first()
                        .animate({ height: b.outerHeight(!0) }, {});
            }),
            $("#add_besoin").on("click", function (a) {
                var c = $(
                    $(this)
                        .data("template")
                        .replace(/%num%/g, ++b)
                );
                $(this).parent().after(c),
                    $.each(helpJson.master, function (a, b) {
                        c.find("select")
                            .first()
                            .append('<option value="' + b[0] + '">' + b[1] + "</option>");
                    }),
                    c.append($(this)),
                    c.prev().append($('<div class="del-besoin">-</div>'));
                var d = $(this).parents(".additional-data-body").first().outerHeight(!0);
                $("#additional-data").find(".bodies").first().animate({ height: d }, {});
            });
        var c = function (a) {
                var b = $("#modalGarantieDetail");
                b.find("iframe").attr({ src: a, height: "100%", width: "100%", allowfullscreen: "" }).end().modal("show"),
                    b.on("hidden.bs.modal", function () {
                        $(this).find("iframe").html(""), $(this).find("iframe").attr("src", "");
                    });
            },
            d = function (a) {
                var b = $("#modalSimulator");
                b.find("iframe").attr({ src: a, height: "100%", width: "100%", allowfullscreen: "" }).end().modal("show"),
                    b.on("hidden.bs.modal", function () {
                        $(this).find("iframe").html(""), $(this).find("iframe").attr("src", "");
                    });
            };
        if (
            ($("#result_zone").on("click", "a.js-garantie-detail", function (a) {
                a.preventDefault(), c($(this).attr("href"));
            }),
            $("#result_zone").on("click", 'a[data-role="simulate"]', function (a) {
                return a.preventDefault(), d($(this).attr("href")), !1;
            }),
            $(".filter-form input[type=radio]").on("change", function (a) {
                $(this).parents("form").first().submit();
            }),
            "undefined" != typeof callConfig)
        ) {
            var e = {};
            "" != callConfig.formule &&
                (e.onClose = function (a) {
                    var b = "#formule-detail-link-" + callConfig.formule;
                    $(b).length > 0 && c($(b).attr("href"));
                }),
                showMask(e),
                $.ajax({ url: callConfig.url, dataType: "html", async: !0 })
                    .done(function (a) {
                        $("#result_zone").html(a), hideMask();
                    })
                    .fail(function () {
                        hideMask();
                    }),
                $("#result_zone").on("click", ".tx-pagebrowse a", function (a) {
                    a.preventDefault(),
                        showMask(),
                        $.ajax({
                            url: $(this).attr("href"),
                            dataType: "html",
                            data: { type: 100 },
                            success: function (a) {
                                hideMask(), $("#result_zone").html(a);
                            },
                            error: function () {
                                hideMask();
                            },
                        });
                }),
                $(".form-besoin").on("submit", function (a) {
                    a.preventDefault();
                    var b = $(this).serialize();
                    (b += "&" + $.param({ type: 100, "tx_adp_webservice_remote[ask]": 1 })),
                        showMask(),
                        $.ajax({
                            url: $(this).attr("action"),
                            type: $(this).attr("method"),
                            data: b,
                            dataType: "html",
                            success: function (a) {
                                hideMask(), $("#result_zone").html(a);
                            },
                            error: function () {
                                hideMask();
                            },
                        });
                });
        }
    }),
    (function (a, b) {
        b(document).ready(function () {
            if (b(".list-renforts:not(.noupdate)").length || b(".list-options:not(.noupdate)").length) {
                var a = b('input[name="compose[options][]"], input[name="compose[renforts][]"]'),
                    c = { base: parseFloat(b(".list-result").data("price")), options: 0 },
                    d = function (a) {
                        var d = a.parents(".row");
                        b(a).is(":radio")
                            ? (d
                                  .parent()
                                  .find(".row")
                                  .each(function (a, d) {
                                      b(d).hasClass("is-selected") && (console.log(parseFloat(b(d).data("price"))), (c.options -= parseFloat(b(d).data("price")))), b(d).removeClass("is-selected");
                                  }),
                              (c.options += parseFloat(d.data("price"))),
                              d.addClass("is-selected"))
                            : (d.hasClass("is-selected") ? (c.options -= parseFloat(d.data("price"))) : (c.options += parseFloat(d.data("price"))), d.hasClass("is-selected") ? d.removeClass("is-selected") : d.addClass("is-selected")),
                            e();
                    },
                    e = function () {
                        var a = parseFloat(c.base + c.options);
                        b("#total-offre").find(".price b").html(a.toFixed(2).replace(".", ","));
                    };
                a.on("change", function () {
                    console.log("change ", b(this)), d(b(this));
                }),
                    e(),
                    a.each(function (a, c) {
                        b(c).prop("checked") && d(b(c));
                    });
            }
        }),
            b("form")
                .find(".js-display-toggle")
                .each(function () {
                    b(this).on("change", function () {
                        b(b(this).data("target")).toggle();
                    }),
                        b(this).is(":checked") && b(b(this).data("target")).toggle();
                });
    })(window, jQuery),
    (function (a, b) {
        "object" == typeof exports && "object" == typeof module ? (module.exports = b()) : "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? (exports.Cleave = b()) : (a.Cleave = b());
    })(this, function () {
        return (function (a) {
            function b(d) {
                if (c[d]) return c[d].exports;
                var e = (c[d] = { exports: {}, id: d, loaded: !1 });
                return a[d].call(e.exports, e, e.exports, b), (e.loaded = !0), e.exports;
            }
            var c = {};
            return (b.m = a), (b.c = c), (b.p = ""), b(0);
        })([
            function (a, b, c) {
                (function (b) {
                    "use strict";
                    var d = function (a, b) {
                        var c = this;
                        if (((c.element = "string" == typeof a ? document.querySelector(a) : void 0 !== a.length && a.length > 0 ? a[0] : a), !c.element)) throw new Error("[cleave.js] Please check the element");
                        (b.initValue = c.element.value), (c.properties = d.DefaultProperties.assign({}, b)), c.init();
                    };
                    (d.prototype = {
                        init: function () {
                            var a = this,
                                b = a.properties;
                            if (!(b.numeral || b.phone || b.creditCard || b.time || b.date || 0 !== b.blocksLength || b.prefix)) return void a.onInput(b.initValue);
                            (b.maxLength = d.Util.getMaxLength(b.blocks)),
                                (a.isAndroid = d.Util.isAndroid()),
                                (a.lastInputValue = ""),
                                (a.onChangeListener = a.onChange.bind(a)),
                                (a.onKeyDownListener = a.onKeyDown.bind(a)),
                                (a.onFocusListener = a.onFocus.bind(a)),
                                (a.onCutListener = a.onCut.bind(a)),
                                (a.onCopyListener = a.onCopy.bind(a)),
                                a.element.addEventListener("input", a.onChangeListener),
                                a.element.addEventListener("keydown", a.onKeyDownListener),
                                a.element.addEventListener("focus", a.onFocusListener),
                                a.element.addEventListener("cut", a.onCutListener),
                                a.element.addEventListener("copy", a.onCopyListener),
                                a.initPhoneFormatter(),
                                a.initDateFormatter(),
                                a.initTimeFormatter(),
                                a.initNumeralFormatter(),
                                (b.initValue || (b.prefix && !b.noImmediatePrefix)) && a.onInput(b.initValue);
                        },
                        initNumeralFormatter: function () {
                            var a = this,
                                b = a.properties;
                            b.numeral &&
                                (b.numeralFormatter = new d.NumeralFormatter(b.numeralDecimalMark, b.numeralIntegerScale, b.numeralDecimalScale, b.numeralThousandsGroupStyle, b.numeralPositiveOnly, b.stripLeadingZeroes, b.delimiter));
                        },
                        initTimeFormatter: function () {
                            var a = this,
                                b = a.properties;
                            b.time && ((b.timeFormatter = new d.TimeFormatter(b.timePattern)), (b.blocks = b.timeFormatter.getBlocks()), (b.blocksLength = b.blocks.length), (b.maxLength = d.Util.getMaxLength(b.blocks)));
                        },
                        initDateFormatter: function () {
                            var a = this,
                                b = a.properties;
                            b.date && ((b.dateFormatter = new d.DateFormatter(b.datePattern)), (b.blocks = b.dateFormatter.getBlocks()), (b.blocksLength = b.blocks.length), (b.maxLength = d.Util.getMaxLength(b.blocks)));
                        },
                        initPhoneFormatter: function () {
                            var a = this,
                                b = a.properties;
                            if (b.phone)
                                try {
                                    b.phoneFormatter = new d.PhoneFormatter(new b.root.Cleave.AsYouTypeFormatter(b.phoneRegionCode), b.delimiter);
                                } catch (a) {
                                    throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib");
                                }
                        },
                        onKeyDown: function (a) {
                            var b = this,
                                c = b.properties,
                                e = a.which || a.keyCode,
                                f = d.Util,
                                g = b.element.value;
                            if ((229 === e && f.isAndroidBackspaceKeydown(b.lastInputValue, g) && (e = 8), (b.lastInputValue = g), 8 === e && f.isDelimiter(g.slice(-c.delimiterLength), c.delimiter, c.delimiters)))
                                return void (c.backspace = !0);
                            c.backspace = !1;
                        },
                        onChange: function () {
                            this.onInput(this.element.value);
                        },
                        onFocus: function () {
                            var a = this,
                                b = a.properties;
                            d.Util.fixPrefixCursor(a.element, b.prefix, b.delimiter, b.delimiters);
                        },
                        onCut: function (a) {
                            this.copyClipboardData(a), this.onInput("");
                        },
                        onCopy: function (a) {
                            this.copyClipboardData(a);
                        },
                        copyClipboardData: function (a) {
                            var b = this,
                                c = b.properties,
                                e = d.Util,
                                f = b.element.value,
                                g = "";
                            g = c.copyDelimiter ? f : e.stripDelimiters(f, c.delimiter, c.delimiters);
                            try {
                                a.clipboardData ? a.clipboardData.setData("Text", g) : window.clipboardData.setData("Text", g), a.preventDefault();
                            } catch (a) {}
                        },
                        onInput: function (a) {
                            var b = this,
                                c = b.properties,
                                e = d.Util;
                            return (
                                c.numeral || !c.backspace || e.isDelimiter(a.slice(-c.delimiterLength), c.delimiter, c.delimiters) || (a = e.headStr(a, a.length - c.delimiterLength)),
                                c.phone
                                    ? (!c.prefix || (c.noImmediatePrefix && !a.length) ? (c.result = c.phoneFormatter.format(a)) : (c.result = c.prefix + c.phoneFormatter.format(a).slice(c.prefix.length)), void b.updateValueState())
                                    : c.numeral
                                    ? (!c.prefix || (c.noImmediatePrefix && !a.length) ? (c.result = c.numeralFormatter.format(a)) : (c.result = c.prefix + c.numeralFormatter.format(a)), void b.updateValueState())
                                    : (c.date && (a = c.dateFormatter.getValidatedDate(a)),
                                      c.time && (a = c.timeFormatter.getValidatedTime(a)),
                                      (a = e.stripDelimiters(a, c.delimiter, c.delimiters)),
                                      (a = e.getPrefixStrippedValue(a, c.prefix, c.prefixLength, c.result)),
                                      (a = c.numericOnly ? e.strip(a, /[^\d]/g) : a),
                                      (a = c.uppercase ? a.toUpperCase() : a),
                                      (a = c.lowercase ? a.toLowerCase() : a),
                                      !c.prefix || (c.noImmediatePrefix && !a.length) || ((a = c.prefix + a), 0 !== c.blocksLength)
                                          ? (c.creditCard && b.updateCreditCardPropsByValue(a),
                                            (a = e.headStr(a, c.maxLength)),
                                            (c.result = e.getFormattedValue(a, c.blocks, c.blocksLength, c.delimiter, c.delimiters, c.delimiterLazyShow)),
                                            void b.updateValueState())
                                          : ((c.result = a), void b.updateValueState()))
                            );
                        },
                        updateCreditCardPropsByValue: function (a) {
                            var b,
                                c = this,
                                e = c.properties,
                                f = d.Util;
                            f.headStr(e.result, 4) !== f.headStr(a, 4) &&
                                ((b = d.CreditCardDetector.getInfo(a, e.creditCardStrictMode)),
                                (e.blocks = b.blocks),
                                (e.blocksLength = e.blocks.length),
                                (e.maxLength = f.getMaxLength(e.blocks)),
                                e.creditCardType !== b.type && ((e.creditCardType = b.type), e.onCreditCardTypeChanged.call(c, e.creditCardType)));
                        },
                        updateValueState: function () {
                            var a = this,
                                b = d.Util,
                                c = a.properties;
                            if (a.element) {
                                var e = a.element.selectionEnd,
                                    f = a.element.value,
                                    g = c.result;
                                if (((e = b.getNextCursorPosition(e, f, g, c.delimiter, c.delimiters)), a.isAndroid))
                                    return void window.setTimeout(function () {
                                        (a.element.value = g), b.setSelection(a.element, e, c.document, !1), a.callOnValueChanged();
                                    }, 1);
                                (a.element.value = g), b.setSelection(a.element, e, c.document, !1), a.callOnValueChanged();
                            }
                        },
                        callOnValueChanged: function () {
                            var a = this,
                                b = a.properties;
                            b.onValueChanged.call(a, { target: { value: b.result, rawValue: a.getRawValue() } });
                        },
                        setPhoneRegionCode: function (a) {
                            var b = this;
                            (b.properties.phoneRegionCode = a), b.initPhoneFormatter(), b.onChange();
                        },
                        setRawValue: function (a) {
                            var b = this,
                                c = b.properties;
                            (a = void 0 !== a && null !== a ? a.toString() : ""), c.numeral && (a = a.replace(".", c.numeralDecimalMark)), (c.backspace = !1), (b.element.value = a), b.onInput(a);
                        },
                        getRawValue: function () {
                            var a = this,
                                b = a.properties,
                                c = d.Util,
                                e = a.element.value;
                            return b.rawValueTrimPrefix && (e = c.getPrefixStrippedValue(e, b.prefix, b.prefixLength, b.result)), (e = b.numeral ? b.numeralFormatter.getRawValue(e) : c.stripDelimiters(e, b.delimiter, b.delimiters));
                        },
                        getISOFormatDate: function () {
                            var a = this,
                                b = a.properties;
                            return b.date ? b.dateFormatter.getISOFormatDate() : "";
                        },
                        getFormattedValue: function () {
                            return this.element.value;
                        },
                        destroy: function () {
                            var a = this;
                            a.element.removeEventListener("input", a.onChangeListener),
                                a.element.removeEventListener("keydown", a.onKeyDownListener),
                                a.element.removeEventListener("focus", a.onFocusListener),
                                a.element.removeEventListener("cut", a.onCutListener),
                                a.element.removeEventListener("copy", a.onCopyListener);
                        },
                        toString: function () {
                            return "[Cleave Object]";
                        },
                    }),
                        (d.NumeralFormatter = c(1)),
                        (d.DateFormatter = c(2)),
                        (d.TimeFormatter = c(3)),
                        (d.PhoneFormatter = c(4)),
                        (d.CreditCardDetector = c(5)),
                        (d.Util = c(6)),
                        (d.DefaultProperties = c(7)),
                        (("object" == typeof b && b ? b : window).Cleave = d),
                        (a.exports = d);
                }.call(
                    b,
                    (function () {
                        return this;
                    })()
                ));
            },
            function (a, b) {
                "use strict";
                var c = function (a, b, d, e, f, g, h) {
                    var i = this;
                    (i.numeralDecimalMark = a || "."),
                        (i.numeralIntegerScale = b > 0 ? b : 0),
                        (i.numeralDecimalScale = d >= 0 ? d : 2),
                        (i.numeralThousandsGroupStyle = e || c.groupStyle.thousand),
                        (i.numeralPositiveOnly = !!f),
                        (i.stripLeadingZeroes = !1 !== g),
                        (i.delimiter = h || "" === h ? h : ","),
                        (i.delimiterRE = h ? new RegExp("\\" + h, "g") : "");
                };
                (c.groupStyle = { thousand: "thousand", lakh: "lakh", wan: "wan", none: "none" }),
                    (c.prototype = {
                        getRawValue: function (a) {
                            return a.replace(this.delimiterRE, "").replace(this.numeralDecimalMark, ".");
                        },
                        format: function (a) {
                            var b,
                                d,
                                e = this,
                                f = "";
                            switch (
                                ((a = a
                                    .replace(/[A-Za-z]/g, "")
                                    .replace(e.numeralDecimalMark, "M")
                                    .replace(/[^\dM-]/g, "")
                                    .replace(/^\-/, "N")
                                    .replace(/\-/g, "")
                                    .replace("N", e.numeralPositiveOnly ? "" : "-")
                                    .replace("M", e.numeralDecimalMark)),
                                e.stripLeadingZeroes && (a = a.replace(/^(-)?0+(?=\d)/, "$1")),
                                (d = a),
                                a.indexOf(e.numeralDecimalMark) >= 0 && ((b = a.split(e.numeralDecimalMark)), (d = b[0]), (f = e.numeralDecimalMark + b[1].slice(0, e.numeralDecimalScale))),
                                e.numeralIntegerScale > 0 && (d = d.slice(0, e.numeralIntegerScale + ("-" === a.slice(0, 1) ? 1 : 0))),
                                e.numeralThousandsGroupStyle)
                            ) {
                                case c.groupStyle.lakh:
                                    d = d.replace(/(\d)(?=(\d\d)+\d$)/g, "$1" + e.delimiter);
                                    break;
                                case c.groupStyle.wan:
                                    d = d.replace(/(\d)(?=(\d{4})+$)/g, "$1" + e.delimiter);
                                    break;
                                case c.groupStyle.thousand:
                                    d = d.replace(/(\d)(?=(\d{3})+$)/g, "$1" + e.delimiter);
                            }
                            return d.toString() + (e.numeralDecimalScale > 0 ? f.toString() : "");
                        },
                    }),
                    (a.exports = c);
            },
            function (a, b) {
                "use strict";
                var c = function (a) {
                    var b = this;
                    (b.date = []), (b.blocks = []), (b.datePattern = a), b.initBlocks();
                };
                (c.prototype = {
                    initBlocks: function () {
                        var a = this;
                        a.datePattern.forEach(function (b) {
                            "Y" === b ? a.blocks.push(4) : a.blocks.push(2);
                        });
                    },
                    getISOFormatDate: function () {
                        var a = this,
                            b = a.date;
                        return b[2] ? b[2] + "-" + a.addLeadingZero(b[1]) + "-" + a.addLeadingZero(b[0]) : "";
                    },
                    getBlocks: function () {
                        return this.blocks;
                    },
                    getValidatedDate: function (a) {
                        var b = this,
                            c = "";
                        return (
                            (a = a.replace(/[^\d]/g, "")),
                            b.blocks.forEach(function (d, e) {
                                if (a.length > 0) {
                                    var f = a.slice(0, d),
                                        g = f.slice(0, 1),
                                        h = a.slice(d);
                                    switch (b.datePattern[e]) {
                                        case "d":
                                            "00" === f ? (f = "01") : parseInt(g, 10) > 3 ? (f = "0" + g) : parseInt(f, 10) > 31 && (f = "31");
                                            break;
                                        case "m":
                                            "00" === f ? (f = "01") : parseInt(g, 10) > 1 ? (f = "0" + g) : parseInt(f, 10) > 12 && (f = "12");
                                    }
                                    (c += f), (a = h);
                                }
                            }),
                            this.getFixedDateString(c)
                        );
                    },
                    getFixedDateString: function (a) {
                        var b,
                            c,
                            d,
                            e = this,
                            f = e.datePattern,
                            g = [],
                            h = 0,
                            i = 0,
                            j = 0,
                            k = 0,
                            l = 0,
                            m = 0,
                            n = !1;
                        return (
                            4 === a.length &&
                                "y" !== f[0].toLowerCase() &&
                                "y" !== f[1].toLowerCase() &&
                                ((k = "d" === f[0] ? 0 : 2), (l = 2 - k), (b = parseInt(a.slice(k, k + 2), 10)), (c = parseInt(a.slice(l, l + 2), 10)), (g = this.getFixedDate(b, c, 0))),
                            8 === a.length &&
                                (f.forEach(function (a, b) {
                                    switch (a) {
                                        case "d":
                                            h = b;
                                            break;
                                        case "m":
                                            i = b;
                                            break;
                                        default:
                                            j = b;
                                    }
                                }),
                                (m = 2 * j),
                                (k = h <= j ? 2 * h : 2 * h + 2),
                                (l = i <= j ? 2 * i : 2 * i + 2),
                                (b = parseInt(a.slice(k, k + 2), 10)),
                                (c = parseInt(a.slice(l, l + 2), 10)),
                                (d = parseInt(a.slice(m, m + 4), 10)),
                                (n = 4 === a.slice(m, m + 4).length),
                                (g = this.getFixedDate(b, c, d))),
                            (e.date = g),
                            0 === g.length
                                ? a
                                : f.reduce(function (a, b) {
                                      switch (b) {
                                          case "d":
                                              return a + e.addLeadingZero(g[0]);
                                          case "m":
                                              return a + e.addLeadingZero(g[1]);
                                          default:
                                              return a + (n ? e.addLeadingZeroForYear(g[2]) : "");
                                      }
                                  }, "")
                        );
                    },
                    getFixedDate: function (a, b, c) {
                        return (a = Math.min(a, 31)), (b = Math.min(b, 12)), (c = parseInt(c || 0, 10)), ((b < 7 && b % 2 == 0) || (b > 8 && b % 2 == 1)) && (a = Math.min(a, 2 === b ? (this.isLeapYear(c) ? 29 : 28) : 30)), [a, b, c];
                    },
                    isLeapYear: function (a) {
                        return (a % 4 == 0 && a % 100 != 0) || a % 400 == 0;
                    },
                    addLeadingZero: function (a) {
                        return (a < 10 ? "0" : "") + a;
                    },
                    addLeadingZeroForYear: function (a) {
                        return (a < 10 ? "000" : a < 100 ? "00" : a < 1e3 ? "0" : "") + a;
                    },
                }),
                    (a.exports = c);
            },
            function (a, b) {
                "use strict";
                var c = function (a) {
                    var b = this;
                    (b.time = []), (b.blocks = []), (b.timePattern = a), b.initBlocks();
                };
                (c.prototype = {
                    initBlocks: function () {
                        var a = this;
                        a.timePattern.forEach(function () {
                            a.blocks.push(2);
                        });
                    },
                    getISOFormatTime: function () {
                        var a = this,
                            b = a.time;
                        return b[2] ? a.addLeadingZero(b[0]) + ":" + a.addLeadingZero(b[1]) + ":" + a.addLeadingZero(b[2]) : "";
                    },
                    getBlocks: function () {
                        return this.blocks;
                    },
                    getValidatedTime: function (a) {
                        var b = this,
                            c = "";
                        return (
                            (a = a.replace(/[^\d]/g, "")),
                            b.blocks.forEach(function (d, e) {
                                if (a.length > 0) {
                                    var f = a.slice(0, d),
                                        g = f.slice(0, 1),
                                        h = a.slice(d);
                                    switch (b.timePattern[e]) {
                                        case "h":
                                            parseInt(g, 10) > 2 ? (f = "0" + g) : parseInt(f, 10) > 23 && (f = "23");
                                            break;
                                        case "m":
                                        case "s":
                                            parseInt(g, 10) > 5 ? (f = "0" + g) : parseInt(f, 10) > 60 && (f = "60");
                                    }
                                    (c += f), (a = h);
                                }
                            }),
                            this.getFixedTimeString(c)
                        );
                    },
                    getFixedTimeString: function (a) {
                        var b,
                            c,
                            d,
                            e = this,
                            f = e.timePattern,
                            g = [],
                            h = 0,
                            i = 0,
                            j = 0,
                            k = 0,
                            l = 0,
                            m = 0;
                        return (
                            6 === a.length &&
                                (f.forEach(function (a, b) {
                                    switch (a) {
                                        case "s":
                                            h = 2 * b;
                                            break;
                                        case "m":
                                            i = 2 * b;
                                            break;
                                        case "h":
                                            j = 2 * b;
                                    }
                                }),
                                (m = j),
                                (l = i),
                                (k = h),
                                (b = parseInt(a.slice(k, k + 2), 10)),
                                (c = parseInt(a.slice(l, l + 2), 10)),
                                (d = parseInt(a.slice(m, m + 2), 10)),
                                (g = this.getFixedTime(d, c, b))),
                            4 === a.length &&
                                e.timePattern.indexOf("s") < 0 &&
                                (f.forEach(function (a, b) {
                                    switch (a) {
                                        case "m":
                                            i = 2 * b;
                                            break;
                                        case "h":
                                            j = 2 * b;
                                    }
                                }),
                                (m = j),
                                (l = i),
                                (b = 0),
                                (c = parseInt(a.slice(l, l + 2), 10)),
                                (d = parseInt(a.slice(m, m + 2), 10)),
                                (g = this.getFixedTime(d, c, b))),
                            (e.time = g),
                            0 === g.length
                                ? a
                                : f.reduce(function (a, b) {
                                      switch (b) {
                                          case "s":
                                              return a + e.addLeadingZero(g[2]);
                                          case "m":
                                              return a + e.addLeadingZero(g[1]);
                                          case "h":
                                              return a + e.addLeadingZero(g[0]);
                                      }
                                  }, "")
                        );
                    },
                    getFixedTime: function (a, b, c) {
                        return (c = Math.min(parseInt(c || 0, 10), 60)), (b = Math.min(b, 60)), (a = Math.min(a, 60)), [a, b, c];
                    },
                    addLeadingZero: function (a) {
                        return (a < 10 ? "0" : "") + a;
                    },
                }),
                    (a.exports = c);
            },
            function (a, b) {
                "use strict";
                var c = function (a, b) {
                    var c = this;
                    (c.delimiter = b || "" === b ? b : " "), (c.delimiterRE = b ? new RegExp("\\" + b, "g") : ""), (c.formatter = a);
                };
                (c.prototype = {
                    setFormatter: function (a) {
                        this.formatter = a;
                    },
                    format: function (a) {
                        var b = this;
                        b.formatter.clear(), (a = a.replace(/[^\d+]/g, "")), (a = a.replace(/^\+/, "B").replace(/\+/g, "").replace("B", "+")), (a = a.replace(b.delimiterRE, ""));
                        for (var c, d = "", e = !1, f = 0, g = a.length; f < g; f++) (c = b.formatter.inputDigit(a.charAt(f))), /[\s()-]/g.test(c) ? ((d = c), (e = !0)) : e || (d = c);
                        return (d = d.replace(/[()]/g, "")), (d = d.replace(/[\s-]/g, b.delimiter));
                    },
                }),
                    (a.exports = c);
            },
            function (a, b) {
                "use strict";
                var c = {
                    blocks: {
                        uatp: [4, 5, 6],
                        amex: [4, 6, 5],
                        diners: [4, 6, 4],
                        discover: [4, 4, 4, 4],
                        mastercard: [4, 4, 4, 4],
                        dankort: [4, 4, 4, 4],
                        instapayment: [4, 4, 4, 4],
                        jcb15: [4, 6, 5],
                        jcb: [4, 4, 4, 4],
                        maestro: [4, 4, 4, 4],
                        visa: [4, 4, 4, 4],
                        mir: [4, 4, 4, 4],
                        unionPay: [4, 4, 4, 4],
                        general: [4, 4, 4, 4],
                        generalStrict: [4, 4, 4, 7],
                    },
                    re: {
                        uatp: /^(?!1800)1\d{0,14}/,
                        amex: /^3[47]\d{0,13}/,
                        discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
                        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
                        mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
                        dankort: /^(5019|4175|4571)\d{0,12}/,
                        instapayment: /^63[7-9]\d{0,13}/,
                        jcb15: /^(?:2131|1800)\d{0,11}/,
                        jcb: /^(?:35\d{0,2})\d{0,12}/,
                        maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
                        mir: /^220[0-4]\d{0,12}/,
                        visa: /^4\d{0,15}/,
                        unionPay: /^62\d{0,14}/,
                    },
                    getInfo: function (a, b) {
                        var d = c.blocks,
                            e = c.re;
                        b = !!b;
                        for (var f in e)
                            if (e[f].test(a)) {
                                var g;
                                return (g = b ? d.generalStrict : d[f]), { type: f, blocks: g };
                            }
                        return { type: "unknown", blocks: b ? d.generalStrict : d.general };
                    },
                };
                a.exports = c;
            },
            function (a, b) {
                "use strict";
                var c = {
                    noop: function () {},
                    strip: function (a, b) {
                        return a.replace(b, "");
                    },
                    isDelimiter: function (a, b, c) {
                        return 0 === c.length
                            ? a === b
                            : c.some(function (b) {
                                  if (a === b) return !0;
                              });
                    },
                    getDelimiterREByDelimiter: function (a) {
                        return new RegExp(a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g");
                    },
                    getNextCursorPosition: function (a, b, c, d, e) {
                        return b.length === a ? c.length : a + this.getPositionOffset(a, b, c, d, e);
                    },
                    getPositionOffset: function (a, b, c, d, e) {
                        var f, g, h;
                        return (f = this.stripDelimiters(b.slice(0, a), d, e)), (g = this.stripDelimiters(c.slice(0, a), d, e)), (h = f.length - g.length), 0 !== h ? h / Math.abs(h) : 0;
                    },
                    stripDelimiters: function (a, b, c) {
                        var d = this;
                        if (0 === c.length) {
                            var e = b ? d.getDelimiterREByDelimiter(b) : "";
                            return a.replace(e, "");
                        }
                        return (
                            c.forEach(function (b) {
                                a = a.replace(d.getDelimiterREByDelimiter(b), "");
                            }),
                            a
                        );
                    },
                    headStr: function (a, b) {
                        return a.slice(0, b);
                    },
                    getMaxLength: function (a) {
                        return a.reduce(function (a, b) {
                            return a + b;
                        }, 0);
                    },
                    getPrefixStrippedValue: function (a, b, c, d) {
                        if (a.slice(0, c) !== b)
                            if (a.length < d.length) a = a.length > c ? d : b;
                            else {
                                var e = this.getFirstDiffIndex(b, a.slice(0, c));
                                a = b + a.slice(e, e + 1) + a.slice(c + 1);
                            }
                        return a.slice(c);
                    },
                    getFirstDiffIndex: function (a, b) {
                        for (var c = 0; a.charAt(c) === b.charAt(c); ) if ("" === a.charAt(c++)) return -1;
                        return c;
                    },
                    getFormattedValue: function (a, b, c, d, e, f) {
                        var g,
                            h = "",
                            i = e.length > 0;
                        return 0 === c
                            ? a
                            : (b.forEach(function (b, j) {
                                  if (a.length > 0) {
                                      var k = a.slice(0, b),
                                          l = a.slice(b);
                                      (g = i ? e[f ? j - 1 : j] || g : d), f ? (j > 0 && (h += g), (h += k)) : ((h += k), k.length === b && j < c - 1 && (h += g)), (a = l);
                                  }
                              }),
                              h);
                    },
                    fixPrefixCursor: function (a, b, c, d) {
                        if (a) {
                            var e = a.value,
                                f = c || d[0] || " ";
                            if (a.setSelectionRange && b && !(b.length + f.length < e.length)) {
                                var g = 2 * e.length;
                                setTimeout(function () {
                                    a.setSelectionRange(g, g);
                                }, 1);
                            }
                        }
                    },
                    setSelection: function (a, b, c) {
                        if (a === this.getActiveElement(c) && !(a && a.value.length <= b))
                            if (a.createTextRange) {
                                var d = a.createTextRange();
                                d.move("character", b), d.select();
                            } else
                                try {
                                    a.setSelectionRange(b, b);
                                } catch (a) {
                                    console.warn("The input element type does not support selection");
                                }
                    },
                    getActiveElement: function (a) {
                        var b = a.activeElement;
                        return b && b.shadowRoot ? this.getActiveElement(b.shadowRoot) : b;
                    },
                    isAndroid: function () {
                        return navigator && /android/i.test(navigator.userAgent);
                    },
                    isAndroidBackspaceKeydown: function (a, b) {
                        return !!(this.isAndroid() && a && b) && b === a.slice(0, -1);
                    },
                };
                a.exports = c;
            },
            function (a, b) {
                (function (b) {
                    "use strict";
                    var c = {
                        assign: function (a, c) {
                            return (
                                (a = a || {}),
                                (c = c || {}),
                                (a.creditCard = !!c.creditCard),
                                (a.creditCardStrictMode = !!c.creditCardStrictMode),
                                (a.creditCardType = ""),
                                (a.onCreditCardTypeChanged = c.onCreditCardTypeChanged || function () {}),
                                (a.phone = !!c.phone),
                                (a.phoneRegionCode = c.phoneRegionCode || "AU"),
                                (a.phoneFormatter = {}),
                                (a.time = !!c.time),
                                (a.timePattern = c.timePattern || ["h", "m", "s"]),
                                (a.timeFormatter = {}),
                                (a.date = !!c.date),
                                (a.datePattern = c.datePattern || ["d", "m", "Y"]),
                                (a.dateFormatter = {}),
                                (a.numeral = !!c.numeral),
                                (a.numeralIntegerScale = c.numeralIntegerScale > 0 ? c.numeralIntegerScale : 0),
                                (a.numeralDecimalScale = c.numeralDecimalScale >= 0 ? c.numeralDecimalScale : 2),
                                (a.numeralDecimalMark = c.numeralDecimalMark || "."),
                                (a.numeralThousandsGroupStyle = c.numeralThousandsGroupStyle || "thousand"),
                                (a.numeralPositiveOnly = !!c.numeralPositiveOnly),
                                (a.stripLeadingZeroes = !1 !== c.stripLeadingZeroes),
                                (a.numericOnly = a.creditCard || a.date || !!c.numericOnly),
                                (a.uppercase = !!c.uppercase),
                                (a.lowercase = !!c.lowercase),
                                (a.prefix = a.creditCard || a.date ? "" : c.prefix || ""),
                                (a.noImmediatePrefix = !!c.noImmediatePrefix),
                                (a.prefixLength = a.prefix.length),
                                (a.rawValueTrimPrefix = !!c.rawValueTrimPrefix),
                                (a.copyDelimiter = !!c.copyDelimiter),
                                (a.initValue = void 0 !== c.initValue && null !== c.initValue ? c.initValue.toString() : ""),
                                (a.delimiter = c.delimiter || "" === c.delimiter ? c.delimiter : c.date ? "/" : c.time ? ":" : c.numeral ? "," : (c.phone, " ")),
                                (a.delimiterLength = a.delimiter.length),
                                (a.delimiterLazyShow = !!c.delimiterLazyShow),
                                (a.delimiters = c.delimiters || []),
                                (a.blocks = c.blocks || []),
                                (a.blocksLength = a.blocks.length),
                                (a.root = "object" == typeof b && b ? b : window),
                                (a.document = c.document || a.root.document),
                                (a.maxLength = 0),
                                (a.backspace = !1),
                                (a.result = ""),
                                (a.onValueChanged = c.onValueChanged || function () {}),
                                a
                            );
                        },
                    };
                    a.exports = c;
                }.call(
                    b,
                    (function () {
                        return this;
                    })()
                ));
            },
        ]);
    }),
    function () {
        function a(a, b) {
            var c = a.split("."),
                d = P;
            c[0] in d || !d.execScript || d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift()); ) c.length || void 0 === b ? (d = d[e] ? d[e] : (d[e] = {})) : (d[e] = b);
        }
        function b(a, b) {
            function c() {}
            (c.prototype = b.prototype),
                (a.M = b.prototype),
                (a.prototype = new c()),
                (a.prototype.constructor = a),
                (a.N = function (a, c, d) {
                    for (var e = Array(arguments.length - 2), f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
                    return b.prototype[c].apply(a, e);
                });
        }
        function c(a, b) {
            null != a && this.a.apply(this, arguments);
        }
        function d(a) {
            a.b = "";
        }
        function e(a, b) {
            a.sort(b || f);
        }
        function f(a, b) {
            return a > b ? 1 : b > a ? -1 : 0;
        }
        function g(a) {
            var b,
                c = [],
                d = 0;
            for (b in a) c[d++] = a[b];
            return c;
        }
        function h(a, b) {
            (this.b = a), (this.a = {});
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                this.a[d.b] = d;
            }
        }
        function i(a) {
            return (
                (a = g(a.a)),
                e(a, function (a, b) {
                    return a.b - b.b;
                }),
                a
            );
        }
        function j(a, b) {
            switch (((this.b = a), (this.g = !!b.G), (this.a = b.c), (this.j = b.type), (this.h = !1), this.a)) {
                case S:
                case T:
                case U:
                case V:
                case W:
                case R:
                case Q:
                    this.h = !0;
            }
            this.f = b.defaultValue;
        }
        function k() {
            (this.a = {}), (this.f = this.i().a), (this.b = this.g = null);
        }
        function l(a, b) {
            for (var c = i(a.i()), d = 0; d < c.length; d++) {
                var e = c[d],
                    f = e.b;
                if (null != b.a[f]) {
                    a.b && delete a.b[e.b];
                    var g = 11 == e.a || 10 == e.a;
                    if (e.g)
                        for (var e = m(b, f) || [], h = 0; h < e.length; h++) {
                            var j = a,
                                k = f,
                                n = g ? e[h].clone() : e[h];
                            j.a[k] || (j.a[k] = []), j.a[k].push(n), j.b && delete j.b[k];
                        }
                    else (e = m(b, f)), g ? ((g = m(a, f)) ? l(g, e) : q(a, f, e.clone())) : q(a, f, e);
                }
            }
        }
        function m(a, b) {
            var c = a.a[b];
            if (null == c) return null;
            if (a.g) {
                if (!(b in a.b)) {
                    var d = a.g,
                        e = a.f[b];
                    if (null != c)
                        if (e.g) {
                            for (var f = [], g = 0; g < c.length; g++) f[g] = d.b(e, c[g]);
                            c = f;
                        } else c = d.b(e, c);
                    return (a.b[b] = c);
                }
                return a.b[b];
            }
            return c;
        }
        function n(a, b, c) {
            var d = m(a, b);
            return a.f[b].g ? d[c || 0] : d;
        }
        function o(a, b) {
            var c;
            if (null != a.a[b]) c = n(a, b, void 0);
            else
                a: {
                    if (((c = a.f[b]), void 0 === c.f)) {
                        var d = c.j;
                        if (d === Boolean) c.f = !1;
                        else if (d === Number) c.f = 0;
                        else {
                            if (d !== String) {
                                c = new d();
                                break a;
                            }
                            c.f = c.h ? "0" : "";
                        }
                    }
                    c = c.f;
                }
            return c;
        }
        function p(a, b) {
            return a.f[b].g ? (null != a.a[b] ? a.a[b].length : 0) : null != a.a[b] ? 1 : 0;
        }
        function q(a, b, c) {
            (a.a[b] = c), a.b && (a.b[b] = c);
        }
        function r(a, b) {
            var c,
                d = [];
            for (c in b) 0 != c && d.push(new j(c, b[c]));
            return new h(a, d);
        }
        function s() {
            k.call(this);
        }
        function t() {
            k.call(this);
        }
        function u() {
            k.call(this);
        }
        function v() {}
        function w() {}
        function x() {}
        function y() {
            this.a = {};
        }
        function z(a, b) {
            if (null == b) return null;
            b = b.toUpperCase();
            var c = a.a[b];
            if (null == c) {
                if (null == (c = aa[b])) return null;
                (c = new x().a(u.i(), c)), (a.a[b] = c);
            }
            return c;
        }
        function A(a) {
            return (a = _[a]), null == a ? "ZZ" : a[0];
        }
        function B(a) {
            (this.H = RegExp(" ")),
                (this.B = ""),
                (this.m = new c()),
                (this.v = ""),
                (this.h = new c()),
                (this.u = new c()),
                (this.j = !0),
                (this.w = this.o = this.D = !1),
                (this.F = y.b()),
                (this.s = 0),
                (this.b = new c()),
                (this.A = !1),
                (this.l = ""),
                (this.a = new c()),
                (this.f = []),
                (this.C = a),
                (this.J = this.g = C(this, this.C));
        }
        function C(a, b) {
            var c;
            if (null != b && isNaN(b) && b.toUpperCase() in aa) {
                if (null == (c = z(a.F, b))) throw "Invalid region code: " + b;
                c = o(c, 10);
            } else c = 0;
            return (c = z(a.F, A(c))), null != c ? c : fa;
        }
        function D(a) {
            for (var b = a.f.length, c = 0; b > c; ++c) {
                var e = a.f[c],
                    f = o(e, 1);
                if (a.v == f) return !1;
                var g;
                g = a;
                var h = e,
                    i = o(h, 1);
                if (-1 != i.indexOf("|")) g = !1;
                else {
                    (i = i.replace(ga, "\\d")), (i = i.replace(ha, "\\d")), d(g.m);
                    var j;
                    j = g;
                    var h = o(h, 2),
                        k = "999999999999999".match(i)[0];
                    k.length < j.a.b.length ? (j = "") : ((j = k.replace(new RegExp(i, "g"), h)), (j = j.replace(RegExp("9", "g"), " "))), 0 < j.length ? (g.m.a(j), (g = !0)) : (g = !1);
                }
                if (g) return (a.v = f), (a.A = ja.test(n(e, 4))), (a.s = 0), !0;
            }
            return (a.j = !1);
        }
        function E(a, b) {
            for (var c = [], d = b.length - 3, e = a.f.length, f = 0; e > f; ++f) {
                var g = a.f[f];
                0 == p(g, 3) ? c.push(a.f[f]) : ((g = n(g, 3, Math.min(d, p(g, 3) - 1))), 0 == b.search(g) && c.push(a.f[f]));
            }
            a.f = c;
        }
        function F(a, b) {
            a.h.a(b);
            var c = b;
            if (da.test(c) || (1 == a.h.b.length && ca.test(c))) {
                var e,
                    c = b;
                "+" == c ? ((e = c), a.u.a(c)) : ((e = ba[c]), a.u.a(e), a.a.a(e)), (b = e);
            } else (a.j = !1), (a.D = !0);
            if (!a.j) {
                if (!a.D)
                    if (M(a)) {
                        if (N(a)) return G(a);
                    } else if ((0 < a.l.length && ((c = a.a.toString()), d(a.a), a.a.a(a.l), a.a.a(c), (c = a.b.toString()), (e = c.lastIndexOf(a.l)), d(a.b), a.b.a(c.substring(0, e))), a.l != L(a))) return a.b.a(" "), G(a);
                return a.h.toString();
            }
            switch (a.u.b.length) {
                case 0:
                case 1:
                case 2:
                    return a.h.toString();
                case 3:
                    if (!M(a)) return (a.l = L(a)), J(a);
                    a.w = !0;
                default:
                    return a.w ? (N(a) && (a.w = !1), a.b.toString() + a.a.toString()) : 0 < a.f.length ? ((c = O(a, b)), (e = H(a)), 0 < e.length ? e : (E(a, a.a.toString()), D(a) ? K(a) : a.j ? I(a, c) : a.h.toString())) : J(a);
            }
        }
        function G(a) {
            return (a.j = !0), (a.w = !1), (a.f = []), (a.s = 0), d(a.m), (a.v = ""), J(a);
        }
        function H(a) {
            for (var b = a.a.toString(), c = a.f.length, d = 0; c > d; ++d) {
                var e = a.f[d],
                    f = o(e, 1);
                if (new RegExp("^(?:" + f + ")$").test(b)) return (a.A = ja.test(n(e, 4))), (b = b.replace(new RegExp(f, "g"), n(e, 2))), I(a, b);
            }
            return "";
        }
        function I(a, b) {
            var c = a.b.b.length;
            return a.A && c > 0 && " " != a.b.toString().charAt(c - 1) ? a.b + " " + b : a.b + b;
        }
        function J(a) {
            var b = a.a.toString();
            if (3 <= b.length) {
                for (var c = a.o && 0 < p(a.g, 20) ? m(a.g, 20) || [] : m(a.g, 19) || [], d = c.length, e = 0; d > e; ++e) {
                    var f,
                        g = c[e];
                    (f = null == a.g.a[12] || a.o || n(g, 6)) || ((f = o(g, 4)), (f = 0 == f.length || ea.test(f))), f && ia.test(o(g, 2)) && a.f.push(g);
                }
                return E(a, b), (b = H(a)), 0 < b.length ? b : D(a) ? K(a) : a.h.toString();
            }
            return I(a, b);
        }
        function K(a) {
            var b = a.a.toString(),
                c = b.length;
            if (c > 0) {
                for (var d = "", e = 0; c > e; e++) d = O(a, b.charAt(e));
                return a.j ? I(a, d) : a.h.toString();
            }
            return a.b.toString();
        }
        function L(a) {
            var b,
                c = a.a.toString(),
                e = 0;
            return (
                1 != n(a.g, 10) ? (b = !1) : ((b = a.a.toString()), (b = "1" == b.charAt(0) && "0" != b.charAt(1) && "1" != b.charAt(1))),
                b
                    ? ((e = 1), a.b.a("1").a(" "), (a.o = !0))
                    : null != a.g.a[15] && ((b = new RegExp("^(?:" + n(a.g, 15) + ")")), null != (b = c.match(b)) && null != b[0] && 0 < b[0].length && ((a.o = !0), (e = b[0].length), a.b.a(c.substring(0, e)))),
                d(a.a),
                a.a.a(c.substring(e)),
                c.substring(0, e)
            );
        }
        function M(a) {
            var b = a.u.toString(),
                c = new RegExp("^(?:\\+|" + n(a.g, 11) + ")"),
                c = b.match(c);
            return null != c && null != c[0] && 0 < c[0].length && ((a.o = !0), (c = c[0].length), d(a.a), a.a.a(b.substring(c)), d(a.b), a.b.a(b.substring(0, c)), "+" != b.charAt(0) && a.b.a(" "), !0);
        }
        function N(a) {
            if (0 == a.a.b.length) return !1;
            var b,
                e = new c();
            a: {
                if (((b = a.a.toString()), 0 != b.length && "0" != b.charAt(0)))
                    for (var f, g = b.length, h = 1; 3 >= h && g >= h; ++h)
                        if ((f = parseInt(b.substring(0, h), 10)) in _) {
                            e.a(b.substring(h)), (b = f);
                            break a;
                        }
                b = 0;
            }
            return 0 != b && (d(a.a), a.a.a(e.toString()), (e = A(b)), "001" == e ? (a.g = z(a.F, "" + b)) : e != a.C && (a.g = C(a, e)), a.b.a("" + b).a(" "), (a.l = ""), !0);
        }
        function O(a, b) {
            var c = a.m.toString();
            if (0 <= c.substring(a.s).search(a.H)) {
                var e = c.search(a.H),
                    c = c.replace(a.H, b);
                return d(a.m), a.m.a(c), (a.s = e), c.substring(0, a.s + 1);
            }
            return 1 == a.f.length && (a.j = !1), (a.v = ""), a.h.toString();
        }
        var P = this;
        (c.prototype.b = ""),
            (c.prototype.set = function (a) {
                this.b = "" + a;
            }),
            (c.prototype.a = function (a, b, c) {
                if (((this.b += String(a)), null != b)) for (var d = 1; d < arguments.length; d++) this.b += arguments[d];
                return this;
            }),
            (c.prototype.toString = function () {
                return this.b;
            });
        var Q = 1,
            R = 2,
            S = 3,
            T = 4,
            U = 6,
            V = 16,
            W = 18;
        (k.prototype.set = function (a, b) {
            q(this, a.b, b);
        }),
            (k.prototype.clone = function () {
                var a = new this.constructor();
                return a != this && ((a.a = {}), a.b && (a.b = {}), l(a, this)), a;
            });
        var X;
        b(s, k);
        var Y;
        b(t, k);
        var Z;
        b(u, k),
            (s.prototype.i = function () {
                return (
                    X ||
                        (X = r(s, {
                            0: { name: "NumberFormat", I: "i18n.phonenumbers.NumberFormat" },
                            1: { name: "pattern", required: !0, c: 9, type: String },
                            2: { name: "format", required: !0, c: 9, type: String },
                            3: { name: "leading_digits_pattern", G: !0, c: 9, type: String },
                            4: { name: "national_prefix_formatting_rule", c: 9, type: String },
                            6: { name: "national_prefix_optional_when_formatting", c: 8, type: Boolean },
                            5: { name: "domestic_carrier_code_formatting_rule", c: 9, type: String },
                        })),
                    X
                );
            }),
            (s.ctor = s),
            (s.ctor.i = s.prototype.i),
            (t.prototype.i = function () {
                return (
                    Y ||
                        (Y = r(t, {
                            0: { name: "PhoneNumberDesc", I: "i18n.phonenumbers.PhoneNumberDesc" },
                            2: { name: "national_number_pattern", c: 9, type: String },
                            3: { name: "possible_number_pattern", c: 9, type: String },
                            6: { name: "example_number", c: 9, type: String },
                            7: { name: "national_number_matcher_data", c: 12, type: String },
                            8: { name: "possible_number_matcher_data", c: 12, type: String },
                        })),
                    Y
                );
            }),
            (t.ctor = t),
            (t.ctor.i = t.prototype.i),
            (u.prototype.i = function () {
                return (
                    Z ||
                        (Z = r(u, {
                            0: { name: "PhoneMetadata", I: "i18n.phonenumbers.PhoneMetadata" },
                            1: { name: "general_desc", c: 11, type: t },
                            2: { name: "fixed_line", c: 11, type: t },
                            3: { name: "mobile", c: 11, type: t },
                            4: { name: "toll_free", c: 11, type: t },
                            5: { name: "premium_rate", c: 11, type: t },
                            6: { name: "shared_cost", c: 11, type: t },
                            7: { name: "personal_number", c: 11, type: t },
                            8: { name: "voip", c: 11, type: t },
                            21: { name: "pager", c: 11, type: t },
                            25: { name: "uan", c: 11, type: t },
                            27: { name: "emergency", c: 11, type: t },
                            28: { name: "voicemail", c: 11, type: t },
                            24: { name: "no_international_dialling", c: 11, type: t },
                            9: { name: "id", required: !0, c: 9, type: String },
                            10: { name: "country_code", c: 5, type: Number },
                            11: { name: "international_prefix", c: 9, type: String },
                            17: { name: "preferred_international_prefix", c: 9, type: String },
                            12: { name: "national_prefix", c: 9, type: String },
                            13: { name: "preferred_extn_prefix", c: 9, type: String },
                            15: { name: "national_prefix_for_parsing", c: 9, type: String },
                            16: { name: "national_prefix_transform_rule", c: 9, type: String },
                            18: { name: "same_mobile_and_fixed_line_pattern", c: 8, defaultValue: !1, type: Boolean },
                            19: { name: "number_format", G: !0, c: 11, type: s },
                            20: { name: "intl_number_format", G: !0, c: 11, type: s },
                            22: { name: "main_country_for_code", c: 8, defaultValue: !1, type: Boolean },
                            23: { name: "leading_digits", c: 9, type: String },
                            26: { name: "leading_zero_possible", c: 8, defaultValue: !1, type: Boolean },
                        })),
                    Z
                );
            }),
            (u.ctor = u),
            (u.ctor.i = u.prototype.i),
            (v.prototype.a = function (a) {
                throw (new a.b(), Error("Unimplemented"));
            }),
            (v.prototype.b = function (a, b) {
                if (11 == a.a || 10 == a.a) return b instanceof k ? b : this.a(a.j.prototype.i(), b);
                if (14 == a.a) {
                    if ("string" == typeof b && $.test(b)) {
                        var c = Number(b);
                        if (c > 0) return c;
                    }
                    return b;
                }
                if (!a.h) return b;
                if ((c = a.j) === String) {
                    if ("number" == typeof b) return String(b);
                } else if (c === Number && "string" == typeof b && ("Infinity" === b || "-Infinity" === b || "NaN" === b || $.test(b))) return Number(b);
                return b;
            });
        var $ = /^-?[0-9]+$/;
        b(w, v),
            (w.prototype.a = function (a, b) {
                var c = new a.b();
                return (c.g = this), (c.a = b), (c.b = {}), c;
            }),
            b(x, w),
            (x.prototype.b = function (a, b) {
                return 8 == a.a ? !!b : v.prototype.b.apply(this, arguments);
            }),
            (x.prototype.a = function (a, b) {
                return x.M.a.call(this, a, b);
            });
        var _ = { 33: ["FR"] },
            aa = {
                FR: [
                    null,
                    [null, null, "[1-9]\\d{8}", "\\d{9}"],
                    [null, null, "[1-5]\\d{8}", "\\d{9}", null, null, "123456789"],
                    [null, null, "6\\d{8}|7(?:00\\d{6}|[3-9]\\d{7})", "\\d{9}", null, null, "612345678"],
                    [null, null, "80[0-5]\\d{6}", "\\d{9}", null, null, "801234567"],
                    [null, null, "89[1-37-9]\\d{6}", "\\d{9}", null, null, "891123456"],
                    [null, null, "8(?:1[019]|2[0156]|84|90)\\d{6}", "\\d{9}", null, null, "810123456"],
                    [null, null, "NA", "NA"],
                    [null, null, "9\\d{8}", "\\d{9}", null, null, "912345678"],
                    "FR",
                    33,
                    "00",
                    "0",
                    null,
                    null,
                    "0",
                    null,
                    null,
                    null,
                    [
                        [null, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
                        [null, "(1\\d{2})(\\d{3})", "$1 $2", ["11"], "$1"],
                        [null, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"],
                    ],
                    [
                        [null, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
                        [null, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"],
                    ],
                    [null, null, "NA", "NA"],
                    null,
                    null,
                    [null, null, "NA", "NA"],
                    [null, null, "80[6-9]\\d{6}", "\\d{9}", null, null, "806123456"],
                    null,
                    null,
                    [null, null, "NA", "NA"],
                ],
            };
        y.b = function () {
            return y.a ? y.a : (y.a = new y());
        };
        var ba = {
                0: "0",
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
                8: "8",
                9: "9",
                "０": "0",
                "１": "1",
                "２": "2",
                "３": "3",
                "４": "4",
                "５": "5",
                "６": "6",
                "７": "7",
                "８": "8",
                "９": "9",
                "٠": "0",
                "١": "1",
                "٢": "2",
                "٣": "3",
                "٤": "4",
                "٥": "5",
                "٦": "6",
                "٧": "7",
                "٨": "8",
                "٩": "9",
                "۰": "0",
                "۱": "1",
                "۲": "2",
                "۳": "3",
                "۴": "4",
                "۵": "5",
                "۶": "6",
                "۷": "7",
                "۸": "8",
                "۹": "9",
            },
            ca = RegExp("[+＋]+"),
            da = RegExp("([0-9０-９٠-٩۰-۹])"),
            ea = /^\(?\$1\)?$/,
            fa = new u();
        q(fa, 11, "NA");
        var ga = /\[([^\[\]])*\]/g,
            ha = /\d(?=[^,}][^,}])/g,
            ia = RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)+$"),
            ja = /[- ]/;
        (B.prototype.K = function () {
            (this.B = ""),
                d(this.h),
                d(this.u),
                d(this.m),
                (this.s = 0),
                (this.v = ""),
                d(this.b),
                (this.l = ""),
                d(this.a),
                (this.j = !0),
                (this.w = this.o = this.D = !1),
                (this.f = []),
                (this.A = !1),
                this.g != this.J && (this.g = C(this, this.C));
        }),
            (B.prototype.L = function (a) {
                return (this.B = F(this, a));
            }),
            a("Cleave.AsYouTypeFormatter", B),
            a("Cleave.AsYouTypeFormatter.prototype.inputDigit", B.prototype.L),
            a("Cleave.AsYouTypeFormatter.prototype.clear", B.prototype.K);
    }.call("object" == typeof global && global ? global : window);
var adpUtils = {};
if (
    ((function (a) {
        (adpUtils.getDefaultDatepickerOptions = function () {
            return {
                orientation: "bottom",
                format: "dd/mm/yyyy",
                language: "fr",
                autoclose: !0,
                maxViewMode: "days",
                ignoreReadonly: !0,
                templates: { leftArrow: '<i class="icon icon--16 icon--f-chevron-left-16"></i>', rightArrow: '<i class="icon icon--16 icon--f-chevron-right-16"></i>' },
            };
        }),
            (a.fn.preventKeyboard = function () {
                return this.filter("input").on("focus", function () {
                    a(this).attr("readonly", "readonly").blur().removeAttr("readonly");
                });
            });
    })(jQuery),
    "undefined" == typeof jQuery)
)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if ((b[0] < 2 && b[1] < 9) || (1 == b[0] && 9 == b[1] && b[2] < 1) || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
})(jQuery),
    (function (a) {
        "use strict";
        function b() {
            var a = document.createElement("bootstrap"),
                b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
            for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] };
            return !1;
        }
        (a.fn.emulateTransitionEnd = function (b) {
            var c = !1,
                d = this;
            a(this).one("bsTransitionEnd", function () {
                c = !0;
            });
            var e = function () {
                c || a(d).trigger(a.support.transition.end);
            };
            return setTimeout(e, b), this;
        }),
            a(function () {
                (a.support.transition = b()),
                    a.support.transition &&
                        (a.event.special.bsTransitionEnd = {
                            bindType: a.support.transition.end,
                            delegateType: a.support.transition.end,
                            handle: function (b) {
                                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
                            },
                        });
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var c = a(this),
                    e = c.data("bs.alert");
                e || c.data("bs.alert", (e = new d(this))), "string" == typeof b && e[b].call(c);
            });
        }
        var c = '[data-dismiss="alert"]',
            d = function (b) {
                a(b).on("click", c, this.close);
            };
        (d.VERSION = "3.3.7"),
            (d.TRANSITION_DURATION = 150),
            (d.prototype.close = function (b) {
                function c() {
                    g.detach().trigger("closed.bs.alert").remove();
                }
                var e = a(this),
                    f = e.attr("data-target");
                f || ((f = e.attr("href")), (f = f && f.replace(/.*(?=#[^\s]*$)/, "")));
                var g = a("#" === f ? [] : f);
                b && b.preventDefault(),
                    g.length || (g = e.closest(".alert")),
                    g.trigger((b = a.Event("close.bs.alert"))),
                    b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
            });
        var e = a.fn.alert;
        (a.fn.alert = b),
            (a.fn.alert.Constructor = d),
            (a.fn.alert.noConflict = function () {
                return (a.fn.alert = e), this;
            }),
            a(document).on("click.bs.alert.data-api", c, d.prototype.close);
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.button"),
                    f = "object" == typeof b && b;
                e || d.data("bs.button", (e = new c(this, f))), "toggle" == b ? e.toggle() : b && e.setState(b);
            });
        }
        var c = function (b, d) {
            (this.$element = a(b)), (this.options = a.extend({}, c.DEFAULTS, d)), (this.isLoading = !1);
        };
        (c.VERSION = "3.3.7"),
            (c.DEFAULTS = { loadingText: "loading..." }),
            (c.prototype.setState = function (b) {
                var c = "disabled",
                    d = this.$element,
                    e = d.is("input") ? "val" : "html",
                    f = d.data();
                (b += "Text"),
                    null == f.resetText && d.data("resetText", d[e]()),
                    setTimeout(
                        a.proxy(function () {
                            d[e](null == f[b] ? this.options[b] : f[b]),
                                "loadingText" == b ? ((this.isLoading = !0), d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && ((this.isLoading = !1), d.removeClass(c).removeAttr(c).prop(c, !1));
                        }, this),
                        0
                    );
            }),
            (c.prototype.toggle = function () {
                var a = !0,
                    b = this.$element.closest('[data-toggle="buttons"]');
                if (b.length) {
                    var c = this.$element.find("input");
                    "radio" == c.prop("type")
                        ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active"))
                        : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")),
                        c.prop("checked", this.$element.hasClass("active")),
                        a && c.trigger("change");
                } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
            });
        var d = a.fn.button;
        (a.fn.button = b),
            (a.fn.button.Constructor = c),
            (a.fn.button.noConflict = function () {
                return (a.fn.button = d), this;
            }),
            a(document)
                .on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
                    var d = a(c.target).closest(".btn");
                    b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"));
                })
                .on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
                    a(b.target)
                        .closest(".btn")
                        .toggleClass("focus", /^focus(in)?$/.test(b.type));
                });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.carousel"),
                    f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                    g = "string" == typeof b ? b : f.slide;
                e || d.data("bs.carousel", (e = new c(this, f))), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
            });
        }
        var c = function (b, c) {
            (this.$element = a(b)),
                (this.$indicators = this.$element.find(".carousel-indicators")),
                (this.options = c),
                (this.paused = null),
                (this.sliding = null),
                (this.interval = null),
                (this.$active = null),
                (this.$items = null),
                this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)),
                "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
        };
        (c.VERSION = "3.3.7"),
            (c.TRANSITION_DURATION = 600),
            (c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
            (c.prototype.keydown = function (a) {
                if (!/input|textarea/i.test(a.target.tagName)) {
                    switch (a.which) {
                        case 37:
                            this.prev();
                            break;
                        case 39:
                            this.next();
                            break;
                        default:
                            return;
                    }
                    a.preventDefault();
                }
            }),
            (c.prototype.cycle = function (b) {
                return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
            }),
            (c.prototype.getItemIndex = function (a) {
                return (this.$items = a.parent().children(".item")), this.$items.index(a || this.$active);
            }),
            (c.prototype.getItemForDirection = function (a, b) {
                var c = this.getItemIndex(b);
                if ((("prev" == a && 0 === c) || ("next" == a && c == this.$items.length - 1)) && !this.options.wrap) return b;
                var d = "prev" == a ? -1 : 1,
                    e = (c + d) % this.$items.length;
                return this.$items.eq(e);
            }),
            (c.prototype.to = function (a) {
                var b = this,
                    c = this.getItemIndex((this.$active = this.$element.find(".item.active")));
                if (!(a > this.$items.length - 1 || a < 0))
                    return this.sliding
                        ? this.$element.one("slid.bs.carousel", function () {
                              b.to(a);
                          })
                        : c == a
                        ? this.pause().cycle()
                        : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
            }),
            (c.prototype.pause = function (b) {
                return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), (this.interval = clearInterval(this.interval)), this;
            }),
            (c.prototype.next = function () {
                if (!this.sliding) return this.slide("next");
            }),
            (c.prototype.prev = function () {
                if (!this.sliding) return this.slide("prev");
            }),
            (c.prototype.slide = function (b, d) {
                var e = this.$element.find(".item.active"),
                    f = d || this.getItemForDirection(b, e),
                    g = this.interval,
                    h = "next" == b ? "left" : "right",
                    i = this;
                if (f.hasClass("active")) return (this.sliding = !1);
                var j = f[0],
                    k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });
                if ((this.$element.trigger(k), !k.isDefaultPrevented())) {
                    if (((this.sliding = !0), g && this.pause(), this.$indicators.length)) {
                        this.$indicators.find(".active").removeClass("active");
                        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                        l && l.addClass("active");
                    }
                    var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });
                    return (
                        a.support.transition && this.$element.hasClass("slide")
                            ? (f.addClass(b),
                              f[0].offsetWidth,
                              e.addClass(h),
                              f.addClass(h),
                              e
                                  .one("bsTransitionEnd", function () {
                                      f.removeClass([b, h].join(" ")).addClass("active"),
                                          e.removeClass(["active", h].join(" ")),
                                          (i.sliding = !1),
                                          setTimeout(function () {
                                              i.$element.trigger(m);
                                          }, 0);
                                  })
                                  .emulateTransitionEnd(c.TRANSITION_DURATION))
                            : (e.removeClass("active"), f.addClass("active"), (this.sliding = !1), this.$element.trigger(m)),
                        g && this.cycle(),
                        this
                    );
                }
            });
        var d = a.fn.carousel;
        (a.fn.carousel = b),
            (a.fn.carousel.Constructor = c),
            (a.fn.carousel.noConflict = function () {
                return (a.fn.carousel = d), this;
            });
        var e = function (c) {
            var d,
                e = a(this),
                f = a(e.attr("data-target") || ((d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")));
            if (f.hasClass("carousel")) {
                var g = a.extend({}, f.data(), e.data()),
                    h = e.attr("data-slide-to");
                h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
            }
        };
        a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e),
            a(window).on("load", function () {
                a('[data-ride="carousel"]').each(function () {
                    var c = a(this);
                    b.call(c, c.data());
                });
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            var c,
                d = b.attr("data-target") || ((c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""));
            return a(d);
        }
        function c(b) {
            return this.each(function () {
                var c = a(this),
                    e = c.data("bs.collapse"),
                    f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
                !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", (e = new d(this, f))), "string" == typeof b && e[b]();
            });
        }
        var d = function (b, c) {
            (this.$element = a(b)),
                (this.options = a.extend({}, d.DEFAULTS, c)),
                (this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]')),
                (this.transitioning = null),
                this.options.parent ? (this.$parent = this.getParent()) : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
                this.options.toggle && this.toggle();
        };
        (d.VERSION = "3.3.7"),
            (d.TRANSITION_DURATION = 350),
            (d.DEFAULTS = { toggle: !0 }),
            (d.prototype.dimension = function () {
                return this.$element.hasClass("width") ? "width" : "height";
            }),
            (d.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var b,
                        e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(e && e.length && (b = e.data("bs.collapse")) && b.transitioning)) {
                        var f = a.Event("show.bs.collapse");
                        if ((this.$element.trigger(f), !f.isDefaultPrevented())) {
                            e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                            var g = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), (this.transitioning = 1);
                            var h = function () {
                                this.$element.removeClass("collapsing").addClass("collapse in")[g](""), (this.transitioning = 0), this.$element.trigger("shown.bs.collapse");
                            };
                            if (!a.support.transition) return h.call(this);
                            var i = a.camelCase(["scroll", g].join("-"));
                            this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
                        }
                    }
                }
            }),
            (d.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var b = a.Event("hide.bs.collapse");
                    if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
                        var c = this.dimension();
                        this.$element[c](this.$element[c]())[0].offsetHeight,
                            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                            this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                            (this.transitioning = 1);
                        var e = function () {
                            (this.transitioning = 0), this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                        };
                        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
                    }
                }
            }),
            (d.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]();
            }),
            (d.prototype.getParent = function () {
                return a(this.options.parent)
                    .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
                    .each(
                        a.proxy(function (c, d) {
                            var e = a(d);
                            this.addAriaAndCollapsedClass(b(e), e);
                        }, this)
                    )
                    .end();
            }),
            (d.prototype.addAriaAndCollapsedClass = function (a, b) {
                var c = a.hasClass("in");
                a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
            });
        var e = a.fn.collapse;
        (a.fn.collapse = c),
            (a.fn.collapse.Constructor = d),
            (a.fn.collapse.noConflict = function () {
                return (a.fn.collapse = e), this;
            }),
            a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
                var e = a(this);
                e.attr("data-target") || d.preventDefault();
                var f = b(e),
                    g = f.data("bs.collapse"),
                    h = g ? "toggle" : e.data();
                c.call(f, h);
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            var c = b.attr("data-target");
            c || ((c = b.attr("href")), (c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")));
            var d = c && a(c);
            return d && d.length ? d : b.parent();
        }
        function c(c) {
            (c && 3 === c.which) ||
                (a(e).remove(),
                a(f).each(function () {
                    var d = a(this),
                        e = b(d),
                        f = { relatedTarget: this };
                    e.hasClass("open") &&
                        ((c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target)) ||
                            (e.trigger((c = a.Event("hide.bs.dropdown", f))), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
                }));
        }
        function d(b) {
            return this.each(function () {
                var c = a(this),
                    d = c.data("bs.dropdown");
                d || c.data("bs.dropdown", (d = new g(this))), "string" == typeof b && d[b].call(c);
            });
        }
        var e = ".dropdown-backdrop",
            f = '[data-toggle="dropdown"]',
            g = function (b) {
                a(b).on("click.bs.dropdown", this.toggle);
            };
        (g.VERSION = "3.3.7"),
            (g.prototype.toggle = function (d) {
                var e = a(this);
                if (!e.is(".disabled, :disabled")) {
                    var f = b(e),
                        g = f.hasClass("open");
                    if ((c(), !g)) {
                        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                        var h = { relatedTarget: this };
                        if ((f.trigger((d = a.Event("show.bs.dropdown", h))), d.isDefaultPrevented())) return;
                        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
                    }
                    return !1;
                }
            }),
            (g.prototype.keydown = function (c) {
                if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
                    var d = a(this);
                    if ((c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled"))) {
                        var e = b(d),
                            g = e.hasClass("open");
                        if ((!g && 27 != c.which) || (g && 27 == c.which)) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                        var h = " li:not(.disabled):visible a",
                            i = e.find(".dropdown-menu" + h);
                        if (i.length) {
                            var j = i.index(c.target);
                            38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
                        }
                    }
                }
            });
        var h = a.fn.dropdown;
        (a.fn.dropdown = d),
            (a.fn.dropdown.Constructor = g),
            (a.fn.dropdown.noConflict = function () {
                return (a.fn.dropdown = h), this;
            }),
            a(document)
                .on("click.bs.dropdown.data-api", c)
                .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
                    a.stopPropagation();
                })
                .on("click.bs.dropdown.data-api", f, g.prototype.toggle)
                .on("keydown.bs.dropdown.data-api", f, g.prototype.keydown)
                .on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b, d) {
            return this.each(function () {
                var e = a(this),
                    f = e.data("bs.modal"),
                    g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
                f || e.data("bs.modal", (f = new c(this, g))), "string" == typeof b ? f[b](d) : g.show && f.show(d);
            });
        }
        var c = function (b, c) {
            (this.options = c),
                (this.$body = a(document.body)),
                (this.$element = a(b)),
                (this.$dialog = this.$element.find(".modal-dialog")),
                (this.$backdrop = null),
                (this.isShown = null),
                (this.originalBodyPad = null),
                (this.scrollbarWidth = 0),
                (this.ignoreBackdropClick = !1),
                this.options.remote &&
                    this.$element.find(".modal-content").load(
                        this.options.remote,
                        a.proxy(function () {
                            this.$element.trigger("loaded.bs.modal");
                        }, this)
                    );
        };
        (c.VERSION = "3.3.7"),
            (c.TRANSITION_DURATION = 300),
            (c.BACKDROP_TRANSITION_DURATION = 150),
            (c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
            (c.prototype.toggle = function (a) {
                return this.isShown ? this.hide() : this.show(a);
            }),
            (c.prototype.show = function (b) {
                var d = this,
                    e = a.Event("show.bs.modal", { relatedTarget: b });
                this.$element.trigger(e),
                    this.isShown ||
                        e.isDefaultPrevented() ||
                        ((this.isShown = !0),
                        this.checkScrollbar(),
                        this.setScrollbar(),
                        this.$body.addClass("modal-open"),
                        this.escape(),
                        this.resize(),
                        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)),
                        this.$dialog.on("mousedown.dismiss.bs.modal", function () {
                            d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
                            });
                        }),
                        this.backdrop(function () {
                            var e = a.support.transition && d.$element.hasClass("fade");
                            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
                            var f = a.Event("shown.bs.modal", { relatedTarget: b });
                            e
                                ? d.$dialog
                                      .one("bsTransitionEnd", function () {
                                          d.$element.trigger("focus").trigger(f);
                                      })
                                      .emulateTransitionEnd(c.TRANSITION_DURATION)
                                : d.$element.trigger("focus").trigger(f);
                        }));
            }),
            (c.prototype.hide = function (b) {
                b && b.preventDefault(),
                    (b = a.Event("hide.bs.modal")),
                    this.$element.trigger(b),
                    this.isShown &&
                        !b.isDefaultPrevented() &&
                        ((this.isShown = !1),
                        this.escape(),
                        this.resize(),
                        a(document).off("focusin.bs.modal"),
                        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
                        this.$dialog.off("mousedown.dismiss.bs.modal"),
                        a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
            }),
            (c.prototype.enforceFocus = function () {
                a(document)
                    .off("focusin.bs.modal")
                    .on(
                        "focusin.bs.modal",
                        a.proxy(function (a) {
                            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
                        }, this)
                    );
            }),
            (c.prototype.escape = function () {
                this.isShown && this.options.keyboard
                    ? this.$element.on(
                          "keydown.dismiss.bs.modal",
                          a.proxy(function (a) {
                              27 == a.which && this.hide();
                          }, this)
                      )
                    : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
            }),
            (c.prototype.resize = function () {
                this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
            }),
            (c.prototype.hideModal = function () {
                var a = this;
                this.$element.hide(),
                    this.backdrop(function () {
                        a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
                    });
            }),
            (c.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
            }),
            (c.prototype.backdrop = function (b) {
                var d = this,
                    e = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var f = a.support.transition && e;
                    if (
                        ((this.$backdrop = a(document.createElement("div"))
                            .addClass("modal-backdrop " + e)
                            .appendTo(this.$body)),
                        this.$element.on(
                            "click.dismiss.bs.modal",
                            a.proxy(function (a) {
                                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
                            }, this)
                        ),
                        f && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !b)
                    )
                        return;
                    f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var g = function () {
                        d.removeBackdrop(), b && b();
                    };
                    a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
                } else b && b();
            }),
            (c.prototype.handleUpdate = function () {
                this.adjustDialog();
            }),
            (c.prototype.adjustDialog = function () {
                var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" });
            }),
            (c.prototype.resetAdjustments = function () {
                this.$element.css({ paddingLeft: "", paddingRight: "" });
            }),
            (c.prototype.checkScrollbar = function () {
                var a = window.innerWidth;
                if (!a) {
                    var b = document.documentElement.getBoundingClientRect();
                    a = b.right - Math.abs(b.left);
                }
                (this.bodyIsOverflowing = document.body.clientWidth < a), (this.scrollbarWidth = this.measureScrollbar());
            }),
            (c.prototype.setScrollbar = function () {
                var a = parseInt(this.$body.css("padding-right") || 0, 10);
                (this.originalBodyPad = document.body.style.paddingRight || ""), this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
            }),
            (c.prototype.resetScrollbar = function () {
                this.$body.css("padding-right", this.originalBodyPad);
            }),
            (c.prototype.measureScrollbar = function () {
                var a = document.createElement("div");
                (a.className = "modal-scrollbar-measure"), this.$body.append(a);
                var b = a.offsetWidth - a.clientWidth;
                return this.$body[0].removeChild(a), b;
            });
        var d = a.fn.modal;
        (a.fn.modal = b),
            (a.fn.modal.Constructor = c),
            (a.fn.modal.noConflict = function () {
                return (a.fn.modal = d), this;
            }),
            a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
                var d = a(this),
                    e = d.attr("href"),
                    f = a(d.attr("data-target") || (e && e.replace(/.*(?=#[^\s]+$)/, ""))),
                    g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
                d.is("a") && c.preventDefault(),
                    f.one("show.bs.modal", function (a) {
                        a.isDefaultPrevented() ||
                            f.one("hidden.bs.modal", function () {
                                d.is(":visible") && d.trigger("focus");
                            });
                    }),
                    b.call(f, g, this);
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.tooltip"),
                    f = "object" == typeof b && b;
                (!e && /destroy|hide/.test(b)) || (e || d.data("bs.tooltip", (e = new c(this, f))), "string" == typeof b && e[b]());
            });
        }
        var c = function (a, b) {
            (this.type = null), (this.options = null), (this.enabled = null), (this.timeout = null), (this.hoverState = null), (this.$element = null), (this.inState = null), this.init("tooltip", a, b);
        };
        (c.VERSION = "3.3.7"),
            (c.TRANSITION_DURATION = 150),
            (c.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: { selector: "body", padding: 0 },
            }),
            (c.prototype.init = function (b, c, d) {
                if (
                    ((this.enabled = !0),
                    (this.type = b),
                    (this.$element = a(c)),
                    (this.options = this.getOptions(d)),
                    (this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport)),
                    (this.inState = { click: !1, hover: !1, focus: !1 }),
                    this.$element[0] instanceof document.constructor && !this.options.selector)
                )
                    throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
                    var g = e[f];
                    if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
                    else if ("manual" != g) {
                        var h = "hover" == g ? "mouseenter" : "focusin",
                            i = "hover" == g ? "mouseleave" : "focusout";
                        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
                    }
                }
                this.options.selector ? (this._options = a.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle();
            }),
            (c.prototype.getDefaults = function () {
                return c.DEFAULTS;
            }),
            (c.prototype.getOptions = function (b) {
                return (b = a.extend({}, this.getDefaults(), this.$element.data(), b)), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b;
            }),
            (c.prototype.getDelegateOptions = function () {
                var b = {},
                    c = this.getDefaults();
                return (
                    this._options &&
                        a.each(this._options, function (a, d) {
                            c[a] != d && (b[a] = d);
                        }),
                    b
                );
            }),
            (c.prototype.enter = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                return (
                    c || ((c = new this.constructor(b.currentTarget, this.getDelegateOptions())), a(b.currentTarget).data("bs." + this.type, c)),
                    b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0),
                    c.tip().hasClass("in") || "in" == c.hoverState
                        ? void (c.hoverState = "in")
                        : (clearTimeout(c.timeout),
                          (c.hoverState = "in"),
                          c.options.delay && c.options.delay.show
                              ? void (c.timeout = setTimeout(function () {
                                    "in" == c.hoverState && c.show();
                                }, c.options.delay.show))
                              : c.show())
                );
            }),
            (c.prototype.isInStateTrue = function () {
                for (var a in this.inState) if (this.inState[a]) return !0;
                return !1;
            }),
            (c.prototype.leave = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                if (
                    (c || ((c = new this.constructor(b.currentTarget, this.getDelegateOptions())), a(b.currentTarget).data("bs." + this.type, c)),
                    b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1),
                    !c.isInStateTrue())
                )
                    return (
                        clearTimeout(c.timeout),
                        (c.hoverState = "out"),
                        c.options.delay && c.options.delay.hide
                            ? void (c.timeout = setTimeout(function () {
                                  "out" == c.hoverState && c.hide();
                              }, c.options.delay.hide))
                            : c.hide()
                    );
            }),
            (c.prototype.show = function () {
                var b = a.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(b);
                    var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                    if (b.isDefaultPrevented() || !d) return;
                    var e = this,
                        f = this.tip(),
                        g = this.getUID(this.type);
                    this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
                    var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                        i = /\s?auto?\s?/i,
                        j = i.test(h);
                    j && (h = h.replace(i, "") || "top"),
                        f
                            .detach()
                            .css({ top: 0, left: 0, display: "block" })
                            .addClass(h)
                            .data("bs." + this.type, this),
                        this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element),
                        this.$element.trigger("inserted.bs." + this.type);
                    var k = this.getPosition(),
                        l = f[0].offsetWidth,
                        m = f[0].offsetHeight;
                    if (j) {
                        var n = h,
                            o = this.getPosition(this.$viewport);
                        (h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h),
                            f.removeClass(n).addClass(h);
                    }
                    var p = this.getCalculatedOffset(h, k, l, m);
                    this.applyPlacement(p, h);
                    var q = function () {
                        var a = e.hoverState;
                        e.$element.trigger("shown.bs." + e.type), (e.hoverState = null), "out" == a && e.leave(e);
                    };
                    a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
                }
            }),
            (c.prototype.applyPlacement = function (b, c) {
                var d = this.tip(),
                    e = d[0].offsetWidth,
                    f = d[0].offsetHeight,
                    g = parseInt(d.css("margin-top"), 10),
                    h = parseInt(d.css("margin-left"), 10);
                isNaN(g) && (g = 0),
                    isNaN(h) && (h = 0),
                    (b.top += g),
                    (b.left += h),
                    a.offset.setOffset(
                        d[0],
                        a.extend(
                            {
                                using: function (a) {
                                    d.css({ top: Math.round(a.top), left: Math.round(a.left) });
                                },
                            },
                            b
                        ),
                        0
                    ),
                    d.addClass("in");
                var i = d[0].offsetWidth,
                    j = d[0].offsetHeight;
                "top" == c && j != f && (b.top = b.top + f - j);
                var k = this.getViewportAdjustedDelta(c, b, i, j);
                k.left ? (b.left += k.left) : (b.top += k.top);
                var l = /top|bottom/.test(c),
                    m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
                    n = l ? "offsetWidth" : "offsetHeight";
                d.offset(b), this.replaceArrow(m, d[0][n], l);
            }),
            (c.prototype.replaceArrow = function (a, b, c) {
                this.arrow()
                    .css(c ? "left" : "top", 50 * (1 - a / b) + "%")
                    .css(c ? "top" : "left", "");
            }),
            (c.prototype.setContent = function () {
                var a = this.tip(),
                    b = this.getTitle();
                a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
            }),
            (c.prototype.hide = function (b) {
                function d() {
                    "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
                }
                var e = this,
                    f = a(this.$tip),
                    g = a.Event("hide.bs." + this.type);
                if ((this.$element.trigger(g), !g.isDefaultPrevented()))
                    return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), (this.hoverState = null), this;
            }),
            (c.prototype.fixTitle = function () {
                var a = this.$element;
                (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
            }),
            (c.prototype.hasContent = function () {
                return this.getTitle();
            }),
            (c.prototype.getPosition = function (b) {
                b = b || this.$element;
                var c = b[0],
                    d = "BODY" == c.tagName,
                    e = c.getBoundingClientRect();
                null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));
                var f = window.SVGElement && c instanceof window.SVGElement,
                    g = d ? { top: 0, left: 0 } : f ? null : b.offset(),
                    h = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
                    i = d ? { width: a(window).width(), height: a(window).height() } : null;
                return a.extend({}, e, h, i, g);
            }),
            (c.prototype.getCalculatedOffset = function (a, b, c, d) {
                return "bottom" == a
                    ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
                    : "top" == a
                    ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
                    : "left" == a
                    ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
                    : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
            }),
            (c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
                var e = { top: 0, left: 0 };
                if (!this.$viewport) return e;
                var f = (this.options.viewport && this.options.viewport.padding) || 0,
                    g = this.getPosition(this.$viewport);
                if (/right|left/.test(a)) {
                    var h = b.top - f - g.scroll,
                        i = b.top + f - g.scroll + d;
                    h < g.top ? (e.top = g.top - h) : i > g.top + g.height && (e.top = g.top + g.height - i);
                } else {
                    var j = b.left - f,
                        k = b.left + f + c;
                    j < g.left ? (e.left = g.left - j) : k > g.right && (e.left = g.left + g.width - k);
                }
                return e;
            }),
            (c.prototype.getTitle = function () {
                var a = this.$element,
                    b = this.options;
                return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title);
            }),
            (c.prototype.getUID = function (a) {
                do {
                    a += ~~(1e6 * Math.random());
                } while (document.getElementById(a));
                return a;
            }),
            (c.prototype.tip = function () {
                if (!this.$tip && ((this.$tip = a(this.options.template)), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                return this.$tip;
            }),
            (c.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
            }),
            (c.prototype.enable = function () {
                this.enabled = !0;
            }),
            (c.prototype.disable = function () {
                this.enabled = !1;
            }),
            (c.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled;
            }),
            (c.prototype.toggle = function (b) {
                var c = this;
                b && ((c = a(b.currentTarget).data("bs." + this.type)) || ((c = new this.constructor(b.currentTarget, this.getDelegateOptions())), a(b.currentTarget).data("bs." + this.type, c))),
                    b ? ((c.inState.click = !c.inState.click), c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
            }),
            (c.prototype.destroy = function () {
                var a = this;
                clearTimeout(this.timeout),
                    this.hide(function () {
                        a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), (a.$tip = null), (a.$arrow = null), (a.$viewport = null), (a.$element = null);
                    });
            });
        var d = a.fn.tooltip;
        (a.fn.tooltip = b),
            (a.fn.tooltip.Constructor = c),
            (a.fn.tooltip.noConflict = function () {
                return (a.fn.tooltip = d), this;
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.popover"),
                    f = "object" == typeof b && b;
                (!e && /destroy|hide/.test(b)) || (e || d.data("bs.popover", (e = new c(this, f))), "string" == typeof b && e[b]());
            });
        }
        var c = function (a, b) {
            this.init("popover", a, b);
        };
        if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
        (c.VERSION = "3.3.7"),
            (c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            })),
            (c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
            (c.prototype.constructor = c),
            (c.prototype.getDefaults = function () {
                return c.DEFAULTS;
            }),
            (c.prototype.setContent = function () {
                var a = this.tip(),
                    b = this.getTitle(),
                    c = this.getContent();
                a.find(".popover-title")[this.options.html ? "html" : "text"](b),
                    a.find(".popover-content").children().detach().end()[this.options.html ? ("string" == typeof c ? "html" : "append") : "text"](c),
                    a.removeClass("fade top bottom left right in"),
                    a.find(".popover-title").html() || a.find(".popover-title").hide();
            }),
            (c.prototype.hasContent = function () {
                return this.getTitle() || this.getContent();
            }),
            (c.prototype.getContent = function () {
                var a = this.$element,
                    b = this.options;
                return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
            }),
            (c.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
            });
        var d = a.fn.popover;
        (a.fn.popover = b),
            (a.fn.popover.Constructor = c),
            (a.fn.popover.noConflict = function () {
                return (a.fn.popover = d), this;
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(c, d) {
            (this.$body = a(document.body)),
                (this.$scrollElement = a(a(c).is(document.body) ? window : c)),
                (this.options = a.extend({}, b.DEFAULTS, d)),
                (this.selector = (this.options.target || "") + " .nav li > a"),
                (this.offsets = []),
                (this.targets = []),
                (this.activeTarget = null),
                (this.scrollHeight = 0),
                this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)),
                this.refresh(),
                this.process();
        }
        function c(c) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.scrollspy"),
                    f = "object" == typeof c && c;
                e || d.data("bs.scrollspy", (e = new b(this, f))), "string" == typeof c && e[c]();
            });
        }
        (b.VERSION = "3.3.7"),
            (b.DEFAULTS = { offset: 10 }),
            (b.prototype.getScrollHeight = function () {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
            }),
            (b.prototype.refresh = function () {
                var b = this,
                    c = "offset",
                    d = 0;
                (this.offsets = []),
                    (this.targets = []),
                    (this.scrollHeight = this.getScrollHeight()),
                    a.isWindow(this.$scrollElement[0]) || ((c = "position"), (d = this.$scrollElement.scrollTop())),
                    this.$body
                        .find(this.selector)
                        .map(function () {
                            var b = a(this),
                                e = b.data("target") || b.attr("href"),
                                f = /^#./.test(e) && a(e);
                            return (f && f.length && f.is(":visible") && [[f[c]().top + d, e]]) || null;
                        })
                        .sort(function (a, b) {
                            return a[0] - b[0];
                        })
                        .each(function () {
                            b.offsets.push(this[0]), b.targets.push(this[1]);
                        });
            }),
            (b.prototype.process = function () {
                var a,
                    b = this.$scrollElement.scrollTop() + this.options.offset,
                    c = this.getScrollHeight(),
                    d = this.options.offset + c - this.$scrollElement.height(),
                    e = this.offsets,
                    f = this.targets,
                    g = this.activeTarget;
                if ((this.scrollHeight != c && this.refresh(), b >= d)) return g != (a = f[f.length - 1]) && this.activate(a);
                if (g && b < e[0]) return (this.activeTarget = null), this.clear();
                for (a = e.length; a--; ) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
            }),
            (b.prototype.activate = function (b) {
                (this.activeTarget = b), this.clear();
                var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
                    d = a(c).parents("li").addClass("active");
                d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
            }),
            (b.prototype.clear = function () {
                a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
            });
        var d = a.fn.scrollspy;
        (a.fn.scrollspy = c),
            (a.fn.scrollspy.Constructor = b),
            (a.fn.scrollspy.noConflict = function () {
                return (a.fn.scrollspy = d), this;
            }),
            a(window).on("load.bs.scrollspy.data-api", function () {
                a('[data-spy="scroll"]').each(function () {
                    var b = a(this);
                    c.call(b, b.data());
                });
            });
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.tab");
                e || d.data("bs.tab", (e = new c(this))), "string" == typeof b && e[b]();
            });
        }
        var c = function (b) {
            this.element = a(b);
        };
        (c.VERSION = "3.3.7"),
            (c.TRANSITION_DURATION = 150),
            (c.prototype.show = function () {
                var b = this.element,
                    c = b.closest("ul:not(.dropdown-menu)"),
                    d = b.data("target");
                if ((d || ((d = b.attr("href")), (d = d && d.replace(/.*(?=#[^\s]*$)/, ""))), !b.parent("li").hasClass("active"))) {
                    var e = c.find(".active:last a"),
                        f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
                        g = a.Event("show.bs.tab", { relatedTarget: e[0] });
                    if ((e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented())) {
                        var h = a(d);
                        this.activate(b.closest("li"), c),
                            this.activate(h, h.parent(), function () {
                                e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
                            });
                    }
                }
            }),
            (c.prototype.activate = function (b, d, e) {
                function f() {
                    g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
                        b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
                        h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"),
                        b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
                        e && e();
                }
                var g = d.find("> .active"),
                    h = e && a.support.transition && ((g.length && g.hasClass("fade")) || !!d.find("> .fade").length);
                g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
            });
        var d = a.fn.tab;
        (a.fn.tab = b),
            (a.fn.tab.Constructor = c),
            (a.fn.tab.noConflict = function () {
                return (a.fn.tab = d), this;
            });
        var e = function (c) {
            c.preventDefault(), b.call(a(this), "show");
        };
        a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
    })(jQuery),
    (function (a) {
        "use strict";
        function b(b) {
            return this.each(function () {
                var d = a(this),
                    e = d.data("bs.affix"),
                    f = "object" == typeof b && b;
                e || d.data("bs.affix", (e = new c(this, f))), "string" == typeof b && e[b]();
            });
        }
        var c = function (b, d) {
            (this.options = a.extend({}, c.DEFAULTS, d)),
                (this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this))),
                (this.$element = a(b)),
                (this.affixed = null),
                (this.unpin = null),
                (this.pinnedOffset = null),
                this.checkPosition();
        };
        (c.VERSION = "3.3.7"),
            (c.RESET = "affix affix-top affix-bottom"),
            (c.DEFAULTS = { offset: 0, target: window }),
            (c.prototype.getState = function (a, b, c, d) {
                var e = this.$target.scrollTop(),
                    f = this.$element.offset(),
                    g = this.$target.height();
                if (null != c && "top" == this.affixed) return e < c && "top";
                if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
                var h = null == this.affixed,
                    i = h ? e : f.top,
                    j = h ? g : b;
                return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom";
            }),
            (c.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(c.RESET).addClass("affix");
                var a = this.$target.scrollTop(),
                    b = this.$element.offset();
                return (this.pinnedOffset = b.top - a);
            }),
            (c.prototype.checkPositionWithEventLoop = function () {
                setTimeout(a.proxy(this.checkPosition, this), 1);
            }),
            (c.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var b = this.$element.height(),
                        d = this.options.offset,
                        e = d.top,
                        f = d.bottom,
                        g = Math.max(a(document).height(), a(document.body).height());
                    "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
                    var h = this.getState(g, b, e, f);
                    if (this.affixed != h) {
                        null != this.unpin && this.$element.css("top", "");
                        var i = "affix" + (h ? "-" + h : ""),
                            j = a.Event(i + ".bs.affix");
                        if ((this.$element.trigger(j), j.isDefaultPrevented())) return;
                        (this.affixed = h),
                            (this.unpin = "bottom" == h ? this.getPinnedOffset() : null),
                            this.$element
                                .removeClass(c.RESET)
                                .addClass(i)
                                .trigger(i.replace("affix", "affixed") + ".bs.affix");
                    }
                    "bottom" == h && this.$element.offset({ top: g - b - f });
                }
            });
        var d = a.fn.affix;
        (a.fn.affix = b),
            (a.fn.affix.Constructor = c),
            (a.fn.affix.noConflict = function () {
                return (a.fn.affix = d), this;
            }),
            a(window).on("load", function () {
                a('[data-spy="affix"]').each(function () {
                    var c = a(this),
                        d = c.data();
                    (d.offset = d.offset || {}), null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
                });
            });
    })(jQuery),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? (module.exports = a(require("jquery"))) : a(jQuery);
    })(function (a) {
        "use strict";
        var b = window.Slick || {};
        (b = (function () {
            function b(b, d) {
                var e,
                    f = this;
                (f.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: a(b),
                    appendDots: a(b),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (b, c) {
                        return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (f.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    a.extend(f, f.initials),
                    (f.activeBreakpoint = null),
                    (f.animType = null),
                    (f.animProp = null),
                    (f.breakpoints = []),
                    (f.breakpointSettings = []),
                    (f.cssTransitions = !1),
                    (f.focussed = !1),
                    (f.interrupted = !1),
                    (f.hidden = "hidden"),
                    (f.paused = !0),
                    (f.positionProp = null),
                    (f.respondTo = null),
                    (f.rowCount = 1),
                    (f.shouldClick = !0),
                    (f.$slider = a(b)),
                    (f.$slidesCache = null),
                    (f.transformType = null),
                    (f.transitionType = null),
                    (f.visibilityChange = "visibilitychange"),
                    (f.windowWidth = 0),
                    (f.windowTimer = null),
                    (e = a(b).data("slick") || {}),
                    (f.options = a.extend({}, f.defaults, d, e)),
                    (f.currentSlide = f.options.initialSlide),
                    (f.originalSettings = f.options),
                    void 0 !== document.mozHidden
                        ? ((f.hidden = "mozHidden"), (f.visibilityChange = "mozvisibilitychange"))
                        : void 0 !== document.webkitHidden && ((f.hidden = "webkitHidden"), (f.visibilityChange = "webkitvisibilitychange")),
                    (f.autoPlay = a.proxy(f.autoPlay, f)),
                    (f.autoPlayClear = a.proxy(f.autoPlayClear, f)),
                    (f.autoPlayIterator = a.proxy(f.autoPlayIterator, f)),
                    (f.changeSlide = a.proxy(f.changeSlide, f)),
                    (f.clickHandler = a.proxy(f.clickHandler, f)),
                    (f.selectHandler = a.proxy(f.selectHandler, f)),
                    (f.setPosition = a.proxy(f.setPosition, f)),
                    (f.swipeHandler = a.proxy(f.swipeHandler, f)),
                    (f.dragHandler = a.proxy(f.dragHandler, f)),
                    (f.keyHandler = a.proxy(f.keyHandler, f)),
                    (f.instanceUid = c++),
                    (f.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    f.registerBreakpoints(),
                    f.init(!0);
            }
            var c = 0;
            return b;
        })()),
            (b.prototype.activateADA = function () {
                this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
            }),
            (b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
                var e = this;
                if ("boolean" == typeof c) (d = c), (c = null);
                else if (c < 0 || c >= e.slideCount) return !1;
                e.unload(),
                    "number" == typeof c
                        ? 0 === c && 0 === e.$slides.length
                            ? a(b).appendTo(e.$slideTrack)
                            : d
                            ? a(b).insertBefore(e.$slides.eq(c))
                            : a(b).insertAfter(e.$slides.eq(c))
                        : !0 === d
                        ? a(b).prependTo(e.$slideTrack)
                        : a(b).appendTo(e.$slideTrack),
                    (e.$slides = e.$slideTrack.children(this.options.slide)),
                    e.$slideTrack.children(this.options.slide).detach(),
                    e.$slideTrack.append(e.$slides),
                    e.$slides.each(function (b, c) {
                        a(c).attr("data-slick-index", b);
                    }),
                    (e.$slidesCache = e.$slides),
                    e.reinit();
            }),
            (b.prototype.animateHeight = function () {
                var a = this;
                if (1 === a.options.slidesToShow && !0 === a.options.adaptiveHeight && !1 === a.options.vertical) {
                    var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                    a.$list.animate({ height: b }, a.options.speed);
                }
            }),
            (b.prototype.animateSlide = function (b, c) {
                var d = {},
                    e = this;
                e.animateHeight(),
                    !0 === e.options.rtl && !1 === e.options.vertical && (b = -b),
                    !1 === e.transformsEnabled
                        ? !1 === e.options.vertical
                            ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c)
                            : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c)
                        : !1 === e.cssTransitions
                        ? (!0 === e.options.rtl && (e.currentLeft = -e.currentLeft),
                          a({ animStart: e.currentLeft }).animate(
                              { animStart: b },
                              {
                                  duration: e.options.speed,
                                  easing: e.options.easing,
                                  step: function (a) {
                                      (a = Math.ceil(a)), !1 === e.options.vertical ? ((d[e.animType] = "translate(" + a + "px, 0px)"), e.$slideTrack.css(d)) : ((d[e.animType] = "translate(0px," + a + "px)"), e.$slideTrack.css(d));
                                  },
                                  complete: function () {
                                      c && c.call();
                                  },
                              }
                          ))
                        : (e.applyTransition(),
                          (b = Math.ceil(b)),
                          !1 === e.options.vertical ? (d[e.animType] = "translate3d(" + b + "px, 0px, 0px)") : (d[e.animType] = "translate3d(0px," + b + "px, 0px)"),
                          e.$slideTrack.css(d),
                          c &&
                              setTimeout(function () {
                                  e.disableTransition(), c.call();
                              }, e.options.speed));
            }),
            (b.prototype.getNavTarget = function () {
                var b = this,
                    c = b.options.asNavFor;
                return c && null !== c && (c = a(c).not(b.$slider)), c;
            }),
            (b.prototype.asNavFor = function (b) {
                var c = this,
                    d = c.getNavTarget();
                null !== d &&
                    "object" == typeof d &&
                    d.each(function () {
                        var c = a(this).slick("getSlick");
                        c.unslicked || c.slideHandler(b, !0);
                    });
            }),
            (b.prototype.applyTransition = function (a) {
                var b = this,
                    c = {};
                !1 === b.options.fade ? (c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase) : (c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase),
                    !1 === b.options.fade ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
            }),
            (b.prototype.autoPlay = function () {
                var a = this;
                a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed));
            }),
            (b.prototype.autoPlayClear = function () {
                var a = this;
                a.autoPlayTimer && clearInterval(a.autoPlayTimer);
            }),
            (b.prototype.autoPlayIterator = function () {
                var a = this,
                    b = a.currentSlide + a.options.slidesToScroll;
                a.paused ||
                    a.interrupted ||
                    a.focussed ||
                    (!1 === a.options.infinite &&
                        (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? (a.direction = 0) : 0 === a.direction && ((b = a.currentSlide - a.options.slidesToScroll), a.currentSlide - 1 == 0 && (a.direction = 1))),
                    a.slideHandler(b));
            }),
            (b.prototype.buildArrows = function () {
                var b = this;
                !0 === b.options.arrows &&
                    ((b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow")),
                    (b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow")),
                    b.slideCount > b.options.slidesToShow
                        ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows),
                          b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
                          !0 !== b.options.infinite && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                        : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (b.prototype.buildDots = function () {
                var b,
                    c,
                    d = this;
                if (!0 === d.options.dots && d.slideCount > d.options.slidesToShow) {
                    for (d.$slider.addClass("slick-dotted"), c = a("<ul />").addClass(d.options.dotsClass), b = 0; b <= d.getDotCount(); b += 1) c.append(a("<li />").append(d.options.customPaging.call(this, d, b)));
                    (d.$dots = c.appendTo(d.options.appendDots)), d.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
                }
            }),
            (b.prototype.buildOut = function () {
                var b = this;
                (b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (b.slideCount = b.$slides.length),
                    b.$slides.each(function (b, c) {
                        a(c)
                            .attr("data-slick-index", b)
                            .data("originalStyling", a(c).attr("style") || "");
                    }),
                    b.$slider.addClass("slick-slider"),
                    (b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
                    b.$slideTrack.css("opacity", 0),
                    (!0 !== b.options.centerMode && !0 !== b.options.swipeToSlide) || (b.options.slidesToScroll = 1),
                    a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
                    b.setupInfinite(),
                    b.buildArrows(),
                    b.buildDots(),
                    b.updateDots(),
                    b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
                    !0 === b.options.draggable && b.$list.addClass("draggable");
            }),
            (b.prototype.buildRows = function () {
                var a,
                    b,
                    c,
                    d,
                    e,
                    f,
                    g,
                    h = this;
                if (((d = document.createDocumentFragment()), (f = h.$slider.children()), h.options.rows > 1)) {
                    for (g = h.options.slidesPerRow * h.options.rows, e = Math.ceil(f.length / g), a = 0; a < e; a++) {
                        var i = document.createElement("div");
                        for (b = 0; b < h.options.rows; b++) {
                            var j = document.createElement("div");
                            for (c = 0; c < h.options.slidesPerRow; c++) {
                                var k = a * g + (b * h.options.slidesPerRow + c);
                                f.get(k) && j.appendChild(f.get(k));
                            }
                            i.appendChild(j);
                        }
                        d.appendChild(i);
                    }
                    h.$slider.empty().append(d),
                        h.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / h.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (b.prototype.checkResponsive = function (b, c) {
                var d,
                    e,
                    f,
                    g = this,
                    h = !1,
                    i = g.$slider.width(),
                    j = window.innerWidth || a(window).width();
                if (("window" === g.respondTo ? (f = j) : "slider" === g.respondTo ? (f = i) : "min" === g.respondTo && (f = Math.min(j, i)), g.options.responsive && g.options.responsive.length && null !== g.options.responsive)) {
                    e = null;
                    for (d in g.breakpoints) g.breakpoints.hasOwnProperty(d) && (!1 === g.originalSettings.mobileFirst ? f < g.breakpoints[d] && (e = g.breakpoints[d]) : f > g.breakpoints[d] && (e = g.breakpoints[d]));
                    null !== e
                        ? null !== g.activeBreakpoint
                            ? (e !== g.activeBreakpoint || c) &&
                              ((g.activeBreakpoint = e),
                              "unslick" === g.breakpointSettings[e] ? g.unslick(e) : ((g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e])), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b)),
                              (h = e))
                            : ((g.activeBreakpoint = e),
                              "unslick" === g.breakpointSettings[e] ? g.unslick(e) : ((g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e])), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b)),
                              (h = e))
                        : null !== g.activeBreakpoint && ((g.activeBreakpoint = null), (g.options = g.originalSettings), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b), (h = e)),
                        b || !1 === h || g.$slider.trigger("breakpoint", [g, h]);
                }
            }),
            (b.prototype.changeSlide = function (b, c) {
                var d,
                    e,
                    f,
                    g = this,
                    h = a(b.currentTarget);
                switch ((h.is("a") && b.preventDefault(), h.is("li") || (h = h.closest("li")), (f = g.slideCount % g.options.slidesToScroll != 0), (d = f ? 0 : (g.slideCount - g.currentSlide) % g.options.slidesToScroll), b.data.message)) {
                    case "previous":
                        (e = 0 === d ? g.options.slidesToScroll : g.options.slidesToShow - d), g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide - e, !1, c);
                        break;
                    case "next":
                        (e = 0 === d ? g.options.slidesToScroll : d), g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide + e, !1, c);
                        break;
                    case "index":
                        var i = 0 === b.data.index ? 0 : b.data.index || h.index() * g.options.slidesToScroll;
                        g.slideHandler(g.checkNavigable(i), !1, c), h.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (b.prototype.checkNavigable = function (a) {
                var b,
                    c,
                    d = this;
                if (((b = d.getNavigableIndexes()), (c = 0), a > b[b.length - 1])) a = b[b.length - 1];
                else
                    for (var e in b) {
                        if (a < b[e]) {
                            a = c;
                            break;
                        }
                        c = b[e];
                    }
                return a;
            }),
            (b.prototype.cleanUpEvents = function () {
                var b = this;
                b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
                    b.$slider.off("focus.slick blur.slick"),
                    !0 === b.options.arrows && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
                    b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
                    b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
                    b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
                    b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
                    b.$list.off("click.slick", b.clickHandler),
                    a(document).off(b.visibilityChange, b.visibility),
                    b.cleanUpSlideEvents(),
                    !0 === b.options.accessibility && b.$list.off("keydown.slick", b.keyHandler),
                    !0 === b.options.focusOnSelect && a(b.$slideTrack).children().off("click.slick", b.selectHandler),
                    a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange),
                    a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
                    a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault),
                    a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
                    a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
            }),
            (b.prototype.cleanUpSlideEvents = function () {
                var b = this;
                b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
            }),
            (b.prototype.cleanUpRows = function () {
                var a,
                    b = this;
                b.options.rows > 1 && ((a = b.$slides.children().children()), a.removeAttr("style"), b.$slider.empty().append(a));
            }),
            (b.prototype.clickHandler = function (a) {
                !1 === this.shouldClick && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
            }),
            (b.prototype.destroy = function (b) {
                var c = this;
                c.autoPlayClear(),
                    (c.touchObject = {}),
                    c.cleanUpEvents(),
                    a(".slick-cloned", c.$slider).detach(),
                    c.$dots && c.$dots.remove(),
                    c.$prevArrow &&
                        c.$prevArrow.length &&
                        (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
                    c.$nextArrow &&
                        c.$nextArrow.length &&
                        (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
                    c.$slides &&
                        (c.$slides
                            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                            .removeAttr("aria-hidden")
                            .removeAttr("data-slick-index")
                            .each(function () {
                                a(this).attr("style", a(this).data("originalStyling"));
                            }),
                        c.$slideTrack.children(this.options.slide).detach(),
                        c.$slideTrack.detach(),
                        c.$list.detach(),
                        c.$slider.append(c.$slides)),
                    c.cleanUpRows(),
                    c.$slider.removeClass("slick-slider"),
                    c.$slider.removeClass("slick-initialized"),
                    c.$slider.removeClass("slick-dotted"),
                    (c.unslicked = !0),
                    b || c.$slider.trigger("destroy", [c]);
            }),
            (b.prototype.disableTransition = function (a) {
                var b = this,
                    c = {};
                (c[b.transitionType] = ""), !1 === b.options.fade ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
            }),
            (b.prototype.fadeSlide = function (a, b) {
                var c = this;
                !1 === c.cssTransitions
                    ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b))
                    : (c.applyTransition(a),
                      c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }),
                      b &&
                          setTimeout(function () {
                              c.disableTransition(a), b.call();
                          }, c.options.speed));
            }),
            (b.prototype.fadeSlideOut = function (a) {
                var b = this;
                !1 === b.cssTransitions ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
            }),
            (b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
                var b = this;
                null !== a && ((b.$slidesCache = b.$slides), b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit());
            }),
            (b.prototype.focusHandler = function () {
                var b = this;
                b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
                    c.stopImmediatePropagation();
                    var d = a(this);
                    setTimeout(function () {
                        b.options.pauseOnFocus && ((b.focussed = d.is(":focus")), b.autoPlay());
                    }, 0);
                });
            }),
            (b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
                return this.currentSlide;
            }),
            (b.prototype.getDotCount = function () {
                var a = this,
                    b = 0,
                    c = 0,
                    d = 0;
                if (!0 === a.options.infinite) for (; b < a.slideCount; ) ++d, (b = c + a.options.slidesToScroll), (c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
                else if (!0 === a.options.centerMode) d = a.slideCount;
                else if (a.options.asNavFor) for (; b < a.slideCount; ) ++d, (b = c + a.options.slidesToScroll), (c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
                else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
                return d - 1;
            }),
            (b.prototype.getLeft = function (a) {
                var b,
                    c,
                    d,
                    e = this,
                    f = 0;
                return (
                    (e.slideOffset = 0),
                    (c = e.$slides.first().outerHeight(!0)),
                    !0 === e.options.infinite
                        ? (e.slideCount > e.options.slidesToShow && ((e.slideOffset = e.slideWidth * e.options.slidesToShow * -1), (f = c * e.options.slidesToShow * -1)),
                          e.slideCount % e.options.slidesToScroll != 0 &&
                              a + e.options.slidesToScroll > e.slideCount &&
                              e.slideCount > e.options.slidesToShow &&
                              (a > e.slideCount
                                  ? ((e.slideOffset = (e.options.slidesToShow - (a - e.slideCount)) * e.slideWidth * -1), (f = (e.options.slidesToShow - (a - e.slideCount)) * c * -1))
                                  : ((e.slideOffset = (e.slideCount % e.options.slidesToScroll) * e.slideWidth * -1), (f = (e.slideCount % e.options.slidesToScroll) * c * -1))))
                        : a + e.options.slidesToShow > e.slideCount && ((e.slideOffset = (a + e.options.slidesToShow - e.slideCount) * e.slideWidth), (f = (a + e.options.slidesToShow - e.slideCount) * c)),
                    e.slideCount <= e.options.slidesToShow && ((e.slideOffset = 0), (f = 0)),
                    !0 === e.options.centerMode && !0 === e.options.infinite
                        ? (e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2) - e.slideWidth)
                        : !0 === e.options.centerMode && ((e.slideOffset = 0), (e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2))),
                    (b = !1 === e.options.vertical ? a * e.slideWidth * -1 + e.slideOffset : a * c * -1 + f),
                    !0 === e.options.variableWidth &&
                        ((d = e.slideCount <= e.options.slidesToShow || !1 === e.options.infinite ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow)),
                        (b = !0 === e.options.rtl ? (d[0] ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0) : d[0] ? -1 * d[0].offsetLeft : 0),
                        !0 === e.options.centerMode &&
                            ((d = e.slideCount <= e.options.slidesToShow || !1 === e.options.infinite ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow + 1)),
                            (b = !0 === e.options.rtl ? (d[0] ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0) : d[0] ? -1 * d[0].offsetLeft : 0),
                            (b += (e.$list.width() - d.outerWidth()) / 2))),
                    b
                );
            }),
            (b.prototype.getOption = b.prototype.slickGetOption = function (a) {
                return this.options[a];
            }),
            (b.prototype.getNavigableIndexes = function () {
                var a,
                    b = this,
                    c = 0,
                    d = 0,
                    e = [];
                for (!1 === b.options.infinite ? (a = b.slideCount) : ((c = -1 * b.options.slidesToScroll), (d = -1 * b.options.slidesToScroll), (a = 2 * b.slideCount)); c < a; )
                    e.push(c), (c = d + b.options.slidesToScroll), (d += b.options.slidesToScroll <= b.options.slidesToShow ? b.options.slidesToScroll : b.options.slidesToShow);
                return e;
            }),
            (b.prototype.getSlick = function () {
                return this;
            }),
            (b.prototype.getSlideCount = function () {
                var b,
                    c,
                    d = this;
                return (
                    (c = !0 === d.options.centerMode ? d.slideWidth * Math.floor(d.options.slidesToShow / 2) : 0),
                    !0 === d.options.swipeToSlide
                        ? (d.$slideTrack.find(".slick-slide").each(function (e, f) {
                              if (f.offsetLeft - c + a(f).outerWidth() / 2 > -1 * d.swipeLeft) return (b = f), !1;
                          }),
                          Math.abs(a(b).attr("data-slick-index") - d.currentSlide) || 1)
                        : d.options.slidesToScroll
                );
            }),
            (b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
                this.changeSlide({ data: { message: "index", index: parseInt(a) } }, b);
            }),
            (b.prototype.init = function (b) {
                var c = this;
                a(c.$slider).hasClass("slick-initialized") ||
                    (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()),
                    b && c.$slider.trigger("init", [c]),
                    !0 === c.options.accessibility && c.initADA(),
                    c.options.autoplay && ((c.paused = !1), c.autoPlay());
            }),
            (b.prototype.initADA = function () {
                var b = this;
                b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                    b.$slideTrack.attr("role", "listbox"),
                    b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
                        a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c });
                    }),
                    null !== b.$dots &&
                        b.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (c) {
                                a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c });
                            })
                            .first()
                            .attr("aria-selected", "true")
                            .end()
                            .find("button")
                            .attr("role", "button")
                            .end()
                            .closest("div")
                            .attr("role", "toolbar"),
                    b.activateADA();
            }),
            (b.prototype.initArrowEvents = function () {
                var a = this;
                !0 === a.options.arrows &&
                    a.slideCount > a.options.slidesToShow &&
                    (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide));
            }),
            (b.prototype.initDotEvents = function () {
                var b = this;
                !0 === b.options.dots && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide),
                    !0 === b.options.dots && !0 === b.options.pauseOnDotsHover && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
            }),
            (b.prototype.initSlideEvents = function () {
                var b = this;
                b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
            }),
            (b.prototype.initializeEvents = function () {
                var b = this;
                b.initArrowEvents(),
                    b.initDotEvents(),
                    b.initSlideEvents(),
                    b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler),
                    b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler),
                    b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler),
                    b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler),
                    b.$list.on("click.slick", b.clickHandler),
                    a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
                    !0 === b.options.accessibility && b.$list.on("keydown.slick", b.keyHandler),
                    !0 === b.options.focusOnSelect && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
                    a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)),
                    a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)),
                    a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
                    a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
                    a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
            }),
            (b.prototype.initUI = function () {
                var a = this;
                !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), !0 === a.options.dots && a.slideCount > a.options.slidesToShow && a.$dots.show();
            }),
            (b.prototype.keyHandler = function (a) {
                var b = this;
                a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === a.keyCode && !0 === b.options.accessibility
                        ? b.changeSlide({ data: { message: !0 === b.options.rtl ? "next" : "previous" } })
                        : 39 === a.keyCode && !0 === b.options.accessibility && b.changeSlide({ data: { message: !0 === b.options.rtl ? "previous" : "next" } }));
            }),
            (b.prototype.lazyLoad = function () {
                function b(b) {
                    a("img[data-lazy]", b).each(function () {
                        var b = a(this),
                            c = a(this).attr("data-lazy"),
                            d = document.createElement("img");
                        (d.onload = function () {
                            b.animate({ opacity: 0 }, 100, function () {
                                b.attr("src", c).animate({ opacity: 1 }, 200, function () {
                                    b.removeAttr("data-lazy").removeClass("slick-loading");
                                }),
                                    g.$slider.trigger("lazyLoaded", [g, b, c]);
                            });
                        }),
                            (d.onerror = function () {
                                b.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), g.$slider.trigger("lazyLoadError", [g, b, c]);
                            }),
                            (d.src = c);
                    });
                }
                var c,
                    d,
                    e,
                    f,
                    g = this;
                !0 === g.options.centerMode
                    ? !0 === g.options.infinite
                        ? ((e = g.currentSlide + (g.options.slidesToShow / 2 + 1)), (f = e + g.options.slidesToShow + 2))
                        : ((e = Math.max(0, g.currentSlide - (g.options.slidesToShow / 2 + 1))), (f = g.options.slidesToShow / 2 + 1 + 2 + g.currentSlide))
                    : ((e = g.options.infinite ? g.options.slidesToShow + g.currentSlide : g.currentSlide), (f = Math.ceil(e + g.options.slidesToShow)), !0 === g.options.fade && (e > 0 && e--, f <= g.slideCount && f++)),
                    (c = g.$slider.find(".slick-slide").slice(e, f)),
                    b(c),
                    g.slideCount <= g.options.slidesToShow
                        ? ((d = g.$slider.find(".slick-slide")), b(d))
                        : g.currentSlide >= g.slideCount - g.options.slidesToShow
                        ? ((d = g.$slider.find(".slick-cloned").slice(0, g.options.slidesToShow)), b(d))
                        : 0 === g.currentSlide && ((d = g.$slider.find(".slick-cloned").slice(-1 * g.options.slidesToShow)), b(d));
            }),
            (b.prototype.loadSlider = function () {
                var a = this;
                a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
            }),
            (b.prototype.next = b.prototype.slickNext = function () {
                this.changeSlide({ data: { message: "next" } });
            }),
            (b.prototype.orientationChange = function () {
                var a = this;
                a.checkResponsive(), a.setPosition();
            }),
            (b.prototype.pause = b.prototype.slickPause = function () {
                var a = this;
                a.autoPlayClear(), (a.paused = !0);
            }),
            (b.prototype.play = b.prototype.slickPlay = function () {
                var a = this;
                a.autoPlay(), (a.options.autoplay = !0), (a.paused = !1), (a.focussed = !1), (a.interrupted = !1);
            }),
            (b.prototype.postSlide = function (a) {
                var b = this;
                b.unslicked || (b.$slider.trigger("afterChange", [b, a]), (b.animating = !1), b.setPosition(), (b.swipeLeft = null), b.options.autoplay && b.autoPlay(), !0 === b.options.accessibility && b.initADA());
            }),
            (b.prototype.prev = b.prototype.slickPrev = function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
            (b.prototype.preventDefault = function (a) {
                a.preventDefault();
            }),
            (b.prototype.progressiveLazyLoad = function (b) {
                b = b || 1;
                var c,
                    d,
                    e,
                    f = this,
                    g = a("img[data-lazy]", f.$slider);
                g.length
                    ? ((c = g.first()),
                      (d = c.attr("data-lazy")),
                      (e = document.createElement("img")),
                      (e.onload = function () {
                          c.attr("src", d).removeAttr("data-lazy").removeClass("slick-loading"), !0 === f.options.adaptiveHeight && f.setPosition(), f.$slider.trigger("lazyLoaded", [f, c, d]), f.progressiveLazyLoad();
                      }),
                      (e.onerror = function () {
                          b < 3
                              ? setTimeout(function () {
                                    f.progressiveLazyLoad(b + 1);
                                }, 500)
                              : (c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), f.$slider.trigger("lazyLoadError", [f, c, d]), f.progressiveLazyLoad());
                      }),
                      (e.src = d))
                    : f.$slider.trigger("allImagesLoaded", [f]);
            }),
            (b.prototype.refresh = function (b) {
                var c,
                    d,
                    e = this;
                (d = e.slideCount - e.options.slidesToShow),
                    !e.options.infinite && e.currentSlide > d && (e.currentSlide = d),
                    e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                    (c = e.currentSlide),
                    e.destroy(!0),
                    a.extend(e, e.initials, { currentSlide: c }),
                    e.init(),
                    b || e.changeSlide({ data: { message: "index", index: c } }, !1);
            }),
            (b.prototype.registerBreakpoints = function () {
                var b,
                    c,
                    d,
                    e = this,
                    f = e.options.responsive || null;
                if ("array" === a.type(f) && f.length) {
                    e.respondTo = e.options.respondTo || "window";
                    for (b in f)
                        if (((d = e.breakpoints.length - 1), (c = f[b].breakpoint), f.hasOwnProperty(b))) {
                            for (; d >= 0; ) e.breakpoints[d] && e.breakpoints[d] === c && e.breakpoints.splice(d, 1), d--;
                            e.breakpoints.push(c), (e.breakpointSettings[c] = f[b].settings);
                        }
                    e.breakpoints.sort(function (a, b) {
                        return e.options.mobileFirst ? a - b : b - a;
                    });
                }
            }),
            (b.prototype.reinit = function () {
                var b = this;
                (b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide")),
                    (b.slideCount = b.$slides.length),
                    b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
                    b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
                    b.registerBreakpoints(),
                    b.setProps(),
                    b.setupInfinite(),
                    b.buildArrows(),
                    b.updateArrows(),
                    b.initArrowEvents(),
                    b.buildDots(),
                    b.updateDots(),
                    b.initDotEvents(),
                    b.cleanUpSlideEvents(),
                    b.initSlideEvents(),
                    b.checkResponsive(!1, !0),
                    !0 === b.options.focusOnSelect && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
                    b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
                    b.setPosition(),
                    b.focusHandler(),
                    (b.paused = !b.options.autoplay),
                    b.autoPlay(),
                    b.$slider.trigger("reInit", [b]);
            }),
            (b.prototype.resize = function () {
                var b = this;
                a(window).width() !== b.windowWidth &&
                    (clearTimeout(b.windowDelay),
                    (b.windowDelay = window.setTimeout(function () {
                        (b.windowWidth = a(window).width()), b.checkResponsive(), b.unslicked || b.setPosition();
                    }, 50)));
            }),
            (b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
                var d = this;
                if (("boolean" == typeof a ? ((b = a), (a = !0 === b ? 0 : d.slideCount - 1)) : (a = !0 === b ? --a : a), d.slideCount < 1 || a < 0 || a > d.slideCount - 1)) return !1;
                d.unload(),
                    !0 === c ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(),
                    (d.$slides = d.$slideTrack.children(this.options.slide)),
                    d.$slideTrack.children(this.options.slide).detach(),
                    d.$slideTrack.append(d.$slides),
                    (d.$slidesCache = d.$slides),
                    d.reinit();
            }),
            (b.prototype.setCSS = function (a) {
                var b,
                    c,
                    d = this,
                    e = {};
                !0 === d.options.rtl && (a = -a),
                    (b = "left" == d.positionProp ? Math.ceil(a) + "px" : "0px"),
                    (c = "top" == d.positionProp ? Math.ceil(a) + "px" : "0px"),
                    (e[d.positionProp] = a),
                    !1 === d.transformsEnabled
                        ? d.$slideTrack.css(e)
                        : ((e = {}), !1 === d.cssTransitions ? ((e[d.animType] = "translate(" + b + ", " + c + ")"), d.$slideTrack.css(e)) : ((e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)"), d.$slideTrack.css(e)));
            }),
            (b.prototype.setDimensions = function () {
                var a = this;
                !1 === a.options.vertical
                    ? !0 === a.options.centerMode && a.$list.css({ padding: "0px " + a.options.centerPadding })
                    : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), !0 === a.options.centerMode && a.$list.css({ padding: a.options.centerPadding + " 0px" })),
                    (a.listWidth = a.$list.width()),
                    (a.listHeight = a.$list.height()),
                    !1 === a.options.vertical && !1 === a.options.variableWidth
                        ? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length)))
                        : !0 === a.options.variableWidth
                        ? a.$slideTrack.width(5e3 * a.slideCount)
                        : ((a.slideWidth = Math.ceil(a.listWidth)), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
                var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
                !1 === a.options.variableWidth && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
            }),
            (b.prototype.setFade = function () {
                var b,
                    c = this;
                c.$slides.each(function (d, e) {
                    (b = c.slideWidth * d * -1),
                        !0 === c.options.rtl ? a(e).css({ position: "relative", right: b, top: 0, zIndex: c.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: b, top: 0, zIndex: c.options.zIndex - 2, opacity: 0 });
                }),
                    c.$slides.eq(c.currentSlide).css({ zIndex: c.options.zIndex - 1, opacity: 1 });
            }),
            (b.prototype.setHeight = function () {
                var a = this;
                if (1 === a.options.slidesToShow && !0 === a.options.adaptiveHeight && !1 === a.options.vertical) {
                    var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                    a.$list.css("height", b);
                }
            }),
            (b.prototype.setOption = b.prototype.slickSetOption = function () {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g = this,
                    h = !1;
                if (
                    ("object" === a.type(arguments[0])
                        ? ((d = arguments[0]), (h = arguments[1]), (f = "multiple"))
                        : "string" === a.type(arguments[0]) &&
                          ((d = arguments[0]), (e = arguments[1]), (h = arguments[2]), "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? (f = "responsive") : void 0 !== arguments[1] && (f = "single")),
                    "single" === f)
                )
                    g.options[d] = e;
                else if ("multiple" === f)
                    a.each(d, function (a, b) {
                        g.options[a] = b;
                    });
                else if ("responsive" === f)
                    for (c in e)
                        if ("array" !== a.type(g.options.responsive)) g.options.responsive = [e[c]];
                        else {
                            for (b = g.options.responsive.length - 1; b >= 0; ) g.options.responsive[b].breakpoint === e[c].breakpoint && g.options.responsive.splice(b, 1), b--;
                            g.options.responsive.push(e[c]);
                        }
                h && (g.unload(), g.reinit());
            }),
            (b.prototype.setPosition = function () {
                var a = this;
                a.setDimensions(), a.setHeight(), !1 === a.options.fade ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]);
            }),
            (b.prototype.setProps = function () {
                var a = this,
                    b = document.body.style;
                (a.positionProp = !0 === a.options.vertical ? "top" : "left"),
                    "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"),
                    (void 0 === b.WebkitTransition && void 0 === b.MozTransition && void 0 === b.msTransition) || (!0 === a.options.useCSS && (a.cssTransitions = !0)),
                    a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : (a.options.zIndex = a.defaults.zIndex)),
                    void 0 !== b.OTransform && ((a.animType = "OTransform"), (a.transformType = "-o-transform"), (a.transitionType = "OTransition"), void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
                    void 0 !== b.MozTransform &&
                        ((a.animType = "MozTransform"), (a.transformType = "-moz-transform"), (a.transitionType = "MozTransition"), void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
                    void 0 !== b.webkitTransform &&
                        ((a.animType = "webkitTransform"), (a.transformType = "-webkit-transform"), (a.transitionType = "webkitTransition"), void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
                    void 0 !== b.msTransform && ((a.animType = "msTransform"), (a.transformType = "-ms-transform"), (a.transitionType = "msTransition"), void 0 === b.msTransform && (a.animType = !1)),
                    void 0 !== b.transform && !1 !== a.animType && ((a.animType = "transform"), (a.transformType = "transform"), (a.transitionType = "transition")),
                    (a.transformsEnabled = a.options.useTransform && null !== a.animType && !1 !== a.animType);
            }),
            (b.prototype.setSlideClasses = function (a) {
                var b,
                    c,
                    d,
                    e,
                    f = this;
                (c = f.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")),
                    f.$slides.eq(a).addClass("slick-current"),
                    !0 === f.options.centerMode
                        ? ((b = Math.floor(f.options.slidesToShow / 2)),
                          !0 === f.options.infinite &&
                              (a >= b && a <= f.slideCount - 1 - b
                                  ? f.$slides
                                        .slice(a - b, a + b + 1)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")
                                  : ((d = f.options.slidesToShow + a),
                                    c
                                        .slice(d - b + 1, d + b + 2)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")),
                              0 === a ? c.eq(c.length - 1 - f.options.slidesToShow).addClass("slick-center") : a === f.slideCount - 1 && c.eq(f.options.slidesToShow).addClass("slick-center")),
                          f.$slides.eq(a).addClass("slick-center"))
                        : a >= 0 && a <= f.slideCount - f.options.slidesToShow
                        ? f.$slides
                              .slice(a, a + f.options.slidesToShow)
                              .addClass("slick-active")
                              .attr("aria-hidden", "false")
                        : c.length <= f.options.slidesToShow
                        ? c.addClass("slick-active").attr("aria-hidden", "false")
                        : ((e = f.slideCount % f.options.slidesToShow),
                          (d = !0 === f.options.infinite ? f.options.slidesToShow + a : a),
                          f.options.slidesToShow == f.options.slidesToScroll && f.slideCount - a < f.options.slidesToShow
                              ? c
                                    .slice(d - (f.options.slidesToShow - e), d + e)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : c
                                    .slice(d, d + f.options.slidesToShow)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")),
                    "ondemand" === f.options.lazyLoad && f.lazyLoad();
            }),
            (b.prototype.setupInfinite = function () {
                var b,
                    c,
                    d,
                    e = this;
                if ((!0 === e.options.fade && (e.options.centerMode = !1), !0 === e.options.infinite && !1 === e.options.fade && ((c = null), e.slideCount > e.options.slidesToShow))) {
                    for (d = !0 === e.options.centerMode ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1)
                        (c = b - 1),
                            a(e.$slides[c])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", c - e.slideCount)
                                .prependTo(e.$slideTrack)
                                .addClass("slick-cloned");
                    for (b = 0; b < d; b += 1)
                        (c = b),
                            a(e.$slides[c])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", c + e.slideCount)
                                .appendTo(e.$slideTrack)
                                .addClass("slick-cloned");
                    e.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            a(this).attr("id", "");
                        });
                }
            }),
            (b.prototype.interrupt = function (a) {
                var b = this;
                a || b.autoPlay(), (b.interrupted = a);
            }),
            (b.prototype.selectHandler = function (b) {
                var c = this,
                    d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
                    e = parseInt(d.attr("data-slick-index"));
                if ((e || (e = 0), c.slideCount <= c.options.slidesToShow)) return c.setSlideClasses(e), void c.asNavFor(e);
                c.slideHandler(e);
            }),
            (b.prototype.slideHandler = function (a, b, c) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i = null,
                    j = this;
                if (((b = b || !1), (!0 !== j.animating || !0 !== j.options.waitForAnimate) && !((!0 === j.options.fade && j.currentSlide === a) || j.slideCount <= j.options.slidesToShow))) {
                    if (
                        (!1 === b && j.asNavFor(a),
                        (d = a),
                        (i = j.getLeft(d)),
                        (g = j.getLeft(j.currentSlide)),
                        (j.currentLeft = null === j.swipeLeft ? g : j.swipeLeft),
                        !1 === j.options.infinite && !1 === j.options.centerMode && (a < 0 || a > j.getDotCount() * j.options.slidesToScroll))
                    )
                        return void (
                            !1 === j.options.fade &&
                            ((d = j.currentSlide),
                            !0 !== c
                                ? j.animateSlide(g, function () {
                                      j.postSlide(d);
                                  })
                                : j.postSlide(d))
                        );
                    if (!1 === j.options.infinite && !0 === j.options.centerMode && (a < 0 || a > j.slideCount - j.options.slidesToScroll))
                        return void (
                            !1 === j.options.fade &&
                            ((d = j.currentSlide),
                            !0 !== c
                                ? j.animateSlide(g, function () {
                                      j.postSlide(d);
                                  })
                                : j.postSlide(d))
                        );
                    if (
                        (j.options.autoplay && clearInterval(j.autoPlayTimer),
                        (e =
                            d < 0
                                ? j.slideCount % j.options.slidesToScroll != 0
                                    ? j.slideCount - (j.slideCount % j.options.slidesToScroll)
                                    : j.slideCount + d
                                : d >= j.slideCount
                                ? j.slideCount % j.options.slidesToScroll != 0
                                    ? 0
                                    : d - j.slideCount
                                : d),
                        (j.animating = !0),
                        j.$slider.trigger("beforeChange", [j, j.currentSlide, e]),
                        (f = j.currentSlide),
                        (j.currentSlide = e),
                        j.setSlideClasses(j.currentSlide),
                        j.options.asNavFor && ((h = j.getNavTarget()), (h = h.slick("getSlick")), h.slideCount <= h.options.slidesToShow && h.setSlideClasses(j.currentSlide)),
                        j.updateDots(),
                        j.updateArrows(),
                        !0 === j.options.fade)
                    )
                        return (
                            !0 !== c
                                ? (j.fadeSlideOut(f),
                                  j.fadeSlide(e, function () {
                                      j.postSlide(e);
                                  }))
                                : j.postSlide(e),
                            void j.animateHeight()
                        );
                    !0 !== c
                        ? j.animateSlide(i, function () {
                              j.postSlide(e);
                          })
                        : j.postSlide(e);
                }
            }),
            (b.prototype.startLoad = function () {
                var a = this;
                !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()),
                    !0 === a.options.dots && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
                    a.$slider.addClass("slick-loading");
            }),
            (b.prototype.swipeDirection = function () {
                var a,
                    b,
                    c,
                    d,
                    e = this;
                return (
                    (a = e.touchObject.startX - e.touchObject.curX),
                    (b = e.touchObject.startY - e.touchObject.curY),
                    (c = Math.atan2(b, a)),
                    (d = Math.round((180 * c) / Math.PI)),
                    d < 0 && (d = 360 - Math.abs(d)),
                    d <= 45 && d >= 0
                        ? !1 === e.options.rtl
                            ? "left"
                            : "right"
                        : d <= 360 && d >= 315
                        ? !1 === e.options.rtl
                            ? "left"
                            : "right"
                        : d >= 135 && d <= 225
                        ? !1 === e.options.rtl
                            ? "right"
                            : "left"
                        : !0 === e.options.verticalSwiping
                        ? d >= 35 && d <= 135
                            ? "down"
                            : "up"
                        : "vertical"
                );
            }),
            (b.prototype.swipeEnd = function (a) {
                var b,
                    c,
                    d = this;
                if (((d.dragging = !1), (d.interrupted = !1), (d.shouldClick = !(d.touchObject.swipeLength > 10)), void 0 === d.touchObject.curX)) return !1;
                if ((!0 === d.touchObject.edgeHit && d.$slider.trigger("edge", [d, d.swipeDirection()]), d.touchObject.swipeLength >= d.touchObject.minSwipe)) {
                    switch ((c = d.swipeDirection())) {
                        case "left":
                        case "down":
                            (b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide + d.getSlideCount()) : d.currentSlide + d.getSlideCount()), (d.currentDirection = 0);
                            break;
                        case "right":
                        case "up":
                            (b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide - d.getSlideCount()) : d.currentSlide - d.getSlideCount()), (d.currentDirection = 1);
                    }
                    "vertical" != c && (d.slideHandler(b), (d.touchObject = {}), d.$slider.trigger("swipe", [d, c]));
                } else d.touchObject.startX !== d.touchObject.curX && (d.slideHandler(d.currentSlide), (d.touchObject = {}));
            }),
            (b.prototype.swipeHandler = function (a) {
                var b = this;
                if (!(!1 === b.options.swipe || ("ontouchend" in document && !1 === b.options.swipe) || (!1 === b.options.draggable && -1 !== a.type.indexOf("mouse"))))
                    switch (
                        ((b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1),
                        (b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
                        !0 === b.options.verticalSwiping && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
                        a.data.action)
                    ) {
                        case "start":
                            b.swipeStart(a);
                            break;
                        case "move":
                            b.swipeMove(a);
                            break;
                        case "end":
                            b.swipeEnd(a);
                    }
            }),
            (b.prototype.swipeMove = function (a) {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g = this;
                return (
                    (f = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
                    !(!g.dragging || (f && 1 !== f.length)) &&
                        ((b = g.getLeft(g.currentSlide)),
                        (g.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX),
                        (g.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY),
                        (g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curX - g.touchObject.startX, 2)))),
                        !0 === g.options.verticalSwiping && (g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curY - g.touchObject.startY, 2)))),
                        "vertical" !== (c = g.swipeDirection())
                            ? (void 0 !== a.originalEvent && g.touchObject.swipeLength > 4 && a.preventDefault(),
                              (e = (!1 === g.options.rtl ? 1 : -1) * (g.touchObject.curX > g.touchObject.startX ? 1 : -1)),
                              !0 === g.options.verticalSwiping && (e = g.touchObject.curY > g.touchObject.startY ? 1 : -1),
                              (d = g.touchObject.swipeLength),
                              (g.touchObject.edgeHit = !1),
                              !1 === g.options.infinite &&
                                  ((0 === g.currentSlide && "right" === c) || (g.currentSlide >= g.getDotCount() && "left" === c)) &&
                                  ((d = g.touchObject.swipeLength * g.options.edgeFriction), (g.touchObject.edgeHit = !0)),
                              !1 === g.options.vertical ? (g.swipeLeft = b + d * e) : (g.swipeLeft = b + d * (g.$list.height() / g.listWidth) * e),
                              !0 === g.options.verticalSwiping && (g.swipeLeft = b + d * e),
                              !0 !== g.options.fade && !1 !== g.options.touchMove && (!0 === g.animating ? ((g.swipeLeft = null), !1) : void g.setCSS(g.swipeLeft)))
                            : void 0)
                );
            }),
            (b.prototype.swipeStart = function (a) {
                var b,
                    c = this;
                if (((c.interrupted = !0), 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow)) return (c.touchObject = {}), !1;
                void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]),
                    (c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX),
                    (c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY),
                    (c.dragging = !0);
            }),
            (b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
                var a = this;
                null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit());
            }),
            (b.prototype.unload = function () {
                var b = this;
                a(".slick-cloned", b.$slider).remove(),
                    b.$dots && b.$dots.remove(),
                    b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
                    b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
                    b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }),
            (b.prototype.unslick = function (a) {
                var b = this;
                b.$slider.trigger("unslick", [b, a]), b.destroy();
            }),
            (b.prototype.updateArrows = function () {
                var a = this;
                Math.floor(a.options.slidesToShow / 2),
                    !0 === a.options.arrows &&
                        a.slideCount > a.options.slidesToShow &&
                        !a.options.infinite &&
                        (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === a.currentSlide
                            ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : a.currentSlide >= a.slideCount - a.options.slidesToShow && !1 === a.options.centerMode
                            ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : a.currentSlide >= a.slideCount - 1 &&
                              !0 === a.options.centerMode &&
                              (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (b.prototype.updateDots = function () {
                var a = this;
                null !== a.$dots &&
                    (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
                    a.$dots
                        .find("li")
                        .eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
                        .addClass("slick-active")
                        .attr("aria-hidden", "false"));
            }),
            (b.prototype.visibility = function () {
                var a = this;
                a.options.autoplay && (document[a.hidden] ? (a.interrupted = !0) : (a.interrupted = !1));
            }),
            (a.fn.slick = function () {
                var a,
                    c,
                    d = this,
                    e = arguments[0],
                    f = Array.prototype.slice.call(arguments, 1),
                    g = d.length;
                for (a = 0; a < g; a++) if (("object" == typeof e || void 0 === e ? (d[a].slick = new b(d[a], e)) : (c = d[a].slick[e].apply(d[a].slick, f)), void 0 !== c)) return c;
                return d;
            });
    }),
    (function (a) {
        "use strict";
        function b(b) {
            var c = [
                { re: /[\xC0-\xC6]/g, ch: "A" },
                { re: /[\xE0-\xE6]/g, ch: "a" },
                { re: /[\xC8-\xCB]/g, ch: "E" },
                { re: /[\xE8-\xEB]/g, ch: "e" },
                { re: /[\xCC-\xCF]/g, ch: "I" },
                { re: /[\xEC-\xEF]/g, ch: "i" },
                { re: /[\xD2-\xD6]/g, ch: "O" },
                { re: /[\xF2-\xF6]/g, ch: "o" },
                { re: /[\xD9-\xDC]/g, ch: "U" },
                { re: /[\xF9-\xFC]/g, ch: "u" },
                { re: /[\xC7-\xE7]/g, ch: "c" },
                { re: /[\xD1]/g, ch: "N" },
                { re: /[\xF1]/g, ch: "n" },
            ];
            return (
                a.each(c, function () {
                    b = b ? b.replace(this.re, this.ch) : "";
                }),
                b
            );
        }
        function c(b) {
            var c = arguments,
                d = b;
            [].shift.apply(c);
            var e,
                f = this.each(function () {
                    var b = a(this);
                    if (b.is("select")) {
                        var f = b.data("selectpicker"),
                            g = "object" == typeof d && d;
                        if (f) {
                            if (g) for (var h in g) g.hasOwnProperty(h) && (f.options[h] = g[h]);
                        } else {
                            var i = a.extend({}, k.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), g);
                            (i.template = a.extend({}, k.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, g.template)), b.data("selectpicker", (f = new k(this, i)));
                        }
                        "string" == typeof d && (e = f[d] instanceof Function ? f[d].apply(f, c) : f.options[d]);
                    }
                });
            return void 0 !== e ? e : f;
        }
        String.prototype.includes ||
            (function () {
                var a = {}.toString,
                    b = (function () {
                        try {
                            var a = {},
                                b = Object.defineProperty,
                                c = b(a, a, a) && b;
                        } catch (a) {}
                        return c;
                    })(),
                    c = "".indexOf,
                    d = function (b) {
                        if (null == this) throw new TypeError();
                        var d = String(this);
                        if (b && "[object RegExp]" == a.call(b)) throw new TypeError();
                        var e = d.length,
                            f = String(b),
                            g = f.length,
                            h = arguments.length > 1 ? arguments[1] : void 0,
                            i = h ? Number(h) : 0;
                        return i != i && (i = 0), !(g + Math.min(Math.max(i, 0), e) > e) && -1 != c.call(d, f, i);
                    };
                b ? b(String.prototype, "includes", { value: d, configurable: !0, writable: !0 }) : (String.prototype.includes = d);
            })(),
            String.prototype.startsWith ||
                (function () {
                    var a = (function () {
                            try {
                                var a = {},
                                    b = Object.defineProperty,
                                    c = b(a, a, a) && b;
                            } catch (a) {}
                            return c;
                        })(),
                        b = {}.toString,
                        c = function (a) {
                            if (null == this) throw new TypeError();
                            var c = String(this);
                            if (a && "[object RegExp]" == b.call(a)) throw new TypeError();
                            var d = c.length,
                                e = String(a),
                                f = e.length,
                                g = arguments.length > 1 ? arguments[1] : void 0,
                                h = g ? Number(g) : 0;
                            h != h && (h = 0);
                            var i = Math.min(Math.max(h, 0), d);
                            if (f + i > d) return !1;
                            for (var j = -1; ++j < f; ) if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
                            return !0;
                        };
                    a ? a(String.prototype, "startsWith", { value: c, configurable: !0, writable: !0 }) : (String.prototype.startsWith = c);
                })(),
            Object.keys ||
                (Object.keys = function (a, b, c) {
                    c = [];
                    for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
                    return c;
                });
        var d = { useDefault: !1, _set: a.valHooks.select.set };
        a.valHooks.select.set = function (b, c) {
            return c && !d.useDefault && a(b).data("selected", !0), d._set.apply(this, arguments);
        };
        var e = null;
        (a.fn.triggerNative = function (a) {
            var b,
                c = this[0];
            c.dispatchEvent
                ? ("function" == typeof Event ? (b = new Event(a, { bubbles: !0 })) : ((b = document.createEvent("Event")), b.initEvent(a, !0, !1)), c.dispatchEvent(b))
                : c.fireEvent
                ? ((b = document.createEventObject()), (b.eventType = a), c.fireEvent("on" + a, b))
                : this.trigger(a);
        }),
            (a.expr.pseudos.icontains = function (b, c, d) {
                var e = a(b).find("a");
                return (e.data("tokens") || e.text()).toString().toUpperCase().includes(d[3].toUpperCase());
            }),
            (a.expr.pseudos.ibegins = function (b, c, d) {
                var e = a(b).find("a");
                return (e.data("tokens") || e.text()).toString().toUpperCase().startsWith(d[3].toUpperCase());
            }),
            (a.expr.pseudos.aicontains = function (b, c, d) {
                var e = a(b).find("a");
                return (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase().includes(d[3].toUpperCase());
            }),
            (a.expr.pseudos.aibegins = function (b, c, d) {
                var e = a(b).find("a");
                return (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase().startsWith(d[3].toUpperCase());
            });
        var f = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
            g = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#x60;": "`" },
            h = function (a) {
                var b = function (b) {
                        return a[b];
                    },
                    c = "(?:" + Object.keys(a).join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g");
                return function (a) {
                    return (a = null == a ? "" : "" + a), d.test(a) ? a.replace(e, b) : a;
                };
            },
            i = h(f),
            j = h(g),
            k = function (b, c) {
                d.useDefault || ((a.valHooks.select.set = d._set), (d.useDefault = !0)),
                    (this.$element = a(b)),
                    (this.$newElement = null),
                    (this.$button = null),
                    (this.$menu = null),
                    (this.$lis = null),
                    (this.options = c),
                    null === this.options.title && (this.options.title = this.$element.attr("title"));
                var e = this.options.windowPadding;
                "number" == typeof e && (this.options.windowPadding = [e, e, e, e]),
                    (this.val = k.prototype.val),
                    (this.render = k.prototype.render),
                    (this.refresh = k.prototype.refresh),
                    (this.setStyle = k.prototype.setStyle),
                    (this.selectAll = k.prototype.selectAll),
                    (this.deselectAll = k.prototype.deselectAll),
                    (this.destroy = k.prototype.destroy),
                    (this.remove = k.prototype.remove),
                    (this.show = k.prototype.show),
                    (this.hide = k.prototype.hide),
                    this.init();
            };
        (k.VERSION = "1.12.2"),
            (k.DEFAULTS = {
                noneSelectedText: "Nothing selected",
                noneResultsText: "No results matched {0}",
                countSelectedText: function (a, b) {
                    return 1 == a ? "{0} renfort selectionné" : "{0} renforts selectionnés";
                },
                maxOptionsText: function (a, b) {
                    return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"];
                },
                selectAllText: "Select All",
                deselectAllText: "Deselect All",
                doneButton: !1,
                doneButtonText: "Close",
                multipleSeparator: ", ",
                styleBase: "btn",
                style: "btn-default",
                size: "auto",
                title: null,
                selectedTextFormat: "values",
                width: !1,
                container: !1,
                hideDisabled: !1,
                showSubtext: !1,
                showIcon: !0,
                showContent: !1,
                dropupAuto: !0,
                header: !1,
                liveSearch: !1,
                liveSearchPlaceholder: null,
                liveSearchNormalize: !1,
                liveSearchStyle: "contains",
                actionsBox: !1,
                iconBase: "glyphicon",
                tickIcon: "glyphicon-ok",
                showTick: !1,
                template: { caret: '<span class="caret"></span>' },
                maxOptions: !1,
                mobile: !1,
                selectOnTab: !1,
                dropdownAlignRight: !1,
                windowPadding: 0,
            }),
            (k.prototype = {
                constructor: k,
                init: function () {
                    var b = this,
                        c = this.$element.attr("id");
                    this.$element.addClass("bs-select-hidden"),
                        (this.liObj = {}),
                        (this.multiple = this.$element.prop("multiple")),
                        (this.autofocus = this.$element.prop("autofocus")),
                        (this.$newElement = this.createView()),
                        this.$element.after(this.$newElement).appendTo(this.$newElement),
                        (this.$button = this.$newElement.children("button")),
                        (this.$menu = this.$newElement.children(".dropdown-menu")),
                        (this.$menuInner = this.$menu.children(".inner")),
                        (this.$searchbox = this.$menu.find("input")),
                        this.$element.removeClass("bs-select-hidden"),
                        !0 === this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"),
                        void 0 !== c &&
                            (this.$button.attr("data-id", c),
                            a('label[for="' + c + '"]').click(function (a) {
                                a.preventDefault(), b.$button.focus();
                            })),
                        this.checkDisabled(),
                        this.clickListener(),
                        this.options.liveSearch && this.liveSearchListener(),
                        this.render(),
                        this.setStyle(),
                        this.setWidth(),
                        this.options.container && this.selectPosition(),
                        this.$menu.data("this", this),
                        this.$newElement.data("this", this),
                        this.options.mobile && this.mobile(),
                        this.$newElement.on({
                            "hide.bs.dropdown": function (a) {
                                b.$menuInner.attr("aria-expanded", !1), b.$element.trigger("hide.bs.select", a);
                            },
                            "hidden.bs.dropdown": function (a) {
                                b.$element.trigger("hidden.bs.select", a);
                            },
                            "show.bs.dropdown": function (a) {
                                b.$menuInner.attr("aria-expanded", !0), b.$element.trigger("show.bs.select", a);
                            },
                            "shown.bs.dropdown": function (a) {
                                b.$element.trigger("shown.bs.select", a);
                            },
                        }),
                        b.$element[0].hasAttribute("required") &&
                            this.$element.on("invalid", function () {
                                b.$button.addClass("bs-invalid").focus(),
                                    b.$element.on({
                                        "focus.bs.select": function () {
                                            b.$button.focus(), b.$element.off("focus.bs.select");
                                        },
                                        "shown.bs.select": function () {
                                            b.$element.val(b.$element.val()).off("shown.bs.select");
                                        },
                                        "rendered.bs.select": function () {
                                            this.validity.valid && b.$button.removeClass("bs-invalid"), b.$element.off("rendered.bs.select");
                                        },
                                    });
                            }),
                        setTimeout(function () {
                            b.$element.trigger("loaded.bs.select");
                        });
                },
                createDropdown: function () {
                    var b = this.multiple || this.options.showTick ? " show-tick" : "",
                        c = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                        d = this.autofocus ? " autofocus" : "",
                        e = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                        f = this.options.liveSearch
                            ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' +
                              (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') +
                              ' role="textbox" aria-label="Search"></div>'
                            : "",
                        g =
                            this.multiple && this.options.actionsBox
                                ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' +
                                  this.options.selectAllText +
                                  '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' +
                                  this.options.deselectAllText +
                                  "</button></div></div>"
                                : "",
                        h =
                            this.multiple && this.options.doneButton
                                ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>"
                                : "",
                        j =
                            '<div class="btn-group bootstrap-select' +
                            b +
                            c +
                            '"><button type="button" class="' +
                            this.options.styleBase +
                            ' dropdown-toggle" data-toggle="dropdown"' +
                            d +
                            ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' +
                            this.options.template.caret +
                            '</span></button><div class="dropdown-menu open" role="combobox">' +
                            e +
                            f +
                            g +
                            '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' +
                            h +
                            "</div></div>";
                    return a(j);
                },
                createView: function () {
                    var a = this.createDropdown(),
                        b = this.createLi();
                    return (a.find("ul")[0].innerHTML = b), a;
                },
                reloadLi: function () {
                    var a = this.createLi();
                    this.$menuInner[0].innerHTML = a;
                },
                createLi: function () {
                    var c = this,
                        d = [],
                        e = 0,
                        f = document.createElement("option"),
                        g = -1,
                        h = function (a, b, c, d) {
                            return (
                                "<li" +
                                (void 0 !== c && "" !== c ? ' class="' + c + '"' : "") +
                                (void 0 !== b && null !== b ? ' data-original-index="' + b + '"' : "") +
                                (void 0 !== d && null !== d ? 'data-optgroup="' + d + '"' : "") +
                                ">" +
                                a +
                                "</li>"
                            );
                        },
                        j = function (d, e, f, g) {
                            return (
                                '<a tabindex="0"' +
                                (void 0 !== e ? ' class="' + e + '"' : "") +
                                (f ? ' style="' + f + '"' : "") +
                                (c.options.liveSearchNormalize ? ' data-normalized-text="' + b(i(a(d).html())) + '"' : "") +
                                (void 0 !== g || null !== g ? ' data-tokens="' + g + '"' : "") +
                                ' role="option">' +
                                d +
                                '<span class="' +
                                c.options.iconBase +
                                " " +
                                c.options.tickIcon +
                                ' check-mark"></span></a>'
                            );
                        };
                    if (this.options.title && !this.multiple && (g--, !this.$element.find(".bs-title-option").length)) {
                        var k = this.$element[0];
                        (f.className = "bs-title-option"), (f.innerHTML = this.options.title), (f.value = ""), k.insertBefore(f, k.firstChild);
                        void 0 === a(k.options[k.selectedIndex]).attr("selected") && void 0 === this.$element.data("selected") && (f.selected = !0);
                    }
                    var l = this.$element.find("option");
                    return (
                        l.each(function (b) {
                            var f = a(this);
                            if ((g++, !f.hasClass("bs-title-option"))) {
                                var k,
                                    m = this.className || "",
                                    n = i(this.style.cssText),
                                    o = f.data("content") ? f.data("content") : f.html(),
                                    p = f.data("tokens") ? f.data("tokens") : null,
                                    q = void 0 !== f.data("subtext") ? '<small class="text-muted">' + f.data("subtext") + "</small>" : "",
                                    r = void 0 !== f.data("icon") ? '<span class="' + c.options.iconBase + " " + f.data("icon") + '"></span> ' : "",
                                    s = f.parent(),
                                    t = "OPTGROUP" === s[0].tagName,
                                    u = t && s[0].disabled,
                                    v = this.disabled || u;
                                if (("" !== r && v && (r = "<span>" + r + "</span>"), c.options.hideDisabled && ((v && !t) || u))) return (k = f.data("prevHiddenIndex")), f.next().data("prevHiddenIndex", void 0 !== k ? k : b), void g--;
                                if ((f.data("content") || (o = r + '<span class="text">' + o + q + "</span>"), t && !0 !== f.data("divider"))) {
                                    if (c.options.hideDisabled && v) {
                                        if (void 0 === s.data("allOptionsDisabled")) {
                                            var w = s.children();
                                            s.data("allOptionsDisabled", w.filter(":disabled").length === w.length);
                                        }
                                        if (s.data("allOptionsDisabled")) return void g--;
                                    }
                                    var x = " " + s[0].className || "";
                                    if (0 === f.index()) {
                                        e += 1;
                                        var y = s[0].label,
                                            z = void 0 !== s.data("subtext") ? '<small class="text-muted">' + s.data("subtext") + "</small>" : "";
                                        (y = (s.data("icon") ? '<span class="' + c.options.iconBase + " " + s.data("icon") + '"></span> ' : "") + '<span class="text">' + i(y) + z + "</span>"),
                                            0 !== b && d.length > 0 && (g++, d.push(h("", null, "divider", e + "div"))),
                                            g++,
                                            d.push(h(y, null, "dropdown-header" + x, e));
                                    }
                                    if (c.options.hideDisabled && v) return void g--;
                                    d.push(h(j(o, "opt " + m + x, n, p), b, "", e));
                                } else if (!0 === f.data("divider")) d.push(h("", b, "divider"));
                                else if (!0 === f.data("hidden")) (k = f.data("prevHiddenIndex")), f.next().data("prevHiddenIndex", void 0 !== k ? k : b), d.push(h(j(o, m, n, p), b, "hidden is-hidden"));
                                else {
                                    var A = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
                                    if (!A && c.options.hideDisabled && void 0 !== (k = f.data("prevHiddenIndex"))) {
                                        var B = l.eq(k)[0].previousElementSibling;
                                        B && "OPTGROUP" === B.tagName && !B.disabled && (A = !0);
                                    }
                                    A && (g++, d.push(h("", null, "divider", e + "div"))), d.push(h(j(o, m, n, p), b));
                                }
                                c.liObj[b] = g;
                            }
                        }),
                        this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"),
                        d.join("")
                    );
                },
                findLis: function () {
                    return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis;
                },
                render: function (b) {
                    var c,
                        d = this,
                        e = this.$element.find("option");
                    !1 !== b &&
                        e.each(function (a) {
                            var b = d.findLis().eq(d.liObj[a]);
                            d.setDisabled(a, this.disabled || ("OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled), b), d.setSelected(a, this.selected, b);
                        }),
                        this.togglePlaceholder(),
                        this.tabIndex();
                    var f = e
                            .map(function () {
                                if (this.selected) {
                                    if (d.options.hideDisabled && (this.disabled || ("OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled))) return;
                                    var b,
                                        c = a(this),
                                        e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
                                    return (
                                        (b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : ""),
                                        void 0 !== c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content").toString() : e + c.html() + b
                                    );
                                }
                            })
                            .toArray(),
                        g = this.multiple ? f.join(this.options.multipleSeparator) : f[0];
                    if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                        var h = this.options.selectedTextFormat.split(">");
                        if ((h.length > 1 && f.length > h[1]) || (1 == h.length && f.length >= 1)) {
                            c = this.options.hideDisabled ? ", [disabled]" : "";
                            var i = e.not('[data-divider="true"], [data-hidden="true"]' + c).length;
                            g = ("function" == typeof this.options.countSelectedText ? this.options.countSelectedText(f.length, i) : this.options.countSelectedText).replace("{0}", f.length.toString()).replace("{1}", i.toString());
                        }
                    }
                    void 0 == this.options.title && (this.options.title = this.$element.attr("title")),
                        "static" == this.options.selectedTextFormat && (g = this.options.title),
                        g || (g = void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText),
                        this.$button.attr("title", j(a.trim(g.replace(/<[^>]*>?/g, "")))),
                        this.$button.children(".filter-option").html(g),
                        this.$element.trigger("rendered.bs.select");
                },
                setStyle: function (a, b) {
                    this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                    var c = a || this.options.style;
                    "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c));
                },
                liHeight: function (b) {
                    if (b || (!1 !== this.options.size && !this.sizeInfo)) {
                        var c = document.createElement("div"),
                            d = document.createElement("div"),
                            e = document.createElement("ul"),
                            f = document.createElement("li"),
                            g = document.createElement("li"),
                            h = document.createElement("a"),
                            i = document.createElement("span"),
                            j = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                            k = this.options.liveSearch ? document.createElement("div") : null,
                            l = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                            m = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                        if (
                            ((i.className = "text"),
                            (c.className = this.$menu[0].parentNode.className + " open"),
                            (d.className = "dropdown-menu open"),
                            (e.className = "dropdown-menu inner"),
                            (f.className = "divider"),
                            i.appendChild(document.createTextNode("Inner text")),
                            h.appendChild(i),
                            g.appendChild(h),
                            e.appendChild(g),
                            e.appendChild(f),
                            j && d.appendChild(j),
                            k)
                        ) {
                            var n = document.createElement("input");
                            (k.className = "bs-searchbox"), (n.className = "form-control"), k.appendChild(n), d.appendChild(k);
                        }
                        l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
                        var o = h.offsetHeight,
                            p = j ? j.offsetHeight : 0,
                            q = k ? k.offsetHeight : 0,
                            r = l ? l.offsetHeight : 0,
                            s = m ? m.offsetHeight : 0,
                            t = a(f).outerHeight(!0),
                            u = "function" == typeof getComputedStyle && getComputedStyle(d),
                            v = u ? null : a(d),
                            w = {
                                vert:
                                    parseInt(u ? u.paddingTop : v.css("paddingTop")) +
                                    parseInt(u ? u.paddingBottom : v.css("paddingBottom")) +
                                    parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) +
                                    parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
                                horiz:
                                    parseInt(u ? u.paddingLeft : v.css("paddingLeft")) +
                                    parseInt(u ? u.paddingRight : v.css("paddingRight")) +
                                    parseInt(u ? u.borderLeftWidth : v.css("borderLeftWidth")) +
                                    parseInt(u ? u.borderRightWidth : v.css("borderRightWidth")),
                            },
                            x = {
                                vert: w.vert + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2,
                                horiz: w.horiz + parseInt(u ? u.marginLeft : v.css("marginLeft")) + parseInt(u ? u.marginRight : v.css("marginRight")) + 2,
                            };
                        document.body.removeChild(c), (this.sizeInfo = { liHeight: o, headerHeight: p, searchHeight: q, actionsHeight: r, doneButtonHeight: s, dividerHeight: t, menuPadding: w, menuExtras: x });
                    }
                },
                setSize: function () {
                    if ((this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), !1 !== this.options.size)) {
                        var b,
                            c,
                            d,
                            e,
                            f,
                            g,
                            h,
                            i,
                            j = this,
                            k = this.$menu,
                            l = this.$menuInner,
                            m = a(window),
                            n = this.$newElement[0].offsetHeight,
                            o = this.$newElement[0].offsetWidth,
                            p = this.sizeInfo.liHeight,
                            q = this.sizeInfo.headerHeight,
                            r = this.sizeInfo.searchHeight,
                            s = this.sizeInfo.actionsHeight,
                            t = this.sizeInfo.doneButtonHeight,
                            u = this.sizeInfo.dividerHeight,
                            v = this.sizeInfo.menuPadding,
                            w = this.sizeInfo.menuExtras,
                            x = this.options.hideDisabled ? ".disabled" : "",
                            y = function () {
                                var b,
                                    c = j.$newElement.offset(),
                                    d = a(j.options.container);
                                j.options.container && !d.is("body") ? ((b = d.offset()), (b.top += parseInt(d.css("borderTopWidth"))), (b.left += parseInt(d.css("borderLeftWidth")))) : (b = { top: 0, left: 0 });
                                var e = j.options.windowPadding;
                                (f = c.top - b.top - m.scrollTop()), (g = m.height() - f - n - b.top - e[2]), (h = c.left - b.left - m.scrollLeft()), (i = m.width() - h - o - b.left - e[1]), (f -= e[0]), (h -= e[3]);
                            };
                        if ((y(), "auto" === this.options.size)) {
                            var z = function () {
                                var m,
                                    n = function (b, c) {
                                        return function (d) {
                                            return c ? (d.classList ? d.classList.contains(b) : a(d).hasClass(b)) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b));
                                        };
                                    },
                                    u = j.$menuInner[0].getElementsByTagName("li"),
                                    x = Array.prototype.filter ? Array.prototype.filter.call(u, n("hidden", !1)) : j.$lis.not(".hidden"),
                                    z = Array.prototype.filter ? Array.prototype.filter.call(x, n("dropdown-header", !0)) : x.filter(".dropdown-header");
                                y(),
                                    (b = g - w.vert),
                                    (c = i - w.horiz),
                                    j.options.container
                                        ? (k.data("height") || k.data("height", k.height()), (d = k.data("height")), k.data("width") || k.data("width", k.width()), (e = k.data("width")))
                                        : ((d = k.height()), (e = k.width())),
                                    j.options.dropupAuto && j.$newElement.toggleClass("dropup", f > g && b - w.vert < d),
                                    j.$newElement.hasClass("dropup") && (b = f - w.vert),
                                    "auto" === j.options.dropdownAlignRight && k.toggleClass("dropdown-menu-right", h > i && c - w.horiz < e - o),
                                    (m = x.length + z.length > 3 ? 3 * p + w.vert - 2 : 0),
                                    k.css({ "max-height": b + "px", overflow: "hidden", "min-height": m + q + r + s + t + "px" }),
                                    l.css({ "max-height": b - q - r - s - t - v.vert + "px", "overflow-y": "auto", "min-height": Math.max(m - v.vert, 0) + "px" });
                            };
                            z(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", z), m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", z);
                        } else if (this.options.size && "auto" != this.options.size && this.$lis.not(x).length > this.options.size) {
                            var A = this.$lis.not(".divider").not(x).children().slice(0, this.options.size).last().parent().index(),
                                B = this.$lis.slice(0, A + 1).filter(".divider").length;
                            (b = p * this.options.size + B * u + v.vert),
                                j.options.container ? (k.data("height") || k.data("height", k.height()), (d = k.data("height"))) : (d = k.height()),
                                j.options.dropupAuto && this.$newElement.toggleClass("dropup", f > g && b - w.vert < d),
                                k.css({ "max-height": b + q + r + s + t + "px", overflow: "hidden", "min-height": "" }),
                                l.css({ "max-height": b - v.vert + "px", "overflow-y": "auto", "min-height": "" });
                        }
                    }
                },
                setWidth: function () {
                    if ("auto" === this.options.width) {
                        this.$menu.css("min-width", "0");
                        var a = this.$menu.parent().clone().appendTo("body"),
                            b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
                            c = a.children(".dropdown-menu").outerWidth(),
                            d = b.css("width", "auto").children("button").outerWidth();
                        a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px");
                    } else
                        "fit" === this.options.width
                            ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width"))
                            : this.options.width
                            ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width))
                            : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                    this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width");
                },
                selectPosition: function () {
                    this.$bsContainer = a('<div class="bs-container" />');
                    var b,
                        c,
                        d,
                        e = this,
                        f = a(this.options.container),
                        g = function (a) {
                            e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")),
                                (b = a.offset()),
                                f.is("body") ? (c = { top: 0, left: 0 }) : ((c = f.offset()), (c.top += parseInt(f.css("borderTopWidth")) - f.scrollTop()), (c.left += parseInt(f.css("borderLeftWidth")) - f.scrollLeft())),
                                (d = a.hasClass("dropup") ? 0 : a[0].offsetHeight),
                                e.$bsContainer.css({ top: b.top - c.top + d, left: b.left - c.left, width: a[0].offsetWidth });
                        };
                    this.$button.on("click", function () {
                        var b = a(this);
                        e.isDisabled() || (g(e.$newElement), e.$bsContainer.appendTo(e.options.container).toggleClass("open", !b.hasClass("open")).append(e.$menu));
                    }),
                        a(window).on("resize scroll", function () {
                            g(e.$newElement);
                        }),
                        this.$element.on("hide.bs.select", function () {
                            e.$menu.data("height", e.$menu.height()), e.$bsContainer.detach();
                        });
                },
                setSelected: function (a, b, c) {
                    c || (this.togglePlaceholder(), (c = this.findLis().eq(this.liObj[a]))), c.toggleClass("selected", b).find("a").attr("aria-selected", b);
                },
                setDisabled: function (a, b, c) {
                    c || (c = this.findLis().eq(this.liObj[a])),
                        b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1);
                },
                isDisabled: function () {
                    return this.$element[0].disabled;
                },
                checkDisabled: function () {
                    var a = this;
                    this.isDisabled()
                        ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0))
                        : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled").attr("aria-disabled", !1)),
                          -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")),
                        this.$button.click(function () {
                            return !a.isDisabled();
                        });
                },
                togglePlaceholder: function () {
                    var a = this.$element.val();
                    this.$button.toggleClass("bs-placeholder", null === a || "" === a || (a.constructor === Array && 0 === a.length));
                },
                tabIndex: function () {
                    this.$element.data("tabindex") !== this.$element.attr("tabindex") &&
                        -98 !== this.$element.attr("tabindex") &&
                        "-98" !== this.$element.attr("tabindex") &&
                        (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))),
                        this.$element.attr("tabindex", -98);
                },
                clickListener: function () {
                    var b = this,
                        c = a(document);
                    c.data("spaceSelect", !1),
                        this.$button.on("keyup", function (a) {
                            /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1));
                        }),
                        this.$button.on("click", function () {
                            b.setSize();
                        }),
                        this.$element.on("shown.bs.select", function () {
                            if (b.options.liveSearch || b.multiple) {
                                if (!b.multiple) {
                                    var a = b.liObj[b.$element[0].selectedIndex];
                                    if ("number" != typeof a || !1 === b.options.size) return;
                                    var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
                                    (c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2), (b.$menuInner[0].scrollTop = c);
                                }
                            } else b.$menuInner.find(".selected a").focus();
                        }),
                        this.$menuInner.on("click", "li a", function (c) {
                            var d = a(this),
                                f = d.parent().data("originalIndex"),
                                g = b.$element.val(),
                                h = b.$element.prop("selectedIndex"),
                                i = !0;
                            if ((b.multiple && 1 !== b.options.maxOptions && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled"))) {
                                var j = b.$element.find("option"),
                                    k = j.eq(f),
                                    l = k.prop("selected"),
                                    m = k.parent("optgroup"),
                                    n = b.options.maxOptions,
                                    o = m.data("maxOptions") || !1;
                                if (b.multiple) {
                                    if ((k.prop("selected", !l), b.setSelected(f, !l), d.blur(), !1 !== n || !1 !== o)) {
                                        var p = n < j.filter(":selected").length,
                                            q = o < m.find("option:selected").length;
                                        if ((n && p) || (o && q))
                                            if (n && 1 == n) j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(f, !0);
                                            else if (o && 1 == o) {
                                                m.find("option:selected").prop("selected", !1), k.prop("selected", !0);
                                                var r = d.parent().data("optgroup");
                                                b.$menuInner.find('[data-optgroup="' + r + '"]').removeClass("selected"), b.setSelected(f, !0);
                                            } else {
                                                var s = "string" == typeof b.options.maxOptionsText ? [b.options.maxOptionsText, b.options.maxOptionsText] : b.options.maxOptionsText,
                                                    t = "function" == typeof s ? s(n, o) : s,
                                                    u = t[0].replace("{n}", n),
                                                    v = t[1].replace("{n}", o),
                                                    w = a('<div class="notify"></div>');
                                                t[2] && ((u = u.replace("{var}", t[2][n > 1 ? 0 : 1])), (v = v.replace("{var}", t[2][o > 1 ? 0 : 1]))),
                                                    k.prop("selected", !1),
                                                    b.$menu.append(w),
                                                    n && p && (w.append(a("<div>" + u + "</div>")), (i = !1), b.$element.trigger("maxReached.bs.select")),
                                                    o && q && (w.append(a("<div>" + v + "</div>")), (i = !1), b.$element.trigger("maxReachedGrp.bs.select")),
                                                    setTimeout(function () {
                                                        b.setSelected(f, !1);
                                                    }, 10),
                                                    w.delay(750).fadeOut(300, function () {
                                                        a(this).remove();
                                                    });
                                            }
                                    }
                                } else j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), b.setSelected(f, !0);
                                !b.multiple || (b.multiple && 1 === b.options.maxOptions) ? b.$button.focus() : b.options.liveSearch && b.$searchbox.focus(),
                                    i && ((g != b.$element.val() && b.multiple) || (h != b.$element.prop("selectedIndex") && !b.multiple)) && ((e = [f, k.prop("selected"), l]), b.$element.triggerNative("change"));
                            }
                        }),
                        this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (c) {
                            c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus());
                        }),
                        this.$menuInner.on("click", ".divider, .dropdown-header", function (a) {
                            a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus();
                        }),
                        this.$menu.on("click", ".popover-title .close", function () {
                            b.$button.click();
                        }),
                        this.$searchbox.on("click", function (a) {
                            a.stopPropagation();
                        }),
                        this.$menu.on("click", ".actions-btn", function (c) {
                            b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll();
                        }),
                        this.$element.change(function () {
                            b.render(!1), b.$element.trigger("changed.bs.select", e), (e = null);
                        });
                },
                liveSearchListener: function () {
                    var c = this,
                        d = a('<li class="no-results"></li>');
                    this.$button.on("click.dropdown.data-api", function () {
                        c.$menuInner.find(".active").removeClass("active"),
                            c.$searchbox.val() && (c.$searchbox.val(""), c.$lis.not(".is-hidden").removeClass("hidden"), d.parent().length && d.remove()),
                            c.multiple || c.$menuInner.find(".selected").addClass("active"),
                            setTimeout(function () {
                                c.$searchbox.focus();
                            }, 10);
                    }),
                        this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (a) {
                            a.stopPropagation();
                        }),
                        this.$searchbox.on("input propertychange", function () {
                            if ((c.$lis.not(".is-hidden").removeClass("hidden"), c.$lis.filter(".active").removeClass("active"), d.remove(), c.$searchbox.val())) {
                                var e,
                                    f = c.$lis.not(".is-hidden, .divider, .dropdown-header");
                                if (((e = c.options.liveSearchNormalize ? f.not(":a" + c._searchStyle() + '("' + b(c.$searchbox.val()) + '")') : f.not(":" + c._searchStyle() + '("' + c.$searchbox.val() + '")')), e.length === f.length))
                                    d.html(c.options.noneResultsText.replace("{0}", '"' + i(c.$searchbox.val()) + '"')), c.$menuInner.append(d), c.$lis.addClass("hidden");
                                else {
                                    e.addClass("hidden");
                                    var g,
                                        h = c.$lis.not(".hidden");
                                    h.each(function (b) {
                                        var c = a(this);
                                        c.hasClass("divider")
                                            ? void 0 === g
                                                ? c.addClass("hidden")
                                                : (g && g.addClass("hidden"), (g = c))
                                            : c.hasClass("dropdown-header") && h.eq(b + 1).data("optgroup") !== c.data("optgroup")
                                            ? c.addClass("hidden")
                                            : (g = null);
                                    }),
                                        g && g.addClass("hidden"),
                                        f.not(".hidden").first().addClass("active"),
                                        c.$menuInner.scrollTop(0);
                                }
                            }
                        });
                },
                _searchStyle: function () {
                    return { begins: "ibegins", startsWith: "ibegins" }[this.options.liveSearchStyle] || "icontains";
                },
                val: function (a) {
                    return void 0 !== a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val();
                },
                changeAll: function (b) {
                    if (this.multiple) {
                        void 0 === b && (b = !0), this.findLis();
                        var c = this.$element.find("option"),
                            d = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),
                            e = d.length,
                            f = [];
                        if (b) {
                            if (d.filter(".selected").length === d.length) return;
                        } else if (0 === d.filter(".selected").length) return;
                        d.toggleClass("selected", b);
                        for (var g = 0; g < e; g++) {
                            var h = d[g].getAttribute("data-original-index");
                            f[f.length] = c.eq(h)[0];
                        }
                        a(f).prop("selected", b), this.render(!1), this.togglePlaceholder(), this.$element.triggerNative("change");
                    }
                },
                selectAll: function () {
                    return this.changeAll(!0);
                },
                deselectAll: function () {
                    return this.changeAll(!1);
                },
                toggle: function (a) {
                    (a = a || window.event), a && a.stopPropagation(), this.$button.trigger("click");
                },
                keydown: function (b) {
                    var c,
                        d,
                        e,
                        f,
                        g = a(this),
                        h = g.is("input") ? g.parent().parent() : g.parent(),
                        i = h.data("this"),
                        j = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                        k = {
                            32: " ",
                            48: "0",
                            49: "1",
                            50: "2",
                            51: "3",
                            52: "4",
                            53: "5",
                            54: "6",
                            55: "7",
                            56: "8",
                            57: "9",
                            59: ";",
                            65: "a",
                            66: "b",
                            67: "c",
                            68: "d",
                            69: "e",
                            70: "f",
                            71: "g",
                            72: "h",
                            73: "i",
                            74: "j",
                            75: "k",
                            76: "l",
                            77: "m",
                            78: "n",
                            79: "o",
                            80: "p",
                            81: "q",
                            82: "r",
                            83: "s",
                            84: "t",
                            85: "u",
                            86: "v",
                            87: "w",
                            88: "x",
                            89: "y",
                            90: "z",
                            96: "0",
                            97: "1",
                            98: "2",
                            99: "3",
                            100: "4",
                            101: "5",
                            102: "6",
                            103: "7",
                            104: "8",
                            105: "9",
                        };
                    if (!(f = i.$newElement.hasClass("open")) && ((b.keyCode >= 48 && b.keyCode <= 57) || (b.keyCode >= 96 && b.keyCode <= 105) || (b.keyCode >= 65 && b.keyCode <= 90)))
                        return i.options.container ? i.$button.trigger("click") : (i.setSize(), i.$menu.parent().addClass("open"), (f = !0)), void i.$searchbox.focus();
                    if ((i.options.liveSearch && /(^9$|27)/.test(b.keyCode.toString(10)) && f && (b.preventDefault(), b.stopPropagation(), i.$menuInner.click(), i.$button.focus()), /(38|40)/.test(b.keyCode.toString(10)))) {
                        if (((c = i.$lis.filter(j)), !c.length)) return;
                        (d = i.options.liveSearch ? c.index(c.filter(".active")) : c.index(c.find("a").filter(":focus").parent())),
                            (e = i.$menuInner.data("prevIndex")),
                            38 == b.keyCode ? ((!i.options.liveSearch && d != e) || -1 == d || d--, d < 0 && (d += c.length)) : 40 == b.keyCode && ((i.options.liveSearch || d == e) && d++, (d %= c.length)),
                            i.$menuInner.data("prevIndex", d),
                            i.options.liveSearch ? (b.preventDefault(), g.hasClass("dropdown-toggle") || (c.removeClass("active").eq(d).addClass("active").children("a").focus(), g.focus())) : c.eq(d).children("a").focus();
                    } else if (!g.is("input")) {
                        var l,
                            m,
                            n = [];
                        (c = i.$lis.filter(j)),
                            c.each(function (c) {
                                a.trim(a(this).children("a").text().toLowerCase()).substring(0, 1) == k[b.keyCode] && n.push(c);
                            }),
                            (l = a(document).data("keycount")),
                            l++,
                            a(document).data("keycount", l),
                            (m = a.trim(a(":focus").text().toLowerCase()).substring(0, 1)),
                            m != k[b.keyCode] ? ((l = 1), a(document).data("keycount", l)) : l >= n.length && (a(document).data("keycount", 0), l > n.length && (l = 1)),
                            c
                                .eq(n[l - 1])
                                .children("a")
                                .focus();
                    }
                    if ((/(13|32)/.test(b.keyCode.toString(10)) || (/(^9$)/.test(b.keyCode.toString(10)) && i.options.selectOnTab)) && f) {
                        if ((/(32)/.test(b.keyCode.toString(10)) || b.preventDefault(), i.options.liveSearch)) /(32)/.test(b.keyCode.toString(10)) || (i.$menuInner.find(".active a").click(), g.focus());
                        else {
                            var o = a(":focus");
                            o.click(), o.focus(), b.preventDefault(), a(document).data("spaceSelect", !0);
                        }
                        a(document).data("keycount", 0);
                    }
                    ((/(^9$|27)/.test(b.keyCode.toString(10)) && f && (i.multiple || i.options.liveSearch)) || (/(27)/.test(b.keyCode.toString(10)) && !f)) &&
                        (i.$menu.parent().removeClass("open"), i.options.container && i.$newElement.removeClass("open"), i.$button.focus());
                },
                mobile: function () {
                    this.$element.addClass("mobile-device");
                },
                refresh: function () {
                    (this.$lis = null),
                        (this.liObj = {}),
                        this.reloadLi(),
                        this.render(),
                        this.checkDisabled(),
                        this.liHeight(!0),
                        this.setStyle(),
                        this.setWidth(),
                        this.$lis && this.$searchbox.trigger("propertychange"),
                        this.$element.trigger("refreshed.bs.select");
                },
                hide: function () {
                    this.$newElement.hide();
                },
                show: function () {
                    this.$newElement.show();
                },
                remove: function () {
                    this.$newElement.remove(), this.$element.remove();
                },
                destroy: function () {
                    this.$newElement.before(this.$element).remove(),
                        this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(),
                        this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
                },
            });
        var l = a.fn.selectpicker;
        (a.fn.selectpicker = c),
            (a.fn.selectpicker.Constructor = k),
            (a.fn.selectpicker.noConflict = function () {
                return (a.fn.selectpicker = l), this;
            }),
            a(document)
                .data("keycount", 0)
                .on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', k.prototype.keydown)
                .on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (a) {
                    a.stopPropagation();
                }),
            a(window).on("load.bs.select.data-api", function () {
                a(".selectpicker").each(function () {
                    var b = a(this);
                    c.call(b, b.data());
                });
            });
    })(jQuery),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery);
    })(function (a, b) {
        function c() {
            return new Date(Date.UTC.apply(Date, arguments));
        }
        function d() {
            var a = new Date();
            return c(a.getFullYear(), a.getMonth(), a.getDate());
        }
        function e(a, b) {
            return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
        }
        function f(c, d) {
            return function () {
                return d !== b && a.fn.datepicker.deprecated(d), this[c].apply(this, arguments);
            };
        }
        function g(a) {
            return a && !isNaN(a.getTime());
        }
        function h(b, c) {
            function d(a, b) {
                return b.toLowerCase();
            }
            var e,
                f = a(b).data(),
                g = {},
                h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
            c = new RegExp("^" + c.toLowerCase());
            for (var i in f) c.test(i) && ((e = i.replace(h, d)), (g[e] = f[i]));
            return g;
        }
        function i(b) {
            var c = {};
            if (q[b] || ((b = b.split("-")[0]), q[b])) {
                var d = q[b];
                return (
                    a.each(p, function (a, b) {
                        b in d && (c[b] = d[b]);
                    }),
                    c
                );
            }
        }
        var j = (function () {
                var b = {
                    get: function (a) {
                        return this.slice(a)[0];
                    },
                    contains: function (a) {
                        for (var b = a && a.valueOf(), c = 0, d = this.length; c < d; c++) if (0 <= this[c].valueOf() - b && this[c].valueOf() - b < 864e5) return c;
                        return -1;
                    },
                    remove: function (a) {
                        this.splice(a, 1);
                    },
                    replace: function (b) {
                        b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b));
                    },
                    clear: function () {
                        this.length = 0;
                    },
                    copy: function () {
                        var a = new j();
                        return a.replace(this), a;
                    },
                };
                return function () {
                    var c = [];
                    return c.push.apply(c, arguments), a.extend(c, b), c;
                };
            })(),
            k = function (b, c) {
                a.data(b, "datepicker", this),
                    this._process_options(c),
                    (this.dates = new j()),
                    (this.viewDate = this.o.defaultViewDate),
                    (this.focusDate = null),
                    (this.element = a(b)),
                    (this.isInput = this.element.is("input")),
                    (this.inputField = this.isInput ? this.element : this.element.find("input")),
                    (this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn")),
                    this.component && 0 === this.component.length && (this.component = !1),
                    (this.isInline = !this.component && this.element.is("div")),
                    (this.picker = a(r.template)),
                    this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow),
                    this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow),
                    this._buildEvents(),
                    this._attachEvents(),
                    this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"),
                    this.o.rtl && this.picker.addClass("datepicker-rtl"),
                    this.o.calendarWeeks &&
                        this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (a, b) {
                            return Number(b) + 1;
                        }),
                    this._process_options({ startDate: this._o.startDate, endDate: this._o.endDate, daysOfWeekDisabled: this.o.daysOfWeekDisabled, daysOfWeekHighlighted: this.o.daysOfWeekHighlighted, datesDisabled: this.o.datesDisabled }),
                    (this._allow_update = !1),
                    this.setViewMode(this.o.startView),
                    (this._allow_update = !0),
                    this.fillDow(),
                    this.fillMonths(),
                    this.update(),
                    this.isInline && this.show();
            };
        k.prototype = {
            constructor: k,
            _resolveViewName: function (b) {
                return (
                    a.each(r.viewModes, function (c, d) {
                        if (b === c || -1 !== a.inArray(b, d.names)) return (b = c), !1;
                    }),
                    b
                );
            },
            _resolveDaysOfWeek: function (b) {
                return a.isArray(b) || (b = b.split(/[,\s]*/)), a.map(b, Number);
            },
            _check_template: function (c) {
                try {
                    if (c === b || "" === c) return !1;
                    if ((c.match(/[<>]/g) || []).length <= 0) return !0;
                    return a(c).length > 0;
                } catch (a) {
                    return !1;
                }
            },
            _process_options: function (b) {
                this._o = a.extend({}, this._o, b);
                var e = (this.o = a.extend({}, this._o)),
                    f = e.language;
                q[f] || ((f = f.split("-")[0]), q[f] || (f = o.language)),
                    (e.language = f),
                    (e.startView = this._resolveViewName(e.startView)),
                    (e.minViewMode = this._resolveViewName(e.minViewMode)),
                    (e.maxViewMode = this._resolveViewName(e.maxViewMode)),
                    (e.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, e.startView))),
                    !0 !== e.multidate && ((e.multidate = Number(e.multidate) || !1), !1 !== e.multidate && (e.multidate = Math.max(0, e.multidate))),
                    (e.multidateSeparator = String(e.multidateSeparator)),
                    (e.weekStart %= 7),
                    (e.weekEnd = (e.weekStart + 6) % 7);
                var g = r.parseFormat(e.format);
                e.startDate !== -1 / 0 &&
                    (e.startDate ? (e.startDate instanceof Date ? (e.startDate = this._local_to_utc(this._zero_time(e.startDate))) : (e.startDate = r.parseDate(e.startDate, g, e.language, e.assumeNearbyYear))) : (e.startDate = -1 / 0)),
                    e.endDate !== 1 / 0 &&
                        (e.endDate ? (e.endDate instanceof Date ? (e.endDate = this._local_to_utc(this._zero_time(e.endDate))) : (e.endDate = r.parseDate(e.endDate, g, e.language, e.assumeNearbyYear))) : (e.endDate = 1 / 0)),
                    (e.daysOfWeekDisabled = this._resolveDaysOfWeek(e.daysOfWeekDisabled || [])),
                    (e.daysOfWeekHighlighted = this._resolveDaysOfWeek(e.daysOfWeekHighlighted || [])),
                    (e.datesDisabled = e.datesDisabled || []),
                    a.isArray(e.datesDisabled) || (e.datesDisabled = e.datesDisabled.split(",")),
                    (e.datesDisabled = a.map(e.datesDisabled, function (a) {
                        return r.parseDate(a, g, e.language, e.assumeNearbyYear);
                    }));
                var h = String(e.orientation).toLowerCase().split(/\s+/g),
                    i = e.orientation.toLowerCase();
                if (
                    ((h = a.grep(h, function (a) {
                        return /^auto|left|right|top|bottom$/.test(a);
                    })),
                    (e.orientation = { x: "auto", y: "auto" }),
                    i && "auto" !== i)
                )
                    if (1 === h.length)
                        switch (h[0]) {
                            case "top":
                            case "bottom":
                                e.orientation.y = h[0];
                                break;
                            case "left":
                            case "right":
                                e.orientation.x = h[0];
                        }
                    else
                        (i = a.grep(h, function (a) {
                            return /^left|right$/.test(a);
                        })),
                            (e.orientation.x = i[0] || "auto"),
                            (i = a.grep(h, function (a) {
                                return /^top|bottom$/.test(a);
                            })),
                            (e.orientation.y = i[0] || "auto");
                else;
                if (e.defaultViewDate instanceof Date || "string" == typeof e.defaultViewDate) e.defaultViewDate = r.parseDate(e.defaultViewDate, g, e.language, e.assumeNearbyYear);
                else if (e.defaultViewDate) {
                    var j = e.defaultViewDate.year || new Date().getFullYear(),
                        k = e.defaultViewDate.month || 0,
                        l = e.defaultViewDate.day || 1;
                    e.defaultViewDate = c(j, k, l);
                } else e.defaultViewDate = d();
            },
            _events: [],
            _secondaryEvents: [],
            _applyEvents: function (a) {
                for (var c, d, e, f = 0; f < a.length; f++) (c = a[f][0]), 2 === a[f].length ? ((d = b), (e = a[f][1])) : 3 === a[f].length && ((d = a[f][1]), (e = a[f][2])), c.on(e, d);
            },
            _unapplyEvents: function (a) {
                for (var c, d, e, f = 0; f < a.length; f++) (c = a[f][0]), 2 === a[f].length ? ((e = b), (d = a[f][1])) : 3 === a[f].length && ((e = a[f][1]), (d = a[f][2])), c.off(d, e);
            },
            _buildEvents: function () {
                var b = {
                    keyup: a.proxy(function (b) {
                        -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update();
                    }, this),
                    keydown: a.proxy(this.keydown, this),
                    paste: a.proxy(this.paste, this),
                };
                !0 === this.o.showOnFocus && (b.focus = a.proxy(this.show, this)),
                    this.isInput
                        ? (this._events = [[this.element, b]])
                        : this.component && this.inputField.length
                        ? (this._events = [
                              [this.inputField, b],
                              [this.component, { click: a.proxy(this.show, this) }],
                          ])
                        : (this._events = [[this.element, { click: a.proxy(this.show, this), keydown: a.proxy(this.keydown, this) }]]),
                    this._events.push(
                        [
                            this.element,
                            "*",
                            {
                                blur: a.proxy(function (a) {
                                    this._focused_from = a.target;
                                }, this),
                            },
                        ],
                        [
                            this.element,
                            {
                                blur: a.proxy(function (a) {
                                    this._focused_from = a.target;
                                }, this),
                            },
                        ]
                    ),
                    this.o.immediateUpdates &&
                        this._events.push([
                            this.element,
                            {
                                "changeYear changeMonth": a.proxy(function (a) {
                                    this.update(a.date);
                                }, this),
                            },
                        ]),
                    (this._secondaryEvents = [
                        [this.picker, { click: a.proxy(this.click, this) }],
                        [this.picker, ".prev, .next", { click: a.proxy(this.navArrowsClick, this) }],
                        [this.picker, ".day:not(.disabled)", { click: a.proxy(this.dayCellClick, this) }],
                        [a(window), { resize: a.proxy(this.place, this) }],
                        [
                            a(document),
                            {
                                "mousedown touchstart": a.proxy(function (a) {
                                    this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.isInline || this.hide();
                                }, this),
                            },
                        ],
                    ]);
            },
            _attachEvents: function () {
                this._detachEvents(), this._applyEvents(this._events);
            },
            _detachEvents: function () {
                this._unapplyEvents(this._events);
            },
            _attachSecondaryEvents: function () {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
            },
            _detachSecondaryEvents: function () {
                this._unapplyEvents(this._secondaryEvents);
            },
            _trigger: function (b, c) {
                var d = c || this.dates.get(-1),
                    e = this._utc_to_local(d);
                this.element.trigger({
                    type: b,
                    date: e,
                    viewMode: this.viewMode,
                    dates: a.map(this.dates, this._utc_to_local),
                    format: a.proxy(function (a, b) {
                        0 === arguments.length ? ((a = this.dates.length - 1), (b = this.o.format)) : "string" == typeof a && ((b = a), (a = this.dates.length - 1)), (b = b || this.o.format);
                        var c = this.dates.get(a);
                        return r.formatDate(c, b, this.o.language);
                    }, this),
                });
            },
            show: function () {
                if (!(this.inputField.prop("disabled") || (this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)))
                    return (
                        this.isInline || this.picker.appendTo(this.o.container),
                        this.place(),
                        this.picker.show(),
                        this._attachSecondaryEvents(),
                        this._trigger("show"),
                        (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(),
                        this
                    );
            },
            hide: function () {
                return this.isInline || !this.picker.is(":visible")
                    ? this
                    : ((this.focusDate = null), this.picker.hide().detach(), this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this);
            },
            destroy: function () {
                return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this;
            },
            paste: function (b) {
                var c;
                if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain");
                else {
                    if (!window.clipboardData) return;
                    c = window.clipboardData.getData("Text");
                }
                this.setDate(c), this.update(), b.preventDefault();
            },
            _utc_to_local: function (a) {
                if (!a) return a;
                var b = new Date(a.getTime() + 6e4 * a.getTimezoneOffset());
                return b.getTimezoneOffset() !== a.getTimezoneOffset() && (b = new Date(a.getTime() + 6e4 * b.getTimezoneOffset())), b;
            },
            _local_to_utc: function (a) {
                return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset());
            },
            _zero_time: function (a) {
                return a && new Date(a.getFullYear(), a.getMonth(), a.getDate());
            },
            _zero_utc_time: function (a) {
                return a && c(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
            },
            getDates: function () {
                return a.map(this.dates, this._utc_to_local);
            },
            getUTCDates: function () {
                return a.map(this.dates, function (a) {
                    return new Date(a);
                });
            },
            getDate: function () {
                return this._utc_to_local(this.getUTCDate());
            },
            getUTCDate: function () {
                var a = this.dates.get(-1);
                return a !== b ? new Date(a) : null;
            },
            clearDates: function () {
                this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
            },
            setDates: function () {
                var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this;
            },
            setUTCDates: function () {
                var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.setDates.apply(this, a.map(b, this._utc_to_local)), this;
            },
            setDate: f("setDates"),
            setUTCDate: f("setUTCDates"),
            remove: f("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
            setValue: function () {
                var a = this.getFormattedDate();
                return this.inputField.val(a), this;
            },
            getFormattedDate: function (c) {
                c === b && (c = this.o.format);
                var d = this.o.language;
                return a
                    .map(this.dates, function (a) {
                        return r.formatDate(a, c, d);
                    })
                    .join(this.o.multidateSeparator);
            },
            getStartDate: function () {
                return this.o.startDate;
            },
            setStartDate: function (a) {
                return this._process_options({ startDate: a }), this.update(), this.updateNavArrows(), this;
            },
            getEndDate: function () {
                return this.o.endDate;
            },
            setEndDate: function (a) {
                return this._process_options({ endDate: a }), this.update(), this.updateNavArrows(), this;
            },
            setDaysOfWeekDisabled: function (a) {
                return this._process_options({ daysOfWeekDisabled: a }), this.update(), this;
            },
            setDaysOfWeekHighlighted: function (a) {
                return this._process_options({ daysOfWeekHighlighted: a }), this.update(), this;
            },
            setDatesDisabled: function (a) {
                return this._process_options({ datesDisabled: a }), this.update(), this;
            },
            place: function () {
                if (this.isInline) return this;
                var b = this.picker.outerWidth(),
                    c = this.picker.outerHeight(),
                    d = 10,
                    e = a(this.o.container),
                    f = e.width(),
                    g = "body" === this.o.container ? a(document).scrollTop() : e.scrollTop(),
                    h = e.offset(),
                    i = [0];
                this.element.parents().each(function () {
                    var b = a(this).css("z-index");
                    "auto" !== b && 0 !== Number(b) && i.push(Number(b));
                });
                var j = Math.max.apply(Math, i) + this.o.zIndexOffset,
                    k = this.component ? this.component.parent().offset() : this.element.offset(),
                    l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    m = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                    n = k.left - h.left,
                    o = k.top - h.top;
                "body" !== this.o.container && (o += g),
                    this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),
                    "auto" !== this.o.orientation.x
                        ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (n -= b - m))
                        : k.left < 0
                        ? (this.picker.addClass("datepicker-orient-left"), (n -= k.left - d))
                        : n + b > f
                        ? (this.picker.addClass("datepicker-orient-right"), (n += m - b))
                        : this.o.rtl
                        ? this.picker.addClass("datepicker-orient-right")
                        : this.picker.addClass("datepicker-orient-left");
                var p,
                    q = this.o.orientation.y;
                if (("auto" === q && ((p = -g + o - c), (q = p < 0 ? "bottom" : "top")), this.picker.addClass("datepicker-orient-" + q), "top" === q ? (o -= c + parseInt(this.picker.css("padding-top"))) : (o += l), this.o.rtl)) {
                    var r = f - (n + m);
                    this.picker.css({ top: o, right: r, zIndex: j });
                } else this.picker.css({ top: o, left: n, zIndex: j });
                return this;
            },
            _allow_update: !0,
            update: function () {
                if (!this._allow_update) return this;
                var b = this.dates.copy(),
                    c = [],
                    d = !1;
                return (
                    arguments.length
                        ? (a.each(
                              arguments,
                              a.proxy(function (a, b) {
                                  b instanceof Date && (b = this._local_to_utc(b)), c.push(b);
                              }, this)
                          ),
                          (d = !0))
                        : ((c = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val()), (c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c]), delete this.element.data().date),
                    (c = a.map(
                        c,
                        a.proxy(function (a) {
                            return r.parseDate(a, this.o.format, this.o.language, this.o.assumeNearbyYear);
                        }, this)
                    )),
                    (c = a.grep(
                        c,
                        a.proxy(function (a) {
                            return !this.dateWithinRange(a) || !a;
                        }, this),
                        !0
                    )),
                    this.dates.replace(c),
                    this.o.updateViewDate &&
                        (this.dates.length
                            ? (this.viewDate = new Date(this.dates.get(-1)))
                            : this.viewDate < this.o.startDate
                            ? (this.viewDate = new Date(this.o.startDate))
                            : this.viewDate > this.o.endDate
                            ? (this.viewDate = new Date(this.o.endDate))
                            : (this.viewDate = this.o.defaultViewDate)),
                    d ? (this.setValue(), this.element.change()) : this.dates.length && String(b) !== String(this.dates) && d && (this._trigger("changeDate"), this.element.change()),
                    !this.dates.length && b.length && (this._trigger("clearDate"), this.element.change()),
                    this.fill(),
                    this
                );
            },
            fillDow: function () {
                if (this.o.showWeekDays) {
                    var b = this.o.weekStart,
                        c = "<tr>";
                    for (this.o.calendarWeeks && (c += '<th class="cw">&#160;</th>'); b < this.o.weekStart + 7; )
                        (c += '<th class="dow'), -1 !== a.inArray(b, this.o.daysOfWeekDisabled) && (c += " disabled"), (c += '">' + q[this.o.language].daysMin[b++ % 7] + "</th>");
                    (c += "</tr>"), this.picker.find(".datepicker-days thead").append(c);
                }
            },
            fillMonths: function () {
                for (var a, b = this._utc_to_local(this.viewDate), c = "", d = 0; d < 12; d++) (a = b && b.getMonth() === d ? " focused" : ""), (c += '<span class="month' + a + '">' + q[this.o.language].monthsShort[d] + "</span>");
                this.picker.find(".datepicker-months td").html(c);
            },
            setRange: function (b) {
                b && b.length
                    ? (this.range = a.map(b, function (a) {
                          return a.valueOf();
                      }))
                    : delete this.range,
                    this.fill();
            },
            getClassNames: function (b) {
                var c = [],
                    f = this.viewDate.getUTCFullYear(),
                    g = this.viewDate.getUTCMonth(),
                    h = d();
                return (
                    b.getUTCFullYear() < f || (b.getUTCFullYear() === f && b.getUTCMonth() < g) ? c.push("old") : (b.getUTCFullYear() > f || (b.getUTCFullYear() === f && b.getUTCMonth() > g)) && c.push("new"),
                    this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"),
                    this.o.todayHighlight && e(b, h) && c.push("today"),
                    -1 !== this.dates.contains(b) && c.push("active"),
                    this.dateWithinRange(b) || c.push("disabled"),
                    this.dateIsDisabled(b) && c.push("disabled", "disabled-date"),
                    -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"),
                    this.range &&
                        (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"),
                        -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"),
                        b.valueOf() === this.range[0] && c.push("range-start"),
                        b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")),
                    c
                );
            },
            _fill_yearsView: function (c, d, e, f, g, h, i) {
                for (
                    var j,
                        k,
                        l,
                        m = "",
                        n = e / 10,
                        o = this.picker.find(c),
                        p = Math.floor(f / e) * e,
                        q = p + 9 * n,
                        r = Math.floor(this.viewDate.getFullYear() / n) * n,
                        s = a.map(this.dates, function (a) {
                            return Math.floor(a.getUTCFullYear() / n) * n;
                        }),
                        t = p - n;
                    t <= q + n;
                    t += n
                )
                    (j = [d]),
                        (k = null),
                        t === p - n ? j.push("old") : t === q + n && j.push("new"),
                        -1 !== a.inArray(t, s) && j.push("active"),
                        (t < g || t > h) && j.push("disabled"),
                        t === r && j.push("focused"),
                        i !== a.noop &&
                            ((l = i(new Date(t, 0, 1))),
                            l === b ? (l = {}) : "boolean" == typeof l ? (l = { enabled: l }) : "string" == typeof l && (l = { classes: l }),
                            !1 === l.enabled && j.push("disabled"),
                            l.classes && (j = j.concat(l.classes.split(/\s+/))),
                            l.tooltip && (k = l.tooltip)),
                        (m += '<span class="' + j.join(" ") + '"' + (k ? ' title="' + k + '"' : "") + ">" + t + "</span>");
                o.find(".datepicker-switch").text(p + "-" + q), o.find("td").html(m);
            },
            fill: function () {
                var d,
                    e,
                    f = new Date(this.viewDate),
                    g = f.getUTCFullYear(),
                    h = f.getUTCMonth(),
                    i = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                    j = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                    k = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                    m = q[this.o.language].today || q.en.today || "",
                    n = q[this.o.language].clear || q.en.clear || "",
                    o = q[this.o.language].titleFormat || q.en.titleFormat;
                if (!isNaN(g) && !isNaN(h)) {
                    this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f, o, this.o.language)),
                        this.picker
                            .find("tfoot .today")
                            .text(m)
                            .css("display", !0 === this.o.todayBtn || "linked" === this.o.todayBtn ? "table-cell" : "none"),
                        this.picker
                            .find("tfoot .clear")
                            .text(n)
                            .css("display", !0 === this.o.clearBtn ? "table-cell" : "none"),
                        this.picker
                            .find("thead .datepicker-title")
                            .text(this.o.title)
                            .css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"),
                        this.updateNavArrows(),
                        this.fillMonths();
                    var p = c(g, h, 0),
                        s = p.getUTCDate();
                    p.setUTCDate(s - ((p.getUTCDay() - this.o.weekStart + 7) % 7));
                    var t = new Date(p);
                    p.getUTCFullYear() < 100 && t.setUTCFullYear(p.getUTCFullYear()), t.setUTCDate(t.getUTCDate() + 42), (t = t.valueOf());
                    for (var u, v, w = []; p.valueOf() < t; ) {
                        if ((u = p.getUTCDay()) === this.o.weekStart && (w.push("<tr>"), this.o.calendarWeeks)) {
                            var x = new Date(+p + ((this.o.weekStart - u - 7) % 7) * 864e5),
                                y = new Date(Number(x) + ((11 - x.getUTCDay()) % 7) * 864e5),
                                z = new Date(Number((z = c(y.getUTCFullYear(), 0, 1))) + ((11 - z.getUTCDay()) % 7) * 864e5),
                                A = (y - z) / 864e5 / 7 + 1;
                            w.push('<td class="cw">' + A + "</td>");
                        }
                        (v = this.getClassNames(p)), v.push("day");
                        var B = p.getUTCDate();
                        this.o.beforeShowDay !== a.noop &&
                            ((e = this.o.beforeShowDay(this._utc_to_local(p))),
                            e === b ? (e = {}) : "boolean" == typeof e ? (e = { enabled: e }) : "string" == typeof e && (e = { classes: e }),
                            !1 === e.enabled && v.push("disabled"),
                            e.classes && (v = v.concat(e.classes.split(/\s+/))),
                            e.tooltip && (d = e.tooltip),
                            e.content && (B = e.content)),
                            (v = a.isFunction(a.uniqueSort) ? a.uniqueSort(v) : a.unique(v)),
                            w.push('<td class="' + v.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ' data-date="' + p.getTime().toString() + '">' + B + "</td>"),
                            (d = null),
                            u === this.o.weekEnd && w.push("</tr>"),
                            p.setUTCDate(p.getUTCDate() + 1);
                    }
                    this.picker.find(".datepicker-days tbody").html(w.join(""));
                    var C = q[this.o.language].monthsTitle || q.en.monthsTitle || "Months",
                        D = this.picker
                            .find(".datepicker-months")
                            .find(".datepicker-switch")
                            .text(this.o.maxViewMode < 2 ? C : g)
                            .end()
                            .find("tbody span")
                            .removeClass("active");
                    if (
                        (a.each(this.dates, function (a, b) {
                            b.getUTCFullYear() === g && D.eq(b.getUTCMonth()).addClass("active");
                        }),
                        (g < i || g > k) && D.addClass("disabled"),
                        g === i && D.slice(0, j).addClass("disabled"),
                        g === k && D.slice(l + 1).addClass("disabled"),
                        this.o.beforeShowMonth !== a.noop)
                    ) {
                        var E = this;
                        a.each(D, function (c, d) {
                            var e = new Date(g, c, 1),
                                f = E.o.beforeShowMonth(e);
                            f === b ? (f = {}) : "boolean" == typeof f ? (f = { enabled: f }) : "string" == typeof f && (f = { classes: f }),
                                !1 !== f.enabled || a(d).hasClass("disabled") || a(d).addClass("disabled"),
                                f.classes && a(d).addClass(f.classes),
                                f.tooltip && a(d).prop("title", f.tooltip);
                        });
                    }
                    this._fill_yearsView(".datepicker-years", "year", 10, g, i, k, this.o.beforeShowYear),
                        this._fill_yearsView(".datepicker-decades", "decade", 100, g, i, k, this.o.beforeShowDecade),
                        this._fill_yearsView(".datepicker-centuries", "century", 1e3, g, i, k, this.o.beforeShowCentury);
                }
            },
            updateNavArrows: function () {
                if (this._allow_update) {
                    var a,
                        b,
                        c = new Date(this.viewDate),
                        d = c.getUTCFullYear(),
                        e = c.getUTCMonth(),
                        f = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                        g = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                        h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                        i = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                        j = 1;
                    switch (this.viewMode) {
                        case 0:
                            (a = d <= f && e <= g), (b = d >= h && e >= i);
                            break;
                        case 4:
                            j *= 10;
                        case 3:
                            j *= 10;
                        case 2:
                            j *= 10;
                        case 1:
                            (a = Math.floor(d / j) * j <= f), (b = Math.floor(d / j) * j + j >= h);
                    }
                    this.picker.find(".prev").toggleClass("disabled", a), this.picker.find(".next").toggleClass("disabled", b);
                }
            },
            click: function (b) {
                b.preventDefault(), b.stopPropagation();
                var e, f, g, h;
                (e = a(b.target)),
                    e.hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1),
                    e.hasClass("today") && !e.hasClass("day") && (this.setViewMode(0), this._setDate(d(), "linked" === this.o.todayBtn ? null : "view")),
                    e.hasClass("clear") && this.clearDates(),
                    e.hasClass("disabled") ||
                        ((e.hasClass("month") || e.hasClass("year") || e.hasClass("decade") || e.hasClass("century")) &&
                            (this.viewDate.setUTCDate(1),
                            (f = 1),
                            1 === this.viewMode ? ((h = e.parent().find("span").index(e)), (g = this.viewDate.getUTCFullYear()), this.viewDate.setUTCMonth(h)) : ((h = 0), (g = Number(e.text())), this.viewDate.setUTCFullYear(g)),
                            this._trigger(r.viewModes[this.viewMode - 1].e, this.viewDate),
                            this.viewMode === this.o.minViewMode ? this._setDate(c(g, h, f)) : (this.setViewMode(this.viewMode - 1), this.fill()))),
                    this.picker.is(":visible") && this._focused_from && this._focused_from.focus(),
                    delete this._focused_from;
            },
            dayCellClick: function (b) {
                var c = a(b.currentTarget),
                    d = c.data("date"),
                    e = new Date(d);
                this.o.updateViewDate && (e.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), e.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)),
                    this._setDate(e);
            },
            navArrowsClick: function (b) {
                var c = a(b.currentTarget),
                    d = c.hasClass("prev") ? -1 : 1;
                0 !== this.viewMode && (d *= 12 * r.viewModes[this.viewMode].navStep), (this.viewDate = this.moveMonth(this.viewDate, d)), this._trigger(r.viewModes[this.viewMode].e, this.viewDate), this.fill();
            },
            _toggle_multidate: function (a) {
                var b = this.dates.contains(a);
                if (
                    (a || this.dates.clear(),
                    -1 !== b ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : !1 === this.o.multidate ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a),
                    "number" == typeof this.o.multidate)
                )
                    for (; this.dates.length > this.o.multidate; ) this.dates.remove(0);
            },
            _setDate: function (a, b) {
                (b && "date" !== b) || this._toggle_multidate(a && new Date(a)),
                    ((!b && this.o.updateViewDate) || "view" === b) && (this.viewDate = a && new Date(a)),
                    this.fill(),
                    this.setValue(),
                    (b && "view" === b) || this._trigger("changeDate"),
                    this.inputField.trigger("change"),
                    !this.o.autoclose || (b && "date" !== b) || this.hide();
            },
            moveDay: function (a, b) {
                var c = new Date(a);
                return c.setUTCDate(a.getUTCDate() + b), c;
            },
            moveWeek: function (a, b) {
                return this.moveDay(a, 7 * b);
            },
            moveMonth: function (a, b) {
                if (!g(a)) return this.o.defaultViewDate;
                if (!b) return a;
                var c,
                    d,
                    e = new Date(a.valueOf()),
                    f = e.getUTCDate(),
                    h = e.getUTCMonth(),
                    i = Math.abs(b);
                if (((b = b > 0 ? 1 : -1), 1 === i))
                    (d =
                        -1 === b
                            ? function () {
                                  return e.getUTCMonth() === h;
                              }
                            : function () {
                                  return e.getUTCMonth() !== c;
                              }),
                        (c = h + b),
                        e.setUTCMonth(c),
                        (c = (c + 12) % 12);
                else {
                    for (var j = 0; j < i; j++) e = this.moveMonth(e, b);
                    (c = e.getUTCMonth()),
                        e.setUTCDate(f),
                        (d = function () {
                            return c !== e.getUTCMonth();
                        });
                }
                for (; d(); ) e.setUTCDate(--f), e.setUTCMonth(c);
                return e;
            },
            moveYear: function (a, b) {
                return this.moveMonth(a, 12 * b);
            },
            moveAvailableDate: function (a, b, c) {
                do {
                    if (((a = this[c](a, b)), !this.dateWithinRange(a))) return !1;
                    c = "moveDay";
                } while (this.dateIsDisabled(a));
                return a;
            },
            weekOfDateIsDisabled: function (b) {
                return -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled);
            },
            dateIsDisabled: function (b) {
                return (
                    this.weekOfDateIsDisabled(b) ||
                    a.grep(this.o.datesDisabled, function (a) {
                        return e(b, a);
                    }).length > 0
                );
            },
            dateWithinRange: function (a) {
                return a >= this.o.startDate && a <= this.o.endDate;
            },
            keydown: function (a) {
                if (!this.picker.is(":visible")) return void ((40 !== a.keyCode && 27 !== a.keyCode) || (this.show(), a.stopPropagation()));
                var b,
                    c,
                    d = !1,
                    e = this.focusDate || this.viewDate;
                switch (a.keyCode) {
                    case 27:
                        this.focusDate ? ((this.focusDate = null), (this.viewDate = this.dates.get(-1) || this.viewDate), this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation();
                        break;
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                        (b = 37 === a.keyCode || 38 === a.keyCode ? -1 : 1),
                            0 === this.viewMode
                                ? a.ctrlKey
                                    ? (c = this.moveAvailableDate(e, b, "moveYear")) && this._trigger("changeYear", this.viewDate)
                                    : a.shiftKey
                                    ? (c = this.moveAvailableDate(e, b, "moveMonth")) && this._trigger("changeMonth", this.viewDate)
                                    : 37 === a.keyCode || 39 === a.keyCode
                                    ? (c = this.moveAvailableDate(e, b, "moveDay"))
                                    : this.weekOfDateIsDisabled(e) || (c = this.moveAvailableDate(e, b, "moveWeek"))
                                : 1 === this.viewMode
                                ? ((38 !== a.keyCode && 40 !== a.keyCode) || (b *= 4), (c = this.moveAvailableDate(e, b, "moveMonth")))
                                : 2 === this.viewMode && ((38 !== a.keyCode && 40 !== a.keyCode) || (b *= 4), (c = this.moveAvailableDate(e, b, "moveYear"))),
                            c && ((this.focusDate = this.viewDate = c), this.setValue(), this.fill(), a.preventDefault());
                        break;
                    case 13:
                        if (!this.o.forceParse) break;
                        (e = this.focusDate || this.dates.get(-1) || this.viewDate),
                            this.o.keyboardNavigation && (this._toggle_multidate(e), (d = !0)),
                            (this.focusDate = null),
                            (this.viewDate = this.dates.get(-1) || this.viewDate),
                            this.setValue(),
                            this.fill(),
                            this.picker.is(":visible") && (a.preventDefault(), a.stopPropagation(), this.o.autoclose && this.hide());
                        break;
                    case 9:
                        (this.focusDate = null), (this.viewDate = this.dates.get(-1) || this.viewDate), this.fill(), this.hide();
                }
                d && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField.trigger("change"));
            },
            setViewMode: function (a) {
                (this.viewMode = a),
                    this.picker
                        .children("div")
                        .hide()
                        .filter(".datepicker-" + r.viewModes[this.viewMode].clsName)
                        .show(),
                    this.updateNavArrows(),
                    this._trigger("changeViewMode", new Date(this.viewDate));
            },
        };
        var l = function (b, c) {
            a.data(b, "datepicker", this),
                (this.element = a(b)),
                (this.inputs = a.map(c.inputs, function (a) {
                    return a.jquery ? a[0] : a;
                })),
                delete c.inputs,
                (this.keepEmptyValues = c.keepEmptyValues),
                delete c.keepEmptyValues,
                n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)),
                (this.pickers = a.map(this.inputs, function (b) {
                    return a.data(b, "datepicker");
                })),
                this.updateDates();
        };
        l.prototype = {
            updateDates: function () {
                (this.dates = a.map(this.pickers, function (a) {
                    return a.getUTCDate();
                })),
                    this.updateRanges();
            },
            updateRanges: function () {
                var b = a.map(this.dates, function (a) {
                    return a.valueOf();
                });
                a.each(this.pickers, function (a, c) {
                    c.setRange(b);
                });
            },
            dateUpdated: function (c) {
                if (!this.updating) {
                    this.updating = !0;
                    var d = a.data(c.target, "datepicker");
                    if (d !== b) {
                        var e = d.getUTCDate(),
                            f = this.keepEmptyValues,
                            g = a.inArray(c.target, this.inputs),
                            h = g - 1,
                            i = g + 1,
                            j = this.inputs.length;
                        if (-1 !== g) {
                            if (
                                (a.each(this.pickers, function (a, b) {
                                    b.getUTCDate() || (b !== d && f) || b.setUTCDate(e);
                                }),
                                e < this.dates[h])
                            )
                                for (; h >= 0 && e < this.dates[h]; ) this.pickers[h--].setUTCDate(e);
                            else if (e > this.dates[i]) for (; i < j && e > this.dates[i]; ) this.pickers[i++].setUTCDate(e);
                            this.updateDates(), delete this.updating;
                        }
                    }
                }
            },
            destroy: function () {
                a.map(this.pickers, function (a) {
                    a.destroy();
                }),
                    a(this.inputs).off("changeDate", this.dateUpdated),
                    delete this.element.data().datepicker;
            },
            remove: f("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
        };
        var m = a.fn.datepicker,
            n = function (c) {
                var d = Array.apply(null, arguments);
                d.shift();
                var e;
                if (
                    (this.each(function () {
                        var b = a(this),
                            f = b.data("datepicker"),
                            g = "object" == typeof c && c;
                        if (!f) {
                            var j = h(this, "date"),
                                m = a.extend({}, o, j, g),
                                n = i(m.language),
                                p = a.extend({}, o, n, j, g);
                            b.hasClass("input-daterange") || p.inputs ? (a.extend(p, { inputs: p.inputs || b.find("input").toArray() }), (f = new l(this, p))) : (f = new k(this, p)), b.data("datepicker", f);
                        }
                        "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d));
                    }),
                    e === b || e instanceof k || e instanceof l)
                )
                    return this;
                if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)");
                return e;
            };
        a.fn.datepicker = n;
        var o = (a.fn.datepicker.defaults = {
                assumeNearbyYear: !1,
                autoclose: !1,
                beforeShowDay: a.noop,
                beforeShowMonth: a.noop,
                beforeShowYear: a.noop,
                beforeShowDecade: a.noop,
                beforeShowCentury: a.noop,
                calendarWeeks: !1,
                clearBtn: !1,
                toggleActive: !1,
                daysOfWeekDisabled: [],
                daysOfWeekHighlighted: [],
                datesDisabled: [],
                endDate: 1 / 0,
                forceParse: !0,
                format: "mm/dd/yyyy",
                keepEmptyValues: !1,
                keyboardNavigation: !0,
                language: "en",
                minViewMode: 0,
                maxViewMode: 4,
                multidate: !1,
                multidateSeparator: ",",
                orientation: "auto",
                rtl: !1,
                startDate: -1 / 0,
                startView: 0,
                todayBtn: !1,
                todayHighlight: !1,
                updateViewDate: !0,
                weekStart: 0,
                disableTouchKeyboard: !1,
                enableOnReadonly: !0,
                showOnFocus: !0,
                zIndexOffset: 10,
                container: "body",
                immediateUpdates: !1,
                title: "",
                templates: { leftArrow: "&#x00AB;", rightArrow: "&#x00BB;" },
                showWeekDays: !0,
            }),
            p = (a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"]);
        a.fn.datepicker.Constructor = k;
        var q = (a.fn.datepicker.dates = {
                en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    today: "Today",
                    clear: "Clear",
                    titleFormat: "MM yyyy",
                },
            }),
            r = {
                viewModes: [
                    { names: ["days", "month"], clsName: "days", e: "changeMonth" },
                    { names: ["months", "year"], clsName: "months", e: "changeYear", navStep: 1 },
                    { names: ["years", "decade"], clsName: "years", e: "changeDecade", navStep: 10 },
                    { names: ["decades", "century"], clsName: "decades", e: "changeCentury", navStep: 100 },
                    { names: ["centuries", "millennium"], clsName: "centuries", e: "changeMillennium", navStep: 1e3 },
                ],
                validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
                parseFormat: function (a) {
                    if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a;
                    var b = a.replace(this.validParts, "\0").split("\0"),
                        c = a.match(this.validParts);
                    if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
                    return { separators: b, parts: c };
                },
                parseDate: function (c, e, f, g) {
                    function h(a, b) {
                        return !0 === b && (b = 10), a < 100 && (a += 2e3) > new Date().getFullYear() + b && (a -= 100), a;
                    }
                    function i() {
                        var a = this.slice(0, j[n].length),
                            b = j[n].slice(0, a.length);
                        return a.toLowerCase() === b.toLowerCase();
                    }
                    if (!c) return b;
                    if (c instanceof Date) return c;
                    if (("string" == typeof e && (e = r.parseFormat(e)), e.toValue)) return e.toValue(c, e, f);
                    var j,
                        l,
                        m,
                        n,
                        o,
                        p = { d: "moveDay", m: "moveMonth", w: "moveWeek", y: "moveYear" },
                        s = { yesterday: "-1d", today: "+0d", tomorrow: "+1d" };
                    if ((c in s && (c = s[c]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(c))) {
                        for (j = c.match(/([\-+]\d+)([dmwy])/gi), c = new Date(), n = 0; n < j.length; n++) (l = j[n].match(/([\-+]\d+)([dmwy])/i)), (m = Number(l[1])), (o = p[l[2].toLowerCase()]), (c = k.prototype[o](c, m));
                        return k.prototype._zero_utc_time(c);
                    }
                    j = (c && c.match(this.nonpunctuation)) || [];
                    var t,
                        u,
                        v = {},
                        w = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                        x = {
                            yyyy: function (a, b) {
                                return a.setUTCFullYear(g ? h(b, g) : b);
                            },
                            m: function (a, b) {
                                if (isNaN(a)) return a;
                                for (b -= 1; b < 0; ) b += 12;
                                for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b; ) a.setUTCDate(a.getUTCDate() - 1);
                                return a;
                            },
                            d: function (a, b) {
                                return a.setUTCDate(b);
                            },
                        };
                    (x.yy = x.yyyy), (x.M = x.MM = x.mm = x.m), (x.dd = x.d), (c = d());
                    var y = e.parts.slice();
                    if (
                        (j.length !== y.length &&
                            (y = a(y)
                                .filter(function (b, c) {
                                    return -1 !== a.inArray(c, w);
                                })
                                .toArray()),
                        j.length === y.length)
                    ) {
                        var z;
                        for (n = 0, z = y.length; n < z; n++) {
                            if (((t = parseInt(j[n], 10)), (l = y[n]), isNaN(t)))
                                switch (l) {
                                    case "MM":
                                        (u = a(q[f].months).filter(i)), (t = a.inArray(u[0], q[f].months) + 1);
                                        break;
                                    case "M":
                                        (u = a(q[f].monthsShort).filter(i)), (t = a.inArray(u[0], q[f].monthsShort) + 1);
                                }
                            v[l] = t;
                        }
                        var A, B;
                        for (n = 0; n < w.length; n++) (B = w[n]) in v && !isNaN(v[B]) && ((A = new Date(c)), x[B](A, v[B]), isNaN(A) || (c = A));
                    }
                    return c;
                },
                formatDate: function (b, c, d) {
                    if (!b) return "";
                    if (("string" == typeof c && (c = r.parseFormat(c)), c.toDisplay)) return c.toDisplay(b, c, d);
                    var e = {
                        d: b.getUTCDate(),
                        D: q[d].daysShort[b.getUTCDay()],
                        DD: q[d].days[b.getUTCDay()],
                        m: b.getUTCMonth() + 1,
                        M: q[d].monthsShort[b.getUTCMonth()],
                        MM: q[d].months[b.getUTCMonth()],
                        yy: b.getUTCFullYear().toString().substring(2),
                        yyyy: b.getUTCFullYear(),
                    };
                    (e.dd = (e.d < 10 ? "0" : "") + e.d), (e.mm = (e.m < 10 ? "0" : "") + e.m), (b = []);
                    for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; g <= h; g++) f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
                    return b.join("");
                },
                headTemplate:
                    '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' +
                    o.templates.leftArrow +
                    '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' +
                    o.templates.rightArrow +
                    "</th></tr></thead>",
                contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>',
            };
        (r.template =
            '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' +
            r.headTemplate +
            "<tbody></tbody>" +
            r.footTemplate +
            '</table></div><div class="datepicker-months"><table class="table-condensed">' +
            r.headTemplate +
            r.contTemplate +
            r.footTemplate +
            '</table></div><div class="datepicker-years"><table class="table-condensed">' +
            r.headTemplate +
            r.contTemplate +
            r.footTemplate +
            '</table></div><div class="datepicker-decades"><table class="table-condensed">' +
            r.headTemplate +
            r.contTemplate +
            r.footTemplate +
            '</table></div><div class="datepicker-centuries"><table class="table-condensed">' +
            r.headTemplate +
            r.contTemplate +
            r.footTemplate +
            "</table></div></div>"),
            (a.fn.datepicker.DPGlobal = r),
            (a.fn.datepicker.noConflict = function () {
                return (a.fn.datepicker = m), this;
            }),
            (a.fn.datepicker.version = "1.7.0"),
            (a.fn.datepicker.deprecated = function (a) {
                var b = window.console;
                b && b.warn && b.warn("DEPRECATED: " + a);
            }),
            a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (b) {
                var c = a(this);
                c.data("datepicker") || (b.preventDefault(), n.call(c, "show"));
            }),
            a(function () {
                n.call(a('[data-provide="datepicker-inline"]'));
            });
    }),
    (function (a) {
        a.fn.datepicker.dates.fr = {
            days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
            daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
            daysMin: ["d", "l", "ma", "me", "j", "v", "s"],
            months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
            monthsShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
            today: "Aujourd'hui",
            monthsTitle: "Mois",
            clear: "Effacer",
            weekStart: 1,
            format: "dd/mm/yyyy",
        };
    })(jQuery),
    (function (a) {
        (a.resteACharge = function (b, c) {
            var d = {},
                e = this;
            e.settings = {};
            var f = a(b);
            return (
                (e.init = function () {
                    (e.settings = a.extend({}, d, c)),
                        f.find('select[data-role="careList"]').css("display", "none").on("change", e.onCareChange),
                        f.find('select[data-role="family"]').on("change", e.onFamilyChange),
                        f.find("#care-amount").on("keyup", e.onAmountChange);
                    var b = f.find('select[data-role="careList"]').first();
                    b.show(), (e.activeCareSelect = b), e.onCareChange();
                }),
                (e.onAmountChange = function () {
                    e.calculate();
                }),
                (e.onFamilyChange = function () {
                    e.displayCareList(a(this).val()), e.onCareChange();
                }),
                (e.onCareChange = function () {
                    var b = e.getCurrentCareData();
                    b && a("#care-amount").val(b.base), e.calculate();
                }),
                (e.displayCareList = function (b) {
                    f.find('select[data-role="careList"]').css("display", "none"), a("#carelist-" + b).show(), (e.activeCareSelect = a("#carelist-" + b));
                }),
                (e.getCurrentCareData = function () {
                    var a = e.activeCareSelect.val(),
                        b = careData[a];
                    return void 0 === b ? null : b;
                }),
                (e.getFormuleCareData = function (a) {
                    return void 0 !== careData.formule && void 0 !== careData.formule.cares[a] ? careData.formule.cares[a] : null;
                }),
                (e.validInput = function () {
                    var b = a("#care-amount").val().replace(",", "."),
                        c = e.getCurrentCareData();
                    if (c.base_on_price);
                    else if (b < c.base) return !1;
                    return !0;
                }),
                (e.switchUi = function (a, b) {
                    a ? (f.find(".is-valid-ui").show(), f.find(".is-not-valid-ui").hide()) : (f.find(".is-valid-ui").hide(), f.find(".is-not-valid-ui").show());
                }),
                (e.calculate = function () {
                    var b = e.activeCareSelect.val(),
                        c = e.getCurrentCareData();
                    e.switchUi(e.validInput());
                    var d = {};
                    if (void 0 !== c) {
                        (d.amount = a("#care-amount").val().replace(",", ".")), (d.base = c.base), c.base_on_price ? (d.rg = d.amount * (c.rate / 100)) : (d.rg = c.base * (c.rate / 100)), (d.formule = 0), (d.reste = 0);
                        var f = e.getFormuleCareData(b);
                        (d.formule = f ? c.base * (f.rate / 100) + f.fix : 0), d.formule + d.rg > d.amount && (d.formule = d.amount - d.rg), (d.rg -= c.contribution + c.franchise), (d.reste = Math.max(d.amount - d.rg - d.formule, 0));
                    } else (d.rg = null), (d.reste = null);
                    e.updateUi(c, d);
                }),
                (e.formatPrice = function (a) {
                    return (a = parseFloat(a).toFixed(2)), a.replace(".", ",") + " &euro;";
                }),
                (e.updateUi = function (b, c) {
                    var d = f.find(".jauge").first(),
                        g = Math.min((100 * c.rg) / c.amount, 100),
                        h = Math.min((100 * c.reste) / c.amount, 100),
                        i = Math.min((100 * c.formule) / c.amount, 100);
                    void 0 !== b && 1 == b.contribution ? a("#participationFlag").show() : a("#participationFlag").hide();
                    var j = 16.6;
                    if (c.reste > c.rg + c.formule)
                        if (c.formule) {
                            var k = Math.min(Math.floor(h / j), 4);
                            h = k * j;
                            var l = Math.max(Math.floor(i / j), 6 - k - 1);
                            (i = l * j), (g = (6 - l - k) * j);
                        } else (h = Math.floor(h / j) * j), (g = 100 - h);
                    else if (c.formule) {
                        var k = Math.min(Math.floor(g / j), 4);
                        g = k * j;
                        var l = Math.max(Math.floor(i / j), 6 - k - 1);
                        (i = l * j), (h = (6 - l - k) * j);
                    } else (g = Math.floor(g / j) * j), (h = 100 - g);
                    (0 == c.amount || (h <= 0 && i <= 0)) && (g = 100),
                        d.find(".jauge--rg").css("width", g + "%"),
                        f.find(".value--rg").html(e.formatPrice(c.rg)),
                        c.formule > 0
                            ? (d
                                  .find(".jauge--formule")
                                  .show()
                                  .css("left", g + "%")
                                  .css("width", i + "%"),
                              f.find(".value--formule").html(e.formatPrice(c.formule)),
                              f.find(".legend--formule").show())
                            : (d.find(".jauge--formule").hide(), f.find(".legend--formule").hide(), f.find(".value--formule").html(e.formatPrice(0))),
                        c.reste > 0
                            ? (d
                                  .find(".jauge--reste")
                                  .show()
                                  .css("left", g + i + "%")
                                  .css("width", h + "%"),
                              f.find(".value--reste").html(e.formatPrice(c.reste)))
                            : (d.find(".jauge--reste").hide(), f.find(".value--reste").html(e.formatPrice(0))),
                        c.formule > 0 ? (a("#refund-summary-formule").show(), a("#refund-summary-base").hide()) : (a("#refund-summary-formule").hide(), a("#refund-summary-base").show()),
                        f.find(".value-base").html(e.formatPrice(c.base));
                }),
                e.init(),
                e
            );
        }),
            (a.fn.resteACharge = function (b) {
                return this.each(function () {
                    if (void 0 == a(this).data("resteACharge")) {
                        var c = new a.resteACharge(this, b);
                        a(this).data("resteACharge", c);
                    }
                });
            });
    })(jQuery),
    $("body .js-reste-a-charge").resteACharge();
var isIE = !1;
$(document).ready(function (e) {
    !(function ($) {
        if (
            ($(".page-wrapper")
                .find("*[data-background]")
                .each(function () {
                    $(this).attr("style", $(this).data("background"));
                }),
            $(".apivia-protected").bind("contextmenu", function (a) {
                return alert("Ce logo ou cette marque sont protégés par copyright et ne peuvent être utilisés sans l'accord d'APIVIA Mutuelle. Pour toute demande, nous adresser un mail àjurimark@smamassurances.com"), !1;
            }),
            $("#modal-flash").length &&
                ($("#modal-flash").modal("show"),
                setTimeout(function () {
                    $("#modal-flash").modal("hide");
                }, 2e4)),
            $(".tx-adp-webservice-reload a").on("click", function (a) {}),
            $(".common-budget-slider").length &&
                $(".common-budget-slider").each(function () {
                    $(this).slider({
                        min: $(this).data("min"),
                        max: $(this).data("max"),
                        step: $(this).data("step"),
                        value: $(this).data("value"),
                        slide: function (a, b) {
                            var c = $(this).attr("id");
                            $("#" + c + "-field").val(b.value), $("#" + c + "-label").html(b.value);
                        },
                    });
                }),
            $(".capital-slider").length &&
                $(".capital-slider").each(function () {
                    $(this).slider({
                        min: $(this).data("min"),
                        max: $(this).data("max"),
                        step: $(this).data("step"),
                        value: $(this).data("value"),
                        slide: function (a, b) {
                            var c = $(this).attr("id");
                            $("#" + c + "-field").val(b.value), $("#" + c + "-label").html(b.value);
                        },
                    });
                }),
            $(".pmss-slider").length)
        ) {
            var $pmssSlider = $(".pmss-slider"),
                updatePercentage = function (a) {
                    var b = $(a).hasClass("pmss-slider") ? $(a) : a.data.pmssSlider,
                        c = b[0].value;
                    window.requestAnimationFrame(function () {
                        var a = (c / 100) * b.data("pmss");
                        (a = parseFloat(a).toFixed(2)),
                            (a = a.replace(".", ",") + " &euro;"),
                            b.parents(".pmss-simulator").first().find(".pmss-value").html(a),
                            b
                                .parents(".pmss-simulator")
                                .first()
                                .find(".pmss-percent__value")
                                .html(c + "%");
                    });
                };
            $pmssSlider.each(function () {
                var a = $(this);
                a.on("mousedown touchstart", function () {
                    updatePercentage(a), a.on("mousemove touchmove", { pmssSlider: a }, updatePercentage);
                }),
                    a.on("mouseup", function () {
                        updatePercentage(a), a.off("mousemove touchend", updatePercentage);
                    });
            });
        }
        if (
            ($(".toggle").each(function (a, b) {
                $(b).on("click", function () {
                    ($target = $("#" + $(this).data("toggle"))), $(this).prop("checked") ? $target.removeClass("is-hidden") : $target.addClass("is-hidden");
                }),
                    $(b).prop("checked") && $("#" + $(this).data("toggle")).removeClass("is-hidden");
            }),
            $("a.btn-backlink").length &&
                $("div.section-faq-answer").length &&
                -1 != document.referrer.indexOf("adp") &&
                $("a.btn-backlink").on("click", function (a) {
                    a.preventDefault(), history.go(-1);
                }),
            $(".js-toggle").each(function (a, b) {
                $(b).on("click", function () {
                    (currentState = $(this).find('input[type="checkbox"]').prop("checked")),
                        (curlabel = $(this).find("label").first()),
                        ($target = $("#" + $(this).data("toggle"))),
                        currentState
                            ? ($(this).addClass("inactive"), $target && $target.addClass("is-hidden"), curlabel.html(curlabel.data("inactive")))
                            : ($(this).removeClass("inactive"), $target && $target.removeClass("is-hidden"), curlabel.html(curlabel.data("active"))),
                        $(this).find("input").prop("checked", !currentState);
                }),
                    $(this).find('input[type="checkbox"]').prop("checked") &&
                        ($(this).removeClass("inactive"), $(this).find("label").first().html($(this).find("label").first().data("active")), $("#" + $(this).data("toggle")) && $("#" + $(this).data("toggle")).removeClass("is-hidden"));
            }),
            $("#form-sidebar .btn_vert").on("click", function (a) {
                a.preventDefault(),
                    $("#form-sidebar .form-outer-wrapper")
                        .first()
                        .animate(
                            { height: $("#form-sidebar .form-inner-wrapper").first().outerHeight() },
                            {
                                complete: function () {
                                    $(this).css("height", "auto"), $("#form-sidebar").find("input.makeDateMask").mask("99/99/9999");
                                },
                            }
                        );
            }),
            $(".toggle-sidebar").on("click", function () {
                var a = 0,
                    b = $("#" + $(this).data("toggle"));
                1 == $(this).data("toggle-on") && (b.css("display", "block"), (a = b.find(".form-inner-wrapper").first().outerHeight())),
                    b
                        .find(".form-outer-wrapper")
                        .first()
                        .animate(
                            { height: a },
                            {
                                complete: function () {
                                    0 == a ? b.css("display", "none") : $(this).css("height", "auto");
                                },
                            }
                        );
            }),
            $("#rappel #tel").on("submit", function (a) {
                a.preventDefault();
                var b = $(this);
                $.ajax({
                    url: $(this).attr("action"),
                    type: $(this).attr("method"),
                    data: $(this).serialize(),
                    dataType: "json",
                    success: function (a) {
                        if (a.success) {
                            (new Image(1, 1).src = "//www.googleadservices.com/pagead/conversion/1043876378/?label=XpVBCMWy3VoQmpTh8QM&guid=ON&script=0"),
                                window.ga && ga.loaded && ga("send", "event", "demande-de-rappel", "demande-de-rappel", "demande-de-rappel-zone-contact"),
                                b.find("input,button,select").css("display", "none"),
                                b.find(".retour").removeClass("error").addClass("success").html(a.msg);
                        } else b.find(".retour").addClass("error").html(a.msg);
                    },
                });
            }),
            $("form.js-submit").on("submit", function (e) {
                var callback = null;
                $(this).attr("data-callback") && (callback = $(this).data("callback")),
                    e.preventDefault(),
                    $.ajax({
                        url: $(this).attr("action"),
                        type: $(this).attr("method"),
                        data: $(this).serialize(),
                        dataType: "json",
                        success: function (retour) {
                            var config = { html: retour.msg, innerWidth: 350 };
                            retour.success ? ((config.className = "js-submit js-submit-success"), callback && eval(callback)) : (config.className = "js-submit js-submit-failure"),
                                $("#modalSubmit").find(".modal-body").html(retour.msg).end().modal("show");
                        },
                    });
            }),
            $("#content")
                .find(".arrondi")
                .each(function (a, b) {
                    $(b).css({ "margin-top": $(b).css("padding-top"), "margin-right": $(b).css("padding-right"), "margin-bottom": $(b).css("padding-bottom"), "margin-left": $(b).css("padding-left") }),
                        $(b).css({ "padding-top": 0, "padding-right": 0, "padding-bottom": 0, "padding-left": 0 });
                }),
            $(".tx-adp-webservice-formule a.js-detail-recall").length > 0 &&
                $(".tx-adp-webservice-formule a.js-detail-recall").each(function (a, b) {
                    $(b).on("click", function (a) {
                        a.preventDefault(),
                            ($formCtn = $(this).siblings(".detail-recall-form").first()),
                            $formCtn.css("display", "block"),
                            $(this).css("display", "none"),
                            $formCtn
                                .find("form")
                                .first()
                                .on("submit", function (a) {
                                    a.preventDefault(), $.ajax({ url: $(this).attr("action"), type: $(this).attr("method"), data: $(this).serialize(), dataType: "json" });
                                });
                    });
                }),
            $(".tx-adpencart-display").on("click", ".encart-head-close", function (a) {
                var b = $(this).parents(".encart").first(),
                    c = jQuery.parseJSON($.cookie("encartHide"));
                null == c && (c = {}), (c[b.attr("id")] = 1), $.cookie("encartHide", JSON.stringify(c), { expires: 1 }), b.remove();
            }),
            $(".testimonials").length && $(".testimonials").slick({ dots: !0, arrows: !1, autoplay: !0, autoplaySpeed: 4e3, pauseOnHover: !0 }),
            $(".facade").length &&
                $("body").on("click", ".facade, .facade *", function (a) {
                    a.preventDefault();
                    var b = $(this).hasClass("facade") ? $(this) : $(this).parents(".facade").first();
                    b.replaceWith($('<iframe src="' + b.data("src") + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                }),
            $('div[data-role="anchor-menu"]').length &&
                $('div[data-role="anchor-menu"]').on("click", "a[data-anchor]", function (a) {
                    a.preventDefault(), $(this).blur(), $("#" + $(this).data("anchor")).length && $("html,body").animate({ scrollTop: $($("#" + $(this).data("anchor"))).offset().top - 85 }, 500);
                }),
            $(".cards--video").length)
        ) {
            var sliderCardsVideo = $(".cards--video").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: !1,
                dots: !0,
                infinite: !1,
                responsive: [
                    { breakpoint: 979, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                    { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            });
            sliderCardsVideo.on("afterChange", function (a, b, c) {
                window.bLazy.revalidate();
            });
        }
        $(".js-form-select").each(function (a, b) {
            $("#" + $(b).attr("id") + "-button").attr("tabindex", $(b).attr("tabindex"));
        });
        var nbCurrentField = $("#block-enfant").find(".date-enfant").length;
        $("form .js-nb-enfants-acs").on("change", function () {
            var a = parseInt($(this).val()),
                b = a - nbCurrentField,
                c = $("#block-enfant").find(".date_enfants").first();
            if (b > 0) {
                c.find(".date_enfant").last();
                var d = [];
                if ($("#block-enfant").data("template"))
                    for (var e = nbCurrentField + 1; e <= a; e++) {
                        var f = $("#block-enfant").data("template").replace("%num%", e);
                        d.push(f);
                    }
                else
                    for (var e = nbCurrentField + 1; e <= a; e++) {
                        var g = $('<div class="date_enfant"></div>'),
                            h = $("<label>Enfant " + e + "</label>"),
                            i = $('<input type="text" placeholder="jj/mm/aaaa" name="tx_adp_webservice_remote[enfants_dob][]"/>').attr("class", "form-control makeDateMask validate[required,custom[date]]");
                        g.append(h, i), d.push(g);
                    }
                c.find(".date-enfant").length ? c.find(".date-enfant").last().after(d) : c.append(d);
            } else
                c.find(".date-enfant").each(function (b, c) {
                    b >= a && $(c).remove();
                });
            nbCurrentField = a;
        }),
            $("form").on("change", ".widget-date input", function () {
                (fields = $(this).parents(".widget-date").find('input[type="text"]')), (vals = new Array());
                for (var a = 0; a < fields.length; a++) {
                    if ("" == $(fields[a]).val()) {
                        vals = new Array();
                        break;
                    }
                    vals.push($(fields[a]).val());
                }
                vals.length ? $(this).parents(".widget-date").find('input[type="hidden"], input[data-dob="1"]').val(vals.join("/")) : $(this).parents(".widget-date").find('input[type="hidden"], input[data-dob="1"]').val("");
            }),
            $("form").on("keypress", ".widget-date input", function () {
                ($this = $(this)),
                    setTimeout(function () {
                        (maxLength = $this.attr("maxlength")), $this.val().length >= maxLength && $this.parents(".field, .widget-field").next(".field, .widget-field").find('input[type="text"]').first().focus();
                    }, 5);
            }),
            $("iframe.loader").length &&
                $("iframe.loader").on("load", function () {
                    $(this).removeClass("loader");
                }),
            $("#footer").on("click", ".reseau .facebook", function (a) {
                return window.ga && ga.loaded && ga("send", "event", "clics-liens-sortants", "clics-LS-Reseaux-Sociaux", "clics-LS-RS-Facebook"), !0;
            }),
            $("#footer").on("click", ".reseau .twitter", function (a) {
                return window.ga && ga.loaded && ga("send", "event", "clics-liens-sortants", "clics-LS-Reseaux-Sociaux", "clics-LS-RS-Twitter"), !0;
            }),
            $("#content").on("click", "a.js-zoom", function (a) {
                a.preventDefault(), $.colorbox({ href: $(this).attr("href") });
            }),
            $("#form-acs").length > 0 &&
                ($("#form-acs").validationEngine({
                    scroll: !1,
                    binded: !1,
                    prettySelect: !0,
                    showPrompts: !1,
                    onFieldSuccess: function (a) {
                        a.next(".error-msg").remove();
                    },
                    onFieldFailure: function (a, b, c) {
                        a.next(".error-msg").remove(), a.addClass("error").after($('<div class="error-msg"></div>').html(c));
                    },
                }),
                $("#form-acs").on("submit", function (a) {
                    var b = $(this);
                    a.preventDefault();
                    b.data("action").toString();
                    b.validationEngine("validate") &&
                        (window.ga && ga.loaded && ga("send", "event", "clic-page-form", "clic-page-form-ACS", "clic-page-form-ACS-ok"),
                        $.ajax({
                            url: b.data("action"),
                            dataType: "json",
                            cache: !1,
                            data: b.serialize() + "&format=json",
                            success: function (a) {
                                a.success && $(b.data("ctn")).html(a.html);
                            },
                            error: function (a) {},
                        }));
                })),
            $("body").find('*[data-geoautocomplete="1"]').length > 0 &&
                $("body")
                    .find('*[data-geoautocomplete="1"]')
                    .each(function () {
                        $(this).geocomplete({ details: $(this).parents(".address-group").first(), detailsAttribute: "data-geo" });
                    }),
            $('select[data-role="blog-category"]').length > 0 &&
                $('select[data-role="blog-category"]').on("change", function (a) {
                    a.preventDefault(), (window.location.href = $(this).val());
                });
    })(jQuery);
}),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery);
    })(function (a) {
        function b(a) {
            return h.raw ? a : encodeURIComponent(a);
        }
        function c(a) {
            return h.raw ? a : decodeURIComponent(a);
        }
        function d(a) {
            return b(h.json ? JSON.stringify(a) : String(a));
        }
        function e(a) {
            0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return (a = decodeURIComponent(a.replace(g, " "))), h.json ? JSON.parse(a) : a;
            } catch (a) {}
        }
        function f(b, c) {
            var d = h.raw ? b : e(b);
            return a.isFunction(c) ? c(d) : d;
        }
        var g = /\+/g,
            h = (a.cookie = function (e, g, i) {
                if (void 0 !== g && !a.isFunction(g)) {
                    if (((i = a.extend({}, h.defaults, i)), "number" == typeof i.expires)) {
                        var j = i.expires,
                            k = (i.expires = new Date());
                        k.setTime(+k + 864e5 * j);
                    }
                    return (document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join(""));
                }
                for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; n < o; n++) {
                    var p = m[n].split("="),
                        q = c(p.shift()),
                        r = p.join("=");
                    if (e && e === q) {
                        l = f(r, g);
                        break;
                    }
                    e || void 0 === (r = f(r)) || (l[q] = r);
                }
                return l;
            });
        (h.defaults = {}),
            (a.removeCookie = function (b, c) {
                return void 0 !== a.cookie(b) && (a.cookie(b, "", a.extend({}, c, { expires: -1 })), !a.cookie(b));
            });
    }),
    (function (a) {
        function b() {
            window.matchMedia("(max-width:" + (g - 1) + "px)").matches ? c.show() : c.hide();
        }
        var c,
            d = a("body"),
            e = a("#btn-devis").attr("href"),
            f = a("#btn-devis").html(),
            g = 992;
        a("#sticky-bottom-bar").length ||
            d.find(".funnel-page").length ||
            a(".insurance-detail").length ||
            (d.append('<div id="sticky-bottom-bar"><div class="sticky-bottom-bar__inner"><a href="' + e + '" class="btn btn-primary">' + f + "</a></div></div>"), (c = a("#sticky-bottom-bar")), b()),
            a(window).on("resize", function () {
                a("#sticky-bottom-bar").length && b();
            });
    })(jQuery),
    (function (a) {
        function b() {
            return window.matchMedia("(max-width:" + (i - 1) + "px)").matches;
        }
        function c() {
            (g = j.find("#header__menu").length),
                l
                    ? g &&
                      (a(".page-wrapper").prepend(h),
                      h
                          .find(".header__menu__inner")
                          .children("ul")
                          .first()
                          .append(
                              '<li class="lvl1 js-added"><a href="' +
                                  o +
                                  '" class=""><span class="icon icon-blog"></span>Blog</a></li><li class="lvl1 js-added"><a href="' +
                                  faqLink +
                                  '" class=""><span class="icon icon-faq-xs"></span>FAQ</a></li>'
                          ),
                      h.find(".header__menu__inner").prepend('<ul id="header__menu__top" class="js-added"><li><a href="' + m + '" class="btn">' + n + "</a></li></ul>"))
                    : g || (h.find(".js-added").remove(), j.find(".container__inner").append(h));
        }
        function d() {
            l || (k.off(), h.off());
        }
        function e() {
            function b(c) {
                a(c.data.event.target).closest("#header__menu").length || (a(c.data.event.currentTarget).removeClass("is-active"), i.removeClass("is-translate"), a(document).off("click", b));
            }
            var c;
            if (l) {
                var e,
                    f,
                    g = 200,
                    i = a("body");
                k.on("click", function (c) {
                    var d = a(this);
                    i.hasClass("is-translate") ||
                        (setTimeout(function () {
                            a(document).on("click", { event: c }, b);
                        }),
                        d.toggleClass("is-active"),
                        i.toggleClass("is-translate"));
                }),
                    h.on("click touchend", "li.lvl1 > a", function (b) {
                        if (((c = a(this).parent().find(".lvl2-wrapper")), 0 == c.length)) return !0;
                        b.preventDefault();
                        var d = c.first();
                        e ? (d[0] == e[0] ? (d.slideUp(g), (e = "")) : (e.slideUp(g), d.slideDown(g), (e = d)), f && (f.slideUp(g), (f = ""))) : (d.slideDown(g), (e = d));
                    }),
                    h.on("click touchend", "li.lvl2 > a", function (b) {
                        if (a(this).hasClass("dropdown-toggle")) {
                            b.preventDefault();
                            var c = a(this).parent().find(".lvl3").first();
                            f ? (c[0] == f[0] ? (c.slideUp(g), (f = "")) : (f.slideUp(g), c.slideDown(g), (f = c))) : (c.slideDown(g), (f = c));
                        }
                    });
            } else d();
        }
        if (!f) var f = "";
        var g,
            h = a("#header__menu"),
            i = 992,
            j = a("#header"),
            k = a("#toogle-nav"),
            l = !1,
            m = (a("#header__menu").length, a("#btn-devis").attr("href")),
            n = a("#btn-devis").html(),
            o = a("#btn-blog").attr("href");
        (faqLink = a("#btn-faq").attr("href")),
            (l = b()),
            c(),
            e(),
            a(window).on("resize", function () {
                var a = b();
                a !== l && ((l = a), c(), e());
            });
        (detectIE = function () {
            var a = window.navigator.userAgent;
            return a.indexOf("MSIE ") > 0 || a.indexOf("Trident/") > 0 || a.indexOf("Edge/") > 0;
        }),
            detectIE(),
            l ||
                h.on("mouseenter", "li.lvl2", function (b) {
                    var c = a(this),
                        d = c.find(".lvl3").first();
                    return (
                        d.hasClass("positioned") ||
                            (d.outerHeight(!0) < c.outerHeight(!0) + c.position().top ? d.css("top", c.outerHeight(!0) + c.position().top - d.outerHeight(!0)) : d.css("top", 0),
                            a("#header__menu").length > 0 && (c.offset().left + c.outerWidth() + d.outerWidth() > a("#header__menu").offset().left + a("#header__menu").outerWidth() ? d.addClass("left") : d.addClass("right"))),
                        !0
                    );
                });
    })(jQuery),
    (function (a) {
        if (!a(".header--funnel").length && !a("body").hasClass("iframe")) {
            var b,
                c = "",
                d = a("#header"),
                e = (d.find(".header__top"), 200),
                f = 0;
            (b = d.outerHeight()),
                a(window).on("scroll", function () {
                    (c = a(document).scrollTop()),
                        c > e
                            ? (d.hasClass("is-fixed") || (d.addClass("no-transition"), d.addClass("is-fixed"), d[0].offsetHeight, d.removeClass("no-transition"), a("body").css("padding-top", b + "px")),
                              c > b + 100 ? d.hasClass("is-visible") || d.addClass("is-visible") : d.hasClass("is-visible") && d.removeClass("is-visible"))
                            : (d.removeClass("is-fixed"), a("body").css("padding-top", 0)),
                        (f = c);
                });
        }
    })(jQuery),
    (function (a) {
        var b = a("#header__menu"),
            c = b.find(".lvl1");
        0 != b.length &&
            a.ajax(window.location.protocol + "//" + window.location.hostname + "/?type=5002", { cache: !1, dataType: "html" }).done(function (b) {
                for (var d = b, e = a(d).find(".lvl1"), f = 0; f < c.length; f++) {
                    if (!a(c[f]).hasClass("selected")) {
                        var g = a(e[f]).find(".lvl2-wrapper");
                        g.length && a(c[f]).append(g);
                    }
                    if (window.matchMedia("(max-width: 767px)").matches) {
                        var h = a(c[f]).find("a.dropdown-toggle").first().attr("href");
                        a(c[f])
                            .find("div.lvl2-wrapper")
                            .first()
                            .find("ul.dropdown-menu")
                            .first()
                            .prepend('<li class="lvl2 sommaire"><a href="' + h + '"><span>Consulter le sommaire</span></a></li>');
                    }
                }
            });
    })(jQuery),
    (function (a) {
        function b() {
            setTimeout(function () {
                var a = h.find("li").first();
                window.matchMedia("(max-width: 767px)").matches ? j || a.after(i) : (a.addClass("active"), i.children().first().addClass("active")), (d = i.offset().top), (e = i.height()), (f = h.offset().top), (g = h.outerHeight(!0));
            });
        }
        function c(a) {
            e = a.height();
        }
        if (a(".nav-tabs:not(.nav-tabs--form)").length) {
            var d,
                e,
                f,
                g,
                h = a(".nav-tabs:not(.nav-tabs--form)"),
                i = a(".tab-content"),
                j = h.hasClass("nav-tabs--anchors");
            a('[data-toggle="tab"]').click(function () {
                var b = a(this),
                    d = a(b.attr("href"));
                j || c(d),
                    window.matchMedia("(max-width: 767px)").matches
                        ? (b.after(i),
                          b.parent().hasClass("active")
                              ? (d.toggleClass("active"),
                                setTimeout(function () {
                                    b.parent().toggleClass("active");
                                }))
                              : setTimeout(function () {
                                    a("html, body").animate({ scrollTop: b.offset().top }, 500);
                                }, 200))
                        : setTimeout(function () {
                              a("html, body").animate({ scrollTop: d.offset().top - g }, 500);
                          }, 200);
            }),
                a(window).on("scroll", function () {
                    window.matchMedia("(min-width: 768px)").matches &&
                        (a(window).scrollTop() > f && a(window).scrollTop() < e + d - g
                            ? h.hasClass("is-fixed") || (h.addClass("is-fixed"), i.css("margin-top", g))
                            : h.hasClass("is-fixed") && (h.removeClass("is-fixed"), i.css("margin-top", 0)));
                }),
                a(window).on("resize", function () {
                    if (!j) {
                        var a = h.find("li.active");
                        window.matchMedia("(max-width: 767px)").matches ? a.length && a.after(i) : a.length ? h.after(i) : (h.find("li").first().addClass("active"), i.find(".tab-pane").first().addClass("active"));
                    }
                    window.matchMedia("(max-width: 767px)").matches && i.css("margin-top", 0);
                }),
                b();
        }
    })(jQuery),
    (function (a) {
        a('[data-toggle="tooltip"]').tooltip();
    })(jQuery),
    (function (a) {
        if (a(".fake-select").length) {
            a(".fake-select").each(function () {
                var b = a(this),
                    c = b.find("ul"),
                    d = c.children("li:not(.init)"),
                    e = "",
                    f = b.find(".btn"),
                    g = a(d[0]).find("a");
                d.toggle(),
                    b.find("ul").css("width", c.width() + 15),
                    d.toggle(),
                    (e = g.attr("href")),
                    d.length < 2
                        ? c.hide()
                        : (c.children(".init").html(g.html()),
                          c.on("click", ".init", function () {
                              a(this).closest("ul").children("li:not(.init)").toggle(),
                                  a(document).off("click.fakeselect"),
                                  setTimeout(function () {
                                      a(document).on("click.fakeselect", function () {
                                          d.toggle(), a(document).off("click.fakeselect");
                                      });
                                  });
                          }),
                          c.on("click", "li:not(.init)", function (b) {
                              var f = a(this);
                              b.preventDefault(),
                                  d.removeClass("selected"),
                                  f.addClass("selected"),
                                  c.children(".init").html(f.find("a").html()),
                                  (e = f.find("a").attr("href")),
                                  a("#category-link").attr("href", f.find("a").attr("href")),
                                  d.toggle(),
                                  a(document).off("click.fakeselect");
                          })),
                    f.on("click", function () {
                        "" !== e && (location.href = e);
                    });
            });
        }
    })(jQuery),
    (function (a) {
        if (a(".contact-page").length) {
            var b = a(".contact-page"),
                c = b.find(".contact-panel"),
                d = b.find(".contact-toggle");
            d.on("click", function (b) {
                b.preventDefault(), c.hide(), d.show();
                var e = a(this).data("toggle");
                a(this).hide(), a(e).show();
            }),
                a('input[data-mask="phone"]').each(function () {
                    new Cleave('input[data-mask="phone"]', {
                        phone: !0,
                        phoneRegionCode: "FR",
                        onValueChanged: function (b) {
                            a(this.element)
                                .val()
                                .match(/^\+?33/) &&
                                a(this.element).val(
                                    a(this.element)
                                        .val()
                                        .replace(/^\+?33/, "0")
                                );
                        },
                    });
                }),
                a(window).keydown(function (a) {
                    if (13 == a.keyCode) return a.preventDefault(), !1;
                });
        }
        a(".card--news, .card--guide, .card--insurance").on("click", function (b) {
            b.preventDefault(), (document.location = a(this).find("a").first().attr("href"));
        }),
            a("#contact-form").validate({
                errorElement: "div",
                errorPlacement: function (b, c) {
                    a(c).parent().append(b);
                },
                errorClass: "invalid",
            }),
            jQuery.extend(jQuery.validator.messages, { required: "Merci de remplir ce champ" });
    })(jQuery),
    jQuery(window).on("load", function (a) {
        "" !== location.hash && $('a[data-toggle="tab"][href="' + location.hash + '"]').length && $('a[data-toggle="tab"][href="' + location.hash + '"]').tab("show"),
            (window.bLazy = new Blazy({
                loadInvisible: !0,
                success: function (a) {
                    console.log(a);
                },
                error: function (a, b) {
                    console.log(b);
                },
            }));
    });
var inputStatus = (function (a) {
    function b(a) {
        a.parent().find("label").addClass("is-active");
    }
    function c(a) {
        a.parent().find("label").removeClass("is-active");
    }
    return (
        a(document).on(
            {
                focus: function () {
                    var c = a(this);
                    b(c), "date" === c.data("mask") && c.attr("placeholder", "_ _ /_ _ /_ _ _ _");
                },
                blur: function () {
                    var b = a(this);
                    setTimeout(function () {
                        "date" === b.data("mask") && b.attr("placeholder", ""), "" === b.val() && c(b);
                    }, 200);
                },
            },
            ".form-control--md"
        ),
        { active: b }
    );
})(jQuery);
$('[data-role="phone-button"]').length &&
    $('[data-role="phone-button"]').on("click", function (a) {
        var b = $(this);
        b.hasClass("number-shown") || (a.preventDefault(), b.html(b.data("number")), b.addClass("number-shown"), window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_persistant", "appelez-nous"));
    }),
    $(document).ready(function (a) {
        for (var b = document.getElementsByClassName("atc"), c = 0; c < b.length; c++) b[c].addEventListener("click", myFunction, !1), b[c].addEventListener("contextmenu", myRightFunction, !1);
    });
var myFunction = function (a) {
        var b = this.getAttribute("data-atc"),
            c = this.getAttribute("target");
        if (a.ctrlKey || "_blank" == c) {
            window.open(decodeURIComponent(window.atob(b)), "_blank").focus();
        } else document.location.href = decodeURIComponent(window.atob(b));
    },
    myRightFunction = function (a) {
        var b = this.getAttribute("data-atc"),
            c = this.getAttribute("target");
        if (a.ctrlKey || "_blank" == c) {
            window.open(decodeURIComponent(window.atob(b)), "_blank").focus();
        } else window.open(decodeURIComponent(window.atob(b)), "_blank");
    };
if ($(".funnel-page").length) {
    (window.iframeSubscribe = function (a) {
        $("#modalDetailsGarantie").modal("hide"), formFunnel.steps[formFunnel.stepsId.OPTIONS].loadOptionsProcess(a), formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.OPTIONS);
    }),
        $(".insurances-logos").length &&
            $(".insurances-logos").slick({
                slidesToShow: 9,
                slidesToScroll: 1,
                arrows: !1,
                autoplay: !0,
                infinite: !0,
                autoplaySpeed: 2e3,
                responsive: [
                    { breakpoint: 1024, settings: { slidesToShow: 6 } },
                    { breakpoint: 768, settings: { slidesToShow: 5 } },
                    { breakpoint: 530, settings: { slidesToShow: 4 } },
                    { breakpoint: 430, settings: { slidesToShow: 3 } },
                ],
            });
    var lastServiceQueryUrl = !1,
        loaderMask = {
            $loader: $("#loaderMask"),
            show: function () {
                this.$loader.show();
            },
            hide: function () {
                this.$loader.hide();
            },
        },
        UI = {},
        formUtils = {
            resetValidation: function (a) {
                $("#quotation-form").validate().resetForm();
            },
            isFormEltsValid: function (a) {
                var b = 0;
                return (
                    a.each(function () {
                        $(this).valid() && b++;
                    }),
                    b === a.length
                );
            },
            getCivility: function (a) {
                var b;
                return "mr" === a ? (b = "Monsieur") : "md" === a && (b = "Madame"), b;
            },
            getPersonnalizedTitle: function () {
                return (
                    " " +
                    formUtils.getCivility(
                        $("#" + formFunnel.stepsId.USER_INFORMATION_GENDER)
                            .find('[name="tx_adp_webservice_remote[civilite]"]')
                            .filter(":checked")
                            .val()
                    ) +
                    " " +
                    $("#" + formFunnel.stepsId.USER_INFORMATION_NAME)
                        .find('[name="tx_adp_webservice_remote[nom]"]')
                        .val()
                );
            },
            addDatesRules: function (a) {
                $('input[name*="[' + a + '][day]"]').rules("add", { required: !0, adpregex: /^\d{1,2}$/, messages: { required: "jour invalide" } }),
                    $('input[name*="[' + a + '][year]"]').rules("add", { required: !0, adpregex: /^[0-9]{4}$/, messages: { adpregex: "Format de l'année non valide " } });
            },
            removeDatesRules: function (a) {
                $('input[name*="[' + a + '][day]"]').rules("remove"), $('input[name*="[' + a + '][year]"]').rules("remove");
            },
            initSelectYear: function (a, b, c) {
                if (b) {
                    var d = parseInt(new Date().getFullYear()) - 18;
                    console.log("Adult" + d);
                    var e = !1;
                } else if (c) {
                    var d = parseInt(new Date().getFullYear());
                    console.log("Child" + d);
                    var e = parseInt(new Date().getFullYear()) - 30;
                    console.log("Child max " + e);
                } else {
                    var d = parseInt(new Date().getFullYear());
                    console.log("others" + d);
                    var e = !1;
                }
                for (var f = 100; f > 0; ) e && d < e ? (f--, d--) : ($(a).append('<option value="' + d + '">' + d + "</option>"), d--, f--);
            },
        },
        formFunnel = {
            $form: $("#quotation-form"),
            $stepContainer: $(".funnel-page .step-container"),
            $steps: $(".funnel-page .step-container").find(".step"),
            stepsId: {
                START: "s-start",
                USER_INFORMATION_GENDER: "s-user-information_gender",
                USER_INFORMATION_REGIME: "s-user-information_regime",
                USER_INFORMATION_POSTAL_CODE: "s-user-information_postal-code",
                USER_INFORMATION_CONTRACT_START_DATE: "s-user-information_contract-start-date",
                USER_INFORMATION_NAME: "s-user-information_name",
                PARTNER_INFORMATION: "s-partner-information",
                PARTNER_INFORMATION_GENDER: "s-partner-information_gender",
                PARTNER_INFORMATION_REGIME: "s-partner-information_regime",
                CHILDREN_INFORMATION: "s-children-information",
                NEEDS: "s-needs",
                QUOTATIONS: "s-quotations",
                OPTIONS: "s-options",
                SUBSCRIPTION: "s-subscription",
            },
            ga: {},
            steps: {},
            stepsSlide: {},
        };
    !(function () {
        var a = {};
        (a[formFunnel.stepsId.START] = { pageview: "/devis-mutuelle/etape1_qui-souhaitez-vous-assurer", event: "", hj: "etape1_qui-souhaitez-vous-assurer" }),
            (a[formFunnel.stepsId.USER_INFORMATION_GENDER] = { pageview: "/devis-mutuelle/etape2.1.1_vous-genre", event: "clic_etape2.1.1", hj: "etape2-1_vous_sexe" }),
            (a[formFunnel.stepsId.USER_INFORMATION_REGIME] = { pageview: "/devis-mutuelle/etape2.1.3_vous-regime-obligatoire", event: "clic_etape2.1.2", hj: "etape2-2_vous_regime_obligatoire" }),
            (a[formFunnel.stepsId.USER_INFORMATION_POSTAL_CODE] = { pageview: "/devis-mutuelle/etape2.1.4_vous-code-postal", event: "clic_etape2.1.3", hj: "etape2-3_vous_cp" }),
            (a[formFunnel.stepsId.USER_INFORMATION_CONTRACT_START_DATE] = { pageview: "/devis-mutuelle/etape2.1.5_vous-date-debut-contrat", event: "clic_etape2.1.4", hj: "etape2-4_vous_date_contrat" }),
            (a[formFunnel.stepsId.USER_INFORMATION_NAME] = { pageview: "/devis-mutuelle/etape2.1.6_vous-nom-prenom", event: "clic_etape2.1.5", hj: "etape2-5_vous_informations" }),
            (a[formFunnel.stepsId.PARTNER_INFORMATION_GENDER] = { pageview: "/devis-mutuelle/etape2.2.1_conjoint-genre", event: "clic_etape2.2.1", hj: "etape2-6_conjoint_sexe" }),
            (a[formFunnel.stepsId.PARTNER_INFORMATION_REGIME] = { pageview: "/devis-mutuelle/etape2.2.3_conjoint-regime-obligatoire", event: "clic_etape2.2.2", hj: "etape2-7_conjoint_regime" }),
            (a[formFunnel.stepsId.CHILDREN_INFORMATION] = { pageview: "/devis-mutuelle/etape2.3_enfants", event: "clic_etape2.3", hj: "etape2-8_enfant_nombre" }),
            (a[formFunnel.stepsId.NEEDS] = { pageview: "/devis-mutuelle/etape2.4_besoins", event: "clic_etape2.4", hj: "etape3_besoins" }),
            (a[formFunnel.stepsId.QUOTATIONS] = { pageview: "/devis-mutuelle/etape3_devis", event: "clic_etape3", hj: "etape4_devis" }),
            (a[formFunnel.stepsId.OPTIONS] = { pageview: "/devis-mutuelle/etape4_recapitulatif", event: "clic_etape4", hj: "etape5_recapitulatif" }),
            (a[formFunnel.stepsId.SUBSCRIPTION] = { pageview: "/devis-mutuelle/etape5_souscription", event: "clic_etape5", hj: "etape6-1_souscription_couverture_actuelle" }),
            (a[62] = { pageview: "", event: "", hj: "etape6-2_souscription_souscripteur" }),
            (a[63] = { pageview: "", event: "", hj: "etape6-3_souscription_conjoint" }),
            (a[64] = { pageview: "", event: "", hj: "etape6-4_souscription_enfant" }),
            (a[65] = { pageview: "", event: "", hj: "etape6-5_souscription_date_effet" }),
            (a[66] = { pageview: "", event: "", hj: "etape6-6_souscription_rib_prelevement" }),
            (a[67] = { pageview: "", event: "", hj: "etape6-7_souscription_validation" }),
            (formFunnel.ga = {
                pageView: function (b) {
                    window.ga && ga.loaded && ga("send", "pageview", a[b].pageview);
                },
                launchStepBackEvent: function (b) {
                    window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", a[b].event, "retour");
                },
            }),
            (formFunnel.hj = {
                hjtrigger: function (b) {
                    window.hj && "function" == typeof window.hj && (console.log("hj", a[b].hj), hj("trigger", a[b].hj));
                },
            });
    })(),
        (function (a, b, c, d) {
            formFunnel.stepsSlide = {
                historyStack: [],
                currentStepId: "",
                $currentStep: null,
                isSliding: !1,
                init: function () {
                    (this.currentStepId = a(formFunnel.$steps[0]).attr("id")), this.historyStack.push(this.currentStepId), formFunnel.ga.pageView(this.currentStepId), formFunnel.hj.hjtrigger(this.currentStepId);
                },
                historyStackAdd: function (a) {
                    this.historyStack.push(a);
                },
                setFamilyStepVisibility: function (b) {
                    var d = a('[id*="s-' + b + '-information"]'),
                        e = d.find(".step__form").find('input[type="text"].form-control, input[type="tel"].form-control, textarea.form-control'),
                        f = d.find(".step__form").find('select.form-control, input[type="radio"].form-control');
                    "partner" === b && c.addDatesRules("conjoint_dob"), d.removeClass("is-disabled"), e.attr("disabled", !1), f.attr("disabled", !1), c.resetValidation(d);
                },
                _onEnterStep: function (a) {
                    formFunnel.steps.hasOwnProperty(a) && formFunnel.steps[a].hasOwnProperty("onEnter") && formFunnel.steps[a].onEnter();
                },
                _onLeaveStep: function () {
                    formFunnel.steps.hasOwnProperty(formFunnel.stepsSlide.currentStepId) && formFunnel.steps[formFunnel.stepsSlide.currentStepId].hasOwnProperty("onLeave") && formFunnel.steps[formFunnel.stepsSlide.currentStepId].onLeave();
                },
                onPrevStep: function (a) {
                    a.preventDefault(), formFunnel.stepsSlide.isSliding || formFunnel.stepsSlide._goToPrevStep();
                },
                onNextStep: function (b) {
                    void 0 !== b && a(b.currentTarget).hasClass("btn-next-step") && b.preventDefault(), (formFunnel.stepsSlide.$currentStep = a("#" + formFunnel.stepsSlide.currentStepId));
                    var d = formFunnel.stepsSlide.$currentStep.find(a("input,textarea,select").filter("[required]"));
                    d.length ? c.isFormEltsValid(d) && (formFunnel.stepsSlide.isSliding || formFunnel.stepsSlide._onStepValid()) : formFunnel.stepsSlide.isSliding || formFunnel.stepsSlide._onStepValid();
                },
                _onStepValid: function () {
                    for (var b, c = formFunnel.$steps.index(formFunnel.stepsSlide.$currentStep), d = c + 1; d < formFunnel.$steps.length; d++)
                        if (!a(formFunnel.$steps[d]).hasClass("is-disabled")) {
                            b = a(formFunnel.$steps[d]).attr("id");
                            break;
                        }
                    formFunnel.stepsSlide.goToNextStep(b);
                },
                _goToPrevStep: function () {
                    if (((formFunnel.stepsSlide.isSliding = !0), formFunnel.stepsSlide.historyStack.length > 1)) {
                        formFunnel.ga.launchStepBackEvent(formFunnel.stepsSlide.historyStack[formFunnel.stepsSlide.historyStack.length - 1]),
                            formFunnel.hj.hjtrigger(formFunnel.stepsSlide.historyStack[formFunnel.stepsSlide.historyStack.length - 1]);
                        var b = formFunnel.stepsSlide.historyStack[formFunnel.stepsSlide.historyStack.length - 2],
                            c = a("#" + b);
                        (formFunnel.stepsSlide.$currentStep = a("#" + formFunnel.stepsSlide.currentStepId)),
                            formFunnel.stepsSlide.$currentStep.addClass("on-leave-prev"),
                            setTimeout(function () {
                                formFunnel.stepsSlide.$currentStep.removeClass("is-visible").removeClass("is-current").removeClass("on-leave-prev").off(), (formFunnel.stepsSlide.isSliding = !1);
                            }, 500),
                            this._onLeaveStep(),
                            c.addClass("is-visible"),
                            setTimeout(function () {
                                c.addClass("on-enter-prev"),
                                    setTimeout(function () {
                                        c.removeClass("step--prev").removeClass("on-enter-prev").addClass("is-current").off(), (formFunnel.stepsSlide.isSliding = !1);
                                    }, 500);
                            }),
                            this._onEnterStep(b),
                            d.update(b, "prev"),
                            formFunnel.ga.pageView(b),
                            formFunnel.hj.hjtrigger(b),
                            formFunnel.stepsSlide.historyStack.splice(-1, 1),
                            (formFunnel.stepsSlide.currentStepId = b),
                            a("body").attr("data-current-step-id", b);
                    }
                },
                goToNextStep: function (b) {
                    formFunnel.stepsSlide.isSliding = !0;
                    var c = this,
                        e = a("#" + b);
                    a("#" + formFunnel.stepsSlide.currentStepId)
                        .removeClass("is-current")
                        .addClass("on-leave-next"),
                        setTimeout(function () {
                            a("#" + formFunnel.stepsSlide.currentStepId)
                                .removeClass("on-leave-next is-visible")
                                .addClass("step--prev")
                                .off(),
                                (formFunnel.stepsSlide.isSliding = !1);
                        }, 500),
                        this._onLeaveStep(),
                        e.addClass("is-visible"),
                        setTimeout(function () {
                            e.addClass("on-enter-next"),
                                setTimeout(function () {
                                    e.addClass("no-transition").removeClass("on-enter-next").addClass("is-current").off(),
                                        setTimeout(function () {
                                            e.removeClass("no-transition");
                                        }),
                                        formFunnel.steps.hasOwnProperty(b) && formFunnel.steps[b].hasOwnProperty("update") && formFunnel.steps[b].update(),
                                        d.update(b),
                                        formFunnel.ga.pageView(b),
                                        b != formFunnel.stepsId.QUOTATIONS && formFunnel.hj.hjtrigger(b),
                                        c.historyStack.push(b),
                                        (c.currentStepId = b),
                                        e.parents("#quotation-form").length && e.find("input").first().focus(),
                                        (formFunnel.stepsSlide.isSliding = !1);
                                }, 500);
                        }),
                        this._onEnterStep(b),
                        a("body").attr("data-current-step-id", b);
                },
                getCurrentStepId: function () {
                    return this.currentStepId;
                },
            };
        })(jQuery, window, formUtils, UI),
        (function (a, b) {
            (formFunnel.init = function () {
                formFunnel._initInputValidation(), formFunnel._initInputMasks(), formFunnel.stepsSlide.init();
                for (var c in formFunnel.stepsId) {
                    formFunnel.steps[formFunnel.stepsId[c]] = {};
                    var d = a("#" + formFunnel.stepsId[c]),
                        e = d.find(".btn-next-step");
                    e.length && (formFunnel.steps[formFunnel.stepsId[c]].nextStepButton = new NextStepButton(e, d));
                }
                window.reloadUrl && this.reloadSearchFormData(window.reloadUrl),
                    window.reloadFromAz && this.loadAndDisplayResultsFromAz(window.reloadFromAz),
                    this.$form.find('[name*="dob][year]"]').each(function () {
                        "none" == a(this).data("limit") ? b.initSelectYear(this, !1, !1) : "child" == a(this).data("limit") ? b.initSelectYear(this, !1, !0) : b.initSelectYear(this, !0, !1);
                    });
                var f = { todayHighlight: !0, orientation: "auto", startDate: new Date().toLocaleDateString("fr") };
                a.extend(f, adpUtils.getDefaultDatepickerOptions());
                var g = a('*[data-role="datepicker"]');
                g
                    .datepicker(f)
                    .on("changeDate", function () {
                        a(this).valid();
                    })
                    .on("show", function () {
                        a(this).addClass("datepicker-open");
                    })
                    .on("hide", function () {
                        a(this).removeClass("datepicker-open");
                    }),
                    g.preventKeyboard(),
                    this._addEvents();
            }),
                (formFunnel._addEvents = function () {
                    a(document).on("click", ".btn-next-step", formFunnel.stepsSlide.onNextStep),
                        a(document).on("click", ".btn-prev-step", formFunnel.stepsSlide.onPrevStep),
                        a(document).on(
                            {
                                focus: function () {
                                    var b = a(this);
                                    formFunnel.inputStatus.active(b), "date" === b.data("mask") && b.attr("placeholder", "_ _ /_ _ /_ _ _ _");
                                },
                                blur: function () {
                                    var b = a(this);
                                    setTimeout(function () {
                                        "date" === b.data("mask") && b.attr("placeholder", ""), "" === b.val() && formFunnel.inputStatus.inactive(b);
                                    }, 200);
                                },
                            },
                            ".form-control--md"
                        ),
                        a('input[type="radio"]').on("click", function (c) {
                            var d = a(this);
                            d.hasClass("invalid") && b.resetValidation(d.parents(".fg--radio-block-container"));
                        });
                    var c = a(".js-display-toggle");
                    c.each(function (b, c) {
                        a(c).is(":checked") || a(a(c).data("target")).hide();
                    }),
                        c.on("change", function () {
                            a(a(this).data("target")).toggle();
                        }),
                        a(".js-single-choice").on("click", formFunnel.stepsSlide.onNextStep),
                        a(document).on("keypress", function (b) {
                            if (13 === b.keyCode) {
                                var c = a("#" + formFunnel.stepsSlide.getCurrentStepId()).find(".btn-next-step");
                                return c.length && !c.hasClass("is-disabled") && c.trigger("click"), b.preventDefault(), !1;
                            }
                        }),
                        a(".collapse").on("show.bs.collapse", function () {
                            a('button[data-target="#' + a(this).attr("id") + '"]').remove();
                        });
                }),
                (formFunnel.reloadSearchFormData = function (b) {
                    loaderMask.show(),
                        a.ajax({
                            url: b,
                            type: "GET",
                            dataType: "json",
                            success: function (a) {
                                formFunnel.onReload(), formFunnel.steps[formFunnel.stepsId.QUOTATIONS].loadAndDisplayResults(a);
                            },
                            error: function () {
                                loaderMask.hide();
                            },
                        });
                }),
                (formFunnel.loadAndDisplayResultsFromAz = function (b) {
                    console.log("loadAndDisplayResultsFromAz"),
                        (lastServiceQueryUrl = b),
                        formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.QUOTATIONS),
                        a("#s-quotations").find(".btn-prev-step").css("visibility", "hidden"),
                        a.ajax({
                            url: b,
                            type: "GET",
                            dataType: "html",
                            success: function (b) {
                                formFunnel.onReload(),
                                    formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.QUOTATIONS),
                                    UI.formBreadcrumb.update(formFunnel.stepsId.QUOTATIONS, "next"),
                                    loaderMask.hide(),
                                    a('div[data-role="display-offers-area"]').html(b),
                                    formFunnel.steps[formFunnel.stepsId.QUOTATIONS].onStepReady();
                                var c = a("#formule" + window.formuleToReload);
                                if (window.formuleToReload && c.length) {
                                    var d = c.offset();
                                    if (
                                        (window.scrollTo(0, d.top - 120),
                                        c.css("border", "1px solid #3598D4"),
                                        a("#more" + window.formuleToReload).click(),
                                        window.setTimeout(function () {
                                            var a = c.offset();
                                            window.scrollTo(0, a.top - 120);
                                        }, 300),
                                        !0 === forceNeedsPopin)
                                    ) {
                                        var e = a("#" + formFunnel.stepsId.QUOTATIONS)
                                            .find(".line.is-open")
                                            .first();
                                        parseInt(e.data("hospilevel")) > 0 && parseInt(e.data("soinslevel")) > 0 && parseInt(e.data("dentairelevel")) > 0 && parseInt(e.data("optiquelevel")) > 0
                                            ? (a("#complete-guarantee-hospi").prop("checked", !1), a("#complete-guarantee-all").prop("checked", !0))
                                            : (a("#complete-guarantee-all").prop("checked", !1), a("#complete-guarantee-hospi").prop("checked", !0)),
                                            ($resultRefundLevel = a("#modalNeedsForce").find(".complete-js-refund-level")),
                                            $resultRefundLevel.each(function (b, c) {
                                                var d = a(c),
                                                    e = null,
                                                    f = d.find('input.fakeHiddenInput,input[type="hidden"]'),
                                                    g = "";
                                                d.on("click", ".js-refund-level__item", function (b) {
                                                    var c = a(b.currentTarget);
                                                    c.parents(".refund-level").removeClass("error"),
                                                        c.parents(".refund-level__values").find(".is-selected").removeClass("is-selected"),
                                                        c.addClass("is-selected"),
                                                        (e = c),
                                                        (g = c.data("val")),
                                                        f.val(g);
                                                });
                                            }),
                                            a("#modalNeedsForce").modal({ backdrop: "static", keyboard: !1 }),
                                            a("#complete-refund-submit").on("click", function (b) {
                                                if ((b.preventDefault(), 1 == a("#complete-guarantee-hospi").prop("checked"))) {
                                                    if (0 == a("#complete-refund-level-hospi").val()) return alert("Vous devez renseigner vos besoins"), !1;
                                                    var c =
                                                        "&tx_adp_webservice_remote%5Blevel_type%5D=hospi&tx_adp_webservice_remote%5BajaxUpdateContact%5D=" +
                                                        forceNeedsContact +
                                                        "&tx_adp_webservice_remote%5Bhospi_level%5D=" +
                                                        a("#complete-refund-level-hospi").val() +
                                                        "&tx_adp_webservice_remote%5Bsoins_level%5D=0&tx_adp_webservice_remote%5Bdentaire_level%5D=0&tx_adp_webservice_remote%5Boptique_level%5D=0";
                                                } else {
                                                    if (
                                                        0 == a("#complete-refund-level-hospi").val() ||
                                                        0 == a("#complete-refund-level-soins").val() ||
                                                        0 == a("#complete-refund-level-dentaire").val() ||
                                                        0 == a("#complete-refund-level-optique").val()
                                                    )
                                                        return alert("Vous devez renseigner vos besoins"), !1;
                                                    var c =
                                                        "&tx_adp_webservice_remote%5Blevel_type%5D=all&tx_adp_webservice_remote%5BajaxUpdateContact%5D=" +
                                                        forceNeedsContact +
                                                        "&tx_adp_webservice_remote%5Bhospi_level%5D=" +
                                                        a("#complete-refund-level-hospi").val() +
                                                        "&tx_adp_webservice_remote%5Bsoins_level%5D=" +
                                                        a("#complete-refund-level-soins").val() +
                                                        "&tx_adp_webservice_remote%5Bdentaire_level%5D=" +
                                                        a("#complete-refund-level-dentaire").val() +
                                                        "&tx_adp_webservice_remote%5Boptique_level%5D=" +
                                                        a("#complete-refund-level-optique").val();
                                                }
                                                a.ajax({
                                                    url: "/comparateur-de-mutuelles.html?type=133" + c,
                                                    type: "GET",
                                                    dataType: "json",
                                                    success: function (b) {
                                                        0 == b.error ? a("#modalNeedsForce").modal("hide") : alert("Erreur pendant le process, actualisez la page");
                                                    },
                                                    error: function () {
                                                        loaderMask.hide();
                                                    },
                                                });
                                            });
                                    }
                                }
                            },
                            error: function () {
                                loaderMask.hide();
                            },
                        });
                }),
                (formFunnel.onReload = function () {
                    UI.formBreadcrumb.init(),
                        formFunnel.steps[formFunnel.stepsId.START].updateStepsFamily(a(".js-type-choice:checked").val()),
                        formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.USER_INFORMATION_GENDER),
                        formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.USER_INFORMATION_REGIME),
                        formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.USER_INFORMATION_POSTAL_CODE),
                        formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.USER_INFORMATION_CONTRACT_START_DATE),
                        formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.USER_INFORMATION_NAME),
                        (!0 !== a("#type2").prop("checked") && !0 !== a("#type4").prop("checked")) ||
                            (formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.PARTNER_INFORMATION_GENDER),
                            formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.PARTNER_INFORMATION_REGIME),
                            UI.formBreadcrumb.update(formFunnel.stepsId.PARTNER_INFORMATION_GENDER, "next")),
                        (!0 !== a("#type3").prop("checked") && !0 !== a("#type4").prop("checked")) ||
                            (formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.CHILDREN_INFORMATION), UI.formBreadcrumb.update(formFunnel.stepsId.CHILDREN_INFORMATION, "next")),
                        formFunnel.stepsSlide.historyStackAdd(formFunnel.stepsId.NEEDS),
                        UI.formBreadcrumb.update(formFunnel.stepsId.NEEDS, "next"),
                        a.each(formFunnel.stepsSlide.historyStack, function (b, c) {
                            a("#" + c).addClass("step--prev");
                        });
                }),
                (formFunnel._initInputValidation = function () {
                    formFunnel.$form.validate({
                        validClass: "valid",
                        errorElement: "div",
                        errorClass: "invalid",
                        errorPlacement: function (b, c) {
                            a(c).parent().append(b);
                        },
                        invalidHandler: function (a, b) {
                            b.numberOfInvalids();
                        },
                        submitHandler: function () {
                            console.log("submit");
                        },
                    }),
                        formFunnel.$form.find('input[name="tx_adp_webservice_remote[cp]"]').rules("add", { required: !0, adpregex: /^[0-9]{5}$/, messages: { required: "Code postal invalide" } }),
                        a("#sous-dob").rules("add", { required: !0, adpdate: !0, messages: { required: "Format invalide" } });
                }),
                (formFunnel._initInputMasks = function () {
                    a('input[data-mask="date"]').each(function () {
                        new Cleave(a(this)[0], { date: !0, datePattern: ["d", "m", "Y"] });
                    }),
                        a('input[data-mask="phone"]').each(function () {
                            new Cleave('input[data-mask="phone"]', {
                                phone: !0,
                                phoneRegionCode: "FR",
                                onValueChanged: function (b) {
                                    a(this.element)
                                        .val()
                                        .match(/^\+?33/) &&
                                        a(this.element).val(
                                            a(this.element)
                                                .val()
                                                .replace(/^\+?33/, "0")
                                        );
                                },
                            });
                        }),
                        a('input[data-mask="iban"]').each(function () {
                            new Cleave('input[data-mask="iban"]', { uppercase: !0, blocks: [4, 4, 4, 4, 4, 4, 3] });
                        }),
                        a("#launchRecall").on("click", function (b) {
                            b.preventDefault(), a(this).hide(), a("#recall-container").css("display", "inline-block");
                        }),
                        a('input[data-mask="bic"]').each(function () {
                            new Cleave('input[data-mask="bic"]', { uppercase: !0 });
                        });
                }),
                formFunnel.init();
        })(jQuery, formUtils),
        (function (a) {
            formFunnel.inputStatus = {
                active: function (a) {
                    a.parent().find("label").addClass("is-active");
                },
                inactive: function (a) {
                    a.parent().find("label").removeClass("is-active");
                },
            };
        })(jQuery),
        (function (a, b) {
            a(document).on("change", ".js-toggle-ss-child", function (b) {
                var c = a(this),
                    d = c.data("target");
                a(d).length && (a(c.data("target") + "-ssnum").rules("remove"), a(c.data("target") + "-ssnum-key").rules("remove"), a(d).remove());
                var e = c.find("option:selected").data("template");
                if (e && "" != e) {
                    var f = e;
                    c.parents(".form-group").first().after(f),
                        a(c.data("target") + "-ssnum").rules("add", { required: !0, adpregex: /^\d{1}[ ]?\d{2}[ ]?\d{2}[ ]?(\d{2}|2a|2b)[ ]?\d{3}[ ]?\d{3}[ ]?$/i, messages: { required: "N° invalide" } }),
                        a(c.data("target") + "-ssnum-key").rules("add", { required: !0, adpregex: /^\d{2}$/, adpsschecksum: !0, messages: { required: "Clé invalide" } });
                }
            });
        })(jQuery);
}
!(function (a) {
    a(".header--funnel").length &&
        a("#modalDetailsGarantie").on("show.bs.modal", function (b) {
            var c = a(b.relatedTarget),
                d = c.data("href");
            a(this).find(".modal-body iframe").attr("src", d);
        });
})(jQuery),
    (function (a) {
        a("#recallForm").length &&
            (a("#modalRecall").on("show.bs.modal", function (b) {
                a("#recallForm").data("formule", a(b.relatedTarget).data("formule"));
            }),
            a("#recallForm").on("submit", function (b) {
                b.preventDefault();
                var c = "",
                    d = "",
                    e = a("#recall-container"),
                    f = a("#" + formFunnel.stepsId.USER_INFORMATION_NAME),
                    g = a("#" + formFunnel.stepsId.SUBSCRIPTION),
                    h = a("#" + formFunnel.stepsId.OPTIONS);
                f.length &&
                    f.find('input[name="tx_adp_webservice_remote[nom]"]').length &&
                    "" != f.find('input[name="tx_adp_webservice_remote[nom]"]').first().val() &&
                    (d = f.find('input[name="tx_adp_webservice_remote[nom]"]').first().val() + " " + f.find('input[name="tx_adp_webservice_remote[prenom]"]').first().val()),
                    g.length && g.find("div.formule").length
                        ? (c = g.find("div.formule").first().data("formulename"))
                        : h.length && h.find("div.logo-container div.formule").length && (c = h.find("div.logo-container div.formule").first().data("formulename")),
                    a("#recallForm").data("formule") && (c = a("#recallForm").data("formule")),
                    a.ajax({
                        url: a(this).attr("action"),
                        type: a(this).attr("method"),
                        data: a(this).serialize() + "&formule=" + c + "&name=" + d,
                        dataType: "json",
                        success: function (a) {
                            if (a.success) {
                                (new Image(1, 1).src = "//www.googleadservices.com/pagead/conversion/1043876378/?label=XpVBCMWy3VoQmpTh8QM&guid=ON&script=0"),
                                    window.ga && ga.loaded && ga("send", "pageview", "/devis-mutuelle/rappel_ok"),
                                    e.html(a.msg);
                            } else e.html(a.msg);
                        },
                    });
            }));
    })(jQuery),
    (function (a) {
        a(".back-to-top").on("click", function (b) {
            b.preventDefault(), a("body, html").animate({ scrollTop: 0 }, 500);
        });
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            (jQuery.extend(jQuery.validator.messages, { required: "Merci de remplir ce champ" }),
            jQuery.validator.addMethod(
                "adplevel",
                function (a, b) {
                    return !(parseInt(a) < 1) || (console.log("elementerror", b), !1);
                },
                "Veuillez renseigner le besoin"
            ),
            jQuery.validator.addMethod(
                "adpzipcode",
                function (a, b) {
                    return !(parseInt(a) < 1e3);
                },
                "Code postal invalide"
            ),
            jQuery.validator.addMethod(
                "adpdate",
                function (a, b) {
                    return !(new Date().getFullYear() - 100 > a.substr(a.lastIndexOf("/") + 1, 4));
                },
                "Format invalide"
            ),
            jQuery.validator.addMethod(
                "adpregexmobile",
                function (a, b, c) {
                    return c.constructor != RegExp ? (c = new RegExp(c)) : c.global && (c.lastIndex = 0), this.optional(b) || c.test(a.replace(/[^0-9]/gi, ""));
                },
                "Merci d'indiquer un n° de mobile"
            ),
            jQuery.validator.addMethod(
                "adpregex",
                function (a, b, c) {
                    return c.constructor != RegExp ? (c = new RegExp(c)) : c.global && (c.lastIndex = 0), this.optional(b) || c.test(a);
                },
                "Format invalide"
            ),
            jQuery.validator.addMethod(
                "adpsschecksum",
                function (b, c, d) {
                    $numberToValidate = a(c).parents(".form-group-linked").find('input[data-role="keychecksum"]').first();
                    var e = $numberToValidate.val().toLowerCase();
                    e = e.replace(/ /g, "").replace("2a", "19").replace("2b", "18").replace("2A", "19").replace("2B", "18");
                    var f = 97 - (parseInt(e) % 97);
                    return parseInt(b) === f;
                },
                "Clé invalide"
            ),
            jQuery.validator.addMethod(
                "iban",
                function (a, b) {
                    if (this.optional(b)) return !0;
                    if (0 !== a.indexOf("FR") && 0 !== a.indexOf("MC")) return !1;
                    if (!/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(a)) return !1;
                    var c = a.replace(/ /g, "").toUpperCase(),
                        d = c.substring(0, 2),
                        e = { FR: "\\d{10}[\\dA-Z]{11}\\d{2}", MC: "\\d{10}[\\dA-Z]{11}\\d{2}" },
                        f = e[d];
                    if (void 0 !== f) {
                        if (!new RegExp("^[A-Z]{2}\\d{2}" + f + "$", "").test(c)) return !1;
                    }
                    for (var g, h = c.substring(4, c.length) + c.substring(0, 4), i = "", j = !0, k = 0; k < h.length; k++) (g = h.charAt(k)), "0" !== g && (j = !1), j || (i += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(g));
                    for (var l = "", m = "", n = 0; n < i.length; n++) {
                        (m = "" + l + i.charAt(n)), (l = m % 97);
                    }
                    return 1 === l;
                },
                "IBAN invalide"
            ));
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            ((UI.formBreadcrumb = {
                $elt: a(".step-breadcrumb__inner"),
                breadcrumbItems: [],
                totalSteps: 0,
                $title: null,
                init: function () {
                    var b = this;
                    this.$elt.html(""), (this.breadcrumbItems = []);
                    for (var c = {}, d = 1; d < formFunnel.$steps.length; d++)
                        if (!a(formFunnel.$steps[d]).hasClass("is-disabled")) {
                            var e = {},
                                f = a(formFunnel.$steps[d]).attr("id").indexOf("_") > -1 ? a(formFunnel.$steps[d]).attr("id").indexOf("_") : a(formFunnel.$steps[d]).attr("id").length;
                            a(formFunnel.$steps[d]).data("nav-label")
                                ? ((c = {}),
                                  (c.groupId = a(formFunnel.$steps[d]).attr("id").slice(0, f)),
                                  (c.label = a(formFunnel.$steps[d]).data("nav-label")),
                                  (c.children = []),
                                  (c.percentDone = 0),
                                  (e.id = a(formFunnel.$steps[d]).attr("id")),
                                  c.children.push(e),
                                  this.breadcrumbItems.push(c))
                                : ((e.id = a(formFunnel.$steps[d]).attr("id")), c.children.push(e)),
                                this.totalSteps++;
                        }
                    this.breadcrumbItems.forEach(function (a, c) {
                        var d = (a.children.length / b.totalSteps) * 100,
                            a =
                                '<div class="step-breadcrumb__item" style="width: ' +
                                d +
                                '%;" data-section-group-id="' +
                                a.groupId +
                                '"><div class="step-breadcrumb__item__inner"><span>' +
                                a.label +
                                '</span><div class="step-breadcrumb__marker"></div></div></div>';
                        b.$elt.append(a);
                    }),
                        a("#step-breadcrumb__title").length || (b.$elt.parent().append('<div id="step-breadcrumb__title"></div>'), (b.$title = a("#step-breadcrumb__title"))),
                        this.show();
                },
                show: function () {
                    this.$elt.addClass("is-visible");
                },
                hide: function () {
                    this.$elt.removeClass("is-visible");
                },
                update: function (b, c) {
                    for (var d = this.$elt.find(".step-breadcrumb__item"), e = b.indexOf("_") > -1 ? b.indexOf("_") : b.length, f = b.slice(0, e), g = 0; g < d.length; g++)
                        a(d[g]).attr("data-section-group-id") === f &&
                            ("prev" !== c
                                ? (g > 0 &&
                                      (a(d[g - 1])
                                          .removeClass("is-current")
                                          .addClass("is-valid"),
                                      this._setSectionMarkerPercent(a(d[g - 1]).find(".step-breadcrumb__marker"), 100)),
                                  a(d[g]).addClass("is-current"),
                                  this._setSectionMarkerPercent(a(d[g]).find(".step-breadcrumb__marker"), this._getSectionPercent(f, b)))
                                : (g < d.length - 1 && a(d[g + 1]).removeClass("is-current"),
                                  a(d[g]).removeClass("is-valid").addClass("is-current"),
                                  this._setSectionMarkerPercent(a(d[g]).find(".step-breadcrumb__marker"), this._getSectionPercent(f, b))));
                    this.$elt.find(".step-breadcrumb__item.is-current").find("span").text() && this.$title.text(this.$elt.find(".step-breadcrumb__item.is-current").find("span").text());
                },
                _getSectionPercent: function (a, b) {
                    for (var c = 0; c < this.breadcrumbItems.length; c++)
                        if (this.breadcrumbItems[c].groupId === a)
                            for (var d = this.breadcrumbItems[c].children.length, e = 0; e < d; e++)
                                if (this.breadcrumbItems[c].children[e].id === b) return (this.breadcrumbItems[c].children.indexOf(this.breadcrumbItems[c].children[e]) / d) * 100;
                },
                _setSectionMarkerPercent: function (a, b) {
                    a.css("width", b + "%");
                },
            }),
            (UI.update = function (a, b) {
                UI.formBreadcrumb.update(a, b), a === formFunnel.stepsId.START ? UI.formBreadcrumb.hide() : UI.formBreadcrumb.show(), this._gotoStepTop(a);
            }),
            (UI._gotoStepTop = function (b) {
                var c = window.matchMedia("(max-width: 767px)").matches,
                    d = void 0 !== b ? a("#" + b) : a(".step-container").find(".is-current");
                b &&
                    d.on("transitionend.gotoStepTop", function (b) {
                        if (a(b.target).hasClass("step")) {
                            d.off("transitionend.gotoStepTop");
                            var e = c ? UI.formBreadcrumb.$elt.offset().top : 0;
                            a("html, body").animate({ scrollTop: e }, 200);
                        }
                    });
            }));
    })(jQuery),
    (function (a, b) {
        a(".funnel-page").length &&
            ((formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].$step = a("#" + formFunnel.stepsId.CHILDREN_INFORMATION)),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].$childrenBlock = a("#children-block")),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].nbCurrentField = 0),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].nbWantedField = 0),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].$ctn = null),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].init = function () {
                (this.nbCurrentField = this.$childrenBlock.find(".child-date").length), (this.$ctn = this.$childrenBlock.find("#children-container")), this._addEvents();
            }),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION]._addEvents = function () {
                var b = this;
                a(".js-nb-enfants").on("change", function () {
                    (b.nbWantedField = parseInt(a(this).val())), b.nbWantedField - b.nbCurrentField > 0 ? b._addDates() : b._removeDates(), b._updateRules(), (b.nbCurrentField = b.nbWantedField);
                });
            }),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION]._addDates = function () {
                if (this.$childrenBlock.data("template"))
                    for (var a = this.nbCurrentField + 1; a <= this.nbWantedField; a++) {
                        var c = this.$childrenBlock.data("template").replace(/%num%/g, a);
                        this.$ctn.append(c), b.initSelectYear(this.$ctn.find('[name*="[enfant' + a + '_dob][year]"]'), !1, !0);
                    }
                this.$ctn.hasClass("is-visible") || this.$ctn.addClass("is-visible");
            }),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION]._removeDates = function () {
                var b = this;
                this.$ctn.find(".child-date").each(function (c, d) {
                    c >= b.nbWantedField && a(d).remove();
                });
            }),
            (formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION]._updateRules = function () {
                var a = this.$step.find(".btn-next-step");
                a.length && (this.$nextStepButton = new NextStepButton(a, this.$step));
            }),
            formFunnel.steps[formFunnel.stepsId.CHILDREN_INFORMATION].init());
    })(jQuery, formUtils),
    (function (a) {
        a(".funnel-page").length &&
            ((formFunnel.steps[formFunnel.stepsId.NEEDS].$step = a("#" + formFunnel.stepsId.NEEDS)),
            (formFunnel.steps[formFunnel.stepsId.NEEDS].refundLevels = null),
            (formFunnel.steps[formFunnel.stepsId.NEEDS].init = function () {
                var b = this,
                    c = this.$step.find(".js-refund-levels"),
                    d = a(".complete-js-refund-level"),
                    e = jsonRefundLevel;
                b.refundLevels = new RefundLevels(c, e);
                for (var f = 0; f < d.length; f++) for (var g = a(d[f]).find(".val"), h = a(d[f]).attr("data-name"), i = 0; i < g.length; i++) a(g[i]).html(e[h][i]);
            }),
            (formFunnel.steps[formFunnel.stepsId.NEEDS].update = function () {
                this.refundLevels.updateValidationRules();
            }),
            formFunnel.steps[formFunnel.stepsId.NEEDS].init());
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            ((formFunnel.steps[formFunnel.stepsId.OPTIONS].$stepOptions = null),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].$finalPrice = null),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].$stepFooter = null),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].$stepFooterInner = null),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].footerIsFixed = !1),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].isStepReady = !1),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS]._onStepReady = function () {
                (this.$stepOptions = a("#" + formFunnel.stepsId.OPTIONS)),
                    (this.$finalPrice = a('#total-offre span[data-role="final-price"]')),
                    (this.$stepFooter = this.$stepOptions.find("#s-options-footer")),
                    (this.$stepFooterInner = this.$stepFooter.find("#s-options-footer__inner")),
                    (this.isStepReady = !0),
                    this._addEvents();
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS]._addEvents = function () {
                var b = this,
                    c = 0;
                this.$stepOptions.on("click", ".info .title", function (b) {
                    b.preventDefault(), a(this).parents(".info").find(".row.info__details").toggle();
                }),
                    this.$stepOptions.on("change", 'input[type="checkbox"]', function (d) {
                        (c = a(this).prop("checked") ? parseFloat(b.$finalPrice.data("final-price") + parseFloat(a(this).data("delta"))) : parseFloat(b.$finalPrice.data("final-price") - parseFloat(a(this).data("delta")))),
                            (c = Math.round(100 * c) / 100),
                            b.$finalPrice.find("b").html(c.toString().replace(".", ",")),
                            b.$finalPrice.data("final-price", c);
                    }),
                    this.$stepOptions.on("change", 'input[type="radio"]', function (d) {
                        (c = parseFloat(a("#basePrice").data("price") + parseFloat(a(this).data("delta")))),
                            (c = Math.round(100 * c) / 100),
                            s,
                            b.$finalPrice.find("b").html(c.toString().replace(".", ",")),
                            b.$finalPrice.data("final-price", c);
                    }),
                    this.$stepOptions.find("form").length > 0
                        ? this.$stepOptions.find("form").on("submit", function (a) {
                              a.preventDefault(),
                                  setTimeout(function () {
                                      formFunnel.steps[formFunnel.stepsId.OPTIONS]._submitOptionsFormData();
                                  });
                          })
                        : this.$stepOptions.find("a.btn-directlink").on("click", function (b) {
                              b.preventDefault();
                              var c = this;
                              formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.SUBSCRIPTION),
                                  setTimeout(function () {
                                      formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].loadSubscriptionProcess(a(c).attr("href"));
                                  }, 500);
                          }),
                    a(document).on("scroll.options", this._onScroll.bind(this)),
                    this._onScroll();
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS]._onScroll = function () {
                a(window).scrollTop() + a(window).innerHeight() > this.$stepFooter.offset().top
                    ? this.footerIsFixed && (this.$stepFooterInner.removeClass("is-fixed"), this.$stepFooterInner.appendTo(this.$stepFooter), (this.footerIsFixed = !1))
                    : this.footerIsFixed || (this.$stepFooterInner.addClass("is-fixed"), this.$stepFooterInner.appendTo("body"), (this.footerIsFixed = !0));
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].onEnter = function () {
                console.log("enter options"), !0 === this.isStepReady && (a(document).on("scroll.options", this._onScroll.bind(this)), this._onScroll());
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].onLeave = function () {
                console.log("leave options"),
                    a(document).off("scroll.options"),
                    this.footerIsFixed && (console.log("footer is fixed"), this.$stepFooterInner.removeClass("is-fixed"), this.$stepFooterInner.appendTo(this.$stepFooter), (this.footerIsFixed = !1));
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS]._submitOptionsFormData = function () {
                var b = a("#options-form").serialize();
                a.ajax({
                    url: a("#options-form").attr("action") + "type=133&compose[submit]=1",
                    type: a("#options-form").attr("method"),
                    data: b,
                    dataType: "json",
                    success: function (a) {
                        0 == a.error
                            ? (formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.SUBSCRIPTION),
                              setTimeout(function () {
                                  formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].loadSubscriptionProcess(a.url);
                              }, 500))
                            : alert("Erreur pendant le process");
                    },
                    error: function () {
                        loaderMask.hide();
                    },
                });
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].loadOptionsProcess = function (b) {
                if (((this.isStepReady = !1), window.devMode)) a('div[data-role="display-options-process"]').html(jsonRecapSelectedOffer.html), this._onStepReady();
                else {
                    var c = this;
                    a.ajax({
                        url: b,
                        type: "GET",
                        dataType: "json",
                        success: function (b) {
                            (window.subscriptionUrl = !1), a('div[data-role="display-options-process"]').html(b.html), c._onStepReady();
                        },
                        error: function () {},
                    });
                }
            }),
            (formFunnel.steps[formFunnel.stepsId.OPTIONS].update = function () {
                a("#" + formFunnel.stepsId.QUOTATIONS)
                    .find("h2 span")
                    .html(formUtils.getPersonnalizedTitle());
            }));
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            ((formFunnel.steps[formFunnel.stepsId.QUOTATIONS].$step = a("#" + formFunnel.stepsId.QUOTATIONS)),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS]._submitSearchFormData = function () {
                var b = "",
                    c = this,
                    d = new Array();
                formFunnel.$form.find(".step:not(.is-disabled)").each(function () {
                    d.push(a(this).find("input,select").serialize());
                }),
                    (b = d.join("&")),
                    (b += "&" + a.param({ type: 133 })),
                    (lastServiceQueryUrl = !1),
                    formFunnel.steps[formFunnel.stepsId.QUOTATIONS].clearResults(),
                    loaderMask.show(),
                    window.devMode
                        ? this.loadAndDisplayResults(jsonDataUrl)
                        : a.ajax({
                              url: formFunnel.$form.attr("action"),
                              type: formFunnel.$form.attr("method"),
                              data: b,
                              dataType: "html",
                              success: function (a) {
                                  c.loadAndDisplayResults(a);
                              },
                              error: function () {
                                  loaderMask.hide();
                              },
                          });
            }),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS]._onLoadDataListOffersSuccess = function (b) {
                loaderMask.hide(),
                    a('div[data-role="display-offers-area"]').html(b),
                    this.onStepReady(),
                    window.subscriptionUrl &&
                        (a("#" + formFunnel.stepsId.QUOTATIONS).addClass("step--prev"),
                        formFunnel.steps[formFunnel.stepsId.OPTIONS].loadOptionsProcess(window.subscriptionUrl),
                        formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.OPTIONS)),
                    formFunnel.hj.hjtrigger(formFunnel.stepsId.QUOTATIONS);
            }),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS].loadAndDisplayResults = function (b) {
                a("#s-quotations").find(".btn-prev-step").css("visibility", "hidden"), console.log("loadAndDisplayResults");
                var c,
                    d = this;
                if (lastServiceQueryUrl) c = void 0 === b.url ? b : b.url;
                else {
                    if (void 0 === b.url) {
                        c = jQuery.parseJSON(b).url;
                    } else c = b.url;
                    (lastServiceQueryUrl = c), void 0 === b.formule ? (window.formuleAsked = !1) : (window.formuleAsked = b.formule);
                }
                (window.reloadUrl || window.reloadFromAz) && (formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.QUOTATIONS), UI.formBreadcrumb.update(formFunnel.stepsId.QUOTATIONS, "next")),
                    window.devMode
                        ? setTimeout(function () {
                              d._onLoadDataListOffersSuccess(offerListData);
                          }, 1e3)
                        : a.ajax({
                              url: c,
                              type: "GET",
                              dataType: "html",
                              success: function (a) {
                                  d._onLoadDataListOffersSuccess(a);
                              },
                              error: function () {
                                  loaderMask.hide();
                              },
                          });
            }),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS].onStepReady = function () {
                var b = this,
                    c = jsonRefundLevel,
                    d = a("#filter-form"),
                    e = a('button[data-target="#filters-collapse"]');
                if (
                    (($cancelFiltersBtn = a(".js-cancel-filters")),
                    ($submitFiltersBtn = a(".js-submit-filters")),
                    (refundLevels = new RefundLevels(this.$step.find(".js-refund-levels"), c)),
                    d.validate(),
                    a("#s-quotations").find(".btn-prev-step").css("visibility", "visible"),
                    ($formule = a("#formule" + window.formuleAsked)),
                    window.formuleAsked && $formule.length)
                ) {
                    $formule.offset();
                    $formule.css("border", "1px solid #3598D4"),
                        $formule.addClass("is-open"),
                        a("#more" + window.formuleAsked).click(),
                        window.setTimeout(function () {
                            var a = $formule.offset();
                            window.scrollTo(0, a.top - 120);
                        }, 300);
                }
                $cancelFiltersBtn.on("click", function () {
                    e.trigger("click"), refundLevels.setPrevValues();
                }),
                    $submitFiltersBtn.on("click", function (a) {
                        a.preventDefault(),
                            refundLevels.saveValues(),
                            window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape3", "filtrer"),
                            b.loadAndDisplayResults(lastServiceQueryUrl + "&" + d.serialize()),
                            b.clearResults(),
                            loaderMask.show();
                    }),
                    this.offers.init();
            }),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS].clearResults = function () {
                a('div[data-role="display-offers-area"]').html("");
            }),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS].update = function () {
                !1 === window.reloadUrl && !1 === window.reloadFromAz ? (this._submitSearchFormData(), console.log("formFunnel.steps[formFunnel.stepsId.QUOTATIONS].update")) : ((window.reloadUrl = !1), (window.reloadFromAz = !1));
            }),
            (formFunnel.steps[formFunnel.stepsId.QUOTATIONS].offers = {
                init: function () {
                    var b = a(".line");
                    b.off(),
                        a('div[data-action="detail"]').on("click", function (b) {
                            var c = a(this).data("action-label");
                            window.ga && ga.loaded && ga("send", "pageview", "/devis-mutuelle/etape3_detail_garantie_" + c);
                        }),
                        b.on("click", ".btn-toggle-details", function (b) {
                            b.preventDefault(), a(this).toggleClass("is-active"), a(this).parents(".line").toggleClass("is-open");
                            var c = a(this).data("action-label");
                            window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape3", "plus_d-infos_" + c);
                        }),
                        b.on("click", "a.btn_cg", function (b) {
                            window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape3", a(this).data("action-label"));
                        }),
                        b.on("click", ".btn-subscribe", function (b) {
                            var c = a(this);
                            b.preventDefault(), formFunnel.steps[formFunnel.stepsId.OPTIONS].loadOptionsProcess(c.attr("href")), formFunnel.stepsSlide.goToNextStep(formFunnel.stepsId.OPTIONS);
                            var d = c.data("action-label");
                            window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape3", "souscrire_" + d);
                        });
                },
            }));
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            ((formFunnel.steps[formFunnel.stepsId.START].init = function () {
                this._addEvents(),
                    a("select[data-preselect]").each(function () {
                        a(this)
                            .find('option[value="' + a(this).data("preselect") + '"]')
                            .prop("selected", "true"),
                            a(this).parents(".step__content").find("button.btn-next-step").removeClass("is-disabled");
                    });
            }),
            (formFunnel.steps[formFunnel.stepsId.START]._addEvents = function () {
                var b = this;
                a(".js-type-choice").on("click", function () {
                    b.updateStepsFamily(a(".js-type-choice:checked").val()), UI.formBreadcrumb.init(), formFunnel.stepsSlide.onNextStep();
                });
            }),
            (formFunnel.steps[formFunnel.stepsId.START].updateStepsFamily = function (b) {
                switch (
                    (formUtils.removeDatesRules("conjoint_dob"),
                    a("#children-container input.input-date").rules("remove"),
                    a('[id*="' + formFunnel.stepsId.PARTNER_INFORMATION + '"]').addClass("is-disabled"),
                    a("#" + formFunnel.stepsId.CHILDREN_INFORMATION).addClass("is-disabled"),
                    b)
                ) {
                    case "type1":
                        window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape1", "vous");
                        break;
                    case "type2":
                        formFunnel.stepsSlide.setFamilyStepVisibility("partner"), window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape1", "vous_et_votre_conjoint");
                        break;
                    case "type3":
                        formFunnel.stepsSlide.setFamilyStepVisibility("children"), window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape1", "vous_et_vos_enfants");
                        break;
                    case "type4":
                        formFunnel.stepsSlide.setFamilyStepVisibility("partner"),
                            formFunnel.stepsSlide.setFamilyStepVisibility("children"),
                            window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape1", "vous_votre_conjoint-et-vos-enfants");
                }
            }),
            formFunnel.steps[formFunnel.stepsId.START].init());
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            ((formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$subscriptionForm = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$refundRib = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$refundIban = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$refundBic = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$refundRibEtab = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$btnSubmitForm = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$cgvValidateCheckbox = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].cgvValidateCheckboxCheckedCount = 0),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$stepFooter = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].$stepFooterInner = null),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].footerIsFixed = !1),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].isStepReady = !1),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onStepReady = function () {
                var b = this;
                (b.$subscriptionForm = a("#subscription-form")),
                    (b.$refundRib = a("#refund_rib")),
                    (b.$refundIban = a("#refund_iban")),
                    (b.$refundBic = a("#refund_bic")),
                    (b.$refundRibEtab = a("#refund_rib_etab")),
                    (b.$btnSubmitForm = a("#form-quotation-submit")),
                    (b.$cgvValidateCheckbox = b.$subscriptionForm.find('.cgv-validate input[type="checkbox"]')),
                    (b.$stepFooter = a("#s-subscription-footer")),
                    (b.$stepFooterInner = a("#s-subscription-footer__inner")),
                    (b.isStepReady = !0),
                    b.$subscriptionForm.validate({
                        validClass: "valid",
                        errorElement: "div",
                        errorClass: "invalid",
                        rules: {},
                        errorPlacement: function (b, c) {
                            a(c).parent().append(b);
                        },
                        invalidHandler: function (a, b) {
                            window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape5", "souscrire_la_garantie_ko");
                        },
                        submitHandler: function (c, d) {
                            var e = b.$subscriptionForm.serialize();
                            return (
                                (e += "&" + a.param({ type: 133 })),
                                a("#form-quotation-submit").hide(),
                                a("#final-loader").show(),
                                a.ajax({
                                    url: b.$subscriptionForm.attr("action"),
                                    type: "POST",
                                    data: e,
                                    dataType: "json",
                                    success: function (a) {
                                        return (
                                            0 === a.error && "https" == a.html.substring(0, 5)
                                                ? (window.ga && ga.loaded && ga("send", "event", "tunnel_souscription", "clic_etape5", "souscrire_la_garantie_ok"), (document.location = a.html))
                                                : alert("Erreur pendant l'enregistrement. Merci de réessayer."),
                                            !1
                                        );
                                    },
                                    error: function () {
                                        return loaderMask.hide(), !1;
                                    },
                                }),
                                !1
                            );
                        },
                    });
                var c = { todayHighlight: !0, startDate: new Date().toLocaleDateString("fr") };
                a.extend(c, adpUtils.getDefaultDatepickerOptions());
                var d = b.$subscriptionForm.find('*[data-role="datepicker"]');
                d
                    .datepicker(c)
                    .on("changeDate", function () {
                        a(this).valid();
                    })
                    .on("show", function () {
                        a(this).addClass("datepicker-open");
                    })
                    .on("hide", function () {
                        a(this).removeClass("datepicker-open");
                    }),
                    d.preventKeyboard(),
                    b.$btnSubmitForm.addClass("is-disabled"),
                    this.$subscriptionForm.find(".js-souscription-form-part").first().addClass("is-displayed is-visible"),
                    this._addvents(),
                    this._addRules(),
                    this._addMasks();
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._addRules = function () {
                a("#mainphone").rules("add", { required: !0, adpregexmobile: /^0([6-7]{1})([0-9]{8})$/, messages: { required: "Merci d'indiquer un n° de mobile" } }),
                    a("#iban").rules("add", { required: !0, iban: !0, messages: { required: "Format Iban invalide" } }),
                    a("#bic").rules("add", { required: !0, adpregex: /^[0-9a-zA-Z]{8,11}$/, messages: { required: "Bic invalide" } }),
                    a('div[data-check="conjoint-monaco"]').length && a("#conjoint-matricule").rules("add", { required: !0, adpregex: /^\d{6}$/i, messages: { required: "Matricule invalide" } }),
                    a('div[data-check="conjoint-france"]').length &&
                        (a("#conjoint-ssnum").rules("add", { required: !0, adpregex: /^\d{1}[ ]?\d{2}[ ]?\d{2}[ ]?(\d{2}|2a|2b)[ ]?\d{3}[ ]?\d{3}[ ]?$/i, messages: { required: "N° invalide" } }),
                        a("#conjoint-ssnum-key").rules("add", { required: !0, adpregex: /^\d{2}$/, adpsschecksum: !0, messages: { required: "Clé invalide" } })),
                    a('div[data-check="titulaire-monaco"]').length && a("#matricule").rules("add", { required: !0, adpregex: /^\d{6}$/i, messages: { required: "Matricule invalide" } }),
                    a('div[data-check="titulaire-france"]').length &&
                        (a("#ssnum").rules("add", { required: !0, adpregex: /^\d{1}[ ]?\d{2}[ ]?\d{2}[ ]?(\d{2}|2a|2b)[ ]?\d{3}[ ]?\d{3}[ ]?$/i, messages: { required: "N° invalide" } }),
                        a("#ssnum-key").rules("add", { required: !0, adpregex: /^\d{2}$/, adpsschecksum: !0, messages: { required: "Clé invalide" } })),
                    "block" === this.$refundRib.css("display") &&
                        (this.$refundIban.rules("add", {
                            required: !0,
                            adpregex: /^[0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{4} [0-9a-zA-Z]{3}$/,
                            messages: { required: "Format Iban invalide" },
                        }),
                        this.$refundBic.rules("add", { required: !0, adpregex: /^[0-9a-zA-Z]{8,11}$/, messages: { required: "Bic invalide" } }),
                        this.$refundRibEtab.rules("add", { required: !0 }));
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._addMasks = function () {
                a('input[data-mask="date"]').each(function () {
                    new Cleave(a(this)[0], { date: !0, datePattern: ["d", "m", "Y"] });
                }),
                    a('input[data-mask="phone"]').each(function () {
                        new Cleave(a(this)[0], {
                            phone: !0,
                            phoneRegionCode: "FR",
                            onValueChanged: function (b) {
                                a(this.element)
                                    .val()
                                    .match(/^\+?33/) &&
                                    a(this.element).val(
                                        a(this.element)
                                            .val()
                                            .replace(/^\+?33/, "0")
                                    );
                            },
                        });
                    }),
                    a('input[data-mask="iban"]').each(function () {
                        new Cleave(a(this)[0], { uppercase: !0, blocks: [4, 4, 4, 4, 4, 4, 3] });
                    }),
                    a('input[data-mask="bic"]').each(function () {
                        new Cleave(a(this)[0], { uppercase: !0 });
                    });
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._addvents = function () {
                var b = this;
                if (
                    (this.$subscriptionForm.find(".js-souscription-btn-next-part").on("click", function (b) {
                        b.preventDefault();
                        var c = a(this),
                            d = c.parents(".js-souscription-form-part"),
                            e = d.find(a("input,textarea,select").filter("[required]"));
                        if (formUtils.isFormEltsValid(e)) {
                            var f = d.next(".js-souscription-form-part");
                            f.data("hjevent") && formFunnel.hj.hjtrigger(f.data("hjevent")),
                                f.addClass("is-displayed"),
                                setTimeout(function () {
                                    f.addClass("is-visible");
                                }),
                                a("html, body").animate({ scrollTop: f.offset().top - (a("#header").outerHeight() + 50) }, 500),
                                c.remove();
                        } else {
                            console.log(d.find(".form-control--md.invalid,input[type=radio].invalid"));
                            var g = d.find(".form-control--md.invalid,input[type=radio].invalid").first().offset().top;
                            a("html, body").animate({ scrollTop: g - 30 }, 300);
                        }
                    }),
                    a("#tx_adp_webservice_remote_civilite").on("focus", function (b) {
                        a("#tx_adp_webservice_remote_civilite").blur();
                    }),
                    this.$subscriptionForm.find('select[data-toggle="yes"]').each(function () {
                        a(this).on("change", function (b) {
                            "yes" == a(this).parents("form").first().data("checkbirth") && a("#" + a(this).data("target")).toggle();
                        });
                    }),
                    this.$subscriptionForm.find(".js-display-toggle").each(function () {
                        a(this).on("change", function () {
                            a(a(this).data("target")).toggle(),
                                "#refund_rib" === a(this).data("target") &&
                                    (a('input[data-mask="iban"]').each(function () {
                                        new Cleave('input[data-mask="iban"]', { uppercase: !0, blocks: [4, 4, 4, 4, 4, 4, 3] });
                                    }),
                                    "block" === b.$refundRib.css("display")
                                        ? (b.$refundIban.rules("add", { required: !0, iban: !0, messages: { required: "Format Iban invalide" } }),
                                          b.$refundBic.rules("add", { required: !0, adpregex: /^[0-9a-zA-Z]{8,11}$/, messages: { required: "BIC remboursement invalide" } }),
                                          b.$refundRibEtab.rules("add", { required: !0 }))
                                        : (b.$refundIban.rules("remove"), b.$refundBic.rules("remove"), b.$refundRibEtab.rules("remove")));
                        }),
                            a(this).is(":checked") ? a(a(this).data("target")).show() : a(a(this).data("target")).hide();
                    }),
                    a(".js-toggle-titulaire").on("change", function (b) {
                        formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onToggleTitulaire(a(this));
                    }),
                    a("#conjointnom,#conjointprenom").on("keyup", function (b) {
                        formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onUpdatePartnerName(a(this));
                    }),
                    a("#resiliation-section").on("change", ".js-toggle-resiliation", function (b) {
                        formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onToggleResiliation(a(this));
                    }),
                    b.$cgvValidateCheckbox.on("change", function () {
                        a(this).is(":checked") ? b.cgvValidateCheckboxCheckedCount++ : b.cgvValidateCheckboxCheckedCount--,
                            b.cgvValidateCheckboxCheckedCount === b.$cgvValidateCheckbox.length ? b.$btnSubmitForm.removeClass("is-disabled") : b.$btnSubmitForm.addClass("is-disabled");
                    }),
                    a("*[data-locrole]").length)
                ) {
                    var c = a('[data-locrole="country"]'),
                        d = a('[data-locrole="department"]'),
                        e = a('[data-locrole="city"]'),
                        f = a("#citiesList");
                    f.hide(),
                        c.on("change", function (a) {
                            "FR" !== c.val()
                                ? (d.find("option:selected").prop("selected", !1), d.find('option[value="99"]').prop("selected", !0), e.data("doautocomplete", "0"))
                                : (d.find("option:selected").prop("selected", !1), e.data("doautocomplete", "1"));
                        }),
                        e.on("blur", function (a) {
                            window.setTimeout(function () {
                                f.hide();
                            }, 300);
                        }),
                        d.on("change", function (b) {
                            "" !== a(this).val() ? a(this).removeClass("invalid") : a(this).addClass("invalid");
                        }),
                        e.on("keyup", function (b) {
                            if ("" === d.val()) return d.addClass("invalid"), void e.val("");
                            if ("1" === a(b.currentTarget).data("doautocomplete") && a(b.currentTarget).val().length > 1) {
                                b.preventDefault();
                                var c = a(b.currentTarget).val(),
                                    g = d.val();
                                a.ajax({ url: "index.php?eID=filteredCities", dataType: "json", method: "GET", data: "city=" + c + "&department=" + g }).done(function (a) {
                                    a.success && (f.html(a.html), f.show());
                                });
                            }
                        }),
                        f.on("click", ".item", function (b) {
                            b.preventDefault(), e.val(a(b.currentTarget).html()), f.hide();
                        });
                }
                a(document).on("scroll.subscription", this._onScroll.bind(this)),
                    setTimeout(function () {
                        b._onScroll();
                    }, 500);
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onScroll = function () {
                this.$stepFooter.is(":visible") &&
                    (a(window).scrollTop() + a(window).innerHeight() > this.$stepFooter.offset().top
                        ? this.footerIsFixed && (this.$stepFooterInner.removeClass("is-fixed"), this.$stepFooterInner.appendTo(this.$stepFooter), (this.footerIsFixed = !1))
                        : this.footerIsFixed || (this.$stepFooterInner.addClass("is-fixed"), this.$stepFooterInner.appendTo("body"), (this.footerIsFixed = !0)));
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].onLeave = function () {
                a(document).off("scroll.subscription"), this.footerIsFixed && (this.$stepFooterInner.removeClass("is-fixed"), this.$stepFooterInner.appendTo(this.$stepFooter), (this.footerIsFixed = !1));
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].loadSubscriptionProcess = function (b) {
                if (window.devMode) a('div[data-role="display-subscription-process"]').html(jsonSubscription.html), this._onStepReady();
                else {
                    var c = this;
                    a.ajax({
                        url: b,
                        type: "GET",
                        dataType: "json",
                        success: function (b) {
                            a('div[data-role="display-subscription-process"]').html(b.html), c._onStepReady();
                        },
                        error: function () {},
                    });
                }
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onToggleTitulaire = function (b) {
                var c = b,
                    d = c.data("target");
                a(d).length && a(d).remove(), a("#refund_iban").val("FR");
                var e = c.find("option:selected").data("template");
                c.parents(".row").first().after(e),
                    "conjoint" == c.val() &&
                        (c.parents(".form-elts").first().find('input[data-role="ribtitlastname"]').val(a("#conjointnom").val()), c.parents(".form-elts").first().find('input[data-role="ribtitfirstname"]').val(a("#conjointprenom").val()));
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onUpdatePartnerName = function () {
                var b = "";
                "" != a("#conjointprenom").val() && (b += a("#conjointprenom").val()), "" != a("#conjointnom").val() && (b += " " + a("#conjointnom").val()), "" != b && a('option[value="conjoint"]').text(b);
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION]._onToggleResiliation = function (b) {
                (targetNode = a(b.data("target"))),
                    1 == b.attr("value")
                        ? (a(targetNode).show(),
                          a(targetNode)
                              .find('input[type="radio"]')
                              .each(function (b) {
                                  a(this).prop("checked", !1), a('input[name="' + a(this).attr("name") + '"]').prop("required", !0);
                              }),
                          0 == b.data("exclude-text") &&
                              a(targetNode)
                                  .find('input[type="text"]')
                                  .each(function (b) {
                                      a(this).prop("required", !0);
                                  }))
                        : (a(targetNode).hide(),
                          a(targetNode).find('div[id^="resiliation-part"]').hide(),
                          a(targetNode).find("input").prop("required", !1),
                          a(targetNode).find('input[type="text"]').val(""),
                          a(targetNode).find('input[type="radio"]').prop("checked", !1));
            }),
            (formFunnel.steps[formFunnel.stepsId.SUBSCRIPTION].update = function () {
                var b = a('fieldset[data-fieldset="partner"]'),
                    c = a('fieldset[data-fieldset="children"]');
                if ((a('input[id="toggle-partner"]').is(":checked") ? b.show() : b.hide(), c.find(".fieldset__section").length && c.find(".fieldset__section").remove(), a('input[id="toggle-children"]').is(":checked"))) {
                    var d = a('[name="enfants_nb"]').val(),
                        e = [];
                    if (d > 0)
                        for (var f = 1; f <= d; f++) {
                            var g = c.data("template").replace(/%num%/g, f);
                            e.push(g);
                        }
                    c.find("legend").after(e), c.show();
                } else c.hide();
                for (var h = a("#" + formFunnel.stepsId.SUBSCRIPTION).find(".form-control--md"), f = 0; f < h.length; f++)
                    if (a(h[f]).attr("name")) {
                        var i = a(h[f]).attr("name").split("remote");
                        if (formFunnel.$form.find('.form-control--md[name="' + i[1] + '"]').length) {
                            var j = formFunnel.$form.find('.form-control--md[name="' + i[1] + '"]'),
                                k = j.val();
                            "INPUT" === j.prop("tagName") && "radio" === j.attr("type") && (k = formUtils.getCivility(j.filter(":checked").val())),
                                "SELECT" === j.prop("tagName") && (k = j.find(":selected").text()),
                                a(h[f]).val(k),
                                formFunnel.inputStatus.active(a(h[f]));
                        }
                    }
            }));
    })(jQuery),
    (function (a) {
        a(".funnel-page").length &&
            (formFunnel.steps[formFunnel.stepsId.USER_INFORMATION_GENDER].update = function () {
                formFunnel.$form.find('.refund-level input[type="hidden"]').rules("remove");
            });
    })(jQuery),
    (function (a) {
        (a.resiliationManager = function (b, c) {
            var d = adpUtils.getDefaultDatepickerOptions(),
                e = this;
            e.settings = {};
            var f = a(b);
            return (
                (e.init = function () {
                    (e.settings = a.extend({}, d, c)), f.find('*[data-role="date"]').datepicker(e.settings), f.find('*[data-role="date"]').preventKeyboard();
                    var b = f.find('select[data-role="reason"]').first();
                    b.on("change", function () {
                        e.manageEffectField(a(this).val());
                    }),
                        e.manageEffectField(b.val());
                }),
                (e.manageEffectField = function (a) {
                    var b = f.find("#resil_echeance");
                    "chatel" === a ? b.datepicker("setStartDate", null) : (b.datepicker("setStartDate", b.data("date-start-date")), null == b.datepicker("getDate") && b.datepicker("setDate", b.datepicker("getStartDate")));
                }),
                e.init(),
                e
            );
        }),
            (a.fn.resiliationManager = function (b) {
                return this.each(function () {
                    if (void 0 == a(this).data("resiliationManager")) {
                        var c = new a.resiliationManager(this, b);
                        a(this).data("resiliationManager", c);
                    }
                });
            });
    })(jQuery),
    $('body *[data-role="resiliation-manager"]').resiliationManager();

    document.querySelector("#subscription-form > fieldset.souscription-form-part.js-souscription-form-part.is-displayed.is-visible")
