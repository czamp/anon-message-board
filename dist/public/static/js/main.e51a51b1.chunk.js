(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{252:function(e,t,a){e.exports=a(439)},439:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(60),s=a.n(o),l=(a(257),a(26)),c=a(27),d=a(30),i=a(28),p=a(31),u=a(17),h=a(62),m=a(448),E=a(455),b=a(454),g=a(54),f=function(){return n.a.createElement(E.a,{color:"blue",inverted:!0,secondary:!0},n.a.createElement(E.a.Item,null,n.a.createElement(E.a.Header,{as:"h3"},"Anon Messageboards")),n.a.createElement(E.a.Menu,null,n.a.createElement(E.a.Item,null,n.a.createElement(u.b,{to:"/"},"Home"))),n.a.createElement(E.a.Menu,{position:"right"},n.a.createElement(E.a.Item,{link:!0},n.a.createElement("a",{href:"https://github.com/czamp/anon-message-board",target:"_blank",rel:"noopener noreferrer"},n.a.createElement(b.a,{icon:!0,inverted:!0},n.a.createElement(g.a,{name:"github"})," ","See The Source Code")))))},w=a(458),y=a(460),_=a(446),S=a(453),v=a(71),C=a(242),D=a(449),O=a(451),x=a(42),I=a.n(x);var M="https://flashy-anaconda.glitch.me",k={listBoards:function(e,t){return I.a.get("".concat(M,"/api/boards")).then(function(t){return e(t.data)}).catch(function(e){return t(e.response)})},listThreads:function(e,t,a){I.a.get("".concat(M,"/api/threads/").concat(e)).then(function(e){return t(e.data)}).catch(function(e){return a(e.response)})},getCompleteThread:function(e,t,a,r){I.a.get("".concat(M,"/api/replies/").concat(e,"?thread_id=").concat(t)).then(function(e){return a(e)}).catch(function(e){return r(e.response)})},postThread:function(e,t,a,r,n,o){e.preventDefault(),I.a.post("".concat(M,"/api/threads/").concat(t),{text:a,delete_password:r}).then(function(e){return n(e)}).catch(function(e){return o(e.response)})},postReply:function(e,t,a,r,n,o,s){e.preventDefault(),I.a.post("".concat(M,"/api/replies/").concat(t),{text:a,delete_password:r,thread_id:n}).then(function(e){return o(e)}).catch(function(e){return s(e.response)})},deleteThread:function(e,t,a,r,n,o){e.preventDefault(),I.a.delete("".concat(M,"/api/threads/").concat(t),{data:{thread_id:a,delete_password:r}}).then(function(e){return n(e)}).catch(function(e){return o(e.response)})},deleteReply:function(e,t,a,r,n,o,s){e.preventDefault(),I.a.delete("".concat(M,"/api/replies/").concat(t),{data:{thread_id:a,reply_id:r,delete_password:n}}).then(function(e){return o(e)}).catch(function(e){return s(e.response)})},reportThread:function(e,t,a,r){I.a.put("".concat(M,"/api/threads/").concat(e),{thread_id:t}).then(function(e){return a(e)}).catch(function(e){return r(e.response)})},reportReply:function(e,t,a,r,n){I.a.put("".concat(M,"/api/replies/").concat(e),{thread_id:t,reply_id:a}).then(function(e){return r(e)}).catch(function(e){return n(e.response)})}},T=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(n)))).state={text:"",delete_password:"",success:!1,redirect:!1},a.handleAddition=function(e,t){var r=t.value;a.setState(function(e){return{boards:[{text:r,value:r}].concat(Object(C.a)(e.boards))}})},a.handleChange=function(e,t){var r=t.name,n=t.value;a.setState(Object(v.a)({},r,n)),"board"===r&&a.setState({boardInputError:!1}),"delete_password"===r&&a.setState({passwordInputError:!1}),"text"===r&&a.setState({textInputError:!1})},a.handleSubmit=function(e){a.props.allBoards&&""===a.state.board&&a.setState({boardInputError:!0}),""===a.state.text&&a.setState({textInputError:!0}),""===a.state.delete_password?a.setState({passwordInputError:!0}):k.postThread(e,a.state.board?a.state.board:a.props.board,a.state.text,a.state.delete_password,function(e){return a.setState({success:!0,text:"",delete_password:"",redirect:!0,thread_id:e.data})},function(e){return console.log(e)})},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){if(this.props.allBoards){var e=this.props.boards.map(function(e,t){return{key:t,text:e,value:e}});this.setState({boards:e.sort(function(e,t){return e.text>t.text?1:-1})})}}},{key:"render",value:function(){return this.state.redirect&&this.props.allBoards?n.a.createElement(h.a,{to:"/b/".concat(this.state.board,"/")}):this.state.redirect&&!this.props.allBoards?n.a.createElement(h.a,{to:"/b/".concat(this.props.board,"/thread/").concat(this.state.thread_id)}):n.a.createElement(y.a,null,n.a.createElement(w.a,null,"Submit a new Thread"),n.a.createElement(D.a,{error:!0},this.props.allBoards&&n.a.createElement(D.a.Field,null,n.a.createElement("label",null,"Board"),n.a.createElement(O.a,{allowAdditions:!0,fluid:!0,name:"board",onAddItem:this.handleAddition,onChange:this.handleChange,options:this.state.boards?this.state.boards:[],placeholder:"Choose a board, or create your own",search:!0,selection:!0,value:this.state.board}),this.state.boardInputError&&n.a.createElement(S.a,{error:!0},"Please select a board to post this thread to.")),n.a.createElement(D.a.Field,{required:!0},n.a.createElement("label",null,"Thread Text"),n.a.createElement(D.a.TextArea,{name:"text",onChange:this.handleChange,placeholder:"Thread text...",value:this.state.text}),this.state.textInputError&&n.a.createElement(S.a,{error:!0},"Please enter some text for your new thread")),n.a.createElement(D.a.Field,{required:!0},n.a.createElement("label",null,"Delete Password"),n.a.createElement(D.a.Input,{name:"delete_password",onChange:this.handleChange,placeholder:"Enter a password to delete post",type:"password",value:this.state.delete_password,width:8}),this.state.passwordInputError&&n.a.createElement(S.a,{error:!0},"Please enter a password to delete this thread")),n.a.createElement(D.a.Field,null,n.a.createElement(D.a.Button,{content:"Submit Thread",icon:"edit",labelPosition:"left",onClick:this.handleSubmit,primary:!0}))))}}]),t}(r.Component);T.defaultProps={allBoards:!1};var j=T,L=a(457),B=function(e){return n.a.createElement(L.a,null,n.a.createElement(L.a.Section,null,n.a.createElement(u.b,{to:"/"},"BOARDS")),e.board&&n.a.createElement(n.a.Fragment,null,n.a.createElement(L.a.Divider,null),n.a.createElement(L.a.Section,null,n.a.createElement(u.b,{to:"/b/".concat(e.board,"/")},e.board.toUpperCase()))),e.thread_id&&n.a.createElement(n.a.Fragment,null,n.a.createElement(L.a.Divider,null),n.a.createElement(L.a.Section,null,n.a.createElement(u.b,{to:"/b/".concat(e.board,"/thread/").concat(e.thread_id)},e.thread_id))))},A=a(456),F=function(e){var t=e.time;return n.a.createElement("time",{dateTime:new Date(t)},new Date(t).toLocaleString("en-US"))},R=function(e){return n.a.createElement(y.a,{secondary:!0},n.a.createElement(w.a,{as:"h5"},"Reply to Thread"),n.a.createElement(D.a,{error:!0},n.a.createElement(D.a.Field,{required:!0},n.a.createElement(D.a.TextArea,{name:"text",onChange:e.onChange,placeholder:"Please enter your reply here",value:e.text}),e.textInputError&&n.a.createElement(S.a,{error:!0},"Please enter some text for your reply")),n.a.createElement(D.a.Field,{required:!0},n.a.createElement(D.a.Input,{name:"delete_password",onChange:e.onChange,placeholder:"Enter a password to delete reply",type:"password",value:e.delete_password,width:8}),e.passwordInputError&&n.a.createElement(S.a,{error:!0},"Please enter a password to delete this reply.")),n.a.createElement(D.a.Field,null,n.a.createElement(D.a.Button,{content:"Add Reply",icon:"reply",labelPosition:"left",onClick:e.onSubmit,primary:!0}))))},q=a(450),P=function(e){return n.a.createElement(q.a,{onClose:e.closeModal,open:e.modalOpen,size:"small",trigger:n.a.createElement(g.a,{onClick:e.openModal,link:!0,name:"trash"})},n.a.createElement(q.a.Content,null,n.a.createElement(w.a,null,"Delete this post?"),n.a.createElement(D.a,null,n.a.createElement(D.a.Field,null,n.a.createElement("label",null,"Enter your password to delete"),n.a.createElement(D.a.Input,{name:"delete_post_password",onChange:e.handleChange,placeholder:"Password to delete post",type:"password",value:e.delete_post_password})),n.a.createElement(D.a.Group,null,n.a.createElement(D.a.Button,{basic:!0,color:"red",loading:e.isLoading,onClick:e.onDelete,size:"mini"},"Delete"),n.a.createElement(D.a.Button,{size:"mini",onClick:e.closeModal,color:"blue"},"Cancel"))),e.postDeleted&&n.a.createElement(S.a,{success:!0},n.a.createElement(S.a.Header,null,"Success"),"Your post was successfully deleted."),e.deleteErrorMessage&&n.a.createElement(S.a,{error:!0},n.a.createElement(S.a.Header,null,"Error: ",e.deleteErrorMessage),"Your post could not be deleted. Please try again.")))},z=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(n)))).state={delete_post_password:"",replyDeleted:!1,reported:!1,reportError:!1,modalOpen:!1},a.onInputChange=function(e,t){var r=t.name,n=t.value;a.setState(Object(v.a)({},r,n))},a.reportReply=function(){k.reportReply(a.props.board,a.props.thread_id,a.props.reply._id,function(e){return a.setState({reported:!0})},function(e){return a.setState({reportError:!0})})},a.deleteReply=function(e){a.setState({requestingDelete:!0}),""===a.state.delete_post_password?a.setState({deleteErrorMessage:"Please enter your password",requestingDelete:!1}):k.deleteReply(e,a.props.board,a.props.thread_id,a.props.reply._id,a.state.delete_post_password,function(e){return"incorrect password"!==e.data?a.setState({deleteErrorMessage:"",requestingDelete:!1,replyDeleted:!0,modalOpen:!1}):a.setState({deleteErrorMessage:e.data,requestingDelete:!1,delete_post_password:""})},function(e){return a.setState({deleteErrorMessage:"Something went wrong, please try again",requestingDelete:!1})})},a.openModal=function(){a.setState({modalOpen:!0})},a.closeModal=function(){a.setState({modalOpen:!1,delete_post_password:""})},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.reply,a=e.board,r=e.thread_id;return n.a.createElement(y.a.Group,null,n.a.createElement(y.a,null,n.a.createElement(A.a,null,n.a.createElement(A.a.Column,{width:14},n.a.createElement(u.b,{to:"/b/".concat(a,"/thread/").concat(r)},"#",t._id)," |"," ",n.a.createElement(F,{time:t.created_on,loading:this.state.isLoading})),n.a.createElement(A.a.Column,{width:2},this.state.reported?n.a.createElement(g.a,{name:"check",color:"green"}):n.a.createElement(g.a,{color:"red",link:!0,name:"flag",onClick:this.reportReply}),n.a.createElement(P,{closeModal:this.closeModal,delete_post_password:this.state.delete_post_password,deleteErrorMessage:this.state.deleteErrorMessage,handleChange:this.onInputChange,isLoading:this.state.requestingDelete,modalOpen:this.state.modalOpen,onDelete:this.deleteReply,openModal:this.openModal,postDeleted:this.state.postDeleted})))),n.a.createElement(y.a,null,this.state.replyDeleted?"[deleted]":t.text))}}]),t}(r.Component),H=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(n)))).state={delete_password:"",delete_post_password:"",deleteErrorMessage:"",isLoading:!0,modalOpen:!1,passwordInputError:!1,postDeleted:!1,requestingDelete:!1,text:"",textInputError:!1,thread:{},redirect:!1,reported:!1},a.getCompleteThread=function(){k.getCompleteThread(a.props.board,a.props.id,function(e){return a.setState({thread:e.data,isLoading:!1})},function(e){return console.log(e)})},a.onInputChange=function(e,t){var r=t.name,n=t.value;a.setState(Object(v.a)({},r,n)),"delete_password"===r&&a.setState({passwordInputError:!1}),"text"===r&&a.setState({textInputError:!1})},a.onReplySubmit=function(e){""===a.state.text&&a.setState({textInputError:!0}),""===a.state.delete_password?a.setState({passwordInputError:!0}):a.state.textInputError||a.state.passwordInputError||k.postReply(e,a.props.board,a.state.text,a.state.delete_password,a.state.thread._id,function(){return a.setState({success:!0,text:"",delete_password:"",redirect:a.props.preview&&!0},function(){return a.checkUpdatedRender()})},function(e){return console.log(e)})},a.reportThread=function(){k.reportThread(a.props.board,a.state.thread._id,function(e){return a.setState({reported:!0})},function(e){return a.setState({reportError:!0})})},a.deleteThread=function(e){a.setState({requestingDelete:!0}),""===a.state.delete_post_password?a.setState({deleteErrorMessage:"Please enter your password",requestingDelete:!1}):k.deleteThread(e,a.props.board,a.state.thread._id,a.state.delete_post_password,function(e){return"incorrect password"!==e.data?a.setState({deleteErrorMessage:"",requestingDelete:!1,postDeleted:!0,modalOpen:!1},function(){return a.onDeleteSuccess()}):a.setState({deleteErrorMessage:e.data,requestingDelete:!1,delete_post_password:""})},function(e){return a.setState({deleteErrorMessage:"Something went wrong, please try again.",requestingDelete:!1})})},a.onDeleteSuccess=function(){a.props.preview?a.props.onThreadDelete():a.setState({currentThreadDeleted:!0})},a.openModal=function(){return a.setState({modalOpen:!0})},a.closeModal=function(){return a.setState({modalOpen:!1,delete_post_password:""})},a.checkUpdatedRender=function(){a.state.redirect||a.getCompleteThread()},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.preview?this.setState({thread:this.props.thread,isLoading:!1}):this.getCompleteThread()}},{key:"render",value:function(){var e=this,t=this.state.thread,a=this.props.board;return this.state.isLoading?n.a.createElement(y.a,null,n.a.createElement(_.a,{active:this.state.isLoading})):this.state.redirect?n.a.createElement(h.a,{to:"/b/".concat(a,"/thread/").concat(t._id)}):this.state.currentThreadDeleted?n.a.createElement(n.a.Fragment,null,n.a.createElement(S.a,{success:!0},"Your thread has been successfully deleted.",n.a.createElement(u.b,{to:"/b/".concat(a,"/")},"Click here to return to /b/",a))):n.a.createElement(y.a.Group,null,n.a.createElement(y.a,{secondary:!0},n.a.createElement(A.a,{columns:2},n.a.createElement(A.a.Column,{width:14},n.a.createElement(u.b,{to:"/b/".concat(a,"/thread/").concat(t._id)},"#",t._id)," ","|"," ",n.a.createElement(F,{time:t.created_on,loading:this.state.isLoading})),n.a.createElement(A.a.Column,{width:2},this.state.reported?n.a.createElement(g.a,{name:"check",color:"green"}):n.a.createElement(g.a,{color:"red",link:!0,name:"flag",onClick:this.reportThread}),n.a.createElement(P,{closeModal:this.closeModal,delete_post_password:this.state.delete_post_password,deleteErrorMessage:this.state.deleteErrorMessage,handleChange:this.onInputChange,isLoading:this.state.requestingDelete,modalOpen:this.state.modalOpen,onDelete:this.deleteThread,openModal:this.openModal,postDeleted:this.state.postDeleted})))),n.a.createElement(y.a,null,t.text),t.replies.length>0&&n.a.createElement(y.a,{secondary:!0},t.replies.map(function(t){return n.a.createElement(z,{reply:t,key:t._id,board:a,thread_id:e.props.id})})),t.replycount>3&&t.replycount>t.replies.length&&n.a.createElement(y.a,{tertiary:!0},n.a.createElement("p",null,t.replycount-3," replies omitted."," ",n.a.createElement(u.b,{to:"/b/".concat(a,"/thread/").concat(t._id)},"Click to Expand."))),n.a.createElement(R,{onChange:this.onInputChange,onSubmit:this.onReplySubmit,text:this.state.text,delete_password:this.state.delete_password,textInputError:this.state.textInputError,passwordInputError:this.state.passwordInputError}))}}]),t}(n.a.Component),U=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(n)))).state={threads:[],isLoading:!0},a.getAllThreads=function(){k.listThreads(a.props.match.params.board,function(e){return a.setState({threads:e,isLoading:!1,error:!1})},function(e){return a.setState({isLoading:!1,error:!0})})},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getAllThreads()}},{key:"render",value:function(){var e=this,t=this.props.match.params.board,a=this.state.threads;return n.a.createElement(n.a.Fragment,null,n.a.createElement(B,{board:t}),n.a.createElement(w.a,{as:"h1",textAlign:"center"},n.a.createElement(u.b,{to:"/b/".concat(t,"/")},"/b/",t,"/")),n.a.createElement(j,{board:t}),n.a.createElement(y.a,{vertical:!0},n.a.createElement(_.a,{active:this.state.isLoading}),!this.state.isLoading&&n.a.createElement(n.a.Fragment,null,this.state.error&&n.a.createElement(n.a.Fragment,null,n.a.createElement(w.a,{as:"h2"},"Sorry, there seems to be a problem."),n.a.createElement(S.a,{error:!0},"Error: Cannot get threads for /b/",t,"/"," ")),0===this.state.threads.length&&n.a.createElement(n.a.Fragment,null,n.a.createElement(w.a,{as:"h2"}," ","Sorry, there don't appear to be any threads on /b/",t,"/."),n.a.createElement(w.a,{as:"h4"},"Why don't you create a new one?"))),a.map(function(a){return n.a.createElement(H,{board:t,key:a._id,preview:!0,thread:a,onThreadDelete:e.getAllThreads})})))}}]),t}(r.Component),G=a(452),Y=a(447),J=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(n)))).state={boards:[],isLoading:!0,error:!1},a.getBoards=function(){k.listBoards(function(e){return a.setState({error:!1,isLoading:!1,boards:e.sort(function(e,t){return e>t?1:-1})})},function(e){return a.setState({error:!0,isLoading:!1})})},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getBoards()}},{key:"render",value:function(){return this.state.error?n.a.createElement(n.a.Fragment,null,n.a.createElement(L.a,null,n.a.createElement(L.a.Section,null,n.a.createElement(u.b,{to:"/"},"BOARDS"))),n.a.createElement(S.a,{error:!0},"Error: Can not retrieve list of boards.")):n.a.createElement(n.a.Fragment,null,n.a.createElement(L.a,null,n.a.createElement(L.a.Section,null,n.a.createElement(u.b,{to:"/"},"BOARDS"))),n.a.createElement(y.a,null,n.a.createElement(w.a,{as:"h2"},"Select a board to begin"),n.a.createElement(_.a,{inline:"centered",active:this.state.isLoading},"Fetching Boards"),!this.state.isLoading&&!this.state.error&&n.a.createElement(G.a,{horizontal:!0,divided:!0,celled:!0},this.state.boards.map(function(e,t){return n.a.createElement(G.a.Item,{key:t},n.a.createElement(u.b,{to:"/b/".concat(e,"/")},e.toUpperCase()))}))),n.a.createElement(Y.a,{horizontal:!0},"or"),n.a.createElement(_.a,{inline:"centered",active:this.state.isLoading}),!this.state.isLoading&&!this.state.error&&n.a.createElement(j,{allBoards:!0,boards:this.state.boards}))}}]),t}(r.Component),W=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement(B,{board:e.match.params.board,thread_id:e.match.params.id}),n.a.createElement(H,{board:e.match.params.board,id:e.match.params.id}),n.a.createElement(y.a,{vertical:!0},n.a.createElement(w.a,{as:"h4"},n.a.createElement(u.b,{to:"/b/".concat(e.match.params.board)},"Click here to return to /b/",e.match.params.board,"/"))))},K=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement(u.a,null,n.a.createElement("div",{style:{minHeight:"100vh",background:"#f0e0d6"}},n.a.createElement(f,null),n.a.createElement(m.a,{text:!0,style:{paddingTop:"2rem"}},n.a.createElement(h.d,null,n.a.createElement(h.b,{path:"/",exact:!0,component:J}),n.a.createElement(h.b,{path:"/b/:board/",exact:!0,component:U}),n.a.createElement(h.b,{path:"/b/:board/thread/:id",exact:!0,component:W})))))}}]),t}(n.a.Component);s.a.render(n.a.createElement(K,null),document.getElementById("root"))}},[[252,1,2]]]);
//# sourceMappingURL=main.e51a51b1.chunk.js.map