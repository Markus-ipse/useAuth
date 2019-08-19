!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("auth0-js"),require("react")):"function"==typeof define&&define.amd?define(["exports","auth0-js","react"],t):t(e.reactUseAuth={},e.Auth0,e.react)}(this,function(e,t,r){t=t&&t.hasOwnProperty("default")?t.default:t;var o="default"in r?r.default:r,n=function(e,t){switch(t.type){case"login":var r=t.user,o=1e3*t.authResult.expiresIn+(new Date).getTime();return"undefined"!=typeof localStorage&&(localStorage.setItem("expires_at",JSON.stringify(o)),localStorage.setItem("user",JSON.stringify(r))),{user:r,expiresAt:o,checkingSession:!1};case"logout":return"undefined"!=typeof localStorage&&(localStorage.removeItem("expires_at"),localStorage.removeItem("user")),{user:{},expiresAt:null};case"error":return{user:{},expiresAt:null,errorType:t.errorType,error:t.error,checkingSession:!1};default:return e}},i=function(e){var t=e.err,r=e.dispatch,o=e.auth0,n=e.authResult;try{return Promise.resolve(n&&n.accessToken&&n.idToken?Promise.resolve(function(e){var t=e.dispatch,r=e.auth0,o=e.authResult;try{return Promise.resolve(new Promise(function(e,n){r.client.userInfo(o.accessToken,function(r,i){r?(t({type:"error",errorType:"userInfo",error:r}),n(r)):(t({type:"login",authResult:o,user:i}),e(i))})}))}catch(e){return Promise.reject(e)}}({dispatch:r,auth0:o,authResult:n})).then(function(){return!0}):t?(console.error(t),r({type:"error",error:t,errorType:"authResult"}),!1):void 0)}catch(e){return Promise.reject(e)}},u=r.createContext(null);e.AuthProvider=function(e){var s=e.children,a=e.navigate,c=e.auth0_domain,l="undefined"!=typeof window?window.location.protocol+"//"+window.location.host:"http://localhost:8000",h=new t.WebAuth(Object.assign({},{domain:c,clientID:e.auth0_client_id,redirectUri:l+"/auth0_callback",audience:"https://"+c+"/api/v2/",responseType:"token id_token",scope:"openid profile email"},e.auth0_params)),d=r.useReducer(n,{user:{},expiresAt:null,checkingSession:!0}),p=d[0],f=d[1];return r.useEffect(function(){h.checkSession({},function(e,t){console.log("checkSession",e,t),e?f({type:"error",errorType:"checkSession",error:e}):i({dispatch:f,auth0:h,authResult:t})})},[]),o.createElement(u.Provider,{value:{state:p,dispatch:f,auth0:h,callback_domain:l,navigate:a}},s)},e.useAuth=function(){var e=r.useContext(u),t=e.state,o=e.dispatch,n=e.auth0,s=e.callback_domain,a=e.navigate,c=r.useCallback(function(e){void 0===e&&(e={});var t=e.postLoginRoute;void 0===t&&(t="/"),"undefined"!=typeof window&&n.parseHash(function(e,r){try{return console.log(e,r),Promise.resolve(i({err:e,authResult:r,dispatch:o,auth0:n})).then(function(){a(t)})}catch(e){return Promise.reject(e)}})},[]);return{isAuthenticated:function(){return t.expiresAt&&(new Date).getTime()<t.expiresAt},user:t.user,userId:t.user?t.user.sub:null,login:function(){console.log("login()"),n.authorize()},logout:function(){n.logout({returnTo:s}),o({type:"logout"}),a("/")},handleAuthentication:c,checkingSession:t.checkingSession}}});
//# sourceMappingURL=index.umd.js.map
