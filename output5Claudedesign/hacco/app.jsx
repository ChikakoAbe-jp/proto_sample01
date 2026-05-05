// =========================================================
// HACCO App — Router & Shell
// =========================================================

function App() {
  const [device, setDevice] = React.useState('pc'); // pc | sp
  const [route, setRoute] = React.useState('home');
  const [ageGate, setAgeGate] = React.useState(true);
  const [ageRefused, setAgeRefused] = React.useState(false);
  const [cart, setCart] = React.useState([
    { id: 'p01', qty: 2 },
    { id: 'p04', qty: 1 },
  ]);
  const [favs, setFavs] = React.useState(['p02','p06']);
  const scrollRef = React.useRef(null);

  const go = (r) => {
    setRoute(r);
    setTimeout(()=>{
      if (scrollRef.current) scrollRef.current.scrollTo({top:0, behavior:'smooth'});
      else window.scrollTo({top:0});
    }, 0);
  };

  const fav = (id) => setFavs(prev=> prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  const addCart = (id, qty=1) => setCart(prev=>{
    const ex = prev.find(c=>c.id===id);
    if (ex) return prev.map(c=> c.id===id?{...c, qty:c.qty+qty}:c);
    return [...prev, { id, qty }];
  });

  const ctx = {
    route, go, device,
    cart, setCart, addCart,
    favs, fav,
    ...window.HACCO,
  };

  // Render current screen
  let screen = null;
  if (route === 'home') screen = <HomeVariations device={device}/>;
  else if (route === 'products') screen = <ProductsScreen device={device}/>;
  else if (route.startsWith('product/')) screen = <ProductDetailScreen device={device} productId={route.split('/')[1]}/>;
  else if (route === 'cart') screen = <CartScreen device={device}/>;
  else if (route === 'checkout') screen = <CheckoutScreen device={device}/>;
  else if (route === 'order-complete') screen = <OrderCompleteScreen device={device}/>;
  else if (route === 'taste-quiz') screen = <TasteQuizScreen device={device}/>;
  else if (route === 'taste-result') screen = <TasteResultScreen device={device}/>;
  else if (route === 'breweries') screen = <BreweriesScreen device={device}/>;
  else if (route === 'login') screen = <LoginScreen device={device}/>;
  else if (route === 'register') screen = <RegisterScreen device={device}/>;
  else if (route === 'mypage') screen = <MyPageScreen device={device}/>;

  const routeLabel = {
    home:'/ home', products:'/ products', cart:'/ cart', checkout:'/ checkout',
    'order-complete':'/ order-complete', 'taste-quiz':'/ taste-quiz', 'taste-result':'/ taste-result',
    breweries:'/ breweries', login:'/ login', register:'/ register', mypage:'/ mypage',
  }[route] || '/ '+route;

  return (
    <AppCtx.Provider value={ctx}>
      <div className="app-shell">
        {/* Toolbar */}
        <div className="shell-toolbar">
          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <span className="brand">HACCO</span>
            <span className="crumbs">PROTOTYPE v1.0</span>
          </div>
          <div className="crumbs">{routeLabel}</div>
          <div className="device-switch">
            <button className={device==='pc'?'on':''} onClick={()=>setDevice('pc')}>PC</button>
            <button className={device==='sp'?'on':''} onClick={()=>setDevice('sp')}>SP</button>
          </div>
        </div>

        {/* Frame */}
        <div className="frame-wrap">
          <div className={device==='pc'?'frame-pc':'frame-sp'}>
            <div className={device==='sp'?'sp scroll-area':'scroll-area'} ref={scrollRef} style={device==='sp'?{paddingTop:50}:{}}>
              <Header device={device}/>
              {screen}
              <Footer/>
            </div>
            {ageGate && (
              <AgeGate
                onYes={()=>setAgeGate(false)}
                onNo={()=>setAgeRefused(true)}
              />
            )}
            {ageRefused && (
              <div className="modal-bg">
                <div className="modal-card">
                  <span className="eng-caps">SORRY</span>
                  <h3>20歳未満の方はご利用いただけません</h3>
                  <p>HACCOはお酒を販売するサイトです。<br/>未成年者の飲酒は法律で禁止されています。</p>
                  <button className="btn btn-ghost btn-block" onClick={()=>{ setAgeRefused(false); }}>戻る</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
