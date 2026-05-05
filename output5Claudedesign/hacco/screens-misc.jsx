// =========================================================
// HACCO Misc screens — Breweries, Taste Quiz, Quiz Result
// =========================================================

function BreweriesScreen({ device }) {
  const { go, BREWERIES, IMG } = useApp();
  return (
    <div>
      <div className="container">
        <Crumbs go={go} items={[{label:'ホーム',k:'home'},{label:'ブルワリー'}]}/>
        <div style={{padding:'8px 0 48px'}}>
          <span className="eng-caps">BREWERIES</span>
          <h1 className="serif" style={{fontSize: device==='sp'?28:40, fontWeight:500, margin:'8px 0 16px', letterSpacing:'0.06em'}}>参加ブルワリー一覧</h1>
          <p className="muted" style={{maxWidth:560, margin:0}}>北海道から九州まで、全国の小さな醸造所と一緒に。それぞれの土地の風土と職人のこだわりが、一杯のビールに宿ります。</p>
        </div>
      </div>
      <div className="container" style={{paddingBottom:96}}>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'repeat(2,1fr)', gap: device==='sp'?32:48}}>
          {BREWERIES.map(b=>(
            <div key={b.id} style={{cursor:'pointer'}} onClick={()=>go('products')}>
              <div style={{aspectRatio:'16/10', background:`url(${IMG.brewery}) center/cover`, marginBottom:20, filter:'sepia(0.05) brightness(0.95)'}}/>
              <div className="eng-caps" style={{marginBottom:8}}>{b.en}　·　EST. {b.founded}</div>
              <h3 className="serif" style={{fontSize:22, fontWeight:500, margin:'0 0 8px', letterSpacing:'0.04em'}}>{b.name}</h3>
              <div className="small muted" style={{marginBottom:12}}>{b.area}</div>
              <p style={{lineHeight:1.9, color:'var(--ink-mid)', marginBottom:16}}>{b.blurb}</p>
              <a className="link small">このブルワリーのビールを見る　→</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasteQuizScreen({ device }) {
  const { go, QUIZ } = useApp();
  const [step, setStep] = React.useState(0);
  const [answers, setAns] = React.useState([]);

  const choose = (tag) => {
    const next = [...answers, tag];
    setAns(next);
    if (step+1 < QUIZ.length) setStep(step+1);
    else {
      const counts = {};
      next.forEach(t=> counts[t]=(counts[t]||0)+1);
      const winner = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
      window._tasteResult = winner;
      go('taste-result');
    }
  };

  const q = QUIZ[step];
  const progress = ((step+1)/QUIZ.length)*100;

  return (
    <div className="container" style={{maxWidth:760, padding:'40px 32px 96px'}}>
      <div style={{marginBottom:48}}>
        <div className="between" style={{marginBottom:12}}>
          <span className="eng-caps">TASTE QUIZ</span>
          <span className="mono small" style={{color:'var(--ink-low)'}}>Q{step+1} / {QUIZ.length}</span>
        </div>
        <div style={{height:2, background:'var(--line)'}}>
          <div style={{height:'100%', width:progress+'%', background:'var(--amber)', transition:'width .4s'}}/>
        </div>
      </div>
      <div className="center" style={{marginBottom:56}}>
        <h2 className="serif" style={{fontSize: device==='sp'?22:32, fontWeight:500, margin:0, letterSpacing:'0.06em', lineHeight:1.6}}>
          {q.q}
        </h2>
      </div>
      <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1fr 1fr', gap:16}}>
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>choose(o.tag)} style={{padding:'32px 24px', border:'1px solid var(--line-strong)', background:'var(--bg-elev)', cursor:'pointer', fontFamily:'var(--serif)', fontSize:16, letterSpacing:'0.04em', textAlign:'left', transition:'all .2s', display:'flex', alignItems:'center', gap:16}}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--ink)'; e.currentTarget.style.background='var(--bg-warm)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--line-strong)'; e.currentTarget.style.background='var(--bg-elev)'; }}>
            <span className="display" style={{fontSize:24, color:'var(--amber)', minWidth:32}}>{String.fromCharCode(65+i)}</span>
            <span>{o.label}</span>
          </button>
        ))}
      </div>
      {step>0 && (
        <div className="center" style={{marginTop:32}}>
          <a className="small link" style={{cursor:'pointer'}} onClick={()=>{ setAns(answers.slice(0,-1)); setStep(step-1); }}>← 前の質問に戻る</a>
        </div>
      )}
    </div>
  );
}

