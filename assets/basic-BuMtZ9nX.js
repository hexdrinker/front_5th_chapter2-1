import"./modulepreload-polyfill-B5Qt9EMX.js";const N=[{id:"p1",name:"상품1",price:1e4,quantity:50},{id:"p2",name:"상품2",price:2e4,quantity:30},{id:"p3",name:"상품3",price:3e4,quantity:20},{id:"p4",name:"상품4",price:15e3,quantity:0},{id:"p5",name:"상품5",price:25e3,quantity:10}],U={p1:.1,p2:.15,p3:.2,p4:.05,p5:.25},g=.25,$=.1,k=1e3,H=.8,K=.95,E=30,Q=5,P="cart-items",A="cart-total",_="product-select",h="add-to-cart",b="stock-status",v="loyalty-points",Y={init:t=>{const e=document.querySelector(`#${P}`),{updateCartItem:o,removeCartItem:c}=t;e.addEventListener("click",m=>{const{target:r}=m,i=r.dataset.productId;if(r.classList.contains("quantity-change")){const p=parseInt(r.dataset.change);o(p,i);return}r.classList.contains("remove-item")&&c(i)})},render:()=>{}},F={init:()=>{},render:()=>`<div id="${P}" class="my-4"></div>`};function j(t){const e=document.querySelector(`#${P}`),o=z(t);e.appendChild(o)}function q(t){return document.querySelector(`#${t}`)}function z(t){const e=document.createElement("template"),o=`
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
  `;return e.innerHTML=o.trim(),e.content.firstChild}function x(t,e,o){t.querySelector("span").textContent=`${e.name} - ${e.price}원 x ${o}`}function D(t){const e=document.querySelector(`#${b}`);let o="";t.forEach(c=>{c.quantity<Q&&(o+=`${c.name}: ${c.quantity>0?`재고 부족 (${c.quantity}개 남음)
`:`품절
`}`)}),e.innerHTML=o}function R(t,e){const o=Math.floor(t/k),c=document.querySelector(`#${A}`);c.textContent=`총액: ${t}원`,e>0&&G(c,e),W(c,o)}function W(t,e){let o=document.querySelector(`#${v}`);o||(o=document.createElement("span"),o.id=v,o.className="text-blue-500 ml-2",t.appendChild(o)),o.textContent=`(포인트: ${e})`}function G(t,e){const o=document.createElement("span");o.className="text-green-500 ml-2",o.textContent=`(${(e*100).toFixed(1)}% 할인 적용)`,t.appendChild(o)}const L={init:({totalAmount:t,discountRate:e})=>{R(t,e)},render:()=>`<div id="${A}" class="text-xl font-bold my-4"></div>`},J={init:()=>{},render:({products:t})=>`
        <select id="${_}" class="border rounded p-2 mr-2">
          ${t.map(e=>`<option value="${e.id}" ${e.quantity===0?"disabled":""}>${e.name} - ${e.price}원</option>`).join("")}
        </select>
    `},O={init:(t,e,o)=>{const c=document.querySelector(`#${_}`),m=document.querySelector(`#${h}`),{getProductById:r}=t,{addCartItem:i}=e,{updateLastSelectedProductId:p}=o;m.addEventListener("click",()=>{const I=c.value,y=r(I);!y||y.quantity<=0||(i(I),p(I))})},render:()=>`
      <button id="${h}" class="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
    `},w={init:t=>{D(t.products)},render:()=>`<div id="${b}" class="text-sm text-gray-500 mt-2"></div>`},V=()=>({products:[...N],cart:[],lastSelected:null,totalAmount:0,loyaltyPoints:0,discountRate:0,itemCount:0});function X(t){const e=r=>t.products.find(i=>i.id===r);return{getProductById:e,getProductBySuggestion:r=>t.products.find(i=>i.id!==r&&i.quantity>0),getRandomProduct:()=>t.products[Math.floor(Math.random()*t.products.length)],updateProductPrice:(r,i)=>{const p=e(r);updateProductElementPrice(r,i),p.price=i}}}const Z=(t,e)=>{const o=n=>t.cart.find(a=>a.id===n),c=n=>{const a=e.getProductById(n),u=o(n),s=q(n),d=u.quantity+1;return!a||a.quantity<=d?(alert("재고가 부족합니다."),!1):(x(s,a,d),u.quantity+=1,console.log(u,a),u.price+=a.price,a.quantity-=1,!0)},m=n=>{const a=e.getProductById(n);return j(a),t.cart.push({id:n,quantity:1,price:a.price}),a.quantity-=1,!0},r=n=>{o(n)?c(n):m(n),y()},i=(n,a)=>a<0?!0:a<=n,p=(n,a)=>{const u=e.getProductById(a),s=o(a),d=q(a),C=s.quantity+n;if(!i(u.quantity,n)){alert("재고가 부족합니다.");return}C<=0?(t.cart=t.cart.filter(T=>T.id!==a),u.quantity-=n,d.remove()):(x(d,u,C),u.quantity-=n,s.quantity+=n,s.price+=u.price),y()},I=n=>{const a=e.getProductById(n),u=o(n),s=q(n),d=u.quantity;t.cart=t.cart.filter(f=>f.id!==n),a.quantity+=d,s.remove(),y()},y=()=>{const n=S();console.log(n),t.totalAmount=n.totalAmount,t.itemCount=n.itemCount,t.discountRate=n.discountRate,l(t.totalAmount,t.discountRate),D(t.products)},S=()=>{let{totalAmount:n,itemCount:a,tempTotalAmount:u}=t.cart.reduce((d,f)=>{const{quantity:C,price:T,id:B}=f,M=C>=10&&U[B]||0;return{totalAmount:d.totalAmount+T*(1-M),itemCount:d.itemCount+C,tempTotalAmount:d.tempTotalAmount+T}},{totalAmount:0,itemCount:0,tempTotalAmount:0}),s=0;if(a>=E){const d=n*g,f=u-n;d>f&&(n=u*(1-g),s=g),f<=d&&(s=(u-n)/u)}return a<E&&(s=(u-n)/u),new Date().getDay()===2&&(n*=1-$,s=Math.max(s,$)),{totalAmount:Math.round(n),itemCount:a,discountRate:s}},l=(n,a)=>{R(n,a)};return{getCartItemById:o,addCartItem:r,updateCartItem:p,removeCartItem:I}};function tt(t,e){let o=null,c=null,m=null,r=null,i=null;const p=l=>{i=l},I=()=>{y(),S()},y=()=>{o&&clearTimeout(o),c&&clearInterval(c),o=setTimeout(()=>{c=setInterval(()=>{const l=e.getRandomProduct();if(Math.random()<.3&&l.quantity>0){const n=Math.round(l.price*H);alert(`번개세일! ${l.name}이(가) 20% 할인 중입니다!`),e.updateProductPrice(l.id,n)}},3e4)},Math.random()*1e4)},S=()=>{m&&clearTimeout(m),r&&clearInterval(r),m=setTimeout(()=>{r=setInterval(()=>{if(i){const l=e.getProductBySuggestion(i);if(l){alert(`${l.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);const n=Math.round(l.price*K);e.updateProductPrice(l.id,n)}}},6e4)},Math.random()*2e4)};return{initPromotions:I,updateLastSelectedProductId:p}}function et(){const t=V(),e=X(t),o=Z(t,e),c=tt(t,e);ot(t),nt(t,e,o,c),c.initPromotions()}function nt(t,e,o,c){O.init(e,o,c),w.init(t),Y.init(o),L.init(t)}function ot({products:t}){const e=document.getElementById("app"),o=F.render(),c=L.render(),m=J.render({products:t}),r=O.render(),i=w.render();e.innerHTML=`
      <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h1 class="text-2xl font-bold mb-4">장바구니</h1>
          ${o}
          ${c}
          ${m}
          ${r}
          ${i}
        </div>
      </div>
    `}et();
