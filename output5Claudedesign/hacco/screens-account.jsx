// =========================================================
// HACCO Account screens — Login, Register, MyPage
// =========================================================

function LoginScreen({ device }) {
  const { go } = useApp();
  return (
    <div className="container" style={{maxWidth:440, padding:'56px 32px 96px'}}>
      <div className="center" style={{marginBottom:48}}>
        <span className="eng-caps">SIGN IN</span>
        <h1 className="serif" style={{fontSize:28, fontWeight:500, margin:'12px 0 8px', letterSpacing:'0.06em'}}>ログイン</h1>
        <p className="small muted">HACCOアカウントにログイン</p>
      </div>
      <div className="field"><label>メールアドレス</label><input type="email" placeholder="you@example.com"/></div>
      <div className="field"><label>パスワード</label><input type="password" placeholder="********"/></div>
      <button className="btn btn-amber btn-block" onClick={()=>go('mypage')}>ログイン</button>
      <div className="center" style={{marginTop:20}}><a className="small link" style={{cursor:'pointer'}}>パスワードを忘れた方</a></div>
      <div className="divider"/>
      <div className="center">
        <p className="small muted" style={{marginBottom:12}}>HACCOをはじめてご利用の方</p>
        <button className="btn btn-ghost btn-block" onClick={()=>go('register')}>新規会員登録</button>
      </div>
    </div>
  );
}

function RegisterScreen({ device }) {
  const { go } = useApp();
  return (
    <div className="container" style={{maxWidth:520, padding:'56px 32px 96px'}}>
      <div className="center" style={{marginBottom:48}}>
        <span className="eng-caps">CREATE ACCOUNT</span>
        <h1 className="serif" style={{fontSize:28, fontWeight:500, margin:'12px 0 8px', letterSpacing:'0.06em'}}>新規会員登録</h1>
      </div>
      <div className="field-row">
        <div className="field"><label>姓</label><input type="text"/></div>
        <div className="field"><label>名</label><input type="text"/></div>
      </div>
      <div className="field"><label>メールアドレス</label><input type="email"/></div>
      <div className="field"><label>パスワード</label><input type="password"/><div className="field-help">8文字以上、英数字を含む</div></div>
      <div className="field"><label>パスワード（確認）</label><input type="password"/></div>
      <div className="field"><label>生年月日</label><input type="date" style={{maxWidth:240}}/><div className="field-help">年齢確認に使用します</div></div>
      <label className="checkbox" style={{marginBottom:12}}><input type="checkbox"/><span><a className="link">利用規約</a> および <a className="link">プライバシーポリシー</a> に同意します</span></label>
      <label className="checkbox" style={{marginBottom:24}}><input type="checkbox"/><span>20歳以上であることを確認しました</span></label>
      <button className="btn btn-amber btn-block" onClick={()=>go('mypage')}>登録する</button>
      <div className="center" style={{marginTop:20}}><a className="small link" onClick={()=>go('login')} style={{cursor:'pointer'}}>すでにアカウントをお持ちの方</a></div>
    </div>
  );
}

