import{u as m,a as j,r as d,b as v,s as b,j as e,c as y}from"./index-qBSOlqZ8.js";const f=()=>{const r=m(),i=j(),[s,a]=d.useState({title:"",body:"",userId:""}),[c,n]=d.useState("idle"),u=v(b),o=t=>{a({...s,[t.target.name]:t.target.value})},l=[s.title,s.body,s.userId].every(Boolean)&&c==="idle",p=t=>{if(t.preventDefault(),l)try{n("pending"),i(y(s)).unwrap(),a({title:"",body:"",userId:""}),r("/")}catch(x){console.log("failed to save post ",x)}finally{n("idle")}},h=u.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id));return e.jsxs("section",{children:[e.jsx("h2",{children:"Add a New Post"}),e.jsxs("form",{children:[e.jsx("label",{htmlFor:"postTitle",children:"Post Title:"}),e.jsx("input",{value:s.title,type:"text",id:"postTitle",name:"title",onChange:t=>o(t)}),e.jsx("label",{htmlFor:"postAuthor",children:"Author:"}),e.jsxs("select",{value:s.userId,name:"userId",id:"postAuthor",onChange:t=>o(t),children:[e.jsx("option",{value:""}),h]}),e.jsx("label",{htmlFor:"postContent",children:"Content:"}),e.jsx("textarea",{value:s.body,id:"postContent",name:"body",onChange:t=>o(t)}),e.jsx("button",{type:"button",onClick:p,disabled:!l,children:"Save Post"})]})]})};export{f as default};