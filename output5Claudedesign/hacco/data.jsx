// =========================================================
// HACCO Mock Data
// =========================================================

const BREWERIES = [
  { id: 'b01', name: '六甲山ブルーイング', en: 'ROKKO MTN BREWING', area: '兵庫県神戸市', founded: 2014, blurb: '神戸の伏流水で醸す、海風と山のあいだのビール。' },
  { id: 'b02', name: '森と樽 醸造所', en: 'MORI TO TARU', area: '長野県松本市', founded: 2017, blurb: '信州の森で熟成させる、樽の香りを纏ったエール。' },
  { id: 'b03', name: '波音ブルワリー', en: 'NAMINE BREWERY', area: '神奈川県鎌倉市', founded: 2012, blurb: '鎌倉の四季と波音を映す、軽やかなビール。' },
  { id: 'b04', name: '燈火醸造', en: 'TOMOSHIBI BREWING', area: '京都府宇治市', founded: 2019, blurb: '宇治茶の里で生まれた、和の素材を活かす一杯。' },
  { id: 'b05', name: '北緯43度', en: 'N43 BEER WORKS', area: '北海道札幌市', founded: 2015, blurb: '北の大地の麦と水で、力強くも繊細な北のエール。' },
  { id: 'b06', name: '蜜柑山ブルワリー', en: 'MIKAN-YAMA', area: '愛媛県松山市', founded: 2018, blurb: '瀬戸内の柑橘を主役に、太陽を閉じ込めたビール。' },
  { id: 'b07', name: '黒潮醸造', en: 'KUROSHIO BREW', area: '高知県土佐市', founded: 2016, blurb: '黒潮の塩風と土佐の米で、潮の香り立つビール。' },
  { id: 'b08', name: '小麦と煙', en: 'KOMUGI & SMOKE', area: '岩手県盛岡市', founded: 2020, blurb: '南部小麦と燻製麦芽で醸す、深く香ばしい一本。' },
];

const TASTES = ['フルーティ','苦め','軽め','濃厚','すっきり'];
const STYLES = ['IPA','ペールエール','スタウト','ラガー','ヴァイツェン','セゾン','フルーツエール'];

// Unsplash beer photos
const IMG = {
  hero1: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1600&q=80&auto=format&fit=crop',
  hero2: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=1600&q=80&auto=format&fit=crop',
  hero3: 'https://images.unsplash.com/photo-1571767454098-246b94fbcf01?w=1600&q=80&auto=format&fit=crop',
  brewery: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=1200&q=80&auto=format&fit=crop',
  bottle1: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80&auto=format&fit=crop',
  bottle2: 'https://images.unsplash.com/photo-1577909659377-d2dc60de58fa?w=800&q=80&auto=format&fit=crop',
  bottle3: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800&q=80&auto=format&fit=crop',
  bottle4: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800&q=80&auto=format&fit=crop',
  bottle5: 'https://images.unsplash.com/photo-1600788907416-456578634209?w=800&q=80&auto=format&fit=crop',
  bottle6: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop',
  bottle7: 'https://images.unsplash.com/photo-1623211302057-dde4448ad9c8?w=800&q=80&auto=format&fit=crop',
  bottle8: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop',
  pour1: 'https://images.unsplash.com/photo-1505075106905-fb052892c116?w=1400&q=80&auto=format&fit=crop',
  glass1: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=1200&q=80&auto=format&fit=crop',
  gift: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&q=80&auto=format&fit=crop',
  hops: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=1200&q=80&auto=format&fit=crop',
};

