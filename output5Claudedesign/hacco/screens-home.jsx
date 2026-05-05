// =========================================================
// HACCO Home Screens — 3 Variations
// =========================================================
const { useState: useStateH } = React;

// ---------- Variation A: 王道伊勢丹型 ----------
function HomeA({ device }) {
  const { go, PRODUCTS, BREWERIES, IMG, fav, favs } = useApp();
  return (
    <div>
      {/* Hero */}
      <section style={{position:'relative', height: device==='sp'?520:680, overflow:'hidden'}}>
        <img src={IMG.hero1} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}/>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(31,26,20,0.05) 0%, rgba(31,26,20,0.55) 100%)'}}/>
        <div className="container" style={{position:'relative', height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom: device==='sp'?56:96, color:'#F5EFE3'}}>
          <div className="eng-caps" style={{color:'#E8D9B8', marginBottom:16}}>HACCO — AUTUMN COLLECTION</div>
          <h1 className="serif" style={{fontSize: device==='sp'?38:72, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em', lineHeight:1.2}}>
            日本のクラフトビールと、<br/>出会う。
          </h1>
          <p style={{fontSize: device==='sp'?14:16, lineHeight:1.9, maxWidth:520, margin:'0 0 36px', color:'#E8D9B8'}}>
            全国30のブルワリーから、あなたの一本を。<br/>季節の風と土地の物語を、一杯のグラスへ。
          </p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <button className="btn btn-amber" onClick={()=>go('products')}>ビールを探す　{Ico.arrow()}</button>
            <button className="btn btn-ghost" style={{color:'#F5EFE3', borderColor:'#F5EFE3'}} onClick={()=>go('taste-quiz')}>テイスト診断</button>
          </div>
        </div>
      </section>

      {/* Recommend */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eng-caps">FEATURED</span>
              <h2>今月のおすすめ</h2>
            </div>
            <a className="link" onClick={()=>go('products')}>すべて見る　→</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap: device==='sp'?16:32}}>
            {PRODUCTS.slice(0,4).map(p=> <PCard key={p.id} p={p} onClick={()=>go('product/'+p.id)} onFav={()=>fav(p.id)} faved={favs.includes(p.id)}/>)}
          </div>
        </div>
      </section>

      {/* Quiz Banner */}
      <section style={{padding: device==='sp'?'56px 0':'80px 0', background:'var(--bg-warm)'}}>
        <div className="container" style={{display: device==='sp'?'block':'flex', alignItems:'center', justifyContent:'space-between', gap:48}}>
          <div style={{flex:1}}>
            <span className="eng-caps">TASTE QUIZ</span>
            <h2 className="serif" style={{fontSize: device==='sp'?28:36, margin:'12px 0 16px', fontWeight:500, letterSpacing:'0.06em'}}>好みのビールが、わからない方へ。</h2>
            <p className="muted" style={{maxWidth:520, marginBottom:24}}>4つの簡単な質問に答えるだけ。あなたの好みに合うクラフトビールをHACCOがご提案します。</p>
            <button className="btn btn-amber" onClick={()=>go('taste-quiz')}>テイスト診断をはじめる　{Ico.arrow()}</button>
          </div>
          <div style={{flex:1, marginTop: device==='sp'?32:0}}>
            <div style={{aspectRatio:'4/3', background:`url(${IMG.hops}) center/cover`}}/>
          </div>
        </div>
      </section>

      {/* Two-column features */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1fr 1fr', gap: device==='sp'?40:48}}>
            <div>
              <div style={{aspectRatio:'4/5', background:`url(${IMG.gift}) center/cover`, marginBottom:24}}/>
              <span className="eng-caps">GIFT</span>
              <h3 className="serif" style={{fontSize:24, fontWeight:500, margin:'8px 0 12px'}}>大切な人へ、贈る一本。</h3>
              <p className="muted" style={{marginBottom:16}}>熨斗・ラッピング無料対応。父の日や記念日に、ビール好きを唸らせるギフトを。</p>
              <a className="link" onClick={()=>go('products')}>ギフト特集を見る　→</a>
            </div>
            <div>
              <div style={{aspectRatio:'4/5', background:`url(${IMG.brewery}) center/cover`, marginBottom:24}}/>
              <span className="eng-caps">NEW ARRIVAL</span>
              <h3 className="serif" style={{fontSize:24, fontWeight:500, margin:'8px 0 12px'}}>今月の新着ビール。</h3>
              <p className="muted" style={{marginBottom:16}}>季節限定や醸造所の最新作を、入荷次第お届け。</p>
              <a className="link" onClick={()=>go('products')}>新着を見る　→</a>
            </div>
          </div>
        </div>
      </section>

      {/* Breweries */}
      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <div className="section-head">
            <div><span className="eng-caps">BREWERIES</span><h2>参加ブルワリー</h2></div>
            <a className="link" onClick={()=>go('breweries')}>すべて見る　→</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap: 1, background:'var(--line)', border:'1px solid var(--line)'}}>
            {BREWERIES.map(b=>(
              <div key={b.id} style={{background:'var(--bg)', padding:'40px 24px', textAlign:'center', cursor:'pointer'}}>
                <div className="eng-caps" style={{marginBottom:8, fontSize:9}}>{b.en}</div>
                <div className="serif" style={{fontSize:15, marginBottom:6}}>{b.name}</div>
                <div className="small muted">{b.area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Variation B: マガジン型 ----------
function HomeB({ device }) {
  const { go, PRODUCTS, BREWERIES, IMG, fav, favs } = useApp();
  return (
    <div>
      {/* Editorial hero — split */}
      <section className="container" style={{padding: device==='sp'?'40px 20px':'80px 32px 40px'}}>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1.1fr 1fr', gap: device==='sp'?32:64, alignItems:'center'}}>
          <div>
            <div className="eng-caps" style={{marginBottom:24}}>ISSUE 03  ·  AUTUMN 2026</div>
            <h1 className="serif" style={{fontSize: device==='sp'?40:80, fontWeight:400, lineHeight:1.15, margin:'0 0 32px', letterSpacing:'0.04em'}}>
              小さな醸造所が、<br/>大きな物語を醸す。
            </h1>
            <p style={{fontSize:15, lineHeight:2, maxWidth:480, marginBottom:32, color:'var(--ink-mid)'}}>
              北海道から沖縄まで、地域の風土と職人の手仕事から生まれる日本のクラフトビール。HACCOは、その一本一本に宿る物語ごとお届けします。
            </p>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <button className="btn" onClick={()=>go('products')}>商品を見る　{Ico.arrow()}</button>
              <button className="btn btn-ghost" onClick={()=>go('breweries')}>ブルワリー一覧</button>
            </div>
          </div>
          <div>
            <div style={{aspectRatio:'3/4', background:`url(${IMG.pour1}) center/cover`}}/>
            <div className="mono small" style={{marginTop:12, color:'var(--ink-low)'}}>— Photo: 六甲山ブルーイング 2026春</div>
          </div>
        </div>
      </section>

      {/* Index strip */}
      <section style={{borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'20px 0', background:'var(--bg-warm)'}}>
        <div className="container" style={{display:'flex', gap:40, overflow:'auto', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.1em', color:'var(--ink-mid)'}}>
          <span>01 — FEATURED</span>
          <span>02 — TASTE GUIDE</span>
          <span>03 — BREWERIES</span>
          <span>04 — GIFT</span>
          <span>05 — JOURNAL</span>
        </div>
      </section>

      {/* Featured grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eng-caps">01 — FEATURED</span><h2>編集部のおすすめ、4本。</h2></div>
            <a className="link" onClick={()=>go('products')}>もっと見る　→</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap: device==='sp'?16:32}}>
            {PRODUCTS.slice(0,4).map(p=> <PCard key={p.id} p={p} onClick={()=>go('product/'+p.id)} onFav={()=>fav(p.id)} faved={favs.includes(p.id)}/>)}
          </div>
        </div>
      </section>

      {/* Big feature article */}
      <section style={{background:'var(--bg-deep)', color:'#E8D9B8', padding: device==='sp'?'56px 0':'96px 0'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1fr 1fr', gap: 48, alignItems:'center'}}>
          <div style={{aspectRatio:'4/5', background:`url(${IMG.brewery}) center/cover`}}/>
          <div>
            <div className="eng-caps" style={{color:'#C9A24A', marginBottom:16}}>02 — JOURNAL</div>
            <h3 className="serif" style={{fontSize: device==='sp'?28:40, fontWeight:400, lineHeight:1.4, margin:'0 0 24px', color:'#F5EFE3'}}>
              麦と水と、<br/>ひとの手から。
            </h3>
            <p style={{lineHeight:2, marginBottom:24}}>長野県松本市、標高800mの森の中にある「森と樽 醸造所」。仕込み水は近くの湧き水、樽は信州産のオーク。地域の素材だけで醸される一杯には、その土地の四季が詰まっています。</p>
            <a className="link" style={{color:'#F5EFE3', borderColor:'#C9A24A'}}>記事を読む　→</a>
          </div>
        </div>
      </section>

      {/* Breweries map */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eng-caps">03 — BREWERIES</span><h2>30の醸造所、それぞれの土地。</h2></div>
            <a className="link" onClick={()=>go('breweries')}>地図で見る　→</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap:24}}>
            {BREWERIES.map(b=>(
              <div key={b.id} style={{borderTop:'1px solid var(--ink)', paddingTop:16, cursor:'pointer'}}>
                <div className="mono" style={{fontSize:10, color:'var(--ink-low)', marginBottom:8}}>EST. {b.founded}</div>
                <div className="serif" style={{fontSize:16, marginBottom:4}}>{b.name}</div>
                <div className="small muted" style={{marginBottom:8}}>{b.area}</div>
                <p className="small" style={{color:'var(--ink-mid)', lineHeight:1.7, margin:0}}>{b.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Variation C: 写真没入型 ----------
function HomeC({ device }) {
  const { go, PRODUCTS, IMG, fav, favs } = useApp();
  return (
    <div>
      {/* Full-bleed hero */}
      <section style={{position:'relative', height: device==='sp'?640:'88vh', minHeight:600, overflow:'hidden'}}>
        <img src={IMG.glass1} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}/>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(31,26,20,0.45) 0%, transparent 50%, rgba(31,26,20,0.6) 100%)'}}/>
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', color:'#F5EFE3', width:'90%', maxWidth:900}}>
          <div className="eng-caps" style={{color:'#E8D9B8', marginBottom:24}}>JAPANESE CRAFT BEER, DELIVERED.</div>
          <h1 className="display" style={{fontSize: device==='sp'?56:140, margin:0, fontWeight:500, fontStyle:'italic', letterSpacing:'-0.01em', lineHeight:1}}>HACCO.</h1>
          <p className="serif" style={{fontSize: device==='sp'?16:20, marginTop:32, letterSpacing:'0.1em', lineHeight:1.9}}>
            日本のクラフトビールと、<br/>出会う。
          </p>
          <div style={{marginTop:48}}>
            <button className="btn btn-amber btn-lg" onClick={()=>go('products')}>BROWSE BEERS　{Ico.arrow()}</button>
          </div>
        </div>
        <div style={{position:'absolute', bottom:24, left:24, right:24, display:'flex', justifyContent:'space-between', color:'#E8D9B8', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.15em'}}>
          <span>SCROLL ↓</span>
          <span>30 BREWERIES · 200 BEERS · NATIONWIDE</span>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section center">
        <div className="container" style={{maxWidth:720}}>
          <span className="eng-caps">OUR PROMISE</span>
          <h2 className="serif" style={{fontSize: device==='sp'?28:42, fontWeight:400, lineHeight:1.5, margin:'24px 0 32px', letterSpacing:'0.04em'}}>
            醸造家の手仕事を、<br/>そのままグラスへ。
          </h2>
          <p style={{lineHeight:2.2, color:'var(--ink-mid)'}}>
            HACCOは、全国の小さなブルワリーが手がけるクラフトビールを集めたオンラインストア。<br/>
            一本一本に宿る土地の物語、醸造家のこだわり、季節の風 ―<br/>
            あなたの食卓に、新しい一杯を。
          </p>
        </div>
      </section>

      {/* Featured horizontal */}
      <section style={{padding: device==='sp'?'40px 0 80px':'40px 0 120px'}}>
        <div className="container">
          <div className="section-head">
            <div><span className="eng-caps">SELECTED</span><h2>選び抜いた、4本。</h2></div>
            <a className="link" onClick={()=>go('products')}>see all　→</a>
          </div>
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap: device==='sp'?16:24}}>
            {PRODUCTS.slice(0,4).map(p=> <PCard key={p.id} p={p} onClick={()=>go('product/'+p.id)} onFav={()=>fav(p.id)} faved={favs.includes(p.id)}/>)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:'var(--amber)', color:'#F5EFE3', padding:'80px 0'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap:32, textAlign:'center'}}>
            {[
              ['30','BREWERIES'],
              ['200+','SELECTIONS'],
              ['47','PREFECTURES'],
              ['100%','HAND-PICKED'],
            ].map(([n,l])=>(
              <div key={l}>
                <div className="display" style={{fontSize: device==='sp'?48:72, fontWeight:500, lineHeight:1}}>{n}</div>
                <div className="eng-caps" style={{color:'#F5EFE3', marginTop:8}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="section">
        <div className="container center" style={{maxWidth:640}}>
          <span className="eng-caps">TASTE QUIZ</span>
          <h2 className="serif" style={{fontSize: device==='sp'?26:36, margin:'16px 0 24px', fontWeight:500}}>
            あなたに合う、一本を見つける。
          </h2>
          <p className="muted" style={{marginBottom:32}}>4つの質問で、HACCOがあなたの好みを診断します。</p>
          <button className="btn btn-amber btn-lg" onClick={()=>go('taste-quiz')}>診断をはじめる　{Ico.arrow()}</button>
        </div>
      </section>
    </div>
  );
}

// ---------- Variation Switcher ----------
function HomeVariations({ device }) {
  const [v, setV] = useStateH('A');
  const Comp = v==='A' ? HomeA : v==='B' ? HomeB : HomeC;
  const labels = {
    A:{ key:'A — Classic Editorial', desc:'王道伊勢丹型 / 写真ヒーロー + バランス重視のセクション構成' },
    B:{ key:'B — Magazine', desc:'マガジン型 / インデックス番号・編集記事・ジャーナル風' },
    C:{ key:'C — Immersive', desc:'写真没入型 / フルブリードのドラマチックなヒーロー + 大胆なステートメント' },
  };
  return (
    <div>
      <div style={{position:'sticky', top: 'var(--header-h)', zIndex:40, background:'rgba(250,247,242,0.96)', backdropFilter:'blur(8px)', borderBottom:'1px solid var(--line)', padding:'14px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap'}}>
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            <span className="mono" style={{fontSize:10, color:'var(--ink-low)', letterSpacing:'0.15em', marginRight:12}}>HOME VARIATION</span>
            {['A','B','C'].map(k=>(
              <button key={k} onClick={()=>setV(k)} style={{padding:'8px 14px', border:'1px solid '+(v===k?'var(--ink)':'var(--line-strong)'), background: v===k?'var(--ink)':'transparent', color: v===k?'#F5EFE3':'var(--ink)', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.1em'}}>{k}</button>
            ))}
            <span className="small muted" style={{marginLeft:16}}>{labels[v].desc}</span>
          </div>
        </div>
      </div>
      <Comp device={device}/>
    </div>
  );
}

Object.assign(window, { HomeVariations });
