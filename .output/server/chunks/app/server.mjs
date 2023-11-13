import { hasInjectionContext, getCurrentInstance, version, unref, inject, useSSRContext, defineComponent, createApp, effectScope, reactive, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, toRef, shallowRef, shallowReactive, isReadonly, defineAsyncComponent, isRef, isShallow, isReactive, toRaw, withCtx, nextTick, computed, ref, h, Suspense, Transition, mergeProps } from 'vue';
import Rt from 'node:http';
import Ka from 'node:https';
import nt from 'node:zlib';
import se, { PassThrough, pipeline } from 'node:stream';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promisify, deprecate, types } from 'node:util';
import { format } from 'node:url';
import { isIP } from 'node:net';
import { statSync, promises, createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { f as useRuntimeConfig$1, i as createError$1, m as sanitizeStatusCode, n as createHooks } from '../nitro/node-server.mjs';
import { getActiveHead } from 'unhead';
import { createMemoryHistory, createRouter, START_LOCATION, useRoute as useRoute$1, RouterView } from 'vue-router';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import 'fs';
import 'path';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

var _a, _b;
var Za = Object.defineProperty;
var n = (i, o2) => Za(i, "name", { value: o2, configurable: true });
var Ko = (i, o2, a2) => {
  if (!o2.has(i))
    throw TypeError("Cannot " + a2);
};
var k = (i, o2, a2) => (Ko(i, o2, "read from private field"), a2 ? a2.call(i) : o2.get(i)), ae = (i, o2, a2) => {
  if (o2.has(i))
    throw TypeError("Cannot add the same private member more than once");
  o2 instanceof WeakSet ? o2.add(i) : o2.set(i, a2);
}, Y = (i, o2, a2, l2) => (Ko(i, o2, "write to private field"), l2 ? l2.call(i, a2) : o2.set(i, a2), a2);
var me, vt, ct, wr, xe, Et, At, Wt, G, Bt, Ue, Ne, kt;
function os(i) {
  if (!/^data:/i.test(i))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  i = i.replace(/\r?\n/g, "");
  const o2 = i.indexOf(",");
  if (o2 === -1 || o2 <= 4)
    throw new TypeError("malformed data: URI");
  const a2 = i.substring(5, o2).split(";");
  let l2 = "", u = false;
  const d2 = a2[0] || "text/plain";
  let p = d2;
  for (let I = 1; I < a2.length; I++)
    a2[I] === "base64" ? u = true : a2[I] && (p += `;${a2[I]}`, a2[I].indexOf("charset=") === 0 && (l2 = a2[I].substring(8)));
  !a2[0] && !l2.length && (p += ";charset=US-ASCII", l2 = "US-ASCII");
  const m = u ? "base64" : "ascii", C = unescape(i.substring(o2 + 1)), S = Buffer.from(C, m);
  return S.type = d2, S.typeFull = p, S.charset = l2, S;
}
n(os, "dataUriToBuffer");
var _n = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {};
function is(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
n(is, "getDefaultExportFromCjs");
var cr = { exports: {} }, Xo;
function as() {
  return Xo || (Xo = 1, function(i, o2) {
    (function(a2, l2) {
      l2(o2);
    })(_n, function(a2) {
      const l2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol : (e) => `Symbol(${e})`;
      function u() {
      }
      n(u, "noop");
      function d2() {
        if (typeof self < "u")
          return self;
        if (typeof _n < "u")
          return _n;
      }
      n(d2, "getGlobals");
      const p = d2();
      function m(e) {
        return typeof e == "object" && e !== null || typeof e == "function";
      }
      n(m, "typeIsObject");
      const C = u, S = Promise, I = Promise.prototype.then, re = Promise.resolve.bind(S), L = Promise.reject.bind(S);
      function E(e) {
        return new S(e);
      }
      n(E, "newPromise");
      function b(e) {
        return re(e);
      }
      n(b, "promiseResolvedWith");
      function g2(e) {
        return L(e);
      }
      n(g2, "promiseRejectedWith");
      function A2(e, t2, r) {
        return I.call(e, t2, r);
      }
      n(A2, "PerformPromiseThen");
      function q(e, t2, r) {
        A2(A2(e, t2, r), void 0, C);
      }
      n(q, "uponPromise");
      function ne(e, t2) {
        q(e, t2);
      }
      n(ne, "uponFulfillment");
      function dt(e, t2) {
        q(e, void 0, t2);
      }
      n(dt, "uponRejection");
      function O(e, t2, r) {
        return A2(e, t2, r);
      }
      n(O, "transformPromiseWith");
      function $(e) {
        A2(e, void 0, C);
      }
      n($, "setPromiseIsHandledToTrue");
      const F = (() => {
        const e = p && p.queueMicrotask;
        if (typeof e == "function")
          return e;
        const t2 = b(void 0);
        return (r) => A2(t2, r);
      })();
      function ve(e, t2, r) {
        if (typeof e != "function")
          throw new TypeError("Argument is not a function");
        return Function.prototype.apply.call(e, t2, r);
      }
      n(ve, "reflectCall");
      function ue(e, t2, r) {
        try {
          return b(ve(e, t2, r));
        } catch (s2) {
          return g2(s2);
        }
      }
      n(ue, "promiseCall");
      const jn = 16384, rn = class rn {
        constructor() {
          this._cursor = 0, this._size = 0, this._front = { _elements: [], _next: void 0 }, this._back = this._front, this._cursor = 0, this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(t2) {
          const r = this._back;
          let s2 = r;
          r._elements.length === jn - 1 && (s2 = { _elements: [], _next: void 0 }), r._elements.push(t2), s2 !== r && (this._back = s2, r._next = s2), ++this._size;
        }
        shift() {
          const t2 = this._front;
          let r = t2;
          const s2 = this._cursor;
          let f2 = s2 + 1;
          const c = t2._elements, h2 = c[s2];
          return f2 === jn && (r = t2._next, f2 = 0), --this._size, this._cursor = f2, t2 !== r && (this._front = r), c[s2] = void 0, h2;
        }
        forEach(t2) {
          let r = this._cursor, s2 = this._front, f2 = s2._elements;
          for (; (r !== f2.length || s2._next !== void 0) && !(r === f2.length && (s2 = s2._next, f2 = s2._elements, r = 0, f2.length === 0)); )
            t2(f2[r]), ++r;
        }
        peek() {
          const t2 = this._front, r = this._cursor;
          return t2._elements[r];
        }
      };
      n(rn, "SimpleQueue");
      let x = rn;
      function Fn(e, t2) {
        e._ownerReadableStream = t2, t2._reader = e, t2._state === "readable" ? vr(e) : t2._state === "closed" ? Pi(e) : In(e, t2._storedError);
      }
      n(Fn, "ReadableStreamReaderGenericInitialize");
      function Pr(e, t2) {
        const r = e._ownerReadableStream;
        return J(r, t2);
      }
      n(Pr, "ReadableStreamReaderGenericCancel");
      function fe(e) {
        e._ownerReadableStream._state === "readable" ? Er(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : vi(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), e._ownerReadableStream._reader = void 0, e._ownerReadableStream = void 0;
      }
      n(fe, "ReadableStreamReaderGenericRelease");
      function He(e) {
        return new TypeError("Cannot " + e + " a stream using a released reader");
      }
      n(He, "readerLockException");
      function vr(e) {
        e._closedPromise = E((t2, r) => {
          e._closedPromise_resolve = t2, e._closedPromise_reject = r;
        });
      }
      n(vr, "defaultReaderClosedPromiseInitialize");
      function In(e, t2) {
        vr(e), Er(e, t2);
      }
      n(In, "defaultReaderClosedPromiseInitializeAsRejected");
      function Pi(e) {
        vr(e), Ln(e);
      }
      n(Pi, "defaultReaderClosedPromiseInitializeAsResolved");
      function Er(e, t2) {
        e._closedPromise_reject !== void 0 && ($(e._closedPromise), e._closedPromise_reject(t2), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
      }
      n(Er, "defaultReaderClosedPromiseReject");
      function vi(e, t2) {
        In(e, t2);
      }
      n(vi, "defaultReaderClosedPromiseResetToRejected");
      function Ln(e) {
        e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
      }
      n(Ln, "defaultReaderClosedPromiseResolve");
      const $n = l2("[[AbortSteps]]"), Dn = l2("[[ErrorSteps]]"), Ar = l2("[[CancelSteps]]"), Wr = l2("[[PullSteps]]"), Mn = Number.isFinite || function(e) {
        return typeof e == "number" && isFinite(e);
      }, Ei = Math.trunc || function(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
      };
      function Ai(e) {
        return typeof e == "object" || typeof e == "function";
      }
      n(Ai, "isDictionary");
      function ce(e, t2) {
        if (e !== void 0 && !Ai(e))
          throw new TypeError(`${t2} is not an object.`);
      }
      n(ce, "assertDictionary");
      function Z(e, t2) {
        if (typeof e != "function")
          throw new TypeError(`${t2} is not a function.`);
      }
      n(Z, "assertFunction");
      function Wi(e) {
        return typeof e == "object" && e !== null || typeof e == "function";
      }
      n(Wi, "isObject");
      function Un(e, t2) {
        if (!Wi(e))
          throw new TypeError(`${t2} is not an object.`);
      }
      n(Un, "assertObject");
      function de(e, t2, r) {
        if (e === void 0)
          throw new TypeError(`Parameter ${t2} is required in '${r}'.`);
      }
      n(de, "assertRequiredArgument");
      function Br(e, t2, r) {
        if (e === void 0)
          throw new TypeError(`${t2} is required in '${r}'.`);
      }
      n(Br, "assertRequiredField");
      function kr(e) {
        return Number(e);
      }
      n(kr, "convertUnrestrictedDouble");
      function Nn(e) {
        return e === 0 ? 0 : e;
      }
      n(Nn, "censorNegativeZero");
      function Bi(e) {
        return Nn(Ei(e));
      }
      n(Bi, "integerPart");
      function xn(e, t2) {
        const s2 = Number.MAX_SAFE_INTEGER;
        let f2 = Number(e);
        if (f2 = Nn(f2), !Mn(f2))
          throw new TypeError(`${t2} is not a finite number`);
        if (f2 = Bi(f2), f2 < 0 || f2 > s2)
          throw new TypeError(`${t2} is outside the accepted range of 0 to ${s2}, inclusive`);
        return !Mn(f2) || f2 === 0 ? 0 : f2;
      }
      n(xn, "convertUnsignedLongLongWithEnforceRange");
      function Or(e, t2) {
        if (!Te(e))
          throw new TypeError(`${t2} is not a ReadableStream.`);
      }
      n(Or, "assertReadableStream");
      function Ve(e) {
        return new Ee(e);
      }
      n(Ve, "AcquireReadableStreamDefaultReader");
      function Hn(e, t2) {
        e._reader._readRequests.push(t2);
      }
      n(Hn, "ReadableStreamAddReadRequest");
      function qr(e, t2, r) {
        const f2 = e._reader._readRequests.shift();
        r ? f2._closeSteps() : f2._chunkSteps(t2);
      }
      n(qr, "ReadableStreamFulfillReadRequest");
      function Ot(e) {
        return e._reader._readRequests.length;
      }
      n(Ot, "ReadableStreamGetNumReadRequests");
      function Vn(e) {
        const t2 = e._reader;
        return !(t2 === void 0 || !ye(t2));
      }
      n(Vn, "ReadableStreamHasDefaultReader");
      const nn = class nn {
        constructor(t2) {
          if (de(t2, 1, "ReadableStreamDefaultReader"), Or(t2, "First parameter"), Ce(t2))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          Fn(this, t2), this._readRequests = new x();
        }
        get closed() {
          return ye(this) ? this._closedPromise : g2(qt("closed"));
        }
        cancel(t2 = void 0) {
          return ye(this) ? this._ownerReadableStream === void 0 ? g2(He("cancel")) : Pr(this, t2) : g2(qt("cancel"));
        }
        read() {
          if (!ye(this))
            return g2(qt("read"));
          if (this._ownerReadableStream === void 0)
            return g2(He("read from"));
          let t2, r;
          const s2 = E((c, h2) => {
            t2 = c, r = h2;
          });
          return ht(this, { _chunkSteps: (c) => t2({ value: c, done: false }), _closeSteps: () => t2({ value: void 0, done: true }), _errorSteps: (c) => r(c) }), s2;
        }
        releaseLock() {
          if (!ye(this))
            throw qt("releaseLock");
          if (this._ownerReadableStream !== void 0) {
            if (this._readRequests.length > 0)
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            fe(this);
          }
        }
      };
      n(nn, "ReadableStreamDefaultReader");
      let Ee = nn;
      Object.defineProperties(Ee.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Ee.prototype, l2.toStringTag, { value: "ReadableStreamDefaultReader", configurable: true });
      function ye(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_readRequests") ? false : e instanceof Ee;
      }
      n(ye, "IsReadableStreamDefaultReader");
      function ht(e, t2) {
        const r = e._ownerReadableStream;
        r._disturbed = true, r._state === "closed" ? t2._closeSteps() : r._state === "errored" ? t2._errorSteps(r._storedError) : r._readableStreamController[Wr](t2);
      }
      n(ht, "ReadableStreamDefaultReaderRead");
      function qt(e) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
      }
      n(qt, "defaultReaderBrandCheckException");
      const Qn = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype), on = class on {
        constructor(t2, r) {
          this._ongoingPromise = void 0, this._isFinished = false, this._reader = t2, this._preventCancel = r;
        }
        next() {
          const t2 = n(() => this._nextSteps(), "nextSteps");
          return this._ongoingPromise = this._ongoingPromise ? O(this._ongoingPromise, t2, t2) : t2(), this._ongoingPromise;
        }
        return(t2) {
          const r = n(() => this._returnSteps(t2), "returnSteps");
          return this._ongoingPromise ? O(this._ongoingPromise, r, r) : r();
        }
        _nextSteps() {
          if (this._isFinished)
            return Promise.resolve({ value: void 0, done: true });
          const t2 = this._reader;
          if (t2._ownerReadableStream === void 0)
            return g2(He("iterate"));
          let r, s2;
          const f2 = E((h2, y) => {
            r = h2, s2 = y;
          });
          return ht(t2, { _chunkSteps: (h2) => {
            this._ongoingPromise = void 0, F(() => r({ value: h2, done: false }));
          }, _closeSteps: () => {
            this._ongoingPromise = void 0, this._isFinished = true, fe(t2), r({ value: void 0, done: true });
          }, _errorSteps: (h2) => {
            this._ongoingPromise = void 0, this._isFinished = true, fe(t2), s2(h2);
          } }), f2;
        }
        _returnSteps(t2) {
          if (this._isFinished)
            return Promise.resolve({ value: t2, done: true });
          this._isFinished = true;
          const r = this._reader;
          if (r._ownerReadableStream === void 0)
            return g2(He("finish iterating"));
          if (!this._preventCancel) {
            const s2 = Pr(r, t2);
            return fe(r), O(s2, () => ({ value: t2, done: true }));
          }
          return fe(r), b({ value: t2, done: true });
        }
      };
      n(on, "ReadableStreamAsyncIteratorImpl");
      let zt = on;
      const Yn = { next() {
        return Gn(this) ? this._asyncIteratorImpl.next() : g2(Zn("next"));
      }, return(e) {
        return Gn(this) ? this._asyncIteratorImpl.return(e) : g2(Zn("return"));
      } };
      Qn !== void 0 && Object.setPrototypeOf(Yn, Qn);
      function ki(e, t2) {
        const r = Ve(e), s2 = new zt(r, t2), f2 = Object.create(Yn);
        return f2._asyncIteratorImpl = s2, f2;
      }
      n(ki, "AcquireReadableStreamAsyncIterator");
      function Gn(e) {
        if (!m(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl"))
          return false;
        try {
          return e._asyncIteratorImpl instanceof zt;
        } catch {
          return false;
        }
      }
      n(Gn, "IsReadableStreamAsyncIterator");
      function Zn(e) {
        return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
      }
      n(Zn, "streamAsyncIteratorBrandCheckException");
      const Kn = Number.isNaN || function(e) {
        return e !== e;
      };
      function pt(e) {
        return e.slice();
      }
      n(pt, "CreateArrayFromList");
      function Jn(e, t2, r, s2, f2) {
        new Uint8Array(e).set(new Uint8Array(r, s2, f2), t2);
      }
      n(Jn, "CopyDataBlockBytes");
      function Ks(e) {
        return e;
      }
      n(Ks, "TransferArrayBuffer");
      function jt(e) {
        return false;
      }
      n(jt, "IsDetachedBuffer");
      function Xn(e, t2, r) {
        if (e.slice)
          return e.slice(t2, r);
        const s2 = r - t2, f2 = new ArrayBuffer(s2);
        return Jn(f2, 0, e, t2, s2), f2;
      }
      n(Xn, "ArrayBufferSlice");
      function Oi(e) {
        return !(typeof e != "number" || Kn(e) || e < 0);
      }
      n(Oi, "IsNonNegativeNumber");
      function eo(e) {
        const t2 = Xn(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
        return new Uint8Array(t2);
      }
      n(eo, "CloneAsUint8Array");
      function zr(e) {
        const t2 = e._queue.shift();
        return e._queueTotalSize -= t2.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t2.value;
      }
      n(zr, "DequeueValue");
      function jr(e, t2, r) {
        if (!Oi(r) || r === 1 / 0)
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        e._queue.push({ value: t2, size: r }), e._queueTotalSize += r;
      }
      n(jr, "EnqueueValueWithSize");
      function qi(e) {
        return e._queue.peek().value;
      }
      n(qi, "PeekQueueValue");
      function ge(e) {
        e._queue = new x(), e._queueTotalSize = 0;
      }
      n(ge, "ResetQueue");
      const an = class an {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!Fr(this))
            throw Dr("view");
          return this._view;
        }
        respond(t2) {
          if (!Fr(this))
            throw Dr("respond");
          if (de(t2, 1, "respond"), t2 = xn(t2, "First parameter"), this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          jt(this._view.buffer), Dt(this._associatedReadableByteStreamController, t2);
        }
        respondWithNewView(t2) {
          if (!Fr(this))
            throw Dr("respondWithNewView");
          if (de(t2, 1, "respondWithNewView"), !ArrayBuffer.isView(t2))
            throw new TypeError("You can only respond with array buffer views");
          if (this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          jt(t2.buffer), Mt(this._associatedReadableByteStreamController, t2);
        }
      };
      n(an, "ReadableStreamBYOBRequest");
      let Ae = an;
      Object.defineProperties(Ae.prototype, { respond: { enumerable: true }, respondWithNewView: { enumerable: true }, view: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Ae.prototype, l2.toStringTag, { value: "ReadableStreamBYOBRequest", configurable: true });
      const sn = class sn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!We(this))
            throw mt("byobRequest");
          return $r(this);
        }
        get desiredSize() {
          if (!We(this))
            throw mt("desiredSize");
          return lo(this);
        }
        close() {
          if (!We(this))
            throw mt("close");
          if (this._closeRequested)
            throw new TypeError("The stream has already been closed; do not close it again!");
          const t2 = this._controlledReadableByteStream._state;
          if (t2 !== "readable")
            throw new TypeError(`The stream (in ${t2} state) is not in the readable state and cannot be closed`);
          bt(this);
        }
        enqueue(t2) {
          if (!We(this))
            throw mt("enqueue");
          if (de(t2, 1, "enqueue"), !ArrayBuffer.isView(t2))
            throw new TypeError("chunk must be an array buffer view");
          if (t2.byteLength === 0)
            throw new TypeError("chunk must have non-zero byteLength");
          if (t2.buffer.byteLength === 0)
            throw new TypeError("chunk's buffer must have non-zero byteLength");
          if (this._closeRequested)
            throw new TypeError("stream is closed or draining");
          const r = this._controlledReadableByteStream._state;
          if (r !== "readable")
            throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);
          $t(this, t2);
        }
        error(t2 = void 0) {
          if (!We(this))
            throw mt("error");
          K(this, t2);
        }
        [Ar](t2) {
          to(this), ge(this);
          const r = this._cancelAlgorithm(t2);
          return Lt(this), r;
        }
        [Wr](t2) {
          const r = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const f2 = this._queue.shift();
            this._queueTotalSize -= f2.byteLength, io(this);
            const c = new Uint8Array(f2.buffer, f2.byteOffset, f2.byteLength);
            t2._chunkSteps(c);
            return;
          }
          const s2 = this._autoAllocateChunkSize;
          if (s2 !== void 0) {
            let f2;
            try {
              f2 = new ArrayBuffer(s2);
            } catch (h2) {
              t2._errorSteps(h2);
              return;
            }
            const c = { buffer: f2, bufferByteLength: s2, byteOffset: 0, byteLength: s2, bytesFilled: 0, elementSize: 1, viewConstructor: Uint8Array, readerType: "default" };
            this._pendingPullIntos.push(c);
          }
          Hn(r, t2), Be(this);
        }
      };
      n(sn, "ReadableByteStreamController");
      let _e = sn;
      Object.defineProperties(_e.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, byobRequest: { enumerable: true }, desiredSize: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(_e.prototype, l2.toStringTag, { value: "ReadableByteStreamController", configurable: true });
      function We(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") ? false : e instanceof _e;
      }
      n(We, "IsReadableByteStreamController");
      function Fr(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") ? false : e instanceof Ae;
      }
      n(Fr, "IsReadableStreamBYOBRequest");
      function Be(e) {
        if (!Ii(e))
          return;
        if (e._pulling) {
          e._pullAgain = true;
          return;
        }
        e._pulling = true;
        const r = e._pullAlgorithm();
        q(r, () => {
          e._pulling = false, e._pullAgain && (e._pullAgain = false, Be(e));
        }, (s2) => {
          K(e, s2);
        });
      }
      n(Be, "ReadableByteStreamControllerCallPullIfNeeded");
      function to(e) {
        Lr(e), e._pendingPullIntos = new x();
      }
      n(to, "ReadableByteStreamControllerClearPendingPullIntos");
      function Ir(e, t2) {
        let r = false;
        e._state === "closed" && (r = true);
        const s2 = ro(t2);
        t2.readerType === "default" ? qr(e, s2, r) : Di(e, s2, r);
      }
      n(Ir, "ReadableByteStreamControllerCommitPullIntoDescriptor");
      function ro(e) {
        const t2 = e.bytesFilled, r = e.elementSize;
        return new e.viewConstructor(e.buffer, e.byteOffset, t2 / r);
      }
      n(ro, "ReadableByteStreamControllerConvertPullIntoDescriptor");
      function Ft(e, t2, r, s2) {
        e._queue.push({ buffer: t2, byteOffset: r, byteLength: s2 }), e._queueTotalSize += s2;
      }
      n(Ft, "ReadableByteStreamControllerEnqueueChunkToQueue");
      function no(e, t2) {
        const r = t2.elementSize, s2 = t2.bytesFilled - t2.bytesFilled % r, f2 = Math.min(e._queueTotalSize, t2.byteLength - t2.bytesFilled), c = t2.bytesFilled + f2, h2 = c - c % r;
        let y = f2, w = false;
        h2 > s2 && (y = h2 - t2.bytesFilled, w = true);
        const T = e._queue;
        for (; y > 0; ) {
          const P = T.peek(), v = Math.min(y, P.byteLength), z = t2.byteOffset + t2.bytesFilled;
          Jn(t2.buffer, z, P.buffer, P.byteOffset, v), P.byteLength === v ? T.shift() : (P.byteOffset += v, P.byteLength -= v), e._queueTotalSize -= v, oo(e, v, t2), y -= v;
        }
        return w;
      }
      n(no, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
      function oo(e, t2, r) {
        r.bytesFilled += t2;
      }
      n(oo, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
      function io(e) {
        e._queueTotalSize === 0 && e._closeRequested ? (Lt(e), wt(e._controlledReadableByteStream)) : Be(e);
      }
      n(io, "ReadableByteStreamControllerHandleQueueDrain");
      function Lr(e) {
        e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
      }
      n(Lr, "ReadableByteStreamControllerInvalidateBYOBRequest");
      function ao(e) {
        for (; e._pendingPullIntos.length > 0; ) {
          if (e._queueTotalSize === 0)
            return;
          const t2 = e._pendingPullIntos.peek();
          no(e, t2) && (It(e), Ir(e._controlledReadableByteStream, t2));
        }
      }
      n(ao, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
      function zi(e, t2, r) {
        const s2 = e._controlledReadableByteStream;
        let f2 = 1;
        t2.constructor !== DataView && (f2 = t2.constructor.BYTES_PER_ELEMENT);
        const c = t2.constructor, h2 = t2.buffer, y = { buffer: h2, bufferByteLength: h2.byteLength, byteOffset: t2.byteOffset, byteLength: t2.byteLength, bytesFilled: 0, elementSize: f2, viewConstructor: c, readerType: "byob" };
        if (e._pendingPullIntos.length > 0) {
          e._pendingPullIntos.push(y), co(s2, r);
          return;
        }
        if (s2._state === "closed") {
          const w = new c(y.buffer, y.byteOffset, 0);
          r._closeSteps(w);
          return;
        }
        if (e._queueTotalSize > 0) {
          if (no(e, y)) {
            const w = ro(y);
            io(e), r._chunkSteps(w);
            return;
          }
          if (e._closeRequested) {
            const w = new TypeError("Insufficient bytes to fill elements in the given buffer");
            K(e, w), r._errorSteps(w);
            return;
          }
        }
        e._pendingPullIntos.push(y), co(s2, r), Be(e);
      }
      n(zi, "ReadableByteStreamControllerPullInto");
      function ji(e, t2) {
        const r = e._controlledReadableByteStream;
        if (Mr(r))
          for (; ho(r) > 0; ) {
            const s2 = It(e);
            Ir(r, s2);
          }
      }
      n(ji, "ReadableByteStreamControllerRespondInClosedState");
      function Fi(e, t2, r) {
        if (oo(e, t2, r), r.bytesFilled < r.elementSize)
          return;
        It(e);
        const s2 = r.bytesFilled % r.elementSize;
        if (s2 > 0) {
          const f2 = r.byteOffset + r.bytesFilled, c = Xn(r.buffer, f2 - s2, f2);
          Ft(e, c, 0, c.byteLength);
        }
        r.bytesFilled -= s2, Ir(e._controlledReadableByteStream, r), ao(e);
      }
      n(Fi, "ReadableByteStreamControllerRespondInReadableState");
      function so(e, t2) {
        const r = e._pendingPullIntos.peek();
        Lr(e), e._controlledReadableByteStream._state === "closed" ? ji(e) : Fi(e, t2, r), Be(e);
      }
      n(so, "ReadableByteStreamControllerRespondInternal");
      function It(e) {
        return e._pendingPullIntos.shift();
      }
      n(It, "ReadableByteStreamControllerShiftPendingPullInto");
      function Ii(e) {
        const t2 = e._controlledReadableByteStream;
        return t2._state !== "readable" || e._closeRequested || !e._started ? false : !!(Vn(t2) && Ot(t2) > 0 || Mr(t2) && ho(t2) > 0 || lo(e) > 0);
      }
      n(Ii, "ReadableByteStreamControllerShouldCallPull");
      function Lt(e) {
        e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
      }
      n(Lt, "ReadableByteStreamControllerClearAlgorithms");
      function bt(e) {
        const t2 = e._controlledReadableByteStream;
        if (!(e._closeRequested || t2._state !== "readable")) {
          if (e._queueTotalSize > 0) {
            e._closeRequested = true;
            return;
          }
          if (e._pendingPullIntos.length > 0 && e._pendingPullIntos.peek().bytesFilled > 0) {
            const s2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            throw K(e, s2), s2;
          }
          Lt(e), wt(t2);
        }
      }
      n(bt, "ReadableByteStreamControllerClose");
      function $t(e, t2) {
        const r = e._controlledReadableByteStream;
        if (e._closeRequested || r._state !== "readable")
          return;
        const s2 = t2.buffer, f2 = t2.byteOffset, c = t2.byteLength, h2 = s2;
        if (e._pendingPullIntos.length > 0) {
          const y = e._pendingPullIntos.peek();
          jt(y.buffer), y.buffer = y.buffer;
        }
        if (Lr(e), Vn(r))
          if (Ot(r) === 0)
            Ft(e, h2, f2, c);
          else {
            e._pendingPullIntos.length > 0 && It(e);
            const y = new Uint8Array(h2, f2, c);
            qr(r, y, false);
          }
        else
          Mr(r) ? (Ft(e, h2, f2, c), ao(e)) : Ft(e, h2, f2, c);
        Be(e);
      }
      n($t, "ReadableByteStreamControllerEnqueue");
      function K(e, t2) {
        const r = e._controlledReadableByteStream;
        r._state === "readable" && (to(e), ge(e), Lt(e), Io(r, t2));
      }
      n(K, "ReadableByteStreamControllerError");
      function $r(e) {
        if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
          const t2 = e._pendingPullIntos.peek(), r = new Uint8Array(t2.buffer, t2.byteOffset + t2.bytesFilled, t2.byteLength - t2.bytesFilled), s2 = Object.create(Ae.prototype);
          $i(s2, e, r), e._byobRequest = s2;
        }
        return e._byobRequest;
      }
      n($r, "ReadableByteStreamControllerGetBYOBRequest");
      function lo(e) {
        const t2 = e._controlledReadableByteStream._state;
        return t2 === "errored" ? null : t2 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
      }
      n(lo, "ReadableByteStreamControllerGetDesiredSize");
      function Dt(e, t2) {
        const r = e._pendingPullIntos.peek();
        if (e._controlledReadableByteStream._state === "closed") {
          if (t2 !== 0)
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        } else {
          if (t2 === 0)
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          if (r.bytesFilled + t2 > r.byteLength)
            throw new RangeError("bytesWritten out of range");
        }
        r.buffer = r.buffer, so(e, t2);
      }
      n(Dt, "ReadableByteStreamControllerRespond");
      function Mt(e, t2) {
        const r = e._pendingPullIntos.peek();
        if (e._controlledReadableByteStream._state === "closed") {
          if (t2.byteLength !== 0)
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        } else if (t2.byteLength === 0)
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        if (r.byteOffset + r.bytesFilled !== t2.byteOffset)
          throw new RangeError("The region specified by view does not match byobRequest");
        if (r.bufferByteLength !== t2.buffer.byteLength)
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        if (r.bytesFilled + t2.byteLength > r.byteLength)
          throw new RangeError("The region specified by view is larger than byobRequest");
        const f2 = t2.byteLength;
        r.buffer = t2.buffer, so(e, f2);
      }
      n(Mt, "ReadableByteStreamControllerRespondWithNewView");
      function uo(e, t2, r, s2, f2, c, h2) {
        t2._controlledReadableByteStream = e, t2._pullAgain = false, t2._pulling = false, t2._byobRequest = null, t2._queue = t2._queueTotalSize = void 0, ge(t2), t2._closeRequested = false, t2._started = false, t2._strategyHWM = c, t2._pullAlgorithm = s2, t2._cancelAlgorithm = f2, t2._autoAllocateChunkSize = h2, t2._pendingPullIntos = new x(), e._readableStreamController = t2;
        const y = r();
        q(b(y), () => {
          t2._started = true, Be(t2);
        }, (w) => {
          K(t2, w);
        });
      }
      n(uo, "SetUpReadableByteStreamController");
      function Li(e, t2, r) {
        const s2 = Object.create(_e.prototype);
        let f2 = n(() => {
        }, "startAlgorithm"), c = n(() => b(void 0), "pullAlgorithm"), h2 = n(() => b(void 0), "cancelAlgorithm");
        t2.start !== void 0 && (f2 = n(() => t2.start(s2), "startAlgorithm")), t2.pull !== void 0 && (c = n(() => t2.pull(s2), "pullAlgorithm")), t2.cancel !== void 0 && (h2 = n((w) => t2.cancel(w), "cancelAlgorithm"));
        const y = t2.autoAllocateChunkSize;
        if (y === 0)
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        uo(e, s2, f2, c, h2, r, y);
      }
      n(Li, "SetUpReadableByteStreamControllerFromUnderlyingSource");
      function $i(e, t2, r) {
        e._associatedReadableByteStreamController = t2, e._view = r;
      }
      n($i, "SetUpReadableStreamBYOBRequest");
      function Dr(e) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
      }
      n(Dr, "byobRequestBrandCheckException");
      function mt(e) {
        return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
      }
      n(mt, "byteStreamControllerBrandCheckException");
      function fo(e) {
        return new ke(e);
      }
      n(fo, "AcquireReadableStreamBYOBReader");
      function co(e, t2) {
        e._reader._readIntoRequests.push(t2);
      }
      n(co, "ReadableStreamAddReadIntoRequest");
      function Di(e, t2, r) {
        const f2 = e._reader._readIntoRequests.shift();
        r ? f2._closeSteps(t2) : f2._chunkSteps(t2);
      }
      n(Di, "ReadableStreamFulfillReadIntoRequest");
      function ho(e) {
        return e._reader._readIntoRequests.length;
      }
      n(ho, "ReadableStreamGetNumReadIntoRequests");
      function Mr(e) {
        const t2 = e._reader;
        return !(t2 === void 0 || !Oe(t2));
      }
      n(Mr, "ReadableStreamHasBYOBReader");
      const ln = class ln {
        constructor(t2) {
          if (de(t2, 1, "ReadableStreamBYOBReader"), Or(t2, "First parameter"), Ce(t2))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          if (!We(t2._readableStreamController))
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          Fn(this, t2), this._readIntoRequests = new x();
        }
        get closed() {
          return Oe(this) ? this._closedPromise : g2(Ut("closed"));
        }
        cancel(t2 = void 0) {
          return Oe(this) ? this._ownerReadableStream === void 0 ? g2(He("cancel")) : Pr(this, t2) : g2(Ut("cancel"));
        }
        read(t2) {
          if (!Oe(this))
            return g2(Ut("read"));
          if (!ArrayBuffer.isView(t2))
            return g2(new TypeError("view must be an array buffer view"));
          if (t2.byteLength === 0)
            return g2(new TypeError("view must have non-zero byteLength"));
          if (t2.buffer.byteLength === 0)
            return g2(new TypeError("view's buffer must have non-zero byteLength"));
          if (jt(t2.buffer), this._ownerReadableStream === void 0)
            return g2(He("read from"));
          let r, s2;
          const f2 = E((h2, y) => {
            r = h2, s2 = y;
          });
          return po(this, t2, { _chunkSteps: (h2) => r({ value: h2, done: false }), _closeSteps: (h2) => r({ value: h2, done: true }), _errorSteps: (h2) => s2(h2) }), f2;
        }
        releaseLock() {
          if (!Oe(this))
            throw Ut("releaseLock");
          if (this._ownerReadableStream !== void 0) {
            if (this._readIntoRequests.length > 0)
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            fe(this);
          }
        }
      };
      n(ln, "ReadableStreamBYOBReader");
      let ke = ln;
      Object.defineProperties(ke.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(ke.prototype, l2.toStringTag, { value: "ReadableStreamBYOBReader", configurable: true });
      function Oe(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") ? false : e instanceof ke;
      }
      n(Oe, "IsReadableStreamBYOBReader");
      function po(e, t2, r) {
        const s2 = e._ownerReadableStream;
        s2._disturbed = true, s2._state === "errored" ? r._errorSteps(s2._storedError) : zi(s2._readableStreamController, t2, r);
      }
      n(po, "ReadableStreamBYOBReaderRead");
      function Ut(e) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
      }
      n(Ut, "byobReaderBrandCheckException");
      function yt(e, t2) {
        const { highWaterMark: r } = e;
        if (r === void 0)
          return t2;
        if (Kn(r) || r < 0)
          throw new RangeError("Invalid highWaterMark");
        return r;
      }
      n(yt, "ExtractHighWaterMark");
      function Nt(e) {
        const { size: t2 } = e;
        return t2 || (() => 1);
      }
      n(Nt, "ExtractSizeAlgorithm");
      function xt(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.highWaterMark, s2 = e == null ? void 0 : e.size;
        return { highWaterMark: r === void 0 ? void 0 : kr(r), size: s2 === void 0 ? void 0 : Mi(s2, `${t2} has member 'size' that`) };
      }
      n(xt, "convertQueuingStrategy");
      function Mi(e, t2) {
        return Z(e, t2), (r) => kr(e(r));
      }
      n(Mi, "convertQueuingStrategySize");
      function Ui(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.abort, s2 = e == null ? void 0 : e.close, f2 = e == null ? void 0 : e.start, c = e == null ? void 0 : e.type, h2 = e == null ? void 0 : e.write;
        return { abort: r === void 0 ? void 0 : Ni(r, e, `${t2} has member 'abort' that`), close: s2 === void 0 ? void 0 : xi(s2, e, `${t2} has member 'close' that`), start: f2 === void 0 ? void 0 : Hi(f2, e, `${t2} has member 'start' that`), write: h2 === void 0 ? void 0 : Vi(h2, e, `${t2} has member 'write' that`), type: c };
      }
      n(Ui, "convertUnderlyingSink");
      function Ni(e, t2, r) {
        return Z(e, r), (s2) => ue(e, t2, [s2]);
      }
      n(Ni, "convertUnderlyingSinkAbortCallback");
      function xi(e, t2, r) {
        return Z(e, r), () => ue(e, t2, []);
      }
      n(xi, "convertUnderlyingSinkCloseCallback");
      function Hi(e, t2, r) {
        return Z(e, r), (s2) => ve(e, t2, [s2]);
      }
      n(Hi, "convertUnderlyingSinkStartCallback");
      function Vi(e, t2, r) {
        return Z(e, r), (s2, f2) => ue(e, t2, [s2, f2]);
      }
      n(Vi, "convertUnderlyingSinkWriteCallback");
      function bo(e, t2) {
        if (!Qe(e))
          throw new TypeError(`${t2} is not a WritableStream.`);
      }
      n(bo, "assertWritableStream");
      function Qi(e) {
        if (typeof e != "object" || e === null)
          return false;
        try {
          return typeof e.aborted == "boolean";
        } catch {
          return false;
        }
      }
      n(Qi, "isAbortSignal");
      const Yi = typeof AbortController == "function";
      function Gi() {
        if (Yi)
          return new AbortController();
      }
      n(Gi, "createAbortController");
      const un = class un {
        constructor(t2 = {}, r = {}) {
          t2 === void 0 ? t2 = null : Un(t2, "First parameter");
          const s2 = xt(r, "Second parameter"), f2 = Ui(t2, "First parameter");
          if (yo(this), f2.type !== void 0)
            throw new RangeError("Invalid type is specified");
          const h2 = Nt(s2), y = yt(s2, 1);
          ua(this, f2, y, h2);
        }
        get locked() {
          if (!Qe(this))
            throw Gt("locked");
          return Ye(this);
        }
        abort(t2 = void 0) {
          return Qe(this) ? Ye(this) ? g2(new TypeError("Cannot abort a stream that already has a writer")) : Ht(this, t2) : g2(Gt("abort"));
        }
        close() {
          return Qe(this) ? Ye(this) ? g2(new TypeError("Cannot close a stream that already has a writer")) : oe(this) ? g2(new TypeError("Cannot close an already-closing stream")) : go(this) : g2(Gt("close"));
        }
        getWriter() {
          if (!Qe(this))
            throw Gt("getWriter");
          return mo(this);
        }
      };
      n(un, "WritableStream");
      let qe = un;
      Object.defineProperties(qe.prototype, { abort: { enumerable: true }, close: { enumerable: true }, getWriter: { enumerable: true }, locked: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(qe.prototype, l2.toStringTag, { value: "WritableStream", configurable: true });
      function mo(e) {
        return new ze(e);
      }
      n(mo, "AcquireWritableStreamDefaultWriter");
      function Zi(e, t2, r, s2, f2 = 1, c = () => 1) {
        const h2 = Object.create(qe.prototype);
        yo(h2);
        const y = Object.create(Se.prototype);
        return Co(h2, y, e, t2, r, s2, f2, c), h2;
      }
      n(Zi, "CreateWritableStream");
      function yo(e) {
        e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new x(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = false;
      }
      n(yo, "InitializeWritableStream");
      function Qe(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_writableStreamController") ? false : e instanceof qe;
      }
      n(Qe, "IsWritableStream");
      function Ye(e) {
        return e._writer !== void 0;
      }
      n(Ye, "IsWritableStreamLocked");
      function Ht(e, t2) {
        var r;
        if (e._state === "closed" || e._state === "errored")
          return b(void 0);
        e._writableStreamController._abortReason = t2, (r = e._writableStreamController._abortController) === null || r === void 0 || r.abort();
        const s2 = e._state;
        if (s2 === "closed" || s2 === "errored")
          return b(void 0);
        if (e._pendingAbortRequest !== void 0)
          return e._pendingAbortRequest._promise;
        let f2 = false;
        s2 === "erroring" && (f2 = true, t2 = void 0);
        const c = E((h2, y) => {
          e._pendingAbortRequest = { _promise: void 0, _resolve: h2, _reject: y, _reason: t2, _wasAlreadyErroring: f2 };
        });
        return e._pendingAbortRequest._promise = c, f2 || Nr(e, t2), c;
      }
      n(Ht, "WritableStreamAbort");
      function go(e) {
        const t2 = e._state;
        if (t2 === "closed" || t2 === "errored")
          return g2(new TypeError(`The stream (in ${t2} state) is not in the writable state and cannot be closed`));
        const r = E((f2, c) => {
          const h2 = { _resolve: f2, _reject: c };
          e._closeRequest = h2;
        }), s2 = e._writer;
        return s2 !== void 0 && e._backpressure && t2 === "writable" && Jr(s2), fa(e._writableStreamController), r;
      }
      n(go, "WritableStreamClose");
      function Ki(e) {
        return E((r, s2) => {
          const f2 = { _resolve: r, _reject: s2 };
          e._writeRequests.push(f2);
        });
      }
      n(Ki, "WritableStreamAddWriteRequest");
      function Ur(e, t2) {
        if (e._state === "writable") {
          Nr(e, t2);
          return;
        }
        xr(e);
      }
      n(Ur, "WritableStreamDealWithRejection");
      function Nr(e, t2) {
        const r = e._writableStreamController;
        e._state = "erroring", e._storedError = t2;
        const s2 = e._writer;
        s2 !== void 0 && So(s2, t2), !ra(e) && r._started && xr(e);
      }
      n(Nr, "WritableStreamStartErroring");
      function xr(e) {
        e._state = "errored", e._writableStreamController[Dn]();
        const t2 = e._storedError;
        if (e._writeRequests.forEach((f2) => {
          f2._reject(t2);
        }), e._writeRequests = new x(), e._pendingAbortRequest === void 0) {
          Vt(e);
          return;
        }
        const r = e._pendingAbortRequest;
        if (e._pendingAbortRequest = void 0, r._wasAlreadyErroring) {
          r._reject(t2), Vt(e);
          return;
        }
        const s2 = e._writableStreamController[$n](r._reason);
        q(s2, () => {
          r._resolve(), Vt(e);
        }, (f2) => {
          r._reject(f2), Vt(e);
        });
      }
      n(xr, "WritableStreamFinishErroring");
      function Ji(e) {
        e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
      }
      n(Ji, "WritableStreamFinishInFlightWrite");
      function Xi(e, t2) {
        e._inFlightWriteRequest._reject(t2), e._inFlightWriteRequest = void 0, Ur(e, t2);
      }
      n(Xi, "WritableStreamFinishInFlightWriteWithError");
      function ea(e) {
        e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
        const r = e._writer;
        r !== void 0 && Ao(r);
      }
      n(ea, "WritableStreamFinishInFlightClose");
      function ta(e, t2) {
        e._inFlightCloseRequest._reject(t2), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t2), e._pendingAbortRequest = void 0), Ur(e, t2);
      }
      n(ta, "WritableStreamFinishInFlightCloseWithError");
      function oe(e) {
        return !(e._closeRequest === void 0 && e._inFlightCloseRequest === void 0);
      }
      n(oe, "WritableStreamCloseQueuedOrInFlight");
      function ra(e) {
        return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
      }
      n(ra, "WritableStreamHasOperationMarkedInFlight");
      function na(e) {
        e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
      }
      n(na, "WritableStreamMarkCloseRequestInFlight");
      function oa(e) {
        e._inFlightWriteRequest = e._writeRequests.shift();
      }
      n(oa, "WritableStreamMarkFirstWriteRequestInFlight");
      function Vt(e) {
        e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
        const t2 = e._writer;
        t2 !== void 0 && Zr(t2, e._storedError);
      }
      n(Vt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
      function Hr(e, t2) {
        const r = e._writer;
        r !== void 0 && t2 !== e._backpressure && (t2 ? ya(r) : Jr(r)), e._backpressure = t2;
      }
      n(Hr, "WritableStreamUpdateBackpressure");
      const fn = class fn {
        constructor(t2) {
          if (de(t2, 1, "WritableStreamDefaultWriter"), bo(t2, "First parameter"), Ye(t2))
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          this._ownerWritableStream = t2, t2._writer = this;
          const r = t2._state;
          if (r === "writable")
            !oe(t2) && t2._backpressure ? Kt(this) : Wo(this), Zt(this);
          else if (r === "erroring")
            Kr(this, t2._storedError), Zt(this);
          else if (r === "closed")
            Wo(this), ba(this);
          else {
            const s2 = t2._storedError;
            Kr(this, s2), Eo(this, s2);
          }
        }
        get closed() {
          return je(this) ? this._closedPromise : g2(Fe("closed"));
        }
        get desiredSize() {
          if (!je(this))
            throw Fe("desiredSize");
          if (this._ownerWritableStream === void 0)
            throw gt("desiredSize");
          return la(this);
        }
        get ready() {
          return je(this) ? this._readyPromise : g2(Fe("ready"));
        }
        abort(t2 = void 0) {
          return je(this) ? this._ownerWritableStream === void 0 ? g2(gt("abort")) : ia(this, t2) : g2(Fe("abort"));
        }
        close() {
          if (!je(this))
            return g2(Fe("close"));
          const t2 = this._ownerWritableStream;
          return t2 === void 0 ? g2(gt("close")) : oe(t2) ? g2(new TypeError("Cannot close an already-closing stream")) : _o(this);
        }
        releaseLock() {
          if (!je(this))
            throw Fe("releaseLock");
          this._ownerWritableStream !== void 0 && wo(this);
        }
        write(t2 = void 0) {
          return je(this) ? this._ownerWritableStream === void 0 ? g2(gt("write to")) : Ro(this, t2) : g2(Fe("write"));
        }
      };
      n(fn, "WritableStreamDefaultWriter");
      let ze = fn;
      Object.defineProperties(ze.prototype, { abort: { enumerable: true }, close: { enumerable: true }, releaseLock: { enumerable: true }, write: { enumerable: true }, closed: { enumerable: true }, desiredSize: { enumerable: true }, ready: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(ze.prototype, l2.toStringTag, { value: "WritableStreamDefaultWriter", configurable: true });
      function je(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") ? false : e instanceof ze;
      }
      n(je, "IsWritableStreamDefaultWriter");
      function ia(e, t2) {
        const r = e._ownerWritableStream;
        return Ht(r, t2);
      }
      n(ia, "WritableStreamDefaultWriterAbort");
      function _o(e) {
        const t2 = e._ownerWritableStream;
        return go(t2);
      }
      n(_o, "WritableStreamDefaultWriterClose");
      function aa(e) {
        const t2 = e._ownerWritableStream, r = t2._state;
        return oe(t2) || r === "closed" ? b(void 0) : r === "errored" ? g2(t2._storedError) : _o(e);
      }
      n(aa, "WritableStreamDefaultWriterCloseWithErrorPropagation");
      function sa(e, t2) {
        e._closedPromiseState === "pending" ? Zr(e, t2) : ma(e, t2);
      }
      n(sa, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
      function So(e, t2) {
        e._readyPromiseState === "pending" ? Bo(e, t2) : ga(e, t2);
      }
      n(So, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
      function la(e) {
        const t2 = e._ownerWritableStream, r = t2._state;
        return r === "errored" || r === "erroring" ? null : r === "closed" ? 0 : Po(t2._writableStreamController);
      }
      n(la, "WritableStreamDefaultWriterGetDesiredSize");
      function wo(e) {
        const t2 = e._ownerWritableStream, r = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
        So(e, r), sa(e, r), t2._writer = void 0, e._ownerWritableStream = void 0;
      }
      n(wo, "WritableStreamDefaultWriterRelease");
      function Ro(e, t2) {
        const r = e._ownerWritableStream, s2 = r._writableStreamController, f2 = ca(s2, t2);
        if (r !== e._ownerWritableStream)
          return g2(gt("write to"));
        const c = r._state;
        if (c === "errored")
          return g2(r._storedError);
        if (oe(r) || c === "closed")
          return g2(new TypeError("The stream is closing or closed and cannot be written to"));
        if (c === "erroring")
          return g2(r._storedError);
        const h2 = Ki(r);
        return da(s2, t2, f2), h2;
      }
      n(Ro, "WritableStreamDefaultWriterWrite");
      const To = {}, cn = class cn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!Vr(this))
            throw Gr("abortReason");
          return this._abortReason;
        }
        get signal() {
          if (!Vr(this))
            throw Gr("signal");
          if (this._abortController === void 0)
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          return this._abortController.signal;
        }
        error(t2 = void 0) {
          if (!Vr(this))
            throw Gr("error");
          this._controlledWritableStream._state === "writable" && vo(this, t2);
        }
        [$n](t2) {
          const r = this._abortAlgorithm(t2);
          return Qt(this), r;
        }
        [Dn]() {
          ge(this);
        }
      };
      n(cn, "WritableStreamDefaultController");
      let Se = cn;
      Object.defineProperties(Se.prototype, { abortReason: { enumerable: true }, signal: { enumerable: true }, error: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Se.prototype, l2.toStringTag, { value: "WritableStreamDefaultController", configurable: true });
      function Vr(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") ? false : e instanceof Se;
      }
      n(Vr, "IsWritableStreamDefaultController");
      function Co(e, t2, r, s2, f2, c, h2, y) {
        t2._controlledWritableStream = e, e._writableStreamController = t2, t2._queue = void 0, t2._queueTotalSize = void 0, ge(t2), t2._abortReason = void 0, t2._abortController = Gi(), t2._started = false, t2._strategySizeAlgorithm = y, t2._strategyHWM = h2, t2._writeAlgorithm = s2, t2._closeAlgorithm = f2, t2._abortAlgorithm = c;
        const w = Yr(t2);
        Hr(e, w);
        const T = r(), P = b(T);
        q(P, () => {
          t2._started = true, Yt(t2);
        }, (v) => {
          t2._started = true, Ur(e, v);
        });
      }
      n(Co, "SetUpWritableStreamDefaultController");
      function ua(e, t2, r, s2) {
        const f2 = Object.create(Se.prototype);
        let c = n(() => {
        }, "startAlgorithm"), h2 = n(() => b(void 0), "writeAlgorithm"), y = n(() => b(void 0), "closeAlgorithm"), w = n(() => b(void 0), "abortAlgorithm");
        t2.start !== void 0 && (c = n(() => t2.start(f2), "startAlgorithm")), t2.write !== void 0 && (h2 = n((T) => t2.write(T, f2), "writeAlgorithm")), t2.close !== void 0 && (y = n(() => t2.close(), "closeAlgorithm")), t2.abort !== void 0 && (w = n((T) => t2.abort(T), "abortAlgorithm")), Co(e, f2, c, h2, y, w, r, s2);
      }
      n(ua, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
      function Qt(e) {
        e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
      }
      n(Qt, "WritableStreamDefaultControllerClearAlgorithms");
      function fa(e) {
        jr(e, To, 0), Yt(e);
      }
      n(fa, "WritableStreamDefaultControllerClose");
      function ca(e, t2) {
        try {
          return e._strategySizeAlgorithm(t2);
        } catch (r) {
          return Qr(e, r), 1;
        }
      }
      n(ca, "WritableStreamDefaultControllerGetChunkSize");
      function Po(e) {
        return e._strategyHWM - e._queueTotalSize;
      }
      n(Po, "WritableStreamDefaultControllerGetDesiredSize");
      function da(e, t2, r) {
        try {
          jr(e, t2, r);
        } catch (f2) {
          Qr(e, f2);
          return;
        }
        const s2 = e._controlledWritableStream;
        if (!oe(s2) && s2._state === "writable") {
          const f2 = Yr(e);
          Hr(s2, f2);
        }
        Yt(e);
      }
      n(da, "WritableStreamDefaultControllerWrite");
      function Yt(e) {
        const t2 = e._controlledWritableStream;
        if (!e._started || t2._inFlightWriteRequest !== void 0)
          return;
        if (t2._state === "erroring") {
          xr(t2);
          return;
        }
        if (e._queue.length === 0)
          return;
        const s2 = qi(e);
        s2 === To ? ha(e) : pa(e, s2);
      }
      n(Yt, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
      function Qr(e, t2) {
        e._controlledWritableStream._state === "writable" && vo(e, t2);
      }
      n(Qr, "WritableStreamDefaultControllerErrorIfNeeded");
      function ha(e) {
        const t2 = e._controlledWritableStream;
        na(t2), zr(e);
        const r = e._closeAlgorithm();
        Qt(e), q(r, () => {
          ea(t2);
        }, (s2) => {
          ta(t2, s2);
        });
      }
      n(ha, "WritableStreamDefaultControllerProcessClose");
      function pa(e, t2) {
        const r = e._controlledWritableStream;
        oa(r);
        const s2 = e._writeAlgorithm(t2);
        q(s2, () => {
          Ji(r);
          const f2 = r._state;
          if (zr(e), !oe(r) && f2 === "writable") {
            const c = Yr(e);
            Hr(r, c);
          }
          Yt(e);
        }, (f2) => {
          r._state === "writable" && Qt(e), Xi(r, f2);
        });
      }
      n(pa, "WritableStreamDefaultControllerProcessWrite");
      function Yr(e) {
        return Po(e) <= 0;
      }
      n(Yr, "WritableStreamDefaultControllerGetBackpressure");
      function vo(e, t2) {
        const r = e._controlledWritableStream;
        Qt(e), Nr(r, t2);
      }
      n(vo, "WritableStreamDefaultControllerError");
      function Gt(e) {
        return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
      }
      n(Gt, "streamBrandCheckException$2");
      function Gr(e) {
        return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
      }
      n(Gr, "defaultControllerBrandCheckException$2");
      function Fe(e) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
      }
      n(Fe, "defaultWriterBrandCheckException");
      function gt(e) {
        return new TypeError("Cannot " + e + " a stream using a released writer");
      }
      n(gt, "defaultWriterLockException");
      function Zt(e) {
        e._closedPromise = E((t2, r) => {
          e._closedPromise_resolve = t2, e._closedPromise_reject = r, e._closedPromiseState = "pending";
        });
      }
      n(Zt, "defaultWriterClosedPromiseInitialize");
      function Eo(e, t2) {
        Zt(e), Zr(e, t2);
      }
      n(Eo, "defaultWriterClosedPromiseInitializeAsRejected");
      function ba(e) {
        Zt(e), Ao(e);
      }
      n(ba, "defaultWriterClosedPromiseInitializeAsResolved");
      function Zr(e, t2) {
        e._closedPromise_reject !== void 0 && ($(e._closedPromise), e._closedPromise_reject(t2), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
      }
      n(Zr, "defaultWriterClosedPromiseReject");
      function ma(e, t2) {
        Eo(e, t2);
      }
      n(ma, "defaultWriterClosedPromiseResetToRejected");
      function Ao(e) {
        e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
      }
      n(Ao, "defaultWriterClosedPromiseResolve");
      function Kt(e) {
        e._readyPromise = E((t2, r) => {
          e._readyPromise_resolve = t2, e._readyPromise_reject = r;
        }), e._readyPromiseState = "pending";
      }
      n(Kt, "defaultWriterReadyPromiseInitialize");
      function Kr(e, t2) {
        Kt(e), Bo(e, t2);
      }
      n(Kr, "defaultWriterReadyPromiseInitializeAsRejected");
      function Wo(e) {
        Kt(e), Jr(e);
      }
      n(Wo, "defaultWriterReadyPromiseInitializeAsResolved");
      function Bo(e, t2) {
        e._readyPromise_reject !== void 0 && ($(e._readyPromise), e._readyPromise_reject(t2), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
      }
      n(Bo, "defaultWriterReadyPromiseReject");
      function ya(e) {
        Kt(e);
      }
      n(ya, "defaultWriterReadyPromiseReset");
      function ga(e, t2) {
        Kr(e, t2);
      }
      n(ga, "defaultWriterReadyPromiseResetToRejected");
      function Jr(e) {
        e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
      }
      n(Jr, "defaultWriterReadyPromiseResolve");
      const ko = typeof DOMException < "u" ? DOMException : void 0;
      function _a2(e) {
        if (!(typeof e == "function" || typeof e == "object"))
          return false;
        try {
          return new e(), true;
        } catch {
          return false;
        }
      }
      n(_a2, "isDOMExceptionConstructor");
      function Sa() {
        const e = n(function(r, s2) {
          this.message = r || "", this.name = s2 || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
        }, "DOMException");
        return e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", { value: e, writable: true, configurable: true }), e;
      }
      n(Sa, "createDOMExceptionPolyfill");
      const wa = _a2(ko) ? ko : Sa();
      function Oo(e, t2, r, s2, f2, c) {
        const h2 = Ve(e), y = mo(t2);
        e._disturbed = true;
        let w = false, T = b(void 0);
        return E((P, v) => {
          let z;
          if (c !== void 0) {
            if (z = n(() => {
              const _ = new wa("Aborted", "AbortError"), R = [];
              s2 || R.push(() => t2._state === "writable" ? Ht(t2, _) : b(void 0)), f2 || R.push(() => e._state === "readable" ? J(e, _) : b(void 0)), U(() => Promise.all(R.map((W) => W())), true, _);
            }, "abortAlgorithm"), c.aborted) {
              z();
              return;
            }
            c.addEventListener("abort", z);
          }
          function X() {
            return E((_, R) => {
              function W(H) {
                H ? _() : A2(Xe(), W, R);
              }
              n(W, "next"), W(false);
            });
          }
          n(X, "pipeLoop");
          function Xe() {
            return w ? b(true) : A2(y._readyPromise, () => E((_, R) => {
              ht(h2, { _chunkSteps: (W) => {
                T = A2(Ro(y, W), void 0, u), _(false);
              }, _closeSteps: () => _(true), _errorSteps: R });
            }));
          }
          if (n(Xe, "pipeStep"), he(e, h2._closedPromise, (_) => {
            s2 ? Q(true, _) : U(() => Ht(t2, _), true, _);
          }), he(t2, y._closedPromise, (_) => {
            f2 ? Q(true, _) : U(() => J(e, _), true, _);
          }), M(e, h2._closedPromise, () => {
            r ? Q() : U(() => aa(y));
          }), oe(t2) || t2._state === "closed") {
            const _ = new TypeError("the destination writable stream closed before all data could be piped to it");
            f2 ? Q(true, _) : U(() => J(e, _), true, _);
          }
          $(X());
          function Pe() {
            const _ = T;
            return A2(T, () => _ !== T ? Pe() : void 0);
          }
          n(Pe, "waitForWritesToFinish");
          function he(_, R, W) {
            _._state === "errored" ? W(_._storedError) : dt(R, W);
          }
          n(he, "isOrBecomesErrored");
          function M(_, R, W) {
            _._state === "closed" ? W() : ne(R, W);
          }
          n(M, "isOrBecomesClosed");
          function U(_, R, W) {
            if (w)
              return;
            w = true, t2._state === "writable" && !oe(t2) ? ne(Pe(), H) : H();
            function H() {
              q(_(), () => pe(R, W), (et) => pe(true, et));
            }
            n(H, "doTheRest");
          }
          n(U, "shutdownWithAction");
          function Q(_, R) {
            w || (w = true, t2._state === "writable" && !oe(t2) ? ne(Pe(), () => pe(_, R)) : pe(_, R));
          }
          n(Q, "shutdown");
          function pe(_, R) {
            wo(y), fe(h2), c !== void 0 && c.removeEventListener("abort", z), _ ? v(R) : P(void 0);
          }
          n(pe, "finalize");
        });
      }
      n(Oo, "ReadableStreamPipeTo");
      const dn = class dn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!Jt(this))
            throw tr("desiredSize");
          return Xr(this);
        }
        close() {
          if (!Jt(this))
            throw tr("close");
          if (!Ge(this))
            throw new TypeError("The stream is not in a state that permits close");
          St(this);
        }
        enqueue(t2 = void 0) {
          if (!Jt(this))
            throw tr("enqueue");
          if (!Ge(this))
            throw new TypeError("The stream is not in a state that permits enqueue");
          return er(this, t2);
        }
        error(t2 = void 0) {
          if (!Jt(this))
            throw tr("error");
          Re(this, t2);
        }
        [Ar](t2) {
          ge(this);
          const r = this._cancelAlgorithm(t2);
          return Xt(this), r;
        }
        [Wr](t2) {
          const r = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const s2 = zr(this);
            this._closeRequested && this._queue.length === 0 ? (Xt(this), wt(r)) : _t(this), t2._chunkSteps(s2);
          } else
            Hn(r, t2), _t(this);
        }
      };
      n(dn, "ReadableStreamDefaultController");
      let we = dn;
      Object.defineProperties(we.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, desiredSize: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(we.prototype, l2.toStringTag, { value: "ReadableStreamDefaultController", configurable: true });
      function Jt(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") ? false : e instanceof we;
      }
      n(Jt, "IsReadableStreamDefaultController");
      function _t(e) {
        if (!qo(e))
          return;
        if (e._pulling) {
          e._pullAgain = true;
          return;
        }
        e._pulling = true;
        const r = e._pullAlgorithm();
        q(r, () => {
          e._pulling = false, e._pullAgain && (e._pullAgain = false, _t(e));
        }, (s2) => {
          Re(e, s2);
        });
      }
      n(_t, "ReadableStreamDefaultControllerCallPullIfNeeded");
      function qo(e) {
        const t2 = e._controlledReadableStream;
        return !Ge(e) || !e._started ? false : !!(Ce(t2) && Ot(t2) > 0 || Xr(e) > 0);
      }
      n(qo, "ReadableStreamDefaultControllerShouldCallPull");
      function Xt(e) {
        e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
      }
      n(Xt, "ReadableStreamDefaultControllerClearAlgorithms");
      function St(e) {
        if (!Ge(e))
          return;
        const t2 = e._controlledReadableStream;
        e._closeRequested = true, e._queue.length === 0 && (Xt(e), wt(t2));
      }
      n(St, "ReadableStreamDefaultControllerClose");
      function er(e, t2) {
        if (!Ge(e))
          return;
        const r = e._controlledReadableStream;
        if (Ce(r) && Ot(r) > 0)
          qr(r, t2, false);
        else {
          let s2;
          try {
            s2 = e._strategySizeAlgorithm(t2);
          } catch (f2) {
            throw Re(e, f2), f2;
          }
          try {
            jr(e, t2, s2);
          } catch (f2) {
            throw Re(e, f2), f2;
          }
        }
        _t(e);
      }
      n(er, "ReadableStreamDefaultControllerEnqueue");
      function Re(e, t2) {
        const r = e._controlledReadableStream;
        r._state === "readable" && (ge(e), Xt(e), Io(r, t2));
      }
      n(Re, "ReadableStreamDefaultControllerError");
      function Xr(e) {
        const t2 = e._controlledReadableStream._state;
        return t2 === "errored" ? null : t2 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
      }
      n(Xr, "ReadableStreamDefaultControllerGetDesiredSize");
      function Ra(e) {
        return !qo(e);
      }
      n(Ra, "ReadableStreamDefaultControllerHasBackpressure");
      function Ge(e) {
        const t2 = e._controlledReadableStream._state;
        return !e._closeRequested && t2 === "readable";
      }
      n(Ge, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
      function zo(e, t2, r, s2, f2, c, h2) {
        t2._controlledReadableStream = e, t2._queue = void 0, t2._queueTotalSize = void 0, ge(t2), t2._started = false, t2._closeRequested = false, t2._pullAgain = false, t2._pulling = false, t2._strategySizeAlgorithm = h2, t2._strategyHWM = c, t2._pullAlgorithm = s2, t2._cancelAlgorithm = f2, e._readableStreamController = t2;
        const y = r();
        q(b(y), () => {
          t2._started = true, _t(t2);
        }, (w) => {
          Re(t2, w);
        });
      }
      n(zo, "SetUpReadableStreamDefaultController");
      function Ta(e, t2, r, s2) {
        const f2 = Object.create(we.prototype);
        let c = n(() => {
        }, "startAlgorithm"), h2 = n(() => b(void 0), "pullAlgorithm"), y = n(() => b(void 0), "cancelAlgorithm");
        t2.start !== void 0 && (c = n(() => t2.start(f2), "startAlgorithm")), t2.pull !== void 0 && (h2 = n(() => t2.pull(f2), "pullAlgorithm")), t2.cancel !== void 0 && (y = n((w) => t2.cancel(w), "cancelAlgorithm")), zo(e, f2, c, h2, y, r, s2);
      }
      n(Ta, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
      function tr(e) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
      }
      n(tr, "defaultControllerBrandCheckException$1");
      function Ca(e, t2) {
        return We(e._readableStreamController) ? va(e) : Pa(e);
      }
      n(Ca, "ReadableStreamTee");
      function Pa(e, t2) {
        const r = Ve(e);
        let s2 = false, f2 = false, c = false, h2 = false, y, w, T, P, v;
        const z = E((M) => {
          v = M;
        });
        function X() {
          return s2 ? (f2 = true, b(void 0)) : (s2 = true, ht(r, { _chunkSteps: (U) => {
            F(() => {
              f2 = false;
              const Q = U, pe = U;
              c || er(T._readableStreamController, Q), h2 || er(P._readableStreamController, pe), s2 = false, f2 && X();
            });
          }, _closeSteps: () => {
            s2 = false, c || St(T._readableStreamController), h2 || St(P._readableStreamController), (!c || !h2) && v(void 0);
          }, _errorSteps: () => {
            s2 = false;
          } }), b(void 0));
        }
        n(X, "pullAlgorithm");
        function Xe(M) {
          if (c = true, y = M, h2) {
            const U = pt([y, w]), Q = J(e, U);
            v(Q);
          }
          return z;
        }
        n(Xe, "cancel1Algorithm");
        function Pe(M) {
          if (h2 = true, w = M, c) {
            const U = pt([y, w]), Q = J(e, U);
            v(Q);
          }
          return z;
        }
        n(Pe, "cancel2Algorithm");
        function he() {
        }
        return n(he, "startAlgorithm"), T = en(he, X, Xe), P = en(he, X, Pe), dt(r._closedPromise, (M) => {
          Re(T._readableStreamController, M), Re(P._readableStreamController, M), (!c || !h2) && v(void 0);
        }), [T, P];
      }
      n(Pa, "ReadableStreamDefaultTee");
      function va(e) {
        let t2 = Ve(e), r = false, s2 = false, f2 = false, c = false, h2 = false, y, w, T, P, v;
        const z = E((_) => {
          v = _;
        });
        function X(_) {
          dt(_._closedPromise, (R) => {
            _ === t2 && (K(T._readableStreamController, R), K(P._readableStreamController, R), (!c || !h2) && v(void 0));
          });
        }
        n(X, "forwardReaderError");
        function Xe() {
          Oe(t2) && (fe(t2), t2 = Ve(e), X(t2)), ht(t2, { _chunkSteps: (R) => {
            F(() => {
              s2 = false, f2 = false;
              const W = R;
              let H = R;
              if (!c && !h2)
                try {
                  H = eo(R);
                } catch (et) {
                  K(T._readableStreamController, et), K(P._readableStreamController, et), v(J(e, et));
                  return;
                }
              c || $t(T._readableStreamController, W), h2 || $t(P._readableStreamController, H), r = false, s2 ? he() : f2 && M();
            });
          }, _closeSteps: () => {
            r = false, c || bt(T._readableStreamController), h2 || bt(P._readableStreamController), T._readableStreamController._pendingPullIntos.length > 0 && Dt(T._readableStreamController, 0), P._readableStreamController._pendingPullIntos.length > 0 && Dt(P._readableStreamController, 0), (!c || !h2) && v(void 0);
          }, _errorSteps: () => {
            r = false;
          } });
        }
        n(Xe, "pullWithDefaultReader");
        function Pe(_, R) {
          ye(t2) && (fe(t2), t2 = fo(e), X(t2));
          const W = R ? P : T, H = R ? T : P;
          po(t2, _, { _chunkSteps: (tt) => {
            F(() => {
              s2 = false, f2 = false;
              const rt = R ? h2 : c;
              if (R ? c : h2)
                rt || Mt(W._readableStreamController, tt);
              else {
                let Zo;
                try {
                  Zo = eo(tt);
                } catch (gn) {
                  K(W._readableStreamController, gn), K(H._readableStreamController, gn), v(J(e, gn));
                  return;
                }
                rt || Mt(W._readableStreamController, tt), $t(H._readableStreamController, Zo);
              }
              r = false, s2 ? he() : f2 && M();
            });
          }, _closeSteps: (tt) => {
            r = false;
            const rt = R ? h2 : c, sr = R ? c : h2;
            rt || bt(W._readableStreamController), sr || bt(H._readableStreamController), tt !== void 0 && (rt || Mt(W._readableStreamController, tt), !sr && H._readableStreamController._pendingPullIntos.length > 0 && Dt(H._readableStreamController, 0)), (!rt || !sr) && v(void 0);
          }, _errorSteps: () => {
            r = false;
          } });
        }
        n(Pe, "pullWithBYOBReader");
        function he() {
          if (r)
            return s2 = true, b(void 0);
          r = true;
          const _ = $r(T._readableStreamController);
          return _ === null ? Xe() : Pe(_._view, false), b(void 0);
        }
        n(he, "pull1Algorithm");
        function M() {
          if (r)
            return f2 = true, b(void 0);
          r = true;
          const _ = $r(P._readableStreamController);
          return _ === null ? Xe() : Pe(_._view, true), b(void 0);
        }
        n(M, "pull2Algorithm");
        function U(_) {
          if (c = true, y = _, h2) {
            const R = pt([y, w]), W = J(e, R);
            v(W);
          }
          return z;
        }
        n(U, "cancel1Algorithm");
        function Q(_) {
          if (h2 = true, w = _, c) {
            const R = pt([y, w]), W = J(e, R);
            v(W);
          }
          return z;
        }
        n(Q, "cancel2Algorithm");
        function pe() {
        }
        return n(pe, "startAlgorithm"), T = Fo(pe, he, U), P = Fo(pe, M, Q), X(t2), [T, P];
      }
      n(va, "ReadableByteStreamTee");
      function Ea(e, t2) {
        ce(e, t2);
        const r = e, s2 = r == null ? void 0 : r.autoAllocateChunkSize, f2 = r == null ? void 0 : r.cancel, c = r == null ? void 0 : r.pull, h2 = r == null ? void 0 : r.start, y = r == null ? void 0 : r.type;
        return { autoAllocateChunkSize: s2 === void 0 ? void 0 : xn(s2, `${t2} has member 'autoAllocateChunkSize' that`), cancel: f2 === void 0 ? void 0 : Aa(f2, r, `${t2} has member 'cancel' that`), pull: c === void 0 ? void 0 : Wa(c, r, `${t2} has member 'pull' that`), start: h2 === void 0 ? void 0 : Ba(h2, r, `${t2} has member 'start' that`), type: y === void 0 ? void 0 : ka(y, `${t2} has member 'type' that`) };
      }
      n(Ea, "convertUnderlyingDefaultOrByteSource");
      function Aa(e, t2, r) {
        return Z(e, r), (s2) => ue(e, t2, [s2]);
      }
      n(Aa, "convertUnderlyingSourceCancelCallback");
      function Wa(e, t2, r) {
        return Z(e, r), (s2) => ue(e, t2, [s2]);
      }
      n(Wa, "convertUnderlyingSourcePullCallback");
      function Ba(e, t2, r) {
        return Z(e, r), (s2) => ve(e, t2, [s2]);
      }
      n(Ba, "convertUnderlyingSourceStartCallback");
      function ka(e, t2) {
        if (e = `${e}`, e !== "bytes")
          throw new TypeError(`${t2} '${e}' is not a valid enumeration value for ReadableStreamType`);
        return e;
      }
      n(ka, "convertReadableStreamType");
      function Oa(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.mode;
        return { mode: r === void 0 ? void 0 : qa(r, `${t2} has member 'mode' that`) };
      }
      n(Oa, "convertReaderOptions");
      function qa(e, t2) {
        if (e = `${e}`, e !== "byob")
          throw new TypeError(`${t2} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
        return e;
      }
      n(qa, "convertReadableStreamReaderMode");
      function za(e, t2) {
        return ce(e, t2), { preventCancel: !!(e == null ? void 0 : e.preventCancel) };
      }
      n(za, "convertIteratorOptions");
      function jo(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.preventAbort, s2 = e == null ? void 0 : e.preventCancel, f2 = e == null ? void 0 : e.preventClose, c = e == null ? void 0 : e.signal;
        return c !== void 0 && ja(c, `${t2} has member 'signal' that`), { preventAbort: !!r, preventCancel: !!s2, preventClose: !!f2, signal: c };
      }
      n(jo, "convertPipeOptions");
      function ja(e, t2) {
        if (!Qi(e))
          throw new TypeError(`${t2} is not an AbortSignal.`);
      }
      n(ja, "assertAbortSignal");
      function Fa(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.readable;
        Br(r, "readable", "ReadableWritablePair"), Or(r, `${t2} has member 'readable' that`);
        const s2 = e == null ? void 0 : e.writable;
        return Br(s2, "writable", "ReadableWritablePair"), bo(s2, `${t2} has member 'writable' that`), { readable: r, writable: s2 };
      }
      n(Fa, "convertReadableWritablePair");
      const hn = class hn {
        constructor(t2 = {}, r = {}) {
          t2 === void 0 ? t2 = null : Un(t2, "First parameter");
          const s2 = xt(r, "Second parameter"), f2 = Ea(t2, "First parameter");
          if (tn(this), f2.type === "bytes") {
            if (s2.size !== void 0)
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            const c = yt(s2, 0);
            Li(this, f2, c);
          } else {
            const c = Nt(s2), h2 = yt(s2, 1);
            Ta(this, f2, h2, c);
          }
        }
        get locked() {
          if (!Te(this))
            throw Ie("locked");
          return Ce(this);
        }
        cancel(t2 = void 0) {
          return Te(this) ? Ce(this) ? g2(new TypeError("Cannot cancel a stream that already has a reader")) : J(this, t2) : g2(Ie("cancel"));
        }
        getReader(t2 = void 0) {
          if (!Te(this))
            throw Ie("getReader");
          return Oa(t2, "First parameter").mode === void 0 ? Ve(this) : fo(this);
        }
        pipeThrough(t2, r = {}) {
          if (!Te(this))
            throw Ie("pipeThrough");
          de(t2, 1, "pipeThrough");
          const s2 = Fa(t2, "First parameter"), f2 = jo(r, "Second parameter");
          if (Ce(this))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          if (Ye(s2.writable))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          const c = Oo(this, s2.writable, f2.preventClose, f2.preventAbort, f2.preventCancel, f2.signal);
          return $(c), s2.readable;
        }
        pipeTo(t2, r = {}) {
          if (!Te(this))
            return g2(Ie("pipeTo"));
          if (t2 === void 0)
            return g2("Parameter 1 is required in 'pipeTo'.");
          if (!Qe(t2))
            return g2(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
          let s2;
          try {
            s2 = jo(r, "Second parameter");
          } catch (f2) {
            return g2(f2);
          }
          return Ce(this) ? g2(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Ye(t2) ? g2(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : Oo(this, t2, s2.preventClose, s2.preventAbort, s2.preventCancel, s2.signal);
        }
        tee() {
          if (!Te(this))
            throw Ie("tee");
          const t2 = Ca(this);
          return pt(t2);
        }
        values(t2 = void 0) {
          if (!Te(this))
            throw Ie("values");
          const r = za(t2, "First parameter");
          return ki(this, r.preventCancel);
        }
      };
      n(hn, "ReadableStream");
      let ie = hn;
      Object.defineProperties(ie.prototype, { cancel: { enumerable: true }, getReader: { enumerable: true }, pipeThrough: { enumerable: true }, pipeTo: { enumerable: true }, tee: { enumerable: true }, values: { enumerable: true }, locked: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(ie.prototype, l2.toStringTag, { value: "ReadableStream", configurable: true }), typeof l2.asyncIterator == "symbol" && Object.defineProperty(ie.prototype, l2.asyncIterator, { value: ie.prototype.values, writable: true, configurable: true });
      function en(e, t2, r, s2 = 1, f2 = () => 1) {
        const c = Object.create(ie.prototype);
        tn(c);
        const h2 = Object.create(we.prototype);
        return zo(c, h2, e, t2, r, s2, f2), c;
      }
      n(en, "CreateReadableStream");
      function Fo(e, t2, r) {
        const s2 = Object.create(ie.prototype);
        tn(s2);
        const f2 = Object.create(_e.prototype);
        return uo(s2, f2, e, t2, r, 0, void 0), s2;
      }
      n(Fo, "CreateReadableByteStream");
      function tn(e) {
        e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = false;
      }
      n(tn, "InitializeReadableStream");
      function Te(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_readableStreamController") ? false : e instanceof ie;
      }
      n(Te, "IsReadableStream");
      function Ce(e) {
        return e._reader !== void 0;
      }
      n(Ce, "IsReadableStreamLocked");
      function J(e, t2) {
        if (e._disturbed = true, e._state === "closed")
          return b(void 0);
        if (e._state === "errored")
          return g2(e._storedError);
        wt(e);
        const r = e._reader;
        r !== void 0 && Oe(r) && (r._readIntoRequests.forEach((f2) => {
          f2._closeSteps(void 0);
        }), r._readIntoRequests = new x());
        const s2 = e._readableStreamController[Ar](t2);
        return O(s2, u);
      }
      n(J, "ReadableStreamCancel");
      function wt(e) {
        e._state = "closed";
        const t2 = e._reader;
        t2 !== void 0 && (Ln(t2), ye(t2) && (t2._readRequests.forEach((r) => {
          r._closeSteps();
        }), t2._readRequests = new x()));
      }
      n(wt, "ReadableStreamClose");
      function Io(e, t2) {
        e._state = "errored", e._storedError = t2;
        const r = e._reader;
        r !== void 0 && (Er(r, t2), ye(r) ? (r._readRequests.forEach((s2) => {
          s2._errorSteps(t2);
        }), r._readRequests = new x()) : (r._readIntoRequests.forEach((s2) => {
          s2._errorSteps(t2);
        }), r._readIntoRequests = new x()));
      }
      n(Io, "ReadableStreamError");
      function Ie(e) {
        return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
      }
      n(Ie, "streamBrandCheckException$1");
      function Lo(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.highWaterMark;
        return Br(r, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: kr(r) };
      }
      n(Lo, "convertQueuingStrategyInit");
      const $o = n((e) => e.byteLength, "byteLengthSizeFunction");
      try {
        Object.defineProperty($o, "name", { value: "size", configurable: true });
      } catch {
      }
      const pn = class pn {
        constructor(t2) {
          de(t2, 1, "ByteLengthQueuingStrategy"), t2 = Lo(t2, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t2.highWaterMark;
        }
        get highWaterMark() {
          if (!Mo(this))
            throw Do("highWaterMark");
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!Mo(this))
            throw Do("size");
          return $o;
        }
      };
      n(pn, "ByteLengthQueuingStrategy");
      let Ze = pn;
      Object.defineProperties(Ze.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Ze.prototype, l2.toStringTag, { value: "ByteLengthQueuingStrategy", configurable: true });
      function Do(e) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
      }
      n(Do, "byteLengthBrandCheckException");
      function Mo(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") ? false : e instanceof Ze;
      }
      n(Mo, "IsByteLengthQueuingStrategy");
      const Uo = n(() => 1, "countSizeFunction");
      try {
        Object.defineProperty(Uo, "name", { value: "size", configurable: true });
      } catch {
      }
      const bn = class bn {
        constructor(t2) {
          de(t2, 1, "CountQueuingStrategy"), t2 = Lo(t2, "First parameter"), this._countQueuingStrategyHighWaterMark = t2.highWaterMark;
        }
        get highWaterMark() {
          if (!xo(this))
            throw No("highWaterMark");
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!xo(this))
            throw No("size");
          return Uo;
        }
      };
      n(bn, "CountQueuingStrategy");
      let Ke = bn;
      Object.defineProperties(Ke.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Ke.prototype, l2.toStringTag, { value: "CountQueuingStrategy", configurable: true });
      function No(e) {
        return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
      }
      n(No, "countBrandCheckException");
      function xo(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") ? false : e instanceof Ke;
      }
      n(xo, "IsCountQueuingStrategy");
      function Ia(e, t2) {
        ce(e, t2);
        const r = e == null ? void 0 : e.flush, s2 = e == null ? void 0 : e.readableType, f2 = e == null ? void 0 : e.start, c = e == null ? void 0 : e.transform, h2 = e == null ? void 0 : e.writableType;
        return { flush: r === void 0 ? void 0 : La(r, e, `${t2} has member 'flush' that`), readableType: s2, start: f2 === void 0 ? void 0 : $a(f2, e, `${t2} has member 'start' that`), transform: c === void 0 ? void 0 : Da(c, e, `${t2} has member 'transform' that`), writableType: h2 };
      }
      n(Ia, "convertTransformer");
      function La(e, t2, r) {
        return Z(e, r), (s2) => ue(e, t2, [s2]);
      }
      n(La, "convertTransformerFlushCallback");
      function $a(e, t2, r) {
        return Z(e, r), (s2) => ve(e, t2, [s2]);
      }
      n($a, "convertTransformerStartCallback");
      function Da(e, t2, r) {
        return Z(e, r), (s2, f2) => ue(e, t2, [s2, f2]);
      }
      n(Da, "convertTransformerTransformCallback");
      const mn = class mn {
        constructor(t2 = {}, r = {}, s2 = {}) {
          t2 === void 0 && (t2 = null);
          const f2 = xt(r, "Second parameter"), c = xt(s2, "Third parameter"), h2 = Ia(t2, "First parameter");
          if (h2.readableType !== void 0)
            throw new RangeError("Invalid readableType specified");
          if (h2.writableType !== void 0)
            throw new RangeError("Invalid writableType specified");
          const y = yt(c, 0), w = Nt(c), T = yt(f2, 1), P = Nt(f2);
          let v;
          const z = E((X) => {
            v = X;
          });
          Ma(this, z, T, P, y, w), Na(this, h2), h2.start !== void 0 ? v(h2.start(this._transformStreamController)) : v(void 0);
        }
        get readable() {
          if (!Ho(this))
            throw Go("readable");
          return this._readable;
        }
        get writable() {
          if (!Ho(this))
            throw Go("writable");
          return this._writable;
        }
      };
      n(mn, "TransformStream");
      let Je = mn;
      Object.defineProperties(Je.prototype, { readable: { enumerable: true }, writable: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Je.prototype, l2.toStringTag, { value: "TransformStream", configurable: true });
      function Ma(e, t2, r, s2, f2, c) {
        function h2() {
          return t2;
        }
        n(h2, "startAlgorithm");
        function y(z) {
          return Va(e, z);
        }
        n(y, "writeAlgorithm");
        function w(z) {
          return Qa(e, z);
        }
        n(w, "abortAlgorithm");
        function T() {
          return Ya(e);
        }
        n(T, "closeAlgorithm"), e._writable = Zi(h2, y, T, w, r, s2);
        function P() {
          return Ga(e);
        }
        n(P, "pullAlgorithm");
        function v(z) {
          return nr(e, z), b(void 0);
        }
        n(v, "cancelAlgorithm"), e._readable = en(h2, P, v, f2, c), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, or(e, true), e._transformStreamController = void 0;
      }
      n(Ma, "InitializeTransformStream");
      function Ho(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_transformStreamController") ? false : e instanceof Je;
      }
      n(Ho, "IsTransformStream");
      function rr(e, t2) {
        Re(e._readable._readableStreamController, t2), nr(e, t2);
      }
      n(rr, "TransformStreamError");
      function nr(e, t2) {
        Vo(e._transformStreamController), Qr(e._writable._writableStreamController, t2), e._backpressure && or(e, false);
      }
      n(nr, "TransformStreamErrorWritableAndUnblockWrite");
      function or(e, t2) {
        e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = E((r) => {
          e._backpressureChangePromise_resolve = r;
        }), e._backpressure = t2;
      }
      n(or, "TransformStreamSetBackpressure");
      const yn = class yn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!ir(this))
            throw ar("desiredSize");
          const t2 = this._controlledTransformStream._readable._readableStreamController;
          return Xr(t2);
        }
        enqueue(t2 = void 0) {
          if (!ir(this))
            throw ar("enqueue");
          Qo(this, t2);
        }
        error(t2 = void 0) {
          if (!ir(this))
            throw ar("error");
          xa(this, t2);
        }
        terminate() {
          if (!ir(this))
            throw ar("terminate");
          Ha(this);
        }
      };
      n(yn, "TransformStreamDefaultController");
      let Le = yn;
      Object.defineProperties(Le.prototype, { enqueue: { enumerable: true }, error: { enumerable: true }, terminate: { enumerable: true }, desiredSize: { enumerable: true } }), typeof l2.toStringTag == "symbol" && Object.defineProperty(Le.prototype, l2.toStringTag, { value: "TransformStreamDefaultController", configurable: true });
      function ir(e) {
        return !m(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") ? false : e instanceof Le;
      }
      n(ir, "IsTransformStreamDefaultController");
      function Ua(e, t2, r, s2) {
        t2._controlledTransformStream = e, e._transformStreamController = t2, t2._transformAlgorithm = r, t2._flushAlgorithm = s2;
      }
      n(Ua, "SetUpTransformStreamDefaultController");
      function Na(e, t2) {
        const r = Object.create(Le.prototype);
        let s2 = n((c) => {
          try {
            return Qo(r, c), b(void 0);
          } catch (h2) {
            return g2(h2);
          }
        }, "transformAlgorithm"), f2 = n(() => b(void 0), "flushAlgorithm");
        t2.transform !== void 0 && (s2 = n((c) => t2.transform(c, r), "transformAlgorithm")), t2.flush !== void 0 && (f2 = n(() => t2.flush(r), "flushAlgorithm")), Ua(e, r, s2, f2);
      }
      n(Na, "SetUpTransformStreamDefaultControllerFromTransformer");
      function Vo(e) {
        e._transformAlgorithm = void 0, e._flushAlgorithm = void 0;
      }
      n(Vo, "TransformStreamDefaultControllerClearAlgorithms");
      function Qo(e, t2) {
        const r = e._controlledTransformStream, s2 = r._readable._readableStreamController;
        if (!Ge(s2))
          throw new TypeError("Readable side is not in a state that permits enqueue");
        try {
          er(s2, t2);
        } catch (c) {
          throw nr(r, c), r._readable._storedError;
        }
        Ra(s2) !== r._backpressure && or(r, true);
      }
      n(Qo, "TransformStreamDefaultControllerEnqueue");
      function xa(e, t2) {
        rr(e._controlledTransformStream, t2);
      }
      n(xa, "TransformStreamDefaultControllerError");
      function Yo(e, t2) {
        const r = e._transformAlgorithm(t2);
        return O(r, void 0, (s2) => {
          throw rr(e._controlledTransformStream, s2), s2;
        });
      }
      n(Yo, "TransformStreamDefaultControllerPerformTransform");
      function Ha(e) {
        const t2 = e._controlledTransformStream, r = t2._readable._readableStreamController;
        St(r);
        const s2 = new TypeError("TransformStream terminated");
        nr(t2, s2);
      }
      n(Ha, "TransformStreamDefaultControllerTerminate");
      function Va(e, t2) {
        const r = e._transformStreamController;
        if (e._backpressure) {
          const s2 = e._backpressureChangePromise;
          return O(s2, () => {
            const f2 = e._writable;
            if (f2._state === "erroring")
              throw f2._storedError;
            return Yo(r, t2);
          });
        }
        return Yo(r, t2);
      }
      n(Va, "TransformStreamDefaultSinkWriteAlgorithm");
      function Qa(e, t2) {
        return rr(e, t2), b(void 0);
      }
      n(Qa, "TransformStreamDefaultSinkAbortAlgorithm");
      function Ya(e) {
        const t2 = e._readable, r = e._transformStreamController, s2 = r._flushAlgorithm();
        return Vo(r), O(s2, () => {
          if (t2._state === "errored")
            throw t2._storedError;
          St(t2._readableStreamController);
        }, (f2) => {
          throw rr(e, f2), t2._storedError;
        });
      }
      n(Ya, "TransformStreamDefaultSinkCloseAlgorithm");
      function Ga(e) {
        return or(e, false), e._backpressureChangePromise;
      }
      n(Ga, "TransformStreamDefaultSourcePullAlgorithm");
      function ar(e) {
        return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
      }
      n(ar, "defaultControllerBrandCheckException");
      function Go(e) {
        return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
      }
      n(Go, "streamBrandCheckException"), a2.ByteLengthQueuingStrategy = Ze, a2.CountQueuingStrategy = Ke, a2.ReadableByteStreamController = _e, a2.ReadableStream = ie, a2.ReadableStreamBYOBReader = ke, a2.ReadableStreamBYOBRequest = Ae, a2.ReadableStreamDefaultController = we, a2.ReadableStreamDefaultReader = Ee, a2.TransformStream = Je, a2.TransformStreamDefaultController = Le, a2.WritableStream = qe, a2.WritableStreamDefaultController = Se, a2.WritableStreamDefaultWriter = ze, Object.defineProperty(a2, "__esModule", { value: true });
    });
  }(cr, cr.exports)), cr.exports;
}
n(as, "requirePonyfill_es2018");
const ss = 65536;
if (!globalThis.ReadableStream)
  try {
    const i = require("node:process"), { emitWarning: o2 } = i;
    try {
      i.emitWarning = () => {
      }, Object.assign(globalThis, require("node:stream/web")), i.emitWarning = o2;
    } catch (a2) {
      throw i.emitWarning = o2, a2;
    }
  } catch {
    Object.assign(globalThis, as());
  }
try {
  const { Blob: i } = require("buffer");
  i && !i.prototype.stream && (i.prototype.stream = n(function(a2) {
    let l2 = 0;
    const u = this;
    return new ReadableStream({ type: "bytes", async pull(d2) {
      const m = await u.slice(l2, Math.min(u.size, l2 + ss)).arrayBuffer();
      l2 += m.byteLength, d2.enqueue(new Uint8Array(m)), l2 === u.size && d2.close();
    } });
  }, "name"));
} catch {
}
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
const ei = 65536;
async function* Sn(i, o2 = true) {
  for (const a2 of i)
    if ("stream" in a2)
      yield* a2.stream();
    else if (ArrayBuffer.isView(a2))
      if (o2) {
        let l2 = a2.byteOffset;
        const u = a2.byteOffset + a2.byteLength;
        for (; l2 !== u; ) {
          const d2 = Math.min(u - l2, ei), p = a2.buffer.slice(l2, l2 + d2);
          l2 += p.byteLength, yield new Uint8Array(p);
        }
      } else
        yield a2;
    else {
      let l2 = 0, u = a2;
      for (; l2 !== u.size; ) {
        const p = await u.slice(l2, Math.min(u.size, l2 + ei)).arrayBuffer();
        l2 += p.byteLength, yield new Uint8Array(p);
      }
    }
}
n(Sn, "toIterator");
const ti = (xe = class {
  constructor(o2 = [], a2 = {}) {
    ae(this, me, []);
    ae(this, vt, "");
    ae(this, ct, 0);
    ae(this, wr, "transparent");
    if (typeof o2 != "object" || o2 === null)
      throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
    if (typeof o2[Symbol.iterator] != "function")
      throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
    if (typeof a2 != "object" && typeof a2 != "function")
      throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
    a2 === null && (a2 = {});
    const l2 = new TextEncoder();
    for (const d2 of o2) {
      let p;
      ArrayBuffer.isView(d2) ? p = new Uint8Array(d2.buffer.slice(d2.byteOffset, d2.byteOffset + d2.byteLength)) : d2 instanceof ArrayBuffer ? p = new Uint8Array(d2.slice(0)) : d2 instanceof xe ? p = d2 : p = l2.encode(`${d2}`), Y(this, ct, k(this, ct) + (ArrayBuffer.isView(p) ? p.byteLength : p.size)), k(this, me).push(p);
    }
    Y(this, wr, `${a2.endings === void 0 ? "transparent" : a2.endings}`);
    const u = a2.type === void 0 ? "" : String(a2.type);
    Y(this, vt, /^[\x20-\x7E]*$/.test(u) ? u : "");
  }
  get size() {
    return k(this, ct);
  }
  get type() {
    return k(this, vt);
  }
  async text() {
    const o2 = new TextDecoder();
    let a2 = "";
    for await (const l2 of Sn(k(this, me), false))
      a2 += o2.decode(l2, { stream: true });
    return a2 += o2.decode(), a2;
  }
  async arrayBuffer() {
    const o2 = new Uint8Array(this.size);
    let a2 = 0;
    for await (const l2 of Sn(k(this, me), false))
      o2.set(l2, a2), a2 += l2.length;
    return o2.buffer;
  }
  stream() {
    const o2 = Sn(k(this, me), true);
    return new globalThis.ReadableStream({ type: "bytes", async pull(a2) {
      const l2 = await o2.next();
      l2.done ? a2.close() : a2.enqueue(l2.value);
    }, async cancel() {
      await o2.return();
    } });
  }
  slice(o2 = 0, a2 = this.size, l2 = "") {
    const { size: u } = this;
    let d2 = o2 < 0 ? Math.max(u + o2, 0) : Math.min(o2, u), p = a2 < 0 ? Math.max(u + a2, 0) : Math.min(a2, u);
    const m = Math.max(p - d2, 0), C = k(this, me), S = [];
    let I = 0;
    for (const L of C) {
      if (I >= m)
        break;
      const E = ArrayBuffer.isView(L) ? L.byteLength : L.size;
      if (d2 && E <= d2)
        d2 -= E, p -= E;
      else {
        let b;
        ArrayBuffer.isView(L) ? (b = L.subarray(d2, Math.min(E, p)), I += b.byteLength) : (b = L.slice(d2, Math.min(E, p)), I += b.size), p -= E, S.push(b), d2 = 0;
      }
    }
    const re = new xe([], { type: String(l2).toLowerCase() });
    return Y(re, ct, m), Y(re, me, S), re;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](o2) {
    return o2 && typeof o2 == "object" && typeof o2.constructor == "function" && (typeof o2.stream == "function" || typeof o2.arrayBuffer == "function") && /^(Blob|File)$/.test(o2[Symbol.toStringTag]);
  }
}, me = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), n(xe, "Blob"), xe);
Object.defineProperties(ti.prototype, { size: { enumerable: true }, type: { enumerable: true }, slice: { enumerable: true } });
const ls = ti, it = ls, us = (Wt = class extends it {
  constructor(a2, l2, u = {}) {
    if (arguments.length < 2)
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
    super(a2, u);
    ae(this, Et, 0);
    ae(this, At, "");
    u === null && (u = {});
    const d2 = u.lastModified === void 0 ? Date.now() : Number(u.lastModified);
    Number.isNaN(d2) || Y(this, Et, d2), Y(this, At, String(l2));
  }
  get name() {
    return k(this, At);
  }
  get lastModified() {
    return k(this, Et);
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
  static [Symbol.hasInstance](a2) {
    return !!a2 && a2 instanceof it && /^(File)$/.test(a2[Symbol.toStringTag]);
  }
}, Et = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), n(Wt, "File"), Wt), fs = us, wn = fs;
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
var { toStringTag: Tt, iterator: cs, hasInstance: ds } = Symbol, ri = Math.random, hs = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), ni = n((i, o2, a2) => (i += "", /^(Blob|File)$/.test(o2 && o2[Tt]) ? [(a2 = a2 !== void 0 ? a2 + "" : o2[Tt] == "File" ? o2.name : "blob", i), o2.name !== a2 || o2[Tt] == "blob" ? new wn([o2], a2, o2) : o2] : [i, o2 + ""]), "f"), Rn = n((i, o2) => (o2 ? i : i.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1"), $e = n((i, o2, a2) => {
  if (o2.length < a2)
    throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a2} arguments required, but only ${o2.length} present.`);
}, "x");
const dr = (Bt = class {
  constructor(...o2) {
    ae(this, G, []);
    if (o2.length)
      throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
  }
  get [Tt]() {
    return "FormData";
  }
  [cs]() {
    return this.entries();
  }
  static [ds](o2) {
    return o2 && typeof o2 == "object" && o2[Tt] === "FormData" && !hs.some((a2) => typeof o2[a2] != "function");
  }
  append(...o2) {
    $e("append", arguments, 2), k(this, G).push(ni(...o2));
  }
  delete(o2) {
    $e("delete", arguments, 1), o2 += "", Y(this, G, k(this, G).filter(([a2]) => a2 !== o2));
  }
  get(o2) {
    $e("get", arguments, 1), o2 += "";
    for (var a2 = k(this, G), l2 = a2.length, u = 0; u < l2; u++)
      if (a2[u][0] === o2)
        return a2[u][1];
    return null;
  }
  getAll(o2, a2) {
    return $e("getAll", arguments, 1), a2 = [], o2 += "", k(this, G).forEach((l2) => l2[0] === o2 && a2.push(l2[1])), a2;
  }
  has(o2) {
    return $e("has", arguments, 1), o2 += "", k(this, G).some((a2) => a2[0] === o2);
  }
  forEach(o2, a2) {
    $e("forEach", arguments, 1);
    for (var [l2, u] of this)
      o2.call(a2, u, l2, this);
  }
  set(...o2) {
    $e("set", arguments, 2);
    var a2 = [], l2 = true;
    o2 = ni(...o2), k(this, G).forEach((u) => {
      u[0] === o2[0] ? l2 && (l2 = !a2.push(o2)) : a2.push(u);
    }), l2 && a2.push(o2), Y(this, G, a2);
  }
  *entries() {
    yield* k(this, G);
  }
  *keys() {
    for (var [o2] of this)
      yield o2;
  }
  *values() {
    for (var [, o2] of this)
      yield o2;
  }
}, G = /* @__PURE__ */ new WeakMap(), n(Bt, "FormData"), Bt);
function ps(i, o2 = it) {
  var a2 = `${ri()}${ri()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), l2 = [], u = `--${a2}\r
Content-Disposition: form-data; name="`;
  return i.forEach((d2, p) => typeof d2 == "string" ? l2.push(u + Rn(p) + `"\r
\r
${d2.replace(new RegExp("\\r(?!\\n)|(?<!\\r)\\n", "g"), `\r
`)}\r
`) : l2.push(u + Rn(p) + `"; filename="${Rn(d2.name, 1)}"\r
Content-Type: ${d2.type || "application/octet-stream"}\r
\r
`, d2, `\r
`)), l2.push(`--${a2}--`), new o2(l2, { type: "multipart/form-data; boundary=" + a2 });
}
n(ps, "formDataToBlob");
const Bn = class Bn2 extends Error {
  constructor(o2, a2) {
    super(o2), Error.captureStackTrace(this, this.constructor), this.type = a2;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
n(Bn, "FetchBaseError");
let at = Bn;
const kn = class kn2 extends at {
  constructor(o2, a2, l2) {
    super(o2, a2), l2 && (this.code = this.errno = l2.code, this.erroredSysCall = l2.syscall);
  }
};
n(kn, "FetchError");
let V = kn;
const hr = Symbol.toStringTag, oi = n((i) => typeof i == "object" && typeof i.append == "function" && typeof i.delete == "function" && typeof i.get == "function" && typeof i.getAll == "function" && typeof i.has == "function" && typeof i.set == "function" && typeof i.sort == "function" && i[hr] === "URLSearchParams", "isURLSearchParameters"), pr = n((i) => i && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && typeof i.constructor == "function" && /^(Blob|File)$/.test(i[hr]), "isBlob"), bs = n((i) => typeof i == "object" && (i[hr] === "AbortSignal" || i[hr] === "EventTarget"), "isAbortSignal"), ms = n((i, o2) => {
  const a2 = new URL(o2).hostname, l2 = new URL(i).hostname;
  return a2 === l2 || a2.endsWith(`.${l2}`);
}, "isDomainOrSubdomain"), ys = n((i, o2) => {
  const a2 = new URL(o2).protocol, l2 = new URL(i).protocol;
  return a2 === l2;
}, "isSameProtocol"), gs = promisify(se.pipeline), N = Symbol("Body internals"), On = class On2 {
  constructor(o2, { size: a2 = 0 } = {}) {
    let l2 = null;
    o2 === null ? o2 = null : oi(o2) ? o2 = Buffer$1.from(o2.toString()) : pr(o2) || Buffer$1.isBuffer(o2) || (types.isAnyArrayBuffer(o2) ? o2 = Buffer$1.from(o2) : ArrayBuffer.isView(o2) ? o2 = Buffer$1.from(o2.buffer, o2.byteOffset, o2.byteLength) : o2 instanceof se || (o2 instanceof dr ? (o2 = ps(o2), l2 = o2.type.split("=")[1]) : o2 = Buffer$1.from(String(o2))));
    let u = o2;
    Buffer$1.isBuffer(o2) ? u = se.Readable.from(o2) : pr(o2) && (u = se.Readable.from(o2.stream())), this[N] = { body: o2, stream: u, boundary: l2, disturbed: false, error: null }, this.size = a2, o2 instanceof se && o2.on("error", (d2) => {
      const p = d2 instanceof at ? d2 : new V(`Invalid response body while trying to fetch ${this.url}: ${d2.message}`, "system", d2);
      this[N].error = p;
    });
  }
  get body() {
    return this[N].stream;
  }
  get bodyUsed() {
    return this[N].disturbed;
  }
  async arrayBuffer() {
    const { buffer: o2, byteOffset: a2, byteLength: l2 } = await Tn(this);
    return o2.slice(a2, a2 + l2);
  }
  async formData() {
    const o2 = this.headers.get("content-type");
    if (o2.startsWith("application/x-www-form-urlencoded")) {
      const l2 = new dr(), u = new URLSearchParams(await this.text());
      for (const [d2, p] of u)
        l2.append(d2, p);
      return l2;
    }
    const { toFormData: a2 } = await import('./_nuxt/multipart-parser-ca53fe6b.mjs');
    return a2(this.body, o2);
  }
  async blob() {
    const o2 = this.headers && this.headers.get("content-type") || this[N].body && this[N].body.type || "", a2 = await this.arrayBuffer();
    return new it([a2], { type: o2 });
  }
  async json() {
    const o2 = await this.text();
    return JSON.parse(o2);
  }
  async text() {
    const o2 = await Tn(this);
    return new TextDecoder().decode(o2);
  }
  buffer() {
    return Tn(this);
  }
};
n(On, "Body");
let De = On;
De.prototype.buffer = deprecate(De.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(De.prototype, { body: { enumerable: true }, bodyUsed: { enumerable: true }, arrayBuffer: { enumerable: true }, blob: { enumerable: true }, json: { enumerable: true }, text: { enumerable: true }, data: { get: deprecate(() => {
}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") } });
async function Tn(i) {
  if (i[N].disturbed)
    throw new TypeError(`body used already for: ${i.url}`);
  if (i[N].disturbed = true, i[N].error)
    throw i[N].error;
  const { body: o2 } = i;
  if (o2 === null)
    return Buffer$1.alloc(0);
  if (!(o2 instanceof se))
    return Buffer$1.alloc(0);
  const a2 = [];
  let l2 = 0;
  try {
    for await (const u of o2) {
      if (i.size > 0 && l2 + u.length > i.size) {
        const d2 = new V(`content size at ${i.url} over limit: ${i.size}`, "max-size");
        throw o2.destroy(d2), d2;
      }
      l2 += u.length, a2.push(u);
    }
  } catch (u) {
    throw u instanceof at ? u : new V(`Invalid response body while trying to fetch ${i.url}: ${u.message}`, "system", u);
  }
  if (o2.readableEnded === true || o2._readableState.ended === true)
    try {
      return a2.every((u) => typeof u == "string") ? Buffer$1.from(a2.join("")) : Buffer$1.concat(a2, l2);
    } catch (u) {
      throw new V(`Could not create Buffer from response body for ${i.url}: ${u.message}`, "system", u);
    }
  else
    throw new V(`Premature close of server response while trying to fetch ${i.url}`);
}
n(Tn, "consumeBody");
const Cn = n((i, o2) => {
  let a2, l2, { body: u } = i[N];
  if (i.bodyUsed)
    throw new Error("cannot clone body after it is used");
  return u instanceof se && typeof u.getBoundary != "function" && (a2 = new PassThrough({ highWaterMark: o2 }), l2 = new PassThrough({ highWaterMark: o2 }), u.pipe(a2), u.pipe(l2), i[N].stream = a2, u = l2), u;
}, "clone"), _s = deprecate((i) => i.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167"), ii = n((i, o2) => i === null ? null : typeof i == "string" ? "text/plain;charset=UTF-8" : oi(i) ? "application/x-www-form-urlencoded;charset=UTF-8" : pr(i) ? i.type || null : Buffer$1.isBuffer(i) || types.isAnyArrayBuffer(i) || ArrayBuffer.isView(i) ? null : i instanceof dr ? `multipart/form-data; boundary=${o2[N].boundary}` : i && typeof i.getBoundary == "function" ? `multipart/form-data;boundary=${_s(i)}` : i instanceof se ? null : "text/plain;charset=UTF-8", "extractContentType"), Ss = n((i) => {
  const { body: o2 } = i[N];
  return o2 === null ? 0 : pr(o2) ? o2.size : Buffer$1.isBuffer(o2) ? o2.length : o2 && typeof o2.getLengthSync == "function" && o2.hasKnownLength && o2.hasKnownLength() ? o2.getLengthSync() : null;
}, "getTotalBytes"), ws = n(async (i, { body: o2 }) => {
  o2 === null ? i.end() : await gs(o2, i);
}, "writeToStream"), br = typeof Rt.validateHeaderName == "function" ? Rt.validateHeaderName : (i) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)) {
    const o2 = new TypeError(`Header name must be a valid HTTP token [${i}]`);
    throw Object.defineProperty(o2, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o2;
  }
}, Pn = typeof Rt.validateHeaderValue == "function" ? Rt.validateHeaderValue : (i, o2) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o2)) {
    const a2 = new TypeError(`Invalid character in header content ["${i}"]`);
    throw Object.defineProperty(a2, "code", { value: "ERR_INVALID_CHAR" }), a2;
  }
}, Rr = class Rr2 extends URLSearchParams {
  constructor(o2) {
    let a2 = [];
    if (o2 instanceof Rr2) {
      const l2 = o2.raw();
      for (const [u, d2] of Object.entries(l2))
        a2.push(...d2.map((p) => [u, p]));
    } else if (o2 != null)
      if (typeof o2 == "object" && !types.isBoxedPrimitive(o2)) {
        const l2 = o2[Symbol.iterator];
        if (l2 == null)
          a2.push(...Object.entries(o2));
        else {
          if (typeof l2 != "function")
            throw new TypeError("Header pairs must be iterable");
          a2 = [...o2].map((u) => {
            if (typeof u != "object" || types.isBoxedPrimitive(u))
              throw new TypeError("Each header pair must be an iterable object");
            return [...u];
          }).map((u) => {
            if (u.length !== 2)
              throw new TypeError("Each header pair must be a name/value tuple");
            return [...u];
          });
        }
      } else
        throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    return a2 = a2.length > 0 ? a2.map(([l2, u]) => (br(l2), Pn(l2, String(u)), [String(l2).toLowerCase(), String(u)])) : void 0, super(a2), new Proxy(this, { get(l2, u, d2) {
      switch (u) {
        case "append":
        case "set":
          return (p, m) => (br(p), Pn(p, String(m)), URLSearchParams.prototype[u].call(l2, String(p).toLowerCase(), String(m)));
        case "delete":
        case "has":
        case "getAll":
          return (p) => (br(p), URLSearchParams.prototype[u].call(l2, String(p).toLowerCase()));
        case "keys":
          return () => (l2.sort(), new Set(URLSearchParams.prototype.keys.call(l2)).keys());
        default:
          return Reflect.get(l2, u, d2);
      }
    } });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(o2) {
    const a2 = this.getAll(o2);
    if (a2.length === 0)
      return null;
    let l2 = a2.join(", ");
    return /^content-encoding$/i.test(o2) && (l2 = l2.toLowerCase()), l2;
  }
  forEach(o2, a2 = void 0) {
    for (const l2 of this.keys())
      Reflect.apply(o2, a2, [this.get(l2), l2, this]);
  }
  *values() {
    for (const o2 of this.keys())
      yield this.get(o2);
  }
  *entries() {
    for (const o2 of this.keys())
      yield [o2, this.get(o2)];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((o2, a2) => (o2[a2] = this.getAll(a2), o2), {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((o2, a2) => {
      const l2 = this.getAll(a2);
      return a2 === "host" ? o2[a2] = l2[0] : o2[a2] = l2.length > 1 ? l2 : l2[0], o2;
    }, {});
  }
};
n(Rr, "Headers");
let le = Rr;
Object.defineProperties(le.prototype, ["get", "entries", "forEach", "values"].reduce((i, o2) => (i[o2] = { enumerable: true }, i), {}));
function Rs(i = []) {
  return new le(i.reduce((o2, a2, l2, u) => (l2 % 2 === 0 && o2.push(u.slice(l2, l2 + 2)), o2), []).filter(([o2, a2]) => {
    try {
      return br(o2), Pn(o2, String(a2)), true;
    } catch {
      return false;
    }
  }));
}
n(Rs, "fromRawHeaders");
const Ts = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), vn = n((i) => Ts.has(i), "isRedirect"), ee = Symbol("Response internals"), Me = class Me2 extends De {
  constructor(o2 = null, a2 = {}) {
    super(o2, a2);
    const l2 = a2.status != null ? a2.status : 200, u = new le(a2.headers);
    if (o2 !== null && !u.has("Content-Type")) {
      const d2 = ii(o2, this);
      d2 && u.append("Content-Type", d2);
    }
    this[ee] = { type: "default", url: a2.url, status: l2, statusText: a2.statusText || "", headers: u, counter: a2.counter, highWaterMark: a2.highWaterMark };
  }
  get type() {
    return this[ee].type;
  }
  get url() {
    return this[ee].url || "";
  }
  get status() {
    return this[ee].status;
  }
  get ok() {
    return this[ee].status >= 200 && this[ee].status < 300;
  }
  get redirected() {
    return this[ee].counter > 0;
  }
  get statusText() {
    return this[ee].statusText;
  }
  get headers() {
    return this[ee].headers;
  }
  get highWaterMark() {
    return this[ee].highWaterMark;
  }
  clone() {
    return new Me2(Cn(this, this.highWaterMark), { type: this.type, url: this.url, status: this.status, statusText: this.statusText, headers: this.headers, ok: this.ok, redirected: this.redirected, size: this.size, highWaterMark: this.highWaterMark });
  }
  static redirect(o2, a2 = 302) {
    if (!vn(a2))
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    return new Me2(null, { headers: { location: new URL(o2).toString() }, status: a2 });
  }
  static error() {
    const o2 = new Me2(null, { status: 0, statusText: "" });
    return o2[ee].type = "error", o2;
  }
  static json(o2 = void 0, a2 = {}) {
    const l2 = JSON.stringify(o2);
    if (l2 === void 0)
      throw new TypeError("data is not JSON serializable");
    const u = new le(a2 && a2.headers);
    return u.has("content-type") || u.set("content-type", "application/json"), new Me2(l2, { ...a2, headers: u });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
n(Me, "Response");
let te = Me;
Object.defineProperties(te.prototype, { type: { enumerable: true }, url: { enumerable: true }, status: { enumerable: true }, ok: { enumerable: true }, redirected: { enumerable: true }, statusText: { enumerable: true }, headers: { enumerable: true }, clone: { enumerable: true } });
const Cs = n((i) => {
  if (i.search)
    return i.search;
  const o2 = i.href.length - 1, a2 = i.hash || (i.href[o2] === "#" ? "#" : "");
  return i.href[o2 - a2.length] === "?" ? "?" : "";
}, "getSearch");
function ai(i, o2 = false) {
  return i == null || (i = new URL(i), /^(about|blob|data):$/.test(i.protocol)) ? "no-referrer" : (i.username = "", i.password = "", i.hash = "", o2 && (i.pathname = "", i.search = ""), i);
}
n(ai, "stripURLForUseAsAReferrer");
const si = /* @__PURE__ */ new Set(["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"]), Ps = "strict-origin-when-cross-origin";
function vs(i) {
  if (!si.has(i))
    throw new TypeError(`Invalid referrerPolicy: ${i}`);
  return i;
}
n(vs, "validateReferrerPolicy");
function Es(i) {
  if (/^(http|ws)s:$/.test(i.protocol))
    return true;
  const o2 = i.host.replace(/(^\[)|(]$)/g, ""), a2 = isIP(o2);
  return a2 === 4 && /^127\./.test(o2) || a2 === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o2) ? true : i.host === "localhost" || i.host.endsWith(".localhost") ? false : i.protocol === "file:";
}
n(Es, "isOriginPotentiallyTrustworthy");
function st(i) {
  return /^about:(blank|srcdoc)$/.test(i) || i.protocol === "data:" || /^(blob|filesystem):$/.test(i.protocol) ? true : Es(i);
}
n(st, "isUrlPotentiallyTrustworthy");
function As(i, { referrerURLCallback: o2, referrerOriginCallback: a2 } = {}) {
  if (i.referrer === "no-referrer" || i.referrerPolicy === "")
    return null;
  const l2 = i.referrerPolicy;
  if (i.referrer === "about:client")
    return "no-referrer";
  const u = i.referrer;
  let d2 = ai(u), p = ai(u, true);
  d2.toString().length > 4096 && (d2 = p), o2 && (d2 = o2(d2)), a2 && (p = a2(p));
  const m = new URL(i.url);
  switch (l2) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return p;
    case "unsafe-url":
      return d2;
    case "strict-origin":
      return st(d2) && !st(m) ? "no-referrer" : p.toString();
    case "strict-origin-when-cross-origin":
      return d2.origin === m.origin ? d2 : st(d2) && !st(m) ? "no-referrer" : p;
    case "same-origin":
      return d2.origin === m.origin ? d2 : "no-referrer";
    case "origin-when-cross-origin":
      return d2.origin === m.origin ? d2 : p;
    case "no-referrer-when-downgrade":
      return st(d2) && !st(m) ? "no-referrer" : d2;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${l2}`);
  }
}
n(As, "determineRequestsReferrer");
function Ws(i) {
  const o2 = (i.get("referrer-policy") || "").split(/[,\s]+/);
  let a2 = "";
  for (const l2 of o2)
    l2 && si.has(l2) && (a2 = l2);
  return a2;
}
n(Ws, "parseReferrerPolicyFromHeader");
const j = Symbol("Request internals"), Ct = n((i) => typeof i == "object" && typeof i[j] == "object", "isRequest"), Bs = deprecate(() => {
}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)"), Tr = class Tr2 extends De {
  constructor(o2, a2 = {}) {
    let l2;
    if (Ct(o2) ? l2 = new URL(o2.url) : (l2 = new URL(o2), o2 = {}), l2.username !== "" || l2.password !== "")
      throw new TypeError(`${l2} is an url with embedded credentials.`);
    let u = a2.method || o2.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(u) && (u = u.toUpperCase()), !Ct(a2) && "data" in a2 && Bs(), (a2.body != null || Ct(o2) && o2.body !== null) && (u === "GET" || u === "HEAD"))
      throw new TypeError("Request with GET/HEAD method cannot have body");
    const d2 = a2.body ? a2.body : Ct(o2) && o2.body !== null ? Cn(o2) : null;
    super(d2, { size: a2.size || o2.size || 0 });
    const p = new le(a2.headers || o2.headers || {});
    if (d2 !== null && !p.has("Content-Type")) {
      const S = ii(d2, this);
      S && p.set("Content-Type", S);
    }
    let m = Ct(o2) ? o2.signal : null;
    if ("signal" in a2 && (m = a2.signal), m != null && !bs(m))
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    let C = a2.referrer == null ? o2.referrer : a2.referrer;
    if (C === "")
      C = "no-referrer";
    else if (C) {
      const S = new URL(C);
      C = /^about:(\/\/)?client$/.test(S) ? "client" : S;
    } else
      C = void 0;
    this[j] = { method: u, redirect: a2.redirect || o2.redirect || "follow", headers: p, parsedURL: l2, signal: m, referrer: C }, this.follow = a2.follow === void 0 ? o2.follow === void 0 ? 20 : o2.follow : a2.follow, this.compress = a2.compress === void 0 ? o2.compress === void 0 ? true : o2.compress : a2.compress, this.counter = a2.counter || o2.counter || 0, this.agent = a2.agent || o2.agent, this.highWaterMark = a2.highWaterMark || o2.highWaterMark || 16384, this.insecureHTTPParser = a2.insecureHTTPParser || o2.insecureHTTPParser || false, this.referrerPolicy = a2.referrerPolicy || o2.referrerPolicy || "";
  }
  get method() {
    return this[j].method;
  }
  get url() {
    return format(this[j].parsedURL);
  }
  get headers() {
    return this[j].headers;
  }
  get redirect() {
    return this[j].redirect;
  }
  get signal() {
    return this[j].signal;
  }
  get referrer() {
    if (this[j].referrer === "no-referrer")
      return "";
    if (this[j].referrer === "client")
      return "about:client";
    if (this[j].referrer)
      return this[j].referrer.toString();
  }
  get referrerPolicy() {
    return this[j].referrerPolicy;
  }
  set referrerPolicy(o2) {
    this[j].referrerPolicy = vs(o2);
  }
  clone() {
    return new Tr2(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
n(Tr, "Request");
let lt = Tr;
Object.defineProperties(lt.prototype, { method: { enumerable: true }, url: { enumerable: true }, headers: { enumerable: true }, redirect: { enumerable: true }, clone: { enumerable: true }, signal: { enumerable: true }, referrer: { enumerable: true }, referrerPolicy: { enumerable: true } });
const ks = n((i) => {
  const { parsedURL: o2 } = i[j], a2 = new le(i[j].headers);
  a2.has("Accept") || a2.set("Accept", "*/*");
  let l2 = null;
  if (i.body === null && /^(post|put)$/i.test(i.method) && (l2 = "0"), i.body !== null) {
    const m = Ss(i);
    typeof m == "number" && !Number.isNaN(m) && (l2 = String(m));
  }
  l2 && a2.set("Content-Length", l2), i.referrerPolicy === "" && (i.referrerPolicy = Ps), i.referrer && i.referrer !== "no-referrer" ? i[j].referrer = As(i) : i[j].referrer = "no-referrer", i[j].referrer instanceof URL && a2.set("Referer", i.referrer), a2.has("User-Agent") || a2.set("User-Agent", "node-fetch"), i.compress && !a2.has("Accept-Encoding") && a2.set("Accept-Encoding", "gzip, deflate, br");
  let { agent: u } = i;
  typeof u == "function" && (u = u(o2));
  const d2 = Cs(o2), p = { path: o2.pathname + d2, method: i.method, headers: a2[Symbol.for("nodejs.util.inspect.custom")](), insecureHTTPParser: i.insecureHTTPParser, agent: u };
  return { parsedURL: o2, options: p };
}, "getNodeRequestOptions"), qn = class qn2 extends at {
  constructor(o2, a2 = "aborted") {
    super(o2, a2);
  }
};
n(qn, "AbortError");
let mr = qn;
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
if (!globalThis.DOMException)
  try {
    const { MessageChannel: i } = require("worker_threads"), o2 = new i().port1, a2 = new ArrayBuffer();
    o2.postMessage(a2, [a2, a2]);
  } catch (i) {
    i.constructor.name === "DOMException" && (globalThis.DOMException = i.constructor);
  }
var Os = globalThis.DOMException;
const qs = is(Os), { stat: En } = promises;
n((i, o2) => li(statSync(i), i, o2), "blobFromSync");
n((i, o2) => En(i).then((a2) => li(a2, i, o2)), "blobFrom");
n((i, o2) => En(i).then((a2) => ui(a2, i, o2)), "fileFrom");
n((i, o2) => ui(statSync(i), i, o2), "fileFromSync");
const li = n((i, o2, a2 = "") => new it([new yr({ path: o2, size: i.size, lastModified: i.mtimeMs, start: 0 })], { type: a2 }), "fromBlob"), ui = n((i, o2, a2 = "") => new wn([new yr({ path: o2, size: i.size, lastModified: i.mtimeMs, start: 0 })], basename(o2), { type: a2, lastModified: i.mtimeMs }), "fromFile"), Cr = class Cr2 {
  constructor(o2) {
    ae(this, Ue, void 0);
    ae(this, Ne, void 0);
    Y(this, Ue, o2.path), Y(this, Ne, o2.start), this.size = o2.size, this.lastModified = o2.lastModified;
  }
  slice(o2, a2) {
    return new Cr2({ path: k(this, Ue), lastModified: this.lastModified, size: a2 - o2, start: k(this, Ne) + o2 });
  }
  async *stream() {
    const { mtimeMs: o2 } = await En(k(this, Ue));
    if (o2 > this.lastModified)
      throw new qs("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
    yield* createReadStream(k(this, Ue), { start: k(this, Ne), end: k(this, Ne) + this.size - 1 });
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
};
Ue = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), n(Cr, "BlobDataItem");
let yr = Cr;
const Ls = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fi(i, o2) {
  return new Promise((a2, l2) => {
    const u = new lt(i, o2), { parsedURL: d2, options: p } = ks(u);
    if (!Ls.has(d2.protocol))
      throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${d2.protocol.replace(/:$/, "")}" is not supported.`);
    if (d2.protocol === "data:") {
      const b = os(u.url), g2 = new te(b, { headers: { "Content-Type": b.typeFull } });
      a2(g2);
      return;
    }
    const m = (d2.protocol === "https:" ? Ka : Rt).request, { signal: C } = u;
    let S = null;
    const I = n(() => {
      const b = new mr("The operation was aborted.");
      l2(b), u.body && u.body instanceof se.Readable && u.body.destroy(b), !(!S || !S.body) && S.body.emit("error", b);
    }, "abort");
    if (C && C.aborted) {
      I();
      return;
    }
    const re = n(() => {
      I(), E();
    }, "abortAndFinalize"), L = m(d2.toString(), p);
    C && C.addEventListener("abort", re);
    const E = n(() => {
      L.abort(), C && C.removeEventListener("abort", re);
    }, "finalize");
    L.on("error", (b) => {
      l2(new V(`request to ${u.url} failed, reason: ${b.message}`, "system", b)), E();
    }), $s(L, (b) => {
      S && S.body && S.body.destroy(b);
    }), process.version < "v14" && L.on("socket", (b) => {
      let g2;
      b.prependListener("end", () => {
        g2 = b._eventsCount;
      }), b.prependListener("close", (A2) => {
        if (S && g2 < b._eventsCount && !A2) {
          const q = new Error("Premature close");
          q.code = "ERR_STREAM_PREMATURE_CLOSE", S.body.emit("error", q);
        }
      });
    }), L.on("response", (b) => {
      L.setTimeout(0);
      const g2 = Rs(b.rawHeaders);
      if (vn(b.statusCode)) {
        const O = g2.get("Location");
        let $ = null;
        try {
          $ = O === null ? null : new URL(O, u.url);
        } catch {
          if (u.redirect !== "manual") {
            l2(new V(`uri requested responds with an invalid redirect URL: ${O}`, "invalid-redirect")), E();
            return;
          }
        }
        switch (u.redirect) {
          case "error":
            l2(new V(`uri requested responds with a redirect, redirect mode is set to error: ${u.url}`, "no-redirect")), E();
            return;
          case "manual":
            break;
          case "follow": {
            if ($ === null)
              break;
            if (u.counter >= u.follow) {
              l2(new V(`maximum redirect reached at: ${u.url}`, "max-redirect")), E();
              return;
            }
            const F = { headers: new le(u.headers), follow: u.follow, counter: u.counter + 1, agent: u.agent, compress: u.compress, method: u.method, body: Cn(u), signal: u.signal, size: u.size, referrer: u.referrer, referrerPolicy: u.referrerPolicy };
            if (!ms(u.url, $) || !ys(u.url, $))
              for (const ue of ["authorization", "www-authenticate", "cookie", "cookie2"])
                F.headers.delete(ue);
            if (b.statusCode !== 303 && u.body && o2.body instanceof se.Readable) {
              l2(new V("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), E();
              return;
            }
            (b.statusCode === 303 || (b.statusCode === 301 || b.statusCode === 302) && u.method === "POST") && (F.method = "GET", F.body = void 0, F.headers.delete("content-length"));
            const ve = Ws(g2);
            ve && (F.referrerPolicy = ve), a2(fi(new lt($, F))), E();
            return;
          }
          default:
            return l2(new TypeError(`Redirect option '${u.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      C && b.once("end", () => {
        C.removeEventListener("abort", re);
      });
      let A2 = pipeline(b, new PassThrough(), (O) => {
        O && l2(O);
      });
      process.version < "v12.10" && b.on("aborted", re);
      const q = { url: u.url, status: b.statusCode, statusText: b.statusMessage, headers: g2, size: u.size, counter: u.counter, highWaterMark: u.highWaterMark }, ne = g2.get("Content-Encoding");
      if (!u.compress || u.method === "HEAD" || ne === null || b.statusCode === 204 || b.statusCode === 304) {
        S = new te(A2, q), a2(S);
        return;
      }
      const dt = { flush: nt.Z_SYNC_FLUSH, finishFlush: nt.Z_SYNC_FLUSH };
      if (ne === "gzip" || ne === "x-gzip") {
        A2 = pipeline(A2, nt.createGunzip(dt), (O) => {
          O && l2(O);
        }), S = new te(A2, q), a2(S);
        return;
      }
      if (ne === "deflate" || ne === "x-deflate") {
        const O = pipeline(b, new PassThrough(), ($) => {
          $ && l2($);
        });
        O.once("data", ($) => {
          ($[0] & 15) === 8 ? A2 = pipeline(A2, nt.createInflate(), (F) => {
            F && l2(F);
          }) : A2 = pipeline(A2, nt.createInflateRaw(), (F) => {
            F && l2(F);
          }), S = new te(A2, q), a2(S);
        }), O.once("end", () => {
          S || (S = new te(A2, q), a2(S));
        });
        return;
      }
      if (ne === "br") {
        A2 = pipeline(A2, nt.createBrotliDecompress(), (O) => {
          O && l2(O);
        }), S = new te(A2, q), a2(S);
        return;
      }
      S = new te(A2, q), a2(S);
    }), ws(L, u).catch(l2);
  });
}
n(fi, "fetch$1");
function $s(i, o2) {
  const a2 = Buffer$1.from(`0\r
\r
`);
  let l2 = false, u = false, d2;
  i.on("response", (p) => {
    const { headers: m } = p;
    l2 = m["transfer-encoding"] === "chunked" && !m["content-length"];
  }), i.on("socket", (p) => {
    const m = n(() => {
      if (l2 && !u) {
        const S = new Error("Premature close");
        S.code = "ERR_STREAM_PREMATURE_CLOSE", o2(S);
      }
    }, "onSocketClose"), C = n((S) => {
      u = Buffer$1.compare(S.slice(-5), a2) === 0, !u && d2 && (u = Buffer$1.compare(d2.slice(-3), a2.slice(0, 3)) === 0 && Buffer$1.compare(S.slice(-2), a2.slice(3)) === 0), d2 = S;
    }, "onData");
    p.prependListener("close", m), p.on("data", C), i.on("close", () => {
      p.removeListener("close", m), p.removeListener("data", C);
    });
  });
}
n($s, "fixResponseChunkedTransferBadEnding");
const ci = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap();
function B(i) {
  const o2 = ci.get(i);
  return console.assert(o2 != null, "'this' is expected an Event object, but got", i), o2;
}
n(B, "pd");
function di(i) {
  if (i.passiveListener != null) {
    typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i.passiveListener);
    return;
  }
  i.event.cancelable && (i.canceled = true, typeof i.event.preventDefault == "function" && i.event.preventDefault());
}
n(di, "setCancelFlag");
function ut(i, o2) {
  ci.set(this, { eventTarget: i, event: o2, eventPhase: 2, currentTarget: i, canceled: false, stopped: false, immediateStopped: false, passiveListener: null, timeStamp: o2.timeStamp || Date.now() }), Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
  const a2 = Object.keys(o2);
  for (let l2 = 0; l2 < a2.length; ++l2) {
    const u = a2[l2];
    u in this || Object.defineProperty(this, u, hi(u));
  }
}
n(ut, "Event"), ut.prototype = { get type() {
  return B(this).event.type;
}, get target() {
  return B(this).eventTarget;
}, get currentTarget() {
  return B(this).currentTarget;
}, composedPath() {
  const i = B(this).currentTarget;
  return i == null ? [] : [i];
}, get NONE() {
  return 0;
}, get CAPTURING_PHASE() {
  return 1;
}, get AT_TARGET() {
  return 2;
}, get BUBBLING_PHASE() {
  return 3;
}, get eventPhase() {
  return B(this).eventPhase;
}, stopPropagation() {
  const i = B(this);
  i.stopped = true, typeof i.event.stopPropagation == "function" && i.event.stopPropagation();
}, stopImmediatePropagation() {
  const i = B(this);
  i.stopped = true, i.immediateStopped = true, typeof i.event.stopImmediatePropagation == "function" && i.event.stopImmediatePropagation();
}, get bubbles() {
  return !!B(this).event.bubbles;
}, get cancelable() {
  return !!B(this).event.cancelable;
}, preventDefault() {
  di(B(this));
}, get defaultPrevented() {
  return B(this).canceled;
}, get composed() {
  return !!B(this).event.composed;
}, get timeStamp() {
  return B(this).timeStamp;
}, get srcElement() {
  return B(this).eventTarget;
}, get cancelBubble() {
  return B(this).stopped;
}, set cancelBubble(i) {
  if (!i)
    return;
  const o2 = B(this);
  o2.stopped = true, typeof o2.event.cancelBubble == "boolean" && (o2.event.cancelBubble = true);
}, get returnValue() {
  return !B(this).canceled;
}, set returnValue(i) {
  i || di(B(this));
}, initEvent() {
} }, Object.defineProperty(ut.prototype, "constructor", { value: ut, configurable: true, writable: true });
function hi(i) {
  return { get() {
    return B(this).event[i];
  }, set(o2) {
    B(this).event[i] = o2;
  }, configurable: true, enumerable: true };
}
n(hi, "defineRedirectDescriptor");
function Ds(i) {
  return { value() {
    const o2 = B(this).event;
    return o2[i].apply(o2, arguments);
  }, configurable: true, enumerable: true };
}
n(Ds, "defineCallDescriptor");
function Ms(i, o2) {
  const a2 = Object.keys(o2);
  if (a2.length === 0)
    return i;
  function l2(u, d2) {
    i.call(this, u, d2);
  }
  n(l2, "CustomEvent"), l2.prototype = Object.create(i.prototype, { constructor: { value: l2, configurable: true, writable: true } });
  for (let u = 0; u < a2.length; ++u) {
    const d2 = a2[u];
    if (!(d2 in i.prototype)) {
      const m = typeof Object.getOwnPropertyDescriptor(o2, d2).value == "function";
      Object.defineProperty(l2.prototype, d2, m ? Ds(d2) : hi(d2));
    }
  }
  return l2;
}
n(Ms, "defineWrapper");
function pi(i) {
  if (i == null || i === Object.prototype)
    return ut;
  let o2 = An.get(i);
  return o2 == null && (o2 = Ms(pi(Object.getPrototypeOf(i)), i), An.set(i, o2)), o2;
}
n(pi, "getWrapper");
function Us(i, o2) {
  const a2 = pi(Object.getPrototypeOf(o2));
  return new a2(i, o2);
}
n(Us, "wrapEvent");
function Ns(i) {
  return B(i).immediateStopped;
}
n(Ns, "isStopped");
function xs(i, o2) {
  B(i).eventPhase = o2;
}
n(xs, "setEventPhase");
function Hs(i, o2) {
  B(i).currentTarget = o2;
}
n(Hs, "setCurrentTarget");
function bi(i, o2) {
  B(i).passiveListener = o2;
}
n(bi, "setPassiveListener");
const mi = /* @__PURE__ */ new WeakMap(), yi = 1, gi = 2, gr = 3;
function _r(i) {
  return i !== null && typeof i == "object";
}
n(_r, "isObject");
function Pt(i) {
  const o2 = mi.get(i);
  if (o2 == null)
    throw new TypeError("'this' is expected an EventTarget object, but got another value.");
  return o2;
}
n(Pt, "getListeners");
function Vs(i) {
  return { get() {
    let a2 = Pt(this).get(i);
    for (; a2 != null; ) {
      if (a2.listenerType === gr)
        return a2.listener;
      a2 = a2.next;
    }
    return null;
  }, set(o2) {
    typeof o2 != "function" && !_r(o2) && (o2 = null);
    const a2 = Pt(this);
    let l2 = null, u = a2.get(i);
    for (; u != null; )
      u.listenerType === gr ? l2 !== null ? l2.next = u.next : u.next !== null ? a2.set(i, u.next) : a2.delete(i) : l2 = u, u = u.next;
    if (o2 !== null) {
      const d2 = { listener: o2, listenerType: gr, passive: false, once: false, next: null };
      l2 === null ? a2.set(i, d2) : l2.next = d2;
    }
  }, configurable: true, enumerable: true };
}
n(Vs, "defineEventAttributeDescriptor");
function _i(i, o2) {
  Object.defineProperty(i, `on${o2}`, Vs(o2));
}
n(_i, "defineEventAttribute");
function Si(i) {
  function o2() {
    be.call(this);
  }
  n(o2, "CustomEventTarget"), o2.prototype = Object.create(be.prototype, { constructor: { value: o2, configurable: true, writable: true } });
  for (let a2 = 0; a2 < i.length; ++a2)
    _i(o2.prototype, i[a2]);
  return o2;
}
n(Si, "defineCustomEventTarget");
function be() {
  if (this instanceof be) {
    mi.set(this, /* @__PURE__ */ new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0]))
    return Si(arguments[0]);
  if (arguments.length > 0) {
    const i = new Array(arguments.length);
    for (let o2 = 0; o2 < arguments.length; ++o2)
      i[o2] = arguments[o2];
    return Si(i);
  }
  throw new TypeError("Cannot call a class as a function");
}
n(be, "EventTarget"), be.prototype = { addEventListener(i, o2, a2) {
  if (o2 == null)
    return;
  if (typeof o2 != "function" && !_r(o2))
    throw new TypeError("'listener' should be a function or an object.");
  const l2 = Pt(this), u = _r(a2), p = (u ? !!a2.capture : !!a2) ? yi : gi, m = { listener: o2, listenerType: p, passive: u && !!a2.passive, once: u && !!a2.once, next: null };
  let C = l2.get(i);
  if (C === void 0) {
    l2.set(i, m);
    return;
  }
  let S = null;
  for (; C != null; ) {
    if (C.listener === o2 && C.listenerType === p)
      return;
    S = C, C = C.next;
  }
  S.next = m;
}, removeEventListener(i, o2, a2) {
  if (o2 == null)
    return;
  const l2 = Pt(this), d2 = (_r(a2) ? !!a2.capture : !!a2) ? yi : gi;
  let p = null, m = l2.get(i);
  for (; m != null; ) {
    if (m.listener === o2 && m.listenerType === d2) {
      p !== null ? p.next = m.next : m.next !== null ? l2.set(i, m.next) : l2.delete(i);
      return;
    }
    p = m, m = m.next;
  }
}, dispatchEvent(i) {
  if (i == null || typeof i.type != "string")
    throw new TypeError('"event.type" should be a string.');
  const o2 = Pt(this), a2 = i.type;
  let l2 = o2.get(a2);
  if (l2 == null)
    return true;
  const u = Us(this, i);
  let d2 = null;
  for (; l2 != null; ) {
    if (l2.once ? d2 !== null ? d2.next = l2.next : l2.next !== null ? o2.set(a2, l2.next) : o2.delete(a2) : d2 = l2, bi(u, l2.passive ? l2.listener : null), typeof l2.listener == "function")
      try {
        l2.listener.call(this, u);
      } catch (p) {
        typeof console < "u" && typeof console.error == "function" && console.error(p);
      }
    else
      l2.listenerType !== gr && typeof l2.listener.handleEvent == "function" && l2.listener.handleEvent(u);
    if (Ns(u))
      break;
    l2 = l2.next;
  }
  return bi(u, null), xs(u, 0), Hs(u, null), !u.defaultPrevented;
} }, Object.defineProperty(be.prototype, "constructor", { value: be, configurable: true, writable: true });
const zn = class zn2 extends be {
  constructor() {
    throw super(), new TypeError("AbortSignal cannot be constructed directly");
  }
  get aborted() {
    const o2 = Sr.get(this);
    if (typeof o2 != "boolean")
      throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
    return o2;
  }
};
n(zn, "AbortSignal");
let ft = zn;
_i(ft.prototype, "abort");
function Qs() {
  const i = Object.create(ft.prototype);
  return be.call(i), Sr.set(i, false), i;
}
n(Qs, "createAbortSignal");
function Ys(i) {
  Sr.get(i) === false && (Sr.set(i, true), i.dispatchEvent({ type: "abort" }));
}
n(Ys, "abortSignal");
const Sr = /* @__PURE__ */ new WeakMap();
Object.defineProperties(ft.prototype, { aborted: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ft.prototype, Symbol.toStringTag, { configurable: true, value: "AbortSignal" });
let Wn = (kt = class {
  constructor() {
    wi.set(this, Qs());
  }
  get signal() {
    return Ri(this);
  }
  abort() {
    Ys(Ri(this));
  }
}, n(kt, "AbortController"), kt);
const wi = /* @__PURE__ */ new WeakMap();
function Ri(i) {
  const o2 = wi.get(i);
  if (o2 == null)
    throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i === null ? "null" : typeof i}`);
  return o2;
}
n(Ri, "getSignal"), Object.defineProperties(Wn.prototype, { signal: { enumerable: true }, abort: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Wn.prototype, Symbol.toStringTag, { configurable: true, value: "AbortController" });
var Gs = Object.defineProperty, Zs = n((i, o2) => Gs(i, "name", { value: o2, configurable: true }), "e");
const Ti = fi;
Ci();
function Ci() {
  var _a2, _b2, _c;
  !((_b2 = (_a2 = globalThis.process) == null ? void 0 : _a2.versions) == null ? void 0 : _b2.node) && !((_c = globalThis.process) == null ? void 0 : _c.env.DISABLE_NODE_FETCH_NATIVE_WARN) && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
n(Ci, "s"), Zs(Ci, "checkNodeEnvironment");
var a = Object.defineProperty;
var t = (e, r) => a(e, "name", { value: r, configurable: true });
var f = Object.defineProperty, g = t((e, r) => f(e, "name", { value: r, configurable: true }), "e");
const o = !!((_b = (_a = globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.FORCE_NODE_FETCH);
function l() {
  return !o && globalThis.fetch ? globalThis.fetch : Ti;
}
t(l, "p"), g(l, "_getFetch");
const s = l(), d = !o && globalThis.Headers || le, A = !o && globalThis.AbortController || Wn;
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.at(-1) === '"' && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s2 = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s2.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s2[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s2[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k2) => query[k2] !== void 0).map((k2) => encodeQueryItem(k2, query[k2])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s2] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s2.length > 0 ? `?${s2.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s2] = input.split("?");
  return s0 + "/" + (s2.length > 0 ? `?${s2.join("?")}` : "");
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto,
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol,
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol ? parsed.protocol + "//" : "";
  return proto + auth + host + pathname + search + hash;
}
class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if ((opts == null ? void 0 : opts.cause) && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  var _a2, _b2, _c, _d, _e;
  const errorMessage = ((_a2 = ctx.error) == null ? void 0 : _a2.message) || ((_b2 = ctx.error) == null ? void 0 : _b2.toString()) || "";
  const method = ((_c = ctx.request) == null ? void 0 : _c.method) || ((_d = ctx.options) == null ? void 0 : _d.method) || "GET";
  const url = ((_e = ctx.request) == null ? void 0 : _e.url) || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}
const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t2 = typeof value;
  if (t2 === "string" || t2 === "number" || t2 === "boolean" || t2 === null) {
    return true;
  }
  if (t2 !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers2 = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if ((defaults == null ? void 0 : defaults.params) && (input == null ? void 0 : input.params)) {
    merged.params = {
      ...defaults == null ? void 0 : defaults.params,
      ...input == null ? void 0 : input.params
    };
  }
  if ((defaults == null ? void 0 : defaults.query) && (input == null ? void 0 : input.query)) {
    merged.query = {
      ...defaults == null ? void 0 : defaults.query,
      ...input == null ? void 0 : input.query
    };
  }
  if ((defaults == null ? void 0 : defaults.headers) && (input == null ? void 0 : input.headers)) {
    merged.headers = new Headers2((defaults == null ? void 0 : defaults.headers) || {});
    for (const [key, value] of new Headers2((input == null ? void 0 : input.headers) || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch: fetch2 = globalThis.fetch,
    Headers: Headers2 = globalThis.Headers,
    AbortController: AbortController2 = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1,
          timeout: context.options.timeout
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    var _a2;
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers2),
      response: void 0,
      error: void 0
    };
    context.options.method = (_a2 = context.options.method) == null ? void 0 : _a2.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController2();
      setTimeout(() => controller.abort(), context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch2(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    }
    const hasBody = context.response.body && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch2 = async function $fetch22(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.native = (...args) => fetch2(...args);
  $fetch2.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return s;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new Rt.Agent(agentOptions);
  const httpsAgent = new Ka.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return s(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers = globalThis.Headers || d;
const AbortController$1 = globalThis.AbortController || A;
const ofetch = createFetch({ fetch, Headers, AbortController: AbortController$1 });
const $fetch = ofetch;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.8.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a2, _b2;
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    if (((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext) && ((_b2 = plugin2.env) == null ? void 0 : _b2.islands) === false) {
      continue;
    }
    const promise = applyPlugin(nuxtApp, plugin2);
    if (plugin2.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  var _a2;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig() {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k2, v]) => {
        if (k2 === "titleTemplate" || k2.startsWith("on"))
          return [k2, unref(v)];
        return [k2, resolveUnrefHeadInput(v, k2)];
      })
    );
  }
  return root;
}
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a2;
  return (_a2 = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": true };
const fetchDefaults = {};
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!_isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (_isPlainObject(value) && _isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function _isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const unhead_O0UIsrbPKm = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const _routes = [
  {
    name: "about",
    path: "/about",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/about-23a8269b.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-d7cbd687.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a2;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a2 = useRouter().options) == null ? void 0 : _a2.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(from, to) {
  return to.path !== from.path || JSON.stringify(from.params) !== JSON.stringify(to.params);
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b2;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b2 = routerOptions.routes) == null ? void 0 : _b2.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a3;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a3 = routerOptions.scrollBehavior) == null ? void 0 : _a3.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a3, _b3, _c, _d;
      if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a3, _b3;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      var _a3;
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0 && !((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_9KivMhyHNf = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_O0UIsrbPKm,
  plugin,
  revive_payload_server_9KivMhyHNf,
  components_plugin_KR1HBZs4kY
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a2;
    return props ? h(component, props, slots) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
  } };
};
const layouts = {
  default: () => import('./_nuxt/default-7dbbf9a5.mjs').then((m) => m.default || m)
};
const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            // @ts-expect-error seems to be an issue in vue types
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = /* @__PURE__ */ defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a2, _b2;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b2 = (_a2 = context.slots).default) == null ? void 0 : _b2.call(_a2);
      }
      return h(
        // @ts-expect-error seems to be an issue in vue types
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, {
                // @ts-expect-error seems to be an issue in vue types
                default: () => h(RouteProvider, {
                  key,
                  vnode: routeProps.Component,
                  route: routeProps.route,
                  renderKey: key,
                  trackRootNodes: hasTransition,
                  vnodeRef: pageRef
                })
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.8.0_less@4.2.0_vite@4.5.0/node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h2>${ssrInterpolate(__props.error.statusCode)}</h2><button>清除错误</button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-67ac014a.mjs').then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.8.0_less@4.2.0_vite@4.5.0/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, asyncDataDefaults as a, useRouter as b, createError as c, dr as d, entry$1 as default, parseQuery as e, fetchDefaults as f, withTrailingSlash as g, hasProtocol as h, injectHead as i, withoutTrailingSlash as j, navigateTo as k, nuxtLinkDefaults as n, parseURL as p, resolveUnrefHeadInput as r, useNuxtApp as u, wn as w };
//# sourceMappingURL=server.mjs.map
