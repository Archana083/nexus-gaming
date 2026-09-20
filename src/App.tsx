import {useEffect,useMemo,useState} from 'react'
import {ArrowRight,ChevronDown,Gamepad2,Menu,Play,Search,Trophy,Users,X,Zap} from 'lucide-react'

const games=[
 {name:'VALORANT',tag:'TACTICAL FPS',players:'18.2M',image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85'},
 {name:'APEX LEGENDS',tag:'BATTLE ROYALE',players:'12.7M',image:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85'},
 {name:'CYBER//SHIFT',tag:'ACTION RPG',players:'8.4M',image:'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=1200&q=85'},
 {name:'NOVA RUSH',tag:'ARENA',players:'6.9M',image:'https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=1200&q=85'}
]
const matches=[
 {game:'VALORANT',a:'NOVA',b:'RAVEN',time:'18:30',status:'TODAY'},
 {game:'APEX LEGENDS',a:'VOLT',b:'ORBIT',time:'21:00',status:'TODAY'},
 {game:'CYBER//SHIFT',a:'KAIROS',b:'VOID',time:'20:00',status:'SAT 21'}
]
const teams=['NOVA','RAVEN','VOLT','ORBIT']
function App(){
 const [menu,setMenu]=useState(false),[activeGame,setActiveGame]=useState(0),[search,setSearch]=useState(''),[seconds,setSeconds]=useState(2*24*3600+7*3600+31*60+12),[joined,setJoined]=useState(false)
 const filtered=useMemo(()=>games.filter(g=>g.name.toLowerCase().includes(search.toLowerCase())||g.tag.toLowerCase().includes(search.toLowerCase())),[search])
 useEffect(()=>{const id=setInterval(()=>setSeconds(s=>s>0?s-1:0),1000);return()=>clearInterval(id)},[])
 const time=[Math.floor(seconds/86400),Math.floor(seconds%86400/3600),Math.floor(seconds%3600/60),seconds%60]
 const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 return <div className="app">
  <header className="nav"><button className="logo" onClick={()=>go('home')}><span className="logo-mark">N</span>NEXUS</button><nav>{['Games','Arena','Teams','News'].map(x=><button key={x} onClick={()=>go(x.toLowerCase())}>{x}</button>)}<button className="join" onClick={()=>go('arena')}>Enter Arena <ArrowRight size={15}/></button></nav><button className="menu" onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button></header>
  {menu&&<div className="mobile-nav">{['Games','Arena','Teams','News'].map(x=><button key={x} onClick={()=>go(x.toLowerCase())}>{x}</button>)}<button onClick={()=>go('arena')}>Enter Arena</button></div>}
  <main id="home">
   <section className="hero"><div className="hero-bg"/><div className="glow glow-a"/><div className="glow glow-b"/><div className="hero-content"><div className="live"><span/> LIVE COMMUNITY · 24/7</div><h1>PLAY<br/><i>BEYOND</i><br/>LIMITS.</h1><p>Competitive gaming, tournaments and communities built for the next generation of players.</p><div className="hero-actions"><button onClick={()=>go('games')} className="primary">Explore games <ArrowRight size={17}/></button><button onClick={()=>go('arena')} className="secondary"><Play size={15} fill="currentColor"/> Watch arena</button></div></div><div className="hero-side">NEXUS / 01<br/><span>EST. 2026</span></div><div className="hero-bottom"><span>SCROLL TO ENTER</span><span>INDIA · GLOBAL</span></div></section>

   <section className="ticker"><div>TOURNAMENTS <b>✦</b> RANKED PLAY <b>✦</b> LIVE MATCHES <b>✦</b> COMMUNITY <b>✦</b> TOURNAMENTS <b>✦</b> RANKED PLAY <b>✦</b> LIVE MATCHES <b>✦</b></div></section>

   <section className="games" id="games"><div className="section-head"><div><span className="eyebrow">01 / DISCOVER</span><h2>Pick your<br/><i>arena.</i></h2></div><div className="search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search games..."/></div></div><div className="game-grid">{filtered.map((g,i)=><button className={`game-card ${activeGame===i?'selected':''}`} key={g.name} onClick={()=>setActiveGame(i)}><img src={g.image} alt={g.name}/><div className="game-shade"/><div className="game-info"><span>{g.tag}</span><h3>{g.name}</h3><small><Users size={12}/> {g.players} players</small></div><div className="game-arrow"><ArrowRight/></div></button>)}</div></section>

   <section className="arena" id="arena"><div className="arena-top"><span className="eyebrow">02 / THE NEXT DROP</span><span>CHAMPIONSHIP SERIES / 001</span></div><div className="arena-main"><div><p className="kicker"><Zap size={14}/> REGISTRATION OPEN</p><h2>NEXUS<br/><i>CHAMPIONSHIP.</i></h2><p className="arena-copy">A 64-team online showdown. Build your squad, survive the brackets and take the title.</p><button className="register" onClick={()=>setJoined(true)}>{joined?'YOU’RE IN — SEE YOU THERE':'REGISTER YOUR SQUAD'} <ArrowRight size={17}/></button></div><div className="countdown"><span>STARTS IN</span><div>{time.map((v,i)=><div key={i}><strong>{String(v).padStart(2,'0')}</strong><small>{['DAYS','HOURS','MIN','SEC'][i]}</small></div>)}</div></div></div></section>

   <section className="matches"><div className="match-head"><div><span className="eyebrow">03 / LIVE & UPCOMING</span><h2>Match <i>schedule.</i></h2></div><button>View all <ArrowRight size={14}/></button></div><div className="match-list">{matches.map((m,i)=><div className="match" key={i}><span className="match-game">{m.game}</span><strong>{m.a}</strong><span className="vs">VS</span><strong>{m.b}</strong><span className="match-time">{m.time}<small>{m.status}</small></span><button><ArrowRight/></button></div>)}</div></section>

   <section className="teams" id="teams"><div className="team-copy"><span className="eyebrow">04 / RANKED</span><h2>Meet the<br/><i>contenders.</i></h2><p>Track teams, rivalries and rising players across the NEXUS competitive circuit.</p></div><div className="leaderboard"><div className="lb-head"><span>RANK</span><span>TEAM</span><span>W / L</span><span>PTS</span></div>{teams.map((t,i)=><div className="lb-row" key={t}><b>0{i+1}</b><strong><span className="team-badge">{t[0]}</span>{t}</strong><span>{[18,16,15,13][i]} / {[3,5,6,8][i]}</span><em>{[1820,1655,1510,1370][i]}</em></div>)}</div></section>

   <section className="news" id="news"><div className="section-head"><div><span className="eyebrow">05 / INTEL</span><h2>Latest <i>drop.</i></h2></div><button className="filter">ALL <ChevronDown size={14}/></button></div><div className="news-grid"><article><div className="news-img n1"/><span>FEATURE · 08.09.26</span><h3>The new generation is rewriting competitive play.</h3><a>Read story <ArrowRight size={14}/></a></article><article><div className="news-img n2"/><span>GUIDE · 02.09.26</span><h3>How to build a team that survives the bracket.</h3><a>Read story <ArrowRight size={14}/></a></article><article><div className="news-img n3"/><span>COMMUNITY · 28.08.26</span><h3>Inside the creators building worlds beyond the game.</h3><a>Read story <ArrowRight size={14}/></a></article></div></section>
  </main>
  <footer><div><div className="footer-logo">NEXUS<span>/</span></div><p>PLAY BEYOND LIMITS.</p></div><div>DISCORD · X · INSTAGRAM</div><small>© 2026 NEXUS GAMING</small></footer>
 </div>
}
export default App