function TasteResultScreen({ device }) {
  const { go, PRODUCTS } = useApp();
  const winner = window._tasteResult || 'フルーティ';
  const profiles = {
    'フルーティ':{ title:'フルーティ・ホップ派', en:'FRUITY HOP TYPE', desc:'柑橘やトロピカルフルーツのような華やかな香りに惹かれるあなた。明るく伸びやかなホップの個性を、ぜひ五感で。' },
    '苦め':{ title:'ビター・ホップ派', en:'BITTER HOP TYPE', desc:'パンチのある苦みと深いコクが好み。IPAやスタウトの真価が分かるタイプ。スパイシーな料理との相性も抜群。' },
    '軽め':{ title:'デイリー・ライト派', en:'DAILY LIGHT TYPE', desc:'毎日でも飲みたくなる、軽やかで飲み疲れしない味わいが好み。食事に寄り添う一杯を。' },
    '濃厚':{ title:'リッチ・ボディ派', en:'RICH BODY TYPE', desc:'重厚な麦の甘みと長い余韻に酔いしれる。ゆっくり時間をかけて味わう、夜のための一杯を。' },
    'すっきり':{ title:'クリーン・クリスプ派', en:'CLEAN CRISP TYPE', desc:'雑味のない透明感ある飲み口を求めるあなたには、ピルスナーやセゾンが似合います。' },
  };
  const p = profiles[winner] || profiles['フルーティ'];
  const recs = PRODUCTS.filter(prod=> prod.tastes.includes(winner)).slice(0,4);

  return (
    <div>
      <div className="container" style={{maxWidth:720, padding:'56px 32px 32px', textAlign:'center'}}>
        <span className="eng-caps">YOUR TASTE TYPE</span>
        <p className="serif" style={{fontSize:18, color:'var(--ink-mid)', margin:'24px 0 16px', letterSpacing:'0.08em'}}>あなたにおすすめのスタイルは…</p>
        <h1 className="serif" style={{fontSize: device==='sp'?32:52, fontWeight:500, margin:'0 0 12px', letterSpacing:'0.06em', color:'var(--amber-deep)'}}>
          {p.title}
        </h1>
        <div className="display" style={{fontSize:14, color:'var(--ink-low)', letterSpacing:'0.2em', marginBottom:32}}>{p.en}</div>
        <p style={{lineHeight:2.2, color:'var(--ink-mid)', maxWidth:520, margin:'0 auto'}}>{p.desc}</p>
      </div>
      <div className="container" style={{paddingBottom:80}}>
        <div className="section-head" style={{marginTop:64}}>
          <div><span className="eng-caps">RECOMMENDED FOR YOU</span><h2>あなたへのおすすめ</h2></div>
        </div>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(4,1fr)', gap: device==='sp'?16:32}}>
          {recs.map(p=> <PCard key={p.id} p={p} onClick={()=>go('product/'+p.id)}/>)}
        </div>
        <div className="center" style={{marginTop:48, display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
          <button className="btn btn-amber" onClick={()=>go('products')}>すべての商品を見る</button>
          <button className="btn btn-ghost" onClick={()=>go('taste-quiz')}>もう一度診断する</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BreweriesScreen, TasteQuizScreen, TasteResultScreen });
