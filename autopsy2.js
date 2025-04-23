// ==UserScript==
// @name         결속아이돌 채팅 매니저 관리
// @namespace    https://www.sooplive.co.kr/
// @version      2.0
// @description  디스코드에서 사용 가능한 최근 채팅 내역 복사 버튼을 추가하고, 밴허브 링크 기능 추가.
// @match        https://play.sooplive.co.kr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=play.sooplive.co.kr
// @grant        none
// @updateURL    https://raw.githubusercontent.com/life1spotato/autopsy/refs/heads/main/autopsy2.js
// @downloadURL  https://raw.githubusercontent.com/life1spotato/autopsy/refs/heads/main/autopsy2.js
// @license MIT
// ==/UserScript==

!function(){"use strict";function t(t){const e=t.closest(".chatting-list-item").querySelector(".time");if(e)return e.textContent.trim();return(new Date).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})}function e(e){let n=e.getAttribute("user_id");const o=e.getAttribute("user_nick"),c=function(t){return{gudok:"구독자",user:"건빵",fan:"팬",topfan:"열혈"}[t]||t}(e.getAttribute("grade")),r=e.querySelector(".menu-list");if(r){r.querySelectorAll(".custom-user-button").forEach((t=>t.parentNode.remove())),n=n.replace(/\(\d+\)/g,"");const e=document.createElement("div"),i=document.createElement("button");i.type="button",i.className="custom-user-button",i.textContent="최근 채팅 복사",i.addEventListener("click",(()=>{const e=function(e){const n=[],o=document.querySelectorAll(".chatting-list-item .message-container");for(let c=0;c<o.length&&n.length<10;c++){const r=o[c],i=r.querySelector(".author");if(i&&i.textContent===e){const e=r.querySelector(".msg");if(e){let o=e.textContent;e.querySelectorAll(".emoticon").forEach((t=>{const e=t.nextElementSibling?.textContent||"";o=o.replace(t.alt||"",e)}));const c=t(r);n.push({text:o.trim(),time:c})}}}return n}(o);let r="";e.length>0&&(r="```",r+=e.map(((t,e)=>`[${t.time}] ${t.text}`)).join("\n"),r+="```");const i=`${o} \`${n}\` \`${c}\` ${r}`;navigator.clipboard.writeText(i).then((()=>{console.log(`복사되었습니다:\n\n${i}`),alert(`복사되었습니다:\n\n${i}`)})).catch((t=>{console.error("아이디 복사 실패: ",t)}))}));const s=document.createElement("button");s.type="button",s.className="custom-user-button",s.textContent="밴허브에서 보기",s.addEventListener("click",(()=>{window.open(`https://banhub.xyz/soop/user/${n}`,"_blank")})),e.appendChild(i),e.appendChild(s);const l=document.createElement("li");l.appendChild(e),r.insertBefore(l,r.firstChild)}}new MutationObserver((t=>{t.forEach((t=>{t.addedNodes.length&&t.addedNodes.forEach((t=>{1===t.nodeType&&t.classList.contains("chatIct-card")&&e(t)}))}))})).observe(document.body,{childList:!0,subtree:!0}),document.querySelectorAll(".chatIct-card").forEach((t=>{e(t)}))}();
