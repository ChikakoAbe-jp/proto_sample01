// =========================================================
// HACCO Checkout flow + order complete
// =========================================================

function CheckoutScreen({ device }) {
  const { go, PRODUCTS, cart } = useApp();
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    lname:'山田', fname:'太郎', zip:'150-0001', addr:'東京都渋谷区神宮前1-2-3 メゾン青山 301', tel:'090-1234-5678',
    date:'2026-05-12', time:'18-20', pay:'card'
  });
  const upd = (k,v) => setForm(f=>({...f, [k]:v}));

  const items = cart.map(c=> ({ ...c, p: PRODUCTS.find(p=>p.id===c.id) })).filter(x=>x.p);
  const subtotal = items.reduce((a,b)=> a + b.p.price*b.qty, 0);
  const ship = subtotal>=5000 ? 0 : 650;
  const total = subtotal + ship;

  const steps = ['配送先','お届け日時','お支払い','確認'];

  const Stepper = () => (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: device==='sp'?8:24, marginBottom:48, flexWrap:'wrap'}}>
      {steps.map((label,i)=>{
        const n = i+1;
        const active = n===step;
        const done = n<step;
        return (
          <React.Fragment key={n}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{width:32, height:32, borderRadius:'50%', border: '1px solid '+(active||done?'var(--ink)':'var(--line-strong)'), background: done?'var(--ink)':active?'var(--ink)':'transparent', color: done||active?'#F5EFE3':'var(--ink-low)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--display)', fontSize:13}}>
                {done ? Ico.check() : n}
              </div>
              {device==='pc' && <span className="small" style={{color: active?'var(--ink)':'var(--ink-low)', letterSpacing:'0.08em'}}>{label}</span>}
            </div>
            {n<steps.length && <div style={{width: device==='sp'?20:48, height:1, background:'var(--line-strong)'}}/>}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="container">
        <Crumbs go={go} items={[{label:'ホーム',k:'home'},{label:'カート',k:'cart'},{label:'購入手続き'}]}/>
        <div style={{padding:'8px 0 32px'}}>
          <span className="eng-caps">CHECKOUT</span>
          <h1 className="serif" style={{fontSize: device==='sp'?28:40, fontWeight:500, margin:'8px 0 0', letterSpacing:'0.06em'}}>購入手続き</h1>
        </div>
        <Stepper/>
      </div>

      <div className="container" style={{paddingBottom:96}}>
        <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr':'1.5fr 1fr', gap:48}}>
          <main>
            {step===1 && (
              <section>
                <h2 className="serif" style={{fontSize:20, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>配送先</h2>
                <div className="field-row">
                  <div className="field"><label>姓</label><input type="text" value={form.lname} onChange={e=>upd('lname',e.target.value)}/></div>
                  <div className="field"><label>名</label><input type="text" value={form.fname} onChange={e=>upd('fname',e.target.value)}/></div>
                </div>
                <div className="field"><label>郵便番号</label><input type="text" value={form.zip} onChange={e=>upd('zip',e.target.value)} style={{maxWidth:200}}/></div>
                <div className="field"><label>住所</label><input type="text" value={form.addr} onChange={e=>upd('addr',e.target.value)}/></div>
                <div className="field"><label>電話番号</label><input type="tel" value={form.tel} onChange={e=>upd('tel',e.target.value)} style={{maxWidth:280}}/></div>
                <button className="btn btn-amber btn-lg" style={{marginTop:16}} onClick={()=>setStep(2)}>次へ：お届け日時　{Ico.arrow()}</button>
              </section>
            )}
            {step===2 && (
              <section>
                <h2 className="serif" style={{fontSize:20, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>お届け日時</h2>
                <div className="field"><label>配送希望日</label><input type="date" value={form.date} onChange={e=>upd('date',e.target.value)} style={{maxWidth:240}}/><div className="field-help">注文日から3日後以降をご指定ください</div></div>
                <div className="field">
                  <label>時間帯</label>
                  <div style={{display:'grid', gridTemplateColumns: device==='sp'?'1fr 1fr':'repeat(5,1fr)', gap:8}}>
                    {[['am','午前中'],['14-16','14〜16時'],['16-18','16〜18時'],['18-20','18〜20時'],['20-21','20〜21時']].map(([k,l])=>(
                      <button key={k} onClick={()=>upd('time',k)} style={{padding:'14px 8px', border:'1px solid '+(form.time===k?'var(--ink)':'var(--line-strong)'), background: form.time===k?'var(--ink)':'transparent', color: form.time===k?'#F5EFE3':'var(--ink)', fontSize:12, letterSpacing:'0.06em'}}>{l}</button>
                    ))}
                  </div>
                </div>
                <div style={{display:'flex', gap:12, marginTop:16}}>
                  <button className="btn btn-ghost" onClick={()=>setStep(1)}>{Ico.arrowL()}　戻る</button>
                  <button className="btn btn-amber" onClick={()=>setStep(3)}>次へ：お支払い　{Ico.arrow()}</button>
                </div>
              </section>
            )}
            {step===3 && (
              <section>
                <h2 className="serif" style={{fontSize:20, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>お支払い方法</h2>
                <div style={{display:'flex', flexDirection:'column', gap:12, marginBottom:24}}>
                  {[['card','クレジットカード','VISA / MASTER / JCB / AMEX  ―  Stripe'],['cvs','コンビニ払い','セブン / ローソン / ファミマ等'],['bank','銀行振込','三井住友銀行・楽天銀行']].map(([k,l,sub])=>(
                    <label key={k} style={{display:'flex', gap:14, padding:'18px 20px', border:'1px solid '+(form.pay===k?'var(--ink)':'var(--line-strong)'), background: form.pay===k?'var(--bg-warm)':'transparent', cursor:'pointer'}}>
                      <input type="radio" checked={form.pay===k} onChange={()=>upd('pay',k)} style={{accentColor:'var(--amber)', marginTop:4}}/>
                      <div>
                        <div className="serif" style={{fontSize:15}}>{l}</div>
                        <div className="small muted" style={{marginTop:4}}>{sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {form.pay==='card' && (
                  <div style={{padding:24, border:'1px solid var(--line-strong)', background:'var(--bg-warm)'}}>
                    <div className="field"><label>カード番号</label><input type="text" placeholder="1234 5678 9012 3456"/></div>
                    <div className="field-row">
                      <div className="field"><label>有効期限</label><input type="text" placeholder="MM / YY"/></div>
                      <div className="field"><label>セキュリティコード</label><input type="text" placeholder="CVC"/></div>
                    </div>
                    <div className="field"><label>カード名義</label><input type="text" placeholder="TARO YAMADA"/></div>
                  </div>
                )}
                <div style={{display:'flex', gap:12, marginTop:24}}>
                  <button className="btn btn-ghost" onClick={()=>setStep(2)}>{Ico.arrowL()}　戻る</button>
                  <button className="btn btn-amber" onClick={()=>setStep(4)}>次へ：確認　{Ico.arrow()}</button>
                </div>
              </section>
            )}
            {step===4 && (
              <section>
                <h2 className="serif" style={{fontSize:20, fontWeight:500, margin:'0 0 24px', letterSpacing:'0.06em'}}>注文内容のご確認</h2>
                <div style={{padding:24, border:'1px solid var(--line)', marginBottom:16}}>
                  <div className="between" style={{marginBottom:12}}><div className="eng-caps">SHIP TO</div><a className="small link" onClick={()=>setStep(1)}>変更</a></div>
                  <div className="serif">{form.lname} {form.fname} 様</div>
                  <div className="small muted">〒{form.zip}　{form.addr}<br/>{form.tel}</div>
                </div>
                <div style={{padding:24, border:'1px solid var(--line)', marginBottom:16}}>
                  <div className="between" style={{marginBottom:12}}><div className="eng-caps">DELIVERY</div><a className="small link" onClick={()=>setStep(2)}>変更</a></div>
                  <div className="serif">{form.date}　/　{form.time==='am'?'午前中':form.time+'時'}</div>
                </div>
                <div style={{padding:24, border:'1px solid var(--line)', marginBottom:24}}>
                  <div className="between" style={{marginBottom:12}}><div className="eng-caps">PAYMENT</div><a className="small link" onClick={()=>setStep(3)}>変更</a></div>
                  <div className="serif">{form.pay==='card'?'クレジットカード（**** 3456）':form.pay==='cvs'?'コンビニ払い':'銀行振込'}</div>
                </div>
                <button className="btn btn-amber btn-lg btn-block" onClick={()=>go('order-complete')}>注文を確定する　{Ico.arrow()}</button>
                <div className="small muted center" style={{marginTop:12}}>「注文を確定する」を押すと、利用規約に同意したものとみなされます。</div>
              </section>
            )}
          </main>

          <aside>
            <div style={{padding:24, background:'var(--bg-warm)', position: device==='pc'?'sticky':'static', top:96}}>
              <h3 className="serif" style={{fontSize:16, fontWeight:500, margin:'0 0 20px', paddingBottom:16, borderBottom:'1px solid var(--line-strong)'}}>ご注文内容</h3>
              <div style={{marginBottom:20}}>
                {items.map(({p,qty,id})=>(
                  <div key={id} style={{display:'grid', gridTemplateColumns:'56px 1fr auto', gap:12, marginBottom:14, alignItems:'center'}}>
                    <div style={{aspectRatio:'1/1', background:`url(${p.img}) center/cover`}}/>
                    <div>
                      <div className="serif small" style={{lineHeight:1.4}}>{p.name}</div>
                      <div className="small muted" style={{fontSize:11}}>×{qty}</div>
                    </div>
                    <div className="small">¥{(p.price*qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="between small" style={{marginBottom:8}}><span className="muted">小計</span><span>¥{subtotal.toLocaleString()}</span></div>
              <div className="between small" style={{marginBottom:16}}><span className="muted">送料</span><span>{ship===0?'無料':'¥'+ship}</span></div>
              <div className="between" style={{padding:'16px 0', borderTop:'1px solid var(--line-strong)'}}>
                <span className="serif">合計</span>
                <span className="display" style={{fontSize:22}}>¥{total.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function OrderCompleteScreen({ device }) {
  const { go } = useApp();
  return (
    <div>
      <div className="container" style={{padding:'80px 32px 96px', textAlign:'center', maxWidth:640}}>
        <div style={{width:80, height:80, borderRadius:'50%', background:'var(--amber)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:32}}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 12 5 5 9-11"/></svg>
        </div>
        <span className="eng-caps">ORDER COMPLETED</span>
        <h1 className="serif" style={{fontSize: device==='sp'?28:36, fontWeight:500, margin:'16px 0 24px', letterSpacing:'0.06em', lineHeight:1.5}}>
          ご注文ありがとうございます。
        </h1>
        <p className="muted" style={{lineHeight:2, marginBottom:32}}>
          ご注文確認のメールをお送りしました。<br/>商品の発送準備が整い次第、改めてご連絡いたします。
        </p>
        <div style={{display:'inline-block', padding:'16px 32px', background:'var(--bg-warm)', marginBottom:48}}>
          <div className="eng-caps" style={{fontSize:10, marginBottom:6}}>ORDER NUMBER</div>
          <div className="display" style={{fontSize:22}}>HC-2026-0504-{Math.floor(100+Math.random()*900)}</div>
        </div>
        <div style={{display:'flex', flexDirection: device==='sp'?'column':'row', gap:12, justifyContent:'center'}}>
          <button className="btn btn-amber" onClick={()=>go('home')}>トップへ戻る</button>
          <button className="btn btn-ghost" onClick={()=>go('mypage')}>注文履歴を見る</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CheckoutScreen, OrderCompleteScreen });