function MyPageScreen({ device }) {
  const { go, ORDERS, PRODUCTS, favs } = useApp();
  const [tab, setTab] = React.useState('orders');
  const favProducts = PRODUCTS.filter(p=> favs.includes(p.id));

  const tabs = [['orders','注文履歴'],['favs','お気に入り'],['profile','登録情報']];

  return (
    <div>
      <div className="container">
        <Crumbs go={go} items={[{label:'ホーム',k:'home'},{label:'マイページ'}]}/>
        <div style={{padding:'8px 0 32px', borderBottom:'1px solid var(--line)', marginBottom:48}}>
          <span className="eng-caps">MY ACCOUNT</span>
          <h1 className="serif" style={{fontSize: device==='sp'?28:40, fontWeight:500, margin:'8px 0 0', letterSpacing:'0.06em'}}>こんにちは、山田 様</h1>
        </div>
      </div>

      <div className="container" style={{paddingBottom:96}}>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'200px 1fr', gap:48}}>
          <aside>
            <div style={{display:'flex', flexDirection: device==='sp'?'row':'column', gap: device==='sp'?0:8, borderBottom: device==='sp'?'1px solid var(--line)':'none'}}>
              {tabs.map(([k,l])=>(
                <button key={k} onClick={()=>setTab(k)} style={{padding: device==='sp'?'14px 18px':'12px 0', textAlign:'left', background:'transparent', border:0, borderBottom: device==='sp'? '2px solid '+(tab===k?'var(--ink)':'transparent') : 'none', color: tab===k?'var(--ink)':'var(--ink-low)', fontFamily:'var(--serif)', fontSize:14, letterSpacing:'0.06em', cursor:'pointer'}}>
                  {l}
                </button>
              ))}
              {device==='pc' && <div style={{height:1, background:'var(--line)', margin:'16px 0'}}/>}
              {device==='pc' && <button onClick={()=>go('home')} style={{padding:'12px 0', textAlign:'left', background:'transparent', border:0, color:'var(--ink-low)', fontSize:13, cursor:'pointer'}}>ログアウト</button>}
            </div>
          </aside>
          <main>
            {tab==='orders' && (
              <div>
                <h2 className="serif" style={{fontSize:18, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>注文履歴</h2>
                {ORDERS.map(o=>(
                  <div key={o.no} style={{padding:24, border:'1px solid var(--line)', marginBottom:16}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:16}}>
                      <div>
                        <div className="eng-caps" style={{marginBottom:4, fontSize:9}}>{o.no}</div>
                        <div className="serif" style={{fontSize:15}}>{o.date}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div className="display" style={{fontSize:18}}>¥{o.total.toLocaleString()}</div>
                        <span style={{fontSize:11, padding:'3px 10px', background: o.status==='発送済み'?'var(--amber)':'var(--moss)', color:'white', borderRadius:999}}>{o.status}</span>
                      </div>
                    </div>
                    <div className="small muted" style={{lineHeight:1.9, paddingTop:16, borderTop:'1px solid var(--line)'}}>
                      {o.items.map((it,i)=> <div key={i}>{it}</div>)}
                    </div>
                    <div style={{marginTop:16}}><a className="link small" style={{cursor:'pointer'}}>注文詳細を見る　→</a></div>
                  </div>
                ))}
              </div>
            )}
            {tab==='favs' && (
              <div>
                <h2 className="serif" style={{fontSize:18, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>お気に入り</h2>
                {favProducts.length===0 ? (
                  <div className="center muted" style={{padding:'56px 0'}}>
                    お気に入りの商品はまだありません<br/>
                    <a className="link" onClick={()=>go('products')} style={{cursor:'pointer', marginTop:16, display:'inline-block'}}>商品を探す　→</a>
                  </div>
                ) : (
                  <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(3,1fr)', gap: device==='sp'?16:32}}>
                    {favProducts.map(p=> <PCard key={p.id} p={p} onClick={()=>go('product/'+p.id)}/>)}
                  </div>
                )}
              </div>
            )}
            {tab==='profile' && (
              <div>
                <h2 className="serif" style={{fontSize:18, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>登録情報</h2>
                <div className="field-row"><div className="field"><label>姓</label><input type="text" defaultValue="山田"/></div><div className="field"><label>名</label><input type="text" defaultValue="太郎"/></div></div>
                <div className="field"><label>メールアドレス</label><input type="email" defaultValue="taro.yamada@example.com"/></div>
                <div className="field"><label>住所</label><input type="text" defaultValue="東京都渋谷区神宮前1-2-3 メゾン青山 301"/></div>
                <div className="field"><label>電話番号</label><input type="tel" defaultValue="090-1234-5678" style={{maxWidth:280}}/></div>
                <button className="btn btn-amber" style={{marginTop:8}}>変更を保存</button>
                <div className="divider"/>
                <h3 className="serif" style={{fontSize:15, fontWeight:500, margin:'0 0 16px'}}>パスワード変更</h3>
                <div className="field"><label>現在のパスワード</label><input type="password"/></div>
                <div className="field"><label>新しいパスワード</label><input type="password"/></div>
                <button className="btn btn-ghost">パスワードを変更</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen, MyPageScreen });
