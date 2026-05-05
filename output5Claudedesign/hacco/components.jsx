// =========================================================
// HACCO Common Components
// =========================================================
const { useState, useEffect, useMemo, useRef, useContext, createContext } = React;

// ----- Icons -----
const Ico = {
  heart: (f) => <svg width="20" height="20" viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="1.4"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>,
  bag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>,
  user: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></svg>,
  search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  arrowL: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M19 12H5M11 6 5 12l6 6"/></svg>,
  check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 5 5 9-11"/></svg>,
  close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg>,
  plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg>,
  minus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14"/></svg>,
};

// ----- App Context -----
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

// ----- Header -----
function Header({ device }) {
  const { route, go, cart, favs } = useApp();
  const cartCount = cart.reduce((a,b)=>a+b.qty,0);
  const navItems = [
    { k:'products', label:'商品一覧' },
    { k:'taste-quiz', label:'テイスト診断' },
    { k:'breweries', label:'ブルワリー' },
  ];
  return (
    <header className="gh">
      <div className="gh-inner">
        {device==='sp' && <button className="gh-burger" aria-label="menu"><span/><span/><span/></button>}
        <a className="gh-logo" onClick={()=>go('home')}><span>HACCO</span><span className="dot">.</span></a>
        {device==='pc' && (
          <nav className="gh-nav">
            {navItems.map(it=>(
              <a key={it.k} onClick={()=>go(it.k)} className={route.startsWith(it.k)?'active':''}>{it.label}</a>
            ))}
          </nav>
        )}
        <div className="gh-icons">
          {device==='pc' && <button aria-label="search">{Ico.search()}</button>}
          <button aria-label="favs" onClick={()=>go('mypage')}>
            {Ico.heart()}
            {favs.length>0 && <span className="badge">{favs.length}</span>}
          </button>
          <button aria-label="cart" onClick={()=>go('cart')}>
            {Ico.bag()}
            {cartCount>0 && <span className="badge">{cartCount}</span>}
          </button>
          {device==='pc' && <button aria-label="account" onClick={()=>go('login')}>{Ico.user()}</button>}
        </div>
      </div>
    </header>
  );
}

// ----- Footer -----
function Footer() {
  return (
    <footer className="gf">
      <div className="container">
        <div className="gf-grid">
          <div>
            <div className="gf-logo">HACCO.</div>
            <p className="tag-line">日本のクラフトビールと、出会う。<br/>全国の小さな醸造所から、あなたの一本を。</p>
          </div>
          <div>
            <h4>SHOP</h4>
            <ul><li>商品一覧</li><li>テイスト診断</li><li>ブルワリー一覧</li><li>ギフト</li><li>定期便</li></ul>
          </div>
          <div>
            <h4>ABOUT</h4>
            <ul><li>HACCOとは</li><li>ブログ</li><li>採用情報</li><li>お問い合わせ</li></ul>
          </div>
          <div>
            <h4>HELP</h4>
            <ul><li>送料・配送について</li><li>返品ポリシー</li><li>よくある質問</li><li>ログイン / 会員登録</li></ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 HACCO Inc. ALL RIGHTS RESERVED.</span>
          <span>酒類販売業免許 — 関東信越国税局指令 第 12345 号</span>
          <span>特定商取引法 / プライバシーポリシー / 利用規約</span>
        </div>
      </div>
    </footer>
  );
}

// ----- Product Card -----
function PCard({ p, onClick, onFav, faved }) {
  return (
    <a className="pcard" onClick={onClick}>
      <div className="img-wrap">
        <img src={p.img} alt={p.name}/>
        <button className="heart" onClick={(e)=>{e.stopPropagation(); onFav&&onFav();}} style={{color: faved?'#B8533A':'#5C544B'}}>{Ico.heart(faved)}</button>
      </div>
      <div className="meta">
        <div className="brewery">{p.brewery.en}</div>
        <h3 className="name">{p.name}</h3>
        <div className="tags">{p.tastes.map(t=> <span key={t} className="tag">{t}</span>)}<span className="tag">{p.style}</span></div>
        <div className="price">¥{p.price.toLocaleString()}<small>税込</small></div>
      </div>
    </a>
  );
}

// ----- Age Gate -----
function AgeGate({ onYes, onNo }) {
  return (
    <div className="modal-bg">
      <div className="modal-card">
        <div className="display-large">HACCO.</div>
        <div className="eng-caps">AGE VERIFICATION</div>
        <h3>20歳以上ですか？</h3>
        <p>HACCO はクラフトビールを販売するオンラインストアです。<br/>未成年者の飲酒は法律で禁止されています。<br/>下記の確認にご協力ください。</p>
        <div className="btn-row">
          <button className="btn btn-amber btn-block" onClick={onYes}>はい、20歳以上です</button>
          <button className="btn btn-ghost btn-block" onClick={onNo}>いいえ</button>
        </div>
      </div>
    </div>
  );
}

// ----- Breadcrumb -----
function Crumbs({ items, go }) {
  return (
    <div style={{padding:'20px 0', fontSize:12, color:'var(--ink-mid)', letterSpacing:'0.06em'}}>
      {items.map((it,i)=>(
        <span key={i}>
          {i>0 && <span style={{margin:'0 10px', color:'var(--ink-low)'}}>/</span>}
          {it.k ? <a onClick={()=>go(it.k)} style={{cursor:'pointer'}}>{it.label}</a> : <span style={{color:'var(--ink)'}}>{it.label}</span>}
        </span>
      ))}
    </div>
  );
}

// ----- Quantity -----
function Qty({ value, onChange, min=1, max=99 }) {
  return (
    <div style={{display:'inline-flex', border:'1px solid var(--line-strong)'}}>
      <button onClick={()=>onChange(Math.max(min, value-1))} style={{background:'transparent', border:0, padding:'10px 14px'}}>{Ico.minus()}</button>
      <span style={{padding:'10px 18px', minWidth:48, textAlign:'center', fontFamily:'var(--display)', fontSize:16}}>{value}</span>
      <button onClick={()=>onChange(Math.min(max, value+1))} style={{background:'transparent', border:0, padding:'10px 14px'}}>{Ico.plus()}</button>
    </div>
  );
}

Object.assign(window, { Ico, AppCtx, useApp, Header, Footer, PCard, AgeGate, Crumbs, Qty });
