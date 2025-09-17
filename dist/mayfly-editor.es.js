var Ce = /* @__PURE__ */ ((n) => (n.docTypeError = "docTypeError", n.contextNotFound = "contextNotFound", n.timerNotFound = "timerNotFound", n.ctxCallOutOfScope = "ctxCallOutOfScope", n.createNodeInParserFail = "createNodeInParserFail", n.stackOverFlow = "stackOverFlow", n.parserMatchError = "parserMatchError", n.serializerMatchError = "serializerMatchError", n.getAtomFromSchemaFail = "getAtomFromSchemaFail", n.expectDomTypeError = "expectDomTypeError", n.callCommandBeforeEditorView = "callCommandBeforeEditorView", n.missingRootElement = "missingRootElement", n.missingNodeInSchema = "missingNodeInSchema", n.missingMarkInSchema = "missingMarkInSchema", n.ctxNotBind = "ctxNotBind", n.missingYjsDoc = "missingYjsDoc", n))(Ce || {});
class Ae extends Error {
  constructor(e, t) {
    super(t), this.name = "MilkdownError", this.code = e;
  }
}
const Ad = (n, e) => typeof e == "function" ? "[Function]" : e, Hi = (n) => JSON.stringify(n, Ad);
function Dd(n) {
  return new Ae(
    Ce.docTypeError,
    `Doc type error, unsupported type: ${Hi(n)}`
  );
}
function vd(n) {
  return new Ae(
    Ce.contextNotFound,
    `Context "${n}" not found, do you forget to inject it?`
  );
}
function Rd(n) {
  return new Ae(
    Ce.timerNotFound,
    `Timer "${n}" not found, do you forget to record it?`
  );
}
function Wi() {
  return new Ae(
    Ce.ctxCallOutOfScope,
    "Should not call a context out of the plugin."
  );
}
function Pd(n, e, t) {
  const i = `Cannot create node for ${"name" in n ? n.name : n}`, s = (u) => {
    if (u == null) return "null";
    if (Array.isArray(u))
      return `[${u.map(s).join(", ")}]`;
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
  }, o = ["[Description]", i], l = ["[Attributes]", e], a = [
    "[Content]",
    (t ?? []).map((u) => u ? typeof u == "object" && "type" in u ? `${u}` : s(u) : "null")
  ], c = [o, l, a].reduce(
    (u, [h, d]) => {
      const f = `${h}: ${s(d)}.`;
      return u.concat(f);
    },
    []
  );
  return new Ae(
    Ce.createNodeInParserFail,
    c.join(`
`)
  );
}
function gu() {
  return new Ae(
    Ce.stackOverFlow,
    "Stack over flow, cannot pop on an empty stack."
  );
}
function Ld(n) {
  return new Ae(
    Ce.parserMatchError,
    `Cannot match target parser for node: ${Hi(n)}.`
  );
}
function Bd(n) {
  return new Ae(
    Ce.serializerMatchError,
    `Cannot match target serializer for node: ${Hi(n)}.`
  );
}
function zd(n, e) {
  return new Ae(
    Ce.getAtomFromSchemaFail,
    `Cannot get ${n}: ${e} from schema.`
  );
}
function yn(n) {
  return new Ae(
    Ce.expectDomTypeError,
    `Expect to be a dom, but get: ${Hi(n)}.`
  );
}
function ys() {
  return new Ae(
    Ce.callCommandBeforeEditorView,
    "You're trying to call a command before editor view initialized, make sure to get commandManager from ctx after editor view has been initialized"
  );
}
function Fd(n) {
  return new Ae(
    Ce.missingNodeInSchema,
    `Missing node in schema, milkdown cannot find "${n}" in schema.`
  );
}
function Vd(n) {
  return new Ae(
    Ce.missingMarkInSchema,
    `Missing mark in schema, milkdown cannot find "${n}" in schema.`
  );
}
class yu {
  constructor() {
    this.sliceMap = /* @__PURE__ */ new Map(), this.get = (e) => {
      const t = typeof e == "string" ? [...this.sliceMap.values()].find((r) => r.type.name === e) : this.sliceMap.get(e.id);
      if (!t) {
        const r = typeof e == "string" ? e : e.name;
        throw vd(r);
      }
      return t;
    }, this.remove = (e) => {
      const t = typeof e == "string" ? [...this.sliceMap.values()].find((r) => r.type.name === e) : this.sliceMap.get(e.id);
      t && this.sliceMap.delete(t.type.id);
    }, this.has = (e) => typeof e == "string" ? [...this.sliceMap.values()].some((t) => t.type.name === e) : this.sliceMap.has(e.id);
  }
}
let _d = class {
  /// @internal
  constructor(e, t, r) {
    this.#t = [], this.#r = () => {
      this.#t.forEach((i) => i(this.#e));
    }, this.set = (i) => {
      this.#e = i, this.#r();
    }, this.get = () => this.#e, this.update = (i) => {
      this.#e = i(this.#e), this.#r();
    }, this.type = r, this.#e = t, e.set(r.id, this);
  }
  #t;
  /// @internal
  #e;
  #r;
  /// Add a watcher for changes in the slice.
  /// Returns a function to remove the watcher.
  on(e) {
    return this.#t.push(e), () => {
      this.#t = this.#t.filter((t) => t !== e);
    };
  }
  /// Add a one-time watcher for changes in the slice.
  /// The watcher will be removed after it is called.
  /// Returns a function to remove the watcher.
  once(e) {
    const t = this.on((r) => {
      e(r), t();
    });
    return t;
  }
  /// Remove a watcher.
  off(e) {
    this.#t = this.#t.filter((t) => t !== e);
  }
  /// Remove all watchers.
  offAll() {
    this.#t = [];
  }
};
class $d {
  /// Create a slice type with a default value and a name.
  /// The name should be unique in the container.
  constructor(e, t) {
    this.id = Symbol(`Context-${t}`), this.name = t, this._defaultValue = e, this._typeInfo = () => {
      throw Wi();
    };
  }
  /// Create a slice with a container.
  /// You can also pass a value to override the default value.
  create(e, t = this._defaultValue) {
    return new _d(e, t, this);
  }
}
const j = (n, e) => new $d(n, e);
class Hd {
  /// Create an inspector with container, clock and metadata.
  constructor(e, t, r) {
    this.#n = /* @__PURE__ */ new Set(), this.#l = /* @__PURE__ */ new Set(), this.#s = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.read = () => ({
      metadata: this.#t,
      injectedSlices: [...this.#n].map((i) => ({
        name: typeof i == "string" ? i : i.name,
        value: this.#o(i)
      })),
      consumedSlices: [...this.#l].map((i) => ({
        name: typeof i == "string" ? i : i.name,
        value: this.#o(i)
      })),
      recordedTimers: [...this.#s].map(
        ([i, { duration: s }]) => ({
          name: i.name,
          duration: s,
          status: this.#a(i)
        })
      ),
      waitTimers: [...this.#i].map(([i, { duration: s }]) => ({
        name: i.name,
        duration: s,
        status: this.#a(i)
      }))
    }), this.onRecord = (i) => {
      this.#s.set(i, { start: Date.now(), duration: 0 });
    }, this.onClear = (i) => {
      this.#s.delete(i);
    }, this.onDone = (i) => {
      const s = this.#s.get(i);
      s && (s.duration = Date.now() - s.start);
    }, this.onWait = (i, s) => {
      const o = Date.now();
      s.finally(() => {
        this.#i.set(i, { duration: Date.now() - o });
      }).catch(console.error);
    }, this.onInject = (i) => {
      this.#n.add(i);
    }, this.onRemove = (i) => {
      this.#n.delete(i);
    }, this.onUse = (i) => {
      this.#l.add(i);
    }, this.#o = (i) => this.#e.get(i).get(), this.#a = (i) => this.#r.get(i).status, this.#e = e, this.#r = t, this.#t = r;
  }
  /// @internal
  #t;
  /// @internal
  #e;
  /// @internal
  #r;
  #n;
  #l;
  #s;
  #i;
  #o;
  #a;
}
class qo {
  /// Create a ctx object with container and clock.
  constructor(e, t, r) {
    this.produce = (i) => i && Object.keys(i).length ? new qo(this.#t, this.#e, { ...i }) : this, this.inject = (i, s) => {
      const o = i.create(this.#t.sliceMap);
      return s != null && o.set(s), this.#n?.onInject(i), this;
    }, this.remove = (i) => (this.#t.remove(i), this.#n?.onRemove(i), this), this.record = (i) => (i.create(this.#e.store), this.#n?.onRecord(i), this), this.clearTimer = (i) => (this.#e.remove(i), this.#n?.onClear(i), this), this.isInjected = (i) => this.#t.has(i), this.isRecorded = (i) => this.#e.has(i), this.use = (i) => (this.#n?.onUse(i), this.#t.get(i)), this.get = (i) => this.use(i).get(), this.set = (i, s) => this.use(i).set(s), this.update = (i, s) => this.use(i).update(s), this.timer = (i) => this.#e.get(i), this.done = (i) => {
      this.timer(i).done(), this.#n?.onDone(i);
    }, this.wait = (i) => {
      const s = this.timer(i).start();
      return this.#n?.onWait(i, s), s;
    }, this.waitTimers = async (i) => {
      await Promise.all(this.get(i).map((s) => this.wait(s)));
    }, this.#t = e, this.#e = t, this.#r = r, r && (this.#n = new Hd(e, t, r));
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
class Wd {
  constructor() {
    this.store = /* @__PURE__ */ new Map(), this.get = (e) => {
      const t = this.store.get(e.id);
      if (!t) throw Rd(e.name);
      return t;
    }, this.remove = (e) => {
      this.store.delete(e.id);
    }, this.has = (e) => this.store.has(e.id);
  }
}
class jd {
  /// @internal
  constructor(e, t) {
    this.#t = null, this.#e = null, this.#n = "pending", this.start = () => (this.#t ??= new Promise((r, i) => {
      this.#e = (s) => {
        s instanceof CustomEvent && s.detail.id === this.#r && (this.#n = "resolved", this.#l(), s.stopImmediatePropagation(), r());
      }, this.#s(() => {
        this.#n === "pending" && (this.#n = "rejected"), this.#l(), i(new Error(`Timing ${this.type.name} timeout.`));
      }), this.#n = "pending", addEventListener(this.type.name, this.#e);
    }), this.#t), this.done = () => {
      const r = new CustomEvent(this.type.name, {
        detail: { id: this.#r }
      });
      dispatchEvent(r);
    }, this.#l = () => {
      this.#e && removeEventListener(this.type.name, this.#e);
    }, this.#s = (r) => {
      setTimeout(() => {
        r();
      }, this.type.timeout);
    }, this.#r = Symbol(t.name), this.type = t, e.set(t.id, this);
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
  #s;
}
class qd {
  /// Create a timer type with a name and a timeout.
  /// The name should be unique in the clock.
  constructor(e, t = 3e3) {
    this.create = (r) => new jd(r, this), this.id = Symbol(`Timer-${e}`), this.name = e, this.timeout = t;
  }
}
const Ct = (n, e = 3e3) => new qd(n, e);
function ue(n) {
  this.content = n;
}
ue.prototype = {
  constructor: ue,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), s = r.content.slice();
    return i == -1 ? s.push(t || n, e) : (s[i + 1] = e, t && (s[i] = t)), new ue(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new ue(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new ue([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new ue(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new ue(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = ue.from(n), n.size ? new ue(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = ue.from(n), n.size ? new ue(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = ue.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
ue.from = function(n) {
  if (n instanceof ue) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new ue(e);
};
function ku(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return t;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        t++;
      return t;
    }
    if (i.content.size || s.content.size) {
      let o = ku(i.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function xu(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: t, b: r };
    let o = n.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      t -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, u = Math.min(o.text.length, l.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = xu(o.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class M {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
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
  textBetween(e, t, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
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
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new M(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new M(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? M.empty : e == 0 && t == this.content.length ? this : new M(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new M(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new M([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new M(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
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
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
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
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return ku(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return xu(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Xr(0, e);
    if (e == this.size)
      return Xr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), s = r + i.nodeSize;
      if (s >= e)
        return s == e ? Xr(t + 1, s) : Xr(t, r);
      r = s;
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
  static fromJSON(e, t) {
    if (!t)
      return M.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new M(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return M.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new M(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return M.empty;
    if (e instanceof M)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new M([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
M.empty = new M([], 0);
const ks = { index: 0, offset: 0 };
function Xr(n, e) {
  return ks.index = n, ks.offset = e, ks;
}
function wi(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!wi(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !wi(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
class W {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && wi(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return W.none;
    if (e instanceof W)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
}
W.none = [];
class Si extends Error {
}
class I {
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
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
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
  insertAt(e, t) {
    let r = wu(this.content, e + this.openStart, t);
    return r && new I(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new I(bu(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
  static fromJSON(e, t) {
    if (!t)
      return I.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new I(M.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new I(e, r, i);
  }
}
I.empty = new I(M.empty, 0, 0);
function bu(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), s = n.maybeChild(r), { index: o, offset: l } = n.findIndex(t);
  if (i == e || s.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(bu(s.content, e - i - 1, t - i - 1)));
}
function wu(n, e, t, r) {
  let { index: i, offset: s } = n.findIndex(e), o = n.maybeChild(i);
  if (s == e || o.isText)
    return r && !r.canReplace(i, i, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let l = wu(o.content, e - s - 1, t, o);
  return l && n.replaceChild(i, o.copy(l));
}
function Kd(n, e, t) {
  if (t.openStart > n.depth)
    throw new Si("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Si("Inconsistent open depths");
  return Su(n, e, t, 0);
}
function Su(n, e, t, r) {
  let i = n.index(r), s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = Su(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, l = o.content;
      return nn(o, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = Jd(t, n);
      return nn(s, Mu(n, o, l, e, r));
    }
  else return nn(s, Ci(n, e, r));
}
function Cu(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Si("Cannot join " + e.type.name + " onto " + n.type.name);
}
function io(n, e, t) {
  let r = n.node(t);
  return Cu(r, e.node(t)), r;
}
function tn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function gr(n, e, t, r) {
  let i = (e || n).node(t), s = 0, o = e ? e.index(t) : i.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (tn(n.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    tn(i.child(l), r);
  e && e.depth == t && e.textOffset && tn(e.nodeBefore, r);
}
function nn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Mu(n, e, t, r, i) {
  let s = n.depth > i && io(n, e, i + 1), o = r.depth > i && io(t, r, i + 1), l = [];
  return gr(null, n, i, l), s && o && e.index(i) == t.index(i) ? (Cu(s, o), tn(nn(s, Mu(n, e, t, r, i + 1)), l)) : (s && tn(nn(s, Ci(n, e, i + 1)), l), gr(e, t, i, l), o && tn(nn(o, Ci(t, r, i + 1)), l)), gr(r, null, i, l), new M(l);
}
function Ci(n, e, t) {
  let r = [];
  if (gr(null, n, t, r), n.depth > t) {
    let i = io(n, e, t + 1);
    tn(nn(i, Ci(n, e, t + 1)), r);
  }
  return gr(e, null, t, r), new M(r);
}
function Jd(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    i = e.node(s).copy(M.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Ar {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
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
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return W.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
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
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
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
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new Nu(this, e, r);
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
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, s = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new Ar(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = wa.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == t)
          return o;
      }
    else
      wa.set(e, r = new Ud());
    let i = r.elts[r.i] = Ar.resolve(e, t);
    return r.i = (r.i + 1) % Gd, i;
  }
}
class Ud {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Gd = 12, wa = /* @__PURE__ */ new WeakMap();
class Nu {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
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
const Yd = /* @__PURE__ */ Object.create(null);
let bt = class so {
  /**
  @internal
  */
  constructor(e, t, r, i = W.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || M.empty;
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
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
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
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
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
  hasMarkup(e, t, r) {
    return this.type == e && wi(this.attrs, t || e.defaultAttrs || Yd) && W.sameSet(this.marks, r || W.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new so(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new so(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return I.empty;
    let i = this.resolve(e), s = this.resolve(t), o = r ? 0 : i.sharedDepth(t), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new I(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return Kd(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return Ar.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Ar.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Tu(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = M.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
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
    let e = W.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!W.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = M.fromJSON(e, t.content), s = e.nodeType(t.type).create(t.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
};
bt.prototype.text = void 0;
class Mi extends bt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Tu(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Mi(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Mi(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Tu(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class hn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Qd(e, t);
    if (r.next == null)
      return hn.empty;
    let i = Iu(r);
    r.next && r.err("Unexpected trailing text");
    let s = ip(rp(i));
    return sp(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++)
      i = i.matchType(e.child(s).type);
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
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
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
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return M.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: h } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(h) == -1) {
          i.push(h);
          let d = s(h, l.concat(u));
          if (d)
            return d;
        }
      }
      return null;
    }
    return s(this, []);
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
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
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
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
hn.empty = new hn(!0);
class Qd {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
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
function Iu(n) {
  let e = [];
  do
    e.push(Xd(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Xd(n) {
  let e = [];
  do
    e.push(Zd(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Zd(n) {
  let e = np(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = ep(n, e);
    else
      break;
  return e;
}
function Sa(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ep(n, e) {
  let t = Sa(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Sa(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function tp(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function np(n) {
  if (n.eat("(")) {
    let e = Iu(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = tp(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function rp(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          i(s(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            r(a, u), i(s(o.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Ou(n, e) {
  return e - n;
}
function Ca(n, e) {
  let t = [];
  return r(e), t.sort(Ou);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function ip(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Ca(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Ca(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new hn(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(Ou);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || t(l) });
    }
    return s;
  }
}
function sp(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Eu(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Au(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function Du(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let s = n[i];
    s.validate && s.validate(e[i]);
  }
}
function vu(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new lp(n, r, e[r]);
  return t;
}
let Ma = class Ru {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = vu(e, r.attrs), this.defaultAttrs = Eu(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == hn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Au(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new bt(this, this.computeAttrs(e), M.from(t), W.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = M.from(t), this.checkContent(t), new bt(this, this.computeAttrs(e), t, W.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = M.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), s = i && i.fillBefore(M.empty, !0);
    return s ? new bt(this, e, t.append(s), W.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
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
    Du(this.attrs, e, "node", this.name);
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
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : W.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new Ru(s, t, o));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function op(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${s}`);
  };
}
class lp {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? op(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ji {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = vu(e, i.attrs), this.excluded = null;
    let s = Eu(this.attrs);
    this.instance = s ? new W(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new W(this, Au(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new ji(s, i++, t, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Du(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class ap {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = ue.from(e.nodes), t.marks = ue.from(e.marks || {}), this.nodes = Ma.compile(this.spec.nodes, this), this.marks = ji.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = hn.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? Na(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : Na(this, o.split(" "));
    }
    this.nodeFromJSON = (i) => bt.fromJSON(this, i), this.markFromJSON = (i) => W.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Ma) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new Mi(r, r.defaultAttrs, e, W.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function Na(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = n.marks[i], o = s;
    if (s)
      t.push(s);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function cp(n) {
  return n.tag != null;
}
function up(n) {
  return n.style != null;
}
class fn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (cp(i))
        this.tags.push(i);
      else if (up(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = e.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Ia(this, t, !1);
    return r.addAll(e, W.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Ia(this, t, !0);
    return r.addAll(e, W.none, t.from, t.to), I.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (dp(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = Oa(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = Oa(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new fn(e, fn.schemaRules(e)));
  }
}
const Pu = {
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
}, hp = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Lu = { ol: !0, ul: !0 }, Dr = 1, oo = 2, yr = 4;
function Ta(n, e, t) {
  return e != null ? (e ? Dr : 0) | (e === "full" ? oo : 0) : n && n.whitespace == "pre" ? Dr | oo : t & ~yr;
}
class Zr {
  constructor(e, t, r, i, s, o) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = W.none, this.match = s || (o & yr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(M.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Dr)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let t = M.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(M.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Pu.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Ia {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, s, o = Ta(null, t.preserveWhitespace, 0) | (r ? yr : 0);
    i ? s = new Zr(i.type, i.attrs, W.none, !0, t.topMatch || i.type.contentMatch, o) : r ? s = new Zr(null, null, W.none, !0, null, o) : s = new Zr(e.schema.topNodeType, null, W.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top, s = i.options & oo ? "full" : this.localPreserveWS || (i.options & Dr) > 0;
    if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (s)
        s !== "full" ? r = r.replace(/\r?\n|\r/g, " ") : r = r.replace(/\r\n?/g, `
`);
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let o = i.content[i.content.length - 1], l = e.previousSibling;
        (!o || l && l.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = this.localPreserveWS, s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), l;
    Lu.hasOwnProperty(o) && this.parser.normalizeLists && fp(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : hp.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Pu.hasOwnProperty(o))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), c = !0, s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let h = a && a.skip ? t : this.readStyles(e, t);
      h && this.addAll(e, h), c && this.sync(s), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = r.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let s, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && (s = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, r) {
    let i, s;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, s = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(s);
    for (let o = 0; o < i.length; o++)
      t = this.enterInner(i[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (t = this.enterInner(s, null, t));
    }
    let i = this.findPlace(e, t, r);
    if (i) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(e.type));
      let o = W.none;
      for (let l of i.concat(e.marks))
        (s.type ? s.type.allowsMarkType(l.type) : Ea(l.type, e.type)) && (o = l.addToSet(o));
      return s.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let s = this.findPlace(e.create(t), r, !1);
    return s && (s = this.enterInner(e, t, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = Ta(e, s, o.options);
    o.options & yr && o.content.length == 0 && (l |= yr);
    let a = W.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : Ea(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Zr(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= Dr);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function fp(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Lu.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function dp(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Oa(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Ea(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class kn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = xs(t).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, t);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = ni(xs(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
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
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && ni(xs(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return ni(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new kn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Aa(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Aa(e.marks);
  }
}
function Aa(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function xs(n) {
  return n.document || window.document;
}
const Da = /* @__PURE__ */ new WeakMap();
function pp(n) {
  let e = Da.get(n);
  return e === void 0 && Da.set(n, e = mp(n)), e;
}
function mp(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function ni(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = pp(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (t = i.slice(0, o), i = i.slice(o + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let h in c)
      if (c[h] != null) {
        let d = h.indexOf(" ");
        d > 0 ? a.setAttributeNS(h.slice(0, d), h.slice(d + 1), c[h]) : h == "style" && a.style ? a.style.cssText = c[h] : a.setAttribute(h, c[h]);
      }
  }
  for (let h = u; h < e.length; h++) {
    let d = e[h];
    if (d === 0) {
      if (h < e.length - 1 || h > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: f, contentDOM: p } = ni(n, d, t, r);
      if (a.appendChild(f), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const gp = {};
function Ko(n, e) {
  const t = gp, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Bu(n, r, i);
}
function Bu(n, e, t) {
  if (yp(n)) {
    if ("value" in n)
      return n.type === "html" && !t ? "" : n.value;
    if (e && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return va(n.children, e, t);
  }
  return Array.isArray(n) ? va(n, e, t) : "";
}
function va(n, e, t) {
  const r = [];
  let i = -1;
  for (; ++i < n.length; )
    r[i] = Bu(n[i], e, t);
  return r.join("");
}
function yp(n) {
  return !!(n && typeof n == "object");
}
const Ra = document.createElement("i");
function Jo(n) {
  const e = "&" + n + ";";
  Ra.innerHTML = e;
  const t = Ra.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === e ? !1 : t
  );
}
function st(n, e, t, r) {
  const i = n.length;
  let s = 0, o;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(e, t), n.splice(...o);
  else
    for (t && n.splice(e, t); s < r.length; )
      o = r.slice(s, s + 1e4), o.unshift(e, 0), n.splice(...o), s += 1e4, e += 1e4;
}
function Pe(n, e) {
  return n.length > 0 ? (st(n, n.length, 0, e), n) : e;
}
const Pa = {}.hasOwnProperty;
function kp(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; )
    xp(e, n[t]);
  return e;
}
function xp(n, e) {
  let t;
  for (t in e) {
    const i = (Pa.call(n, t) ? n[t] : void 0) || (n[t] = {}), s = e[t];
    let o;
    if (s)
      for (o in s) {
        Pa.call(i, o) || (i[o] = []);
        const l = s[o];
        bp(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function bp(n, e) {
  let t = -1;
  const r = [];
  for (; ++t < e.length; )
    (e[t].add === "after" ? n : r).push(e[t]);
  st(n, 0, 0, r);
}
function zu(n, e) {
  const t = Number.parseInt(n, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function Dn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const nt = Ht(/[A-Za-z]/), je = Ht(/[\dA-Za-z]/), wp = Ht(/[#-'*+\--9=?A-Z^-~]/);
function lo(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const ao = Ht(/\d/), Sp = Ht(/[\dA-Fa-f]/), Cp = Ht(/[!-/:-@[-`{-~]/);
function L(n) {
  return n !== null && n < -2;
}
function we(n) {
  return n !== null && (n < 0 || n === 32);
}
function K(n) {
  return n === -2 || n === -1 || n === 32;
}
const Mp = Ht(new RegExp("\\p{P}|\\p{S}", "u")), Np = Ht(/\s/);
function Ht(n) {
  return e;
  function e(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function X(n, e, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let s = 0;
  return o;
  function o(a) {
    return K(a) ? (n.enter(t), l(a)) : e(a);
  }
  function l(a) {
    return K(a) && s++ < i ? (n.consume(a), l) : (n.exit(t), e(a));
  }
}
const Tp = {
  tokenize: Ip
};
function Ip(n) {
  const e = n.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return e;
  function r(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), X(n, e, "linePrefix");
  }
  function i(l) {
    return n.enter("paragraph"), s(l);
  }
  function s(l) {
    const a = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = a), t = a, o(l);
  }
  function o(l) {
    if (l === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(l);
      return;
    }
    return L(l) ? (n.consume(l), n.exit("chunkText"), s) : (n.consume(l), o);
  }
}
const Op = {
  tokenize: Ep
}, La = {
  tokenize: Ap
};
function Ep(n) {
  const e = this, t = [];
  let r = 0, i, s, o;
  return l;
  function l(C) {
    if (r < t.length) {
      const E = t[r];
      return e.containerState = E[1], n.attempt(E[0].continuation, a, c)(C);
    }
    return c(C);
  }
  function a(C) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && T();
      const E = e.events.length;
      let A = E, b;
      for (; A--; )
        if (e.events[A][0] === "exit" && e.events[A][1].type === "chunkFlow") {
          b = e.events[A][1].end;
          break;
        }
      k(r);
      let z = E;
      for (; z < e.events.length; )
        e.events[z][1].end = {
          ...b
        }, z++;
      return st(e.events, A + 1, 0, e.events.slice(E)), e.events.length = z, c(C);
    }
    return l(C);
  }
  function c(C) {
    if (r === t.length) {
      if (!i)
        return d(C);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return p(C);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, n.check(La, u, h)(C);
  }
  function u(C) {
    return i && T(), k(r), d(C);
  }
  function h(C) {
    return e.parser.lazy[e.now().line] = r !== t.length, o = e.now().offset, p(C);
  }
  function d(C) {
    return e.containerState = {}, n.attempt(La, f, p)(C);
  }
  function f(C) {
    return r++, t.push([e.currentConstruct, e.containerState]), d(C);
  }
  function p(C) {
    if (C === null) {
      i && T(), k(0), n.consume(C);
      return;
    }
    return i = i || e.parser.flow(e.now()), n.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: s
    }), m(C);
  }
  function m(C) {
    if (C === null) {
      x(n.exit("chunkFlow"), !0), k(0), n.consume(C);
      return;
    }
    return L(C) ? (n.consume(C), x(n.exit("chunkFlow")), r = 0, e.interrupt = void 0, l) : (n.consume(C), m);
  }
  function x(C, E) {
    const A = e.sliceStream(C);
    if (E && A.push(null), C.previous = s, s && (s.next = C), s = C, i.defineSkip(C.start), i.write(A), e.parser.lazy[C.start.line]) {
      let b = i.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          i.events[b][1].start.offset < o && // …and either is not ended yet…
          (!i.events[b][1].end || // …or ends after it.
          i.events[b][1].end.offset > o)
        )
          return;
      const z = e.events.length;
      let O = z, D, P;
      for (; O--; )
        if (e.events[O][0] === "exit" && e.events[O][1].type === "chunkFlow") {
          if (D) {
            P = e.events[O][1].end;
            break;
          }
          D = !0;
        }
      for (k(r), b = z; b < e.events.length; )
        e.events[b][1].end = {
          ...P
        }, b++;
      st(e.events, O + 1, 0, e.events.slice(z)), e.events.length = b;
    }
  }
  function k(C) {
    let E = t.length;
    for (; E-- > C; ) {
      const A = t[E];
      e.containerState = A[1], A[0].exit.call(e, n);
    }
    t.length = C;
  }
  function T() {
    i.write([null]), s = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function Ap(n, e, t) {
  return X(n, n.attempt(this.parser.constructs.document, e, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Ni(n) {
  if (n === null || we(n) || Np(n))
    return 1;
  if (Mp(n))
    return 2;
}
function Uo(n, e, t) {
  const r = [];
  let i = -1;
  for (; ++i < n.length; ) {
    const s = n[i].resolveAll;
    s && !r.includes(s) && (e = s(e, t), r.push(s));
  }
  return e;
}
const co = {
  name: "attention",
  resolveAll: Dp,
  tokenize: vp
};
function Dp(n, e) {
  let t = -1, r, i, s, o, l, a, c, u;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (r = t; r--; )
        if (n[r][0] === "exit" && n[r][1].type === "attentionSequence" && n[r][1]._open && // If the markers are the same:
        e.sliceSerialize(n[r][1]).charCodeAt(0) === e.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[r][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[r][1].end.offset - n[r][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          a = n[r][1].end.offset - n[r][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const h = {
            ...n[r][1].end
          }, d = {
            ...n[t][1].start
          };
          Ba(h, -a), Ba(d, a), o = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: h,
            end: {
              ...n[r][1].end
            }
          }, l = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[t][1].start
            },
            end: d
          }, s = {
            type: a > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[r][1].end
            },
            end: {
              ...n[t][1].start
            }
          }, i = {
            type: a > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...l.end
            }
          }, n[r][1].end = {
            ...o.start
          }, n[t][1].start = {
            ...l.end
          }, c = [], n[r][1].end.offset - n[r][1].start.offset && (c = Pe(c, [["enter", n[r][1], e], ["exit", n[r][1], e]])), c = Pe(c, [["enter", i, e], ["enter", o, e], ["exit", o, e], ["enter", s, e]]), c = Pe(c, Uo(e.parser.constructs.insideSpan.null, n.slice(r + 1, t), e)), c = Pe(c, [["exit", s, e], ["enter", l, e], ["exit", l, e], ["exit", i, e]]), n[t][1].end.offset - n[t][1].start.offset ? (u = 2, c = Pe(c, [["enter", n[t][1], e], ["exit", n[t][1], e]])) : u = 0, st(n, r - 1, t - r + 3, c), t = r + c.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function vp(n, e) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ni(r);
  let s;
  return o;
  function o(a) {
    return s = a, n.enter("attentionSequence"), l(a);
  }
  function l(a) {
    if (a === s)
      return n.consume(a), l;
    const c = n.exit("attentionSequence"), u = Ni(a), h = !u || u === 2 && i || t.includes(a), d = !i || i === 2 && u || t.includes(r);
    return c._open = !!(s === 42 ? h : h && (i || !d)), c._close = !!(s === 42 ? d : d && (u || !h)), e(a);
  }
}
function Ba(n, e) {
  n.column += e, n.offset += e, n._bufferIndex += e;
}
const Rp = {
  name: "autolink",
  tokenize: Pp
};
function Pp(n, e, t) {
  let r = 0;
  return i;
  function i(f) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(f), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), s;
  }
  function s(f) {
    return nt(f) ? (n.consume(f), o) : f === 64 ? t(f) : c(f);
  }
  function o(f) {
    return f === 43 || f === 45 || f === 46 || je(f) ? (r = 1, l(f)) : c(f);
  }
  function l(f) {
    return f === 58 ? (n.consume(f), r = 0, a) : (f === 43 || f === 45 || f === 46 || je(f)) && r++ < 32 ? (n.consume(f), l) : (r = 0, c(f));
  }
  function a(f) {
    return f === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(f), n.exit("autolinkMarker"), n.exit("autolink"), e) : f === null || f === 32 || f === 60 || lo(f) ? t(f) : (n.consume(f), a);
  }
  function c(f) {
    return f === 64 ? (n.consume(f), u) : wp(f) ? (n.consume(f), c) : t(f);
  }
  function u(f) {
    return je(f) ? h(f) : t(f);
  }
  function h(f) {
    return f === 46 ? (n.consume(f), r = 0, u) : f === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(f), n.exit("autolinkMarker"), n.exit("autolink"), e) : d(f);
  }
  function d(f) {
    if ((f === 45 || je(f)) && r++ < 63) {
      const p = f === 45 ? d : h;
      return n.consume(f), p;
    }
    return t(f);
  }
}
const qi = {
  partial: !0,
  tokenize: Lp
};
function Lp(n, e, t) {
  return r;
  function r(s) {
    return K(s) ? X(n, i, "linePrefix")(s) : i(s);
  }
  function i(s) {
    return s === null || L(s) ? e(s) : t(s);
  }
}
const Fu = {
  continuation: {
    tokenize: zp
  },
  exit: Fp,
  name: "blockQuote",
  tokenize: Bp
};
function Bp(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const l = r.containerState;
      return l.open || (n.enter("blockQuote", {
        _container: !0
      }), l.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(o), n.exit("blockQuoteMarker"), s;
    }
    return t(o);
  }
  function s(o) {
    return K(o) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(o), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), e) : (n.exit("blockQuotePrefix"), e(o));
  }
}
function zp(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return K(o) ? X(n, s, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : s(o);
  }
  function s(o) {
    return n.attempt(Fu, e, t)(o);
  }
}
function Fp(n) {
  n.exit("blockQuote");
}
const Vu = {
  name: "characterEscape",
  tokenize: Vp
};
function Vp(n, e, t) {
  return r;
  function r(s) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(s), n.exit("escapeMarker"), i;
  }
  function i(s) {
    return Cp(s) ? (n.enter("characterEscapeValue"), n.consume(s), n.exit("characterEscapeValue"), n.exit("characterEscape"), e) : t(s);
  }
}
const _u = {
  name: "characterReference",
  tokenize: _p
};
function _p(n, e, t) {
  const r = this;
  let i = 0, s, o;
  return l;
  function l(h) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(h), n.exit("characterReferenceMarker"), a;
  }
  function a(h) {
    return h === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(h), n.exit("characterReferenceMarkerNumeric"), c) : (n.enter("characterReferenceValue"), s = 31, o = je, u(h));
  }
  function c(h) {
    return h === 88 || h === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(h), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), s = 6, o = Sp, u) : (n.enter("characterReferenceValue"), s = 7, o = ao, u(h));
  }
  function u(h) {
    if (h === 59 && i) {
      const d = n.exit("characterReferenceValue");
      return o === je && !Jo(r.sliceSerialize(d)) ? t(h) : (n.enter("characterReferenceMarker"), n.consume(h), n.exit("characterReferenceMarker"), n.exit("characterReference"), e);
    }
    return o(h) && i++ < s ? (n.consume(h), u) : t(h);
  }
}
const za = {
  partial: !0,
  tokenize: Hp
}, Fa = {
  concrete: !0,
  name: "codeFenced",
  tokenize: $p
};
function $p(n, e, t) {
  const r = this, i = {
    partial: !0,
    tokenize: A
  };
  let s = 0, o = 0, l;
  return a;
  function a(b) {
    return c(b);
  }
  function c(b) {
    const z = r.events[r.events.length - 1];
    return s = z && z[1].type === "linePrefix" ? z[2].sliceSerialize(z[1], !0).length : 0, l = b, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), u(b);
  }
  function u(b) {
    return b === l ? (o++, n.consume(b), u) : o < 3 ? t(b) : (n.exit("codeFencedFenceSequence"), K(b) ? X(n, h, "whitespace")(b) : h(b));
  }
  function h(b) {
    return b === null || L(b) ? (n.exit("codeFencedFence"), r.interrupt ? e(b) : n.check(za, m, E)(b)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), d(b));
  }
  function d(b) {
    return b === null || L(b) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), h(b)) : K(b) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), X(n, f, "whitespace")(b)) : b === 96 && b === l ? t(b) : (n.consume(b), d);
  }
  function f(b) {
    return b === null || L(b) ? h(b) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === null || L(b) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), h(b)) : b === 96 && b === l ? t(b) : (n.consume(b), p);
  }
  function m(b) {
    return n.attempt(i, E, x)(b);
  }
  function x(b) {
    return n.enter("lineEnding"), n.consume(b), n.exit("lineEnding"), k;
  }
  function k(b) {
    return s > 0 && K(b) ? X(n, T, "linePrefix", s + 1)(b) : T(b);
  }
  function T(b) {
    return b === null || L(b) ? n.check(za, m, E)(b) : (n.enter("codeFlowValue"), C(b));
  }
  function C(b) {
    return b === null || L(b) ? (n.exit("codeFlowValue"), T(b)) : (n.consume(b), C);
  }
  function E(b) {
    return n.exit("codeFenced"), e(b);
  }
  function A(b, z, O) {
    let D = 0;
    return P;
    function P(_) {
      return b.enter("lineEnding"), b.consume(_), b.exit("lineEnding"), v;
    }
    function v(_) {
      return b.enter("codeFencedFence"), K(_) ? X(b, R, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(_) : R(_);
    }
    function R(_) {
      return _ === l ? (b.enter("codeFencedFenceSequence"), Y(_)) : O(_);
    }
    function Y(_) {
      return _ === l ? (D++, b.consume(_), Y) : D >= o ? (b.exit("codeFencedFenceSequence"), K(_) ? X(b, G, "whitespace")(_) : G(_)) : O(_);
    }
    function G(_) {
      return _ === null || L(_) ? (b.exit("codeFencedFence"), z(_)) : O(_);
    }
  }
}
function Hp(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), s);
  }
  function s(o) {
    return r.parser.lazy[r.now().line] ? t(o) : e(o);
  }
}
const bs = {
  name: "codeIndented",
  tokenize: jp
}, Wp = {
  partial: !0,
  tokenize: qp
};
function jp(n, e, t) {
  const r = this;
  return i;
  function i(c) {
    return n.enter("codeIndented"), X(n, s, "linePrefix", 5)(c);
  }
  function s(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? o(c) : t(c);
  }
  function o(c) {
    return c === null ? a(c) : L(c) ? n.attempt(Wp, o, a)(c) : (n.enter("codeFlowValue"), l(c));
  }
  function l(c) {
    return c === null || L(c) ? (n.exit("codeFlowValue"), o(c)) : (n.consume(c), l);
  }
  function a(c) {
    return n.exit("codeIndented"), e(c);
  }
}
function qp(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : L(o) ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), i) : X(n, s, "linePrefix", 5)(o);
  }
  function s(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? e(o) : L(o) ? i(o) : t(o);
  }
}
const Kp = {
  name: "codeText",
  previous: Up,
  resolve: Jp,
  tokenize: Gp
};
function Jp(n) {
  let e = n.length - 4, t = 3, r, i;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[e][1].type === "lineEnding" || n[e][1].type === "space")) {
    for (r = t; ++r < e; )
      if (n[r][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[e][1].type = "codeTextPadding", t += 2, e -= 2;
        break;
      }
  }
  for (r = t - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && n[r][1].type !== "lineEnding" && (i = r) : (r === e || n[r][1].type === "lineEnding") && (n[i][1].type = "codeTextData", r !== i + 2 && (n[i][1].end = n[r - 1][1].end, n.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return n;
}
function Up(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Gp(n, e, t) {
  let r = 0, i, s;
  return o;
  function o(h) {
    return n.enter("codeText"), n.enter("codeTextSequence"), l(h);
  }
  function l(h) {
    return h === 96 ? (n.consume(h), r++, l) : (n.exit("codeTextSequence"), a(h));
  }
  function a(h) {
    return h === null ? t(h) : h === 32 ? (n.enter("space"), n.consume(h), n.exit("space"), a) : h === 96 ? (s = n.enter("codeTextSequence"), i = 0, u(h)) : L(h) ? (n.enter("lineEnding"), n.consume(h), n.exit("lineEnding"), a) : (n.enter("codeTextData"), c(h));
  }
  function c(h) {
    return h === null || h === 32 || h === 96 || L(h) ? (n.exit("codeTextData"), a(h)) : (n.consume(h), c);
  }
  function u(h) {
    return h === 96 ? (n.consume(h), i++, u) : i === r ? (n.exit("codeTextSequence"), n.exit("codeText"), e(h)) : (s.type = "codeTextData", c(h));
  }
}
class Yp {
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
  slice(e, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
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
  splice(e, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(e));
    const s = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && tr(this.left, r), s.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), tr(this.left, e);
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
    this.setCursor(0), tr(this.right, e.reverse());
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
        const t = this.left.splice(e, Number.POSITIVE_INFINITY);
        tr(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        tr(this.left, t.reverse());
      }
  }
}
function tr(n, e) {
  let t = 0;
  if (e.length < 1e4)
    n.push(...e);
  else
    for (; t < e.length; )
      n.push(...e.slice(t, t + 1e4)), t += 1e4;
}
function $u(n) {
  const e = {};
  let t = -1, r, i, s, o, l, a, c;
  const u = new Yp(n);
  for (; ++t < u.length; ) {
    for (; t in e; )
      t = e[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (a = r[1]._tokenizer.events, s = 0, s < a.length && a[s][1].type === "lineEndingBlank" && (s += 2), s < a.length && a[s][1].type === "content"))
      for (; ++s < a.length && a[s][1].type !== "content"; )
        a[s][1].type === "chunkText" && (a[s][1]._isInFirstContentOfListItem = !0, s++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Qp(u, t)), t = e[t], c = !0);
    else if (r[1]._container) {
      for (s = t, i = void 0; s--; )
        if (o = u.get(s), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = s);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, l = u.slice(i, t), l.unshift(r), u.splice(i, t - i + 1, l));
    }
  }
  return st(n, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function Qp(n, e) {
  const t = n.get(e)[1], r = n.get(e)[2];
  let i = e - 1;
  const s = [];
  let o = t._tokenizer;
  o || (o = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const l = o.events, a = [], c = {};
  let u, h, d = -1, f = t, p = 0, m = 0;
  const x = [m];
  for (; f; ) {
    for (; n.get(++i)[1] !== f; )
      ;
    s.push(i), f._tokenizer || (u = r.sliceStream(f), f.next || u.push(null), h && o.defineSkip(f.start), f._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), f._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), h = f, f = f.next;
  }
  for (f = t; ++d < l.length; )
    // Find a void token that includes a break.
    l[d][0] === "exit" && l[d - 1][0] === "enter" && l[d][1].type === l[d - 1][1].type && l[d][1].start.line !== l[d][1].end.line && (m = d + 1, x.push(m), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (o.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : x.pop(), d = x.length; d--; ) {
    const k = l.slice(x[d], x[d + 1]), T = s.pop();
    a.push([T, T + k.length - 1]), n.splice(T, 2, k);
  }
  for (a.reverse(), d = -1; ++d < a.length; )
    c[p + a[d][0]] = p + a[d][1], p += a[d][1] - a[d][0] - 1;
  return c;
}
const Xp = {
  resolve: em,
  tokenize: tm
}, Zp = {
  partial: !0,
  tokenize: nm
};
function em(n) {
  return $u(n), n;
}
function tm(n, e) {
  let t;
  return r;
  function r(l) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), i(l);
  }
  function i(l) {
    return l === null ? s(l) : L(l) ? n.check(Zp, o, s)(l) : (n.consume(l), i);
  }
  function s(l) {
    return n.exit("chunkContent"), n.exit("content"), e(l);
  }
  function o(l) {
    return n.consume(l), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function nm(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), X(n, s, "linePrefix");
  }
  function s(o) {
    if (o === null || L(o))
      return t(o);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? e(o) : n.interrupt(r.parser.constructs.flow, t, e)(o);
  }
}
function Hu(n, e, t, r, i, s, o, l, a) {
  const c = a || Number.POSITIVE_INFINITY;
  let u = 0;
  return h;
  function h(k) {
    return k === 60 ? (n.enter(r), n.enter(i), n.enter(s), n.consume(k), n.exit(s), d) : k === null || k === 32 || k === 41 || lo(k) ? t(k) : (n.enter(r), n.enter(o), n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), m(k));
  }
  function d(k) {
    return k === 62 ? (n.enter(s), n.consume(k), n.exit(s), n.exit(i), n.exit(r), e) : (n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), f(k));
  }
  function f(k) {
    return k === 62 ? (n.exit("chunkString"), n.exit(l), d(k)) : k === null || k === 60 || L(k) ? t(k) : (n.consume(k), k === 92 ? p : f);
  }
  function p(k) {
    return k === 60 || k === 62 || k === 92 ? (n.consume(k), f) : f(k);
  }
  function m(k) {
    return !u && (k === null || k === 41 || we(k)) ? (n.exit("chunkString"), n.exit(l), n.exit(o), n.exit(r), e(k)) : u < c && k === 40 ? (n.consume(k), u++, m) : k === 41 ? (n.consume(k), u--, m) : k === null || k === 32 || k === 40 || lo(k) ? t(k) : (n.consume(k), k === 92 ? x : m);
  }
  function x(k) {
    return k === 40 || k === 41 || k === 92 ? (n.consume(k), m) : m(k);
  }
}
function Wu(n, e, t, r, i, s) {
  const o = this;
  let l = 0, a;
  return c;
  function c(f) {
    return n.enter(r), n.enter(i), n.consume(f), n.exit(i), n.enter(s), u;
  }
  function u(f) {
    return l > 999 || f === null || f === 91 || f === 93 && !a || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    f === 94 && !l && "_hiddenFootnoteSupport" in o.parser.constructs ? t(f) : f === 93 ? (n.exit(s), n.enter(i), n.consume(f), n.exit(i), n.exit(r), e) : L(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), u) : (n.enter("chunkString", {
      contentType: "string"
    }), h(f));
  }
  function h(f) {
    return f === null || f === 91 || f === 93 || L(f) || l++ > 999 ? (n.exit("chunkString"), u(f)) : (n.consume(f), a || (a = !K(f)), f === 92 ? d : h);
  }
  function d(f) {
    return f === 91 || f === 92 || f === 93 ? (n.consume(f), l++, h) : h(f);
  }
}
function ju(n, e, t, r, i, s) {
  let o;
  return l;
  function l(d) {
    return d === 34 || d === 39 || d === 40 ? (n.enter(r), n.enter(i), n.consume(d), n.exit(i), o = d === 40 ? 41 : d, a) : t(d);
  }
  function a(d) {
    return d === o ? (n.enter(i), n.consume(d), n.exit(i), n.exit(r), e) : (n.enter(s), c(d));
  }
  function c(d) {
    return d === o ? (n.exit(s), a(o)) : d === null ? t(d) : L(d) ? (n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), X(n, c, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), u(d));
  }
  function u(d) {
    return d === o || d === null || L(d) ? (n.exit("chunkString"), c(d)) : (n.consume(d), d === 92 ? h : u);
  }
  function h(d) {
    return d === o || d === 92 ? (n.consume(d), u) : u(d);
  }
}
function kr(n, e) {
  let t;
  return r;
  function r(i) {
    return L(i) ? (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), t = !0, r) : K(i) ? X(n, r, t ? "linePrefix" : "lineSuffix")(i) : e(i);
  }
}
const rm = {
  name: "definition",
  tokenize: sm
}, im = {
  partial: !0,
  tokenize: om
};
function sm(n, e, t) {
  const r = this;
  let i;
  return s;
  function s(f) {
    return n.enter("definition"), o(f);
  }
  function o(f) {
    return Wu.call(
      r,
      n,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(f);
  }
  function l(f) {
    return i = Dn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), f === 58 ? (n.enter("definitionMarker"), n.consume(f), n.exit("definitionMarker"), a) : t(f);
  }
  function a(f) {
    return we(f) ? kr(n, c)(f) : c(f);
  }
  function c(f) {
    return Hu(
      n,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(f);
  }
  function u(f) {
    return n.attempt(im, h, h)(f);
  }
  function h(f) {
    return K(f) ? X(n, d, "whitespace")(f) : d(f);
  }
  function d(f) {
    return f === null || L(f) ? (n.exit("definition"), r.parser.defined.push(i), e(f)) : t(f);
  }
}
function om(n, e, t) {
  return r;
  function r(l) {
    return we(l) ? kr(n, i)(l) : t(l);
  }
  function i(l) {
    return ju(n, s, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function s(l) {
    return K(l) ? X(n, o, "whitespace")(l) : o(l);
  }
  function o(l) {
    return l === null || L(l) ? e(l) : t(l);
  }
}
const lm = {
  name: "hardBreakEscape",
  tokenize: am
};
function am(n, e, t) {
  return r;
  function r(s) {
    return n.enter("hardBreakEscape"), n.consume(s), i;
  }
  function i(s) {
    return L(s) ? (n.exit("hardBreakEscape"), e(s)) : t(s);
  }
}
const cm = {
  name: "headingAtx",
  resolve: um,
  tokenize: hm
};
function um(n, e) {
  let t = n.length - 2, r = 3, i, s;
  return n[r][1].type === "whitespace" && (r += 2), t - 2 > r && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && n[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: n[r][1].start,
    end: n[t][1].end
  }, s = {
    type: "chunkText",
    start: n[r][1].start,
    end: n[t][1].end,
    contentType: "text"
  }, st(n, r, t - r + 1, [["enter", i, e], ["enter", s, e], ["exit", s, e], ["exit", i, e]])), n;
}
function hm(n, e, t) {
  let r = 0;
  return i;
  function i(u) {
    return n.enter("atxHeading"), s(u);
  }
  function s(u) {
    return n.enter("atxHeadingSequence"), o(u);
  }
  function o(u) {
    return u === 35 && r++ < 6 ? (n.consume(u), o) : u === null || we(u) ? (n.exit("atxHeadingSequence"), l(u)) : t(u);
  }
  function l(u) {
    return u === 35 ? (n.enter("atxHeadingSequence"), a(u)) : u === null || L(u) ? (n.exit("atxHeading"), e(u)) : K(u) ? X(n, l, "whitespace")(u) : (n.enter("atxHeadingText"), c(u));
  }
  function a(u) {
    return u === 35 ? (n.consume(u), a) : (n.exit("atxHeadingSequence"), l(u));
  }
  function c(u) {
    return u === null || u === 35 || we(u) ? (n.exit("atxHeadingText"), l(u)) : (n.consume(u), c);
  }
}
const fm = [
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
], Va = ["pre", "script", "style", "textarea"], dm = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: gm,
  tokenize: ym
}, pm = {
  partial: !0,
  tokenize: xm
}, mm = {
  partial: !0,
  tokenize: km
};
function gm(n) {
  let e = n.length;
  for (; e-- && !(n[e][0] === "enter" && n[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && n[e - 2][1].type === "linePrefix" && (n[e][1].start = n[e - 2][1].start, n[e + 1][1].start = n[e - 2][1].start, n.splice(e - 2, 2)), n;
}
function ym(n, e, t) {
  const r = this;
  let i, s, o, l, a;
  return c;
  function c(y) {
    return u(y);
  }
  function u(y) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(y), h;
  }
  function h(y) {
    return y === 33 ? (n.consume(y), d) : y === 47 ? (n.consume(y), s = !0, m) : y === 63 ? (n.consume(y), i = 3, r.interrupt ? e : g) : nt(y) ? (n.consume(y), o = String.fromCharCode(y), x) : t(y);
  }
  function d(y) {
    return y === 45 ? (n.consume(y), i = 2, f) : y === 91 ? (n.consume(y), i = 5, l = 0, p) : nt(y) ? (n.consume(y), i = 4, r.interrupt ? e : g) : t(y);
  }
  function f(y) {
    return y === 45 ? (n.consume(y), r.interrupt ? e : g) : t(y);
  }
  function p(y) {
    const $e = "CDATA[";
    return y === $e.charCodeAt(l++) ? (n.consume(y), l === $e.length ? r.interrupt ? e : R : p) : t(y);
  }
  function m(y) {
    return nt(y) ? (n.consume(y), o = String.fromCharCode(y), x) : t(y);
  }
  function x(y) {
    if (y === null || y === 47 || y === 62 || we(y)) {
      const $e = y === 47, Jt = o.toLowerCase();
      return !$e && !s && Va.includes(Jt) ? (i = 1, r.interrupt ? e(y) : R(y)) : fm.includes(o.toLowerCase()) ? (i = 6, $e ? (n.consume(y), k) : r.interrupt ? e(y) : R(y)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(y) : s ? T(y) : C(y));
    }
    return y === 45 || je(y) ? (n.consume(y), o += String.fromCharCode(y), x) : t(y);
  }
  function k(y) {
    return y === 62 ? (n.consume(y), r.interrupt ? e : R) : t(y);
  }
  function T(y) {
    return K(y) ? (n.consume(y), T) : P(y);
  }
  function C(y) {
    return y === 47 ? (n.consume(y), P) : y === 58 || y === 95 || nt(y) ? (n.consume(y), E) : K(y) ? (n.consume(y), C) : P(y);
  }
  function E(y) {
    return y === 45 || y === 46 || y === 58 || y === 95 || je(y) ? (n.consume(y), E) : A(y);
  }
  function A(y) {
    return y === 61 ? (n.consume(y), b) : K(y) ? (n.consume(y), A) : C(y);
  }
  function b(y) {
    return y === null || y === 60 || y === 61 || y === 62 || y === 96 ? t(y) : y === 34 || y === 39 ? (n.consume(y), a = y, z) : K(y) ? (n.consume(y), b) : O(y);
  }
  function z(y) {
    return y === a ? (n.consume(y), a = null, D) : y === null || L(y) ? t(y) : (n.consume(y), z);
  }
  function O(y) {
    return y === null || y === 34 || y === 39 || y === 47 || y === 60 || y === 61 || y === 62 || y === 96 || we(y) ? A(y) : (n.consume(y), O);
  }
  function D(y) {
    return y === 47 || y === 62 || K(y) ? C(y) : t(y);
  }
  function P(y) {
    return y === 62 ? (n.consume(y), v) : t(y);
  }
  function v(y) {
    return y === null || L(y) ? R(y) : K(y) ? (n.consume(y), v) : t(y);
  }
  function R(y) {
    return y === 45 && i === 2 ? (n.consume(y), ne) : y === 60 && i === 1 ? (n.consume(y), Z) : y === 62 && i === 4 ? (n.consume(y), _e) : y === 63 && i === 3 ? (n.consume(y), g) : y === 93 && i === 5 ? (n.consume(y), oe) : L(y) && (i === 6 || i === 7) ? (n.exit("htmlFlowData"), n.check(pm, ut, Y)(y)) : y === null || L(y) ? (n.exit("htmlFlowData"), Y(y)) : (n.consume(y), R);
  }
  function Y(y) {
    return n.check(mm, G, ut)(y);
  }
  function G(y) {
    return n.enter("lineEnding"), n.consume(y), n.exit("lineEnding"), _;
  }
  function _(y) {
    return y === null || L(y) ? Y(y) : (n.enter("htmlFlowData"), R(y));
  }
  function ne(y) {
    return y === 45 ? (n.consume(y), g) : R(y);
  }
  function Z(y) {
    return y === 47 ? (n.consume(y), o = "", te) : R(y);
  }
  function te(y) {
    if (y === 62) {
      const $e = o.toLowerCase();
      return Va.includes($e) ? (n.consume(y), _e) : R(y);
    }
    return nt(y) && o.length < 8 ? (n.consume(y), o += String.fromCharCode(y), te) : R(y);
  }
  function oe(y) {
    return y === 93 ? (n.consume(y), g) : R(y);
  }
  function g(y) {
    return y === 62 ? (n.consume(y), _e) : y === 45 && i === 2 ? (n.consume(y), g) : R(y);
  }
  function _e(y) {
    return y === null || L(y) ? (n.exit("htmlFlowData"), ut(y)) : (n.consume(y), _e);
  }
  function ut(y) {
    return n.exit("htmlFlow"), e(y);
  }
}
function km(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return L(o) ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), s) : t(o);
  }
  function s(o) {
    return r.parser.lazy[r.now().line] ? t(o) : e(o);
  }
}
function xm(n, e, t) {
  return r;
  function r(i) {
    return n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), n.attempt(qi, e, t);
  }
}
const bm = {
  name: "htmlText",
  tokenize: wm
};
function wm(n, e, t) {
  const r = this;
  let i, s, o;
  return l;
  function l(g) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(g), a;
  }
  function a(g) {
    return g === 33 ? (n.consume(g), c) : g === 47 ? (n.consume(g), A) : g === 63 ? (n.consume(g), C) : nt(g) ? (n.consume(g), O) : t(g);
  }
  function c(g) {
    return g === 45 ? (n.consume(g), u) : g === 91 ? (n.consume(g), s = 0, p) : nt(g) ? (n.consume(g), T) : t(g);
  }
  function u(g) {
    return g === 45 ? (n.consume(g), f) : t(g);
  }
  function h(g) {
    return g === null ? t(g) : g === 45 ? (n.consume(g), d) : L(g) ? (o = h, Z(g)) : (n.consume(g), h);
  }
  function d(g) {
    return g === 45 ? (n.consume(g), f) : h(g);
  }
  function f(g) {
    return g === 62 ? ne(g) : g === 45 ? d(g) : h(g);
  }
  function p(g) {
    const _e = "CDATA[";
    return g === _e.charCodeAt(s++) ? (n.consume(g), s === _e.length ? m : p) : t(g);
  }
  function m(g) {
    return g === null ? t(g) : g === 93 ? (n.consume(g), x) : L(g) ? (o = m, Z(g)) : (n.consume(g), m);
  }
  function x(g) {
    return g === 93 ? (n.consume(g), k) : m(g);
  }
  function k(g) {
    return g === 62 ? ne(g) : g === 93 ? (n.consume(g), k) : m(g);
  }
  function T(g) {
    return g === null || g === 62 ? ne(g) : L(g) ? (o = T, Z(g)) : (n.consume(g), T);
  }
  function C(g) {
    return g === null ? t(g) : g === 63 ? (n.consume(g), E) : L(g) ? (o = C, Z(g)) : (n.consume(g), C);
  }
  function E(g) {
    return g === 62 ? ne(g) : C(g);
  }
  function A(g) {
    return nt(g) ? (n.consume(g), b) : t(g);
  }
  function b(g) {
    return g === 45 || je(g) ? (n.consume(g), b) : z(g);
  }
  function z(g) {
    return L(g) ? (o = z, Z(g)) : K(g) ? (n.consume(g), z) : ne(g);
  }
  function O(g) {
    return g === 45 || je(g) ? (n.consume(g), O) : g === 47 || g === 62 || we(g) ? D(g) : t(g);
  }
  function D(g) {
    return g === 47 ? (n.consume(g), ne) : g === 58 || g === 95 || nt(g) ? (n.consume(g), P) : L(g) ? (o = D, Z(g)) : K(g) ? (n.consume(g), D) : ne(g);
  }
  function P(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || je(g) ? (n.consume(g), P) : v(g);
  }
  function v(g) {
    return g === 61 ? (n.consume(g), R) : L(g) ? (o = v, Z(g)) : K(g) ? (n.consume(g), v) : D(g);
  }
  function R(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? t(g) : g === 34 || g === 39 ? (n.consume(g), i = g, Y) : L(g) ? (o = R, Z(g)) : K(g) ? (n.consume(g), R) : (n.consume(g), G);
  }
  function Y(g) {
    return g === i ? (n.consume(g), i = void 0, _) : g === null ? t(g) : L(g) ? (o = Y, Z(g)) : (n.consume(g), Y);
  }
  function G(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? t(g) : g === 47 || g === 62 || we(g) ? D(g) : (n.consume(g), G);
  }
  function _(g) {
    return g === 47 || g === 62 || we(g) ? D(g) : t(g);
  }
  function ne(g) {
    return g === 62 ? (n.consume(g), n.exit("htmlTextData"), n.exit("htmlText"), e) : t(g);
  }
  function Z(g) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), te;
  }
  function te(g) {
    return K(g) ? X(n, oe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : oe(g);
  }
  function oe(g) {
    return n.enter("htmlTextData"), o(g);
  }
}
const Go = {
  name: "labelEnd",
  resolveAll: Nm,
  resolveTo: Tm,
  tokenize: Im
}, Sm = {
  tokenize: Om
}, Cm = {
  tokenize: Em
}, Mm = {
  tokenize: Am
};
function Nm(n) {
  let e = -1;
  const t = [];
  for (; ++e < n.length; ) {
    const r = n[e][1];
    if (t.push(n[e]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", e += i;
    }
  }
  return n.length !== t.length && st(n, 0, n.length, t), n;
}
function Tm(n, e) {
  let t = n.length, r = 0, i, s, o, l;
  for (; t--; )
    if (i = n[t][1], s) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      n[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (n[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (s = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const a = {
    type: n[s][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[s][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, c = {
    type: "label",
    start: {
      ...n[s][1].start
    },
    end: {
      ...n[o][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...n[s + r + 2][1].end
    },
    end: {
      ...n[o - 2][1].start
    }
  };
  return l = [["enter", a, e], ["enter", c, e]], l = Pe(l, n.slice(s + 1, s + r + 3)), l = Pe(l, [["enter", u, e]]), l = Pe(l, Uo(e.parser.constructs.insideSpan.null, n.slice(s + r + 4, o - 3), e)), l = Pe(l, [["exit", u, e], n[o - 2], n[o - 1], ["exit", c, e]]), l = Pe(l, n.slice(o + 1)), l = Pe(l, [["exit", a, e]]), st(n, s, n.length, l), n;
}
function Im(n, e, t) {
  const r = this;
  let i = r.events.length, s, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      s = r.events[i][1];
      break;
    }
  return l;
  function l(d) {
    return s ? s._inactive ? h(d) : (o = r.parser.defined.includes(Dn(r.sliceSerialize({
      start: s.end,
      end: r.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(d), n.exit("labelMarker"), n.exit("labelEnd"), a) : t(d);
  }
  function a(d) {
    return d === 40 ? n.attempt(Sm, u, o ? u : h)(d) : d === 91 ? n.attempt(Cm, u, o ? c : h)(d) : o ? u(d) : h(d);
  }
  function c(d) {
    return n.attempt(Mm, u, h)(d);
  }
  function u(d) {
    return e(d);
  }
  function h(d) {
    return s._balanced = !0, t(d);
  }
}
function Om(n, e, t) {
  return r;
  function r(h) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(h), n.exit("resourceMarker"), i;
  }
  function i(h) {
    return we(h) ? kr(n, s)(h) : s(h);
  }
  function s(h) {
    return h === 41 ? u(h) : Hu(n, o, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(h);
  }
  function o(h) {
    return we(h) ? kr(n, a)(h) : u(h);
  }
  function l(h) {
    return t(h);
  }
  function a(h) {
    return h === 34 || h === 39 || h === 40 ? ju(n, c, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(h) : u(h);
  }
  function c(h) {
    return we(h) ? kr(n, u)(h) : u(h);
  }
  function u(h) {
    return h === 41 ? (n.enter("resourceMarker"), n.consume(h), n.exit("resourceMarker"), n.exit("resource"), e) : t(h);
  }
}
function Em(n, e, t) {
  const r = this;
  return i;
  function i(l) {
    return Wu.call(r, n, s, o, "reference", "referenceMarker", "referenceString")(l);
  }
  function s(l) {
    return r.parser.defined.includes(Dn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? e(l) : t(l);
  }
  function o(l) {
    return t(l);
  }
}
function Am(n, e, t) {
  return r;
  function r(s) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(s), n.exit("referenceMarker"), i;
  }
  function i(s) {
    return s === 93 ? (n.enter("referenceMarker"), n.consume(s), n.exit("referenceMarker"), n.exit("reference"), e) : t(s);
  }
}
const Dm = {
  name: "labelStartImage",
  resolveAll: Go.resolveAll,
  tokenize: vm
};
function vm(n, e, t) {
  const r = this;
  return i;
  function i(l) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(l), n.exit("labelImageMarker"), s;
  }
  function s(l) {
    return l === 91 ? (n.enter("labelMarker"), n.consume(l), n.exit("labelMarker"), n.exit("labelImage"), o) : t(l);
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(l) : e(l);
  }
}
const Rm = {
  name: "labelStartLink",
  resolveAll: Go.resolveAll,
  tokenize: Pm
};
function Pm(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(o), n.exit("labelMarker"), n.exit("labelLink"), s;
  }
  function s(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : e(o);
  }
}
const ws = {
  name: "lineEnding",
  tokenize: Lm
};
function Lm(n, e) {
  return t;
  function t(r) {
    return n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), X(n, e, "linePrefix");
  }
}
const ri = {
  name: "thematicBreak",
  tokenize: Bm
};
function Bm(n, e, t) {
  let r = 0, i;
  return s;
  function s(c) {
    return n.enter("thematicBreak"), o(c);
  }
  function o(c) {
    return i = c, l(c);
  }
  function l(c) {
    return c === i ? (n.enter("thematicBreakSequence"), a(c)) : r >= 3 && (c === null || L(c)) ? (n.exit("thematicBreak"), e(c)) : t(c);
  }
  function a(c) {
    return c === i ? (n.consume(c), r++, a) : (n.exit("thematicBreakSequence"), K(c) ? X(n, l, "whitespace")(c) : l(c));
  }
}
const be = {
  continuation: {
    tokenize: _m
  },
  exit: Hm,
  name: "list",
  tokenize: Vm
}, zm = {
  partial: !0,
  tokenize: Wm
}, Fm = {
  partial: !0,
  tokenize: $m
};
function Vm(n, e, t) {
  const r = this, i = r.events[r.events.length - 1];
  let s = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return l;
  function l(f) {
    const p = r.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (p === "listUnordered" ? !r.containerState.marker || f === r.containerState.marker : ao(f)) {
      if (r.containerState.type || (r.containerState.type = p, n.enter(p, {
        _container: !0
      })), p === "listUnordered")
        return n.enter("listItemPrefix"), f === 42 || f === 45 ? n.check(ri, t, c)(f) : c(f);
      if (!r.interrupt || f === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), a(f);
    }
    return t(f);
  }
  function a(f) {
    return ao(f) && ++o < 10 ? (n.consume(f), a) : (!r.interrupt || o < 2) && (r.containerState.marker ? f === r.containerState.marker : f === 41 || f === 46) ? (n.exit("listItemValue"), c(f)) : t(f);
  }
  function c(f) {
    return n.enter("listItemMarker"), n.consume(f), n.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || f, n.check(
      qi,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      n.attempt(zm, d, h)
    );
  }
  function u(f) {
    return r.containerState.initialBlankLine = !0, s++, d(f);
  }
  function h(f) {
    return K(f) ? (n.enter("listItemPrefixWhitespace"), n.consume(f), n.exit("listItemPrefixWhitespace"), d) : t(f);
  }
  function d(f) {
    return r.containerState.size = s + r.sliceSerialize(n.exit("listItemPrefix"), !0).length, e(f);
  }
}
function _m(n, e, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, n.check(qi, i, s);
  function i(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, X(n, e, "listItemIndent", r.containerState.size + 1)(l);
  }
  function s(l) {
    return r.containerState.furtherBlankLines || !K(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, n.attempt(Fm, e, o)(l));
  }
  function o(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, X(n, n.attempt(be, e, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function $m(n, e, t) {
  const r = this;
  return X(n, i, "listItemIndent", r.containerState.size + 1);
  function i(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? e(s) : t(s);
  }
}
function Hm(n) {
  n.exit(this.containerState.type);
}
function Wm(n, e, t) {
  const r = this;
  return X(n, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(s) {
    const o = r.events[r.events.length - 1];
    return !K(s) && o && o[1].type === "listItemPrefixWhitespace" ? e(s) : t(s);
  }
}
const _a = {
  name: "setextUnderline",
  resolveTo: jm,
  tokenize: qm
};
function jm(n, e) {
  let t = n.length, r, i, s;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        r = t;
        break;
      }
      n[t][1].type === "paragraph" && (i = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !s && n[t][1].type === "definition" && (s = t);
  const o = {
    type: "setextHeading",
    start: {
      ...n[r][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[i][1].type = "setextHeadingText", s ? (n.splice(i, 0, ["enter", o, e]), n.splice(s + 1, 0, ["exit", n[r][1], e]), n[r][1].end = {
    ...n[s][1].end
  }) : n[r][1] = o, n.push(["exit", o, e]), n;
}
function qm(n, e, t) {
  const r = this;
  let i;
  return s;
  function s(c) {
    let u = r.events.length, h;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        h = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || h) ? (n.enter("setextHeadingLine"), i = c, o(c)) : t(c);
  }
  function o(c) {
    return n.enter("setextHeadingLineSequence"), l(c);
  }
  function l(c) {
    return c === i ? (n.consume(c), l) : (n.exit("setextHeadingLineSequence"), K(c) ? X(n, a, "lineSuffix")(c) : a(c));
  }
  function a(c) {
    return c === null || L(c) ? (n.exit("setextHeadingLine"), e(c)) : t(c);
  }
}
const Km = {
  tokenize: Jm
};
function Jm(n) {
  const e = this, t = n.attempt(
    // Try to parse a blank line.
    qi,
    r,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, i, X(n, n.attempt(this.parser.constructs.flow, i, n.attempt(Xp, i)), "linePrefix"))
  );
  return t;
  function r(s) {
    if (s === null) {
      n.consume(s);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(s), n.exit("lineEndingBlank"), e.currentConstruct = void 0, t;
  }
  function i(s) {
    if (s === null) {
      n.consume(s);
      return;
    }
    return n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), e.currentConstruct = void 0, t;
  }
}
const Um = {
  resolveAll: Ku()
}, Gm = qu("string"), Ym = qu("text");
function qu(n) {
  return {
    resolveAll: Ku(n === "text" ? Qm : void 0),
    tokenize: e
  };
  function e(t) {
    const r = this, i = this.parser.constructs[n], s = t.attempt(i, o, l);
    return o;
    function o(u) {
      return c(u) ? s(u) : l(u);
    }
    function l(u) {
      if (u === null) {
        t.consume(u);
        return;
      }
      return t.enter("data"), t.consume(u), a;
    }
    function a(u) {
      return c(u) ? (t.exit("data"), s(u)) : (t.consume(u), a);
    }
    function c(u) {
      if (u === null)
        return !0;
      const h = i[u];
      let d = -1;
      if (h)
        for (; ++d < h.length; ) {
          const f = h[d];
          if (!f.previous || f.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Ku(n) {
  return e;
  function e(t, r) {
    let i = -1, s;
    for (; ++i <= t.length; )
      s === void 0 ? t[i] && t[i][1].type === "data" && (s = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== s + 2 && (t[s][1].end = t[i - 1][1].end, t.splice(s + 2, i - s - 2), i = s + 2), s = void 0);
    return n ? n(t, r) : t;
  }
}
function Qm(n, e) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const r = n[t - 1][1], i = e.sliceStream(r);
      let s = i.length, o = -1, l = 0, a;
      for (; s--; ) {
        const c = i[s];
        if (typeof c == "string") {
          for (o = c.length; c.charCodeAt(o - 1) === 32; )
            l++, o--;
          if (o) break;
          o = -1;
        } else if (c === -2)
          a = !0, l++;
        else if (c !== -1) {
          s++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && t === n.length && (l = 0), l) {
        const c = {
          type: t === n.length || a || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: s ? o : r.start._bufferIndex + o,
            _index: r.start._index + s,
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
        }, r.start.offset === r.end.offset ? Object.assign(r, c) : (n.splice(t, 0, ["enter", c, e], ["exit", c, e]), t += 2);
      }
      t++;
    }
  return n;
}
const Xm = {
  42: be,
  43: be,
  45: be,
  48: be,
  49: be,
  50: be,
  51: be,
  52: be,
  53: be,
  54: be,
  55: be,
  56: be,
  57: be,
  62: Fu
}, Zm = {
  91: rm
}, eg = {
  [-2]: bs,
  [-1]: bs,
  32: bs
}, tg = {
  35: cm,
  42: ri,
  45: [_a, ri],
  60: dm,
  61: _a,
  95: ri,
  96: Fa,
  126: Fa
}, ng = {
  38: _u,
  92: Vu
}, rg = {
  [-5]: ws,
  [-4]: ws,
  [-3]: ws,
  33: Dm,
  38: _u,
  42: co,
  60: [Rp, bm],
  91: Rm,
  92: [lm, Vu],
  93: Go,
  95: co,
  96: Kp
}, ig = {
  null: [co, Um]
}, sg = {
  null: [42, 95]
}, og = {
  null: []
}, lg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: sg,
  contentInitial: Zm,
  disable: og,
  document: Xm,
  flow: tg,
  flowInitial: eg,
  insideSpan: ig,
  string: ng,
  text: rg
}, Symbol.toStringTag, { value: "Module" }));
function ag(n, e, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, s = [];
  let o = [], l = [];
  const a = {
    attempt: z(A),
    check: z(b),
    consume: T,
    enter: C,
    exit: E,
    interrupt: z(b, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: m,
    events: [],
    now: p,
    parser: n,
    previous: null,
    sliceSerialize: d,
    sliceStream: f,
    write: h
  };
  let u = e.tokenize.call(c, a);
  return e.resolveAll && s.push(e), c;
  function h(v) {
    return o = Pe(o, v), x(), o[o.length - 1] !== null ? [] : (O(e, 0), c.events = Uo(s, c.events, c), c.events);
  }
  function d(v, R) {
    return ug(f(v), R);
  }
  function f(v) {
    return cg(o, v);
  }
  function p() {
    const {
      _bufferIndex: v,
      _index: R,
      line: Y,
      column: G,
      offset: _
    } = r;
    return {
      _bufferIndex: v,
      _index: R,
      line: Y,
      column: G,
      offset: _
    };
  }
  function m(v) {
    i[v.line] = v.column, P();
  }
  function x() {
    let v;
    for (; r._index < o.length; ) {
      const R = o[r._index];
      if (typeof R == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < R.length; )
          k(R.charCodeAt(r._bufferIndex));
      else
        k(R);
    }
  }
  function k(v) {
    u = u(v);
  }
  function T(v) {
    L(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, P()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = v;
  }
  function C(v, R) {
    const Y = R || {};
    return Y.type = v, Y.start = p(), c.events.push(["enter", Y, c]), l.push(Y), Y;
  }
  function E(v) {
    const R = l.pop();
    return R.end = p(), c.events.push(["exit", R, c]), R;
  }
  function A(v, R) {
    O(v, R.from);
  }
  function b(v, R) {
    R.restore();
  }
  function z(v, R) {
    return Y;
    function Y(G, _, ne) {
      let Z, te, oe, g;
      return Array.isArray(G) ? (
        /* c8 ignore next 1 */
        ut(G)
      ) : "tokenize" in G ? (
        // Looks like a construct.
        ut([
          /** @type {Construct} */
          G
        ])
      ) : _e(G);
      function _e(ce) {
        return Xn;
        function Xn(Nt) {
          const Sn = Nt !== null && ce[Nt], Cn = Nt !== null && ce.null, Qr = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Sn) ? Sn : Sn ? [Sn] : [],
            ...Array.isArray(Cn) ? Cn : Cn ? [Cn] : []
          ];
          return ut(Qr)(Nt);
        }
      }
      function ut(ce) {
        return Z = ce, te = 0, ce.length === 0 ? ne : y(ce[te]);
      }
      function y(ce) {
        return Xn;
        function Xn(Nt) {
          return g = D(), oe = ce, ce.partial || (c.currentConstruct = ce), ce.name && c.parser.constructs.disable.null.includes(ce.name) ? Jt() : ce.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            R ? Object.assign(Object.create(c), R) : c,
            a,
            $e,
            Jt
          )(Nt);
        }
      }
      function $e(ce) {
        return v(oe, g), _;
      }
      function Jt(ce) {
        return g.restore(), ++te < Z.length ? y(Z[te]) : ne;
      }
    }
  }
  function O(v, R) {
    v.resolveAll && !s.includes(v) && s.push(v), v.resolve && st(c.events, R, c.events.length - R, v.resolve(c.events.slice(R), c)), v.resolveTo && (c.events = v.resolveTo(c.events, c));
  }
  function D() {
    const v = p(), R = c.previous, Y = c.currentConstruct, G = c.events.length, _ = Array.from(l);
    return {
      from: G,
      restore: ne
    };
    function ne() {
      r = v, c.previous = R, c.currentConstruct = Y, c.events.length = G, l = _, P();
    }
  }
  function P() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function cg(n, e) {
  const t = e.start._index, r = e.start._bufferIndex, i = e.end._index, s = e.end._bufferIndex;
  let o;
  if (t === i)
    o = [n[t].slice(r, s)];
  else {
    if (o = n.slice(t, i), r > -1) {
      const l = o[0];
      typeof l == "string" ? o[0] = l.slice(r) : o.shift();
    }
    s > 0 && o.push(n[i].slice(0, s));
  }
  return o;
}
function ug(n, e) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < n.length; ) {
    const s = n[t];
    let o;
    if (typeof s == "string")
      o = s;
    else switch (s) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(s);
    }
    i = s === -2, r.push(o);
  }
  return r.join("");
}
function hg(n) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      kp([lg, ...(n || {}).extensions || []])
    ),
    content: i(Tp),
    defined: [],
    document: i(Op),
    flow: i(Km),
    lazy: {},
    string: i(Gm),
    text: i(Ym)
  };
  return r;
  function i(s) {
    return o;
    function o(l) {
      return ag(r, s, l);
    }
  }
}
function fg(n) {
  for (; !$u(n); )
    ;
  return n;
}
const $a = /[\0\t\n\r]/g;
function dg() {
  let n = 1, e = "", t = !0, r;
  return i;
  function i(s, o, l) {
    const a = [];
    let c, u, h, d, f;
    for (s = e + (typeof s == "string" ? s.toString() : new TextDecoder(o || void 0).decode(s)), h = 0, e = "", t && (s.charCodeAt(0) === 65279 && h++, t = void 0); h < s.length; ) {
      if ($a.lastIndex = h, c = $a.exec(s), d = c && c.index !== void 0 ? c.index : s.length, f = s.charCodeAt(d), !c) {
        e = s.slice(h);
        break;
      }
      if (f === 10 && h === d && r)
        a.push(-3), r = void 0;
      else
        switch (r && (a.push(-5), r = void 0), h < d && (a.push(s.slice(h, d)), n += d - h), f) {
          case 0: {
            a.push(65533), n++;
            break;
          }
          case 9: {
            for (u = Math.ceil(n / 4) * 4, a.push(-2); n++ < u; ) a.push(-1);
            break;
          }
          case 10: {
            a.push(-4), n = 1;
            break;
          }
          default:
            r = !0, n = 1;
        }
      h = d + 1;
    }
    return l && (r && a.push(-5), e && a.push(e), a.push(null)), a;
  }
}
const pg = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ju(n) {
  return n.replace(pg, mg);
}
function mg(n, e, t) {
  if (e)
    return e;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), s = i === 120 || i === 88;
    return zu(t.slice(s ? 2 : 1), s ? 16 : 10);
  }
  return Jo(t) || n;
}
function xr(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? Ha(n.position) : "start" in n || "end" in n ? Ha(n) : "line" in n || "column" in n ? uo(n) : "";
}
function uo(n) {
  return Wa(n && n.line) + ":" + Wa(n && n.column);
}
function Ha(n) {
  return uo(n && n.start) + "-" + uo(n && n.end);
}
function Wa(n) {
  return n && typeof n == "number" ? n : 1;
}
const Uu = {}.hasOwnProperty;
function gg(n, e, t) {
  return typeof e != "string" && (t = e, e = void 0), yg(t)(fg(hg(t).document().write(dg()(n, e, !0))));
}
function yg(n) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: s(xa),
      autolinkProtocol: D,
      autolinkEmail: D,
      atxHeading: s(ga),
      blockQuote: s(Cn),
      characterEscape: D,
      characterReference: D,
      codeFenced: s(Qr),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: s(Qr, o),
      codeText: s(wd, o),
      codeTextData: D,
      data: D,
      codeFlowValue: D,
      definition: s(Sd),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: s(Cd),
      hardBreakEscape: s(ya),
      hardBreakTrailing: s(ya),
      htmlFlow: s(ka, o),
      htmlFlowData: D,
      htmlText: s(ka, o),
      htmlTextData: D,
      image: s(Md),
      label: o,
      link: s(xa),
      listItem: s(Nd),
      listItemValue: d,
      listOrdered: s(ba, h),
      listUnordered: s(ba),
      paragraph: s(Td),
      reference: y,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: s(ga),
      strong: s(Id),
      thematicBreak: s(Ed)
    },
    exit: {
      atxHeading: a(),
      atxHeadingSequence: A,
      autolink: a(),
      autolinkEmail: Sn,
      autolinkProtocol: Nt,
      blockQuote: a(),
      characterEscapeValue: P,
      characterReferenceMarkerHexadecimal: Jt,
      characterReferenceMarkerNumeric: Jt,
      characterReferenceValue: ce,
      characterReference: Xn,
      codeFenced: a(x),
      codeFencedFence: m,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: p,
      codeFlowValue: P,
      codeIndented: a(k),
      codeText: a(_),
      codeTextData: P,
      data: P,
      definition: a(),
      definitionDestinationString: E,
      definitionLabelString: T,
      definitionTitleString: C,
      emphasis: a(),
      hardBreakEscape: a(R),
      hardBreakTrailing: a(R),
      htmlFlow: a(Y),
      htmlFlowData: P,
      htmlText: a(G),
      htmlTextData: P,
      image: a(Z),
      label: oe,
      labelText: te,
      lineEnding: v,
      link: a(ne),
      listItem: a(),
      listOrdered: a(),
      listUnordered: a(),
      paragraph: a(),
      referenceString: $e,
      resourceDestinationString: g,
      resourceTitleString: _e,
      resource: ut,
      setextHeading: a(O),
      setextHeadingLineSequence: z,
      setextHeadingText: b,
      strong: a(),
      thematicBreak: a()
    }
  };
  Gu(e, (n || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(S) {
    let N = {
      type: "root",
      children: []
    };
    const F = {
      stack: [N],
      tokenStack: [],
      config: e,
      enter: l,
      exit: c,
      buffer: o,
      resume: u,
      data: t
    }, $ = [];
    let Q = -1;
    for (; ++Q < S.length; )
      if (S[Q][1].type === "listOrdered" || S[Q][1].type === "listUnordered")
        if (S[Q][0] === "enter")
          $.push(Q);
        else {
          const He = $.pop();
          Q = i(S, He, Q);
        }
    for (Q = -1; ++Q < S.length; ) {
      const He = e[S[Q][0]];
      Uu.call(He, S[Q][1].type) && He[S[Q][1].type].call(Object.assign({
        sliceSerialize: S[Q][2].sliceSerialize
      }, F), S[Q][1]);
    }
    if (F.tokenStack.length > 0) {
      const He = F.tokenStack[F.tokenStack.length - 1];
      (He[1] || ja).call(F, void 0, He[0]);
    }
    for (N.position = {
      start: Tt(S.length > 0 ? S[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Tt(S.length > 0 ? S[S.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Q = -1; ++Q < e.transforms.length; )
      N = e.transforms[Q](N) || N;
    return N;
  }
  function i(S, N, F) {
    let $ = N - 1, Q = -1, He = !1, Ut, ht, Zn, er;
    for (; ++$ <= F; ) {
      const Ne = S[$];
      switch (Ne[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Ne[0] === "enter" ? Q++ : Q--, er = void 0;
          break;
        }
        case "lineEndingBlank": {
          Ne[0] === "enter" && (Ut && !er && !Q && !Zn && (Zn = $), er = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          er = void 0;
      }
      if (!Q && Ne[0] === "enter" && Ne[1].type === "listItemPrefix" || Q === -1 && Ne[0] === "exit" && (Ne[1].type === "listUnordered" || Ne[1].type === "listOrdered")) {
        if (Ut) {
          let Mn = $;
          for (ht = void 0; Mn--; ) {
            const ft = S[Mn];
            if (ft[1].type === "lineEnding" || ft[1].type === "lineEndingBlank") {
              if (ft[0] === "exit") continue;
              ht && (S[ht][1].type = "lineEndingBlank", He = !0), ft[1].type = "lineEnding", ht = Mn;
            } else if (!(ft[1].type === "linePrefix" || ft[1].type === "blockQuotePrefix" || ft[1].type === "blockQuotePrefixWhitespace" || ft[1].type === "blockQuoteMarker" || ft[1].type === "listItemIndent")) break;
          }
          Zn && (!ht || Zn < ht) && (Ut._spread = !0), Ut.end = Object.assign({}, ht ? S[ht][1].start : Ne[1].end), S.splice(ht || $, 0, ["exit", Ut, Ne[2]]), $++, F++;
        }
        if (Ne[1].type === "listItemPrefix") {
          const Mn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ne[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ut = Mn, S.splice($, 0, ["enter", Mn, Ne[2]]), $++, F++, Zn = void 0, er = !0;
        }
      }
    }
    return S[N][1]._spread = He, F;
  }
  function s(S, N) {
    return F;
    function F($) {
      l.call(this, S($), $), N && N.call(this, $);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function l(S, N, F) {
    this.stack[this.stack.length - 1].children.push(S), this.stack.push(S), this.tokenStack.push([N, F || void 0]), S.position = {
      start: Tt(N.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function a(S) {
    return N;
    function N(F) {
      S && S.call(this, F), c.call(this, F);
    }
  }
  function c(S, N) {
    const F = this.stack.pop(), $ = this.tokenStack.pop();
    if ($)
      $[0].type !== S.type && (N ? N.call(this, S, $[0]) : ($[1] || ja).call(this, S, $[0]));
    else throw new Error("Cannot close `" + S.type + "` (" + xr({
      start: S.start,
      end: S.end
    }) + "): it’s not open");
    F.position.end = Tt(S.end);
  }
  function u() {
    return Ko(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(S) {
    if (this.data.expectingFirstListItemValue) {
      const N = this.stack[this.stack.length - 2];
      N.start = Number.parseInt(this.sliceSerialize(S), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.lang = S;
  }
  function p() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.meta = S;
  }
  function m() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function x() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = S.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function k() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = S.replace(/(\r?\n|\r)$/g, "");
  }
  function T(S) {
    const N = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = N, F.identifier = Dn(this.sliceSerialize(S)).toLowerCase();
  }
  function C() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.title = S;
  }
  function E() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.url = S;
  }
  function A(S) {
    const N = this.stack[this.stack.length - 1];
    if (!N.depth) {
      const F = this.sliceSerialize(S).length;
      N.depth = F;
    }
  }
  function b() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function z(S) {
    const N = this.stack[this.stack.length - 1];
    N.depth = this.sliceSerialize(S).codePointAt(0) === 61 ? 1 : 2;
  }
  function O() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function D(S) {
    const F = this.stack[this.stack.length - 1].children;
    let $ = F[F.length - 1];
    (!$ || $.type !== "text") && ($ = Od(), $.position = {
      start: Tt(S.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, F.push($)), this.stack.push($);
  }
  function P(S) {
    const N = this.stack.pop();
    N.value += this.sliceSerialize(S), N.position.end = Tt(S.end);
  }
  function v(S) {
    const N = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const F = N.children[N.children.length - 1];
      F.position.end = Tt(S.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(N.type) && (D.call(this, S), P.call(this, S));
  }
  function R() {
    this.data.atHardBreak = !0;
  }
  function Y() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = S;
  }
  function G() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = S;
  }
  function _() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = S;
  }
  function ne() {
    const S = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const N = this.data.referenceType || "shortcut";
      S.type += "Reference", S.referenceType = N, delete S.url, delete S.title;
    } else
      delete S.identifier, delete S.label;
    this.data.referenceType = void 0;
  }
  function Z() {
    const S = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const N = this.data.referenceType || "shortcut";
      S.type += "Reference", S.referenceType = N, delete S.url, delete S.title;
    } else
      delete S.identifier, delete S.label;
    this.data.referenceType = void 0;
  }
  function te(S) {
    const N = this.sliceSerialize(S), F = this.stack[this.stack.length - 2];
    F.label = Ju(N), F.identifier = Dn(N).toLowerCase();
  }
  function oe() {
    const S = this.stack[this.stack.length - 1], N = this.resume(), F = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, F.type === "link") {
      const $ = S.children;
      F.children = $;
    } else
      F.alt = N;
  }
  function g() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.url = S;
  }
  function _e() {
    const S = this.resume(), N = this.stack[this.stack.length - 1];
    N.title = S;
  }
  function ut() {
    this.data.inReference = void 0;
  }
  function y() {
    this.data.referenceType = "collapsed";
  }
  function $e(S) {
    const N = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = N, F.identifier = Dn(this.sliceSerialize(S)).toLowerCase(), this.data.referenceType = "full";
  }
  function Jt(S) {
    this.data.characterReferenceType = S.type;
  }
  function ce(S) {
    const N = this.sliceSerialize(S), F = this.data.characterReferenceType;
    let $;
    F ? ($ = zu(N, F === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : $ = Jo(N);
    const Q = this.stack[this.stack.length - 1];
    Q.value += $;
  }
  function Xn(S) {
    const N = this.stack.pop();
    N.position.end = Tt(S.end);
  }
  function Nt(S) {
    P.call(this, S);
    const N = this.stack[this.stack.length - 1];
    N.url = this.sliceSerialize(S);
  }
  function Sn(S) {
    P.call(this, S);
    const N = this.stack[this.stack.length - 1];
    N.url = "mailto:" + this.sliceSerialize(S);
  }
  function Cn() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Qr() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function wd() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Sd() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Cd() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function ga() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function ya() {
    return {
      type: "break"
    };
  }
  function ka() {
    return {
      type: "html",
      value: ""
    };
  }
  function Md() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function xa() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ba(S) {
    return {
      type: "list",
      ordered: S.type === "listOrdered",
      start: null,
      spread: S._spread,
      children: []
    };
  }
  function Nd(S) {
    return {
      type: "listItem",
      spread: S._spread,
      checked: null,
      children: []
    };
  }
  function Td() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Id() {
    return {
      type: "strong",
      children: []
    };
  }
  function Od() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ed() {
    return {
      type: "thematicBreak"
    };
  }
}
function Tt(n) {
  return {
    line: n.line,
    column: n.column,
    offset: n.offset
  };
}
function Gu(n, e) {
  let t = -1;
  for (; ++t < e.length; ) {
    const r = e[t];
    Array.isArray(r) ? Gu(n, r) : kg(n, r);
  }
}
function kg(n, e) {
  let t;
  for (t in e)
    if (Uu.call(e, t))
      switch (t) {
        case "canContainEols": {
          const r = e[t];
          r && n[t].push(...r);
          break;
        }
        case "transforms": {
          const r = e[t];
          r && n[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[t];
          r && Object.assign(n[t], r);
          break;
        }
      }
}
function ja(n, e) {
  throw n ? new Error("Cannot close `" + n.type + "` (" + xr({
    start: n.start,
    end: n.end
  }) + "): a different token (`" + e.type + "`, " + xr({
    start: e.start,
    end: e.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + e.type + "`, " + xr({
    start: e.start,
    end: e.end
  }) + ") is still open");
}
function ho(n) {
  const e = this;
  e.parser = t;
  function t(r) {
    return gg(r, {
      ...e.data("settings"),
      ...n,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || []
    });
  }
}
const qa = {}.hasOwnProperty;
function xg(n, e) {
  const t = e || {};
  function r(i, ...s) {
    let o = r.invalid;
    const l = r.handlers;
    if (i && qa.call(i, n)) {
      const a = String(i[n]);
      o = qa.call(l, a) ? l[a] : r.unknown;
    }
    if (o)
      return o.call(this, i, ...s);
  }
  return r.handlers = t.handlers || {}, r.invalid = t.invalid, r.unknown = t.unknown, r;
}
const bg = {}.hasOwnProperty;
function Yu(n, e) {
  let t = -1, r;
  if (e.extensions)
    for (; ++t < e.extensions.length; )
      Yu(n, e.extensions[t]);
  for (r in e)
    if (bg.call(e, r))
      switch (r) {
        case "extensions":
          break;
        /* c8 ignore next 4 */
        case "unsafe": {
          Ka(n[r], e[r]);
          break;
        }
        case "join": {
          Ka(n[r], e[r]);
          break;
        }
        case "handlers": {
          wg(n[r], e[r]);
          break;
        }
        default:
          n.options[r] = e[r];
      }
  return n;
}
function Ka(n, e) {
  e && n.push(...e);
}
function wg(n, e) {
  e && Object.assign(n, e);
}
function Sg(n, e, t, r) {
  const i = t.enter("blockquote"), s = t.createTracker(r);
  s.move("> "), s.shift(2);
  const o = t.indentLines(
    t.containerFlow(n, s.current()),
    Cg
  );
  return i(), o;
}
function Cg(n, e, t) {
  return ">" + (t ? "" : " ") + n;
}
function Qu(n, e) {
  return Ja(n, e.inConstruct, !0) && !Ja(n, e.notInConstruct, !1);
}
function Ja(n, e, t) {
  if (typeof e == "string" && (e = [e]), !e || e.length === 0)
    return t;
  let r = -1;
  for (; ++r < e.length; )
    if (n.includes(e[r]))
      return !0;
  return !1;
}
function Ua(n, e, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (t.unsafe[i].character === `
` && Qu(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Mg(n, e) {
  const t = String(n);
  let r = t.indexOf(e), i = r, s = 0, o = 0;
  if (typeof e != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++s > o && (o = s) : s = 1, i = r + e.length, r = t.indexOf(e, i);
  return o;
}
function fo(n, e) {
  return !!(e.options.fences === !1 && n.value && // If there’s no info…
  !n.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(n.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value));
}
function Ng(n) {
  const e = n.options.fence || "`";
  if (e !== "`" && e !== "~")
    throw new Error(
      "Cannot serialize code with `" + e + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return e;
}
function Tg(n, e, t, r) {
  const i = Ng(t), s = n.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
  if (fo(n, t)) {
    const h = t.enter("codeIndented"), d = t.indentLines(s, Ig);
    return h(), d;
  }
  const l = t.createTracker(r), a = i.repeat(Math.max(Mg(s, i) + 1, 3)), c = t.enter("codeFenced");
  let u = l.move(a);
  if (n.lang) {
    const h = t.enter(`codeFencedLang${o}`);
    u += l.move(
      t.safe(n.lang, {
        before: u,
        after: " ",
        encode: ["`"],
        ...l.current()
      })
    ), h();
  }
  if (n.lang && n.meta) {
    const h = t.enter(`codeFencedMeta${o}`);
    u += l.move(" "), u += l.move(
      t.safe(n.meta, {
        before: u,
        after: `
`,
        encode: ["`"],
        ...l.current()
      })
    ), h();
  }
  return u += l.move(`
`), s && (u += l.move(s + `
`)), u += l.move(a), c(), u;
}
function Ig(n, e, t) {
  return (t ? "" : "    ") + n;
}
function Yo(n) {
  const e = n.options.quote || '"';
  if (e !== '"' && e !== "'")
    throw new Error(
      "Cannot serialize title with `" + e + "` for `options.quote`, expected `\"`, or `'`"
    );
  return e;
}
function Og(n, e, t, r) {
  const i = Yo(t), s = i === '"' ? "Quote" : "Apostrophe", o = t.enter("definition");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let c = a.move("[");
  return c += a.move(
    t.safe(t.associationId(n), {
      before: c,
      after: "]",
      ...a.current()
    })
  ), c += a.move("]: "), l(), // If there’s no url, or…
  !n.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (l = t.enter("destinationLiteral"), c += a.move("<"), c += a.move(
    t.safe(n.url, { before: c, after: ">", ...a.current() })
  ), c += a.move(">")) : (l = t.enter("destinationRaw"), c += a.move(
    t.safe(n.url, {
      before: c,
      after: n.title ? " " : `
`,
      ...a.current()
    })
  )), l(), n.title && (l = t.enter(`title${s}`), c += a.move(" " + i), c += a.move(
    t.safe(n.title, {
      before: c,
      after: i,
      ...a.current()
    })
  ), c += a.move(i), l()), o(), c;
}
function Eg(n) {
  const e = n.options.emphasis || "*";
  if (e !== "*" && e !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + e + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return e;
}
function Ft(n) {
  return "&#x" + n.toString(16).toUpperCase() + ";";
}
function Ti(n, e, t) {
  const r = Ni(n), i = Ni(e);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
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
Xu.peek = Ag;
function Xu(n, e, t, r) {
  const i = Eg(t), s = t.enter("emphasis"), o = t.createTracker(r), l = o.move(i);
  let a = o.move(
    t.containerPhrasing(n, {
      after: i,
      before: l,
      ...o.current()
    })
  );
  const c = a.charCodeAt(0), u = Ti(
    r.before.charCodeAt(r.before.length - 1),
    c,
    i
  );
  u.inside && (a = Ft(c) + a.slice(1));
  const h = a.charCodeAt(a.length - 1), d = Ti(r.after.charCodeAt(0), h, i);
  d.inside && (a = a.slice(0, -1) + Ft(h));
  const f = o.move(i);
  return s(), t.attentionEncodeSurroundingInfo = {
    after: d.outside,
    before: u.outside
  }, l + a + f;
}
function Ag(n, e, t) {
  return t.options.emphasis || "*";
}
const Qo = (
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
  (function(n) {
    if (n == null)
      return Pg;
    if (typeof n == "function")
      return Ki(n);
    if (typeof n == "object")
      return Array.isArray(n) ? Dg(n) : vg(n);
    if (typeof n == "string")
      return Rg(n);
    throw new Error("Expected function, string, or object as test");
  })
);
function Dg(n) {
  const e = [];
  let t = -1;
  for (; ++t < n.length; )
    e[t] = Qo(n[t]);
  return Ki(r);
  function r(...i) {
    let s = -1;
    for (; ++s < e.length; )
      if (e[s].apply(this, i)) return !0;
    return !1;
  }
}
function vg(n) {
  const e = (
    /** @type {Record<string, unknown>} */
    n
  );
  return Ki(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let s;
    for (s in n)
      if (i[s] !== e[s]) return !1;
    return !0;
  }
}
function Rg(n) {
  return Ki(e);
  function e(t) {
    return t && t.type === n;
  }
}
function Ki(n) {
  return e;
  function e(t, r, i) {
    return !!(Lg(t) && n.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Pg() {
  return !0;
}
function Lg(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const Zu = [], Bg = !0, po = !1, mo = "skip";
function eh(n, e, t, r) {
  let i;
  typeof e == "function" && typeof t != "function" ? (r = t, t = e) : i = e;
  const s = Qo(i), o = r ? -1 : 1;
  l(n, void 0, [])();
  function l(a, c, u) {
    const h = (
      /** @type {Record<string, unknown>} */
      a && typeof a == "object" ? a : {}
    );
    if (typeof h.type == "string") {
      const f = (
        // `hast`
        typeof h.tagName == "string" ? h.tagName : (
          // `xast`
          typeof h.name == "string" ? h.name : void 0
        )
      );
      Object.defineProperty(d, "name", {
        value: "node (" + (a.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return d;
    function d() {
      let f = Zu, p, m, x;
      if ((!e || s(a, c, u[u.length - 1] || void 0)) && (f = zg(t(a, u)), f[0] === po))
        return f;
      if ("children" in a && a.children) {
        const k = (
          /** @type {UnistParent} */
          a
        );
        if (k.children && f[0] !== mo)
          for (m = (r ? k.children.length : -1) + o, x = u.concat(k); m > -1 && m < k.children.length; ) {
            const T = k.children[m];
            if (p = l(T, m, x)(), p[0] === po)
              return p;
            m = typeof p[1] == "number" ? p[1] : m + o;
          }
      }
      return f;
    }
  }
}
function zg(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [Bg, n] : n == null ? Zu : [n];
}
function Wn(n, e, t, r) {
  let i, s, o;
  typeof e == "function" && typeof t != "function" ? (s = void 0, o = e, i = t) : (s = e, o = t, i = r), eh(n, s, l, i);
  function l(a, c) {
    const u = c[c.length - 1], h = u ? u.children.indexOf(a) : void 0;
    return o(a, h, u);
  }
}
function th(n, e) {
  let t = !1;
  return Wn(n, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, po;
  }), !!((!n.depth || n.depth < 3) && Ko(n) && (e.options.setext || t));
}
function Fg(n, e, t, r) {
  const i = Math.max(Math.min(6, n.depth || 1), 1), s = t.createTracker(r);
  if (th(n, t)) {
    const u = t.enter("headingSetext"), h = t.enter("phrasing"), d = t.containerPhrasing(n, {
      ...s.current(),
      before: `
`,
      after: `
`
    });
    return h(), u(), d + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      d.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(d.lastIndexOf("\r"), d.lastIndexOf(`
`)) + 1)
    );
  }
  const o = "#".repeat(i), l = t.enter("headingAtx"), a = t.enter("phrasing");
  s.move(o + " ");
  let c = t.containerPhrasing(n, {
    before: "# ",
    after: `
`,
    ...s.current()
  });
  return /^[\t ]/.test(c) && (c = Ft(c.charCodeAt(0)) + c.slice(1)), c = c ? o + " " + c : o, t.options.closeAtx && (c += " " + o), a(), l(), c;
}
nh.peek = Vg;
function nh(n) {
  return n.value || "";
}
function Vg() {
  return "<";
}
rh.peek = _g;
function rh(n, e, t, r) {
  const i = Yo(t), s = i === '"' ? "Quote" : "Apostrophe", o = t.enter("image");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let c = a.move("![");
  return c += a.move(
    t.safe(n.alt, { before: c, after: "]", ...a.current() })
  ), c += a.move("]("), l(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (l = t.enter("destinationLiteral"), c += a.move("<"), c += a.move(
    t.safe(n.url, { before: c, after: ">", ...a.current() })
  ), c += a.move(">")) : (l = t.enter("destinationRaw"), c += a.move(
    t.safe(n.url, {
      before: c,
      after: n.title ? " " : ")",
      ...a.current()
    })
  )), l(), n.title && (l = t.enter(`title${s}`), c += a.move(" " + i), c += a.move(
    t.safe(n.title, {
      before: c,
      after: i,
      ...a.current()
    })
  ), c += a.move(i), l()), c += a.move(")"), o(), c;
}
function _g() {
  return "!";
}
ih.peek = $g;
function ih(n, e, t, r) {
  const i = n.referenceType, s = t.enter("imageReference");
  let o = t.enter("label");
  const l = t.createTracker(r);
  let a = l.move("![");
  const c = t.safe(n.alt, {
    before: a,
    after: "]",
    ...l.current()
  });
  a += l.move(c + "]["), o();
  const u = t.stack;
  t.stack = [], o = t.enter("reference");
  const h = t.safe(t.associationId(n), {
    before: a,
    after: "]",
    ...l.current()
  });
  return o(), t.stack = u, s(), i === "full" || !c || c !== h ? a += l.move(h + "]") : i === "shortcut" ? a = a.slice(0, -1) : a += l.move("]"), a;
}
function $g() {
  return "!";
}
sh.peek = Hg;
function sh(n, e, t) {
  let r = n.value || "", i = "`", s = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++s < t.unsafe.length; ) {
    const o = t.unsafe[s], l = t.compilePattern(o);
    let a;
    if (o.atBreak)
      for (; a = l.exec(r); ) {
        let c = a.index;
        r.charCodeAt(c) === 10 && r.charCodeAt(c - 1) === 13 && c--, r = r.slice(0, c) + " " + r.slice(a.index + 1);
      }
  }
  return i + r + i;
}
function Hg() {
  return "`";
}
function oh(n, e) {
  const t = Ko(n);
  return !!(!e.options.resourceLink && // If there’s a url…
  n.url && // And there’s a no title…
  !n.title && // And the content of `node` is a single text node…
  n.children && n.children.length === 1 && n.children[0].type === "text" && // And if the url is the same as the content…
  (t === n.url || "mailto:" + t === n.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(n.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(n.url));
}
lh.peek = Wg;
function lh(n, e, t, r) {
  const i = Yo(t), s = i === '"' ? "Quote" : "Apostrophe", o = t.createTracker(r);
  let l, a;
  if (oh(n, t)) {
    const u = t.stack;
    t.stack = [], l = t.enter("autolink");
    let h = o.move("<");
    return h += o.move(
      t.containerPhrasing(n, {
        before: h,
        after: ">",
        ...o.current()
      })
    ), h += o.move(">"), l(), t.stack = u, h;
  }
  l = t.enter("link"), a = t.enter("label");
  let c = o.move("[");
  return c += o.move(
    t.containerPhrasing(n, {
      before: c,
      after: "](",
      ...o.current()
    })
  ), c += o.move("]("), a(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (a = t.enter("destinationLiteral"), c += o.move("<"), c += o.move(
    t.safe(n.url, { before: c, after: ">", ...o.current() })
  ), c += o.move(">")) : (a = t.enter("destinationRaw"), c += o.move(
    t.safe(n.url, {
      before: c,
      after: n.title ? " " : ")",
      ...o.current()
    })
  )), a(), n.title && (a = t.enter(`title${s}`), c += o.move(" " + i), c += o.move(
    t.safe(n.title, {
      before: c,
      after: i,
      ...o.current()
    })
  ), c += o.move(i), a()), c += o.move(")"), l(), c;
}
function Wg(n, e, t) {
  return oh(n, t) ? "<" : "[";
}
ah.peek = jg;
function ah(n, e, t, r) {
  const i = n.referenceType, s = t.enter("linkReference");
  let o = t.enter("label");
  const l = t.createTracker(r);
  let a = l.move("[");
  const c = t.containerPhrasing(n, {
    before: a,
    after: "]",
    ...l.current()
  });
  a += l.move(c + "]["), o();
  const u = t.stack;
  t.stack = [], o = t.enter("reference");
  const h = t.safe(t.associationId(n), {
    before: a,
    after: "]",
    ...l.current()
  });
  return o(), t.stack = u, s(), i === "full" || !c || c !== h ? a += l.move(h + "]") : i === "shortcut" ? a = a.slice(0, -1) : a += l.move("]"), a;
}
function jg() {
  return "[";
}
function Xo(n) {
  const e = n.options.bullet || "*";
  if (e !== "*" && e !== "+" && e !== "-")
    throw new Error(
      "Cannot serialize items with `" + e + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return e;
}
function qg(n) {
  const e = Xo(n), t = n.options.bulletOther;
  if (!t)
    return e === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (t === e)
    throw new Error(
      "Expected `bullet` (`" + e + "`) and `bulletOther` (`" + t + "`) to be different"
    );
  return t;
}
function Kg(n) {
  const e = n.options.bulletOrdered || ".";
  if (e !== "." && e !== ")")
    throw new Error(
      "Cannot serialize items with `" + e + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return e;
}
function ch(n) {
  const e = n.options.rule || "*";
  if (e !== "*" && e !== "-" && e !== "_")
    throw new Error(
      "Cannot serialize rules with `" + e + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return e;
}
function Jg(n, e, t, r) {
  const i = t.enter("list"), s = t.bulletCurrent;
  let o = n.ordered ? Kg(t) : Xo(t);
  const l = n.ordered ? o === "." ? ")" : "." : qg(t);
  let a = e && t.bulletLastUsed ? o === t.bulletLastUsed : !1;
  if (!n.ordered) {
    const u = n.children ? n.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (o === "*" || o === "-") && // Empty first list item:
      u && (!u.children || !u.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (a = !0), ch(t) === o && u
    ) {
      let h = -1;
      for (; ++h < n.children.length; ) {
        const d = n.children[h];
        if (d && d.type === "listItem" && d.children && d.children[0] && d.children[0].type === "thematicBreak") {
          a = !0;
          break;
        }
      }
    }
  }
  a && (o = l), t.bulletCurrent = o;
  const c = t.containerFlow(n, r);
  return t.bulletLastUsed = o, t.bulletCurrent = s, i(), c;
}
function Ug(n) {
  const e = n.options.listItemIndent || "one";
  if (e !== "tab" && e !== "one" && e !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + e + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return e;
}
function Gg(n, e, t, r) {
  const i = Ug(t);
  let s = t.bulletCurrent || Xo(t);
  e && e.type === "list" && e.ordered && (s = (typeof e.start == "number" && e.start > -1 ? e.start : 1) + (t.options.incrementListMarker === !1 ? 0 : e.children.indexOf(n)) + s);
  let o = s.length + 1;
  (i === "tab" || i === "mixed" && (e && e.type === "list" && e.spread || n.spread)) && (o = Math.ceil(o / 4) * 4);
  const l = t.createTracker(r);
  l.move(s + " ".repeat(o - s.length)), l.shift(o);
  const a = t.enter("listItem"), c = t.indentLines(
    t.containerFlow(n, l.current()),
    u
  );
  return a(), c;
  function u(h, d, f) {
    return d ? (f ? "" : " ".repeat(o)) + h : (f ? s : s + " ".repeat(o - s.length)) + h;
  }
}
function Yg(n, e, t, r) {
  const i = t.enter("paragraph"), s = t.enter("phrasing"), o = t.containerPhrasing(n, r);
  return s(), i(), o;
}
const Qg = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Qo([
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
function Xg(n, e, t, r) {
  return (n.children.some(function(o) {
    return Qg(o);
  }) ? t.containerPhrasing : t.containerFlow).call(t, n, r);
}
function Zg(n) {
  const e = n.options.strong || "*";
  if (e !== "*" && e !== "_")
    throw new Error(
      "Cannot serialize strong with `" + e + "` for `options.strong`, expected `*`, or `_`"
    );
  return e;
}
uh.peek = ey;
function uh(n, e, t, r) {
  const i = Zg(t), s = t.enter("strong"), o = t.createTracker(r), l = o.move(i + i);
  let a = o.move(
    t.containerPhrasing(n, {
      after: i,
      before: l,
      ...o.current()
    })
  );
  const c = a.charCodeAt(0), u = Ti(
    r.before.charCodeAt(r.before.length - 1),
    c,
    i
  );
  u.inside && (a = Ft(c) + a.slice(1));
  const h = a.charCodeAt(a.length - 1), d = Ti(r.after.charCodeAt(0), h, i);
  d.inside && (a = a.slice(0, -1) + Ft(h));
  const f = o.move(i + i);
  return s(), t.attentionEncodeSurroundingInfo = {
    after: d.outside,
    before: u.outside
  }, l + a + f;
}
function ey(n, e, t) {
  return t.options.strong || "*";
}
function ty(n, e, t, r) {
  return t.safe(n.value, r);
}
function ny(n) {
  const e = n.options.ruleRepetition || 3;
  if (e < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + e + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return e;
}
function ry(n, e, t) {
  const r = (ch(t) + (t.options.ruleSpaces ? " " : "")).repeat(ny(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const iy = {
  blockquote: Sg,
  break: Ua,
  code: Tg,
  definition: Og,
  emphasis: Xu,
  hardBreak: Ua,
  heading: Fg,
  html: nh,
  image: rh,
  imageReference: ih,
  inlineCode: sh,
  link: lh,
  linkReference: ah,
  list: Jg,
  listItem: Gg,
  paragraph: Yg,
  root: Xg,
  strong: uh,
  text: ty,
  thematicBreak: ry
}, sy = [oy];
function oy(n, e, t, r) {
  if (e.type === "code" && fo(e, r) && (n.type === "list" || n.type === e.type && fo(n, r)))
    return !1;
  if ("spread" in t && typeof t.spread == "boolean")
    return n.type === "paragraph" && // Two paragraphs.
    (n.type === e.type || e.type === "definition" || // Paragraph followed by a setext heading.
    e.type === "heading" && th(e, r)) ? void 0 : t.spread ? 1 : 0;
}
const Gt = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
], ly = [
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
    notInConstruct: Gt
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
    notInConstruct: Gt
  },
  // A right paren could start a list item or break out of a destination
  // raw.
  { atBreak: !0, before: "\\d+", character: ")" },
  { character: ")", inConstruct: "destinationRaw" },
  // An asterisk can start thematic breaks, list items, emphasis, strong.
  { atBreak: !0, character: "*", after: `(?:[ 	\r
*])` },
  { character: "*", inConstruct: "phrasing", notInConstruct: Gt },
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
    notInConstruct: Gt
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
  { character: "[", inConstruct: "phrasing", notInConstruct: Gt },
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
  { character: "_", inConstruct: "phrasing", notInConstruct: Gt },
  // A grave accent can start code (fenced or text), or it can break out of
  // a grave accent code fence.
  { atBreak: !0, character: "`" },
  {
    character: "`",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
  },
  { character: "`", inConstruct: "phrasing", notInConstruct: Gt },
  // Left brace, vertical bar, right brace are not used in markdown for
  // constructs.
  // A tilde can start code (fenced).
  { atBreak: !0, character: "~" }
];
function ay(n) {
  return n.label || !n.identifier ? n.label || "" : Ju(n.identifier);
}
function cy(n) {
  if (!n._compiled) {
    const e = (n.atBreak ? "[\\r\\n][\\t ]*" : "") + (n.before ? "(?:" + n.before + ")" : "");
    n._compiled = new RegExp(
      (e ? "(" + e + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(n.character) ? "\\" : "") + n.character + (n.after ? "(?:" + n.after + ")" : ""),
      "g"
    );
  }
  return n._compiled;
}
function uy(n, e, t) {
  const r = e.indexStack, i = n.children || [], s = [];
  let o = -1, l = t.before, a;
  r.push(-1);
  let c = e.createTracker(t);
  for (; ++o < i.length; ) {
    const u = i[o];
    let h;
    if (r[r.length - 1] = o, o + 1 < i.length) {
      let p = e.handle.handlers[i[o + 1].type];
      p && p.peek && (p = p.peek), h = p ? p(i[o + 1], n, e, {
        before: "",
        after: "",
        ...c.current()
      }).charAt(0) : "";
    } else
      h = t.after;
    s.length > 0 && (l === "\r" || l === `
`) && u.type === "html" && (s[s.length - 1] = s[s.length - 1].replace(
      /(\r?\n|\r)$/,
      " "
    ), l = " ", c = e.createTracker(t), c.move(s.join("")));
    let d = e.handle(u, n, e, {
      ...c.current(),
      after: h,
      before: l
    });
    a && a === d.slice(0, 1) && (d = Ft(a.charCodeAt(0)) + d.slice(1));
    const f = e.attentionEncodeSurroundingInfo;
    e.attentionEncodeSurroundingInfo = void 0, a = void 0, f && (s.length > 0 && f.before && l === s[s.length - 1].slice(-1) && (s[s.length - 1] = s[s.length - 1].slice(0, -1) + Ft(l.charCodeAt(0))), f.after && (a = h)), c.move(d), s.push(d), l = d.slice(-1);
  }
  return r.pop(), s.join("");
}
function hy(n, e, t) {
  const r = e.indexStack, i = n.children || [], s = e.createTracker(t), o = [];
  let l = -1;
  for (r.push(-1); ++l < i.length; ) {
    const a = i[l];
    r[r.length - 1] = l, o.push(
      s.move(
        e.handle(a, n, e, {
          before: `
`,
          after: `
`,
          ...s.current()
        })
      )
    ), a.type !== "list" && (e.bulletLastUsed = void 0), l < i.length - 1 && o.push(
      s.move(fy(a, i[l + 1], n, e))
    );
  }
  return r.pop(), o.join("");
}
function fy(n, e, t, r) {
  let i = r.join.length;
  for (; i--; ) {
    const s = r.join[i](n, e, t, r);
    if (s === !0 || s === 1)
      break;
    if (typeof s == "number")
      return `
`.repeat(1 + s);
    if (s === !1)
      return `

<!---->

`;
  }
  return `

`;
}
const dy = /\r?\n|\r/g;
function py(n, e) {
  const t = [];
  let r = 0, i = 0, s;
  for (; s = dy.exec(n); )
    o(n.slice(r, s.index)), t.push(s[0]), r = s.index + s[0].length, i++;
  return o(n.slice(r)), t.join("");
  function o(l) {
    t.push(e(l, i, !l));
  }
}
function my(n, e, t) {
  const r = (t.before || "") + (e || "") + (t.after || ""), i = [], s = [], o = {};
  let l = -1;
  for (; ++l < n.unsafe.length; ) {
    const u = n.unsafe[l];
    if (!Qu(n.stack, u))
      continue;
    const h = n.compilePattern(u);
    let d;
    for (; d = h.exec(r); ) {
      const f = "before" in u || !!u.atBreak, p = "after" in u, m = d.index + (f ? d[1].length : 0);
      i.includes(m) ? (o[m].before && !f && (o[m].before = !1), o[m].after && !p && (o[m].after = !1)) : (i.push(m), o[m] = { before: f, after: p });
    }
  }
  i.sort(gy);
  let a = t.before ? t.before.length : 0;
  const c = r.length - (t.after ? t.after.length : 0);
  for (l = -1; ++l < i.length; ) {
    const u = i[l];
    u < a || u >= c || u + 1 < c && i[l + 1] === u + 1 && o[u].after && !o[u + 1].before && !o[u + 1].after || i[l - 1] === u - 1 && o[u].before && !o[u - 1].before && !o[u - 1].after || (a !== u && s.push(Ga(r.slice(a, u), "\\")), a = u, /[!-/:-@[-`{-~]/.test(r.charAt(u)) && (!t.encode || !t.encode.includes(r.charAt(u))) ? s.push("\\") : (s.push(Ft(r.charCodeAt(u))), a++));
  }
  return s.push(Ga(r.slice(a, c), t.after)), s.join("");
}
function gy(n, e) {
  return n - e;
}
function Ga(n, e) {
  const t = /\\(?=[!-/:-@[-`{-~])/g, r = [], i = [], s = n + e;
  let o = -1, l = 0, a;
  for (; a = t.exec(s); )
    r.push(a.index);
  for (; ++o < r.length; )
    l !== r[o] && i.push(n.slice(l, r[o])), i.push("\\"), l = r[o];
  return i.push(n.slice(l)), i.join("");
}
function yy(n) {
  const e = n || {}, t = e.now || {};
  let r = e.lineShift || 0, i = t.line || 1, s = t.column || 1;
  return { move: a, current: o, shift: l };
  function o() {
    return { now: { line: i, column: s }, lineShift: r };
  }
  function l(c) {
    r += c;
  }
  function a(c) {
    const u = c || "", h = u.split(/\r?\n|\r/g), d = h[h.length - 1];
    return i += h.length - 1, s = h.length === 1 ? s + d.length : 1 + d.length + r, u;
  }
}
function ky(n, e) {
  const t = e || {}, r = {
    associationId: ay,
    containerPhrasing: Sy,
    containerFlow: Cy,
    createTracker: yy,
    compilePattern: cy,
    enter: s,
    // @ts-expect-error: GFM / frontmatter are typed in `mdast` but not defined
    // here.
    handlers: { ...iy },
    // @ts-expect-error: add `handle` in a second.
    handle: void 0,
    indentLines: py,
    indexStack: [],
    join: [...sy],
    options: {},
    safe: My,
    stack: [],
    unsafe: [...ly]
  };
  Yu(r, t), r.options.tightDefinitions && r.join.push(wy), r.handle = xg("type", {
    invalid: xy,
    unknown: by,
    handlers: r.handlers
  });
  let i = r.handle(n, void 0, r, {
    before: `
`,
    after: `
`,
    now: { line: 1, column: 1 },
    lineShift: 0
  });
  return i && i.charCodeAt(i.length - 1) !== 10 && i.charCodeAt(i.length - 1) !== 13 && (i += `
`), i;
  function s(o) {
    return r.stack.push(o), l;
    function l() {
      r.stack.pop();
    }
  }
}
function xy(n) {
  throw new Error("Cannot handle value `" + n + "`, expected node");
}
function by(n) {
  const e = (
    /** @type {Nodes} */
    n
  );
  throw new Error("Cannot handle unknown node `" + e.type + "`");
}
function wy(n, e) {
  if (n.type === "definition" && n.type === e.type)
    return 0;
}
function Sy(n, e) {
  return uy(n, this, e);
}
function Cy(n, e) {
  return hy(n, this, e);
}
function My(n, e) {
  return my(this, n, e);
}
function go(n) {
  const e = this;
  e.compiler = t;
  function t(r) {
    return ky(r, {
      ...e.data("settings"),
      ...n,
      // Note: this option is not in the readme.
      // The goal is for it to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("toMarkdownExtensions") || []
    });
  }
}
function Ya(n) {
  if (n)
    throw n;
}
function Ny(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ss, Qa;
function Ty() {
  if (Qa) return Ss;
  Qa = 1;
  var n = Object.prototype.hasOwnProperty, e = Object.prototype.toString, t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(c) {
    return typeof Array.isArray == "function" ? Array.isArray(c) : e.call(c) === "[object Array]";
  }, s = function(c) {
    if (!c || e.call(c) !== "[object Object]")
      return !1;
    var u = n.call(c, "constructor"), h = c.constructor && c.constructor.prototype && n.call(c.constructor.prototype, "isPrototypeOf");
    if (c.constructor && !u && !h)
      return !1;
    var d;
    for (d in c)
      ;
    return typeof d > "u" || n.call(c, d);
  }, o = function(c, u) {
    t && u.name === "__proto__" ? t(c, u.name, {
      enumerable: !0,
      configurable: !0,
      value: u.newValue,
      writable: !0
    }) : c[u.name] = u.newValue;
  }, l = function(c, u) {
    if (u === "__proto__")
      if (n.call(c, u)) {
        if (r)
          return r(c, u).value;
      } else return;
    return c[u];
  };
  return Ss = function a() {
    var c, u, h, d, f, p, m = arguments[0], x = 1, k = arguments.length, T = !1;
    for (typeof m == "boolean" && (T = m, m = arguments[1] || {}, x = 2), (m == null || typeof m != "object" && typeof m != "function") && (m = {}); x < k; ++x)
      if (c = arguments[x], c != null)
        for (u in c)
          h = l(m, u), d = l(c, u), m !== d && (T && d && (s(d) || (f = i(d))) ? (f ? (f = !1, p = h && i(h) ? h : []) : p = h && s(h) ? h : {}, o(m, { name: u, newValue: a(T, p, d) })) : typeof d < "u" && o(m, { name: u, newValue: d }));
    return m;
  }, Ss;
}
var Iy = Ty();
const Cs = /* @__PURE__ */ Ny(Iy);
function yo(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const e = Object.getPrototypeOf(n);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}
function Oy() {
  const n = [], e = { run: t, use: r };
  return e;
  function t(...i) {
    let s = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    l(null, ...i);
    function l(a, ...c) {
      const u = n[++s];
      let h = -1;
      if (a) {
        o(a);
        return;
      }
      for (; ++h < i.length; )
        (c[h] === null || c[h] === void 0) && (c[h] = i[h]);
      i = c, u ? Ey(u, l)(...c) : o(null, ...c);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return n.push(i), e;
  }
}
function Ey(n, e) {
  let t;
  return r;
  function r(...o) {
    const l = n.length > o.length;
    let a;
    l && o.push(i);
    try {
      a = n.apply(this, o);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (l && t)
        throw u;
      return i(u);
    }
    l || (a && a.then && typeof a.then == "function" ? a.then(s, i) : a instanceof Error ? i(a) : s(a));
  }
  function i(o, ...l) {
    t || (t = !0, e(o, ...l));
  }
  function s(o) {
    i(null, o);
  }
}
class Me extends Error {
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
  constructor(e, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", s = {}, o = !1;
    if (t && ("line" in t && "column" in t ? s = { place: t } : "start" in t && "end" in t ? s = { place: t } : "type" in t ? s = {
      ancestors: [t],
      place: t.position
    } : s = { ...t }), typeof e == "string" ? i = e : !s.cause && e && (o = !0, i = e.message, s.cause = e), !s.ruleId && !s.source && typeof r == "string") {
      const a = r.indexOf(":");
      a === -1 ? s.ruleId = r : (s.source = r.slice(0, a), s.ruleId = r.slice(a + 1));
    }
    if (!s.place && s.ancestors && s.ancestors) {
      const a = s.ancestors[s.ancestors.length - 1];
      a && (s.place = a.position);
    }
    const l = s.place && "start" in s.place ? s.place.start : s.place;
    this.ancestors = s.ancestors || void 0, this.cause = s.cause || void 0, this.column = l ? l.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = l ? l.line : void 0, this.name = xr(s.place) || "1:1", this.place = s.place || void 0, this.reason = this.message, this.ruleId = s.ruleId || void 0, this.source = s.source || void 0, this.stack = o && s.cause && typeof s.cause.stack == "string" ? s.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Me.prototype.file = "";
Me.prototype.name = "";
Me.prototype.reason = "";
Me.prototype.message = "";
Me.prototype.stack = "";
Me.prototype.column = void 0;
Me.prototype.line = void 0;
Me.prototype.ancestors = void 0;
Me.prototype.cause = void 0;
Me.prototype.fatal = void 0;
Me.prototype.place = void 0;
Me.prototype.ruleId = void 0;
Me.prototype.source = void 0;
const et = { basename: Ay, dirname: Dy, extname: vy, join: Ry, sep: "/" };
function Ay(n, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  $r(n);
  let t = 0, r = -1, i = n.length, s;
  if (e === void 0 || e.length === 0 || e.length > n.length) {
    for (; i--; )
      if (n.codePointAt(i) === 47) {
        if (s) {
          t = i + 1;
          break;
        }
      } else r < 0 && (s = !0, r = i + 1);
    return r < 0 ? "" : n.slice(t, r);
  }
  if (e === n)
    return "";
  let o = -1, l = e.length - 1;
  for (; i--; )
    if (n.codePointAt(i) === 47) {
      if (s) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && (s = !0, o = i + 1), l > -1 && (n.codePointAt(i) === e.codePointAt(l--) ? l < 0 && (r = i) : (l = -1, r = o));
  return t === r ? r = o : r < 0 && (r = n.length), n.slice(t, r);
}
function Dy(n) {
  if ($r(n), n.length === 0)
    return ".";
  let e = -1, t = n.length, r;
  for (; --t; )
    if (n.codePointAt(t) === 47) {
      if (r) {
        e = t;
        break;
      }
    } else r || (r = !0);
  return e < 0 ? n.codePointAt(0) === 47 ? "/" : "." : e === 1 && n.codePointAt(0) === 47 ? "//" : n.slice(0, e);
}
function vy(n) {
  $r(n);
  let e = n.length, t = -1, r = 0, i = -1, s = 0, o;
  for (; e--; ) {
    const l = n.codePointAt(e);
    if (l === 47) {
      if (o) {
        r = e + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = e + 1), l === 46 ? i < 0 ? i = e : s !== 1 && (s = 1) : i > -1 && (s = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  s === 0 || // The (right-most) trimmed path component is exactly `..`.
  s === 1 && i === t - 1 && i === r + 1 ? "" : n.slice(i, t);
}
function Ry(...n) {
  let e = -1, t;
  for (; ++e < n.length; )
    $r(n[e]), n[e] && (t = t === void 0 ? n[e] : t + "/" + n[e]);
  return t === void 0 ? "." : Py(t);
}
function Py(n) {
  $r(n);
  const e = n.codePointAt(0) === 47;
  let t = Ly(n, !e);
  return t.length === 0 && !e && (t = "."), t.length > 0 && n.codePointAt(n.length - 1) === 47 && (t += "/"), e ? "/" + t : t;
}
function Ly(n, e) {
  let t = "", r = 0, i = -1, s = 0, o = -1, l, a;
  for (; ++o <= n.length; ) {
    if (o < n.length)
      l = n.codePointAt(o);
    else {
      if (l === 47)
        break;
      l = 47;
    }
    if (l === 47) {
      if (!(i === o - 1 || s === 1)) if (i !== o - 1 && s === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (a = t.lastIndexOf("/"), a !== t.length - 1) {
              a < 0 ? (t = "", r = 0) : (t = t.slice(0, a), r = t.length - 1 - t.lastIndexOf("/")), i = o, s = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = o, s = 0;
            continue;
          }
        }
        e && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + n.slice(i + 1, o) : t = n.slice(i + 1, o), r = o - i - 1;
      i = o, s = 0;
    } else l === 46 && s > -1 ? s++ : s = -1;
  }
  return t;
}
function $r(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(n)
    );
}
const By = { cwd: zy };
function zy() {
  return "/";
}
function ko(n) {
  return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && // @ts-expect-error: indexing is fine.
  n.auth === void 0);
}
function Fy(n) {
  if (typeof n == "string")
    n = new URL(n);
  else if (!ko(n)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + n + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (n.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return Vy(n);
}
function Vy(n) {
  if (n.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const e = n.pathname;
  let t = -1;
  for (; ++t < e.length; )
    if (e.codePointAt(t) === 37 && e.codePointAt(t + 1) === 50) {
      const r = e.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(e);
}
const Ms = (
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
class _y {
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
    let t;
    e ? ko(e) ? t = { path: e } : typeof e == "string" || $y(e) ? t = { value: e } : t = e : t = {}, this.cwd = "cwd" in t ? "" : By.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Ms.length; ) {
      const s = Ms[r];
      s in t && t[s] !== void 0 && t[s] !== null && (this[s] = s === "history" ? [...t[s]] : t[s]);
    }
    let i;
    for (i in t)
      Ms.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? et.basename(this.path) : void 0;
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
    Ts(e, "basename"), Ns(e, "basename"), this.path = et.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? et.dirname(this.path) : void 0;
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
    Xa(this.basename, "dirname"), this.path = et.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? et.extname(this.path) : void 0;
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
    if (Ns(e, "extname"), Xa(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = et.join(this.dirname, this.stem + (e || ""));
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
    ko(e) && (e = Fy(e)), Ts(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? et.basename(this.path, this.extname) : void 0;
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
    Ts(e, "stem"), Ns(e, "stem"), this.path = et.join(this.dirname || "", e + (this.extname || ""));
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
  fail(e, t, r) {
    const i = this.message(e, t, r);
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
  info(e, t, r) {
    const i = this.message(e, t, r);
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
  message(e, t, r) {
    const i = new Me(
      // @ts-expect-error: the overloads are fine.
      e,
      t,
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
function Ns(n, e) {
  if (n && n.includes(et.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + et.sep + "`"
    );
}
function Ts(n, e) {
  if (!n)
    throw new Error("`" + e + "` cannot be empty");
}
function Xa(n, e) {
  if (!n)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function $y(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const Hy = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(n) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[n], s = function() {
      return i.apply(s, arguments);
    };
    return Object.setPrototypeOf(s, r), s;
  })
), Wy = {}.hasOwnProperty;
class Zo extends Hy {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Oy();
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
      new Zo()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      e.use(...r);
    }
    return e.data(Cs(!0, {}, this.namespace)), e;
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
  data(e, t) {
    return typeof e == "string" ? arguments.length === 2 ? (Es("data", this.frozen), this.namespace[e] = t, this) : Wy.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Es("data", this.frozen), this.namespace = e, this) : this.namespace;
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
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(e, ...r);
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
    const t = ei(e), r = this.parser || this.Parser;
    return Is("parse", r), r(String(t), t);
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
  process(e, t) {
    const r = this;
    return this.freeze(), Is("process", this.parser || this.Parser), Os("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(s, o) {
      const l = ei(e), a = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(l)
      );
      r.run(a, l, function(u, h, d) {
        if (u || !h || !d)
          return c(u);
        const f = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          h
        ), p = r.stringify(f, d);
        qy(p) ? d.value = p : d.result = p, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          d
        );
      });
      function c(u, h) {
        u || !h ? o(u) : s ? s(h) : t(void 0, h);
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
    let t = !1, r;
    return this.freeze(), Is("processSync", this.parser || this.Parser), Os("processSync", this.compiler || this.Compiler), this.process(e, i), ec("processSync", "process", t), r;
    function i(s, o) {
      t = !0, Ya(s), r = o;
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
  run(e, t, r) {
    Za(e), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? s(void 0, r) : new Promise(s);
    function s(o, l) {
      const a = ei(t);
      i.run(e, a, c);
      function c(u, h, d) {
        const f = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          h || e
        );
        u ? l(u) : o ? o(f) : r(void 0, f, d);
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
  runSync(e, t) {
    let r = !1, i;
    return this.run(e, t, s), ec("runSync", "run", r), i;
    function s(o, l) {
      Ya(o), i = l, r = !0;
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
  stringify(e, t) {
    this.freeze();
    const r = ei(t), i = this.compiler || this.Compiler;
    return Os("stringify", i), Za(e), i(e, r);
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
  use(e, ...t) {
    const r = this.attachers, i = this.namespace;
    if (Es("use", this.frozen), e != null) if (typeof e == "function")
      a(e, t);
    else if (typeof e == "object")
      Array.isArray(e) ? l(e) : o(e);
    else
      throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function s(c) {
      if (typeof c == "function")
        a(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...h] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          a(u, h);
        } else
          o(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function o(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      l(c.plugins), c.settings && (i.settings = Cs(!0, i.settings, c.settings));
    }
    function l(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const h = c[u];
          s(h);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function a(c, u) {
      let h = -1, d = -1;
      for (; ++h < r.length; )
        if (r[h][0] === c) {
          d = h;
          break;
        }
      if (d === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [f, ...p] = u;
        const m = r[d][1];
        yo(m) && yo(f) && (f = Cs(!0, m, f)), r[d] = [c, f, ...p];
      }
    }
  }
}
const xo = new Zo().freeze();
function Is(n, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + n + "` without `parser`");
}
function Os(n, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + n + "` without `compiler`");
}
function Es(n, e) {
  if (e)
    throw new Error(
      "Cannot call `" + n + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Za(n) {
  if (!yo(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function ec(n, e, t) {
  if (!t)
    throw new Error(
      "`" + n + "` finished async. Use `" + e + "` instead"
    );
}
function ei(n) {
  return jy(n) ? n : new _y(n);
}
function jy(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function qy(n) {
  return typeof n == "string" || Ky(n);
}
function Ky(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
var hh = (n) => {
  throw TypeError(n);
}, fh = (n, e, t) => e.has(n) || hh("Cannot " + t), V = (n, e, t) => (fh(n, e, "read from private field"), t ? t.call(n) : e.get(n)), re = (n, e, t) => e.has(n) ? hh("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), ee = (n, e, t, r) => (fh(n, e, "write to private field"), e.set(n, t), t), Ze, ir, ii, si, oi, sr, or, pt, lr, li, ai, ar, ci, cr, ui, hi, On, Yt, fi, ur;
class dh {
}
class ph {
  constructor() {
    this.elements = [], this.size = () => this.elements.length, this.top = () => this.elements.at(-1), this.push = (e) => {
      this.top()?.push(e);
    }, this.open = (e) => {
      this.elements.push(e);
    }, this.close = () => {
      const e = this.elements.pop();
      if (!e) throw gu();
      return e;
    };
  }
}
class el extends dh {
  constructor(e, t, r) {
    super(), this.type = e, this.content = t, this.attrs = r;
  }
  push(e, ...t) {
    this.content.push(e, ...t);
  }
  pop() {
    return this.content.pop();
  }
  static create(e, t, r) {
    return new el(e, t, r);
  }
}
const bo = class extends ph {
  /// @internal
  constructor(e) {
    super(), re(this, Ze), re(this, ir), re(this, ii), re(this, si), re(this, oi), re(this, sr), re(this, or), ee(this, Ze, W.none), ee(this, ir, (t) => t.isText), ee(this, ii, (t, r) => {
      if (V(this, ir).call(this, t) && V(this, ir).call(this, r) && W.sameSet(t.marks, r.marks))
        return this.schema.text(t.text + r.text, t.marks);
    }), ee(this, si, (t) => {
      const r = Object.values({
        ...this.schema.nodes,
        ...this.schema.marks
      }).find((i) => i.spec.parseMarkdown.match(t));
      if (!r) throw Ld(t);
      return r;
    }), ee(this, oi, (t) => {
      const r = V(this, si).call(this, t);
      r.spec.parseMarkdown.runner(this, t, r);
    }), this.injectRoot = (t, r, i) => (this.openNode(r, i), this.next(t.children), this), this.openNode = (t, r) => (this.open(el.create(t, [], r)), this), ee(this, sr, () => {
      ee(this, Ze, W.none);
      const t = this.close();
      return V(this, or).call(this, t.type, t.attrs, t.content);
    }), this.closeNode = () => {
      try {
        V(this, sr).call(this);
      } catch (t) {
        console.error(t);
      }
      return this;
    }, ee(this, or, (t, r, i) => {
      const s = t.createAndFill(r, i, V(this, Ze));
      if (!s) throw Pd(t, r, i);
      return this.push(s), s;
    }), this.addNode = (t, r, i) => {
      try {
        V(this, or).call(this, t, r, i);
      } catch (s) {
        console.error(s);
      }
      return this;
    }, this.openMark = (t, r) => {
      const i = t.create(r);
      return ee(this, Ze, i.addToSet(V(this, Ze))), this;
    }, this.closeMark = (t) => (ee(this, Ze, t.removeFromSet(V(this, Ze))), this), this.addText = (t) => {
      try {
        const r = this.top();
        if (!r) throw gu();
        const i = r.pop(), s = this.schema.text(t, V(this, Ze));
        if (!i)
          return r.push(s), this;
        const o = V(this, ii).call(this, i, s);
        return o ? (r.push(o), this) : (r.push(i, s), this);
      } catch (r) {
        return console.error(r), this;
      }
    }, this.build = () => {
      let t;
      do
        t = V(this, sr).call(this);
      while (this.size());
      return t;
    }, this.next = (t = []) => ([t].flat().forEach((r) => V(this, oi).call(this, r)), this), this.toDoc = () => this.build(), this.run = (t, r) => {
      const i = t.runSync(
        t.parse(r),
        r
      );
      return this.next(i), this;
    }, this.schema = e;
  }
};
Ze = /* @__PURE__ */ new WeakMap();
ir = /* @__PURE__ */ new WeakMap();
ii = /* @__PURE__ */ new WeakMap();
si = /* @__PURE__ */ new WeakMap();
oi = /* @__PURE__ */ new WeakMap();
sr = /* @__PURE__ */ new WeakMap();
or = /* @__PURE__ */ new WeakMap();
bo.create = (n, e) => {
  const t = new bo(n);
  return (r) => (t.run(e, r), t.toDoc());
};
let Jy = bo;
const wo = class extends dh {
  constructor(e, t, r, i = {}) {
    super(), this.type = e, this.children = t, this.value = r, this.props = i, this.push = (s, ...o) => {
      this.children || (this.children = []), this.children.push(s, ...o);
    }, this.pop = () => this.children?.pop();
  }
};
wo.create = (n, e, t, r = {}) => new wo(n, e, t, r);
let tc = wo;
const Uy = (n) => Object.prototype.hasOwnProperty.call(n, "size"), So = class extends ph {
  /// @internal
  constructor(e) {
    super(), re(this, pt), re(this, lr), re(this, li), re(this, ai), re(this, ar), re(this, ci), re(this, cr), re(this, ui), re(this, hi), re(this, On), re(this, Yt), re(this, fi), re(this, ur), ee(this, pt, W.none), ee(this, lr, (t) => {
      const r = Object.values({
        ...this.schema.nodes,
        ...this.schema.marks
      }).find((i) => i.spec.toMarkdown.match(t));
      if (!r) throw Bd(t.type);
      return r;
    }), ee(this, li, (t) => V(this, lr).call(this, t).spec.toMarkdown.runner(this, t)), ee(this, ai, (t, r) => V(this, lr).call(this, t).spec.toMarkdown.runner(this, t, r)), ee(this, ar, (t) => {
      const { marks: r } = t, i = (l) => l.type.spec.priority ?? 50;
      [...r].sort((l, a) => i(l) - i(a)).every((l) => !V(this, ai).call(this, l, t)) && V(this, li).call(this, t), r.forEach((l) => V(this, ur).call(this, l));
    }), ee(this, ci, (t, r) => {
      if (t.type === r || t.children?.length !== 1) return t;
      const i = (a) => {
        if (a.type === r) return a;
        if (a.children?.length !== 1) return null;
        const [c] = a.children;
        return c ? i(c) : null;
      }, s = i(t);
      if (!s) return t;
      const o = s.children ? [...s.children] : void 0, l = { ...t, children: o };
      return l.children = o, s.children = [l], s;
    }), ee(this, cr, (t) => {
      const { children: r } = t;
      return r && (t.children = r.reduce((i, s, o) => {
        if (o === 0) return [s];
        const l = i.at(-1);
        if (l && l.isMark && s.isMark) {
          s = V(this, ci).call(this, s, l.type);
          const { children: a, ...c } = s, { children: u, ...h } = l;
          if (s.type === l.type && a && u && JSON.stringify(c) === JSON.stringify(h)) {
            const d = {
              ...h,
              children: [...u, ...a]
            };
            return i.slice(0, -1).concat(V(this, cr).call(this, d));
          }
        }
        return i.concat(s);
      }, [])), t;
    }), ee(this, ui, (t) => {
      const r = {
        ...t.props,
        type: t.type
      };
      return t.children && (r.children = t.children), t.value && (r.value = t.value), r;
    }), this.openNode = (t, r, i) => (this.open(tc.create(t, void 0, r, i)), this), ee(this, hi, (t, r) => {
      let i = "", s = "";
      const o = t.children;
      let l = -1, a = -1;
      const c = (h) => {
        h && h.forEach((d, f) => {
          d.type === "text" && d.value && (l < 0 && (l = f), a = f);
        });
      };
      if (o) {
        c(o);
        const h = o?.[a], d = o?.[l];
        if (h && h.value.endsWith(" ")) {
          const f = h.value, p = f.trimEnd();
          s = f.slice(p.length), h.value = p;
        }
        if (d && d.value.startsWith(" ")) {
          const f = d.value, p = f.trimStart();
          i = f.slice(0, f.length - p.length), d.value = p;
        }
      }
      i.length && V(this, Yt).call(this, "text", void 0, i);
      const u = r();
      return s.length && V(this, Yt).call(this, "text", void 0, s), u;
    }), ee(this, On, (t = !1) => {
      const r = this.close(), i = () => V(this, Yt).call(this, r.type, r.children, r.value, r.props);
      return t ? V(this, hi).call(this, r, i) : i();
    }), this.closeNode = () => (V(this, On).call(this), this), ee(this, Yt, (t, r, i, s) => {
      const o = tc.create(t, r, i, s), l = V(this, cr).call(this, V(this, ui).call(this, o));
      return this.push(l), l;
    }), this.addNode = (t, r, i, s) => (V(this, Yt).call(this, t, r, i, s), this), ee(this, fi, (t, r, i, s) => t.isInSet(V(this, pt)) ? this : (ee(this, pt, t.addToSet(V(this, pt))), this.openNode(r, i, { ...s, isMark: !0 }))), ee(this, ur, (t) => {
      t.isInSet(V(this, pt)) && (ee(this, pt, t.type.removeFromSet(V(this, pt))), V(this, On).call(this, !0));
    }), this.withMark = (t, r, i, s) => (V(this, fi).call(this, t, r, i, s), this), this.closeMark = (t) => (V(this, ur).call(this, t), this), this.build = () => {
      let t = null;
      do
        t = V(this, On).call(this);
      while (this.size());
      return t;
    }, this.next = (t) => Uy(t) ? (t.forEach((r) => {
      V(this, ar).call(this, r);
    }), this) : (V(this, ar).call(this, t), this), this.toString = (t) => t.stringify(this.build()), this.run = (t) => (this.next(t), this), this.schema = e;
  }
};
pt = /* @__PURE__ */ new WeakMap();
lr = /* @__PURE__ */ new WeakMap();
li = /* @__PURE__ */ new WeakMap();
ai = /* @__PURE__ */ new WeakMap();
ar = /* @__PURE__ */ new WeakMap();
ci = /* @__PURE__ */ new WeakMap();
cr = /* @__PURE__ */ new WeakMap();
ui = /* @__PURE__ */ new WeakMap();
hi = /* @__PURE__ */ new WeakMap();
On = /* @__PURE__ */ new WeakMap();
Yt = /* @__PURE__ */ new WeakMap();
fi = /* @__PURE__ */ new WeakMap();
ur = /* @__PURE__ */ new WeakMap();
So.create = (n, e) => {
  const t = new So(n);
  return (r) => (t.run(r), t.toString(e));
};
let Gy = So;
const mh = 65535, gh = Math.pow(2, 16);
function Yy(n, e) {
  return n + e * gh;
}
function nc(n) {
  return n & mh;
}
function Qy(n) {
  return (n - (n & mh)) / gh;
}
const yh = 1, kh = 2, di = 4, xh = 8;
class Co {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & xh) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (yh | di)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (kh | di)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & di) > 0;
  }
}
class Te {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Te.empty)
      return Te.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = nc(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Qy(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = this.ranges[l + o], h = a + c;
      if (e <= h) {
        let d = c ? e == a ? -1 : e == h ? 1 : t : t, f = a + i + (d < 0 ? 0 : u);
        if (r)
          return f;
        let p = e == (t < 0 ? a : h) ? null : Yy(l / 3, e - a), m = e == a ? kh : e == h ? yh : di;
        return (t < 0 ? e != a : e != h) && (m |= xh), new Co(f, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new Co(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = nc(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Te(this.ranges, !this.inverted);
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
    return e == 0 ? Te.empty : new Te(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Te.empty = new Te([]);
class vr {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, r = 0, i = e ? e.length : 0) {
    this.mirror = t, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || t);
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
  slice(e = 0, t = this.maps.length) {
    return new vr(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this._maps.length; t < e._maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this._maps.length + e._maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new vr();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Co(e, i, null);
  }
}
const As = /* @__PURE__ */ Object.create(null);
class ge {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Te.empty;
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
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = As[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in As)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return As[e] = t, t.prototype.jsonID = e, t;
  }
}
class se {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new se(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new se(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return se.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof Si)
        return se.fail(s.message);
      throw s;
    }
  }
}
function tl(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(tl(s.content, e, s))), s.isInline && (s = e(s, t, i)), r.push(s);
  }
  return M.fromArray(r);
}
class kt extends ge {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new I(tl(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return se.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new rt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new kt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof kt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new kt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new kt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ge.jsonID("addMark", kt);
class rt extends ge {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new I(tl(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return se.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new kt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new rt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof rt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new rt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new rt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ge.jsonID("removeMark", rt);
class Dt extends ge {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return se.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return se.fromReplace(e, this.pos, this.pos + 1, new I(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new Dt(this.pos, t.marks[i]);
        return new Dt(this.pos, this.mark);
      }
    }
    return new dn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Dt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Dt(t.pos, e.markFromJSON(t.mark));
  }
}
ge.jsonID("addNodeMark", Dt);
class dn extends ge {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return se.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return se.fromReplace(e, this.pos, this.pos + 1, new I(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Dt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new dn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new dn(t.pos, e.markFromJSON(t.mark));
  }
}
ge.jsonID("removeNodeMark", dn);
class le extends ge {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && Mo(e, this.from, this.to) ? se.fail("Structure replace would overwrite content") : se.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Te([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new le(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new le(t.pos, Math.max(t.pos, r.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof le) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? I.empty : new I(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new le(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? I.empty : new I(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new le(e.from, this.to, t, this.structure);
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new le(t.from, t.to, I.fromJSON(e, t.slice), !!t.structure);
  }
}
ge.jsonID("replace", le);
class me extends ge {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Mo(e, this.from, this.gapFrom) || Mo(e, this.gapTo, this.to)))
      return se.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return se.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? se.fromReplace(e, this.from, this.to, r) : se.fail("Content does not fit in gap");
  }
  getMap() {
    return new Te([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new me(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || s > r.pos ? null : new me(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new me(t.from, t.to, t.gapFrom, t.gapTo, I.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
ge.jsonID("replaceAround", me);
function Mo(n, e, t) {
  let r = n.resolve(e), i = t - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function Xy(n, e, t, r) {
  let i = [], s = [], o, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let h = a.marks;
    if (!r.isInSet(h) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e), f = Math.min(c + a.nodeSize, t), p = r.addToSet(h);
      for (let m = 0; m < h.length; m++)
        h[m].isInSet(p) || (o && o.to == d && o.mark.eq(h[m]) ? o.to = f : i.push(o = new rt(d, f, h[m])));
      l && l.to == d ? l.to = f : s.push(l = new kt(d, f, r));
    }
  }), i.forEach((a) => n.step(a)), s.forEach((a) => n.step(a));
}
function Zy(n, e, t, r) {
  let i = [], s = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof ji) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let h = a[u], d;
        for (let f = 0; f < i.length; f++) {
          let p = i[f];
          p.step == s - 1 && h.eq(i[f].style) && (d = p);
        }
        d ? (d.to = c, d.step = s) : i.push({ style: h, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => n.step(new rt(o.from, o.to, o.style)));
}
function nl(n, e, t, r = t.contentMatch, i = !0) {
  let s = n.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a), u = l + c.nodeSize, h = r.matchType(c.type);
    if (!h)
      o.push(new le(l, u, I.empty));
    else {
      r = h;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new rt(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, f = /\r?\n|\r/g, p;
        for (; d = f.exec(c.text); )
          p || (p = new I(M.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new le(l + d.index, l + d.index + d[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(M.empty, !0);
    n.replace(l, l, new I(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    n.step(o[a]);
}
function ek(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Ji(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), s = n.$from.index(r), o = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(s, o, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !ek(i, s, o))
      break;
  }
  return null;
}
function tk(n, e, t) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, u = M.empty, h = 0;
  for (let p = s, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = M.from(r.node(p).copy(u)), h++) : a--;
  let d = M.empty, f = 0;
  for (let p = s, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, d = M.from(i.node(p).copy(d)), f++) : c++;
  n.step(new me(a, c, o, l, new I(u.append(d), h, f), u.size - h, !0));
}
function rl(n, e, t = null, r = n) {
  let i = nk(n, e), s = i && rk(r, e);
  return s ? i.map(rc).concat({ type: e, attrs: t }).concat(s.map(rc)) : null;
}
function rc(n) {
  return { type: n, attrs: null };
}
function nk(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function rk(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function ik(n, e, t) {
  let r = M.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = M.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start, s = e.end;
  n.step(new me(i, s, i, s, new I(r, 0, 0), t.length, !0));
}
function sk(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, a) && ok(n.doc, n.mapping.slice(s).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !p ? c = !1 : !f && p && (c = !0);
      }
      c === !1 && wh(n, o, l, s), nl(n, n.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(s), h = u.map(l, 1), d = u.map(l + o.nodeSize, 1);
      return n.step(new me(h, d, h + 1, d - 1, new I(M.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && bh(n, o, l, s), !1;
    }
  });
}
function bh(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + s + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function wh(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + s);
      n.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function ok(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function lk(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new me(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new I(M.from(o), 0, 0), 1, !0));
}
function br(n, e, t = 1, r) {
  let i = n.resolve(e), s = i.depth - t, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > s; c--, u--) {
    let h = i.node(c), d = i.index(c);
    if (h.type.spec.isolating)
      return !1;
    let f = h.content.cutByIndex(d, h.childCount), p = r && r[u + 1];
    p && (f = f.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || h;
    if (!h.canReplace(d + 1, h.childCount) || !m.type.validContent(f))
      return !1;
  }
  let l = i.indexAfter(s), a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function ak(n, e, t = 1, r) {
  let i = n.doc.resolve(e), s = M.empty, o = M.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    s = M.from(i.node(l).copy(s));
    let u = r && r[c];
    o = M.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  n.step(new le(e, e, new I(s.append(o), t, t), !0));
}
function Ui(n, e) {
  let t = n.resolve(e), r = t.index();
  return uk(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function ck(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i), o = s.type == r ? n.type.schema.nodes.text : s.type;
    if (t = t.matchType(o), !t || !n.type.allowsMarks(s.marks))
      return !1;
  }
  return t.validEnd;
}
function uk(n, e) {
  return !!(n && e && !n.isLeaf && ck(n, e));
}
function hk(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, s = n.doc.resolve(e - t), o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre", h = !!o.contentMatch.matchType(i);
    u && !h ? r = !1 : !u && h && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    wh(n, u.node(), u.before(), l);
  }
  o.inlineContent && nl(n, e + t - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new le(c, a.map(e + t, -1), I.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    bh(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function fk(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function dk(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(a, a, i);
      else {
        let h = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = h && c.canReplaceWith(a, a, h[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function Gi(n, e, t = e, r = I.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), s = n.resolve(t);
  return Sh(i, s, r) ? new le(e, t, r) : new pk(i, s, r).fit();
}
function Sh(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class pk {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = M.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = M.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new I(s, o, l);
    return e > -1 ? new me(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new le(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = Ds(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, h = null;
          if (t == 1 && (o ? c.matchType(o.type) || (h = c.fillBefore(M.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: h };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ds(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new I(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ds(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new I(hr(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new I(hr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: h, type: d } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      h = h.matchFragment(i);
    }
    let f = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), x = h.matchType(m.type);
      if (!x)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (h = x, u.push(Ch(m.mark(d.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? f : -1)));
    }
    let p = c == l.childCount;
    p || (f = -1), this.placed = fr(this.placed, t, M.from(u)), this.frontier[t].match = h, p && f < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, x = l; m < f; m++) {
      let k = x.lastChild;
      this.frontier.push({ type: k.type, match: k.contentMatchAt(k.childCount) }), x = k.content;
    }
    this.unplaced = p ? e == 0 ? I.empty : new I(hr(o.content, e - 1, 1), e - 1, f < 0 ? o.openEnd : e - 1) : new I(hr(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !vs(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = vs(e, t, i, r, s);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = vs(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = fr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = fr(this.placed, this.depth, M.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(M.empty, !0);
    t.childCount && (this.placed = fr(this.placed, this.frontier.length, t));
  }
}
function hr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(hr(n.firstChild.content, e - 1, t)));
}
function fr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(fr(n.lastChild.content, e - 1, t)));
}
function Ds(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Ch(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Ch(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), n.copy(r);
}
function vs(n, e, t, r, i) {
  let s = n.node(e), o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !mk(t, s.content, o) ? l : null;
}
function mk(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function gk(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function yk(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), s = n.doc.resolve(t);
  if (Sh(i, s, r))
    return n.step(new le(e, t, r));
  let o = Nh(i, n.doc.resolve(t));
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let d = i.depth, f = i.pos - 1; d > 0; d--, f--) {
    let p = i.node(d).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(d) > -1 ? l = d : i.before(d) == f && o.splice(1, 0, -d);
  }
  let a = o.indexOf(l), c = [], u = r.openStart;
  for (let d = r.content, f = 0; ; f++) {
    let p = d.firstChild;
    if (c.push(p), f == r.openStart)
      break;
    d = p.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let f = c[d], p = gk(f.type);
    if (p && !f.sameMarkup(i.node(Math.abs(l) - 1)))
      u = d;
    else if (p || !f.type.isTextblock)
      break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let f = (d + u + 1) % (r.openStart + 1), p = c[f];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let x = o[(m + a) % o.length], k = !0;
        x < 0 && (k = !1, x = -x);
        let T = i.node(x - 1), C = i.index(x - 1);
        if (T.canReplaceWith(C, C, p.type, p.marks))
          return n.replace(i.before(x), k ? s.after(x) : t, new I(Mh(r.content, 0, r.openStart, f), f, r.openEnd));
      }
  }
  let h = n.steps.length;
  for (let d = o.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > h)); d--) {
    let f = o[d];
    f < 0 || (e = i.before(f), t = s.after(f));
  }
}
function Mh(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(Mh(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(M.empty, !0));
  }
  return n;
}
function kk(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = fk(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new I(M.from(r), 0, 0));
}
function xk(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), s = Nh(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && i.end(o) - t != i.depth - o && r.start(o - 1) == i.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1)))
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function Nh(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (s < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i);
  }
  return t;
}
class vn extends ge {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return se.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return se.fromReplace(e, this.pos, this.pos + 1, new I(M.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new vn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new vn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new vn(t.pos, t.attr, t.value);
  }
}
ge.jsonID("attr", vn);
class Rr extends ge {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return se.ok(r);
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new Rr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Rr(t.attr, t.value);
  }
}
ge.jsonID("docAttr", Rr);
let Fn = class extends Error {
};
Fn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Fn.prototype = Object.create(Error.prototype);
Fn.prototype.constructor = Fn;
Fn.prototype.name = "TransformError";
class bk {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new vr();
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
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Fn(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
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
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = I.empty) {
    let i = Gi(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new I(M.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, I.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
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
  replaceRange(e, t, r) {
    return yk(this, e, t, r), this;
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
  replaceRangeWith(e, t, r) {
    return kk(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return xk(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return tk(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return hk(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return ik(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return sk(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return lk(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new vn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Rr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Dt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof W)
      t.isInSet(r.marks) && this.step(new dn(e, t));
    else {
      let i = r.marks, s, o = [];
      for (; s = t.isInSet(i); )
        o.push(new dn(e, s)), i = s.removeFromSet(i);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
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
  split(e, t = 1, r) {
    return ak(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Xy(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Zy(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return nl(this, e, t, r), this;
  }
}
const Rs = /* @__PURE__ */ Object.create(null);
class q {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new wk(e.min(t), e.max(t))];
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
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
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
  replace(e, t = I.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? I.empty : t), l == 0 && oc(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), oc(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new H(e) : En(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? En(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : En(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Oe(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return En(e, e, 0, 0, 1) || new Oe(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return En(e, e, e.content.size, e.childCount, -1) || new Oe(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Rs[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in Rs)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Rs[e] = t, t.prototype.jsonID = e, t;
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
q.prototype.visible = !0;
class wk {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let ic = !1;
function sc(n) {
  !ic && !n.parent.inlineContent && (ic = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class H extends q {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    sc(e), sc(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return q.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new H(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = I.empty) {
    if (super.replace(e, t), t == I.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof H && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Yi(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new H(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = q.findFrom(t, r, !0) || q.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return q.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (q.findFrom(e, -r, !0) || q.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new H(e, t);
  }
}
q.jsonID("text", H);
class Yi {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Yi(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return H.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class B extends q {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), s = e.resolve(i);
    return r ? q.near(s) : new B(s);
  }
  content() {
    return new I(M.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof B && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new il(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new B(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new B(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
B.prototype.visible = !1;
q.jsonID("node", B);
class il {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Yi(r, r) : new il(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && B.isSelectable(r) ? new B(t) : q.near(t);
  }
}
class Oe extends q {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = I.empty) {
    if (t == I.empty) {
      e.delete(0, e.doc.content.size);
      let r = q.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new Oe(e);
  }
  map(e) {
    return new Oe(e);
  }
  eq(e) {
    return e instanceof Oe;
  }
  getBookmark() {
    return Sk;
  }
}
q.jsonID("all", Oe);
const Sk = {
  map() {
    return this;
  },
  resolve(n) {
    return new Oe(n);
  }
};
function En(n, e, t, r, i, s = !1) {
  if (e.inlineContent)
    return H.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && B.isSelectable(l))
        return B.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = En(n, l, t + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function oc(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof le || i instanceof me))
    return;
  let s = n.mapping.maps[r], o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), n.setSelection(q.near(n.doc.resolve(o), t));
}
const lc = 1, ti = 2, ac = 4;
class Ck extends bk {
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
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | lc) & ~ti, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & lc) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= ti, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return W.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
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
    return (this.updated & ti) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~ti, this.storedMarks = null;
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
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || W.none))), r.replaceWith(this, e), this;
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
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, s)), this.selection.empty || this.setSelection(q.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
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
    return this.updated |= ac, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & ac) > 0;
  }
}
function cc(n, e) {
  return !e || !n ? n : n.bind(e);
}
class dr {
  constructor(e, t, r) {
    this.name = e, this.init = cc(t.init, r), this.apply = cc(t.apply, r);
  }
}
const Mk = [
  new dr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new dr("selection", {
    init(n, e) {
      return n.selection || q.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new dr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new dr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Ps {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Mk.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new dr(r.key, r.spec.state, r));
    });
  }
}
class Xt {
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
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
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
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, u = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let h = 0; h < this.config.plugins.length; h++)
                i.push(h < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Xt(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Ck(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new Ps(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Xt(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
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
    let t = new Ps(this.schema, e.plugins), r = t.fields, i = new Xt(t);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
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
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Ps(e.schema, e.plugins), s = new Xt(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = bt.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = q.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              s[o.name] = c.fromJSON.call(a, e, t[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function Th(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Th(i, e, {})), t[r] = i;
  }
  return t;
}
class De {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Th(e.props, this, this.props), this.key = e.key ? e.key.key : Ih("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Ls = /* @__PURE__ */ Object.create(null);
function Ih(n) {
  return n in Ls ? n + "$" + ++Ls[n] : (Ls[n] = 0, n + "$");
}
class ve {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Ih(e);
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
const sl = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Oh(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Eh = (n, e, t) => {
  let r = Oh(n, t);
  if (!r)
    return !1;
  let i = ol(r);
  if (!i) {
    let o = r.blockRange(), l = o && Ji(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (vh(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Vn(s, "end") || B.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = Gi(n.doc, r.before(o), r.after(o), I.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Vn(s, "end") ? q.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : B.create(a.doc, i.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Nk = (n, e, t) => {
  let r = Oh(n, t);
  if (!r)
    return !1;
  let i = ol(r);
  return i ? Tk(n, i, e) : !1;
};
function Tk(n, e, t) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = Gi(n.doc, s, a, I.empty);
  if (!c || c.from != s || c instanceof le && c.slice.size >= a - s)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(H.create(u.doc, s)), t(u.scrollIntoView());
  }
  return !0;
}
function Vn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Ah = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = ol(r);
  }
  let o = s && s.nodeBefore;
  return !o || !B.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function ol(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Ik(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Ok = (n, e, t) => {
  let r = Ik(n, t);
  if (!r)
    return !1;
  let i = Dh(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (vh(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Vn(s, "start") || B.isSelectable(s))) {
    let o = Gi(n.doc, r.before(), r.after(), I.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(Vn(s, "start") ? q.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : B.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, Ek = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = Dh(r);
  }
  let o = s && s.nodeAfter;
  return !o || !B.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function Dh(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const Ak = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function ll(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Dk = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), s = t.indexAfter(-1), o = ll(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(q.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, vk = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Oe || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = ll(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(o, s.createAndFill());
    l.setSelection(H.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Rk = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (br(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Ji(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Pk(n) {
  return (e, t) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof B && e.selection.node.isBlock)
      return !r.parentOffset || !br(e.doc, r.pos) ? !1 : (t && t(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let s = [], o, l, a = !1, c = !1;
    for (let f = r.depth; ; f--)
      if (r.node(f).isBlock) {
        a = r.end(f) == r.pos + (r.depth - f), c = r.start(f) == r.pos - (r.depth - f), l = ll(r.node(f - 1).contentMatchAt(r.indexAfter(f - 1))), s.unshift(a && l ? { type: l } : null), o = f;
        break;
      } else {
        if (f == 1)
          return !1;
        s.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof H || e.selection instanceof Oe) && u.deleteSelection();
    let h = u.mapping.map(r.pos), d = br(u.doc, h, s.length, s);
    if (d || (s[0] = l ? { type: l } : null, d = br(u.doc, h, s.length, s)), !d)
      return !1;
    if (u.split(h, s.length, s), !a && c && r.node(o).type != l) {
      let f = u.mapping.map(r.before(o)), p = u.doc.resolve(f);
      l && r.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return t && t(u.scrollIntoView()), !0;
  };
}
const Lk = Pk(), Bk = (n, e) => (e && e(n.tr.setSelection(new Oe(n.doc))), !0);
function zk(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || Ui(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function vh(n, e, t, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && zk(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
    if (t) {
      let f = e.pos + s.nodeSize, p = M.empty;
      for (let k = o.length - 1; k >= 0; k--)
        p = M.from(o[k].create(null, p));
      p = M.from(i.copy(p));
      let m = n.tr.step(new me(e.pos - 1, f, e.pos, f, new I(p, 1, 0), o.length, !0)), x = m.doc.resolve(f + 2 * o.length);
      x.nodeAfter && x.nodeAfter.type == i.type && Ui(m.doc, x.pos) && m.join(x.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && a ? null : q.findFrom(e, 1), h = u && u.$from.blockRange(u.$to), d = h && Ji(h);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(h, d).scrollIntoView()), !0;
  if (c && Vn(s, "start", !0) && Vn(i, "end")) {
    let f = i, p = [];
    for (; p.push(f), !f.isTextblock; )
      f = f.lastChild;
    let m = s, x = 1;
    for (; !m.isTextblock; m = m.firstChild)
      x++;
    if (f.canReplace(f.childCount, f.childCount, m.content)) {
      if (t) {
        let k = M.empty;
        for (let C = p.length - 1; C >= 0; C--)
          k = M.from(p[C].copy(k));
        let T = n.tr.step(new me(e.pos - p.length, e.pos + s.nodeSize, e.pos + x, e.pos + s.nodeSize - x, new I(k, p.length, 0), 0, !0));
        t(T.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Rh(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (t && t(e.tr.setSelection(H.create(e.doc, n < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const Fk = Rh(-1), Vk = Rh(1);
function al(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = o && rl(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function Pr(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), h = u.index();
            i = u.parent.canReplaceWith(h, h + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[o];
        s.setBlockType(l, a, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function _k(n, e, t, r) {
  for (let i = 0; i < e.length; i++) {
    let { $from: s, $to: o } = e[i], l = s.depth == 0 ? n.inlineContent && n.type.allowsMarkType(t) : !1;
    if (n.nodesBetween(s.pos, o.pos, (a, c) => {
      if (l)
        return !1;
      l = a.inlineContent && a.type.allowsMarkType(t);
    }), l)
      return !0;
  }
  return !1;
}
function cl(n, e = null, t) {
  return function(r, i) {
    let { empty: s, $cursor: o, ranges: l } = r.selection;
    if (s && !o || !_k(r.doc, l, n))
      return !1;
    if (i)
      if (o)
        n.isInSet(r.storedMarks || o.marks()) ? i(r.tr.removeStoredMark(n)) : i(r.tr.addStoredMark(n.create(e)));
      else {
        let a, c = r.tr;
        a = !l.some((u) => r.doc.rangeHasMark(u.$from.pos, u.$to.pos, n));
        for (let u = 0; u < l.length; u++) {
          let { $from: h, $to: d } = l[u];
          if (!a)
            c.removeMark(h.pos, d.pos, n);
          else {
            let f = h.pos, p = d.pos, m = h.nodeAfter, x = d.nodeBefore, k = m && m.isText ? /^\s*/.exec(m.text)[0].length : 0, T = x && x.isText ? /\s*$/.exec(x.text)[0].length : 0;
            f + k < p && (f += k, p -= T), c.addMark(f, p, n.create(e));
          }
        }
        i(c.scrollIntoView());
      }
    return !0;
  };
}
function jn(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
let Bs = jn(sl, Eh, Ah), uc = jn(sl, Ok, Ek);
const gt = {
  Enter: jn(Ak, vk, Rk, Lk),
  "Mod-Enter": Dk,
  Backspace: Bs,
  "Mod-Backspace": Bs,
  "Shift-Backspace": Bs,
  Delete: uc,
  "Mod-Delete": uc,
  "Mod-a": Bk
}, Ph = {
  "Ctrl-h": gt.Backspace,
  "Alt-Backspace": gt["Mod-Backspace"],
  "Ctrl-d": gt.Delete,
  "Ctrl-Alt-Backspace": gt["Mod-Delete"],
  "Alt-Delete": gt["Mod-Delete"],
  "Alt-d": gt["Mod-Delete"],
  "Ctrl-a": Fk,
  "Ctrl-e": Vk
};
for (let n in gt)
  Ph[n] = gt[n];
const $k = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform ? os.platform() == "darwin" : !1, Hk = $k ? Ph : gt;
class Ye {
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
  constructor(e, t, r = {}) {
    this.match = e, this.match = e, this.handler = typeof t == "string" ? Wk(t) : t, this.undoable = r.undoable !== !1, this.inCode = r.inCode || !1, this.inCodeMark = r.inCodeMark !== !1;
  }
}
function Wk(n) {
  return function(e, t, r, i) {
    let s = n;
    if (t[1]) {
      let o = t[0].lastIndexOf(t[1]);
      s += t[0].slice(o + t[1].length), r += o;
      let l = r - i;
      l > 0 && (s = t[0].slice(o - l, o) + s, r = i);
    }
    return e.tr.insertText(s, r, i);
  };
}
const jk = (n, e) => {
  let t = n.plugins;
  for (let r = 0; r < t.length; r++) {
    let i = t[r], s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        let o = n.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a--)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          let a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, a));
        } else
          o.delete(s.from, s.to);
        e(o);
      }
      return !0;
    }
  }
  return !1;
};
new Ye(/--$/, "—", { inCodeMark: !1 });
new Ye(/\.\.\.$/, "…", { inCodeMark: !1 });
new Ye(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“", { inCodeMark: !1 });
new Ye(/"$/, "”", { inCodeMark: !1 });
new Ye(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘", { inCodeMark: !1 });
new Ye(/'$/, "’", { inCodeMark: !1 });
function ul(n, e, t = null, r) {
  return new Ye(n, (i, s, o, l) => {
    let a = t instanceof Function ? t(s) : t, c = i.tr.delete(o, l), u = c.doc.resolve(o), h = u.blockRange(), d = h && rl(h, e, a);
    if (!d)
      return null;
    c.wrap(h, d);
    let f = c.doc.resolve(o - 1).nodeBefore;
    return f && f.type == e && Ui(c.doc, o - 1) && (!r || r(s, f)) && c.join(o - 1), c;
  });
}
function Lh(n, e, t = null) {
  return new Ye(n, (r, i, s, o) => {
    let l = r.doc.resolve(s), a = t instanceof Function ? t(i) : t;
    return l.node(-1).canReplaceWith(l.index(-1), l.indexAfter(-1), e) ? r.tr.delete(s, o).setBlockType(s, s, e, a) : null;
  });
}
const Vt = typeof navigator < "u" ? navigator : null, hc = typeof document < "u" ? document : null, xn = Vt && Vt.userAgent || "", No = /Edge\/(\d+)/.exec(xn), Bh = /MSIE \d/.exec(xn), To = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(xn), hl = !!(Bh || To || No);
Bh ? document.documentMode : To ? +To[1] : No && +No[1];
const qk = !hl && /gecko\/(\d+)/i.test(xn);
qk && +(/Firefox\/(\d+)/.exec(xn) || [0, 0])[1];
const fc = !hl && /Chrome\/(\d+)/.exec(xn);
fc && +fc[1];
const Kk = !hl && !!Vt && /Apple Computer/.test(Vt.vendor), Jk = Kk && (/Mobile\/\w+/.test(xn) || !!Vt && Vt.maxTouchPoints > 2);
Jk || Vt && /Mac/.test(Vt.platform);
const Uk = !!hc && "webkitFontSmoothing" in hc.documentElement.style;
Uk && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
function zs(n, e, t, r, i, s) {
  if (n.composing) return !1;
  const o = n.state, l = o.doc.resolve(e);
  if (l.parent.type.spec.code) return !1;
  const a = l.parent.textBetween(
    Math.max(0, l.parentOffset - 500),
    l.parentOffset,
    void 0,
    "￼"
  ) + r;
  for (let c of i) {
    const u = c, h = u.match.exec(a), d = h && h[0] && u.handler(o, h, e - (h[0].length - r.length), t);
    if (d)
      return u.undoable !== !1 && d.setMeta(s, { transform: d, from: e, to: t, text: r }), n.dispatch(d), !0;
  }
  return !1;
}
const Gk = new ve("MILKDOWN_CUSTOM_INPUTRULES");
function Yk({ rules: n }) {
  const e = new De({
    key: Gk,
    isInputRules: !0,
    state: {
      init() {
        return null;
      },
      apply(t, r) {
        const i = t.getMeta(this);
        return i || (t.selectionSet || t.docChanged ? null : r);
      }
    },
    props: {
      handleTextInput(t, r, i, s) {
        return zs(t, r, i, s, n, e);
      },
      handleDOMEvents: {
        compositionend: (t) => (setTimeout(() => {
          const { $cursor: r } = t.state.selection;
          r && zs(t, r.pos, r.pos, "", n, e);
        }), !1)
      },
      handleKeyDown(t, r) {
        if (r.key !== "Enter") return !1;
        const { $cursor: i } = t.state.selection;
        return i ? zs(t, i.pos, i.pos, `
`, n, e) : !1;
      }
    }
  });
  return e;
}
function Qi(n, e, t = {}) {
  return new Ye(n, (r, i, s, o) => {
    var l, a, c, u;
    const { tr: h } = r, d = i.length;
    let f = i[d - 1], p = i[0], m = [], x = o;
    const k = {
      group: f,
      fullMatch: p,
      start: s,
      end: o
    }, T = (l = t.updateCaptured) == null ? void 0 : l.call(t, k);
    if (Object.assign(k, T), { group: f, fullMatch: p, start: s, end: o } = k, p === null || f?.trim() === "") return null;
    if (f) {
      const C = p.search(/\S/), E = s + p.indexOf(f), A = E + f.length;
      m = (a = h.storedMarks) != null ? a : [], A < o && h.delete(A, o), E > s && h.delete(s + C, E), x = s + C + f.length;
      const b = (c = t.getAttr) == null ? void 0 : c.call(t, i);
      h.addMark(s, x, e.create(b)), h.setStoredMarks(m), (u = t.beforeDispatch) == null || u.call(t, { match: i, start: s, end: o, tr: h });
    }
    return h;
  });
}
var Qk = Object.defineProperty, Xk = Object.defineProperties, Zk = Object.getOwnPropertyDescriptors, dc = Object.getOwnPropertySymbols, ex = Object.prototype.hasOwnProperty, tx = Object.prototype.propertyIsEnumerable, pc = (n, e, t) => e in n ? Qk(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, nx = (n, e) => {
  for (var t in e || (e = {}))
    ex.call(e, t) && pc(n, t, e[t]);
  if (dc)
    for (var t of dc(e))
      tx.call(e, t) && pc(n, t, e[t]);
  return n;
}, rx = (n, e) => Xk(n, Zk(e));
function mc(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function ix(n, e, t) {
  const i = n.state.doc.content.size, s = mc(e, 0, i), o = mc(t, 0, i), l = n.coordsAtPos(s), a = n.coordsAtPos(o, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), h = Math.min(l.left, a.left), d = Math.max(l.right, a.right), f = d - h, p = u - c, k = {
    top: c,
    bottom: u,
    left: h,
    right: d,
    width: f,
    height: p,
    x: h,
    y: c
  };
  return rx(nx({}, k), {
    toJSON: () => k
  });
}
function sx(n, e) {
  return Array.isArray(n) && n.includes(e.type) || e.type === n;
}
function ox(n) {
  if (n.content.childCount === 1) {
    const e = n.content.firstChild;
    if (e?.type.name === "text" && e.marks.length === 0) return e;
    if (e?.type.name === "paragraph" && e.childCount === 1) {
      const t = e.firstChild;
      if (t?.type.name === "text" && t.marks.length === 0) return t;
    }
  }
  return !1;
}
function lx(n, e) {
  const t = e.nodes[n];
  if (!t) throw zd("node", n);
  return t;
}
function ax(n, e) {
  if (!(n instanceof B)) return;
  const { node: t, $from: r } = n;
  if (sx(e, t))
    return {
      node: t,
      pos: r.pos,
      start: r.start(r.depth),
      depth: r.depth
    };
}
const cx = (n, e) => {
  const { selection: t, doc: r } = n;
  if (t instanceof B)
    return {
      hasNode: t.node.type === e,
      pos: t.from,
      target: t.node
    };
  const { from: i, to: s } = t;
  let o = !1, l = -1, a = null;
  return r.nodesBetween(i, s, (c, u) => a ? !1 : c.type === e ? (o = !0, l = u, a = c, !1) : !0), {
    hasNode: o,
    pos: l,
    target: a
  };
};
var _t = {
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
}, Ii = {
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
}, ux = typeof navigator < "u" && /Mac/.test(navigator.platform), hx = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var he = 0; he < 10; he++) _t[48 + he] = _t[96 + he] = String(he);
for (var he = 1; he <= 24; he++) _t[he + 111] = "F" + he;
for (var he = 65; he <= 90; he++)
  _t[he] = String.fromCharCode(he + 32), Ii[he] = String.fromCharCode(he);
for (var Fs in _t) Ii.hasOwnProperty(Fs) || (Ii[Fs] = _t[Fs]);
function fx(n) {
  var e = ux && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || hx && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Ii : _t)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const dx = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), px = typeof navigator < "u" && /Win/.test(navigator.platform);
function mx(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      dx ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function gx(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[mx(t)] = n[t];
  return e;
}
function Vs(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function yx(n) {
  return new De({ props: { handleKeyDown: kx(n) } });
}
function kx(n) {
  let e = gx(n);
  return function(t, r) {
    let i = fx(r), s, o = e[Vs(i, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Vs(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(px && r.ctrlKey && r.altKey) && (s = _t[r.keyCode]) && s != i) {
        let l = e[Vs(s, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const fe = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, _n = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Io = null;
const mt = function(n, e, t) {
  let r = Io || (Io = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, xx = function() {
  Io = null;
}, pn = function(n, e, t, r) {
  return t && (gc(n, e, t, r, -1) || gc(n, e, t, r, 1));
}, bx = /^(img|br|input|textarea|hr)$/i;
function gc(n, e, t, r, i) {
  for (var s; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : Le(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || Hr(n) || bx.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = fe(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      let o = n.childNodes[e + (i < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        n = o, e = i < 0 ? Le(n) : 0;
    } else
      return !1;
  }
}
function Le(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function wx(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = Le(n);
    } else if (n.parentNode && !Hr(n))
      e = fe(n), n = n.parentNode;
    else
      return null;
  }
}
function Sx(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Hr(n))
      e = fe(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function Cx(n, e, t) {
  for (let r = e == 0, i = e == Le(n); r || i; ) {
    if (n == t)
      return !0;
    let s = fe(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, i = i && s == Le(n);
  }
}
function Hr(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const Xi = function(n) {
  return n.focusNode && pn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function Qt(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Mx(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Nx(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(Le(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(Le(r.startContainer), r.startOffset) };
  }
}
const ot = typeof navigator < "u" ? navigator : null, yc = typeof document < "u" ? document : null, Wt = ot && ot.userAgent || "", Oo = /Edge\/(\d+)/.exec(Wt), zh = /MSIE \d/.exec(Wt), Eo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Wt), Se = !!(zh || Eo || Oo), Lt = zh ? document.documentMode : Eo ? +Eo[1] : Oo ? +Oo[1] : 0, Be = !Se && /gecko\/(\d+)/i.test(Wt);
Be && +(/Firefox\/(\d+)/.exec(Wt) || [0, 0])[1];
const Ao = !Se && /Chrome\/(\d+)/.exec(Wt), pe = !!Ao, Fh = Ao ? +Ao[1] : 0, ye = !Se && !!ot && /Apple Computer/.test(ot.vendor), $n = ye && (/Mobile\/\w+/.test(Wt) || !!ot && ot.maxTouchPoints > 2), Re = $n || (ot ? /Mac/.test(ot.platform) : !1), Tx = ot ? /Win/.test(ot.platform) : !1, xt = /Android \d/.test(Wt), Wr = !!yc && "webkitFontSmoothing" in yc.documentElement.style, Ix = Wr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ox(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function dt(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Ex(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function kc(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; ) {
    if (o.nodeType != 1) {
      o = _n(o);
      continue;
    }
    let l = o, a = l == s.body, c = a ? Ox(s) : Ex(l), u = 0, h = 0;
    if (e.top < c.top + dt(r, "top") ? h = -(c.top - e.top + dt(i, "top")) : e.bottom > c.bottom - dt(r, "bottom") && (h = e.bottom - e.top > c.bottom - c.top ? e.top + dt(i, "top") - c.top : e.bottom - c.bottom + dt(i, "bottom")), e.left < c.left + dt(r, "left") ? u = -(c.left - e.left + dt(i, "left")) : e.right > c.right - dt(r, "right") && (u = e.right - c.right + dt(i, "right")), u || h)
      if (a)
        s.defaultView.scrollBy(u, h);
      else {
        let f = l.scrollLeft, p = l.scrollTop;
        h && (l.scrollTop += h), u && (l.scrollLeft += u);
        let m = l.scrollLeft - f, x = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - x, right: e.right - m, bottom: e.bottom - x };
      }
    let d = a ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(d))
      break;
    o = d == "absolute" ? o.offsetParent : _n(o);
  }
}
function Ax(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = n.root.elementFromPoint(s, o);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Vh(n.dom) };
}
function Vh(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = _n(r))
    ;
  return e;
}
function Dx({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  _h(t, r == 0 ? 0 : r - e);
}
function _h(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let Nn = null;
function vx(n) {
  if (n.setActive)
    return n.setActive();
  if (Nn)
    return n.focus(Nn);
  let e = Vh(n);
  n.focus(Nn == null ? {
    get preventScroll() {
      return Nn = { preventScroll: !0 }, !0;
    }
  } : void 0), Nn || (Nn = !1, _h(e, 0));
}
function $h(n, e) {
  let t, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let u = n.firstChild, h = 0; u; u = u.nextSibling, h++) {
    let d;
    if (u.nodeType == 1)
      d = u.getClientRects();
    else if (u.nodeType == 3)
      d = mt(u).getClientRects();
    else
      continue;
    for (let f = 0; f < d.length; f++) {
      let p = d[f];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = u, r = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = h + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = h + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? Rx(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : $h(t, i);
}
function Rx(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let s = It(r, 1);
    if (s.top != s.bottom && fl(e, s))
      return { node: n, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function fl(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Px(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Lx(n, e, t) {
  let { node: r, offset: i } = $h(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function Bx(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let l = n.docView.nearestDesc(s, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > r.left || a.top > r.top ? i = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), o = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    s = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function Hh(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (fl(e, c))
            return Hh(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return n;
}
function zx(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, s = Nx(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!fl(e, c) || (o = Hh(n.dom, e, c), !o))
      return null;
  }
  if (ye)
    for (let c = o; r && c; c = _n(c))
      c.draggable && (r = void 0);
  if (o = Px(o, e), r) {
    if (Be && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], h;
      u.nodeName == "IMG" && (h = u.getBoundingClientRect()).right <= e.left && h.bottom > e.top && i++;
    }
    let c;
    Wr && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Bx(n, r, i, e));
  }
  l == null && (l = Lx(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function xc(n) {
  return n.top < n.bottom || n.left < n.right;
}
function It(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (xc(r))
      return r;
  }
  return Array.prototype.find.call(t, xc) || n.getBoundingClientRect();
}
const Fx = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Wh(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = Wr || Be;
  if (r.nodeType == 3)
    if (o && (Fx.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = It(mt(r, i, i), t);
      if (Be && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = It(mt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = It(mt(r, i, i + 1), -1);
          if (u.top != a.top)
            return nr(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, nr(It(mt(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == Le(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return _s(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < Le(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return _s(a.getBoundingClientRect(), !0);
    }
    return _s(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == Le(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? mt(a, Le(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return nr(It(c, 1), !1);
  }
  if (s == null && i < Le(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? mt(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return nr(It(c, -1), !0);
  }
  return nr(It(r.nodeType == 3 ? mt(r) : r, -t), t >= 0);
}
function nr(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function _s(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function jh(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function Vx(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return jh(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = Wh(n, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = mt(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const _x = /[\u0590-\u08ac]/;
function $x(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = n.domSelection();
  return l ? !_x.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : jh(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: h } = n.domSelectionRange(), d = l.caretBidiLevel;
    l.modify("move", t, "character");
    let f = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), x = p && !f.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, h), a && (a != u || c != h) && l.extend && l.extend(a, c);
    } catch {
    }
    return d != null && (l.caretBidiLevel = d), x;
  }) : r.pos == r.start() || r.pos == r.end();
}
let bc = null, wc = null, Sc = !1;
function Hx(n, e, t) {
  return bc == e && wc == t ? Sc : (bc = e, wc = t, Sc = t == "up" || t == "down" ? Vx(n, e, t) : $x(n, e, t));
}
const ze = 0, Cc = 1, Zt = 2, lt = 3;
class jr {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = ze, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
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
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
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
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
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
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > fe(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!t || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let l = i.children[o];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof Kh) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof qh && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? fe(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? fe(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, u);
        e = o;
        for (let h = l; h > 0; h--) {
          let d = this.children[h - 1];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(1)) {
            i = fe(d.dom) + 1;
            break;
          }
          e -= d.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let h = this.children[u];
          if (h.size && h.dom.parentNode == this.contentDOM && !h.emptyChildAt(-1)) {
            s = fe(h.dom);
            break;
          }
          t += h.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let f = 0, p = 0; f < this.children.length; f++) {
      let m = this.children[f], x = p + m.size;
      if (s > p && o < x)
        return m.setSelection(e - p - m.border, t - p - m.border, r, i);
      p = x;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), h = !1;
    if ((Be || ye) && e == t) {
      let { node: f, offset: p } = l;
      if (f.nodeType == 3) {
        if (h = !!(p && f.nodeValue[p - 1] == `
`), h && p == f.nodeValue.length)
          for (let m = f, x; m; m = m.parentNode) {
            if (x = m.nextSibling) {
              x.nodeName == "BR" && (l = a = { node: x.parentNode, offset: fe(x) + 1 });
              break;
            }
            let k = m.pmViewDesc;
            if (k && k.node && k.node.isBlock)
              break;
          }
      } else {
        let m = f.childNodes[p - 1];
        h = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (Be && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let f = u.focusNode.childNodes[u.focusOffset];
      f && f.contentEditable == "false" && (i = !0);
    }
    if (!(i || h && ye) && pn(l.node, l.offset, u.anchorNode, u.anchorOffset) && pn(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let d = !1;
    if ((c.extend || e == t) && !(h && Be)) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let p = l;
        l = a, a = p;
      }
      let f = document.createRange();
      f.setEnd(a.node, a.offset), f.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(f);
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
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == o ? Zt : Cc, e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = lt : s.markDirty(e - l, t - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? Zt : lt;
      }
      r = o;
    }
    this.dirty = Zt;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? Zt : Cc;
      t.dirty < r && (t.dirty = r);
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
class qh extends jr {
  constructor(e, t, r, i) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == ze && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
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
class Wx extends jr {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class mn extends jr {
  constructor(e, t, r, i, s) {
    super(e, [], r, i), this.mark = t, this.spec = s;
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name], o = s && s(t, i, r);
    return (!o || !o.dom) && (o = kn.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new mn(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & lt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != lt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != ze) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = ze;
    }
  }
  slice(e, t, r) {
    let i = mn.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    t < o && (s = vo(s, t, o, r)), e > 0 && (s = vo(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class Bt extends jr {
  constructor(e, t, r, i, s, o, l, a, c) {
    super(e, [], s, o), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
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
  static create(e, t, r, i, s, o) {
    let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, h = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: h } = kn.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !h && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let d = u;
    return u = Gh(u, r, t), c ? a = new jx(e, t, r, i, u, h || null, d, c, s, o + 1) : t.isText ? new Zi(e, t, r, i, u, d, s) : new Bt(e, t, r, i, u, h || null, d, s, o + 1);
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
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => M.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == ze && e.eq(this.node) && Oi(t, this.outerDeco) && r.eq(this.innerDeco);
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
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new Kx(this, o && o.node, e);
    Gx(this.node, this.innerDeco, (c, u, h) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !h && a.syncToMarks(u == this.node.childCount ? W.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, h, d) => {
      a.syncToMarks(c.marks, r, e);
      let f;
      a.findNodeMatch(c, u, h, d) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (f = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, u, h, f, e) || a.updateNextNode(c, u, h, e, d, i) || a.addNode(c, u, h, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == Zt) && (o && this.protectLocalComposition(e, o), Jh(this.contentDOM, this.children, e), $n && Yx(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof H) || r < t || i > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = Qx(this.node.content, o, r - t, i - t);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new Wx(this, s, t, i);
    e.input.compositionNodes.push(o), this.children = vo(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == lt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = ze;
  }
  updateOuterDeco(e) {
    if (Oi(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Uh(this.dom, this.nodeDOM, Do(this.outerDeco, this.node, t), Do(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
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
function Mc(n, e, t, r, i) {
  Gh(r, e, n);
  let s = new Bt(void 0, n, e, t, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class Zi extends Bt {
  constructor(e, t, r, i, s, o, l) {
    super(e, t, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == lt || this.dirty != ze && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != ze || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = ze, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), s = document.createTextNode(i.text);
    return new Zi(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = lt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Kh extends jr {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == ze && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class jx extends Bt {
  constructor(e, t, r, i, s, o, l, a, c, u) {
    super(e, t, r, i, s, o, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == lt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r.root) : super.setSelection(e, t, r, i);
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
function Jh(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Nc(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (o instanceof mn) {
      let a = r ? r.previousSibling : n.lastChild;
      Jh(o.contentDOM, o.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Nc(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const wr = function(n) {
  n && (this.nodeName = n);
};
wr.prototype = /* @__PURE__ */ Object.create(null);
const en = [new wr()];
function Do(n, e, t) {
  if (n.length == 0)
    return en;
  let r = t ? en[0] : new wr(), i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new wr(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (t && i.length == 1 && i.push(r = new wr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Uh(n, e, t, r) {
  if (t == en && r == en)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = t[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = en[0]), i = a;
    }
    qx(i, l || en[0], o);
  }
  return i;
}
function qx(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Gh(n, e, t) {
  return Uh(n, n, en, Do(e, t, n.nodeType != 1));
}
function Oi(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Nc(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Kx {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Jx(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = ze, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = mn.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == lt && o.dom == o.contentDOM && (o.dirty = Zt), o.update(e, t, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof Bt) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let u = a.dom, h, d = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != lt && Oi(t, a.outerDeco));
        if (!d && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!d && (h = this.recreateWrapper(a, e, t, r, i, o)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = h, h.contentDOM && (h.dirty = Zt, h.updateChildren(i, o + 1), h.dirty = ze), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Oi(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = Bt.create(this.top, t, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, s) {
    let o = Bt.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new qh(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof mn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Zi) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((ye || pe) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Kh(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Jx(n, e) {
  let t = e, r = t.children.length, i = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof mn)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1))
        break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function Ux(n, e) {
  return n.type.side - e.type.side;
}
function Gx(n, e, t, r) {
  let i = e.locals(n), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, h;
    for (; o < i.length && i[o].to == s; ) {
      let x = i[o++];
      x.widget && (u ? (h || (h = [u])).push(x) : u = x);
    }
    if (u)
      if (h) {
        h.sort(Ux);
        for (let x = 0; x < h.length; x++)
          t(h[x], c, !!a);
      } else
        t(u, c, !!a);
    let d, f;
    if (a)
      f = -1, d = a, a = null;
    else if (c < n.childCount)
      f = c, d = n.child(c++);
    else
      break;
    for (let x = 0; x < l.length; x++)
      l[x].to <= s && l.splice(x--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + d.nodeSize;
    if (d.isText) {
      let x = p;
      o < i.length && i[o].from < x && (x = i[o].from);
      for (let k = 0; k < l.length; k++)
        l[k].to < x && (x = l[k].to);
      x < p && (a = d.cut(x - s), d = d.cut(0, x - s), p = x, f = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = d.isInline && !d.isLeaf ? l.filter((x) => !x.inline) : l.slice();
    r(d, m, e.forChild(s, d), f), s = p;
  }
}
function Yx(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function Qx(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= t) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function vo(n, e, t, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o], c = l, u = l += a.size;
    c >= t || u <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > t && s.push(a.slice(t - c, a.size, r)));
  }
  return s;
}
function dl(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), s = i && i.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (Xi(t)) {
    for (a = o; i && !i.node; )
      i = i.parent;
    let h = i.node;
    if (i && h.isAtom && B.isSelectable(h) && i.parent && !(h.isInline && Cx(t.focusNode, t.focusOffset, i.dom))) {
      let d = i.posBefore;
      c = new B(o == d ? l : r.resolve(d));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let h = o, d = o;
      for (let f = 0; f < t.rangeCount; f++) {
        let p = t.getRangeAt(f);
        h = Math.min(h, n.docView.posFromDOM(p.startContainer, p.startOffset, 1)), d = Math.max(d, n.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (h < 0)
        return null;
      [a, o] = d == n.state.selection.anchor ? [d, h] : [h, d], l = r.resolve(o);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let h = e == "pointer" || n.state.selection.head < l.pos && !s ? 1 : -1;
    c = pl(n, u, l, h);
  }
  return c;
}
function Yh(n) {
  return n.editable ? n.hasFocus() : Xh(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function wt(n, e = !1) {
  let t = n.state.selection;
  if (Qh(n, t), !!Yh(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && pe) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && pn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      Zx(n);
    else {
      let { anchor: r, head: i } = t, s, o;
      Tc && !(t instanceof H) && (t.$from.parent.inlineContent || (s = Ic(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = Ic(n, t.to))), n.docView.setSelection(r, i, n, e), Tc && (s && Oc(s), o && Oc(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Xx(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const Tc = ye || pe && Fh < 63;
function Ic(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (ye && i && i.contentEditable == "false")
    return $s(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return $s(i);
    if (s)
      return $s(s);
  }
}
function $s(n) {
  return n.contentEditable = "true", ye && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function Oc(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Xx(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Yh(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function Zx(n) {
  let e = n.domSelection();
  if (!e)
    return;
  let t = n.cursorWrapper.dom, r = t.nodeName == "IMG";
  r ? e.collapse(t.parentNode, fe(t) + 1) : e.collapse(t, 0), !r && !n.state.selection.visible && Se && Lt <= 11 && (t.disabled = !0, t.disabled = !1);
}
function Qh(n, e) {
  if (e instanceof B) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (Ec(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    Ec(n);
}
function Ec(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function pl(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || H.between(e, t, r);
}
function Ac(n) {
  return n.editable && !n.hasFocus() ? !1 : Xh(n);
}
function Xh(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function e1(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return pn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Ro(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), s = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && q.findFrom(s, e);
}
function Ot(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Dc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof H)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return Ot(n, new H(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Ro(n.state, e);
        return i && i instanceof B ? Ot(n, i) : !1;
      } else if (!(Re && t.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = n.docView.descAt(l)) && !o.contentDOM ? B.isSelectable(s) ? Ot(n, new B(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i)) : Wr ? Ot(n, new H(n.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof B && r.node.isInline)
      return Ot(n, new H(e > 0 ? r.$to : r.$from));
    {
      let i = Ro(n.state, e);
      return i ? Ot(n, i) : !1;
    }
  }
}
function Ei(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Sr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Tn(n, e) {
  return e < 0 ? t1(n) : n1(n);
}
function t1(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, s, o = !1;
  for (Be && t.nodeType == 1 && r < Ei(t) && Sr(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Sr(l, -1))
          i = t, s = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Zh(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Sr(l, -1); )
          i = t.parentNode, s = fe(l), l = l.previousSibling;
        if (l)
          t = l, r = Ei(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Po(n, t, r) : i && Po(n, i, s);
}
function n1(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = Ei(t), s, o;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Sr(l, 1))
        s = t, o = ++r;
      else
        break;
    } else {
      if (Zh(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Sr(l, 1); )
          s = l.parentNode, o = fe(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = Ei(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && Po(n, s, o);
}
function Zh(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function r1(n, e) {
  for (; n && e == n.childNodes.length && !Hr(n); )
    e = fe(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function i1(n, e) {
  for (; n && !e && !Hr(n); )
    e = fe(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Po(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = r1(e, t)) ? (e = o, t = 0) : (s = i1(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (Xi(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && wt(n);
  }, 50);
}
function vc(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(pe || Tx) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Rc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof H && !r.empty || t.indexOf("s") > -1 || Re && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Ro(n.state, e);
    if (o && o instanceof B)
      return Ot(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof Oe ? q.near(o, e) : q.findFrom(o, e);
    return l ? Ot(n, l) : !1;
  }
  return !1;
}
function Pc(n, e) {
  if (!(n.state.selection instanceof H))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function Lc(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function s1(n) {
  if (!ye || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    Lc(n, r, "true"), setTimeout(() => Lc(n, r, "false"), 20);
  }
  return !1;
}
function o1(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function l1(n, e) {
  let t = e.keyCode, r = o1(e);
  if (t == 8 || Re && t == 72 && r == "c")
    return Pc(n, -1) || Tn(n, -1);
  if (t == 46 && !e.shiftKey || Re && t == 68 && r == "c")
    return Pc(n, 1) || Tn(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Re && t == 66 && r == "c") {
    let i = t == 37 ? vc(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Dc(n, i, r) || Tn(n, i);
  } else if (t == 39 || Re && t == 70 && r == "c") {
    let i = t == 39 ? vc(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Dc(n, i, r) || Tn(n, i);
  } else {
    if (t == 38 || Re && t == 80 && r == "c")
      return Rc(n, -1, r) || Tn(n, -1);
    if (t == 40 || Re && t == 78 && r == "c")
      return s1(n) || Rc(n, 1, r) || Tn(n, 1);
    if (r == (Re ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function ml(n, e) {
  n.someProp("transformCopied", (f) => {
    e = f(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let f = r.firstChild;
    t.push(f.type.name, f.attrs != f.type.defaultAttrs ? f.attrs : null), r = f.content;
  }
  let o = n.someProp("clipboardSerializer") || kn.fromSchema(n.state.schema), l = of(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, h = 0;
  for (; c && c.nodeType == 1 && (u = sf[c.nodeName.toLowerCase()]); ) {
    for (let f = u.length - 1; f >= 0; f--) {
      let p = l.createElement(u[f]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), h++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${h ? ` -${h}` : ""} ${JSON.stringify(t)}`);
  let d = n.someProp("clipboardTextSerializer", (f) => f(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: d, slice: e };
}
function ef(n, e, t, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!t && !e)
    return null;
  let a = !!e && (r || s || !t);
  if (a) {
    if (n.someProp("transformPastedText", (d) => {
      e = d(e, s || r, n);
    }), s)
      return l = new I(M.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), n.someProp("transformPasted", (d) => {
        l = d(l, n, !0);
      }), l;
    let h = n.someProp("clipboardTextParser", (d) => d(e, i, r, n));
    if (h)
      l = h;
    else {
      let d = i.marks(), { schema: f } = n.state, p = kn.fromSchema(f);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let x = o.appendChild(document.createElement("p"));
        m && x.appendChild(p.serializeNode(f.text(m, d)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (h) => {
      t = h(t, n);
    }), o = h1(t), Wr && f1(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let h = +u[3]; h > 0; h--) {
      let d = o.firstChild;
      for (; d && d.nodeType != 1; )
        d = d.nextSibling;
      if (!d)
        break;
      o = d;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || fn.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(d) {
      return d.nodeName == "BR" && !d.nextSibling && d.parentNode && !a1.test(d.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = d1(Bc(l, +u[1], +u[2]), u[4]);
  else if (l = I.maxOpen(c1(l.content, i), !0), l.openStart || l.openEnd) {
    let h = 0, d = 0;
    for (let f = l.content.firstChild; h < l.openStart && !f.type.spec.isolating; h++, f = f.firstChild)
      ;
    for (let f = l.content.lastChild; d < l.openEnd && !f.type.spec.isolating; d++, f = f.lastChild)
      ;
    l = Bc(l, h, d);
  }
  return n.someProp("transformPasted", (h) => {
    l = h(l, n, a);
  }), l;
}
const a1 = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function c1(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && nf(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = rf(o[o.length - 1], s.length));
        let u = tf(l, a);
        o.push(u), i = i.matchType(u.type), s = a;
      }
    }), o)
      return M.from(o);
  }
  return n;
}
function tf(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, M.from(n));
  return n;
}
function nf(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = nf(n, e, t, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(M.from(tf(t, n, i + 1))));
  }
}
function rf(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, rf(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(M.empty, !0);
  return n.copy(t.append(r));
}
function Lo(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, l = o.content;
  return n.childCount > 1 && (s = 0), i < r - 1 && (l = Lo(l, e, t, r, i + 1, s)), i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(M.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l));
}
function Bc(n, e, t) {
  return e < n.openStart && (n = new I(Lo(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new I(Lo(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const sf = {
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
let zc = null;
function of() {
  return zc || (zc = document.implementation.createHTMLDocument("title"));
}
let Hs = null;
function u1(n) {
  let e = window.trustedTypes;
  return e ? (Hs || (Hs = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), Hs.createHTML(n)) : n;
}
function h1(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = of().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && sf[r[1].toLowerCase()]) && (n = i.map((s) => "<" + s + ">").join("") + n + i.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = u1(n), i)
    for (let s = 0; s < i.length; s++)
      t = t.querySelector(i[s]) || t;
  return t;
}
function f1(n) {
  let e = n.querySelectorAll(pe ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function d1(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = M.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new I(i, s, o);
}
const ke = {}, xe = {}, p1 = { touchstart: !0, touchmove: !0 };
class m1 {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function g1(n) {
  for (let e in ke) {
    let t = ke[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      k1(n, r) && !gl(n, r) && (n.editable || !(r.type in xe)) && t(n, r);
    }, p1[e] ? { passive: !0 } : void 0);
  }
  ye && n.dom.addEventListener("input", () => null), Bo(n);
}
function vt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function y1(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Bo(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => gl(n, r));
  });
}
function gl(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function k1(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function x1(n, e) {
  !gl(n, e) && ke[e.type] && (n.editable || !(e.type in xe)) && ke[e.type](n, e);
}
xe.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !af(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(xt && pe && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), $n && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, Qt(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || l1(n, t) ? t.preventDefault() : vt(n, "key");
};
xe.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
xe.keypress = (n, e) => {
  let t = e;
  if (af(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Re && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof H) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode), s = () => n.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i, s)) && n.dispatch(s()), t.preventDefault();
  }
};
function es(n) {
  return { left: n.clientX, top: n.clientY };
}
function b1(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function yl(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (l) => o > s.depth ? l(n, t, s.nodeAfter, s.before(o), i, !0) : l(n, t, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function Rn(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function w1(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && B.isSelectable(r) ? (Rn(n, new B(t)), !0) : !1;
}
function S1(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof B && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (B.isSelectable(l)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (Rn(n, B.create(n.state.doc, i)), !0) : !1;
}
function C1(n, e, t, r, i) {
  return yl(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (i ? S1(n, t) : w1(n, t));
}
function M1(n, e, t, r) {
  return yl(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function N1(n, e, t, r) {
  return yl(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || T1(n, t, r);
}
function T1(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Rn(n, H.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      Rn(n, H.create(r, l + 1, l + 1 + o.content.size));
    else if (B.isSelectable(o))
      Rn(n, B.create(r, l));
    else
      continue;
    return !0;
  }
}
function kl(n) {
  return Ai(n);
}
const lf = Re ? "metaKey" : "ctrlKey";
ke.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = kl(n), i = Date.now(), s = "singleClick";
  i - n.input.lastClick.time < 500 && b1(t, n.input.lastClick) && !t[lf] && n.input.lastClick.button == t.button && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s, button: t.button };
  let o = n.posAtCoords(es(t));
  o && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new I1(n, o, t, !!r)) : (s == "doubleClick" ? M1 : N1)(n, o.pos, o.inside, t) ? t.preventDefault() : vt(n, "pointer"));
};
class I1 {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[lf], this.allowDefault = r.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof B && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && Be && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), vt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => wt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(es(e))), this.updateAllowDefault(e), this.allowDefault || !t ? vt(this.view, "pointer") : C1(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    ye && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    pe && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Rn(this.view, q.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : vt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), vt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
ke.touchstart = (n) => {
  n.input.lastTouch = Date.now(), kl(n), vt(n, "pointer");
};
ke.touchmove = (n) => {
  n.input.lastTouch = Date.now(), vt(n, "pointer");
};
ke.contextmenu = (n) => kl(n);
function af(n, e) {
  return n.composing ? !0 : ye && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const O1 = xt ? 5e3 : -1;
xe.compositionstart = xe.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof H && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Ai(n, !0), n.markCursor = null;
    else if (Ai(n, !e.selection.empty), Be && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  cf(n, O1);
};
xe.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, cf(n, 20));
};
function cf(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Ai(n), e));
}
function uf(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = A1()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function E1(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = wx(e.focusNode, e.focusOffset), r = Sx(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, s = n.domObserver.lastChangedTextNode;
    if (t == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function A1() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Ai(n, e = !1) {
  if (!(xt && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), uf(n), e || n.docView && n.docView.dirty) {
      let t = dl(n), r = n.state.selection;
      return t && !t.eq(r) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function D1(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Lr = Se && Lt < 15 || $n && Ix < 604;
ke.copy = xe.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let s = Lr ? null : t.clipboardData, o = r.content(), { dom: l, text: a } = ml(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : D1(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function v1(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function R1(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Br(n, r.value, null, i, e) : Br(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Br(n, e, t, r, i) {
  let s = ef(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, s || I.empty)))
    return !0;
  if (!s)
    return !1;
  let o = v1(s), l = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function hf(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
xe.paste = (n, e) => {
  let t = e;
  if (n.composing && !xt)
    return;
  let r = Lr ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Br(n, hf(r), r.getData("text/html"), i, t) ? t.preventDefault() : R1(n, t);
};
class ff {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const P1 = Re ? "altKey" : "ctrlKey";
function df(n, e) {
  let t = n.someProp("dragCopies", (r) => !r(e));
  return t ?? !e[P1];
}
ke.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, s = i.empty ? null : n.posAtCoords(es(t)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof B ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = B.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let h = n.docView.nearestDesc(t.target, !0);
      h && h.node.type.spec.draggable && h != n.docView && (o = B.create(n.state.doc, h.posBefore));
    }
  }
  let l = (o || n.state.selection).content(), { dom: a, text: c, slice: u } = ml(n, l);
  (!t.dataTransfer.files.length || !pe || Fh > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(Lr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Lr || t.dataTransfer.setData("text/plain", c), n.dragging = new ff(u, df(n, t), o);
};
ke.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
xe.dragover = xe.dragenter = (n, e) => e.preventDefault();
xe.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(es(t));
  if (!i)
    return;
  let s = n.state.doc.resolve(i.pos), o = r && r.slice;
  o ? n.someProp("transformPasted", (p) => {
    o = p(o, n, !1);
  }) : o = ef(n, hf(t.dataTransfer), Lr ? null : t.dataTransfer.getData("text/html"), !1, s);
  let l = !!(r && df(n, t));
  if (n.someProp("handleDrop", (p) => p(n, t, o || I.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!o)
    return;
  t.preventDefault();
  let a = o ? dk(n.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), h = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, d = c.doc;
  if (h ? c.replaceRangeWith(u, u, o.content.firstChild) : c.replaceRange(u, u, o), c.doc.eq(d))
    return;
  let f = c.doc.resolve(u);
  if (h && B.isSelectable(o.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new B(f));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, x, k, T) => p = T), c.setSelection(pl(n, f, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
ke.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && wt(n);
  }, 20));
};
ke.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
ke.beforeinput = (n, e) => {
  if (pe && xt && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, Qt(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in xe)
  ke[n] = xe[n];
function zr(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Di {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || rn, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new Ie(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Di && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && zr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class zt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || rn;
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new Ie(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof zt && zr(this.attrs, e.attrs) && zr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof zt;
  }
  destroy() {
  }
}
class xl {
  constructor(e, t) {
    this.attrs = e, this.spec = t || rn;
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new Ie(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof xl && zr(this.attrs, e.attrs) && zr(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ie {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new Ie(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new Ie(e, e, new Di(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new Ie(e, t, new zt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new Ie(e, t, new xl(r, i));
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
    return this.type instanceof zt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Di;
  }
}
const An = [], rn = {};
class ie {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : An, this.children = t.length ? t : An;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? vi(t, e, 0, rn) : de;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, i + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == de || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || rn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? L1(this.children, o || [], e, t, r, i, s) : o ? new ie(o.sort(sn), An) : de;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == de ? ie.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = mf(t, l, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, u, c + 1) : i.splice(s, 0, a, a + l.nodeSize, vi(u, l, c + 1, rn)), s += 3;
      }
    });
    let o = pf(s ? gf(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new ie(o.length ? this.local.concat(o).sort(sn) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == de ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + t, a = r[s + 1] + t;
      for (let u = 0, h; u < e.length; u++)
        (h = e[u]) && h.from > l && h.to < a && (e[u] = null, (o || (o = [])).push(h));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != de ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new ie(i, r) : de;
  }
  forChild(e, t) {
    if (this == de)
      return this;
    if (t.isLeaf)
      return ie.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof zt) {
        let c = Math.max(s, a.from) - s, u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new ie(i.sort(sn), An);
      return r ? new At([l, r]) : l;
    }
    return r || de;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof ie) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return bl(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == de)
      return An;
    if (e.inlineContent || !this.local.some(zt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof zt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
ie.empty = new ie([], []);
ie.removeOverlap = bl;
const de = ie.empty;
class At {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, rn));
    return At.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return ie.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != de && (s instanceof At ? r = r.concat(s.members) : r.push(s));
    }
    return At.from(r);
  }
  eq(e) {
    if (!(e instanceof At) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? bl(r ? t : t.sort(sn)) : An;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return de;
      case 1:
        return e[0];
      default:
        return new At(e.every((t) => t instanceof ie) ? e : e.reduce((t, r) => t.concat(r instanceof ie ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function L1(n, e, t, r, i, s, o) {
  let l = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let h = 0;
    t.maps[c].forEach((d, f, p, m) => {
      let x = m - p - (f - d);
      for (let k = 0; k < l.length; k += 3) {
        let T = l[k + 1];
        if (T < 0 || d > T + u - h)
          continue;
        let C = l[k] + u - h;
        f >= C ? l[k + 1] = d <= C ? -2 : -1 : d >= u && x && (l[k] += x, l[k + 1] += x);
      }
      h += x;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), h = u - i;
      if (h < 0 || h >= r.content.size) {
        a = !0;
        continue;
      }
      let d = t.map(n[c + 1] + s, -1), f = d - i, { index: p, offset: m } = r.content.findIndex(h), x = r.maybeChild(p);
      if (x && m == h && m + x.nodeSize == f) {
        let k = l[c + 2].mapInner(t, x, u + 1, n[c] + s + 1, o);
        k != de ? (l[c] = h, l[c + 1] = f, l[c + 2] = k) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = B1(l, n, e, t, i, s, o), u = vi(c, r, 0, o);
    e = u.local;
    for (let h = 0; h < l.length; h += 3)
      l[h + 1] < 0 && (l.splice(h, 3), h -= 3);
    for (let h = 0, d = 0; h < u.children.length; h += 3) {
      let f = u.children[h];
      for (; d < l.length && l[d] < f; )
        d += 3;
      l.splice(d, 0, u.children[h], u.children[h + 1], u.children[h + 2]);
    }
  }
  return new ie(e.sort(sn), l);
}
function pf(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new Ie(i.from + e, i.to + e, i.type));
  }
  return t;
}
function B1(n, e, t, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let h = a.local[u].map(r, i, c);
      h ? t.push(h) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + s + 1);
  return t;
}
function mf(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < r && ((i || (i = [])).push(o), n[s] = null);
  return i;
}
function gf(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function vi(n, e, t, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = mf(n, l, a + t);
    if (c) {
      s = !0;
      let u = vi(c, l, t + a + 1, r);
      u != de && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = pf(s ? gf(n) : n, -t).sort(sn);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new ie(o, i) : de;
}
function sn(n, e) {
  return n.from - e.from || n.to - e.to;
}
function bl(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[i] = s.copy(s.from, r.to), Fc(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), Fc(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Fc(n, e, t) {
  for (; e < n.length && sn(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function Ws(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != de && e.push(r);
  }), n.cursorWrapper && e.push(ie.create(n.state.doc, [n.cursorWrapper.deco])), At.from(e);
}
const z1 = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, F1 = Se && Lt <= 11;
class V1 {
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
class _1 {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new V1(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Se && Lt <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), F1 && (this.onCharData = (r) => {
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
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, z1)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
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
    if (Ac(this.view)) {
      if (this.suppressingSelectionUpdates)
        return wt(this.view);
      if (Se && Lt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && pn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
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
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = _n(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = _n(s))
      if (t.has(s)) {
        r = s;
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
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && Ac(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let h = this.registerMutation(t[u], a);
        h && (s = s < 0 ? h.from : Math.min(h.from, s), o = o < 0 ? h.to : Math.max(h.to, o), h.typeOver && (l = !0));
      }
    if (Be && a.length) {
      let u = a.filter((h) => h.nodeName == "BR");
      if (u.length == 2) {
        let [h, d] = u;
        h.parentNode && h.parentNode.parentNode == d.parentNode ? d.remove() : h.remove();
      } else {
        let { focusNode: h } = this.currentSelection;
        for (let d of u) {
          let f = d.parentNode;
          f && f.nodeName == "LI" && (!h || W1(e, h) != f) && d.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Xi(r) && (c = dl(e)) && c.eq(q.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, wt(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), $1(e)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || wt(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let h = e.addedNodes[u];
        t.push(h), h.nodeType == 3 && (this.lastChangedTextNode = h);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (Se && Lt <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: h, nextSibling: d } = e.addedNodes[u];
          (!h || Array.prototype.indexOf.call(e.addedNodes, h) < 0) && (i = h), (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (s = d);
        }
      let o = i && i.parentNode == e.target ? fe(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? fe(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
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
let Vc = /* @__PURE__ */ new WeakMap(), _c = !1;
function $1(n) {
  if (!Vc.has(n) && (Vc.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = Be, _c)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), _c = !0;
  }
}
function $c(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return pn(o.node, o.offset, i, s) && ([t, r, i, s] = [i, s, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: s };
}
function H1(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return $c(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? $c(n, t) : null;
}
function W1(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function j1(n, e, t) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, u = a.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], Xi(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), pe && n.input.lastKeyCode === 8)
    for (let x = s; x > i; x--) {
      let k = r.childNodes[x - 1], T = k.pmViewDesc;
      if (k.nodeName == "BR" && !T) {
        s = x;
        break;
      }
      if (!T || T.size)
        break;
    }
  let h = n.state.doc, d = n.someProp("domParser") || fn.fromSchema(n.state.schema), f = h.resolve(o), p = null, m = d.parse(r, {
    topNode: f.parent,
    topMatch: f.parent.contentMatchAt(f.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: f.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: q1,
    context: f
  });
  if (c && c[0].pos != null) {
    let x = c[0].pos, k = c[1] && c[1].pos;
    k == null && (k = x), p = { anchor: x + o, head: k + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function q1(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (ye && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || ye && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const K1 = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function J1(n, e, t, r, i) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let O = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, D = dl(n, O);
    if (D && !n.state.selection.eq(D)) {
      if (pe && xt && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (v) => v(n, Qt(13, "Enter"))))
        return;
      let P = n.state.tr.setSelection(D);
      O == "pointer" ? P.setMeta("pointer", !0) : O == "key" && P.scrollIntoView(), s && P.setMeta("composition", s), n.dispatch(P);
    }
    return;
  }
  let o = n.state.doc.resolve(e), l = o.sharedDepth(t);
  e = o.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = j1(n, e, t), u = n.state.doc, h = u.slice(c.from, c.to), d, f;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (d = n.state.selection.to, f = "end") : (d = n.state.selection.from, f = "start"), n.input.lastKeyCode = null;
  let p = Y1(h.content, c.doc.content, c.from, d, f);
  if (p && n.input.domChangeCount++, ($n && n.input.lastIOSEnter > Date.now() - 225 || xt) && i.some((O) => O.nodeType == 1 && !K1.test(O.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (O) => O(n, Qt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof H && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let O = Hc(n, n.state.doc, c.sel);
        if (O && !O.eq(n.state.selection)) {
          let D = n.state.tr.setSelection(O);
          s && D.setMeta("composition", s), n.dispatch(D);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof H && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), Se && Lt <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), x = c.doc.resolveNoCache(p.endB - c.from), k = u.resolve(p.start), T = m.sameParent(x) && m.parent.inlineContent && k.end() >= p.endA, C;
  if (($n && n.input.lastIOSEnter > Date.now() - 225 && (!T || i.some((O) => O.nodeName == "DIV" || O.nodeName == "P")) || !T && m.pos < c.doc.content.size && (!m.sameParent(x) || !m.parent.inlineContent) && !/\S/.test(c.doc.textBetween(m.pos, x.pos, "", "")) && (C = q.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && C.head > m.pos) && n.someProp("handleKeyDown", (O) => O(n, Qt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && G1(u, p.start, p.endA, m, x) && n.someProp("handleKeyDown", (O) => O(n, Qt(8, "Backspace")))) {
    xt && pe && n.domObserver.suppressSelectionUpdates();
    return;
  }
  pe && p.endB == p.start && (n.input.lastChromeDelete = Date.now()), xt && !T && m.start() != x.start() && x.parentOffset == 0 && m.depth == x.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, x = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(O) {
      return O(n, Qt(13, "Enter"));
    });
  }, 20));
  let E = p.start, A = p.endA, b = (O) => {
    let D = O || n.state.tr.replace(E, A, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let P = Hc(n, D.doc, c.sel);
      P && !(pe && n.composing && P.empty && (p.start != p.endB || n.input.lastChromeDelete < Date.now() - 100) && (P.head == E || P.head == D.mapping.map(A) - 1) || Se && P.empty && P.head == E) && D.setSelection(P);
    }
    return s && D.setMeta("composition", s), D.scrollIntoView();
  }, z;
  if (T) {
    if (m.pos == x.pos) {
      Se && Lt <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => wt(n), 20));
      let O = b(n.state.tr.delete(E, A)), D = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      D && O.ensureMarks(D), n.dispatch(O);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (z = U1(m.parent.content.cut(m.parentOffset, x.parentOffset), k.parent.content.cut(k.parentOffset, p.endA - k.start())))
    ) {
      let O = b(n.state.tr);
      z.type == "add" ? O.addMark(E, A, z.mark) : O.removeMark(E, A, z.mark), n.dispatch(O);
    } else if (m.parent.child(m.index()).isText && m.index() == x.index() - (x.textOffset ? 0 : 1)) {
      let O = m.parent.textBetween(m.parentOffset, x.parentOffset), D = () => b(n.state.tr.insertText(O, E, A));
      n.someProp("handleTextInput", (P) => P(n, E, A, O, D)) || n.dispatch(D());
    }
  } else
    n.dispatch(b());
}
function Hc(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : pl(n, e.resolve(t.anchor), e.resolve(t.head));
}
function U1(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, s = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (M.from(c).eq(n))
    return { mark: l, type: o };
}
function G1(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    js(r, !0, !1) < i.pos
  )
    return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(js(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || js(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function js(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function Y1(n, e, t, r, i) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && n.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    s -= a, s && s < e.size && Wc(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), l = s + (l - o), o = s;
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    s -= a, s && s < n.size && Wc(n.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), o = s + (o - l), l = s;
  }
  return { start: s, endA: o, endB: l };
}
function Wc(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class yf {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new m1(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Uc), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Kc(this), qc(this), this.nodeViews = Jc(this), this.docView = Mc(this.state.doc, jc(this), Ws(this), this.dom, this), this.domObserver = new _1(this, (r, i, s, o) => J1(this, r, i, s, o)), this.domObserver.start(), g1(this), this.updatePluginViews();
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
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Bo(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Uc), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (uf(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let f = Jc(this);
      X1(f, this.nodeViews) && (this.nodeViews = f, s = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && Bo(this), this.editable = Kc(this), qc(this);
    let a = Ws(this), c = jc(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", h = s || !this.docView.matchesNode(e.doc, c, a);
    (h || !e.selection.eq(i.selection)) && (o = !0);
    let d = u == "preserve" && o && this.dom.style.overflowAnchor == null && Ax(this);
    if (o) {
      this.domObserver.stop();
      let f = h && (Se || pe) && !this.composing && !i.selection.empty && !e.selection.empty && Q1(i.selection, e.selection);
      if (h) {
        let p = pe ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = E1(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Mc(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (f = !0);
      }
      f || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && e1(this)) ? wt(this, f) : (Qh(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : d && Dx(d);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof B) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && kc(this, t.getBoundingClientRect(), e);
      } else
        kc(this, this.coordsAtPos(this.state.selection.head, 1), e);
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
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new ff(e.slice, e.move, i < 0 ? void 0 : B.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Se) {
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
    this.domObserver.stop(), this.editable && vx(this.dom), wt(this), this.domObserver.start();
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
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
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
    return zx(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Wh(this, e, t);
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
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
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
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
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
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
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
  endOfTextblock(e, t) {
    return Hx(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Br(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Br(this, e, null, !0, t || new ClipboardEvent("paste"));
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
    return ml(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (y1(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Ws(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, xx());
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
    return x1(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? ye && this.root.nodeType === 11 && Mx(this.dom.ownerDocument) == this.dom && H1(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
yf.prototype.dispatch = function(n) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, n) : this.updateState(this.state.apply(n));
};
function jc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [Ie.node(0, n.state.doc.content.size, e)];
}
function qc(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: Ie.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function Kc(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function Q1(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Jc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function X1(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function Uc(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
function jt(n, e) {
  return n.meta = {
    package: "@milkdown/core",
    group: "System",
    ...e
  }, n;
}
const kf = {
  text: (n, e, t, r) => {
    const i = n.value;
    return /^[^*_\\]*\s+$/.test(i) ? i : t.safe(i, { ...r, encode: [] });
  },
  strong: (n, e, t, r) => {
    const i = n.marker || t.options.strong || "*", s = t.enter("strong"), o = t.createTracker(r);
    let l = o.move(i + i);
    return l += o.move(
      t.containerPhrasing(n, {
        before: l,
        after: i,
        ...o.current()
      })
    ), l += o.move(i + i), s(), l;
  },
  emphasis: (n, e, t, r) => {
    const i = n.marker || t.options.emphasis || "*", s = t.enter("emphasis"), o = t.createTracker(r);
    let l = o.move(i);
    return l += o.move(
      t.containerPhrasing(n, {
        before: l,
        after: i,
        ...o.current()
      })
    ), l += o.move(i), s(), l;
  }
}, qe = j({}, "editorView"), pr = j({}, "editorState"), qs = j([], "initTimer"), Gc = j({}, "editor"), Fr = j([], "inputRules"), St = j([], "prosePlugins"), Vr = j(
  [],
  "remarkPlugins"
), zo = j([], "nodeView"), Fo = j([], "markView"), on = j(
  xo().use(ho).use(go),
  "remark"
), Cr = j(
  {
    handlers: kf,
    encode: []
  },
  "remarkStringifyOptions"
), pi = Ct("ConfigReady");
function Z1(n) {
  const e = (t) => (t.record(pi), async () => (await n(t), t.done(pi), () => {
    t.clearTimer(pi);
  }));
  return jt(e, {
    displayName: "Config"
  }), e;
}
const ln = Ct("InitReady");
function eb(n) {
  const e = (t) => (t.inject(Gc, n).inject(St, []).inject(Vr, []).inject(Fr, []).inject(zo, []).inject(Fo, []).inject(Cr, {
    handlers: kf,
    encode: []
  }).inject(on, xo().use(ho).use(go)).inject(qs, [pi]).record(ln), async () => {
    await t.waitTimers(qs);
    const r = t.get(Cr);
    return t.set(
      on,
      xo().use(ho).use(go, r)
    ), t.done(ln), () => {
      t.remove(Gc).remove(St).remove(Vr).remove(Fr).remove(zo).remove(Fo).remove(Cr).remove(on).remove(qs).clearTimer(ln);
    };
  });
  return jt(e, {
    displayName: "Init"
  }), e;
}
const Ke = Ct("SchemaReady"), Ks = j([], "schemaTimer"), Je = j({}, "schema"), Mr = j([], "nodes"), Nr = j([], "marks");
function Yc(n) {
  return {
    ...n,
    parseDOM: n.parseDOM?.map((e) => ({ priority: n.priority, ...e }))
  };
}
const xf = (n) => (n.inject(Je, {}).inject(Mr, []).inject(Nr, []).inject(Ks, [ln]).record(Ke), async () => {
  await n.waitTimers(Ks);
  const e = n.get(on), r = n.get(Vr).reduce(
    (l, a) => l.use(a.plugin, a.options),
    e
  );
  n.set(on, r);
  const i = Object.fromEntries(
    n.get(Mr).map(([l, a]) => [l, Yc(a)])
  ), s = Object.fromEntries(
    n.get(Nr).map(([l, a]) => [l, Yc(a)])
  ), o = new ap({ nodes: i, marks: s });
  return n.set(Je, o), n.done(Ke), () => {
    n.remove(Je).remove(Mr).remove(Nr).remove(Ks).clearTimer(Ke);
  };
});
jt(xf, {
  displayName: "Schema"
});
class bf {
  constructor() {
    this.#t = new yu(), this.#e = null, this.setCtx = (e) => {
      this.#e = e;
    }, this.chain = () => {
      if (this.#e == null) throw ys();
      const e = this.#e, t = [], r = this.get.bind(this), i = {
        run: () => {
          const o = jn(...t), l = e.get(qe);
          return o(l.state, l.dispatch, l);
        },
        inline: (o) => (t.push(o), i),
        pipe: s.bind(this)
      };
      function s(o, l) {
        const a = r(o);
        return t.push(a(l)), i;
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
  create(e, t) {
    const r = e.create(this.#t.sliceMap);
    return r.set(t), r;
  }
  get(e) {
    return this.#t.get(e).get();
  }
  remove(e) {
    return this.#t.remove(e);
  }
  call(e, t) {
    if (this.#e == null) throw ys();
    const i = this.get(e)(t), s = this.#e.get(qe);
    return i(s.state, s.dispatch, s);
  }
  /// Call an inline command.
  inline(e) {
    if (this.#e == null) throw ys();
    const t = this.#e.get(qe);
    return e(t.state, t.dispatch, t);
  }
}
function tb(n = "cmdKey") {
  return j((() => () => !1), n);
}
const J = j(new bf(), "commands"), Js = j([Ke], "commandsTimer"), Tr = Ct("CommandsReady"), wf = (n) => {
  const e = new bf();
  return e.setCtx(n), n.inject(J, e).inject(Js, [Ke]).record(Tr), async () => (await n.waitTimers(Js), n.done(Tr), () => {
    n.remove(J).remove(Js).clearTimer(Tr);
  });
};
jt(wf, {
  displayName: "Commands"
});
function nb(n) {
  const e = jn(
    jk,
    sl,
    Nk,
    Ah
  );
  return n.Backspace = e, n;
}
class Sf {
  constructor() {
    this.#t = null, this.#e = [], this.setCtx = (e) => {
      this.#t = e;
    }, this.add = (e) => (this.#e.push(e), () => {
      this.#e = this.#e.filter((t) => t !== e);
    }), this.addObjectKeymap = (e) => {
      const t = [];
      return Object.entries(e).forEach(([r, i]) => {
        if (typeof i == "function") {
          const s = {
            key: r,
            onRun: () => i
          };
          this.#e.push(s), t.push(() => {
            this.#e = this.#e.filter((o) => o !== s);
          });
        } else
          this.#e.push(i), t.push(() => {
            this.#e = this.#e.filter((s) => s !== i);
          });
      }), () => {
        t.forEach((r) => r());
      };
    }, this.addBaseKeymap = () => {
      const e = nb(Hk);
      return this.addObjectKeymap(e);
    }, this.build = () => {
      const e = {};
      return this.#e.forEach((r) => {
        e[r.key] = [...e[r.key] || [], r];
      }), Object.fromEntries(
        Object.entries(e).map(([r, i]) => {
          const s = i.sort(
            (l, a) => (a.priority ?? 50) - (l.priority ?? 50)
          );
          return [r, (l, a, c) => {
            const u = this.#t;
            if (u == null) throw Wi();
            const h = s.map((f) => f.onRun(u));
            return jn(...h)(l, a, c);
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
const Ri = j(new Sf(), "keymap"), Us = j([Ke], "keymapTimer"), Ir = Ct("KeymapReady"), rb = (n) => {
  const e = new Sf();
  return e.setCtx(n), n.inject(Ri, e).inject(Us, [Ke]).record(Ir), async () => (await n.waitTimers(Us), n.done(Ir), () => {
    n.remove(Ri).remove(Us).clearTimer(Ir);
  });
}, mi = Ct("ParserReady"), Cf = (() => {
  throw Wi();
}), Pn = j(Cf, "parser"), Gs = j([], "parserTimer"), Mf = (n) => (n.inject(Pn, Cf).inject(Gs, [Ke]).record(mi), async () => {
  await n.waitTimers(Gs);
  const e = n.get(on), t = n.get(Je);
  return n.set(Pn, Jy.create(t, e)), n.done(mi), () => {
    n.remove(Pn).remove(Gs).clearTimer(mi);
  };
});
jt(Mf, {
  displayName: "Parser"
});
const Or = Ct("SerializerReady"), Ys = j(
  [],
  "serializerTimer"
), Nf = (() => {
  throw Wi();
}), an = j(
  Nf,
  "serializer"
), Tf = (n) => (n.inject(an, Nf).inject(Ys, [Ke]).record(Or), async () => {
  await n.waitTimers(Ys);
  const e = n.get(on), t = n.get(Je);
  return n.set(an, Gy.create(t, e)), n.done(Or), () => {
    n.remove(an).remove(Ys).clearTimer(Or);
  };
});
jt(Tf, {
  displayName: "Serializer"
});
const Qs = j("", "defaultValue"), gi = j(
  (n) => n,
  "stateOptions"
), Xs = j(
  [],
  "editorStateTimer"
), yi = Ct("EditorStateReady");
function ib(n, e, t) {
  if (typeof n == "string") return e(n);
  if (n.type === "html")
    return fn.fromSchema(t).parse(n.dom);
  if (n.type === "json")
    return bt.fromJSON(t, n.value);
  throw Dd(n);
}
const sb = new ve("MILKDOWN_STATE_TRACKER"), If = (n) => (n.inject(Qs, "").inject(pr, {}).inject(gi, (e) => e).inject(Xs, [
  mi,
  Or,
  Tr,
  Ir
]).record(yi), async () => {
  await n.waitTimers(Xs);
  const e = n.get(Je), t = n.get(Pn), r = n.get(Fr), i = n.get(gi), s = n.get(St), o = n.get(Qs), l = ib(o, t, e), a = n.get(Ri), c = a.addBaseKeymap(), u = [
    ...s,
    new De({
      key: sb,
      state: {
        init: () => {
        },
        apply: (f, p, m, x) => {
          n.set(pr, x);
        }
      }
    }),
    Yk({ rules: r }),
    yx(a.build())
  ];
  n.set(St, u);
  const h = i({
    schema: e,
    doc: l,
    plugins: u
  }), d = Xt.create(h);
  return n.set(pr, d), n.done(yi), () => {
    c(), n.remove(Qs).remove(pr).remove(gi).remove(Xs).clearTimer(yi);
  };
});
jt(If, {
  displayName: "EditorState"
});
const ki = Ct("EditorViewReady"), Zs = j(
  [],
  "editorViewTimer"
), Er = j(
  {},
  "editorViewOptions"
), xi = j(null, "root"), Vo = j(null, "rootDOM"), _o = j(
  {},
  "rootAttrs"
);
function ob(n, e) {
  const t = document.createElement("div");
  t.className = "milkdown", n.appendChild(t), e.set(Vo, t);
  const r = e.get(_o);
  return Object.entries(r).forEach(
    ([i, s]) => t.setAttribute(i, s)
  ), t;
}
function lb(n) {
  n.classList.add("editor"), n.setAttribute("role", "textbox");
}
const ab = new ve("MILKDOWN_VIEW_CLEAR"), Of = (n) => (n.inject(xi, document.body).inject(qe, {}).inject(Er, {}).inject(Vo, null).inject(_o, {}).inject(Zs, [yi]).record(ki), async () => {
  await n.wait(ln);
  const e = n.get(xi) || document.body, t = typeof e == "string" ? document.querySelector(e) : e;
  n.update(St, (a) => [
    new De({
      key: ab,
      view: (c) => {
        const u = t ? ob(t, n) : void 0;
        return (() => {
          if (u && t) {
            const d = c.dom;
            t.replaceChild(u, d), u.appendChild(d);
          }
        })(), {
          destroy: () => {
            u?.parentNode && u?.parentNode.replaceChild(c.dom, u), u?.remove();
          }
        };
      }
    }),
    ...a
  ]), await n.waitTimers(Zs);
  const r = n.get(pr), i = n.get(Er), s = Object.fromEntries(n.get(zo)), o = Object.fromEntries(n.get(Fo)), l = new yf(t, {
    state: r,
    nodeViews: s,
    markViews: o,
    ...i
  });
  return lb(l.dom), n.set(qe, l), n.done(ki), () => {
    l?.destroy(), n.remove(xi).remove(qe).remove(Er).remove(Vo).remove(_o).remove(Zs).clearTimer(ki);
  };
});
jt(Of, {
  displayName: "EditorView"
});
class wl {
  constructor() {
    this.#t = !1, this.#e = "Idle", this.#r = [], this.#n = () => {
    }, this.#l = new yu(), this.#s = new Wd(), this.#i = /* @__PURE__ */ new Map(), this.#o = /* @__PURE__ */ new Map(), this.#a = new qo(this.#l, this.#s), this.#u = () => {
      const e = Z1(async (r) => {
        await Promise.all(this.#r.map((i) => i(r)));
      }), t = [
        xf,
        Mf,
        Tf,
        wf,
        rb,
        If,
        Of,
        eb(this),
        e
      ];
      this.#c(t, this.#o);
    }, this.#c = (e, t) => {
      e.forEach((r) => {
        const i = this.#a.produce(
          this.#t ? r.meta : void 0
        ), s = r(i);
        t.set(r, { ctx: i, handler: s, cleanup: void 0 });
      });
    }, this.#f = (e, t = !1) => Promise.all(
      [e].flat().map((r) => {
        const s = this.#i.get(r)?.cleanup;
        return t ? this.#i.delete(r) : this.#i.set(r, {
          ctx: void 0,
          handler: void 0,
          cleanup: void 0
        }), typeof s == "function" ? s() : s;
      })
    ), this.#p = async () => {
      await Promise.all(
        [...this.#o.entries()].map(([e, { cleanup: t }]) => typeof t == "function" ? t() : t)
      ), this.#o.clear();
    }, this.#h = (e) => {
      this.#e = e, this.#n(e);
    }, this.#d = (e) => [...e.entries()].map(async ([t, r]) => {
      const { ctx: i, handler: s } = r;
      if (!s) return;
      const o = await s();
      e.set(t, { ctx: i, handler: s, cleanup: o });
    }), this.enableInspector = (e = !0) => (this.#t = e, this), this.onStatusChange = (e) => (this.#n = e, this), this.config = (e) => (this.#r.push(e), this), this.removeConfig = (e) => (this.#r = this.#r.filter((t) => t !== e), this), this.use = (e) => {
      const t = [e].flat();
      return t.flat().forEach((r) => {
        this.#i.set(r, {
          ctx: void 0,
          handler: void 0,
          cleanup: void 0
        });
      }), this.#e === "Created" && this.#c(t, this.#i), this;
    }, this.remove = async (e) => this.#e === "OnCreate" ? (console.warn(
      "[Milkdown]: You are trying to remove plugins when the editor is creating, this is not recommended, please check your code."
    ), new Promise((t) => {
      setTimeout(() => {
        t(this.remove(e));
      }, 50);
    })) : (await this.#f([e].flat(), !0), this), this.create = async () => this.#e === "OnCreate" ? this : (this.#e === "Created" && await this.destroy(), this.#h(
      "OnCreate"
      /* OnCreate */
    ), this.#u(), this.#c([...this.#i.keys()], this.#i), await Promise.all(
      [
        this.#d(this.#o),
        this.#d(this.#i)
      ].flat()
    ), this.#h(
      "Created"
      /* Created */
    ), this), this.destroy = async (e = !1) => this.#e === "Destroyed" || this.#e === "OnDestroy" ? this : this.#e === "OnCreate" ? new Promise((t) => {
      setTimeout(() => {
        t(this.destroy(e));
      }, 50);
    }) : (e && (this.#r = []), this.#h(
      "OnDestroy"
      /* OnDestroy */
    ), await this.#f([...this.#i.keys()], e), await this.#p(), this.#h(
      "Destroyed"
      /* Destroyed */
    ), this), this.action = (e) => e(this.#a), this.inspect = () => this.#t ? [...this.#o.values(), ...this.#i.values()].map(({ ctx: e }) => e?.inspector?.read()).filter((e) => !!e) : (console.warn(
      "[Milkdown]: You are trying to collect inspection when inspector is disabled, please enable inspector by `editor.enableInspector()` first."
    ), []);
  }
  /// Create a new editor instance.
  static make() {
    return new wl();
  }
  #t;
  #e;
  #r;
  #n;
  #l;
  #s;
  #i;
  #o;
  #a;
  #u;
  #c;
  #f;
  #p;
  #h;
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
var Pi = 200, ae = function() {
};
ae.prototype.append = function(e) {
  return e.length ? (e = ae.from(e), !this.length && e || e.length < Pi && this.leafAppend(e) || this.length < Pi && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ae.prototype.prepend = function(e) {
  return e.length ? ae.from(e).append(this) : this;
};
ae.prototype.appendInner = function(e) {
  return new cb(this, e);
};
ae.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? ae.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
ae.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
ae.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
ae.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, t, r), i;
};
ae.from = function(e) {
  return e instanceof ae ? e : e && e.length ? new Ef(e) : ae.empty;
};
var Ef = /* @__PURE__ */ (function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, l) {
    for (var a = s; a < o; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, l) {
    for (var a = s - 1; a >= o; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= Pi)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Pi)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
})(ae);
ae.empty = new Ef([]);
var cb = /* @__PURE__ */ (function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(s, l), o) === !1 || s > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, s) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(s, l) - l, o + l) === !1 || s < l && this.left.forEachInvertedInner(r, Math.min(i, l), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
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
})(ae);
const ub = 500;
class We {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    t && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((h, d) => {
      if (!h.step) {
        i || (i = this.remapping(r, d + 1), s = i.maps.length), s--, u.push(h);
        return;
      }
      if (i) {
        u.push(new tt(h.map));
        let f = h.step.map(i.slice(s)), p;
        f && o.maybeStep(f).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new tt(p, void 0, void 0, c.length + u.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(h.step);
      if (h.selection)
        return l = i ? h.selection.map(i.slice(s)) : h.selection, a = new We(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let h = e.steps[u].invert(e.docs[u]), d = new tt(e.mapping.maps[u], h, t), f;
      (f = a && a.merge(d)) && (d = f, u ? s.pop() : l = l.slice(0, l.length - 1)), s.push(d), t && (o++, t = void 0), i || (a = d);
    }
    let c = o - r.depth;
    return c > fb && (l = hb(l, c), o -= c), new We(l.append(s), o);
  }
  remapping(e, t) {
    let r = new vr();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new We(this.items.append(e.map((t) => new tt(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((d) => {
      d.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((d) => {
      let f = s.getMirror(--a);
      if (f == null)
        return;
      o = Math.min(o, f);
      let p = s.maps[f];
      if (d.step) {
        let m = e.steps[f].invert(e.docs[f]), x = d.selection && d.selection.map(s.slice(a + 1, f));
        x && l++, r.push(new tt(p, m, x));
      } else
        r.push(new tt(p));
    }, i);
    let c = [];
    for (let d = t; d < o; d++)
      c.push(new tt(s.maps[d]));
    let u = this.items.slice(0, i).append(c).append(r), h = new We(u, l);
    return h.emptyItemCount() > ub && (h = h.compress(this.items.length - r.length)), h;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(t.slice(r));
          u && s++;
          let h = new tt(c.invert(), a, u), d, f = i.length - 1;
          (d = i.length && i[f].merge(h)) ? i[f] = d : i.push(h);
        }
      } else o.map && r--;
    }, this.items.length, 0), new We(ae.from(i.reverse()), s);
  }
}
We.empty = new We(ae.empty, 0);
function hb(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class tt {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new tt(t.getMap().invert(), t, this.selection);
    }
  }
}
class Et {
  constructor(e, t, r, i, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const fb = 20;
function db(n, e, t, r) {
  let i = t.getMeta(cn), s;
  if (i)
    return i.historyState;
  t.getMeta(gb) && (n = new Et(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(cn))
    return o.getMeta(cn).redo ? new Et(n.done.addTransform(t, void 0, r, bi(e)), n.undone, Qc(t.mapping.maps), n.prevTime, n.prevComposition) : new Et(n.done, n.undone.addTransform(t, void 0, r, bi(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !o && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !pb(t, n.prevRanges)), c = o ? eo(n.prevRanges, t.mapping) : Qc(t.mapping.maps);
    return new Et(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, bi(e)), We.empty, c, t.time, l ?? n.prevComposition);
  } else return (s = t.getMeta("rebased")) ? new Et(n.done.rebased(t, s), n.undone.rebased(t, s), eo(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new Et(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), eo(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function pb(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (t = !0);
  }), t;
}
function Qc(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function eo(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    i <= s && t.push(i, s);
  }
  return t;
}
function mb(n, e, t) {
  let r = bi(e), i = cn.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new Et(t ? l : s.remaining, t ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(cn, { redo: t, historyState: a });
}
let to = !1, Xc = null;
function bi(n) {
  let e = n.plugins;
  if (Xc != e) {
    to = !1, Xc = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        to = !0;
        break;
      }
  }
  return to;
}
const cn = new ve("history"), gb = new ve("closeHistory");
function yb(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new De({
    key: cn,
    state: {
      init() {
        return new Et(We.empty, We.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return db(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? Df : r == "historyRedo" ? vf : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Af(n, e) {
  return (t, r) => {
    let i = cn.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = mb(i, t, n);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const Df = Af(!1, !0), vf = Af(!0, !0);
function U(n, e) {
  const t = tb(n), r = (i) => async () => {
    r.key = t, await i.wait(Tr);
    const s = e(i);
    return i.get(J).create(t, s), r.run = (o) => i.get(J).call(n, o), () => {
      i.get(J).remove(t);
    };
  };
  return r;
}
function Qe(n) {
  const e = (t) => async () => {
    await t.wait(Ke);
    const r = n(t);
    return t.update(Fr, (i) => [...i, r]), e.inputRule = r, () => {
      t.update(Fr, (i) => i.filter((s) => s !== r));
    };
  };
  return e;
}
function kb(n, e) {
  const t = (r) => async () => {
    const i = e(r);
    return r.update(Nr, (s) => [
      ...s.filter((o) => o[0] !== n),
      [n, i]
    ]), t.id = n, t.schema = i, () => {
      r.update(Nr, (s) => s.filter(([o]) => o !== n));
    };
  };
  return t.type = (r) => {
    const i = r.get(Je).marks[n];
    if (!i) throw Vd(n);
    return i;
  }, t;
}
function Sl(n, e) {
  const t = (r) => async () => {
    const i = e(r);
    return r.update(Mr, (s) => [
      ...s.filter((o) => o[0] !== n),
      [n, i]
    ]), t.id = n, t.schema = i, () => {
      r.update(Mr, (s) => s.filter(([o]) => o !== n));
    };
  };
  return t.type = (r) => {
    const i = r.get(Je).nodes[n];
    if (!i) throw Fd(n);
    return i;
  }, t;
}
function qt(n) {
  let e;
  const t = (r) => async () => (await r.wait(Ke), e = n(r), r.update(St, (i) => [...i, e]), () => {
    r.update(St, (i) => i.filter((s) => s !== e));
  });
  return t.plugin = () => e, t.key = () => e.spec.key, t;
}
function xb(n) {
  const e = (t) => async () => {
    await t.wait(Ir);
    const r = t.get(Ri), i = n(t), s = r.addObjectKeymap(i);
    return e.keymap = i, () => {
      s();
    };
  };
  return e;
}
function ct(n, e) {
  const t = j(n, e), r = (i) => (i.inject(t), () => () => {
    i.remove(t);
  });
  return r.key = t, r;
}
function Fe(n, e) {
  const t = ct(e, n), r = Sl(n, (s) => s.get(t.key)(s)), i = [t, r];
  return i.id = r.id, i.node = r, i.type = (s) => r.type(s), i.ctx = t, i.key = t.key, i.extendSchema = (s) => {
    const o = s(e);
    return Fe(n, o);
  }, i;
}
function qr(n, e) {
  const t = ct(e, n), r = kb(n, (s) => s.get(t.key)(s)), i = [t, r];
  return i.id = r.id, i.mark = r, i.type = (s) => r.type(s), i.ctx = t, i.key = t.key, i.extendSchema = (s) => {
    const o = s(e);
    return qr(n, o);
  }, i;
}
function Ve(n, e) {
  const t = Object.fromEntries(
    Object.entries(e).map(
      ([o, { shortcuts: l, priority: a }]) => [o, { shortcuts: l, priority: a }]
    )
  ), r = ct(t, `${n}Keymap`), i = xb((o) => {
    const l = o.get(r.key), a = Object.entries(e).flatMap(
      ([c, { command: u }]) => {
        const h = l[c], d = [h.shortcuts].flat(), f = h.priority;
        return d.map(
          (p) => [
            p,
            {
              key: p,
              onRun: u,
              priority: f
            }
          ]
        );
      }
    );
    return Object.fromEntries(a);
  }), s = [r, i];
  return s.ctx = r, s.shortcuts = i, s.key = r.key, s.keymap = i.keymap, s;
}
const Xe = (n, e = () => ({})) => ct(e, `${n}Attr`), ts = (n, e = () => ({})) => ct(e, `${n}Attr`);
function qn(n, e, t) {
  const r = ct({}, n), i = (o) => async () => {
    await o.wait(ln);
    const a = {
      plugin: e(o),
      options: o.get(r.key)
    };
    return o.update(Vr, (c) => [...c, a]), () => {
      o.update(Vr, (c) => c.filter((u) => u !== a));
    };
  }, s = [r, i];
  return s.id = n, s.plugin = i, s.options = r, s;
}
function Zc(n) {
  return (e) => {
    const t = e.get(qe), r = e.get(Je), i = e.get(an);
    if (!n)
      return i(t.state.doc);
    const o = t.state.doc.slice(n.from, n.to, !0), l = r.topNodeType.createAndFill(null, o.content);
    return l ? i(l) : (console.error("No document found"), "");
  };
}
function bb(n, e = !1) {
  return (t) => {
    const r = t.get(qe), s = t.get(Pn)(n);
    if (!s) return;
    if (!e) {
      const { state: u } = r;
      return r.dispatch(
        u.tr.replace(
          0,
          u.doc.content.size,
          new I(s.content, 0, 0)
        )
      );
    }
    const o = t.get(Je), l = t.get(gi), a = t.get(St), c = Xt.create({
      schema: o,
      doc: s,
      plugins: a,
      ...l
    });
    r.updateState(c);
  };
}
function Kn(n, e) {
  return Object.assign(n, {
    meta: {
      package: "@milkdown/plugin-history",
      ...e
    }
  }), n;
}
const Cl = U("Undo", () => () => Df);
Kn(Cl, {
  displayName: "Command<undo>"
});
const Ml = U("Redo", () => () => vf);
Kn(Ml, {
  displayName: "Command<redo>"
});
const Nl = ct({}, "historyProviderConfig");
Kn(Nl, {
  displayName: "Ctx<historyProviderConfig>"
});
const Rf = qt(
  (n) => yb(n.get(Nl.key))
);
Kn(Rf, {
  displayName: "Ctx<historyProviderPlugin>"
});
const ns = Ve("historyKeymap", {
  Undo: {
    shortcuts: "Mod-z",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(Cl.key);
    }
  },
  Redo: {
    shortcuts: ["Mod-y", "Shift-Mod-z"],
    command: (n) => {
      const e = n.get(J);
      return () => e.call(Ml.key);
    }
  }
});
Kn(ns.ctx, {
  displayName: "KeymapCtx<history>"
});
Kn(ns.shortcuts, {
  displayName: "Keymap<history>"
});
const wb = [
  Nl,
  Rf,
  ns,
  Cl,
  Ml
].flat();
var Sb = typeof global == "object" && global && global.Object === Object && global, Cb = typeof self == "object" && self && self.Object === Object && self, Pf = Sb || Cb || Function("return this")(), Li = Pf.Symbol, Lf = Object.prototype, Mb = Lf.hasOwnProperty, Nb = Lf.toString, rr = Li ? Li.toStringTag : void 0;
function Tb(n) {
  var e = Mb.call(n, rr), t = n[rr];
  try {
    n[rr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Nb.call(n);
  return r && (e ? n[rr] = t : delete n[rr]), i;
}
var Ib = Object.prototype, Ob = Ib.toString;
function Eb(n) {
  return Ob.call(n);
}
var Ab = "[object Null]", Db = "[object Undefined]", eu = Li ? Li.toStringTag : void 0;
function vb(n) {
  return n == null ? n === void 0 ? Db : Ab : eu && eu in Object(n) ? Tb(n) : Eb(n);
}
function Rb(n) {
  return n != null && typeof n == "object";
}
var Pb = "[object Symbol]";
function Lb(n) {
  return typeof n == "symbol" || Rb(n) && vb(n) == Pb;
}
var Bb = /\s/;
function zb(n) {
  for (var e = n.length; e-- && Bb.test(n.charAt(e)); )
    ;
  return e;
}
var Fb = /^\s+/;
function Vb(n) {
  return n && n.slice(0, zb(n) + 1).replace(Fb, "");
}
function Bi(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var tu = NaN, _b = /^[-+]0x[0-9a-f]+$/i, $b = /^0b[01]+$/i, Hb = /^0o[0-7]+$/i, Wb = parseInt;
function nu(n) {
  if (typeof n == "number")
    return n;
  if (Lb(n))
    return tu;
  if (Bi(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Bi(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = Vb(n);
  var t = $b.test(n);
  return t || Hb.test(n) ? Wb(n.slice(2), t ? 2 : 8) : _b.test(n) ? tu : +n;
}
var no = function() {
  return Pf.Date.now();
}, jb = "Expected a function", qb = Math.max, Kb = Math.min;
function Bf(n, e, t) {
  var r, i, s, o, l, a, c = 0, u = !1, h = !1, d = !0;
  if (typeof n != "function")
    throw new TypeError(jb);
  e = nu(e) || 0, Bi(t) && (u = !!t.leading, h = "maxWait" in t, s = h ? qb(nu(t.maxWait) || 0, e) : s, d = "trailing" in t ? !!t.trailing : d);
  function f(b) {
    var z = r, O = i;
    return r = i = void 0, c = b, o = n.apply(O, z), o;
  }
  function p(b) {
    return c = b, l = setTimeout(k, e), u ? f(b) : o;
  }
  function m(b) {
    var z = b - a, O = b - c, D = e - z;
    return h ? Kb(D, s - O) : D;
  }
  function x(b) {
    var z = b - a, O = b - c;
    return a === void 0 || z >= e || z < 0 || h && O >= s;
  }
  function k() {
    var b = no();
    if (x(b))
      return T(b);
    l = setTimeout(k, m(b));
  }
  function T(b) {
    return l = void 0, d && r ? f(b) : (r = i = void 0, o);
  }
  function C() {
    l !== void 0 && clearTimeout(l), c = 0, r = a = i = l = void 0;
  }
  function E() {
    return l === void 0 ? o : T(no());
  }
  function A() {
    var b = no(), z = x(b);
    if (r = arguments, i = this, a = b, z) {
      if (l === void 0)
        return p(a);
      if (h)
        return clearTimeout(l), l = setTimeout(k, e), f(a);
    }
    return l === void 0 && (l = setTimeout(k, e)), o;
  }
  return A.cancel = C, A.flush = E, A;
}
var Jb = "Expected a function";
function Ub(n, e, t) {
  var r = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(Jb);
  return Bi(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), Bf(n, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
class zf {
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
const zi = j(
  new zf(),
  "listener"
), Gb = new ve("MILKDOWN_LISTENER"), Ff = (n) => (n.inject(zi, new zf()), async () => {
  await n.wait(ln);
  const e = n.get(zi), { listeners: t } = e;
  t.beforeMount.forEach((a) => a(n)), await n.wait(Or);
  const r = n.get(an);
  let i = null, s = null, o = null;
  const l = new De({
    key: Gb,
    view: () => ({
      destroy: () => {
        t.destroy.forEach((a) => a(n));
      }
    }),
    props: {
      handleDOMEvents: {
        focus: () => (t.focus.forEach((a) => a(n)), !1),
        blur: () => (t.blur.forEach((a) => a(n)), !1)
      }
    },
    state: {
      init: (a, c) => {
        i = c.doc, s = r(c.doc);
      },
      apply: (a) => {
        const c = a.selection;
        return (!o && c || o && !c.eq(o)) && (t.selectionUpdated.forEach((h) => {
          h(n, c, o);
        }), o = c), !a.docChanged || a.getMeta("addToHistory") === !1 ? void 0 : Bf(() => {
          const { doc: h } = a;
          if (t.updated.length > 0 && i && !i.eq(h) && t.updated.forEach((d) => {
            d(n, h, i);
          }), t.markdownUpdated.length > 0 && i && !i.eq(h)) {
            const d = r(h);
            t.markdownUpdated.forEach((f) => {
              f(n, d, s);
            }), s = d;
          }
          i = h;
        }, 200)();
      }
    }
  });
  n.update(St, (a) => a.concat(l)), await n.wait(ki), t.mounted.forEach((a) => a(n));
});
Ff.meta = {
  package: "@milkdown/plugin-listener",
  displayName: "Listener"
};
function Yb(n, e) {
  return function(t, r) {
    let { $from: i, $to: s, node: o } = t.selection;
    if (o && o.isBlock || i.depth < 2 || !i.sameParent(s))
      return !1;
    let l = i.node(-1);
    if (l.type != n)
      return !1;
    if (i.parent.content.size == 0 && i.node(-1).childCount == i.indexAfter(-1)) {
      if (i.depth == 3 || i.node(-3).type != n || i.index(-2) != i.node(-2).childCount - 1)
        return !1;
      if (r) {
        let h = M.empty, d = i.index(-1) ? 1 : i.index(-2) ? 2 : 3;
        for (let k = i.depth - d; k >= i.depth - 3; k--)
          h = M.from(i.node(k).copy(h));
        let f = i.indexAfter(-1) < i.node(-2).childCount ? 1 : i.indexAfter(-2) < i.node(-3).childCount ? 2 : 3;
        h = h.append(M.from(n.createAndFill()));
        let p = i.before(i.depth - (d - 1)), m = t.tr.replace(p, i.after(-f), new I(h, 4 - d, 0)), x = -1;
        m.doc.nodesBetween(p, m.doc.content.size, (k, T) => {
          if (x > -1)
            return !1;
          k.isTextblock && k.content.size == 0 && (x = T + 1);
        }), x > -1 && m.setSelection(q.near(m.doc.resolve(x))), r(m.scrollIntoView());
      }
      return !0;
    }
    let a = s.pos == i.end() ? l.contentMatchAt(0).defaultType : null, c = t.tr.delete(i.pos, s.pos), u = a ? [null, { type: a }] : void 0;
    return br(c.doc, i.pos, 2, u) ? (r && r(c.split(i.pos, 2, u).scrollIntoView()), !0) : !1;
  };
}
function Qb(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? Xb(e, t, n, s) : Zb(e, t, s) : !0 : !1;
  };
}
function Xb(n, e, t, r) {
  let i = n.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new me(s - 1, o, s, o, new I(M.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Nu(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = Ji(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
  return Ui(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function Zb(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let f = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    f -= i.child(p).nodeSize, r.delete(f - 1, f + 1);
  let s = r.doc.resolve(t.start), o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? M.empty : M.from(i))))
    return !1;
  let h = s.pos, d = h + o.nodeSize;
  return r.step(new me(h - (l ? 1 : 0), d + (a ? 1 : 0), h + 1, d - 1, new I((l ? M.empty : M.from(i.copy(M.empty))).append(a ? M.empty : M.from(i.copy(M.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function e0(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = M.from(c ? n.create() : null), h = new I(M.from(n.create(null, M.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = s.start, f = s.end;
      t(e.tr.step(new me(d - (c ? 3 : 1), f, d, f, h, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function t0(n) {
  const e = /* @__PURE__ */ new Map();
  if (!n || !n.type)
    throw new Error("mdast-util-definitions expected node");
  return Wn(n, "definition", function(r) {
    const i = ru(r.identifier);
    i && !e.get(i) && e.set(i, r);
  }), t;
  function t(r) {
    const i = ru(r);
    return e.get(i);
  }
}
function ru(n) {
  return String(n || "").toUpperCase();
}
function n0() {
  return function(n) {
    const e = t0(n);
    Wn(n, function(t, r, i) {
      if (t.type === "definition" && i !== void 0 && typeof r == "number")
        return i.children.splice(r, 1), [mo, r];
      if (t.type === "imageReference" || t.type === "linkReference") {
        const s = e(t.identifier);
        if (s && i && typeof r == "number")
          return i.children[r] = t.type === "imageReference" ? { type: "image", url: s.url, title: s.title, alt: t.alt } : {
            type: "link",
            url: s.url,
            title: s.title,
            children: t.children
          }, [mo, r];
      }
    });
  };
}
function Vf(n, e) {
  if (!(e.childCount >= 1 && e.lastChild?.type.name === "hardbreak")) {
    n.next(e.content);
    return;
  }
  const r = [];
  e.content.forEach((i, s, o) => {
    o !== e.childCount - 1 && r.push(i);
  }), n.next(M.fromArray(r));
}
function w(n, e) {
  return Object.assign(n, {
    meta: {
      package: "@milkdown/preset-commonmark",
      ...e
    }
  }), n;
}
const Tl = ts("emphasis");
w(Tl, {
  displayName: "Attr<emphasis>",
  group: "Emphasis"
});
const Jn = qr("emphasis", (n) => ({
  attrs: {
    marker: {
      default: n.get(Cr).emphasis || "*",
      validate: "string"
    }
  },
  parseDOM: [
    { tag: "i" },
    { tag: "em" },
    { style: "font-style", getAttrs: (e) => e === "italic" }
  ],
  toDOM: (e) => ["em", n.get(Tl.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "emphasis",
    runner: (e, t, r) => {
      e.openMark(r, { marker: t.marker }), e.next(t.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "emphasis",
    runner: (e, t) => {
      e.withMark(t, "emphasis", void 0, {
        marker: t.attrs.marker
      });
    }
  }
}));
w(Jn.mark, {
  displayName: "MarkSchema<emphasis>",
  group: "Emphasis"
});
w(Jn.ctx, {
  displayName: "MarkSchemaCtx<emphasis>",
  group: "Emphasis"
});
const rs = U("ToggleEmphasis", (n) => () => cl(Jn.type(n)));
w(rs, {
  displayName: "Command<toggleEmphasisCommand>",
  group: "Emphasis"
});
const _f = Qe((n) => Qi(/(?:^|[^*])\*([^*]+)\*$/, Jn.type(n), {
  getAttr: () => ({
    marker: "*"
  }),
  updateCaptured: ({ fullMatch: e, start: t }) => e.startsWith("*") ? {} : { fullMatch: e.slice(1), start: t + 1 }
}));
w(_f, {
  displayName: "InputRule<emphasis>|Star",
  group: "Emphasis"
});
const $f = Qe((n) => Qi(/\b_(?![_\s])(.*?[^_\s])_\b/, Jn.type(n), {
  getAttr: () => ({
    marker: "_"
  }),
  updateCaptured: ({ fullMatch: e, start: t }) => e.startsWith("_") ? {} : { fullMatch: e.slice(1), start: t + 1 }
}));
w($f, {
  displayName: "InputRule<emphasis>|Underscore",
  group: "Emphasis"
});
const Il = Ve("emphasisKeymap", {
  ToggleEmphasis: {
    shortcuts: "Mod-i",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(rs.key);
    }
  }
});
w(Il.ctx, {
  displayName: "KeymapCtx<emphasis>",
  group: "Emphasis"
});
w(Il.shortcuts, {
  displayName: "Keymap<emphasis>",
  group: "Emphasis"
});
const Ol = ts("strong");
w(Ol, {
  displayName: "Attr<strong>",
  group: "Strong"
});
const Kr = qr("strong", (n) => ({
  attrs: {
    marker: {
      default: n.get(Cr).strong || "*",
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
  toDOM: (e) => ["strong", n.get(Ol.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "strong",
    runner: (e, t, r) => {
      e.openMark(r, { marker: t.marker }), e.next(t.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "strong",
    runner: (e, t) => {
      e.withMark(t, "strong", void 0, {
        marker: t.attrs.marker
      });
    }
  }
}));
w(Kr.mark, {
  displayName: "MarkSchema<strong>",
  group: "Strong"
});
w(Kr.ctx, {
  displayName: "MarkSchemaCtx<strong>",
  group: "Strong"
});
const is = U("ToggleStrong", (n) => () => cl(Kr.type(n)));
w(is, {
  displayName: "Command<toggleStrongCommand>",
  group: "Strong"
});
const Hf = Qe((n) => Qi(
  new RegExp("(?<![\\w:/])(?:\\*\\*|__)([^*_]+?)(?:\\*\\*|__)(?![\\w/])$"),
  Kr.type(n),
  {
    getAttr: (e) => ({
      marker: e[0].startsWith("*") ? "*" : "_"
    })
  }
));
w(Hf, {
  displayName: "InputRule<strong>",
  group: "Strong"
});
const El = Ve("strongKeymap", {
  ToggleBold: {
    shortcuts: ["Mod-b"],
    command: (n) => {
      const e = n.get(J);
      return () => e.call(is.key);
    }
  }
});
w(El.ctx, {
  displayName: "KeymapCtx<strong>",
  group: "Strong"
});
w(El.shortcuts, {
  displayName: "Keymap<strong>",
  group: "Strong"
});
const Al = ts("inlineCode");
w(Al, {
  displayName: "Attr<inlineCode>",
  group: "InlineCode"
});
const Rt = qr("inlineCode", (n) => ({
  priority: 100,
  code: !0,
  parseDOM: [{ tag: "code" }],
  toDOM: (e) => ["code", n.get(Al.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "inlineCode",
    runner: (e, t, r) => {
      e.openMark(r), e.addText(t.value), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "inlineCode",
    runner: (e, t, r) => {
      e.withMark(t, "inlineCode", r.text || "");
    }
  }
}));
w(Rt.mark, {
  displayName: "MarkSchema<inlineCode>",
  group: "InlineCode"
});
w(Rt.ctx, {
  displayName: "MarkSchemaCtx<inlineCode>",
  group: "InlineCode"
});
const Dl = U(
  "ToggleInlineCode",
  (n) => () => (e, t) => {
    const { selection: r, tr: i } = e;
    if (r.empty) return !1;
    const { from: s, to: o } = r;
    return e.doc.rangeHasMark(s, o, Rt.type(n)) ? (t?.(i.removeMark(s, o, Rt.type(n))), !0) : (Object.keys(e.schema.marks).filter(
      (c) => c !== Rt.type.name
    ).map((c) => e.schema.marks[c]).forEach((c) => {
      i.removeMark(s, o, c);
    }), t?.(i.addMark(s, o, Rt.type(n).create())), !0);
  }
);
w(Dl, {
  displayName: "Command<toggleInlineCodeCommand>",
  group: "InlineCode"
});
const Wf = Qe((n) => Qi(/(?:`)([^`]+)(?:`)$/, Rt.type(n)));
w(Wf, {
  displayName: "InputRule<inlineCodeInputRule>",
  group: "InlineCode"
});
const vl = Ve("inlineCodeKeymap", {
  ToggleInlineCode: {
    shortcuts: "Mod-e",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(Dl.key);
    }
  }
});
w(vl.ctx, {
  displayName: "KeymapCtx<inlineCode>",
  group: "InlineCode"
});
w(vl.shortcuts, {
  displayName: "Keymap<inlineCode>",
  group: "InlineCode"
});
const Rl = ts("link");
w(Rl, {
  displayName: "Attr<link>",
  group: "Link"
});
const Ln = qr("link", (n) => ({
  attrs: {
    href: { validate: "string" },
    title: { default: null, validate: "string|null" }
  },
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw yn(e);
        return {
          href: e.getAttribute("href"),
          title: e.getAttribute("title")
        };
      }
    }
  ],
  toDOM: (e) => ["a", { ...n.get(Rl.key)(e), ...e.attrs }],
  parseMarkdown: {
    match: (e) => e.type === "link",
    runner: (e, t, r) => {
      const i = t.url, s = t.title;
      e.openMark(r, { href: i, title: s }), e.next(t.children), e.closeMark(r);
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "link",
    runner: (e, t) => {
      e.withMark(t, "link", void 0, {
        title: t.attrs.title,
        url: t.attrs.href
      });
    }
  }
}));
w(Ln.mark, {
  displayName: "MarkSchema<link>",
  group: "Link"
});
const Pl = U(
  "ToggleLink",
  (n) => (e = {}) => cl(Ln.type(n), e)
);
w(Pl, {
  displayName: "Command<toggleLinkCommand>",
  group: "Link"
});
const jf = U(
  "UpdateLink",
  (n) => (e = {}) => (t, r) => {
    if (!r) return !1;
    let i, s = -1;
    const { selection: o } = t, { from: l, to: a } = o;
    if (t.doc.nodesBetween(l, l === a ? a + 1 : a, (p, m) => {
      if (Ln.type(n).isInSet(p.marks))
        return i = p, s = m, !1;
    }), !i) return !1;
    const c = i.marks.find(({ type: p }) => p === Ln.type(n));
    if (!c) return !1;
    const u = s, h = s + i.nodeSize, { tr: d } = t, f = Ln.type(n).create({ ...c.attrs, ...e });
    return f ? (r(
      d.removeMark(u, h, c).addMark(u, h, f).setSelection(new H(d.selection.$anchor)).scrollIntoView()
    ), !0) : !1;
  }
);
w(jf, {
  displayName: "Command<updateLinkCommand>",
  group: "Link"
});
const qf = Sl("doc", () => ({
  content: "block+",
  parseMarkdown: {
    match: ({ type: n }) => n === "root",
    runner: (n, e, t) => {
      n.injectRoot(e, t);
    }
  },
  toMarkdown: {
    match: (n) => n.type.name === "doc",
    runner: (n, e) => {
      n.openNode("root"), n.next(e.content);
    }
  }
}));
w(qf, {
  displayName: "NodeSchema<doc>",
  group: "Doc"
});
function r0(n) {
  return eh(
    n,
    (e) => e.type === "html" && ["<br />", "<br>", "<br >", "<br/>"].includes(
      e.value?.trim()
    ),
    (e, t) => {
      if (!t.length) return;
      const r = t[t.length - 1];
      if (!r) return;
      const i = r.children.indexOf(e);
      i !== -1 && r.children.splice(i, 1);
    },
    !0
  );
}
const ss = qn(
  "remark-preserve-empty-line",
  () => () => r0
);
w(ss.plugin, {
  displayName: "Remark<remarkPreserveEmptyLine>",
  group: "Remark"
});
w(ss.options, {
  displayName: "RemarkConfig<remarkPreserveEmptyLine>",
  group: "Remark"
});
const Ll = Xe("paragraph");
w(Ll, {
  displayName: "Attr<paragraph>",
  group: "Paragraph"
});
const bn = Fe("paragraph", (n) => ({
  content: "inline*",
  group: "block",
  parseDOM: [{ tag: "p" }],
  toDOM: (e) => ["p", n.get(Ll.key)(e), 0],
  parseMarkdown: {
    match: (e) => e.type === "paragraph",
    runner: (e, t, r) => {
      e.openNode(r), t.children ? e.next(t.children) : e.addText(t.value || ""), e.closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "paragraph",
    runner: (e, t) => {
      const i = n.get(qe).state?.doc.lastChild;
      e.openNode("paragraph"), (!t.content || t.content.size === 0) && t !== i && i0(n) ? e.addNode("html", void 0, "<br />") : Vf(e, t), e.closeNode();
    }
  }
}));
function i0(n) {
  let e = !1;
  try {
    n.get(ss.id), e = !0;
  } catch {
    e = !1;
  }
  return e;
}
w(bn.node, {
  displayName: "NodeSchema<paragraph>",
  group: "Paragraph"
});
w(bn.ctx, {
  displayName: "NodeSchemaCtx<paragraph>",
  group: "Paragraph"
});
const ls = U(
  "TurnIntoText",
  (n) => () => Pr(bn.type(n))
);
w(ls, {
  displayName: "Command<turnIntoTextCommand>",
  group: "Paragraph"
});
const Bl = Ve("paragraphKeymap", {
  TurnIntoText: {
    shortcuts: "Mod-Alt-0",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(ls.key);
    }
  }
});
w(Bl.ctx, {
  displayName: "KeymapCtx<paragraph>",
  group: "Paragraph"
});
w(Bl.shortcuts, {
  displayName: "Keymap<paragraph>",
  group: "Paragraph"
});
const s0 = Array(6).fill(0).map((n, e) => e + 1);
function o0(n) {
  return n.textContent.toLowerCase().trim().replace(/\s+/g, "-");
}
const as = ct(
  o0,
  "headingIdGenerator"
);
w(as, {
  displayName: "Ctx<HeadingIdGenerator>",
  group: "Heading"
});
const zl = Xe("heading");
w(zl, {
  displayName: "Attr<heading>",
  group: "Heading"
});
const wn = Fe("heading", (n) => {
  const e = n.get(as.key);
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
    parseDOM: s0.map((t) => ({
      tag: `h${t}`,
      getAttrs: (r) => {
        if (!(r instanceof HTMLElement)) throw yn(r);
        return { level: t, id: r.id };
      }
    })),
    toDOM: (t) => [
      `h${t.attrs.level}`,
      {
        ...n.get(zl.key)(t),
        id: t.attrs.id || e(t)
      },
      0
    ],
    parseMarkdown: {
      match: ({ type: t }) => t === "heading",
      runner: (t, r, i) => {
        const s = r.depth;
        t.openNode(i, { level: s }), t.next(r.children), t.closeNode();
      }
    },
    toMarkdown: {
      match: (t) => t.type.name === "heading",
      runner: (t, r) => {
        t.openNode("heading", void 0, { depth: r.attrs.level }), Vf(t, r), t.closeNode();
      }
    }
  };
});
w(wn.node, {
  displayName: "NodeSchema<heading>",
  group: "Heading"
});
w(wn.ctx, {
  displayName: "NodeSchemaCtx<heading>",
  group: "Heading"
});
const Kf = Qe((n) => Lh(
  /^(?<hashes>#+)\s$/,
  wn.type(n),
  (e) => {
    const t = e.groups?.hashes?.length || 0, r = n.get(qe), { $from: i } = r.state.selection, s = i.node();
    if (s.type.name === "heading") {
      let o = Number(s.attrs.level) + Number(t);
      return o > 6 && (o = 6), { level: o };
    }
    return { level: t };
  }
));
w(Kf, {
  displayName: "InputRule<wrapInHeadingInputRule>",
  group: "Heading"
});
const yt = U("WrapInHeading", (n) => (e) => (e ??= 1, e < 1 ? Pr(bn.type(n)) : Pr(wn.type(n), { level: e })));
w(yt, {
  displayName: "Command<wrapInHeadingCommand>",
  group: "Heading"
});
const Fl = U(
  "DowngradeHeading",
  (n) => () => (e, t, r) => {
    const { $from: i } = e.selection, s = i.node();
    if (s.type !== wn.type(n) || !e.selection.empty || i.parentOffset !== 0)
      return !1;
    const o = s.attrs.level - 1;
    return o ? (t?.(
      e.tr.setNodeMarkup(e.selection.$from.before(), void 0, {
        ...s.attrs,
        level: o
      })
    ), !0) : Pr(bn.type(n))(e, t, r);
  }
);
w(Fl, {
  displayName: "Command<downgradeHeadingCommand>",
  group: "Heading"
});
const Vl = Ve("headingKeymap", {
  TurnIntoH1: {
    shortcuts: "Mod-Alt-1",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(yt.key, 1);
    }
  },
  TurnIntoH2: {
    shortcuts: "Mod-Alt-2",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(yt.key, 2);
    }
  },
  TurnIntoH3: {
    shortcuts: "Mod-Alt-3",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(yt.key, 3);
    }
  },
  TurnIntoH4: {
    shortcuts: "Mod-Alt-4",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(yt.key, 4);
    }
  },
  TurnIntoH5: {
    shortcuts: "Mod-Alt-5",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(yt.key, 5);
    }
  },
  TurnIntoH6: {
    shortcuts: "Mod-Alt-6",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(yt.key, 6);
    }
  },
  DowngradeHeading: {
    shortcuts: ["Delete", "Backspace"],
    command: (n) => {
      const e = n.get(J);
      return () => e.call(Fl.key);
    }
  }
});
w(Vl.ctx, {
  displayName: "KeymapCtx<heading>",
  group: "Heading"
});
w(Vl.shortcuts, {
  displayName: "Keymap<heading>",
  group: "Heading"
});
const _l = Xe("blockquote");
w(_l, {
  displayName: "Attr<blockquote>",
  group: "Blockquote"
});
const Jr = Fe(
  "blockquote",
  (n) => ({
    content: "block+",
    group: "block",
    defining: !0,
    parseDOM: [{ tag: "blockquote" }],
    toDOM: (e) => ["blockquote", n.get(_l.key)(e), 0],
    parseMarkdown: {
      match: ({ type: e }) => e === "blockquote",
      runner: (e, t, r) => {
        e.openNode(r).next(t.children).closeNode();
      }
    },
    toMarkdown: {
      match: (e) => e.type.name === "blockquote",
      runner: (e, t) => {
        e.openNode("blockquote").next(t.content).closeNode();
      }
    }
  })
);
w(Jr.node, {
  displayName: "NodeSchema<blockquote>",
  group: "Blockquote"
});
w(Jr.ctx, {
  displayName: "NodeSchemaCtx<blockquote>",
  group: "Blockquote"
});
const Jf = Qe(
  (n) => ul(/^\s*>\s$/, Jr.type(n))
);
w(Jf, {
  displayName: "InputRule<wrapInBlockquoteInputRule>",
  group: "Blockquote"
});
const $l = U(
  "WrapInBlockquote",
  (n) => () => al(Jr.type(n))
);
w($l, {
  displayName: "Command<wrapInBlockquoteCommand>",
  group: "Blockquote"
});
const Hl = Ve("blockquoteKeymap", {
  WrapInBlockquote: {
    shortcuts: "Mod-Shift-b",
    command: (n) => {
      const e = n.get(J);
      return () => e.call($l.key);
    }
  }
});
w(Hl.ctx, {
  displayName: "KeymapCtx<blockquote>",
  group: "Blockquote"
});
w(Hl.shortcuts, {
  displayName: "Keymap<blockquote>",
  group: "Blockquote"
});
const Wl = Xe("codeBlock", () => ({
  pre: {},
  code: {}
}));
w(Wl, {
  displayName: "Attr<codeBlock>",
  group: "CodeBlock"
});
const Ur = Fe("code_block", (n) => ({
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
        if (!(e instanceof HTMLElement)) throw yn(e);
        return { language: e.dataset.language };
      }
    }
  ],
  toDOM: (e) => {
    const t = n.get(Wl.key)(e), r = e.attrs.language, i = r && r.length > 0 ? { "data-language": r } : void 0;
    return [
      "pre",
      {
        ...t.pre,
        ...i
      },
      ["code", t.code, 0]
    ];
  },
  parseMarkdown: {
    match: ({ type: e }) => e === "code",
    runner: (e, t, r) => {
      const i = t.lang ?? "", s = t.value;
      e.openNode(r, { language: i }), s && e.addText(s), e.closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "code_block",
    runner: (e, t) => {
      e.addNode("code", void 0, t.content.firstChild?.text || "", {
        lang: t.attrs.language
      });
    }
  }
}));
w(Ur.node, {
  displayName: "NodeSchema<codeBlock>",
  group: "CodeBlock"
});
w(Ur.ctx, {
  displayName: "NodeSchemaCtx<codeBlock>",
  group: "CodeBlock"
});
const Uf = Qe(
  (n) => Lh(
    /^```(?<language>[a-z]*)?[\s\n]$/,
    Ur.type(n),
    (e) => ({
      language: e.groups?.language ?? ""
    })
  )
);
w(Uf, {
  displayName: "InputRule<createCodeBlockInputRule>",
  group: "CodeBlock"
});
const jl = U(
  "CreateCodeBlock",
  (n) => (e = "") => Pr(Ur.type(n), { language: e })
);
w(jl, {
  displayName: "Command<createCodeBlockCommand>",
  group: "CodeBlock"
});
const l0 = U(
  "UpdateCodeBlockLanguage",
  () => ({ pos: n, language: e } = {
    pos: -1,
    language: ""
  }) => (t, r) => n >= 0 ? (r?.(t.tr.setNodeAttribute(n, "language", e)), !0) : !1
);
w(l0, {
  displayName: "Command<updateCodeBlockLanguageCommand>",
  group: "CodeBlock"
});
const ql = Ve("codeBlockKeymap", {
  CreateCodeBlock: {
    shortcuts: "Mod-Alt-c",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(jl.key);
    }
  }
});
w(ql.ctx, {
  displayName: "KeymapCtx<codeBlock>",
  group: "CodeBlock"
});
w(ql.shortcuts, {
  displayName: "Keymap<codeBlock>",
  group: "CodeBlock"
});
const Kl = Xe("image");
w(Kl, {
  displayName: "Attr<image>",
  group: "Image"
});
const Un = Fe("image", (n) => ({
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
        if (!(e instanceof HTMLElement)) throw yn(e);
        return {
          src: e.getAttribute("src") || "",
          alt: e.getAttribute("alt") || "",
          title: e.getAttribute("title") || e.getAttribute("alt") || ""
        };
      }
    }
  ],
  toDOM: (e) => ["img", { ...n.get(Kl.key)(e), ...e.attrs }],
  parseMarkdown: {
    match: ({ type: e }) => e === "image",
    runner: (e, t, r) => {
      const i = t.url, s = t.alt, o = t.title;
      e.addNode(r, {
        src: i,
        alt: s,
        title: o
      });
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "image",
    runner: (e, t) => {
      e.addNode("image", void 0, void 0, {
        title: t.attrs.title,
        url: t.attrs.src,
        alt: t.attrs.alt
      });
    }
  }
}));
w(Un.node, {
  displayName: "NodeSchema<image>",
  group: "Image"
});
w(Un.ctx, {
  displayName: "NodeSchemaCtx<image>",
  group: "Image"
});
const Gf = U(
  "InsertImage",
  (n) => (e = {}) => (t, r) => {
    if (!r) return !0;
    const { src: i = "", alt: s = "", title: o = "" } = e, l = Un.type(n).create({ src: i, alt: s, title: o });
    return l && r(t.tr.replaceSelectionWith(l).scrollIntoView()), !0;
  }
);
w(Gf, {
  displayName: "Command<insertImageCommand>",
  group: "Image"
});
const Yf = U(
  "UpdateImage",
  (n) => (e = {}) => (t, r) => {
    const i = ax(
      t.selection,
      Un.type(n)
    );
    if (!i) return !1;
    const { node: s, pos: o } = i, l = { ...s.attrs }, { src: a, alt: c, title: u } = e;
    return a !== void 0 && (l.src = a), c !== void 0 && (l.alt = c), u !== void 0 && (l.title = u), r?.(
      t.tr.setNodeMarkup(o, void 0, l).scrollIntoView()
    ), !0;
  }
);
w(Yf, {
  displayName: "Command<updateImageCommand>",
  group: "Image"
});
const a0 = Qe(
  (n) => new Ye(
    /!\[(?<alt>.*?)]\((?<filename>.*?)\s*(?="|\))"?(?<title>[^"]+)?"?\)/,
    (e, t, r, i) => {
      const [s, o, l = "", a] = t;
      return s ? e.tr.replaceWith(
        r,
        i,
        Un.type(n).create({ src: l, alt: o, title: a })
      ) : null;
    }
  )
);
w(a0, {
  displayName: "InputRule<insertImageInputRule>",
  group: "Image"
});
const Fi = Xe("hardbreak", (n) => ({
  "data-type": "hardbreak",
  "data-is-inline": n.attrs.isInline
}));
w(Fi, {
  displayName: "Attr<hardbreak>",
  group: "Hardbreak"
});
const un = Fe("hardbreak", (n) => ({
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
  toDOM: (e) => e.attrs.isInline ? ["span", n.get(Fi.key)(e), " "] : ["br", n.get(Fi.key)(e)],
  parseMarkdown: {
    match: ({ type: e }) => e === "break",
    runner: (e, t, r) => {
      e.addNode(r, {
        isInline: !!t.data?.isInline
      });
    }
  },
  leafText: () => `
`,
  toMarkdown: {
    match: (e) => e.type.name === "hardbreak",
    runner: (e, t) => {
      t.attrs.isInline ? e.addNode("text", void 0, `
`) : e.addNode("break");
    }
  }
}));
w(un.node, {
  displayName: "NodeSchema<hardbreak>",
  group: "Hardbreak"
});
w(un.ctx, {
  displayName: "NodeSchemaCtx<hardbreak>",
  group: "Hardbreak"
});
const Jl = U(
  "InsertHardbreak",
  (n) => () => (e, t) => {
    const { selection: r, tr: i } = e;
    if (!(r instanceof H)) return !1;
    if (r.empty) {
      const s = r.$from.node();
      if (s.childCount > 0 && s.lastChild?.type.name === "hardbreak")
        return t?.(
          i.replaceRangeWith(
            r.to - 1,
            r.to,
            e.schema.node("paragraph")
          ).setSelection(q.near(i.doc.resolve(r.to))).scrollIntoView()
        ), !0;
    }
    return t?.(
      i.setMeta("hardbreak", !0).replaceSelectionWith(un.type(n).create()).scrollIntoView()
    ), !0;
  }
);
w(Jl, {
  displayName: "Command<insertHardbreakCommand>",
  group: "Hardbreak"
});
const Ul = Ve("hardbreakKeymap", {
  InsertHardbreak: {
    shortcuts: "Shift-Enter",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(Jl.key);
    }
  }
});
w(Ul.ctx, {
  displayName: "KeymapCtx<hardbreak>",
  group: "Hardbreak"
});
w(Ul.shortcuts, {
  displayName: "Keymap<hardbreak>",
  group: "Hardbreak"
});
const Gl = Xe("hr");
w(Gl, {
  displayName: "Attr<hr>",
  group: "Hr"
});
const Gr = Fe("hr", (n) => ({
  group: "block",
  parseDOM: [{ tag: "hr" }],
  toDOM: (e) => ["hr", n.get(Gl.key)(e)],
  parseMarkdown: {
    match: ({ type: e }) => e === "thematicBreak",
    runner: (e, t, r) => {
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
w(Gr.node, {
  displayName: "NodeSchema<hr>",
  group: "Hr"
});
w(Gr.ctx, {
  displayName: "NodeSchemaCtx<hr>",
  group: "Hr"
});
const Qf = Qe(
  (n) => new Ye(/^(?:---|___\s|\*\*\*\s)$/, (e, t, r, i) => {
    const { tr: s } = e;
    return t[0] && s.replaceWith(r - 1, i, Gr.type(n).create()), s;
  })
);
w(Qf, {
  displayName: "InputRule<insertHrInputRule>",
  group: "Hr"
});
const Xf = U(
  "InsertHr",
  (n) => () => (e, t) => {
    if (!t) return !0;
    const r = bn.node.type(n).create(), { tr: i, selection: s } = e, { from: o } = s, l = Gr.type(n).create();
    if (!l) return !0;
    const a = i.replaceSelectionWith(l).insert(o, r), c = q.findFrom(a.doc.resolve(o), 1, !0);
    return c && t(a.setSelection(c).scrollIntoView()), !0;
  }
);
w(Xf, {
  displayName: "Command<insertHrCommand>",
  group: "Hr"
});
const Yl = Xe("bulletList");
w(Yl, {
  displayName: "Attr<bulletList>",
  group: "BulletList"
});
const Gn = Fe("bullet_list", (n) => ({
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
        if (!(e instanceof HTMLElement)) throw yn(e);
        return {
          spread: e.dataset.spread === "true"
        };
      }
    }
  ],
  toDOM: (e) => [
    "ul",
    {
      ...n.get(Yl.key)(e),
      "data-spread": e.attrs.spread
    },
    0
  ],
  parseMarkdown: {
    match: ({ type: e, ordered: t }) => e === "list" && !t,
    runner: (e, t, r) => {
      const i = t.spread != null ? `${t.spread}` : "false";
      e.openNode(r, { spread: i }).next(t.children).closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "bullet_list",
    runner: (e, t) => {
      e.openNode("list", void 0, {
        ordered: !1,
        spread: t.attrs.spread
      }).next(t.content).closeNode();
    }
  }
}));
w(Gn.node, {
  displayName: "NodeSchema<bulletList>",
  group: "BulletList"
});
w(Gn.ctx, {
  displayName: "NodeSchemaCtx<bulletList>",
  group: "BulletList"
});
const Zf = Qe(
  (n) => ul(/^\s*([-+*])\s$/, Gn.type(n))
);
w(Zf, {
  displayName: "InputRule<wrapInBulletListInputRule>",
  group: "BulletList"
});
const cs = U(
  "WrapInBulletList",
  (n) => () => al(Gn.type(n))
);
w(cs, {
  displayName: "Command<wrapInBulletListCommand>",
  group: "BulletList"
});
const Ql = Ve("bulletListKeymap", {
  WrapInBulletList: {
    shortcuts: "Mod-Alt-8",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(cs.key);
    }
  }
});
w(Ql.ctx, {
  displayName: "KeymapCtx<bulletListKeymap>",
  group: "BulletList"
});
w(Ql.shortcuts, {
  displayName: "Keymap<bulletListKeymap>",
  group: "BulletList"
});
const Xl = Xe("orderedList");
w(Xl, {
  displayName: "Attr<orderedList>",
  group: "OrderedList"
});
const Yn = Fe("ordered_list", (n) => ({
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
        if (!(e instanceof HTMLElement)) throw yn(e);
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
      ...n.get(Xl.key)(e),
      ...e.attrs.order === 1 ? {} : e.attrs.order,
      "data-spread": e.attrs.spread
    },
    0
  ],
  parseMarkdown: {
    match: ({ type: e, ordered: t }) => e === "list" && !!t,
    runner: (e, t, r) => {
      const i = t.spread != null ? `${t.spread}` : "true";
      e.openNode(r, { spread: i }).next(t.children).closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "ordered_list",
    runner: (e, t) => {
      e.openNode("list", void 0, {
        ordered: !0,
        start: 1,
        spread: t.attrs.spread === "true"
      }), e.next(t.content), e.closeNode();
    }
  }
}));
w(Yn.node, {
  displayName: "NodeSchema<orderedList>",
  group: "OrderedList"
});
w(Yn.ctx, {
  displayName: "NodeSchemaCtx<orderedList>",
  group: "OrderedList"
});
const ed = Qe(
  (n) => ul(
    /^\s*(\d+)\.\s$/,
    Yn.type(n),
    (e) => ({ order: Number(e[1]) }),
    (e, t) => t.childCount + t.attrs.order === Number(e[1])
  )
);
w(ed, {
  displayName: "InputRule<wrapInOrderedListInputRule>",
  group: "OrderedList"
});
const us = U(
  "WrapInOrderedList",
  (n) => () => al(Yn.type(n))
);
w(us, {
  displayName: "Command<wrapInOrderedListCommand>",
  group: "OrderedList"
});
const Zl = Ve("orderedListKeymap", {
  WrapInOrderedList: {
    shortcuts: "Mod-Alt-7",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(us.key);
    }
  }
});
w(Zl.ctx, {
  displayName: "KeymapCtx<orderedList>",
  group: "OrderedList"
});
w(Zl.shortcuts, {
  displayName: "Keymap<orderedList>",
  group: "OrderedList"
});
const ea = Xe("listItem");
w(ea, {
  displayName: "Attr<listItem>",
  group: "ListItem"
});
const Kt = Fe("list_item", (n) => ({
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
        if (!(e instanceof HTMLElement)) throw yn(e);
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
      ...n.get(ea.key)(e),
      "data-label": e.attrs.label,
      "data-list-type": e.attrs.listType,
      "data-spread": e.attrs.spread
    },
    0
  ],
  parseMarkdown: {
    match: ({ type: e }) => e === "listItem",
    runner: (e, t, r) => {
      const i = t.label != null ? `${t.label}.` : "•", s = t.label != null ? "ordered" : "bullet", o = t.spread != null ? `${t.spread}` : "true";
      e.openNode(r, { label: i, listType: s, spread: o }), e.next(t.children), e.closeNode();
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "list_item",
    runner: (e, t) => {
      e.openNode("listItem", void 0, {
        spread: t.attrs.spread
      }), e.next(t.content), e.closeNode();
    }
  }
}));
w(Kt.node, {
  displayName: "NodeSchema<listItem>",
  group: "ListItem"
});
w(Kt.ctx, {
  displayName: "NodeSchemaCtx<listItem>",
  group: "ListItem"
});
const ta = U(
  "SinkListItem",
  (n) => () => e0(Kt.type(n))
);
w(ta, {
  displayName: "Command<sinkListItemCommand>",
  group: "ListItem"
});
const na = U(
  "LiftListItem",
  (n) => () => Qb(Kt.type(n))
);
w(na, {
  displayName: "Command<liftListItemCommand>",
  group: "ListItem"
});
const ra = U(
  "SplitListItem",
  (n) => () => Yb(Kt.type(n))
);
w(ra, {
  displayName: "Command<splitListItemCommand>",
  group: "ListItem"
});
function c0(n) {
  return (e, t, r) => {
    const { selection: i } = e;
    if (!(i instanceof H)) return !1;
    const { empty: s, $from: o } = i;
    return !s || o.parentOffset !== 0 || o.node(-1).type !== Kt.type(n) ? !1 : Eh(e, t, r);
  };
}
const ia = U(
  "LiftFirstListItem",
  (n) => () => c0(n)
);
w(ia, {
  displayName: "Command<liftFirstListItemCommand>",
  group: "ListItem"
});
const sa = Ve("listItemKeymap", {
  NextListItem: {
    shortcuts: "Enter",
    command: (n) => {
      const e = n.get(J);
      return () => e.call(ra.key);
    }
  },
  SinkListItem: {
    shortcuts: ["Tab", "Mod-]"],
    command: (n) => {
      const e = n.get(J);
      return () => e.call(ta.key);
    }
  },
  LiftListItem: {
    shortcuts: ["Shift-Tab", "Mod-["],
    command: (n) => {
      const e = n.get(J);
      return () => e.call(na.key);
    }
  },
  LiftFirstListItem: {
    shortcuts: ["Backspace", "Delete"],
    command: (n) => {
      const e = n.get(J);
      return () => e.call(ia.key);
    }
  }
});
w(sa.ctx, {
  displayName: "KeymapCtx<listItem>",
  group: "ListItem"
});
w(sa.shortcuts, {
  displayName: "Keymap<listItem>",
  group: "ListItem"
});
const td = Sl("text", () => ({
  group: "inline",
  parseMarkdown: {
    match: ({ type: n }) => n === "text",
    runner: (n, e) => {
      n.addText(e.value);
    }
  },
  toMarkdown: {
    match: (n) => n.type.name === "text",
    runner: (n, e) => {
      n.addNode("text", void 0, e.text);
    }
  }
}));
w(td, {
  displayName: "NodeSchema<text>",
  group: "Text"
});
const oa = Xe("html");
w(oa, {
  displayName: "Attr<html>",
  group: "Html"
});
const la = Fe("html", (n) => ({
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
    const t = document.createElement("span"), r = {
      ...n.get(oa.key)(e),
      "data-value": e.attrs.value,
      "data-type": "html"
    };
    return t.textContent = e.attrs.value, ["span", r, e.attrs.value];
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
    runner: (e, t, r) => {
      e.addNode(r, { value: t.value });
    }
  },
  toMarkdown: {
    match: (e) => e.type.name === "html",
    runner: (e, t) => {
      e.addNode("html", void 0, t.attrs.value);
    }
  }
}));
w(la.node, {
  displayName: "NodeSchema<html>",
  group: "Html"
});
w(la.ctx, {
  displayName: "NodeSchemaCtx<html>",
  group: "Html"
});
const u0 = [
  qf,
  Ll,
  bn,
  as,
  zl,
  wn,
  Fi,
  un,
  _l,
  Jr,
  Wl,
  Ur,
  Gl,
  Gr,
  Kl,
  Un,
  Yl,
  Gn,
  Xl,
  Yn,
  ea,
  Kt,
  Tl,
  Jn,
  Ol,
  Kr,
  Al,
  Rt,
  Rl,
  Ln,
  oa,
  la,
  td
].flat(), h0 = [
  Jf,
  Zf,
  ed,
  Uf,
  Qf,
  Kf
].flat(), f0 = [
  _f,
  $f,
  Wf,
  Hf
], d0 = U(
  "IsMarkSelected",
  () => (n) => (e) => {
    if (!n) return !1;
    const { doc: t, selection: r } = e;
    return t.rangeHasMark(r.from, r.to, n);
  }
), p0 = U(
  "IsNoteSelected",
  () => (n) => (e) => n ? cx(e, n).hasNode : !1
), m0 = U(
  "ClearTextInCurrentBlock",
  () => () => (n, e) => {
    let t = n.tr;
    const { $from: r, $to: i } = t.selection, { pos: s } = r, { pos: o } = i, l = s - r.node().content.size;
    return l < 0 ? !1 : (t = t.deleteRange(l, o), e?.(t), !0);
  }
), g0 = U(
  "SetBlockType",
  () => (n) => (e, t) => {
    const { nodeType: r, attrs: i = null } = n ?? {};
    if (!r) return !1;
    const s = e.tr, { from: o, to: l } = s.selection;
    try {
      s.setBlockType(o, l, r, i);
    } catch {
      return !1;
    }
    return t?.(s), !0;
  }
), y0 = U(
  "WrapInBlockType",
  () => (n) => (e, t) => {
    const { nodeType: r, attrs: i = null } = n ?? {};
    if (!r) return !1;
    let s = e.tr;
    try {
      const { $from: o, $to: l } = s.selection, a = o.blockRange(l), c = a && rl(a, r, i);
      if (!c) return !1;
      s = s.wrap(a, c);
    } catch {
      return !1;
    }
    return t?.(s), !0;
  }
), k0 = U(
  "AddBlockType",
  () => (n) => (e, t) => {
    const { nodeType: r, attrs: i = null } = n ?? {};
    if (!r) return !1;
    const s = e.tr;
    try {
      const o = r instanceof bt ? r : r.createAndFill(i);
      if (!o) return !1;
      s.replaceSelectionWith(o);
    } catch {
      return !1;
    }
    return t?.(s), !0;
  }
), x0 = U(
  "SelectTextNearPos",
  () => (n) => (e, t) => {
    const { pos: r } = n ?? {};
    if (r == null) return !1;
    const i = (o, l, a) => Math.min(Math.max(o, l), a), s = e.tr;
    try {
      const o = e.doc.resolve(i(r, 0, e.doc.content.size));
      s.setSelection(H.near(o));
    } catch {
      return !1;
    }
    return t?.(s.scrollIntoView()), !0;
  }
), b0 = [
  ls,
  $l,
  yt,
  Fl,
  jl,
  Jl,
  Xf,
  Gf,
  Yf,
  us,
  cs,
  ta,
  ra,
  na,
  ia,
  rs,
  Dl,
  is,
  Pl,
  jf,
  d0,
  p0,
  m0,
  g0,
  y0,
  k0,
  x0
], w0 = [
  Hl,
  ql,
  Ul,
  Vl,
  sa,
  Zl,
  Ql,
  Bl,
  Il,
  vl,
  El
].flat(), aa = qn(
  "remarkAddOrderInList",
  () => () => (n) => {
    Wn(n, "list", (e) => {
      if (e.ordered) {
        const t = e.start ?? 1;
        e.children.forEach((r, i) => {
          r.label = i + t;
        });
      }
    });
  }
);
w(aa.plugin, {
  displayName: "Remark<remarkAddOrderInListPlugin>",
  group: "Remark"
});
w(aa.options, {
  displayName: "RemarkConfig<remarkAddOrderInListPlugin>",
  group: "Remark"
});
const ca = qn(
  "remarkLineBreak",
  () => () => (n) => {
    const e = /[\t ]*(?:\r?\n|\r)/g;
    Wn(
      n,
      "text",
      (t, r, i) => {
        if (!t.value || typeof t.value != "string") return;
        const s = [];
        let o = 0;
        e.lastIndex = 0;
        let l = e.exec(t.value);
        for (; l; ) {
          const c = l.index;
          o !== c && s.push({
            type: "text",
            value: t.value.slice(o, c)
          }), s.push({ type: "break", data: { isInline: !0 } }), o = c + l[0].length, l = e.exec(t.value);
        }
        if (s.length > 0 && i && typeof r == "number")
          return o < t.value.length && s.push({ type: "text", value: t.value.slice(o) }), i.children.splice(r, 1, ...s), r + s.length;
      }
    );
  }
);
w(ca.plugin, {
  displayName: "Remark<remarkLineBreak>",
  group: "Remark"
});
w(ca.options, {
  displayName: "RemarkConfig<remarkLineBreak>",
  group: "Remark"
});
const ua = qn(
  "remarkInlineLink",
  () => n0
);
w(ua.plugin, {
  displayName: "Remark<remarkInlineLinkPlugin>",
  group: "Remark"
});
w(ua.options, {
  displayName: "RemarkConfig<remarkInlineLinkPlugin>",
  group: "Remark"
});
const S0 = (n) => !!n.children, C0 = (n) => n.type === "html";
function M0(n, e) {
  return t(n, 0, null)[0];
  function t(r, i, s) {
    if (S0(r)) {
      const o = [];
      for (let l = 0, a = r.children.length; l < a; l++) {
        const c = r.children[l];
        if (c) {
          const u = t(c, l, r);
          if (u)
            for (let h = 0, d = u.length; h < d; h++) {
              const f = u[h];
              f && o.push(f);
            }
        }
      }
      r.children = o;
    }
    return e(r, i, s);
  }
}
const N0 = ["root", "blockquote", "listItem"], ha = qn(
  "remarkHTMLTransformer",
  () => () => (n) => {
    M0(n, (e, t, r) => C0(e) ? (r && N0.includes(r.type) && (e.children = [{ ...e }], delete e.value, e.type = "paragraph"), [e]) : [e]);
  }
);
w(ha.plugin, {
  displayName: "Remark<remarkHtmlTransformer>",
  group: "Remark"
});
w(ha.options, {
  displayName: "RemarkConfig<remarkHtmlTransformer>",
  group: "Remark"
});
const fa = qn(
  "remarkMarker",
  () => () => (n, e) => {
    const t = (r) => e.value.charAt(r.position.start.offset);
    Wn(
      n,
      (r) => ["strong", "emphasis"].includes(r.type),
      (r) => {
        r.marker = t(r);
      }
    );
  }
);
w(fa.plugin, {
  displayName: "Remark<remarkMarker>",
  group: "Remark"
});
w(fa.options, {
  displayName: "RemarkConfig<remarkMarker>",
  group: "Remark"
});
const nd = qt(() => {
  let n = !1;
  const e = new ve(
    "MILKDOWN_INLINE_NODES_CURSOR"
  ), t = new De({
    key: e,
    state: {
      init() {
        return !1;
      },
      apply(r) {
        if (!r.selection.empty) return !1;
        const i = r.selection.$from, s = i.nodeBefore, o = i.nodeAfter;
        return !!(s && o && s.isInline && !s.isText && o.isInline && !o.isText);
      }
    },
    props: {
      handleDOMEvents: {
        compositionend: (r, i) => n ? (n = !1, requestAnimationFrame(() => {
          if (t.getState(r.state)) {
            const o = r.state.selection.from;
            i.preventDefault(), r.dispatch(r.state.tr.insertText(i.data || "", o));
          }
        }), !0) : !1,
        compositionstart: (r) => (t.getState(r.state) && (n = !0), !1),
        beforeinput: (r, i) => {
          if (t.getState(r.state) && i instanceof InputEvent && i.data && !n) {
            const o = r.state.selection.from;
            return i.preventDefault(), r.dispatch(r.state.tr.insertText(i.data || "", o)), !0;
          }
          return !1;
        }
      },
      decorations(r) {
        if (t.getState(r)) {
          const o = r.selection.$from.pos, l = document.createElement("span"), a = Ie.widget(o, l, {
            side: -1
          }), c = document.createElement("span"), u = Ie.widget(o, c);
          return setTimeout(() => {
            l.contentEditable = "true", c.contentEditable = "true";
          }), ie.create(r.doc, [a, u]);
        }
        return ie.empty;
      }
    }
  });
  return t;
});
w(nd, {
  displayName: "Prose<inlineNodesCursorPlugin>",
  group: "Prose"
});
const rd = qt((n) => new De({
  key: new ve("MILKDOWN_HARDBREAK_MARKS"),
  appendTransaction: (e, t, r) => {
    if (!e.length) return;
    const [i] = e;
    if (!i) return;
    const [s] = i.steps;
    if (i.getMeta("hardbreak")) {
      if (!(s instanceof le)) return;
      const { from: a } = s;
      return r.tr.setNodeMarkup(
        a,
        un.type(n),
        void 0,
        []
      );
    }
    if (s instanceof kt) {
      let a = r.tr;
      const { from: c, to: u } = s;
      return r.doc.nodesBetween(c, u, (h, d) => {
        h.type === un.type(n) && (a = a.setNodeMarkup(
          d,
          un.type(n),
          void 0,
          []
        ));
      }), a;
    }
  }
}));
w(rd, {
  displayName: "Prose<hardbreakClearMarkPlugin>",
  group: "Prose"
});
const da = ct(
  ["table", "code_block"],
  "hardbreakFilterNodes"
);
w(da, {
  displayName: "Ctx<hardbreakFilterNodes>",
  group: "Prose"
});
const id = qt((n) => {
  const e = n.get(da.key);
  return new De({
    key: new ve("MILKDOWN_HARDBREAK_FILTER"),
    filterTransaction: (t, r) => {
      const i = t.getMeta("hardbreak"), [s] = t.steps;
      if (i && s) {
        const { from: o } = s, l = r.doc.resolve(o);
        let a = l.depth, c = !0;
        for (; a > 0; )
          e.includes(l.node(a).type.name) && (c = !1), a--;
        return c;
      }
      return !0;
    }
  });
});
w(id, {
  displayName: "Prose<hardbreakFilterPlugin>",
  group: "Prose"
});
const sd = qt((n) => {
  const e = new ve("MILKDOWN_HEADING_ID"), t = (r) => {
    if (r.composing) return;
    const i = n.get(as.key), s = r.state.tr.setMeta("addToHistory", !1);
    let o = !1;
    const l = {};
    r.state.doc.descendants((a, c) => {
      if (a.type === wn.type(n)) {
        if (a.textContent.trim().length === 0) return;
        const u = a.attrs;
        let h = i(a);
        l[h] ? (l[h] += 1, h += `-#${l[h]}`) : l[h] = 1, u.id !== h && (o = !0, s.setMeta(e, !0).setNodeMarkup(c, void 0, {
          ...u,
          id: h
        }));
      }
    }), o && r.dispatch(s);
  };
  return new De({
    key: e,
    view: (r) => (t(r), {
      update: (i, s) => {
        i.state.doc.eq(s.doc) || t(i);
      }
    })
  });
});
w(sd, {
  displayName: "Prose<syncHeadingIdPlugin>",
  group: "Prose"
});
const od = qt((n) => {
  const e = (t, r, i) => {
    if (!i.selection || t.some(
      (h) => h.getMeta("addToHistory") === !1 || !h.isGeneric
    ))
      return null;
    const s = Yn.type(n), o = Gn.type(n), l = Kt.type(n), a = (h, d) => {
      let f = !1;
      const p = `${d + 1}.`;
      return h.label !== p && (h.label = p, f = !0), f;
    };
    let c = i.tr, u = !1;
    return i.doc.descendants(
      (h, d, f, p) => {
        if (h.type === o) {
          const m = h.maybeChild(0);
          m?.type === l && m.attrs.listType === "ordered" && (u = !0, c.setNodeMarkup(d, s, { spread: "true" }), h.descendants(
            (x, k, T, C) => {
              if (x.type === l) {
                const E = { ...x.attrs };
                a(E, C) && (c = c.setNodeMarkup(k, void 0, E));
              }
              return !1;
            }
          ));
        } else if (h.type === l && f?.type === s) {
          const m = { ...h.attrs };
          let x = !1;
          m.listType !== "ordered" && (m.listType = "ordered", x = !0), f?.maybeChild(0) && (x = a(m, p)), x && (c = c.setNodeMarkup(d, void 0, m), u = !0);
        }
      }
    ), u ? c.setMeta("addToHistory", !1) : null;
  };
  return new De({
    key: new ve("MILKDOWN_KEEP_LIST_ORDER"),
    appendTransaction: e
  });
});
w(od, {
  displayName: "Prose<syncListOrderPlugin>",
  group: "Prose"
});
const T0 = [
  rd,
  da,
  id,
  nd,
  aa,
  ua,
  ca,
  ha,
  fa,
  ss,
  sd,
  od
].flat(), I0 = [
  u0,
  h0,
  f0,
  b0,
  w0,
  T0
].flat(), $o = Math.min, Bn = Math.max, Vi = Math.round, it = (n) => ({
  x: n,
  y: n
}), O0 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, E0 = {
  start: "end",
  end: "start"
};
function iu(n, e, t) {
  return Bn(n, $o(e, t));
}
function hs(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function gn(n) {
  return n.split("-")[0];
}
function fs(n) {
  return n.split("-")[1];
}
function ld(n) {
  return n === "x" ? "y" : "x";
}
function ad(n) {
  return n === "y" ? "height" : "width";
}
const A0 = /* @__PURE__ */ new Set(["top", "bottom"]);
function Pt(n) {
  return A0.has(gn(n)) ? "y" : "x";
}
function cd(n) {
  return ld(Pt(n));
}
function D0(n, e, t) {
  t === void 0 && (t = !1);
  const r = fs(n), i = cd(n), s = ad(i);
  let o = i === "x" ? r === (t ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = _i(o)), [o, _i(o)];
}
function v0(n) {
  const e = _i(n);
  return [Ho(n), e, Ho(e)];
}
function Ho(n) {
  return n.replace(/start|end/g, (e) => E0[e]);
}
const su = ["left", "right"], ou = ["right", "left"], R0 = ["top", "bottom"], P0 = ["bottom", "top"];
function L0(n, e, t) {
  switch (n) {
    case "top":
    case "bottom":
      return t ? e ? ou : su : e ? su : ou;
    case "left":
    case "right":
      return e ? R0 : P0;
    default:
      return [];
  }
}
function B0(n, e, t, r) {
  const i = fs(n);
  let s = L0(gn(n), t === "start", r);
  return i && (s = s.map((o) => o + "-" + i), e && (s = s.concat(s.map(Ho)))), s;
}
function _i(n) {
  return n.replace(/left|right|bottom|top/g, (e) => O0[e]);
}
function z0(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function F0(n) {
  return typeof n != "number" ? z0(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function $i(n) {
  const {
    x: e,
    y: t,
    width: r,
    height: i
  } = n;
  return {
    width: r,
    height: i,
    top: t,
    left: e,
    right: e + r,
    bottom: t + i,
    x: e,
    y: t
  };
}
function lu(n, e, t) {
  let {
    reference: r,
    floating: i
  } = n;
  const s = Pt(e), o = cd(e), l = ad(o), a = gn(e), c = s === "y", u = r.x + r.width / 2 - i.width / 2, h = r.y + r.height / 2 - i.height / 2, d = r[l] / 2 - i[l] / 2;
  let f;
  switch (a) {
    case "top":
      f = {
        x: u,
        y: r.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      f = {
        x: r.x + r.width,
        y: h
      };
      break;
    case "left":
      f = {
        x: r.x - i.width,
        y: h
      };
      break;
    default:
      f = {
        x: r.x,
        y: r.y
      };
  }
  switch (fs(e)) {
    case "start":
      f[o] -= d * (t && c ? -1 : 1);
      break;
    case "end":
      f[o] += d * (t && c ? -1 : 1);
      break;
  }
  return f;
}
const V0 = async (n, e, t) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: o
  } = t, l = s.filter(Boolean), a = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let c = await o.getElementRects({
    reference: n,
    floating: e,
    strategy: i
  }), {
    x: u,
    y: h
  } = lu(c, r, a), d = r, f = {}, p = 0;
  for (let m = 0; m < l.length; m++) {
    const {
      name: x,
      fn: k
    } = l[m], {
      x: T,
      y: C,
      data: E,
      reset: A
    } = await k({
      x: u,
      y: h,
      initialPlacement: r,
      placement: d,
      strategy: i,
      middlewareData: f,
      rects: c,
      platform: o,
      elements: {
        reference: n,
        floating: e
      }
    });
    u = T ?? u, h = C ?? h, f = {
      ...f,
      [x]: {
        ...f[x],
        ...E
      }
    }, A && p <= 50 && (p++, typeof A == "object" && (A.placement && (d = A.placement), A.rects && (c = A.rects === !0 ? await o.getElementRects({
      reference: n,
      floating: e,
      strategy: i
    }) : A.rects), {
      x: u,
      y: h
    } = lu(c, d, a)), m = -1);
  }
  return {
    x: u,
    y: h,
    placement: d,
    strategy: i,
    middlewareData: f
  };
};
async function ud(n, e) {
  var t;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: s,
    rects: o,
    elements: l,
    strategy: a
  } = n, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: h = "floating",
    altBoundary: d = !1,
    padding: f = 0
  } = hs(e, n), p = F0(f), x = l[d ? h === "floating" ? "reference" : "floating" : h], k = $i(await s.getClippingRect({
    element: (t = await (s.isElement == null ? void 0 : s.isElement(x))) == null || t ? x : x.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: a
  })), T = h === "floating" ? {
    x: r,
    y: i,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), E = await (s.isElement == null ? void 0 : s.isElement(C)) ? await (s.getScale == null ? void 0 : s.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, A = $i(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: T,
    offsetParent: C,
    strategy: a
  }) : T);
  return {
    top: (k.top - A.top + p.top) / E.y,
    bottom: (A.bottom - k.bottom + p.bottom) / E.y,
    left: (k.left - A.left + p.left) / E.x,
    right: (A.right - k.right + p.right) / E.x
  };
}
const _0 = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(e) {
      var t, r;
      const {
        placement: i,
        middlewareData: s,
        rects: o,
        initialPlacement: l,
        platform: a,
        elements: c
      } = e, {
        mainAxis: u = !0,
        crossAxis: h = !0,
        fallbackPlacements: d,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: m = !0,
        ...x
      } = hs(n, e);
      if ((t = s.arrow) != null && t.alignmentOffset)
        return {};
      const k = gn(i), T = Pt(l), C = gn(l) === l, E = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), A = d || (C || !m ? [_i(l)] : v0(l)), b = p !== "none";
      !d && b && A.push(...B0(l, m, p, E));
      const z = [l, ...A], O = await ud(e, x), D = [];
      let P = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && D.push(O[k]), h) {
        const G = D0(i, o, E);
        D.push(O[G[0]], O[G[1]]);
      }
      if (P = [...P, {
        placement: i,
        overflows: D
      }], !D.every((G) => G <= 0)) {
        var v, R;
        const G = (((v = s.flip) == null ? void 0 : v.index) || 0) + 1, _ = z[G];
        if (_ && (!(h === "alignment" ? T !== Pt(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        P.every((te) => Pt(te.placement) === T ? te.overflows[0] > 0 : !0)))
          return {
            data: {
              index: G,
              overflows: P
            },
            reset: {
              placement: _
            }
          };
        let ne = (R = P.filter((Z) => Z.overflows[0] <= 0).sort((Z, te) => Z.overflows[1] - te.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!ne)
          switch (f) {
            case "bestFit": {
              var Y;
              const Z = (Y = P.filter((te) => {
                if (b) {
                  const oe = Pt(te.placement);
                  return oe === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  oe === "y";
                }
                return !0;
              }).map((te) => [te.placement, te.overflows.filter((oe) => oe > 0).reduce((oe, g) => oe + g, 0)]).sort((te, oe) => te[1] - oe[1])[0]) == null ? void 0 : Y[0];
              Z && (ne = Z);
              break;
            }
            case "initialPlacement":
              ne = l;
              break;
          }
        if (i !== ne)
          return {
            reset: {
              placement: ne
            }
          };
      }
      return {};
    }
  };
}, $0 = /* @__PURE__ */ new Set(["left", "top"]);
async function H0(n, e) {
  const {
    placement: t,
    platform: r,
    elements: i
  } = n, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = gn(t), l = fs(t), a = Pt(t) === "y", c = $0.has(o) ? -1 : 1, u = s && a ? -1 : 1, h = hs(e, n);
  let {
    mainAxis: d,
    crossAxis: f,
    alignmentAxis: p
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: h.mainAxis || 0,
    crossAxis: h.crossAxis || 0,
    alignmentAxis: h.alignmentAxis
  };
  return l && typeof p == "number" && (f = l === "end" ? p * -1 : p), a ? {
    x: f * u,
    y: d * c
  } : {
    x: d * c,
    y: f * u
  };
}
const W0 = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(e) {
      var t, r;
      const {
        x: i,
        y: s,
        placement: o,
        middlewareData: l
      } = e, a = await H0(e, n);
      return o === ((t = l.offset) == null ? void 0 : t.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: i + a.x,
        y: s + a.y,
        data: {
          ...a,
          placement: o
        }
      };
    }
  };
}, j0 = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(e) {
      const {
        x: t,
        y: r,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: l = {
          fn: (x) => {
            let {
              x: k,
              y: T
            } = x;
            return {
              x: k,
              y: T
            };
          }
        },
        ...a
      } = hs(n, e), c = {
        x: t,
        y: r
      }, u = await ud(e, a), h = Pt(gn(i)), d = ld(h);
      let f = c[d], p = c[h];
      if (s) {
        const x = d === "y" ? "top" : "left", k = d === "y" ? "bottom" : "right", T = f + u[x], C = f - u[k];
        f = iu(T, f, C);
      }
      if (o) {
        const x = h === "y" ? "top" : "left", k = h === "y" ? "bottom" : "right", T = p + u[x], C = p - u[k];
        p = iu(T, p, C);
      }
      const m = l.fn({
        ...e,
        [d]: f,
        [h]: p
      });
      return {
        ...m,
        data: {
          x: m.x - t,
          y: m.y - r,
          enabled: {
            [d]: s,
            [h]: o
          }
        }
      };
    }
  };
};
function ds() {
  return typeof window < "u";
}
function Qn(n) {
  return hd(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Ee(n) {
  var e;
  return (n == null || (e = n.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Mt(n) {
  var e;
  return (e = (hd(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : e.documentElement;
}
function hd(n) {
  return ds() ? n instanceof Node || n instanceof Ee(n).Node : !1;
}
function Ue(n) {
  return ds() ? n instanceof Element || n instanceof Ee(n).Element : !1;
}
function at(n) {
  return ds() ? n instanceof HTMLElement || n instanceof Ee(n).HTMLElement : !1;
}
function au(n) {
  return !ds() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof Ee(n).ShadowRoot;
}
const q0 = /* @__PURE__ */ new Set(["inline", "contents"]);
function Yr(n) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: r,
    display: i
  } = Ge(n);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + t) && !q0.has(i);
}
const K0 = /* @__PURE__ */ new Set(["table", "td", "th"]);
function J0(n) {
  return K0.has(Qn(n));
}
const U0 = [":popover-open", ":modal"];
function ps(n) {
  return U0.some((e) => {
    try {
      return n.matches(e);
    } catch {
      return !1;
    }
  });
}
const G0 = ["transform", "translate", "scale", "rotate", "perspective"], Y0 = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Q0 = ["paint", "layout", "strict", "content"];
function pa(n) {
  const e = ma(), t = Ue(n) ? Ge(n) : n;
  return G0.some((r) => t[r] ? t[r] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || Y0.some((r) => (t.willChange || "").includes(r)) || Q0.some((r) => (t.contain || "").includes(r));
}
function X0(n) {
  let e = $t(n);
  for (; at(e) && !Hn(e); ) {
    if (pa(e))
      return e;
    if (ps(e))
      return null;
    e = $t(e);
  }
  return null;
}
function ma() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Z0 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Hn(n) {
  return Z0.has(Qn(n));
}
function Ge(n) {
  return Ee(n).getComputedStyle(n);
}
function ms(n) {
  return Ue(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function $t(n) {
  if (Qn(n) === "html")
    return n;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    au(n) && n.host || // Fallback.
    Mt(n)
  );
  return au(e) ? e.host : e;
}
function fd(n) {
  const e = $t(n);
  return Hn(e) ? n.ownerDocument ? n.ownerDocument.body : n.body : at(e) && Yr(e) ? e : fd(e);
}
function dd(n, e, t) {
  var r;
  e === void 0 && (e = []);
  const i = fd(n), s = i === ((r = n.ownerDocument) == null ? void 0 : r.body), o = Ee(i);
  return s ? (Wo(o), e.concat(o, o.visualViewport || [], Yr(i) ? i : [], [])) : e.concat(i, dd(i, []));
}
function Wo(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function pd(n) {
  const e = Ge(n);
  let t = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = at(n), s = i ? n.offsetWidth : t, o = i ? n.offsetHeight : r, l = Vi(t) !== s || Vi(r) !== o;
  return l && (t = s, r = o), {
    width: t,
    height: r,
    $: l
  };
}
function md(n) {
  return Ue(n) ? n : n.contextElement;
}
function zn(n) {
  const e = md(n);
  if (!at(e))
    return it(1);
  const t = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: s
  } = pd(e);
  let o = (s ? Vi(t.width) : t.width) / r, l = (s ? Vi(t.height) : t.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const ew = /* @__PURE__ */ it(0);
function gd(n) {
  const e = Ee(n);
  return !ma() || !e.visualViewport ? ew : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function tw(n, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== Ee(n) ? !1 : e;
}
function _r(n, e, t, r) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const i = n.getBoundingClientRect(), s = md(n);
  let o = it(1);
  e && (r ? Ue(r) && (o = zn(r)) : o = zn(n));
  const l = tw(s, t, r) ? gd(s) : it(0);
  let a = (i.left + l.x) / o.x, c = (i.top + l.y) / o.y, u = i.width / o.x, h = i.height / o.y;
  if (s) {
    const d = Ee(s), f = r && Ue(r) ? Ee(r) : r;
    let p = d, m = Wo(p);
    for (; m && r && f !== p; ) {
      const x = zn(m), k = m.getBoundingClientRect(), T = Ge(m), C = k.left + (m.clientLeft + parseFloat(T.paddingLeft)) * x.x, E = k.top + (m.clientTop + parseFloat(T.paddingTop)) * x.y;
      a *= x.x, c *= x.y, u *= x.x, h *= x.y, a += C, c += E, p = Ee(m), m = Wo(p);
    }
  }
  return $i({
    width: u,
    height: h,
    x: a,
    y: c
  });
}
function gs(n, e) {
  const t = ms(n).scrollLeft;
  return e ? e.left + t : _r(Mt(n)).left + t;
}
function yd(n, e) {
  const t = n.getBoundingClientRect(), r = t.left + e.scrollLeft - gs(n, t), i = t.top + e.scrollTop;
  return {
    x: r,
    y: i
  };
}
function nw(n) {
  let {
    elements: e,
    rect: t,
    offsetParent: r,
    strategy: i
  } = n;
  const s = i === "fixed", o = Mt(r), l = e ? ps(e.floating) : !1;
  if (r === o || l && s)
    return t;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = it(1);
  const u = it(0), h = at(r);
  if ((h || !h && !s) && ((Qn(r) !== "body" || Yr(o)) && (a = ms(r)), at(r))) {
    const f = _r(r);
    c = zn(r), u.x = f.x + r.clientLeft, u.y = f.y + r.clientTop;
  }
  const d = o && !h && !s ? yd(o, a) : it(0);
  return {
    width: t.width * c.x,
    height: t.height * c.y,
    x: t.x * c.x - a.scrollLeft * c.x + u.x + d.x,
    y: t.y * c.y - a.scrollTop * c.y + u.y + d.y
  };
}
function rw(n) {
  return Array.from(n.getClientRects());
}
function iw(n) {
  const e = Mt(n), t = ms(n), r = n.ownerDocument.body, i = Bn(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), s = Bn(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -t.scrollLeft + gs(n);
  const l = -t.scrollTop;
  return Ge(r).direction === "rtl" && (o += Bn(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: s,
    x: o,
    y: l
  };
}
const cu = 25;
function sw(n, e) {
  const t = Ee(n), r = Mt(n), i = t.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const u = ma();
    (!u || u && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  const c = gs(r);
  if (c <= 0) {
    const u = r.ownerDocument, h = u.body, d = getComputedStyle(h), f = u.compatMode === "CSS1Compat" && parseFloat(d.marginLeft) + parseFloat(d.marginRight) || 0, p = Math.abs(r.clientWidth - h.clientWidth - f);
    p <= cu && (s -= p);
  } else c <= cu && (s += c);
  return {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
const ow = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function lw(n, e) {
  const t = _r(n, !0, e === "fixed"), r = t.top + n.clientTop, i = t.left + n.clientLeft, s = at(n) ? zn(n) : it(1), o = n.clientWidth * s.x, l = n.clientHeight * s.y, a = i * s.x, c = r * s.y;
  return {
    width: o,
    height: l,
    x: a,
    y: c
  };
}
function uu(n, e, t) {
  let r;
  if (e === "viewport")
    r = sw(n, t);
  else if (e === "document")
    r = iw(Mt(n));
  else if (Ue(e))
    r = lw(e, t);
  else {
    const i = gd(n);
    r = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return $i(r);
}
function kd(n, e) {
  const t = $t(n);
  return t === e || !Ue(t) || Hn(t) ? !1 : Ge(t).position === "fixed" || kd(t, e);
}
function aw(n, e) {
  const t = e.get(n);
  if (t)
    return t;
  let r = dd(n, []).filter((l) => Ue(l) && Qn(l) !== "body"), i = null;
  const s = Ge(n).position === "fixed";
  let o = s ? $t(n) : n;
  for (; Ue(o) && !Hn(o); ) {
    const l = Ge(o), a = pa(o);
    !a && l.position === "fixed" && (i = null), (s ? !a && !i : !a && l.position === "static" && !!i && ow.has(i.position) || Yr(o) && !a && kd(n, o)) ? r = r.filter((u) => u !== o) : i = l, o = $t(o);
  }
  return e.set(n, r), r;
}
function cw(n) {
  let {
    element: e,
    boundary: t,
    rootBoundary: r,
    strategy: i
  } = n;
  const o = [...t === "clippingAncestors" ? ps(e) ? [] : aw(e, this._c) : [].concat(t), r], l = o[0], a = o.reduce((c, u) => {
    const h = uu(e, u, i);
    return c.top = Bn(h.top, c.top), c.right = $o(h.right, c.right), c.bottom = $o(h.bottom, c.bottom), c.left = Bn(h.left, c.left), c;
  }, uu(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function uw(n) {
  const {
    width: e,
    height: t
  } = pd(n);
  return {
    width: e,
    height: t
  };
}
function hw(n, e, t) {
  const r = at(e), i = Mt(e), s = t === "fixed", o = _r(n, !0, s, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = it(0);
  function c() {
    a.x = gs(i);
  }
  if (r || !r && !s)
    if ((Qn(e) !== "body" || Yr(i)) && (l = ms(e)), r) {
      const f = _r(e, !0, s, e);
      a.x = f.x + e.clientLeft, a.y = f.y + e.clientTop;
    } else i && c();
  s && !r && i && c();
  const u = i && !r && !s ? yd(i, l) : it(0), h = o.left + l.scrollLeft - a.x - u.x, d = o.top + l.scrollTop - a.y - u.y;
  return {
    x: h,
    y: d,
    width: o.width,
    height: o.height
  };
}
function ro(n) {
  return Ge(n).position === "static";
}
function hu(n, e) {
  if (!at(n) || Ge(n).position === "fixed")
    return null;
  if (e)
    return e(n);
  let t = n.offsetParent;
  return Mt(n) === t && (t = t.ownerDocument.body), t;
}
function xd(n, e) {
  const t = Ee(n);
  if (ps(n))
    return t;
  if (!at(n)) {
    let i = $t(n);
    for (; i && !Hn(i); ) {
      if (Ue(i) && !ro(i))
        return i;
      i = $t(i);
    }
    return t;
  }
  let r = hu(n, e);
  for (; r && J0(r) && ro(r); )
    r = hu(r, e);
  return r && Hn(r) && ro(r) && !pa(r) ? t : r || X0(n) || t;
}
const fw = async function(n) {
  const e = this.getOffsetParent || xd, t = this.getDimensions, r = await t(n.floating);
  return {
    reference: hw(n.reference, await e(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function dw(n) {
  return Ge(n).direction === "rtl";
}
const pw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: nw,
  getDocumentElement: Mt,
  getClippingRect: cw,
  getOffsetParent: xd,
  getElementRects: fw,
  getClientRects: rw,
  getDimensions: uw,
  getScale: zn,
  isElement: Ue,
  isRTL: dw
}, fu = W0, du = j0, pu = _0, mu = (n, e, t) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: pw,
    ...t
  }, s = {
    ...i.platform,
    _c: r
  };
  return V0(n, e, {
    ...i,
    platform: s
  });
};
class mw {
  constructor(e) {
    this.#s = !1, this.onShow = () => {
    }, this.onHide = () => {
    }, this.#u = (t, r) => {
      const { state: i, composing: s } = t, { selection: o, doc: l } = i, { ranges: a } = o, c = Math.min(...a.map((f) => f.$from.pos)), u = Math.max(...a.map((f) => f.$to.pos)), h = r && r.doc.eq(l) && r.selection.eq(o);
      if (this.#s || ((this.#l ?? t.dom.parentElement ?? document.body).appendChild(this.element), this.#s = !0), s || h) return;
      if (!this.#e(t, r)) {
        this.hide();
        return;
      }
      mu({
        getBoundingClientRect: () => ix(t, c, u)
      }, this.element, {
        placement: this.#n.placement ?? "top",
        middleware: [
          pu(),
          fu(this.#i),
          du(this.#o),
          ...this.#r
        ]
      }).then(({ x: f, y: p }) => {
        Object.assign(this.element.style, {
          left: `${f}px`,
          top: `${p}px`
        });
      }).catch(console.error), this.show();
    }, this.update = (t, r) => {
      this.#a(t, r);
    }, this.destroy = () => {
      this.#a.cancel();
    }, this.show = (t) => {
      this.element.dataset.show = "true", t && mu(t, this.element, {
        placement: "top",
        middleware: [
          pu(),
          fu(this.#i),
          du(this.#o),
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
    }, this.element = e.content, this.#t = e.debounce ?? 200, this.#e = e.shouldShow ?? this.#c, this.#i = e.offset, this.#o = e.shift, this.#r = e.middleware ?? [], this.#n = e.floatingUIOptions ?? {}, this.#l = e.root, this.element.dataset.show = "false", this.#a = Ub(this.#u, this.#t);
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
  #s;
  /// @internal
  #i;
  /// @internal
  #o;
  /// @internal
  #a;
  #u;
  /// @internal
  #c(e) {
    const { doc: t, selection: r } = e.state, { empty: i, from: s, to: o } = r, l = !t.textBetween(s, o).length && e.state.selection instanceof H, a = this.element.contains(document.activeElement), c = !e.hasFocus() && !a, u = !e.editable;
    return !(c || i || l || u);
  }
}
function gw(n) {
  const e = ct(
    {},
    `${n}_TOOLTIP_SPEC`
  ), t = qt((i) => {
    const s = i.get(e.key);
    return new De({
      key: new ve(`${n}_TOOLTIP`),
      ...s
    });
  }), r = [e, t];
  return r.key = e.key, r.pluginKey = t.key, e.meta = {
    package: "@milkdown/plugin-tooltip",
    displayName: `Ctx<tooltipSpec>|${n}`
  }, t.meta = {
    package: "@milkdown/plugin-tooltip",
    displayName: `Prose<tooltip>|${n}`
  }, r;
}
function jo(n) {
  if (!n) return !1;
  if (Array.isArray(n))
    return n.length > 1 ? !1 : jo(n[0]);
  const e = n.content;
  return e ? jo(e) : n.type === "text";
}
const bd = qt((n) => {
  const e = n.get(Je);
  n.update(Er, (i) => ({
    ...i,
    editable: i.editable ?? (() => !0)
  }));
  const t = new ve("MILKDOWN_CLIPBOARD");
  return new De({
    key: t,
    props: {
      handlePaste: (i, s) => {
        const o = n.get(Pn), l = i.props.editable?.(i.state), { clipboardData: a } = s;
        if (!l || !a || i.state.selection.$from.node().type.spec.code) return !1;
        const u = a.getData("text/plain"), h = a.getData("vscode-editor-data");
        if (h) {
          const T = JSON.parse(h)?.mode;
          if (u && T) {
            const { tr: C } = i.state, E = lx("code_block", e);
            return C.replaceSelectionWith(E.create({ language: T })).setSelection(
              H.near(
                C.doc.resolve(Math.max(0, C.selection.from - 2))
              )
            ).insertText(u.replace(/\r\n?/g, `
`)), i.dispatch(C), !0;
          }
        }
        const d = a.getData("text/html");
        if (d.length === 0 && u.length === 0) return !1;
        const f = fn.fromSchema(e);
        let p;
        if (d.length === 0) {
          const k = o(u);
          if (!k || typeof k == "string") return !1;
          p = kn.fromSchema(e).serializeFragment(
            k.content
          );
        } else {
          const k = document.createElement("template");
          k.innerHTML = d, p = k.content.cloneNode(!0), k.remove();
        }
        const m = f.parseSlice(p), x = ox(m);
        return x ? (i.dispatch(i.state.tr.replaceSelectionWith(x, !0)), !0) : (i.dispatch(i.state.tr.replaceSelection(m)), !0);
      },
      clipboardTextSerializer: (i) => {
        const s = n.get(an);
        if (jo(i.content.toJSON()))
          return i.content.textBetween(
            0,
            i.content.size,
            `

`
          );
        const l = e.topNodeType.createAndFill(void 0, i.content);
        return l ? s(l) : "";
      }
    }
  });
});
bd.meta = {
  displayName: "Prose<clipboard>",
  package: "@milkdown/plugin-clipboard"
};
const yw = (n, e) => {
  const t = document.createElement("button");
  t.textContent = n, t.style.position = "relative";
  const r = document.createElement("div");
  r.style.position = "absolute", r.style.top = "100%", r.style.left = "0", r.style.padding = "8px", r.style.background = "white", r.style.border = "1px solid #ccc", r.style.borderRadius = "4px", r.style.display = "none", r.style.zIndex = "1000", r.style.display = "flex", r.style.gap = "4px";
  const i = document.createElement("input");
  i.type = "text", i.placeholder = "Enter URL", i.style.flex = "1";
  const s = document.createElement("button");
  return s.textContent = "Save", r.appendChild(i), r.appendChild(s), t.appendChild(r), t.onclick = () => {
    r.style.display = "flex", i.focus();
  }, s.onclick = (o) => {
    o.stopPropagation();
    const l = i.value.trim();
    if (l) {
      try {
        e.get(J).call(Pl.key, { href: l });
      } catch (a) {
        console.error(a);
      }
      r.style.display = "none", i.value = "";
    }
  }, document.addEventListener("click", (o) => {
    t.contains(o.target) || (r.style.display = "none");
  }), t;
}, In = (n, e, t) => {
  const r = document.createElement("button");
  return r.textContent = n, r.onclick = () => {
    t.get(J).call(yt.key, e);
  }, r;
}, mr = (n, e, t) => {
  const r = document.createElement("button");
  return r.textContent = n, r.onclick = () => {
    try {
      t.get(J).call(e.key);
    } catch {
    }
  }, r;
}, kw = (n) => {
  const e = document.createElement("div"), t = document.createElement("button"), r = document.createElement("div");
  return e.classList.add("mayfly-dropdown"), t.classList.add("mayfly-dropdown-toggle"), t.textContent = "Text ▾", r.classList.add("mayfly-dropdown-content"), r.append(
    mr("Text", ls, n),
    //Text
    In("H1", 1, n),
    In("H2", 2, n),
    In("H3", 3, n),
    In("H4", 4, n),
    In("H5", 5, n),
    In("H6", 6, n)
  ), e.append(
    t,
    r
  ), e.querySelectorAll(".mayfly-dropdown-toggle").forEach((i) => {
    i.addEventListener("click", (s) => {
      s.stopPropagation(), console.log("Hello");
      const o = i.parentElement;
      o.classList.toggle("mayfly-active"), document.querySelectorAll(".mayfly-dropdown").forEach((l) => {
        l !== o && l.classList.remove("mayfly-active");
      });
    });
  }), document.addEventListener("click", (i) => {
    i.target.closest(".mayfly-dropdown") || document.querySelectorAll(".mayfly-dropdown").forEach((s) => s.classList.remove("mayfly-active"));
  }), e;
};
function xw(n, e) {
  const t = document.createElement("div");
  return t.classList.add("mayfly-toolbar"), t.append(
    kw(n),
    // Dropdown
    mr("B", is, n),
    //Bold
    mr("I", rs, n),
    //Italic
    mr("Bullet List", cs, n),
    //Bullet
    mr("Number List", us, n),
    //Number List
    yw("🔗", n)
  ), e.customButton.length != 0 && e.customButton.forEach((i) => {
    t.append(i);
  }), (i) => {
    const s = new mw({
      content: t,
      shouldShow: (a) => {
        const { from: c, to: u } = a.state.selection;
        return c !== u && e.editable == !0;
      }
    }), o = (a) => {
      t.contains(a.relatedTarget) || (t.style.display = "none");
    }, l = i.dom;
    return l.addEventListener("blur", o), {
      update: (a, c) => {
        const { from: u, to: h } = a.state.selection;
        u !== h && e.editable == !0 ? t.style.display = "flex" : t.style.display = "none", s.update(a, c);
      },
      destroy: () => {
        s.destroy(), t.remove(), l.removeEventListener("blur", o, !0);
      }
    };
  };
}
const Mw = (n, e) => {
  const t = document.createElement("button");
  return t.textContent = n, t.className = "milkdown-btn", t.onclick = () => {
    e();
  }, t;
};
class Nw {
  constructor() {
    this.editable = !0, this.created = !1, this.instance = null, this.documentUpdated = () => {
    }, this.textSelected = (e = "") => {
    }, this.customButton = [];
  }
  createEditor = (e) => {
    const t = gw("toolbar");
    wl.make().config((r) => {
      r.set(ns.key, {
        // Remap to one shortcut.
        Undo: "Mod-z",
        // Remap to multiple shortcuts.
        Redo: ["Mod-y", "Shift-Mod-z"]
      }), r.set(t.key, {
        view: xw(r, this)
      }), r.set(xi, document.getElementById(e)), r.update(Er, (i) => ({
        ...i,
        editable: () => this.editable
      })), r.get(zi).markdownUpdated(() => {
        this.documentUpdated();
      }), r.get(zi).selectionUpdated(
        (i, s, o) => {
          const l = i.get(qe), a = i.get(an), { from: c, to: u } = s;
          if (c !== u) {
            const h = l.state.doc.cut(c, u), d = a(h);
            this.textSelected(d);
          }
        }
      );
    }).use(wb).use(bd).use(I0).use(Ff).use(t).create().then((r) => {
      this.instance = r, this.created = !0;
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
    return e == null ? this.instance.action(Zc(e)) : this.instance.action(Zc());
  }
  replaceContent(e) {
    this.instance.action(bb(e));
  }
}
export {
  Nw as MdEditor,
  Mw as makeCustomButton
};
