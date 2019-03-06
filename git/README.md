git规则

.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的

解决办法
```js
git rm -r --cached .
git add .
git commit -m 'update .gitignore'


<div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 10px 20px 0px; box-sizing: border-box;"><img src="/static/media/demo.165514d4.gif" alt="demo" style="width: 900px; max-width: 100%;"><h1>Git History</h1><div><div>Quickly browse the history of any GitHub file:<ol><li>Replace <strong>github.com</strong> with <strong>github.githistory.xyz</strong> in any file url</li><li>There's no step two</li></ol><a href="https://github.githistory.xyz/babel/babel/blob/master/packages/babel-core/test/browserify.js">Try it</a></div><p>You can also add an <strong>Open in Git History</strong> button to GitHub with the <a href="https://chrome.google.com/webstore/detail/github-history-browser-ex/laghnmifffncfonaoffcndocllegejnf">Chrome</a> and <a href="https://addons.mozilla.org/es/firefox/addon/github-history/">Firefox</a> extensions.</p></div></div>
