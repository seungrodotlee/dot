import { jsx as D } from "react/jsx-runtime";
import { createElement as H, isValidElement as Q } from "react";
function P(t) {
  return typeof (t == null ? void 0 : t[Symbol.iterator]) == "function";
}
function W(t) {
  return typeof (t == null ? void 0 : t[Symbol.asyncIterator]) == "function";
}
const L = (t) => t instanceof Promise || t !== null && typeof t == "object" && typeof t.then == "function" && typeof t.catch == "function";
class T extends Error {
  constructor(e = T.MESSAGE) {
    super(e);
  }
}
T.MESSAGE = `'Iterable' can not used with async function.
If you want to deal with async function, see: [toAsync](https://fxts.dev/docs/toAsync)`;
function R(t, e) {
  const n = e[Symbol.iterator]();
  return {
    next() {
      const { done: r, value: o } = n.next();
      if (r)
        return {
          done: !0,
          value: void 0
        };
      const i = t(o);
      if (L(i))
        throw new T();
      return {
        done: !1,
        value: i
      };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}
function X(t, e) {
  const n = e[Symbol.asyncIterator]();
  return {
    async next(r) {
      const { done: o, value: i } = await n.next(r);
      return o ? { done: o, value: i } : {
        done: !1,
        value: await t(i)
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function z(t, e) {
  if (e === void 0)
    return (n) => z(t, n);
  if (P(e))
    return R(t, e);
  if (W(e))
    return X(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
const G = (t, e) => L(t) ? t.then(e) : e(t);
function N(t, e, n) {
  for (const r of n)
    e = t(e, r);
  return e;
}
async function $(t, e, n) {
  for await (const r of n)
    e = await G(e, (o) => t(o, r));
  return e;
}
function K(t, e, n) {
  if (n === void 0) {
    if (e === void 0)
      return (r) => K(t, r);
    if (P(e)) {
      const r = e[Symbol.iterator](), { done: o, value: i } = r.next();
      if (o)
        throw new TypeError("'reduce' of empty iterable with no initial value");
      return N(t, i, {
        [Symbol.iterator]() {
          return r;
        }
      });
    }
    if (W(e)) {
      const r = e[Symbol.asyncIterator]();
      return r.next().then(({ done: o, value: i }) => {
        if (o)
          throw new TypeError("'reduce' of empty iterable with no initial value");
        return $(t, i, {
          [Symbol.asyncIterator]() {
            return r;
          }
        });
      });
    }
    throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
  }
  if (P(n))
    return N(t, e, n);
  if (W(n))
    return $(t, Promise.resolve(e), n);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function Y(t, ...e) {
  return K(G, t, e);
}
function* V(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && (yield [e, t[e]]);
}
const tt = (t) => typeof t == "string", et = (t) => K(
  (e, [n, r]) => tt(r) ? {
    ...e,
    [n]: (o) => H(r, o)
  } : {
    ...e,
    [n]: r
  },
  {},
  V(t)
), f = Symbol.for("@ts-pattern/matcher"), F = Symbol.for("@ts-pattern/isVariadic"), O = "@ts-pattern/anonymous-select-key", C = (t) => !!(t && typeof t == "object"), I = (t) => t && !!t[f], a = (t, e, n) => {
  if (I(t)) {
    const r = t[f](), { matched: o, selections: i } = r.match(e);
    return o && i && Object.keys(i).forEach((u) => n(u, i[u])), o;
  }
  if (C(t)) {
    if (!C(e))
      return !1;
    if (Array.isArray(t)) {
      if (!Array.isArray(e))
        return !1;
      let r = [], o = [], i = [];
      for (const u of t.keys()) {
        const l = t[u];
        I(l) && l[F] ? i.push(l) : i.length ? o.push(l) : r.push(l);
      }
      if (i.length) {
        if (i.length > 1)
          throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
        if (e.length < r.length + o.length)
          return !1;
        const u = e.slice(0, r.length), l = o.length === 0 ? [] : e.slice(-o.length), w = e.slice(r.length, o.length === 0 ? 1 / 0 : -o.length);
        return r.every((d, b) => a(d, u[b], n)) && o.every((d, b) => a(d, l[b], n)) && (i.length === 0 || a(i[0], w, n));
      }
      return t.length === e.length && t.every((u, l) => a(u, e[l], n));
    }
    return Object.keys(t).every((r) => {
      const o = t[r];
      return (r in e || I(i = o) && i[f]().matcherType === "optional") && a(o, e[r], n);
      var i;
    });
  }
  return Object.is(e, t);
}, y = (t) => {
  var e, n, r;
  return C(t) ? I(t) ? (e = (n = (r = t[f]()).getSelectionKeys) == null ? void 0 : n.call(r)) != null ? e : [] : Array.isArray(t) ? x(t, y) : x(Object.values(t), y) : [];
}, x = (t, e) => t.reduce((n, r) => n.concat(e(r)), []);
function nt(...t) {
  if (t.length === 1) {
    const [e] = t;
    return (n) => a(e, n, () => {
    });
  }
  if (t.length === 2) {
    const [e, n] = t;
    return a(e, n, () => {
    });
  }
  throw new Error(`isMatching wasn't given the right number of arguments: expected 1 or 2, received ${t.length}.`);
}
function h(t) {
  return Object.assign(t, { optional: () => _(t), and: (e) => c(t, e), or: (e) => J(t, e), select: (e) => e === void 0 ? A(t) : A(e, t) });
}
function k(t) {
  return Object.assign(((e) => Object.assign(e, { [Symbol.iterator]() {
    let n = 0;
    const r = [{ value: Object.assign(e, { [F]: !0 }), done: !1 }, { done: !0, value: void 0 }];
    return { next: () => {
      var o;
      return (o = r[n++]) != null ? o : r.at(-1);
    } };
  } }))(t), { optional: () => k(_(t)), select: (e) => k(e === void 0 ? A(t) : A(e, t)) });
}
function _(t) {
  return h({ [f]: () => ({ match: (e) => {
    let n = {};
    const r = (o, i) => {
      n[o] = i;
    };
    return e === void 0 ? (y(t).forEach((o) => r(o, void 0)), { matched: !0, selections: n }) : { matched: a(t, e, r), selections: n };
  }, getSelectionKeys: () => y(t), matcherType: "optional" }) });
}
const rt = (t, e) => {
  for (const n of t)
    if (!e(n))
      return !1;
  return !0;
}, ot = (t, e) => {
  for (const [n, r] of t.entries())
    if (!e(r, n))
      return !1;
  return !0;
};
function c(...t) {
  return h({ [f]: () => ({ match: (e) => {
    let n = {};
    const r = (o, i) => {
      n[o] = i;
    };
    return { matched: t.every((o) => a(o, e, r)), selections: n };
  }, getSelectionKeys: () => x(t, y), matcherType: "and" }) });
}
function J(...t) {
  return h({ [f]: () => ({ match: (e) => {
    let n = {};
    const r = (o, i) => {
      n[o] = i;
    };
    return x(t, y).forEach((o) => r(o, void 0)), { matched: t.some((o) => a(o, e, r)), selections: n };
  }, getSelectionKeys: () => x(t, y), matcherType: "or" }) });
}
function s(t) {
  return { [f]: () => ({ match: (e) => ({ matched: !!t(e) }) }) };
}
function A(...t) {
  const e = typeof t[0] == "string" ? t[0] : void 0, n = t.length === 2 ? t[1] : typeof t[0] == "string" ? void 0 : t[0];
  return h({ [f]: () => ({ match: (r) => {
    let o = { [e ?? O]: r };
    return { matched: n === void 0 || a(n, r, (i, u) => {
      o[i] = u;
    }), selections: o };
  }, getSelectionKeys: () => [e ?? O].concat(n === void 0 ? [] : y(n)) }) });
}
function m(t) {
  return typeof t == "number";
}
function S(t) {
  return typeof t == "string";
}
function g(t) {
  return typeof t == "bigint";
}
const U = h(s(function(t) {
  return !0;
})), it = U, E = (t) => Object.assign(h(t), { startsWith: (e) => {
  return E(c(t, (n = e, s((r) => S(r) && r.startsWith(n)))));
  var n;
}, endsWith: (e) => {
  return E(c(t, (n = e, s((r) => S(r) && r.endsWith(n)))));
  var n;
}, minLength: (e) => E(c(t, ((n) => s((r) => S(r) && r.length >= n))(e))), maxLength: (e) => E(c(t, ((n) => s((r) => S(r) && r.length <= n))(e))), includes: (e) => {
  return E(c(t, (n = e, s((r) => S(r) && r.includes(n)))));
  var n;
}, regex: (e) => {
  return E(c(t, (n = e, s((r) => S(r) && !!r.match(n)))));
  var n;
} }), st = E(s(S)), p = (t) => Object.assign(h(t), { between: (e, n) => p(c(t, ((r, o) => s((i) => m(i) && r <= i && o >= i))(e, n))), lt: (e) => p(c(t, ((n) => s((r) => m(r) && r < n))(e))), gt: (e) => p(c(t, ((n) => s((r) => m(r) && r > n))(e))), lte: (e) => p(c(t, ((n) => s((r) => m(r) && r <= n))(e))), gte: (e) => p(c(t, ((n) => s((r) => m(r) && r >= n))(e))), int: () => p(c(t, s((e) => m(e) && Number.isInteger(e)))), finite: () => p(c(t, s((e) => m(e) && Number.isFinite(e)))), positive: () => p(c(t, s((e) => m(e) && e > 0))), negative: () => p(c(t, s((e) => m(e) && e < 0))) }), ct = p(s(m)), v = (t) => Object.assign(h(t), { between: (e, n) => v(c(t, ((r, o) => s((i) => g(i) && r <= i && o >= i))(e, n))), lt: (e) => v(c(t, ((n) => s((r) => g(r) && r < n))(e))), gt: (e) => v(c(t, ((n) => s((r) => g(r) && r > n))(e))), lte: (e) => v(c(t, ((n) => s((r) => g(r) && r <= n))(e))), gte: (e) => v(c(t, ((n) => s((r) => g(r) && r >= n))(e))), positive: () => v(c(t, s((e) => g(e) && e > 0))), negative: () => v(c(t, s((e) => g(e) && e < 0))) }), ut = v(s(g)), at = h(s(function(t) {
  return typeof t == "boolean";
})), lt = h(s(function(t) {
  return typeof t == "symbol";
})), ht = h(s(function(t) {
  return t == null;
}));
var B = { __proto__: null, matcher: f, optional: _, array: function(...t) {
  return k({ [f]: () => ({ match: (e) => {
    if (!Array.isArray(e))
      return { matched: !1 };
    if (t.length === 0)
      return { matched: !0 };
    const n = t[0];
    let r = {};
    if (e.length === 0)
      return y(n).forEach((i) => {
        r[i] = [];
      }), { matched: !0, selections: r };
    const o = (i, u) => {
      r[i] = (r[i] || []).concat([u]);
    };
    return { matched: e.every((i) => a(n, i, o)), selections: r };
  }, getSelectionKeys: () => t.length === 0 ? [] : y(t[0]) }) });
}, set: function(...t) {
  return h({ [f]: () => ({ match: (e) => {
    if (!(e instanceof Set))
      return { matched: !1 };
    let n = {};
    if (e.size === 0)
      return { matched: !0, selections: n };
    if (t.length === 0)
      return { matched: !0 };
    const r = (i, u) => {
      n[i] = (n[i] || []).concat([u]);
    }, o = t[0];
    return { matched: rt(e, (i) => a(o, i, r)), selections: n };
  }, getSelectionKeys: () => t.length === 0 ? [] : y(t[0]) }) });
}, map: function(...t) {
  return h({ [f]: () => ({ match: (e) => {
    if (!(e instanceof Map))
      return { matched: !1 };
    let n = {};
    if (e.size === 0)
      return { matched: !0, selections: n };
    const r = (l, w) => {
      n[l] = (n[l] || []).concat([w]);
    };
    if (t.length === 0)
      return { matched: !0 };
    var o;
    if (t.length === 1)
      throw new Error(`\`P.map\` wasn't given enough arguments. Expected (key, value), received ${(o = t[0]) == null ? void 0 : o.toString()}`);
    const [i, u] = t;
    return { matched: ot(e, (l, w) => {
      const d = a(i, w, r), b = a(u, l, r);
      return d && b;
    }), selections: n };
  }, getSelectionKeys: () => t.length === 0 ? [] : [...y(t[0]), ...y(t[1])] }) });
}, intersection: c, union: J, not: function(t) {
  return h({ [f]: () => ({ match: (e) => ({ matched: !a(t, e, () => {
  }) }), getSelectionKeys: () => [], matcherType: "not" }) });
}, when: s, select: A, any: U, _: it, string: st, number: ct, bigint: ut, boolean: at, symbol: lt, nullish: ht, instanceOf: function(t) {
  return h(s(/* @__PURE__ */ function(e) {
    return (n) => n instanceof e;
  }(t)));
}, shape: function(t) {
  return h(s(nt(t)));
} };
const M = { matched: !1, value: void 0 };
function Z(t) {
  return new j(t, M);
}
class j {
  constructor(e, n) {
    this.input = void 0, this.state = void 0, this.input = e, this.state = n;
  }
  with(...e) {
    if (this.state.matched)
      return this;
    const n = e[e.length - 1], r = [e[0]];
    let o;
    e.length === 3 && typeof e[1] == "function" ? o = e[1] : e.length > 2 && r.push(...e.slice(1, e.length - 1));
    let i = !1, u = {};
    const l = (d, b) => {
      i = !0, u[d] = b;
    }, w = !r.some((d) => a(d, this.input, l)) || o && !o(this.input) ? M : { matched: !0, value: n(i ? O in u ? u[O] : u : this.input, this.input) };
    return new j(this.input, w);
  }
  when(e, n) {
    if (this.state.matched)
      return this;
    const r = !!e(this.input);
    return new j(this.input, r ? { matched: !0, value: n(this.input, this.input) } : M);
  }
  otherwise(e) {
    return this.state.matched ? this.state.value : e(this.input);
  }
  exhaustive() {
    if (this.state.matched)
      return this.state.value;
    let e;
    try {
      e = JSON.stringify(this.input);
    } catch {
      e = this.input;
    }
    throw new Error(`Pattern matching error: no pattern matches value ${e}`);
  }
  run() {
    return this.exhaustive();
  }
  returnType() {
    return this;
  }
}
const q = (t) => (e) => Q(e) && t.has(e.type), ft = (t) => (e) => K(
  (n, r) => Z(r).with(B.when(q(t)), (o) => ({
    ...n,
    [t.get(o.type)]: o
  })).otherwise((o) => ({
    ...n,
    defaultChildren: [...n.defaultChildren ?? [], o]
  })),
  {},
  e
), yt = (t, e) => {
  const n = new Map(Y(e, V, z(([r, o]) => [o, r.replace(/^[A-Z]/, (i) => i.toLowerCase())])));
  return Z(t).with(
    B.array(),
    ft(n)
  ).with(B.when(q(n)), (r) => ({
    [n.get(r.type)]: r
  })).otherwise(() => ({}));
}, dt = (t, e) => Object.assign(
  ({
    children: o,
    ...i
  }) => {
    const u = yt(o, e);
    return /* @__PURE__ */ D(t, { ...i, slots: u });
  },
  et(e)
);
export {
  yt as useSlots,
  dt as withSlots
};
