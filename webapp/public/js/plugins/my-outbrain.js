window.OBR = window.OBR || {};
(function (OBR) {
	window.OBR._jsc = {};
	OBR.error = function (a) {
		var d = ["www.vanguardngr.com"];
		if (!0 !== a) {
			var b,
				c = document,
				f = window.OB_releaseVer,
				g = a.isMonitorRepeated ? "&isMonitorRepeated=true" : "";
			d =
				window.location &&
				window.location.hostname &&
				-1 < d.indexOf(window.location.hostname);
			if (!c.getElementById("obMntor") && !d) {
				var e = function () {
					b = c.createElement("iframe");
					b.setAttribute("id", "obMntor");
					b.style.display = "none";
					c.body.appendChild(b);
					b.src =
						"https://widgets.outbrain.com/widgetMonitor/monitor.html?name=" +
						encodeURIComponent(a.name) +
						"&message=" +
						encodeURIComponent(a.message) +
						g +
						"&stack=" +
						encodeURIComponent(a.stack) +
						"&ver=" +
						encodeURIComponent(f);
				};
				c.body
					? e()
					: setTimeout(function () {
							c.body && e();
					  }, 1e4);
			}
		}
	};
	try {
		var aa,
			v,
			da,
			ea,
			x,
			fa,
			ha,
			ja,
			ka,
			la,
			ma,
			pa,
			na,
			oa,
			qa,
			ra,
			sa,
			ta,
			ua,
			va,
			wa,
			ya,
			za,
			Ra,
			Sa,
			Ta,
			Ua,
			Va,
			Xa,
			Ya,
			Za,
			Wa,
			z,
			$a,
			ab,
			bb,
			cb,
			fb,
			gb,
			ib,
			jb,
			hb,
			lb,
			kb,
			mb,
			nb,
			pb,
			qb,
			rb,
			tb,
			sb,
			ub,
			xb,
			vb,
			yb,
			wb,
			zb,
			Ab,
			Bb,
			Db,
			Cb,
			Eb,
			Fb,
			Hb,
			Jb,
			Lb,
			Kb,
			Mb,
			Gb,
			Nb,
			Ob,
			Qb,
			Rb,
			Sb,
			ca,
			u,
			ba;
		aa = function () {
			aa = function () {};
			u.Symbol || (u.Symbol = ba);
		};
		v = function () {
			aa();
			var a = u.Symbol.iterator;
			a || (a = u.Symbol.iterator = u.Symbol("iterator"));
			"function" != typeof Array.prototype[a] &&
				ca(Array.prototype, a, {
					configurable: !0,
					writable: !0,
					value: function () {
						return da(this);
					},
				});
			v = function () {};
		};
		da = function (a) {
			var b = 0;
			return ea(function () {
				return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
			});
		};
		ea = function (a) {
			v();
			a = { next: a };
			a[u.Symbol.iterator] = function () {
				return this;
			};
			return a;
		};
		OBR._jsc.w = function (a) {
			v();
			aa();
			v();
			var b = a[window.Symbol.iterator];
			return b ? b.call(a) : da(a);
		};
		x = function (a, b) {
			if (b) {
				var c = u;
				a = a.split(".");
				for (var d = 0; d < a.length - 1; d++) {
					var e = a[d];
					e in c || (c[e] = {});
					c = c[e];
				}
				a = a[a.length - 1];
				d = c[a];
				b = b(d);
				b != d &&
					null != b &&
					ca(c, a, { configurable: !0, writable: !0, value: b });
			}
		};
		fa = function () {
			this.V = !1;
			this.i = null;
			this.J = void 0;
			this.c = 1;
			this.wa = this.A = 0;
			this.o = null;
		};
		ha = function (a) {
			if (a.V) throw new TypeError("Generator is already running");
			a.V = !0;
		};
		ja = function (a, b) {
			a.o = { qk: b, dt: !0 };
			a.c = a.A || a.wa;
		};
		ka = function (a, b, c) {
			a.c = c;
			return { value: b };
		};
		la = function (a) {
			a.A = 0;
			var b = a.o.qk;
			a.o = null;
			return b;
		};
		ma = function (a) {
			this.c = new fa();
			this.i = a;
		};
		pa = function (a, b) {
			ha(a.c);
			var c = a.c.i;
			if (c)
				return na(
					a,
					"return" in c
						? c["return"]
						: function (a) {
								return { value: a, done: !0 };
						  },
					b,
					a.c.return
				);
			a.c.return(b);
			return oa(a);
		};
		na = function (a, b, c, d) {
			try {
				var e = b.call(a.c.i, c);
				if (!(e instanceof Object))
					throw new TypeError("Iterator result " + e + " is not an object");
				if (!e.done) return (a.c.V = !1), e;
				var g = e.value;
			} catch (f) {
				return (a.c.i = null), ja(a.c, f), oa(a);
			}
			a.c.i = null;
			d.call(a.c, g);
			return oa(a);
		};
		oa = function (a) {
			for (; a.c.c; )
				try {
					var b = a.i(a.c);
					if (b) return (a.c.V = !1), { value: b.value, done: !1 };
				} catch (c) {
					(a.c.J = void 0), ja(a.c, c);
				}
			a.c.V = !1;
			if (a.c.o) {
				b = a.c.o;
				a.c.o = null;
				if (b.dt) throw b.qk;
				return { value: b.return, done: !0 };
			}
			return { value: void 0, done: !0 };
		};
		qa = function (a) {
			this.next = function (b) {
				ha(a.c);
				a.c.i ? (b = na(a, a.c.i.next, b, a.c.ca)) : (a.c.ca(b), (b = oa(a)));
				return b;
			};
			this.throw = function (b) {
				ha(a.c);
				a.c.i
					? (b = na(a, a.c.i["throw"], b, a.c.ca))
					: (ja(a.c, b), (b = oa(a)));
				return b;
			};
			this.return = function (b) {
				return pa(a, b);
			};
			v();
			aa();
			v();
			this[window.Symbol.iterator] = function () {
				return this;
			};
		};
		ra = function (a) {
			function b(b) {
				return a.next(b);
			}
			function c(b) {
				return a.throw(b);
			}
			return new window.Promise(function (d, e) {
				function g(a) {
					a.done
						? d(a.value)
						: window.Promise.resolve(a.value).then(b, c).then(g, e);
				}
				g(a.next());
			});
		};
		sa = function (a) {
			return ra(new qa(new ma(a)));
		};
		ta = function (a, b, c) {
			if (null == a)
				throw new TypeError(
					"The 'this' value for String.prototype." +
						c +
						" must not be null or undefined"
				);
			if (b instanceof RegExp)
				throw new TypeError(
					"First argument to String.prototype." +
						c +
						" must not be a regular expression"
				);
			return a + "";
		};
		ua = function (a, b) {
			v();
			a instanceof String && (a += "");
			var c = 0,
				d = {
					next: function () {
						if (c < a.length) {
							var e = c++;
							return { value: b(e, a[e]), done: !1 };
						}
						d.next = function () {
							return { done: !0, value: void 0 };
						};
						return d.next();
					},
				};
			d[window.Symbol.iterator] = function () {
				return d;
			};
			return d;
		};
		va = function () {
			this.c = [];
		};
		wa = function (a, b) {
			window.OBR.h.log("remove event :" + b);
			for (var c = 0, d = a.c.length; c < d; c += 1)
				if (a.c[c] && a.c[c].name && a.c[c].name === b)
					try {
						a.c.splice(c, 1);
					} catch (e) {
						window.OBR.h.log("rm evnt err: " + e), window.OBR.error(e);
					}
		};
		ya = function () {
			this.Na = window.OBR.b.ha("OB-AD-BLOCKER-STAT", null);
			null !== this.Na &&
				window.OBR.h.log("AdBlock - status from local storage is: " + this.Na);
			xa = window.OBR.f.gf ? 1500 : 300;
			this.Xg = this.Rj = 0;
			this.i = !1;
			this.c = new window.OBR.Ea();
			this.Fa = { ready: 0, td: 3, Yi: 6, stopped: 7, Dl: 8 };
			null === this.Na && this.Pg();
		};
		za = function (a, b) {
			a.c.add("onAdBlockStatusReady", b);
		};
		Ra = function (a) {
			var b = window.OBR.b.createElement(
				"div",
				"ob_ad",
				"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important; border:none; padding: 0 0 0 0;visibility:visible !important"
			);
			b.className = "Ads_4 AD_area ADBox AdsRec";
			window.document.body.appendChild(b);
			var c = a.Cj(
				["abp_ob_exist", "abp_ob_wl"],
				"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important; border:none; padding: 0 0 0 0;visibility:visible !important"
			);
			c.push(b);
			window.OBR.h.log(
				"AdBlock - Start long status check for Ad Blocker existence"
			);
			(0, window.setTimeout)(function () {
				a.Fj(c);
				a.Na = (0 < a.Xg).toString();
				window.OBR.h.log(
					"AdBlock - finish long status check. adBlock = " + a.Na
				);
				a.i = !0;
				window.OBR.b.Pa("OB-AD-BLOCKER-STAT", a.Na);
				a.c.D("onAdBlockStatusReady", [a.Na]);
			}, xa);
		};
		Sa = function () {
			try {
				return window.document.cookie;
			} catch (a) {}
			return "";
		};
		Ta = function (a) {
			a = "OB-USER-TOKEN=" + (0, window.encodeURIComponent)(a);
			for (
				var b = [
						a,
						"max-age=7776000",
						"expires=" + new Date(Date.now() + 7776e3).toUTCString(),
						"path=/;samesite=lax",
					].join(";"),
					c = window.document.location.hostname.split("."),
					d = c.length - 1;
				0 <= d;
				d--
			) {
				try {
					window.document.cookie = b + ";domain=." + c.slice(d).join(".") + ";";
				} catch (e) {}
				if (-1 < Sa().indexOf(a)) {
					window.OBR.h.log("pub cookie is set");
					break;
				}
			}
		};
		Ua = function () {
			var a = Sa().match(/OB-USER-TOKEN=([^;]+)(;|$)/),
				b = "";
			a && 1 < a.length && (b = (0, window.decodeURIComponent)(a[1]));
			return b;
		};
		Va = function (a) {
			function b(a, b) {
				a.map(function (c) {
					var f = a[c].pixel;
					f = (c = a[c].contextAware)
						? f
						: window.OBR.f.U +
						  "widgets.outbrain.com/nanoWidget/externals/obPixelFrame/obPixelFrame.htm#p=" +
						  (0, window.encodeURIComponent)(f);
					f = {
						type: c ? "IMG" : "IFRAME",
						id: null,
						css: "display:none;height:1px;width:1px;",
						attributes: { src: f },
					};
					f = window.OBR.b.createElement(f.type, f.id, f.css, f.attributes);
					b.appendChild(f);
				});
			}
			var c = window.OBR.b.w(a.B());
			a &&
				c &&
				((a = a.gb("whenViewedPixels", null)),
				(c = c.querySelector(".ob-pixels")),
				a && c && b(a, c));
		};
		Xa = function () {
			this.za = !1;
			this.c = [];
			this.si = new window.OBR.ne();
			this.i = new window.OBR.nh();
			this.A = !1;
			this.J = 0;
			this.V = 200;
			this.startTime = new Date().getTime();
			this.Fa = { ready: 0, td: 3, Yi: 6, stopped: 7, Dl: 8 };
			Wa(this);
			this.Hf = this.Hf.bind(this);
		};
		Ya = function (a, b) {
			window.OBR.h.log("Adding stats for: " + b.B());
			if (b.j("tracking", !1)) z(a, b, a.Fa.Yi);
			else if (b.Wh()) z(a, b, a.Fa.stopped);
			else {
				var c = b.j("recMode", "");
				c.includes("top-box") || c.includes("bottom-box") || b.hf()
					? z(a, b, a.Fa.ready)
					: ((c = b.fa) && c.reason && c.reason !== window.OBR.Mb.gc.wg
							? z(a, b, a.Fa.Dl)
							: z(a, b, a.Fa.ready),
					  a.Hf(b));
			}
		};
		Za = function () {
			var a = window.OBR.Qa;
			a.za ||
				(a.Gf(),
				(0, window.setTimeout)(function () {
					return (a.za = !1);
				}, a.V),
				(a.za = !0));
		};
		Wa = function (a) {
			window.OBR.h.log("Starting Statistics");
			za(window.OBR.cb, function () {
				a.A = !0;
				$a(a);
			});
			window.OBR.h.log("AdBlock - Start full check for stats");
			window.OBR.cb.Pg();
		};
		z = function (a, b, c) {
			var d = b.gb("viewability_actions");
			if (void 0 !== d && null !== d && d.reportViewed && d.reportServed) {
				d = b.gb("viewability_actions");
				d = ((d && 3 === c && d.reportViewed) || d.reportServed).split("?");
				var e = window.OBR.b.Mm(d[1]);
				e.tm = new Date().getTime() - a.startTime;
				e.eT = c;
				if (c === a.Fa.ready) {
					e = "" + window.OBR.b.Qi(e);
					if (b) {
						var g = window.document.body.getBoundingClientRect();
						var f = window.OBR.b.w(b.B());
						if (f) {
							var h = f.getBoundingClientRect();
							g =
								"&widgetWidth=" +
								Math.round(h.width || f.clientWidth) +
								"&widgetHeight=" +
								Math.round(h.height || f.clientHeight) +
								"&widgetX=" +
								Math.round(h.left - g.left) +
								"&widgetY=" +
								Math.round(h.top - g.top);
						} else g = "";
					} else g = "";
					f = window.OBR.f.Vi;
					!b || -1 === f || window.OBR.gd.Gn
						? (f = "")
						: ((window.OBR.gd.Gn = !0), (f = "&tpcs=" + f));
					e = e + g + f;
				} else e = window.OBR.b.Qi(e);
				d = d[0] + "?" + e;
				e = [];
				g = window.OBR.cb;
				"undefined" === typeof b.Ql() &&
					b.hw(0 < b.m("pad", "0") ? g.Gj(b.B(), c) : !1);
				g = b.Ql() ? "1" : "0";
				e.push(d);
				e.push("&wRV=" + window.OBR.f.Ic);
				e.push("&pVis=" + g);
				e.push("&lsd=" + b.m("lsd", -1));
				e.push("&eIdx=");
				c === a.Fa.td && e.push(a.J++);
				c !== a.Fa.td &&
					"" !== b.m("cnsnt", "") &&
					e.push("&cnsnt=" + b.m("cnsnt", ""));
				a.o || (e.push("&cheq=" + window.OBR.Nb.qd), (a.o = !0));
				b = e.join("");
				window.OBR.h.log("Stats waiting list: " + b);
				a.i.add(b);
				a.A && $a(a);
			}
		};
		$a = function (a) {
			for (; !a.i.Tb(); ) {
				var b = a.i.top();
				b += "&ab=" + window.OBR.cb.Xg + "&wl=" + window.OBR.cb.Rj;
				window.OBR.Aa.get(b, {});
			}
		};
		ab = function (a, b) {
			b &&
				((b = a.innerText || a.textContent),
				(b =
					0 < b.lastIndexOf(" ")
						? b.substring(0, b.lastIndexOf(" "))
						: b.substring(0, b.length - 3)),
				-1 < ".,-_' ".indexOf(b.slice(-1)) &&
					(b = b.substring(0, b.length - 1)),
				(a.innerHTML = b + "&hellip;"));
		};
		bb = function (a, b) {
			function c() {
				for (var a = 0; a < e.length; a++) {
					var b = e[a];
					b.title = b.innerText || b.textContent;
					var c = b.title,
						k = b.clientHeight,
						l = (0, window.parseInt)(
							window.OBR.b.Wa(b, "max-height").replace("px", "")
						);
					if (!(k < l)) {
						var m = b.cloneNode(!0);
						k = window.document.createElement("div");
						k.style.position = "absolute";
						k.style.top = "-1000px";
						k.style.left = "-1000px";
						window.document.body.appendChild(k);
						var n = m.style;
						n.fontSize = window.OBR.b.Wa(b, "font-size");
						n.fontWeight = window.OBR.b.Wa(b, "font-weight");
						n.fontFamily = window.OBR.b.Wa(b, "font-family");
						n.lineHeight = window.OBR.b.Wa(b, "line-height");
						n.textTransform = window.OBR.b.Wa(b, "text-transform");
						n.letterSpacing = window.OBR.b.Wa(b, "letter-spacing");
						n.display = "block";
						n.visibility = "hidden";
						var q = window.OBR.b.Wa(b, "padding-right").replace("px", ""),
							p = window.OBR.b.Wa(b, "padding-left").replace("px", "");
						n.width = b.clientWidth - p - q + "px";
						k.appendChild(m);
						n = void 0;
						for (
							q = m.innerText || m.textContent;
							0 < l && m.offsetHeight > l && 0 < q.length;

						)
							(q = q.substring(0, q.length - 1)), (m.innerHTML = q), (n = !0);
						0 === q.length
							? (n = !1)
							: ((l = m.offsetHeight),
							  ab(m, n),
							  l < m.offsetHeight &&
									((q = q.substring(0, q.length - 1)),
									(m.innerHTML = q),
									ab(m, n)));
						l = n;
						!0 === l
							? ((m = m.innerText || m.textContent),
							  d
									? ((c = { Hm: c, Sn: m }),
									  (m = void 0 === c.Sn ? "" : c.Sn),
									  (c =
											m.length / (void 0 === c.Hm ? "" : c.Hm).length <
											(void 0 === c.threshold ? 0.5 : c.threshold)
												? ""
												: m))
									: (c = m),
							  (b.innerHTML = c))
							: !1 === l &&
							  window.OBR.h.log(
									"Truncation - External CSS broke the calculation, truncation is canceled."
							  );
						k.parentNode.removeChild(k);
					}
				}
			}
			var d = void 0 === d ? !1 : d;
			var e = window.OBR.b.getElementsByClassName(
				void 0 === b ? "ob-rec-text" : b,
				a
			);
			0 ===
			window.OBR.b.getElementsByClassName("ob-touch-strip-layout", a).length
				? c()
				: (0, window.setTimeout)(c, 1e3);
		};
		cb = function (a) {
			var b = !1;
			(a = a.querySelector(".ob-widget")) &&
				a.attributes["data-dynamic-truncate"] &&
				"true" === a.attributes["data-dynamic-truncate"].value &&
				(b = !0);
			return b;
		};
		OBR._jsc.db = function (a, b, c, d, e) {
			c = void 0 === c ? !1 : c;
			d = void 0 === d ? !1 : d;
			e = void 0 === e ? !1 : e;
			var g = window.OBR.b.w(b);
			if (g) {
				var f = cb(g);
				(e && "undefined" != g.style.webkitLineClamp) ||
					!(f || c || d) ||
					(0, window.setTimeout)(
						function () {
							var a = window.OBR.b.w(b);
							f && bb(a, "ob-rec-text");
							c && bb(a, "ob-rec-source");
							d && bb(a, "ob-rec-description");
						}.bind(a),
						500
					);
			} else
				window.OBR.h.log("truncation - no container found for widgetIdx=" + b);
		};
		fb = function (a) {
			a = Object.assign(
				{
					timestamp: +new Date(),
					sessionId: window.OBR.Nb.sh,
					url: window.OBR.f.Ie,
					cheqSource: 1,
				},
				a
			);
			window.OBR.Aa.get(eb, a);
		};
		gb = function () {
			this.timeout = !1;
			this.i = this.ah = null;
			this.c = !1;
		};
		ib = function () {
			var a = window.OBR.he;
			window.OBR.h.log("FD calling Cheq");
			return new window.Promise(function (b, c) {
				var d = (0, window.setTimeout)(function () {
					window.OBR.f.Kc ||
						((a.timeout = !0), c({ type: "timeout", gu: null }));
				}, 500);
				a.i = Date.now();
				a.ah = function (c) {
					c = (0, window.encodeURIComponent)(c);
					window.OBR.f.Kc = c;
					(0, window.clearTimeout)(d);
					c = Date.now() - a.i;
					a.timeout
						? ((c = Object.assign({ cheqEvent: 2 }, { responseTime: c })),
						  fb(c))
						: b({ type: "success" });
				};
				var e = hb(function (a) {
					(0, window.clearTimeout)(d);
					c({ type: "error", gu: a.message });
				});
				window.document.getElementsByTagName("head")[0].appendChild(e);
			});
		};
		jb = function () {
			window.OBR.he.ah = function (a) {
				a = (0, window.encodeURIComponent)(a);
				window.OBR.f.Kc = a;
			};
			var a = hb(function () {});
			window.document.getElementsByTagName("head")[0].appendChild(a);
		};
		hb = function (a) {
			var b = "https:" === window.location.protocol ? "https:" : "http:",
				c = window.document.createElement("script");
			c.className = "ct_invocation_65349 ct_invocation_65349_0";
			c.setAttribute("jsonp", "OBR.extern.onCheqResponse");
			c.src = b + "//ob.cheqzone.com/placement_invocation?id=65349&idx=0";
			c.onerror = a;
			return c;
		};
		lb = function () {
			window.document && window.document.body
				? kb()
				: window.addEventListener("DOMContentLoaded", function () {
						kb();
				  });
		};
		kb = function () {
			var a = window.document.createElement("div");
			a.className = "ctcg_87158";
			a.setAttribute("style", "width:1px;height:1px");
			window.document.body.appendChild(a);
		};
		mb = function (a) {
			var b = window.OBR.he;
			if (!b.c) {
				b.c = !0;
				var c = function (a) {
						return window.document && a
							? window.document.getElementsByClassName
								? window.document.getElementsByClassName(a)
								: window.document.querySelectorAll("." + a)
							: null;
					},
					d = "https:" === window.location.protocol ? "https:" : "http:",
					e = window.document.createElement("script"),
					g = c("ct_invocation_87158");
				g = g ? g.length : null;
				null === g
					? (b.c = !1)
					: ((b = c("ctcg_87158")),
					  (e.className = "ct_invocation_87158 ct_invocation_87158_" + g),
					  b && b[0] && (b[0].className = "ctcg_87158_" + g),
					  e.setAttribute("tpc", "[ENTER_CLICK_URL_UNESCAPED]"),
					  e.setAttribute("tpi", "[ENTER_IMPRESSION_URL_UNESCAPED]"),
					  e.setAttribute(
							"ch",
							(function (a) {
								a = {
									Request_id: a.m("req_id", "-1"),
									publisher_id: a.m("pid", "0"),
									source_id: a.m("sid", "0"),
									widget_id: a.m("widgetJsId", a.H()),
									pv_id: a.m("pvId", "-1"),
								};
								try {
									return JSON.stringify(a);
								} catch (h) {
									return "";
								}
							})(a)
					  ),
					  (e.src =
							d + "//ob.cheqzone.com/placement_invocation?id=87158&idx=" + g),
					  window.document.getElementsByTagName("head")[0].appendChild(e));
			}
		};
		nb = function (a) {
			var b = a.m("req_id", null),
				c = a.m("pid", null),
				d = a.m("widgetJsId", null),
				e = a.m("pvId", null),
				g = a.m("sid", null),
				f = window.OBR.b.na(a.la());
			b =
				"https://fqtag.com/implement.js" +
				("?rt=display&org=XerMOk8ZaYDInXdxmR4z&s=" +
					b +
					"&p=" +
					c +
					"&a=" +
					g +
					"&cmp=" +
					d +
					"&rd=" +
					f +
					"&c1=" +
					e);
			c = window.OBR.b.createElement("script", null, null, { src: b });
			d = window.OBR.b.createElement("noscript", null);
			d.insertAdjacentHTML(
				"beforeend",
				'<img src="' + b + '" width="1" height="1" border="0"/>'
			);
			window.OBR.b.w(a.B()).appendChild(c);
			window.OBR.b.w(a.B()).appendChild(d);
		};
		pb = function () {
			var a = !1,
				b = null;
			return new window.Promise(function (c, d) {
				var e = (0, window.btoa)(window.OBR.f.Ie);
				window.OBR.h.log("FD call TCheck");
				var g = (0, window.setTimeout)(function () {
					a = !0;
					window.OBR.h.log("FD TCheck timeout");
					d({ type: "timeout" });
				}, 200);
				b = Date.now();
				window.OBR.Aa.get(ob + "/" + e, null, function (f) {
					var e = Date.now() - b;
					a: {
						var k = !1;
						if (f) {
							try {
								k = JSON.parse(f).result;
							} catch (l) {
								f = null;
								break a;
							}
							f = k;
						} else f = void 0;
					}
					a && fb({ cheqEvent: 3, responseTime: e });
					(0, window.clearTimeout)(g);
					window.OBR.h.log("FD got response from TCheck");
					null === f && d({ type: "error" });
					c(f);
				});
			});
		};
		qb = function () {
			function a() {
				return Math.floor(65536 * (1 + Math.random()))
					.toString(16)
					.substring(1);
			}
			return (
				a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
			);
		};
		rb = function () {
			window.OBR.h.log("FD Process started");
			this.sh = qb();
			this.i = new window.OBR.Ea();
			this.Ik = !1;
			this.qd = 0;
			this.Ua = 100;
			this.c = !1;
			var a = window.OBR.f;
			a: {
				var b = window.document.querySelector(".OUTBRAIN");
				if (b && (b = b.getAttribute("data-src")))
					try {
						var c = (0, window.decodeURIComponent)(b);
						break a;
					} catch (d) {}
				c = void 0;
			}
			c =
				c ||
				window.OBR.b.Ne("property", "og:url", "meta", "content") ||
				window.OBR.b.Ne("rel", "canonical", "link", "href") ||
				window.location.href;
			b = window.document.createElement("a");
			b.href = c;
			a.Ie = b.hostname;
		};
		tb = function (a) {
			var b;
			return sa(function (c) {
				if (1 == c.c) {
					b = window.OBR.b.ha("OB-FDE", null);
					if (null !== b) {
						"0" === b && (a.Ua = 0);
						c.c = 2;
						return;
					}
					return ka(c, sb(a), 3);
				}
				2 != c.c && (b = c.J);
				return c.return(b);
			});
		};
		sb = function (a) {
			var b;
			return sa(function (c) {
				if (1 == c.c) return (c.A = 2), ka(c, ub(a), 4);
				if (2 != c.c) return (b = c.J), c.return(b ? "2" : "0");
				la(c);
				return c.return("0");
			});
		};
		ub = function (a) {
			var b, c;
			return sa(function (d) {
				if (1 == d.c) return (d.A = 2), ka(d, pb(), 4);
				if (2 != d.c) return (b = d.J), (a.Ua = 2), d.return(b);
				(c = la(d)) && "timeout" === c.type
					? (window.OBR.h.log("FD TCheck timeout"), (a.Ua = 1))
					: (a.Ua = 7);
				return d.return(!1);
			});
		};
		xb = function () {
			var a = window.OBR.Nb,
				b;
			sa(function (c) {
				if (1 == c.c) return ka(c, tb(a), 2);
				b = c.J;
				switch (b) {
					case "2":
						vb(a);
						break;
					case "6":
						lb();
					case "4":
						a.Ua = 6;
						wb(a);
						break;
					case "0":
						wb(a);
						break;
					case "5":
						vb(a);
						break;
					default:
						wb(a);
				}
				c.c = 0;
			});
		};
		vb = function (a) {
			var b;
			sa(function (c) {
				switch (c.c) {
					case 1:
						return (c.A = 2), ka(c, ib(), 4);
					case 4:
						window.OBR.h.log("FD got response from Cheq");
						a.qd = 1;
						a.Ua = 4;
						c.c = 3;
						c.A = 0;
						break;
					case 2:
						(b = la(c)),
							(window.OBR.f.pd = a.sh),
							"timeout" === b.type
								? ((a.qd = 2), window.OBR.h.log("FD Cheq timeout"), (a.Ua = 3))
								: ((a.qd = 5), (a.Ua = 5), window.OBR.h.log("FD Cheq error"));
					case 3:
						wb(a), (c.c = 0);
				}
			});
		};
		yb = function (a, b) {
			a.i.add("onFDStatusReady", b);
		};
		wb = function (a) {
			var b = { Ua: a.Ua },
				c = { cheqEvent: 0, exitReason: b.Ua };
			b.data && b.data.mq && (c.responseTime = b.data.mq);
			fb(c);
			a.Ik = !0;
			a.i.D("onFDStatusReady");
			window.OBR.h.log("FD finished");
		};
		zb = function (a) {
			if (a && (a = window.OBR.b.w(a.B()))) {
				var b = ["ob-dynamic-rec-container"]
					.map(function (a) {
						return "." + a;
					})
					.join(",");
				return [].slice.call(a.querySelectorAll(b));
			}
		};
		Ab = function (a) {
			if (!a) return null;
			var b =
				".ob-rec-image-container .ob-rec-text .ob-rec-source .ob-rec-description .ob-grid-button-container .ob-rec-logo .ob-rec-date .ob-rec-author"
					.split(" ")
					.reduce(function (b, d) {
						return a.querySelector(d) ? b + "1" : b + "0";
					}, "");
			return b ? b : null;
		};
		Bb = function (a) {
			if (a) return [window.OBR.b.w(a.B())];
		};
		Db = function () {
			this.startTime = Date.now();
			this.i = [];
			Cb(this);
		};
		Cb = function (a) {
			window.OBR.f.Ln &&
				window.addEventListener("unload", function () {
					a.o();
				});
		};
		Eb = function () {
			this.A = new Db();
			this.Db = window.OBR.W.Tc();
			this.Kb = this.Kb.bind(this);
			this.Th = this.Th.bind(this);
			this.qf = this.qf.bind(this);
			this.o = zb;
			this.i = Bb;
			this.c = [];
		};
		Fb = function () {
			this.c = [];
			this.Db = window.OBR.W.Tc();
		};
		OBR._jsc.Ib = function (a) {
			var b = window.OBR.Fe,
				c = a.gb("eventTrackers"),
				d = Gb(a);
			if (c && d) {
				var e = window.OBR.b.createElement("div");
				e.classList.add("ob-pixels");
				d.querySelector(".ob-pixels") || d.appendChild(e);
				for (var g in c) Hb(b, a, d, g, c[g]);
			}
		};
		Hb = function (a, b, c, d, e) {
			var g = e.filter(function (a) {
					return 1 === a.event;
				}),
				f = e.filter(function (a) {
					return 2 === a.event;
				});
			e = e.filter(function (a) {
				return 3 === a.event;
			});
			Jb(b, d, g);
			Kb(a, b, c, d, f, e);
		};
		Jb = function (a, b, c) {
			if (c && c.length) {
				a = Gb(a);
				var d = c.filter(function (a) {
					return 2 == a.method;
				});
				c = c.filter(function (a) {
					return 1 == a.method;
				});
				Lb(a, c);
				Mb(a, b, d);
			}
		};
		Lb = function (a, b) {
			if (b && b.length) {
				a = a.querySelector(".ob-pixels");
				var c = window.document.createDocumentFragment();
				b.forEach(function (a) {
					var b = window.OBR.b.createElement(
						"iframe",
						null,
						"display:none;width:1px;height:1px;",
						{ sandbox: "allow-scripts allow-same-origin" }
					);
					b.src =
						"https://widgets.outbrain.com/nanoWidget/externals/obPixelFrame/obPixelFrame.htm#p=" +
						a.url;
					c.appendChild(b);
				});
				a.appendChild(c);
			}
		};
		Kb = function (a, b, c, d, e, g) {
			if ((c = Nb(c, d)))
				e && e.length && a.observe(b, c, d, 2, e),
					g && g.length && a.observe(b, c, d, 3, g);
		};
		Mb = function (a, b, c) {
			if (c && c.length) {
				(a = Nb(a, b)) ||
					window.OBR.error({
						name: "JsTrackerError",
						message: "Missing jsTracker element",
					});
				var d = window.document.createDocumentFragment();
				c.forEach(function (a) {
					a = window.OBR.b.xa(0, a.url, !0, !1);
					d.appendChild(a);
				});
				window.OBR.b.hb(d, a);
			}
		};
		Gb = function (a) {
			if (a) return window.OBR.b.w(a.B());
		};
		Nb = function (a, b) {
			if (a) return a.querySelector('[data-pos="' + b + '"]');
		};
		Ob = function () {
			this.o = {
				x: 0,
				y: 0,
				width: Math.max(
					window.document.documentElement.clientWidth,
					window.innerWidth || 0
				),
				height: Math.max(
					window.document.documentElement.clientHeight,
					window.innerHeight || 0
				),
			};
		};
		Qb = function (a) {
			var b = Pb;
			[].slice
				.call(a.Ja.querySelectorAll(".ob-lazy-bgimg, .ob-lazy-img"))
				.forEach(function (c) {
					c = {
						callback: b.i.bind(b),
						callbackParams: [a, c],
						element: c,
						rootMargin: "" + a.rootMargin,
						threshold: [0, 0.5, 1],
						unobserve: !0,
					};
					new window.OBR.IntersectionObserver(c).observe();
				});
		};
		Rb = function (a) {
			if (a) {
				var b = !1,
					c = window.NaN,
					d = window.NaN,
					e = !1,
					g = a.querySelectorAll("a");
				g &&
					0 !== g.length &&
					(g.forEach(function (a) {
						a.addEventListener("click", function (a) {
							if (e) return a.preventDefault(), !1;
						});
					}),
					a.addEventListener("mousedown", function (f) {
						b = !0;
						c = f.clientX;
						d = a.scrollLeft;
						e = !1;
						a &&
							((a.style.cursor = "grabbing"), a.classList.add("ob-grabbing"));
					}),
					(g = function () {
						b &&
							((b = !1),
							a && ((a.style.cursor = ""), a.classList.remove("ob-grabbing")),
							(a.scrollLeft = a.scrollLeft),
							(e = a.scrollLeft !== d));
					}),
					a.addEventListener("mouseup", g),
					a.addEventListener("mouseleave", g),
					a.addEventListener("mousemove", function (f) {
						b && (a.scrollLeft = d + (c - f.clientX));
					}),
					window.OBR.b.M(
						"\n  .ob-grabbing {\n    scroll-behavior: auto !important;\n  }\n  .ob-grabbing a {\n    cursor: grabbing !important;\n    scroll-snap-align: none !important;\n  }\n  .ob-grabbing > * {\n    scroll-snap-align: none !important;\n  }\n  .ob-grabbing img {\n    -webkit-user-drag: none;\n    -khtml-user-drag: none;\n    -moz-user-drag: none;\n    -o-user-drag: none;\n    user-drag: none;\n  }\n  "
					));
			}
		};
		Sb = function (a, b) {
			this.s = a;
			this.A = b;
			this.c = window.OBR.f.ni + "logger/v1/widget/";
			this.o = this.s.m("req_id", -1) + new Date().getTime();
			this.i = !0;
		};
		ca =
			"function" == typeof Object.defineProperties
				? Object.defineProperty
				: function (a, b, c) {
						a != Array.prototype && a != Object.prototype && (a[b] = c.value);
				  };
		u =
			"undefined" != typeof window && window === this
				? this
				: "undefined" != typeof window.global && null != window.global
				? window.global
				: this;
		ba = (function () {
			var a = 0;
			return function (b) {
				return "jscomp_symbol_" + (b || "") + a++;
			};
		})();
		x("Promise", function (a) {
			function b(a) {
				this.i = 0;
				this.J = void 0;
				this.c = [];
				var b = this.o();
				try {
					a(b.resolve, b.reject);
				} catch (k) {
					b.reject(k);
				}
			}
			function c() {
				this.c = null;
			}
			function d(a) {
				return a instanceof b
					? a
					: new b(function (b) {
							b(a);
					  });
			}
			if (a) return a;
			c.prototype.i = function (a) {
				null == this.c && ((this.c = []), this.A());
				this.c.push(a);
			};
			c.prototype.A = function () {
				var a = this;
				this.o(function () {
					a.V();
				});
			};
			var e = u.setTimeout;
			c.prototype.o = function (a) {
				e(a, 0);
			};
			c.prototype.V = function () {
				for (; this.c && this.c.length; ) {
					var a = this.c;
					this.c = [];
					for (var b = 0; b < a.length; ++b) {
						var c = a[b];
						a[b] = null;
						try {
							c();
						} catch (l) {
							this.J(l);
						}
					}
				}
				this.c = null;
			};
			c.prototype.J = function (a) {
				this.o(function () {
					throw a;
				});
			};
			b.prototype.o = function () {
				function a(a) {
					return function (f) {
						c || ((c = !0), a.call(b, f));
					};
				}
				var b = this,
					c = !1;
				return { resolve: a(this.Eb), reject: a(this.A) };
			};
			b.prototype.Eb = function (a) {
				if (a === this)
					this.A(new TypeError("A Promise cannot resolve to itself"));
				else if (a instanceof b) this.Gc(a);
				else {
					a: switch (typeof a) {
						case "object":
							var c = null != a;
							break a;
						case "function":
							c = !0;
							break a;
						default:
							c = !1;
					}
					c ? this.Ya(a) : this.V(a);
				}
			};
			b.prototype.Ya = function (a) {
				var b = void 0;
				try {
					b = a.then;
				} catch (k) {
					this.A(k);
					return;
				}
				"function" == typeof b ? this.Hc(b, a) : this.V(a);
			};
			b.prototype.A = function (a) {
				this.ca(2, a);
			};
			b.prototype.V = function (a) {
				this.ca(1, a);
			};
			b.prototype.ca = function (a, b) {
				if (0 != this.i)
					throw Error(
						"Cannot settle(" +
							a +
							", " +
							b +
							"): Promise already settled in state" +
							this.i
					);
				this.i = a;
				this.J = b;
				this.wa();
			};
			b.prototype.wa = function () {
				if (null != this.c) {
					for (var a = 0; a < this.c.length; ++a) g.i(this.c[a]);
					this.c = null;
				}
			};
			var g = new c();
			b.prototype.Gc = function (a) {
				var b = this.o();
				a.xe(b.resolve, b.reject);
			};
			b.prototype.Hc = function (a, b) {
				var c = this.o();
				try {
					a.call(b, c.resolve, c.reject);
				} catch (l) {
					c.reject(l);
				}
			};
			b.prototype.then = function (a, c) {
				function f(a, b) {
					return "function" == typeof a
						? function (b) {
								try {
									d(a(b));
								} catch (y) {
									g(y);
								}
						  }
						: b;
				}
				var d,
					g,
					e = new b(function (a, b) {
						d = a;
						g = b;
					});
				this.xe(f(a, d), f(c, g));
				return e;
			};
			b.prototype.catch = function (a) {
				return this.then(void 0, a);
			};
			b.prototype.xe = function (a, b) {
				function c() {
					switch (f.i) {
						case 1:
							a(f.J);
							break;
						case 2:
							b(f.J);
							break;
						default:
							throw Error("Unexpected state: " + f.i);
					}
				}
				var f = this;
				null == this.c ? g.i(c) : this.c.push(c);
			};
			b.resolve = d;
			b.reject = function (a) {
				return new b(function (b, c) {
					c(a);
				});
			};
			b.race = function (a) {
				return new b(function (b, c) {
					for (var f = OBR._jsc.w(a), g = f.next(); !g.done; g = f.next())
						d(g.value).xe(b, c);
				});
			};
			b.all = function (a) {
				var c = OBR._jsc.w(a),
					f = c.next();
				return f.done
					? d([])
					: new b(function (a, b) {
							function g(b) {
								return function (c) {
									e[b] = c;
									h--;
									0 == h && a(e);
								};
							}
							var e = [],
								h = 0;
							do
								e.push(void 0),
									h++,
									d(f.value).xe(g(e.length - 1), b),
									(f = c.next());
							while (!f.done);
					  });
			};
			return b;
		});
		var Tb;
		if ("function" == typeof Object.setPrototypeOf) Tb = Object.setPrototypeOf;
		else {
			var Ub;
			a: {
				var Vb = { Xo: !0 },
					Wb = {};
				try {
					Wb.__proto__ = Vb;
					Ub = Wb.Xo;
					break a;
				} catch (a) {}
				Ub = !1;
			}
			Tb = Ub
				? function (a, b) {
						a.__proto__ = b;
						if (a.__proto__ !== b)
							throw new TypeError(a + " is not extensible");
						return a;
				  }
				: null;
		}
		OBR._jsc.Xb = Tb;
		fa.prototype.ca = function (a) {
			this.J = a;
		};
		fa.prototype.return = function (a) {
			this.o = { return: a };
			this.c = this.wa;
		};
		OBR._jsc.Yb =
			"function" == typeof Object.create
				? Object.create
				: function (a) {
						function b() {}
						b.prototype = a;
						return new b();
				  };
		x("Array.prototype.find", function (a) {
			return a
				? a
				: function (a, c) {
						a: {
							var b = this;
							b instanceof String && (b = String(b));
							for (var e = b.length, g = 0; g < e; g++) {
								var f = b[g];
								if (a.call(c, f, g, b)) {
									a = f;
									break a;
								}
							}
							a = void 0;
						}
						return a;
				  };
		});
		x("String.prototype.startsWith", function (a) {
			return a
				? a
				: function (a, c) {
						var b = ta(this, a, "startsWith"),
							e = b.length,
							g = a.length;
						c = Math.max(0, Math.min(c | 0, b.length));
						for (var f = 0; f < g && c < e; ) if (b[c++] != a[f++]) return !1;
						return f >= g;
				  };
		});
		var Zb =
			"function" == typeof Object.assign
				? Object.assign
				: function (a, b) {
						for (var c = 1; c < arguments.length; c++) {
							var d = arguments[c];
							if (d)
								for (var e in d)
									Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
						}
						return a;
				  };
		x("Object.assign", function (a) {
			return a || Zb;
		});
		x("Object.is", function (a) {
			return a
				? a
				: function (a, c) {
						return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c;
				  };
		});
		x("Array.prototype.includes", function (a) {
			return a
				? a
				: function (a, c) {
						var b = this;
						b instanceof String && (b = String(b));
						var e = b.length;
						c = c || 0;
						for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
							var g = b[c];
							if (g === a || Object.is(g, a)) return !0;
						}
						return !1;
				  };
		});
		x("String.prototype.includes", function (a) {
			return a
				? a
				: function (a, c) {
						return -1 !== ta(this, a, "includes").indexOf(a, c || 0);
				  };
		});
		x("String.prototype.endsWith", function (a) {
			return a
				? a
				: function (a, c) {
						var b = ta(this, a, "endsWith");
						void 0 === c && (c = b.length);
						c = Math.max(0, Math.min(c | 0, b.length));
						for (var e = a.length; 0 < e && 0 < c; )
							if (b[--c] != a[--e]) return !1;
						return 0 >= e;
				  };
		});
		x("Array.prototype.entries", function (a) {
			return a
				? a
				: function () {
						return ua(this, function (a, c) {
							return [a, c];
						});
				  };
		});
		x("Array.from", function (a) {
			return a
				? a
				: function (a, c, d) {
						v();
						c =
							null != c
								? c
								: function (a) {
										return a;
								  };
						var b = [],
							g = a[window.Symbol.iterator];
						if ("function" == typeof g)
							for (a = g.call(a); !(g = a.next()).done; )
								b.push(c.call(d, g.value));
						else {
							g = a.length;
							for (var f = 0; f < g; f++) b.push(c.call(d, a[f]));
						}
						return b;
				  };
		});
		Function.prototype.bind ||
			(Function.prototype.bind = function (a) {
				function b() {
					return e.apply(
						this instanceof c ? this : a,
						d.concat(Array.prototype.slice.call(arguments))
					);
				}
				function c() {}
				if ("function" !== typeof this)
					throw new TypeError(
						"Function.prototype.bind - what is trying to be bound is not callable"
					);
				var d = Array.prototype.slice.call(arguments, 1),
					e = this;
				this.prototype && (c.prototype = this.prototype);
				b.prototype = new c();
				return b;
			});
		window.NodeList &&
			!window.NodeList.prototype.forEach &&
			(window.NodeList.prototype.forEach = function (a, b) {
				b = b || window;
				for (var c = 0; c < this.length; c++) a.call(b, this[c], c, this);
			});
		(function () {
			if (!window.btoa) {
				var a = {
					re: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
					encode: function (b) {
						var c = "",
							d = 0;
						for (b = a.Vo(b); d < b.length; ) {
							var e = b.charCodeAt(d++);
							var g = b.charCodeAt(d++);
							var f = b.charCodeAt(d++);
							var h = e >> 2;
							e = ((e & 3) << 4) | (g >> 4);
							var k = ((g & 15) << 2) | (f >> 6);
							var l = f & 63;
							(0, window.isNaN)(g)
								? (k = l = 64)
								: (0, window.isNaN)(f) && (l = 64);
							c =
								c +
								this.re.charAt(h) +
								this.re.charAt(e) +
								this.re.charAt(k) +
								this.re.charAt(l);
						}
						return c;
					},
					Vo: function (a) {
						a = a.replace(/\r\n/g, "\n");
						for (var b = "", d = 0; d < a.length; d++) {
							var e = a.charCodeAt(d);
							128 > e
								? (b += String.fromCharCode(e))
								: (127 < e && 2048 > e
										? (b += String.fromCharCode((e >> 6) | 192))
										: ((b += String.fromCharCode((e >> 12) | 224)),
										  (b += String.fromCharCode(((e >> 6) & 63) | 128))),
								  (b += String.fromCharCode((e & 63) | 128)));
						}
						return b;
					},
				};
				window.btoa = function (b) {
					return a.encode(b);
				};
			}
		})();
		(function () {
			function a(a, b) {
				for (var c = e.length, f; c--; )
					(f = e[c]),
						f.entryType != a || (void 0 !== b && f.name != b) || e.splice(c, 1);
			}
			function b(a, b) {
				for (var c = 0, f = e.length, d = []; c < f; c++)
					e[c][a] == b && d.push(e[c]);
				return d;
			}
			var c = Date.now ? Date.now() : +new Date(),
				d = window.performance || {},
				e = [],
				g = {};
			d.now ||
				(d.now =
					d.webkitNow ||
					d.c ||
					d.i ||
					function () {
						return (Date.now ? Date.now() : +new Date()) - c;
					});
			d.mark ||
				(d.mark =
					d.ca ||
					function (a) {
						var b = {
							name: a,
							entryType: "mark",
							startTime: d.now(),
							duration: 0,
						};
						e.push(b);
						g[a] = b;
					});
			d.measure ||
				(d.measure =
					d.wa ||
					function (a, b, c) {
						var f, h;
						g[b] ? (f = g[b].startTime) : (f = 0);
						g[c] ? (h = g[c].startTime) : (h = d.now());
						e.push({
							name: a,
							entryType: "measure",
							startTime: f,
							duration: h - f,
						});
					});
			d.getEntriesByType ||
				(d.getEntriesByType =
					d.V ||
					function (a) {
						return b("entryType", a);
					});
			d.getEntriesByName ||
				(d.getEntriesByName =
					d.J ||
					function (a) {
						return b("name", a);
					});
			d.clearMarks ||
				(d.clearMarks =
					d.o ||
					function (b) {
						a("mark", b);
					});
			d.clearMeasures ||
				(d.clearMeasures =
					d.A ||
					function (b) {
						a("measure", b);
					});
			window.performance = d;
		})();
		(function (a) {
			a.forEach(function (a) {
				a.hasOwnProperty("remove") ||
					Object.defineProperty(a, "remove", {
						configurable: !0,
						enumerable: !0,
						writable: !0,
						value: function () {
							null !== this.parentNode && this.parentNode.removeChild(this);
						},
					});
			});
		})(
			[window.Element, window.CharacterData, window.DocumentType]
				.filter(function (a) {
					return !!a;
				})
				.map(function (a) {
					return a.prototype;
				})
		);
		if (window.OB_releaseVer && "1050163" !== window.OB_releaseVer) throw !0;
		window.OB_releaseVer = "1050163";
		window.OBR = window.OBR || {};
		window.OBR.u = window.OBR.u || [];
		window.OBR.Yc = window.OBR.Yc || {};
		window.OBR$ = function (a) {
			return window.document.getElementById(a);
		};
		var $b = /^(http[s]{0,1}):\/\/([^\/]*)outbrain(img){0,1}\.com/i,
			A = {
				ue: window.performance,
				marks: [],
				eu: [],
				Dj: function (a, b) {
					a = this.Ej(a, b);
					this.ue.mark(a);
					this.marks.push(a);
					return a;
				},
				Ej: function (a, b) {
					return "ob-mark-" + (b ? "0-" : "1-") + a;
				},
				measure: function (a, b, c) {
					var d = "ob-measure-" + a,
						e = Array.prototype.slice.call(arguments);
					e.shift();
					e.unshift(d);
					this.eu.push(d);
					this.ue.measure.apply(this.ue, e);
					return d;
				},
				bd: function (a) {
					return this.Dj(a, !0);
				},
				Nc: function (a) {
					return this.Dj(a);
				},
				Sc: function (a, b) {
					var c = this.Ej(a, b);
					return this.marks.find(function (a) {
						return a === c;
					});
				},
				Yx: function () {
					var a = [],
						b = this.ue.getEntriesByType("measure");
					b &&
						0 < b.length &&
						(a = b.filter(function (a) {
							return a.name.startsWith("ob-measure-");
						}));
					return a;
				},
				ds: function () {
					return window.performance
						.getEntriesByType("resource")
						.filter(function (a) {
							return $b.test(a.name);
						});
				},
			};
		window.OBR.Performance = window.OBR.Performance || A;
		var ac = {
			ma: {
				yo: "start",
				fo: "c_search",
				cg: "c_found",
				Zf: "odb",
				ij: "mv",
				xo: "odb_r",
				wo: "mv_r",
				Ng: "render",
				Ao: "rendered",
				ko: "fchunk_rendered",
				lo: "fchunk_mv_rendered",
				zo: "mv_rendered",
				jj: "card_observed",
			},
			te: { start: void 0, dh: void 0 },
			xx: [],
			pa: function (a, b, c, d) {
				return a + "-" + b + "-" + c + (d ? "_" + d : "");
			},
			$x: function () {
				return A.ds();
			},
			Zt: function () {
				this.te.start = A.bd(this.ma.yo);
			},
			Vt: function () {
				this.te.dh || (this.te.dh = A.bd(this.ma.fo));
			},
			Ut: function (a, b) {
				return A.Nc(this.pa(this.ma.cg, a, b));
			},
			pm: function (a, b) {
				var c = this.pa(this.ma.cg, a, b);
				a = this.Ut(a, b);
				A.measure(c, a);
			},
			Yt: function (a, b) {
				return A.bd(this.pa(this.ma.Zf, a, b));
			},
			Wt: function (a, b, c) {
				return A.bd(this.pa(this.ma.ij, a, b, c));
			},
			cu: function (a, b) {
				var c = this.pa(this.ma.Zf, a, b),
					d = A.Sc(this.pa(this.ma.cg, a, b));
				a = this.Yt(a, b);
				A.measure(c, d, a);
			},
			au: function (a, b, c) {
				var d = this.pa(this.ma.wo, a, b, c);
				a = A.Sc(this.pa(this.ma.ij, a, b, c), !0);
				A.measure(d, a);
			},
			bu: function (a, b) {
				var c = this.pa(this.ma.xo, a, b);
				a = A.Sc(this.pa(this.ma.Zf, a, b), !0);
				b = A.Nc(c);
				A.measure(c, a, b);
			},
			om: function (a, b, c) {
				return A.bd(this.pa(this.ma.Ng, a, b, c));
			},
			Kn: function (a, b, c) {
				return this.om(a, b, c);
			},
			du: function (a, b, c) {
				var d = this.pa(this.ma.Ao, a, b, c);
				a = A.Sc(this.pa(this.ma.Ng, a, b, c), !0);
				b = A.Nc(d);
				A.measure(d, a, b);
			},
			qy: function (a, b, c) {
				a = this.pa(this.ma.ko, a, b, c);
				b = A.Nc(a);
				A.measure(a, this.te.dh, b);
			},
			rm: function (a, b, c) {
				c = this.pa(this.ma.zo, a, b, c);
				a = A.Sc(this.pa(this.ma.jj, a, b), !0);
				b = A.Nc(c);
				A.measure(c, a, b);
			},
			qm: function (a, b, c) {
				var d = this.pa(this.ma.lo, a, b, c);
				a = A.Sc(this.pa(this.ma.Ng, a, b, c), !0);
				b = A.Nc(d);
				A.measure(d, a, b);
			},
			$t: function (a, b) {
				a = this.pa(this.ma.jj, a, b);
				b = A.bd(a);
				A.measure(a, b);
			},
		};
		window.OBR.ta = window.OBR.ta || ac;
		(function (a) {
			function b() {
				this.v();
			}
			var c = a,
				d,
				e;
			b.prototype.v = function (b) {
				c = b || a;
				d = [];
				e = new Date().getTime();
			};
			b.prototype.startTime = function () {
				return e;
			};
			b.prototype.log = function (a) {
				var b = (new Date().getTime() - e) / 1e3;
				1e3 > d.length && d.push(b + " >" + a);
			};
			b.prototype.printLog = function () {
				if (c.f.Xs) window.console.log(d.join("\n"));
				else {
					var a = c.b.Oe();
					a && ((a.innerHTML = d.join("<br>")), (a.style.display = "block"));
				}
				return d.join("\n");
			};
			a.h = a.h || new b();
			a.printLog = a.h.printLog;
		})(window.OBR);
		va.prototype.add = function (a, b) {
			if ("string" === typeof a && "function" === typeof b) {
				var c = {};
				c.name = a;
				c.xd = b;
				this.c.push(c);
			}
		};
		va.prototype.D = function (a, b, c, d) {
			b = b || [];
			c = !!c;
			this.i || window.OBR.ql.dr(a, d);
			window.OBR.h.log("event fire:" + a);
			for (var e = 0, g = this.c.length; e < g; e += 1) {
				d = this.c && this.c[e] ? this.c[e].name : "";
				var f = this.c && this.c[e] ? this.c[e].xd : null;
				if (d === a && f)
					try {
						f.apply(this, b);
					} catch (h) {
						window.OBR.h.log("fire event *" + a + "* error: " + h),
							window.OBR.error(h);
					}
			}
			!0 === c && wa(this, a);
		};
		va.prototype.nc = function () {
			this.c = [];
		};
		window.OBR.Ea = va;
		(function (a, b, c) {
			function d() {
				h = {};
			}
			function e(b) {
				b && b.event && "function" === typeof b.func
					? g(b).forEach(function (a) {
							c.add(b.event + "_" + a, b.func);
							h[b.event] = !0;
					  })
					: a.h.log("Bad global event" + b);
			}
			function g(b) {
				b = b.widgetId;
				var c = [];
				b && ("string" === typeof b ? (c = [b]) : Array.isArray(b) && (c = b));
				a.h.log("global event widget ids: " + c);
				return c;
			}
			var f = {
					onHtmlReturn: "widgetDataReturned",
					afterRender: "widgetRendered",
				},
				h;
			d.prototype.v = function (f, d, g) {
				a = f;
				b = d;
				c = g;
				c.i = !0;
				h = {};
			};
			d.prototype.dr = function (a, d) {
				a = f[a];
				if (d && a) {
					var g = b.OBREvents;
					if (g && !(1 > g.length))
						for (var k = 0, l = g.length; k < l; k += 1) e(g.shift());
					h[a] &&
						c.D(a + "_" + d.H(), [
							{
								idx: d.B(),
								widgetId: d.H(),
								widgetJsId: d.m("widgetJsId", d.H()),
								container: window.OBR.b.w(d.B()),
								recsNumber: d.m("tcr", -1),
								variantId: d.m("abTestVal", ""),
							},
						]);
				}
			};
			d.prototype.ea = function () {
				this.v(window.OBR, window, new window.OBR.Ea());
			};
			window.OBR.ql = new d();
		})(window.OBR, window, new window.OBR.Ea());
		window.OBR.b =
			window.OBR.b ||
			(function () {
				var a = {},
					b = {},
					c = window.document,
					d = window.OBR,
					e = null;
				a.dy = "function" === typeof window.URLSearchParams;
				b.ia = function () {
					a.Ib = d;
					return a;
				};
				b.v = function (a) {
					d = a;
				};
				b.oc = function () {
					return function () {};
				};
				b.zt = function () {
					var a = " -webkit- -moz- -o- -ms- ".split(" ");
					return "ontouchstart" in window ||
						(window.DocumentTouch &&
							window.document instanceof window.DocumentTouch)
						? !0
						: window.matchMedia(
								["(", a.join("touch-enabled),("), "heartz)"].join("")
						  ).matches;
				};
				b.Tk = function () {
					var a = window.OBR.W.Ha();
					return a.width > a.height ? "landscape" : "portrait";
				};
				b.wl = function () {
					var a = window.jQuery;
					return void 0 !== a
						? !(
								/1\.(0|1|2|3|4)\.(0|1)/.test(a.fn.jquery) ||
								/^1\.1/.test(a.fn.jquery) ||
								/^1\.2/.test(a.fn.jquery) ||
								/^1\.3/.test(a.fn.jquery)
						  )
						: !1;
				};
				b.w = function (a) {
					return null === a || (0, window.isNaN)(a)
						? null
						: d.Z("outbrain_widget_" + a);
				};
				b.Oe = function () {
					return d.Z("ob_holder");
				};
				b.fk = function (a) {
					var c = b.Oe();
					null === c &&
						((c = d.b.createElement("div", "ob_holder")),
						(c.style.display = "none"),
						a ? d.b.insertBefore(c, a) : window.document.body.appendChild(c));
					return c;
				};
				b.Cl = function (a, c) {
					var f = d.Z(a);
					f ||
						((f = d.b.createElement("iframe", a)),
						(a = f.style),
						(a.display = "none"),
						(a.width = "1px"),
						(a.height = "1px"),
						(f.src = c || "about:blank"),
						(c = b.Oe()) || (c = b.pc()),
						d.b.hb(f, c));
				};
				b.pc = function () {
					if (c.body) return c.body;
					var a;
					var b = d.b.Ga("", "", "body", !0);
					0 >= b.length ? (a = c.lastChild) : (a = b[0]);
					return a;
				};
				b.createElement = function (a, b, d, e) {
					var f;
					a = c.createElement(a);
					"string" === typeof b && a.setAttribute("id", b);
					"string" === typeof d && (a.style.cssText = d);
					for (f in e) e.hasOwnProperty(f) && a.setAttribute(f, e[f]);
					return a;
				};
				b.M = function (a) {
					if (d.f.jc === d.f.sj)
						try {
							c.createStyleSheet().cssText = a;
						} catch (k) {
							window.OBR.h.log(k);
						}
					else {
						var b = c.createElement("style"),
							g = c.body
								? "string" === typeof c.body.style.WebkitAppearance
								: !1;
						b.type = "text/css";
						c.getElementsByTagName("head")[0].appendChild(b);
						b[g ? "innerText" : "innerHTML"] = a;
					}
				};
				b.xa = function (a, b, e, k, l) {
					a = c.createElement("script");
					a.type = d.f.Gt;
					a.src = b;
					a.charset = "UTF-8";
					a.async = !!e;
					a.defer = !1;
					k &&
						d.b.ba(a, "load", function (a) {
							var b = a.target;
							b &&
								(0, window.setTimeout)(function () {
									b.parentNode.removeChild(b);
								}, 3e3);
						});
					typeof l === d.f.xd && d.b.ba(a, "load", l);
					return a;
				};
				b.Fx = function (a, b) {
					a = d.b.createElement("link", a);
					a.setAttribute("rel", "stylesheet");
					a.setAttribute("type", d.f.Jq);
					b && a.setAttribute("href", b);
					return a;
				};
				b.Rp = function (a) {
					var b = d.Z("ob_iframe");
					b && (b.src = a);
				};
				b.vi = function (a) {
					a = (0, window.isNaN)(a) ? 1e5 : a;
					return Math.floor(Math.random() * a);
				};
				b.fv = function (a, b, c) {
					return a.replace(b, c);
				};
				b.Ca = function (a) {
					var b = c.getElementsByTagName("head");
					try {
						if (b && 0 < b.length) b[0].appendChild(a);
						else {
							var g = c.getElementsByTagName("script");
							g[0].insertBefore(a, g[0].firstChild);
						}
					} catch (k) {
						d.h.log("Err insertToHead:" + k);
					}
				};
				b.Zx = function (a) {
					a = a || window.OBR;
					return "function" !== typeof a.Ea
						? (window.OBR.h.log("namespace.EventManager not function"), null)
						: new a.Ea();
				};
				b.na = function (a) {
					return (0, window.encodeURIComponent)(a);
				};
				b.Wc = function (a) {
					return null !== a;
				};
				b.Ec = function (a) {
					var b = window.document.createElement("div");
					b.innerHTML = a;
					return b.firstChild;
				};
				b.tt = function (a) {
					var c = !1;
					if (b.Id(a)) return !1;
					var g = a.Qb().recMode || "";
					a = a.Qb().dynamicWidgetLayout || "";
					g = d.f.kv[g] || "";
					"2" === g && "1" === (d.f.lv[a] || "") && (c = !0);
					c || ("1" !== g && "3" !== g) || (c = !0);
					return c;
				};
				b.Id = function (a) {
					return void 0 === a || null === a;
				};
				b.Bt = function (a) {
					return b.Id(a) || "" === a;
				};
				b.getElementsByClassName = function (a, c) {
					c || (c = window.document);
					return c.getElementsByClassName
						? c.getElementsByClassName(a)
						: b.Ga("class", a, "*", !0, !0, c);
				};
				b.Ga = function (a, f, d, e, l, m) {
					var g;
					var h = [];
					d = d || "*";
					e = !!e;
					l = !!b.Bt(l);
					d = m ? m.getElementsByTagName(d) : c.getElementsByTagName(d);
					m = 0;
					for (g = d.length; m < g; m += 1) {
						var k = "class" === a ? d[m].className : d[m].getAttribute(a);
						null !== k &&
							(!1 === l && ((k = k.toLowerCase()), (f = f.toLowerCase())),
							(k = "" === a ? !0 : e ? -1 < k.indexOf(f) : k === f) &&
								h.push(d[m]));
					}
					return h;
				};
				b.rb = function (a, b, c) {
					a.removeEventListener
						? a.removeEventListener(b, c, !0)
						: a.detachEvent && a.detachEvent("on" + b, c);
				};
				b.ba = function (a, b, c) {
					a.addEventListener
						? a.addEventListener(b, c, !0)
						: a.attachEvent &&
						  typeof a.attachEvent === d.f.xd &&
						  a.attachEvent("on" + b, function () {
								c.call(a);
						  });
				};
				b.hb = function (a, b) {
					try {
						b.appendChild(a);
					} catch (h) {
						d.h.log("Fail insert into Dom:" + h);
					}
				};
				b.Cf = function (a) {
					a = d.Z(a);
					!b.Id(a) && b.Wc(a.parentNode) && a.parentNode.removeChild(a);
				};
				b.Ac = function (a) {
					a && window.OBR.b.Wc(a.parentNode) && a.parentNode.removeChild(a);
				};
				b.insertBefore = function (a, b) {
					return b && b.parentNode ? b.parentNode.insertBefore(a, b) : null;
				};
				b.isArray = function (a) {
					return a instanceof Array
						? !0
						: "[object Array]" === Object.prototype.toString.call(a);
				};
				b.ub = function (a, b) {
					var c = /^htt(p|ps)?:\/\/127\.0\.0\.1(:\d\d\d\d)?(\/|$)/i,
						d = /^https?:\/\/simulator\.[\w]*\.service\.[\w]*\.consul/i;
					return /^htt(p|ps)?:\/\/([\w\-]*|[\w\-]*\.[\w\-]*)\.outbrain\.com(:\d\d\d\d)?(\/|$)/i.test(
						a
					) ||
						c.test(a) ||
						d.test(a)
						? a
						: b;
				};
				b.Nw = function (a) {
					a = a.replace(/^(\s*)/g, "");
					var b = c.createElement("div");
					b.innerHTML = a;
					return b.childNodes;
				};
				b.ga = function (a, b) {
					return a ? a.getAttribute(b) : null;
				};
				b.Za = function (a, b, c) {
					a && a.setAttribute(b, c);
				};
				b.$u = function (a) {
					a && a.removeAttribute("noscroll");
				};
				b.vl = function (a, b) {
					return new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className);
				};
				b.R = function (a, b) {
					var c = new RegExp("[ '\"|]" + b + "[ '\"|]");
					a && !c.test("|" + a.className + "|") && (a.className += " " + b);
				};
				b.X = function (a, b) {
					a &&
						typeof b === d.f.Pi &&
						(a.classList
							? a.classList.remove(b)
							: (a.className = a.className.replace(
									new RegExp("(^|\\b)" + b + "(\\b|$)", "gi"),
									" "
							  )));
				};
				b.Gb = function (a, b) {
					if (a && typeof b === d.f.Pi)
						if (a.classList) a.classList.toggle(b);
						else {
							var c = a.className.split(" "),
								f = c.indexOf(b);
							0 <= f ? c.splice(f, 1) : c.push(b);
							a.className = c.join(" ");
						}
				};
				b.S = function (a, b) {
					var c = window.OB_amp ? window.context : window;
					a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
					try {
						var d = new RegExp("[\\?&]" + a + "=([^&#]*)", "i");
						var f = d.exec(
							(0, window.decodeURIComponent)(
								c.location.href.replace(/\+/g, " ")
							)
						);
						return null === f ? b : f[1];
					} catch (m) {
						return b;
					}
				};
				b.pq = function (a) {
					"string" === typeof a &&
						0 < a.indexOf("#") &&
						(a = a.substr(0, a.lastIndexOf("#")));
					return a;
				};
				b.$j = function (a) {
					var b = d.f.Ra + "/strip_default.png";
					a.src !== b &&
						((a.alt = ""),
						(a.title = ""),
						(a.src = b),
						a.parentElement && (a.parentElement.style.overflow = "hidden"));
				};
				b.Uq = function () {
					var a = null,
						b;
					if ("string" === typeof window.OB_MP_feed) a = window.OB_MP_feed;
					else if ((b = c.getElementsByTagName("head")) && 0 < b.length) {
						var d = b[0].getElementsByTagName("link");
						for (b = 0; b < d.length; b += 1) {
							var e = d[b];
							if (
								null !== e.type &&
								("application/rss+xml" === e.type ||
									"application/atom+xml" === e.type) &&
								null !== e.href &&
								"" !== e.href
							) {
								a = e.href;
								break;
							}
						}
					}
					return a;
				};
				b.Wa = function (a, b) {
					var c = "";
					if (!a || !b) return c;
					window.getComputedStyle
						? (a = window.document.defaultView.getComputedStyle(a, null)) &&
						  (c = a.getPropertyValue(b))
						: a.currentStyle &&
						  ((b = b.replace(/\-(\w)/g, function (a, b) {
								return b.toUpperCase();
						  })),
						  (c = a.currentStyle[b]));
					return c;
				};
				b.Pt = function (a) {
					if (!a) return null;
					if (window.getComputedStyle)
						var b = window.document.defaultView.getComputedStyle(a, null);
					else if (a.currentStyle) var c = a.currentStyle;
					return function (d) {
						var f = null;
						b
							? (f = b.getPropertyValue(d))
							: c &&
							  ((d = d.replace(/\-(\w)/g, function (a, b) {
									return b.toUpperCase();
							  })),
							  (f = a.currentStyle[d]));
						return f;
					};
				};
				b.Bv = function () {
					var a = b.Oe();
					if (b.Wc(a)) {
						var c = d.b.createElement("span", "ob_a");
						b.insertBefore(c, a);
						c.innerHTML = ".";
						var e = b.Wa(c, "color");
						b.Cf("ob_a");
						c = d.b.createElement("a", "ob_a");
						c.setAttribute("href", "void(0)");
						c.innerHTML = ".";
						b.insertBefore(c, a);
						a = b.Wa(c, "color");
						b.Cf("ob_a");
						e = "rgb(0, 0, 0)" === e || "#000000" === e ? "#555" : e;
						b.M(
							".ob-tcolor{color:" +
								e +
								"} .ob-lcolor{color:" +
								a +
								"} .ob-bgtcolor{background-color:" +
								e +
								"} .item-link-container:hover .ob-tcolor{border-color:" +
								e +
								"} " +
								(window.document.addEventListener
									? ""
									: ".odb_li:hover .ob-zapping-icon,.odb_div:hover .ob-zapping-icon,.item-container:hover .ob-zapping-icon,.ob-dynamic-rec-container:hover .ob-zapping-icon,.odb_li:hover .ob-textual-zapping-icon,.odb_div:hover .ob-textual-zapping-icon,.item-container:hover .ob-textual-zapping-icon,.ob-dynamic-rec-container:hover .ob-textual-zapping-icon{display:none !important;}")
						);
					}
				};
				b.Zk = function (a) {
					var c = b.Ne("property", "og:url", "meta", "content");
					null === c && (c = b.Ne("rel", "canonical", "link", "href"));
					null !== c || a || (c = window.location.href);
					null === c && (c = "");
					return c;
				};
				b.Ne = function (a, c, d, e) {
					var f = null;
					a = b.Ga(a, c, d, !1);
					null !== a && 0 < a.length && (f = a[0].getAttribute(e));
					return f;
				};
				b.xm = function (a) {
					var c, e, g;
					var l = a.j("tracking", !1);
					var m = a.j("isDMPEnabled", !0) && !a.m("oo", !1);
					var n = a.j("filterDMP", "");
					var q = a.j("comScoreEnabled", !0);
					var p = a.m("pid", "");
					var t = a.Ve();
					var y = "",
						E = a.Gh(""),
						B = a.m("gdpr", "0") + "",
						C = d.f.ff && "1" === B;
					"" !== a.m("cnsnt", "") &&
						"" !== E &&
						(y = "&obcnsnt=" + E.toString());
					window.OBR.gd.result
						.then(function (f) {
							!1 === l &&
								(!0 === q || (!0 === m && !0 === f)) &&
								!1 === d.f.vm &&
								!t &&
								((m = m && f),
								(e = a.m("enu", "")),
								(g =
									d.f.Ra +
									"/widgetOBUserSync/obUserSync.html#pid=" +
									p +
									"&dmpenabled=" +
									m +
									"&filterDMP=" +
									n +
									"&csenabled=" +
									(q && !0) +
									"&d=" +
									e +
									y +
									"&gdpr=" +
									B +
									"&cmpNeeded=" +
									C),
								b.Cl(d.f.df, g),
								(c = d.Z(d.f.df))) &&
								(d.f.vm = !0);
						})
						.catch(function (a) {
							window.OBR.error(a);
						});
				};
				b.os = function () {
					var a = b.Ue(8);
					"string" === typeof window.name &&
					("" === window.name || -1 < window.name.indexOf("frame"))
						? ((window.name = a), (a = window.name))
						: "string" === typeof window.name &&
						  "" !== window.name &&
						  (a = window.name);
					return (a = d.b.na(a.substring(0, 9)));
				};
				b.Ue = function (a) {
					var b;
					var c = [];
					a = "number" === typeof a ? a : 8;
					for (b = 0; b < a; b += 1)
						c.push(
							"0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(
								Math.floor(61 * Math.random())
							)
						);
					return c.join("");
				};
				b.ek = function (a) {
					for (var b = "", c = 0; c < a.length; c++)
						b = b.concat(a[c] ? "1" : "0");
					return (0, window.parseInt)(b, 2);
				};
				b.sc = function (a) {
					if (
						null === a.offsetParent ||
						0 === a.offsetHeight ||
						0 === a.offsetWidth ||
						0 === a.clientHeight ||
						0 === a.clientWidth
					)
						return !1;
					var c = b.Pt(a);
					if ("none" === c("display") || "hidden" === c("visibility"))
						return !1;
					c =
						(0, window.parseInt)(c("padding-top"), 10) +
						(0, window.parseInt)(c("padding-bottom"), 10);
					return 0 === a.clientHeight - c
						? !1
						: (a = a.getElementsByTagName("a")[0]) &&
						  "none" === b.Wa(a, "display")
						? !1
						: !0;
				};
				b.ey = function (a) {
					a &&
						a.style &&
						(a.style.cssText =
							"display:none; height:0px; width:0px; border:none;");
				};
				b.Uf = function (a) {
					return a && 70 >= a.length ? a : "";
				};
				b.Bh = function (a) {
					for (var b in d.Yc)
						if (d.Yc.hasOwnProperty(b) && d.Yc[b].C === a) return d.Yc[b];
					return null;
				};
				b.ly = function (a) {
					for (var b in a) if (a.hasOwnProperty(b)) return !1;
					return !0;
				};
				b.Ys = function (a, b) {
					for (b = b.parentNode; null !== b; ) {
						if (b === a) return !0;
						b = b.parentNode;
					}
					return !1;
				};
				b.Oc = function (a, b) {
					return "function" !== typeof a ? null : void 0 === b ? a() : a(b);
				};
				b.iy = function () {
					return "Microsoft Internet Explorer" === window.navigator.appName;
				};
				b.Lq = function (a, b) {
					return a * b;
				};
				b.Uk = function (a) {
					if (!a || "" === a) return [];
					a = a
						.replace("", "")
						.replace("http://", "")
						.replace("https://", "")
						.replace("www.", "")
						.replace("www2.", "")
						.split("/");
					a.pop();
					return 0 < a.length ? a : [];
				};
				b.Cr = function (a, c) {
					a = b.Uk(a);
					var d = [],
						f;
					if (c >= a.length) c = a.join(".");
					else {
						d[0] = a[0];
						for (f = 1; f <= c; f += 1) d[f] = a[f];
						c = d.join(".");
					}
					return c;
				};
				b.Wr = function () {
					return "http" + ("https:" === c.location.protocol ? "s" : "");
				};
				b.Bl = function (a, b) {
					b.parentNode.insertBefore(a, b.nextSibling);
				};
				b.Ur = function () {
					var a = c.getElementById("widgetVersionSync");
					if (null === a) {
						a = b.createElement("iframe", "widgetVersionSync");
						var d = b.createElement(
							"div",
							null,
							"display:none; height:0px; width:0px; border:none;"
						);
						d.appendChild(a);
						b.pc().appendChild(d);
					}
					return a;
				};
				b.lx = function (a) {
					var c = window.OB_releaseVer;
					(0, window.isNaN)(c) ||
						(0, window.isNaN)(a) ||
						c >= a ||
						((a =
							b.Wr() +
							"://widgets.outbrain.com/external/sync/outbrainjs.html?needToBeVer=" +
							a.toString()),
						(b.Ur().src = a));
				};
				b.op = function (a) {
					a = a.j("widgetVersionSync", 0);
					(0, window.isNaN)(a) ||
						"" === a ||
						((a = (0, window.parseInt)(a, 10) || 0), b.lx(a));
				};
				a.Hh = function () {
					if (e) return e;
					try {
						var a = window.localStorage;
						a.setItem("OBtst", "");
						a.removeItem("OBtst");
						var b = a;
					} catch (h) {
						b = {
							Pf: {},
							setItem: function (a, b) {
								this.Pf[a] = b;
							},
							removeItem: function (a) {
								this.Pf[a] = void 0;
							},
							getItem: function (a) {
								return "undefined" !== typeof this.Pf[a] ? this.Pf[a] : null;
							},
						};
					}
					return (e = b);
				};
				b.Pa = function (b, c) {
					a.Hh().setItem(b, c);
				};
				b.Zr = function () {
					var a = Math.round(16777215 * Math.random());
					return (
						"rgb(" +
						(a >> 16) +
						", " +
						((a >> 8) & 255) +
						", " +
						(a & 255) +
						")"
					);
				};
				b.ha = function (b, c) {
					b = a.Hh().getItem(b);
					return null !== b ? b : c;
				};
				b.De = function (b) {
					a.Hh().removeItem(b);
				};
				b.cx = function (a) {
					var b = {};
					b.cpv = a[0];
					b.convPerc = a[1];
					b.convPixel = a[2];
					b.vidId = a[3];
					b.player = a[4];
					b.pos = a[5];
					b.adId = a[6];
					b.docEncId = a[7];
					b.origUrl = a[8];
					b.trafficUrl = a[9];
					b.duration = a[10];
					b.widgetIdx = a[11];
					b.title = a[12];
					b.sourceName = a[13];
					b.reqId = a[14];
					b.platform = a[15];
					b.lang = a[16];
					b.uuid = a[17];
					b.publisherId = a[18];
					b.sourceId = a[19];
					b.widgetNumberId = a[20];
					b.campaignId = a[21];
					b.location = a[22];
					b.timestamp = a[23];
					return b;
				};
				b.assign = function (a, b) {
					for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
					return a;
				};
				b.ct = function (a) {
					var c = !1;
					b.Id(a) || (c = a.nodeName && "span" === a.nodeName.toLowerCase());
					return c;
				};
				b.gr = function (a, b) {
					if ("_blank" === (b.getAttribute("target") || "_self"))
						for (var c in a)
							d.b.Wb(
								"obm-firePixelBeforeRedirect",
								"pixel fired before redirect",
								!1,
								10
							),
								(b = window.document.createElement("img")),
								b.setAttribute("src", a[c]),
								b.setAttribute("height", "1"),
								b.setAttribute("width", "1"),
								window.document.body.appendChild(b);
					else
						d.b.Wb(
							"obm-firePixelBeforeRedirectCancelled",
							"pixel cancelled redirect on same page ",
							!1,
							10
						);
				};
				b.hr = function (a) {
					a &&
						window.document &&
						window.document.body &&
						a.forEach(function (a) {
							var b = window.OBR.b.createElement(
								"img",
								null,
								"display:none;width:1px;height:1px"
							);
							b.src = a;
							window.document.body.appendChild(b);
						});
				};
				b.Wb = function (a, b, c, e) {
					((0, window.isNaN)(e) || 0 === d.b.vi(e)) &&
						window.OBR.error({ name: a, message: b, ky: !0 === c });
				};
				b.Mm = function (a) {
					return (
						a &&
						a.split("&").reduce(function (a, b) {
							b = b.split("=");
							a[b[0]] = b[1];
							return a;
						}, {})
					);
				};
				b.Qi = function (a) {
					return Object.keys(a)
						.reduce(function (b, c) {
							b.push(c + "=" + (0, window.encodeURIComponent)(a[c]));
							return b;
						}, [])
						.join("&");
				};
				b.pi = function (a) {
					if (
						a &&
						"string" === typeof a &&
						(a = a.split("-")) &&
						2 === a.length
					)
						return { Ti: a[1], $i: a[0] };
				};
				b.v(window.OBR);
				return b;
			})();
		window.OBR.Dc = function (a, b, c, d, e, g, f, h, k) {
			var l = this;
			var m = 0;
			k = "function" === typeof k ? k : window.OBR.b.Lq;
			l.start = function () {
				m += 1;
				if (window.OBR.b.Oc(a, m)) window.OBR.b.Oc(b, m);
				else if (window.OBR.b.Oc(h, m)) window.OBR.b.Oc(d, m);
				else if (m === g && 1e3 !== g) window.OBR.b.Oc(d, m);
				else {
					window.OBR.b.Oc(c, m);
					var n = f ? k(m, e) : e;
					(0, window.setTimeout)(function () {
						l.start();
					}, n);
				}
			};
			l.start();
		};
		window.OBR.lk = window.OBR.lk || {
			Zs: function () {
				return "complete" === window.document.readyState;
			},
			mt: function () {
				return "interactive" === window.document.readyState || this.Zs();
			},
		};
		window.OBR.nh = function () {
			var a = {},
				b = [];
			a.add = function (a) {
				b.push(a);
			};
			a.remove = function (a) {
				b.splice(a, 1);
			};
			a.top = function () {
				return 0 < b.length ? b.shift() : null;
			};
			a.Tb = function () {
				return 0 >= b.length;
			};
			a.Xx = function () {
				return b;
			};
			a.nq = function () {
				b = [];
			};
			return a;
		};
		window.OBR.Promise = function () {
			function a(a, e) {
				b.then =
					"resolve" === a
						? function (a) {
								a && a(e);
						  }
						: function (a, b) {
								b && b(e);
						  };
				b.resolve = b.reject = function () {
					throw Error("Promise already completed.");
				};
				for (var d, f = 0; (d = c[f++]); ) d[a] && d[a](e);
				c = void 0;
			}
			var b = {},
				c = [];
			b.then = function (a, b) {
				c.push({ resolve: a, reject: b });
			};
			b.resolve = function (b) {
				a("resolve", b);
			};
			b.reject = function (b) {
				a("reject", b);
			};
			return b;
		};
		window.OBR.ro = function (a) {
			var b = {},
				c = null,
				d,
				e;
			b.onClickOrAutoplay = void 0;
			b.onDisplayReady = void 0;
			b.onError = void 0;
			b.fetch = function (a) {
				null === c
					? ((c = a), e && e(c, this), (e = null))
					: ((c = a), window.OBR.rc.gm([this]));
			};
			b.shown = function (b) {
				d = b;
				window.OBR.rc && window.OBR.rc.kx(a.widgetId, a.playerId, d);
			};
			b.stopTimer = function () {
				if (this.On) {
					window.clearInterval(this.On);
					var b = window.document.querySelector(
						'[data-ob-player-id="' + a.playerId + '"] .timerNumber'
					);
					b && (b.textContent = b.parentElement.getAttribute("data-time"));
				}
			};
			b.fullscreenChange = function (b) {
				window.OBR.rc.ss(b, a.playerId);
			};
			b.placed = function () {
				window.OBR.rc.jx(a.playerId);
			};
			b.Ct = function (a) {
				e = a;
				c && e(c, this);
			};
			b.Bb = function () {
				return a;
			};
			b.Tx = function () {
				return d;
			};
			b.ay = function () {
				return a.when;
			};
			return b;
		};
		window.OBR.Aj = function () {
			var a = {},
				b = "00.000",
				c = null,
				d = null,
				e = 0;
			a.start = function () {
				null === c && (c = new Date());
				null !== d && (e += new Date() - d);
			};
			a.stop = function () {
				var a = new Date(new Date() - c - e),
					f = a.getUTCSeconds();
				a = a.getUTCMilliseconds();
				d = new Date();
				return (b =
					(9 < f ? f : "0" + f) +
					"." +
					(99 < a ? a : 9 < a ? "0" + a : "00" + a));
			};
			return a;
		};
		window.OBR.ak = window.OBR.ak || {
			copy: function (a) {
				var b = window.document.createElement("textarea");
				b.value = a;
				b.setAttribute("readonly", "");
				b.style.position = "absolute";
				b.style.left = "-9999px";
				window.document.body.appendChild(b);
				if (window.navigator.userAgent.match(/ipad|ipod|iphone/i)) {
					b.contentEditable = !0;
					b.readOnly = !0;
					a = window.document.createRange();
					a.selectNodeContents(b);
					var c = window.getSelection();
					c.removeAllRanges();
					c.addRange(a);
					b.setSelectionRange(0, 999999);
				} else b.select();
				window.document.execCommand("copy");
				window.document.body.removeChild(b);
			},
		};
		window.OBR.sd =
			window.OBR.sd ||
			function (a, b, c) {
				var d;
				return function () {
					var e = this,
						g = arguments,
						f = c && !d;
					(0, window.clearTimeout)(d);
					d = (0, window.setTimeout)(function () {
						d = null;
						c || a.apply(e, g);
					}, b);
					f && a.apply(e, g);
				};
			};
		window.OBR.f =
			window.OBR.f ||
			(function () {
				var a = {},
					b = {},
					c = window.OBR,
					d = window;
				b.uo = "opera";
				b.sj = "msie";
				b.oj = "firefox";
				b.kj = "chrome";
				b.yj = "safari";
				b.to = "mozilla";
				b.mj = "edge";
				b.Sj = "boolean";
				b.Pi = "string";
				b.ty = "object";
				b.Ww = "undefined";
				b.sy = "number";
				b.xd = "function";
				b.df = "ob_iframe";
				b.Jl = !0;
				b.zy = 0;
				b.Wf = "outbrain_widget_";
				b.Gt = "text/javascript";
				b.Jq = "text/css";
				b.wb = d;
				b.Jx = window.document;
				b.wt = void 0 !== window.document.createElement("script").async;
				b.Xm = d.OB_ampReferrer ? d.OB_ampReferrer : window.document.referrer;
				b.Wm = c.b.na(b.Xm);
				b.Ot = window.document.location.href;
				b.oy = c.b.na(b.Ot);
				b.kd = !1;
				b.$d = "";
				b.Ug = window.navigator.userAgent.toLowerCase();
				b.Im = window.navigator.platform.toLowerCase();
				var e = b.Ug;
				b.jc = /edge/.test(e)
					? b.mj
					: /opera/.test(e)
					? b.uo
					: /msie/.test(e)
					? b.sj
					: /firefox/.test(e)
					? b.oj
					: /chrome/.test(e)
					? b.kj
					: /safari/.test(e)
					? b.yj
					: b.to;
				b.Hd =
					(/iphone|ipad|ipod/.test(e) &&
						!d.navigator.standalone &&
						b.jc !== b.yj) ||
					/fbav|fban|gsa|twitter/.test(e);
				b.Fg = /fbav|fban/.test(e)
					? "facebook"
					: /gsa/.test(e)
					? "google"
					: /twitter/.test(e)
					? "twitter"
					: "";
				b.ra =
					!!/(iphone|ipod|symbian|android|windows ce|blackberry|palm|ipad)/.test(
						e
					);
				b.Af = "";
				b.gf =
					"Microsoft Internet Explorer" === window.navigator.appName ||
					("Netscape" === window.navigator.appName &&
						null !==
							/Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(
								window.navigator.userAgent
							));
				b.Pl = b.Ug.match(/msie 8/) || b.Ug.match(/msie 7/);
				b.Iu = window.OB_platformType || null;
				b.kf = "number" === typeof b.Iu;
				b.mn = null;
				b.tk = null;
				b.Jw = function () {
					b.kf &&
						b.mn &&
						b.tk &&
						(window.OBR.error({
							name: "OutbrainLT",
							message: window.location.href,
						}),
						b.mn(),
						b.tk());
				};
				b.Rr = function () {
					switch (b.nk) {
						case "prod":
							return c.b.ub(c.b.S("wiodb", b.U + "odb." + g), b.U + "odb." + g);
						case "sim":
							return c.b.ub(b.U + "odb-sim.outbrain.com", "");
						default:
							return c.b.ub(c.b.S("wiodb", b.U + "odb." + g), b.U + "odb." + g);
					}
				};
				b.Pr = function () {
					switch (b.nk) {
						case "prod":
							return c.b.ub(c.b.S("wiodb", b.U + "mv." + g), b.U + "mv." + g);
						case "sim":
							return c.b.ub(b.U + "mv-sim.outbrain.com", "");
						default:
							return c.b.ub(c.b.S("wiodb", b.U + "mv." + g), b.U + "mv." + g);
					}
				};
				b.Dr = function () {
					var a = c.b.S("forceWidgets", null);
					if (a)
						try {
							return a
								.split(",")
								.map(function (a) {
									return a.split(":");
								})
								.reduce(function (a, b) {
									var c = OBR._jsc.w(b);
									b = c.next().value;
									c = c.next().value;
									a[b] = c;
									return a;
								}, {});
						} catch (k) {}
					return null;
				};
				b.Ic = "string" === typeof d.OB_releaseVer ? d.OB_releaseVer : "0";
				b.ry = !0 === d.OB_disable_odbl;
				b.jh = d.OB_extId ? d.OB_extId : null;
				b.gh = d.OB_ContextKeyValue ? d.OB_ContextKeyValue : null;
				b.nf = "nanoWidget/";
				b.wn = function () {
					b.U =
						"true" === c.b.S("isForceHttp", "false") ? "http://" : "https://";
					b.nk = c.b.S("env", "prod");
					b.Bs = c.b.ub(c.b.S("wiodb", b.U + "hpr." + g), b.U + "hpr." + g);
					b.ym = b.Rr();
					b.hu = b.Pr();
					b.Qp = b.U + "storage.outbrain.com/";
					b.Ra = c.b.ub(
						c.b.S("wihost", b.U + "widgets." + g),
						b.U + "widgets." + g
					);
					b.Eu = c.b.ub(c.b.S("wiout", b.U + g), b.U + g);
					b.uf = b.U + "log." + f + "/";
					b.ni = b.U + "eventlog." + g + "/";
					b.ju = b.Ra + "/" + b.nf + b.Ic + (b.kf ? "/moduleLT" : "/module");
					b.gi = b.Ra + "/" + b.nf + "3rd";
					b.iu = b.Ra + "/" + b.nf + "externals";
					b.ku = b.Ra + "/nativeVideoPlayer";
					b.fu = b.Ra + "/widgetMegaBlocks";
				};
				var g = "outbrain.com";
				var f = "outbrainimg.com";
				b.Fu = f;
				b.wn();
				b.Np = "/blogutils/ExcludeRec.action?bocr=";
				b.uy = "html";
				b.Nm = b.kf ? "NANOWDGTLT13" : "NANOWDGT01";
				b.Xs = "object" === typeof d.console;
				b.Fn = c.b.pq(c.b.Uq());
				b.Nf = null === b.Fn ? "" : c.b.na(b.Fn);
				b.vm = !1;
				b.Hl = "true" === c.b.S("widebug", "false");
				b.fb = b.Dr();
				b.pr = "true" === c.b.S("forceFeed", "false");
				b.kh = c.b.S("wixp", null);
				b.um = "true" === c.b.S("obdraft", !1) ? "&obDraft=true" : "";
				b.Rg =
					!1 !== c.b.S("obAbtest", !1)
						? "&obAbtest=" + c.b.S("obAbtest", "")
						: "";
				b.dk = "true" === c.b.S("obCrDraft", "false") ? "&crDraft=true" : "";
				b.wm =
					"0" !== c.b.S("obFakeRTB", "0")
						? "&fakeRec=RTB&fakeRecSize=" + c.b.S("obFakeRTB", "0")
						: "";
				b.pf = "true" === window.OBR.b.S("obPerformance", !1);
				b.ou =
					"true" === c.b.S("obFakeRtb", !1)
						? "&fakeRec=RTB-CriteoUS&testMode=true&fakeRecSize=4"
						: "";
				b.Ul =
					"true" === window.OBR.b.S("rtbDesc", !1)
						? "&isRtbDescriptionEnabled=true"
						: "";
				b.ik =
					"true" === window.OBR.b.S("desc", !1)
						? "&descriptionDisplayEnabled=true"
						: "";
				b.Li = "true" === window.OBR.b.S("skipContextValidation", !1) ? !0 : !1;
				b.Mi = "true" === window.OBR.b.S("skipFilters", !1) ? !0 : !1;
				b.Ci = { Yn: window.screen.width, sl: window.screen.height };
				b.lf = 0;
				b.tc = null;
				b.bi = !1;
				b.ln = "data-obscrollable";
				b.kv = {
					touch_strip: "1",
					odb_dynamic: "2",
					"odb_dynamic_touch-strip": "3",
				};
				b.lv = { "touch-strip": "1" };
				b.mp = !!d.OB_ampMode;
				b.Ui = !(!d.OB_testMode && !window.OBR.b.S("obTestMode", !1));
				b.sx = { KALTURA: "kaltura", BRIGHTCOVE: "brightcove" };
				b.aa = { po: "get", da: "post", so: "jsonp" };
				b.fj = c.b.os();
				b.Yh =
					"true" === c.b.S("widwiz", "false") ||
					"true" === c.b.S("widwizinternal", "false");
				b.jt = "true" === c.b.S("obgallery", "false");
				b.Kh = "function" === typeof d.IntersectionObserver;
				b.Jm = !1;
				b.Kc = null;
				b.pd = null;
				b.Vi = -1;
				b.Er = function () {
					return d.__cmp && "function" === typeof d.__cmp
						? 1
						: d.__tcfapi && "function" === typeof d.__tcfapi
						? 2
						: null;
				};
				b.eb = null;
				b.ck = null;
				b.Ox = b.Er();
				b.ad = !!d.__cmp && "function" === typeof d.__cmp;
				b.ff = !!d.__cmp && "function" === typeof d.__cmp;
				b.Fl = d.__uspapi && "function" === typeof d.__uspapi;
				b.mc = null;
				b.Ew = d.__uspapi && "function" === typeof d.__uspapi;
				b.bk = !1;
				b.Hk = function (a) {
					!0 === a.isSecured &&
						"https://" !== b.U &&
						(b.wn(), c.g.v(window.OBR));
				};
				b.Vc = !1;
				try {
					b.Vc = window.self !== window.top;
				} catch (h) {
					b.Vc = !0;
				}
				b.Ln = "navigator" in window && "sendBeacon" in window.navigator;
				b.Ss = "true" === c.b.S("adnginmode", "false");
				b.tf =
					"navigator" in window &&
					"language" in window.navigator &&
					window.navigator.language;
				b.Vb = null;
				b.ea = function () {
					b.kd = !1;
					b.tc = null;
					(typeof c.f.wb.OB_CONSENT === c.f.Sj && !1 === c.f.wb.OB_CONSENT) ||
						"" === c.b.ha("OB-CNSNT", "") ||
						(b.eb = c.b.ha("OB-CNSNT", ""));
				};
				b.ia = function () {
					a.Ib = c;
					return a;
				};
				return b;
			})();
		window.OBR.gd ||
			(function () {
				var a = window.OBR.f,
					b = a.iu + "/cookie/put.html",
					c = {
						SUCCESS: 0,
						FAILURE: 1,
						ERROR: 2,
						TIMEOUT: 3,
						LS_SUCEESS: 4,
						LS_FAILURE: 5,
					},
					d = {
						result: null,
						Gn: !1,
						test: function () {
							d.result = new window.Promise(function (a) {
								var b = d.zr();
								null !== b
									? (d.Vd(b),
									  a(b === c.SUCCESS || b === c.LS_SUCEESS ? !0 : !1))
									: (d.start(), a(!0));
							});
						},
						start: function () {
							window.document && window.document.body
								? d.jk()
								: window.document.addEventListener(
										"DOMContentLoaded",
										function () {
											d.jk();
										}
								  );
						},
						jk: function () {
							try {
								var a = null,
									g = function (a) {
										"OB:3PC-true" === a.data
											? (window.OBR.h.log("third party cookies enabled"), f(!0))
											: "OB:3PC-false" === a.data &&
											  (window.OBR.h.log("third party cookies disabled"),
											  f(!1));
									},
									f = function (b) {
										window.removeEventListener("message", g, !1);
										(0, window.clearTimeout)(a);
										var f = b ? c.LS_SUCEESS : c.LS_FAILURE;
										d.Vd(b ? c.SUCCESS : c.FAILURE);
										d.Fv(f);
									};
								window.addEventListener("message", g, !1);
								var h = window.document.createElement("iframe");
								h.setAttribute("style", "display:none;width:0;height:0;");
								h.src = b;
								h.onerror = function () {
									d.Vd(c.ERROR);
								};
								window.document.body.appendChild(h);
								a = (0, window.setTimeout)(function () {
									d.Vd(c.TIMEOUT);
								}, 3e3);
							} catch (k) {
								d.Vd(c.ERROR);
							}
						},
						Fv: function (a) {
							window.OBR.b.Pa(
								"OB-TPCS",
								JSON.stringify({
									value: a,
									expiry: new Date().getTime() + 2592e5,
								})
							);
						},
						zr: function () {
							var a = window.OBR.b.ha("OB-TPCS", null);
							if (!a) return null;
							a = JSON.parse(a);
							return new Date().getTime() > a.expiry
								? (window.OBR.b.De("OB-TPCS"), null)
								: a.value;
						},
						Vd: function (b) {
							-1 === a.Vi && (a.Vi = b);
						},
					};
				window.OBR.gd = d;
			})();
		window.OBR.Vb =
			window.OBR.Vb ||
			(function () {
				var a = { key: null };
				(function () {
					a: {
						var a = window.OBR.b.ha("OB_LS_CONTEXT", null);
						if (a)
							try {
								var c = JSON.parse(a);
								if (c.key) {
									var d = c;
									break a;
								}
							} catch (g) {
								window.OBR.h.log("Failed to parse stored value OB_LS_CONTEXT");
							}
						d = null;
					}
					if (d && "disabled" !== d.key) {
						if ((d = d.key)) {
							c = window.OBR.b.ha(d, null);
							if (
								!c &&
								0 < d.indexOf(".") &&
								((a = d.split(".")),
								(c = a.splice(0, 1)[0]),
								(c = window.OBR.b.ha(c, null)))
							)
								try {
									for (c = JSON.parse(c); a.length; ) {
										var e = a.splice(0, 1);
										c = c[e];
									}
								} catch (g) {
									window.OBR.h.log("Failed to parse local storage value " + d);
								}
							c &&
								"string" === typeof c &&
								20 < c.length &&
								(c = c.substring(0, 20));
							e = c;
						} else e = null;
						e &&
							((e = (0, window.encodeURIComponent)(e)), (window.OBR.f.Vb = e));
					}
				})();
				return {
					update: function (b) {
						b = b.j("localStoragePathForContextRule", null);
						b !== a.key &&
							(b
								? ((a.key = b),
								  window.OBR.b.Pa("OB_LS_CONTEXT", JSON.stringify(a)))
								: window.OBR.b.De("OB_LS_CONTEXT"));
					},
				};
			})();
		(function () {
			function a() {
				this.l = d;
			}
			function b(a, b, c) {
				this.url = b;
				this.version = c;
				this.state = 0;
				this.ye = [];
				this.context = this;
				this.pk = null;
			}
			var c,
				d = {
					gj: "ADNGIN",
					og: "POPUPDESCRIPTION",
					pe: "WHATIS",
					hg: "FLYTHROUGH",
					Jg: "VIDEOPLUGIN",
					Ig: "VIDEO",
					pg: "POSCUL",
					xg: "SCROLL",
					zj: "SCROLLEXTERNAL",
					tg: "RECINIFRAME",
					xj: "REGISTER",
					Kg: "VIDGET",
					vg: "REFRESHWIDGET",
					zg: "SKYLANDER",
					me: "LOADMORE",
					px: "DYNAMICTEXTTRUNCATION",
					Eg: "TOPBOX",
					kg: "PAGER",
					uj: "PAGEREXTERNAL",
					vj: "PAGEREXTERNALNEW",
					Hg: "USERZAPPING",
					ke: "INPLAYERWIDGET",
					sg: "READMORE",
					fd: "NATIVEVIDEOPLAYER",
					Mg: "WIDGETWIZARD",
					Bg: "SWIPELAYOUT",
					Gg: "USERACTIONS",
					rj: "MEGABLOCKS",
					Ag: "STASHRENDERER",
					fg: "EMBEDDEDARTICLES",
					qg: "POSITIONREPORT",
					hj: "BALCONY",
					oe: "STREAMFEED",
					ig: "FOLLOWTOPICFEED",
					Xf: "ADCAROUSEL",
					lg: "PERFORMANCEMONITOR",
					yg: "SINGLECARDCAROUSEL",
					$f: "CARDSCAROUSELBOX",
					rg: "PUBLISHERTOOLS",
					mg: "PLAYABLEAD",
					ng: "PODCAST",
					Dg: "TIMELINE",
					qj: "LISTORY",
					tj: "OB_LISTORY",
					jg: "GRIDCAROUSEL",
					Yf: "AFTERCLICKINJECTOR",
					eg: "DISPLAY",
					ug: "REEL",
				};
			b.prototype.kq = function () {
				if (2 === this.state) this.fm();
				else if (0 === this.state) {
					var a = window.OBR.b.xa(0, this.url, !0);
					a.onerror = this.pk;
					this.state = 1;
					window.OBR.b.Ca(a);
				}
			};
			b.prototype.fm = function () {
				this.state = 2;
				for (var a = 0; a < this.ye.length; a += 1) {
					var b = this.ye[a];
					"function" === typeof b.Jc && b.Jc.call(this.context, b.pp);
				}
				this.ye = [];
			};
			b.prototype.cw = function (a) {
				this.url = this.url.replace(
					"$SUFFIX",
					a ? a.toString().toLowerCase() : ""
				);
			};
			a.prototype.v = function (a, b) {
				c = b ? b : this.i();
			};
			a.prototype.i = function () {
				function a(a) {
					return window.OBR.f.ju + "/" + a;
				}
				function c(a, c, f) {
					d[a] || (d[a] = new b(a, c, f));
				}
				var d = {};
				c(this.l.og, a("popupDescription.js"), -1);
				c(this.l.pe, a("whatis.js"), -1);
				c(this.l.Hg, a("userZapping.js"), -1);
				c(this.l.hg, a("flyThrough.js"), -1);
				c(this.l.Jg, a("videoPlugin.js"), -1);
				c(this.l.Ig, a("video.js"), -1);
				c(this.l.pg, a("positionCalculation.js"), -1);
				c(this.l.tg, a("recInIframe.js"), -1);
				c(this.l.xj, a("registration.js"), -1);
				c(this.l.vg, a("refreshWidget.js"), -1);
				c(this.l.zg, a("skyLander.js"), -1);
				c(this.l.Eg, a("topBox.js"), -1);
				c(this.l.Bg, a("swipeLayout.js"), -1);
				c(this.l.me, a("loadMore.js"), -1);
				c(this.l.ke, a("inPlayerWidget.js"), -1);
				c(this.l.sg, a("readMore.js"), -1);
				c(this.l.Mg, a("widgetWizard.js"), -1);
				c(this.l.Ag, a("stashRenderer.js"), -1);
				c(this.l.fg, a("embeddedArticles.js"), -1);
				c(this.l.qg, a("positionReport.js"), -1);
				c(this.l.Gg, a("userActions/userActions_$SUFFIX.js"), -1);
				c(this.l.Kg, window.OBR.f.U + "libs.outbrain.com/vidget/vidget.js", -1);
				c(this.l.gj, window.OBR.f.U + "srv.adngin.com/$SUFFIX.js", -1);
				c(this.l.xg, a("scroll.js"), -1);
				c(this.l.zj, window.OBR.f.gi + "/scroll/scrollExternal.js", -1);
				c(this.l.kg, a("pager.js"), -1);
				c(this.l.uj, window.OBR.f.gi + "/pager/pagerExternal.js", -1);
				c(this.l.vj, window.OBR.f.gi + "/pager/pagerExternalNew.js", -1);
				c(this.l.fd, window.OBR.f.ku + "/NVPInjector.min.js", -1);
				c(this.l.rj, window.OBR.f.fu + "/widgetMegaBlocks.js");
				c(this.l.hj, a("balcony.js"), -1);
				c(this.l.oe, a("streamFeed.js"), -1);
				c(this.l.ig, a("followTopicFeed.js"), -1);
				c(this.l.Xf, a("adCarousel.js"), -1);
				c(this.l.lg, a("performanceMonitor.js"), -1);
				c(this.l.yg, a("singleCardCarousel.js"), -1);
				c(this.l.$f, a("cardsCarouselBox.js"), -1);
				c(this.l.rg, a("publisherTools.js"), -1);
				c(this.l.mg, a("playableAd.js"), -1);
				c(this.l.ng, a("podcast.js"), -1);
				c(this.l.Dg, a("timeline.js"), -1);
				c(
					this.l.qj,
					window.OBR.f.U + "widgets.outbrain.com/listory/listory.js",
					-1
				);
				c(
					this.l.tj,
					window.OBR.f.U + "widgets.outbrain.com/listory/outbrain-listory.js",
					-1
				);
				c(this.l.jg, a("gridCarousel.js"), -1);
				c(this.l.Yf, a("afterClickInjector.js"), -1);
				c(this.l.eg, a("displayAd.js"), -1);
				c(this.l.ug, a("reel.js"), -1);
				return d;
			};
			a.prototype.Or = function (a) {
				return c[a].state;
			};
			a.prototype.N = function (a) {
				if ("-1" !== window.OBR.f.Ic)
					try {
						c[a].fm();
					} catch (f) {
						throw (
							(window.OBR.error({
								name: "obm-MakeHandShakeError",
								message: "Error in module: " + a + ", Err: " + f,
								stack: f.stack || "None",
							}),
							f)
						);
					}
			};
			a.prototype.c = function (a) {
				return c[a];
			};
			a.prototype.I = function (a, b, c, d, e, m) {
				if ((a = this.c(a)))
					a.cw(e),
						a.ye.push({ Jc: b || window.OBR.b.oc(), pp: d }),
						(a.pk = m),
						(a.context = c),
						a.kq();
			};
			a.prototype.Nr = function (a) {
				for (var b in this.l)
					if (this.l.hasOwnProperty(b) && this.l[b] === a) return this.l[b];
				return null;
			};
			if (!window.OBR.g) {
				var e = new a();
				e.v();
				window.OBR.g = e;
			}
		})();
		window.OBR.languageManager =
			window.OBR.languageManager ||
			(function () {
				var a = window.OBR,
					b = {},
					c = {},
					d = [];
				b.bm = function (a) {
					return d.hasOwnProperty(a);
				};
				b.Aq = function (a) {
					d[a] = {};
				};
				b.bp = function (b, c) {
					d[b] = a.b.assign(d[b], c);
				};
				c.registerModuleLanguage = function (a, c) {
					"string" === typeof a &&
						c &&
						0 < Object.keys(c).length &&
						(b.bm(a) || b.Aq(a), b.bp(a, c));
				};
				c.Mr = function () {
					return b.bm("userActions") ? d.userActions : null;
				};
				c.ia = function () {
					return b;
				};
				return c;
			})();
		window.OBR.v = window.OBR.v || void 0;
		window.OBR.Z = function (a) {
			return window.document.getElementById(a);
		};
		window.OBR.Va =
			window.OBR.Va ||
			(function () {
				var a,
					b = {},
					c = {},
					d;
				b.v = function (b) {
					a = b = b || window.OBR;
					d = new a.Ea();
				};
				b.ia = function () {
					return c;
				};
				c.Ae = function (b) {
					var c;
					var f = 0;
					for (c = b.length; f < c; f += 1)
						a.b.Za(b[f], "data-ob-mark", "true"),
							a.b.Za(b[f], "data-browser", a.f.jc),
							a.b.Za(b[f], "data-os", a.f.Im),
							d.D("find", [b[f]]);
				};
				c.Kk = function () {
					return a.b.Ga("class", "OUTBRAIN", "div", !0);
				};
				c.yr = function (b) {
					var c,
						d = [],
						e = [];
					for (c = 0; c < b.length; c++) {
						var k = b[c];
						if ("string" === typeof k.containerId)
							if (a.Z(k.containerId)) {
								var l = a.Z(k.containerId);
								window.OBR.Da.yq(k, l);
								e.push(l);
							} else d.push(b[c]);
					}
					window.OB_elements = d;
					return e;
				};
				c.Tr = function () {
					var a = [];
					"object" === typeof window.OB_elements &&
						0 < window.OB_elements.length &&
						(a = window.OB_elements);
					return a;
				};
				c.Qr = function () {
					var b = [],
						d = c.Kk(),
						f;
					var h = 0;
					for (f = d.length; h < f; h += 1) {
						var k = a.b.ga(d[h], "data-ob-mark");
						(null !== k && "true" === k) || !d[h] || b.push(d[h]);
					}
					h = c.Tr();
					if (0 < h.length)
						for (
							a.h.log("Array of elements found!"),
								d = c.yr(h),
								h = 0,
								f = d.length;
							h < f;
							h += 1
						)
							b.push(d[h]);
					return b;
				};
				b.Yo = function (a) {
					window.OBR.Va.Je
						? window.OBR.Va.Je.then(function () {
								return c.oh(a);
						  })
						: c.oh(a);
				};
				c.oh = function (b) {
					a.ta.Vt();
					if (void 0 === b) {
						var e = !1;
						a.h.log("searching for containers");
						new a.Dc(
							function () {
								return e;
							},
							function () {
								a.h.log("searchSuccess");
							},
							function () {
								e = a.lk.mt();
								var b = c.Qr();
								e && a.h.log("checking:(" + e + ")");
								0 < b.length &&
									(window.OBR.Va.Je
										? window.OBR.Va.Je.then(function () {
												return c.Ae(b);
										  })
										: c.Ae(b));
							},
							d.D("stopSearch"),
							50,
							1e3,
							!1
						);
					} else 0 < (b.length || 0) && c.Ae(b);
				};
				b.hy = function () {
					return 0 < c.Kk().length;
				};
				b.yu = function (a) {
					d.add("find", a);
				};
				b.xy = function (a) {
					d.add("stopSearch", a);
				};
				b.uk = function () {
					c.oh(void 0);
				};
				b.ar = function (b) {
					var d = [],
						f;
					var e = 0;
					for (f = a.u.length; e < f; e += 1) {
						var k = a.b.w(e);
						null !== k &&
							("string" === typeof b && a.b.Za(k, "data-src", b),
							a.b.Za(k, "data-ob-mark", "false"),
							d.push(k));
					}
					0 < d.length && ((a.u = []), c.Ae(d));
				};
				b.ea = function () {
					d.nc();
					a.u = [];
				};
				b.v(window.OBR);
				return b;
			})();
		var xa;
		OBR._jsc.r = ya.prototype;
		OBR._jsc.r.ia = function () {
			return {
				Hx: this.Pg.bind(this),
				Bx: this.Cj.bind(this),
				Ix: this.Fj.bind(this),
				cy: this.Gj.bind(this),
			};
		};
		OBR._jsc.r.Dd = function () {
			return this.Na;
		};
		OBR._jsc.r.Pg = function () {
			window.document.body
				? Ra(this)
				: (window.OBR.h.log("AdBlock - Don't have body.Stop full check"),
				  (this.Na = this.Na ? this.Na : "false"),
				  this.c.D("onAdBlockStatusReady", [this.Na]));
		};
		OBR._jsc.r.Cj = function (a, b) {
			var c = window.OBR.b.pc();
			return a.map(function (a) {
				a = window.OBR.b.createElement("div", a, b, { class: a });
				a.innerHTML = ".";
				window.OBR.b.hb(a, c);
				return a;
			});
		};
		OBR._jsc.r.Fj = function (a) {
			for (var b = [], c = [], d = 0; d < a.length; d += 2) {
				var e = a[d] ? !window.OBR.b.sc(a[d]) : !1,
					g = a[d + 1] ? window.OBR.b.sc(a[d + 1]) : !1;
				c.push(e);
				e && a.length > d + 1 && b.push(g);
			}
			b.push(!1);
			for (d = 0; d < a.length; d++) window.OBR.b.Cf(a[d].id);
			this.Rj = window.OBR.b.ek(b);
			this.Xg = window.OBR.b.ek(c);
		};
		OBR._jsc.r.Gj = function (a, b) {
			if (b === this.Fa.stopped || b === this.Fa.Yi) return !1;
			a = window.OBR.b.getElementsByClassName("ob-p", window.OBR.b.w(a));
			if (0 < a.length)
				for (b = 0; b < a.length; b += 1)
					if (10 < a[b].offsetHeight && window.OBR.b.sc(a[b])) return !0;
			return !1;
		};
		window.OBR.cb = window.OBR.cb || new ya();
		window.OBR.oa =
			window.OBR.oa ||
			(function () {
				var a = {},
					b = {},
					c;
				b.v = function (b) {
					c = b = b || window.OBR;
					a.ki = new c.nh();
					a.Od = new c.Ea();
					a.Fd = !1;
					a.Ax = null;
					a.Dk = !0;
					a.Ek = !0;
				};
				a.tr = function (b) {
					var d = b.B(),
						g = c.b.fv;
					var f = b.ns();
					var h = c.b.ha("OB-USER-TOKEN", null),
						k = c.b.ha("OB-USER-TOKEN-CREATION", null),
						l = window.OBR.zf.get(),
						m = c.f.tf && c.f.tf.length ? "&osLang=" + c.f.tf : "",
						n = c.W.Ha();
					n = "&winW=" + n.width + "&winH=" + n.height;
					var q = "&scrW=" + c.f.Ci.Yn + "&scrH=" + c.f.Ci.sl,
						p = b.fl(),
						t = p && null !== p.x ? "&px=" + p.x : "";
					p = p && null !== p.y ? "&py=" + p.y : "";
					var y = b.Ar();
					y = null !== y ? "&vpd=" + y : "";
					var E = "" !== c.f.$d && 0 !== d ? "&t=" + c.f.$d : "",
						B = a.Kr(b),
						C = !0 === c.f.Ui || !0 === b.Ve() || c.f.fb,
						Aa = b.Jh() ? "&videoId=" + b.Jh() : "",
						P = b.el() ? "&playerSrcId=" + b.el() : "",
						Ba = b.lb() ? "&api_user_id=" + b.lb() : "",
						Ca = c.f.kh ? "&xp=" + c.b.na(c.f.kh) : "",
						Da = c.f.Hl ? "&wrDebug=true" : "",
						Ea = c.f.pr ? "&forceFeed=true" : "",
						Fa = "true" === c.cb.Dd() ? "&adblck=true" : "&adblck=false",
						U = !C && c.f.Kc ? "&clss=" + c.f.Kc : "",
						Ga = b.Ab() ? b.Ab() : c.f.Nm,
						Ha = "https://" === c.f.U ? "&secured=true" : "",
						Ia = a.Qc(b),
						Ja = !0 === b.Sl() || c.f.wm ? "&rtbEnabled=true" : "",
						Ka = !0 === b.Yl() ? "&va=true" : "",
						La = c.f.gh ? "&contxtKV=" + c.b.na(c.f.gh) : "",
						ia = c.f.fb && c.f.fb[b.H()] ? "&contextRule=false" : "",
						Ma = c.f.eb ? "&cnsnt=" + c.f.eb : "",
						Na = c.f.ff ? "&cmpStat=1" : "&cmpStat=0",
						Oa = c.f.mc ? "&ccpa=" + c.f.mc : "",
						Pa = c.f.Fl ? "&ccpaStat=1" : "&ccpaStat=0",
						Qa = null !== b.Se() ? "&num=" + b.Se() : "";
					U +=
						U || !window.OBR.f.pd || C
							? ""
							: "&clid=" + window.OBR.f.pd + "&fdu=" + window.OBR.f.Ie;
					f =
						f && "hp" === f
							? c.f.Bs +
							  "/utils/get?url=$LNK$SRC$VDOID$PLYSRCID&settings=$SET&recs=$REC&widgetJSId=$WID$FEED&key=$KEY$INSTYPE$DUPREQ$APPVER&idx=$IDX&version=$VER&apv=$APV&sig=$SIG&format=$FRT$VA&rand=$RND$LSD$LSDT$PBC$OSLANG$DRFT$FKRTB$ABTEST$RTBENABLED$DESC$RTBDESC$XP$TOKEN$WINDOWSIZE$SCREENSIZE$TST$CONTEXTRULES$USRID$CRDRFT$FRCFEED$WRDBG$ADBLCK$CHEQ$SECURED$EXTID$NUM$CNTXT$CMP$CMPSTAT$CCPA$CCPAENV$RID$REID$REV$CID$SPC$MNADS$RECMODE$FEEDVERSION$MNORGANIC$MAXRTB$MAXZRTB$ISZVRTB$MAXBSRTB$ISBSVRTB$VIDPLBKMETHOD$VIDEOWIDTH$VIDEOHEIGHT$APPNAME$APPBUNDLE$APPSTOREURL$APPCATAGORY$DEVICEIFA$DEVICEAID$VIDBIDFLOOR$FAB$ISIFRAME$LSCNTX$SCV&ref=$REF$POSX$POSY$VIEWPOSDIFF$SKIPFILTERS"
							: c.f.ym +
							  "/utils/get?url=$LNK$SRC$VDOID$PLYSRCID&settings=$SET&recs=$REC&widgetJSId=$WID$FEED&key=$KEY$INSTYPE$DUPREQ$APPVER&idx=$IDX&version=$VER&apv=$APV&sig=$SIG&format=$FRT$VA&rand=$RND$LSD$LSDT$PBC$OSLANG$DRFT$FKRTB$ABTEST$RTBENABLED$DESC$RTBDESC$XP$TOKEN$WINDOWSIZE$SCREENSIZE$TST$CONTEXTRULES$USRID$CRDRFT$FRCFEED$WRDBG$ADBLCK$CHEQ$SECURED$EXTID$NUM$CNTXT$CMP$CMPSTAT$CCPA$CCPAENV$RID$REID$REV$CID$SPC$MNADS$RECMODE$FEEDVERSION$MNORGANIC$MAXRTB$MAXZRTB$ISZVRTB$MAXBSRTB$ISBSVRTB$VIDPLBKMETHOD$VIDEOWIDTH$VIDEOHEIGHT$APPNAME$APPBUNDLE$APPSTOREURL$APPCATAGORY$DEVICEIFA$DEVICEAID$VIDBIDFLOOR$FAB$ISIFRAME$LSCNTX$SCV&ref=$REF$POSX$POSY$VIEWPOSDIFF$SKIPFILTERS";
					var V = b.Ah();
					f = g(
						f + ("" !== V && null !== V ? "&fbk=" + V : ""),
						"$LNK",
						c.b.na(b.la())
					);
					f = g(f, "$SRC", a.gs(b));
					f = g(f, "$IDX", d);
					f = g(f, "$SET", !0);
					f = g(f, "$REC", !0);
					f = g(f, "$KEY", Ga);
					f = g(f, "$INSTYPE", b.Pb() ? "&installationType=" + b.Pb() : "");
					f = g(f, "$APPVER", b.Ob() ? "&app_ver=" + b.Ob() : "");
					f = g(f, "$DUPREQ", B ? "&lastPvTs=" + B : "");
					f = g(f, "$WID", c.f.fb && c.f.fb[b.H()] ? c.f.fb[b.H()] : b.H());
					f = g(f, "$VER", c.f.Ic);
					f = g(f, "$VA", Ka);
					f = g(f, "$REF", c.f.Wm);
					f = g(f, "$SIG", c.f.fj);
					f = g(f, "$APV", c.f.kd);
					f = g(f, "$FRT", b.Yk());
					f = g(f, "$RND", c.b.vi());
					f = g(f, "$DRFT", c.f.um);
					f = g(f, "$FKRTB", c.f.ou);
					f = g(f, "$DESC", c.f.ik);
					f = g(f, "$RTBDESC", c.f.Ul);
					f = g(f, "$ABTEST", c.f.Rg);
					f = g(f, "$CRDRFT", c.f.dk);
					f = g(f, "$RTBENABLED", Ja);
					f = g(f, "$XP", Ca);
					f = g(f, "$LSD", h ? "&lsd=" + c.b.na(h) : "");
					f = g(f, "$LSDT", k ? "&lsdt=" + k : "");
					f = g(f, "$PBC", "&pdobuid=" + a.qr(l, h));
					f = g(f, "$OSLANG", m);
					f = g(f, "$TOKEN", E);
					f = g(f, "$WINDOWSIZE", n);
					f = g(f, "$SCREENSIZE", q);
					f = g(f, "$TST", C ? "&testMode=true" : "");
					f = g(f, "$CONTEXTRULES", ia);
					f = g(f, "$USRID", Ba);
					f = g(f, "$VDOID", Aa);
					f = g(f, "$PLYSRCID", P);
					f = g(f, "$WRDBG", Da);
					f = g(f, "$FRCFEED", Ea);
					f = g(f, "$ADBLCK", Fa);
					f = g(f, "$CHEQ", U);
					f = g(f, "$SECURED", Ha);
					f = g(f, "$EXTID", Ia);
					f = g(f, "$CNTXT", La);
					f = g(f, "$NUM", Qa);
					f = g(f, "$CMP", Ma);
					f = g(f, "$CMPSTAT", Na);
					f = g(f, "$CCPA", Oa);
					f = g(f, "$CCPAENV", Pa);
					f = g(f, "$FEED", b.Wk() ? "&fId=" + b.Wk() : "");
					f = g(f, "$RID", b.Ch && b.Ch() ? "&reasonType=" + b.Ch() : "");
					f = g(f, "$REID", b.Eh && b.Eh() ? "&reasonValueId=" + b.Eh() : "");
					f = g(f, "$REV", b.Dh && b.Dh() ? "&reasonValue=" + b.Dh() : "");
					f = g(
						f,
						"$CID",
						b.wh && b.wh() ? "&categoryIds=" + c.b.na(b.wh()) : ""
					);
					f = g(f, "$SPC", b.hl() ? "&servePc=" + b.hl() : "");
					f = g(f, "$MNADS", b.al() ? "&maxNumAds=" + b.al() : "");
					f = g(f, "$RECMODE", b.gl() ? "&recMode=" + b.gl() : "");
					f = g(f, "$FEEDVERSION", b.Xk() ? "&feedVersion=" + b.Xk() : "");
					f = g(f, "$MNORGANIC", b.bl() ? "&maxNumOrganicRecs=" + b.bl() : "");
					f = g(f, "$MAXRTB", b.cl() ? "&maxRTB=" + b.cl() : "");
					f = g(f, "$MAXZRTB", b.dl() ? "&maxZRTB=" + b.dl() : "");
					f = g(
						f,
						"$ISZVRTB",
						null !== b.Re() && "undefined" !== b.Re() && void 0 !== b.Re()
							? "&isZVRTB=" + b.Re()
							: ""
					);
					f = g(f, "$MAXBSRTB", b.$k() ? "&maxBSRTB=" + b.$k() : "");
					f = g(
						f,
						"$ISBSVRTB",
						null !== b.Qe() && "undefined" !== b.Qe() && void 0 !== b.Qe()
							? "&isBSVRTB=" + b.Qe()
							: ""
					);
					f = g(
						f,
						"$VIDPLBKMETHOD",
						null !== b.Xe() && "undefined" !== b.Xe() && void 0 !== b.Xe()
							? "&videoPlaybackMethod=" + b.Xe()
							: ""
					);
					f = g(
						f,
						"$VIDBIDFLOOR",
						null !== b.We() && "undefined" !== b.We() && void 0 !== b.We()
							? "&videoBidFloor=" + b.We()
							: ""
					);
					f = g(f, "$APPNAME", b.Nk() ? "&appName=" + b.Nk() : "");
					f = g(f, "$APPBUNDLE", b.Lk() ? "&appBundle=" + b.Lk() : "");
					f = g(f, "$APPCATAGORY", b.Mk() ? "&appCategory=" + b.Mk() : "");
					f = g(f, "$APPSTOREURL", b.Ok() ? "&appStoreUrl=" + b.Ok() : "");
					f = g(f, "$DEVICEIFA", b.Sk() ? "&deviceIfa=" + b.Sk() : "");
					f = g(f, "$DEVICEAID", b.Rk() ? "&deviceAid=" + b.Rk() : "");
					f = g(f, "$VIDEOWIDTH", b.ll() ? "&videoWidth=" + b.ll() : "");
					f = g(f, "$VIDEOHEIGHT", b.kl() ? "&videoHeight=" + b.kl() : "");
					f = g(f, "$FAB", b.Rc() ? "&fAB=" + b.Rc() : "");
					f = g(f, "$ISIFRAME", window.OBR.f.Vc ? "&iframe=true" : "");
					f = g(
						f,
						"$LSCNTX",
						window.OBR.f.Vb ? "&lscntx=" + window.OBR.f.Vb : ""
					);
					f = g(f, "$POSX", t);
					f = g(f, "$POSY", p);
					f = g(f, "$VIEWPOSDIFF", y);
					f = g(
						f,
						"$SCV",
						window.OBR.f.Li ? "&skipContextValidation=" + window.OBR.f.Li : ""
					);
					return (f = g(
						f,
						"$SKIPFILTERS",
						window.OBR.f.Mi
							? "&skipRecsFilters=" + window.OBR.f.Mi + "&testMode=true"
							: ""
					));
				};
				a.qr = function (a, b) {
					return a ? (a === b ? 0 : window.OBR.b.na(a)) : -1;
				};
				a.Qc = function (a) {
					var b = "",
						d = c.b.Uf(c.f.jh);
					a = c.b.Uf(a.Qc());
					if (d || a) b = "&extid=" + (a || d);
					return b;
				};
				a.gs = function (a) {
					var b = "&srcUrl=";
					a = a.il();
					null !== a && "string" === typeof a && 0 < a.length
						? (b += c.b.na(a))
						: (b = 0 < c.f.Nf.length ? b + c.f.Nf : "");
					return b;
				};
				a.Js = function (b, e) {
					var d = e.C,
						f = e.H(),
						h = c.b.xa(0, b, !0);
					c.b.ba(h, "error", function () {
						a.Od.D("onOdbFail_" + d + "_" + f, [e], !0);
					});
					window.OBR.ta.cu(f, d);
					c.b.Ca(h);
					a.Od.D("onOdbFire_" + d + "_" + f, [e], !0);
					c.h.log("fire this src " + b);
				};
				a.fw = function (b) {
					c.f.wt &&
						(0, window.setTimeout)(function () {
							a.gn(b.C, b.H());
						}, 1e4);
				};
				a.gn = function (a, b) {
					c.b.Cf("ob_odbCall_" + a + b);
				};
				a.Rs = function () {
					var d = null !== c.cb.Na;
					if (a.Dk)
						if (((a.Dk = !1), d)) c.h.log("AdBlock ODB detected immediately");
						else {
							var e = new c.Aj();
							c.h.log("AdBlock ODB start stopwatch");
							e.start();
							za(c.cb, function () {
								c.h.log("AdBlock ODB detected after " + e.stop());
								b.D();
							});
						}
					return d;
				};
				a.gt = function () {
					var d = window.OBR.Nb.Ik;
					if (a.Ek && ((a.Ek = !1), !d)) {
						c.h.log("FD start stopwatch");
						var e = new c.Aj();
						yb(c.Nb, function () {
							c.h.log("FD return after " + e.stop());
							b.D();
						});
					}
					return d;
				};
				a.ht = function () {
					if (!c.f.ad || null !== c.f.eb) return !0;
					a.rr ||
						(a.rr = (0, window.setTimeout)(function () {
							c.h.log("Second time for consent");
							null === c.f.eb &&
								((c.f.bk = !0),
								"" !== c.b.ha("OB-CNSNT", "")
									? ((c.f.eb = c.b.ha("OB-CNSNT", "")),
									  c.h.log("Taking consent from LS"))
									: (c.f.ad = !1));
							b.D();
						}, 300));
					return !1;
				};
				a.Vs = function () {
					if (!c.f.Dw || null !== c.f.mc) return !0;
					a.Pp ||
						(a.Pp = (0, window.setTimeout)(function () {
							c.h.log("Giving a chance for the ccpa data to arrive");
							null === c.f.mc &&
								("" !== c.b.ha("OB-CCPA", "")
									? ((c.f.mc = c.b.ha("OB-CCPA", "")),
									  c.h.log("Taking ccpa consent from LS"))
									: (c.f.Dw = !1));
							b.D();
						}, 300));
					return !1;
				};
				b.D = function () {
					if (!0 !== a.Fd && a.Rs() && a.ht() && a.Vs() && a.gt()) {
						a.Fd = !0;
						var b = a.ki.top();
						if (b) {
							c.h.log("fire odb for " + b.la());
							var e = a.tr(b);
							a.Js(e, b);
							a.fw(b);
						} else a.Fd = !1;
					}
				};
				b.Em = function (b, c) {
					a.Od.add("onOdbFire_" + b.C + "_" + b.H(), c);
				};
				b.Dm = function (b, c) {
					a.Od.add("onOdbFail_" + b.C + "_" + b.H(), c);
				};
				b.unlock = function (b, c) {
					a.Fd = !1;
					a.gn(b, c);
				};
				b.wv = function (a) {
					!0 === a && (window.OBR.f.kd = a);
				};
				b.An = function (a) {
					a && (c.f.$d = a);
				};
				a.Kr = function (a) {
					var b = null;
					if (a && 0 == a.B()) {
						var d = new Date().getTime();
						a = c.b.na(a.la());
						var f = c.b.ha("OB-lastPageViewInfo", null);
						if (f)
							try {
								var h = JSON.parse(f);
								if (h && a === h.url) {
									var k = d - h.previousRequestTime;
									72e5 > k && (b = k);
								}
							} catch (l) {
								window.OBR.h("Error parsing last page view info");
							}
						c.b.Pa("OB-lastPageViewInfo", JSON.stringify({ url: a, Ay: d }));
					}
					return b;
				};
				b.Hs = function () {
					c.f.kd = !1;
				};
				b.register = function (d) {
					a.ki.add(d);
					c.h.log("register odb for " + d.la());
					b.D();
				};
				b.Hp = function (a) {
					b.unlock(a.C, a.H());
					b.D();
				};
				b.ea = function () {
					a.ki.nq();
					a.Od.nc();
					a.Fd = !1;
				};
				b.ia = function () {
					a.Ib = c;
					return a;
				};
				b.v(window.OBR);
				return b;
			})();
		window.OBR.controller =
			window.OBR.controller ||
			(function () {
				var a = this,
					b,
					c = {},
					d = {},
					e;
				c.mf = "manualDataReady";
				c.nm = "manualEditorialDataReady";
				c.ai = "manualClickReady";
				var g = !1;
				c.v = function (a) {
					b = a = a || window.OBR;
					e = new b.Ea();
					d.Yh();
					c.Es();
					window.OBR.gd.test();
				};
				c.ia = function () {
					return d;
				};
				c.Cy = function (a) {
					e.add("onHtmlReturn", a);
				};
				c.Yu = function (a) {
					e.add("noRecs", a);
				};
				d.Tw = function (a) {
					if (
						b.f.jc !== b.f.kj &&
						b.f.jc !== b.f.oj &&
						!b.f.ra &&
						window.document.querySelectorAll
					) {
						var c = b.b
							.w(a.B())
							.querySelectorAll(
								".ob-dynamic-rec-link,A.item-link-container,DIV.item-container > A:first-child,.odb_li .rec-link"
							);
						for (a = 0; a < c.length; a += 1) {
							var d = c[a],
								f = d.getAttribute("onMouseDown");
							typeof f === b.f.Pi &&
								0 < f.length &&
								d.setAttribute("onTouchStart", f);
						}
					}
				};
				c.xb = function (a) {
					b.h.log("rec " + a + " was rendered");
					var f = b.u[a];
					f.Fb(!0);
					-1 < f.j("recMode", "").indexOf("dynamic") ||
						g ||
						(b.b.Bv(), (g = !0));
					0 === a && window.OBR.Vb.update(f);
					Ya(b.Qa, f);
					d.rs(f);
					b.b.op(f);
					b.display.Os(f);
					c.Km(f);
					d.fx(f);
					d.ex(f);
					d.rk(f);
					d.Tw(f);
					d.Tp(f);
					d.tp(f);
					d.Ru(f);
					d.Kt(f);
					d.ap(f);
					d.iv(f);
					d.ep(f);
					d.Dt(f) && window.OBR.vb.Kb(f);
					window.OBR.Vb.update(f);
				};
				d.rs = function (a) {
					a.mb() || OBR._jsc.Ib(a);
				};
				c.Ud = function (a, b, c) {
					window.OBR.proxy.Nt(a, b, c);
				};
				d.iv = function (a) {
					if (!a.mb()) {
						var b = window.OBR.Nb;
						switch (a.j("fraudDetection", "0")) {
							case "2":
								1 !== b.Ua ||
									b.c ||
									b.c ||
									((b.c = !0), (window.OBR.f.pd = b.sh), jb());
								break;
							case "4":
								nb(a);
								break;
							case "5":
								nb(a);
								break;
							case "6":
								mb(a);
						}
					}
				};
				d.ex = function (a) {
					1 !== a.m("vid", 0) || a.Tl() || c.Ud(a, window.OBR.g.l.Kg, d.Cu);
				};
				d.tp = function (a) {
					a.Qb().isBalconyEnabled && c.Ud(a, window.OBR.g.l.hj);
				};
				d.Ru = function (a) {
					a.gb("publisherTools") &&
						b.g.I(
							b.g.l.rg,
							function (a) {
								window.OBR.Qm.v(a);
							},
							this,
							a
						);
				};
				d.Dt = function (a) {
					return !a.Xh() && !a.El() && !a.Il();
				};
				d.Kt = function (a) {
					(b.f.wb.OBLISTORY_ON ||
						(a.Qb().enableListory && !0 === a.Qb().enableListory)) &&
						c.Ud(a, window.OBR.g.l.qj, function (a) {
							window.OBLISTORY && window.OBLISTORY.init(a);
						});
				};
				d.ap = function (a) {
					var d = a.xh();
					if (d) {
						var f = a.Lr();
						b.b
							.w(a.B())
							.querySelectorAll(".ob-dynamic-rec-container")
							.forEach(function (b) {
								b = b.getAttribute("data-pos");
								f.listings || (f.listings = {});
								f.listings["" + b] || (f.listings["" + b] = {});
								f.listings["" + b].clickPixels ||
									(f.listings["" + b].clickPixels = []);
								f.listings["" + b].clickPixels.push(d);
								a.bw(f);
							});
						c.ve(a);
					}
				};
				d.ep = function (a) {
					a.Ts() &&
						b.g.I(
							b.g.l.Yf,
							function (a) {
								window.OBR.Tg.v(a);
							},
							this,
							a
						);
				};
				c.ve = function (a) {
					var d = this,
						f = a.B();
					b.b
						.w(f)
						.querySelectorAll(".ob-dynamic-rec-container")
						.forEach(function (a) {
							var b = a.getAttribute("data-pos");
							(a = a.querySelector(".ob-dynamic-rec-link")) &&
								a.addEventListener("click", c.Rn.bind(d, a, f, b));
						});
				};
				d.rk = function (a) {
					function c(a) {
						window.AdNgin &&
							window.AdNgin.rePopulateSlot &&
							window.AdNgin.rePopulateSlot({
								tagId: a.m("wnid", -1),
								tagName: a.m("widgetJsId", ""),
								tagProvider: "outbrain",
								url: a.la(),
								element: b.b.w(a.B()),
							});
					}
					!0 === a.j("adNginEnabled", !1) &&
						("" !== a.m("pid", "")
							? ((window._ngndisable = !0),
							  b.g.I(
									window.OBR.g.l.gj,
									c,
									this,
									a,
									a.m("pid", ""),
									function () {
										window.OBR.extern.logError(
											"obm-AdNginBlocked",
											"Blocked Script",
											!0
										);
									}
							  ))
							: b.h.log("No pid - no adNgin"));
				};
				d.Cu = function (a) {
					window.OB_VIDGET.init(a.currentWidget, a.beforeLoadTime);
				};
				d.fx = function (a) {
					if ((a = a.gb("viewability", null)))
						for (var b in a)
							if (a.hasOwnProperty(b))
								if (window.OBR.Z(b)) {
									var c = window.OBR.b.xa(0, a[b], !0, !1);
									window.OBR.b.insertBefore(c, window.OBR.Z(b));
								} else
									window.OBR.error({
										name: "ViewabilityPixelError",
										message: "Missing viewabilty pixel placeholder element",
									});
				};
				c.Km = function (a, b) {
					var c = a.j("recMode", ""),
						d = a.j("dynamicWidgetLayout", "");
					((void 0 === b ? 0 : b) ||
						-1 < c.indexOf("top-box") ||
						(-1 < c.indexOf("bottom-box") &&
							-1 === c.indexOf("bottom-box-vertical")) ||
						("odb_dynamic" === c && -1 < d.indexOf("top-box")) ||
						-1 < c.indexOf("odb_dynamic_swipe") ||
						-1 < c.indexOf("odb_dynamic_smartfeed-swipe")) &&
						window.OBR.g.I(
							window.OBR.g.l.kg,
							function (a) {
								window.OBR.Zb.ei(a);
							},
							this,
							a
						);
				};
				d.Yr = function (a) {
					return Math.floor(Math.random() * a) + 1;
				};
				d.ix = function (a) {
					b.h.log("widget was found");
					a = b.ed.jd(a);
					window.OBR.ta.pm(a.H(), a.B());
					!0 === a.$s()
						? b.h.log("Dynamic loader - stop odb!")
						: b.oa.register(a);
				};
				c.zm = function (a, e) {
					var f = "NA",
						g = a && a.response ? a.response : null;
					var h = b.b.Bh(e);
					(h && h.Gd()) ||
						(h && (h.setData(a), h.rn()),
						d.rk(h),
						g &&
							g.request &&
							g.request.widgetJsId &&
							(f = g.request.widgetJsId),
						b.oa.An(h.m("t", null)),
						b.oa.unlock(e, f),
						b.b.xm(h),
						h &&
							g &&
							g.documents &&
							(h.Fb(!0),
							Ya(b.Qa, h),
							h.j("FireImpressionPixelsForJSAPI", !1) &&
								(g.documents.doc = c.ir(g.documents)),
							h.Uh()
								? c.Ke(c.nm, e, h.H(), a)
								: ((a = Object.assign({}, g.documents)),
								  "viewability_actions" in g &&
										(a.reportViewed = g.viewability_actions.reportViewed || ""),
								  c.Ke(c.mf, e, h.H(), a))),
						b.oa.D());
				};
				c.ir = function (a) {
					var b = [];
					if (a && a.doc)
						return (b = a.doc.map(function (a) {
							var b = a.pixels;
							b && (window.OBR.b.hr(b), delete a.pixels);
							return a;
						}));
				};
				c.Ke = function (a, b, c, d) {
					e.D(a + b + c, [d, b], !0);
				};
				c.bn = function (a, b, c, d) {
					e.add(a + b + c, d);
				};
				c.ci = function (a, d) {
					if (null !== a) {
						var e = a.permalink,
							f = a.widgetId,
							g = b.Da.Iq(a);
						(a.videoId || (e && "string" === typeof e)) &&
							f &&
							"string" === typeof f &&
							(b.h.log("manual Odb call"),
							(a = c.Rt(a)),
							(g.idx = a),
							(g.isManualWidget = !0),
							(e = b.ed.fh(g)),
							window.OBR.ta.pm(f, a),
							b.f.Hk(g),
							e.Ov(),
							(b.Yc[a] = e),
							e.Uh() && b.Mb.yp(e),
							c.bn(c.mf, a, e.H(), d),
							b.oa.register(e));
					}
				};
				c.Rt = function (a) {
					var c = 0,
						d = b.f;
					if (a.videoId) return 0;
					var e = a.permalink;
					d.bi = !0 === a.continuousIdx;
					if (null !== d.tc || 0 !== b.u.length)
						if (
							(null === d.tc && (d.tc = b.u[0].la()), d.tc === e || !0 === d.bi)
						)
							0 === d.lf && (d.lf = 100), (c = d.lf + 1);
					d.tc = e;
					return (d.lf = c);
				};
				c.Xc = function (a, d) {
					var f = window.OBR.Z(b.f.df);
					b.b.Wc(f) && b.b.Wc(f.parentNode) && f.parentNode.removeChild(f);
					b.b.Cl(b.f.df);
					"function" === typeof d && e.add(c.ai, d);
					if (null !== a && (d = a.link) && "string" === typeof d) {
						b.h.log("manual Click");
						if (null !== d.match(/http(s)?:\/\/.+outbrain.com/i))
							a.openInWindow
								? (window.top.location.href = d)
								: ((a = d.split("?")),
								  b.b.Rp(a[0] + "?noRedirect=true&" + a[1]));
						else throw "Wrong redirect link: " + d;
						e.D(c.ai);
						wa(e, c.ai);
					}
				};
				d.Xl = function (a) {
					return a.j("stopRater", !1);
				};
				c.ii = function (a, g) {
					var f;
					window.OBR.h.log("HTML returned");
					g = d.Nd(g);
					(f = b.u[g])
						? (window.OBR.ta.bu(f.H(), f.B()),
						  0 >= f.cs(a) && e.D("noRecs", [f]),
						  f.Gd() ||
								(f.setData(a),
								f.Bn(),
								f.rn(),
								b.oa.An(f.m("t", null)),
								(b.f.ra =
									"mobile" === f.m("readerPlatform", "desktop") || b.f.jt),
								(b.f.Af = f.m("readerPlatform", "desktop")),
								c.zk(f, g),
								d.Xl(f) || f.Wh() || d.Ft(f.Pe())
									? Ya(b.Qa, f)
									: (b.oa.wv(f.j("apv", !1)),
									  c.st(f) ? c.Bc(g) : c.us(f),
									  c.ul(f))),
						  c.er(f))
						: b.h.log("odbHtmlReturned : Widget not found");
				};
				c.zk = function (a, b) {
					e.D("odbRtn_" + a.H(), [a]);
					e.D("odbRtn_" + b, [a]);
					e.D("onHtmlReturn", [a], !1, a);
				};
				c.ul = function (a) {
					d.jq(a);
					d.hq(a);
					d.gq(a);
					d.lq(a);
					d.iq(a);
					d.Zp(a);
					d.eq(a);
					d.Up(a);
					d.aq(a);
					d.fq(a);
					d.bq(a);
					d.Yp(a);
					d.Wp(a);
					d.Xp(a);
					d.Vp(a);
					d.cq(a);
					window.OBR.le.jd(a);
				};
				d.Nd = function (a) {
					return 1e3 > a ? a : a % 1e3;
				};
				d.Ft = function (a) {
					var c = !1;
					null !== a.match(/(<\/?met|<\/?scr)/i) &&
						((c = !0), b.h.log("SECURITY"));
					return c;
				};
				c.er = function (a) {
					d.Xl(a) || (b.oa.unlock(a.C, a.H()), b.oa.D());
				};
				d.hq = function (a) {
					!b.f.ra && a.At() && a.ut()
						? b.g.I(
								b.g.l.zg,
								function (a) {
									b.Dn.v(a);
								},
								this,
								a
						  )
						: a.yt()
						? b.g.I(
								b.g.l.Eg,
								function (a) {
									b.cc.v(a);
								},
								this,
								a
						  )
						: b.f.ra && a.ot()
						? b.g.I(
								b.g.l.rj,
								function (a) {
									d.Kw(a);
								},
								this,
								a
						  )
						: a.ft()
						? b.g.I(
								b.g.l.ig,
								function (a) {
									window.OBR.nr.init(a);
								},
								this,
								a
						  )
						: a.mb() &&
						  b.g.I(
								b.g.l.oe,
								function (a) {
									window.OBR.Qf.init({
										Lm: a,
										lh: a.j("feedManualChunkFetch", !1),
										cm: a.j("sideElementFeedLimiter", null),
									});
								},
								this,
								a
						  );
				};
				d.Kw = function (a) {
					var b = a.j("megaBlocksData", "{}"),
						c = {};
					try {
						c = JSON.parse(b);
					} catch (l) {
						(c = {}),
							window.OBR.error({
								name: "TypeError",
								message: "Error parsing mega blocks json data",
							});
					}
					c.obuid = a.m("lsd", "");
					c.css = a.j("dynamicCustomCSS", "") + "\n" + a.j("nanoCustomCss", "");
					new window.OBRMega(c);
				};
				d.gq = function (a) {
					b.f.ra &&
						!0 === a.j("isReadMoreEnabled", !1) &&
						b.g.I(
							b.g.l.sg,
							function (a) {
								b.zc.v(a);
							},
							this,
							a
						);
				};
				d.jq = function (a) {
					b.f.ra &&
						a.Xh() &&
						3 === a.j("dynamicDynamicLayoutVersion", 3) &&
						b.g.I(
							b.g.l.Bg,
							function (a) {
								b.Ri.v(a);
							},
							this,
							a
						);
				};
				d.iq = function (a) {
					a.El() &&
						b.g.I(
							b.g.l.Xf,
							function (a) {
								b.hc.v(a);
							},
							this,
							a
						);
				};
				d.eq = function (a) {
					a.Wl() &&
						b.g.I(
							b.g.l.yg,
							function (a) {
								b.Lf.v(a);
							},
							this,
							a
						);
				};
				d.Up = function (a) {
					a.Ws() &&
						window.OBR.g.I(
							window.OBR.g.l.$f,
							function (a) {
								window.OBR.Vj.v(a);
							},
							this,
							a
						);
				};
				d.Zp = function (a) {
					a.m("obPerformance") && ((window.OBR.f.pf = !0), d.hm());
				};
				d.aq = function (a) {
					a.qt() &&
						b.g.I(
							b.g.l.mg,
							function (a) {
								b.Om.v(a);
							},
							this,
							a
						);
				};
				d.bq = function (a) {
					a.Rl() &&
						b.g.I(
							b.g.l.ng,
							function (a) {
								b.vf.v(a);
							},
							this,
							a
						);
				};
				d.Wp = function (a) {
					a.kt() &&
						window.OBR.g.I(
							window.OBR.g.l.jg,
							function (a) {
								window.OBR.rl.v(a);
							},
							this,
							a
						);
				};
				d.Xp = function (a) {
					a.j("listoryEnabled", !1) &&
						c.Ud(a, window.OBR.g.l.tj, function (a) {
							window.OB_LISTORY.init(a.currentWidget);
							window.OBR.h.log("outbrain-listory loaded");
						});
				};
				d.Yp = function (a) {
					if (a.j("isParallax", !1)) {
						var b = a.j("widgetLocationReference", "");
						(b = b && window.document.querySelector(b)) &&
							window.OBR.b.Bl(window.OBR.b.w(a.B()), b);
						a = !!window.navigator.platform.match(/iPhone|iPod|iPad/);
						var c = window.document.querySelector(
								".ob-rec-image-container.ob-parallax-img"
							),
							d = window.document.querySelector(
								".ob-parallax-img .ob-rec-image,.ob-parallax-img .ob-rec-rtb-image"
							);
						d.style.transition = "background-position 150ms linear";
						var e = !0,
							f = !1,
							g = function () {
								var a = c.getBoundingClientRect(),
									b = (a.top / (window.innerHeight - a.height)) * 100;
								window.innerHeight <= window.innerWidth &&
									(b = (a.top / (window.innerHeight + a.height / 2)) * 100);
								d.style.backgroundPositionY = f ? b + "%" : "center";
								e &&
									f &&
									((e = !1),
									(0, window.setTimeout)(function () {
										d.style.transition = "none";
										d.offsetHeight;
									}, 200));
								f = !0;
							},
							p = function () {
								g();
								(0, window.requestAnimationFrame)(p);
							};
						new window.OBR.IntersectionObserver({
							element: c,
							callback: a
								? function () {
										return (0, window.requestAnimationFrame)(p);
								  }
								: function () {
										return window.addEventListener("scroll", g);
								  },
							threshold: [0],
							unobserve: !0,
						}).observe();
						a ? (0, window.requestAnimationFrame)(p) : g();
					}
				};
				d.fq = function (a) {
					a.xt() &&
						window.OBR.g.I(
							window.OBR.g.l.Dg,
							function (a) {
								window.OBR.Nn.v(a);
							},
							this,
							a
						);
				};
				d.Vp = function (b) {
					b.Il() &&
						window.OBR.g.I(
							window.OBR.g.l.eg,
							function (a) {
								return window.OBR.kk.v(a);
							},
							a,
							b
						);
				};
				d.cq = function (b) {
					b.Tl() &&
						window.OBR.g.I(
							window.OBR.g.l.ug,
							function (a) {
								return window.OBR.xi.v(a);
							},
							a,
							b
						);
				};
				d.lq = function (a) {
					var b =
						(a = window.OBR.b.w(a.B())) &&
						a.querySelector(".sponsorship-image");
					null != b &&
						0 > b.classList.toString().indexOf("size") &&
						d.gp(a.clientWidth, b);
				};
				d.gp = function (a, c) {
					b.b.R(
						c,
						700 < a ? "large-size" : 430 < a ? "medium-size" : "small-size"
					);
				};
				d.Yh = function (a) {
					b.f.Yh &&
						b.g.I(
							b.g.l.Mg,
							function () {
								b.ao.v();
								b.bo.v();
							},
							this,
							a
						);
				};
				d.Tp = function (a) {
					window.OBR.f.Vc ||
						(1 === d.Yr(a.j("logLottery", 1e3)) &&
							window.OBR.g.I(window.OBR.g.l.qg, function () {
								window.OBR.Ku.Bi();
							}));
				};
				d.Lt = function () {
					var a = b.b.xa(0, "//widgets.outbrain.com/adngin.js", "true");
					window.document.head.appendChild(a);
				};
				c.st = function (a) {
					var b = !0;
					if (
						a.Zl() ||
						a.Kl() ||
						(a.fa && a.fa.reason && a.fa.reason === window.OBR.Mb.gc.wj)
					)
						b = !1;
					return b;
				};
				c.us = function (a) {
					var c = a.C;
					a.Zl()
						? b.g.I(
								b.g.l.Jg,
								function () {
									b.Vf.Fq(c);
								},
								this
						  )
						: a.Kl() && b.display.Ls(a);
				};
				c.Bc = function (a) {
					a = b.u[a];
					window.OBR.ta.om(a.H(), a.B());
					b.display.Bc(a);
					b.h.log("HTML - Render");
					window.OBR.ta.du(a.H(), a.B());
					c.xf(a);
					c.Td(a);
				};
				c.Td = function (a) {
					if (!0 === a.gb("inlineNVP", !1)) {
						var c = {};
						c.platform = b.f.Af;
						c.lang = a.m("lang", "en");
						c.uuid = a.m("lsd", null);
						c.publisherId = a.m("pid", null);
						c.sourceId = a.m("sid", null);
						c.widgetNumberId = a.m("wnid", null);
						c.location = a.m("gl", "");
						c.timestamp = a.Ih();
						c.widgetID = a.m("widgetJsId", a.H());
						c.reqID = a.m("req_id", "-1");
						c.pvId = a.m("pvId", "-1");
						c.obcnst = a.m("obcnsnt", !0);
						c.did = a.m("did", null);
						c.gdpr = a.m("gdpr", 0);
						c.cnsnt = a.m("cnsnt", null);
						b.g.I(b.g.l.fd, function () {
							window.NVPInjector.main.widgetLoad(b.b.w(a.B()), a.Qb(), c);
						});
					}
				};
				c.xf = function (a) {
					var c = a.lt(),
						d = a.j("dynamicTruncateSource", !1),
						e = a.j("TruncateDescription", !1);
					b.b.xm(a);
					OBR._jsc.db(b.Ee, a.B(), d, e, c);
				};
				c.Tm = function (a) {
					b.b.R(a, "ob_clicked");
					var c = b.b.ga(a, "data-redirect");
					null !== c && (a.href = c);
				};
				c.$b = function (a) {
					d.oq();
					b.Va.ar(a);
					return !0;
				};
				c.ea = function () {
					e.nc();
				};
				c.jn = function () {
					b.ta.Zt();
					b.Va.yu(d.ix);
					b.display.Yb(c.xb);
					b.f.Ss && d.Lt();
					b.f.kf ? b.f.Jw() : b.Va.uk();
					window.OBR.f.pf && d.hm();
				};
				d.hm = function () {
					b.g.I(
						b.g.l.lg,
						function () {
							window.OBR.vo.init();
						},
						this
					);
				};
				c.Mp = function (a, c, d) {
					if (
						window.confirm(
							"Removing this recommendation will remove it permanently for this section and will refresh the recommendations.\n Are you sure you want to remove this recommendation?"
						)
					) {
						var e = "https://my.outbrain.com/manage/";
						e =
							!1 === d
								? e +
								  ("add-zapped-document?publisherId=" +
										c +
										"&docUrl=" +
										b.b.na(a))
								: e +
								  ("add-rule?publisherId=" +
										c +
										"&ruleValue=" +
										b.b.na(a) +
										"&ruleType=" +
										d);
						a = b.b.xa(0, e, !0);
						b.b.Ca(a);
					}
				};
				c.Lp = function (a) {
					window.confirm(
						"Removing this recommendation will remove it permanently for this section and will refresh the recommendations.\n Are you sure you want to remove this recommendation?"
					) &&
						((a = b.b.xa(
							0,
							b.f.ym + b.f.Np + a + "&index=1&templateIndex=1&sig=" + b.f.fj,
							!0
						)),
						b.b.Ca(a));
				};
				c.hv = function (a) {
					a &&
						a.ob_exclude_resp &&
						"number" === typeof a.ob_exclude_resp.code &&
						1 !== a.ob_exclude_resp.code &&
						c.$b();
				};
				c.Xu = function (a, c) {
					if (c && "function" === typeof c) {
						var d = "odbRtn_" + a;
						e.add(d, c);
						(a = b.Da.ol(a)) && a.Gl() && e.D(d, [a]);
					}
				};
				c.Wu = function (a, c) {
					if (c && "function" === typeof c) {
						var d = "odbRtn_" + a;
						e.add(d, c);
						(a = b.Da.Sb(a)) && a.Gl() && e.D(d, [a]);
					}
				};
				c.vr = function (a) {
					return (a = b.Da.ol(a)) ? a.m("tcr", -1) : null;
				};
				c.Cc = function () {
					b.Va.uk();
				};
				c.nc = function () {
					b.display.ea();
					b.oa.ea();
					this.ea();
					b.Va.ea();
					b.Qa.ea();
					b.ql.ea();
					b.Mb && b.Mb.ea();
					b.cc && b.cc.ea();
					window.OBR.vb.ea();
					window.OBR.Fe.ea();
					window.OBR.f.ea();
				};
				c.cn = function () {
					this.nc();
					this.jn();
				};
				d.oq = function () {
					b.oa.Hs();
					b.Qa.ea();
					window.OBR.vb.ea();
					window.OBR.Fe.ea();
				};
				c.Zm = function (a, c) {
					a = d.Nd(a);
					a = window.OBR.Da.Sb(a);
					a = d.yf(a, c);
					b.oa.register(a);
				};
				d.yf = function (a, b) {
					a.Ym(b);
					window.OBR.$b && window.OBR.$b.Jf(a);
					return a;
				};
				c.di = function (a, b, d, g, m, n) {
					b &&
						a &&
						(c.Xc({ link: b, openInWindow: n }, null),
						e.D("videoClick_" + a, [
							{ videoUrl: d, videoId: g, widgetId: a, widgetIdx: m },
						]));
				};
				c.mi = function (a, b) {
					e.add("videoClick_" + a, b);
				};
				c.im = function (a, c, e, g) {
					var f = window.OBR.b.w(a);
					f
						? d.Mj(f)
						: window.OBR.error({
								name: "Error",
								message: "Cannot find widget element with idx=" + a,
						  });
					if ((a = window.OBR.Da.Sb(d.Nd(a))))
						(a = d.yf(a, null)),
							a.xn(c),
							a.zn(e),
							a.yn(g),
							d.Jn(a),
							b.oa.register(a);
				};
				d.yf = function (a, b) {
					a.Ym(b);
					window.OBR.$b && window.OBR.$b.Jf(a);
					return a;
				};
				d.ts = function () {
					typeof b.f.wb.OB_CONSENT === b.f.Sj && !1 === b.f.wb.OB_CONSENT
						? ((b.f.eb = "no_consent"), (b.f.ad = !0))
						: b.f.ad && c.Pv();
				};
				d.ps = function () {
					b.f.Ew &&
						b.f.wb.__uspapi("getUSPData", 1, function (a, c) {
							c && a && a.uspString
								? (b.h.log("getCCPAData: " + a.uspString),
								  b.b.Pa("OB-CCPA", a.uspString),
								  (b.f.mc = a.uspString))
								: b.b.Wb(
										"obm-ccpa_fail",
										window.document.location.hostname,
										!1,
										100
								  );
						});
				};
				c.Es = function () {
					d.ts();
					d.ps();
				};
				c.Zu = function () {
					function a(c, d) {
						!d || ("tcloaded" !== c.Sq && "useractioncomplete" !== c.Sq)
							? b.b.Wb(
									"obm-cmp_fail",
									window.document.location.hostname,
									!1,
									100
							  )
							: ((c = c.Pw),
							  b.h.log("getConsentData: " + c),
							  b.b.Pa("OB-CNSNT", c),
							  (b.f.ck = c),
							  b.f.wb.__tcfapi("removeEventListener", 2, function () {}, a));
					}
					b.f.wb.__tcfapi("addEventListener", null, a);
				};
				c.Pv = function () {
					try {
						b.f.wb.__cmp("getConsentData", null, function (a) {
							a && a.consentData
								? ((a = b.b.na(a.consentData)),
								  b.h.log("getConsentData: " + a),
								  b.b.Pa("OB-CNSNT", a),
								  b.f.bk || (b.f.eb = a))
								: b.b.Wb(
										"obm-cmp_fail",
										window.document.location.hostname,
										!1,
										100
								  );
						});
					} catch (f) {
						b.b.Wb("obm-cmp_fail", window.document.location.hostname, !1, 100),
							(b.f.eb = "no_consent"),
							(b.f.ad = !0);
					}
				};
				c.Iy = function () {
					try {
						b.f.wb.__tcfapi(
							"getTCData",
							null,
							function (a, d) {
								d && "loaded" === a.Dx
									? ((a = a.Pw),
									  b.h.log("getConsentData: " + a),
									  b.b.Pa("OB-CNSNT2", a),
									  (b.f.ck = a))
									: c.Zu();
							},
							null
						);
					} catch (f) {
						b.b.Wb("obm-cmp_fail", window.document.location.hostname, !1, 100),
							(b.f.eb = "no_consent"),
							(b.f.ad = !0);
					}
				};
				c.di = function (a, b, d, g, m, n) {
					b &&
						a &&
						(c.Xc({ link: b, yy: n }, null),
						e.D("videoClick_" + a, [{ Py: d, Oy: g, jb: a, Qy: m }]));
				};
				c.mi = function (a, b) {
					e.add("videoClick_" + a, b);
				};
				c.im = function (a, c, e, g) {
					var f = window.OBR.b.w(a);
					f
						? d.Mj(f)
						: window.OBR.error({
								name: "Error",
								message: "Cannot find widget element with idx=" + a,
						  });
					(f = window.OBR.Da.Sb(d.Nd(a)))
						? ((f = d.yf(f, null)),
						  f.xn(c),
						  f.zn(e),
						  f.yn(g),
						  d.Jn(f),
						  b.oa.register(f))
						: window.OBR.error({
								name: "Error",
								message: "Cannot find widget with idx=" + a,
						  });
				};
				d.Jn = function (a) {
					a.gw(a.Pe());
				};
				d.Mj = function (a) {
					b.b.R(a, "ob_scoped");
				};
				c.sp = function (a) {
					a = window.OBR.Da.Sb(d.Nd(a));
					a.If(a.Vr());
					b.display.Bc(a);
				};
				c.Rn = function (a, b, c) {
					"undefined" !== typeof b && a && "undefined" !== typeof c
						? (b = window.OBR.Da.Sb(b))
							? (b = b.gb("listings")) && b[c] && b[c].clickPixels
								? window.OBR.b.gr(b[c].clickPixels, a)
								: window.OBR.h.log(
										"fireClickPixel: empty meta or key not defined in clickPixels meta"
								  )
							: window.OBR.h.log(
									"triggerClickPixels: widget or rec container not found"
							  )
						: window.OBR.h.log("triggerClickPixels: Missing param to function");
				};
				c.Vw = function (a, b) {
					if ("mraid" in window)
						try {
							var c = a.getAttribute("href");
							b.preventDefault();
							b.stopPropagation();
							window.mraid.open(c);
						} catch (l) {
							window.OBR.error(l);
						}
				};
				c.Uw = function (a, b, c) {
					try {
						if (window.OBR.clickHandler) {
							var d = a.getAttribute("href");
							b.preventDefault();
							b.stopPropagation();
							window.OBR.clickHandler.open(d, c);
						}
					} catch (m) {
						window.OBR.error(m);
					}
				};
				c.Kp = function (a) {
					var c = b.Qa.Fa.td,
						d = window.OBR.Qa;
					a = a.split("?");
					var e = window.OBR.b.Mm(a[1]);
					d.o || ((e.cheq = window.OBR.Nb.qd), (d.o = !0));
					e.eT = c || d.Fa.ready;
					e.tm = new Date().getTime() - d.startTime;
					e.wRV = window.OBR.f.Ic;
					e.pVis = "2";
					c = window.OBR.b.Qi(e);
					d.i.add(a[0] + "?" + c);
					d.A && $a(d);
				};
				c.v(window.OBR);
				return c;
			})();
		window.OBR.display =
			window.OBR.display ||
			(function () {
				var a,
					b = {},
					c;
				b.v = function (b) {
					a = b = b || window.OBR;
					c = new a.Ea();
				};
				b.zl = function (c, e) {
					c = a.b.Nw(c);
					var d = a.b.w(e.C);
					d &&
						c &&
						0 < c.length &&
						(0 < e.Fh() ? b.Xq(d, c[0], e.C, e) : b.If(c[0], d, e.C, e),
						a.h.log("element inserted"));
				};
				b.Xq = function (c, e, g, f) {
					function d() {
						b.ys(c).then(function (a) {
							b.dw(a, e, g, f).then(function (a) {
								b.Vq(a);
							});
						});
					}
					var k = new a.Promise();
					k.then(function () {
						b.Yq(c).then(d);
					});
					k.resolve();
				};
				b.Yq = function (b) {
					var c = new a.Promise(),
						d = 1,
						f = (0, window.setInterval)(function () {
							0.1 >= d
								? ((0, window.clearInterval)(f), c.resolve(b))
								: ((b.style.opacity = d),
								  a.f.Pl
										? (d = 0)
										: ((b.style.filter = "alpha(opacity=" + 100 * d + ")"),
										  (d -= 0.1 * d)));
						}, 10);
					return c;
				};
				b.ys = function (b) {
					var c = new a.Promise();
					b.style.opacity = 0;
					(0, window.setTimeout)(function () {
						c.resolve(b);
					}, 0);
					return c;
				};
				b.dw = function (c, e, g, f) {
					var d = new a.Promise();
					b.If(e, c, g, f);
					(0, window.setTimeout)(function () {
						d.resolve(c);
					}, 0);
					return d;
				};
				b.If = function (c, e, g, f) {
					e.innerHTML = "";
					a.b.hb(c, e);
					b.vd(f, g);
				};
				b.vd = function (a, b) {
					c.D("afterRender", [b], !1, a);
				};
				b.Vq = function (b) {
					var c = new a.Promise(),
						d = 0.1,
						f = (0, window.setInterval)(function () {
							1 <= d
								? ((0, window.clearInterval)(f),
								  b.removeAttribute("style"),
								  c.resolve(b))
								: ((b.style.opacity = d),
								  a.f.Pl
										? (d = 1)
										: ((b.style.filter = "alpha(opacity=" + 100 * d + ")"),
										  (d += 1.6 * d)));
						}, 50);
				};
				b.wy = function (a) {
					c.add("beforeRender", a);
				};
				b.Yb = function (a) {
					c.add("afterRender", a);
				};
				b.Os = function (b) {
					a.b.tt(b) &&
						window.OBR.g.I(
							window.OBR.g.l.xg,
							function (a) {
								window.OBR.scroll.ei(a);
							},
							this,
							b
						);
				};
				b.Ls = function (c) {
					window.OBR.g.I(window.OBR.g.l.pg, a.b.oc(), this);
					window.OBR.g.I(
						window.OBR.g.l.hg,
						function () {
							b.mr(c);
							a.controller.Td(c);
						},
						this
					);
				};
				b.mr = function (a) {
					b.zl(window.OBR.Le.Fs(a), a);
					window.OBR.Le.v();
				};
				b.Bc = function (c) {
					a.h.log("HTML - render widget");
					b.zl(c.Pe(), c);
					c.Fb(!0);
				};
				b.ea = function () {
					c.nc();
				};
				b.v(window.OBR);
				return b;
			})();
		window.OBR.zf = window.OBR.zf || { set: Ta, get: Ua };
		window.OBR.Bj =
			window.OBR.Bj ||
			function (a) {
				var b = {},
					c = window.OBR,
					d = {},
					e = {},
					g = {},
					f = {},
					h = "",
					k = null,
					l = null,
					m = null,
					n = null,
					q = !1,
					p = 0,
					t = "html",
					y = !1,
					E = 4e3,
					B = "nano",
					C = !1,
					Aa = !1,
					P = 0,
					Ba = !1,
					Ca = !1,
					Da = null,
					Ea = null,
					Fa = null,
					U = null,
					Ga = null,
					Ha = null,
					Ia = null,
					Ja = !1;
				new window.OBR.Ea();
				var Ka = !1,
					La = -1,
					ia = null,
					Ma = null,
					Na,
					Oa = null,
					Pa = !0,
					Qa = !1,
					V = null,
					nc = null,
					oc = null,
					pc = null,
					qc = null,
					rc = !1,
					sc = null,
					tc = null,
					uc = null,
					vc = null,
					wc = null,
					xc = !1,
					yc = null,
					zc = !1,
					Ac = null,
					Bc = null,
					Cc = null,
					Dc = null,
					Ec = null,
					Fc = null,
					Gc = null,
					Hc = null,
					Ic = null,
					Jc = null,
					Kc = null,
					Lc = null,
					Mc = null;
				b.ux = 0;
				b.tx = 1e3;
				b.ox = 2;
				b.C = a;
				b.He = "";
				b.fa = {};
				b.$q = { slow: 7e3, normal: 5e3, fast: 3e3, qa: 5 };
				b.setData = function (a) {
					a &&
						a.response &&
						((a = a.response),
						a.request && (e = a.request),
						a.settings && (d = a.settings),
						a.meta && (g = a.meta),
						a.data && (f = a.data),
						a.viewability_actions &&
							(g.viewability_actions = a.viewability_actions),
						a.timestamp && (k = a.timestamp),
						a.html && (h = a.html),
						(y = !0));
				};
				b.Qb = function () {
					return d;
				};
				b.Lr = function () {
					return g;
				};
				b.bw = function (a) {
					a && "object" === typeof a && (g = a);
				};
				b.j = function (a, b) {
					a = d[a];
					return "undefined" !== typeof a && null !== a ? a : b;
				};
				b.gb = function (a, b) {
					a = g[a];
					return "undefined" !== typeof a && null !== a ? a : b;
				};
				b.Bb = function (a, b) {
					a = f[a];
					return "undefined" !== typeof a && null !== a ? a : b;
				};
				b.cs = function (a) {
					return a &&
						a.response &&
						a.response.request &&
						((a = a.response.request), (a = a.tcr))
						? a
						: -1;
				};
				b.m = function (a, b) {
					return (a = e[a]) ? a : b;
				};
				b.Gh = function (a) {
					var b = e.obcnsnt;
					return !1 === b ? !1 : !0 === b ? !0 : a;
				};
				b.Pe = function () {
					return h;
				};
				b.If = function (a) {
					h = a;
				};
				b.Ih = function () {
					return k;
				};
				b.yw = function (a) {
					b.Kf(a.permalink);
					b.Bw(a.widgetId);
					b.Iv(a.dynLoad);
					b.Cw(a.widgetType);
					b.Aw(a.fbk);
					b.Kv(a.timeout);
					b.pw(a.srcUrl);
					b.qw(a.testMode);
					b.zw(a.wizWidget);
					b.Jv(a.extId);
					b.Sv(a.installationKey);
					b.Tv(a.installationType);
					b.vv(a.appVer);
					b.qv(a.userId);
					b.vw(a.videoId);
					b.jw(a.playerSrcId);
					b.Rv(a.inPlayer);
					b.kw(a.rtbEnabled);
					b.ew(a.num);
					b.zv(a.cardIdx);
					b.Mv(a.feedFatherIdx);
					b.qn(a.feedFatherIdx);
					b.Av(a.categoryIds);
					b.ow(a.servePc);
					b.Yv(a.maxNumAds);
					b.lw(a.recMode);
					b.Zv(a.maxNumOrganicRecs);
					b.$v(a.maxRTB);
					b.aw(a.maxZRTB);
					b.Wv(a.isZVRTB);
					b.Xv(a.maxBSRTB);
					b.Uv(a.isBSVRTB);
					b.ww(a.videoPlaybackMethod);
					b.sw(a.videoBidFloor);
					b.tv(a.appName);
					b.rv(a.appBundle);
					b.sv(a.appCategory);
					b.uv(a.appStoreUrl);
					b.Hv(a.deviceIfa);
					b.Gv(a.deviceAid);
					b.xw(a.videoWidth);
					b.uw(a.videoHeight);
					b.Lv(a.fId);
					b.Cv(a.clickTrackerUrl);
					b.Nv(a.feedVersion);
					"boolean" === typeof a.isManualWidget && b.Vv(a.isManualWidget);
				};
				b.H = function () {
					return l;
				};
				b.Bw = function (a) {
					l = "string" === typeof a ? a : "NA";
				};
				b.Ov = function () {
					t = "vjapi";
				};
				b.Yk = function () {
					return t;
				};
				b.Gy = function (a) {
					p = a;
				};
				b.Rx = function () {
					return p;
				};
				b.la = function () {
					return m;
				};
				b.Kf = function (a) {
					m = a;
				};
				b.Jh = function () {
					return Ha;
				};
				b.vw = function (a) {
					Ha = a;
				};
				b.el = function () {
					return Ia;
				};
				b.zv = function (a) {
					La = a;
				};
				b.vh = function () {
					return La;
				};
				b.Mv = function (a) {
					ia = a;
				};
				b.Vx = function () {
					return ia;
				};
				b.qn = function (a) {
					void 0 !== a && null !== a && (Ma = c.u[a]);
				};
				b.wh = function () {
					return qc;
				};
				b.Av = function (a) {
					qc = a;
				};
				b.qc = function () {
					return Ma;
				};
				b.Wk = function () {
					return b.qc() ? b.qc().m("wnid", null) : Lc;
				};
				b.Rc = function () {
					return b.qc() ? b.qc().m("abTestVal", null) : null;
				};
				b.Wx = function () {
					return ia;
				};
				b.xn = function (a) {
					V = a;
				};
				b.Ch = function () {
					return V;
				};
				b.zn = function (a) {
					nc = a;
				};
				b.Eh = function () {
					return nc;
				};
				b.yn = function (a) {
					oc = a;
				};
				b.Dh = function () {
					return oc;
				};
				b.gw = function (a) {
					pc = a;
				};
				b.Vr = function () {
					return pc;
				};
				b.et = function () {
					return -1 < (0, window.parseInt)(b.vh(), 10);
				};
				b.jw = function (a) {
					Ia = a;
				};
				b.Rv = function (a) {
					Ja = a;
				};
				b.Ml = function () {
					return Ja;
				};
				b.qw = function (a) {
					Ba = "true" === a || !0 === a;
				};
				b.Ve = function () {
					return Ba;
				};
				b.zw = function (a) {
					Ca = "true" === a || !0 === a;
				};
				b.Et = function () {
					return Ca;
				};
				b.Jv = function (a) {
					Da = a;
				};
				b.Qc = function () {
					return Da;
				};
				b.kw = function (a) {
					Qa = a;
				};
				b.Sl = function () {
					return Qa;
				};
				b.Jy = function (a) {
					Pa = a;
				};
				b.Yl = function () {
					return Pa;
				};
				b.ew = function (a) {
					(0, window.isNaN)(a) || (Oa = a);
				};
				b.Se = function () {
					return Oa;
				};
				b.Sv = function (a) {
					Ea = a;
				};
				b.Tv = function (a) {
					Fa = a;
				};
				b.vv = function (a) {
					U = a;
				};
				b.qv = function (a) {
					Ga = a;
				};
				b.lb = function () {
					return Ga;
				};
				b.pw = function (a) {
					n = a;
				};
				b.il = function () {
					return n;
				};
				b.$s = function () {
					return q;
				};
				b.Iv = function (a) {
					q = "true" === a || !0 === a;
				};
				b.Kl = function () {
					return "flyThrough" === b.j("displayMode", "");
				};
				b.Zl = function () {
					return "video" === b.j("displayMode", "");
				};
				b.my = function () {
					return "recInIframe" === b.j("displayMode", "");
				};
				b.Wh = function () {
					return !0 === b.j("stopRater", !1) || !0 === b.j("stopWidget", !1);
				};
				b.Gl = function () {
					return y;
				};
				b.ut = function () {
					return !0 === b.j("isSkylandersInjectionEnabled", !1);
				};
				b.yt = function () {
					return !0 === b.j("isTopBoxInjectionEnabled", !1);
				};
				b.Xh = function () {
					return (
						null !==
						b
							.j("recMode", "")
							.match(/(odb_dynamic_swipe|odb_dynamic_smartfeed-swipe)/)
					);
				};
				b.El = function () {
					return null !== b.j("recMode", "").match(/(odb_dynamic_ad-carousel)/);
				};
				b.Wl = function () {
					return (
						null !==
						b.j("recMode", "").match(/(odb_dynamic_single-card-carousel)/)
					);
				};
				b.Ws = function () {
					return (
						null !==
						b.j("recMode", "").match(/(odb_dynamic_cards-carousel-box)/)
					);
				};
				b.qt = function () {
					return null !== b.j("recMode", "").match(/(odb_playableAd)/);
				};
				b.Rl = function () {
					return null !== b.j("recMode", "").match(/(odb_podcast)/);
				};
				b.kt = function () {
					return b.j("gridCarouselEnabled", !1);
				};
				b.xt = function () {
					return null !== b.j("recMode", "").match(/(odb_timeline)/);
				};
				b.Il = function () {
					return null !== b.j("recMode", "").match(/(odb_dynamic_display)/);
				};
				b.Tl = function () {
					return null !== b.j("recMode", "").match(/(odb_dynamic_reel)/);
				};
				b.lt = function () {
					return null !== b.j("recMode", "").match(/(odb_dynamic_grid)/);
				};
				b.ot = function () {
					return !0 === b.j("isMegaBlockInjectionEnabled", !1);
				};
				b.Ts = function () {
					return "" !== b.j("afterClickInjectorSelector", "");
				};
				b.ft = function () {
					return (
						b.mb() &&
						b.j("recReasonType") &&
						-1 < b.j("recReasonType").indexOf("follow")
					);
				};
				b.mb = function () {
					return !b.Et() && !0 === b.j("isSmartFeedInjectionEnabled", !1);
				};
				b.jy = function () {
					return !0 === b.j("isInfiniteScrollEnabled", !1);
				};
				b.At = function () {
					return !0 === b.j("isUIExperimentsEnabled", !1);
				};
				b.ns = function () {
					return B;
				};
				b.Ab = function () {
					return Ea;
				};
				b.Pb = function () {
					return Fa;
				};
				b.Ob = function () {
					return U;
				};
				b.Cw = function (a) {
					"string" === typeof a && (B = a.toLowerCase());
				};
				b.Cv = function (a) {
					try {
						var b = window.document.createElement("a");
						b.href = a;
						var c = b.host && b.host !== window.location.host;
						a && c && (Kc = a);
					} catch (qh) {}
				};
				b.xh = function () {
					return Kc;
				};
				b.sn = function () {
					Ka = !0;
				};
				b.hw = function (a) {
					Na = a;
				};
				b.Ql = function () {
					return Na;
				};
				b.ow = function (a) {
					rc = a;
				};
				b.hl = function () {
					return rc;
				};
				b.Yv = function (a) {
					sc = a;
				};
				b.al = function () {
					return sc;
				};
				b.lw = function (a) {
					tc = a;
				};
				b.gl = function () {
					return tc;
				};
				b.Nv = function (a) {
					Mc = a;
				};
				b.Xk = function () {
					return Mc;
				};
				b.Zv = function (a) {
					uc = a;
				};
				b.bl = function () {
					return uc;
				};
				b.$v = function (a) {
					vc = a;
				};
				b.cl = function () {
					return vc;
				};
				b.Wv = function (a) {
					xc = a;
				};
				b.Re = function () {
					return xc;
				};
				b.Xv = function (a) {
					yc = a;
				};
				b.$k = function () {
					return yc;
				};
				b.aw = function (a) {
					wc = a;
				};
				b.dl = function () {
					return wc;
				};
				b.Uv = function (a) {
					zc = a;
				};
				b.ll = function () {
					return Ic;
				};
				b.xw = function (a) {
					Ic = a;
				};
				b.kl = function () {
					return Jc;
				};
				b.uw = function (a) {
					Jc = a;
				};
				b.Lv = function (a) {
					Lc = a;
				};
				b.Qe = function () {
					return zc;
				};
				b.ww = function (a) {
					Ac = a;
				};
				b.Xe = function () {
					return Ac;
				};
				b.sw = function (a) {
					Bc = a ? a.toString() : a;
				};
				b.We = function () {
					return Bc;
				};
				b.Nk = function () {
					return Cc;
				};
				b.Lk = function () {
					return Dc;
				};
				b.Mk = function () {
					return Ec;
				};
				b.Ok = function () {
					return Fc;
				};
				b.Sk = function () {
					return Gc;
				};
				b.Rk = function () {
					return Hc;
				};
				b.tv = function (a) {
					Cc = a;
				};
				b.rv = function (a) {
					Dc = a;
				};
				b.sv = function (a) {
					Ec = a;
				};
				b.uv = function (a) {
					Fc = a;
				};
				b.Hv = function (a) {
					Gc = a;
				};
				b.Gv = function (a) {
					Hc = a;
				};
				b.fy = function () {
					return !!Ka;
				};
				b.Aw = function (a) {
					"string" === typeof a && "" !== a && (b.He = a);
				};
				b.Uh = function () {
					return "" !== b.Ah();
				};
				b.bt = function () {
					return !(0, window.isNaN)((0, window.parseInt)(b.He, 10));
				};
				b.Ah = function () {
					var a;
					var c = (0, window.parseInt)(b.He, 10);
					b.bt() && "number" === typeof c && 0 <= c && 10 > c
						? (a = window.OBR.b.Cr(m, c))
						: (a = b.He);
					return a;
				};
				b.Gd = function () {
					return C;
				};
				b.Fb = function (a) {
					C = !!a;
				};
				b.gy = function () {
					return "hp" === B;
				};
				b.Ux = function () {
					return b.fa;
				};
				b.Hy = function (a) {
					"object" === typeof a && (b.fa = a);
				};
				b.hf = function () {
					return Aa;
				};
				b.Vk = function () {
					return E;
				};
				b.Kv = function (a) {
					E = b.$q[a] || 6e3;
				};
				b.Vv = function (a) {
					Aa = !!a;
				};
				b.Bn = function () {
					var a = b.m("lsd", null),
						d = !0 === b.m("oo", !1),
						e = "string" === typeof a && 0 < a.length,
						f = !0 === b.j("isUseLocalStorageForUUID", !0),
						g = c.f.ff && "1" === b.m("gdpr", "0") + "";
					g = !g || (g && b.Gh(!0));
					f && !d && e && g
						? (c.b.ha("OB-USER-TOKEN", null) !== a &&
								c.b.Pa("OB-USER-TOKEN-CREATION", new Date().getTime()),
						  c.b.Pa("OB-USER-TOKEN", a),
						  window.OBR.zf.set(a))
						: (f && g) ||
						  (c.b.De("OB-USER-TOKEN"), c.b.De("OB-USER-TOKEN-CREATION"));
				};
				b.rn = function () {
					c.b.Pa("OB-FDE", b.j("fraudDetection", 0));
				};
				b.B = function () {
					return 0 === P ? b.C : 1e3 * P + b.C;
				};
				b.Ym = function (a) {
					"string" === typeof a
						? (window.OBR.b.Za(window.OBR.b.w(b.C), "data-src", a),
						  b.Kf(a),
						  (P = 0))
						: (P += 1);
					b.Fb(!1);
				};
				b.Fh = function () {
					return P;
				};
				b.vh = function () {
					var b = window.OBR.b.w(a);
					return b ? b.getAttribute("data-card-idx") : null;
				};
				b.Ar = function () {
					if (b.hf()) return null;
					try {
						var c = window.OBR.b.w(a);
						if (!c) return null;
						var d = c.getBoundingClientRect();
						if (
							0 <= d.top &&
							0 <= d.left &&
							d.bottom <=
								(window.innerHeight ||
									window.document.documentElement.clientHeight) &&
							d.right <=
								(window.innerWidth ||
									window.document.documentElement.clientWidth)
						)
							return 0;
						if (d.top >= -c.offsetHeight)
							return Math.floor(
								d.top - window.document.documentElement.clientHeight
							);
						var e = b.fl(),
							f = e && e.height,
							g = e && e.y;
						return f && g
							? Math.floor(f + g - window.document.documentElement.scrollTop)
							: null;
					} catch (rh) {
						return null;
					}
				};
				b.fl = function () {
					if (b.hf()) return null;
					try {
						var c = window.OBR.b.w(a);
						if (c) {
							var d = c.getBoundingClientRect();
							return {
								x: Math.floor(
									d.left +
										(window.pageXOffset ||
											window.document.documentElement.scrollLeft)
								),
								y: Math.floor(
									d.top +
										(window.pageYOffset ||
											window.document.documentElement.scrollTop)
								),
								height: Math.abs(Math.floor(d.height)),
								width: Math.abs(Math.floor(d.width)),
							};
						}
						return null;
					} catch (ph) {
						return null;
					}
				};
				return b;
			};
		window.OBR.ed =
			window.OBR.ed ||
			(function () {
				var a = window.OBR,
					b = {},
					c = new a.Ea();
				b.fh = function (b) {
					b.idx = b.idx || 0;
					var c = new a.Bj(b.idx);
					c.yw(b);
					return c;
				};
				b.jd = function (d) {
					var e = a.Da.Hq(d);
					a.b.Za(d, "data-dynLoad", "");
					e.permalink = a.Da.lr(e.permalink);
					var g =
						0 !== a.u.length || (a.f.tc !== e.permalink && !0 !== a.f.bi)
							? a.u.length
							: 1;
					e.idx = g;
					var f = b.fh(e);
					a.u[g] = f;
					a.b.Za(d, "data-idx", g);
					a.f.Hk(e);
					0 === g && a.b.fk(d);
					d.id = a.f.Wf + g;
					c.D("onWidgetCreate", [f]);
					return f;
				};
				b.Gm = function (a) {
					c.add("onWidgetCreate", a);
				};
				return b;
			})();
		window.OBR.Da =
			window.OBR.Da ||
			(function () {
				var a = window.OBR,
					b = {
						Ta: {
							widgetId: { a: "data-widget-id", t: "string" },
							permalink: { a: "data-src", t: "string" },
							srcUrl: { a: "data-ob-srcUrl", t: "string" },
							dynLoad: { a: "data-dynLoad", t: "boolean" },
							widgetType: { a: "data-widget-type", t: "string" },
							timeout: { a: "data-timeout", t: "string" },
							fbk: { a: "data-fbk", t: "string" },
							testMode: { a: "data-ob-test", t: "boolean" },
							wizWidget: { a: "data-ob-wiz", t: "boolean" },
							installationKey: { a: "data-ob-installation-key", t: "string" },
							userId: { a: "data-ob-user-id", t: "string", n: !0 },
							videoId: { a: "data-ob-video-id", t: "string" },
							playerSrcId: { a: "data-ob-player-src-id", t: "string" },
							inPlayer: { a: "data-ob-in-player", t: "boolean" },
							installationType: { a: "data-ob-installation-type", t: "string" },
							appVer: { a: "data-ob-app-ver", t: "string" },
							isSecured: { a: "data-is-secured", t: "boolean" },
							extId: { a: "data-external-id", t: "string" },
							rtbEnabled: { a: "data-rtb-enabled", t: "boolean" },
							va: { a: "data-va", t: "boolean" },
							num: { a: "data-num-of-recs", t: "string" },
							cardIdx: { a: "data-card-idx", t: "string" },
							feedFatherIdx: { a: "data-feed-father-idx", t: "string" },
							categoryIds: { a: "data-category-ids", t: "string" },
							servePc: { a: "data-servePc", t: "boolean" },
							maxNumAds: { a: "data-maxNumAds", t: "string" },
							recMode: { a: "data-recMode", t: "string" },
							maxNumOrganicRecs: { a: "data-maxNumOrganicRecs", t: "string" },
							maxRTB: { a: "data-maxRTB", t: "string" },
							maxZRTB: { a: "data-maxZRTB", t: "string" },
							isZVRTB: { a: "data-isZVRTB", t: "boolean" },
							maxBSRTB: { a: "data-maxBSRTB", t: "string" },
							isBSVRTB: { a: "data-isBSVRTB", t: "boolean" },
							videoPlaybackMethod: {
								a: "data-videoPlaybackMethod",
								t: "string",
							},
							appName: { a: "data-appName", t: "string" },
							appBundle: { a: "data-appBundle", t: "string" },
							appCategory: { a: "data-appCategory", t: "string" },
							appStoreUrl: { a: "data-appStoreUrl", t: "string" },
							deviceIfa: { a: "data-deviceIfa", t: "string" },
							deviceAid: { a: "data-deviceAid", t: "string" },
							videoBidFloor: { a: "data-videoBidFloor", t: "string" },
							videoWidth: { a: "data-videoWidth", t: "string" },
							videoHeight: { a: "data-videoHeight", t: "string" },
							fId: { a: "data-fId", t: "string" },
							clickTrackerUrl: { a: "data-click-url", t: "string" },
							feedVersion: { a: "data-feed-version", t: "string" },
						},
						ol: function (b) {
							var c, e;
							if (a.u) {
								var g = a.u.length;
								for (c = 0; c < g; c += 1)
									if ((e = a.u[c]) && e.H() === b) return e;
							}
							return null;
						},
						Sb: function (b) {
							return a.u[b] ? a.u[b] : null;
						},
						Iq: function (a) {
							var c = {},
								e;
							for (e in b.Ta)
								b.Ta.hasOwnProperty(e) &&
									typeof a[e] === b.Ta[e].t &&
									(c[e] = a[e]);
							return c;
						},
						Hq: function (c) {
							var d = {},
								e;
							for (e in b.Ta)
								if (b.Ta.hasOwnProperty(e)) {
									var g = a.b.ga(c, b.Ta[e].a);
									"true" === g || "false" === g
										? (d[e] = "true" === g)
										: typeof g !== b.Ta[e].t ||
										  (!0 !== b.Ta[e].n && "null" === g) ||
										  "" === g ||
										  (d[e] = g);
								}
							return d;
						},
						lr: function (b) {
							if ("string" !== typeof b || "null" === b) b = a.b.Zk(!1);
							else if (
								0 === b.length ||
								0 === b.indexOf("DROP") ||
								0 === b.indexOf("INSERT")
							)
								b = a.b.Zk(!0);
							0 === b.indexOf("//") && (b = a.f.U.replace("//", "") + b);
							return b;
						},
						yq: function (c, d) {
							for (var e in b.Ta)
								b.Ta.hasOwnProperty(e) &&
									typeof c[e] === b.Ta[e].t &&
									a.b.Za(d, b.Ta[e].a, c[e]);
						},
						Px: function () {
							var b,
								d = [];
							for (b = 0; b < a.u.length; b++) d.push(a.u[b].H());
							return d;
						},
					};
				return b;
			})();
		window.OBR.Mb =
			window.OBR.Mb ||
			(function () {
				var a = {},
					b = window.OBR,
					c = {},
					d = new b.Ea();
				a.gc = { wg: 0, TIMEOUT: 1, jo: 2, wj: 3 };
				c.vp = function (a) {
					a.Uh() &&
						(a.sn(),
						c.Qj(a),
						window.OBR.oa.Dm(a, function () {
							c.un(a);
						}),
						window.OBR.oa.Em(a, function () {
							c.vn(a);
						}),
						window.OBR.controller.Wu(a.B(), c.xu));
				};
				a.yp = function (a) {
					a.sn();
					c.Qj(a);
					b.oa.Dm(a, function () {
						c.un(a);
					});
					b.oa.Em(a, function () {
						c.vn(a);
					});
					b.controller.bn(b.controller.nm, a.B(), a.H(), function (a, b) {
						c.wu(b, a);
					});
				};
				c.Qj = function (b) {
					b.fa = { reason: a.gc.wg, $g: !1, Am: !1, Xj: 0, Yj: 0 };
				};
				c.un = function (d) {
					d &&
						d.fa.reason === a.gc.wg &&
						(b.h.log("ODB failed - using IronDome "),
						(d.fa.reason = a.gc.jo),
						c.Di(d));
				};
				c.xu = function (d) {
					(0, window.clearTimeout)(d.fa.ji);
					window.OBR.h.log("Editorial ODB returned for " + d.B());
					d.fa.$g ||
						(!0 === d.j("ispartialrecs", !1)
							? (b.h.log("ODB partial - using IronDome "),
							  (d.fa.reason = a.gc.wj),
							  c.Di(d))
							: (d.fa.Am = !0));
				};
				c.Di = function (a) {
					(0, window.clearTimeout)(a.fa.ji);
					if (a.Wh()) b.h.log("CDN canceled stop setting");
					else {
						var d = c.sr(a);
						c.Ks(d, a);
					}
				};
				c.sr = function (a) {
					var c = b.f.Qp;
					a = a.Ah() + "_" + a.H() + "_" + a.C;
					return c + a;
				};
				c.Ks = function (a, c) {
					var d = b.b.xa(0, a, !1);
					c.fa.Yj = new Date().getTime();
					b.b.Ca(d);
					b.h.log("Inject CDN call: " + a);
				};
				c.vn = function (a) {
					a.fa.ji = (0, window.setTimeout)(function () {
						c.qu(a);
					}, a.Vk());
				};
				c.qu = function (d) {
					d.fa.reason = a.gc.TIMEOUT;
					b.h.log("ODB Timeout - using IronDome ");
					c.Di(d);
				};
				a.Wj = function (a, d) {
					if (a && a.response) {
						window.OBR.h.log("Cdn response returned");
						var e = b.Da.Sb(d);
						if (!e && ((e = b.b.Bh(d)), !e)) return;
						e.fa.Xj = new Date().getTime() - e.fa.Yj;
						b.oa.Hp(e);
						c.dv(e, a);
						c.Ms(e);
					}
				};
				c.dv = function (a, c) {
					a.fa.$g = !0;
					c.response && c.response.request && (c.response.request.req_id = "");
					a.fa.Am ||
						(a.hf() && c.response.documents
							? b.controller.Ke(
									window.OBR.controller.mf,
									a.C,
									a.H(),
									c.response.documents
							  )
							: (a.setData(c), (b.u[a.C] = a), window.OBR.controller.Bc(a.C)),
						a.Fb(!0));
				};
				c.Ms = function (a) {
					var c = b.b.na(a.la()),
						d = a.j("irdfb", "");
					"" !== d &&
						((d += "&reason=" + a.fa.reason),
						(d = d + ("&url=" + c) + ("&at=" + a.fa.Xj)),
						(d += "&to=" + a.Vk() || ""),
						(d += "&ir=" + (a.fa.$g ? 1 : 0)),
						(a = window.OBR.b.xa(0, d, !1, !0)),
						window.OBR.b.Ca(a));
				};
				c.wu = function (a, d) {
					var e = b.b.Bh(a);
					(0, window.clearTimeout)(e.fa.ji);
					d && d.settings && !0 === d.settings.ispartialrecs
						? c.Ey(e)
						: b.controller.Ke(b.controller.mf, a, e.H(), d.response.documents);
				};
				b.ed.Gm(c.vp);
				a.ea = function () {
					d.nc();
				};
				a.ia = function () {
					return c;
				};
				return a;
			})();
		window.OBR.W =
			window.OBR.W ||
			(function () {
				var a = {},
					b = window.OBR,
					c = { height: 0, width: 0 },
					d = 300,
					e = 300,
					g = null;
				a.Ia = function (a) {
					b = a;
				};
				a.ia = function () {
					var a = {};
					a.Ib = b;
					return a;
				};
				a.Tc = function () {
					return new window.OBR.ne({});
				};
				a.Ii = function () {
					var a = { height: 0, width: 0 };
					var b = void 0 !== window.innerWidth;
					var d =
						void 0 !== window.document.documentElement &&
						void 0 !== window.document.documentElement.clientWidth &&
						0 !== window.document.documentElement.clientWidth;
					b
						? ((a.height = window.innerHeight), (a.width = window.innerWidth))
						: d
						? ((a.height = window.document.documentElement.clientHeight),
						  (a.width = window.document.documentElement.clientWidth))
						: !1 === b &&
						  !1 === d &&
						  ((a.height =
								window.document.getElementsByTagName("body")[0].clientHeight),
						  (a.width =
								window.document.getElementsByTagName("body")[0].clientWidth));
					c = a;
				};
				a.Ha = function () {
					return c;
				};
				a.on = function () {
					window.document &&
						window.document.body &&
						(d = Math.max(
							Math.max(
								window.document.body.scrollHeight,
								window.document.documentElement.scrollHeight
							),
							Math.max(
								window.document.body.offsetHeight,
								window.document.documentElement.offsetHeight
							),
							Math.max(
								window.document.body.clientHeight,
								window.document.documentElement.clientHeight
							)
						));
				};
				a.yh = function () {
					return d;
				};
				a.pn = function () {
					window.document &&
						window.document.body &&
						(e = Math.max(
							Math.max(
								window.document.body.scrollWidth,
								window.document.documentElement.scrollWidth
							),
							Math.max(
								window.document.body.offsetWidth,
								window.document.documentElement.offsetWidth
							),
							Math.max(
								window.document.body.clientWidth,
								window.document.documentElement.clientWidth
							)
						));
				};
				a.Br = function () {
					return e;
				};
				a.pv = function (a) {
					g = a;
				};
				a.Jk = function () {
					return g;
				};
				a.zh = function (b) {
					var c = 0;
					if (!b) return a.ri.nj;
					try {
						if (b.offsetParent)
							for (;;) {
								c += b.offsetTop;
								if (!b.offsetParent) break;
								b = b.offsetParent;
							}
						else b.y && (c += b.y);
					} catch (k) {
						return window.OBR.error(k), a.ri.nj;
					}
					return (0, window.parseInt)(c, 10);
				};
				a.jl = function () {
					return window.document.documentElement.scrollTop
						? window.document.documentElement.scrollTop
						: window.document.body.scrollTop;
				};
				a.pt = function () {
					return window.OBR.W.Ha().height + 10 >= window.OBR.W.yh();
				};
				window.OBR.b.ba(window, "resize", function () {
					a.Ii();
					a.on();
					a.pn();
				});
				a.Ii();
				a.on();
				a.pn();
				return a;
			})();
		window.OBR.ne =
			window.OBR.ne ||
			function (a) {
				var b,
					c = {},
					d = "undefined" !== typeof window.OB_amp;
				c.ri = { nj: 1e4 };
				if (a) for (b in a) a.hasOwnProperty(b) && (c.ri[b] = a[b]);
				c.od = function (a, b, f) {
					if (!a || 0 > b || 100 < b) return !1;
					f || (f = { top: 0, bottom: 0 });
					if (d) {
						f = window.OBR.W.Jk();
						if (!f) return !1;
						var e = c.Pj(a, f);
						a = c.Oj(e, f);
						return (
							(b =
								0 <= a.height &&
								0 <= a.width &&
								Math.max(
									1,
									Math.round(
										(Math.min(e.height, f.rootBounds.height) * b) / 100
									)
								)) && a.height >= b
						);
					}
					a = a.getBoundingClientRect();
					e = window.OBR.W.Ha().height;
					a = {
						top: a.top - f.top,
						height: a.height + f.bottom,
						bottom: a.top + a.height + f.bottom,
					};
					b = Math.round((a.height * b) / 100) || 1;
					b = b > e ? e - 1 : b;
					return a.top + b <= e && 0 <= a.bottom - b;
				};
				c.sc = function (a, b, f, h) {
					if (d) {
						h = window.OBR.W.Jk();
						if (!h) return !1;
						a = c.Pj(a, h);
						h = c.Oj(a, h);
					} else
						(f = a = a.getBoundingClientRect()),
							(h = h
								? h.getBoundingClientRect()
								: {
										top: 0,
										left: 0,
										width: Math.max(
											window.document.documentElement.clientWidth,
											window.innerWidth || 0
										),
										height: Math.max(
											window.document.documentElement.clientHeight,
											window.innerHeight || 0
										),
								  }),
							(h =
								(Math.min(f.width + f.left, h.width + h.left) -
									Math.max(f.left, h.left)) *
								(Math.min(f.height + f.top, h.height + h.top) -
									Math.max(f.top, h.top)));
					return h / (a.width * a.height) >= b / 100;
				};
				c.Oj = function (a, b) {
					b = b.rootBounds;
					a = {
						left: Math.max(a.left, b.left),
						right: Math.min(a.right, b.right),
						top: Math.max(a.top, b.top),
						bottom: Math.min(a.bottom, b.bottom),
					};
					a.width = a.right - a.left;
					a.height = a.bottom - a.top;
					return a;
				};
				c.Pj = function (a, b) {
					b = b.boundingClientRect;
					a = a.getBoundingClientRect();
					return {
						top: a.top + b.top,
						bottom: a.bottom + b.top,
						left: a.left + b.left,
						right: a.right + b.left,
						width: a.width,
						height: a.height,
					};
				};
				return c;
			};
		window.OBR.g.N(window.OBR.g.l.pg);
		window.OBR.IntersectionObserver =
			window.OBR.IntersectionObserver ||
			(function () {
				function a(a) {
					this.za = this.Db = null;
					this.i = !1;
					this.o = null;
					this.G = {
						callback: function () {},
						callbackParams: [],
						element: null,
						intersectPercentage: 0,
						scrollDimmer: 200,
						unobserve: !1,
						threshold: [1],
						rootMargin: "0px",
					};
					this.J(a);
				}
				a.prototype.J = function (a) {
					a && (this.G = Object.assign(this.G, a));
				};
				a.prototype.V = function () {
					var a = {
						rootMargin: this.G.rootMargin,
						threshold: this.G.threshold,
					};
					this.G.root && (a.root = this.G.root);
					this.o = new window.IntersectionObserver(this.ca.bind(this), a);
					this.o.observe(this.G.element);
					return this.o;
				};
				a.prototype.ca = function (a, c) {
					this.G
						? this.G.element && window.document.body.contains(this.G.element)
							? a &&
							  a[0] &&
							  a[0].intersectionRatio > this.G.intersectPercentage &&
							  (this.G.callback.apply(this, this.G.callbackParams),
							  this.G.unobserve && (c.unobserve(a[0].target), c.disconnect()))
							: (c.unobserve(this.G.element), c.disconnect())
						: c.disconnect();
				};
				a.prototype.wa = function () {
					var a = this.G.checkAbsoluteVisibility ? this.Db.sc : this.Db.od;
					if (this.i) this.i = !1;
					else {
						var c = this.G.intersectPercentage;
						a(
							this.G.element,
							0 <= c && 1 >= c ? 100 * c : c,
							this.G.rootMarginObj,
							this.G.root
						) &&
							((this.i = !0),
							this.G.callback.apply(this, this.G.callbackParams),
							this.G.unobserve && window.OBR.b.rb(window, "scroll", this.c));
					}
				};
				a.prototype.A = function () {
					var a = this;
					this.G.element && window.document.body.contains(this.G.element)
						? this.za ||
						  (this.wa(),
						  (0, window.setTimeout)(function () {
								a.za = !1;
						  }, this.G.scrollDimmer),
						  (this.za = !0))
						: window.OBR.b.rb(window, "scroll", this.c);
				};
				a.prototype.Ya = function () {
					var a = this.G.rootMargin.split(" ");
					this.G.rootMarginObj = {
						top: (0, window.parseInt)(a[0]),
						right: (0, window.parseInt)(a[1] || a[0]),
						bottom: (0, window.parseInt)(a[2] || a[0]),
						left: (0, window.parseInt)(a[3] || a[0]),
					};
				};
				a.prototype.unobserve = function () {
					window.OBR.f.Kh || window.removeEventListener("scroll", this.c);
					this.G = null;
				};
				a.prototype.observe = function () {
					if (!this.G.element) return null;
					if (window.OBR.f.Kh) return this.V();
					this.Ya();
					this.Db = window.OBR.W.Tc();
					this.c = this.A.bind(this);
					window.OBR.b.ba(window, "scroll", this.c);
					this.A();
					return this;
				};
				return a;
			})();
		Xa.prototype.Hf = function (a) {
			if (!a.gx) {
				var b = a.B();
				this.c[b] || (this.c[b] = window.OBR.b.w(b));
				window.OBR.f.mp ||
					((a = a.B()),
					new window.OBR.IntersectionObserver({
						callback: this.Ze.bind(this),
						callbackParams: [a],
						element: window.OBR.b.w(a),
						unobserve: !0,
						threshold: [0],
					}).observe());
			}
		};
		Xa.prototype.Gf = function () {
			var a = this;
			this.c.forEach(function (b, c) {
				void 0 !== b && b && a.si.od(b, 0) && a.Ze(c);
			});
		};
		Xa.prototype.ea = function () {
			this.za = !1;
			this.c = [];
			this.i = new window.OBR.nh();
			this.J = 0;
			this.startTime = new Date().getTime();
			this.o = !1;
		};
		Xa.prototype.Ze = function (a) {
			if (this.c[a]) {
				var b = window.OBR.u[a];
				z(this, b, this.Fa.td);
				b.gx = !0;
				Va(b);
				this.c[a] = null;
			}
			return a;
		};
		window.OBR.Qa = window.OBR.Qa || new Xa();
		window.OBR.Ee = new (function () {})();
		(function (a) {
			function b() {}
			b.prototype.ia = function () {
				return {
					by: this.i.bind(this),
					Gx: this.c.bind(this),
					send: this.o.bind(this),
				};
			};
			b.prototype.Sh = function () {
				return "undefined" !== typeof window.XMLHttpRequest;
			};
			b.prototype.vt = function () {
				return "withCredentials" in new window.XMLHttpRequest()
					? !0
					: "undefined" !== typeof window.XDomainRequest;
			};
			b.prototype.get = function (a, b, e, g, f, h) {
				var c = this.i();
				b = this.c(b);
				this.o(c, a + (b.length ? "?" + b : ""), e, "GET", null, g, f, h);
			};
			b.prototype.wf = function (b, d, e) {
				var c = this.i();
				d = this.c(d);
				this.o(c, b, e, a.f.aa.da, d, !0);
			};
			b.prototype.Lu = function (a) {
				var b = bc,
					c = this.i();
				a = JSON.stringify(a);
				this.o(c, b, void 0, "POST", a, !0, "text/plain; charset=UTF-8");
			};
			b.prototype.Ht = function (b, d, e) {
				d = this.c(d);
				b = a.b.xa(
					"dataBI" + a.b.Ue(),
					b + (d.length ? "?" + d : ""),
					!0,
					!0,
					e
				);
				a.b.Ca(b);
			};
			b.prototype.o = function (b, d, e, g, f, h, k, l) {
				void 0 === h && (h = !0);
				var c = "";
				try {
					c = "Url: " + d + "\n" + Error().stack;
				} catch (n) {}
				b.addEventListener("error", function () {
					0 !== b.status &&
						a.error({
							name: "obm-AjaxError",
							message: "Ajax error failed, method: " + g + " With data: " + f,
							stack: c,
						});
				});
				b.open(g, d, h);
				b.onreadystatechange = function () {
					4 === b.readyState && typeof e === a.f.xd && e(b.responseText);
				};
				l && (b.withCredentials = !0);
				k
					? b.setRequestHeader("Content-type", k)
					: g === a.f.aa.da &&
					  b.setRequestHeader(
							"Content-type",
							"application/x-www-form-urlencoded"
					  );
				b.send(f);
			};
			b.prototype.c = function (a) {
				var b = [],
					c;
				for (c in a)
					a.hasOwnProperty(c) &&
						b.push(
							(0, window.encodeURIComponent)(c) +
								"=" +
								(0, window.encodeURIComponent)(a[c])
						);
				return b.join("&");
			};
			b.prototype.i = function () {
				if (this.Sh()) return new window.XMLHttpRequest();
				for (
					var a = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.3.0"], b, e = 0;
					e < a.length;
					e++
				)
					try {
						b = new window.ActiveXObject(a[e]);
						break;
					} catch (g) {}
				return b;
			};
			a.Aa = new b();
		})(window.OBR);
		var eb = window.OBR.f.uf + "loggerServices/dwce_cheq_events";
		var ob = "https://tcheck." + window.OBR.f.Fu + "/tcheck/check";
		window.OBR.Nb ||
			((window.OBR.he = new gb()), (window.OBR.Nb = new rb()), xb());
		var bc = window.OBR.f.uf + "api/loggerBatch/log-viewability";
		Db.prototype.log = function (a, b) {
			a = {
				timeElapsed: Date.now() - this.startTime,
				requestId: a.m("req_id", null),
				position: +b.getAttribute("data-pos"),
				renderables: Ab(b),
			};
			this.i.push(a);
			10 <= this.i.length
				? (this.c && ((0, window.clearTimeout)(this.c), (this.c = null)),
				  this.o())
				: this.c || (this.c = (0, window.setTimeout)(this.o.bind(this), 1200));
		};
		Db.prototype.o = function () {
			this.c = null;
			if (this.i.length) {
				var a = this.i.splice(0);
				a && a.length
					? window.OBR.f.Ln
						? window.navigator.sendBeacon(bc, JSON.stringify(a))
						: window.OBR.Aa.Lu(a)
					: window.OBR.error(Error("Failed to send viewability data"));
			}
		};
		var cc = { bh: !1 };
		OBR._jsc.r = Eb.prototype;
		OBR._jsc.r.Th = function (a) {
			return a.j("listingsViewability", !0);
		};
		OBR._jsc.r.Kb = function (a, b) {
			if (this.Th(a)) {
				var c = Object.assign({}, cc);
				c && Object.assign(c, b);
				a.Xn = c;
				c.St ||
					((b = a.Xn.bh ? this.i(a) : this.o(a)) &&
						0 < b.length &&
						this.qf(a, b));
			}
		};
		OBR._jsc.r.observe = function (a, b) {
			a = new window.OBR.IntersectionObserver({
				threshold: [0.5],
				unobserve: !0,
				intersectPercentage: 0.5,
				callback: this.Bo.bind(this),
				callbackParams: [a, b],
				element: b,
				checkAbsoluteVisibility: !0,
			});
			this.c.push(a);
			a.observe();
		};
		OBR._jsc.r.qf = function (a, b) {
			var c = this;
			b.forEach(function (b) {
				return c.observe(a, b);
			});
		};
		OBR._jsc.r.Bo = function (a, b) {
			var c = this;
			(0, window.setTimeout)(function () {
				if (c.Db.sc(b, 50)) {
					c.A.log(a, b);
					var d = a.Xn;
					d.Fm && d.Fm(a, b);
				} else c.observe(a, b);
			}, 1e3);
		};
		OBR._jsc.r.ea = function () {
			this.c.forEach(function (a) {
				return a.unobserve();
			});
			this.c = [];
		};
		window.OBR.vb || (window.OBR.vb = new Eb());
		Fb.prototype.observe = function (a, b, c, d, e) {
			a = {
				threshold: 2 === d ? 0.5 : 1,
				unobserve: !0,
				intersectPercentage: 2 === d ? 0.5 : 0.99,
				callback: this.i.bind(this),
				callbackParams: [a, b, c, d, e],
				element: b,
				checkAbsoluteVisibility: !0,
			};
			a = new window.OBR.IntersectionObserver(a);
			this.c.push(a);
			a.observe();
		};
		Fb.prototype.i = function (a, b, c, d, e) {
			var g = this,
				f = 2 === d ? 50 : 100;
			(0, window.setTimeout)(function () {
				g.Db.sc(b, f) ? Jb(a, c, e) : g.observe(a, b, c, d, e);
			}, 1e3);
		};
		Fb.prototype.ea = function () {
			this.c.forEach(function (a) {
				a && a.unobserve && a.unobserve();
			});
			this.c = [];
		};
		window.OBR.Fe || (window.OBR.Fe = new Fb());
		Ob.prototype.i = function (a, b) {
			a.Ja === window.OBR.b.w(a.s.B()) &&
				(b && 0 === a.mode
					? (this.c(b),
					  0 ===
							a.Ja.querySelectorAll(".ob-lazy-bgimg, .ob-lazy-img").length &&
							(a.s.yl = !0))
					: ([].slice
							.call(a.Ja.querySelectorAll(".ob-lazy-bgimg, .ob-lazy-img"))
							.forEach(this.c),
					  (a.s.yl = !0)));
		};
		Ob.prototype.c = function (a) {
			if ("IMG" === a.tagName.toUpperCase()) {
				var b = a.getAttribute("data-ob-src");
				b &&
					(a.setAttribute("src", b),
					a.removeAttribute("data-ob-src"),
					window.OBR.b.X(a, "ob-lazy-img"));
			} else window.OBR.b.X(a, "ob-lazy-bgimg");
		};
		var Pb = new Ob();
		window.OBR.le = window.OBR.le || {
			jd: function (a, b) {
				b ||
					((b = { em: 0 }),
					a
						.j("recMode", "")
						.match(/swipe-strip|touch-strip|carousel|timeline/) && (b.em = 1));
				if (a.j("useImagesLazyLoad", !1) && !a.yl) {
					a = {
						rootMargin: a.j("imagesLazyLoadMargin", 500) + "px",
						s: a,
						Ja: window.OBR.b.w(a.B()),
						mode: (b || {}).em || 0,
					};
					b = Pb;
					if (a && a.Ja) {
						var c;
						(c = a.Ja)
							? ((c = c.getBoundingClientRect()),
							  (c = { x: c.x, y: c.y, width: c.width, height: c.height }))
							: (c = {});
						var d = c,
							e = a.rootMargin,
							g = b.o;
						c = Object.assign({}, d);
						e = (0, window.parseInt)(e);
						0 > d.y ? (c.height += e) : d.y > g.height && (c.y -= e);
						b = b.o;
						b =
							0 <
							(Math.min(c.width + c.x, b.width + b.x) - Math.max(c.x, b.x)) *
								(Math.min(c.height + c.y, b.height + b.y) - Math.max(c.y, b.y));
					} else b = !1;
					b ? Pb.i(a) : Qb(a);
				}
			},
		};
		window.OBR.sm = window.OBR.sm || Rb;
		Sb.prototype.D = function (a, b, c) {
			if (this.i && "undefined" !== typeof b && "undefined" !== typeof c) {
				c.method = window.OBR.Aa.vt() ? c.method : window.OBR.f.aa.so;
				var d = c.callback ? c.callback : function () {};
				b = b ? b : {};
				c.FIRED = c.FIRED ? c.FIRED : 0;
				if (!(c.LIMIT && c.FIRED >= c.LIMIT))
					switch (((c.FIRED += 1), (a = this.Sg(a, b, c.method)), c.method)) {
						case window.OBR.f.aa.po:
							window.OBR.Aa.get(this.c, a, d, !0);
							break;
						case window.OBR.f.aa.da:
							window.OBR.Aa.wf(this.c, a, d);
							break;
						default:
							window.OBR.Aa.Ht(this.c, a, d);
					}
			}
		};
		Sb.prototype.Sg = function (a, b, c) {
			var d = {},
				e = this.s.qc(),
				g = !this.s.mb() && !!e,
				f = g ? e.m("wnid", "") : this.s.m("wnid", ""),
				h = g || this.s.mb() ? this.s.m("wnid", "") : null;
			e = g ? e.m("widgetJsId", "") : this.s.m("widgetJsId", "");
			g = g || this.s.mb() ? this.s.m("widgetJsId", "") : null;
			b.ajaxMethod = c;
			b.clientTimestamp = Date.now();
			b.timestamp = "";
			b.publisherId = this.s.m("pid", "");
			b.sectionId = this.s.m("sid", "");
			b.widgetJsId = e;
			b.widgetId = f;
			b.subWidgetJsId = g;
			b.subWidgetId = h;
			b.cardIdx = this.s.vh();
			b.docId = this.s.m("did", "");
			b.uuid = this.s.m("lsd", "");
			b.platform = this.s.m("readerPlatform", "");
			b.deviceOs = "";
			b.deviceOrientation = window.OBR.b.Tk();
			this.s.Gh(!0) || delete b.uuid;
			d.sessionId = this.o;
			d.eventGroup = this.A;
			d.eventTypeId = a;
			d.requestId = this.s.m("req_id", -1);
			d.attributes = JSON.stringify(b);
			return d;
		};
		Sb.prototype.setActive = function (a) {
			this.i = a;
		};
		window.OBR.L = Sb;
		window.OBR.proxy = window.OBR.proxy || {
			Nt: function (a, b, c) {
				window.OBR.g.I(b, c, this, {
					currentWidget: a,
					beforeLoadTime: new Date().getTime(),
				});
			},
		};
		window.OB_PROXY = window.OB_PROXY || {
			getSet: function (a, b, c) {
				return a.j(b, c);
			},
			getRequest: function (a, b, c) {
				return a.m(b, c);
			},
			getWidgetId: function (a) {
				return a.H();
			},
			makeHandshake: function (a) {
				window.OBR.g.N(a);
			},
			hasJqueryInstalled: function () {
				return window.OBR.b.wl();
			},
			getWidgetIndex: function (a) {
				return a.B();
			},
			getMeta: function (a, b, c) {
				return a.gb(b, c);
			},
			getFeedParentWidget: function (a) {
				return a.qc();
			},
			getFeedFatherAB: function (a) {
				return a.Rc();
			},
			isFeedCard: function (a) {
				return a.et();
			},
			getUserId: function (a) {
				return a.lb();
			},
			getDataSrcFinalUrl: function (a) {
				return a.la();
			},
			getAdBlockerStatus: function () {
				return window.OBR.cb.Dd();
			},
			getExtId: function (a) {
				var b = "",
					c = window.OBR.b.Uf(window.OBR.f.jh);
				a = window.OBR.b.Uf(a.Qc());
				if (c || a) b = a || c;
				return b;
			},
		};
		window.OBR.extern =
			window.OBR.extern ||
			(function () {
				var a = window.OBR,
					b = {
						Bd: [],
						getStat: function () {},
						showDescription: function (b, d) {
							a.g.I(
								window.OBR.g.l.og,
								function () {
									window.OBR.Pm.Mt(b, d);
								},
								this
							);
						},
						returnedHtmlData: function (b, d) {
							a.controller.ii(b, d);
						},
						returnedIrdData: function (b, d) {
							a.Mb.Wj(b, d);
						},
						returnedJsonData: function (b, d) {
							a.controller.zm(b, d);
						},
						returnedError: function (b) {
							window.OBR.h.log("Call made using extern class");
							a.h.log("Callback error" + b);
						},
						callRecs: function (b, d) {
							window.OBR.h.log("Call made using extern class");
							a.controller.ci(b, function (a) {
								try {
									d(a);
								} catch (g) {
									window.OBR.h.log(g);
								}
							});
						},
						callClick: function (b, d) {
							window.OBR.h.log("Call made using extern class");
							a.controller.Xc(b, d);
						},
						callWhatIs: function (a, b, e, g, f, h) {
							window.OBR.g.I(
								window.OBR.g.l.pe,
								function () {
									window.OBR.cj.Uj(a, b, e, g, f, h);
								},
								this
							);
							return !1;
						},
						callUserZapping: function (a, b, e, g, f) {
							window.OBR.g.I(
								window.OBR.g.l.Hg,
								function () {
									window.OBR.Zi.Jp(a, b, e, g, f);
								},
								this
							);
							return !1;
						},
						zappingFormAction: function (a, b, e, g, f) {
							window.OBR.Zi.co(a, b, e, g, f);
							return !1;
						},
						userZappingMessage: function (a) {
							window.OBR.h.log(a.message);
						},
						recClicked: function (b, d) {
							window.OBR.h.log("Call made using extern class");
							a.controller.Tm(d);
						},
						imageError: function (b) {
							window.OBR.h.log("Call made using extern class");
							window.OBR.error({
								name: "obm-ImageError",
								message: "Error loading as image: " + b.src,
							});
							a.b.$j(b);
						},
						logError: function (b, d, e, g) {
							a.b.Wb(b, d, e, g);
						},
						showRecInIframe: function (b, d, e) {
							a.g.I(
								a.g.l.tg,
								function () {
									a.Um.Gw(b, d, e);
								},
								this
							);
						},
						openNativeVideoPlayer: function (
							b,
							d,
							e,
							g,
							f,
							h,
							k,
							l,
							m,
							n,
							q,
							p,
							t,
							y,
							E,
							B,
							C
						) {
							a.g.I(
								a.g.l.fd,
								function () {
									C = C ? C : a.u[p].m("req_id", null);
									window.NVPInjector.main.init(
										a.b.cx([
											b,
											d,
											e,
											g,
											f,
											h,
											k,
											l,
											m,
											n,
											q,
											p,
											t,
											y,
											C,
											a.f.Af,
											a.u[p].m("lang", "en"),
											a.u[p].m("lsd", null),
											a.u[p].m("pid", null),
											a.u[p].m("sid", null),
											a.u[p].m("wnid", null),
											E,
											a.u[p].m("gl", ""),
											a.u[p].Ih(),
											a.u[p].m("widgetJsId", a.u[p].H()),
											a.u[p].m("req_id", "-1"),
											a.u[p].m("pvId", "-1"),
										]),
										a.u[p].Qb(),
										B
									);
								},
								this
							);
							return !1;
						},
						openOverlay: function (b) {
							a.g.I(
								a.g.l.fd,
								function () {
									var c = b.getAttribute("data-nvp");
									if (null !== c && "string" === typeof c) {
										c = window.JSON.parse(
											b
												.getAttribute("data-nvp")
												.replace(/"/g, "#$#")
												.replace(/'/g, '"')
												.replace(/\\"/g, "'")
												.replace("#$#", '\\"')
										);
										var e = a.u[c.widgetIdx];
										c.platform = a.f.Af;
										c.lang = e.m("lang", "en");
										c.uuid = e.m("lsd", null);
										c.publisherId = e.m("pid", null);
										c.sourceId = e.m("sid", null);
										c.widgetNumberId = e.m("wnid", null);
										c.location = e.m("gl", "");
										c.timestamp = e.Ih();
										window.NVPInjector.main.recClicked(c, e.Qb());
									} else
										a.error({
											name: "obm-nvpError",
											message: "Error parsing data-nvp: " + c,
											stack: "None",
										});
								},
								this
							);
							return !1;
						},
						handshakeNVP: function () {
							a.g.N(window.OBR.g.l.fd);
						},
						onVideoClick: function (b, d) {
							a.controller.mi(b, d);
						},
						manualVideoClicked: function (b, d, e, g, f) {
							a.controller.di(b, d, e, g, f);
						},
						errorInjectionHandler: function (a) {
							window.OBR.u[a].Mx(a);
						},
						reloadWidget: function () {
							window.OBR.h.log("## Reload widget");
							a.controller.cn();
						},
						researchWidget: function () {
							window.OBR.h.log("## Research widget");
							a.controller.Cc();
						},
						renderSpaWidgets: function (b) {
							window.OBR.h.log(
								"## renderSpaWidgets - SPA has triggered a widget render"
							);
							window.OBR.f.Zd && window.OBR.f.Zd.Kq !== b
								? (window.OBR.h.log(
										"## renderSpaWidgets - page navigation detected. triggering reload"
								  ),
								  a.controller.cn())
								: (window.OBR.h.log(
										"## renderSpaWidgets - " +
											(window.OBR.f.Zd
												? "still on same page"
												: "first widget mounting detected") +
											". researching for new widgets on page"
								  ),
								  a.controller.Cc());
							window.OBR.f.Zd = window.OBR.f.Zd || {};
							window.OBR.f.Zd.Kq = b;
						},
						cancelRecommendation: function (b) {
							window.OBR.h.log("cancel recommendation with bocr " + b);
							a.controller.Lp(b);
						},
						cancelRecs: function (b, d, e) {
							window.OBR.h.log(
								"cancel recommendation by doc url " +
									b +
									" publisher id = " +
									d +
									" isAd = " +
									e
							);
							a.controller.Mp(b, d, e);
						},
						refreshWidget: function (b) {
							window.OBR.h.log("## Refresh widget");
							a.controller.$b(b);
						},
						setABtest: function (b) {
							b && (a.f.Rg = "&obAbtest=" + b);
						},
						refreshSpecificWidget: function (b, d) {
							window.OBR.h.log("## Refresh SPECIFIC widget");
							"string" !== typeof d
								? a.g.I(
										a.g.l.vg,
										function () {
											window.OBR.controller.Zm(b, d);
										},
										this
								  )
								: window.OBR.controller.Zm(b, d);
						},
						getCountOfRecs: function (b) {
							return a.controller.vr(b);
						},
						onOdbReturn: function (b, d) {
							a.controller.Xu(b, d);
						},
						closeCard: function () {
							a.Le.qq();
						},
						closeModal: function () {
							try {
								a.modal.hideModal();
							} catch (c) {
								window.OBR.error(c);
							}
						},
						handshakeModule: function (b) {
							try {
								var c = window.OBR.g.Nr(b);
								c
									? window.OBR.g.N(c)
									: a.error({
											name: "obm-MakeHandShakeError",
											message:
												"Error in module: " + b + ", Err: Module not found",
											stack: "None",
									  });
							} catch (e) {
								window.OBR.error(e);
							}
						},
						callLoadMore: function (a, b) {
							window.OBR.g.I(
								window.OBR.g.l.me,
								function () {
									window.OBR.Zh.ef(a, b);
								},
								this
							);
						},
						enableTbx: function () {
							window.OBR.cc ? window.OBR.cc.Al() : (window.OBR.f.Jm = !0);
						},
						closeTbx: function () {
							window.OBR.cc.sq();
						},
						scrollIntoView: function () {
							Za();
						},
						ampIntersectionChange: function (a) {
							window.OBR.W.pv(a);
						},
						ampUpdateViewportSize: function () {
							window.OBR.W.Ii();
						},
						callUserSentiments: function (b, d) {
							window.OBR.g.I(
								window.OBR.g.l.Gg,
								function () {
									window.OBR.Vn.Ip(b, d);
								},
								this,
								null,
								a.u[d.idx].m("lang", "en")
							);
							return !1;
						},
						video: {},
					};
				b.video.getVideoRecs = function (a, b, e, g, f, h, k) {
					window.OBR.g.I(
						window.OBR.g.l.Ig,
						function () {
							window.OBR.video.ls(a, b, e, g, f, h, k);
						},
						this
					);
				};
				b.video.videoClicked = function (a) {
					window.OBR.video.dx(a);
				};
				b.video.initInPlayerWidget = function (c) {
					c = new window.OBR.ro(c);
					b.Bd.push(c);
					1 !== a.g.Or(a.g.l.ke) &&
						a.g.I(
							a.g.l.ke,
							function () {
								a.rc.gm(b.Bd);
							},
							this
						);
					return c;
				};
				b.recReasons = {};
				b.recReasons.loadScopedWidget = function (b, d, e, g) {
					return a.controller.im(b, d, e, g);
				};
				b.recReasons.backFromScopedWidget = function (b) {
					return a.controller.sp(b);
				};
				b.recReasons.onRecLinkHover = function (a) {
					window.OBR.b.R(a.parentElement, "rec-link-hover");
				};
				b.recReasons.onRecLinkHoverOut = function (a) {
					window.OBR.b.X(a.parentElement, "rec-link-hover");
				};
				b.truncateText = function (a, b, e) {
					OBR._jsc.db(window.OBR.Ee, a, b, e);
				};
				b.reloadPager = function (a, b) {
					(a = window.OBR.u[a]) &&
						window.OBR.controller.Km(a, void 0 === b ? !1 : b);
				};
				b.recReasons.onRecFollowClick = function (a, b, e, g) {
					window.OBR.wi && window.OBR.wi.Vu(a, b, e, g);
				};
				b.triggerClickPixels = function (b, d, e) {
					a.controller.Rn(b, d, e);
				};
				b.mraidOpen = function (b, d) {
					a.controller.Vw(b, d);
				};
				b.customClickHandler = function (b, d, e) {
					a.controller.Uw(b, d, e);
				};
				b.onCheqResponse = function (b) {
					a.he.ah(b);
				};
				b.callViewed = function (a) {
					window.OBR.controller.Kp(a);
				};
				b.feed = {};
				b.feed.loadNextChunk = function (a) {
					return window.OBR.Qf && window.OBR.Qf.externalChunkLoad(a);
				};
				return b;
			})();
		window.outbrain = window.outbrain || {};
		window.outbrain.returnedHtmlData = function (a, b) {
			window.OBR.controller.ii(a, b);
		};
		window.outbrain.returnedIrdJsonData = function (a, b) {
			window.OBR.Mb.Wj(a, b);
		};
		window.outbrain.returnedJsonData = function (a, b) {
			window.OBR.controller.zm(a, b);
		};
		window.outbrain.returnedError = function (a) {
			window.OBR.h.log("Callback error" + a);
		};
		window.outbrain.callRecs = function (a, b) {
			window.OBR.controller.ci(a, b);
		};
		window.outbrain.callClick = function (a, b) {
			window.OBR.controller.Xc(a, b);
		};
		window.outbrain.callWhatIs = function (a, b, c, d, e, g) {
			window.OBR.g.I(
				window.OBR.g.l.pe,
				function () {
					window.OBR.cj.Uj(a, b, c, d, e, g);
				},
				this
			);
		};
		window.outbrain.callLoadMore = function (a, b) {
			window.OBR.g.I(
				window.OBR.g.l.me,
				function () {
					window.OBR.Zh.ef(a, b);
				},
				this
			);
		};
		window.outbrain.recClicked = function (a, b) {
			window.OBR.controller.Tm(b);
		};
		window.outbrain.imageError = function (a) {
			window.OBR.b.$j(a);
		};
		window.outbrain.closeModal = function () {
			try {
				window.OBR.modal.hideModal();
			} catch (a) {
				window.OBR.error(a);
			}
		};
		window.outbrain_rater = window.outbrain_rater || {};
		window.outbrain_rater.returnedHtmlData = function (a, b) {
			window.OBR.controller.ii(a, b);
		};
		window.outbrain_rater.returnedCancelOdbData = function (a) {
			window.OBR.controller.hv(a);
		};
		!0 === window.OBR.f.Jl &&
			(window.OBR.h.log("Widget Start!"),
			(window.OBR.f.Jl = !1),
			"boolean" === typeof window.OB_PASSIVE_MODE &&
			!0 === window.OB_PASSIVE_MODE
				? window.OBR.h.log("passive")
				: window.OBR.controller.jn());
	} catch (ex) {
		OBR.error(ex);
	}
})(window.OBR);
