import { useMemo as Qt, useState as V, useEffect as nt, useCallback as U, useRef as bt } from "react";
var gt = function(t, e) {
  return gt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r)
      Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, gt(t, e);
};
function G(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  gt(t, e);
  function n() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
}
function Ft(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], r = 0;
  if (n)
    return n.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function rt(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n)
    return t;
  var r = n.call(t), i, o = [], u;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; )
      o.push(i.value);
  } catch (s) {
    u = { error: s };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (u)
        throw u.error;
    }
  }
  return o;
}
function it(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, o; r < i; r++)
      (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return t.concat(o || Array.prototype.slice.call(e));
}
function k(t) {
  return typeof t == "function";
}
function de(t) {
  var e = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = t(e);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var lt = de(function(t) {
  return function(n) {
    t(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function wt(t, e) {
  if (t) {
    var n = t.indexOf(e);
    0 <= n && t.splice(n, 1);
  }
}
var st = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, n, r, i, o;
    if (!this.closed) {
      this.closed = !0;
      var u = this._parentage;
      if (u)
        if (this._parentage = null, Array.isArray(u))
          try {
            for (var s = Ft(u), c = s.next(); !c.done; c = s.next()) {
              var y = c.value;
              y.remove(this);
            }
          } catch (p) {
            e = { error: p };
          } finally {
            try {
              c && !c.done && (n = s.return) && n.call(s);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          u.remove(this);
      var d = this.initialTeardown;
      if (k(d))
        try {
          d();
        } catch (p) {
          o = p instanceof lt ? p.errors : [p];
        }
      var l = this._finalizers;
      if (l) {
        this._finalizers = null;
        try {
          for (var f = Ft(l), a = f.next(); !a.done; a = f.next()) {
            var m = a.value;
            try {
              Mt(m);
            } catch (p) {
              o = o ?? [], p instanceof lt ? o = it(it([], rt(o)), rt(p.errors)) : o.push(p);
            }
          }
        } catch (p) {
          r = { error: p };
        } finally {
          try {
            a && !a.done && (i = f.return) && i.call(f);
          } finally {
            if (r)
              throw r.error;
          }
        }
      }
      if (o)
        throw new lt(o);
    }
  }, t.prototype.add = function(e) {
    var n;
    if (e && e !== this)
      if (this.closed)
        Mt(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(e);
      }
  }, t.prototype._hasParent = function(e) {
    var n = this._parentage;
    return n === e || Array.isArray(n) && n.includes(e);
  }, t.prototype._addParent = function(e) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
  }, t.prototype._removeParent = function(e) {
    var n = this._parentage;
    n === e ? this._parentage = null : Array.isArray(n) && wt(n, e);
  }, t.prototype.remove = function(e) {
    var n = this._finalizers;
    n && wt(n, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}();
st.EMPTY;
function zt(t) {
  return t instanceof st || t && "closed" in t && k(t.remove) && k(t.add) && k(t.unsubscribe);
}
function Mt(t) {
  k(t) ? t() : t.unsubscribe();
}
var Ht = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Nt = {
  setTimeout: function(t, e) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, it([t, e], rt(n)));
  },
  clearTimeout: function(t) {
    var e = Nt.delegate;
    return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(t);
  },
  delegate: void 0
};
function pe(t) {
  Nt.setTimeout(function() {
    throw t;
  });
}
function Rt() {
}
function ve(t) {
  t();
}
var Tt = function(t) {
  G(e, t);
  function e(n) {
    var r = t.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, zt(n) && n.add(r)) : r.destination = we, r;
  }
  return e.create = function(n, r, i) {
    return new St(n, r, i);
  }, e.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, e.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(n) {
    this.destination.next(n);
  }, e.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(st), me = Function.prototype.bind;
function ft(t, e) {
  return me.call(t, e);
}
var be = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(e);
      } catch (r) {
        Z(r);
      }
  }, t.prototype.error = function(e) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(e);
      } catch (r) {
        Z(r);
      }
    else
      Z(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (n) {
        Z(n);
      }
  }, t;
}(), St = function(t) {
  G(e, t);
  function e(n, r, i) {
    var o = t.call(this) || this, u;
    if (k(n) || !n)
      u = {
        next: n ?? void 0,
        error: r ?? void 0,
        complete: i ?? void 0
      };
    else {
      var s;
      o && Ht.useDeprecatedNextContext ? (s = Object.create(n), s.unsubscribe = function() {
        return o.unsubscribe();
      }, u = {
        next: n.next && ft(n.next, s),
        error: n.error && ft(n.error, s),
        complete: n.complete && ft(n.complete, s)
      }) : u = n;
    }
    return o.destination = new be(u), o;
  }
  return e;
}(Tt);
function Z(t) {
  pe(t);
}
function ge(t) {
  throw t;
}
var we = {
  closed: !0,
  next: Rt,
  error: ge,
  complete: Rt
}, Se = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Ie(t) {
  return t;
}
function xe(t) {
  return t.length === 0 ? Ie : t.length === 1 ? t[0] : function(n) {
    return t.reduce(function(r, i) {
      return i(r);
    }, n);
  };
}
var Xt = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var n = new t();
    return n.source = this, n.operator = e, n;
  }, t.prototype.subscribe = function(e, n, r) {
    var i = this, o = Ee(e) ? e : new St(e, n, r);
    return ve(function() {
      var u = i, s = u.operator, c = u.source;
      o.add(s ? s.call(o, c) : c ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (n) {
      e.error(n);
    }
  }, t.prototype.forEach = function(e, n) {
    var r = this;
    return n = Dt(n), new n(function(i, o) {
      var u = new St({
        next: function(s) {
          try {
            e(s);
          } catch (c) {
            o(c), u.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      r.subscribe(u);
    });
  }, t.prototype._subscribe = function(e) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e);
  }, t.prototype[Se] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], n = 0; n < arguments.length; n++)
      e[n] = arguments[n];
    return xe(e)(this);
  }, t.prototype.toPromise = function(e) {
    var n = this;
    return e = Dt(e), new e(function(r, i) {
      var o;
      n.subscribe(function(u) {
        return o = u;
      }, function(u) {
        return i(u);
      }, function() {
        return r(o);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function Dt(t) {
  var e;
  return (e = t ?? Ht.Promise) !== null && e !== void 0 ? e : Promise;
}
function Ae(t) {
  return t && k(t.next) && k(t.error) && k(t.complete);
}
function Ee(t) {
  return t && t instanceof Tt || Ae(t) && zt(t);
}
function Pe(t) {
  return k(t == null ? void 0 : t.lift);
}
function kt(t) {
  return function(e) {
    if (Pe(e))
      return e.lift(function(n) {
        try {
          return t(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function Zt(t, e, n, r, i) {
  return new $e(t, e, n, r, i);
}
var $e = function(t) {
  G(e, t);
  function e(n, r, i, o, u, s) {
    var c = t.call(this, n) || this;
    return c.onFinalize = u, c.shouldUnsubscribe = s, c._next = r ? function(y) {
      try {
        r(y);
      } catch (d) {
        n.error(d);
      }
    } : t.prototype._next, c._error = o ? function(y) {
      try {
        o(y);
      } catch (d) {
        n.error(d);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._error, c._complete = i ? function() {
      try {
        i();
      } catch (y) {
        n.error(y);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._complete, c;
  }
  return e.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      t.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, e;
}(Tt), _e = {
  now: function() {
    return Date.now();
  },
  delegate: void 0
}, Oe = function(t) {
  G(e, t);
  function e(n, r) {
    return t.call(this) || this;
  }
  return e.prototype.schedule = function(n, r) {
    return this;
  }, e;
}(st), It = {
  setInterval: function(t, e) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setInterval.apply(void 0, it([t, e], rt(n)));
  },
  clearInterval: function(t) {
    var e = It.delegate;
    return ((e == null ? void 0 : e.clearInterval) || clearInterval)(t);
  },
  delegate: void 0
}, Te = function(t) {
  G(e, t);
  function e(n, r) {
    var i = t.call(this, n, r) || this;
    return i.scheduler = n, i.work = r, i.pending = !1, i;
  }
  return e.prototype.schedule = function(n, r) {
    var i;
    if (r === void 0 && (r = 0), this.closed)
      return this;
    this.state = n;
    var o = this.id, u = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(u, o, r)), this.pending = !0, this.delay = r, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(u, this.id, r), this;
  }, e.prototype.requestAsyncId = function(n, r, i) {
    return i === void 0 && (i = 0), It.setInterval(n.flush.bind(n, this), i);
  }, e.prototype.recycleAsyncId = function(n, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1)
      return r;
    r != null && It.clearInterval(r);
  }, e.prototype.execute = function(n, r) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var i = this._execute(n, r);
    if (i)
      return i;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, e.prototype._execute = function(n, r) {
    var i = !1, o;
    try {
      this.work(n);
    } catch (u) {
      i = !0, o = u || new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), o;
  }, e.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, r = n.id, i = n.scheduler, o = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, wt(o, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, t.prototype.unsubscribe.call(this);
    }
  }, e;
}(Oe), Ut = function() {
  function t(e, n) {
    n === void 0 && (n = t.now), this.schedulerActionCtor = e, this.now = n;
  }
  return t.prototype.schedule = function(e, n, r) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, e).schedule(r, n);
  }, t.now = _e.now, t;
}(), ke = function(t) {
  G(e, t);
  function e(n, r) {
    r === void 0 && (r = Ut.now);
    var i = t.call(this, n, r) || this;
    return i.actions = [], i._active = !1, i;
  }
  return e.prototype.flush = function(n) {
    var r = this.actions;
    if (this._active) {
      r.push(n);
      return;
    }
    var i;
    this._active = !0;
    do
      if (i = n.execute(n.state, n.delay))
        break;
    while (n = r.shift());
    if (this._active = !1, i) {
      for (; n = r.shift(); )
        n.unsubscribe();
      throw i;
    }
  }, e;
}(Ut), te = new ke(Te), Ce = te, je = new Xt(function(t) {
  return t.complete();
});
function Be(t) {
  return t && k(t.schedule);
}
function Fe(t) {
  return t instanceof Date && !isNaN(t);
}
function ht(t, e) {
  return kt(function(n, r) {
    var i = 0;
    n.subscribe(Zt(r, function(o) {
      r.next(t.call(e, o, i++));
    }));
  });
}
function Me(t, e, n) {
  t === void 0 && (t = 0), n === void 0 && (n = Ce);
  var r = -1;
  return e != null && (Be(e) ? n = e : r = e), new Xt(function(i) {
    var o = Fe(t) ? +t - n.now() : t;
    o < 0 && (o = 0);
    var u = 0;
    return n.schedule(function() {
      i.closed || (i.next(u++), 0 <= r ? this.schedule(void 0, r) : i.complete());
    }, o);
  });
}
function yt(t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = te), t < 0 && (t = 0), Me(t, t, e);
}
function dt(t) {
  return t <= 0 ? function() {
    return je;
  } : kt(function(e, n) {
    var r = 0;
    e.subscribe(Zt(n, function(i) {
      ++r <= t && (n.next(i), t <= r && n.complete());
    }));
  });
}
function pt(t) {
  return kt(function(e, n) {
    try {
      e.subscribe(n);
    } finally {
      n.add(t);
    }
  });
}
function x(t) {
  return typeof (t == null ? void 0 : t[Symbol.iterator]) == "function";
}
function S(t) {
  return typeof (t == null ? void 0 : t[Symbol.asyncIterator]) == "function";
}
const Re = function* () {
}, ct = (t) => t instanceof Promise || t !== null && typeof t == "object" && typeof t.then == "function" && typeof t.catch == "function", xt = (t) => typeof t == "number", Ct = (t) => typeof t == "string";
class N extends Error {
  constructor(e = N.MESSAGE) {
    super(e);
  }
}
N.MESSAGE = `'Iterable' can not used with async function.
If you want to deal with async function, see: [toAsync](https://fxts.dev/docs/toAsync)`;
function De(t, e) {
  const n = e[Symbol.iterator]();
  return {
    next() {
      const { done: r, value: i } = n.next();
      if (r)
        return {
          done: !0,
          value: void 0
        };
      const o = t(i);
      if (ct(o))
        throw new N();
      return {
        done: !1,
        value: o
      };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}
function Ue(t, e) {
  const n = e[Symbol.asyncIterator]();
  return {
    async next(r) {
      const { done: i, value: o } = await n.next(r);
      return i ? { done: i, value: o } : {
        done: !1,
        value: await t(o)
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function P(t, e) {
  if (e === void 0)
    return (n) => P(t, n);
  if (x(e))
    return De(t, e);
  if (S(e))
    return Ue(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
const Ke = (t, e) => ct(t) ? t.then(e) : e(t), L = Ke;
function Kt(t, e, n) {
  for (const r of n)
    e = t(e, r);
  return e;
}
async function Vt(t, e, n) {
  for await (const r of n)
    e = await L(e, (i) => t(i, r));
  return e;
}
function q(t, e, n) {
  if (n === void 0) {
    if (e === void 0)
      return (r) => q(t, r);
    if (x(e)) {
      const r = e[Symbol.iterator](), { done: i, value: o } = r.next();
      if (i)
        throw new TypeError("'reduce' of empty iterable with no initial value");
      return Kt(t, o, {
        [Symbol.iterator]() {
          return r;
        }
      });
    }
    if (S(e)) {
      const r = e[Symbol.asyncIterator]();
      return r.next().then(({ done: i, value: o }) => {
        if (i)
          throw new TypeError("'reduce' of empty iterable with no initial value");
        return Vt(t, o, {
          [Symbol.asyncIterator]() {
            return r;
          }
        });
      });
    }
    throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
  }
  if (x(n))
    return Kt(t, e, n);
  if (S(n))
    return Vt(t, Promise.resolve(e), n);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function _(t, ...e) {
  return q(L, t, e);
}
function* At(t, e, n = 1) {
  if (e === void 0)
    return yield* At(0, t);
  if (n < 0)
    for (; t > e; )
      yield t, t += n;
  else
    for (; t < e; )
      yield t, t += n;
}
class at {
  constructor(e) {
    this.length = e;
  }
  static of(e) {
    return new at(e);
  }
}
const X = (t) => t instanceof at;
function W(t, e) {
  if (e === void 0)
    return (a) => W(t, a);
  if (!Number.isFinite(t) || t <= 0)
    throw new RangeError("'length' must be positive integer");
  if (!S(e))
    throw new TypeError("'iterable' must be type of AsyncIterable");
  const n = e[Symbol.asyncIterator](), r = [];
  let i = Promise.resolve(), o = 0, u = 0, s = !1, c = !1;
  const y = [], d = () => {
    for (; r.length > 0 && o > u; ) {
      const a = r.shift(), [m, p] = y.shift();
      if (a.status === "fulfilled")
        u++, m(a.value), a.value.done && (s = !0);
      else {
        p(a.reason), s = !0;
        break;
      }
    }
  }, l = () => {
    if (c)
      i = i.then(() => void (!s && o > u && l()));
    else {
      const a = Promise.allSettled(Array.from({ length: t }, () => n.next(at.of(t))));
      c = !0, i = i.then(() => a).then((m) => {
        r.push(...m), c = !1, f();
      });
    }
  };
  function f() {
    s || o === u || (r.length > 0 ? d() : l());
  }
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return o++, s ? { done: !0, value: void 0 } : new Promise((a, m) => {
        y.push([a, m]), f();
      });
    }
  };
}
async function Ve(t) {
  const e = [];
  for await (const n of t)
    e.push(n);
  return e;
}
function B(t) {
  return S(t) ? Ve(t) : x(t) ? Array.from(t) : [];
}
async function* qe(t, e) {
  for await (const n of e)
    await t(n) && (yield n);
}
function Ge(t) {
  const e = t[Symbol.asyncIterator](), n = [], r = [];
  let i = !1, o = 0, u = 0, s = Promise.resolve();
  function c(l) {
    const f = e.next(l);
    s = s.then(() => f).then(({ done: a, value: m }) => {
      if (a) {
        for (; n.length > 0; ) {
          const [b] = n.shift();
          b({ done: !0, value: void 0 });
        }
        return void (i = !0);
      }
      const [p, Y] = m;
      p && r.push(Y), d(l);
    }).catch((a) => {
      for (i = !0; n.length > 0; ) {
        const [, m] = n.shift();
        m(a);
      }
    });
  }
  function y() {
    for (; r.length > 0 && o > u; ) {
      const l = r.shift(), [f] = n.shift();
      f({ done: !1, value: l }), u++;
    }
  }
  function d(l) {
    i || o === u || (r.length > 0 ? y() : c(l));
  }
  return {
    async next(l) {
      return o++, i ? { done: !0, value: void 0 } : new Promise((f, a) => {
        n.push([f, a]), d(l);
      });
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function We(t, e) {
  const n = e[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(r) {
      const { done: i, value: o } = await n.next(r);
      return i ? {
        done: !0,
        value: void 0
      } : L(t(o), (u) => ({
        done: i,
        value: [!!u, o]
      }));
    }
  };
}
function Ye(t, e) {
  let n;
  return {
    async next(r) {
      return n === void 0 && (n = X(r) ? Ge(W(r.length, We(t, e))) : qe(t, e)), n.next(r);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function* Je(t, e) {
  for (const n of e) {
    const r = t(n);
    if (ct(r))
      throw new N();
    r && (yield n);
  }
}
function ee(t, e) {
  if (e === void 0)
    return (n) => ee(t, n);
  if (x(e))
    return Je(t, e);
  if (S(e))
    return Ye(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
const Le = (t) => Array.isArray(t), ne = Le;
function Qe(t, e) {
  const n = q((r, i) => r == "" ? `${i}` : `${r}${t}${i}`, "", e);
  return n == null ? "" : Ct(n) ? n : String(n);
}
function ze(t, e) {
  return q((n, r) => n == "" ? `${r}` : `${n}${t}${r}`, "", e).then((n) => n == null ? "" : Ct(n) ? n : String(n));
}
function K(t, e) {
  if (e === void 0)
    return (n) => K(t, n);
  if (Array.isArray(e) && e.length === 0)
    return "";
  if (x(e))
    return Qe(t, e);
  if (S(e))
    return ze(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function re(t) {
  if (ne(t) || Ct(t))
    return t[t.length - 1];
  if (x(t))
    return q((e, n) => n, t);
  if (S(t))
    return q((e, n) => n, t);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function ie(t, e) {
  if (e !== null)
    return e === void 0 ? (n) => ie(t, n) : e[t];
}
function oe(t, e) {
  if (e === void 0)
    return (n) => oe(t, n);
  if (ne(e))
    return e.sort(t);
  if (x(e))
    return L(B(e), (n) => n.sort(t));
  if (S(e))
    return L(B(e), (n) => n.sort(t));
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function* He(t, e) {
  yield* e, yield t;
}
function qt(t, e) {
  const n = e[Symbol.asyncIterator]();
  let r = !1;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (r)
        return { done: !0, value: void 0 };
      const { value: i, done: o } = await n.next();
      return r ? { done: !0, value: void 0 } : o ? (r = !0, { done: !1, value: await t }) : { done: o, value: i };
    }
  };
}
function Ne(t, e) {
  let n = null;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(r) {
      return n === null && (n = X(r) ? qt(t, W(r.length, e)) : qt(t, e)), n.next(r);
    }
  };
}
function ue(t, e) {
  if (e === void 0)
    return (n) => ue(t, n);
  if (S(e))
    return Ne(ct(t) ? t : Promise.resolve(t), e);
  if (x(e))
    return He(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function* Xe(t, e) {
  yield* t, yield* e;
}
function Ze(t, e) {
  let n = !1;
  const r = t[Symbol.asyncIterator](), i = e[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(o) {
      const u = n ? i : r, { done: s, value: c } = await u.next(o);
      return s ? (u === r && (n = !0), i.next(o)) : { done: s, value: c };
    }
  };
}
function Gt(t) {
  if (S(t))
    return t;
  const e = t[Symbol.iterator]();
  return {
    [Symbol.asyncIterator]() {
      return e;
    }
  };
}
function se(t, e) {
  if (e === void 0)
    return (n) => se(t, n);
  if (S(t) || S(e))
    return Ze(Gt(t), Gt(e));
  if (x(t) && x(e))
    return Xe(t, e);
  throw new TypeError("'iterable1','iterable2' must be type of Iterable or AsyncIterable");
}
function* Et(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && (yield [e, t[e]]);
}
const jt = function(t) {
  return typeof t != "string" && x(t);
};
function ce(t, e) {
  const r = [
    t[Symbol.iterator]()
  ];
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const i = re(r);
      if (!i)
        return { done: !0, value: void 0 };
      const { value: o, done: u } = i.next();
      return u ? (r.pop(), this.next()) : jt(o) && r.length < e + 1 ? (r.push(o[Symbol.iterator]()), this.next()) : {
        done: !1,
        value: o
      };
    }
  };
}
function tn(t, e) {
  const n = t[Symbol.asyncIterator]();
  let r = Promise.resolve(), i = Re(), o = !1;
  const u = [], s = async () => {
    const { done: l, value: f } = await n.next();
    return l ? !1 : (jt(f) ? i = se(ce(f, e - 1), i) : i = ue(f, i), !0);
  }, c = async () => {
    if (o)
      return { done: !0, value: void 0 };
    const { value: l, done: f } = i.next();
    return f ? await s() ? c() : { done: !0, value: void 0 } : { done: !1, value: l };
  }, y = ({ done: l, value: f }) => {
    if (l || o) {
      for (; u.length > 0; ) {
        const [m] = u.shift();
        m({ done: !0, value: void 0 });
      }
      return;
    }
    const [a] = u.shift();
    a({ done: l, value: f });
  }, d = (l) => {
    o = !0;
    const [f, a] = u.shift();
    a(l);
  };
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      return new Promise((l, f) => {
        u.push([l, f]), r = r.then(() => c()).then(y).catch(d);
      });
    }
  };
}
function en(t, e) {
  const r = [
    t[Symbol.asyncIterator]()
  ];
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      const i = re(r);
      if (!i)
        return { done: !0, value: void 0 };
      const { value: o, done: u } = await i.next();
      return u ? (r.pop(), this.next()) : jt(o) && r.length < e + 1 ? (r.push(o[Symbol.iterator]()), this.next()) : {
        done: !1,
        value: o
      };
    }
  };
}
function nn(t, e) {
  let n = null;
  return {
    async next(r) {
      return n === null && (n = X(r) ? tn(W(r.length, t), e) : en(t, e)), n.next(r);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function vt(t, e = 1) {
  if (x(t))
    return ce(t, e);
  if (S(t))
    return nn(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function ae(t, e) {
  if (e === void 0)
    return (n) => vt(P(t, n));
  if (x(e) || S(e))
    return vt(P(t, e));
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function* rn(t, e, n) {
  let r = 0;
  for (const i of n)
    r >= t && r < e && (yield i), r += 1;
}
async function* Wt(t, e, n) {
  let r = 0;
  for await (const i of n)
    r >= t && r < e && (yield i), r += 1;
}
function on(t, e, n) {
  let r;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next(i) {
      return r === void 0 && (r = X(i) ? Wt(t, e, W(i.length, n)) : Wt(t, e, n)), r.next(i);
    }
  };
}
function J(t, e, n) {
  if (!xt(t) || !xt(e))
    throw new TypeError("'start' and 'end' must be type of number");
  if (x(n))
    return rn(t, e, n);
  if (S(n))
    return on(t, e, n);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
function mt(t, e, n) {
  return n === void 0 ? e === void 0 ? (r) => J(t, 1 / 0, r) : x(e) || S(e) ? J(t, 1 / 0, e) : xt(e) ? (r) => J(t, e, r) : (r) => J(0, 1 / 0, r) : J(t, e, n);
}
function* un(t, e) {
  if (t === "")
    return yield* e;
  let n = "", r = "";
  for (r of e)
    r === t ? (yield n, n = "") : n += r;
  r === t ? yield "" : n.length > 0 && (yield n);
}
async function* Yt(t, e) {
  if (t === "")
    return yield* e;
  let n = "", r = "";
  for await (r of e)
    r === t ? (yield n, n = "") : n += r;
  r === t ? yield "" : n.length > 0 && (yield n);
}
function sn(t, e) {
  let n;
  return {
    async next(r) {
      return n === void 0 && (n = X(r) ? Yt(t, W(r.length, e)) : Yt(t, e)), n.next(r);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function le(t, e) {
  if (e === void 0)
    return (n) => le(t, n);
  if (x(e))
    return un(t, e);
  if (S(e))
    return sn(t, e);
  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable");
}
const E = Symbol.for("@ts-pattern/matcher"), fe = Symbol.for("@ts-pattern/isVariadic"), ot = "@ts-pattern/anonymous-select-key", Pt = (t) => !!(t && typeof t == "object"), tt = (t) => t && !!t[E], I = (t, e, n) => {
  if (tt(t)) {
    const r = t[E](), { matched: i, selections: o } = r.match(e);
    return i && o && Object.keys(o).forEach((u) => n(u, o[u])), i;
  }
  if (Pt(t)) {
    if (!Pt(e))
      return !1;
    if (Array.isArray(t)) {
      if (!Array.isArray(e))
        return !1;
      let r = [], i = [], o = [];
      for (const u of t.keys()) {
        const s = t[u];
        tt(s) && s[fe] ? o.push(s) : o.length ? i.push(s) : r.push(s);
      }
      if (o.length) {
        if (o.length > 1)
          throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
        if (e.length < r.length + i.length)
          return !1;
        const u = e.slice(0, r.length), s = i.length === 0 ? [] : e.slice(-i.length), c = e.slice(r.length, i.length === 0 ? 1 / 0 : -i.length);
        return r.every((y, d) => I(y, u[d], n)) && i.every((y, d) => I(y, s[d], n)) && (o.length === 0 || I(o[0], c, n));
      }
      return t.length === e.length && t.every((u, s) => I(u, e[s], n));
    }
    return Object.keys(t).every((r) => {
      const i = t[r];
      return (r in e || tt(o = i) && o[E]().matcherType === "optional") && I(i, e[r], n);
      var o;
    });
  }
  return Object.is(e, t);
}, $ = (t) => {
  var e, n, r;
  return Pt(t) ? tt(t) ? (e = (n = (r = t[E]()).getSelectionKeys) == null ? void 0 : n.call(r)) != null ? e : [] : Array.isArray(t) ? Q(t, $) : Q(Object.values(t), $) : [];
}, Q = (t, e) => t.reduce((n, r) => n.concat(e(r)), []);
function cn(...t) {
  if (t.length === 1) {
    const [e] = t;
    return (n) => I(e, n, () => {
    });
  }
  if (t.length === 2) {
    const [e, n] = t;
    return I(e, n, () => {
    });
  }
  throw new Error(`isMatching wasn't given the right number of arguments: expected 1 or 2, received ${t.length}.`);
}
function A(t) {
  return Object.assign(t, { optional: () => Bt(t), and: (e) => v(t, e), or: (e) => he(t, e), select: (e) => e === void 0 ? z(t) : z(e, t) });
}
function $t(t) {
  return Object.assign(((e) => Object.assign(e, { [Symbol.iterator]() {
    let n = 0;
    const r = [{ value: Object.assign(e, { [fe]: !0 }), done: !1 }, { done: !0, value: void 0 }];
    return { next: () => {
      var i;
      return (i = r[n++]) != null ? i : r.at(-1);
    } };
  } }))(t), { optional: () => $t(Bt(t)), select: (e) => $t(e === void 0 ? z(t) : z(e, t)) });
}
function Bt(t) {
  return A({ [E]: () => ({ match: (e) => {
    let n = {};
    const r = (i, o) => {
      n[i] = o;
    };
    return e === void 0 ? ($(t).forEach((i) => r(i, void 0)), { matched: !0, selections: n }) : { matched: I(t, e, r), selections: n };
  }, getSelectionKeys: () => $(t), matcherType: "optional" }) });
}
const an = (t, e) => {
  for (const n of t)
    if (!e(n))
      return !1;
  return !0;
}, ln = (t, e) => {
  for (const [n, r] of t.entries())
    if (!e(r, n))
      return !1;
  return !0;
};
function v(...t) {
  return A({ [E]: () => ({ match: (e) => {
    let n = {};
    const r = (i, o) => {
      n[i] = o;
    };
    return { matched: t.every((i) => I(i, e, r)), selections: n };
  }, getSelectionKeys: () => Q(t, $), matcherType: "and" }) });
}
function he(...t) {
  return A({ [E]: () => ({ match: (e) => {
    let n = {};
    const r = (i, o) => {
      n[i] = o;
    };
    return Q(t, $).forEach((i) => r(i, void 0)), { matched: t.some((i) => I(i, e, r)), selections: n };
  }, getSelectionKeys: () => Q(t, $), matcherType: "or" }) });
}
function h(t) {
  return { [E]: () => ({ match: (e) => ({ matched: !!t(e) }) }) };
}
function z(...t) {
  const e = typeof t[0] == "string" ? t[0] : void 0, n = t.length === 2 ? t[1] : typeof t[0] == "string" ? void 0 : t[0];
  return A({ [E]: () => ({ match: (r) => {
    let i = { [e ?? ot]: r };
    return { matched: n === void 0 || I(n, r, (o, u) => {
      i[o] = u;
    }), selections: i };
  }, getSelectionKeys: () => [e ?? ot].concat(n === void 0 ? [] : $(n)) }) });
}
function C(t) {
  return typeof t == "number";
}
function R(t) {
  return typeof t == "string";
}
function F(t) {
  return typeof t == "bigint";
}
const ye = A(h(function(t) {
  return !0;
})), fn = ye, D = (t) => Object.assign(A(t), { startsWith: (e) => {
  return D(v(t, (n = e, h((r) => R(r) && r.startsWith(n)))));
  var n;
}, endsWith: (e) => {
  return D(v(t, (n = e, h((r) => R(r) && r.endsWith(n)))));
  var n;
}, minLength: (e) => D(v(t, ((n) => h((r) => R(r) && r.length >= n))(e))), maxLength: (e) => D(v(t, ((n) => h((r) => R(r) && r.length <= n))(e))), includes: (e) => {
  return D(v(t, (n = e, h((r) => R(r) && r.includes(n)))));
  var n;
}, regex: (e) => {
  return D(v(t, (n = e, h((r) => R(r) && !!r.match(n)))));
  var n;
} }), hn = D(h(R)), j = (t) => Object.assign(A(t), { between: (e, n) => j(v(t, ((r, i) => h((o) => C(o) && r <= o && i >= o))(e, n))), lt: (e) => j(v(t, ((n) => h((r) => C(r) && r < n))(e))), gt: (e) => j(v(t, ((n) => h((r) => C(r) && r > n))(e))), lte: (e) => j(v(t, ((n) => h((r) => C(r) && r <= n))(e))), gte: (e) => j(v(t, ((n) => h((r) => C(r) && r >= n))(e))), int: () => j(v(t, h((e) => C(e) && Number.isInteger(e)))), finite: () => j(v(t, h((e) => C(e) && Number.isFinite(e)))), positive: () => j(v(t, h((e) => C(e) && e > 0))), negative: () => j(v(t, h((e) => C(e) && e < 0))) }), yn = j(h(C)), M = (t) => Object.assign(A(t), { between: (e, n) => M(v(t, ((r, i) => h((o) => F(o) && r <= o && i >= o))(e, n))), lt: (e) => M(v(t, ((n) => h((r) => F(r) && r < n))(e))), gt: (e) => M(v(t, ((n) => h((r) => F(r) && r > n))(e))), lte: (e) => M(v(t, ((n) => h((r) => F(r) && r <= n))(e))), gte: (e) => M(v(t, ((n) => h((r) => F(r) && r >= n))(e))), positive: () => M(v(t, h((e) => F(e) && e > 0))), negative: () => M(v(t, h((e) => F(e) && e < 0))) }), dn = M(h(F)), pn = A(h(function(t) {
  return typeof t == "boolean";
})), vn = A(h(function(t) {
  return typeof t == "symbol";
})), mn = A(h(function(t) {
  return t == null;
}));
var g = { __proto__: null, matcher: E, optional: Bt, array: function(...t) {
  return $t({ [E]: () => ({ match: (e) => {
    if (!Array.isArray(e))
      return { matched: !1 };
    if (t.length === 0)
      return { matched: !0 };
    const n = t[0];
    let r = {};
    if (e.length === 0)
      return $(n).forEach((o) => {
        r[o] = [];
      }), { matched: !0, selections: r };
    const i = (o, u) => {
      r[o] = (r[o] || []).concat([u]);
    };
    return { matched: e.every((o) => I(n, o, i)), selections: r };
  }, getSelectionKeys: () => t.length === 0 ? [] : $(t[0]) }) });
}, set: function(...t) {
  return A({ [E]: () => ({ match: (e) => {
    if (!(e instanceof Set))
      return { matched: !1 };
    let n = {};
    if (e.size === 0)
      return { matched: !0, selections: n };
    if (t.length === 0)
      return { matched: !0 };
    const r = (o, u) => {
      n[o] = (n[o] || []).concat([u]);
    }, i = t[0];
    return { matched: an(e, (o) => I(i, o, r)), selections: n };
  }, getSelectionKeys: () => t.length === 0 ? [] : $(t[0]) }) });
}, map: function(...t) {
  return A({ [E]: () => ({ match: (e) => {
    if (!(e instanceof Map))
      return { matched: !1 };
    let n = {};
    if (e.size === 0)
      return { matched: !0, selections: n };
    const r = (s, c) => {
      n[s] = (n[s] || []).concat([c]);
    };
    if (t.length === 0)
      return { matched: !0 };
    var i;
    if (t.length === 1)
      throw new Error(`\`P.map\` wasn't given enough arguments. Expected (key, value), received ${(i = t[0]) == null ? void 0 : i.toString()}`);
    const [o, u] = t;
    return { matched: ln(e, (s, c) => {
      const y = I(o, c, r), d = I(u, s, r);
      return y && d;
    }), selections: n };
  }, getSelectionKeys: () => t.length === 0 ? [] : [...$(t[0]), ...$(t[1])] }) });
}, intersection: v, union: he, not: function(t) {
  return A({ [E]: () => ({ match: (e) => ({ matched: !I(t, e, () => {
  }) }), getSelectionKeys: () => [], matcherType: "not" }) });
}, when: h, select: z, any: ye, _: fn, string: hn, number: yn, bigint: dn, boolean: pn, symbol: vn, nullish: mn, instanceOf: function(t) {
  return A(h(/* @__PURE__ */ function(e) {
    return (n) => n instanceof e;
  }(t)));
}, shape: function(t) {
  return A(h(cn(t)));
} };
const _t = { matched: !1, value: void 0 };
function H(t) {
  return new ut(t, _t);
}
class ut {
  constructor(e, n) {
    this.input = void 0, this.state = void 0, this.input = e, this.state = n;
  }
  with(...e) {
    if (this.state.matched)
      return this;
    const n = e[e.length - 1], r = [e[0]];
    let i;
    e.length === 3 && typeof e[1] == "function" ? i = e[1] : e.length > 2 && r.push(...e.slice(1, e.length - 1));
    let o = !1, u = {};
    const s = (y, d) => {
      o = !0, u[y] = d;
    }, c = !r.some((y) => I(y, this.input, s)) || i && !i(this.input) ? _t : { matched: !0, value: n(o ? ot in u ? u[ot] : u : this.input, this.input) };
    return new ut(this.input, c);
  }
  when(e, n) {
    if (this.state.matched)
      return this;
    const r = !!e(this.input);
    return new ut(this.input, r ? { matched: !0, value: n(this.input, this.input) } : _t);
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
const Ot = {
  initial: [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ"
  ],
  middle: [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ"
  ],
  final: [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ"
  ]
}, Jt = (t) => _(
  t,
  Et,
  P(([e, n]) => [+e, n]),
  ae(
    ([e, n]) => H(
      _(
        At(3),
        P((r) => t[e + r] || ""),
        P((r) => r.charCodeAt(0)),
        B
      )
    ).with([g.not(g.number.between(12623, 12643)), ...g.array()], () => [
      n
    ]).with([g._, g.not(g.number.between(12593, 12622)), g._], () => [
      n,
      ""
    ]).with(
      [g._, g.number.between(12593, 12622), g.number.between(12623, 12643)],
      () => [n, ""]
    ).otherwise(() => [n])
  ),
  B,
  Et,
  P(([e, n]) => [+e, n]),
  B,
  (e) => q(
    (n, [r, i]) => n.skip > 0 ? {
      ...n,
      skip: n.skip - 1
    } : H(
      _(
        At(3),
        P(
          (o) => ((e[r + o] || [])[1] || "").charCodeAt(0)
        ),
        B
      )
    ).with(
      [
        g.number.between(12593, 12622),
        g.number.between(12623, 12643),
        g._
      ],
      (o) => ({
        skip: 2,
        result: [
          ...n.result,
          _(
            o,
            P(
              (u) => Number.isNaN(u) ? "" : String.fromCharCode(u)
            ),
            B,
            ([u, s, c]) => String.fromCharCode(
              44032 + Ot.initial.indexOf(u) * 588 + (s.charCodeAt(0) - 12623) * 28 + Ot.final.indexOf(c)
            )
          )
        ]
      })
    ).otherwise(() => ({
      skip: 0,
      result: [...n.result, i]
    })),
    { skip: 0, result: [] },
    e
  ),
  ie("result"),
  K("")
), Lt = (t) => _(
  t,
  le(""),
  ae(
    (e) => H(e).with(
      g.string.regex(/[가-힣]/),
      () => _(
        e.charCodeAt(0) - 44032,
        (n) => _(
          Math.floor(n / 588),
          (r) => ({
            initial: r,
            middle: Math.floor((n - r * 588) / 28),
            final: Math.floor(n % 28)
          }),
          (r) => _(
            r,
            Et,
            P(([i, o]) => Ot[i][o])
          )
        )
      )
    ).otherwise(() => [e])
  ),
  ee((e) => e !== ""),
  B
);
function et(t, e) {
  return H(e).with(
    g.nullish,
    () => (n) => et(t, n)
  ).with(
    g.when((n) => typeof n[0] == "object"),
    (n) => _(
      t,
      P((r) => JSON.stringify(r)),
      K("")
    ).includes(
      _(
        n,
        P((r) => JSON.stringify(r)),
        K("")
      )
    )
  ).otherwise((n) => K("", t).includes(K("", n)));
}
const bn = (t, { speed: e = 50, initial: n = "", decomposeOnBackspace: r }) => {
  const i = Qt(() => Lt(t), [t]), [o, u] = V(n), [s, c] = V(!1), [y, d] = V(!1);
  nt(() => {
    s || u(n);
  }, [s, n]);
  const l = () => {
    c(!1), u(n);
  }, f = U(
    (b, w, O) => {
      c(!0), yt(e).pipe(
        ht((T) => _(w, mt(0, b.length + T), B)),
        dt(w.length - b.length + 1),
        pt(() => O && O())
      ).subscribe((T) => u(Jt(T)));
    },
    [e]
  ), a = U(
    (b, w, O) => {
      c(!0), yt(e).pipe(
        ht((T) => _(b, mt(0, b.length - T), B)),
        dt(b.length - w.length + 1),
        pt(() => O && O())
      ).subscribe((T) => u(Jt(T)));
    },
    [e]
  ), m = U(
    (b, w, O) => {
      yt(e).pipe(
        ht((T) => mt(0, b.length - T, b.split(""))),
        dt(b.length - w.length + 1),
        pt(() => O && O())
      ).subscribe((T) => u(K("", T)));
    },
    [e]
  ), p = U(
    (b) => () => {
      d(!1), b && b();
    },
    []
  ), Y = U(
    (b) => {
      d(!0), H({
        isFired: s,
        initialPhonemes: Lt(n),
        decomposeOnBackspace: r
      }).with(
        { isFired: !0 },
        () => console.warn(
          `
            geul(${t}) is already excuted.
            If you want to re-run it. call 'reset' method first.
          `.replace(/^ +/gm, "").trim()
        )
      ).with(
        {
          initialPhonemes: g.when(et(i))
        },
        ({ initialPhonemes: w }) => f(w, i, p(b))
      ).with(
        {
          initialPhonemes: g.when((w) => et(w, i)),
          decomposeOnBackspace: !0
        },
        ({ initialPhonemes: w }) => a(
          w,
          i,
          p(b)
        )
      ).with(
        {
          initialPhonemes: g.when((w) => et(w, i)),
          decomposeOnBackspace: g.union(g.nullish, !1)
        },
        () => m(n, t, p(b))
      ).otherwise(
        () => _(
          [n, t],
          oe((w, O) => w.length - O.length),
          ([w, O]) => {
            throw Error(`'${w}' is not part of '${O}'`);
          }
        )
      );
    },
    [
      s,
      n,
      r,
      i,
      t,
      f,
      a,
      m,
      p
    ]
  );
  return { geul: o, isRunning: y, reset: l, run: Y };
}, gn = (t, { speed: e = 50, decomposeOnBackspace: n }) => {
  const [r, i] = V(), o = bt(), [u, s] = V(""), c = bt(""), {
    geul: y,
    isRunning: d,
    run: l,
    reset: f
  } = bn(u, {
    speed: e,
    initial: r || t,
    decomposeOnBackspace: n
  }), a = U((p) => {
    s(p);
  }, []), m = U(() => {
    i(void 0);
  }, []);
  return nt(() => {
    o.current !== r && (o.current = r, f());
  }, [r, f]), nt(() => {
    c.current !== u && (c.current = u, l(() => i(u)));
  }, [u, l]), {
    geul: y,
    isRunning: d,
    reset: m,
    run: a
  };
}, Sn = (t, { speed: e, initial: n = "", decomposeOnBackspace: r }, i = []) => {
  const [o, u] = V(-1), s = bt(-1), {
    geul: c,
    isRunning: y,
    run: d,
    reset: l
  } = gn(n, {
    speed: e,
    decomposeOnBackspace: r
  }), f = Qt(() => o + 1 === t.length, [o, ...i]), a = () => {
    if (f) {
      console.warn("Every geul steps already executed!");
      return;
    }
    u((b) => b + 1);
  }, [m, p] = V(!1), Y = () => {
    u(-1), p(!0);
  };
  return nt(() => {
    if (s.current !== o) {
      if (s.current = o, m) {
        l(), p(!1);
        return;
      }
      d(t[o]);
    }
  }, [t, o, d, l, m]), {
    geul: c,
    isRunning: y,
    isEnded: f,
    next: a,
    reset: Y
  };
};
export {
  gn as useDynamicGeul,
  bn as useGeul,
  Sn as useGeulPipe
};
