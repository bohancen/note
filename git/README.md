git规则

.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的

解决办法

git rm -r --cached .
git add .
git commit -m 'update .gitignore'
