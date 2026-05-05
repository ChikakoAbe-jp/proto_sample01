// =========================================================
// HACCO Shop screens — Products list, Product detail, Cart
// =========================================================

function ProductsScreen({ device }) {
  const { go, PRODUCTS, BREWERIES, TASTES, STYLES, fav, favs } = useApp();
  const [selectedTastes, setT] = React.useState([]);
  const [selectedStyles, setS] = React.useState([]);
  const [selectedBrews, setB] = React.useState([]);
  const [price, setP] = React.useState('all');
  const [sort, setSort] = React.useState('new');
  const [drawerOpen, setDrawer] = React.useState(false);

  const toggle = (arr, set, v) => set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);

  const filtered = React.useMemo(()=>{
    let list = [...PRODUCTS];
    if (selectedTastes.length) list = list.filter(p=> p.tastes.some(t=>selectedTastes.includes(t)));
    if (selectedStyles.length) list = list.filter(p=> selectedStyles.includes(p.style));
    if (selectedBrews.length) list = list.filter(p=> selectedBrews.includes(p.brewery.id));
    if (price==='lo') list = list.filter(p=> p.price<1000);
    else if (price==='mid') list = list.filter(p=> p.price>=1000 && p.price<2000);
    else if (price==='hi') list = list.filter(p=> p.price>=2000);
    if (sort==='lo') list.sort((a,b)=>a.price-b.price);
    else if (sort==='hi') list.sort((a,b)=>b.price-a.price);
    return list;
  }, [selectedTastes, selectedStyles, selectedBrews, price, sort]);

  const reset = () => { setT([]); setS([]); setB([]); setP('all'); };

  const FilterBlock = () => (
    <div style={{fontSize:13}}>
      <div style={{marginBottom:32}}>
        <div className="eng-caps" style={{marginBottom:14}}>TASTE</div>
        {TASTES.map(t=>(
          <label key={t} className="checkbox" style={{marginBottom:10}}>
            <input type="checkbox" checked={selectedTastes.includes(t)} onChange={()=>toggle(selectedTastes,setT,t)}/>
            <span>{t}</span>
          </label>
        ))}
      </div>
      <div style={{marginBottom:32}}>
        <div className="eng-caps" style={{marginBottom:14}}>STYLE</div>
        {STYLES.map(t=>(
          <label key={t} className="checkbox" style={{marginBottom:10}}>
            <input type="checkbox" checked={selectedStyles.includes(t)} onChange={()=>toggle(selectedStyles,setS,t)}/>
            <span>{t}</span>
          </label>
        ))}
      </div>
      <div style={{marginBottom:32}}>
        <div className="eng-caps" style={{marginBottom:14}}>BREWERY</div>
        {BREWERIES.map(b=>(
          <label key={b.id} className="checkbox" style={{marginBottom:10}}>
            <input type="checkbox" checked={selectedBrews.includes(b.id)} onChange={()=>toggle(selectedBrews,setB,b.id)}/>
            <span>{b.name}</span>
          </label>
        ))}
      </div>
      <div style={{marginBottom:24}}>
        <div className="eng-caps" style={{marginBottom:14}}>PRICE</div>
        {[['all','すべて'],['lo','〜1,000円'],['mid','1,000〜2,000円'],['hi','2,000円〜']].map(([k,l])=>(
          <label key={k} className="checkbox" style={{marginBottom:10}}>
            <input type="radio" checked={price===k} onChange={()=>setP(k)} style={{accentColor:'var(--amber)'}}/>
            <span>{l}</span>
          </label>
        ))}
      </div>
      <a className="link" onClick={reset} style={{cursor:'pointer'}}>リセット</a>
    </div>
  );

  return (
    <div>
      <div className="container">
        <Crumbs go={go} items={[{label:'ホーム',k:'home'},{label:'商品一覧'}]}/>
        <div style={{padding: device==='sp'?'8px 0 24px':'24px 0 48px'}}>
          <span className="eng-caps">PRODUCTS</span>
          <h1 className="serif" style={{fontSize: device==='sp'?28:40, fontWeight:500, margin:'8px 0 12px', letterSpacing:'0.06em'}}>すべてのビール</h1>
          <p className="muted" style={{margin:0}}>全国30のブルワリーから、選び抜いた一本を。</p>
        </div>
      </div>

      <div className="container" style={{paddingBottom:80}}>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'240px 1fr', gap: device==='sp'?16:48}}>
          {device==='pc' && <aside><FilterBlock/></aside>}
          <main>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'16px 0', marginBottom:32}}>
              <div className="small">
                {device==='sp' && <button className="btn btn-sm btn-ghost" style={{marginRight:12}} onClick={()=>setDrawer(true)}>絞り込む</button>}
                <span className="muted">{filtered.length} 件の商品</span>
              </div>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{border:0, background:'transparent', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.1em'}}>
                <option value="new">NEW ARRIVAL</option>
                <option value="lo">PRICE — LOW TO HIGH</option>
                <option value="hi">PRICE — HIGH TO LOW</option>
                <option value="pop">POPULAR</option>
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(3,1fr)', gap: device==='sp'?16:32, rowGap: device==='sp'?32:56}}>
              {filtered.map(p=> <PCard key={p.id} p={p} onClick={()=>go('product/'+p.id)} onFav={()=>fav(p.id)} faved={favs.includes(p.id)}/>)}
            </div>
            {filtered.length===0 && <div className="center muted" style={{padding:80}}>該当する商品がありません</div>}
          </main>
        </div>
      </div>

      {device==='sp' && drawerOpen && (
        <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', zIndex:300, display:'flex', justifyContent:'flex-end'}} onClick={()=>setDrawer(false)}>
          <div style={{background:'var(--bg)', width:'85%', height:'100%', padding:24, overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <div className="between" style={{marginBottom:24}}>
              <h3 className="serif" style={{fontSize:18, margin:0}}>絞り込む</h3>
              <button onClick={()=>setDrawer(false)} style={{background:'transparent', border:0}}>{Ico.close()}</button>
            </div>
            <FilterBlock/>
            <button className="btn btn-amber btn-block" style={{marginTop:24}} onClick={()=>setDrawer(false)}>結果を見る（{filtered.length}件）</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----- Taste meter bar -----
function Meter({ label, value }) {
  return (
    <div style={{marginBottom:14}}>
      <div className="between" style={{marginBottom:6}}>
        <span className="small muted">{label}</span>
        <span className="mono small" style={{color:'var(--ink-low)'}}>{value}/5</span>
      </div>
      <div style={{display:'flex', gap:4}}>
        {[1,2,3,4,5].map(i=>(
          <div key={i} style={{flex:1, height:8, background: i<=value?'var(--amber)':'var(--line)'}}/>
        ))}
      </div>
    </div>
  );
}

function ProductDetailScreen({ device, productId }) {
  const { go, PRODUCTS, addCart, fav, favs } = useApp();
  const p = PRODUCTS.find(x=>x.id===productId) || PRODUCTS[0];
  const [qty, setQty] = React.useState(1);
  const related = PRODUCTS.filter(x=> x.id!==p.id && x.brewery.id===p.brewery.id).slice(0,4);
  const related2 = PRODUCTS.filter(x=> x.id!==p.id).slice(0,4);

  return (
    <div>
      <div className="container">
        <Crumbs go={go} items={[{label:'ホーム',k:'home'},{label:'商品一覧',k:'products'},{label:p.name}]}/>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1.05fr 1fr', gap: device==='sp'?32:64, padding: device==='sp'?'8px 0 56px':'24px 0 96px'}}>
          {/* Gallery */}
          <div>
            <div style={{aspectRatio:'1/1', background:'var(--bg-warm)', marginBottom:12, overflow:'hidden'}}>
              <img src={p.img} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
              {[p.img, window.HACCO.IMG.pour1, window.HACCO.IMG.brewery, window.HACCO.IMG.hops].map((u,i)=>(
                <div key={i} style={{aspectRatio:'1/1', background:`url(${u}) center/cover`, opacity: i===0?1:0.85, border: i===0?'1px solid var(--ink)':'1px solid var(--line)', cursor:'pointer'}}/>
              ))}
            </div>
          </div>
          {/* Buy area */}
          <div>
            <div className="eng-caps" style={{marginBottom:8}}>{p.brewery.en}</div>
            <h1 className="serif" style={{fontSize: device==='sp'?28:36, fontWeight:500, margin:'0 0 16px', letterSpacing:'0.04em', lineHeight:1.4}}>{p.name}</h1>
            <div className="display" style={{fontSize:32, fontWeight:500, marginBottom:8}}>¥{p.price.toLocaleString()}<span style={{fontSize:13, color:'var(--ink-low)', marginLeft:6, fontFamily:'var(--sans)'}}>税込</span></div>
            <div className="small muted" style={{marginBottom:24}}>送料 ¥650 / 5,000円以上のご注文で送料無料</div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0, border:'1px solid var(--line)', marginBottom:32}}>
              {[['容量', p.vol+'ml'],['アルコール度数', p.abv+'%'],['スタイル', p.style]].map(([k,v],i)=>(
                <div key={k} style={{padding:'14px 16px', borderRight: i<2?'1px solid var(--line)':'none', textAlign:'center'}}>
                  <div className="small muted" style={{marginBottom:4, fontSize:10, letterSpacing:'0.1em'}}>{k}</div>
                  <div className="serif" style={{fontSize:14}}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:24}}>
              {p.tastes.map(t=> <span key={t} className="tag">{t}</span>)}
            </div>

            <div className="between" style={{marginBottom:20}}>
              <span className="small muted">数量</span>
              <Qty value={qty} onChange={setQty}/>
            </div>
            <button className="btn btn-amber btn-block btn-lg" onClick={()=>{ addCart(p.id, qty); go('cart'); }}>
              カートに追加　{Ico.arrow()}
            </button>
            <div className="center" style={{marginTop:16}}>
              <a className="link" style={{borderColor:'var(--ink-low)', color:'var(--ink-mid)', cursor:'pointer'}} onClick={()=>fav(p.id)}>
                {favs.includes(p.id)?'♥ お気に入りに追加済み':'♡ お気に入りに追加'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tasting notes */}
      <section style={{background:'var(--bg-warm)', padding: device==='sp'?'56px 0':'96px 0'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1fr 1fr', gap:48}}>
            <div>
              <span className="eng-caps">TASTING NOTE</span>
              <h2 className="serif" style={{fontSize:24, fontWeight:500, margin:'12px 0 24px', letterSpacing:'0.06em'}}>風味の輪郭</h2>
              <p style={{lineHeight:2, color:'var(--ink-mid)'}}>{p.note}</p>
              <div style={{marginTop:32}}>
                <Meter label="苦み" value={p.bitter}/>
                <Meter label="甘み" value={p.sweet}/>
                <Meter label="コク" value={p.body}/>
              </div>
            </div>
            <div>
              <span className="eng-caps">PAIRING</span>
              <h2 className="serif" style={{fontSize:24, fontWeight:500, margin:'12px 0 24px', letterSpacing:'0.06em'}}>合わせる食卓</h2>
              <ul style={{listStyle:'none', padding:0, margin:'0 0 32px'}}>
                {p.pairing.map(x=>(
                  <li key={x} style={{padding:'14px 0', borderTop:'1px solid var(--line-strong)', display:'flex', alignItems:'center', gap:14}}>
                    <span style={{width:32, height:32, background:'var(--bg)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--display)', fontSize:13, color:'var(--amber-deep)'}}>·</span>
                    <span>{x}</span>
                  </li>
                ))}
                <li style={{padding:'14px 0', borderTop:'1px solid var(--line-strong)', borderBottom:'1px solid var(--line-strong)'}}/>
              </ul>
              <div className="small" style={{lineHeight:2}}>
                <div className="between"><span className="muted">原材料</span><span>{p.material}</span></div>
                <div className="between"><span className="muted">賞味期限</span><span>{p.best}</span></div>
                <div className="between"><span className="muted">保存方法</span><span>10°C以下・冷暗所</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brewery */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1fr 1.4fr', gap:48, alignItems:'center'}}>
            <div style={{aspectRatio:'4/5', background:`url(${window.HACCO.IMG.brewery}) center/cover`}}/>
            <div>
              <span className="eng-caps">BREWERY</span>
              <h2 className="serif" style={{fontSize:28, fontWeight:500, margin:'12px 0 8px', letterSpacing:'0.06em'}}>{p.brewery.name}</h2>
              <div className="small muted" style={{marginBottom:24}}>{p.brewery.area} · 創業 {p.brewery.founded}年</div>
              <p style={{lineHeight:2, marginBottom:32}}>{p.brewery.blurb}HACCOでは、現地での仕込みからお届けまで、醸造家のこだわりをそのままお伝えします。</p>
              <a className="link" onClick={()=>go('breweries')}>このブルワリーのビールを見る　→</a>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{paddingBottom: device==='sp'?56:96}}>
        <div className="container">
          <div className="section-head"><div><span className="eng-caps">RELATED</span><h2>同じブルワリーの商品</h2></div></div>
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap: device==='sp'?16:32}}>
            {(related.length>0?related:related2).map(rp=> <PCard key={rp.id} p={rp} onClick={()=>{ go('product/'+rp.id); window.scrollTo(0,0); }}/>)}
          </div>
        </div>
      </section>
    </div>
  );
}

function CartScreen({ device }) {
  const { go, PRODUCTS, cart, setCart } = useApp();
  const [gift, setGift] = React.useState(false);
  const [noshi, setNoshi] = React.useState('');

  const items = cart.map(c=> ({ ...c, p: PRODUCTS.find(p=>p.id===c.id) })).filter(x=>x.p);
  const subtotal = items.reduce((a,b)=> a + b.p.price*b.qty, 0);
  const giftFee = gift ? 500 : 0;
  const ship = subtotal>=5000 ? 0 : 650;
  const total = subtotal + giftFee + ship;

  const update = (id, qty) => setCart(prev=> qty<=0 ? prev.filter(c=>c.id!==id) : prev.map(c=> c.id===id?{...c,qty}:c));

  return (
    <div>
      <div className="container">
        <Crumbs go={go} items={[{label:'ホーム',k:'home'},{label:'カート'}]}/>
        <div style={{padding:'8px 0 32px'}}>
          <span className="eng-caps">SHOPPING CART</span>
          <h1 className="serif" style={{fontSize: device==='sp'?28:40, fontWeight:500, margin:'8px 0 0', letterSpacing:'0.06em'}}>カート</h1>
        </div>
      </div>

      <div className="container" style={{paddingBottom:96}}>
        {items.length===0 ? (
          <div className="center" style={{padding:'80px 0'}}>
            <p className="muted" style={{marginBottom:24}}>カートに商品はありません</p>
            <button className="btn btn-amber" onClick={()=>go('products')}>商品を探す</button>
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1.6fr 1fr', gap:48}}>
            <div>
              <div style={{borderTop:'1px solid var(--line)'}}>
                {items.map(({p,qty,id})=>(
                  <div key={id} style={{display:'grid', gridTemplateColumns:'100px 1fr auto', gap:20, padding:'24px 0', borderBottom:'1px solid var(--line)', alignItems:'center'}}>
                    <div style={{aspectRatio:'1/1', background:`url(${p.img}) center/cover`}}/>
                    <div>
                      <div className="eng-caps" style={{fontSize:9, marginBottom:4}}>{p.brewery.en}</div>
                      <div className="serif" style={{fontSize:15, marginBottom:8, lineHeight:1.5}}>{p.name}</div>
                      <div className="display" style={{fontSize:16}}>¥{p.price.toLocaleString()}</div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:12}}>
                      <Qty value={qty} onChange={(v)=>update(id,v)}/>
                      <button onClick={()=>update(id,0)} style={{background:'transparent', border:0, color:'var(--ink-low)', fontSize:11, letterSpacing:'0.06em', cursor:'pointer'}}>削除</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:32, padding:24, border:'1px solid var(--line)', background:'var(--bg-warm)'}}>
                <label className="checkbox" style={{marginBottom:gift?16:0}}>
                  <input type="checkbox" checked={gift} onChange={e=>setGift(e.target.checked)}/>
                  <span>
                    <strong>ギフトラッピング</strong>（+¥500）<br/>
                    <span className="small muted">和紙ベースの上品なラッピングでお包みします</span>
                  </span>
                </label>
                {gift && (
                  <div style={{paddingLeft:30, marginTop:12}}>
                    <label className="small muted" style={{display:'block', marginBottom:8}}>熨斗（名入れ・任意）</label>
                    <input type="text" placeholder="例：御祝　山田太郎" value={noshi} onChange={e=>setNoshi(e.target.value)} style={{width:'100%', padding:'10px 12px', border:'1px solid var(--line-strong)', background:'white', fontFamily:'var(--serif)'}}/>
                  </div>
                )}
              </div>
            </div>

            <aside>
              <div style={{padding:24, background:'var(--bg-warm)', position: device==='pc'?'sticky':'static', top: 96}}>
                <h3 className="serif" style={{fontSize:18, fontWeight:500, margin:'0 0 24px', paddingBottom:16, borderBottom:'1px solid var(--line-strong)'}}>注文内容</h3>
                <div className="between small" style={{marginBottom:12}}><span className="muted">小計</span><span>¥{subtotal.toLocaleString()}</span></div>
                {gift && <div className="between small" style={{marginBottom:12}}><span className="muted">ギフト</span><span>¥{giftFee}</span></div>}
                <div className="between small" style={{marginBottom:16}}><span className="muted">送料</span><span>{ship===0?'無料':'¥'+ship}</span></div>
                {ship>0 && <div className="small muted" style={{padding:12, background:'var(--bg)', marginBottom:16, fontSize:11}}>あと <strong style={{color:'var(--amber)'}}>¥{(5000-subtotal).toLocaleString()}</strong> で送料無料</div>}
                <div className="between" style={{padding:'16px 0', borderTop:'1px solid var(--line-strong)', marginBottom:24}}>
                  <span className="serif" style={{fontSize:15}}>合計</span>
                  <span className="display" style={{fontSize:24}}>¥{total.toLocaleString()}</span>
                </div>
                <button className="btn btn-amber btn-block" onClick={()=>go('checkout')}>購入手続きへ　{Ico.arrow()}</button>
                <a className="small muted" onClick={()=>go('products')} style={{display:'block', textAlign:'center', marginTop:16, cursor:'pointer'}}>← お買い物を続ける</a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ProductsScreen, ProductDetailScreen, CartScreen });