const PRODUCTS = [
  { id:'p01', name:'六甲モーニング ペールエール', brewery:BREWERIES[0], price:780, vol:330, abv:5.2, style:'ペールエール', tastes:['フルーティ','軽め'], img:IMG.bottle1, bitter:3, sweet:3, body:2,
    note:'神戸の朝の空気のような、清涼感あるホップアロマ。柑橘とエルダーフラワーを思わせる華やかな香りが、軽やかに立ちあがります。',
    pairing:['白身魚のカルパッチョ','ハーブチキン','フレッシュチーズ'], material:'麦芽・ホップ・酵母・水', best:'瓶詰めから6ヶ月以内' },
  { id:'p02', name:'森と樽 オークIPA', brewery:BREWERIES[1], price:1180, vol:330, abv:6.8, style:'IPA', tastes:['苦め','濃厚'], img:IMG.bottle2, bitter:5, sweet:2, body:4,
    note:'信州産オーク樽で熟成させた、複雑なホップとウッディな香り。長い余韻にバニラの甘みが残ります。',
    pairing:['熟成チーズ','ローストポーク','スパイシーカレー'], material:'麦芽・ホップ・酵母・水・オーク樽熟成', best:'瓶詰めから9ヶ月以内' },
  { id:'p03', name:'波音 セッションIPA', brewery:BREWERIES[2], price:720, vol:330, abv:4.5, style:'IPA', tastes:['軽め','フルーティ'], img:IMG.bottle3, bitter:3, sweet:2, body:2,
    note:'低アルコールでも香りはしっかり。トロピカルフルーツと松葉のニュアンス、すっと抜ける後味。',
    pairing:['寿司','天ぷら','レモンを絞った魚介'], material:'麦芽・ホップ・酵母・水', best:'瓶詰めから6ヶ月以内' },
  { id:'p04', name:'燈火 宇治抹茶スタウト', brewery:BREWERIES[3], price:980, vol:330, abv:6.0, style:'スタウト', tastes:['濃厚','苦め'], img:IMG.bottle4, bitter:4, sweet:3, body:5,
    note:'宇治の抹茶を贅沢に使用。ロースト香と抹茶のほろ苦さ、奥に広がるチョコレートの甘み。',
    pairing:['和菓子','ダークチョコ','チーズケーキ'], material:'麦芽・ホップ・抹茶・酵母・水', best:'瓶詰めから6ヶ月以内' },
  { id:'p05', name:'N43 雪解けピルスナー', brewery:BREWERIES[4], price:680, vol:330, abv:4.8, style:'ラガー', tastes:['すっきり','軽め'], img:IMG.bottle5, bitter:2, sweet:2, body:2,
    note:'北海道の伏流水で仕込んだ、清冽なピルスナー。雪解け水のようにクリアな飲み口。',
    pairing:['焼き鳥','ジンギスカン','ポテトフライ'], material:'麦芽・ホップ・酵母・水', best:'瓶詰めから6ヶ月以内' },
  { id:'p06', name:'蜜柑山 サンセット ヴァイツェン', brewery:BREWERIES[5], price:820, vol:330, abv:5.0, style:'ヴァイツェン', tastes:['フルーティ','すっきり'], img:IMG.bottle6, bitter:1, sweet:4, body:3,
    note:'瀬戸内の温州みかんを使用。バナナとクローブのヴァイツェン香に、柑橘の明るさが重なります。',
    pairing:['豚肉のソテー','春巻き','フルーツサラダ'], material:'麦芽・小麦・ホップ・蜜柑果汁・酵母・水', best:'瓶詰めから6ヶ月以内' },
  { id:'p07', name:'黒潮 海塩ゴーゼ', brewery:BREWERIES[6], price:880, vol:330, abv:4.2, style:'セゾン', tastes:['すっきり','フルーティ'], img:IMG.bottle7, bitter:2, sweet:2, body:2,
    note:'土佐沖の海塩を使った、ほのかにしょっぱく爽やかなゴーゼ。レモンと潮風の香り。',
    pairing:['カキフライ','刺身','塩焼きそば'], material:'麦芽・小麦・ホップ・海塩・乳酸菌・酵母・水', best:'瓶詰めから6ヶ月以内' },
  { id:'p08', name:'小麦と煙 ラオホビール', brewery:BREWERIES[7], price:1080, vol:330, abv:5.6, style:'ラガー', tastes:['濃厚'], img:IMG.bottle8, bitter:3, sweet:2, body:4,
    note:'ブナの薪で燻した麦芽を使用。焚き火を思わせる燻香と、麦の甘みが心地よく広がります。',
    pairing:['ベーコン','スモークサーモン','焼きナス'], material:'燻製麦芽・ホップ・酵母・水', best:'瓶詰めから6ヶ月以内' },
];

const QUIZ = [
  { q:'休日の夜、どんな気分でグラスを傾けたいですか？', opts:[
    { label:'軽やかにリフレッシュしたい', tag:'すっきり' },
    { label:'じっくり余韻を味わいたい', tag:'濃厚' },
    { label:'香りで気分転換したい', tag:'フルーティ' },
    { label:'ガツンと来る一杯がほしい', tag:'苦め' },
  ]},
  { q:'好きな食べ物に近いのは？', opts:[
    { label:'寿司・刺身など和食', tag:'すっきり' },
    { label:'チーズ・熟成肉', tag:'濃厚' },
    { label:'フルーツ・サラダ', tag:'フルーティ' },
    { label:'スパイシーなカレー', tag:'苦め' },
  ]},
  { q:'好きな香りのイメージは？', opts:[
    { label:'森・木の香り', tag:'濃厚' },
    { label:'柑橘・トロピカル', tag:'フルーティ' },
    { label:'潮風・ハーブ', tag:'すっきり' },
    { label:'焙煎・ロースト', tag:'苦め' },
  ]},
  { q:'グラス1杯の理想は？', opts:[
    { label:'すいすい飲める軽さ', tag:'軽め' },
    { label:'ゆっくり時間をかけて', tag:'濃厚' },
    { label:'香りに浸る心地よさ', tag:'フルーティ' },
    { label:'刺激のあるコク', tag:'苦め' },
  ]},
];

const ORDERS = [
  { no:'HC-2026-0428-001', date:'2026年04月28日', total:5840, status:'発送済み', items:['六甲モーニング ペールエール ×2','森と樽 オークIPA ×1','燈火 宇治抹茶スタウト ×1'] },
  { no:'HC-2026-0312-014', date:'2026年03月12日', total:7220, status:'お届け済み', items:['ギフトボックス6本セット ×1'] },
  { no:'HC-2026-0205-007', date:'2026年02月05日', total:3160, status:'お届け済み', items:['N43 雪解けピルスナー ×4'] },
];

window.HACCO = { BREWERIES, TASTES, STYLES, IMG, PRODUCTS, QUIZ, ORDERS };
