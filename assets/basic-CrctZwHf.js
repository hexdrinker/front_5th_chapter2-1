import"./modulepreload-polyfill-B5Qt9EMX.js";const N=[{id:"p1",name:"상품1",price:1e4,quantity:50},{id:"p2",name:"상품2",price:2e4,quantity:30},{id:"p3",name:"상품3",price:3e4,quantity:20},{id:"p4",name:"상품4",price:15e3,quantity:0},{id:"p5",name:"상품5",price:25e3,quantity:10}],U={p1:.1,p2:.15,p3:.2,p4:.05,p5:.25},q=.25,$=.1,k=1e3,H=.8,K=.95,E=30,Q=5,g="cart-items",A="cart-total",_="product-select",h="add-to-cart",b="stock-status",v="loyalty-points",Y={init:t=>{const e=document.querySelector(`#${g}`),{updateCartItem:n,removeCartItem:c}=t;e.addEventListener("click",m=>{const{target:r}=m,i=r.dataset.productId;if(r.classList.contains("quantity-change")){const p=parseInt(r.dataset.change);n(p,i);return}r.classList.contains("remove-item")&&c(i)})},render:()=>{}},F={init:()=>{},render:()=>`<div id="${g}" class="my-4"></div>`};function j(t){const e=document.querySelector(`#${g}`),n=z(t);e.appendChild(n)}function P(t){return document.querySelector(`#${t}`)}function z(t){const e=document.createElement("template"),n=`
    <div id="${t.id}" class="flex justify-between items-center mb-2">
      <span>${t.name} - ${t.price}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                data-product-id="${t.id}" 
                data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                data-product-id="${t.id}" 
                data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
                data-product-id="${t.id}">삭제</button>
      </div>
    </div>
  `;return e.innerHTML=n.trim(),e.content.firstChild}function x(t,e,n){t.querySelector("span").textContent=`${e.name} - ${e.price}원 x ${n}`}function D(t){const e=document.querySelector(`#${b}`);let n="";t.forEach(c=>{c.quantity<Q&&(n+=`${c.name}: ${c.quantity>0?`재고 부족 (${c.quantity}개 남음)
`:`품절
`}`)}),e.innerHTML=n}function R(t,e){const n=Math.floor(t/k),c=document.querySelector(`#${A}`);c.textContent=`총액: ${t}원`,e>0&&G(c,e),W(c,n)}function W(t,e){let n=document.querySelector(`#${v}`);n||(n=document.createElement("span"),n.id=v,n.className="text-blue-500 ml-2",t.appendChild(n)),n.textContent=`(포인트: ${e})`}function G(t,e){const n=document.createElement("span");n.className="text-green-500 ml-2",n.textContent=`(${(e*100).toFixed(1)}% 할인 적용)`,t.appendChild(n)}const L={init:({totalAmount:t,discountRate:e})=>{R(t,e)},render:()=>`<div id="${A}" class="text-xl font-bold my-4"></div>`},J={init:()=>{},render:({products:t})=>`
        <select id="${_}" class="border rounded p-2 mr-2">
          ${t.map(e=>`<option value="${e.id}" ${e.quantity===0?"disabled":""}>${e.name} - ${e.price}원</option>`).join("")}
        </select>
    `},O={init:(t,e,n)=>{const c=document.querySelector(`#${_}`),m=document.querySelector(`#${h}`),{getProductById:r}=t,{addCartItem:i}=e,{updateLastSelectedProductId:p}=n;m.addEventListener("click",()=>{const I=c.value,y=r(I);!y||y.quantity<=0||(i(I),p(I))})},render:()=>`
      <button id="${h}" class="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
    `},w={init:t=>{D(t.products)},render:()=>`<div id="${b}" class="text-sm text-gray-500 mt-2"></div>`},V=()=>({products:[...N],cart:[],lastSelected:null,totalAmount:0,loyaltyPoints:0,discountRate:0,itemCount:0});function X(t){const e=r=>t.products.find(i=>i.id===r);return{getProductById:e,getProductBySuggestion:r=>t.products.find(i=>i.id!==r&&i.quantity>0),getRandomProduct:()=>t.products[Math.floor(Math.random()*t.products.length)],updateProductPrice:(r,i)=>{const p=e(r);updateProductElementPrice(r,i),p.price=i}}}const Z=(t,e)=>{const n=o=>t.cart.find(a=>a.id===o),c=o=>{const a=e.getProductById(o),u=n(o),s=P(o),d=u.quantity+1;return!a||a.quantity<=d?(alert("재고가 부족합니다."),!1):(x(s,a,d),u.quantity+=1,u.price+=a.price,a.quantity-=1,!0)},m=o=>{const a=e.getProductById(o);return j(a),t.cart.push({id:o,quantity:1,price:a.price}),a.quantity-=1,!0},r=o=>{n(o)?c(o):m(o),y()},i=(o,a)=>a<0?!0:a<=o,p=(o,a)=>{const u=e.getProductById(a),s=n(a),d=P(a),C=s.quantity+o;if(!i(u.quantity,o)){alert("재고가 부족합니다.");return}C<=0?(t.cart=t.cart.filter(T=>T.id!==a),u.quantity-=o,d.remove()):(x(d,u,C),u.quantity-=o,s.quantity+=o,s.price+=u.price),y()},I=o=>{const a=e.getProductById(o),u=n(o),s=P(o),d=u.quantity;t.cart=t.cart.filter(f=>f.id!==o),a.quantity+=d,s.remove(),y()},y=()=>{const o=S();t.totalAmount=o.totalAmount,t.itemCount=o.itemCount,t.discountRate=o.discountRate,l(t.totalAmount,t.discountRate),D(t.products)},S=()=>{let{totalAmount:o,itemCount:a,tempTotalAmount:u}=t.cart.reduce((d,f)=>{const{quantity:C,price:T,id:B}=f,M=C>=10&&U[B]||0;return{totalAmount:d.totalAmount+T*(1-M),itemCount:d.itemCount+C,tempTotalAmount:d.tempTotalAmount+T}},{totalAmount:0,itemCount:0,tempTotalAmount:0}),s=0;if(a>=E){const d=o*q,f=u-o;d>f&&(o=u*(1-q),s=q),f<=d&&(s=(u-o)/u)}return a<E&&(s=(u-o)/u),new Date().getDay()===2&&(o*=1-$,s=Math.max(s,$)),{totalAmount:Math.round(o),itemCount:a,discountRate:s}},l=(o,a)=>{R(o,a)};return{getCartItemById:n,addCartItem:r,updateCartItem:p,removeCartItem:I}};function tt(t,e){let n=null,c=null,m=null,r=null,i=null;const p=l=>{i=l},I=()=>{y(),S()},y=()=>{n&&clearTimeout(n),c&&clearInterval(c),n=setTimeout(()=>{c=setInterval(()=>{const l=e.getRandomProduct();if(Math.random()<.3&&l.quantity>0){const o=Math.round(l.price*H);alert(`번개세일! ${l.name}이(가) 20% 할인 중입니다!`),e.updateProductPrice(l.id,o)}},3e4)},Math.random()*1e4)},S=()=>{m&&clearTimeout(m),r&&clearInterval(r),m=setTimeout(()=>{r=setInterval(()=>{if(i){const l=e.getProductBySuggestion(i);if(l){alert(`${l.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);const o=Math.round(l.price*K);e.updateProductPrice(l.id,o)}}},6e4)},Math.random()*2e4)};return{initPromotions:I,updateLastSelectedProductId:p}}function et(){const t=V(),e=X(t),n=Z(t,e),c=tt(t,e);ot(t),nt(t,e,n,c),c.initPromotions()}function nt(t,e,n,c){O.init(e,n,c),w.init(t),Y.init(n),L.init(t)}function ot({products:t}){const e=document.getElementById("app"),n=F.render(),c=L.render(),m=J.render({products:t}),r=O.render(),i=w.render();e.innerHTML=`
      <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h1 class="text-2xl font-bold mb-4">장바구니</h1>
          ${n}
          ${c}
          ${m}
          ${r}
          ${i}
        </div>
      </div>
    `}et();
