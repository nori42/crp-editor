var ze = /* @__PURE__ */ ((t) => (t.docTypeError = "docTypeError", t.contextNotFound = "contextNotFound", t.timerNotFound = "timerNotFound", t.ctxCallOutOfScope = "ctxCallOutOfScope", t.createNodeInParserFail = "createNodeInParserFail", t.stackOverFlow = "stackOverFlow", t.parserMatchError = "parserMatchError", t.serializerMatchError = "serializerMatchError", t.getAtomFromSchemaFail = "getAtomFromSchemaFail", t.expectDomTypeError = "expectDomTypeError", t.callCommandBeforeEditorView = "callCommandBeforeEditorView", t.missingRootElement = "missingRootElement", t.missingNodeInSchema = "missingNodeInSchema", t.missingMarkInSchema = "missingMarkInSchema", t.ctxNotBind = "ctxNotBind", t.missingYjsDoc = "missingYjsDoc", t))(ze || {});
class je extends Error {
  constructor(e, n) {
    super(n), this.name = "MilkdownError", this.code = e;
  }
}
const zg = (t, e) => typeof e == "function" ? "[Function]" : e, zo = (t) => JSON.stringify(t, zg);
function Bg(t) {
  return new je(
    ze.docTypeError,
    `Doc type error, unsupported type: ${zo(t)}`
  );
}
function Fg(t) {
  return new je(
    ze.contextNotFound,
    `Context "${t}" not found, do you forget to inject it?`
  );
}
function _g(t) {
  return new je(
    ze.timerNotFound,
    `Timer "${t}" not found, do you forget to record it?`
  );
}
function Bo() {
  return new je(
    ze.ctxCallOutOfScope,
    "Should not call a context out of the plugin."
  );
}
function $g(t, e, n) {
  const i = `Cannot create node for ${"name" in t ? t.name : t}`, o = (u) => {
    if (u == null) return "null";
    if (Array.isArray(u))
      return `[${u.map(o).join(", ")}]`;
    if (typeof u == "object")
      return "toJSON" in u && typeof u.toJSON == "function" ? JSON.stringify(u.toJSON()) : "spec" in u ? JSON.stringify(u.spec) : JSON.stringify(u);
    if (typeof u == "string" || typeof u == "number" || typeof u == "boolean")
      return JSON.stringify(u);
    if (typeof u == "function")
      return `[Function: ${u.name || "anonymous"}]`;
    try {
      return String(u);
    } catch {
      return "[Unserializable]";
    }
  }, s = ["[Description]", i], l = ["[Attributes]", e], a = [
    "[Content]",
    (n ?? []).map((u) => u ? typeof u == "object" && "type" in u ? `${u}` : o(u) : "null")
  ], c = [s, l, a].reduce(
    (u, [f, h]) => {
      const d = `${f}: ${o(h)}.`;
      return u.concat(d);
    },
    []
  );
  return new je(
    ze.createNodeInParserFail,
    c.join(`
`)
  );
}
function wh() {
  return new je(
    ze.stackOverFlow,
    "Stack over flow, cannot pop on an empty stack."
  );
}
function Vg(t) {
  return new je(
    ze.parserMatchError,
    `Cannot match target parser for node: ${zo(t)}.`
  );
}
function Hg(t) {
  return new je(
    ze.serializerMatchError,
    `Cannot match target serializer for node: ${zo(t)}.`
  );
}
function Wg(t, e) {
  return new je(
    ze.getAtomFromSchemaFail,
    `Cannot get ${t}: ${e} from schema.`
  );
}
function xt(t) {
  return new je(
    ze.expectDomTypeError,
    `Expect to be a dom, but get: ${zo(t)}.`
  );
}
function ms() {
  return new je(
    ze.callCommandBeforeEditorView,
    "You're trying to call a command before editor view initialized, make sure to get commandManager from ctx after editor view has been initialized"
  );
}
function jg(t) {
  return new je(
    ze.missingNodeInSchema,
    `Missing node in schema, milkdown cannot find "${t}" in schema.`
  );
}
function qg(t) {
  return new je(
    ze.missingMarkInSchema,
    `Missing mark in schema, milkdown cannot find "${t}" in schema.`
  );
}
class xh {
  constructor() {
    this.sliceMap = /* @__PURE__ */ new Map(), this.get = (e) => {
      const n = typeof e == "string" ? [...this.sliceMap.values()].find((r) => r.type.name === e) : this.sliceMap.get(e.id);
      if (!n) {
        const r = typeof e == "string" ? e : e.name;
        throw Fg(r);
      }
      return n;
    }, this.remove = (e) => {
      const n = typeof e == "string" ? [...this.sliceMap.values()].find((r) => r.type.name === e) : this.sliceMap.get(e.id);
      n && this.sliceMap.delete(n.type.id);
    }, this.has = (e) => typeof e == "string" ? [...this.sliceMap.values()].some((n) => n.type.name === e) : this.sliceMap.has(e.id);
  }
}
let Kg = class {
  /// @internal
  constructor(e, n, r) {
    this.#t = [], this.#r = () => {
      this.#t.forEach((i) => i(this.#e));
    }, this.set = (i) => {
      this.#e = i, this.#r();
    }, this.get = () => this.#e, this.update = (i) => {
      this.#e = i(this.#e), this.#r();
    }, this.type = r, this.#e = n, e.set(r.id, this);
  }
  #t;
  /// @internal
  #e;
  #r;
  /// Add a watcher for changes in the slice.
  /// Returns a function to remove the watcher.
  on(e) {
    return this.#t.push(e), () => {
      this.#t = this.#t.filter((n) => n !== e);
    };
  }
  /// Add a one-time watcher for changes in the slice.
  /// The watcher will be removed after it is called.
  /// Returns a function to remove the watcher.
  once(e) {
    const n = this.on((r) => {
      e(r), n();
    });
    return n;
  }
  /// Remove a watcher.
  off(e) {
    this.#t = this.#t.filter((n) => n !== e);
  }
  /// Remove all watchers.
  offAll() {
    this.#t = [];
  }
};
class Ug {
  /// Create a slice type with a default value and a name.
  /// The name should be unique in the container.
  constructor(e, n) {
    this.id = Symbol(`Context-${n}`), this.name = n, this._defaultValue = e, this._typeInfo = () => {
      throw Bo();
    };
  }
  /// Create a slice with a container.
  /// You can also pass a value to override the default value.
  create(e, n = this._defaultValue) {
    return new Kg(e, n, this);
  }
}
const Q = (t, e) => new Ug(t, e);
class Jg {
  /// Create an inspector with container, clock and metadata.
  constructor(e, n, r) {
    this.#n = /* @__PURE__ */ new Set(), this.#l = /* @__PURE__ */ new Set(), this.#o = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.read = () => ({
      metadata: this.#t,
      injectedSlices: [...this.#n].map((i) => ({
        name: typeof i == "string" ? i : i.name,
        value: this.#s(i)
      })),
      consumedSlices: [...this.#l].map((i) => ({
        name: typeof i == "string" ? i : i.name,
        value: this.#s(i)
      })),
      recordedTimers: [...this.#o].map(
        ([i, { duration: o }]) => ({
          name: i.name,
          duration: o,
          status: this.#a(i)
        })
      ),
      waitTimers: [...this.#i].map(([i, { duration: o }]) => ({
        name: i.name,
        duration: o,
        status: this.#a(i)
      }))
    }), this.onRecord = (i) => {
      this.#o.set(i, { start: Date.now(), duration: 0 });
    }, this.onClear = (i) => {
      this.#o.delete(i);
    }, this.onDone = (i) => {
      const o = this.#o.get(i);
      o && (o.duration = Date.now() - o.start);
    }, this.onWait = (i, o) => {
      const s = Date.now();
      o.finally(() => {
        this.#i.set(i, { duration: Date.now() - s });
      }).catch(console.error);
    }, this.onInject = (i) => {
      this.#n.add(i);
    }, this.onRemove = (i) => {
      this.#n.delete(i);
    }, this.onUse = (i) => {
      this.#l.add(i);
    }, this.#s = (i) => this.#e.get(i).get(), this.#a = (i) => this.#r.get(i).status, this.#e = e, this.#r = n, this.#t = r;
  }
  /// @internal
  #t;
  /// @internal
  #e;
  /// @internal
  #r;
  #n;
  #l;
  #o;
  #i;
  #s;
  #a;
}
class la {
  /// Create a ctx object with container and clock.
  constructor(e, n, r) {
    this.produce = (i) => i && Object.keys(i).length ? new la(this.#t, this.#e, { ...i }) : this, this.inject = (i, o) => {
      const s = i.create(this.#t.sliceMap);
      return o != null && s.set(o), this.#n?.onInject(i), this;
    }, this.remove = (i) => (this.#t.remove(i), this.#n?.onRemove(i), this), this.record = (i) => (i.create(this.#e.store), this.#n?.onRecord(i), this), this.clearTimer = (i) => (this.#e.remove(i), this.#n?.onClear(i), this), this.isInjected = (i) => this.#t.has(i), this.isRecorded = (i) => this.#e.has(i), this.use = (i) => (this.#n?.onUse(i), this.#t.get(i)), this.get = (i) => this.use(i).get(), this.set = (i, o) => this.use(i).set(o), this.update = (i, o) => this.use(i).update(o), this.timer = (i) => this.#e.get(i), this.done = (i) => {
      this.timer(i).done(), this.#n?.onDone(i);
    }, this.wait = (i) => {
      const o = this.timer(i).start();
      return this.#n?.onWait(i, o), o;
    }, this.waitTimers = async (i) => {
      await Promise.all(this.get(i).map((o) => this.wait(o)));
    }, this.#t = e, this.#e = n, this.#r = r, r && (this.#n = new Jg(e, n, r));
  }
  /// @internal
  #t;
  /// @internal
  #e;
  /// @internal
  #r;
  /// @internal
  #n;
  /// Get metadata of the ctx.
  get meta() {
    return this.#r;
  }
  /// Get the inspector of the ctx.
  get inspector() {
    return this.#n;
  }
}
class Gg {
  constructor() {
    this.store = /* @__PURE__ */ new Map(), this.get = (e) => {
      const n = this.store.get(e.id);
      if (!n) throw _g(e.name);
      return n;
    }, this.remove = (e) => {
      this.store.delete(e.id);
    }, this.has = (e) => this.store.has(e.id);
  }
}
class Yg {
  /// @internal
  constructor(e, n) {
    this.#t = null, this.#e = null, this.#n = "pending", this.start = () => (this.#t ??= new Promise((r, i) => {
      this.#e = (o) => {
        o instanceof CustomEvent && o.detail.id === this.#r && (this.#n = "resolved", this.#l(), o.stopImmediatePropagation(), r());
      }, this.#o(() => {
        this.#n === "pending" && (this.#n = "rejected"), this.#l(), i(new Error(`Timing ${this.type.name} timeout.`));
      }), this.#n = "pending", addEventListener(this.type.name, this.#e);
    }), this.#t), this.done = () => {
      const r = new CustomEvent(this.type.name, {
        detail: { id: this.#r }
      });
      dispatchEvent(r);
    }, this.#l = () => {
      this.#e && removeEventListener(this.type.name, this.#e);
    }, this.#o = (r) => {
      setTimeout(() => {
        r();
      }, this.type.timeout);
    }, this.#r = Symbol(n.name), this.type = n, e.set(n.id, this);
  }
  #t;
  #e;
  /// @internal
  #r;
  #n;
  /// The status of the timer.
  /// Can be `pending`, `resolved` or `rejected`.
  get status() {
    return this.#n;
  }
  #l;
  #o;
}
class Qg {
  /// Create a timer type with a name and a timeout.
  /// The name should be unique in the clock.
  constructor(e, n = 3e3) {
    this.create = (r) => new Yg(r, this), this.id = Symbol(`Timer-${e}`), this.name = e, this.timeout = n;
  }
}
const Ft = (t, e = 3e3) => new Qg(t, e);
function be(t) {
  this.content = t;
}
be.prototype = {
  constructor: be,
  find: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === t) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(t) {
    var e = this.find(t);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(t, e, n) {
    var r = n && n != t ? this.remove(n) : this, i = r.find(t), o = r.content.slice();
    return i == -1 ? o.push(n || t, e) : (o[i + 1] = e, n && (o[i] = n)), new be(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(t) {
    var e = this.find(t);
    if (e == -1) return this;
    var n = this.content.slice();
    return n.splice(e, 2), new be(n);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(t, e) {
    return new be([t, e].concat(this.remove(t).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(t, e) {
    var n = this.remove(t).content.slice();
    return n.push(t, e), new be(n);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(t, e, n) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(t);
    return i.splice(o == -1 ? i.length : o, 0, e, n), new be(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      t(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(t) {
    return t = be.from(t), t.size ? new be(t.content.concat(this.subtract(t).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(t) {
    return t = be.from(t), t.size ? new be(this.subtract(t).content.concat(t.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(t) {
    var e = this;
    t = be.from(t);
    for (var n = 0; n < t.content.length; n += 2)
      e = e.remove(t.content[n]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var t = {};
    return this.forEach(function(e, n) {
      t[e] = n;
    }), t;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
be.from = function(t) {
  if (t instanceof be) return t;
  var e = [];
  if (t) for (var n in t) e.push(n, t[n]);
  return new be(e);
};
function Ch(t, e, n) {
  for (let r = 0; ; r++) {
    if (r == t.childCount || r == e.childCount)
      return t.childCount == e.childCount ? null : n;
    let i = t.child(r), o = e.child(r);
    if (i == o) {
      n += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return n;
    if (i.isText && i.text != o.text) {
      for (let s = 0; i.text[s] == o.text[s]; s++)
        n++;
      return n;
    }
    if (i.content.size || o.content.size) {
      let s = Ch(i.content, o.content, n + 1);
      if (s != null)
        return s;
    }
    n += i.nodeSize;
  }
}
function Sh(t, e, n, r) {
  for (let i = t.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: n, b: r };
    let s = t.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      n -= a, r -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: n, b: r };
    if (s.isText && s.text != l.text) {
      let c = 0, u = Math.min(s.text.length, l.text.length);
      for (; c < u && s.text[s.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, n--, r--;
      return { a: n, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = Sh(s.content, l.content, n - 1, r - 1);
      if (c)
        return c;
    }
    n -= a, r -= a;
  }
}
class N {
  /**
  @internal
  */
  constructor(e, n) {
    if (this.content = e, this.size = n || 0, n == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, n, r, i = 0, o) {
    for (let s = 0, l = 0; l < n; s++) {
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, n - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, n, r, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, n, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, n - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (s ? s = !1 : o += r), o += c;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let n = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new N(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, n = this.size) {
    if (e == 0 && n == this.size)
      return this;
    let r = [], i = 0;
    if (n > e)
      for (let o = 0, s = 0; s < n; o++) {
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > n) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, n - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, n - s - 1))), r.push(l), i += l.nodeSize), s = a;
      }
    return new N(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? N.empty : e == 0 && n == this.content.length ? this : new N(this.content.slice(e, n));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, n) {
    let r = this.content[e];
    if (r == n)
      return this;
    let i = this.content.slice(), o = this.size + n.nodeSize - r.nodeSize;
    return i[e] = n, new N(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new N([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new N(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let n = 0; n < this.content.length; n++)
      if (!this.content[n].eq(e.content[n]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let n = this.content[e];
    if (!n)
      throw new RangeError("Index " + e + " out of range for " + this);
    return n;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let n = 0, r = 0; n < this.content.length; n++) {
      let i = this.content[n];
      e(i, r, n), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, n = 0) {
    return Ch(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return Sh(this, e, n, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Bi(0, e);
    if (e == this.size)
      return Bi(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let n = 0, r = 0; ; n++) {
      let i = this.child(n), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Bi(n + 1, o) : Bi(n, r);
      r = o;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return N.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new N(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return N.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (n || (n = e.slice(0, i)), n[n.length - 1] = o.withText(n[n.length - 1].text + o.text)) : n && n.push(o);
    }
    return new N(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return N.empty;
    if (e instanceof N)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new N([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
N.empty = new N([], 0);
const gs = { index: 0, offset: 0 };
function Bi(t, e) {
  return gs.index = t, gs.offset = e, gs;
}
function po(t, e) {
  if (t === e)
    return !0;
  if (!(t && typeof t == "object") || !(e && typeof e == "object"))
    return !1;
  let n = Array.isArray(t);
  if (Array.isArray(e) != n)
    return !1;
  if (n) {
    if (t.length != e.length)
      return !1;
    for (let r = 0; r < t.length; r++)
      if (!po(t[r], e[r]))
        return !1;
  } else {
    for (let r in t)
      if (!(r in e) || !po(t[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in t))
        return !1;
  }
  return !0;
}
class G {
  /**
  @internal
  */
  constructor(e, n) {
    this.type = e, this.attrs = n;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let n, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        n || (n = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (n || (n = e.slice(0, i)), n.push(this), r = !0), n && n.push(o);
      }
    }
    return n || (n = e.slice()), r || n.push(this), n;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return e.slice(0, n).concat(e.slice(n + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && po(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[n.type];
    if (!r)
      throw new RangeError(`There is no mark type ${n.type} in this schema`);
    let i = r.create(n.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, n) {
    if (e == n)
      return !0;
    if (e.length != n.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(n[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return G.none;
    if (e instanceof G)
      return [e];
    let n = e.slice();
    return n.sort((r, i) => r.type.rank - i.type.rank), n;
  }
}
G.none = [];
class mo extends Error {
}
class D {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, n, r) {
    this.content = e, this.openStart = n, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, n) {
    let r = Th(this.content, e + this.openStart, n);
    return r && new D(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new D(Mh(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return D.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new D(N.fromJSON(e, n.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, n = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (n || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (n || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new D(e, r, i);
  }
}
D.empty = new D(N.empty, 0, 0);
function Mh(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), o = t.maybeChild(r), { index: s, offset: l } = t.findIndex(n);
  if (i == e || o.isText) {
    if (l != n && !t.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, o.copy(Mh(o.content, e - i - 1, n - i - 1)));
}
function Th(t, e, n, r) {
  let { index: i, offset: o } = t.findIndex(e), s = t.maybeChild(i);
  if (o == e || s.isText)
    return r && !r.canReplace(i, i, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
  let l = Th(s.content, e - o - 1, n, s);
  return l && t.replaceChild(i, s.copy(l));
}
function Xg(t, e, n) {
  if (n.openStart > t.depth)
    throw new mo("Inserted content deeper than insertion position");
  if (t.depth - n.openStart != e.depth - n.openEnd)
    throw new mo("Inconsistent open depths");
  return Nh(t, e, n, 0);
}
function Nh(t, e, n, r) {
  let i = t.index(r), o = t.node(r);
  if (i == e.index(r) && r < t.depth - n.openStart) {
    let s = Nh(t, e, n, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (n.content.size)
    if (!n.openStart && !n.openEnd && t.depth == r && e.depth == r) {
      let s = t.parent, l = s.content;
      return Nn(s, l.cut(0, t.parentOffset).append(n.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Zg(n, t);
      return Nn(o, Ah(t, s, l, e, r));
    }
  else return Nn(o, go(t, e, r));
}
function Ih(t, e) {
  if (!e.type.compatibleContent(t.type))
    throw new mo("Cannot join " + e.type.name + " onto " + t.type.name);
}
function hl(t, e, n) {
  let r = t.node(n);
  return Ih(r, e.node(n)), r;
}
function Tn(t, e) {
  let n = e.length - 1;
  n >= 0 && t.isText && t.sameMarkup(e[n]) ? e[n] = t.withText(e[n].text + t.text) : e.push(t);
}
function Wr(t, e, n, r) {
  let i = (e || t).node(n), o = 0, s = e ? e.index(n) : i.childCount;
  t && (o = t.index(n), t.depth > n ? o++ : t.textOffset && (Tn(t.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Tn(i.child(l), r);
  e && e.depth == n && e.textOffset && Tn(e.nodeBefore, r);
}
function Nn(t, e) {
  return t.type.checkContent(e), t.copy(e);
}
function Ah(t, e, n, r, i) {
  let o = t.depth > i && hl(t, e, i + 1), s = r.depth > i && hl(n, r, i + 1), l = [];
  return Wr(null, t, i, l), o && s && e.index(i) == n.index(i) ? (Ih(o, s), Tn(Nn(o, Ah(t, e, n, r, i + 1)), l)) : (o && Tn(Nn(o, go(t, e, i + 1)), l), Wr(e, n, i, l), s && Tn(Nn(s, go(n, r, i + 1)), l)), Wr(r, null, i, l), new N(l);
}
function go(t, e, n) {
  let r = [];
  if (Wr(null, t, n, r), t.depth > n) {
    let i = hl(t, e, n + 1);
    Tn(Nn(i, go(t, e, n + 1)), r);
  }
  return Wr(e, null, n, r), new N(r);
}
function Zg(t, e) {
  let n = e.depth - t.openStart, i = e.node(n).copy(t.content);
  for (let o = n - 1; o >= 0; o--)
    i = e.node(o).copy(N.from(i));
  return {
    start: i.resolveNoCache(t.openStart + n),
    end: i.resolveNoCache(i.content.size - t.openEnd - n)
  };
}
class oi {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.path = n, this.parentOffset = r, this.depth = n.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, n = this.index(this.depth);
    if (n == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(n);
    return r ? e.child(n).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), n = this.pos - this.path[this.path.length - 1];
    return n ? this.parent.child(e).cut(0, n) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, n) {
    n = this.resolveDepth(n);
    let r = this.path[n * 3], i = n == 0 ? 0 : this.path[n * 3 - 1] + 1;
    for (let o = 0; o < e; o++)
      i += r.child(o).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, n = this.index();
    if (e.content.size == 0)
      return G.none;
    if (this.textOffset)
      return e.child(n).marks;
    let r = e.maybeChild(n - 1), i = e.maybeChild(n);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let o = r.marks;
    for (var s = 0; s < o.length; s++)
      o[s].type.spec.inclusive === !1 && (!i || !o[s].isInSet(i.marks)) && (o = o[s--].removeFromSet(o));
    return o;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let n = this.parent.maybeChild(this.index());
    if (!n || !n.isInline)
      return null;
    let r = n.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let n = this.depth; n > 0; n--)
      if (this.start(n) <= e && this.end(n) >= e)
        return n;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, n) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!n || n(this.node(r))))
        return new Eh(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let n = 1; n <= this.depth; n++)
      e += (e ? "/" : "") + this.node(n).type.name + "_" + this.index(n - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, n) {
    if (!(n >= 0 && n <= e.content.size))
      throw new RangeError("Position " + n + " out of range");
    let r = [], i = 0, o = n;
    for (let s = e; ; ) {
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (r.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new oi(n, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, n) {
    let r = Qc.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == n)
          return s;
      }
    else
      Qc.set(e, r = new ey());
    let i = r.elts[r.i] = oi.resolve(e, n);
    return r.i = (r.i + 1) % ty, i;
  }
}
class ey {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ty = 12, Qc = /* @__PURE__ */ new WeakMap();
class Eh {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const ny = /* @__PURE__ */ Object.create(null);
let Lt = class dl {
  /**
  @internal
  */
  constructor(e, n, r, i = G.none) {
    this.type = e, this.attrs = n, this.marks = i, this.content = r || N.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, n, r, i = 0) {
    this.content.nodesBetween(e, n, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, n, r, i) {
    return this.content.textBetween(e, n, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, n, r) {
    return this.type == e && po(this.attrs, n || e.defaultAttrs || ny) && G.sameSet(this.marks, r || G.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new dl(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new dl(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, n = this.content.size) {
    return e == 0 && n == this.content.size ? this : this.copy(this.content.cut(e, n));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, n = this.content.size, r = !1) {
    if (e == n)
      return D.empty;
    let i = this.resolve(e), o = this.resolve(n), s = r ? 0 : i.sharedDepth(n), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new D(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, n, r) {
    return Xg(this.resolve(e), this.resolve(n), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let n = this; ; ) {
      let { index: r, offset: i } = n.content.findIndex(e);
      if (n = n.maybeChild(r), !n)
        return null;
      if (i == e || n.isText)
        return n;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: n, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(n), index: n, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: n, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(n), index: n, offset: r };
    let i = this.content.child(n - 1);
    return { node: i, index: n - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return oi.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return oi.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, n, r) {
    let i = !1;
    return n > e && this.nodesBetween(e, n, (o) => (r.isInSet(o.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Oh(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let n = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!n)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return n;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, n, r = N.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, n);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, n, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(r), s = o && o.matchFragment(this.content, n);
    return s ? s.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = G.none;
    for (let n = 0; n < this.marks.length; n++) {
      let r = this.marks[n];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!G.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((n) => n.type.name)}`);
    this.content.forEach((n) => n.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((n) => n.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (n.marks) {
      if (!Array.isArray(n.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = n.marks.map(e.markFromJSON);
    }
    if (n.type == "text") {
      if (typeof n.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(n.text, r);
    }
    let i = N.fromJSON(e, n.content), o = e.nodeType(n.type).create(n.attrs, i, r);
    return o.type.checkAttrs(o.attrs), o;
  }
};
Lt.prototype.text = void 0;
class yo extends Lt {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    if (super(e, n, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Oh(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, n) {
    return this.text.slice(e, n);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new yo(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new yo(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, n = this.text.length) {
    return e == 0 && n == this.text.length ? this : this.withText(this.text.slice(e, n));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Oh(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    e = t[n].type.name + "(" + e + ")";
  return e;
}
class Ln {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, n) {
    let r = new ry(e, n);
    if (r.next == null)
      return Ln.empty;
    let i = Dh(r);
    r.next && r.err("Unexpected trailing text");
    let o = uy(cy(i));
    return fy(o, r), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let n = 0; n < this.next.length; n++)
      if (this.next[n].type == e)
        return this.next[n].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, n = 0, r = e.childCount) {
    let i = this;
    for (let o = n; i && o < r; o++)
      i = i.matchType(e.child(o).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: n } = this.next[e];
      if (!(n.isText || n.hasRequiredAttrs()))
        return n;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let n = 0; n < this.next.length; n++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[n].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, n = !1, r = 0) {
    let i = [this];
    function o(s, l) {
      let a = s.matchFragment(e, r);
      if (a && (!n || a.validEnd))
        return N.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: f } = s.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(f) == -1) {
          i.push(f);
          let h = o(f, l.concat(u));
          if (h)
            return h;
        }
      }
      return null;
    }
    return o(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let n = this.computeWrapping(e);
    return this.wrapCache.push(e, n), n;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let n = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let l = i; l.type; l = l.via)
          s.push(l.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in n) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), n[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function n(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && n(r.next[i].next);
    }
    return n(this), e.map((r, i) => {
      let o = i + (r.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < r.next.length; s++)
        o += (s ? ", " : "") + r.next[s].type.name + "->" + e.indexOf(r.next[s].next);
      return o;
    }).join(`
`);
  }
}
Ln.empty = new Ln(!0);
class ry {
  constructor(e, n) {
    this.string = e, this.nodeTypes = n, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Dh(t) {
  let e = [];
  do
    e.push(iy(t));
  while (t.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function iy(t) {
  let e = [];
  do
    e.push(oy(t));
  while (t.next && t.next != ")" && t.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function oy(t) {
  let e = ay(t);
  for (; ; )
    if (t.eat("+"))
      e = { type: "plus", expr: e };
    else if (t.eat("*"))
      e = { type: "star", expr: e };
    else if (t.eat("?"))
      e = { type: "opt", expr: e };
    else if (t.eat("{"))
      e = sy(t, e);
    else
      break;
  return e;
}
function Xc(t) {
  /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
  let e = Number(t.next);
  return t.pos++, e;
}
function sy(t, e) {
  let n = Xc(t), r = n;
  return t.eat(",") && (t.next != "}" ? r = Xc(t) : r = -1), t.eat("}") || t.err("Unclosed braced range"), { type: "range", min: n, max: r, expr: e };
}
function ly(t, e) {
  let n = t.nodeTypes, r = n[e];
  if (r)
    return [r];
  let i = [];
  for (let o in n) {
    let s = n[o];
    s.isInGroup(e) && i.push(s);
  }
  return i.length == 0 && t.err("No node type or group '" + e + "' found"), i;
}
function ay(t) {
  if (t.eat("(")) {
    let e = Dh(t);
    return t.eat(")") || t.err("Missing closing paren"), e;
  } else if (/\W/.test(t.next))
    t.err("Unexpected token '" + t.next + "'");
  else {
    let e = ly(t, t.next).map((n) => (t.inline == null ? t.inline = n.isInline : t.inline != n.isInline && t.err("Mixing inline and block content"), { type: "name", value: n }));
    return t.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function cy(t) {
  let e = [[]];
  return i(o(t, 0), n()), e;
  function n() {
    return e.push([]) - 1;
  }
  function r(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = n());
      }
    else if (s.type == "star") {
      let a = n();
      return r(l, a), i(o(s.expr, a), a), [r(a)];
    } else if (s.type == "plus") {
      let a = n();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [r(a)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let c = 0; c < s.min; c++) {
          let u = n();
          i(o(s.expr, a), u), a = u;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let u = n();
            r(a, u), i(o(s.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (s.type == "name")
          return [r(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Rh(t, e) {
  return e - t;
}
function Zc(t, e) {
  let n = [];
  return r(e), n.sort(Rh);
  function r(i) {
    let o = t[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    n.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && n.indexOf(a) == -1 && r(a);
    }
  }
}
function uy(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return n(Zc(t, 0));
  function n(r) {
    let i = [];
    r.forEach((s) => {
      t[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Zc(t, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Ln(r.indexOf(t.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Rh);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || n(l) });
    }
    return o;
  }
}
function fy(t, e) {
  for (let n = 0, r = [t]; n < r.length; n++) {
    let i = r[n], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function vh(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t) {
    let r = t[n];
    if (!r.hasDefault)
      return null;
    e[n] = r.default;
  }
  return e;
}
function Lh(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  for (let r in t) {
    let i = e && e[r];
    if (i === void 0) {
      let o = t[r];
      if (o.hasDefault)
        i = o.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    n[r] = i;
  }
  return n;
}
function Ph(t, e, n, r) {
  for (let i in e)
    if (!(i in t))
      throw new RangeError(`Unsupported attribute ${i} for ${n} of type ${i}`);
  for (let i in t) {
    let o = t[i];
    o.validate && o.validate(e[i]);
  }
}
function zh(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      n[r] = new dy(t, r, e[r]);
  return n;
}
let eu = class Bh {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.name = e, this.schema = n, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = zh(e, r.attrs), this.defaultAttrs = vh(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == Ln.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Lh(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, n, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Lt(this, this.computeAttrs(e), N.from(n), G.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, n, r) {
    return n = N.from(n), this.checkContent(n), new Lt(this, this.computeAttrs(e), n, G.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, n, r) {
    if (e = this.computeAttrs(e), n = N.from(n), n.size) {
      let s = this.contentMatch.fillBefore(n);
      if (!s)
        return null;
      n = s.append(n);
    }
    let i = this.contentMatch.matchFragment(n), o = i && i.fillBefore(N.empty, !0);
    return o ? new Lt(this, e, n.append(o), G.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let n = this.contentMatch.matchFragment(e);
    if (!n || !n.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Ph(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let n = 0; n < e.length; n++)
      if (!this.allowsMarkType(e[n].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let n;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? n && n.push(e[r]) : n || (n = e.slice(0, r));
    return n ? n.length ? n : G.none : e;
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Bh(o, n, s));
    let i = n.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function hy(t, e, n) {
  let r = n.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${t}, got ${o}`);
  };
}
class dy {
  constructor(e, n, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? hy(e, n, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Fo {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    this.name = e, this.rank = n, this.schema = r, this.spec = i, this.attrs = zh(e, i.attrs), this.excluded = null;
    let o = vh(this.attrs);
    this.instance = o ? new G(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new G(this, Lh(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Fo(o, i++, n, s)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var n = 0; n < e.length; n++)
      e[n].type == this && (e = e.slice(0, n).concat(e.slice(n + 1)), n--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (e[n].type == this)
        return e[n];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Ph(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class py {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let n = this.spec = {};
    for (let i in e)
      n[i] = e[i];
    n.nodes = be.from(e.nodes), n.marks = be.from(e.marks || {}), this.nodes = eu.compile(this.spec.nodes, this), this.marks = Fo.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Ln.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? tu(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : tu(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Lt.fromJSON(this, i), this.markFromJSON = (i) => G.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, n = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof eu) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(n, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, n) {
    let r = this.nodes.text;
    return new yo(r, r.defaultAttrs, e, G.setFrom(n));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, n) {
    return typeof e == "string" && (e = this.marks[e]), e.create(n);
  }
  /**
  @internal
  */
  nodeType(e) {
    let n = this.nodes[e];
    if (!n)
      throw new RangeError("Unknown node type: " + e);
    return n;
  }
}
function tu(t, e) {
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = t.marks[i], s = o;
    if (o)
      n.push(o);
    else
      for (let l in t.marks) {
        let a = t.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && n.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return n;
}
function my(t) {
  return t.tag != null;
}
function gy(t) {
  return t.style != null;
}
class Pn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, n) {
    this.schema = e, this.rules = n, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    n.forEach((i) => {
      if (my(i))
        this.tags.push(i);
      else if (gy(i)) {
        let o = /[^=]*/.exec(i.style)[0];
        r.indexOf(o) < 0 && r.push(o), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let o = e.nodes[i.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, n = {}) {
    let r = new ru(this, n, !1);
    return r.addAll(e, G.none, n.from, n.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, n = {}) {
    let r = new ru(this, n, !0);
    return r.addAll(e, G.none, n.from, n.to), D.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (by(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || n.matchesContext(o.context))) {
        if (o.getAttrs) {
          let s = o.getAttrs(e);
          if (s === !1)
            continue;
          o.attrs = s || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, n, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], l = s.style;
      if (!(l.indexOf(e) != 0 || s.context && !r.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != n))) {
        if (s.getAttrs) {
          let a = s.getAttrs(n);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let n = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < n.length; s++) {
        let l = n[s];
        if ((l.priority == null ? 50 : l.priority) < o)
          break;
      }
      n.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = iu(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = iu(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return n;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Pn(e, Pn.schemaRules(e)));
  }
}
const Fh = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, yy = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, _h = { ol: !0, ul: !0 }, si = 1, pl = 2, jr = 4;
function nu(t, e, n) {
  return e != null ? (e ? si : 0) | (e === "full" ? pl : 0) : t && t.whitespace == "pre" ? si | pl : n & ~jr;
}
class Fi {
  constructor(e, n, r, i, o, s) {
    this.type = e, this.attrs = n, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = G.none, this.match = o || (s & jr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(N.from(e));
      if (n)
        this.match = this.type.contentMatch.matchFragment(n);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & si)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let n = N.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(N.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Fh.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ru {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = n.topNode, o, s = nu(null, n.preserveWhitespace, 0) | (r ? jr : 0);
    i ? o = new Fi(i.type, i.attrs, G.none, !0, n.topMatch || i.type.contentMatch, s) : r ? o = new Fi(null, null, G.none, !0, null, s) : o = new Fi(e.schema.topNodeType, null, G.none, !0, null, s), this.nodes = [o], this.find = n.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, n) {
    e.nodeType == 3 ? this.addTextNode(e, n) : e.nodeType == 1 && this.addElement(e, n);
  }
  addTextNode(e, n) {
    let r = e.nodeValue, i = this.top, o = i.options & pl ? "full" : this.localPreserveWS || (i.options & si) > 0;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (o)
        o !== "full" ? r = r.replace(/\r?\n|\r/g, " ") : r = r.replace(/\r\n?/g, `
`);
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let s = i.content[i.content.length - 1], l = e.previousSibling;
        (!s || l && l.nodeName == "BR" || s.isText && /[ \t\r\n\u000c]$/.test(s.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), n, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, n, r) {
    let i = this.localPreserveWS, o = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let s = e.nodeName.toLowerCase(), l;
    _h.hasOwnProperty(s) && this.parser.normalizeLists && ky(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : yy.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, n);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Fh.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, n);
        break e;
      }
      let f = a && a.skip ? n : this.readStyles(e, n);
      f && this.addAll(e, f), c && this.sync(o), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, n);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, n) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), n);
  }
  // Called for ignored nodes
  ignoreFallback(e, n) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), n, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, n) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let o = this.parser.matchedStyles[i], s = r.getPropertyValue(o);
        if (s)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(o, s, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? n = n.filter((c) => !a.clearMark(c)) : n = n.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return n;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, n, r, i) {
    let o, s;
    if (n.node)
      if (s = this.parser.schema.nodes[n.node], s.isLeaf)
        this.insertNode(s.create(n.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(s, n.attrs || null, r, n.preserveWhitespace);
        a && (o = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[n.mark];
      r = r.concat(a.create(n.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (n.getContent)
      this.findInside(e), n.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof n.contentElement == "string" ? a = e.querySelector(n.contentElement) : typeof n.contentElement == "function" ? a = n.contentElement(e) : n.contentElement && (a = n.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    o && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, n, r, i) {
    let o = r || 0;
    for (let s = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; s != l; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s, n);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, n, r) {
    let i, o;
    for (let s = this.open, l = 0; s >= 0; s--) {
      let a = this.nodes[s], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, o = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(o);
    for (let s = 0; s < i.length; s++)
      n = this.enterInner(i[s], null, n, !1);
    return n;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, n, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let o = this.textblockFromContext();
      o && (n = this.enterInner(o, null, n));
    }
    let i = this.findPlace(e, n, r);
    if (i) {
      this.closeExtra();
      let o = this.top;
      o.match && (o.match = o.match.matchType(e.type));
      let s = G.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : ou(l.type, e.type)) && (s = l.addToSet(s));
      return o.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, n, r, i) {
    let o = this.findPlace(e.create(n), r, !1);
    return o && (o = this.enterInner(e, n, r, !0, i)), o;
  }
  // Open a node of the given type
  enterInner(e, n, r, i = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.match = s.match && s.match.matchType(e);
    let l = nu(e, o, s.options);
    s.options & jr && s.content.length == 0 && (l |= jr);
    let a = G.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : ou(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Fi(e, n, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let n = this.nodes.length - 1;
    if (n > this.open) {
      for (; n > this.open; n--)
        this.nodes[n - 1].content.push(this.nodes[n].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let n = this.open; n >= 0; n--) {
      if (this.nodes[n] == e)
        return this.open = n, !0;
      this.localPreserveWS && (this.nodes[n].options |= si);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let n = this.open; n >= 0; n--) {
      let r = this.nodes[n].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      n && e++;
    }
    return e;
  }
  findAtPoint(e, n) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == n && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].pos == null && e.nodeType == 1 && e.contains(this.find[n].node) && (this.find[n].pos = this.currentPos);
  }
  findAround(e, n, r) {
    if (e != n && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && n.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && (this.find[n].pos = this.currentPos - (e.nodeValue.length - this.find[n].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let n = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let c = n[l];
        if (c == "") {
          if (l == n.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return s(n.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let n = e.depth; n >= 0; n--) {
        let r = e.node(n).contentMatchAt(e.indexAfter(n)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let n in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[n];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function ky(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && _h.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function by(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function iu(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function ou(t, e) {
  let n = e.schema.nodes;
  for (let r in n) {
    let i = n[r];
    if (!i.allowsMarkType(t))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
class Hn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, n) {
    this.nodes = e, this.marks = n;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, n = {}, r) {
    r || (r = ys(n).createDocumentFragment());
    let i = r, o = [];
    return e.forEach((s) => {
      if (o.length || s.marks.length) {
        let l = 0, a = 0;
        for (; l < o.length && a < s.marks.length; ) {
          let c = s.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(o[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < o.length; )
          i = o.pop()[1];
        for (; a < s.marks.length; ) {
          let c = s.marks[a++], u = this.serializeMark(c, s.isInline, n);
          u && (o.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(s, n));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, n) {
    let { dom: r, contentDOM: i } = qi(ys(n), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, n, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, n = {}) {
    let r = this.serializeNodeInner(e, n);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let o = this.serializeMark(e.marks[i], e.isInline, n);
      o && ((o.contentDOM || o.dom).appendChild(r), r = o.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, n, r = {}) {
    let i = this.marks[e.type.name];
    return i && qi(ys(r), i(e, n), null, e.attrs);
  }
  static renderSpec(e, n, r = null, i) {
    return qi(e, n, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Hn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let n = su(e.nodes);
    return n.text || (n.text = (r) => r.text), n;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return su(e.marks);
  }
}
function su(t) {
  let e = {};
  for (let n in t) {
    let r = t[n].spec.toDOM;
    r && (e[n] = r);
  }
  return e;
}
function ys(t) {
  return t.document || window.document;
}
const lu = /* @__PURE__ */ new WeakMap();
function wy(t) {
  let e = lu.get(t);
  return e === void 0 && lu.set(t, e = xy(t)), e;
}
function xy(t) {
  let e = null;
  function n(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            n(r[i]);
      else
        for (let i in r)
          n(r[i]);
  }
  return n(t), e;
}
function qi(t, e, n, r) {
  if (typeof e == "string")
    return { dom: t.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], o;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (o = wy(r)) && o.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let s = i.indexOf(" ");
  s > 0 && (n = i.slice(0, s), i = i.slice(s + 1));
  let l, a = n ? t.createElementNS(n, i) : t.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let f in c)
      if (c[f] != null) {
        let h = f.indexOf(" ");
        h > 0 ? a.setAttributeNS(f.slice(0, h), f.slice(h + 1), c[f]) : f == "style" && a.style ? a.style.cssText = c[f] : a.setAttribute(f, c[f]);
      }
  }
  for (let f = u; f < e.length; f++) {
    let h = e[f];
    if (h === 0) {
      if (f < e.length - 1 || f > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: d, contentDOM: p } = qi(t, h, n, r);
      if (a.appendChild(d), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const Cy = {};
function aa(t, e) {
  const n = Cy, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return $h(t, r, i);
}
function $h(t, e, n) {
  if (Sy(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return au(t.children, e, n);
  }
  return Array.isArray(t) ? au(t, e, n) : "";
}
function au(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = $h(t[i], e, n);
  return r.join("");
}
function Sy(t) {
  return !!(t && typeof t == "object");
}
const cu = document.createElement("i");
function ca(t) {
  const e = "&" + t + ";";
  cu.innerHTML = e;
  const n = cu.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && t !== "semi" || n === e ? !1 : n
  );
}
function Te(t, e, n, r) {
  const i = t.length;
  let o = 0, s;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(e, n), t.splice(...s);
  else
    for (n && t.splice(e, n); o < r.length; )
      s = r.slice(o, o + 1e4), s.unshift(e, 0), t.splice(...s), o += 1e4, e += 1e4;
}
function Je(t, e) {
  return t.length > 0 ? (Te(t, t.length, 0, e), t) : e;
}
const uu = {}.hasOwnProperty;
function Vh(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    My(e, t[n]);
  return e;
}
function My(t, e) {
  let n;
  for (n in e) {
    const i = (uu.call(t, n) ? t[n] : void 0) || (t[n] = {}), o = e[n];
    let s;
    if (o)
      for (s in o) {
        uu.call(i, s) || (i[s] = []);
        const l = o[s];
        Ty(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function Ty(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  Te(t, 0, 0, r);
}
function Hh(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function ot(t) {
  return t.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ae = an(/[A-Za-z]/), Le = an(/[\dA-Za-z]/), Ny = an(/[#-'*+\--9=?A-Z^-~]/);
function ko(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < 32 || t === 127)
  );
}
const ml = an(/\d/), Iy = an(/[\dA-Fa-f]/), Ay = an(/[!-/:-@[-`{-~]/);
function z(t) {
  return t !== null && t < -2;
}
function ne(t) {
  return t !== null && (t < 0 || t === 32);
}
function q(t) {
  return t === -2 || t === -1 || t === 32;
}
const _o = an(new RegExp("\\p{P}|\\p{S}", "u")), zn = an(/\s/);
function an(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function Y(t, e, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return s;
  function s(a) {
    return q(a) ? (t.enter(n), l(a)) : e(a);
  }
  function l(a) {
    return q(a) && o++ < i ? (t.consume(a), l) : (t.exit(n), e(a));
  }
}
const Ey = {
  tokenize: Oy
};
function Oy(t) {
  const e = t.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return e;
  function r(l) {
    if (l === null) {
      t.consume(l);
      return;
    }
    return t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), Y(t, e, "linePrefix");
  }
  function i(l) {
    return t.enter("paragraph"), o(l);
  }
  function o(l) {
    const a = t.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = a), n = a, s(l);
  }
  function s(l) {
    if (l === null) {
      t.exit("chunkText"), t.exit("paragraph"), t.consume(l);
      return;
    }
    return z(l) ? (t.consume(l), t.exit("chunkText"), o) : (t.consume(l), s);
  }
}
const Dy = {
  tokenize: Ry
}, fu = {
  tokenize: vy
};
function Ry(t) {
  const e = this, n = [];
  let r = 0, i, o, s;
  return l;
  function l(C) {
    if (r < n.length) {
      const I = n[r];
      return e.containerState = I[1], t.attempt(I[0].continuation, a, c)(C);
    }
    return c(C);
  }
  function a(C) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && S();
      const I = e.events.length;
      let A = I, x;
      for (; A--; )
        if (e.events[A][0] === "exit" && e.events[A][1].type === "chunkFlow") {
          x = e.events[A][1].end;
          break;
        }
      g(r);
      let R = I;
      for (; R < e.events.length; )
        e.events[R][1].end = {
          ...x
        }, R++;
      return Te(e.events, A + 1, 0, e.events.slice(I)), e.events.length = R, c(C);
    }
    return l(C);
  }
  function c(C) {
    if (r === n.length) {
      if (!i)
        return h(C);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return p(C);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(fu, u, f)(C);
  }
  function u(C) {
    return i && S(), g(r), h(C);
  }
  function f(C) {
    return e.parser.lazy[e.now().line] = r !== n.length, s = e.now().offset, p(C);
  }
  function h(C) {
    return e.containerState = {}, t.attempt(fu, d, p)(C);
  }
  function d(C) {
    return r++, n.push([e.currentConstruct, e.containerState]), h(C);
  }
  function p(C) {
    if (C === null) {
      i && S(), g(0), t.consume(C);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), m(C);
  }
  function m(C) {
    if (C === null) {
      y(t.exit("chunkFlow"), !0), g(0), t.consume(C);
      return;
    }
    return z(C) ? (t.consume(C), y(t.exit("chunkFlow")), r = 0, e.interrupt = void 0, l) : (t.consume(C), m);
  }
  function y(C, I) {
    const A = e.sliceStream(C);
    if (I && A.push(null), C.previous = o, o && (o.next = C), o = C, i.defineSkip(C.start), i.write(A), e.parser.lazy[C.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < s && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > s)
        )
          return;
      const R = e.events.length;
      let O = R, L, w;
      for (; O--; )
        if (e.events[O][0] === "exit" && e.events[O][1].type === "chunkFlow") {
          if (L) {
            w = e.events[O][1].end;
            break;
          }
          L = !0;
        }
      for (g(r), x = R; x < e.events.length; )
        e.events[x][1].end = {
          ...w
        }, x++;
      Te(e.events, O + 1, 0, e.events.slice(R)), e.events.length = x;
    }
  }
  function g(C) {
    let I = n.length;
    for (; I-- > C; ) {
      const A = n[I];
      e.containerState = A[1], A[0].exit.call(e, t);
    }
    n.length = C;
  }
  function S() {
    i.write([null]), o = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function vy(t, e, n) {
  return Y(t, t.attempt(this.parser.constructs.document, e, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function nn(t) {
  if (t === null || ne(t) || zn(t))
    return 1;
  if (_o(t))
    return 2;
}
function yi(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; ) {
    const o = t[i].resolveAll;
    o && !r.includes(o) && (e = o(e, n), r.push(o));
  }
  return e;
}
const gl = {
  name: "attention",
  resolveAll: Ly,
  tokenize: Py
};
function Ly(t, e) {
  let n = -1, r, i, o, s, l, a, c, u;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          a = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...t[r][1].end
          }, h = {
            ...t[n][1].start
          };
          hu(f, -a), hu(h, a), s = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...t[r][1].end
            }
          }, l = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...t[n][1].start
            },
            end: h
          }, o = {
            type: a > 1 ? "strongText" : "emphasisText",
            start: {
              ...t[r][1].end
            },
            end: {
              ...t[n][1].start
            }
          }, i = {
            type: a > 1 ? "strong" : "emphasis",
            start: {
              ...s.start
            },
            end: {
              ...l.end
            }
          }, t[r][1].end = {
            ...s.start
          }, t[n][1].start = {
            ...l.end
          }, c = [], t[r][1].end.offset - t[r][1].start.offset && (c = Je(c, [["enter", t[r][1], e], ["exit", t[r][1], e]])), c = Je(c, [["enter", i, e], ["enter", s, e], ["exit", s, e], ["enter", o, e]]), c = Je(c, yi(e.parser.constructs.insideSpan.null, t.slice(r + 1, n), e)), c = Je(c, [["exit", o, e], ["enter", l, e], ["exit", l, e], ["exit", i, e]]), t[n][1].end.offset - t[n][1].start.offset ? (u = 2, c = Je(c, [["enter", t[n][1], e], ["exit", t[n][1], e]])) : u = 0, Te(t, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function Py(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = nn(r);
  let o;
  return s;
  function s(a) {
    return o = a, t.enter("attentionSequence"), l(a);
  }
  function l(a) {
    if (a === o)
      return t.consume(a), l;
    const c = t.exit("attentionSequence"), u = nn(a), f = !u || u === 2 && i || n.includes(a), h = !i || i === 2 && u || n.includes(r);
    return c._open = !!(o === 42 ? f : f && (i || !h)), c._close = !!(o === 42 ? h : h && (u || !f)), e(a);
  }
}
function hu(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const zy = {
  name: "autolink",
  tokenize: By
};
function By(t, e, n) {
  let r = 0;
  return i;
  function i(d) {
    return t.enter("autolink"), t.enter("autolinkMarker"), t.consume(d), t.exit("autolinkMarker"), t.enter("autolinkProtocol"), o;
  }
  function o(d) {
    return Ae(d) ? (t.consume(d), s) : d === 64 ? n(d) : c(d);
  }
  function s(d) {
    return d === 43 || d === 45 || d === 46 || Le(d) ? (r = 1, l(d)) : c(d);
  }
  function l(d) {
    return d === 58 ? (t.consume(d), r = 0, a) : (d === 43 || d === 45 || d === 46 || Le(d)) && r++ < 32 ? (t.consume(d), l) : (r = 0, c(d));
  }
  function a(d) {
    return d === 62 ? (t.exit("autolinkProtocol"), t.enter("autolinkMarker"), t.consume(d), t.exit("autolinkMarker"), t.exit("autolink"), e) : d === null || d === 32 || d === 60 || ko(d) ? n(d) : (t.consume(d), a);
  }
  function c(d) {
    return d === 64 ? (t.consume(d), u) : Ny(d) ? (t.consume(d), c) : n(d);
  }
  function u(d) {
    return Le(d) ? f(d) : n(d);
  }
  function f(d) {
    return d === 46 ? (t.consume(d), r = 0, u) : d === 62 ? (t.exit("autolinkProtocol").type = "autolinkEmail", t.enter("autolinkMarker"), t.consume(d), t.exit("autolinkMarker"), t.exit("autolink"), e) : h(d);
  }
  function h(d) {
    if ((d === 45 || Le(d)) && r++ < 63) {
      const p = d === 45 ? h : f;
      return t.consume(d), p;
    }
    return n(d);
  }
}
const ki = {
  partial: !0,
  tokenize: Fy
};
function Fy(t, e, n) {
  return r;
  function r(o) {
    return q(o) ? Y(t, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || z(o) ? e(o) : n(o);
  }
}
const Wh = {
  continuation: {
    tokenize: $y
  },
  exit: Vy,
  name: "blockQuote",
  tokenize: _y
};
function _y(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === 62) {
      const l = r.containerState;
      return l.open || (t.enter("blockQuote", {
        _container: !0
      }), l.open = !0), t.enter("blockQuotePrefix"), t.enter("blockQuoteMarker"), t.consume(s), t.exit("blockQuoteMarker"), o;
    }
    return n(s);
  }
  function o(s) {
    return q(s) ? (t.enter("blockQuotePrefixWhitespace"), t.consume(s), t.exit("blockQuotePrefixWhitespace"), t.exit("blockQuotePrefix"), e) : (t.exit("blockQuotePrefix"), e(s));
  }
}
function $y(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return q(s) ? Y(t, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : o(s);
  }
  function o(s) {
    return t.attempt(Wh, e, n)(s);
  }
}
function Vy(t) {
  t.exit("blockQuote");
}
const jh = {
  name: "characterEscape",
  tokenize: Hy
};
function Hy(t, e, n) {
  return r;
  function r(o) {
    return t.enter("characterEscape"), t.enter("escapeMarker"), t.consume(o), t.exit("escapeMarker"), i;
  }
  function i(o) {
    return Ay(o) ? (t.enter("characterEscapeValue"), t.consume(o), t.exit("characterEscapeValue"), t.exit("characterEscape"), e) : n(o);
  }
}
const qh = {
  name: "characterReference",
  tokenize: Wy
};
function Wy(t, e, n) {
  const r = this;
  let i = 0, o, s;
  return l;
  function l(f) {
    return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(f), t.exit("characterReferenceMarker"), a;
  }
  function a(f) {
    return f === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(f), t.exit("characterReferenceMarkerNumeric"), c) : (t.enter("characterReferenceValue"), o = 31, s = Le, u(f));
  }
  function c(f) {
    return f === 88 || f === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(f), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), o = 6, s = Iy, u) : (t.enter("characterReferenceValue"), o = 7, s = ml, u(f));
  }
  function u(f) {
    if (f === 59 && i) {
      const h = t.exit("characterReferenceValue");
      return s === Le && !ca(r.sliceSerialize(h)) ? n(f) : (t.enter("characterReferenceMarker"), t.consume(f), t.exit("characterReferenceMarker"), t.exit("characterReference"), e);
    }
    return s(f) && i++ < o ? (t.consume(f), u) : n(f);
  }
}
const du = {
  partial: !0,
  tokenize: qy
}, pu = {
  concrete: !0,
  name: "codeFenced",
  tokenize: jy
};
function jy(t, e, n) {
  const r = this, i = {
    partial: !0,
    tokenize: A
  };
  let o = 0, s = 0, l;
  return a;
  function a(x) {
    return c(x);
  }
  function c(x) {
    const R = r.events[r.events.length - 1];
    return o = R && R[1].type === "linePrefix" ? R[2].sliceSerialize(R[1], !0).length : 0, l = x, t.enter("codeFenced"), t.enter("codeFencedFence"), t.enter("codeFencedFenceSequence"), u(x);
  }
  function u(x) {
    return x === l ? (s++, t.consume(x), u) : s < 3 ? n(x) : (t.exit("codeFencedFenceSequence"), q(x) ? Y(t, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || z(x) ? (t.exit("codeFencedFence"), r.interrupt ? e(x) : t.check(du, m, I)(x)) : (t.enter("codeFencedFenceInfo"), t.enter("chunkString", {
      contentType: "string"
    }), h(x));
  }
  function h(x) {
    return x === null || z(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), f(x)) : q(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), Y(t, d, "whitespace")(x)) : x === 96 && x === l ? n(x) : (t.consume(x), h);
  }
  function d(x) {
    return x === null || z(x) ? f(x) : (t.enter("codeFencedFenceMeta"), t.enter("chunkString", {
      contentType: "string"
    }), p(x));
  }
  function p(x) {
    return x === null || z(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceMeta"), f(x)) : x === 96 && x === l ? n(x) : (t.consume(x), p);
  }
  function m(x) {
    return t.attempt(i, I, y)(x);
  }
  function y(x) {
    return t.enter("lineEnding"), t.consume(x), t.exit("lineEnding"), g;
  }
  function g(x) {
    return o > 0 && q(x) ? Y(t, S, "linePrefix", o + 1)(x) : S(x);
  }
  function S(x) {
    return x === null || z(x) ? t.check(du, m, I)(x) : (t.enter("codeFlowValue"), C(x));
  }
  function C(x) {
    return x === null || z(x) ? (t.exit("codeFlowValue"), S(x)) : (t.consume(x), C);
  }
  function I(x) {
    return t.exit("codeFenced"), e(x);
  }
  function A(x, R, O) {
    let L = 0;
    return w;
    function w(j) {
      return x.enter("lineEnding"), x.consume(j), x.exit("lineEnding"), v;
    }
    function v(j) {
      return x.enter("codeFencedFence"), q(j) ? Y(x, P, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(j) : P(j);
    }
    function P(j) {
      return j === l ? (x.enter("codeFencedFenceSequence"), Z(j)) : O(j);
    }
    function Z(j) {
      return j === l ? (L++, x.consume(j), Z) : L >= s ? (x.exit("codeFencedFenceSequence"), q(j) ? Y(x, X, "whitespace")(j) : X(j)) : O(j);
    }
    function X(j) {
      return j === null || z(j) ? (x.exit("codeFencedFence"), R(j)) : O(j);
    }
  }
}
function qy(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
const ks = {
  name: "codeIndented",
  tokenize: Uy
}, Ky = {
  partial: !0,
  tokenize: Jy
};
function Uy(t, e, n) {
  const r = this;
  return i;
  function i(c) {
    return t.enter("codeIndented"), Y(t, o, "linePrefix", 5)(c);
  }
  function o(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? s(c) : n(c);
  }
  function s(c) {
    return c === null ? a(c) : z(c) ? t.attempt(Ky, s, a)(c) : (t.enter("codeFlowValue"), l(c));
  }
  function l(c) {
    return c === null || z(c) ? (t.exit("codeFlowValue"), s(c)) : (t.consume(c), l);
  }
  function a(c) {
    return t.exit("codeIndented"), e(c);
  }
}
function Jy(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : z(s) ? (t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), i) : Y(t, o, "linePrefix", 5)(s);
  }
  function o(s) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? e(s) : z(s) ? i(s) : n(s);
  }
}
const Gy = {
  name: "codeText",
  previous: Qy,
  resolve: Yy,
  tokenize: Xy
};
function Yy(t) {
  let e = t.length - 4, n = 3, r, i;
  if ((t[n][1].type === "lineEnding" || t[n][1].type === "space") && (t[e][1].type === "lineEnding" || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === "codeTextData") {
        t[n][1].type = "codeTextPadding", t[e][1].type = "codeTextPadding", n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && t[r][1].type !== "lineEnding" && (i = r) : (r === e || t[r][1].type === "lineEnding") && (t[i][1].type = "codeTextData", r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return t;
}
function Qy(t) {
  return t !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Xy(t, e, n) {
  let r = 0, i, o;
  return s;
  function s(f) {
    return t.enter("codeText"), t.enter("codeTextSequence"), l(f);
  }
  function l(f) {
    return f === 96 ? (t.consume(f), r++, l) : (t.exit("codeTextSequence"), a(f));
  }
  function a(f) {
    return f === null ? n(f) : f === 32 ? (t.enter("space"), t.consume(f), t.exit("space"), a) : f === 96 ? (o = t.enter("codeTextSequence"), i = 0, u(f)) : z(f) ? (t.enter("lineEnding"), t.consume(f), t.exit("lineEnding"), a) : (t.enter("codeTextData"), c(f));
  }
  function c(f) {
    return f === null || f === 32 || f === 96 || z(f) ? (t.exit("codeTextData"), a(f)) : (t.consume(f), c);
  }
  function u(f) {
    return f === 96 ? (t.consume(f), i++, u) : i === r ? (t.exit("codeTextSequence"), t.exit("codeText"), e(f)) : (o.type = "codeTextData", c(f));
  }
}
class Zy {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(e) {
    this.left = e ? [...e] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(e, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(e, r) : e > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(e, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(e));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Ir(this.left, r), o.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), Ir(this.left, e);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(e) {
    this.setCursor(0), this.right.push(e);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(e) {
    this.setCursor(0), Ir(this.right, e.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(e) {
    if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0))
      if (e < this.left.length) {
        const n = this.left.splice(e, Number.POSITIVE_INFINITY);
        Ir(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        Ir(this.left, n.reverse());
      }
  }
}
function Ir(t, e) {
  let n = 0;
  if (e.length < 1e4)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(...e.slice(n, n + 1e4)), n += 1e4;
}
function Kh(t) {
  const e = {};
  let n = -1, r, i, o, s, l, a, c;
  const u = new Zy(t);
  for (; ++n < u.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (a = r[1]._tokenizer.events, o = 0, o < a.length && a[o][1].type === "lineEndingBlank" && (o += 2), o < a.length && a[o][1].type === "content"))
      for (; ++o < a.length && a[o][1].type !== "content"; )
        a[o][1].type === "chunkText" && (a[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, ek(u, n)), n = e[n], c = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (s = u.get(o), s[1].type === "lineEnding" || s[1].type === "lineEndingBlank")
          s[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), s[1].type = "lineEnding", i = o);
        else if (!(s[1].type === "linePrefix" || s[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, l = u.slice(i, n), l.unshift(r), u.splice(i, n - i + 1, l));
    }
  }
  return Te(t, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function ek(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const o = [];
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const l = s.events, a = [], c = {};
  let u, f, h = -1, d = n, p = 0, m = 0;
  const y = [m];
  for (; d; ) {
    for (; t.get(++i)[1] !== d; )
      ;
    o.push(i), d._tokenizer || (u = r.sliceStream(d), d.next || u.push(null), f && s.defineSkip(d.start), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), f = d, d = d.next;
  }
  for (d = n; ++h < l.length; )
    // Find a void token that includes a break.
    l[h][0] === "exit" && l[h - 1][0] === "enter" && l[h][1].type === l[h - 1][1].type && l[h][1].start.line !== l[h][1].end.line && (m = h + 1, y.push(m), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (s.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : y.pop(), h = y.length; h--; ) {
    const g = l.slice(y[h], y[h + 1]), S = o.pop();
    a.push([S, S + g.length - 1]), t.splice(S, 2, g);
  }
  for (a.reverse(), h = -1; ++h < a.length; )
    c[p + a[h][0]] = p + a[h][1], p += a[h][1] - a[h][0] - 1;
  return c;
}
const tk = {
  resolve: rk,
  tokenize: ik
}, nk = {
  partial: !0,
  tokenize: ok
};
function rk(t) {
  return Kh(t), t;
}
function ik(t, e) {
  let n;
  return r;
  function r(l) {
    return t.enter("content"), n = t.enter("chunkContent", {
      contentType: "content"
    }), i(l);
  }
  function i(l) {
    return l === null ? o(l) : z(l) ? t.check(nk, s, o)(l) : (t.consume(l), i);
  }
  function o(l) {
    return t.exit("chunkContent"), t.exit("content"), e(l);
  }
  function s(l) {
    return t.consume(l), t.exit("chunkContent"), n.next = t.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function ok(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return t.exit("chunkContent"), t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), Y(t, o, "linePrefix");
  }
  function o(s) {
    if (s === null || z(s))
      return n(s);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? e(s) : t.interrupt(r.parser.constructs.flow, n, e)(s);
  }
}
function Uh(t, e, n, r, i, o, s, l, a) {
  const c = a || Number.POSITIVE_INFINITY;
  let u = 0;
  return f;
  function f(g) {
    return g === 60 ? (t.enter(r), t.enter(i), t.enter(o), t.consume(g), t.exit(o), h) : g === null || g === 32 || g === 41 || ko(g) ? n(g) : (t.enter(r), t.enter(s), t.enter(l), t.enter("chunkString", {
      contentType: "string"
    }), m(g));
  }
  function h(g) {
    return g === 62 ? (t.enter(o), t.consume(g), t.exit(o), t.exit(i), t.exit(r), e) : (t.enter(l), t.enter("chunkString", {
      contentType: "string"
    }), d(g));
  }
  function d(g) {
    return g === 62 ? (t.exit("chunkString"), t.exit(l), h(g)) : g === null || g === 60 || z(g) ? n(g) : (t.consume(g), g === 92 ? p : d);
  }
  function p(g) {
    return g === 60 || g === 62 || g === 92 ? (t.consume(g), d) : d(g);
  }
  function m(g) {
    return !u && (g === null || g === 41 || ne(g)) ? (t.exit("chunkString"), t.exit(l), t.exit(s), t.exit(r), e(g)) : u < c && g === 40 ? (t.consume(g), u++, m) : g === 41 ? (t.consume(g), u--, m) : g === null || g === 32 || g === 40 || ko(g) ? n(g) : (t.consume(g), g === 92 ? y : m);
  }
  function y(g) {
    return g === 40 || g === 41 || g === 92 ? (t.consume(g), m) : m(g);
  }
}
function Jh(t, e, n, r, i, o) {
  const s = this;
  let l = 0, a;
  return c;
  function c(d) {
    return t.enter(r), t.enter(i), t.consume(d), t.exit(i), t.enter(o), u;
  }
  function u(d) {
    return l > 999 || d === null || d === 91 || d === 93 && !a || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === 94 && !l && "_hiddenFootnoteSupport" in s.parser.constructs ? n(d) : d === 93 ? (t.exit(o), t.enter(i), t.consume(d), t.exit(i), t.exit(r), e) : z(d) ? (t.enter("lineEnding"), t.consume(d), t.exit("lineEnding"), u) : (t.enter("chunkString", {
      contentType: "string"
    }), f(d));
  }
  function f(d) {
    return d === null || d === 91 || d === 93 || z(d) || l++ > 999 ? (t.exit("chunkString"), u(d)) : (t.consume(d), a || (a = !q(d)), d === 92 ? h : f);
  }
  function h(d) {
    return d === 91 || d === 92 || d === 93 ? (t.consume(d), l++, f) : f(d);
  }
}
function Gh(t, e, n, r, i, o) {
  let s;
  return l;
  function l(h) {
    return h === 34 || h === 39 || h === 40 ? (t.enter(r), t.enter(i), t.consume(h), t.exit(i), s = h === 40 ? 41 : h, a) : n(h);
  }
  function a(h) {
    return h === s ? (t.enter(i), t.consume(h), t.exit(i), t.exit(r), e) : (t.enter(o), c(h));
  }
  function c(h) {
    return h === s ? (t.exit(o), a(s)) : h === null ? n(h) : z(h) ? (t.enter("lineEnding"), t.consume(h), t.exit("lineEnding"), Y(t, c, "linePrefix")) : (t.enter("chunkString", {
      contentType: "string"
    }), u(h));
  }
  function u(h) {
    return h === s || h === null || z(h) ? (t.exit("chunkString"), c(h)) : (t.consume(h), h === 92 ? f : u);
  }
  function f(h) {
    return h === s || h === 92 ? (t.consume(h), u) : u(h);
  }
}
function qr(t, e) {
  let n;
  return r;
  function r(i) {
    return z(i) ? (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), n = !0, r) : q(i) ? Y(t, r, n ? "linePrefix" : "lineSuffix")(i) : e(i);
  }
}
const sk = {
  name: "definition",
  tokenize: ak
}, lk = {
  partial: !0,
  tokenize: ck
};
function ak(t, e, n) {
  const r = this;
  let i;
  return o;
  function o(d) {
    return t.enter("definition"), s(d);
  }
  function s(d) {
    return Jh.call(
      r,
      t,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(d);
  }
  function l(d) {
    return i = ot(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), d === 58 ? (t.enter("definitionMarker"), t.consume(d), t.exit("definitionMarker"), a) : n(d);
  }
  function a(d) {
    return ne(d) ? qr(t, c)(d) : c(d);
  }
  function c(d) {
    return Uh(
      t,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(d);
  }
  function u(d) {
    return t.attempt(lk, f, f)(d);
  }
  function f(d) {
    return q(d) ? Y(t, h, "whitespace")(d) : h(d);
  }
  function h(d) {
    return d === null || z(d) ? (t.exit("definition"), r.parser.defined.push(i), e(d)) : n(d);
  }
}
function ck(t, e, n) {
  return r;
  function r(l) {
    return ne(l) ? qr(t, i)(l) : n(l);
  }
  function i(l) {
    return Gh(t, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function o(l) {
    return q(l) ? Y(t, s, "whitespace")(l) : s(l);
  }
  function s(l) {
    return l === null || z(l) ? e(l) : n(l);
  }
}
const uk = {
  name: "hardBreakEscape",
  tokenize: fk
};
function fk(t, e, n) {
  return r;
  function r(o) {
    return t.enter("hardBreakEscape"), t.consume(o), i;
  }
  function i(o) {
    return z(o) ? (t.exit("hardBreakEscape"), e(o)) : n(o);
  }
}
const hk = {
  name: "headingAtx",
  resolve: dk,
  tokenize: pk
};
function dk(t, e) {
  let n = t.length - 2, r = 3, i, o;
  return t[r][1].type === "whitespace" && (r += 2), n - 2 > r && t[n][1].type === "whitespace" && (n -= 2), t[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && t[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: t[r][1].start,
    end: t[n][1].end
  }, o = {
    type: "chunkText",
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: "text"
  }, Te(t, r, n - r + 1, [["enter", i, e], ["enter", o, e], ["exit", o, e], ["exit", i, e]])), t;
}
function pk(t, e, n) {
  let r = 0;
  return i;
  function i(u) {
    return t.enter("atxHeading"), o(u);
  }
  function o(u) {
    return t.enter("atxHeadingSequence"), s(u);
  }
  function s(u) {
    return u === 35 && r++ < 6 ? (t.consume(u), s) : u === null || ne(u) ? (t.exit("atxHeadingSequence"), l(u)) : n(u);
  }
  function l(u) {
    return u === 35 ? (t.enter("atxHeadingSequence"), a(u)) : u === null || z(u) ? (t.exit("atxHeading"), e(u)) : q(u) ? Y(t, l, "whitespace")(u) : (t.enter("atxHeadingText"), c(u));
  }
  function a(u) {
    return u === 35 ? (t.consume(u), a) : (t.exit("atxHeadingSequence"), l(u));
  }
  function c(u) {
    return u === null || u === 35 || ne(u) ? (t.exit("atxHeadingText"), l(u)) : (t.consume(u), c);
  }
}
const mk = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], mu = ["pre", "script", "style", "textarea"], gk = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: bk,
  tokenize: wk
}, yk = {
  partial: !0,
  tokenize: Ck
}, kk = {
  partial: !0,
  tokenize: xk
};
function bk(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && t[e - 2][1].type === "linePrefix" && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function wk(t, e, n) {
  const r = this;
  let i, o, s, l, a;
  return c;
  function c(b) {
    return u(b);
  }
  function u(b) {
    return t.enter("htmlFlow"), t.enter("htmlFlowData"), t.consume(b), f;
  }
  function f(b) {
    return b === 33 ? (t.consume(b), h) : b === 47 ? (t.consume(b), o = !0, m) : b === 63 ? (t.consume(b), i = 3, r.interrupt ? e : k) : Ae(b) ? (t.consume(b), s = String.fromCharCode(b), y) : n(b);
  }
  function h(b) {
    return b === 45 ? (t.consume(b), i = 2, d) : b === 91 ? (t.consume(b), i = 5, l = 0, p) : Ae(b) ? (t.consume(b), i = 4, r.interrupt ? e : k) : n(b);
  }
  function d(b) {
    return b === 45 ? (t.consume(b), r.interrupt ? e : k) : n(b);
  }
  function p(b) {
    const nt = "CDATA[";
    return b === nt.charCodeAt(l++) ? (t.consume(b), l === nt.length ? r.interrupt ? e : P : p) : n(b);
  }
  function m(b) {
    return Ae(b) ? (t.consume(b), s = String.fromCharCode(b), y) : n(b);
  }
  function y(b) {
    if (b === null || b === 47 || b === 62 || ne(b)) {
      const nt = b === 47, mn = s.toLowerCase();
      return !nt && !o && mu.includes(mn) ? (i = 1, r.interrupt ? e(b) : P(b)) : mk.includes(s.toLowerCase()) ? (i = 6, nt ? (t.consume(b), g) : r.interrupt ? e(b) : P(b)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(b) : o ? S(b) : C(b));
    }
    return b === 45 || Le(b) ? (t.consume(b), s += String.fromCharCode(b), y) : n(b);
  }
  function g(b) {
    return b === 62 ? (t.consume(b), r.interrupt ? e : P) : n(b);
  }
  function S(b) {
    return q(b) ? (t.consume(b), S) : w(b);
  }
  function C(b) {
    return b === 47 ? (t.consume(b), w) : b === 58 || b === 95 || Ae(b) ? (t.consume(b), I) : q(b) ? (t.consume(b), C) : w(b);
  }
  function I(b) {
    return b === 45 || b === 46 || b === 58 || b === 95 || Le(b) ? (t.consume(b), I) : A(b);
  }
  function A(b) {
    return b === 61 ? (t.consume(b), x) : q(b) ? (t.consume(b), A) : C(b);
  }
  function x(b) {
    return b === null || b === 60 || b === 61 || b === 62 || b === 96 ? n(b) : b === 34 || b === 39 ? (t.consume(b), a = b, R) : q(b) ? (t.consume(b), x) : O(b);
  }
  function R(b) {
    return b === a ? (t.consume(b), a = null, L) : b === null || z(b) ? n(b) : (t.consume(b), R);
  }
  function O(b) {
    return b === null || b === 34 || b === 39 || b === 47 || b === 60 || b === 61 || b === 62 || b === 96 || ne(b) ? A(b) : (t.consume(b), O);
  }
  function L(b) {
    return b === 47 || b === 62 || q(b) ? C(b) : n(b);
  }
  function w(b) {
    return b === 62 ? (t.consume(b), v) : n(b);
  }
  function v(b) {
    return b === null || z(b) ? P(b) : q(b) ? (t.consume(b), v) : n(b);
  }
  function P(b) {
    return b === 45 && i === 2 ? (t.consume(b), ce) : b === 60 && i === 1 ? (t.consume(b), ie) : b === 62 && i === 4 ? (t.consume(b), tt) : b === 63 && i === 3 ? (t.consume(b), k) : b === 93 && i === 5 ? (t.consume(b), pe) : z(b) && (i === 6 || i === 7) ? (t.exit("htmlFlowData"), t.check(yk, St, Z)(b)) : b === null || z(b) ? (t.exit("htmlFlowData"), Z(b)) : (t.consume(b), P);
  }
  function Z(b) {
    return t.check(kk, X, St)(b);
  }
  function X(b) {
    return t.enter("lineEnding"), t.consume(b), t.exit("lineEnding"), j;
  }
  function j(b) {
    return b === null || z(b) ? Z(b) : (t.enter("htmlFlowData"), P(b));
  }
  function ce(b) {
    return b === 45 ? (t.consume(b), k) : P(b);
  }
  function ie(b) {
    return b === 47 ? (t.consume(b), s = "", ae) : P(b);
  }
  function ae(b) {
    if (b === 62) {
      const nt = s.toLowerCase();
      return mu.includes(nt) ? (t.consume(b), tt) : P(b);
    }
    return Ae(b) && s.length < 8 ? (t.consume(b), s += String.fromCharCode(b), ae) : P(b);
  }
  function pe(b) {
    return b === 93 ? (t.consume(b), k) : P(b);
  }
  function k(b) {
    return b === 62 ? (t.consume(b), tt) : b === 45 && i === 2 ? (t.consume(b), k) : P(b);
  }
  function tt(b) {
    return b === null || z(b) ? (t.exit("htmlFlowData"), St(b)) : (t.consume(b), tt);
  }
  function St(b) {
    return t.exit("htmlFlow"), e(b);
  }
}
function xk(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return z(s) ? (t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), o) : n(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
function Ck(t, e, n) {
  return r;
  function r(i) {
    return t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), t.attempt(ki, e, n);
  }
}
const Sk = {
  name: "htmlText",
  tokenize: Mk
};
function Mk(t, e, n) {
  const r = this;
  let i, o, s;
  return l;
  function l(k) {
    return t.enter("htmlText"), t.enter("htmlTextData"), t.consume(k), a;
  }
  function a(k) {
    return k === 33 ? (t.consume(k), c) : k === 47 ? (t.consume(k), A) : k === 63 ? (t.consume(k), C) : Ae(k) ? (t.consume(k), O) : n(k);
  }
  function c(k) {
    return k === 45 ? (t.consume(k), u) : k === 91 ? (t.consume(k), o = 0, p) : Ae(k) ? (t.consume(k), S) : n(k);
  }
  function u(k) {
    return k === 45 ? (t.consume(k), d) : n(k);
  }
  function f(k) {
    return k === null ? n(k) : k === 45 ? (t.consume(k), h) : z(k) ? (s = f, ie(k)) : (t.consume(k), f);
  }
  function h(k) {
    return k === 45 ? (t.consume(k), d) : f(k);
  }
  function d(k) {
    return k === 62 ? ce(k) : k === 45 ? h(k) : f(k);
  }
  function p(k) {
    const tt = "CDATA[";
    return k === tt.charCodeAt(o++) ? (t.consume(k), o === tt.length ? m : p) : n(k);
  }
  function m(k) {
    return k === null ? n(k) : k === 93 ? (t.consume(k), y) : z(k) ? (s = m, ie(k)) : (t.consume(k), m);
  }
  function y(k) {
    return k === 93 ? (t.consume(k), g) : m(k);
  }
  function g(k) {
    return k === 62 ? ce(k) : k === 93 ? (t.consume(k), g) : m(k);
  }
  function S(k) {
    return k === null || k === 62 ? ce(k) : z(k) ? (s = S, ie(k)) : (t.consume(k), S);
  }
  function C(k) {
    return k === null ? n(k) : k === 63 ? (t.consume(k), I) : z(k) ? (s = C, ie(k)) : (t.consume(k), C);
  }
  function I(k) {
    return k === 62 ? ce(k) : C(k);
  }
  function A(k) {
    return Ae(k) ? (t.consume(k), x) : n(k);
  }
  function x(k) {
    return k === 45 || Le(k) ? (t.consume(k), x) : R(k);
  }
  function R(k) {
    return z(k) ? (s = R, ie(k)) : q(k) ? (t.consume(k), R) : ce(k);
  }
  function O(k) {
    return k === 45 || Le(k) ? (t.consume(k), O) : k === 47 || k === 62 || ne(k) ? L(k) : n(k);
  }
  function L(k) {
    return k === 47 ? (t.consume(k), ce) : k === 58 || k === 95 || Ae(k) ? (t.consume(k), w) : z(k) ? (s = L, ie(k)) : q(k) ? (t.consume(k), L) : ce(k);
  }
  function w(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || Le(k) ? (t.consume(k), w) : v(k);
  }
  function v(k) {
    return k === 61 ? (t.consume(k), P) : z(k) ? (s = v, ie(k)) : q(k) ? (t.consume(k), v) : L(k);
  }
  function P(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96 ? n(k) : k === 34 || k === 39 ? (t.consume(k), i = k, Z) : z(k) ? (s = P, ie(k)) : q(k) ? (t.consume(k), P) : (t.consume(k), X);
  }
  function Z(k) {
    return k === i ? (t.consume(k), i = void 0, j) : k === null ? n(k) : z(k) ? (s = Z, ie(k)) : (t.consume(k), Z);
  }
  function X(k) {
    return k === null || k === 34 || k === 39 || k === 60 || k === 61 || k === 96 ? n(k) : k === 47 || k === 62 || ne(k) ? L(k) : (t.consume(k), X);
  }
  function j(k) {
    return k === 47 || k === 62 || ne(k) ? L(k) : n(k);
  }
  function ce(k) {
    return k === 62 ? (t.consume(k), t.exit("htmlTextData"), t.exit("htmlText"), e) : n(k);
  }
  function ie(k) {
    return t.exit("htmlTextData"), t.enter("lineEnding"), t.consume(k), t.exit("lineEnding"), ae;
  }
  function ae(k) {
    return q(k) ? Y(t, pe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : pe(k);
  }
  function pe(k) {
    return t.enter("htmlTextData"), s(k);
  }
}
const ua = {
  name: "labelEnd",
  resolveAll: Ak,
  resolveTo: Ek,
  tokenize: Ok
}, Tk = {
  tokenize: Dk
}, Nk = {
  tokenize: Rk
}, Ik = {
  tokenize: vk
};
function Ak(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", e += i;
    }
  }
  return t.length !== n.length && Te(t, 0, t.length, n), t;
}
function Ek(t, e) {
  let n = t.length, r = 0, i, o, s, l;
  for (; n--; )
    if (i = t[n][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      t[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (s) {
      if (t[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (s = n);
  const a = {
    type: t[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...t[o][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  }, c = {
    type: "label",
    start: {
      ...t[o][1].start
    },
    end: {
      ...t[s][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...t[o + r + 2][1].end
    },
    end: {
      ...t[s - 2][1].start
    }
  };
  return l = [["enter", a, e], ["enter", c, e]], l = Je(l, t.slice(o + 1, o + r + 3)), l = Je(l, [["enter", u, e]]), l = Je(l, yi(e.parser.constructs.insideSpan.null, t.slice(o + r + 4, s - 3), e)), l = Je(l, [["exit", u, e], t[s - 2], t[s - 1], ["exit", c, e]]), l = Je(l, t.slice(s + 1)), l = Je(l, [["exit", a, e]]), Te(t, o, t.length, l), t;
}
function Ok(t, e, n) {
  const r = this;
  let i = r.events.length, o, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return l;
  function l(h) {
    return o ? o._inactive ? f(h) : (s = r.parser.defined.includes(ot(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), t.enter("labelEnd"), t.enter("labelMarker"), t.consume(h), t.exit("labelMarker"), t.exit("labelEnd"), a) : n(h);
  }
  function a(h) {
    return h === 40 ? t.attempt(Tk, u, s ? u : f)(h) : h === 91 ? t.attempt(Nk, u, s ? c : f)(h) : s ? u(h) : f(h);
  }
  function c(h) {
    return t.attempt(Ik, u, f)(h);
  }
  function u(h) {
    return e(h);
  }
  function f(h) {
    return o._balanced = !0, n(h);
  }
}
function Dk(t, e, n) {
  return r;
  function r(f) {
    return t.enter("resource"), t.enter("resourceMarker"), t.consume(f), t.exit("resourceMarker"), i;
  }
  function i(f) {
    return ne(f) ? qr(t, o)(f) : o(f);
  }
  function o(f) {
    return f === 41 ? u(f) : Uh(t, s, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function s(f) {
    return ne(f) ? qr(t, a)(f) : u(f);
  }
  function l(f) {
    return n(f);
  }
  function a(f) {
    return f === 34 || f === 39 || f === 40 ? Gh(t, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : u(f);
  }
  function c(f) {
    return ne(f) ? qr(t, u)(f) : u(f);
  }
  function u(f) {
    return f === 41 ? (t.enter("resourceMarker"), t.consume(f), t.exit("resourceMarker"), t.exit("resource"), e) : n(f);
  }
}
function Rk(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return Jh.call(r, t, o, s, "reference", "referenceMarker", "referenceString")(l);
  }
  function o(l) {
    return r.parser.defined.includes(ot(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? e(l) : n(l);
  }
  function s(l) {
    return n(l);
  }
}
function vk(t, e, n) {
  return r;
  function r(o) {
    return t.enter("reference"), t.enter("referenceMarker"), t.consume(o), t.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (t.enter("referenceMarker"), t.consume(o), t.exit("referenceMarker"), t.exit("reference"), e) : n(o);
  }
}
const Lk = {
  name: "labelStartImage",
  resolveAll: ua.resolveAll,
  tokenize: Pk
};
function Pk(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return t.enter("labelImage"), t.enter("labelImageMarker"), t.consume(l), t.exit("labelImageMarker"), o;
  }
  function o(l) {
    return l === 91 ? (t.enter("labelMarker"), t.consume(l), t.exit("labelMarker"), t.exit("labelImage"), s) : n(l);
  }
  function s(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : e(l);
  }
}
const zk = {
  name: "labelStartLink",
  resolveAll: ua.resolveAll,
  tokenize: Bk
};
function Bk(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return t.enter("labelLink"), t.enter("labelMarker"), t.consume(s), t.exit("labelMarker"), t.exit("labelLink"), o;
  }
  function o(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : e(s);
  }
}
const bs = {
  name: "lineEnding",
  tokenize: Fk
};
function Fk(t, e) {
  return n;
  function n(r) {
    return t.enter("lineEnding"), t.consume(r), t.exit("lineEnding"), Y(t, e, "linePrefix");
  }
}
const Ki = {
  name: "thematicBreak",
  tokenize: _k
};
function _k(t, e, n) {
  let r = 0, i;
  return o;
  function o(c) {
    return t.enter("thematicBreak"), s(c);
  }
  function s(c) {
    return i = c, l(c);
  }
  function l(c) {
    return c === i ? (t.enter("thematicBreakSequence"), a(c)) : r >= 3 && (c === null || z(c)) ? (t.exit("thematicBreak"), e(c)) : n(c);
  }
  function a(c) {
    return c === i ? (t.consume(c), r++, a) : (t.exit("thematicBreakSequence"), q(c) ? Y(t, l, "whitespace")(c) : l(c));
  }
}
const ve = {
  continuation: {
    tokenize: Wk
  },
  exit: qk,
  name: "list",
  tokenize: Hk
}, $k = {
  partial: !0,
  tokenize: Kk
}, Vk = {
  partial: !0,
  tokenize: jk
};
function Hk(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return l;
  function l(d) {
    const p = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (p === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : ml(d)) {
      if (r.containerState.type || (r.containerState.type = p, t.enter(p, {
        _container: !0
      })), p === "listUnordered")
        return t.enter("listItemPrefix"), d === 42 || d === 45 ? t.check(Ki, n, c)(d) : c(d);
      if (!r.interrupt || d === 49)
        return t.enter("listItemPrefix"), t.enter("listItemValue"), a(d);
    }
    return n(d);
  }
  function a(d) {
    return ml(d) && ++s < 10 ? (t.consume(d), a) : (!r.interrupt || s < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (t.exit("listItemValue"), c(d)) : n(d);
  }
  function c(d) {
    return t.enter("listItemMarker"), t.consume(d), t.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, t.check(
      ki,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      t.attempt($k, h, f)
    );
  }
  function u(d) {
    return r.containerState.initialBlankLine = !0, o++, h(d);
  }
  function f(d) {
    return q(d) ? (t.enter("listItemPrefixWhitespace"), t.consume(d), t.exit("listItemPrefixWhitespace"), h) : n(d);
  }
  function h(d) {
    return r.containerState.size = o + r.sliceSerialize(t.exit("listItemPrefix"), !0).length, e(d);
  }
}
function Wk(t, e, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, t.check(ki, i, o);
  function i(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Y(t, e, "listItemIndent", r.containerState.size + 1)(l);
  }
  function o(l) {
    return r.containerState.furtherBlankLines || !q(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(Vk, e, s)(l));
  }
  function s(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, Y(t, t.attempt(ve, e, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function jk(t, e, n) {
  const r = this;
  return Y(t, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? e(o) : n(o);
  }
}
function qk(t) {
  t.exit(this.containerState.type);
}
function Kk(t, e, n) {
  const r = this;
  return Y(t, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return !q(o) && s && s[1].type === "listItemPrefixWhitespace" ? e(o) : n(o);
  }
}
const gu = {
  name: "setextUnderline",
  resolveTo: Uk,
  tokenize: Jk
};
function Uk(t, e) {
  let n = t.length, r, i, o;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === "content") {
        r = n;
        break;
      }
      t[n][1].type === "paragraph" && (i = n);
    } else
      t[n][1].type === "content" && t.splice(n, 1), !o && t[n][1].type === "definition" && (o = n);
  const s = {
    type: "setextHeading",
    start: {
      ...t[r][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  };
  return t[i][1].type = "setextHeadingText", o ? (t.splice(i, 0, ["enter", s, e]), t.splice(o + 1, 0, ["exit", t[r][1], e]), t[r][1].end = {
    ...t[o][1].end
  }) : t[r][1] = s, t.push(["exit", s, e]), t;
}
function Jk(t, e, n) {
  const r = this;
  let i;
  return o;
  function o(c) {
    let u = r.events.length, f;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        f = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (t.enter("setextHeadingLine"), i = c, s(c)) : n(c);
  }
  function s(c) {
    return t.enter("setextHeadingLineSequence"), l(c);
  }
  function l(c) {
    return c === i ? (t.consume(c), l) : (t.exit("setextHeadingLineSequence"), q(c) ? Y(t, a, "lineSuffix")(c) : a(c));
  }
  function a(c) {
    return c === null || z(c) ? (t.exit("setextHeadingLine"), e(c)) : n(c);
  }
}
const Gk = {
  tokenize: Yk
};
function Yk(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    ki,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(this.parser.constructs.flowInitial, i, Y(t, t.attempt(this.parser.constructs.flow, i, t.attempt(tk, i)), "linePrefix"))
  );
  return n;
  function r(o) {
    if (o === null) {
      t.consume(o);
      return;
    }
    return t.enter("lineEndingBlank"), t.consume(o), t.exit("lineEndingBlank"), e.currentConstruct = void 0, n;
  }
  function i(o) {
    if (o === null) {
      t.consume(o);
      return;
    }
    return t.enter("lineEnding"), t.consume(o), t.exit("lineEnding"), e.currentConstruct = void 0, n;
  }
}
const Qk = {
  resolveAll: Qh()
}, Xk = Yh("string"), Zk = Yh("text");
function Yh(t) {
  return {
    resolveAll: Qh(t === "text" ? eb : void 0),
    tokenize: e
  };
  function e(n) {
    const r = this, i = this.parser.constructs[t], o = n.attempt(i, s, l);
    return s;
    function s(u) {
      return c(u) ? o(u) : l(u);
    }
    function l(u) {
      if (u === null) {
        n.consume(u);
        return;
      }
      return n.enter("data"), n.consume(u), a;
    }
    function a(u) {
      return c(u) ? (n.exit("data"), o(u)) : (n.consume(u), a);
    }
    function c(u) {
      if (u === null)
        return !0;
      const f = i[u];
      let h = -1;
      if (f)
        for (; ++h < f.length; ) {
          const d = f[h];
          if (!d.previous || d.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Qh(t) {
  return e;
  function e(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; )
      o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return t ? t(n, r) : n;
  }
}
function eb(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === "lineEnding") && t[n - 1][1].type === "data") {
      const r = t[n - 1][1], i = e.sliceStream(r);
      let o = i.length, s = -1, l = 0, a;
      for (; o--; ) {
        const c = i[o];
        if (typeof c == "string") {
          for (s = c.length; c.charCodeAt(s - 1) === 32; )
            l++, s--;
          if (s) break;
          s = -1;
        } else if (c === -2)
          a = !0, l++;
        else if (c !== -1) {
          o++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (l = 0), l) {
        const c = {
          type: n === t.length || a || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: o ? s : r.start._bufferIndex + s,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - l,
            offset: r.end.offset - l
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...c.start
        }, r.start.offset === r.end.offset ? Object.assign(r, c) : (t.splice(n, 0, ["enter", c, e], ["exit", c, e]), n += 2);
      }
      n++;
    }
  return t;
}
const tb = {
  42: ve,
  43: ve,
  45: ve,
  48: ve,
  49: ve,
  50: ve,
  51: ve,
  52: ve,
  53: ve,
  54: ve,
  55: ve,
  56: ve,
  57: ve,
  62: Wh
}, nb = {
  91: sk
}, rb = {
  [-2]: ks,
  [-1]: ks,
  32: ks
}, ib = {
  35: hk,
  42: Ki,
  45: [gu, Ki],
  60: gk,
  61: gu,
  95: Ki,
  96: pu,
  126: pu
}, ob = {
  38: qh,
  92: jh
}, sb = {
  [-5]: bs,
  [-4]: bs,
  [-3]: bs,
  33: Lk,
  38: qh,
  42: gl,
  60: [zy, Sk],
  91: zk,
  92: [uk, jh],
  93: ua,
  95: gl,
  96: Gy
}, lb = {
  null: [gl, Qk]
}, ab = {
  null: [42, 95]
}, cb = {
  null: []
}, ub = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: ab,
  contentInitial: nb,
  disable: cb,
  document: tb,
  flow: ib,
  flowInitial: rb,
  insideSpan: lb,
  string: ob,
  text: sb
}, Symbol.toStringTag, { value: "Module" }));
function fb(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, o = [];
  let s = [], l = [];
  const a = {
    attempt: R(A),
    check: R(x),
    consume: S,
    enter: C,
    exit: I,
    interrupt: R(x, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: m,
    events: [],
    now: p,
    parser: t,
    previous: null,
    sliceSerialize: h,
    sliceStream: d,
    write: f
  };
  let u = e.tokenize.call(c, a);
  return e.resolveAll && o.push(e), c;
  function f(v) {
    return s = Je(s, v), y(), s[s.length - 1] !== null ? [] : (O(e, 0), c.events = yi(o, c.events, c), c.events);
  }
  function h(v, P) {
    return db(d(v), P);
  }
  function d(v) {
    return hb(s, v);
  }
  function p() {
    const {
      _bufferIndex: v,
      _index: P,
      line: Z,
      column: X,
      offset: j
    } = r;
    return {
      _bufferIndex: v,
      _index: P,
      line: Z,
      column: X,
      offset: j
    };
  }
  function m(v) {
    i[v.line] = v.column, w();
  }
  function y() {
    let v;
    for (; r._index < s.length; ) {
      const P = s[r._index];
      if (typeof P == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < P.length; )
          g(P.charCodeAt(r._bufferIndex));
      else
        g(P);
    }
  }
  function g(v) {
    u = u(v);
  }
  function S(v) {
    z(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, w()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = v;
  }
  function C(v, P) {
    const Z = P || {};
    return Z.type = v, Z.start = p(), c.events.push(["enter", Z, c]), l.push(Z), Z;
  }
  function I(v) {
    const P = l.pop();
    return P.end = p(), c.events.push(["exit", P, c]), P;
  }
  function A(v, P) {
    O(v, P.from);
  }
  function x(v, P) {
    P.restore();
  }
  function R(v, P) {
    return Z;
    function Z(X, j, ce) {
      let ie, ae, pe, k;
      return Array.isArray(X) ? (
        /* c8 ignore next 1 */
        St(X)
      ) : "tokenize" in X ? (
        // Looks like a construct.
        St([
          /** @type {Construct} */
          X
        ])
      ) : tt(X);
      function tt(ke) {
        return Mr;
        function Mr(Ht) {
          const Un = Ht !== null && ke[Ht], Jn = Ht !== null && ke.null, zi = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Un) ? Un : Un ? [Un] : [],
            ...Array.isArray(Jn) ? Jn : Jn ? [Jn] : []
          ];
          return St(zi)(Ht);
        }
      }
      function St(ke) {
        return ie = ke, ae = 0, ke.length === 0 ? ce : b(ke[ae]);
      }
      function b(ke) {
        return Mr;
        function Mr(Ht) {
          return k = L(), pe = ke, ke.partial || (c.currentConstruct = ke), ke.name && c.parser.constructs.disable.null.includes(ke.name) ? mn() : ke.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(c), P) : c,
            a,
            nt,
            mn
          )(Ht);
        }
      }
      function nt(ke) {
        return v(pe, k), j;
      }
      function mn(ke) {
        return k.restore(), ++ae < ie.length ? b(ie[ae]) : ce;
      }
    }
  }
  function O(v, P) {
    v.resolveAll && !o.includes(v) && o.push(v), v.resolve && Te(c.events, P, c.events.length - P, v.resolve(c.events.slice(P), c)), v.resolveTo && (c.events = v.resolveTo(c.events, c));
  }
  function L() {
    const v = p(), P = c.previous, Z = c.currentConstruct, X = c.events.length, j = Array.from(l);
    return {
      from: X,
      restore: ce
    };
    function ce() {
      r = v, c.previous = P, c.currentConstruct = Z, c.events.length = X, l = j, w();
    }
  }
  function w() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function hb(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, o = e.end._bufferIndex;
  let s;
  if (n === i)
    s = [t[n].slice(r, o)];
  else {
    if (s = t.slice(n, i), r > -1) {
      const l = s[0];
      typeof l == "string" ? s[0] = l.slice(r) : s.shift();
    }
    o > 0 && s.push(t[i].slice(0, o));
  }
  return s;
}
function db(t, e) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < t.length; ) {
    const o = t[n];
    let s;
    if (typeof o == "string")
      s = o;
    else switch (o) {
      case -5: {
        s = "\r";
        break;
      }
      case -4: {
        s = `
`;
        break;
      }
      case -3: {
        s = `\r
`;
        break;
      }
      case -2: {
        s = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && i) continue;
        s = " ";
        break;
      }
      default:
        s = String.fromCharCode(o);
    }
    i = o === -2, r.push(s);
  }
  return r.join("");
}
function pb(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Vh([ub, ...(t || {}).extensions || []])
    ),
    content: i(Ey),
    defined: [],
    document: i(Dy),
    flow: i(Gk),
    lazy: {},
    string: i(Xk),
    text: i(Zk)
  };
  return r;
  function i(o) {
    return s;
    function s(l) {
      return fb(r, o, l);
    }
  }
}
function mb(t) {
  for (; !Kh(t); )
    ;
  return t;
}
const yu = /[\0\t\n\r]/g;
function gb() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(o, s, l) {
    const a = [];
    let c, u, f, h, d;
    for (o = e + (typeof o == "string" ? o.toString() : new TextDecoder(s || void 0).decode(o)), f = 0, e = "", n && (o.charCodeAt(0) === 65279 && f++, n = void 0); f < o.length; ) {
      if (yu.lastIndex = f, c = yu.exec(o), h = c && c.index !== void 0 ? c.index : o.length, d = o.charCodeAt(h), !c) {
        e = o.slice(f);
        break;
      }
      if (d === 10 && f === h && r)
        a.push(-3), r = void 0;
      else
        switch (r && (a.push(-5), r = void 0), f < h && (a.push(o.slice(f, h)), t += h - f), d) {
          case 0: {
            a.push(65533), t++;
            break;
          }
          case 9: {
            for (u = Math.ceil(t / 4) * 4, a.push(-2); t++ < u; ) a.push(-1);
            break;
          }
          case 10: {
            a.push(-4), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      f = h + 1;
    }
    return l && (r && a.push(-5), e && a.push(e), a.push(null)), a;
  }
}
const yb = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Xh(t) {
  return t.replace(yb, kb);
}
function kb(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return Hh(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return ca(n) || t;
}
function Kr(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? ku(t.position) : "start" in t || "end" in t ? ku(t) : "line" in t || "column" in t ? yl(t) : "";
}
function yl(t) {
  return bu(t && t.line) + ":" + bu(t && t.column);
}
function ku(t) {
  return yl(t && t.start) + "-" + yl(t && t.end);
}
function bu(t) {
  return t && typeof t == "number" ? t : 1;
}
const Zh = {}.hasOwnProperty;
function bb(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), wb(n)(mb(pb(n).document().write(gb()(t, e, !0))));
}
function wb(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(Gc),
      autolinkProtocol: L,
      autolinkEmail: L,
      atxHeading: o(Kc),
      blockQuote: o(Jn),
      characterEscape: L,
      characterReference: L,
      codeFenced: o(zi),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(zi, s),
      codeText: o(Ig, s),
      codeTextData: L,
      data: L,
      codeFlowValue: L,
      definition: o(Ag),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(Eg),
      hardBreakEscape: o(Uc),
      hardBreakTrailing: o(Uc),
      htmlFlow: o(Jc, s),
      htmlFlowData: L,
      htmlText: o(Jc, s),
      htmlTextData: L,
      image: o(Og),
      label: s,
      link: o(Gc),
      listItem: o(Dg),
      listItemValue: h,
      listOrdered: o(Yc, f),
      listUnordered: o(Yc),
      paragraph: o(Rg),
      reference: b,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: o(Kc),
      strong: o(vg),
      thematicBreak: o(Pg)
    },
    exit: {
      atxHeading: a(),
      atxHeadingSequence: A,
      autolink: a(),
      autolinkEmail: Un,
      autolinkProtocol: Ht,
      blockQuote: a(),
      characterEscapeValue: w,
      characterReferenceMarkerHexadecimal: mn,
      characterReferenceMarkerNumeric: mn,
      characterReferenceValue: ke,
      characterReference: Mr,
      codeFenced: a(y),
      codeFencedFence: m,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: p,
      codeFlowValue: w,
      codeIndented: a(g),
      codeText: a(j),
      codeTextData: w,
      data: w,
      definition: a(),
      definitionDestinationString: I,
      definitionLabelString: S,
      definitionTitleString: C,
      emphasis: a(),
      hardBreakEscape: a(P),
      hardBreakTrailing: a(P),
      htmlFlow: a(Z),
      htmlFlowData: w,
      htmlText: a(X),
      htmlTextData: w,
      image: a(ie),
      label: pe,
      labelText: ae,
      lineEnding: v,
      link: a(ce),
      listItem: a(),
      listOrdered: a(),
      listUnordered: a(),
      paragraph: a(),
      referenceString: nt,
      resourceDestinationString: k,
      resourceTitleString: tt,
      resource: St,
      setextHeading: a(O),
      setextHeadingLineSequence: R,
      setextHeadingText: x,
      strong: a(),
      thematicBreak: a()
    }
  };
  ed(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(T) {
    let E = {
      type: "root",
      children: []
    };
    const V = {
      stack: [E],
      tokenStack: [],
      config: e,
      enter: l,
      exit: c,
      buffer: s,
      resume: u,
      data: n
    }, K = [];
    let te = -1;
    for (; ++te < T.length; )
      if (T[te][1].type === "listOrdered" || T[te][1].type === "listUnordered")
        if (T[te][0] === "enter")
          K.push(te);
        else {
          const rt = K.pop();
          te = i(T, rt, te);
        }
    for (te = -1; ++te < T.length; ) {
      const rt = e[T[te][0]];
      Zh.call(rt, T[te][1].type) && rt[T[te][1].type].call(Object.assign({
        sliceSerialize: T[te][2].sliceSerialize
      }, V), T[te][1]);
    }
    if (V.tokenStack.length > 0) {
      const rt = V.tokenStack[V.tokenStack.length - 1];
      (rt[1] || wu).call(V, void 0, rt[0]);
    }
    for (E.position = {
      start: Wt(T.length > 0 ? T[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Wt(T.length > 0 ? T[T.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, te = -1; ++te < e.transforms.length; )
      E = e.transforms[te](E) || E;
    return E;
  }
  function i(T, E, V) {
    let K = E - 1, te = -1, rt = !1, gn, Mt, Tr, Nr;
    for (; ++K <= V; ) {
      const _e = T[K];
      switch (_e[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          _e[0] === "enter" ? te++ : te--, Nr = void 0;
          break;
        }
        case "lineEndingBlank": {
          _e[0] === "enter" && (gn && !Nr && !te && !Tr && (Tr = K), Nr = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Nr = void 0;
      }
      if (!te && _e[0] === "enter" && _e[1].type === "listItemPrefix" || te === -1 && _e[0] === "exit" && (_e[1].type === "listUnordered" || _e[1].type === "listOrdered")) {
        if (gn) {
          let Gn = K;
          for (Mt = void 0; Gn--; ) {
            const Tt = T[Gn];
            if (Tt[1].type === "lineEnding" || Tt[1].type === "lineEndingBlank") {
              if (Tt[0] === "exit") continue;
              Mt && (T[Mt][1].type = "lineEndingBlank", rt = !0), Tt[1].type = "lineEnding", Mt = Gn;
            } else if (!(Tt[1].type === "linePrefix" || Tt[1].type === "blockQuotePrefix" || Tt[1].type === "blockQuotePrefixWhitespace" || Tt[1].type === "blockQuoteMarker" || Tt[1].type === "listItemIndent")) break;
          }
          Tr && (!Mt || Tr < Mt) && (gn._spread = !0), gn.end = Object.assign({}, Mt ? T[Mt][1].start : _e[1].end), T.splice(Mt || K, 0, ["exit", gn, _e[2]]), K++, V++;
        }
        if (_e[1].type === "listItemPrefix") {
          const Gn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, _e[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          gn = Gn, T.splice(K, 0, ["enter", Gn, _e[2]]), K++, V++, Tr = void 0, Nr = !0;
        }
      }
    }
    return T[E][1]._spread = rt, V;
  }
  function o(T, E) {
    return V;
    function V(K) {
      l.call(this, T(K), K), E && E.call(this, K);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function l(T, E, V) {
    this.stack[this.stack.length - 1].children.push(T), this.stack.push(T), this.tokenStack.push([E, V || void 0]), T.position = {
      start: Wt(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function a(T) {
    return E;
    function E(V) {
      T && T.call(this, V), c.call(this, V);
    }
  }
  function c(T, E) {
    const V = this.stack.pop(), K = this.tokenStack.pop();
    if (K)
      K[0].type !== T.type && (E ? E.call(this, T, K[0]) : (K[1] || wu).call(this, T, K[0]));
    else throw new Error("Cannot close `" + T.type + "` (" + Kr({
      start: T.start,
      end: T.end
    }) + "): it’s not open");
    V.position.end = Wt(T.end);
  }
  function u() {
    return aa(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(T) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      E.start = Number.parseInt(this.sliceSerialize(T), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function d() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = T;
  }
  function p() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.meta = T;
  }
  function m() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function y() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function g() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = T.replace(/(\r?\n|\r)$/g, "");
  }
  function S(T) {
    const E = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = E, V.identifier = ot(this.sliceSerialize(T)).toLowerCase();
  }
  function C() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = T;
  }
  function I() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = T;
  }
  function A(T) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const V = this.sliceSerialize(T).length;
      E.depth = V;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function R(T) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(T).codePointAt(0) === 61 ? 1 : 2;
  }
  function O() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function L(T) {
    const V = this.stack[this.stack.length - 1].children;
    let K = V[V.length - 1];
    (!K || K.type !== "text") && (K = Lg(), K.position = {
      start: Wt(T.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, V.push(K)), this.stack.push(K);
  }
  function w(T) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(T), E.position.end = Wt(T.end);
  }
  function v(T) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const V = E.children[E.children.length - 1];
      V.position.end = Wt(T.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(E.type) && (L.call(this, T), w.call(this, T));
  }
  function P() {
    this.data.atHardBreak = !0;
  }
  function Z() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = T;
  }
  function X() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = T;
  }
  function j() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = T;
  }
  function ce() {
    const T = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = E, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function ie() {
    const T = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = E, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function ae(T) {
    const E = this.sliceSerialize(T), V = this.stack[this.stack.length - 2];
    V.label = Xh(E), V.identifier = ot(E).toLowerCase();
  }
  function pe() {
    const T = this.stack[this.stack.length - 1], E = this.resume(), V = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, V.type === "link") {
      const K = T.children;
      V.children = K;
    } else
      V.alt = E;
  }
  function k() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = T;
  }
  function tt() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = T;
  }
  function St() {
    this.data.inReference = void 0;
  }
  function b() {
    this.data.referenceType = "collapsed";
  }
  function nt(T) {
    const E = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = E, V.identifier = ot(this.sliceSerialize(T)).toLowerCase(), this.data.referenceType = "full";
  }
  function mn(T) {
    this.data.characterReferenceType = T.type;
  }
  function ke(T) {
    const E = this.sliceSerialize(T), V = this.data.characterReferenceType;
    let K;
    V ? (K = Hh(E, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : K = ca(E);
    const te = this.stack[this.stack.length - 1];
    te.value += K;
  }
  function Mr(T) {
    const E = this.stack.pop();
    E.position.end = Wt(T.end);
  }
  function Ht(T) {
    w.call(this, T);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(T);
  }
  function Un(T) {
    w.call(this, T);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(T);
  }
  function Jn() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function zi() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Ig() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ag() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Eg() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Kc() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Uc() {
    return {
      type: "break"
    };
  }
  function Jc() {
    return {
      type: "html",
      value: ""
    };
  }
  function Og() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Gc() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Yc(T) {
    return {
      type: "list",
      ordered: T.type === "listOrdered",
      start: null,
      spread: T._spread,
      children: []
    };
  }
  function Dg(T) {
    return {
      type: "listItem",
      spread: T._spread,
      checked: null,
      children: []
    };
  }
  function Rg() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function vg() {
    return {
      type: "strong",
      children: []
    };
  }
  function Lg() {
    return {
      type: "text",
      value: ""
    };
  }
  function Pg() {
    return {
      type: "thematicBreak"
    };
  }
}
function Wt(t) {
  return {
    line: t.line,
    column: t.column,
    offset: t.offset
  };
}
function ed(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? ed(t, r) : xb(t, r);
  }
}
function xb(t, e) {
  let n;
  for (n in e)
    if (Zh.call(e, n))
      switch (n) {
        case "canContainEols": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "transforms": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[n];
          r && Object.assign(t[n], r);
          break;
        }
      }
}
function wu(t, e) {
  throw t ? new Error("Cannot close `" + t.type + "` (" + Kr({
    start: t.start,
    end: t.end
  }) + "): a different token (`" + e.type + "`, " + Kr({
    start: e.start,
    end: e.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + e.type + "`, " + Kr({
    start: e.start,
    end: e.end
  }) + ") is still open");
}
function kl(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return bb(r, {
      ...e.data("settings"),
      ...t,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || []
    });
  }
}
const xu = {}.hasOwnProperty;
function Cb(t, e) {
  const n = e || {};
  function r(i, ...o) {
    let s = r.invalid;
    const l = r.handlers;
    if (i && xu.call(i, t)) {
      const a = String(i[t]);
      s = xu.call(l, a) ? l[a] : r.unknown;
    }
    if (s)
      return s.call(this, i, ...o);
  }
  return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
const Sb = {}.hasOwnProperty;
function td(t, e) {
  let n = -1, r;
  if (e.extensions)
    for (; ++n < e.extensions.length; )
      td(t, e.extensions[n]);
  for (r in e)
    if (Sb.call(e, r))
      switch (r) {
        case "extensions":
          break;
        /* c8 ignore next 4 */
        case "unsafe": {
          Cu(t[r], e[r]);
          break;
        }
        case "join": {
          Cu(t[r], e[r]);
          break;
        }
        case "handlers": {
          Mb(t[r], e[r]);
          break;
        }
        default:
          t.options[r] = e[r];
      }
  return t;
}
function Cu(t, e) {
  e && t.push(...e);
}
function Mb(t, e) {
  e && Object.assign(t, e);
}
function Tb(t, e, n, r) {
  const i = n.enter("blockquote"), o = n.createTracker(r);
  o.move("> "), o.shift(2);
  const s = n.indentLines(
    n.containerFlow(t, o.current()),
    Nb
  );
  return i(), s;
}
function Nb(t, e, n) {
  return ">" + (n ? "" : " ") + t;
}
function nd(t, e) {
  return Su(t, e.inConstruct, !0) && !Su(t, e.notInConstruct, !1);
}
function Su(t, e, n) {
  if (typeof e == "string" && (e = [e]), !e || e.length === 0)
    return n;
  let r = -1;
  for (; ++r < e.length; )
    if (t.includes(e[r]))
      return !0;
  return !1;
}
function Mu(t, e, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; )
    if (n.unsafe[i].character === `
` && nd(n.stack, n.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Ib(t, e) {
  const n = String(t);
  let r = n.indexOf(e), i = r, o = 0, s = 0;
  if (typeof e != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > s && (s = o) : o = 1, i = r + e.length, r = n.indexOf(e, i);
  return s;
}
function bl(t, e) {
  return !!(e.options.fences === !1 && t.value && // If there’s no info…
  !t.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(t.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(t.value));
}
function Ab(t) {
  const e = t.options.fence || "`";
  if (e !== "`" && e !== "~")
    throw new Error(
      "Cannot serialize code with `" + e + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return e;
}
function Eb(t, e, n, r) {
  const i = Ab(n), o = t.value || "", s = i === "`" ? "GraveAccent" : "Tilde";
  if (bl(t, n)) {
    const f = n.enter("codeIndented"), h = n.indentLines(o, Ob);
    return f(), h;
  }
  const l = n.createTracker(r), a = i.repeat(Math.max(Ib(o, i) + 1, 3)), c = n.enter("codeFenced");
  let u = l.move(a);
  if (t.lang) {
    const f = n.enter(`codeFencedLang${s}`);
    u += l.move(
      n.safe(t.lang, {
        before: u,
        after: " ",
        encode: ["`"],
        ...l.current()
      })
    ), f();
  }
  if (t.lang && t.meta) {
    const f = n.enter(`codeFencedMeta${s}`);
    u += l.move(" "), u += l.move(
      n.safe(t.meta, {
        before: u,
        after: `
`,
        encode: ["`"],
        ...l.current()
      })
    ), f();
  }
  return u += l.move(`
`), o && (u += l.move(o + `
`)), u += l.move(a), c(), u;
}
function Ob(t, e, n) {
  return (n ? "" : "    ") + t;
}
function fa(t) {
  const e = t.options.quote || '"';
  if (e !== '"' && e !== "'")
    throw new Error(
      "Cannot serialize title with `" + e + "` for `options.quote`, expected `\"`, or `'`"
    );
  return e;
}
function Db(t, e, n, r) {
  const i = fa(n), o = i === '"' ? "Quote" : "Apostrophe", s = n.enter("definition");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let c = a.move("[");
  return c += a.move(
    n.safe(n.associationId(t), {
      before: c,
      after: "]",
      ...a.current()
    })
  ), c += a.move("]: "), l(), // If there’s no url, or…
  !t.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(t.url) ? (l = n.enter("destinationLiteral"), c += a.move("<"), c += a.move(
    n.safe(t.url, { before: c, after: ">", ...a.current() })
  ), c += a.move(">")) : (l = n.enter("destinationRaw"), c += a.move(
    n.safe(t.url, {
      before: c,
      after: t.title ? " " : `
`,
      ...a.current()
    })
  )), l(), t.title && (l = n.enter(`title${o}`), c += a.move(" " + i), c += a.move(
    n.safe(t.title, {
      before: c,
      after: i,
      ...a.current()
    })
  ), c += a.move(i), l()), s(), c;
}
function Rb(t) {
  const e = t.options.emphasis || "*";
  if (e !== "*" && e !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + e + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return e;
}
function rn(t) {
  return "&#x" + t.toString(16).toUpperCase() + ";";
}
function bo(t, e, n) {
  const r = nn(t), i = nn(e);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    n === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
rd.peek = vb;
function rd(t, e, n, r) {
  const i = Rb(n), o = n.enter("emphasis"), s = n.createTracker(r), l = s.move(i);
  let a = s.move(
    n.containerPhrasing(t, {
      after: i,
      before: l,
      ...s.current()
    })
  );
  const c = a.charCodeAt(0), u = bo(
    r.before.charCodeAt(r.before.length - 1),
    c,
    i
  );
  u.inside && (a = rn(c) + a.slice(1));
  const f = a.charCodeAt(a.length - 1), h = bo(r.after.charCodeAt(0), f, i);
  h.inside && (a = a.slice(0, -1) + rn(f));
  const d = s.move(i);
  return o(), n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  }, l + a + d;
}
function vb(t, e, n) {
  return n.options.emphasis || "*";
}
const $o = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(t) {
    if (t == null)
      return Bb;
    if (typeof t == "function")
      return Vo(t);
    if (typeof t == "object")
      return Array.isArray(t) ? Lb(t) : Pb(t);
    if (typeof t == "string")
      return zb(t);
    throw new Error("Expected function, string, or object as test");
  })
);
function Lb(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e[n] = $o(t[n]);
  return Vo(r);
  function r(...i) {
    let o = -1;
    for (; ++o < e.length; )
      if (e[o].apply(this, i)) return !0;
    return !1;
  }
}
function Pb(t) {
  const e = (
    /** @type {Record<string, unknown>} */
    t
  );
  return Vo(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in t)
      if (i[o] !== e[o]) return !1;
    return !0;
  }
}
function zb(t) {
  return Vo(e);
  function e(n) {
    return n && n.type === t;
  }
}
function Vo(t) {
  return e;
  function e(n, r, i) {
    return !!(Fb(n) && t.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Bb() {
  return !0;
}
function Fb(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const id = [], _b = !0, wl = !1, xl = "skip";
function ha(t, e, n, r) {
  let i;
  typeof e == "function" && typeof n != "function" ? (r = n, n = e) : i = e;
  const o = $o(i), s = r ? -1 : 1;
  l(t, void 0, [])();
  function l(a, c, u) {
    const f = (
      /** @type {Record<string, unknown>} */
      a && typeof a == "object" ? a : {}
    );
    if (typeof f.type == "string") {
      const d = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (a.type + (d ? "<" + d + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let d = id, p, m, y;
      if ((!e || o(a, c, u[u.length - 1] || void 0)) && (d = $b(n(a, u)), d[0] === wl))
        return d;
      if ("children" in a && a.children) {
        const g = (
          /** @type {UnistParent} */
          a
        );
        if (g.children && d[0] !== xl)
          for (m = (r ? g.children.length : -1) + s, y = u.concat(g); m > -1 && m < g.children.length; ) {
            const S = g.children[m];
            if (p = l(S, m, y)(), p[0] === wl)
              return p;
            m = typeof p[1] == "number" ? p[1] : m + s;
          }
      }
      return d;
    }
  }
}
function $b(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [_b, t] : t == null ? id : [t];
}
function Wn(t, e, n, r) {
  let i, o, s;
  typeof e == "function" && typeof n != "function" ? (o = void 0, s = e, i = n) : (o = e, s = n, i = r), ha(t, o, l, i);
  function l(a, c) {
    const u = c[c.length - 1], f = u ? u.children.indexOf(a) : void 0;
    return s(a, f, u);
  }
}
function od(t, e) {
  let n = !1;
  return Wn(t, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return n = !0, wl;
  }), !!((!t.depth || t.depth < 3) && aa(t) && (e.options.setext || n));
}
function Vb(t, e, n, r) {
  const i = Math.max(Math.min(6, t.depth || 1), 1), o = n.createTracker(r);
  if (od(t, n)) {
    const u = n.enter("headingSetext"), f = n.enter("phrasing"), h = n.containerPhrasing(t, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return f(), u(), h + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      h.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(h.lastIndexOf("\r"), h.lastIndexOf(`
`)) + 1)
    );
  }
  const s = "#".repeat(i), l = n.enter("headingAtx"), a = n.enter("phrasing");
  o.move(s + " ");
  let c = n.containerPhrasing(t, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(c) && (c = rn(c.charCodeAt(0)) + c.slice(1)), c = c ? s + " " + c : s, n.options.closeAtx && (c += " " + s), a(), l(), c;
}
sd.peek = Hb;
function sd(t) {
  return t.value || "";
}
function Hb() {
  return "<";
}
ld.peek = Wb;
function ld(t, e, n, r) {
  const i = fa(n), o = i === '"' ? "Quote" : "Apostrophe", s = n.enter("image");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let c = a.move("![");
  return c += a.move(
    n.safe(t.alt, { before: c, after: "]", ...a.current() })
  ), c += a.move("]("), l(), // If there’s no url but there is a title…
  !t.url && t.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(t.url) ? (l = n.enter("destinationLiteral"), c += a.move("<"), c += a.move(
    n.safe(t.url, { before: c, after: ">", ...a.current() })
  ), c += a.move(">")) : (l = n.enter("destinationRaw"), c += a.move(
    n.safe(t.url, {
      before: c,
      after: t.title ? " " : ")",
      ...a.current()
    })
  )), l(), t.title && (l = n.enter(`title${o}`), c += a.move(" " + i), c += a.move(
    n.safe(t.title, {
      before: c,
      after: i,
      ...a.current()
    })
  ), c += a.move(i), l()), c += a.move(")"), s(), c;
}
function Wb() {
  return "!";
}
ad.peek = jb;
function ad(t, e, n, r) {
  const i = t.referenceType, o = n.enter("imageReference");
  let s = n.enter("label");
  const l = n.createTracker(r);
  let a = l.move("![");
  const c = n.safe(t.alt, {
    before: a,
    after: "]",
    ...l.current()
  });
  a += l.move(c + "]["), s();
  const u = n.stack;
  n.stack = [], s = n.enter("reference");
  const f = n.safe(n.associationId(t), {
    before: a,
    after: "]",
    ...l.current()
  });
  return s(), n.stack = u, o(), i === "full" || !c || c !== f ? a += l.move(f + "]") : i === "shortcut" ? a = a.slice(0, -1) : a += l.move("]"), a;
}
function jb() {
  return "!";
}
cd.peek = qb;
function cd(t, e, n) {
  let r = t.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < n.unsafe.length; ) {
    const s = n.unsafe[o], l = n.compilePattern(s);
    let a;
    if (s.atBreak)
      for (; a = l.exec(r); ) {
        let c = a.index;
        r.charCodeAt(c) === 10 && r.charCodeAt(c - 1) === 13 && c--, r = r.slice(0, c) + " " + r.slice(a.index + 1);
      }
  }
  return i + r + i;
}
function qb() {
  return "`";
}
function ud(t, e) {
  const n = aa(t);
  return !!(!e.options.resourceLink && // If there’s a url…
  t.url && // And there’s a no title…
  !t.title && // And the content of `node` is a single text node…
  t.children && t.children.length === 1 && t.children[0].type === "text" && // And if the url is the same as the content…
  (n === t.url || "mailto:" + n === t.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(t.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(t.url));
}
fd.peek = Kb;
function fd(t, e, n, r) {
  const i = fa(n), o = i === '"' ? "Quote" : "Apostrophe", s = n.createTracker(r);
  let l, a;
  if (ud(t, n)) {
    const u = n.stack;
    n.stack = [], l = n.enter("autolink");
    let f = s.move("<");
    return f += s.move(
      n.containerPhrasing(t, {
        before: f,
        after: ">",
        ...s.current()
      })
    ), f += s.move(">"), l(), n.stack = u, f;
  }
  l = n.enter("link"), a = n.enter("label");
  let c = s.move("[");
  return c += s.move(
    n.containerPhrasing(t, {
      before: c,
      after: "](",
      ...s.current()
    })
  ), c += s.move("]("), a(), // If there’s no url but there is a title…
  !t.url && t.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(t.url) ? (a = n.enter("destinationLiteral"), c += s.move("<"), c += s.move(
    n.safe(t.url, { before: c, after: ">", ...s.current() })
  ), c += s.move(">")) : (a = n.enter("destinationRaw"), c += s.move(
    n.safe(t.url, {
      before: c,
      after: t.title ? " " : ")",
      ...s.current()
    })
  )), a(), t.title && (a = n.enter(`title${o}`), c += s.move(" " + i), c += s.move(
    n.safe(t.title, {
      before: c,
      after: i,
      ...s.current()
    })
  ), c += s.move(i), a()), c += s.move(")"), l(), c;
}
function Kb(t, e, n) {
  return ud(t, n) ? "<" : "[";
}
hd.peek = Ub;
function hd(t, e, n, r) {
  const i = t.referenceType, o = n.enter("linkReference");
  let s = n.enter("label");
  const l = n.createTracker(r);
  let a = l.move("[");
  const c = n.containerPhrasing(t, {
    before: a,
    after: "]",
    ...l.current()
  });
  a += l.move(c + "]["), s();
  const u = n.stack;
  n.stack = [], s = n.enter("reference");
  const f = n.safe(n.associationId(t), {
    before: a,
    after: "]",
    ...l.current()
  });
  return s(), n.stack = u, o(), i === "full" || !c || c !== f ? a += l.move(f + "]") : i === "shortcut" ? a = a.slice(0, -1) : a += l.move("]"), a;
}
function Ub() {
  return "[";
}
function da(t) {
  const e = t.options.bullet || "*";
  if (e !== "*" && e !== "+" && e !== "-")
    throw new Error(
      "Cannot serialize items with `" + e + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return e;
}
function Jb(t) {
  const e = da(t), n = t.options.bulletOther;
  if (!n)
    return e === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (n === e)
    throw new Error(
      "Expected `bullet` (`" + e + "`) and `bulletOther` (`" + n + "`) to be different"
    );
  return n;
}
function Gb(t) {
  const e = t.options.bulletOrdered || ".";
  if (e !== "." && e !== ")")
    throw new Error(
      "Cannot serialize items with `" + e + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return e;
}
function dd(t) {
  const e = t.options.rule || "*";
  if (e !== "*" && e !== "-" && e !== "_")
    throw new Error(
      "Cannot serialize rules with `" + e + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return e;
}
function Yb(t, e, n, r) {
  const i = n.enter("list"), o = n.bulletCurrent;
  let s = t.ordered ? Gb(n) : da(n);
  const l = t.ordered ? s === "." ? ")" : "." : Jb(n);
  let a = e && n.bulletLastUsed ? s === n.bulletLastUsed : !1;
  if (!t.ordered) {
    const u = t.children ? t.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (s === "*" || s === "-") && // Empty first list item:
      u && (!u.children || !u.children[0]) && // Directly in two other list items:
      n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && // That are each the first child.
      n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (a = !0), dd(n) === s && u
    ) {
      let f = -1;
      for (; ++f < t.children.length; ) {
        const h = t.children[f];
        if (h && h.type === "listItem" && h.children && h.children[0] && h.children[0].type === "thematicBreak") {
          a = !0;
          break;
        }
      }
    }
  }
  a && (s = l), n.bulletCurrent = s;
  const c = n.containerFlow(t, r);
  return n.bulletLastUsed = s, n.bulletCurrent = o, i(), c;
}
function Qb(t) {
  const e = t.options.listItemIndent || "one";
  if (e !== "tab" && e !== "one" && e !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + e + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return e;
}
function Xb(t, e, n, r) {
  const i = Qb(n);
  let o = n.bulletCurrent || da(n);
  e && e.type === "list" && e.ordered && (o = (typeof e.start == "number" && e.start > -1 ? e.start : 1) + (n.options.incrementListMarker === !1 ? 0 : e.children.indexOf(t)) + o);
  let s = o.length + 1;
  (i === "tab" || i === "mixed" && (e && e.type === "list" && e.spread || t.spread)) && (s = Math.ceil(s / 4) * 4);
  const l = n.createTracker(r);
  l.move(o + " ".repeat(s - o.length)), l.shift(s);
  const a = n.enter("listItem"), c = n.indentLines(
    n.containerFlow(t, l.current()),
    u
  );
  return a(), c;
  function u(f, h, d) {
    return h ? (d ? "" : " ".repeat(s)) + f : (d ? o : o + " ".repeat(s - o.length)) + f;
  }
}
function Zb(t, e, n, r) {
  const i = n.enter("paragraph"), o = n.enter("phrasing"), s = n.containerPhrasing(t, r);
  return o(), i(), s;
}
const e1 = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  $o([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function t1(t, e, n, r) {
  return (t.children.some(function(s) {
    return e1(s);
  }) ? n.containerPhrasing : n.containerFlow).call(n, t, r);
}
function n1(t) {
  const e = t.options.strong || "*";
  if (e !== "*" && e !== "_")
    throw new Error(
      "Cannot serialize strong with `" + e + "` for `options.strong`, expected `*`, or `_`"
    );
  return e;
}
pd.peek = r1;
function pd(t, e, n, r) {
  const i = n1(n), o = n.enter("strong"), s = n.createTracker(r), l = s.move(i + i);
  let a = s.move(
    n.containerPhrasing(t, {
      after: i,
      before: l,
      ...s.current()
    })
  );
  const c = a.charCodeAt(0), u = bo(
    r.before.charCodeAt(r.before.length - 1),
    c,
    i
  );
  u.inside && (a = rn(c) + a.slice(1));
  const f = a.charCodeAt(a.length - 1), h = bo(r.after.charCodeAt(0), f, i);
  h.inside && (a = a.slice(0, -1) + rn(f));
  const d = s.move(i + i);
  return o(), n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  }, l + a + d;
}
function r1(t, e, n) {
  return n.options.strong || "*";
}
function i1(t, e, n, r) {
  return n.safe(t.value, r);
}
function o1(t) {
  const e = t.options.ruleRepetition || 3;
  if (e < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + e + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return e;
}
function s1(t, e, n) {
  const r = (dd(n) + (n.options.ruleSpaces ? " " : "")).repeat(o1(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const pa = {
  blockquote: Tb,
  break: Mu,
  code: Eb,
  definition: Db,
  emphasis: rd,
  hardBreak: Mu,
  heading: Vb,
  html: sd,
  image: ld,
  imageReference: ad,
  inlineCode: cd,
  link: fd,
  linkReference: hd,
  list: Yb,
  listItem: Xb,
  paragraph: Zb,
  root: t1,
  strong: pd,
  text: i1,
  thematicBreak: s1
}, l1 = [a1];
function a1(t, e, n, r) {
  if (e.type === "code" && bl(e, r) && (t.type === "list" || t.type === e.type && bl(t, r)))
    return !1;
  if ("spread" in n && typeof n.spread == "boolean")
    return t.type === "paragraph" && // Two paragraphs.
    (t.type === e.type || e.type === "definition" || // Paragraph followed by a setext heading.
    e.type === "heading" && od(e, r)) ? void 0 : n.spread ? 1 : 0;
}
const yn = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
], c1 = [
  { character: "	", after: "[\\r\\n]", inConstruct: "phrasing" },
  { character: "	", before: "[\\r\\n]", inConstruct: "phrasing" },
  {
    character: "	",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
  },
  {
    character: "\r",
    inConstruct: [
      "codeFencedLangGraveAccent",
      "codeFencedLangTilde",
      "codeFencedMetaGraveAccent",
      "codeFencedMetaTilde",
      "destinationLiteral",
      "headingAtx"
    ]
  },
  {
    character: `
`,
    inConstruct: [
      "codeFencedLangGraveAccent",
      "codeFencedLangTilde",
      "codeFencedMetaGraveAccent",
      "codeFencedMetaTilde",
      "destinationLiteral",
      "headingAtx"
    ]
  },
  { character: " ", after: "[\\r\\n]", inConstruct: "phrasing" },
  { character: " ", before: "[\\r\\n]", inConstruct: "phrasing" },
  {
    character: " ",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
  },
  // An exclamation mark can start an image, if it is followed by a link or
  // a link reference.
  {
    character: "!",
    after: "\\[",
    inConstruct: "phrasing",
    notInConstruct: yn
  },
  // A quote can break out of a title.
  { character: '"', inConstruct: "titleQuote" },
  // A number sign could start an ATX heading if it starts a line.
  { atBreak: !0, character: "#" },
  { character: "#", inConstruct: "headingAtx", after: `(?:[\r
]|$)` },
  // Dollar sign and percentage are not used in markdown.
  // An ampersand could start a character reference.
  { character: "&", after: "[#A-Za-z]", inConstruct: "phrasing" },
  // An apostrophe can break out of a title.
  { character: "'", inConstruct: "titleApostrophe" },
  // A left paren could break out of a destination raw.
  { character: "(", inConstruct: "destinationRaw" },
  // A left paren followed by `]` could make something into a link or image.
  {
    before: "\\]",
    character: "(",
    inConstruct: "phrasing",
    notInConstruct: yn
  },
  // A right paren could start a list item or break out of a destination
  // raw.
  { atBreak: !0, before: "\\d+", character: ")" },
  { character: ")", inConstruct: "destinationRaw" },
  // An asterisk can start thematic breaks, list items, emphasis, strong.
  { atBreak: !0, character: "*", after: `(?:[ 	\r
*])` },
  { character: "*", inConstruct: "phrasing", notInConstruct: yn },
  // A plus sign could start a list item.
  { atBreak: !0, character: "+", after: `(?:[ 	\r
])` },
  // A dash can start thematic breaks, list items, and setext heading
  // underlines.
  { atBreak: !0, character: "-", after: `(?:[ 	\r
-])` },
  // A dot could start a list item.
  { atBreak: !0, before: "\\d+", character: ".", after: `(?:[ 	\r
]|$)` },
  // Slash, colon, and semicolon are not used in markdown for constructs.
  // A less than can start html (flow or text) or an autolink.
  // HTML could start with an exclamation mark (declaration, cdata, comment),
  // slash (closing tag), question mark (instruction), or a letter (tag).
  // An autolink also starts with a letter.
  // Finally, it could break out of a destination literal.
  { atBreak: !0, character: "<", after: "[!/?A-Za-z]" },
  {
    character: "<",
    after: "[!/?A-Za-z]",
    inConstruct: "phrasing",
    notInConstruct: yn
  },
  { character: "<", inConstruct: "destinationLiteral" },
  // An equals to can start setext heading underlines.
  { atBreak: !0, character: "=" },
  // A greater than can start block quotes and it can break out of a
  // destination literal.
  { atBreak: !0, character: ">" },
  { character: ">", inConstruct: "destinationLiteral" },
  // Question mark and at sign are not used in markdown for constructs.
  // A left bracket can start definitions, references, labels,
  { atBreak: !0, character: "[" },
  { character: "[", inConstruct: "phrasing", notInConstruct: yn },
  { character: "[", inConstruct: ["label", "reference"] },
  // A backslash can start an escape (when followed by punctuation) or a
  // hard break (when followed by an eol).
  // Note: typical escapes are handled in `safe`!
  { character: "\\", after: "[\\r\\n]", inConstruct: "phrasing" },
  // A right bracket can exit labels.
  { character: "]", inConstruct: ["label", "reference"] },
  // Caret is not used in markdown for constructs.
  // An underscore can start emphasis, strong, or a thematic break.
  { atBreak: !0, character: "_" },
  { character: "_", inConstruct: "phrasing", notInConstruct: yn },
  // A grave accent can start code (fenced or text), or it can break out of
  // a grave accent code fence.
  { atBreak: !0, character: "`" },
  {
    character: "`",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
  },
  { character: "`", inConstruct: "phrasing", notInConstruct: yn },
  // Left brace, vertical bar, right brace are not used in markdown for
  // constructs.
  // A tilde can start code (fenced).
  { atBreak: !0, character: "~" }
];
function u1(t) {
  return t.label || !t.identifier ? t.label || "" : Xh(t.identifier);
}
function f1(t) {
  if (!t._compiled) {
    const e = (t.atBreak ? "[\\r\\n][\\t ]*" : "") + (t.before ? "(?:" + t.before + ")" : "");
    t._compiled = new RegExp(
      (e ? "(" + e + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(t.character) ? "\\" : "") + t.character + (t.after ? "(?:" + t.after + ")" : ""),
      "g"
    );
  }
  return t._compiled;
}
function h1(t, e, n) {
  const r = e.indexStack, i = t.children || [], o = [];
  let s = -1, l = n.before, a;
  r.push(-1);
  let c = e.createTracker(n);
  for (; ++s < i.length; ) {
    const u = i[s];
    let f;
    if (r[r.length - 1] = s, s + 1 < i.length) {
      let p = e.handle.handlers[i[s + 1].type];
      p && p.peek && (p = p.peek), f = p ? p(i[s + 1], t, e, {
        before: "",
        after: "",
        ...c.current()
      }).charAt(0) : "";
    } else
      f = n.after;
    o.length > 0 && (l === "\r" || l === `
`) && u.type === "html" && (o[o.length - 1] = o[o.length - 1].replace(
      /(\r?\n|\r)$/,
      " "
    ), l = " ", c = e.createTracker(n), c.move(o.join("")));
    let h = e.handle(u, t, e, {
      ...c.current(),
      after: f,
      before: l
    });
    a && a === h.slice(0, 1) && (h = rn(a.charCodeAt(0)) + h.slice(1));
    const d = e.attentionEncodeSurroundingInfo;
    e.attentionEncodeSurroundingInfo = void 0, a = void 0, d && (o.length > 0 && d.before && l === o[o.length - 1].slice(-1) && (o[o.length - 1] = o[o.length - 1].slice(0, -1) + rn(l.charCodeAt(0))), d.after && (a = f)), c.move(h), o.push(h), l = h.slice(-1);
  }
  return r.pop(), o.join("");
}
function d1(t, e, n) {
  const r = e.indexStack, i = t.children || [], o = e.createTracker(n), s = [];
  let l = -1;
  for (r.push(-1); ++l < i.length; ) {
    const a = i[l];
    r[r.length - 1] = l, s.push(
      o.move(
        e.handle(a, t, e, {
          before: `
`,
          after: `
`,
          ...o.current()
        })
      )
    ), a.type !== "list" && (e.bulletLastUsed = void 0), l < i.length - 1 && s.push(
      o.move(p1(a, i[l + 1], t, e))
    );
  }
  return r.pop(), s.join("");
}
function p1(t, e, n, r) {
  let i = r.join.length;
  for (; i--; ) {
    const o = r.join[i](t, e, n, r);
    if (o === !0 || o === 1)
      break;
    if (typeof o == "number")
      return `
`.repeat(1 + o);
    if (o === !1)
      return `

<!---->

`;
  }
  return `

`;
}
const m1 = /\r?\n|\r/g;
function g1(t, e) {
  const n = [];
  let r = 0, i = 0, o;
  for (; o = m1.exec(t); )
    s(t.slice(r, o.index)), n.push(o[0]), r = o.index + o[0].length, i++;
  return s(t.slice(r)), n.join("");
  function s(l) {
    n.push(e(l, i, !l));
  }
}
function y1(t, e, n) {
  const r = (n.before || "") + (e || "") + (n.after || ""), i = [], o = [], s = {};
  let l = -1;
  for (; ++l < t.unsafe.length; ) {
    const u = t.unsafe[l];
    if (!nd(t.stack, u))
      continue;
    const f = t.compilePattern(u);
    let h;
    for (; h = f.exec(r); ) {
      const d = "before" in u || !!u.atBreak, p = "after" in u, m = h.index + (d ? h[1].length : 0);
      i.includes(m) ? (s[m].before && !d && (s[m].before = !1), s[m].after && !p && (s[m].after = !1)) : (i.push(m), s[m] = { before: d, after: p });
    }
  }
  i.sort(k1);
  let a = n.before ? n.before.length : 0;
  const c = r.length - (n.after ? n.after.length : 0);
  for (l = -1; ++l < i.length; ) {
    const u = i[l];
    u < a || u >= c || u + 1 < c && i[l + 1] === u + 1 && s[u].after && !s[u + 1].before && !s[u + 1].after || i[l - 1] === u - 1 && s[u].before && !s[u - 1].before && !s[u - 1].after || (a !== u && o.push(Tu(r.slice(a, u), "\\")), a = u, /[!-/:-@[-`{-~]/.test(r.charAt(u)) && (!n.encode || !n.encode.includes(r.charAt(u))) ? o.push("\\") : (o.push(rn(r.charCodeAt(u))), a++));
  }
  return o.push(Tu(r.slice(a, c), n.after)), o.join("");
}
function k1(t, e) {
  return t - e;
}
function Tu(t, e) {
  const n = /\\(?=[!-/:-@[-`{-~])/g, r = [], i = [], o = t + e;
  let s = -1, l = 0, a;
  for (; a = n.exec(o); )
    r.push(a.index);
  for (; ++s < r.length; )
    l !== r[s] && i.push(t.slice(l, r[s])), i.push("\\"), l = r[s];
  return i.push(t.slice(l)), i.join("");
}
function b1(t) {
  const e = t || {}, n = e.now || {};
  let r = e.lineShift || 0, i = n.line || 1, o = n.column || 1;
  return { move: a, current: s, shift: l };
  function s() {
    return { now: { line: i, column: o }, lineShift: r };
  }
  function l(c) {
    r += c;
  }
  function a(c) {
    const u = c || "", f = u.split(/\r?\n|\r/g), h = f[f.length - 1];
    return i += f.length - 1, o = f.length === 1 ? o + h.length : 1 + h.length + r, u;
  }
}
function w1(t, e) {
  const n = e || {}, r = {
    associationId: u1,
    containerPhrasing: M1,
    containerFlow: T1,
    createTracker: b1,
    compilePattern: f1,
    enter: o,
    // @ts-expect-error: GFM / frontmatter are typed in `mdast` but not defined
    // here.
    handlers: { ...pa },
    // @ts-expect-error: add `handle` in a second.
    handle: void 0,
    indentLines: g1,
    indexStack: [],
    join: [...l1],
    options: {},
    safe: N1,
    stack: [],
    unsafe: [...c1]
  };
  td(r, n), r.options.tightDefinitions && r.join.push(S1), r.handle = Cb("type", {
    invalid: x1,
    unknown: C1,
    handlers: r.handlers
  });
  let i = r.handle(t, void 0, r, {
    before: `
`,
    after: `
`,
    now: { line: 1, column: 1 },
    lineShift: 0
  });
  return i && i.charCodeAt(i.length - 1) !== 10 && i.charCodeAt(i.length - 1) !== 13 && (i += `
`), i;
  function o(s) {
    return r.stack.push(s), l;
    function l() {
      r.stack.pop();
    }
  }
}
function x1(t) {
  throw new Error("Cannot handle value `" + t + "`, expected node");
}
function C1(t) {
  const e = (
    /** @type {Nodes} */
    t
  );
  throw new Error("Cannot handle unknown node `" + e.type + "`");
}
function S1(t, e) {
  if (t.type === "definition" && t.type === e.type)
    return 0;
}
function M1(t, e) {
  return h1(t, this, e);
}
function T1(t, e) {
  return d1(t, this, e);
}
function N1(t, e) {
  return y1(this, t, e);
}
function Cl(t) {
  const e = this;
  e.compiler = n;
  function n(r) {
    return w1(r, {
      ...e.data("settings"),
      ...t,
      // Note: this option is not in the readme.
      // The goal is for it to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("toMarkdownExtensions") || []
    });
  }
}
function Nu(t) {
  if (t)
    throw t;
}
function I1(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ws, Iu;
function A1() {
  if (Iu) return ws;
  Iu = 1;
  var t = Object.prototype.hasOwnProperty, e = Object.prototype.toString, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(c) {
    return typeof Array.isArray == "function" ? Array.isArray(c) : e.call(c) === "[object Array]";
  }, o = function(c) {
    if (!c || e.call(c) !== "[object Object]")
      return !1;
    var u = t.call(c, "constructor"), f = c.constructor && c.constructor.prototype && t.call(c.constructor.prototype, "isPrototypeOf");
    if (c.constructor && !u && !f)
      return !1;
    var h;
    for (h in c)
      ;
    return typeof h > "u" || t.call(c, h);
  }, s = function(c, u) {
    n && u.name === "__proto__" ? n(c, u.name, {
      enumerable: !0,
      configurable: !0,
      value: u.newValue,
      writable: !0
    }) : c[u.name] = u.newValue;
  }, l = function(c, u) {
    if (u === "__proto__")
      if (t.call(c, u)) {
        if (r)
          return r(c, u).value;
      } else return;
    return c[u];
  };
  return ws = function a() {
    var c, u, f, h, d, p, m = arguments[0], y = 1, g = arguments.length, S = !1;
    for (typeof m == "boolean" && (S = m, m = arguments[1] || {}, y = 2), (m == null || typeof m != "object" && typeof m != "function") && (m = {}); y < g; ++y)
      if (c = arguments[y], c != null)
        for (u in c)
          f = l(m, u), h = l(c, u), m !== h && (S && h && (o(h) || (d = i(h))) ? (d ? (d = !1, p = f && i(f) ? f : []) : p = f && o(f) ? f : {}, s(m, { name: u, newValue: a(S, p, h) })) : typeof h < "u" && s(m, { name: u, newValue: h }));
    return m;
  }, ws;
}
var E1 = A1();
const xs = /* @__PURE__ */ I1(E1);
function Sl(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function O1() {
  const t = [], e = { run: n, use: r };
  return e;
  function n(...i) {
    let o = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    l(null, ...i);
    function l(a, ...c) {
      const u = t[++o];
      let f = -1;
      if (a) {
        s(a);
        return;
      }
      for (; ++f < i.length; )
        (c[f] === null || c[f] === void 0) && (c[f] = i[f]);
      i = c, u ? D1(u, l)(...c) : s(null, ...c);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return t.push(i), e;
  }
}
function D1(t, e) {
  let n;
  return r;
  function r(...s) {
    const l = t.length > s.length;
    let a;
    l && s.push(i);
    try {
      a = t.apply(this, s);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (l && n)
        throw u;
      return i(u);
    }
    l || (a && a.then && typeof a.then == "function" ? a.then(o, i) : a instanceof Error ? i(a) : o(a));
  }
  function i(s, ...l) {
    n || (n = !0, e(s, ...l));
  }
  function o(s) {
    i(null, s);
  }
}
class Be extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(e, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", o = {}, s = !1;
    if (n && ("line" in n && "column" in n ? o = { place: n } : "start" in n && "end" in n ? o = { place: n } : "type" in n ? o = {
      ancestors: [n],
      place: n.position
    } : o = { ...n }), typeof e == "string" ? i = e : !o.cause && e && (s = !0, i = e.message, o.cause = e), !o.ruleId && !o.source && typeof r == "string") {
      const a = r.indexOf(":");
      a === -1 ? o.ruleId = r : (o.source = r.slice(0, a), o.ruleId = r.slice(a + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const a = o.ancestors[o.ancestors.length - 1];
      a && (o.place = a.position);
    }
    const l = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = l ? l.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = l ? l.line : void 0, this.name = Kr(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = s && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Be.prototype.file = "";
Be.prototype.name = "";
Be.prototype.reason = "";
Be.prototype.message = "";
Be.prototype.stack = "";
Be.prototype.column = void 0;
Be.prototype.line = void 0;
Be.prototype.ancestors = void 0;
Be.prototype.cause = void 0;
Be.prototype.fatal = void 0;
Be.prototype.place = void 0;
Be.prototype.ruleId = void 0;
Be.prototype.source = void 0;
const pt = { basename: R1, dirname: v1, extname: L1, join: P1, sep: "/" };
function R1(t, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  bi(t);
  let n = 0, r = -1, i = t.length, o;
  if (e === void 0 || e.length === 0 || e.length > t.length) {
    for (; i--; )
      if (t.codePointAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : t.slice(n, r);
  }
  if (e === t)
    return "";
  let s = -1, l = e.length - 1;
  for (; i--; )
    if (t.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && (o = !0, s = i + 1), l > -1 && (t.codePointAt(i) === e.codePointAt(l--) ? l < 0 && (r = i) : (l = -1, r = s));
  return n === r ? r = s : r < 0 && (r = t.length), t.slice(n, r);
}
function v1(t) {
  if (bi(t), t.length === 0)
    return ".";
  let e = -1, n = t.length, r;
  for (; --n; )
    if (t.codePointAt(n) === 47) {
      if (r) {
        e = n;
        break;
      }
    } else r || (r = !0);
  return e < 0 ? t.codePointAt(0) === 47 ? "/" : "." : e === 1 && t.codePointAt(0) === 47 ? "//" : t.slice(0, e);
}
function L1(t) {
  bi(t);
  let e = t.length, n = -1, r = 0, i = -1, o = 0, s;
  for (; e--; ) {
    const l = t.codePointAt(e);
    if (l === 47) {
      if (s) {
        r = e + 1;
        break;
      }
      continue;
    }
    n < 0 && (s = !0, n = e + 1), l === 46 ? i < 0 ? i = e : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === n - 1 && i === r + 1 ? "" : t.slice(i, n);
}
function P1(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    bi(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : z1(n);
}
function z1(t) {
  bi(t);
  const e = t.codePointAt(0) === 47;
  let n = B1(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function B1(t, e) {
  let n = "", r = 0, i = -1, o = 0, s = -1, l, a;
  for (; ++s <= t.length; ) {
    if (s < t.length)
      l = t.codePointAt(s);
    else {
      if (l === 47)
        break;
      l = 47;
    }
    if (l === 47) {
      if (!(i === s - 1 || o === 1)) if (i !== s - 1 && o === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (a = n.lastIndexOf("/"), a !== n.length - 1) {
              a < 0 ? (n = "", r = 0) : (n = n.slice(0, a), r = n.length - 1 - n.lastIndexOf("/")), i = s, o = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = s, o = 0;
            continue;
          }
        }
        e && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + t.slice(i + 1, s) : n = t.slice(i + 1, s), r = s - i - 1;
      i = s, o = 0;
    } else l === 46 && o > -1 ? o++ : o = -1;
  }
  return n;
}
function bi(t) {
  if (typeof t != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(t)
    );
}
const F1 = { cwd: _1 };
function _1() {
  return "/";
}
function Ml(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function $1(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!Ml(t)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + t + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (t.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return V1(t);
}
function V1(t) {
  if (t.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const e = t.pathname;
  let n = -1;
  for (; ++n < e.length; )
    if (e.codePointAt(n) === 37 && e.codePointAt(n + 1) === 50) {
      const r = e.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(e);
}
const Cs = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class H1 {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(e) {
    let n;
    e ? Ml(e) ? n = { path: e } : typeof e == "string" || W1(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : F1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Cs.length; ) {
      const o = Cs[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      Cs.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? pt.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(e) {
    Ms(e, "basename"), Ss(e, "basename"), this.path = pt.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? pt.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(e) {
    Au(this.basename, "dirname"), this.path = pt.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? pt.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(e) {
    if (Ss(e, "extname"), Au(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = pt.join(this.dirname, this.stem + (e || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(e) {
    Ml(e) && (e = $1(e)), Ms(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? pt.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(e) {
    Ms(e, "stem"), Ss(e, "stem"), this.path = pt.join(this.dirname || "", e + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(e, n, r) {
    const i = this.message(e, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(e, n, r) {
    const i = this.message(e, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(e, n, r) {
    const i = new Be(
      // @ts-expect-error: the overloads are fine.
      e,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(e) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
  }
}
function Ss(t, e) {
  if (t && t.includes(pt.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + pt.sep + "`"
    );
}
function Ms(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function Au(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function W1(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const j1 = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(t) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[t], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  })
), q1 = {}.hasOwnProperty;
class ma extends j1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = O1();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const e = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new ma()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      e.use(...r);
    }
    return e.data(xs(!0, {}, this.namespace)), e;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(e, n) {
    return typeof e == "string" ? arguments.length === 2 ? (Is("data", this.frozen), this.namespace[e] = n, this) : q1.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Is("data", this.frozen), this.namespace = e, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const e = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(e, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(e) {
    this.freeze();
    const n = _i(e), r = this.parser || this.Parser;
    return Ts("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(e, n) {
    const r = this;
    return this.freeze(), Ts("process", this.parser || this.Parser), Ns("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, s) {
      const l = _i(e), a = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(l)
      );
      r.run(a, l, function(u, f, h) {
        if (u || !f || !h)
          return c(u);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), p = r.stringify(d, h);
        U1(p) ? h.value = p : h.result = p, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function c(u, f) {
        u || !f ? s(u) : o ? o(f) : n(void 0, f);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(e) {
    let n = !1, r;
    return this.freeze(), Ts("processSync", this.parser || this.Parser), Ns("processSync", this.compiler || this.Compiler), this.process(e, i), Ou("processSync", "process", n), r;
    function i(o, s) {
      n = !0, Nu(o), r = s;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(e, n, r) {
    Eu(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(s, l) {
      const a = _i(n);
      i.run(e, a, c);
      function c(u, f, h) {
        const d = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || e
        );
        u ? l(u) : s ? s(d) : r(void 0, d, h);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(e, n) {
    let r = !1, i;
    return this.run(e, n, o), Ou("runSync", "run", r), i;
    function o(s, l) {
      Nu(s), i = l, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(e, n) {
    this.freeze();
    const r = _i(n), i = this.compiler || this.Compiler;
    return Ns("stringify", i), Eu(e), i(e, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(e, ...n) {
    const r = this.attachers, i = this.namespace;
    if (Is("use", this.frozen), e != null) if (typeof e == "function")
      a(e, n);
    else if (typeof e == "object")
      Array.isArray(e) ? l(e) : s(e);
    else
      throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function o(c) {
      if (typeof c == "function")
        a(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          a(u, f);
        } else
          s(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function s(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      l(c.plugins), c.settings && (i.settings = xs(!0, i.settings, c.settings));
    }
    function l(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const f = c[u];
          o(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function a(c, u) {
      let f = -1, h = -1;
      for (; ++f < r.length; )
        if (r[f][0] === c) {
          h = f;
          break;
        }
      if (h === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [d, ...p] = u;
        const m = r[h][1];
        Sl(m) && Sl(d) && (d = xs(!0, m, d)), r[h] = [c, d, ...p];
      }
    }
  }
}
const Tl = new ma().freeze();
function Ts(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function Ns(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function Is(t, e) {
  if (e)
    throw new Error(
      "Cannot call `" + t + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Eu(t) {
  if (!Sl(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function Ou(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function _i(t) {
  return K1(t) ? t : new H1(t);
}
function K1(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function U1(t) {
  return typeof t == "string" || J1(t);
}
function J1(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
var md = (t) => {
  throw TypeError(t);
}, gd = (t, e, n) => e.has(t) || md("Cannot " + n), W = (t, e, n) => (gd(t, e, "read from private field"), n ? n.call(t) : e.get(t)), ue = (t, e, n) => e.has(t) ? md("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), oe = (t, e, n, r) => (gd(t, e, "write to private field"), e.set(t, n), n), dt, Rr, Ui, Ji, Gi, vr, Lr, It, Pr, Yi, Qi, zr, Xi, Br, Zi, eo, Xn, bn, to, Fr;
class yd {
}
class kd {
  constructor() {
    this.elements = [], this.size = () => this.elements.length, this.top = () => this.elements.at(-1), this.push = (e) => {
      this.top()?.push(e);
    }, this.open = (e) => {
      this.elements.push(e);
    }, this.close = () => {
      const e = this.elements.pop();
      if (!e) throw wh();
      return e;
    };
  }
}
class ga extends yd {
  constructor(e, n, r) {
    super(), this.type = e, this.content = n, this.attrs = r;
  }
  push(e, ...n) {
    this.content.push(e, ...n);
  }
  pop() {
    return this.content.pop();
  }
  static create(e, n, r) {
    return new ga(e, n, r);
  }
}
const Nl = class extends kd {
  /// @internal
  constructor(e) {
    super(), ue(this, dt), ue(this, Rr), ue(this, Ui), ue(this, Ji), ue(this, Gi), ue(this, vr), ue(this, Lr), oe(this, dt, G.none), oe(this, Rr, (n) => n.isText), oe(this, Ui, (n, r) => {
      if (W(this, Rr).call(this, n) && W(this, Rr).call(this, r) && G.sameSet(n.marks, r.marks))
        return this.schema.text(n.text + r.text, n.marks);
    }), oe(this, Ji, (n) => {
      const r = Object.values({
        ...this.schema.nodes,
        ...this.schema.marks
      }).find((i) => i.spec.parseMarkdown.match(n));
      if (!r) throw Vg(n);
      return r;
    }), oe(this, Gi, (n) => {
      const r = W(this, Ji).call(this, n);
      r.spec.parseMarkdown.runner(this, n, r);
    }), this.injectRoot = (n, r, i) => (this.openNode(r, i), this.next(n.children), this), this.openNode = (n, r) => (this.open(ga.create(n, [], r)), this), oe(this, vr, () => {
      oe(this, dt, G.none);
      const n = this.close();
      return W(this, Lr).call(this, n.type, n.attrs, n.content);
    }), this.closeNode = () => {
      try {
        W(this, vr).call(this);
      } catch (n) {
        console.error(n);
      }
      return this;
    }, oe(this, Lr, (n, r, i) => {
      const o = n.createAndFill(r, i, W(this, dt));
      if (!o) throw $g(n, r, i);
      return this.push(o), o;
    }), this.addNode = (n, r, i) => {
      try {
        W(this, Lr).call(this, n, r, i);
      } catch (o) {
        console.error(o);
      }
      return this;
    }, this.openMark = (n, r) => {
      const i = n.create(r);
      return oe(this, dt, i.addToSet(W(this, dt))), this;
    }, this.closeMark = (n) => (oe(this, dt, n.removeFromSet(W(this, dt))), this), this.addText = (n) => {
      try {
        const r = this.top();
        if (!r) throw wh();
        const i = r.pop(), o = this.schema.text(n, W(this, dt));
        if (!i)
          return r.push(o), this;
        const s = W(this, Ui).call(this, i, o);
        return s ? (r.push(s), this) : (r.push(i, o), this);
      } catch (r) {
        return console.error(r), this;
      }
    }, this.build = () => {
      let n;
      do
        n = W(this, vr).call(this);
      while (this.size());
      return n;
    }, this.next = (n = []) => ([n].flat().forEach((r) => W(this, Gi).call(this, r)), this), this.toDoc = () => this.build(), this.run = (n, r) => {
      const i = n.runSync(
        n.parse(r),
        r
      );
      return this.next(i), this;
    }, this.schema = e;
  }
};
dt = /* @__PURE__ */ new WeakMap();
Rr = /* @__PURE__ */ new WeakMap();
Ui = /* @__PURE__ */ new WeakMap();
Ji = /* @__PURE__ */ new WeakMap();
Gi = /* @__PURE__ */ new WeakMap();
vr = /* @__PURE__ */ new WeakMap();
Lr = /* @__PURE__ */ new WeakMap();
Nl.create = (t, e) => {
  const n = new Nl(t);
  return (r) => (n.run(e, r), n.toDoc());
};
let G1 = Nl;
const Il = class extends yd {
  constructor(e, n, r, i = {}) {
    super(), this.type = e, this.children = n, this.value = r, this.props = i, this.push = (o, ...s) => {
      this.children || (this.children = []), this.children.push(o, ...s);
    }, this.pop = () => this.children?.pop();
  }
};
Il.create = (t, e, n, r = {}) => new Il(t, e, n, r);
let Du = Il;
const Y1 = (t) => Object.prototype.hasOwnProperty.call(t, "size"), Al = class extends kd {
  /// @internal
  constructor(e) {
    super(), ue(this, It), ue(this, Pr), ue(this, Yi), ue(this, Qi), ue(this, zr), ue(this, Xi), ue(this, Br), ue(this, Zi), ue(this, eo), ue(this, Xn), ue(this, bn), ue(this, to), ue(this, Fr), oe(this, It, G.none), oe(this, Pr, (n) => {
      const r = Object.values({
        ...this.schema.nodes,
        ...this.schema.marks
      }).find((i) => i.spec.toMarkdown.match(n));
      if (!r) throw Hg(n.type);
      return r;
    }), oe(this, Yi, (n) => W(this, Pr).call(this, n).spec.toMarkdown.runner(this, n)), oe(this, Qi, (n, r) => W(this, Pr).call(this, n).spec.toMarkdown.runner(this, n, r)), oe(this, zr, (n) => {
      const { marks: r } = n, i = (l) => l.type.spec.priority ?? 50;
      [...r].sort((l, a) => i(l) - i(a)).every((l) => !W(this, Qi).call(this, l, n)) && W(this, Yi).call(this, n), r.forEach((l) => W(this, Fr).call(this, l));
    }), oe(this, Xi, (n, r) => {
      if (n.type === r || n.children?.length !== 1) return n;
      const i = (a) => {
        if (a.type === r) return a;
        if (a.children?.length !== 1) return null;
        const [c] = a.children;
        return c ? i(c) : null;
      }, o = i(n);
      if (!o) return n;
      const s = o.children ? [...o.children] : void 0, l = { ...n, children: s };
      return l.children = s, o.children = [l], o;
    }), oe(this, Br, (n) => {
      const { children: r } = n;
      return r && (n.children = r.reduce((i, o, s) => {
        if (s === 0) return [o];
        const l = i.at(-1);
        if (l && l.isMark && o.isMark) {
          o = W(this, Xi).call(this, o, l.type);
          const { children: a, ...c } = o, { children: u, ...f } = l;
          if (o.type === l.type && a && u && JSON.stringify(c) === JSON.stringify(f)) {
            const h = {
              ...f,
              children: [...u, ...a]
            };
            return i.slice(0, -1).concat(W(this, Br).call(this, h));
          }
        }
        return i.concat(o);
      }, [])), n;
    }), oe(this, Zi, (n) => {
      const r = {
        ...n.props,
        type: n.type
      };
      return n.children && (r.children = n.children), n.value && (r.value = n.value), r;
    }), this.openNode = (n, r, i) => (this.open(Du.create(n, void 0, r, i)), this), oe(this, eo, (n, r) => {
      let i = "", o = "";
      const s = n.children;
      let l = -1, a = -1;
      const c = (f) => {
        f && f.forEach((h, d) => {
          h.type === "text" && h.value && (l < 0 && (l = d), a = d);
        });
      };
      if (s) {
        c(s);
        const f = s?.[a], h = s?.[l];
        if (f && f.value.endsWith(" ")) {
          const d = f.value, p = d.trimEnd();
          o = d.slice(p.length), f.value = p;
        }
        if (h && h.value.startsWith(" ")) {
          const d = h.value, p = d.trimStart();
          i = d.slice(0, d.length - p.length), h.value = p;
        }
      }
      i.length && W(this, bn).call(this, "text", void 0, i);
      const u = r();
      return o.length && W(this, bn).call(this, "text", void 0, o), u;
    }), oe(this, Xn, (n = !1) => {
      const r = this.close(), i = () => W(this, bn).call(this, r.type, r.children, r.value, r.props);
      return n ? W(this, eo).call(this, r, i) : i();
    }), this.closeNode = () => (W(this, Xn).call(this), this), oe(this, bn, (n, r, i, o) => {
      const s = Du.create(n, r, i, o), l = W(this, Br).call(this, W(this, Zi).call(this, s));
      return this.push(l), l;
    }), this.addNode = (n, r, i, o) => (W(this, bn).call(this, n, r, i, o), this), oe(this, to, (n, r, i, o) => n.isInSet(W(this, It)) ? this : (oe(this, It, n.addToSet(W(this, It))), this.openNode(r, i, { ...o, isMark: !0 }))), oe(this, Fr, (n) => {
      n.isInSet(W(this, It)) && (oe(this, It, n.type.removeFromSet(W(this, It))), W(this, Xn).call(this, !0));
    }), this.withMark = (n, r, i, o) => (W(this, to).call(this, n, r, i, o), this), this.closeMark = (n) => (W(this, Fr).call(this, n), this), this.build = () => {
      let n = null;
      do
        n = W(this, Xn).call(this);
      while (this.size());
      return n;
    }, this.next = (n) => Y1(n) ? (n.forEach((r) => {
      W(this, zr).call(this, r);
    }), this) : (W(this, zr).call(this, n), this), this.toString = (n) => n.stringify(this.build()), this.run = (n) => (this.next(n), this), this.schema = e;
  }
};
It = /* @__PURE__ */ new WeakMap();
Pr = /* @__PURE__ */ new WeakMap();
Yi = /* @__PURE__ */ new WeakMap();
Qi = /* @__PURE__ */ new WeakMap();
zr = /* @__PURE__ */ new WeakMap();
Xi = /* @__PURE__ */ new WeakMap();
Br = /* @__PURE__ */ new WeakMap();
Zi = /* @__PURE__ */ new WeakMap();
eo = /* @__PURE__ */ new WeakMap();
Xn = /* @__PURE__ */ new WeakMap();
bn = /* @__PURE__ */ new WeakMap();
to = /* @__PURE__ */ new WeakMap();
Fr = /* @__PURE__ */ new WeakMap();
Al.create = (t, e) => {
  const n = new Al(t);
  return (r) => (n.run(r), n.toString(e));
};
let Q1 = Al;
const bd = 65535, wd = Math.pow(2, 16);
function X1(t, e) {
  return t + e * wd;
}
function Ru(t) {
  return t & bd;
}
function Z1(t) {
  return (t - (t & bd)) / wd;
}
const xd = 1, Cd = 2, no = 4, Sd = 8;
class El {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.delInfo = n, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Sd) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (xd | no)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Cd | no)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & no) > 0;
  }
}
class $e {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, n = !1) {
    if (this.ranges = e, this.inverted = n, !e.length && $e.empty)
      return $e.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let n = 0, r = Ru(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Z1(e);
  }
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  map(e, n = 1) {
    return this._map(e, n, !0);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = this.ranges[l + s], f = a + c;
      if (e <= f) {
        let h = c ? e == a ? -1 : e == f ? 1 : n : n, d = a + i + (h < 0 ? 0 : u);
        if (r)
          return d;
        let p = e == (n < 0 ? a : f) ? null : X1(l / 3, e - a), m = e == a ? Cd : e == f ? xd : no;
        return (n < 0 ? e != a : e != f) && (m |= Sd), new El(d, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new El(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = Ru(n), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let n = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + n], u = this.ranges[i + r];
      e(l, l + c, a, a + u), o += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new $e(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? $e.empty : new $e(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
$e.empty = new $e([]);
class li {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, n, r = 0, i = e ? e.length : 0) {
    this.mirror = n, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || n);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, n = this.maps.length) {
    return new li(this._maps, this.mirror, e, n);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, n) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), n != null && this.setMirror(this._maps.length - 1, n);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let n = 0, r = this._maps.length; n < e._maps.length; n++) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n], i != null && i < n ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let n = 0; n < this.mirror.length; n++)
        if (this.mirror[n] == e)
          return this.mirror[n + (n % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, n) {
    this.mirror || (this.mirror = []), this.mirror.push(e, n);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let n = e.maps.length - 1, r = this._maps.length + e._maps.length; n >= 0; n--) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n].invert(), i != null && i > n ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new li();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, n = 1) {
    if (this.mirror)
      return this._map(e, n, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, n);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0;
    for (let o = this.from; o < this.to; o++) {
      let s = this._maps[o], l = s.mapResult(e, n);
      if (l.recover != null) {
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new El(e, i, null);
  }
}
const As = /* @__PURE__ */ Object.create(null);
class Ie {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return $e.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, n) {
    if (!n || !n.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = As[n.stepType];
    if (!r)
      throw new RangeError(`No step type ${n.stepType} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, n) {
    if (e in As)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return As[e] = n, n.prototype.jsonID = e, n;
  }
}
class fe {
  /**
  @internal
  */
  constructor(e, n) {
    this.doc = e, this.failed = n;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new fe(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new fe(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return fe.ok(e.replace(n, r, i));
    } catch (o) {
      if (o instanceof mo)
        return fe.fail(o.message);
      throw o;
    }
  }
}
function ya(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let o = t.child(i);
    o.content.size && (o = o.copy(ya(o.content, e, o))), o.isInline && (o = e(o, n, i)), r.push(o);
  }
  return N.fromArray(r);
}
class Rt extends Ie {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new D(ya(n.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), n.openStart, n.openEnd);
    return fe.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new gt(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Rt(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Rt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Rt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Rt(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Ie.jsonID("addMark", Rt);
class gt extends Ie {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new D(ya(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return fe.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Rt(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new gt(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof gt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new gt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new gt(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Ie.jsonID("removeMark", gt);
class Gt extends Ie {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return fe.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return fe.fromReplace(e, this.pos, this.pos + 1, new D(N.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new Gt(this.pos, n.marks[i]);
        return new Gt(this.pos, this.mark);
      }
    }
    return new Bn(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Gt(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Gt(n.pos, e.markFromJSON(n.mark));
  }
}
Ie.jsonID("addNodeMark", Gt);
class Bn extends Ie {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return fe.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return fe.fromReplace(e, this.pos, this.pos + 1, new D(N.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new Gt(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Bn(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Bn(n.pos, e.markFromJSON(n.mark));
  }
}
Ie.jsonID("removeNodeMark", Bn);
class me extends Ie {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, n, r, i = !1) {
    super(), this.from = e, this.to = n, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && Ol(e, this.from, this.to) ? fe.fail("Structure replace would overwrite content") : fe.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new $e([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new me(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deletedAcross && r.deletedAcross ? null : new me(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof me) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let n = this.slice.size + e.slice.size == 0 ? D.empty : new D(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new me(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? D.empty : new D(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new me(e.from, this.to, n, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new me(n.from, n.to, D.fromJSON(e, n.slice), !!n.structure);
  }
}
Ie.jsonID("replace", me);
class Ne extends Ie {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, n, r, i, o, s, l = !1) {
    super(), this.from = e, this.to = n, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = s, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Ol(e, this.from, this.gapFrom) || Ol(e, this.gapTo, this.to)))
      return fe.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return fe.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? fe.fromReplace(e, this.from, this.to, r) : fe.fail("Content does not fit in gap");
  }
  getMap() {
    return new $e([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let n = this.gapTo - this.gapFrom;
    return new Ne(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || o > r.pos ? null : new Ne(n.pos, r.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new Ne(n.from, n.to, n.gapFrom, n.gapTo, D.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
Ie.jsonID("replaceAround", Ne);
function Ol(t, e, n) {
  let r = t.resolve(e), i = n - e, o = r.depth;
  for (; i > 0 && o > 0 && r.indexAfter(o) == r.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let s = r.node(o).maybeChild(r.indexAfter(o));
    for (; i > 0; ) {
      if (!s || s.isLeaf)
        return !0;
      s = s.firstChild, i--;
    }
  }
  return !1;
}
function ew(t, e, n, r) {
  let i = [], o = [], s, l;
  t.doc.nodesBetween(e, n, (a, c, u) => {
    if (!a.isInline)
      return;
    let f = a.marks;
    if (!r.isInSet(f) && u.type.allowsMarkType(r.type)) {
      let h = Math.max(c, e), d = Math.min(c + a.nodeSize, n), p = r.addToSet(f);
      for (let m = 0; m < f.length; m++)
        f[m].isInSet(p) || (s && s.to == h && s.mark.eq(f[m]) ? s.to = d : i.push(s = new gt(h, d, f[m])));
      l && l.to == h ? l.to = d : o.push(l = new Rt(h, d, r));
    }
  }), i.forEach((a) => t.step(a)), o.forEach((a) => t.step(a));
}
function tw(t, e, n, r) {
  let i = [], o = 0;
  t.doc.nodesBetween(e, n, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof Fo) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, n);
      for (let u = 0; u < a.length; u++) {
        let f = a[u], h;
        for (let d = 0; d < i.length; d++) {
          let p = i[d];
          p.step == o - 1 && f.eq(i[d].style) && (h = p);
        }
        h ? (h.to = c, h.step = o) : i.push({ style: f, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => t.step(new gt(s.from, s.to, s.style)));
}
function ka(t, e, n, r = n.contentMatch, i = !0) {
  let o = t.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      s.push(new me(l, u, D.empty));
    else {
      r = f;
      for (let h = 0; h < c.marks.length; h++)
        n.allowsMarkType(c.marks[h].type) || t.step(new gt(l, u, c.marks[h]));
      if (i && c.isText && n.whitespace != "pre") {
        let h, d = /\r?\n|\r/g, p;
        for (; h = d.exec(c.text); )
          p || (p = new D(N.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), s.push(new me(l + h.index, l + h.index + h[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(N.empty, !0);
    t.replace(l, l, new D(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    t.step(s[a]);
}
function nw(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function Ho(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth; ; --r) {
    let i = t.$from.node(r), o = t.$from.index(r), s = t.$to.indexAfter(r);
    if (r < t.depth && i.canReplace(o, s, n))
      return r;
    if (r == 0 || i.type.spec.isolating || !nw(i, o, s))
      break;
  }
  return null;
}
function rw(t, e, n) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = N.empty, f = 0;
  for (let p = o, m = !1; p > n; p--)
    m || r.index(p) > 0 ? (m = !0, u = N.from(r.node(p).copy(u)), f++) : a--;
  let h = N.empty, d = 0;
  for (let p = o, m = !1; p > n; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, h = N.from(i.node(p).copy(h)), d++) : c++;
  t.step(new Ne(a, c, s, l, new D(u.append(h), f, d), u.size - f, !0));
}
function ba(t, e, n = null, r = t) {
  let i = iw(t, e), o = i && ow(r, e);
  return o ? i.map(vu).concat({ type: e, attrs: n }).concat(o.map(vu)) : null;
}
function vu(t) {
  return { type: t, attrs: null };
}
function iw(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return n.canReplaceWith(r, i, s) ? o : null;
}
function ow(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(n.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function sw(t, e, n) {
  let r = N.empty;
  for (let s = n.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = n[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = N.from(n[s].type.create(n[s].attrs, r));
  }
  let i = e.start, o = e.end;
  t.step(new Ne(i, o, i, o, new D(r, 0, 0), n.length, !0));
}
function lw(t, e, n, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = t.steps.length;
  t.doc.nodesBetween(e, n, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && aw(t.doc, t.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let d = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        d && !p ? c = !1 : !d && p && (c = !0);
      }
      c === !1 && Td(t, s, l, o), ka(t, t.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = t.mapping.slice(o), f = u.map(l, 1), h = u.map(l + s.nodeSize, 1);
      return t.step(new Ne(f, h, f + 1, h - 1, new D(N.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Md(t, s, l, o), !1;
    }
  });
}
function Md(t, e, n, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let a = t.mapping.slice(r).map(n + 1 + o + s.index);
        t.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Td(t, e, n, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = t.mapping.slice(r).map(n + 1 + o);
      t.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function aw(t, e, n) {
  let r = t.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, n);
}
function cw(t, e, n, r, i) {
  let o = t.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  n || (n = o.type);
  let s = n.create(r, null, i || o.marks);
  if (o.isLeaf)
    return t.replaceWith(e, e + o.nodeSize, s);
  if (!n.validContent(o.content))
    throw new RangeError("Invalid content for node type " + n.name);
  t.step(new Ne(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new D(N.from(s), 0, 0), 1, !0));
}
function Ur(t, e, n = 1, r) {
  let i = t.resolve(e), o = i.depth - n, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = n - 2; c > o; c--, u--) {
    let f = i.node(c), h = i.index(c);
    if (f.type.spec.isolating)
      return !1;
    let d = f.content.cutByIndex(h, f.childCount), p = r && r[u + 1];
    p && (d = d.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || f;
    if (!f.canReplace(h + 1, f.childCount) || !m.type.validContent(d))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function uw(t, e, n = 1, r) {
  let i = t.doc.resolve(e), o = N.empty, s = N.empty;
  for (let l = i.depth, a = i.depth - n, c = n - 1; l > a; l--, c--) {
    o = N.from(i.node(l).copy(o));
    let u = r && r[c];
    s = N.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  t.step(new me(e, e, new D(o.append(s), n, n), !0));
}
function Wo(t, e) {
  let n = t.resolve(e), r = n.index();
  return hw(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function fw(t, e) {
  e.content.size || t.type.compatibleContent(e.type);
  let n = t.contentMatchAt(t.childCount), { linebreakReplacement: r } = t.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? t.type.schema.nodes.text : o.type;
    if (n = n.matchType(s), !n || !t.type.allowsMarks(o.marks))
      return !1;
  }
  return n.validEnd;
}
function hw(t, e) {
  return !!(t && e && !t.isLeaf && fw(t, e));
}
function dw(t, e, n) {
  let r = null, { linebreakReplacement: i } = t.doc.type.schema, o = t.doc.resolve(e - n), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", f = !!s.contentMatch.matchType(i);
    u && !f ? r = !1 : !u && f && (r = !0);
  }
  let l = t.steps.length;
  if (r === !1) {
    let u = t.doc.resolve(e + n);
    Td(t, u.node(), u.before(), l);
  }
  s.inlineContent && ka(t, e + n - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = t.mapping.slice(l), c = a.map(e - n);
  if (t.step(new me(c, a.map(e + n, -1), D.empty, !0)), r === !0) {
    let u = t.doc.resolve(c);
    Md(t, u.node(), u.before(), t.steps.length);
  }
  return t;
}
function pw(t, e, n) {
  let r = t.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), n))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.index(i);
      if (r.node(i).canReplaceWith(o, o, n))
        return r.before(i + 1);
      if (o > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.indexAfter(i);
      if (r.node(i).canReplaceWith(o, o, n))
        return r.after(i + 1);
      if (o < r.node(i).childCount)
        return null;
    }
  return null;
}
function mw(t, e, n) {
  let r = t.resolve(e);
  if (!n.content.size)
    return e;
  let i = n.content;
  for (let o = 0; o < n.openStart; o++)
    i = i.firstChild.content;
  for (let o = 1; o <= (n.openStart == 0 && n.size ? 2 : 1); o++)
    for (let s = r.depth; s >= 0; s--) {
      let l = s == r.depth ? 0 : r.pos <= (r.start(s + 1) + r.end(s + 1)) / 2 ? -1 : 1, a = r.index(s) + (l > 0 ? 1 : 0), c = r.node(s), u = !1;
      if (o == 1)
        u = c.canReplace(a, a, i);
      else {
        let f = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = f && c.canReplaceWith(a, a, f[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(s + 1) : r.after(s + 1);
    }
  return null;
}
function jo(t, e, n = e, r = D.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), o = t.resolve(n);
  return Nd(i, o, r) ? new me(e, n, r) : new gw(i, o, r).fit();
}
function Nd(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class gw {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = N.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = N.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), n = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new D(o, s, l);
    return e > -1 ? new Ne(r.pos, e, this.$to.pos, this.$to.end(), a, n) : a.size || r.pos != this.$to.pos ? new me(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let n = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = n.firstChild;
      if (n.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      n = o.content;
    }
    for (let n = 1; n <= 2; n++)
      for (let r = n == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = Es(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, f = null;
          if (n == 1 && (s ? c.matchType(s.type) || (f = c.fillBefore(N.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: f };
          if (n == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Es(e, n);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new D(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Es(e, n);
    if (i.childCount <= 1 && n > 0) {
      let o = e.size - n <= n + i.size;
      this.unplaced = new D(_r(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new D(_r(e, n, 1), n, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: n, parent: r, inject: i, wrap: o }) {
    for (; this.depth > n; )
      this.closeFrontierNode();
    if (o)
      for (let m = 0; m < o.length; m++)
        this.openFrontierNode(o[m]);
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: f, type: h } = this.frontier[n];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      f = f.matchFragment(i);
    }
    let d = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), y = f.matchType(m.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (f = y, u.push(Id(m.mark(h.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? d : -1)));
    }
    let p = c == l.childCount;
    p || (d = -1), this.placed = $r(this.placed, n, N.from(u)), this.frontier[n].match = f, p && d < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, y = l; m < d; m++) {
      let g = y.lastChild;
      this.frontier.push({ type: g.type, match: g.contentMatchAt(g.childCount) }), y = g.content;
    }
    this.unplaced = p ? e == 0 ? D.empty : new D(_r(s.content, e - 1, 1), e - 1, d < 0 ? s.openEnd : e - 1) : new D(_r(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], n;
    if (!e.type.isTextblock || !Os(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (n = this.findCloseLevel(this.$to)) && n.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let n = Math.min(this.depth, e.depth); n >= 0; n--) {
      let { match: r, type: i } = this.frontier[n], o = n < e.depth && e.end(n + 1) == e.pos + (e.depth - (n + 1)), s = Os(e, n, i, r, o);
      if (s) {
        for (let l = n - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = Os(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: n, fit: s, move: o ? e.doc.resolve(e.after(n + 1)) : e };
      }
    }
  }
  close(e) {
    let n = this.findCloseLevel(e);
    if (!n)
      return null;
    for (; this.depth > n.depth; )
      this.closeFrontierNode();
    n.fit.childCount && (this.placed = $r(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = $r(this.placed, this.depth, N.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(N.empty, !0);
    n.childCount && (this.placed = $r(this.placed, this.frontier.length, n));
  }
}
function _r(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(_r(t.firstChild.content, e - 1, n)));
}
function $r(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy($r(t.lastChild.content, e - 1, n)));
}
function Es(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function Id(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Id(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(N.empty, !0)))), t.copy(r);
}
function Os(t, e, n, r, i) {
  let o = t.node(e), s = i ? t.indexAfter(e) : t.index(e);
  if (s == o.childCount && !n.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !yw(n, o.content, s) ? l : null;
}
function yw(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function kw(t) {
  return t.spec.defining || t.spec.definingForContent;
}
function bw(t, e, n, r) {
  if (!r.size)
    return t.deleteRange(e, n);
  let i = t.doc.resolve(e), o = t.doc.resolve(n);
  if (Nd(i, o, r))
    return t.step(new me(e, n, r));
  let s = Ed(i, t.doc.resolve(n));
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let h = i.depth, d = i.pos - 1; h > 0; h--, d--) {
    let p = i.node(h).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(h) > -1 ? l = h : i.before(h) == d && s.splice(1, 0, -h);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let h = r.content, d = 0; ; d++) {
    let p = h.firstChild;
    if (c.push(p), d == r.openStart)
      break;
    h = p.content;
  }
  for (let h = u - 1; h >= 0; h--) {
    let d = c[h], p = kw(d.type);
    if (p && !d.sameMarkup(i.node(Math.abs(l) - 1)))
      u = h;
    else if (p || !d.type.isTextblock)
      break;
  }
  for (let h = r.openStart; h >= 0; h--) {
    let d = (h + u + 1) % (r.openStart + 1), p = c[d];
    if (p)
      for (let m = 0; m < s.length; m++) {
        let y = s[(m + a) % s.length], g = !0;
        y < 0 && (g = !1, y = -y);
        let S = i.node(y - 1), C = i.index(y - 1);
        if (S.canReplaceWith(C, C, p.type, p.marks))
          return t.replace(i.before(y), g ? o.after(y) : n, new D(Ad(r.content, 0, r.openStart, d), d, r.openEnd));
      }
  }
  let f = t.steps.length;
  for (let h = s.length - 1; h >= 0 && (t.replace(e, n, r), !(t.steps.length > f)); h--) {
    let d = s[h];
    d < 0 || (e = i.before(d), n = o.after(d));
  }
}
function Ad(t, e, n, r, i) {
  if (e < n) {
    let o = t.firstChild;
    t = t.replaceChild(0, o.copy(Ad(o.content, e + 1, n, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(t).append(t);
    t = s.append(o.matchFragment(s).fillBefore(N.empty, !0));
  }
  return t;
}
function ww(t, e, n, r) {
  if (!r.isInline && e == n && t.doc.resolve(e).parent.content.size) {
    let i = pw(t.doc, e, r.type);
    i != null && (e = n = i);
  }
  t.replaceRange(e, n, new D(N.from(r), 0, 0));
}
function xw(t, e, n) {
  let r = t.doc.resolve(e), i = t.doc.resolve(n), o = Ed(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], a = s == o.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return t.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return t.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && n > r.end(s) && i.end(s) - n != i.depth - s && r.start(s - 1) == i.start(s - 1) && r.node(s - 1).canReplace(r.index(s - 1), i.index(s - 1)))
      return t.delete(r.before(s), n);
  t.delete(e, n);
}
function Ed(t, e) {
  let n = [], r = Math.min(t.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = t.start(i);
    if (o < t.pos - (t.depth - i) || e.end(i) > e.pos + (e.depth - i) || t.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == t.depth && i == e.depth && t.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && n.push(i);
  }
  return n;
}
class ir extends Ie {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return fe.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in n.attrs)
      r[o] = n.attrs[o];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return fe.fromReplace(e, this.pos, this.pos + 1, new D(N.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return $e.empty;
  }
  invert(e) {
    return new ir(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new ir(n.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.pos != "number" || typeof n.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new ir(n.pos, n.attr, n.value);
  }
}
Ie.jsonID("attr", ir);
class ai extends Ie {
  /**
  Construct an attribute step.
  */
  constructor(e, n) {
    super(), this.attr = e, this.value = n;
  }
  apply(e) {
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      n[i] = e.attrs[i];
    n[this.attr] = this.value;
    let r = e.type.create(n, e.content, e.marks);
    return fe.ok(r);
  }
  getMap() {
    return $e.empty;
  }
  invert(e) {
    return new ai(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new ai(n.attr, n.value);
  }
}
Ie.jsonID("docAttr", ai);
let ur = class extends Error {
};
ur = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
ur.prototype = Object.create(Error.prototype);
ur.prototype.constructor = ur;
ur.prototype.name = "TransformError";
class Od {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new li();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let n = this.maybeStep(e);
    if (n.failed)
      throw new ur(n.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let n = e.apply(this.doc);
    return n.failed || this.addStep(e, n.doc), n;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, n) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = n;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, n = e, r = D.empty) {
    let i = jo(this.doc, e, n, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, n, r) {
    return this.replace(e, n, new D(N.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, n) {
    return this.replace(e, n, D.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, n) {
    return this.replaceWith(e, e, n);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, n, r) {
    return bw(this, e, n, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, n, r) {
    return ww(this, e, n, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, n) {
    return xw(this, e, n), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, n) {
    return rw(this, e, n), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, n = 1) {
    return dw(this, e, n), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, n) {
    return sw(this, e, n), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, n = e, r, i = null) {
    return lw(this, e, n, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, n, r = null, i) {
    return cw(this, e, n, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, n, r) {
    return this.step(new ir(e, n, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, n) {
    return this.step(new ai(e, n)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, n) {
    return this.step(new Gt(e, n)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, n) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (n instanceof G)
      n.isInSet(r.marks) && this.step(new Bn(e, n));
    else {
      let i = r.marks, o, s = [];
      for (; o = n.isInSet(i); )
        s.push(new Bn(e, o)), i = o.removeFromSet(i);
      for (let l = s.length - 1; l >= 0; l--)
        this.step(s[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, n = 1, r) {
    return uw(this, e, n, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, n, r) {
    return ew(this, e, n, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, n, r) {
    return tw(this, e, n, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, n, r) {
    return ka(this, e, n, r), this;
  }
}
const Ds = /* @__PURE__ */ Object.create(null);
class $ {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new Dd(e.min(n), e.max(n))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let n = 0; n < e.length; n++)
      if (e[n].$from.pos != e[n].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, n = D.empty) {
    let r = n.content.lastChild, i = null;
    for (let l = 0; l < n.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? D.empty : n), l == 0 && zu(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, n) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), c = a.map(s.pos), u = a.map(l.pos);
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, n), zu(e, r, n.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, n, r = !1) {
    let i = e.parent.inlineContent ? new H(e) : Zn(e.node(0), e.parent, e.pos, e.index(), n, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = n < 0 ? Zn(e.node(0), e.node(o), e.before(o + 1), e.index(o), n, r) : Zn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, n, r);
      if (s)
        return s;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, n = 1) {
    return this.findFrom(e, n) || this.findFrom(e, -n) || new He(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Zn(e, e, 0, 0, 1) || new He(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Zn(e, e, e.content.size, e.childCount, -1) || new He(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, n) {
    if (!n || !n.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Ds[n.type];
    if (!r)
      throw new RangeError(`No selection type ${n.type} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, n) {
    if (e in Ds)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Ds[e] = n, n.prototype.jsonID = e, n;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return H.between(this.$anchor, this.$head).getBookmark();
  }
}
$.prototype.visible = !0;
class Dd {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let Lu = !1;
function Pu(t) {
  !Lu && !t.parent.inlineContent && (Lu = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class H extends $ {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    Pu(e), Pu(n), super(e, n);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    if (!r.parent.inlineContent)
      return $.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new H(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = D.empty) {
    if (super.replace(e, n), n == D.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof H && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new qo(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number" || typeof n.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new H(e.resolve(n.anchor), e.resolve(n.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, n, r = n) {
    let i = e.resolve(n);
    return new this(i, r == n ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, n, r) {
    let i = e.pos - n.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
      let o = $.findFrom(n, r, !0) || $.findFrom(n, -r, !0);
      if (o)
        n = o.$head;
      else
        return $.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = ($.findFrom(e, -r, !0) || $.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new H(e, n);
  }
}
$.jsonID("text", H);
class qo {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new qo(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return H.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class _ extends $ {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let n = e.nodeAfter, r = e.node(0).resolve(e.pos + n.nodeSize);
    super(e, r), this.node = n;
  }
  map(e, n) {
    let { deleted: r, pos: i } = n.mapResult(this.anchor), o = e.resolve(i);
    return r ? $.near(o) : new _(o);
  }
  content() {
    return new D(N.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof _ && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new wa(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new _(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new _(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
_.prototype.visible = !1;
$.jsonID("node", _);
class wa {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new qo(r, r) : new wa(r);
  }
  resolve(e) {
    let n = e.resolve(this.anchor), r = n.nodeAfter;
    return r && _.isSelectable(r) ? new _(n) : $.near(n);
  }
}
class He extends $ {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = D.empty) {
    if (n == D.empty) {
      e.delete(0, e.doc.content.size);
      let r = $.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, n);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new He(e);
  }
  map(e) {
    return new He(e);
  }
  eq(e) {
    return e instanceof He;
  }
  getBookmark() {
    return Cw;
  }
}
$.jsonID("all", He);
const Cw = {
  map() {
    return this;
  },
  resolve(t) {
    return new He(t);
  }
};
function Zn(t, e, n, r, i, o = !1) {
  if (e.inlineContent)
    return H.create(t, n);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && _.isSelectable(l))
        return _.create(t, n - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Zn(t, l, n + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    n += l.nodeSize * i;
  }
  return null;
}
function zu(t, e, n) {
  let r = t.steps.length - 1;
  if (r < e)
    return;
  let i = t.steps[r];
  if (!(i instanceof me || i instanceof Ne))
    return;
  let o = t.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), t.setSelection($.near(t.doc.resolve(s), n));
}
const Bu = 1, $i = 2, Fu = 4;
class Sw extends Od {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Bu) & ~$i, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Bu) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= $i, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return G.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & $i) > 0;
  }
  /**
  @internal
  */
  addStep(e, n) {
    super.addStep(e, n), this.updated = this.updated & ~$i, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, n = !0) {
    let r = this.selection;
    return n && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || G.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, n, r) {
    let i = this.doc.type.schema;
    if (n == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = n), r = r ?? n, !e)
        return this.deleteRange(n, r);
      let o = this.storedMarks;
      if (!o) {
        let s = this.doc.resolve(n);
        o = r == n ? s.marks() : s.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(n, r, i.text(e, o)), this.selection.empty || this.setSelection($.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, n) {
    return this.meta[typeof e == "string" ? e : e.key] = n, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= Fu, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Fu) > 0;
  }
}
function _u(t, e) {
  return !e || !t ? t : t.bind(e);
}
class Vr {
  constructor(e, n, r) {
    this.name = e, this.init = _u(n.init, r), this.apply = _u(n.apply, r);
  }
}
const Mw = [
  new Vr("doc", {
    init(t) {
      return t.doc || t.schema.topNodeType.createAndFill();
    },
    apply(t) {
      return t.doc;
    }
  }),
  new Vr("selection", {
    init(t, e) {
      return t.selection || $.atStart(e.doc);
    },
    apply(t) {
      return t.selection;
    }
  }),
  new Vr("storedMarks", {
    init(t) {
      return t.storedMarks || null;
    },
    apply(t, e, n, r) {
      return r.selection.$cursor ? t.storedMarks : null;
    }
  }),
  new Vr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(t, e) {
      return t.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Rs {
  constructor(e, n) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Mw.slice(), n && n.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Vr(r.key, r.spec.state, r));
    });
  }
}
class xn {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, n = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != n) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let n = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let o = !1;
      for (let s = 0; s < this.config.plugins.length; s++) {
        let l = this.config.plugins[s];
        if (l.spec.appendTransaction) {
          let a = i ? i[s].n : 0, c = i ? i[s].state : this, u = a < n.length && l.spec.appendTransaction.call(l, a ? n.slice(a) : n, c, r);
          if (u && r.filterTransaction(u, s)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let f = 0; f < this.config.plugins.length; f++)
                i.push(f < s ? { state: r, n: n.length } : { state: this, n: 0 });
            }
            n.push(u), r = r.applyInner(u), o = !0;
          }
          i && (i[s] = { state: r, n: n.length });
        }
      }
      if (!o)
        return { state: r, transactions: n };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let n = new xn(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let o = r[i];
      n[o.name] = o.apply(e, this[o.name], this, n);
    }
    return n;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Sw(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let n = new Rs(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new xn(n);
    for (let i = 0; i < n.fields.length; i++)
      r[n.fields[i].name] = n.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let n = new Rs(this.schema, e.plugins), r = n.fields, i = new xn(n);
    for (let o = 0; o < r.length; o++) {
      let s = r[o].name;
      i[s] = this.hasOwnProperty(s) ? this[s] : r[o].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let n = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (n.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], o = i.spec.state;
        o && o.toJSON && (n[r] = o.toJSON.call(i, this[i.key]));
      }
    return n;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, n, r) {
    if (!n)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Rs(e.schema, e.plugins), o = new xn(i);
    return i.fields.forEach((s) => {
      if (s.name == "doc")
        o.doc = Lt.fromJSON(e.schema, n.doc);
      else if (s.name == "selection")
        o.selection = $.fromJSON(o.doc, n.selection);
      else if (s.name == "storedMarks")
        n.storedMarks && (o.storedMarks = n.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == s.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(n, l)) {
              o[s.name] = c.fromJSON.call(a, e, n[l], o);
              return;
            }
          }
        o[s.name] = s.init(e, o);
      }
    }), o;
  }
}
function Rd(t, e, n) {
  for (let r in t) {
    let i = t[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Rd(i, e, {})), n[r] = i;
  }
  return n;
}
class ye {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Rd(e.props, this, this.props), this.key = e.key ? e.key.key : vd("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const vs = /* @__PURE__ */ Object.create(null);
function vd(t) {
  return t in vs ? t + "$" + ++vs[t] : (vs[t] = 0, t + "$");
}
class he {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = vd(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const xa = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Ld(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const Pd = (t, e, n) => {
  let r = Ld(t, n);
  if (!r)
    return !1;
  let i = Ca(r);
  if (!i) {
    let s = r.blockRange(), l = s && Ho(s);
    return l == null ? !1 : (e && e(t.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Fd(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (fr(o, "end") || _.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = jo(t.doc, r.before(s), r.after(s), D.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = t.tr.step(l);
          a.setSelection(fr(o, "end") ? $.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : _.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Tw = (t, e, n) => {
  let r = Ld(t, n);
  if (!r)
    return !1;
  let i = Ca(r);
  return i ? Nw(t, i, e) : !1;
};
function Nw(t, e, n) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = jo(t.doc, o, a, D.empty);
  if (!c || c.from != o || c instanceof me && c.slice.size >= a - o)
    return !1;
  if (n) {
    let u = t.tr.step(c);
    u.setSelection(H.create(u.doc, o)), n(u.scrollIntoView());
  }
  return !0;
}
function fr(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const zd = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    o = Ca(r);
  }
  let s = o && o.nodeBefore;
  return !s || !_.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(_.create(t.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Ca(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Iw(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const Aw = (t, e, n) => {
  let r = Iw(t, n);
  if (!r)
    return !1;
  let i = Bd(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Fd(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (fr(o, "start") || _.isSelectable(o))) {
    let s = jo(t.doc, r.before(), r.after(), D.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = t.tr.step(s);
        l.setSelection(fr(o, "start") ? $.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : _.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Ew = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Bd(r);
  }
  let s = o && o.nodeAfter;
  return !s || !_.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(_.create(t.doc, o.pos)).scrollIntoView()), !0);
};
function Bd(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      let n = t.node(e);
      if (t.index(e) + 1 < n.childCount)
        return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating)
        break;
    }
  return null;
}
const Ow = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function Sa(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const Dw = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), o = n.indexAfter(-1), s = Sa(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = n.after(), a = t.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection($.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Rw = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof He || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Sa(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = t.tr.insert(s, o.createAndFill());
    l.setSelection(H.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, vw = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let o = n.before();
    if (Ur(t.doc, o))
      return e && e(t.tr.split(o).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && Ho(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
};
function Lw(t) {
  return (e, n) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof _ && e.selection.node.isBlock)
      return !r.parentOffset || !Ur(e.doc, r.pos) ? !1 : (n && n(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let o = [], s, l, a = !1, c = !1;
    for (let d = r.depth; ; d--)
      if (r.node(d).isBlock) {
        a = r.end(d) == r.pos + (r.depth - d), c = r.start(d) == r.pos - (r.depth - d), l = Sa(r.node(d - 1).contentMatchAt(r.indexAfter(d - 1))), o.unshift(a && l ? { type: l } : null), s = d;
        break;
      } else {
        if (d == 1)
          return !1;
        o.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof H || e.selection instanceof He) && u.deleteSelection();
    let f = u.mapping.map(r.pos), h = Ur(u.doc, f, o.length, o);
    if (h || (o[0] = l ? { type: l } : null, h = Ur(u.doc, f, o.length, o)), !h)
      return !1;
    if (u.split(f, o.length, o), !a && c && r.node(s).type != l) {
      let d = u.mapping.map(r.before(s)), p = u.doc.resolve(d);
      l && r.node(s - 1).canReplaceWith(p.index(), p.index() + 1, l) && u.setNodeMarkup(u.mapping.map(r.before(s)), l);
    }
    return n && n(u.scrollIntoView()), !0;
  };
}
const Pw = Lw(), zw = (t, e) => (e && e(t.tr.setSelection(new He(t.doc))), !0);
function Bw(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Wo(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function Fd(t, e, n, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && Bw(t, e, n))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (n) {
      let d = e.pos + o.nodeSize, p = N.empty;
      for (let g = s.length - 1; g >= 0; g--)
        p = N.from(s[g].create(null, p));
      p = N.from(i.copy(p));
      let m = t.tr.step(new Ne(e.pos - 1, d, e.pos, d, new D(p, 1, 0), s.length, !0)), y = m.doc.resolve(d + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && Wo(m.doc, y.pos) && m.join(y.pos), n(m.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : $.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), h = f && Ho(f);
  if (h != null && h >= e.depth)
    return n && n(t.tr.lift(f, h).scrollIntoView()), !0;
  if (c && fr(o, "start", !0) && fr(i, "end")) {
    let d = i, p = [];
    for (; p.push(d), !d.isTextblock; )
      d = d.lastChild;
    let m = o, y = 1;
    for (; !m.isTextblock; m = m.firstChild)
      y++;
    if (d.canReplace(d.childCount, d.childCount, m.content)) {
      if (n) {
        let g = N.empty;
        for (let C = p.length - 1; C >= 0; C--)
          g = N.from(p[C].copy(g));
        let S = t.tr.step(new Ne(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new D(g, p.length, 0), 0, !0));
        n(S.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function _d(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (n && n(e.tr.setSelection(H.create(e.doc, t < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Fw = _d(-1), _w = _d(1);
function Ma(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o), l = s && ba(s, t, e);
    return l ? (r && r(n.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function ci(t, e = null) {
  return function(n, r) {
    let i = !1;
    for (let o = 0; o < n.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = n.selection.ranges[o];
      n.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(t, e)))
          if (a.type == t)
            i = !0;
          else {
            let u = n.doc.resolve(c), f = u.index();
            i = u.parent.canReplaceWith(f, f + 1, t);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = n.tr;
      for (let s = 0; s < n.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = n.selection.ranges[s];
        o.setBlockType(l, a, t, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
function $w(t, e, n, r) {
  for (let i = 0; i < e.length; i++) {
    let { $from: o, $to: s } = e[i], l = o.depth == 0 ? t.inlineContent && t.type.allowsMarkType(n) : !1;
    if (t.nodesBetween(o.pos, s.pos, (a, c) => {
      if (l)
        return !1;
      l = a.inlineContent && a.type.allowsMarkType(n);
    }), l)
      return !0;
  }
  return !1;
}
function wi(t, e = null, n) {
  return function(r, i) {
    let { empty: o, $cursor: s, ranges: l } = r.selection;
    if (o && !s || !$w(r.doc, l, t))
      return !1;
    if (i)
      if (s)
        t.isInSet(r.storedMarks || s.marks()) ? i(r.tr.removeStoredMark(t)) : i(r.tr.addStoredMark(t.create(e)));
      else {
        let a, c = r.tr;
        a = !l.some((u) => r.doc.rangeHasMark(u.$from.pos, u.$to.pos, t));
        for (let u = 0; u < l.length; u++) {
          let { $from: f, $to: h } = l[u];
          if (!a)
            c.removeMark(f.pos, h.pos, t);
          else {
            let d = f.pos, p = h.pos, m = f.nodeAfter, y = h.nodeBefore, g = m && m.isText ? /^\s*/.exec(m.text)[0].length : 0, S = y && y.isText ? /\s*$/.exec(y.text)[0].length : 0;
            d + g < p && (d += g, p -= S), c.addMark(d, p, t.create(e));
          }
        }
        i(c.scrollIntoView());
      }
    return !0;
  };
}
function mr(...t) {
  return function(e, n, r) {
    for (let i = 0; i < t.length; i++)
      if (t[i](e, n, r))
        return !0;
    return !1;
  };
}
let Ls = mr(xa, Pd, zd), $u = mr(xa, Aw, Ew);
const Ot = {
  Enter: mr(Ow, Rw, vw, Pw),
  "Mod-Enter": Dw,
  Backspace: Ls,
  "Mod-Backspace": Ls,
  "Shift-Backspace": Ls,
  Delete: $u,
  "Mod-Delete": $u,
  "Mod-a": zw
}, $d = {
  "Ctrl-h": Ot.Backspace,
  "Alt-Backspace": Ot["Mod-Backspace"],
  "Ctrl-d": Ot.Delete,
  "Ctrl-Alt-Backspace": Ot["Mod-Delete"],
  "Alt-Delete": Ot["Mod-Delete"],
  "Alt-d": Ot["Mod-Delete"],
  "Ctrl-a": Fw,
  "Ctrl-e": _w
};
for (let t in Ot)
  $d[t] = Ot[t];
const Vw = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform ? os.platform() == "darwin" : !1, Hw = Vw ? $d : Ot;
class qe {
  /**
  Create an input rule. The rule applies when the user typed
  something and the text directly in front of the cursor matches
  `match`, which should end with `$`.
  
  The `handler` can be a string, in which case the matched text, or
  the first matched group in the regexp, is replaced by that
  string.
  
  Or a it can be a function, which will be called with the match
  array produced by
  [`RegExp.exec`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec),
  as well as the start and end of the matched range, and which can
  return a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) that describes the
  rule's effect, or null to indicate the input was not handled.
  */
  constructor(e, n, r = {}) {
    this.match = e, this.match = e, this.handler = typeof n == "string" ? Ww(n) : n, this.undoable = r.undoable !== !1, this.inCode = r.inCode || !1, this.inCodeMark = r.inCodeMark !== !1;
  }
}
function Ww(t) {
  return function(e, n, r, i) {
    let o = t;
    if (n[1]) {
      let s = n[0].lastIndexOf(n[1]);
      o += n[0].slice(s + n[1].length), r += s;
      let l = r - i;
      l > 0 && (o = n[0].slice(s - l, s) + o, r = i);
    }
    return e.tr.insertText(o, r, i);
  };
}
const jw = (t, e) => {
  let n = t.plugins;
  for (let r = 0; r < n.length; r++) {
    let i = n[r], o;
    if (i.spec.isInputRules && (o = i.getState(t))) {
      if (e) {
        let s = t.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a--)
          s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          let a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, t.schema.text(o.text, a));
        } else
          s.delete(o.from, o.to);
        e(s);
      }
      return !0;
    }
  }
  return !1;
};
new qe(/--$/, "—", { inCodeMark: !1 });
new qe(/\.\.\.$/, "…", { inCodeMark: !1 });
new qe(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“", { inCodeMark: !1 });
new qe(/"$/, "”", { inCodeMark: !1 });
new qe(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘", { inCodeMark: !1 });
new qe(/'$/, "’", { inCodeMark: !1 });
function Ta(t, e, n = null, r) {
  return new qe(t, (i, o, s, l) => {
    let a = n instanceof Function ? n(o) : n, c = i.tr.delete(s, l), u = c.doc.resolve(s), f = u.blockRange(), h = f && ba(f, e, a);
    if (!h)
      return null;
    c.wrap(f, h);
    let d = c.doc.resolve(s - 1).nodeBefore;
    return d && d.type == e && Wo(c.doc, s - 1) && (!r || r(o, d)) && c.join(s - 1), c;
  });
}
function Vd(t, e, n = null) {
  return new qe(t, (r, i, o, s) => {
    let l = r.doc.resolve(o), a = n instanceof Function ? n(i) : n;
    return l.node(-1).canReplaceWith(l.index(-1), l.indexAfter(-1), e) ? r.tr.delete(o, s).setBlockType(o, o, e, a) : null;
  });
}
const on = typeof navigator < "u" ? navigator : null, Vu = typeof document < "u" ? document : null, jn = on && on.userAgent || "", Dl = /Edge\/(\d+)/.exec(jn), Hd = /MSIE \d/.exec(jn), Rl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(jn), Na = !!(Hd || Rl || Dl);
Hd ? document.documentMode : Rl ? +Rl[1] : Dl && +Dl[1];
const qw = !Na && /gecko\/(\d+)/i.test(jn);
qw && +(/Firefox\/(\d+)/.exec(jn) || [0, 0])[1];
const Hu = !Na && /Chrome\/(\d+)/.exec(jn);
Hu && +Hu[1];
const Kw = !Na && !!on && /Apple Computer/.test(on.vendor), Uw = Kw && (/Mobile\/\w+/.test(jn) || !!on && on.maxTouchPoints > 2);
Uw || on && /Mac/.test(on.platform);
const Jw = !!Vu && "webkitFontSmoothing" in Vu.documentElement.style;
Jw && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
function Ps(t, e, n, r, i, o) {
  if (t.composing) return !1;
  const s = t.state, l = s.doc.resolve(e);
  if (l.parent.type.spec.code) return !1;
  const a = l.parent.textBetween(
    Math.max(0, l.parentOffset - 500),
    l.parentOffset,
    void 0,
    "￼"
  ) + r;
  for (let c of i) {
    const u = c, f = u.match.exec(a), h = f && f[0] && u.handler(s, f, e - (f[0].length - r.length), n);
    if (h)
      return u.undoable !== !1 && h.setMeta(o, { transform: h, from: e, to: n, text: r }), t.dispatch(h), !0;
  }
  return !1;
}
const Gw = new he("MILKDOWN_CUSTOM_INPUTRULES");
function Yw({ rules: t }) {
  const e = new ye({
    key: Gw,
    isInputRules: !0,
    state: {
      init() {
        return null;
      },
      apply(n, r) {
        const i = n.getMeta(this);
        return i || (n.selectionSet || n.docChanged ? null : r);
      }
    },
    props: {
      handleTextInput(n, r, i, o) {
        return Ps(n, r, i, o, t, e);
      },
      handleDOMEvents: {
        compositionend: (n) => (setTimeout(() => {
          const { $cursor: r } = n.state.selection;
          r && Ps(n, r.pos, r.pos, "", t, e);
        }), !1)
      },
      handleKeyDown(n, r) {
        if (r.key !== "Enter") return !1;
        const { $cursor: i } = n.state.selection;
        return i ? Ps(n, i.pos, i.pos, `
`, t, e) : !1;
      }
    }
  });
  return e;
}
function gr(t, e, n = {}) {
  return new qe(t, (r, i, o, s) => {
    var l, a, c, u;
    const { tr: f } = r, h = i.length;
    let d = i[h - 1], p = i[0], m = [], y = s;
    const g = {
      group: d,
      fullMatch: p,
      start: o,
      end: s
    }, S = (l = n.updateCaptured) == null ? void 0 : l.call(n, g);
    if (Object.assign(g, S), { group: d, fullMatch: p, start: o, end: s } = g, p === null || d?.trim() === "") return null;
    if (d) {
      const C = p.search(/\S/), I = o + p.indexOf(d), A = I + d.length;
      m = (a = f.storedMarks) != null ? a : [], A < s && f.delete(A, s), I > o && f.delete(o + C, I), y = o + C + d.length;
      const x = (c = n.getAttr) == null ? void 0 : c.call(n, i);
      f.addMark(o, y, e.create(x)), f.setStoredMarks(m), (u = n.beforeDispatch) == null || u.call(n, { match: i, start: o, end: s, tr: f });
    }
    return f;
  });
}
var Qw = Object.defineProperty, Xw = Object.defineProperties, Zw = Object.getOwnPropertyDescriptors, Wu = Object.getOwnPropertySymbols, ex = Object.prototype.hasOwnProperty, tx = Object.prototype.propertyIsEnumerable, ju = (t, e, n) => e in t ? Qw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, nx = (t, e) => {
  for (var n in e || (e = {}))
    ex.call(e, n) && ju(t, n, e[n]);
  if (Wu)
    for (var n of Wu(e))
      tx.call(e, n) && ju(t, n, e[n]);
  return t;
}, rx = (t, e) => Xw(t, Zw(e));
function qu(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function ix(t, e, n) {
  const i = t.state.doc.content.size, o = qu(e, 0, i), s = qu(n, 0, i), l = t.coordsAtPos(o), a = t.coordsAtPos(s, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), f = Math.min(l.left, a.left), h = Math.max(l.right, a.right), d = h - f, p = u - c, g = {
    top: c,
    bottom: u,
    left: f,
    right: h,
    width: d,
    height: p,
    x: f,
    y: c
  };
  return rx(nx({}, g), {
    toJSON: () => g
  });
}
function Wd(t) {
  return Object.assign(Object.create(t), t).setTime(Date.now());
}
function ox(t, e) {
  return Array.isArray(t) && t.includes(e.type) || e.type === t;
}
function sx(t) {
  if (t.content.childCount === 1) {
    const e = t.content.firstChild;
    if (e?.type.name === "text" && e.marks.length === 0) return e;
    if (e?.type.name === "paragraph" && e.childCount === 1) {
      const n = e.firstChild;
      if (n?.type.name === "text" && n.marks.length === 0) return n;
    }
  }
  return !1;
}
function lx(t) {
  return (e) => {
    for (let n = e.depth; n > 0; n -= 1) {
      const r = e.node(n);
      if (t(r)) {
        const i = e.before(n), o = e.after(n);
        return {
          from: i,
          to: o,
          node: r
        };
      }
    }
  };
}
function ax(t, e) {
  return lx((n) => n.type === e)(t);
}
function cx(t, e) {
  const n = e.nodes[t];
  if (!n) throw Wg("node", t);
  return n;
}
function jd(t) {
  return (e) => {
    for (let n = e.depth; n > 0; n--) {
      const r = e.node(n);
      if (t(r))
        return {
          pos: n > 0 ? e.before(n) : 0,
          start: e.start(n),
          depth: n,
          node: r
        };
    }
  };
}
function ux(t, e) {
  if (!(t instanceof _)) return;
  const { node: n, $from: r } = t;
  if (ox(e, n))
    return {
      node: n,
      pos: r.pos,
      start: r.start(r.depth),
      depth: r.depth
    };
}
const fx = (t, e) => {
  const { selection: n, doc: r } = t;
  if (n instanceof _)
    return {
      hasNode: n.node.type === e,
      pos: n.from,
      target: n.node
    };
  const { from: i, to: o } = n;
  let s = !1, l = -1, a = null;
  return r.nodesBetween(i, o, (c, u) => a ? !1 : c.type === e ? (s = !0, l = u, a = c, !1) : !0), {
    hasNode: s,
    pos: l,
    target: a
  };
};
var sn = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, wo = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, hx = typeof navigator < "u" && /Mac/.test(navigator.platform), dx = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var we = 0; we < 10; we++) sn[48 + we] = sn[96 + we] = String(we);
for (var we = 1; we <= 24; we++) sn[we + 111] = "F" + we;
for (var we = 65; we <= 90; we++)
  sn[we] = String.fromCharCode(we + 32), wo[we] = String.fromCharCode(we);
for (var zs in sn) wo.hasOwnProperty(zs) || (wo[zs] = sn[zs]);
function px(t) {
  var e = hx && t.metaKey && t.shiftKey && !t.ctrlKey && !t.altKey || dx && t.shiftKey && t.key && t.key.length == 1 || t.key == "Unidentified", n = !e && t.key || (t.shiftKey ? wo : sn)[t.keyCode] || t.key || "Unidentified";
  return n == "Esc" && (n = "Escape"), n == "Del" && (n = "Delete"), n == "Left" && (n = "ArrowLeft"), n == "Up" && (n = "ArrowUp"), n == "Right" && (n = "ArrowRight"), n == "Down" && (n = "ArrowDown"), n;
}
const mx = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), gx = typeof navigator < "u" && /Win/.test(navigator.platform);
function yx(t) {
  let e = t.split(/-(?!$)/), n = e[e.length - 1];
  n == "Space" && (n = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      mx ? s = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), s && (n = "Meta-" + n), o && (n = "Shift-" + n), n;
}
function kx(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t)
    e[yx(n)] = t[n];
  return e;
}
function Bs(t, e, n = !0) {
  return e.altKey && (t = "Alt-" + t), e.ctrlKey && (t = "Ctrl-" + t), e.metaKey && (t = "Meta-" + t), n && e.shiftKey && (t = "Shift-" + t), t;
}
function bx(t) {
  return new ye({ props: { handleKeyDown: qd(t) } });
}
function qd(t) {
  let e = kx(t);
  return function(n, r) {
    let i = px(r), o, s = e[Bs(i, r)];
    if (s && s(n.state, n.dispatch, n))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Bs(i, r, !1)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(gx && r.ctrlKey && r.altKey) && (o = sn[r.keyCode]) && o != i) {
        let l = e[Bs(o, r)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
    }
    return !1;
  };
}
const xe = function(t) {
  for (var e = 0; ; e++)
    if (t = t.previousSibling, !t)
      return e;
}, hr = function(t) {
  let e = t.assignedSlot || t.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let vl = null;
const Et = function(t, e, n) {
  let r = vl || (vl = document.createRange());
  return r.setEnd(t, n ?? t.nodeValue.length), r.setStart(t, e || 0), r;
}, wx = function() {
  vl = null;
}, Fn = function(t, e, n, r) {
  return n && (Ku(t, e, n, r, -1) || Ku(t, e, n, r, 1));
}, xx = /^(img|br|input|textarea|hr)$/i;
function Ku(t, e, n, r, i) {
  for (var o; ; ) {
    if (t == n && e == r)
      return !0;
    if (e == (i < 0 ? 0 : Ge(t))) {
      let s = t.parentNode;
      if (!s || s.nodeType != 1 || xi(t) || xx.test(t.nodeName) || t.contentEditable == "false")
        return !1;
      e = xe(t) + (i < 0 ? 0 : 1), t = s;
    } else if (t.nodeType == 1) {
      let s = t.childNodes[e + (i < 0 ? -1 : 0)];
      if (s.nodeType == 1 && s.contentEditable == "false")
        if (!((o = s.pmViewDesc) === null || o === void 0) && o.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        t = s, e = i < 0 ? Ge(t) : 0;
    } else
      return !1;
  }
}
function Ge(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function Cx(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e)
      return t;
    if (t.nodeType == 1 && e > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e - 1], e = Ge(t);
    } else if (t.parentNode && !xi(t))
      e = xe(t), t = t.parentNode;
    else
      return null;
  }
}
function Sx(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e < t.nodeValue.length)
      return t;
    if (t.nodeType == 1 && e < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e], e = 0;
    } else if (t.parentNode && !xi(t))
      e = xe(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
function Mx(t, e, n) {
  for (let r = e == 0, i = e == Ge(t); r || i; ) {
    if (t == n)
      return !0;
    let o = xe(t);
    if (t = t.parentNode, !t)
      return !1;
    r = r && o == 0, i = i && o == Ge(t);
  }
}
function xi(t) {
  let e;
  for (let n = t; n && !(e = n.pmViewDesc); n = n.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == t || e.contentDOM == t);
}
const Ko = function(t) {
  return t.focusNode && Fn(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset);
};
function wn(t, e) {
  let n = document.createEvent("Event");
  return n.initEvent("keydown", !0, !0), n.keyCode = t, n.key = n.code = e, n;
}
function Tx(t) {
  let e = t.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Nx(t, e, n) {
  if (t.caretPositionFromPoint)
    try {
      let r = t.caretPositionFromPoint(e, n);
      if (r)
        return { node: r.offsetNode, offset: Math.min(Ge(r.offsetNode), r.offset) };
    } catch {
    }
  if (t.caretRangeFromPoint) {
    let r = t.caretRangeFromPoint(e, n);
    if (r)
      return { node: r.startContainer, offset: Math.min(Ge(r.startContainer), r.startOffset) };
  }
}
const kt = typeof navigator < "u" ? navigator : null, Uu = typeof document < "u" ? document : null, cn = kt && kt.userAgent || "", Ll = /Edge\/(\d+)/.exec(cn), Kd = /MSIE \d/.exec(cn), Pl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(cn), Pe = !!(Kd || Pl || Ll), Zt = Kd ? document.documentMode : Pl ? +Pl[1] : Ll ? +Ll[1] : 0, Ye = !Pe && /gecko\/(\d+)/i.test(cn);
Ye && +(/Firefox\/(\d+)/.exec(cn) || [0, 0])[1];
const zl = !Pe && /Chrome\/(\d+)/.exec(cn), Me = !!zl, Ud = zl ? +zl[1] : 0, Ee = !Pe && !!kt && /Apple Computer/.test(kt.vendor), dr = Ee && (/Mobile\/\w+/.test(cn) || !!kt && kt.maxTouchPoints > 2), Ue = dr || (kt ? /Mac/.test(kt.platform) : !1), Ix = kt ? /Win/.test(kt.platform) : !1, vt = /Android \d/.test(cn), Ci = !!Uu && "webkitFontSmoothing" in Uu.documentElement.style, Ax = Ci ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ex(t) {
  let e = t.defaultView && t.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: t.documentElement.clientWidth,
    top: 0,
    bottom: t.documentElement.clientHeight
  };
}
function Nt(t, e) {
  return typeof t == "number" ? t : t[e];
}
function Ox(t) {
  let e = t.getBoundingClientRect(), n = e.width / t.offsetWidth || 1, r = e.height / t.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + t.clientWidth * n,
    top: e.top,
    bottom: e.top + t.clientHeight * r
  };
}
function Ju(t, e, n) {
  let r = t.someProp("scrollThreshold") || 0, i = t.someProp("scrollMargin") || 5, o = t.dom.ownerDocument;
  for (let s = n || t.dom; s; ) {
    if (s.nodeType != 1) {
      s = hr(s);
      continue;
    }
    let l = s, a = l == o.body, c = a ? Ex(o) : Ox(l), u = 0, f = 0;
    if (e.top < c.top + Nt(r, "top") ? f = -(c.top - e.top + Nt(i, "top")) : e.bottom > c.bottom - Nt(r, "bottom") && (f = e.bottom - e.top > c.bottom - c.top ? e.top + Nt(i, "top") - c.top : e.bottom - c.bottom + Nt(i, "bottom")), e.left < c.left + Nt(r, "left") ? u = -(c.left - e.left + Nt(i, "left")) : e.right > c.right - Nt(r, "right") && (u = e.right - c.right + Nt(i, "right")), u || f)
      if (a)
        o.defaultView.scrollBy(u, f);
      else {
        let d = l.scrollLeft, p = l.scrollTop;
        f && (l.scrollTop += f), u && (l.scrollLeft += u);
        let m = l.scrollLeft - d, y = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - y, right: e.right - m, bottom: e.bottom - y };
      }
    let h = a ? "fixed" : getComputedStyle(s).position;
    if (/^(fixed|sticky)$/.test(h))
      break;
    s = h == "absolute" ? s.offsetParent : hr(s);
  }
}
function Dx(t) {
  let e = t.dom.getBoundingClientRect(), n = Math.max(0, e.top), r, i;
  for (let o = (e.left + e.right) / 2, s = n + 1; s < Math.min(innerHeight, e.bottom); s += 5) {
    let l = t.root.elementFromPoint(o, s);
    if (!l || l == t.dom || !t.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= n - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Jd(t.dom) };
}
function Jd(t) {
  let e = [], n = t.ownerDocument;
  for (let r = t; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), t != n); r = hr(r))
    ;
  return e;
}
function Rx({ refDOM: t, refTop: e, stack: n }) {
  let r = t ? t.getBoundingClientRect().top : 0;
  Gd(n, r == 0 ? 0 : r - e);
}
function Gd(t, e) {
  for (let n = 0; n < t.length; n++) {
    let { dom: r, top: i, left: o } = t[n];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != o && (r.scrollLeft = o);
  }
}
let Yn = null;
function vx(t) {
  if (t.setActive)
    return t.setActive();
  if (Yn)
    return t.focus(Yn);
  let e = Jd(t);
  t.focus(Yn == null ? {
    get preventScroll() {
      return Yn = { preventScroll: !0 }, !0;
    }
  } : void 0), Yn || (Yn = !1, Gd(e, 0));
}
function Yd(t, e) {
  let n, r = 2e8, i, o = 0, s = e.top, l = e.top, a, c;
  for (let u = t.firstChild, f = 0; u; u = u.nextSibling, f++) {
    let h;
    if (u.nodeType == 1)
      h = u.getClientRects();
    else if (u.nodeType == 3)
      h = Et(u).getClientRects();
    else
      continue;
    for (let d = 0; d < h.length; d++) {
      let p = h[d];
      if (p.top <= s && p.bottom >= l) {
        s = Math.max(p.bottom, s), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          n = u, r = m, i = m && n.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (o = f + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !n && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (o = f + 1);
    }
  }
  return !n && a && (n = a, i = c, r = 0), n && n.nodeType == 3 ? Lx(n, i) : !n || r && n.nodeType == 1 ? { node: t, offset: o } : Yd(n, i);
}
function Lx(t, e) {
  let n = t.nodeValue.length, r = document.createRange();
  for (let i = 0; i < n; i++) {
    r.setEnd(t, i + 1), r.setStart(t, i);
    let o = jt(r, 1);
    if (o.top != o.bottom && Ia(e, o))
      return { node: t, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
  }
  return { node: t, offset: 0 };
}
function Ia(t, e) {
  return t.left >= e.left - 1 && t.left <= e.right + 1 && t.top >= e.top - 1 && t.top <= e.bottom + 1;
}
function Px(t, e) {
  let n = t.parentNode;
  return n && /^li$/i.test(n.nodeName) && e.left < t.getBoundingClientRect().left ? n : t;
}
function zx(t, e, n) {
  let { node: r, offset: i } = Yd(e, n), o = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let s = r.getBoundingClientRect();
    o = s.left != s.right && n.left > (s.left + s.right) / 2 ? 1 : -1;
  }
  return t.docView.posFromDOM(r, i, o);
}
function Bx(t, e, n, r) {
  let i = -1;
  for (let o = e, s = !1; o != t.dom; ) {
    let l = t.docView.nearestDesc(o, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!s && a.left > r.left || a.top > r.top ? i = l.posBefore : (!s && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), s = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    o = l.dom.parentNode;
  }
  return i > -1 ? i : t.docView.posFromDOM(e, n, -1);
}
function Qd(t, e, n) {
  let r = t.childNodes.length;
  if (r && n.top < n.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - n.top) / (n.bottom - n.top)) - 2)), o = i; ; ) {
      let s = t.childNodes[o];
      if (s.nodeType == 1) {
        let l = s.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Ia(e, c))
            return Qd(s, e, c);
        }
      }
      if ((o = (o + 1) % r) == i)
        break;
    }
  return t;
}
function Fx(t, e) {
  let n = t.dom.ownerDocument, r, i = 0, o = Nx(n, e.left, e.top);
  o && ({ node: r, offset: i } = o);
  let s = (t.root.elementFromPoint ? t.root : n).elementFromPoint(e.left, e.top), l;
  if (!s || !t.dom.contains(s.nodeType != 1 ? s.parentNode : s)) {
    let c = t.dom.getBoundingClientRect();
    if (!Ia(e, c) || (s = Qd(t.dom, e, c), !s))
      return null;
  }
  if (Ee)
    for (let c = s; r && c; c = hr(c))
      c.draggable && (r = void 0);
  if (s = Px(s, e), r) {
    if (Ye && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], f;
      u.nodeName == "IMG" && (f = u.getBoundingClientRect()).right <= e.left && f.bottom > e.top && i++;
    }
    let c;
    Ci && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == t.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = t.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Bx(t, r, i, e));
  }
  l == null && (l = zx(t, s, e));
  let a = t.docView.nearestDesc(s, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Gu(t) {
  return t.top < t.bottom || t.left < t.right;
}
function jt(t, e) {
  let n = t.getClientRects();
  if (n.length) {
    let r = n[e < 0 ? 0 : n.length - 1];
    if (Gu(r))
      return r;
  }
  return Array.prototype.find.call(n, Gu) || t.getBoundingClientRect();
}
const _x = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Xd(t, e, n) {
  let { node: r, offset: i, atom: o } = t.docView.domFromPos(e, n < 0 ? -1 : 1), s = Ci || Ye;
  if (r.nodeType == 3)
    if (s && (_x.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
      let a = jt(Et(r, i, i), n);
      if (Ye && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = jt(Et(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = jt(Et(r, i, i + 1), -1);
          if (u.top != a.top)
            return Ar(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = n < 0 ? 1 : -1;
      return n < 0 && !i ? (c++, u = -1) : n >= 0 && i == r.nodeValue.length ? (a--, u = 1) : n < 0 ? a-- : c++, Ar(jt(Et(r, a, c), u), u < 0);
    }
  if (!t.state.doc.resolve(e - (o || 0)).parent.inlineContent) {
    if (o == null && i && (n < 0 || i == Ge(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return Fs(a.getBoundingClientRect(), !1);
    }
    if (o == null && i < Ge(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return Fs(a.getBoundingClientRect(), !0);
    }
    return Fs(r.getBoundingClientRect(), n >= 0);
  }
  if (o == null && i && (n < 0 || i == Ge(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? Et(a, Ge(a) - (s ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return Ar(jt(c, 1), !1);
  }
  if (o == null && i < Ge(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Et(a, 0, s ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return Ar(jt(c, -1), !0);
  }
  return Ar(jt(r.nodeType == 3 ? Et(r) : r, -n), n >= 0);
}
function Ar(t, e) {
  if (t.width == 0)
    return t;
  let n = e ? t.left : t.right;
  return { top: t.top, bottom: t.bottom, left: n, right: n };
}
function Fs(t, e) {
  if (t.height == 0)
    return t;
  let n = e ? t.top : t.bottom;
  return { top: n, bottom: n, left: t.left, right: t.right };
}
function Zd(t, e, n) {
  let r = t.state, i = t.root.activeElement;
  r != e && t.updateState(e), i != t.dom && t.focus();
  try {
    return n();
  } finally {
    r != e && t.updateState(r), i != t.dom && i && i.focus();
  }
}
function $x(t, e, n) {
  let r = e.selection, i = n == "up" ? r.$from : r.$to;
  return Zd(t, e, () => {
    let { node: o } = t.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
    for (; ; ) {
      let l = t.docView.nearestDesc(o, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        o = l.contentDOM || l.dom;
        break;
      }
      o = l.dom.parentNode;
    }
    let s = Xd(t, i.pos, 1);
    for (let l = o.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Et(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (n == "up" ? s.top - u.top > (u.bottom - s.top) * 2 : u.bottom - s.bottom > (s.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Vx = /[\u0590-\u08ac]/;
function Hx(t, e, n) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, o = !i, s = i == r.parent.content.size, l = t.domSelection();
  return l ? !Vx.test(r.parent.textContent) || !l.modify ? n == "left" || n == "backward" ? o : s : Zd(t, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: f } = t.domSelectionRange(), h = l.caretBidiLevel;
    l.modify("move", n, "character");
    let d = r.depth ? t.docView.domAfterPos(r.before()) : t.dom, { focusNode: p, focusOffset: m } = t.domSelectionRange(), y = p && !d.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, f), a && (a != u || c != f) && l.extend && l.extend(a, c);
    } catch {
    }
    return h != null && (l.caretBidiLevel = h), y;
  }) : r.pos == r.start() || r.pos == r.end();
}
let Yu = null, Qu = null, Xu = !1;
function Wx(t, e, n) {
  return Yu == e && Qu == n ? Xu : (Yu = e, Qu = n, Xu = n == "up" || n == "down" ? $x(t, e, n) : Hx(t, e, n));
}
const Qe = 0, Zu = 1, Cn = 2, bt = 3;
class Si {
  constructor(e, n, r, i) {
    this.parent = e, this.children = n, this.dom = r, this.contentDOM = i, this.dirty = Qe, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, n, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let n = 0; n < this.children.length; n++)
      e += this.children[n].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let n = 0, r = this.posAtStart; ; n++) {
      let i = this.children[n];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, n, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[n - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.previousSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.previousSibling;
        return o ? this.posBeforeChild(s) + s.size : this.posAtStart;
      } else {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[n];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.nextSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.nextSibling;
        return o ? this.posBeforeChild(s) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = n > xe(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (n == 0)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !1;
            break;
          }
          if (o.previousSibling)
            break;
        }
      if (i == null && n == e.childNodes.length)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !0;
            break;
          }
          if (o.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, n = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let o = this.getDesc(i), s;
      if (o && (!n || o.node))
        if (r && (s = o.nodeDOM) && !(s.nodeType == 1 ? s.contains(e.nodeType == 1 ? e : e.parentNode) : s == e))
          r = !1;
        else
          return o;
    }
  }
  getDesc(e) {
    let n = e.pmViewDesc;
    for (let r = n; r; r = r.parent)
      if (r == this)
        return n;
  }
  posFromDOM(e, n, r) {
    for (let i = e; i; i = i.parentNode) {
      let o = this.getDesc(i);
      if (o)
        return o.localPosFromDOM(e, n, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let n = 0, r = 0; n < this.children.length; n++) {
      let i = this.children[n], o = r + i.size;
      if (r == e && o != r) {
        for (; !i.border && i.children.length; )
          for (let s = 0; s < i.children.length; s++) {
            let l = i.children[s];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < o)
        return i.descAt(e - r - i.border);
      r = o;
    }
  }
  domFromPos(e, n) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let o = 0; r < this.children.length; r++) {
      let s = this.children[r], l = o + s.size;
      if (l > e || s instanceof tp) {
        i = e - o;
        break;
      }
      o = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, n);
    for (let o; r && !(o = this.children[r - 1]).size && o instanceof ep && o.side >= 0; r--)
      ;
    if (n <= 0) {
      let o, s = !0;
      for (; o = r ? this.children[r - 1] : null, !(!o || o.dom.parentNode == this.contentDOM); r--, s = !1)
        ;
      return o && n && s && !o.border && !o.domAtom ? o.domFromPos(o.size, n) : { node: this.contentDOM, offset: o ? xe(o.dom) + 1 : 0 };
    } else {
      let o, s = !0;
      for (; o = r < this.children.length ? this.children[r] : null, !(!o || o.dom.parentNode == this.contentDOM); r++, s = !1)
        ;
      return o && s && !o.border && !o.domAtom ? o.domFromPos(0, n) : { node: this.contentDOM, offset: o ? xe(o.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, n, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: n, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, o = -1;
    for (let s = r, l = 0; ; l++) {
      let a = this.children[l], c = s + a.size;
      if (i == -1 && e <= c) {
        let u = s + a.border;
        if (e >= u && n <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, n, u);
        e = s;
        for (let f = l; f > 0; f--) {
          let h = this.children[f - 1];
          if (h.size && h.dom.parentNode == this.contentDOM && !h.emptyChildAt(1)) {
            i = xe(h.dom) + 1;
            break;
          }
          e -= h.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > n || l == this.children.length - 1)) {
        n = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let f = this.children[u];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(-1)) {
            o = xe(f.dom);
            break;
          }
          n += f.size;
        }
        o == -1 && (o = this.contentDOM.childNodes.length);
        break;
      }
      s = c;
    }
    return { node: this.contentDOM, from: e, to: n, fromOffset: i, toOffset: o };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let n = this.children[e < 0 ? 0 : this.children.length - 1];
    return n.size == 0 || n.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: n, offset: r } = this.domFromPos(e, 0);
    if (n.nodeType != 1 || r == n.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return n.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, n, r, i = !1) {
    let o = Math.min(e, n), s = Math.max(e, n);
    for (let d = 0, p = 0; d < this.children.length; d++) {
      let m = this.children[d], y = p + m.size;
      if (o > p && s < y)
        return m.setSelection(e - p - m.border, n - p - m.border, r, i);
      p = y;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = n == e ? l : this.domFromPos(n, n ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), f = !1;
    if ((Ye || Ee) && e == n) {
      let { node: d, offset: p } = l;
      if (d.nodeType == 3) {
        if (f = !!(p && d.nodeValue[p - 1] == `
`), f && p == d.nodeValue.length)
          for (let m = d, y; m; m = m.parentNode) {
            if (y = m.nextSibling) {
              y.nodeName == "BR" && (l = a = { node: y.parentNode, offset: xe(y) + 1 });
              break;
            }
            let g = m.pmViewDesc;
            if (g && g.node && g.node.isBlock)
              break;
          }
      } else {
        let m = d.childNodes[p - 1];
        f = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (Ye && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let d = u.focusNode.childNodes[u.focusOffset];
      d && d.contentEditable == "false" && (i = !0);
    }
    if (!(i || f && Ee) && Fn(l.node, l.offset, u.anchorNode, u.anchorOffset) && Fn(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let h = !1;
    if ((c.extend || e == n) && !(f && Ye)) {
      c.collapse(l.node, l.offset);
      try {
        e != n && c.extend(a.node, a.offset), h = !0;
      } catch {
      }
    }
    if (!h) {
      if (e > n) {
        let p = l;
        l = a, a = p;
      }
      let d = document.createRange();
      d.setEnd(a.node, a.offset), d.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(d);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, n) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let o = this.children[i], s = r + o.size;
      if (r == s ? e <= s && n >= r : e < s && n > r) {
        let l = r + o.border, a = s - o.border;
        if (e >= l && n <= a) {
          this.dirty = e == r || n == s ? Cn : Zu, e == l && n == a && (o.contentLost || o.dom.parentNode != this.contentDOM) ? o.dirty = bt : o.markDirty(e - l, n - l);
          return;
        } else
          o.dirty = o.dom == o.contentDOM && o.dom.parentNode == this.contentDOM && !o.children.length ? Cn : bt;
      }
      r = s;
    }
    this.dirty = Cn;
  }
  markParentsDirty() {
    let e = 1;
    for (let n = this.parent; n; n = n.parent, e++) {
      let r = e == 1 ? Cn : Zu;
      n.dirty < r && (n.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class ep extends Si {
  constructor(e, n, r, i) {
    let o, s = n.type.toDOM;
    if (typeof s == "function" && (s = s(r, () => {
      if (!o)
        return i;
      if (o.parent)
        return o.parent.posBeforeChild(o);
    })), !n.type.spec.raw) {
      if (s.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(s), s = l;
      }
      s.contentEditable = "false", s.classList.add("ProseMirror-widget");
    }
    super(e, [], s, null), this.widget = n, this.widget = n, o = this;
  }
  matchesWidget(e) {
    return this.dirty == Qe && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let n = this.widget.spec.stopEvent;
    return n ? n(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class jx extends Si {
  constructor(e, n, r, i) {
    super(e, [], n, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, n) {
    return e != this.textDOM ? this.posAtStart + (n ? this.size : 0) : this.posAtStart + n;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class _n extends Si {
  constructor(e, n, r, i, o) {
    super(e, [], r, i), this.mark = n, this.spec = o;
  }
  static create(e, n, r, i) {
    let o = i.nodeViews[n.type.name], s = o && o(n, i, r);
    return (!s || !s.dom) && (s = Hn.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new _n(e, n, s.dom, s.contentDOM || s.dom, s);
  }
  parseRule() {
    return this.dirty & bt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != bt && this.mark.eq(e);
  }
  markDirty(e, n) {
    if (super.markDirty(e, n), this.dirty != Qe) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Qe;
    }
  }
  slice(e, n, r) {
    let i = _n.create(this.parent, this.mark, !0, r), o = this.children, s = this.size;
    n < s && (o = Fl(o, n, s, r)), e > 0 && (o = Fl(o, 0, e, r));
    for (let l = 0; l < o.length; l++)
      o[l].parent = i;
    return i.children = o, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class en extends Si {
  constructor(e, n, r, i, o, s, l, a, c) {
    super(e, [], o, s), this.node = n, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, n, r, i, o, s) {
    let l = o.nodeViews[n.type.name], a, c = l && l(n, o, () => {
      if (!a)
        return s;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, f = c && c.contentDOM;
    if (n.isText) {
      if (!u)
        u = document.createTextNode(n.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: f } = Hn.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs));
    !f && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
    let h = u;
    return u = ip(u, r, n), c ? a = new qx(e, n, r, i, u, f || null, h, c, o, s + 1) : n.isText ? new Uo(e, n, r, i, u, h, o) : new en(e, n, r, i, u, f || null, h, o, s + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let n = this.children.length - 1; n >= 0; n--) {
        let r = this.children[n];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => N.empty);
    }
    return e;
  }
  matchesNode(e, n, r) {
    return this.dirty == Qe && e.eq(this.node) && xo(n, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, n) {
    let r = this.node.inlineContent, i = n, o = e.composing ? this.localCompositionInfo(e, n) : null, s = o && o.pos > -1 ? o : null, l = o && o.pos < 0, a = new Ux(this, s && s.node, e);
    Yx(this.node, this.innerDeco, (c, u, f) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !f && a.syncToMarks(u == this.node.childCount ? G.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, f, h) => {
      a.syncToMarks(c.marks, r, e);
      let d;
      a.findNodeMatch(c, u, f, h) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (d = a.findIndexWithChild(o.node)) > -1 && a.updateNodeAt(c, u, f, d, e) || a.updateNextNode(c, u, f, e, h, i) || a.addNode(c, u, f, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == Cn) && (s && this.protectLocalComposition(e, s), np(this.contentDOM, this.children, e), dr && Qx(this.dom));
  }
  localCompositionInfo(e, n) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof H) || r < n || i > n + this.node.content.size)
      return null;
    let o = e.input.compositionNode;
    if (!o || !this.dom.contains(o.parentNode))
      return null;
    if (this.node.inlineContent) {
      let s = o.nodeValue, l = Xx(this.node.content, s, r - n, i - n);
      return l < 0 ? null : { node: o, pos: l, text: s };
    } else
      return { node: o, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: n, pos: r, text: i }) {
    if (this.getDesc(n))
      return;
    let o = n;
    for (; o.parentNode != this.contentDOM; o = o.parentNode) {
      for (; o.previousSibling; )
        o.parentNode.removeChild(o.previousSibling);
      for (; o.nextSibling; )
        o.parentNode.removeChild(o.nextSibling);
      o.pmViewDesc && (o.pmViewDesc = void 0);
    }
    let s = new jx(this, o, n, i);
    e.input.compositionNodes.push(s), this.children = Fl(this.children, r, r + i.length, e, s);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, n, r, i) {
    return this.dirty == bt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, n, r, i), !0);
  }
  updateInner(e, n, r, i) {
    this.updateOuterDeco(n), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Qe;
  }
  updateOuterDeco(e) {
    if (xo(e, this.outerDeco))
      return;
    let n = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = rp(this.dom, this.nodeDOM, Bl(this.outerDeco, this.node, n), Bl(e, this.node, n)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function ef(t, e, n, r, i) {
  ip(r, e, t);
  let o = new en(void 0, t, e, n, r, r, r, i, 0);
  return o.contentDOM && o.updateChildren(i, 0), o;
}
class Uo extends en {
  constructor(e, n, r, i, o, s, l) {
    super(e, n, r, i, o, null, s, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, n, r, i) {
    return this.dirty == bt || this.dirty != Qe && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(n), (this.dirty != Qe || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Qe, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let n = this.nodeDOM; n; n = n.parentNode)
      if (n == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, n, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(n, this.node.text.length) : super.localPosFromDOM(e, n, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, n, r) {
    let i = this.node.cut(e, n), o = document.createTextNode(i.text);
    return new Uo(this.parent, i, this.outerDeco, this.innerDeco, o, o, r);
  }
  markDirty(e, n) {
    super.markDirty(e, n), this.dom != this.nodeDOM && (e == 0 || n == this.nodeDOM.nodeValue.length) && (this.dirty = bt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class tp extends Si {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Qe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class qx extends en {
  constructor(e, n, r, i, o, s, l, a, c, u) {
    super(e, n, r, i, o, s, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, n, r, i) {
    if (this.dirty == bt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let o = this.spec.update(e, n, r);
      return o && this.updateInner(e, n, r, i), o;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, n, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, n, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, n, r.root) : super.setSelection(e, n, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function np(t, e, n) {
  let r = t.firstChild, i = !1;
  for (let o = 0; o < e.length; o++) {
    let s = e[o], l = s.dom;
    if (l.parentNode == t) {
      for (; l != r; )
        r = tf(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, t.insertBefore(l, r);
    if (s instanceof _n) {
      let a = r ? r.previousSibling : t.lastChild;
      np(s.contentDOM, s.children, n), r = a ? a.nextSibling : t.firstChild;
    }
  }
  for (; r; )
    r = tf(r), i = !0;
  i && n.trackWrites == t && (n.trackWrites = null);
}
const Jr = function(t) {
  t && (this.nodeName = t);
};
Jr.prototype = /* @__PURE__ */ Object.create(null);
const Sn = [new Jr()];
function Bl(t, e, n) {
  if (t.length == 0)
    return Sn;
  let r = n ? Sn[0] : new Jr(), i = [r];
  for (let o = 0; o < t.length; o++) {
    let s = t[o].type.attrs;
    if (s) {
      s.nodeName && i.push(r = new Jr(s.nodeName));
      for (let l in s) {
        let a = s[l];
        a != null && (n && i.length == 1 && i.push(r = new Jr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function rp(t, e, n, r) {
  if (n == Sn && r == Sn)
    return e;
  let i = e;
  for (let o = 0; o < r.length; o++) {
    let s = r[o], l = n[o];
    if (o) {
      let a;
      l && l.nodeName == s.nodeName && i != t && (a = i.parentNode) && a.nodeName.toLowerCase() == s.nodeName || (a = document.createElement(s.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = Sn[0]), i = a;
    }
    Kx(i, l || Sn[0], s);
  }
  return i;
}
function Kx(t, e, n) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in n) && t.removeAttribute(r);
  for (let r in n)
    r != "class" && r != "style" && r != "nodeName" && n[r] != e[r] && t.setAttribute(r, n[r]);
  if (e.class != n.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
    for (let o = 0; o < r.length; o++)
      i.indexOf(r[o]) == -1 && t.classList.remove(r[o]);
    for (let o = 0; o < i.length; o++)
      r.indexOf(i[o]) == -1 && t.classList.add(i[o]);
    t.classList.length == 0 && t.removeAttribute("class");
  }
  if (e.style != n.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        t.style.removeProperty(i[1]);
    }
    n.style && (t.style.cssText += n.style);
  }
}
function ip(t, e, n) {
  return rp(t, t, Sn, Bl(e, n, t.nodeType != 1));
}
function xo(t, e) {
  if (t.length != e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (!t[n].type.eq(e[n].type))
      return !1;
  return !0;
}
function tf(t) {
  let e = t.nextSibling;
  return t.parentNode.removeChild(t), e;
}
class Ux {
  constructor(e, n, r) {
    this.lock = n, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Jx(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, n) {
    if (e != n) {
      for (let r = e; r < n; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, n - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, n, r) {
    let i = 0, o = this.stack.length >> 1, s = Math.min(o, e.length);
    for (; i < s && (i == o - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < o; )
      this.destroyRest(), this.top.dirty = Qe, this.index = this.stack.pop(), this.top = this.stack.pop(), o--;
    for (; o < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[o]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = _n.create(this.top, e[o], n, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, o++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, n, r, i) {
    let o = -1, s;
    if (i >= this.preMatch.index && (s = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && s.matchesNode(e, n, r))
      o = this.top.children.indexOf(s, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, n, r) && !this.preMatch.matched.has(c)) {
          o = l;
          break;
        }
      }
    return o < 0 ? !1 : (this.destroyBetween(this.index, o), this.index++, !0);
  }
  updateNodeAt(e, n, r, i, o) {
    let s = this.top.children[i];
    return s.dirty == bt && s.dom == s.contentDOM && (s.dirty = Cn), s.update(e, n, r, o) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let n = e.parentNode;
      if (!n)
        return -1;
      if (n == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = n;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, n, r, i, o, s) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof en) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != o)
          return !1;
        let u = a.dom, f, h = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != bt && xo(n, a.outerDeco));
        if (!h && a.update(e, n, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!h && (f = this.recreateWrapper(a, e, n, r, i, s)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = f, f.contentDOM && (f.dirty = Cn, f.updateChildren(i, s + 1), f.dirty = Qe), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, n, r, i, o, s) {
    if (e.dirty || n.isAtom || !e.children.length || !e.node.content.eq(n.content) || !xo(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = en.create(this.top, n, r, i, o, s);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, n, r, i, o) {
    let s = en.create(this.top, e, n, r, i, o);
    s.contentDOM && s.updateChildren(i, o + 1), this.top.children.splice(this.index++, 0, s), this.changed = !0;
  }
  placeWidget(e, n, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let o = new ep(this.top, e, n, r);
      this.top.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], n = this.top;
    for (; e instanceof _n; )
      n = e, e = n.children[n.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Uo) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Ee || Me) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", n), this.addHackNode("BR", this.top));
  }
  addHackNode(e, n) {
    if (n == this.top && this.index < n.children.length && n.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new tp(this.top, [], r, null);
      n != this.top ? n.children.push(i) : n.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Jx(t, e) {
  let n = e, r = n.children.length, i = t.childCount, o = /* @__PURE__ */ new Map(), s = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = n.children[r - 1];
        if (c instanceof _n)
          n = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (n == e)
          break e;
        r = n.parent.children.indexOf(n), n = n.parent;
      }
    let a = l.node;
    if (a) {
      if (a != t.child(i - 1))
        break;
      --i, o.set(l, i), s.push(l);
    }
  }
  return { index: i, matched: o, matches: s.reverse() };
}
function Gx(t, e) {
  return t.type.side - e.type.side;
}
function Yx(t, e, n, r) {
  let i = e.locals(t), o = 0;
  if (i.length == 0) {
    for (let c = 0; c < t.childCount; c++) {
      let u = t.child(c);
      r(u, i, e.forChild(o, u), c), o += u.nodeSize;
    }
    return;
  }
  let s = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, f;
    for (; s < i.length && i[s].to == o; ) {
      let y = i[s++];
      y.widget && (u ? (f || (f = [u])).push(y) : u = y);
    }
    if (u)
      if (f) {
        f.sort(Gx);
        for (let y = 0; y < f.length; y++)
          n(f[y], c, !!a);
      } else
        n(u, c, !!a);
    let h, d;
    if (a)
      d = -1, h = a, a = null;
    else if (c < t.childCount)
      d = c, h = t.child(c++);
    else
      break;
    for (let y = 0; y < l.length; y++)
      l[y].to <= o && l.splice(y--, 1);
    for (; s < i.length && i[s].from <= o && i[s].to > o; )
      l.push(i[s++]);
    let p = o + h.nodeSize;
    if (h.isText) {
      let y = p;
      s < i.length && i[s].from < y && (y = i[s].from);
      for (let g = 0; g < l.length; g++)
        l[g].to < y && (y = l[g].to);
      y < p && (a = h.cut(y - o), h = h.cut(0, y - o), p = y, d = -1);
    } else
      for (; s < i.length && i[s].to < p; )
        s++;
    let m = h.isInline && !h.isLeaf ? l.filter((y) => !y.inline) : l.slice();
    r(h, m, e.forChild(o, h), d), o = p;
  }
}
function Qx(t) {
  if (t.nodeName == "UL" || t.nodeName == "OL") {
    let e = t.style.cssText;
    t.style.cssText = e + "; list-style: square !important", window.getComputedStyle(t).listStyle, t.style.cssText = e;
  }
}
function Xx(t, e, n, r) {
  for (let i = 0, o = 0; i < t.childCount && o <= r; ) {
    let s = t.child(i++), l = o;
    if (o += s.nodeSize, !s.isText)
      continue;
    let a = s.text;
    for (; i < t.childCount; ) {
      let c = t.child(i++);
      if (o += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (o >= n) {
      if (o >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= n)
        return l + c;
      if (n == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Fl(t, e, n, r, i) {
  let o = [];
  for (let s = 0, l = 0; s < t.length; s++) {
    let a = t[s], c = l, u = l += a.size;
    c >= n || u <= e ? o.push(a) : (c < e && o.push(a.slice(0, e - c, r)), i && (o.push(i), i = void 0), u > n && o.push(a.slice(n - c, a.size, r)));
  }
  return o;
}
function Aa(t, e = null) {
  let n = t.domSelectionRange(), r = t.state.doc;
  if (!n.focusNode)
    return null;
  let i = t.docView.nearestDesc(n.focusNode), o = i && i.size == 0, s = t.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
  if (s < 0)
    return null;
  let l = r.resolve(s), a, c;
  if (Ko(n)) {
    for (a = s; i && !i.node; )
      i = i.parent;
    let f = i.node;
    if (i && f.isAtom && _.isSelectable(f) && i.parent && !(f.isInline && Mx(n.focusNode, n.focusOffset, i.dom))) {
      let h = i.posBefore;
      c = new _(s == h ? l : r.resolve(h));
    }
  } else {
    if (n instanceof t.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
      let f = s, h = s;
      for (let d = 0; d < n.rangeCount; d++) {
        let p = n.getRangeAt(d);
        f = Math.min(f, t.docView.posFromDOM(p.startContainer, p.startOffset, 1)), h = Math.max(h, t.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (f < 0)
        return null;
      [a, s] = h == t.state.selection.anchor ? [h, f] : [f, h], l = r.resolve(s);
    } else
      a = t.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let f = e == "pointer" || t.state.selection.head < l.pos && !o ? 1 : -1;
    c = Ea(t, u, l, f);
  }
  return c;
}
function op(t) {
  return t.editable ? t.hasFocus() : lp(t) && document.activeElement && document.activeElement.contains(t.dom);
}
function Pt(t, e = !1) {
  let n = t.state.selection;
  if (sp(t, n), !!op(t)) {
    if (!e && t.input.mouseDown && t.input.mouseDown.allowDefault && Me) {
      let r = t.domSelectionRange(), i = t.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && Fn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        t.input.mouseDown.delayedSelectionSync = !0, t.domObserver.setCurSelection();
        return;
      }
    }
    if (t.domObserver.disconnectSelection(), t.cursorWrapper)
      e0(t);
    else {
      let { anchor: r, head: i } = n, o, s;
      nf && !(n instanceof H) && (n.$from.parent.inlineContent || (o = rf(t, n.from)), !n.empty && !n.$from.parent.inlineContent && (s = rf(t, n.to))), t.docView.setSelection(r, i, t, e), nf && (o && of(o), s && of(s)), n.visible ? t.dom.classList.remove("ProseMirror-hideselection") : (t.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Zx(t));
    }
    t.domObserver.setCurSelection(), t.domObserver.connectSelection();
  }
}
const nf = Ee || Me && Ud < 63;
function rf(t, e) {
  let { node: n, offset: r } = t.docView.domFromPos(e, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, o = r ? n.childNodes[r - 1] : null;
  if (Ee && i && i.contentEditable == "false")
    return _s(i);
  if ((!i || i.contentEditable == "false") && (!o || o.contentEditable == "false")) {
    if (i)
      return _s(i);
    if (o)
      return _s(o);
  }
}
function _s(t) {
  return t.contentEditable = "true", Ee && t.draggable && (t.draggable = !1, t.wasDraggable = !0), t;
}
function of(t) {
  t.contentEditable = "false", t.wasDraggable && (t.draggable = !0, t.wasDraggable = null);
}
function Zx(t) {
  let e = t.dom.ownerDocument;
  e.removeEventListener("selectionchange", t.input.hideSelectionGuard);
  let n = t.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
  e.addEventListener("selectionchange", t.input.hideSelectionGuard = () => {
    (n.anchorNode != r || n.anchorOffset != i) && (e.removeEventListener("selectionchange", t.input.hideSelectionGuard), setTimeout(() => {
      (!op(t) || t.state.selection.visible) && t.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function e0(t) {
  let e = t.domSelection();
  if (!e)
    return;
  let n = t.cursorWrapper.dom, r = n.nodeName == "IMG";
  r ? e.collapse(n.parentNode, xe(n) + 1) : e.collapse(n, 0), !r && !t.state.selection.visible && Pe && Zt <= 11 && (n.disabled = !0, n.disabled = !1);
}
function sp(t, e) {
  if (e instanceof _) {
    let n = t.docView.descAt(e.from);
    n != t.lastSelectedViewDesc && (sf(t), n && n.selectNode(), t.lastSelectedViewDesc = n);
  } else
    sf(t);
}
function sf(t) {
  t.lastSelectedViewDesc && (t.lastSelectedViewDesc.parent && t.lastSelectedViewDesc.deselectNode(), t.lastSelectedViewDesc = void 0);
}
function Ea(t, e, n, r) {
  return t.someProp("createSelectionBetween", (i) => i(t, e, n)) || H.between(e, n, r);
}
function lf(t) {
  return t.editable && !t.hasFocus() ? !1 : lp(t);
}
function lp(t) {
  let e = t.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return t.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (t.editable || t.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function t0(t) {
  let e = t.docView.domFromPos(t.state.selection.anchor, 0), n = t.domSelectionRange();
  return Fn(e.node, e.offset, n.anchorNode, n.anchorOffset);
}
function _l(t, e) {
  let { $anchor: n, $head: r } = t.selection, i = e > 0 ? n.max(r) : n.min(r), o = i.parent.inlineContent ? i.depth ? t.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return o && $.findFrom(o, e);
}
function qt(t, e) {
  return t.dispatch(t.state.tr.setSelection(e).scrollIntoView()), !0;
}
function af(t, e, n) {
  let r = t.state.selection;
  if (r instanceof H)
    if (n.indexOf("s") > -1) {
      let { $head: i } = r, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!o || o.isText || !o.isLeaf)
        return !1;
      let s = t.state.doc.resolve(i.pos + o.nodeSize * (e < 0 ? -1 : 1));
      return qt(t, new H(r.$anchor, s));
    } else if (r.empty) {
      if (t.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = _l(t.state, e);
        return i && i instanceof _ ? qt(t, i) : !1;
      } else if (!(Ue && n.indexOf("m") > -1)) {
        let i = r.$head, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, s;
        if (!o || o.isText)
          return !1;
        let l = e < 0 ? i.pos - o.nodeSize : i.pos;
        return o.isAtom || (s = t.docView.descAt(l)) && !s.contentDOM ? _.isSelectable(o) ? qt(t, new _(e < 0 ? t.state.doc.resolve(i.pos - o.nodeSize) : i)) : Ci ? qt(t, new H(t.state.doc.resolve(e < 0 ? l : l + o.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof _ && r.node.isInline)
      return qt(t, new H(e > 0 ? r.$to : r.$from));
    {
      let i = _l(t.state, e);
      return i ? qt(t, i) : !1;
    }
  }
}
function Co(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function Gr(t, e) {
  let n = t.pmViewDesc;
  return n && n.size == 0 && (e < 0 || t.nextSibling || t.nodeName != "BR");
}
function Qn(t, e) {
  return e < 0 ? n0(t) : r0(t);
}
function n0(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let i, o, s = !1;
  for (Ye && n.nodeType == 1 && r < Co(n) && Gr(n.childNodes[r], -1) && (s = !0); ; )
    if (r > 0) {
      if (n.nodeType != 1)
        break;
      {
        let l = n.childNodes[r - 1];
        if (Gr(l, -1))
          i = n, o = --r;
        else if (l.nodeType == 3)
          n = l, r = n.nodeValue.length;
        else
          break;
      }
    } else {
      if (ap(n))
        break;
      {
        let l = n.previousSibling;
        for (; l && Gr(l, -1); )
          i = n.parentNode, o = xe(l), l = l.previousSibling;
        if (l)
          n = l, r = Co(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = 0;
        }
      }
    }
  s ? $l(t, n, r) : i && $l(t, i, o);
}
function r0(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let i = Co(n), o, s;
  for (; ; )
    if (r < i) {
      if (n.nodeType != 1)
        break;
      let l = n.childNodes[r];
      if (Gr(l, 1))
        o = n, s = ++r;
      else
        break;
    } else {
      if (ap(n))
        break;
      {
        let l = n.nextSibling;
        for (; l && Gr(l, 1); )
          o = l.parentNode, s = xe(l) + 1, l = l.nextSibling;
        if (l)
          n = l, r = 0, i = Co(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = i = 0;
        }
      }
    }
  o && $l(t, o, s);
}
function ap(t) {
  let e = t.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function i0(t, e) {
  for (; t && e == t.childNodes.length && !xi(t); )
    e = xe(t) + 1, t = t.parentNode;
  for (; t && e < t.childNodes.length; ) {
    let n = t.childNodes[e];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = 0;
  }
}
function o0(t, e) {
  for (; t && !e && !xi(t); )
    e = xe(t), t = t.parentNode;
  for (; t && e; ) {
    let n = t.childNodes[e - 1];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = t.childNodes.length;
  }
}
function $l(t, e, n) {
  if (e.nodeType != 3) {
    let o, s;
    (s = i0(e, n)) ? (e = s, n = 0) : (o = o0(e, n)) && (e = o, n = o.nodeValue.length);
  }
  let r = t.domSelection();
  if (!r)
    return;
  if (Ko(r)) {
    let o = document.createRange();
    o.setEnd(e, n), o.setStart(e, n), r.removeAllRanges(), r.addRange(o);
  } else r.extend && r.extend(e, n);
  t.domObserver.setCurSelection();
  let { state: i } = t;
  setTimeout(() => {
    t.state == i && Pt(t);
  }, 50);
}
function cf(t, e) {
  let n = t.state.doc.resolve(e);
  if (!(Me || Ix) && n.parent.inlineContent) {
    let i = t.coordsAtPos(e);
    if (e > n.start()) {
      let o = t.coordsAtPos(e - 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left < i.left ? "ltr" : "rtl";
    }
    if (e < n.end()) {
      let o = t.coordsAtPos(e + 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(t.dom).direction == "rtl" ? "rtl" : "ltr";
}
function uf(t, e, n) {
  let r = t.state.selection;
  if (r instanceof H && !r.empty || n.indexOf("s") > -1 || Ue && n.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: o } = r;
  if (!i.parent.inlineContent || t.endOfTextblock(e < 0 ? "up" : "down")) {
    let s = _l(t.state, e);
    if (s && s instanceof _)
      return qt(t, s);
  }
  if (!i.parent.inlineContent) {
    let s = e < 0 ? i : o, l = r instanceof He ? $.near(s, e) : $.findFrom(s, e);
    return l ? qt(t, l) : !1;
  }
  return !1;
}
function ff(t, e) {
  if (!(t.state.selection instanceof H))
    return !0;
  let { $head: n, $anchor: r, empty: i } = t.state.selection;
  if (!n.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (t.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let o = !n.textOffset && (e < 0 ? n.nodeBefore : n.nodeAfter);
  if (o && !o.isText) {
    let s = t.state.tr;
    return e < 0 ? s.delete(n.pos - o.nodeSize, n.pos) : s.delete(n.pos, n.pos + o.nodeSize), t.dispatch(s), !0;
  }
  return !1;
}
function hf(t, e, n) {
  t.domObserver.stop(), e.contentEditable = n, t.domObserver.start();
}
function s0(t) {
  if (!Ee || t.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: n } = t.domSelectionRange();
  if (e && e.nodeType == 1 && n == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    hf(t, r, "true"), setTimeout(() => hf(t, r, "false"), 20);
  }
  return !1;
}
function l0(t) {
  let e = "";
  return t.ctrlKey && (e += "c"), t.metaKey && (e += "m"), t.altKey && (e += "a"), t.shiftKey && (e += "s"), e;
}
function a0(t, e) {
  let n = e.keyCode, r = l0(e);
  if (n == 8 || Ue && n == 72 && r == "c")
    return ff(t, -1) || Qn(t, -1);
  if (n == 46 && !e.shiftKey || Ue && n == 68 && r == "c")
    return ff(t, 1) || Qn(t, 1);
  if (n == 13 || n == 27)
    return !0;
  if (n == 37 || Ue && n == 66 && r == "c") {
    let i = n == 37 ? cf(t, t.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return af(t, i, r) || Qn(t, i);
  } else if (n == 39 || Ue && n == 70 && r == "c") {
    let i = n == 39 ? cf(t, t.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return af(t, i, r) || Qn(t, i);
  } else {
    if (n == 38 || Ue && n == 80 && r == "c")
      return uf(t, -1, r) || Qn(t, -1);
    if (n == 40 || Ue && n == 78 && r == "c")
      return s0(t) || uf(t, 1, r) || Qn(t, 1);
    if (r == (Ue ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90))
      return !0;
  }
  return !1;
}
function Oa(t, e) {
  t.someProp("transformCopied", (d) => {
    e = d(e, t);
  });
  let n = [], { content: r, openStart: i, openEnd: o } = e;
  for (; i > 1 && o > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, o--;
    let d = r.firstChild;
    n.push(d.type.name, d.attrs != d.type.defaultAttrs ? d.attrs : null), r = d.content;
  }
  let s = t.someProp("clipboardSerializer") || Hn.fromSchema(t.state.schema), l = pp(), a = l.createElement("div");
  a.appendChild(s.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, f = 0;
  for (; c && c.nodeType == 1 && (u = dp[c.nodeName.toLowerCase()]); ) {
    for (let d = u.length - 1; d >= 0; d--) {
      let p = l.createElement(u[d]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), f++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${o}${f ? ` -${f}` : ""} ${JSON.stringify(n)}`);
  let h = t.someProp("clipboardTextSerializer", (d) => d(e, t)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: h, slice: e };
}
function cp(t, e, n, r, i) {
  let o = i.parent.type.spec.code, s, l;
  if (!n && !e)
    return null;
  let a = !!e && (r || o || !n);
  if (a) {
    if (t.someProp("transformPastedText", (h) => {
      e = h(e, o || r, t);
    }), o)
      return l = new D(N.from(t.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), t.someProp("transformPasted", (h) => {
        l = h(l, t, !0);
      }), l;
    let f = t.someProp("clipboardTextParser", (h) => h(e, i, r, t));
    if (f)
      l = f;
    else {
      let h = i.marks(), { schema: d } = t.state, p = Hn.fromSchema(d);
      s = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let y = s.appendChild(document.createElement("p"));
        m && y.appendChild(p.serializeNode(d.text(m, h)));
      });
    }
  } else
    t.someProp("transformPastedHTML", (f) => {
      n = f(n, t);
    }), s = h0(n), Ci && d0(s);
  let c = s && s.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let f = +u[3]; f > 0; f--) {
      let h = s.firstChild;
      for (; h && h.nodeType != 1; )
        h = h.nextSibling;
      if (!h)
        break;
      s = h;
    }
  if (l || (l = (t.someProp("clipboardParser") || t.someProp("domParser") || Pn.fromSchema(t.state.schema)).parseSlice(s, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(h) {
      return h.nodeName == "BR" && !h.nextSibling && h.parentNode && !c0.test(h.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = p0(df(l, +u[1], +u[2]), u[4]);
  else if (l = D.maxOpen(u0(l.content, i), !0), l.openStart || l.openEnd) {
    let f = 0, h = 0;
    for (let d = l.content.firstChild; f < l.openStart && !d.type.spec.isolating; f++, d = d.firstChild)
      ;
    for (let d = l.content.lastChild; h < l.openEnd && !d.type.spec.isolating; h++, d = d.lastChild)
      ;
    l = df(l, f, h);
  }
  return t.someProp("transformPasted", (f) => {
    l = f(l, t, a);
  }), l;
}
const c0 = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function u0(t, e) {
  if (t.childCount < 2)
    return t;
  for (let n = e.depth; n >= 0; n--) {
    let i = e.node(n).contentMatchAt(e.index(n)), o, s = [];
    if (t.forEach((l) => {
      if (!s)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return s = null;
      if (c = s.length && o.length && fp(a, o, l, s[s.length - 1], 0))
        s[s.length - 1] = c;
      else {
        s.length && (s[s.length - 1] = hp(s[s.length - 1], o.length));
        let u = up(l, a);
        s.push(u), i = i.matchType(u.type), o = a;
      }
    }), s)
      return N.from(s);
  }
  return t;
}
function up(t, e, n = 0) {
  for (let r = e.length - 1; r >= n; r--)
    t = e[r].create(null, N.from(t));
  return t;
}
function fp(t, e, n, r, i) {
  if (i < t.length && i < e.length && t[i] == e[i]) {
    let o = fp(t, e, n, r.lastChild, i + 1);
    if (o)
      return r.copy(r.content.replaceChild(r.childCount - 1, o));
    if (r.contentMatchAt(r.childCount).matchType(i == t.length - 1 ? n.type : t[i + 1]))
      return r.copy(r.content.append(N.from(up(n, t, i + 1))));
  }
}
function hp(t, e) {
  if (e == 0)
    return t;
  let n = t.content.replaceChild(t.childCount - 1, hp(t.lastChild, e - 1)), r = t.contentMatchAt(t.childCount).fillBefore(N.empty, !0);
  return t.copy(n.append(r));
}
function Vl(t, e, n, r, i, o) {
  let s = e < 0 ? t.firstChild : t.lastChild, l = s.content;
  return t.childCount > 1 && (o = 0), i < r - 1 && (l = Vl(l, e, n, r, i + 1, o)), i >= n && (l = e < 0 ? s.contentMatchAt(0).fillBefore(l, o <= i).append(l) : l.append(s.contentMatchAt(s.childCount).fillBefore(N.empty, !0))), t.replaceChild(e < 0 ? 0 : t.childCount - 1, s.copy(l));
}
function df(t, e, n) {
  return e < t.openStart && (t = new D(Vl(t.content, -1, e, t.openStart, 0, t.openEnd), e, t.openEnd)), n < t.openEnd && (t = new D(Vl(t.content, 1, n, t.openEnd, 0, 0), t.openStart, n)), t;
}
const dp = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let pf = null;
function pp() {
  return pf || (pf = document.implementation.createHTMLDocument("title"));
}
let $s = null;
function f0(t) {
  let e = window.trustedTypes;
  return e ? ($s || ($s = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (n) => n })), $s.createHTML(t)) : t;
}
function h0(t) {
  let e = /^(\s*<meta [^>]*>)*/.exec(t);
  e && (t = t.slice(e[0].length));
  let n = pp().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(t), i;
  if ((i = r && dp[r[1].toLowerCase()]) && (t = i.map((o) => "<" + o + ">").join("") + t + i.map((o) => "</" + o + ">").reverse().join("")), n.innerHTML = f0(t), i)
    for (let o = 0; o < i.length; o++)
      n = n.querySelector(i[o]) || n;
  return n;
}
function d0(t) {
  let e = t.querySelectorAll(Me ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(t.ownerDocument.createTextNode(" "), r);
  }
}
function p0(t, e) {
  if (!t.size)
    return t;
  let n = t.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return t;
  }
  let { content: i, openStart: o, openEnd: s } = t;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = n.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = N.from(a.create(r[l + 1], i)), o++, s++;
  }
  return new D(i, o, s);
}
const Oe = {}, De = {}, m0 = { touchstart: !0, touchmove: !0 };
class g0 {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function y0(t) {
  for (let e in Oe) {
    let n = Oe[e];
    t.dom.addEventListener(e, t.input.eventHandlers[e] = (r) => {
      b0(t, r) && !Da(t, r) && (t.editable || !(r.type in De)) && n(t, r);
    }, m0[e] ? { passive: !0 } : void 0);
  }
  Ee && t.dom.addEventListener("input", () => null), Hl(t);
}
function Yt(t, e) {
  t.input.lastSelectionOrigin = e, t.input.lastSelectionTime = Date.now();
}
function k0(t) {
  t.domObserver.stop();
  for (let e in t.input.eventHandlers)
    t.dom.removeEventListener(e, t.input.eventHandlers[e]);
  clearTimeout(t.input.composingTimeout), clearTimeout(t.input.lastIOSEnterFallbackTimeout);
}
function Hl(t) {
  t.someProp("handleDOMEvents", (e) => {
    for (let n in e)
      t.input.eventHandlers[n] || t.dom.addEventListener(n, t.input.eventHandlers[n] = (r) => Da(t, r));
  });
}
function Da(t, e) {
  return t.someProp("handleDOMEvents", (n) => {
    let r = n[e.type];
    return r ? r(t, e) || e.defaultPrevented : !1;
  });
}
function b0(t, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let n = e.target; n != t.dom; n = n.parentNode)
    if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function w0(t, e) {
  !Da(t, e) && Oe[e.type] && (t.editable || !(e.type in De)) && Oe[e.type](t, e);
}
De.keydown = (t, e) => {
  let n = e;
  if (t.input.shiftKey = n.keyCode == 16 || n.shiftKey, !gp(t, n) && (t.input.lastKeyCode = n.keyCode, t.input.lastKeyCodeTime = Date.now(), !(vt && Me && n.keyCode == 13)))
    if (n.keyCode != 229 && t.domObserver.forceFlush(), dr && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
      let r = Date.now();
      t.input.lastIOSEnter = r, t.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        t.input.lastIOSEnter == r && (t.someProp("handleKeyDown", (i) => i(t, wn(13, "Enter"))), t.input.lastIOSEnter = 0);
      }, 200);
    } else t.someProp("handleKeyDown", (r) => r(t, n)) || a0(t, n) ? n.preventDefault() : Yt(t, "key");
};
De.keyup = (t, e) => {
  e.keyCode == 16 && (t.input.shiftKey = !1);
};
De.keypress = (t, e) => {
  let n = e;
  if (gp(t, n) || !n.charCode || n.ctrlKey && !n.altKey || Ue && n.metaKey)
    return;
  if (t.someProp("handleKeyPress", (i) => i(t, n))) {
    n.preventDefault();
    return;
  }
  let r = t.state.selection;
  if (!(r instanceof H) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(n.charCode), o = () => t.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !t.someProp("handleTextInput", (s) => s(t, r.$from.pos, r.$to.pos, i, o)) && t.dispatch(o()), n.preventDefault();
  }
};
function Jo(t) {
  return { left: t.clientX, top: t.clientY };
}
function x0(t, e) {
  let n = e.x - t.clientX, r = e.y - t.clientY;
  return n * n + r * r < 100;
}
function Ra(t, e, n, r, i) {
  if (r == -1)
    return !1;
  let o = t.state.doc.resolve(r);
  for (let s = o.depth + 1; s > 0; s--)
    if (t.someProp(e, (l) => s > o.depth ? l(t, n, o.nodeAfter, o.before(s), i, !0) : l(t, n, o.node(s), o.before(s), i, !1)))
      return !0;
  return !1;
}
function or(t, e, n) {
  if (t.focused || t.focus(), t.state.selection.eq(e))
    return;
  let r = t.state.tr.setSelection(e);
  r.setMeta("pointer", !0), t.dispatch(r);
}
function C0(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.doc.resolve(e), r = n.nodeAfter;
  return r && r.isAtom && _.isSelectable(r) ? (or(t, new _(n)), !0) : !1;
}
function S0(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.selection, r, i;
  n instanceof _ && (r = n.node);
  let o = t.state.doc.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let l = s > o.depth ? o.nodeAfter : o.node(s);
    if (_.isSelectable(l)) {
      r && n.$from.depth > 0 && s >= n.$from.depth && o.before(n.$from.depth + 1) == n.$from.pos ? i = o.before(n.$from.depth) : i = o.before(s);
      break;
    }
  }
  return i != null ? (or(t, _.create(t.state.doc, i)), !0) : !1;
}
function M0(t, e, n, r, i) {
  return Ra(t, "handleClickOn", e, n, r) || t.someProp("handleClick", (o) => o(t, e, r)) || (i ? S0(t, n) : C0(t, n));
}
function T0(t, e, n, r) {
  return Ra(t, "handleDoubleClickOn", e, n, r) || t.someProp("handleDoubleClick", (i) => i(t, e, r));
}
function N0(t, e, n, r) {
  return Ra(t, "handleTripleClickOn", e, n, r) || t.someProp("handleTripleClick", (i) => i(t, e, r)) || I0(t, n, r);
}
function I0(t, e, n) {
  if (n.button != 0)
    return !1;
  let r = t.state.doc;
  if (e == -1)
    return r.inlineContent ? (or(t, H.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let s = o > i.depth ? i.nodeAfter : i.node(o), l = i.before(o);
    if (s.inlineContent)
      or(t, H.create(r, l + 1, l + 1 + s.content.size));
    else if (_.isSelectable(s))
      or(t, _.create(r, l));
    else
      continue;
    return !0;
  }
}
function va(t) {
  return So(t);
}
const mp = Ue ? "metaKey" : "ctrlKey";
Oe.mousedown = (t, e) => {
  let n = e;
  t.input.shiftKey = n.shiftKey;
  let r = va(t), i = Date.now(), o = "singleClick";
  i - t.input.lastClick.time < 500 && x0(n, t.input.lastClick) && !n[mp] && t.input.lastClick.button == n.button && (t.input.lastClick.type == "singleClick" ? o = "doubleClick" : t.input.lastClick.type == "doubleClick" && (o = "tripleClick")), t.input.lastClick = { time: i, x: n.clientX, y: n.clientY, type: o, button: n.button };
  let s = t.posAtCoords(Jo(n));
  s && (o == "singleClick" ? (t.input.mouseDown && t.input.mouseDown.done(), t.input.mouseDown = new A0(t, s, n, !!r)) : (o == "doubleClick" ? T0 : N0)(t, s.pos, s.inside, n) ? n.preventDefault() : Yt(t, "pointer"));
};
class A0 {
  constructor(e, n, r, i) {
    this.view = e, this.pos = n, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[mp], this.allowDefault = r.shiftKey;
    let o, s;
    if (n.inside > -1)
      o = e.state.doc.nodeAt(n.inside), s = n.inside;
    else {
      let u = e.state.doc.resolve(n.pos);
      o = u.parent, s = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && o.type.spec.draggable && o.type.spec.selectable !== !1 || c instanceof _ && c.from <= s && c.to > s) && (this.mightDrag = {
      node: o,
      pos: s,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && Ye && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Yt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => Pt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let n = this.pos;
    this.view.state.doc != this.startDoc && (n = this.view.posAtCoords(Jo(e))), this.updateAllowDefault(e), this.allowDefault || !n ? Yt(this.view, "pointer") : M0(this.view, n.pos, n.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Ee && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Me && !this.view.state.selection.visible && Math.min(Math.abs(n.pos - this.view.state.selection.from), Math.abs(n.pos - this.view.state.selection.to)) <= 2) ? (or(this.view, $.near(this.view.state.doc.resolve(n.pos))), e.preventDefault()) : Yt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Yt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Oe.touchstart = (t) => {
  t.input.lastTouch = Date.now(), va(t), Yt(t, "pointer");
};
Oe.touchmove = (t) => {
  t.input.lastTouch = Date.now(), Yt(t, "pointer");
};
Oe.contextmenu = (t) => va(t);
function gp(t, e) {
  return t.composing ? !0 : Ee && Math.abs(e.timeStamp - t.input.compositionEndedAt) < 500 ? (t.input.compositionEndedAt = -2e8, !0) : !1;
}
const E0 = vt ? 5e3 : -1;
De.compositionstart = De.compositionupdate = (t) => {
  if (!t.composing) {
    t.domObserver.flush();
    let { state: e } = t, n = e.selection.$to;
    if (e.selection instanceof H && (e.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      t.markCursor = t.state.storedMarks || n.marks(), So(t, !0), t.markCursor = null;
    else if (So(t, !e.selection.empty), Ye && e.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
      let r = t.domSelectionRange();
      for (let i = r.focusNode, o = r.focusOffset; i && i.nodeType == 1 && o != 0; ) {
        let s = o < 0 ? i.lastChild : i.childNodes[o - 1];
        if (!s)
          break;
        if (s.nodeType == 3) {
          let l = t.domSelection();
          l && l.collapse(s, s.nodeValue.length);
          break;
        } else
          i = s, o = -1;
      }
    }
    t.input.composing = !0;
  }
  yp(t, E0);
};
De.compositionend = (t, e) => {
  t.composing && (t.input.composing = !1, t.input.compositionEndedAt = e.timeStamp, t.input.compositionPendingChanges = t.domObserver.pendingRecords().length ? t.input.compositionID : 0, t.input.compositionNode = null, t.input.compositionPendingChanges && Promise.resolve().then(() => t.domObserver.flush()), t.input.compositionID++, yp(t, 20));
};
function yp(t, e) {
  clearTimeout(t.input.composingTimeout), e > -1 && (t.input.composingTimeout = setTimeout(() => So(t), e));
}
function kp(t) {
  for (t.composing && (t.input.composing = !1, t.input.compositionEndedAt = D0()); t.input.compositionNodes.length > 0; )
    t.input.compositionNodes.pop().markParentsDirty();
}
function O0(t) {
  let e = t.domSelectionRange();
  if (!e.focusNode)
    return null;
  let n = Cx(e.focusNode, e.focusOffset), r = Sx(e.focusNode, e.focusOffset);
  if (n && r && n != r) {
    let i = r.pmViewDesc, o = t.domObserver.lastChangedTextNode;
    if (n == o || r == o)
      return o;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (t.input.compositionNode == r) {
      let s = n.pmViewDesc;
      if (!(!s || !s.isText(n.nodeValue)))
        return r;
    }
  }
  return n || r;
}
function D0() {
  let t = document.createEvent("Event");
  return t.initEvent("event", !0, !0), t.timeStamp;
}
function So(t, e = !1) {
  if (!(vt && t.domObserver.flushingSoon >= 0)) {
    if (t.domObserver.forceFlush(), kp(t), e || t.docView && t.docView.dirty) {
      let n = Aa(t), r = t.state.selection;
      return n && !n.eq(r) ? t.dispatch(t.state.tr.setSelection(n)) : (t.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? t.dispatch(t.state.tr.deleteSelection()) : t.updateState(t.state), !0;
    }
    return !1;
  }
}
function R0(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.dom.parentNode.appendChild(document.createElement("div"));
  n.appendChild(e), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), t.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    n.parentNode && n.parentNode.removeChild(n), t.focus();
  }, 50);
}
const ui = Pe && Zt < 15 || dr && Ax < 604;
Oe.copy = De.cut = (t, e) => {
  let n = e, r = t.state.selection, i = n.type == "cut";
  if (r.empty)
    return;
  let o = ui ? null : n.clipboardData, s = r.content(), { dom: l, text: a } = Oa(t, s);
  o ? (n.preventDefault(), o.clearData(), o.setData("text/html", l.innerHTML), o.setData("text/plain", a)) : R0(t, l), i && t.dispatch(t.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function v0(t) {
  return t.openStart == 0 && t.openEnd == 0 && t.content.childCount == 1 ? t.content.firstChild : null;
}
function L0(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.input.shiftKey || t.state.selection.$from.parent.type.spec.code, r = t.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
  n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = t.input.shiftKey && t.input.lastKeyCode != 45;
  setTimeout(() => {
    t.focus(), r.parentNode && r.parentNode.removeChild(r), n ? fi(t, r.value, null, i, e) : fi(t, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function fi(t, e, n, r, i) {
  let o = cp(t, e, n, r, t.state.selection.$from);
  if (t.someProp("handlePaste", (a) => a(t, i, o || D.empty)))
    return !0;
  if (!o)
    return !1;
  let s = v0(o), l = s ? t.state.tr.replaceSelectionWith(s, r) : t.state.tr.replaceSelection(o);
  return t.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function bp(t) {
  let e = t.getData("text/plain") || t.getData("Text");
  if (e)
    return e;
  let n = t.getData("text/uri-list");
  return n ? n.replace(/\r?\n/g, " ") : "";
}
De.paste = (t, e) => {
  let n = e;
  if (t.composing && !vt)
    return;
  let r = ui ? null : n.clipboardData, i = t.input.shiftKey && t.input.lastKeyCode != 45;
  r && fi(t, bp(r), r.getData("text/html"), i, n) ? n.preventDefault() : L0(t, n);
};
class wp {
  constructor(e, n, r) {
    this.slice = e, this.move = n, this.node = r;
  }
}
const P0 = Ue ? "altKey" : "ctrlKey";
function xp(t, e) {
  let n = t.someProp("dragCopies", (r) => !r(e));
  return n ?? !e[P0];
}
Oe.dragstart = (t, e) => {
  let n = e, r = t.input.mouseDown;
  if (r && r.done(), !n.dataTransfer)
    return;
  let i = t.state.selection, o = i.empty ? null : t.posAtCoords(Jo(n)), s;
  if (!(o && o.pos >= i.from && o.pos <= (i instanceof _ ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      s = _.create(t.state.doc, r.mightDrag.pos);
    else if (n.target && n.target.nodeType == 1) {
      let f = t.docView.nearestDesc(n.target, !0);
      f && f.node.type.spec.draggable && f != t.docView && (s = _.create(t.state.doc, f.posBefore));
    }
  }
  let l = (s || t.state.selection).content(), { dom: a, text: c, slice: u } = Oa(t, l);
  (!n.dataTransfer.files.length || !Me || Ud > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(ui ? "Text" : "text/html", a.innerHTML), n.dataTransfer.effectAllowed = "copyMove", ui || n.dataTransfer.setData("text/plain", c), t.dragging = new wp(u, xp(t, n), s);
};
Oe.dragend = (t) => {
  let e = t.dragging;
  window.setTimeout(() => {
    t.dragging == e && (t.dragging = null);
  }, 50);
};
De.dragover = De.dragenter = (t, e) => e.preventDefault();
De.drop = (t, e) => {
  let n = e, r = t.dragging;
  if (t.dragging = null, !n.dataTransfer)
    return;
  let i = t.posAtCoords(Jo(n));
  if (!i)
    return;
  let o = t.state.doc.resolve(i.pos), s = r && r.slice;
  s ? t.someProp("transformPasted", (p) => {
    s = p(s, t, !1);
  }) : s = cp(t, bp(n.dataTransfer), ui ? null : n.dataTransfer.getData("text/html"), !1, o);
  let l = !!(r && xp(t, n));
  if (t.someProp("handleDrop", (p) => p(t, n, s || D.empty, l))) {
    n.preventDefault();
    return;
  }
  if (!s)
    return;
  n.preventDefault();
  let a = s ? mw(t.state.doc, o.pos, s) : o.pos;
  a == null && (a = o.pos);
  let c = t.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), f = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, h = c.doc;
  if (f ? c.replaceRangeWith(u, u, s.content.firstChild) : c.replaceRange(u, u, s), c.doc.eq(h))
    return;
  let d = c.doc.resolve(u);
  if (f && _.isSelectable(s.content.firstChild) && d.nodeAfter && d.nodeAfter.sameMarkup(s.content.firstChild))
    c.setSelection(new _(d));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, y, g, S) => p = S), c.setSelection(Ea(t, d, c.doc.resolve(p)));
  }
  t.focus(), t.dispatch(c.setMeta("uiEvent", "drop"));
};
Oe.focus = (t) => {
  t.input.lastFocus = Date.now(), t.focused || (t.domObserver.stop(), t.dom.classList.add("ProseMirror-focused"), t.domObserver.start(), t.focused = !0, setTimeout(() => {
    t.docView && t.hasFocus() && !t.domObserver.currentSelection.eq(t.domSelectionRange()) && Pt(t);
  }, 20));
};
Oe.blur = (t, e) => {
  let n = e;
  t.focused && (t.domObserver.stop(), t.dom.classList.remove("ProseMirror-focused"), t.domObserver.start(), n.relatedTarget && t.dom.contains(n.relatedTarget) && t.domObserver.currentSelection.clear(), t.focused = !1);
};
Oe.beforeinput = (t, e) => {
  if (Me && vt && e.inputType == "deleteContentBackward") {
    t.domObserver.flushSoon();
    let { domChangeCount: r } = t.input;
    setTimeout(() => {
      if (t.input.domChangeCount != r || (t.dom.blur(), t.focus(), t.someProp("handleKeyDown", (o) => o(t, wn(8, "Backspace")))))
        return;
      let { $cursor: i } = t.state.selection;
      i && i.pos > 0 && t.dispatch(t.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let t in De)
  Oe[t] = De[t];
function hi(t, e) {
  if (t == e)
    return !0;
  for (let n in t)
    if (t[n] !== e[n])
      return !1;
  for (let n in e)
    if (!(n in t))
      return !1;
  return !0;
}
class Mo {
  constructor(e, n) {
    this.toDOM = e, this.spec = n || In, this.side = this.spec.side || 0;
  }
  map(e, n, r, i) {
    let { pos: o, deleted: s } = e.mapResult(n.from + i, this.side < 0 ? -1 : 1);
    return s ? null : new Ce(o - r, o - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Mo && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && hi(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class tn {
  constructor(e, n) {
    this.attrs = e, this.spec = n || In;
  }
  map(e, n, r, i) {
    let o = e.map(n.from + i, this.spec.inclusiveStart ? -1 : 1) - r, s = e.map(n.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return o >= s ? null : new Ce(o, s, this);
  }
  valid(e, n) {
    return n.from < n.to;
  }
  eq(e) {
    return this == e || e instanceof tn && hi(this.attrs, e.attrs) && hi(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof tn;
  }
  destroy() {
  }
}
class La {
  constructor(e, n) {
    this.attrs = e, this.spec = n || In;
  }
  map(e, n, r, i) {
    let o = e.mapResult(n.from + i, 1);
    if (o.deleted)
      return null;
    let s = e.mapResult(n.to + i, -1);
    return s.deleted || s.pos <= o.pos ? null : new Ce(o.pos - r, s.pos - r, this);
  }
  valid(e, n) {
    let { index: r, offset: i } = e.content.findIndex(n.from), o;
    return i == n.from && !(o = e.child(r)).isText && i + o.nodeSize == n.to;
  }
  eq(e) {
    return this == e || e instanceof La && hi(this.attrs, e.attrs) && hi(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ce {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.from = e, this.to = n, this.type = r;
  }
  /**
  @internal
  */
  copy(e, n) {
    return new Ce(e, n, this.type);
  }
  /**
  @internal
  */
  eq(e, n = 0) {
    return this.type.eq(e.type) && this.from + n == e.from && this.to + n == e.to;
  }
  /**
  @internal
  */
  map(e, n, r) {
    return this.type.map(e, this, n, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, n, r) {
    return new Ce(e, e, new Mo(n, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, n, r, i) {
    return new Ce(e, n, new tn(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, n, r, i) {
    return new Ce(e, n, new La(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof tn;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Mo;
  }
}
const er = [], In = {};
class le {
  /**
  @internal
  */
  constructor(e, n) {
    this.local = e.length ? e : er, this.children = n.length ? n : er;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, n) {
    return n.length ? To(n, e, 0, In) : Se;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, n, r) {
    let i = [];
    return this.findInner(e ?? 0, n ?? 1e9, i, 0, r), i;
  }
  findInner(e, n, r, i, o) {
    for (let s = 0; s < this.local.length; s++) {
      let l = this.local[s];
      l.from <= n && l.to >= e && (!o || o(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let s = 0; s < this.children.length; s += 3)
      if (this.children[s] < n && this.children[s + 1] > e) {
        let l = this.children[s] + 1;
        this.children[s + 2].findInner(e - l, n - l, r, i + l, o);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, n, r) {
    return this == Se || e.maps.length == 0 ? this : this.mapInner(e, n, 0, 0, r || In);
  }
  /**
  @internal
  */
  mapInner(e, n, r, i, o) {
    let s;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(n, a) ? (s || (s = [])).push(a) : o.onRemove && o.onRemove(this.local[l].spec);
    }
    return this.children.length ? z0(this.children, s || [], e, n, r, i, o) : s ? new le(s.sort(An), er) : Se;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, n) {
    return n.length ? this == Se ? le.create(e, n) : this.addInner(e, n, 0) : this;
  }
  addInner(e, n, r) {
    let i, o = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = Sp(n, l, c)) {
        for (i || (i = this.children.slice()); o < i.length && i[o] < a; )
          o += 3;
        i[o] == a ? i[o + 2] = i[o + 2].addInner(l, u, c + 1) : i.splice(o, 0, a, a + l.nodeSize, To(u, l, c + 1, In)), o += 3;
      }
    });
    let s = Cp(o ? Mp(n) : n, -r);
    for (let l = 0; l < s.length; l++)
      s[l].type.valid(e, s[l]) || s.splice(l--, 1);
    return new le(s.length ? this.local.concat(s).sort(An) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == Se ? this : this.removeInner(e, 0);
  }
  removeInner(e, n) {
    let r = this.children, i = this.local;
    for (let o = 0; o < r.length; o += 3) {
      let s, l = r[o] + n, a = r[o + 1] + n;
      for (let u = 0, f; u < e.length; u++)
        (f = e[u]) && f.from > l && f.to < a && (e[u] = null, (s || (s = [])).push(f));
      if (!s)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[o + 2].removeInner(s, l + 1);
      c != Se ? r[o + 2] = c : (r.splice(o, 3), o -= 3);
    }
    if (i.length) {
      for (let o = 0, s; o < e.length; o++)
        if (s = e[o])
          for (let l = 0; l < i.length; l++)
            i[l].eq(s, n) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new le(i, r) : Se;
  }
  forChild(e, n) {
    if (this == Se)
      return this;
    if (n.isLeaf)
      return le.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let o = e + 1, s = o + n.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < s && a.to > o && a.type instanceof tn) {
        let c = Math.max(o, a.from) - o, u = Math.min(s, a.to) - o;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new le(i.sort(An), er);
      return r ? new Ut([l, r]) : l;
    }
    return r || Se;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof le) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let n = 0; n < this.local.length; n++)
      if (!this.local[n].eq(e.local[n]))
        return !1;
    for (let n = 0; n < this.children.length; n += 3)
      if (this.children[n] != e.children[n] || this.children[n + 1] != e.children[n + 1] || !this.children[n + 2].eq(e.children[n + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Pa(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == Se)
      return er;
    if (e.inlineContent || !this.local.some(tn.is))
      return this.local;
    let n = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof tn || n.push(this.local[r]);
    return n;
  }
  forEachSet(e) {
    e(this);
  }
}
le.empty = new le([], []);
le.removeOverlap = Pa;
const Se = le.empty;
class Ut {
  constructor(e) {
    this.members = e;
  }
  map(e, n) {
    const r = this.members.map((i) => i.map(e, n, In));
    return Ut.from(r);
  }
  forChild(e, n) {
    if (n.isLeaf)
      return le.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].forChild(e, n);
      o != Se && (o instanceof Ut ? r = r.concat(o.members) : r.push(o));
    }
    return Ut.from(r);
  }
  eq(e) {
    if (!(e instanceof Ut) || e.members.length != this.members.length)
      return !1;
    for (let n = 0; n < this.members.length; n++)
      if (!this.members[n].eq(e.members[n]))
        return !1;
    return !0;
  }
  locals(e) {
    let n, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].localsInner(e);
      if (o.length)
        if (!n)
          n = o;
        else {
          r && (n = n.slice(), r = !1);
          for (let s = 0; s < o.length; s++)
            n.push(o[s]);
        }
    }
    return n ? Pa(r ? n : n.sort(An)) : er;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return Se;
      case 1:
        return e[0];
      default:
        return new Ut(e.every((n) => n instanceof le) ? e : e.reduce((n, r) => n.concat(r instanceof le ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let n = 0; n < this.members.length; n++)
      this.members[n].forEachSet(e);
  }
}
function z0(t, e, n, r, i, o, s) {
  let l = t.slice();
  for (let c = 0, u = o; c < n.maps.length; c++) {
    let f = 0;
    n.maps[c].forEach((h, d, p, m) => {
      let y = m - p - (d - h);
      for (let g = 0; g < l.length; g += 3) {
        let S = l[g + 1];
        if (S < 0 || h > S + u - f)
          continue;
        let C = l[g] + u - f;
        d >= C ? l[g + 1] = h <= C ? -2 : -1 : h >= u && y && (l[g] += y, l[g + 1] += y);
      }
      f += y;
    }), u = n.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = n.map(t[c] + o), f = u - i;
      if (f < 0 || f >= r.content.size) {
        a = !0;
        continue;
      }
      let h = n.map(t[c + 1] + o, -1), d = h - i, { index: p, offset: m } = r.content.findIndex(f), y = r.maybeChild(p);
      if (y && m == f && m + y.nodeSize == d) {
        let g = l[c + 2].mapInner(n, y, u + 1, t[c] + o + 1, s);
        g != Se ? (l[c] = f, l[c + 1] = d, l[c + 2] = g) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = B0(l, t, e, n, i, o, s), u = To(c, r, 0, s);
    e = u.local;
    for (let f = 0; f < l.length; f += 3)
      l[f + 1] < 0 && (l.splice(f, 3), f -= 3);
    for (let f = 0, h = 0; f < u.children.length; f += 3) {
      let d = u.children[f];
      for (; h < l.length && l[h] < d; )
        h += 3;
      l.splice(h, 0, u.children[f], u.children[f + 1], u.children[f + 2]);
    }
  }
  return new le(e.sort(An), l);
}
function Cp(t, e) {
  if (!e || !t.length)
    return t;
  let n = [];
  for (let r = 0; r < t.length; r++) {
    let i = t[r];
    n.push(new Ce(i.from + e, i.to + e, i.type));
  }
  return n;
}
function B0(t, e, n, r, i, o, s) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let f = a.local[u].map(r, i, c);
      f ? n.push(f) : s.onRemove && s.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < t.length; a += 3)
    t[a + 1] == -1 && l(t[a + 2], e[a] + o + 1);
  return n;
}
function Sp(t, e, n) {
  if (e.isLeaf)
    return null;
  let r = n + e.nodeSize, i = null;
  for (let o = 0, s; o < t.length; o++)
    (s = t[o]) && s.from > n && s.to < r && ((i || (i = [])).push(s), t[o] = null);
  return i;
}
function Mp(t) {
  let e = [];
  for (let n = 0; n < t.length; n++)
    t[n] != null && e.push(t[n]);
  return e;
}
function To(t, e, n, r) {
  let i = [], o = !1;
  e.forEach((l, a) => {
    let c = Sp(t, l, a + n);
    if (c) {
      o = !0;
      let u = To(c, l, n + a + 1, r);
      u != Se && i.push(a, a + l.nodeSize, u);
    }
  });
  let s = Cp(o ? Mp(t) : t, -n).sort(An);
  for (let l = 0; l < s.length; l++)
    s[l].type.valid(e, s[l]) || (r.onRemove && r.onRemove(s[l].spec), s.splice(l--, 1));
  return s.length || i.length ? new le(s, i) : Se;
}
function An(t, e) {
  return t.from - e.from || t.to - e.to;
}
function Pa(t) {
  let e = t;
  for (let n = 0; n < e.length - 1; n++) {
    let r = e[n];
    if (r.from != r.to)
      for (let i = n + 1; i < e.length; i++) {
        let o = e[i];
        if (o.from == r.from) {
          o.to != r.to && (e == t && (e = t.slice()), e[i] = o.copy(o.from, r.to), mf(e, i + 1, o.copy(r.to, o.to)));
          continue;
        } else {
          o.from < r.to && (e == t && (e = t.slice()), e[n] = r.copy(r.from, o.from), mf(e, i, r.copy(o.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function mf(t, e, n) {
  for (; e < t.length && An(n, t[e]) > 0; )
    e++;
  t.splice(e, 0, n);
}
function Vs(t) {
  let e = [];
  return t.someProp("decorations", (n) => {
    let r = n(t.state);
    r && r != Se && e.push(r);
  }), t.cursorWrapper && e.push(le.create(t.state.doc, [t.cursorWrapper.deco])), Ut.from(e);
}
const F0 = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, _0 = Pe && Zt <= 11;
class $0 {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class V0 {
  constructor(e, n) {
    this.view = e, this.handleDOMChange = n, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new $0(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Pe && Zt <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), _0 && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, F0)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let n = 0; n < e.length; n++)
          this.queue.push(e[n]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (lf(this.view)) {
      if (this.suppressingSelectionUpdates)
        return Pt(this.view);
      if (Pe && Zt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Fn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let n = /* @__PURE__ */ new Set(), r;
    for (let o = e.focusNode; o; o = hr(o))
      n.add(o);
    for (let o = e.anchorNode; o; o = hr(o))
      if (n.has(o)) {
        r = o;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let n = this.pendingRecords();
    n.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && lf(e) && !this.ignoreSelectionChange(r), o = -1, s = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < n.length; u++) {
        let f = this.registerMutation(n[u], a);
        f && (o = o < 0 ? f.from : Math.min(f.from, o), s = s < 0 ? f.to : Math.max(f.to, s), f.typeOver && (l = !0));
      }
    if (Ye && a.length) {
      let u = a.filter((f) => f.nodeName == "BR");
      if (u.length == 2) {
        let [f, h] = u;
        f.parentNode && f.parentNode.parentNode == h.parentNode ? h.remove() : f.remove();
      } else {
        let { focusNode: f } = this.currentSelection;
        for (let h of u) {
          let d = h.parentNode;
          d && d.nodeName == "LI" && (!f || j0(e, f) != d) && h.remove();
        }
      }
    }
    let c = null;
    o < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Ko(r) && (c = Aa(e)) && c.eq($.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Pt(e), this.currentSelection.set(r), e.scrollToSelection()) : (o > -1 || i) && (o > -1 && (e.docView.markDirty(o, s), H0(e)), this.handleDOMChange(o, s, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || Pt(e), this.currentSelection.set(r));
  }
  registerMutation(e, n) {
    if (n.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let f = e.addedNodes[u];
        n.push(f), f.nodeType == 3 && (this.lastChangedTextNode = f);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, o = e.nextSibling;
      if (Pe && Zt <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: f, nextSibling: h } = e.addedNodes[u];
          (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (i = f), (!h || Array.prototype.indexOf.call(e.addedNodes, h) < 0) && (o = h);
        }
      let s = i && i.parentNode == e.target ? xe(i) + 1 : 0, l = r.localPosFromDOM(e.target, s, -1), a = o && o.parentNode == e.target ? xe(o) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let gf = /* @__PURE__ */ new WeakMap(), yf = !1;
function H0(t) {
  if (!gf.has(t) && (gf.set(t, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(t.dom).whiteSpace) !== -1)) {
    if (t.requiresGeckoHackNode = Ye, yf)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), yf = !0;
  }
}
function kf(t, e) {
  let n = e.startContainer, r = e.startOffset, i = e.endContainer, o = e.endOffset, s = t.domAtPos(t.state.selection.anchor);
  return Fn(s.node, s.offset, i, o) && ([n, r, i, o] = [i, o, n, r]), { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: o };
}
function W0(t, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(t.root)[0];
    if (i)
      return kf(t, i);
  }
  let n;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), n = i.getTargetRanges()[0];
  }
  return t.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), t.dom.removeEventListener("beforeinput", r, !0), n ? kf(t, n) : null;
}
function j0(t, e) {
  for (let n = e.parentNode; n && n != t.dom; n = n.parentNode) {
    let r = t.docView.nearestDesc(n, !0);
    if (r && r.node.isBlock)
      return n;
  }
  return null;
}
function q0(t, e, n) {
  let { node: r, fromOffset: i, toOffset: o, from: s, to: l } = t.docView.parseRange(e, n), a = t.domSelectionRange(), c, u = a.anchorNode;
  if (u && t.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], Ko(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), Me && t.input.lastKeyCode === 8)
    for (let y = o; y > i; y--) {
      let g = r.childNodes[y - 1], S = g.pmViewDesc;
      if (g.nodeName == "BR" && !S) {
        o = y;
        break;
      }
      if (!S || S.size)
        break;
    }
  let f = t.state.doc, h = t.someProp("domParser") || Pn.fromSchema(t.state.schema), d = f.resolve(s), p = null, m = h.parse(r, {
    topNode: d.parent,
    topMatch: d.parent.contentMatchAt(d.index()),
    topOpen: !0,
    from: i,
    to: o,
    preserveWhitespace: d.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: K0,
    context: d
  });
  if (c && c[0].pos != null) {
    let y = c[0].pos, g = c[1] && c[1].pos;
    g == null && (g = y), p = { anchor: y + s, head: g + s };
  }
  return { doc: m, sel: p, from: s, to: l };
}
function K0(t) {
  let e = t.pmViewDesc;
  if (e)
    return e.parseRule();
  if (t.nodeName == "BR" && t.parentNode) {
    if (Ee && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
      let n = document.createElement("div");
      return n.appendChild(document.createElement("li")), { skip: n };
    } else if (t.parentNode.lastChild == t || Ee && /^(tr|table)$/i.test(t.parentNode.nodeName))
      return { ignore: !0 };
  } else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const U0 = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function J0(t, e, n, r, i) {
  let o = t.input.compositionPendingChanges || (t.composing ? t.input.compositionID : 0);
  if (t.input.compositionPendingChanges = 0, e < 0) {
    let O = t.input.lastSelectionTime > Date.now() - 50 ? t.input.lastSelectionOrigin : null, L = Aa(t, O);
    if (L && !t.state.selection.eq(L)) {
      if (Me && vt && t.input.lastKeyCode === 13 && Date.now() - 100 < t.input.lastKeyCodeTime && t.someProp("handleKeyDown", (v) => v(t, wn(13, "Enter"))))
        return;
      let w = t.state.tr.setSelection(L);
      O == "pointer" ? w.setMeta("pointer", !0) : O == "key" && w.scrollIntoView(), o && w.setMeta("composition", o), t.dispatch(w);
    }
    return;
  }
  let s = t.state.doc.resolve(e), l = s.sharedDepth(n);
  e = s.before(l + 1), n = t.state.doc.resolve(n).after(l + 1);
  let a = t.state.selection, c = q0(t, e, n), u = t.state.doc, f = u.slice(c.from, c.to), h, d;
  t.input.lastKeyCode === 8 && Date.now() - 100 < t.input.lastKeyCodeTime ? (h = t.state.selection.to, d = "end") : (h = t.state.selection.from, d = "start"), t.input.lastKeyCode = null;
  let p = Q0(f.content, c.doc.content, c.from, h, d);
  if (p && t.input.domChangeCount++, (dr && t.input.lastIOSEnter > Date.now() - 225 || vt) && i.some((O) => O.nodeType == 1 && !U0.test(O.nodeName)) && (!p || p.endA >= p.endB) && t.someProp("handleKeyDown", (O) => O(t, wn(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof H && !a.empty && a.$head.sameParent(a.$anchor) && !t.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let O = bf(t, t.state.doc, c.sel);
        if (O && !O.eq(t.state.selection)) {
          let L = t.state.tr.setSelection(O);
          o && L.setMeta("composition", o), t.dispatch(L);
        }
      }
      return;
    }
  t.state.selection.from < t.state.selection.to && p.start == p.endB && t.state.selection instanceof H && (p.start > t.state.selection.from && p.start <= t.state.selection.from + 2 && t.state.selection.from >= c.from ? p.start = t.state.selection.from : p.endA < t.state.selection.to && p.endA >= t.state.selection.to - 2 && t.state.selection.to <= c.to && (p.endB += t.state.selection.to - p.endA, p.endA = t.state.selection.to)), Pe && Zt <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), y = c.doc.resolveNoCache(p.endB - c.from), g = u.resolve(p.start), S = m.sameParent(y) && m.parent.inlineContent && g.end() >= p.endA, C;
  if ((dr && t.input.lastIOSEnter > Date.now() - 225 && (!S || i.some((O) => O.nodeName == "DIV" || O.nodeName == "P")) || !S && m.pos < c.doc.content.size && (!m.sameParent(y) || !m.parent.inlineContent) && !/\S/.test(c.doc.textBetween(m.pos, y.pos, "", "")) && (C = $.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && C.head > m.pos) && t.someProp("handleKeyDown", (O) => O(t, wn(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (t.state.selection.anchor > p.start && Y0(u, p.start, p.endA, m, y) && t.someProp("handleKeyDown", (O) => O(t, wn(8, "Backspace")))) {
    vt && Me && t.domObserver.suppressSelectionUpdates();
    return;
  }
  Me && p.endB == p.start && (t.input.lastChromeDelete = Date.now()), vt && !S && m.start() != y.start() && y.parentOffset == 0 && m.depth == y.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, y = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    t.someProp("handleKeyDown", function(O) {
      return O(t, wn(13, "Enter"));
    });
  }, 20));
  let I = p.start, A = p.endA, x = (O) => {
    let L = O || t.state.tr.replace(I, A, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let w = bf(t, L.doc, c.sel);
      w && !(Me && t.composing && w.empty && (p.start != p.endB || t.input.lastChromeDelete < Date.now() - 100) && (w.head == I || w.head == L.mapping.map(A) - 1) || Pe && w.empty && w.head == I) && L.setSelection(w);
    }
    return o && L.setMeta("composition", o), L.scrollIntoView();
  }, R;
  if (S) {
    if (m.pos == y.pos) {
      Pe && Zt <= 11 && m.parentOffset == 0 && (t.domObserver.suppressSelectionUpdates(), setTimeout(() => Pt(t), 20));
      let O = x(t.state.tr.delete(I, A)), L = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      L && O.ensureMarks(L), t.dispatch(O);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (R = G0(m.parent.content.cut(m.parentOffset, y.parentOffset), g.parent.content.cut(g.parentOffset, p.endA - g.start())))
    ) {
      let O = x(t.state.tr);
      R.type == "add" ? O.addMark(I, A, R.mark) : O.removeMark(I, A, R.mark), t.dispatch(O);
    } else if (m.parent.child(m.index()).isText && m.index() == y.index() - (y.textOffset ? 0 : 1)) {
      let O = m.parent.textBetween(m.parentOffset, y.parentOffset), L = () => x(t.state.tr.insertText(O, I, A));
      t.someProp("handleTextInput", (w) => w(t, I, A, O, L)) || t.dispatch(L());
    }
  } else
    t.dispatch(x());
}
function bf(t, e, n) {
  return Math.max(n.anchor, n.head) > e.content.size ? null : Ea(t, e.resolve(n.anchor), e.resolve(n.head));
}
function G0(t, e) {
  let n = t.firstChild.marks, r = e.firstChild.marks, i = n, o = r, s, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < n.length; u++)
    o = n[u].removeFromSet(o);
  if (i.length == 1 && o.length == 0)
    l = i[0], s = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && o.length == 1)
    l = o[0], s = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (N.from(c).eq(t))
    return { mark: l, type: s };
}
function Y0(t, e, n, r, i) {
  if (
    // The content must have shrunk
    n - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Hs(r, !0, !1) < i.pos
  )
    return !1;
  let o = t.resolve(e);
  if (!r.parent.isTextblock) {
    let l = o.nodeAfter;
    return l != null && n == e + l.nodeSize;
  }
  if (o.parentOffset < o.parent.content.size || !o.parent.isTextblock)
    return !1;
  let s = t.resolve(Hs(o, !0, !0));
  return !s.parent.isTextblock || s.pos > n || Hs(s, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(s.parent.content);
}
function Hs(t, e, n) {
  let r = t.depth, i = e ? t.end() : t.pos;
  for (; r > 0 && (e || t.indexAfter(r) == t.node(r).childCount); )
    r--, i++, e = !1;
  if (n) {
    let o = t.node(r).maybeChild(t.indexAfter(r));
    for (; o && !o.isLeaf; )
      o = o.firstChild, i++;
  }
  return i;
}
function Q0(t, e, n, r, i) {
  let o = t.findDiffStart(e, n);
  if (o == null)
    return null;
  let { a: s, b: l } = t.findDiffEnd(e, n + t.size, n + e.size);
  if (i == "end") {
    let a = Math.max(0, o - Math.min(s, l));
    r -= s + a - o;
  }
  if (s < o && t.size < e.size) {
    let a = r <= o && r >= s ? o - r : 0;
    o -= a, o && o < e.size && wf(e.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), l = o + (l - s), s = o;
  } else if (l < o) {
    let a = r <= o && r >= l ? o - r : 0;
    o -= a, o && o < t.size && wf(t.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), s = o + (s - l), l = o;
  }
  return { start: o, endA: s, endB: l };
}
function wf(t) {
  if (t.length != 2)
    return !1;
  let e = t.charCodeAt(0), n = t.charCodeAt(1);
  return e >= 56320 && e <= 57343 && n >= 55296 && n <= 56319;
}
class Tp {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, n) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new g0(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = n, this.state = n.state, this.directPlugins = n.plugins || [], this.directPlugins.forEach(Tf), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Sf(this), Cf(this), this.nodeViews = Mf(this), this.docView = ef(this.state.doc, xf(this), Vs(this), this.dom, this), this.domObserver = new V0(this, (r, i, o, s) => J0(this, r, i, o, s)), this.domObserver.start(), y0(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let n in e)
        this._props[n] = e[n];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Hl(this);
    let n = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Tf), this.directPlugins = e.plugins), this.updateStateInner(e.state, n);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let n = {};
    for (let r in this._props)
      n[r] = this._props[r];
    n.state = this.state;
    for (let r in e)
      n[r] = e[r];
    this.update(n);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, n) {
    var r;
    let i = this.state, o = !1, s = !1;
    e.storedMarks && this.composing && (kp(this), s = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != n.plugins;
    if (l || this._props.plugins != n.plugins || this._props.nodeViews != n.nodeViews) {
      let d = Mf(this);
      Z0(d, this.nodeViews) && (this.nodeViews = d, o = !0);
    }
    (l || n.handleDOMEvents != this._props.handleDOMEvents) && Hl(this), this.editable = Sf(this), Cf(this);
    let a = Vs(this), c = xf(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", f = o || !this.docView.matchesNode(e.doc, c, a);
    (f || !e.selection.eq(i.selection)) && (s = !0);
    let h = u == "preserve" && s && this.dom.style.overflowAnchor == null && Dx(this);
    if (s) {
      this.domObserver.stop();
      let d = f && (Pe || Me) && !this.composing && !i.selection.empty && !e.selection.empty && X0(i.selection, e.selection);
      if (f) {
        let p = Me ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = O0(this)), (o || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = ef(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (d = !0);
      }
      d || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && t0(this)) ? Pt(this, d) : (sp(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : h && Rx(h);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (n) => n(this))) if (this.state.selection instanceof _) {
        let n = this.docView.domAfterPos(this.state.selection.from);
        n.nodeType == 1 && Ju(this, n.getBoundingClientRect(), e);
      } else
        Ju(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let n = 0; n < this.directPlugins.length; n++) {
        let r = this.directPlugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let n = 0; n < this.state.plugins.length; n++) {
        let r = this.state.plugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let n = 0; n < this.pluginViews.length; n++) {
        let r = this.pluginViews[n];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, n) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let o = r.from + (this.state.doc.content.size - n.doc.content.size);
      (o > 0 && this.state.doc.nodeAt(o)) == r.node && (i = o);
    }
    this.dragging = new wp(e.slice, e.move, i < 0 ? void 0 : _.create(this.state.doc, i));
  }
  someProp(e, n) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = n ? n(r) : r))
      return i;
    for (let s = 0; s < this.directPlugins.length; s++) {
      let l = this.directPlugins[s].props[e];
      if (l != null && (i = n ? n(l) : l))
        return i;
    }
    let o = this.state.plugins;
    if (o)
      for (let s = 0; s < o.length; s++) {
        let l = o[s].props[e];
        if (l != null && (i = n ? n(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Pe) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && vx(this.dom), Pt(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let n = this.dom.parentNode; n; n = n.parentNode)
        if (n.nodeType == 9 || n.nodeType == 11 && n.host)
          return n.getSelection || (Object.getPrototypeOf(n).getSelection = () => n.ownerDocument.getSelection()), this._root = n;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Fx(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, n = 1) {
    return Xd(this, e, n);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, n = 0) {
    return this.docView.domFromPos(e, n);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let n = this.docView.descAt(e);
    return n ? n.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, n, r = -1) {
    let i = this.docView.posFromDOM(e, n, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, n) {
    return Wx(this, n || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, n) {
    return fi(this, "", e, !1, n || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, n) {
    return fi(this, e, null, !0, n || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Oa(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (k0(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Vs(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, wx());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return w0(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? Ee && this.root.nodeType === 11 && Tx(this.dom.ownerDocument) == this.dom && W0(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
Tp.prototype.dispatch = function(t) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, t) : this.updateState(this.state.apply(t));
};
function xf(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(t.editable), t.someProp("attributes", (n) => {
    if (typeof n == "function" && (n = n(t.state)), n)
      for (let r in n)
        r == "class" ? e.class += " " + n[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + n[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(n[r]));
  }), e.translate || (e.translate = "no"), [Ce.node(0, t.state.doc.content.size, e)];
}
function Cf(t) {
  if (t.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), t.cursorWrapper = { dom: e, deco: Ce.widget(t.state.selection.from, e, { raw: !0, marks: t.markCursor }) };
  } else
    t.cursorWrapper = null;
}
function Sf(t) {
  return !t.someProp("editable", (e) => e(t.state) === !1);
}
function X0(t, e) {
  let n = Math.min(t.$anchor.sharedDepth(t.head), e.$anchor.sharedDepth(e.head));
  return t.$anchor.start(n) != e.$anchor.start(n);
}
function Mf(t) {
  let e = /* @__PURE__ */ Object.create(null);
  function n(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return t.someProp("nodeViews", n), t.someProp("markViews", n), e;
}
function Z0(t, e) {
  let n = 0, r = 0;
  for (let i in t) {
    if (t[i] != e[i])
      return !0;
    n++;
  }
  for (let i in e)
    r++;
  return n != r;
}
function Tf(t) {
  if (t.spec.state || t.spec.filterTransaction || t.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
function un(t, e) {
  return t.meta = {
    package: "@milkdown/core",
    group: "System",
    ...e
  }, t;
}
const Np = {
  text: (t, e, n, r) => {
    const i = t.value;
    return /^[^*_\\]*\s+$/.test(i) ? i : n.safe(i, { ...r, encode: [] });
  },
  strong: (t, e, n, r) => {
    const i = t.marker || n.options.strong || "*", o = n.enter("strong"), s = n.createTracker(r);
    let l = s.move(i + i);
    return l += s.move(
      n.containerPhrasing(t, {
        before: l,
        after: i,
        ...s.current()
      })
    ), l += s.move(i + i), o(), l;
  },
  emphasis: (t, e, n, r) => {
    const i = t.marker || n.options.emphasis || "*", o = n.enter("emphasis"), s = n.createTracker(r);
    let l = s.move(i);
    return l += s.move(
      n.containerPhrasing(t, {
        before: l,
        after: i,
        ...s.current()
      })
    ), l += s.move(i), o(), l;
  }
}, st = Q({}, "editorView"), Hr = Q({}, "editorState"), Ws = Q([], "initTimer"), Nf = Q({}, "editor"), di = Q([], "inputRules"), zt = Q([], "prosePlugins"), pi = Q(
  [],
  "remarkPlugins"
), Wl = Q([], "nodeView"), jl = Q([], "markView"), En = Q(
  Tl().use(kl).use(Cl),
  "remark"
), Yr = Q(
  {
    handlers: Np,
    encode: []
  },
  "remarkStringifyOptions"
), ro = Ft("ConfigReady");
function eC(t) {
  const e = (n) => (n.record(ro), async () => (await t(n), n.done(ro), () => {
    n.clearTimer(ro);
  }));
  return un(e, {
    displayName: "Config"
  }), e;
}
const On = Ft("InitReady");
function tC(t) {
  const e = (n) => (n.inject(Nf, t).inject(zt, []).inject(pi, []).inject(di, []).inject(Wl, []).inject(jl, []).inject(Yr, {
    handlers: Np,
    encode: []
  }).inject(En, Tl().use(kl).use(Cl)).inject(Ws, [ro]).record(On), async () => {
    await n.waitTimers(Ws);
    const r = n.get(Yr);
    return n.set(
      En,
      Tl().use(kl).use(Cl, r)
    ), n.done(On), () => {
      n.remove(Nf).remove(zt).remove(pi).remove(di).remove(Wl).remove(jl).remove(Yr).remove(En).remove(Ws).clearTimer(On);
    };
  });
  return un(e, {
    displayName: "Init"
  }), e;
}
const lt = Ft("SchemaReady"), js = Q([], "schemaTimer"), at = Q({}, "schema"), Qr = Q([], "nodes"), Xr = Q([], "marks");
function If(t) {
  return {
    ...t,
    parseDOM: t.parseDOM?.map((e) => ({ priority: t.priority, ...e }))
  };
}
const Ip = (t) => (t.inject(at, {}).inject(Qr, []).inject(Xr, []).inject(js, [On]).record(lt), async () => {
  await t.waitTimers(js);
  const e = t.get(En), r = t.get(pi).reduce(
    (l, a) => l.use(a.plugin, a.options),
    e
  );
  t.set(En, r);
  const i = Object.fromEntries(
    t.get(Qr).map(([l, a]) => [l, If(a)])
  ), o = Object.fromEntries(
    t.get(Xr).map(([l, a]) => [l, If(a)])
  ), s = new py({ nodes: i, marks: o });
  return t.set(at, s), t.done(lt), () => {
    t.remove(at).remove(Qr).remove(Xr).remove(js).clearTimer(lt);
  };
});
un(Ip, {
  displayName: "Schema"
});
class Ap {
  constructor() {
    this.#t = new xh(), this.#e = null, this.setCtx = (e) => {
      this.#e = e;
    }, this.chain = () => {
      if (this.#e == null) throw ms();
      const e = this.#e, n = [], r = this.get.bind(this), i = {
        run: () => {
          const s = mr(...n), l = e.get(st);
          return s(l.state, l.dispatch, l);
        },
        inline: (s) => (n.push(s), i),
        pipe: o.bind(this)
      };
      function o(s, l) {
        const a = r(s);
        return n.push(a(l)), i;
      }
      return i;
    };
  }
  #t;
  #e;
  get ctx() {
    return this.#e;
  }
  /// Register a command into the manager.
  create(e, n) {
    const r = e.create(this.#t.sliceMap);
    return r.set(n), r;
  }
  get(e) {
    return this.#t.get(e).get();
  }
  remove(e) {
    return this.#t.remove(e);
  }
  call(e, n) {
    if (this.#e == null) throw ms();
    const i = this.get(e)(n), o = this.#e.get(st);
    return i(o.state, o.dispatch, o);
  }
  /// Call an inline command.
  inline(e) {
    if (this.#e == null) throw ms();
    const n = this.#e.get(st);
    return e(n.state, n.dispatch, n);
  }
}
function nC(t = "cmdKey") {
  return Q((() => () => !1), t);
}
const J = Q(new Ap(), "commands"), qs = Q([lt], "commandsTimer"), Zr = Ft("CommandsReady"), Ep = (t) => {
  const e = new Ap();
  return e.setCtx(t), t.inject(J, e).inject(qs, [lt]).record(Zr), async () => (await t.waitTimers(qs), t.done(Zr), () => {
    t.remove(J).remove(qs).clearTimer(Zr);
  });
};
un(Ep, {
  displayName: "Commands"
});
function rC(t) {
  const e = mr(
    jw,
    xa,
    Tw,
    zd
  );
  return t.Backspace = e, t;
}
class Op {
  constructor() {
    this.#t = null, this.#e = [], this.setCtx = (e) => {
      this.#t = e;
    }, this.add = (e) => (this.#e.push(e), () => {
      this.#e = this.#e.filter((n) => n !== e);
    }), this.addObjectKeymap = (e) => {
      const n = [];
      return Object.entries(e).forEach(([r, i]) => {
        if (typeof i == "function") {
          const o = {
            key: r,
            onRun: () => i
          };
          this.#e.push(o), n.push(() => {
            this.#e = this.#e.filter((s) => s !== o);
          });
        } else
          this.#e.push(i), n.push(() => {
            this.#e = this.#e.filter((o) => o !== i);
          });
      }), () => {
        n.forEach((r) => r());
      };
    }, this.addBaseKeymap = () => {
      const e = rC(Hw);
      return this.addObjectKeymap(e);
    }, this.build = () => {
      const e = {};
      return this.#e.forEach((r) => {
        e[r.key] = [...e[r.key] || [], r];
      }), Object.fromEntries(
        Object.entries(e).map(([r, i]) => {
          const o = i.sort(
            (l, a) => (a.priority ?? 50) - (l.priority ?? 50)
          );
          return [r, (l, a, c) => {
            const u = this.#t;
            if (u == null) throw Bo();
            const f = o.map((d) => d.onRun(u));
            return mr(...f)(l, a, c);
          }];
        })
      );
    };
  }
  #t;
  #e;
  get ctx() {
    return this.#t;
  }
}
const No = Q(new Op(), "keymap"), Ks = Q([lt], "keymapTimer"), ei = Ft("KeymapReady"), iC = (t) => {
  const e = new Op();
  return e.setCtx(t), t.inject(No, e).inject(Ks, [lt]).record(ei), async () => (await t.waitTimers(Ks), t.done(ei), () => {
    t.remove(No).remove(Ks).clearTimer(ei);
  });
}, io = Ft("ParserReady"), Dp = (() => {
  throw Bo();
}), sr = Q(Dp, "parser"), Us = Q([], "parserTimer"), Rp = (t) => (t.inject(sr, Dp).inject(Us, [lt]).record(io), async () => {
  await t.waitTimers(Us);
  const e = t.get(En), n = t.get(at);
  return t.set(sr, G1.create(n, e)), t.done(io), () => {
    t.remove(sr).remove(Us).clearTimer(io);
  };
});
un(Rp, {
  displayName: "Parser"
});
const ti = Ft("SerializerReady"), Js = Q(
  [],
  "serializerTimer"
), vp = (() => {
  throw Bo();
}), Dn = Q(
  vp,
  "serializer"
), Lp = (t) => (t.inject(Dn, vp).inject(Js, [lt]).record(ti), async () => {
  await t.waitTimers(Js);
  const e = t.get(En), n = t.get(at);
  return t.set(Dn, Q1.create(n, e)), t.done(ti), () => {
    t.remove(Dn).remove(Js).clearTimer(ti);
  };
});
un(Lp, {
  displayName: "Serializer"
});
const Gs = Q("", "defaultValue"), oo = Q(
  (t) => t,
  "stateOptions"
), Ys = Q(
  [],
  "editorStateTimer"
), so = Ft("EditorStateReady");
function oC(t, e, n) {
  if (typeof t == "string") return e(t);
  if (t.type === "html")
    return Pn.fromSchema(n).parse(t.dom);
  if (t.type === "json")
    return Lt.fromJSON(n, t.value);
  throw Bg(t);
}
const sC = new he("MILKDOWN_STATE_TRACKER"), Pp = (t) => (t.inject(Gs, "").inject(Hr, {}).inject(oo, (e) => e).inject(Ys, [
  io,
  ti,
  Zr,
  ei
]).record(so), async () => {
  await t.waitTimers(Ys);
  const e = t.get(at), n = t.get(sr), r = t.get(di), i = t.get(oo), o = t.get(zt), s = t.get(Gs), l = oC(s, n, e), a = t.get(No), c = a.addBaseKeymap(), u = [
    ...o,
    new ye({
      key: sC,
      state: {
        init: () => {
        },
        apply: (d, p, m, y) => {
          t.set(Hr, y);
        }
      }
    }),
    Yw({ rules: r }),
    bx(a.build())
  ];
  t.set(zt, u);
  const f = i({
    schema: e,
    doc: l,
    plugins: u
  }), h = xn.create(f);
  return t.set(Hr, h), t.done(so), () => {
    c(), t.remove(Gs).remove(Hr).remove(oo).remove(Ys).clearTimer(so);
  };
});
un(Pp, {
  displayName: "EditorState"
});
const lo = Ft("EditorViewReady"), Qs = Q(
  [],
  "editorViewTimer"
), ni = Q(
  {},
  "editorViewOptions"
), ao = Q(null, "root"), ql = Q(null, "rootDOM"), Kl = Q(
  {},
  "rootAttrs"
);
function lC(t, e) {
  const n = document.createElement("div");
  n.className = "milkdown", t.appendChild(n), e.set(ql, n);
  const r = e.get(Kl);
  return Object.entries(r).forEach(
    ([i, o]) => n.setAttribute(i, o)
  ), n;
}
function aC(t) {
  t.classList.add("editor"), t.setAttribute("role", "textbox");
}
const cC = new he("MILKDOWN_VIEW_CLEAR"), zp = (t) => (t.inject(ao, document.body).inject(st, {}).inject(ni, {}).inject(ql, null).inject(Kl, {}).inject(Qs, [so]).record(lo), async () => {
  await t.wait(On);
  const e = t.get(ao) || document.body, n = typeof e == "string" ? document.querySelector(e) : e;
  t.update(zt, (a) => [
    new ye({
      key: cC,
      view: (c) => {
        const u = n ? lC(n, t) : void 0;
        return (() => {
          if (u && n) {
            const h = c.dom;
            n.replaceChild(u, h), u.appendChild(h);
          }
        })(), {
          destroy: () => {
            u?.parentNode && u?.parentNode.replaceChild(c.dom, u), u?.remove();
          }
        };
      }
    }),
    ...a
  ]), await t.waitTimers(Qs);
  const r = t.get(Hr), i = t.get(ni), o = Object.fromEntries(t.get(Wl)), s = Object.fromEntries(t.get(jl)), l = new Tp(n, {
    state: r,
    nodeViews: o,
    markViews: s,
    ...i
  });
  return aC(l.dom), t.set(st, l), t.done(lo), () => {
    l?.destroy(), t.remove(ao).remove(st).remove(ni).remove(ql).remove(Kl).remove(Qs).clearTimer(lo);
  };
});
un(zp, {
  displayName: "EditorView"
});
class za {
  constructor() {
    this.#t = !1, this.#e = "Idle", this.#r = [], this.#n = () => {
    }, this.#l = new xh(), this.#o = new Gg(), this.#i = /* @__PURE__ */ new Map(), this.#s = /* @__PURE__ */ new Map(), this.#a = new la(this.#l, this.#o), this.#u = () => {
      const e = eC(async (r) => {
        await Promise.all(this.#r.map((i) => i(r)));
      }), n = [
        Ip,
        Rp,
        Lp,
        Ep,
        iC,
        Pp,
        zp,
        tC(this),
        e
      ];
      this.#c(n, this.#s);
    }, this.#c = (e, n) => {
      e.forEach((r) => {
        const i = this.#a.produce(
          this.#t ? r.meta : void 0
        ), o = r(i);
        n.set(r, { ctx: i, handler: o, cleanup: void 0 });
      });
    }, this.#h = (e, n = !1) => Promise.all(
      [e].flat().map((r) => {
        const o = this.#i.get(r)?.cleanup;
        return n ? this.#i.delete(r) : this.#i.set(r, {
          ctx: void 0,
          handler: void 0,
          cleanup: void 0
        }), typeof o == "function" ? o() : o;
      })
    ), this.#p = async () => {
      await Promise.all(
        [...this.#s.entries()].map(([e, { cleanup: n }]) => typeof n == "function" ? n() : n)
      ), this.#s.clear();
    }, this.#f = (e) => {
      this.#e = e, this.#n(e);
    }, this.#d = (e) => [...e.entries()].map(async ([n, r]) => {
      const { ctx: i, handler: o } = r;
      if (!o) return;
      const s = await o();
      e.set(n, { ctx: i, handler: o, cleanup: s });
    }), this.enableInspector = (e = !0) => (this.#t = e, this), this.onStatusChange = (e) => (this.#n = e, this), this.config = (e) => (this.#r.push(e), this), this.removeConfig = (e) => (this.#r = this.#r.filter((n) => n !== e), this), this.use = (e) => {
      const n = [e].flat();
      return n.flat().forEach((r) => {
        this.#i.set(r, {
          ctx: void 0,
          handler: void 0,
          cleanup: void 0
        });
      }), this.#e === "Created" && this.#c(n, this.#i), this;
    }, this.remove = async (e) => this.#e === "OnCreate" ? (console.warn(
      "[Milkdown]: You are trying to remove plugins when the editor is creating, this is not recommended, please check your code."
    ), new Promise((n) => {
      setTimeout(() => {
        n(this.remove(e));
      }, 50);
    })) : (await this.#h([e].flat(), !0), this), this.create = async () => this.#e === "OnCreate" ? this : (this.#e === "Created" && await this.destroy(), this.#f(
      "OnCreate"
      /* OnCreate */
    ), this.#u(), this.#c([...this.#i.keys()], this.#i), await Promise.all(
      [
        this.#d(this.#s),
        this.#d(this.#i)
      ].flat()
    ), this.#f(
      "Created"
      /* Created */
    ), this), this.destroy = async (e = !1) => this.#e === "Destroyed" || this.#e === "OnDestroy" ? this : this.#e === "OnCreate" ? new Promise((n) => {
      setTimeout(() => {
        n(this.destroy(e));
      }, 50);
    }) : (e && (this.#r = []), this.#f(
      "OnDestroy"
      /* OnDestroy */
    ), await this.#h([...this.#i.keys()], e), await this.#p(), this.#f(
      "Destroyed"
      /* Destroyed */
    ), this), this.action = (e) => e(this.#a), this.inspect = () => this.#t ? [...this.#s.values(), ...this.#i.values()].map(({ ctx: e }) => e?.inspector?.read()).filter((e) => !!e) : (console.warn(
      "[Milkdown]: You are trying to collect inspection when inspector is disabled, please enable inspector by `editor.enableInspector()` first."
    ), []);
  }
  /// Create a new editor instance.
  static make() {
    return new za();
  }
  #t;
  #e;
  #r;
  #n;
  #l;
  #o;
  #i;
  #s;
  #a;
  #u;
  #c;
  #h;
  #p;
  #f;
  #d;
  /// Get the ctx of the editor.
  get ctx() {
    return this.#a;
  }
  /// Get the status of the editor.
  get status() {
    return this.#e;
  }
}
var Io = 200, ge = function() {
};
ge.prototype.append = function(e) {
  return e.length ? (e = ge.from(e), !this.length && e || e.length < Io && this.leafAppend(e) || this.length < Io && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ge.prototype.prepend = function(e) {
  return e.length ? ge.from(e).append(this) : this;
};
ge.prototype.appendInner = function(e) {
  return new uC(this, e);
};
ge.prototype.slice = function(e, n) {
  return e === void 0 && (e = 0), n === void 0 && (n = this.length), e >= n ? ge.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, n));
};
ge.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
ge.prototype.forEach = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length), n <= r ? this.forEachInner(e, n, r, 0) : this.forEachInvertedInner(e, n, r, 0);
};
ge.prototype.map = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(o, s) {
    return i.push(e(o, s));
  }, n, r), i;
};
ge.from = function(e) {
  return e instanceof ge ? e : e && e.length ? new Bp(e) : ge.empty;
};
var Bp = /* @__PURE__ */ (function(t) {
  function e(r) {
    t.call(this), this.values = r;
  }
  t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
  var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, o) {
    return i == 0 && o == this.length ? this : new e(this.values.slice(i, o));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, o, s, l) {
    for (var a = o; a < s; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, o, s, l) {
    for (var a = o - 1; a >= s; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= Io)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Io)
      return new e(i.flatten().concat(this.values));
  }, n.length.get = function() {
    return this.values.length;
  }, n.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, n), e;
})(ge);
ge.empty = new Bp([]);
var uC = /* @__PURE__ */ (function(t) {
  function e(n, r) {
    t.call(this), this.left = n, this.right = r, this.length = n.length + r.length, this.depth = Math.max(n.depth, r.depth) + 1;
  }
  return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(o, l), s) === !1 || o > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, o) - l, s + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(o, l) - l, s + l) === !1 || o < l && this.left.forEachInvertedInner(r, Math.min(i, l), o, s) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var o = this.left.length;
    return i <= o ? this.left.slice(r, i) : r >= o ? this.right.slice(r - o, i - o) : this.left.slice(r, o).append(this.right.slice(0, i - o));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
})(ge);
const fC = 500;
class it {
  constructor(e, n) {
    this.items = e, this.eventCount = n;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, n) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, o;
    n && (i = this.remapping(r, this.items.length), o = i.maps.length);
    let s = e.tr, l, a, c = [], u = [];
    return this.items.forEach((f, h) => {
      if (!f.step) {
        i || (i = this.remapping(r, h + 1), o = i.maps.length), o--, u.push(f);
        return;
      }
      if (i) {
        u.push(new mt(f.map));
        let d = f.step.map(i.slice(o)), p;
        d && s.maybeStep(d).doc && (p = s.mapping.maps[s.mapping.maps.length - 1], c.push(new mt(p, void 0, void 0, c.length + u.length))), o--, p && i.appendMap(p, o);
      } else
        s.maybeStep(f.step);
      if (f.selection)
        return l = i ? f.selection.map(i.slice(o)) : f.selection, a = new it(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: s, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, n, r, i) {
    let o = [], s = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let f = e.steps[u].invert(e.docs[u]), h = new mt(e.mapping.maps[u], f, n), d;
      (d = a && a.merge(h)) && (h = d, u ? o.pop() : l = l.slice(0, l.length - 1)), o.push(h), n && (s++, n = void 0), i || (a = h);
    }
    let c = s - r.depth;
    return c > dC && (l = hC(l, c), s -= c), new it(l.append(o), s);
  }
  remapping(e, n) {
    let r = new li();
    return this.items.forEach((i, o) => {
      let s = i.mirrorOffset != null && o - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, s);
    }, e, n), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new it(this.items.append(e.map((n) => new mt(n))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, n) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - n), o = e.mapping, s = e.steps.length, l = this.eventCount;
    this.items.forEach((h) => {
      h.selection && l--;
    }, i);
    let a = n;
    this.items.forEach((h) => {
      let d = o.getMirror(--a);
      if (d == null)
        return;
      s = Math.min(s, d);
      let p = o.maps[d];
      if (h.step) {
        let m = e.steps[d].invert(e.docs[d]), y = h.selection && h.selection.map(o.slice(a + 1, d));
        y && l++, r.push(new mt(p, m, y));
      } else
        r.push(new mt(p));
    }, i);
    let c = [];
    for (let h = n; h < s; h++)
      c.push(new mt(o.maps[h]));
    let u = this.items.slice(0, i).append(c).append(r), f = new it(u, l);
    return f.emptyItemCount() > fC && (f = f.compress(this.items.length - r.length)), f;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((n) => {
      n.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let n = this.remapping(0, e), r = n.maps.length, i = [], o = 0;
    return this.items.forEach((s, l) => {
      if (l >= e)
        i.push(s), s.selection && o++;
      else if (s.step) {
        let a = s.step.map(n.slice(r)), c = a && a.getMap();
        if (r--, c && n.appendMap(c, r), a) {
          let u = s.selection && s.selection.map(n.slice(r));
          u && o++;
          let f = new mt(c.invert(), a, u), h, d = i.length - 1;
          (h = i.length && i[d].merge(f)) ? i[d] = h : i.push(f);
        }
      } else s.map && r--;
    }, this.items.length, 0), new it(ge.from(i.reverse()), o);
  }
}
it.empty = new it(ge.empty, 0);
function hC(t, e) {
  let n;
  return t.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return n = i, !1;
  }), t.slice(n);
}
class mt {
  constructor(e, n, r, i) {
    this.map = e, this.step = n, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let n = e.step.merge(this.step);
      if (n)
        return new mt(n.getMap().invert(), n, this.selection);
    }
  }
}
class Kt {
  constructor(e, n, r, i, o) {
    this.done = e, this.undone = n, this.prevRanges = r, this.prevTime = i, this.prevComposition = o;
  }
}
const dC = 20;
function pC(t, e, n, r) {
  let i = n.getMeta(Rn), o;
  if (i)
    return i.historyState;
  n.getMeta(yC) && (t = new Kt(t.done, t.undone, null, 0, -1));
  let s = n.getMeta("appendedTransaction");
  if (n.steps.length == 0)
    return t;
  if (s && s.getMeta(Rn))
    return s.getMeta(Rn).redo ? new Kt(t.done.addTransform(n, void 0, r, co(e)), t.undone, Af(n.mapping.maps), t.prevTime, t.prevComposition) : new Kt(t.done, t.undone.addTransform(n, void 0, r, co(e)), null, t.prevTime, t.prevComposition);
  if (n.getMeta("addToHistory") !== !1 && !(s && s.getMeta("addToHistory") === !1)) {
    let l = n.getMeta("composition"), a = t.prevTime == 0 || !s && t.prevComposition != l && (t.prevTime < (n.time || 0) - r.newGroupDelay || !mC(n, t.prevRanges)), c = s ? Xs(t.prevRanges, n.mapping) : Af(n.mapping.maps);
    return new Kt(t.done.addTransform(n, a ? e.selection.getBookmark() : void 0, r, co(e)), it.empty, c, n.time, l ?? t.prevComposition);
  } else return (o = n.getMeta("rebased")) ? new Kt(t.done.rebased(n, o), t.undone.rebased(n, o), Xs(t.prevRanges, n.mapping), t.prevTime, t.prevComposition) : new Kt(t.done.addMaps(n.mapping.maps), t.undone.addMaps(n.mapping.maps), Xs(t.prevRanges, n.mapping), t.prevTime, t.prevComposition);
}
function mC(t, e) {
  if (!e)
    return !1;
  if (!t.docChanged)
    return !0;
  let n = !1;
  return t.mapping.maps[0].forEach((r, i) => {
    for (let o = 0; o < e.length; o += 2)
      r <= e[o + 1] && i >= e[o] && (n = !0);
  }), n;
}
function Af(t) {
  let e = [];
  for (let n = t.length - 1; n >= 0 && e.length == 0; n--)
    t[n].forEach((r, i, o, s) => e.push(o, s));
  return e;
}
function Xs(t, e) {
  if (!t)
    return null;
  let n = [];
  for (let r = 0; r < t.length; r += 2) {
    let i = e.map(t[r], 1), o = e.map(t[r + 1], -1);
    i <= o && n.push(i, o);
  }
  return n;
}
function gC(t, e, n) {
  let r = co(e), i = Rn.get(e).spec.config, o = (n ? t.undone : t.done).popEvent(e, r);
  if (!o)
    return null;
  let s = o.selection.resolve(o.transform.doc), l = (n ? t.done : t.undone).addTransform(o.transform, e.selection.getBookmark(), i, r), a = new Kt(n ? l : o.remaining, n ? o.remaining : l, null, 0, -1);
  return o.transform.setSelection(s).setMeta(Rn, { redo: n, historyState: a });
}
let Zs = !1, Ef = null;
function co(t) {
  let e = t.plugins;
  if (Ef != e) {
    Zs = !1, Ef = e;
    for (let n = 0; n < e.length; n++)
      if (e[n].spec.historyPreserveItems) {
        Zs = !0;
        break;
      }
  }
  return Zs;
}
const Rn = new he("history"), yC = new he("closeHistory");
function kC(t = {}) {
  return t = {
    depth: t.depth || 100,
    newGroupDelay: t.newGroupDelay || 500
  }, new ye({
    key: Rn,
    state: {
      init() {
        return new Kt(it.empty, it.empty, null, 0, -1);
      },
      apply(e, n, r) {
        return pC(n, r, e, t);
      }
    },
    config: t,
    props: {
      handleDOMEvents: {
        beforeinput(e, n) {
          let r = n.inputType, i = r == "historyUndo" ? _p : r == "historyRedo" ? $p : null;
          return i ? (n.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Fp(t, e) {
  return (n, r) => {
    let i = Rn.getState(n);
    if (!i || (t ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let o = gC(i, n, t);
      o && r(e ? o.scrollIntoView() : o);
    }
    return !0;
  };
}
const _p = Fp(!1, !0), $p = Fp(!0, !0);
function F(t, e) {
  const n = nC(t), r = (i) => async () => {
    r.key = n, await i.wait(Zr);
    const o = e(i);
    return i.get(J).create(n, o), r.run = (s) => i.get(J).call(t, s), () => {
      i.get(J).remove(n);
    };
  };
  return r;
}
function Re(t) {
  const e = (n) => async () => {
    await n.wait(lt);
    const r = t(n);
    return n.update(di, (i) => [...i, r]), e.inputRule = r, () => {
      n.update(di, (i) => i.filter((o) => o !== r));
    };
  };
  return e;
}
function bC(t, e) {
  const n = (r) => async () => {
    const i = e(r);
    return r.update(Xr, (o) => [
      ...o.filter((s) => s[0] !== t),
      [t, i]
    ]), n.id = t, n.schema = i, () => {
      r.update(Xr, (o) => o.filter(([s]) => s !== t));
    };
  };
  return n.type = (r) => {
    const i = r.get(at).marks[t];
    if (!i) throw qg(t);
    return i;
  }, n;
}
function Ba(t, e) {
  const n = (r) => async () => {
    const i = e(r);
    return r.update(Qr, (o) => [
      ...o.filter((s) => s[0] !== t),
      [t, i]
    ]), n.id = t, n.schema = i, () => {
      r.update(Qr, (o) => o.filter(([s]) => s !== t));
    };
  };
  return n.type = (r) => {
    const i = r.get(at).nodes[t];
    if (!i) throw jg(t);
    return i;
  }, n;
}
function Ke(t) {
  let e;
  const n = (r) => async () => (await r.wait(lt), e = t(r), r.update(zt, (i) => [...i, e]), () => {
    r.update(zt, (i) => i.filter((o) => o !== e));
  });
  return n.plugin = () => e, n.key = () => e.spec.key, n;
}
function wC(t) {
  const e = (n) => async () => {
    await n.wait(ei);
    const r = n.get(No), i = t(n), o = r.addObjectKeymap(i);
    return e.keymap = i, () => {
      o();
    };
  };
  return e;
}
function ft(t, e) {
  const n = Q(t, e), r = (i) => (i.inject(n), () => () => {
    i.remove(n);
  });
  return r.key = n, r;
}
function de(t, e) {
  const n = ft(e, t), r = Ba(t, (o) => o.get(n.key)(o)), i = [n, r];
  return i.id = r.id, i.node = r, i.type = (o) => r.type(o), i.ctx = n, i.key = n.key, i.extendSchema = (o) => {
    const s = o(e);
    return de(t, s);
  }, i;
}
function qn(t, e) {
  const n = ft(e, t), r = bC(t, (o) => o.get(n.key)(o)), i = [n, r];
  return i.id = r.id, i.mark = r, i.type = (o) => r.type(o), i.ctx = n, i.key = n.key, i.extendSchema = (o) => {
    const s = o(e);
    return qn(t, s);
  }, i;
}
function Fe(t, e) {
  const n = Object.fromEntries(
    Object.entries(e).map(
      ([s, { shortcuts: l, priority: a }]) => [s, { shortcuts: l, priority: a }]
    )
  ), r = ft(n, `${t}Keymap`), i = wC((s) => {
    const l = s.get(r.key), a = Object.entries(e).flatMap(
      ([c, { command: u }]) => {
        const f = l[c], h = [f.shortcuts].flat(), d = f.priority;
        return h.map(
          (p) => [
            p,
            {
              key: p,
              onRun: u,
              priority: d
            }
          ]
        );
      }
    );
    return Object.fromEntries(a);
  }), o = [r, i];
  return o.ctx = r, o.shortcuts = i, o.key = r.key, o.keymap = i.keymap, o;
}
const ht = (t, e = () => ({})) => ft(e, `${t}Attr`), Mi = (t, e = () => ({})) => ft(e, `${t}Attr`);
function fn(t, e, n) {
  const r = ft({}, t), i = (s) => async () => {
    await s.wait(On);
    const a = {
      plugin: e(s),
      options: s.get(r.key)
    };
    return s.update(pi, (c) => [...c, a]), () => {
      s.update(pi, (c) => c.filter((u) => u !== a));
    };
  }, o = [r, i];
  return o.id = t, o.plugin = i, o.options = r, o;
}
function Of(t) {
  return (e) => {
    const n = e.get(st), r = e.get(at), i = e.get(Dn);
    if (!t)
      return i(n.state.doc);
    const s = n.state.doc.slice(t.from, t.to, !0), l = r.topNodeType.createAndFill(null, s.content);
    return l ? i(l) : (console.error("No document found"), "");
  };
}
function xC(t, e = !1) {
  return (n) => {
    const r = n.get(st), o = n.get(sr)(t);
    if (!o) return;
    if (!e) {
      const { state: u } = r;
      return r.dispatch(
        u.tr.replace(
          0,
          u.doc.content.size,
          new D(o.content, 0, 0)
        )
      );
    }
    const s = n.get(at), l = n.get(oo), a = n.get(zt), c = xn.create({
      schema: s,
      doc: o,
      plugins: a,
      ...l
    });
    r.updateState(c);
  };
}
function yr(t, e) {
  return Object.assign(t, {
    meta: {
      package: "@milkdown/plugin-history",
      ...e
    }
  }), t;
}
const Fa = F("Undo", () => () => _p);
yr(Fa, {
  displayName: "Command<undo>"
});
const _a = F("Redo", () => () => $p);
yr(_a, {
  displayName: "Command<redo>"
});
const $a = ft({}, "historyProviderConfig");
yr($a, {
  displayName: "Ctx<historyProviderConfig>"
});
const Vp = Ke(
  (t) => kC(t.get($a.key))
);
yr(Vp, {
  displayName: "Ctx<historyProviderPlugin>"
});
const Go = Fe("historyKeymap", {
  Undo: {
    shortcuts: "Mod-z",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Fa.key);
    }
  },
  Redo: {
    shortcuts: ["Mod-y", "Shift-Mod-z"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(_a.key);
    }
  }
});
yr(Go.ctx, {
  displayName: "KeymapCtx<history>"
});
yr(Go.shortcuts, {
  displayName: "Keymap<history>"
});
const CC = [
  $a,
  Vp,
  Go,
  Fa,
  _a
].flat();
var SC = typeof global == "object" && global && global.Object === Object && global, MC = typeof self == "object" && self && self.Object === Object && self, Hp = SC || MC || Function("return this")(), Ao = Hp.Symbol, Wp = Object.prototype, TC = Wp.hasOwnProperty, NC = Wp.toString, Er = Ao ? Ao.toStringTag : void 0;
function IC(t) {
  var e = TC.call(t, Er), n = t[Er];
  try {
    t[Er] = void 0;
    var r = !0;
  } catch {
  }
  var i = NC.call(t);
  return r && (e ? t[Er] = n : delete t[Er]), i;
}
var AC = Object.prototype, EC = AC.toString;
function OC(t) {
  return EC.call(t);
}
var DC = "[object Null]", RC = "[object Undefined]", Df = Ao ? Ao.toStringTag : void 0;
function vC(t) {
  return t == null ? t === void 0 ? RC : DC : Df && Df in Object(t) ? IC(t) : OC(t);
}
function LC(t) {
  return t != null && typeof t == "object";
}
var PC = "[object Symbol]";
function zC(t) {
  return typeof t == "symbol" || LC(t) && vC(t) == PC;
}
var BC = /\s/;
function FC(t) {
  for (var e = t.length; e-- && BC.test(t.charAt(e)); )
    ;
  return e;
}
var _C = /^\s+/;
function $C(t) {
  return t && t.slice(0, FC(t) + 1).replace(_C, "");
}
function Eo(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Rf = NaN, VC = /^[-+]0x[0-9a-f]+$/i, HC = /^0b[01]+$/i, WC = /^0o[0-7]+$/i, jC = parseInt;
function vf(t) {
  if (typeof t == "number")
    return t;
  if (zC(t))
    return Rf;
  if (Eo(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Eo(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = $C(t);
  var n = HC.test(t);
  return n || WC.test(t) ? jC(t.slice(2), n ? 2 : 8) : VC.test(t) ? Rf : +t;
}
var el = function() {
  return Hp.Date.now();
}, qC = "Expected a function", KC = Math.max, UC = Math.min;
function jp(t, e, n) {
  var r, i, o, s, l, a, c = 0, u = !1, f = !1, h = !0;
  if (typeof t != "function")
    throw new TypeError(qC);
  e = vf(e) || 0, Eo(n) && (u = !!n.leading, f = "maxWait" in n, o = f ? KC(vf(n.maxWait) || 0, e) : o, h = "trailing" in n ? !!n.trailing : h);
  function d(x) {
    var R = r, O = i;
    return r = i = void 0, c = x, s = t.apply(O, R), s;
  }
  function p(x) {
    return c = x, l = setTimeout(g, e), u ? d(x) : s;
  }
  function m(x) {
    var R = x - a, O = x - c, L = e - R;
    return f ? UC(L, o - O) : L;
  }
  function y(x) {
    var R = x - a, O = x - c;
    return a === void 0 || R >= e || R < 0 || f && O >= o;
  }
  function g() {
    var x = el();
    if (y(x))
      return S(x);
    l = setTimeout(g, m(x));
  }
  function S(x) {
    return l = void 0, h && r ? d(x) : (r = i = void 0, s);
  }
  function C() {
    l !== void 0 && clearTimeout(l), c = 0, r = a = i = l = void 0;
  }
  function I() {
    return l === void 0 ? s : S(el());
  }
  function A() {
    var x = el(), R = y(x);
    if (r = arguments, i = this, a = x, R) {
      if (l === void 0)
        return p(a);
      if (f)
        return clearTimeout(l), l = setTimeout(g, e), d(a);
    }
    return l === void 0 && (l = setTimeout(g, e)), s;
  }
  return A.cancel = C, A.flush = I, A;
}
var JC = "Expected a function";
function GC(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(JC);
  return Eo(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), jp(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
class qp {
  constructor() {
    this.beforeMountedListeners = [], this.mountedListeners = [], this.updatedListeners = [], this.selectionUpdatedListeners = [], this.markdownUpdatedListeners = [], this.blurListeners = [], this.focusListeners = [], this.destroyListeners = [], this.beforeMount = (e) => (this.beforeMountedListeners.push(e), this), this.mounted = (e) => (this.mountedListeners.push(e), this), this.updated = (e) => (this.updatedListeners.push(e), this);
  }
  /// A getter to get all [subscribers](#interface-subscribers). You should not use this method directly.
  get listeners() {
    return {
      beforeMount: this.beforeMountedListeners,
      mounted: this.mountedListeners,
      updated: this.updatedListeners,
      markdownUpdated: this.markdownUpdatedListeners,
      blur: this.blurListeners,
      focus: this.focusListeners,
      destroy: this.destroyListeners,
      selectionUpdated: this.selectionUpdatedListeners
    };
  }
  /// Subscribe to the markdownUpdated event.
  /// This event will be triggered after the editor state is updated and **the document is changed**.
  /// The second parameter is the current markdown and the third parameter is the previous markdown.
  markdownUpdated(e) {
    return this.markdownUpdatedListeners.push(e), this;
  }
  /// Subscribe to the blur event.
  /// This event will be triggered when the editor is blurred.
  blur(e) {
    return this.blurListeners.push(e), this;
  }
  /// Subscribe to the focus event.
  /// This event will be triggered when the editor is focused.
  focus(e) {
    return this.focusListeners.push(e), this;
  }
  /// Subscribe to the destroy event.
  /// This event will be triggered before the editor is destroyed.
  destroy(e) {
    return this.destroyListeners.push(e), this;
  }
  /// Subscribe to the selectionUpdated event.
  /// This event will be triggered when the editor selection is updated.
  selectionUpdated(e) {
    return this.selectionUpdatedListeners.push(e), this;
  }
}
const ri = Q(
  new qp(),
  "listener"
), YC = new he("MILKDOWN_LISTENER"), Kp = (t) => (t.inject(ri, new qp()), async () => {
  await t.wait(On);
  const e = t.get(ri), { listeners: n } = e;
  n.beforeMount.forEach((a) => a(t)), await t.wait(ti);
  const r = t.get(Dn);
  let i = null, o = null, s = null;
  const l = new ye({
    key: YC,
    view: () => ({
      destroy: () => {
        n.destroy.forEach((a) => a(t));
      }
    }),
    props: {
      handleDOMEvents: {
        focus: () => (n.focus.forEach((a) => a(t)), !1),
        blur: () => (n.blur.forEach((a) => a(t)), !1)
      }
    },
    state: {
      init: (a, c) => {
        i = c.doc, o = r(c.doc);
      },
      apply: (a) => {
        const c = a.selection;
        return (!s && c || s && !c.eq(s)) && (n.selectionUpdated.forEach((f) => {
          f(t, c, s);
        }), s = c), !a.docChanged || a.getMeta("addToHistory") === !1 ? void 0 : jp(() => {
          const { doc: f } = a;
          if (n.updated.length > 0 && i && !i.eq(f) && n.updated.forEach((h) => {
            h(t, f, i);
          }), n.markdownUpdated.length > 0 && i && !i.eq(f)) {
            const h = r(f);
            n.markdownUpdated.forEach((d) => {
              d(t, h, o);
            }), o = h;
          }
          i = f;
        }, 200)();
      }
    }
  });
  t.update(zt, (a) => a.concat(l)), await t.wait(lo), n.mounted.forEach((a) => a(t));
});
Kp.meta = {
  package: "@milkdown/plugin-listener",
  displayName: "Listener"
};
function QC(t, e) {
  return function(n, r) {
    let { $from: i, $to: o, node: s } = n.selection;
    if (s && s.isBlock || i.depth < 2 || !i.sameParent(o))
      return !1;
    let l = i.node(-1);
    if (l.type != t)
      return !1;
    if (i.parent.content.size == 0 && i.node(-1).childCount == i.indexAfter(-1)) {
      if (i.depth == 3 || i.node(-3).type != t || i.index(-2) != i.node(-2).childCount - 1)
        return !1;
      if (r) {
        let f = N.empty, h = i.index(-1) ? 1 : i.index(-2) ? 2 : 3;
        for (let g = i.depth - h; g >= i.depth - 3; g--)
          f = N.from(i.node(g).copy(f));
        let d = i.indexAfter(-1) < i.node(-2).childCount ? 1 : i.indexAfter(-2) < i.node(-3).childCount ? 2 : 3;
        f = f.append(N.from(t.createAndFill()));
        let p = i.before(i.depth - (h - 1)), m = n.tr.replace(p, i.after(-d), new D(f, 4 - h, 0)), y = -1;
        m.doc.nodesBetween(p, m.doc.content.size, (g, S) => {
          if (y > -1)
            return !1;
          g.isTextblock && g.content.size == 0 && (y = S + 1);
        }), y > -1 && m.setSelection($.near(m.doc.resolve(y))), r(m.scrollIntoView());
      }
      return !0;
    }
    let a = o.pos == i.end() ? l.contentMatchAt(0).defaultType : null, c = n.tr.delete(i.pos, o.pos), u = a ? [null, { type: a }] : void 0;
    return Ur(c.doc, i.pos, 2, u) ? (r && r(c.split(i.pos, 2, u).scrollIntoView()), !0) : !1;
  };
}
function XC(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == t);
    return o ? n ? r.node(o.depth - 1).type == t ? ZC(e, n, t, o) : eS(e, n, o) : !0 : !1;
  };
}
function ZC(t, e, n, r) {
  let i = t.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Ne(o - 1, s, o, s, new D(N.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Eh(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Ho(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Wo(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function eS(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let d = n.end, p = n.endIndex - 1, m = n.startIndex; p > m; p--)
    d -= i.child(p).nodeSize, r.delete(d - 1, d + 1);
  let o = r.doc.resolve(n.start), s = o.nodeAfter;
  if (r.mapping.map(n.end) != n.start + o.nodeAfter.nodeSize)
    return !1;
  let l = n.startIndex == 0, a = n.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? N.empty : N.from(i))))
    return !1;
  let f = o.pos, h = f + s.nodeSize;
  return r.step(new Ne(f - (l ? 1 : 0), h + (a ? 1 : 0), f + 1, h - 1, new D((l ? N.empty : N.from(i.copy(N.empty))).append(a ? N.empty : N.from(i.copy(N.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function tS(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == t);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != t)
      return !1;
    if (n) {
      let c = a.lastChild && a.lastChild.type == l.type, u = N.from(c ? t.create() : null), f = new D(N.from(t.create(null, N.from(l.type.create(null, u)))), c ? 3 : 1, 0), h = o.start, d = o.end;
      n(e.tr.step(new Ne(h - (c ? 3 : 1), d, h, d, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function nS(t) {
  const e = /* @__PURE__ */ new Map();
  if (!t || !t.type)
    throw new Error("mdast-util-definitions expected node");
  return Wn(t, "definition", function(r) {
    const i = Lf(r.identifier);
    i && !e.get(i) && e.set(i, r);
  }), n;
  function n(r) {
    const i = Lf(r);
    return e.get(i);
  }
}
function Lf(t) {
  return String(t || "").toUpperCase();
}
function rS() {
  return function(t) {
    const e = nS(t);
    Wn(t, function(n, r, i) {
      if (n.type === "definition" && i !== void 0 && typeof r == "number")
        return i.children.splice(r, 1), [xl, r];
      if (n.type === "imageReference" || n.type === "linkReference") {
        const o = e(n.identifier);
        if (o && i && typeof r == "number")
          return i.children[r] = n.type === "imageReference" ? { type: "image", url: o.url, title: o.title, alt: n.alt } : {
            type: "link",
            url: o.url,
            title: o.title,
            children: n.children
          }, [xl, r];
      }
    });
  };
}
function Up(t, e) {
  if (!(e.childCount >= 1 && e.lastChild?.type.name === "hardbreak")) {
    t.next(e.content);
    return;
  }
  const r = [];
  e.content.forEach((i, o, s) => {
    s !== e.childCount - 1 && r.push(i);
  }), t.next(N.fromArray(r));
}
function M(t, e) {
  return Object.assign(t, {
    meta: {
      package: "@milkdown/preset-commonmark",
      ...e
    }
  }), t;
}
const Va = Mi("emphasis");
M(Va, {
  displayName: "Attr<emphasis>",
  group: "Emphasis"
});
const kr = qn("emphasis", (t) => ({
  attrs: {
    marker: {
      default: t.get(Yr).emphasis || "*",
      validate: "string"
    }
  },
  parseDOM: [
    { tag: "i" },
    { tag: "em" },
    { style: "font-style", getAttrs: (e) => e === "italic" }
  ],
  toDOM: (e) => ["em", t.get(Va.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "emphasis",
    runner: (e, n, r) => {
      e.openMark(r, { marker: n.marker }), e.next(n.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "emphasis",
    runner: (e, n) => {
      e.withMark(n, "emphasis", void 0, {
        marker: n.attrs.marker
      });
    }
  }
}));
M(kr.mark, {
  displayName: "MarkSchema<emphasis>",
  group: "Emphasis"
});
M(kr.ctx, {
  displayName: "MarkSchemaCtx<emphasis>",
  group: "Emphasis"
});
const Yo = F("ToggleEmphasis", (t) => () => wi(kr.type(t)));
M(Yo, {
  displayName: "Command<toggleEmphasisCommand>",
  group: "Emphasis"
});
const Jp = Re((t) => gr(/(?:^|[^*])\*([^*]+)\*$/, kr.type(t), {
  getAttr: () => ({
    marker: "*"
  }),
  updateCaptured: ({ fullMatch: e, start: n }) => e.startsWith("*") ? {} : { fullMatch: e.slice(1), start: n + 1 }
}));
M(Jp, {
  displayName: "InputRule<emphasis>|Star",
  group: "Emphasis"
});
const Gp = Re((t) => gr(/\b_(?![_\s])(.*?[^_\s])_\b/, kr.type(t), {
  getAttr: () => ({
    marker: "_"
  }),
  updateCaptured: ({ fullMatch: e, start: n }) => e.startsWith("_") ? {} : { fullMatch: e.slice(1), start: n + 1 }
}));
M(Gp, {
  displayName: "InputRule<emphasis>|Underscore",
  group: "Emphasis"
});
const Ha = Fe("emphasisKeymap", {
  ToggleEmphasis: {
    shortcuts: "Mod-i",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Yo.key);
    }
  }
});
M(Ha.ctx, {
  displayName: "KeymapCtx<emphasis>",
  group: "Emphasis"
});
M(Ha.shortcuts, {
  displayName: "Keymap<emphasis>",
  group: "Emphasis"
});
const Wa = Mi("strong");
M(Wa, {
  displayName: "Attr<strong>",
  group: "Strong"
});
const Ti = qn("strong", (t) => ({
  attrs: {
    marker: {
      default: t.get(Yr).strong || "*",
      validate: "string"
    }
  },
  parseDOM: [
    // This works around a Google Docs misbehavior where
    // pasted content will be inexplicably wrapped in `<b>`
    // tags with a font-weight normal.
    {
      tag: "b",
      getAttrs: (e) => e.style.fontWeight != "normal" && null
    },
    { tag: "strong" },
    { style: "font-style", getAttrs: (e) => e === "bold" },
    { style: "font-weight=400", clearMark: (e) => e.type.name == "strong" },
    {
      style: "font-weight",
      getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
    }
  ],
  toDOM: (e) => ["strong", t.get(Wa.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "strong",
    runner: (e, n, r) => {
      e.openMark(r, { marker: n.marker }), e.next(n.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "strong",
    runner: (e, n) => {
      e.withMark(n, "strong", void 0, {
        marker: n.attrs.marker
      });
    }
  }
}));
M(Ti.mark, {
  displayName: "MarkSchema<strong>",
  group: "Strong"
});
M(Ti.ctx, {
  displayName: "MarkSchemaCtx<strong>",
  group: "Strong"
});
const Qo = F("ToggleStrong", (t) => () => wi(Ti.type(t)));
M(Qo, {
  displayName: "Command<toggleStrongCommand>",
  group: "Strong"
});
const Yp = Re((t) => gr(
  new RegExp("(?<![\\w:/])(?:\\*\\*|__)([^*_]+?)(?:\\*\\*|__)(?![\\w/])$"),
  Ti.type(t),
  {
    getAttr: (e) => ({
      marker: e[0].startsWith("*") ? "*" : "_"
    })
  }
));
M(Yp, {
  displayName: "InputRule<strong>",
  group: "Strong"
});
const ja = Fe("strongKeymap", {
  ToggleBold: {
    shortcuts: ["Mod-b"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Qo.key);
    }
  }
});
M(ja.ctx, {
  displayName: "KeymapCtx<strong>",
  group: "Strong"
});
M(ja.shortcuts, {
  displayName: "Keymap<strong>",
  group: "Strong"
});
const qa = Mi("inlineCode");
M(qa, {
  displayName: "Attr<inlineCode>",
  group: "InlineCode"
});
const Qt = qn("inlineCode", (t) => ({
  priority: 100,
  code: !0,
  parseDOM: [{ tag: "code" }],
  toDOM: (e) => ["code", t.get(qa.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "inlineCode",
    runner: (e, n, r) => {
      e.openMark(r), e.addText(n.value), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "inlineCode",
    runner: (e, n, r) => {
      e.withMark(n, "inlineCode", r.text || "");
    }
  }
}));
M(Qt.mark, {
  displayName: "MarkSchema<inlineCode>",
  group: "InlineCode"
});
M(Qt.ctx, {
  displayName: "MarkSchemaCtx<inlineCode>",
  group: "InlineCode"
});
const Ka = F(
  "ToggleInlineCode",
  (t) => () => (e, n) => {
    const { selection: r, tr: i } = e;
    if (r.empty) return !1;
    const { from: o, to: s } = r;
    return e.doc.rangeHasMark(o, s, Qt.type(t)) ? (n?.(i.removeMark(o, s, Qt.type(t))), !0) : (Object.keys(e.schema.marks).filter(
      (c) => c !== Qt.type.name
    ).map((c) => e.schema.marks[c]).forEach((c) => {
      i.removeMark(o, s, c);
    }), n?.(i.addMark(o, s, Qt.type(t).create())), !0);
  }
);
M(Ka, {
  displayName: "Command<toggleInlineCodeCommand>",
  group: "InlineCode"
});
const Qp = Re((t) => gr(/(?:`)([^`]+)(?:`)$/, Qt.type(t)));
M(Qp, {
  displayName: "InputRule<inlineCodeInputRule>",
  group: "InlineCode"
});
const Ua = Fe("inlineCodeKeymap", {
  ToggleInlineCode: {
    shortcuts: "Mod-e",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Ka.key);
    }
  }
});
M(Ua.ctx, {
  displayName: "KeymapCtx<inlineCode>",
  group: "InlineCode"
});
M(Ua.shortcuts, {
  displayName: "Keymap<inlineCode>",
  group: "InlineCode"
});
const Ja = Mi("link");
M(Ja, {
  displayName: "Attr<link>",
  group: "Link"
});
const lr = qn("link", (t) => ({
  attrs: {
    href: { validate: "string" },
    title: { default: null, validate: "string|null" }
  },
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw xt(e);
        return {
          href: e.getAttribute("href"),
          title: e.getAttribute("title")
        };
      }
    }
  ],
  toDOM: (e) => ["a", { ...t.get(Ja.key)(e), ...e.attrs }],
  parseMarkdown: {
    match: (e) => e.type === "link",
    runner: (e, n, r) => {
      const i = n.url, o = n.title;
      e.openMark(r, { href: i, title: o }), e.next(n.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "link",
    runner: (e, n) => {
      e.withMark(n, "link", void 0, {
        title: n.attrs.title,
        url: n.attrs.href
      });
    }
  }
}));
M(lr.mark, {
  displayName: "MarkSchema<link>",
  group: "Link"
});
const Ga = F(
  "ToggleLink",
  (t) => (e = {}) => wi(lr.type(t), e)
);
M(Ga, {
  displayName: "Command<toggleLinkCommand>",
  group: "Link"
});
const Xp = F(
  "UpdateLink",
  (t) => (e = {}) => (n, r) => {
    if (!r) return !1;
    let i, o = -1;
    const { selection: s } = n, { from: l, to: a } = s;
    if (n.doc.nodesBetween(l, l === a ? a + 1 : a, (p, m) => {
      if (lr.type(t).isInSet(p.marks))
        return i = p, o = m, !1;
    }), !i) return !1;
    const c = i.marks.find(({ type: p }) => p === lr.type(t));
    if (!c) return !1;
    const u = o, f = o + i.nodeSize, { tr: h } = n, d = lr.type(t).create({ ...c.attrs, ...e });
    return d ? (r(
      h.removeMark(u, f, c).addMark(u, f, d).setSelection(new H(h.selection.$anchor)).scrollIntoView()
    ), !0) : !1;
  }
);
M(Xp, {
  displayName: "Command<updateLinkCommand>",
  group: "Link"
});
const Zp = Ba("doc", () => ({
  content: "block+",
  parseMarkdown: {
    match: ({ type: t }) => t === "root",
    runner: (t, e, n) => {
      t.injectRoot(e, n);
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "doc",
    runner: (t, e) => {
      t.openNode("root"), t.next(e.content);
    }
  }
}));
M(Zp, {
  displayName: "NodeSchema<doc>",
  group: "Doc"
});
function iS(t) {
  return ha(
    t,
    (e) => e.type === "html" && ["<br />", "<br>", "<br >", "<br/>"].includes(
      e.value?.trim()
    ),
    (e, n) => {
      if (!n.length) return;
      const r = n[n.length - 1];
      if (!r) return;
      const i = r.children.indexOf(e);
      i !== -1 && r.children.splice(i, 1);
    },
    !0
  );
}
const Xo = fn(
  "remark-preserve-empty-line",
  () => () => iS
);
M(Xo.plugin, {
  displayName: "Remark<remarkPreserveEmptyLine>",
  group: "Remark"
});
M(Xo.options, {
  displayName: "RemarkConfig<remarkPreserveEmptyLine>",
  group: "Remark"
});
const Ya = ht("paragraph");
M(Ya, {
  displayName: "Attr<paragraph>",
  group: "Paragraph"
});
const hn = de("paragraph", (t) => ({
  content: "inline*",
  group: "block",
  parseDOM: [{ tag: "p" }],
  toDOM: (e) => ["p", t.get(Ya.key)(e), 0],
  parseMarkdown: {
    match: (e) => e.type === "paragraph",
    runner: (e, n, r) => {
      e.openNode(r), n.children ? e.next(n.children) : e.addText(n.value || ""), e.closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "paragraph",
    runner: (e, n) => {
      const i = t.get(st).state?.doc.lastChild;
      e.openNode("paragraph"), (!n.content || n.content.size === 0) && n !== i && oS(t) ? e.addNode("html", void 0, "<br />") : Up(e, n), e.closeNode();
    }
  }
}));
function oS(t) {
  let e = !1;
  try {
    t.get(Xo.id), e = !0;
  } catch {
    e = !1;
  }
  return e;
}
M(hn.node, {
  displayName: "NodeSchema<paragraph>",
  group: "Paragraph"
});
M(hn.ctx, {
  displayName: "NodeSchemaCtx<paragraph>",
  group: "Paragraph"
});
const Zo = F(
  "TurnIntoText",
  (t) => () => ci(hn.type(t))
);
M(Zo, {
  displayName: "Command<turnIntoTextCommand>",
  group: "Paragraph"
});
const Qa = Fe("paragraphKeymap", {
  TurnIntoText: {
    shortcuts: "Mod-Alt-0",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Zo.key);
    }
  }
});
M(Qa.ctx, {
  displayName: "KeymapCtx<paragraph>",
  group: "Paragraph"
});
M(Qa.shortcuts, {
  displayName: "Keymap<paragraph>",
  group: "Paragraph"
});
const sS = Array(6).fill(0).map((t, e) => e + 1);
function lS(t) {
  return t.textContent.toLowerCase().trim().replace(/\s+/g, "-");
}
const es = ft(
  lS,
  "headingIdGenerator"
);
M(es, {
  displayName: "Ctx<HeadingIdGenerator>",
  group: "Heading"
});
const Xa = ht("heading");
M(Xa, {
  displayName: "Attr<heading>",
  group: "Heading"
});
const Kn = de("heading", (t) => {
  const e = t.get(es.key);
  return {
    content: "inline*",
    group: "block",
    defining: !0,
    attrs: {
      id: {
        default: "",
        validate: "string"
      },
      level: {
        default: 1,
        validate: "number"
      }
    },
    parseDOM: sS.map((n) => ({
      tag: `h${n}`,
      getAttrs: (r) => {
        if (!(r instanceof HTMLElement)) throw xt(r);
        return { level: n, id: r.id };
      }
    })),
    toDOM: (n) => [
      `h${n.attrs.level}`,
      {
        ...t.get(Xa.key)(n),
        id: n.attrs.id || e(n)
      },
      0
    ],
    parseMarkdown: {
      match: ({ type: n }) => n === "heading",
      runner: (n, r, i) => {
        const o = r.depth;
        n.openNode(i, { level: o }), n.next(r.children), n.closeNode();
      }
    },
    toMarkdown: {
      match: (n) => n.type.name === "heading",
      runner: (n, r) => {
        n.openNode("heading", void 0, { depth: r.attrs.level }), Up(n, r), n.closeNode();
      }
    }
  };
});
M(Kn.node, {
  displayName: "NodeSchema<heading>",
  group: "Heading"
});
M(Kn.ctx, {
  displayName: "NodeSchemaCtx<heading>",
  group: "Heading"
});
const em = Re((t) => Vd(
  /^(?<hashes>#+)\s$/,
  Kn.type(t),
  (e) => {
    const n = e.groups?.hashes?.length || 0, r = t.get(st), { $from: i } = r.state.selection, o = i.node();
    if (o.type.name === "heading") {
      let s = Number(o.attrs.level) + Number(n);
      return s > 6 && (s = 6), { level: s };
    }
    return { level: n };
  }
));
M(em, {
  displayName: "InputRule<wrapInHeadingInputRule>",
  group: "Heading"
});
const Dt = F("WrapInHeading", (t) => (e) => (e ??= 1, e < 1 ? ci(hn.type(t)) : ci(Kn.type(t), { level: e })));
M(Dt, {
  displayName: "Command<wrapInHeadingCommand>",
  group: "Heading"
});
const Za = F(
  "DowngradeHeading",
  (t) => () => (e, n, r) => {
    const { $from: i } = e.selection, o = i.node();
    if (o.type !== Kn.type(t) || !e.selection.empty || i.parentOffset !== 0)
      return !1;
    const s = o.attrs.level - 1;
    return s ? (n?.(
      e.tr.setNodeMarkup(e.selection.$from.before(), void 0, {
        ...o.attrs,
        level: s
      })
    ), !0) : ci(hn.type(t))(e, n, r);
  }
);
M(Za, {
  displayName: "Command<downgradeHeadingCommand>",
  group: "Heading"
});
const ec = Fe("headingKeymap", {
  TurnIntoH1: {
    shortcuts: "Mod-Alt-1",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Dt.key, 1);
    }
  },
  TurnIntoH2: {
    shortcuts: "Mod-Alt-2",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Dt.key, 2);
    }
  },
  TurnIntoH3: {
    shortcuts: "Mod-Alt-3",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Dt.key, 3);
    }
  },
  TurnIntoH4: {
    shortcuts: "Mod-Alt-4",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Dt.key, 4);
    }
  },
  TurnIntoH5: {
    shortcuts: "Mod-Alt-5",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Dt.key, 5);
    }
  },
  TurnIntoH6: {
    shortcuts: "Mod-Alt-6",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Dt.key, 6);
    }
  },
  DowngradeHeading: {
    shortcuts: ["Delete", "Backspace"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Za.key);
    }
  }
});
M(ec.ctx, {
  displayName: "KeymapCtx<heading>",
  group: "Heading"
});
M(ec.shortcuts, {
  displayName: "Keymap<heading>",
  group: "Heading"
});
const tc = ht("blockquote");
M(tc, {
  displayName: "Attr<blockquote>",
  group: "Blockquote"
});
const Ni = de(
  "blockquote",
  (t) => ({
    content: "block+",
    group: "block",
    defining: !0,
    parseDOM: [{ tag: "blockquote" }],
    toDOM: (e) => ["blockquote", t.get(tc.key)(e), 0],
    parseMarkdown: {
      match: ({ type: e }) => e === "blockquote",
      runner: (e, n, r) => {
        e.openNode(r).next(n.children).closeNode();
      }
    },
    toMarkdown: {
      match: (e) => e.type.name === "blockquote",
      runner: (e, n) => {
        e.openNode("blockquote").next(n.content).closeNode();
      }
    }
  })
);
M(Ni.node, {
  displayName: "NodeSchema<blockquote>",
  group: "Blockquote"
});
M(Ni.ctx, {
  displayName: "NodeSchemaCtx<blockquote>",
  group: "Blockquote"
});
const tm = Re(
  (t) => Ta(/^\s*>\s$/, Ni.type(t))
);
M(tm, {
  displayName: "InputRule<wrapInBlockquoteInputRule>",
  group: "Blockquote"
});
const nc = F(
  "WrapInBlockquote",
  (t) => () => Ma(Ni.type(t))
);
M(nc, {
  displayName: "Command<wrapInBlockquoteCommand>",
  group: "Blockquote"
});
const rc = Fe("blockquoteKeymap", {
  WrapInBlockquote: {
    shortcuts: "Mod-Shift-b",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(nc.key);
    }
  }
});
M(rc.ctx, {
  displayName: "KeymapCtx<blockquote>",
  group: "Blockquote"
});
M(rc.shortcuts, {
  displayName: "Keymap<blockquote>",
  group: "Blockquote"
});
const ic = ht("codeBlock", () => ({
  pre: {},
  code: {}
}));
M(ic, {
  displayName: "Attr<codeBlock>",
  group: "CodeBlock"
});
const Ii = de("code_block", (t) => ({
  content: "text*",
  group: "block",
  marks: "",
  defining: !0,
  code: !0,
  attrs: {
    language: {
      default: "",
      validate: "string"
    }
  },
  parseDOM: [
    {
      tag: "pre",
      preserveWhitespace: "full",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw xt(e);
        return { language: e.dataset.language };
      }
    }
  ],
  toDOM: (e) => {
    const n = t.get(ic.key)(e), r = e.attrs.language, i = r && r.length > 0 ? { "data-language": r } : void 0;
    return [
      "pre",
      {
        ...n.pre,
        ...i
      },
      ["code", n.code, 0]
    ];
  },
  parseMarkdown: {
    match: ({ type: e }) => e === "code",
    runner: (e, n, r) => {
      const i = n.lang ?? "", o = n.value;
      e.openNode(r, { language: i }), o && e.addText(o), e.closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "code_block",
    runner: (e, n) => {
      e.addNode("code", void 0, n.content.firstChild?.text || "", {
        lang: n.attrs.language
      });
    }
  }
}));
M(Ii.node, {
  displayName: "NodeSchema<codeBlock>",
  group: "CodeBlock"
});
M(Ii.ctx, {
  displayName: "NodeSchemaCtx<codeBlock>",
  group: "CodeBlock"
});
const nm = Re(
  (t) => Vd(
    /^```(?<language>[a-z]*)?[\s\n]$/,
    Ii.type(t),
    (e) => ({
      language: e.groups?.language ?? ""
    })
  )
);
M(nm, {
  displayName: "InputRule<createCodeBlockInputRule>",
  group: "CodeBlock"
});
const oc = F(
  "CreateCodeBlock",
  (t) => (e = "") => ci(Ii.type(t), { language: e })
);
M(oc, {
  displayName: "Command<createCodeBlockCommand>",
  group: "CodeBlock"
});
const aS = F(
  "UpdateCodeBlockLanguage",
  () => ({ pos: t, language: e } = {
    pos: -1,
    language: ""
  }) => (n, r) => t >= 0 ? (r?.(n.tr.setNodeAttribute(t, "language", e)), !0) : !1
);
M(aS, {
  displayName: "Command<updateCodeBlockLanguageCommand>",
  group: "CodeBlock"
});
const sc = Fe("codeBlockKeymap", {
  CreateCodeBlock: {
    shortcuts: "Mod-Alt-c",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(oc.key);
    }
  }
});
M(sc.ctx, {
  displayName: "KeymapCtx<codeBlock>",
  group: "CodeBlock"
});
M(sc.shortcuts, {
  displayName: "Keymap<codeBlock>",
  group: "CodeBlock"
});
const lc = ht("image");
M(lc, {
  displayName: "Attr<image>",
  group: "Image"
});
const br = de("image", (t) => ({
  inline: !0,
  group: "inline",
  selectable: !0,
  draggable: !0,
  marks: "",
  atom: !0,
  defining: !0,
  isolating: !0,
  attrs: {
    src: { default: "", validate: "string" },
    alt: { default: "", validate: "string" },
    title: { default: "", validate: "string" }
  },
  parseDOM: [
    {
      tag: "img[src]",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw xt(e);
        return {
          src: e.getAttribute("src") || "",
          alt: e.getAttribute("alt") || "",
          title: e.getAttribute("title") || e.getAttribute("alt") || ""
        };
      }
    }
  ],
  toDOM: (e) => ["img", { ...t.get(lc.key)(e), ...e.attrs }],
  parseMarkdown: {
    match: ({ type: e }) => e === "image",
    runner: (e, n, r) => {
      const i = n.url, o = n.alt, s = n.title;
      e.addNode(r, {
        src: i,
        alt: o,
        title: s
      });
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "image",
    runner: (e, n) => {
      e.addNode("image", void 0, void 0, {
        title: n.attrs.title,
        url: n.attrs.src,
        alt: n.attrs.alt
      });
    }
  }
}));
M(br.node, {
  displayName: "NodeSchema<image>",
  group: "Image"
});
M(br.ctx, {
  displayName: "NodeSchemaCtx<image>",
  group: "Image"
});
const rm = F(
  "InsertImage",
  (t) => (e = {}) => (n, r) => {
    if (!r) return !0;
    const { src: i = "", alt: o = "", title: s = "" } = e, l = br.type(t).create({ src: i, alt: o, title: s });
    return l && r(n.tr.replaceSelectionWith(l).scrollIntoView()), !0;
  }
);
M(rm, {
  displayName: "Command<insertImageCommand>",
  group: "Image"
});
const im = F(
  "UpdateImage",
  (t) => (e = {}) => (n, r) => {
    const i = ux(
      n.selection,
      br.type(t)
    );
    if (!i) return !1;
    const { node: o, pos: s } = i, l = { ...o.attrs }, { src: a, alt: c, title: u } = e;
    return a !== void 0 && (l.src = a), c !== void 0 && (l.alt = c), u !== void 0 && (l.title = u), r?.(
      n.tr.setNodeMarkup(s, void 0, l).scrollIntoView()
    ), !0;
  }
);
M(im, {
  displayName: "Command<updateImageCommand>",
  group: "Image"
});
const cS = Re(
  (t) => new qe(
    /!\[(?<alt>.*?)]\((?<filename>.*?)\s*(?="|\))"?(?<title>[^"]+)?"?\)/,
    (e, n, r, i) => {
      const [o, s, l = "", a] = n;
      return o ? e.tr.replaceWith(
        r,
        i,
        br.type(t).create({ src: l, alt: s, title: a })
      ) : null;
    }
  )
);
M(cS, {
  displayName: "InputRule<insertImageInputRule>",
  group: "Image"
});
const Oo = ht("hardbreak", (t) => ({
  "data-type": "hardbreak",
  "data-is-inline": t.attrs.isInline
}));
M(Oo, {
  displayName: "Attr<hardbreak>",
  group: "Hardbreak"
});
const vn = de("hardbreak", (t) => ({
  inline: !0,
  group: "inline",
  attrs: {
    isInline: {
      default: !1,
      validate: "boolean"
    }
  },
  selectable: !1,
  parseDOM: [
    { tag: "br" },
    {
      tag: 'span[data-type="hardbreak"]',
      getAttrs: () => ({ isInline: !0 })
    }
  ],
  toDOM: (e) => e.attrs.isInline ? ["span", t.get(Oo.key)(e), " "] : ["br", t.get(Oo.key)(e)],
  parseMarkdown: {
    match: ({ type: e }) => e === "break",
    runner: (e, n, r) => {
      e.addNode(r, {
        isInline: !!n.data?.isInline
      });
    }
  },
  leafText: () => `
`,
  toMarkdown: {
    match: (e) => e.type.name === "hardbreak",
    runner: (e, n) => {
      n.attrs.isInline ? e.addNode("text", void 0, `
`) : e.addNode("break");
    }
  }
}));
M(vn.node, {
  displayName: "NodeSchema<hardbreak>",
  group: "Hardbreak"
});
M(vn.ctx, {
  displayName: "NodeSchemaCtx<hardbreak>",
  group: "Hardbreak"
});
const ac = F(
  "InsertHardbreak",
  (t) => () => (e, n) => {
    const { selection: r, tr: i } = e;
    if (!(r instanceof H)) return !1;
    if (r.empty) {
      const o = r.$from.node();
      if (o.childCount > 0 && o.lastChild?.type.name === "hardbreak")
        return n?.(
          i.replaceRangeWith(
            r.to - 1,
            r.to,
            e.schema.node("paragraph")
          ).setSelection($.near(i.doc.resolve(r.to))).scrollIntoView()
        ), !0;
    }
    return n?.(
      i.setMeta("hardbreak", !0).replaceSelectionWith(vn.type(t).create()).scrollIntoView()
    ), !0;
  }
);
M(ac, {
  displayName: "Command<insertHardbreakCommand>",
  group: "Hardbreak"
});
const cc = Fe("hardbreakKeymap", {
  InsertHardbreak: {
    shortcuts: "Shift-Enter",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(ac.key);
    }
  }
});
M(cc.ctx, {
  displayName: "KeymapCtx<hardbreak>",
  group: "Hardbreak"
});
M(cc.shortcuts, {
  displayName: "Keymap<hardbreak>",
  group: "Hardbreak"
});
const uc = ht("hr");
M(uc, {
  displayName: "Attr<hr>",
  group: "Hr"
});
const Ai = de("hr", (t) => ({
  group: "block",
  parseDOM: [{ tag: "hr" }],
  toDOM: (e) => ["hr", t.get(uc.key)(e)],
  parseMarkdown: {
    match: ({ type: e }) => e === "thematicBreak",
    runner: (e, n, r) => {
      e.addNode(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "hr",
    runner: (e) => {
      e.addNode("thematicBreak");
    }
  }
}));
M(Ai.node, {
  displayName: "NodeSchema<hr>",
  group: "Hr"
});
M(Ai.ctx, {
  displayName: "NodeSchemaCtx<hr>",
  group: "Hr"
});
const om = Re(
  (t) => new qe(/^(?:---|___\s|\*\*\*\s)$/, (e, n, r, i) => {
    const { tr: o } = e;
    return n[0] && o.replaceWith(r - 1, i, Ai.type(t).create()), o;
  })
);
M(om, {
  displayName: "InputRule<insertHrInputRule>",
  group: "Hr"
});
const sm = F(
  "InsertHr",
  (t) => () => (e, n) => {
    if (!n) return !0;
    const r = hn.node.type(t).create(), { tr: i, selection: o } = e, { from: s } = o, l = Ai.type(t).create();
    if (!l) return !0;
    const a = i.replaceSelectionWith(l).insert(s, r), c = $.findFrom(a.doc.resolve(s), 1, !0);
    return c && n(a.setSelection(c).scrollIntoView()), !0;
  }
);
M(sm, {
  displayName: "Command<insertHrCommand>",
  group: "Hr"
});
const fc = ht("bulletList");
M(fc, {
  displayName: "Attr<bulletList>",
  group: "BulletList"
});
const wr = de("bullet_list", (t) => ({
  content: "listItem+",
  group: "block",
  attrs: {
    spread: {
      default: !1,
      validate: "boolean"
    }
  },
  parseDOM: [
    {
      tag: "ul",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw xt(e);
        return {
          spread: e.dataset.spread === "true"
        };
      }
    }
  ],
  toDOM: (e) => [
    "ul",
    {
      ...t.get(fc.key)(e),
      "data-spread": e.attrs.spread
    },
    0
  ],
  parseMarkdown: {
    match: ({ type: e, ordered: n }) => e === "list" && !n,
    runner: (e, n, r) => {
      const i = n.spread != null ? `${n.spread}` : "false";
      e.openNode(r, { spread: i }).next(n.children).closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "bullet_list",
    runner: (e, n) => {
      e.openNode("list", void 0, {
        ordered: !1,
        spread: n.attrs.spread
      }).next(n.content).closeNode();
    }
  }
}));
M(wr.node, {
  displayName: "NodeSchema<bulletList>",
  group: "BulletList"
});
M(wr.ctx, {
  displayName: "NodeSchemaCtx<bulletList>",
  group: "BulletList"
});
const lm = Re(
  (t) => Ta(/^\s*([-+*])\s$/, wr.type(t))
);
M(lm, {
  displayName: "InputRule<wrapInBulletListInputRule>",
  group: "BulletList"
});
const ts = F(
  "WrapInBulletList",
  (t) => () => Ma(wr.type(t))
);
M(ts, {
  displayName: "Command<wrapInBulletListCommand>",
  group: "BulletList"
});
const hc = Fe("bulletListKeymap", {
  WrapInBulletList: {
    shortcuts: "Mod-Alt-8",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(ts.key);
    }
  }
});
M(hc.ctx, {
  displayName: "KeymapCtx<bulletListKeymap>",
  group: "BulletList"
});
M(hc.shortcuts, {
  displayName: "Keymap<bulletListKeymap>",
  group: "BulletList"
});
const dc = ht("orderedList");
M(dc, {
  displayName: "Attr<orderedList>",
  group: "OrderedList"
});
const xr = de("ordered_list", (t) => ({
  content: "listItem+",
  group: "block",
  attrs: {
    order: {
      default: 1,
      validate: "number"
    },
    spread: {
      default: !1,
      validate: "boolean"
    }
  },
  parseDOM: [
    {
      tag: "ol",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw xt(e);
        return {
          spread: e.dataset.spread,
          order: e.hasAttribute("start") ? Number(e.getAttribute("start")) : 1
        };
      }
    }
  ],
  toDOM: (e) => [
    "ol",
    {
      ...t.get(dc.key)(e),
      ...e.attrs.order === 1 ? {} : e.attrs.order,
      "data-spread": e.attrs.spread
    },
    0
  ],
  parseMarkdown: {
    match: ({ type: e, ordered: n }) => e === "list" && !!n,
    runner: (e, n, r) => {
      const i = n.spread != null ? `${n.spread}` : "true";
      e.openNode(r, { spread: i }).next(n.children).closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "ordered_list",
    runner: (e, n) => {
      e.openNode("list", void 0, {
        ordered: !0,
        start: 1,
        spread: n.attrs.spread === "true"
      }), e.next(n.content), e.closeNode();
    }
  }
}));
M(xr.node, {
  displayName: "NodeSchema<orderedList>",
  group: "OrderedList"
});
M(xr.ctx, {
  displayName: "NodeSchemaCtx<orderedList>",
  group: "OrderedList"
});
const am = Re(
  (t) => Ta(
    /^\s*(\d+)\.\s$/,
    xr.type(t),
    (e) => ({ order: Number(e[1]) }),
    (e, n) => n.childCount + n.attrs.order === Number(e[1])
  )
);
M(am, {
  displayName: "InputRule<wrapInOrderedListInputRule>",
  group: "OrderedList"
});
const ns = F(
  "WrapInOrderedList",
  (t) => () => Ma(xr.type(t))
);
M(ns, {
  displayName: "Command<wrapInOrderedListCommand>",
  group: "OrderedList"
});
const pc = Fe("orderedListKeymap", {
  WrapInOrderedList: {
    shortcuts: "Mod-Alt-7",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(ns.key);
    }
  }
});
M(pc.ctx, {
  displayName: "KeymapCtx<orderedList>",
  group: "OrderedList"
});
M(pc.shortcuts, {
  displayName: "Keymap<orderedList>",
  group: "OrderedList"
});
const mc = ht("listItem");
M(mc, {
  displayName: "Attr<listItem>",
  group: "ListItem"
});
const _t = de("list_item", (t) => ({
  group: "listItem",
  content: "paragraph block*",
  attrs: {
    label: {
      default: "•",
      validate: "string"
    },
    listType: {
      default: "bullet",
      validate: "string"
    },
    spread: {
      default: !0,
      validate: "boolean"
    }
  },
  defining: !0,
  parseDOM: [
    {
      tag: "li",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw xt(e);
        return {
          label: e.dataset.label,
          listType: e.dataset.listType,
          spread: e.dataset.spread === "true"
        };
      }
    }
  ],
  toDOM: (e) => [
    "li",
    {
      ...t.get(mc.key)(e),
      "data-label": e.attrs.label,
      "data-list-type": e.attrs.listType,
      "data-spread": e.attrs.spread
    },
    0
  ],
  parseMarkdown: {
    match: ({ type: e }) => e === "listItem",
    runner: (e, n, r) => {
      const i = n.label != null ? `${n.label}.` : "•", o = n.label != null ? "ordered" : "bullet", s = n.spread != null ? `${n.spread}` : "true";
      e.openNode(r, { label: i, listType: o, spread: s }), e.next(n.children), e.closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "list_item",
    runner: (e, n) => {
      e.openNode("listItem", void 0, {
        spread: n.attrs.spread
      }), e.next(n.content), e.closeNode();
    }
  }
}));
M(_t.node, {
  displayName: "NodeSchema<listItem>",
  group: "ListItem"
});
M(_t.ctx, {
  displayName: "NodeSchemaCtx<listItem>",
  group: "ListItem"
});
const gc = F(
  "SinkListItem",
  (t) => () => tS(_t.type(t))
);
M(gc, {
  displayName: "Command<sinkListItemCommand>",
  group: "ListItem"
});
const yc = F(
  "LiftListItem",
  (t) => () => XC(_t.type(t))
);
M(yc, {
  displayName: "Command<liftListItemCommand>",
  group: "ListItem"
});
const kc = F(
  "SplitListItem",
  (t) => () => QC(_t.type(t))
);
M(kc, {
  displayName: "Command<splitListItemCommand>",
  group: "ListItem"
});
function uS(t) {
  return (e, n, r) => {
    const { selection: i } = e;
    if (!(i instanceof H)) return !1;
    const { empty: o, $from: s } = i;
    return !o || s.parentOffset !== 0 || s.node(-1).type !== _t.type(t) ? !1 : Pd(e, n, r);
  };
}
const bc = F(
  "LiftFirstListItem",
  (t) => () => uS(t)
);
M(bc, {
  displayName: "Command<liftFirstListItemCommand>",
  group: "ListItem"
});
const wc = Fe("listItemKeymap", {
  NextListItem: {
    shortcuts: "Enter",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(kc.key);
    }
  },
  SinkListItem: {
    shortcuts: ["Tab", "Mod-]"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(gc.key);
    }
  },
  LiftListItem: {
    shortcuts: ["Shift-Tab", "Mod-["],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(yc.key);
    }
  },
  LiftFirstListItem: {
    shortcuts: ["Backspace", "Delete"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(bc.key);
    }
  }
});
M(wc.ctx, {
  displayName: "KeymapCtx<listItem>",
  group: "ListItem"
});
M(wc.shortcuts, {
  displayName: "Keymap<listItem>",
  group: "ListItem"
});
const cm = Ba("text", () => ({
  group: "inline",
  parseMarkdown: {
    match: ({ type: t }) => t === "text",
    runner: (t, e) => {
      t.addText(e.value);
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "text",
    runner: (t, e) => {
      t.addNode("text", void 0, e.text);
    }
  }
}));
M(cm, {
  displayName: "NodeSchema<text>",
  group: "Text"
});
const xc = ht("html");
M(xc, {
  displayName: "Attr<html>",
  group: "Html"
});
const Cc = de("html", (t) => ({
  atom: !0,
  group: "inline",
  inline: !0,
  attrs: {
    value: {
      default: "",
      validate: "string"
    }
  },
  toDOM: (e) => {
    const n = document.createElement("span"), r = {
      ...t.get(xc.key)(e),
      "data-value": e.attrs.value,
      "data-type": "html"
    };
    return n.textContent = e.attrs.value, ["span", r, e.attrs.value];
  },
  parseDOM: [
    {
      tag: 'span[data-type="html"]',
      getAttrs: (e) => ({
        value: e.dataset.value ?? ""
      })
    }
  ],
  parseMarkdown: {
    match: ({ type: e }) => e === "html",
    runner: (e, n, r) => {
      e.addNode(r, { value: n.value });
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "html",
    runner: (e, n) => {
      e.addNode("html", void 0, n.attrs.value);
    }
  }
}));
M(Cc.node, {
  displayName: "NodeSchema<html>",
  group: "Html"
});
M(Cc.ctx, {
  displayName: "NodeSchemaCtx<html>",
  group: "Html"
});
const fS = [
  Zp,
  Ya,
  hn,
  es,
  Xa,
  Kn,
  Oo,
  vn,
  tc,
  Ni,
  ic,
  Ii,
  uc,
  Ai,
  lc,
  br,
  fc,
  wr,
  dc,
  xr,
  mc,
  _t,
  Va,
  kr,
  Wa,
  Ti,
  qa,
  Qt,
  Ja,
  lr,
  xc,
  Cc,
  cm
].flat(), hS = [
  tm,
  lm,
  am,
  nm,
  om,
  em
].flat(), dS = [
  Jp,
  Gp,
  Qp,
  Yp
], pS = F(
  "IsMarkSelected",
  () => (t) => (e) => {
    if (!t) return !1;
    const { doc: n, selection: r } = e;
    return n.rangeHasMark(r.from, r.to, t);
  }
), mS = F(
  "IsNoteSelected",
  () => (t) => (e) => t ? fx(e, t).hasNode : !1
), gS = F(
  "ClearTextInCurrentBlock",
  () => () => (t, e) => {
    let n = t.tr;
    const { $from: r, $to: i } = n.selection, { pos: o } = r, { pos: s } = i, l = o - r.node().content.size;
    return l < 0 ? !1 : (n = n.deleteRange(l, s), e?.(n), !0);
  }
), yS = F(
  "SetBlockType",
  () => (t) => (e, n) => {
    const { nodeType: r, attrs: i = null } = t ?? {};
    if (!r) return !1;
    const o = e.tr, { from: s, to: l } = o.selection;
    try {
      o.setBlockType(s, l, r, i);
    } catch {
      return !1;
    }
    return n?.(o), !0;
  }
), kS = F(
  "WrapInBlockType",
  () => (t) => (e, n) => {
    const { nodeType: r, attrs: i = null } = t ?? {};
    if (!r) return !1;
    let o = e.tr;
    try {
      const { $from: s, $to: l } = o.selection, a = s.blockRange(l), c = a && ba(a, r, i);
      if (!c) return !1;
      o = o.wrap(a, c);
    } catch {
      return !1;
    }
    return n?.(o), !0;
  }
), bS = F(
  "AddBlockType",
  () => (t) => (e, n) => {
    const { nodeType: r, attrs: i = null } = t ?? {};
    if (!r) return !1;
    const o = e.tr;
    try {
      const s = r instanceof Lt ? r : r.createAndFill(i);
      if (!s) return !1;
      o.replaceSelectionWith(s);
    } catch {
      return !1;
    }
    return n?.(o), !0;
  }
), wS = F(
  "SelectTextNearPos",
  () => (t) => (e, n) => {
    const { pos: r } = t ?? {};
    if (r == null) return !1;
    const i = (s, l, a) => Math.min(Math.max(s, l), a), o = e.tr;
    try {
      const s = e.doc.resolve(i(r, 0, e.doc.content.size));
      o.setSelection(H.near(s));
    } catch {
      return !1;
    }
    return n?.(o.scrollIntoView()), !0;
  }
), xS = [
  Zo,
  nc,
  Dt,
  Za,
  oc,
  ac,
  sm,
  rm,
  im,
  ns,
  ts,
  gc,
  kc,
  yc,
  bc,
  Yo,
  Ka,
  Qo,
  Ga,
  Xp,
  pS,
  mS,
  gS,
  yS,
  kS,
  bS,
  wS
], CS = [
  rc,
  sc,
  cc,
  ec,
  wc,
  pc,
  hc,
  Qa,
  Ha,
  Ua,
  ja
].flat(), Sc = fn(
  "remarkAddOrderInList",
  () => () => (t) => {
    Wn(t, "list", (e) => {
      if (e.ordered) {
        const n = e.start ?? 1;
        e.children.forEach((r, i) => {
          r.label = i + n;
        });
      }
    });
  }
);
M(Sc.plugin, {
  displayName: "Remark<remarkAddOrderInListPlugin>",
  group: "Remark"
});
M(Sc.options, {
  displayName: "RemarkConfig<remarkAddOrderInListPlugin>",
  group: "Remark"
});
const Mc = fn(
  "remarkLineBreak",
  () => () => (t) => {
    const e = /[\t ]*(?:\r?\n|\r)/g;
    Wn(
      t,
      "text",
      (n, r, i) => {
        if (!n.value || typeof n.value != "string") return;
        const o = [];
        let s = 0;
        e.lastIndex = 0;
        let l = e.exec(n.value);
        for (; l; ) {
          const c = l.index;
          s !== c && o.push({
            type: "text",
            value: n.value.slice(s, c)
          }), o.push({ type: "break", data: { isInline: !0 } }), s = c + l[0].length, l = e.exec(n.value);
        }
        if (o.length > 0 && i && typeof r == "number")
          return s < n.value.length && o.push({ type: "text", value: n.value.slice(s) }), i.children.splice(r, 1, ...o), r + o.length;
      }
    );
  }
);
M(Mc.plugin, {
  displayName: "Remark<remarkLineBreak>",
  group: "Remark"
});
M(Mc.options, {
  displayName: "RemarkConfig<remarkLineBreak>",
  group: "Remark"
});
const Tc = fn(
  "remarkInlineLink",
  () => rS
);
M(Tc.plugin, {
  displayName: "Remark<remarkInlineLinkPlugin>",
  group: "Remark"
});
M(Tc.options, {
  displayName: "RemarkConfig<remarkInlineLinkPlugin>",
  group: "Remark"
});
const SS = (t) => !!t.children, MS = (t) => t.type === "html";
function TS(t, e) {
  return n(t, 0, null)[0];
  function n(r, i, o) {
    if (SS(r)) {
      const s = [];
      for (let l = 0, a = r.children.length; l < a; l++) {
        const c = r.children[l];
        if (c) {
          const u = n(c, l, r);
          if (u)
            for (let f = 0, h = u.length; f < h; f++) {
              const d = u[f];
              d && s.push(d);
            }
        }
      }
      r.children = s;
    }
    return e(r, i, o);
  }
}
const NS = ["root", "blockquote", "listItem"], Nc = fn(
  "remarkHTMLTransformer",
  () => () => (t) => {
    TS(t, (e, n, r) => MS(e) ? (r && NS.includes(r.type) && (e.children = [{ ...e }], delete e.value, e.type = "paragraph"), [e]) : [e]);
  }
);
M(Nc.plugin, {
  displayName: "Remark<remarkHtmlTransformer>",
  group: "Remark"
});
M(Nc.options, {
  displayName: "RemarkConfig<remarkHtmlTransformer>",
  group: "Remark"
});
const Ic = fn(
  "remarkMarker",
  () => () => (t, e) => {
    const n = (r) => e.value.charAt(r.position.start.offset);
    Wn(
      t,
      (r) => ["strong", "emphasis"].includes(r.type),
      (r) => {
        r.marker = n(r);
      }
    );
  }
);
M(Ic.plugin, {
  displayName: "Remark<remarkMarker>",
  group: "Remark"
});
M(Ic.options, {
  displayName: "RemarkConfig<remarkMarker>",
  group: "Remark"
});
const um = Ke(() => {
  let t = !1;
  const e = new he(
    "MILKDOWN_INLINE_NODES_CURSOR"
  ), n = new ye({
    key: e,
    state: {
      init() {
        return !1;
      },
      apply(r) {
        if (!r.selection.empty) return !1;
        const i = r.selection.$from, o = i.nodeBefore, s = i.nodeAfter;
        return !!(o && s && o.isInline && !o.isText && s.isInline && !s.isText);
      }
    },
    props: {
      handleDOMEvents: {
        compositionend: (r, i) => t ? (t = !1, requestAnimationFrame(() => {
          if (n.getState(r.state)) {
            const s = r.state.selection.from;
            i.preventDefault(), r.dispatch(r.state.tr.insertText(i.data || "", s));
          }
        }), !0) : !1,
        compositionstart: (r) => (n.getState(r.state) && (t = !0), !1),
        beforeinput: (r, i) => {
          if (n.getState(r.state) && i instanceof InputEvent && i.data && !t) {
            const s = r.state.selection.from;
            return i.preventDefault(), r.dispatch(r.state.tr.insertText(i.data || "", s)), !0;
          }
          return !1;
        }
      },
      decorations(r) {
        if (n.getState(r)) {
          const s = r.selection.$from.pos, l = document.createElement("span"), a = Ce.widget(s, l, {
            side: -1
          }), c = document.createElement("span"), u = Ce.widget(s, c);
          return setTimeout(() => {
            l.contentEditable = "true", c.contentEditable = "true";
          }), le.create(r.doc, [a, u]);
        }
        return le.empty;
      }
    }
  });
  return n;
});
M(um, {
  displayName: "Prose<inlineNodesCursorPlugin>",
  group: "Prose"
});
const fm = Ke((t) => new ye({
  key: new he("MILKDOWN_HARDBREAK_MARKS"),
  appendTransaction: (e, n, r) => {
    if (!e.length) return;
    const [i] = e;
    if (!i) return;
    const [o] = i.steps;
    if (i.getMeta("hardbreak")) {
      if (!(o instanceof me)) return;
      const { from: a } = o;
      return r.tr.setNodeMarkup(
        a,
        vn.type(t),
        void 0,
        []
      );
    }
    if (o instanceof Rt) {
      let a = r.tr;
      const { from: c, to: u } = o;
      return r.doc.nodesBetween(c, u, (f, h) => {
        f.type === vn.type(t) && (a = a.setNodeMarkup(
          h,
          vn.type(t),
          void 0,
          []
        ));
      }), a;
    }
  }
}));
M(fm, {
  displayName: "Prose<hardbreakClearMarkPlugin>",
  group: "Prose"
});
const Ac = ft(
  ["table", "code_block"],
  "hardbreakFilterNodes"
);
M(Ac, {
  displayName: "Ctx<hardbreakFilterNodes>",
  group: "Prose"
});
const hm = Ke((t) => {
  const e = t.get(Ac.key);
  return new ye({
    key: new he("MILKDOWN_HARDBREAK_FILTER"),
    filterTransaction: (n, r) => {
      const i = n.getMeta("hardbreak"), [o] = n.steps;
      if (i && o) {
        const { from: s } = o, l = r.doc.resolve(s);
        let a = l.depth, c = !0;
        for (; a > 0; )
          e.includes(l.node(a).type.name) && (c = !1), a--;
        return c;
      }
      return !0;
    }
  });
});
M(hm, {
  displayName: "Prose<hardbreakFilterPlugin>",
  group: "Prose"
});
const dm = Ke((t) => {
  const e = new he("MILKDOWN_HEADING_ID"), n = (r) => {
    if (r.composing) return;
    const i = t.get(es.key), o = r.state.tr.setMeta("addToHistory", !1);
    let s = !1;
    const l = {};
    r.state.doc.descendants((a, c) => {
      if (a.type === Kn.type(t)) {
        if (a.textContent.trim().length === 0) return;
        const u = a.attrs;
        let f = i(a);
        l[f] ? (l[f] += 1, f += `-#${l[f]}`) : l[f] = 1, u.id !== f && (s = !0, o.setMeta(e, !0).setNodeMarkup(c, void 0, {
          ...u,
          id: f
        }));
      }
    }), s && r.dispatch(o);
  };
  return new ye({
    key: e,
    view: (r) => (n(r), {
      update: (i, o) => {
        i.state.doc.eq(o.doc) || n(i);
      }
    })
  });
});
M(dm, {
  displayName: "Prose<syncHeadingIdPlugin>",
  group: "Prose"
});
const pm = Ke((t) => {
  const e = (n, r, i) => {
    if (!i.selection || n.some(
      (f) => f.getMeta("addToHistory") === !1 || !f.isGeneric
    ))
      return null;
    const o = xr.type(t), s = wr.type(t), l = _t.type(t), a = (f, h) => {
      let d = !1;
      const p = `${h + 1}.`;
      return f.label !== p && (f.label = p, d = !0), d;
    };
    let c = i.tr, u = !1;
    return i.doc.descendants(
      (f, h, d, p) => {
        if (f.type === s) {
          const m = f.maybeChild(0);
          m?.type === l && m.attrs.listType === "ordered" && (u = !0, c.setNodeMarkup(h, o, { spread: "true" }), f.descendants(
            (y, g, S, C) => {
              if (y.type === l) {
                const I = { ...y.attrs };
                a(I, C) && (c = c.setNodeMarkup(g, void 0, I));
              }
              return !1;
            }
          ));
        } else if (f.type === l && d?.type === o) {
          const m = { ...f.attrs };
          let y = !1;
          m.listType !== "ordered" && (m.listType = "ordered", y = !0), d?.maybeChild(0) && (y = a(m, p)), y && (c = c.setNodeMarkup(h, void 0, m), u = !0);
        }
      }
    ), u ? c.setMeta("addToHistory", !1) : null;
  };
  return new ye({
    key: new he("MILKDOWN_KEEP_LIST_ORDER"),
    appendTransaction: e
  });
});
M(pm, {
  displayName: "Prose<syncListOrderPlugin>",
  group: "Prose"
});
const IS = [
  fm,
  Ac,
  hm,
  um,
  Sc,
  Tc,
  Mc,
  Nc,
  Ic,
  Xo,
  dm,
  pm
].flat(), AS = [
  fS,
  hS,
  dS,
  xS,
  CS,
  IS
].flat();
var Ul, Jl;
if (typeof WeakMap < "u") {
  let t = /* @__PURE__ */ new WeakMap();
  Ul = (e) => t.get(e), Jl = (e, n) => (t.set(e, n), n);
} else {
  const t = [];
  let n = 0;
  Ul = (r) => {
    for (let i = 0; i < t.length; i += 2)
      if (t[i] == r) return t[i + 1];
  }, Jl = (r, i) => (n == 10 && (n = 0), t[n++] = r, t[n++] = i);
}
var ee = class {
  constructor(t, e, n, r) {
    this.width = t, this.height = e, this.map = n, this.problems = r;
  }
  // Find the dimensions of the cell at the given position.
  findCell(t) {
    for (let e = 0; e < this.map.length; e++) {
      const n = this.map[e];
      if (n != t) continue;
      const r = e % this.width, i = e / this.width | 0;
      let o = r + 1, s = i + 1;
      for (let l = 1; o < this.width && this.map[e + l] == n; l++)
        o++;
      for (let l = 1; s < this.height && this.map[e + this.width * l] == n; l++)
        s++;
      return { left: r, top: i, right: o, bottom: s };
    }
    throw new RangeError(`No cell with offset ${t} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(t) {
    for (let e = 0; e < this.map.length; e++)
      if (this.map[e] == t)
        return e % this.width;
    throw new RangeError(`No cell with offset ${t} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(t, e, n) {
    const { left: r, right: i, top: o, bottom: s } = this.findCell(t);
    return e == "horiz" ? (n < 0 ? r == 0 : i == this.width) ? null : this.map[o * this.width + (n < 0 ? r - 1 : i)] : (n < 0 ? o == 0 : s == this.height) ? null : this.map[r + this.width * (n < 0 ? o - 1 : s)];
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(t, e) {
    const {
      left: n,
      right: r,
      top: i,
      bottom: o
    } = this.findCell(t), {
      left: s,
      right: l,
      top: a,
      bottom: c
    } = this.findCell(e);
    return {
      left: Math.min(n, s),
      top: Math.min(i, a),
      right: Math.max(r, l),
      bottom: Math.max(o, c)
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(t) {
    const e = [], n = {};
    for (let r = t.top; r < t.bottom; r++)
      for (let i = t.left; i < t.right; i++) {
        const o = r * this.width + i, s = this.map[o];
        n[s] || (n[s] = !0, !(i == t.left && i && this.map[o - 1] == s || r == t.top && r && this.map[o - this.width] == s) && e.push(s));
      }
    return e;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(t, e, n) {
    for (let r = 0, i = 0; ; r++) {
      const o = i + n.child(r).nodeSize;
      if (r == t) {
        let s = e + t * this.width;
        const l = (t + 1) * this.width;
        for (; s < l && this.map[s] < i; ) s++;
        return s == l ? o - 1 : this.map[s];
      }
      i = o;
    }
  }
  // Find the table map for the given table node.
  static get(t) {
    return Ul(t) || Jl(t, ES(t));
  }
};
function ES(t) {
  if (t.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + t.type.name);
  const e = OS(t), n = t.childCount, r = [];
  let i = 0, o = null;
  const s = [];
  for (let c = 0, u = e * n; c < u; c++) r[c] = 0;
  for (let c = 0, u = 0; c < n; c++) {
    const f = t.child(c);
    u++;
    for (let p = 0; ; p++) {
      for (; i < r.length && r[i] != 0; ) i++;
      if (p == f.childCount) break;
      const m = f.child(p), { colspan: y, rowspan: g, colwidth: S } = m.attrs;
      for (let C = 0; C < g; C++) {
        if (C + c >= n) {
          (o || (o = [])).push({
            type: "overlong_rowspan",
            pos: u,
            n: g - C
          });
          break;
        }
        const I = i + C * e;
        for (let A = 0; A < y; A++) {
          r[I + A] == 0 ? r[I + A] = u : (o || (o = [])).push({
            type: "collision",
            row: c,
            pos: u,
            n: y - A
          });
          const x = S && S[A];
          if (x) {
            const R = (I + A) % e * 2, O = s[R];
            O == null || O != x && s[R + 1] == 1 ? (s[R] = x, s[R + 1] = 1) : O == x && s[R + 1]++;
          }
        }
      }
      i += y, u += m.nodeSize;
    }
    const h = (c + 1) * e;
    let d = 0;
    for (; i < h; ) r[i++] == 0 && d++;
    d && (o || (o = [])).push({ type: "missing", row: c, n: d }), u++;
  }
  (e === 0 || n === 0) && (o || (o = [])).push({ type: "zero_sized" });
  const l = new ee(e, n, r, o);
  let a = !1;
  for (let c = 0; !a && c < s.length; c += 2)
    s[c] != null && s[c + 1] < n && (a = !0);
  return a && DS(l, s, t), l;
}
function OS(t) {
  let e = -1, n = !1;
  for (let r = 0; r < t.childCount; r++) {
    const i = t.child(r);
    let o = 0;
    if (n)
      for (let s = 0; s < r; s++) {
        const l = t.child(s);
        for (let a = 0; a < l.childCount; a++) {
          const c = l.child(a);
          s + c.attrs.rowspan > r && (o += c.attrs.colspan);
        }
      }
    for (let s = 0; s < i.childCount; s++) {
      const l = i.child(s);
      o += l.attrs.colspan, l.attrs.rowspan > 1 && (n = !0);
    }
    e == -1 ? e = o : e != o && (e = Math.max(e, o));
  }
  return e;
}
function DS(t, e, n) {
  t.problems || (t.problems = []);
  const r = {};
  for (let i = 0; i < t.map.length; i++) {
    const o = t.map[i];
    if (r[o]) continue;
    r[o] = !0;
    const s = n.nodeAt(o);
    if (!s)
      throw new RangeError(`No cell with offset ${o} found`);
    let l = null;
    const a = s.attrs;
    for (let c = 0; c < a.colspan; c++) {
      const u = (i + c) % t.width, f = e[u * 2];
      f != null && (!a.colwidth || a.colwidth[c] != f) && ((l || (l = RS(a)))[c] = f);
    }
    l && t.problems.unshift({
      type: "colwidth mismatch",
      pos: o,
      colwidth: l
    });
  }
}
function RS(t) {
  if (t.colwidth) return t.colwidth.slice();
  const e = [];
  for (let n = 0; n < t.colspan; n++) e.push(0);
  return e;
}
function Pf(t, e) {
  if (typeof t == "string")
    return {};
  const n = t.getAttribute("data-colwidth"), r = n && /^\d+(,\d+)*$/.test(n) ? n.split(",").map((s) => Number(s)) : null, i = Number(t.getAttribute("colspan") || 1), o = {
    colspan: i,
    rowspan: Number(t.getAttribute("rowspan") || 1),
    colwidth: r && r.length == i ? r : null
  };
  for (const s in e) {
    const l = e[s].getFromDOM, a = l && l(t);
    a != null && (o[s] = a);
  }
  return o;
}
function zf(t, e) {
  const n = {};
  t.attrs.colspan != 1 && (n.colspan = t.attrs.colspan), t.attrs.rowspan != 1 && (n.rowspan = t.attrs.rowspan), t.attrs.colwidth && (n["data-colwidth"] = t.attrs.colwidth.join(","));
  for (const r in e) {
    const i = e[r].setDOMAttr;
    i && i(t.attrs[r], n);
  }
  return n;
}
function vS(t) {
  if (t !== null) {
    if (!Array.isArray(t))
      throw new TypeError("colwidth must be null or an array");
    for (const e of t)
      if (typeof e != "number")
        throw new TypeError("colwidth must be null or an array of numbers");
  }
}
function LS(t) {
  const e = t.cellAttributes || {}, n = {
    colspan: { default: 1, validate: "number" },
    rowspan: { default: 1, validate: "number" },
    colwidth: { default: null, validate: vS }
  };
  for (const r in e)
    n[r] = {
      default: e[r].default,
      validate: e[r].validate
    };
  return {
    table: {
      content: "table_row+",
      tableRole: "table",
      isolating: !0,
      group: t.tableGroup,
      parseDOM: [{ tag: "table" }],
      toDOM() {
        return ["table", ["tbody", 0]];
      }
    },
    table_row: {
      content: "(table_cell | table_header)*",
      tableRole: "row",
      parseDOM: [{ tag: "tr" }],
      toDOM() {
        return ["tr", 0];
      }
    },
    table_cell: {
      content: t.cellContent,
      attrs: n,
      tableRole: "cell",
      isolating: !0,
      parseDOM: [
        { tag: "td", getAttrs: (r) => Pf(r, e) }
      ],
      toDOM(r) {
        return ["td", zf(r, e), 0];
      }
    },
    table_header: {
      content: t.cellContent,
      attrs: n,
      tableRole: "header_cell",
      isolating: !0,
      parseDOM: [
        { tag: "th", getAttrs: (r) => Pf(r, e) }
      ],
      toDOM(r) {
        return ["th", zf(r, e), 0];
      }
    }
  };
}
function Ze(t) {
  let e = t.cached.tableNodeTypes;
  if (!e) {
    e = t.cached.tableNodeTypes = {};
    for (const n in t.nodes) {
      const r = t.nodes[n], i = r.spec.tableRole;
      i && (e[i] = r);
    }
  }
  return e;
}
var Jt = new he("selectingCells");
function Ei(t) {
  for (let e = t.depth - 1; e > 0; e--)
    if (t.node(e).type.spec.tableRole == "row")
      return t.node(0).resolve(t.before(e + 1));
  return null;
}
function et(t) {
  const e = t.selection.$head;
  for (let n = e.depth; n > 0; n--)
    if (e.node(n).type.spec.tableRole == "row") return !0;
  return !1;
}
function rs(t) {
  const e = t.selection;
  if ("$anchorCell" in e && e.$anchorCell)
    return e.$anchorCell.pos > e.$headCell.pos ? e.$anchorCell : e.$headCell;
  if ("node" in e && e.node && e.node.type.spec.tableRole == "cell")
    return e.$anchor;
  const n = Ei(e.$head) || PS(e.$head);
  if (n)
    return n;
  throw new RangeError(`No cell found around position ${e.head}`);
}
function PS(t) {
  for (let e = t.nodeAfter, n = t.pos; e; e = e.firstChild, n++) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell") return t.doc.resolve(n);
  }
  for (let e = t.nodeBefore, n = t.pos; e; e = e.lastChild, n--) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell")
      return t.doc.resolve(n - e.nodeSize);
  }
}
function Gl(t) {
  return t.parent.type.spec.tableRole == "row" && !!t.nodeAfter;
}
function zS(t) {
  return t.node(0).resolve(t.pos + t.nodeAfter.nodeSize);
}
function Ec(t, e) {
  return t.depth == e.depth && t.pos >= e.start(-1) && t.pos <= e.end(-1);
}
function mm(t, e, n) {
  const r = t.node(-1), i = ee.get(r), o = t.start(-1), s = i.nextCell(t.pos - o, e, n);
  return s == null ? null : t.node(0).resolve(o + s);
}
function $n(t, e, n = 1) {
  const r = { ...t, colspan: t.colspan - n };
  return r.colwidth && (r.colwidth = r.colwidth.slice(), r.colwidth.splice(e, n), r.colwidth.some((i) => i > 0) || (r.colwidth = null)), r;
}
function BS(t, e, n = 1) {
  const r = { ...t, colspan: t.colspan + n };
  if (r.colwidth) {
    r.colwidth = r.colwidth.slice();
    for (let i = 0; i < n; i++) r.colwidth.splice(e, 0, 0);
  }
  return r;
}
function FS(t, e, n) {
  const r = Ze(e.type.schema).header_cell;
  for (let i = 0; i < t.height; i++)
    if (e.nodeAt(t.map[n + i * t.width]).type != r)
      return !1;
  return !0;
}
var se = class At extends $ {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor(e, n = e) {
    const r = e.node(-1), i = ee.get(r), o = e.start(-1), s = i.rectBetween(
      e.pos - o,
      n.pos - o
    ), l = e.node(0), a = i.cellsInRect(s).filter((u) => u != n.pos - o);
    a.unshift(n.pos - o);
    const c = a.map((u) => {
      const f = r.nodeAt(u);
      if (!f)
        throw RangeError(`No cell with offset ${u} found`);
      const h = o + u + 1;
      return new Dd(
        l.resolve(h),
        l.resolve(h + f.content.size)
      );
    });
    super(c[0].$from, c[0].$to, c), this.$anchorCell = e, this.$headCell = n;
  }
  map(e, n) {
    const r = e.resolve(n.map(this.$anchorCell.pos)), i = e.resolve(n.map(this.$headCell.pos));
    if (Gl(r) && Gl(i) && Ec(r, i)) {
      const o = this.$anchorCell.node(-1) != r.node(-1);
      return o && this.isRowSelection() ? At.rowSelection(r, i) : o && this.isColSelection() ? At.colSelection(r, i) : new At(r, i);
    }
    return H.between(r, i);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const e = this.$anchorCell.node(-1), n = ee.get(e), r = this.$anchorCell.start(-1), i = n.rectBetween(
      this.$anchorCell.pos - r,
      this.$headCell.pos - r
    ), o = {}, s = [];
    for (let a = i.top; a < i.bottom; a++) {
      const c = [];
      for (let u = a * n.width + i.left, f = i.left; f < i.right; f++, u++) {
        const h = n.map[u];
        if (o[h]) continue;
        o[h] = !0;
        const d = n.findCell(h);
        let p = e.nodeAt(h);
        if (!p)
          throw RangeError(`No cell with offset ${h} found`);
        const m = i.left - d.left, y = d.right - i.right;
        if (m > 0 || y > 0) {
          let g = p.attrs;
          if (m > 0 && (g = $n(g, 0, m)), y > 0 && (g = $n(
            g,
            g.colspan - y,
            y
          )), d.left < i.left) {
            if (p = p.type.createAndFill(g), !p)
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(g)}`
              );
          } else
            p = p.type.create(g, p.content);
        }
        if (d.top < i.top || d.bottom > i.bottom) {
          const g = {
            ...p.attrs,
            rowspan: Math.min(d.bottom, i.bottom) - Math.max(d.top, i.top)
          };
          d.top < i.top ? p = p.type.createAndFill(g) : p = p.type.create(g, p.content);
        }
        c.push(p);
      }
      s.push(e.child(a).copy(N.from(c)));
    }
    const l = this.isColSelection() && this.isRowSelection() ? e : s;
    return new D(N.from(l), 1, 1);
  }
  replace(e, n = D.empty) {
    const r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      const { $from: l, $to: a } = i[s], c = e.mapping.slice(r);
      e.replace(
        c.map(l.pos),
        c.map(a.pos),
        s ? D.empty : n
      );
    }
    const o = $.findFrom(
      e.doc.resolve(e.mapping.slice(r).map(this.to)),
      -1
    );
    o && e.setSelection(o);
  }
  replaceWith(e, n) {
    this.replace(e, new D(N.from(n), 0, 0));
  }
  forEachCell(e) {
    const n = this.$anchorCell.node(-1), r = ee.get(n), i = this.$anchorCell.start(-1), o = r.cellsInRect(
      r.rectBetween(
        this.$anchorCell.pos - i,
        this.$headCell.pos - i
      )
    );
    for (let s = 0; s < o.length; s++)
      e(n.nodeAt(o[s]), i + o[s]);
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection() {
    const e = this.$anchorCell.index(-1), n = this.$headCell.index(-1);
    if (Math.min(e, n) > 0) return !1;
    const r = e + this.$anchorCell.nodeAfter.attrs.rowspan, i = n + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(r, i) == this.$headCell.node(-1).childCount;
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection(e, n = e) {
    const r = e.node(-1), i = ee.get(r), o = e.start(-1), s = i.findCell(e.pos - o), l = i.findCell(n.pos - o), a = e.node(0);
    return s.top <= l.top ? (s.top > 0 && (e = a.resolve(o + i.map[s.left])), l.bottom < i.height && (n = a.resolve(
      o + i.map[i.width * (i.height - 1) + l.right - 1]
    ))) : (l.top > 0 && (n = a.resolve(o + i.map[l.left])), s.bottom < i.height && (e = a.resolve(
      o + i.map[i.width * (i.height - 1) + s.right - 1]
    ))), new At(e, n);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const e = this.$anchorCell.node(-1), n = ee.get(e), r = this.$anchorCell.start(-1), i = n.colCount(this.$anchorCell.pos - r), o = n.colCount(this.$headCell.pos - r);
    if (Math.min(i, o) > 0) return !1;
    const s = i + this.$anchorCell.nodeAfter.attrs.colspan, l = o + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(s, l) == n.width;
  }
  eq(e) {
    return e instanceof At && e.$anchorCell.pos == this.$anchorCell.pos && e.$headCell.pos == this.$headCell.pos;
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection(e, n = e) {
    const r = e.node(-1), i = ee.get(r), o = e.start(-1), s = i.findCell(e.pos - o), l = i.findCell(n.pos - o), a = e.node(0);
    return s.left <= l.left ? (s.left > 0 && (e = a.resolve(
      o + i.map[s.top * i.width]
    )), l.right < i.width && (n = a.resolve(
      o + i.map[i.width * (l.top + 1) - 1]
    ))) : (l.left > 0 && (n = a.resolve(o + i.map[l.top * i.width])), s.right < i.width && (e = a.resolve(
      o + i.map[i.width * (s.top + 1) - 1]
    ))), new At(e, n);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(e, n) {
    return new At(e.resolve(n.anchor), e.resolve(n.head));
  }
  static create(e, n, r = n) {
    return new At(e.resolve(n), e.resolve(r));
  }
  getBookmark() {
    return new _S(this.$anchorCell.pos, this.$headCell.pos);
  }
};
se.prototype.visible = !1;
$.jsonID("cell", se);
var _S = class gm {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new gm(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    const n = e.resolve(this.anchor), r = e.resolve(this.head);
    return n.parent.type.spec.tableRole == "row" && r.parent.type.spec.tableRole == "row" && n.index() < n.parent.childCount && r.index() < r.parent.childCount && Ec(n, r) ? new se(n, r) : $.near(r, 1);
  }
};
function $S(t) {
  if (!(t.selection instanceof se)) return null;
  const e = [];
  return t.selection.forEachCell((n, r) => {
    e.push(
      Ce.node(r, r + n.nodeSize, { class: "selectedCell" })
    );
  }), le.create(t.doc, e);
}
function VS({ $from: t, $to: e }) {
  if (t.pos == e.pos || t.pos < e.pos - 6) return !1;
  let n = t.pos, r = e.pos, i = t.depth;
  for (; i >= 0 && !(t.after(i + 1) < t.end(i)); i--, n++)
    ;
  for (let o = e.depth; o >= 0 && !(e.before(o + 1) > e.start(o)); o--, r--)
    ;
  return n == r && /row|table/.test(t.node(i).type.spec.tableRole);
}
function HS({ $from: t, $to: e }) {
  let n, r;
  for (let i = t.depth; i > 0; i--) {
    const o = t.node(i);
    if (o.type.spec.tableRole === "cell" || o.type.spec.tableRole === "header_cell") {
      n = o;
      break;
    }
  }
  for (let i = e.depth; i > 0; i--) {
    const o = e.node(i);
    if (o.type.spec.tableRole === "cell" || o.type.spec.tableRole === "header_cell") {
      r = o;
      break;
    }
  }
  return n !== r && e.parentOffset === 0;
}
function WS(t, e, n) {
  const r = (e || t).selection, i = (e || t).doc;
  let o, s;
  if (r instanceof _ && (s = r.node.type.spec.tableRole)) {
    if (s == "cell" || s == "header_cell")
      o = se.create(i, r.from);
    else if (s == "row") {
      const l = i.resolve(r.from + 1);
      o = se.rowSelection(l, l);
    } else if (!n) {
      const l = ee.get(r.node), a = r.from + 1, c = a + l.map[l.width * l.height - 1];
      o = se.create(i, a + 1, c);
    }
  } else r instanceof H && VS(r) ? o = H.create(i, r.from) : r instanceof H && HS(r) && (o = H.create(i, r.$from.start(), r.$from.end()));
  return o && (e || (e = t.tr)).setSelection(o), e;
}
var jS = new he("fix-tables");
function ym(t, e, n, r) {
  const i = t.childCount, o = e.childCount;
  e: for (let s = 0, l = 0; s < o; s++) {
    const a = e.child(s);
    for (let c = l, u = Math.min(i, s + 3); c < u; c++)
      if (t.child(c) == a) {
        l = c + 1, n += a.nodeSize;
        continue e;
      }
    r(a, n), l < i && t.child(l).sameMarkup(a) ? ym(t.child(l), a, n + 1, r) : a.nodesBetween(0, a.content.size, r, n + 1), n += a.nodeSize;
  }
}
function qS(t, e) {
  let n;
  const r = (i, o) => {
    i.type.spec.tableRole == "table" && (n = KS(t, i, o, n));
  };
  return e ? e.doc != t.doc && ym(e.doc, t.doc, 0, r) : t.doc.descendants(r), n;
}
function KS(t, e, n, r) {
  const i = ee.get(e);
  if (!i.problems) return r;
  r || (r = t.tr);
  const o = [];
  for (let a = 0; a < i.height; a++) o.push(0);
  for (let a = 0; a < i.problems.length; a++) {
    const c = i.problems[a];
    if (c.type == "collision") {
      const u = e.nodeAt(c.pos);
      if (!u) continue;
      const f = u.attrs;
      for (let h = 0; h < f.rowspan; h++) o[c.row + h] += c.n;
      r.setNodeMarkup(
        r.mapping.map(n + 1 + c.pos),
        null,
        $n(f, f.colspan - c.n, c.n)
      );
    } else if (c.type == "missing")
      o[c.row] += c.n;
    else if (c.type == "overlong_rowspan") {
      const u = e.nodeAt(c.pos);
      if (!u) continue;
      r.setNodeMarkup(r.mapping.map(n + 1 + c.pos), null, {
        ...u.attrs,
        rowspan: u.attrs.rowspan - c.n
      });
    } else if (c.type == "colwidth mismatch") {
      const u = e.nodeAt(c.pos);
      if (!u) continue;
      r.setNodeMarkup(r.mapping.map(n + 1 + c.pos), null, {
        ...u.attrs,
        colwidth: c.colwidth
      });
    } else if (c.type == "zero_sized") {
      const u = r.mapping.map(n);
      r.delete(u, u + e.nodeSize);
    }
  }
  let s, l;
  for (let a = 0; a < o.length; a++)
    o[a] && (s == null && (s = a), l = a);
  for (let a = 0, c = n + 1; a < i.height; a++) {
    const u = e.child(a), f = c + u.nodeSize, h = o[a];
    if (h > 0) {
      let d = "cell";
      u.firstChild && (d = u.firstChild.type.spec.tableRole);
      const p = [];
      for (let y = 0; y < h; y++) {
        const g = Ze(t.schema)[d].createAndFill();
        g && p.push(g);
      }
      const m = (a == 0 || s == a - 1) && l == a ? c + 1 : f - 1;
      r.insert(r.mapping.map(m), p);
    }
    c = f;
  }
  return r.setMeta(jS, { fixTables: !0 });
}
function dn(t) {
  const e = t.selection, n = rs(t), r = n.node(-1), i = n.start(-1), o = ee.get(r);
  return { ...e instanceof se ? o.rectBetween(
    e.$anchorCell.pos - i,
    e.$headCell.pos - i
  ) : o.findCell(n.pos - i), tableStart: i, map: o, table: r };
}
function km(t, { map: e, tableStart: n, table: r }, i) {
  let o = i > 0 ? -1 : 0;
  FS(e, r, i + o) && (o = i == 0 || i == e.width ? null : 0);
  for (let s = 0; s < e.height; s++) {
    const l = s * e.width + i;
    if (i > 0 && i < e.width && e.map[l - 1] == e.map[l]) {
      const a = e.map[l], c = r.nodeAt(a);
      t.setNodeMarkup(
        t.mapping.map(n + a),
        null,
        BS(c.attrs, i - e.colCount(a))
      ), s += c.attrs.rowspan - 1;
    } else {
      const a = o == null ? Ze(r.type.schema).cell : r.nodeAt(e.map[l + o]).type, c = e.positionAt(s, i, r);
      t.insert(t.mapping.map(n + c), a.createAndFill());
    }
  }
  return t;
}
function US(t, e) {
  if (!et(t)) return !1;
  if (e) {
    const n = dn(t);
    e(km(t.tr, n, n.left));
  }
  return !0;
}
function JS(t, e) {
  if (!et(t)) return !1;
  if (e) {
    const n = dn(t);
    e(km(t.tr, n, n.right));
  }
  return !0;
}
function GS(t, { map: e, table: n, tableStart: r }, i) {
  const o = t.mapping.maps.length;
  for (let s = 0; s < e.height; ) {
    const l = s * e.width + i, a = e.map[l], c = n.nodeAt(a), u = c.attrs;
    if (i > 0 && e.map[l - 1] == a || i < e.width - 1 && e.map[l + 1] == a)
      t.setNodeMarkup(
        t.mapping.slice(o).map(r + a),
        null,
        $n(u, i - e.colCount(a))
      );
    else {
      const f = t.mapping.slice(o).map(r + a);
      t.delete(f, f + c.nodeSize);
    }
    s += u.rowspan;
  }
}
function YS(t, e) {
  if (!et(t)) return !1;
  if (e) {
    const n = dn(t), r = t.tr;
    if (n.left == 0 && n.right == n.map.width) return !1;
    for (let i = n.right - 1; GS(r, n, i), i != n.left; i--) {
      const o = n.tableStart ? r.doc.nodeAt(n.tableStart - 1) : r.doc;
      if (!o)
        throw RangeError("No table found");
      n.table = o, n.map = ee.get(o);
    }
    e(r);
  }
  return !0;
}
function QS(t, { map: e, table: n, tableStart: r }, i) {
  let o = 0;
  for (let c = 0; c < i; c++) o += n.child(c).nodeSize;
  const s = o + n.child(i).nodeSize, l = t.mapping.maps.length;
  t.delete(o + r, s + r);
  const a = /* @__PURE__ */ new Set();
  for (let c = 0, u = i * e.width; c < e.width; c++, u++) {
    const f = e.map[u];
    if (!a.has(f)) {
      if (a.add(f), i > 0 && f == e.map[u - e.width]) {
        const h = n.nodeAt(f).attrs;
        t.setNodeMarkup(t.mapping.slice(l).map(f + r), null, {
          ...h,
          rowspan: h.rowspan - 1
        }), c += h.colspan - 1;
      } else if (i < e.height && f == e.map[u + e.width]) {
        const h = n.nodeAt(f), d = h.attrs, p = h.type.create(
          { ...d, rowspan: h.attrs.rowspan - 1 },
          h.content
        ), m = e.positionAt(i + 1, c, n);
        t.insert(t.mapping.slice(l).map(r + m), p), c += d.colspan - 1;
      }
    }
  }
}
function XS(t, e) {
  if (!et(t)) return !1;
  if (e) {
    const n = dn(t), r = t.tr;
    if (n.top == 0 && n.bottom == n.map.height) return !1;
    for (let i = n.bottom - 1; QS(r, n, i), i != n.top; i--) {
      const o = n.tableStart ? r.doc.nodeAt(n.tableStart - 1) : r.doc;
      if (!o)
        throw RangeError("No table found");
      n.table = o, n.map = ee.get(n.table);
    }
    e(r);
  }
  return !0;
}
function ZS(t, e) {
  return function(n, r) {
    if (!et(n)) return !1;
    const i = rs(n);
    if (i.nodeAfter.attrs[t] === e) return !1;
    if (r) {
      const o = n.tr;
      n.selection instanceof se ? n.selection.forEachCell((s, l) => {
        s.attrs[t] !== e && o.setNodeMarkup(l, null, {
          ...s.attrs,
          [t]: e
        });
      }) : o.setNodeMarkup(i.pos, null, {
        ...i.nodeAfter.attrs,
        [t]: e
      }), r(o);
    }
    return !0;
  };
}
function eM(t) {
  return function(e, n) {
    if (!et(e)) return !1;
    if (n) {
      const r = Ze(e.schema), i = dn(e), o = e.tr, s = i.map.cellsInRect(
        t == "column" ? {
          left: i.left,
          top: 0,
          right: i.right,
          bottom: i.map.height
        } : t == "row" ? {
          left: 0,
          top: i.top,
          right: i.map.width,
          bottom: i.bottom
        } : i
      ), l = s.map((a) => i.table.nodeAt(a));
      for (let a = 0; a < s.length; a++)
        l[a].type == r.header_cell && o.setNodeMarkup(
          i.tableStart + s[a],
          r.cell,
          l[a].attrs
        );
      if (o.steps.length == 0)
        for (let a = 0; a < s.length; a++)
          o.setNodeMarkup(
            i.tableStart + s[a],
            r.header_cell,
            l[a].attrs
          );
      n(o);
    }
    return !0;
  };
}
function Bf(t, e, n) {
  const r = e.map.cellsInRect({
    left: 0,
    top: 0,
    right: t == "row" ? e.map.width : 1,
    bottom: t == "column" ? e.map.height : 1
  });
  for (let i = 0; i < r.length; i++) {
    const o = e.table.nodeAt(r[i]);
    if (o && o.type !== n.header_cell)
      return !1;
  }
  return !0;
}
function Oc(t, e) {
  return e = e || { useDeprecatedLogic: !1 }, e.useDeprecatedLogic ? eM(t) : function(n, r) {
    if (!et(n)) return !1;
    if (r) {
      const i = Ze(n.schema), o = dn(n), s = n.tr, l = Bf("row", o, i), a = Bf(
        "column",
        o,
        i
      ), u = (t === "column" ? l : t === "row" ? a : !1) ? 1 : 0, f = t == "column" ? {
        left: 0,
        top: u,
        right: 1,
        bottom: o.map.height
      } : t == "row" ? {
        left: u,
        top: 0,
        right: o.map.width,
        bottom: 1
      } : o, h = t == "column" ? a ? i.cell : i.header_cell : t == "row" ? l ? i.cell : i.header_cell : i.cell;
      o.map.cellsInRect(f).forEach((d) => {
        const p = d + o.tableStart, m = s.doc.nodeAt(p);
        m && s.setNodeMarkup(p, h, m.attrs);
      }), r(s);
    }
    return !0;
  };
}
Oc("row", {
  useDeprecatedLogic: !0
});
Oc("column", {
  useDeprecatedLogic: !0
});
Oc("cell", {
  useDeprecatedLogic: !0
});
function tM(t, e) {
  if (e < 0) {
    const n = t.nodeBefore;
    if (n) return t.pos - n.nodeSize;
    for (let r = t.index(-1) - 1, i = t.before(); r >= 0; r--) {
      const o = t.node(-1).child(r), s = o.lastChild;
      if (s)
        return i - 1 - s.nodeSize;
      i -= o.nodeSize;
    }
  } else {
    if (t.index() < t.parent.childCount - 1)
      return t.pos + t.nodeAfter.nodeSize;
    const n = t.node(-1);
    for (let r = t.indexAfter(-1), i = t.after(); r < n.childCount; r++) {
      const o = n.child(r);
      if (o.childCount) return i + 1;
      i += o.nodeSize;
    }
  }
  return null;
}
function bm(t) {
  return function(e, n) {
    if (!et(e)) return !1;
    const r = tM(rs(e), t);
    if (r == null) return !1;
    if (n) {
      const i = e.doc.resolve(r);
      n(
        e.tr.setSelection(H.between(i, zS(i))).scrollIntoView()
      );
    }
    return !0;
  };
}
function nM(t, e) {
  const n = t.selection.$anchor;
  for (let r = n.depth; r > 0; r--)
    if (n.node(r).type.spec.tableRole == "table")
      return e && e(
        t.tr.delete(n.before(r), n.after(r)).scrollIntoView()
      ), !0;
  return !1;
}
function Vi(t, e) {
  const n = t.selection;
  if (!(n instanceof se)) return !1;
  if (e) {
    const r = t.tr, i = Ze(t.schema).cell.createAndFill().content;
    n.forEachCell((o, s) => {
      o.content.eq(i) || r.replace(
        r.mapping.map(s + 1),
        r.mapping.map(s + o.nodeSize - 1),
        new D(i, 0, 0)
      );
    }), r.docChanged && e(r);
  }
  return !0;
}
function rM(t) {
  if (!t.size) return null;
  let { content: e, openStart: n, openEnd: r } = t;
  for (; e.childCount == 1 && (n > 0 && r > 0 || e.child(0).type.spec.tableRole == "table"); )
    n--, r--, e = e.child(0).content;
  const i = e.child(0), o = i.type.spec.tableRole, s = i.type.schema, l = [];
  if (o == "row")
    for (let a = 0; a < e.childCount; a++) {
      let c = e.child(a).content;
      const u = a ? 0 : Math.max(0, n - 1), f = a < e.childCount - 1 ? 0 : Math.max(0, r - 1);
      (u || f) && (c = Yl(
        Ze(s).row,
        new D(c, u, f)
      ).content), l.push(c);
    }
  else if (o == "cell" || o == "header_cell")
    l.push(
      n || r ? Yl(
        Ze(s).row,
        new D(e, n, r)
      ).content : e
    );
  else
    return null;
  return iM(s, l);
}
function iM(t, e) {
  const n = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    for (let s = o.childCount - 1; s >= 0; s--) {
      const { rowspan: l, colspan: a } = o.child(s).attrs;
      for (let c = i; c < i + l; c++)
        n[c] = (n[c] || 0) + a;
    }
  }
  let r = 0;
  for (let i = 0; i < n.length; i++) r = Math.max(r, n[i]);
  for (let i = 0; i < n.length; i++)
    if (i >= e.length && e.push(N.empty), n[i] < r) {
      const o = Ze(t).cell.createAndFill(), s = [];
      for (let l = n[i]; l < r; l++)
        s.push(o);
      e[i] = e[i].append(N.from(s));
    }
  return { height: e.length, width: r, rows: e };
}
function Yl(t, e) {
  const n = t.createAndFill();
  return new Od(n).replace(0, n.content.size, e).doc;
}
function oM({ width: t, height: e, rows: n }, r, i) {
  if (t != r) {
    const o = [], s = [];
    for (let l = 0; l < n.length; l++) {
      const a = n[l], c = [];
      for (let u = o[l] || 0, f = 0; u < r; f++) {
        let h = a.child(f % a.childCount);
        u + h.attrs.colspan > r && (h = h.type.createChecked(
          $n(
            h.attrs,
            h.attrs.colspan,
            u + h.attrs.colspan - r
          ),
          h.content
        )), c.push(h), u += h.attrs.colspan;
        for (let d = 1; d < h.attrs.rowspan; d++)
          o[l + d] = (o[l + d] || 0) + h.attrs.colspan;
      }
      s.push(N.from(c));
    }
    n = s, t = r;
  }
  if (e != i) {
    const o = [];
    for (let s = 0, l = 0; s < i; s++, l++) {
      const a = [], c = n[l % e];
      for (let u = 0; u < c.childCount; u++) {
        let f = c.child(u);
        s + f.attrs.rowspan > i && (f = f.type.create(
          {
            ...f.attrs,
            rowspan: Math.max(1, i - f.attrs.rowspan)
          },
          f.content
        )), a.push(f);
      }
      o.push(N.from(a));
    }
    n = o, e = i;
  }
  return { width: t, height: e, rows: n };
}
function sM(t, e, n, r, i, o, s) {
  const l = t.doc.type.schema, a = Ze(l);
  let c, u;
  if (i > e.width)
    for (let f = 0, h = 0; f < e.height; f++) {
      const d = n.child(f);
      h += d.nodeSize;
      const p = [];
      let m;
      d.lastChild == null || d.lastChild.type == a.cell ? m = c || (c = a.cell.createAndFill()) : m = u || (u = a.header_cell.createAndFill());
      for (let y = e.width; y < i; y++) p.push(m);
      t.insert(t.mapping.slice(s).map(h - 1 + r), p);
    }
  if (o > e.height) {
    const f = [];
    for (let p = 0, m = (e.height - 1) * e.width; p < Math.max(e.width, i); p++) {
      const y = p >= e.width ? !1 : n.nodeAt(e.map[m + p]).type == a.header_cell;
      f.push(
        y ? u || (u = a.header_cell.createAndFill()) : c || (c = a.cell.createAndFill())
      );
    }
    const h = a.row.create(null, N.from(f)), d = [];
    for (let p = e.height; p < o; p++) d.push(h);
    t.insert(t.mapping.slice(s).map(r + n.nodeSize - 2), d);
  }
  return !!(c || u);
}
function Ff(t, e, n, r, i, o, s, l) {
  if (s == 0 || s == e.height) return !1;
  let a = !1;
  for (let c = i; c < o; c++) {
    const u = s * e.width + c, f = e.map[u];
    if (e.map[u - e.width] == f) {
      a = !0;
      const h = n.nodeAt(f), { top: d, left: p } = e.findCell(f);
      t.setNodeMarkup(t.mapping.slice(l).map(f + r), null, {
        ...h.attrs,
        rowspan: s - d
      }), t.insert(
        t.mapping.slice(l).map(e.positionAt(s, p, n)),
        h.type.createAndFill({
          ...h.attrs,
          rowspan: d + h.attrs.rowspan - s
        })
      ), c += h.attrs.colspan - 1;
    }
  }
  return a;
}
function _f(t, e, n, r, i, o, s, l) {
  if (s == 0 || s == e.width) return !1;
  let a = !1;
  for (let c = i; c < o; c++) {
    const u = c * e.width + s, f = e.map[u];
    if (e.map[u - 1] == f) {
      a = !0;
      const h = n.nodeAt(f), d = e.colCount(f), p = t.mapping.slice(l).map(f + r);
      t.setNodeMarkup(
        p,
        null,
        $n(
          h.attrs,
          s - d,
          h.attrs.colspan - (s - d)
        )
      ), t.insert(
        p + h.nodeSize,
        h.type.createAndFill(
          $n(h.attrs, 0, s - d)
        )
      ), c += h.attrs.rowspan - 1;
    }
  }
  return a;
}
function $f(t, e, n, r, i) {
  let o = n ? t.doc.nodeAt(n - 1) : t.doc;
  if (!o)
    throw new Error("No table found");
  let s = ee.get(o);
  const { top: l, left: a } = r, c = a + i.width, u = l + i.height, f = t.tr;
  let h = 0;
  function d() {
    if (o = n ? f.doc.nodeAt(n - 1) : f.doc, !o)
      throw new Error("No table found");
    s = ee.get(o), h = f.mapping.maps.length;
  }
  sM(f, s, o, n, c, u, h) && d(), Ff(f, s, o, n, a, c, l, h) && d(), Ff(f, s, o, n, a, c, u, h) && d(), _f(f, s, o, n, l, u, a, h) && d(), _f(f, s, o, n, l, u, c, h) && d();
  for (let p = l; p < u; p++) {
    const m = s.positionAt(p, a, o), y = s.positionAt(p, c, o);
    f.replace(
      f.mapping.slice(h).map(m + n),
      f.mapping.slice(h).map(y + n),
      new D(i.rows[p - l], 0, 0)
    );
  }
  d(), f.setSelection(
    new se(
      f.doc.resolve(n + s.positionAt(l, a, o)),
      f.doc.resolve(n + s.positionAt(u - 1, c - 1, o))
    )
  ), e(f);
}
var lM = qd({
  ArrowLeft: Hi("horiz", -1),
  ArrowRight: Hi("horiz", 1),
  ArrowUp: Hi("vert", -1),
  ArrowDown: Hi("vert", 1),
  "Shift-ArrowLeft": Wi("horiz", -1),
  "Shift-ArrowRight": Wi("horiz", 1),
  "Shift-ArrowUp": Wi("vert", -1),
  "Shift-ArrowDown": Wi("vert", 1),
  Backspace: Vi,
  "Mod-Backspace": Vi,
  Delete: Vi,
  "Mod-Delete": Vi
});
function uo(t, e, n) {
  return n.eq(t.selection) ? !1 : (e && e(t.tr.setSelection(n).scrollIntoView()), !0);
}
function Hi(t, e) {
  return (n, r, i) => {
    if (!i) return !1;
    const o = n.selection;
    if (o instanceof se)
      return uo(
        n,
        r,
        $.near(o.$headCell, e)
      );
    if (t != "horiz" && !o.empty) return !1;
    const s = wm(i, t, e);
    if (s == null) return !1;
    if (t == "horiz")
      return uo(
        n,
        r,
        $.near(n.doc.resolve(o.head + e), e)
      );
    {
      const l = n.doc.resolve(s), a = mm(l, t, e);
      let c;
      return a ? c = $.near(a, 1) : e < 0 ? c = $.near(n.doc.resolve(l.before(-1)), -1) : c = $.near(n.doc.resolve(l.after(-1)), 1), uo(n, r, c);
    }
  };
}
function Wi(t, e) {
  return (n, r, i) => {
    if (!i) return !1;
    const o = n.selection;
    let s;
    if (o instanceof se)
      s = o;
    else {
      const a = wm(i, t, e);
      if (a == null) return !1;
      s = new se(n.doc.resolve(a));
    }
    const l = mm(s.$headCell, t, e);
    return l ? uo(
      n,
      r,
      new se(s.$anchorCell, l)
    ) : !1;
  };
}
function aM(t, e) {
  const n = t.state.doc, r = Ei(n.resolve(e));
  return r ? (t.dispatch(t.state.tr.setSelection(new se(r))), !0) : !1;
}
function cM(t, e, n) {
  if (!et(t.state)) return !1;
  let r = rM(n);
  const i = t.state.selection;
  if (i instanceof se) {
    r || (r = {
      width: 1,
      height: 1,
      rows: [
        N.from(
          Yl(Ze(t.state.schema).cell, n)
        )
      ]
    });
    const o = i.$anchorCell.node(-1), s = i.$anchorCell.start(-1), l = ee.get(o).rectBetween(
      i.$anchorCell.pos - s,
      i.$headCell.pos - s
    );
    return r = oM(r, l.right - l.left, l.bottom - l.top), $f(t.state, t.dispatch, s, l, r), !0;
  } else if (r) {
    const o = rs(t.state), s = o.start(-1);
    return $f(
      t.state,
      t.dispatch,
      s,
      ee.get(o.node(-1)).findCell(o.pos - s),
      r
    ), !0;
  } else
    return !1;
}
function uM(t, e) {
  var n;
  if (e.ctrlKey || e.metaKey) return;
  const r = Vf(t, e.target);
  let i;
  if (e.shiftKey && t.state.selection instanceof se)
    o(t.state.selection.$anchorCell, e), e.preventDefault();
  else if (e.shiftKey && r && (i = Ei(t.state.selection.$anchor)) != null && ((n = tl(t, e)) == null ? void 0 : n.pos) != i.pos)
    o(i, e), e.preventDefault();
  else if (!r)
    return;
  function o(a, c) {
    let u = tl(t, c);
    const f = Jt.getState(t.state) == null;
    if (!u || !Ec(a, u))
      if (f) u = a;
      else return;
    const h = new se(a, u);
    if (f || !t.state.selection.eq(h)) {
      const d = t.state.tr.setSelection(h);
      f && d.setMeta(Jt, a.pos), t.dispatch(d);
    }
  }
  function s() {
    t.root.removeEventListener("mouseup", s), t.root.removeEventListener("dragstart", s), t.root.removeEventListener("mousemove", l), Jt.getState(t.state) != null && t.dispatch(t.state.tr.setMeta(Jt, -1));
  }
  function l(a) {
    const c = a, u = Jt.getState(t.state);
    let f;
    if (u != null)
      f = t.state.doc.resolve(u);
    else if (Vf(t, c.target) != r && (f = tl(t, e), !f))
      return s();
    f && o(f, c);
  }
  t.root.addEventListener("mouseup", s), t.root.addEventListener("dragstart", s), t.root.addEventListener("mousemove", l);
}
function wm(t, e, n) {
  if (!(t.state.selection instanceof H)) return null;
  const { $head: r } = t.state.selection;
  for (let i = r.depth - 1; i >= 0; i--) {
    const o = r.node(i);
    if ((n < 0 ? r.index(i) : r.indexAfter(i)) != (n < 0 ? 0 : o.childCount)) return null;
    if (o.type.spec.tableRole == "cell" || o.type.spec.tableRole == "header_cell") {
      const l = r.before(i), a = e == "vert" ? n > 0 ? "down" : "up" : n > 0 ? "right" : "left";
      return t.endOfTextblock(a) ? l : null;
    }
  }
  return null;
}
function Vf(t, e) {
  for (; e && e != t.dom; e = e.parentNode)
    if (e.nodeName == "TD" || e.nodeName == "TH")
      return e;
  return null;
}
function tl(t, e) {
  const n = t.posAtCoords({
    left: e.clientX,
    top: e.clientY
  });
  return n && n ? Ei(t.state.doc.resolve(n.pos)) : null;
}
var fM = class {
  constructor(t, e) {
    this.node = t, this.defaultCellMinWidth = e, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.table.style.setProperty(
      "--default-cell-min-width",
      `${e}px`
    ), this.colgroup = this.table.appendChild(document.createElement("colgroup")), Ql(t, this.colgroup, this.table, e), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(t) {
    return t.type != this.node.type ? !1 : (this.node = t, Ql(
      t,
      this.colgroup,
      this.table,
      this.defaultCellMinWidth
    ), !0);
  }
  ignoreMutation(t) {
    return t.type == "attributes" && (t.target == this.table || this.colgroup.contains(t.target));
  }
};
function Ql(t, e, n, r, i, o) {
  var s;
  let l = 0, a = !0, c = e.firstChild;
  const u = t.firstChild;
  if (u) {
    for (let f = 0, h = 0; f < u.childCount; f++) {
      const { colspan: d, colwidth: p } = u.child(f).attrs;
      for (let m = 0; m < d; m++, h++) {
        const y = i == h ? o : p && p[m], g = y ? y + "px" : "";
        if (l += y || r, y || (a = !1), c)
          c.style.width != g && (c.style.width = g), c = c.nextSibling;
        else {
          const S = document.createElement("col");
          S.style.width = g, e.appendChild(S);
        }
      }
    }
    for (; c; ) {
      const f = c.nextSibling;
      (s = c.parentNode) == null || s.removeChild(c), c = f;
    }
    a ? (n.style.width = l + "px", n.style.minWidth = "") : (n.style.width = "", n.style.minWidth = l + "px");
  }
}
var Ve = new he(
  "tableColumnResizing"
);
function hM({
  handleWidth: t = 5,
  cellMinWidth: e = 25,
  defaultCellMinWidth: n = 100,
  View: r = fM,
  lastColumnResizable: i = !0
} = {}) {
  const o = new ye({
    key: Ve,
    state: {
      init(s, l) {
        var a, c;
        const u = (c = (a = o.spec) == null ? void 0 : a.props) == null ? void 0 : c.nodeViews, f = Ze(l.schema).table.name;
        return r && u && (u[f] = (h, d) => new r(h, n, d)), new dM(-1, !1);
      },
      apply(s, l) {
        return l.apply(s);
      }
    },
    props: {
      attributes: (s) => {
        const l = Ve.getState(s);
        return l && l.activeHandle > -1 ? { class: "resize-cursor" } : {};
      },
      handleDOMEvents: {
        mousemove: (s, l) => {
          pM(s, l, t, i);
        },
        mouseleave: (s) => {
          mM(s);
        },
        mousedown: (s, l) => {
          gM(s, l, e, n);
        }
      },
      decorations: (s) => {
        const l = Ve.getState(s);
        if (l && l.activeHandle > -1)
          return xM(s, l.activeHandle);
      },
      nodeViews: {}
    }
  });
  return o;
}
var dM = class fo {
  constructor(e, n) {
    this.activeHandle = e, this.dragging = n;
  }
  apply(e) {
    const n = this, r = e.getMeta(Ve);
    if (r && r.setHandle != null)
      return new fo(r.setHandle, !1);
    if (r && r.setDragging !== void 0)
      return new fo(n.activeHandle, r.setDragging);
    if (n.activeHandle > -1 && e.docChanged) {
      let i = e.mapping.map(n.activeHandle, -1);
      return Gl(e.doc.resolve(i)) || (i = -1), new fo(i, n.dragging);
    }
    return n;
  }
};
function pM(t, e, n, r) {
  if (!t.editable) return;
  const i = Ve.getState(t.state);
  if (i && !i.dragging) {
    const o = kM(e.target);
    let s = -1;
    if (o) {
      const { left: l, right: a } = o.getBoundingClientRect();
      e.clientX - l <= n ? s = Hf(t, e, "left", n) : a - e.clientX <= n && (s = Hf(t, e, "right", n));
    }
    if (s != i.activeHandle) {
      if (!r && s !== -1) {
        const l = t.state.doc.resolve(s), a = l.node(-1), c = ee.get(a), u = l.start(-1);
        if (c.colCount(l.pos - u) + l.nodeAfter.attrs.colspan - 1 == c.width - 1)
          return;
      }
      xm(t, s);
    }
  }
}
function mM(t) {
  if (!t.editable) return;
  const e = Ve.getState(t.state);
  e && e.activeHandle > -1 && !e.dragging && xm(t, -1);
}
function gM(t, e, n, r) {
  var i;
  if (!t.editable) return !1;
  const o = (i = t.dom.ownerDocument.defaultView) != null ? i : window, s = Ve.getState(t.state);
  if (!s || s.activeHandle == -1 || s.dragging)
    return !1;
  const l = t.state.doc.nodeAt(s.activeHandle), a = yM(t, s.activeHandle, l.attrs);
  t.dispatch(
    t.state.tr.setMeta(Ve, {
      setDragging: { startX: e.clientX, startWidth: a }
    })
  );
  function c(f) {
    o.removeEventListener("mouseup", c), o.removeEventListener("mousemove", u);
    const h = Ve.getState(t.state);
    h?.dragging && (bM(
      t,
      h.activeHandle,
      Wf(h.dragging, f, n)
    ), t.dispatch(
      t.state.tr.setMeta(Ve, { setDragging: null })
    ));
  }
  function u(f) {
    if (!f.which) return c(f);
    const h = Ve.getState(t.state);
    if (h && h.dragging) {
      const d = Wf(h.dragging, f, n);
      jf(
        t,
        h.activeHandle,
        d,
        r
      );
    }
  }
  return jf(
    t,
    s.activeHandle,
    a,
    r
  ), o.addEventListener("mouseup", c), o.addEventListener("mousemove", u), e.preventDefault(), !0;
}
function yM(t, e, { colspan: n, colwidth: r }) {
  const i = r && r[r.length - 1];
  if (i) return i;
  const o = t.domAtPos(e);
  let l = o.node.childNodes[o.offset].offsetWidth, a = n;
  if (r)
    for (let c = 0; c < n; c++)
      r[c] && (l -= r[c], a--);
  return l / a;
}
function kM(t) {
  for (; t && t.nodeName != "TD" && t.nodeName != "TH"; )
    t = t.classList && t.classList.contains("ProseMirror") ? null : t.parentNode;
  return t;
}
function Hf(t, e, n, r) {
  const i = n == "right" ? -r : r, o = t.posAtCoords({
    left: e.clientX + i,
    top: e.clientY
  });
  if (!o) return -1;
  const { pos: s } = o, l = Ei(t.state.doc.resolve(s));
  if (!l) return -1;
  if (n == "right") return l.pos;
  const a = ee.get(l.node(-1)), c = l.start(-1), u = a.map.indexOf(l.pos - c);
  return u % a.width == 0 ? -1 : c + a.map[u - 1];
}
function Wf(t, e, n) {
  const r = e.clientX - t.startX;
  return Math.max(n, t.startWidth + r);
}
function xm(t, e) {
  t.dispatch(
    t.state.tr.setMeta(Ve, { setHandle: e })
  );
}
function bM(t, e, n) {
  const r = t.state.doc.resolve(e), i = r.node(-1), o = ee.get(i), s = r.start(-1), l = o.colCount(r.pos - s) + r.nodeAfter.attrs.colspan - 1, a = t.state.tr;
  for (let c = 0; c < o.height; c++) {
    const u = c * o.width + l;
    if (c && o.map[u] == o.map[u - o.width]) continue;
    const f = o.map[u], h = i.nodeAt(f).attrs, d = h.colspan == 1 ? 0 : l - o.colCount(f);
    if (h.colwidth && h.colwidth[d] == n) continue;
    const p = h.colwidth ? h.colwidth.slice() : wM(h.colspan);
    p[d] = n, a.setNodeMarkup(s + f, null, { ...h, colwidth: p });
  }
  a.docChanged && t.dispatch(a);
}
function jf(t, e, n, r) {
  const i = t.state.doc.resolve(e), o = i.node(-1), s = i.start(-1), l = ee.get(o).colCount(i.pos - s) + i.nodeAfter.attrs.colspan - 1;
  let a = t.domAtPos(i.start(-1)).node;
  for (; a && a.nodeName != "TABLE"; )
    a = a.parentNode;
  a && Ql(
    o,
    a.firstChild,
    a,
    r,
    l,
    n
  );
}
function wM(t) {
  return Array(t).fill(0);
}
function xM(t, e) {
  var n;
  const r = [], i = t.doc.resolve(e), o = i.node(-1);
  if (!o)
    return le.empty;
  const s = ee.get(o), l = i.start(-1), a = s.colCount(i.pos - l) + i.nodeAfter.attrs.colspan - 1;
  for (let c = 0; c < s.height; c++) {
    const u = a + c * s.width;
    if ((a == s.width - 1 || s.map[u] != s.map[u + 1]) && (c == 0 || s.map[u] != s.map[u - s.width])) {
      const f = s.map[u], h = l + f + o.nodeAt(f).nodeSize - 1, d = document.createElement("div");
      d.className = "column-resize-handle", (n = Ve.getState(t)) != null && n.dragging && r.push(
        Ce.node(
          l + f,
          l + f + o.nodeAt(f).nodeSize,
          {
            class: "column-resize-dragging"
          }
        )
      ), r.push(Ce.widget(h, d));
    }
  }
  return le.create(t.doc, r);
}
function CM({
  allowTableNodeSelection: t = !1
} = {}) {
  return new ye({
    key: Jt,
    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init() {
        return null;
      },
      apply(e, n) {
        const r = e.getMeta(Jt);
        if (r != null) return r == -1 ? null : r;
        if (n == null || !e.docChanged) return n;
        const { deleted: i, pos: o } = e.mapping.mapResult(n);
        return i ? null : o;
      }
    },
    props: {
      decorations: $S,
      handleDOMEvents: {
        mousedown: uM
      },
      createSelectionBetween(e) {
        return Jt.getState(e.state) != null ? e.state.selection : null;
      },
      handleTripleClick: aM,
      handleKeyDown: lM,
      handlePaste: cM
    },
    appendTransaction(e, n, r) {
      return WS(
        r,
        qS(r, n),
        t
      );
    }
  });
}
var Do = typeof navigator < "u" ? navigator : null, Dc = Do && Do.userAgent || "", SM = /Edge\/(\d+)/.exec(Dc), MM = /MSIE \d/.exec(Dc), TM = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Dc), NM = !!(MM || TM || SM), IM = !NM && !!Do && /Apple Computer/.test(Do.vendor), Cm = new he("safari-ime-span"), Xl = !1, AM = {
  key: Cm,
  props: {
    decorations: EM,
    handleDOMEvents: {
      compositionstart: () => {
        Xl = !0;
      },
      compositionend: () => {
        Xl = !1;
      }
    }
  }
};
function EM(t) {
  const { $from: e, $to: n, to: r } = t.selection;
  if (Xl && e.sameParent(n)) {
    const i = Ce.widget(r, OM, {
      ignoreSelection: !0,
      key: "safari-ime-span"
    });
    return le.create(t.doc, [i]);
  }
}
function OM(t) {
  const e = t.dom.ownerDocument.createElement("span");
  return e.className = "ProseMirror-safari-ime-span", e;
}
var DM = new ye(IM ? AM : { key: Cm });
function qf(t, e) {
  const n = String(t);
  if (typeof e != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(e);
  for (; i !== -1; )
    r++, i = n.indexOf(e, i + e.length);
  return r;
}
function RM(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function vM(t, e, n) {
  const i = $o((n || {}).ignore || []), o = LM(e);
  let s = -1;
  for (; ++s < o.length; )
    ha(t, "text", l);
  function l(c, u) {
    let f = -1, h;
    for (; ++f < u.length; ) {
      const d = u[f], p = h ? h.children : void 0;
      if (i(
        d,
        p ? p.indexOf(d) : void 0,
        h
      ))
        return;
      h = d;
    }
    if (h)
      return a(c, u);
  }
  function a(c, u) {
    const f = u[u.length - 1], h = o[s][0], d = o[s][1];
    let p = 0;
    const y = f.children.indexOf(c);
    let g = !1, S = [];
    h.lastIndex = 0;
    let C = h.exec(c.value);
    for (; C; ) {
      const I = C.index, A = {
        index: C.index,
        input: C.input,
        stack: [...u, c]
      };
      let x = d(...C, A);
      if (typeof x == "string" && (x = x.length > 0 ? { type: "text", value: x } : void 0), x === !1 ? h.lastIndex = I + 1 : (p !== I && S.push({
        type: "text",
        value: c.value.slice(p, I)
      }), Array.isArray(x) ? S.push(...x) : x && S.push(x), p = I + C[0].length, g = !0), !h.global)
        break;
      C = h.exec(c.value);
    }
    return g ? (p < c.value.length && S.push({ type: "text", value: c.value.slice(p) }), f.children.splice(y, 1, ...S)) : S = [c], y + S.length;
  }
}
function LM(t) {
  const e = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !t[0] || Array.isArray(t[0]) ? t : [t];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    e.push([PM(i[0]), zM(i[1])]);
  }
  return e;
}
function PM(t) {
  return typeof t == "string" ? new RegExp(RM(t), "g") : t;
}
function zM(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
const nl = "phrasing", rl = ["autolink", "link", "image", "label"];
function BM() {
  return {
    transforms: [jM],
    enter: {
      literalAutolink: _M,
      literalAutolinkEmail: il,
      literalAutolinkHttp: il,
      literalAutolinkWww: il
    },
    exit: {
      literalAutolink: WM,
      literalAutolinkEmail: HM,
      literalAutolinkHttp: $M,
      literalAutolinkWww: VM
    }
  };
}
function FM() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: nl,
        notInConstruct: rl
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: nl,
        notInConstruct: rl
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: nl,
        notInConstruct: rl
      }
    ]
  };
}
function _M(t) {
  this.enter({ type: "link", title: null, url: "", children: [] }, t);
}
function il(t) {
  this.config.enter.autolinkProtocol.call(this, t);
}
function $M(t) {
  this.config.exit.autolinkProtocol.call(this, t);
}
function VM(t) {
  this.config.exit.data.call(this, t);
  const e = this.stack[this.stack.length - 1];
  e.type, e.url = "http://" + this.sliceSerialize(t);
}
function HM(t) {
  this.config.exit.autolinkEmail.call(this, t);
}
function WM(t) {
  this.exit(t);
}
function jM(t) {
  vM(
    t,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, qM],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), KM]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function qM(t, e, n, r, i) {
  let o = "";
  if (!Sm(i) || (/^w/i.test(e) && (n = e + n, e = "", o = "http://"), !UM(n)))
    return !1;
  const s = JM(n + r);
  if (!s[0]) return !1;
  const l = {
    type: "link",
    title: null,
    url: o + e + s[0],
    children: [{ type: "text", value: e + s[0] }]
  };
  return s[1] ? [l, { type: "text", value: s[1] }] : l;
}
function KM(t, e, n, r) {
  return (
    // Not an expected previous character.
    !Sm(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(n) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + e + "@" + n,
      children: [{ type: "text", value: e + "@" + n }]
    }
  );
}
function UM(t) {
  const e = t.split(".");
  return !(e.length < 2 || e[e.length - 1] && (/_/.test(e[e.length - 1]) || !/[a-zA-Z\d]/.test(e[e.length - 1])) || e[e.length - 2] && (/_/.test(e[e.length - 2]) || !/[a-zA-Z\d]/.test(e[e.length - 2])));
}
function JM(t) {
  const e = /[!"&'),.:;<>?\]}]+$/.exec(t);
  if (!e)
    return [t, void 0];
  t = t.slice(0, e.index);
  let n = e[0], r = n.indexOf(")");
  const i = qf(t, "(");
  let o = qf(t, ")");
  for (; r !== -1 && i > o; )
    t += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), o++;
  return [t, n];
}
function Sm(t, e) {
  const n = t.input.charCodeAt(t.index - 1);
  return (t.index === 0 || zn(n) || _o(n)) && // If it’s an email, the previous character should not be a slash.
  (!e || n !== 47);
}
Mm.peek = rT;
function GM() {
  this.buffer();
}
function YM(t) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, t);
}
function QM() {
  this.buffer();
}
function XM(t) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    t
  );
}
function ZM(t) {
  const e = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = ot(
    this.sliceSerialize(t)
  ).toLowerCase(), n.label = e;
}
function eT(t) {
  this.exit(t);
}
function tT(t) {
  const e = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = ot(
    this.sliceSerialize(t)
  ).toLowerCase(), n.label = e;
}
function nT(t) {
  this.exit(t);
}
function rT() {
  return "[";
}
function Mm(t, e, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const s = n.enter("footnoteReference"), l = n.enter("reference");
  return o += i.move(
    n.safe(n.associationId(t), { after: "]", before: o })
  ), l(), s(), o += i.move("]"), o;
}
function iT() {
  return {
    enter: {
      gfmFootnoteCallString: GM,
      gfmFootnoteCall: YM,
      gfmFootnoteDefinitionLabelString: QM,
      gfmFootnoteDefinition: XM
    },
    exit: {
      gfmFootnoteCallString: ZM,
      gfmFootnoteCall: eT,
      gfmFootnoteDefinitionLabelString: tT,
      gfmFootnoteDefinition: nT
    }
  };
}
function oT(t) {
  let e = !1;
  return t && t.firstLineBlank && (e = !0), {
    handlers: { footnoteDefinition: n, footnoteReference: Mm },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function n(r, i, o, s) {
    const l = o.createTracker(s);
    let a = l.move("[^");
    const c = o.enter("footnoteDefinition"), u = o.enter("label");
    return a += l.move(
      o.safe(o.associationId(r), { before: a, after: "]" })
    ), u(), a += l.move("]:"), r.children && r.children.length > 0 && (l.shift(4), a += l.move(
      (e ? `
` : " ") + o.indentLines(
        o.containerFlow(r, l.current()),
        e ? Tm : sT
      )
    )), c(), a;
  }
}
function sT(t, e, n) {
  return e === 0 ? t : Tm(t, e, n);
}
function Tm(t, e, n) {
  return (n ? "" : "    ") + t;
}
const lT = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Nm.peek = hT;
function aT() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: uT },
    exit: { strikethrough: fT }
  };
}
function cT() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: lT
      }
    ],
    handlers: { delete: Nm }
  };
}
function uT(t) {
  this.enter({ type: "delete", children: [] }, t);
}
function fT(t) {
  this.exit(t);
}
function Nm(t, e, n, r) {
  const i = n.createTracker(r), o = n.enter("strikethrough");
  let s = i.move("~~");
  return s += n.containerPhrasing(t, {
    ...i.current(),
    before: s,
    after: "~"
  }), s += i.move("~~"), o(), s;
}
function hT() {
  return "~";
}
function dT(t) {
  return t.length;
}
function pT(t, e) {
  const n = e || {}, r = (n.align || []).concat(), i = n.stringLength || dT, o = [], s = [], l = [], a = [];
  let c = 0, u = -1;
  for (; ++u < t.length; ) {
    const m = [], y = [];
    let g = -1;
    for (t[u].length > c && (c = t[u].length); ++g < t[u].length; ) {
      const S = mT(t[u][g]);
      if (n.alignDelimiters !== !1) {
        const C = i(S);
        y[g] = C, (a[g] === void 0 || C > a[g]) && (a[g] = C);
      }
      m.push(S);
    }
    s[u] = m, l[u] = y;
  }
  let f = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++f < c; )
      o[f] = Kf(r[f]);
  else {
    const m = Kf(r);
    for (; ++f < c; )
      o[f] = m;
  }
  f = -1;
  const h = [], d = [];
  for (; ++f < c; ) {
    const m = o[f];
    let y = "", g = "";
    m === 99 ? (y = ":", g = ":") : m === 108 ? y = ":" : m === 114 && (g = ":");
    let S = n.alignDelimiters === !1 ? 1 : Math.max(
      1,
      a[f] - y.length - g.length
    );
    const C = y + "-".repeat(S) + g;
    n.alignDelimiters !== !1 && (S = y.length + S + g.length, S > a[f] && (a[f] = S), d[f] = S), h[f] = C;
  }
  s.splice(1, 0, h), l.splice(1, 0, d), u = -1;
  const p = [];
  for (; ++u < s.length; ) {
    const m = s[u], y = l[u];
    f = -1;
    const g = [];
    for (; ++f < c; ) {
      const S = m[f] || "";
      let C = "", I = "";
      if (n.alignDelimiters !== !1) {
        const A = a[f] - (y[f] || 0), x = o[f];
        x === 114 ? C = " ".repeat(A) : x === 99 ? A % 2 ? (C = " ".repeat(A / 2 + 0.5), I = " ".repeat(A / 2 - 0.5)) : (C = " ".repeat(A / 2), I = C) : I = " ".repeat(A);
      }
      n.delimiterStart !== !1 && !f && g.push("|"), n.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(n.alignDelimiters === !1 && S === "") && (n.delimiterStart !== !1 || f) && g.push(" "), n.alignDelimiters !== !1 && g.push(C), g.push(S), n.alignDelimiters !== !1 && g.push(I), n.padding !== !1 && g.push(" "), (n.delimiterEnd !== !1 || f !== c - 1) && g.push("|");
    }
    p.push(
      n.delimiterEnd === !1 ? g.join("").replace(/ +$/, "") : g.join("")
    );
  }
  return p.join(`
`);
}
function mT(t) {
  return t == null ? "" : String(t);
}
function Kf(t) {
  const e = typeof t == "string" ? t.codePointAt(0) : 0;
  return e === 67 || e === 99 ? 99 : e === 76 || e === 108 ? 108 : e === 82 || e === 114 ? 114 : 0;
}
function gT() {
  return {
    enter: {
      table: yT,
      tableData: Uf,
      tableHeader: Uf,
      tableRow: bT
    },
    exit: {
      codeText: wT,
      table: kT,
      tableData: ol,
      tableHeader: ol,
      tableRow: ol
    }
  };
}
function yT(t) {
  const e = t._align;
  this.enter(
    {
      type: "table",
      align: e.map(function(n) {
        return n === "none" ? null : n;
      }),
      children: []
    },
    t
  ), this.data.inTable = !0;
}
function kT(t) {
  this.exit(t), this.data.inTable = void 0;
}
function bT(t) {
  this.enter({ type: "tableRow", children: [] }, t);
}
function ol(t) {
  this.exit(t);
}
function Uf(t) {
  this.enter({ type: "tableCell", children: [] }, t);
}
function wT(t) {
  let e = this.resume();
  this.data.inTable && (e = e.replace(/\\([\\|])/g, xT));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = e, this.exit(t);
}
function xT(t, e) {
  return e === "|" ? e : t;
}
function CT(t) {
  const e = t || {}, n = e.tableCellPadding, r = e.tablePipeAlign, i = e.stringLength, o = n ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: h,
      table: s,
      tableCell: a,
      tableRow: l
    }
  };
  function s(d, p, m, y) {
    return c(u(d, m, y), d.align);
  }
  function l(d, p, m, y) {
    const g = f(d, m, y), S = c([g]);
    return S.slice(0, S.indexOf(`
`));
  }
  function a(d, p, m, y) {
    const g = m.enter("tableCell"), S = m.enter("phrasing"), C = m.containerPhrasing(d, {
      ...y,
      before: o,
      after: o
    });
    return S(), g(), C;
  }
  function c(d, p) {
    return pT(d, {
      align: p,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: n,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function u(d, p, m) {
    const y = d.children;
    let g = -1;
    const S = [], C = p.enter("table");
    for (; ++g < y.length; )
      S[g] = f(y[g], p, m);
    return C(), S;
  }
  function f(d, p, m) {
    const y = d.children;
    let g = -1;
    const S = [], C = p.enter("tableRow");
    for (; ++g < y.length; )
      S[g] = a(y[g], d, p, m);
    return C(), S;
  }
  function h(d, p, m) {
    let y = pa.inlineCode(d, p, m);
    return m.stack.includes("tableCell") && (y = y.replace(/\|/g, "\\$&")), y;
  }
}
function ST() {
  return {
    exit: {
      taskListCheckValueChecked: Jf,
      taskListCheckValueUnchecked: Jf,
      paragraph: TT
    }
  };
}
function MT() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: NT }
  };
}
function Jf(t) {
  const e = this.stack[this.stack.length - 2];
  e.type, e.checked = t.type === "taskListCheckValueChecked";
}
function TT(t) {
  const e = this.stack[this.stack.length - 2];
  if (e && e.type === "listItem" && typeof e.checked == "boolean") {
    const n = this.stack[this.stack.length - 1];
    n.type;
    const r = n.children[0];
    if (r && r.type === "text") {
      const i = e.children;
      let o = -1, s;
      for (; ++o < i.length; ) {
        const l = i[o];
        if (l.type === "paragraph") {
          s = l;
          break;
        }
      }
      s === n && (r.value = r.value.slice(1), r.value.length === 0 ? n.children.shift() : n.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, n.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(t);
}
function NT(t, e, n, r) {
  const i = t.children[0], o = typeof t.checked == "boolean" && i && i.type === "paragraph", s = "[" + (t.checked ? "x" : " ") + "] ", l = n.createTracker(r);
  o && l.move(s);
  let a = pa.listItem(t, e, n, {
    ...r,
    ...l.current()
  });
  return o && (a = a.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, c)), a;
  function c(u) {
    return u + s;
  }
}
function IT() {
  return [
    BM(),
    iT(),
    aT(),
    gT(),
    ST()
  ];
}
function AT(t) {
  return {
    extensions: [
      FM(),
      oT(t),
      cT(),
      CT(t),
      MT()
    ]
  };
}
const ET = {
  tokenize: PT,
  partial: !0
}, Im = {
  tokenize: zT,
  partial: !0
}, Am = {
  tokenize: BT,
  partial: !0
}, Em = {
  tokenize: FT,
  partial: !0
}, OT = {
  tokenize: _T,
  partial: !0
}, Om = {
  name: "wwwAutolink",
  tokenize: vT,
  previous: Rm
}, Dm = {
  name: "protocolAutolink",
  tokenize: LT,
  previous: vm
}, $t = {
  name: "emailAutolink",
  tokenize: RT,
  previous: Lm
}, Ct = {};
function DT() {
  return {
    text: Ct
  };
}
let kn = 48;
for (; kn < 123; )
  Ct[kn] = $t, kn++, kn === 58 ? kn = 65 : kn === 91 && (kn = 97);
Ct[43] = $t;
Ct[45] = $t;
Ct[46] = $t;
Ct[95] = $t;
Ct[72] = [$t, Dm];
Ct[104] = [$t, Dm];
Ct[87] = [$t, Om];
Ct[119] = [$t, Om];
function RT(t, e, n) {
  const r = this;
  let i, o;
  return s;
  function s(f) {
    return !Zl(f) || !Lm.call(r, r.previous) || Rc(r.events) ? n(f) : (t.enter("literalAutolink"), t.enter("literalAutolinkEmail"), l(f));
  }
  function l(f) {
    return Zl(f) ? (t.consume(f), l) : f === 64 ? (t.consume(f), a) : n(f);
  }
  function a(f) {
    return f === 46 ? t.check(OT, u, c)(f) : f === 45 || f === 95 || Le(f) ? (o = !0, t.consume(f), a) : u(f);
  }
  function c(f) {
    return t.consume(f), i = !0, a;
  }
  function u(f) {
    return o && i && Ae(r.previous) ? (t.exit("literalAutolinkEmail"), t.exit("literalAutolink"), e(f)) : n(f);
  }
}
function vT(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s !== 87 && s !== 119 || !Rm.call(r, r.previous) || Rc(r.events) ? n(s) : (t.enter("literalAutolink"), t.enter("literalAutolinkWww"), t.check(ET, t.attempt(Im, t.attempt(Am, o), n), n)(s));
  }
  function o(s) {
    return t.exit("literalAutolinkWww"), t.exit("literalAutolink"), e(s);
  }
}
function LT(t, e, n) {
  const r = this;
  let i = "", o = !1;
  return s;
  function s(f) {
    return (f === 72 || f === 104) && vm.call(r, r.previous) && !Rc(r.events) ? (t.enter("literalAutolink"), t.enter("literalAutolinkHttp"), i += String.fromCodePoint(f), t.consume(f), l) : n(f);
  }
  function l(f) {
    if (Ae(f) && i.length < 5)
      return i += String.fromCodePoint(f), t.consume(f), l;
    if (f === 58) {
      const h = i.toLowerCase();
      if (h === "http" || h === "https")
        return t.consume(f), a;
    }
    return n(f);
  }
  function a(f) {
    return f === 47 ? (t.consume(f), o ? c : (o = !0, a)) : n(f);
  }
  function c(f) {
    return f === null || ko(f) || ne(f) || zn(f) || _o(f) ? n(f) : t.attempt(Im, t.attempt(Am, u), n)(f);
  }
  function u(f) {
    return t.exit("literalAutolinkHttp"), t.exit("literalAutolink"), e(f);
  }
}
function PT(t, e, n) {
  let r = 0;
  return i;
  function i(s) {
    return (s === 87 || s === 119) && r < 3 ? (r++, t.consume(s), i) : s === 46 && r === 3 ? (t.consume(s), o) : n(s);
  }
  function o(s) {
    return s === null ? n(s) : e(s);
  }
}
function zT(t, e, n) {
  let r, i, o;
  return s;
  function s(c) {
    return c === 46 || c === 95 ? t.check(Em, a, l)(c) : c === null || ne(c) || zn(c) || c !== 45 && _o(c) ? a(c) : (o = !0, t.consume(c), s);
  }
  function l(c) {
    return c === 95 ? r = !0 : (i = r, r = void 0), t.consume(c), s;
  }
  function a(c) {
    return i || r || !o ? n(c) : e(c);
  }
}
function BT(t, e) {
  let n = 0, r = 0;
  return i;
  function i(s) {
    return s === 40 ? (n++, t.consume(s), i) : s === 41 && r < n ? o(s) : s === 33 || s === 34 || s === 38 || s === 39 || s === 41 || s === 42 || s === 44 || s === 46 || s === 58 || s === 59 || s === 60 || s === 63 || s === 93 || s === 95 || s === 126 ? t.check(Em, e, o)(s) : s === null || ne(s) || zn(s) ? e(s) : (t.consume(s), i);
  }
  function o(s) {
    return s === 41 && r++, t.consume(s), i;
  }
}
function FT(t, e, n) {
  return r;
  function r(l) {
    return l === 33 || l === 34 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 63 || l === 95 || l === 126 ? (t.consume(l), r) : l === 38 ? (t.consume(l), o) : l === 93 ? (t.consume(l), i) : (
      // `<` is an end.
      l === 60 || // So is whitespace.
      l === null || ne(l) || zn(l) ? e(l) : n(l)
    );
  }
  function i(l) {
    return l === null || l === 40 || l === 91 || ne(l) || zn(l) ? e(l) : r(l);
  }
  function o(l) {
    return Ae(l) ? s(l) : n(l);
  }
  function s(l) {
    return l === 59 ? (t.consume(l), r) : Ae(l) ? (t.consume(l), s) : n(l);
  }
}
function _T(t, e, n) {
  return r;
  function r(o) {
    return t.consume(o), i;
  }
  function i(o) {
    return Le(o) ? n(o) : e(o);
  }
}
function Rm(t) {
  return t === null || t === 40 || t === 42 || t === 95 || t === 91 || t === 93 || t === 126 || ne(t);
}
function vm(t) {
  return !Ae(t);
}
function Lm(t) {
  return !(t === 47 || Zl(t));
}
function Zl(t) {
  return t === 43 || t === 45 || t === 46 || t === 95 || Le(t);
}
function Rc(t) {
  let e = t.length, n = !1;
  for (; e--; ) {
    const r = t[e][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = !1;
      break;
    }
  }
  return t.length > 0 && !n && (t[t.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
const $T = {
  tokenize: JT,
  partial: !0
};
function VT() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: qT,
        continuation: {
          tokenize: KT
        },
        exit: UT
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: jT
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: HT,
        resolveTo: WT
      }
    }
  };
}
function HT(t, e, n) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let s;
  for (; i--; ) {
    const a = r.events[i][1];
    if (a.type === "labelImage") {
      s = a;
      break;
    }
    if (a.type === "gfmFootnoteCall" || a.type === "labelLink" || a.type === "label" || a.type === "image" || a.type === "link")
      break;
  }
  return l;
  function l(a) {
    if (!s || !s._balanced)
      return n(a);
    const c = ot(r.sliceSerialize({
      start: s.end,
      end: r.now()
    }));
    return c.codePointAt(0) !== 94 || !o.includes(c.slice(1)) ? n(a) : (t.enter("gfmFootnoteCallLabelMarker"), t.consume(a), t.exit("gfmFootnoteCallLabelMarker"), e(a));
  }
}
function WT(t, e) {
  let n = t.length;
  for (; n--; )
    if (t[n][1].type === "labelImage" && t[n][0] === "enter") {
      t[n][1];
      break;
    }
  t[n + 1][1].type = "data", t[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, t[n + 3][1].start),
    end: Object.assign({}, t[t.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, t[n + 3][1].end),
    end: Object.assign({}, t[n + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, t[t.length - 1][1].start)
  }, s = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, o.start),
    end: Object.assign({}, o.end)
  }, l = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    t[n + 1],
    t[n + 2],
    ["enter", r, e],
    // The `[`
    t[n + 3],
    t[n + 4],
    // The `^`.
    ["enter", i, e],
    ["exit", i, e],
    // Everything in between.
    ["enter", o, e],
    ["enter", s, e],
    ["exit", s, e],
    ["exit", o, e],
    // The ending (`]`, properly parsed and labelled).
    t[t.length - 2],
    t[t.length - 1],
    ["exit", r, e]
  ];
  return t.splice(n, t.length - n + 1, ...l), t;
}
function jT(t, e, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, s;
  return l;
  function l(f) {
    return t.enter("gfmFootnoteCall"), t.enter("gfmFootnoteCallLabelMarker"), t.consume(f), t.exit("gfmFootnoteCallLabelMarker"), a;
  }
  function a(f) {
    return f !== 94 ? n(f) : (t.enter("gfmFootnoteCallMarker"), t.consume(f), t.exit("gfmFootnoteCallMarker"), t.enter("gfmFootnoteCallString"), t.enter("chunkString").contentType = "string", c);
  }
  function c(f) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      f === 93 && !s || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      f === null || f === 91 || ne(f)
    )
      return n(f);
    if (f === 93) {
      t.exit("chunkString");
      const h = t.exit("gfmFootnoteCallString");
      return i.includes(ot(r.sliceSerialize(h))) ? (t.enter("gfmFootnoteCallLabelMarker"), t.consume(f), t.exit("gfmFootnoteCallLabelMarker"), t.exit("gfmFootnoteCall"), e) : n(f);
    }
    return ne(f) || (s = !0), o++, t.consume(f), f === 92 ? u : c;
  }
  function u(f) {
    return f === 91 || f === 92 || f === 93 ? (t.consume(f), o++, c) : c(f);
  }
}
function qT(t, e, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, s = 0, l;
  return a;
  function a(p) {
    return t.enter("gfmFootnoteDefinition")._container = !0, t.enter("gfmFootnoteDefinitionLabel"), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(p), t.exit("gfmFootnoteDefinitionLabelMarker"), c;
  }
  function c(p) {
    return p === 94 ? (t.enter("gfmFootnoteDefinitionMarker"), t.consume(p), t.exit("gfmFootnoteDefinitionMarker"), t.enter("gfmFootnoteDefinitionLabelString"), t.enter("chunkString").contentType = "string", u) : n(p);
  }
  function u(p) {
    if (
      // Too long.
      s > 999 || // Closing brace with nothing.
      p === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      p === null || p === 91 || ne(p)
    )
      return n(p);
    if (p === 93) {
      t.exit("chunkString");
      const m = t.exit("gfmFootnoteDefinitionLabelString");
      return o = ot(r.sliceSerialize(m)), t.enter("gfmFootnoteDefinitionLabelMarker"), t.consume(p), t.exit("gfmFootnoteDefinitionLabelMarker"), t.exit("gfmFootnoteDefinitionLabel"), h;
    }
    return ne(p) || (l = !0), s++, t.consume(p), p === 92 ? f : u;
  }
  function f(p) {
    return p === 91 || p === 92 || p === 93 ? (t.consume(p), s++, u) : u(p);
  }
  function h(p) {
    return p === 58 ? (t.enter("definitionMarker"), t.consume(p), t.exit("definitionMarker"), i.includes(o) || i.push(o), Y(t, d, "gfmFootnoteDefinitionWhitespace")) : n(p);
  }
  function d(p) {
    return e(p);
  }
}
function KT(t, e, n) {
  return t.check(ki, e, t.attempt($T, e, n));
}
function UT(t) {
  t.exit("gfmFootnoteDefinition");
}
function JT(t, e, n) {
  const r = this;
  return Y(t, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "gfmFootnoteDefinitionIndent" && s[2].sliceSerialize(s[1], !0).length === 4 ? e(o) : n(o);
  }
}
function GT(t) {
  let n = (t || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: i
  };
  return n == null && (n = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function i(s, l) {
    let a = -1;
    for (; ++a < s.length; )
      if (s[a][0] === "enter" && s[a][1].type === "strikethroughSequenceTemporary" && s[a][1]._close) {
        let c = a;
        for (; c--; )
          if (s[c][0] === "exit" && s[c][1].type === "strikethroughSequenceTemporary" && s[c][1]._open && // If the sizes are the same:
          s[a][1].end.offset - s[a][1].start.offset === s[c][1].end.offset - s[c][1].start.offset) {
            s[a][1].type = "strikethroughSequence", s[c][1].type = "strikethroughSequence";
            const u = {
              type: "strikethrough",
              start: Object.assign({}, s[c][1].start),
              end: Object.assign({}, s[a][1].end)
            }, f = {
              type: "strikethroughText",
              start: Object.assign({}, s[c][1].end),
              end: Object.assign({}, s[a][1].start)
            }, h = [["enter", u, l], ["enter", s[c][1], l], ["exit", s[c][1], l], ["enter", f, l]], d = l.parser.constructs.insideSpan.null;
            d && Te(h, h.length, 0, yi(d, s.slice(c + 1, a), l)), Te(h, h.length, 0, [["exit", f, l], ["enter", s[a][1], l], ["exit", s[a][1], l], ["exit", u, l]]), Te(s, c - 1, a - c + 3, h), a = c + h.length - 2;
            break;
          }
      }
    for (a = -1; ++a < s.length; )
      s[a][1].type === "strikethroughSequenceTemporary" && (s[a][1].type = "data");
    return s;
  }
  function o(s, l, a) {
    const c = this.previous, u = this.events;
    let f = 0;
    return h;
    function h(p) {
      return c === 126 && u[u.length - 1][1].type !== "characterEscape" ? a(p) : (s.enter("strikethroughSequenceTemporary"), d(p));
    }
    function d(p) {
      const m = nn(c);
      if (p === 126)
        return f > 1 ? a(p) : (s.consume(p), f++, d);
      if (f < 2 && !n) return a(p);
      const y = s.exit("strikethroughSequenceTemporary"), g = nn(p);
      return y._open = !g || g === 2 && !!m, y._close = !m || m === 2 && !!g, l(p);
    }
  }
}
class YT {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(e, n, r) {
    QT(this, e, n, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(e) {
    if (this.map.sort(function(o, s) {
      return o[0] - s[0];
    }), this.map.length === 0)
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; )
      n -= 1, r.push(e.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), e.length = this.map[n][0];
    r.push(e.slice()), e.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const o of i)
        e.push(o);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function QT(t, e, n, r) {
  let i = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; i < t.map.length; ) {
      if (t.map[i][0] === e) {
        t.map[i][1] += n, t.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    t.map.push([e, n, r]);
  }
}
function XT(t, e) {
  let n = !1;
  const r = [];
  for (; e < t.length; ) {
    const i = t[e];
    if (n) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(t[e + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (t[e - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
    e += 1;
  }
  return r;
}
function ZT() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: eN,
        resolveAll: tN
      }
    }
  };
}
function eN(t, e, n) {
  const r = this;
  let i = 0, o = 0, s;
  return l;
  function l(w) {
    let v = r.events.length - 1;
    for (; v > -1; ) {
      const X = r.events[v][1].type;
      if (X === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      X === "linePrefix") v--;
      else break;
    }
    const P = v > -1 ? r.events[v][1].type : null, Z = P === "tableHead" || P === "tableRow" ? x : a;
    return Z === x && r.parser.lazy[r.now().line] ? n(w) : Z(w);
  }
  function a(w) {
    return t.enter("tableHead"), t.enter("tableRow"), c(w);
  }
  function c(w) {
    return w === 124 || (s = !0, o += 1), u(w);
  }
  function u(w) {
    return w === null ? n(w) : z(w) ? o > 1 ? (o = 0, r.interrupt = !0, t.exit("tableRow"), t.enter("lineEnding"), t.consume(w), t.exit("lineEnding"), d) : n(w) : q(w) ? Y(t, u, "whitespace")(w) : (o += 1, s && (s = !1, i += 1), w === 124 ? (t.enter("tableCellDivider"), t.consume(w), t.exit("tableCellDivider"), s = !0, u) : (t.enter("data"), f(w)));
  }
  function f(w) {
    return w === null || w === 124 || ne(w) ? (t.exit("data"), u(w)) : (t.consume(w), w === 92 ? h : f);
  }
  function h(w) {
    return w === 92 || w === 124 ? (t.consume(w), f) : f(w);
  }
  function d(w) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(w) : (t.enter("tableDelimiterRow"), s = !1, q(w) ? Y(t, p, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(w) : p(w));
  }
  function p(w) {
    return w === 45 || w === 58 ? y(w) : w === 124 ? (s = !0, t.enter("tableCellDivider"), t.consume(w), t.exit("tableCellDivider"), m) : A(w);
  }
  function m(w) {
    return q(w) ? Y(t, y, "whitespace")(w) : y(w);
  }
  function y(w) {
    return w === 58 ? (o += 1, s = !0, t.enter("tableDelimiterMarker"), t.consume(w), t.exit("tableDelimiterMarker"), g) : w === 45 ? (o += 1, g(w)) : w === null || z(w) ? I(w) : A(w);
  }
  function g(w) {
    return w === 45 ? (t.enter("tableDelimiterFiller"), S(w)) : A(w);
  }
  function S(w) {
    return w === 45 ? (t.consume(w), S) : w === 58 ? (s = !0, t.exit("tableDelimiterFiller"), t.enter("tableDelimiterMarker"), t.consume(w), t.exit("tableDelimiterMarker"), C) : (t.exit("tableDelimiterFiller"), C(w));
  }
  function C(w) {
    return q(w) ? Y(t, I, "whitespace")(w) : I(w);
  }
  function I(w) {
    return w === 124 ? p(w) : w === null || z(w) ? !s || i !== o ? A(w) : (t.exit("tableDelimiterRow"), t.exit("tableHead"), e(w)) : A(w);
  }
  function A(w) {
    return n(w);
  }
  function x(w) {
    return t.enter("tableRow"), R(w);
  }
  function R(w) {
    return w === 124 ? (t.enter("tableCellDivider"), t.consume(w), t.exit("tableCellDivider"), R) : w === null || z(w) ? (t.exit("tableRow"), e(w)) : q(w) ? Y(t, R, "whitespace")(w) : (t.enter("data"), O(w));
  }
  function O(w) {
    return w === null || w === 124 || ne(w) ? (t.exit("data"), R(w)) : (t.consume(w), w === 92 ? L : O);
  }
  function L(w) {
    return w === 92 || w === 124 ? (t.consume(w), O) : O(w);
  }
}
function tN(t, e) {
  let n = -1, r = !0, i = 0, o = [0, 0, 0, 0], s = [0, 0, 0, 0], l = !1, a = 0, c, u, f;
  const h = new YT();
  for (; ++n < t.length; ) {
    const d = t[n], p = d[1];
    d[0] === "enter" ? p.type === "tableHead" ? (l = !1, a !== 0 && (Gf(h, e, a, c, u), u = void 0, a = 0), c = {
      type: "table",
      start: Object.assign({}, p.start),
      // Note: correct end is set later.
      end: Object.assign({}, p.end)
    }, h.add(n, 0, [["enter", c, e]])) : p.type === "tableRow" || p.type === "tableDelimiterRow" ? (r = !0, f = void 0, o = [0, 0, 0, 0], s = [0, n + 1, 0, 0], l && (l = !1, u = {
      type: "tableBody",
      start: Object.assign({}, p.start),
      // Note: correct end is set later.
      end: Object.assign({}, p.end)
    }, h.add(n, 0, [["enter", u, e]])), i = p.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (p.type === "data" || p.type === "tableDelimiterMarker" || p.type === "tableDelimiterFiller") ? (r = !1, s[2] === 0 && (o[1] !== 0 && (s[0] = s[1], f = ji(h, e, o, i, void 0, f), o = [0, 0, 0, 0]), s[2] = n)) : p.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (s[0] = s[1], f = ji(h, e, o, i, void 0, f)), o = s, s = [o[1], n, 0, 0])) : p.type === "tableHead" ? (l = !0, a = n) : p.type === "tableRow" || p.type === "tableDelimiterRow" ? (a = n, o[1] !== 0 ? (s[0] = s[1], f = ji(h, e, o, i, n, f)) : s[1] !== 0 && (f = ji(h, e, s, i, n, f)), i = 0) : i && (p.type === "data" || p.type === "tableDelimiterMarker" || p.type === "tableDelimiterFiller") && (s[3] = n);
  }
  for (a !== 0 && Gf(h, e, a, c, u), h.consume(e.events), n = -1; ++n < e.events.length; ) {
    const d = e.events[n];
    d[0] === "enter" && d[1].type === "table" && (d[1]._align = XT(e.events, n));
  }
  return t;
}
function ji(t, e, n, r, i, o) {
  const s = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", l = "tableContent";
  n[0] !== 0 && (o.end = Object.assign({}, tr(e.events, n[0])), t.add(n[0], 0, [["exit", o, e]]));
  const a = tr(e.events, n[1]);
  if (o = {
    type: s,
    start: Object.assign({}, a),
    // Note: correct end is set later.
    end: Object.assign({}, a)
  }, t.add(n[1], 0, [["enter", o, e]]), n[2] !== 0) {
    const c = tr(e.events, n[2]), u = tr(e.events, n[3]), f = {
      type: l,
      start: Object.assign({}, c),
      end: Object.assign({}, u)
    };
    if (t.add(n[2], 0, [["enter", f, e]]), r !== 2) {
      const h = e.events[n[2]], d = e.events[n[3]];
      if (h[1].end = Object.assign({}, d[1].end), h[1].type = "chunkText", h[1].contentType = "text", n[3] > n[2] + 1) {
        const p = n[2] + 1, m = n[3] - n[2] - 1;
        t.add(p, m, []);
      }
    }
    t.add(n[3] + 1, 0, [["exit", f, e]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, tr(e.events, i)), t.add(i, 0, [["exit", o, e]]), o = void 0), o;
}
function Gf(t, e, n, r, i) {
  const o = [], s = tr(e.events, n);
  i && (i.end = Object.assign({}, s), o.push(["exit", i, e])), r.end = Object.assign({}, s), o.push(["exit", r, e]), t.add(n + 1, 0, o);
}
function tr(t, e) {
  const n = t[e], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const nN = {
  name: "tasklistCheck",
  tokenize: iN
};
function rN() {
  return {
    text: {
      91: nN
    }
  };
}
function iN(t, e, n) {
  const r = this;
  return i;
  function i(a) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? n(a) : (t.enter("taskListCheck"), t.enter("taskListCheckMarker"), t.consume(a), t.exit("taskListCheckMarker"), o)
    );
  }
  function o(a) {
    return ne(a) ? (t.enter("taskListCheckValueUnchecked"), t.consume(a), t.exit("taskListCheckValueUnchecked"), s) : a === 88 || a === 120 ? (t.enter("taskListCheckValueChecked"), t.consume(a), t.exit("taskListCheckValueChecked"), s) : n(a);
  }
  function s(a) {
    return a === 93 ? (t.enter("taskListCheckMarker"), t.consume(a), t.exit("taskListCheckMarker"), t.exit("taskListCheck"), l) : n(a);
  }
  function l(a) {
    return z(a) ? e(a) : q(a) ? t.check({
      tokenize: oN
    }, e, n)(a) : n(a);
  }
}
function oN(t, e, n) {
  return Y(t, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : e(i);
  }
}
function sN(t) {
  return Vh([
    DT(),
    VT(),
    GT(t),
    ZT(),
    rN()
  ]);
}
const lN = {};
function aN(t) {
  const e = (
    /** @type {Processor<Root>} */
    this
  ), n = t || lN, r = e.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), s = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(sN(n)), o.push(IT()), s.push(AT(n));
}
function B(t, e) {
  return Object.assign(t, {
    meta: {
      package: "@milkdown/preset-gfm",
      ...e
    }
  }), t;
}
const vc = Mi("strike_through");
B(vc, {
  displayName: "Attr<strikethrough>",
  group: "Strikethrough"
});
const Oi = qn("strike_through", (t) => ({
  parseDOM: [
    { tag: "del" },
    {
      style: "text-decoration",
      getAttrs: (e) => e === "line-through"
    }
  ],
  toDOM: (e) => ["del", t.get(vc.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "delete",
    runner: (e, n, r) => {
      e.openMark(r), e.next(n.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "strike_through",
    runner: (e, n) => {
      e.withMark(n, "delete");
    }
  }
}));
B(Oi.mark, {
  displayName: "MarkSchema<strikethrough>",
  group: "Strikethrough"
});
B(Oi.ctx, {
  displayName: "MarkSchemaCtx<strikethrough>",
  group: "Strikethrough"
});
const is = F(
  "ToggleStrikeThrough",
  (t) => () => wi(Oi.type(t))
);
B(is, {
  displayName: "Command<ToggleStrikethrough>",
  group: "Strikethrough"
});
const Pm = Re((t) => gr(
  new RegExp("(?<![\\w:/])(~{1,2})(.+?)\\1(?!\\w|\\/)"),
  Oi.type(t)
));
B(Pm, {
  displayName: "InputRule<strikethrough>",
  group: "Strikethrough"
});
const Lc = Fe("strikeThroughKeymap", {
  ToggleStrikethrough: {
    shortcuts: "Mod-Alt-x",
    command: (t) => {
      const e = t.get(J);
      return () => e.call(is.key);
    }
  }
});
B(Lc.ctx, {
  displayName: "KeymapCtx<strikethrough>",
  group: "Strikethrough"
});
B(Lc.shortcuts, {
  displayName: "Keymap<strikethrough>",
  group: "Strikethrough"
});
const Di = LS({
  tableGroup: "block",
  cellContent: "paragraph",
  cellAttributes: {
    alignment: {
      default: "left",
      getFromDOM: (t) => t.style.textAlign || "left",
      setDOMAttr: (t, e) => {
        e.style = `text-align: ${t || "left"}`;
      }
    }
  }
}), Cr = de("table", () => ({
  ...Di.table,
  content: "table_header_row table_row+",
  disableDropCursor: !0,
  parseMarkdown: {
    match: (t) => t.type === "table",
    runner: (t, e, n) => {
      const r = e.align, i = e.children.map((o, s) => ({
        ...o,
        align: r,
        isHeader: s === 0
      }));
      t.openNode(n), t.next(i), t.closeNode();
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "table",
    runner: (t, e) => {
      const n = e.content.firstChild?.content;
      if (!n) return;
      const r = [];
      n.forEach((i) => {
        r.push(i.attrs.alignment);
      }), t.openNode("table", void 0, { align: r }), t.next(e.content), t.closeNode();
    }
  }
}));
B(Cr.node, {
  displayName: "NodeSchema<table>",
  group: "Table"
});
B(Cr.ctx, {
  displayName: "NodeSchemaCtx<table>",
  group: "Table"
});
const ss = de("table_header_row", () => ({
  ...Di.table_row,
  disableDropCursor: !0,
  content: "(table_header)*",
  parseDOM: [{ tag: "tr[data-is-header]" }],
  toDOM() {
    return ["tr", { "data-is-header": !0 }, 0];
  },
  parseMarkdown: {
    match: (t) => !!(t.type === "tableRow" && t.isHeader),
    runner: (t, e, n) => {
      const r = e.align, i = e.children.map((o, s) => ({
        ...o,
        align: r[s],
        isHeader: e.isHeader
      }));
      t.openNode(n), t.next(i), t.closeNode();
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "table_header_row",
    runner: (t, e) => {
      t.openNode("tableRow", void 0, { isHeader: !0 }), t.next(e.content), t.closeNode();
    }
  }
}));
B(ss.node, {
  displayName: "NodeSchema<tableHeaderRow>",
  group: "Table"
});
B(ss.ctx, {
  displayName: "NodeSchemaCtx<tableHeaderRow>",
  group: "Table"
});
const Ri = de("table_row", () => ({
  ...Di.table_row,
  disableDropCursor: !0,
  content: "(table_cell)*",
  parseMarkdown: {
    match: (t) => t.type === "tableRow",
    runner: (t, e, n) => {
      const r = e.align, i = e.children.map((o, s) => ({
        ...o,
        align: r[s]
      }));
      t.openNode(n), t.next(i), t.closeNode();
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "table_row",
    runner: (t, e) => {
      e.content.size !== 0 && (t.openNode("tableRow"), t.next(e.content), t.closeNode());
    }
  }
}));
B(Ri.node, {
  displayName: "NodeSchema<tableRow>",
  group: "Table"
});
B(Ri.ctx, {
  displayName: "NodeSchemaCtx<tableRow>",
  group: "Table"
});
const vi = de("table_cell", () => ({
  ...Di.table_cell,
  disableDropCursor: !0,
  parseMarkdown: {
    match: (t) => t.type === "tableCell" && !t.isHeader,
    runner: (t, e, n) => {
      const r = e.align;
      t.openNode(n, { alignment: r }).openNode(t.schema.nodes.paragraph).next(e.children).closeNode().closeNode();
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "table_cell",
    runner: (t, e) => {
      t.openNode("tableCell").next(e.content).closeNode();
    }
  }
}));
B(vi.node, {
  displayName: "NodeSchema<tableCell>",
  group: "Table"
});
B(vi.ctx, {
  displayName: "NodeSchemaCtx<tableCell>",
  group: "Table"
});
const ls = de("table_header", () => ({
  ...Di.table_header,
  disableDropCursor: !0,
  parseMarkdown: {
    match: (t) => t.type === "tableCell" && !!t.isHeader,
    runner: (t, e, n) => {
      const r = e.align;
      t.openNode(n, { alignment: r }), t.openNode(t.schema.nodes.paragraph), t.next(e.children), t.closeNode(), t.closeNode();
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "table_header",
    runner: (t, e) => {
      t.openNode("tableCell"), t.next(e.content), t.closeNode();
    }
  }
}));
B(ls.node, {
  displayName: "NodeSchema<tableHeader>",
  group: "Table"
});
B(ls.ctx, {
  displayName: "NodeSchemaCtx<tableHeader>",
  group: "Table"
});
function zm(t, e = 3, n = 3) {
  const r = Array(n).fill(0).map(() => vi.type(t).createAndFill()), i = Array(n).fill(0).map(() => ls.type(t).createAndFill()), o = Array(e).fill(0).map(
    (s, l) => l === 0 ? ss.type(t).create(null, i) : Ri.type(t).create(null, r)
  );
  return Cr.type(t).create(null, o);
}
function Li(t) {
  return jd(
    (e) => e.type.spec.tableRole === "table"
  )(t);
}
function nr(t, e) {
  const n = Li(e.$from);
  if (!n) return;
  const r = ee.get(n.node);
  return (Array.isArray(t) ? t : [t]).filter((o) => o >= 0 && o <= r.width - 1).flatMap((o) => r.cellsInRect({
    left: o,
    right: o + 1,
    top: 0,
    bottom: r.height
  }).map((l) => {
    const a = n.node.nodeAt(l), c = l + n.start;
    return { pos: c, start: c + 1, node: a, depth: n.depth + 2 };
  }));
}
function rr(t, e) {
  const n = Li(e.$from);
  if (!n)
    return;
  const r = ee.get(n.node);
  return (Array.isArray(t) ? t : [t]).filter((o) => o >= 0 && o <= r.height - 1).flatMap((o) => r.cellsInRect({
    left: 0,
    right: r.width,
    top: o,
    bottom: o + 1
  }).map((l) => {
    const a = n.node.nodeAt(l), c = l + n.start;
    return { pos: c, start: c + 1, node: a, depth: n.depth + 2 };
  }));
}
function Bm(t) {
  return (e, n) => (r) => {
    n = n ?? r.selection.from;
    const i = r.doc.resolve(n), o = jd(
      (a) => a.type.name === "table"
    )(i), s = o ? {
      node: o.node,
      from: o.start
    } : void 0, l = t === "row";
    if (s) {
      const a = ee.get(s.node);
      if (e >= 0 && e < (l ? a.height : a.width)) {
        const c = a.positionAt(
          l ? e : a.height - 1,
          l ? a.width - 1 : e,
          s.node
        ), u = r.doc.resolve(s.from + c), f = l ? se.rowSelection : se.colSelection, h = a.positionAt(
          l ? e : 0,
          l ? 0 : e,
          s.node
        ), d = r.doc.resolve(s.from + h);
        return Wd(
          r.setSelection(
            f(u, d)
          )
        );
      }
    }
    return r;
  };
}
const cN = Bm("row"), uN = Bm("col");
function Fm(t, e, { map: n, tableStart: r, table: i }, o) {
  const s = Array(o).fill(0).reduce((a, c, u) => a + i.child(u).nodeSize, r), l = Array(n.width).fill(0).map((a, c) => {
    const u = i.nodeAt(n.map[c]);
    return vi.type(t).createAndFill({ alignment: u?.attrs.alignment });
  });
  return e.insert(s, Ri.type(t).create(null, l)), e;
}
function _m(t, e) {
  const n = [], r = ee.get(t);
  for (let o = 0; o < r.height; o++) {
    const s = t.child(o), l = [];
    for (let a = 0; a < r.width; a++) {
      if (!e[o][a]) continue;
      const c = r.map[o * r.width + a], u = e[o][a], h = t.nodeAt(c).type.createChecked(
        Object.assign({}, u.attrs),
        u.content,
        u.marks
      );
      l.push(h);
    }
    n.push(s.type.createChecked(s.attrs, l, s.marks));
  }
  return t.type.createChecked(
    t.attrs,
    n,
    t.marks
  );
}
function $m(t) {
  const e = ee.get(t), n = [], r = e.height, i = e.width;
  for (let o = 0; o < r; o++) {
    const s = [];
    for (let l = 0; l < i; l++) {
      let a = o * i + l, c = e.map[a];
      if (o > 0) {
        const u = a - i, f = e.map[u];
        if (c === f) {
          s.push(null);
          continue;
        }
      }
      if (l > 0) {
        const u = a - 1, f = e.map[u];
        if (c === f) {
          s.push(null);
          continue;
        }
      }
      c ? s.push(t.nodeAt(c)) : s.push(null);
    }
    n.push(s);
  }
  return n;
}
function Yf(t, e, n = e) {
  let r = e, i = n;
  for (let f = e; f >= 0; f--) {
    const h = rr(f, t.selection);
    h && h.forEach((d) => {
      const p = d.node.attrs.rowspan + f - 1;
      p >= r && (r = f), p > i && (i = p);
    });
  }
  for (let f = e; f <= i; f++) {
    const h = rr(f, t.selection);
    h && h.forEach((d) => {
      const p = d.node.attrs.rowspan + f - 1;
      d.node.attrs.rowspan > 1 && p > i && (i = p);
    });
  }
  const o = [];
  for (let f = r; f <= i; f++) {
    const h = rr(f, t.selection);
    h && h.length > 0 && o.push(f);
  }
  r = o[0], i = o[o.length - 1];
  const s = rr(r, t.selection), l = nr(0, t.selection);
  if (!s || !l)
    return;
  const a = t.doc.resolve(
    s[s.length - 1].pos
  );
  let c;
  for (let f = i; f >= r; f--) {
    const h = rr(f, t.selection);
    if (h && h.length > 0) {
      for (let d = l.length - 1; d >= 0; d--)
        if (l[d].pos === h[0].pos) {
          c = h[0];
          break;
        }
      if (c)
        break;
    }
  }
  if (!c)
    return;
  const u = t.doc.resolve(c.pos);
  return { $anchor: a, $head: u, indexes: o };
}
function Vm(t, e, n, r) {
  const i = e[0] > n[0] ? -1 : 1, o = t.splice(e[0], e.length), s = o.length % 2 === 0 ? 1 : 0;
  let l;
  return l = i === -1 ? n[0] : n[n.length - 1] - s, t.splice(l, 0, ...o), t;
}
function fN(t) {
  const { tr: e, origin: n, target: r, pos: i } = t, o = e.doc.resolve(i), s = Li(o);
  if (!s) return !1;
  const l = Yf(e, n)?.indexes, a = Yf(e, r)?.indexes;
  if (!l || !a || l.includes(r)) return !1;
  const c = hN(
    s.node,
    l,
    a
  );
  e.replaceWith(s.pos, s.pos + s.node.nodeSize, c);
  const u = ee.get(c), f = s.start, h = r, d = u.positionAt(h, u.width - 1, c), p = e.doc.resolve(f + d), m = u.positionAt(h, 0, c), y = e.doc.resolve(f + m);
  return e.setSelection(se.rowSelection(p, y)), !0;
}
function hN(t, e, n, r) {
  let i = $m(t);
  return i = Vm(i, e, n), _m(t, i);
}
function Qf(t, e, n = e) {
  let r = e, i = n;
  for (let f = e; f >= 0; f--) {
    const h = nr(f, t.selection);
    h && h.forEach((d) => {
      const p = d.node.attrs.colspan + f - 1;
      p >= r && (r = f), p > i && (i = p);
    });
  }
  for (let f = e; f <= i; f++) {
    const h = nr(f, t.selection);
    h && h.forEach((d) => {
      const p = d.node.attrs.colspan + f - 1;
      d.node.attrs.colspan > 1 && p > i && (i = p);
    });
  }
  const o = [];
  for (let f = r; f <= i; f++) {
    const h = nr(f, t.selection);
    h && h.length > 0 && o.push(f);
  }
  r = o[0], i = o[o.length - 1];
  const s = nr(r, t.selection), l = rr(0, t.selection);
  if (!s || !l)
    return;
  const a = t.doc.resolve(
    s[s.length - 1].pos
  );
  let c;
  for (let f = i; f >= r; f--) {
    const h = nr(f, t.selection);
    if (h && h.length > 0) {
      for (let d = l.length - 1; d >= 0; d--)
        if (l[d].pos === h[0].pos) {
          c = h[0];
          break;
        }
      if (c)
        break;
    }
  }
  if (!c)
    return;
  const u = t.doc.resolve(c.pos);
  return { $anchor: a, $head: u, indexes: o };
}
function Xf(t) {
  return t[0].map((e, n) => t.map((r) => r[n]));
}
function dN(t) {
  const { tr: e, origin: n, target: r, pos: i } = t, o = e.doc.resolve(i), s = Li(o);
  if (!s) return !1;
  const l = Qf(e, n)?.indexes, a = Qf(e, r)?.indexes;
  if (!l || !a || l.includes(r)) return !1;
  const c = pN(
    s.node,
    l,
    a
  );
  e.replaceWith(s.pos, s.pos + s.node.nodeSize, c);
  const u = ee.get(c), f = s.start, h = r, d = u.positionAt(u.height - 1, h, c), p = e.doc.resolve(f + d), m = u.positionAt(0, h, c), y = e.doc.resolve(f + m);
  return e.setSelection(se.colSelection(p, y)), !0;
}
function pN(t, e, n, r) {
  let i = Xf($m(t));
  return i = Vm(i, e, n), i = Xf(i), _m(t, i);
}
function mN(t) {
  const e = Li(t.$from);
  if (!e) return;
  const n = ee.get(e.node);
  return n.cellsInRect({
    left: 0,
    right: n.width,
    top: 0,
    bottom: n.height
  }).map((i) => {
    const o = e.node.nodeAt(i), s = i + e.start;
    return { pos: s, start: s + 1, node: o };
  });
}
function gN(t) {
  const e = mN(t.selection);
  if (e && e[0]) {
    const n = t.doc.resolve(e[0].pos), r = e[e.length - 1];
    if (r) {
      const i = t.doc.resolve(r.pos);
      return Wd(t.setSelection(new se(i, n)));
    }
  }
  return t;
}
const Pc = F(
  "GoToPrevTableCell",
  () => () => bm(-1)
);
B(Pc, {
  displayName: "Command<goToPrevTableCellCommand>",
  group: "Table"
});
const zc = F(
  "GoToNextTableCell",
  () => () => bm(1)
);
B(zc, {
  displayName: "Command<goToNextTableCellCommand>",
  group: "Table"
});
const Bc = F(
  "ExitTable",
  (t) => () => (e, n) => {
    if (!et(e)) return !1;
    const { $head: r } = e.selection, i = ax(r, Cr.type(t));
    if (!i) return !1;
    const { to: o } = i, s = e.tr.replaceWith(
      o,
      o,
      hn.type(t).createAndFill()
    );
    return s.setSelection($.near(s.doc.resolve(o), 1)).scrollIntoView(), n?.(s), !0;
  }
);
B(Bc, {
  displayName: "Command<breakTableCommand>",
  group: "Table"
});
const Hm = F(
  "InsertTable",
  (t) => ({ row: e, col: n } = {}) => (r, i) => {
    const { selection: o, tr: s } = r, { from: l } = o, a = zm(t, e, n), c = s.replaceSelectionWith(a), u = $.findFrom(c.doc.resolve(l), 1, !0);
    return u && c.setSelection(u), i?.(c), !0;
  }
);
B(Hm, {
  displayName: "Command<insertTableCommand>",
  group: "Table"
});
const Wm = F(
  "MoveRow",
  () => ({ from: t, to: e, pos: n } = {}) => (r, i) => {
    const { tr: o } = r;
    return fN({
      tr: o,
      origin: t ?? 0,
      target: e ?? 0,
      pos: n ?? r.selection.from
    }) ? (i?.(o), !0) : !1;
  }
);
B(Wm, {
  displayName: "Command<moveRowCommand>",
  group: "Table"
});
const jm = F(
  "MoveCol",
  () => ({ from: t, to: e, pos: n } = {}) => (r, i) => {
    const { tr: o } = r;
    return dN({
      tr: o,
      origin: t ?? 0,
      target: e ?? 0,
      pos: n ?? r.selection.from
    }) ? (i?.(o), !0) : !1;
  }
);
B(jm, {
  displayName: "Command<moveColCommand>",
  group: "Table"
});
const qm = F(
  "SelectRow",
  () => (t = { index: 0 }) => (e, n) => {
    const { tr: r } = e;
    return !!n?.(cN(t.index, t.pos)(r));
  }
);
B(qm, {
  displayName: "Command<selectRowCommand>",
  group: "Table"
});
const Km = F(
  "SelectCol",
  () => (t = { index: 0 }) => (e, n) => {
    const { tr: r } = e;
    return !!n?.(uN(t.index, t.pos)(r));
  }
);
B(Km, {
  displayName: "Command<selectColCommand>",
  group: "Table"
});
const Um = F(
  "SelectTable",
  () => () => (t, e) => {
    const { tr: n } = t;
    return !!e?.(gN(n));
  }
);
B(Um, {
  displayName: "Command<selectTableCommand>",
  group: "Table"
});
const Jm = F(
  "DeleteSelectedCells",
  () => () => (t, e) => {
    const { selection: n } = t;
    if (!(n instanceof se)) return !1;
    const r = n.isRowSelection(), i = n.isColSelection();
    return r && i ? nM(t, e) : i ? YS(t, e) : XS(t, e);
  }
);
B(Jm, {
  displayName: "Command<deleteSelectedCellsCommand>",
  group: "Table"
});
const Gm = F(
  "AddColBefore",
  () => () => US
);
B(Gm, {
  displayName: "Command<addColBeforeCommand>",
  group: "Table"
});
const Ym = F(
  "AddColAfter",
  () => () => JS
);
B(Ym, {
  displayName: "Command<addColAfterCommand>",
  group: "Table"
});
const Qm = F(
  "AddRowBefore",
  (t) => () => (e, n) => {
    if (!et(e)) return !1;
    if (n) {
      const r = dn(e);
      n(Fm(t, e.tr, r, r.top));
    }
    return !0;
  }
);
B(Qm, {
  displayName: "Command<addRowBeforeCommand>",
  group: "Table"
});
const Xm = F(
  "AddRowAfter",
  (t) => () => (e, n) => {
    if (!et(e)) return !1;
    if (n) {
      const r = dn(e);
      n(Fm(t, e.tr, r, r.bottom));
    }
    return !0;
  }
);
B(Xm, {
  displayName: "Command<addRowAfterCommand>",
  group: "Table"
});
const Zm = F(
  "SetAlign",
  () => (t = "left") => ZS("alignment", t)
);
B(Zm, {
  displayName: "Command<setAlignCommand>",
  group: "Table"
});
const eg = Re(
  (t) => new qe(
    /^\|(?<col>\d+)[xX](?<row>\d+)\|\s$/,
    (e, n, r, i) => {
      const o = e.doc.resolve(r);
      if (!o.node(-1).canReplaceWith(
        o.index(-1),
        o.indexAfter(-1),
        Cr.type(t)
      ))
        return null;
      const s = Math.max(Number(n.groups?.row ?? 0), 2), l = zm(t, s, Number(n.groups?.col)), a = e.tr.replaceRangeWith(r, i, l);
      return a.setSelection(H.create(a.doc, r + 3)).scrollIntoView();
    }
  )
);
B(eg, {
  displayName: "InputRule<insertTableInputRule>",
  group: "Table"
});
const Fc = Fe("tableKeymap", {
  NextCell: {
    priority: 100,
    shortcuts: ["Mod-]", "Tab"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(zc.key);
    }
  },
  PrevCell: {
    shortcuts: ["Mod-[", "Shift-Tab"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Pc.key);
    }
  },
  ExitTable: {
    shortcuts: ["Mod-Enter", "Enter"],
    command: (t) => {
      const e = t.get(J);
      return () => e.call(Bc.key);
    }
  }
});
B(Fc.ctx, {
  displayName: "KeymapCtx<table>",
  group: "Table"
});
B(Fc.shortcuts, {
  displayName: "Keymap<table>",
  group: "Table"
});
const sl = "footnote_definition", Zf = "footnoteDefinition", _c = de(
  "footnote_definition",
  () => ({
    group: "block",
    content: "block+",
    defining: !0,
    attrs: {
      label: {
        default: "",
        validate: "string"
      }
    },
    parseDOM: [
      {
        tag: `dl[data-type="${sl}"]`,
        getAttrs: (t) => {
          if (!(t instanceof HTMLElement)) throw xt(t);
          return {
            label: t.dataset.label
          };
        },
        contentElement: "dd"
      }
    ],
    toDOM: (t) => {
      const e = t.attrs.label;
      return [
        "dl",
        {
          // TODO: add a prosemirror plugin to sync label on change
          "data-label": e,
          "data-type": sl
        },
        ["dt", e],
        ["dd", 0]
      ];
    },
    parseMarkdown: {
      match: ({ type: t }) => t === Zf,
      runner: (t, e, n) => {
        t.openNode(n, {
          label: e.label
        }).next(e.children).closeNode();
      }
    },
    toMarkdown: {
      match: (t) => t.type.name === sl,
      runner: (t, e) => {
        t.openNode(Zf, void 0, {
          label: e.attrs.label,
          identifier: e.attrs.label
        }).next(e.content).closeNode();
      }
    }
  })
);
B(_c.ctx, {
  displayName: "NodeSchemaCtx<footnodeDef>",
  group: "footnote"
});
B(_c.node, {
  displayName: "NodeSchema<footnodeDef>",
  group: "footnote"
});
const ll = "footnote_reference", $c = de(
  "footnote_reference",
  () => ({
    group: "inline",
    inline: !0,
    atom: !0,
    attrs: {
      label: {
        default: "",
        validate: "string"
      }
    },
    parseDOM: [
      {
        tag: `sup[data-type="${ll}"]`,
        getAttrs: (t) => {
          if (!(t instanceof HTMLElement)) throw xt(t);
          return {
            label: t.dataset.label
          };
        }
      }
    ],
    toDOM: (t) => {
      const e = t.attrs.label;
      return [
        "sup",
        {
          // TODO: add a prosemirror plugin to sync label on change
          "data-label": e,
          "data-type": ll
        },
        e
      ];
    },
    parseMarkdown: {
      match: ({ type: t }) => t === "footnoteReference",
      runner: (t, e, n) => {
        t.addNode(n, {
          label: e.label
        });
      }
    },
    toMarkdown: {
      match: (t) => t.type.name === ll,
      runner: (t, e) => {
        t.addNode("footnoteReference", void 0, void 0, {
          label: e.attrs.label,
          identifier: e.attrs.label
        });
      }
    }
  })
);
B($c.ctx, {
  displayName: "NodeSchemaCtx<footnodeRef>",
  group: "footnote"
});
B($c.node, {
  displayName: "NodeSchema<footnodeRef>",
  group: "footnote"
});
const Vc = _t.extendSchema(
  (t) => (e) => {
    const n = t(e);
    return {
      ...n,
      attrs: {
        ...n.attrs,
        checked: {
          default: null,
          validate: "boolean|null"
        }
      },
      parseDOM: [
        {
          tag: 'li[data-item-type="task"]',
          getAttrs: (r) => {
            if (!(r instanceof HTMLElement)) throw xt(r);
            return {
              label: r.dataset.label,
              listType: r.dataset.listType,
              spread: r.dataset.spread,
              checked: r.dataset.checked ? r.dataset.checked === "true" : null
            };
          }
        },
        ...n?.parseDOM || []
      ],
      toDOM: (r) => n.toDOM && r.attrs.checked == null ? n.toDOM(r) : [
        "li",
        {
          "data-item-type": "task",
          "data-label": r.attrs.label,
          "data-list-type": r.attrs.listType,
          "data-spread": r.attrs.spread,
          "data-checked": r.attrs.checked
        },
        0
      ],
      parseMarkdown: {
        match: ({ type: r }) => r === "listItem",
        runner: (r, i, o) => {
          if (i.checked == null) {
            n.parseMarkdown.runner(r, i, o);
            return;
          }
          const s = i.label != null ? `${i.label}.` : "•", l = i.checked != null ? !!i.checked : null, a = i.label != null ? "ordered" : "bullet", c = i.spread != null ? `${i.spread}` : "true";
          r.openNode(o, { label: s, listType: a, spread: c, checked: l }), r.next(i.children), r.closeNode();
        }
      },
      toMarkdown: {
        match: (r) => r.type.name === "list_item",
        runner: (r, i) => {
          if (i.attrs.checked == null) {
            n.toMarkdown.runner(r, i);
            return;
          }
          const o = i.attrs.label, s = i.attrs.listType, l = i.attrs.spread === "true", a = i.attrs.checked;
          r.openNode("listItem", void 0, {
            label: o,
            listType: s,
            spread: l,
            checked: a
          }), r.next(i.content), r.closeNode();
        }
      }
    };
  }
);
B(Vc.node, {
  displayName: "NodeSchema<taskListItem>",
  group: "ListItem"
});
B(Vc.ctx, {
  displayName: "NodeSchemaCtx<taskListItem>",
  group: "ListItem"
});
const tg = Re(() => new qe(
  /^\[(?<checked>\s|x)\]\s$/,
  (t, e, n, r) => {
    const i = t.doc.resolve(n);
    let o = 0, s = i.node(o);
    for (; s && s.type.name !== "list_item"; )
      o--, s = i.node(o);
    if (!s || s.attrs.checked != null) return null;
    const l = e.groups?.checked === "x", a = i.before(o), c = t.tr;
    return c.deleteRange(n, r).setNodeMarkup(a, void 0, {
      ...s.attrs,
      checked: l
    }), c;
  }
));
B(tg, {
  displayName: "InputRule<wrapInTaskListInputRule>",
  group: "ListItem"
});
const yN = [
  Lc,
  Fc
].flat(), kN = [
  eg,
  tg
], bN = [Pm], ng = Ke(() => DM);
B(ng, {
  displayName: "Prose<autoInsertSpanPlugin>",
  group: "Prose"
});
const wN = Ke(() => hM({}));
B(wN, {
  displayName: "Prose<columnResizingPlugin>",
  group: "Prose"
});
const rg = Ke(
  () => CM({ allowTableNodeSelection: !0 })
);
B(rg, {
  displayName: "Prose<tableEditingPlugin>",
  group: "Prose"
});
const Hc = fn("remarkGFM", () => aN);
B(Hc.plugin, {
  displayName: "Remark<remarkGFMPlugin>",
  group: "Remark"
});
B(Hc.options, {
  displayName: "RemarkConfig<remarkGFMPlugin>",
  group: "Remark"
});
const xN = new he("MILKDOWN_KEEP_TABLE_ALIGN_PLUGIN");
function CN(t, e) {
  let n = 0;
  return e.forEach((r, i, o) => {
    r === t && (n = o);
  }), n;
}
const ig = Ke(() => new ye({
  key: xN,
  appendTransaction: (t, e, n) => {
    let r;
    const i = (o, s) => {
      if (r || (r = n.tr), o.type.name !== "table_cell") return;
      const l = n.doc.resolve(s), a = l.node(l.depth), u = l.node(l.depth - 1).firstChild;
      if (!u) return;
      const f = CN(o, a), h = u.maybeChild(f);
      if (!h) return;
      const d = h.attrs.alignment, p = o.attrs.alignment;
      d !== p && r.setNodeMarkup(s, void 0, { ...o.attrs, alignment: d });
    };
    return e.doc !== n.doc && n.doc.descendants(i), r;
  }
}));
B(ig, {
  displayName: "Prose<keepTableAlignPlugin>",
  group: "Prose"
});
const SN = [
  ig,
  ng,
  Hc,
  rg
].flat(), MN = [
  Vc,
  Cr,
  ss,
  Ri,
  ls,
  vi,
  _c,
  $c,
  vc,
  Oi
].flat(), TN = [
  zc,
  Pc,
  Bc,
  Hm,
  Wm,
  jm,
  qm,
  Km,
  Um,
  Jm,
  Qm,
  Xm,
  Gm,
  Ym,
  Zm,
  is
], NN = [
  MN,
  kN,
  bN,
  yN,
  TN,
  SN
].flat(), ea = Math.min, ar = Math.max, Ro = Math.round, yt = (t) => ({
  x: t,
  y: t
}), IN = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, AN = {
  start: "end",
  end: "start"
};
function eh(t, e, n) {
  return ar(t, ea(e, n));
}
function as(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Vn(t) {
  return t.split("-")[0];
}
function cs(t) {
  return t.split("-")[1];
}
function og(t) {
  return t === "x" ? "y" : "x";
}
function sg(t) {
  return t === "y" ? "height" : "width";
}
const EN = /* @__PURE__ */ new Set(["top", "bottom"]);
function Xt(t) {
  return EN.has(Vn(t)) ? "y" : "x";
}
function lg(t) {
  return og(Xt(t));
}
function ON(t, e, n) {
  n === void 0 && (n = !1);
  const r = cs(t), i = lg(t), o = sg(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (s = vo(s)), [s, vo(s)];
}
function DN(t) {
  const e = vo(t);
  return [ta(t), e, ta(e)];
}
function ta(t) {
  return t.replace(/start|end/g, (e) => AN[e]);
}
const th = ["left", "right"], nh = ["right", "left"], RN = ["top", "bottom"], vN = ["bottom", "top"];
function LN(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? nh : th : e ? th : nh;
    case "left":
    case "right":
      return e ? RN : vN;
    default:
      return [];
  }
}
function PN(t, e, n, r) {
  const i = cs(t);
  let o = LN(Vn(t), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), e && (o = o.concat(o.map(ta)))), o;
}
function vo(t) {
  return t.replace(/left|right|bottom|top/g, (e) => IN[e]);
}
function zN(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function BN(t) {
  return typeof t != "number" ? zN(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Lo(t) {
  const {
    x: e,
    y: n,
    width: r,
    height: i
  } = t;
  return {
    width: r,
    height: i,
    top: n,
    left: e,
    right: e + r,
    bottom: n + i,
    x: e,
    y: n
  };
}
function rh(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const o = Xt(e), s = lg(e), l = sg(s), a = Vn(e), c = o === "y", u = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, h = r[l] / 2 - i[l] / 2;
  let d;
  switch (a) {
    case "top":
      d = {
        x: u,
        y: r.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      d = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      d = {
        x: r.x - i.width,
        y: f
      };
      break;
    default:
      d = {
        x: r.x,
        y: r.y
      };
  }
  switch (cs(e)) {
    case "start":
      d[s] -= h * (n && c ? -1 : 1);
      break;
    case "end":
      d[s] += h * (n && c ? -1 : 1);
      break;
  }
  return d;
}
const FN = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: s
  } = n, l = o.filter(Boolean), a = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let c = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: u,
    y: f
  } = rh(c, r, a), h = r, d = {}, p = 0;
  for (let m = 0; m < l.length; m++) {
    const {
      name: y,
      fn: g
    } = l[m], {
      x: S,
      y: C,
      data: I,
      reset: A
    } = await g({
      x: u,
      y: f,
      initialPlacement: r,
      placement: h,
      strategy: i,
      middlewareData: d,
      rects: c,
      platform: s,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = S ?? u, f = C ?? f, d = {
      ...d,
      [y]: {
        ...d[y],
        ...I
      }
    }, A && p <= 50 && (p++, typeof A == "object" && (A.placement && (h = A.placement), A.rects && (c = A.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : A.rects), {
      x: u,
      y: f
    } = rh(c, h, a)), m = -1);
  }
  return {
    x: u,
    y: f,
    placement: h,
    strategy: i,
    middlewareData: d
  };
};
async function ag(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: o,
    rects: s,
    elements: l,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: f = "floating",
    altBoundary: h = !1,
    padding: d = 0
  } = as(e, t), p = BN(d), y = l[h ? f === "floating" ? "reference" : "floating" : f], g = Lo(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(y))) == null || n ? y : y.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: a
  })), S = f === "floating" ? {
    x: r,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, C = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l.floating)), I = await (o.isElement == null ? void 0 : o.isElement(C)) ? await (o.getScale == null ? void 0 : o.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, A = Lo(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: S,
    offsetParent: C,
    strategy: a
  }) : S);
  return {
    top: (g.top - A.top + p.top) / I.y,
    bottom: (A.bottom - g.bottom + p.bottom) / I.y,
    left: (g.left - A.left + p.left) / I.x,
    right: (A.right - g.right + p.right) / I.x
  };
}
const _N = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: i,
        middlewareData: o,
        rects: s,
        initialPlacement: l,
        platform: a,
        elements: c
      } = e, {
        mainAxis: u = !0,
        crossAxis: f = !0,
        fallbackPlacements: h,
        fallbackStrategy: d = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: m = !0,
        ...y
      } = as(t, e);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const g = Vn(i), S = Xt(l), C = Vn(l) === l, I = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), A = h || (C || !m ? [vo(l)] : DN(l)), x = p !== "none";
      !h && x && A.push(...PN(l, m, p, I));
      const R = [l, ...A], O = await ag(e, y), L = [];
      let w = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (u && L.push(O[g]), f) {
        const X = ON(i, s, I);
        L.push(O[X[0]], O[X[1]]);
      }
      if (w = [...w, {
        placement: i,
        overflows: L
      }], !L.every((X) => X <= 0)) {
        var v, P;
        const X = (((v = o.flip) == null ? void 0 : v.index) || 0) + 1, j = R[X];
        if (j && (!(f === "alignment" ? S !== Xt(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        w.every((ae) => Xt(ae.placement) === S ? ae.overflows[0] > 0 : !0)))
          return {
            data: {
              index: X,
              overflows: w
            },
            reset: {
              placement: j
            }
          };
        let ce = (P = w.filter((ie) => ie.overflows[0] <= 0).sort((ie, ae) => ie.overflows[1] - ae.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!ce)
          switch (d) {
            case "bestFit": {
              var Z;
              const ie = (Z = w.filter((ae) => {
                if (x) {
                  const pe = Xt(ae.placement);
                  return pe === S || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  pe === "y";
                }
                return !0;
              }).map((ae) => [ae.placement, ae.overflows.filter((pe) => pe > 0).reduce((pe, k) => pe + k, 0)]).sort((ae, pe) => ae[1] - pe[1])[0]) == null ? void 0 : Z[0];
              ie && (ce = ie);
              break;
            }
            case "initialPlacement":
              ce = l;
              break;
          }
        if (i !== ce)
          return {
            reset: {
              placement: ce
            }
          };
      }
      return {};
    }
  };
}, $N = /* @__PURE__ */ new Set(["left", "top"]);
async function VN(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = Vn(n), l = cs(n), a = Xt(n) === "y", c = $N.has(s) ? -1 : 1, u = o && a ? -1 : 1, f = as(e, t);
  let {
    mainAxis: h,
    crossAxis: d,
    alignmentAxis: p
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return l && typeof p == "number" && (d = l === "end" ? p * -1 : p), a ? {
    x: d * u,
    y: h * c
  } : {
    x: h * c,
    y: d * u
  };
}
const HN = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, r;
      const {
        x: i,
        y: o,
        placement: s,
        middlewareData: l
      } = e, a = await VN(e, t);
      return s === ((n = l.offset) == null ? void 0 : n.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: i + a.x,
        y: o + a.y,
        data: {
          ...a,
          placement: s
        }
      };
    }
  };
}, WN = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: i
      } = e, {
        mainAxis: o = !0,
        crossAxis: s = !1,
        limiter: l = {
          fn: (y) => {
            let {
              x: g,
              y: S
            } = y;
            return {
              x: g,
              y: S
            };
          }
        },
        ...a
      } = as(t, e), c = {
        x: n,
        y: r
      }, u = await ag(e, a), f = Xt(Vn(i)), h = og(f);
      let d = c[h], p = c[f];
      if (o) {
        const y = h === "y" ? "top" : "left", g = h === "y" ? "bottom" : "right", S = d + u[y], C = d - u[g];
        d = eh(S, d, C);
      }
      if (s) {
        const y = f === "y" ? "top" : "left", g = f === "y" ? "bottom" : "right", S = p + u[y], C = p - u[g];
        p = eh(S, p, C);
      }
      const m = l.fn({
        ...e,
        [h]: d,
        [f]: p
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [h]: o,
            [f]: s
          }
        }
      };
    }
  };
};
function us() {
  return typeof window < "u";
}
function Sr(t) {
  return cg(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function We(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Vt(t) {
  var e;
  return (e = (cg(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function cg(t) {
  return us() ? t instanceof Node || t instanceof We(t).Node : !1;
}
function ct(t) {
  return us() ? t instanceof Element || t instanceof We(t).Element : !1;
}
function wt(t) {
  return us() ? t instanceof HTMLElement || t instanceof We(t).HTMLElement : !1;
}
function ih(t) {
  return !us() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof We(t).ShadowRoot;
}
const jN = /* @__PURE__ */ new Set(["inline", "contents"]);
function Pi(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = ut(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !jN.has(i);
}
const qN = /* @__PURE__ */ new Set(["table", "td", "th"]);
function KN(t) {
  return qN.has(Sr(t));
}
const UN = [":popover-open", ":modal"];
function fs(t) {
  return UN.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const JN = ["transform", "translate", "scale", "rotate", "perspective"], GN = ["transform", "translate", "scale", "rotate", "perspective", "filter"], YN = ["paint", "layout", "strict", "content"];
function Wc(t) {
  const e = jc(), n = ct(t) ? ut(t) : t;
  return JN.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || GN.some((r) => (n.willChange || "").includes(r)) || YN.some((r) => (n.contain || "").includes(r));
}
function QN(t) {
  let e = ln(t);
  for (; wt(e) && !pr(e); ) {
    if (Wc(e))
      return e;
    if (fs(e))
      return null;
    e = ln(e);
  }
  return null;
}
function jc() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const XN = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function pr(t) {
  return XN.has(Sr(t));
}
function ut(t) {
  return We(t).getComputedStyle(t);
}
function hs(t) {
  return ct(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function ln(t) {
  if (Sr(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    ih(t) && t.host || // Fallback.
    Vt(t)
  );
  return ih(e) ? e.host : e;
}
function ug(t) {
  const e = ln(t);
  return pr(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : wt(e) && Pi(e) ? e : ug(e);
}
function fg(t, e, n) {
  var r;
  e === void 0 && (e = []);
  const i = ug(t), o = i === ((r = t.ownerDocument) == null ? void 0 : r.body), s = We(i);
  return o ? (na(s), e.concat(s, s.visualViewport || [], Pi(i) ? i : [], [])) : e.concat(i, fg(i, []));
}
function na(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function hg(t) {
  const e = ut(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = wt(t), o = i ? t.offsetWidth : n, s = i ? t.offsetHeight : r, l = Ro(n) !== o || Ro(r) !== s;
  return l && (n = o, r = s), {
    width: n,
    height: r,
    $: l
  };
}
function dg(t) {
  return ct(t) ? t : t.contextElement;
}
function cr(t) {
  const e = dg(t);
  if (!wt(e))
    return yt(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = hg(e);
  let s = (o ? Ro(n.width) : n.width) / r, l = (o ? Ro(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: s,
    y: l
  };
}
const ZN = /* @__PURE__ */ yt(0);
function pg(t) {
  const e = We(t);
  return !jc() || !e.visualViewport ? ZN : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function eI(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== We(t) ? !1 : e;
}
function mi(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), o = dg(t);
  let s = yt(1);
  e && (r ? ct(r) && (s = cr(r)) : s = cr(t));
  const l = eI(o, n, r) ? pg(o) : yt(0);
  let a = (i.left + l.x) / s.x, c = (i.top + l.y) / s.y, u = i.width / s.x, f = i.height / s.y;
  if (o) {
    const h = We(o), d = r && ct(r) ? We(r) : r;
    let p = h, m = na(p);
    for (; m && r && d !== p; ) {
      const y = cr(m), g = m.getBoundingClientRect(), S = ut(m), C = g.left + (m.clientLeft + parseFloat(S.paddingLeft)) * y.x, I = g.top + (m.clientTop + parseFloat(S.paddingTop)) * y.y;
      a *= y.x, c *= y.y, u *= y.x, f *= y.y, a += C, c += I, p = We(m), m = na(p);
    }
  }
  return Lo({
    width: u,
    height: f,
    x: a,
    y: c
  });
}
function ds(t, e) {
  const n = hs(t).scrollLeft;
  return e ? e.left + n : mi(Vt(t)).left + n;
}
function mg(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - ds(t, n), i = n.top + e.scrollTop;
  return {
    x: r,
    y: i
  };
}
function tI(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: i
  } = t;
  const o = i === "fixed", s = Vt(r), l = e ? fs(e.floating) : !1;
  if (r === s || l && o)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = yt(1);
  const u = yt(0), f = wt(r);
  if ((f || !f && !o) && ((Sr(r) !== "body" || Pi(s)) && (a = hs(r)), wt(r))) {
    const d = mi(r);
    c = cr(r), u.x = d.x + r.clientLeft, u.y = d.y + r.clientTop;
  }
  const h = s && !f && !o ? mg(s, a) : yt(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - a.scrollLeft * c.x + u.x + h.x,
    y: n.y * c.y - a.scrollTop * c.y + u.y + h.y
  };
}
function nI(t) {
  return Array.from(t.getClientRects());
}
function rI(t) {
  const e = Vt(t), n = hs(t), r = t.ownerDocument.body, i = ar(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), o = ar(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + ds(t);
  const l = -n.scrollTop;
  return ut(r).direction === "rtl" && (s += ar(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: l
  };
}
const oh = 25;
function iI(t, e) {
  const n = We(t), r = Vt(t), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    const u = jc();
    (!u || u && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  const c = ds(r);
  if (c <= 0) {
    const u = r.ownerDocument, f = u.body, h = getComputedStyle(f), d = u.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, p = Math.abs(r.clientWidth - f.clientWidth - d);
    p <= oh && (o -= p);
  } else c <= oh && (o += c);
  return {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
const oI = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function sI(t, e) {
  const n = mi(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, o = wt(t) ? cr(t) : yt(1), s = t.clientWidth * o.x, l = t.clientHeight * o.y, a = i * o.x, c = r * o.y;
  return {
    width: s,
    height: l,
    x: a,
    y: c
  };
}
function sh(t, e, n) {
  let r;
  if (e === "viewport")
    r = iI(t, n);
  else if (e === "document")
    r = rI(Vt(t));
  else if (ct(e))
    r = sI(e, n);
  else {
    const i = pg(t);
    r = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return Lo(r);
}
function gg(t, e) {
  const n = ln(t);
  return n === e || !ct(n) || pr(n) ? !1 : ut(n).position === "fixed" || gg(n, e);
}
function lI(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = fg(t, []).filter((l) => ct(l) && Sr(l) !== "body"), i = null;
  const o = ut(t).position === "fixed";
  let s = o ? ln(t) : t;
  for (; ct(s) && !pr(s); ) {
    const l = ut(s), a = Wc(s);
    !a && l.position === "fixed" && (i = null), (o ? !a && !i : !a && l.position === "static" && !!i && oI.has(i.position) || Pi(s) && !a && gg(t, s)) ? r = r.filter((u) => u !== s) : i = l, s = ln(s);
  }
  return e.set(t, r), r;
}
function aI(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? fs(e) ? [] : lI(e, this._c) : [].concat(n), r], l = s[0], a = s.reduce((c, u) => {
    const f = sh(e, u, i);
    return c.top = ar(f.top, c.top), c.right = ea(f.right, c.right), c.bottom = ea(f.bottom, c.bottom), c.left = ar(f.left, c.left), c;
  }, sh(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function cI(t) {
  const {
    width: e,
    height: n
  } = hg(t);
  return {
    width: e,
    height: n
  };
}
function uI(t, e, n) {
  const r = wt(e), i = Vt(e), o = n === "fixed", s = mi(t, !0, o, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = yt(0);
  function c() {
    a.x = ds(i);
  }
  if (r || !r && !o)
    if ((Sr(e) !== "body" || Pi(i)) && (l = hs(e)), r) {
      const d = mi(e, !0, o, e);
      a.x = d.x + e.clientLeft, a.y = d.y + e.clientTop;
    } else i && c();
  o && !r && i && c();
  const u = i && !r && !o ? mg(i, l) : yt(0), f = s.left + l.scrollLeft - a.x - u.x, h = s.top + l.scrollTop - a.y - u.y;
  return {
    x: f,
    y: h,
    width: s.width,
    height: s.height
  };
}
function al(t) {
  return ut(t).position === "static";
}
function lh(t, e) {
  if (!wt(t) || ut(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Vt(t) === n && (n = n.ownerDocument.body), n;
}
function yg(t, e) {
  const n = We(t);
  if (fs(t))
    return n;
  if (!wt(t)) {
    let i = ln(t);
    for (; i && !pr(i); ) {
      if (ct(i) && !al(i))
        return i;
      i = ln(i);
    }
    return n;
  }
  let r = lh(t, e);
  for (; r && KN(r) && al(r); )
    r = lh(r, e);
  return r && pr(r) && al(r) && !Wc(r) ? n : r || QN(t) || n;
}
const fI = async function(t) {
  const e = this.getOffsetParent || yg, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: uI(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function hI(t) {
  return ut(t).direction === "rtl";
}
const dI = {
  convertOffsetParentRelativeRectToViewportRelativeRect: tI,
  getDocumentElement: Vt,
  getClippingRect: aI,
  getOffsetParent: yg,
  getElementRects: fI,
  getClientRects: nI,
  getDimensions: cI,
  getScale: cr,
  isElement: ct,
  isRTL: hI
}, ah = HN, ch = WN, uh = _N, fh = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: dI,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return FN(t, e, {
    ...i,
    platform: o
  });
};
class pI {
  constructor(e) {
    this.#o = !1, this.onShow = () => {
    }, this.onHide = () => {
    }, this.#u = (n, r) => {
      const { state: i, composing: o } = n, { selection: s, doc: l } = i, { ranges: a } = s, c = Math.min(...a.map((d) => d.$from.pos)), u = Math.max(...a.map((d) => d.$to.pos)), f = r && r.doc.eq(l) && r.selection.eq(s);
      if (this.#o || ((this.#l ?? n.dom.parentElement ?? document.body).appendChild(this.element), this.#o = !0), o || f) return;
      if (!this.#e(n, r)) {
        this.hide();
        return;
      }
      fh({
        getBoundingClientRect: () => ix(n, c, u)
      }, this.element, {
        placement: this.#n.placement ?? "top",
        middleware: [
          uh(),
          ah(this.#i),
          ch(this.#s),
          ...this.#r
        ]
      }).then(({ x: d, y: p }) => {
        Object.assign(this.element.style, {
          left: `${d}px`,
          top: `${p}px`
        });
      }).catch(console.error), this.show();
    }, this.update = (n, r) => {
      this.#a(n, r);
    }, this.destroy = () => {
      this.#a.cancel();
    }, this.show = (n) => {
      this.element.dataset.show = "true", n && fh(n, this.element, {
        placement: "top",
        middleware: [
          uh(),
          ah(this.#i),
          ch(this.#s),
          ...this.#r
        ],
        ...this.#n
      }).then(({ x: r, y: i }) => {
        Object.assign(this.element.style, {
          left: `${r}px`,
          top: `${i}px`
        });
      }).catch(console.error), this.onShow();
    }, this.hide = () => {
      this.element.dataset.show !== "false" && (this.element.dataset.show = "false", this.onHide());
    }, this.element = e.content, this.#t = e.debounce ?? 200, this.#e = e.shouldShow ?? this.#c, this.#i = e.offset, this.#s = e.shift, this.#r = e.middleware ?? [], this.#n = e.floatingUIOptions ?? {}, this.#l = e.root, this.element.dataset.show = "false", this.#a = GC(this.#u, this.#t);
  }
  /// @internal
  #t;
  /// @internal
  #e;
  /// @internal
  #r;
  /// @internal
  #n;
  /// @internal
  #l;
  #o;
  /// @internal
  #i;
  /// @internal
  #s;
  /// @internal
  #a;
  #u;
  /// @internal
  #c(e) {
    const { doc: n, selection: r } = e.state, { empty: i, from: o, to: s } = r, l = !n.textBetween(o, s).length && e.state.selection instanceof H, a = this.element.contains(document.activeElement), c = !e.hasFocus() && !a, u = !e.editable;
    return !(c || i || l || u);
  }
}
function mI(t) {
  const e = ft(
    {},
    `${t}_TOOLTIP_SPEC`
  ), n = Ke((i) => {
    const o = i.get(e.key);
    return new ye({
      key: new he(`${t}_TOOLTIP`),
      ...o
    });
  }), r = [e, n];
  return r.key = e.key, r.pluginKey = n.key, e.meta = {
    package: "@milkdown/plugin-tooltip",
    displayName: `Ctx<tooltipSpec>|${t}`
  }, n.meta = {
    package: "@milkdown/plugin-tooltip",
    displayName: `Prose<tooltip>|${t}`
  }, r;
}
const ps = ft(
  {
    shouldAppend: (t) => !(!t || ["heading", "paragraph"].includes(t.type.name)),
    getNode: (t) => t.schema.nodes.paragraph.create()
  },
  "trailingConfig"
);
ps.meta = {
  package: "@milkdown/plugin-trailing",
  displayName: "Ctx<trailingConfig>"
};
const kg = Ke((t) => {
  const e = new he("MILKDOWN_TRAILING"), { shouldAppend: n, getNode: r } = t.get(ps.key), i = new ye({
    key: e,
    state: {
      init: (o, s) => {
        const l = s.tr.doc.lastChild;
        return n(l, s);
      },
      apply: (o, s, l, a) => {
        if (!o.docChanged) return s;
        const c = o.doc.lastChild;
        return n(c, a);
      }
    },
    appendTransaction: (o, s, l) => {
      const { doc: a, tr: c } = l, u = r?.(l), f = i.getState(l), h = a.content.size;
      if (!(!f || !u))
        return c.insert(h, u);
    }
  });
  return i;
});
kg.meta = {
  package: "@milkdown/plugin-trailing",
  displayName: "Prose<trailing>"
};
const gI = [ps, kg];
function ra(t) {
  if (!t) return !1;
  if (Array.isArray(t))
    return t.length > 1 ? !1 : ra(t[0]);
  const e = t.content;
  return e ? ra(e) : t.type === "text";
}
const bg = Ke((t) => {
  const e = t.get(at);
  t.update(ni, (i) => ({
    ...i,
    editable: i.editable ?? (() => !0)
  }));
  const n = new he("MILKDOWN_CLIPBOARD");
  return new ye({
    key: n,
    props: {
      handlePaste: (i, o) => {
        const s = t.get(sr), l = i.props.editable?.(i.state), { clipboardData: a } = o;
        if (!l || !a || i.state.selection.$from.node().type.spec.code) return !1;
        const u = a.getData("text/plain"), f = a.getData("vscode-editor-data");
        if (f) {
          const S = JSON.parse(f)?.mode;
          if (u && S) {
            const { tr: C } = i.state, I = cx("code_block", e);
            return C.replaceSelectionWith(I.create({ language: S })).setSelection(
              H.near(
                C.doc.resolve(Math.max(0, C.selection.from - 2))
              )
            ).insertText(u.replace(/\r\n?/g, `
`)), i.dispatch(C), !0;
          }
        }
        const h = a.getData("text/html");
        if (h.length === 0 && u.length === 0) return !1;
        const d = Pn.fromSchema(e);
        let p;
        if (h.length === 0) {
          const g = s(u);
          if (!g || typeof g == "string") return !1;
          p = Hn.fromSchema(e).serializeFragment(
            g.content
          );
        } else {
          const g = document.createElement("template");
          g.innerHTML = h, p = g.content.cloneNode(!0), g.remove();
        }
        const m = d.parseSlice(p), y = sx(m);
        return y ? (i.dispatch(i.state.tr.replaceSelectionWith(y, !0)), !0) : (i.dispatch(i.state.tr.replaceSelection(m)), !0);
      },
      clipboardTextSerializer: (i) => {
        const o = t.get(Dn);
        if (ra(i.content.toJSON()))
          return i.content.textBetween(
            0,
            i.content.size,
            `

`
          );
        const l = e.topNodeType.createAndFill(void 0, i.content);
        return l ? o(l) : "";
      }
    }
  });
});
bg.meta = {
  displayName: "Prose<clipboard>",
  package: "@milkdown/plugin-clipboard"
};
const yI = (t, e) => {
  const n = document.createElement("button");
  n.textContent = t, n.style.position = "relative";
  const r = document.createElement("div");
  r.style.position = "absolute", r.style.top = "100%", r.style.left = "0", r.style.padding = "8px", r.style.background = "white", r.style.border = "1px solid #ccc", r.style.borderRadius = "4px", r.style.display = "none", r.style.zIndex = "1000", r.style.display = "flex", r.style.gap = "4px";
  const i = document.createElement("input");
  i.type = "text", i.placeholder = "Enter URL", i.style.flex = "1";
  const o = document.createElement("button");
  return o.textContent = "Save", r.appendChild(i), r.appendChild(o), n.appendChild(r), n.onclick = () => {
    r.style.display = "flex", i.focus();
  }, o.onclick = (s) => {
    s.stopPropagation();
    const l = i.value.trim();
    if (l) {
      try {
        e.get(J).call(Ga.key, { href: l });
      } catch (a) {
        console.error(a);
      }
      r.style.display = "none", i.value = "";
    }
  }, document.addEventListener("click", (s) => {
    n.contains(s.target) || (r.style.display = "none");
  }), n;
}, cl = (t, e, n) => {
  const r = document.createElement("button");
  return r.textContent = t, r.onclick = () => {
    n.get(J).call(Dt.key, e);
  }, r;
}, Mn = (t, e, n) => {
  const r = document.createElement("button");
  return r.textContent = t, r.onclick = () => {
    try {
      n.get(J).call(e.key);
    } catch {
    }
  }, r;
}, kI = (t) => {
  const e = document.createElement("div"), n = document.createElement("button"), r = document.createElement("div");
  return e.classList.add("mayfly-dropdown"), n.classList.add("mayfly-dropdown-toggle"), n.textContent = "Text ▾", r.classList.add("mayfly-dropdown-content"), r.append(
    Mn("Text", Zo, t),
    //Text
    cl("Heading 1", 1, t),
    cl("Heading 2", 2, t),
    cl("Heading 3", 3, t),
    Mn("Bullet List", ts, t),
    //Bullet
    Mn("Number List", ns, t)
    //Number List
  ), e.append(
    n,
    r
  ), e.querySelectorAll(".mayfly-dropdown-toggle").forEach((i) => {
    i.addEventListener("click", (o) => {
      o.stopPropagation(), console.log("Hello");
      const s = i.parentElement;
      s.classList.toggle("mayfly-active"), document.querySelectorAll(".mayfly-dropdown").forEach((l) => {
        l !== s && l.classList.remove("mayfly-active");
      });
    });
  }), document.addEventListener("click", (i) => {
    i.target.closest(".mayfly-dropdown") || document.querySelectorAll(".mayfly-dropdown").forEach(
      (o) => o.classList.remove("mayfly-active")
    );
  }), e;
};
var hh = Object.prototype.hasOwnProperty;
function dh(t, e, n) {
  for (n of t.keys())
    if (ii(n, e)) return n;
}
function ii(t, e) {
  var n, r, i;
  if (t === e) return !0;
  if (t && e && (n = t.constructor) === e.constructor) {
    if (n === Date) return t.getTime() === e.getTime();
    if (n === RegExp) return t.toString() === e.toString();
    if (n === Array) {
      if ((r = t.length) === e.length)
        for (; r-- && ii(t[r], e[r]); ) ;
      return r === -1;
    }
    if (n === Set) {
      if (t.size !== e.size)
        return !1;
      for (r of t)
        if (i = r, i && typeof i == "object" && (i = dh(e, i), !i) || !e.has(i)) return !1;
      return !0;
    }
    if (n === Map) {
      if (t.size !== e.size)
        return !1;
      for (r of t)
        if (i = r[0], i && typeof i == "object" && (i = dh(e, i), !i) || !ii(r[1], e.get(i)))
          return !1;
      return !0;
    }
    if (n === ArrayBuffer)
      t = new Uint8Array(t), e = new Uint8Array(e);
    else if (n === DataView) {
      if ((r = t.byteLength) === e.byteLength)
        for (; r-- && t.getInt8(r) === e.getInt8(r); ) ;
      return r === -1;
    }
    if (ArrayBuffer.isView(t)) {
      if ((r = t.byteLength) === e.byteLength)
        for (; r-- && t[r] === e[r]; ) ;
      return r === -1;
    }
    if (!n || typeof t == "object") {
      r = 0;
      for (n in t)
        if (hh.call(t, n) && ++r && !hh.call(e, n) || !(n in e) || !ii(t[n], e[n])) return !1;
      return Object.keys(e).length === r;
    }
  }
  return t !== t && e !== e;
}
let ia, wg, xg, Cg, Sg = !0;
typeof process < "u" && ({ FORCE_COLOR: ia, NODE_DISABLE_COLORS: wg, NO_COLOR: xg, TERM: Cg } = process.env || {}, Sg = process.stdout && process.stdout.isTTY);
const U = {
  enabled: !wg && xg == null && Cg !== "dumb" && (ia != null && ia !== "0" || Sg),
  // modifiers
  reset: re(0, 0),
  bold: re(1, 22),
  dim: re(2, 22),
  italic: re(3, 23),
  underline: re(4, 24),
  inverse: re(7, 27),
  hidden: re(8, 28),
  strikethrough: re(9, 29),
  // colors
  black: re(30, 39),
  red: re(31, 39),
  green: re(32, 39),
  yellow: re(33, 39),
  blue: re(34, 39),
  magenta: re(35, 39),
  cyan: re(36, 39),
  white: re(37, 39),
  gray: re(90, 39),
  grey: re(90, 39),
  // background colors
  bgBlack: re(40, 49),
  bgRed: re(41, 49),
  bgGreen: re(42, 49),
  bgYellow: re(43, 49),
  bgBlue: re(44, 49),
  bgMagenta: re(45, 49),
  bgCyan: re(46, 49),
  bgWhite: re(47, 49)
};
function ph(t, e) {
  let n = 0, r, i = "", o = "";
  for (; n < t.length; n++)
    r = t[n], i += r.open, o += r.close, ~e.indexOf(r.close) && (e = e.replace(r.rgx, r.close + r.open));
  return i + e + o;
}
function bI(t, e) {
  let n = { has: t, keys: e };
  return n.reset = U.reset.bind(n), n.bold = U.bold.bind(n), n.dim = U.dim.bind(n), n.italic = U.italic.bind(n), n.underline = U.underline.bind(n), n.inverse = U.inverse.bind(n), n.hidden = U.hidden.bind(n), n.strikethrough = U.strikethrough.bind(n), n.black = U.black.bind(n), n.red = U.red.bind(n), n.green = U.green.bind(n), n.yellow = U.yellow.bind(n), n.blue = U.blue.bind(n), n.magenta = U.magenta.bind(n), n.cyan = U.cyan.bind(n), n.white = U.white.bind(n), n.gray = U.gray.bind(n), n.grey = U.grey.bind(n), n.bgBlack = U.bgBlack.bind(n), n.bgRed = U.bgRed.bind(n), n.bgGreen = U.bgGreen.bind(n), n.bgYellow = U.bgYellow.bind(n), n.bgBlue = U.bgBlue.bind(n), n.bgMagenta = U.bgMagenta.bind(n), n.bgCyan = U.bgCyan.bind(n), n.bgWhite = U.bgWhite.bind(n), n;
}
function re(t, e) {
  let n = {
    open: `\x1B[${t}m`,
    close: `\x1B[${e}m`,
    rgx: new RegExp(`\\x1b\\[${e}m`, "g")
  };
  return function(r) {
    return this !== void 0 && this.has !== void 0 ? (~this.has.indexOf(t) || (this.has.push(t), this.keys.push(n)), r === void 0 ? this : U.enabled ? ph(this.keys, r + "") : r + "") : r === void 0 ? bI([t], [n]) : U.enabled ? ph([n], r + "") : r + "";
  };
}
function pn() {
}
pn.prototype = {
  diff: function(e, n) {
    var r, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = i.callback;
    typeof i == "function" && (o = i, i = {}), this.options = i;
    var s = this;
    function l(I) {
      return o ? (setTimeout(function() {
        o(void 0, I);
      }, 0), !0) : I;
    }
    e = this.castInput(e), n = this.castInput(n), e = this.removeEmpty(this.tokenize(e)), n = this.removeEmpty(this.tokenize(n));
    var a = n.length, c = e.length, u = 1, f = a + c;
    i.maxEditLength && (f = Math.min(f, i.maxEditLength));
    var h = (r = i.timeout) !== null && r !== void 0 ? r : 1 / 0, d = Date.now() + h, p = [{
      oldPos: -1,
      lastComponent: void 0
    }], m = this.extractCommon(p[0], n, e, 0);
    if (p[0].oldPos + 1 >= c && m + 1 >= a)
      return l([{
        value: this.join(n),
        count: n.length
      }]);
    var y = -1 / 0, g = 1 / 0;
    function S() {
      for (var I = Math.max(y, -u); I <= Math.min(g, u); I += 2) {
        var A = void 0, x = p[I - 1], R = p[I + 1];
        x && (p[I - 1] = void 0);
        var O = !1;
        if (R) {
          var L = R.oldPos - I;
          O = R && 0 <= L && L < a;
        }
        var w = x && x.oldPos + 1 < c;
        if (!O && !w) {
          p[I] = void 0;
          continue;
        }
        if (!w || O && x.oldPos + 1 < R.oldPos ? A = s.addToPath(R, !0, void 0, 0) : A = s.addToPath(x, void 0, !0, 1), m = s.extractCommon(A, n, e, I), A.oldPos + 1 >= c && m + 1 >= a)
          return l(wI(s, A.lastComponent, n, e, s.useLongestToken));
        p[I] = A, A.oldPos + 1 >= c && (g = Math.min(g, I - 1)), m + 1 >= a && (y = Math.max(y, I + 1));
      }
      u++;
    }
    if (o)
      (function I() {
        setTimeout(function() {
          if (u > f || Date.now() > d)
            return o();
          S() || I();
        }, 0);
      })();
    else
      for (; u <= f && Date.now() <= d; ) {
        var C = S();
        if (C)
          return C;
      }
  },
  addToPath: function(e, n, r, i) {
    var o = e.lastComponent;
    return o && o.added === n && o.removed === r ? {
      oldPos: e.oldPos + i,
      lastComponent: {
        count: o.count + 1,
        added: n,
        removed: r,
        previousComponent: o.previousComponent
      }
    } : {
      oldPos: e.oldPos + i,
      lastComponent: {
        count: 1,
        added: n,
        removed: r,
        previousComponent: o
      }
    };
  },
  extractCommon: function(e, n, r, i) {
    for (var o = n.length, s = r.length, l = e.oldPos, a = l - i, c = 0; a + 1 < o && l + 1 < s && this.equals(n[a + 1], r[l + 1]); )
      a++, l++, c++;
    return c && (e.lastComponent = {
      count: c,
      previousComponent: e.lastComponent
    }), e.oldPos = l, a;
  },
  equals: function(e, n) {
    return this.options.comparator ? this.options.comparator(e, n) : e === n || this.options.ignoreCase && e.toLowerCase() === n.toLowerCase();
  },
  removeEmpty: function(e) {
    for (var n = [], r = 0; r < e.length; r++)
      e[r] && n.push(e[r]);
    return n;
  },
  castInput: function(e) {
    return e;
  },
  tokenize: function(e) {
    return e.split("");
  },
  join: function(e) {
    return e.join("");
  }
};
function wI(t, e, n, r, i) {
  for (var o = [], s; e; )
    o.push(e), s = e.previousComponent, delete e.previousComponent, e = s;
  o.reverse();
  for (var l = 0, a = o.length, c = 0, u = 0; l < a; l++) {
    var f = o[l];
    if (f.removed) {
      if (f.value = t.join(r.slice(u, u + f.count)), u += f.count, l && o[l - 1].added) {
        var d = o[l - 1];
        o[l - 1] = o[l], o[l] = d;
      }
    } else {
      if (!f.added && i) {
        var h = n.slice(c, c + f.count);
        h = h.map(function(m, y) {
          var g = r[u + y];
          return g.length > m.length ? g : m;
        }), f.value = t.join(h);
      } else
        f.value = t.join(n.slice(c, c + f.count));
      c += f.count, f.added || (u += f.count);
    }
  }
  var p = o[a - 1];
  return a > 1 && typeof p.value == "string" && (p.added || p.removed) && t.equals("", p.value) && (o[a - 2].value += p.value, o.pop()), o;
}
var mh = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/, gh = /\S/, Mg = new pn();
Mg.equals = function(t, e) {
  return this.options.ignoreCase && (t = t.toLowerCase(), e = e.toLowerCase()), t === e || this.options.ignoreWhitespace && !gh.test(t) && !gh.test(e);
};
Mg.tokenize = function(t) {
  for (var e = t.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), n = 0; n < e.length - 1; n++)
    !e[n + 1] && e[n + 2] && mh.test(e[n]) && mh.test(e[n + 2]) && (e[n] += e[n + 2], e.splice(n + 1, 2), n--);
  return e;
};
var Tg = new pn();
Tg.tokenize = function(t) {
  this.options.stripTrailingCr && (t = t.replace(/\r\n/g, `
`));
  var e = [], n = t.split(/(\n|\r\n)/);
  n[n.length - 1] || n.pop();
  for (var r = 0; r < n.length; r++) {
    var i = n[r];
    r % 2 && !this.options.newlineIsToken ? e[e.length - 1] += i : (this.options.ignoreWhitespace && (i = i.trim()), e.push(i));
  }
  return e;
};
var xI = new pn();
xI.tokenize = function(t) {
  return t.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var CI = new pn();
CI.tokenize = function(t) {
  return t.split(/([{}:;,]|\s+)/);
};
function ho(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ho = function(e) {
    return typeof e;
  } : ho = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ho(t);
}
var SI = Object.prototype.toString, gi = new pn();
gi.useLongestToken = !0;
gi.tokenize = Tg.tokenize;
gi.castInput = function(t) {
  var e = this.options, n = e.undefinedReplacement, r = e.stringifyReplacer, i = r === void 0 ? function(o, s) {
    return typeof s > "u" ? n : s;
  } : r;
  return typeof t == "string" ? t : JSON.stringify(oa(t, null, null, i), i, "  ");
};
gi.equals = function(t, e) {
  return pn.prototype.equals.call(gi, t.replace(/,([\r\n])/g, "$1"), e.replace(/,([\r\n])/g, "$1"));
};
function oa(t, e, n, r, i) {
  e = e || [], n = n || [], r && (t = r(i, t));
  var o;
  for (o = 0; o < e.length; o += 1)
    if (e[o] === t)
      return n[o];
  var s;
  if (SI.call(t) === "[object Array]") {
    for (e.push(t), s = new Array(t.length), n.push(s), o = 0; o < t.length; o += 1)
      s[o] = oa(t[o], e, n, r, i);
    return e.pop(), n.pop(), s;
  }
  if (t && t.toJSON && (t = t.toJSON()), ho(t) === "object" && t !== null) {
    e.push(t), s = {}, n.push(s);
    var l = [], a;
    for (a in t)
      t.hasOwnProperty(a) && l.push(a);
    for (l.sort(), o = 0; o < l.length; o += 1)
      a = l[o], s[a] = oa(t[a], e, n, r, a);
    e.pop(), n.pop();
  } else
    s = t;
  return s;
}
var sa = new pn();
sa.tokenize = function(t) {
  return t.slice();
};
sa.join = sa.removeEmpty = function(t) {
  return t;
};
U.red, U.grey, U.green;
U.dim().italic;
U.dim("→");
U.dim("·");
U.dim("↵");
function Po(t) {
  t = t.replace(/\r?\n/g, `
`);
  let e = t.match(/^[ \t]*(?=\S)/gm), n = 0, r = 1 / 0, i = (e || []).length;
  for (; n < i; n++) r = Math.min(r, e[n].length);
  return i && r ? t.replace(new RegExp(`^[ \\t]{${r}}`, "gm"), "") : t;
}
class MI extends Error {
  constructor(e = {}) {
    super(e.message), this.name = "Assertion", this.code = "ERR_ASSERTION", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.details = e.details || !1, this.generated = !!e.generated, this.operator = e.operator, this.expects = e.expects, this.actual = e.actual;
  }
}
function Xe(t, e, n, r, i, o, s) {
  if (t) return;
  let l = s || o;
  if (s instanceof Error) throw s;
  let a = i;
  throw new MI({ actual: e, expects: n, operator: r, message: l, details: a, generated: !s });
}
function TI(t, e) {
  Xe(!!t, !1, !0, "ok", !1, "Expected value to be truthy", e);
}
function Bt(t, e) {
  Xe(!t, !0, !1, "not", !1, "Expected value to be falsey", e);
}
Bt.ok = Bt;
Bt.equal = function(t, e, n) {
  Xe(!ii(t, e), t, e, "not.equal", !1, "Expected values not to be deeply equal", n);
};
Bt.type = function(t, e, n) {
  let r = typeof t;
  Xe(r !== e, r, e, "not.type", !1, `Expected "${r}" not to be "${e}"`, n);
};
Bt.instance = function(t, e, n) {
  let r = "`" + (e.name || e.constructor.name) + "`";
  Xe(!(t instanceof e), t, e, "not.instance", !1, `Expected value not to be an instance of ${r}`, n);
};
Bt.snapshot = function(t, e, n) {
  t = Po(t), e = Po(e), Xe(t !== e, t, e, "not.snapshot", !1, "Expected value not to match snapshot", n);
};
Bt.fixture = function(t, e, n) {
  t = Po(t), e = Po(e), Xe(t !== e, t, e, "not.fixture", !1, "Expected value not to match fixture", n);
};
Bt.match = function(t, e, n) {
  typeof e == "string" ? Xe(!t.includes(e), t, e, "not.match", !1, `Expected value not to include "${e}" substring`, n) : Xe(!e.test(t), t, e, "not.match", !1, `Expected value not to match \`${String(e)}\` pattern`, n);
};
Bt.throws = function(t, e, n) {
  !n && typeof e == "string" && (n = e, e = null);
  try {
    t();
  } catch (r) {
    typeof e == "function" ? Xe(!e(r), !0, !1, "not.throws", !1, "Expected function not to throw matching exception", n) : e instanceof RegExp ? Xe(!e.test(r.message), !0, !1, "not.throws", !1, `Expected function not to throw exception matching \`${String(e)}\` pattern`, n) : e || Xe(!1, !0, !1, "not.throws", !1, "Expected function not to throw", n);
  }
};
const Or = (
  /** @type {const} */
  {
    equalsTo: 61
  }
), yh = (
  /** @type {const} */
  {
    attentionSideAfter: 2
  }
), kh = (
  /** @type {const} */
  {
    // Generic type for data, such as in a title, a destination, etc.
    data: "data",
    // A whole character escape (`\-`).
    // Includes `escapeMarker` and `characterEscapeValue`.
    characterEscape: "characterEscape"
  }
);
var Dr = "highlightSequenceTemporary", bh = "highlightSequence", NI = "highlight", II = "highlightText";
function AI() {
  const t = {
    name: "highlight",
    tokenize: n,
    resolveAll: e
  };
  return {
    text: { [Or.equalsTo]: t },
    insideSpan: { null: [t] },
    attentionMarkers: { null: [Or.equalsTo] }
  };
  function e(r, i) {
    let o = -1;
    for (; ++o < r.length; )
      if (r[o][0] === "enter" && r[o][1].type === Dr && r[o][1]._close) {
        let s = o;
        for (; s--; )
          if (r[s][0] === "exit" && r[s][1].type === Dr && r[s][1]._open && // If the sizes are the same:
          r[o][1].end.offset - r[o][1].start.offset === r[s][1].end.offset - r[s][1].start.offset) {
            r[o][1].type = bh, r[s][1].type = bh;
            const l = {
              type: NI,
              start: Object.assign({}, r[s][1].start),
              end: Object.assign({}, r[o][1].end)
            }, a = {
              type: II,
              start: Object.assign({}, r[s][1].end),
              end: Object.assign({}, r[o][1].start)
            }, c = [
              ["enter", l, i],
              ["enter", r[s][1], i],
              ["exit", r[s][1], i],
              ["enter", a, i]
            ], u = i.parser.constructs.insideSpan.null;
            u && Te(
              c,
              c.length,
              0,
              yi(u, r.slice(s + 1, o), i)
            ), Te(c, c.length, 0, [
              ["exit", a, i],
              ["enter", r[o][1], i],
              ["exit", r[o][1], i],
              ["exit", l, i]
            ]), Te(r, s - 1, o - s + 3, c), o = s + c.length - 2;
            break;
          }
      }
    for (o = -1; ++o < r.length; )
      r[o][1].type === Dr && (r[o][1].type = kh.data);
    return r;
  }
  function n(r, i, o) {
    const s = this.previous, l = this.events;
    let a = 0;
    return c;
    function c(f) {
      return TI(f === Or.equalsTo, "expected `=`"), s === Or.equalsTo && l[l.length - 1][1].type !== kh.characterEscape ? o(f) : (r.enter(Dr), u(f));
    }
    function u(f) {
      const h = nn(s);
      if (f === Or.equalsTo)
        return a > 1 ? o(f) : (r.consume(f), a++, u);
      if (a < 2) return o(f);
      const d = r.exit(Dr), p = nn(f);
      return d._open = !p || p === yh.attentionSideAfter && !!h, d._close = !h || h === yh.attentionSideAfter && !!p, i(f);
    }
  }
}
const Ng = F(
  "wrapInHighlighCommand",
  (t) => () => wi(qc.type(t))
), EI = Re((t) => gr(
  /(?:\=\=)(?:\{([^}]+)\})?([^=]+)(?:\=\=)$/,
  qc.type(t),
  {
    getAttr: (e) => ({
      color: e[1] || null
    })
  }
)), ul = "#f9b3a9", qc = qn("mark", () => ({
  attrs: {
    color: {
      default: ul,
      validate: "string"
    }
  },
  parseDOM: [
    {
      tag: "mark",
      getAttrs: (t) => ({
        color: t.style.backgroundColor || ul
      })
    }
  ],
  toDOM: (t) => [
    "mark",
    { style: `background-color: ${t.attrs.color}` }
  ],
  parseMarkdown: {
    match: (t) => t.type === "mark",
    runner: (t, e, n) => {
      const r = e.data && e.data.color;
      t.openMark(n, { color: r }), t.next(e.children), t.closeMark(n);
    }
  },
  toMarkdown: {
    match: (t) => t.type.name === "mark",
    runner: (t, e) => {
      let n = e.attrs.color;
      n && n.toLowerCase() === ul.toLowerCase() && (n = void 0), t.withMark(e, "mark", void 0, {
        data: { color: n }
      });
    }
  }
}));
function OI() {
  const t = this.data();
  return fl(t, "micromarkExtensions", AI()), fl(t, "fromMarkdownExtensions", vI), fl(t, "toMarkdownExtensions", RI), (e) => {
    Wn(e, "highlight", (n, r, i) => {
      if (!i) return;
      const o = n.children[0];
      let s;
      if (o && o.type === "text") {
        const l = /^\{([^}]+)\}/.exec(o.value);
        l && (s = l[1], o.value = o.value.slice(l[0].length), o.value.length === 0 && n.children.shift());
      }
      n.type = "mark", s && (n.data = { ...n.data || {}, color: s }), i.children[r] = n;
    });
  };
}
const DI = (t, e, n, r) => {
  const o = n.createTracker(r), s = n.enter("mark");
  let l = o.move("==");
  return t.data && t.data.color && (l += o.move("{" + t.data.color + "}")), l += o.move(
    n.containerPhrasing(t, {
      before: l,
      after: "==",
      ...o.current()
    })
  ), l += o.move("=="), s(), l;
}, RI = {
  unsafe: [
    {
      character: "=",
      inConstruct: "phrasing",
      notInConstruct: [
        "autolink",
        "destinationLiteral",
        "destinationRaw",
        "reference",
        "titleQuote",
        "titleApostrophe"
      ]
    }
  ],
  handlers: {
    mark: DI
  }
};
function fl(t, e, n) {
  const r = t[e] = t[e] || [];
  if (Array.isArray(n))
    for (const i of n)
      r.includes(i) || r.push(i);
  else
    r.includes(n) || r.push(n);
}
const vI = {
  canContainEols: ["mark"],
  enter: { highlight: LI },
  exit: { highlight: PI }
};
function LI(t) {
  this.enter({ type: "mark", children: [], data: {} }, t);
}
function PI(t) {
  const e = this.stack[this.stack.length - 1];
  if (e && e.children && e.children.length) {
    const n = e.children[0];
    if (n?.type === "text") {
      const r = /^\{([^}]+)\}/.exec(n.value);
      r && (e.data = { ...e.data || {}, color: r[1] }, n.value = n.value.slice(r[0].length), n.value.length === 0 && e.children.shift());
    }
  }
  this.exit(t);
}
function zI(t, e) {
  const n = document.createElement("div");
  return n.classList.add("mayfly-toolbar"), n.append(
    kI(t),
    // Dropdown
    Mn("B", Qo, t),
    //Bold
    Mn("I", Yo, t),
    //Italic
    Mn("Strikethrough", is, t),
    //Italic
    Mn("Highlight", Ng, t),
    //Italic
    yI("🔗", t)
  ), e.customButton.length != 0 && e.customButton.forEach((i) => {
    n.append(i);
  }), (i) => {
    const o = new pI({
      content: n,
      shouldShow: (a) => {
        const { from: c, to: u } = a.state.selection;
        return c !== u && e.editable == !0;
      }
    }), s = (a) => {
      n.contains(a.relatedTarget) || (n.style.display = "none");
    }, l = i.dom;
    return l.addEventListener("blur", s), {
      update: (a, c) => {
        const { from: u, to: f } = a.state.selection;
        console.log(a), u !== f && e.editable == !0 ? n.style.display = "flex" : n.style.display = "none", o.update(a, c);
      },
      destroy: () => {
        o.destroy(), n.remove(), l.removeEventListener("blur", s, !0);
      }
    };
  };
}
const VI = (t, e) => {
  const n = document.createElement("button");
  return n.textContent = t, n.className = "milkdown-btn", n.onclick = () => {
    e();
  }, n;
};
class HI {
  constructor() {
    this.editable = !0, this.created = !1, this.instance = null, this.documentUpdated = () => {
    }, this.textSelected = (e = "") => {
    }, this.focused = () => {
    }, this.customButton = [];
  }
  createEditor = (e) => {
    const n = mI("toolbar"), r = fn("markColor", () => OI);
    za.make().config((i) => {
      i.set(ps.key, {
        shouldAppend: (o, s) => s.doc.childCount === 1,
        getNode: (o) => o.schema.nodes.paragraph.create()
      }), i.set(Go.key, {
        // Remap to one shortcut.
        Undo: "Mod-z",
        // Remap to multiple shortcuts.
        Redo: ["Mod-y", "Shift-Mod-z"]
      }), i.set(n.key, {
        view: zI(i, this)
      }), i.set(ao, document.getElementById(e)), i.update(ni, (o) => ({
        ...o,
        editable: () => this.editable
      })), i.get(ri).focus(() => {
        this.focused();
      }), i.get(ri).markdownUpdated(() => {
        this.documentUpdated();
      }), i.get(ri).selectionUpdated(
        (o, s, l) => {
          const a = o.get(st), c = o.get(Dn), { from: u, to: f } = s;
          if (u !== f) {
            const h = a.state.doc.cut(u, f), d = c(h);
            this.textSelected(d);
          }
        }
      );
    }).use(gI).use(CC).use(bg).use(n).use(AS).use(NN).use(r).use(Kp).use(qc).use(EI).use(Ng).create().then((i) => {
      this.instance = i, this.created = !0;
    });
  };
  //Available Methods
  toggleReadOnly() {
    this.editable = !1;
  }
  toggleEditable() {
    this.editable = !0;
  }
  getContent(e = null) {
    return e == null ? this.instance.action(Of(e)) : this.instance.action(Of());
  }
  replaceContent(e) {
    this.instance.action(xC(e));
  }
}
export {
  HI as MdEditor,
  VI as makeCustomButton
};
