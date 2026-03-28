/* MiniSearch inline - no CDN needed */
class MiniSearch {
  constructor(opts) {
    this._fields = opts.fields || [];
    this._store  = opts.storeFields || [];
    this._docs   = [];
    this._idx    = new Map();
  }
  _tokenize(str) {
    return String(str).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9 ]/g,' ')
      .split(' ').filter(t => t.length > 1);
  }
  addAll(docs) {
    for (const doc of docs) {
      const stored = { id: doc.id };
      for (const f of this._store) stored[f] = doc[f];
      this._docs[doc.id] = stored;
      const tokens = new Set();
      for (const f of this._fields) {
        if (doc[f]) for (const t of this._tokenize(doc[f])) tokens.add(t);
      }
      for (const t of tokens) {
        if (!this._idx.has(t)) this._idx.set(t, new Set());
        this._idx.get(t).add(doc.id);
      }
    }
  }
  search(query, opts) {
    const limit = (opts && opts.limit) || 20;
    const terms = this._tokenize(query);
    if (!terms.length) return [];
    const scores = new Map();
    for (const term of terms) {
      for (const [tok, ids] of this._idx) {
        if (tok === term || tok.startsWith(term)) {
          const w = tok === term ? 2 : 1;
          for (const id of ids) scores.set(id, (scores.get(id) || 0) + w);
        }
      }
    }
    return [...scores.entries()]
      .sort((a,b) => b[1]-a[1]).slice(0, limit)
      .map(([id]) => Object.assign({}, this._docs[id]));
  }
}